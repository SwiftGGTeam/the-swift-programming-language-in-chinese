Inheritance
===========

Classes can :newTerm:`inherit` methods, properties and other characteristics
from existing classes.
Inheritance is one of the fundamental behaviors that differentiate classes
from other types in Swift.

Here's an example:

.. testcode:: inheritance

    --> class Vehicle {
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
These properties are used by a method called ``description()``,
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

    --> let someVehicle = Vehicle()
    <<< // someVehicle : Vehicle = <Vehicle instance>

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

    --> class Bicycle : Vehicle {
            init() {
                super.init()
                numberOfWheels = 2
            }
        }

``Bicycle`` is said to be a :newTerm:`subclass` of ``Vehicle``, 
and ``Vehicle`` is said to be the :newTerm:`superclass` of ``Bicycle``.
The new ``Bicycle`` class automatically gains all of the characteristics of ``Vehicle``,
and is able to tailor those characteristics (and add new ones) to suit its needs.

The ``Bicycle`` class also declares an initializer
to set up its tailored characteristics.
The initializer for ``Bicycle`` starts by calling ``super.init()``.
This calls the initializer for ``Bicycle``\ 's superclass, ``Vehicle``,
and ensures that all of the inherited properties are initialized by ``Vehicle``
before ``Bicycle`` tries to modify them.

The default value of ``maxPassengers`` provided by ``Vehicle`` is already correct for a bicycle,
and so it is not changed within the initializer for ``Bicycle``.
The original value of ``numberOfWheels`` is not correct, however,
and is replaced with a new value of ``2``.

If you create an instance of ``Bicycle``, and print its description,
you can see how its properties have been updated:

.. testcode:: inheritance

    --> let bicycle = Bicycle()
    <<< // bicycle : Bicycle = <Bicycle instance>
    --> println("Bicycle: \(bicycle.description())")
    <-- Bicycle: 2 wheels; up to 1 passengers

.. TODO: work out how best to describe super.init() in light of the next section below.

Subclasses can themselves be subclassed:

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

.. note::

    Swift classes do not inherit from a universal “base” class.
    Any classes you define without specifying a superclass
    will automatically become base classes for you to build upon.

.. QUESTION: Should I mention that you can subclass from NSObject?

.. _Inheritance_OverridingInstanceMethods:

Overriding Instance Methods
---------------------------

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
            var isConvertible = false
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

If you create a new instance of ``Car``,
and print the output of its ``description()`` method,
you can see that the description has indeed changed:

.. testcode:: inheritance

    --> var car = Car()
    <<< // car : Car = <Car instance>
    --> println("Car: \(car.description())")
    <-- Car: 4 wheels; up to 5 passengers; not convertible

.. TODO: provide more information about function signatures,
   and what does / does not make them unique.
   For example, the parameter names do not have to match
   in order for a function to override a similar signature in its parent.
   (This is true for both of the function declaration syntaxes.)

.. note::

    Overriding of properties is not yet implemented.

.. TODO: remove or improve this note if property overriding is not implemented for 1.0.
