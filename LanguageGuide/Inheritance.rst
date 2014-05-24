Inheritance
===========

A class can :newTerm:`inherit` methods, properties, and other characteristics
from another class.
When one class inherits from another,
the inheriting class is known as a :newTerm:`subclass`,
and the class it inherits from is known as its :newTerm:`superclass`.
Inheritance is a fundamental behavior that differentiates classes
from other types in Swift.

Classes in Swift can call and access
methods, properties, and subscripts belonging to their superclass
and can provide their own overriding versions of those methods, properties, and subscripts
to refine or modify their behavior.
Swift helps to ensure your overrides are correct
by checking that the override definition has a matching superclass definition.

Classes can also add property observers to inherited properties
in order to be notified when the value of a property changes.
Property observers can be added to any property,
regardless of whether it was originally defined as a stored or computed property.

.. _Inheritance_DefiningABaseClass:

Defining a Base Class
---------------------

Any class that does not inherit from another class is known as a :newTerm:`base class`.

.. note::

   Swift classes do not inherit from a universal base class.
   Classes you define without specifying a superclass
   automatically become base classes for you to build upon.

The example below defines a base class called ``Vehicle``.
This base class declares two properties
(``numberOfWheels`` and ``maxPassengers``)
that are universal to all vehicles.
These properties are used by a method called ``description``,
which returns a ``String`` description of the vehicle's characteristics:

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
how inherited properties can be modified by subclasses.

You use initializers to create a new instance of a type.
Although initializers are not methods,
they are written in a very similar syntax to instance methods.
An initializer prepares a new instance for use,
and ensures that all properties of the instance have valid initial values.

In its simplest form, an initializer is like an instance method with no parameters,
written using the ``init`` keyword:

.. testcode:: inheritance

   >> class Test {
   -> init() {
         // perform some initialization here
      }
   >> }

To create a new instance of ``Vehicle``,
call this initializer with :newTerm:`initializer syntax`,
written as ``TypeName`` followed by empty parentheses:

.. testcode:: inheritance

   -> let someVehicle = Vehicle()
   << // someVehicle : Vehicle = C4REPL7Vehicle (has 2 children)

The initializer for ``Vehicle`` sets some initial property values
(``numberOfWheels = 0`` and ``maxPassengers = 1``)
for an arbitrary vehicle.
(It is assumed that any vehicle can carry at least one passenger –
it wouldn't be a very useful vehicle otherwise.)

The ``Vehicle`` class defines common characteristics for an arbitrary vehicle,
but is not much use in itself.
To make it more useful,
you need to refine it to describe more specific kinds of vehicle.

.. _Inheritance_Subclassing:

Subclassing
-----------

:newTerm:`Subclassing` is the act of basing a new class on an existing class.
The subclass inherits characteristics from the existing class, which you can refine.
You can also add new characteristics to the subclass.

To indicate that a class has a superclass,
write the superclass name after the original class name,
separated by a colon:

.. testcode:: protocolSyntax

   >> class SomeSuperclass {}
   -> class SomeClass: SomeSuperclass {
         // class definition goes here
      }

The next example defines a second, more specific vehicle called ``Bicycle``.
This new class is based on the existing capabilities of ``Vehicle``.
You indicate this by placing the name of the class the subclass builds upon (``Vehicle``)
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

``Bicycle`` is a subclass of ``Vehicle``, and ``Vehicle`` is the superclass of ``Bicycle``.
The new ``Bicycle`` class automatically gains all characteristics of ``Vehicle``,
such as its ``maxPassengers`` and ``numberOfWheels`` properties.
You can tailor those characteristics and add new ones
to better match the requirements of the ``Bicycle`` class.

The ``Bicycle`` class also defines an initializer
to set up its tailored characteristics.
The initializer for ``Bicycle`` calls ``super.init()``,
the initializer for the ``Bicycle`` class's superclass, ``Vehicle``,
and ensures that all of the inherited properties are initialized by ``Vehicle``
before ``Bicycle`` tries to modify them.

.. note::

   Unlike Objective-C, initializers are not inherited by default in Swift.
   For more information, see :ref:`Initialization_InitializerInheritanceAndOverriding`.

The default value of ``maxPassengers`` provided by ``Vehicle`` is already correct for a bicycle,
and so it is not changed within the initializer for ``Bicycle``.
The original value of ``numberOfWheels`` is not correct, however,
and is replaced with a new value of ``2``.

As well as inheriting the properties of ``Vehicle``,
``Bicycle`` also inherits its methods.
If you create an instance of ``Bicycle``,
you can call its inherited ``description`` method
to see how its properties have been updated:

.. testcode:: inheritance

   -> let bicycle = Bicycle()
   << // bicycle : Bicycle = C4REPL7Bicycle (has 1 child)
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
known as a “tandem”.
``Tandem`` inherits the two properties from ``Bicycle``,
which in turn inherits these properties from ``Vehicle``.
``Tandem`` doesn't change the number of wheels – it's still a bicycle, after all –
but it does update ``maxPassengers`` to have the correct value for a tandem.

.. note::

   Subclasses are only allowed to modify
   *variable* properties of superclasses during initialization.
   You can't modify inherited constant properties of subclasses.

Creating an instance of ``Tandem`` and printing its description
shows how its properties have been updated:

.. testcode:: inheritance

   -> let tandem = Tandem()
   << // tandem : Tandem = C4REPL6Tandem (has 1 child)
   -> println("Tandem: \(tandem.description())")
   </ Tandem: 2 wheels; up to 2 passengers

Note that the ``description`` method is also inherited by ``Tandem``.
Instance methods of a class are inherited by any and all subclasses of that class.

.. QUESTION: Should I mention that you can subclass from NSObject?

.. _Inheritance_Overriding:

Overriding
----------

A subclass can provide its own custom implementation of
an instance method, class method, instance property, or subscript
that it would otherwise inherit from a superclass.
This is known as :newTerm:`overriding`.

To override a characteristic that would otherwise be inherited,
you prefix your overriding definition with the ``override`` keyword.
Doing so clarifies that you intend to provide an override
and have not provided a matching definition by mistake.
Overriding by accident can cause unexpected behavior,
and any overrides without the ``override`` keyword are
diagnosed as an error when your code is compiled.

The ``override`` keyword also prompts the Swift compiler
to check that your overriding class's superclass (or one of its parents)
has a declaration that matches the one you provided for the override.
This check ensures that your overriding definition is correct.

.. _Inheritance_AccessingSuperclass:

Accessing Superclass Methods, Properties, and Subscripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you provide a method, property, or subscript override for a subclass,
it is sometimes useful to use the existing superclass implementation
as part of your override.
For example, you can refine the behavior of that existing implementation
or store a modified value in an existing inherited variable.

Where this is appropriate,
you access the superclass version of a method, property, or subscript
by using the ``super`` prefix:

* An overridden method named ``someMethod`` can call the superclass version of ``someMethod``
  by calling ``super.someMethod()`` within the overriding method implementation.
* An overridden property called ``someProperty`` can access the superclass version of ``someProperty``
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
   << // car : Car = C4REPL3Car (has 2 children)
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

Overriding Property Getters and Setters
_______________________________________

You can provide a custom getter (and setter, if appropriate)
to override *any* inherited property,
regardless of whether the inherited property is implemented as
a stored or computed property at its source.
The stored or computed nature of an inherited property is not known by a subclass –
it only knows that the inherited property has a certain name and type.
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
You implement this limitation by overriding the inherited ``speed`` property:

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
the property's setter implementation checks the new value and limits it to 40mph.
It does this by setting the underlying ``speed`` property of its superclass
to be the smaller of ``newValue`` and ``40.0``.
The smaller of these two values is determined by passing them to the ``min`` function,
which is a global function provided by the Swift standard library.
The ``min`` function takes two or more values
and returns the smallest one of those values.

If you try to set the ``speed`` property of a ``SpeedLimitedCar`` instance
to more than 40mph, and then print the output of its ``description`` method,
you see that the speed has been limited:

.. testcode:: inheritance

   -> let limitedCar = SpeedLimitedCar()
   << // limitedCar : SpeedLimitedCar = C4REPL15SpeedLimitedCar (has 1 child)
   -> limitedCar.speed = 60.0
   -> println("SpeedLimitedCar: \(limitedCar.description())")
   </ SpeedLimitedCar: 4 wheels; up to 5 passengers; traveling at 40.0 mph

.. _Inheritance_OverridingPropertyObservers:

Overriding Property Observers
_____________________________

You can use property overriding to add property observers to an inherited property.
This enables you to be notified when the value of the inherited property changes,
regardless of how that property was originally implemented.
For more information on property observers, see :ref:`Properties_PropertyObservers`.

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
   << // automatic : AutomaticCar = C4REPL12AutomaticCar (has 2 children)
   -> automatic.speed = 35.0
   -> println("AutomaticCar: \(automatic.description())")
   </ AutomaticCar: 4 wheels; up to 5 passengers; traveling at 35.0 mph in gear 4

.. _Inheritance_PreventingOverridesOfMethodsPropertiesAndSubscripts:

Preventing Overrides of Methods, Properties, and Subscripts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

   TODO: Overriding Type Methods
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
