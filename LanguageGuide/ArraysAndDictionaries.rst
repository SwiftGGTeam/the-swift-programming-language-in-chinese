Arrays and Dictionaries
=======================

Swift provides two special types for working with collections of values:

* :newTerm:`Arrays` (for ordered lists of values)
* :newTerm:`Dictionaries` (for collections of values that can be referenced
  and looked up via an unique identifier or “key”)

.. _ArraysAndDictionaries_Arrays:

Arrays
------

An :newTerm:`array` stores multiple values of the same type in an ordered list.
Swift's arrays are :newTerm:`mutable`,
which means that they can be changed (or :newTerm:`mutated`) after they are created.
This means that you can add new things to the list,
and remove existing things from the list,
at any point after it is first created.

Swift's arrays are specific about the kinds of values that they can store.
This is different from Objective-C's ``NSArray`` and ``NSMutableArray`` classes.
In Swift, you explictly declare the type of values that you want a particular array to store.
If you create an array of ``Int`` values, for example,
then you can't insert anything other than ``Int`` values into that array.
This means that Swift arrays are type-safe,
and are always clear about what they may contain.

Swift's array type is written as “``Array<SomeType>``”,
where ``SomeType`` is the kind of thing that the array will be allowed to store.
This might be ``String``, or ``Int``, or indeed any other valid type in Swift
(including types that you define yourself, as described in :doc:`CustomTypes`,
and also protocol types, as described in :doc:`Protocols`).

Here's an example, which creates a shopping list to store ``String`` values:

.. testcode:: arrays

    --> var shoppingList: Array<String> = ["Eggs", "Milk"]
    <<< // shoppingList : Array<String> = ["Eggs", "Milk"]
    /// shoppingList has been initialized with two initial items

``shoppingList`` has been declared as “an ``Array`` of type ``String``”,
written as ``Array<String>``.
Because it is “of type ``String``”,
this particular array is *only* allowed to store ``String`` values.

Here, the ``shoppingList`` array has been initialized with two ``String`` values
(``"Eggs"`` and ``"Milk"``).
These two values are written as part of an :newTerm:`array literal`,
which is a shorthand way to write one or more values as an ``Array`` collection.
Array literals are a list of values, separated by commas,
surrounded by a pair of square brackets.

In this case, the array literal contains two ``String`` values, and nothing else.
This matches the type of the ``shoppingList`` variable's declaration –
an ``Array`` that only contains ``String`` values –
and so the assignment of the array literal is permitted
as a way to initialize ``shoppingList`` with two initial items.

.. TODO: the type of the array will eventually be inferrable from the array literal.
   This sort of "works" at the moment, but after doing so, the type is inferred as String[],
   not Array<String>, which it seems is actually a different thing.
   At least, you can't call any of the methods below on it.

You can find out the number of items in an ``Array``
by checking its ``count`` property:

.. testcode:: arrays

    --> println("The shopping list contains \(shoppingList.count) items.")
    <-- The shopping list contains 2 items.

New items can be added to the end of the ``Array`` by using its ``append()`` method:

.. testcode:: arrays

    --> shoppingList.append("Flour")
    /// shoppingList now contains 3 items, and someone is making pancakes

You can access the values in an array by using :newTerm:`subscript syntax`,
and passing in the index of the value you want to retrieve:

.. testcode:: arrays

    --> var firstItem = shoppingList[0]
    <<< // firstItem : String = "Eggs"
    /-> firstItem is equal to \"\(firstItem)\"
    <-/ firstItem is equal to "Eggs"

Subscript syntax involves writing an index value within square brackets
(such as ``[0]`` in this example),
immediately after the name of the array.
Note that the first item in the array has an index of ``0``, not ``1``.
Arrays in Swift are always zero-indexed.

An item can be inserted into the array at a specified index by using the ``insert()`` method:

.. testcode:: arrays

    --> shoppingList.insert("Maple Syrup", 0)
    /// shoppingList now contains 4 items
    /-> \"\(shoppingList[0])\" is now the first item in the list
    <-/ "Maple Syrup" is now the first item in the list

This call to the ``insert()`` method inserts a new value of ``"Maple Syrup"``
at an index of ``0``, i.e. at the very beginning of the shopping list.

Similarly, an item can be removed from the array using the ``removeAt()`` method:

.. testcode:: arrays

    --> shoppingList.removeAt(0)
    /// the item that was at index 0 has just been removed
    /-> shoppingList now contains \(shoppingList.count) items, and no Maple Syrup
    <-/ shoppingList now contains 3 items, and no Maple Syrup

Any gaps in the array are closed when an item is removed,
and so the value at index ``0`` is once again equal to ``"Eggs"``:

.. testcode:: arrays

    --> firstItem = shoppingList[0]
    /-> firstItem is once again equal to \"\(firstItem)\"
    <-/ firstItem is once again equal to "Eggs"

.. TODO: there are quite a few more Array methods, such as sort() and popLast() –
   how many of them should be listed here?

If you want to create an empty ``Array`` of a certain type,
without setting any initial values,
you can do so using initializer syntax:

.. testcode:: arrays

    --> var ints = Array<Int>()
    <<< // ints : Array<Int> = []
    --> println("ints is an Array<Int> containing \(ints.count) items.")
    <-- ints is an Array<Int> containing 0 items.

Note that the type of ``ints`` has been inferred to be ``Array<Int>``,
because it was set to the output of an ``Array<Int>`` initializer.

.. note::

    Behind the scenes,
    Swift's ``Array`` type is implemented as a :newTerm:`generic collection`, ``Array<T>``.
    Generics such as ``Array<T>`` are described in detail in :doc:`Generics`.

.. _ArraysAndDictionaries_Dictionaries:

Dictionaries
------------

.. write-me::

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#arrays
