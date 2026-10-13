/* AYNEHA - convertisseur de nombres : AYNEHA, français, arabe et N'Ko.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Version web d'AYNEHA NumConvert : jusqu'à 17 chiffres, séparateurs de milliers.
   En AYNEHA, en arabe et en N'Ko, le premier chiffre est à droite. */
(function () {
  "use strict";
  var A = window.Ayneha;
  if (!A) return;
  var SYSTEMES = {
    ayneha: { nom: "AYNEHA", chiffres: "0123456789".split("").map(function (d) { return A.digits(d); }), rtl: true },
    francais: { nom: "Français", chiffres: "0123456789".split(""), rtl: false },
    arabe: { nom: "Arabe", chiffres: "٠١٢٣٤٥٦٧٨٩".split(""), rtl: true },
    nko: { nom: "N'Ko", chiffres: Array.from("߀߁߂߃߄߅߆߇߈߉"), rtl: true }
  };
  var ORDRE = ["ayneha", "francais", "arabe", "nko"];
  var MAX = 17;
  var valeur = "";
  var source = "ayneha";

  var choix = document.getElementById("nb-source");
  var pave = document.getElementById("nb-pave");
  var saisie = document.getElementById("nb-saisie");
  var resultats = document.getElementById("nb-resultats");

  function versSysteme(chiffres, sys) {
    var s = SYSTEMES[sys], out = [];
    for (var i = 0; i < chiffres.length; i++) {
      if (i > 0 && (chiffres.length - i) % 3 === 0) out.push(" ");
      out.push(s.chiffres[+chiffres[i]]);
    }
    return out.join("");
  }
  function classe(sys) { return "nb-val nb-" + sys + (SYSTEMES[sys].rtl ? " nb-rtl" : ""); }

  function dessinerResultats() {
    resultats.innerHTML = "";
    ORDRE.forEach(function (sys) {
      var d = document.createElement("div");
      d.className = "nb-plaque" + (sys === source ? " nb-source" : "");
      var h = document.createElement("h3"); h.textContent = SYSTEMES[sys].nom;
      var p = document.createElement("p"); p.className = classe(sys);
      p.textContent = valeur ? versSysteme(valeur, sys) : "";
      p.setAttribute("aria-label", SYSTEMES[sys].nom + " : " + (valeur || "vide"));
      d.appendChild(h); d.appendChild(p);
      resultats.appendChild(d);
    });
    saisie.className = classe(source) + " nb-saisie";
    saisie.textContent = valeur ? versSysteme(valeur, source) : "";
    document.getElementById("nb-compte").textContent = valeur.length + " / " + MAX + " chiffres";
  }

  function dessinerPave() {
    pave.innerHTML = "";
    var dispo = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "efface", "0", "tout"];
    dispo.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "calc-touche";
      if (k === "efface") { b.textContent = "⌫"; b.classList.add("calc-b"); b.setAttribute("aria-label", "Effacer un chiffre"); }
      else if (k === "tout") { b.textContent = "C"; b.classList.add("calc-c"); b.setAttribute("aria-label", "Tout effacer"); }
      else {
        var s = document.createElement("span");
        s.className = classe(source).replace("nb-val", "nb-touche");
        s.textContent = SYSTEMES[source].chiffres[+k];
        b.appendChild(s);
        b.setAttribute("aria-label", k);
      }
      b.addEventListener("click", function () { touche(k); });
      pave.appendChild(b);
    });
  }

  function touche(k) {
    if (k === "efface") valeur = valeur.slice(0, -1);
    else if (k === "tout") valeur = "";
    else if (valeur.length < MAX) valeur = (valeur === "0" ? "" : valeur) + k;
    dessinerResultats();
  }

  choix.addEventListener("change", function () { source = choix.value; dessinerPave(); dessinerResultats(); });
  document.addEventListener("keydown", function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    var k = e.key;
    ORDRE.forEach(function (sys) { var i = SYSTEMES[sys].chiffres.indexOf(k); if (i >= 0) k = String(i); });
    if (/^[0-9]$/.test(k)) { e.preventDefault(); touche(k); }
    else if (e.key === "Backspace") { e.preventDefault(); touche("efface"); }
    else if (e.key === "Escape" || e.key === "Delete") { e.preventDefault(); touche("tout"); }
  });
  valeur = "2026";
  dessinerPave();
  dessinerResultats();
})();
