import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@shared/content.js';
import Logo from '@/components/ui/Logo';
import SocialIcon, { SOCIAL_LABELS } from '@/components/ui/SocialIcons';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/services', label: 'Services' },
      { to: '/projects', label: 'Projects' },
      { to: '/contact?reason=Careers', label: 'Careers' },
    ],
  },
  {
    title: 'Learning',
    links: [
      { to: '/training', label: 'Training Programs' },
      { to: '/login', label: 'Student Portal' },
      { to: '/portal/certificates', label: 'Certificates' },
      { to: '/blog?category=Education', label: 'Resources' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/blog', label: 'Blog' },
      { to: '/#faq', label: 'FAQ' },
      { to: '/contact?reason=Documentation', label: 'Documentation' },
      { to: '/contact?reason=Support', label: 'Support' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-300">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="container relative pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-5 max-w-xs leading-relaxed text-navy-300">{site.tagline}</p>
            <div className="mt-6 flex gap-2">
              {Object.entries(site.socials).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  aria-label={SOCIAL_LABELS[key]}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-navy-200 transition hover:-translate-y-0.5 hover:border-accent-400/40 hover:text-white"
                >
                  <SocialIcon name={key} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="text-sm font-semibold text-white">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition hover:text-white">
                    <Mail className="h-4 w-4 shrink-0 text-accent-400" /> {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-accent-400" /> {site.phone}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-accent-400" /> {site.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} HornaAI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
