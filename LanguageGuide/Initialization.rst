Initialization
==============

.. write-me::

Classes and structures must always set their stored properties
to an appropriate initial value by the time that an instance is created.
There are two ways to initialize properties:

1. Provide an :newTerm:`initial value` as part of the property declaration
   (as described in :doc:`Properties`)
2. Provide a value for the property within an :newTerm:`initializer`

.. note::
    If you assign a default value to a stored property,
    or set its initial value within an initializer,
    the value of that property is set directly,
    without calling any stored property observers.

.. QUESTION: is this the right place to mention this note?

.. QUESTION: the same is also true for Obj-C KVO observers of the property.
   Is it appropriate to mention that here?

.. QUESTION: is this true once the instance is fully qualified within the initializer?
   To put it another way, is property setting *always* direct in an init?
   (I think the answer is yes.)

.. TODO: mention that memory is automatically managed by ARC

.. _Initialization_Initializers:

Initializers
------------

:newTerm:`Initializers` are called when a new instance of your type is created.
In its simplest form, an initializer is like an instance method with no parameters,
written using the ``init`` keyword:

.. testcode:: initialization

    --> struct Fahrenheit {
            var temperature: Double
            init() {
                temperature = 32.0
            }
        }
    --> var f = Fahrenheit()
    <<< // f : Fahrenheit = Fahrenheit(32.0)
    --> println("The default temperature is \(f.temperature)° Fahrenheit")
    <-- The default temperature is 32.0° Fahrenheit

This example defines a new structure to store temperatures expressed in the Fahrenheit scale.
The structure has one stored property, ``temperature``, which is of type ``Double``.
The structure defines a single initializer, ``init()``, with no parameters,
which initializes the stored temperature value to ``32.0``
(the freezing point of water when expressed in the Fahrenheit scale).

Initializers always begin with ``init``.
Unlike Objective-C, Swift initializers do not return a value.
Their primary role is to ensure that new instances of that type
are correctly initialized before they are used for the first time.

As an alternative, this example could have been written
by providing a default value at the point that the property is declared:

.. testcode:: initialization

    --> struct AnotherFahrenheit {
            var temperature: Double = 32.0
        }

If a property should always taken the same initial value,
it is preferable to set this value as a default when the property is declared,
as in the ``AnotherFahrenheit`` example.
The end result –
a default value of ``32.0`` for ``temperature`` when a new instance is created –
is the same in both cases.

Default Initializers
--------------------

Swift provides a :newTerm:`default initializer` implementation
for any class or structure that does not provide at least one initializer itself,
if all of the properties declared by that class or structure are assigned
default values as part of their property declaration.
The default initializer simply creates a new instance
with all of its properties set to their default values.
You don't have to declare that you want the default initializer to be implemented –
it is available automatically for all classes and structures without their own initializer.

.. TODO: show an example.

.. _Initialization_MemberwiseStructureInitializers:

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. HACK: this is currently duplicated in CustomTypes.

.. TODO: mention that structures and enums can assign a value to self during initialization,
   but classes cannot.

All structures have an automatically-generated :newTerm:`memberwise initializer`,
which can be used to initialise the member properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name:

.. testcode:: classesAndStructures

    --> struct Size {
            var width = 0.0, height = 0.0
        }
    --> let twoByTwo = Size(width: 2.0, height: 2.0)
    <<< // twoByTwo : Size = Size(2.0, 2.0)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the structure's definition:

.. testcode:: classesAndStructures

    --> let fourByThree = Size(4.0, 3.0)
    <<< // fourByThree : Size = Size(4.0, 3.0)

.. TODO: Include a justifiable reason for why classes do not provide a memberwise initializer.

.. _Initialization_InitializerInputParameters:

Initializer Input Parameters
----------------------------

Initializers can also take :newTerm:`input parameters`,
to customize the initialization process.
The following example defines a structure to store temperatures expressed in the Celsius scale.
It implements two custom initializers,
each of which initializes a new instance of the structure
with a value from a different temperature scale:

.. testcode:: initialization

    --> struct Celsius {
            var temperatureInCelsius: Double = 0.0
            init withFahrenheit(fahrenheit: Double) {
                temperatureInCelsius = (fahrenheit - 32.0) / 1.8
            }
            init withKelvin(kelvin: Double) {
                temperatureInCelsius = kelvin + 273.15
            }
        }
    --> var boilingPointOfWater = Celsius(withFahrenheit: 212.0)
    <<< // boilingPointOfWater : Celsius = Celsius(100.0)
    /-> boilingPointOfWater.temperatureInCelsius is \(boilingPointOfWater.temperatureInCelsius)
    <-/ boilingPointOfWater.temperatureInCelsius is 100.0
    --> var freezingPointOfWater = Celsius(withKelvin: -273.15)
    <<< // freezingPointOfWater : Celsius = Celsius(0.0)
    /-> freezingPointOfWater.temperatureInCelsius is \(freezingPointOfWater.temperatureInCelsius)
    <-/ freezingPointOfWater.temperatureInCelsius is 0.0

.. TODO: mention that initializers can be written in either function syntax.

The value of a constant ``let`` property can be modified at any point during initialization,
as long as is is definitely set to a value by the time the initializer has finished:

.. testcode:: initialization

    --> struct Temperature {
            let storedValue: Double
            let storedScale: String
            init withValue(value: Double) inScale(scale: String) {
                storedValue = value
                storedScale = scale
            }
            func toKelvin() -> Double {
                switch storedScale {
                    case "F": // Fahrenheit
                        return (storedValue - 32.0) / 1.8
                    case "C": // Celsius
                        return storedValue + 273.15
                    default:  // assume Kelvin otherwise
                        return storedValue
                }
            }
        }
    --> var absoluteZero = Temperature(withValue: -273.15, inScale: "C")
    <<< // absoluteZero : Temperature = Temperature(-273.15, "C")
    --> println("Temperature is \(absoluteZero.toKelvin())°K")
    <-- Temperature is 0.0°K

.. TODO: This could do with a more elegant example.

.. _Initialization_InitializerDelegation:

Initializer Delegation
----------------------

Initializers can :newTerm:`delegate` some or all of the task of initialization to
other initializers within the same class or structure by calling ``self.init``.
The code below defines a ``Document`` class,
which uses a default ``title`` value of ``[untitled]`` if none is specified:

.. testcode:: initializerDelegation

    --> class Document {
            var title: String
            init withTitle(title: String) {
                self.title = title
            }
            init() {
                self.init(withTitle: "[untitled]")
            }
        }

This first example declares a new constant called ``thisBook``,
and sets it to the result of calling ``init withTitle()`` for a specific title string:

.. testcode:: initializerDelegation

    --> let thisBook = Document(withTitle: "The Swift Programming Language")
    <<< // thisBook : Document = <Document instance>
    --> println("This book is called '\(thisBook.title)'")
    <-- This book is called 'The Swift Programming Language'

This second example declares a new constant called ``someBook``,
and sets it to the result of the basic ``init()`` method for ``Document``.
This method delegates to the more detailed ``init withTitle()`` method,
passing it a placeholder string value of ``[untitled]``:

.. testcode:: initializerDelegation

    --> let someBook = Document()
    <<< // someBook : Document = <Document instance>
    --> println("Some unknown book is called '\(someBook.title)'")
    <-- Some unknown book is called '[untitled]'

Both of these initializers ensure that the value of ``title``
is set to a valid string before the initializer ends.
This means that the ``Document`` class passes the definite initialization test mentioned above.

.. _Initialization_SubclassingAndInitializerDelegation:

Subclassing and Initializer Delegation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift classes do not automatically inherit initializers from their parent classes.
This behavior is different from Objective-C, where initializers are inherited by default.
Swift's avoidance of automatic initializer inheritance ensures that
subclasses are able to control exactly how they can be instantiated.

To help with this,
Swift inserts an implicit call to ``super.init()``
at the end of any subclass initializer
that does not either call a superclass initializer itself,
or hand off to a same-class initializer that ultimately calls a superclass initializer.
This ensures that properties of the parent class
(and so on up the chain)
still get instantiated,
even if an explicit superclass initializer is not called.

The example below defines a new subclass of ``Document``, called ``TextDocument``.
This subclass adds an additional string property called ``bodyText``,
which is given a default value of ``[replace me]``.

``TextDocument`` provides four ways for a new text document to be initialized:

* ``init()``, passing in no specific values
* ``init withTitle()``, passing in a specific title but no body text
* ``init withText()``, passing in some specific body text but no title
* ``init withTitle() text()``, passing in a specific title and body text

Here's how it looks in Swift code:

.. testcode:: initializerDelegation

    --> class TextDocument : Document {

            var bodyText: String = "[replace me]"

            init() {}

            init withTitle(title: String) {
                super.init(withTitle: title)
            }

            init withText(text: String) {
                bodyText = text
            }

            init withTitle(title: String) text(text: String) {
                self.init(withTitle: title)
                bodyText = text
            }

        }

The first initializer, ``init()``, takes no parameters at all.
The curly braces after the parentheses define an empty code block for the method:

::

    init() {}

Despite having an empty code block,
this method still creates a new ``TextDocument`` instance with a default title and text.
The default value of ``bodyText`` comes from the ``bodyText`` property declaration,
and the default value of ``title`` comes from Swift inserting an implicit call to ``super.init()``
at the end of this empty code block.

Here's how this initializer could be called:

.. testcode:: initializerDelegation

    --> let empty = TextDocument()
    <<< // empty : TextDocument = <TextDocument instance>
    --> println("\(empty.title):\n\(empty.bodyText)")
    <-/ [untitled]:
    <-/ [replace me]

``TextDocument`` does not actually do any custom initialization inside its empty ``init()`` method.
However, it is still necessary to provide an empty definition
in order to be able to call ``TextDocument()``.
Because ``TextDocument`` defines its own initializers,
it does not get a default initializer implementation for ``init()``.
Providing an empty ``init()`` definition means that there is
still an ``init()`` method to call when a new document is created via basic initializer syntax.

The second initializer, ``init withTitle()``,
calls the superclass ``init withTitle()`` method from ``Document``,
and passes in the new value of ``title``:

::

    init withTitle(title: String) {
        super.init(withTitle: title)
    }

As before, the value of ``bodyText`` comes from the property's default value.

Here's how this initializer could be called:

.. testcode:: initializerDelegation

    --> let titled = TextDocument(withTitle: "Write something please")
    <<< // titled : TextDocument = <TextDocument instance>
    --> println("\(titled.title):\n\(titled.bodyText)")
    <-/ Write something please:
    <-/ [replace me]

The third initializer, ``init withText()``,
sets the ``bodyText`` property to a new ``text`` value:

::

    init withText(text: String) {
        bodyText = text
    }

Because it doesn't call a superclass initializer,
Swift inserts an implicit ``super.init()`` call at the end of the method.
This calls the ``init()`` method of the ``Document`` class,
which in turn calls the ``init withTitle()`` method of the ``Document`` class
and sets the same placeholder title as before.

Here's how this initializer could be called:

.. testcode:: initializerDelegation

    --> let untitledPangram = TextDocument(
        withText: "Amazingly few discotheques provide jukeboxes")
    <<< // untitledPangram : TextDocument = <TextDocument instance>
    --> println("\(untitledPangram.title):\n\(untitledPangram.bodyText)")
    <-/ [untitled]:
    <-/ Amazingly few discotheques provide jukeboxes

The final initializer, ``init withTitle() text()``,
starts by delegating across to the ``init withTitle()`` method
provided by ``TextDocument`` itself.
This in turn delegates up to the ``init withTitle()`` method of the superclass (``Document``).
It then sets ``bodyText`` to the new ``text`` value.

::

    init withTitle(title: String) text(text: String) {
        self.init(withTitle: title)
        bodyText = text
    }

There's no reason why ``TextDocument`` couldn't have called up to
the ``init withTitle()`` method of ``Document`` directly.
The decision to delegate to its *own* ``init withTitle()`` method is mainly a design choice.
If ``TextDocument`` were to gain new functionality in the future –
perhaps to insert and update the title at the start of the body text –
then this functionality would typically be added in its own ``init withTitle()`` method.
Delegating to its own implementation of the method,
rather than straight up to the parent method,
helps to plan for functionality changes in the future.

Here's how this final initializer could be called:

.. testcode:: initializerDelegation

    --> let foxPangram = TextDocument(
            withTitle: "Quick brown fox",
            text: "The quick brown fox jumped over the lazy dog")
    <<< // foxPangram : TextDocument = <TextDocument instance>
    --> println("\(foxPangram.title):\n\(foxPangram.bodyText)")
    <-/ Quick brown fox:
    <-/ The quick brown fox jumped over the lazy dog

.. TODO: Illustrate how the order of things matters when inserting calls to super.init

.. _Initialization_DynamicReturnTypes:

Dynamic Return Types
--------------------

.. write-me::

.. TODO: mention that methods can return a value of type Self (a la instancetype)
.. TODO: include the several tricks seen in swift/test/decl/func/dynamic_self.swift
.. TODO: find a good place to mention that instance methods can
   return self(withInt: 5) to call their own type's initializer
.. QUESTION: does this section go here, or in Inheritance, or somewhere else?
   I want to put it in Inheritance,
   but in practice I think it's most likely to be used for factory methods,
   which are more akin to initialization.

.. _Initialization_Deinitializers:

Deinitializers
--------------

A :newTerm:`deinitializer` is called just before a class instance is destroyed.
Deinitializers are written with the ``deinit`` keyword,
in a similar way to how intializers are written with the ``init`` keyword.
Deinitializers are only available on class types.

Swift automatically destroys your instances when they are no longer needed,
to free up resources.
Swift handles the memory management of instances via
:newTerm:`automatic reference counting` (known as :newTerm:`ARC`),
and so there is normally no need to perform any clean-up when your instances are destroyed.
However, there may be times when you are working with your own resources,
and need to perform some additional clean-up yourself.
For example, if you create a custom class to open a file and write some data to it,
you might need to close the file before the class instance is destroyed.

Class definitions can have at most one deinitializer per class.
The deinitializer does not take any parameters,
and is written without parentheses:

::

    deinit {
        // perform the deinitialization
    }

Deinitializers are called automatically, just before instance destruction takes place.
You are not allowed to call ``super.deinit`` yourself.
Superclass deinitializers are inherited by their subclasses,
and the superclass deinitializer is called automatically at the end of
a subclass deinitializer implementation.
Superclass deinitializers are always called,
even if a subclass does not provide its own deinitializer.

.. TODO: note that this is true even if your subclass doesn't actually provide
   an explicit deinitializer itself.

Because the instance has not yet been destroyed,
a deinitializer can access all of the properties of the instance it is called on,
and can modify its behavior based on those properties
(such as looking up the name of a file that needs to be closed).

Here's an example of ``deinit`` in action.
This example defines two new types, ``Bank`` and ``Player``, for a simple game.
The ``Bank`` structure manages a made-up currency,
which can never have more than 10,000 coins in circulation.
There can only ever be one ``Bank`` in the game,
and so the ``Bank`` is implemented as a structure with static properties and methods
to store and manage its current state:

.. testcode:: deinitializer

    --> struct Bank {
            static var coinsInBank = 10_000
            static func vendCoins(var numberOfCoinsToVend: Int) -> Int {
                numberOfCoinsToVend = min(numberOfCoinsToVend, coinsInBank)
                coinsInBank -= numberOfCoinsToVend
                return numberOfCoinsToVend
            }
            static func receiveCoins(coins: Int) {
                coinsInBank += coins
            }
        }

``Bank`` keeps track of the current number of coins it holds via its ``coinsInBank`` property.
It also offers two methods – ``vendCoins()`` and ``receiveCoins()`` –
to handle the distribution and collection of coins.

``vendCoins()`` checks that there are enough coins in the bank before handing any out.
If there are not enough coins, it returns a smaller number than the number that was requested
(and may even return zero if there are no coins left in the bank at all).
It declares ``numberOfCoinsToVend`` as a variable parameter,
so that the number can be modified within the method's body
without needing to declare a new variable.
It returns an integer value to indicate the actual number of coins that were vended.

The ``receiveCoins()`` method simply adds the received number of coins back into the bank's coin store.

The ``Player`` class describes a player in the game.
Each player has a certain number of coins stored in their purse at any time.
This is represented by the player's ``coinsInPurse`` property:

.. testcode:: deinitializer

    --> class Player {
            var coinsInPurse: Int
            init withCoins(coins: Int) {
                coinsInPurse = Bank.vendCoins(coins)
            }
            func winCoins(coins: Int) {
                coinsInPurse += Bank.vendCoins(coins)
            }
            deinit {
                Bank.receiveCoins(coinsInPurse)
            }
        }

Each ``Player`` instance is initialized with a starting allowance of
some specified number of coins from the bank during initialization
(although it may receive fewer than that number, if not enough are available).

The ``Player`` class defines a ``winCoins()`` method,
which tries to retrieve a certain number of coins from the bank
and add them to the player's purse.
The ``Player`` class also implements a deinitializer,
which is called just before a ``Player`` instance is destroyed.
Here, the deinitializer simply returns all of the player's coins to the bank.

Here's how that looks in action:

.. testcode:: deinitializer

    --> var playerOne: Player? = Player(withCoins: 100)
    <<< // playerOne : Player? = <unprintable value>
    --> println("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
    <-- A new player has joined the game with 100 coins
    --> println("There are now \(Bank.coinsInBank) coins left in the bank")
    <-- There are now 9900 coins left in the bank

A new ``Player`` instance is created, with a request for 100 coins if they are available.
This ``Player`` instance is stored in an optional ``Player`` variable called ``playerOne``.
An optional variable is used here, because players can leave the game at any point.
Using an optional gives a way to keep track of whether there is currently a player in the game.

Because ``playerOne`` is an optional, it is qualified with an exclamation mark (``!``)
when its ``coinsInPurse`` property is accessed to print its default number of coins,
and whenever its ``winCoins()`` method is called:

.. testcode:: deinitializer

    --> playerOne!.winCoins(2_000)
    --> println("PlayerOne won 2000 coins & now has \(playerOne!.coinsInPurse) coins")
    <-- PlayerOne won 2000 coins & now has 2100 coins
    --> println("The bank now only has \(Bank.coinsInBank) coins left")
    <-- The bank now only has 7900 coins left

Here, the player has won 2,000 coins.
Their purse now contains 2,100 coins,
and the bank only has 7,900 coins left.

.. testcode:: deinitializer

    --> playerOne = .None
    --> println("PlayerOne has left the game")
    <-- PlayerOne has left the game
    --> println("The bank now has \(Bank.coinsInBank) coins")
    <-- The bank now has 10000 coins

The player has now left the game.
This is indicated by setting the optional ``playerOne`` variable to ``.None``,
meaning “no ``Player`` instance.”
At the point that this happens, the ``Player`` instance referenced by
the ``playerOne`` variable is destroyed.
No other properties or variables are still referring to it,
and so it can be destroyed in order to free up the resources it was using.
Just before this happens, its deinitializer is called,
and its coins are returned to the bank.

.. TODO: switch Bank to be a class rather than a structure
   once we have support for class-level properties.
