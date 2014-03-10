Initialization and Inheritance
==============================

.. _InitializationAndInheritance_MemberwiseStructureInitializers:

Memberwise Structure Initializers
---------------------------------

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
.. TODO: Describe the creation of custom initializers.
.. TODO: This whole section needs updating in light of the changes for definite initialization.
   Memberwise initializers will only exist if default values are provided for all properties.

.. _InitializationAndInheritance_Initialization:

Initialization
--------------

Classes and structures must always set their stored properties
to an appropriate initial value by the time that an instance is created.
There are two ways to initialize properties:

1. Provide an :newTerm:`initial value` as part of the property declaration
   (as described in :doc:`Properties`)
2. Provide a value for the property within an :newTerm:`initializer`

.. note::
    If you assign a default value to a property,
    or set its initial value within an initializer,
    the value of that property is set directly, without calling any observers.

.. QUESTION: is this the right place to mention this note?

.. QUESTION: the same is also true for Obj-C KVO observers of the property.
   Is it appropriate to mention that here?

.. QUESTION: is this true once the instance is fully qualified within the initializer?
   To put it another way, is property setting *always* direct in an init?
   (I think the answer is yes.)

.. TODO: mention that memory is automatically managed by ARC

.. _InitializationAndInheritance_Initializers:

Initializers
~~~~~~~~~~~~

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

Swift provides a :newTerm:`default initializer` implementation
for any class or structure that does not provide at least one initializer itself,
if all of the properties declared by that class or structure are assigned
default values as part of their property declaration.
The default initializer simply creates a new instance
with all of its properties set to their default values.
You don't have to declare that you want the default initializer to be implemented –
it is available automatically for all classes and structures without their own initializer.

.. note::
    The default initializer for structures is provided in addition to the
    :ref:`InitializationAndInheritance_MemberwiseStructureInitializers` mentioned earlier in this chapter.
    The default initializer and the memberwise initializer are only provided
    if the structure does not define at least one custom initializer itself.

.. TODO: Add a justification?

Initializers can take optional input parameters,
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

.. _InitializationAndInheritance_DefiniteInitialization:

Definite Initialization
~~~~~~~~~~~~~~~~~~~~~~~

If your class or structure provides one or more custom initializers,
Swift checks these methods to make sure that all properties are fully initialized
by the time each initializer has done its job.
This process is known as :newTerm:`definite initialization`,
and helps to ensure that your instances are always valid before they are used.
Swift will report an error at compile-time if your class or structure does not pass
the definite initialization test.

.. _InitializationAndInheritance_InitializerDelegation:

Initializer Delegation
~~~~~~~~~~~~~~~~~~~~~~

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

.. _InitializationAndInheritance_Deinitializers:

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
meaning “no ``Player`` instance”.
At the point that this happens, the ``Player`` instance referenced by
the ``playerOne`` variable is destroyed.
No other properties or variables are still referring to it,
and so it can be destroyed in order to free up the resources it was using.
Just before this happens, its deinitializer is called,
and its coins are returned to the bank.

.. TODO: switch Bank to be a class rather than a structure
   once we have support for class-level properties.

.. _InitializationAndInheritance_Inheritance:

Inheritance
-----------

Classes can :newTerm:`inherit` methods, properties and other characteristics
from existing classes.
Inheritance is one of the fundamental behaviors that differentiate classes
from other types in Swift.

Here's an example:

.. testcode:: inheritance

    --> class Vehicle {
            var numberOfWheels = 0
            var maxPassengers = 1
            func description() -> String {
                return "\(numberOfWheels) wheels; up to \(maxPassengers) passengers"
            }
        }

This example starts by defining a “base” class called ``Vehicle``.
This base class declares two properties that are universal to all vehicles,
and initializes them with suitable default values.
(It is assumed that any vehicle can carry at least one passenger –
it wouldn't be a very useful vehicle otherwise.)
``Vehicle`` also defines a method called ``description()``,
which returns a ``String`` description of its characteristics.

The next example defines a second, more-specific class, called ``Bicycle``.
This new class is based on the existing capabilities of ``Vehicle``.
The ``Bicycle`` class is defined by placing the name of its base class – ``Vehicle``
– after the name of the new class, separated by a colon. This can be read as:

“Define a new class called ``Bicycle``, which inherits the characteristics of ``Vehicle``”:

.. testcode:: inheritance

    --> class Bicycle : Vehicle {
            init() {
                super.init()
                numberOfWheels = 2
            }
        }

In this example, ``Bicycle`` is said to be a :newTerm:`subclass` of ``Vehicle``, 
and ``Vehicle`` is said to be the :newTerm:`superclass` of ``Bicycle``.
The new ``Bicycle`` class automatically gains all of the characteristics of ``Vehicle``,
and is able to tailor those characteristics (and add new ones) to suit its needs.

.. note::

    Swift classes do not inherit from a universal “base” class.
    Any classes you define without specifying a superclass
    will automatically become base classes for you to build upon.

The ``Bicycle`` class declares an initializer called ``init()``
to set up its tailored characteristics.
This initializer first calls ``super.init()``,
which calls the ``init()`` method for ``Bicycle``\ 's superclass, ``Vehicle``.

Although ``Vehicle`` does not have an explicit initializer itself,
it still has an implicit default initializer,
as described in :ref:`InitializationAndInheritance_Initializers`.
This call to ``super.init()`` triggers ``Vehicle``\ 's default initializer,
and ensures that all of the inherited properties are initialized by ``Vehicle``
before ``Bicycle`` tries to modify them.

The default value of ``maxPassengers`` provided by ``Vehicle`` is already correct for a bicycle,
and so it is not changed within the initializer for ``Bicycle``.
The original value of ``numberOfWheels`` is not correct, however,
and so it is replaced by a new value of ``2``.

If you create an instance of ``Bicycle``, and print its description,
you can see how its properties have been updated:

.. testcode:: inheritance

    --> let bicycle = Bicycle()
    <<< // bicycle : Bicycle = <Bicycle instance>
    --> println("Bicycle: \(bicycle.description())")
    <-- Bicycle: 2 wheels; up to 1 passengers

.. TODO: work out how best to describe super.init() in light of the next section below.

Subclasses can themselves be subclassed, as shown in the next example:

.. testcode:: inheritance

    --> class Tandem : Bicycle {
            init() {
                super.init()
                maxPassengers = 2
            }
        }

This example creates a subclass of ``Bicycle`` for a two-seater bicycle
(known as a “tandem”).
``Tandem`` inherits all of the characteristics of ``Bicycle``,
which in turn inherits from ``Vehicle``.
``Tandem`` doesn't change the number of wheels – it's still a bicycle, after all –
but it does update ``maxPassengers`` to have the correct value for a tandem.

.. note::

    Subclasses are only allowed to modify
    *variable* properties of superclasses during initialization.
    Inherited constant properties may not be modified by subclasses.

Again, if you create an instance of ``Tandem``, and print its description,
you can see how its properties have been updated:

.. testcode:: inheritance

    --> let tandem = Tandem()
    <<< // tandem : Tandem = <Tandem instance>
    --> println("Tandem: \(tandem.description())")
    <-- Tandem: 2 wheels; up to 2 passengers

Note that the ``description()`` method has also been inherited
by ``Bicycle`` and ``Tandem``.
Instance methods of a class are inherited by any and all subclasses of that class.

.. QUESTION: Should I mention that you can subclass from NSObject?

.. _InitializationAndInheritance_OverridingInstanceMethods:

Overriding Instance Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A subclass can provide its own custom implementation of an instance method
that it would otherwise inherit from a superclass.
This is known as :newTerm:`overriding` the method.

If you define a subclass method that overrides a superclass method,
you must prefix the overriding method definition with the ``@override`` attribute.
This makes it clear that you intended to provide an override,
and did not just accidentally provide a method with
the same name, parameter types and return type by mistake.
(Accidentally overriding a method can cause unexpected behavior,
and method overriding without the ``@override`` attribute is
diagnosed as an error when your code is compiled.)

In addition, the ``@override`` attribute prompts the Swift compiler
to check that the superclass has a method declaration that matches
the one you have provided.
This helps to ensure that your overriding method definition is correct,
and has not used an incorrect name, type or parameter order by mistake.

.. QUESTION: have I introduced the concept of "attributes" by this point?
   If not, when / where should I do so?

For example:

.. testcode:: inheritance

    --> class Car : Vehicle {
            var isConvertible: Bool = false
            init() {
                super.init()
                maxPassengers = 5
                numberOfWheels = 4
            }
            @override func description() -> String {
                return super.description() + "; "
                    + (isConvertible ? "convertible" : "not convertible")
            }
        }
    --> var car = Car()
    <<< // car : Car = <Car instance>
    --> println("Car: \(car.description())")
    <-- Car: 4 wheels; up to 5 passengers; not convertible

This example declares a new subclass of ``Vehicle``, called ``Car``.
``Car`` declares a new Boolean property called ``isConvertible``,
in addition to the properties it inherits from ``Vehicle``.
This property defaults to ``false``, as most cars are not convertibles.
``Car`` also has a custom initializer,
which sets the maximum number of passengers to ``5``,
and the default number of wheels to ``4``.

``Car`` then overrides its inherited ``description()`` method.
It does this by defining a function with the same declaration as
the one it would otherwise inherit,
prefixed by the ``@override`` attribute.
Rather than providing a completely custom implementation of ``description()``,
it actually starts by calling ``super.description()`` to retrieve
the description provided by its superclass.
It then appends some additional information onto the end,
and returns the complete description.

.. TODO: provide more information about function signatures,
   and what does / does not make them unique.
   For example, the parameter names do not have to match
   in order for a function to override a similar signature in its parent.
   (This is true for both of the function declaration syntaxes.)

.. note::

    Overriding of properties is not yet implemented.

.. _InitializationAndInheritance_SubclassingAndInitializerDelegation:

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

.. _InitializationAndInheritance_DynamicReturnTypes:

Dynamic Return Types
~~~~~~~~~~~~~~~~~~~~

.. write-me::

.. TODO: mention that methods can return DynamicSelf (a la instancetype)
.. TODO: include the several tricks seen in swift/test/decl/func/dynamic_self.swift

.. _InitializationAndInheritance_TypeCasting:

Type Casting
------------

It is sometimes necessary to check the specific class of an instance
in order to decide how it should be used.
It can also be necessary to treat a specific instance as if it is a different
superclass or subclass from its own class hierarchy.
Both of these tasks are achieved using :newTerm:`type casting`.

.. TODO: the wording of this para is unclear in its use of pronouns.

The next few code snippets define three classes,
and an array containing instances of those classes,
for use in an example of type casting.

The first snippet defines a new base class called ``MediaItem``.
This class provides basic functionality for any kind of item that might appear
in a digital media library.
Specifically, it declares a ``name`` property of type ``String``,
and an ``init withName()`` initializer.
(It is assumed that all media items, including all movies and songs, will have a name.)

.. testcode:: typeCasting

    --> class MediaItem {
            var name: String
            init withName(name: String) {
                self.name = name
            }
        }

The next snippet defines two subclasses of ``MediaItem``.
The first subclass, ``Movie``, encapsulates additional information about a movie or film.
It adds a ``director`` property on top of the base ``MediaItem`` class,
with a corresponding initializer.
The second subclass, ``Song``, adds an ``artist`` property and initializer
on top of the base class:

.. testcode:: typeCasting

    --> class Movie : MediaItem {
            var director: String
            init withName(name: String) director(director: String) {
                self.director = director
                super.init(withName: name)
            }
        }
    --> class Song : MediaItem {
            var artist: String
            init withName(name: String) artist(artist: String) {
                self.artist = artist
                super.init(withName: name)
            }
        }

Because ``Movie`` and ``Song`` are both subclasses of ``MediaItem``,
their instances can be used wherever a ``MediaItem`` instance can be used:

.. testcode:: typeCasting

    --> var library = Array<MediaItem>()
    <<< // library : Array<MediaItem> = []
    --> library.append(Movie("Casablanca", director: "Michael Curtiz"))
    --> library.append(Song("Blue Suede Shoes", artist: "Elvis Presley"))
    --> library.append(Movie("Citizen Kane", director: "Orson Welles"))
    --> library.append(Song("The One And Only", artist: "Chesney Hawkes"))
    --> library.append(Song("Never Gonna Give You Up", artist: "Rick Astley"))

The snippet above declares and initializes a new empty array called ``library``,
which is declared as an ``Array`` of type ``MediaItem``.
This means that it can only accept instances that are of type ``MediaItem``.

The snippet then appends some ``Movie`` and ``Song`` instances to the ``library`` array.
A ``Movie`` or a ``Song`` is also a ``MediaItem``,
and so an instance of either class can be added to the array.

.. note::

    The ``withName:`` selector has been left out of each of these initializer calls, for brevity.
    The initializers for ``Movie`` and ``Song`` both have their ``name`` value as the first parameter,
    and it is clear from the context that this is the correct initializer to use.
    As a result, leaving out the ``withName:`` selector does not cause any ambiguity.

.. _InitializationAndInheritance_CheckingType:

Checking Type
~~~~~~~~~~~~~

You can check whether an instance is of a certain type by using the ``is`` operator:

.. testcode:: typeCasting

    --> var movieCount = 0
    <<< // movieCount : Int = 0
    --> var songCount = 0
    <<< // songCount : Int = 0
    --> for item in library {
            if item is Movie {
                ++movieCount
            } else if item is Song {
                ++songCount
            }
        }
    --> println("Media library contains \(movieCount) movies and \(songCount) songs")
    <-- Media library contains 2 movies and 3 songs

This example iterates through all of the items in the ``library`` array.
On each pass, the ``for``-``in`` loop sets the ``item`` constant
to the next ``MediaItem`` in the array.

``item is Movie`` returns ``true`` if the current ``MediaItem``
is an instance of the ``Movie`` type, and ``false`` if it is not.
Similarly, ``item is Song`` checks to see if the item is a ``Song`` instance.
At the end of the ``for``-``in`` loop, the values of ``movieCount`` and ``songCount``
contain a count of how many ``MediaItem`` instances were found of each type.

.. QUESTION: is it correct to refer to 'is' and 'as' as 'operators'?
   Or is there some better name we could use?

.. _InitializationAndInheritance_Downcasting:

Downcasting
~~~~~~~~~~~

A constant or variable of a certain class type may actually refer to
an instance of a subclass behind the scenes. Where this is the case,
you can try and :newTerm:`downcast` to the subclass using the ``as`` operator:

.. testcode:: typeCasting

    --> for item in library {
            if let movie = item as Movie {
                println("Movie: '\(movie.name)', dir. \(movie.director)")
            } else if let song = item as Song {
                println("Song: '\(song.name)', by \(song.artist)")
            }
        }
    <-/ Movie: 'Casablanca', dir. Michael Curtiz
    <-/ Song: 'Blue Suede Shoes', by Elvis Presley
    <-/ Movie: 'Citizen Kane', dir. Orson Welles
    <-/ Song: 'The One And Only', by Chesney Hawkes
    <-/ Song: 'Never Gonna Give You Up', by Rick Astley

This example iterates over each ``MediaItem`` in ``library``,
and prints an appropriate description for each one.
To do this, it needs to access each item as if it is a true ``Movie`` or ``Song``,
and not just a generic ``MediaItem``.
This is necessary in order for it to be able to access
the ``director`` or ``artist`` property for use in the description.

The example starts by trying to downcast the current ``item`` as a ``Movie``.
Because ``item`` is a ``MediaItem`` instance, it's possible that it *might* be a ``Movie``;
equally, it's also possible that it might a ``Song``,
or even just a base ``MediaItem``.
Because of this uncertainty, the ``as`` operator returns an *optional* value
when attempting to downcast to a subclass type.
The result of ``item as Movie`` is of type ``Movie?``, or “optional ``Movie``”.

Downcasting to ``Movie`` will fail when trying to downcast
the two ``Song`` instances in the library array.
To cope with this, the example above uses :ref:`BasicTypes_OptionalBinding`
to check whether the optional ``Movie`` actually contains a value
(i.e. to find out whether the downcast succeeded.)
This optional binding is written “``if let movie = item as Movie``”,
which can be read as:

“Try and access ``item`` as a ``Movie``.
If this is successful,
set a new temporary constant called ``movie`` to
the value stored in the returned ``Movie?`` optional.”

If the downcasting succeeds, the properties of ``movie`` are then used
to print a description for that ``Movie`` instance, including the name of its ``director``.
A similar principle is used to check for ``Song`` instances,
and to print an appropriate description (including ``artist`` name)
whenever a ``Song`` is found in the library.

.. note::

    Casting does not actually modify the instance, or change its values.
    The underlying instance remains the same; it is just treated and accessed
    as an instance of the type to which it has been cast.

.. TODO: casting also needs to be mentioned in the context of protocol conformance.

.. TODO: talk about the use of "as" outside of an "if" statement sense,
   once rdar://16063985 is fixed.

.. TODO: this section needs to address the question of "a named value having a type"
   as distinct from "a class instance having a type".
   This is also relevant in a protocol context.

.. QUESTION: should I mention upcasting here?
   I can't think of an example where it's useful.
   However, it does display different behavior from downcasting,
   in that upcasting always works, and so it doesn't return an optional.
   