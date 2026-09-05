#!/usr/bin/env node
/**
 * Runs after `astro build`. Turns three rules from docs/ into mechanisms:
 *
 *   1. opus.ro never mentions eratic.ro (docs/04-system.md §3).
 *   2. No em or en dashes in anything the public reads (docs/02-brand.md §3).
 *   3. No script is loaded from an origin the config did not allow
 *      (docs/04-system.md §1).
 *
 * Fails the build naming the file and the line, so a slip is caught before it
 * reaches a deploy rather than a year later.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const allowedScriptOrigins = new Set(['https://plausible.io']);

function* htmlFiles(dir) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* htmlFiles(path);
		else if (name.endsWith('.html') || name.endsWith('.xml') || name.endsWith('.json')) yield path;
	}
}

const problems = [];

for (const file of htmlFiles(dist)) {
	const text = readFileSync(file, 'utf8');
	const rel = relative(process.cwd(), file);
	const lines = text.split('\n');

	lines.forEach((line, i) => {
		if (/eratic/i.test(line)) problems.push(`${rel}:${i + 1}: mentions eratic`);
		if (/[—–]/.test(line)) problems.push(`${rel}:${i + 1}: em or en dash in public text`);
	});

	for (const match of text.matchAll(/<script[^>]*\ssrc=["']([^"']+)["']/gi)) {
		const src = match[1];
		if (/^https?:\/\//i.test(src)) {
			const origin = new URL(src).origin;
			if (!allowedScriptOrigins.has(origin)) problems.push(`${rel}: script loaded from ${origin}`);
		}
	}
}

if (problems.length) {
	console.error('\nOutput check failed:\n');
	for (const p of problems) console.error('  ' + p);
	console.error('');
	process.exit(1);
}

console.log('Output check passed: no eratic, no dashes, no unexpected scripts.');
