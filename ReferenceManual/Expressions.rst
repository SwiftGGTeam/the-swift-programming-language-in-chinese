Expressions
===========



.. langref-grammar

    expr          ::= expr-basic
    expr          ::= expr-trailing-closure expr-cast?
    expr-basic    ::= expr-sequence expr-cast?
    expr-sequence ::= expr-unary expr-binary*
    expr-primary  ::= expr-literal
    expr-primary  ::= expr-identifier
    expr-primary  ::= expr-super
    expr-primary  ::= expr-closure
    expr-primary  ::= expr-anon-closure-arg
    expr-primary  ::= expr-paren
    expr-primary  ::= expr-delayed-identifier
    expr-postfix  ::= expr-primary
    expr-postfix  ::= expr-postfix operator-postfix
    expr-postfix  ::= expr-new
    expr-postfix  ::= expr-dot
    expr-postfix  ::= expr-metatype
    expr-postfix  ::= expr-subscript
    expr-postfix  ::= expr-call
    expr-postfix  ::= expr-optional
    expr-force-value  ::= expr-force-value (typo in the langref; lhs should be expr-postfix)
    
    expr-binary ::= op-binary-or-ternary expr-unary expr-cast?
    op-binary-or-ternary ::= operator-binary
    op-binary-or-ternary ::= '='
    op-binary-or-ternary ::= '?'-infix expr-sequence ':'
    expr-cast ::= 'is' type
    expr-cast ::= 'as' type
    expr-unary   ::= operator-prefix* expr-postfix
    expr-literal ::= integer_literal
    expr-literal ::= floating_literal
    expr-literal ::= character_literal
    expr-literal ::= string_literal
    expr-literal ::= '__FILE__'
    expr-literal ::= '__LINE__'
    expr-literal ::= '__COLUMN__'
    expr-identifier ::= identifier generic-args?
    expr-super ::= expr-super-method
    expr-super ::= expr-super-subscript
    expr-super ::= expr-super-constructor
    expr-super-method ::= 'super' '.' expr-identifier
    expr-super-subscript ::= 'super' '[' expr ']'
    expr-super-constructor ::= 'super' '.' 'init'
    expr-closure ::= '{' closure-signature? brace-item-list '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier*) func-signature-result? 'in'
    expr-anon-closure-arg ::= dollarident
    expr-delayed-identifier ::= '.' identifier
    expr-paren      ::= '(' ')'
    expr-paren      ::= '(' expr-paren-element (',' expr-paren-element)* ')'
    expr-paren-element ::= (identifier ':')? expr
    expr-dot ::= expr-postfix '.' dollarident
    expr-dot ::= expr-postfix '.' expr-identifier
    expr-subscript ::= expr-postfix '[' expr ']'
    expr-new        ::= 'new' type-identifier expr-new-bounds
    expr-new-bounds ::= expr-new-bound
    expr-new-bounds ::= expr-new-bounds expr-new-bound
    expr-new-bound  ::= '[' expr? ']'
    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+
    expr-optional ::= expr-postfix '?'-postfix
    expr-force-value ::= expr-postfix '!'
    

.. syntax-grammar::

    Grammar of an expression
    
    expression --> basic-expression | trailing-closure-expression expression-cast-OPT
    basic-expression --> expression-sequence expression-cast-OPT
    expression-sequence --> unary-expression binary-expressions-OPT
    binary-expressions --> binary-expression binary-expressions-OPT
    

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
    primary-expression --> named-expression
    primary-expression --> super-expression
    primary-expression --> closure-expression
    primary-expression --> anonymous-closure-argument
    primary-expression --> parenthesized-expression
    primary-expression --> delayed-identifier-expression

.. TODO: Come up with a better name for delayed-identifier-expression.

.. TODO:

    TR: Why does primary-expression need to be separated out of postfix-expression?
    The only place where primary-expression is used is in the first line
    of postfix-expression as one of its possible expansions.
    Removing one of these names would simplify the basic/primary/postfix naming situation.



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

.. TODO: TR: What is a metatype-expression (it's not use or defined anywhere else).

.. TODO: Also, come up with a better name for force-value-expression.
    

Unary Expressions
-----------------

.. NOTE: We haven't quite decided whether unary expressions should come before or after postfix expressions.


Binary Operators
----------------

Builtin Binary Operators
------------------------

Assignment Operator
~~~~~~~~~~~~~~~~~~~

Ternary Operator
~~~~~~~~~~~~~~~~

Cast Operators
~~~~~~~~~~~~~~


Unary Operators
---------------


Literals
--------


Identifiers
-----------

Generic Disambiguation
~~~~~~~~~~~~~~~~~~~~~~


Super
-----


Closure Expressions
-------------------


Anonymous Closure Arguments
---------------------------


Delayed Identifier Resolution
-----------------------------


Parenthesized Expressions
-------------------------


Dot Expressions
---------------


Subscript Expressions
---------------------


New Expressions
---------------


Function Application
--------------------
(Maybe call this section 'Function Calling' or something similar?)


Trailing Closures
-----------------


Optional Chaining
-----------------


Forcing an Expression's Value
-----------------------------

