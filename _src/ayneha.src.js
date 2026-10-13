/* AYNEHA - fonctions communes du site (écriture, chiffres, transcription).
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later

   Police Ayneha Pro, nouvelle plage U+10FF7C-U+10FFDD (plan 16).
   Un caractère AYNEHA = 2 unités UTF-16 (paire de substitution) : on manipule
   toujours des points de code (Array.from, codePointAt), jamais des unités.
   Le texte est gardé dans l'ordre logique ; l'affichage de droite à gauche est
   confié au CSS (direction: rtl ; unicode-bidi: bidi-override). */
(function () {
  "use strict";

  var CP = /*@@CP@@*/{};
  var LATIN = /*@@LATIN@@*/{};

  function ch(name) { return String.fromCodePoint(CP[name]); }

  /* ---------- Chiffres ---------- */
  function digits(str) {
    return String(str).replace(/[0-9]/g, function (d) { return ch("D" + d); });
  }

  /* ---------- Transcription latin -> AYNEHA ----------
     Reprise du transcripteur web officiel, avec les règles de l'auteur
     du 13 octobre 2026 (déjà appliquées dans AYNEHA School) :
       - « gn » + voyelle s'écrit G muette + N + voyelle (et non plus Ɲ) ;
       - « ng » s'écrit N muette + G ; Ŋ s'obtient seulement avec la lettre ŋ ;
       - è = ɛ et ô = ɔ (E et O ouverts). */
  var SINGLE_CONS = {
    b: "B", p: "P", m: "M", f: "F", w: "W", v: "W", d: "D", t: "T", n: "N", l: "L",
    r: "R", s: "S", z: "Z", c: "TS", j: "J", y: "Y", g: "G", k: "K", h: "H",
    "š": "SH", "ŋ": "NG", "ɲ": "GN"
  };
  var VOWEL_LETTERS = ["a", "e", "i", "o", "u"];
  var OPEN_VOWEL_MAP = { "ɛ": "E", "ɔ": "O" };
  var DIRECT_NASAL = { "ã": "A", "ẽ": "E", "ĩ": "I", "õ": "O", "ũ": "U" };
  var SPECIAL = ["š", "ŋ", "ɲ", "ɛ", "ɔ", "ã", "ẽ", "ĩ", "õ", "ũ"];

  function isLetter(c) {
    if (!c) return false;
    c = c.toLowerCase();
    return /[a-z]/.test(c) || SPECIAL.indexOf(c) >= 0;
  }
  function isVowel(c) {
    if (!c) return false;
    c = c.toLowerCase();
    return VOWEL_LETTERS.indexOf(c) >= 0 || c === "ɛ" || c === "ɔ" || DIRECT_NASAL[c] !== undefined;
  }

  function tokenize(word) {
    var w = Array.from(word.toLowerCase());
    var raw = Array.from(word);
    var n = w.length, i = 0, tokens = [];
    function at(k) { return k < n ? w[k] : ""; }
    function cons(len, name) {
      var a = w.slice(i, i + len).join(""), b = w.slice(i + len, i + 2 * len).join("");
      if (a === b) { tokens.push({ t: "C", b: name, m: "d", r: raw.slice(i, i + 2 * len).join("") }); i += 2 * len; }
      else { tokens.push({ t: "C", b: name, m: null, r: raw.slice(i, i + len).join("") }); i += len; }
    }
    while (i < n) {
      var c0 = at(i), c1 = at(i + 1), c2 = at(i + 2);
      if (DIRECT_NASAL[c0]) { tokens.push({ t: "V", b: DIRECT_NASAL[c0], m: "n", r: raw[i] }); i++; continue; }
      if (OPEN_VOWEL_MAP[c0]) {
        if (c1 === c0) { tokens.push({ t: "V", b: OPEN_VOWEL_MAP[c0], m: "o", r: raw[i] + raw[i + 1] }); i += 2; }
        else { tokens.push({ t: "V", b: OPEN_VOWEL_MAP[c0], m: "o", r: raw[i] }); i++; }
        continue;
      }
      if (c0 === "t" && c1 === "c" && c2 === "h") { cons(3, "TS"); continue; }
      if (c0 === "s" && c1 === "h") { cons(2, "SH"); continue; }
      if (c0 === "d" && c1 === "j") { cons(2, "DJ"); continue; }
      if (c0 === "n" && c1 === "y" && isVowel(c2)) { cons(2, "GN"); continue; }
      if (c0 === "n" && c1 === "i" && isVowel(c2) && c2 !== "i") { cons(2, "GN"); continue; }
      if (c0 === "d" && c1 === "i" && isVowel(c2) && c2 !== "i") { cons(2, "DJ"); continue; }
      if (VOWEL_LETTERS.indexOf(c0) >= 0) {
        var v = c0.toUpperCase();
        if (c1 === c0) { tokens.push({ t: "V", b: v, m: "d", r: raw[i] + raw[i + 1] }); i += 2; continue; }
        if (c1 === "n") {
          var finalLong = (i + 2 === n) && n > 3;
          if (c2 !== "n" && !isVowel(c2) && !finalLong) {
            tokens.push({ t: "V", b: v, m: "n", r: raw[i] + raw[i + 1] }); i += 2; continue;
          }
        }
        tokens.push({ t: "V", b: v, m: null, r: raw[i] }); i++; continue;
      }
      if (SINGLE_CONS[c0]) {
        var cn = SINGLE_CONS[c0];
        if (c1 === c0) { tokens.push({ t: "C", b: cn, m: "d", r: raw[i] + raw[i + 1] }); i += 2; }
        else { tokens.push({ t: "C", b: cn, m: null, r: raw[i] }); i++; }
        continue;
      }
      i++;
    }
    for (var k = 0; k < tokens.length; k++) {
      var tk = tokens[k];
      if (tk.t === "C" && tk.m === null) {
        var nx = tokens[k + 1];
        if (!nx || nx.t !== "V") tk.m = "m";
      }
    }
    return tokens;
  }

  function tokenName(tk) {
    var name = tk.b;
    if (tk.m === "d" && (CP[tk.b + ":d"])) name = tk.b + ":d";
    else if (tk.m === "n" && CP[tk.b + ":n"]) name = tk.b + ":n";
    else if (tk.m === "o" && CP[tk.b + ":o"]) name = tk.b + ":o";
    else if (tk.m === "m" && CP[tk.b + ":m"]) name = tk.b + ":m";
    return name;
  }

  /* Transcrit un texte. Renvoie { text, words } : text en ordre logique
     (lignes séparées par \n), words = détail mot par mot pour l'explication. */
  function transcribe(input) {
    var src = String(input).normalize("NFC")
      .replace(/ɛ̃/g, "ẽ").replace(/ɔ̃/g, "õ")
      .replace(/[èê]/g, "ɛ").replace(/[ÈÊ]/g, "Ɛ").replace(/ô/g, "ɔ").replace(/Ô/g, "Ɔ");
    var words = [];
    var lines = src.split("\n").map(function (line) {
      var out = "", buf = "", kind = null;
      function flush() {
        if (!buf) return;
        if (kind === "L") {
          var tks = tokenize(buf);
          words.push({ latin: buf, tokens: tks });
          tks.forEach(function (tk) { out += ch(tokenName(tk)); });
        } else if (kind === "D") {
          out += digits(buf);
        } else {
          Array.from(buf).forEach(function (c) {
            if (c === ",") out += ch(",");
            else if (c === ";") out += ch(";");
            else if (c === "?") out += "؟";
            else out += c;
          });
        }
        buf = "";
      }
      Array.from(line).forEach(function (c) {
        var k = isLetter(c) ? "L" : (/[0-9]/.test(c) ? "D" : "O");
        if (k !== kind) { flush(); kind = k; }
        buf += c;
      });
      flush();
      return out;
    });
    return { text: lines.join("\n"), words: words };
  }

  /* Explication d'un mot, en français simple. */
  var MOD_LABEL = { d: "double", n: "nasalisée", o: "ouverte", m: "muette" };
  function explain(tk) {
    var name = tokenName(tk);
    var label = LATIN[tk.b] ? LATIN[tk.b].label : tk.b;
    var why = "";
    if (tk.t === "V") {
      if (tk.m === "n") why = "voyelle suivie d'un n simple : voyelle nasalisée";
      else if (tk.m === "d") why = "voyelle doublée : accent double";
      else if (tk.m === "o") why = "voyelle ouverte";
      else why = "voyelle simple";
    } else {
      if (tk.m === "d") why = "lettre doublée : accent double";
      else if (tk.m === "m") {
        why = CP[tk.b + ":m"] ? "pas suivie d'une voyelle : consonne muette" : "pas suivie d'une voyelle (cette lettre ne porte pas l'accent muet)";
      } else why = "suivie d'une voyelle : forme initiale";
    }
    return { glyph: ch(name), raw: tk.r, label: label + (tk.m && name !== tk.b ? " " + MOD_LABEL[tk.m] : ""), why: why };
  }

  /* Pour coller le texte ailleurs (WhatsApp, Word...) : chaque glyphe AYNEHA est
     encadré par RLO...PDF, comme dans le clavier Android, pour s'afficher de droite
     à gauche dans les applications qui ont la police. */
  function forPaste(text) {
    return Array.from(text).map(function (c) {
      var cp = c.codePointAt(0);
      return (cp >= 0x10FF7C && cp <= 0x10FFDD) ? "‮" + c + "‬" : c;
    }).join("");
  }

  /* Ordre visuel d'une ligne (pour le dessin sur canvas, qui ignore bidi-override). */
  var MIRROR = { "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "«": "»", "»": "«", "<": ">", ">": "<" };
  function visualLine(line) {
    return Array.from(line).reverse().map(function (c) { return MIRROR[c] || c; }).join("");
  }

  /* Enregistre un texte AYNEHA en image PNG : fond blanc, texte noir de droite à
     gauche, en-tête orange (comme le bouton Partager du clavier Android). */
  function enImage(texte, fini) {
    var taille = 64, marge = 56, largeur = 1080, interligne = Math.round(taille * 1.5);
    document.fonts.load(taille + 'px "Ayneha Pro"').then(function () {
      var c = document.createElement("canvas");
      var ctx = c.getContext("2d");
      ctx.font = taille + 'px "Ayneha Pro"';
      var lignes = [];
      texte.split("\n").forEach(function (para) {
        var mots = para.split(" ").filter(function (m) { return m.length; });
        if (!mots.length) { lignes.push(""); return; }
        var courante = "";
        mots.forEach(function (m) {
          var essai = courante ? courante + " " + m : m;
          if (ctx.measureText(visualLine(essai)).width > largeur - 2 * marge && courante) { lignes.push(courante); courante = m; }
          else courante = essai;
        });
        lignes.push(courante);
      });
      var haut = 150, bas = 90;
      c.width = largeur;
      c.height = haut + lignes.length * interligne + bas;
      ctx = c.getContext("2d");
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#FF6600";
      ctx.font = '600 40px Jost, sans-serif';
      ctx.fillText("AYNEHA", marge, 84);
      var titre = visualLine(transcribe("ayneha").text);
      ctx.font = '48px "Ayneha Pro"';
      ctx.fillText(titre, largeur - marge - ctx.measureText(titre).width, 88);
      ctx.fillStyle = "#18213A";
      ctx.font = taille + 'px "Ayneha Pro"';
      lignes.forEach(function (l, i) {
        var vis = visualLine(l);
        ctx.fillText(vis, largeur - marge - ctx.measureText(vis).width, haut + interligne * (i + 0.8));
      });
      ctx.fillStyle = "#7A8296";
      ctx.font = '24px Jost, sans-serif';
      ctx.fillText(location.hostname || "ayneha-songhay.github.io", marge, c.height - 36);
      c.toBlob(function (blob) {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ayneha-texte.png";
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
        if (fini) fini();
      }, "image/png");
    });
  }

  window.Ayneha = {
    CP: CP, ch: ch, digits: digits, transcribe: transcribe, explain: explain,
    tokenName: tokenName, forPaste: forPaste, visualLine: visualLine, enImage: enImage
  };
})();
