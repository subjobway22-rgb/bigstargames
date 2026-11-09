// Balance simulation: a player who spends all gold on auto-enhance / guild each minute.
import * as G from '../js/game.js';
const st = G.newState(0); let now = 0;
const log = [];
for (let min = 1; min <= 24 * 60 * 6; min++) {
  now += 60000; st.t = now;
  G.simulate(st, 60, now);
  // greedy policy
  for (let k = 0; k < 20; k++) {
    if (G.upgradeGuild(st).ok) {}
    st.party = [...st.roster].sort((a, b) => G.advPower(b) - G.advPower(a)).slice(0, G.partySlots(st)).map(a => a.id);
    G.enhanceParty(st);
    if (st.roster.length < G.rosterCap(st) && st.pool.length === 0) G.refreshPool(st, now);
    const i = st.pool.findIndex(p => G.hirePrice(st, p.rar) <= st.gold * 0.3);
    if (i >= 0) G.hire(st, i);
  }
  if (min % 720 === 0) log.push(`${(min / 60).toFixed(0)}h stage=${st.stage} gold=${Math.floor(st.gold)} guild=${st.guildLv} P=${G.partyPower(st).toFixed(0)} roster=${st.roster.length}`);
}
console.log(log.join('\n'));
