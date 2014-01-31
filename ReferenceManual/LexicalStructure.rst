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
and the process continues with the remaining inupt text.

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

..
    ** (Matches the * above, to fix RST syntax highlighting.)

.. syntax-grammar::

    Grammar of whitespace and comments

    whitespace --> U+0000 (Null Character)
    whitespace --> U+0009 (Horizontal Tab)
    whitespace --> U+000A (Line Feed)
    whitespace --> U+000D (Carriage Return)
    whitespace --> U+0020 (Space)

    whitespace --> U+0000 (Null Character) | U+0009 (Horizontal Tab) | U+000A (New Line) | U+000D (Carriage Return) | U+0020 (Space)

    comment --> single-line-comment | multiline-comment

    single-line-comment --> ``//`` comment-text line-end
    comment-text --> Any text except for line-end
    line-end --> U+000A (Line Feed) | U+000D (Carriage Return)

    multiline-comment --> ``/*`` multiline-comment-text ``*/``
    multiline-comment-text --> Any text

Whitespace is used to separate tokens in the source file
and as part of the context
that determines whether an operator is a prefix or postfix
(see `Operator Identifiers`_),
but is otherwise ignored.

Comments are treated as whitespace by the compiler.
Multiline comments support nesting.

.. TR: LangRef says comments are ignored *and* treated as whitespace.
   Is there a difference?


Identifiers
-----------


Identifier Tokens
~~~~~~~~~~~~~~~~~

.. TODO: Add grammar for identifier-list to Identifiers (used in Closure Expressions).
    identifier-list --> identifier | identifier ``,`` identifier-list



Operator Identifiers
~~~~~~~~~~~~~~~~~~~~

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

.. syntax-grammar::

    Grammar of operators

    operator --> left-bound-operator | right-bound-operator
    left-bound-operator --> operator-characters left-binding-character
    right-bound-operator --> right-binding-charactor operator-characters

    left-binding-character --> U+0020 (Space) | U+000D (Carriage Return) | U+000A (New Line) | U+0009 (Horizontal Tab) | ``(`` | ``[`` | ``{`` | ``,`` | ``;`` | ``:``
    right-binding-character --> U+0020 (Space) | U+000D (Carriage Return) | U+000A (New Line) | U+0009 (Horizontal Tab) | ``)`` | ``]`` | ``}`` | ``,`` | ``;`` | ``:``

    operator-characters --> operator-character operator-characters-OPT
    operator-characters --> ``..``
    operator-character --> ``@`` | ``/`` | ``=`` | ``-`` | ``+`` | ``*`` | ``%`` | ``<`` | ``>`` | ``!`` | ``&`` | ``|`` | ``^`` | ``~``

    binary-operator --> operator
    prefix-operator --> operator
    postfix-operator --> operator
    postfix-operators --> postfix-operator postfix-operators-OPT

    any-identifier --> identifier | operator

.. TODO: Move any-identifier.  It doesn't belong here -- it's not an operator.

Left and/or right binding determines whether an operator is
a prefix operator, a postfix operator, or a binary operator.
Operators that are left bound and not right bound are postfix operators.
Operators that are right bound and not left bound are prefix operators.
Operators that are not bound, and operators that are right and left bound, are binary operators.

Any operator immediately followed by a period (``.``)
is not right bound if it is already left bound.
This special case ensures that expressions like ``a@.b`` are parsed
as ``(a@).b`` rather than ``(a) @ (.b)``.

..  TR: What causes the ``@`` to be left bound here?
    Langref says:
    As an exception, an operator immediately followed by a dot ('.') is
    only considered right-bound if not already left-bound. This allows a@.prop
    to be parsed as (a@).prop rather than as a @ .prop.

If the ``!`` or ``?`` operator is left bound, it is a postfix operator,
regardless of whether it is right bound.
To use the ``?`` operator as syntactic sugar for ``Optional``, it must be left bound;
to use it in the ternary (``? :``) operator, it must not be left bound.

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

    Grammar of reserved punctuation

    reserved-punctuation --> ``=`` | ``->`` | ``//`` | ``/*`` | ``*/`` | ``...`` | ``{`` | ``}`` | ``(`` | ``)`` | ``[`` | ``]`` | ``.`` | ``,`` | ``;`` | ``:``

The character sequences in *reserved-punctuation* may not be used as operators.
The unary prefix operator ``&`` is also reserved punctuation and may not be used as an operator.

Operators with a leading ``<`` or ``>`` are split into two tokens:
the leading ``<`` or ``>`` and the remainder of the token.
The remainder may itself be split in the same way.
This removes the need for disambiguating spaces between the closing ``>`` characters
in nested protocols such as ``A<B<C>>``---
it is parsed as ``A < B < C > >`` rather than as ``A < B < C >>``.

.. langref
    When parsing certain grammatical constructs that involve '<' and '>' (such
    as protocol composition types), an operator with a leading '<' or '>' may
    be split into two or more tokens: the leading '<' or '>' and the remainder
    of the token, which may be an operator or punctuation token that may itself
    be further split. This rule allows us to parse nested constructs such as
    A<B<C>> without requiring spaces between the closing '>'s.


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

.. TODO: TR: Are 'operator', 'associativity', and 'precedence' reserved keywords?
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

.. TODO: TR: Are 'associativity', 'precedence', 'left', 'right', 'none' contextual keywords?
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

.. TODO: Translate dollar-identifier grammar after we've translated the identifier grammar.


Literals
--------

.. TODO: For each kind of literal, there are several possible types that the value created could have.
   Type inference determines which type is used.
   If the list of possible types is fixed, it might be worth writing down.
   But I seem to remember that it isn't set ahead of time,
   rather that it's based on which types the value can be converted to.
   This information may belong better in a chapter on type conversion.

.. Note: The top-level grammar for literals is in "Expressions".

Integer Literals
~~~~~~~~~~~~~~~~

.. langref-grammar

    integer_literal ::= [0-9][0-9_]*
    integer_literal ::= 0x[0-9a-fA-F][0-9a-fA-F_]*
    integer_literal ::= 0o[0-7][0-7_]*
    integer_literal ::= 0b[01][01_]*

.. syntax-grammar::

    Grammar of integer literals

    integer-literal --> binary-integer-literal | octal-integer-literal | decimal-integer-literal-literal | hexedecimal-integer-literal

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
    hexidecimal-digit --> decimal-digit
    hexidecimal-digit --> ``A`` | ``B`` | ``C`` | ``D`` | ``E`` | ``F``
    hexidecimal-digit --> ``a`` | ``b`` | ``c`` | ``d`` | ``e`` | ``f``

    binary-digit-tail --> binary-digit binary-digit-tail-OPT | ``_`` binary-digit-tail-OPT
    octal-digit-tail --> octal-digit octal-digit-tail-OPT | ``_`` octal-digit-tail-OPT
    decimal-digit-tail --> decimal-digit decimal-digit-tail-OPT | ``_`` decimal-digit-tail-OPT
    hexadecimal-digit-tail --> hexadecimal-digit hexadecimal-digit-tail-OPT | ``_``hexadecimal-digit-tail-OPT

.. TR: This grammar matches the LangRef in permitting a trailing
   underscore, allowing things like 1_000_ to be matched.  Is that
   desired?

   (If not, change foo-digit-tail to read foo-digit | ``_`` foo-digit.)

Floating-Point Literals
~~~~~~~~~~~~~~~~~~~~~~~

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

    '<# character #>'

Character literals cannot contain
an unescaped double quote (``'``),
an unescaped backslash (``\``),
a carriage return, or a line feed.
These characters and other special characters can be included using *escape sequences*.
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
    quoted-character --> Any character except ``'`` ``\`` U+000A (Line Feed) U+000D (Carriage Return)

    quoted-character --> Any character that does not match quoted-character-exceptions
    quoted-character-exceptions -- ``'`` | ``\`` | U+000A (Line Feed) | U+000D (Carriage Return)

    escaped-character --> ``\0`` | ``\\`` | ``\t`` | ``\n`` | ``\r`` | ``\"`` | ``\'``
    escaped-character --> ``\x`` hexadecimal-digit hexadecimal-digit
    escaped-character --> ``\u`` hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit
    escaped-character --> ``\U`` hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit hexadecimal-digit

.. TODO: Choose one of the above definitions for "does not contain".

.. TR: Is the definition of quoted-character strictly accurate?  For
   example, can I have a Unicode combining diacritic mark between single quotes
   and have it count as a character literal?  (Setting aside the fact that most
   text editors probably won't render that well.)


String Literals
~~~~~~~~~~~~~~~

A string literal is a sequence of characters surrounded by double quotes,
with the following general form:

.. syntax-outline::

    "<# text #>"

String literals cannot contain
an unescaped double quote (``"``),
an unescaped backslash (``\``),
a carriage return, or a line feed.
These characters and other special characters can be included using escapes.

.. TODO: Same escapes supported here as with character literals.

In addition to the escapes supported by character literals,
the value of an expression can be inserted into a string
by placing the expression in parentheses after a backslash (\).
This expression must not contain
an unescaped double quote ("),
an unescaped backslash (\),
a carriage return, or a line feed.

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

    quoted-texts --> quoted-text-item quoted-text-OPT
    quoted-text-item --> escaped-character
    quoted-text-item --> ``\(`` interpolated-expression ``)``

    quoted-text-item --> Any text that does not contain ``"`` ``\`` U+000A (Line Feed) U+000D (Carriage Return)

    quoted-text-item --> Any text that does not contain a character from quoted-text-exceptions
    quoted-text-exceptions --> ``"`` | ``\`` | U+000A (Line Feed) | U+000D (Carriage Return)

    interpolated-expression --> Any text that matches both expression and quoted-text

.. TODO: Choose one of the above definitions for "does not contain".

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
        <#code to execute#>
    }

.. langref-grammar

    brace-item-list ::= '{' brace-item* '}'
    brace-item      ::= decl
    brace-item      ::= expr
    brace-item      ::= stmt

.. syntax-grammar::

    Grammar of a code block

    code-block --> ``{`` code-block-items-OPT ``}``
    code-block-items --> code-block-item code-block-items-OPT
    code-block-item --> declaration | expression | statement
