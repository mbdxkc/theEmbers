# theEmbers devLog

Chronological record of decisions for theemberskc.com. Newest entries at the bottom. Every entry ends with Mistakes → Rules; the rules are promoted to the vault root `CLAUDE.md` or `mBcode/CLAUDE.md`.

---

## 2026-08-16 — Splash announces the Aug. 22 Sunset Grill show

`dfe1342` (3 files)

### Change
Replaced the generic "Coming soon to a venue near you" splash line with the booked date, venue and address.

### Scope
The promo was a single `<p>` holding one line, which cannot carry three pieces of information. It is now a small block with three tiers: date as a spaced uppercase label, venue as the headline, address quiet beneath. Sizes use `clamp()` so the date holds one line at 320px and the venue does not overpower the logo on desktop.

Wording follows the house AP rules: "Saturday, Aug. 22" abbreviates a six-letter month against a specific date, "8 p.m." is lowercase with periods, and the year is dropped because the show is this year. The street address keeps its postal form so it can be copied into a map — usability beating the "Kan." abbreviation.

### The site was not on disk
The vault's client index note points at `mBcode/theEmbers/`, which did not exist; the archived `_archive/theEmbers.zip` is 2.7 KB of empty client folders, not the site. The source lives only in `mbdxkc/theEmbers` on GitHub. Cloned it to the path the note already claimed.

### Verification
Rendered in headless Chrome before shipping rather than trusting the CSS. Two alarms surfaced and both were harness faults, not site faults:

- the block looked 53px off-centre at "390px" — Chrome enforces a ~500px minimum viewport, so the screenshot captured 390px of a wider page. `getBoundingClientRect` reported `promoCentre 250` against `viewportCentre 250`
- the date line looked missing — the preview boxes were 300px tall and clipped it

Re-tested at real 320, 390 and 768 widths with a constrained container: one line, no overflow, centred.

### Mistakes → Rules
- Verify a rendering harness before trusting what it shows. Two "bugs" here were both artifacts of the test setup, and either could have led to CSS changes that broke a correct layout
- Headless Chrome enforces a minimum window width of roughly 500px. `--window-size=390` yields a 390px *image* of a wider page, so centred content lands off-centre in the screenshot. Ask the page for `window.innerWidth` before believing a narrow render
- Query `getBoundingClientRect` rather than measuring pixels when the question is "is this centred". Pixel measurement answered a different question and answered it wrongly

---

## 2026-08-16 — Carousel: Aug. 22 poster and band promo added to the front

`1cc6fe6` (5 files)

### Change
Two client-supplied JPEGs optimised for web and added as the first two carousel slides.

| File | From | To |
|---|---|---|
| `embers-aug-22-sunset-grill.webp` | 324 KB JPEG, 1179x832 | 44 KB, 600x600 |
| `embers-promo-2026.webp` | 120 KB JPEG, 1179x1029 | 20 KB, 600x600 |

64 KB added, in line with the existing slides.

### Letterboxed, not cropped
Slides are 300x300 with `object-fit: cover`, so a non-square file gets cropped by the browser. Both sources are posters with copy near the edges: a centre crop of the show poster would have cut "The Embers" off one side and the setlist off the other. Fitting each onto a square black canvas keeps every word, and the promo's own background is black so its bars are invisible.

Exported at 600x600 — 2x the slot — at WebP quality 80. Checked that the headline copy still reads at 300px desktop and 250px mobile before shipping.

### Two carousel constraints
**The halves must stay equal.** `@keyframes scroll` translates `-50%`, exactly one set, so the slides were added to the duplicated set as well. 19 and 19. Adding to the visible set alone would have seamed the loop.

**Duration is per-loop, not per-slide.** Two more slides at a fixed 40s would have sped the carousel up about 12%. 19 slides at the original 2.35s each is 45s, which preserves the existing pace.

### Verification
Rendered the real carousel markup against the real stylesheet and confirmed slide order, framing and legibility. Every `/photos/*.webp` referenced in `index.html` was checked to exist on disk.

### Mistakes → Rules
- A marquee that animates to `-50%` is asserting that its two halves are identical. Adding content to one half breaks the loop silently — it still animates, it just jumps. Treat the duplicate set as part of the same edit
- Animation duration on a scrolling deck is per-loop, so it must scale with the item count or the speed changes. Work out the per-item pace and keep it
- When a container crops with `object-fit: cover`, the source has to match the container's aspect ratio. For artwork with copy near the edges, letterbox rather than crop — losing words is worse than showing bars
- Judge an image at its display size, not its export size. The show poster's setlist is comfortable at 600px and marginal at 250px, which is the size that actually ships

---

## 2026-08-16 — Show poster repeated through the carousel; README rewritten

`pending` (4 files)

### Change
The Aug. 22 poster now appears three times in the loop — front, middle and second-from-last — so a visitor arriving mid-scroll still meets the booking. Also replaced the repo README, which was mojibake.

### Placement
Final positions 0, 12 and 19 of 21. Second-from-last rather than last, so the loop's seam does not land on the poster.

Getting there needed care: inserting "before index 19" in a 19-item list appends, it does not place second-to-last. The insertions go before original items 12 and 18, which lands them at 12 and 19 once both are in. A first attempt got this wrong and threw before writing, which is the only reason the file was not left half-edited.

**Repeats are decorative.** Only the first carries descriptive `alt`; the other two are `alt=""` with `aria-hidden="true"`. The show is already announced by slide 0, so repeating the same sentence twice more is noise in a screen reader.

**Duration 45s to 49s** — 21 slides at the established 2.35s each, holding the pace.

### README
The repo README was 30 bytes of UTF-16 mojibake reading `cafe_ama`, a leftover from whatever this was forked from — the same broken file found in `base_site`. Rewritten with the deploy target, the source-to-min mirror rule, the splash promo markup and AP date conventions, and the three carousel constraints that are each easy to break silently.

Writing it required a second pass: the editor preserved the file's existing UTF-16 encoding, so the new content was correct but still unreadable on GitHub. Converted explicitly to UTF-8.

### Files touched
`index.html`, `style.css`, `style.min.css`, `README.md`, `devLog.md`.

### Verification
Slide counts balanced at 21 and 21, poster at 0/12/19, last slide unchanged. Every `/photos/*.webp` referenced in the markup exists on disk. `file README.md` reports UTF-8.

### Mistakes → Rules
- Off-by-one on "second to last": inserting before index n-1 of an n-item list appends. Work out the *final* positions first, then the insertion points that produce them, and assert the result rather than the intent
- Insert from the highest index downward when adding to several positions in one list, so earlier indices stay valid
- A script that validates before writing leaves the file untouched when the logic is wrong. Compute, assert, then write — never write incrementally through a loop that might fail halfway
- Repeating an image for visual reasons should not repeat its announcement. Mark decorative repeats `aria-hidden` with empty `alt`
- An editor may preserve a file's existing encoding when overwriting it. After rewriting a file that was UTF-16, check with `file` — the content can be right and still render as mojibake
