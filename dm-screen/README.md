# The Last Ember — DM Screen

A self-contained, offline DM web app for running *The Last Ember*. No build step, no
dependencies, no internet — plain HTML/CSS/JS with a custom "Emberlight" icon set.

## What it does
- **Overview** — the four tiers at a glance + live campaign state + links to every source doc.
- **Campaign Clocks** — interactive, persistent trackers for the three long-burn conflicts:
  the **Ember Clock** (12→0, with live threshold warnings), the **Wardens/Court Meter**
  (−10 ↔ +10), and **Sera's Tether** (10→0). Click pips or drag the meter; state saves locally.
- **Initiative Tracker** — add combatants by hand or **Load** any encounter straight from a
  tier page (auto-expands "4× Skeleton" into four rows). Roll empty inits, track HP with
  +/− and direct entry, advance turns with a round counter, mark foes/allies/PCs.
- **Tier pages (I–IV)** — story beats, encounter rows (one-click load), and signature treasure.
- **Halthurax** — all four villain forms as full stat blocks, each loadable into the tracker.
- **Legacy Items / Loot / Bestiary** — quick reference, milestone tables, supporting cast.
- **Dice tray** (top-right) and **global search** across beats, monsters, items, and encounters.

Everything you change (clocks, initiative) **persists in your browser** via localStorage.

## How to run

**Easiest — local server (recommended, keeps the doc links working):**
```bash
# from the repo root (the folder above dm-screen/)
python -m http.server 8771
# then open:  http://localhost:8771/dm-screen/
```

**Or just double-click `dm-screen/index.html`.** The app runs from `file://` — the only
caveat is that the "open the full writeup" links to the `.md` files work best when served.

> Tested in Chrome/Edge/Firefox. If localStorage is blocked (private mode), the app still
> runs; it just won't remember clocks/initiative between reloads — the footer will say so.

## Files
```
dm-screen/
├─ index.html          app shell + inline Emberlight icon sprite (23 icons)
├─ css/styles.css      the Emberlight design tokens + components
├─ js/data.js          all campaign data (window.CAMPAIGN) — edit here to tweak content
├─ js/app.js           the SPA (router, clocks, initiative, dice, search)
├─ DESIGN-SYSTEM.md    token + icon + component reference
└─ README.md           this file
```

## Customizing
- **Change content** (encounters, stat blocks, beats, items): edit `js/data.js` — it's a plain
  object, no build needed. Reload the page.
- **Restyle**: all colors/spacing/type are CSS custom properties at the top of `css/styles.css`
  (see `DESIGN-SYSTEM.md`).
- **Add an icon**: add a `<symbol id="ic-…">` to the sprite in `index.html` following the
  24×24 / stroke-1.6 / `currentColor` grammar, then reference it with `<use href="#ic-…"/>`.
