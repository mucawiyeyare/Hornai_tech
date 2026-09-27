import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { faqs, serviceProcess, services } from '@shared/content.js';
import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/layout/SiteLayout';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { CtaSection, FaqSection } from '@/components/sections/HomeSections';
import { cn } from '@/lib/format';

export default function Services() {
  useSeo('Services', 'Software development, web and mobile apps, AI & automation, ICT consulting and digital systems.');
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Technology solutions built around your organization"
        text="From strategy to shipped software, we help organizations digitalize their work and serve people better."
      >
        <nav className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2" aria-label="Services">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
            >
              <Icon name={s.icon} className="h-4 w-4 text-brand-600" /> {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="pb-8">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className={cn('scroll-mt-20 py-16 lg:py-24', i % 2 === 1 && 'bg-navy-50/60')}>
            <div className="container grid gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn(i % 2 === 1 && 'lg:order-2')}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white shadow-glow">
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-3xl font-bold sm:text-4xl">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-navy-600">{s.description}</p>

                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-navy-500">Technologies</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.technologies.map((t) => (
                    <span key={t} className="rounded-lg border border-navy-100 bg-white px-3 py-1.5 text-sm font-medium text-navy-700">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button to={`/start-project?type=${encodeURIComponent(s.title)}`} iconRight={ArrowRight}>
                    Start a {s.title} project
                  </Button>
                  <Button to="/contact" variant="secondary">
                    Talk to us
                  </Button>
                </div>
              </Reveal>

              <div className={cn('space-y-6', i % 2 === 1 && 'lg:order-1')}>
                <Reveal delay={0.1} className="card p-7">
                  <h3 className="text-lg font-bold">Benefits</h3>
                  <ul className="mt-4 space-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-navy-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" /> {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.15} className="card p-7">
                  <h3 className="text-lg font-bold">Our process</h3>
                  <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                    {serviceProcess.map((p, n) => (
                      <li key={p.title} className="flex gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 font-mono text-xs font-bold text-accent-300">
                          0{n + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-navy-900">{p.title}</p>
                          <p className="text-sm text-navy-600">{p.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <FaqSection items={faqs.slice(4)} title="Working with HornaAI" />
      <CtaSection />
    </>
  );
}
