// Inbound requests and learning-operations models.
import crypto from 'node:crypto';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const Message = model(
  'Message',
  new Schema(
    {
      fullName: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: String,
      organization: String,
      reason: String,
      message: { type: String, required: true },
      status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
    },
    { timestamps: true }
  )
);

export const ProjectRequest = model(
  'ProjectRequest',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      organization: String,
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: String,
      projectType: { type: String, required: true },
      budget: String,
      timeline: String,
      description: { type: String, required: true },
      attachment: { originalName: String, path: String, size: Number },
      status: { type: String, enum: ['new', 'reviewing', 'contacted', 'won', 'closed'], default: 'new' },
    },
    { timestamps: true }
  )
);

// Training program applications.
export const Application = model(
  'Application',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: String,
      program: { type: Schema.Types.ObjectId, ref: 'Program' },
      programTitle: String,
      experience: String,
      motivation: String,
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['pending', 'accepted', 'waitlisted', 'rejected'], default: 'pending' },
    },
    { timestamps: true }
  )
);

const enrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
    nextLesson: String,
  },
  { timestamps: true }
);
enrollmentSchema.index({ user: 1, program: 1 }, { unique: true });
export const Enrollment = model('Enrollment', enrollmentSchema);

export const Assignment = model(
  'Assignment',
  new Schema(
    {
      program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
      title: { type: String, required: true },
      description: String,
      dueDate: Date,
      submissions: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          link: String,
          submittedAt: { type: Date, default: Date.now },
          grade: String,
        },
      ],
    },
    { timestamps: true }
  )
);

export const ClassSession = model(
  'ClassSession',
  new Schema(
    {
      program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
      title: { type: String, required: true },
      startsAt: { type: Date, required: true },
      durationMinutes: { type: Number, default: 90 },
      location: { type: String, default: 'Online' },
      link: String,
    },
    { timestamps: true }
  )
);

export const Announcement = model(
  'Announcement',
  new Schema(
    {
      title: { type: String, required: true },
      body: String,
      audience: { type: String, enum: ['all', 'students', 'instructors'], default: 'students' },
      pinned: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);

export const Certificate = model(
  'Certificate',
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
      code: { type: String, unique: true, default: () => `HAI-${crypto.randomBytes(4).toString('hex').toUpperCase()}` },
      issuedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  )
);
