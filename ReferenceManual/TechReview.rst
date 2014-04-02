Technical Review Queries
========================

.. Nothing goes here.

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

Integer Literals
----------------

:newTerm:`Integer literals` represent integer values of unspecified precision.
By default, integer literals are expressed in decimal;
you can specify an alternate base using a prefix.
Binary literals begin with ``0b``,
octal literals begin with ``0o``,
and hexadecimal literals begin with ``0x``.

Decimal literals contain the digits ``0`` through ``9``.
Binary literals contain ``0`` and ``1``,
octal literals contain ``0`` through ``7``,
and hexadecimal literals contain ``0`` through ``9``
as well as ``A`` through ``F`` in upper- or lowercase.

Negative integers literals are expressed by prepending a minus sign (``-``)
to an integer literal, as in ``-42``.

Underscores (``_``) are allowed between digits for readability,
but are ignored and therefore don't affect the value of the literal.
Integer literals can begin with leading zeros (``0``),
but are likewise ignored and don't affect the base or value of the literal.

Unless otherwise specified,
the default type of an integer literal is the Swift Standard Library type ``Int``.
The Swift Standard Library also defines types for various sizes of
signed and unsigned integers,
as described in :ref:`BasicTypes_Integers`.

.. docnote::
   The prose above assumes underscores only belong between digits.
   Is there a reason to allow them at the end of a literal?
   Java and Ruby both require underscores to be between digits.
   Also, are adjacent underscores meant to be allowed, as in ``5__000``?
   (The REPL supports them as of swift-1.21 but it seems odd.)

[Partial grammar below.]

.. syntax-grammar::

    Grammar of an integer literal

    integer-literal --> negative-sign-OPT binary-literal
	integer-literal --> negative-sign-OPT octal-literal
	integer-literal --> negative-sign-OPT decimal-literal
	integer-literal --> negative-sign-OPT hexadecimal-literal

    binary-literal --> ``0b`` binary-digit binary-literal-characters-OPT
    binary-digit --> Digit 0 or 1
    binary-literal-character --> binary-digit | ``_``
    binary-literal-characters --> binary-literal-character binary-literal-characters-OPT

    decimal-literal --> decimal-digit decimal-literal-characters-OPT
    decimal-digit --> Digit 0 through 9
    decimal-digits --> decimal-digit decimal-digits-OPT
    decimal-literal-character --> decimal-digit | ``_``
    decimal-literal-characters --> decimal-literal-character decimal-literal-characters-OPT

	negative-sign --> ``-``


Floating-Point Literals
-----------------------

.. syntax-grammar::

    Grammar of a floating-point literal

    floating-point-literal --> decimal-literal decimal-fraction-OPT decimal-exponent-OPT
    floating-point-literal --> hexadecimal-literal hexadecimal-fraction-OPT hexadecimal-exponent

    decimal-fraction --> ``.`` decimal-literal
    decimal-exponent --> floating-point-e sign-OPT decimal-literal

    hexadecimal-fraction --> ``.`` hexadecimal-literal-OPT
    hexadecimal-exponent --> floating-point-p sign-OPT hexadecimal-literal

    floating-point-e --> ``e`` | ``E``
    floating-point-p --> ``p`` | ``P``
    sign --> ``+`` | ``-``


.. docnote::
   Why not allow all combinations --
   optional fraction and optional exponent in any base?


Textual Literals
-----------------

Character literals are of type of ``UnicodeScalar``.
String literals are of type ``String``.

.. docnote::
   Is UnicodeScalar the final name for that type?

.. docnote::
   Is there any context where string/double-quoted literals
   become implicitly null-terminated?
   That is, is their type always String or could it be char* or NSString?

Array Literals
--------------

:newTerm:`Array literals` represent an ordered collection,
made up of items of the same type.
It has the following form:

.. syntax-outline::

   [<#value1#>, <#value2#>, <#...#>]

The last expression in the array can be followed by an optional comma.
The value of an array literal has type ``T[]``,
where ``T`` is the type of the expressions inside it.

.. docnote::
   Is T[] always going to be a synonym for Array < T > ?
   Currently, the REPL uses the former for array literals,
   but the latter matches what is used for dictionary literals.
   Is there a reason to prefer one over the other in the docs?
   Using Array < T > gives better parallelism.

.. Spaces around <T> above to prevent it being read as an HTML tag by Sphinx.

Operators
---------

Operators are made up of one or more of the following characters:
``/``, ``=``, ``-``, ``+``, ``!``, ``*``, ``%``, ``<``, ``>``,
``&``, ``|``, ``^``, ``~``, and ``.``.
That said, the tokens
``=``, ``->``, ``//``, ``/*``, ``*/``, ``.``,
and the unary prefix operator ``&`` are reserved.
These tokens can't be overloaded, nor can they be used to define custom operators.

.. docnote::
   LangRef also says (){}[].,;: are reserved punctuation,
   but those aren't valid operator characters anyway.
   OK to omit them from this list of reserved tokens?

The whitespace around an operator is used to determine
whether an operator is used as a prefix operator, a postfix operator,
or a binary operator. This behavior is summarized in the following rules:

* If an operator has whitespace around both sides or around neither side,
  it is treated as a binary operator.
  As an example, the ``+`` operator in ``a+b`` and ``a + b`` is treated as a binary operator.
* If an operator has whitespace on the left side only,
  it is treated as a prefix unary operator.
  As an example, the ``++`` operator in ``a ++b`` is treated as a prefix unary operator.
* If an operator has whitespace on the right side only,
  it is treated as a postfix unary operator.
  As an example, the ``++`` operator in ``a++ b`` is treated as a postfix unary operator.
* If an operator has no whitespace on the left but is followed immediately by a dot (``.``),
  it is treated as a postfix unary operator.
  As an example, the  ``++`` operator in ``a++.b`` is treated as a postfix unary operator
  (``a++ . b`` rather than ``a ++ .b``).

For the purposes of these rules,
the characters ``(``, ``[``, and ``{`` before an operator,
the characters ``)``, ``]``, and ``}`` after an operator,
and the characters ``,``, ``;``, and ``:``
are also considered whitespace.

There is one caveat to the rules above.
If the ``!`` or ``?`` operator has no whitespace on the left,
it is treated as a postfix operator,
regardless of whether it has whitespace on the right.
To use the ``?`` operator as syntactic sugar for the ``Optional`` type,
it must not have whitespace on the left.
To use it in the conditional (``? :``) operator,
it must have whitespace around both sides.

.. docnote::
   Is the above discussion of prefix/infix/postfix correct?
   LangRef uses a a notion of left/right binding in between
   explaining the surrounding whitespace
   and explaining how the operator is understood.
   Because left/right binding is not used anywhere else in the grammar,
   we have directly explained how whitespace impacts behavior.
   (It also appears that left and right bound are defined backward in LangRef.)

In certain constructs, operators with a leading ``<`` or ``>``
may be split into two or more tokens. The remainder is treated the same way
and may be split again. As a result, there is no need to use whitespace
to disambiguate between the closing ``>`` characters in constructs like
``Dictionary<String, Array<Int>>``.
In this example, the closing ``>`` characters are not treated as a single token
that may then be misinterpreted as a bit shift ``>>`` operator.

.. docnote::
   Is there a special context you must be in for this <<>> rule to happen?
   With this rule in effect, how is >> ever parsed as a bit shift
   and not two greater-than operators?

.. syntax-grammar::

    Grammar of operators

    operator --> operator-character operator-OPT
    operator-character --> ``/`` | ``=`` | ``-`` | ``+`` | ``!`` | ``*`` | ``%`` | ``<`` | ``>`` | ``&`` | ``|`` | ``^`` | ``~`` | ``.``

    binary-operator --> operator
    prefix-operator --> operator
    postfix-operator --> operator

.. docnote::
   Is this grammar still correct?
   Are there any other Unicode characters
   that are allowed to be operators?
   (A past build of Swift allowed various arrows and mathematical operators
   such as circled plus.)
   
.. docnote::
   LangRef doesn't list ? as either a character that you can use in an operator
   or as reserved punctuation.
   Is this correct?

Expresions
==========
