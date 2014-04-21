.. docnote:: Subjects to be covered in this section

   * Array
   * Dictionary
   * (any other generics from the Standard Library)
   * Typing of generics
   * Working with subscripts
   * Creating one's own generics

Generics
========

:newTerm:`Generics` are a way to write code that can work with any type at all,
subject to certain requirements that you choose to define.
This enables you to write reusable code that can work with *any* type,
including types that you have not defined yourself.

You've actually been using generics throughout this book, even if you didn't realise it.
Swift's ``Array`` and ``Dictionary`` types are both :newTerm:`generic collections`.
You can create an array to hold ``Int`` values, or ``String`` values,
or indeed any other type that can be created in Swift.
Similarly, you can create a dictionary to store values of any specified type,
and there are no limitations on what that type must be.

``Dictionary`` does, however, choose to place a limitation on
the types that can be used as *keys* for a dictionary.
As described in :ref:`CollectionTypes_Dictionaries`,
the type of a dictionary's keys must be :newTerm:`hashable` –
that is, it must provide a way to make itself uniquely representable.
``Dictionary`` needs its keys to be hashable so that it can
check if it already contains a value for a particular key.
Without this requirement, ``Dictionary`` would not be able to tell
whether it should insert or replace a value for a particular key,
nor would it be able to find a value for a given key that is already in the dictionary.

``Dictionary`` enforces this requirement by saying that
its key type must conform to the ``Hashable`` protocol,
which is a special protocol defined in Swift's Standard Library.
All of Swift's basic types (such as ``String``, ``Int``, ``Double``, and ``Bool``)
are hashable by default,
and you can make your own custom types conform to the ``Hashable`` protocol
so that they too can be dictionary keys
(as described in :doc:`Protocols`).

.. TODO: I still need to write that bit.

The important thing is that ``Array`` and ``Dictionary`` instances
always behave in exactly the same way,
regardless of the type that a particular ``Array`` or ``Dictionary`` instance stores,
and regardless of what type is being used as the ``Dictionary`` key.
The functionality that makes them array-like, and dictionary-like,
is generic, regardless of the specific types being used.

To give an idea of just how flexible generic code can be,
here's an ``Array`` that stores *functions* –
in this case, any function with a single ``Int`` parameter, that also returns an ``Int``.
Functions like this have a type of ``Int -> Int``,
and this type can be used as the type to be stored in an ``Array``:

.. testcode:: generics

   -> var someFunctions = Array<Int -> Int>()
   << // someFunctions : Array<Int -> Int> = []
   -> someFunctions.append({ $0 + 6 })
   -> someFunctions.append({ $0 * 3 })
   -> for function in someFunctions {
         println(function(5))
      }
   << 11
   << 15
   /> prints \"\(someFunctions[0](5))\" and \"\(someFunctions[1](5))\"
   </ prints "11" and "15"

This example creates a new ``Array`` to store functions of type ``Int -> Int``.
It then adds two closures to the array.
Because the ``someFunctions`` array is known to store things that are of type ``Int -> Int``,
Swift infers that the two closures added to the array must have a single ``Int`` parameter,
and return an ``Int`` value.
This means that the two closures can be written very concisely,
and do not need to specify their parameter or return value types.
Instead, they can refer to their single parameter as ``$0``,
and can return a value without needing to write the ``return`` keyword.

The array is then iterated with a ``for``-``in`` loop.
Each item in the array is a function,
and so it can be called just like a normal function
by placing a value in parentheses after the name that refers to it.
Here, each function is passed an ``Int`` value of ``5``.

Even though the things being stored in the array happen to be functions,
all of the array-like functionality remains the same,
such as appending new items onto the end of the array,
and iterating the array to retrieve each item in turn.
When you write your own generic code,
you will create your own generic types (like ``Array`` and ``Dictionary``),
and define your own protocols (like ``Hashable``),
to enable those generic types to define and enforce certain requirements
on the types they can work with.

.. _Generics_GenericFunctions:

Generic Functions
-----------------

Before describing how to create custom generic types,
it is useful to understand how functions can be made to work with values of any type.

Here's an example of a :newTerm:`generic function`,
based on the ``swap`` function from Swift's Standard Library:

.. testcode:: swapValues

   -> func swapValues<T>(inout a: T, inout b: T) {
         (a, b) = (b, a)
      }

(There's a lot going on in this function definition, but don't worry –
all will be explained below.)

This function, called ``swapValues``, takes two values ``a`` and ``b``,
and swaps them. For example:

.. testcode:: swapValues

   -> var firstInt = 1
   << // firstInt : Int = 1
   -> var secondInt = 100
   << // secondInt : Int = 100
   -> swapValues(&firstInt, &secondInt)
   /> firstInt is now \(firstInt), and secondInt is now \(secondInt)
   </ firstInt is now 100, and secondInt is now 1

This function doesn't just work with ``Int`` values, however –
it can be used with any other type, such as a pair of ``String`` values:

.. testcode:: swapValues

   -> var firstString = "hello"
   << // firstString : String = "hello"
   -> var secondString = "world"
   << // secondString : String = "world"
   -> swapValues(&firstString, &secondString)
   /> firstString is now \"\(firstString)\", and secondString is now \"\(secondString)\"
   </ firstString is now "world", and secondString is now "hello"

The ``swapValues`` function doesn't care what kind of values it works with,
as long as they are of the same type as each other.
(It wouldn't make sense to swap an ``Int`` and a ``String``,
because you can't store a ``String`` value in an ``Int`` variable, and vice versa.)

To achieve this, the ``swapValues`` function needs to talk *generically*
about the types it can work with.
Here's its definition again:

.. testcode:: swapValuesAgain

   -> func swapValues<T>(inout a: T, inout b: T) {
         (a, b) = (b, a)
      }

This can be read as:

“Define a function called ``swapValues``, which, for some type ``T``,
has an ``inout`` parameter called ``a`` that is of type ``T``,
and an ``inout`` parameter called ``b`` that is also of type ``T``.”

The “``T``” in this description is a placeholder for some type to be determined later.
This type can be different each time the function is called.
Nonetheless, from this definition,
the ``swapValues`` function can be confident that whatever type ``T`` represents,
both ``a`` and ``b`` are of that type.
This enables it to provide its swapping functionality for any given type.

.. _Generics_TypeParameters:

Type Parameters
~~~~~~~~~~~~~~~

In the example above, ``T`` is said to be a :newTerm:`type parameter`.
Type parameters are a way to specify and name a placeholder type,
and are written immediately after the function's name,
between a pair of matching angle brackets (such as ``<T>``).
Multiple type parameters can be provided between the angle brackets,
separated by commas.

Once specified,
a type parameter can be used as the type of a function's parameters
(such as the ``a`` and ``b`` parameters of the ``swapValues`` function);
as the function's return type;
or as a type annotation within the body of the function.
In each case, the placeholder type represented by the type parameter
is replaced with an *actual* type whenever the function is called.
(In the ``swapValues`` example above,
``T`` was replaced with ``Int`` the first time the function was called,
and was replaced with ``String`` the second time it was called.)

Note that you don't explicitly specify the type to be used when you call the function.
You don't, for example, write ``swapValues<Int>(x, y)``.
The type that ``T`` represents is inferred for you,
and indeed you are not allowed to specify a type yourself.

.. _Generics_NamingOfTypeParameters:

Naming of Type Parameters
_________________________

The choice of name for a type parameter is entirely up to you.
In simple cases where a generic function or generic type needs to refer to a single placeholder type
(such as the ``swapValues`` generic function above,
or a generic collection that stores a single type, such as ``Array``),
it is traditional to use the single-character name ``T`` for the type parameter.
However, you are free to use any valid identifier as the type parameter name.

If you are defining more complex generic functions or generic types with multiple parameters,
it can be useful to provide more descriptive type parameter names.
For example, Swift's ``Dictionary`` type has two type parameters –
one for its keys, and one for its values.
If you were writing ``Dictionary`` yourself,
you might name these two type parameters ``KeyType`` and ``ValueType``
to provide a reminder of their purpose as you use them within your generic code.

.. note::

   Type parameters should always have ``UpperCamelCase`` names
   (such as ``T`` and ``KeyType``)
   to indicate that they are a placeholder for a *type*, not a value.

.. _Generics_GenericTypes:

Generic Types
-------------

As mentioned above, Swift enables you to define your own :newTerm:`generic types`.
These are custom classes, structures, enumerations and protocols
that can work with *any* type, in a similar way to ``Array`` and ``Dictionary``.

Here's an example of a generic type called ``Stack``.
This represents an ordered “stack” of values, with two operations:

* :newTerm:`pushing` a new value on to the top of the stack
* :newTerm:`popping` a value off the top of the stack

This illustration shows the push / pop behavior for a stack:

.. image:: ../images/stackPushPop.png
   :align: center

1. There are currently three values on the stack.
2. A fourth value is “pushed” on to the top of the stack
3. The stack now holds four values, with the most recent one at the top.
4. The top item in the stack is removed, or “popped”.
5. After popping a value, the stack once again holds three values.

Here's an implementation of a generic ``Stack`` structure in Swift code.
This structure uses an ``Array`` property called ``items`` to store the values in the stack,
and provides two methods, ``push`` and ``pop``,
to push and pop values on and off the stack.
These methods are marked as ``mutating``,
because they need to modify (or *mutate*) the structure's ``items`` array.
(Don't worry too much about the details of this implementation for now –
a full explanation of how ``Stack`` is defined will be given below.)

.. testcode:: genericStack

   -> struct Stack<T> {
         var items = Array<T>()
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

Popping a value from the stack will return and remove the top value, ``"cuatro"``:

.. testcode:: genericStack

   -> let fromTheTop = stackOfStrings.pop()
   << // fromTheTop : String = "cuatro"
   /> fromTheTop is equal to \"\(fromTheTop)\", and the stack now contains \(stackOfStrings.items.count) strings
   </ fromTheTop is equal to "cuatro", and the stack now contains 3 strings

Here's how the stack looks after popping its top value:

.. image:: ../images/stackPoppedOneString.png
   :align: center

Because it is a generic type,
``Stack`` can now be used to create a stack of *any* valid type in Swift,
in a similar manner to ``Array`` and ``Dictionary``.

.. _Generics_GenericTypeDefinitionSyntax:

Generic Type Definition Syntax
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Generic types use type parameters to provide a name for the placeholder types they work with,
in the same way as generic functions described above.

Here's how a type parameter is used within the definition of ``Stack``:

.. testcode:: genericStackDefinition

   -> struct Stack<T> {
         var items = Array<T>()
         mutating func push(item: T) {
            items.append(item)
         }
         mutating func pop() -> T {
            return items.popLast()
         }
      }

As with ``swapValues<T>``,
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

Instances of ``Stack`` are created in a similar way to ``Array`` and ``Dictionary``,
by writing the actual type to be used for this specific stack within angle brackets
after the variable name:

.. testcode:: genericStackDefinition

   -> var stackOfInts = Stack<Int>()
   << // stackOfInts : Stack<Int> = Stack<Int>([])
   -> stackOfInts.push(42)

.. _Generics_TypeConstraints:

Type Constraints
----------------

The ``swapValues`` function, and the ``Stack`` type,
are both able to work with any type at all.
However, it can sometimes be useful to enforce
certain :newTerm:`type constraints` on the types that can be used with
generic functions and generic types.

As mentioned earlier,
Swift's ``Dictionary`` puts a constraint on the types that can be used as its keys.
Specifically, it requires that the keys must conform to the ``Hashable`` protocol.
You can define your own constraints when creating custom generic types,
and these constraints provide much of the power of generic programming.
Abstract concepts like ``Hashable``
give a way to talk about types in terms of their conceptual characteristics,
rather than their explicit type.

Here's a non-generic function called ``findInt``,
which is given an ``Int`` value to find,
and an array of ``Int`` values within which to find it.
The ``findInt`` function returns an optional ``Int`` value,
which will be the index of the first matching value in the array if it is found,
or ``nil`` if the value could not be found:

.. testcode:: typeConstraints

   -> func findInt(array: Array<Int>, valueToFind: Int) -> Int? {
         var index = 0
         for integer in array {
            if integer == valueToFind {
               return index
            }
            ++index
         }
         return nil
      }

The ``findInt`` function can now be used to find an integer value in an array of integers:

.. testcode:: typeConstraints

   -> let integers = [-6, 0, -27, 3, 2001]
   << // integers : Int[] = [-6, 0, -27, 3, 2001]
   -> if let foundIndex = findInt(integers, -27) {
         println("The index of -27 is \(foundIndex)")
      }
   <- The index of -27 is 2

The principle of finding a value in an array isn't just useful for integers, however.
We could try and write the same functionality as a generic function called ``findValue``,
by replacing anything that mentions integers to talk about values of some type ``T`` instead.
Here's how a generic version of ``findInt``, called ``findValue``, might be written:

.. testcode:: typeConstraints

   -> func findValue<T>(array: Array<T>, valueToFind: T) -> Int? {
         var index = 0
         for value in array {
            if value == valueToFind {
               return index
            }
            ++index
         }
         return nil
      }
   !! <REPL Input>:4:12: error: expression does not type-check
   !!              if value == valueToFind {
   !!                 ~~~~~~^~~~~~~~~~~~~~

(Note that the return type is still ``Int?``,
because the function returns an optional index number,
not an optional value from the array.)

However, this function will not compile as written above.
The problem lies with the equality check, “``if value == valueToFind``”.
Not every type in Swift can be compared with the equality operator (``==``).
If you create your own class or structure to represent a complex data model, for example,
then the meaning of “equality” for that class or structure
is not something that Swift can guess for you.
Because of this, it is not possible to guarantee that this code will work
for *every* possible type ``T``,
and an appropriate error is reported when you try and compile the code.

All is not lost, however.
Swift's Standard Library defines a protocol called ``Equatable``,
which requires any conforming type to implement the equality operator
to compare any two values of that type.
(All of Swift's standard types automatically support the ``Equatable`` protocol,
and you can make your own types conform to ``Equatable`` too,
as described in :ref:`AdvancedOperators_ProtocolOperatorRequirements`.)

.. TODO: will the way to do this *actually* be described there?

Any type that is ``Equatable`` can safely be used with the ``findValue`` function,
because it is guaranteed to support the equality operator.
To express this fact, you can write a type constraint of ``Equatable``
as part of the type parameter's definition when you define the function:

.. testcode:: typeConstraintsEquatable

   -> func findValue<T: Equatable>(array: Array<T>, valueToFind: T) -> Int? {
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
   -> let stringIndex = findValue(["Mike", "Malcolm", "Bunny"], "Bunny")
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

.. refnote:: References

   * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#generics
   * https://[Internal Staging Server]/docs/Generics%20Syntax%20Tradeoffs.html