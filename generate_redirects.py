#! /usr/bin/env python3

"""
Reads a list of chapter in TSPL and uses them to spider over a draft of the
DocC version of the book, extracting its HTML anchors and matching them up with
the old Sphinx version's stable links where possible.
"""

import requests  # pip3 install requests
import bs4 # pip3 install bs4

def extract_ids(url):
    response = requests.get(url)
    html = bs4.BeautifulSoup(markup=response.text, features='html.parser')

    for link in html.find_all('a'):
        if link.get('class') != 'header-anchor':
            print(9, link)
            continue
        print(link.get('href'))

    """
    <a data-v-635e28c1="" href="/swift-book/documentation/the-swift-programming-language/basicoperators/#Terminology" class="header-anchor" aria-label="Scroll to section">
    """

BASE_URL = 'https://krilnon.github.io/swift-book/documentation/the-swift-programming-language/'

with open("chapters") as chapters_file:
    CHAPTERS = chapters_file.read().rstrip("\n").split("\n")

STABLE_IDS = {}  # keys are IDs; values are Sphinx names
with open("ids") as stable_ids_file:
    for line in stable_ids_file.readlines():
        stable_id, name = line.rstrip("\n").split("\t")
        STABLE_IDS[stable_id] = name

for chapter in CHAPTERS:
    part, chapter = chapter.split("/")
    if chapter.endswith("Part"):
        continue  # DocC doesn't use parts chapters
    if chapter == "zzSummaryOfTheGrammar":
        chapter = "summaryofthegrammar"  # No zz hack in DocC
    url = BASE_URL + chapter.lower() + "/"
    extract_ids(url)

    exit()  # XXX
