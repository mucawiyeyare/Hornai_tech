import * as content from '@shared/content.js';
import { useApi } from './useApi';

// CMS-backed content with local fallbacks, so public pages render even if the API is offline.
export const useStats = () => useApi('/stats', { fallback: content.stats });
export const usePrograms = () => useApi('/programs', { fallback: content.programs });
export const useProjects = () => useApi('/projects', { fallback: content.projects });
export const usePosts = () => useApi('/posts', { fallback: content.posts });
export const useTestimonials = () => useApi('/testimonials', { fallback: content.testimonials });
export const usePartners = () => useApi('/partners', { fallback: content.partners });

export const useProgram = (slug) =>
  useApi(`/programs/${slug}`, { fallback: content.programs.find((p) => p.slug === slug) });
export const useProject = (slug) =>
  useApi(`/projects/${slug}`, { fallback: content.projects.find((p) => p.slug === slug) });
export const usePost = (slug) => useApi(`/posts/${slug}`, { fallback: content.posts.find((p) => p.slug === slug) });
