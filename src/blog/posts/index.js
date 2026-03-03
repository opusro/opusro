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
    slug: 'building-for-the-human-experience',
    title: 'Building for the Human Experience',
    subtitle: 'Why we design tools that respect your attention, not exploit it.',
    date: '2026-03-03',
    excerpt:
      'The attention economy has failed us. Every app fights for your time. We decided to build differently.',
    readingTime: '4 min read',
    component: lazy(() => import('./building-for-the-human-experience.mdx')),
  },
];
