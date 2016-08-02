Structures
==========

:newTerm:`Structures` in Swift are general-purpose, flexible constructs
that become the building blocks of your program.
They are not the structures you are familiar with
coming from other languages like C and Objective-C.
They are far more powerful,
providing new ways to architect your code
for optimal safety, readability and performance.

In Swift, structures can:

* Define properties to store values
* Define methods to provide functionality
* Define subscripts to provide access to their values using subscript syntax
* Define initializers to set up their initial state
* Be extended to expand their functionality beyond a default implementation
* Conform to protocols to [fill in]

For more information, see
:doc:`Properties`, :doc:`Methods`, :doc:`Subscripts`, :doc:`Initialization`,
:doc:`Extensions`, and :doc:`Protocols`.

.. _Structures_DefinitionSyntax:

Definition Syntax
-----------------

You introduce a structure with the ``struct`` keyword and place its
definition within a pair of braces:

.. testcode:: structures
    
    -> struct SomeStructure {
           // structure definition goes here
       }
    
.. note::

   Whenever you define a new structure, you effectively define a
   brand new Swift type.
   Give types ``UpperCamelCase`` names (such as ``SomeStructure`` here)
   to match the capitalization
   of standard Swift types (such as ``String``, ``Int``, and ``Bool``).
   Conversely, always give properties and methods ``lowerCamelCase`` names
   (such as ``frameRate`` and ``incrementCount``)
   to differentiate them from type names.

Here is an example of a structure definition:

.. testcode:: structures

    -> struct Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               get { return celsius * 9/5 + 32 }
               set { celsius = (newValue - 32) * 5/9 }
           }
       }

The example above defines a new structure called ``Temperature``,
to describe temperature in degrees celsius and fahrenheit.
The structure has  a stored property called ``celsius`` and
a computed property called ``fahrenheit``.
Stored properties are constants or variables
that are bundled up and stored as part of the structure.
Computed properties calculate a value rather than store it.
The degrees in fahrenheit of a ``Temperature``
can always be determined from its stored ``celsius`` property,
so you do not need to store ``fahrenheit``.
For more on stored and computed properties, see :doc:`Properties`.
The ``celsius`` property is inferred to be of type ``Double``
by setting it to an initial floating-point value of ``0.0``.
As discussed in :ref:`TheBasics_TypeSafetyAndTypeInference`,
Swift infers that floating point literals with no specified type
are of type ``Double``.
The ``fahrenheit`` property is explicitly defined as a ``Double``.

.. _Structures_InitializerSyntax:

Initializer Syntax
------------------

The ``Temperature`` structure definition describes only
what a ``Temperature`` instance will look like.
It does not describe a specific ``Temperature`` instance.
To do that, you create an instance of the structure.

The simplest form of initializer syntax for structures
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

All structures have an automatically-generated :newTerm:`memberwise initializer`
that allows you to initialize member properties of new structure instances.
You pass the initial values of member properties
to the memberwise initializer by name:

.. testcode:: structures

    -> let waterBoilingPoint = Temperature(celsius: 100.0)
    << // waterBoilingPoint : Temperature = REPL.Temperature(celsius: 100.0)

Initializing ``waterBoilingPoint`` with the memberwise initializer
creates an instance of ``Temperature`` with the ``celsius`` property
set to the boiling point of water—``100.0`` degrees celsius.

Structure initialization is covered in more detail in :doc:`Initialization`.

.. _Structures_AccessingProperties:

Accessing Properties
--------------------

You can access the the properties of a structure instance
using :newTerm:`dot syntax`.

In dot syntax, you write the instance name
followed by the property name
with a period (``.``) in between
and no spaces:

.. testcode:: structures

    -> print("Water boils at \(waterBoilingPoint.celsius) degrees celsius")
    <- Water boils at 100.0 degrees celsius

In this example, ``waterBoilingPoint.celsius``
refers to the ``celsius`` property of ``waterBoilingPoint``
and returns its value of ``100.0``.

You can also use dot syntax to assign a new value to a variable property:

.. testcode:: structures

    -> var ovenTemperature = Temperature()
    << // ovenTemperature : Temperature = REPL.Temperature(celsius: 0.0)
    -> ovenTemperature.celsius = 180.0
    -> print("The oven temperature is \(ovenTemperature.celsius) degrees celsius")
    <- The oven temperature is 180.0 degrees celsius
    -> print("The oven temperature is \(ovenTemperature.fahrenheit) degrees fahrenheit")
    <- The oven temperature is 356.0 degrees fahrenheit
    -> ovenTemperature.fahrenheit = 500.0
    -> print("The oven temperature is \(ovenTemperature.celsius) degrees celsius")
    <- The oven temperature is 260.0 degrees celsius
    -> print("The oven temperature is \(ovenTemperature.fahrenheit) degrees fahrenheit")
    <- The oven temperature is 500.0 degrees fahrenheit

The example above declares a variable called ``ovenTemperature``
and sets it to a ``Temperature`` instance
with all properties initialized to their default values.
The ``ovenTemperature`` variable's ``celsius`` property is
set using dot syntax,
and then its ``celsius`` and ``fahrenheit`` properties are accessed
to print their values.
The ``ovenTemperature`` variable's ``fahrenheit`` property is then set,
which changes the value of the stored ``celsius`` property.
The ``celsius`` and ``fahrenheit`` properties are accessed again
to print their new values.

.. _Structures_StructuresAreValueTypes:

Structures Are Value Types
--------------------------



.. _Structures_WhenToUseStructures:

When to Use Structures
----------------------
 