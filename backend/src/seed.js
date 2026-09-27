/**
 * Seeds MongoDB with the placeholder content from /shared/content.js plus demo accounts.
 * Usage: npm run seed          (clears and re-seeds all collections)
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import * as M from './models/index.js';
import * as content from '../../shared/content.js';

const days = (n) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);

async function seed() {
  await connectDB();
  await Promise.all(Object.values(M).map((Model) => Model.deleteMany({})));

  const [instructor] = await M.Instructor.create(content.instructors.map(({ key, ...i }) => i));

  const programs = [];
  for (const p of content.programs) programs.push(await M.Program.create({ ...p, instructor: instructor._id }));

  await M.Stat.create(content.stats);
  await M.Project.create(content.projects.map((p) => ({ ...p, description: p.summary })));
  await M.Post.create(content.posts);
  await M.Testimonial.create(content.testimonials);
  await M.Partner.create(content.partners);

  const admin = await M.User.create({
    name: 'HornaAI Admin',
    email: 'admin@hornaai.com',
    password: 'Admin123!',
    role: 'admin',
  });
  const student = await M.User.create({
    name: 'Demo Student',
    email: 'student@hornaai.com',
    password: 'Student123!',
    role: 'student',
    location: 'Mogadishu, Somalia',
  });

  const [web, ux, ai] = [programs[0], programs[2], programs[3]];
  await M.Enrollment.create([
    { user: student._id, program: web._id, progress: 62, nextLesson: 'Authentication with JWT' },
    { user: student._id, program: ai._id, progress: 18, nextLesson: 'NumPy & pandas' },
    { user: student._id, program: ux._id, progress: 100, status: 'completed' },
  ]);

  await M.ClassSession.create([
    { program: web._id, title: 'Live: Building REST APIs', startsAt: days(1), link: '#' },
    { program: ai._id, title: 'Workshop: Exploring data with pandas', startsAt: days(3), link: '#' },
    { program: web._id, title: 'Mentor office hours', startsAt: days(5), location: 'HornaAI Hub', durationMinutes: 60 },
  ]);

  await M.Assignment.create([
    { program: web._id, title: 'Build a task manager API', description: 'CRUD API with Express & MongoDB.', dueDate: days(4) },
    { program: web._id, title: 'React weather app', description: 'Consume a public API with React.', dueDate: days(-3),
      submissions: [{ user: student._id, link: 'https://github.com/', grade: 'A' }] },
    { program: ai._id, title: 'Exploratory data analysis notebook', description: 'Analyse a dataset of your choice.', dueDate: days(9) },
  ]);

  await M.Announcement.create([
    { title: 'Welcome to the HornaAI Student Portal', body: 'Track your courses, classes and assignments here.', pinned: true, audience: 'all' },
    { title: 'Demo Day date announced', body: 'Capstone presentations will take place at the end of the cohort.' },
  ]);

  await M.Certificate.create({ user: student._id, program: ux._id });

  await M.Application.create({
    name: 'Sample Applicant',
    email: 'applicant@example.com',
    program: programs[1]._id,
    programTitle: programs[1].title,
    motivation: 'Sample application created by the seed script.',
  });
  await M.Message.create({
    fullName: 'Sample Contact',
    email: 'contact@example.com',
    reason: 'Custom training',
    message: 'Sample message created by the seed script.',
  });

  console.log('\nSeed complete.');
  console.log(`  Admin:   ${admin.email} / Admin123!`);
  console.log(`  Student: ${student.email} / Student123!`);
  console.log('Change these passwords before deploying anywhere public.\n');
}

seed()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
