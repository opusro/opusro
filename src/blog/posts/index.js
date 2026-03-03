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
    slug: 'the-color-of-nothing',
    title: 'The Color of Nothing',
    subtitle: 'Why #050505 is not #000000, and why the difference matters.',
    date: '2026-03-03',
    excerpt:
      'We spent three weeks choosing a background color. Pure black is a lie, four greys are all you need, and font weight is your real color palette.',
    readingTime: '5 min read',
    component: lazy(() => import('./the-color-of-nothing.mdx')),
  },
  {
    slug: 'silence-as-a-feature',
    title: 'Silence as a Feature',
    subtitle: 'On designing for the moment after you close the app.',
    date: '2026-02-18',
    excerpt:
      'Most apps are designed to prevent silence from ever arriving. We design for it.',
    readingTime: '5 min read',
    component: lazy(() => import('./silence-as-a-feature.mdx')),
  },
  {
    slug: 'the-stack-is-the-statement',
    title: 'The Stack Is the Statement',
    subtitle: 'Our tech stack is boring on purpose.',
    date: '2026-02-04',
    excerpt:
      'React, vanilla CSS, Three.js, static hosting. Every dependency is a bet — and we prefer to keep the odds in our favor.',
    readingTime: '4 min read',
    component: lazy(() => import('./the-stack-is-the-statement.mdx')),
  },
  {
    slug: 'ten-principles',
    title: 'Ten Principles',
    subtitle: 'The compass headings we return to when the easy path and the right path diverge.',
    date: '2026-01-15',
    excerpt:
      'Respect attention. Ship less. Charge honestly. Stay small. These are not rules — they are decisions we made before the pressure arrived.',
    readingTime: '4 min read',
    component: lazy(() => import('./ten-principles.mdx')),
  },
  {
    slug: 'building-for-the-human-experience',
    title: 'Building for the Human Experience',
    subtitle: 'Why we design tools that respect your attention, not exploit it.',
    date: '2026-01-02',
    excerpt:
      'The attention economy has failed us. Every app fights for your time. We decided to build differently.',
    readingTime: '4 min read',
    component: lazy(() => import('./building-for-the-human-experience.mdx')),
  },
];
