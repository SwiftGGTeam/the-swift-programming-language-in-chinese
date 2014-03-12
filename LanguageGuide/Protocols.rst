.. docnote:: Subjects to be covered in this section

    * Definition of protocols
    * Adoption of protocols
    * Standard protocols (Equatable etc.)
    * Default implementations of methods
    * Protocol compositions

Protocols
=========

A :newTerm:`protocol` defines a blueprint or template set of
methods, properties, and other requirements
that suit a particular task or piece of functionality.
The protocol doesn't actually provide an *implementation* for any of these requirements –
it only describes what an implementation will look like.
The protocol can then adopted by a class, structure or enumeration
to provide an actual implementation of those requirements.

Any type that satisfies the requirements of a protocol is said to
:newTerm:`conform` to that protocol.

Protocols can require that conforming types have specific
instance properties, instance methods, type properties, type methods,
initializers, operators, and subscripts.

Protocol Syntax
---------------

Protocols are defined in a very similar way to classes, structures and enumerations:

::

    protocol SomeProtocol {
        // protocol definition goes here
    }

Custom types declare that they implement a particular protocol
by placing the protocol's name after the type's name,
separated by a colon, as part of their own definition:

::

    struct SomeStructure : SomeProtocol {
        // structure definition goes here
    }

.. QUESTION: is "declare" the correct word to use here?

If a class has a superclass, the superclass name should be listed
before any protocols it implements, followed by a comma.
Multiple protocols can also be listed, separated by commas:

::

    class SomeClass : SomeSuperclass, FirstProtocol, AnotherProtocol {
        // class definition goes here
    }

Instance Properties
-------------------

A protocol can require any conforming type to provide
an instance property with a particular name and type.
The protocol doesn't specify whether the property is
a stored property or a computed property –
it just specifies the required property name and type.

The protocol also specifies whether each property must be either:

* gettable *and* settable, or
* gettable

If a protocol requires a property to be both gettable and settable,
that property requirement cannot be fulfilled by
a constant stored property or a read-only computed property,
because neither of these are settable.

If the protocol only requires a property to be gettable,
the requirement can be satisfied by any kind of property.
The property does not have to be settable,
although it is perfectly valid for it to also be settable
if this is useful for your own code.

Property requirements are always declared as variable properties,
prefixed with the ``var`` keyword.
Gettable-and-settable properties are indicated by writing
``{ get set }`` after their type declaration,
and gettable properties are indicated by writing ``{ get }``.

::

    protocol SomeProtocol {
        var mustBeSettable: Int { get set }
        var doesNotNeedToBeSettable: Int { get }
    }

Here's an example of a protocol with a single property requirement:

.. testcode:: protocols

    --> protocol FullyNamed {
            var fullName: String { get }
        }

The ``FullyNamed`` protocol defines any kind of thing that has a fully-qualified name.
It doesn't specify what *kind* of thing it must be –
it only specifies that the thing must be able to provide a full name for itself.
It implements this requirement by stating that any ``FullyNamed`` type must have
a gettable instance property called ``fullName``, which is of type ``String``.

Here's an example of a simple structure that conforms to
the ``FullyNamed`` protocol:

.. testcode:: protocols

    --> struct Person : FullyNamed {
            var fullName: String
        }
    --> let john = Person(fullName: "John Appleseed")
    <<< // john : Person = Person("John Appleseed")
    /-> john.fullName is \"\(john.fullName)\"
    <-/ john.fullName is "John Appleseed"

This example defines a structure called ``Person``,
which represents a specific named person.
It declares that it implements the ``FullyNamed`` protocol
as part of the first line of its definition.

Each instance of ``Person`` has a single stored property called ``fullName``,
which is of type ``String``.
This matches the single requirement of the ``FullyNamed`` protocol,
and means that ``Person`` has correctly conformed to the protocol.
(Swift will report an error at compile-time if a protocol requirement is not fulfilled.)

Here's a more complex class, which also conforms to the ``FullyNamed`` protocol:

.. testcode:: protocols

    --> class Starship : FullyNamed {
            var prefix: String?
            var name: String
            init withName(name: String) prefix(String? = .None) {
                self.name = name
                self.prefix = prefix
            }
            var fullName: String {
                return (prefix ? prefix! + " " : "") + name
            }
        }
    --> var ncc1701 = Starship(withName: "Enterprise", prefix: "USS")
    <<< // ncc1701 : Starship = <Starship instance>
    /-> ncc1701.fullName is \"\(ncc1701.fullName)\"
    <-/ ncc1701.fullName is "USS Enterprise"

This class implements ``fullName`` as a computed read-only property for a starship.
Each ``Starship`` class instance stores a mandatory ``name``, and an optional ``prefix``.
The ``fullName`` property uses the ``prefix`` value if it exists,
and prepends it on to the beginning of ``name`` to create a full name for the starship.

.. TODO: add some advice on how protocols should be named

Instance Methods
----------------

Protocols can require specific instance methods to be implemented by conforming types.
These methods are written as part of the protocol's definition
in exactly the same way as for a normal instance method definition,
but without curly braces or a method body.

For example:

.. testcode:: protocols

    --> protocol RandomNumberGenerator {
            func random() -> Double
        }

This protocol, ``RandomNumberGenerator``, requires any conforming type
to have an instance method called ``random()``,
which returns a ``Double`` value whenever it is called.
(Although it is not specified as part of the protocol,
it is assumed that this value will be
a random floating-point number between ``0.0`` and ``1.0`` inclusive.)

.. QUESTION: should I *make* this range be part of the protocol?

The ``RandomNumberGenerator`` protocol does not make any assumptions
about how each random number will be generated –
it just requires that any generator provides a standard way
to generate a new random number.

Here's an implementation of a class that conforms to
the ``RandomNumberGenerator`` protocol.
This class implements a pseudorandom number generator algorithm known as
a :newTerm:`linear congruential generator`:

.. testcode:: protocols

    --> class LinearCongruentialGenerator : RandomNumberGenerator {
            var lastRandom = 42.0
            let m = 139968.0
            let a = 3877.0
            let c = 29573.0
            func random() -> Double {
                lastRandom = ((lastRandom * a + c) % m)
                return lastRandom / m
            }
        }
    --> let generator = LinearCongruentialGenerator()
    <<< // generator : LinearCongruentialGenerator = <LinearCongruentialGenerator instance>
    --> println("Here's a random number: \(generator.random())")
    <-- Here's a random number: 0.37465
    --> println("Look - there's another one: \(generator.random())")
    <-- Look - there's another one: 0.729024

Using Protocols as Parameter and Named Value Types
--------------------------------------------------

Protocols do not actually implement any functionality themselves.
Nonetheless, any protocol you define still creates a new fully-fledged type.
Because it is a fully-fledged type,
a protocol can be used in many places where standard types are allowed.

For example,
a protocol can be specified as the type of a parameter for
a function, method, or initializer,
or as the type of a named value or property.

.. TODO: what else should be on this list? And should it actually be complete?

.. testcode:: protocols

    --> struct Die {
            let sides: Int
            let generator: RandomNumberGenerator
            init withSides(sides: Int) generator(RandomNumberGenerator) {
                self.sides = sides
                self.generator = generator
            }
            func roll() -> Int {
                return 1 + Int(generator.random() * Double(sides))
            }
        }

.. testcode:: protocols

    --> var d6 = Die(withSides: 6, generator: LinearCongruentialGenerator())
    <<< // d6 : Die = <Die instance>
    --> for _ in 1..10 {
            println("Random die roll is \(d6.roll())")
        }
    <-/ Random die roll is 3
    <-/ Random die roll is 5
    <-/ Random die roll is 4
    <-/ Random die roll is 5
    <-/ Random die roll is 4
    <-/ Random die roll is 1
    <-/ Random die roll is 4
    <-/ Random die roll is 2
    <-/ Random die roll is 1
    <-/ Random die roll is 4

.. testcode:: protocols

    --> let finalSquare = 25
    <<< // finalSquare : Int = 25
    --> var board = Array<Int>()
    <<< // board : Array<Int> = []
    --> for _ in 0..finalSquare { board.append(0) }
    --> board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
    --> board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
    --> var square = 0
    <<< // square : Int = 0
    --> do {
            square += board[square]
            square += d6.roll()
    --> } while square < finalSquare

.. note::

    A protocol cannot specify default values for the parameters of the methods it requires.

.. Idea: the next part of this chapter could be to define a "didRoll" protocol,
   and to use an extension to add it to the Die shown above.
   I could then use this to implement a turn-counter for the game.
   Or, make the game into a class, and implement game-watching logic.
   Bingo!

Initializers
------------

.. write-me::

.. You can't construct from a protocol
.. You can define initializer requirements in protocols

Class and Static Methods and Properties
---------------------------------------

.. write-me::

.. Protocols can provide class (and static) functions and properties
   (although rdar://14620454 and rdar://15242744).

Operators
---------

.. write-me::

.. Protocols can require the implementation of operators (though assignment operators are broken)
.. Likewise for requiring custom operators
.. However, Doug thought that this might be better covered by Generics,
   where you know that two things are definitely of the same type.
   Perhaps mention it here, but don't actually show an example?

Subscripts
----------

.. write-me::

.. Subscript requirements (but it's broken at the moment)

Adding Protocol Conformance With Extensions
-------------------------------------------

.. write-me::

.. Extensions can make an existing type conform to a protocol

Protocol Inheritance
--------------------

.. write-me::

.. Protocols can inherit from other protocols
.. Perhaps use a Printable and FancyPrintable kind of example

Protocol Composition
--------------------

.. write-me::

.. protocol<P1, P2> syntax for protocol conformance aka "something that conforms to multiple protocols"

Checking Protocol Conformance
-----------------------------

.. is and as
.. Perhaps follow on from the Printable and FancyPrintable example
   to check for conformance and call the appropriate print method

Using Protocols
---------------

.. write-me::

.. Using a protocol as the type for a variable, function parameter, return type etc.
.. Functions can have parameters that are 'anything that implements some protocol'
.. …or 'some multiple protocols'
.. accessing protocol methods, properties etc. through a named value that is *just* of protocol type
.. Protocols can't be nested, but nested types can implement protocols

Optional Requirements
---------------------

.. write-me::

.. Non-mandatory protocol requirements via @optional
.. Checking for (and calling) optional implementations via optional binding and closures
.. all dependent on the implementation of rdar://16101161

TBC
---

.. write-me::

.. Class-only protocols
.. @obj-c protocols
.. Curried functions in protocols
.. Standard-library protocols such as Sequence, Equatable etc.?
.. Show how to make a custom type conform to LogicValue or some other protocol
.. LogicValue certainly needs to be mentioned in here somewhere
.. Show a protocol being used by an enumeration

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#protocols
