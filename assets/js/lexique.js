/* AYNEHA - petit lexique songhay : recherche et filtres, texte AYNEHA écrit par le transcripteur.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var EN = document.documentElement.lang === "en";
  function T(fr, en) { return EN ? en : fr; }
  var A = window.Ayneha, MOTS = window.AYNEHA_LEXIQUE || [], CATS = window.AYNEHA_LEXIQUE_CAT || [];
  var liste = document.getElementById("lex-liste");
  var recherche = document.getElementById("lex-recherche");
  var compte = document.getElementById("lex-compte");
  if (!A || !liste) return;
  var filtre = "tout";
  var zoneFiltres = document.getElementById("lex-filtres");
  CATS.forEach(function (c) {
    if (!MOTS.some(function (m) { return m.cat === c.id; })) return;
    var b = document.createElement("button");
    b.type = "button"; b.setAttribute("data-v", c.id); b.setAttribute("aria-pressed", "false");
    b.textContent = EN ? c.en : c.fr;
    zoneFiltres.appendChild(b);
  });

  function sansAccents(t) { return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }

  MOTS.forEach(function (m) {
    var li = document.createElement("li");
    li.className = "lex-mot";
    li.setAttribute("data-cat", m.cat);
    li.setAttribute("data-cle", sansAccents(m.latin + " " + m.fr + " " + m.en + " " + (m.note || "")));
    var ay = document.createElement("span");
    ay.className = "ay lex-ay";
    ay.setAttribute("aria-hidden", "true");
    ay.textContent = A.transcribe(m.latin).text;
    var lat = document.createElement("strong"); lat.textContent = m.latin; lat.lang = "khq";
    var sens = document.createElement("span"); sens.className = "doux"; sens.textContent = EN ? m.en : m.fr;
    li.appendChild(ay); li.appendChild(lat); li.appendChild(sens);
    var note = EN ? m.note_en : m.note;
    if (note) { var n = document.createElement("small"); n.className = "doux petit"; n.textContent = note; li.appendChild(n); }
    liste.appendChild(li);
  });

  function appliquer() {
    var q = sansAccents((recherche.value || "").trim()), n = 0;
    liste.querySelectorAll(".lex-mot").forEach(function (li) {
      var ok = (filtre === "tout" || li.getAttribute("data-cat") === filtre) && (!q || li.getAttribute("data-cle").indexOf(q) >= 0);
      li.hidden = !ok; if (ok) n++;
    });
    compte.textContent = n + " " + (n > 1 ? T("mots", "words") : T("mot", "word"));
  }
  recherche.addEventListener("input", appliquer);
  document.querySelectorAll("#lex-filtres button").forEach(function (b) {
    b.addEventListener("click", function () {
      filtre = b.getAttribute("data-v");
      document.querySelectorAll("#lex-filtres button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      appliquer();
    });
  });
  appliquer();
})();
