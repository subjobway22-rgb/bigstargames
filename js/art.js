// Procedural vector art. Hand-composed parts (hoods, horns, masks, sigils) recombined by seed,
// drawn with flat fills + woodcut-style hatching, so every adventurer is distinct but on-style.
import { SKIN, EYE, CLOAK, RARITY } from './data.js';

function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const hatch = (x, y, w, h, n, col, op = .35) => Array.from({ length: n }, (_, i) =>
  `<line x1="${x + i * w / n}" y1="${y}" x2="${x + i * w / n - h * .35}" y2="${y + h}" stroke="${col}" stroke-opacity="${op}" stroke-width=".9"/>`).join('');

export function portrait(a, size = 96) {
  const r = rng(a.seed), cls = a.cls, rar = RARITY[a.rar];
  const skin = pick(r, SKIN), eye = pick(r, EYE), [c1, c2] = CLOAK[cls];
  const scar = r() < .4, eyeY = 50 + (r() * 2 - 1);
  const ring = rar.color;
  let back = '', front = '', hair = '', face = '';

  // ---- class gear ----
  if (cls === 'warrior') {
    back = `<rect x="70" y="30" width="5" height="70" rx="1" fill="#6d6d76" transform="rotate(14 72 60)"/><rect x="66" y="38" width="13" height="4" fill="#4a3a2a" transform="rotate(14 72 40)"/>`;
    hair = `<path d="M31 47Q30 22 50 20Q70 22 69 47L63 44Q50 37 37 44Z" fill="#4a4a52"/>
      <path d="M31 38Q16 34 14 16Q26 26 34 30Z" fill="#cfc6ad"/><path d="M69 38Q84 34 86 16Q74 26 66 30Z" fill="#cfc6ad"/>
      <rect x="48" y="38" width="4" height="16" fill="#3a3a42"/>${hatch(36, 24, 28, 12, 7, '#000')}`;
  } else if (cls === 'rogue') {
    back = `<path d="M18 112L30 92L34 96L24 114Z" fill="#8a8a92"/>`;
    hair = `<path d="M26 58Q22 18 50 16Q78 18 74 58Q66 40 50 40Q34 40 26 58Z" fill="${c1}"/>
      <ellipse cx="50" cy="48" rx="18" ry="14" fill="#000" opacity=".5"/>`;
    face = `<path d="M33 56Q50 70 67 56L66 66Q50 76 34 66Z" fill="#17171a"/>`; // mask
  } else if (cls === 'mage') {
    back = `<line x1="80" y1="22" x2="80" y2="116" stroke="#4a3a2a" stroke-width="3"/><circle cx="80" cy="18" r="7" fill="${eye}" opacity=".85"/><circle cx="80" cy="18" r="11" fill="none" stroke="${eye}" stroke-opacity=".35"/>`;
    hair = `<path d="M26 42L74 42L58 4Q54 14 60 12Z" fill="${c2}"/><ellipse cx="50" cy="42" rx="30" ry="6" fill="${c1}"/>
      <path d="M30 40Q50 34 70 40" fill="none" stroke="#c9a13b" stroke-width="1.5"/>`;
  } else if (cls === 'priest') {
    hair = `<ellipse cx="50" cy="26" rx="19" ry="5" fill="none" stroke="#c9a13b" stroke-width="2.2" stroke-dasharray="26 5" transform="rotate(-8 50 26)"/>`;
    face = `<rect x="31" y="44" width="38" height="9" fill="#14110f"/><path d="M45 44L55 53M55 44L45 53" stroke="#8c1d2b" stroke-width="1.4"/>
      <path d="M40 54Q39 62 41 66" stroke="${eye}" stroke-width="1.3" fill="none" opacity=".9"/>`;
    front = `<line x1="24" y1="96" x2="24" y2="118" stroke="#8a7a52" stroke-width="1.2"/><circle cx="24" cy="94" r="5" fill="#4a3a1a" stroke="#c9a13b"/>`;
  } else { // heretic
    back = `<path d="M30 40Q16 30 18 10M22 28L12 24M30 40Q20 44 10 40M70 40Q84 30 82 10M78 28L88 24M70 40Q80 44 90 40" stroke="#cfc6ad" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    hair = `<ellipse cx="50" cy="50" rx="17" ry="21" fill="#cfc6ad"/>${hatch(36, 34, 28, 30, 8, '#000', .12)}`;
    face = `<ellipse cx="42" cy="50" rx="4.5" ry="5.5" fill="#0c0c0d"/><ellipse cx="58" cy="50" rx="4.5" ry="5.5" fill="#0c0c0d"/>
      <circle cx="42" cy="51" r="1.8" fill="${eye}"/><circle cx="58" cy="51" r="1.8" fill="${eye}"/>
      <path d="M50 56L47 62H53Z" fill="#0c0c0d"/><path d="M40 66H60M43 64V69M47 64V70M53 64V70M57 64V69" stroke="#0c0c0d" stroke-width="1.2"/>`;
  }
  // ---- head & eyes (not for skull/priest-band cases) ----
  const showEyes = cls !== 'heretic' && cls !== 'priest';
  const head = cls === 'heretic' ? '' : `<ellipse cx="50" cy="50" rx="17" ry="21" fill="${skin}"/>${hatch(36, 56, 14, 12, 4, '#000', .22)}${hatch(56, 56, 14, 12, 4, '#000', .22)}`;
  const eyes = showEyes ? `<path d="M38 ${eyeY}l8 2" stroke="#0c0c0d" stroke-width="2.2"/><path d="M62 ${eyeY}l-8 2" stroke="#0c0c0d" stroke-width="2.2"/>
    <circle cx="42" cy="${eyeY + 2}" r="1.7" fill="${eye}"/><circle cx="58" cy="${eyeY + 2}" r="1.7" fill="${eye}"/>
    <circle cx="42" cy="${eyeY + 2}" r="4" fill="${eye}" opacity=".18"/><circle cx="58" cy="${eyeY + 2}" r="4" fill="${eye}" opacity=".18"/>` : '';
  const scarSvg = scar && cls !== 'heretic' ? `<path d="M56 40L62 62M58 48l5 -1M59 54l5 -1" stroke="#5a1f24" stroke-width="1.2" fill="none"/>` : '';
  // ---- body ----
  const body = `<path d="M10 120Q12 80 50 74Q88 80 90 120Z" fill="${c1}"/>
    <path d="M50 74Q30 84 28 120H38Q42 90 50 84Q58 90 62 120H72Q70 84 50 74Z" fill="${c2}"/>
    ${hatch(14, 90, 70, 28, 14, '#000', .28)}
    <rect x="43" y="66" width="14" height="12" fill="${skin}"/><path d="M43 74Q50 80 57 74" fill="#000" opacity=".4"/>`;
  const sigil = `<g transform="translate(50 100)" stroke="${rar.color}" fill="none" stroke-width="1.1" opacity=".85"><circle r="6"/><path d="M0 -8V8M-7 -3L7 3M7 -3L-7 3"/></g>`;
  // ---- rarity ornaments ----
  const ticks = Array.from({ length: 12 }, (_, i) => `<line x1="50" y1="2" x2="50" y2="${a.rar > 1 ? 7 : 5}" transform="rotate(${i * 30} 50 60)"/>`).join('');
  const third = a.rar === 3 ? `<path d="M44 38Q50 33 56 38Q50 43 44 38Z" fill="#14110f" stroke="${rar.color}" stroke-width=".8"/><circle cx="50" cy="38" r="1.6" fill="#ff3b2f"/>` : '';
  const bg = `<defs><radialGradient id="g${a.id}" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="${a.rar ? rar.color : '#2c2832'}" stop-opacity="${a.rar ? .35 : 1}"/><stop offset="1" stop-color="#0e0c11"/></radialGradient></defs>
    <rect width="100" height="120" rx="8" fill="url(#g${a.id})"/>
    <g stroke="${ring}" stroke-opacity=".7" fill="none"><circle cx="50" cy="60" r="${54}" stroke-width="${a.rar > 1 ? 1.6 : .8}"/>${ticks}</g>`;
  return `<svg class="portrait" viewBox="0 0 100 120" width="${size}" height="${size * 1.2}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${a.name}">
    <clipPath id="c${a.id}"><rect width="100" height="120" rx="8"/></clipPath><g clip-path="url(#c${a.id})">
    ${bg}${back}${body}${sigil}${head}${scarSvg}${face}${eyes}${hair}${third}${front}</g>
    <rect width="100" height="120" rx="8" fill="none" stroke="${ring}" stroke-width="2"/></svg>`;
}

/* ---------------- Enemies ---------------- */
const E = {
  imp: (c) => `<path d="M20 60Q4 40 6 20Q26 30 38 46ZM100 60Q116 40 114 20Q94 30 82 46Z" fill="${c.d}"/>
    <ellipse cx="60" cy="78" rx="26" ry="28" fill="${c.m}"/><circle cx="60" cy="46" r="20" fill="${c.m}"/>
    <path d="M44 34Q38 14 30 12Q34 28 40 40ZM76 34Q82 14 90 12Q86 28 80 40Z" fill="#cfc6ad"/>
    <path d="M48 46l8 3M72 46l-8 3" stroke="#000" stroke-width="3"/><circle cx="51" cy="49" r="2.4" fill="${c.e}"/><circle cx="69" cy="49" r="2.4" fill="${c.e}"/>
    <path d="M50 58Q60 66 70 58L68 64L64 60L60 66L56 60L52 64Z" fill="#e8e0cc"/>`,
  skel: (c) => `<ellipse cx="60" cy="40" rx="20" ry="22" fill="#d8cfb8"/><rect x="48" y="56" width="24" height="12" fill="#d8cfb8"/>
    <ellipse cx="52" cy="40" rx="6" ry="7" fill="#0c0c0d"/><ellipse cx="68" cy="40" rx="6" ry="7" fill="#0c0c0d"/>
    <circle cx="52" cy="41" r="2" fill="${c.e}"/><circle cx="68" cy="41" r="2" fill="${c.e}"/><path d="M60 46L57 53H63Z" fill="#0c0c0d"/>
    <path d="M50 62H70M52 60V68M58 60V68M64 60V68M70 60V68" stroke="#0c0c0d" stroke-width="1.5"/>
    <path d="M60 70V112M40 78Q60 74 80 78M42 88Q60 84 78 88M45 98Q60 94 75 98" stroke="#d8cfb8" stroke-width="4" fill="none"/>
    <rect x="86" y="50" width="6" height="56" fill="#6d6d76"/><rect x="82" y="66" width="14" height="4" fill="${c.d}"/>`,
  wraith: (c) => `<path d="M60 12Q96 20 96 60L102 112L88 100L80 114L68 100L56 116L44 100L32 112L22 100L26 60Q24 20 60 12Z" fill="${c.m}" opacity=".92"/>
    <path d="M60 22Q84 28 84 56Q84 70 60 74Q36 70 36 56Q36 28 60 22Z" fill="#050507"/>
    <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="${c.e}"/><ellipse cx="70" cy="52" rx="5" ry="3.5" fill="${c.e}"/>
    <path d="M48 64Q60 72 72 64" stroke="${c.e}" stroke-width="1.5" fill="none" opacity=".7"/>
    <path d="M30 70Q20 84 24 98M90 70Q100 84 96 98" stroke="${c.d}" stroke-width="3" fill="none"/>`,
  beast: (c) => `<path d="M8 104Q10 60 44 50L50 30L58 46Q90 42 110 66L104 74L106 108Z" fill="${c.m}"/>
    <path d="M44 50L40 26L56 44ZM64 46L72 24L78 50Z" fill="${c.d}"/>
    <path d="M18 74L52 78L44 92L22 88Z" fill="#0c0c0d"/><path d="M22 74L26 82L30 75L34 83L38 76L42 84L46 77L50 83" fill="#e8e0cc"/>
    <path d="M60 54l10 4" stroke="#000" stroke-width="3"/><circle cx="66" cy="57" r="2.6" fill="${c.e}"/>
    ${hatch(60, 70, 40, 30, 10, '#000', .35)}`,
  knight: (c) => `<path d="M30 112L34 62Q60 50 86 62L90 112Z" fill="${c.m}"/><path d="M60 62V112" stroke="#000" stroke-opacity=".5" stroke-width="2"/>
    <path d="M42 56Q40 22 60 18Q80 22 78 56Z" fill="#55555e"/><path d="M42 34Q22 30 18 8Q36 14 44 26ZM78 34Q98 30 102 8Q84 14 76 26Z" fill="#cfc6ad"/>
    <rect x="46" y="40" width="28" height="5" fill="#050507"/><rect x="48" y="41" width="24" height="3" fill="${c.e}"/>
    <rect x="94" y="30" width="6" height="84" fill="#6d6d76"/><path d="M88 52H106" stroke="${c.d}" stroke-width="5"/>
    <ellipse cx="26" cy="72" rx="12" ry="22" fill="${c.d}"/>`,
  lord: (c) => `<path d="M10 116Q12 60 60 52Q108 60 110 116Z" fill="${c.d}"/>
    <path d="M30 50Q4 38 6 4Q20 24 38 34ZM90 50Q116 38 114 4Q100 24 82 34ZM44 30Q38 4 48 0Q50 18 54 28ZM76 30Q82 4 72 0Q70 18 66 28Z" fill="#cfc6ad"/>
    <ellipse cx="60" cy="44" rx="24" ry="26" fill="${c.m}"/>
    <path d="M42 38l10 3M78 38l-10 3M46 52l7 2M74 52l-7 2" stroke="#000" stroke-width="3"/>
    <circle cx="48" cy="41" r="2.6" fill="${c.e}"/><circle cx="72" cy="41" r="2.6" fill="${c.e}"/><circle cx="50" cy="54" r="2" fill="${c.e}"/><circle cx="70" cy="54" r="2" fill="${c.e}"/>
    <path d="M44 66Q60 78 76 66L72 72L68 68L64 76L60 68L56 76L52 68L48 72Z" fill="#e8e0cc"/>
    <path d="M60 86v22M52 92h16" stroke="${c.e}" stroke-width="2.2" opacity=".8"/>`,
};
const PAL = { m: '#5b2a30', d: '#2c1418', e: '#ff3b2f' };

export function enemy(type, hue, boss) {
  const fn = E[type] || E.imp;
  const aura = boss ? `<circle cx="60" cy="64" r="56" fill="none" stroke="#8c1d2b" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 6"/>` : '';
  return `<svg class="enemy ${boss ? 'boss' : ''}" viewBox="-6 -6 132 132" xmlns="http://www.w3.org/2000/svg" style="filter:hue-rotate(${hue}deg)">${aura}${fn(PAL)}</svg>`;
}

export function scene(regionIdx) {
  const t = regionIdx % 12;
  const trees = Array.from({ length: 7 }, (_, i) => { const x = 20 + i * 52 + (t * 13 % 17), h = 50 + (i * 37 + t * 11) % 40;
    return `<path d="M${x} 150L${x - 6} ${150 - h}L${x - 2} ${150 - h}L${x - 9} ${150 - h * .6}L${x + 9} ${150 - h * .6}L${x + 2} ${150 - h}L${x + 6} ${150 - h}Z" fill="#0b0a0d" opacity="${.5 + (i % 3) * .15}"/>`; }).join('');
  return `<svg class="bgscene" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16101a"/><stop offset=".7" stop-color="#3a1a22"/><stop offset="1" stop-color="#1a1214"/></linearGradient></defs>
    <rect width="360" height="200" fill="url(#sk)" style="filter:hue-rotate(${t * 28}deg)"/>
    <circle cx="270" cy="50" r="26" fill="#d8cfb8" opacity=".75"/><circle cx="280" cy="44" r="24" fill="#16101a" opacity=".55"/>
    ${trees}<rect y="150" width="360" height="50" fill="#0b0a0d"/><path d="M0 150Q90 140 180 152T360 148V160H0Z" fill="#17131a"/></svg>`;
}
