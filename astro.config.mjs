import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// opus.ro, the studio site. Static output, deployed to GitHub Pages.
export default defineConfig({
	site: 'https://opus.ro',
	// Every URL ends in a slash so there is exactly one canonical form of each
	// address. GitHub Pages serves index.html for a directory, so this is also
	// the form that needs no redirect.
	trailingSlash: 'always',
	build: {
		format: 'directory',
		// Small stylesheets are inlined; the CSP allows inline styles for that.
		inlineStylesheets: 'auto',
	},
	// The old single-page app had two blog URLs. Keep them working.
	redirects: {
		'/blog': '/notes/',
		'/blog/ten-principles': '/notes/2026/ten-principles/',
	},
	integrations: [sitemap()],
	vite: {
		build: {
			// Vite inlines assets under 4 kB as data: URIs. The CSP says
			// `font-src 'self'`, and a data: URI is not 'self', so a small font
			// subset would be silently blocked. Fonts stay real files.
			assetsInlineLimit(filePath) {
				if (/\.(woff2?|ttf|otf|eot)$/i.test(filePath)) return false;
				return undefined;
			},
		},
	},
	devToolbar: { enabled: false },
});
