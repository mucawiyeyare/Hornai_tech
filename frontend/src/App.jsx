import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import ScrollManager from '@/components/layout/ScrollManager';
import { PageLoader } from '@/components/ui/States';
import Home from '@/pages/Home';
import RequireAuth from '@/components/RequireAuth';

// Route-level code splitting: marketing pages load fast; portal/admin load on demand.
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Training = lazy(() => import('@/pages/Training'));
const ProgramDetail = lazy(() => import('@/pages/ProgramDetail'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/Projects').then((m) => ({ default: m.ProjectDetail })));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.BlogPost })));
const Contact = lazy(() => import('@/pages/Contact'));
const StartProject = lazy(() => import('@/pages/StartProject'));
const LegalPage = lazy(() => import('@/pages/Misc').then((m) => ({ default: m.LegalPage })));
const NotFound = lazy(() => import('@/pages/Misc').then((m) => ({ default: m.NotFound })));

const auth = (name) => lazy(() => import('@/pages/auth/AuthPages').then((m) => ({ default: m[name] })));
const Login = auth('Login');
const Register = auth('Register');
const ForgotPassword = auth('ForgotPassword');
const ResetPassword = auth('ResetPassword');

const portal = (name) => lazy(() => import('@/pages/portal/Portal').then((m) => ({ default: m[name] })));
const PortalLayout = portal('PortalLayout');
const PortalDashboard = portal('PortalDashboard');
const PortalCourses = portal('PortalCourses');
const PortalClasses = portal('PortalClasses');
const PortalAssignments = portal('PortalAssignments');
const PortalCertificates = portal('PortalCertificates');
const PortalAnnouncements = portal('PortalAnnouncements');
const PortalProfile = portal('PortalProfile');

const admin = (name) => lazy(() => import('@/pages/admin/Admin').then((m) => ({ default: m[name] })));
const AdminLayout = admin('AdminLayout');
const AdminOverview = admin('AdminOverview');
const ResourceManager = admin('ResourceManager');

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="pt-32"><PageLoader /></div>}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="training" element={<Training />} />
            <Route path="training/:slug" element={<ProgramDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="start-project" element={<StartProject />} />
            <Route path="privacy" element={<LegalPage kind="privacy" />} />
            <Route path="terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />

          <Route path="portal" element={<RequireAuth><PortalLayout /></RequireAuth>}>
            <Route index element={<PortalDashboard />} />
            <Route path="courses" element={<PortalCourses />} />
            <Route path="classes" element={<PortalClasses />} />
            <Route path="assignments" element={<PortalAssignments />} />
            <Route path="certificates" element={<PortalCertificates />} />
            <Route path="announcements" element={<PortalAnnouncements />} />
            <Route path="profile" element={<PortalProfile />} />
          </Route>

          <Route path="admin" element={<RequireAuth role="admin"><AdminLayout /></RequireAuth>}>
            <Route index element={<AdminOverview />} />
            <Route path=":resource" element={<ResourceManager />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
