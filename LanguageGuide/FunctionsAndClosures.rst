.. docnote:: Subjects to be covered in this section

    * Functions
    * Function signatures (including pattern matching)
    * init() functions for enums
    * Naming conventions
    * Closures
    * Trailing closures
    * Can only have one variadic parameter
    * Nested closures
    * Capturing values
    * Different closure expression forms
    * Anonymous closure arguments
    * Thick and thin functions (?)
    * Attributes (infix, resilience, inout, auto_closure, noreturn)
    * Typedefs for closure signatures to aid readability?
    * Metatypes and static functions on types

Functions and Closures
======================

Enumerations
------------

Default Enumeration Values
~~~~~~~~~~~~~~~~~~~~~~~~~~

It can sometimes be useful for new instances of an enumeration type to come initialized with a default value. This can be achieved by providing an *initializer function* as part of the enumeration definition:

.. testcode:: enums

    (swift) enum TextAlignment {
                case Left
                case Center
                case Right
                init() {
                    self = .Left
                }
            }
    (swift) var defaultAlignment = TextAlignment()
    // defaultAlignment : TextAlignment = <unprintable value>
    (swift) switch defaultAlignment {
                case .Left:
                    println("Left-aligned")
                default:
                    println("Some other alignment")
            }
    >>> Left-aligned

In the example above, the ``TextAlignment`` enumeration defines an initializer function, ``init()``, which sets the initial value of all new ``TextAlignment`` instances to ``TextAlignment.Left``. Note that the special keyword ``self`` is used to represent the new enumeration instance as it is being created.

Note also that the declaration of ``defaultAlignment`` is set to an initial value of ``TextAlignment()``. This syntax – the enumeration type followed by empty parentheses ``()`` – means “a new instance of ``TextAlignment`` that has been initialized by calling its ``init()`` function”.

``init()`` is a special function that *any* type can include in its definition to set initial values when new instances of that type are created. ``init()`` is covered in more detail in :doc:`ClassesObjectsAndStructs`.

.. QUESTION: are initializers something we want to introduce at this point?
.. QUESTION: do we want to encourage people to create enums with default values initialized in this way?
.. TODO: come up with a better example where a default value would be more expected and more of a standardized default (such as GMT for timezones)
.. TODO: Introduce functions at this point (if we have not already done so).

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#functions
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#closures
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#functions-vs-closures
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#nested-functions
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#closure-expressions
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#trailing-closures
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#functions
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#closures
    * https://[Internal Staging Server]/docs/Expressions.html
