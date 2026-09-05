# opus.ro

The website of OPUS, a small design studio in Cluj-Napoca, Romania, that makes
tools for people, not for users.

## Where things are

| | |
|---|---|
| `docs/` | The brand and system reference: story, brand, products, system, website spec, decisions. **Start with [`docs/README.md`](docs/README.md).** |
| `src/`, `index.html`, `public/` | The current site, a React single-page application. It is being replaced by a static Astro site per [`docs/05-website.md`](docs/05-website.md). |
| `_inspiration/` | 2025 synthesis of the founder's notes. History, not law; see `docs/README.md` §Sources. Not for public deployment. |

## Running the current site

```bash
npm install
npm run dev       # local preview
npm run build     # static build to dist/
```

Deploys to GitHub Pages from `main` via `.github/workflows/deploy.yml`.
