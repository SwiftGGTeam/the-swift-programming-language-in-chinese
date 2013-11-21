Patterns
========

.. langref-grammar

    pattern-atom ::= pattern-var
    pattern-atom ::= pattern-any
    pattern-atom ::= pattern-tuple
    pattern-atom ::= pattern-is
    pattern-atom ::= pattern-enum-element
    pattern-atom ::= expr
    pattern      ::= pattern-atom
    pattern      ::= pattern-typed
    pattern-typed ::= pattern-atom ':' type-annotation

.. syntax-grammar::

    Grammar of a pattern

    pattern --> any-pattern
    pattern --> is-pattern
    pattern --> variable-pattern type-specifier-OPT
    pattern --> expression-pattern type-specifier-OPT
    pattern --> enumerator-pattern
    pattern --> tuple-pattern type-specifier-OPT



.. TODO: In prose, we discuss the meaning of the explicit type. 
    The optional type specifier contrains a pattern to
    match only values of the specified type.
    
.. TODO: TR: Do you really mean that a pattern *has* a type,
    as it says in the LangRef,
    or do you mean that patterns can be constrained to match against a type?
    Strictly speaking, should only values (and types) have a type?




Any Pattern
-----------


.. langref-grammar

    pattern-any ::= '_'


.. syntax-grammar::

    Grammar of an any pattern
    
    any-pattern --> ``_``

.. TODO: Try to come up with a better name for "any pattern".



Is Pattern
----------


.. langref-grammar

    pattern-is ::= 'is' type


.. syntax-grammar::

    Grammar of an is pattern

    is-pattern --> ``is`` type


.. TODO: 

    Try to come up with a better name for "is pattern".
    Candidates:
    type-checking-pattern

    


Variable-Binding Patterns
-------------------------


.. langref-grammar

    pattern-var ::= 'var' pattern


.. syntax-grammar::

    Grammar of a variable-binding pattern
    
    variable-binding-pattern --> ``var`` pattern

.. NOTE:

    We chose to call this "variable-binding pattern"
    instead of "variable pattern",
    because it's a pattern that binds variables,
    not a pattern that varies.
    "Variable pattern" is ambiguous between those two meanings.


Expression Patterns
-------------------


.. syntax-grammar::

    Grammar of an expression pattern
    
    expression-pattern --> expression



Enumerator Patterns
-------------------

An enumerator pattern matches an enumerator declared in an enumeration.


.. langref-grammar

    pattern-enum-element ::= type-identifier? '.' identifier pattern-tuple?


.. syntax-grammar::

    Grammar of an enumerator pattern
    
    enumerator-pattern --> type-identifier-OPT ``.`` identifier tuple-pattern-OPT


Tuple Patterns
--------------

.. langref-grammar

    pattern-tuple ::= '(' pattern-tuple-body? ')'
    pattern-tuple-body ::= pattern-tuple-element (',' pattern-tuple-body)* '...'?
    pattern-tuple-element ::= pattern
    pattern-tuple-element ::= pattern '=' expr


.. syntax-grammar::

    Grammar of a tuple pattern
    
    tuple-pattern --> ``(`` tuple-pattern-body-OPT ``)``
    tuple-pattern-body --> tuple-pattern-element-list ``...``-OPT
    tuple-pattern-element-list --> tuple-pattern-element | tuple-pattern-element ``,`` tuple-pattern-element-list
    tuple-pattern-element --> pattern | pattern-initializer

