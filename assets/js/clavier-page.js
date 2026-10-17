/* AYNEHA - page Clavier : boutons Copier, Image, Effacer.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var EN = document.documentElement.lang === "en";
  function T(fr, en) { return EN ? en : fr; }
  var composer = document.getElementById("ak-composer");
  var root = document.getElementById("ak-keyboard");
  var etat = document.getElementById("ak-etat");
  if (!composer || !root || !window.AynehaKeyboard) return;
  new window.AynehaKeyboard(root, composer);
  function message(t) { etat.textContent = t; setTimeout(function () { if (etat.textContent === t) etat.textContent = ""; }, 3500); }
  document.getElementById("ak-effacer").addEventListener("click", function () { composer.value = ""; });
  document.getElementById("ak-copier").addEventListener("click", function () {
    if (!composer.value) { message(T("Il n'y a rien à copier pour l'instant.", "There is nothing to copy yet.")); return; }
    window.aynehaCopier(window.Ayneha.forPaste(composer.value)).then(function () { message(T("Texte copié.", "Text copied.")); }, function () { message(T("La copie a échoué.", "Copying failed.")); });
  });
  document.getElementById("ak-image").addEventListener("click", function () {
    if (!composer.value.trim()) { message(T("Écrivez d'abord un texte.", "First write some text.")); return; }
    window.Ayneha.enImage(composer.value, function (r) { message(r === "app" ? (window.AynehaApp.enregistreDansGalerie && !window.AynehaApp.enregistreDansGalerie() ? T("Choisissez où enregistrer ou envoyer l'image.", "Choose where to save or send the image.") : T("Image enregistrée dans vos images (dossier Pictures/AYNEHA).", "Image saved in your pictures (Pictures/AYNEHA folder).")) : r === "echec" ? T("L'image n'a pas pu être enregistrée.", "The image could not be saved.") : T("Image enregistrée dans vos téléchargements.", "Image saved in your downloads.")); });
  });
})();
