import { useSeo } from '@/hooks/useSeo';
import Hero from '@/components/sections/Hero';
import ContactSection from '@/components/sections/ContactSection';
import {
  AboutSection,
  BlogSection,
  CtaSection,
  FaqSection,
  JourneySection,
  PartnersSection,
  ProgramsSection,
  ProjectsSection,
  ServicesSection,
  StatsSection,
  StudentSection,
  TestimonialsSection,
  WhySection,
} from '@/components/sections/HomeSections';

export default function Home() {
  useSeo();
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <ProgramsSection />
      <JourneySection />
      <ProjectsSection />
      <WhySection />
      <StudentSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
