import { Compass, Eye, Hammer, GraduationCap, Lightbulb, Users } from 'lucide-react';
import { instructors, values } from '@shared/content.js';
import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/layout/SiteLayout';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Avatar, Badge, PlaceholderNote } from '@/components/ui/Misc';
import {
  CtaSection,
  PartnersSection,
  StatsSection,
  TeamIllustration,
} from '@/components/sections/HomeSections';

const WHAT_WE_DO = [
  { icon: Hammer, title: 'Build digital systems', text: 'Custom software, web and mobile platforms, AI and automation for organizations.' },
  { icon: Lightbulb, title: 'Advise on technology', text: 'ICT consulting and digital transformation planning grounded in local realities.' },
  { icon: GraduationCap, title: 'Train the next generation', text: 'Practical programs, workshops and bootcamps that turn learners into builders.' },
];

export default function About() {
  useSeo('About', 'Learn about HornaAI — our story, mission, vision and values.');
  return (
    <>
      <PageHero
        eyebrow="About HornaAI"
        title="Technology and education, working together"
        text="We believe the best way to grow a digital economy is to build useful technology and, at the same time, develop the people who will build what comes next."
      />

      {/* Story */}
      <section className="section pt-8">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <TeamIllustration />
          </Reveal>
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="Why HornaAI exists" />
            <Reveal delay={0.1} className="prose-body mt-6">
              <p>
                HornaAI was created around a simple observation: organizations across Africa need reliable digital systems,
                and young people across Africa are eager to build them — but the path from learning to real-world
                experience is often missing.
              </p>
              <p>
                So we do both. Our engineering work delivers practical solutions for businesses, institutions and
                communities. Our training programs give students hands-on experience, mentorship and projects that prepare
                them for careers in technology.
              </p>
              <p className="text-sm text-navy-400">Placeholder story — replace with HornaAI's official history and founding details.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="pb-20">
        <div className="container grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Compass,
              title: 'Our Mission',
              text: 'To use technology and practical education to create digital solutions and expand opportunities for the next generation.',
              dark: true,
            },
            {
              icon: Eye,
              title: 'Our Vision',
              text: 'A future where technology skills and digital solutions are accessible to individuals and organizations across Africa.',
            },
          ].map(({ icon: I, title, text, dark }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className={
                dark
                  ? 'relative overflow-hidden rounded-3xl bg-navy-950 p-10 text-white'
                  : 'relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 p-10 text-white'
              }
            >
              <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <I className="h-8 w-8 text-accent-300" />
                <h2 className="mt-6 text-2xl font-bold text-white">{title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-white/85">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section bg-navy-50/60">
        <div className="container">
          <SectionHeading eyebrow="Our Values" title="What guides our work" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="card p-7">
                <Icon name={v.icon} className="h-7 w-7 text-brand-600" />
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-navy-600">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What We Do" title="Three ways we create impact" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WHAT_WE_DO.map(({ icon: I, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className="card card-hover p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-accent-300">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-navy-600">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-navy-50/60">
        <div className="container">
          <SectionHeading eyebrow="Leadership & Team" title="The people behind HornaAI" text="Engineers, designers and educators committed to practical impact." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Founder & CEO', 'Head of Engineering', 'Head of Training', 'Program Coordinator'].map((role, i) => (
              <Reveal key={role} delay={i * 0.06} className="card p-6 text-center">
                <Avatar name="Team Member" className="mx-auto" size="h-20 w-20" />
                <h3 className="mt-4 font-bold">Team member</h3>
                <p className="text-sm text-navy-500">{role}</p>
                <Badge tone="amber" className="mt-3">
                  <Users className="h-3 w-3" /> Profile coming soon
                </Badge>
              </Reveal>
            ))}
          </div>
          <PlaceholderNote className="mt-8">
            Team profiles are placeholders. {instructors[0]?.isPlaceholder && 'Add real names, photos and bios from the admin dashboard.'}
          </PlaceholderNote>
        </div>
      </section>

      {/* Impact */}
      <section className="pt-20">
        <div className="container">
          <SectionHeading eyebrow="Impact" title="Progress so far" />
        </div>
        <div className="mt-12">
          <StatsSection />
        </div>
      </section>

      <PartnersSection />
      <CtaSection />
    </>
  );
}
