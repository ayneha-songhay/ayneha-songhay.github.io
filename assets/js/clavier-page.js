/* AYNEHA - page Clavier : boutons Copier, Image, Effacer.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var composer = document.getElementById("ak-composer");
  var root = document.getElementById("ak-keyboard");
  var etat = document.getElementById("ak-etat");
  if (!composer || !root || !window.AynehaKeyboard) return;
  new window.AynehaKeyboard(root, composer);
  function message(t) { etat.textContent = t; setTimeout(function () { if (etat.textContent === t) etat.textContent = ""; }, 3500); }
  document.getElementById("ak-effacer").addEventListener("click", function () { composer.value = ""; });
  document.getElementById("ak-copier").addEventListener("click", function () {
    if (!composer.value) { message("Il n'y a rien à copier pour l'instant."); return; }
    window.aynehaCopier(window.Ayneha.forPaste(composer.value)).then(function () { message("Texte copié."); }, function () { message("La copie a échoué."); });
  });
  document.getElementById("ak-image").addEventListener("click", function () {
    if (!composer.value.trim()) { message("Écrivez d'abord un texte."); return; }
    window.Ayneha.enImage(composer.value, function () { message("Image enregistrée dans vos téléchargements."); });
  });
})();
