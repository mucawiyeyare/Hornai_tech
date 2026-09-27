import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FolderOpen, Layers } from 'lucide-react';
import { projectCategories } from '@shared/content.js';
import { cn } from '@/lib/format';
import { useSeo } from '@/hooks/useSeo';
import { useProject, useProjects } from '@/hooks/useContent';
import { PageHero } from '@/components/layout/SiteLayout';
import Button from '@/components/ui/Button';
import Cover from '@/components/ui/Cover';
import Reveal from '@/components/ui/Reveal';
import { Badge, PlaceholderNote } from '@/components/ui/Misc';
import { CardSkeletons, EmptyState, ErrorState, PageLoader } from '@/components/ui/States';
import { ProjectCard } from '@/components/cards';
import { CtaSection } from '@/components/sections/HomeSections';

export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by category">
      {['All', ...categories].map((c) => (
        <button
          key={c}
          type="button"
          role="tab"
          aria-selected={active === c}
          onClick={() => onChange(c)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition',
            active === c ? 'bg-navy-900 text-white shadow-soft' : 'bg-white text-navy-600 ring-1 ring-inset ring-navy-200 hover:ring-navy-300'
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default function Projects() {
  useSeo('Projects', 'Digital systems and technology solutions built by HornaAI.');
  const { data: projects = [], loading, error, reload } = useProjects();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';

  const filtered = useMemo(
    () => (category === 'All' ? projects : projects.filter((p) => p.category === category)),
    [projects, category]
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Technology We Build"
        text="Digital systems that help organizations operate better and serve their communities."
      >
        <div className="mt-10">
          <CategoryFilter
            categories={projectCategories}
            active={category}
            onChange={(c) => setParams(c === 'All' ? {} : { category: c }, { replace: true })}
          />
        </div>
      </PageHero>

      <section className="pb-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <CardSkeletons count={6} className="h-96" />
            ) : error ? (
              <ErrorState className="sm:col-span-2 lg:col-span-3" message={error.message} onRetry={reload} />
            ) : filtered.length ? (
              filtered.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <ProjectCard project={p} />
                </Reveal>
              ))
            ) : (
              <EmptyState className="sm:col-span-2 lg:col-span-3" icon={FolderOpen} title={`No ${category} projects yet`} text="Check back soon or explore another category." />
            )}
          </div>
          {projects.some((p) => p.isSample) && (
            <PlaceholderNote className="mt-10">Concept projects illustrate our capabilities. Real case studies will be published with client permission.</PlaceholderNote>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const { data: p, loading, error } = useProject(slug);
  useSeo(p?.title || 'Project', p?.summary);

  if (loading) return <div className="pt-32"><PageLoader /></div>;
  if (error || !p)
    return (
      <div className="container pb-24 pt-36">
        <ErrorState title="Project not found" message="This project may have been moved or unpublished." />
        <div className="mt-6 text-center">
          <Link to="/projects" className="link-arrow">
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <section className="pb-12 pt-32 sm:pt-36">
        <div className="container max-w-5xl">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-900">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{p.category}</Badge>
            {p.isSample && <Badge tone="amber">Concept project</Badge>}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-navy-600">{p.summary}</p>
        </div>
      </section>
      <div className="container max-w-5xl">
        <Cover image={p.image} seed={p.slug} icon="Layers" className="aspect-[16/8] rounded-3xl" iconClassName="h-20 w-20" />
        <div className="grid gap-10 py-16 md:grid-cols-3">
          <div className="prose-body md:col-span-2">
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            {(p.description || p.summary).split('\n\n').map((para) => (
              <p key={para}>{para}</p>
            ))}
            {p.isSample && (
              <p className="text-sm text-navy-400">
                This is a concept project describing the kind of system HornaAI builds. It does not represent a specific client engagement.
              </p>
            )}
          </div>
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <Layers className="h-4 w-4 text-brand-600" /> Technologies
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.technologies?.map((t) => (
                  <span key={t} className="rounded-lg bg-navy-50 px-2.5 py-1 text-sm text-navy-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-navy-950 p-6 text-white">
              <h3 className="font-bold text-white">Need something similar?</h3>
              <p className="mt-2 text-sm text-navy-300">Tell us about your idea and we'll help you plan it.</p>
              <Button to={`/start-project?type=${encodeURIComponent('Digital Systems')}`} className="mt-5 w-full" iconRight={ArrowRight}>
                Start a Project
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
