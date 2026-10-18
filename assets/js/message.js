/* Formulaires « message préparé » (Votre avis, Éducation et associations).
   Rien n'est envoyé par le site : le formulaire prépare un message WhatsApp ou un e-mail,
   que la personne envoie elle-même depuis son application. Aucun serveur, aucun traceur.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var WA = "22366778763";
  var MAIL = "contact@ayneha.org";

  function valeur(champ) {
    if (champ.tagName === "FIELDSET") {
      var coches = champ.querySelectorAll("input:checked");
      return Array.prototype.map.call(coches, function (c) { return c.value; }).join(", ");
    }
    return (champ.value || "").trim();
  }

  function composer(form) {
    var lignes = [form.getAttribute("data-intro") || ""];
    var rempli = false;
    form.querySelectorAll("[data-label]").forEach(function (champ) {
      var v = valeur(champ);
      if (!v) return;
      if (!champ.hasAttribute("data-auto")) rempli = true;
      lignes.push(champ.getAttribute("data-label") + " " + v);
    });
    var fin = form.getAttribute("data-fin");
    if (fin) lignes.push("", fin);
    return { texte: lignes.join("\n"), rempli: rempli };
  }

  function relier(form) {
    var wa = form.querySelector("[data-canal=wa]");
    var mail = form.querySelector("[data-canal=mail]");
    var etat = form.querySelector(".message-etat");
    var sujet = form.getAttribute("data-sujet") || "AYNEHA";

    // Page d'où vient la personne (lien « Donner mon avis » du pied de page).
    var depuis = form.querySelector("[name=depuis]");
    if (depuis && !depuis.value) {
      try {
        var p = new URLSearchParams(location.search).get("depuis");
        if (p && /^[a-z0-9\/-]+\.html$/.test(p)) depuis.value = p;
      } catch (e) { /* rien */ }
    }

    function maj() {
      var m = composer(form);
      if (wa) wa.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(m.texte);
      if (mail) mail.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(m.texte);
      return m;
    }
    form.addEventListener("input", maj);
    form.addEventListener("change", maj);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    [wa, mail].forEach(function (lien) {
      if (!lien) return;
      lien.addEventListener("click", function (e) {
        var m = maj();
        if (!m.rempli) {
          e.preventDefault();
          if (etat) etat.textContent = form.getAttribute("data-vide") || "";
          return;
        }
        if (etat) etat.textContent = form.getAttribute("data-envoye") || "";
      });
    });
    maj();
  }

  document.querySelectorAll("form.form-message").forEach(relier);
})();
