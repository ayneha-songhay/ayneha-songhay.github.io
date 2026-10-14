/* AYNEHA - page Alphabet : grille des lettres, fiche détaillée, chiffres.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var EN = document.documentElement.lang === "en";
  var FORME_EN = { "initiale": "basic", "nasalisée": "nasalised", "ouverte": "open", "double": "double", "muette": "silent" };
  var L = window.AYNEHA_LETTRES || [];
  var A = window.Ayneha;
  var fiche = document.getElementById("fiche");
  if (!fiche || !L.length) return;
  function f(k) { return fiche.querySelector("[data-f='" + k + "']"); }
  var cartes = {};
  var actuel = -1;

  L.forEach(function (lettre, i) {
    var grille = document.querySelector(".grille-lettres[data-groupe='" + lettre.type + "']");
    var b = document.createElement("button");
    b.type = "button";
    b.className = "carte-lettre";
    b.id = "lettre-" + lettre.id;
    b.setAttribute("aria-expanded", "false");
    b.setAttribute("aria-controls", "fiche");
    b.innerHTML = '<span class="ay" aria-hidden="true"></span><b></b><span class="son"></span>';
    b.querySelector(".ay").textContent = lettre.glyphe;
    b.querySelector("b").textContent = lettre.nom;
    b.querySelector(".son").textContent = lettre.epel;
    b.setAttribute("aria-label", (EN ? "Letter " + lettre.nom + ", said " : "Lettre " + lettre.nom + ", se dit ") + lettre.epel);
    b.addEventListener("click", function () { ouvrir(i, true); });
    grille.appendChild(b);
    cartes[lettre.id] = b;
  });

  function ouvrir(i, defiler) {
    if (i < 0 || i >= L.length) return;
    var lettre = L[i];
    if (actuel >= 0) cartes[L[actuel].id].setAttribute("aria-expanded", "false");
    actuel = i;
    cartes[lettre.id].setAttribute("aria-expanded", "true");
    f("glyphe").textContent = lettre.glyphe;
    f("titre").textContent = (EN ? (lettre.type === "voyelle" ? "The vowel " : "The consonant ") : (lettre.type === "voyelle" ? "La voyelle " : "La consonne ")) + lettre.nom;
    f("son").textContent = EN ? (lettre.son_en || lettre.son) : lettre.son;
    f("epel").textContent = EN ? "“" + lettre.epel + "”" : "« " + lettre.epel + " »";
    f("cp").textContent = lettre.cp;
    var v = f("variantes");
    v.innerHTML = "";
    lettre.variantes.forEach(function (va) {
      var d = document.createElement("div");
      d.className = "variante";
      d.innerHTML = '<span class="ay" aria-hidden="true"></span><small></small>';
      d.querySelector(".ay").textContent = va.g;
      d.querySelector("small").textContent = (EN ? (FORME_EN[va.nom] || va.nom) + ": " : va.nom + " : ") + va.lat;
      d.title = va.cp;
      v.appendChild(d);
    });
    var note = "";
    if (lettre.id === "H") note = EN ? "H is the only letter that takes no diacritic. It is never found at the end of a word." : "H est la seule lettre qui ne prend aucun accent. Elle ne se trouve jamais en fin de mot.";
    else if (["SH", "TS", "J", "GN"].indexOf(lettre.id) >= 0) note = EN ? "This consonant never takes the silent mark: it is never found at the end of a word." : "Cette consonne ne prend pas l'accent muet : elle ne se trouve jamais en fin de mot.";
    else if (lettre.type === "voyelle" && (lettre.id === "E" || lettre.id === "O")) note = EN ? "E and O are the only vowels with an open form." : "E et O sont les seules voyelles qui ont une forme ouverte.";
    f("note").textContent = note;
    var grilleLettre = cartes[lettre.id].parentNode;
    if (grilleLettre.nextElementSibling !== fiche) grilleLettre.parentNode.insertBefore(fiche, grilleLettre.nextSibling);
    fiche.hidden = false;
    f("prec").disabled = i === 0;
    f("suiv").disabled = i === L.length - 1;
    if (history.replaceState) history.replaceState(null, "", "#lettre-" + lettre.id);
    if (defiler) {
      fiche.scrollIntoView({ behavior: "smooth", block: "nearest" });
      fiche.focus({ preventScroll: true });
    }
  }
  f("prec").addEventListener("click", function () { ouvrir(actuel - 1, false); });
  f("suiv").addEventListener("click", function () { ouvrir(actuel + 1, false); });

  var m = location.hash.match(/^#lettre-([A-Z]+)$/);
  if (m) {
    for (var i = 0; i < L.length; i++) if (L[i].id === m[1]) { ouvrir(i, true); break; }
  }

  /* Convertisseur de nombres */
  var champ = document.getElementById("nombre-champ");
  var sortie = document.getElementById("nombre-sortie");
  var lecture = document.getElementById("nombre-lecture");
  if (champ && sortie && A) {
    var maj = function () {
      var brut = champ.value.replace(/\s/g, "");
      var propre = brut.replace(/[^0-9.,]/g, "").replace(".", ",");
      var parties = propre.split(",");
      var txt = A.digits(parties[0] || "");
      if (parties.length > 1) txt += A.ch(",") + A.digits(parties.slice(1).join(""));
      sortie.textContent = txt;
      lecture.textContent = propre ? (EN ? "Read from right to left: " : "Se lit de droite à gauche : ") + propre : "";
    };
    champ.addEventListener("input", maj);
    champ.value = "2026";
    maj();
  }
})();
