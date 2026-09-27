import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarCheck, CheckCircle2, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { services } from '@shared/content.js';
import { api } from '@/lib/api';
import { rules, useForm } from '@/hooks/useForm';
import { useSeo } from '@/hooks/useSeo';
import Button from '@/components/ui/Button';
import { FileInput, Input, Select, Textarea } from '@/components/ui/Field';
import { Alert } from '@/components/ui/States';

const PROJECT_TYPES = [...services.map((s) => s.title), 'Digital Transformation', 'Custom Training', 'Other'];
const BUDGETS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'];
const TIMELINES = ['As soon as possible', '1 – 3 months', '3 – 6 months', '6+ months', 'Flexible'];
const MAX_FILE = 10 * 1024 * 1024;

const schema = {
  name: [rules.required('Name'), rules.min(2, 'Name')],
  email: [rules.required('Email'), rules.email()],
  phone: [rules.phone()],
  projectType: [rules.required('Project type')],
  description: [rules.required('Project description'), rules.min(20, 'Project description')],
  attachment: [(f) => (f && f.size > MAX_FILE ? 'File must be 10MB or smaller' : undefined)],
};

function Success({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card mx-auto max-w-xl p-10 text-center sm:p-14"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50"
      >
        <CheckCircle2 className="h-10 w-10" />
      </motion.div>
      <h1 className="mt-8 text-3xl font-extrabold">Thank you. Your project request has been received.</h1>
      <p className="mt-4 text-navy-600">
        Our team will review your request and contact you to schedule a consultation. Keep an eye on your inbox.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/" variant="secondary" icon={ArrowLeft}>
          Back to Home
        </Button>
        <Button onClick={onReset}>Submit another request</Button>
      </div>
    </motion.div>
  );
}

export default function StartProject() {
  useSeo('Start a Project', 'Request a consultation with HornaAI for your software, web, mobile, AI or digital systems project.');
  const [params] = useSearchParams();
  const preset = params.get('type');
  const [done, setDone] = useState(false);

  const initial = {
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectType: PROJECT_TYPES.includes(preset) ? preset : '',
    budget: '',
    timeline: '',
    description: '',
    attachment: null,
  };
  const { field, values, onChange, errors, handleSubmit, submitting, formError, setValues } = useForm(initial, schema);

  const onSubmit = handleSubmit(async (v) => {
    const fd = new FormData();
    Object.entries(v).forEach(([k, val]) => val && fd.append(k, val));
    await api.post('/project-requests', fd);
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-brand-50/60 to-white pb-24 pt-32 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container relative">
        {done ? (
          <Success
            onReset={() => {
              setValues(initial);
              setDone(false);
            }}
          />
        ) : (
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <span className="eyebrow">Start a Project</span>
              <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">Let's build something useful together.</h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-600">
                Share a few details about your project. We'll review it and get back to you to schedule a free
                consultation.
              </p>
              <ul className="mt-10 space-y-5">
                {[
                  { icon: MessageSquare, t: 'Free consultation', d: 'We discuss your goals, users and constraints.' },
                  { icon: CalendarCheck, t: 'Clear proposal', d: 'Scope, timeline and cost — no surprises.' },
                  { icon: ShieldCheck, t: 'Confidential', d: 'Your information is only used to respond to your request.' },
                  { icon: Clock, t: 'Quick response', d: 'We aim to reply within two business days.' },
                ].map(({ icon: I, t, d }) => (
                  <li key={t} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft ring-1 ring-navy-100">
                      <I className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="text-sm text-navy-600">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSubmit} noValidate className="card space-y-6 p-6 sm:p-8 lg:col-span-3">
              <fieldset className="space-y-5">
                <legend className="text-sm font-semibold uppercase tracking-wider text-navy-400">About you</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Name" required autoComplete="name" {...field('name')} />
                  <Input label="Organization" autoComplete="organization" {...field('organization')} />
                  <Input label="Email" required type="email" autoComplete="email" {...field('email')} />
                  <Input label="Phone" type="tel" autoComplete="tel" {...field('phone')} />
                </div>
              </fieldset>
              <fieldset className="space-y-5 border-t border-navy-100 pt-6">
                <legend className="sr-only">About the project</legend>
                <p className="text-sm font-semibold uppercase tracking-wider text-navy-400" aria-hidden="true">
                  About the project
                </p>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Select label="Project type" required options={PROJECT_TYPES} {...field('projectType')} />
                  <Select label="Budget range" options={BUDGETS} {...field('budget')} />
                  <Select label="Timeline" options={TIMELINES} {...field('timeline')} />
                </div>
                <Textarea
                  label="Project description"
                  required
                  rows={6}
                  placeholder="What problem are you solving? Who are the users? Any existing systems?"
                  hint={`${values.description.length} characters · minimum 20`}
                  {...field('description')}
                />
                <FileInput
                  label="Attachment (optional)"
                  name="attachment"
                  file={values.attachment}
                  onChange={onChange}
                  error={errors.attachment}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.txt,.ppt,.pptx"
                />
              </fieldset>
              <Alert type="error">{formError}</Alert>
              <Button type="submit" size="lg" className="w-full" loading={submitting} iconRight={submitting ? undefined : ArrowRight}>
                {submitting ? 'Sending request…' : 'Request Consultation'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
