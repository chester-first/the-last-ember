# The Last Ember

An original **D&D 5e (2014)** adventure path for **levels 1–20** — heroic dark fantasy,
four planes, a recurring boss who grows alongside the party, soul-bonded items that level
with their wielders, three slow-burning non-combat conflicts, and player death that means
something.

## The premise
Every soul carries a mote of a single finite fire — the **Ember** — that returns to the
**Source** at death to be reborn. A fallen gold-dragon guardian, **Halthurax**, has decided
death is the enemy and begun *hoarding* souls instead of letting them return. The world is
quietly running out of life to be born. The party spends twenty levels and four planes
proving him wrong — or, by accident, proving him right.

## 🎲 The DM web app
A self-contained, offline **DM screen** lives in [`dm-screen/`](dm-screen/) — interactive
campaign clocks, an initiative tracker you can load encounters straight into, all four villain
forms as stat blocks, and a custom "Emberlight" icon set. No build, no dependencies.

```bash
python -m http.server 8771      # from this folder, then open:
#   http://localhost:8771/dm-screen/
```
…or just double-click `dm-screen/index.html`. See [dm-screen/README.md](dm-screen/README.md).

## Contents
| File | What it is |
|---|---|
| [The-Last-Ember.md](The-Last-Ember.md) | Master adventure path: cosmology, four-tier/four-plane structure, the three conflicts, the death subsystem, endings |
| [Appendix-A-Halthurax.md](Appendix-A-Halthurax.md) | The recurring villain's four-form stat progression (deltas off real 5e monsters) |
| [Appendix-B-Legacy-Items.md](Appendix-B-Legacy-Items.md) | The bonded "ember-forged" item subsystem + six ready-made item themes |
| [Magic-Items-and-Treasure.md](Magic-Items-and-Treasure.md) | Found-treasure tables for all four tiers + the Return/Hoard tag system |
| [Session-Zero-Kit.md](Session-Zero-Kit.md) | GM runsheet + a player-facing handout for the bonding |
| [Reference-Card-Items-and-Ember.md](Reference-Card-Items-and-Ember.md) | Printable player cards: fillable Legacy Item card + the shared Ember Clock |
| [Tier-1-The-Marrowmoor.md](Tier-1-The-Marrowmoor.md) | **Tier I** (1–4) — keyed dungeon, statted encounters, NPC roster, read-aloud |
| [Tier-2-The-Verdant-Pyre.md](Tier-2-The-Verdant-Pyre.md) | **Tier II** (5–10) — the Feywild faction tier, the Bargain, the Pyre's Heart |
| [Tier-3-The-Hoard-Kingdom.md](Tier-3-The-Hoard-Kingdom.md) | **Tier III** (11–16) — Ossuara, Sera's reckoning, the dracolich |
| [Tier-4-The-Emberthrone.md](Tier-4-The-Emberthrone.md) | **Tier IV** (17–20) — the Choir, the thesis scene, the Becoming God, the endings |
| [one-sheets/](one-sheets/) | Printable GM run-sheets — one per tier + a boss sheet for Halthurax (all four forms at a glance) |
| [one-sheets/styled/](one-sheets/styled/index.html) | The same run-sheets in **classic D&D book styling** (Homebrewery/PHB look) — open `index.html` to read or print; editable `.hb.md` Homebrewery sources included |
| [dm-screen/](dm-screen/) | The interactive DM web app (+ `DESIGN-SYSTEM.md`) |

## Status — fully runnable, levels 1–20
- ✅ Campaign spine, villain progression, legacy-item system, three conflicts, endings
- ✅ Session Zero + player reference cards
- ✅ **All four tiers** built out (Marrowmoor · Verdant Pyre · Hoard-Kingdom · Emberthrone)
- ✅ Magic-item & encounter tables for every tier
- ✅ Printable GM one-sheets (4 tiers + boss run-sheet) — plain + classic-D&D styled
- ✅ Interactive DM web app with custom icons

## System
D&D 5e 2014 ruleset. Monster references use the *Monster Manual* (MM); the villain blocks are
written as modifications of existing stat blocks so they run at the table without homebrew math.
