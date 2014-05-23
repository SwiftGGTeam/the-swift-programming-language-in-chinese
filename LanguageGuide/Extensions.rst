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

* Add computed properties and computed static properties
* Define instance methods and type methods
* Provide new initializers
* Define subscripts
* Define and use new nested types

You can also use an extension to make an existing type conform to a protocol.

.. note::

   If you define an extension to add new functionality to an existing type,
   the new functionality will be available on all existing instances of that type,
   even if they were created before the extension was defined.

.. QUESTION: What are the rules for overloading via extensions?

.. TODO: Talk about extending enumerations to have additional member values

Extension Syntax
----------------

Extensions are declared with the ``extension`` keyword:

.. testcode:: extensionSyntax

   >> struct SomeType {}
   -> extension SomeType {
         // new functionality to add to SomeType goes here
      }

An extension can also extend an existing type to make it adopt one or more protocols.
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
This is why the ``m`` computed property returns ``self`` –
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
   This is different from if you had written the initializer
   as part of the type's original implementation.

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
   << // defaultRect : Rect = V4REPL4Rect (has 2 children)
   -> let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
         size: Size(width: 5.0, height: 5.0))
   << // memberwiseRect : Rect = V4REPL4Rect (has 2 children)

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
The initializer then delegates across to the automatic memberwise initializer,
which stores the new origin and size values in the appropriate properties:

.. testcode:: extensionsInitializers

   -> let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
         size: Size(width: 3.0, height: 3.0))
   << // centerRect : Rect = V4REPL4Rect (has 2 children)
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
The following example adds a new instance method called ``times`` to the ``Int`` type:

.. testcode:: extensionsInstanceMethods

   -> extension Int {
         func times(task: () -> ()) {
            for i in 0..self {
               task()
            }
         }
      }

The ``times`` method takes a single argument of type ``() -> ()``,
or “a function that has no parameters and does not return a value”.

After defining this extension,
you can call the ``times`` method on any integer number
to perform a task that many number of times:

.. testcode:: extensionsInstanceMethods

   -> 3.times({
         println("Hello!")
      })
   </ Hello!
   </ Hello!
   </ Hello!

You can use trailing closure syntax to make the call more succint:

.. testcode:: extensionsInstanceMethods

   -> 3.times {
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
from the right of the number,
so:

* ``123456789[0]`` returns ``9``
* ``123456789[1]`` returns ``8``

…and so on:

.. testcode:: extensionsSubscripts

   -> extension Int {
         subscript(digitIndex: Int) -> Int {
            var decimalBase = 1
            for _ in 1...digitIndex {
               decimalBase *= 10
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
the subscript implementation will return ``0``,
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

   -> extension Character {
         enum Kind {
            case Vowel, Consonant, Other
         }
         var kind: Kind {
            switch String(self).lowercaseString {
               case "a", "e", "i", "o", "u":
                  return .Vowel
               case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
                  "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
                  return .Consonant
               default:
                  return .Other
            }
         }
      }

.. TODO: improve the fact that I have to convert character to a String
   to get this to work, based on where we end up with uppercase / lowercase conversions,
   particularly for the Character type.

This example adds a new nested enumeration to ``Character``.
This enumeration, called ``Kind``,
expresses the kind of letter that a particular character represents.
Specifically, it expresses whether the character is
a vowel or a consonant in a standard Latin script
(without taking into account accents or regional variations),
or whether it is some other kind of character.

This example also adds a new computed instance property to ``Character``,
called ``kind``,
which returns the appropriate ``Kind`` enumeration member for that character.

The nested enumeration can now be used with ``Character`` values:

.. testcode:: extensionsNestedTypes

   -> func printLetterKinds(word: String) {
         println("'\(word)' is made up of the following kinds of letters:")
         for character in word {
            switch character.kind {
               case .Vowel:
                  print("vowel ")
               case .Consonant:
                  print("consonant ")
               case .Other:
                  print("other ")
            }
         }
         print("\n")
      }
   -> printLetterKinds("Hello")
   </ 'Hello' is made up of the following kinds of letters:
   </ consonant vowel consonant consonant vowel

This function, ``printLetterKinds``,
takes an input ``String`` value and iterates over its characters.
For each character, it considers the ``kind`` computed property for that character,
and prints an appropriate description of that kind.
The ``printLetterKinds`` function can then be called
to print the kinds of letters in an entire word,
as shown here for the word ``"Hello"``.

.. note::

   ``character.kind`` is already known to be of type ``Character.Kind``.
   Because of this, all of the ``Character.Kind`` member values
   can be written in shorthand form inside the ``switch`` statement,
   such as ``.Vowel`` rather than ``Character.Kind.Vowel``.