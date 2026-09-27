import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/format';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-[0_8px_20px_-6px_rgba(29,94,242,.55)] hover:bg-brand-700 hover:shadow-[0_12px_28px_-6px_rgba(29,94,242,.6)]',
  dark: 'bg-navy-900 text-white hover:bg-navy-800',
  secondary: 'bg-white text-navy-900 ring-1 ring-inset ring-navy-200 hover:ring-navy-300 hover:bg-navy-50',
  ghost: 'text-navy-700 hover:bg-navy-50 hover:text-navy-900',
  light: 'bg-white text-navy-900 hover:bg-brand-50',
  outlineLight: 'text-white ring-1 ring-inset ring-white/25 hover:bg-white/10',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  icon: IconLeft,
  iconRight: IconRight,
  ...props
}) {
  const classes = cn(
    'group inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-200 active:scale-[.98] disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    className
  );
  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : IconLeft && <IconLeft className="h-4 w-4" />}
      {children}
      {IconRight && <IconRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{content}</a>;
  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {content}
    </button>
  );
}
