/**
 * The one place that knows which notes are published and in what order. The
 * listing, the home page, the tool pages and both feeds read from here.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;
export type Tool = CollectionEntry<'tools'>;

/**
 * Drafts and future-dated notes show in `astro dev` and are excluded from
 * every production build. Write it, see it locally, commit it; it stays
 * invisible until `draft: false` and its date arrives.
 */
function isPublished(data: { draft: boolean; pubDate: Date }): boolean {
	if (import.meta.env.DEV) return true;
	return !data.draft && data.pubDate.getTime() <= Date.now();
}

export async function allNotes(): Promise<Note[]> {
	const notes = await getCollection('notes');
	return notes
		.filter((note) => isPublished(note.data))
		.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function notesFor(tool: string): Promise<Note[]> {
	return (await allNotes()).filter((note) => note.data.tool === tool);
}

/** Collection ids carry the year folder: "2026/how-the-wheel-feels". */
export function notePath(note: { id: string }): string {
	return `/notes/${note.id}/`;
}

export async function allTools(): Promise<Tool[]> {
	const order = ['you with yourself', 'you with your people', 'you with everyone'];
	const tools = await getCollection('tools');
	return tools.sort((a, b) => order.indexOf(a.data.circle) - order.indexOf(b.data.circle));
}

export async function listedTools(): Promise<Tool[]> {
	return (await allTools()).filter((tool) => tool.data.listed);
}

export function toolPath(tool: { id: string }): string {
	return `/${tool.id}/`;
}

export const STATUS_LABEL: Record<Tool['data']['status'], string> = {
	available: 'available',
	'in-the-works': 'in the works',
	imagined: 'imagined',
};

export const KIND_LABEL: Record<Note['data']['kind'], string> = {
	release: 'release',
	decision: 'decision',
	letter: 'letter',
	essay: 'essay',
};

/** Feed items, full text where the note is plain Markdown. */
export async function feedItems() {
	const notes = await allNotes();
	return notes.map((note) => ({
		path: notePath(note),
		title: note.data.title,
		summary: note.data.summary,
		pubDate: note.data.pubDate,
		updatedDate: note.data.updatedDate,
		tags: [note.data.kind, ...(note.data.tool ? [note.data.tool] : [])],
		content: (note as { rendered?: { html?: string } }).rendered?.html,
	}));
}
