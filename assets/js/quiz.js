/* AYNEHA - Quiz : les 6 jeux d'AYNEHA School, 10 questions chacun, meilleur score gardé.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var A = window.Ayneha, LETTRES = window.AYNEHA_LETTRES;
  var zone = document.getElementById("quiz");
  if (!A || !LETTRES || !zone) return;

  var EN = document.documentElement.lang === "en";
  function T(fr, en) { return EN ? en : fr; }
  var NB = 10;
  var VOYELLES = LETTRES.filter(function (l) { return l.type === "voyelle"; });
  var CONSONNES = LETTRES.filter(function (l) { return l.type === "consonne"; });
  var FORMES = ["nasalisée", "ouverte", "double", "muette"];
  var FORMES_EN = { "nasalisée": "nasalised", "ouverte": "open", "double": "double", "muette": "silent" };
  function son(l) { return EN ? (l.son_en || l.son) : l.son; }

  function hasard(n) { return Math.floor(Math.random() * n); }
  function melanger(t) { t = t.slice(); for (var i = t.length - 1; i > 0; i--) { var j = hasard(i + 1), x = t[i]; t[i] = t[j]; t[j] = x; } return t; }
  function piocher(t, n, sauf) { return melanger(t.filter(function (x) { return sauf.indexOf(x) < 0; })).slice(0, n); }
  function nomLettre(l) { return l.nom + " (" + l.epel + ")"; }
  function latinDe(l) { return l.variantes[0].lat; }

  /* Chaque jeu fabrique une question : { consigne, montrer, ay (bool), choix: [{t, ay}], bonne } */
  var JEUX = [
    { id: "reconnaitre", titre: T("Reconnaître", "Recognise"), desc: T("Une lettre AYNEHA s'affiche : quelle est-elle ?", "An AYNEHA letter appears: which one is it?"),
      question: function () {
        var l = LETTRES[hasard(LETTRES.length)];
        var pool = l.type === "voyelle" ? VOYELLES : CONSONNES;
        var autres = piocher(pool, 3, [l]);
        var choix = melanger([l].concat(autres));
        return { consigne: T("Quelle est cette lettre ?", "Which letter is this?"), montrer: l.glyphe, ay: true,
          choix: choix.map(function (x) { return { t: nomLettre(x) }; }), bonne: choix.indexOf(l) };
      } },
    { id: "retrouver", titre: T("Retrouver", "Find"), desc: T("Un son est donné : trouvez la bonne lettre.", "A sound is given: find the right letter."),
      question: function () {
        var l = LETTRES[hasard(LETTRES.length)];
        var autres = piocher(LETTRES, 3, [l]);
        var choix = melanger([l].concat(autres));
        return { consigne: T("Trouvez la lettre AYNEHA qui note ce son : ", "Find the AYNEHA letter for this sound: ") + son(l) + ".", montrer: l.nom + " (" + l.epel + ")", ay: false,
          choix: choix.map(function (x) { return { t: x.glyphe, ay: true }; }), bonne: choix.indexOf(l) };
      } },
    { id: "accent", titre: T("Quel accent ?", "Which diacritic?"), desc: T("Une lettre avec un accent : nasalisée, ouverte, double ou muette ?", "A letter with a diacritic: nasalised, open, double or silent?"),
      question: function () {
        var avec = LETTRES.filter(function (l) { return l.variantes.length > 1; });
        var l = avec[hasard(avec.length)];
        var v = l.variantes[1 + hasard(l.variantes.length - 1)];
        return { consigne: T("Sous quelle forme est écrite la lettre " + l.nom + " ?", "In which form is the letter " + l.nom + " written?"), montrer: v.g, ay: true,
          choix: FORMES.map(function (f) { return { t: EN ? FORMES_EN[f] : f }; }), bonne: FORMES.indexOf(v.nom), aide: v.lat };
      } },
    { id: "syllabe", titre: T("Lire la syllabe", "Read the syllable"), desc: T("Une consonne et une voyelle : comment se lit la syllabe ?", "A consonant and a vowel: how is the syllable read?"),
      question: function () {
        var c = CONSONNES[hasard(CONSONNES.length)], v = VOYELLES[hasard(VOYELLES.length)];
        var bonne = latinDe(c) + latinDe(v), vues = [bonne], choix = [bonne];
        var essais = 0;
        while (choix.length < 4 && essais++ < 50) {
          var c2 = Math.random() < 0.5 ? c : CONSONNES[hasard(CONSONNES.length)];
          var v2 = c2 === c ? VOYELLES[hasard(VOYELLES.length)] : (Math.random() < 0.5 ? v : VOYELLES[hasard(VOYELLES.length)]);
          var s = latinDe(c2) + latinDe(v2);
          if (vues.indexOf(s) < 0) { vues.push(s); choix.push(s); }
        }
        choix = melanger(choix);
        return { consigne: T("Comment se lit cette syllabe ? (de droite à gauche)", "How is this syllable read? (right to left)"), montrer: c.glyphe + v.glyphe, ay: true,
          choix: choix.map(function (s) { return { t: s }; }), bonne: choix.indexOf(bonne) };
      } },
    { id: "chiffres", titre: T("Les chiffres", "Digits"), desc: T("Un nombre en chiffres AYNEHA : quelle est sa valeur ?", "A number in AYNEHA digits: what is its value?"),
      question: function () {
        var taille = 2 + hasard(3), n = String(Math.pow(10, taille - 1) + hasard(9 * Math.pow(10, taille - 1)));
        var vues = [n], choix = [n];
        var inverse = n.split("").reverse().join("");
        if (inverse !== n && inverse[0] !== "0") { vues.push(inverse); choix.push(inverse); }
        var essais = 0;
        while (choix.length < 4 && essais++ < 50) {
          var t = n.split(""), i = hasard(t.length), d = String(hasard(10));
          if (i === 0 && d === "0") continue;
          t[i] = d; var s = t.join("");
          if (vues.indexOf(s) < 0) { vues.push(s); choix.push(s); }
        }
        choix = melanger(choix);
        return { consigne: T("Quel est ce nombre ? (les chiffres se lisent de droite à gauche)", "What is this number? (digits are read right to left)"), montrer: A.digits(n), ay: true,
          choix: choix.map(function (s) { return { t: Number(s).toLocaleString(EN ? "en-GB" : "fr-FR") }; }), bonne: choix.indexOf(n) };
      } },
    { id: "ordre", titre: T("L'ordre AYNEHA", "AYNEHA order"), desc: T("Touchez les lettres dans l'ordre de l'alphabet AYNEHA.", "Tap the letters in AYNEHA alphabetical order."),
      question: function () {
        var lot = piocher(LETTRES, 4, []);
        var ordre = lot.slice().sort(function (a, b) { return LETTRES.indexOf(a) - LETTRES.indexOf(b); });
        return { ordre: true, consigne: T("Touchez ces lettres dans l'ordre AYNEHA (la première de l'alphabet d'abord).", "Tap these letters in AYNEHA order (the first in the alphabet first)."),
          lot: lot, attendu: ordre };
      } }
  ];

  function lireRecord(id) { try { return Number(localStorage.getItem("ayneha-quiz-" + id)) || 0; } catch (e) { return 0; } }
  function ecrireRecord(id, s) { try { if (s > lireRecord(id)) localStorage.setItem("ayneha-quiz-" + id, String(s)); } catch (e) { /* rien */ } }

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  /* ---------- accueil des jeux ---------- */
  function accueil() {
    zone.innerHTML = "";
    var grille = el("div", "quiz-jeux");
    JEUX.forEach(function (j, i) {
      var b = el("button", "quiz-jeu"); b.type = "button";
      b.appendChild(el("span", "quiz-num", String(i + 1)));
      b.appendChild(el("h3", "", j.titre));
      b.appendChild(el("p", "", j.desc));
      var r = lireRecord(j.id);
      b.appendChild(el("span", "quiz-record", r ? T("Meilleur score : ", "Best score: ") + r + " / " + NB : T("Pas encore joué", "Not played yet")));
      b.addEventListener("click", function () { jouer(j); });
      grille.appendChild(b);
    });
    zone.appendChild(grille);
  }

  /* ---------- une partie ---------- */
  function jouer(jeu) {
    var n = 0, score = 0;
    function suivante() {
      if (n >= NB) return fin();
      n++;
      var q = jeu.question();
      zone.innerHTML = "";
      var tete = el("div", "quiz-tete");
      var retour = el("button", "quiz-lien", T("Tous les jeux", "All games")); retour.type = "button";
      retour.addEventListener("click", accueil);
      tete.appendChild(retour);
      tete.appendChild(el("span", "quiz-compteur", jeu.titre + " - question " + n + " / " + NB + " - score " + score));
      zone.appendChild(tete);
      var barre = el("div", "quiz-barre"); var plein = el("span"); plein.style.width = ((n - 1) / NB * 100) + "%"; barre.appendChild(plein); zone.appendChild(barre);
      zone.appendChild(el("p", "quiz-consigne", q.consigne));
      var reponse = el("p", "quiz-reponse"); reponse.setAttribute("role", "status");
      var apres = el("div", "quiz-apres");
      var bouton = el("button", "btn", n < NB ? T("Question suivante", "Next question") : T("Voir mon score", "See my score")); bouton.type = "button";
      bouton.addEventListener("click", suivante);

      if (q.ordre) {
        var tab = el("div", "tablette quiz-tablette");
        var rangee = el("div", "quiz-ordre");
        var trace = el("p", "quiz-trace ay");
        var pris = [], fini = false;
        q.lot.forEach(function (l) {
          var b = el("button", "quiz-choix quiz-choix-ay"); b.type = "button";
          var s = el("span", "ay", l.glyphe); b.appendChild(s);
          b.setAttribute("aria-label", T("Lettre ", "Letter ") + l.nom);
          b.addEventListener("click", function () {
            if (fini || b.disabled) return;
            var attendu = q.attendu[pris.length];
            if (l === attendu) {
              pris.push(l); b.disabled = true; b.classList.add("juste");
              trace.textContent = pris.map(function (x) { return x.glyphe; }).join(" ");
              if (pris.length === q.attendu.length) { fini = true; score++; reponse.textContent = T("Bravo, c'est le bon ordre !", "Well done, that's the right order!"); reponse.className = "quiz-reponse juste"; apres.hidden = false; }
            } else {
              fini = true; b.classList.add("faux");
              reponse.textContent = T("Pas tout à fait. Le bon ordre : ", "Not quite. The right order: ") + q.attendu.map(function (x) { return x.nom; }).join(", ") + ".";
              reponse.className = "quiz-reponse faux";
              trace.textContent = q.attendu.map(function (x) { return x.glyphe; }).join(" ");
              apres.hidden = false;
            }
          });
          rangee.appendChild(b);
        });
        tab.appendChild(trace); zone.appendChild(tab); zone.appendChild(rangee);
      } else {
        var tab2 = el("div", "tablette quiz-tablette");
        var m = el("p", q.ay ? "quiz-montre ay" : "quiz-montre quiz-montre-latin", q.montrer);
        tab2.appendChild(m); zone.appendChild(tab2);
        var grille = el("div", "quiz-choix-grille");
        var boutons = [];
        q.choix.forEach(function (c, i) {
          var b = el("button", "quiz-choix" + (c.ay ? " quiz-choix-ay" : "")); b.type = "button";
          if (c.ay) b.appendChild(el("span", "ay", c.t)); else b.textContent = c.t;
          b.addEventListener("click", function () {
            boutons.forEach(function (x) { x.disabled = true; });
            boutons[q.bonne].classList.add("juste");
            if (i === q.bonne) { score++; reponse.textContent = T("Bonne réponse !", "Correct!"); reponse.className = "quiz-reponse juste"; }
            else {
              b.classList.add("faux");
              reponse.textContent = T("Pas tout à fait : la bonne réponse est en vert.", "Not quite: the right answer is in green.") + (q.aide ? T(" En lettres latines : ", " In Latin letters: ") + q.aide + "." : "");
              reponse.className = "quiz-reponse faux";
            }
            apres.hidden = false; bouton.focus();
          });
          boutons.push(b); grille.appendChild(b);
        });
        zone.appendChild(grille);
      }
      zone.appendChild(reponse);
      apres.hidden = true; apres.appendChild(bouton); zone.appendChild(apres);
      zone.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function fin() {
      var ancien = lireRecord(jeu.id);
      ecrireRecord(jeu.id, score);
      zone.innerHTML = "";
      var bloc = el("div", "quiz-fin");
      bloc.appendChild(el("p", "quiz-score", score + " / " + NB));
      var msg = score === NB ? T("Parfait ! Vous maîtrisez ce jeu.", "Perfect! You have mastered this game.") : score >= 7 ? T("Très bien ! Encore un peu et c'est parfait.", "Very good! A little more and it's perfect.") : score >= 4 ? T("C'est un bon début. Rejouez pour progresser.", "A good start. Play again to improve.") : T("Courage ! Revoyez l'alphabet, puis rejouez.", "Keep going! Review the alphabet, then play again.");
      bloc.appendChild(el("p", "quiz-message", msg));
      if (score > ancien && ancien) bloc.appendChild(el("p", "quiz-message doux", T("Nouveau record ! L'ancien était ", "New record! The previous one was ") + ancien + " / " + NB + "."));
      var bts = el("div", "boutons");
      var rejouer = el("button", "btn", T("Rejouer", "Play again")); rejouer.type = "button"; rejouer.addEventListener("click", function () { jouer(jeu); });
      var autres = el("button", "btn btn-ligne", T("Choisir un autre jeu", "Choose another game")); autres.type = "button"; autres.addEventListener("click", accueil);
      var revoir = el("a", "btn btn-ligne", T("Revoir l'alphabet", "Review the alphabet")); revoir.href = "alphabet.html";
      bts.appendChild(rejouer); bts.appendChild(autres); bts.appendChild(revoir);
      bloc.appendChild(bts);
      zone.appendChild(bloc);
      zone.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    suivante();
  }

  var direct = JEUX.filter(function (j) { return "#" + j.id === location.hash; })[0];
  if (direct) jouer(direct); else accueil();
})();
