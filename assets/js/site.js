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

  /* Compteurs de téléchargements : lus dans assets/data/telechargements.json
     (fichier du site, mis à jour chaque jour à partir des chiffres de GitHub).
     Aucun service tiers n'est contacté à l'affichage de la page. */
  var cibles = document.querySelectorAll("[data-compteur], [data-app], [data-total-telechargements]");
  if (cibles.length && window.fetch) {
    var en = (document.documentElement.lang || "fr").indexOf("en") === 0;
    var nombre = function (n) { return n.toLocaleString(en ? "en" : "fr-FR"); };
    var src = (document.currentScript && document.currentScript.src) || "";
    var base = src.indexOf("assets/js/site.js") > -1 ? src.split("assets/js/site.js")[0] : "";
    fetch(base + "assets/data/telechargements.json", { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.applications) { return; }
        Array.prototype.forEach.call(document.querySelectorAll("[data-app]"), function (b) {
          var a = d.applications[b.getAttribute("data-app")];
          if (a && a.lien && a.version === b.getAttribute("data-version")) {
            b.href = a.lien;
            b.removeAttribute("download");
          }
        });
        Array.prototype.forEach.call(document.querySelectorAll("[data-compteur]"), function (el) {
          var a = d.applications[el.getAttribute("data-compteur")];
          if (!a || !a.total) { return; }
          el.textContent = en
            ? "Downloaded " + nombre(a.total) + (a.total > 1 ? " times" : " time")
            : "Téléchargée " + nombre(a.total) + " fois";
          el.hidden = false;
        });
        Array.prototype.forEach.call(document.querySelectorAll("[data-total-telechargements]"), function (el) {
          if (!d.total) { return; }
          var n = el.querySelector("[data-total]");
          if (n) { n.textContent = nombre(d.total); }
          var m = el.querySelector("[data-maj]");
          if (m && d.maj) {
            var p = d.maj.split("-");
            m.textContent = en ? d.maj : p[2] + "/" + p[1] + "/" + p[0];
          }
          el.hidden = false;
        });
      })
      .catch(function () {});
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
