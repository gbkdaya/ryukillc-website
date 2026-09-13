# RyukiLLC — www.ryukillc.com

The official RyukiLLC website. A **static, dependency-free** site (pure HTML/CSS/JS) —
fast, accessible, fully responsive, and trivially hostable anywhere.

## Run locally

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Contents

| File          | Purpose                                                        |
|---------------|----------------------------------------------------------------|
| `index.html`  | The entire site (hero, vision, 4 key solutions, contact CTA)   |
| `css/styles.css` | All styling — dark enterprise theme, responsive, reduced-motion aware |
| `js/main.js`  | Mobile nav, scroll-reveal animations, header state             |
| `favicon.svg` | Brand mark (gradient "R" tile)                                 |
| `CNAME`       | `www.ryukillc.com` — used automatically by GitHub Pages        |

## Deploy

### GitHub Pages (recommended — custom domain works out of the box)
1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: "Deploy from a branch"** → branch `main`, folder `/ (root)`.
3. The included `CNAME` file makes the site serve at **https://www.ryukillc.com**.
4. At your domain registrar, point `www.ryukillc.com` to GitHub Pages:
   - A records → `185.199.108.153`, `185.199.108.154`, `185.199.108.155`, `185.199.108.156`, or
   - CNAME → `gbkdaya.github.io`
   - (For the apex `ryukillc.com`, use your registrar's CNAME flattening or the same A records.)

### Netlify / Vercel
Connect the repo (or drag this folder) — **no build settings needed**. Add `www.ryukillc.com`
as a custom domain in the dashboard. BigBro can also deploy it: ask BigBro to
`deploy_project` this folder to Netlify or Vercel.

## Editing content

- All copy lives in `index.html` (sections: hero / vision / solutions / contact).
- **Contact email**: `contact@ryukillc.com` (in `index.html`, contact section) — change there if it ever moves.
- Theme colors: CSS variables at the top of `css/styles.css`.
- Adding a solution: copy any `<article class="sol-card">` block.
