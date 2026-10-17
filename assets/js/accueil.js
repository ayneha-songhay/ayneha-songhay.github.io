/* AYNEHA - essai « Écris ton prénom » sur la page d'accueil.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var champ = document.getElementById("essai-champ");
  var sortie = document.getElementById("essai-sortie");
  if (!champ || !sortie || !window.Ayneha) return;
  var exemples = ["sɔŋɔy", "mahamadu", "isiyaka", "mayga", "fatumata", "bamako", "hũsar"];
  var i = 0, timer = null;

  function afficher(txt) {
    var r = window.Ayneha.transcribe(txt);
    sortie.textContent = r.text;
    sortie.setAttribute("aria-label", txt ? txt + (document.documentElement.lang === "en" ? ", written in AYNEHA" : ", écrit en AYNEHA") : "");
  }
  function demo() {
    afficher(exemples[i % exemples.length]);
    champ.placeholder = (document.documentElement.lang === "en" ? "For example: " : "Par exemple : ") + exemples[i % exemples.length];
    i++;
  }
  champ.addEventListener("input", function () {
    clearInterval(timer); timer = null;
    if (champ.value.trim()) afficher(champ.value.slice(0, 60));
    else { demo(); }
  });
  var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  demo();
  if (!reduit) timer = setInterval(function () { if (!champ.value) demo(); }, 2600);
})();

/* Le mot AYNEHA s'écrit lettre par lettre, de droite à gauche (2 secondes), pour montrer le sens de lecture. */
(function () {
  "use strict";
  var titre = document.querySelector(".ardoise-titre .ay");
  if (!titre) return;
  var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lettres = Array.from(titre.textContent);
  titre.textContent = "";
  var spans = lettres.map(function (c, i) {
    var s = document.createElement("span");
    s.className = "trace-lettre";
    s.style.animationDelay = (0.25 + i * 0.3) + "s";
    s.textContent = c;
    titre.appendChild(s);
    return s;
  });
  if (reduit) { spans.forEach(function (s) { s.classList.add("fixe"); }); return; }
  function rejouer() {
    spans.forEach(function (s) { s.classList.remove("trace-lettre"); void s.offsetWidth; s.classList.add("trace-lettre"); });
  }
  titre.parentNode.style.cursor = "pointer";
  titre.parentNode.setAttribute("title", document.documentElement.lang === "en" ? "Tap to replay the writing direction" : "Toucher pour revoir le sens d'écriture");
  titre.parentNode.addEventListener("click", rejouer);
})();
