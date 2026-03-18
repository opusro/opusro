import { lazy } from 'react';

/**
 * Blog Posts Manifest
 *
 * To add a new post:
 * 1. Create a new .mdx file in this folder (e.g., my-post-slug.mdx)
 * 2. Add an entry to the `posts` array below
 * 3. That's it — it appears on /blog and renders at /blog/my-post-slug
 */
export const posts = [
  {
    slug: 'ten-principles',
    title: 'Ten Principles',
    subtitle: 'The compass headings we return to when the easy path and the right path diverge.',
    date: '2026-01-15',
    excerpt:
      'Respect attention. Ship less. Charge honestly. Stay small. These are not rules - they are decisions we made before the pressure arrived.',
    readingTime: '4 min read',
    component: lazy(() => import('./ten-principles.mdx')),
  },
];
