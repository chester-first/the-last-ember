# Emberlight — Design System

**The Last Ember — DM Screen**

---

## 1. Overview

Emberlight is the design system for *The Last Ember* DM Screen — a single-page tool a Dungeon Master drives live at the table. It is an **ash-and-ember dark theme**: near-black backgrounds warmed by ember orange and antique gold, with per-plane accent colors for the campaign's four tiers. The system exists to keep the screen **consistent** (one token set, one icon family), **legible at the table** (large display serif headings, restrained body sizing, high-contrast read-aloud parchment), and **low-distraction** (muted chrome, glow used sparingly to mark only what's active). Everything is driven by CSS custom properties under `:root`, so the look is retuned from one place and never hardcoded per component.

---

## 2. Design Tokens

All tokens are declared on `:root` in `css/styles.css`. Reference them with `var(--token)` — never paste raw hex into a component.

### Color — palette (ash & ember)

| Token | Value | Role |
|-------|-------|------|
| `--ash-900` | `#0e0c0f` | App background (darkest) |
| `--ash-850` | `#141117` | Sidebar gradient top |
| `--ash-800` | `#1a1620` | Panel / input background |
| `--ash-700` | `#231d2b` | Card background |
| `--ash-600` | `#2e2636` | Borders / hover |
| `--ash-500` | `#473c52` | Pip border, hover border accents |
| `--ash-300` | `#8a7f96` | Muted text |
| `--ash-100` | `#d9d2e0` | Body text |
| `--paper` | `#efe9df` | Read-aloud / parchment, meter thumb |
| `--ember-700` | `#7a2d12` | Deep ember (gradients, stat-block border) |
| `--ember-500` | `#d4622a` | Primary ember (accent) |
| `--ember-400` | `#ee7b3a` | Bright ember (brand mark, sub-headings) |
| `--gold-500` | `#e3b341` | Accent gold |
| `--gold-300` | `#f4d98b` | Headings, links, gold highlights |
| `--fey-500` | `#5ec6a0` | Feywild green (Tier II, "return"/ally, saved dot) |
| `--shadow-500` | `#7c6bd6` | Shadowfell violet (Tier III, "hoard") |
| `--blood-500` | `#c2424a` | Danger / HP / critical |
| `--source-500` | `#ffd87a` | The Source glow (Tier IV) |

### Color — semantic aliases

| Token | Maps to | Role |
|-------|---------|------|
| `--bg` | `--ash-900` | App background |
| `--panel` | `--ash-800` | Panel surfaces (dice tray) |
| `--card` | `--ash-700` | Card surfaces |
| `--line` | `--ash-600` | Borders / dividers |
| `--text` | `--ash-100` | Body text |
| `--muted` | `--ash-300` | Secondary / muted text |
| `--accent` | `--ember-500` | Active / primary accent |
| `--accent-soft` | `rgba(212,98,42,.14)` | Active-state tint (nav, active combatant) |

### Typography

| Token | Stack |
|-------|-------|
| `--font-display` | `"Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif` |
| `--font-body` | `"Inter",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif` |

Display serif carries brand, headings, stat-block names, dice results, and read-aloud text. Body sans carries everything else. Base body size is `--fs-md`, line-height `1.55`.

| Scale token | Size |
|-------------|------|
| `--fs-xs` | `.72rem` |
| `--fs-sm` | `.82rem` |
| `--fs-md` | `.94rem` (body default) |
| `--fs-lg` | `1.1rem` |
| `--fs-xl` | `1.45rem` |
| `--fs-2xl` | `2rem` |

### Spacing

| Token | Value |
|-------|-------|
| `--s1` | `4px` |
| `--s2` | `8px` |
| `--s3` | `12px` |
| `--s4` | `16px` |
| `--s5` | `24px` |
| `--s6` | `32px` |
| `--s7` | `48px` |

### Radius

| Token | Value | Typical use |
|-------|-------|-------------|
| `--r-sm` | `6px` | Buttons, inputs, badges of square kind |
| `--r-md` | `10px` | Cards, combatant rows, stat blocks |
| `--r-lg` | `16px` | Tier hero cards, dice tray |
| `--r-pill` | `999px` | Badges, search box, meter track, scrollbar |

### Shadow / elevation

| Token | Value | Use |
|-------|-------|-----|
| `--sh-1` | `0 1px 2px rgba(0,0,0,.4)` | Cards, stat blocks, read-aloud (resting) |
| `--sh-2` | `0 6px 20px rgba(0,0,0,.45)` | Hovered tier cards, dice tray, meter thumb |
| `--sh-glow` | `0 0 18px rgba(212,98,42,.35)` | Active combatant ember glow |

### Motion

| Token | Value | Use |
|-------|-------|-----|
| `--ease` | `cubic-bezier(.2,.7,.3,1)` | Shared easing for all transitions (hover, nav, drawer slide) |

Transition durations live inline on components (`.12s`–`.2s`); the curve is always `var(--ease)`.

---

## 3. The Emberlight Icon Family

A single hand-built line-icon set, defined once as an inline SVG sprite at the top of `index.html`. The sprite is **inlined** (not an external file) so `<use href="#ic-x"/>` resolves under the `file://` protocol with no fetch.

### Shared construction grammar

Every glyph is drawn to the same rules so the set reads as one family:

- **24×24 viewBox** — one grid for every icon.
- **`stroke-width:1.6`** — uniform line weight (utility glyphs `ic-plus / ic-minus / ic-x / ic-menu` step up to `1.8` so thin single strokes stay visible at small sizes).
- **`stroke-linecap:round` + `stroke-linejoin:round`** — soft, consistent terminals and corners.
- **`fill:none`** — outline construction (the lone exception is the dragon's eye dot, a filled `currentColor` circle).
- **`stroke:currentColor`** — icons inherit the surrounding text color, so a single glyph recolors by context (muted in nav, ember when active, gold on a heading) with no per-icon CSS.

Render size is set by the host: `.ic` is `20×20` by default; consumers shrink or grow it (search `16px`, nav `18px`, tier card `40px`, empty state `48px`).

### Icon catalog

| ID | Depicts | Used for |
|----|---------|----------|
| `ic-ember` | Ember flame with cupping arcs | **Brand** mark (sidebar logo) |
| `ic-overview` | Open book | Overview nav item |
| `ic-material` | Barrow mound with marker | **Tier I** — Material Plane (Marrowmoor) |
| `ic-feywild` | Leaf with a spark | **Tier II** — Feywild (Verdant Pyre); also the Court meter clock |
| `ic-shadowfell` | Broken/cracked moon | **Tier III** — Shadowfell (Hoard-Kingdom) |
| `ic-source` | Radiant throne-sun (rayed disc) | **Tier IV** — the Source (Emberthrone) |
| `ic-dragon` | Coiled dragon with eye dot | Villain / dragon (Halthurax) |
| `ic-item` | Faceted gem | Items / legacy items / treasure |
| `ic-skull` | Skull | Bestiary / monsters |
| `ic-clock` | Segmented dial with hand | Campaign **clocks** (Ember Clock, Tether) |
| `ic-init` | Crossed swords | **Initiative** tracker |
| `ic-dice` | d20 | **Dice** roller toggle / tray |
| `ic-search` | Magnifier | Global search box (utility) |
| `ic-plus` | Plus | Increment / add (utility) |
| `ic-minus` | Minus | Decrement (utility) |
| `ic-x` | X | Close / remove (utility) |
| `ic-reset` | Circular arrow | Reset a clock / tracker (utility) |
| `ic-heart` | Heart | HP / hit points |
| `ic-shield` | Shield | AC / armor class |
| `ic-chevron` | Right chevron | Disclosure / forward affordance |
| `ic-next` | Arrow to a bar | "Next turn" in initiative |
| `ic-return` | Return / undo arrow | The "return" theme; Sera's Tether clock |
| `ic-menu` | Hamburger | Mobile sidebar toggle (utility) |

Usage pattern everywhere: `<svg class="ic"><use href="#ic-ember"/></svg>` (or a sizing class like `.brand-mark`, `.tier-ic`).

---

## 4. Components

### Card — `.card`
Base surface for content. `--card` background, `--line` border, `--r-md` radius, `--sh-1` shadow, padded `--s4 --s5`. Headings (`.card h3`) use the display serif in `--gold-300`. Layout helpers `.grid.cols-2/3/4` arrange cards; all collapse to one column under 880px.

**Variant — `.tier-card`:** hero card for a plane. `--r-lg`, lifts on hover (`translateY(-3px)` + `--sh-2`), and carries a corner radial glow via the `--glow` hook (see Theming).

### Badge — `.badge`
Pill tag (`--r-pill`), `--fs-xs`, default ash background. Variants tint background/border/text:

| Variant | Look | Meaning |
|---------|------|---------|
| `.badge` (default) | Ash fill, body text | Neutral tag |
| `.badge.cr` | Blood-red tint, `#f3a8ac` text | Challenge Rating / threat |
| `.badge.return` | Fey-green tint, `--fey-500` text | "Return" allegiance |
| `.badge.hoard` | Shadow-violet tint, `#b3a6ee` text | "Hoard" allegiance |
| `.badge.gold` | Gold tint, `--gold-300` text | Treasure / value |

### Read-aloud box — `.readaloud`
Parchment block for boxed text the DM reads to players. Paper gradient (`#efe9df → #e7dfd0`), dark ink (`#2a2118`), ember left rule, display serif **italic**. A `::before` label "Read aloud" sits on top in uppercase ember (`--ember-700`). The only light surface in the system — reserved exclusively for read-aloud copy.

### Stat block — `.statblock`
Monster/NPC stat card. Warm near-black gradient, **ember-700 border** (distinct from the ash `--line` used elsewhere). Parts: `.sb-name` (ember display serif), `.sb-type` (muted italic), `.sb-rule` (fading ember hairline), `.sb-line` (label/value rows, `b` in gold), `.sb-abilities` (6-column ABILITY grid of `.sb-ab` tiles), `.sb-trait` (ember-keyed trait names), `.sb-section-label` (gold, ember underline).

### Clock pip & meter
Two clock renderings:

- **Pips — `.pip`:** square cells (`--ash-800`, `--ash-500` border). `.full` lights with a gold→ember radial + glow; `.crit.full` switches to a blood-red radial for the danger band. Hover scales to `1.08`. Used by the Ember Clock and Sera's Tether.
- **Meter — `.meter-track` + `.meter-thumb`:** horizontal bar with a shadow→ash→fey gradient (corrupt ⟶ neutral ⟶ redeemed), a draggable paper thumb, and `.meter-labels` at each end. Used by the Court meter.

Threshold banners (`.threshold`, `.warn`, `.crisis`) announce the active clock band in gold (warn) or blood-red (crisis).

### Combatant row — `.combatant`
Initiative entry: init number, name (+`small` subtitle), HP/AC stat chips, side tag.

| State / variant | Look |
|-----------------|------|
| Default | `--card` fill, `--line` border |
| `.active` | Ember border + `--sh-glow` + `--accent-soft` gradient — marks whose turn it is |
| `.dead` | `opacity:.45` + `grayscale(.6)` |
| `.tag-side.foe` | Blood-red tint, `#f3a8ac` text |
| `.tag-side.ally` | Fey-green tint, `--fey-500` text |

### Button — `.btn`
Inline-flex, icon + label, `--r-sm`, body font, `var(--ease)` transition.

| Variant | Look | Use |
|---------|------|-----|
| `.btn` (default) | Ash-800 fill, `--line` border; hover lifts to ash-700 / ash-500 border | Secondary actions |
| `.btn.primary` | Ember vertical gradient (`--ember-500 → --ember-700`), white text; hover `brightness(1.08)` | Primary action |
| `.btn.ghost` | No background, border only | Tertiary / inline |

Compact square icon buttons use `.icon-btn` (and `.icon-btn.sm`) for the topbar, dice tray, and steppers.

### Nav item — `.nav-item`
Full-width sidebar button, `--fs-sm`, muted icon.

| State | Look |
|-------|------|
| Default | Transparent, `--ash-100` text, `--muted` icon |
| Hover | `--ash-700` background |
| `.active` | `--accent-soft` background, `--gold-300` text, `--ember-400` icon |

A `.tier-dot` (per-plane colored dot) can sit at the right edge. Groups are labeled by `.nav-group-label`.

---

## 5. Theming notes

The four campaign tiers each own an accent drawn straight from the palette. The mapping is intentional — plane lore drives the hue:

| Tier | Plane | Accent token | Hex |
|------|-------|--------------|-----|
| I — Marrowmoor | Material Plane | ember | `#d4622a` (`--ember-500`) |
| II — Verdant Pyre | Feywild | fey green | `#5ec6a0` (`--fey-500`) |
| III — Hoard-Kingdom | Shadowfell | shadow violet | `#7c6bd6` (`--shadow-500`) |
| IV — Emberthrone | the Source | source gold | `#ffd87a` (`--source-500`) |

These accents also key the allegiance language across the UI: **fey green = "return" / Keepers / ally**, **shadow violet = "hoard" / Tallymasters**, **gold = treasure / the Source**, **blood-red = threat / CR / death**.

**The `--glow` hook.** Tier cards expose a per-card custom property `--glow`. The card's `::after` paints a corner radial — `radial-gradient(... var(--glow,var(--ember-500)) ...)` — so each tier card sets `style="--glow:#5ec6a0"` (etc.) to tint its own glow while the base CSS stays generic. The campaign data carries the matching `glow` hex per tier (e.g. Marrowmoor `#d4622a`, Verdant Pyre `#5ec6a0`), so adding a tier needs no new CSS — just the `--glow` value. If unset, it falls back to `--ember-500`.

---

## 6. Do's and Don'ts

| Do | Don't |
|----|-------|
| Reference colors, spacing, radius, and shadows through `var(--token)`. | Paste raw hex or pixel values into a component. |
| Let icons inherit color via `stroke:currentColor` and set hue with `color` on the host. | Hardcode `stroke` colors on individual icons. |
| Keep every icon single-color and on the 24×24 grid. | Add multi-color or off-grid icons that break the family. |
| Hold the line weight at `1.6` (utility glyphs `1.8`). | Mix stroke weights within the regular icon set. |
| Reserve the parchment surface for `.readaloud` boxed text only. | Put parchment behind general UI or use it as a panel. |
| Use `--sh-glow` / `.active` to mark exactly one live thing (the current combatant). | Scatter glow so nothing reads as "active." |
| Pull accents from the tier palette and the `--glow` hook for plane theming. | Invent new per-tier colors outside the token set. |
| Use display serif for brand, headings, stat names, and read-aloud; body sans for everything else. | Set body copy in the display serif or headings in the body sans. |
| Let `.grid.cols-*` and the 880px breakpoint handle layout collapse. | Build fixed multi-column layouts that don't reflow on mobile. |
