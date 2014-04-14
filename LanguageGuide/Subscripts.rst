Subscripts
==========

Classes, structures, and enumerations can define :newTerm:`subscripts`,
which enable instances of that type to be queried via one or more
values in square brackets after the instance name.
This is similar to the way in which the elements in an ``Array`` instance
can be accessed as ``someArray[index]``,
and elements in a ``Dictionary`` instance can be accessed as
``someDictionary[key]``.
(Array and dictionary subscripts are described in detail in :doc:`CollectionTypes`.)

.. TODO: this chapter should provide an example of subscripting an enumeration,
   as per Joe Groff's example from rdar://16555559.

.. _Subscripts_SubscriptSyntax:

Subscript Syntax
----------------

Subscripts are written with the ``subscript`` keyword.
Their syntax is similar to both instance method syntax and computed property syntax.
They specify one or more input parameters and a return type,
in the same way as instance methods.
However, subscripts can be read-write or read-only,
and this behavior is communicated via a getter and setter
in the same way as for computed properties:

::

   subscript(index: Int) -> Int {
      get {
         // return an appropriate subscript value here
      }
      set(newValue) {
         // perform a suitable setting action here
      }
   }

The type of ``newValue`` is the same as the return value of the subscript.
As with computed properties, you can choose not to specify the setter's ``(newValue)`` parameter,
and a default parameter called ``newValue`` will be provided to your setter
if you do not provide one yourself.

As with read-only computed properties,
the ``get`` keyword can be dropped for read-only subscripts:

::

   subscript(index: Int) -> Int {
      // return an appropriate subscript value here
   }

Here's an example of a read-only subscript implementation:

.. testcode:: subscripts

   -> struct TimesTable {
         let multiplier: Int
         subscript(index: Int) -> Int {
            return multiplier * index
         }
      }
   -> let threeTimesTable = TimesTable(multiplier: 3)
   << // threeTimesTable : TimesTable = TimesTable(3)
   -> println("six times three is \(threeTimesTable[6])")
   <- six times three is 18

This example defines a ``TimesTable`` structure to represent an n-times-table of integers.
In this example, the structure is used to represent the three-times-table.

An n-times-table is based on a fixed mathematical rule.
It is therefore not appropriate to set ``threeTimesTable[someIndex]`` to a new value.
This is why the subscript for ``TimesTable`` is defined as a read-only subscript.

.. _Subscripts_SubscriptUsage:

Subscript Usage
---------------

The exact meaning of “subscript” depends upon the context in which it is used.
Subscripts are typically used as a convenient shorthand for accessing
the member elements in a collection, list, or sequence.
You are free to implement subscripts in the most appropriate way for
your particular class or structure's functionality.

For example, Swift's ``Dictionary`` collection type implements a subscript to provide
access to the values stored in a ``Dictionary`` instance
by passing in a key of the appropriate type within subscript braces:

.. testcode:: subscripts

   -> let numberOfLegs = ["spider" : 8, "ant" : 6, "cat" : 4]
   << // numberOfLegs : Dictionary<String, Int> = Dictionary<String, Int>(1.33333333333333, 3, <DictionaryBufferOwner<String, Int> instance>)
   -> let spiderLegs = numberOfLegs["spider"]
   << // spiderLegs : Int = 8
   /> spiderLegs is equal to \(spiderLegs)
   </ spiderLegs is equal to 8

This ``Dictionary`` instance is of type ``Dictionary<String, Int>``.
This means that it has keys of type ``String``,
and values of type ``Int``.
Its subscript implementation therefore expects to be passed a ``String`` key,
and returns the corresponding ``Int`` value for that key.

.. _Subscripts_SubscriptOptions:

Subscript Options
-----------------

Subscripts can take any number of input parameters,
and these input parameters can be of any type.
Subscripts can also return any type, including optional types.

A class or structure can provide as many subscript implementations as it needs,
and the appropriate subscript to be used will be inferred based on
the types of the value or values that are contained within the subscript braces
at the point that the subscript is used.
This definition of multiple subscripts is known as :newTerm:`subscript overloading`.

While it is most common for a subscript to take a single parameter,
you can also define a subscript with multiple parameters
if it is appropriate for your type:

.. testcode:: subscripts

   -> struct Matrix {
         let rows: Int, columns: Int
         var grid: Array<Double>
         init(rows: Int, columns: Int) {
            self.rows = rows
            self.columns = columns
            grid = Array(rows * columns, 0.0)
         }
         func indexIsValid(row: Int, column: Int) -> Bool {
            return row >= 0 && row < rows && column >= 0 && column < columns
         }
         subscript(row: Int, column: Int) -> Double? {
            get {
               if !indexIsValid(row, column) { return nil }
               return grid[(row * columns) + column]
            }
            set {
               if newValue && indexIsValid(row, column) {
                  grid[(row * columns) + column] = newValue!
               }
            }
         }
      }

.. TODO: Consider switching this over to use the shorter “Double[]” syntax
   once it can be used for initialization

This example defines a ``Matrix`` structure,
which represents a two-dimensional matrix of ``Double`` values.
``Matrix`` provides an initializer that takes two parameters called ``rows`` and ``columns``,
and creates an array that is large enough to store ``rows * columns`` values of type ``Double``.
Each position in the matrix is given an initial value of ``0.0``.
To achieve this, the array's size, and an initial cell value of ``0.0``,
are passed to an ``Array`` initializer that creates and initializes a new array of the correct size.
(This initializer is described in more detail in :ref:`CollectionTypes_CreatingAnEmptyArray`.)

.. testcode:: subscripts

   -> var matrix = Matrix(rows: 2, columns: 2)
   << // matrix : Matrix = Matrix(2, 2, [0.0, 0.0, 0.0, 0.0])

The ``grid`` array is effectively a flattened version of the matrix,
as read from top left to bottom right:

.. image:: ../images/subscriptMatrix01.png
   :align: center

The ``Matrix`` subscript has a return type of ``Double?``, or “optional ``Double``”.
This is to cope with the fact that you might request a value outside of
the bounds of the matrix.
To cope with this,
``Matrix`` includes a convenience method called ``indexIsValid``,
which checks to see if the requested ``row`` or ``column``
is outside the bounds of the matrix:

::

      func indexIsValid(row: Int, column: Int) -> Bool {
         return row >= 0 && row < rows && column >= 0 && column < columns
      }

.. TODO: test this code manually.

A value of ``nil`` is returned if you try and access
a subscript that is outside of the matrix bounds:

.. testcode:: subscripts

   -> if let someValue = matrix[2, 2] {
         println("The matrix has a value of \(someValue) at [2, 2]")
      } else {
         println("The matrix is not big enough to hold a value at [2, 2]")
      }
   <- The matrix is not big enough to hold a value at [2, 2]

Otherwise, the subscript's getter returns
the appropriate value from the ``grid`` array.

Values in the matrix can be set by passing row and column values into the subscript,
separated by a comma:

.. testcode:: subscripts

   -> matrix[0, 1] = 1.5
   -> matrix[1, 0] = 3.2

These two statements call the subscript's setter to set
a value of ``1.5`` in the top right position of the matrix
(where ``row`` is ``0`` and ``column`` is ``1``),
and ``3.2`` in the bottom left position
(where ``row`` is ``1`` and ``column`` is ``0``):

.. image:: ../images/subscriptMatrix02.png
   :align: center

The subscript's setter has an implicit ``value`` parameter of type ``Double?``.
The ``value`` parameter contains the new value to set for that row and column,
and is checked by the subscript's setter:

::

      if newValue && indexIsValid(row, column) {
         grid[(row * columns) + column] = newValue!
      }

.. TODO: test this code manually.

.. TODO: ideally this would use optional binding,
   but you can combine it with other expressions in an if statement.
   Update this example if the situation changes.

The setter checks to see if ``value`` is not equal to ``nil``,
and also checks to make sure that the ``row`` and ``column`` values are valid.
If all of these things are true,
it sets the appropriate entry in the ``grid`` array to
the value stored in the ``value`` optional.