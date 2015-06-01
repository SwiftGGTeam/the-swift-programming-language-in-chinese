Patterns
========

A :newTerm:`pattern` represents the structure of a single value
or a composite value.
For example, the structure of a tuple ``(1, 2)`` is a comma-separated list of two
elements. Because patterns represent the structure of a value rather than any
one particular value, you can match them with a variety of values.
For instance, the pattern ``(x, y)`` matches the tuple ``(1, 2)`` and any other
two-element tuple. In addition to matching a pattern with a value,
you can extract part or all of a composite value and bind each part
to a constant or variable name.

In Swift, patterns occur in variable and constant declarations (on their left-hand side),
in ``for``-``in`` statements, and in ``switch`` statements (in their case labels).
Although any pattern can occur in the case labels of a ``switch`` statement,
in the other contexts,
only wildcard patterns, identifier patterns, and patterns containing those two
patterns can occur.

You can specify a type annotation for a wildcard pattern, an identifier pattern,
and a tuple pattern to constrain the pattern to match only values of a certain type.

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
    pattern --> value-binding-pattern
    pattern --> tuple-pattern type-annotation-OPT
    pattern --> enum-case-pattern
    pattern --> optional-pattern
    pattern --> type-casting-pattern
    pattern --> expression-pattern


.. _Patterns_WildcardPattern:

Wildcard Pattern
----------------

A :newTerm:`wildcard pattern` matches and ignores any value and consists of an underscore
(``_``). Use a wildcard pattern when you don't care about the values being
matched against. For example, the following code iterates through the closed range ``1...3``,
ignoring the current value of the range on each iteration of the loop:

.. testcode:: wildcard-pattern

    -> for _ in 1...3 {
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
that matches the value ``42`` of type ``Int``:

.. testcode:: identifier-pattern

    -> let someValue = 42
    << // someValue : Int = 42

When the match succeeds, the value ``42`` is bound (assigned)
to the constant name ``someValue``.

When the pattern on the left-hand side of a variable or constant declaration
is an identifier pattern,
the identifier pattern is implicitly a subpattern of a value-binding pattern.


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

.. testcode:: value-binding-pattern

    -> let point = (3, 2)
    << // point : (Int, Int) = (3, 2)
    -> switch point {
          // Bind x and y to the elements of point.
          case let (x, y):
             print("The point is at (\(x), \(y)).")
       }
    <- The point is at (3, 2).

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
by using type annotations.
For example, the tuple pattern ``(x, y): (Int, Int)`` in the constant declaration
``let (x, y): (Int, Int) = (1, 2)`` matches only tuple types in which
both elements are of type ``Int``. To constrain only some elements of a tuple pattern,
provide type annotations directly to those individual elements. For example, the tuple
pattern in ``let (x: String, y)`` matches any two-element tuple type, as long as the first
element is of type ``String``.

When a tuple pattern is used as the pattern in a ``for``-``in`` statement
or in a variable or constant declaration, it can contain only wildcard patterns,
identifier patterns, or other tuple patterns that contain those. For example, the
following code isn't valid because the element ``0`` in the tuple pattern ``(x, 0)`` is
an expression pattern:

.. testcode:: tuple-pattern

    -> let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
    << // points : [(Int, Int)] = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
    -> // This code isn't valid.
    -> for (x, 0) in points {
          /* ... */
       }
    !! <REPL Input>:1:9: error: expected pattern
    !! for (x, 0) in points {
    !! ^
    !! <REPL Input>:1:9: error: expected ',' separator
    !! for (x, 0) in points {
    !! ^
    !! ,

The parentheses around a tuple pattern that contains a single element have no effect.
The pattern matches values of that single element's type. For example, the following are
equivalent:

.. This test needs to be compiled.
   The error message in the REPL is unpredictable as of
   Swift version 1.1 (swift-600.0.54.20)

.. testcode:: single-element-tuple-pattern
   :compile: true

   -> let a = 2        // a: Int = 2
   -> let (a) = 2      // a: Int = 2
   -> let (a): Int = 2 // a: Int = 2
   !! /tmp/swifttest.swift:2:6: error: invalid redeclaration of 'a'
   !! let (a) = 2      // a: Int = 2
   !! ^
   !! /tmp/swifttest.swift:1:5: note: 'a' previously declared here
   !! let a = 2        // a: Int = 2
   !! ^
   !! /tmp/swifttest.swift:3:6: error: invalid redeclaration of 'a'
   !! let (a): Int = 2 // a: Int = 2
   !! ^
   !! /tmp/swifttest.swift:1:5: note: 'a' previously declared here
   !! let a = 2        // a: Int = 2
   !! ^

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


.. _Patterns_EnumerationCasePattern:

Enumeration Case Pattern
------------------------

An :newTerm:`enumeration case pattern` matches a case of an existing enumeration type.
Enumeration case patterns appear in ``switch`` statement
case labels and in the case conditions of ``if``, ``while``, ``guard``, and ``for``-``in``
statements.

If the enumeration case you're trying to match has any associated values,
the corresponding enumeration case pattern must specify a tuple pattern that contains
one element for each associated value. For an example that uses a ``switch`` statement
to match enumeration cases containing associated values,
see :ref:`Enumerations_AssociatedValues`.

.. langref-grammar

    pattern-enum-element ::= type-identifier? '.' identifier pattern-tuple?

.. syntax-grammar::

    Grammar of an enumeration case pattern

    enum-case-pattern --> type-identifier-OPT ``.`` enum-case-name tuple-pattern-OPT


.. _Patterns_OptionalPattern:

Optional Pattern
----------------

An :newTerm:`optional pattern` matches values wrapped in a ``.Some(T)`` case
of an ``Optional<T>`` or ``ImplicitlyUnwrappedOptional<T>`` enumeration.
Optional patterns consist of an identifier pattern followed immediately by a questions mark
and appear in the same places as enumeration case patterns.

Because optional patterns are syntactic sugar for ``Optional``
and ``ImplicitlyUnwrappedOptional`` enumeration case patterns,
the following are equivalent:

.. testcode:: optional-pattern

   -> let someOptional: Int? = 42
   << // someOptional : Int? = Optional(42)
   -> // Match using an enumeration case pattern
   -> if case .Some(let x) = someOptional {
         print(x)
      }
   ---
   -> // Match using an optional pattern
   -> if case x? = someOptional {
         print(x)
      }

The optional pattern provides a convenient way to
iterate over an array of optional values in a ``for``-``in`` statement,
executing the body of the loop only for non-``nil`` elements.

.. testcode:: optional-pattern-for-in

   -> let arrayOfOptionalInts: [Int?] = [nil, 2, 3, nil, 5]
   << // arrayOfOptionalInts : [Int?] = [nil, Optional(2), Optional(3), nil, Optional(5)]
   -> // Match only non-nil values
   -> for case let number? in arrayOfOptionalInts {
         print("Found a \(number)")
      }
   </ Found a 2
   </ Found a 3
   </ Found a 5

.. syntax-grammar::

    Grammar of an optional pattern

    optional-pattern --> identifier-pattern ``?``


.. _Patterns_Type-CastingPatterns:

Type-Casting Patterns
---------------------

There are two type-casting patterns, the ``is`` pattern and the ``as`` pattern.
Both type-casting patterns appear only in ``switch`` statement
case labels. The ``is`` and ``as`` patterns have the following form:

.. syntax-outline::

    is <#type#>
    <#pattern#> as <#type#>

The ``is`` pattern matches a value if the type of that value at runtime is the same as
the type specified in the right-hand side of the ``is`` pattern---or a subclass of that type.
The ``is`` pattern behaves like the ``is`` operator in that they both perform a type cast
but discard the returned type.

The ``as`` pattern matches a value if the type of that value at runtime is the same as
the type specified in the right-hand side of the ``as`` pattern---or a subclass of that type.
If the match succeeds,
the type of the matched value is cast to the *pattern* specified in the left-hand side
of the ``as`` pattern.

For an example that uses a ``switch`` statement
to match values with ``is`` and ``as`` patterns,
see :ref:`TypeCasting_TypeCastingForAnyAndAnyObject`.

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

An :newTerm:`expression pattern` represents the value of an expression.
Expression patterns appear only in ``switch`` statement
case labels.

The expression represented by the expression pattern
is compared with the value of an input expression
using the Swift standard library ``~=`` operator.
The matches succeeds
if the ``~=`` operator returns ``true``. By default, the ``~=`` operator compares
two values of the same type using the ``==`` operator. It can also match an integer
value with a range of integers in an ``Range`` object, as the following example shows:

.. testcode:: expression-pattern

    -> let point = (1, 2)
    << // point : (Int, Int) = (1, 2)
    -> switch point {
          case (0, 0):
             print("(0, 0) is at the origin.")
          case (-2...2, -2...2):
             print("(\(point.0), \(point.1)) is near the origin.")
          default:
             print("The point is at (\(point.0), \(point.1)).")
       }
    <- (1, 2) is near the origin.

You can overload the ``~=`` operator to provide custom expression matching behavior.
For example, you can rewrite the above example to compare the ``point`` expression
with a string representations of points.

.. testcode:: expression-pattern

    -> // Overload the ~= operator to match a string with an integer
    -> func ~=(pattern: String, value: Int) -> Bool {
          return pattern == "\(value)"
       }
    -> switch point {
          case ("0", "0"):
             print("(0, 0) is at the origin.")
          default:
             print("The point is at (\(point.0), \(point.1)).")
       }
    <- The point is at (1, 2).


.. syntax-grammar::

    Grammar of an expression pattern

    expression-pattern --> expression
