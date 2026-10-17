# English texts of the AYNEHA Android app pages (en/<id>.html).
# Same ids as applications.py, which holds links (APK, code) and stays the reference.
# Designer and creator: Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later

CONFIDENTIALITE = "No account, no server, no advertising, no analytics. Nothing you type is recorded or sent."

TEXTES = {
    "ayneha-school": {
        "outil": "Take the quizzes online",
        "resume": "Learn to read and write AYNEHA, on your own and at your own pace.",
        "intro": [
            "AYNEHA School guides learners from the very first letter to reading real Songhay words. Everything happens inside the app, offline: you can learn in a village as well as in town.",
        ],
        "points": [
            "The alphabet letter by letter: pronunciation, spelling and every form of each letter",
            "The 4 diacritics explained, with the table of the 50 combinations",
            "The syllabary: each consonant with the five vowels",
            "The digits, with a converter and a table from 0 to 9999",
            "Finger tracing of letters and digits, rated from 0 to 3 stars",
            "Six quiz games: recognise, find, which diacritic, read the syllable, digits, put in order",
            "A Latin to AYNEHA transcription workshop, with an explanation of each letter and sharing as an image",
            "Reading exercises on real words, region names, family names and the national anthem, all checked by the author",
            "A glossary of nearly 400 words sorted by theme, with search in Songhay or French",
            "The name of each number in Songhay, in Latin letters and in AYNEHA, up to 999,999",
        ],
        "etapes": [
            "Open the app and start with « The alphabet ».",
            "Tap a letter to see its card, then « Trace » to write it with your finger.",
            "Move on to the diacritics, the syllabary and the digits.",
            "Test yourself with the quizzes: your best score is kept.",
            "Read real words in « Reading », then write your own in the Workshop.",
        ],
        "compat": "Android 8 or newer. Works offline and asks for no permissions.",
        "reglages": "Automatic, light or dark theme; size of the AYNEHA text; nickname and timestamp for shared images.",
    },
    "ayneha-home": {
        "resume": "The whole AYNEHA website on your phone, even offline.",
        "intro": [
            "AYNEHA Home is the official app of the website: the alphabet, the rules, the online tools and the resources, always at hand. It keeps working in airplane mode and updates itself as soon as the connection is back.",
        ],
        "points": [
            "The alphabet, the transcriber, the keyboard, the calculator, the number converter and the clock",
            "Content already installed stays available offline",
            "Automatic and safe updates: if a file is missing, the previous version stays intact",
            "Pull down to refresh, a back button that follows your navigation",
            "Images created on the website (card, AYNEHA text) are saved to your pictures or shared directly",
        ],
        "etapes": [
            "Install the app, then open it: it starts on the home page.",
            "Browse as you would on the website.",
            "When you have a network, the app checks on its own whether there is new content.",
        ],
        "compat": "Android 7 or newer. Uses the internet only to update the content.",
    },
    "ayneha-keyboard": {
        "resume": "The keyboard to write AYNEHA on your phone and share your texts as images.",
        "intro": [
            "AYNEHA Keyboard installs like an Android keyboard. Because AYNEHA is in the Unicode Private Use Area, phones and apps such as WhatsApp or Facebook do not display it yet: AYNEHA text typed directly there would show as squares. So write your text in the keyboard's test area, then tap Share: it becomes an image that everyone can read, even without the AYNEHA font.",
        ],
        "points": [
            "Right-to-left layout: the first key of each row is on the right",
            "Four pages: letters, symbols, number pad in AYNEHA digits, emojis",
            "Long press on a letter for its forms: double, silent, nasal, open",
            "Share button: the text becomes an image, with an optional nickname and timestamp",
            "Built-in test area, adjustable vibration on touch",
        ],
        "etapes": [
            "Open AYNEHA Keyboard and tap « Enable the AYNEHA keyboard ».",
            "In Android's list of keyboards, enable AYNEHA Keyboard.",
            "Go back to the app and tap « Test the keyboard ».",
            "Write your text, then tap Share: it goes out as an image, by WhatsApp or elsewhere, and everyone can read it.",
        ],
        "compat": "Android 7 or newer.",
        "reglages": "Vibration on touch; timestamp on shared images; nickname shown on images (20 characters at most).",
    },
    "ayneha-calc": {
        "outil": "Try the calculator online",
        "resume": "A calculator entirely in AYNEHA digits.",
        "intro": [
            "AYNEHA Calc is for everyday calculations, at the market, in the shop or with friends, entirely in AYNEHA digits and from right to left.",
        ],
        "points": [
            "Addition, subtraction, multiplication, division and percentage",
            "Decimal results with the AYNEHA decimal comma",
            "The current calculation is shown above the result",
            "Delete one digit or the whole calculation",
        ],
        "etapes": [
            "Type the digits and the operation as on an ordinary calculator.",
            "Tap « = » for the result, « AC » to clear everything.",
        ],
        "compat": "Android 7 or newer. Works offline.",
    },
    "ayneha-horloge": {
        "outil": "See the clock online",
        "resume": "The time, the day, the month and the Songhay year in AYNEHA, with a calendar.",
        "intro": [
            "AYNEHA Horloge shows time entirely in AYNEHA, without a single Latin character: the time with seconds, the day, the month and the Songhay year (Gregorian year + 2001).",
        ],
        "points": [
            "Live time, seconds included",
            "A calendar you can browse month by month, with today highlighted",
            "Two home-screen widgets: clock and calendar",
        ],
        "reserve": "The two widgets are still being improved and do not always update from day to day. The app itself works normally. A Songhay lunar calendar version is planned.",
        "etapes": [
            "Open the app to see the time and the calendar.",
            "For a widget: long press on the home screen, « Widgets », then « AYNEHA Horloge ».",
        ],
        "compat": "Android 7 or newer.",
    },
    "ayneha-numconvert": {
        "outil": "Try the converter online",
        "resume": "A number in AYNEHA, N'Ko, Adlam, Dogon NÈNÈ, Arabic and Western digits.",
        "intro": [
            "AYNEHA NumConvert converts a number from one digit system to another, between six scripts: AYNEHA, N'Ko, Adlam (the script of Fula), Dogon NÈNÈ (script by Yahya Sékou Salah GUINDO), Arabic and Western. Handy for learning AYNEHA digits starting from the ones you already know.",
        ],
        "points": [
            "Conversion both ways, up to 17 digits, with thousands separators",
            "The number pad shows the digits of the starting system",
            "All six results are shown at the same time",
        ],
        "etapes": [
            "Choose the starting system.",
            "Type the number: the other versions appear at once.",
        ],
        "compat": "Android 7 or newer. Works offline.",
    },
    "ayneha-carnet": {
        "resume": "A notebook entirely in AYNEHA.",
        "intro": [
            "AYNEHA Carnet is a notebook whose whole interface is written in AYNEHA, without a single Latin character. Your notes stay on your phone: no account, no server.",
        ],
        "points": [
            "Create, save, pin, delete and share a note",
            "Search your notes, optional title",
            "Lists, writing direction, AYNEHA digits",
            "Offline, no account, no server",
        ],
        "etapes": [],
        "compat": "Android 8 or newer. Works offline.",
    },
}
