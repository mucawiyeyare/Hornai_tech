import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Calendar, Clock, MonitorPlay, Quote } from 'lucide-react';
import Icon from '@/components/ui/Icon';
import Cover from '@/components/ui/Cover';
import { Avatar, Badge } from '@/components/ui/Misc';
import { formatDate } from '@/lib/format';

const CATEGORY_ICON = {
  Education: 'GraduationCap',
  Healthcare: 'ShieldCheck',
  Business: 'BarChart3',
  Government: 'Layers',
  Finance: 'Target',
  Community: 'Users',
  Technology: 'Cloud',
  AI: 'BrainCircuit',
  'Software Development': 'Code2',
  Careers: 'Sparkles',
  'Digital Transformation': 'Layers',
};

export function ServiceCard({ service }) {
  return (
    <Link
      to={`/services#${service.slug}`}
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-7"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-accent-400 transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-navy-600">{service.short}</p>
      <span className="link-arrow mt-6">
        Learn More <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function ProgramCard({ program }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Link to={`/training/${program.slug}`} tabIndex={-1} aria-hidden="true">
        <Cover image={program.image} seed={program.slug} icon={program.icon} className="aspect-[16/9]" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">
            <BarChart3 className="h-3 w-3" /> {program.level}
          </Badge>
          <Badge tone="navy">
            <Clock className="h-3 w-3" /> {program.duration}
          </Badge>
          <Badge tone="accent">
            <MonitorPlay className="h-3 w-3" /> {program.format}
          </Badge>
        </div>
        <h3 className="mt-4 text-xl font-bold">
          <Link to={`/training/${program.slug}`} className="after:absolute after:inset-0 focus:outline-none">
            {program.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{program.shortDescription}</p>
        <span className="mt-6 inline-flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-900 transition group-hover:bg-brand-600 group-hover:text-white">
          View Program <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function ProjectCard({ project, large = false }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Cover
        image={project.image}
        seed={project.slug}
        icon={CATEGORY_ICON[project.category]}
        className={large ? 'aspect-[16/10]' : 'aspect-[16/10]'}
        iconClassName="h-14 w-14"
        label={project.isSample ? 'Concept project' : undefined}
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent-600">{project.category}</span>
        <h3 className="mt-2 text-xl font-bold">
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies?.map((t) => (
            <span key={t} className="rounded-md bg-navy-50 px-2 py-1 text-xs font-medium text-navy-600">
              {t}
            </span>
          ))}
        </div>
        <span className="link-arrow mt-5">
          View Project <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export function PostCard({ post }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <Cover image={post.image} seed={post.slug} icon={CATEGORY_ICON[post.category]} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-navy-500">
          <Badge tone="brand">{post.category}</Badge>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug">
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{post.excerpt}</p>
        <span className="link-arrow mt-5">
          Read Article <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export function TestimonialCard({ t }) {
  return (
    <figure className="card flex h-full flex-col p-7">
      <Quote className="h-8 w-8 text-brand-200" />
      <blockquote className="mt-4 flex-1 leading-relaxed text-navy-700">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5">
        <Avatar name={t.name} src={t.avatar} className="h-11 w-11" />
        <div>
          <div className="font-semibold text-navy-900">{t.name}</div>
          <div className="text-sm text-navy-500">{t.program}</div>
        </div>
        {t.isPlaceholder && (
          <Badge tone="amber" className="ml-auto">
            Placeholder
          </Badge>
        )}
      </figcaption>
    </figure>
  );
}
