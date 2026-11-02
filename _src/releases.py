# Lien GitHub Release d'un APK, pour mises-a-jour.json.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# assets/data/telechargements.json (écrit par _src/compteurs.py) donne, pour chaque
# application, le lien de l'APK de la release GitHub de même version et son empreinte
# SHA-256 (fournie par GitHub). Les mises à jour dans les applications passent par ce
# lien (téléchargement compté par GitHub) SEULEMENT si l'empreinte est exactement
# celle de l'APK du site ; sinon elles gardent le fichier du site.

import json
import os

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FICHIER = os.path.join(RACINE, "assets", "data", "telechargements.json")


def lien_release(app_id, version, sha256):
    """Lien de la release si même version et même empreinte, sinon None."""
    if not sha256 or not os.path.isfile(FICHIER):
        return None
    try:
        with open(FICHIER, encoding="utf-8") as fh:
            a = json.load(fh).get("applications", {}).get(app_id) or {}
    except (OSError, ValueError):
        return None
    if a.get("lien") and a.get("version") == version and (a.get("sha256") or "").lower() == sha256.lower():
        return a["lien"]
    return None
