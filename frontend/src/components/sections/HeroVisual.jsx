import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, Cloud, Code2, Globe, GraduationCap, Smartphone, Activity } from 'lucide-react';

const CHIPS = [
  { icon: BrainCircuit, label: 'AI', className: 'left-[-4%] top-[8%]', delay: 0 },
  { icon: Code2, label: 'Code', className: 'right-[-3%] top-[2%]', delay: 1.2 },
  { icon: Cloud, label: 'Cloud', className: 'right-[-6%] top-[44%]', delay: 0.6 },
  { icon: Globe, label: 'Web', className: 'left-[-7%] top-[52%]', delay: 1.8 },
  { icon: Smartphone, label: 'Mobile', className: 'bottom-[-2%] left-[18%]', delay: 0.9 },
  { icon: GraduationCap, label: 'Training', className: 'bottom-[6%] right-[4%]', delay: 1.5 },
];

const BARS = [38, 52, 44, 68, 58, 80, 72, 90];

/** Coded product mock-up: a systems dashboard + learning panel. Crisp at any size, no image weight. */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="absolute inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-500/25 via-accent-400/20 to-transparent blur-3xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-navy-800 bg-navy-950 p-3 shadow-[0_40px_80px_-24px_rgba(13,23,51,.55)] sm:p-4"
      >
        {/* window chrome */}
        <div className="flex items-center gap-1.5 px-2 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 hidden rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-navy-300 sm:block">app.hornaai.com/dashboard</span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {/* main panel */}
          <div className="col-span-5 space-y-3 sm:col-span-3">
            <div className="rounded-2xl bg-white/[.04] p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-navy-300">Digital system · Operations</p>
                  <p className="font-display text-lg font-bold text-white">Service requests</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <Activity className="h-3 w-3" /> Live
                </span>
              </div>
              <div className="mt-4 flex h-24 items-end gap-1.5">
                {BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600 to-accent-400"
                    initial={reduce ? false : { height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/[.04] p-4 font-mono text-[11px] leading-5 ring-1 ring-white/10">
              <p className="text-navy-400">
                <span className="text-accent-300">const</span> <span className="text-white">model</span> ={' '}
                <span className="text-brand-300">await</span> ai.<span className="text-emerald-300">classify</span>(request);
              </p>
              <p className="text-navy-400">
                <span className="text-brand-300">await</span> workflow.<span className="text-emerald-300">route</span>(model.team);
              </p>
              <p className="text-navy-500">// deployed to cloud ✓</p>
            </div>
          </div>

          {/* side panel: learning */}
          <div className="col-span-5 space-y-3 sm:col-span-2">
            <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-accent-600 p-4 text-white">
              <GraduationCap className="h-5 w-5" />
              <p className="mt-3 text-[11px] text-white/80">Student progress</p>
              <p className="font-display text-2xl font-bold">Full-Stack</p>
              <div className="mt-3 h-1.5 rounded-full bg-white/25">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-white/80">Module 4 of 6 · Building APIs</p>
            </div>
            <div className="space-y-2 rounded-2xl bg-white/[.04] p-4 ring-1 ring-white/10">
              {['Design review', 'API tests passing', 'Mobile build'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[11px] text-navy-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {CHIPS.map(({ icon: I, label, className, delay }) => (
        <motion.div
          key={label}
          className={`absolute hidden sm:block ${className}`}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay * 0.3, duration: 0.5 }}
        >
          <div className="animate-float flex items-center gap-2 rounded-xl border border-navy-100 bg-white/95 px-3 py-2 text-xs font-semibold text-navy-800 shadow-lift backdrop-blur" style={{ animationDelay: `${delay}s` }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <I className="h-3.5 w-3.5" />
            </span>
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
