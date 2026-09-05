/**
 * RSS 2.0 and JSON Feed 1.1, from one item list so they never drift.
 * Plain Markdown notes travel whole; the summary is the fallback.
 */

import rss, { type RSSFeedItem } from '@astrojs/rss';
import { SITE, absoluteUrl } from '../config';

export interface FeedItem {
	path: string;
	title: string;
	summary: string;
	pubDate: Date;
	updatedDate?: Date;
	content?: string;
	tags?: string[];
}

/** Rewrite root-relative URLs to absolute ones; a reader has no origin. */
export function absolutise(html: string): string {
	return html.replace(
		/\b(src|href|poster)=("|')(\/(?!\/)[^"']*)\2/gi,
		(_m, attr: string, q: string, path: string) => `${attr}=${q}${absoluteUrl(path)}${q}`,
	);
}

const FEED_TITLE = `${SITE.name} · notes`;
const FEED_DESCRIPTION = 'Notes from OPUS: releases, decisions, letters and essays.';

export function rssFeed(items: FeedItem[]) {
	const feedItems: RSSFeedItem[] = items.map((item) => ({
		title: item.title,
		link: absoluteUrl(item.path),
		pubDate: item.pubDate,
		description: item.summary,
		content: item.content ? absolutise(item.content) : undefined,
		categories: item.tags,
		author: `${SITE.email} (${SITE.name})`,
	}));

	return rss({
		title: FEED_TITLE,
		description: FEED_DESCRIPTION,
		site: SITE.url,
		items: feedItems,
		trailingSlash: true,
		customData: [
			`<language>${SITE.locale}</language>`,
			`<atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml"/>`,
		].join(''),
		xmlns: { atom: 'http://www.w3.org/2005/Atom' },
	});
}

export function jsonFeed(items: FeedItem[]): Response {
	const feed = {
		version: 'https://jsonfeed.org/version/1.1',
		title: FEED_TITLE,
		home_page_url: SITE.url,
		feed_url: absoluteUrl('/feed.json'),
		description: FEED_DESCRIPTION,
		language: SITE.locale,
		authors: [{ name: SITE.name, url: SITE.url }],
		items: items.map((item) => {
			const url = absoluteUrl(item.path);
			return {
				id: url,
				url,
				title: item.title,
				summary: item.summary,
				content_html: item.content
					? absolutise(item.content)
					: `<p>${escapeHtml(item.summary)}</p><p><a href="${url}">Read it on the site</a></p>`,
				date_published: item.pubDate.toISOString(),
				date_modified: item.updatedDate?.toISOString(),
				tags: item.tags?.length ? item.tags : undefined,
			};
		}),
	};

	return new Response(JSON.stringify(feed, null, '\t'), {
		headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
	});
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
