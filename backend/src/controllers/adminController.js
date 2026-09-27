import * as models from '../models/index.js';
import { asyncHandler, HttpError } from '../utils/asyncHandler.js';

/**
 * Resource registry for the generic admin CRUD API.
 * Adding a new manageable collection = one entry here + one config entry in the frontend.
 */
const RESOURCES = {
  students: { model: models.User, baseFilter: { role: 'student' }, search: ['name', 'email'] },
  users: { model: models.User, search: ['name', 'email'] },
  programs: { model: models.Program, search: ['title', 'category'], populate: 'instructor' },
  instructors: { model: models.Instructor, search: ['name', 'title'] },
  projects: { model: models.Project, search: ['title', 'category'] },
  posts: { model: models.Post, search: ['title', 'category'] },
  testimonials: { model: models.Testimonial, search: ['name', 'program'] },
  partners: { model: models.Partner, search: ['name'] },
  stats: { model: models.Stat, search: ['label'] },
  applications: { model: models.Application, search: ['name', 'email', 'programTitle'] },
  messages: { model: models.Message, search: ['fullName', 'email', 'message'] },
  'project-requests': { model: models.ProjectRequest, search: ['name', 'email', 'organization'] },
  enrollments: { model: models.Enrollment, populate: ['user', 'program'] },
  certificates: { model: models.Certificate, search: ['code'], populate: ['user', 'program'] },
  announcements: { model: models.Announcement, search: ['title'] },
  sessions: { model: models.ClassSession, search: ['title'], populate: 'program' },
  assignments: { model: models.Assignment, search: ['title'], populate: 'program' },
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function resolve(req) {
  const config = RESOURCES[req.params.resource];
  if (!config) throw new HttpError(404, `Unknown resource: ${req.params.resource}`);
  return config;
}

export const list = asyncHandler(async (req, res) => {
  const { model, baseFilter = {}, search = [], populate } = resolve(req);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const filter = { ...baseFilter };

  if (req.query.q && search.length) {
    const rx = new RegExp(escapeRegex(req.query.q), 'i');
    filter.$or = search.map((field) => ({ [field]: rx }));
  }
  if (req.query.status) filter.status = req.query.status;

  let query = model.find(filter).sort(req.query.sort || '-createdAt').skip((page - 1) * limit).limit(limit);
  if (populate) query = query.populate(populate);

  const [items, total] = await Promise.all([query, model.countDocuments(filter)]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});

export const getOne = asyncHandler(async (req, res) => {
  const { model, populate } = resolve(req);
  let query = model.findById(req.params.id);
  if (populate) query = query.populate(populate);
  const doc = await query;
  if (!doc) throw new HttpError(404, 'Not found');
  res.json(doc);
});

export const create = asyncHandler(async (req, res) => {
  const { model, baseFilter = {} } = resolve(req);
  const doc = await model.create({ ...req.body, ...baseFilter });
  res.status(201).json(doc);
});

export const update = asyncHandler(async (req, res) => {
  const { model } = resolve(req);
  const doc = await model.findById(req.params.id);
  if (!doc) throw new HttpError(404, 'Not found');
  const { _id, createdAt, updatedAt, __v, ...changes } = req.body;
  if (changes.password === '') delete changes.password;
  doc.set(changes);
  await doc.save(); // save() (not findByIdAndUpdate) so hooks like password hashing & slugs run
  res.json(doc);
});

export const remove = asyncHandler(async (req, res) => {
  const { model } = resolve(req);
  if (model === models.User && String(req.params.id) === String(req.user._id)) {
    throw new HttpError(400, 'You cannot delete your own account');
  }
  const doc = await model.findByIdAndDelete(req.params.id);
  if (!doc) throw new HttpError(404, 'Not found');
  res.status(204).end();
});

export const overview = asyncHandler(async (_req, res) => {
  const { User, Enrollment, Application, Project, Message, ProjectRequest, Program } = models;
  const [students, activeCourses, applications, pendingApplications, projects, messages, newMessages, requests] =
    await Promise.all([
      User.countDocuments({ role: 'student' }),
      Program.countDocuments({ published: true }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Project.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ status: 'new' }),
      ProjectRequest.countDocuments({ status: 'new' }),
    ]);

  const [recentUsers, recentApps, recentMessages, recentRequests, recentEnrollments] = await Promise.all([
    User.find({ role: 'student' }).sort('-createdAt').limit(5).select('name createdAt'),
    Application.find().sort('-createdAt').limit(5).select('name programTitle createdAt'),
    Message.find().sort('-createdAt').limit(5).select('fullName reason createdAt'),
    ProjectRequest.find().sort('-createdAt').limit(5).select('name projectType createdAt'),
    Enrollment.find().sort('-createdAt').limit(5).populate('user', 'name').populate('program', 'title'),
  ]);

  const activity = [
    ...recentUsers.map((d) => ({ type: 'student', text: `${d.name} created a student account`, at: d.createdAt })),
    ...recentApps.map((d) => ({
      type: 'application',
      text: `${d.name} applied to ${d.programTitle || 'a training program'}`,
      at: d.createdAt,
    })),
    ...recentMessages.map((d) => ({
      type: 'message',
      text: `New message from ${d.fullName}${d.reason ? ` · ${d.reason}` : ''}`,
      at: d.createdAt,
    })),
    ...recentRequests.map((d) => ({ type: 'project', text: `${d.name} requested a ${d.projectType} project`, at: d.createdAt })),
    ...recentEnrollments.map((d) => ({
      type: 'enrollment',
      text: `${d.user?.name || 'A student'} enrolled in ${d.program?.title || 'a program'}`,
      at: d.createdAt,
    })),
  ]
    .sort((a, b) => b.at - a.at)
    .slice(0, 12);

  res.json({
    counts: { students, activeCourses, applications, pendingApplications, projects, messages, newMessages, requests },
    activity,
  });
});
