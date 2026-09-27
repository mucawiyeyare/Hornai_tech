import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import HeroVisual from './HeroVisual';

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent-300/20 blur-3xl" />

      <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-xl">
          <motion.span {...fade(0)} className="eyebrow">
            <Sparkles className="h-3.5 w-3.5" /> Technology • Innovation • Education
          </motion.span>
          <motion.h1
            {...fade(0.08)}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.65rem]"
          >
            Building Digital Solutions. <span className="text-gradient">Empowering the Next Generation.</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 text-lg leading-relaxed text-navy-600">
            HornaAI builds practical technology solutions for organizations while equipping students and young
            professionals with the skills they need to succeed in the digital economy.
          </motion.p>
          <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/services" size="lg" iconRight={ArrowRight}>
              Explore Our Services
            </Button>
            <Button to="/training" size="lg" variant="secondary" icon={GraduationCap}>
              Explore Training Programs
            </Button>
          </motion.div>
          <motion.div {...fade(0.32)} className="mt-10 flex items-center gap-3 text-sm text-navy-500">
            <span className="h-px w-8 bg-navy-200" />
            <p>
              Technology solutions <span className="text-brand-600">+</span> practical skills{' '}
              <span className="text-brand-600">+</span> real-world impact
            </p>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
