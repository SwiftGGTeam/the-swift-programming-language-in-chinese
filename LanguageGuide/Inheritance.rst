Inheritance
===========

Classes can :newTerm:`inherit` methods, properties and other characteristics
from existing classes.
Inheritance is one of the fundamental behaviors that differentiate classes
from other types in Swift.

Here's an example:

.. testcode:: inheritance

   -> class Vehicle {
         var numberOfWheels: Int
         var maxPassengers: Int
         func description() -> String {
            return "\(numberOfWheels) wheels; up to \(maxPassengers) passengers"
         }
         init() {
            numberOfWheels = 0
            maxPassengers = 1
         }
      }

This example starts by defining a “base” class called ``Vehicle``.
This base class declares two properties
(``numberOfWheels`` and ``maxPassengers``)
that are universal to all vehicles.
These properties are used by a method called ``description``,
which returns a ``String`` description of the vehicle's characteristics.

.. QUESTION: this example doesn't really need an initializer.
   I could just as easily set the values as part of the property declaration.
   However, I'd then need to explain all about default initializers,
   and I don't really want to do that in this chapter.
   Is this the right approach?
   Should I mention the alternative (set at declaration) as well?

The ``Vehicle`` class also defines an :newTerm:`initializer`
to set up its properties.
Initializers are described in detail in :doc:`Initialization`,
but a brief introduction is required here in order to illustrate
how inherited properties can be modified.

Initializers are special methods that are called whenever a new instance of a type is created.
Initializers prepare each new instance for use,
and ensure that all of the instance's properties have valid initial values.

In its simplest form, an initializer is like an instance method with no parameters,
written using the ``init`` keyword:

::

   init() {
      // perform some initialization here
   }

This simple initializer is called whenever a new instance is created
via :newTerm:`initialization syntax`
(written as ``TypeName`` followed by empty parentheses):

.. testcode:: inheritance

   -> let someVehicle = Vehicle()
   << // someVehicle : Vehicle = <Vehicle instance>

The initializer for ``Vehicle`` sets some initial property values
(``numberOfWheels = 0`` and ``maxPassengers = 1``)
for an arbitrary vehicle.
(It is assumed that any vehicle can carry at least one passenger –
it wouldn't be a very useful vehicle otherwise.)

The ``Vehicle`` class defines common characteristics for an arbitrary vehicle,
but is not much use in itself.
To make it more useful,
it needs to be refined to describe more specific kinds of vehicle.

The next example defines a second, more specific vehicle called ``Bicycle``.
This new class is based on the existing capabilities of ``Vehicle``.
This is indicated by placing the name of the class it builds upon (``Vehicle``)
after its own name (``Bicycle``), separated by a colon.
This can be read as:

“Define a new class called ``Bicycle``, which inherits the characteristics of ``Vehicle``”:

.. testcode:: inheritance

   -> class Bicycle : Vehicle {
         init() {
            super.init()
            numberOfWheels = 2
         }
      }

``Bicycle`` is said to be a :newTerm:`subclass` of ``Vehicle``, 
and ``Vehicle`` is said to be the :newTerm:`superclass` of ``Bicycle``.
The new ``Bicycle`` class automatically gains all of the characteristics of ``Vehicle``,
and is able to tailor those characteristics (and add new ones) to suit its needs.

.. QUESTION: this isn't quite true.
   Bicycle doesn't inherit Vehicle's initializer, because it provides its own.
   Does this matter for the purposes of this description?

The ``Bicycle`` class also defines an initializer
to set up its tailored characteristics.
The initializer for ``Bicycle`` starts by calling ``super.init()``.
This calls the initializer for ``Bicycle``\ 's superclass, ``Vehicle``,
and ensures that all of the inherited properties are initialized by ``Vehicle``
before ``Bicycle`` tries to modify them.

The default value of ``maxPassengers`` provided by ``Vehicle`` is already correct for a bicycle,
and so it is not changed within the initializer for ``Bicycle``.
The original value of ``numberOfWheels`` is not correct, however,
and is replaced with a new value of ``2``.

As well as inheriting the properties of ``Vehicle``,
``Bicycle`` also inherits its methods.
If you create an instance of ``Bicycle``,
you can call its inherited ``description`` method,
and see how its properties have been updated:

.. testcode:: inheritance

   -> let bicycle = Bicycle()
   << // bicycle : Bicycle = <Bicycle instance>
   -> println("Bicycle: \(bicycle.description())")
   </ Bicycle: 2 wheels; up to 1 passengers

Subclasses can themselves be subclassed:

.. testcode:: inheritance

   -> class Tandem : Bicycle {
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

   -> let tandem = Tandem()
   << // tandem : Tandem = <Tandem instance>
   -> println("Tandem: \(tandem.description())")
   </ Tandem: 2 wheels; up to 2 passengers

Note that the ``description`` method has also been inherited by ``Tandem``.
Instance methods of a class are inherited by any and all subclasses of that class.

.. note::

   Swift classes do not inherit from a universal “base” class.
   Any classes you define without specifying a superclass
   will automatically become base classes for you to build upon.

.. QUESTION: Should I mention that you can subclass from NSObject?

.. _Inheritance_Overriding:

Overriding
----------

A subclass can provide its own custom implementation of
an instance method, class method, instance property, class property, or subscript
that it would otherwise inherit from a superclass.
This is known as :newTerm:`overriding`.

Whenever you override something that would overwise be inherited,
you must prefix your overriding definition with the ``override`` keyword.
This makes it clear that you intended to provide an override,
and did not just accidentally provide a matching definition by mistake.
Overriding by accident can cause unexpected behavior,
and any overrides without the ``override`` keyword are
diagnosed as an error when your code is compiled.
(The definition you have accidentally overridden may not have been provided
by your subclass's immediate superclass –
it may have been inherited from another superclass further up the chain.)

In addition, the ``override`` keyword prompts the Swift compiler
to check that the superclass has a declaration that matches
the one you have provided.
This helps to ensure that your overriding definition is correct.

.. _Inheritance_AccessingSuperclass:

Accessing Superclass Methods, Properties, and Subscripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can access the superclass version of a method, property, or subscript
by using the ``super`` prefix. For example:

* An overridden method called ``someMethod`` can call the superclass version of itself
  by calling ``super.someMethod()`` within the overriding method implementation.
* A overridden property called ``someProperty`` can access the superclass version of itself
  as ``super.someProperty`` within the overriding getter or setter implementation.
* An overridden subscript for ``someIndex`` can access the superclass version of the same subscript
  as ``super[someIndex]`` from within the overriding subscript implementation.

Overriding Methods
~~~~~~~~~~~~~~~~~~

The following example defines a new subclass of ``Vehicle`` called ``Car``,
which overrides the ``description`` method it inherits from ``Vehicle``:

.. testcode:: inheritance

   -> class Car : Vehicle {
         var speed: Double = 0.0
         init() {
            super.init()
            maxPassengers = 5
            numberOfWheels = 4
         }
         override func description() -> String {
            return super.description() + "; "
               + "traveling at \(speed) mph"
         }
      }

``Car`` declares a new stored ``Double`` property called ``speed``,
in addition to the properties it inherits from ``Vehicle``.
This property defaults to ``0.0``, meaning “zero miles per hour”.
``Car`` also has a custom initializer,
which sets the maximum number of passengers to ``5``,
and the default number of wheels to ``4``.

``Car`` overrides its inherited ``description`` method
by defining a function with the same declaration as the one it would otherwise inherit,
prefixed by the ``override`` keyword.
Rather than providing a completely custom implementation of ``description``,
it actually starts by calling ``super.description`` to retrieve
the description provided by its superclass.
It then appends some additional information onto the end about the car's current speed,
and returns the complete description.

If you create a new instance of ``Car``,
and print the output of its ``description`` method,
you can see that the description has indeed changed:

.. testcode:: inheritance

   -> let car = Car()
   << // car : Car = <Car instance>
   -> println("Car: \(car.description())")
   </ Car: 4 wheels; up to 5 passengers; traveling at 0.0 mph

Overriding Properties
~~~~~~~~~~~~~~~~~~~~~

You can override an inherited property
to provide your own custom getter and setter for that property,
or to add property observers to the property to observe when its value changes.

Override Getters And Setters
____________________________

.. testcode:: inheritance

   -> class SpeedLimitedCar : Car {
         override var speed: Double  {
            get {
               return super.speed
            }
            set {
               super.speed = min(newValue, 40.0)
            }
         }
      }

.. testcode:: inheritance

   -> let limitedCar = SpeedLimitedCar()
   << // limitedCar : SpeedLimitedCar = <SpeedLimitedCar instance>
   -> limitedCar.speed = 60.0
   -> println("SpeedLimitedCar: \(limitedCar.description())")
   </ SpeedLimitedCar: 4 wheels; up to 5 passengers; traveling at 40.0 mph

Override Property Observers
___________________________

You can use property overriding to add property observers to an inherited property.
This enables you to be notified when the value of the inherited property changes,
regardless of how that property was originally implemented.

.. note::

   You cannot add property observers to
   inherited constant stored properties or inherited read-only computed properties.
   The value of these properties cannot be set,
   and so it is not appropriate to provide a ``willSet`` or ``didSet`` implementation
   as part of an override.

The following example defines a new class called ``AutomaticCar``,
which is a subclass of ``Car``.
The ``AutomaticCar`` class models a car with an automatic gearbox,
which selects an appropriate gear to use based on the current speed.

.. testcode:: inheritance

   -> class AutomaticCar : Car {
         var gear = 1
         override var speed: Double  {
            didSet {
               gear = 1 + Int(speed / 10.0)
            }
         }
         override func description() -> String {
            return super.description() + " in gear \(gear)"
         }
      }



.. testcode:: inheritance

   -> let automatic = AutomaticCar()
   << // automatic : AutomaticCar = <AutomaticCar instance>
   -> automatic.speed = 35.0
   -> println("AutomaticCar: \(automatic.description())")
   </ AutomaticCar: 4 wheels; up to 5 passengers; traveling at 35.0 mph in gear 4

.. Inheritance_FinalMethodsPropertiesAndSubscripts:

Final Methods, Properties and Subscripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can prevent a method, property, or subscript from being overridden
by marking it as :newTerm:`final`.
Do this by writing the ``@final`` attribute before its introducer keyword
(such as ``@final var``, ``@final func``, ``@final class func``, and ``@final subscript``).
Any attempts to override a ``@final`` method, property, or subscript in a subclass
are reported as a compile-time error.
Methods, properties or subscripts that you add to a class in an extension
can also be marked as final within the extension's definition.

You can mark an entire class as final by writing the ``@final`` attribute
before the ``class`` keyword in its class definition (``@final class``).
Any attempts to subclass a final class will be reported as a compile-time error.

.. TODO: I should probably provide an example here.

.. TODO: provide more information about function signatures,
   and what does / does not make them unique.
   For example, the parameter names do not have to match
   in order for a function to override a similar signature in its parent.
   (This is true for both of the function declaration syntaxes.)

.. TODO: Mention that you can return more-specific types, and take less-specific types,
   when overriding methods that use optionals / unchecked optionals.