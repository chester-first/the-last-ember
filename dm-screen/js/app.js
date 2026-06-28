/* =================================================================
   THE LAST EMBER — DM SCREEN  (vanilla JS, runs from file://)
   ================================================================= */
(function(){
"use strict";
const C = window.CAMPAIGN;
const LS_KEY = "tle-dm-state-v2";

/* ---------- tiny helpers ---------- */
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ic = (id,cls="")=>`<svg class="ic ${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const uid = ()=>Math.random().toString(36).slice(2,9);

/* ---------- persistent state ---------- */
function defaultState(){
  const clocks={};
  C.clocks.forEach(cl=>clocks[cl.id]=cl.start);
  return {view:"overview", clocks, init:{round:1, turn:0, list:[]}, diceLog:[]};
}
let state;
function load(){
  try{ const r=localStorage.getItem(LS_KEY); state = r?JSON.parse(r):defaultState(); }
  catch(e){ state=defaultState(); }
  // migrate missing keys
  state.clocks = state.clocks||{}; C.clocks.forEach(cl=>{ if(state.clocks[cl.id]==null) state.clocks[cl.id]=cl.start; });
  state.init = state.init||{round:1,turn:0,list:[]};
  state.diceLog = state.diceLog||[];
  return state;
}
let saveTimer;
function save(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); flashSaved(); }catch(e){ $("#saveState").textContent="not saved (private mode)"; }
  },120);
}
function flashSaved(){ const s=$("#saveState"); if(s){ s.textContent="saved locally"; } }

/* ---------- navigation ---------- */
const NAV=[
  {group:"Run the game", items:[
    {id:"overview", label:"Overview", icon:"ic-overview"},
    {id:"clocks", label:"Campaign Clocks", icon:"ic-clock"},
    {id:"initiative", label:"Initiative Tracker", icon:"ic-init"}
  ]},
  {group:"The adventure", items:
    C.tiers.map(t=>({id:t.id, label:`Tier ${t.n} · ${t.name}`, icon:t.icon, dot:t.glow}))
  },
  {group:"Reference", items:[
    {id:"villain", label:"Halthurax (villain)", icon:"ic-dragon"},
    {id:"items", label:"Legacy Items", icon:"ic-item"},
    {id:"loot", label:"Magic Items & Loot", icon:"ic-item"},
    {id:"bestiary", label:"Bestiary", icon:"ic-skull"}
  ]}
];
function buildNav(){
  $("#nav").innerHTML = NAV.map(g=>`
    <div class="nav-group-label">${esc(g.group)}</div>
    ${g.items.map(it=>`
      <button class="nav-item" data-view="${it.id}">
        ${ic(it.icon)} <span>${esc(it.label)}</span>
        ${it.dot?`<span class="tier-dot" style="background:${it.dot}"></span>`:""}
      </button>`).join("")}
  `).join("");
  $$(".nav-item").forEach(b=>b.onclick=()=>{ setView(b.dataset.view); closeMobileNav(); });
}
function markActive(){ $$(".nav-item").forEach(b=>b.classList.toggle("active", b.dataset.view===state.view)); }

/* ---------- router ---------- */
const VIEWS={
  overview:renderOverview, clocks:renderClocks, initiative:renderInit,
  villain:renderVillain, items:renderItems, loot:renderLoot, bestiary:renderBestiary
};
function setView(id){
  state.view=id; save(); markActive();
  const tier = C.tiers.find(t=>t.id===id);
  const fn = VIEWS[id] || (tier ? ()=>renderTier(tier) : renderOverview);
  const titleMap={overview:"Overview",clocks:"Campaign Clocks",initiative:"Initiative Tracker",
    villain:"Halthurax — the Goldwyrm",items:"Legacy Items",loot:"Magic Items & Loot",bestiary:"Bestiary"};
  $("#viewTitle").textContent = tier ? `Tier ${tier.n} — ${tier.name}` : (titleMap[id]||"Overview");
  $("#view").innerHTML = `<div class="stack">${fn(tier)}</div>`;
  $("#view").scrollTop=0;
  wireView();
}

/* ---------- views ---------- */
function renderOverview(){
  return `
    <p class="lead">${esc(C.meta.blurb)}</p>
    <h2 class="section">The four tiers</h2>
    <div class="grid cols-4">
      ${C.tiers.map(t=>`
        <div class="tier-card" data-goto="${t.id}" style="--glow:${t.glow}">
          <svg class="tier-ic" style="color:${t.glow}"><use href="#${t.icon}"/></svg>
          <div class="levels">Levels ${t.levels}</div>
          <h3>Tier ${t.n} · ${esc(t.name)}</h3>
          <div class="plane">${esc(t.plane)}</div>
        </div>`).join("")}
    </div>

    <h2 class="section">Live campaign state</h2>
    <div class="grid cols-3">
      ${C.clocks.map(cl=>{
        const v=state.clocks[cl.id];
        const disp = cl.type==="meter" ? (v>0?`+${v}`:v) : `${v} / ${cl.max}`;
        return `<div class="card" data-goto="clocks" style="cursor:pointer">
          <div class="clock-head">${ic(cl.icon)}<h3 style="font-size:1rem">${esc(cl.name)}</h3></div>
          <div class="clock-val" style="text-align:left;font-size:1.6rem">${disp}</div>
        </div>`;
      }).join("")}
    </div>

    <h2 class="section">Source documents</h2>
    <p class="muted">The app is a live DM screen; the full prose lives in these Markdown files alongside it.</p>
    <div class="grid cols-3">
      ${C.meta.docs.map(d=>`<a class="card" style="display:block" href="../${encodeURI(d.file)}" target="_blank" rel="noopener">${ic("ic-overview")} ${esc(d.label)}<br><small class="muted">${esc(d.file)}</small></a>`).join("")}
    </div>`;
}

function renderTier(t){
  return `
    <div class="card" style="border-left:4px solid ${t.glow}">
      <div class="clock-head"><svg class="ic" style="width:26px;height:26px;color:${t.glow}"><use href="#${t.icon}"/></svg>
        <div><h3 style="margin:0">${esc(t.plane)} · Levels ${t.levels}</h3></div></div>
      <p style="margin-top:var(--s2)">${esc(t.summary)}</p>
      <div class="threshold warn" style="margin-top:var(--s2)">${ic("ic-item")} ${esc(t.milestone)}</div>
      <p style="margin-top:var(--s3)"><a href="../${encodeURI(t.file)}" target="_blank" rel="noopener">Open the full Tier ${t.n} writeup →</a></p>
    </div>

    <h2 class="section">Story beats</h2>
    ${t.beats.map(b=>`<div class="enc-row"><div class="enc-name"><strong>${esc(b.t)}</strong><small>${esc(b.d)}</small></div></div>`).join("")}

    <h2 class="section">Encounters <span class="muted" style="font-size:.7em">— load any into the tracker</span></h2>
    ${t.encounters.map(id=>encounterRow(id)).join("")}

    <h2 class="section">Signature treasure</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      ${t.treasure.map(x=>`<span class="badge ${/◈/.test(x)?'hoard':'gold'}">${ic("ic-item")} ${esc(x)}</span>`).join("")}
    </div>
    <p class="muted" style="margin-top:var(--s2)">Full tables: <a href="../Magic-Items-and-Treasure.md" target="_blank" rel="noopener">Magic-Items-and-Treasure.md</a></p>`;
}

function encounterRow(id){
  const e=C.encounters[id]; if(!e) return "";
  const count=e.foes.reduce((n,f)=>n+(f.c||1),0);
  const diffColor={easy:"return",hard:"gold",deadly:"cr","deadly+":"cr",epic:"cr"}[e.diff]||"";
  return `<div class="enc-row">
    <div class="enc-name"><strong>${esc(e.name)}</strong>
      <small>Lvl ${esc(e.lvl)} · ${count} combatant${count>1?"s":""} · ${e.foes.map(f=>esc((f.c>1?f.c+"× ":"")+f.n)).join(", ")}</small></div>
    <span class="badge ${diffColor}">${esc(e.diff)}</span>
    <button class="btn primary" data-load-enc="${id}">${ic("ic-plus")} Load</button>
  </div>`;
}

/* ---------- Clocks ---------- */
function renderClocks(){
  return C.clocks.map(cl=>{
    const v=state.clocks[cl.id];
    if(cl.type==="pips") return pipClock(cl,v);
    return meterClock(cl,v);
  }).join("") + `
    <div class="card" style="margin-top:var(--s5)">
      <button class="btn ghost" id="resetClocks">${ic("ic-reset")} Reset all clocks to starting values</button>
    </div>`;
}
function pipClock(cl,v){
  let pips="";
  for(let i=cl.max;i>=1;i--){
    const full=i<=v, crit=cl.crit && i<=cl.crit;
    pips+=`<button class="pip ${full?"full":""} ${crit?"crit":""}" data-clock="${cl.id}" data-set="${i}" title="Set to ${i}"></button>`;
  }
  const th = activeThreshold(cl,v);
  return `<div class="card clock-card">
    <div class="clock-head">${ic(cl.icon)}<h3>${esc(cl.name)}</h3>
      <div class="clock-controls">
        <button class="icon-btn sm" data-clock-adj="${cl.id}" data-d="-1">${ic("ic-minus")}</button>
        <span class="clock-val">${v} / ${cl.max}</span>
        <button class="icon-btn sm" data-clock-adj="${cl.id}" data-d="1">${ic("ic-plus")}</button>
      </div></div>
    <div class="pips">${pips}</div>
    <p class="clock-note">${esc(cl.note)}</p>
    ${th?`<div class="threshold ${th.level==='ok'?'':th.level}">${esc(th.text)}</div>`:""}
  </div>`;
}
function meterClock(cl,v){
  const pct=((v-cl.min)/(cl.max-cl.min))*100;
  return `<div class="card clock-card">
    <div class="clock-head">${ic(cl.icon)}<h3>${esc(cl.name)}</h3>
      <div class="clock-controls">
        <button class="icon-btn sm" data-clock-adj="${cl.id}" data-d="-1">${ic("ic-minus")}</button>
        <span class="clock-val">${v>0?"+"+v:v}</span>
        <button class="icon-btn sm" data-clock-adj="${cl.id}" data-d="1">${ic("ic-plus")}</button>
      </div></div>
    <div class="meter-track" data-meter="${cl.id}">
      <div class="meter-thumb" style="left:${pct}%"></div>
    </div>
    <div class="meter-labels"><span>← ${esc(cl.leftLabel)} (${cl.min})</span><span>${esc(cl.rightLabel)} (+${cl.max}) →</span></div>
    <p class="clock-note">${esc(cl.note)}</p>
  </div>`;
}
function activeThreshold(cl,v){
  if(!cl.thresholds) return null;
  // find the lowest-'at' threshold whose 'at' >= v isn't right; we want band containing v.
  let chosen=cl.thresholds[0];
  for(const t of cl.thresholds){ if(v>=t.at){ chosen=t; break; } chosen=t; }
  return chosen;
}
function setClock(id,val){
  const cl=C.clocks.find(c=>c.id===id);
  val=Math.max(cl.min!=null?cl.min:0, Math.min(cl.max,val));
  state.clocks[id]=val; save();
  if(state.view==="clocks") $("#view .stack").innerHTML=renderClocks(), wireView();
  else if(state.view==="overview"){ setView("overview"); }
}

/* ---------- Initiative tracker ---------- */
function renderInit(){
  const L=state.init.list;
  const sorted=[...L].sort((a,b)=>b.init-a.init || (a.order-b.order));
  const activeId = sorted.length? sorted[Math.min(state.init.turn,sorted.length-1)].id : null;
  return `
    <div class="init-add">
      <input class="name" id="ciName" placeholder="Name (e.g. Skeleton)"/>
      <input id="ciInit" type="number" placeholder="Init"/>
      <input id="ciHp" type="number" placeholder="HP"/>
      <input id="ciAc" type="number" placeholder="AC"/>
      <input id="ciCount" type="number" placeholder="×N" value="1" style="width:50px"/>
      <select id="ciSide" class="init-add-side" style="background:var(--ash-800);border:1px solid var(--line);border-radius:var(--r-sm);color:var(--text);padding:8px">
        <option value="foe">Foe</option><option value="ally">Ally</option><option value="pc">PC</option>
      </select>
      <button class="btn primary" id="ciAdd">${ic("ic-plus")} Add</button>
    </div>

    <div class="init-toolbar">
      <span class="init-round">Round ${state.init.round}</span>
      <button class="btn" id="rollFoes" title="Auto-roll initiative for everyone missing a value">${ic("ic-dice")} Roll empty inits</button>
      <button class="btn primary" id="nextTurn">${ic("ic-next")} Next turn</button>
      <button class="btn ghost" id="clearInit">${ic("ic-reset")} Clear</button>
    </div>

    ${sorted.length? sorted.map(c=>combatantRow(c, c.id===activeId)).join("")
      : `<div class="empty">${ic("ic-init")}<p>No combatants yet. Add them above, or open a tier and hit <strong>Load</strong> on an encounter.</p></div>`}
  `;
}
function combatantRow(c,active){
  const sideCls = c.side==="ally"?"ally":(c.side==="pc"?"ally":"foe");
  const sideLbl = c.side==="pc"?"PC":(c.side==="ally"?"Ally":"Foe");
  return `<div class="combatant ${active?"active":""} ${c.hp<=0?"dead":""}" data-id="${c.id}">
    <div class="c-init" title="Initiative">${c.init}</div>
    <div class="c-name">${esc(c.name)} ${c.sub?`<small>${esc(c.sub)}</small>`:""}</div>
    <span class="tag-side ${sideCls}">${sideLbl}</span>
    ${c.ac?`<div class="c-stat" title="AC">${ic("ic-shield")} ${c.ac}</div>`:""}
    <div class="c-hp">${ic("ic-heart")}
      <button class="icon-btn sm" data-hp="${c.id}" data-d="-1">${ic("ic-minus")}</button>
      <input type="number" value="${c.hp}" data-hpset="${c.id}"/>
      <span class="hpmax">/ ${c.hpmax}</span>
      <button class="icon-btn sm" data-hp="${c.id}" data-d="1">${ic("ic-plus")}</button>
    </div>
    <button class="icon-btn sm" data-del="${c.id}" title="Remove">${ic("ic-x")}</button>
  </div>`;
}
function addCombatant({name,init,hp,ac,side,sub}){
  state.init.list.push({id:uid(),name,sub:sub||"",init:Number(init)||0,hp:Number(hp)||0,hpmax:Number(hp)||0,ac:Number(ac)||0,side:side||"foe",order:state.init.list.length});
}
function loadEncounter(id){
  const e=C.encounters[id]; if(!e) return;
  e.foes.forEach(f=>{
    const n=f.c||1;
    for(let i=1;i<=n;i++){
      addCombatant({name:f.n, sub:`${e.tier} · CR ${f.cr}`+(n>1?` (#${i})`:""), init:0, hp:typeof f.hp==="number"?f.hp:0, ac:typeof f.ac==="number"?f.ac:0, side:"foe"});
    }
  });
  save(); setView("initiative");
  toast(`Loaded “${e.name}” → roll inits or set them.`);
}
function nextTurn(){
  const len=state.init.list.length; if(!len) return;
  state.init.turn++;
  if(state.init.turn>=len){ state.init.turn=0; state.init.round++; }
  save(); rerenderInit();
}
function rerenderInit(){ if(state.view==="initiative"){ $("#view .stack").innerHTML=renderInit(); wireView(); } }

/* ---------- Villain ---------- */
function renderVillain(){
  return `<p class="lead">A fallen gold dragon who decided death is the enemy. He doesn't gloat — he grieves. He grows because every "kill" frees part of his hoard and he reconstitutes around what's left.</p>
    ${C.villain.map(statBlock).join("")}`;
}
function statBlock(f){
  const ab=f.abil?`<div class="sb-abilities">${["STR","DEX","CON","INT","WIS","CHA"].map(k=>`<div class="sb-ab"><span>${k}</span><b>${f.abil[k]}</b></div>`).join("")}</div>`:"";
  return `<div class="statblock" style="margin-bottom:var(--s5)">
    <p class="sb-name">${esc(f.name)}</p>
    <div class="sb-type">${esc(f.type)}</div>
    <hr class="sb-rule"/>
    ${f.ac?`<div class="sb-line"><span><b>AC</b> ${esc(f.ac)}</span><span><b>HP</b> ${esc(f.hp)}</span><span><b>Speed</b> ${esc(f.speed)}</span></div>`:""}
    ${ab}
    ${f.meta?`<div class="sb-trait" style="color:var(--muted)">${esc(f.meta)}</div>`:""}
    <hr class="sb-rule"/>
    ${(f.traits||[]).map(t=>`<div class="sb-trait"><b>${esc(t.n)}.</b> ${esc(t.t)}</div>`).join("")}
    ${f.legendary?`<div class="sb-section-label">Legendary Actions</div>${f.legendary.map(l=>`<div class="sb-trait">• ${esc(l)}</div>`).join("")}`:""}
    ${f.lair?`<div class="sb-section-label">Lair Actions</div>${f.lair.map(l=>`<div class="sb-trait">• ${esc(l)}</div>`).join("")}`:""}
    ${f.tactics?`<div class="threshold warn" style="margin-top:var(--s3)">${ic("ic-dragon")} <b>Tactics:</b> ${esc(f.tactics)}</div>`:""}
    ${typeof f.form==="number"?`<button class="btn primary" data-load-villain="${f.form}" style="margin-top:var(--s3)">${ic("ic-init")} Add this form to the tracker</button>`:""}
  </div>`;
}

/* ---------- Legacy items ---------- */
function renderItems(){
  return `<p class="lead">One bonded item per PC, woken at the Tier I barrow-altar. It holds a mote of the PC's own soul-fire and grows at five fixed milestones — the same mechanic the villain abuses, used rightly.</p>
    <h2 class="section">Milestones</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      ${C.milestones.map(m=>`<span class="badge gold">${esc(m.m)} · lvl ${esc(m.lvl)} <span class="muted">— ${esc(m.when)}</span></span>`).join("")}
    </div>
    <h2 class="section">The six themes</h2>
    ${C.legacy.map(it=>`
      <div class="card">
        <div class="clock-head">${ic(it.icon)}<h3 style="margin:0">${esc(it.name)}</h3><span class="badge">${esc(it.role)}</span></div>
        <table>
          <tr><th>Kindled (1)</th><td>${esc(it.k)}</td></tr>
          <tr><th>Burning (5)</th><td>${esc(it.b)}</td></tr>
          <tr><th>Blazing (11)</th><td>${esc(it.z)}</td></tr>
          <tr><th>Radiant (17)</th><td>${esc(it.r)}</td></tr>
          <tr><th>True Ember</th><td><span class="badge gold">capstone</span> ${esc(it.cap)}</td></tr>
        </table>
      </div>`).join("")}
    <p class="muted">Full build framework & the dark-mirror "Hoarding temptation": <a href="../Appendix-B-Legacy-Items.md" target="_blank" rel="noopener">Appendix-B-Legacy-Items.md</a></p>`;
}

/* ---------- Loot ---------- */
function renderLoot(){
  return `<p class="lead">Found treasure, theme-tied to the Ember cosmology. <span class="badge return">${ic("ic-return")} Return</span> items reward mercy; <span class="badge hoard">◈ Hoard</span> items are stronger but built from stolen souls — using them costs the world.</p>
    ${C.tiers.map(t=>`
      <h2 class="section"><svg class="ic" style="color:${t.glow}"><use href="#${t.icon}"/></svg> Tier ${t.n} — ${esc(t.name)} <span class="muted" style="font-size:.7em">(${esc(t.levels)})</span></h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${t.treasure.map(x=>`<span class="badge ${/◈/.test(x)?'hoard':'gold'}">${ic("ic-item")} ${esc(x)}</span>`).join("")}
      </div>`).join("")}
    <p class="muted" style="margin-top:var(--s4)">Full per-tier roll tables, hoard guidance, and the Return/Hoard tag system: <a href="../Magic-Items-and-Treasure.md" target="_blank" rel="noopener">Magic-Items-and-Treasure.md</a></p>`;
}

/* ---------- Bestiary ---------- */
function renderBestiary(){
  return `<p class="lead">Supporting cast and lieutenants. The four forms of Halthurax live on the <a href="#" data-goto="villain">villain</a> page.</p>
    ${C.bestiary.map(m=>`
      <div class="statblock" style="margin-bottom:var(--s4)">
        <p class="sb-name">${esc(m.name)}</p>
        <div class="sb-type">Tier ${esc(m.tier)} · ${esc(m.base)}</div>
        <hr class="sb-rule"/>
        <div class="sb-line">
          <span><b>CR</b> ${esc(m.cr)}</span><span><b>AC</b> ${esc(m.ac)}</span><span><b>HP</b> ${esc(m.hp)}</span>
        </div>
        <div class="sb-trait" style="margin-top:var(--s2)">${esc(m.key)}</div>
        ${(typeof m.hp==="number" && typeof m.ac==="number")?`<button class="btn" data-add-best="${esc(m.name)}|${m.hp}|${m.ac}" style="margin-top:var(--s2)">${ic("ic-plus")} Add to tracker</button>`:""}
      </div>`).join("")}`;
}

/* ---------- wire interactions for the current view ---------- */
function wireView(){
  const root=$("#view");
  // goto links / tier cards
  $$("[data-goto]",root).forEach(b=>b.addEventListener("click",ev=>{ev.preventDefault(); setView(b.dataset.goto);}));
  // encounter load
  $$("[data-load-enc]",root).forEach(b=>b.onclick=()=>loadEncounter(b.dataset.loadEnc));
  // villain form load
  $$("[data-load-villain]",root).forEach(b=>b.onclick=()=>{
    const f=C.villain.find(v=>v.form==numOr(b.dataset.loadVillain));
    if(f){ addCombatant({name:f.name,sub:f.type,init:0,hp:parseInt(f.hp)||0,ac:parseInt(f.ac)||0,side:"foe"}); save(); toast("Added "+f.form+" to the tracker."); }
  });
  // bestiary add
  $$("[data-add-best]",root).forEach(b=>b.onclick=()=>{
    const [n,hp,ac]=b.dataset.addBest.split("|");
    addCombatant({name:n,init:0,hp:+hp,ac:+ac,side:"foe"}); save(); toast("Added "+n+".");
  });

  // clocks
  $$("[data-set]",root).forEach(p=>p.onclick=()=>setClock(p.dataset.clock, +p.dataset.set));
  $$("[data-clock-adj]",root).forEach(b=>b.onclick=()=>setClock(b.dataset.clockAdj, state.clocks[b.dataset.clockAdj]+(+b.dataset.d)));
  $$("[data-meter]",root).forEach(tr=>{
    const cl=C.clocks.find(c=>c.id===tr.dataset.meter);
    const move=e=>{ const r=tr.getBoundingClientRect(); const x=Math.min(1,Math.max(0,((e.touches?e.touches[0].clientX:e.clientX)-r.left)/r.width)); setClock(cl.id, Math.round(cl.min+x*(cl.max-cl.min))); };
    tr.onclick=move;
    const thumb=$(".meter-thumb",tr);
    if(thumb){ thumb.onmousedown=e=>{e.preventDefault(); const mv=ev=>move(ev), up=()=>{document.removeEventListener("mousemove",mv);document.removeEventListener("mouseup",up);}; document.addEventListener("mousemove",mv);document.addEventListener("mouseup",up);}; }
  });
  const rc=$("#resetClocks",root); if(rc) rc.onclick=()=>{ C.clocks.forEach(cl=>state.clocks[cl.id]=cl.start); save(); setView("clocks"); };

  // initiative
  const add=$("#ciAdd",root); if(add) add.onclick=()=>{
    const name=$("#ciName").value.trim(); if(!name) return;
    const n=Math.max(1,+$("#ciCount").value||1);
    for(let i=1;i<=n;i++) addCombatant({name, sub:n>1?`#${i}`:"", init:$("#ciInit").value, hp:$("#ciHp").value, ac:$("#ciAc").value, side:$("#ciSide").value});
    save(); rerenderInit();
  };
  const nt=$("#nextTurn",root); if(nt) nt.onclick=nextTurn;
  const cl=$("#clearInit",root); if(cl) cl.onclick=()=>{ if(confirm("Clear all combatants and reset to round 1?")){ state.init={round:1,turn:0,list:[]}; save(); rerenderInit(); } };
  const rf=$("#rollFoes",root); if(rf) rf.onclick=()=>{ state.init.list.forEach(c=>{ if(!c.init) c.init=1+Math.floor(Math.random()*20); }); save(); rerenderInit(); };
  $$("[data-hp]",root).forEach(b=>b.onclick=()=>{ const c=findC(b.dataset.hp); if(c){ c.hp+=(+b.dataset.d); save(); rerenderInit(); } });
  $$("[data-hpset]",root).forEach(inp=>inp.onchange=()=>{ const c=findC(inp.dataset.hpset); if(c){ c.hp=+inp.value; save(); rerenderInit(); } });
  $$("[data-del]",root).forEach(b=>b.onclick=()=>{ state.init.list=state.init.list.filter(x=>x.id!==b.dataset.del); save(); rerenderInit(); });
}
function findC(id){ return state.init.list.find(c=>c.id===id); }
function numOr(x){ const n=+x; return isNaN(n)?x:n; }

/* ---------- search ---------- */
function buildSearchIndex(){
  const idx=[];
  C.tiers.forEach(t=>{ idx.push({label:`Tier ${t.n} · ${t.name}`,view:t.id,kind:"Tier"}); t.beats.forEach(b=>idx.push({label:b.t,view:t.id,kind:`Tier ${t.n} beat`})); });
  Object.entries(C.encounters).forEach(([id,e])=>idx.push({label:e.name,view:"loadenc:"+id,kind:`Encounter (lvl ${e.lvl})`}));
  C.villain.forEach(v=>idx.push({label:v.name,view:"villain",kind:"Villain form"}));
  C.bestiary.forEach(m=>idx.push({label:m.name,view:"bestiary",kind:"Bestiary"}));
  C.legacy.forEach(l=>idx.push({label:l.name,view:"items",kind:"Legacy item"}));
  C.clocks.forEach(c=>idx.push({label:c.name,view:"clocks",kind:"Clock"}));
  return idx;
}
let SEARCH;
function wireSearch(){
  SEARCH=buildSearchIndex();
  const inp=$("#globalSearch");
  let box;
  inp.addEventListener("input",()=>{
    const q=inp.value.trim().toLowerCase();
    if(box) box.remove(), box=null;
    if(!q) return;
    const hits=SEARCH.filter(x=>x.label.toLowerCase().includes(q)).slice(0,8);
    if(!hits.length) return;
    box=document.createElement("div");
    box.style.cssText="position:absolute;left:16px;right:16px;margin-top:6px;background:var(--panel);border:1px solid var(--ash-500);border-radius:var(--r-md);box-shadow:var(--sh-2);z-index:70;overflow:hidden";
    box.innerHTML=hits.map(h=>`<button class="nav-item" data-s="${h.view}" style="width:100%;border-radius:0"><span>${esc(h.label)}</span><small class="muted" style="margin-left:auto">${esc(h.kind)}</small></button>`).join("");
    inp.parentElement.appendChild(box);
    $$("[data-s]",box).forEach(b=>b.onclick=()=>{
      const v=b.dataset.s;
      if(v.startsWith("loadenc:")) loadEncounter(v.split(":")[1]);
      else setView(v);
      inp.value=""; box.remove(); box=null;
    });
  });
  document.addEventListener("click",e=>{ if(box && !inp.parentElement.contains(e.target)){ box.remove(); box=null; } });
}

/* ---------- dice ---------- */
function wireDice(){
  const tray=$("#diceTray"), grid=$("#diceGrid"), res=$("#diceResult"), log=$("#diceLog");
  [4,6,8,10,12,20,100].forEach(d=>{ const b=document.createElement("button"); b.className="die"; b.textContent="d"+d; b.onclick=()=>roll(d); grid.appendChild(b); });
  const adv=document.createElement("button"); adv.className="die"; adv.textContent="2d20"; adv.title="advantage"; adv.onclick=()=>rollAdv(); grid.appendChild(adv);
  function roll(d){ const r=1+Math.floor(Math.random()*d); show(`d${d}`,r,r); }
  function rollAdv(){ const a=1+Math.floor(Math.random()*20),b=1+Math.floor(Math.random()*20); show(`2d20→${Math.max(a,b)}`,Math.max(a,b),`${a}/${b}`); }
  function show(lbl,val,detail){ res.textContent=val; const line=document.createElement("div"); line.textContent=`${lbl}: ${detail}`; log.prepend(line); while(log.children.length>12) log.lastChild.remove(); }
  $("#diceToggle").onclick=()=>{ tray.hidden=!tray.hidden; };
  $("#diceClose").onclick=()=>tray.hidden=true;
}

/* ---------- misc UI ---------- */
function toast(msg){
  let t=document.createElement("div");
  t.textContent=msg;
  t.style.cssText="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ash-700);border:1px solid var(--ember-500);color:var(--text);padding:10px 18px;border-radius:var(--r-pill);box-shadow:var(--sh-2);z-index:90;font-size:.85rem";
  document.body.appendChild(t); setTimeout(()=>{t.style.opacity="0";t.style.transition="opacity .4s";},1600); setTimeout(()=>t.remove(),2100);
}
function closeMobileNav(){ $("#sidebar").classList.remove("open"); }

/* ---------- boot ---------- */
function boot(){
  load();
  buildNav();
  wireSearch();
  wireDice();
  $("#menuToggle").onclick=()=>$("#sidebar").classList.toggle("open");
  setView(state.view||"overview");
}
boot();
})();
