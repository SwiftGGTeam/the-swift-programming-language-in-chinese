.. docnote:: Subjects to be covered in this section

    * Classes
    * Objects
    * Structures
    * Instance variables
    * Getters and setters
    * willSet / didSet (these don't seem to exist)
    * Constructors and destructors
    * Designated initializers
    * Instance and class methods
    * Working with self and Self
    * Super
    * Memory management via ARC
    * UnsafePointer?
    * Cast operators (?, !, b as D, b is D)
    * Type inference and discovery?
    * "Everything is a type"
    * Stored vs computed properties
    * === vs ==
    * ‘is’ to check for class membership
    * ‘as’ for casting
    * No 'self = [super init]' (assignment equates to void)
    * @inout
    * value types and reference types
    * subscript getters and setters
    * Type functions and variables

Classes and Structures
======================

Swift provides two different ways to define flexible, reusable constructs
to use as the building blocks of your code.
These are known as *classes* and *structures*.

Classes and structures have many things in common in Swift.
Both can:

* declare *properties* to store values
* define *methods* to provide functionality
* define *initializers* to set up their initial state
* conform to *protocols* to provide standard functionality of a certain type, and
* be *extended* to expand their functionality beyond a default implementation

(Protocols and extensions are covered in detail in :doc:`ProtocolsAndExtensions`.)

In addition, classes have several capabilities that structures do not:

* *inheritance*, which enables one class to inherit the characteristics of another;
* *destructors*, which enable an instance of a class to tidy up after itself; and
* *type casting*, which enables you to check and interpret the type of a class instance at runtime

All of these capabilities are described in more detail below.

Defining Classes and Structures
-------------------------------

Unlike other programming languages,
Swift does not require you to create separate interface and implementation files
for your classes and structures.
In Swift, you define a class or a structure in a single file,
and the external interface to that class or structure is
automatically made available for other code to use.

.. TODO: add a note here about public and private interfaces,
   once we know how these will be declared in Swift.

Definition Syntax
~~~~~~~~~~~~~~~~~

Classes and structures have a very similar definition syntax.
Classes are introduced by the ``class`` keyword,
and structures are introduced by the ``struct`` keyword.
Both place their entire definition within a pair of braces:

.. testcode:: classesAndStructs

    (swift) class SomeClass {
        /* class definition */
    }
    (swift) struct SomeStructure {
        /* structure definition */
    }

Whenever you define a new class or structure,
you are effectively defining a brand new Swift type.
Custom classes and structures should be given ``UpperCamelCase`` names
(such as ``SomeClass`` and ``SomeStructure`` here),
to match the capitalization of standard Swift types
(such as ``String``, ``Int`` and ``Bool``).

Properties
----------

Classes and structures can both declare *properties*.
Properties are named values that are bundled up and stored
as part of the class or structure:

.. testcode:: classesAndStructs

    (swift) struct Size {
        var width = 0.0, height = 0.0
    }
    (swift) class Rectangle {
        var size = Size()
    }

The example above defines a new structure called ``Size``,
with two variable properties called ``width`` and ``height``.
These properties are inferred to be of type ``Double``
by setting them to an initial floating-point value of ``0.0``.

The example also defines a new class type called ``Rectangle``,
which has a variable property called ``size``.
This property is initialized with a new ``Size`` structure instance,
which infers a property type of ``Size``.

.. TODO: Note that properties can be either constant or variable,
   as with named values (let and var).

Class and Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Size`` structure definition, and the ``Rectangle`` class definition,
only describe what a generic ``Size`` or ``Rectangle`` will look like.
They do not in themselves describe a specific size or rectangle.
To do that, you need to create an *instance* of the class or structure.

The syntax for creating instances is very similar for both structures and classes:

.. testcode:: classesAndStructs

    (swift) var someSize = Size()
    // someSize : Size = Size(0.0, 0.0)
    (swift) var someRectangle = Rectangle()
    // someRectangle : Rectangle = <Rectangle instance>

Structures and classes both use *initializer syntax* when creating new instances.
The simplest form of initializer syntax uses the type name of the class or structure,
followed by empty parentheses ``()``.
This creates a new instance of the class or structure,
with any properties initialized to their default values.
In the example above,
the ``width`` and ``height`` values of the ``Size`` structure instance
have been automatically initialized to ``0.0``,
which was the default value provided by the ``Size`` structure's definition.

Class and structure initialization is described in more detail in `Initializers`_ below.

.. TODO: add more detail about inferring a variable's type when using initializer syntax.
.. TODO: note that you can only use the default constructor if you provide default values
   for all properties on a structure or class.

Terminology
___________

An *instance* of a class (such as ``someRectangle`` above)
is traditionally known as an *object*.
This terminology will be used from now on to refer to instances of classes.
Wherever you see the word *object* below,
it will refer to a single specific instance of a particular class.

Instances of structures are generally referred to as *structs*.
The word ‘struct’ will be used from now on to refer to structure instances
(such as ``someSize``),
and the word *structure* will be used to refer to their type
(such as ``Size``).

Accessing Properties
~~~~~~~~~~~~~~~~~~~~

The properties of an object or struct can be accessed using *dot syntax*:

.. testcode:: classesAndStructs

    (swift) println("The width of someSize is \(someSize.width)")
    >>> The width of someSize is 0.0

``someSize.width`` refers to the ``width`` property of the ``someSize`` struct.
Dot syntax can also be used to drill down into properties
which are themselves objects or structs,
such as the ``width`` property of a ``Rectangle``'s ``size``:

.. testcode:: classesAndStructs

    (swift) println("The width of someRectangle is \(someRectangle.size.width)")
    >>> The width of someRectangle is 0.0

Unlike Objective-C,
the values of sub-properties can also be set directly, regardless of their type.
In the example below, ``someRectangle.size.width`` is set to a new value of ``2.0``,
even though it is a sub-property of ``someRectangle.size``:

.. testcode:: classesAndStructs

    (swift) someRectangle.size.width = 2.0
    (swift) println("The width of someRectangle is now \(someRectangle.size.width)")
    >>> The width of someRectangle is now 2.0

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All structures have an automatically-generated *memberwise initializer*,
which can be used to initialise the member properties of new structs of that type.
Initial values for the properties of the new struct
can be passed to the memberwise initializer by name:

.. testcode:: classesAndStructs

    (swift) let twoByTwo = Size(width: 2.0, height: 2.0)
    // twoByTwo : Size = Size(2.0, 2.0)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the structure's definition:

.. testcode:: classesAndStructs

    (swift) let fourByThree = Size(4.0, 3.0)
    // fourByThree : Size = Size(4.0, 3.0)

.. TODO: Include a justifiable reason for why classes do not provide a memberwise initializer.
.. TODO: Describe the creation of custom initializers.
.. TODO: This whole section needs updating in light of the changes for definite initialization.
   Memberwise initializers will only exist if default values are provided for all properties.

Stored and Computed Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In its simplest form, a property is just a named value
that is stored as part of an object or struct, as shown above.
Properties of this kind are known as *stored properties*.

Properties aren't restricted to simple stored values, however.
Classes and structures can also define *computed properties*,
which do not actually store a value:

.. testcode:: classesAndStructs

    (swift) struct Point {
        var x = 0.0, y = 0.0
    }
    (swift) struct Rect {
        var origin = Point()
        var size = Size()
        var center: Point {
        get:
            var centerX = origin.x + (size.width / 2)
            var centerY = origin.y + (size.height / 2)
            return Point(centerX, centerY)
        set(newCenter):
            origin.x = newCenter.x - (size.width / 2)
            origin.y = newCenter.y - (size.height / 2)
        }
    }
    (swift) var square = Rect(origin: Point(0.0, 0.0), size: Size(10.0, 10.0))
    // square : Rect = Rect(Point(0.0, 0.0), Size(10.0, 10.0))
    (swift) let initialSquareCenter = square.center
    // initialSquareCenter : Point = Point(5.0, 5.0)
    (swift) square.center = Point(x: 15.0, y: 15.0)
    (swift) println("square origin is now at (\(square.origin.x), \(square.origin.y))")
    >>> square origin is now at (10.0, 10.0)

This example uses the previously-defined ``Size`` structure,
and defines two additional structures for working with geometric shapes:

* ``Point``, which encapsulates an ``(x, y)`` co-ordinate
* ``Rect``, which defines a rectangle in terms of an origin point and a size

The ``Rect`` structure also provides a computed property called ``center``.
The current value of a ``Rect``'s center can always be determined from its current ``origin`` and ``size``,
and so there is no need to actually store the center point as an explicit ``Point`` value.
Instead, ``Rect`` defines custom getter and setter methods for a computed variable called ``center``,
to enable you to work with the rectangle's ``center`` as if it were a real stored property.

This example creates a new ``Rect`` variable called ``square``.
The ``square`` variable is initialized with an origin point of ``(0, 0)``,
and a width and height of ``10``.
This is equivalent to the blue square in the diagram below.

The ``square`` variable's ``center`` property is then accessed via dot syntax (``square.center``).
This causes ``center``'s ``get`` method to be called,
to retrieve the current property value.
Rather than returning an existing value,
this actually calculates and returns a new ``Point`` to represent the center of the square.
As can be seen above, this correctly returns a center point of ``(5, 5)``.

The ``center`` property is then set to a new value of ``(15, 15)``.
This moves the square up and to the right,
to the new position shown by the orange square in the diagram below.
Setting the ``center`` property actually calls ``center``'s ``set:`` method.
This modifies the ``x`` and ``y`` values of the stored ``origin`` property,
and moves the square to its new position.

.. image:: ../images/computedProperties.png
    :width: 400
    :align: center

Shorthand Getter and Setter Declarations
________________________________________

A computed property's getter can be written without the ``get`` keyword
if the getter comes before the setter.
Additionally, if a computed property's setter does not define a name
for the new value to be set,
a default name of ``value`` is used.
Here's an alternative version of the ``Rect`` structure,
which takes advantage of these shorthand notations:

.. testcode:: classesAndStructs

    (swift) struct AlternativeRect {
        var origin = Point()
        var size = Size()
        var center: Point {
            var centerX = origin.x + (size.width / 2)
            var centerY = origin.y + (size.height / 2)
            return Point(centerX, centerY)
        set:
            origin.x = value.x - (size.width / 2)
            origin.y = value.y - (size.height / 2)
        }
    }

Read-Only Computed Properties
_____________________________

A computed property with a getter but no setter is known as a *read-only computed property*.
Read-only computed properties enable you to
define a property that will always return a value,
and can be accessed via dot syntax,
but which cannot be set to a different value by users of your class or structure.

As mentioned above,
the declaration of computed properties –
including read-only computed properties –
can be simplified by removing the ``get`` keyword:

.. testcode:: classesAndStructs

    (swift) struct Cuboid {
        var width = 0.0, height = 0.0, depth = 0.0
        var volume: Double {
            return width * height * depth
        }
    }
    (swift) let fourByFiveByTwo = Cuboid(4.0, 5.0, 2.0)
    // fourByFiveByTwo : Cuboid = Cuboid(4.0, 5.0, 2.0)
    (swift) println("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
    >>> the volume of fourByFiveByTwo is 40.0

This example defines a new structure called ``Cuboid``,
which represents a 3D rectangular box with ``width``, ``height`` and ``depth`` properties.
This structure also has a read-only computed property called ``volume``,
which calculates and returns the current volume of the cuboid.
It doesn't make sense for ``volume`` to be settable,
as it would be ambiguous as to which values of ``width``, ``height`` and ``depth``
should be used for a particular ``volume`` value.
Nonetheless, it is useful for a ``Cuboid`` to provide a read-only computed property
to enable the outside world to discover its current calculated volume.

Read-only computed properties are not the same as constant properties.
They have some similarities,
in that neither can have their value set by external users of the class or structure,
but they differ considerably in how their values are retrieved.
Constant properties are assigned their own storage,
and the contents of this storage cannot be changed to a different value
once it has been set during initialization.
Read-only computed properties do not have storage assigned to them,
and can return any value they like at any time.

.. TODO: make it explicit that we have constant and variable properties,
   and perhaps change the HTTPStatus example to use a class rather than a struct
.. NOTE: getters and setters are also allowed for named values
   that are not associated with a particular class or struct.
   Where should this be mentioned?
.. TODO: Anything else from https://[Internal Staging Server]/docs/StoredAndComputedVariables.html

Value Types and Reference Types
-------------------------------

Classes and structures have many things in common in Swift.
However, they have one fundamental difference:

* Structures define *value types*
* Classes define *reference types*

This difference is very important when deciding how to define the building blocks of your code.

.. TODO: this section needs updating to clarify that assignment is always like value semantics,
   and it's only really possible to see the difference when looking at the properties of a type.

Value Types
~~~~~~~~~~~

.. TODO: Have I actually described what a 'type' is by this point?
.. TODO: If this section is talking about value types, it needs to talk about enums too.

A *value type* is a type that is *copied*
when it is assigned to a variable or constant,
or when it is passed to a function.

You've actually been using value types extensively throughout the previous chapters.
In fact, all of the basic types in Swift –
integers, floating-point numbers, booleans, strings, enumerations, arrays and dictionaries –
are value types.

Swift structures are also value types.
This means that any structs you create –
and any value types they have as properties –
will always be copied when they are passed around.

For example, using the ``Size`` structure from above:

.. testcode:: classesAndStructs

    (swift) let iPhone4 = Size(width: 640.0, height: 960.0)
    // iPhone4 : Size = Size(640.0, 960.0)
    (swift) var iPhone5 = iPhone4
    // iPhone5 : Size = Size(640.0, 960.0)
    (swift) iPhone5.height = 1136.0
    (swift) println("The iPhone 5 screen is now \(iPhone5.height) pixels high")
    >>> The iPhone 5 screen is now 1136.0 pixels high
    (swift) println("The iPhone 4 screen is still \(iPhone4.height) pixels high")
    >>> The iPhone 4 screen is still 960.0 pixels high

This example declares a constant called ``iPhone4``,
and sets it to a ``Size`` struct initialized with
the width and height of the iPhone 4's screen
(which is 640 pixel wide, and 960 pixels tall).

It then declares a variable called ``iPhone5``,
and sets it to the current value of ``iPhone4``.
Because ``Size`` is a structure,
a new copy of the existing struct is made,
and this new copy is assigned to ``iPhone5``.
``iPhone4`` and ``iPhone5`` may currently have the same width and height,
but they are two completely different structs behind the scenes.

Next, the ``height`` property of the ``iPhone5`` struct is amended to be
the height of the iPhone 5's taller screen (which is 1,136 pixels tall).

The two calls to ``println`` at the end of this example show that
the ``height`` property of ``iPhone5`` has indeed changed to be ``1136.0``.
However, the ``height`` property of the original ``iPhone4`` struct
still has the old value of ``960.0``.

When ``iPhone5`` is given the current value of ``iPhone4``,
the *values* stored in ``iPhone4`` are copied into the new ``iPhone5`` struct.
The end result is two completely separate structs,
which just happened to contain the same numeric values.
Because they are separate structs,
setting the height of ``iPhone5`` to ``1136.0``
doesn't affect the height value stored in ``iPhone4``.

.. TODO: Should I give an example of passing a value type to a function here?

Reference Types
~~~~~~~~~~~~~~~

Unlike value types, a reference type is *not* copied when is assigned to a variable or constant,
or when it is passed to a function.
Rather than making a copy, a *reference* to the same existing instance of that type is used instead.

.. TODO: This enables you to have multiple variables and constants
   that all refer to the same one instance. 

Here's an example, using the ``Rectangle`` class defined above:

.. testcode:: classesAndStructs

    (swift) let rect = Rectangle()
    // rect : Rectangle = <Rectangle instance>
    (swift) rect.size = Size(width: 1.0, height: 1.0)
    (swift) println("The rectangle's width is \(rect.size.width)")
    >>> The rectangle's width is 1.0
    (swift) let sameRect = rect
    // sameRect : Rectangle = <Rectangle instance>
    (swift) sameRect.size.width = 3.0
    (swift) println("The rectangle's width is now \(sameRect.size.width)")
    >>> The rectangle's width is now 3.0
    (swift) println("The rectangle's width is now \(rect.size.width)")
    >>> The rectangle's width is now 3.0

This example declares a new constant called ``rect``,
and sets it to refer to a new ``Rectangle`` object.
The rectangle is given a size with a width and height of ``1.0``.

A second constant is also declared, called ``sameRect``,
and is set to refer to the same rectangle already referred to by ``rect``.
This *doesn't* copy ``rect``, or create a new ``Rectangle`` object –
instead, there are now *two* constants that refer to the same one underlying object.

The width of the rectangle is then modified.
Because ``sameRect`` refers to the same object as ``rect``,
the underlying ``width`` and ``height`` properties can be accessed via either ``rect`` or ``sameRect`` –
it doesn't make a difference which one is chosen, as they both refer to the same thing.
Here, the width and height are accessed and changed via ``sameRect``
(e.g. ``sameRect.size.width``).

The final lines of this example print the current value of the rectangle's width.
As shown here, it doesn't matter whether you access the width via ``rect`` or ``sameRect`` –
the updated value of ``3.0`` from the underlying rectangle is returned in both cases.

Note that ``rect`` and ``sameRect`` are declared as *constants*,
rather than variables.
However, it is still possible to change ``rect.size`` and ``sameRect.size.width``.
This is allowed because
the values of the ``rect`` and ``sameRect`` constants themselves do not actually change.
``rect`` and ``sameRect`` do no themselves store the rectangle –
instead, they both *refer* to a rectangle behind the scenes.
The ``width`` property of the underlying rectangle is changed,
not the values of the ``rect`` and ``sameRect`` references to that rectangle.

.. TODO: Surely a rectangle is a good candidate for a structure, not a class…

Classes are the only reference types in Swift.
If you want to create a new type that is passed by reference rather than by value,
you should define it as a class in your code.

.. TODO: Why would you want to use reference types rather than value types?

Pointers
________

If you have experience with C, C++ or Objective-C,
you may be familiar with the fact that these languages use *pointers* to refer to objects.
Variables, constants and properties that refer to an instance of a reference type
are very similar to pointers in C-like languages,
but do not use the reference operator (``&``) or dereference operator (``*``)
to differentiate between a pointer and the memory it points to.
Instead, a reference type in Swift is declared like any other named value,
and the value it contains is always a reference to a particular object instance.

.. TODO: We need something here to say
   "but don't worry, you can still do all of the stuff you're used to".

.. TODO: Add a justification here to say why this is a good thing.

.. TODO: Add a section about using the identity operator
   to check if two reference named values point to the same instance.
   This is currently blocked on rdar://problem/15566395 .

Choosing Between Classes and Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Classes and structures have many things in common.
However, the fact that structs are always passed by value,
and objects are always passed by reference,
means that they are suited to different kinds of tasks.
As you consider the data constructs and functionality that you need for a project,
you will need to decide whether each data construct should be
defined as a class or as a structure.

As a general rule, you should only define a new structure when:

* the structure's primary purpose is to encapsulate a few relatively simple data values
* the structure will not have particularly complex functionality
  (although it may provide one or two convenience methods to work with its stored values)
* it is reasonable to expect that the encapsulated values will be copied rather than referenced
  when assigning or passing around an instance of that structure
* any properties stored by the structure are themselves value types,
  which would also be expected to be copied rather than referenced
* there is no need to inherit properties or behavior from some other existing type

Examples of good candidates for structures include:

* the size of a geometric shape
  (perhaps encapsulating a ``width`` property and a ``height`` property,
  both of type ``Double``)
* a way to refer to ranges within a series
  (perhaps encapsulating a ``start`` property and a ``length`` property,
  both of type ``Int``)
* a point in a 3D coordinate system
  (perhaps encapsulating ``x``, ``y`` and ``z`` properties, each of type ``Double``)

In all other cases, you should define a class,
and create objects as instances of that class,
to be managed and passed by reference.
In practice, this means that most custom data constructs should be classes,
not structures.

Methods
-------

[to be written]

Initializers
------------

[to be written]

Type Properties and Methods
---------------------------

[to be written]

.. TODO: mention that all by-value properties of a constant struct are also constant
.. TODO: what happens if one property of a constant struct is an object reference?
.. TODO: immutability of value type constants means that
   their mutable properties are also immutable
.. TODO: type variables, constants and methods

Inheritance
-----------

[to be written]

Destructors
-----------

[to be written]

Type Casting
------------

[to be written]

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
    * /include/swift/AST/Attr.def