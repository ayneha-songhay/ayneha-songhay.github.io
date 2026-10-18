/* AYNEHA - horloge et calendrier (accueil et page Horloge).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Noms des jours et des mois : écriture de l'auteur (reprise de l'horloge AYNEHA).
   Année songhay = année grégorienne + 2001. Tout est en ordre logique et s'affiche
   de droite à gauche grâce à la classe .ay (RTL pur, lettres et chiffres). */
(function () {
  "use strict";
  if (!window.Ayneha) return;
  var A = window.Ayneha;
  function mot(noms) { return noms.split(" ").map(A.ch).join(""); }

  var JOURS = [
    "F A H A:n T E DJ I", "M A H A:n T E DJ I", "B O H A:n T E DJ I", "W O Y:m H A:n T E DJ I",
    "T O H A:n T E DJ I", "Z I:n B U Z A", "D U H A:n T E DJ I"
  ].map(mot);
  var JOURS_COURTS = ["F A H", "M A H", "B O H", "W O Y:m", "T O H", "Z I:n B", "D U H"].map(mot);
  var MOIS = [
    "D A D A W:m B E:d R I", "D A D A W:m K A Y:m N A", "G A:d N I", "G A:d N I B A:n D A",
    "B I:n K U N A", "B I:n B I N A", "W O Y:m Z E N A", "TS E K O:o N:d A",
    "M E:d H A W:m", "M E:d F E:d R I", "H U N A:n Z A M:m", "TS I B:m S I"
  ].map(mot);
  var LIBELLES = { heure: mot("G U:d R U"), jour: mot("H A N:m"), mois: mot("H A:n D U") };

  function deux(n) { return A.digits(String(n).padStart(2, "0")); }
  function q(sel) { return document.querySelectorAll(sel); }
  function remplir(sel, txt) { q(sel).forEach(function (el) { if (el.textContent !== txt) el.textContent = txt; }); }

  Object.keys(LIBELLES).forEach(function (k) { remplir("[data-libelle='" + k + "']", LIBELLES[k]); });

  function tic() {
    var d = new Date();
    remplir("[data-horloge='heure']", deux(d.getHours()) + ":" + deux(d.getMinutes()) + ":" + deux(d.getSeconds()));
    remplir("[data-horloge='heure-courte']", deux(d.getHours()) + ":" + deux(d.getMinutes()));
    remplir("[data-horloge='jour']", JOURS[d.getDay()]);
    remplir("[data-horloge='mois']", MOIS[d.getMonth()]);
    remplir("[data-horloge='annee']", A.digits(d.getFullYear() + 2001));
    remplir("[data-horloge='date']", A.digits(d.getDate()));
  }
  if (q("[data-horloge]").length) { tic(); setInterval(tic, 1000); }

  /* Calendrier navigable */
  var cal = document.querySelector("[data-calendrier]");
  if (cal) {
    var titre = cal.querySelector("[data-cal-titre]");
    var grille = cal.querySelector("[data-cal-grille]");
    var vue = new Date(); vue.setDate(1);
    var dessiner = function () {
      var auj = new Date();
      titre.textContent = MOIS[vue.getMonth()] + " " + A.digits(vue.getFullYear() + 2001);
      grille.innerHTML = "";
      JOURS_COURTS.forEach(function (j) {
        var e = document.createElement("div"); e.className = "jour-nom";
        e.innerHTML = '<span class="ay"></span>'; e.firstChild.textContent = j; grille.appendChild(e);
      });
      var premier = new Date(vue.getFullYear(), vue.getMonth(), 1).getDay();
      var total = new Date(vue.getFullYear(), vue.getMonth() + 1, 0).getDate();
      for (var i = 0; i < premier; i++) grille.appendChild(document.createElement("div"));
      for (var d = 1; d <= total; d++) {
        var c = document.createElement("div"); c.className = "num";
        if (d === auj.getDate() && vue.getMonth() === auj.getMonth() && vue.getFullYear() === auj.getFullYear()) {
          c.classList.add("aujourdhui"); c.setAttribute("aria-current", "date");
        }
        c.innerHTML = '<span class="ay"></span>'; c.firstChild.textContent = A.digits(d);
        grille.appendChild(c);
      }
    };
    cal.querySelector("[data-cal-prec]").addEventListener("click", function () { vue.setMonth(vue.getMonth() - 1); dessiner(); });
    cal.querySelector("[data-cal-suiv]").addEventListener("click", function () { vue.setMonth(vue.getMonth() + 1); dessiner(); });
    dessiner();
  }
})();
