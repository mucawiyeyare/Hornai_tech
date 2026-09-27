import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Outlet, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderKanban,
  GraduationCap,
  Inbox,
  Mail,
  Paperclip,
  Pencil,
  Plus,
  Presentation,
  Search,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { api, parseError } from '@/lib/api';
import { cn, formatDate, formatDateTime, timeAgo } from '@/lib/format';
import { useApi } from '@/hooks/useApi';
import { useSeo } from '@/hooks/useSeo';
import DashboardShell, { PageTitle } from '@/components/layout/DashboardShell';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { Badge, ProgressBar } from '@/components/ui/Misc';
import { Alert, EmptyState, ErrorState, Skeleton } from '@/components/ui/States';
import { ADMIN_NAV, RESOURCES, toneFor } from './resources';

export function AdminLayout() {
  return (
    <DashboardShell nav={ADMIN_NAV} label="Admin Dashboard" dark>
      <Outlet />
    </DashboardShell>
  );
}

/* ------------------------------ Overview ------------------------------ */
const ACTIVITY_ICON = { student: UserPlus, application: Inbox, message: Mail, project: FolderKanban, enrollment: Presentation };

export function AdminOverview() {
  useSeo('Admin');
  const { data, loading, error, reload } = useApi('/admin/overview');
  if (error) return <ErrorState message={error.message} onRetry={reload} />;
  const c = data?.counts || {};

  const cards = [
    { label: 'Students', value: c.students, icon: GraduationCap, to: '/admin/students' },
    { label: 'Active Courses', value: c.activeCourses, icon: BookOpen, to: '/admin/programs' },
    { label: 'Applications', value: c.applications, sub: `${c.pendingApplications ?? 0} pending`, icon: Inbox, to: '/admin/applications' },
    { label: 'Projects', value: c.projects, sub: `${c.requests ?? 0} new requests`, icon: FolderKanban, to: '/admin/projects' },
    { label: 'Messages', value: c.messages, sub: `${c.newMessages ?? 0} unread`, icon: Mail, to: '/admin/messages' },
  ];

  return (
    <>
      <PageTitle title="Dashboard overview" text="A snapshot of students, learning and inbound requests." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map(({ label, value, sub, icon: I, to }) => (
          <Link key={label} to={to} className="card card-hover p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <I className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-navy-300" />
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold">{loading ? '–' : value ?? 0}</p>
            <p className="text-sm font-medium text-navy-600">{label}</p>
            {sub && <p className="mt-0.5 text-xs text-navy-400">{loading ? '' : sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="card p-6 xl:col-span-2">
          <h2 className="text-lg font-bold">Recent Activity</h2>
          {loading ? (
            <Skeleton className="mt-5 h-64" />
          ) : data?.activity?.length ? (
            <ol className="mt-5 space-y-1">
              {data.activity.map((a, i) => {
                const I = ACTIVITY_ICON[a.type] || FileText;
                return (
                  <li key={i} className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-navy-50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-100 text-navy-600">
                      <I className="h-4 w-4" />
                    </span>
                    <p className="flex-1 text-sm text-navy-800">{a.text}</p>
                    <span className="shrink-0 text-xs text-navy-400">{timeAgo(a.at)}</span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <EmptyState title="No activity yet" className="mt-5" />
          )}
        </section>
        <section className="card p-6">
          <h2 className="text-lg font-bold">Quick actions</h2>
          <div className="mt-5 grid gap-2">
            {[
              ['Add a training program', '/admin/programs?new=1'],
              ['Publish a blog post', '/admin/posts?new=1'],
              ['Schedule a class', '/admin/sessions?new=1'],
              ['Post an announcement', '/admin/announcements?new=1'],
              ['Issue a certificate', '/admin/certificates?new=1'],
              ['Update homepage statistics', '/admin/stats'],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="flex items-center justify-between rounded-xl border border-navy-100 px-4 py-3 text-sm font-medium text-navy-800 transition hover:border-brand-200 hover:bg-brand-50/50">
                {label} <Plus className="h-4 w-4 text-navy-400" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------ Form value mapping ------------------------------ */
const pad = (n) => String(n).padStart(2, '0');
const toLocalInput = (d) => {
  const x = new Date(d);
  return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}T${pad(x.getHours())}:${pad(x.getMinutes())}`;
};

function toForm(fields, doc) {
  const out = {};
  for (const f of fields) {
    const v = doc?.[f.name];
    switch (f.type) {
      case 'ref': out[f.name] = v?._id || v || ''; break;
      case 'lines': out[f.name] = (v || []).join('\n'); break;
      case 'tags': out[f.name] = (v || []).join(', '); break;
      case 'json': out[f.name] = v && v.length ? JSON.stringify(v, null, 2) : ''; break;
      case 'date': out[f.name] = v ? String(v).slice(0, 10) : ''; break;
      case 'datetime': out[f.name] = v ? toLocalInput(v) : ''; break;
      case 'password': out[f.name] = ''; break;
      case 'checkbox': out[f.name] = doc ? Boolean(v) : Boolean(f.default); break;
      case 'attachment': out[f.name] = v; break;
      default: out[f.name] = v ?? (doc ? '' : f.default ?? '');
    }
  }
  return out;
}

function fromForm(fields, values, isNew) {
  const out = {};
  const errors = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === 'attachment') continue;
    if ((f.required || (isNew && f.createRequired)) && (v === '' || v === undefined || v === null)) {
      errors[f.name] = `${f.label} is required`;
      continue;
    }
    switch (f.type) {
      case 'lines': out[f.name] = String(v || '').split('\n').map((s) => s.trim()).filter(Boolean); break;
      case 'tags': out[f.name] = String(v || '').split(',').map((s) => s.trim()).filter(Boolean); break;
      case 'number': if (v !== '') out[f.name] = Number(v); break;
      case 'ref': out[f.name] = v || null; break;
      case 'date':
      case 'datetime': out[f.name] = v ? new Date(v).toISOString() : null; break;
      case 'json':
        try {
          out[f.name] = v ? JSON.parse(v) : [];
        } catch {
          errors[f.name] = 'Invalid JSON';
        }
        break;
      case 'password': if (v) out[f.name] = v; break;
      default: out[f.name] = v;
    }
  }
  return { payload: out, errors };
}

/* ------------------------------ Resource form ------------------------------ */
function RefSelect({ field, value, onChange, error }) {
  const { data } = useApi(`/admin/${field.ref}?limit=100&sort=${field.refLabel}`);
  return (
    <Select
      label={field.label}
      required={field.required}
      name={field.name}
      value={value}
      onChange={onChange}
      error={error}
      options={(data?.items || []).map((d) => ({ value: d._id, label: d[field.refLabel] || d.email || d._id }))}
    />
  );
}

function ResourceForm({ config, resource, doc, onSaved, onCancel }) {
  const isNew = !doc;
  const [values, setValues] = useState(() => toForm(config.fields, doc));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError('');
    const { payload, errors: errs } = fromForm(config.fields, values, isNew);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFormError('Please fix the highlighted fields.');
      return;
    }
    setSaving(true);
    try {
      const { data } = isNew
        ? await api.post(`/admin/${resource}`, payload)
        : await api.patch(`/admin/${resource}/${doc._id}`, payload);
      onSaved(data, isNew);
    } catch (err) {
      const p = parseError(err);
      setErrors(p.fields);
      setFormError(p.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {config.fields.map((f) => {
          const common = { key: f.name, name: f.name, label: f.label, error: errors[f.name], required: f.required || (isNew && f.createRequired), onChange };
          const span = f.full || ['textarea', 'lines', 'json'].includes(f.type) ? 'sm:col-span-2' : '';
          switch (f.type) {
            case 'textarea':
            case 'lines':
            case 'json':
              return (
                <Textarea
                  {...common}
                  className={span}
                  rows={f.rows || (f.type === 'json' ? 6 : 4)}
                  value={values[f.name]}
                  hint={f.hint}
                  placeholder={f.placeholder}
                  spellCheck={f.type !== 'json'}
                  style={f.type === 'json' ? { fontFamily: 'ui-monospace, monospace', fontSize: 12 } : undefined}
                />
              );
            case 'select':
              return <Select {...common} className={span} value={values[f.name]} options={f.options} />;
            case 'ref':
              return (
                <div key={f.name} className={span}>
                  <RefSelect field={f} value={values[f.name]} onChange={onChange} error={errors[f.name]} />
                </div>
              );
            case 'checkbox':
              return (
                <label key={f.name} className={cn('flex items-center gap-3 rounded-xl border border-navy-100 px-4 py-3 text-sm font-medium', span)}>
                  <input type="checkbox" name={f.name} checked={Boolean(values[f.name])} onChange={onChange} className="h-4 w-4 rounded border-navy-300 text-brand-600 focus:ring-brand-500" />
                  {f.label}
                </label>
              );
            case 'attachment': {
              const a = values[f.name];
              if (!a?.path) return null;
              return (
                <a key={f.name} href={`/${a.path}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-sm font-medium text-brand-700 sm:col-span-2">
                  <Paperclip className="h-4 w-4" /> {a.originalName} ({(a.size / 1024).toFixed(0)} KB)
                </a>
              );
            }
            default:
              return (
                <Input
                  {...common}
                  className={span}
                  type={{ datetime: 'datetime-local', tags: 'text' }[f.type] || f.type}
                  value={values[f.name]}
                  hint={f.hint || (f.type === 'tags' ? 'Comma separated' : undefined)}
                  placeholder={f.placeholder}
                  autoComplete={f.type === 'password' ? 'new-password' : 'off'}
                />
              );
          }
        })}
      </div>
      <Alert type="error">{formError}</Alert>
      <div className="flex justify-end gap-2 border-t border-navy-100 pt-5">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={saving}>{isNew ? `Create ${config.singular.toLowerCase()}` : 'Save changes'}</Button>
      </div>
    </form>
  );
}

/* ------------------------------ Table cell renderer ------------------------------ */
function Cell({ col, row, config, onStatus }) {
  const v = row[col.key];
  switch (col.type) {
    case 'date': return <span className="whitespace-nowrap text-navy-600">{formatDate(v)}</span>;
    case 'datetime': return <span className="whitespace-nowrap text-navy-600">{formatDateTime(v)}</span>;
    case 'bool': return <Badge tone={v ? 'green' : 'navy'}>{v ? 'Yes' : 'No'}</Badge>;
    case 'ref': return <span>{v?.[col.refLabel] || '—'}</span>;
    case 'count': return <span>{v?.length ?? 0}</span>;
    case 'progress': return <div className="flex w-32 items-center gap-2"><ProgressBar value={v} /><span className="text-xs">{v}%</span></div>;
    case 'badge':
      if (col.key === 'status' && config.statuses) {
        return (
          <select
            value={v}
            onChange={(e) => onStatus(row, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Change status"
            className={cn('rounded-full border-0 py-0.5 pl-2.5 pr-7 text-xs font-medium ring-1 ring-inset focus:ring-2', {
              brand: 'bg-brand-50 text-brand-700 ring-brand-100', amber: 'bg-amber-50 text-amber-700 ring-amber-100',
              green: 'bg-emerald-50 text-emerald-700 ring-emerald-100', red: 'bg-red-50 text-red-700 ring-red-100',
              navy: 'bg-navy-50 text-navy-700 ring-navy-100',
            }[toneFor(v)])}
          >
            {config.statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        );
      }
      return v ? <Badge tone={toneFor(v)} className="capitalize">{v}</Badge> : '—';
    default: return <span className="line-clamp-1">{v || '—'}</span>;
  }
}

/* ------------------------------ Resource manager ------------------------------ */
export function ResourceManager() {
  const { resource } = useParams();
  const config = RESOURCES[resource];
  useSeo(config ? `Admin · ${config.title}` : 'Admin');

  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null); // null | 'new' | doc
  const [deleting, setDeleting] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 300);
    return () => clearTimeout(t);
  }, [q]);
  useEffect(() => setPage(1), [debounced, status, resource]);
  useEffect(() => {
    setQ('');
    setStatus('');
    setEditing(new URLSearchParams(window.location.search).get('new') ? 'new' : null);
  }, [resource]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const path = useMemo(() => {
    const p = new URLSearchParams({ page, limit: 15 });
    if (debounced) p.set('q', debounced);
    if (status) p.set('status', status);
    return `/admin/${resource}?${p}`;
  }, [resource, page, debounced, status]);

  const { data, loading, error, reload } = useApi(config ? path : null);

  if (!config) return <Navigate to="/admin" replace />;

  const onSaved = (_doc, isNew) => {
    setEditing(null);
    setToast(`${config.singular} ${isNew ? 'created' : 'updated'}`);
    reload();
  };

  const onStatus = async (row, value) => {
    try {
      await api.patch(`/admin/${resource}/${row._id}`, { status: value });
      setToast('Status updated');
      reload();
    } catch (err) {
      setToast(parseError(err).message);
    }
  };

  const confirmDelete = async () => {
    setDeleteError('');
    try {
      await api.delete(`/admin/${resource}/${deleting._id}`);
      setDeleting(null);
      setToast(`${config.singular} deleted`);
      reload();
    } catch (err) {
      setDeleteError(parseError(err).message);
    }
  };

  const items = data?.items || [];
  const label = (row) => row.title || row.name || row.fullName || row.label || row.code || 'this item';

  return (
    <>
      <PageTitle
        title={config.title}
        text={data ? `${data.total} total` : ' '}
        actions={<Button icon={Plus} onClick={() => setEditing('new')}>New {config.singular.toLowerCase()}</Button>}
      />

      <div className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-navy-100 p-4 sm:flex-row sm:items-center">
          <label className="relative flex-1 sm:max-w-xs">
            <span className="sr-only">Search {config.title}</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}…`} className="input h-10 pl-10" />
          </label>
          {config.statuses && (
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="input h-10 w-auto pr-10 capitalize" aria-label="Filter by status">
              <option value="">All statuses</option>
              {config.statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>

        {error ? (
          <ErrorState className="m-4" message={error.message} onRetry={reload} />
        ) : loading && !data ? (
          <div className="space-y-2 p-4">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-11" />)}</div>
        ) : !items.length ? (
          <EmptyState
            className="m-4"
            icon={config.icon}
            title={debounced || status ? 'No results found' : `No ${config.title.toLowerCase()} yet`}
            text={debounced || status ? 'Try a different search or filter.' : `Create the first ${config.singular.toLowerCase()} to get started.`}
            action={!debounced && !status && <Button size="sm" icon={Plus} onClick={() => setEditing('new')}>New {config.singular.toLowerCase()}</Button>}
          />
        ) : (
          <div className={cn('overflow-x-auto transition-opacity', loading && 'opacity-60')}>
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50/70 text-xs uppercase tracking-wider text-navy-500">
                <tr>
                  {config.columns.map((c) => <th key={c.key} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">{c.label}</th>)}
                  <th scope="col" className="px-4 py-3 text-right font-semibold"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {items.map((row) => (
                  <tr key={row._id} className="cursor-pointer transition hover:bg-navy-50/50" onClick={() => setEditing(row)}>
                    {config.columns.map((c, i) => (
                      <td key={c.key} className={cn('max-w-[16rem] px-4 py-3', i === 0 && 'font-semibold text-navy-900')}>
                        <Cell col={c} row={row} config={config} onStatus={onStatus} />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button onClick={(e) => { e.stopPropagation(); setEditing(row); }} className="rounded-lg p-2 text-navy-400 hover:bg-navy-100 hover:text-navy-800" aria-label={`Edit ${label(row)}`}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteError(''); setDeleting(row); }} className="rounded-lg p-2 text-navy-400 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${label(row)}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data?.pages > 1 && (
          <div className="flex items-center justify-between border-t border-navy-100 px-4 py-3 text-sm">
            <span className="text-navy-500">Page {data.page} of {data.pages}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" icon={ChevronLeft} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
              <Button size="sm" variant="secondary" iconRight={ChevronRight} disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        size="max-w-3xl"
        title={editing === 'new' ? `New ${config.singular.toLowerCase()}` : `Edit ${config.singular.toLowerCase()}`}
      >
        {editing && (
          <ResourceForm
            key={editing === 'new' ? 'new' : editing._id}
            config={config}
            resource={resource}
            doc={editing === 'new' ? null : editing}
            onSaved={onSaved}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => setDeleting(null)} title={`Delete ${config.singular.toLowerCase()}?`}>
        <p className="text-navy-600">
          <strong className="text-navy-900">{deleting && label(deleting)}</strong> will be permanently deleted. This cannot be undone.
        </p>
        <Alert type="error" className="mt-4">{deleteError}</Alert>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button variant="danger" icon={Trash2} onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>

      {toast && (
        <div role="status" className="animate-fade-in fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-medium text-white shadow-lift">
          {toast}
        </div>
      )}
    </>
  );
}
