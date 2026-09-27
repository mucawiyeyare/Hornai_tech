import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SiteLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}

/** Standard inner-page header used by About, Services, Training, etc. */
export function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white pb-16 pt-32 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container relative text-center">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-navy-600">{text}</p>}
        {children}
      </div>
    </section>
  );
}
