Lexical Structure
=================

.. TODO: Write a brief intro to this chapter.

.. TODO: Revisit and polish the prose below

Tokens are parsed using the principle of
*longest match* (also known as "maximal munch").
Text from the input is matched against the grammar
by reading longer and longer portions
until it no longer generates a valid token.
The longest token that was matched is used,
and the process continues with the remaining input text.

Whitespace and Comments
-----------------------

.. langref-grammar

    whitespace ::= ' '
    whitespace ::= '\n'
    whitespace ::= '\r'
    whitespace ::= '\t'
    whitespace ::= '\0'

    comment    ::= //.*[\n\r]
    comment    ::= /* .... */

.. ** (Matches the * above, to fix RST syntax highlighting in VIM.)

Whitespace is used to separate tokens in the source file
and as part of the context
that determines whether an operator is a prefix or postfix
(see `Operator Identifiers`_),
but is otherwise ignored.

Comments are treated as whitespace by the compiler.
Single line comments continue until the end of the line.
Multiline comments support nesting,
but the ``/*`` and ``*/`` comment markers must be balanceed.

.. TR: LangRef says comments are ignored *and* treated as whitespace.
   Is there a difference?
   (TODO: If it's just whitespace, add `comment` to the end of `whitespace`.)

.. syntax-grammar::

    Grammar of whitespace and comments

    whitespace --> U+0000 | U+0009 | U+000A | U+000D | U+0020
    comment --> single-line-comment | multiline-comment

    single-line-comment --> ``//`` comment-text line-end
    comment-text --> Any text
    line-end --> U+000A | U+000D

    multiline-comment --> ``/*`` multiline-comment-text ``*/``
    multiline-comment-text --> Any text


Identifiers
-----------


Identifier Tokens
~~~~~~~~~~~~~~~~~

Identifiers begin with
an upper case or lower case letter A through Z,
an underscore (``_``),
a non-combining alphanumeric Unicode character
in the Basic Multilingual Plane,
or a valid code point outside the Basic Multilingual Plan
that isn't in a Private Use Area.
After the first character,
digits and combining Unicode characters are also allowed.

.. langref-grammar

    identifier ::= id-start id-continue*
    id-start ::= [A-Za-z_]

    // BMP alphanum non-combining
    id-start ::= [\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-00BA]
    id-start ::= [\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]
    id-start ::= [\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]
    id-start ::= [\u1E00-\u1FFF]
    id-start ::= [\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]
    id-start ::= [\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]
    id-start ::= [\u2C00-\u2DFF\u2E80-\u2FFF]
    id-start ::= [\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]
    id-start ::= [\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-FE44]
    id-start ::= [\uFE47-\uFFFD]

    // non-BMP non-PUA
    id-start ::= [\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD]
    id-start ::= [\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD]
    id-start ::= [\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD]
    id-start ::= [\uD0000-\uDFFFD\uE0000-\uEFFFD]

    id-continue ::= [0-9]
    // combining
    id-continue ::= [\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]
    id-continue ::= id-start

.. syntax-grammar::

    Grammar of an identifier

    identifier --> identifier-head identifier-characters-OPT
    identifier-list --> identifier | identifier ``,`` identifier-list

    identifier-head --> Upper case or lower case letter A through Z
    identifier-head --> U+00A8 | U+00AA | U+00AD | U+00AF | U+00B2-U+00B5 | U+00B7-U+00BA
    identifier-head --> U+00BC-U+00BE | U+00C0-U+00D6 | U+00D8-U+00F6 | U+00F8-U+00FF
    identifier-head --> U+0100-U+02FF | U+0370-U+167F | U+1681-U+180D | U+180F-U+1DBF
    identifier-head --> U+1E00-U+1FFF
    identifier-head --> U+200B-U+200D | U+202A-U+202E | U+203F-U+2040 | U+2054 | U+2060-U+206F
    identifier-head --> U+2070-U+20CF | U+2100-U+218F | U+2460-U+24FF | U+2776-U+2793
    identifier-head --> U+2C00-U+2DFF | U+2E80-U+2FFF
    identifier-head --> U+3004-U+3007 | U+3021-U+302F | U+3031-U+303F | U+3040-U+D7FF
    identifier-head --> U+F900-U+FD3D | U+FD40-U+FDCF | U+FDF0-U+FE1F | U+FE30-U+FE44
    identifier-head --> U+FE47-U+FFFD

    identifier-head --> U+10000-U+1FFFD | U+20000-U+2FFFD | U+30000-U+3FFFD | U+40000-U+4FFFD
    identifier-head --> U+50000-U+5FFFD | U+60000-U+6FFFD | U+70000-U+7FFFD | U+80000-U+8FFFD
    identifier-head --> U+90000-U+9FFFD | U+A0000-U+AFFFD | U+B0000-U+BFFFD | U+C0000-U+CFFFD
    identifier-head --> U+D0000-U+DFFFD | U+E0000-U+EFFFD

    identifier-characters --> identifier-character identifier-characters-OPT
    identifier-character --> Digit 0 through 9
    identifier-character --> identifier-head
    identifier-character --> U+0300-U+036F | U+1DC0-U+1DFF | U+20D0-U+20FF | U+FE20-U+FE2F


Operator Identifiers
~~~~~~~~~~~~~~~~~~~~

Operator identifiers are made up of one or more of the following characters:
``@``, ``/``, ``=``, ``-``, ``+``, ``*``, ``%``, ``<``, ``>``, ``!``,
``&``, ``|``, ``^``, ``~``.
The operator identifiers
``=``, ``->``, ``//``, ``/*``, ``*/``, ``...``,
and the unary prefix operator ``&``
are reserved for use as other punctuation.

.. TR: LangRef also says (){}[].,;: are reserved punctuation,
   but those aren't valid operator characters anyway.
   OK to omit here?

Operators with a leading ``<`` or ``>`` are split into two tokens when parsing:
the leading ``<`` or ``>`` and the remainder of the token.
The remainder is parsed the same way and may be split again.
This parsing rule removes the need for whitespace
to disambiguate between the closing ``>`` characters
in nested protocols such as ``A<B<C>>`` ---
it is parsed as ``A < B < C > >`` rather than as ``A < B < C >>``.

.. TR: Any special context you must be in for this <<>> rule to happen?

To determine whether an operator is used as
a prefix operator, a postfix operator, or a binary operator,
the parser looks at the characters before and after the operator.
An operator is left bound if it is followed by one of the following characters:
``(``, ``[``, ``{``, ``,``, ``;``, ``:``, or whitespace.
An operator is left bound if it is preceded by one of the following characters:
``)``, ``]``, ``}``, ``,``, ``;``, ``:``, or whitespace.
Left and right binding effect the operator as follows:

.. TR: Correct to say any whitespace, or it is specifically CR LF HT and SP?
   That is, does NUL or a comment also count?

========== =========== ========
Left Bound Right Bound Operator
========== =========== ========
No         No          Binary
Yes        No          Prefix
No         Yes         Postfix
Yes        Yes         Binary
========== =========== ========

A left bound operator immediately followed
by a period (``.``) is never right bound.
This special case ensures that postfix operators followed
by a dot operator are parsed correctly ---
for example, ``a@.b`` is parsed as as ``(a@).b`` rather than ``(a) @ (.b)``.

.. TR: Using @ again instead of ! above,
   to avoid confusion between the above and below special cases.

A left bound ``!`` or ``?`` operator is always a postfix operator.
To use the ``?`` operator as syntactic sugar for ``Optional``,
it must be left bound;
to use it in the ternary (``? :``) operator, it must not be left bound.

.. langref-grammar

    operator ::= [@/=-+*%<>!&|^~]+
    operator ::= \.\.

      Note: excludes '=', see [1]
            excludes '->', see [2]
            excludes unary '&', see [3]
            excludes '//', '/*', and '*/', see [4]
            '..' is an operator, not two '.'s.

    operator-binary ::= operator
    operator-prefix ::= operator
    operator-postfix ::= operator

    left-binder  ::= [ \r\n\t\(\[\{,;:]
    right-binder ::= [ \r\n\t\)\]\},;:]

    any-identifier ::= identifier | operator

.. langref-grammar

    punctuation ::= '('
    punctuation ::= ')'
    punctuation ::= '{'
    punctuation ::= '}'
    punctuation ::= '['
    punctuation ::= ']'
    punctuation ::= '.'
    punctuation ::= ','
    punctuation ::= ';'
    punctuation ::= ':'
    punctuation ::= '='
    punctuation ::= '->'
    punctuation ::= '...'
    punctuation ::= '&' // unary prefix operator

.. syntax-grammar::

    Grammar of operators

    operator --> operator-character operator-OPT
    operator --> `..`
    operator-character --> ``@`` | ``/`` | ``=`` | ``-`` | ``+`` 
    operator-character --> ``*`` | ``%`` | ``<`` | ``>`` | ``!`` 
    operator-character --> ``&`` | ``|`` | ``^`` | ``~``

    binary-operator --> operator
    prefix-operator --> operator
    postfix-operator --> operator

    any-identifier --> identifier | operator

Reserved Keywords
~~~~~~~~~~~~~~~~~

.. langref-grammar

    keyword ::= 'class'
    keyword ::= 'destructor'
    keyword ::= 'extension'
    keyword ::= 'import'
    keyword ::= 'init'
    keyword ::= 'def'
    keyword ::= 'metatype'
    keyword ::= 'enum'
    keyword ::= 'protocol'
    keyword ::= 'type'
    keyword ::= 'struct'
    keyword ::= 'subscript'
    keyword ::= 'typealias'
    keyword ::= 'var'
    keyword ::= 'where'
    keyword ::= 'break'
    keyword ::= 'case'
    keyword ::= 'continue'
    keyword ::= 'default'
    keyword ::= 'do'
    keyword ::= 'else'
    keyword ::= 'if'
    keyword ::= 'in'
    keyword ::= 'for'
    keyword ::= 'return'
    keyword ::= 'switch'
    keyword ::= 'then'
    keyword ::= 'while'
    keyword ::= 'as'
    keyword ::= 'is'
    keyword ::= 'new'
    keyword ::= 'super'
    keyword ::= 'self'
    keyword ::= 'Self'
    keyword ::= '__COLUMN__'
    keyword ::= '__FILE__'
    keyword ::= '__LINE__'

*Keywords used in declarations and types*:

``class``
``destructor``
``enum``
``extension``
``func``
``import``
``init``
``let``
``metatype``
``protocol``
``struct``
``subscript``
``type``
``typealias``
``var``
``where``

*Keywords used in expressions*:

``as``
``is``
``new``
``super``
``self``
``Self``
``__COLUMN__``
``__FILE__``
``__LINE__``

.. TODO: We have a variaty of keywords that appear twice -- once as
   keywords and then again as literal text in the definition of
   expression literals.  Let's see if we can't factor them out so one
   terminal can appear in both places.  For example keyword-as or
   keyword-FILE.  This issue holds for *all* keywords -- they appear as
   literals on the right hand side of multiple definitions.
   Note that 'keyword' is never used on the right hand of any other rule;
   it's just a list of all keywords.
   We can have this just be an informational table then,
   rather than an actual set of production rules.
   The same is true of punctuation, whitespace, and comments.
   If possible, it would be great to generate these tables
   by extracting the code-voice literals from production rules
   rather than maintaining them by hand.

.. TR: Are 'operator', 'associativity', and 'precedence' reserved keywords?
    For instance, in operators.swift, we find the following example:
    operator infix ++++ {
        precedence 195
        associativity left
    }
    This example works just fine as of rev. 11445

*Keywords used in statements*:

``break``
``case``
``continue``
``default``
``do``
``else``
``if``
``in``
``for``
``return``
``switch``
``then``
``while``


Contextual Keywords
~~~~~~~~~~~~~~~~~~~

.. langref-grammar

	get
  	infix
  	operator
  	postfix
 	prefix
  	set
  	type

*Contextual keywords*:

``get``
``set``
``type``
``operator``
``prefix``
``infix``
``postfix``

.. TR: Are 'associativity', 'precedence', 'left', 'right', 'none' contextual keywords?
	For instance, in operators.swift, we find the following example:
	operator infix ++++ {
		precedence 195
  		associativity left
	}
	This example works as of rev. 11445


Implementation Identifier Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    dollarident ::= '$' id-continue+

.. syntax-grammar::

   dollar-identifier --> ``$`` identifier-characters

.. TODO: Come up with a better name than dollar-identifier.


Literals
--------

.. TODO: For each kind of literal, there are several possible types
   that the value created could have.
   Type inference determines which type is used.
   If the list of possible types is fixed, it might be worth writing down.
   But I seem to remember that it isn't set ahead of time,
   rather that it's based on which types the value can be converted to.
   This information may belong better in a chapter on type conversion.

.. Note: The top-level grammar for literals is in "Expressions".

Integer Literals
~~~~~~~~~~~~~~~~

Integer literals are made up of a series of digits,
with optional underscores (``_``) between digits for readability.
Underscores are ignored by the compiler.

By default, integer literals are expressed in decimal;
you can specify an alternate base using a prefix.
Binary literals begin with ``0b``,
octal literals begin with ``0x``,
and hexadecimal literals begin with ``0x``.

.. NOTE Negative integer literals are expressed using the unary minus operator.
   There's no leading - on an integer literal.

.. langref-grammar

    integer_literal ::= [0-9][0-9_]*
    integer_literal ::= 0x[0-9a-fA-F][0-9a-fA-F_]*
    integer_literal ::= 0o[0-7][0-7_]*
    integer_literal ::= 0b[01][01_]*

.. syntax-grammar::

    Grammar of integer literals

    integer-literal --> binary-integer-literal
    integer-literal --> octal-integer-literal
    integer-literal --> decimal-integer-literal
    integer-literal --> hexedecimal-integer-literal

    binary-integer-literal --> ``0b`` binary-digits
    octal-integer-literal --> ``0o`` octal-digits
    decimal-integer-literal --> decimal-digits
    hexadecimal-integer-literal --> ``0x`` hexadecimal-digits

    binary-digits --> binary-digit binary-digit-tail-OPT
    octal-digits --> octal-digit octal-digit-tail-OPT
    decimal-digits --> decimal-digit decimal-digit-tail-OPT
    hexadecimal-digits --> hexadecimal-digit hexadecimal-digit-tail-OPT

    binary-digit --> ``0`` | ``1``
    octal-digit --> ``0`` | ``1`` | ``2`` | ``3`` | ``4`` | ``5`` | ``6`` | ``7``
    decimal-digit --> ``0`` | ``1`` | ``2`` | ``3`` | ``4`` | ``5`` | ``6`` | ``7`` | ``8`` | ``9``
    hexadecimal-digit --> ``0`` | ``1`` | ``2`` | ``3`` | ``4`` | ``5`` | ``6`` | ``7`` | ``8`` | ``9``
    hexadecimal-digit --> ``A`` | ``B`` | ``C`` | ``D`` | ``E`` | ``F``
    hexadecimal-digit --> ``a`` | ``b`` | ``c`` | ``d`` | ``e`` | ``f``

    binary-digit-tail --> binary-digit binary-digit-tail-OPT | ``_`` binary-digit-tail-OPT
    octal-digit-tail --> octal-digit octal-digit-tail-OPT | ``_`` octal-digit-tail-OPT
    decimal-digit-tail --> decimal-digit decimal-digit-tail-OPT | ``_`` decimal-digit-tail-OPT
    hexadecimal-digit-tail --> hexadecimal-digit hexadecimal-digit-tail-OPT | ``_`` hexadecimal-digit-tail-OPT

.. TR: This grammar matches the LangRef in permitting a trailing
   underscore, allowing things like 1_000_ to be matched.  Is that
   desired?

   (If not, change foo-digit-tail to read foo-digit | ``_`` foo-digit.)

.. Alternate approach -- formally describe a grammar that treats underscore as a digit,
   and just let the prose restrict the places where it can appear.

Floating-Point Literals
~~~~~~~~~~~~~~~~~~~~~~~

Floating-point literals are made up three parts:
an integer, a fraction, and an exponent.

.. syntax-outline::

   <#integer#>.<#fraction#>e<#exponent#>

All three parts are made up of a series of digits,
with optional underscores (``_``) between digits for readability.
Underscores are ignored by the compiler.
The fraction is separated by a decimal point (``.``).
The exponent is separated by ``e`` or ``E``
followed by an optional sign (``+`` or ``-``).
Either the fraction or the exponent may be omitted.

By default, floating-point literals are expressed in decimal;
you can specify a hexadecimal literal using the ``0x`` prefix.

.. langref-grammar

    floating_literal ::= [0-9][0-9_]*\.[0-9][0-9_]*
    floating_literal ::= [0-9][0-9_]*\.[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*
    floating_literal ::= [0-9][0-9_]*[eE][+-]?[0-9][0-9_]*
    floating_literal ::= 0x[0-9A-Fa-f][0-9A-Fa-f_]*
                           (\.[0-9A-Fa-f][0-9A-Fa-f_]*)?[pP][+-]?[0-9][0-9_]*

.. syntax-grammar::

   Grammar of floating-point literals

   floating-point-literal --> decimal-digits floating-point-decimal-fraction-OPT floating-point-decimal-exponent-OPT
   floating-point-literal --> ``0x`` hexadecimal-digits floating-point-hexadecimal-fraction-OPT floating-point-hexadecimal-exponent-OPT

   floating-point-decimal-fraction --> ``.`` decimal-digits
   floating-point-decimal-exponent --> floating-point-e sign-OPT decimal-digits

   floating-point-hexadecimal-fraction --> ``.`` hexadecimal-digits-OPT
   floating-point-hexadecimal-exponent --> floating-point-e sign-OPT hexadecimal-digits

   floating-point-e --> ``e`` | ``E``
   sign --> ``+`` | ``-``


Character Literals
~~~~~~~~~~~~~~~~~~

A character literal is a Unicode grapheme cluster surrounded by single quotes,
with the following general form:

.. syntax-outline::

    '<#character#>'

Character literals cannot contain
an unescaped double quote (``'``),
an unescaped backslash (``\``),
a carriage return, or a line feed.
These characters and other special characters
can be included using *escape sequences*.
The following escape sequences are supported:

* Null Character (``\0``)
* Backslash (``\\``)
* Horizontal Tab (``\t``)
* Line Feed (``\n``)
* Carriage Return (``\r``)
* Double Quote (``\"``)
* Single Quote (``\'``)

.. The behavior of \n and \r is not the same as C.
   We specify exactly what those escapes mean.
   The behavior on C is platform dependent --
   in text mode, \n maps to the platform's line separator
   which could be CR or LF or CRLF.

Characters can also be escaped by ``\x`` followed by two hexadecimal digits,
``\u`` followed by four hexadecimal digits,
or ``\U`` followed by eight hexadecimal digits.
The digits in these escape codes identify a Unicode codepoint.

.. langref-grammar

    character_literal ::= '[^'\\\n\r]|character_escape'
    character_escape  ::= [\]0 [\][\] | [\]t | [\]n | [\]r | [\]" | [\]'
    character_escape  ::= [\]x hex hex
    character_escape  ::= [\]u hex hex hex hex
    character_escape  ::= [\]U hex hex hex hex hex hex hex hex

.. syntax-grammar::

    Grammar of character literals

    character-literal --> ``'`` quoted-character ``'``
    quoted-character --> escaped-character
    quoted-character --> Any Unicode grapheme cluster except ``'`` ``\`` U+000A U+000D

    escaped-character --> ``\0`` | ``\\`` | ``\t`` | ``\n`` | ``\r`` | ``\"`` | ``\'``
    escaped-character --> ``\x`` hexadecimal-digit hexadecimal-digit
    escaped-character --> ``\u`` hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit
    escaped-character --> ``\U`` hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit


String Literals
~~~~~~~~~~~~~~~

A string literal is a sequence of characters surrounded by double quotes,
with the following general form:

.. syntax-outline::

    "<#text#>"

String literals cannot contain
an unescaped double quote (``"``),
an unescaped backslash (``\``),
a carriage return, or a line feed.
String literals support the same escapes as character literals.
.. TODO link?

The value of an expression can be inserted into a string
by placing the expression in parentheses after a backslash (\).
This expression must not contain
an unescaped double quote ("),
an unescaped backslash (\),
a carriage return, or a line feed.

.. TR: How is the expression stringified?
   Is there a protocol we can say it must conform to?

.. The following all have the same value:

   "1 2 3"
   "1 2 \(3)"
   "1 2 \(1 + 2)"
   var x = 3; "1 2 \(x)"

.. TR: Any context where string literals become implicitly null-terminated?

.. langref-grammar

    string_literal   ::= ["]([^"\\\n\r]|character_escape|escape_expr)*["]
    escape_expr      ::= [\]escape_expr_body
    escape_expr_body ::= [(]escape_expr_body[)]
    escape_expr_body ::= [^\n\r"()]

.. syntax-grammar::

    Grammar of string literals

    string-literal --> ``"`` quoted-text ``"``

    quoted-text --> quoted-text-item quoted-text-OPT
    quoted-text-item --> escaped-character
    quoted-text-item --> ``\(`` expression ``)``
    quoted-text-item --> Any text

.. Quoted text resolves to a sequence of escaped characters by way of
   the quoted-texts rule which allows repetition; no need to allow
   repetition in the quoted-text/escaped-character rule too.

.. TR: Paren balancing is required by the grammar of *expression* already, so I
   omitted it in the rule above.

.. TODO: Based on the above, it looks like the schema for grammar productions
   needs to let prose contain references to literals and syntactic categories.

Module Scope
------------

.. TODO: Better to describe this part of the grammar in prose.

	Also, the LangRef has the heading 'Module-Scope Declarations',
	and discusses it as part of Declaration.
	This makes me wonder whether it belongs in the Declarations chapter.

.. langref-grammar

    top-level ::= brace-item*


Code Blocks
-----------

.. syntax-outline::

    {
        <#statements#>
    }

.. langref-grammar

    brace-item-list ::= '{' brace-item* '}'
    brace-item      ::= decl
    brace-item      ::= expr
    brace-item      ::= stmt

.. syntax-grammar::

    Grammar of a code block

    code-block --> ``{`` statements-OPT ``}``
