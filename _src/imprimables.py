# Modèles AYNEHA à imprimer (PDF A4) : cahier de tracé et affiche de l'alphabet, en français et en anglais.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Lancer :  python3 _src/imprimables.py
# (demande Playwright et Chromium ; les PDF sont écrits dans assets/telechargements/)

import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
sys.path.insert(0, ICI)
import glyphs as G  # noqa: E402

FONTS = "file://" + os.path.join(RACINE, "assets", "fonts")
SORTIE = os.path.join(RACINE, "assets", "telechargements")

TXT = {
    "fr": {
        "credit": "Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)",
        "licence": "Licence CC BY-SA 4.0 - à imprimer et partager librement",
        "cahier": "Cahier de tracé AYNEHA",
        "nom": "Nom :", "date": "Date :",
        "consigne": "Tracez chaque lettre de droite à gauche : repassez d'abord sur les lettres grises, puis écrivez-la seul dans les cases vides.",
        "voyelles": "Les voyelles", "consonnes": "Les consonnes", "chiffres": "Les chiffres",
        "consigne_chiffres": "Les chiffres AYNEHA s'écrivent aussi de droite à gauche : 2026 s'écrit en commençant par le 2, à droite.",
        "page": "Page",
        "affiche": "L'alphabet AYNEHA",
        "sous": "L'écriture de la langue songhay - un son, un caractère",
        "sens": "Se lit et s'écrit de droite à gauche",
        "accents": "Les 4 accents",
        "acc": [("A", "A:n", "nasalisation", "a → ã"), ("E", "E:o", "ouverture (E et O)", "e → ɛ"),
                ("B", "B:d", "double", "b → bb"), ("B", "B:m", "muette", "b muet")],
        "ponct": "Ponctuation", "virgule": "virgule", "pv": "point-virgule",
        "total": "27 lettres, 50 formes accentuées, 9 accents seuls, 10 chiffres et 2 signes : 98 caractères.",
    },
    "en": {
        "credit": "Designer and creator: Mahamadou Issiaka MAIGA (MAIGUS)",
        "licence": "CC BY-SA 4.0 licence - free to print and share",
        "cahier": "AYNEHA tracing workbook",
        "nom": "Name:", "date": "Date:",
        "consigne": "Trace each letter from right to left: first go over the grey letters, then write it on your own in the empty boxes.",
        "voyelles": "The vowels", "consonnes": "The consonants", "chiffres": "The digits",
        "consigne_chiffres": "AYNEHA digits are also written from right to left: 2026 starts with the 2, on the right.",
        "page": "Page",
        "affiche": "The AYNEHA alphabet",
        "sous": "The writing system of the Songhay language - one sound, one character",
        "sens": "Read and written from right to left",
        "accents": "The 4 diacritics",
        "acc": [("A", "A:n", "nasalisation", "a → ã"), ("E", "E:o", "open vowel (E and O)", "e → ɛ"),
                ("B", "B:d", "double", "b → bb"), ("B", "B:m", "silent", "silent b")],
        "ponct": "Punctuation", "virgule": "comma", "pv": "semicolon",
        "total": "27 letters, 50 accented forms, 9 standalone diacritics, 10 digits and 2 signs: 98 characters.",
    },
}

CSS = f"""
@font-face {{ font-family: "Ayneha Pro"; src: url("{FONTS}/ayneha-pro.woff2") format("woff2"); }}
@font-face {{ font-family: "Jost"; src: url("{FONTS}/jost-latin.woff2") format("woff2"); font-weight: 300 700; }}
@font-face {{ font-family: "Jost"; src: url("{FONTS}/jost-latin-ext.woff2") format("woff2"); font-weight: 300 700; }}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; }}
body {{ font-family: "Jost", sans-serif; color: #0E1A30; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.ay {{ font-family: "Ayneha Pro"; font-weight: 400; font-style: normal; text-decoration: none; line-height: 1; direction: rtl; unicode-bidi: bidi-override; }}
.feuille {{ width: 210mm; height: 297mm; padding: 14mm 14mm 12mm; position: relative; page-break-after: always; overflow: hidden; }}
.feuille:last-child {{ page-break-after: auto; }}
.bandeau {{ display: flex; align-items: center; justify-content: space-between; border-bottom: 1.2mm solid #F07C22; padding-bottom: 4mm; }}
.bandeau h1 {{ font-size: 20pt; margin: 0; font-weight: 600; }}
.logo {{ width: 13mm; height: 13mm; border-radius: 3mm; background: #F07C22; color: #0E1A30; display: grid; place-items: center; font-size: 26pt; }}
.champs {{ display: flex; gap: 10mm; margin: 5mm 0 2mm; font-size: 11pt; }}
.champs span {{ flex: 1; border-bottom: 0.3mm solid #8792A6; padding-bottom: 1mm; }}
.consigne {{ font-size: 10.5pt; color: #3a4660; margin: 3mm 0 4mm; }}
h2 {{ font-size: 13pt; margin: 4mm 0 2mm; color: #0E1A30; font-weight: 600; }}
.ligne {{ display: flex; flex-direction: row-reverse; align-items: stretch; gap: 1.6mm; margin-bottom: 2.6mm; }}
.etiq {{ width: 15mm; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 10pt; font-weight: 600; }}
.etiq small {{ font-weight: 400; color: #5b6780; font-size: 8.5pt; }}
.case {{ flex: 1; height: 19mm; border: 0.3mm solid #C9CED6; border-radius: 1.5mm; display: grid; place-items: center; font-size: 54pt; position: relative;
        background: linear-gradient(#fff 49.6%, #E3E7EE 49.6%, #E3E7EE 50.4%, #fff 50.4%); }}
.modele {{ color: #0E1A30; border-color: #F07C22; border-width: 0.5mm; }}
.gris {{ color: #C3C9D3; }}
.pied {{ position: absolute; left: 14mm; right: 14mm; bottom: 8mm; display: flex; justify-content: space-between; font-size: 8pt; color: #5b6780; border-top: 0.3mm solid #E3E7EE; padding-top: 2mm; }}
.pied b {{ color: #F07C22; font-weight: 600; }}
/* affiche */
.affiche {{ padding: 10mm 12mm 10mm; }}
.affiche h2 {{ margin: 3mm 0 1.5mm; font-size: 12pt; }}
.ponc .tuile {{ width: 18mm; height: 21mm; }}
.ponc .tuile span {{ font-size: 7.5pt; white-space: nowrap; }}
.ponc {{ flex-wrap: nowrap; gap: 1.8mm; }}
.ponc .tuile .ay {{ font-size: 32pt; }}
.titre-affiche {{ text-align: center; }}
.titre-affiche .ay {{ font-size: 60pt; color: #0E1A30; display: block; margin-bottom: 2mm; }}
.titre-affiche h1 {{ font-size: 22pt; margin: 0; font-weight: 600; }}
.titre-affiche p {{ margin: 1mm 0 0; color: #3a4660; font-size: 11pt; }}
.sens {{ display: inline-block; margin-top: 3mm; background: #0E1A30; color: #fff; border-radius: 10mm; padding: 1.2mm 5mm; font-size: 10pt; }}
.sens b {{ color: #F07C22; }}
.grille {{ display: flex; flex-direction: row-reverse; flex-wrap: wrap; gap: 2mm; justify-content: center; }}
.tuile {{ width: 20.5mm; height: 24mm; padding: 1mm 0 2.5mm; border: 0.35mm solid #C9CED6; border-radius: 2mm; display: flex; flex-direction: column; align-items: center; justify-content: center; }}
.tuile .ay {{ font-size: 40pt; }}
.tuile span {{ font-size: 9pt; margin-top: 0.5mm; font-weight: 600; }}
.tuile span small {{ font-weight: 400; color: #5b6780; }}
.voy .tuile {{ border-color: #F07C22; border-width: 0.6mm; width: 26mm; height: 27mm; }}
.voy .tuile .ay {{ font-size: 48pt; }}
.chif .tuile {{ width: 12.2mm; height: 21mm; background: #0E1A30; border-color: #0E1A30; color: #fff; }}
.chif .tuile .ay {{ font-size: 28pt; color: #fff; }}
.chif {{ gap: 1.8mm; flex-wrap: nowrap; }}
.chif .tuile span {{ color: #FFA35A; }}
.bas {{ display: flex; gap: 6mm; margin-top: 3mm; }}
.bas > div {{ flex: 1; }}
.acc {{ display: flex; flex-direction: row-reverse; gap: 2mm; flex-wrap: wrap; justify-content: center; }}
.acc .tuile {{ width: 42mm; height: 30mm; flex-direction: column; padding: 2mm 0 3.5mm; gap: 1.5mm; }}
.acc .paire {{ display: flex; flex-direction: row-reverse; align-items: center; gap: 2.5mm; font-size: 36pt; }}
.acc .paire i {{ font-style: normal; font-size: 12pt; color: #F07C22; font-family: "Jost"; }}
.acc span {{ font-size: 8.5pt; text-align: center; line-height: 1.35; }}
.total {{ text-align: center; font-size: 9.5pt; color: #3a4660; margin: 3mm 0 0; }}
h2.centre {{ text-align: center; }}
"""


def g(name):
    return G.text(name)


def nom_latin(l):
    n = G.INFO[l][0]
    lat = G.INFO[l][3]
    return n, (lat if lat.lower() != n.lower() else "")


def pied(t, n=None, total=None):
    num = f'<span>{t["page"]} {n}/{total}</span>' if n else ""
    return f'<div class="pied"><span><b>ayneha.org</b> - {t["credit"]}</span>{num}<span>{t["licence"]}</span></div>'


def ligne(name, label, sous=""):
    cases = [f'<div class="case modele ay">{g(name)}</div>']
    cases += [f'<div class="case gris ay">{g(name)}</div>' for _ in range(4)]
    cases += ['<div class="case"></div>' for _ in range(3)]
    sous_html = f"<small>{sous}</small>" if sous else ""
    return f'<div class="ligne"><div class="etiq">{label}{sous_html}</div>{"".join(cases)}</div>'


def cahier(lang):
    t = TXT[lang]
    groupes = [
        (t["voyelles"], G.VOWELS + G.CONSONANTS[:4]),
        (t["consonnes"], G.CONSONANTS[4:13]),
        (t["consonnes"], G.CONSONANTS[13:]),
    ]
    pages = []
    total = len(groupes) + 1
    for i, (titre, lettres) in enumerate(groupes, 1):
        lignes = []
        voy = [l for l in lettres if l in G.VOWELS]
        cons = [l for l in lettres if l not in G.VOWELS]
        if voy:
            lignes.append(f"<h2>{t['voyelles']}</h2>")
            lignes += [ligne(l, *nom_latin(l)) for l in voy]
            lignes.append(f"<h2>{t['consonnes']}</h2>")
        else:
            lignes.append(f"<h2>{titre}</h2>")
        lignes += [ligne(l, *nom_latin(l)) for l in cons]
        entete = ""
        if i == 1:
            entete = (f'<div class="champs"><span>{t["nom"]}</span><span>{t["date"]}</span></div>'
                      f'<p class="consigne">{t["consigne"]}</p>')
        pages.append(f'''<section class="feuille">
<div class="bandeau"><h1>{t["cahier"]}</h1><div class="logo ay">{g("H")}</div></div>
{entete}{"".join(lignes)}
{pied(t, i, total)}
</section>''')
    lignes = [ligne(f"D{d}", str(d)) for d in range(10)]
    pages.append(f'''<section class="feuille">
<div class="bandeau"><h1>{t["cahier"]} - {t["chiffres"].lower()}</h1><div class="logo ay">{g("H")}</div></div>
<p class="consigne">{t["consigne_chiffres"]}</p>
{"".join(lignes)}
{pied(t, total, total)}
</section>''')
    return "".join(pages)


def tuile(name, label, sous=""):
    s = f" <small>({sous})</small>" if sous else ""
    return f'<div class="tuile"><span class="ay">{g(name)}</span><span>{label}{s}</span></div>'


def affiche(lang):
    t = TXT[lang]
    voy = "".join(tuile(l, *nom_latin(l)) for l in G.VOWELS)
    cons = "".join(tuile(l, *nom_latin(l)) for l in G.CONSONANTS)
    chif = "".join(tuile(f"D{d}", str(d)) for d in range(10))
    acc = "".join(f'<div class="tuile"><div class="paire"><span class="ay">{g(a)}</span><i>←</i><span class="ay">{g(b)}</span></div><span><b>{nom}</b><br>{ex}</span></div>' for a, b, nom, ex in t["acc"])
    ponct = tuile(",", t["virgule"]) + tuile(";", t["pv"])
    return f'''<section class="feuille affiche">
<div class="titre-affiche">
  <span class="ay">{G.text("A Y:m N E H A")}</span>
  <h1>{t["affiche"]}</h1>
  <p>{t["sous"]}</p>
  <span class="sens"><b>←</b> {t["sens"]}</span>
</div>
<h2 class="centre">{t["voyelles"]}</h2>
<div class="grille voy">{voy}</div>
<h2 class="centre">{t["consonnes"]}</h2>
<div class="grille">{cons}</div>
<div class="bas">
  <div><h2 class="centre">{t["accents"]}</h2><div class="acc">{acc}</div></div>
</div>
<div class="bas">
  <div style="flex:4.3"><h2 class="centre">{t["chiffres"]}</h2><div class="grille chif">{chif}</div></div>
  <div style="flex:1.2"><h2 class="centre">{t["ponct"]}</h2><div class="grille ponc">{ponct}</div></div>
</div>
<p class="total">{t["total"]}</p>
{pied(t)}
</section>'''


def document(corps, lang):
    return f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{corps}</body></html>'


FICHIERS = {
    "ayneha-cahier-trace.pdf": (cahier, "fr"),
    "ayneha-tracing-workbook.pdf": (cahier, "en"),
    "ayneha-affiche-alphabet.pdf": (affiche, "fr"),
    "ayneha-alphabet-poster.pdf": (affiche, "en"),
}


def main():
    from playwright.sync_api import sync_playwright
    os.makedirs(SORTIE, exist_ok=True)
    tmp = os.path.join(ICI, "tmp")
    os.makedirs(tmp, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        for nom, (fn, lang) in FICHIERS.items():
            chemin = os.path.join(tmp, nom.replace(".pdf", ".html"))
            with open(chemin, "w", encoding="utf-8") as fh:
                fh.write(document(fn(lang), lang))
            pg.goto("file://" + chemin)
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(300)
            pg.pdf(path=os.path.join(SORTIE, nom), format="A4", print_background=True, prefer_css_page_size=True)
            print("écrit", nom)
        b.close()


if __name__ == "__main__":
    main()
