import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code2,
  FolderGit2,
  GraduationCap,
  Hammer,
  Rocket,
  Sprout,
  UserCheck,
  Users,
} from 'lucide-react';
import { faqs, services, values } from '@shared/content.js';
import Button from '@/components/ui/Button';
import Counter from '@/components/ui/Counter';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Accordion, PlaceholderNote } from '@/components/ui/Misc';
import { CardSkeletons, EmptyState } from '@/components/ui/States';
import { PostCard, ProgramCard, ProjectCard, ServiceCard, TestimonialCard } from '@/components/cards';
import { usePartners, usePosts, usePrograms, useProjects, useStats, useTestimonials } from '@/hooks/useContent';

/* ------------------------------ 4. Stats ------------------------------ */
export function StatsSection() {
  const { data: stats = [] } = useStats();
  const anyPlaceholder = stats.some((s) => s.isPlaceholder);
  return (
    <section className="relative -mt-4 pb-8" aria-label="HornaAI in numbers">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08} className="card p-6 text-center sm:p-8">
              <div className="font-display text-4xl font-extrabold text-navy-900 sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-navy-500">{s.label}</div>
            </Reveal>
          ))}
        </div>
        {anyPlaceholder && <PlaceholderNote className="mt-4">Figures are placeholders and can be updated from the admin dashboard.</PlaceholderNote>}
      </div>
    </section>
  );
}

/* ------------------------------ 5. About ------------------------------ */
export function AboutSection() {
  return (
    <section className="section">
      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <TeamIllustration />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="About HornaAI"
            title="Technology With Purpose"
            text="HornaAI is a technology and ICT organization focused on building useful digital systems and creating practical learning opportunities for the next generation of technology professionals."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Hammer,
                title: 'Build',
                text: 'We design and develop digital systems that help organizations improve how they operate, communicate, and serve their communities.',
              },
              {
                icon: GraduationCap,
                title: 'Train',
                text: 'We provide practical technology training that helps students move from learning concepts to building real projects.',
              },
            ].map(({ icon: I, title, text }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.1} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-accent-300">
                  <I className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <Button to="/about" variant="dark" className="mt-8" iconRight={ArrowRight}>
              Learn More About HornaAI
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Stylised illustration of a team of young developers collaborating (replace with real photography when available). */
export function TeamIllustration() {
  const people = [
    { skin: '#6b4226', hair: '#1a1a1a', shirt: '#337dfd', x: 70 },
    { skin: '#8d5524', hair: '#111', shirt: '#06b6d4', x: 210, scarf: '#1d5ef2' },
    { skin: '#5a3825', hair: '#0d0d0d', shirt: '#0d1733', x: 350 },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-100 to-accent-100 blur-2xl" />
      <svg viewBox="0 0 440 360" className="w-full rounded-3xl border border-navy-100 bg-gradient-to-b from-navy-900 to-navy-950 shadow-lift" role="img" aria-label="Illustration of young African developers collaborating around laptops">
        <defs>
          <linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#337dfd" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <g opacity=".08" stroke="#fff">
          {Array.from({ length: 11 }, (_, i) => <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" />)}
          {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 40} x2="440" y2={i * 40} />)}
        </g>
        {/* wall screen */}
        <rect x="120" y="36" width="200" height="104" rx="10" fill="#16244a" stroke="#2c4580" />
        <rect x="134" y="52" width="80" height="8" rx="4" fill="url(#screen)" />
        <rect x="134" y="68" width="120" height="6" rx="3" fill="#3d5c9c" />
        <rect x="134" y="80" width="100" height="6" rx="3" fill="#3d5c9c" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={236 + i * 14} y={124 - [20, 34, 26, 44, 38][i]} width="9" height={[20, 34, 26, 44, 38][i]} rx="2" fill="url(#screen)" />
        ))}
        {/* people */}
        {people.map((p, i) => (
          <g key={i} transform={`translate(${p.x - 50} 150)`}>
            <path d={`M10 150 Q10 88 50 84 Q90 88 90 150 Z`} fill={p.shirt} />
            {p.scarf && <path d="M22 70 Q50 40 78 70 L84 110 Q50 96 16 110 Z" fill={p.scarf} />}
            <circle cx="50" cy="58" r="24" fill={p.skin} />
            {!p.scarf && <path d="M26 54 Q28 30 50 30 Q74 30 74 54 Q66 40 50 40 Q34 40 26 54 Z" fill={p.hair} />}
            {p.scarf && <path d="M24 60 Q22 28 50 26 Q78 28 76 60 Q74 44 50 42 Q26 44 24 60 Z" fill={p.scarf} />}
          </g>
        ))}
        {/* desk & laptops */}
        <rect x="0" y="286" width="440" height="74" fill="#0b1430" />
        <rect x="0" y="282" width="440" height="8" fill="#213566" />
        {[70, 210, 350].map((x) => (
          <g key={x}>
            <path d={`M${x - 42} 282 L${x - 34} 236 L${x + 34} 236 L${x + 42} 282 Z`} fill="#94acd6" />
            <path d={`M${x - 30} 276 L${x - 25} 244 L${x + 25} 244 L${x + 30} 276 Z`} fill="url(#screen)" opacity=".85" />
          </g>
        ))}
      </svg>
      <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-navy-100 bg-white p-4 shadow-lift sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-navy-900">Learn by building</p>
            <p className="text-xs text-navy-500">Real projects, real skills</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ 6. Services ------------------------------ */
export function ServicesSection() {
  return (
    <section className="section bg-navy-50/60">
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title="From Ideas to Digital Solutions"
          text="We partner with businesses, institutions and NGOs to design, build and run technology that makes a difference."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 7. Training ------------------------------ */
export function ProgramsSection() {
  const { data: programs, loading } = usePrograms();
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Training Programs"
            title="Learn Technology by Building"
            text="Our training programs focus on practical skills, real projects, mentorship, and career-ready knowledge."
          />
          <Reveal>
            <Button to="/training" variant="secondary" iconRight={ArrowRight}>
              View All Training Programs
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <CardSkeletons count={6} className="h-[26rem]" />
          ) : programs?.length ? (
            programs.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProgramCard program={p} />
              </Reveal>
            ))
          ) : (
            <EmptyState className="sm:col-span-2 lg:col-span-3" title="Programs coming soon" text="New training programs will be announced here." />
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 8. Journey ------------------------------ */
const JOURNEY = [
  { n: '01', title: 'Learn', text: 'Understand the foundations.', icon: BookOpen },
  { n: '02', title: 'Practice', text: 'Work through practical exercises.', icon: Code2 },
  { n: '03', title: 'Build', text: 'Create real-world projects.', icon: Hammer },
  { n: '04', title: 'Grow', text: 'Develop your portfolio and career skills.', icon: Sprout },
];

export function JourneySection() {
  return (
    <section className="section relative overflow-hidden bg-navy-950 text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="container relative">
        <SectionHeading
          dark
          eyebrow="Training Experience"
          title="More Than a Course"
          text="A structured path that takes you from first concepts to a portfolio of work you can show employers and clients."
        />
        <div className="relative mt-16">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-brand-500 via-accent-400 to-transparent lg:left-0 lg:top-7 lg:h-px lg:w-full lg:bg-gradient-to-r" />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {JOURNEY.map(({ n, title, text, icon: I }, i) => (
              <Reveal as="li" key={n} delay={i * 0.12} className="relative pl-20 lg:pl-0 lg:pt-20">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-navy-900 text-accent-300 shadow-glow lg:h-14 lg:w-14">
                  <I className="h-5 w-5 lg:h-6 lg:w-6" />
                </div>
                <span className="font-mono text-sm font-semibold text-accent-400">{n}</span>
                <h3 className="mt-1 text-2xl font-bold text-white">{title}</h3>
                <p className="mt-2 text-navy-300">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 9. Projects ------------------------------ */
export function ProjectsSection() {
  const { data: projects, loading } = useProjects();
  const hasSamples = projects?.some((p) => p.isSample);
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured Projects"
            title="Technology We Build"
            text="Digital systems across education, health, business, government, finance and community."
          />
          <Reveal>
            <Link to="/projects" className="link-arrow text-base">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <CardSkeletons count={3} className="h-96" />
          ) : (
            projects?.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))
          )}
        </div>
        {hasSamples && <PlaceholderNote className="mt-8">Concept projects illustrate the kinds of systems we build. Client case studies will be added with permission.</PlaceholderNote>}
      </div>
    </section>
  );
}

/* ------------------------------ 10. Why ------------------------------ */
export function WhySection() {
  return (
    <section className="section bg-navy-50/60">
      <div className="container">
        <SectionHeading eyebrow="Why HornaAI" title="Built for the Real World" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="card card-hover p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-glow">
                <Icon name={v.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-600">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 11. Students ------------------------------ */
const STUDENT_FEATURES = [
  { icon: Award, label: 'Certificates' },
  { icon: FolderGit2, label: 'Practical projects' },
  { icon: UserCheck, label: 'Mentorship' },
  { icon: Users, label: 'Community' },
  { icon: Briefcase, label: 'Career preparation' },
  { icon: Rocket, label: 'Portfolio development' },
];

export function StudentSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow border-white/20 bg-white/10 text-white">
                <GraduationCap className="h-3.5 w-3.5" /> For Students
              </span>
              <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Your Technology Journey Starts Here</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-brand-50">
                Whether you're starting from zero or building your next skill, HornaAI provides practical learning
                experiences designed to help you grow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/training" variant="light" size="lg" iconRight={ArrowRight}>
                  Find a Training Program
                </Button>
                <Button to="/register" variant="outlineLight" size="lg" icon={Users}>
                  Join the Student Community
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STUDENT_FEATURES.map(({ icon: I, label }, i) => (
                <Reveal
                  key={label}
                  delay={i * 0.06}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  <I className="h-6 w-6 text-accent-200" />
                  <p className="mt-3 text-sm font-semibold">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 13. Testimonials ------------------------------ */
export function TestimonialsSection() {
  const { data: items = [] } = useTestimonials();
  if (!items.length) return null;
  return (
    <section className="section bg-navy-50/60">
      <div className="container">
        <SectionHeading eyebrow="Testimonials" title="What Our Community Says" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((t, i) => (
            <Reveal key={t._id || i} delay={i * 0.08}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 14. Partners ------------------------------ */
export function PartnersSection() {
  const { data: partners = [] } = usePartners();
  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          title="Building With Organizations"
          text="We collaborate with businesses, institutions, schools, and organizations to create practical technology solutions and learning opportunities."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p, i) => (
            <Reveal
              key={p._id || p.name}
              delay={i * 0.05}
              className="flex h-20 items-center justify-center rounded-2xl border border-navy-100 bg-white px-4 grayscale transition hover:grayscale-0"
            >
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="max-h-10 w-auto object-contain" loading="lazy" />
              ) : (
                <span className="flex items-center gap-2 text-sm font-semibold text-navy-400">
                  <span className="h-6 w-6 rounded-lg bg-navy-100" /> {p.name}
                </span>
              )}
            </Reveal>
          ))}
        </div>
        {partners.some((p) => p.isPlaceholder) && <PlaceholderNote className="mt-6">Partner logos are placeholders.</PlaceholderNote>}
      </div>
    </section>
  );
}

/* ------------------------------ 15. Blog ------------------------------ */
export function BlogSection() {
  const { data: posts, loading } = usePosts();
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Technology Insights" title="Ideas, Guides & Updates" text="Practical perspectives on technology, AI, careers and digital transformation." />
          <Reveal>
            <Button to="/blog" variant="secondary" iconRight={ArrowRight}>
              Explore All Articles
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {loading ? (
            <CardSkeletons count={3} className="h-96" />
          ) : (
            posts?.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <PostCard post={p} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ 16. FAQ ------------------------------ */
export function FaqSection({ items = faqs, title = 'Frequently Asked Questions' }) {
  return (
    <section id="faq" className="section scroll-mt-20 bg-navy-50/60">
      <div className="container grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading align="left" eyebrow="FAQ" title={title} text="Can't find what you're looking for? Our team is happy to help.">
            <Button to="/contact" variant="dark" className="mt-8" iconRight={ArrowRight}>
              Contact Us
            </Button>
          </SectionHeading>
        </div>
        <Reveal className="lg:col-span-3">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ 17. CTA ------------------------------ */
export function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-16 text-center sm:px-12 lg:py-24">
          <div className="bg-grid-dark pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-60 w-60 translate-x-1/3 translate-y-1/3 rounded-full bg-accent-500/30 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              Have an Idea? <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">Let's Build It.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-200">
              Whether you need a digital solution or want to develop your technology skills, HornaAI is ready to help you
              take the next step.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/start-project" size="lg" iconRight={ArrowRight}>
                Start a Project
              </Button>
              <Button to="/training" size="lg" variant="outlineLight" icon={GraduationCap}>
                Explore Training
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
