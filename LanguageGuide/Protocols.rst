Protocols
=========

A :newTerm:`protocol` defines a blueprint or template set of
methods, properties, and other requirements
that suit a particular task or piece of functionality.
The protocol doesn't actually provide an implementation for any of these requirements –
it only describes what an implementation will look like.
The protocol can then be :newTerm:`adopted` by a class, structure, or enumeration
to provide an actual implementation of those requirements.
Any type that satisfies the requirements of a protocol is said to
:newTerm:`conform` to that protocol.

Protocols can require that conforming types have specific
instance properties, instance methods, type methods, operators, and subscripts.

.. _Protocols_ProtocolSyntax:

Protocol Syntax
---------------

Protocols are defined in a very similar way to classes, structures, and enumerations:

::

   protocol SomeProtocol {
      // protocol definition goes here
   }

Custom types can state that they adopt a particular protocol
by placing the protocol's name after the type's name,
separated by a colon, as part of their definition.
Multiple protocols can also be listed, separated by commas:

::

   struct SomeStructure: FirstProtocol, AnotherProtocol {
      // structure definition goes here
   }

If a class has a superclass, the superclass name should be listed
before any protocols it adopts, followed by a comma:

::

   class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
      // class definition goes here
   }

.. _Protocols_InstanceProperties:

Instance Properties
-------------------

A protocol can require any conforming type to provide
an instance property with a particular name and type.
The protocol doesn't specify whether the property should be
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

   -> protocol FullyNamed {
         var fullName: String { get }
      }

The ``FullyNamed`` protocol defines any kind of thing that has a fully-qualified name.
It doesn't specify what *kind* of thing it must be –
it only specifies that the thing must be able to provide a full name for itself.
It specifies this requirement by stating that any ``FullyNamed`` type must have
a gettable instance property called ``fullName``, which is of type ``String``.

Here's an example of a simple structure that adopts and conforms to
the ``FullyNamed`` protocol:

.. testcode:: protocols

   -> struct Person: FullyNamed {
         var fullName: String
      }
   -> let john = Person(fullName: "John Appleseed")
   << // john : Person = Person("John Appleseed")
   /> john.fullName is \"\(john.fullName)\"
   </ john.fullName is "John Appleseed"

This example defines a structure called ``Person``,
which represents a specific named person.
It states that it adopts the ``FullyNamed`` protocol
as part of the first line of its definition.

Each instance of ``Person`` has a single stored property called ``fullName``,
which is of type ``String``.
This matches the single requirement of the ``FullyNamed`` protocol,
and means that ``Person`` has correctly conformed to the protocol.
(Swift will report an error at compile-time if a protocol requirement is not fulfilled.)

Here's a more complex class, which also adopts and conforms to the ``FullyNamed`` protocol:

.. testcode:: protocols

   -> class Starship: FullyNamed {
         var prefix: String?
         var name: String
         init(name: String, prefix: String? = nil) {
            self.name = name
            self.prefix = prefix
         }
         var fullName: String {
            return (prefix ? prefix! + " " : "") + name
         }
      }
   -> var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
   << // ncc1701 : Starship = <Starship instance>
   /> ncc1701.fullName is \"\(ncc1701.fullName)\"
   </ ncc1701.fullName is "USS Enterprise"

This class implements ``fullName`` as a computed read-only property for a starship.
Each ``Starship`` class instance stores a mandatory ``name``, and an optional ``prefix``.
The ``fullName`` property uses the ``prefix`` value if it exists,
and prepends it to the beginning of ``name`` to create a full name for the starship.

.. TODO: add some advice on how protocols should be named

.. _Protocols_Methods:

Methods
-------

Protocols can require specific instance methods and type methods
to be implemented by conforming types.
These methods are written as part of the protocol's definition
in exactly the same way as for normal instance and type methods,
but without curly braces or a method body.
Variadic parameters are allowed, subject to the same rules as for normal methods.

.. note::

   Protocols use the same syntax as normal methods,
   but are not allowed to specify default values for method parameters.

The following example defines a protocol with a single instance method requirement:

.. testcode:: protocols

   -> protocol RandomNumberGenerator {
         func random() -> Double
      }

This protocol, ``RandomNumberGenerator``, requires any conforming type
to have an instance method called ``random``,
which returns a ``Double`` value whenever it is called.
(Although it is not specified as part of the protocol,
it is assumed that this value will be
a number between ``0.0`` and ``1.0`` inclusive.)

The ``RandomNumberGenerator`` protocol does not make any assumptions
about how each random number will be generated –
it just requires that any generator provides a standard way
to generate a new random number.

Here's an implementation of a class that adopts and conforms to
the ``RandomNumberGenerator`` protocol.
This class implements a pseudorandom number generator algorithm known as
a :newTerm:`linear congruential generator`:

.. testcode:: protocols

   -> class LinearCongruentialGenerator: RandomNumberGenerator {
         var lastRandom = 42.0
         let m = 139968.0
         let a = 3877.0
         let c = 29573.0
         func random() -> Double {
            lastRandom = ((lastRandom * a + c) % m)
            return lastRandom / m
         }
      }
   -> let generator = LinearCongruentialGenerator()
   << // generator : LinearCongruentialGenerator = <LinearCongruentialGenerator instance>
   -> println("Here's a random number: \(generator.random())")
   <- Here's a random number: 0.37464991998171
   -> println("And another one: \(generator.random())")
   <- And another one: 0.729023776863283

.. _Protocols_UsingProtocolsAsTypes:

Using Protocols as Types
------------------------

Protocols do not actually implement any functionality themselves.
Nonetheless, any protocol you create will become a fully-fledged type for use in your code.

Because it is a type,
a protocol can be used in many places where other types are allowed, including:

* as a parameter type or return type in a function, method, or initializer
* as the type of a constant, variable, or property
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

   -> class Dice {
         let sides: Int
         let generator: RandomNumberGenerator
         init(sides: Int, generator: RandomNumberGenerator) {
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
*any* type that adopts the ``RandomNumberGenerator`` protocol.
Nothing else is specified about the nature of the generator –
the only thing that matters is that it must
adopt the ``RandomNumberGenerator`` protocol.

``Dice`` also has an initializer, to set up its initial state.
This initializer has a parameter called ``generator``,
which is also of type ``RandomNumberGenerator``.
You can pass a value of any conforming type in to this parameter
when initializing a new ``Dice`` instance.

``Dice`` provides one instance method, ``roll``,
which returns an integer value between 1 and the number of sides on the dice.
This method calls the generator's ``random`` method to create
a new random number between ``0.0`` and ``1.0``,
and uses this random number to create a dice roll value within the correct range.
Because ``generator`` is known to adopt ``RandomNumberGenerator``,
it is guaranteed to have a ``random`` method to call.

.. QUESTION: would it be better to show Dice using a RandomNumberGenerator
   as a data source, a la UITableViewDataSource etc.?

.. TODO: mention that you can only do RandomNumberGenerator-like things
   with this property, because the property is only known to be a
   RandomNumberGenerator.

Here's how the ``Dice`` class can be used to create a six-sided dice
with a ``LinearCongruentialGenerator`` instance as its random number generator:

.. testcode:: protocols

   -> var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
   << // d6 : Dice = <Dice instance>
   -> for _ in 1..5 {
         println("Random dice roll is \(d6.roll())")
      }
   </ Random dice roll is 3
   </ Random dice roll is 5
   </ Random dice roll is 4
   </ Random dice roll is 5
   </ Random dice roll is 4

.. _Protocols_Delegates:

Delegates
---------

:newTerm:`Delegates` are a way for a class or structure to hand off (or *delegate*)
some responsibilities to an instance of another type.
Delegates can be used to notify an instance of another type that something has happened,
or to retrieve information from an external data source without needing to know
the underlying type of that external source.
The methods that a delegate must implement are typically described by a protocol.

This example defines two protocols for use with dice-based board games:

.. testcode:: protocols

   -> protocol DiceGame {
         var dice: Dice { get }
         func play()
      }
   -> protocol DiceGameDelegate {
         func gameDidStart(game: DiceGame)
         func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
         func gameDidEnd(game: DiceGame)
      }

The ``DiceGame`` protocol is a protocol that can be adopted
by any game that involves a dice.
The ``DiceGameDelegate`` protocol can be adopted by
any type that wants to be able to observe and track the progress of a ``DiceGame``.

.. QUESTION: is the Cocoa-style x:didStuffWithY: naming approach
   the right thing to advise for delegates written in Swift?
   It looks a little odd in the syntax above.

Here's a version of the *Snakes and Ladders* game originally introduced in :doc:`ControlFlow`.
This version has been adapted to use a ``Dice`` instance for its dice-rolls;
to adopt the ``DiceGame`` protocol;
and to notify a ``DiceGameDelegate`` about its progress:

.. testcode:: protocols

   -> class SnakesAndLadders: DiceGame {
         let finalSquare = 25
         let dice = Dice(sides: 6, generator: LinearCongruentialGenerator())
         var square = 0
         var board = Array<Int>()
         var delegate: DiceGameDelegate?
         init() {
            for _ in 0..finalSquare { board.append(0) }
            board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
            board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
         }
         func play() {
            square = 0
            delegate?.gameDidStart(self)
            gameLoop: while square != finalSquare {
               let diceRoll = dice.roll()
               delegate?.game(self, didStartNewTurnWithDiceRoll: diceRoll)
               switch square + diceRoll {
                  case finalSquare:
                     break gameLoop
                  case let x where x > finalSquare:
                     continue gameLoop
                  default:
                     square += diceRoll
                     square += board[square]
               }
            }
            delegate?.gameDidEnd(self)
         }
      }

(See the :ref:`ControlFlow_Break` section of the :doc:`ControlFlow` chapter
for a description of the gameplay of the *Snakes and Ladders* game shown above.)

This version of the game has been wrapped up as a class called ``SnakesAndLadders``,
which adopts the ``DiceGame`` protocol.
It provides a gettable ``dice`` property and a ``play`` method
in order to conform to the protocol.
(The ``dice`` property has been declared as a constant property
because it does not need to change after initialization,
and the protocol only requires that it is gettable.)

The *Snakes and Ladders* game board setup takes place during the class's initializer.
All of the actual game logic has been moved into the protocol's ``play`` method,
which uses the protocol's required ``dice`` property to provide its dice roll values.

Note that the ``delegate`` property is defined as an *optional* ``DiceGameDelegate``,
because a delegate isn't required in order to play the game.
Because it is of an optional type,
the ``delegate`` property is automatically set to an initial value of ``nil``.
It can be set to a suitable delegate thereafter by the game instantiator if they wish.

``DiceGameDelegate`` provides three methods for tracking the progress of a game.
These three methods have been incorporated into the game logic within
the ``play`` method above, and are called when
a new game starts, a new turn begins, or the game ends.

Because the ``delegate`` property is an *optional* ``DiceGameDelegate``,
the ``play`` method uses optional chaining each time it calls a method on the delegate.
If the ``delegate`` property is nil,
these delegate calls fail gracefully and without error.
If the ``delegate`` property is non-nil,
the delegate methods are called,
and are passed the ``SnakesAndLadders`` instance as a parameter.

.. TODO: add a cross-reference to optional chaining here.

This next example shows a class called ``DiceGameTracker``,
which adopts the ``DiceGameDelegate`` protocol:

.. testcode:: protocols

   -> class DiceGameTracker: DiceGameDelegate {
         var numberOfTurns = 0
         func gameDidStart(game: DiceGame) {
            numberOfTurns = 0
            if game is SnakesAndLadders {
               println("Started a new game of Snakes and Ladders")
            }
            println("The game is using a \(game.dice.sides)-sided dice")
         }
         func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
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

The implementation of ``gameDidStart`` shown above makes use of the ``game`` parameter
to print some introductory information about the game that is about to be played.
The ``game`` parameter has a type of ``DiceGame``, not ``SnakesAndLadders``,
and so ``gameDidStart`` can only access and use any methods and properties that
are implemented as part of the ``DiceGame`` protocol.
However, the method is still able to use type casting to
query the type of the underlying instance.
In this example, it checks to see if ``game`` is actually
an instance of ``SnakesAndLadders`` behind the scenes,
and prints an appropriate message if so.

``gameDidStart`` also accesses the ``dice`` property of the passed ``game`` parameter.
Because ``game`` is known to conform to the ``DiceGame`` protocol,
it is guaranteed to have a ``dice`` property,
and so the ``gameDidStart`` method is able to access and print the dice's ``sides`` property,
regardless of what kind of game is being played.

Here's how ``DiceGameTracker`` looks in action:

.. testcode:: protocols

   -> let tracker = DiceGameTracker()
   << // tracker : DiceGameTracker = <DiceGameTracker instance>
   -> let game = SnakesAndLadders()
   << // game : SnakesAndLadders = <SnakesAndLadders instance>
   -> game.delegate = tracker
   -> game.play()
   </ Started a new game of Snakes and Ladders
   </ The game is using a 6-sided dice
   </ Rolled a 3
   </ Rolled a 5
   </ Rolled a 4
   </ Rolled a 5
   </ The game lasted for 4 turns

.. _Protocols_AddingProtocolConformanceWithAnExtension:

Adding Protocol Conformance With An Extension
---------------------------------------------

An existing type can be extended to adopt and conform to a new protocol,
even if you do not have access to the source code for the existing type.
This is achieved by defining an extension
that adds the protocol's functionality to the existing type.
Extensions give a way to add new properties, methods, and subscripts
to an existing type,
and are therefore able to add any of the requirements that a protocol may demand.

.. note::

   Existing instances of a type automatically adopt and conform to a protocol
   when that conformance is added to the instance's type in an extension.

For example:

.. testcode:: protocols

   -> protocol TextRepresentable {
         func asText() -> String
      }

This protocol, called ``TextRepresentable``, can be implemented by
any type that has a way to be represented as text.
This might be a description of itself, or a text version of its current state.

The ``Dice`` class from earlier can be extended to adopt and conform to ``TextRepresentable``:

.. testcode:: protocols

   -> extension Dice: TextRepresentable {
         func asText() -> String {
            return "A \(sides)-sided dice"
         }
      }

This extension adopts the new protocol in exactly the same way
as if ``Dice`` had provided it in its original implementation.
The protocol name is provided after the type name, separated by a colon,
and an implementation of all of the requirements of the protocol
is provided within the extension's curly braces.

Any ``Dice`` instance can now be treated as ``TextRepresentable``:

.. testcode:: protocols

   -> let d12 = Dice(sides: 12, generator: LinearCongruentialGenerator())
   << // d12 : Dice = <Dice instance>
   -> println(d12.asText())
   <- A 12-sided dice

Similarly, the ``SnakesAndLadders`` game class can be extended to
adopt and conform to the ``TextRepresentable`` protocol:

.. testcode:: protocols

   -> extension SnakesAndLadders: TextRepresentable {
         func asText() -> String {
            return "A game of Snakes and Ladders with \(finalSquare) squares"
         }
      }
   -> println(game.asText())
   <- A game of Snakes and Ladders with 25 squares

.. _Protocols_DeclaringExistingConformance:

Declaring Protocol Adoption
~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a type already conforms to all of the requirements of a protocol,
but has not yet stated that it adopts that protocol,
it can be made to adopt the protocol with an empty extension:

.. testcode:: protocols

   -> struct Hamster {
         var name: String
         func asText() -> String {
            return "A hamster named \(name)"
         }
      }
   -> extension Hamster: TextRepresentable {}

Instances of ``Hamster`` can now be used wherever ``TextRepresentable`` is the required type:

.. testcode:: protocols

   -> let simonTheHamster = Hamster(name: "Simon")
   << // simonTheHamster : Hamster = Hamster("Simon")
   -> let somethingTextRepresentable: TextRepresentable = simonTheHamster
   << // somethingTextRepresentable : TextRepresentable = <unprintable value>
   -> println(somethingTextRepresentable.asText())
   <- A hamster named Simon

.. note::

   Types do not automatically adopt a protocol just by satisfying its requirements.
   They must always explicitly declare their adoption of the protocol.

.. _Protocols_CollectionsOfProtocolTypes:

Collections of Protocol Types
-----------------------------

A protocol can be used as the type to be stored in
a collection such as an ``Array`` or a ``Dictionary``,
as mentioned in :ref:`Protocols_UsingProtocolsAsTypes`.
This example creates an array of ``TextRepresentable`` things:

.. testcode:: protocols

   -> let things: Array<TextRepresentable> = [game, d12, simonTheHamster]
   << // things : Array<TextRepresentable> = [<unprintable value>, <unprintable value>, <unprintable value>]

It is now possible to iterate over the items in the array,
and print each item's textual representation:

.. testcode:: protocols

   -> for thing in things {
         println(thing.asText())
      }
   </ A game of Snakes and Ladders with 25 squares
   </ A 12-sided dice
   </ A hamster named Simon

Note that the ``thing`` constant is of type ``TextRepresentable``.
It is not of type ``Dice``, or ``DiceGame``, or ``Hamster``,
even if the actual instance behind the scenes is of one of those types.
Nonetheless, because it is of type ``TextRepresentable``,
and anything that is ``TextRepresentable`` is known to have an ``asText`` method,
it is safe to call ``thing.asText`` each time through the loop.

.. _Protocols_ProtocolInheritance:

Protocol Inheritance
--------------------

A protocol can :newTerm:`inherit` from another protocol,
and add further requirements on top of the requirements it inherits.
The syntax for protocol inheritance is the same as for class inheritance:

::

   protocol SomeSubProtocol: SomeSuperProtocol {
      // protocol definition goes here
   }

For example:

.. testcode:: protocols

   -> protocol PrettyTextRepresentable: TextRepresentable {
         func asPrettyText() -> String
      }

This example defines a new protocol, ``PrettyTextRepresentable``,
which inherits from ``TextRepresentable``.
Anything that adopts ``PrettyTextRepresentable`` must satisfy all of the requirements
enforced by ``TextRepresentable``,
*plus* the addition requirements enforced by ``PrettyTextRepresentable``.
In this example, ``PrettyTextRepresentable`` adds a single requirement
to provide an instance method called ``asPrettyText`` that returns a ``String``.

The ``SnakesAndLadders`` class can be extended to adopt and conform to ``PrettyTextRepresentable``:

.. testcode:: protocols

   -> extension SnakesAndLadders: PrettyTextRepresentable {
         func asPrettyText() -> String {
            var output = asText() + ":\n"
            for index in 1..finalSquare {
               switch board[index] {
                  case let ladder where ladder > 0:
                     output += "👍 "
                  case let snake where snake < 0:
                     output += "🐍 "
                  default:
                     output += "🆓 "
               }
            }
            return output
         }
      }

This extension states that it adopts the ``PrettyTextRepresentable`` protocol,
and provides an implementation of the ``asPrettyText`` method
for the ``SnakesAndLadders`` type.
Anything that is ``PrettyTextRepresentable`` must also be ``TextRepresentable``,
and so the ``asPrettyText`` implementation starts by calling the ``asText`` method
from the ``TextRepresentable`` protocol to begin an output string.
It appends a colon and a line break,
and uses this as the start of its pretty text representation.
It then iterates through the array of board squares,
and appends an emoji representation for each square:

* If the square's value is greater than ``0``, it is the base of a ladder,
  and is represented by 👍
* If the square's value is less than ``0``, it is the head of a snake,
  and is represented by 🐍
* Otherwise, the square's value is ``0``, and it is a “free” square,
  represented by 🆓

The method implementation can now be used to print a pretty text description
of any ``SnakesAndLadders`` instance:

.. testcode:: protocols

   -> println(game.asPrettyText())
   </ A game of Snakes and Ladders with 25 squares:
   </ 🆓 🆓 👍 🆓 🆓 👍 🆓 🆓 👍 👍 🆓 🆓 🆓 🐍 🆓 🆓 🆓 🆓 🐍 🆓 🆓 🐍 🆓 🐍 🆓 

.. _Protocols_ProtocolComposition:

Protocol Composition
--------------------

It can sometimes be useful to require a type to conform to multiple protocols at once.
You can combine multiple protocols into a single requirement
with a :newTerm:`protocol composition`.
Protocol compositions have the form ``protocol<SomeProtocol, AnotherProtocol>``,
and you can list as many protocols within the pair of angle brackets (``<>``) as you need,
separated by commas.

Here's an example that combines two protocols called ``Named`` and ``Aged``
into a single protocol composition requirement on a function parameter:

.. testcode:: protocolComposition

   -> protocol Named {
         var name: String { get }
      }
   -> protocol Aged {
         var age: Int { get }
      }
   -> struct Person: Named, Aged {
         var name: String
         var age: Int
      }
   -> func wishHappyBirthday(celebrator: protocol<Named, Aged>) {
         println("Happy birthday \(celebrator.name) - you're \(celebrator.age)!")
      }
   -> let birthdayPerson = Person(name: "Malcolm", age: 21)
   << // birthdayPerson : Person = Person("Malcolm", 21)
   -> wishHappyBirthday(celebrator: birthdayPerson)
   <- Happy birthday Malcolm - you're 21!

This example defines a protocol called ``Named``,
with a single requirement for a gettable ``String`` property called ``name``.
It also defines a protocol called ``Aged``,
with a single requirement for a gettable ``Int`` property called ``age``.
Both of these protocols are adopted by a structure called ``Person``.

The example also defines a function called ``wishHappyBirthday``,
which takes a single parameter called ``celebrator``.
The type of this parameter is ``protocol<Named, Aged>``,
which means “any type that conforms to both the ``Named`` and ``Aged`` protocols.”
It doesn't matter what specific type is passed to the function,
as long as it conforms to both of the required protocols.

The example then creates a new ``Person`` instance called ``birthdayPerson``,
and passes this new instance to the ``wishHappyBirthday`` function.
Because ``Person`` conforms to both protocols, this is a valid call,
and the ``wishHappyBirthday`` function is able to print its birthday greeting.

.. note::

   Protocol compositions do not define a new, permanent protocol type.
   Rather, they define a temporary local protocol that has the combined requirements
   of all protocols in the composition.

.. _Protocols_CheckingForProtocolConformance:

Checking for Protocol Conformance
---------------------------------

You can use the ``is`` and ``as`` operators (as described in :doc:`TypeCasting`)
to check for protocol conformance, and to cast to a specific protocol.
Checking for and casting to a protocol
follows exactly the same syntax as checking for and casting to a type:

* The ``is`` operator returns ``true`` if an instance conforms to a protocol,
  and returns ``false`` if it does not.
* The ``as`` operator returns an optional value of the protocol's type,
  and this value is ``nil`` if the instance does not conform to that protocol.

This example defines a protocol called ``HasArea``,
with a single property requirement of a gettable ``Double`` property called ``area``:

.. testcode:: protocolConformance

   -> @objc protocol HasArea {
         var area: Double { get }
      }

.. note::

   You can only check for protocol conformance
   if your protocol is marked with the ``@objc`` attribute,
   as seen for the ``HasArea`` protocol above.
   This attribute is used to indicate that
   the protocol should be exposed to Objective-C code,
   and is described in *Building Cocoa Apps With Swift*.
   Even if you are not interoperating with Objective-C,
   you will still need to mark your protocols with the ``@objc`` attribute
   if you want to be able to check for protocol conformance.
   
   Note also that ``@objc`` protocols can only be adopted by classes,
   and not by structures or enumerations.
   If you mark your protocol as ``@objc`` in order to check for conformance,
   you will only be able to apply that protocol to class types.

.. QUESTION: is this acceptable wording for this limitation?

.. TODO: remove this note when this limitation is lifted in the future.

.. TODO: make this section link to the interop guide.

Here are two classes, ``Circle`` and ``Country``,
both of which conform to the ``HasArea`` protocol:

.. testcode:: protocolConformance

   -> class Circle: HasArea {
         let pi = 3.1415927
         var radius: Double
         var area: Double { return pi * radius * radius }
         init(radius: Double) { self.radius = radius }
      }
   -> class Country: HasArea {
         var area: Double
         init(area: Double) { self.area = area }
      }

The ``Circle`` class implements the ``area`` property requirement
as a computed property, based on a stored ``radius`` property.
The ``Country`` class implements the ``area`` requirement directly as a stored property.
Both classes correctly conform to the ``HasArea`` protocol.

Here's a class called ``Animal``, which does not conform to the ``HasArea`` protocol:

.. testcode:: protocolConformance

   -> class Animal {
         var legs: Int
         init(legs: Int) { self.legs = legs }
      }

The ``Circle``, ``Country`` and ``Animal`` classes do not have a shared base class.
Nonetheless, they are all classes, and so instances of all three types
can be used to initialize an array that stores values of type ``AnyObject``:

.. testcode:: protocolConformance

   -> let objects: Array<AnyObject> = [
         Circle(radius: 2.0),
         Country(area: 243_610),
         Animal(legs: 4)
      ]
   << // objects : Array<AnyObject> = [<unprintable value>, <unprintable value>, <unprintable value>]

The ``objects`` array is initialized with an array literal containing
a ``Circle`` instance with a radius of 2 units;
a ``Country`` instance initialized with
the surface area of the United Kingdom in square kilometers;
and an ``Animal`` instance with four legs.

The ``objects`` array can now be iterated,
and each object in the array can be checked to see if
it conforms to the ``HasArea`` protocol:

.. testcode:: protocolConformance

   -> for object in objects {
         if let objectWithArea = object as HasArea {
            println("Area is \(objectWithArea.area)")
         } else {
            println("Something that doesn't have an area")
         }
      }
   !! <REPL Input>:1:5: warning: constant 'object' inferred to have type 'AnyObject', which may be unexpected
   !! for object in objects {
   !!     ^
   !! <REPL Input>:1:5: note: add an explicit type annotation to silence this warning
   !! for object in objects {
   !!     ^
   !!            : AnyObject
   </ Area is 12.5663708
   </ Area is 243610.0
   </ Something that doesn't have an area

Whenever an object in the array conforms to the ``HasArea`` protocol,
the optional value returned by the ``as`` operator is unwrapped with optional binding
into a constant called ``objectWithArea``.
The ``objectWithArea`` constant is known to be of type ``HasArea``,
and so its ``area`` property can be accessed and printed in a type-safe way.

Note that the underlying objects are not changed by the casting process.
They continue to be a ``Circle``, a ``Country`` and an ``Animal``.
However, at the point that they are stored in the ``objectWithArea`` constant,
they are only known to be of type ``HasArea``,
and so only their ``area`` property can be accessed.

.. TODO: This is an *extremely* contrived example.
   Also, it's not particularly useful to be able to get the area of these two objects,
   because there's no shared unit system.
   Also also, I'd say that a circle should probably be a structure, not a class.
   Plus, I'm having to write lots of boilerplate initializers,
   which make the example far less focused than I'd like.
   The problem is, I can't use strings within an @objc protocol
   without also having to import Foundation, so it's numbers or bust, I'm afraid.

.. QUESTION: I'm deliberately choosing to eat the AnyObject warnings here.
   Is this the right approach, given that they will be visible in Xcode too?

.. _Protocols_OptionalProtocolRequirements:

Optional Protocol Requirements
------------------------------

.. TODO: split this section into several subsections as per [Contributor 7746]'s feedback,
   and cover the missing alternative approaches that he mentioned.

.. TODO: you can specify optional subscripts,
   and the way you check for them / work with them is a bit esoteric.
   You have to try and access a value from the subscript,
   and see if the value you get back (which will be an optional)
   has a value or is nil.

Protocols can define :newTerm:`optional requirements`,
which do not have to be implemented by types that conform to the protocol.
Optional requirements are prefixed by the ``@optional`` keyword
as part of the protocol's definition.

Optional protocol requirements can be checked and called with optional chaining,
to cope with the fact that the requirement may not have been implemented
by a type that conforms to the protocol.

You check for an implementation of an optional requirement
by writing a question mark after the name of the requirement when it is called,
such as ``someOptionalMethod?(someArgument)``.
Optional property requirements, and optional method requirements that return a value,
will always return an optional value of the appropriate type when they are accessed or called,
to reflect the fact that the optional requirement may not have been implemented.

.. note::

   Optional protocol requirements can only be specified
   if your protocol is marked with the ``@objc`` attribute.
   Even if you are not interoperating with Objective-C,
   you will still need to mark your protocols with the ``@objc`` attribute
   if you want to specify optional requirements.
   
   Note also that ``@objc`` protocols can only be adopted by classes,
   and not by structures or enumerations.
   If you mark your protocol as ``@objc`` in order to specify optional requirements,
   you will only be able to apply that protocol to class types.

.. QUESTION: is this acceptable wording for this limitation?

.. TODO: remove this note when this limitation is lifted in the future.

The following example defines an integer-counting class called ``Counter``,
which uses an external data source to tell it how much to count by.
This data source is defined by the ``CounterDataSource`` protocol,
which has two optional requirements:

.. testcode:: protocolConformance

   -> @objc protocol CounterDataSource {
         @optional func incrementForCount(count: Int) -> Int
         @optional var fixedIncrement: Int { get }
      }

The ``CounterDataSource`` protocol defines
an optional method requirement called ``incrementForCount``,
and an optional property requirement called ``fixedIncrement``.
These requirements define two different ways for data sources to provide
an appropriate increment amount for a ``Counter`` instance.

.. note::

   Strictly speaking, you can write a custom class
   that conforms to ``CounterDataSource`` without implementing
   *either* of the optional protocol requirements.
   They are both optional, after all.
   This is technically allowed, but wouldn't make for a very good data source.

The ``Counter`` class, defined below,
has an optional ``dataSource`` property of type ``CounterDataSource?``:

.. testcode:: protocolConformance

   -> @objc class Counter {
         var count = 0
         var dataSource: CounterDataSource?
         func increment() {
            if let amount = dataSource?.incrementForCount?(count) {
               count += amount
            } else if let amount = dataSource?.fixedIncrement? {
               count += amount
            }
         }
      }

The ``Counter`` class stores its current value in a variable property called ``count``.
The ``Counter`` class also defines a method called ``increment``,
which increments the ``count`` property every time the method is called.

The ``increment`` method first tries to retrieve an increment amount
by looking for an implementation of the ``incrementForCount`` method on its data source.
The ``increment`` method uses optional chaining to try and call ``incrementForCount``,
and passes the current ``count`` value as the method's single argument.

Note that there are *two* levels of optional chaining at play here.
Firstly, it is possible that ``dataSource`` may be ``nil``,
and so ``dataSource`` has a question mark after its name to indicate that
``incrementForCount`` should only be called if ``dataSource`` is non-nil.
Secondly, even if ``dataSource`` *does* exist,
there is no guarantee that it implements ``incrementForCount``,
because it is an optional requirement.
This is why ``incrementForCount`` is also written with a question mark after its name.

Because the call to ``incrementForCount`` can fail for either of these two reasons,
the call returns an *optional* ``Int`` value.
This is true even though ``incrementForCount`` is defined as returning
a non-optional ``Int`` value in the definition of ``CounterDataSource``.

After calling ``incrementForCount``, the optional ``Int`` that it returns
is unwrapped into a constant called ``amount``, using optional binding.
If the optional ``Int`` does contain a value –
that is, if the delegate and method both exist,
and the method returned a value –
the unwrapped ``amount`` is added onto the stored ``count`` property,
and incrementation is complete.

If it is *not* possible to retrieve a value from the ``incrementForCount`` method –
either because ``dataSource`` is nil,
or because the data source does not implement ``incrementForCount`` –
then the ``increment`` method tries to retrieve a value
from the data source's ``fixedIncrement`` property instead.
The ``fixedIncrement`` property is also an optional requirement,
and so its name is also written using optional chaining with a question mark on the end,
to indicate that the attempt to access the property's value can fail.
As before, the returned value is an optional ``Int`` value,
even though ``fixedIncrement`` is defined as a non-optional ``Int`` property
as part of the ``CounterDataSource`` protocol definition.

Here's a simple ``CounterDataSource`` implementation where the data source
returns a constant value of ``3`` every time it is queried.
It does this by implementing the optional ``fixedIncrement`` property requirement:

.. testcode:: protocolConformance

   -> class ThreeSource: CounterDataSource {
         let fixedIncrement = 3
      }

You can use an instance of ``ThreeSource`` as the data source for a new ``Counter`` instance:

.. testcode:: protocolConformance

   -> var counter = Counter()
   << // counter : Counter = <Counter instance>
   -> counter.dataSource = ThreeSource()
   -> for _ in 1..4 {
         counter.increment()
         println(counter.count)
      }
   </ 3 
   </ 6 
   </ 9 
   </ 12 

The code above creates a new ``Counter`` instance;
sets its data source to be a new ``ThreeSource`` instance;
and calls the counter's ``increment`` method four times.
As expected, the counter's ``count`` property increases by three
each time ``increment`` is called.

Here's a more complex data source called ``TowardsZeroSource``,
which makes a ``Counter`` instance count up or down towards zero
from its current ``count`` value:

.. testcode:: protocolConformance

   -> class TowardsZeroSource: CounterDataSource {
         func incrementForCount(count: Int) -> Int {
            if count == 0 {
               return 0
            } else if count < 0 {
               return 1
            } else {
               return -1
            }
         }
      }

The ``TowardsZeroSource`` class implements
the optional ``incrementForCount`` method from the ``CounterDataSource`` protocol,
and uses the ``count`` argument value to work out which direction to count in.
If ``count`` is already zero, the method returns ``0``
to indicate that no further counting should take place.

You can use an instance of ``TowardsZeroSource`` with the existing ``Counter`` instance
to count from ``-4`` to zero.
Once the counter reaches zero, no more counting takes place:

.. testcode:: protocolConformance

   -> counter.count = -4
   -> counter.dataSource = TowardsZeroSource()
   -> for _ in 1..5 {
         counter.increment()
         println(counter.count)
      }
   </ -3 
   </ -2 
   </ -1 
   </ 0 
   </ 0 

.. Other things to be included:
.. ----------------------------

.. Class-only protocols
.. @obj-c protocols
.. Curried functions in protocols
.. Standard-library protocols such as Sequence, Equatable etc.?
.. Show how to make a custom type conform to LogicValue or some other protocol
.. LogicValue certainly needs to be mentioned in here somewhere
.. Show a protocol being used by an enumeration
.. accessing protocol methods, properties etc. through a constant or variable that is *just* of protocol type
.. Protocols can't be nested, but nested types can implement protocols
.. Protocol requirements can be marked as @unavailable,
   but this currently only works if they are also marked as @objc.
.. Checking for (and calling) optional implementations via optional binding and closures