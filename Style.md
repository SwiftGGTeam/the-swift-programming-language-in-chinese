# Editorial Style Guide

## memberwise initializer
Not hyphenated as “member-wise”.

## non-optional
Hyphenated to avoid the misreading as nono-ptional.
Normal rules for hyphenation from Apple Style Guide would omit the hyphen.

See also commit 6ed6a956139772851e466e8419f48c5293f9574a and <rdar://problem/44881846>.

# Semantic Line Breaks

The RST files in this repository use semantic line breaks,
where lines end at sentence and clause boundaries.
This keeps lines short enough to ensure that
diffs remain readable when shown in places like
pull requests,
commit notification emails,
and the terminal.
Because the lines break in meaningful places,
changes don’t require re-wrapping entire paragraphs,
so only the lines that changed get marked.
This lets tools like `git-blame` give per-line history.

As you’re writing,
aim to keep lines 80 characters or less.
Start a new line after each sentence,
and as needed at clause boundaries.
For a long list,
you can put each list item on its own line —
this is mostly helpful for lists you want to alphabetize
because it lets you sort those lines.
There are several different styles throughout the book,
so don’t feel the need to exactly follow any one approach.

When you’re editing existing text,
preserve the line breaks when feasible
to help keep the diffs small and preserve per-line history.
Don’t rewrap an existing line just because it’s a bit long
unless you actually need to make other changes to it.
There are parts of the book
that run the line length out to 90 or 100 characters,
and rewrapping them just for the sake of line length
would make history harder to follow.

More information about semantic line breaks
is available in the following places:

* “UNIX for Beginners”, Brian W. Kernighan, 1974 — Alex Martini has a PDF copy
* [Semantic Linefeeds](https://rhodesmill.org/brandon/2012/one-sentence-per-line/)
    blog post about the advantages and history of this format
    for authoring documentation.
* [Ventilated Prose](https://vanemden.wordpress.com/2009/01/01/ventilated-prose/)
    discusses Buckminster Fuller’s proposed use of this format
    to improve reading comprehension.
* [Semantic Line Breaks](https://sembr.org) describes a formalized spec,
    maintained by Mattt Zmuda
