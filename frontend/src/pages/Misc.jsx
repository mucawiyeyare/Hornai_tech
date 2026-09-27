import { ArrowLeft, Compass } from 'lucide-react';
import { site } from '@shared/content.js';
import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/layout/SiteLayout';
import Button from '@/components/ui/Button';

const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Information we collect', 'We collect information you provide through our forms (such as name, email, phone and organization), account information for the Student Portal, and basic technical data needed to operate the website.'],
      ['How we use information', 'We use your information to respond to enquiries, process training applications, deliver courses, issue certificates and improve our services. We do not sell your personal information.'],
      ['Data security', 'Passwords are stored using one-way hashing, and access to administrative data is restricted by role.'],
      ['Your choices', `You can request access to, correction of, or deletion of your personal data by contacting ${site.email}.`],
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      ['Use of the website', 'By using this website you agree to use it lawfully and not to interfere with its operation or security.'],
      ['Training programs', 'Program details, schedules and requirements may change. Certificates are awarded only when program requirements are met.'],
      ['Accounts', 'You are responsible for keeping your Student Portal credentials secure and for activity under your account.'],
      ['Intellectual property', 'Website content and course materials belong to HornaAI unless stated otherwise. Student project work remains the property of the student.'],
    ],
  },
};

export function LegalPage({ kind }) {
  const page = LEGAL[kind];
  useSeo(page.title);
  return (
    <>
      <PageHero title={page.title} text="Placeholder policy text — have this reviewed and replaced by a qualified legal professional before launch." />
      <section className="pb-24">
        <div className="container max-w-3xl space-y-10">
          {page.sections.map(([h, t]) => (
            <div key={h}>
              <h2 className="text-xl font-bold">{h}</h2>
              <p className="mt-3 leading-relaxed text-navy-600">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  useSeo('Page not found');
  return (
    <section className="flex min-h-[80vh] items-center pb-20 pt-32">
      <div className="container text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Compass className="h-8 w-8" />
        </div>
        <p className="mt-6 font-mono text-sm font-semibold text-brand-600">404</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-navy-600">The page you're looking for doesn't exist or has been moved.</p>
        <Button to="/" className="mt-8" icon={ArrowLeft}>
          Back to Home
        </Button>
      </div>
    </section>
  );
}
