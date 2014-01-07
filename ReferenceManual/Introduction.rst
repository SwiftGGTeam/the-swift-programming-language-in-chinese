Introduction
============

This part of the book describes the grammar of the Swift programming language.

Notational Conventions
----------------------

In the syntax notation used in the formal grammar found in this manual,
syntactic categories are indicated by *italic* text,
and literal words and characters by ``constant width`` text.
Alternatives are separated by pipes (|) or listed on a new line.
In a few cases, a long set of alternatives is presented on one or more new lines,
preceded by the phrase "one of the following."
When a literal or a syntactic category is optional,
it is marked by a trailing, subscript *opt*.
Finally,
an arrow (⟶) is used to mark grammar productions and may be read as "can consist of".

As an example, the grammar of a *getter-setter-block* is defined as follows:

.. syntax-grammar::

    Grammar of a getter setter block

    getter-setter-block --> ``{`` getter setter-OPT ``}`` | ``{`` setter getter ``}``

This definition indicates that a *getter-setter-block* can consist of a *getter*
followed by an optional *setter*, enclosed in braces,
*or* a *setter* followed by a *getter*, enclosed in braces.

.. TODO: Describe the notation and conventions found throughout the reference manual.


Phases of Translation
---------------------

Swift has a strict separation between its phases of translation,
and the compiler follows a conceptually simple design.

.. TODO: Come up with a way to write this in a user-friendly way.
