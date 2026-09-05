import type { APIRoute } from 'astro';
import { rssFeed } from '../lib/feeds';
import { feedItems } from '../lib/notes';

export const GET: APIRoute = async () => rssFeed(await feedItems());
