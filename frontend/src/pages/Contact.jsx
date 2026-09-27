import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/layout/SiteLayout';
import Reveal from '@/components/ui/Reveal';
import { ContactForm, ContactInfo } from '@/components/sections/ContactSection';
import { FaqSection } from '@/components/sections/HomeSections';

export default function Contact() {
  useSeo('Contact', 'Get in touch with HornaAI about projects, training, partnerships or support.');
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Talk Technology"
        text="Tell us about your project, training needs or partnership idea. We typically respond within two business days."
      />
      <section className="pb-24">
        <div className="container grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <ContactInfo />
          </Reveal>
        </div>
      </section>
      <FaqSection />
    </>
  );
}
