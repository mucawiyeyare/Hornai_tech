import {
  Program,
  Project,
  Post,
  Testimonial,
  Partner,
  Stat,
  Message,
  ProjectRequest,
  Application,
} from '../models/index.js';
import { asyncHandler, HttpError } from '../utils/asyncHandler.js';

const bySlug = (Model, populate) =>
  asyncHandler(async (req, res) => {
    let query = Model.findOne({ slug: req.params.slug, published: true });
    if (populate) query = query.populate(populate);
    const doc = await query;
    if (!doc) throw new HttpError(404, 'Not found');
    res.json(doc);
  });

export const getStats = asyncHandler(async (_req, res) => {
  res.json(await Stat.find().sort('order'));
});

export const getPrograms = asyncHandler(async (req, res) => {
  const filter = { published: true };
  if (req.query.featured) filter.featured = true;
  if (req.query.level) filter.level = req.query.level;
  res.json(await Program.find(filter).sort('order').select('-curriculum -faqs'));
});
export const getProgram = bySlug(Program, 'instructor');

export const getProjects = asyncHandler(async (req, res) => {
  const filter = { published: true };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured) filter.featured = true;
  res.json(await Project.find(filter).sort('-createdAt'));
});
export const getProject = bySlug(Project);

export const getPosts = asyncHandler(async (req, res) => {
  const filter = { published: true };
  if (req.query.category) filter.category = req.query.category;
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  res.json(await Post.find(filter).sort('-publishedAt').limit(limit).select('-content'));
});
export const getPost = bySlug(Post);

export const getTestimonials = asyncHandler(async (_req, res) => {
  res.json(await Testimonial.find({ published: true }).sort('-createdAt'));
});

export const getPartners = asyncHandler(async (_req, res) => {
  res.json(await Partner.find().sort('order'));
});

export const createMessage = asyncHandler(async (req, res) => {
  const { fullName, email, phone, organization, reason, message } = req.body;
  const doc = await Message.create({ fullName, email, phone, organization, reason, message });
  res.status(201).json({ message: 'Thanks — your message has been received.', id: doc._id });
});

export const createProjectRequest = asyncHandler(async (req, res) => {
  const { name, organization, email, phone, projectType, budget, timeline, description } = req.body;
  const attachment = req.file
    ? { originalName: req.file.originalname, path: req.file.path.replace(/\\/g, '/'), size: req.file.size }
    : undefined;
  const doc = await ProjectRequest.create({
    name,
    organization,
    email,
    phone,
    projectType,
    budget,
    timeline,
    description,
    attachment,
  });
  res.status(201).json({ message: 'Thank you. Your project request has been received.', id: doc._id });
});

export const createApplication = asyncHandler(async (req, res) => {
  const { name, email, phone, programSlug, experience, motivation } = req.body;
  const program = programSlug ? await Program.findOne({ slug: programSlug }) : null;
  const doc = await Application.create({
    name,
    email,
    phone,
    experience,
    motivation,
    program: program?._id,
    programTitle: program?.title,
  });
  res.status(201).json({ message: 'Application received. Our team will contact you soon.', id: doc._id });
});
