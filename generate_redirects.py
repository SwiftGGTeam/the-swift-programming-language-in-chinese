#! /usr/bin/env python3

import requests

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
    print('curl --head "' + url + '"')
