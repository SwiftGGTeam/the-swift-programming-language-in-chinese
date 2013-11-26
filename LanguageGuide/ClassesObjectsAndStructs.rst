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
    * @inout

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
* conform to *protocols* to provide standard functionality of a certain type, and
* be *extended* to expand their functionality beyond a default implementation

(See the :doc:`ProtocolsAndExtensions` chapter for more information on protocols and extensions.)

In addition, classes have several capabilities that structs do not:

* *inheritance*, which enables one class to inherit the characteristics of another;
* *destructors*, which enable an instance of a class to tidy up after itself; and
* *type casting*, which enables you to check and interpret the type of a class instance at runtime.

All of these capabilities are described in more detail below.

Defining Classes and Structs
----------------------------

Unlike other programming languages,
Swift does not require you to create separate interface and implementation files for your custom data structures.
In Swift, you simply define a class or struct in a single file,
and the external interface to that class or struct is automatically made available for other code to use.

.. TODO: add a note here about public and private interfaces,
   once we know how these will be declared in Swift.

Definition Syntax
~~~~~~~~~~~~~~~~~

Classes and structs have a very similar definition syntax.
Classes are introduced by the ``class`` keyword,
and structs are introduced by the ``struct`` keyword.
Both place their entire definition within a pair of braces:

.. testcode::

    (swift) struct Size {
        var width, height: Double
    }
    (swift) class Rectangle {
        var size: Size
    }

Classes and structs can both define *properties*.
Properties are simply variables that are bundled up and stored as part of the class or struct.
The example above defines a new struct called ``Size``,
which has properties called ``width`` and ``height``,
both of which are of type ``Double``.
It also defines a new class called ``Rectangle``,
which has a single property called ``size``,
with a type of the new ``Size`` struct.
(Properties are described in more detail later in this chapter.)

Note that whenever you define a new class or struct,
you are effectively defining a brand new Swift type.
Custom classes and structs should be given ``UpperCamelCase`` names
(such as ``Size`` and ``Rectangle``),
to match the capitalization of standard Swift types
(such as ``String``, ``Int`` and ``Bool``).

.. TODO: note that you can set rect.size.width directly,
   without having to set a new rect.size struct,
   unlike in Objective-C.

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
The simplest form of initializer syntax uses the type name of the class or struct,
followed by empty parentheses ``()``.
This creates a new instance of the class or struct,
with any properties initialized to their default values.
In the example above,
the ``width`` and ``height`` values of the ``Size`` struct have been automatically initialized to ``0.0``,
which is the default value for a ``Double`` property.

.. TODO: add a note about inferring a variable's type when using initializer syntax.

Terminology
___________

An *instance* of a class (such as ``someRectangle`` above) is traditionally known as an *object*.
This terminology will be used from now on to refer to instances of classes.
Wherever you see the word *object* below,
it will refer to a single specific instance of a particular class.

Instances of struct types are generally referred to simply as ‘structs’.
The word *struct* will be used from now on to refer to struct *instances* (such as ``someSize``),
and the phrase *struct type* will be used to refer to their *type* (such as ``Size``).

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

All struct types provide an automatically-generated *default initializer*,
which can be used to create new structs of that type.
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

By Value and By Reference 
-------------------------

Objects and structs have many things in common in Swift.
However, they have one fundamental difference:

* structs are passed by *value*
* objects are passed by *reference*

This difference is very important when deciding how to define the building blocks of your code.

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

Objects are always passed by *reference* when they are assigned to a variable,
or passed as an argument to a function.
The exact same object is used, and no copying takes place.

For example:

.. testcode::

    (swift) var square = Rectangle()
    // square : Rectangle = <Rectangle instance>
    (swift) square.size = Size(width: 1.0, height: 1.0)
    (swift) println("The square's width is \(square.size.width)")
    >>> The square's width is 1.0
    (swift) var theSameSquare = square
    // theSameSquare : Rectangle = <Rectangle instance>
    (swift) theSameSquare.size.width = 3.0
    (swift) theSameSquare.size.height = 3.0
    (swift) println("The square's width is now \(theSameSquare.size.width)")
    >>> The square's width is now 3.0
    (swift) println("The square's width is now \(square.size.width)")
    >>> The square's width is now 3.0

This example declares a variable called ``square``,
and sets it to refer to a new ``Rectangle`` object.
The new ``Rectangle`` is given a size with a width and height of ``1.0``.

A second variable is then declared, called ``theSameSquare``,
which is set to refer to the same ``Rectangle`` already referred to by ``square``.
Note that this doesn't create a new ``Rectangle`` object –
rather, there are now two object variables referring to the same one object.

The width and height of the ``Rectangle`` are then modified.
Because ``theSameSquare`` refers to the same object as ``square``,
the underlying width and height properties can be accessed via either ``square`` or ``theSameSquare`` –
it doesn't make a difference which one is chosen, as they both refer to the same thing.
Here, the width and height are accessed and changed via ``theSameSquare``
(e.g. ``theSameSquare.size.width``).

The final lines of this example print the current value of the ``Rectangle``'s width.
As shown here, it doesn't matter whether you access the width via ``square`` or ``theSameSquare`` –
the value of ``3.0`` from the underlying ``Rectangle`` is returned in both cases.

Pointers
________

If you have experience with C, C++ or Objective-C,
you may be familiar with the fact that they use *pointers* to refer to objects.
Object variables in Swift are similar to pointers,
but do not use the reference operator (``&``) or dereference operator (``*``)
to differentiate between a pointer and the memory it points to.
Indeed, Swift does not have a reference or dereference operator.
Instead, an object variable in Swift is declared like any other variable,
and the value it contains is always a reference to an object in memory.

.. TODO: We need something here to say
   "but don't worry, you can still do all of the stuff you're used to".

.. TODO: Add a justification here to say why this is a good thing.

Choosing Between Structs and Classes
------------------------------------

Structs and classes have many things in common.
However, the fact that structs are always passed by value,
and objects are always passed by reference,
means that they are suited to different kinds of tasks.
As you consider the data structures and functionality that you need for a project,
you will need to decide whether each data structure should be a struct, or a class.

As a general rule, you should only define a new struct type when:

* the struct's primary purpose is to encapsulate a few relatively simple data values
* the struct will not have particularly complex functionality
  (although it may provide one or two convenience methods to work with its stored values)
* it is reasonable to expect that the encapsulated values will be copied rather than referenced
  when assigning or passing around an instance of that struct type
* the values stored by the struct are basic types and / or other structs,
  which would also be expected to be copied rather than referenced
* there is no need to inherit behavior from an existing type

Examples of good candidates for struct types include:

* the size of a geometric shape
  (perhaps encapsulating a ``width`` property and a ``height`` property,
  both of type ``Double``)
* a way to refer to ranges within a series
  (perhaps encapsulating a ``start`` property and a ``length`` property,
  both of type ``Int``)
* a point in a 3D coordinate system
  (perhaps encapsulating ``x``, ``y`` and ``z`` properties, each of type ``Double``)

In all other cases, you should define a new class,
and create objects as instances of that class, to be managed and passed by reference.
In practice, this means that most custom data structures should be classes, not structs.

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