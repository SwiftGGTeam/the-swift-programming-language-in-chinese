Patterns
========

.. write-me:: Need intro.

.. Discuss in intro:
    What patterns are
    Pattern matching
    Pattern matching contexts
    refutable vs irrefutable

.. TODO: In prose, discuss the meaning of the explicit type.
    The optional type annotation contrains a pattern to
    match only values of the specified type.

.. NOTE: Patterns don't "have" a type in the same way that values have types.
   Patterns match things of certain types.


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

    pattern --> wildcard-pattern type-annotation-OPT
    pattern --> identifier-pattern type-annotation-OPT
    pattern --> value-pattern
    pattern --> tuple-pattern type-annotation-OPT
    pattern --> enumerator-pattern
    pattern --> type-casting-pattern
    pattern --> expression-pattern


.. _Patterns_WildcardPattern:

Wildcard Pattern
----------------

A :newTerm:`wildcard pattern` matches and ignores any value and consists of an underscore
``_``. Use a wildcard pattern in situations where you don't care about the values being
matched against. For example, the following code iterates through the closed range ``1..3``,
ignoring the current value of the range on each iteration of the loop::

    for _ in 1..3 {
       // Do something three times.
    }


.. langref-grammar

    pattern-any ::= '_'

.. syntax-grammar::

    Grammar of a wildcard pattern

    wildcard-pattern --> ``_``


.. _Patterns_IdentifierPattern:

Identifier Pattern
------------------

An :newTerm:`identifier pattern` matches any value and binds the matched value to a
variable or constant name.
For example, in the following constant declaration, ``someValue`` is an identifier pattern
that matches the value ``42`` of type ``Int``::

    let someValue = 42

When the match succeeds, the value ``42`` is bound (assigned)
to the constant name ``someValue``.

When the pattern of variable or constant declaration is an identifier pattern, the
identifier pattern is implicitly a subpattern of a value-binding pattern.


.. syntax-grammar::

    Grammar of an identifier pattern

    identifier-pattern --> identifier


.. _Patterns_Value-BindingPattern:

Value-Binding Pattern
---------------------

A :newTerm:`value-binding pattern` binds matched values to variable or constant names.
Value-binding patterns that bind a matched value to the name of a constant
begin with the keyword ``let``; those that bind to the name of variable
begin with the keyword ``var``.

Identifiers patterns within a value-binding pattern
bind new named variables or constants to their matching values. For example,
you can decompose the elements of a tuple and bind the value of each element to a
corresponding identifier pattern.

::

    let point = (3, 2)
    switch point {
    // Bind x and y to the elements of point.
    case let (x, y):
       println("The point is at (\(x), \(y).")
    }
    // Prints "The point is at (3, 2)."

In the example above, ``let`` distributes to each identifier pattern in the
tuple pattern ``(x, y)``. Because of this behavior, the ``switch`` cases
``case let (x, y):`` and ``case (let x, let y):`` match the same values.

.. langref-grammar

    pattern-var ::= 'var' pattern
    pattern-var ::= 'let' pattern

.. syntax-grammar::

    Grammar of a value-binding pattern

    value-binding-pattern --> ``var`` pattern | ``let`` pattern

.. NOTE: We chose to call this "value-binding pattern"
    instead of "variable pattern",
    because it's a pattern that binds values to either variables or constants,
    not a pattern that varies.
    "Variable pattern" is ambiguous between those two meanings.


.. _Patterns_TuplePattern:

Tuple Pattern
-------------

A :newTerm:`tuple pattern` is a comma-separated list of zero or more patterns, enclosed in
parentheses. Tuple patterns match values of corresponding tuple types.

You can constrain a tuple pattern to match certain kinds of tuple types
using type annotations.
For example, the tuple pattern ``(x, y): (Int, Int)`` in the constant declaration
``let (x, y): (Int, Int) = (1, 2)`` matches only tuple types in which
both elements are of type ``Int``. To constrain only some elements of a tuple pattern,
provide type annotations directly to those individual elements. For example, the tuple
pattern in ``let (x: String, y)`` matches any two-element tuple type, as long as the first
element is of type ``String``.

When a tuple pattern is used as the pattern in a ``for``-``in`` statement
or a variable or constant declaration, it can contain only wildcard patterns,
identifier patterns, or other tuple patterns that contain those. For example, the
following code isn't valid because the element ``0`` in the tuple pattern ``(x, 0) is
an expression pattern.

::

    let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
    // This code isn't valid.
    for (x, 0) in points {
       /* ... */
    }

.. langref-grammar

    pattern-tuple ::= '(' pattern-tuple-body? ')'
    pattern-tuple-body ::= pattern-tuple-element (',' pattern-tuple-body)* '...'?
    pattern-tuple-element ::= pattern
    pattern-tuple-element ::= pattern '=' expr

.. syntax-grammar::

    Grammar of a tuple pattern

    tuple-pattern --> ``(`` tuple-pattern-element-list-OPT ``)``
    tuple-pattern-element-list --> tuple-pattern-element | tuple-pattern-element ``,`` tuple-pattern-element-list
    tuple-pattern-element --> pattern


.. _Patterns_EnumeratorPattern:

Enumerator Pattern
------------------

An enumerator pattern matches an enumerator declared in an enumeration.

.. langref-grammar

    pattern-enum-element ::= type-identifier? '.' identifier pattern-tuple?

.. syntax-grammar::

    Grammar of an enumerator pattern

    enumerator-pattern --> type-identifier-OPT ``.`` identifier tuple-pattern-OPT


.. _Patterns_TypeCastingPattern:

Type Casting Pattern
--------------------

.. langref-grammar

    pattern-is ::= 'is' type
    pattern-as ::= pattern 'as' type

.. syntax-grammar::

    Grammar of a type casting pattern

    type-casting-pattern --> is-pattern | as-pattern
    is-pattern --> ``is`` type
    as-pattern --> pattern ``as`` type



.. _Patterns_ExpressionPattern:

Expression Pattern
------------------


.. syntax-grammar::

    Grammar of an expression pattern

    expression-pattern --> expression
