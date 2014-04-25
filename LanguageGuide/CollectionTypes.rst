Collection Types
================

Swift provides two special types for working with collections of values:

* :newTerm:`Arrays`, for ordered lists of values
* :newTerm:`Dictionaries`, for collections of values that can be referenced
  and looked up via an unique identifier or “key”

.. TODO: should I mention about bridging to NSArray / NSDictionary?
   Dictionary is not yet bridged to NSDictionary –
   the work for this is in rdar://16014066,
   which is currently scheduled (but I'd say unlikely) for the March milestone
.. TODO: should I mention the Collection protocol, to which both of these conform?
.. TODO: we have a couple of ways to get the index of a Collection when iterating:
   for i in indices(collection) { collection[i] }
   for (index, object) in enumerate(collection) { //... }
   Should these be mentioned, and if so, should it be here or in Control Flow?

.. _CollectionTypes_Mutability:

Mutability of Collections
-------------------------

Arrays and dictionaries are ways to store multiple values together in a single collection.
If you create an array or a dictionary, and assign it to a variable,
the collection that is created will be :newTerm:`mutable`.
This means that you will be able to change (or :newTerm:`mutate`) the collection
after it has been created –
perhaps to add more items to the collection,
or to remove existing items from the ones it already contains.

However, if you assign an array or a dictionary to a constant,
the collection will be :newTerm:`immutable`.
It will not then be possible to change the contents of the collection.

It is good practice to create immutable collections
in all cases where the collection does not need to change.
This enables the Swift compiler to optimize the performance of the collection.

.. QUESTION: do we *want* to make this explicit point about choosing
   immutablility by default for collection types?

.. note::

   Swift's ``Array`` and ``Dictionary`` are
   *value types*, not *reference types*.
   This means that they are copied rather than referenced
   when they are assigned to a constant or variable, or passed to a function.
   This is different from the behavior of Cocoa's ``NSArray`` and ``NSDictionary`` classes.
   The difference between value types and reference types is covered in detail
   in :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

.. TODO: provide an example of what this means in practice
   (similar to the Resolution examples in Classes and Structures)

.. _CollectionTypes_Arrays:

Arrays
------

.. TODO: update this section to use (and eventually prefer) T[] syntax,
   based on [Contributor 7746]'s feedback

An :newTerm:`array` stores multiple values of the same type in an ordered list.
The same value is allowed to appear in an array multiple times at different positions.

Swift's arrays are specific about the kinds of values they can store.
This is different from Objective-C's ``NSArray`` and ``NSMutableArray`` classes,
which can store any kind of object,
and do not make any guarantees about the nature of the objects they return.
In Swift, you explictly declare the type of values that you want a particular array to store.
If you create an array of ``Int`` values, for example,
then you can't insert anything other than ``Int`` values into that array.
This means that Swift arrays are type-safe,
and are always clear about what they may contain.

Swift's array type is written as ``Array<SomeType>``,
where ``SomeType`` is the kind of thing that the array will be allowed to store.
This might be ``String``, or ``Int``, or indeed any other valid type in Swift
(including types that you define yourself, as described in :doc:`ClassesAndStructures`;
enumeration types, as described in :doc:`Enumerations`;
and also protocol types, as described in :doc:`Protocols`).

Here's an example, which creates an array called ``shoppingList`` to store ``String`` values:

.. testcode:: arrays

   -> var shoppingList: Array<String> = ["Eggs", "Milk"]
   << // shoppingList : Array<String> = ["Eggs", "Milk"]
   // shoppingList has been initialized with two initial items

The ``shoppingList`` variable is declared as
“an ``Array`` of ``String`` values”, written as ``Array<String>``.
Because this particular array has specified a value type of ``String``,
it is *only* allowed to store ``String`` values.

.. note::

   The ``shoppingList`` array has been declared as
   a variable (with the ``var`` introducer),
   and not a constant (with the ``let`` introducer),
   because we are about to add more items to the shopping list.

Here, the ``shoppingList`` array has been initialized with two ``String`` values
(``"Eggs"`` and ``"Milk"``).
These two values are written as part of an :newTerm:`array literal`,
which is a shorthand way to write one or more values as an ``Array`` collection.
Array literals are a list of values, separated by commas,
surrounded by a pair of square brackets.

In this case, the array literal contains two ``String`` values, and nothing else.
This matches the type of the ``shoppingList`` variable's declaration –
an ``Array`` that can only contain ``String`` values –
and so the assignment of the array literal is permitted
as a way to initialize ``shoppingList`` with two initial items.

Thanks to Swift's type inference,
you don't actually have to write the type of the array
if you're initializing it with an array literal containing values of the same type.
The initialization of ``shoppingList`` could have been be written in a shorter form instead:

.. testcode:: arraysInferred

   -> var shoppingList = ["Eggs", "Milk"]
   << // shoppingList : String[] = ["Eggs", "Milk"]

Because all of the values in the array literal are of the same type as each other,
it is possible to infer that ``Array<String>`` is
the correct type to use for the ``shoppingList`` variable.

You can find out the number of items in an ``Array``
by checking its read-only ``count`` property:

.. testcode:: arraysInferred

   -> println("The shopping list contains \(shoppingList.count) items.")
   <- The shopping list contains 2 items.

.. TODO: with the existing Array implementation, you can *set* count to a larger value,
   but Swift will assert if you try and access an item at one of the new indices.
   The same is not true for Dictionary,
   which does not allow you to assign a new value to count.
   I'll need to check what the story is for resizing arrays when NewArray lands.

New items can be added to the end of the array by calling its ``append`` method:

.. testcode:: arraysInferred

   -> shoppingList.append("Flour")
   /> shoppingList now contains \(shoppingList.count) items, and someone is making pancakes
   </ shoppingList now contains 3 items, and someone is making pancakes

You can retrieve a value from the array by using :newTerm:`subscript syntax`,
and passing in the index of the value you want to retrieve:

.. testcode:: arraysInferred

   -> var firstItem = shoppingList[0]
   << // firstItem : String = "Eggs"
   /> firstItem is equal to \"\(firstItem)\"
   </ firstItem is equal to "Eggs"

Subscript syntax involves writing an index value within square brackets
(such as ``[0]`` in this example),
immediately after the name of the array.
(Subscripts are described in more detail in :doc:`Subscripts`.)
Note that the first item in the array has an index of ``0``, not ``1``.
Arrays in Swift are always zero-indexed.

Subscript syntax can be used to change an existing value at a given index:

.. testcode:: arraysInferred

   -> shoppingList[0] = "Six eggs"
   /> the first item in the list is now equal to \"\(shoppingList[0])\"
   </ the first item in the list is now equal to "Six eggs"

.. QUESTION: should I note here that you can't set the firstItem variable
   and expect the value in the array to change,
   because String is a value type?

An item can be inserted into the array at a specified index by using the ``insert`` method:

.. testcode:: arraysInferred

   -> shoppingList.insert(0, "Maple Syrup")
   // shoppingList now contains 4 items
   /> \"\(shoppingList[0])\" is now the first item in the list
   </ "Maple Syrup" is now the first item in the list

This call to the ``insert`` method inserts a new value of ``"Maple Syrup"``
at an index of ``0``, i.e. at the very beginning of the shopping list.

Similarly, an item can be removed from the array using the ``removeAt`` method.
This method removes the item, and returns the removed item
(although you can ignore the returned value if you do not need it):

.. testcode:: arraysInferred

   -> let mapleSyrup = shoppingList.removeAt(0)
   << // mapleSyrup : String = "Maple Syrup"
   // the item that was at index 0 has just been removed
   /> shoppingList now contains \(shoppingList.count) items, and no Maple Syrup
   </ shoppingList now contains 3 items, and no Maple Syrup
   /> the mapleSyrup constant is now equal to the removed \"\(mapleSyrup)\" string
   </ the mapleSyrup constant is now equal to the removed "Maple Syrup" string

Any gaps in the array are closed when an item is removed,
and so the value at index ``0`` is once again equal to ``"Six eggs"``:

.. testcode:: arraysInferred

   -> firstItem = shoppingList[0]
   /> firstItem is now equal to \"\(firstItem)\"
   </ firstItem is now equal to "Six eggs"

.. TODO: there are quite a few more Array methods, such as sort() and popLast() –
   how many of them should be listed here?
   I'm holding off writing about any more of them until NewArray lands.

.. _CollectionTypes_CreatingAnEmptyArray:

Creating an Empty Array
~~~~~~~~~~~~~~~~~~~~~~~

If you want to create an empty ``Array`` of a certain type,
without setting any initial values,
you can do so using initializer syntax:

.. testcode:: arraysEmpty

   -> var someInts = Array<Int>()
   << // someInts : Array<Int> = []
   -> println("someInts is an Array<Int> containing \(someInts.count) items.")
   <- someInts is an Array<Int> containing 0 items.

Note that the type of the ``someInts`` variable has been inferred to be ``Array<Int>``,
because it was set to the output of an ``Array<Int>`` initializer.

As an alternative, if the context already provides type information –
such as a function argument, or an already-typed variable or constant –
an empty array can be created by using an empty array literal:

.. testcode:: arraysEmpty

   -> someInts.append(3)
   /> someInts now contains \(someInts.count) value of type Int
   </ someInts now contains 1 value of type Int
   -> someInts = []
   // someInts is now an empty array, but is still of type Int

``Array`` also provides an initializer for creating an array of a certain size
with all of its values set to a provided default value.
This initializer takes two arguments –
the number of elements to be added to the new array,
and a default value of the appropriate type:

.. testcode:: arraysEmpty

   -> var sixDoubles = Array<Double>(6, 0.0)
   << // sixDoubles : Array<Double> = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
   // sixDoubles is now [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

Thanks to type inference, you don't actually need to specify
the type to be stored in the ``Array`` when using this initializer,
because it can be inferred from the default value:

.. testcode:: arraysEmpty

   -> var threeBools = Array(3, false)
   << // threeBools : Array<Bool> = [false, false, false]
   /> threeBools is inferred to be an Array<Bool>, and equals [\(threeBools[0]), \(threeBools[1]), \(threeBools[2])]
   </ threeBools is inferred to be an Array<Bool>, and equals [false, false, false]

.. TODO: func find<T: Equatable>(array: T[], value: T) -> Int?
   This is defined in Algorithm.swift,
   and gives a way to find the index of a value in an array if it exists.
   I'm holding off writing about it until NewArray lands.
.. TODO: mutating func sort(isOrderedBefore: (T, T) -> Bool)
   This is defined in Array.swift.
   Likewise I'm holding off writing about it until NewArray lands.
.. TODO: talk about what it means to say that Array x == Array y
.. TODO: Mention that [] can be used as an empty array literal
   if the context gives enough type information.

.. _CollectionTypes_Dictionaries:

Dictionaries
------------

A :newTerm:`dictionary` is a container that stores multiple values of the same type.
Each value is associated with an unique :newTerm:`key`,
which acts as an identifier for that value within the dictionary.
Unlike an array, the items in a dictionary do not have a specified order.
Dictionaries are intended to be used when you need to look up values based on their identifier,
in much the same way that a real-world dictionary is used to look up
the definition for a particular word.

As with arrays, Swift's dictionaries are specific about the kinds of values they can store.
This is different from Objective-C's ``NSDictionary`` and ``NSMutableDictionary`` classes.
In Swift, you explictly declare the type of values that you want a dictionary to store.
You also declare an explicit type for the keys that are used to reference the stored values.

Swift's dictionary type is written as ``Dictionary<KeyType, ValueType>``,
where ``KeyType`` is the kind of things that are allowed to be keys,
and ``ValueType`` is the kind of values that the dictionary is allowed to store for those keys.

The only restriction is that ``KeyType`` must be :newTerm:`hashable` –
that is, it must provide a way to make itself uniquely representable.
All of Swift's basic types (such as ``String``, ``Int``, ``Double``, and ``Bool``)
are hashable by default, and all of these types can be used as the keys of a dictionary.
Enumeration member values without associated values (as described in :doc:`Enumerations`)
are also hashable by default.

.. QUESTION: is there anything else that should be on this list?

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

Here's an example, which creates a dictionary to store the names of international airports.
In this dictionary, the keys are three-letter International Air Transport Association codes,
and the values are airport names:

.. testcode:: dictionaries

   -> var airports: Dictionary<String, String> = ["TYO": "Tokyo", "DUB": "Dublin"]
   << // airports : Dictionary<String, String> = Dictionary<String, String>(1.33333333333333, 2, <DictionaryBufferOwner<String, String> instance>)

The ``airports`` dictionary has been declared as having a type of ``Dictionary<String, String>``,
which means “a ``Dictionary`` whose keys are of type ``String``,
and whose values are also of type ``String``”.

.. note::

   The ``airports`` dictionary has been declared as
   a variable (with the ``var`` introducer),
   and not a constant (with the ``let`` introducer),
   because we are about to add more airports to the dictionary.

The ``airports`` dictionary has been initialized with two :newTerm:`key-value pairs`.
A key-value pair is a combination of a key and a value.
The first pair has a key of ``"TYO"``, and a value of ``"Tokyo"``.
The second pair has a key of ``"DUB"``, and a value of ``"Dublin"``.
These two key-value pairs are written as part of a :newTerm:`dictionary literal`,
which has a similar syntax to the array literal seen earlier.
Dictionary literals give a similar shorthand way to write
one or more key-value pairs as a literal ``Dictionary`` collection.
Each key-value pair is separated by a colon,
and the pairs are written as a list, separated by commas,
surrounded by a pair of square brackets.

This dictionary literal contains two ``String: String`` pairs.
This matches the type of the ``airports`` variable declaration –
a ``Dictionary`` with only ``String`` keys, and only ``String`` values –
and so the assignment of the dictionary literal is permitted
as a way to initialize the ``airports`` dictionary with two initial items.

As with arrays,
you don't have to write the type of the dictionary
if you're initializing it with a dictionary literal whose keys and values have consistent types.
The initialization of ``airports`` could have been be written in a shorter form instead:

.. testcode:: dictionariesInferred

   -> var airports = ["TYO": "Tokyo", "DUB": "Dublin"]
   << // airports : Dictionary<String, String> = Dictionary<String, String>(1.33333333333333, 2, <DictionaryBufferOwner<String, String> instance>)

Because all of the keys in the literal are of the same type as each other,
and likewise all of the values are of the same type as each other,
it is possible to infer that ``Dictionary<String, String>`` is
the correct type to use for ``airports``.

Like an array, you can find out the number of items in a ``Dictionary``
by checking its read-only ``count`` property:

.. testcode:: dictionariesInferred

   -> println("The dictionary of airports contains \(airports.count) items.")
   <- The dictionary of airports contains 2 items.

.. TODO: see the note for Array about setting count to a new value.
   If it turns out that Array is indeed meant to have a settable count property,
   I should change the wording of the paragraph here to avoid making it sound as if
   Dictionary's count property is read-only, like array's.

New items can be added to the dictionary by calling its ``add`` method
and passing in a new key and value of the correct types:

.. testcode:: dictionariesInferred

   -> airports.add("LHR", "London Heathrow")
   << // r0 : Bool = false
   /> the airports dictionary now contains \(airports.count) items
   </ the airports dictionary now contains 3 items

.. TODO: note that add() returns a Bool to indicate whether or not
   the action was an add or a replace.

The ``add`` method actually returns a Boolean value,
to indicate whether or not a value already existed in the dictionary for that key.
(This return value is ignored in the example above).
The return value is ``true`` if the key was already being used,
and ``false`` if it was not in use:

.. testcode:: dictionariesInferred

   -> if airports.add("DUB", "Dublin International") {
         println("There was already a value for that key in the dictionary.")
      }
   <- There was already a value for that key in the dictionary.

.. note::

   If you try and use the ``add`` method to add a value for a key that already exists,
   the existing value for that key will not be replaced in the dictionary.

.. TODO: I've filed rdar://16336109 about the fact that
   this Bool value feels the wrong way round.
   An add() method should return true if it succeeds, not false.
   Also, the failure-on-existing behavior is different from how
   NSMutableArray's setObject:forKey: works.
   (NSMutableArray doesn't have an "add" method.)

.. QUESTION: There's a lot of talk about "methods" and "returning" here,
   when I haven't even introduced functions, let alone methods.
   Does this matter?

The values in a dictionary can be accessed by using subscript syntax,
in a similar way to an array.
However, for a dictionary, the value within the square brackets must be
a key of the appropriate type for that dictionary.

You can use subscript syntax to add a value into a dictionary,
as an alternative to the ``add`` method described above:

.. testcode:: dictionariesInferred

   -> airports["SFO"] = "San Francisco International"
   >> var sfo = "SFO" // a hack to get around rdar://16336177
   << // sfo : String = "SFO"
   /> \(airports[sfo]) has been added to the dictionary
   </ San Francisco International has been added to the dictionary

Subscript syntax can also be used to replace an existing value with a different one:

.. testcode:: dictionariesInferred

   >> let oldDub = airports["DUB"]
   << // oldDub : String = "Dublin"
   -> airports["DUB"] = "Dublin International"
   >> var dub = "DUB" // a hack to get around rdar://16336177
   << // dub : String = "DUB"
   /> The name for DUB has been changed from \"\(oldDub)\" to \"\(airports[dub])\"
   </ The name for DUB has been changed from "Dublin" to "Dublin International"

If you use subscript syntax to retrieve a value from the dictionary,
the key that you use must already be in the dictionary:

.. testcode:: dictionariesInferred

   -> let lhr = airports["LHR"]
   << // lhr : String = "London Heathrow"
   /> lhr is equal to \"\(lhr)\"
   </ lhr is equal to "London Heathrow"

.. TODO: talk about the fact that Swift will crash if the key isn't there,
   and describe how to find out if it's there before trying to access it.
.. NOTE: I've filed rdar://16335854 to suggest that Array<T> and Dictionary<KeyType, T>
   subscripts should return Optional<T>.

As an alternative, you can use the dictionary's ``find`` method
to try and find a value for a particular key.
The ``find`` method returns an *optional* value
which can be checked and unwrapped using optional binding:

.. testcode:: dictionariesInferred

   -> if let airportName = airports.find("DUB") {
         println("The name of the airport is \(airportName).")
      } else {
         println("That airport is not in the airports dictionary.")
      }
   <- The name of the airport is Dublin International.

(Optionals and optional binding are described in :ref:`BasicTypes_Optionals`.)

You can remove a key-value pair from the dictionary by using the ``deleteKey`` method:

.. testcode:: dictionariesInferred

   -> airports["APL"] = "Apple International" // this isn't the correct name for APL
   -> airports.deleteKey("APL")            // …so it has been deleted
   << // r1 : Bool = true
   >> if let deletedName = airports.find("APL") {
   >>    println("The key-value pair for APL has *not* been deleted, but it should have been!")
   >> } else {
   >>    println("The key-value pair for APL has now been deleted.")
   >> }
   </ The key-value pair for APL has now been deleted.

.. _CollectionTypes_CreatingAnEmptyDictionary:

Creating an Empty Dictionary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As with arrays, if you want to create an empty ``Dictionary`` of a certain type,
you can do so using initializer syntax:

.. testcode:: dictionariesEmpty

   -> var namesOfIntegers = Dictionary<Int, String>()
   << // namesOfIntegers : Dictionary<Int, String> = Dictionary<Int, String>(1.33333333333333, 0, <DictionaryBufferOwner<Int, String> instance>)
   // namesOfIntegers is an empty Dictionary<Int, String>

This example creates an empty dictionary of type ``Int``, ``String``
to store human-readable names of integer values.
Its keys are of type ``Int``, and its values are of type ``String``.

If the context already provides type information,
an empty dictionary can be created by using an empty dictionary literal,
which is written as ``[:]``, like this:

.. testcode:: dictionariesEmpty

   -> namesOfIntegers[16] = "sixteen"
   /> namesOfIntegers now contains \(namesOfIntegers.count) key-value pair
   </ namesOfIntegers now contains 1 key-value pair
   -> namesOfIntegers = [:]
   // namesOfIntegers is once again an empty dictionary of type Int, String

.. TODO: write about itemsAsArray() -> Element[]
.. TODO: Mention that "==" will consider two dictionaries to be the same
   if they have the same count, and every element in lhs is also in rhs
.. TODO: Mention that [:] can be used as an empty dictionary literal
   if the context gives enough type information.

.. note::

   Behind the scenes,
   Swift's ``Array`` and ``Dictionary`` types are implemented as :newTerm:`generic collections`.
   Generics such as ``Array`` and ``Dictionary`` are described in detail in :doc:`Generics`.

.. refnote:: References

   * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#arrays
