/* AYNEHA - captures d'écran des applications : agrandir, passer à la suivante, fermer.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var vue = document.getElementById("capture-vue");
  if (!vue || vue.dataset.pret) return;
  vue.dataset.pret = "1";
  var liens = Array.prototype.slice.call(document.querySelectorAll("a[data-capture]"));
  var img = vue.querySelector("img"), legende = vue.querySelector("figcaption");
  var i = 0, retour = null;

  function montrer(n) {
    i = (n + liens.length) % liens.length;
    var a = liens[i], fig = a.parentNode;
    img.src = a.href;
    img.alt = a.querySelector("img").alt;
    legende.textContent = fig.querySelector("figcaption").textContent + "  (" + (i + 1) + " / " + liens.length + ")";
  }
  function ouvrir(n) {
    retour = document.activeElement;
    montrer(n);
    vue.hidden = false;
    document.documentElement.classList.add("capture-ouverte");
    vue.querySelector(".capture-fermer").focus();
  }
  function fermer() {
    vue.hidden = true;
    document.documentElement.classList.remove("capture-ouverte");
    if (retour) retour.focus();
  }
  liens.forEach(function (a, n) {
    a.addEventListener("click", function (e) { e.preventDefault(); ouvrir(n); });
  });
  vue.querySelector(".capture-fermer").addEventListener("click", fermer);
  vue.querySelector(".capture-prec").addEventListener("click", function () { montrer(i - 1); });
  vue.querySelector(".capture-suiv").addEventListener("click", function () { montrer(i + 1); });
  vue.addEventListener("click", function (e) { if (e.target === vue) fermer(); });
  document.addEventListener("keydown", function (e) {
    if (vue.hidden) return;
    if (e.key === "Escape") fermer();
    else if (e.key === "ArrowRight") montrer(i + 1);
    else if (e.key === "ArrowLeft") montrer(i - 1);
  });
  // Glisser le doigt pour changer de capture.
  var x0 = null;
  vue.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  vue.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) montrer(dx < 0 ? i + 1 : i - 1);
    x0 = null;
  }, { passive: true });
})();
