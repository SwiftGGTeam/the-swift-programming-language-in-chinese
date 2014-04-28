About the Language Reference
============================

This part of the book describes the formal grammar of the Swift programming language.
The grammar described here is intended to help you understand the language in more
detail, rather than to allow you to directly implement a parser or compiler.

The Swift language is relatively small, becuase many common types, functions, and operators
that appear virtually everywhere in Swift code
are actually defined in the Swift Standard Library. Although these types, functions,
and operators are not part of the Swift language itself,
the discussions and code examples used in this part of the book use them extensively.


.. _Introduction_HowToReadTheGrammar:

How to Read the Grammar
-----------------------

The notation used to describe the formal grammar of the Swift programming language
follows a few conventions.

* An arrow (⟶) is used to mark grammar productions and can be read as "can consist of".
* Syntactic categories are indicated by *italic* text and appear on both sides
  of a grammar production rule.
* Literal words and punctuation are indicated by boldface ``constant width`` text
  and appear only on the right-hand side of a grammar production rule.
* Alternative grammar productions are separated by vertical
  bars (|). When alternative productions are too long to read easily,
  they are broken into multiple grammar production rules on new lines.
* In a few cases, regular font text is used to describe the right-hand side
  of a grammar production rule.
* Optional syntactic categories and literals are marked by a trailing
  subscript *opt*.

As an example, the grammar of a getter-setter block is defined as follows:

.. syntax-grammar:: omit

    Grammar of a getter-setter block

    getter-setter-block --> ``{`` getter setter-OPT ``}`` | ``{`` setter getter ``}``

This definition indicates that a getter-setter block can consist of a getter
followed by an optional setter, enclosed in braces,
*or* a setter followed by a getter, enclosed in braces.
The grammar production above is equivalent to the following two productions,
where the alternatives are spelled out explicitly:

.. syntax-grammar:: omit

    Grammar of a getter setter block

    getter-setter-block --> ``{`` getter setter-OPT ``}``
    getter-setter-block --> ``{`` setter getter ``}``
