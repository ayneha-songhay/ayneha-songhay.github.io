/* AYNEHA - comportements communes à toutes les pages (menu, retour en haut).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var bouton = document.querySelector(".menu-bouton");
  var nav = document.getElementById("nav");
  if (bouton && nav) {
    bouton.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("ouvert");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
      bouton.textContent = ouvert ? "Fermer" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("ouvert")) {
        nav.classList.remove("ouvert");
        bouton.setAttribute("aria-expanded", "false");
        bouton.textContent = "Menu";
        bouton.focus();
      }
    });
  }

  var haut = document.querySelector(".haut-page");
  if (haut) {
    var maj = function () { haut.classList.toggle("visible", window.scrollY > 600); };
    window.addEventListener("scroll", maj, { passive: true });
    haut.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
    maj();
  }

  /* Copie dans le presse-papiers avec repli pour les anciens navigateurs. */
  window.aynehaCopier = function (texte) {
    function repli() { return new Promise(function (ok, ko) {
      var t = document.createElement("textarea");
      t.value = texte; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy") ? ok() : ko(); } catch (e) { ko(e); }
      document.body.removeChild(t);
    }); }
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texte).catch(repli);
    }
    return repli();
  };
})();
