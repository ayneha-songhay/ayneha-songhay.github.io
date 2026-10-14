# Galerie « Ma carte AYNEHA » : les cartes proposées par la communauté, relues et validées.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Règles de la galerie :
#  - chaque carte est relue, et corrigée si nécessaire, avant d'être publiée ;
#  - le pseudo s'affiche tel qu'il a été écrit ;
#  - une carte qui contient une insulte ou manque de respect à une personne n'est pas publiée ;
#  - toute carte validée est publiée.
#
# Ajouter une carte = ajouter un bloc { ... } à la FIN de la liste, puis lancer  python3 _src/build.py
#   modele      : salut, fete, naissance, mariage, anniversaire, condoleances ou fierte
#   format      : carre ou statut
#   texte       : le message en songhay, lettres latines (corrigé si nécessaire)
#   ayneha      : facultatif ; le texte AYNEHA exact, collé depuis le clavier AYNEHA,
#                 seulement si la transcription automatique du texte latin ne convient pas
#   traduction  : facultatif, en français
#   traduction_en: facultatif, la traduction anglaise affichée sur la version anglaise de la galerie
#   pseudo      : tel qu'écrit par la personne ("" si aucun)
#   montrerLatin: True ou False (afficher le texte latin sur la carte)
#   date        : date de publication, par exemple "14 octobre 2026"
#
# Exemple :
#   {"modele": "fete", "format": "carre", "texte": "...", "traduction": "Bonne fête",
#    "pseudo": "Fati de Gao", "montrerLatin": True, "date": "14 octobre 2026"},

CARTES = [
    # Exemples préparés par AYNEHA (marqués « Exemple » dans la galerie)
    {"exemple": True, "modele": "fierte", "format": "carre", "texte": "ayneha",
     "traduction": "l'écriture du songhay", "traduction_en": "the writing system of Songhay", "pseudo": "", "montrerLatin": True},
    {"exemple": True, "modele": "fete", "format": "carre", "texte": "wa key yeshi, war ma alhanaŋ",
     "traduction": "Vous souhaite bonne fête et vous demande pardon", "traduction_en": "Wishing you a happy celebration and asking your forgiveness", "pseudo": "MAIGUS", "montrerLatin": True},
    # Cartes de la communauté
    {"modele": "fierte", "format": "statut", "texte": "mo kãga ni bey no ma ni hẽ",
     "traduction": "C’est l’œil qui te connaît qui te pleure", "traduction_en": "It is the eye that knows you that weeps for you",
     "pseudo": "Albachar", "montrerLatin": True, "date": "14 octobre 2026"},
]
