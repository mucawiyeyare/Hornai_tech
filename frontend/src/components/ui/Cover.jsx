import Icon from './Icon';
import { cn } from '@/lib/format';

// Deterministic, on-brand artwork used wherever real photography is not yet supplied.
const PALETTES = [
  ['from-navy-900 via-navy-800 to-brand-800', 'text-accent-300'],
  ['from-brand-700 via-brand-600 to-accent-500', 'text-white'],
  ['from-navy-800 via-brand-900 to-navy-900', 'text-brand-300'],
  ['from-accent-600 via-brand-600 to-navy-800', 'text-white'],
  ['from-navy-950 via-navy-900 to-accent-700', 'text-accent-200'],
  ['from-brand-800 via-navy-800 to-navy-950', 'text-brand-200'],
];

const hash = (s = '') => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function Cover({ image, alt = '', seed = '', icon, label, className, iconClassName = 'h-12 w-12' }) {
  if (image) {
    return (
      <div className={cn('overflow-hidden bg-navy-100', className)}>
        <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
    );
  }
  const [bg, fg] = PALETTES[hash(seed) % PALETTES.length];
  return (
    <div className={cn('relative overflow-hidden bg-gradient-to-br', bg, className)} role="img" aria-label={alt || label || 'Illustration'}>
      <div className="bg-grid-dark absolute inset-0 opacity-60" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-accent-400/20 blur-2xl" />
      <div className="relative flex h-full w-full items-center justify-center transition duration-700 group-hover:scale-105">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <Icon name={icon} className={cn(iconClassName, fg)} strokeWidth={1.5} />
        </div>
      </div>
      {label && (
        <span className="absolute bottom-3 left-3 rounded-md bg-black/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
