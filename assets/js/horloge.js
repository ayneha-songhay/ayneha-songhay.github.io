/* AYNEHA - horloge de la page d'accueil (version 2.0 : calendrier lunaire songhay).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Noms des jours et des mois : écriture de l'auteur (reprise de l'horloge AYNEHA).
   Mêmes calculs que la page Horloge (assets/js/horloge-page.js) : calendrier lunaire
   arithmétique, année lunaire = année de l'Hégire + 2577, jour lunaire qui change au
   coucher du soleil (Gao). Tout est en ordre logique et s'affiche de droite à gauche
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

  var DECALAGE_ANNEE = 2577, EPOQUE = 1948439.5, LAT = 16.2666, LON = -0.0447;
  function versJd(y, m, d) { return Date.UTC(y, m - 1, d) / 86400000 + 2440587.5; }
  function lunJd(y, m, d) { return d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + EPOQUE - 1; }
  function versLun(jd) {
    jd = Math.floor(jd) + 0.5;
    var y = Math.floor((30 * (jd - EPOQUE) + 10646) / 10631);
    var m = Math.min(12, Math.ceil((jd - (29 + lunJd(y, 1, 1))) / 29.5) + 1);
    return { y: y, m: m, d: jd - lunJd(y, m, 1) + 1 };
  }
  function reglage() { try { return parseInt(localStorage.getItem("lunarAdjust") || "0", 10) || 0; } catch (e) { return 0; } }
  function coucher(y, m, d) {
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
