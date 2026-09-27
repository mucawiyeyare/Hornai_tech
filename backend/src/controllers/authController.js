import crypto from 'node:crypto';
import { User } from '../models/index.js';
import { signToken } from '../middleware/auth.js';
import { asyncHandler, HttpError } from '../utils/asyncHandler.js';

const sendAuth = (res, user, status = 200) => res.status(status).json({ token: signToken(user), user });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (await User.exists({ email: email.toLowerCase() })) {
    throw new HttpError(409, 'An account with this email already exists', { email: 'Email is already registered' });
  }
  // Public registration always creates a student; staff roles are assigned by admins.
  const user = await User.create({ name, email, password, phone, role: 'student' });
  sendAuth(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new HttpError(401, 'Incorrect email or password');
  if (!user.active) throw new HttpError(403, 'This account has been disabled');
  sendAuth(res, user);
});

export const me = (req, res) => res.json({ user: req.user });

export const updateProfile = asyncHandler(async (req, res) => {
  const allowed = ['name', 'phone', 'bio', 'location', 'avatar'];
  for (const key of allowed) if (key in req.body) req.user[key] = req.body[key];
  await req.user.save();
  res.json({ user: req.user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) {
    throw new HttpError(422, 'Current password is incorrect', { currentPassword: 'Incorrect password' });
  }
  user.password = req.body.newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  const response = { message: 'If an account exists for that email, a reset link has been sent.' };

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetTokenExpires = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    // TODO: send `link` through an email provider (e.g. Resend, SES, SendGrid).
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[dev] Password reset link for ${user.email}: ${link}`);
      response.devResetLink = link;
    }
  }
  res.json(response);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetToken: hashed, resetTokenExpires: { $gt: Date.now() } });
  if (!user) throw new HttpError(400, 'This reset link is invalid or has expired');
  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();
  sendAuth(res, user);
});
