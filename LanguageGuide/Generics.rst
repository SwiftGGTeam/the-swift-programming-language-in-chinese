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

When you write your own generic code,
you will create your own generic types (like ``Array`` and ``Dictionary``),
and define your own protocols (like ``Hashable``),
to enable those generic types to define and enforce certain requirements
on the types they can work with.

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
   </ prints "11" and "15"

This example creates a new ``Array`` to store functions of type ``Int -> Int``.
It then adds two :doc:`Closures` to the array.
Because ``someFunctions`` is known to store things that are of type ``Int -> Int``,
Swift infers that the two closures added to the array must have a single ``Int`` parameter,
and return an ``Int`` value.
This means that the two closures can be written very concisely,
referring to their single parameter as ``$0``,
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

.. start with a generic function, which has a type parameter as part of the function definition
   might this be an easy way in - show how the swap function can swap two T's?
   this helps you get your head around the concept.

.. typed enumerations - show Optional as an example
.. show how you can implement a generic comparable thing

Associated Types
----------------

.. write-me::

.. Associated typealiases
.. …with default types
.. perhaps this should be pushed forward to Generics,
   as that's where it really comes in useful?

Self with a capital S
---------------------

.. write-me::

.. Self as the dynamic type of the current type

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

.. Explain that Array<T> and Dictionary<T, U> are actually generics
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