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
    * Nested classes and structures
    * Bound functions
    * @conversion functions for converting between types
    * Subscript getters and setters

Custom Types
============

Enumerations, as introduced in the previous chapter,
give a way to define your own custom types to work with lists of values.
Enumerations are particularly suited to representing a fixed set of values of a similar type.

Swift provides two additional ways to define custom data types.
These are known as :newTerm:`classes` and :newTerm:`structures`,
and can be used to create general-purpose, flexible constructs
to use as the building blocks of your program's code.

Classes and structures have many things in common in Swift.
Both can:

* declare :newTerm:`properties` to store values
  (as described in :doc:`Properties`)
* define :newTerm:`methods` to provide functionality
  (as described in :doc:`Methods`)
* define :newTerm:`initializers` to set up their initial state
  (as described in :doc:`InitializationAndInheritance`)
* be :newTerm:`extended` to expand their functionality beyond a default implementation
  (as described in :doc:`Extensions`)
* conform to :newTerm:`protocols` to provide standard functionality of a certain type, and
  (as described in :doc:`Protocols`)

In addition, classes have several capabilities that structures and enumerations do not:

* :newTerm:`inheritance`, which enables one class to inherit the characteristics of another
* :newTerm:`deinitializers`, which enable an instance of a class to clean up after itself
* :newTerm:`type casting`, which enables you to check and interpret the type of a class instance at runtime

All of these additional capabilities are described in :doc:`InitializationAndInheritance`.

.. _ClassesAndStructures_DefiningClassesAndStructures:

Defining Classes and Structures
-------------------------------

Unlike other programming languages,
Swift does not require you to create separate interface and implementation files
for your custom types.
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

.. testcode:: customTypes

    --> class SomeClass {
            // class definition goes here
        }
    --> struct SomeStructure {
            // structure definition goes here
        }

.. note::

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

Here's an example of a structure definition and a class definition:

.. testcode:: customTypes

    --> struct Size {
            var width = 0.0
            var height = 0.0
        }
    --> class Rectangle {
            var size = Size()
        }

The example above defines a new structure called ``Size``,
with two :newTerm:`variable stored properties` called ``width`` and ``height``.
Stored properties are named values that are bundled up and stored
as part of the class or structure,
and are described in detail in :doc:`Properties`.
These two properties are inferred to be of type ``Double``
by setting them to an initial floating-point value of ``0.0``.

The example also defines a new class called ``Rectangle``,
which has a variable stored property called ``size``.
This property is initialized with a new ``Size`` structure instance,
which infers a property type of ``Size``.

.. _ClassesAndStructures_ClassAndStructureInstances:

Class and Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Size`` structure definition, and the ``Rectangle`` class definition,
only describe what a ``Size`` or ``Rectangle`` will look like.
They do not in themselves describe a specific size or rectangle.
To do that, you need to create an :newTerm:`instance` of the class or structure.

.. QUESTION: this isn't strictly true.
   You could argue that the Size structure definition describes a size of (0, 0).

The syntax for creating instances is very similar for both structures and classes:

.. testcode:: customTypes

    --> let someSize = Size()
    <<< // someSize : Size = Size(0.0, 0.0)
    --> let someRectangle = Rectangle()
    <<< // someRectangle : Rectangle = <Rectangle instance>

Structures and classes both use :newTerm:`initializer syntax` when creating new instances.
The simplest form of initializer syntax uses the type name of the class or structure
followed by empty parentheses, such as ``Size()`` or ``Rectangle()``.
This creates a new instance of the class or structure,
with any properties initialized to their default values.
In the example above,
the ``width`` and ``height`` values of the ``Size`` structure instance
have been automatically initialized to ``0.0``,
which was the default value provided by the ``Size`` structure's definition.
(Class and structure initialization is described in more detail
in :doc:`InitializationAndInheritance`.)

.. TODO: add more detail about inferring a variable's type when using initializer syntax.
.. TODO: note that you can only use the default constructor if you provide default values
   for all properties on a structure or class.

.. _ClassesAndStructures_Terminology:

Terminology
___________

An instance of a *class* (such as ``someRectangle`` above)
is traditionally known as an :newTerm:`object`.
However, Swift classes and structures are much closer in functionality than in other languages,
and much of this chapter describes functionality that can apply to
instances of *either* a class or a structure type.
Because of this, the more general term :newTerm:`instance` is used below.

.. _ClassesAndStructures_AccessingProperties:

Accessing Properties
~~~~~~~~~~~~~~~~~~~~

.. HACK: this is currently duplicated in Properties.

The properties of an instance can be accessed using :newTerm:`dot syntax`:

.. testcode:: customTypes

    --> println("The width of someSize is \(someSize.width)")
    <-- The width of someSize is 0.0

``someSize.width`` refers to the ``width`` property of ``someSize``.
Dot syntax can be used to drill down into sub-properties
such as the ``width`` property in the ``size`` property of a ``Rectangle``:

.. testcode:: customTypes

    --> println("The width of someRectangle is \(someRectangle.size.width)")
    <-- The width of someRectangle is 0.0

Dot syntax can also be used to assign a new value to a variable property:

.. testcode:: customTypes

    --> someRectangle.size.width = 2.0
    --> println("The width of someRectangle is now \(someRectangle.size.width)")
    <-- The width of someRectangle is now 2.0

.. _ClassesAndStructures_MemberwiseStructureInitializers:

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. HACK: this is currently duplicated in Initialization.

All structures have an automatically-generated :newTerm:`memberwise initializer`,
which can be used to initialise the properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name:

.. testcode:: customTypes

    --> let twoByTwo = Size(width: 2.0, height: 2.0)
    <<< // twoByTwo : Size = Size(2.0, 2.0)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the structure's definition:

.. testcode:: customTypes

    --> let fourByThree = Size(4.0, 3.0)
    <<< // fourByThree : Size = Size(4.0, 3.0)

.. TODO: Include a justifiable reason for why classes do not provide a memberwise initializer.
.. TODO: Describe the creation of custom initializers.
.. TODO: This whole section needs updating in light of the changes for definite initialization.
   Memberwise initializers will only exist if default values are provided for all properties.

Unlike structures, class instances do not receive a default memberwise initializer.
(Initializers are described in more detail in :doc:`InitializationAndInheritance`.)

.. _ClassesAndStructures_ValueTypesAndReferenceTypes:

Value Types and Reference Types
-------------------------------

Classes, structures and enumerations have many things in common in Swift.
All three can work with properties, methods, initializers, extensions, and protocols.
However, there is one fundamental difference:

* Structures and enumerations are :newTerm:`value types`
* Classes are :newTerm:`reference types`

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
integers, floating-point numbers, Booleans, strings, arrays and dictionaries –
are value types.

Swift structures and enumerations are also value types.
This means that any instances you create –
and any value types they have as properties –
will always be copied when they are passed around.

For example, using the ``Size`` structure from above:

.. testcode:: customTypes

    --> let iPhone4 = Size(width: 640.0, height: 960.0)
    <<< // iPhone4 : Size = Size(640.0, 960.0)
    --> var iPhone5 = iPhone4
    <<< // iPhone5 : Size = Size(640.0, 960.0)
    --> iPhone5.height = 1136.0
    --> println("The iPhone 5 screen is now \(iPhone5.height) pixels high")
    <-- The iPhone 5 screen is now 1136.0 pixels high
    --> println("The iPhone 4 screen is still \(iPhone4.height) pixels high")
    <-- The iPhone 4 screen is still 960.0 pixels high

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

The same behavior applies to enumerations:

.. testcode:: customTypes

    --> enum CompassPoint {
            case North, South, East, West
        }
    --> var currentDirection = CompassPoint.West
    <<< // currentDirection : CompassPoint = <unprintable value>
    --> let rememberedDirection = currentDirection
    <<< // rememberedDirection : CompassPoint = <unprintable value>
    --> currentDirection = .East
    --> if rememberedDirection == .West {
            println("The remembered direction is still .West")
        }
    <-- The remembered direction is still .West

When ``rememberedDirection`` is assigned the value of ``currentDirection``,
it is actually set to a copy of that value.
Changing the value of ``currentDirection`` thereafter does not affect
the copy of the original value that was stored in ``rememberedDirection``.

.. TODO: Should I give an example of passing a value type to a function here?

.. _ClassesAndStructures_ReferenceTypes:

Reference Types
~~~~~~~~~~~~~~~

Unlike value types, an instance of a :newTerm:`reference type` is *not* copied
when is assigned to a variable or constant,
or when it is passed to a function.
Rather than making a copy, a :newTerm:`reference` to the same existing instance is used instead.

.. TODO: This enables you to have multiple variables and constants
   that all refer to the same one instance. 

Here's an example, using the ``Rectangle`` class defined above:

.. testcode:: customTypes

    --> let rect = Rectangle()
    <<< // rect : Rectangle = <Rectangle instance>
    --> rect.size = Size(width: 1.0, height: 1.0)
    --> println("The rectangle's initial width is \(rect.size.width)")
    <-- The rectangle's initial width is 1.0
    --> let sameRect = rect
    <<< // sameRect : Rectangle = <Rectangle instance>
    --> sameRect.size.width = 3.0
    --> println("The rectangle's width via sameRect is now \(sameRect.size.width)")
    <-- The rectangle's width via sameRect is now 3.0
    --> println("The rectangle's width via rect is also \(rect.size.width)")
    <-- The rectangle's width via rect is also 3.0

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

.. TODO: Surely a rectangle is a good candidate for a structure, not a class,
   and indeed I say as much below.

Classes are the only reference types in Swift.
If you want to create a new type that is passed by reference rather than by value,
you should define it as a class in your code.

.. QUESTION: This isn't strictly true. Functions are reference types too.
   Does this matter for the point I'm making here?

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

Classes and structures have many things in common,
and both can be used to define custom data types to use as
the building blocks of your program's code.

However, the fact that structure instances are always passed by *value*,
and class instances are always passed by *reference*,
means that they are suited to different kinds of tasks.
As you consider the data constructs and functionality that you need for a project,
you will need to decide whether each data construct should be
defined as a class or as a structure.

.. note::

    Enumerations have many useful features in Swift,
    but are not really suited to creating general-purpose data types
    in the same way as classes and structures.
    Enumerations should only be used when you need the specific capabilities
    that they offer.

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

.. TODO: talk about "AnyObject",
   and how it can be used as a type for a named value that can hold
   an instance of any object type (including Cocoa classes).

.. QUESTION: what's the deal with tuples and reference types / value types?

.. _Enumerations_NestedTypes:

Nested Types
------------

.. HACK: this example no longer makes sense to include at this point
   It was originally from the end of the Enumerations chapter,
   but there is really no other place to introduce nested types,
   so I've had to bring them forward to here.
   I've left the complex example below for the time being.

Enumerations are often created to support a specific class or structure's functionality.
Similarly, it can sometimes be convenient to define utility classes and structures
purely for use within the context of a more complex type.
To achieve this, Swift provides a way to define :newTerm:`nested types`.
Nested types enable you to nest supporting enumerations, classes and structures
within the definition of the type they support.

The definition for a nested type is written within the braces of the type it supports.
Types can be nested to as many levels as are required:

.. testcode:: nestedTypes

    --> struct BlackjackCard {
            enum Suit : UnicodeScalar {
                case Spades = '♠', Hearts = '♡', Diamonds = '♢', Clubs = '♣'
            }
            enum Rank : String {
                case Two = "2", Three = "3", Four = "4", Five = "5", Six = "6"
                case Seven = "7", Eight = "8", Nine = "9", Ten = "10"
                case Jack = "Jack", Queen = "Queen", King = "King", Ace = "Ace"
                struct Values {
                    let firstValue: Int
                    let secondValue: Int?
                }
                var values: Values {
                    switch self {
                        case .Ace:
                            return Values(1, 11)
                        case .Jack, .Queen, .King:
                            return Values(10, .None)
                        default:
                            return Values(self.toRaw().toInt()!, .None)
                    }
                }
            }
            let rank: Rank
            let suit: Suit
            var description: String {
                var output = "the \(rank.toRaw()) of \(suit.toRaw())"
                output += " is worth \(rank.values.firstValue)"
                if let secondValue = rank.values.secondValue {
                    output += " or \(secondValue)"
                }
                return output
            }
        }
    --> let theAceOfSpades = BlackjackCard(.Ace, .Spades)
    <<< // theAceOfSpades : BlackjackCard = BlackjackCard(<unprintable value>, <unprintable value>)
    --> println("Blackjack value: \(theAceOfSpades.description)")
    <-- Blackjack value: the Ace of ♠ is worth 1 or 11

This example defines a playing card for use in the game of Blackjack.
One notable feature of Blackjack is that the Ace card has a value of
either one or eleven. This characteristic is encapsulated in the logic above.

The ``BlackjackCard`` structure defines two nested enumerations:

* ``Suit``, which describes the four common playing card suits,
  together with a raw ``UnicodeScalar`` value to represent their symbol
* ``Rank``, which describes the thirteen possible playing card ranks,
  together with a raw ``String`` value to represent their name

The ``Rank`` enumeration defines a further nested structure of its own, called ``Values``.
This structure encapsulates the fact that most cards have one value,
but the Ace card has two values.
The ``Values`` structure defines two properties to represent this:

* ``firstValue``, of type ``Int``
* ``secondValue``, of type ``Int?``, i.e. “optional ``Int``”

``Rank`` also defines a computed property, ``values``,
which returns an instance of the ``Values`` structure.
This computed property considers the rank of the card,
and initializes a new ``Values`` instance with appropriate values based on its rank.
It uses special values for ``Jack``, ``Queen``, ``King`` and ``Ace``.
For the numeric cards, it converts the rank's raw ``String`` value into an ``Int?``
using ``String``'s ``toInt()`` method.
Because every numeric card value is known to definitely convert to an ``Int``,
the value of this optional ``Int`` is accessed via an exclamation mark (``!``)
without being checked, and is used as the first value of the ``Values`` structure.

The ``BlackjackCard`` structure itself is pretty simple.
It actually only has two properties – ``rank``, and ``suit``.
It also defines a computed property called ``description``,
which uses the values stored in ``rank`` and ``suit`` to build
a textual description of the card.
The ``description`` property uses optional binding to check if there is
a second value to display, and inserts addition description detail if so.

Because ``BlackjackCard`` is a structure with no custom initializers,
it has an implicit memberwise initializer
(as described in :ref:`ClassesAndStructures_MemberwiseStructureInitializers`).
This is used to initialize a new constant called ``theAceOfSpades``.
Even though ``Rank`` and ``Suit`` are nested within ``BlackjackCard``,
their type can still be inferred from the context,
and so the initialization of this instance is able to refer to the enumeration members
by their member names (``.Ace`` and ``.Spades``) alone.

.. _Enumerations_ReferringToNestedTypes:

Referring to Nested Types
~~~~~~~~~~~~~~~~~~~~~~~~~

A nested type can be used outside of its definition context,
by prefixing its name with the name of the type it is nested within:

.. testcode:: nestedTypes

    --> let heartsSymbol = BlackjackCard.Suit.Hearts.toRaw()
    <<< // heartsSymbol : UnicodeScalar = '♡'
    /-> heartsSymbol is '\(heartsSymbol)'
    <-/ heartsSymbol is '♡'

For the example above, 
this enables the names of ``Suit``, ``Rank`` and ``Values`` to be kept deliberately short,
because their names are naturally qualified by the context in which they are defined.