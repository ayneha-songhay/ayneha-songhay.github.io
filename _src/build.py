#!/usr/bin/env python3
# Générateur du site AYNEHA : assemble les pages (_src/pages/*.html) avec l'en-tête et
# le pied de page communs, produit assets/js/ayneha.js, manifest.json et version.txt.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Utilisation (depuis la racine du dépôt) :  python3 _src/build.py

import datetime
import html
import json
import os
import re
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
sys.path.insert(0, ICI)
import glyphs as G  # noqa: E402
import applications as APPS  # noqa: E402
import confidentialite as CONF  # noqa: E402
import cartes as CARTES  # noqa: E402

SITE_URL = "https://ayneha-songhay.github.io"
CONTACT = "contact@ayneha.org"
ANNEE = 2026

NAV = [
    ("index", "index.html", "Accueil"),
    ("alphabet", "alphabet.html", "L'alphabet"),
    ("applications", "applications.html", "Applications"),
    ("outils", "outils.html", "Outils en ligne"),
    ("ressources", "ressources.html", "Ressources"),
    ("apropos", "apropos.html", "À propos"),
]


# ---------------------------------------------------------------- macros AYNEHA
def ay_span(names, cls="", label=None):
    txt = G.text(names)
    lecture = label if label is not None else G.reading(names)
    c = "ay" + (" " + cls if cls else "")
    if lecture == "":
        return f'<span class="{c}" aria-hidden="true">{txt}</span>'
    return f'<span class="{c}" role="img" aria-label="{html.escape(lecture)}">{txt}</span>'


def macros(src):
    # {{ay:A Y:m N E H A}}  ou  {{ay:A Y:m N E H A|classe|lecture}}
    def rep(m):
        parts = m.group(1).split("|")
        names = parts[0].strip()
        cls = parts[1].strip() if len(parts) > 1 else ""
        lab = parts[2].strip() if len(parts) > 2 else None
        return ay_span(names, cls, lab)
    src = re.sub(r"\{\{ay:([^}]*)\}\}", rep, src)
    src = re.sub(r"\{\{lecture:([^}]*)\}\}", lambda m: html.escape(G.reading(m.group(1))), src)
    src = src.replace("{{applications}}", rendu_apps_grille())
    src = src.replace("{{apps-accueil}}", rendu_apps_accueil())
    src = re.sub(r"\{\{apps-nav:([a-z-]+)\}\}", lambda m: apps_nav(m.group(1)), src)
    src = src.replace("{{contact}}", CONTACT).replace("{{annee}}", str(ANNEE))
    return src


E = html.escape
SOUS_PAGES = [("installer-apk", "Installer un APK"), ("developpeurs", "Développeurs")]


def logo_app(a, taille=""):
    return f'<img class="app-logo{taille}" src="assets/img/apps/{a["id"]}-logo.png" width="256" height="256" alt="">'


def etiquette(a):
    st = a.get("statut")
    if st == "nouveau":
        return '<span class="etiquette">Nouveau</span>'
    if st == "preparation":
        return '<span class="etiquette etiquette-calme">En préparation</span>'
    return ""


def apps_nav(courant):
    liens = []
    for a in APPS.APPS:
        cur = ' aria-current="page"' if a["id"] == courant else ""
        liens.append(f'<a href="{a["id"]}.html"{cur}>{E(a["nom"])}</a>')
    for i, nom in SOUS_PAGES:
        cur = ' aria-current="page"' if i == courant else ""
        liens.append(f'<a href="{i}.html"{cur}>{nom}</a>')
    return '<nav class="pages-ancres apps-nav" aria-label="Pages des applications">' + "".join(liens) + "</nav>"


def rendu_apps_grille():
    cartes = []
    for a in APPS.APPS:
        cartes.append(f"""<a class="carte-app" href="{a['id']}.html">
  {logo_app(a)}
  <span><strong>{E(a['nom'])}</strong> {etiquette(a)}</span>
  <span class="doux">{E(a['resume'])}</span>
</a>""")
    return '<div class="grille-apps">' + "\n".join(cartes) + "</div>"


def rendu_apps_accueil():
    items = []
    for a in APPS.APPS:
        if a["id"] == "ayneha-school":
            continue
        items.append(f'<li>{logo_app(a, " app-logo-petit")}<a href="{a["id"]}.html"><h4>{E(a["nom"])} {etiquette(a)}</h4><p>{E(a["resume"])}</p></a></li>')
    return '<ul class="liste-apps">' + "".join(items) + "</ul>"


def boutons_app(a):
    out = []
    if a.get("statut") == "preparation":
        return '<span class="btn" aria-disabled="true">Bientôt disponible</span>'
    if a["naabiga"]:
        out.append(f'<a class="btn" href="{a["naabiga"]}" rel="noopener">Télécharger sur Naabiga</a>')
    else:
        out.append('<span class="btn" aria-disabled="true">Bientôt sur Naabiga</span>')
    if a["apk"]:
        out.append(f'<a class="btn btn-ligne" href="{a["apk"]}" download>Télécharger l\'APK ici</a>')
    else:
        out.append('<span class="btn" aria-disabled="true">Téléchargement direct bientôt</span>')
    return "".join(out)


def page_app(a):
    intro = "".join(f"<p>{E(t)}</p>" for t in a["intro"])
    points = "".join(f"<li>{E(t)}</li>" for t in a["points"])
    etapes = ""
    if a.get("etapes"):
        etapes = '<h2>Comment l\'utiliser</h2><ol class="regles">' + "".join(f"<li>{E(t)}</li>" for t in a["etapes"]) + "</ol>"
    reserve = f'<p class="reserve">{E(a["reserve"])}</p>' if a.get("reserve") else ""
    reglages = f'<h3>Réglages</h3><p class="doux">{E(a["reglages"])}</p>' if a.get("reglages") else ""
    code = f'<p><a href="{a["code"]}" rel="noopener">Code source (logiciel libre, GPL v3)</a></p>' if a.get("code") else ""
    outil = ""
    if a.get("outil"):
        outil = f'<div class="encadre"><h3>Sans rien installer</h3><p class="doux">Une version de cet outil fonctionne directement sur le site.</p><a class="btn btn-ligne btn-petit" href="{a["outil"][0]}">{a["outil"][1]}</a></div>'
    return f"""<section class="app-tete">
  <div class="wrap">
    {apps_nav(a['id'])}
    <img class="couverture" src="assets/img/apps/{a['id']}-couverture.jpg" width="1200" height="675" alt="Couverture de l'application {E(a['nom'])}">
    <div class="app-identite">
      {logo_app(a, " app-logo-grand")}
      <div>
        <h1>{E(a['nom'])} {etiquette(a)}</h1>
        <p class="chapeau">{E(a['resume'])}</p>
        <div class="boutons">{boutons_app(a)}</div>
      </div>
    </div>
  </div>
</section>
<section class="section-serree">
  <div class="wrap cote">
    <div class="texte-long">
      {intro}
      {reserve}
      <h2>Ce qu'elle fait</h2>
      <ul>{points}</ul>
      {etapes}
    </div>
    <aside>
      <div class="encadre">
        <h3>Compatibilité</h3>
        <p class="doux">{E(a['compat'])}</p>
        {reglages}
        <h3>Confidentialité</h3>
        <p class="doux">{E(APPS.CONFIDENTIALITE)}</p>
        {code}
        <p class="petit"><a href="confidentialite-{a['id']}.html">Politique de confidentialité complète</a></p>
        <p class="petit"><a href="installer-apk.html">Installer un fichier APK</a></p>
      </div>
      {outil}
    </aside>
  </div>
</section>"""


def page_confidentialite(c):
    sections = list(c["sections"])
    if c["type"].startswith("Application") and not any(t == "Logiciel libre" for t, _ in sections):
        sections.append(CONF.libre(c["nom"]))
    corps = "".join(f"<h2>{E(t)}</h2><p>{E(x)}</p>" for t, x in sections)
    lien = ""
    if c["type"].startswith("Application"):
        lien = f'<a class="btn btn-ligne btn-petit" href="{c["id"]}.html">Voir {E(c["nom"])}</a>'
    elif c.get("page"):
        lien = f'<a class="btn btn-ligne btn-petit" href="{c["page"]}">Ouvrir l\'outil</a>'
    return f"""<section class="page-tete">
  <div class="wrap">
    <p class="doux" style="margin:0 0 6px"><a href="confidentialite.html">Confidentialité</a> / {E(c['type'])}</p>
    <h1>Confidentialité : {E(c['nom'])}</h1>
    <p>{E(c['intro'])}</p>
  </div>
</section>
<section class="section-serree">
  <div class="wrap"><div class="texte-long">
    {corps}
    <h2>Contact</h2>
    <p>Pour toute question sur cette politique : <a href="mailto:{CONTACT}">{CONTACT}</a>. Développé par MAIGUS.</p>
    <p class="doux petit">Dernière mise à jour : {CONF.MAJ}.</p>
    <div class="boutons">{lien}<a class="btn btn-ligne btn-petit" href="confidentialite.html">Toutes les politiques</a></div>
  </div></div>
</section>"""


def page_confidentialite_index():
    def liste(items):
        return "".join(f'<li><div><h3>{E(c["nom"])}</h3><p>{E(c["type"])}</p></div><a class="btn btn-ligne btn-petit" href="confidentialite-{c["id"]}.html">Lire sa politique</a></li>' for items_ in [items] for c in items_)
    return f"""<section class="page-tete">
  <div class="wrap">
    <h1>Confidentialité</h1>
    <p>En bref : ni le site ni les applications AYNEHA ne collectent de données sur vous. Pas de compte, pas de traceur, pas de publicité. Chaque application et chaque outil a sa propre page, avec ses règles détaillées.</p>
  </div>
</section>
<section class="section-serree">
  <div class="wrap duo duo-haut">
    <div>
      <h2>Applications Android</h2>
      <ul class="ressources">{liste(CONF.ANDROID)}</ul>
    </div>
    <div>
      <h2>Site et outils web</h2>
      <ul class="ressources">{liste(CONF.WEB)}</ul>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap"><div class="texte-long">
    <p>Pour toute question : <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>
    <p class="doux petit">Dernière mise à jour : {CONF.MAJ}.</p>
  </div></div>
</section>"""


# ---------------------------------------------------------------- gabarit
MARQUE = ay_span("A Y:m N E H A", label="AYNEHA")
LOGO = f'<span class="ay logo" aria-hidden="true">{G.text("H")}</span>'


def entete(actif):
    liens = []
    for key, href, label in NAV:
        cur = ' aria-current="page"' if key == actif else ""
        liens.append(f'<li><a href="{href}"{cur}>{label}</a></li>')
    return f"""<a class="skip" href="#contenu">Aller au contenu</a>
<header class="entete">
  <div class="wrap">
    <a class="marque" href="index.html" aria-label="AYNEHA, accueil">{LOGO}<span class="marque-texte">AYNEHA</span></a>
    <button class="menu-bouton" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav class="nav" id="nav" aria-label="Navigation principale">
      <ul>
        {chr(10).join('        ' + x for x in liens).strip()}
      </ul>
    </nav>
  </div>
</header>"""


def pied():
    return f"""<footer class="pied">
  <div class="frise" aria-hidden="true"></div>
  <div class="wrap">
    <div class="pied-grille">
      <div class="pied-marque">
        {MARQUE}
        <p>AYNEHA, l'écriture de la langue songhay. Conçue et créée par Mahamadou Issiaka MAIGA (MAIGUS).</p>
      </div>
      <div>
        <h2>Découvrir</h2>
        <ul>
          <li><a href="alphabet.html">L'alphabet</a></li>
          <li><a href="alphabet.html#regles">Les 22 règles</a></li>
          <li><a href="applications.html">Applications</a></li>
          <li><a href="ressources.html">Ressources</a></li>
        </ul>
      </div>
      <div>
        <h2>Outils en ligne</h2>
        <ul>
          <li><a href="convertisseur.html">Transcripteur</a></li>
          <li><a href="clavier.html">Clavier</a></li>
          <li><a href="calculatrice.html">Calculatrice</a></li>
          <li><a href="nombres.html">Convertisseur de nombres</a></li>
          <li><a href="horloge.html">Horloge</a></li>
          <li><a href="carte.html">Ma carte AYNEHA</a></li>
        </ul>
      </div>
      <div>
        <h2>Le projet</h2>
        <ul>
          <li><a href="apropos.html">À propos</a></li>
          <li><a href="presse.html">Espace presse</a></li>
          <li><a href="apropos.html#soutenir">Soutenir le projet</a></li>
          <li><a href="confidentialite.html">Confidentialité</a></li>
        </ul>
      </div>
      <div>
        <h2>Suivre AYNEHA</h2>
        <ul>
          <li><a href="https://aynehasonghay.blogspot.com" rel="noopener">Blog</a></li>
          <li><a href="https://www.tiktok.com/@ayneha.songhay" rel="noopener">TikTok</a></li>
          <li><a href="https://www.facebook.com/ayneha.songhay/" rel="noopener">Facebook</a></li>
          <li><a href="https://x.com/ayneha_songhay" rel="noopener">X</a></li>
          <li><a href="https://whatsapp.com/channel/0029Vb8zu22HgZWfGLpgAA2U" rel="noopener">Chaîne WhatsApp</a></li>
        </ul>
      </div>
    </div>
    <div class="pied-bas">
      <span>© {ANNEE} AYNEHA. Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS).</span>
      <span>Contact : <a href="mailto:{CONTACT}">{CONTACT}</a></span>
    </div>
  </div>
</footer>
<button class="haut-page" type="button" aria-label="Revenir en haut de la page">&#8593;</button>"""


def lien_conf(nom):
    for c in CONF.WEB:
        if c.get("page") == nom:
            return f'\n<div class="wrap petit doux" style="padding-bottom:20px"><a href="confidentialite-{c["id"]}.html">Confidentialité de cet outil</a> : rien de ce que vous saisissez ne quitte votre appareil.</div>'
    return ""


def page(meta, corps):
    titre = meta["title"]
    desc = meta["description"]
    nom = meta["_file"]
    url = f"{SITE_URL}/" + ("" if nom == "index.html" else nom)
    scripts = "".join(f'\n<script src="{s}"></script>' for s in meta.get("scripts", "").split() if s)
    extra_head = meta.get("head", "")
    robots = '\n<meta name="robots" content="noindex">' if meta.get("noindex") else ""
    return f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(titre)}</title>
<meta name="description" content="{html.escape(desc)}">
<meta name="author" content="Mahamadou Issiaka MAIGA (MAIGUS)">
<meta name="theme-color" content="#0E1A30">{robots}
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AYNEHA">
<meta property="og:title" content="{html.escape(titre)}">
<meta property="og:description" content="{html.escape(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE_URL}/{meta.get("image", "assets/img/apercu.png")}">
<meta property="og:locale" content="fr_FR">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preload" href="assets/fonts/ayneha-pro.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/jost-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css?v={VERSION}">
<script src="assets/js/essai.js?v={VERSION}"></script>{extra_head}
</head>
<body>
{entete(meta.get("nav", ""))}
<main id="contenu">
{corps.strip()}{lien_conf(nom)}
</main>
{pied()}
<script src="assets/js/site.js?v={VERSION}"></script>{scripts}
</body>
</html>
"""


def lire_page(chemin):
    src = open(chemin, encoding="utf-8").read()
    tete, _, corps = src.partition("\n---\n")
    meta = {}
    for ligne in tete.splitlines():
        if ":" in ligne:
            k, _, v = ligne.partition(":")
            meta[k.strip()] = v.strip()
    return meta, corps


# ---------------------------------------------------------------- données JS
def js_data():
    cp = {k: v for k, v in G.CP.items()}
    lat = {k: {"label": v[0], "son": v[1], "epel": v[2], "lat": v[3]} for k, v in G.INFO.items()}
    src = open(os.path.join(ICI, "ayneha.src.js"), encoding="utf-8").read()
    src = src.replace("/*@@CP@@*/{}", json.dumps(cp, ensure_ascii=False))
    src = src.replace("/*@@LATIN@@*/{}", json.dumps(lat, ensure_ascii=False))
    return src


def alphabet_data():
    """Données de la page Alphabet : lettres, variantes, points de code."""
    out = []
    for L in G.LETTERS:
        label, son, epel, lat = G.INFO[L]
        out.append({
            "id": L, "nom": label, "son": son, "epel": epel,
            "type": "voyelle" if L in G.VOWELS else "consonne",
            "glyphe": chr(G.CP[L]), "cp": G.cp_hex(L),
            "variantes": [{"g": chr(G.CP[n]), "nom": lab, "lat": G.latin(n), "cp": G.cp_hex(n)} for n, lab in G.variants(L)],
        })
    return "window.AYNEHA_LETTRES = " + json.dumps(out, ensure_ascii=False) + ";\n"


# ---------------------------------------------------------------- construction
VERSION = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S")


def main():
    pages_dir = os.path.join(ICI, "pages")
    produits = []
    for f in sorted(os.listdir(pages_dir)):
        if not f.endswith(".html"):
            continue
        meta, corps = lire_page(os.path.join(pages_dir, f))
        meta["_file"] = f
        out = page(meta, macros(corps))
        with open(os.path.join(RACINE, f), "w", encoding="utf-8") as fh:
            fh.write(out)
        produits.append(f)

    for a in APPS.APPS:
        meta = {"title": f"{a['nom']} - application Android AYNEHA", "description": a["resume"] + " " + a["intro"][0][:110],
                "nav": "applications", "_file": a["id"] + ".html", "image": f"assets/img/apps/{a['id']}-couverture.jpg"}
        with open(os.path.join(RACINE, a["id"] + ".html"), "w", encoding="utf-8") as fh:
            fh.write(page(meta, macros(page_app(a))))
        produits.append(a["id"] + ".html")

    meta = {"title": "Confidentialité - AYNEHA", "description": "Les règles de confidentialité du site et de chaque application et outil AYNEHA : aucune donnée collectée, pas de compte, pas de traceur, pas de publicité.", "nav": "", "_file": "confidentialite.html"}
    with open(os.path.join(RACINE, "confidentialite.html"), "w", encoding="utf-8") as fh:
        fh.write(page(meta, page_confidentialite_index()))
    for c in CONF.ANDROID + CONF.WEB:
        nom = f"confidentialite-{c['id']}.html"
        meta = {"title": f"Confidentialité - {c['nom']}", "description": c["intro"], "nav": "", "_file": nom}
        with open(os.path.join(RACINE, nom), "w", encoding="utf-8") as fh:
            fh.write(page(meta, page_confidentialite(c)))
        produits.append(nom)

    os.makedirs(os.path.join(RACINE, "assets", "js"), exist_ok=True)
    with open(os.path.join(RACINE, "assets", "js", "ayneha.js"), "w", encoding="utf-8") as fh:
        fh.write(js_data())
    with open(os.path.join(RACINE, "assets", "js", "cartes-data.js"), "w", encoding="utf-8") as fh:
        fh.write("/* Généré par _src/build.py depuis _src/cartes.py - ne pas modifier à la main. */\n"
                 "window.AYNEHA_CARTES = " + json.dumps(CARTES.CARTES, ensure_ascii=False, indent=1) + ";\n")
    with open(os.path.join(RACINE, "assets", "js", "alphabet-data.js"), "w", encoding="utf-8") as fh:
        fh.write("/* Généré par _src/build.py - ne pas modifier à la main. */\n" + alphabet_data())

    # manifest.json et version.txt : utilisés par l'application Android « AYNEHA »
    # (wrapper hors connexion) pour savoir quand télécharger la nouvelle version du site.
    fichiers = []
    for dossier, _, noms in os.walk(RACINE):
        rel = os.path.relpath(dossier, RACINE)
        if rel.startswith((".git", "_src")) or "/." in rel:
            continue
        for n in noms:
            chemin = os.path.normpath(os.path.join(rel, n)).replace(os.sep, "/")
            if chemin.startswith("./"):
                chemin = chemin[2:]
            if chemin in ("manifest.json", "version.txt", "README.md", "LICENSE", ".gitignore", "_headers", "netlify.toml") or n.startswith("."):
                continue
            if chemin.startswith("assets/telechargements/"):
                continue  # fichiers à télécharger : pas besoin de les embarquer dans l'appli
            fichiers.append(chemin)
    fichiers.sort()
    with open(os.path.join(RACINE, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump({"version": VERSION, "files": fichiers}, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    with open(os.path.join(RACINE, "version.txt"), "w", encoding="utf-8") as fh:
        fh.write(VERSION + "\n")
    print("Pages :", ", ".join(produits))
    print("Version :", VERSION, "-", len(fichiers), "fichiers dans manifest.json")


if __name__ == "__main__":
    main()
