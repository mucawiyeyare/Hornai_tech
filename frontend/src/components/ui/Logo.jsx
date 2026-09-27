import { Link } from 'react-router-dom';
import { cn } from '@/lib/format';

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hai-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#337dfd" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0d1733" />
      <path d="M18 46V18h7v11h14V18h7v28h-7V35H25v11z" fill="url(#hai-g)" />
      <circle cx="48" cy="16" r="4" fill="#22d3ee" />
    </svg>
  );
}

export default function Logo({ dark = false, className, to = '/' }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)} aria-label="HornaAI home">
      <LogoMark />
      <span className={cn('font-display text-xl font-extrabold tracking-tight', dark ? 'text-white' : 'text-navy-900')}>
        Horna<span className="text-gradient">AI</span>
      </span>
    </Link>
  );
}
