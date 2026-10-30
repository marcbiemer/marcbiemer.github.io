# marcbiemer.github.io

Personal portfolio and work — built with Next.js, statically exported and hosted on GitHub Pages.

🌐 [marcbiemer.github.io](https://marcbiemer.github.io)

---

## Stack

- **Next.js 16** — App Router, static export (`output: 'export'`)
- **TypeScript**
- **Lenis** — smooth scroll
- **GitHub Actions** — automated build and deploy
- **GitHub Pages** — hosting

Content is managed via a local `public/content.json` file — no CMS or database required.

---

## Project Structure

```
├── public/
│   ├── content.json          # All site content (projects, bio, socials)
│   └── media/                # Images and assets
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home / landing
│   │   └── work/
│   │       └── [slug]/
│   │           ├── page.tsx          # Server component — resolves slug
│   │           └── ProjectClient.tsx # Client component — renders project
│   ├── data/
│   │   └── content.ts        # Typed helper for content.json
│   └── components/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Build and deploy to GitHub Pages
└── next.config.ts
```

---

## Getting Started

**Prerequisites:** Node.js 20+

```bash
# Clone the repo
git clone https://github.com/marcbiemer/marcbiemer.github.io.git
cd marcbiemer.github.io

# Install dependencies
pnpm i

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Content

All content lives in `public/content.json`. Edit it to update the site:

```json
{
    "bio": "...",
    "projects": [
        {
            "id": "project-slug",
            "title": "Project Title",
            "description": "...",
            "tags": ["Tag"]
        }
    ],
    "socials": [{ "label": "GitHub", "url": "https://github.com/marcbiemer" }]
}
```

Adding a new project automatically generates a static page at `/work/[id]` on the next build.

---

## Deployment

Deployment is fully automated via GitHub Actions. Every push to `main`:

1. Runs `pnpm build` — exports the site to `./out`
2. Pushes `./out` to the `gh-pages` branch
3. GitHub Pages serves from `gh-pages`

To deploy manually, just push to `main`:

```bash
git push origin main
```

The `out/` folder is gitignored and should never be committed directly.

---

## Local Build

To preview the static export locally before pushing:

```bash
pnpm build
pnpm preview
```
