/**
 * Dates are formatted in the studio's time zone, never the build machine's,
 * so a note carries the same date on a laptop and in CI.
 */

import { SITE } from '../config';

const long = new Intl.DateTimeFormat(SITE.locale, {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZone: SITE.timeZone,
});

const short = new Intl.DateTimeFormat(SITE.locale, {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	timeZone: SITE.timeZone,
});

/** "5 September 2026" */
export const formatDate = (date: Date): string => long.format(date);

/** "5 Sept 2026" */
export const formatDateShort = (date: Date): string => short.format(date);

export const isoDate = (date: Date): string => date.toISOString();

/** Rough reading time; "6 min" is useful, decimals would be false precision. */
export function readingTime(text: string): string {
	const words = text.trim().split(/\s+/).length;
	return `${Math.max(1, Math.round(words / 220))} min`;
}
