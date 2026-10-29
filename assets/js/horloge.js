/* AYNEHA - horloge de la page d'accueil (version 2.0 : calendrier lunaire songhay).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Noms des jours et des mois : écriture de l'auteur (reprise de l'horloge AYNEHA).
   Mêmes calculs que la page Horloge (assets/js/horloge-page.js) : calendrier lunaire
   calé sur la vraie lune, année lunaire = année de l'Hégire + 2577, jour lunaire qui change au
   coucher du soleil, là où l'on se trouve. Tout est en ordre logique et s'affiche de droite à gauche
   grâce à la classe .ay. La page complète de l'horloge utilise horloge-page.js. */
(function () {
  "use strict";
  if (!window.Ayneha) return;
  var A = window.Ayneha;
  function mot(noms) { return noms.split(" ").map(A.ch).join(""); }

  // Index 0 = dimanche. La semaine songhay va du samedi au vendredi.
  var JOURS = [
    "F A H A:n T E DJ I", "M A H A:n T E DJ I", "B O H A:n T E DJ I", "W O Y:m H A:n T E DJ I",
    "T O H A:n T E DJ I", "Z I:n B U Z A", "D U H A:n T E DJ I"
  ].map(mot);
  // Les 12 mois lunaires songhay, index 0 = 1er mois du jiiri.
  var MOIS = [
    "D A D A W:m B E:d R I", "D A D A W:m K A Y:m N A", "G A:d N I", "G A:d N I B A:n D A",
    "B I:n K U N A", "B I:n B I N A", "W O Y:m Z E N A", "TS E K O:o N:d A",
    "M E:d H A W:m", "M E:d F E:d R I", "H U N A:n Z A M:m", "TS I B:m S I"
  ].map(mot);

  var DECALAGE_ANNEE = 2577, EPOQUE = 1948439.5;
  // Coucher du soleil là où l'on se trouve : position choisie sur la page Horloge
  // (gardée dans ce navigateur), sinon grande ville du fuseau horaire, sinon Gao.
  var FUSEAUX = {
  'Africa/Bamako':[16.27,-0.04], 'Africa/Niamey':[13.51,2.11], 'Africa/Ouagadougou':[12.37,-1.52],
  'Africa/Porto-Novo':[6.50,2.60], 'Africa/Lome':[6.13,1.22], 'Africa/Accra':[5.60,-0.19],
  'Africa/Lagos':[6.52,3.38], 'Africa/Casablanca':[33.57,-7.59], 'Africa/Algiers':[36.75,3.06],
  'Africa/Abidjan':[5.36,-4.01], 'Africa/Khartoum':[15.50,32.56], 'Africa/Ndjamena':[12.13,15.06],
  'Africa/Dakar':[14.69,-17.44], 'Africa/Nouakchott':[18.08,-15.98], 'Africa/Conakry':[9.64,-13.58],
  'Africa/Freetown':[8.48,-13.23], 'Africa/Monrovia':[6.30,-10.80], 'Africa/Banjul':[13.45,-16.58],
  'Africa/Bissau':[11.86,-15.60], 'Africa/Tripoli':[32.89,13.19], 'Africa/Tunis':[36.81,10.18],
  'Africa/Cairo':[30.04,31.24], 'Africa/Douala':[4.05,9.70], 'Africa/Libreville':[0.39,9.45],
  'Africa/Kinshasa':[-4.32,15.31], 'Africa/Nairobi':[-1.29,36.82], 'Africa/Johannesburg':[-26.20,28.05],
  'Europe/Paris':[48.86,2.35], 'Europe/Brussels':[50.85,4.35], 'Europe/Madrid':[40.42,-3.70],
  'Europe/Rome':[41.90,12.50], 'Europe/Berlin':[52.52,13.40], 'Europe/London':[51.51,-0.13],
  'Europe/Lisbon':[38.72,-9.14], 'Europe/Amsterdam':[52.37,4.90], 'Europe/Zurich':[47.37,8.54],
  'Europe/Istanbul':[41.01,28.98], 'Asia/Riyadh':[24.71,46.68], 'Asia/Dubai':[25.20,55.27],
  'Asia/Qatar':[25.29,51.53], 'Asia/Shanghai':[31.23,121.47], 'Asia/Kolkata':[28.61,77.21],
  'America/New_York':[40.71,-74.01], 'America/Toronto':[43.65,-79.38], 'America/Montreal':[45.50,-73.57],
  'America/Chicago':[41.88,-87.63], 'America/Denver':[39.74,-104.99], 'America/Los_Angeles':[34.05,-118.24],
  'America/Sao_Paulo':[-23.55,-46.63]
};
  function lieu() {
    try { var v = JSON.parse(localStorage.getItem("lieu") || "null"); if (v && isFinite(v[0]) && isFinite(v[1])) return v; } catch (e) {}
    try { var z = Intl.DateTimeFormat().resolvedOptions().timeZone; if (FUSEAUX[z]) return FUSEAUX[z]; } catch (e) {}
    var h = -new Date().getTimezoneOffset() / 60;
    return h === 0 ? [16.2666, -0.0447] : [15, h * 15];
  }
  function versJd(y, m, d) { return Date.UTC(y, m - 1, d) / 86400000 + 2440587.5; }
  // Débuts de mois calés sur la vraie lune (premier croissant visible à l'oeil
  // nu quelque part sur Terre avant minuit UTC, critère d'Odeh), 1899-2201,
  // même tableau que la page Horloge.
  var TAB = { jd0: 2414785.5, y0: 1317, n: 3732, hex: "b5556a9754b725752ba9572ab5555aa5d52da95d49ea4ed26d555aa5b52b6a5751ba8bb49b54d6a5ad4b5a55d49ea2dd15e52ea96d4ada95b4aba93b45ba2baa5b52b6956b2ad94ed26e8aec56d2aea56b2ad555b29b94bb15b4aba55b4ab5556a96d4aea96d46e9574a75555aaad52da95b51ba8dd45b94daa6b54b6a56d2aea2f516e8b6a96d4b5a95b4aba53d45da2dd15d52da95b4ab6956c9764af45752b6956d2ad555b25b92bc95d4ada55d2ad5556aab54b6a5752769374ab6556aaad52da95d4ada4dd26d935aa6b5556a5752b693749764b725b54b6a56d4ada4dd25e92ec96d4ada96b4ab695749764bb25b52b695b4ab5955d26d92dc95e4aea56d2ad555aaab54bb25792ba95b4ab655aaaad54ea96d4aea56d26e936caad555aa5b52ba95b49ba4bb25b54d6a9ad4aea56d26e92f49754b6a56d52da95b49ba4bb25d92da95b4ab5956d2ae92ec96e4aea5752b5956aaaba4bb25d92bc95d4ada55b2ab5556c96d4aea5752b6936caad555aa6b52ba95d49da4dd26d555aa9b54b6a57527693749764b6a5ad52da95d4ada4dd25d92da96d4ada95ad2b693749764b725752b6956caada55d25d92ec95d4aea56b2ab5556c9b64b725752ba95b4ab5556aa6d52dc95d4aea4ed2ad555aaab5" };
  var DEBUT = [TAB.jd0];
  for (var i = 0; i < TAB.n; i++) DEBUT.push(DEBUT[i] + (((parseInt(TAB.hex[i >> 2], 16) >> (3 - (i & 3))) & 1) ? 30 : 29));
  function lunJd(y, m, d) { return d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + EPOQUE - 1; }
  function versLun(jd) {
    jd = Math.floor(jd) + 0.5;
    if (jd >= DEBUT[0] && jd < DEBUT[TAB.n]) {
      var lo = 0, hi = TAB.n - 1;
      while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (DEBUT[mid] <= jd) lo = mid; else hi = mid - 1; }
      return { y: TAB.y0 + Math.floor(lo / 12), m: lo % 12 + 1, d: jd - DEBUT[lo] + 1 };
    }
    var y = Math.floor((30 * (jd - EPOQUE) + 10646) / 10631);
    var m = Math.min(12, Math.ceil((jd - (29 + lunJd(y, 1, 1))) / 29.5) + 1);
    return { y: y, m: m, d: jd - lunJd(y, m, 1) + 1 };
  }
  function reglage() { try { return parseInt(localStorage.getItem("lunarAdjust") || "0", 10) || 0; } catch (e) { return 0; } }
  function coucher(y, m, d) {
    var pos = lieu(), LAT = pos[0], LON = pos[1];
    var r = Math.PI / 180, n = Math.round(versJd(y, m, d) + 0.5 - 2451545), js = n - LON / 360;
    var M = (357.5291 + 0.98560028 * js) % 360;
    var C = 1.9148 * Math.sin(M * r) + 0.02 * Math.sin(2 * M * r) + 0.0003 * Math.sin(3 * M * r);
    var L = (M + C + 180 + 102.9372) % 360;
    var jt = 2451545 + js + 0.0053 * Math.sin(M * r) - 0.0069 * Math.sin(2 * L * r);
    var dec = Math.asin(Math.sin(L * r) * Math.sin(23.4397 * r));
    var cw = (Math.sin(-0.833 * r) - Math.sin(LAT * r) * Math.sin(dec)) / (Math.cos(LAT * r) * Math.cos(dec));
    var w = Math.acos(Math.max(-1, Math.min(1, cw))) / r;
    return (jt + w / 360 - 2440587.5) * 86400000;
  }
  function dateLunaire(t) {
    var y = t.getFullYear(), m = t.getMonth() + 1, d = t.getDate();
    if (t.getTime() >= coucher(y, m, d)) { var s = new Date(y, m - 1, d + 1); y = s.getFullYear(); m = s.getMonth() + 1; d = s.getDate(); }
    var l = versLun(versJd(y, m, d) - reglage());
    return { d: l.d, m: l.m, y: l.y + DECALAGE_ANNEE };
  }

  function deux(n) { return A.digits(String(n).padStart(2, "0")); }
  function q(sel) { return document.querySelectorAll(sel); }
  function remplir(sel, txt) { q(sel).forEach(function (el) { if (el.textContent !== txt) el.textContent = txt; }); }

  function tic() {
    var t = new Date(), l = dateLunaire(t);
    remplir("[data-horloge='heure']", deux(t.getHours()) + ":" + deux(t.getMinutes()) + ":" + deux(t.getSeconds()));
    remplir("[data-horloge='heure-courte']", deux(t.getHours()) + ":" + deux(t.getMinutes()));
    // « Mardi 15 » : nom du jour, puis numéro du jour lunaire.
    remplir("[data-horloge='jour']", JOURS[t.getDay()] + " " + A.digits(l.d));
    remplir("[data-horloge='mois']", MOIS[l.m - 1]);
    remplir("[data-horloge='annee']", A.digits(l.y));
    remplir("[data-horloge='date']", A.digits(l.d));
  }
  if (q("[data-horloge]").length) { tic(); setInterval(tic, 1000); }
})();
