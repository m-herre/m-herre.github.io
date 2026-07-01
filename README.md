# m-herre.github.io

Static personal academic website for GitHub Pages.

## Structure

- `index.html` — home (hero, about, research, featured paper, news)
- `publications.html` — papers & preprints
- `cv.html` — experience, education, toolkit
- `contact.html` — email, office, links, availability
- `assets/style.css` — shared design system and component styles
- `assets/main.js` — shared behavior (theme toggle, sticky header, mobile nav, fade-in, BibTeX toggle)
- `papers/` — paper PDF and figure (also used as the Open Graph / Twitter share image)
- Local tooling files may exist on the editing machine but are intentionally gitignored.

## Local workflow

1. Edit the relevant `.html` page or shared `assets/` file.
2. Open each page in a browser to preview locally (the pages link to `assets/` with relative paths).
3. Commit only the files you want published.

## Deployment

The site is intended to deploy via GitHub Pages from the `main` branch.
