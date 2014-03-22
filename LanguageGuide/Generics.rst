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
including types that you yourself have not defined.

You've actually been using generics throughout this book, even if you didn't realise it.
Swifts ``Array`` and ``Dictionary`` types are both :newTerm:`generic collections`.
You can create an array to hold ``Int`` values, or ``String`` values,
or indeed any other type that can be created in Swift.
Similarly, you can create a dictionary to store values of any specified type,
and there are no limitations on what that type can be.

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
It then adds two :doc:`Closures` to the array.
Because the ``someFunctions`` array is known to store things that are of type ``Int -> Int``,
Swift infers that the two closures added to the array must have a single ``Int`` parameter,
and return an ``Int`` value.
This means that the two closures can be written very concisely,
and do not need to specify their parameter or return value types.
Instead, they can refer to their single parameter as ``$0``,
and returning a value without needing to write the ``return`` keyword.

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

Generic Functions
-----------------

Before describing how to create custom generic types,
it is useful to understand how functions can be made to work with values of any type.

Here's an example of a :newTerm:`generic function`,
based on the ``swap()`` function from Swift's Standard Library:

.. testcode:: swapOne

   -> func swapValues<T>(inout a: T, inout b: T) {
         (a, b) = (b, a)
      }

This function, called ``swapValues()``, takes two values ``a`` and ``b``,
and swaps them. For example:

.. testcode:: swapOne

   -> var firstInt = 1
   << // firstInt : Int = 1
   -> var secondInt = 100
   << // secondInt : Int = 100
   -> swapValues(&firstInt, &secondInt)
   /> firstInt is now \(firstInt), and secondInt is now \(secondInt)
   </ firstInt is now 100, and secondInt is now 1

This function doesn't just work with ``Int`` values, however –
it can be used with any other type, such as a pair of ``String`` values:

.. testcode:: swapOne

   -> var firstString = "hello"
   << // firstString : String = "hello"
   -> var secondString = "world"
   << // secondString : String = "world"
   -> swapValues(&firstString, &secondString)
   /> firstString is now \"\(firstString)\", and secondString is now \"\(secondString)\"
   </ firstString is now "world", and secondString is now "hello"

The ``swapValues()`` function doesn't care what kind of values it works with,
as long as they are of the same type as each other.
(It wouldn't make sense to swap an ``Int`` and a ``String``,
because you can't store a ``String`` value in an ``Int`` variable, and vice versa.)

To achieve this, the ``swapValues()`` function needs to talk *generically*
about the types it can work with.
Here's its definition again:

.. testcode:: swapTwo

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
the ``swapValues()`` function can be confident that whatever type ``T`` represents,
both ``a`` and ``b`` are of that type.
This enables it to provide its swapping functionality for any given type.

Generic Parameters
~~~~~~~~~~~~~~~~~~

In the example above, ``T`` is said to be a :newTerm:`generic parameter`.
Generic parameters are a way to specify and name a placeholder type,
and are written immediately after the function's name,
between a less-than symbol and a greater-than symbol (such as ``<T>``).

Once specified,
a generic parameter can be used as the type of a function's parameters
(as in the ``swapValues()`` function),
or as its return type,
or as a type annotation within the body of the function.
In each case, the placeholder type represented by the generic parameter
is replaced with an actual type whenever the function is called.
(In the ``swapValues()`` example above,
``T`` was replaced with ``Int`` the first time the function was called,
and was replaced with ``String`` the second time it was called.)

Note that you don't explicitly specify the type to be used when you call the function.
You don't, for example, write ``swapTwo<Int>(x, y)``.
The type that ``T`` represents is inferred for you,
and indeed you are not allowed to specify a type yourself.

Multiple generic parameters can be provided, separated by commas:

::

   func someFunction<T, U, V>(someParameter: T, anotherParameter: U) -> V {
      // function body goes here
   }

This function has a first parameter of type ``T``;
a second parameter of type ``U``;
and returns a value of type ``V``.
The actual types to use for ``T``, ``U`` and ``V``
will be inferred each time that the function is called.

Naming of Generic Parameters
____________________________

The choice of ``T`` as a generic parameter name is slightly arbitrary.
You could just as easily name the parameter ``SomeType``, or ``TypeThatIsNotYetKnown``,
but it is generally briefer and clearer to use a short, single-letter name
as the name for a placeholder parameter.
This also makes it less likely that the name you choose will clash with an actual type name.

Traditionally, the first type to be specified as a generic parameter is given the name ``T``,
followed by ``U``, then ``V``, and so on.
The choice of name to use is entirely up to yourself, however.

.. note::

   Generic parameters should always have capitalized names (such as ``T``)
   to indicate that they represent a type, not a value.

Associated Types
----------------

.. write-me::

Using “Self” in a Protocol
--------------------------

.. write-me::

.. Self as the dynamic type of the current type that is implementing the protocols

Operators
---------

.. write-me::

.. Protocols can require the implementation of operators (though assignment operators are broken)
.. Likewise for requiring custom operators
.. However, Doug thought that this might be better covered by Generics,
   where you know that two things are definitely of the same type.
   Perhaps mention it here, but don't actually show an example?

Subscripts
----------

.. write-me::

.. Protocols can require conforming types to provide specific subscripts
.. These typically return a value of type T, which is why I've moved this here

Collections
-----------

.. Describe how to create a Stack<T> as an example of custom collections

Generic Enumerations
--------------------

.. Describe how Optional<T> actually works

.. where do I mention SomeType.self, SomeType.Type and all that malarkey?
   I'm going to have to talk about passing around types at some point,
   but that tends to blow people's brains. Might it go in here?

.. refnote:: References

   * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#generics
   * https://[Internal Staging Server]/docs/Generics%20Syntax%20Tradeoffs.html