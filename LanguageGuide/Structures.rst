Structures
==========

:newTerm:`Structures` in Swift are general-purpose, flexible
building blocks for your program.
They are far more powerful
than the simple structures
you may be familiar with
from other languages such as C and Objective-C,
providing new ways to architect your code
for optimal safety and performance.

In Swift, structures can:

* Define properties to store values, as described in :doc:`Properties`.
* Define methods to provide functionality, as described in :doc:`Methods`.
* Define subscripts to provide access to their values using subscript syntax, as described in :doc:`Subscripts`.
* Define initializers to set up their initial state, as described in :doc:`Initialization`.
* Be extended to provide added functionality, as described in :doc:`Extensions`.
* Conform to protocols to implement a shared abstraction or cooperate with a default implementation, as described in :doc:`Protocols`.

.. _Structures_StructureSyntax:

Structure Syntax
----------------

You introduce a structure with the ``struct`` keyword and place its
definition within a pair of braces:

.. testcode:: structures
    
    -> struct SomeStructure {
           // structure definition goes here
       }
    
.. note::

   Whenever you define a new structure, you define a
   brand new Swift type.
   Give types ``UpperCamelCase`` names (such as ``SomeStructure`` here)
   to match the capitalization
   of standard Swift types (such as ``String``, ``Int``, and ``Bool``).
   Conversely, give properties and methods ``lowerCamelCase`` names
   (such as ``someProperty`` and ``someMethod``)
   to differentiate them from type names.

Here is an example of a structure definition:

.. testcode:: structures

    -> struct Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               return celsius * 9/5 + 32
           }
       }

The example above defines a new structure called ``Temperature``.
The structure has  a stored property called ``celsius`` and
a computed property called ``fahrenheit``.
Stored properties are constants or variables
that are bundled up and stored as part of the structure.
Computed properties calculate a value rather than storing it.
The degrees in Fahrenheit of a ``Temperature``
can always be determined from its stored ``celsius`` property,
so there is no need to store a second value for ``fahrenheit``.
For more on stored and computed properties, see :doc:`Properties`.

The ``celsius`` property is inferred to be of type ``Double``
because of its initial floating-point value of ``0.0``.
As discussed in :ref:`TheBasics_TypeSafetyAndTypeInference`,
Swift infers that floating-point literals with no specified type
are of type ``Double``.
Because ``fahrenheit`` is a computed property,
it is explicitly defined as a ``Double``.

The ``Temperature`` structure definition describes only
what a ``Temperature`` instance looks like.
It does not describe a specific ``Temperature`` instance.
To do that, you create an instance of the structure.
The simplest form of initialization syntax for structures
uses the type name of the structure
followed by empty parentheses:

.. testcode:: structures

    -> let someTemperature = Temperature()
    << // someTemperature : Temperature = REPL.Temperature(celsius: 0.0)

This creates a new instance of the ``Temperature`` structure
and initializes its properties to their default values.

.. _Structures_MemberwiseInitializer:

Memberwise Initializer
~~~~~~~~~~~~~~~~~~~~~~

All structures
have an automatically generated memberwise initializer.
A memberwise initializer is a form of
initialization syntax that allows you
to set values for the stored properties
of new structure instances.
You pass the initial values of properties
to the memberwise initializer by name:

.. testcode:: structures

    -> let waterBoilingPoint = Temperature(celsius: 100.0)
    << // waterBoilingPoint : Temperature = REPL.Temperature(celsius: 100.0)

Initializing ``waterBoilingPoint`` with the memberwise initializer
creates an instance of ``Temperature`` with the ``celsius`` property
set to ``100.0`` degrees Celsius.

For information on structure initialization, see :doc:`Initialization`.

.. _Structures_AccessingPropertiesOfStructures:

Accessing Properties of Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can access a property
of a structure instance
using dot syntax
by writing the name of the instance
followed by a period (``.``)
and the name of the property:

.. testcode:: structures

    -> print("Water boils at \(waterBoilingPoint.celsius) degrees Celsius")
    <- Water boils at 100.0 degrees Celsius

In the example above, ``waterBoilingPoint.celsius``
refers to the ``celsius`` property of ``waterBoilingPoint``
and returns its value of ``100.0``.

You can also use dot syntax
to assign a new value
to a variable property:

.. testcode:: structures

    -> var bodyTemperature = Temperature()
    << // bodyTemperature : Temperature = REPL.Temperature(celsius: 0.0)
    -> bodyTemperature.celsius = 37.0
    -> print("Body temperature is \(bodyTemperature.celsius) degrees Celsius")
    <- Body temperature is 37.0 degrees Celsius
    -> print("Body temperature is \(bodyTemperature.fahrenheit) degrees Fahrenheit")
    <- Body temperature is 98.6 degrees Fahrenheit

The example above declares a variable called ``bodyTemperature``
and sets it to a ``Temperature`` instance
with all properties initialized to their default values.
The ``bodyTemperature`` variable's ``celsius`` property is set,
and then its ``celsius`` and ``fahrenheit`` properties are accessed
to print their values.

.. _Structures_StructuresAreValueTypes:

Structures Are Value Types
--------------------------

A :newTerm:`value type` is a type whose value is copied
when it is assigned to a variable or constant,
or when it is passed to a function.

You've actually been using value types extensively
throughout the previous chapters.
In fact, all the basic types in Swift ---
integers, floating-point numbers, Booleans, strings, arrays, and dictionaries ---
are value types,
and are implemented as structures behind the scenes.

All structures are value types in Swift.
This means that any structure instances you create ---
and any value types you give them as properties ---
are always copied when they are passed around in your code.

Consider this example:

.. testcode:: structures

    -> var roomTemperature = Temperature(celsius: 21.0)
    << // roomTemperature : Temperature = REPL.Temperature(celsius: 21.0)
    -> var ovenTemperature = roomTemperature
    << // ovenTemperature : Temperature = REPL.Temperature(celsius: 21.0)

The example above declares a variable called ``roomTemperature``
to keep track of the current temperature of a room.
``roomTemperature`` is set to a ``Temperature`` instance initialized
with a typical ambient room temperature of ``21.0`` degrees Celsius.

Suppose this room is a kitchen
and contains an oven.
To keep track of the oven's temperature,
declare the ``ovenTemperature`` variable and
set it to the current value of ``roomTemperature``.
Initially setting ``ovenTemperature`` to ``roomTemperature``
models the oven temperature when
the oven is turned off
and at the same temperature as the room.
Because ``Temperature`` is a structure, a *copy*
of the existing ``roomTemperature`` instance is made,
and this new copy is assigned to ``ovenTemperature``.
Even though ``roomTemperature`` and ``ovenTemperature``
have the same value for their ``celsius`` properties,
they are two different instances.
You can change one without affecting the other.

You can change ``ovenTemperature`` to
get the oven ready for cooking
and ``roomTemperature`` remains unchanged:

.. testcode:: structures

    -> ovenTemperature.celsius = 180.0
    -> print("ovenTemperature is now \(ovenTemperature.celsius) degrees Celsius")
    <- ovenTemperature is now 180.0 degrees Celsius
    -> print("roomTemperature is still \(roomTemperature.celsius) degrees Celsius")
    <- roomTemperature is still 21.0 degrees Celsius

When ``ovenTemperature`` is given the current value of ``roomTemperature``,
the value stored in ``roomTemperature``
is copied into the new ``ovenTemperature`` instance.
The end result is two completely separate instances
that contain the same numeric value.
Because they are separate instances,
setting ``ovenTemperature.celsius`` to a new value
does not affect the ``celsius`` property stored
in ``roomTemperature``.

For an in-depth discussion of value types
and when to use them,
see :doc:`ChoosingBetweenClassesAndStructures`.

.. note::

   Swift copies a structure instance in memory
   only if the instance is changed.
   This behavior is called :newTerm:`copy-on-write`.
   While code functions as though structure instances are copied
   when you assign them
   to a new variable or constant,
   Swift copies a structure instance in memory
   only if you change it from the original.
   This optimization saves Swift from doing unnecessary work
   as Swift needs to copy a structure instance
   only if you mutate it.