/* =================================================================
   THE LAST EMBER — campaign data (read by app.js as window.CAMPAIGN)
   Plain global object so the app runs from file:// with no fetch.
   ================================================================= */
window.CAMPAIGN = {
  meta:{
    title:"The Last Ember",
    blurb:"A fallen gold-dragon guardian is hoarding the world's souls to end death forever — and he might be right. An original D&D 5e (2014) adventure path, levels 1–20.",
    docs:[
      {label:"Master path", file:"The-Last-Ember.md"},
      {label:"Villain (Appendix A)", file:"Appendix-A-Halthurax.md"},
      {label:"Legacy items (Appendix B)", file:"Appendix-B-Legacy-Items.md"},
      {label:"Session Zero", file:"Session-Zero-Kit.md"},
      {label:"Magic items & treasure", file:"Magic-Items-and-Treasure.md"},
      {label:"Tier I — Marrowmoor", file:"Tier-1-The-Marrowmoor.md"},
      {label:"Tier II — Verdant Pyre", file:"Tier-2-The-Verdant-Pyre.md"},
      {label:"Tier III — Hoard-Kingdom", file:"Tier-3-The-Hoard-Kingdom.md"},
      {label:"Tier IV — Emberthrone", file:"Tier-4-The-Emberthrone.md"}
    ],
    bossSheet:"one-sheets/Boss-One-Sheet.md",
    oneSheets:[
      {label:"Tier I — Marrowmoor", file:"one-sheets/Tier-1-One-Sheet.md"},
      {label:"Tier II — Verdant Pyre", file:"one-sheets/Tier-2-One-Sheet.md"},
      {label:"Tier III — Hoard-Kingdom", file:"one-sheets/Tier-3-One-Sheet.md"},
      {label:"Tier IV — Emberthrone", file:"one-sheets/Tier-4-One-Sheet.md"},
      {label:"Boss — Halthurax (all forms)", file:"one-sheets/Boss-One-Sheet.md"}
    ]
  },

  /* ---- The three campaign clocks ---- */
  clocks:[
    {
      id:"ember", name:"The Ember Clock", icon:"ic-clock", type:"pips",
      max:12, start:12, color:"gold", crit:4,
      note:"The world's remaining soul-fire. Only ever drains. Click a pip to set the level.",
      thresholds:[
        {at:9, level:"ok", text:"12–9 · The world is merely 'off.' Resurrection works normally."},
        {at:5, level:"warn", text:"8–5 · The Dimming shows. Raise/Revivify costs +1 Ember segment."},
        {at:2, level:"crisis", text:"4–2 · Crisis. Resurrection costs another's mote, or returns the PC TOUCHED."},
        {at:0, level:"crisis", text:"1–0 · No natural resurrection. Only the Source can restore the fallen."}
      ]
    },
    {
      id:"court", name:"The Wardens / Court Meter", icon:"ic-feywild", type:"meter",
      min:-10, max:10, start:0,
      leftLabel:"Tallymasters (hoard)", rightLabel:"Keepers (return)",
      note:"Tips on deeds, not words. Locks the Court's allegiance for the Tier IV finale. + = redeemed, − = corrupted."
    },
    {
      id:"tether", name:"Sera's Tether", icon:"ic-return", type:"pips",
      max:10, start:7, color:"violet", crit:3,
      note:"How much of Sera is hers vs. Halthurax's. Drops at each tier break; the party can raise it. Sets her fate.",
      thresholds:[
        {at:7, level:"ok", text:"7+ · On track to be FREED — returns her mote at peace."},
        {at:3, level:"warn", text:"3–6 · Set toward MARTYR — spends her last self for the party."},
        {at:0, level:"crisis", text:"0–2 · Set to DEFECT — stands among Halthurax's lieutenants."}
      ]
    }
  ],

  /* ---- Tiers ---- */
  tiers:[
    {
      id:"t1", n:"I", name:"The Marrowmoor", plane:"Material Plane", levels:"1–4",
      icon:"ic-material", glow:"#d4622a", file:"Tier-1-The-Marrowmoor.md", oneSheet:"one-sheets/Tier-1-One-Sheet.md",
      summary:"A fog-bound borderland where the dead walk home. The party stops the Herald's anchoring rite, frees the revenant Sera, and glimpses Halthurax alive.",
      beats:[
        {t:"Lantern's Rest", d:"Town hub. Warden Greel teaches the Ember; first Court-meter swings."},
        {t:"The Doorstep Dead", d:"Tutorial of mercy — return vs. scatter, with Edon the walking husband."},
        {t:"The Mourn-house", d:"The returned child. The scene players remember in a year."},
        {t:"The Vault — Barrow-Altar (R3)", d:"REQUIRED: the legacy items wake here."},
        {t:"Sera's Cell (R7)", d:"REQUIRED: free the revenant ally. Tether starts at 7."},
        {t:"The Herald (R9a)", d:"Boss fight at the anchor."},
        {t:"The Goldwyrm (R9b)", d:"REQUIRED scene, NOT a fight — meet Halthurax alive (CR 17 Ancient Gold)."}
      ],
      encounters:["enc-moor-skel","enc-cairn","enc-wight-vigil","enc-hoardcells","enc-herald"],
      treasure:["Cinder Vial","Warden's Gray Cloak","Lanternlight Censer","Herald's Scale-Shard (plot)"],
      milestone:"Legacy items: KINDLED (lvl 1). First milestone BURNING fires entering Tier II."
    },
    {
      id:"t2", n:"II", name:"The Verdant Pyre", plane:"Feywild", levels:"5–10",
      icon:"ic-feywild", glow:"#5ec6a0", file:"Tier-2-The-Verdant-Pyre.md", oneSheet:"one-sheets/Tier-2-One-Sheet.md",
      summary:"The Feywild's soul-light is graying. Halthurax (Dragon-Wraith) blights the wellspring. The faction tier: the Court of First Light splits and the party tips it.",
      beats:[
        {t:"Glimmermarch", d:"Fey hub in the Hearthtree. Meet Aurene (Keepers) & Vol (Tallymasters)."},
        {t:"The Graying Glades", d:"Gray Stag set-piece; scaled-up return-vs-scatter beats."},
        {t:"The Court Vote", d:"Social set-piece — actions in the glades weight the vote."},
        {t:"The Tallymasters' Bargain", d:"REQUIRED offer: real power for real corruption. No gotcha."},
        {t:"Sera's Patron's Grave", d:"Tether beat; the Pull costs her a memory (auto −1)."},
        {t:"The Dragon-Wraith Hunt", d:"Drive-off chase (lvl 9). Pip may die heroically."},
        {t:"The Pyre's Heart", d:"Boss (lvl 10) — tend the founts while fighting Form II."}
      ],
      encounters:["enc-graystag","enc-hollowbloom","enc-wraith-hunt","enc-pyresheart"],
      treasure:["Cinderheart","Glimmer-seed","Mantle of First Light (Keeper)","Hoardlight Locket ◈ (Tallymaster)"],
      milestone:"Legacy items: BURNING (lvl 5). Court allegiance LOCKS this tier. Ember Clock 'Dimming' threshold (8) turns on."
    },
    {
      id:"t3", n:"III", name:"The Hoard-Kingdom", plane:"Shadowfell", levels:"11–16",
      icon:"ic-shadowfell", glow:"#7c6bd6", file:"Tier-3-The-Hoard-Kingdom.md", oneSheet:"one-sheets/Tier-3-One-Sheet.md",
      summary:"Ossuara — a pleasant city of happy hoarded dead who don't want saving. The horror tier. Sera's reckoning with her old liege. Player death is expected.",
      beats:[
        {t:"Ossuara", d:"City hub of the comfortable dead. 'No one dies here. No one leaves.'"},
        {t:"The Grateful Dead", d:"Souls the party 'returned' are here, and angry. The campaign audits its choice."},
        {t:"The Death-Court", d:"Politics; recruit the undead red dragon Kalaurith."},
        {t:"Sera's Reckoning", d:"REQUIRED: she meets Chancellor Lord Vant. Her fate-vector locks."},
        {t:"Siege of the Pale Hoard", d:"Army set-piece; destroy 3 Phylactery-Pyres to weaken the boss."},
        {t:"The Throne-Vault", d:"Dracolich boss (lvl 16). First time he can truly be hurt."}
      ],
      encounters:["enc-siege-wall","enc-ossix","enc-dracolich"],
      treasure:["Ossix's Pale Blade","Kalaurith's Scale","Soul-Pyre Cores ◈","Chancellor's Seal"],
      milestone:"Legacy items: BLAZING (lvl 11). Ember Clock crisis (4–2) turns on — death gets full teeth."
    },
    {
      id:"t4", n:"IV", name:"The Emberthrone", plane:"The Source", levels:"17–20",
      icon:"ic-source", glow:"#ffd87a", file:"Tier-4-The-Emberthrone.md", oneSheet:"one-sheets/Tier-4-One-Sheet.md",
      summary:"The climb to the Source, where Halthurax is building himself into the door every soul must pass. The Choir, the thesis scene, and the Becoming God. Player death is expected; so is grace.",
      beats:[
        {t:"The Ascent / Hollow Heaven", d:"Dungeon-plane of guilt-saves; the Court arrives as army or enemy."},
        {t:"The Choir of the Hoarded", d:"Unmake the last hoard — release souls dead 1,000 years."},
        {t:"The Two Endings of Death", d:"REQUIRED thesis scene: Halthurax's genuine bargain. The party CAN take it."},
        {t:"The Becoming God", d:"Finale (lvl 20). Won by emptying his Hoard Pool, not just HP."},
        {t:"The Endings", d:"Old Order Restored · Pyrrhic Throne · Mercy of Never. Sera's fate resolves."}
      ],
      encounters:["enc-choir","enc-becominggod"],
      treasure:["Spark of the Source (Legendary)","Aurene's Last Light","Crown of the Hollow Heaven ◈","Emberthrone Shard"],
      milestone:"Legacy items: RADIANT (lvl 17) + TRUE EMBER capstones for the finale. The Source can restore the fallen WHOLE."
    }
  ],

  /* ---- Encounters (wired to the initiative tracker) ---- */
  encounters:{
    "enc-moor-skel":{name:"Sunken Graveyard", tier:"I", lvl:"1–2", diff:"easy",
      foes:[{n:"Skeleton",c:4,ac:13,hp:13,cr:"1/4"}]},
    "enc-cairn":{name:"R2 — Cairn Hall", tier:"I", lvl:2, diff:"hard",
      foes:[{n:"Wight",c:1,ac:14,hp:45,cr:3},{n:"Skeleton",c:6,ac:13,hp:13,cr:"1/4"}]},
    "enc-wight-vigil":{name:"R4 — The Wight's Vigil", tier:"I", lvl:"2–3", diff:"hard",
      foes:[{n:"Wight (captain)",c:1,ac:14,hp:45,cr:3},{n:"Specter",c:2,ac:12,hp:22,cr:1},{n:"Skeleton",c:4,ac:13,hp:13,cr:"1/4"}]},
    "enc-hoardcells":{name:"R8 — The Hoard-Cells", tier:"I", lvl:3, diff:"hard",
      foes:[{n:"Wight",c:2,ac:14,hp:45,cr:3},{n:"Skeleton",c:8,ac:13,hp:13,cr:"1/4"}]},
    "enc-herald":{name:"R9 — The Herald (boss)", tier:"I", lvl:"3–4", diff:"deadly",
      foes:[{n:"The Herald",c:1,ac:14,hp:78,cr:3,boss:true},{n:"Specter",c:2,ac:12,hp:22,cr:1},{n:"Skeleton",c:4,ac:13,hp:13,cr:"1/4"}]},

    "enc-graystag":{name:"Glade of the Gray Stag", tier:"II", lvl:"5–6", diff:"hard",
      foes:[{n:"Gray Stag (blighted unicorn)",c:1,ac:12,hp:90,cr:5,boss:true},{n:"Blighted Dryad",c:2,ac:11,hp:22,cr:1}]},
    "enc-hollowbloom":{name:"Glade of Hollow Bloom", tier:"II", lvl:6, diff:"hard",
      foes:[{n:"Wraith (gardener)",c:1,ac:13,hp:67,cr:5,boss:true},{n:"Specter",c:4,ac:12,hp:22,cr:1},{n:"Will-o'-Wisp",c:2,ac:19,hp:22,cr:2}]},
    "enc-wraith-hunt":{name:"The Dragon-Wraith Hunt (drive-off)", tier:"II", lvl:9, diff:"deadly",
      foes:[{n:"Halthurax — Dragon-Wraith (Form II)",c:1,ac:18,hp:212,cr:13,boss:true,form:1}]},
    "enc-pyresheart":{name:"The Pyre's Heart (boss)", tier:"II", lvl:10, diff:"deadly",
      foes:[{n:"Halthurax — Dragon-Wraith (Form II)",c:1,ac:18,hp:212,cr:13,boss:true,form:1},{n:"Pyre-Fount (object)",c:3,ac:15,hp:40,cr:"—"}]},

    "enc-siege-wall":{name:"Siege — Wall & Gate", tier:"III", lvl:15, diff:"hard",
      foes:[{n:"Bone Golem",c:1,ac:17,hp:178,cr:10},{n:"Wight",c:2,ac:14,hp:45,cr:3},{n:"Skeleton Archer",c:6,ac:13,hp:13,cr:"1/4"}]},
    "enc-ossix":{name:"General Ossix (death knight)", tier:"III", lvl:15, diff:"deadly",
      foes:[{n:"General Ossix",c:1,ac:20,hp:180,cr:17,boss:true},{n:"Pale Legion Skeleton",c:4,ac:13,hp:13,cr:"1/4"}]},
    "enc-dracolich":{name:"The Throne-Vault — Dracolich (boss)", tier:"III", lvl:16, diff:"deadly+",
      foes:[{n:"Halthurax — Dracolich (Form III)",c:1,ac:20,hp:367,cr:21,boss:true,form:2},{n:"Soul-Pyre",c:3,ac:17,hp:60,cr:"—"}]},

    "enc-choir":{name:"The Choir of the Hoarded", tier:"IV", lvl:"18–19", diff:"deadly",
      foes:[{n:"Choir-anchor (object)",c:3,ac:19,hp:50,cr:"—"},{n:"Sung Wraith",c:4,ac:13,hp:67,cr:5}]},
    "enc-becominggod":{name:"The Becoming God (finale)", tier:"IV", lvl:20, diff:"epic",
      foes:[{n:"Halthurax — Becoming God (Form IV)",c:1,ac:22,hp:560,cr:26,boss:true,form:3,note:"Hoard Pool 180 — won by emptying the Pool, not HP."}]}
  },

  /* ---- Villain forms (full stat blocks) ---- */
  villain:[
    {
      id:"form0", form:"Sighting", name:"Halthurax — The Living Wyrm", tier:"I",
      type:"Gargantuan dragon (metallic), CR 17 · NOT A FIGHT",
      ac:"22 (natural armor)", hp:"546 (Ancient Gold Dragon, MM)", speed:"40 ft., fly 80 ft., swim 40 ft.",
      abil:{STR:30,DEX:14,CON:29,INT:18,WIS:17,CHA:28},
      traits:[
        {n:"Run as a scene",t:"He appears at the bottom of the Marrowmoor Vault, vast and grieving. He warns the party off for their own good and leaves. If attacked, he restrains and lectures — never slaughters. Awe, not a TPK."},
        {n:"The Herald (his agent)",t:"CR 3 boss — see the Bestiary. Base Cult Fanatic; HP 78; Touch of the Hoard (3d6 necrotic + max-HP reduction); Gray Sermon; Reinforce the Anchor (regains 10 HP unless the R8 Hoard-Cells were emptied)."}
      ]
    },
    {
      id:"form1", form:"Form II", name:"Halthurax — The Dragon-Wraith", tier:"II", cr:13,
      type:"Huge undead (was metallic dragon), CR 13",
      ac:"18 (natural armor)", hp:"212 (17d12+102)", speed:"40 ft., fly 80 ft. (hover)",
      abil:{STR:23,DEX:14,CON:22,INT:16,WIS:15,CHA:20},
      meta:"Damage resist: necrotic, acid, cold; nonmagical B/P/S. Immune: poison, exhaustion, frightened, charmed. Incorporeal Movement.",
      traits:[
        {n:"Legendary Resistance (2/day)",t:"On a failed save, succeed instead."},
        {n:"Soul Siphon (1/turn)",t:"When it drops a creature to 0 HP, gain temp HP = ½ the target's CR/level ×5; that mote is hoarded unless freed."},
        {n:"Graying Breath (Recharge 5–6)",t:"60-ft cone, DC 17 Con, 10d8 necrotic (half on save); failed save also reduces hit point maximum by that amount until a long rest. Withers fey light. Relit Pyre-Founts grant advantage vs. this."},
        {n:"Multiattack",t:"Bite (+10, 2d10+6 piercing +3d6 necrotic) and 2 Claws (+10, 2d6+6 slashing)."}
      ],
      legendary:["Detect","Tail Attack (+10, 2d8+6)","Wing of Ash (DC 16 Str or prone in gray fog; costs 2)"],
      tactics:"At the Pyre's Heart, fight while the party tends 3 Pyre-Founts (AC 15, 40 HP). On 0 HP the wraith-form is destroyed; molts into the Dracolich."
    },
    {
      id:"form2", form:"Form III", name:"Halthurax — The Dracolich", tier:"III", cr:21,
      type:"Gargantuan undead (dracolich), CR 21",
      ac:"20 (natural armor)", hp:"367 (21d20+147)", speed:"40 ft., fly 80 ft.",
      abil:{STR:27,DEX:14,CON:25,INT:18,WIS:17,CHA:24},
      meta:"Immune: poison, necrotic; charmed, frightened, paralyzed, poisoned, exhaustion. Resist: cold, lightning; nonmagical B/P/S.",
      traits:[
        {n:"Legendary Resistance (3/day)",t:"On a failed save, succeed instead."},
        {n:"Distributed Phylactery",t:"At the start of each turn regain 30 HP unless the throne-vault's 3 Soul-Pyres (AC 17, 60 HP) are destroyed. The Siege pre-kills some — reward prior play."},
        {n:"Hoardfire (Recharge 5–6)",t:"90-ft cone, DC 22 Dex, 16d6 necrotic+fire (half on save). A creature dropped to 0 by it is claimed (death-save failures count double until freed)."},
        {n:"Multiattack",t:"Bite (+14, 2d10+8 +4d6 necrotic) and 2 Claws (+14, 2d6+8); or Frightful Presence."}
      ],
      legendary:["Detect","Tail (+14, 2d8+8)","Call the Grateful Dead (2): a hoarded citizen bodyblocks an attack, negating it"],
      lair:["Raise 2d6 skeletons from the floor","Bone portcullis seals an exit","20-ft cube of grasping hands: DC 18 Str or restrained"],
      tactics:"First form that can be truly hurt — and the first fight where a PC death is EXPECTED. Run it lethal; the Ember Clock should be low. On 0 HP with pyres down, the kingdom shatters; molts toward the Source."
    },
    {
      id:"form3", form:"Form IV", name:"Halthurax — The Becoming God", tier:"IV", cr:26,
      type:"Gargantuan undead deity-thing, effective CR 26 · 3 PHASES",
      ac:"22 (natural armor)", hp:"560 across phases", speed:"40 ft., fly 120 ft.",
      abil:{STR:28,DEX:16,CON:27,INT:20,WIS:20,CHA:28},
      meta:"Hoard Pool 180 — he CANNOT be reduced below 1 HP while the Pool is above 0. Drain it via Choir-anchors (≈20 each), releasing souls (DC 20, ≈10), or legacy-item capstones.",
      traits:[
        {n:"Phase 1 (Pool 180–121)",t:"As Dracolich +50 HP, breath recharges 4–6, the Choir grants advantage on all his saves."},
        {n:"Phase 2 (120–61)",t:"Sheds the dragon shape: gains 'false dawn' breath (DC 23, 18d6 radiant, blinds on fail) and Unmake (1 creature, DC 23 Con or drop to 0 — a death save, as he tries to 'save' them)."},
        {n:"Phase 3 (60–0)",t:"Pleading and desperate; the thesis scene can interrupt the battle. On Pool 0 AND 0 HP he is finally, permanently slain."}
      ],
      legendary:["Detect","Tail / Slam","Unmake (Phase 2+)","Chorus (calls the Hoard to defend)"],
      tactics:"Capstone legacy items (Aegis 'cancel a death', Pyre-Blade 'catch a falling ally', Soul-Lantern 'path to the Source') are built to answer Unmake. Expect a PC to fall — that's who the Source's grace restores."
    }
  ],

  /* ---- Bestiary (supporting cast) ---- */
  bestiary:[
    {name:"The Herald", tier:"I", cr:3, ac:14, hp:78, base:"Cult Fanatic (modified)",
     key:"Touch of the Hoard (3d6 necrotic + max-HP reduction); Gray Sermon (DC 13 Wis, frightened + 2d8 psychic, recharge 5–6); Reinforce the Anchor (+10 HP/round unless Hoard-Cells emptied)."},
    {name:"Sera Vant (revenant ally)", tier:"I", cr:3, ac:13, hp:136, base:"Revenant (run as a person, not a foe)",
     key:"The party's revenant companion. Tether starts at 7/10. Her fate (freed/martyr/defector) is decided by the Tether and her Tier III reckoning with Lord Vant — never by a required fight."},
    {name:"Lady Aurene Firstlight", tier:"II", cr:"—", ac:"—", hp:"—", base:"Archfey (Keepers)",
     key:"Leads the redemption path. If the Court is redeemed, she & 4 fey knights reinforce the Pyre's Heart and bring an army to the finale."},
    {name:"Magister Vol", tier:"II", cr:"—", ac:"—", hp:"—", base:"Archfey (Tallymasters)",
     key:"Offers the Bargain — real power for Court −3 & Ember −1. Half-convinced by Halthurax. The corruption path."},
    {name:"Lord Vant (the Chancellor)", tier:"III", cr:12, ac:18, hp:150, base:"Death-court minister",
     key:"Sera's old liege who damned her. The Death-Court gatekeeper; the axis of Sera's reckoning."},
    {name:"General Ossix", tier:"III", cr:17, ac:20, hp:180, base:"Death Knight",
     key:"Bone-knight commander of the Pale Legion. Holds the Siege gate. Drops the Pale Blade."},
    {name:"Kalaurith", tier:"III", cr:15, ac:19, hp:256, base:"Adult Red Dragon + dracolich-lite",
     key:"Undead red dragon vassal who hates serving Halthurax. A possible ally of convenience — at a price."}
  ],

  /* ---- Legacy item themes (player-facing summaries) ---- */
  legacy:[
    {name:"Pyre-Blade", icon:"ic-init", role:"martial weapon",
     k:"+1d4 fire & light", b:"+1; return a slain undead's soul & heal", z:"+2; crit: +3d6 radiant, target can't heal",
     r:"+3; Dawnstroke (+8d6 radiant; destroy weak undead)", cap:"1/campaign: catch a falling ally's soul → back at 1 HP"},
    {name:"Wardens' Aegis", icon:"ic-shield", role:"shield / armor",
     k:"+1 AC vs undead; adv. vs fear", b:"+1; halve an ally's necrotic dmg", z:"+2; aura: resist max-HP loss",
     r:"+3; Ember Bulwark wall (total cover)", cap:"1/campaign: cancel one creature's death — no save"},
    {name:"Soul-Lantern", icon:"ic-ember", role:"holy focus",
     k:"light at will; sense undead", b:"+1 DC; return a soul + temp HP to ally", z:"+2; healing pushes back the Dimming",
     r:"+3; column of dawn that returns every soul", cap:"1/campaign: open a path to the Source (the way home)"},
    {name:"Gravesong", icon:"ic-overview", role:"instrument / blade",
     k:"speak with recent dead", b:"+1; talk down an undead instead of fighting", z:"+2; adv. with dead & fey; learn a secret",
     r:"+3; Chorus of Release (6 souls return)", cap:"1/campaign: turn an enemy lieutenant for one battle"},
    {name:"Wyrmscale Token", icon:"ic-dragon", role:"draconic relic",
     k:"resist one damage type", b:"+1 spell atk; add 1d8 of your type", z:"+2; breathe a 30-ft elemental cone",
     r:"+3; flight + frightful presence vs undead", cap:"1/campaign: become a true gold dragon"},
    {name:"Quiet Heirloom", icon:"ic-item", role:"for the non-combatant",
     k:"reroll a failed save 1/day", b:"adv. to sway loyalties & steady bonds", z:"1/day: ally inspiration + fear immunity",
     r:"1/day: an ally at 0 HP drops to half instead", cap:"1/campaign: guarantee one loved NPC a future"}
  ],

  milestones:[
    {m:"Kindled", lvl:1, when:"Tier I — the barrow-altar bonding"},
    {m:"Burning", lvl:5, when:"start of Tier II"},
    {m:"Blazing", lvl:11, when:"start of Tier III"},
    {m:"Radiant", lvl:17, when:"start of Tier IV"},
    {m:"True Ember", lvl:"cap", when:"the finale — survivors only"}
  ]
};
