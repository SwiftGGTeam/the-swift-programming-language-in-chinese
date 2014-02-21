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

Extensions can add:

* computed properties
* initializers
* instance methods
* type methods
* computed type properties
* subscripting, and
* embedded types

In addition, extensions can use the capabilities listed above to
make an existing type conform to a protocol.
This process is covered in the :doc:`Protocols` chapter.

.. QUESTION: I've put operator conformance in the Classes and Structures chapter,
   rather than this chapter, because it isn't actually implemented via an extension
   (at least, not right now). Is this the right choice?
   Moving it to here could be a way to rebalance the chapters a little…

.. QUESTION: What are the rules for overloading via extensions?

Computed Properties
-------------------

Extensions can add new computed properties to existing types.
This example adds five new computed properties to Swift's built-in ``Double`` type,
to provide basic support for working with distance units:

.. testcode:: extendingComputedProperties

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
    (swift) var aMarathon = 42.km + 195.m
    // aMarathon : Double = 42195.0
    (swift) println("A marathon is \(aMarathon) meters long")
    >>> A marathon is 42195.0 meters long

.. …but not stored properties
.. …and you can't add observers to an existing property of any type

Initializers
------------

Extensions can be used to add new initializers to existing types.
This enables you to extend the basic ``String`` type
to be constructable with an instance of your own custom types,
for use with string interpolation:

.. TODO: make this reference to string interpolation be a link to
   the appropriate section of the Strings and Characters section once it is written.

.. testcode:: extendingComputedProperties

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
    (swift) println("The point is at \(somePoint)")
    >>> The point's description is (3.0, 5.0)
    

.. construct a String with your own type for easy string interpolation

Instance Methods
----------------

Type Methods
------------

Computed Type Properties
------------------------

Subscripting
------------

Extensions can add new forms of subscripting to an existing type.
This example adds an integer subscript operator to Swift's built-in ``Int`` type.
This subscript operator ``[n]`` returns the decimal digit ``n`` places in
from the right of the number,
so ``123456789[0]`` returns ``9``, whereas ``123456789[1]`` returns ``8``, and so on:

.. testcode:: extendingComputedProperties

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
