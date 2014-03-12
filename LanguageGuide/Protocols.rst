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
The protocol doesn't actually provide an implementation for any of these requirements –
it only describes what an implementation will look like.
The protocol can then adopted by a class, structure or enumeration
to provide an actual implementation of those requirements.
Any type that satisfies the requirements of a protocol is said to
:newTerm:`conform` to that protocol.

Protocols can require that conforming types have specific
instance properties, instance methods, type properties, type methods,
initializers, operators, and subscripts.

.. _Protocols_ProtocolSyntax:

Protocol Syntax
---------------

Protocols are defined in a very similar way to classes, structures and enumerations:

::

    protocol SomeProtocol {
        // protocol definition goes here
    }

Custom types can declare that they implement a particular protocol
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

.. _Protocols_InstanceProperties:

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

If a protocol requires a property to be gettable and settable,
that property requirement cannot be fulfilled by
a constant stored property or a read-only computed property.
If the protocol only requires a property to be gettable,
the requirement can be satisfied by any kind of property,
and it is perfectly valid for it to also be settable
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

.. _Protocols_InstanceMethods:

Instance Methods
----------------

Protocols can require specific instance methods to be implemented by conforming types.
These methods are written as part of the protocol's definition
in exactly the same way as for a normal instance method definition,
but without curly braces or a method body.
Variadic parameters are allowed,
subject to the same rules as for normal instance methods.

.. note::

    Protocols use the same syntax as normal instance methods,
    but are not allowed to specify default values for method parameters.

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
a number between ``0.0`` and ``1.0`` inclusive.)

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
    --> println("And another one: \(generator.random())")
    <-- And another one: 0.729024

.. _Protocols_UsingProtocolsAsTypes:

Using Protocols as Types
------------------------

Protocols do not actually implement any functionality themselves.
Nonetheless, any protocol you create will become a fully-fledged type for use in your code.

Because it is a type,
a protocol can be used in many places where other types are allowed, including:

* as a parameter type or return type in a function, method, or initializer
* as the type of a named value or property
* as the type of items in an ``Array``, ``Dictionary`` or other container

.. note::

    Because protocols are types,
    their names should begin with a capital letter
    (such as ``FullyNamed`` and ``RandomNumberGenerator``),
    to match the names of other types in Swift
    (such as ``Int``, ``String``, and ``Double``).

.. TODO: what else should be on this list? And should it actually be complete?

Here's an example of a protocol being used as a type:

.. testcode:: protocols

    --> class Dice {
            let sides: Int
            let generator: RandomNumberGenerator
            init withSides(sides: Int) generator(RandomNumberGenerator) {
                self.sides = sides
                self.generator = generator
            }
            func roll() -> Int {
                return Int(generator.random() * Double(sides)) + 1
            }
        }

This example defines a new class called ``Dice``,
which represents an n-sided dice for use in a board game.
``Dice`` instances have an integer property called ``sides``,
which represents how many sides they have,
and a property called ``generator``,
which provides them with a random number generator
from which to create their dice roll values.

The ``generator`` property is of type ``RandomNumberGenerator``.
This means that it can be set to an instance of
*any* type that conforms to the ``RandomNumberGenerator`` protocol.
Nothing else is specified about the nature of the generator –
the only thing that matters is that it must
conform to the ``RandomNumberGenerator`` protocol.

``Dice`` also has an initializer, to set up its initial state.
This initializer has a parameter called ``generator``,
which is also of type ``RandomNumberGenerator``.
You can pass a value of any conforming type in to this parameter
when initializing a new ``Dice`` instance.

``Dice`` provides one instance method, ``roll()``,
which returns an integer value between 1 and the number of sides on the dice.
This method calls the generator's ``random()`` method to create
a new random number between ``0.0`` and ``1.0``,
and uses this random number to create a dice roll value within the correct range.
Because ``generator`` is known to conform to ``RandomNumberGenerator``,
it is guaranteed to have a ``random()`` method to call.

.. QUESTION: would it be better to show Dice using a RandomNumberGenerator
   as a data source, a la UITableViewDataSource etc.?

.. TODO: mention that you can only do RandomNumberGenerator-like things
   with this property, because the property is only known to be a
   RandomNumberGenerator.

Here's how the ``Dice`` class can be used to create a six-sided dice
with a ``LinearCongruentialGenerator`` instance as its random number generator:

.. testcode:: protocols

    --> var d6 = Dice(withSides: 6, generator: LinearCongruentialGenerator())
    <<< // d6 : Dice = <Dice instance>
    --> for _ in 1..5 {
            println("Random dice roll is \(d6.roll())")
        }
    <-/ Random dice roll is 3
    <-/ Random dice roll is 5
    <-/ Random dice roll is 4
    <-/ Random dice roll is 5
    <-/ Random dice roll is 4

.. _Protocols_Delegates:

Delegates
---------

Protocols are often used to implement :newTerm:`delegates`.
Delegates give a way for a class or structure to hand off (or *delegate*)
some responsibilities to an instance of another type.
Delegates can be used to notify an instance of another type that something has happened,
or to retrieve information from an external data source without needing to know
the underlying type of that external source.

This example defines two protocols for use with dice-based board games:

.. testcode:: protocols

    --> protocol DiceGame {
            var dice: Dice { get }
            func play()
        }
    --> protocol DiceGameDelegate {
            func gameDidStart(game: DiceGame)
            func game(DiceGame) didStartNewTurnWithDiceRoll(diceRoll: Int)
            func gameDidEnd(game: DiceGame)
        }

The ``DiceGame`` protocol is a protocol that can be adopted
by any game that involves a dice.
The ``DiceGameDelegate`` protocol can be adopted by
any type that wants to be able to observe and track the progress of a ``DiceGame``.

.. QUESTION: should DiceGame be a protocol, or a base class?
   I figure a base class wouldn't actually be playable,
   but I want some common type to pass to the delegate.

Here's a version of the *Snakes and Ladders* game from the :doc:`ControlFlow` chapter,
adapted to use a ``Dice`` instance for its dice-rolls;
to conform to the ``DiceGame`` protocol;
and to notify a ``DiceGameDelegate`` about its progress:

.. testcode:: protocols

    --> class SnakesAndLadders : DiceGame {
            let finalSquare = 25
            let dice = Dice(withSides: 6, generator: LinearCongruentialGenerator())
            var square = 0
            var board = Array<Int>()
            var delegate: DiceGameDelegate? = .None
            init() {
                for _ in 0..finalSquare { board.append(0) }
                board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
                board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
            }
            func play() {
                square = 0
                if delegate { delegate!.gameDidStart(self) }
                while square != finalSquare {
                    let diceRoll = dice.roll()
                    if delegate {
                        delegate!.game(self, didStartNewTurnWithDiceRoll: diceRoll)
                    }
                    switch square + diceRoll {
                        case finalSquare:
                            break
                        case let x where x > finalSquare:
                            continue
                        default:
                            square += diceRoll
                            square += board[square]
                    }
                }
                if delegate { delegate!.gameDidEnd(self) }
            }
        }

(See the :ref:`ControlFlow_Break` section of the :doc:`ControlFlow` chapter
for a description of the gameplay of the *Snakes and Ladders* game shown above.)

This version of the game has been wrapped up as a class called ``SnakesAndLadders``,
which declares conformance to the ``DiceGame`` protocol.
It provides a gettable ``dice`` property and a ``play()`` method
in order to conform to the protocol.
(The ``dice`` property has been declared as a constant property
because it does not need to change after initialization,
and the protocol only requires that it is gettable.)

The *Snakes and Ladders* game board setup takes place during the class's initializer.
All of the actual game logic has been moved into the protocol's ``play()`` method,
which uses the protocol's required ``dice`` property to provide its dice roll values.

Note that the ``delegate`` property is declared as an *optional* ``DiceGameDelegate``.
A delegate isn't required in order to play the game,
and so this property has a default value of ``.None``
when a new instance of the game is created.
It can be set to a suitable delegate by the game instantiator if they wish.

``DiceGameDelegate`` provides three methods for tracking the progress of a game.
These three methods have been incorporated into the game logic within
the ``play()`` method above, and are called when
a new game starts, a new turn begins, or the game ends.
Because the ``delegate`` property is an optional ``DiceGameDelegate``,
the ``play()`` method first checks to see if the optional property has a value
before calling each method.
In each case, it passes the ``SnakesAndLadders`` instance as
a parameter to the delegate method.

This next example shows a class called ``DiceGameTracker``,
which implements the ``DiceGameDelegate`` protocol:

.. testcode:: protocols

    --> class DiceGameTracker : DiceGameDelegate {
            var numberOfTurns = 0
            func gameDidStart(game: DiceGame) {
                numberOfTurns = 0
                if game is SnakesAndLadders {
                    println("Started a new game of Snakes and Ladders")
                }
                println("The game is using a \(game.dice.sides)-sided dice")
            }
            func game(DiceGame) didStartNewTurnWithDiceRoll(diceRoll: Int) {
                ++numberOfTurns
                println("Rolled a \(diceRoll)")
            }
            func gameDidEnd(game: DiceGame) {
                println("The game lasted for \(numberOfTurns) turns")
            }
        }

``DiceGameTracker`` implements all three of the methods required by ``DiceGameDelegate``.
It uses these methods to keep track of the number of turns a game has taken.
It resets a ``numberOfTurns`` property to zero when the game starts;
increments it each time a new turn begins;
and prints out the total number of turns once the game has ended.

The implementation of ``gameDidStart()`` shown above makes use of the ``game`` parameter
to print some introductory information about the game that is about to be played.
The ``game`` parameter has a type of ``DiceGame``, not ``SnakesAndLadders``,
and so ``gameDidStart()`` can only access and use any methods and properties that
are implemented as part of the ``DiceGame`` protocol.
However, the method is still able to use :doc:`TypeCasting` to
query the type of the underlying instance.
In this example, it checks to see if ``game`` is actually
an instance of ``SnakesAndLadders`` behind the scenes,
and prints an appropriate message if so.

``gameDidStart()`` also accesses the ``dice`` property of the passed ``game`` parameter.
Because ``game`` is known to conform to the ``DiceGame`` protocol,
it is guaranteed to have a ``dice`` property,
and so the ``gameDidStart()`` method is able to access and print the dice's ``sides`` property,
regardless of what kind of game is being played.

Here's how ``DiceGameTracker`` looks in action:

.. testcode:: protocols

    --> let tracker = DiceGameTracker()
    <<< // tracker : DiceGameTracker = <DiceGameTracker instance>
    --> let game = SnakesAndLadders()
    <<< // game : SnakesAndLadders = <SnakesAndLadders instance>
    --> game.delegate = tracker
    --> game.play()
    <-/ Started a new game of Snakes and Ladders
    <-/ The game is using a 6-sided dice
    <-/ Rolled a 3
    <-/ Rolled a 5
    <-/ Rolled a 4
    <-/ Rolled a 5
    <-/ The game lasted for 4 turns

.. TODO: expand this example to show how you can initialize from a type.
   Perhaps a function that returns a random game type to play
   (even though we only have one game)
   and the game is instantiated through the type?

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

Checking for Protocol Conformance
---------------------------------

.. write-me::

.. is and as
.. Perhaps follow on from the Printable and FancyPrintable example
   to check for conformance and call the appropriate print method

Optional Requirements
---------------------

.. write-me::

.. Non-mandatory protocol requirements via @optional
.. Checking for (and calling) optional implementations via optional binding and closures
.. all dependent on the implementation of rdar://16101161

.. Other things to be included:
.. ----------------------------

.. Class-only protocols
.. @obj-c protocols
.. Curried functions in protocols
.. Standard-library protocols such as Sequence, Equatable etc.?
.. Show how to make a custom type conform to LogicValue or some other protocol
.. LogicValue certainly needs to be mentioned in here somewhere
.. Show a protocol being used by an enumeration
.. accessing protocol methods, properties etc. through a named value that is *just* of protocol type
.. Protocols can't be nested, but nested types can implement protocols

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#protocols
