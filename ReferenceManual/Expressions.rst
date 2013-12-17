Expressions
===========

.. langref-grammar

    expr          ::= expr-basic
    expr          ::= expr-trailing-closure expr-cast?

    expr-basic    ::= expr-sequence expr-cast?

    expr-sequence ::= expr-unary expr-binary*


.. syntax-grammar::

    Grammar of an expression

    expression --> expression-sequence expression-cast-OPT
    expression-sequence --> unary-expression binary-expressions-OPT

.. TR: A trailing-closure-expression seems to be allowed only in the context of function calling.
    As a result, there's no need to have it at the top level of the expression grammar.
    As a result, we can move it to the function-call-expression grammar
    and remove basic-expression as a syntactic category. Is this change OK?


Unary Operators
---------------

.. NOTE: We haven't quite decided whether unary expressions should come before or after postfix expressions.

.. langref-grammar

    expr-unary   ::= operator-prefix* expr-postfix

.. syntax-grammar::

    Grammar of a unary expression

    unary-expression --> prefix-operators-OPT postfix-expression


.. TODO: Give a list of the unary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.


Binary Operators
----------------

.. langref-grammar

    expr-binary ::= op-binary-or-ternary expr-unary expr-cast?
    op-binary-or-ternary ::= operator-binary
    op-binary-or-ternary ::= '='
    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a binary expression

    binary-expression --> binary-operator unary-expression expression-cast-OPT
    binary-expression --> assignment-operator unary-expression expression-cast-OPT
    binary-expression --> conditional-operator unary-expression expression-cast-OPT
    binary-expressions --> binary-expression binary-expressions-OPT

.. TODO: Give a list of the binary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.

.. TR: Strictly speaking, a binary-expression is not an actual expression;
    rather, it is part of an expression
    (the expression is well-formed when it's the continuation of a unary expression).
    The same goes for expression-cast.
    What's the reason behind formulating the grammar in this way?

.. TODO: Depending on how strict we want to be with naming our syntactic categories,
    and the answer to the tech review question above,
    we may want to rename this to something like a binary-expression-clause,
    because the current formulation (on it's own) doesn't produce a well-formed expression.

Builtin Binary Operators
~~~~~~~~~~~~~~~~~~~~~~~~

Assignment Operator
+++++++++++++++++++

.. langref-grammar

    op-binary-or-ternary ::= '='

.. syntax-grammar::

    Grammar of an assignment operator

    assignment-operator --> ``=``


Conditional Operator
++++++++++++++++++++

.. langref-grammar

    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a conditional operator

    conditional-operator --> ``?`` expression-sequence ``:``

.. TODO: Discuss in prose that '?' is being used as an infix operator in this context.
    In additional, there must be whitespace on both sides of '?' and ':'.


Type-Casting Operators
++++++++++++++++++++++

.. langref-grammar

    expr-cast ::= 'is' type
    expr-cast ::= 'as' type

.. syntax-grammar::

    Grammar of an expression cast

    expression-cast --> ``is`` type | ``as`` type


Primary Expressions
-------------------

.. langref-grammar

    expr-primary  ::= expr-literal
    expr-primary  ::= expr-identifier
    expr-primary  ::= expr-super
    expr-primary  ::= expr-closure
    expr-primary  ::= expr-anon-closure-arg
    expr-primary  ::= expr-paren
    expr-primary  ::= expr-delayed-identifier

.. syntax-grammar::

    Grammar of a primary expression

    primary-expression --> literal-expression
    primary-expression --> identifier-expression
    primary-expression --> superclass-expression
    primary-expression --> closure-expression
    primary-expression --> anonymous-closure-argument
    primary-expression --> parenthesized-expression
    primary-expression --> delayed-identifier-expression

.. NOTE: One reason for breaking primary expressions out of postfix
   expressions is for exposition -- it makes it easier to organize the
   prose surrounding the production rules.


Literal Expressions
~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-literal ::= integer_literal
    expr-literal ::= floating_literal
    expr-literal ::= character_literal
    expr-literal ::= string_literal
    expr-literal ::= '__FILE__'
    expr-literal ::= '__LINE__'
    expr-literal ::= '__COLUMN__'

.. syntax-grammar::

    Grammar of a literal expression

    literal-expression --> integer-literal | floating-point-literal | character-literal | string-literal
    literal-expression --> ``__FILE__`` | ``__LINE__`` | ``__COLUMN__``


Identifier Expressions
~~~~~~~~~~~~~~~~~~~~~~


Generic Disambiguation
++++++++++++++++++++++

.. langref-grammar

    expr-identifier ::= identifier generic-args?

.. syntax-grammar::

    Grammar of an identifier expression

    identifier-expression --> identifier generic-argument-clause-OPT


Superclass Expressions
~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-super ::= expr-super-method
    expr-super ::= expr-super-subscript
    expr-super ::= expr-super-constructor
    expr-super-method ::= 'super' '.' expr-identifier
    expr-super-subscript ::= 'super' '[' expr ']'
    expr-super-constructor ::= 'super' '.' 'init'

.. syntax-grammar::

    Grammar of a superclass expression

    superclass-expression --> superclass-method-expression | superclass-subscript-expression | superclass-constructor-expression

    superclass-method-expression --> ``super`` ``.`` identifier-expression
    superclass-subscript-expression --> ``super`` ``[`` expression ``]``
    superclass-constructor-expression --> ``super`` ``.`` ``init``


Closure Expressions
~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-closure ::= '{' closure-signature? brace-item-list '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier*) func-signature-result? 'in'

.. TR: A required brace-item-list doesn't seem correct.
    Rather, it should be brace-item*. Is this just a typo?
    Another typo: The '*' should come after the paren in (',' identifier*).

.. syntax-grammar::

    Grammar of a closure expression

    closure-expression --> ``{`` closure-signature-OPT code-block-items ``}``
    closure-expressions --> closure-expression closure-expressions-OPT

    closure-signature --> tuple-pattern function-signature-result-OPT ``in``
    closure-signature --> identifier-list function-signature-result-OPT ``in``

.. TODO: Add grammar for identifier-list to Identifiers in Lexical Structure.
    (identifier-list --> identifier | identifier ``,`` identifier-list)


Anonymous Closure Argument
++++++++++++++++++++++++++

.. langref-grammar

    expr-anon-closure-arg ::= dollarident


.. syntax-grammar::

    Grammar of an anonymous closure argument

    anonymous-closure-argument --> dollar-identifier

.. TODO: Come up with a better name than dollar-identifier.


Parenthesized Expressions
~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-paren      ::= '(' ')'
    expr-paren      ::= '(' expr-paren-element (',' expr-paren-element)* ')'
    expr-paren-element ::= (identifier ':')? expr


.. syntax-grammar::

    Grammar of a parenthesized expression

    parenthesized-expression --> ``(`` expression-element-list-OPT ``)``
    expression-element-list --> expression-element | expression-element ``,`` expression-element-list
    expression-element --> expression | identifier ``:`` expression


Delayed Identifier Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-delayed-identifier ::= '.' identifier


.. syntax-grammar::

    Grammar of a delayed identifier expression

    delayed-identifier-expression --> ``.`` enumerator-name

.. TODO: Come up with a better name for delayed-identifier-expression.


Postfix Expressions
-------------------

.. langref-grammar

    expr-postfix  ::= expr-primary
    expr-postfix  ::= expr-postfix operator-postfix
    expr-postfix  ::= expr-new
    expr-postfix  ::= expr-dot
    expr-postfix  ::= expr-metatype
    expr-postfix  ::= expr-subscript
    expr-postfix  ::= expr-call
    expr-postfix  ::= expr-optional
    expr-force-value  ::= expr-force-value (typo in the langref; lhs should be expr-postfix)

.. syntax-grammar::

    Grammar of a postfix expression

    postfix-expression --> primary-expression
    postfix-expression --> postfix-expression postfix-operator
    postfix-expression --> new-expression
    postfix-expression --> dot-expression
    postfix-expression --> metatype-expression
    postfix-expression --> subscript-expression
    postfix-expression --> function-call-expression
    postfix-expression --> optional-expression
    postfix-expression --> force-value-expression


Dot Expressions
~~~~~~~~~~~~~~~

.. langref-grammar

    expr-dot ::= expr-postfix '.' dollarident
    expr-dot ::= expr-postfix '.' expr-identifier

.. syntax-grammar::

    Grammar of a dot expression
    
    dot-expression --> postfix-expression ``.`` dollar-identifier
    dot-expression --> postfix-expression ``.`` named-expression


Metatype Expression
~~~~~~~~~~~~~~~~~~~

.. NOTE: There is no definition for metatype-expression in the LangRef.
    This was probably just an oversight, according to Ted and Doug.

.. syntax-grammar::

    Grammar of a metatype expression
    
    metatype-expression --> postfix-expression ``.`` ``metatype``


Subscript Expressions
~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-subscript ::= expr-postfix '[' expr ']'

.. syntax-grammar::

    Grammar of a subscript expression
    
    subscript-expression --> postfix-expression ``[`` expression ``]``


New Expressions
~~~~~~~~~~~~~~~

.. langref-grammar

    expr-new        ::= 'new' type-identifier expr-new-bounds
    expr-new-bounds ::= expr-new-bound
    expr-new-bounds ::= expr-new-bounds expr-new-bound
    expr-new-bound  ::= '[' expr? ']'

.. syntax-grammar::

    Grammar of a new expression

    new-expression --> ``new`` type-identifier new-expression-bounds
    new-expression-bounds --> new-expression-bounds-OPT new-expression-bound
    new-expression-bound --> ``[`` expression-OPT ``]``

.. TODO: Come back and clean up this grammar.
    Also, note that this is *explicitly* left-recursive.


Function Call Expression
~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+

.. syntax-grammar::

    Grammar of a function call expression

    function-call-expression --> postfix-expression parenthesized-expression trailing-closure-OPT
    trailing-closure --> closure-expressions expression-cast-OPT

.. TR:
    Confirm that putting the trailing closure here,
    as part of the function call syntax,
    rather than as part of the general syntax of an expression
    is still correct.
    Assuming that it's correct, it reduces overgeneration
    and is easier to read.


Optional Chaining
~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-optional ::= expr-postfix '?'-postfix

.. syntax-grammar::

   Grammar of an optional expression

   optional-expression --> postfix-expression ``?``

.. NOTE: The fact that ? must be postfix when it's used for Optional
   is in "Lexical Structure", under the discussion of left/right binding.

.. TODO: Try to re-title.  It's about chaining of optional operators,
   not about the optional kind of chaining.


Forcing an Expression's Value
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-force-value ::= expr-postfix '!'

.. syntax-grammar::

    Grammar of a force-value expression

    force-value-expression --> postfix-expression ``!``

.. TODO: Also, come up with a better name for force-value-expression.
