import { AlertTriangle, CheckCircle2, Info, Inbox, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/format';
import Button from './Button';

export function Spinner({ className }) {
  return <Loader2 className={cn('h-6 w-6 animate-spin text-brand-600', className)} aria-label="Loading" />;
}

export function PageLoader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-navy-500" role="status">
      <Spinner />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-xl bg-navy-100', className)} />;
}

export function CardSkeletons({ count = 3, className = 'h-72' }) {
  return Array.from({ length: count }, (_, i) => <Skeleton key={i} className={className} />);
}

export function EmptyState({ icon: IconCmp = Inbox, title = 'Nothing here yet', text, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-dashed border-navy-200 px-6 py-12 text-center', className)}>
      <div className="rounded-2xl bg-navy-50 p-3">
        <IconCmp className="h-6 w-6 text-navy-400" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-navy-500">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 px-6 py-12 text-center', className)} role="alert">
      <div className="rounded-2xl bg-red-100 p-3">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-navy-600">{message}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" icon={RefreshCw} onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

const alertStyles = {
  error: ['border-red-200 bg-red-50 text-red-800', AlertTriangle],
  success: ['border-emerald-200 bg-emerald-50 text-emerald-800', CheckCircle2],
  info: ['border-brand-200 bg-brand-50 text-brand-800', Info],
};

export function Alert({ type = 'info', children, className }) {
  if (!children) return null;
  const [style, IconCmp] = alertStyles[type];
  return (
    <div className={cn('flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm', style, className)} role={type === 'error' ? 'alert' : 'status'}>
      <IconCmp className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
