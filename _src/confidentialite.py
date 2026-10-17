# Règles de confidentialité de chaque application Android et de chaque outil web AYNEHA.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Chaque entrée produit une page  confidentialite-<id>.html  dont l'adresse peut être
# donnée aux boutiques d'applications (AppGallery...).

MAJ = "13 octobre 2026"

ENFANTS = ("Utilisation par des enfants",
           "Comme aucune donnée personnelle n'est collectée, l'application peut être utilisée sans risque particulier par un public jeune, par exemple dans un cadre scolaire.")
MODIFS = ("Modifications",
          "Cette politique peut être mise à jour si l'application évolue. La version en vigueur est toujours celle publiée sur cette page, avec sa date de mise à jour.")
PAS_DE_SUIVI = ("Aucun compte, aucun suivi",
                "Aucune création de compte. Aucun outil d'analyse d'audience, aucun traceur publicitaire, aucune publicité.")


def libre(nom, code=""):
    t = (f"{nom} est un logiciel libre, développé par MAIGUS avec l'aide d'outils d'intelligence artificielle "
         "(Claude, Anthropic). Code sous licence GNU GPL v3 ou ultérieure, polices sous SIL Open Font License 1.1, "
         "logos et images sous CC BY-SA 4.0.")
    if code:
        t += f" Code source : {code}"
    return ("Logiciel libre", t)


ANDROID = [
    {
        "id": "ayneha-school", "nom": "AYNEHA School", "type": "Application Android",
        "intro": "AYNEHA School est une application pour apprendre à lire et à écrire l'AYNEHA. Cette page explique ce qu'elle fait, et surtout ce qu'elle ne fait pas, avec vos informations.",
        "sections": [
            ("Aucune donnée collectée", "Tout fonctionne sur votre appareil, sans connexion. Vos réponses aux quiz, vos tracés et vos textes de l'Atelier ne sont envoyés nulle part."),
            ("Ce qui reste sur votre appareil", "Vos meilleurs scores, vos réglages (thème, taille du texte) et, si vous le saisissez, votre pseudo pour les images partagées. Désinstaller l'application les efface."),
            ("Partage en image", "Quand vous partagez un texte, l'application crée une image temporaire, transmise seulement à l'application que vous choisissez (WhatsApp, par exemple). Elle n'est ni conservée ni envoyée ailleurs."),
            ("Permissions", "Aucune permission : ni contacts, ni position, ni appareil photo, ni internet."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-home", "nom": "AYNEHA Home", "type": "Application Android",
        "intro": "AYNEHA Home garde le site AYNEHA dans votre téléphone, même hors connexion.",
        "sections": [
            ("Aucune donnée collectée", "L'application affiche le contenu du site AYNEHA. Elle ne collecte, n'enregistre et n'envoie aucune donnée personnelle."),
            ("Connexion à internet", "Quand une connexion est disponible, l'application vérifie sur le site AYNEHA (hébergé par GitHub Pages) s'il existe une nouvelle version du contenu, puis la télécharge. Comme pour toute visite de site, l'hébergeur peut enregistrer des informations techniques de connexion, comme l'adresse IP."),
            ("Permissions", "Internet et état du réseau, uniquement pour mettre à jour le contenu."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-keyboard", "nom": "AYNEHA Keyboard", "type": "Application Android",
        "intro": "AYNEHA Keyboard est un clavier pour écrire en AYNEHA sur votre téléphone. Android affiche un avertissement général pour tout clavier installé : voici ce que fait réellement celui-ci.",
        "sections": [
            ("Aucune frappe enregistrée", "Aucune frappe, aucun texte saisi ou composé n'est enregistré, envoyé ni partagé. Le clavier fonctionne entièrement sur votre appareil, sans compte et sans serveur."),
            ("Partage en image", "Le bouton Partager crée une image temporaire de votre texte, transmise seulement à l'application que vous choisissez. Elle n'est ni conservée ni envoyée ailleurs."),
            ("Ce qui reste sur votre appareil", "Vos réglages : vibration, horodatage et pseudo affichés sur les images partagées."),
            ("Permissions", "Vibration, pour le retour au toucher. Aucune permission d'accès à internet, aux contacts, à la position ou aux fichiers."),
            PAS_DE_SUIVI, MODIFS,
        ],
    },
    {
        "id": "ayneha-calc", "nom": "AYNEHA Calc", "type": "Application Android",
        "intro": "AYNEHA Calc est une calculatrice en chiffres AYNEHA.",
        "sections": [
            ("Aucune donnée collectée", "Les calculs se font sur votre appareil. Ils ne sont ni enregistrés ni envoyés."),
            ("Permissions", "Aucune permission. L'application fonctionne sans connexion."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-horloge", "nom": "AYNEHA Horloge", "type": "Application Android",
        "intro": "AYNEHA Horloge affiche l'heure et le calendrier en AYNEHA, avec deux widgets pour l'écran d'accueil.",
        "sections": [
            ("Aucune donnée collectée", "L'application lit seulement l'heure et la date de votre téléphone. Rien n'est enregistré ni envoyé."),
            ("Permissions", "Alarmes exactes, pour mettre à jour le widget horloge à chaque minute ; démarrage du téléphone, pour que les widgets reprennent après un redémarrage. Aucun accès à internet, aux contacts ou à la position."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-numconvert", "nom": "AYNEHA NumConvert", "type": "Application Android",
        "intro": "AYNEHA NumConvert convertit les chiffres entre six systèmes : AYNEHA, N'Ko, adlam, Dogon NÈNÈ, arabe (chiffres indo-arabes orientaux) et français.",
        "sections": [
            ("Aucune donnée collectée", "Les nombres que vous saisissez ne sont ni enregistrés, ni envoyés, ni partagés. Ils disparaissent dès que vous quittez ou réinitialisez l'application."),
            ("Permissions", "Aucune permission particulière. Certaines polices (arabe et N'Ko) peuvent être téléchargées une seule fois par les services Google Play, indépendamment de l'application, puis restent en cache sur votre appareil."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
            libre("AYNEHA NumConvert", "https://github.com/maigus223/ayneha-numconvert"),
        ],
    },
    {
        "id": "ayneha-carnet", "nom": "AYNEHA Carnet", "type": "Application Android (en préparation)",
        "intro": "AYNEHA Carnet est un carnet de notes en AYNEHA, en préparation. Cette politique décrit son fonctionnement prévu ; elle sera confirmée à sa sortie.",
        "sections": [
            ("Vos notes restent chez vous", "Les notes sont enregistrées uniquement sur votre appareil. Aucun compte, aucun serveur : elles ne sont jamais envoyées ailleurs. Désinstaller l'application les efface."),
            ("Partage", "Une note n'est partagée que si vous le décidez, avec l'application que vous choisissez."),
            PAS_DE_SUIVI, MODIFS,
        ],
    },
]

WEB = [
    {
        "id": "site", "nom": "Le site AYNEHA", "type": "Site web",
        "intro": "Ce site présente l'écriture AYNEHA et ses outils.",
        "sections": [
            ("Aucune donnée collectée", "Aucun cookie, aucun traceur, aucune mesure d'audience, aucune publicité."),
            ("Aucun service tiers", "Les polices et les scripts sont hébergés sur le site lui-même : en affichant les pages, votre navigateur ne contacte aucun autre service."),
            ("Hébergement", "Le site est hébergé par GitHub Pages, qui peut enregistrer des informations techniques de connexion (comme l'adresse IP) pour assurer le service et sa sécurité."),
            ("Liens externes", "Les liens vers d'autres sites (Omniglot, réseaux sociaux, Google Drive) mènent à des services qui ont leurs propres règles."),
            MODIFS,
        ],
    },
    {
        "id": "transcripteur", "nom": "Transcripteur", "type": "Outil web", "page": "convertisseur.html",
        "intro": "Le transcripteur écrit en AYNEHA un texte songhay tapé en lettres latines.",
        "sections": [
            ("Tout reste dans votre navigateur", "La transcription se fait dans votre navigateur. Votre texte n'est envoyé nulle part."),
            ("Mémoire du dernier texte", "Pour le retrouver à votre prochaine visite, votre dernier texte est gardé dans le stockage de votre navigateur, sur votre appareil seulement. « Tout effacer » le supprime."),
            ("Copie et image", "La copie passe par le presse-papiers de votre appareil ; l'image est créée par votre navigateur et enregistrée dans vos téléchargements."),
            MODIFS,
        ],
    },
    {
        "id": "clavier", "nom": "Clavier", "type": "Outil web", "page": "clavier.html",
        "intro": "Le clavier en ligne permet d'écrire en AYNEHA dans le navigateur.",
        "sections": [
            ("Tout reste dans votre navigateur", "Ce que vous tapez n'est ni enregistré ni envoyé. Quitter la page efface le texte."),
            ("Copie et image", "La copie passe par le presse-papiers de votre appareil ; l'image est créée par votre navigateur et enregistrée dans vos téléchargements."),
            MODIFS,
        ],
    },
    {
        "id": "calculatrice", "nom": "Calculatrice", "type": "Outil web", "page": "calculatrice.html",
        "intro": "La calculatrice en ligne calcule en chiffres AYNEHA.",
        "sections": [
            ("Tout reste dans votre navigateur", "Les calculs se font dans votre navigateur. Ils ne sont ni enregistrés ni envoyés."),
            MODIFS,
        ],
    },
    {
        "id": "nombres", "nom": "Convertisseur de nombres", "type": "Outil web", "page": "nombres.html",
        "intro": "Le convertisseur affiche un nombre en chiffres AYNEHA, N'Ko, adlam, Dogon NÈNÈ, arabes et français.",
        "sections": [
            ("Tout reste dans votre navigateur", "Les nombres saisis ne sont ni enregistrés ni envoyés."),
            MODIFS,
        ],
    },
    {
        "id": "carte", "nom": "Ma carte AYNEHA", "type": "Outil web", "page": "carte.html",
        "intro": "« Ma carte AYNEHA » crée une carte à partager avec un message écrit en AYNEHA, et permet de la proposer pour la galerie du site.",
        "sections": [
            ("Tout reste dans votre navigateur", "La carte est dessinée par votre navigateur. Votre message, votre traduction et votre pseudo ne sont envoyés nulle part tant que vous ne décidez pas de partager ou de proposer la carte."),
            ("Mémoire du pseudo", "Pour vous éviter de le retaper, votre pseudo est gardé dans le stockage de votre navigateur, sur votre appareil seulement. Effacez le champ pour le supprimer."),
            ("Partage", "Le bouton Partager transmet l'image seulement à l'application que vous choisissez (WhatsApp, par exemple). « Enregistrer l'image » la met dans vos téléchargements."),
            ("Proposer une carte", "Les boutons « Proposer » ouvrent votre application WhatsApp ou votre messagerie avec un message déjà rempli : modèle, texte, traduction et pseudo. Rien ne part sans que vous l'envoyiez vous-même. Le message est reçu par AYNEHA, qui ne s'en sert que pour relire la carte et la publier dans la galerie. Votre numéro ou votre adresse e-mail ne sont jamais publiés."),
            ("Ce qui est publié", "Une carte validée est publiée dans la galerie avec son message, sa traduction et le pseudo tel qu'il a été écrit. Pour retirer une carte de la galerie, il suffit de le demander à contact@ayneha.org."),
            MODIFS,
        ],
    },
    {
        "id": "quiz", "nom": "Quiz", "type": "Outil web", "page": "quiz.html",
        "intro": "Les quiz permettent de s'exercer à lire l'AYNEHA, directement dans le navigateur.",
        "sections": [
            ("Tout reste dans votre navigateur", "Vos réponses ne sont ni enregistrées ni envoyées."),
            ("Meilleurs scores", "Votre meilleur score à chaque jeu est gardé dans le stockage de votre navigateur, sur votre appareil seulement. Effacer les données du site dans votre navigateur le supprime."),
            MODIFS,
        ],
    },
    {
        "id": "horloge", "nom": "Horloge et calendrier", "type": "Outil web", "page": "horloge.html",
        "intro": "L'horloge affiche l'heure et le calendrier en AYNEHA.",
        "sections": [
            ("Tout reste dans votre navigateur", "L'horloge lit seulement l'heure et la date de votre appareil. Rien n'est enregistré ni envoyé."),
            MODIFS,
        ],
    },
]
