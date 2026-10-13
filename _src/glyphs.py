# Données de l'écriture AYNEHA pour le site (police Ayneha Pro, plan 16).
# Concepteur et créateur : Mahamadou Issiaka MAIGA (MAIGUS)
# SPDX-License-Identifier: GPL-3.0-or-later
#
# Même ordre que la matrice officielle (98 glyphes) :
#   chiffres 0-9, 22 consonnes, 5 voyelles, 50 combinaisons, accents isolés, ponctuation.
# Ancienne plage U+E000-U+E061 -> nouvelle plage U+10FF7C-U+10FFDD (décalage +0x101F7C).

BASE = 0x10FF7C
OFFSET = 0x101F7C

ORDER = (
    [f"D{i}" for i in range(10)]
    + ["B", "P", "M", "F", "W", "D", "T", "N", "L", "R", "S", "Z", "SH", "TS",
       "J", "DJ", "GN", "Y", "G", "K", "H", "NG"]
    + ["A", "E", "I", "O", "U"]
    + ["A:d", "A:n", "E:d", "E:n", "E:o", "I:d", "I:n", "O:d", "O:n", "O:o", "U:d", "U:n",
       "B:d", "B:m", "P:d", "P:m", "M:d", "M:m", "F:d", "F:m", "W:d", "W:m", "D:d", "D:m",
       "T:d", "T:m", "N:d", "N:m", "L:d", "L:m", "R:d", "R:m", "S:d", "S:m", "Z:d", "Z:m",
       "SH:d", "TS:d", "J:d", "DJ:d", "DJ:m", "GN:d", "Y:d", "Y:m", "G:d", "G:m", "K:d", "K:m",
       "NG:d", "NG:m"]
    + ["acc:nA", "acc:nE", "acc:nI", "acc:nO", "acc:nU", "acc:oE", "acc:oO", "acc:d", "acc:m"]
    + [",", ";"]
)
assert len(ORDER) == 98, len(ORDER)
CP = {name: BASE + i for i, name in enumerate(ORDER)}

VOWELS = ["A", "E", "I", "O", "U"]
CONSONANTS = ["B", "P", "M", "F", "W", "D", "T", "N", "L", "R", "S", "Z", "SH", "TS",
              "J", "DJ", "GN", "Y", "G", "K", "H", "NG"]
# Ordre alphabétique AYNEHA : les voyelles d'abord, puis les consonnes.
LETTERS = VOWELS + CONSONANTS

# Nom affiché, valeur sonore, épellation, lecture latine (pour les lectures mécaniques).
INFO = {
    "A": ("A", "a comme dans « papa »", "a", "a"),
    "E": ("E", "é comme dans « été »", "e", "e"),
    "I": ("I", "i comme dans « lit »", "i", "i"),
    "O": ("O", "o comme dans « mot »", "o", "o"),
    "U": ("U", "ou comme dans « loup »", "u", "u"),
    "B": ("B", "b comme dans « bol »", "ba", "b"),
    "P": ("P", "p comme dans « pain »", "pa", "p"),
    "M": ("M", "m comme dans « mur »", "ma", "m"),
    "F": ("F", "f comme dans « fer »", "fa", "f"),
    "W": ("W", "w comme dans « oui »", "wa", "w"),
    "D": ("D", "d comme dans « dé »", "da", "d"),
    "T": ("T", "t comme dans « tas »", "ta", "t"),
    "N": ("N", "n comme dans « nid »", "na", "n"),
    "L": ("L", "l comme dans « lac »", "la", "l"),
    "R": ("R", "r roulé", "ra", "r"),
    "S": ("S", "s toujours sourd, comme dans « sel »", "sa", "s"),
    "Z": ("Z", "z comme dans « zèbre »", "za", "z"),
    "SH": ("Ʃ", "ch comme dans « chat »", "sha", "sh"),
    "TS": ("TƩ", "tch comme dans « tchèque »", "tcha", "tch"),
    "J": ("J", "j comme dans « jour »", "ja", "j"),
    "DJ": ("DJ", "dj comme dans « djembé »", "dja", "dj"),
    "GN": ("Ɲ", "gn comme dans « agneau »", "ɲa", "ɲ"),
    "Y": ("Y", "y comme dans « yeux »", "ya", "y"),
    "G": ("G", "g toujours dur, comme dans « gare »", "ga", "g"),
    "K": ("K", "k comme dans « kilo »", "ka", "k"),
    "H": ("H", "h toujours prononcé (aspiré)", "ha", "h"),
    "NG": ("Ŋ", "ng comme dans l'anglais « sing »", "ŋa", "ŋ"),
}

NASAL_LATIN = {"A": "ã", "E": "ẽ", "I": "ĩ", "O": "õ", "U": "ũ"}
OPEN_LATIN = {"E": "ɛ", "O": "ɔ"}


def variants(letter):
    """Variantes d'une lettre dans l'ordre officiel : initiale, nasalisée, ouverte, double, muette."""
    out = [(letter, "initiale")]
    for suf, label in ((":n", "nasalisée"), (":o", "ouverte"), (":d", "double"), (":m", "muette")):
        if letter + suf in CP:
            out.append((letter + suf, label))
    return out


def latin(name):
    """Lecture latine d'un glyphe (un son = un caractère)."""
    if name.startswith("D") and name[1:].isdigit():
        return name[1:]
    if name in (",", ";"):
        return name
    base, _, mod = name.partition(":")
    if base == "acc":
        return ""
    lat = INFO[base][3]
    if mod == "n":
        return NASAL_LATIN[base]
    if mod == "o":
        return OPEN_LATIN[base]
    if mod == "d":
        return lat + lat if base not in ("SH", "TS", "DJ") else lat * 2
    return lat


def text(names):
    """Chaîne Unicode (ordre logique) à partir d'une liste de noms de glyphes séparés par des espaces.
    Le mot « / » marque une espace entre deux mots."""
    out = []
    for n in names.split():
        if n == "/":
            out.append(" ")
        else:
            out.append(chr(CP[n]))
    return "".join(out)


def reading(names):
    out = []
    for n in names.split():
        out.append(" " if n == "/" else latin(n))
    return "".join(out)


def cp_hex(name):
    return f"U+{CP[name]:X}"
