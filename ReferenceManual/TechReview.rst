Technical Review Queries
========================

.. write-me::

Lexical Structure
=================

The :newTerm:`lexical structure` of Swift describes what sequence of characters
form valid tokens of the language.
These valid tokens form the lowest-level building blocks of the language
and are used to describe the rest of the language in subsequent chapters.

In most cases, tokens are generated from the characters of a Swift source file
by considering the longest possible substring from the input text,
within the constraints of the grammar that are specified below.
This behavior is referred to as :newTerm:`longest match`
or :newTerm:`maximal munch`.

.. docnote::
    Is this a  correct description of the parser's max munch?
    I say "in most cases",
	because of how ``>>`` is split in certain constructs,
	as described below in the discussion of operators.
    If there's something else we can say that's more specific,
    I would rather do that.

Whitespace and Comments
-----------------------

Comments are treated as whitespace by the compiler.
Single line comments begin with `//`
and continue until the end of the line.
Multiline comments begin with ``/*`` and end with ``*/``.
Nesting is allowed, but the comment markers must be balanced.

.. docnote::
   LangRef says comments are ignored *and* treated as whitespace.
   Is there a difference?



Expresions
==========
