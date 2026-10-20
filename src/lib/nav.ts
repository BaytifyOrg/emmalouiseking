import type { Page } from '../types';

export interface Route {
  page: Page;
  slug?: string;
}

export function readRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const careers = path.match(/^\/careers(?:\/([a-z0-9-]+))?$/);
  if (careers) return { page: 'careers', slug: careers[1] };
  if (path === '/partners' || path === '/partner') return { page: 'partners' };
  const intro = path.match(/^\/intro\/([a-z0-9-]+)$/);
  if (intro) return { page: 'intro', slug: intro[1] };
  if (window.location.hash.startsWith('#blog')) return { page: 'blogs' };
  return { page: 'home' };
}

export const pathFor = (page: Page, slug?: string) => {
  if (page === 'careers') return slug ? `/careers/${slug}` : '/careers';
  if (page === 'partners') return '/partners';
  if (page === 'intro' && slug) return `/intro/${slug}`;
  return '/';
};
