import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Misc';
import { cn } from '@/lib/format';

/** Shared sidebar shell for the Student Portal and Admin dashboard. */
export default function DashboardShell({ nav, label, children, dark = false }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const sidebar = (
    <div className={cn('flex h-full flex-col', dark ? 'bg-navy-950 text-navy-200' : 'bg-white')}>
      <div className="flex h-16 items-center justify-between px-5">
        <Logo dark={dark} to={nav[0].to} />
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <p className={cn('px-5 pb-2 pt-4 text-[11px] font-semibold uppercase tracking-wider', dark ? 'text-navy-500' : 'text-navy-400')}>{label}</p>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4" aria-label={label}>
        {nav.map(({ to, label: l, icon: I, end, group }) =>
          group ? (
            <p key={group} className={cn('px-3 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-wider', dark ? 'text-navy-500' : 'text-navy-400')}>
              {group}
            </p>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  dark
                    ? isActive
                      ? 'bg-white/10 text-white'
                      : 'text-navy-300 hover:bg-white/5 hover:text-white'
                    : isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                )
              }
            >
              <I className="h-[18px] w-[18px] shrink-0" /> {l}
            </NavLink>
          )
        )}
      </nav>
      <div className={cn('border-t p-4', dark ? 'border-white/10' : 'border-navy-100')}>
        <div className="flex items-center gap-3">
          <Avatar name={user?.name} src={user?.avatar} className="h-9 w-9 text-xs" />
          <div className="min-w-0 flex-1">
            <p className={cn('truncate text-sm font-semibold', dark ? 'text-white' : 'text-navy-900')}>{user?.name}</p>
            <p className="truncate text-xs text-navy-400">{user?.email}</p>
          </div>
          <button onClick={logout} className="rounded-lg p-2 text-navy-400 transition hover:bg-red-50 hover:text-red-600" aria-label="Sign out" title="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-50/60">
      <aside className={cn('fixed inset-y-0 left-0 z-40 hidden w-64 border-r lg:block', dark ? 'border-navy-900' : 'border-navy-100')}>{sidebar}</aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-navy-950/50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 shadow-lift lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-navy-100 bg-white/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <button className="-ml-1 rounded-lg p-2 text-navy-700 hover:bg-navy-50 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-navy-900">{label}</p>
          <Link to="/" className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-900">
            View website <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </header>
        <motion.main
          id="main"
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-8 sm:px-6 lg:px-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export function PageTitle({ title, text, actions }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {text && <p className="mt-1 text-navy-600">{text}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
