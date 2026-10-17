/* AYNEHA - « Ma carte AYNEHA » : créer une carte en AYNEHA, la partager,
   la proposer à AYNEHA, et afficher la galerie des cartes validées.
   Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
   SPDX-License-Identifier: GPL-3.0-or-later */
(function () {
  "use strict";
  var A = window.Ayneha;
  if (!A) return;

  var EN = document.documentElement.lang === "en";
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function dateLangue(d) {
    if (!EN) return d;
    var m = /^(\d{1,2}) (\S+) (\d{4})$/.exec(d);
    var k = m ? MOIS.indexOf(m[2].toLowerCase()) : -1;
    return k < 0 ? d : m[1] + " " + MONTHS[k] + " " + m[3];
  }

  function T(fr, en) { return EN ? en : fr; }
  var SITE = "ayneha.org";  // adresse affichée sur les cartes et dans le message de partage
  var CONTACT = "contact@ayneha.org";
  var WHATSAPP = "22366778763";

  /* ------------------------------------------------------------ modèles */
  var MODELES = {
    salut:        { nom: T("Salutation", "Greeting"),     fond: "#0E1A30", texte: "#18213A", latin: "#B24E0B", doux: "#5A6378", pied: "#A8B3C7", accent: "#F07C22", tablette: true },
    fete:         { nom: T("Fête", "Celebration"),           fond: "#123D33", texte: "#F5EDDF", latin: "#E3B34C", doux: "#BFD3C8", pied: "#BFD3C8", accent: "#E3B34C", orn: "etoiles" },
    naissance:    { nom: T("Naissance", "Birth"),      fond: "#F5EDDF", texte: "#18213A", latin: "#2E7D5B", doux: "#5A6378", pied: "#5A6378", accent: "#3E9A72", orn: "points" },
    mariage:      { nom: T("Mariage", "Wedding"),        fond: "#0E1A30", texte: "#F5EDDF", latin: "#E3B34C", doux: "#A8B3C7", pied: "#A8B3C7", accent: "#E3B34C", orn: "cadre" },
    anniversaire: { nom: T("Anniversaire", "Birthday"),   fond: "#F07C22", texte: "#0E1A30", latin: "#0E1A30", doux: "#3B2410", pied: "#3B2410", accent: "#0E1A30", orn: "confettis" },
    condoleances: { nom: T("Condoléances", "Condolences"),   fond: "#26303F", texte: "#EAE3D6", latin: "#A8B3C7", doux: "#A8B3C7", pied: "#8792A6", accent: "#8792A6", orn: "sobre" },
    fierte:       { nom: T("Fierté songhay", "Songhay pride"), fond: "#0E1A30", texte: "#F5EDDF", latin: "#FFA35A", doux: "#A8B3C7", pied: "#A8B3C7", accent: "#F07C22", orn: "frises" }
  };
  var FORMATS = { carre: { nom: T("carré", "square"), ratio: 1 }, statut: { nom: T("statut", "status"), ratio: 16 / 9 } };

  function nettoyer(t) { return String(t || "").replace(/[‪-‮⁦-⁩‎‏]/g, ""); }

  /* ------------------------------------------------------------ dessin */
  function hasard(graine) {
    return function () {
      graine |= 0; graine = graine + 0x6D2B79F5 | 0;
      var t = Math.imul(graine ^ graine >>> 15, 1 | graine);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function couper(ctx, texte, largeur, visuel) {
    var lignes = [];
    texte.split("\n").forEach(function (para) {
      var mots = para.split(/\s+/).filter(function (m) { return m.length; });
      if (!mots.length) return;
      var cour = "";
      mots.forEach(function (m) {
        var essai = cour ? cour + " " + m : m;
        if (cour && ctx.measureText(visuel ? A.visualLine(essai) : essai).width > largeur) { lignes.push(cour); cour = m; }
        else cour = essai;
      });
      lignes.push(cour);
    });
    return lignes;
  }

  function plusLarge(ctx, lignes, visuel) {
    return lignes.reduce(function (mx, l) { return Math.max(mx, ctx.measureText(visuel ? A.visualLine(l) : l).width); }, 0);
  }

  function frise(ctx, y, x0, x1, u, couleur) {
    ctx.save();
    ctx.strokeStyle = couleur; ctx.lineWidth = u * 0.16; ctx.lineJoin = "round";
    var pas = u * 2.8, n = Math.floor((x1 - x0) / pas), dx = x0 + ((x1 - x0) - n * pas) / 2;
    for (var i = 0; i < n; i++) {
      var cx = dx + i * pas + pas / 2;
      ctx.beginPath();
      ctx.moveTo(cx, y - u * 0.6); ctx.lineTo(cx + u * 0.7, y); ctx.lineTo(cx, y + u * 0.6); ctx.lineTo(cx - u * 0.7, y); ctx.closePath();
      ctx.moveTo(cx - pas / 2, y); ctx.lineTo(cx - u * 0.9, y);
      ctx.moveTo(cx + u * 0.9, y); ctx.lineTo(cx + pas / 2, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function etoile(ctx, x, y, r) {
    ctx.beginPath();
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4, rr = i % 2 ? r * 0.32 : r;
      ctx.lineTo(x + Math.sin(a) * rr, y - Math.cos(a) * rr);
    }
    ctx.closePath(); ctx.fill();
  }

  function rondRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  /* Ornements autour de la zone de texte ; ils restent sur les bords. */
  function ornements(ctx, M, W, H, u) {
    var r = hasard(23), i, x, y;
    // en bas, le milieu est réservé au pseudo et à la signature
    function cote(x, y) { return (y > H - u * 11 && x > W * 0.24 && x < W * 0.76) ? (x < W / 2 ? x * 0.35 : W - (W - x) * 0.35) : x; }
    ctx.save();
    if (M.orn === "etoiles") {
      ctx.fillStyle = M.accent;
      for (i = 0; i < 22; i++) {
        x = r() * W; y = r() < 0.5 ? r() * H * 0.16 + u * 2 : H - r() * H * 0.14 - u * 4;
        x = cote(x, y); ctx.globalAlpha = 0.35 + r() * 0.6; etoile(ctx, x, y, u * (0.35 + r() * 0.9));
      }
      ctx.globalAlpha = 0.9; ctx.beginPath();
      ctx.arc(W * 0.86, H * 0.12, u * 2.2, 0, Math.PI * 2); ctx.arc(W * 0.86 + u * 0.9, H * 0.12 - u * 0.5, u * 1.9, 0, Math.PI * 2, true);
      ctx.fill("evenodd");
    } else if (M.orn === "points") {
      ctx.fillStyle = M.accent;
      var p = u * 1.6;
      for (x = p; x < W; x += p) { ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(x, u * 2.2, u * 0.28, 0, 7); ctx.arc(x, H - u * 2.2, u * 0.28, 0, 7); ctx.fill(); }
      for (y = u * 2.2 + p; y < H - u * 2.2; y += p) { ctx.beginPath(); ctx.arc(u * 2.2, y, u * 0.28, 0, 7); ctx.arc(W - u * 2.2, y, u * 0.28, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 0.18;
      for (i = 0; i < 7; i++) { y = r() < 0.5 ? H * 0.1 : H * 0.88; x = cote(r() * W, y); ctx.beginPath(); ctx.arc(x, y, u * (1 + r() * 2.5), 0, 7); ctx.fill(); }
    } else if (M.orn === "cadre") {
      ctx.strokeStyle = M.accent;
      ctx.lineWidth = u * 0.22; rondRect(ctx, u * 1.6, u * 1.6, W - u * 3.2, H - u * 3.2, u * 1.2); ctx.stroke();
      ctx.lineWidth = u * 0.08; rondRect(ctx, u * 2.3, u * 2.3, W - u * 4.6, H - u * 4.6, u * 0.8); ctx.stroke();
      ctx.fillStyle = M.accent;
      [[u * 1.6, u * 1.6], [W - u * 1.6, u * 1.6], [u * 1.6, H - u * 1.6], [W - u * 1.6, H - u * 1.6]].forEach(function (c) {
        ctx.save(); ctx.translate(c[0], c[1]); ctx.rotate(Math.PI / 4); ctx.fillRect(-u * 0.5, -u * 0.5, u, u); ctx.restore();
      });
    } else if (M.orn === "confettis") {
      var cs = ["#0E1A30", "#F5EDDF", "#FFD1A6", "#142441"];
      for (i = 0; i < 46; i++) {
        x = r() * W; y = r() < 0.5 ? r() * H * 0.17 : H - r() * H * 0.15 - u * 3;
        x = cote(x, y); ctx.fillStyle = cs[i % cs.length]; ctx.globalAlpha = 0.55 + r() * 0.4;
        ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3);
        if (i % 3) ctx.fillRect(-u * 0.25, -u * 0.6, u * 0.5, u * 1.2); else { ctx.beginPath(); ctx.arc(0, 0, u * 0.4, 0, 7); ctx.fill(); }
        ctx.restore();
      }
    } else if (M.orn === "sobre") {
      ctx.strokeStyle = M.accent; ctx.lineWidth = u * 0.08; ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.moveTo(W * 0.38, H * 0.12); ctx.lineTo(W * 0.62, H * 0.12); ctx.stroke();
    } else if (M.orn === "frises") {
      for (i = 0; i < 3; i++) {
        frise(ctx, u * (2 + i * 1.7), u * 2, W - u * 2, u * (1 - i * 0.12), M.accent);
        frise(ctx, H - u * (9 + i * 1.7), u * 2, W - u * 2, u * (1 - i * 0.12), M.accent);
      }
    }
    ctx.restore();
  }

  /* d = { modele, format, ayneha, latin, traduction, pseudo, montrerLatin } */
  function dessiner(canvas, d, largeur) {
    var M = MODELES[d.modele] || MODELES.salut;
    var F = FORMATS[d.format] || FORMATS.carre;
    var W = largeur || 1080, H = Math.round(W * F.ratio), u = W / 54;
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = M.fond; ctx.fillRect(0, 0, W, H);

    var marge = u * 5, zoneHaut = H * (F.ratio > 1 ? 0.17 : 0.14), zoneBas = H - u * (d.pseudo ? 9.5 : 7);
    if (M.tablette) {
      frise(ctx, u * 2.2, u * 2, W - u * 2, u, M.accent);
      frise(ctx, H - u * 6, u * 2, W - u * 2, u, M.accent);
      ctx.fillStyle = "#F5EDDF";
      rondRect(ctx, u * 2.5, u * 4.2, W - u * 5, H - u * 12.2, u * 1.4); ctx.fill();
      ctx.fillStyle = "#F07C22"; ctx.fillRect(u * 2.5 + u * 1.4, u * 4.2, W - u * 7.8, u * 0.35);
      zoneHaut = u * 7; zoneBas = H - u * (d.pseudo ? 12.5 : 10);
    } else {
      ornements(ctx, M, W, H, u);
      if (M.orn === "frises") zoneBas = H - u * 13.5;
      if (M.orn === "frises") zoneHaut = Math.max(zoneHaut, u * 7);
    }
    var largeurTexte = W - 2 * marge;

    // AYNEHA : plus grand possible dans la zone, sur 5 lignes au plus (7 en statut)
    var ay = d.ayneha || "";
    var tLat = Math.round(u * 2.1), tTrad = Math.round(u * 1.75);
    ctx.font = "500 " + tLat + "px Jost, sans-serif";
    var lignesLat = d.montrerLatin && d.latin ? couper(ctx, d.latin, largeurTexte, false) : [];
    ctx.font = "italic 400 " + tTrad + "px Jost, sans-serif";
    var lignesTrad = d.traduction ? couper(ctx, d.traduction, largeurTexte, false) : [];
    var bas = (lignesLat.length ? u * 2.2 + lignesLat.length * tLat * 1.3 : 0) + (lignesTrad.length ? u * 1.2 + lignesTrad.length * tTrad * 1.35 : 0);
    var maxLignes = F.ratio > 1 ? 7 : 5, taille = Math.round(u * 8), lignesAy = [];
    for (; taille > u * 1.6; taille -= Math.max(2, Math.round(u * 0.2))) {
      ctx.font = taille + 'px "Ayneha Pro"';
      lignesAy = ay ? couper(ctx, ay, largeurTexte, true) : [];
      var h = lignesAy.length * taille * 1.3;
      if (lignesAy.length <= maxLignes && plusLarge(ctx, lignesAy, true) <= largeurTexte && h + bas <= zoneBas - zoneHaut) break;
    }
    var hauteur = lignesAy.length * taille * 1.3 + bas;
    var y = zoneHaut + Math.max(0, (zoneBas - zoneHaut - hauteur) / 2);

    ctx.textAlign = "left";
    ctx.fillStyle = M.texte;
    ctx.font = taille + 'px "Ayneha Pro"';
    lignesAy.forEach(function (l) {
      var v = A.visualLine(l), w = ctx.measureText(v).width;
      y += taille * 1.3;
      ctx.fillText(v, (W - w) / 2, y - taille * 0.3);
    });
    ctx.textAlign = "center";
    if (lignesLat.length) {
      y += u * 2.2;
      ctx.fillStyle = M.latin; ctx.font = "500 " + tLat + "px Jost, sans-serif";
      lignesLat.forEach(function (l) { y += tLat * 1.3; ctx.fillText(l, W / 2, y - tLat * 0.3); });
    }
    if (lignesTrad.length) {
      y += u * 1.2;
      ctx.fillStyle = M.doux; ctx.font = "italic 400 " + tTrad + "px Jost, sans-serif";
      lignesTrad.forEach(function (l) { y += tTrad * 1.35; ctx.fillText(l, W / 2, y - tTrad * 0.35); });
    }

    // pseudo et signature
    var piedY = H - u * (M.tablette ? 2.6 : 3);
    if (d.pseudo) {
      ctx.fillStyle = M.tablette ? M.doux : M.texte;
      ctx.font = "600 " + Math.round(u * 1.7) + "px Jost, sans-serif";
      var py = M.tablette ? H - u * 9.6 : piedY - u * 3;
      ctx.fillText("- " + d.pseudo, W / 2, py);
    }
    // signature : le mot AYNEHA en AYNEHA, puis l'adresse ayneha.org bien visible
    var tit = A.visualLine(A.transcribe("ayneha").text);
    var tTit = Math.round(u * 2.1), tSite = Math.round(u * 1.75);
    ctx.font = tTit + 'px "Ayneha Pro"';
    var wTit = ctx.measureText(tit).width;
    ctx.font = "600 " + tSite + "px Jost, sans-serif";
    var wSite = ctx.measureText(SITE).width, ecart = u * 1.6;
    var x0 = (W - wTit - ecart - wSite) / 2;
    ctx.textAlign = "left";
    ctx.fillStyle = M.pied;
    ctx.font = tTit + 'px "Ayneha Pro"';
    ctx.fillText(tit, x0, piedY + u * 0.15);
    ctx.globalAlpha = 0.5;
    ctx.fillRect(x0 + wTit + ecart / 2 - u * 0.05, piedY - tSite * 0.8, u * 0.1, tSite * 0.95);
    ctx.globalAlpha = 1;
    ctx.fillStyle = M.accent;
    ctx.font = "600 " + tSite + "px Jost, sans-serif";
    ctx.fillText(SITE, x0 + wTit + ecart, piedY);
    return canvas;
  }

  function polices() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('64px "Ayneha Pro"'),
      document.fonts.load("500 30px Jost"), document.fonts.load("600 30px Jost"), document.fonts.load("italic 400 30px Jost")
    ]).catch(function () { /* on dessine quand même */ });
  }

  /* ------------------------------------------------------------ galerie */
  function galerie() {
    var zone = document.getElementById("carte-galerie");
    if (!zone) return;
    var cartes = (window.AYNEHA_CARTES || []).slice().reverse();
    var vide = document.getElementById("carte-galerie-vide");
    if (!cartes.length) { if (vide) vide.hidden = false; return; }
    if (vide) vide.hidden = true;
    var items = [];
    cartes.forEach(function (c) {
      var fig = document.createElement("figure");
      fig.className = "carte-galerie-item";
      fig.setAttribute("data-modele", c.modele || "salut");
      var cv = document.createElement("canvas");
      var ayTxt = c.ayneha ? nettoyer(c.ayneha) : A.transcribe(c.texte || "").text;
      dessiner(cv, { modele: c.modele, format: c.format, ayneha: ayTxt, latin: c.texte, traduction: (EN && c.traduction_en) ? c.traduction_en : c.traduction, pseudo: c.pseudo, montrerLatin: c.montrerLatin !== false }, 540);
      cv.setAttribute("role", "img");
      cv.setAttribute("aria-label", T("Carte ", "Card ") + ((MODELES[c.modele] || MODELES.salut).nom) + " : " + (c.texte || "") + (c.traduction ? " (" + c.traduction + ")" : ""));
      var cap = document.createElement("figcaption");
      cap.textContent = (c.exemple ? T("Exemple AYNEHA", "AYNEHA example") + (c.pseudo ? " - " + c.pseudo : "") : (c.pseudo ? c.pseudo : T("Anonyme", "Anonymous")) + (c.date ? " - " + dateLangue(c.date) : ""));
      if (c.exemple) fig.classList.add("carte-exemple");
      fig.appendChild(cv); fig.appendChild(cap);
      zone.appendChild(fig); items.push(fig);
    });
    // filtres par modèle, seulement pour les modèles présents dans la galerie
    var filtres = document.getElementById("carte-filtres");
    var presents = Object.keys(MODELES).filter(function (k) { return cartes.some(function (c) { return (c.modele || "salut") === k; }); });
    if (!filtres || presents.length < 2) return;
    filtres.hidden = false;
    var liste = [["tous", T("Toutes (", "All (") + cartes.length + ")"]].concat(presents.map(function (k) { return [k, MODELES[k].nom]; }));
    liste.forEach(function (f, i) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = f[1]; b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        filtres.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        items.forEach(function (it) { it.hidden = f[0] !== "tous" && it.getAttribute("data-modele") !== f[0]; });
      });
      filtres.appendChild(b);
    });
  }

  /* ------------------------------------------------------------ atelier */
  function atelier() {
    var apercu = document.getElementById("carte-apercu");
    if (!apercu) return;
    var champ = document.getElementById("carte-texte");
    var trad = document.getElementById("carte-traduction");
    var pseudo = document.getElementById("carte-pseudo");
    var latin = document.getElementById("carte-latin");
    var etat = document.getElementById("carte-etat");
    var CLE = "ayneha-carte-pseudo";
    var d = { modele: "salut", format: "carre" };

    function message(t) { etat.textContent = t; if (t) setTimeout(function () { if (etat.textContent === t) etat.textContent = ""; }, 4000); }

    function lire() {
      d.latin = champ.value.trim();
      d.ayneha = A.transcribe(d.latin).text;
      d.traduction = trad.value.trim();
      d.pseudo = pseudo.value.trim();
      d.montrerLatin = latin.checked;
    }
    var prevu = false;
    function maj() {
      lire();
      cacherImage();
      majLiens();
      try { localStorage.setItem(CLE, pseudo.value); } catch (e) { /* stockage indisponible */ }
      if (prevu) return;
      prevu = true;
      requestAnimationFrame(function () {
        prevu = false;
        var vide = !d.latin;
        dessiner(apercu, vide ? Object.assign({}, d, { ayneha: A.transcribe("ayneha").text, latin: "ayneha" }) : d, 1080);
        apercu.setAttribute("aria-label", vide ? T("Aperçu de la carte", "Card preview") : T("Aperçu de la carte : ", "Card preview: ") + d.latin);
      });
    }

    function choix(nomGroupe, cle) {
      var groupe = document.querySelector('[data-groupe="' + nomGroupe + '"]');
      groupe.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-v]");
        if (!b) return;
        groupe.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        d[cle] = b.getAttribute("data-v");
        maj();
      });
    }
    choix("modele", "modele");
    choix("format", "format");

    document.getElementById("carte-touches").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-c]");
      if (!b) return;
      var c = b.getAttribute("data-c"), a = champ.selectionStart, f = champ.selectionEnd;
      champ.value = champ.value.slice(0, a) + c + champ.value.slice(f);
      champ.selectionStart = champ.selectionEnd = a + c.length;
      champ.focus(); maj();
    });

    function pret() {
      if (!d.latin) { message(T("Écrivez d'abord votre message en songhay.", "First write your message in Songhay.")); champ.focus(); return false; }
      return true;
    }
    function nomFichier() { return "ma-carte-ayneha-" + d.modele + ".png"; }
    function enBlob(fn) { apercu.toBlob(function (b) { fn(b); }, "image/png"); }
    /* Application AYNEHA Home : partage et enregistrement passent par l'application. */
    var APP = window.AynehaApp && window.AynehaApp.enregistrerImage ? window.AynehaApp : null;
    function telecharger(blob) {
      try {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = nomFichier();
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      } catch (e) { /* téléchargement bloqué : l'image affichée reste disponible */ }
    }
    /* Solution de secours qui marche partout (navigateurs de TikTok, Facebook,
       WhatsApp...) : la carte s'affiche en image, à garder par un appui long. */
    var boiteImage = document.getElementById("carte-image");
    var imageFinale = document.getElementById("carte-img");
    function montrerImage(texte) {
      imageFinale.src = apercu.toDataURL("image/png");
      imageFinale.alt = T("Votre carte : ", "Your card: ") + d.latin;
      document.getElementById("carte-image-aide").textContent = texte;
      boiteImage.hidden = false;
      boiteImage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    function cacherImage() { if (boiteImage && !boiteImage.hidden) { boiteImage.hidden = true; imageFinale.removeAttribute("src"); } }
    var AIDE = T("Si l'image n'apparaît pas dans vos téléchargements : appuyez longuement sur la carte ci-dessus, puis choisissez « Enregistrer l'image » ou « Partager l'image ».", "If the image does not appear in your downloads: press and hold the card above, then choose “Save image” or “Share image”.");

    document.getElementById("carte-partager").addEventListener("click", function () {
      if (!pret()) return;
      if (APP && APP.partagerImage) {
        var okp = false;
        try { okp = APP.partagerImage(apercu.toDataURL("image/png"), nomFichier(), T("Écrit en AYNEHA, l'écriture du songhay - https://", "Written in AYNEHA, the writing system of Songhay - https://") + SITE + (EN ? "/en" : "") + "/carte.html"); } catch (e) { okp = false; }
        if (!okp) message(T("Le partage n'a pas pu s'ouvrir.", "Sharing could not be opened."));
        return;
      }
      enBlob(function (blob) {
        var f;
        try { f = new File([blob], nomFichier(), { type: "image/png" }); } catch (e) { f = null; }
        var possible = false;
        try { possible = !!(f && navigator.canShare && navigator.canShare({ files: [f] })); } catch (e) { possible = false; }
        if (possible) {
          navigator.share({ files: [f], title: T("Ma carte AYNEHA", "My AYNEHA card"), text: T("Écrit en AYNEHA, l'écriture du songhay - https://", "Written in AYNEHA, the writing system of Songhay - https://") + SITE + (EN ? "/en" : "") + "/carte.html" })
            .catch(function (err) {
              if (err && err.name === "AbortError") return; // partage annulé par la personne
              montrerImage(T("Le partage direct n'est pas possible ici. Appuyez longuement sur la carte ci-dessus, puis choisissez « Partager l'image » ou « Enregistrer l'image ».", "Direct sharing is not possible here. Press and hold the card above, then choose “Share image” or “Save image”."));
            });
        } else {
          telecharger(blob);
          montrerImage(T("Le partage direct n'est pas possible dans ce navigateur. ", "Direct sharing is not possible in this browser. ") + AIDE);
        }
      });
    });
    document.getElementById("carte-enregistrer").addEventListener("click", function () {
      if (!pret()) return;
      if (APP) {
        var oke = false;
        try { oke = APP.enregistrerImage(apercu.toDataURL("image/png"), nomFichier()); } catch (e) { oke = false; }
        message(oke ? (window.AynehaApp.enregistreDansGalerie && !window.AynehaApp.enregistreDansGalerie() ? T("Choisissez où enregistrer ou envoyer l'image.", "Choose where to save or send the image.") : T("La carte est enregistrée dans vos images (dossier Pictures/AYNEHA).", "The card is saved in your pictures (Pictures/AYNEHA folder).")) : T("L'image n'a pas pu être enregistrée.", "The image could not be saved."));
        return;
      }
      enBlob(function (blob) { telecharger(blob); montrerImage(T("La carte est enregistrée dans vos téléchargements (dossier Download). ", "The card is saved in your downloads (Download folder). ") + AIDE); });
    });

    function texteProposition() {
      var M = MODELES[d.modele];
      return [
        T("Bonjour AYNEHA,", "Hello AYNEHA,"),
        T("je propose ma carte pour la galerie « Ma carte AYNEHA ».", "I am submitting my card for the “My AYNEHA card” gallery."),
        "",
        T("Modèle : ", "Template: ") + M.nom,
        T("Format : ", "Format: ") + FORMATS[d.format].nom,
        T("Message en songhay (lettres latines) : ", "Message in Songhay (Latin letters): ") + d.latin,
        T("Message en AYNEHA : ", "Message in AYNEHA: ") + A.forPaste(d.ayneha),
        T("Texte latin affiché sur la carte : ", "Latin text shown on the card: ") + (d.montrerLatin ? T("oui", "yes") : T("non", "no")),
        T("Traduction : ", "Translation: ") + (d.traduction || T("(aucune)", "(none)")),
        T("Pseudo : ", "Nickname: ") + (d.pseudo || T("(aucun)", "(none)")),
        "",
        T("J'accepte que ma carte soit publiée dans la galerie après relecture, sous licence CC BY-SA 4.0.", "I agree that my card may be published in the gallery after review, under the CC BY-SA 4.0 licence.")
      ].join("\n");
    }
    /* Les boutons « Proposer » sont de vrais liens, mis à jour à chaque changement :
       les navigateurs les ouvrent même là où les fenêtres automatiques sont bloquées. */
    var lienMail = document.getElementById("carte-proposer-mail");
    var lienWa = document.getElementById("carte-proposer-wa");
    function majLiens() {
      lienMail.href = "mailto:" + CONTACT + "?subject=" + encodeURIComponent(T("Ma carte AYNEHA - ", "My AYNEHA card - ") + MODELES[d.modele].nom) + "&body=" + encodeURIComponent(texteProposition());
      lienWa.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texteProposition());
    }
    [lienMail, lienWa].forEach(function (l) {
      l.addEventListener("click", function (e) { if (!pret()) { e.preventDefault(); champ.scrollIntoView({ behavior: "smooth", block: "center" }); } });
    });

    try { var p = localStorage.getItem(CLE); if (p) pseudo.value = p; } catch (e) { /* rien */ }
    [champ, trad, pseudo].forEach(function (el) { el.addEventListener("input", maj); });
    latin.addEventListener("change", maj);
    maj();
    polices().then(maj);
  }

  /* Petite carte d'exemple sur la page d'accueil */
  function exemple() {
    var cv = document.getElementById("accueil-carte");
    if (!cv) return;
    dessiner(cv, { modele: "fierte", format: "carre", ayneha: A.transcribe("ayneha").text, latin: "ayneha", traduction: "l'écriture du songhay", pseudo: "", montrerLatin: true }, 840);
  }

  window.AynehaCarte = { dessiner: dessiner, MODELES: MODELES };
  polices().then(function () { galerie(); exemple(); });
  atelier();
})();
