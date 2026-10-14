/* AYNEHA - calculatrice en chiffres AYNEHA (page Calculatrice).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Reprise de la calculatrice web AYNEHA (même logique de calcul et même pavé),
   avec les chiffres de la police Ayneha Pro (plan 16) au lieu d'images.
   Lecture de droite à gauche ; virgule décimale = virgule AYNEHA (règles v1). */
(function () {
  "use strict";
  var EN = document.documentElement.lang === "en";
  function T(fr, en) { return EN ? en : fr; }
  var A = window.Ayneha;
  var ligneExpr = document.getElementById("calc-expr");
  var ligneRes = document.getElementById("calc-resultat");
  var pave = document.getElementById("calc-pave");
  if (!A || !ligneExpr || !ligneRes || !pave) return;

  var entree = "0", precedent = null, operateur = null, vientDeCalculer = false, expr = "";
  var SEP = " "; // espace fine entre les groupes de trois chiffres

  function fmt(n) { if (!isFinite(n)) return "ERR"; return String(Math.round(n * 1e10) / 1e10); }
  function calcul(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
    }
  }
  function grouper(ent) {
    var out = "";
    for (var i = 0; i < ent.length; i++) { if (i > 0 && (ent.length - i) % 3 === 0) out += SEP; out += ent[i]; }
    return out;
  }
  function formaterNombre(tok) {
    var neg = tok.charAt(0) === "-"; if (neg) tok = tok.slice(1);
    var p = tok.indexOf(".");
    var ent = p === -1 ? tok : tok.slice(0, p), dec = p === -1 ? null : tok.slice(p + 1);
    return (neg ? "−" : "") + A.digits(grouper(ent)) + (dec !== null ? A.ch(",") + A.digits(dec) : "");
  }
  function enAyneha(str) {
    if (str === "ERR") return "ERR";
    return str.replace(/-?\d+(\.\d*)?/g, function (m) { return formaterNombre(m); });
  }
  function afficher() {
    ligneRes.textContent = enAyneha(entree);
    ligneExpr.textContent = enAyneha(expr);
    ligneRes.setAttribute("aria-label", entree === "ERR" ? "Erreur" : "Résultat : " + entree);
  }

  function chiffre(d) { if (vientDeCalculer) { entree = "0"; expr = ""; vientDeCalculer = false; } if (entree.length < 16) entree = entree === "0" ? d : entree + d; }
  function virgule() { if (vientDeCalculer) { entree = "0"; expr = ""; vientDeCalculer = false; } if (entree.indexOf(".") < 0) entree += "."; }
  function operation(op) {
    if (entree === "ERR") return;
    if (operateur && !vientDeCalculer) precedent = calcul(precedent, parseFloat(entree), operateur);
    else precedent = parseFloat(entree);
    operateur = op; expr = fmt(precedent) + op; entree = "0"; vientDeCalculer = false;
  }
  function egal() {
    if (operateur === null) return;
    var b = parseFloat(entree), r = calcul(precedent, b, operateur);
    expr = fmt(precedent) + operateur + fmt(b) + "=";
    entree = isNaN(r) ? "ERR" : fmt(r);
    precedent = null; operateur = null; vientDeCalculer = true;
  }
  function effacerTout() { entree = "0"; precedent = null; operateur = null; expr = ""; vientDeCalculer = false; }
  function effacer() { if (vientDeCalculer) { effacerTout(); return; } entree = entree.length > 1 ? entree.slice(0, -1) : "0"; }

  var DISPOSITION = [
    ["C", "c"], ["⌫", "b"], [",", "v"], ["÷", "o"],
    ["9", "d"], ["8", "d"], ["7", "d"], ["×", "o"],
    ["6", "d"], ["5", "d"], ["4", "d"], ["−", "o"],
    ["3", "d"], ["2", "d"], ["1", "d"], ["+", "o"],
    ["0", "d"], ["=", "e"]
  ];
  var NOMS = EN ? { c: "Clear all", b: "Delete a digit", v: "Decimal comma", e: "Equals", "÷": "Divide", "×": "Multiply", "−": "Subtract", "+": "Add" } : { c: "Tout effacer", b: "Effacer un chiffre", v: "Virgule", e: "Égal", "÷": "Diviser", "×": "Multiplier", "−": "Soustraire", "+": "Additionner" };
  DISPOSITION.forEach(function (k) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "calc-touche calc-" + k[1];
    if (k[1] === "d") { b.innerHTML = '<span class="ay"></span>'; b.firstChild.textContent = A.digits(k[0]); b.setAttribute("aria-label", k[0]); }
    else if (k[1] === "v") { b.innerHTML = '<span class="ay"></span>'; b.firstChild.textContent = A.ch(","); b.setAttribute("aria-label", NOMS.v); }
    else { b.textContent = k[0]; b.setAttribute("aria-label", NOMS[k[1]] || NOMS[k[0]]); }
    if (k[0] === "0" || k[1] === "e") b.classList.add("calc-large");
    b.addEventListener("click", function () { action(k[1], k[0]); });
    pave.appendChild(b);
  });
  function action(t, v) {
    if (t === "d") chiffre(v); else if (t === "v") virgule(); else if (t === "o") operation(v);
    else if (t === "e") egal(); else if (t === "c") effacerTout(); else if (t === "b") effacer();
    afficher();
  }
  document.addEventListener("keydown", function (e) {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var k = e.key, t = null, v = null;
    if (/^[0-9]$/.test(k)) { t = "d"; v = k; }
    else if (k === "." || k === ",") t = "v";
    else if (k === "+") { t = "o"; v = "+"; } else if (k === "-") { t = "o"; v = "−"; }
    else if (k === "*" || k === "x") { t = "o"; v = "×"; } else if (k === "/") { t = "o"; v = "÷"; }
    else if (k === "Enter" || k === "=") t = "e"; else if (k === "Backspace") t = "b"; else if (k === "Escape" || k === "Delete") t = "c";
    if (t) { e.preventDefault(); action(t, v); }
  });
  afficher();
})();
