import Reveal from './Reveal';
import { cn } from '@/lib/format';

export default function SectionHeading({ eyebrow, title, text, align = 'center', dark = false, className, children }) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <span className={cn('eyebrow', dark && 'border-white/10 bg-white/5 text-accent-300')}>{eyebrow}</span>
      )}
      <h2 className={cn('mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]', dark && 'text-white')}>
        {title}
      </h2>
      {text && <p className={cn('mt-4 text-lg leading-relaxed', dark ? 'text-navy-200' : 'text-navy-600')}>{text}</p>}
      {children}
    </Reveal>
  );
}
