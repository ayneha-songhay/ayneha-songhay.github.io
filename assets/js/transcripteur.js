/* AYNEHA - page Transcripteur (latin vers AYNEHA).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var A = window.Ayneha;
  var entree = document.getElementById("tr-entree");
  var sortie = document.getElementById("tr-sortie");
  var etat = document.getElementById("tr-etat");
  var detail = document.getElementById("tr-detail");
  if (!A || !entree || !sortie) return;
  var dernier = { text: "", words: [] };
  var CLE = "ayneha-transcripteur";

  function message(t) { etat.textContent = t; if (t) setTimeout(function () { if (etat.textContent === t) etat.textContent = ""; }, 3500); }

  function maj() {
    var v = entree.value;
    dernier = A.transcribe(v);
    if (v.trim()) {
      sortie.classList.remove("sortie-vide");
      sortie.textContent = dernier.text;
    } else {
      sortie.classList.add("sortie-vide");
      sortie.textContent = "Le texte en AYNEHA apparaît ici.";
    }
    try { localStorage.setItem(CLE, v); } catch (e) { /* stockage indisponible */ }
    expliquer();
  }

  function expliquer() {
    var mots = dernier.words.slice(0, 40);
    if (!mots.length) { detail.innerHTML = '<p class="doux">Écrivez un mot pour voir comment chaque lettre est choisie.</p>'; return; }
    detail.innerHTML = "";
    mots.forEach(function (m) {
      var bloc = document.createElement("div"); bloc.className = "mot-detail";
      var h = document.createElement("h4"); h.textContent = m.latin; bloc.appendChild(h);
      var ul = document.createElement("ul");
      m.tokens.forEach(function (tk) {
        var e = A.explain(tk);
        var li = document.createElement("li");
        li.innerHTML = '<span class="ay" aria-hidden="true"></span><code></code><span></span>';
        li.children[0].textContent = e.glyph;
        li.children[1].textContent = e.raw;
        li.children[2].textContent = e.label + " : " + e.why;
        ul.appendChild(li);
      });
      bloc.appendChild(ul);
      detail.appendChild(bloc);
    });
  }

  document.getElementById("tr-touches").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-c]");
    if (!b) return;
    var c = b.getAttribute("data-c");
    var d = entree.selectionStart, f = entree.selectionEnd;
    entree.value = entree.value.slice(0, d) + c + entree.value.slice(f);
    entree.selectionStart = entree.selectionEnd = d + c.length;
    entree.focus();
    maj();
  });

  document.getElementById("tr-copier").addEventListener("click", function () {
    if (!dernier.text) { message("Il n'y a rien à copier pour l'instant."); return; }
    window.aynehaCopier(A.forPaste(dernier.text)).then(function () { message("Texte AYNEHA copié."); }, function () { message("La copie a échoué. Sélectionnez le texte et copiez-le à la main."); });
  });

  document.getElementById("tr-effacer").addEventListener("click", function () {
    entree.value = ""; maj(); entree.focus();
  });

  document.getElementById("tr-image").addEventListener("click", function () {
    if (!dernier.text.trim()) { message("Écrivez d'abord un texte."); return; }
    A.enImage(dernier.text, function () { message("Image enregistrée dans vos téléchargements."); });
  });

  try { var sauve = localStorage.getItem(CLE); if (sauve) entree.value = sauve; } catch (e) { /* rien */ }
  entree.addEventListener("input", maj);
  maj();
})();
