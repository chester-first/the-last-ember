# START HERE — The Last Ember

A complete, original D&D 5e (2014) adventure path for **levels 1–20**, plus a custom DM web app
and print-ready sheets. This file is the map and the "how to begin."

---

## 1. The fastest way to begin (3 steps)

1. **Get the files.** Clone or download the repo:
   ```bash
   git clone https://github.com/chester-first/the-last-ember.git
   cd the-last-ember
   ```
2. **Open the DM app.** Double-click **`dm-screen/index.html`** (or, to keep the doc links live,
   run a tiny server from the repo root and visit `http://localhost:8771/dm-screen/`):
   ```bash
   python -m http.server 8771
   ```
   The app gives you live campaign clocks, an initiative tracker you load encounters into, all
   four villain forms as stat blocks, the legacy-item builder, and links to everything else.
3. **Read in this order** before session one:
   `START-HERE.md` → `The-Last-Ember.md` (the whole campaign) → `Session-Zero-Kit.md` (run this
   with your players) → `one-sheets/styled/index.html` (print Tier I) → play.

---

## 2. Running it at the table (the loop)

- **Before the campaign:** run **`Session-Zero-Kit.md`** — pitch, safety tools, character hooks,
  and the legacy-item bonding. Hand players the **`Reference-Card-Items-and-Ember.md`** cards.
- **Each tier:** open that tier's **styled one-sheet** (`one-sheets/styled/`) for the run-at-a-glance,
  keep the **full tier writeup** (`Tier-N-*.md`) nearby for detail, and keep the **DM app** open to
  track the three clocks, initiative, and Halthurax's stat block.
- **The boss:** `one-sheets/styled/Boss.html` is the recurring-villain cheat sheet for every fight.

---

## 3. File map

```
the-last-ember/
│
├─ START-HERE.md                 ← you are here
├─ README.md                     overview + status + how-to
│
├─ THE CAMPAIGN (read these)
│  ├─ The-Last-Ember.md          ★ master path: cosmology, structure, the 3 conflicts,
│  │                                the death system, the endings
│  ├─ Tier-1-The-Marrowmoor.md   Tier I  (lvl 1–4, Material Plane) — keyed dungeon, fully runnable
│  ├─ Tier-2-The-Verdant-Pyre.md Tier II (lvl 5–10, Feywild) — the faction tier
│  ├─ Tier-3-The-Hoard-Kingdom.md Tier III (lvl 11–16, Shadowfell) — Ossuara, the dracolich
│  └─ Tier-4-The-Emberthrone.md  Tier IV (lvl 17–20, the Source) — the finale + 3 endings
│
├─ REFERENCE
│  ├─ Appendix-A-Halthurax.md    the villain's 4 forms (stat blocks, named legendary/lair actions)
│  ├─ Appendix-B-Legacy-Items.md the bonded growing-item system + 6 themes + forge-your-own template
│  └─ Magic-Items-and-Treasure.md per-tier loot tables (Return ⟲ / Hoard ◈ tags)
│
├─ AT THE TABLE
│  ├─ Session-Zero-Kit.md        ★ run this first — GM runsheet + player handout
│  ├─ Reference-Card-Items-and-Ember.md  printable player cards (item + Ember Clock)
│  └─ one-sheets/
│     ├─ Tier-1..4-One-Sheet.md  raw GM run-sheets (plain markdown)
│     ├─ Boss-One-Sheet.md        Halthurax run-at-a-glance (all forms)
│     └─ styled/                  ★ the same sheets in classic D&D book styling
│        ├─ index.html            open this — hub to all 5 styled, print-ready sheets
│        ├─ Tier-1..4.html, Boss.html   offline-readable styled sheets
│        ├─ *.hb.md               Homebrewery V3 sources (paste into homebrewery.naturalcrit.com)
│        └─ phb.css               the shared "Old Tome" theme
│
└─ THE DM APP
   └─ dm-screen/
      ├─ index.html               ★ open this — the interactive DM screen
      ├─ css/styles.css           the "Emberlight" app theme
      ├─ js/data.js               all campaign data (edit here to tweak content)
      ├─ js/app.js                the app logic (clocks, initiative, dice, search, item forge)
      ├─ DESIGN-SYSTEM.md         token + icon + component reference
      └─ README.md                how to run / customize the app
```

★ = the files to touch first.

---

## 4. What this campaign is (one paragraph)

Every soul carries a mote of one finite fire — the **Ember** — that returns to the **Source** at
death to be reborn. A fallen gold-dragon guardian, **Halthurax**, has decided death is the enemy
and begun *hoarding* souls instead of letting them return; the world is quietly running out of life
to be born. Over twenty levels and four planes the party fights a villain who **grows each time they
"kill" him**, wields **soul-bonded items that level up with them**, and works three slow-burning
**non-combat conflicts** (redeem-or-corrupt a faction, a draining resource, a fraying loyalty).
Player death is expected — and coming back is never free.
