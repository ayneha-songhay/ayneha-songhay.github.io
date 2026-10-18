/* AYNEHA Keyboard - version web
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later
   Reconstruit à partir du clavier Android AynehaKeyboard (même configuration de touches).
   Police Ayneha Pro, nouvelle plage U+10FF7C-U+10FFDD (plan 16) : un caractère occupe
   2 unités UTF-16, l'effacement retire donc un point de code entier.
   La zone de composition affiche le texte de droite à gauche (CSS bidi-override) ;
   le bouton Copier encadre chaque glyphe par RLO...PDF, comme l'application Android. */

(function () {
  "use strict";

  var LAYOUT_VIEWS = {"alphabet": {"title": "Clavier Principal AYNEHA RTL (Format 10-10-7)", "direction": "rtl", "rendering_rule": "Render items in array from RIGHT to LEFT on screen.", "rows": [{"row_index": 1, "visual_order": "RIGHT_TO_LEFT", "description": "Index 0 = Extrême Droite (A). Index 9 = Extrême Gauche (W).", "keys": [{"label": "A", "pua": "U+10FF9C", "long_press_variants": [{"label": "AA", "pua": "U+10FFA1"}, {"label": "Ã", "pua": "U+10FFA2"}]}, {"label": "F", "pua": "U+10FF89", "long_press_variants": [{"label": "FF", "pua": "U+10FFB3"}, {"label": "F°", "pua": "U+10FFB4"}]}, {"label": "E", "pua": "U+10FF9D", "long_press_variants": [{"label": "EE", "pua": "U+10FFA3"}, {"label": "Ẽ", "pua": "U+10FFA4"}, {"label": "È", "pua": "U+10FFA5"}]}, {"label": "O", "pua": "U+10FF9F", "long_press_variants": [{"label": "OO", "pua": "U+10FFA8"}, {"label": "Õ", "pua": "U+10FFA9"}, {"label": "Ò", "pua": "U+10FFAA"}]}, {"label": "P", "pua": "U+10FF87", "long_press_variants": [{"label": "PP", "pua": "U+10FFAF"}, {"label": "P°", "pua": "U+10FFB0"}]}, {"label": "I", "pua": "U+10FF9E", "long_press_variants": [{"label": "II", "pua": "U+10FFA6"}, {"label": "Ĩ", "pua": "U+10FFA7"}]}, {"label": "S", "pua": "U+10FF90", "long_press_variants": [{"label": "SS", "pua": "U+10FFC1"}, {"label": "S°", "pua": "U+10FFC2"}]}, {"label": "TS", "pua": "U+10FF93", "long_press_variants": [{"label": "TSTS", "pua": "U+10FFC6"}]}, {"label": "L", "pua": "U+10FF8E", "long_press_variants": [{"label": "LL", "pua": "U+10FFBD"}, {"label": "L°", "pua": "U+10FFBE"}]}, {"label": "W", "pua": "U+10FF8A", "long_press_variants": [{"label": "WW", "pua": "U+10FFB5"}, {"label": "W°", "pua": "U+10FFB6"}]}]}, {"row_index": 2, "visual_order": "RIGHT_TO_LEFT", "description": "Index 0 = Extrême Droite (A). Index 9 = Extrême Gauche (Σ).", "keys": [{"label": "H", "pua": "U+10FF9A", "long_press_variants": []}, {"label": "M", "pua": "U+10FF88", "long_press_variants": [{"label": "MM", "pua": "U+10FFB1"}, {"label": "M°", "pua": "U+10FFB2"}]}, {"label": "N", "pua": "U+10FF8D", "long_press_variants": [{"label": "NN", "pua": "U+10FFBB"}, {"label": "N°", "pua": "U+10FFBC"}]}, {"label": "B", "pua": "U+10FF86", "long_press_variants": [{"label": "BB", "pua": "U+10FFAD"}, {"label": "B°", "pua": "U+10FFAE"}]}, {"label": "T", "pua": "U+10FF8C", "long_press_variants": [{"label": "TT", "pua": "U+10FFB9"}, {"label": "T°", "pua": "U+10FFBA"}]}, {"label": "K", "pua": "U+10FF99", "long_press_variants": [{"label": "KK", "pua": "U+10FFCF"}, {"label": "K°", "pua": "U+10FFD0"}]}, {"label": "R", "pua": "U+10FF8F", "long_press_variants": [{"label": "RR", "pua": "U+10FFBF"}, {"label": "R°", "pua": "U+10FFC0"}]}, {"label": "U", "pua": "U+10FFA0", "long_press_variants": [{"label": "UU", "pua": "U+10FFAB"}, {"label": "Ũ", "pua": "U+10FFAC"}]}, {"label": "D", "pua": "U+10FF8B", "long_press_variants": [{"label": "DD", "pua": "U+10FFB7"}, {"label": "D°", "pua": "U+10FFB8"}]}, {"label": "Σ", "pua": "U+10FF92", "long_press_variants": [{"label": "ΣΣ", "pua": "U+10FFC5"}]}]}, {"row_index": 3, "visual_order": "RIGHT_TO_LEFT", "description": "Index 0 = Extrême Droite (Effacer ⌦). Index 8 = Extrême Gauche (Entrée/Retour ↴).", "keys": [{"type": "action", "action": "backspace", "label": "⌦", "unicode": null, "width": 1.25}, {"label": "Z", "pua": "U+10FF91", "long_press_variants": [{"label": "ZZ", "pua": "U+10FFC3"}, {"label": "Z°", "pua": "U+10FFC4"}]}, {"label": "J", "pua": "U+10FF94", "long_press_variants": [{"label": "JJ", "pua": "U+10FFC7"}]}, {"label": "DJ", "pua": "U+10FF95", "long_press_variants": [{"label": "DJDJ", "pua": "U+10FFC8"}, {"label": "DJ°", "pua": "U+10FFC9"}]}, {"label": "Ɲ", "pua": "U+10FF96", "long_press_variants": [{"label": "ƝƝ", "pua": "U+10FFCA"}]}, {"label": "Y", "pua": "U+10FF97", "long_press_variants": [{"label": "YY", "pua": "U+10FFCB"}, {"label": "Y°", "pua": "U+10FFCC"}]}, {"label": "G", "pua": "U+10FF98", "long_press_variants": [{"label": "GG", "pua": "U+10FFCD"}, {"label": "G°", "pua": "U+10FFCE"}]}, {"label": "Ŋ", "pua": "U+10FF9B", "long_press_variants": [{"label": "ŊŊ", "pua": "U+10FFD1"}, {"label": "Ŋ°", "pua": "U+10FFD2"}]}, {"type": "action", "action": "enter", "label": "↴", "unicode": null, "width": 1.25}]}, {"row_index": 4, "visual_order": "RIGHT_TO_LEFT", "description": "Ordre visuel gauche->droite : switch, virgule, emoji, espace, point, entrée (bascule/entrée non mirroirés, cf. AynehaToolbarView/mockups).", "keys": [{"type": "action", "action": "enter", "label": "↴", "width": 1.5}, {"label": ".", "unicode": "U+002E", "width": 1.0}, {"type": "space", "label": "AYNEHA", "unicode": "U+0020", "width": 4.5}, {"type": "switch_view", "target_view": "emoji", "label": "😊", "width": 1.0}, {"label": "⹁", "pua": "U+10FFDC", "width": 1.0}, {"type": "switch_view", "target_view": "symbols_page1", "label": "؟321", "width": 1.5}]}]}, "symbols_page1": {"title": "Page Symboles et Chiffres AYNEHA", "direction": "rtl", "rows": [{"row_index": 1, "visual_order": "RIGHT_TO_LEFT", "description": "Chiffres en ordre RTL (1 à droite, 0 à gauche)", "keys": [{"label": "1", "pua": "U+10FF7D"}, {"label": "2", "pua": "U+10FF7E"}, {"label": "3", "pua": "U+10FF7F"}, {"label": "4", "pua": "U+10FF80"}, {"label": "5", "pua": "U+10FF81"}, {"label": "6", "pua": "U+10FF82"}, {"label": "7", "pua": "U+10FF83"}, {"label": "8", "pua": "U+10FF84"}, {"label": "9", "pua": "U+10FF85"}, {"label": "0", "pua": "U+10FF7C"}], "mirror": true}, {"row_index": 2, "visual_order": "RIGHT_TO_LEFT", "keys": [{"label": "⁏", "pua": "U+10FFDD"}, {"label": "'", "unicode": "U+0027", "mirror": true}, {"label": ":", "unicode": "U+003A"}, {"label": "...", "unicode": "U+2026"}, {"label": "!", "unicode": "U+0021"}, {"label": "؟", "unicode": "U+061F"}, {"label": "»", "unicode": "U+00BB"}, {"label": "«", "unicode": "U+00AB"}, {"label": "(", "unicode": "U+0028"}, {"label": ")", "unicode": "U+0029"}], "mirror": true}, {"row_index": 3, "visual_order": "RIGHT_TO_LEFT", "keys": [{"type": "switch_view", "target_view": "numpad", "label": "=\\<", "width": 1.25}, {"label": "@", "unicode": "U+0040"}, {"label": "#", "unicode": "U+0023"}, {"label": "€", "unicode": "U+20AC"}, {"label": "&", "unicode": "U+0026"}, {"label": "_", "unicode": "U+005F"}, {"label": "%", "unicode": "U+0025"}, {"label": "+", "unicode": "U+002B"}, {"label": "-", "unicode": "U+002D"}, {"label": "/", "unicode": "U+002F"}, {"type": "action", "action": "backspace", "label": "⌦", "unicode": null, "width": 1.25}], "mirror": true}, {"row_index": 4, "visual_order": "RIGHT_TO_LEFT", "keys": [{"type": "action", "action": "enter", "label": "↴", "width": 1.5}, {"label": ".", "unicode": "U+002E", "width": 1.0}, {"type": "space", "label": "AYNEHA", "unicode": "U+0020", "width": 4.5}, {"type": "switch_view", "target_view": "emoji", "label": "😊", "width": 1.0}, {"label": "⹁", "pua": "U+10FFDC", "width": 1.0}, {"type": "switch_view", "target_view": "alphabet", "label": "IEA", "width": 1.5}]}]}, "numpad": {"title": "Pavé Numérique AYNEHA RTL", "direction": "rtl", "rows": [{"row_index": 1, "visual_order": "RIGHT_TO_LEFT", "keys": [{"label": "1", "pua": "U+10FF7D"}, {"label": "2", "pua": "U+10FF7E"}, {"label": "3", "pua": "U+10FF7F"}, {"label": "÷", "unicode": "U+00F7"}], "mirror": true}, {"row_index": 2, "visual_order": "RIGHT_TO_LEFT", "keys": [{"label": "4", "pua": "U+10FF80"}, {"label": "5", "pua": "U+10FF81"}, {"label": "6", "pua": "U+10FF82"}, {"label": "×", "unicode": "U+00D7"}], "mirror": true}, {"row_index": 3, "visual_order": "RIGHT_TO_LEFT", "keys": [{"label": "7", "pua": "U+10FF83"}, {"label": "8", "pua": "U+10FF84"}, {"label": "9", "pua": "U+10FF85"}, {"label": "+", "unicode": "U+002B"}], "mirror": true}, {"row_index": 4, "visual_order": "RIGHT_TO_LEFT", "keys": [{"label": ".", "unicode": "U+002E"}, {"label": "0", "pua": "U+10FF7C"}, {"label": "%", "unicode": "U+0025"}, {"label": "-", "unicode": "U+002D"}], "mirror": true}, {"row_index": 5, "keys": [{"type": "action", "action": "enter", "label": "↴", "width": 1.5}, {"type": "char", "label": ".", "unicode": "U+002E", "width": 1.0}, {"type": "space", "label": "AYNEHA", "width": 4.5}, {"type": "switch_view", "target_view": "emoji", "label": "😊", "width": 1.0}, {"type": "char", "label": "⹁", "pua": "U+10FFDC", "width": 1.0}, {"type": "switch_view", "target_view": "alphabet", "label": "IEA", "width": 1.5}]}]}, "emoji": {"title": "Page Emoji AYNEHA", "rows": [{"row_index": 1, "mirror": false, "keys": [{"type": "char", "label": "😀"}, {"type": "char", "label": "😃"}, {"type": "char", "label": "😄"}, {"type": "char", "label": "😁"}, {"type": "char", "label": "😆"}, {"type": "char", "label": "😅"}, {"type": "char", "label": "😂"}, {"type": "char", "label": "🤣"}]}, {"row_index": 2, "mirror": false, "keys": [{"type": "char", "label": "😊"}, {"type": "char", "label": "😇"}, {"type": "char", "label": "🙂"}, {"type": "char", "label": "🙃"}, {"type": "char", "label": "😉"}, {"type": "char", "label": "😌"}, {"type": "char", "label": "😍"}, {"type": "char", "label": "🥰"}]}, {"row_index": 3, "mirror": false, "keys": [{"type": "char", "label": "😘"}, {"type": "char", "label": "😗"}, {"type": "char", "label": "😙"}, {"type": "char", "label": "😚"}, {"type": "char", "label": "😋"}, {"type": "char", "label": "😛"}, {"type": "char", "label": "😝"}, {"type": "char", "label": "😜"}]}, {"row_index": 4, "mirror": false, "keys": [{"type": "char", "label": "🤪"}, {"type": "char", "label": "🤨"}, {"type": "char", "label": "🧐"}, {"type": "char", "label": "🤓"}, {"type": "char", "label": "😎"}, {"type": "char", "label": "🥳"}, {"type": "char", "label": "😏"}, {"type": "char", "label": "😒"}]}, {"row_index": 5, "mirror": false, "keys": [{"type": "char", "label": "😞"}, {"type": "char", "label": "😔"}, {"type": "char", "label": "😟"}, {"type": "char", "label": "😕"}, {"type": "char", "label": "🙁"}, {"type": "char", "label": "☹️"}, {"type": "char", "label": "😣"}, {"type": "char", "label": "😢"}]}, {"row_index": 6, "keys": [{"type": "action", "action": "enter", "label": "↴", "width": 1.5}, {"type": "char", "label": ".", "unicode": "U+002E", "width": 1.0}, {"type": "space", "label": "AYNEHA", "width": 4.5}, {"type": "switch_view", "target_view": "emoji", "label": "😊", "width": 1.0}, {"type": "char", "label": "⹁", "pua": "U+10FFDC", "width": 1.0}, {"type": "switch_view", "target_view": "alphabet", "label": "IEA", "width": 1.5}]}]}};

  function puaToString(code) {
    // code au format "U+10FF9C"
    var cp = parseInt(code.replace("U+", ""), 16);
    return String.fromCodePoint(cp);
  }

  // Libellés des touches spéciales, en ordre visuel (le bouton s'affiche de gauche à droite).
  var SYMBOLS_SWITCH = "\u061F" + ["U+10FF7F", "U+10FF7E", "U+10FF7D"].map(puaToString).join("");
  var ALPHABET_SWITCH = ["U+10FF9E", "U+10FF9D", "U+10FF9C"].map(puaToString).join("");
  // Barre d'espace : le mot « ayneha » (A, Y muette, N, E, H, A), en ordre visuel.
  var SPACE_LABEL = ["U+10FF9C", "U+10FFCC", "U+10FF8D", "U+10FF9D", "U+10FF9A", "U+10FF9C"]
    .map(puaToString).reverse().join("");

  function displayGlyph(key) {
    if (key.type === "switch_view" && key.target_view === "symbols_page1") return SYMBOLS_SWITCH;
    if (key.type === "switch_view" && key.target_view === "alphabet") return ALPHABET_SWITCH;
    if ((!key.type || key.type === "char") && key.pua) return puaToString(key.pua);
    if ((!key.type || key.type === "char") && key.unicode) return puaToString(key.unicode);
    if (key.type === "space") return SPACE_LABEL;
    return key.label || "";
  }

  function keyInsertText(key) {
    if (!key.type || key.type === "char") {
      if (key.pua) return puaToString(key.pua);
      if (key.unicode) return puaToString(key.unicode);
      return key.label || "";
    }
    if (key.type === "space") {
      return key.unicode ? puaToString(key.unicode) : " ";
    }
    return ""; // action / switch_view : ne saisissent rien directement
  }

  function variantInsertText(v) {
    return v.pua ? puaToString(v.pua) : (v.label || "");
  }

  function isBottomBarRow(row) {
    return row.keys.some(function (k) { return k.type === "space"; });
  }

  // Ordre visuel d'une rangée : les rangées de lettres/chiffres/accents se lisent
  // de droite à gauche (keys[0] = touche la plus à droite) : c'est la rangée du bas
  // (celle qui contient la barre d'espace) et les rangées explicitement "mirror": false
  // (page emoji) qui se lisent, elles, naturellement de gauche à droite.
  function rowIsRtl(row) {
    if (isBottomBarRow(row)) return false;
    if (row.mirror === false) return false;
    return true;
  }

  function AynehaKeyboard(root, composer) {
    this.root = root;
    this.composer = composer;
    this.currentView = "alphabet";
    this.longPressTimer = null;
    this.activePopup = null;
    this.render();
  }

  AynehaKeyboard.prototype.switchToView = function (viewId) {
    if (!LAYOUT_VIEWS[viewId]) return;
    this.currentView = viewId;
    this.render();
  };

  AynehaKeyboard.prototype.render = function () {
    var self = this;
    var view = LAYOUT_VIEWS[this.currentView];
    this.root.innerHTML = "";
    this.closePopup();

    view.rows.forEach(function (row) {
      var rowEl = document.createElement("div");
      rowEl.className = "ak-row" + (isBottomBarRow(row) ? " ak-row-bottom" : "");
      rowEl.style.direction = rowIsRtl(row) ? "rtl" : "ltr";

      row.keys.forEach(function (key) {
        rowEl.appendChild(self.createKeyEl(key));
      });

      self.root.appendChild(rowEl);
    });
  };

  AynehaKeyboard.prototype.createKeyEl = function (key) {
    var self = this;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ak-key";
    if (key.type === "action") btn.classList.add("ak-key-action");
    if (key.type === "switch_view") btn.classList.add("ak-key-action");
    if (key.action === "enter") btn.classList.add("ak-key-enter");
    if (key.type === "space") btn.classList.add("ak-key-space");
    btn.style.flexGrow = String(key.width || 1);

    if (key.action === "backspace") {
      btn.innerHTML = "&#9003;";
      btn.classList.add("ak-icon");
    } else if (key.action === "enter") {
      btn.innerHTML = "<span class=\"ak-icon-mirror\">&#8626;</span>";
      btn.classList.add("ak-icon");
    } else {
      var span = document.createElement("span");
      span.className = "ak-glyph";
      if (key.mirror) span.classList.add("ak-mirror");
      span.textContent = displayGlyph(key);
      btn.appendChild(span);
    }

    if (key.long_press_variants && key.long_press_variants.length) {
      btn.classList.add("ak-has-variants");
    }

    // Interaction : tap = insère / déclenche l'action. Appui long (si variantes) = popup.
    var pressTimer = null;
    var longPressed = false;

    function startPress(e) {
      e.preventDefault();
      longPressed = false;
      btn.classList.add("ak-pressed");
      if (key.long_press_variants && key.long_press_variants.length) {
        pressTimer = setTimeout(function () {
          longPressed = true;
          self.showVariants(btn, key);
        }, 420);
      }
    }

    function endPress(e) {
      btn.classList.remove("ak-pressed");
      clearTimeout(pressTimer);
      if (self.activePopup) return; // le choix se fait dans le popup lui-même
      if (!longPressed) {
        self.handleKeyTap(key);
      }
    }

    function cancelPress() {
      btn.classList.remove("ak-pressed");
      clearTimeout(pressTimer);
    }

    btn.addEventListener("pointerdown", startPress);
    btn.addEventListener("pointerup", endPress);
    btn.addEventListener("pointerleave", cancelPress);
    btn.addEventListener("pointercancel", cancelPress);
    btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    return btn;
  };

  AynehaKeyboard.prototype.showVariants = function (keyEl, key) {
    this.closePopup();
    var self = this;
    var popup = document.createElement("div");
    popup.className = "ak-popup";

    key.long_press_variants.forEach(function (variant) {
      var vBtn = document.createElement("button");
      vBtn.type = "button";
      vBtn.className = "ak-popup-key";
      var span = document.createElement("span");
      span.className = "ak-glyph";
      span.textContent = variant.pua ? puaToString(variant.pua) : variant.label;
      vBtn.appendChild(span);
      vBtn.addEventListener("pointerdown", function (e) { e.preventDefault(); });
      vBtn.addEventListener("click", function () {
        self.insertText(variantInsertText(variant));
        self.closePopup();
      });
      popup.appendChild(vBtn);
    });

    keyEl.appendChild(popup);
    this.activePopup = popup;

    var closeOnce = function () {
      self.closePopup();
      document.removeEventListener("pointerdown", outsideClick, true);
    };
    var outsideClick = function (e) {
      if (!popup.contains(e.target)) closeOnce();
    };
    setTimeout(function () {
      document.addEventListener("pointerdown", outsideClick, true);
    }, 0);
  };

  AynehaKeyboard.prototype.closePopup = function () {
    if (this.activePopup && this.activePopup.parentNode) {
      this.activePopup.parentNode.removeChild(this.activePopup);
    }
    this.activePopup = null;
  };

  AynehaKeyboard.prototype.handleKeyTap = function (key) {
    if (key.type === "switch_view") {
      this.switchToView(key.target_view);
      return;
    }
    if (key.type === "action") {
      if (key.action === "backspace") this.backspace();
      if (key.action === "enter") this.insertText("\n");
      return;
    }
    this.insertText(keyInsertText(key));
  };

  AynehaKeyboard.prototype.insertText = function (text) {
    var el = this.composer;
    el.focus();
    var start = el.selectionStart;
    var end = el.selectionEnd;
    var value = el.value;
    el.value = value.slice(0, start) + text + value.slice(end);
    var pos = start + text.length;
    el.selectionStart = el.selectionEnd = pos;
    el.dispatchEvent(new Event("input"));
  };

  AynehaKeyboard.prototype.backspace = function () {
    var el = this.composer;
    el.focus();
    var start = el.selectionStart;
    var end = el.selectionEnd;
    var value = el.value;
    if (start !== end) {
      el.value = value.slice(0, start) + value.slice(end);
      el.selectionStart = el.selectionEnd = start;
      return;
    }
    if (start === 0) return;
    // Retire un point de code entier (paire de substitution pour l'AYNEHA).
    var delLen = 1;
    var lo = value.charCodeAt(start - 1);
    if (start >= 2 && lo >= 0xDC00 && lo <= 0xDFFF) {
      var hi = value.charCodeAt(start - 2);
      if (hi >= 0xD800 && hi <= 0xDBFF) delLen = 2;
    }
    var from = start - delLen;
    el.value = value.slice(0, from) + value.slice(start);
    el.selectionStart = el.selectionEnd = from;
    el.dispatchEvent(new Event("input"));
  };

  window.AynehaKeyboard = AynehaKeyboard;
})();
