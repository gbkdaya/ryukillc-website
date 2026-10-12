# RyukiLLC — www.ryukillc.com

The official RyukiLLC website. A **static, dependency-free** site (pure HTML/CSS/JS) —
fast, accessible, fully responsive, and hostable anywhere.

**Theme:** "Boardroom Precision" — light editorial design for a strategic AI company:
porcelain `#F7F5F1` background, ink `#15171C` text, serif display type (Fraunces),
hairline rules, and a restrained oxblood accent `#B3382E` derived from the brand logo.
Typography: **Fraunces** (display) + **Inter** (body) + **JetBrains Mono** (labels/data),
loaded from Google Fonts with system fallbacks.

## Run locally

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Contents

| File             | Purpose                                                        |
|------------------|----------------------------------------------------------------|
| `index.html`     | The entire site — hero, Our Beliefs, Vision + Who We Are, Offerings, Industry Coverage matrix, Contact |
| `css/styles.css` | All styling — Boardroom Precision theme, responsive, reduced-motion aware |
| `js/main.js`     | Mobile nav, header scroll state, scroll-reveal animations     |
| `assets/logo.png`| Official Ryūki LLC wordmark (transparent background) — nav + footer |
| `favicon.svg`    | Brand mark (red "R" tile, matches logo)                        |
| `CNAME`          | `www.ryukillc.com` — used automatically by GitHub Pages        |

## Deploy

### GitHub Pages (current production host)
1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: "Deploy from a branch"** → branch `main`, folder `/ (root)`.
3. The included `CNAME` file makes the site serve at **https://www.ryukillc.com**
   (DNS: `www.ryukillc.com` CNAME → `gbkdaya.github.io`).
4. Every push to `main` redeploys automatically within about a minute.

### Netlify (backup mirror)
Deploy this folder to Netlify — **no build settings needed**. `ryukillc.netlify.app`
mirrors the same codebase; `www.ryukillc.com` is attached there as a dormant custom domain.

## Editing content

- All copy lives in `index.html` (sections: hero / beliefs / vision + who-we-are / offerings / industry coverage / contact).
- **Contact email**: `contact@ryukillc.com` (hero-less CTA section) — update everywhere it appears if it ever moves.
- **Industry Coverage matrix**: the table in the `#coverage` section — one `<tr>` per service, `on`/`off` cells per industry; `cap-row` class marks signature capability rows.
- Theme colors: CSS variables at the top of `css/styles.css`.
