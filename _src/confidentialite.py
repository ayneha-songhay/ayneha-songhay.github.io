# Règles de confidentialité de chaque application Android et de chaque outil web AYNEHA.
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Chaque entrée produit une page  confidentialite-<id>.html  dont l'adresse peut être
# donnée aux boutiques d'applications (AppGallery...).

MAJ = "17 octobre 2026"

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
        "id": "ayneha-school", "maj": "1er novembre 2026", "nom": "AYNEHA School", "type": "Application Android",
        "intro": "AYNEHA School est une application pour apprendre à lire et à écrire l'AYNEHA. Cette page explique ce qu'elle fait, et surtout ce qu'elle ne fait pas, avec vos informations.",
        "sections": [
            ("Aucune donnée collectée", "Tout fonctionne sur votre appareil, sans connexion. Vos réponses aux quiz, vos tracés et vos textes de l'Atelier ne sont envoyés nulle part."),
            ("Ce qui reste sur votre appareil", "Vos meilleurs scores, vos réglages (thème, taille du texte) et, si vous le saisissez, votre pseudo pour les images partagées. Désinstaller l'application les efface."),
            ("Partage en image", "Quand vous partagez un texte, l'application crée une image temporaire, transmise seulement à l'application que vous choisissez (WhatsApp, par exemple). Elle n'est ni conservée ni envoyée ailleurs."),
            ("Mise à jour depuis ayneha.org", "Seulement quand vous tirez le bandeau de l'accueil vers le bas, l'application lit sur ayneha.org un petit fichier qui indique la dernière version. Si une version plus récente existe, elle peut être téléchargée depuis ayneha.org ; son empreinte est vérifiée et c'est vous qui confirmez l'installation. Aucune donnée personnelle n'est envoyée."),
            ("Permissions", "Internet et installation d'applications, uniquement pour la mise à jour depuis ayneha.org. Aucun accès aux contacts, à la position ou à l'appareil photo. Tout le reste fonctionne sans connexion."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-home", "maj": "1er novembre 2026", "nom": "AYNEHA Home", "type": "Application Android",
        "intro": "AYNEHA Home garde le site AYNEHA dans votre téléphone, même hors connexion.",
        "sections": [
            ("Aucune donnée collectée", "L'application affiche le contenu du site AYNEHA. Elle ne collecte, n'enregistre et n'envoie aucune donnée personnelle."),
            ("Connexion à internet", "Quand une connexion est disponible, l'application vérifie sur le site AYNEHA (hébergé par GitHub Pages) s'il existe une nouvelle version du contenu, puis la télécharge. Comme pour toute visite de site, l'hébergeur peut enregistrer des informations techniques de connexion, comme l'adresse IP."),
            ("Images", "Quand vous enregistrez une image créée sur le site (carte, texte en AYNEHA), elle est rangée dans vos images, dossier Pictures/AYNEHA. Quand vous la partagez, elle est transmise seulement à l'application que vous choisissez."),
            ("Liens et téléchargements", "Les liens vers WhatsApp, l'e-mail ou d'autres sites, et les fichiers à télécharger (PDF, police, applications), s'ouvrent dans l'application correspondante de votre téléphone ou dans votre navigateur."),
            ("Mise à jour depuis ayneha.org", "Quand vous tirez l'écran vers le bas, l'application lit aussi sur ayneha.org un petit fichier qui indique sa dernière version. Si une version plus récente existe, une fenêtre vous la propose ; elle est téléchargée depuis ayneha.org, son empreinte est vérifiée et c'est vous qui confirmez l'installation. Aucune donnée personnelle n'est envoyée."),
            ("Permissions", "Internet et état du réseau, pour mettre à jour le contenu et vérifier la version de l'application ; installation d'applications, uniquement pour installer une mise à jour après votre confirmation."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-keyboard", "maj": "1er novembre 2026", "nom": "AYNEHA Keyboard", "type": "Application Android",
        "intro": "AYNEHA Keyboard est un clavier pour écrire en AYNEHA sur votre téléphone. Android affiche un avertissement général pour tout clavier installé : voici ce que fait réellement celui-ci.",
        "sections": [
            ("Aucune frappe enregistrée", "Aucune frappe, aucun texte saisi ou composé n'est enregistré, envoyé ni partagé. Le clavier fonctionne entièrement sur votre appareil, sans compte et sans serveur."),
            ("Partage en image", "Le bouton Partager crée une image temporaire de votre texte, transmise seulement à l'application que vous choisissez. Elle n'est ni conservée ni envoyée ailleurs."),
            ("Ce qui reste sur votre appareil", "Vos réglages : vibration, horodatage et pseudo affichés sur les images partagées."),
            ("Mise à jour depuis ayneha.org", "Le clavier lui-même n'utilise jamais Internet. Seul l'écran principal de l'application contacte ayneha.org, et uniquement quand vous le tirez vers le bas, pour lire un petit fichier qui indique la dernière version. Si une version plus récente existe, elle peut être téléchargée depuis ayneha.org ; son empreinte est vérifiée et c'est vous qui confirmez l'installation. Rien de ce que vous tapez n'est envoyé."),
            ("Permissions", "Vibration, pour le retour au toucher ; internet et installation d'applications, uniquement pour la mise à jour depuis ayneha.org, depuis l'écran principal. Aucun accès aux contacts, à la position ou aux fichiers."),
            PAS_DE_SUIVI, MODIFS,
        ],
    },
    {
        "id": "ayneha-calc", "maj": "1er novembre 2026", "nom": "AYNEHA Calc", "type": "Application Android",
        "intro": "AYNEHA Calc est une calculatrice en chiffres AYNEHA.",
        "sections": [
            ("Aucune donnée collectée", "Les calculs se font sur votre appareil. Ils ne sont ni enregistrés ni envoyés."),
            ("Mise à jour depuis ayneha.org", "Seulement quand vous tirez le haut de l'écran vers le bas, l'application lit sur ayneha.org un petit fichier qui indique la dernière version. Si une version plus récente existe, elle peut être téléchargée depuis ayneha.org ; son empreinte est vérifiée et c'est vous qui confirmez l'installation. Aucun calcul ni aucune donnée personnelle n'est envoyé."),
            ("Permissions", "Internet et installation d'applications, uniquement pour la mise à jour depuis ayneha.org. Les calculs fonctionnent sans connexion."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-horloge", "nom": "AYNEHA Horloge", "type": "Application Android", "maj": "29 octobre 2026",
        "intro": "AYNEHA Horloge affiche l'heure et le calendrier en AYNEHA, avec deux widgets pour l'écran d'accueil.",
        "sections": [
            ("Aucune donnée collectée", "L'application lit l'heure, la date et le fuseau horaire de votre téléphone. Tout est calculé sur le téléphone. Seuls vos réglages (début du mois lunaire, position si vous l'avez donnée) sont gardés sur le téléphone."),
            ("Position (facultative)", "Le jour lunaire change au coucher du soleil. Par défaut, il est calculé pour la grande ville de votre fuseau horaire. Si vous touchez le bouton position, l'application demande votre position approximative : elle est arrondie, gardée uniquement sur le téléphone et jamais envoyée."),
            ("Mise à jour depuis ayneha.org", "Seulement quand vous tirez l'écran vers le bas, l'application lit sur ayneha.org un petit fichier qui indique la dernière version. Si une version plus récente existe, elle peut la télécharger depuis ayneha.org ; son empreinte est vérifiée et c'est vous qui confirmez l'installation. Aucune donnée personnelle n'est envoyée."),
            ("Permissions", "Alarmes exactes, pour mettre à jour le widget horloge à chaque minute ; démarrage du téléphone, pour que les widgets reprennent après un redémarrage ; position approximative, seulement si vous touchez le bouton position ; internet et installation d'applications, seulement pour la mise à jour depuis ayneha.org. Aucun accès aux contacts, aux photos ou aux fichiers."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
        ],
    },
    {
        "id": "ayneha-numconvert", "maj": "1er novembre 2026", "nom": "AYNEHA NumConvert", "type": "Application Android",
        "intro": "AYNEHA NumConvert convertit les chiffres entre six systèmes : AYNEHA, N'Ko, adlam, Dogon NÈNÈ, arabe (chiffres indo-arabes orientaux) et français.",
        "sections": [
            ("Aucune donnée collectée", "Les nombres que vous saisissez ne sont ni enregistrés, ni envoyés, ni partagés. Ils disparaissent dès que vous quittez ou réinitialisez l'application."),
            ("Mise à jour depuis ayneha.org", "Seulement quand vous tirez l'écran vers le bas, l'application lit sur ayneha.org un petit fichier qui indique la dernière version. Si une version plus récente existe, elle peut être téléchargée depuis ayneha.org ; son empreinte est vérifiée et c'est vous qui confirmez l'installation. Les nombres saisis et aucune donnée personnelle ne sont envoyés."),
            ("Permissions", "Internet et installation d'applications, uniquement pour la mise à jour depuis ayneha.org. Aucun accès aux contacts, à la position, à l'appareil photo ou aux fichiers. Certaines polices (arabe et N'Ko) peuvent être téléchargées une seule fois par les services Google Play, indépendamment de l'application, puis restent en cache sur votre appareil."),
            PAS_DE_SUIVI, ENFANTS, MODIFS,
            libre("AYNEHA NumConvert", "https://github.com/maigus223/ayneha-numconvert"),
        ],
    },
    {
        "id": "ayneha-carnet", "maj": "1er novembre 2026", "nom": "AYNEHA Carnet", "type": "Application Android",
        "intro": "AYNEHA Carnet est un carnet de notes entièrement en AYNEHA.",
        "sections": [
            ("Vos notes restent chez vous", "Les notes sont enregistrées uniquement sur votre appareil. Aucun compte, aucun serveur : elles ne sont jamais envoyées ailleurs. Désinstaller l'application les efface."),
            ("Partage", "Une note n'est partagée que si vous le décidez, avec l'application que vous choisissez."),
            ("Mise à jour depuis ayneha.org", "Seulement quand vous tirez la liste des notes vers le bas, l'application lit sur ayneha.org un petit fichier qui indique la dernière version. Si une version plus récente existe, elle peut être téléchargée depuis ayneha.org ; son empreinte est vérifiée et c'est vous qui confirmez l'installation. Vos notes et ce que vous tapez ne sont jamais envoyés : le clavier intégré n'utilise jamais Internet."),
            ("Permissions", "Internet et installation d'applications, uniquement pour la mise à jour depuis ayneha.org. Aucun accès aux contacts, à la position ou aux fichiers."),
            PAS_DE_SUIVI, MODIFS,
        ],
    },
    {
        "id": "ayneha-margey", "maj": "2 novembre 2026", "nom": "AYNEHA Margey", "type": "Application Android",
        "intro": "AYNEHA Margey (affichée « Margey ») est une messagerie qui fonctionne sans Internet : les téléphones proches se parlent en Bluetooth et relaient les messages des autres.",
        "sections": [
            ("Aucune donnée collectée", "Pas de compte, pas de numéro de téléphone, pas de serveur, pas de publicité, pas de traceur. L'application n'a même pas l'autorisation d'accéder à Internet : tout reste sur les téléphones."),
            ("Votre identité", "Au premier lancement, votre téléphone crée lui-même votre code unique, sans connexion. Seuls votre pseudo et ce code sont visibles par les personnes à qui vous les montrez (code QR). Vous pouvez changer votre pseudo à tout moment."),
            ("Vos messages", "Les messages sont enregistrés uniquement sur votre téléphone et sur celui de votre correspondant. Les messages privés sont chiffrés de bout en bout : seul le destinataire peut les lire."),
            ("Le relais (réseau maillé)", "Chaque téléphone qui a Margey relaie automatiquement les messages des autres pour faire vivre le réseau. Un message privé relayé reste chiffré : votre téléphone le transporte sans pouvoir le lire. Si vous désactivez le Bluetooth, vous devenez indisponible jusqu'à sa réactivation."),
            ("Les salons", "Les messages d'un salon sont publics : tous les téléphones à portée du salon peuvent les lire. Ils sont effacés après la durée choisie, de 3 jours au minimum à 90 jours au maximum. Un salon accueille 500 personnes au maximum."),
            ("Les groupes privés", "On entre dans un groupe uniquement en scannant son code QR d'invitation : ne le montrez qu'aux personnes invitées. Les messages du groupe sont chiffrés : seuls les membres peuvent les lire, les autres téléphones les relaient sans pouvoir les lire. Un groupe accueille 100 personnes au maximum. Ses messages ne s'effacent jamais d'eux-mêmes ; seul l'effacement d'urgence ou la sortie du groupe les supprime de votre téléphone."),
            ("Permissions", "Bluetooth et appareils à proximité : trouver les téléphones proches, envoyer et relayer les messages. Wi-Fi (sans Internet) : liaison directe entre téléphones compatibles. Localisation : exigée par Android sur certains téléphones pour la recherche Bluetooth ; Margey n'enregistre ni n'envoie jamais votre position. Caméra : scanner un code QR, uniquement quand vous le demandez. Micro : messages vocaux, uniquement pendant l'enregistrement. Notifications : vous avertir d'un nouveau message. Aucune autorisation Internet."),
            ("Partage en image", "L'image d'un message est créée sur votre téléphone, seulement pour l'application que vous choisissez. Margey ne la conserve pas et ne l'envoie nulle part ailleurs."),
            ("Effacer vos données", "Vous pouvez tout effacer d'un coup avec l'effacement d'urgence, dans les Réglages. Vous pouvez aussi choisir l'effacement automatique des discussions privées. Désinstaller l'application supprime tout ce qu'elle contient."),
            ("Mises à jour", "Margey n'ayant pas accès à Internet, elle ne cherche pas de nouvelle version elle-même : les nouvelles versions se téléchargent sur ayneha.org."),
            MODIFS,
            ("Logiciel libre", "AYNEHA Margey est un logiciel libre développé par MAIGUS avec l'aide d'outils d'intelligence artificielle (Claude, Anthropic), à partir du projet libre bitchat (GPL v3). Code sous licence GNU GPL v3 ou ultérieure, police AYNEHA sous SIL Open Font License 1.1, logos, images et textes sous CC BY-SA 4.0. Code source : https://github.com/maigus223/ayneha-margey"),
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
            ("Téléchargements des applications", "Les fichiers des applications sont déposés sur GitHub (dépôts du code source). Quand vous touchez « Télécharger l'application », le fichier vient de GitHub, qui compte le nombre total de téléchargements (comme tout hébergeur, GitHub peut aussi enregistrer des informations techniques de connexion). Ce total est affiché sur le site ; aucun traceur ni outil d'analyse n'est utilisé."),
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
            ("Proposer une carte", "Le bouton « Proposer par e-mail » ouvre votre messagerie avec un e-mail déjà rempli : modèle, texte, traduction et pseudo. Rien ne part sans que vous l'envoyiez vous-même. Le message est reçu par AYNEHA, qui ne s'en sert que pour relire la carte et la publier dans la galerie. Votre adresse e-mail n'est jamais publiée."),
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
        "id": "horloge", "nom": "Horloge et calendrier", "type": "Outil web", "page": "horloge.html", "maj": "29 octobre 2026",
        "intro": "L'horloge affiche l'heure et le calendrier en AYNEHA.",
        "sections": [
            ("Tout reste dans votre navigateur", "L'horloge lit l'heure, la date et le fuseau horaire de votre appareil. Rien n'est envoyé."),
            ("Position (facultative)", "Le jour lunaire change au coucher du soleil. Par défaut, il est calculé pour la grande ville de votre fuseau horaire. Si vous touchez le bouton position, votre navigateur vous demande votre position approximative : elle est arrondie, gardée uniquement dans votre navigateur et jamais envoyée."),
            MODIFS,
        ],
    },
]
