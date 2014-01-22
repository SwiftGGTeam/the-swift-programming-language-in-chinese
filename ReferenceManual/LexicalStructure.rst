Lexical Structure
=================

.. TODO: Write a brief intro to this chapter.

[The content of this chapter is still being written.]


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
    whitespace --> U+000A (New Line)
    whitespace --> U+000D (Carriage Return)
    whitespace --> U+0020 (Space)

    comment --> single-line-comment | multiline-comment

    single-line-comment --> ``//`` comment-text line-end
    comment-text --> Any text except for line-end
    line-end --> U+000A (New Line) | U+000D (Carriage Return)

    multiline-comment --> ``/*`` multiline-comment-text ``*/``
    multiline-comment-text --> Any text

Multiline comments may be nested.


Identifiers
-----------


Identifier Tokens
~~~~~~~~~~~~~~~~~


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

    operator --> operator-character operator-OPT
    operator --> ``..``

    operator-character --> One of the following characters:
    ``@`` ``/`` ``=`` ``-`` ``+`` ``*`` ``%`` ``<`` ``>`` ``!`` ``&`` ``|`` ``^`` ``~``

    binary-operator --> operator
    prefix-operator --> operator
    postfix-operator --> operator
    postfix-operators --> postfix-operator postfix-operators-OPT

    any-identifier --> identifier | operator

.. TODO: Move any-identifier.  It doesn't belong here -- it's not an operator.

Operators that are followed by one of the following characters are *left bound*:

    Space, Carriage Return, New Line, Horizontal Tab
    ``(`` ``[`` ``{`` ``,`` ``;`` ``:``


Operators that are preceded by one of the following characters are *right bound*:

    Space, Carriage Return, New Line, Horizontal Tab
    ``)`` ``]`` ``}`` ``,`` ``;`` ``:``

Being right/left bound determines whether an operator is
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

The following character sequences are reserved punctuation and may not be used as operators:

    ``=`` ``->`` ``//`` ``/*`` ``*/`` ``...`` ``{`` ``}`` ``(`` ``)`` ``[`` ``]`` ``.`` ``,`` ``;`` ``:``

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


Constants
---------


Integer Literals
~~~~~~~~~~~~~~~~


Floating-Point Literals
~~~~~~~~~~~~~~~~~~~~~~~


Character Literals
~~~~~~~~~~~~~~~~~~


String Literals
~~~~~~~~~~~~~~~


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
