/**
 * The single source of truth for who this site is.
 *
 * Every page, feed, sitemap entry and canonical URL reads from here. Change
 * things here and nowhere else. See docs/04-system.md §5 for the choices.
 */

export const SITE = {
	name: 'OPUS',
	/** Under the mark. A descriptor, not a tagline. */
	descriptor: 'human experience design',
	/** The one sentence said out loud. docs/01-story.md */
	thesis: 'We make tools for people, not for users.',
	description:
		'OPUS is a small design studio in Romania making calm tools for people: Loop, a free timer for practice, and more in the works.',
	url: 'https://opus.ro',
	/** The one door. support@ is an alias. */
	email: 'hello@opus.ro',
	legal: 'Opusculum SRL',
	city: 'Cluj-Napoca, Romania',
	locale: 'en',
	timeZone: 'Europe/Bucharest',
	since: 2026,
} as const;

/** The dictionary entries the mark expands into. */
export const DICTIONARY = [
	{ word: 'opus', pos: 'n.', lang: 'Latin', meaning: 'a body of work; a creative composition' },
	{ word: 'opus', pos: 'adj.', lang: 'Romanian', meaning: 'opposite; against the grain' },
] as const;

/**
 * Doorways. Places that point back here. Nothing exists only on one of them.
 */
export const DOORWAYS = [
	{ label: 'YouTube', url: 'https://www.youtube.com/@opusro' },
	{ label: 'Instagram', url: 'https://www.instagram.com/opus.ro' },
] as const;

/**
 * Patronage. opus.ro/support is the only address anyone is given; the provider
 * sits behind it and can change. `null` until the account exists (D4): the
 * page then offers the email as the only action.
 */
export const SUPPORT: { provider: 'patreon' | null; url: string | null } = {
	provider: null,
	url: null,
};

/**
 * Traffic counter. Cookieless, no personal data, no consent banner. Off until
 * the account exists (D3a); flip `enabled` and the script and its CSP
 * allowance appear together, and /privacy names it.
 */
export const COUNTER = {
	enabled: true,
	provider: 'Plausible',
	domain: 'opus.ro',
	/** The per-site script Plausible issued for opus.ro. Public by nature. */
	scriptSrc: 'https://plausible.io/js/pa-kXx6YxtkwLzzZWY-oXqVI.js',
	origin: 'https://plausible.io',
} as const;

/** Site navigation for every page except home. Lowercase on purpose. */
export const NAV = [
	{ label: 'story', href: '/story/' },
	{ label: 'tools', href: '/#tools' },
	{ label: 'notes', href: '/notes/' },
	{ label: 'support', href: '/support/' },
	{ label: 'work', href: '/work/' },
] as const;

/** Absolute URL for a path on this site. */
export function absoluteUrl(path = '/'): string {
	return new URL(path, SITE.url).href;
}
