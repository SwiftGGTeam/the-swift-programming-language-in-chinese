.. docnote:: Subjects to be covered in this section

    * Classes
    * Objects
    * Structures
    * Instance variables
    * Getters and setters
    * willSet / didSet
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
    * “is” to check for class membership
    * “as” for casting
    * No “self = [super init]” (assignment equates to void)
    * @inout
    * value types and reference types
    * Type functions and variables
    * Embedded classes and structures
    * Bound functions
    * @conversion functions for converting between types
    * Subscript getters and setters

Classes and Structures
======================

Swift provides two different ways to define flexible, reusable constructs
to use as the building blocks of your code.
These are known as :newTerm:`classes` and :newTerm:`structures`.

Classes and structures have many things in common in Swift.
Both can:

* declare :newTerm:`properties` to store values
* define :newTerm:`methods` to provide functionality
* define :newTerm:`initializers` to set up their initial state
* conform to :newTerm:`protocols` to provide standard functionality of a certain type, and
* be :newTerm:`extended` to expand their functionality beyond a default implementation

Protocols are covered in the :doc:`Protocols` chapter, and extensions are covered in the :doc:`Extensions` chapter.

In addition, classes have several capabilities that structures do not:

* :newTerm:`inheritance`, which enables one class to inherit the characteristics of another;
* :newTerm:`destructors`, which enable an instance of a class to tidy up after itself; and
* :newTerm:`type casting`, which enables you to check and interpret the type of a class instance at runtime

All of these capabilities are described in more detail below.

.. _ClassesAndStructures_DefiningClassesAndStructures:

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

.. _ClassesAndStructures_DefinitionSyntax:

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
Types should be given ``UpperCamelCase`` names
(such as ``SomeClass`` and ``SomeStructure`` here),
to match the capitalization of standard Swift types
(such as ``String``, ``Int``, and ``Bool``).
Named values, functions, and methods should always be given
``lowerCamelCase`` names
(such as ``allowedEntry`` and ``contentHeight``)
to differentiate them from type names.

.. _ClassesAndStructures_Properties:

Properties
----------

Classes and structures can both declare :newTerm:`properties`.
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

.. _ClassesAndStructures_ClassAndStructureInstances:

Class and Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Size`` structure definition, and the ``Rectangle`` class definition,
only describe what a generic ``Size`` or ``Rectangle`` will look like.
They do not in themselves describe a specific size or rectangle.
To do that, you need to create an :newTerm:`instance` of the class or structure.

The syntax for creating instances is very similar for both structures and classes:

.. testcode:: classesAndStructures

    (swift) val someSize = Size()
    // someSize : Size = Size(0.0, 0.0)
    (swift) val someRectangle = Rectangle()
    // someRectangle : Rectangle = <Rectangle instance>

Structures and classes both use :newTerm:`initializer syntax` when creating new instances.
The simplest form of initializer syntax uses the type name of the class or structure,
followed by empty parentheses ``()``.
This creates a new instance of the class or structure,
with any properties initialized to their default values.
In the example above,
the ``width`` and ``height`` values of the ``Size`` structure instance
have been automatically initialized to ``0.0``,
which was the default value provided by the ``Size`` structure's definition.

Class and structure initialization is described in more detail in :ref:`ClassesAndStructures_Initialization`.

.. TODO: add more detail about inferring a variable's type when using initializer syntax.
.. TODO: note that you can only use the default constructor if you provide default values
   for all properties on a structure or class.

.. _ClassesAndStructures_Terminology:

Terminology
___________

An instance of a class (such as ``someRectangle`` above)
is traditionally known as an :newTerm:`object`.
However, Swift classes and structures are much closer in functionality than in other languages,
and much of this chapter describes functionality that can apply to
instances of *either* a class or a structure type.
Because of this, the more general term :newTerm:`instance` is used below.

.. _ClassesAndStructures_AccessingProperties:

Accessing Properties
~~~~~~~~~~~~~~~~~~~~

The properties of an instance can be accessed using :newTerm:`dot syntax`:

.. testcode:: classesAndStructures

    (swift) println("The width of someSize is \(someSize.width)")
    >>> The width of someSize is 0.0

``someSize.width`` refers to the ``width`` property of ``someSize``.
Dot syntax can also be used to drill down into sub-properties
such as the ``width`` property in the ``size`` property of a ``Rectangle``:

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

.. _ClassesAndStructures_MemberwiseStructureInitializers:

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All structures have an automatically-generated :newTerm:`memberwise initializer`,
which can be used to initialise the member properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name:

.. testcode:: classesAndStructures

    (swift) val twoByTwo = Size(width: 2.0, height: 2.0)
    // twoByTwo : Size = Size(2.0, 2.0)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the structure's definition:

.. testcode:: classesAndStructures

    (swift) val fourByThree = Size(4.0, 3.0)
    // fourByThree : Size = Size(4.0, 3.0)

.. TODO: Include a justifiable reason for why classes do not provide a memberwise initializer.
.. TODO: Describe the creation of custom initializers.
.. TODO: This whole section needs updating in light of the changes for definite initialization.
   Memberwise initializers will only exist if default values are provided for all properties.

.. _ClassesAndStructures_StoredProperties:

Stored Properties
~~~~~~~~~~~~~~~~~

In its simplest form, a property is just a named value
that is stored as part of an instance.
Properties of this kind are known as :newTerm:`stored properties`.
Stored properties can be either :newTerm:`variable stored properties`
(introduced by the ``var`` keyword, as in the examples above),
or :newTerm:`constant stored properties` (introduced by the ``val`` keyword).

Constant stored properties are very similar to constant named values,
in that their value cannot be changed once it has been initialized.
Constant stored properties have slightly more flexibility, however,
in that their value can be changed at any point until the initializer for the class
they belong to has completed its initialization.
(Instance initialization is described in more detail in :ref:`ClassesAndStructures_Initialization`.)

.. _ClassesAndStructures_StoredPropertyObservers:

Stored Property Observers
_________________________

:newTerm:`Stored property observers` are a way to observe and respond to
the setting of new values for a stored property.
You have the option to define either or both of these observers on a stored property:

* ``willSet``, which is called just before the value is stored; and / or
* ``didSet``, which is called immediately after the new value is stored

If you implement a ``willSet`` observer,
it is passed the new property value as a constant parameter for you to check and use.
The ``didSet`` observer is not passed the new property value,
because it can access the new value as usual via the property's name.

Here's an example of ``willSet`` and ``didSet`` in action:

.. testcode:: classesAndStructures

    (swift) class StepCounter {
        var previousTotalSteps = 0
        var totalSteps: Int = 0 {
            willSet(newStepCount) {
                previousTotalSteps = totalSteps
            }
            didSet {
                if totalSteps > previousTotalSteps  {
                    println("Added \(totalSteps - previousTotalSteps) steps")
                }
            }
        }
    }
    (swift) val stepCounter = StepCounter()
    // stepCounter : StepCounter = <StepCounter instance>
    (swift) stepCounter.totalSteps = 200
    >>> Added 200 steps
    (swift) stepCounter.totalSteps = 360
    >>> Added 160 steps
    (swift) stepCounter.totalSteps = 896
    >>> Added 536 steps

This example defines a new class called ``StepCounter``,
which keeps track of the total number of steps that a person has taken while walking.
This class might be used with input data from a pedometer or other step counter
to keep track of a person's exercise during their daily routine.

The ``StepCounter`` class declares a ``totalSteps`` property of type ``Int``.
This is a stored property with ``willSet`` and ``didSet`` observers.
The class also declares a variable stored property called ``previousTotalSteps``
(which does not have any observers), and sets both properties to an initial value of ``0``.

.. note::

    ``willSet`` and ``didSet`` observers are not called when
    a property is first initialized with its default or initial value.
    They are only called when the property's value is set
    outside of an initialization context.

The ``willSet`` observer for ``totalSteps`` is called
whenever the property is assigned a new value.
This is true even if the new value is the same as the current value.
The stored value of ``totalSteps`` has not yet been updated by the time that ``willSet`` is called.

This example takes advantage of the fact that ``totalSteps`` has not yet been updated,
and copies the old value of ``totalSteps`` into the ``previousTotalSteps`` variable
before the new value is assigned.

The ``willSet`` observer is always passed the upcoming new value of the property,
and can use it to perform calculations if it wishes.
You can specify any name you like for this parameter.
In the example above, it has been named “``newTotalSteps``”,
although the parameter is not actually used in this example.
(If you leave out this parameter in your implementation of ``willSet``,
it will still be made available to your code, with a default parameter name of ``value``.)

Once the value of the ``totalSteps`` property has been updated,
its ``didSet`` observer is called.
In this example, the ``didSet`` observer looks at the new value of ``totalSteps``,
and compares it against the previous value.
If the total number of steps has increased,
a message is printed to indicate how many new steps have been taken.

.. note::

    If you assign a value to a property within its own ``didSet`` observer,
    the new value that you assign will replace the one that was just set.

.. TODO: mention that this also works for global / local variables

.. _ClassesAndStructures_ComputedProperties:

Computed Properties
~~~~~~~~~~~~~~~~~~~

Classes and structures can also define :newTerm:`computed properties`,
which do not actually store a value.
Instead, they provide a :newTerm:`getter`, and an optional :newTerm:`setter`,
to retrieve and set other properties and values indirectly.

.. testcode:: classesAndStructures

    (swift) struct Point {
        var x = 0.0, y = 0.0
    }
    (swift) struct Rect {
        var origin = Point()
        var size = Size()
        var center: Point {
            get {
                val centerX = origin.x + (size.width / 2)
                val centerY = origin.y + (size.height / 2)
                return Point(centerX, centerY)
            }
            set(newCenter) {
                origin.x = newCenter.x - (size.width / 2)
                origin.y = newCenter.y - (size.height / 2)
            }
        }
    }
    (swift) var square = Rect(origin: Point(0.0, 0.0), size: Size(10.0, 10.0))
    // square : Rect = Rect(Point(0.0, 0.0), Size(10.0, 10.0))
    (swift) val initialSquareCenter = square.center
    // initialSquareCenter : Point = Point(5.0, 5.0)
    (swift) square.center = Point(x: 15.0, y: 15.0)
    (swift) println("square origin is now at (\(square.origin.x), \(square.origin.y))")
    >>> square origin is now at (10.0, 10.0)

This example uses the previously-defined ``Size`` structure,
and defines two additional structures for working with geometric shapes:

* ``Point``, which encapsulates an ``(x, y)`` co-ordinate
* ``Rect``, which defines a rectangle in terms of an origin point and a size

The ``Rect`` structure also provides a computed property called ``center``.
The current center position of a ``Rect`` can always be determined from its ``origin`` and ``size``,
and so there is no need to actually store the center point as an explicit ``Point`` value.
Instead, ``Rect`` defines a custom getter and setter for a computed variable called ``center``,
to enable you to work with the rectangle's ``center`` as if it were a real stored property.

This example creates a new ``Rect`` variable called ``square``.
The ``square`` variable is initialized with an origin point of ``(0, 0)``,
and a width and height of ``10``.
This is equivalent to the blue square in the diagram below.

The ``square`` variable's ``center`` property is then accessed via dot syntax (``square.center``).
This causes the getter for ``center`` to be called,
to retrieve the current property value.
Rather than returning an existing value,
this actually calculates and returns a new ``Point`` to represent the center of the square.
As can be seen above, this correctly returns a center point of ``(5, 5)``.

The ``center`` property is then set to a new value of ``(15, 15)``.
This moves the square up and to the right,
to the new position shown by the orange square in the diagram below.
Setting the ``center`` property calls the setter for ``center``,
which modifies the ``x`` and ``y`` values of the stored ``origin`` property,
and moves the square to its new position.

.. image:: ../images/computedProperties.png
    :width: 400
    :align: center

.. _ClassesAndStructures_ShorthandSetterDeclaration:

Shorthand Setter Declaration
____________________________

If a computed property's setter does not define a name for the new value to be set,
a default name of ``value`` is used.
Here's an alternative version of the ``Rect`` structure,
which takes advantage of this shorthand notation:

.. testcode:: classesAndStructures

    (swift) struct AlternativeRect {
        var origin = Point()
        var size = Size()
        var center: Point {
            get {
                val centerX = origin.x + (size.width / 2)
                val centerY = origin.y + (size.height / 2)
                return Point(centerX, centerY)
            }
            set {
                origin.x = value.x - (size.width / 2)
                origin.y = value.y - (size.height / 2)
            }
        }
    }

.. _ClassesAndStructures_ReadOnlyComputedProperties:

Read-Only Computed Properties
_____________________________

A computed property with a getter but no setter is known as a :newTerm:`read-only computed property`.
Read-only computed properties enable you to
define a property that will always return a value,
and can be accessed via dot syntax,
but which cannot be set to a different value by users of your class or structure.

The declaration of a read-only computed property can be simplified
by removing the ``get`` keyword:

.. testcode:: classesAndStructures

    (swift) struct Cuboid {
        var width = 0.0, height = 0.0, depth = 0.0
        var volume: Double {
            return width * height * depth
        }
    }
    (swift) val fourByFiveByTwo = Cuboid(4.0, 5.0, 2.0)
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
The ``val`` introducer is only ever used for constant properties,
to indicate that their value cannot be changed once it is set as part of instance initialization.

.. NOTE: getters and setters are also allowed for named values
   that are not associated with a particular class or struct.
   Where should this be mentioned?
   
.. TODO: Anything else from https://[Internal Staging Server]/docs/StoredAndComputedVariables.html

.. _ClassesAndStructures_PropertiesAndInstanceVariables:

Properties and Instance Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have experience with Objective-C,
you may be familiar with the fact that it provides two complementary ways
to store values and references alongside instances of a class.
In addition to properties,
Objective-C also has the concept of :newTerm:`instance variables`,
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
.. TODO: what happens if one property of a constant structure is an object reference?
.. TODO: immutability of value type constants means that
   their mutable properties are also immutable

.. _ClassesAndStructures_ValueTypesAndReferenceTypes:

Value Types and Reference Types
-------------------------------

Classes and structures have many things in common in Swift.
However, they have one fundamental difference:

* Structures define :newTerm:`value types`
* Classes define :newTerm:`reference types`

This difference is very important when deciding how to define the building blocks of your code.

.. TODO: this section needs updating to clarify that assignment is always like value semantics,
   and it's only really possible to see the difference when looking at the properties of a type.

.. _ClassesAndStructures_ValueTypes:

Value Types
~~~~~~~~~~~

.. TODO: Have I actually described what a 'type' is by this point?
.. TODO: If this section is talking about value types, it needs to talk about enums too.

A :newTerm:`value type` is a type that is *copied*
when it is assigned to a variable or constant,
or when it is passed to a function.

You've actually been using value types extensively throughout the previous chapters.
In fact, all of the basic types in Swift –
integers, floating-point numbers, Booleans, strings, enumerations, arrays and dictionaries –
are value types.

Swift structures are also value types.
This means that any instances you create from your own structures –
and any value types they have as properties –
will always be copied when they are passed around.

For example, using the ``Size`` structure from above:

.. testcode:: classesAndStructures

    (swift) val iPhone4 = Size(width: 640.0, height: 960.0)
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
.. TODO: Note that strings, arrays etc. are not reference types in Swift

.. _ClassesAndStructures_ReferenceTypes:

Reference Types
~~~~~~~~~~~~~~~

Unlike value types, a :newTerm:`reference type` is *not* copied when is assigned to a variable or constant,
or when it is passed to a function.
Rather than making a copy, a :newTerm:`reference` to the same existing instance is used instead.

.. TODO: This enables you to have multiple variables and constants
   that all refer to the same one instance. 

Here's an example, using the ``Rectangle`` class defined above:

.. testcode:: classesAndStructures

    (swift) val rect = Rectangle()
    // rect : Rectangle = <Rectangle instance>
    (swift) rect.size = Size(width: 1.0, height: 1.0)
    (swift) println("The rectangle's initial width is \(rect.size.width)")
    >>> The rectangle's initial width is 1.0
    (swift) val sameRect = rect
    // sameRect : Rectangle = <Rectangle instance>
    (swift) sameRect.size.width = 3.0
    (swift) println("The rectangle's width via sameRect is now \(sameRect.size.width)")
    >>> The rectangle's width via sameRect is now 3.0
    (swift) println("The rectangle's width via rect is also \(rect.size.width)")
    >>> The rectangle's width via rect is also 3.0

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

.. _ClassesAndStructures_Pointers:

Pointers
________

If you have experience with C, C++ or Objective-C,
you may be familiar with the fact that these languages use :newTerm:`pointers` to refer to objects.
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
   
.. TODO: Saying that we don't use the reference operator is actually untrue.
   We use it at the call-site for inout function parameters.

.. _ClassesAndStructures_ChoosingBetweenClassesAndStructures:

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

.. _ClassesAndStructures_InstanceMethods:

Instance Methods
----------------

:newTerm:`Instance methods` are functions that belong to instances of a particular class or structure.
They support the functionality of those instances,
either by providing ways to access and modify their properties,
or by providing useful functionality related to their purpose.
Instance methods can be written in either function-style syntax or selector-style syntax.

Instance methods are written within the opening and closing braces of a class or structure,
to indicate that they belong to that class or structure.
They have implicit access to all of its other instance methods and properties.
Instance methods can only be called on a specific instance of that class or structure.
They cannot be called in isolation without an existing instance.

Here's an example:

.. testcode:: classesAndStructures

    (swift) class Counter {
        var count: Int = 0
        func increment() {
            count++
        }
        func incrementBy(amount: Int) {
            count += amount
        }
        func reset() {
            count = 0
        }
    }

This example defines a simple ``Counter`` class,
which keeps track of the number of times something has happened.
It defines three instance methods:

* ``increment()``, which simply increments the counter by ``1``
* ``incrementBy(amount: Int)``, which increments the counter by an arbitrary integer amount, and
* ``reset()``, which resets the counter back to zero

Instance methods are called using the same dot syntax as properties:

.. testcode:: classesAndStructures

    (swift) val counter = Counter()
    // counter : Counter = <Counter instance>
    (swift) println("Initial counter value is \(counter.count)")
    >>> Initial counter value is 0
    (swift) counter.increment()
    (swift) println("Counter value is now \(counter.count)")
    >>> Counter value is now 1
    (swift) counter.incrementBy(5)
    (swift) println("Counter value is now \(counter.count)")
    >>> Counter value is now 6
    (swift) counter.reset()
    (swift) println("Counter value is now \(counter.count)")
    >>> Counter value is now 0

.. _ClassesAndStructures_Self:

Self
~~~~

Every instance method has an extra implicit parameter called ``self``,
which is made available to the method without having to be declared.
The implicit ``self`` parameter refers to the instance on which the method is called.

It's almost as if the ``increment()`` method from above had been written like this:

::

    func increment(self: Counter) {
        self.count++
    }

In practice, you don't actually write the ``self: TypeName`` parameter in your code –
instead, ``self`` is automatically made available to any method you define:

::

    func increment() {
        self.count++
    }

Even though it has an implicit ``self`` parameter available,
the ``Counter`` class above has chosen *not* to use ``self.count``
to refer to its ``count`` property within its instance methods.
Because there are no other named values called ``count`` within each method's body,
the ``self.`` prefix can be dropped, as it is clear that ``count`` can only mean the instance property.
Instead, ``count`` is written in a shorter form, without the ``self.`` prefix:

::

    func increment() {
        count++
    }

Here, ``count`` still means “the ``count`` property of the implicit ``self`` parameter” –
it just doesn't have to be written out long-hand if the meaning is unambiguous.

The implicit ``self`` parameter can be useful when
a method parameter conflicts with the name of an instance property.
Here, the ``self`` prefix is used to disambiguate between a method parameter called ``x``,
and an instance property that is also called ``x``:

.. testcode:: self

    (swift) struct Point {
        var x = 0.0, y = 0.0
        func isToTheRightOfX(x: Double) -> Bool {
            return self.x > x
        }
    }
    (swift) val somePoint = Point(4.0, 5.0)
    // somePoint : Point = Point(4.0, 5.0)
    (swift) if somePoint.isToTheRightOfX(1.0) {
        println("This point is to the right of the line where x == 1.0")
    }
    >>> This point is to the right of the line where x == 1.0

.. _ClassesAndStructures_SelfClasses:

Using Self in Class Instance Methods
____________________________________

For class instance methods, the ``self`` parameter is a *reference* to the instance,
and can be used to retrieve and set its properties:

.. testcode:: selfClasses

    (swift) class BankAccount {
        var balance = 0.0
        func depositMoney(amount: Double) {
            self.balance += amount
        }
    }
    (swift) val savingsAccount = BankAccount()
    // savingsAccount : BankAccount = <BankAccount instance>
    (swift) savingsAccount.depositMoney(100.00)
    (swift) println("The savings account now contains $\(savingsAccount.balance)")
    >>> The savings account now contains $100.0

This example could have been written with ``balance += amount``
rather than ``self.balance += amount``.
The use of ``self.balance`` is primarily to illustrate that
the ``self`` parameter is available within the ``depositMoney()`` method.

.. _ClassesAndStructures_SelfStructures:

Using Self in Structure Instance Methods
________________________________________

For structure instance methods, ``self`` is actually a *copy* of the structure instance
as of when the method was called.
This means that you can use ``self`` to read property values for the structure instance,
but not to set the properties to a new value.

If your structure instance needs to modify its own properties within a method,
it can request to receive a writeable copy in the implicit ``self`` parameter.
You can opt in to this behavior by placing the ``mutating`` keyword before the ``func`` keyword.
“Mutating” in this context means “making a change”, much as it does in English –
effectively, the method is “mutating” the ``Point`` instance:

.. testcode:: selfStructures

    (swift) struct Point {
        var x = 0.0, y = 0.0
        mutating func moveBy(deltaX: Double, deltaY: Double) {
            x += deltaX
            y += deltaY
        }
    }
    (swift) var somePoint = Point(1.0, 1.0)
    // somePoint : Point = Point(1.0, 1.0)
    (swift) somePoint.moveBy(2.0, 3.0)
    (swift) println("The point is now at (\(somePoint.x), \(somePoint.y))")
    >>> The point is now at (3.0, 4.0)

As soon as the ``moveBy()`` method has finished executing,
any changes it has made to the writeable copy of the implicit ``self`` parameter
are written back to the ``Point`` instance, overwriting the previous values.

.. _ClassesAndStructures_Initialization:

Initialization
--------------

Classes and structures should always initialize their stored properties with initial values.
There are two ways to provide initial values for your properties:

1. Include an :newTerm:`initial value` as part of the property declaration
   (as described in :ref:`ClassesAndStructures_Properties`)
2. Provide a value for the property within an :newTerm:`initializer`

.. note::
    If you assign a default value to a property,
    or set its initial value within an initializer,
    the value of that property is set directly, without calling any observers.

.. QUESTION: is this the right place to mention this note?

.. QUESTION: the same is also true for Obj-C KVO observers of the property.
   Is it appropriate to mention that here?

.. QUESTION: is this true once the instance is fully qualified within the initializer?
   To put it another way, is property setting *always* direct in an init?
   (I think the answer is yes.)

.. TODO: mention that memory is automatically managed by ARC

.. _ClassesAndStructures_Initializers:

Initializers
~~~~~~~~~~~~

:newTerm:`Initializers` are special methods
that can be called when a new instance of your type is created.
In its simplest form, an initializer is just an instance method with no parameters,
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
The structure defines a single initializer, ``init()``, with no parameters,
which initializes the stored temperature value to ``32.0``
(the freezing point of water when expressed in the Fahrenheit scale).

Initializers always begin with ``init``.
Unlike Objective-C, Swift initializers do not return a value.
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

Swift provides a :newTerm:`default initializer` implementation
for any class or structure that does not provide at least one initializer itself.
The default initializer simply creates a new instance
with all of its properties set to their default values.
You don't have to declare that you want the default initializer to be implemented –
it is available automatically for all classes and structures without their own initializer.

.. note::
    The default initializer for structures is provided in addition to the
    :ref:`ClassesAndStructures_MemberwiseStructureInitializers` mentioned earlier in this chapter.
    The default initializer and the memberwise initializer are only provided
    if the structure does not define at least one custom initializer itself.

.. TODO: Add a justification?

Initializers can take optional input parameters,
to customize the initialization process.
The following example defines a structure to store temperatures expressed in the Celsius scale.
It implements two custom initializers,
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

.. TODO: mention that initializers can be written in either function syntax.

The value of a constant ``val`` property can be modified at any point during initialization,
as long as is is definitely set to a value by the time the initializer has finished:

.. testcode:: initialization

    (swift) struct Temperature {
        val storedValue: Double
        val storedScale: String
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

.. _ClassesAndStructures_DefiniteInitialization:

Definite Initialization
~~~~~~~~~~~~~~~~~~~~~~~

If your class or structure provides one or more custom initializers,
Swift checks these methods to make sure that all properties are fully initialized
by the time each initializer has done its job.
This process is known as :newTerm:`definite initialization`,
and helps to ensure that your instances are always valid before they are used.
Swift will warn you at compile-time if your class or structure does not pass
the definite initialization test.

.. _ClassesAndStructures_InitializerDelegation:

Initializer Delegation
~~~~~~~~~~~~~~~~~~~~~~

Initializers can :newTerm:`delegate` some or all of the task of initialization to
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

This first example declares a new constant called ``thisBook``,
and sets it to the result of calling ``init withTitle()`` for a specific title string:

.. testcode:: initialization

    (swift) val thisBook = Document(withTitle: "The Swift Programming Language")
    // thisBook : Document = <Document instance>
    (swift) println("This book is called '\(thisBook.title)'")
    >>> This book is called 'The Swift Programming Language'

This second example declares a new constant called ``someBook``,
and sets it to the result of the basic ``init()`` method for ``Document``.
This method delegates to the more detailed ``init withTitle()`` method,
passing it a placeholder string value of ``[untitled]``:

.. testcode:: initialization

    (swift) val someBook = Document()
    // someBook : Document = <Document instance>
    (swift) println("Some unknown book is called '\(someBook.title)'")
    >>> Some unknown book is called '[untitled]'

Both of these initializers ensure that the value of ``title``
is set to a valid string before the initializer ends.
This means that the ``Document`` class passes the definite initialization test mentioned above.

.. _ClassesAndStructures_Inheritance:

Inheritance
-----------

Classes can :newTerm:`inherit` the methods, properties and capabilities of other existing classes.
Inheritance is one of the fundamental characteristics that differentiate classes
from other types in Swift.

Here's an example:

.. testcode:: inheritance

    (swift) class Vehicle {
        var numberOfWheels = 0
        var maxPassengers = 1
        func description() -> String {
            return "\(numberOfWheels) wheels; up to \(maxPassengers) passengers"
        }
    }

This example starts by defining a “base” class called ``Vehicle``.
This base class declares two properties that are universal to all vehicles,
and initializes them with suitable default values.
(It is assumed that any vehicle can carry at least one passenger –
it wouldn't be a very useful vehicle otherwise.)
``Vehicle`` also defines a method called ``description()``,
which returns a ``String`` description of its characteristics.

The next example defines a second, more-specific class, called ``Bicycle``.
This new class is based on the existing capabilities of ``Vehicle``.
The ``Bicycle`` class is defined by placing the name of its base class – ``Vehicle``
– after the name of the new class, separated by a colon. This can be read as:

“Define a new class called ``Bicycle``, which inherits the characteristics of ``Vehicle``”:

.. testcode:: inheritance

    (swift) class Bicycle : Vehicle {
        init() {
            super.init()
            numberOfWheels = 2
        }
    }

In this example, ``Bicycle`` is said to be a :newTerm:`subclass` of ``Vehicle``, 
and ``Vehicle`` is said to be the :newTerm:`superclass` of ``Bicycle``.
The new ``Bicycle`` class automatically gains all of the characteristics of ``Vehicle``,
and is able to tailor those characteristics (and add new ones) to suit its needs.

.. note::

    Swift classes do not inherit from a universal “base” class.
    Any classes you define without specifying a superclass
    will automatically become base classes for you to build upon.

The ``Bicycle`` class declares an initializer called ``init()``
to set up its tailored characteristics.
This initializer first calls ``super.init()``,
which calls the ``init()`` method for ``Bicycle``\ 's superclass, ``Vehicle``.

Although ``Vehicle`` does not have an explicit initializer itself,
it still has an implicit default initializer,
as described in :ref:`ClassesAndStructures_Initializers`.
This call to ``super.init()`` triggers ``Vehicle``\ 's default initializer,
and ensures that all of the inherited properties are initialized by ``Vehicle``
before ``Bicycle`` tries to modify them.

The default value of ``maxPassengers`` provided by ``Vehicle`` is already correct for a bicycle,
and so it is not changed within the initializer for ``Bicycle``.
The original value of ``numberOfWheels`` is not correct, however,
and so it is replaced by a new value of ``2``.

If you create an instance of ``Bicycle``, and print its description,
you can see how its properties have been updated:

.. testcode:: inheritance

    (swift) val bicycle = Bicycle()
    // bicycle : Bicycle = <Bicycle instance>
    (swift) println("Bicycle: \(bicycle.description())")
    >>> Bicycle: 2 wheels; up to 1 passengers

.. TODO: work out how best to describe super.init() in light of the next section below.

Subclasses can themselves be subclassed, as shown in the next example:

.. testcode:: inheritance

    (swift) class Tandem : Bicycle {
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

    (swift) val tandem = Tandem()
    // tandem : Tandem = <Tandem instance>
    (swift) println("Tandem: \(tandem.description())")
    >>> Tandem: 2 wheels; up to 2 passengers

Note that the ``description()`` method has also been inherited
by ``Bicycle`` and ``Tandem``.
Instance methods of a class are inherited by any and all subclasses of that class.

.. QUESTION: Should I mention that you can subclass from NSObject?

.. _ClassesAndStructures_OverridingInstanceMethods:

Overriding Instance Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A subclass can provide its own custom implementation of instance methods
that it would otherwise inherit from a superclass.
This is known as :newTerm:`overriding` the methods.
For example:

.. testcode:: inheritance

    (swift) class Car : Vehicle {
        var isConvertible: Bool = false
        init() {
            super.init()
            maxPassengers = 5
            numberOfWheels = 4
        }
        func description() -> String {
            return super.description() + "; "
                + (isConvertible ? "convertible" : "not convertible")
        }
    }
    (swift) var car = Car()
    // car : Car = <Car instance>
    (swift) println("Car: \(car.description())")
    >>> Car: 4 wheels; up to 5 passengers; not convertible

This example declares a new subclass of ``Vehicle``, called ``Car``.
``Car`` declares a new Boolean property called ``isConvertible``,
in addition to the properties it inherits from ``Vehicle``.
This property defaults to ``false``, as most cars are not convertibles.
``Car`` also has a custom initializer,
which sets the maximum number of passengers to ``5``,
and the default number of wheels to ``4``.

``Car`` then overrides its inherited ``description()`` method.
It does this by declaring a function with the same definition as the one it inherits.
Rather than providing a completely custom implementation of ``description()``,
it actually starts by calling ``super.description()`` to retrieve
the description provided by its superclass.
It then appends some additional information onto the end,
and returns the complete description.

.. TODO: provide more information about function signatures,
   and what does / does not make them unique.
   For example, the parameter names do not have to match
   in order for a function to override a similar signature in its parent.
   (This is true for both of the function declaration syntaxes.)

.. note::

    Overriding of properties is not yet implemented.

.. _ClassesAndStructures_SubclassingAndInitializerDelegation:

Subclassing and Initializer Delegation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift classes do not automatically inherit initializers from their parent classes.
This behavior is different from Objective-C, where initializers are inherited by default.
Swift's avoidance of automatic initializer inheritance ensures that
subclasses are able to control exactly how they can be instantiated.

To help with this,
Swift inserts an implicit call to ``super.init()``
at the end of any subclass initializer
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

The first initializer, ``init()``, takes no parameters at all.
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

    (swift) val empty = TextDocument()
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

The second initializer, ``init withTitle()``,
calls the superclass ``init withTitle()`` method from ``Document``,
and passes in the new value of ``title``:

::

    (swift)     init withTitle(title: String) {
            super.init(withTitle: title)
        }

As before, the value of ``bodyText`` comes from the property's default value.

Here's how this initializer could be called:

.. testcode:: initialization

    (swift) val titled = TextDocument(withTitle: "Write something please")
    // titled : TextDocument = <TextDocument instance>
    (swift) println("\(titled.title):\n\(titled.bodyText)")
    >>> Write something please:
    >>> [replace me]

The third initializer, ``init withText()``,
sets the ``bodyText`` property to a new ``text`` value:

::

    (swift)     init withText(text: String) {
            bodyText = text
        }

Because it doesn't call a superclass initializer,
Swift inserts an implicit ``super.init()`` call at the end of the method.
This calls the ``init()`` method of the ``Document`` class,
which in turn calls the ``init withTitle()`` method of the ``Document`` class
and sets the same placeholder title as before.

Here's how this initializer could be called:

.. testcode:: initialization

    (swift) val untitledPangram = TextDocument(
        withText: "Amazingly few discotheques provide jukeboxes")
    // untitledPangram : TextDocument = <TextDocument instance>
    (swift) println("\(untitledPangram.title):\n\(untitledPangram.bodyText)")
    >>> [untitled]:
    >>> Amazingly few discotheques provide jukeboxes

The final initializer, ``init withTitle() text()``,
starts by delegating across to the ``init withTitle()`` method
provided by ``TextDocument`` itself.
This in turn delegates up to the ``init withTitle()`` method of the superclass (``Document``).
It then sets ``bodyText`` to the new ``text`` value.

::

    (swift)     init withTitle(title: String) text(text: String) {
            self.init(withTitle: title)
            bodyText = text
        }

There's no reason why ``TextDocument`` couldn't have called up to
the ``init withTitle()`` method of ``Document`` directly.
The decision to delegate to its *own* ``init withTitle()`` method is mainly a design choice.
If ``TextDocument`` were to gain new functionality in the future –
perhaps to insert and update the title at the start of the body text –
then this functionality would typically be added in its own ``init withTitle()`` method.
Delegating to its own implementation of the method,
rather than straight up to the parent method,
helps to plan for functionality changes in the future.

Here's how this final initializer could be called:

.. testcode:: initialization

    (swift) val foxPangram = TextDocument(
        withTitle: "Quick brown fox",
        text: "The quick brown fox jumped over the lazy dog")
    // foxPangram : TextDocument = <TextDocument instance>
    (swift) println("\(foxPangram.title):\n\(foxPangram.bodyText)")
    >>> Quick brown fox:
    >>> The quick brown fox jumped over the lazy dog

.. TODO: Illustrate how the order of things matters when inserting calls to super.init

.. _ClassesAndStructures_DynamicReturnTypes:

Dynamic Return Types
~~~~~~~~~~~~~~~~~~~~

[to be written]

.. TODO: mention that methods can return DynamicSelf (a la instancetype)
.. TODO: include the several tricks seen in swift/test/decl/func/dynamic_self.swift

.. _ClassesAndStructures_TypeCasting:

Type Casting
------------

It is sometimes necessary to check the specific class of an instance
in order to decide how it should be used.
It can also be necessary to treat a specific instance as if it is a different
superclass or subclass from its own class hierarchy.
Both of these tasks are achieved using :newTerm:`type casting`.

.. TODO: the wording of this para is unclear in its use of pronouns.

Here's an example:

.. testcode:: typeCasting

    (swift) class MediaItem {
        var name: String
        init withName(name: String) {
            self.name = name
        }
    }
    (swift) class Movie : MediaItem {
        var director: String
        init withName(name: String) director(director: String) {
            self.director = director
            super.init(withName: name)
        }
    }
    (swift) class Song : MediaItem {
        var artist: String
        init withName(name: String) artist(artist: String) {
            self.artist = artist
            super.init(withName: name)
        }
    }

This example defines a new base class called ``MediaItem``.
This class provides basic functionality for any kind of item that might appear
in a digital media library.
Specifically, it declares a ``name`` property of type ``String``,
and an ``init withName()`` initializer.
(It is assumed that all media items, including all movies and songs, will have a name.)

The example also defines two subclasses of ``MediaItem``.
The first subclass, ``Movie``, encapsulates additional information about a movie or film.
It adds a ``director`` property on top of the base ``MediaItem`` class,
with a corresponding initializer.
The second subclass, ``Song``, adds an ``artist`` property and initializer
on top of the base class.

Because ``Movie`` and ``Song`` are both subclasses of ``MediaItem``,
their instances can be used wherever a ``MediaItem`` instance can be used.
For example:

.. testcode:: typeCasting

    (swift) var library = Array<MediaItem>()
    // library : Array<MediaItem> = []
    (swift) library.append(Movie("Casablanca", director: "Michael Curtiz"))
    (swift) library.append(Song("Blue Suede Shoes", artist: "Elvis Presley"))
    (swift) library.append(Movie("Citizen Kane", director: "Orson Welles"))
    (swift) library.append(Song("The One And Only", artist: "Chesney Hawkes"))
    (swift) library.append(Song("Never Gonna Give You Up", artist: "Rick Astley"))

This example declares and initializes a new empty array called ``library``,
which is declared as an ``Array`` of type ``MediaItem``.
This means that it can only accept instances that are of type ``MediaItem``.

The example then appends some ``Movie`` and ``Song`` instances to the ``library`` array.
A ``Movie`` or a ``Song`` is also a ``MediaItem``,
and so an instance of either class can be added to the array.

.. note::

    The ``withName:`` selector has been left out of each of these initializer calls, for brevity.
    The initializers for ``Movie`` and ``Song`` both have their ``name`` value as the first parameter,
    and it is clear from the context that this is the correct initializer to use.
    As a result, leaving out the ``withName:`` selector does not cause any ambiguity.

.. _ClassesAndStructures_CheckingType:

Checking Type
~~~~~~~~~~~~~

You can check whether an instance is of a certain type by using the ``is`` operator:

.. testcode:: typeCasting

    (swift) var movieCount = 0
    // movieCount : Int = 0
    (swift) var songCount = 0
    // songCount : Int = 0
    (swift) for item in library {
        if item is Movie {
            ++movieCount
        } else if item is Song {
            ++songCount
        }
    }
    (swift) println("Media library contains \(movieCount) movies and \(songCount) songs")
    >>> Media library contains 2 movies and 3 songs

This example iterates through all of the items in the ``library`` array.
On each pass, the ``for``-``in`` loop sets the ``item`` constant
to the next ``MediaItem`` in the array.

``item is Movie`` returns ``true`` if the current ``MediaItem``
is an instance of the ``Movie`` type, and ``false`` if it is not.
Similarly, ``item is Song`` checks to see if the item is a ``Song`` instance.
At the end of the ``for``-``in`` loop, the values of ``movieCount`` and ``songCount``
contain a count of how many ``MediaItem`` instances were found of each type.

.. QUESTION: is it correct to refer to 'is' and 'as' as 'operators'?
   Or is there some better name we could use?

.. _ClassesAndStructures_Downcasting:

Downcasting
~~~~~~~~~~~

A constant or variable of a certain class type may actually refer to
an instance of a subclass behind the scenes. Where this is the case,
you can try and :newTerm:`downcast` to the subclass using the ``as`` operator:

.. testcode:: typeCasting

    (swift) for item in library {
        if val movie = item as Movie {
            println("Movie: '\(movie.name)', dir. \(movie.director)")
        } else if val song = item as Song {
            println("Song: '\(song.name)', by \(song.artist)")
        }
    }
    >>> Movie: 'Casablanca', dir. Michael Curtiz
    >>> Song: 'Blue Suede Shoes', by Elvis Presley
    >>> Movie: 'Citizen Kane', dir. Orson Welles
    >>> Song: 'The One And Only', by Chesney Hawkes
    >>> Song: 'Never Gonna Give You Up', by Rick Astley

This example iterates over each ``MediaItem`` in ``library``,
and prints an appropriate description for each one.
To do this, it needs to access each item as if it is a true ``Movie`` or ``Song``,
and not just a generic ``MediaItem``.
This is necessary in order for it to be able to access
the ``director`` or ``artist`` property for use in the description.

The example starts by trying to downcast the current ``item`` as a ``Movie``.
Because ``item`` is a ``MediaItem`` instance, it's possible that it *might* be a ``Movie``;
equally, it's also possible that it might a ``Song``,
or even just a base ``MediaItem``.
Because of this uncertainty, the ``as`` operator returns an *optional* value
when attempting to downcast to a subclass type.
The result of ``item as Movie`` is of type ``Movie?``, or “optional ``Movie``”.

Downcasting to ``Movie`` will fail when trying to downcast
the two ``Song`` instances in the library array.
To cope with this, the example above uses :ref:`optional binding <ControlFlow_OptionalBinding>`
to check whether the optional ``Movie`` actually contains a value
(i.e. to find out whether the downcast succeeded.)
This optional binding is written “``if val movie = item as Movie``”,
which can be read as:

“Try and access ``item`` as a ``Movie``.
If this is successful,
set a new temporary constant called ``movie`` to
the value stored in the returned ``Movie?`` optional.”

If the downcasting succeeds, the properties of ``movie`` are then used
to print a description for that ``Movie`` instance, including the name of its ``director``.
A similar principle is used to check for ``Song`` instances,
and to print an appropriate description (including ``artist`` name)
whenever a ``Song`` is found in the library.

.. note::

    Casting does not actually modify the instance, or change its values.
    The underlying instance remains the same; it is just treated and accessed
    as an instance of the type to which it has been cast.

.. TODO: casting also needs to be mentioned in the context of protocol conformance.

.. QUESTION: should I mention upcasting here?
   I can't think of an example where it's useful.
   However, it does display different behavior from downcasting,
   in that upcasting always works, and so it doesn't return an optional.

.. _ClassesAndStructures_TypePropertiesAndMethods:

Type Properties and Methods
---------------------------

[to be written]

.. see release notes from 2013-12-18 for a note about lazy initialization

.. _ClassesAndStructures_Destructors:

Destructors
-----------

A :newTerm:`destructor` is a special instance method that is called when a class instance is destroyed.
Destructors are written with the ``destructor`` keyword,
in a similar way to how intializers are written with the ``init`` keyword.
Destructors are only available on class types.

Swift automatically destroys your instances when they are no longer needed, to free up resources.
Swift handles the memory management of your class instances for you via
:newTerm:`automatic reference counting` (known as :newTerm:`ARC`),
and so there is normally no need to perform any clean-up when your instances are destroyed.
However, there may be times when you are working with your own resources,
and need to perform some additional clean-up yourself.
For example, if you create a custom class to open a file and write some data to it,
you might need to close the file when the class instance is destroyed.

Class definitions can have at most one destructor per class.
The destructor does not take any parameters, and is called automatically when an instance is destroyed.
Superclass destructors are automatically inherited by their subclasses,
and the superclass destructor is called automatically at the end of a subclass destructor implementation.
You are not allowed to call ``super.destructor()`` yourself.

Destructors are still able to access the properties of the instance they are called on.
This means that your destructor can modify its behavior based on properties of the current instance,
such as discovering the file name of a file that needs to be closed.

Here's an example of ``destructor`` in action.
This example defines two new types, ``Bank`` and ``Player``, for a simple game.
The ``Bank`` structure manages a made-up currency,
which can never have more than 10,000 coins in circulation.
There can only ever be one ``Bank`` in the game,
and so the ``Bank`` is implemented as a structure with static properties and methods
to store and manage its current state:

.. testcode:: destructor

    (swift) struct Bank {
        static var coinsInBank = 10_000
        static func vendCoins(var numberOfCoinsToVend: Int) -> Int {
            numberOfCoinsToVend = min(numberOfCoinsToVend, coinsInBank)
            coinsInBank -= numberOfCoinsToVend
            return numberOfCoinsToVend
        }
        static func receiveCoins(coins: Int) {
            coinsInBank += coins
        }
    }

``Bank`` keeps track of the current number of coins it holds via its ``coinsInBank`` property.
It also offers two methods – ``vendCoins()`` and ``receiveCoins()`` –
to handle the distribution and collection of coins.

``vendCoins()`` checks that there are enough coins in the bank before handing any out.
If there are not enough coins, it returns a smaller number than the number that was requested
(and may even return zero if there are no coins left in the bank at all).
It declares ``numberOfCoinsToVend`` as a :ref:`variable parameter <Functions_ConstantAndVariableParameters>`,
so that the number can be modified within the method's body
without needing to declare a new variable.
It returns an integer value to indicate the actual number of coins that were vended.

The ``receiveCoins()`` method simply adds the received number of coins back into the bank's coin store.

The ``Player`` class describes a player in the game.
Each player has a certain number of coins stored in their purse at any time.
This is represented by the player's ``coinsInPurse`` property:

.. testcode:: destructor

    (swift) class Player {
        var coinsInPurse: Int
        init withCoins(coins: Int) {
            coinsInPurse = Bank.vendCoins(coins)
        }
        func winCoins(coins: Int) {
            coinsInPurse += Bank.vendCoins(coins)
        }
        destructor() {
            Bank.receiveCoins(coinsInPurse)
        }
    }

Each ``Player`` instance is initialized with a starting allowance of
some specified number of coins from the bank during initialization
(although it may receive fewer than that number, if not enough are available).

The ``Player`` class defines a ``winCoins()`` method,
which tries to retrieve a certain number of coins from the bank
and add them to the player's purse.
The ``Player`` class also implements a ``destructor``,
which is called whenever a ``Player`` instance is destroyed.
Here, the ``destructor`` simply returns all of the player's coins to the bank.

Here's how that looks in action:

.. testcode:: destructor

    (swift) var playerOne: Player? = Player(withCoins: 100)
    // playerOne : Player? = <unprintable value>
    (swift) println("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
    >>> A new player has joined the game with 100 coins
    (swift) println("There are now \(Bank.coinsInBank) coins left in the bank")
    >>> There are now 9900 coins left in the bank

A new ``Player`` instance is created, with a request for 100 coins if they are available.
This ``Player`` instance is stored in an optional ``Player`` variable called ``playerOne``.
An optional variable is used here, because players can leave the game at any point.
Using an optional gives a way to keep track of whether there is currently a player in the game.

Because ``playerOne`` is an optional, it is qualified with an exclamation mark (``!``)
when its ``coinsInPurse`` property is accessed to print its default number of coins,
and whenever its ``winCoins()`` method is called:

.. testcode:: destructor

    (swift) playerOne!.winCoins(2_000)
    (swift) println("PlayerOne won 2000 coins & now has \(playerOne!.coinsInPurse) coins")
    >>> PlayerOne won 2000 coins & now has 2100 coins
    (swift) println("The bank now only has \(Bank.coinsInBank) coins left")
    >>> The bank now only has 7900 coins left

Here, the player has won 2,000 coins.
Their purse now contains 2,100 coins,
and the bank only has 7,900 coins left.

.. testcode:: destructor

    (swift) playerOne = .None
    (swift) println("PlayerOne has left the game")
    >>> PlayerOne has left the game
    (swift) println("The bank now has \(Bank.coinsInBank) coins")
    >>> The bank now has 10000 coins

The player has now left the game.
This is indicated by setting the optional ``playerOne`` variable to ``.None``,
meaning “no ``Player`` instance”.
At the point that this happens, the ``Player`` instance referenced by
the ``playerOne`` variable is destroyed.
No other properties or variables are still referring to it,
and so it can be destroyed in order to free up the resources it was using.
When this happens, its ``destructor`` is called,
and its coins are returned to the bank.

.. TODO: switch Bank to be a class rather than a structure
   once we have support for class-level properties.

.. _ClassesAndStructures_OperatorFunctions:

Operator Functions
------------------

Classes and structures can provide their own implementations of existing :doc:`operators <Operators>`.
This is known as :newTerm:`overloading` the existing operators.

.. testcode:: customOperators

    (swift) struct Point {
        var x = 0.0, y = 0.0
    }
    (swift) func + (lhs: Point, rhs: Point) -> Point {
        return Point(lhs.x + rhs.x, lhs.y + rhs.y)
    }

This example shows how a structure can provide a custom implementation of the
:ref:`arithmetic addition operator <Operators_ArithmeticOperators>` (``+``).
It starts by defining a ``Point`` structure for an ``(x, y)`` coordinate.
This is followed by a definition of an :newTerm:`operator function`
to add together instances of the ``Point`` structure.

The operator function is defined as a global function called ``+``,
which takes two input parameters of type ``Point``,
and returns a single output value, also of type ``Point``.
In this implementation, the input parameters have been named ``lhs`` and ``rhs``
to represent the ``Point`` instances that will be on
the left-hand side and right-hand side of the ``+`` operator.
The function returns a new ``Point``, whose ``x`` and ``y`` properties are
initialized with the sum of the ``x`` and ``y`` properties from
the two ``Point`` instances that are being added together.

The function is defined globally, rather than as a method on the ``Point`` structure,
so that it can be used as an infix operator between existing ``Point`` instances:

.. testcode:: customOperators

    (swift) val point = Point(1.0, 2.0)
    // point : Point = Point(1.0, 2.0)
    (swift) val anotherPoint = Point(3.0, 4.0)
    // anotherPoint : Point = Point(3.0, 4.0)
    (swift) val combinedPoint = point + anotherPoint
    // combinedPoint : Point = Point(4.0, 6.0)

.. _ClassesAndStructures_PrefixAndPostfixOperators:

Prefix and Postfix Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The arithmethic addition operator (``+``) shown above is a :newTerm:`binary operator`.
Binary operators operate on two targets (such as ``2 + 3``),
and are said to be :newTerm:`infix` because they appear inbetween their two targets.

Classes and structures can also provide implementations of the standard :newTerm:`unary operators`.
Unary operators operate on a single target,
and are said to be :newTerm:`prefix` if they come before their target (such as ``-a``),
and :newTerm:`postfix` operators if they come after their target (such as ``i++``).

Implementations of prefix unary operators are indicated via the ``@prefix`` attribute.
Likewise, postfix unary operators are indicated via the ``@postfix`` attribute.
The attribute is written before the ``func`` keyword when declaring the operator function:

.. testcode:: customOperators

    (swift) @prefix func - (rhs: Point) -> Point {
        return Point(-rhs.x, -rhs.y)
    }

This example implements the :ref:`unary minus operator <Operators_UnaryPlusAndMinusOperators>`
(``-a``) for ``Point`` instances.
The unary minus operator is a prefix operator,
and so this function has to be qualified with the ``@prefix`` attribute.

For simple numeric values, the unary minus operator just converts
positive numbers into their negative equivalent, and vice versa.
The corresponding implementation for ``Point`` instances
performs this operation on both the ``x`` and ``y`` properties:

.. testcode:: customOperators

    (swift) val positive = Point(3.0, 4.0)
    // positive : Point = Point(3.0, 4.0)
    (swift) val negative = -positive
    // negative : Point = Point(-3.0, -4.0)
    (swift) val alsoPositive = -negative
    // alsoPositive : Point = Point(3.0, 4.0)

.. QUESTION: is this the first time I will have introduced attributes?
   If so, do they need more qualification?

.. _ClassesAndStructures_CompoundAssignmentOperators:

Compound Assignment Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:ref:`Compound assignment operators <Operators_CompoundAssignmentOperators>`
combine assignment (``=``) with another operation.
One example is the addition assignment operator (``+=``).
This combines addition and assignment into a single operation.
Operator functions that implement compound assignment must be qualified with
the ``@assignment`` attribute.
They must also mark their left-hand input parameter as ``inout``,
as its value will be modified directly from within the operator function:

.. testcode:: customOperators

    (swift) @assignment func += (inout lhs: Point, rhs: Point) {
        lhs = lhs + rhs
    }

This example implements an addition assignment operator function for ``Point`` instances.
Because an addition operator has already been defined above,
there is no need to reimplement the addition process again here.
Instead, this function takes advantage of the existing addition operator function,
and uses it to set the left-hand value to itself plus the right-hand value:

.. testcode:: customOperators

    (swift) var original = Point(1.0, 2.0)
    // original : Point = Point(1.0, 2.0)
    (swift) val pointToAdd = Point(3.0, 4.0)
    // pointToAdd : Point = Point(3.0, 4.0)
    (swift) original += pointToAdd
    (swift) println("original is now (\(original.x), \(original.y))")
    >>> original is now (4.0, 6.0)

The ``@assignment`` attribute can be combined with
either the ``@prefix`` or ``@postfix`` attribute,
as in this implementation of the
:ref:`prefix increment operator <Operators_IncrementAndDecrementOperators>` (``++a``)
for ``Point`` instances:

.. testcode:: customOperators

    (swift) @prefix @assignment func ++ (inout rhs: Point) -> Point {
        rhs += Point(1.0, 1.0)
        return rhs
    }

This operator function takes advantage of the addition assignment operator defined above.
It adds a ``Point`` with ``x`` and ``y`` values of ``1.0``
to the ``Point`` on which it is called,
and returns the result.

.. testcode:: customOperators

    (swift) var toIncrement = Point(3.0, 4.0)
    // toIncrement : Point = Point(3.0, 4.0)
    (swift) val afterIncrement = ++toIncrement
    // afterIncrement : Point = Point(4.0, 5.0)
    (swift) println("toIncrement is now (\(toIncrement.x), \(toIncrement.y))")
    >>> toIncrement is now (4.0, 5.0)

.. note::

    It is not possible to overload the default
    :ref:`assignment operator <Operators_AssignmentOperator>` (``=``).
    Only the compound assignment operators may be overloaded.
    Similarly, the :ref:`ternary conditional operator <Operators_TernaryConditionalOperator>`
    (``a ? b : c``) may not be overloaded.

.. QUESTION: some of the standard operators (such as equation and comparison)
   are implemented as part of a protocol (such as Equatable and Comparable).
   You don't seem to need to declare conformance to these protocols
   in order to implement the operator functions, however.
   Is that correct? Can you get != for free after implementing == , for example?
   UPDATE: going by rdar://14011860, we don't currently have a way for a protocol
   like Equatable to provide a default implementation of != if you implement ==

.. QUESTION: Should I mention @transparent in the Operator Functions section?
   All of the stdlib operators (e.g. for fixed- and floating-point numbers)
   are declared as @transparent…

.. _ClassesAndStructures_CustomOperators:

Custom Operators
~~~~~~~~~~~~~~~~

You can define your own :newTerm:`custom operators` in addition to
the standard operators provided by Swift.
Custom operators can be defined using the characters ``/ = - + * % < > ! & | ^ ~ .`` only.

New operators are declared using the ``operator`` keyword,
and can be declared as ``prefix``, ``infix`` or ``postfix``:

.. testcode:: customOperators

    (swift) operator prefix +++ {}

This example defines a new prefix operator called ``+++``.
This operator does not have an existing meaning in Swift,
and so it will be given its own custom meaning in the specific context of
working with ``Point`` instances. For the purposes of this example,
``+++`` will be treated as a new “prefix doubling incrementer” operator.
It will double the ``x`` and ``y`` values of a ``Point`` instance,
by adding the point to itself via assignment:

.. testcode:: customOperators

    (swift) @prefix @assignment func +++ (inout rhs: Point) -> Point {
        rhs += rhs
        return rhs
    }

The implementation of ``+++`` is very similar to
the implementation of ``++`` for ``Point``,
except that this operator function adds the point to itself,
rather than adding ``Point(1.0, 1.0)``:

.. testcode:: customOperators

    (swift) var toBeDoubled = Point(1.0, 4.0)
    // toBeDoubled : Point = Point(1.0, 4.0)
    (swift) val afterDoubling = +++toBeDoubled
    // afterDoubling : Point = Point(2.0, 8.0)
    (swift) println("toBeDoubled is now (\(toBeDoubled.x), \(toBeDoubled.y))")
    >>> toBeDoubled is now (2.0, 8.0)

Custom ``infix`` operators may also specify a :newTerm:`precedence`
and an :newTerm:`associativity`.
(See :ref:`Operators_PrecedenceAndAssociativity` for an explanation of
how these two characteristics affect an infix operator's interaction
with other infix operators.)

The possible values for ``associativity`` are ``left``, ``right`` or ``none``.
Left-associative operators associate to the left if written next
to other left-associative operators of the same precedence.
Similarly, right-associative operators associate to the right if written
next to other right-associative operators of the same precedence.
Non-associative operators cannot be written next to
other operators with the same precedence.

The ``associativity`` value defaults to ``none`` if it is not specified.
Similarly, ``precedence`` defaults to a value of ``100`` if it is not specified.

The following example defines a new custom ``infix`` operator called ``+-``,
with ``left`` associativity, and a precedence of ``140``:

.. testcode:: customOperators

    (swift) operator infix +- { associativity left precedence 140 }
    (swift) func +- (lhs: Point, rhs: Point) -> Point {
        return Point(lhs.x + rhs.x, lhs.y - rhs.y)
    }
    (swift) val firstPoint = Point(1.0, 2.0)
    // firstPoint : Point = Point(1.0, 2.0)
    (swift) val secondPoint = Point(3.0, 4.0)
    // secondPoint : Point = Point(3.0, 4.0)
    (swift) val plusMinusPoint = firstPoint +- secondPoint
    // plusMinusPoint : Point = Point(4.0, -2.0)

This operator adds together the ``x`` values of two points,
and subtracts the ``y`` value of the second point from the first.
Because it is in essence an “additive” operator,
it has been given the same associativity and precedence values
(``left`` and ``140``)
as default additive infix operators such as ``+`` and ``-``.
(A complete list of the default Swift operator precedence
and associativity settings can be found in the :doc:`../ReferenceManual/index`.)

.. TODO: update this link to go to the specific section of the Reference Manual.

.. TODO: Custom operator declarations cannot be written over multiple lines in the REPL.
   This is being tracked as rdar://16061044.
   If this Radar is fixed, the operator declaration above should be split over multiple lines
   for consistency with the rest of the code.

.. _ClassesAndStructures_Subscripting:

Subscripting
------------

[to be written]

.. NOTE: you can subscript on any type, including a range (IntGeneratorType)

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