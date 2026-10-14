/* AYNEHA - convertisseur de nombres : AYNEHA, N'Ko, Dogon NÈNÈ, arabe et français.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Version web d'AYNEHA NumConvert (mêmes tables de chiffres que l'application) :
   jusqu'à 17 chiffres, séparateurs de milliers.
   En AYNEHA, en N'Ko et en Dogon NÈNÈ, le premier chiffre est à droite.
   Chiffres Dogon NÈNÈ : écriture de Yahya Sékou Salah GUINDO (police DogonNene,
   zone d'usage privé U+E01A-U+E023). */
(function () {
  "use strict";
  var EN = document.documentElement.lang === "en";
  function T(fr, en) { return EN ? en : fr; }
  var A = window.Ayneha;
  if (!A) return;
  var SYSTEMES = {
    ayneha: { nom: "AYNEHA", chiffres: "0123456789".split("").map(function (d) { return A.digits(d); }), rtl: true },
    francais: { nom: T("Français", "Western"), chiffres: "0123456789".split(""), rtl: false },
    nko: { nom: "N'Ko", chiffres: Array.from("߀߁߂߃߄߅߆߇߈߉"), rtl: true },
    dogon: { nom: "Dogon NÈNÈ", chiffres: ["\uE023", "\uE01A", "\uE01B", "\uE01C", "\uE01D", "\uE01E", "\uE01F", "\uE020", "\uE021", "\uE022"], rtl: true },
    arabe: { nom: T("Arabe", "Arabic"), chiffres: "٠١٢٣٤٥٦٧٨٩".split(""), rtl: false, sep: "\u066C" }
  };
  var ORDRE = ["ayneha", "nko", "dogon", "arabe", "francais"];
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
      if (i > 0 && (chiffres.length - i) % 3 === 0) out.push(s.sep || "\u2009");
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
      p.setAttribute("aria-label", SYSTEMES[sys].nom + (EN ? ": " : " : ") + (valeur || T("vide", "empty")));
      d.appendChild(h); d.appendChild(p);
      resultats.appendChild(d);
    });
    saisie.className = classe(source) + " nb-saisie";
    saisie.textContent = valeur ? versSysteme(valeur, source) : "";
    document.getElementById("nb-compte").textContent = valeur.length + " / " + MAX + T(" chiffres", " digits");
    ajuster();
  }

  /* Chaque nombre tient sur une seule ligne : si la place manque (téléphone),
     la taille des chiffres diminue juste ce qu'il faut, sans barre de défilement. */
  function ajuster() {
    [saisie].concat([].slice.call(resultats.querySelectorAll(".nb-val"))).forEach(function (el) {
      el.style.fontSize = "";
      if (!el.textContent) return;
      var t = parseFloat(getComputedStyle(el).fontSize), min = 15;
      while (el.scrollWidth > el.clientWidth + 1 && t > min) { t -= 1; el.style.fontSize = t + "px"; }
    });
  }
  var attente;
  window.addEventListener("resize", function () { clearTimeout(attente); attente = setTimeout(ajuster, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajuster);

  function dessinerPave() {
    pave.innerHTML = "";
    // Pavé en miroir pour les écritures de droite à gauche, comme dans l'application.
    var dispo = SYSTEMES[source].rtl
      ? ["9", "8", "7", "6", "5", "4", "3", "2", "1", "efface", "0", "tout"]
      : ["7", "8", "9", "4", "5", "6", "1", "2", "3", "tout", "0", "efface"];
    dispo.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "calc-touche";
      if (k === "efface") { b.textContent = "⌫"; b.classList.add("calc-b"); b.setAttribute("aria-label", T("Effacer un chiffre", "Delete a digit")); }
      else if (k === "tout") { b.textContent = "C"; b.classList.add("calc-c"); b.setAttribute("aria-label", T("Tout effacer", "Clear all")); }
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
