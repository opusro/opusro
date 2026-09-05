#!/usr/bin/env node
/**
 * In holding mode the public site is one page. Astro still builds every route,
 * so this deletes the rest from dist before anything is published: an unlinked
 * page is still a findable page, and the point of the holding state is that
 * there is nothing to find.
 *
 * What survives is the holding page, the 404, and exactly the assets those two
 * reference (read out of the HTML, so adding an image to the holding page never
 * means remembering to edit this list). Runs from `npm run build`;
 * `npm run build:full` never calls it.
 */

import { readdirSync, readFileSync, rmSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';

const pages = ['index.html', '404.html'];
const keep = new Set([...pages, 'favicon.svg', 'favicon.ico', 'og.png', 'robots.txt', 'CNAME', '_astro']);

// Everything those pages point at on our own origin.
for (const page of pages) {
	const path = join(dist, page);
	if (!existsSync(path)) continue;
	const html = readFileSync(path, 'utf8');
	for (const m of html.matchAll(/(?:src|href)="\/([^"]+)"/g)) {
		const ref = m[1].split(/[?#]/)[0];
		if (!ref) continue;
		keep.add(ref.split('/')[0]);
	}
}

let removed = 0;
for (const name of readdirSync(dist)) {
	if (keep.has(name)) continue;
	rmSync(join(dist, name), { recursive: true, force: true });
	removed++;
}

writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');

// Belt and braces: what must never be in a holding build.
for (const gone of ['story', 'notes', 'loop', 'cheri', 'wip', 'work', 'support', 'contact', 'privacy', 'blog', 'rss.xml', 'feed.json']) {
	if (existsSync(join(dist, gone))) {
		console.error(`Holding build still contains /${gone} — aborting.`);
		process.exit(1);
	}
}

// And the holding page must actually be the holding page.
const home = readFileSync(join(dist, 'index.html'), 'utf8');
if (!home.includes('card--contact')) {
	console.error('index.html is not the holding page — aborting.');
	process.exit(1);
}

console.log(`Holding build: one page, ${removed} other entries pruned, kept ${[...keep].filter((k) => existsSync(join(dist, k))).length}.`);
