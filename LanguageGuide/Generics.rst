Generics
========

:newTerm:`Generics` are a way to write flexible, reusable code
that can work with any type, subject to requirements that you define.

Generics are one of the most powerful features of Swift,
and much of the Swift standard library is built with generic code.
Generics enable you to write flexible code that avoids duplication,
and expresses its intent in a clear, abstracted manner.

.. _Generics_WhyGenerics:

Why Generics?
-------------

Here's a standard, non-generic function called ``swapTwoInts``,
which uses in-out parameters to swap the values of two ``Int`` arguments
called ``a`` and ``b``:

.. testcode:: whyGenerics

   -> func swapTwoInts(inout a: Int, inout b: Int) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

Here's a call to this function,
to swap the values of ``someInt`` and ``anotherInt``:

.. testcode:: whyGenerics

   -> var someInt = 3
   << // someInt : Int = 3
   -> var anotherInt = 107
   << // anotherInt : Int = 107
   -> swapTwoInts(&someInt, &anotherInt)
   -> println("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
   <- someInt is now 107, and anotherInt is now 3

For more on in-out parameters, see :ref:`Functions_InOutParameters`.

The ``swapTwoInts`` function is useful, but it can only be used with ``Int`` values.
If you want to swap two ``String`` values,
or two ``Double`` values,
you have to write more functions,
such as the ``swapTwoStrings`` and ``swapTwoDoubles`` functions shown below:

.. testcode:: whyGenerics

   -> func swapTwoStrings(inout a: String, inout b: String) {
         let temporaryA = a
         a = b
         b = temporaryA
      }
   ---
   -> func swapTwoDoubles(inout a: Double, inout b: Double) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

You may have noticed that the bodies of
the ``swapTwoInts``, ``swapTwoStrings``, and ``swapTwoDoubles`` functions are identical.
The only difference is the type of the values that they accept
(``Int``, ``String``, and ``Double``).

It would be much more useful, and considerably more flexible,
to write a single function that could swap two values of *any* type.
This is the kind of problem that generic code can solve.
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

.. _Generics_GenericsInSwift:

Generics In Swift
~~~~~~~~~~~~~~~~~

You've actually been using generics throughout this Language Guide,
even if you didn't realize it.
For example, Swift's ``Array`` and ``Dictionary`` types
are both generic collections.
You can create an array that holds ``Int`` values,
or an array that holds ``String`` values,
or indeed an array for any other type that can be created in Swift.
Similarly, you can create a dictionary to store values of any specified type,
and there are no limitations on what that type can be.

Swift enables you to write generic functions
(to solve the ``swapTwoInts`` problem)
and to write generic types (such as ``Array`` and ``Dictionary``)
to make your own code flexible and reusable.

.. _Generics_GenericFunctions:

Generic Functions
-----------------

:newTerm:`Generic functions` are functions that can work with any type.
Here's a generic version of the ``swapTwoInts`` function from above,
called ``swapTwoValues``:

.. testcode:: genericFunctions

   -> func swapTwoValues<T>(inout a: T, inout b: T) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

The body of the ``swapTwoValues`` function
is identical to the body of the ``swapTwoInts`` function.
However, the first line of ``swapTwoValues``
is slightly different from ``swapTwoInts``.
Here's how the first lines compare:

.. testcode:: genericFunctionsComparison

   -> func swapTwoInts(inout a: Int, inout b: Int)
   >> {
   >>    let temporaryA = a
   >>    a = b
   >>    b = temporaryA
   >> }
   -> func swapTwoValues<T>(inout a: T, inout b: T)
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
will be determined each time the ``swapTwoValues`` function is called.

The other difference is that the generic function's name (``swapTwoValues``)
is followed by the placeholder type name (``T``) inside angle brackets (``<T>``).
The brackets tell Swift that ``T`` is a placeholder type name
within the ``swapTwoValues`` function definition.
This stops Swift from looking for an actual type called ``T``,
and says “treat ``T`` as a placeholder instead”.

The ``swapTwoValues`` function can now be called in the same way as ``swapTwoInts``,
except that it can be passed two values of *any* type,
as long as both of those values are of the same type as each other.
Each time ``swapTwoValues`` is called,
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

   The ``swapTwoValues`` function defined above is inspired by
   a generic function called ``swap``, which is part of the Swift standard library,
   and is automatically made available for you to use in your apps when working with Swift.
   If you need the behavior of the ``swapTwoValues`` function in your own code,
   you can use Swift's existing ``swap`` function rather than providing your own implementation.

.. _Generics_TypeParameters:

Type Parameters
---------------

In the ``swapTwoValues`` example above,
the placeholder type ``T`` is an example of a :newTerm:`type parameter`.
Type parameters specify and name a placeholder type,
and are written immediately after the function's name,
between a pair of matching angle brackets (such as ``<T>``).

Once specified,
a type parameter can be used as the type of a function's parameters
(such as the ``a`` and ``b`` parameters of the ``swapTwoValues`` function);
or as the function's return type;
or as a type annotation within the body of the function.
In each case, the placeholder type represented by the type parameter
is replaced with an *actual* type whenever the function is called.
(In the ``swapTwoValues`` example above,
``T`` was replaced with ``Int`` the first time the function was called,
and was replaced with ``String`` the second time it was called.)

You can provide more than one type parameter if needed,
by writing multiple type parameters within the angle brackets,
separated by commas.

.. _Generics_NamingTypeParameters:

Naming Type Parameters
~~~~~~~~~~~~~~~~~~~~~~

In simple cases where a generic function or generic type
needs to refer to a single placeholder type
(such as the ``swapTwoValues`` generic function above,
or a generic collection that stores a single type, such as ``Array``),
it is traditional to use the single-character name ``T`` for the type parameter.
However, you are can use any valid identifier as the type parameter name.

If you are defining more complex generic functions,
or generic types with multiple parameters,
it can be useful to provide more descriptive type parameter names.
For example, Swift's ``Dictionary`` type has two type parameters –
one for its keys and one for its values.
If you were writing ``Dictionary`` yourself,
you might name these two type parameters ``KeyType`` and ``ValueType``
to remind you of their purpose as you use them within your generic code.

.. note::

   Always give type parameters ``UpperCamelCase`` names
   (such as ``T`` and ``KeyType``)
   to indicate that they are a placeholder for a *type*, not a value.

.. _Generics_GenericTypes:

Generic Types
-------------

In addition to generic functions,
Swift also enables you to define your own :newTerm:`generic types`.
These are custom classes, structures, enumerations, and protocols
that can work with *any* type, in a similar way to ``Array`` and ``Dictionary``.

Here's an example of a generic type called ``Stack``.
This type represents an ordered “stack” of values, with two operations:

* :newTerm:`Pushing` a new value on to the top of the stack
* :newTerm:`Popping` a value off the top of the stack

This illustration shows the push / pop behavior for a stack:

.. image:: ../images/stackPushPop.png
   :align: center

1. There are currently three values on the stack.
2. A fourth value is “pushed” on to the top of the stack
3. The stack now holds four values, with the most recent one at the top.
4. The top item in the stack is removed, or “popped”.
5. After popping a value, the stack once again holds three values.

The example below shows an implementation of a generic ``Stack`` structure in Swift code.
This structure uses an ``Array`` property called ``items`` to store the values in the stack.
``Stack`` provides two methods, ``push`` and ``pop``,
to push and pop values on and off the stack.
These methods are marked as ``mutating``,
because they need to modify (or *mutate*) the structure's ``items`` array.
(Don't worry too much about the details of this implementation for now –
a full explanation of how ``Stack`` is defined is given below.)

.. testcode:: genericStack

   -> struct Stack<T> {
         var items = T[]()
         mutating func push(item: T) {
            items.append(item)
         }
         mutating func pop() -> T {
            return items.popLast()
         }
      }

.. QUESTION: should Stack's pop() method include bounds checking?
   I haven't yet introduced assert()…

.. TODO: describe the fact that Array has a popLast() method

The ``Stack`` structure can be used to create a stack of any type,
such as a stack of ``String`` values:

.. testcode:: genericStack

   -> var stackOfStrings = Stack<String>()
   << // stackOfStrings : Stack<String> = Stack<String>([])
   -> stackOfStrings.push("uno")
   -> stackOfStrings.push("dos")
   -> stackOfStrings.push("tres")
   -> stackOfStrings.push("cuatro")
   /> the stack now contains \(stackOfStrings.items.count) strings
   </ the stack now contains 4 strings

Here's how ``stackOfStrings`` looks after pushing these four values on to the stack:

.. image:: ../images/stackPushedFourStrings.png
   :align: center

Popping a value from the stack returns and removes the top value, ``"cuatro"``:

.. testcode:: genericStack

   -> let fromTheTop = stackOfStrings.pop()
   << // fromTheTop : String = "cuatro"
   /> fromTheTop is equal to \"\(fromTheTop)\", and the stack now contains \(stackOfStrings.items.count) strings
   </ fromTheTop is equal to "cuatro", and the stack now contains 3 strings

Here's how the stack looks after popping its top value:

.. image:: ../images/stackPoppedOneString.png
   :align: center

Because it is a generic type,
``Stack`` can be used to create a stack of *any* valid type in Swift,
in a similar manner to ``Array`` and ``Dictionary``.

.. _Generics_GenericTypeDefinitionSyntax:

Generic Type Definition Syntax
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Generic types use type parameters to provide a name for the placeholder types they work with,
in the same way as generic functions described above.

Here's how a type parameter is used within the definition of ``Stack``:

.. testcode:: genericStackDefinition

   -> struct Stack<T> {
         var items = T[]()
         mutating func push(item: T) {
            items.append(item)
         }
         mutating func pop() -> T {
            return items.popLast()
         }
      }

As with ``swapTwoValues<T>``,
the ``Stack`` definition includes a single type parameter called ``T``,
written within a pair of angle brackets (``<T>``).
This type parameter is written immediately after the structure name, ``Stack``.

``T`` defines a placeholder name for “some type ``T``” to be provided later on.
This future type can be referred to as “``T``” anywhere within the structure's definition.
In this case, ``T`` is used as a placeholder in three places:

1. to create a property called ``items``,
   which is initialized with an empty array of values of type ``T``
2. to specify that the ``push`` method has a single parameter called ``item``,
   which must be of type ``T``
3. to specify that the value returned by the ``pop`` method
   will be a value of type ``T``

This use of a placeholder type enables ``Stack`` to define the generic behavior
of a stack of values, regardless of what type those values happen to be for a particular stack.

You create instances of ``Stack`` in a similar way to ``Array`` and ``Dictionary``,
by writing the actual type to be used for this specific stack within angle brackets
after the variable name:

.. testcode:: genericStackDefinition

   -> var stackOfInts = Stack<Int>()
   << // stackOfInts : Stack<Int> = Stack<Int>([])
   -> stackOfInts.push(42)

.. _Generics_TypeConstraints:

Type Constraints
----------------

The ``swapTwoValues`` function and the ``Stack`` type
are both able to work with any type.
However, it can sometimes be useful to enforce
certain :newTerm:`type constraints` on the types that can be used with
generic functions and generic types.

For example,
Swift's ``Dictionary`` type places a limitation on
the types that can be used as *keys* for a dictionary.
As described in :ref:`CollectionTypes_Dictionaries`,
the type of a dictionary's keys must be :newTerm:`hashable` –
that is, it must provide a way to make itself uniquely representable.
``Dictionary`` needs its keys to be hashable so that it can
check whether it already contains a value for a particular key.
Without this requirement, ``Dictionary`` could not tell
whether it should insert or replace a value for a particular key,
nor would it be able to find a value for a given key that is already in the dictionary.

``Dictionary`` enforces this requirement by saying that
its key type must conform to the ``Hashable`` protocol,
which is a special protocol defined in the Swift standard library.
All of Swift's basic types (such as ``String``, ``Int``, ``Double``, and ``Bool``)
are hashable by default
You can make your own custom types conform to the ``Hashable`` protocol
so that they too can be dictionary keys,
as described in :doc:`Protocols`.

You can define your own constraints when creating custom generic types,
and these constraints provide much of the power of generic programming.
Abstract concepts like ``Hashable``
give a way to talk about types in terms of their conceptual characteristics,
rather than their explicit type.

Here's a non-generic function called ``findInt``,
which is given an ``Int`` value to find
and an array of ``Int`` values within which to find it.
The ``findInt`` function returns an optional ``Int`` value,
which will be the index of the first matching value in the array if it is found,
or ``nil`` if the value cannot be found:

.. testcode:: typeConstraints

   -> func findInt(array: Int[], valueToFind: Int) -> Int? {
         var index = 0
         for integer in array {
            if integer == valueToFind {
               return index
            }
            ++index
         }
         return nil
      }

The ``findInt`` function can be used to find an integer value in an array of integers:

.. testcode:: typeConstraints

   -> let integers = [-6, 0, -27, 3, 2001]
   << // integers : Array<Int> = [-6, 0, -27, 3, 2001]
   -> if let foundIndex = findInt(integers, -27) {
         println("The index of -27 is \(foundIndex)")
      }
   <- The index of -27 is 2

The principle of finding a value in an array isn't useful only for integers, however.
You can write the same functionality as a generic function called ``findValue``,
by replacing any mention of integers with values of some type ``T`` instead.
Here's how a generic version of ``findInt``, called ``findValue``, might be written:

.. testcode:: typeConstraints

   -> func findValue<T>(array: T[], valueToFind: T) -> Int? {
         var index = 0
         for value in array {
            if value == valueToFind {
               return index
            }
            ++index
         }
         return nil
      }
   !! <REPL Input>:4:18: error: could not find an overload for '==' that accepts the supplied arguments
   !!              if value == valueToFind {
   !!                 ~~~~~~^~~~~~~~~~~~~~

Note that the return type of this function is still ``Int?``,
because the function returns an optional index number,
not an optional value from the array.

However, this function will not compile as written above.
The problem lies with the equality check, “``if value == valueToFind``”.
Not every type in Swift can be compared with the equality operator (``==``).
If you create your own class or structure to represent a complex data model, for example,
then the meaning of “equality” for that class or structure
is not something that Swift can guess for you.
Because of this, it is not possible to guarantee that this code will work
for *every* possible type ``T``,
and an appropriate error is reported when you try to compile the code.

All is not lost, however.
The Swift standard library defines a protocol called ``Equatable``,
which requires any conforming type to implement the equality operator
to compare any two values of that type.
All of Swift's standard types automatically support the ``Equatable`` protocol,
and you can make your own types conform to ``Equatable`` too,
as described in :ref:`AdvancedOperators_ProtocolOperatorRequirements`.

.. TODO: will the way to do this *actually* be described there?

Any type that is ``Equatable`` can be used safely with the ``findValue`` function,
because it is guaranteed to support the equality operator.
To express this fact, you can write a type constraint of ``Equatable``
as part of the type parameter's definition when you define the function:

.. testcode:: typeConstraintsEquatable

   -> func findValue<T: Equatable>(array: T[], valueToFind: T) -> Int? {
         var index = 0
         for value in array {
            if value == valueToFind {
               return index
            }
            ++index
         }
         return nil
      }

The type parameter here has been written as ``<T: Equatable>``,
which means “any type ``T`` that is ``Equatable``.”

The ``findValue`` function now compiles successfully,
and can be used with any type that is ``Equatable``, such as ``Double`` or ``String``:

.. testcode:: typeConstraintsEquatable

   -> let doubleIndex = findValue([3.14159, 0.1, 0.25], 9.3)
   << // doubleIndex : Int? = <unprintable value>
   /> doubleIndex is an optional Int with no value, because 9.3 is not in the array
   </ doubleIndex is an optional Int with no value, because 9.3 is not in the array
   -> let stringIndex = findValue(["Mike", "Malcolm", "Andrea"], "Andrea")
   << // stringIndex : Int? = <unprintable value>
   /> stringIndex is an optional Int containing a value of \(stringIndex!)
   </ stringIndex is an optional Int containing a value of 2

.. providing different type parameters on individual methods within a generic type
.. likewise providing type parameters for initializers
.. requirements can be inheritance clauses as well as protocol conformance clauses

.. _Generics_AssociatedTypes:

Associated Types
----------------

.. write-me::

.. _Generics_Subscripts:

Subscripts
----------

.. write-me::

.. Protocols can require conforming types to provide specific subscripts
.. These typically return a value of type T, which is why I've moved this here

.. _Generics_GenericEnumerations:

Generic Enumerations
--------------------

.. write-me::

.. Describe how Optional<T> actually works

.. where do I mention SomeType.self, SomeType.Type and all that malarkey?
   I'm going to have to talk about passing around types at some point,
   but that tends to blow people's brains. Might it go in here?

.. generics can be extended, and the syntax is:
   extension Array {
      // T is available for you to use in this context
      func doStuff() -> T { ... }
   }