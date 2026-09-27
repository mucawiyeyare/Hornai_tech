import { useState } from 'react';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Download,
  ExternalLink,
  LayoutDashboard,
  MapPin,
  Megaphone,
  Pin,
  Send,
  User,
} from 'lucide-react';
import { api } from '@/lib/api';
import { cn, formatDate, formatDateTime, timeAgo } from '@/lib/format';
import { useApi } from '@/hooks/useApi';
import { useSeo } from '@/hooks/useSeo';
import { rules, useForm } from '@/hooks/useForm';
import { useAuth } from '@/context/AuthContext';
import DashboardShell, { PageTitle } from '@/components/layout/DashboardShell';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Modal from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Field';
import { Avatar, Badge, ProgressBar } from '@/components/ui/Misc';
import { Alert, EmptyState, ErrorState, Skeleton } from '@/components/ui/States';
import { LogoMark } from '@/components/ui/Logo';

const NAV = [
  { to: '/portal', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/portal/courses', label: 'My Courses', icon: BookOpen },
  { to: '/portal/classes', label: 'Upcoming Classes', icon: CalendarClock },
  { to: '/portal/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/portal/certificates', label: 'Certificates', icon: Award },
  { to: '/portal/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/portal/profile', label: 'Profile', icon: User },
];

export function PortalLayout() {
  const portal = useApi('/portal/dashboard');
  return (
    <DashboardShell nav={NAV} label="Student Portal">
      {portal.error ? (
        <ErrorState title="Could not load your portal" message={portal.error.message} onRetry={portal.reload} />
      ) : (
        <Outlet context={portal} />
      )}
    </DashboardShell>
  );
}

const usePortal = () => useOutletContext();

/* ------------------------------ helpers ------------------------------ */
function Panel({ title, action, children, className }) {
  return (
    <section className={cn('card p-6', className)}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function CourseCard({ e }) {
  const done = e.status === 'completed';
  return (
    <div className="card card-hover flex flex-col p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
          <Icon name={e.program?.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold leading-snug">{e.program?.title}</h3>
          <p className="mt-0.5 text-xs text-navy-500">
            {e.program?.duration} · {e.program?.format}
          </p>
        </div>
        <Badge tone={done ? 'green' : e.status === 'paused' ? 'amber' : 'brand'}>{done ? 'Completed' : e.status === 'paused' ? 'Paused' : 'In progress'}</Badge>
      </div>
      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-navy-500">Progress</span>
          <span className="font-semibold text-navy-900">{e.progress}%</span>
        </div>
        <ProgressBar value={e.progress} />
      </div>
      {e.nextLesson && !done && (
        <p className="mt-4 rounded-lg bg-navy-50 px-3 py-2 text-xs text-navy-600">
          <span className="font-semibold text-navy-800">Next:</span> {e.nextLesson}
        </p>
      )}
      <Link to={`/training/${e.program?.slug}`} className="link-arrow mt-4">
        {done ? 'Review program' : 'Continue learning'} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function SessionItem({ s }) {
  const d = new Date(s.startsAt);
  return (
    <li className="flex items-center gap-4 rounded-xl border border-navy-100 p-4">
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 text-white">
        <span className="text-[10px] uppercase text-accent-300">{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
        <span className="font-display text-xl font-bold leading-none">{d.getDate()}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{s.title}</p>
        <p className="truncate text-xs text-navy-500">
          {s.program?.title} · {formatDateTime(s.startsAt)}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-navy-500">
          <MapPin className="h-3 w-3" /> {s.location} · {s.durationMinutes} min
        </p>
      </div>
      {s.link && (
        <Button href={s.link} size="sm" variant="secondary" icon={ExternalLink} target="_blank" rel="noreferrer">
          Join
        </Button>
      )}
    </li>
  );
}

const dueTone = (a) => {
  if (a.submission) return ['green', 'Submitted'];
  if (!a.dueDate) return ['navy', 'No due date'];
  const days = Math.ceil((new Date(a.dueDate) - Date.now()) / 86400000);
  if (days < 0) return ['red', 'Overdue'];
  if (days <= 3) return ['amber', `Due in ${days}d`];
  return ['brand', `Due ${formatDate(a.dueDate, { day: 'numeric', month: 'short' })}`];
};

/* ------------------------------ pages ------------------------------ */
export function PortalDashboard() {
  useSeo('Student Portal');
  const { user } = useAuth();
  const { data, loading } = usePortal();
  const active = data?.enrollments?.filter((e) => e.status !== 'completed') || [];
  const pending = data?.assignments?.filter((a) => !a.submission) || [];
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-navy-950 p-6 text-white sm:p-8">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-accent-300">{greet},</p>
            <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="mt-2 text-navy-300">Keep building — every lesson brings you closer to your goals.</p>
          </div>
          <Button to="/training" variant="light" iconRight={ArrowRight}>
            Browse programs
          </Button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Active courses', value: active.length, icon: BookOpen },
          { label: 'Upcoming classes', value: data?.sessions?.length ?? 0, icon: CalendarClock },
          { label: 'Pending assignments', value: pending.length, icon: ClipboardList },
          { label: 'Certificates', value: data?.certificates?.length ?? 0, icon: Award },
        ].map(({ label, value, icon: I }) => (
          <div key={label} className="card p-5">
            <I className="h-5 w-5 text-brand-600" />
            <p className="mt-3 font-display text-3xl font-extrabold">{loading ? '–' : value}</p>
            <p className="text-sm text-navy-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Panel title="My Courses" action={<Link to="/portal/courses" className="link-arrow">View all <ArrowRight className="h-4 w-4" /></Link>}>
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2"><Skeleton className="h-48" /><Skeleton className="h-48" /></div>
            ) : data?.enrollments?.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {data.enrollments.slice(0, 4).map((e) => <CourseCard key={e._id} e={e} />)}
              </div>
            ) : (
              <EmptyState icon={BookOpen} title="No courses yet" text="Apply to a training program to get started." action={<Button to="/training" size="sm">Find a program</Button>} />
            )}
          </Panel>

          <Panel title="Assignments" action={<Link to="/portal/assignments" className="link-arrow">View all <ArrowRight className="h-4 w-4" /></Link>}>
            {loading ? <Skeleton className="h-32" /> : <AssignmentList items={(data?.assignments || []).slice(0, 4)} compact />}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Upcoming Classes">
            {loading ? <Skeleton className="h-40" /> : data?.sessions?.length ? (
              <ul className="space-y-3">{data.sessions.slice(0, 3).map((s) => <SessionItem key={s._id} s={s} />)}</ul>
            ) : (
              <EmptyState icon={CalendarClock} title="No upcoming classes" className="py-8" />
            )}
          </Panel>
          <Panel title="Announcements">
            {loading ? <Skeleton className="h-32" /> : <AnnouncementList items={(data?.announcements || []).slice(0, 3)} />}
          </Panel>
        </div>
      </div>
    </>
  );
}

export function PortalCourses() {
  useSeo('My Courses');
  const { data, loading } = usePortal();
  return (
    <>
      <PageTitle title="My Courses" text="Track your progress across all enrolled programs." />
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><Skeleton className="h-52" /><Skeleton className="h-52" /><Skeleton className="h-52" /></div>
      ) : data?.enrollments?.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.enrollments.map((e) => <CourseCard key={e._id} e={e} />)}</div>
      ) : (
        <EmptyState icon={BookOpen} title="You're not enrolled in any courses yet" text="Once your application is accepted, your courses will appear here." action={<Button to="/training">Explore Training Programs</Button>} />
      )}
    </>
  );
}

export function PortalClasses() {
  useSeo('Upcoming Classes');
  const { data, loading } = usePortal();
  return (
    <>
      <PageTitle title="Upcoming Classes" text="Live sessions, workshops and mentor office hours." />
      {loading ? <Skeleton className="h-64" /> : data?.sessions?.length ? (
        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">{data.sessions.map((s) => <SessionItem key={s._id} s={s} />)}</ul>
      ) : (
        <EmptyState icon={CalendarClock} title="No upcoming classes" text="Scheduled sessions for your courses will appear here." />
      )}
    </>
  );
}

function AssignmentList({ items, compact = false }) {
  const { reload } = usePortal();
  const [active, setActive] = useState(null);
  if (!items.length) return <EmptyState icon={ClipboardList} title="No assignments yet" className="py-8" />;
  return (
    <>
      <ul className="divide-y divide-navy-100">
        {items.map((a) => {
          const [tone, label] = dueTone(a);
          return (
            <li key={a._id} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{a.title}</p>
                <p className="text-xs text-navy-500">{a.program?.title}</p>
                {!compact && a.description && <p className="mt-1 text-sm text-navy-600">{a.description}</p>}
                {a.submission?.grade && <p className="mt-1 text-xs font-medium text-emerald-700">Grade: {a.submission.grade}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={tone}>{a.submission && <CheckCircle2 className="h-3 w-3" />} {label}</Badge>
                <Button size="sm" variant={a.submission ? 'ghost' : 'secondary'} icon={Send} onClick={() => setActive(a)}>
                  {a.submission ? 'Resubmit' : 'Submit'}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.title} description="Share a link to your work (GitHub repo, deployed site, Figma file or document).">
        {active && <SubmitForm assignment={active} onDone={() => { setActive(null); reload(); }} />}
      </Modal>
    </>
  );
}

function SubmitForm({ assignment, onDone }) {
  const { field, handleSubmit, submitting, formError } = useForm(
    { link: assignment.submission?.link || '' },
    { link: [rules.required('Submission link'), (v) => (v && !/^https?:\/\//.test(v) ? 'Link must start with http:// or https://' : undefined)] }
  );
  const onSubmit = handleSubmit(async (v) => {
    await api.post(`/portal/assignments/${assignment._id}/submit`, v);
    onDone();
  });
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Input label="Submission link" placeholder="https://github.com/you/project" {...field('link')} />
      <Alert type="error">{formError}</Alert>
      <Button type="submit" className="w-full" loading={submitting}>Submit assignment</Button>
    </form>
  );
}

export function PortalAssignments() {
  useSeo('Assignments');
  const { data, loading } = usePortal();
  return (
    <>
      <PageTitle title="Assignments" text="Submit your work and track feedback from mentors." />
      <div className="card p-6">{loading ? <Skeleton className="h-64" /> : <AssignmentList items={data?.assignments || []} />}</div>
    </>
  );
}

export function PortalCertificates() {
  useSeo('Certificates');
  const { user } = useAuth();
  const { data, loading } = usePortal();
  return (
    <>
      <PageTitle title="Certificates" text="Certificates you have earned by completing HornaAI programs." />
      {loading ? <Skeleton className="h-64" /> : data?.certificates?.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {data.certificates.map((c) => (
            <div key={c._id} className="card overflow-hidden">
              <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900 p-8 text-white">
                <div className="bg-grid-dark absolute inset-0" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <LogoMark className="h-10 w-10" />
                    <Award className="h-10 w-10 text-accent-300" />
                  </div>
                  <p className="mt-8 text-xs uppercase tracking-[.2em] text-accent-300">Certificate of Completion</p>
                  <p className="mt-3 font-display text-2xl font-bold text-white">{user?.name}</p>
                  <p className="mt-1 text-navy-300">has successfully completed</p>
                  <p className="mt-1 font-display text-xl font-semibold text-white">{c.program?.title}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div className="text-sm">
                  <p className="text-navy-500">Issued {formatDate(c.issuedAt)}</p>
                  <p className="font-mono text-xs text-navy-700">ID: {c.code}</p>
                </div>
                <Button size="sm" variant="secondary" icon={Download} onClick={() => window.print()}>
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={Award} title="No certificates yet" text="Complete a program to earn your first certificate." />
      )}
    </>
  );
}

function AnnouncementList({ items }) {
  if (!items.length) return <EmptyState icon={Megaphone} title="No announcements" className="py-8" />;
  return (
    <ul className="space-y-4">
      {items.map((a) => (
        <li key={a._id} className="rounded-xl border border-navy-100 p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold">{a.title}</p>
            {a.pinned && <Pin className="h-4 w-4 shrink-0 text-brand-600" aria-label="Pinned" />}
          </div>
          {a.body && <p className="mt-1 text-sm text-navy-600">{a.body}</p>}
          <p className="mt-2 text-xs text-navy-400">{timeAgo(a.createdAt)}</p>
        </li>
      ))}
    </ul>
  );
}

export function PortalAnnouncements() {
  useSeo('Announcements');
  const { data, loading } = usePortal();
  return (
    <>
      <PageTitle title="Announcements" text="News and updates from the HornaAI team." />
      <div className="max-w-3xl">{loading ? <Skeleton className="h-64" /> : <AnnouncementList items={data?.announcements || []} />}</div>
    </>
  );
}

export function PortalProfile() {
  useSeo('Profile');
  const { user, updateUser } = useAuth();
  const [saved, setSaved] = useState('');
  const profile = useForm(
    { name: user?.name || '', phone: user?.phone || '', location: user?.location || '', bio: user?.bio || '' },
    { name: [rules.required('Name'), rules.min(2, 'Name')], phone: [rules.phone()] }
  );
  const pw = useForm(
    { currentPassword: '', newPassword: '', confirm: '' },
    {
      currentPassword: [rules.required('Current password')],
      newPassword: [rules.required('New password'), rules.min(8, 'New password')],
      confirm: [rules.match('newPassword', 'Passwords do not match')],
    }
  );

  const saveProfile = profile.handleSubmit(async (v) => {
    const { data } = await api.patch('/auth/me', v);
    updateUser(data.user);
    setSaved('profile');
  });
  const savePassword = pw.handleSubmit(async ({ confirm, ...v }) => {
    await api.patch('/auth/me/password', v);
    pw.reset();
    setSaved('password');
  });

  return (
    <>
      <PageTitle title="Profile" text="Manage your personal information and account security." />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="card flex flex-col items-center p-8 text-center">
          <Avatar name={user?.name} src={user?.avatar} size="h-24 w-24" className="text-2xl" />
          <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
          <p className="text-sm text-navy-500">{user?.email}</p>
          <Badge className="mt-3 capitalize">{user?.role}</Badge>
          <p className="mt-4 text-xs text-navy-400">Member since {formatDate(user?.createdAt)}</p>
        </div>
        <div className="space-y-6 xl:col-span-2">
          <form onSubmit={saveProfile} noValidate className="card space-y-5 p-6">
            <h2 className="text-lg font-bold">Personal information</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input label="Full name" {...profile.field('name')} />
              <Input label="Email" value={user?.email || ''} disabled hint="Contact support to change your email." />
              <Input label="Phone" type="tel" {...profile.field('phone')} />
              <Input label="Location" {...profile.field('location')} />
            </div>
            <Textarea label="Bio" rows={3} placeholder="Tell us about your goals…" {...profile.field('bio')} />
            <Alert type="error">{profile.formError}</Alert>
            {saved === 'profile' && <Alert type="success">Profile updated.</Alert>}
            <Button type="submit" loading={profile.submitting}>Save changes</Button>
          </form>
          <form onSubmit={savePassword} noValidate className="card space-y-5 p-6">
            <h2 className="text-lg font-bold">Change password</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              <Input label="Current password" type="password" autoComplete="current-password" {...pw.field('currentPassword')} />
              <Input label="New password" type="password" autoComplete="new-password" {...pw.field('newPassword')} />
              <Input label="Confirm new password" type="password" autoComplete="new-password" {...pw.field('confirm')} />
            </div>
            <Alert type="error">{pw.formError}</Alert>
            {saved === 'password' && <Alert type="success">Password updated.</Alert>}
            <Button type="submit" variant="dark" loading={pw.submitting}>Update password</Button>
          </form>
        </div>
      </div>
    </>
  );
}
