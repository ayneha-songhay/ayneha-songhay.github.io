# Compteurs de téléchargements des applications AYNEHA.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Lancé chaque jour par .github/workflows/compteurs.yml (et à la demande).
# Pour chaque application qui a un "depot" dans applications.py, lit les
# « Releases » publiques sur GitHub et additionne le nombre de téléchargements
# des fichiers .apk (chiffre compté par GitHub lui-même, sans aucun traceur).
# Résultat : assets/data/telechargements.json, lu par assets/js/site.js.
#
# Essai à la main :  python3 _src/compteurs.py

import datetime
import json
import os
import sys
import urllib.request

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
sys.path.insert(0, ICI)
import applications as APPS  # noqa: E402

SORTIE = os.path.join(RACINE, "assets", "data", "telechargements.json")


def lire(url):
    req = urllib.request.Request(url, headers={
        "Accept": "application/vnd.github+json",
        "User-Agent": "ayneha.org-compteurs",
    })
    jeton = os.environ.get("GITHUB_TOKEN")
    if jeton:
        req.add_header("Authorization", f"Bearer {jeton}")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def main():
    ancien = {}
    if os.path.isfile(SORTIE):
        with open(SORTIE, encoding="utf-8") as fh:
            ancien = json.load(fh).get("applications", {})

    apps = {}
    for app in APPS.APPS:
        depot = app.get("depot")
        if not depot:
            continue
        try:
            releases = []
            page = 1
            while True:
                lot = lire(f"https://api.github.com/repos/{depot}/releases?per_page=100&page={page}")
                releases += lot
                if len(lot) < 100:
                    break
                page += 1
        except Exception as e:  # réseau ou GitHub indisponible : on garde l'ancien chiffre
            print(f"{app['id']} : lecture impossible ({e}), ancien chiffre conservé")
            if app["id"] in ancien:
                apps[app["id"]] = ancien[app["id"]]
            continue

        total = 0
        lien = ""
        depuis = ""
        version_site = app.get("version", "")
        for rel in releases:
            if rel.get("draft"):
                continue
            date = (rel.get("published_at") or rel.get("created_at") or "")[:10]
            if date and (not depuis or date < depuis):
                depuis = date
            tag = (rel.get("tag_name") or "").lstrip("vV")
            for f in rel.get("assets", []):
                if not f.get("name", "").lower().endswith(".apk"):
                    continue
                total += int(f.get("download_count") or 0)
                # Lien du bouton : l'APK de la release qui a la même version que le site
                if tag == version_site and not lien:
                    lien = f.get("browser_download_url", "")
        apps[app["id"]] = {"total": total, "depuis": depuis, "version": version_site, "lien": lien}
        print(f"{app['id']} : {total} téléchargements depuis {depuis or '?'} ; lien {'trouvé' if lien else 'ABSENT (bouton vers le site)'}")

    donnees = {
        "maj": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d"),
        "total": sum(a["total"] for a in apps.values()),
        "applications": apps,
    }
    os.makedirs(os.path.dirname(SORTIE), exist_ok=True)
    # On ne réécrit pas le fichier si seuls les chiffres de la date changent
    if ancien == apps and os.path.isfile(SORTIE):
        print("Aucun changement.")
        return
    with open(SORTIE, "w", encoding="utf-8") as fh:
        json.dump(donnees, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print("Total :", donnees["total"])


if __name__ == "__main__":
    main()
