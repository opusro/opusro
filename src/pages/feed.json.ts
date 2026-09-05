import type { APIRoute } from 'astro';
import { jsonFeed } from '../lib/feeds';
import { feedItems } from '../lib/notes';

export const GET: APIRoute = async () => jsonFeed(await feedItems());
