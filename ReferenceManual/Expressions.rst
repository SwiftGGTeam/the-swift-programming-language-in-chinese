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
    expr-force-value  ::= expr-force-value



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

