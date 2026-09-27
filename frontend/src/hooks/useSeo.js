import { useEffect } from 'react';

const DEFAULT_DESC =
  'HornaAI builds digital systems for organizations and provides practical technology training for students and young professionals.';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSeo(title, description = DEFAULT_DESC) {
  useEffect(() => {
    const full = title ? `${title} | HornaAI` : 'HornaAI — Building Digital Solutions. Empowering the Next Generation.';
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
  }, [title, description]);
}
