Patterns
========

.. TR:
    What kind of information do we want to cover about patterns in general?
    How up to date is pattern grammar in the LangRef?
    There is an 'is' pattern; what about an 'as' pattern?

    Notes from Doug, 4/2/14:
    Patterns might be getting a little simpler since they are not being used for
    functions.  For now, it's ok to not have a discussion of pattern matching as
    a topic -- let's just talk about how awesome switch statements are.  The
    people who come from functional backgrounds will see the pattern matching
    here just like they will see the monads in optional chaining.
    Joe Groff is the pattern guru -- he designed this stuff and implemented
    the crazy switch.

.. TODO: Schedule a meeting with Joe to discuss grammar and content.

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

    pattern --> wildcard-pattern
    pattern --> is-pattern
    pattern --> variable-pattern type-annotation-OPT
    pattern --> expression-pattern type-annotation-OPT
    pattern --> enumerator-pattern
    pattern --> tuple-pattern type-annotation-OPT

.. TODO: In prose, discuss the meaning of the explicit type.
    The optional type annotation contrains a pattern to
    match only values of the specified type.

.. NOTE: Patterns don't "have" a type in the same way that values have types.
   Patterns match things of certain types.


.. _Patterns_WildcardPattern:

Wildcard Pattern
----------------

A :newTerm:`wildcard pattern` matches and ignores any value and consists of an underscore
``_``. Use a wildcard pattern in situations where you don't care about the values being
matched against. For example, the following code iterates through the closed range ``0..3``,
ignoring the current value of range on each iteration of the loop::

    for _ in 0...3 {
        // Do something three times.
    }

.. Wildcard patterns are irrefutable.

.. langref-grammar

    pattern-any ::= '_'

.. syntax-grammar::

    Grammar of a wildcard pattern

    wildcard-pattern --> ``_``

.. TODO: Try to come up with a better name for "any pattern".
    Alex and I like "wildcard" pattern much better. Going with that.


.. _Patterns_IsPattern:

Is Pattern
----------

.. langref-grammar

    pattern-is ::= 'is' type


.. syntax-grammar::

    Grammar of an is pattern

    is-pattern --> ``is`` type


.. TODO: Try to come up with a better name for "is pattern".
    Candidates:
    type-checking-pattern

.. _Patterns_Variable-BindingPattern:

Variable-Binding Pattern
------------------------

.. langref-grammar

    pattern-var ::= 'var' pattern
    pattern-var ::= 'let' pattern

.. syntax-grammar::

    Grammar of a variable-binding pattern

    variable-binding-pattern --> ``var`` pattern
    variable-binding-pattern --> ``let`` pattern

.. NOTE: We chose to call this "variable-binding pattern"
    instead of "variable pattern",
    because it's a pattern that binds variables,
    not a pattern that varies.
    "Variable pattern" is ambiguous between those two meanings.

.. _Patterns_ExpressionPattern:

Expression Pattern
------------------


.. syntax-grammar::

    Grammar of an expression pattern

    expression-pattern --> expression

.. _Patterns_EnumeratorPattern:

Enumerator Pattern
------------------

An enumerator pattern matches an enumerator declared in an enumeration.

.. langref-grammar

    pattern-enum-element ::= type-identifier? '.' identifier pattern-tuple?

.. syntax-grammar::

    Grammar of an enumerator pattern

    enumerator-pattern --> type-identifier-OPT ``.`` identifier tuple-pattern-OPT

.. _Patterns_TuplePattern:

Tuple Pattern
-------------

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
    tuple-patterns --> tuple-pattern tuple-patterns-OPT
