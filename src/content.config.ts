import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Two collections. Frontmatter is the whole authoring interface; see
 * docs/05-website.md §4 for the fields and docs/04-system.md §6 for when to
 * write what.
 *
 * The vocabulary rule is enforced here rather than remembered: a tool's public
 * strings may not contain an exclamation mark or an em dash. The build fails
 * with the field named.
 */

const plain = (label: string) =>
	z
		.string()
		.min(1)
		.refine((s) => !s.includes('!'), { message: `${label}: no exclamation marks in public copy.` })
		.refine((s) => !/[—–]/.test(s), {
			message: `${label}: no em or en dashes in public copy. Use a full stop, a comma or a colon.`,
		});

const tools = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/tools' }),
	schema: z
		.object({
			name: plain('name'),
			oneLine: plain('oneLine'),
			/** Which of the three circles this tool serves. */
			circle: z.enum(['you with yourself', 'you with your people', 'you with everyone']),
			status: z.enum(['available', 'in-the-works', 'imagined']),
			/**
			 * false = built and reachable at its URL, but linked from nowhere.
			 * The honest way to keep a page unfinished. Flip to list it.
			 */
			listed: z.boolean().default(false),
			/** One colour per tool. Used only on this tool's page and tile. */
			accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
			platforms: z.array(z.string()).default([]),
			price: plain('price'),
			appStoreUrl: z.url().optional(),
			webUrl: z.url().optional(),
			privacyUrl: z.string().optional(),
			helpUrl: z.string().optional(),
			/** Short factual lines, each with its mechanism. Not vows. */
			facts: z.array(plain('facts')).default([]),
			/** A short screen recording, root-relative. Optional. */
			video: z.string().optional(),
			/** The glyph shown on the tile and page, root-relative SVG. */
			glyph: z.string().optional(),
		})
		.refine((t) => t.status !== 'available' || t.appStoreUrl || t.webUrl, {
			message: 'An available tool needs an appStoreUrl or a webUrl.',
		}),
});

const notes = defineCollection({
	loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
	schema: z.object({
		title: z.string().min(1),
		/** Meta description, listing blurb, feed text. Required everywhere. */
		summary: z.string().min(1).max(400),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		kind: z.enum(['release', 'decision', 'letter', 'essay']),
		/** Filters the note onto that tool's page. */
		tool: z.string().optional(),
		/** The comment section: a Patreon post, when there is one. */
		discussUrl: z.url().optional(),
		/** Drafts build in dev and never deploy. Future dates wait. */
		draft: z.boolean().default(false),
	}),
});

export const collections = { tools, notes };
