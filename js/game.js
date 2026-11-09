// Pure game logic (no DOM). Runs identically for live ticks and offline catch-up.
import { RARITY, CLASSES, FINAL_STAGE, NAMES_A, NAMES_B } from './data.js';

export const OFFLINE_CAP = 8 * 3600;        // 8h
export const OFFLINE_CAP_AD = 12 * 3600;    // 12h with ad bonus
export const SAVE_VERSION = 1;
const CLS = Object.keys(CLASSES);

export function newState(now = Date.now()) {
  const st = {
    v: SAVE_VERSION, rev: 0, t: now, created: now,
    gold: 60, souls: 5, essence: 0, guildLv: 1,
    stage: 0, progress: 0, best: 0, lordDown: false,
    roster: [], party: [], pool: [], poolAt: 0, nid: 1,
    boostUntil: 0,
    ads: { day: 0, n: {} },
    set: { lang: 'auto', sync: false },
    cloud: { id: '', key: '', rev: 0, at: 0 },
    stats: { clears: 0, bosses: 0, hired: 0, fired: 0, runs: 0 },
    tut: 0,
  };
  for (const c of ['warrior', 'rogue', 'mage']) addAdv(st, makeAdv(st, c, 0));
  st.party = st.roster.map(a => a.id);
  return st;
}

const rnd = (n) => Math.floor(Math.random() * n);
export function makeAdv(st, cls, rar) {
  return {
    id: st.nid++, name: NAMES_A[rnd(NAMES_A.length)] + ' ' + NAMES_B[rnd(NAMES_B.length)],
    cls, rar, lv: 1, seed: (Math.random() * 2 ** 31) | 0, spent: 0,
  };
}
export function addAdv(st, a) { st.roster.push(a); return a; }

/* ---------- formulas ---------- */
export const advPower = (a) => 10 * CLASSES[a.cls].pw * RARITY[a.rar].mul * (1 + 0.15 * (a.lv - 1)) * Math.pow(2, Math.floor(a.lv / 10));
export const enhanceCost = (a) => Math.ceil(20 * Math.pow(1.15, a.lv - 1) * RARITY[a.rar].cost);
export const wage = (a) => 0.04 * RARITY[a.rar].wage * CLASSES[a.cls].up * (1 + 0.04 * a.lv); // gold / sec
export const partySlots = (st) => Math.min(6, 3 + Math.floor(st.guildLv / 2));
export const rosterCap = (st) => 5 + st.guildLv * 2;
export const guildCost = (st) => Math.ceil(150 * Math.pow(2.2, st.guildLv - 1));
export const essenceMul = (st) => 1 + 0.25 * st.essence;
export const isBoss = (s) => s % 10 === 9;
export const enemyPower = (s) => 30 * Math.pow(1.15, s) * (isBoss(s) ? 2.2 : 1);
export const stageGold = (s) => 8 * Math.pow(1.13, s) * (isBoss(s) ? 4 : 1);
export const hirePrice = (st, rar) => Math.ceil(RARITY[rar].price * Math.pow(1.12, st.roster.length));
export const SOUL_SUMMON = 25;
export const REFRESH_COST = (st) => Math.ceil(20 * Math.pow(1.1, st.guildLv));
export const POOL_FREE_MS = 30 * 60 * 1000;
export const BOOST_MS = 10 * 60 * 1000;
export const BOOST_MAX_MS = 30 * 60 * 1000;

export const partyList = (st) => st.party.map(id => st.roster.find(a => a.id === id)).filter(Boolean);
export const partyPower = (st) => partyList(st).reduce((s, a) => s + advPower(a), 0) * essenceMul(st);
export const goldMul = (st, now) =>
  (1 + partyList(st).reduce((s, a) => s + CLASSES[a.cls].gd, 0)) * essenceMul(st) * (st.boostUntil > now ? 2 : 1);
export const wageTotal = (st) => st.roster.reduce((s, a) => s + wage(a), 0);
export const soulChance = (st) => 0.35 + partyList(st).reduce((s, a) => s + CLASSES[a.cls].sl, 0);

/* Which stage is actually being fought. Stalled bosses push the party to farm the previous stage. */
export function fight(st) {
  const s = st.stage, P = partyPower(st);
  if (isBoss(s) && P < 0.7 * enemyPower(s)) return { f: s - 1, adv: false, stalled: true, P };
  return { f: s, adv: true, stalled: false, P };
}
export function clearRate(P, f) { return Math.min(0.5, 0.1 * P / enemyPower(f)); }

/** Advance the world by dt seconds. Returns what happened. */
export function simulate(st, dt, now = Date.now()) {
  const out = { gold: 0, souls: 0, clears: 0, bosses: 0, from: st.stage, to: st.stage, wage: 0, events: [] };
  if (dt <= 0 || !st.party.length) return out;
  const gm = goldMul(st, now);
  let left = dt, guard = 0;
  while (left > 1e-6 && guard++ < 50000) {
    const { f, adv, P } = fight(st);
    if (P <= 0) break;
    const rate = clearRate(P, f);
    const gold = stageGold(f) * gm;
    if (!adv) {
      // farming: batch whole clears
      const total = st.progress + rate * left;
      const n = Math.floor(total);
      st.progress = total - n; left = 0;
      out.gold += n * gold; out.clears += n;
      // re-check: gold from farming may allow growth only via the player, so stop here.
      break;
    }
    const need = (1 - st.progress) / rate;
    if (need > left) { st.progress += rate * left; left = 0; break; }
    left -= need; st.progress = 0;
    out.gold += gold; out.clears++;
    if (isBoss(st.stage)) {
      out.bosses++;
      const n = 1 + Math.floor(st.stage / 30);
      if (Math.random() < soulChance(st)) { out.souls += n; }
      if (st.stage === FINAL_STAGE) { st.lordDown = true; out.events.push('lord'); }
    }
    st.stage++;
    if (st.stage > st.best) st.best = st.stage;
  }
  const w = wageTotal(st) * dt;
  st.gold += out.gold; st.souls += out.souls;
  out.wage = Math.min(w, st.gold);
  st.gold = Math.max(0, st.gold - w);
  st.stats.clears += out.clears; st.stats.bosses += out.bosses;
  out.to = st.stage;
  return out;
}

/* ---------- actions (return {ok, reason}) ---------- */
export function enhance(st, id, times = 1) {
  const a = st.roster.find(x => x.id === id); if (!a) return { ok: false };
  let n = 0;
  while (n < times && a.lv < 300) {
    const c = enhanceCost(a); if (st.gold < c) break;
    st.gold -= c; a.spent += c; a.lv++; n++;
  }
  if (n) st.rev++;
  return { ok: n > 0, n };
}
/** Spend gold on the party, always upgrading the best marginal power/cost member. */
export function enhanceParty(st) {
  let n = 0, guard = 0;
  const ps = partyList(st);
  while (guard++ < 500 && ps.length) {
    let best = null, bv = 0;
    for (const a of ps) {
      const c = enhanceCost(a); if (c > st.gold) continue;
      const p0 = advPower(a); a.lv++; const p1 = advPower(a); a.lv--;
      const v = (p1 - p0) / c;
      if (v > bv) { bv = v; best = a; }
    }
    if (!best) break;
    enhance(st, best.id, 1); n++;
  }
  return n;
}
export function upgradeGuild(st) {
  const c = guildCost(st); if (st.gold < c) return { ok: false };
  st.gold -= c; st.guildLv++; st.rev++; return { ok: true };
}
export function toggleParty(st, id) {
  const i = st.party.indexOf(id);
  if (i >= 0) { st.party.splice(i, 1); st.rev++; return { ok: true }; }
  if (st.party.length >= partySlots(st)) return { ok: false, reason: 'full' };
  st.party.push(id); st.rev++; return { ok: true };
}
export function dismiss(st, id) {
  const i = st.roster.findIndex(a => a.id === id); if (i < 0) return { ok: false };
  if (st.roster.length <= 1) return { ok: false, reason: 'last' };
  const a = st.roster[i];
  const gold = Math.floor(a.spent * 0.6 + RARITY[a.rar].price * 0.25);
  const souls = a.rar; // C0 R1 E2 L3
  st.roster.splice(i, 1);
  st.party = st.party.filter(x => x !== id);
  st.gold += gold; st.souls += souls; st.stats.fired++; st.rev++;
  return { ok: true, gold, souls };
}

function rollRarity(st) {
  const lv = Math.min(st.guildLv, 15) - 1;
  const w = [70 - lv, 24 + lv * 0.5, 5.5 + lv * 0.4, 0.5 + lv * 0.1];
  let r = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < 4; i++) { if ((r -= w[i]) < 0) return i; }
  return 0;
}
export function refreshPool(st, now = Date.now()) {
  st.pool = [0, 1, 2].map(() => {
    const a = makeAdv(st, CLS[rnd(CLS.length)], rollRarity(st));
    a.price = hirePrice(st, a.rar); return a;
  });
  st.poolAt = now; st.rev++;
}
export const poolFree = (st, now) => !st.pool.length || now - st.poolAt >= POOL_FREE_MS;
export function buyRefresh(st, now) {
  if (poolFree(st, now)) { refreshPool(st, now); return { ok: true }; }
  const c = REFRESH_COST(st); if (st.gold < c) return { ok: false };
  st.gold -= c; refreshPool(st, now); return { ok: true };
}
export function hire(st, idx) {
  const a = st.pool[idx]; if (!a) return { ok: false };
  if (st.roster.length >= rosterCap(st)) return { ok: false, reason: 'cap' };
  const price = hirePrice(st, a.rar);
  if (st.gold < price) return { ok: false, reason: 'gold' };
  st.gold -= price; delete a.price; st.pool.splice(idx, 1, null);
  st.pool = st.pool.filter(Boolean);
  addAdv(st, a); st.stats.hired++;
  if (st.party.length < partySlots(st)) st.party.push(a.id);
  st.rev++; return { ok: true, adv: a };
}
export function summon(st) {
  if (st.roster.length >= rosterCap(st)) return { ok: false, reason: 'cap' };
  if (st.souls < SOUL_SUMMON) return { ok: false, reason: 'souls' };
  st.souls -= SOUL_SUMMON;
  const a = makeAdv(st, CLS[rnd(CLS.length)], Math.random() < 0.2 ? 3 : 2);
  addAdv(st, a); if (st.party.length < partySlots(st)) st.party.push(a.id);
  st.stats.hired++; st.rev++; return { ok: true, adv: a };
}

/* ---------- prestige ("Reincarnation") ---------- */
export const canPrestige = (st) => st.lordDown && st.stage > FINAL_STAGE;
export const prestigeGain = (st) => Math.max(1, Math.floor(st.stage / 12));
export function prestige(st, now = Date.now()) {
  if (!canPrestige(st)) return { ok: false };
  const gain = prestigeGain(st);
  const keep = { souls: st.souls, essence: st.essence + gain, set: st.set, cloud: st.cloud, ads: st.ads, stats: st.stats, created: st.created, rev: st.rev + 1 };
  const fresh = newState(now);
  Object.assign(st, fresh, keep); st.stats.runs++; st.tut = 9;
  return { ok: true, gain };
}

/* ---------- ads bookkeeping ---------- */
export const AD_CAPS = { boost: 12, refresh: 10, souls: 5, offline: 4 };
export function adLeft(st, kind, now) {
  const day = Math.floor(now / 86400000);
  if (st.ads.day !== day) { st.ads.day = day; st.ads.n = {}; }
  return AD_CAPS[kind] - (st.ads.n[kind] || 0);
}
export function adGrant(st, kind, now, extra) {
  if (adLeft(st, kind, now) <= 0) return { ok: false };
  st.ads.n[kind] = (st.ads.n[kind] || 0) + 1;
  let res = { ok: true };
  if (kind === 'boost') st.boostUntil = Math.min(Math.max(st.boostUntil, now) + BOOST_MS, now + BOOST_MAX_MS);
  else if (kind === 'refresh') refreshPool(st, now);
  else if (kind === 'souls') { st.souls += 5; res.souls = 5; }
  else if (kind === 'offline' && extra) { st.gold += extra.gold; st.souls += extra.souls; }
  st.rev++; return res;
}
