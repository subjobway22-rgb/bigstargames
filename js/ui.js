import * as G from './game.js';
import { RARITY, REGIONS, ABYSS } from './data.js';
import { portrait, enemy, scene } from './art.js';
import { t, setLang, getLang } from './i18n.js';
import { showRewarded } from './ads.js';
import * as Sync from './sync.js';
import { initAdMob } from './admob.js';

const KEY = 'guild-of-ash-save';
const $ = (s) => document.querySelector(s);
let S, tab = 'quest', lastFrame = 0;

/* ---------- save / load ---------- */
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); if (o.v === G.SAVE_VERSION) return o; } } catch {}
  return null;
}
function save() { S.t = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }

/* ---------- helpers ---------- */
const UN = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
export function fmt(n) {
  if (n < 1000) return n < 10 && n % 1 ? n.toFixed(1) : String(Math.floor(n));
  const i = Math.min(UN.length - 1, Math.floor(Math.log10(n) / 3)), v = n / 1000 ** i;
  return (v < 10 ? v.toFixed(2) : v < 100 ? v.toFixed(1) : v.toFixed(0)) + UN[i];
}
function dur(sec) { const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60); return h ? `${h}h ${m}m` : `${m}m`; }
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => el.classList.remove('on'), 2000); }
function region(stage) { const i = Math.floor(stage / 10); return i < REGIONS.length ? REGIONS[i] : ABYSS; }
const rname = (r) => r[getLang()] || r.en;
function modal(html, buttons) {
  const m = $('#modal'); m.hidden = false;
  m.innerHTML = `<div class="mbox">${html}<div class="row">${buttons.map((b, i) => `<button class="b ${b.cls || ''}" data-m="${i}">${b.label}</button>`).join('')}</div></div>`;
  m.onclick = (e) => { const b = e.target.closest('[data-m]'); if (!b) return; m.hidden = true; buttons[+b.dataset.m].fn?.(); render(); };
}
const confirmDlg = (text, fn) => modal(text, [{ label: t('cancel') }, { label: t('ok'), cls: 'red', fn }]);

/* ---------- ads ---------- */
async function watch(kind, placement) {
  const now = Date.now();
  if (G.adLeft(S, kind, now) <= 0) return toast(t('ad_none'));
  const ok = await showRewarded(placement || kind);
  if (!ok) return toast(t('ad_fail'));
  G.adGrant(S, kind, Date.now()); save(); render();
}
const adLabel = (kind) => t('ad_left', { n: Math.max(0, G.adLeft(S, kind, Date.now())) });

/* ---------- guild receptionist (mascot) ---------- */
const FACE = { idle: 'face1', happy: 'face2', cheer: 'face3', worry: 'face4', shy: 'face5', sleep: 'face6' };
let force = null;
function curMood() {
  const now = Date.now();
  if (force && force.until > now) return force;
  if (G.fight(S).stalled) return { mood: 'worry', key: 'mas_stalled' };
  if (S.boostUntil > now) return { mood: 'cheer', key: 'mas_boost' };
  return { mood: 'idle', key: 'mas_idle' + (Math.floor(now / 20000) % 3 + 1) };
}
function say(key, mood, ms = 4500) { force = { mood, key, until: Date.now() + ms }; updateMascot(); }
function mascotHtml(mood, key) {
  const m = key ? { mood, key } : curMood();
  return `<div class="mascot" id="mas"><img id="masimg" class="mface" src="art/mascot_${FACE[m.mood]}.webp" alt="">
    <div class="bubble"><b>${t('mas_name')}</b><span id="mastxt">${t(m.key)}</span></div></div>`;
}
function updateMascot() {
  const img = $('#masimg'), tx = $('#mastxt'); if (!img || !tx) return;
  const m = curMood(), src = `art/mascot_${FACE[m.mood]}.webp`, txt = t(m.key);
  if (!img.src.endsWith(src)) img.src = src;
  if (tx.textContent !== txt) tx.textContent = txt;
}

/* ---------- views ---------- */
function advCard(a, mode) {
  const inP = S.party.includes(a.id), r = RARITY[a.rar], c = G.enhanceCost(a);
  return `<div class="card ${inP ? 'pty' : ''}" data-id="${a.id}">
    ${portrait(a, 56)}
    <div class="info"><div class="nm">${a.name}</div>
      <div class="sub"><span class="rar-${r.id}">${t('r_' + r.id)}</span> · ${t('cls_' + a.cls)} · Lv.${a.lv}</div>
      <div class="sub">${t('power')} ${fmt(G.advPower(a))} · ${t('wage')} ${G.wage(a).toFixed(2)}${t('per_s')}</div>
      <div class="sub">${t('cls_info_' + a.cls)}</div></div>
    <div class="acts">
      <button class="b" data-act="enh" data-cost="${c}">${t('enh')}<small>${fmt(c)}</small></button>
      ${mode === 'roster' ? `<button class="b ${inP ? 'red' : ''}" data-act="party">${inP ? t('in_party') : t('to_party')}</button>
      <button class="b" data-act="fire">${t('fire')}</button>` : ''}
    </div></div>`;
}

function viewQuest() {
  const f = G.fight(S), reg = region(S.stage), boss = G.isBoss(S.stage);
  const P = f.P, foeReg = region(f.f), foeBoss = G.isBoss(f.f);
  const party = G.partyList(S).map(a => portrait(a, 38)).join('');
  const bossName = foeBoss ? rname(foeReg.boss) : '';
  const big = foeReg.mon === 'lord' || foeBoss;
  return `<div class="scene">${scene(Math.floor(f.f / 10))}
      <div class="tag">${foeBoss ? `<b>${t('boss')}</b>${bossName}` : ''} ${t('stage_of', { r: rname(foeReg), s: f.f % 10 + 1 })}</div>
      <div class="party">${party}</div><div class="foe ${big ? 'big' : ''}" id="foe">${enemy(foeReg.mon, foeReg.hue, foeBoss, Math.min(12, Math.floor(f.f / 10) + 1))}</div><div id="fx"></div></div>
    <div class="bar"><i id="prog"></i></div>
    ${mascotHtml()}
    ${f.stalled ? `<div class="warn">⚠ ${t('stalled')} (${t('power')} ${fmt(P)} / ${fmt(G.enemyPower(S.stage) * .7)})</div>` : ''}
    <div class="kv"><span>${t('power')}</span><b>${fmt(P)}</b></div>
    <div class="kv"><span>${t('enemy')}</span><b>${fmt(G.enemyPower(f.f))}</b></div>
    <div class="kv"><span>${t('stage')}</span><b>${S.stage + 1}</b></div>
    <div class="row"><button class="b red" data-act="enhall">${t('auto_enh')}</button>
      <button class="b ad" data-act="ad-boost">${t('ad_boost')}<small id="boostleft">${adLabel('boost')}</small></button></div>
    <h3>${t('slots', { a: S.party.length, b: G.partySlots(S) })}</h3>
    ${G.partyList(S).map(a => advCard(a, 'party')).join('')}`;
}
function viewGuild() {
  const gc = G.guildCost(S);
  const list = [...S.roster].sort((a, b) => G.advPower(b) - G.advPower(a));
  return `<div class="card"><div class="info"><div class="nm">${t('guild_lv')} ${S.guildLv}</div>
    <div class="sub">${t('slots', { a: S.party.length, b: G.partySlots(S) })} · ${t('roster', { a: S.roster.length, b: G.rosterCap(S) })}</div>
    <div class="sub">${t('wage')} −${G.wageTotal(S).toFixed(2)}${t('per_s')}</div></div>
    <div class="acts"><button class="b red" data-act="guild" data-cost="${gc}">${t('upgrade')}<small>${fmt(gc)}</small></button></div></div>
    ${list.map(a => advCard(a, 'roster')).join('')}`;
}
function viewRecruit() {
  const now = Date.now(), free = G.poolFree(S, now), rc = G.REFRESH_COST(S);
  return `${mascotHtml('happy', 'mas_recruit')}<h3>${t('cand')}</h3>
    ${S.pool.map((a, i) => `<div class="card">${portrait(a, 56)}<div class="info"><div class="nm">${a.name}</div>
      <div class="sub"><span class="rar-${RARITY[a.rar].id}">${t('r_' + RARITY[a.rar].id)}</span> · ${t('cls_' + a.cls)}</div>
      <div class="sub">${t('power')} ${fmt(G.advPower(a))} · ${t('wage')} ${G.wage(a).toFixed(2)}${t('per_s')}</div><div class="sub">${t('cls_info_' + a.cls)}</div></div>
      <div class="acts"><button class="b red" data-act="hire" data-i="${i}" data-cost="${G.hirePrice(S, a.rar)}">${t('hire')}<small>${fmt(G.hirePrice(S, a.rar))}</small></button></div></div>`).join('')}
    <div class="row"><button class="b" data-act="refresh" ${free ? '' : `data-cost="${rc}"`}>${t('refresh')}<small>${free ? t('free') : fmt(rc)}</small></button>
      <button class="b ad" data-act="ad-refresh">${t('ad_refresh')}<small>${adLabel('refresh')}</small></button></div>
    <div class="row"><button class="b red" data-act="summon">${t('soul_summon')}<small>${G.SOUL_SUMMON} ${t('souls')}</small></button>
      <button class="b ad" data-act="ad-souls">${t('ad_souls')}<small>${adLabel('souls')}</small></button></div>
    <div class="note">${t('roster', { a: S.roster.length, b: G.rosterCap(S) })}</div>`;
}
function viewMore() {
  const can = G.canPrestige(S);
  return `<div class="hero"><img src="art/mascot_full.webp" alt=""><div><div class="nm">Guild of Ash</div><div class="sub">${t('mas_idle1')}</div></div></div><h3>${t('prestige')}</h3>
    <div class="card"><div class="info"><div class="sub">${can ? t('prestige_t', { n: G.prestigeGain(S) }) : t('prestige_na')}</div></div>
    <div class="acts"><button class="b ${can ? 'red' : 'off'}" data-act="prestige">${t('prestige')}</button></div></div>
    <h3>${t('lang')}</h3>
    <select id="lang"><option value="auto">Auto</option><option value="ko">한국어</option><option value="en">English</option></select>
    <h3>${t('cloud')}</h3>
    <div class="kv"><span>${t('cloud_on')}</span><input type="checkbox" id="sync" style="width:auto" ${S.set.sync ? 'checked' : ''}></div>
    <div class="row"><button class="b" data-act="up">${t('cloud_up')}</button><button class="b" data-act="down">${t('cloud_down')}</button></div>
    <div class="note">${t('cloud_help')}</div>
    <div class="note">${t('cloud_id')}: ${S.cloud.id ? S.cloud.id + S.cloud.key : '-'}</div>
    <h3>·</h3><div class="note">${t('data_note')}</div>
    <div class="row"><button class="b" data-act="reset">${t('reset')}</button></div>`;
}

const VIEWS = { quest: viewQuest, guild: viewGuild, recruit: viewRecruit, more: viewMore };
const ICON = {
  quest: '<path d="M14.5 3.5l6 6-9 9-3-3zM4 20l4-4M7 13l4 4"/>',
  guild: '<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M12 8v6M9 11h6"/>',
  recruit: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.8-4 3.2-6 6.5-6s5.700 2 6.500 6M18 7v6M15 10h6"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
};
function renderTabs() {
  $('#tabs').innerHTML = Object.keys(VIEWS).map(k => `<button data-tab="${k}" class="${k === tab ? 'on' : ''}"><svg viewBox="0 0 24 24">${ICON[k]}</svg>${t('tab_' + k)}</button>`).join('');
}
function render() {
  if (tab === 'recruit' && !S.pool.length) G.refreshPool(S);
  renderTabs();
  $('#view').innerHTML = VIEWS[tab]();
  if (tab === 'more') $('#lang').value = S.set.lang;
  updateHud(); updateAfford();
}
function updateHud() {
  $('#gold').textContent = fmt(S.gold); $('#souls').textContent = fmt(S.souls); $('#ess').textContent = fmt(S.essence);
  const now = Date.now();
  const gross = (() => { const f = G.fight(S); return G.clearRate(f.P, f.f) * G.stageGold(f.f) * G.goldMul(S, now); })();
  const net = gross - G.wageTotal(S);
  const inc = $('#inc'); inc.textContent = `${net >= 0 ? '+' : ''}${fmt(Math.abs(net))}${t('per_s')}${S.boostUntil > now ? ' ×2' : ''}`; inc.style.color = net >= 0 ? '' : '#c4572b';
}
function updateAfford() {
  document.querySelectorAll('[data-cost]').forEach(b => b.classList.toggle('off', S.gold < +b.dataset.cost));
}

/* ---------- actions ---------- */
function floatGold(n) {
  const fx = $('#fx'); if (!fx) return;
  const e = document.createElement('div'); e.className = 'fl'; e.textContent = '+' + fmt(n);
  e.style.left = (50 + Math.random() * 30) + '%'; e.style.top = (30 + Math.random() * 30) + '%'; fx.append(e); setTimeout(() => e.remove(), 1000);
}
document.addEventListener('click', async (e) => {
  const tb = e.target.closest('[data-tab]'); if (tb) { tab = tb.dataset.tab; render(); return; }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const id = +(b.closest('[data-id]')?.dataset.id || 0), act = b.dataset.act;
  switch (act) {
    case 'enh': G.enhance(S, id, 1); break;
    case 'enhall': G.enhanceParty(S); break;
    case 'party': { const r = G.toggleParty(S, id); if (!r.ok) toast(t(r.reason)); break; }
    case 'fire': { const a = S.roster.find(x => x.id === id); const g = Math.floor(a.spent * .6 + RARITY[a.rar].price * .25);
      return confirmDlg(t('fire_q', { n: a.name, g: fmt(g), s: a.rar }), () => { const r = G.dismiss(S, id); toast(r.ok ? t('fired', { n: a.name, g: fmt(r.gold), s: r.souls }) : t(r.reason)); if (r.ok) say('mas_fire', 'shy'); save(); }); }
    case 'guild': if (G.upgradeGuild(S).ok) say('mas_guild', 'cheer'); break;
    case 'hire': { const r = G.hire(S, +b.dataset.i); if (r.ok) { toast(t('hired', { n: r.adv.name })); say('mas_hire', 'happy'); } else toast(t(r.reason === 'cap' ? 'cap' : 'need_gold')); break; }
    case 'refresh': { const r = G.buyRefresh(S, Date.now()); if (!r.ok) toast(t('need_gold')); break; }
    case 'summon': { const r = G.summon(S); if (r.ok) { toast(t('hired', { n: r.adv.name })); say('mas_summon', 'cheer'); } else toast(t(r.reason === 'cap' ? 'cap' : 'need_souls')); break; }
    case 'ad-boost': return watch('boost');
    case 'ad-refresh': return watch('refresh');
    case 'ad-souls': return watch('souls');
    case 'prestige': if (!G.canPrestige(S)) return toast(t('prestige_na'));
      return confirmDlg(t('prestige_q'), () => { G.prestige(S); save(); });
    case 'up': { const r = await Sync.upload(S, Date.now(), true); toast(r === 'ok' ? t('cloud_ok') : r === 'newer' ? t('cloud_newer') : t('cloud_err')); break; }
    case 'down': { const raw = prompt(t('cloud_id'), S.cloud.id ? S.cloud.id + S.cloud.key : ''); if (!raw || raw.length !== 64) return;
      const r = await Sync.download(S, raw.slice(0, 32), raw.slice(32));
      if (r.r === 'ok') { S = Object.assign(G.newState(), r.data, { cloud: { id: raw.slice(0, 32), key: raw.slice(32), rev: r.data.rev, at: Date.now() }, pool: [] }); save(); toast(t('cloud_ok')); }
      else toast(t(r.r === 'none' ? 'cloud_none' : 'cloud_err')); break; }
    case 'reset': return confirmDlg(t('reset_q'), () => { localStorage.removeItem(KEY); S = G.newState(); save(); });
  }
  save(); render();
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'lang') { S.set.lang = e.target.value; setLang(S.set.lang); save(); render(); }
  if (e.target.id === 'sync') { S.set.sync = e.target.checked; save(); }
});

/* ---------- loop ---------- */
function tick() {
  const now = Date.now(); const dt = Math.min(2, (now - lastFrame) / 1000); lastFrame = now;
  const before = S.stats.clears, g0 = S.gold, st0 = S.stage;
  const out = G.simulate(S, dt, now);
  if (out.clears && tab === 'quest') floatGold(out.gold / out.clears);
  if (out.events.includes('lord')) toast(t('lord_down'));
  if (out.bosses) say('mas_boss', 'cheer');
  if (tab === 'quest') updateMascot();
  const pg = $('#prog'); if (pg) pg.style.width = (S.progress * 100) + '%';
  if (S.stage !== st0 && tab === 'quest') render(); else { updateHud(); updateAfford(); }
}
function start() {
  S = load() || G.newState(); setLang(S.set.lang);
  const now = Date.now();
  const away = Math.min((now - S.t) / 1000, G.OFFLINE_CAP);
  lastFrame = now;
  let off = null;
  if (away > 60) { const o = G.simulate(S, away, now); if (o.gold > 0 || o.souls > 0) off = { o, away }; }
  render(); save();
  if (off) {
    const body = t('offline_b', { h: dur(off.away), c: off.o.clears, g: fmt(off.o.gold), s: off.o.souls });
    modal(`<img class="mface big" src="art/mascot_face6.webp" alt=""><h3>${t('offline_t')}</h3><p>${t('mas_off')}</p><p>${body}</p>`, [
      { label: t('claim') },
      { label: t('offline_ad') + ' · ' + adLabel('offline'), cls: 'ad', fn: async () => { if (G.adLeft(S, 'offline', Date.now()) <= 0) return toast(t('ad_none')); if (await showRewarded('offline')) { G.adGrant(S, 'offline', Date.now(), off.o); save(); render(); } } },
    ]);
  }
  setInterval(tick, 250);
  setInterval(() => { save(); Sync.upload(S); }, 5000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { save(); Sync.upload(S); } else { lastFrame = Date.now(); } });
  if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !window.Capacitor) navigator.serviceWorker.register('sw.js').catch(() => {});
}
initAdMob().catch(() => {}); start();
