/* AYNEHA - verrou du site de test (Netlify). Ne s'active que sur *.netlify.app :
   le vrai site (GitHub Pages, ayneha.org) n'est jamais concerné.
   À retirer quand le site de test ne sert plus.
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  if (!/\.netlify\.app$/.test(location.hostname)) return;
  var EMPREINTE = "0eb71b912dd8593ada1e96af7411870b2970cf0ba504570962e7d4bb9803edcf";
  var CLE = "ayneha-essai-ok";
  try { if (localStorage.getItem(CLE) === EMPREINTE) return; } catch (e) { /* rien */ }
  var racine = document.documentElement;
  racine.classList.add("verrou");
  var style = document.createElement("style");
  style.textContent = "html.verrou body > *:not(#verrou){display:none!important}" +
    "#verrou{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:#0E1A30;font-family:Jost,sans-serif;color:#F5EDDF}" +
    "#verrou form{width:100%;max-width:380px;background:#142441;border:1px solid #2A426C;border-radius:20px;padding:28px;text-align:center}" +
    "#verrou h1{font-size:1.5rem;margin:0 0 8px}#verrou p{color:#A8B3C7;margin:0 0 18px;font-size:.98rem}" +
    "#verrou input{width:100%;box-sizing:border-box;font:inherit;font-size:1.05rem;padding:12px 14px;border-radius:12px;border:2px solid #2A426C;background:#FFFCF6;color:#18213A}" +
    "#verrou button{margin-top:14px;width:100%;font:inherit;font-weight:600;font-size:1rem;padding:12px;border-radius:999px;border:0;background:#F07C22;color:#0E1A30;cursor:pointer}" +
    "#verrou .erreur{color:#FFA35A;min-height:1.3em;margin:10px 0 0;font-size:.92rem}";
  document.head.appendChild(style);

  function hacher(t) {
    var octets = new TextEncoder().encode(t);
    return crypto.subtle.digest("SHA-256", octets).then(function (b) {
      return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, "0"); }).join("");
    });
  }
  function monter() {
    var f = document.createElement("div");
    f.id = "verrou";
    f.innerHTML = '<form><h1>Site AYNEHA en test</h1><p>Cette version n’est pas encore publique. Entrez le mot de passe qu’on vous a donné.</p>' +
      '<input type="password" autocomplete="current-password" aria-label="Mot de passe" placeholder="Mot de passe">' +
      '<button type="submit">Entrer</button><p class="erreur" role="status"></p></form>';
    document.body.appendChild(f);
    var champ = f.querySelector("input"), err = f.querySelector(".erreur");
    champ.focus();
    f.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      hacher(champ.value.trim().toLowerCase()).then(function (h) {
        if (h !== EMPREINTE) { err.textContent = "Mot de passe incorrect. Réessayez."; champ.select(); return; }
        try { localStorage.setItem(CLE, EMPREINTE); } catch (x) { /* rien */ }
        f.remove(); racine.classList.remove("verrou");
      });
    });
  }
  if (document.body) monter(); else document.addEventListener("DOMContentLoaded", monter);
})();
