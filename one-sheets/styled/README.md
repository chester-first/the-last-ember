# Styled GM One-Sheets — classic D&D book look

Clean, two-column, parchment-styled versions of the five GM one-sheets, modeled on the
**Homebrewery / 5e PHB** look so you can read a whole tier at a glance.

## Just want to read them
Open **[`index.html`](index.html)** in any browser — it's a hub linking all five. Or open a sheet directly:
- `Tier-1.html` · `Tier-2.html` · `Tier-3.html` · `Tier-4.html` · `Boss.html`

They're self-contained (one shared `phb.css`, no fonts or images to download — they work fully
offline). **Print** with Ctrl/Cmd-P; the stylesheet drops to clean black-on-white at Letter size.

## Want to edit the look on Homebrewery
Each sheet also has a `.hb.md` **Homebrewery V3 source** (e.g. `Tier-1.hb.md`). Paste its contents
into <https://homebrewery.naturalcrit.com/> to render with the official book fonts/textures, tweak,
and export to PDF. These use Homebrewery's `{{monster,frame}}`, `{{note}}`, and `{{descriptive}}`
blocks.

## Files
```
styled/
├─ index.html      hub linking all five sheets
├─ phb.css         the shared "Old Tome" theme (edit colors/fonts here)
├─ Tier-1.html     ┐
├─ Tier-2.html     │  offline-readable styled sheets
├─ Tier-3.html     │
├─ Tier-4.html     │
├─ Boss.html       ┘
├─ Tier-1.hb.md    ┐
├─ Tier-2.hb.md    │  editable Homebrewery V3 sources
├─ Tier-3.hb.md    │
├─ Tier-4.hb.md    │
└─ Boss.hb.md      ┘
```

The plain-Markdown originals (good for raw copy-paste) remain in the parent `one-sheets/` folder.
