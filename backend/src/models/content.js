// Public, CMS-managed content models.
import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const { Schema, model } = mongoose;

function withSlug(schema) {
  schema.pre('validate', function setSlug() {
    if (!this.slug && this.title) this.slug = slugify(this.title);
  });
  return schema;
}

export const Instructor = model(
  'Instructor',
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      title: String,
      bio: String,
      avatar: String,
      expertise: [String],
      isPlaceholder: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);

export const Program = model(
  'Program',
  withSlug(
    new Schema(
      {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, index: true },
        category: String,
        icon: String,
        image: String,
        level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All levels'], default: 'Beginner' },
        duration: String,
        format: { type: String, default: 'Hybrid' },
        shortDescription: String,
        description: String,
        outcomes: [String],
        curriculum: [{ title: String, lessons: [String] }],
        requirements: [String],
        instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
        certificate: String,
        faqs: [{ question: String, answer: String }],
        featured: { type: Boolean, default: false },
        published: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
      { timestamps: true }
    )
  )
);

export const Project = model(
  'Project',
  withSlug(
    new Schema(
      {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, index: true },
        category: { type: String, enum: ['Education', 'Healthcare', 'Business', 'Government', 'Finance', 'Community'] },
        summary: String,
        description: String,
        technologies: [String],
        image: String,
        // Concept projects are labelled on the site until real, approved case studies replace them.
        isSample: { type: Boolean, default: true },
        featured: { type: Boolean, default: false },
        published: { type: Boolean, default: true },
      },
      { timestamps: true }
    )
  )
);

export const Post = model(
  'Post',
  withSlug(
    new Schema(
      {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, index: true },
        category: {
          type: String,
          enum: ['Technology', 'AI', 'Software Development', 'Education', 'Careers', 'Digital Transformation'],
        },
        excerpt: String,
        content: String,
        image: String,
        author: { type: String, default: 'HornaAI Team' },
        readTime: String,
        published: { type: Boolean, default: true },
        publishedAt: { type: Date, default: Date.now },
      },
      { timestamps: true }
    )
  )
);

export const Testimonial = model(
  'Testimonial',
  new Schema(
    {
      name: { type: String, required: true },
      program: String,
      quote: { type: String, required: true },
      avatar: String,
      isPlaceholder: { type: Boolean, default: true },
      published: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);

export const Partner = model(
  'Partner',
  new Schema(
    {
      name: { type: String, required: true },
      logo: String,
      url: String,
      isPlaceholder: { type: Boolean, default: true },
      order: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
);

export const Stat = model(
  'Stat',
  new Schema(
    {
      key: { type: String, required: true, unique: true },
      label: { type: String, required: true },
      value: { type: Number, required: true },
      suffix: { type: String, default: '+' },
      isPlaceholder: { type: Boolean, default: true },
      order: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
);
