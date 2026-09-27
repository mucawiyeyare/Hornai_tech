import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn, initials } from '@/lib/format';

export function Badge({ children, tone = 'brand', className }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700 ring-brand-100',
    accent: 'bg-accent-50 text-accent-700 ring-accent-100',
    navy: 'bg-navy-50 text-navy-700 ring-navy-100',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    red: 'bg-red-50 text-red-700 ring-red-100',
    dark: 'bg-white/10 text-white ring-white/15',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', tones[tone], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ value = 0, className }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-navy-100', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Avatar({ name, src, size = 'h-10 w-10', className }) {
  if (src) return <img src={src} alt={name} className={cn('rounded-full object-cover', size, className)} />;
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-semibold text-white', size, className)}
      aria-hidden="true"
    >
      {initials(name) || '?'}
    </span>
  );
}

export function Accordion({ items, className }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={cn('divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-navy-900 transition hover:text-brand-700 sm:px-6"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.question}
                <ChevronDown className={cn('h-5 w-5 shrink-0 text-navy-400 transition-transform duration-300', isOpen && 'rotate-180 text-brand-600')} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 leading-relaxed text-navy-600 sm:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function PlaceholderNote({ children = 'Placeholder content — replace with verified information before launch.', className }) {
  return (
    <p className={cn('text-center text-xs text-navy-400', className)}>
      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-400 align-middle" />
      {children}
    </p>
  );
}
