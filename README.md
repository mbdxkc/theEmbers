# theEmbers

Website for The Embers, a Kansas City alt-pop cover band.

**by mediaBrilliance.io**

---

## Deploy

GitHub Pages from `main`. Custom domain via `CNAME`: **www.theemberskc.com**.

---

## Build pipeline

Pages load minified bundles only:

```
/style.min.css
/js/utils.min.js  /js/header.min.js  /js/footer.min.js  /js/home-intro.min.js
```

**Edits to `style.css` or any `js/*.js` must be mirrored into the `.min` twin in the same commit.** Nothing references the unminified source, so a source-only edit ships as a no-op and reads as a change that silently failed.

There is no build script in the repo; the minified files are produced externally. Mirror edits by hand and keep the diff minimal.

**No `?v=NN` cache-busting** on this site, unlike mbdx and MuNiKC. A changed bundle may serve stale until a hard refresh.

---

## Structure

```
/
├── index.html          # Splash intro, hero, carousel, reviews, contact
├── privacy.html
├── 404.html
├── style.css / style.min.css
├── js/                 # Each with a .min twin
│   ├── home-intro.js   # Ember splash animation, once per session
│   ├── header.js       # Navigation
│   ├── footer.js
│   └── utils.js
├── photos/             # Carousel images, WebP
├── images/             # Logo and brand assets
├── sitemap.xml, robots.txt, site.webmanifest
└── lighthouse-report.report.*
```

---

## Splash promo

`#ember-intro` is a fixed full-screen overlay shown once per session. `.intro-promo` inside it carries the current booking:

```html
<div class="intro-promo">
  <p class="promo-date">Saturday, Aug. 22 &middot; 8 p.m.</p>
  <p class="promo-venue">Sunset Grill</p>
  <p class="promo-feat">feat. drummer Duane Blakeman of Todd Justice &amp; the American Way!</p>
  <p class="promo-address">14577 Metcalf Ave<br />Overland Park, KS 66223</p>
</div>
```

Four tiers by design: date as a spaced uppercase label, venue as the headline, guest billing in italic beneath it, address quiet last. `.promo-feat` is optional — drop the element when a show has no guest credit. Sizes use `clamp()` so the date holds one line at 320px and the venue does not overpower the logo on desktop.

Between bookings this reverts to a single generic line. Update the markup and the three `.promo-*` rules stay as they are.

**Dates follow AP style**: abbreviate months of six or more letters against a specific date (Aug. 22, Sept. 3), spell out May, June and July; `8 p.m.` lowercase with periods; drop the year when the show is this year. The street address keeps postal form so it can be copied into a map.

---

## Carousel

Infinite marquee of square photos. Two rules govern it, and both are easy to break:

**The track is duplicated and the halves must stay equal.** `@keyframes scroll` translates `-50%`, which is exactly one set. Add a slide to the visible set only and the loop visibly seams. The duplicate set carries `aria-hidden="true"` and `alt=""`.

**Duration is per-loop, not per-slide.** Adding slides without raising `animation: scroll <n>s` speeds the whole carousel up. The established pace is about **2.35s per slide** — 13 slides at 31s.

**The current show poster repeats three times**, evenly spaced around the loop at positions 0, 4 and 9 of 13 — gaps of 4, 5 and 4 *including the wrap back to the start*, so it recurs at a steady interval rather than clustering near the seam — so a visitor catches it wherever the loop happens to be. Only the first carries descriptive `alt`; the repeats are `alt=""` with `aria-hidden="true"`, since hearing the same announcement three times is noise for a screen reader.

**Images must be square.** Slides are 300×300 (250×250 under the mobile breakpoint) with `object-fit: cover`, so a non-square file gets cropped by the browser.

For posters with copy near the edges, **letterbox onto a square black canvas rather than crop** — a centre crop cuts the corners off. Export at 600×600 (2× the slot), WebP quality 80. Check the headline copy still reads at 300px and 250px before shipping.

---

## Performance targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Photos ship as WebP, lazy-loaded below the fold.

---

## Retiring a show

When a booking passes, three things go stale together:

1. **The splash promo** in `index.html` reverts to a generic line
2. **The poster slides** come out of *both* carousel sets, and `animation: scroll` drops by 2.35s per slide removed
3. **The poster file** in `photos/` is deleted — git history keeps it

Spacing the new poster: place `k` copies in `n` slides at `round(i * n / k)`. Measure the gaps **modulo n**, because the last copy's neighbour is the first copy of the next loop, not the end of the list.

The two brand images (`embers-promo-2026`, `embers_logo`) sit at 1 and 7 — gaps of 6 and 7 — so the loop does not open with two logos back to back.

Check for orphans afterwards: any `photos/*.webp` not referenced by `index.html` is dead weight in the deploy.

`privacy.html` carries a "Last updated" date. That is a revision record, not a freshness indicator — leave it alone unless the policy itself changes.

---

Copyright © 2026 mediaBrilliance. All rights reserved.
