import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';
import * as auth from '../controllers/authController.js';
import * as pub from '../controllers/publicController.js';
import * as portal from '../controllers/portalController.js';
import * as admin from '../controllers/adminController.js';

const router = Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false });
const formLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

router.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

/* ---------- Auth ---------- */
router.post(
  '/auth/register',
  authLimiter,
  validate({
    name: { required: true, min: 2, max: 80, label: 'Name' },
    email: { required: true, email: true },
    password: { required: true, min: 8, label: 'Password' },
  }),
  auth.register
);
router.post(
  '/auth/login',
  authLimiter,
  validate({ email: { required: true, email: true }, password: { required: true, label: 'Password' } }),
  auth.login
);
router.post('/auth/forgot-password', authLimiter, validate({ email: { required: true, email: true } }), auth.forgotPassword);
router.post(
  '/auth/reset-password/:token',
  authLimiter,
  validate({ password: { required: true, min: 8, label: 'Password' } }),
  auth.resetPassword
);
router.get('/auth/me', protect, auth.me);
router.patch('/auth/me', protect, validate({ name: { min: 2, max: 80, label: 'Name' } }), auth.updateProfile);
router.patch(
  '/auth/me/password',
  protect,
  validate({ currentPassword: { required: true, label: 'Current password' }, newPassword: { required: true, min: 8, label: 'New password' } }),
  auth.changePassword
);

/* ---------- Public content ---------- */
router.get('/stats', pub.getStats);
router.get('/programs', pub.getPrograms);
router.get('/programs/:slug', pub.getProgram);
router.get('/projects', pub.getProjects);
router.get('/projects/:slug', pub.getProject);
router.get('/posts', pub.getPosts);
router.get('/posts/:slug', pub.getPost);
router.get('/testimonials', pub.getTestimonials);
router.get('/partners', pub.getPartners);

/* ---------- Public forms ---------- */
router.post(
  '/contact',
  formLimiter,
  validate({
    fullName: { required: true, min: 2, label: 'Full name' },
    email: { required: true, email: true },
    message: { required: true, min: 10, max: 5000, label: 'Message' },
  }),
  pub.createMessage
);
router.post(
  '/project-requests',
  formLimiter,
  upload.single('attachment'),
  validate({
    name: { required: true, min: 2, label: 'Name' },
    email: { required: true, email: true },
    projectType: { required: true, label: 'Project type' },
    description: { required: true, min: 20, max: 8000, label: 'Project description' },
  }),
  pub.createProjectRequest
);
router.post(
  '/applications',
  formLimiter,
  validate({ name: { required: true, min: 2, label: 'Name' }, email: { required: true, email: true } }),
  pub.createApplication
);

/* ---------- Student portal ---------- */
router.get('/portal/dashboard', protect, portal.dashboard);
router.post(
  '/portal/assignments/:id/submit',
  protect,
  validate({ link: { required: true, min: 5, label: 'Submission link' } }),
  portal.submitAssignment
);

/* ---------- Admin ---------- */
const adminOnly = [protect, authorize('admin')];
router.get('/admin/overview', adminOnly, admin.overview);
router.get('/admin/:resource', adminOnly, admin.list);
router.post('/admin/:resource', adminOnly, admin.create);
router.get('/admin/:resource/:id', adminOnly, admin.getOne);
router.patch('/admin/:resource/:id', adminOnly, admin.update);
router.delete('/admin/:resource/:id', adminOnly, admin.remove);

export default router;
