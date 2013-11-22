.. docnote:: Subjects to be covered in this section

    * Classes
    * Objects
    * Structures
    * Instance variables
    * Getters and setters
    * WillSet / DidSet
    * Constructors and destructors
    * Designated initializers
    * Instance and class methods
    * Working with self and Self
    * Super
    * Memory management
    * UnsafePointer?
    * Cast operators (?, !, b as D, b is D)
    * Type inference and discovery?
    * "Everything is a type"
    * Stored vs computed variables
    * === vs ==
    * ‘is’ to check for class membership
    * ‘as’ for casting
    * No 'self = [super init]' (assignment equates to void)

Classes and Structs
===================

Swift provides two different ways to define flexible, reusable constructs
to use as the building blocks of your code:

* *classes*, and
* *structures* (more commonly known as *structs*).

Classes and structs have many things in common in Swift.
Both can:

* declare *properties* to store values
* define *methods* to provide functionality
* define *initializers* to set up their initial state
* conform to *protocols* to provide default functionality of a certain type, and
* be *extended* to expand their functionality beyond a default implementation

(See the :doc:`ProtocolsAndExtensions` chapter for more information on protocols and extensions.)

In addition, classes have several extra capabilities that structs do not:

* *inheritance*, which enables one class to inherit the characteristics of another;
* *destructors*, which enable an instance of a class to tidy up after itself; and
* *type casting*, which enables you to check and interpret the type of a class instance at runtime.

All of these capabilities are described in more detail below.

Defining Classes and Structs
----------------------------

Unlike other programming languages,
Swift does not require you to create separate header and implementation files for your custom data constructs.
In Swift, you simply define a class or struct in a single implementation file,
and the external interface to that class or struct is automatically made available for other code to use.

Definition Syntax
~~~~~~~~~~~~~~~~~

Classes and structs have a very similar definition syntax.
Classes are introduced by the ``class`` keyword,
and structs are introduced by the ``struct`` keyword.
Both place their entire definition within a pair of braces:

.. testcode::

    (swift) struct Size {
                var width, height: Float
            }
    (swift) class Rectangle {
                var size: Size
            }

The example above defines a new struct called ``Size``,
which has properties called ``width`` and ``height``,
both of which are of type ``Float``.
It also defines a new class called ``Rectangle``,
which has a single property called ``size``,
whose type is the new ``Size`` struct defined above.

Note that whenever you define a new class or struct,
you are effectively defining a brand new Swift type.
Like all other types in Swift,
classes and structs should have ``UpperCamelCase`` names,
as with ``Size`` and ``Rectangle`` above.

Class and Struct Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Size`` struct definition, and the ``Rectangle`` class definition,
only describe what a generic ``Size`` or ``Rectangle`` will look like.
They do not in themselves describe a specific size or rectangle.
To do that, you need to create an *instance* of the class or struct.

The syntax for creating instances is very similar for both structs and classes:

.. testcode::

    (swift) var someSize = Size()
    // someSize : Size = Size(0.0, 0.0)
    (swift) var someRectangle = Rectangle()
    // someRectangle : Rectangle = <Rectangle instance>

Structs and classes both use *initializer syntax* when creating new instances.
The simplest form of initializer syntax, shown above,
is the type name of the class or struct followed by empty parentheses ``()``.
This creates a new instance of the class or struct,
with any properties initialized to their default values.

.. TODO: add a note about inferring from initializer syntax.

Terminology
___________

An instance of a class (such as ``someRectangle`` above) is traditionally known as an *object*.
This terminology will be used from now on to refer to instances of classes.
Wherever you see the word *object* below,
it will refer to a single instance of a particular class.
(If a second ``Rectangle`` called ``anotherRectangle`` was also initialized,
it would be a different object to ``someRectangle``.)

Instances of struct types are generally referred to simply as ‘structs’.
The word *struct* will be used from now on to refer to struct instances (such as ``someSize``),
and the phrase *struct type* will be used to refer to their type (such as ``Size``).

Accessing Properties
--------------------

The properties of an object or struct can be accessed using *dot syntax*:

.. testcode::

    (swift) println("The width of someSize is \(someSize.width)")
    >>> The width of someSize is 0.0

Dot syntax can also be used to drill down into properties which are themselves objects or structs,
such as the ``width`` property of a ``Rectangle``'s ``size`` struct:

.. testcode::

    (swift) println("The width of someRectangle is \(someRectangle.size.width)")
    >>> The width of someRectangle is 0.0

Default Struct Initializers
---------------------------

All struct types provide an automatically-generated default initializer,
which can be used when creating new structs of that type.
Initial values for properties in the struct can be passed to the default initializer by name:

.. testcode::

    (swift) var twoByTwo = Size(width: 2.0, height: 2.0)
    // twoByTwo : Size = Size(2.0, 2.0)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the struct type's definition:

.. testcode::

    (swift) var fourByThree = Size(4.0, 3.0)
    // fourByThree : Size = Size(4.0, 3.0)

Classes do not provide a default initializer, because [SOME_JUSTIFIABLE_REASON].
The creation of custom initializers is described in more detail below.

.. TODO: Include a justifiable reason.

By Reference and By Value
-------------------------

Objects and structs have many things in common in Swift.
However, they have one very important difference:

* structs are passed by *value*
* objects are passed by *reference*

This difference is important when deciding how to define the building blocks of your code.

Structs Are Passed By Value
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Structs are always *copied* when they are assigned to a new variable
or passed as an argument to a function.
Rather than using the existing struct, a new one is created,
and the original struct's values are copied across to the new one.
This is what is meant by ‘passing a struct by value’ –
the *values* contained within the struct are passed around, not the struct itself.

For example:

.. testcode::

    (swift) var iPhone4 = Size(width: 640.0, height: 960.0)
    // iPhone4 : Size = Size(640.0, 960.0)
    (swift) var iPhone5 = iPhone4
    // iPhone5 : Size = Size(640.0, 960.0)
    (swift) iPhone5.height = 1136.0
    (swift) println("The iPhone 5 screen is \(iPhone5.height) pixels high")
    >>> The iPhone 5 screen is 1136.0 pixels high
    (swift) println("The iPhone 4 screen is \(iPhone4.height) pixels high")
    >>> The iPhone 4 screen is 960.0 pixels high

This example declares a variable called ``iPhone4``,
and sets it to a ``Size`` struct initialized with the pixel width and height of the iPhone 4's screen.
It then declares a second variable, called ``iPhone5``,
and sets it to the current value of ``iPhone4``.
Having done so, it amends the ``height`` property of the ``iPhone5`` struct to be
the height of the iPhone 5's taller screen (``1136.0`` pixels).

The two calls to ``println`` at the end of this example show that
the ``height`` property of ``iPhone5`` has indeed changed to be ``1136.0``.
However, the ``height`` property of the original ``iPhone4`` struct still has the old value of ``960.0``.

When ``iPhone5`` was initialized with the current value of ``iPhone4``,
the *values* stored in ``iPhone4`` were copied into the new ``iPhone5`` struct.
The end result was two completely separate structs, which just happened to contain the same values.
This is why setting the height of ``iPhone5`` to ``1136.0`` didn't affect ``iPhone4`` –
they are completely different structs.

Objects Are Passed By Reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[TODO]

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#structures
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#classes
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#objects-and-classes
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#structures
    * https://[Internal Staging Server]/docs/classes.html
    * https://[Internal Staging Server]/docs/logicalobjects.html
    * https://[Internal Staging Server]/docs/Resilience.html
    * https://[Internal Staging Server]/docs/StoredAndComputedVariables.html
    * https://[Internal Staging Server]/docs/typechecker.html
    * https://[Internal Staging Server]/docs/weak.html
    * https://[Internal Staging Server]/docs/LangRef.html#expr-cast
    * https://[Internal Staging Server]/docs/textformatting.html