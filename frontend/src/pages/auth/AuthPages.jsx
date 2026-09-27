import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Award, Eye, EyeOff, FolderGit2, MailCheck, UserCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { rules, useForm } from '@/hooks/useForm';
import { useSeo } from '@/hooks/useSeo';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import { Alert } from '@/components/ui/States';

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-4 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-900">
            <ArrowLeft className="h-4 w-4" /> Website
          </Link>
        </div>
        <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="text-3xl font-extrabold">{title}</h1>
          {subtitle && <p className="mt-2 text-navy-600">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-navy-600">{footer}</div>}
        </main>
      </div>
      <aside className="relative hidden overflow-hidden bg-navy-950 lg:block">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-accent-500/25 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center p-16 text-white">
          <span className="eyebrow w-fit border-white/10 bg-white/5 text-accent-300">Student Portal</span>
          <h2 className="mt-6 max-w-md text-4xl font-extrabold leading-tight text-white">Learn. Practice. Build. Grow.</h2>
          <p className="mt-4 max-w-md text-lg text-navy-300">Your courses, classes, assignments and certificates — all in one place.</p>
          <div className="mt-12 grid max-w-md gap-3">
            {[
              { icon: FolderGit2, t: 'Track course progress and assignments' },
              { icon: UserCheck, t: 'Stay on top of upcoming live classes' },
              { icon: Award, t: 'Download and verify your certificates' },
            ].map(({ icon: I, t }) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <I className="h-5 w-5 text-accent-300" />
                <span className="text-sm text-navy-100">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input type={show ? 'text' : 'password'} {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-[2.1rem] rounded-md p-1 text-navy-400 hover:text-navy-700"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export const homeFor = (user) => (user?.role === 'admin' ? '/admin' : '/portal');

export function Login() {
  useSeo('Sign in');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { field, handleSubmit, submitting, formError } = useForm(
    { email: '', password: '' },
    { email: [rules.required('Email'), rules.email()], password: [rules.required('Password')] }
  );

  if (user) return <Navigate to={homeFor(user)} replace />;

  const onSubmit = handleSubmit(async (v) => {
    const u = await login(v);
    navigate(location.state?.from?.pathname || homeFor(u), { replace: true });
  });

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your HornaAI Student Portal."
      footer={
        <>
          New to HornaAI?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Input label="Email" type="email" autoComplete="email" {...field('email')} />
        <PasswordInput label="Password" autoComplete="current-password" {...field('password')} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            Forgot password?
          </Link>
        </div>
        <Alert type="error">{formError}</Alert>
        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}

export function Register() {
  useSeo('Create account');
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const { field, handleSubmit, submitting, formError } = useForm(
    { name: '', email: '', phone: '', password: '', confirm: '' },
    {
      name: [rules.required('Full name'), rules.min(2, 'Full name')],
      email: [rules.required('Email'), rules.email()],
      phone: [rules.phone()],
      password: [rules.required('Password'), rules.min(8, 'Password')],
      confirm: [rules.required('Confirm password'), rules.match('password', 'Passwords do not match')],
    }
  );

  if (user) return <Navigate to={homeFor(user)} replace />;

  const onSubmit = handleSubmit(async ({ confirm, ...v }) => {
    await register(v);
    navigate('/portal', { replace: true });
  });

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join the HornaAI student community."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Input label="Full name" autoComplete="name" {...field('name')} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Email" type="email" autoComplete="email" {...field('email')} />
          <Input label="Phone (optional)" type="tel" autoComplete="tel" {...field('phone')} />
        </div>
        <PasswordInput label="Password" autoComplete="new-password" hint="At least 8 characters" {...field('password')} />
        <PasswordInput label="Confirm password" autoComplete="new-password" {...field('confirm')} />
        <Alert type="error">{formError}</Alert>
        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          Create account
        </Button>
        <p className="text-center text-xs text-navy-500">
          By creating an account you agree to our{' '}
          <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </form>
    </AuthShell>
  );
}

export function ForgotPassword() {
  useSeo('Reset password');
  const [result, setResult] = useState(null);
  const { field, handleSubmit, submitting, formError } = useForm({ email: '' }, { email: [rules.required('Email'), rules.email()] });
  const onSubmit = handleSubmit(async (v) => {
    const { data } = await api.post('/auth/forgot-password', v);
    setResult(data);
  });

  return (
    <AuthShell
      title={result ? 'Check your email' : 'Forgot your password?'}
      subtitle={result ? undefined : "Enter your email and we'll send you a link to reset your password."}
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 font-semibold text-brand-600">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      }
    >
      {result ? (
        <div className="space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <MailCheck className="h-7 w-7" />
          </div>
          <p className="text-navy-600">{result.message}</p>
          {result.devResetLink && (
            <Alert type="info">
              Development mode: no email service is configured.{' '}
              <a href={result.devResetLink.replace(/^https?:\/\/[^/]+/, '')} className="font-semibold underline">
                Open reset link
              </a>
            </Alert>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Input label="Email" type="email" autoComplete="email" {...field('email')} />
          <Alert type="error">{formError}</Alert>
          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

export function ResetPassword() {
  useSeo('Choose a new password');
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { field, handleSubmit, submitting, formError } = useForm(
    { password: '', confirm: '' },
    {
      password: [rules.required('Password'), rules.min(8, 'Password')],
      confirm: [rules.match('password', 'Passwords do not match')],
    }
  );
  const onSubmit = handleSubmit(async (v) => {
    const u = await resetPassword(token, v.password);
    navigate(homeFor(u), { replace: true });
  });
  return (
    <AuthShell title="Choose a new password" subtitle="Your new password must be at least 8 characters.">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <PasswordInput label="New password" autoComplete="new-password" {...field('password')} />
        <PasswordInput label="Confirm new password" autoComplete="new-password" {...field('confirm')} />
        <Alert type="error">{formError}</Alert>
        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          Update password
        </Button>
      </form>
    </AuthShell>
  );
}
