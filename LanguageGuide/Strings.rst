.. docnote:: Subjects to be covered in this section

    * String literals
    * Substrings and iteration
    * String encoding and Unicode support
    * String interpolation
    * printf() and string formatting
    * Regular Expressions (when implemented)
    * ‘Raw’ string literals (if / when implemented)
    * ``OutputStream`` ?
    * How to do a few NSString-like things?

Strings and Characters
======================

Introduction
------------

- blurb from Guided Tour
- efficiencies (e.g. in copying)
- why String rather than / in addition to NSString
- forward reference to NSString bridging and interchangeability (in both directions)

String Literals
---------------

- Unicode
- immutability (of literals)

Character Literals
------------------

- Control characters
- Hex syntax
- UTF-32

String Creation and Conversion
------------------------------

- default types supported for string creation (and therefore interpolation)
- extending types to support creation (and therefore interpolation) – forward reference to extensions
- conversion to other types - toInt()

String Variables
----------------

- mutability (of string variables)
- struct not class, so byval not byref

String and Char Concatenation
-----------------------------

- concatenation via + and +=
- char / string + string / char
- string initializer syntax
- string interpolation (describe how it is expanded)
- expressions inside interpolation

String Printing
---------------

- print
- println
- printf

String Subscripting
-------------------

- length (vs byteLength)
- accessing characters by subscript (and what this means)
- chars vs bytes and a discussion of encoding
- substrings via ranges e.g. [2..5]
- string access via indices?
- substr()

String Enumeration
------------------

- chars
- lines
- bytes

String and Char Comparison
--------------------------

- what comparison means in a Unicode world (e.g. Unicode canonical equivalence)
- ==
- < and > and any others
- distinct codepoint combinations can be checked for equivalence
- codepoints can be accessed directly (cf bytes)
- grapheme clusters
- extended grapheme clusters
- locale-agnostic
- discovery of encoding?
- no conversion of encodings

String Functions
----------------

- startsWith
- endsWith?
- isAlpha / isDigit / isSpace
- stripXxx?
- uppercase / lowercase
- trim?
- find?
- replace?
- splitXxxx
- join
- isEmpty
- hashValue
- etc.

.. QUESTION: how far should this go? if String becomes as fully-featured as NSString, this could be a long chapter.

.. refnote:: References

    * https://[Internal Staging Server]/docs/LangRef.html#character_literal
    * https://[Internal Staging Server]/docs/LangRef.html#string_literal
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#char
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#string
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#character-literals
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#string-literals
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#string-literal-interpolation
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#strings
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#string-interpolation
    * https://[Internal Staging Server]/docs/stringdesign.html
    * https://[Internal Staging Server]/docs/textformatting.html
