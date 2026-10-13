# AYNEHA - l'écriture de la langue songhay

Site officiel d'**AYNEHA**, une écriture originale pour la langue songhay (Mali, Niger, Bénin, Burkina Faso), qui se lit et s'écrit de droite à gauche.

*Official website of AYNEHA, an original right-to-left writing system for the Songhay language.*

**Site en ligne / Live site : https://ayneha-songhay.github.io/**

## L'écriture
- Alphabet monocaméral (ni majuscules ni minuscules), écrit de **droite à gauche**
- 5 voyelles, 22 consonnes, 4 accents, 10 chiffres ; 98 caractères dans la police
- Police **Ayneha Pro** : zone d'usage privé Unicode **U+10FF7C-U+10FFDD** (plan 16) ; elle contient aussi l'ancienne plage U+E000-U+E061 pour les anciens textes

## Contenu du site
Accueil, L'alphabet, Applications, Outils en ligne (transcripteur, clavier, horloge), Ressources, À propos, Espace presse, Confidentialité.

## Structure
Site statique (HTML, CSS, JavaScript), hébergé sur GitHub Pages. Aucun serveur, aucun cookie, aucun traceur, aucune police ni script chargé depuis un autre site.

- `_src/pages/` : le contenu de chaque page
- `_src/glyphs.py` : la matrice des 98 caractères AYNEHA
- `_src/applications.py` : les fiches des applications (liens Naabiga et APK)
- `_src/build.py` : assemble les pages et régénère `manifest.json` et `version.txt`

Après une modification dans `_src/`, lancer `python3 _src/build.py` depuis la racine du dépôt.

`manifest.json` et `version.txt` servent à l'application Android **AYNEHA** (site hors connexion) pour se mettre à jour : ils sont régénérés à chaque construction et doivent toujours être publiés avec le site.

## Licences / Licenses
- **Code** : GNU GPL v3.0 ou ultérieure (voir [LICENSE](LICENSE)). / Code: GNU GPL v3.0 or later.
- **Police Ayneha Pro** : SIL Open Font License 1.1 (`assets/telechargements/OFL.txt`). / Font: SIL OFL 1.1.
- **Logos, images et textes** : CC BY-SA 4.0.
- **Nom « AYNEHA » et logo** : réservés aux applications officielles ; une version modifiée doit porter un autre nom. / The AYNEHA name and logo are reserved for the official apps.
- La police Jost (`assets/fonts/jost-*.woff2`) : Copyright 2020 The Jost Project Authors, SIL Open Font License 1.1 (`assets/fonts/OFL-Jost.txt`).
- Chiffres N'Ko (`assets/fonts/noto-nko-chiffres.woff2`) : extraits de Noto Sans NKo, Google, SIL Open Font License 1.1 (`assets/fonts/OFL-NotoSansNKo.txt`).
- Chiffres Dogon NÈNÈ (`assets/fonts/nene-chiffres.woff2`) : extraits de la police DogonNene v2.0, Copyright (c) 2026 Sékou Salah GUINDO ; écriture Dogon NÈNÈ créée par Yahya Sékou Salah GUINDO.

**Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)**
Contact : contact@ayneha.org
Omniglot : https://www.omniglot.com/conscripts/ayneha.htm
