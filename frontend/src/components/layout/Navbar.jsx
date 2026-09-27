import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, GraduationCap, LayoutDashboard, Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/format';

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/training', label: 'Training' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

// Routes whose hero is dark: the un-scrolled navbar switches to light text.
const DARK_HERO = /^\/training\/[^/]+\/?$/;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const portalLink = user?.role === 'admin' ? '/admin' : '/portal';
  const onDark = DARK_HERO.test(pathname) && !scrolled && !open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b border-navy-100/80 bg-white/85 shadow-soft backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <nav className={cn('container flex items-center justify-between transition-all duration-300', scrolled ? 'h-16' : 'h-20')} aria-label="Main">
        <Logo dark={onDark} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? onDark ? 'text-white' : 'text-brand-700'
                      : onDark ? 'text-navy-200 hover:text-white' : 'text-navy-600 hover:text-navy-900'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span layoutId="nav-underline" className={cn('absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full', onDark ? 'bg-accent-400' : 'bg-brand-600')} />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Button to={portalLink} variant={onDark ? 'outlineLight' : 'ghost'} size="sm" icon={LayoutDashboard}>
              {user.role === 'admin' ? 'Admin' : 'My Portal'}
            </Button>
          ) : (
            <Button to="/login" variant={onDark ? 'outlineLight' : 'ghost'} size="sm" icon={GraduationCap}>
              Student Portal
            </Button>
          )}
          <Button to="/start-project" size="sm" iconRight={ArrowRight}>
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className={cn('-mr-2 rounded-xl p-2.5 lg:hidden', onDark ? 'text-white hover:bg-white/10' : 'text-navy-800 hover:bg-navy-50')}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto bg-white lg:hidden"
          >
            <div className="container flex flex-col gap-1 pb-8 pt-2">
              {NAV_LINKS.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold',
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-navy-800 hover:bg-navy-50'
                      )
                    }
                  >
                    {l.label}
                    <ArrowRight className="h-4 w-4 opacity-40" />
                  </NavLink>
                </motion.div>
              ))}
              <div className="mt-6 grid gap-3 border-t border-navy-100 pt-6">
                <Button to={user ? portalLink : '/login'} variant="secondary" size="lg" icon={GraduationCap}>
                  {user ? 'My Portal' : 'Student Portal'}
                </Button>
                <Button to="/start-project" size="lg" iconRight={ArrowRight}>
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
