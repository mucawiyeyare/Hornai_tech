import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { site } from '@shared/content.js';
import { api } from '@/lib/api';
import { rules, useForm } from '@/hooks/useForm';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { Alert } from '@/components/ui/States';
import { PlaceholderNote } from '@/components/ui/Misc';

export const CONTACT_REASONS = [
  'Software / system development',
  'Website or mobile app',
  'AI & automation',
  'ICT consulting',
  'Training programs',
  'Custom training for organizations',
  'Partnership',
  'Careers',
  'Support',
  'Documentation',
  'Other',
];

const schema = {
  fullName: [rules.required('Full name'), rules.min(2, 'Full name')],
  email: [rules.required('Email'), rules.email()],
  phone: [rules.phone()],
  message: [rules.required('Message'), rules.min(10, 'Message')],
};

export function ContactForm() {
  const [params] = useSearchParams();
  const presetReason = params.get('reason');
  const [sent, setSent] = useState(false);
  const { field, handleSubmit, submitting, formError, reset } = useForm(
    {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      reason: CONTACT_REASONS.includes(presetReason) ? presetReason : '',
      message: '',
    },
    schema
  );

  const onSubmit = handleSubmit(async (values) => {
    await api.post('/contact', values);
    setSent(true);
    reset();
  });

  if (sent) {
    return (
      <div className="card flex flex-col items-center p-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Message sent</h3>
        <p className="mt-2 max-w-sm text-navy-600">Thank you for reaching out. A member of the HornaAI team will get back to you soon.</p>
        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full Name" required autoComplete="name" placeholder="Your full name" {...field('fullName')} />
        <Input label="Email" required type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />
        <Input label="Phone" type="tel" autoComplete="tel" placeholder="+252 …" {...field('phone')} />
        <Input label="Organization" autoComplete="organization" placeholder="Company, school or NGO" {...field('organization')} />
      </div>
      <Select label="Service / Reason for Contact" options={CONTACT_REASONS} {...field('reason')} />
      <Textarea label="Message" required placeholder="Tell us how we can help…" {...field('message')} />
      <Alert type="error">{formError}</Alert>
      <Button type="submit" size="lg" loading={submitting} icon={submitting ? undefined : Send} className="w-full sm:w-auto">
        {submitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}

export function ContactInfo() {
  const items = [
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Phone', value: site.phone },
    { icon: MapPin, label: 'Location', value: site.location },
  ];
  return (
    <div className="space-y-4">
      {items.map(({ icon: I, label, value, href }) => (
        <div key={label} className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <I className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-navy-500">{label}</p>
            {href ? (
              <a href={href} className="font-semibold text-navy-900 hover:text-brand-700">
                {value}
              </a>
            ) : (
              <p className="font-semibold text-navy-900">{value}</p>
            )}
          </div>
        </div>
      ))}
      <div className="overflow-hidden rounded-2xl border border-navy-100">
        <iframe
          title="HornaAI location map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=40.9%2C-1.7%2C51.5%2C12.0&layer=mapnik"
          className="h-56 w-full"
          loading="lazy"
        />
      </div>
      <PlaceholderNote className="text-left">Contact details are placeholders until official details are supplied.</PlaceholderNote>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="section scroll-mt-20">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Talk Technology"
          text="Tell us about your project, training needs or partnership idea — we'd love to hear from you."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <ContactInfo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
