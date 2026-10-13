/* AYNEHA - essai « Écris ton prénom » sur la page d'accueil.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var champ = document.getElementById("essai-champ");
  var sortie = document.getElementById("essai-sortie");
  if (!champ || !sortie || !window.Ayneha) return;
  var exemples = ["fatumata", "mahamadu", "aminata", "issiaka", "hawa", "bamako", "gao"];
  var i = 0, timer = null;

  function afficher(txt) {
    var r = window.Ayneha.transcribe(txt);
    sortie.textContent = r.text;
    sortie.setAttribute("aria-label", txt ? txt + ", écrit en AYNEHA" : "");
  }
  function demo() {
    afficher(exemples[i % exemples.length]);
    champ.placeholder = "Par exemple : " + exemples[i % exemples.length];
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
