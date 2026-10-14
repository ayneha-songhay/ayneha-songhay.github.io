# English privacy policies of each AYNEHA Android app and web tool.
# Same content as confidentialite.py (French), which remains the reference text.
# Designer and creator: Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Each entry produces  en/confidentialite-<id>.html

MAJ = "13 October 2026"

CHILDREN = ("Use by children",
            "Since no personal data is collected, the app can be used without particular risk by young people, for example at school.")
CHANGES = ("Changes",
           "This policy may be updated if the app changes. The version in force is always the one published on this page, with its update date.")
NO_TRACKING = ("No account, no tracking",
               "No account to create. No audience analytics, no advertising tracker, no advertising.")


def libre(nom, code=""):
    t = (f"{nom} is free software, developed by MAIGUS with the help of artificial intelligence tools "
         "(Claude, Anthropic). Code under the GNU GPL v3 or later, fonts under the SIL Open Font License 1.1, "
         "logos and images under CC BY-SA 4.0.")
    if code:
        t += f" Source code: {code}"
    return ("Free software", t)


ANDROID = [
    {
        "id": "ayneha-school", "nom": "AYNEHA School", "type": "Android app",
        "intro": "AYNEHA School is an app to learn to read and write AYNEHA. This page explains what it does, and above all what it does not do, with your information.",
        "sections": [
            ("No data collected", "Everything works on your device, offline. Your quiz answers, tracings and Workshop texts are not sent anywhere."),
            ("What stays on your device", "Your best scores, your settings (theme, text size) and, if you enter one, your nickname for shared images. Uninstalling the app erases them."),
            ("Sharing as an image", "When you share a text, the app creates a temporary image, passed only to the app you choose (WhatsApp, for example). It is neither kept nor sent anywhere else."),
            ("Permissions", "No permissions: no contacts, no location, no camera, no internet."),
            NO_TRACKING, CHILDREN, CHANGES,
        ],
    },
    {
        "id": "ayneha-home", "nom": "AYNEHA Home", "type": "Android app",
        "intro": "AYNEHA Home keeps the AYNEHA website on your phone, even offline.",
        "sections": [
            ("No data collected", "The app displays the content of the AYNEHA website. It does not collect, store or send any personal data."),
            ("Internet connection", "When a connection is available, the app checks the AYNEHA website (hosted by GitHub Pages) for a new version of the content, then downloads it. As with any website visit, the host may record technical connection information, such as the IP address."),
            ("Permissions", "Internet and network state, only to update the content."),
            NO_TRACKING, CHILDREN, CHANGES,
        ],
    },
    {
        "id": "ayneha-keyboard", "nom": "AYNEHA Keyboard", "type": "Android app",
        "intro": "AYNEHA Keyboard is a keyboard to write AYNEHA in all your apps. Android shows a general warning for any installed keyboard: here is what this one actually does.",
        "sections": [
            ("No keystrokes recorded", "No keystroke and no text typed or composed is recorded, sent or shared. The keyboard works entirely on your device, with no account and no server."),
            ("Sharing as an image", "The Share button creates a temporary image of your text, passed only to the app you choose. It is neither kept nor sent anywhere else."),
            ("What stays on your device", "Your settings: vibration, and the timestamp and nickname shown on shared images."),
            ("Permissions", "Vibration, for touch feedback. No permission to access the internet, contacts, location or files."),
            NO_TRACKING, CHANGES,
        ],
    },
    {
        "id": "ayneha-calc", "nom": "AYNEHA Calc", "type": "Android app",
        "intro": "AYNEHA Calc is a calculator in AYNEHA digits.",
        "sections": [
            ("No data collected", "Calculations are done on your device. They are neither recorded nor sent."),
            ("Permissions", "No permissions. The app works offline."),
            NO_TRACKING, CHILDREN, CHANGES,
        ],
    },
    {
        "id": "ayneha-horloge", "nom": "AYNEHA Horloge", "type": "Android app",
        "intro": "AYNEHA Horloge shows the time and the calendar in AYNEHA, with two home-screen widgets.",
        "sections": [
            ("No data collected", "The app only reads your phone's time and date. Nothing is recorded or sent."),
            ("Permissions", "Exact alarms, to update the clock widget every minute; phone start-up, so that the widgets resume after a restart. No access to the internet, contacts or location."),
            NO_TRACKING, CHILDREN, CHANGES,
        ],
    },
    {
        "id": "ayneha-numconvert", "nom": "AYNEHA NumConvert", "type": "Android app",
        "intro": "AYNEHA NumConvert converts digits between five systems: AYNEHA, Dogon NÈNÈ, Western, Arabic (Eastern Arabic-Indic digits) and N'Ko.",
        "sections": [
            ("No data collected", "The numbers you enter are neither recorded, sent nor shared. They disappear as soon as you leave or reset the app."),
            ("Permissions", "No special permissions. Some fonts (Arabic and N'Ko) may be downloaded once by Google Play services, independently of the app, and then stay cached on your device."),
            NO_TRACKING, CHILDREN, CHANGES,
            libre("AYNEHA NumConvert", "https://github.com/maigus223/ayneha-numconvert"),
        ],
    },
    {
        "id": "ayneha-carnet", "nom": "AYNEHA Carnet", "type": "Android app (in preparation)",
        "intro": "AYNEHA Carnet is a notebook in AYNEHA, in preparation. This policy describes how it is planned to work; it will be confirmed on release.",
        "sections": [
            ("Your notes stay with you", "Notes are stored only on your device. No account, no server: they are never sent anywhere else. Uninstalling the app erases them."),
            ("Sharing", "A note is only shared if you decide so, with the app you choose."),
            NO_TRACKING, CHANGES,
        ],
    },
]

WEB = [
    {
        "id": "site", "nom": "The AYNEHA website", "type": "Website",
        "intro": "This website presents the AYNEHA writing system and its tools.",
        "sections": [
            ("No data collected", "No cookies, no trackers, no audience measurement, no advertising."),
            ("No third-party services", "Fonts and scripts are hosted on the website itself: when displaying the pages, your browser does not contact any other service."),
            ("Hosting", "The website is hosted by GitHub Pages, which may record technical connection information (such as the IP address) to provide the service and keep it secure."),
            ("External links", "Links to other websites (Naabiga, Omniglot, social networks, Google Drive) lead to services that have their own rules."),
            CHANGES,
        ],
    },
    {
        "id": "transcripteur", "nom": "Transcriber", "type": "Web tool", "page": "convertisseur.html",
        "intro": "The transcriber writes in AYNEHA a Songhay text typed in Latin letters.",
        "sections": [
            ("Everything stays in your browser", "The transcription is done in your browser. Your text is not sent anywhere."),
            ("Memory of your last text", "So that you find it on your next visit, your last text is kept in your browser's storage, on your device only. “Clear all” deletes it."),
            ("Copy and image", "Copying goes through your device's clipboard; the image is created by your browser and saved in your downloads."),
            CHANGES,
        ],
    },
    {
        "id": "clavier", "nom": "Keyboard", "type": "Web tool", "page": "clavier.html",
        "intro": "The online keyboard lets you write AYNEHA in the browser.",
        "sections": [
            ("Everything stays in your browser", "What you type is neither recorded nor sent. Leaving the page erases the text."),
            ("Copy and image", "Copying goes through your device's clipboard; the image is created by your browser and saved in your downloads."),
            CHANGES,
        ],
    },
    {
        "id": "calculatrice", "nom": "Calculator", "type": "Web tool", "page": "calculatrice.html",
        "intro": "The online calculator calculates in AYNEHA digits.",
        "sections": [
            ("Everything stays in your browser", "Calculations are done in your browser. They are neither recorded nor sent."),
            CHANGES,
        ],
    },
    {
        "id": "nombres", "nom": "Number converter", "type": "Web tool", "page": "nombres.html",
        "intro": "The converter shows a number in AYNEHA, N'Ko, Dogon NÈNÈ, Arabic and Western digits.",
        "sections": [
            ("Everything stays in your browser", "The numbers you enter are neither recorded nor sent."),
            CHANGES,
        ],
    },
    {
        "id": "carte", "nom": "My AYNEHA card", "type": "Web tool", "page": "carte.html",
        "intro": "“My AYNEHA card” creates a card to share with a message written in AYNEHA, and lets you submit it to the website's gallery.",
        "sections": [
            ("Everything stays in your browser", "The card is drawn by your browser. Your message, translation and nickname are not sent anywhere unless you decide to share or submit the card."),
            ("Memory of your nickname", "To save you typing it again, your nickname is kept in your browser's storage, on your device only. Clear the field to delete it."),
            ("Sharing", "The Share button passes the image only to the app you choose (WhatsApp, for example). “Save the image” puts it in your downloads."),
            ("Submitting a card", "The “Submit” buttons open your WhatsApp app or your email app with a message already filled in: template, text, translation and nickname. Nothing is sent unless you send it yourself. The message is received by AYNEHA, which uses it only to review the card and publish it in the gallery. Your phone number or email address are never published."),
            ("What is published", "An approved card is published in the gallery with its message, its translation and the nickname exactly as it was typed. To have a card removed from the gallery, simply ask at contact@ayneha.org."),
            CHANGES,
        ],
    },
    {
        "id": "quiz", "nom": "Quiz", "type": "Web tool", "page": "quiz.html",
        "intro": "The quizzes let you practise reading AYNEHA, right in the browser.",
        "sections": [
            ("Everything stays in your browser", "Your answers are neither recorded nor sent."),
            ("Best scores", "Your best score in each game is kept in your browser's storage, on your device only. Clearing the website's data in your browser deletes it."),
            CHANGES,
        ],
    },
    {
        "id": "horloge", "nom": "Clock and calendar", "type": "Web tool", "page": "horloge.html",
        "intro": "The clock shows the time and the calendar in AYNEHA.",
        "sections": [
            ("Everything stays in your browser", "The clock only reads your device's time and date. Nothing is recorded or sent."),
            CHANGES,
        ],
    },
]
