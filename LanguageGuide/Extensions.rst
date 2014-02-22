.. docnote:: Subjects to be covered in this section

    * Extending classes and structures
    * Start by extending an existing thing to have something it didn't
    * Continue by extending String to have an initializer for something it doesn't by default
    * Making a type ``Printable`` / nicely ``DebugPrintable`` (inc. guidelines for format)
    * Extensions can extend existing types to add protocol conformance

Extensions
==========

:newTerm:`Extensions` are a way to add new functionality to an existing
class, structure or enumeration,
even if you do not have access to the source code for the existing type.
Extensions are similar to Objective-C categories, but have many more capabilities.

Extensions can:

* add computed properties and computed type properties
* define instance methods and type methods
* provide new initializers
* implement subscripting
* define and use new embedded types

In addition, extensions can use these capabilities to
make an existing type conform to a protocol.
This process is covered in the :doc:`Protocols` chapter.

.. QUESTION: I've put operator conformance in the Classes and Structures chapter,
   rather than this chapter, because it isn't actually implemented via an extension
   (at least, not right now). Is this the right choice?
   Moving it to here could be a way to rebalance the chapters a little…

.. QUESTION: What are the rules for overloading via extensions?

Computed Properties
-------------------

Extensions can add new :ref:`computed properties <ClassesAndStructures_ComputedProperties>`
to existing types.
This example adds five new computed properties to Swift's built-in ``Double`` type,
to provide basic support for working with distance units:

.. testcode:: extensionsComputedProperties

    (swift) extension Double {
        var km: Double { return self * 1_000.00 }
        var m: Double { return self }
        var cm: Double { return self / 100.00 }
        var mm: Double { return self / 1_000.00 }
        var ft: Double { return self / 3.28084 }
    }
    (swift) var oneInch = 25.4.mm
    // oneInch : Double = 0.0254
    (swift) println("One inch is \(oneInch) meters")
    >>> One inch is 0.0254 meters
    (swift) var threeFeet = 3.ft
    // threeFeet : Double = 0.9144
    (swift) println("Three feet is \(threeFeet) meters")
    >>> Three feet is 0.9144 meters

These computed properties give a way to express that a ``Double`` value
should be considered as a certain unit of length.
Although they are implemented as computed properties,
they can be accessed via dot syntax,
which gives a neat way to append them onto a number to perform distance conversions.

In this example, a ``Double`` value of ``1.0`` is considered to represent ‘one meter’.
This is why the ``m`` computed property returns ``self`` –
the expression ``1.m`` is considered to calculate a ``Double`` value of ``1.0``.

Other units require some conversion to be expressed as a value measured in meters.
One kilometer is the same as 1,000 meters,
so the ``km`` computed property multiplies the value by ``1_000.00``
to convert into a number expressed in meters.
Similarly, there are 3.28024 feet in a meter,
and so the ``ft`` computed property divides the underlying ``Double`` value
by ``3.28024``, to convert it from feet to meters.

These computed properties are read-only,
and so they have been expressed in
:ref:`shorthand syntax <ClassesAndStructures_ShorthandGetterAndSetterDeclarations>` for brevity.
Their return value is inferred to be of type ``Double``,
and can be used within mathematical calculations wherever a ``Double`` is accepted:

.. testcode:: extensionsComputedProperties

    (swift) var aMarathon = 42.km + 195.m
    // aMarathon : Double = 42195.0
    (swift) println("A marathon is \(aMarathon) meters long")
    >>> A marathon is 42195.0 meters long

.. note::

    Extensions can add new computed properties,
    but they cannot add :ref:`stored properties <ClassesAndStructures_StoredProperties>`,
    or add :ref:`stored property observers <ClassesAndStructures_StoredPropertyObservers>`
    to existing stored properties.

Initializers
------------

Extensions can add new :ref:`initializers <ClassesAndStructures_Initializers>` to existing types.
This enables you to extend other types to accept
your own custom types as initializer parameters.

.. note::

    Extensions can add new initializers to classes, but they cannot add
    a :ref:`destructor <ClassesAndStructures_Destructors>`.
    Destructors must always be provided by the original class implementation.

This approach can be used to extend the basic ``String`` type
to accept an instance of your own custom type as an initializer parameter,
for use with string interpolation.

.. TODO: make this reference to string interpolation be a link to
   the appropriate section of the Strings and Characters section once it is written.

.. testcode:: extensionsInitializers

    (swift) struct Point {
        var x = 0.0, y = 0.0
    }
    (swift) extension String {
        init(point: Point) {
            self = "(\(point.x), \(point.y))"
        }
    }
    (swift) val somePoint = Point(3.0, 5.0)
    // somePoint : Point = Point(3.0, 5.0)
    (swift) val pointDescription = String(somePoint)
    // pointDescription : String = "(3.0, 5.0)"

This example defines a new structure called ``Point`` to represent an ``(x, y)`` co-ordinate.
It also extends ``String`` to add a new initializer implementation,
which accepts a single ``Point`` instance as an initialization parameter.
The initializer's implementation creates a string containing the two point values
expressed within parentheses with a comma and a space between them –
which in this case gives a string value of ``"(3.0, 5.0)"``.

The new initializer can now be used to construct a ``String`` using initializer syntax
by passing in a point, such as with ``String(somePoint)`` above.

Now that a ``String`` can be initialized with a ``Point``,
you can use ``Point`` instances within string interpolation syntax
to incorporate their values as part of a longer string:

.. testcode:: extensionsInitializers

    (swift) val anotherPoint = Point(-2.0, 6.0)
    // anotherPoint : Point = Point(-2.0, 6.0)
    (swift) println("anotherPoint's value is \(anotherPoint)")
    >>> anotherPoint's value is (-2.0, 6.0)

Whenever string interpolation discovers an instance in the string,
it checks to see if ``String`` has an initializer that accepts instances of that type.
In this case, it successfully finds a ``String`` initializer that accepts ``Point`` instances;
creates a new ``String`` using the initializer;
and inserts this new string into the interpolated string.
(Defining multiple initializers,
and choosing which one to use based on the type of parameter passed to the initializer,
is known as :newTerm:`initializer overloading`.)

.. note::

    If you provide a new initializer via an extension,
    you are still responsible for making sure that each instance is fully initialized
    once the initializer has completed, as described in
    :ref:`ClassesAndStructures_DefiniteInitialization`.
    Depending on the type you are extending, you may need to
    :ref:`delegate to another initializer <ClassesAndStructures_InitializerDelegation>` or
    :ref:`call a superclass initializer <ClassesAndStructures_SubclassingAndInitializerDelegation>`
    at the end of your own initializer,
    to ensure that all instance properties are fully initialized.

.. QUESTION: You can use 'self' in this way for structs and enums.
   How might you do this kind of construction for a class?
    
Instance Methods
----------------

Extensions can add new :ref:`instance methods <ClassesAndStructures_InstanceMethods>`
to an existing type:

.. testcode:: extensionsInstanceMethods

    (swift) extension String {
        func toSpooky() -> String {
            var i = 0
            var spookyVersion = ""
            for scalar in self.chars {
                spookyVersion += i % 2 == 0 ? scalar.uppercase : scalar.lowercase
                ++i
            }
            return spookyVersion
        }
    }

This example adds a new ``String`` instance method called ``toSpooky()``.
This new method is now available to any instances of ``String``.
The method returns a spookier version of the original string,
by converting odd-numbered characters to uppercase,
and even-numbered characters to lowercase:

.. testcode:: extensionsInstanceMethods

    (swift) val notVerySpooky = "woooooooooooo, i am a ghost!"
    // notVerySpooky : String = "woooooooooooo, i am a ghost!"
    (swift) val considerablyMoreSpooky = notVerySpooky.toSpooky()
    // considerablyMoreSpooky : String = "WoOoOoOoOoOoO, i aM A GhOsT!"

Instance methods added via an extension can also modify the instance itself:

.. testcode:: extensionsInstanceMethods

    (swift) extension Int {
        mutating func shiftRight(numberOfDecimalPlaces: Int) {
            for _ in 0...numberOfDecimalPlaces {
                self /= 10
            }
        }
    }
    (swift) var someInt = 123_456
    // someInt : Int = 123456
    (swift) someInt.shiftRight(3)
    (swift) println("someInt is now \(someInt)")
    >>> someInt is now 123

Type Methods
------------

Computed Type Properties
------------------------

Subscripting
------------

Extensions can add new forms of :ref:`subscripting <ClassesAndStructures_Subscripting>`
to an existing type.
This example adds an integer subscript operator to Swift's built-in ``Int`` type.
This subscript operator ``[n]`` returns the decimal digit ``n`` places in
from the right of the number,
so:

* ``123456789[0]`` returns ``9``
* ``123456789[1]`` returns ``8``

…and so on:

.. testcode:: extensionsSubscripting

    (swift) extension Int {
        subscript(digitIndex: Int) -> Int {
            var decimalBase = 1
            for _ in 0...digitIndex {
                decimalBase *= 10
            }
            return (self / decimalBase) % 10
        }
    }
    (swift) 123456789[0]
    // r0 : Int = 9
    (swift) 123456789[1]
    // r1 : Int = 8
    (swift) 123456789[2]
    // r2 : Int = 7
    (swift) 123456789[8]
    // r3 : Int = 1
    (swift) 123456789[9]
    // r4 : Int = 0

Embedded Types
--------------

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#extensions
