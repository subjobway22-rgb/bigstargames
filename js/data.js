// Static game data. No network needed.
export const RARITY = [
  { id: 'C', mul: 1.0, cost: 1.0, price: 40,   wage: 1.0, color: '#6b6670' },
  { id: 'R', mul: 1.8, cost: 1.6, price: 170,  wage: 1.8, color: '#5d7fa3' },
  { id: 'E', mul: 3.2, cost: 2.6, price: 900,  wage: 3.2, color: '#8a4fbf' },
  { id: 'L', mul: 6.0, cost: 4.0, price: 4800, wage: 6.0, color: '#c9a13b' },
];

// pw: power mul, gd: bonus gold share, up: wage mul, sl: soul chance bonus
export const CLASSES = {
  warrior: { pw: 1.15, gd: 0.00, up: 1.0, sl: 0.0 },
  rogue:   { pw: 0.90, gd: 0.10, up: 0.9, sl: 0.0 },
  mage:    { pw: 1.35, gd: 0.00, up: 1.3, sl: 0.0 },
  priest:  { pw: 0.85, gd: 0.04, up: 0.6, sl: 0.1 },
  heretic: { pw: 1.00, gd: 0.00, up: 1.0, sl: 0.3 },
};

export const REGIONS = [
  { ko: '변방 폐촌',       en: 'Ruined Frontier',   mon: 'imp',   hue: 0,   boss: { ko: '굶주린 그락', en: 'Grak the Hollow' } },
  { ko: '까마귀 숲',       en: 'Crow Wood',         mon: 'beast', hue: 20,  boss: { ko: '까마귀 마녀 모르웬', en: 'Morwen of Crows' } },
  { ko: '뼈의 늪',         en: 'Bonefen',           mon: 'skel',  hue: 90,  boss: { ko: '늪의 왕 오스크', en: 'Osk, Fen King' } },
  { ko: '침묵의 수도원',   en: 'Silent Abbey',      mon: 'wraith',hue: 200, boss: { ko: '봉인 사제 베일', en: 'Veil the Sealed' } },
  { ko: '재의 광야',       en: 'Ashen Wastes',      mon: 'knight',hue: 30,  boss: { ko: '잿빛 기사 드로그', en: 'Drog Ashbound' } },
  { ko: '핏빛 협곡',       en: 'Bloodscar Gorge',   mon: 'beast', hue: 340, boss: { ko: '협곡의 도살자', en: 'Gorge Butcher' } },
  { ko: '망자의 성채',     en: 'Deadwatch Citadel', mon: 'skel',  hue: 150, boss: { ko: '불침번 장군 카엘', en: 'General Kael Undying' } },
  { ko: '유리 사막',       en: 'Glass Desert',      mon: 'wraith',hue: 260, boss: { ko: '모래눈 세르파', en: 'Serpha Sandeye' } },
  { ko: '얼어붙은 묘역',   en: 'Frozen Necropolis', mon: 'knight',hue: 180, boss: { ko: '서리 리치 이셀', en: 'Ysel the Rimelich' } },
  { ko: '지옥불 관문',     en: 'Hellgate Pass',     mon: 'imp',   hue: 350, boss: { ko: '문지기 바르자크', en: 'Barzak Gatekeeper' } },
  { ko: '심연의 회랑',     en: 'Abyssal Halls',     mon: 'wraith',hue: 280, boss: { ko: '심연의 눈 아자토', en: 'Azath, Eye of Deep' } },
  { ko: '마왕성',          en: "Demon Lord's Keep", mon: 'lord',  hue: 0,   boss: { ko: '마왕 말카르', en: 'Malkhar, Demon Lord' } },
];
export const ABYSS = { ko: '끝없는 심연', en: 'Endless Abyss', mon: 'lord', hue: 300, boss: { ko: '심연 군주', en: 'Abyss Sovereign' } };
export const FINAL_STAGE = REGIONS.length * 10 - 1; // demon lord stage index

export const NAMES_A = ['Maren','Kael','Isolde','Brann','Veyra','Torvin','Sable','Edric','Lyra','Orsk','Nyx','Hale','Mira','Dunstan','Corvin','Selka','Rook','Ysmay','Garrick','Thessa','Ulric','Vesna','Joran','Wren'];
export const NAMES_B = ['Voss','Ashgrave','Thorne','Crowe','Hollow','Blackmere','Gaunt','Rime','Dusk','Mourne','Kestrel','Vane','Ironwake','Pale','Cinder','Marrow'];

export const SKIN = ['#b9a99a','#9a8b80','#cbb9a6','#7f7468','#a58f86','#8d9a8a'];
export const EYE  = ['#ff3b2f','#ffb02e','#9be86a','#b86bff','#5ee0ff','#f4efe0'];
export const CLOAK = {
  warrior: ['#3b2a2a','#5a3a34'],
  rogue:   ['#1f2a2b','#33444a'],
  mage:    ['#2a2140','#463368'],
  priest:  ['#3a3630','#6b6254'],
  heretic: ['#1d2a1f','#33513a'],
};
