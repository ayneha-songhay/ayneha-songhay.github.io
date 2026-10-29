/* AYNEHA Horloge 2.0 - horloge, calendrier grégorien et lunaire songhay.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Même code que l'application Android AYNEHA Horloge 2.0 (page assets/index.html),
   adapté au site : classes préfixées hz-, police Ayneha Pro du site. */
(function(){
"use strict";
const ROOT = document.getElementById('hz');
if (!ROOT) return;
// Feuille de style de l'horloge (chemin relatif à ce script, valable en FR et en EN).
(function(){
  const s = document.currentScript || [...document.scripts].find(x => /horloge-page\.js/.test(x.src));
  if (s && !document.getElementById('hzCss')) {
    const l = document.createElement('link'); l.id = 'hzCss'; l.rel = 'stylesheet';
    l.href = s.src.replace(/js\/horloge-page\.js.*$/, 'css/horloge.css'); document.head.appendChild(l);
  }
})();

/* =====================================================================
   RÉGLAGES DU CALENDRIER (à confirmer par Maïgus)
   ===================================================================== */
// Année songhay lunaire = année de l'Hégire + 2577 (calée sur les dates de
// référence : 15 juillet 2025 = 19e jour du 1er mois 4024).
const LUNAR_YEAR_OFFSET = 2577;
// Année affichée sur la ligne grégorienne = année grégorienne + 2001
// (convention de la version 1.1, en attente de confirmation).
const GREG_YEAR_OFFSET = 2001;
// Premier jour de la semaine : samedi (duhãtedji) ; dernier : vendredi (zĩbuza).
// (0 = dimanche ... 6 = samedi)
const WEEK_START = 6;
// Jours chômés : samedi et vendredi.
const OFF_DAYS = [6, 5];
// Gao : sert au calcul du coucher du soleil (le jour lunaire change au coucher).
const GAO_LAT = 16.2666, GAO_LON = -0.0447;

/* =====================================================================
   GLYPHES AYNEHA (Plan 16, police ayneha_pro.ttf)
   g("8B 9C") -> U+10FF8B U+10FF9C
   ===================================================================== */
const g = s => s.split(' ').map(b => String.fromCodePoint(0x10FF00 + parseInt(b,16))).join('');
const DIG = ['7C','7D','7E','7F','80','81','82','83','84','85'].map(g);

const LBL = {
  guuru: g('98 AB 8F A0'),   // guuru (heure)
  han:   g('9A 9C BC'),      // han (jour)
  hadu:  g('9A A2 8B A0'),   // hãdu (mois)
  hado:  g('9A A2 8B 9F'),   // hãdo (lune)
  jiiri: g('94 A6 8F 9E')    // jiiri (année)
};

// Jours de la semaine, index 0 = dimanche (ordre de JavaScript getDay()) :
// fahãtedji, mahãtedji, bohãtedji, woyhãtedji, tohãtedji, zĩbuza, duhãtedji.
const DAYS_FULL = [
  '89 9C 9A A2 8C 9D 95 9E', '88 9C 9A A2 8C 9D 95 9E', '86 9F 9A A2 8C 9D 95 9E',
  '8A 9F CC 9A A2 8C 9D 95 9E', '8C 9F 9A A2 8C 9D 95 9E', '91 A7 86 A0 91 9C',
  '8B A0 9A A2 8C 9D 95 9E'
].map(g);
const DAYS_SHORT = ['89 9C 9A','88 9C 9A','86 9F 9A','8A 9F CC','8C 9F 9A','91 A7 86','8B A0 9A'].map(g);

// Les 12 mois songhay (lunaires), index 0 = 1er mois du jiiri :
// dadaw-beeri, dadaw-kayna, gaani, gaani-bãda, bĩkuna, bĩbina, woyzena,
// cekɔnna, meehaw, meefeeri, hunãzam, cibsi.
const LUNAR_MONTHS = [
  '8B 9C 8B 9C B6 86 A3 8F 9E', '8B 9C 8B 9C B6 99 9C CC 8D 9C', '98 A1 8D 9E',
  '98 A1 8D 9E 86 A2 8B 9C', '86 A7 99 A0 8D 9C', '86 A7 86 9E 8D 9C',
  '8A 9F CC 91 9D 8D 9C', '93 9D 99 AA BB 9C', '88 A3 9A 9C B6',
  '88 A3 89 A3 8F 9E', '9A A0 8D A2 91 9C B2', '93 9E AE 90 9E'
].map(g);

// Jours fériés (liste PROVISOIRE à valider par Maïgus ; noms songhay à fournir).
// Grégoriens : [mois, jour]. Lunaires : [mois lunaire, jour lunaire].
// Fêtes d'indépendance des pays où vit une communauté songhay établie
// depuis des siècles (dates grégoriennes) : [mois, jour, code, nom].
const INDEP = [
  [1,1,'SD','Soudan'], [3,6,'GH','Ghana'], [4,27,'TG','Togo'], [7,5,'DZ','Algérie'],
  [8,1,'BJ','Bénin'], [8,3,'NE','Niger'], [8,5,'BF','Burkina Faso'], [8,7,'CI',"Côte d'Ivoire"],
  [8,11,'TD','Tchad'], [9,22,'ML','Mali'], [10,1,'NG','Nigeria'], [11,18,'MA','Maroc']
];

/* =====================================================================
   MOTEUR D'AFFICHAGE RTL
   Le texte reste dans l'ordre logique ; chaque glyphe devient une case,
   et le navigateur place la première case à droite. Aucune inversion.
   ===================================================================== */
function ay(text){
  const box = document.createElement('span');
  box.className = 'hz-ay';
  for (const ch of text) {
    const s = document.createElement('span');
    if (ch === ':' || ch === '.' || ch === ' ') { s.className = 'hz-sep'; s.textContent = ch === ' ' ? ' ' : ch; }
    else s.textContent = ch;
    box.appendChild(s);
  }
  return box;
}
function put(el, text){ el.replaceChildren(ay(text)); }
const num = n => String(n).split('').map(c => DIG[+c]).join('');
const num2 = n => num(String(n).padStart(2,'0'));

/* =====================================================================
   CALENDRIER LUNAIRE, CALÉ SUR LA VRAIE LUNE
   Chaque mois commence le soir où le premier croissant de lune est
   visible à l'oeil nu depuis Gao (critère astronomique d'Odeh, 2004).
   Ce soir-là, au coucher du soleil, commence le 1er jour du mois.
   Les débuts de mois de 1979 à 2106 sont précalculés (éphémérides) et
   rangés dans MOIS_LUNE : 1 bit par mois, 1 = mois de 30 jours,
   0 = mois de 29 jours. En dehors de cette période : cycle arithmétique.
   ===================================================================== */
const MOIS_LUNE = {jd0: 2444198.5, y0: 1400, n: 1572,
  hex: 'cab64b725752ba95b4ab5956caae536c9ad4b6a96d4aea56d2ad555aa5b52ba93b49ba55aaab5556a9754b6a5ad2aea56d26e936c96d52d695b4aba4bb25b92baa5ad2aea575276956caae52ec96e4aea56d2ad655b25b92ba95b4aba55acab653749764b725754b6a56d2ae956aa6d52ba95d49da4dd2ab5556a9754baa5b52b695752b6936ca76536a96b4aba4bd25d92da95b52b6957527a93b49b6536a9b64b6a5754b5a56d2ad92dc95d4ada55aaab653749764bb25b52baa5ad2ae9574ab5935c95'};
const ISL_EPOCH = 1948439.5;
function gregToJd(y,m,d){ return Date.UTC(y,m-1,d)/86400000 + 2440587.5; }
function islToJdA(y,m,d){
  return d + Math.ceil(29.5*(m-1)) + (y-1)*354 + Math.floor((3+11*y)/30) + ISL_EPOCH - 1;
}
function jdToIslA(jd){
  jd = Math.floor(jd) + 0.5;
  const y = Math.floor((30*(jd - ISL_EPOCH) + 10646) / 10631);
  const m = Math.min(12, Math.ceil((jd - (29 + islToJdA(y,1,1))) / 29.5) + 1);
  const d = jd - islToJdA(y,m,1) + 1;
  return {y, m, d};
}
// MOIS_DEBUT[i] = jour julien du 1er jour du i-ème mois du tableau.
const MOIS_DEBUT = (function(){
  const t = [MOIS_LUNE.jd0];
  for (let i = 0; i < MOIS_LUNE.n; i++) {
    const bit = (parseInt(MOIS_LUNE.hex[i >> 2], 16) >> (3 - (i & 3))) & 1;
    t.push(t[i] + (bit ? 30 : 29));
  }
  return t;
})();
function islToJd(y,m,d){
  const i = (y - MOIS_LUNE.y0)*12 + (m - 1);
  if (i >= 0 && i <= MOIS_LUNE.n) return MOIS_DEBUT[i] + d - 1;
  return islToJdA(y,m,d);
}
function jdToIsl(jd){
  jd = Math.floor(jd) + 0.5;
  if (jd < MOIS_DEBUT[0] || jd >= MOIS_DEBUT[MOIS_LUNE.n]) return jdToIslA(jd);
  let lo = 0, hi = MOIS_LUNE.n - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (MOIS_DEBUT[mid] <= jd) lo = mid; else hi = mid - 1; }
  return {y: MOIS_LUNE.y0 + Math.floor(lo/12), m: lo % 12 + 1, d: jd - MOIS_DEBUT[lo] + 1};
}
// Date lunaire du jour (de jour) correspondant à une date grégorienne.
function lunarOf(y,m,d){
  const r = jdToIsl(gregToJd(y,m,d) - adjust());
  return {d:r.d, m:r.m, y:r.y + LUNAR_YEAR_OFFSET};
}

/* Coucher du soleil à Gao (équation du lever/coucher, précision ~1 min). */
function sunsetMs(y,m,d){
  const rad = Math.PI/180;
  // n = nombre de jours depuis le 1er janvier 2000 à midi (jour local à Gao).
  const n = Math.round(gregToJd(y,m,d) + 0.5 - 2451545.0);
  const Js = n - GAO_LON/360;
  const M = (357.5291 + 0.98560028*Js) % 360;
  const C = 1.9148*Math.sin(M*rad) + 0.02*Math.sin(2*M*rad) + 0.0003*Math.sin(3*M*rad);
  const L = (M + C + 180 + 102.9372) % 360;
  const Jt = 2451545.0 + Js + 0.0053*Math.sin(M*rad) - 0.0069*Math.sin(2*L*rad);
  const dec = Math.asin(Math.sin(L*rad)*Math.sin(23.4397*rad));
  const cw = (Math.sin(-0.833*rad) - Math.sin(GAO_LAT*rad)*Math.sin(dec)) / (Math.cos(GAO_LAT*rad)*Math.cos(dec));
  const w = Math.acos(Math.max(-1, Math.min(1, cw))) / rad;
  return (Jt + w/360 - 2440587.5) * 86400000;
}
// Date lunaire « maintenant » : après le coucher du soleil, c'est déjà le jour suivant.
function lunarNow(now){
  const y = now.getFullYear(), m = now.getMonth()+1, d = now.getDate();
  if (now.getTime() >= sunsetMs(y,m,d)) {
    const t = new Date(y, m-1, d+1);
    return lunarOf(t.getFullYear(), t.getMonth()+1, t.getDate());
  }
  return lunarOf(y,m,d);
}

/* Âge de la lune (jours depuis la nouvelle lune) pour le dessin de hãdo. */
function moonAge(date){
  const jd = date.getTime()/86400000 + 2440587.5;
  const syn = 29.530588853;
  let a = (jd - 2451550.26) % syn;
  if (a < 0) a += syn;
  return a;
}
function drawMoon(svg, date){
  const p = moonAge(date) / 29.530588853;     // 0 = nouvelle lune, 0,5 = pleine lune
  const r = 44, cx = 50, cy = 50;
  const k = Math.cos(2*Math.PI*p);
  const rx = Math.abs(k) * r;
  const waxing = p < 0.5;
  const outer = waxing ? 1 : 0;
  const inner = waxing ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);
  const lit = `M ${cx} ${cy-r} A ${r} ${r} 0 0 ${outer} ${cx} ${cy+r} A ${rx} ${r} 0 0 ${inner} ${cx} ${cy-r} Z`;
  svg.innerHTML =
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--moon-dark)" stroke="rgba(243,236,224,0.25)" stroke-width="1.5"/>` +
    `<path d="${lit}" fill="var(--moon-lit)"/>`;
}

// Noms des pays en anglais (page EN du site).
const PAYS_EN = {SD:'Sudan', DZ:'Algeria', BJ:'Benin', TD:'Chad', MA:'Morocco'};
const EN = (document.documentElement.lang || '').startsWith('en');
/* Fêtes d'indépendance du jour (liste vide s'il n'y en a pas). */
function fetesDu(m,d){ return INDEP.filter(f => f[0]===m && f[1]===d); }
function isFete(y,m,d){ return fetesDu(m,d).length > 0; }

/* Drapeaux dessinés (SVG 30 x 20), lisibles sans aucun texte. */
function etoile(cx, cy, r, fill){
  let p = '';
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI/2 + i*Math.PI/5, rr = i % 2 ? r*0.382 : r;
    p += (i ? 'L' : 'M') + (cx + rr*Math.cos(a)).toFixed(2) + ' ' + (cy + rr*Math.sin(a)).toFixed(2);
  }
  return `<path d="${p}Z" fill="${fill}"/>`;
}
const R = (x,y,w,h,c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const V3 = (a,b,c) => R(0,0,10,20,a) + R(10,0,10,20,b) + R(20,0,10,20,c);
const H3 = (a,b,c) => R(0,0,30,6.67,a) + R(0,6.67,30,6.67,b) + R(0,13.33,30,6.67,c);
const DRAPEAUX = {
  ML: V3('#14B53A','#FCD116','#CE1126'),
  CI: V3('#F77F00','#FFFFFF','#009E60'),
  TD: V3('#002664','#FECB00','#C60C30'),
  NG: V3('#008751','#FFFFFF','#008751'),
  NE: H3('#E05206','#FFFFFF','#0DB02B') + '<circle cx="15" cy="10" r="2.6" fill="#E05206"/>',
  GH: H3('#CE1126','#FCD116','#006B3F') + etoile(15, 10.4, 3.2, '#000000'),
  BF: R(0,0,30,10,'#EF2B2D') + R(0,10,30,10,'#009E49') + etoile(15, 10.4, 3.4, '#FCD116'),
  BJ: R(0,0,12,20,'#008751') + R(12,0,18,10,'#FCD116') + R(12,10,18,10,'#E8112D'),
  TG: R(0,0,30,20,'#006A4E') + R(0,4,30,4,'#FFCE00') + R(0,12,30,4,'#FFCE00') + R(0,0,12,12,'#D21034') + etoile(6, 6.4, 3.4, '#FFFFFF'),
  SD: H3('#D21034','#FFFFFF','#000000') + '<path d="M0 0L11 10L0 20Z" fill="#007229"/>',
  DZ: R(0,0,15,20,'#006633') + R(15,0,15,20,'#FFFFFF') + '<path d="M19.11 7.15A5 5 0 1 0 19.11 12.85A4 4 0 1 1 19.11 7.15Z" fill="#D21034"/>' + etoile(17.6, 10, 2.1, '#D21034'),
  MA: R(0,0,30,20,'#C1272D') + '<path d="M15 5.6L17.6 13.6L10.8 8.6H19.2L12.4 13.6Z" fill="none" stroke="#006233" stroke-width="0.9" stroke-linejoin="round"/>'
};
function drapeau(code){
  return `<svg class="hz-flag" viewBox="0 0 30 20" aria-hidden="true">${DRAPEAUX[code]}</svg>`;
}

/* =====================================================================
   PONT AVEC L'APPLICATION ANDROID (absent sur le site)
   ===================================================================== */
const App = null; // sur le site : pas de pont Android (l'application AYNEHA Home a le sien)

let adjustValue = 0;
try { adjustValue = parseInt(localStorage.getItem('lunarAdjust') || '0', 10) || 0; } catch(e) {}
if (App && App.getLunarAdjust) { try { adjustValue = App.getLunarAdjust(); } catch(e) {} }
function adjust(){ return adjustValue; }
function setAdjust(v){
  adjustValue = Math.max(-2, Math.min(2, v));
  try { localStorage.setItem('lunarAdjust', String(adjustValue)); } catch(e) {}
  if (App && App.setLunarAdjust) { try { App.setLunarAdjust(adjustValue); } catch(e) {} }
}

/* =====================================================================
   AFFICHAGE
   ===================================================================== */
const $ = id => document.getElementById(id);
put($('lblGuuru'), LBL.guuru);
put($('lblHan'), LBL.han);
put($('lblHado'), LBL.hado);
put($('lblHadu'), LBL.hadu);
put($('lblJiiri'), LBL.jiiri);
put($('adjLbl'), LBL.hadu);

function timeText(now, withSeconds){
  let t = num2(now.getHours()) + ':' + num2(now.getMinutes());
  if (withSeconds) t += ':' + num2(now.getSeconds());
  return t;
}
// Ordre songhay : mois, puis jour, puis année (le mois se lit en premier, à droite).
function lunarText(l){ return LUNAR_MONTHS[l.m-1] + ' ' + num(l.d); }
function gregText(y,m,d){ return num2(m) + '/' + num2(d) + '/' + num(y + GREG_YEAR_OFFSET); }
// « Mardi 15 » : nom du jour, puis numéro du jour.
function dayNumText(dow, d){ return DAYS_FULL[dow] + ' ' + num(d); }

/* --- Cadran à aiguilles --- */
const dial = $('dial');
(function buildDial(){
  let s = '<circle cx="100" cy="100" r="94" fill="var(--night-700)" stroke="var(--line)" stroke-width="2"/>';
  for (let i = 0; i < 60; i++) {
    const a = i * 6 * Math.PI/180, r1 = i % 5 ? 86 : 82;
    s += `<line x1="${100+r1*Math.sin(a)}" y1="${100-r1*Math.cos(a)}" x2="${100+90*Math.sin(a)}" y2="${100-90*Math.cos(a)}" stroke="${i%5?'rgba(243,236,224,0.25)':'var(--ink-dim)'}" stroke-width="${i%5?1:2}"/>`;
  }
  dial.innerHTML = s + '<g id="dialNums"></g><g id="dialHands"></g>';
  const nums = dial.querySelector('#dialNums');
  for (let h = 1; h <= 12; h++) {
    const a = h * 30 * Math.PI/180;
    // Les nombres à 2 chiffres sont posés glyphe par glyphe, de droite à gauche.
    const glyphs = [...num(h)];
    const x0 = 100 + 66*Math.sin(a), y0 = 100 - 66*Math.cos(a) + 6;
    const w = 11;
    glyphs.forEach((ch, i) => {
      const x = x0 + (glyphs.length - 1) * w/2 - i * w;
      const t = document.createElementNS('http://www.w3.org/2000/svg','text');
      t.setAttribute('x', x); t.setAttribute('y', y0);
      t.setAttribute('text-anchor','middle'); t.setAttribute('font-size','17');
      t.textContent = ch;
      nums.appendChild(t);
    });
  }
})();
function drawHands(now){
  const h = now.getHours() % 12, m = now.getMinutes(), s = now.getSeconds();
  const hand = (deg, len, w, col) => {
    const a = deg*Math.PI/180;
    return `<line x1="100" y1="100" x2="${100+len*Math.sin(a)}" y2="${100-len*Math.cos(a)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  dial.querySelector('#dialHands').innerHTML =
    hand((h + m/60)*30, 44, 6, 'var(--ink)') +
    hand((m + s/60)*6, 64, 4, 'var(--ink)') +
    hand(s*6, 72, 1.6, 'var(--orange)') +
    '<circle cx="100" cy="100" r="5" fill="var(--orange)"/>';
}

/* --- Infos du jour --- */
let lastDayKey = '', lastLunarKey = '';
function tick(){
  const now = new Date();
  put($('clock'), timeText(now, true));
  if (ROOT.classList.contains('hz-dial-mode')) drawHands(now);

  const dayKey = now.toDateString();
  const lun = lunarNow(now);
  const lunarKey = lun.y + '-' + lun.m + '-' + lun.d + '/' + adjust();
  if (dayKey !== lastDayKey || lunarKey !== lastLunarKey) {
    // Changement de jour (minuit) ou de jour lunaire (coucher du soleil).
    const dayChanged = dayKey !== lastDayKey;
    lastDayKey = dayKey; lastLunarKey = lunarKey;
    renderToday(now, lun);
    if (dayChanged) setViewToToday();
    renderCalendar();
  }
  if ($('night').classList.contains('hz-open')) renderNight(now, lun);
}
function renderToday(now, lun){
  put($('dayName'), DAYS_FULL[now.getDay()]);
  drawMoon($('moonToday'), now);
  $('lunarDate').replaceChildren(ay(LUNAR_MONTHS[lun.m-1]), ay(num(lun.d)));
  put($('lunarYear'), num(lun.y));
  put($('gregDate'), gregText(now.getFullYear(), now.getMonth()+1, now.getDate()));
}

/* --- Calendrier (mois lunaire songhay ; jours grégoriens en petit) --- */
// viewY / viewM = année et mois lunaires affichés (année de calcul, sans +2577).
let viewY, viewM, selectedKey = '';
function jdToGreg(jd){
  const d = new Date(Math.round((jd - 2440587.5) * 86400000));
  return {y:d.getUTCFullYear(), m:d.getUTCMonth()+1, d:d.getUTCDate()};
}
function lunarMonthSpan(y, m){
  const start = islToJd(y, m, 1) + adjust();
  const next = (m === 12 ? islToJd(y+1, 1, 1) : islToJd(y, m+1, 1)) + adjust();
  return {start, len: Math.round(next - start)};
}
function setViewToToday(){
  const n = new Date();
  const r = jdToIsl(gregToJd(n.getFullYear(), n.getMonth()+1, n.getDate()) - adjust());
  viewY = r.y; viewM = r.m;
}
function renderCalendar(){
  const now = new Date();
  const span = lunarMonthSpan(viewY, viewM);
  const t = jdToIsl(gregToJd(now.getFullYear(), now.getMonth()+1, now.getDate()) - adjust());
  $('btnToday').classList.toggle('hz-idle', t.y === viewY && t.m === viewM && !selectedKey);

  // Titre : le mois lunaire songhay et son jiiri.
  $('calGreg').replaceChildren(ay(LUNAR_MONTHS[viewM-1]), ay(' ' + num(viewY + LUNAR_YEAR_OFFSET)));

  // Sous-titre : les mois grégoriens qui chevauchent ce mois lunaire.
  const g0 = jdToGreg(span.start), g1 = jdToGreg(span.start + span.len - 1);
  const cl = $('calLunar');
  cl.replaceChildren();
  let gy = g0.y, gm = g0.m;
  while (true) {
    if (cl.childNodes.length) { const d = document.createElement('span'); d.className = 'hz-dot'; d.textContent = '|'; cl.appendChild(d); }
    cl.appendChild(ay(num2(gm) + '/' + num(gy + GREG_YEAR_OFFSET)));
    if (gy === g1.y && gm === g1.m) break;
    gm++; if (gm > 12) { gm = 1; gy++; }
    if (cl.childNodes.length > 6) break;
  }

  const wd = $('weekdays');
  wd.replaceChildren();
  for (let i = 0; i < 7; i++) {
    const e = document.createElement('div');
    e.className = 'hz-wd';
    if (OFF_DAYS.includes((WEEK_START + i) % 7)) e.classList.add('hz-off');
    e.appendChild(ay(DAYS_SHORT[(WEEK_START + i) % 7]));
    wd.appendChild(e);
  }

  const days = $('days');
  days.replaceChildren();
  const g0date = new Date(g0.y, g0.m-1, g0.d);
  const lead = (g0date.getDay() - WEEK_START + 7) % 7;
  for (let i = 0; i < lead; i++) { const e = document.createElement('div'); e.className = 'hz-day hz-empty'; days.appendChild(e); }
  for (let i = 0; i < span.len; i++) {
    const g = jdToGreg(span.start + i);
    const lun = {d: i+1, m: viewM, y: viewY + LUNAR_YEAR_OFFSET};
    const cell = document.createElement('div');
    cell.className = 'hz-day';
    if (OFF_DAYS.includes(new Date(g.y, g.m-1, g.d).getDay())) cell.classList.add('hz-off');
    if (g.d === 1) cell.classList.add('hz-mstart');           // 1er jour d'un mois grégorien
    if (g.y === now.getFullYear() && g.m === now.getMonth()+1 && g.d === now.getDate()) cell.classList.add('hz-today');
    const key = g.y + '-' + g.m + '-' + g.d;
    if (key === selectedKey) cell.classList.add('hz-sel');
    const big = document.createElement('span'); big.className = 'hz-big'; big.appendChild(ay(num(lun.d)));
    const small = document.createElement('span'); small.className = 'hz-small'; small.appendChild(ay(num(g.d)));
    cell.append(big, small);
    if (isFete(g.y, g.m, g.d)) { const f = document.createElement('span'); f.className = 'hz-fete'; cell.appendChild(f); }
    cell.addEventListener('click', () => openDay(g.y, g.m-1, g.d));
    days.appendChild(cell);
  }
}
function moveMonth(step){
  viewM += step;
  if (viewM < 1) { viewM = 12; viewY--; }
  if (viewM > 12) { viewM = 1; viewY++; }
  renderCalendar();
}
$('prevMonth').addEventListener('click', () => moveMonth(-1));
$('nextMonth').addEventListener('click', () => moveMonth(1));
$('btnToday').addEventListener('click', () => { setViewToToday(); selectedKey = ''; renderCalendar(); });
// Glisser le doigt : en RTL, le mois suivant arrive par la gauche.
(function swipe(){
  let x0 = null, y0 = null;
  const c = $('cal');
  c.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, {passive:true});
  c.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) moveMonth(dx > 0 ? 1 : -1);
    x0 = null;
  }, {passive:true});
})();

/* --- Détail d'un jour --- */
function openDay(y, m, d){
  selectedKey = y + '-' + (m+1) + '-' + d;
  renderCalendar();
  const date = new Date(y, m, d, 12);
  const lun = lunarOf(y, m+1, d);
  put($('dsDayName'), dayNumText(date.getDay(), lun.d));
  put($('dsLunar'), LUNAR_MONTHS[lun.m-1]);
  put($('dsYear'), num(lun.y));
  drawMoon($('dsMoon'), date);
  put($('dsGreg'), gregText(y, m+1, d));
  $('dsFetes').innerHTML = fetesDu(m+1, d).map(f => `<span class="hz-fete-pays">${drapeau(f[2])}<span class="hz-pays">${EN && PAYS_EN[f[2]] || f[3]}</span></span>`).join('');
  $('daySheetBg').classList.add('hz-open');
}
$('daySheetBg').addEventListener('click', () => $('daySheetBg').classList.remove('hz-open'));

/* --- Réglage du début de mois (+/- 2 jours) --- */
function renderAdj(){
  const n = new Date();
  put($('adjPreview'), lunarText(lunarNow(n)));
  put($('adjNum'), (adjust() > 0 ? '+' : adjust() < 0 ? '-' : '') + num(Math.abs(adjust())));
}
$('btnAdjust').addEventListener('click', () => { renderAdj(); $('adjSheetBg').classList.add('hz-open'); });
$('adjSheetBg').addEventListener('click', e => { if (e.target === $('adjSheetBg')) $('adjSheetBg').classList.remove('hz-open'); });
$('adjPlus').addEventListener('click', () => { setAdjust(adjust() + 1); setViewToToday(); renderAdj(); tick(); renderCalendar(); });
$('adjMinus').addEventListener('click', () => { setAdjust(adjust() - 1); setViewToToday(); renderAdj(); tick(); renderCalendar(); });

/* --- Cadran à aiguilles (choix mémorisé) --- */
function setDial(on){
  ROOT.classList.toggle('hz-dial-mode', on);
  $('btnDial').classList.toggle('hz-on', on);
  try { localStorage.setItem('dialMode', on ? '1' : '0'); } catch(e) {}
  if (on) drawHands(new Date());
}
$('btnDial').addEventListener('click', () => setDial(!ROOT.classList.contains('hz-dial-mode')));
$('clock').addEventListener('click', () => setDial(true));
dial.addEventListener('click', () => setDial(false));
try { if (localStorage.getItem('dialMode') === '1') setDial(true); } catch(e) {}

/* --- Mode veille de nuit --- */
let wakeLock = null;
function renderNight(now, lun){
  put($('nTime'), timeText(now, false));
  put($('nDay'), dayNumText(now.getDay(), lun.d));
  put($('nLunar'), LUNAR_MONTHS[lun.m-1]);
  drawMoon($('nMoon'), now);
}
async function setNight(on){
  $('night').classList.toggle('hz-open', on);
  if (on) renderNight(new Date(), lunarNow(new Date()));
  if (App && App.setNightMode) { try { App.setNightMode(on); } catch(e) {} return; }
  try {
    if (on) {
      if (navigator.wakeLock) wakeLock = await navigator.wakeLock.request('screen');
      if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      // Le mode veille suit la position du téléphone (portrait ou paysage).
      if (screen.orientation && screen.orientation.unlock) { try { screen.orientation.unlock(); } catch(e) {} }
    } else {
      if (wakeLock) { await wakeLock.release(); wakeLock = null; }
      if (document.fullscreenElement) await document.exitFullscreen();
    }
  } catch(e) {}
}
$('btnNight').addEventListener('click', () => setNight(true));
$('night').addEventListener('click', () => setNight(false));
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && $('night').classList.contains('hz-open') && !App && navigator.wakeLock) {
    try { wakeLock = await navigator.wakeLock.request('screen'); } catch(e) {}
  }
});

/* --- Partager la date du jour en image --- */
async function makeShareImage(){
  await document.fonts.load('40px "Ayneha Pro"', DIG[0]);
  const W = 1080, H = 1080;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  const grd = x.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, '#13213a'); grd.addColorStop(1, '#08101e');
  x.fillStyle = grd; x.fillRect(0, 0, W, H);
  x.strokeStyle = '#ff6a13'; x.lineWidth = 10; x.strokeRect(40, 40, W-80, H-80);

  // Écrit un texte AYNEHA centré, glyphe par glyphe de droite à gauche.
  const rtl = (text, size, color, yy) => {
    x.font = size + 'px "Ayneha Pro"'; x.fillStyle = color; x.textBaseline = 'alphabetic';
    const gl = [...text].map(ch => ({ch, w: x.measureText(ch).width + size*0.04}));
    const tw = gl.reduce((s,a) => s + a.w, 0);
    let px = W/2 + tw/2;
    for (const a of gl) { px -= a.w; x.fillText(a.ch, px, yy); }
  };
  const now = new Date(), lun = lunarNow(now);
  rtl(timeText(now, false), 190, '#ff8a3d', 330);
  rtl(dayNumText(now.getDay(), lun.d), 96, '#f3ece0', 500);
  rtl(LUNAR_MONTHS[lun.m-1], 110, '#ff8a3d', 650);
  rtl(num(lun.y), 96, '#f3ece0', 790);
  rtl(gregText(now.getFullYear(), now.getMonth()+1, now.getDate()), 60, '#b9c0cf', 900);

  // Petite lune en haut à gauche.
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 100 100'); svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  drawMoon(svg, now);
  const src = svg.outerHTML.replace('var(--moon-dark)','#22324f').replace('var(--moon-lit)','#f6e7c8');
  await new Promise(res => {
    const img = new Image();
    img.onload = () => { x.drawImage(img, 90, 90, 130, 130); res(); };
    img.onerror = res;
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src);
  });
  // Filigrane.
  x.font = '600 34px system-ui, sans-serif'; x.fillStyle = 'rgba(243,236,224,0.55)'; x.textAlign = 'center';
  x.fillText('AYNEHA  -  ayneha.org', W/2, H - 80);
  return c;
}
$('btnShare').addEventListener('click', async () => {
  const c = await makeShareImage();
  const dataUrl = c.toDataURL('image/png');
  if (window.AynehaApp && window.AynehaApp.enregistrerImage) { try { if (window.AynehaApp.enregistrerImage(dataUrl, 'ayneha-horloge.png')) return; } catch(e) {} }
  try {
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'ayneha-horloge.png', {type:'image/png'});
    if (navigator.canShare && navigator.canShare({files:[file]})) { await navigator.share({files:[file]}); return; }
  } catch(e) {}
  const a = document.createElement('a'); a.href = dataUrl; a.download = 'ayneha-horloge.png'; a.click();
});

/* --- Batterie (application uniquement) --- */
function checkBattery(){
  if (App && App.isBatteryRestricted) {
    try { $('btnBattery').style.display = App.isBatteryRestricted() ? '' : 'none'; } catch(e) {}
  }
}
$('btnBattery').addEventListener('click', () => { if (App && App.openBatterySettings) App.openBatterySettings(); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { checkBattery(); tick(); } });
window.aynehaRefresh = () => { checkBattery(); tick(); };

/* --- Démarrage --- */
document.fonts.load('20px "Ayneha Pro"', DIG[0]).finally(() => { tick(); checkBattery(); });
tick();
setInterval(tick, 1000);


// Accès pour les tests automatiques.
window.__aynehaHorloge = {lunarOf, lunarNow, sunsetMs, jdToIsl, gregToJd};
})();
