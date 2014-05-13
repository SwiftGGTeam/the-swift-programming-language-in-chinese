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

.. testcode:: inheritance

   >> class Test {
   -> init() {
         // perform some initialization here
      }
   >> }

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

   -> class Bicycle: Vehicle {
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

   -> class Tandem: Bicycle {
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
an instance method, class method, instance property, or subscript
that it would otherwise inherit from a superclass.
This is known as :newTerm:`overriding`.

Whenever you override something that would overwise be inherited,
you must prefix your overriding definition with the ``override`` keyword.
This makes it clear that you intend to provide an override,
and have not just accidentally provided a matching definition by mistake.
Overriding by accident can cause unexpected behavior,
and any overrides without the ``override`` keyword are
diagnosed as an error when your code is compiled.
(The definition you have accidentally overridden may not have been provided
by your subclass's immediate superclass –
it may have been inherited from another superclass further up the chain.)

The ``override`` keyword also prompts the Swift compiler
to check that your overriding class's superclass (or one of its parents)
has a declaration that matches the one you have provided for the override.
This ensures that your overriding definition is correct.

.. _Inheritance_AccessingSuperclass:

Accessing Superclass Methods, Properties, and Subscripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can access the superclass version of a method, property, or subscript
by using the ``super`` prefix:

* An overridden method called ``someMethod`` can call the superclass version of ``someMethod``
  by calling ``super.someMethod()`` within the overriding method implementation.
* A overridden property called ``someProperty`` can access the superclass version of ``someProperty``
  as ``super.someProperty`` within the overriding getter or setter implementation.
* An overridden subscript for ``someIndex`` can access the superclass version of the same subscript
  as ``super[someIndex]`` from within the overriding subscript implementation.

.. _Inheritance_OverridingMethods:

Overriding Methods
~~~~~~~~~~~~~~~~~~

You can override an inherited instance or class method
to provide a tailored or alternative implementation of the method within your subclass.

The following example defines a new subclass of ``Vehicle`` called ``Car``,
which overrides the ``description`` method it inherits from ``Vehicle``:

.. testcode:: inheritance

   -> class Car: Vehicle {
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

``Car`` declares a new stored ``Double`` property called ``speed``.
This property defaults to ``0.0``, meaning “zero miles per hour”.
``Car`` also has a custom initializer,
which sets the maximum number of passengers to ``5``,
and the default number of wheels to ``4``.

``Car`` overrides its inherited ``description`` method
by providing a method with the same declaration as the ``description`` method from ``Vehicle``.
The overriding method definition is prefixed with the ``override`` keyword.

Rather than providing a completely custom implementation of ``description``,
the overriding method actually starts by calling ``super.description`` to retrieve
the description provided by ``Vehicle``.
It then appends some additional information about the car's current speed.

If you create a new instance of ``Car``,
and print the output of its ``description`` method,
you can see that the description has indeed changed:

.. testcode:: inheritance

   -> let car = Car()
   << // car : Car = <Car instance>
   -> println("Car: \(car.description())")
   </ Car: 4 wheels; up to 5 passengers; traveling at 0.0 mph

.. _Inheritance_OverridingProperties:

Overriding Properties
~~~~~~~~~~~~~~~~~~~~~

You can override an inherited instance or class property
to provide your own custom getter and setter for that property,
or to add property observers to enable the overriding property
to observe when the underlying property value changes.

.. _Inheritance_OverridingPropertyGettersAndSetters:

Overriding Property Getters And Setters
_______________________________________

You can provide a custom getter (and setter, if appropriate)
to override *any* inherited property,
regardless of whether the inherited property is implemented as
a stored or computed property at source.
(The stored or computed nature of an inherited property is not known by a subclass –
it only knows that the inherited property has a certain name and type.)
You must always state both the name and the type of the property you are overriding,
to enable the compiler to check that your override matches
a superclass property with the same name and type.

You can present an inherited read-only property as a read-write property
by providing both a getter and a setter in your subclass property override.
You cannot, however, present an inherited read-write property as a read-only property.

.. note::

   If you provide a setter as part of a property override,
   you must also provide a getter for that override.
   If you don't want to modify the inherited property's value within the overriding getter,
   you can simply pass through the inherited value
   by returning ``super.someProperty`` from the getter,
   as in the ``SpeedLimitedCar`` example below.

The following example defines a new class called ``SpeedLimitedCar``,
which is a subclass of ``Car``.
The ``SpeedLimitedCar`` class represents a car that has been fitted with
a speed-limiting device, which prevents the car from traveling faster than 40mph.
This limitation is implemented by overriding the inherited ``speed`` property.

.. testcode:: inheritance

   -> class SpeedLimitedCar: Car {
         override var speed: Double  {
            get {
               return super.speed
            }
            set {
               super.speed = min(newValue, 40.0)
            }
         }
      }

Whenever you set the ``speed`` property of a ``SpeedLimitedCar`` instance,
the property's setter implementation checks the new value, and limits it to 40mph.
It does this by setting the underlying ``speed`` property of its superclass
to be the smaller of ``newValue`` and ``40.0``.
The smaller of these two values is determined by passing them to the ``min`` function,
which is a global function provided by the Swift standard library.
The ``min`` function takes two or more values,
and returns the smallest one of those values.

If you try and set the ``speed`` property of a ``SpeedLimitedCar`` instance
to something more than 40mph, and then print the output of its ``description`` method,
you can see that the speed has been limited:

.. testcode:: inheritance

   -> let limitedCar = SpeedLimitedCar()
   << // limitedCar : SpeedLimitedCar = <SpeedLimitedCar instance>
   -> limitedCar.speed = 60.0
   -> println("SpeedLimitedCar: \(limitedCar.description())")
   </ SpeedLimitedCar: 4 wheels; up to 5 passengers; traveling at 40.0 mph

.. _Inheritance_OverridingPropertyObservers:

Overriding Property Observers
_____________________________

You can use property overriding to add property observers to an inherited property.
This enables you to be notified when the value of the inherited property changes,
regardless of how that property was originally implemented.

.. note::

   You cannot add property observers to
   inherited constant stored properties or inherited read-only computed properties.
   The value of these properties cannot be set,
   and so it is not appropriate to provide a ``willSet`` or ``didSet`` implementation
   as part of an override.

   Note also that you cannot provide both
   an overriding setter and an overriding property observer.
   If you want to observe changes to a property's value,
   and you are already providing a custom setter for that property,
   you can simply observe any value changes from within the custom setter.

The following example defines a new class called ``AutomaticCar``,
which is a subclass of ``Car``.
The ``AutomaticCar`` class represents a car with an automatic gearbox,
which automatically selects an appropriate gear to use based on the current speed.
``AutomaticCar`` also provides a custom ``description`` method to print the current gear.

.. testcode:: inheritance

   -> class AutomaticCar: Car {
         var gear = 1
         override var speed: Double {
            didSet {
               gear = Int(speed / 10.0) + 1
            }
         }
         override func description() -> String {
            return super.description() + " in gear \(gear)"
         }
      }

Whenever you set the ``speed`` property of an ``AutomaticCar`` instance,
the property's ``didSet`` observer automatically sets the ``gear`` property to
an appropriate choice of gear for the new speed.
Specifically, the property observer chooses a gear which is
the new ``speed`` value divided by ``10``,
rounded down to the nearest integer, plus ``1``.
A speed of ``10.0`` produces a gear of ``1``,
and a speed of ``35.0`` produces a gear of ``4``:

.. testcode:: inheritance

   -> let automatic = AutomaticCar()
   << // automatic : AutomaticCar = <AutomaticCar instance>
   -> automatic.speed = 35.0
   -> println("AutomaticCar: \(automatic.description())")
   </ AutomaticCar: 4 wheels; up to 5 passengers; traveling at 35.0 mph in gear 4

.. _Inheritance_FinalMethodsPropertiesAndSubscripts:

Final Methods, Properties and Subscripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can prevent a method, property, or subscript from being overridden
by marking it as :newTerm:`final`.
Do this by writing the ``@final`` attribute before its introducer keyword
(such as ``@final var``, ``@final func``, ``@final class func``, and ``@final subscript``).

Any attempts to override a final method, property, or subscript in a subclass
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
   
.. _Methods_OverridingTypeMethods:

Overriding Type Methods
~~~~~~~~~~~~~~~~~~~~~~~

.. write-me::

.. _Inheritance_DynamicReturnTypes:

Dynamic Return Types
--------------------

.. write-me::

.. TODO: mention that methods can return a value of type Self (a la instancetype)
.. TODO: include the several tricks seen in swift/test/decl/func/dynamic_self.swift
.. TODO: find a good place to mention that instance methods can
   return self(withInt: 5) to call their own type's initializer
.. QUESTION: does this section go here, or in Initialization, or somewhere else?
