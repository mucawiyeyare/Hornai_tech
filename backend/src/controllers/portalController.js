import { Enrollment, Assignment, ClassSession, Announcement, Certificate } from '../models/index.js';
import { asyncHandler, HttpError } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id })
    .populate('program', 'title slug icon level duration format')
    .sort('-updatedAt');
  const programIds = enrollments.map((e) => e.program?._id).filter(Boolean);

  const [sessions, assignments, announcements, certificates] = await Promise.all([
    ClassSession.find({ program: { $in: programIds }, startsAt: { $gte: new Date() } })
      .populate('program', 'title slug')
      .sort('startsAt')
      .limit(10),
    Assignment.find({ program: { $in: programIds } })
      .populate('program', 'title slug')
      .sort('dueDate')
      .lean(),
    Announcement.find({ audience: { $in: ['all', 'students'] } }).sort('-pinned -createdAt').limit(10),
    Certificate.find({ user: req.user._id }).populate('program', 'title slug'),
  ]);

  // Expose only the current student's submission on each assignment.
  const mine = assignments.map(({ submissions = [], ...a }) => ({
    ...a,
    submission: submissions.find((s) => String(s.user) === String(req.user._id)) || null,
  }));

  res.json({ enrollments, sessions, assignments: mine, announcements, certificates });
});

export const submitAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) throw new HttpError(404, 'Assignment not found');

  const enrolled = await Enrollment.exists({ user: req.user._id, program: assignment.program });
  if (!enrolled) throw new HttpError(403, 'You are not enrolled in this program');

  const existing = assignment.submissions.find((s) => String(s.user) === String(req.user._id));
  if (existing) {
    existing.link = req.body.link;
    existing.submittedAt = new Date();
  } else {
    assignment.submissions.push({ user: req.user._id, link: req.body.link });
  }
  await assignment.save();
  res.json({ message: 'Submission saved' });
});
