Arrays and Dictionaries
=======================

Swift provides two special types for working with collections of values:

* :newTerm:`Arrays` (for ordered lists of values)
* :newTerm:`Dictionaries` (for collections of values that can be referenced
  and looked up via an unique identifier or “key”)

.. TODO: mention somewhere (either here or in Custom Types)
   that arrays and dictionaries are value types rather than reference types,
   and demonstrate what that means.
.. TODO: note also that they need to be created as variables in order to be mutable.
.. TODO: should I mention about bridging to NSArray / NSDictionary?
   Dictionary is not yet bridged to NSDictionary –
   the work for this is in rdar://16014066,
   which is currently scheduled (but I'd say unlikely) for the March milestone

.. _ArraysAndDictionaries_Arrays:

Arrays
------

An :newTerm:`array` stores multiple values of the same type in an ordered list.
Swift's arrays are :newTerm:`mutable`,
which means that they can be changed (or :newTerm:`mutated`) after they are created.
This means that you can add new things to the list,
and remove existing things from the list,
at any point after it is first created.

Swift's arrays are specific about the kinds of values they can store.
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

.. note::

    It will eventually be possible to infer the type of an array
    purely from the array literal.
    However, this does not yet work as intended.

.. TODO: the type of an array will eventually be inferrable from an array literal.
   This sort of "works" at the moment, but after doing so, the type is inferred as String[],
   not Array<String>, which it seems is actually a different thing.
   At least, you can't call any of the methods below on it.
   Remove the note above if this is still not working as intended when this book is published.

You can find out the number of items in an ``Array``
by checking its read-only ``count`` property:

.. testcode:: arrays

    --> println("The shopping list contains \(shoppingList.count) items.")
    <-- The shopping list contains 2 items.

New items can be added to the end of the array by calling its ``append()`` method:

.. testcode:: arrays

    --> shoppingList.append("Flour")
    /-> shoppingList now contains \(shoppingList.count) items, and someone is making pancakes
    <-/ shoppingList now contains 3 items, and someone is making pancakes

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

.. TODO: func find<T : Equatable>(array: T[], value: T) -> Int?
   This is defined in Algorithm.swift,
   and gives a way to find the index of a value in an array if it exists.
.. TODO: mutating func sort(isOrderedBefore: (T, T) -> Bool)
   This is defined in Array.swift.
.. TODO: talk about what it means to say that Array x == Array y

.. _ArraysAndDictionaries_Dictionaries:

Dictionaries
------------

A :newTerm:`dictionary` is a container that stores multiple values of the same type.
Each value is associated with an unique :newTerm:`key`,
which acts as an identifier for that value within the dictionary.

A dictionary allows you to set a value for a particular key.
If the dictionary already has a value for that key,
the old value is removed, and the new value is associated with that key instead.
Otherwise, the new value and key are added to the dictionary.

Like arrays, Swift's dictionaries are always :newTerm:`mutable`,
which means that you can add new entries to the dictionary,
and remove existing entries from the dictionary,
at any point after it is first created.

As with arrays, Swift's dictionaries are specific about the kinds of values they can store.
This is different from Objective-C's ``NSDictionary`` and ``NSMutableDictionary`` classes.
In Swift, you explictly declare the type of values that you want a dictionary to store,
*and* the type of its keys.

Swift's dictionary type is written as ``Dictionary<KeyType, ValueType>``.
where ``KeyType`` is the kind of values that are allowed to be keys,
and ``ValueType`` is the kind of values that the dictionary is allowed to store for those keys.

The only restriction is that ``KeyType`` must be :newTerm:`hashable` –
that is, it must provide a way to make itself uniquely representable.
All of Swift's basic types (such as ``String``, ``Int``, ``Double``, and ``Bool``)
are hashable by default, and so all of these types can be used as the keys of a dictionary.

.. note::

    You can enable your own custom types to be used as dictionary keys
    by making them conform to the ``Hashable`` protocol.
    This process is described in :doc:`Protocols`.

.. TODO: make sure that this process actually is described in the Protocols chapter,
   and remove this link if not.
.. QUESTION: it's actually a bit more complex then described above.
   Any NSObject subclasses are automatically Hashable, but Swift-pure ones are not.
   I've reported this as rdar://16332447, because it seems inconsistent.
   Should we mention this here?

Here's an example, which creates a dictionary to store international airports
referenced by their three-letter prefix:

.. testcode:: dictionaries

    --> var airports: Dictionary<String, String> = ["TYO" : "Tokyo", "DUB" : "Dublin"]
    <<< // airports : Dictionary<String, String> = Dictionary<String, String>(1.33333, 2, <DictionaryBufferOwner<String, String> instance>)

The ``airports`` dictionary has been declared as
“a ``Dictionary`` of type ``String``, ``String``”,
which is written as ``Dictionary<String, String>``.
Because it is “of type ``String``, ``String``”,
all of its keys must be strings, and so must all of its values.

The ``airports`` array has been initialized with two key-value pairs.
The first pair has a key of ``"TYO"``, and a value of ``"Tokyo"``.
The second pair has a key of ``"DUB"``, and a value of ``"Dublin"``.
These two values are written as part of a :newTerm:`dictionary literal`,
which has a similar syntax to the array literal seen earlier.
Dictionary literals give a similar shorthand way to write
one or more key-value pairs as a literal ``Dictionary`` collection.
Each key-value pair is separated by a colon,
and the pairs are written as a list, separated by commas,
surrounded by a pair of square brackets.

This dictionary literal contains two ``String : String`` pairs.
This matches the type of the ``shoppingList`` variable's declaration –
a ``Dictionary`` with only ``String`` keys, and only ``String`` values –
and so the assignment of the dictionary literal is permitted
as a way to initialize the ``airports`` dictionary with two initial items.

Thanks to Swift's type inference,
you don't actually have to write the type of the dictionary
if you're initializing it with a dictionary literal.
The initialization of ``airports`` can be written in a shorter form instead:

.. testcode:: dictionariesInferred

    --> var airports = ["TYO" : "Tokyo", "DUB" : "Dublin"]
    <<< // airports : Dictionary<String, String> = Dictionary<String, String>(1.33333, 2, <DictionaryBufferOwner<String, String> instance>)

Because all of the keys in the literal are of the same type as each other,
and likewise all of the values are of the same kind as each other,
it is possible to infer that a ``Dictionary<String, String>`` is
the correct type to use for the ``airports`` variable.

Like an array, you can find out the number of items in a ``Dictionary``
by checking its read-only ``count`` property:

.. testcode:: dictionariesInferred

    --> println("The dictionary of airports contains \(airports.count) items.")
    <-- The dictionary of airports contains 2 items.

New items can be added to the dictionary by calling its ``add()`` method
and passing in a new key and value of the correct types:

.. testcode:: dictionariesInferred

    --> airports.add("LHR", "London Heathrow")
    <<< // r0 : Bool = false
    /-> airports now contains \(airports.count) items
    <-/ airports now contains 3 items

.. TODO: note that add() returns a Bool to indicate whether or not
   the action was an add or a replace.

Like an array, you can access the values in a dictionary by using subscript syntax.
However, for a dictionary, the value within the square brackets should be
a key of the appropriate type.
This must be a key that you know is already in the dictionary:

.. testcode:: dictionariesInferred

    --> let heathrow = airports["LHR"]
    <<< // heathrow : String = "London Heathrow"
    /-> heathrow is equal to \"\(heathrow)\"
    <-/ heathrow is equal to "London Heathrow"

.. TODO: talk about the fact that Swift will crash if the key isn't there,
   and describe how to find out if it's there before trying to access it.
.. TODO: file a Radar suggesting that array and dictionary subscripts
   should return optionals.

.. subscript(key: KeyType) -> ValueType { get set }
.. add(key: KeyType, v: ValueType) -> Bool
.. deleteKey(k: KeyType) -> Bool
.. find(k: KeyType) -> ValueType?
.. itemsAsArray() -> Element[]
.. == the same if same count and every element in lhs is also in rhs
.. needs to be Hashable to be a key (or does this go in Prorocols?)
.. using an enumeration as the keys of a dictionary (but we're too early in the book…)
.. dictionaries are implicitly unordered,
   and you shouldn't rely on the order being ordered or even remaining the same

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#arrays
