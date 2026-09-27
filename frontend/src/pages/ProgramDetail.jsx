import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  ListChecks,
  MonitorPlay,
  PartyPopper,
} from 'lucide-react';
import { api } from '@/lib/api';
import { cn } from '@/lib/format';
import { useSeo } from '@/hooks/useSeo';
import { useProgram } from '@/hooks/useContent';
import { rules, useForm } from '@/hooks/useForm';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Cover from '@/components/ui/Cover';
import Modal from '@/components/ui/Modal';
import Reveal from '@/components/ui/Reveal';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { Accordion, Avatar, Badge } from '@/components/ui/Misc';
import { Alert, ErrorState, PageLoader } from '@/components/ui/States';
import { CtaSection } from '@/components/sections/HomeSections';

function Curriculum({ modules = [] }) {
  const [open, setOpen] = useState(0);
  return (
    <ol className="space-y-3">
      {modules.map((m, i) => (
        <li key={m.title} className="overflow-hidden rounded-2xl border border-navy-100 bg-white">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center gap-4 px-5 py-4 text-left"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-900 font-mono text-xs font-bold text-accent-300">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-navy-900">{m.title}</span>
              <span className="text-xs text-navy-500">{m.lessons?.length || 0} lessons</span>
            </span>
            <ChevronDown className={cn('h-5 w-5 text-navy-400 transition', open === i && 'rotate-180')} />
          </button>
          {open === i && (
            <ul className="animate-fade-in space-y-2 border-t border-navy-100 bg-navy-50/50 px-5 py-4 pl-[4.25rem]">
              {m.lessons?.map((l) => (
                <li key={l} className="flex items-center gap-2 text-sm text-navy-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {l}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function ApplyForm({ program, onDone }) {
  const { user } = useAuth();
  const { field, handleSubmit, submitting, formError } = useForm(
    { name: user?.name || '', email: user?.email || '', phone: user?.phone || '', experience: '', motivation: '' },
    {
      name: [rules.required('Name'), rules.min(2, 'Name')],
      email: [rules.required('Email'), rules.email()],
      phone: [rules.phone()],
    }
  );
  const onSubmit = handleSubmit(async (v) => {
    await api.post('/applications', { ...v, programSlug: program.slug });
    onDone();
  });
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Input label="Full name" required autoComplete="name" {...field('name')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email" required type="email" autoComplete="email" {...field('email')} />
        <Input label="Phone" type="tel" autoComplete="tel" {...field('phone')} />
      </div>
      <Select
        label="Your experience level"
        options={['Complete beginner', 'Some self-study', 'Studying a related degree', 'Working in tech']}
        {...field('experience')}
      />
      <Textarea label="Why do you want to join?" rows={3} placeholder="Optional" {...field('motivation')} />
      <Alert type="error">{formError}</Alert>
      <Button type="submit" size="lg" className="w-full" loading={submitting}>
        Submit Application
      </Button>
    </form>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const { data: p, loading, error, reload } = useProgram(slug);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  useSeo(p?.title || 'Training Program', p?.shortDescription);

  if (loading) return <div className="pt-32"><PageLoader label="Loading program…" /></div>;
  if (error || !p)
    return (
      <div className="container pb-24 pt-36">
        <ErrorState
          title={error?.status === 404 || !p ? 'Program not found' : 'Could not load program'}
          message={error?.status === 404 || !p ? 'This program may have been moved or is no longer available.' : error.message}
          onRetry={error?.status && error.status !== 404 ? reload : undefined}
        />
        <div className="mt-6 text-center">
          <Link to="/training" className="link-arrow">
            <ArrowLeft className="h-4 w-4" /> Back to programs
          </Link>
        </div>
      </div>
    );

  const facts = [
    { icon: BarChart3, label: 'Level', value: p.level },
    { icon: Clock, label: 'Duration', value: p.duration },
    { icon: MonitorPlay, label: 'Format', value: p.format },
    { icon: Award, label: 'Certificate', value: 'Included' },
  ];
  const instructor = typeof p.instructor === 'object' ? p.instructor : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 text-white sm:pt-36">
        <div className="bg-grid-dark pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="container relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Link to="/training" className="inline-flex items-center gap-1.5 text-sm text-navy-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All programs
            </Link>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="dark">{p.category || 'Program'}</Badge>
              <Badge tone="dark">{p.level}</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{p.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-200">{p.shortDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => setApplyOpen(true)} iconRight={ArrowRight}>
                Enroll Now
              </Button>
              <Button href="#curriculum" size="lg" variant="outlineLight" icon={ListChecks}>
                View Curriculum
              </Button>
            </div>
          </div>
          <Cover image={p.image} seed={p.slug} icon={p.icon} className="aspect-[16/10] rounded-3xl border border-white/10" iconClassName="h-20 w-20" />
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container grid grid-cols-2 divide-navy-100 py-6 md:grid-cols-4 md:divide-x">
          {facts.map(({ icon: I, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-2 py-3 md:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <I className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-navy-500">{label}</p>
                <p className="font-semibold text-navy-900">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="container grid gap-12 py-16 lg:grid-cols-3 lg:py-20">
        <div className="space-y-16 lg:col-span-2">
          <Reveal as="section">
            <h2 className="text-2xl font-bold sm:text-3xl">About this program</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">{p.description}</p>
          </Reveal>

          {p.outcomes?.length > 0 && (
            <Reveal as="section">
              <h2 className="text-2xl font-bold sm:text-3xl">What you'll learn</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 rounded-xl border border-navy-100 bg-white p-4 text-navy-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" /> {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {p.curriculum?.length > 0 && (
            <Reveal as="section" className="scroll-mt-24" >
              <h2 id="curriculum" className="scroll-mt-24 text-2xl font-bold sm:text-3xl">Course curriculum</h2>
              <div className="mt-6">
                <Curriculum modules={p.curriculum} />
              </div>
            </Reveal>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal as="section" className="card p-6">
              <h2 className="text-lg font-bold">Requirements</h2>
              <ul className="mt-4 space-y-2.5">
                {(p.requirements?.length ? p.requirements : ['No formal requirements']).map((r) => (
                  <li key={r} className="flex gap-2.5 text-sm text-navy-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal as="section" delay={0.05} className="card p-6">
              <h2 className="text-lg font-bold">Learning format</h2>
              <p className="mt-4 text-sm leading-relaxed text-navy-700">
                <strong>{p.format}</strong> delivery over <strong>{p.duration}</strong>. Live sessions, guided practice,
                assignments reviewed by mentors and a capstone project.
              </p>
            </Reveal>
          </div>

          <Reveal as="section" className="grid gap-6 sm:grid-cols-2">
            <div className="card p-6">
              <h2 className="text-lg font-bold">Instructor</h2>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={instructor?.name || 'HornaAI'} src={instructor?.avatar} className="h-12 w-12" />
                <div>
                  <p className="font-semibold">{instructor?.name || 'Instructor to be announced'}</p>
                  <p className="text-sm text-navy-500">{instructor?.title || 'HornaAI mentor'}</p>
                </div>
              </div>
              {instructor?.bio && <p className="mt-3 text-sm text-navy-600">{instructor.bio}</p>}
            </div>
            <div className="card relative overflow-hidden p-6">
              <Award className="absolute -right-4 -top-4 h-24 w-24 text-brand-50" />
              <h2 className="relative text-lg font-bold">Certificate</h2>
              <p className="relative mt-4 text-sm leading-relaxed text-navy-700">
                {p.certificate || 'Certificate of completion awarded after meeting program requirements.'}
              </p>
            </div>
          </Reveal>

          {p.faqs?.length > 0 && (
            <Reveal as="section">
              <h2 className="text-2xl font-bold sm:text-3xl">Program FAQ</h2>
              <Accordion items={p.faqs} className="mt-6" />
            </Reveal>
          )}
        </div>

        {/* Sticky enroll card (desktop) */}
        <aside className="hidden lg:block">
          <div className="card sticky top-24 overflow-hidden">
            <div className="bg-gradient-to-br from-brand-600 to-accent-600 p-6 text-white">
              <p className="text-sm text-white/80">Next cohort</p>
              <p className="font-display text-2xl font-bold">Applications open</p>
            </div>
            <div className="space-y-4 p-6">
              {facts.map(({ icon: I, label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-navy-500">
                    <I className="h-4 w-4" /> {label}
                  </span>
                  <span className="font-semibold text-navy-900">{value}</span>
                </div>
              ))}
              <Button size="lg" className="w-full" onClick={() => setApplyOpen(true)} iconRight={ArrowRight}>
                {applied ? 'Application sent' : 'Enroll Now'}
              </Button>
              <p className="text-center text-xs text-navy-500">Questions? <Link to="/contact?reason=Training programs" className="font-medium text-brand-600">Talk to us</Link></p>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky enroll bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="container flex items-center gap-3 px-0">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{p.title}</p>
            <p className="text-xs text-navy-500">{p.duration} · {p.format}</p>
          </div>
          <Button onClick={() => setApplyOpen(true)}>Enroll Now</Button>
        </div>
      </div>

      <CtaSection />
      <div className="h-16 lg:hidden" />

      <Modal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        title={applied ? undefined : `Apply for ${p.title}`}
        description={applied ? undefined : 'Tell us a little about yourself. Our admissions team will contact you with next steps.'}
      >
        {applied ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <PartyPopper className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">Application received</h2>
            <p className="mt-2 text-navy-600">Thank you! We'll be in touch soon about the next cohort of {p.title}.</p>
            <Button className="mt-6" variant="secondary" onClick={() => setApplyOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <ApplyForm program={p} onDone={() => setApplied(true)} />
        )}
      </Modal>
    </>
  );
}
