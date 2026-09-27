import { useId } from 'react';
import { Paperclip, X } from 'lucide-react';
import { cn } from '@/lib/format';

function Wrapper({ id, label, error, hint, required, className, children }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-navy-500">{hint}</p>
      )}
    </div>
  );
}

const aria = (id, error) => ({ 'aria-invalid': Boolean(error) || undefined, 'aria-describedby': error ? `${id}-error` : undefined });

export function Input({ label, error, hint, required, className, ...props }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input id={id} className={cn('input', error && 'input-error')} {...aria(id, error)} {...props} />
    </Wrapper>
  );
}

export function Textarea({ label, error, hint, required, className, rows = 5, ...props }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea id={id} rows={rows} className={cn('input resize-y', error && 'input-error')} {...aria(id, error)} {...props} />
    </Wrapper>
  );
}

export function Select({ label, error, hint, required, className, options = [], placeholder = 'Select an option', ...props }) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <select id={id} className={cn('input pr-10', error && 'input-error')} {...aria(id, error)} {...props}>
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const { value, label: l } = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <option key={value} value={value}>
              {l}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}

export function FileInput({ label, error, hint, name, file, onChange, accept, className }) {
  const id = useId();
  const clear = () => onChange({ target: { name, type: 'file', files: [] } });
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} className={className}>
      {file ? (
        <div className="flex items-center justify-between rounded-xl border border-navy-200 bg-navy-50 px-4 py-3 text-sm">
          <span className="flex min-w-0 items-center gap-2 text-navy-800">
            <Paperclip className="h-4 w-4 shrink-0 text-brand-600" />
            <span className="truncate">{file.name}</span>
            <span className="shrink-0 text-navy-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
          </span>
          <button type="button" onClick={clear} className="rounded-lg p-1 text-navy-500 hover:bg-navy-100" aria-label="Remove file">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition hover:border-brand-400 hover:bg-brand-50/50',
            error ? 'border-red-300' : 'border-navy-200'
          )}
        >
          <Paperclip className="h-5 w-5 text-navy-400" />
          <span className="mt-2 text-sm font-medium text-navy-800">Click to attach a file</span>
          <span className="mt-0.5 text-xs text-navy-500">PDF, DOC, PPT, images or ZIP · max 10MB</span>
          <input id={id} name={name} type="file" accept={accept} onChange={onChange} className="sr-only" />
        </label>
      )}
    </Wrapper>
  );
}
