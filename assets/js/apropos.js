/* AYNEHA - page À propos : bouton « Soutenir le projet AYNEHA ».
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var b = document.getElementById("soutien-bouton");
  var p = document.getElementById("soutien-panneau");
  if (!b || !p) return;
  b.addEventListener("click", function () {
    var ouvert = p.hidden;
    p.hidden = !ouvert;
    b.setAttribute("aria-expanded", ouvert ? "true" : "false");
  });
})();
