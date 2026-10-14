# Fiches des applications Android AYNEHA (une page par application).
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Pour mettre à jour une application :
#   - "apk" : lien du fichier APK (par ex. "assets/telechargements/ayneha-school.apk"
#     ou ".../releases/latest/download/xxx.apk") ; "" = bouton « bientôt » ;
#   - "naabiga" : page de l'application sur store.naabiga.com ; "" = « bientôt » ;
#   - "code" : dépôt du code source ; "" = pas de lien ;
#   - logo et couverture : remplacer assets/img/apps/<id>-logo.png et <id>-couverture.jpg
#     par les vrais fichiers (mêmes noms), puis relancer  python3 _src/build.py

NAABIGA = "https://store.naabiga.com/produit/"
CONFIDENTIALITE = "Aucun compte, aucun serveur, aucune publicité, aucun outil d'analyse. Rien de ce que vous tapez n'est enregistré ni envoyé."

APPS = [
    {
        "id": "ayneha-school",
        "nom": "AYNEHA School",
        "outil": ("quiz.html", "Faire les quiz en ligne"),
        "statut": "nouveau",
        "glyphe": "H",
        "orange": True,
        "resume": "Apprendre à lire et à écrire l'AYNEHA, seul et à son rythme.",
        "intro": [
            "AYNEHA School accompagne l'apprenant de la première lettre jusqu'à la lecture de vrais mots songhay. Tout se fait dans l'application, sans connexion : on peut apprendre au village comme en ville.",
        ],
        "points": [
            "L'alphabet lettre par lettre : prononciation, épellation et toutes les formes de chaque lettre",
            "Les 4 accents expliqués, avec le tableau des 50 combinaisons",
            "Le syllabaire : chaque consonne avec les cinq voyelles",
            "Les chiffres, avec un convertisseur et un tableau de 0 à 9999",
            "Le tracé des lettres et des chiffres au doigt, noté de 0 à 3 étoiles",
            "Six jeux de quiz : reconnaître, retrouver, quel accent, lire la syllabe, chiffres, remettre dans l'ordre",
            "Un atelier de transcription du latin vers l'AYNEHA, avec l'explication de chaque lettre et le partage en image",
            "Des exercices de lecture sur de vrais mots, des noms de régions, des patronymes et l'hymne national, tous vérifiés par l'auteur",
        ],
        "etapes": [
            "Ouvrez l'application et commencez par « L'alphabet ».",
            "Touchez une lettre pour voir sa fiche, puis « Tracer » pour l'écrire au doigt.",
            "Passez aux accents, au syllabaire et aux chiffres.",
            "Testez-vous avec les quiz : votre meilleur score est gardé.",
            "Lisez de vrais mots dans « Lecture », puis écrivez les vôtres dans l'Atelier.",
        ],
        "compat": "Android 8 ou plus récent. Fonctionne sans connexion et ne demande aucune autorisation.",
        "reglages": "Thème automatique, clair ou sombre ; taille du texte AYNEHA ; pseudo et horodatage pour les images partagées.",
        "naabiga": "",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-home",
        "nom": "AYNEHA Home",
        "glyphe": "H",
        "resume": "Tout le site AYNEHA dans votre téléphone, même hors connexion.",
        "intro": [
            "AYNEHA Home est l'application officielle du site : l'alphabet, les règles, les outils en ligne et les ressources, toujours à portée de main. Elle reste utilisable en mode avion et se met à jour toute seule dès que la connexion revient.",
        ],
        "points": [
            "L'alphabet, le transcripteur, le clavier, la calculatrice, le convertisseur de nombres et l'horloge",
            "Le contenu déjà installé reste disponible sans connexion",
            "Mise à jour automatique et sûre : si un fichier manque, l'ancienne version reste intacte",
            "Tirer vers le bas pour actualiser, bouton retour qui suit votre navigation",
        ],
        "etapes": [
            "Installez l'application, puis ouvrez-la : elle démarre sur la page d'accueil.",
            "Naviguez comme sur le site.",
            "Quand vous avez du réseau, l'application vérifie seule s'il existe du nouveau contenu.",
        ],
        "compat": "Android 7 ou plus récent. Utilise internet seulement pour mettre à jour le contenu.",
        "naabiga": NAABIGA + "ayneha",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-keyboard",
        "nom": "AYNEHA Keyboard",
        "glyphe": "K",
        "resume": "Le clavier pour écrire en AYNEHA dans toutes les applications du téléphone.",
        "intro": [
            "AYNEHA Keyboard s'installe comme n'importe quel clavier Android. Il fonctionne dans toutes vos applications : messagerie, réseaux sociaux, notes. Son bouton Partager transforme votre texte en image, lisible même par ceux qui n'ont pas la police AYNEHA.",
        ],
        "points": [
            "Disposition de droite à gauche : la première touche de chaque rangée est à droite",
            "Quatre pages : lettres, symboles, pavé numérique en chiffres AYNEHA, émojis",
            "Appui long sur une lettre pour ses formes : double, muette, nasalisée, ouverte",
            "Bouton Partager : le texte devient une image, avec pseudo et horodatage facultatifs",
            "Zone de test intégrée, vibration au toucher réglable",
        ],
        "etapes": [
            "Ouvrez AYNEHA Keyboard et touchez « Activer le clavier AYNEHA ».",
            "Dans la liste des claviers d'Android, activez AYNEHA Keyboard.",
            "Dans une application, changez de clavier (icône du clavier ou appui long sur la barre d'espace) et choisissez AYNEHA.",
            "Pour envoyer un texte lisible par tous, écrivez-le dans « Tester le clavier » puis touchez Partager.",
        ],
        "compat": "Android 7 ou plus récent.",
        "reglages": "Vibration au toucher ; horodatage sur les images partagées ; pseudo affiché sur les images (20 caractères au plus).",
        "naabiga": NAABIGA + "ayneha-keyboard",
        "apk": "",
        "code": "",
    },
    {
        "id": "ayneha-calc",
        "nom": "AYNEHA Calc",
        "glyphe": "D7",
        "resume": "Une calculatrice entièrement en chiffres AYNEHA.",
        "intro": [
            "AYNEHA Calc sert aux calculs de tous les jours, au marché, à la boutique ou au grin, entièrement en chiffres AYNEHA et de droite à gauche.",
        ],
        "points": [
            "Addition, soustraction, multiplication, division et pourcentage",
            "Résultats décimaux avec la virgule AYNEHA",
            "Le calcul en cours s'affiche au-dessus du résultat",
            "Effacement d'un chiffre ou de tout le calcul",
        ],
        "etapes": [
            "Tapez les chiffres et l'opération comme sur une calculatrice ordinaire.",
            "Touchez « = » pour le résultat, « AC » pour tout effacer.",
        ],
        "compat": "Android 7 ou plus récent. Fonctionne sans connexion.",
        "naabiga": NAABIGA + "ayneha-calc-2",
        "apk": "",
        "code": "",
        "outil": ("calculatrice.html", "Essayer la calculatrice en ligne"),
    },
    {
        "id": "ayneha-horloge",
        "nom": "AYNEHA Horloge",
        "glyphe": "I",
        "resume": "L'heure, le jour, le mois et l'année songhay en AYNEHA, avec un calendrier.",
        "intro": [
            "AYNEHA Horloge affiche le temps entièrement en AYNEHA, sans aucun caractère latin : l'heure avec les secondes, le jour, le mois et l'année songhay (année grégorienne + 2001).",
        ],
        "points": [
            "Heure en direct, secondes comprises",
            "Calendrier navigable mois par mois, le jour d'aujourd'hui mis en valeur",
            "Deux widgets pour l'écran d'accueil : horloge et calendrier",
        ],
        "reserve": "Les deux widgets sont encore en cours d'amélioration et ne se mettent pas toujours à jour au quotidien. L'application elle-même fonctionne normalement. Une version en calendrier lunaire songhay est prévue.",
        "etapes": [
            "Ouvrez l'application pour voir l'heure et le calendrier.",
            "Pour un widget : appui long sur l'écran d'accueil, « Widgets », puis « AYNEHA Horloge ».",
        ],
        "compat": "Android 7 ou plus récent.",
        "naabiga": NAABIGA + "ayneha-horloge",
        "apk": "",
        "code": "",
        "outil": ("horloge.html", "Voir l'horloge en ligne"),
    },
    {
        "id": "ayneha-numconvert",
        "nom": "AYNEHA NumConvert",
        "glyphe": "D4",
        "resume": "Un nombre en chiffres AYNEHA, N'Ko, Dogon NÈNÈ, arabes et français.",
        "intro": [
            "AYNEHA NumConvert passe un nombre d'un système de chiffres à l'autre, entre cinq écritures : AYNEHA, N'Ko, Dogon NÈNÈ (écriture de Yahya Sékou Salah GUINDO), arabe et français. Pratique pour apprendre les chiffres AYNEHA en partant de ceux que l'on connaît déjà.",
        ],
        "points": [
            "Conversion dans les deux sens, jusqu'à 17 chiffres, avec séparateurs de milliers",
            "Le pavé numérique affiche les chiffres du système de départ",
            "Les cinq résultats s'affichent en même temps",
        ],
        "etapes": [
            "Choisissez le système de départ.",
            "Tapez le nombre : les autres versions s'affichent aussitôt.",
        ],
        "compat": "Android. Fonctionne sans connexion.",
        "naabiga": "",
        "apk": "",
        "code": "https://github.com/maigus223/ayneha-numconvert",
        "outil": ("nombres.html", "Essayer le convertisseur en ligne"),
    },
    {
        "id": "ayneha-carnet",
        "nom": "AYNEHA Carnet",
        "statut": "preparation",
        "glyphe": "W",
        "resume": "Un carnet de notes entièrement en AYNEHA.",
        "intro": [
            "AYNEHA Carnet est un carnet de notes dont toute l'interface est écrite en AYNEHA, sans aucun caractère latin. Il est en préparation : il sera proposé ici dès qu'il sera prêt.",
        ],
        "points": [
            "Créer, enregistrer, épingler, supprimer et partager une note",
            "Rechercher dans ses notes, titre facultatif",
            "Listes, sens d'écriture, chiffres en AYNEHA",
            "Sans connexion, sans compte, sans serveur",
        ],
        "etapes": [],
        "compat": "Android.",
        "naabiga": "",
        "apk": "",
        "code": "",
    },
]
