import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { usePrograms } from '@/hooks/useContent';
import { PageHero } from '@/components/layout/SiteLayout';
import Reveal from '@/components/ui/Reveal';
import { CardSkeletons, EmptyState, ErrorState } from '@/components/ui/States';
import { ProgramCard } from '@/components/cards';
import { CtaSection, FaqSection, JourneySection, StudentSection } from '@/components/sections/HomeSections';
import { faqs } from '@shared/content.js';
import { cn } from '@/lib/format';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const FORMATS = ['All', 'Online', 'In person', 'Hybrid'];

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full px-3.5 py-1.5 text-sm font-medium transition',
        active ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 ring-1 ring-inset ring-navy-200 hover:ring-navy-300'
      )}
    >
      {children}
    </button>
  );
}

export default function Training() {
  useSeo('Training Programs', 'Practical technology training programs in web, mobile, UI/UX, AI, data and cybersecurity.');
  const { data: programs = [], loading, error, reload } = usePrograms();
  const [q, setQ] = useState('');
  const [level, setLevel] = useState('All');
  const [format, setFormat] = useState('All');

  const filtered = useMemo(
    () =>
      programs.filter(
        (p) =>
          (level === 'All' || p.level === level) &&
          (format === 'All' || p.format === format) &&
          (!q || `${p.title} ${p.shortDescription}`.toLowerCase().includes(q.toLowerCase()))
      ),
    [programs, q, level, format]
  );

  return (
    <>
      <PageHero
        eyebrow="Training Programs"
        title="Learn Technology by Building"
        text="Our training programs focus on practical skills, real projects, mentorship, and career-ready knowledge."
      />

      <section className="pb-24">
        <div className="container">
          <Reveal className="card flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block lg:w-80">
              <span className="sr-only">Search programs</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search programs…" className="input pl-10" />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-navy-400">Level</span>
              {LEVELS.map((l) => (
                <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                  {l}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-navy-400">Format</span>
              {FORMATS.map((f) => (
                <Chip key={f} active={format === f} onClick={() => setFormat(f)}>
                  {f}
                </Chip>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <CardSkeletons count={6} className="h-[26rem]" />
            ) : error ? (
              <ErrorState className="sm:col-span-2 lg:col-span-3" message={error.message} onRetry={reload} />
            ) : filtered.length ? (
              filtered.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProgramCard program={p} />
                </Reveal>
              ))
            ) : (
              <EmptyState
                className="sm:col-span-2 lg:col-span-3"
                icon={Search}
                title="No programs match your filters"
                text="Try a different search term or clear the filters."
              />
            )}
          </div>
        </div>
      </section>

      <JourneySection />
      <StudentSection />
      <FaqSection items={faqs.slice(0, 5)} />
      <CtaSection />
    </>
  );
}
