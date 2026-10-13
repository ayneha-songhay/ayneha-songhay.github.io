# Fiches des applications AYNEHA affichées sur la page Applications.
# Pour publier un fichier APK sur le site : mettre le lien dans "apk"
# (par exemple "https://github.com/maigus223/ayneha-school/releases/latest/download/ayneha-school.apk"
#  ou "assets/telechargements/ayneha-school.apk"), puis relancer  python3 _src/build.py
# Laisser "" tant que le fichier n'est pas en ligne : le bouton affiche alors « bientôt ».

NAABIGA = "https://store.naabiga.com/produit/"

APPS = [
    {
        "id": "ayneha-school",
        "nom": "AYNEHA School",
        "nouveau": True,
        "icone": "H",
        "orange": True,
        "resume": "Apprendre à lire et à écrire l'AYNEHA, seul et à son rythme.",
        "points": [
            "L'alphabet lettre par lettre, avec la prononciation, l'épellation et toutes les formes de chaque lettre",
            "Les accents, le syllabaire et les chiffres, avec un convertisseur de nombres",
            "Le tracé des lettres au doigt, noté de 0 à 3 étoiles",
            "Six jeux de quiz et des exercices de lecture sur de vrais mots songhay vérifiés par l'auteur",
            "Un atelier de transcription du latin vers l'AYNEHA, avec partage en image",
        ],
        "compat": "Android 8 ou plus récent. Fonctionne sans connexion, ne demande aucune autorisation.",
        "naabiga": "",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha",
        "nom": "AYNEHA",
        "icone": "H",
        "resume": "L'application officielle : tout le site AYNEHA dans votre téléphone, même hors connexion.",
        "points": [
            "L'alphabet, le clavier virtuel, le transcripteur, l'horloge et les ressources",
            "Le contenu reste disponible en mode avion",
            "Se met à jour toute seule quand la connexion revient",
        ],
        "compat": "Android 7 ou plus récent.",
        "naabiga": NAABIGA + "ayneha",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-keyboard",
        "nom": "AYNEHA Keyboard",
        "icone": "K",
        "resume": "Le clavier pour écrire en AYNEHA dans toutes les applications du téléphone.",
        "points": [
            "Disposition de droite à gauche, avec les lettres, les symboles, un pavé numérique et les émojis",
            "Appui long sur une lettre pour ses formes : double, muette, nasalisée, ouverte",
            "Bouton Partager : le texte devient une image lisible par tous, même sans la police AYNEHA",
            "Pseudo et horodatage facultatifs sur les images partagées, vibration réglable",
        ],
        "compat": "Android 7 ou plus récent. Aucune frappe n'est enregistrée ni envoyée.",
        "naabiga": NAABIGA + "ayneha-keyboard",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-calc",
        "nom": "AYNEHA Calc",
        "icone": "D7",
        "resume": "Une calculatrice entièrement en chiffres AYNEHA, pour les calculs de tous les jours.",
        "points": [
            "Addition, soustraction, multiplication, division et pourcentage",
            "Résultats décimaux avec la virgule AYNEHA",
            "Le calcul en cours s'affiche au-dessus du résultat",
        ],
        "compat": "Android 7 ou plus récent. Fonctionne sans connexion.",
        "naabiga": NAABIGA + "ayneha-calc-2",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-horloge",
        "nom": "AYNEHA Horloge",
        "icone": "I",
        "resume": "L'heure, le jour, le mois et l'année songhay en AYNEHA, avec un calendrier.",
        "points": [
            "Heure en direct, secondes comprises",
            "Calendrier navigable mois par mois",
            "Deux widgets pour l'écran d'accueil (horloge et calendrier)",
        ],
        "reserve": "Les deux widgets sont encore en cours d'amélioration et ne sont pas toujours à jour au quotidien. L'application elle-même fonctionne normalement.",
        "compat": "Android 7 ou plus récent.",
        "naabiga": NAABIGA + "ayneha-horloge",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-numconvert",
        "nom": "AYNEHA NumConvert",
        "icone": "D4",
        "resume": "Passer un nombre d'un système de chiffres à l'autre : AYNEHA, français, arabe et N'Ko.",
        "points": [
            "Conversion dans les deux sens, jusqu'à 17 chiffres, avec séparateurs de milliers",
            "Le pavé numérique affiche les chiffres du système de départ",
        ],
        "compat": "Android.",
        "naabiga": "",
        "apk": "",
        "code": "",
    },
]
