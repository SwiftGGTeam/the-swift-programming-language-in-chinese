Initialization
==============

:newTerm:`Initialization` is the process of preparing an instance of
a class, structure or enumeration for use.
This involves setting an initial value for any stored properties,
and performing any other setup or initialization that is required
before the new instance is considered ready to for use.

This initialization process is implemented by defining :newTerm:`initializers`,
which are like special methods that can be called
to create a new instance of a particular type.
Instances of class types can also implement a :newTerm:`deinitializer`,
which gives an oppprtunity to perform any custom cleanup that you require to be run
when an instance of that class instance is destroyed.

.. TODO: this chapter seems to have lost its "definite initialization" section.

.. TODO: mention that memory is automatically managed by ARC

.. TODO: mention that you can't construct a class instance from a class metatype value,
   because you can't be sure that a subclass will definitely provide the constructor –
   see doug's notes from r14175 for more info

.. _Initialization_Initializers:

Initializers
------------

:newTerm:`Initializers` are called to create a new instance of a type.
In its simplest form, an initializer is like an instance method with no parameters,
written using the ``init`` keyword:

.. testcode:: fahrenheitInit

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
which initializes the stored temperature with a value of ``32.0``
(the freezing point of water when expressed in the Fahrenheit scale).

Unlike Objective-C, Swift initializers do not return a value.
Their primary role is to ensure that new instances of that type
are correctly initialized before they are used for the first time.

.. _Initialization_DefaultPropertyValues:

Default Property Values
-----------------------

Classes and structures **must** set all of their stored properties
to an appropriate initial value by the time
an instance of that class or structure is created.
Stored properties cannot be left in an indeterminate state.

You can set the initial value of a stored property from within an initializer,
as shown above.
As an alternative, you can provide a :newTerm:`default property value`
as part of the property's declaration.

The ``Fahrenheit`` example can be written in a simpler form
by providing a default value at the point that the property is declared:

.. testcode:: fahrenheitDefault

    --> struct Fahrenheit {
            var temperature = 32.0
        }

If a property should always take the same initial value,
you should always provide a default value as part of the property declaration,
rather than setting its value within an initializer.
The end result is the same,
but the use of a default value ties the property's initialization more closely to its declaration,
and makes for shorter, clearer initializers.
It also enables you to infer the type of the property from its default value, as shown here.
Finally, it makes it easier for you to take advantage of
default initializers and initializer inheritance,
as described later in this chapter.

.. note::
    When you assign a default value to a stored property,
    or set its initial value within an initializer,
    the value of that property is set directly,
    without calling any stored property observers.

.. _Initialization_DefaultInitializers:

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
.. QUESTION: How is this affected by inheritance?
   If I am a subclass of a superclass that defines a designated initializer,
   I (the subclass) presumably don't get a default initializer,
   because I am obliged to delegate up to my parent's default initializer.

.. _Initialization_MemberwiseStructureInitializers:

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. HACK: this is currently duplicated in CustomTypes.

.. TODO: mention that structures and enums can assign a value to self during initialization,
   but classes cannot.

In addition to the default initializers mentioned above,
all instances of structure types have
an automatically-generated :newTerm:`memberwise initializer`,
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
.. TODO: According to rdar://15670604, we may end up with one for classes as well.
   However, I can't find a Radar tracking this directly.

.. _Initialization_InitializerInputParameters:

Initializer Input Parameters
----------------------------

Initializers can take :newTerm:`input parameters`,
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

.. TODO: mention that initializers can be written in either function syntax,
   and show an example in function-style as well as selector-style.

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

Optional Property Values
------------------------

If your custom type has a stored property that cannot be known during initialization,
or that is logically allowed to have “no value yet”,
that property should be declared as having an optional type,
and initialized with a value of ``.None`` as part of its declaration.
This makes it clear that the property is
deliberately intended to have “no value yet” during initialization,
and has not just been left in an indeterminate state.

For example:

.. testcode:: initialization

    --> class SurveyQuestion {
            var text: String
            var response: String? = .None
            init withText(text: String) {
                self.text = text
            }
            func ask() {
                println(text)
            }
        }
    --> let cheeseQuestion = SurveyQuestion(withText: "Do you like cheese?")
    <<< // cheeseQuestion : SurveyQuestion = <SurveyQuestion instance>
    --> cheeseQuestion.ask()
    <-- Do you like cheese?
    --> cheeseQuestion.response = "Yes, I do like cheese."

The response to a survey question cannot be known until it is asked,
and so the ``response`` property is declared as ``String?``, or “optional ``String``”.
It is assigned a default value of ``.None`` as part of its declaration,
meaning “no string yet”.

.. _Initialization_DesignatedAndConvenienceInitializers:

Designated and Convenience Initializers
---------------------------------------

.. write-me::

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
