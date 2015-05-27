Extensions
==========

:newTerm:`Extensions` add new functionality to an existing
class, structure, or enumeration type.
This includes the ability to extend types
for which you do not have access to the original source code
(known as :newTerm:`retroactive modeling`).
Extensions are similar to categories in Objective-C.
(Unlike Objective-C categories, Swift extensions do not have names.)

Extensions in Swift can:

* Add computed properties and computed type properties
* Define instance methods and type methods
* Provide new initializers
* Define subscripts
* Define and use new nested types
* Make an existing type conform to a protocol

.. note::

   Extensions can add new functionality to a type,
   but they cannot override existing functionality.

.. assertion:: extensionsCannotOverrideExistingBehavior
   :compile: true

   -> class C {
         var x = 0
         func foo() {}
      }
   -> extension C {
         override var x: Int {
            didSet {
               println("new x is \(x)")
            }
         }
         override func foo() {
            println("called overridden foo")
         }
      }
   !! /tmp/swifttest.swift:6:17: error: property does not override any property from its superclass
   !! override var x: Int {
   !! ~~~~~~~~     ^
   !! /tmp/swifttest.swift:6:17: error: invalid redeclaration of 'x'
   !! override var x: Int {
   !! ^
   !! /tmp/swifttest.swift:2:8: note: 'x' previously declared here
   !! var x = 0
   !! ^
   !! /tmp/swifttest.swift:11:18: error: method does not override any method from its superclass
   !! override func foo() {
   !! ~~~~~~~~      ^
   !! /tmp/swifttest.swift:11:18: error: invalid redeclaration of 'foo()'
   !! override func foo() {
   !! ^
   !! /tmp/swifttest.swift:3:9: note: 'foo()' previously declared here
   !! func foo() {}
   !! ^

.. QUESTION: What are the rules for overloading via extensions?

.. TODO: Talk about extending enumerations to have additional member values

Extension Syntax
----------------

Declare extensions with the ``extension`` keyword:

.. testcode:: extensionSyntax

   >> struct SomeType {}
   -> extension SomeType {
         // new functionality to add to SomeType goes here
      }

An extension can extend an existing type to make it adopt one or more protocols.
Where this is the case,
the protocol names are written in exactly the same way as for a class or structure:

.. testcode:: extensionSyntax

   >> protocol SomeProtocol {}
   >> protocol AnotherProtocol {}
   -> extension SomeType: SomeProtocol, AnotherProtocol {
         // implementation of protocol requirements goes here
      }

Adding protocol conformance in this way is described in
:ref:`Protocols_AddingProtocolConformanceWithAnExtension`.

.. note::

   If you define an extension to add new functionality to an existing type,
   the new functionality will be available on all existing instances of that type,
   even if they were created before the extension was defined.

.. _Extensions_ComputedProperties:

Computed Properties
-------------------

Extensions can add computed instance properties and computed type properties to existing types.
This example adds five computed instance properties to Swift's built-in ``Double`` type,
to provide basic support for working with distance units:

.. testcode:: extensionsComputedProperties

   -> extension Double {
         var km: Double { return self * 1_000.0 }
         var m: Double { return self }
         var cm: Double { return self / 100.0 }
         var mm: Double { return self / 1_000.0 }
         var ft: Double { return self / 3.28084 }
      }
   -> let oneInch = 25.4.mm
   << // oneInch : Double = 0.0254
   -> println("One inch is \(oneInch) meters")
   <- One inch is 0.0254 meters
   -> let threeFeet = 3.ft
   << // threeFeet : Double = 0.914399970739201
   -> println("Three feet is \(threeFeet) meters")
   <- Three feet is 0.914399970739201 meters

These computed properties express that a ``Double`` value
should be considered as a certain unit of length.
Although they are implemented as computed properties,
the names of these properties can be appended to
a floating-point literal value with dot syntax,
as a way to use that literal value to perform distance conversions.

In this example, a ``Double`` value of ``1.0`` is considered to represent “one meter”.
This is why the ``m`` computed property returns ``self`` ---
the expression ``1.m`` is considered to calculate a ``Double`` value of ``1.0``.

Other units require some conversion to be expressed as a value measured in meters.
One kilometer is the same as 1,000 meters,
so the ``km`` computed property multiplies the value by ``1_000.00``
to convert into a number expressed in meters.
Similarly, there are 3.28024 feet in a meter,
and so the ``ft`` computed property divides the underlying ``Double`` value
by ``3.28024``, to convert it from feet to meters.

These properties are read-only computed properties,
and so they are expressed without the ``get`` keyword, for brevity.
Their return value is of type ``Double``,
and can be used within mathematical calculations wherever a ``Double`` is accepted:

.. testcode:: extensionsComputedProperties

   -> let aMarathon = 42.km + 195.m
   << // aMarathon : Double = 42195.0
   -> println("A marathon is \(aMarathon) meters long")
   <- A marathon is 42195.0 meters long

.. note::

   Extensions can add new computed properties, but they cannot add stored properties,
   or add property observers to existing properties.

.. assertion:: extensionsCannotAddStoredProperties
   :compile: true

   -> class C {}
   -> extension C { var x = 0 }
   !! /tmp/swifttest.swift:2:19: error: extensions may not contain stored properties
   !! extension C { var x = 0 }
   !!                   ^

.. TODO: change this example to something more advisable / less contentious.

.. _Extensions_Initializers:

Initializers
------------

Extensions can add new initializers to existing types.
This enables you to extend other types to accept
your own custom types as initializer parameters,
or to provide additional initialization options
that were not included as part of the type's original implementation.

Extensions can add new convenience initializers to a class,
but they cannot add new designated initializers or deinitializers to a class.
Designated initializers and deinitializers
must always be provided by the original class implementation.

.. note::

   If you use an extension to add an initializer to a value type that provides
   default values for all of its stored properties
   and does not define any custom initializers,
   you can call the default initializer and memberwise initializer for that value type
   from within your extension's initializer.

   This would not be the case if you had written the initializer
   as part of the value type's original implementation,
   as described in :ref:`Initialization_InitializerDelegationForValueTypes`.

The example below defines a custom ``Rect`` structure to represent a geometric rectangle.
The example also defines two supporting structures called ``Size`` and ``Point``,
both of which provide default values of ``0.0`` for all of their properties:

.. testcode:: extensionsInitializers

   -> struct Size {
         var width = 0.0, height = 0.0
      }
   -> struct Point {
         var x = 0.0, y = 0.0
      }
   -> struct Rect {
         var origin = Point()
         var size = Size()
      }

Because the ``Rect`` structure provides default values for all of its properties,
it receives a default initializer and a memberwise initializer automatically,
as described in :ref:`Initialization_DefaultInitializers`.
These initializers can be used to create new ``Rect`` instances:

.. testcode:: extensionsInitializers

   -> let defaultRect = Rect()
   << // defaultRect : Rect = REPL.Rect
   -> let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
         size: Size(width: 5.0, height: 5.0))
   << // memberwiseRect : Rect = REPL.Rect

You can extend the ``Rect`` structure to provide an additional initializer
that takes a specific center point and size:

.. testcode:: extensionsInitializers

   -> extension Rect {
         init(center: Point, size: Size) {
            let originX = center.x - (size.width / 2)
            let originY = center.y - (size.height / 2)
            self.init(origin: Point(x: originX, y: originY), size: size)
         }
      }

This new initializer starts by calculating an appropriate origin point based on
the provided ``center`` point and ``size`` value.
The initializer then calls the structure's automatic memberwise initializer
``init(origin:size:)``, which stores the new origin and size values
in the appropriate properties:

.. testcode:: extensionsInitializers

   -> let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
         size: Size(width: 3.0, height: 3.0))
   << // centerRect : Rect = REPL.Rect
   /> centerRect's origin is (\(centerRect.origin.x), \(centerRect.origin.y)) and its size is (\(centerRect.size.width), \(centerRect.size.height))
   </ centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)

.. note::

   If you provide a new initializer with an extension,
   you are still responsible for making sure that each instance is fully initialized
   once the initializer completes.

.. _Extensions_Methods:

Methods
-------

Extensions can add new instance methods and type methods to existing types.
The following example adds a new instance method called ``repetitions`` to the ``Int`` type:

.. testcode:: extensionsInstanceMethods

   -> extension Int {
         func repetitions(task: () -> ()) {
            for _ in 0..<self {
               task()
            }
         }
      }

The ``repetitions(_:)`` method takes a single argument of type ``() -> ()``,
which indicates a function that has no parameters and does not return a value.

After defining this extension,
you can call the ``repetitions(_:)`` method on any integer number
to perform a task that many number of times:

.. testcode:: extensionsInstanceMethods

   -> 3.repetitions({
         println("Hello!")
      })
   </ Hello!
   </ Hello!
   </ Hello!

Use trailing closure syntax to make the call more succinct:

.. testcode:: extensionsInstanceMethods

   -> 3.repetitions {
         println("Goodbye!")
      }
   </ Goodbye!
   </ Goodbye!
   </ Goodbye!

.. _Extensions_MutatingInstanceMethods:

Mutating Instance Methods
~~~~~~~~~~~~~~~~~~~~~~~~~

Instance methods added with an extension can also modify (or *mutate*) the instance itself.
Structure and enumeration methods that modify ``self`` or its properties
must mark the instance method as ``mutating``,
just like mutating methods from an original implementation.

The example below adds a new mutating method called ``square`` to Swift's ``Int`` type,
which squares the original value:

.. testcode:: extensionsInstanceMethods

   -> extension Int {
         mutating func square() {
            self = self * self
         }
      }
   -> var someInt = 3
   << // someInt : Int = 3
   -> someInt.square()
   /> someInt is now \(someInt)
   </ someInt is now 9

.. _Extensions_Subscripts:

Subscripts
----------

Extensions can add new subscripts to an existing type.
This example adds an integer subscript to Swift's built-in ``Int`` type.
This subscript ``[n]`` returns the decimal digit ``n`` places in
from the right of the number:

* ``123456789[0]`` returns ``9``
* ``123456789[1]`` returns ``8``

…and so on:

.. testcode:: extensionsSubscripts

   -> extension Int {
         subscript(var digitIndex: Int) -> Int {
            var decimalBase = 1
            while digitIndex > 0 {
               decimalBase *= 10
               --digitIndex
            }
            return (self / decimalBase) % 10
         }
      }
   -> 746381295[0]
   << // r0 : Int = 5
   /> returns \(r0)
   </ returns 5
   -> 746381295[1]
   << // r1 : Int = 9
   /> returns \(r1)
   </ returns 9
   -> 746381295[2]
   << // r2 : Int = 2
   /> returns \(r2)
   </ returns 2
   -> 746381295[8]
   << // r3 : Int = 7
   /> returns \(r3)
   </ returns 7

If the ``Int`` value does not have enough digits for the requested index,
the subscript implementation returns ``0``,
as if the number had been padded with zeroes to the left:

.. testcode:: extensionsSubscripts

   -> 746381295[9]
   << // r4 : Int = 0
   /> returns \(r4), as if you had requested:
   </ returns 0, as if you had requested:
   -> 0746381295[9]
   << // r5 : Int = 0

.. TODO: provide an explanation of this example

.. _Extensions_NestedTypes:

Nested Types
------------

Extensions can add new nested types to existing classes, structures and enumerations:

.. testcode:: extensionsNestedTypes

   -> extension Int {
         enum Kind {
            case Negative, Zero, Positive
         }
         var kind: Kind {
            switch self {
               case 0:
                  return .Zero
               case let x where x > 0:
                  return .Positive
               default:
                  return .Negative
            }
         }
      }

This example adds a new nested enumeration to ``Int``.
This enumeration, called ``Kind``,
expresses the kind of number that a particular integer represents.
Specifically, it expresses whether the number is
negative, zero, or positive.

This example also adds a new computed instance property to ``Int``,
called ``kind``,
which returns the appropriate ``Kind`` enumeration member for that integer.

The nested enumeration can now be used with any ``Int`` value:

.. testcode:: extensionsNestedTypes

   -> func printIntegerKinds(numbers: [Int]) {
         for number in numbers {
            switch number.kind {
               case .Negative:
                  print("- ")
               case .Zero:
                  print("0 ")
               case .Positive:
                  print("+ ")
            }
         }
         print("\n")
      }
   -> printIntegerKinds([3, 19, -27, 0, -6, 0, 7])
   <- + + - 0 - 0 +

This function, ``printIntegerKinds``,
takes an input array of ``Int`` values and iterates over those values in turn.
For each integer in the array,
the function considers the ``kind`` computed property for that integer,
and prints an appropriate description.

.. note::

   ``number.kind`` is already known to be of type ``Int.Kind``.
   Because of this, all of the ``Int.Kind`` member values
   can be written in shorthand form inside the ``switch`` statement,
   such as ``.Negative`` rather than ``Int.Kind.Negative``.

.. _Extensions_ProtocolExtensions:

Protocol Extensions
-------------------

Protocols can be extended to provide “default implementations” for methods and properties
to conforming types.
This allows you to define behavior on protocols themselves,
rather than in each type's individual conformance or a global function.

In the example below,
the ``Positioned`` protocol defines a ``coordinates`` property,
which returns a tuple containing latitude and longitude coordinates.
The ``Place`` structure adopts to the ``Positioned`` protocol,
defining a ``name`` property
in addition to the ``coordinates`` property required to conform to ``Positioned``.

.. testcode:: protocolExtension

   -> typealias Coordinates = (latitude: Double, longitude: Double)
   -> protocol Positioned {
         var coordinates: Coordinates { get }
      }
   ---
   -> struct Place: Positioned {
         let name: String
         let coordinates: Coordinates
      }

Given two sets of coordinates,
you can use the haversine formula
to calculate the great-circle distances between those two locations.
By creating an extension on the ``Positioned`` protocol
that implements the ``haversineDistanceTo(_:)`` method,
all conforming types automatically gain this method implementation.

.. testcode:: protocolExtension

   >> import Darwin
   -> extension Positioned {
          func haversineDistanceTo(destination: Positioned) -> Double {
               func deg2rad(deg: Double) -> Double {
                   return deg * M_PI / 180
               }

               let R = 6372.8 // approximation of the radius of Earth (in km)

               let (φ1, λ1) = (deg2rad(self.coordinates.latitude), deg2rad(self.coordinates.longitude))
               let (φ2, λ2) = (deg2rad(destination.coordinates.latitude), deg2rad(destination.coordinates.longitude))

               let 𝛥φ = φ1 - φ2
               let 𝛥λ = λ1 - λ2
               let a = sin(𝛥φ / 2) * sin(𝛥φ / 2) +
                       sin(𝛥λ / 2) * sin(𝛥λ / 2) * cos(φ2) * cos(φ1)
               let c = 2 * asin(sqrt(a))

               return c * R
           }
      }
   ---
   -> let mavericks = Place(name: "Maverick's Beach", coordinates: (latitude: 37.492673, longitude: -122.499522))
   -> let yosemite = Place(name: "Yosemite National Park", coordinates: (latitude: 37.85, longitude: -119.567777778))
   -> mavericks.haversineDistanceTo(yosemite)
   // 260 km

.. TODO: Show distance calculation between Person and Place?

Constrained Protocol Extensions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocol extensions can optionally be generically constrained,
such that any methods or properties implemented
will only be available to types that satisfy particular requirements.
If a type satisfies the requirements for multiple constrained extensions
that provide implementations for the same method or property,
Swift will use the implementation corresponding the most specialized constraints.

Constraints for a protocol extension are specified using a ``where`` clause,
as described in :ref:`_Generics_WhereClauses`.

For instance, the ``SequenceType`` protocol can be extended
with a constraint on its associated ``Generator`` type's
associated ``Element`` type,
such that the values in the sequence must conform to
the ``Positioned`` protocol from the example above.

.. testcode:: protocolExtension

   -> extension SequenceType where Generator.Element: Positioned {
          var cumulativeDistance: Double {
              var distance = 0.0
              if case let elements = [Generator.Element](self)
                 where elements.count >= 2
              {
                  for (destination, origin) in zip(elements, dropFirst(elements)) {
                      distance += origin.haversineDistanceTo(destination)
                  }
              }

              return distance
          }
      }

The ``cumulativeDistance`` property computes the cumulative distance
between each pair of elements in the sequence.
Because every element in the sequence conforms to the ``Positioned`` protocol,
the ``haversineDistanceTo(_:)`` method can be used to to perform this calculation.

In the example below,
an array of ``Place`` values is used to represent the stops on a trip around California.
Because ``Array`` conforms to ``SequenceType``,
and the array's elements conform to the ``Positioned`` protocol,
the array can use the ``cumulativeDistance``
to calculate the total distance that will be traveled over the course of the trip.

.. testcode:: protocolExtension

   >> let oxnard = Place(name: "Oxnard, CA", coordinates: (latitude: 34.1975, longitude: -119.1761111))
   >> let ranchoCucamonga = Place(name: "Rancho Cucamonga, CA", coordinates: (latitude: 34.1063889, longitude: -117.5922222))
   >> let weed = Place(name: "Weed, CA", coordinates: (latitude: 41.4226498, longitude: -122.3861269))
   -> let trip = [oxnard, ranchoCucamonga, weed, yosemite]
   -> print(" → ".join(trip.map({ $0.name })))
   <- Oxnard, CA → Rancho Cucamonga, CA → Weed, CA → Yosemite National Park
   -> trip.cumulativeDistance
   // 1530 km
