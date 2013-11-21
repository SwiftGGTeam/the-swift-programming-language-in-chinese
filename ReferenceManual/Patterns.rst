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

    pattern --> typed-pattern | untyped-pattern

    typed-pattern --> variable-pattern type-specifier-OPT
    typed-pattern --> expression-pattern type-specifier-OPT
    typed-pattern --> tuple-pattern type-specifier-OPT

    untyped-pattern --> any-pattern
    untyped-pattern --> is-pattern
    untyped-pattern --> variable-pattern type-specifier-OPT
    untyped-pattern --> expression-pattern type-specifier-OPT
    untyped-pattern --> enumerator-pattern
    untyped-pattern --> tuple-pattern type-specifier-OPT



.. TODO: In prose, we discuss the meaning of the explicit type 
    (i.e., what type-specifier means).
    
    TR: It doesn't really make sense for some of the patterns to have optional type specifiers.
    For example, is-pattern type-specifier-OPT could then be expanded to:
    ``is`` type attribute-sequence-OPT type, which is redundant and doesn't work.
    Same kinds of considerations apply to any-pattern, and enumerator-pattern.
    Shouldn't the grammar reflect this? There are two ways we are considering to fix this.
    The first is to removed the type-specifier-OPT 
    after the patterns to which it isn't appropriate.
    The second is to make pattern --> untyped-pattern | typed-pattern.
    This has the advantage that we can use these more fined-grained categories elsewhere in the grammar.    
    


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

