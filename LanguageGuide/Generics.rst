Generics
========

:newTerm:`Generic code` enables you to write flexible, reusable functions and types
that can work with any type, subject to requirements that you define.
You can write code that avoids duplication
and expresses its intent in a clear, abstracted manner.

Generics are one of the most powerful features of Swift,
and much of the Swift standard library is built with generic code.
In fact, you've been using generics throughout the *Language Guide*,
even if you didn't realize it.
For example, Swift's ``Array`` and ``Dictionary`` types
are both generic collections.
You can create an array that holds ``Int`` values,
or an array that holds ``String`` values,
or indeed an array for any other type that can be created in Swift.
Similarly, you can create a dictionary to store values of any specified type,
and there are no limitations on what that type can be.

.. _Generics_TheProblemThatGenericsSolve:

The Problem That Generics Solve
-------------------------------

Here's a standard, non-generic function called ``swapTwoInts(_:_:)``,
which swaps two ``Int`` values:

.. testcode:: whyGenerics

   -> func swapTwoInts(_ a: inout Int, _ b: inout Int) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

This function makes use of in-out parameters to swap the values of ``a`` and ``b``,
as described in :ref:`Functions_InOutParameters`.

The ``swapTwoInts(_:_:)`` function swaps the original value of ``b`` into ``a``,
and the original value of ``a`` into ``b``.
You can call this function to swap the values in two ``Int`` variables:

.. testcode:: whyGenerics

   -> var someInt = 3
   << // someInt : Int = 3
   -> var anotherInt = 107
   << // anotherInt : Int = 107
   -> swapTwoInts(&someInt, &anotherInt)
   -> print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
   <- someInt is now 107, and anotherInt is now 3

The ``swapTwoInts(_:_:)`` function is useful, but it can only be used with ``Int`` values.
If you want to swap two ``String`` values,
or two ``Double`` values,
you have to write more functions,
such as the ``swapTwoStrings(_:_:)`` and ``swapTwoDoubles(_:_:)`` functions shown below:

.. testcode:: whyGenerics

   -> func swapTwoStrings(_ a: inout String, _ b: inout String) {
         let temporaryA = a
         a = b
         b = temporaryA
      }
   ---
   -> func swapTwoDoubles(_ a: inout Double, _ b: inout Double) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

You may have noticed that the bodies of
the ``swapTwoInts(_:_:)``, ``swapTwoStrings(_:_:)``, and ``swapTwoDoubles(_:_:)`` functions are identical.
The only difference is the type of the values that they accept
(``Int``, ``String``, and ``Double``).

It would be much more useful, and considerably more flexible,
to write a single function that could swap two values of *any* type.
Generic code enables you to write such a function.
(A generic version of these functions is defined below.)

.. note::

   In all three functions,
   it is important that the types of ``a`` and ``b`` are defined to be the same as each other.
   If ``a`` and ``b`` were not of the same type,
   it would not be possible to swap their values.
   Swift is a type-safe language,
   and does not allow (for example) a variable of type ``String``
   and a variable of type ``Double``
   to swap values with each other.
   Attempting to do so would be reported as a compile-time error.

.. _Generics_GenericFunctions:

Generic Functions
-----------------

:newTerm:`Generic functions` can work with any type.
Here's a generic version of the ``swapTwoInts(_:_:)`` function from above,
called ``swapTwoValues(_:_:)``:

.. testcode:: genericFunctions

   -> func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

.. This could be done in one line using a tuple pattern: (a, b) = (b, a)
   That's probably not as approachable here, and the novel syntax to avoid an
   explicit placeholder variable might distract from the discussion of
   generics.

The body of the ``swapTwoValues(_:_:)`` function
is identical to the body of the ``swapTwoInts(_:_:)`` function.
However, the first line of ``swapTwoValues(_:_:)``
is slightly different from ``swapTwoInts(_:_:)``.
Here's how the first lines compare:

.. testcode:: genericFunctionsComparison

   -> func swapTwoInts(_ a: inout Int, _ b: inout Int)
   >> {
   >>    let temporaryA = a
   >>    a = b
   >>    b = temporaryA
   >> }
   -> func swapTwoValues<T>(_ a: inout T, _ b: inout T)
   >> {
   >>    let temporaryA = a
   >>    a = b
   >>    b = temporaryA
   >> }

The generic version of the function
uses a *placeholder* type name (called ``T``, in this case)
instead of an *actual* type name (such as ``Int``, ``String``, or ``Double``).
The placeholder type name doesn't say anything about what ``T`` must be,
but it *does* say that both ``a`` and ``b`` must be of the same type ``T``,
whatever ``T`` represents.
The actual type to use in place of ``T``
will be determined each time the ``swapTwoValues(_:_:)`` function is called.

The other difference is that the generic function's name (``swapTwoValues(_:_:)``)
is followed by the placeholder type name (``T``) inside angle brackets (``<T>``).
The brackets tell Swift that ``T`` is a placeholder type name
within the ``swapTwoValues(_:_:)`` function definition.
Because ``T`` is a placeholder, Swift does not look for an actual type called ``T``.

The ``swapTwoValues(_:_:)`` function can now be called in the same way as ``swapTwoInts``,
except that it can be passed two values of *any* type,
as long as both of those values are of the same type as each other.
Each time ``swapTwoValues(_:_:)`` is called,
the type to use for ``T`` is inferred from the types of values passed to the function.

In the two examples below, ``T`` is inferred to be ``Int`` and ``String`` respectively:

.. testcode:: genericFunctions

   -> var someInt = 3
   << // someInt : Int = 3
   -> var anotherInt = 107
   << // anotherInt : Int = 107
   -> swapTwoValues(&someInt, &anotherInt)
   /> someInt is now \(someInt), and anotherInt is now \(anotherInt)
   </ someInt is now 107, and anotherInt is now 3
   ---
   -> var someString = "hello"
   << // someString : String = "hello"
   -> var anotherString = "world"
   << // anotherString : String = "world"
   -> swapTwoValues(&someString, &anotherString)
   /> someString is now \"\(someString)\", and anotherString is now \"\(anotherString)\"
   </ someString is now "world", and anotherString is now "hello"

.. note::

   The ``swapTwoValues(_:_:)`` function defined above is inspired by
   a generic function called ``swap``, which is part of the Swift standard library,
   and is automatically made available for you to use in your apps.
   If you need the behavior of the ``swapTwoValues(_:_:)`` function in your own code,
   you can use Swift's existing ``swap(_:_:)`` function rather than providing your own implementation.

.. _Generics_TypeParameters:

Type Parameters
---------------

In the ``swapTwoValues(_:_:)`` example above,
the placeholder type ``T`` is an example of a :newTerm:`type parameter`.
Type parameters specify and name a placeholder type,
and are written immediately after the function's name,
between a pair of matching angle brackets (such as ``<T>``).

Once you specify a type parameter,
you can use it to define the type of a function's parameters
(such as the ``a`` and ``b`` parameters of the ``swapTwoValues(_:_:)`` function),
or as the function's return type,
or as a type annotation within the body of the function.
In each case, the type parameter
is replaced with an *actual* type whenever the function is called.
(In the ``swapTwoValues(_:_:)`` example above,
``T`` was replaced with ``Int`` the first time the function was called,
and was replaced with ``String`` the second time it was called.)

You can provide more than one type parameter
by writing multiple type parameter names within the angle brackets,
separated by commas.

.. _Generics_NamingTypeParameters:

Naming Type Parameters
----------------------

In most cases, type parameters have descriptive names,
such as ``Key`` and ``Value`` in ``Dictionary<Key, Value>``
and ``Element`` in ``Array<Element>``,
which tells the reader about the relationship between the type parameter
and the generic type or function it's used in.
However, when there isn't a meaningful relationship between them,
it's traditional to name them using single letters such as ``T``, ``U``, and ``V``,
such as ``T`` in the ``swapTwoValues(_:_:)`` function above.

.. note::

   Always give type parameters upper camel case names
   (such as ``T`` and ``MyTypeParameter``)
   to indicate that they are a placeholder for a *type*, not a value.

.. _Generics_GenericTypes:

Generic Types
-------------

In addition to generic functions,
Swift enables you to define your own :newTerm:`generic types`.
These are custom classes, structures, and enumerations
that can work with *any* type, in a similar way to ``Array`` and ``Dictionary``.

This section shows you how to write a generic collection type called ``Stack``.
A stack is an ordered set of values, similar to an array,
but with a more restricted set of operations than Swift's ``Array`` type.
An array allows new items to be inserted and removed at any location in the array.
A stack, however, allows new items to be appended only to the end of the collection
(known as :newTerm:`pushing` a new value on to the stack).
Similarly, a stack allows items to be removed only from the end of the collection
(known as :newTerm:`popping` a value off the stack).

.. note::

   The concept of a stack is used by the ``UINavigationController`` class
   to model the view controllers in its navigation hierarchy.
   You call the ``UINavigationController`` class
   ``pushViewController(_:animated:)`` method to add (or push)
   a view controller on to the navigation stack,
   and its ``popViewControllerAnimated(_:)`` method to remove (or pop)
   a view controller from the navigation stack.
   A stack is a useful collection model whenever you need a strict
   “last in, first out” approach to managing a collection.

The illustration below shows the push / pop behavior for a stack:

.. image:: ../images/stackPushPop_2x.png
   :align: center

1. There are currently three values on the stack.
2. A fourth value is “pushed” on to the top of the stack.
3. The stack now holds four values, with the most recent one at the top.
4. The top item in the stack is removed, or “popped”.
5. After popping a value, the stack once again holds three values.

Here's how to write a non-generic version of a stack,
in this case for a stack of ``Int`` values:

.. testcode:: genericStack

   -> struct IntStack {
         var items = [Int]()
         mutating func push(_ item: Int) {
            items.append(item)
         }
         mutating func pop() -> Int {
            return items.removeLast()
         }
      }
   >> var intStack = IntStack()
   << // intStack : IntStack = REPL.IntStack(items: [])
   >> intStack.push(1)
   >> intStack.push(2)
   >> intStack.push(3)
   >> intStack.push(4)
   >> print("the stack now contains \(intStack.items.count) integers")
   << the stack now contains 4 integers

This structure uses an ``Array`` property called ``items`` to store the values in the stack.
``Stack`` provides two methods, ``push`` and ``pop``,
to push and pop values on and off the stack.
These methods are marked as ``mutating``,
because they need to modify (or *mutate*) the structure's ``items`` array.

The ``IntStack`` type shown above can only be used with ``Int`` values, however.
It would be much more useful to define a *generic* ``Stack`` class,
that can manage a stack of *any* type of value.

Here's a generic version of the same code:

.. testcode:: genericStack

   -> struct Stack<Element> {
         var items = [Element]()
         mutating func push(_ item: Element) {
            items.append(item)
         }
         mutating func pop() -> Element {
            return items.removeLast()
         }
      }

Note how the generic version of ``Stack``
is essentially the same as the non-generic version,
but with a type parameter called ``Element``
instead of an actual type of ``Int``.
This type parameter is written within a pair of angle brackets (``<Element>``)
immediately after the structure's name.

``Element`` defines a placeholder name for
“some type ``Element``” to be provided later on.
This future type can be referred to as “``Element``”
anywhere within the structure's definition.
In this case, ``Element`` is used as a placeholder in three places:

* To create a property called ``items``,
  which is initialized with an empty array of values of type ``Element``
* To specify that the ``push(_:)`` method has a single parameter called ``item``,
  which must be of type ``Element``
* To specify that the value returned by the ``pop()`` method
  will be a value of type ``Element``

Because it is a generic type,
``Stack`` can be used to create a stack of *any* valid type in Swift,
in a similar manner to ``Array`` and ``Dictionary``.

You create a new ``Stack`` instance by writing
the type to be stored in the stack within angle brackets.
For example, to create a new stack of strings,
you write ``Stack<String>()``:

.. testcode:: genericStack

   -> var stackOfStrings = Stack<String>()
   << // stackOfStrings : Stack<String> = REPL.Stack<Swift.String>(items: [])
   -> stackOfStrings.push("uno")
   -> stackOfStrings.push("dos")
   -> stackOfStrings.push("tres")
   -> stackOfStrings.push("cuatro")
   /> the stack now contains \(stackOfStrings.items.count) strings
   </ the stack now contains 4 strings

Here's how ``stackOfStrings`` looks after pushing these four values on to the stack:

.. image:: ../images/stackPushedFourStrings_2x.png
   :align: center

Popping a value from the stack removes and returns the top value, ``"cuatro"``:

.. testcode:: genericStack

   -> let fromTheTop = stackOfStrings.pop()
   << // fromTheTop : String = "cuatro"
   /> fromTheTop is equal to \"\(fromTheTop)\", and the stack now contains \(stackOfStrings.items.count) strings
   </ fromTheTop is equal to "cuatro", and the stack now contains 3 strings

Here's how the stack looks after popping its top value:

.. image:: ../images/stackPoppedOneString_2x.png
   :align: center

.. _Generics_ExtendingAGenericType:

Extending a Generic Type
------------------------

When you extend a generic type,
you do not provide a type parameter list as part of the extension's definition.
Instead, the type parameter list from the *original* type definition
is available within the body of the extension,
and the original type parameter names are used to refer to
the type parameters from the original definition.

The following example extends the generic ``Stack`` type to add
a read-only computed property called ``topItem``,
which returns the top item on the stack without popping it from the stack:

.. testcode:: genericStack

   -> extension Stack {
         var topItem: Element? {
            return items.isEmpty ? nil : items[items.count - 1]
         }
      }

The ``topItem`` property returns an optional value of type ``Element``.
If the stack is empty, ``topItem`` returns ``nil``;
if the stack is not empty, ``topItem`` returns the final item in the ``items`` array.

Note that this extension does not define a type parameter list.
Instead, the ``Stack`` type's existing type parameter name, ``Element``,
is used within the extension to indicate the optional type of
the ``topItem`` computed property.

The ``topItem`` computed property can now be used with any ``Stack`` instance
to access and query its top item without removing it:

.. testcode:: genericStack

   -> if let topItem = stackOfStrings.topItem {
         print("The top item on the stack is \(topItem).")
      }
   <- The top item on the stack is tres.

.. _Generics_TypeConstraints:

Type Constraints
----------------

The ``swapTwoValues(_:_:)`` function and the ``Stack`` type can work with any type.
However, it is sometimes useful to enforce
certain :newTerm:`type constraints` on the types that can be used with
generic functions and generic types.
Type constraints specify that a type parameter must
inherit from a specific class,
or conform to a particular protocol or protocol composition.

For example,
Swift's ``Dictionary`` type places a limitation on
the types that can be used as keys for a dictionary.
As described in :ref:`CollectionTypes_Dictionaries`,
the type of a dictionary's keys must be :newTerm:`hashable`.
That is, it must provide a way to make itself uniquely representable.
``Dictionary`` needs its keys to be hashable so that it can
check whether it already contains a value for a particular key.
Without this requirement, ``Dictionary`` could not tell
whether it should insert or replace a value for a particular key,
nor would it be able to find a value for a given key that is already in the dictionary.

This requirement is enforced by a type constraint on the key type for ``Dictionary``,
which specifies that the key type must conform to the ``Hashable`` protocol,
a special protocol defined in the Swift standard library.
All of Swift's basic types (such as ``String``, ``Int``, ``Double``, and ``Bool``)
are hashable by default.

.. TODO: add some text to the following effect once we have documentation for Hashable:
   You can make your own custom types conform to the ``Hashable`` protocol
   so that they too can be dictionary keys,
   as described in <link>.

You can define your own type constraints when creating custom generic types,
and these constraints provide much of the power of generic programming.
Abstract concepts like ``Hashable``
characterize types in terms of their conceptual characteristics,
rather than their explicit type.

.. _Generics_TypeConstraintSyntax:

Type Constraint Syntax
~~~~~~~~~~~~~~~~~~~~~~

You write type constraints by placing a single class or protocol constraint
after a type parameter's name, separated by a colon,
as part of the type parameter list.
The basic syntax for type constraints on a generic function is shown below
(although the syntax is the same for generic types):

.. testcode:: typeConstraints

   >> class SomeClass {}
   >> protocol SomeProtocol {}
   -> func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
         // function body goes here
      }

The hypothetical function above has two type parameters.
The first type parameter, ``T``, has a type constraint
that requires ``T`` to be a subclass of ``SomeClass``.
The second type parameter, ``U``, has a type constraint
that requires ``U`` to conform to the protocol ``SomeProtocol``.

.. _Generics_TypeConstraintsInAction:

Type Constraints in Action
~~~~~~~~~~~~~~~~~~~~~~~~~~

Here's a non-generic function called ``findIndex(ofString:inArray:)``,
which is given a ``String`` value to find
and an array of ``String`` values within which to find it.
The ``findIndex(ofString:inArray:)`` function returns an optional ``Int`` value,
which will be the index of the first matching string in the array if it is found,
or ``nil`` if the string cannot be found:

.. testcode:: typeConstraints

   -> func findIndex(ofString valueToFind: String, inArray array: [String]) -> Int? {
         for (index, value) in array.enumerated() {
            if value == valueToFind {
               return index
            }
         }
         return nil
      }

The ``findIndex(ofString:inArray:)`` function can be used to find a string value in an array of strings:

.. testcode:: typeConstraints

   -> let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
   << // strings : [String] = ["cat", "dog", "llama", "parakeet", "terrapin"]
   -> if let foundIndex = findIndex(ofString: "llama", inArray: strings) {
         print("The index of llama is \(foundIndex)")
      }
   <- The index of llama is 2

The principle of finding the index of a value in an array isn't useful only for strings, however.
You can write the same functionality as a generic function called ``findIndex``,
by replacing any mention of strings with values of some type ``T`` instead.

Here's how you might expect a generic version of ``findIndex(ofString:inArray:)``,
called ``findIndex(ofValue:inArray:)``, to be written.
Note that the return type of this function is still ``Int?``,
because the function returns an optional index number,
not an optional value from the array.
Be warned, though --- this function does not compile,
for reasons explained after the example:

.. testcode:: typeConstraints

   -> func findIndex<T>(ofValue valueToFind: T, inArray array:[T]) -> Int? {
         for (index, value) in array.enumerated() {
            if value == valueToFind {
               return index
            }
         }
         return nil
      }
   !! <REPL Input>:3:18: error: binary operator '==' cannot be applied to two 'T' operands
   !!       if value == valueToFind {
   !!          ~~~~~ ^  ~~~~~~~~~~~
   !! <REPL Input>:3:18: note: overloads for '==' exist with these partially matching parameter lists: (FloatingPointClassification, FloatingPointClassification), (Mirror.DisplayStyle, Mirror.DisplayStyle), (_MirrorDisposition, _MirrorDisposition), (Bool, Bool), (Any.Type?, Any.Type?), (Character, Character), (OpaquePointer, OpaquePointer), (UInt8, UInt8), (Int8, Int8), (UInt16, UInt16), (Int16, Int16), (UInt32, UInt32), (Int32, Int32), (UInt64, UInt64), (Int64, Int64), (UInt, UInt), (Int, Int), (Float, Float), (Double, Double), (Float80, Float80), (ObjectIdentifier, ObjectIdentifier), (String, String), (Index, Index), (String.UnicodeScalarView.Index, String.UnicodeScalarView.Index), (String.UTF16View.Index, String.UTF16View.Index), (String.UTF8View.Index, String.UTF8View.Index), (UnicodeDecodingResult, UnicodeDecodingResult), (UnicodeScalar, UnicodeScalar), (_SwiftNSOperatingSystemVersion, _SwiftNSOperatingSystemVersion), (AnyForwardIndex, AnyForwardIndex), (AnyBidirectionalIndex, AnyBidirectionalIndex), (AnyRandomAccessIndex, AnyRandomAccessIndex), (ContiguousArray<Element>, ContiguousArray<Element>), (ArraySlice<Element>, ArraySlice<Element>), (Array<Element>, Array<Element>), (AutoreleasingUnsafeMutablePointer<Pointee>, AutoreleasingUnsafeMutablePointer<Pointee>), (LazyFilterIndex<Base>, LazyFilterIndex<Base>), (FlattenCollectionIndex<BaseElements>, FlattenCollectionIndex<BaseElements>), (FlattenBidirectionalCollectionIndex<BaseElements>, FlattenBidirectionalCollectionIndex<BaseElements>), (Set<Element>, Set<Element>), ([Key : Value], [Key : Value]), (SetIndex<Element>, SetIndex<Element>), (DictionaryIndex<Key, Value>, DictionaryIndex<Key, Value>), (_HeapBuffer<Value, Element>, _HeapBuffer<Value, Element>), (HalfOpenInterval<Bound>, HalfOpenInterval<Bound>), (ClosedInterval<Bound>, ClosedInterval<Bound>), (ManagedBufferPointer<Value, Element>, ManagedBufferPointer<Value, Element>), (T?, T?), (T?, _OptionalNilComparisonType), (_OptionalNilComparisonType, T?), (Range<Element>, Range<Element>), (ReverseIndex<Base>, ReverseIndex<Base>), (UnsafeMutablePointer<Pointee>, UnsafeMutablePointer<Pointee>), (UnsafePointer<Pointee>, UnsafePointer<Pointee>), ((A, B), (A, B)), ((A, B, C), (A, B, C)), ((A, B, C, D), (A, B, C, D)), ((A, B, C, D, E), (A, B, C, D, E)), ((A, B, C, D, E, F), (A, B, C, D, E, F))
   !! if value == valueToFind {
   !!          ^

This function does not compile as written above.
The problem lies with the equality check, “``if value == valueToFind``”.
Not every type in Swift can be compared with the equal to operator (``==``).
If you create your own class or structure to represent a complex data model, for example,
then the meaning of “equal to” for that class or structure
is not something that Swift can guess for you.
Because of this, it is not possible to guarantee that this code will work
for *every* possible type ``T``,
and an appropriate error is reported when you try to compile the code.

All is not lost, however.
The Swift standard library defines a protocol called ``Equatable``,
which requires any conforming type to implement
the equal to operator (``==``) and the not equal to operator (``!=``)
to compare any two values of that type.
All of Swift's standard types automatically support the ``Equatable`` protocol.

.. TODO: write about how to make your own types conform to Equatable
   once we have some documentation that actually describes it.
   The text to use is something like:
   and you can make your own types conform to ``Equatable`` too,
   as described in <link>.

Any type that is ``Equatable`` can be used safely with the ``findIndex(ofValue:inArray:)`` function,
because it is guaranteed to support the equal to operator.
To express this fact, you write a type constraint of ``Equatable``
as part of the type parameter's definition when you define the function:

.. testcode:: typeConstraintsEquatable

   -> func findIndex<T: Equatable>(ofValue valueToFind: T, inArray array:[T]) -> Int? {
         for (index, value) in array.enumerated() {
            if value == valueToFind {
               return index
            }
         }
         return nil
      }

The single type parameter for ``findIndex`` is written as ``T: Equatable``,
which means “any type ``T`` that conforms to the ``Equatable`` protocol.”

The ``findIndex(ofValue:inArray:)`` function now compiles successfully
and can be used with any type that is ``Equatable``, such as ``Double`` or ``String``:

.. testcode:: typeConstraintsEquatable

   -> let doubleIndex = findIndex(ofValue: 9.3, inArray: [3.14159, 0.1, 0.25])
   << // doubleIndex : Int? = nil
   /> doubleIndex is an optional Int with no value, because 9.3 is not in the array
   </ doubleIndex is an optional Int with no value, because 9.3 is not in the array
   -> let stringIndex = findIndex(ofValue: "Andrea", inArray: ["Mike", "Malcolm", "Andrea"])
   << // stringIndex : Int? = Optional(2)
   /> stringIndex is an optional Int containing a value of \(stringIndex!)
   </ stringIndex is an optional Int containing a value of 2

.. TODO: providing different type parameters on individual methods within a generic type

.. TODO: likewise providing type parameters for initializers

.. _Generics_AssociatedTypes:

Associated Types
----------------

When defining a protocol,
it is sometimes useful to declare one or more associated types
as part of the protocol's definition.
An :newterm:`associated type` gives a placeholder name
to a type that is used as part of the protocol.
The actual type to use for that associated type
is not specified until the protocol is adopted.
Associated types are specified with the ``associatedtype`` keyword.

.. _Generics_AssociatedTypesInAction:

Associated Types in Action
~~~~~~~~~~~~~~~~~~~~~~~~~~

Here's an example of a protocol called ``Container``,
which declares an associated type called ``ItemType``:

.. testcode:: associatedTypes

   -> protocol Container {
         associatedtype ItemType
         mutating func append(_ item: ItemType)
         var count: Int { get }
         subscript(i: Int) -> ItemType { get }
      }

The ``Container`` protocol defines three required capabilities
that any container must provide:

* It must be possible to add a new item to the container with an ``append(_:)`` method.
* It must be possible to access a count of the items in the container
  through a ``count`` property that returns an ``Int`` value.
* It must be possible to retrieve each item in the container with a subscript
  that takes an ``Int`` index value.

This protocol doesn't specify how the items in the container should be stored
or what type they are allowed to be.
The protocol only specifies the three bits of functionality
that any type must provide in order to be considered a ``Container``.
A conforming type can provide additional functionality,
as long as it satisfies these three requirements.

Any type that conforms to the ``Container`` protocol must be able to specify
the type of values it stores.
Specifically, it must ensure that only items of the right type
are added to the container,
and it must be clear about the type of the items returned by its subscript.

To define these requirements,
the ``Container`` protocol needs a way to refer to
the type of the elements that a container will hold,
without knowing what that type is for a specific container.
The ``Container`` protocol needs to specify that
any value passed to the ``append(_:)`` method
must have the same type as the container's element type,
and that the value returned by the container's subscript
will be of the same type as the container's element type.

To achieve this,
the ``Container`` protocol declares an associated type called ``ItemType``,
written as  ``associatedtype ItemType``.
The protocol does not define what ``ItemType`` is ---
that information is left for any conforming type to provide.
Nonetheless, the ``ItemType`` alias provides a way to refer to
the type of the items in a ``Container``,
and to define a type for use with the ``append(_:)`` method and subscript,
to ensure that the expected behavior of any ``Container`` is enforced.

Here's a version of the non-generic ``IntStack`` type from earlier,
adapted to conform to the ``Container`` protocol:

.. testcode:: associatedTypes

   -> struct IntStack: Container {
         // original IntStack implementation
         var items = [Int]()
         mutating func push(_ item: Int) {
            items.append(item)
         }
         mutating func pop() -> Int {
            return items.removeLast()
         }
         // conformance to the Container protocol
         typealias ItemType = Int
         mutating func append(_ item: Int) {
            self.push(item)
         }
         var count: Int {
            return items.count
         }
         subscript(i: Int) -> Int {
            return items[i]
         }
      }

The ``IntStack`` type implements all three of the ``Container`` protocol's requirements,
and in each case wraps part of the ``IntStack`` type's existing functionality
to satisfy these requirements.

Moreover, ``IntStack`` specifies that for this implementation of ``Container``,
the appropriate ``ItemType`` to use is a type of ``Int``.
The definition of ``typealias ItemType = Int`` turns the abstract type of ``ItemType``
into a concrete type of ``Int`` for this implementation of the ``Container`` protocol.

Thanks to Swift's type inference,
you don't actually need to declare a concrete ``ItemType`` of ``Int``
as part of the definition of ``IntStack``.
Because ``IntStack`` conforms to all of the requirements of the ``Container`` protocol,
Swift can infer the appropriate ``ItemType`` to use,
simply by looking at the type of the ``append(_:)`` method's ``item`` parameter
and the return type of the subscript.
Indeed, if you delete the ``typealias ItemType = Int`` line from the code above,
everything still works, because it is clear what type should be used for ``ItemType``.

You can also make the generic ``Stack`` type conform to the ``Container`` protocol:

.. testcode:: associatedTypes

   -> struct Stack<Element>: Container {
         // original Stack<Element> implementation
         var items = [Element]()
         mutating func push(_ item: Element) {
            items.append(item)
         }
         mutating func pop() -> Element {
            return items.removeLast()
         }
         // conformance to the Container protocol
         mutating func append(_ item: Element) {
            self.push(item)
         }
         var count: Int {
            return items.count
         }
         subscript(i: Int) -> Element {
            return items[i]
         }
      }

This time, the type parameter ``Element`` is used as
the type of the ``append(_:)`` method's ``item`` parameter
and the return type of the subscript.
Swift can therefore infer that ``Element`` is the appropriate type to use
as the ``ItemType`` for this particular container.

.. _Generics_ExtendingAnExistingTypeToSpecifyAnAssociatedType:

Extending an Existing Type to Specify an Associated Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can extend an existing type to add conformance to a protocol,
as described in :ref:`Protocols_AddingProtocolConformanceWithAnExtension`.
This includes a protocol with an associated type.

Swift's ``Array`` type already provides an ``append(_:)`` method,
a ``count`` property, and a subscript with an ``Int`` index to retrieve its elements.
These three capabilities match the requirements of the ``Container`` protocol.
This means that you can extend ``Array`` to conform to the ``Container`` protocol
simply by declaring that ``Array`` adopts the protocol.
You do this with an empty extension,
as described in :ref:`Protocols_DeclaringProtocolAdoptionWithAnExtension`:

.. testcode:: associatedTypes

   -> extension Array: Container {}

Array's existing ``append(_:)`` method and subscript enable Swift to infer
the appropriate type to use for ``ItemType``,
just as for the generic ``Stack`` type above.
After defining this extension, you can use any ``Array`` as a ``Container``.

.. _Generics_WhereClauses:

Where Clauses
-------------

Type constraints, as described in :ref:`Generics_TypeConstraints`,
enable you to define requirements on the type parameters associated with
a generic function or type.

It can also be useful to define requirements for associated types.
You do this by defining :newTerm:`where clauses` as part of a type parameter list.
A where clause enables you to require that
an associated type must conform to a certain protocol,
or that certain type parameters and associated types must be the same.
You write a where clause by placing the ``where`` keyword
immediately after the list of type parameters,
followed by constraints for associated types
or equality relationships between types and associated types.

The example below defines a generic function called ``allItemsMatch``,
which checks to see if two ``Container`` instances contain
the same items in the same order.
The function returns a Boolean value of ``true`` if all items match
and a value of ``false`` if they do not.

The two containers to be checked do not have to be
the same type of container (although they can be),
but they do have to hold the same type of items.
This requirement is expressed through a combination of type constraints and where clauses:

.. testcode:: associatedTypes

   -> func allItemsMatch<
            C1: Container, C2: Container
            where C1.ItemType == C2.ItemType, C1.ItemType: Equatable>
            (someContainer: C1, _ anotherContainer: C2) -> Bool {
   ---
         // check that both containers contain the same number of items
         if someContainer.count != anotherContainer.count {
            return false
         }
   ---
         // check each pair of items to see if they are equivalent
         for i in 0..<someContainer.count {
            if someContainer[i] != anotherContainer[i] {
               return false
            }
         }
   ---
         // all items match, so return true
         return true
   ---
      }

This function takes two arguments called
``someContainer`` and ``anotherContainer``.
The ``someContainer`` argument is of type ``C1``,
and the ``anotherContainer`` argument is of type ``C2``.
Both ``C1`` and ``C2`` are type parameters
for two container types to be determined when the function is called.

The function's type parameter list places
the following requirements on the two type parameters:

* ``C1`` must conform to the ``Container`` protocol (written as ``C1: Container``).
* ``C2`` must also conform to the ``Container`` protocol (written as ``C2: Container``).
* The ``ItemType`` for ``C1`` must be the same as the ``ItemType`` for ``C2``
  (written as ``C1.ItemType == C2.ItemType``).
* The ``ItemType`` for ``C1`` must conform to the ``Equatable`` protocol
  (written as ``C1.ItemType: Equatable``).

The third and fourth requirements are defined as part of a where clause,
and are written after the ``where`` keyword as part of the function's type parameter list.

These requirements mean:

* ``someContainer`` is a container of type ``C1``.
* ``anotherContainer`` is a container of type ``C2``.
* ``someContainer`` and ``anotherContainer`` contain the same type of items.
* The items in ``someContainer`` can be checked with the not equal operator (``!=``)
  to see if they are different from each other.

The third and fourth requirements combine to mean that
the items in ``anotherContainer`` can *also* be checked with the ``!=`` operator,
because they are exactly the same type as the items in ``someContainer``.

These requirements enable the ``allItemsMatch(_:_:)`` function to compare the two containers,
even if they are of a different container type.

The ``allItemsMatch(_:_:)`` function starts by checking that
both containers contain the same number of items.
If they contain a different number of items, there is no way that they can match,
and the function returns ``false``.

After making this check, the function iterates over all of the items in ``someContainer``
with a ``for``-``in`` loop and the half-open range operator (``..<``).
For each item, the function checks whether the item from ``someContainer`` is not equal to
the corresponding item in ``anotherContainer``.
If the two items are not equal, then the two containers do not match,
and the function returns ``false``.

If the loop finishes without finding a mismatch,
the two containers match, and the function returns ``true``.

Here's how the ``allItemsMatch(_:_:)`` function looks in action:

.. testcode:: associatedTypes

   -> var stackOfStrings = Stack<String>()
   << // stackOfStrings : Stack<String> = REPL.Stack<Swift.String>(items: [])
   -> stackOfStrings.push("uno")
   -> stackOfStrings.push("dos")
   -> stackOfStrings.push("tres")
   ---
   -> var arrayOfStrings = ["uno", "dos", "tres"]
   << // arrayOfStrings : [String] = ["uno", "dos", "tres"]
   ---
   -> if allItemsMatch(stackOfStrings, arrayOfStrings) {
         print("All items match.")
      } else {
         print("Not all items match.")
      }
   <- All items match.

The example above creates a ``Stack`` instance to store ``String`` values,
and pushes three strings onto the stack.
The example also creates an ``Array`` instance initialized with
an array literal containing the same three strings as the stack.
Even though the stack and the array are of a different type,
they both conform to the ``Container`` protocol,
and both contain the same type of values.
You can therefore call the ``allItemsMatch(_:_:)`` function
with these two containers as its arguments.
In the example above, the ``allItemsMatch(_:_:)`` function correctly reports that
all of the items in the two containers match.

.. TODO: Subscripts
   ----------------

.. TODO: Protocols can require conforming types to provide specific subscripts

.. TODO: These typically return a value of type T, which is why I've moved this here

.. TODO: Generic Enumerations
   --------------------------

.. TODO: Describe how Optional<Wrapped> works
