#! /usr/bin/env python3

"""
Reads a list of chapter in TSPL and uses them to spider over a draft of the
DocC version of the book, extracting its HTML anchors and matching them up with
the old Sphinx version's stable links where possible.
"""

import json
import os

with open("chapters") as chapters_file:
    CHAPTERS = chapters_file.read().rstrip("\n").split("\n")

mapped_sphinx_ids = {}  # keys are IDs; values are Sphinx names
mapped_docc_ids = {}  # keys are IDs; values are DocC names
with open("ids.tsv") as stable_ids_file:
    first_line = True
    for line in stable_ids_file.readlines():
        if first_line:
            first_line = False
            continue
        stable_id, sphinx, docc = line.rstrip("\n").split("\t")
        if sphinx == "": sphinx = None
        if docc == "": docc = None
        mapped_sphinx_ids[stable_id] = sphinx
        mapped_docc_ids[stable_id] = docc

DOCC_BUILT_PATH = "/Users/alexmartini/git/TSPL/swift-book/data/documentation/the-swift-programming-language/"

built_docc_ids = []  # tuples of (filenames, DocC names)
for filename in os.listdir(DOCC_BUILT_PATH):
    with open(DOCC_BUILT_PATH + filename) as json_file:
        json_data = json.load(json_file)
        content = json_data["primaryContentSections"][0]["content"]
        for item in content:
            if "anchor" in item.keys():
                built_docc_ids.append( (filename, item["anchor"]) )

# Yes, this is quadratic -- but in practice it doesn't actualy matter.
for stable_id in mapped_sphinx_ids.keys():
    sphinx_name = mapped_sphinx_ids[stable_id]
    if '/' in sphinx_name:
        # FIXME: chapter
        continue
    chapter, section = sphinx_name.split('-', 1)
    for filename, docc_id in built_docc_ids:
        filename, extension = filename.split('.')  # Bail on multiple dots
        if section.replace('-', '').lower() == docc_id.replace('-', '').lower() \
                and chapter.lower() == filename.lower():
            if mapped_docc_ids[stable_id] is not None:
                print("Replaced mapping:", mapped_docc_ids[stable_id])
            mapped_docc_ids[stable_id] = docc_id

for stable_id in mapped_sphinx_ids.keys():
    sphinx = mapped_sphinx_ids[stable_id] or ''
    docc = mapped_docc_ids[stable_id] or ''
    print(stable_id + '\t' + sphinx + '\t' + docc)
