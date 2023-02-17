#! /usr/bin/env python3

"""
Reads a list of chapter in TSPL and uses them to spider over a draft of the
DocC version of the book, extracting its HTML anchors and matching them up with
the old Sphinx version's stable links where possible.
"""

import json

with open("chapters") as chapters_file:
    CHAPTERS = chapters_file.read().rstrip("\n").split("\n")

"""
STABLE_IDS = {}  # keys are IDs; values are Sphinx names
with open("ids.tsv") as stable_ids_file:
    for line in stable_ids_file.readlines():
        stable_id, name = line.rstrip("\n").split("\t")
        STABLE_IDS[stable_id] = name
"""

DOCC_OUTPUT_PATH = "/Users/alexmartini/git/TSPL/swift-book/data/documentation/the-swift-programming-language/"
# for file in DocC output:
filename = "advancedoperators.json"
with open(DOCC_OUTPUT_PATH + filename) as json_file:
    json_data = json.load(json_file)
    content = json_data["primaryContentSections"][0]["content"]
    for item in content:
        if "anchor" in item.keys():
            print(item["anchor"])
