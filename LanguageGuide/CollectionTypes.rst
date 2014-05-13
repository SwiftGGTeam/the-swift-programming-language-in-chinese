Collection Types
================

Swift provides two :newTerm:`collection types`, known as arrays and dictionaries,
for storing collections of values.
Arrays store ordered lists of values of the same type.
Dictionaries store unordered collections of values of the same type,
which can be referenced and looked up through a unique identifier
(also known as a key).

Arrays and dictionaries in Swift are always clear about the types of values
(and keys) that they can store.
This means that you cannot insert a value of the wrong type
into an array or dictionary by mistake.
It also means you can be confident about the types of values
you will retrieve from an array or dictionary.
Swift's use of explicitly-typed collections means that
your code is always clear about the types of values it can work with,
and enables you to catch any type mismatches early in your code's development.

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

Arrays and dictionaries store multiple values together in a single collection.
If you create an array or a dictionary, and assign it to a variable,
the collection that is created will be :newTerm:`mutable`.
This means that you will be able to change (or :newTerm:`mutate`) the collection
after it has been created –
perhaps to add more items to the collection,
or to remove existing items from the ones it already contains.

However, if you assign an array or a dictionary to a constant,
the collection will be :newTerm:`immutable`,
and it is not possible to change the contents of the collection.

It is good practice to create immutable collections
in all cases where the collection does not need to change.
This enables the Swift compiler to optimize the performance of
the collections you create.

.. QUESTION: do we *want* to make this explicit point about choosing
   immutablility by default for collection types?

.. note::

   Swift's array and dictionary types are
   *value types*, not *reference types*,
   and are copied rather than referenced
   when they are assigned to a constant or variable, or passed to a function.
   This is different from the behavior of Cocoa's ``NSArray`` and ``NSDictionary`` classes.
   The difference between value types and reference types is covered in detail
   in :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

.. TODO: provide an example of what this means in practice
   (similar to the Resolution examples in Classes and Structures),
   particularly in light of recent changes to Array to give it partial reference semantics.

.. _CollectionTypes_Arrays:

Arrays
------

.. TODO: update this section to use (and eventually prefer) T[] syntax,
   based on [Contributor 7746]'s feedback

An :newTerm:`array` stores multiple values of the same type in an ordered list.
The same value can appear in an array multiple times at different positions.

Swift arrays are specific about the kinds of values they can store.
They differ from Objective-C's ``NSArray`` and ``NSMutableArray`` classes,
which can store any kind of object,
and do not provide any information about the nature of the objects they return.
In Swift, the type of values that a particular array can store is always made clear,
either through an explicit type annotation, or through type inference,
and does not have to be a class type.
If you create an array of ``Int`` values, for example,
then you can't insert anything other than ``Int`` values into that array.
This means that Swift arrays are type-safe,
and are always clear about what they may contain.

.. _CollectionTypes_ArrayTypeShorthandSyntax:

Array Type Shorthand Syntax
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The type of a Swift array is written in full as ``Array<SomeType>``,
where ``SomeType`` is the type that the array is allowed to store.
The type of an array can also be written in shorthand form as ``SomeType[]``.
Although the two forms are functionally identical,
the shorthand form is preferred,
and is used throughout this guide when referring to the type of an array.

.. _CollectionTypes_ArrayLiterals:

Array Literals
~~~~~~~~~~~~~~

An array can be initialized with an :newTerm:`array literal`,
which is a shorthand way to write one or more values as an array collection.
Array literals are written as a list of values, separated by commas,
surrounded by a pair of square brackets:

.. syntax-outline::

   [<#value 1#>, <#value 2#>, <#value 3#>]

The example below creates an array called ``shoppingList`` to store ``String`` values:

.. testcode:: arrays

   -> var shoppingList: String[] = ["Eggs", "Milk"]
   << // shoppingList : String[] = ["Eggs", "Milk"]
   // shoppingList has been initialized with two initial items

The ``shoppingList`` variable is declared as
“an array of ``String`` values”, written as ``String[]``.
Because this particular array has specified a value type of ``String``,
it is *only* allowed to store ``String`` values.
Here, the ``shoppingList`` array is initialized with two ``String`` values
(``"Eggs"`` and ``"Milk"``), written within an array literal.

.. note::

   The ``shoppingList`` array is declared as a variable (with the ``var`` introducer),
   and not a constant (with the ``let`` introducer),
   because more items will be added to the shopping list in the examples below.

In this case, the array literal contains two ``String`` values, and nothing else.
This matches the type of the ``shoppingList`` variable's declaration –
an array that can only contain ``String`` values –
and so the assignment of the array literal is permitted
as a way to initialize ``shoppingList`` with two initial items.

Thanks to Swift's type inference,
you don't have to write the type of the array
if you're initializing it with an array literal containing values of the same type.
The initialization of ``shoppingList`` could have been be written in a shorter form instead:

.. testcode:: arraysInferred

   -> var shoppingList = ["Eggs", "Milk"]
   << // shoppingList : Array<String> = ["Eggs", "Milk"]

Because all values in the array literal are of the same type,
Swift can infer that ``String[]`` is
the correct type to use for the ``shoppingList`` variable.

.. _CollectionTypes_AccessingAndModifyingAnArray:

Accessing and Modifying an Array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You access and modify an array through its methods and properties,
or by using subscript syntax.
You can find out the number of items in an array
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
passing in the index of the value you want to retrieve.
Subscript syntax involves writing an index value within square brackets
immediately after the name of the array:

.. testcode:: arraysInferred

   -> var firstItem = shoppingList[0]
   << // firstItem : String = "Eggs"
   /> firstItem is equal to \"\(firstItem)\"
   </ firstItem is equal to "Eggs"

Note that the first item in the array has an index of ``0``, not ``1``.
Arrays in Swift are always zero-indexed.

Subscript syntax can also be used to change an existing value at a given index:

.. testcode:: arraysInferred

   -> shoppingList[0] = "Six eggs"
   /> the first item in the list is now equal to \"\(shoppingList[0])\", rather than \"Eggs\"
   </ the first item in the list is now equal to "Six eggs", rather than "Eggs"

.. note::

   You will trigger an unrecoverable runtime error
   if you try to use subscript syntax to retrieve or set a value for an index
   that is outside of an array's existing bounds.
   However, you can check that an index is valid before using it,
   by comparing it to the array's ``count`` property.
   Except for when ``count`` is ``0`` (meaning the array is empty),
   the largest valid index in an array will always be ``count - 1``,
   because arrays are indexed from zero.

.. QUESTION: should I note here that you can't set the firstItem variable
   and expect the value in the array to change,
   because String is a value type?

You can insert an item into the array at a specified index
by calling the array's ``insert`` method:

.. testcode:: arraysInferred

   -> shoppingList.insert(0, newElement: "Maple Syrup")
   // shoppingList now contains 4 items
   /> \"\(shoppingList[0])\" is now the first item in the list
   </ "Maple Syrup" is now the first item in the list

This call to the ``insert`` method inserts a new element with a value of ``"Maple Syrup"``
at the very beginning of the shopping list,
indicated by an index of ``0``.

Similarly, you remove an item from the array with the ``removeAt`` method.
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

Any gaps in an array are closed when an item is removed,
and so the value at index ``0`` is once again equal to ``"Six eggs"``:

.. testcode:: arraysInferred

   -> firstItem = shoppingList[0]
   /> firstItem is now equal to \"\(firstItem)\"
   </ firstItem is now equal to "Six eggs"

.. TODO: there are quite a few more Array methods, such as sort() and popLast() –
   how many of them should be listed here?
   I'm holding off writing about any more of them until NewArray lands.

.. _CollectionTypes_CreatingAndInitializingAnArray:

Creating and Initializing an Array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can create an empty array of a certain type
(without setting any initial values)
using initializer syntax:

.. testcode:: arraysEmpty

   -> var someInts = Int[]()
   << // someInts : Int[] = []
   -> println("someInts is of type Int[] with \(someInts.count) items.")
   <- someInts is of type Int[] with 0 items.

Note that the type of the ``someInts`` variable has been inferred to be ``Int[]``,
because it was set to the output of an ``Int[]`` initializer.

Alternatively, if the context already provides type information –
such as a function argument, or an already-typed variable or constant –
you can create an empty array with an empty array literal,
which is written as ``[]``
(an empty pair of square brackets):

.. testcode:: arraysEmpty

   -> someInts.append(3)
   /> someInts now contains \(someInts.count) value of type Int
   </ someInts now contains 1 value of type Int
   -> someInts = []
   // someInts is now an empty array, but is still of type Int[]

Swift's ``Array`` type also provides
an initializer for creating an array of a certain size
with all of its values set to a provided default value.
This initializer takes two arguments –
the number of elements to be added to the new array (called ``count``),
and a default value of the appropriate type (called ``value``):

.. testcode:: arraysEmpty

   -> var threeDoubles = Double[](count: 3, value: 0.0)
   << // threeDoubles : Double[] = [0.0, 0.0, 0.0]
   // threeDoubles is of type Double[], and equals [0.0, 0.0, 0.0]

Thanks to type inference, you don't actually need to specify
the type to be stored in the array when using this initializer,
because it can be inferred from the default value:

.. testcode:: arraysEmpty

   -> var anotherThreeDoubles = Array(count: 3, value: 0.0)
   << // anotherThreeDoubles : Array<Double> = [0.0, 0.0, 0.0]
   /> anotherThreeDoubles is inferred as Double[], and equals [\(anotherThreeDoubles[0]), \(anotherThreeDoubles[1]), \(anotherThreeDoubles[2])]
   </ anotherThreeDoubles is inferred as Double[], and equals [0.0, 0.0, 0.0]

.. TODO: func find<T: Equatable>(array: T[], value: T) -> Int?
   This is defined in Algorithm.swift,
   and gives a way to find the index of a value in an array if it exists.
   I'm holding off writing about it until NewArray lands.
   
.. TODO: mutating func sort(isOrderedBefore: (T, T) -> Bool)
   This is defined in Array.swift.
   Likewise I'm holding off writing about it until NewArray lands.

.. TODO: talk about what it means to say that Array x == Array y

.. _CollectionTypes_Dictionaries:

Dictionaries
------------

A :newTerm:`dictionary` is a container that stores multiple values of the same type.
Each value is associated with a unique :newTerm:`key`,
which acts as an identifier for that value within the dictionary.
Unlike an array, the items in a dictionary do not have a specified order.
You use a dictionary when you need to look up values based on their identifier,
in much the same way that a real-world dictionary is used to look up
the definition for a particular word.

Swift dictionaries are specific about the types of keys and values they can store.
They differ from Objective-C's ``NSDictionary`` and ``NSMutableDictionary`` classes,
which can use any kind of object as their keys and values,
and do not provide any information about the nature of these objects.
In Swift, the type of keys and values
that a particular dictionary can store is always made clear,
either through an explicit type annotation, or through type inference.

Swift's dictionary type is written as ``Dictionary<KeyType, ValueType>``,
where ``KeyType`` is the type of value that can be used as a dictionary key,
and ``ValueType`` is the type of value that the dictionary stores for those keys.

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

.. _CollectionTypes_DictionaryLiterals:

Dictionary Literals
~~~~~~~~~~~~~~~~~~~

A dictionary can be initialized with a :newTerm:`dictionary literal`,
which has a similar syntax to the array literal seen earlier.
Dictionary literals are a shorthand way to write
one or more key-value pairs as a ``Dictionary`` collection.

A :newTerm:`key-value pair` is a combination of a key and a value, separated by a colon.
The key-value pairs in a dictionary literal are written as a list, separated by commas,
surrounded by a pair of square brackets:

.. syntax-outline::

   [<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#key 3#>: <#value 3#>]

The example below creates a dictionary to store the names of international airports.
In this dictionary, the keys are three-letter International Air Transport Association codes,
and the values are airport names:

.. testcode:: dictionaries

   -> var airports: Dictionary<String, String> = ["TYO": "Tokyo", "DUB": "Dublin"]
   << // airports : Dictionary<String, String> = Dictionary<String, String>(<unprintable value>)

The ``airports`` dictionary is declared as having a type of ``Dictionary<String, String>``,
which means “a ``Dictionary`` whose keys are of type ``String``,
and whose values are also of type ``String``”.

.. note::

   The ``airports`` dictionary is declared as a variable (with the ``var`` introducer),
   and not a constant (with the ``let`` introducer),
   because more airports will be added to the dictionary in the examples below.

The ``airports`` dictionary is initialized with
a dictionary literal containing two key-value pairs.
The first pair has a key of ``"TYO"``, and a value of ``"Tokyo"``.
The second pair has a key of ``"DUB"``, and a value of ``"Dublin"``.

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
   << // airports : Dictionary<String, String> = Dictionary<String, String>(<unprintable value>)

Because all of the keys in the literal are of the same type as each other,
and likewise all of the values are of the same type as each other,
Swift can infer that ``Dictionary<String, String>`` is
the correct type to use for ``airports``.

.. _CollectionTypes_AccessingAndModifyingADictionary:

Accessing and Modifying a Dictionary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can access and modify a dictionary through its methods and properties,
or by using subscript syntax.
As with an array, you can find out the number of items in a ``Dictionary``
by checking its read-only ``count`` property:

.. testcode:: dictionariesInferred

   -> println("The dictionary of airports contains \(airports.count) items.")
   <- The dictionary of airports contains 2 items.

.. TODO: see the note for Array about setting count to a new value.
   If it turns out that Array is indeed meant to have a settable count property,
   I should change the wording of the paragraph here to avoid making it sound as if
   Dictionary's count property is read-only, like array's.

You can add new items to the dictionary by calling its ``add`` method,
and passing in a new key and value of the correct types:

.. testcode:: dictionariesInferred

   -> airports.add("LHR", value: "London Heathrow")
   << // r0 : Bool = false
   /> the airports dictionary now contains \(airports.count) items
   </ the airports dictionary now contains 3 items

The ``add`` method actually returns a Boolean value,
to indicate whether or not a value already existed in the dictionary for that key.
(This return value is ignored in the example above).
The return value is ``true`` if the key was already being used,
and ``false`` if it was not in use:

.. testcode:: dictionariesInferred

   -> if airports.add("DUB", value: "Dublin International") {
         println("There is already a value for that key in the dictionary.")
      }
   <- There is already a value for that key in the dictionary.

.. note::

   If you try to use the ``add`` method to add a value for a key that already exists,
   the existing value for that key will not be replaced in the dictionary.

.. FIXME: I've filed rdar://16336109 about the fact that
   this Bool value feels the wrong way round.
   An add() method should return true if it succeeds, not false.
   Also, the failure-on-existing behavior is different from how
   NSMutableArray's setObject:forKey: works.
   (NSMutableArray doesn't have an "add" method.)

.. QUESTION: There's a lot of talk about "methods" and "returning" here,
   when I haven't even introduced functions, let alone methods.
   Does this matter?

You can use the dictionary's ``find`` method to try and find a value for a particular key.
The ``find`` method returns an *optional* value,
which can be checked and unwrapped using optional binding:

.. testcode:: dictionariesInferred

   -> if let airportName = airports.find("DUB") {
         println("The name of the airport is \(airportName).")
      } else {
         println("That airport is not in the airports dictionary.")
      }
   <- The name of the airport is Dublin.

If the provided key does not already exist in the dictionary,
the ``find`` method will return ``nil``.

You can remove a key-value pair from the dictionary by calling the ``deleteKey`` method:

.. testcode:: dictionariesInferred

   -> airports.deleteKey("TYO")
   << // r1 : Bool = true
   >> if let deletedName = airports.find("TYO") {
   >>    println("The key-value pair for TYO has *not* been deleted, but it should have been!")
   >> } else {
   >>    println("The key-value pair for TYO has now been deleted.")
   >> }
   </ The key-value pair for TYO has now been deleted.

.. FIXME: reinstate the APL example once the very weird rdar://16738584 is fixed.

As with arrays, you can access the values in a dictionary with subscript syntax.
However, for a dictionary, the value within the square brackets must be
a key of the appropriate type for that dictionary.

As an alternative to the ``add`` method described above,
you can use subscript syntax to add a value into a dictionary:

.. testcode:: dictionariesInferred

   -> airports["SFO"] = "San Francisco International"
   >> var sfo = "SFO" // a hack to get around rdar://16336177
   << // sfo : String = "SFO"
   /> \(airports[sfo]) has been added to the dictionary
   </ San Francisco International has been added to the dictionary

Unlike the ``add`` method,
subscript syntax always replaces an existing value with a new value
if the provided key already exists in the dictionary:

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

.. note::

   If you try to use subscript syntax to retrieve a value
   for a key that does not exist in the dictionary,
   you will trigger an unrecoverable runtime error.
   Always make sure that the key you pass to a dictionary's subscript is valid.
   If you are not sure whether a particular key already exists in the dictionary,
   call the dictionary's ``find`` method instead.

.. TODO: talk about the fact that Swift will crash if the key isn't there,
   and describe how to find out if it's there before trying to access it.

.. NOTE: I've filed rdar://16335854 to suggest that Array<T> and Dictionary<KeyType, T>
   subscripts should return Optional<T>.

.. _CollectionTypes_CreatingAnEmptyDictionary:

Creating an Empty Dictionary
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As with arrays,
you can create an empty ``Dictionary`` of a certain type using initializer syntax:

.. testcode:: dictionariesEmpty

   -> var namesOfIntegers = Dictionary<Int, String>()
   << // namesOfIntegers : Dictionary<Int, String> = Dictionary<Int, String>(<unprintable value>)
   // namesOfIntegers is an empty Dictionary<Int, String>

This example creates an empty dictionary of type ``Int``, ``String``
to store human-readable names of integer values.
Its keys are of type ``Int``, and its values are of type ``String``.

If the context already provides type information,
you can create an empty dictionary using an empty dictionary literal,
which is written as ``[:]``
(a colon inside a pair of square brackets):

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
   Swift's array and dictionary types are implemented as :newTerm:`generic collections`.
   Generic types are described in :doc:`Generics`.