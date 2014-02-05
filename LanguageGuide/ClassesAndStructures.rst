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

.. testcode:: classesAndStructures

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

.. testcode:: classesAndStructures

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

The example also defines a new class called ``Rectangle``,
which has a variable property called ``size``.
This property is initialized with a new ``Size`` structure instance,
which infers a property type of ``Size``.

Class and Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Size`` structure definition, and the ``Rectangle`` class definition,
only describe what a generic ``Size`` or ``Rectangle`` will look like.
They do not in themselves describe a specific size or rectangle.
To do that, you need to create an *instance* of the class or structure.

The syntax for creating instances is very similar for both structures and classes:

.. testcode:: classesAndStructures

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

Class and structure initialization is described in more detail in `Initialization`_ below.

.. TODO: add more detail about inferring a variable's type when using initializer syntax.
.. TODO: note that you can only use the default constructor if you provide default values
   for all properties on a structure or class.

Terminology
___________

An instance of a class (such as ``someRectangle`` above)
is traditionally known as an *object*.
However, Swift classes and structures are much closer in functionality than in other languages,
and much of this chapter describes functionality that can apply to
instances of *either* a class or a structure type.
Because of this, the more general term *instance* is used below.

Accessing Properties
~~~~~~~~~~~~~~~~~~~~

The properties of an instance can be accessed using *dot syntax*:

.. testcode:: classesAndStructures

    (swift) println("The width of someSize is \(someSize.width)")
    >>> The width of someSize is 0.0

``someSize.width`` refers to the ``width`` property of ``someSize``.
Dot syntax can also be used to drill down into sub-properties
such as the ``width`` property of a ``Rectangle``'s ``size``:

.. testcode:: classesAndStructures

    (swift) println("The width of someRectangle is \(someRectangle.size.width)")
    >>> The width of someRectangle is 0.0

Unlike Objective-C,
the values of sub-properties can be set directly, regardless of their type.
In the example below, ``someRectangle.size.width`` is set to a new value of ``2.0``,
even though it is a sub-property of ``someRectangle.size``:

.. testcode:: classesAndStructures

    (swift) someRectangle.size.width = 2.0
    (swift) println("The width of someRectangle is now \(someRectangle.size.width)")
    >>> The width of someRectangle is now 2.0

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All structures have an automatically-generated *memberwise initializer*,
which can be used to initialise the member properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name:

.. testcode:: classesAndStructures

    (swift) let twoByTwo = Size(width: 2.0, height: 2.0)
    // twoByTwo : Size = Size(2.0, 2.0)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the structure's definition:

.. testcode:: classesAndStructures

    (swift) let fourByThree = Size(4.0, 3.0)
    // fourByThree : Size = Size(4.0, 3.0)

.. TODO: Include a justifiable reason for why classes do not provide a memberwise initializer.
.. TODO: Describe the creation of custom initializers.
.. TODO: This whole section needs updating in light of the changes for definite initialization.
   Memberwise initializers will only exist if default values are provided for all properties.

Stored Properties
~~~~~~~~~~~~~~~~~

In its simplest form, a property is just a named value
that is stored as part of an instance.
Properties of this kind are known as *stored properties*.
Stored properties can be either *variable stored properties*
(introduced by the ``var`` keyword, as in the examples above),
or *constant stored properties* (introduced by the ``let`` keyword).

Constant stored properties are very similar to constant named values,
in that their value cannot be changed once it has been initialized.
Constant stored properties have slightly more flexibility, however,
in that their value can be changed at any point until the instance they belong to
has completed its initialization.
(Instance initialization is described in more detail in `Initialization`_ below.)

Computed Properties
~~~~~~~~~~~~~~~~~~~

Classes and structures can also define *computed properties*,
which do not actually store a value:

.. testcode:: classesAndStructures

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

A computed property's getter can be written without the ``get`` keyword,
if the getter comes before the setter.
Additionally, if a computed property's setter does not define a name
for the new value to be set,
a default name of ``value`` is used.
Here's an alternative version of the ``Rect`` structure,
which takes advantage of these shorthand notations:

.. testcode:: classesAndStructures

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

.. testcode:: classesAndStructures

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

Computed properties – including read-only computed properties –
are always declared as variable properties (via the ``var`` introducer).
The ``let`` introducer is only ever used for constant properties,
to indicate that their value cannot be changed once it is set as part of instance initialization.

.. NOTE: getters and setters are also allowed for named values
   that are not associated with a particular class or struct.
   Where should this be mentioned?
.. TODO: Anything else from https://[Internal Staging Server]/docs/StoredAndComputedVariables.html

Properties and Instance Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have experience with Objective-C,
you may be familiar with the fact that it provides two complementary ways
to store values and references alongside instances of a class.
In addition to properties,
Objective-C also has the concept of *instance variables*,
which are used as a 'backing' store for the values stored in a property.

Swift unifies these two separate concepts into a single unified property declaration.
There is no longer a distinction between properties and instance variables,
and the backing store for a property is not accessed directly.
This avoids potential confusion around how the value is accessed in different contexts,
and simplifies the property's declaration into a single, definite statement.
All of the information about the property –
including its name, type, and memory management characteristics –
is defined in a single location as part of the class definition.

.. TODO: How do I define whether my properties are strong- or weak-reference?

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
This means that any instances you create from your own structures –
and any value types they have as properties –
will always be copied when they are passed around.

For example, using the ``Size`` structure from above:

.. testcode:: classesAndStructures

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
and sets it to a ``Size`` instance initialized with
the width and height of the iPhone 4's screen
(which is 640 pixel wide, and 960 pixels tall).

It then declares a variable called ``iPhone5``,
and sets it to the current value of ``iPhone4``.
Because ``Size`` is a structure,
a new copy of the existing instance is made,
and this new copy is assigned to ``iPhone5``.
``iPhone4`` and ``iPhone5`` may currently have the same width and height,
but they are two completely different instances behind the scenes.

Next, the ``height`` property of ``iPhone5`` is amended to be
the height of the iPhone 5's taller screen (which is 1,136 pixels tall).

The two calls to ``println`` at the end of this example show that
the ``height`` property of ``iPhone5`` has indeed changed to be ``1136.0``.
However, the ``height`` property of the original ``iPhone4`` instance
still has the old value of ``960.0``.

When ``iPhone5`` is given the current value of ``iPhone4``,
the *values* stored in ``iPhone4`` are copied into the new ``iPhone5`` instance.
The end result is two completely separate instances,
which just happen to contain the same numeric values.
Because they are separate instances,
setting the height of ``iPhone5`` to ``1136.0``
doesn't affect the height value stored in ``iPhone4``.

.. TODO: Should I give an example of passing a value type to a function here?

Reference Types
~~~~~~~~~~~~~~~

Unlike value types, a reference type is *not* copied when is assigned to a variable or constant,
or when it is passed to a function.
Rather than making a copy, a *reference* to the same existing instance is used instead.

.. TODO: This enables you to have multiple variables and constants
   that all refer to the same one instance. 

Here's an example, using the ``Rectangle`` class defined above:

.. testcode:: classesAndStructures

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
and sets it to refer to a new ``Rectangle`` instance.
The rectangle is given a size with a width and height of ``1.0``.

A second constant is also declared, called ``sameRect``,
and is set to refer to the same rectangle already referred to by ``rect``.
This *doesn't* copy ``rect``, or create a new ``Rectangle`` instance –
instead, there are now *two* constants that refer to the same one underlying instance.

The width of the rectangle is then modified.
Because ``sameRect`` refers to the same instance as ``rect``,
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
and the value it contains is always a reference to a particular instance of that type.

.. TODO: We need something here to say
   "but don't worry, you can still do all of the stuff you're used to".

.. TODO: Add a justification here to say why this is a good thing.

.. TODO: Add a section about using the identity operator
   to check if two reference named values point to the same instance.
   This is currently blocked on rdar://problem/15566395 .

Choosing Between Classes and Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Classes and structures have many things in common.
However, the fact that structure instances are always passed by value,
and class instances are always passed by reference,
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

In all other cases, you should define a class, and create instances of that class,
to be managed and passed by reference.
In practice, this means that most custom data constructs should be classes,
not structures.

Methods
-------

[to be written]

.. TODO: mention that the only time you *need* to use self to refer to properties is
   when a method parameter has the same name as a property.
   You could fix this either by using self.propertyName,
   or by changing the parameter name.
   This is mentioned here, rather than in Initializer Methods below,
   because it is a general principle for all methods when they access instance properties.

Inheritance
-----------

[to be written]

.. TODO: mention that methods can return DynamicSelf (a la instancetype)

Initialization
--------------

Classes and structures should always initialize their stored properties with initial values.
There are two ways to provide initial values for your properties:

1. Include an initial value as part of the property declaration
   (as described in `Properties`_)
2. Provide a value for the property within an *initializer method*

.. note::
    If you assign a default value to a property,
    or set its initial value within an initializer method,
    the value of that property is set directly, without calling any observers.
    Any ``willSet`` or ``didSet`` methods that observe the setting of that property
    will not be called at the point that it is initialized.

.. QUESTION: is this the right place to mention this note?

.. QUESTION: the same is also true for Obj-C KVO observers of the property.
   Is it appropriate to mention that here?

.. QUESTION: is this true once the instance is fully qualified within the initializer?
   To put it another way, is property setting *always* direct in an init?
   (I think the answer is yes.)

Initializer Methods
~~~~~~~~~~~~~~~~~~~

*Initializer methods* are special methods that can be called when a new instance of your type is created.
In its simplest form, an initializer method is just an instance method with no parameters,
written using the ``init`` keyword:

.. testcode:: initialization

    (swift) struct Fahrenheit {
        var temperature: Double
        init() {
            temperature = 32.0
        }
    }
    (swift) var f = Fahrenheit()
    // f : Fahrenheit = Fahrenheit(32.0)
    (swift) println("The default temperature is \(f.temperature)° Fahrenheit")
    >>> The default temperature is 32.0° Fahrenheit

This example defines a new structure to store temperatures expressed in the Fahrenheit scale.
The structure has one stored property, ``temperature``, which is of type ``Double``.
The structure defines a single initializer method, ``init()``, with no parameters,
which initializes the stored temperature value to ``32.0``
(the freezing point of water when expressed in the Fahrenheit scale).

Initializer methods always begin with ``init``,
and do not require the ``func`` keyword before their name.
Unlike Objective-C, Swift initializer methods do not return a value.
Their primary role is to ensure that new instances of that type
are correctly initialized before they are used for the first time.

As an alternative, this example could have been written
by providing a default value at the point that the property is declared:

.. testcode:: initialization

    (swift) struct AnotherFahrenheit {
        var temperature: Double = 32.0
    }

If a property should always taken the same initial value,
it is preferable to set this value as a default when the property is declared,
as in the ``AnotherFahrenheit`` example.
The end result –
a default value of ``32.0`` for ``temperature`` when a new instance is created –
is the same in both cases.

Swift provides a *default initializer* method implementation
for any class or structure that does not provide at least one initializer method itself.
The default initializer simply creates a new instance
with all of its properties set to their default values.
You don't have to declare that you want the default initializer to be implemented –
it is available automatically for all classes and structures without their own initializer.

.. note::
    The default initializer method for structures is provided in addition to the
    `memberwise structure initializers`_ mentioned earlier in this chapter.
    The default initializer and the memberwise initializer are only provided
    if the structure does not define at least one custom initializer method itself.

.. TODO: Add a justification?

Initializer methods can take optional input parameters,
to customize the initialization process.
The following example defines a structure to store temperatures expressed in the Celsius scale.
It implements two custom initializer methods,
each of which initializes a new instance of the structure
with a value from a different temperature scale:

.. testcode:: initialization

    (swift) struct Celsius {
        var temperatureInCelsius: Double = 0.0
        init withFahrenheit(fahrenheit: Double) {
            temperatureInCelsius = (fahrenheit - 32.0) / 1.8
        }
        init withKelvin(kelvin: Double) {
            temperatureInCelsius = kelvin + 273.15
        }
    }
    (swift) var boilingPointOfWater = Celsius(withFahrenheit: 212.0)
    // boilingPointOfWater : Celsius = Celsius(100.0)
    (swift) var freezingPointOfWater = Celsius(withKelvin: -273.15)
    // freezingPointOfWater : Celsius = Celsius(0.0)

The value of a constant ``let`` property can be modified at any point during initialization,
as long as is is definitely set to a value by the time the initializer has finished:

.. testcode:: initialization

    (swift) struct Temperature {
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
    (swift) var absoluteZero = Temperature(withValue: -273.15, inScale: "C")
    // absoluteZero : Temperature = Temperature(-273.15, "C")
    (swift) println("Temperature is \(absoluteZero.toKelvin())°K")
    >>> Temperature is 0.0°K

.. TODO: This could do with a more elegant example.

Definite Initialization
~~~~~~~~~~~~~~~~~~~~~~~

If your class or structure provides one or more custom initializer methods,
Swift checks these methods to make sure that all properties are fully initialized
by the time each initializer method has done its job.
This process is known as *definite initialization*,
and helps to ensure that your instances are always valid before they are used.
Swift will warn you at compile-time if your class or structure does not pass
the definite initialization test.

Initializer Delegation
~~~~~~~~~~~~~~~~~~~~~~

Initializers can delegate some or all of the task of initialization to
other initializers within the same class or structure by calling ``self.init``.
The code below defines a ``Document`` class,
which uses a default ``title`` value of ``[untitled]`` if none is specified:

.. testcode:: initialization

    (swift) class Document {
        var title: String
        init withTitle(title: String) {
            self.title = title
        }
        init() {
            self.init(withTitle: "[untitled]")
        }
    }

.. note::
    The ``init withTitle()`` method refers to the instance's ``title`` property as ``self.title``,
    rather than simply as ``title``.
    This is required to differentiate between the *variable property* called ``title``,
    and the *initializer method parameter* called  ``title``.
    The ``self`` prefix would not be required if their names were different.
    The use of ``self`` before the property name does not affect
    the way in which the property is accessed or set –
    it is purely used for disambiguation.

This first example declares a new constant called ``thisBook``,
and sets it to the result of calling ``init withTitle()`` for a specific title string:

.. testcode:: initialization

    (swift) let thisBook = Document(withTitle: "The Swift Programming Language")
    // thisBook : Document = <Document instance>
    (swift) println("This book is called '\(thisBook.title)'")
    >>> This book is called 'The Swift Programming Language'

This second example declares a new constant called ``someBook``,
and sets it to the result of ``Document``'s basic ``init()`` method.
This method delegates to the more detailed ``init withTitle()`` method,
passing it a placeholder string value of ``[untitled]``:

.. testcode:: initialization

    (swift) let someBook = Document()
    // someBook : Document = <Document instance>
    (swift) println("Some unknown book is called '\(someBook.title)'")
    >>> Some unknown book is called '[untitled]'

Both of these initializer methods ensure that the value of ``title``
is set to a valid string before the method ends.
This means that the ``Document`` class passes the ‘definite initialization’ test mentioned above.

Subclassing and Initialization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift classes do not automatically inherit initializer methods from their parent classes.
This behavior is different from Objective-C, where initializers are inherited by default.
Swift's avoidance of automatic initializer inheritance ensures that
subclasses are able to control exactly how they can be instantiated.

To help with this,
Swift inserts an implicit call to ``super.init()``
at the end of any subclass initializer method
that does not either call a superclass initializer itself,
or hand off to a same-class initializer that ultimately calls a superclass initializer.
This ensures that properties of the parent class
(and so on up the chain)
still get instantiated,
even if an explicit superclass initializer is not called.

The example below defines a new subclass of ``Document``, called ``TextDocument``.
This subclass adds an additional string property called ``bodyText``,
which is given a default value of ``[replace me]``.

``TextDocument`` provides four ways for a new text document to be initialized:

* ``init()``, passing in no specific values
* ``init withTitle()``, passing in a specific title but no body text
* ``init withText()``, passing in some specific body text but no title
* ``init withTitle() text()``, passing in a specific title and body text

Here's how it looks in Swift code:

.. testcode:: initialization

    (swift) class TextDocument : Document {

        var bodyText: String = "[replace me]"

        init() {}

        init withTitle(title: String) {
            super.init(withTitle: title)
        }

        init withText(text: String) {
            bodyText = text
        }

        init withTitle(title: String) text(text: String) {
            self.init(withTitle: title)
            bodyText = text
        }

    }

The first initializer method, ``init()``, takes no parameters at all.
The curly braces after the parentheses define an empty code block for the method:

::

    (swift)     init() {}

Despite having an empty code block,
this method still creates a new ``TextDocument`` instance with a default title and text.
The default value of ``bodyText`` comes from the ``bodyText`` property declaration,
and the default value of ``title`` comes from Swift inserting an implicit call to ``super.init()``
at the end of this empty code block.

Here's how this initializer could be called:

.. testcode:: initialization

    (swift) let empty = TextDocument()
    // empty : TextDocument = <TextDocument instance>
    (swift) println("\(empty.title):\n\(empty.bodyText)")
    >>> [untitled]:
    >>> [replace me]

``TextDocument`` does not actually do any custom initialization inside its empty ``init()`` method.
However, it is still necessary to provide an empty definition
in order to be able to call ``TextDocument()``.
Because ``TextDocument`` defines its own initializers,
it does not get a default initializer implementation for ``init()``.
Providing an empty ``init()`` definition means that there is
still an ``init()`` method to call when a new document is created via basic initializer syntax.

The second initializer method, ``init withTitle()``,
calls the superclass ``init withTitle()`` method from ``Document``,
and passes in the new value of ``title``:

::

    (swift)     init withTitle(title: String) {
            super.init(withTitle: title)
        }

As before, the value of ``bodyText`` comes from the property' default value.

Here's how this initializer could be called:

.. testcode:: initialization

    (swift) let titled = TextDocument(withTitle: "Write something please")
    // titled : TextDocument = <TextDocument instance>
    (swift) println("\(titled.title):\n\(titled.bodyText)")
    >>> Write something please:
    >>> [replace me]

The third initializer method, ``init withText()``,
sets the ``bodyText`` property to a new ``text`` value:

::

    (swift)     init withText(text: String) {
            bodyText = text
        }

Because it doesn't call a superclass initializer,
Swift inserts an implicit ``super.init()`` call at the end of the method.
This calls ``Document``'s ``init()`` method,
which in turn calls ``Document``'s ``init withTitle()`` method
and sets the same placeholder title as before.

Here's how this initializer could be called:

.. testcode:: initialization

    (swift) let untitledPangram = TextDocument(
        withText: "Amazingly few discotheques provide jukeboxes")
    // untitledPangram : TextDocument = <TextDocument instance>
    (swift) println("\(untitledPangram.title):\n\(untitledPangram.bodyText)")
    >>> [untitled]:
    >>> Amazingly few discotheques provide jukeboxes

The final initializer method, ``init withTitle() text()``,
starts by delegating across to ``TextDocument``'s own ``init withTitle()`` method.
This in turn delegates up to ``Document``'s ``init withTitle()`` method.
It then sets ``bodyText`` to the new ``text`` value.

::

    (swift)     init withTitle(title: String) text(text: String) {
            self.init(withTitle: title)
            bodyText = text
        }

There's no reason why ``TextDocument`` couldn't have called up to
``Document``'s ``init withTitle()`` method directly.
The decision to delegate to its *own* ``init withTitle()`` method is mainly a design choice.
If ``TextDocument`` were to gain new functionality in the future –
perhaps to insert and update the title at the start of the body text –
then this functionality would typically be added in its own ``init withTitle()`` method.
Delegating to its own implementation of the method,
rather than straight up to the parent method,
helps to plan for functionality changes in the future.

Here's how this final initializer could be called:

.. testcode:: initialization

    (swift) let foxPangram = TextDocument(
        withTitle: "Quick brown fox",
        text: "The quick brown fox jumped over the lazy dog")
    // foxPangram : TextDocument = <TextDocument instance>
    (swift) println("\(foxPangram.title):\n\(foxPangram.bodyText)")
    >>> Quick brown fox:
    >>> The quick brown fox jumped over the lazy dog

.. TODO: Illustrate how the order of things matters when inserting calls to super.init

Destructors
-----------

[to be written]

Type Properties and Methods
---------------------------

[to be written]

.. TODO: mention that all by-value properties of a constant structure are also constant
.. TODO: what happens if one property of a constant structure is an object reference?
.. TODO: immutability of value type constants means that
   their mutable properties are also immutable
.. TODO: type variables, constants and methods

Type Casting
------------

[to be written]

Enumerations
------------

This chapter has talked primarily about classes and structures.
However, some of the features described above are also available to enumeration types in Swift.

Computed Properties for Enumerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Enumerations can provide computed (but not stored) properties.
These can be used to provide additional information about an enumeration member,
such as whether they are part of a group of related values.
For example:

.. testcode:: enumerationSpecialFeatures

    (swift) enum CardSuit : UnicodeScalar {
        case Spades = '♠', Hearts = '♡', Diamonds = '♢', Clubs = '♣'
        var isRed: Bool {
            switch self {
                case Hearts, Diamonds:
                    return true
                case Spades, Clubs:
                    return false
            }
        }
    }
    (swift) let someSuit = CardSuit.Hearts
    // someSuit : CardSuit = <unprintable value>
    (swift) if someSuit.isRed {
        println("\(someSuit.toRaw()) is a red suit")
    } else {
        println("\(someSuit.toRaw()) is a black suit")
    }
    >>> ♡ is a red suit

This example defines an enumeration called ``CardSuit``,
which contains a member for each of the four suits in a standard pack of playing cards.
Each suit is assigned the corresponding UnicodeScalar character for that suit as a raw value.
``CardSuit`` also declares a Boolean read-only computed property called ``isRed``,
which returns ``true`` for ``Hearts`` and ``Diamonds``,
and ``false`` for ``Spades`` and ``Clubs``.

A new constant, ``someSuit``, is initialized with the ``Hearts`` member value.
Its ``isRed`` property returns ``true``,
and the ``println`` call prints the raw ``UnicodeScalar`` value for ``Hearts``
along with an indication of its color.

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