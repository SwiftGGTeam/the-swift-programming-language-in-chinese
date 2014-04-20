Basic Operators
===============

An :newTerm:`operator` is a special symbol or phrase that is used to check or change values.
A simple example is the addition operator (``+``)
which is used to add two numbers together (as in ``let i = 1 + 2``).
More complex examples include the logical AND operator ``&&``
(as in ``if enteredDoorCode && passedRetinaScan``),
or the increment operator ``++i``,
which gives a shorthand way to increase the value of ``i`` by ``1``.

All of the most common operators are described in this chapter.
Swift's more advanced operators are described in :doc:`AdvancedOperators`.

Swift supports all of the standard operators from C,
and improves several of their capabilities
to eliminate common coding errors:

* Remainder (``%``) calculations can be performed on floating-point numbers
* Assignment (``=``) does not return a value
* Arithmetic operators (``+``, ``-``, ``*``, ``/``, ``%`` etc.)
  detect and disallow value overflow

You can choose to opt in to value overflow behavior
by using Swift's overflow operators (such as ``a &+ b``).
Overflow operators are described in :doc:`AdvancedOperators`.

Swift also provides two range operators
(``a..b`` and ``a...b``),
which give a short-hand way to express a range of values.

You can define your own implementations of the standard operators –
and create new operators with custom functionality –
for any custom types you define.
This process is covered in detail in :doc:`AdvancedOperators`.

.. _BasicOperators_Terminology:

Terminology
-----------

Operators are often referred to as :newTerm:`unary`, :newTerm:`binary`, or :newTerm:`ternary`:

* Unary operators operate on a single target (such as ``-a``).
  They are said to be :newTerm:`prefix` operators if they appear
  immediately before their target (such as ``!b``),
  and :newTerm:`postfix` operators if they appear
  immediately after their target (such as ``i++``).
* Binary operators operate on two targets (such as ``2 + 3``),
  and are said to be :newTerm:`infix` because they appear inbetween their two targets.
* Ternary operators operate on three targets.
  Like C, Swift has just one ternary operator,
  known as the :newTerm:`ternary conditional operator` (``a ? b : c``).

The values that operators affect are known as :newTerm:`operands`.
In the expression ``1 + 2``, the ``+`` symbol is a binary operator
and its two operands are the values ``1`` and ``2``.

.. _BasicOperators_AssignmentOperator:

Assignment Operator
-------------------

The :newTerm:`assignment operator` (``a = b``) updates the value of ``a`` with the value of ``b``:

.. testcode:: assignmentOperator

   -> let b = 10
   << // b : Int = 10
   -> var a = 5
   << // a : Int = 5
   -> a = b
   /> a is now equal to \(a)
   </ a is now equal to 10

If the right side of the assignment is a tuple with multiple values,
its elements can be decomposed into multiple constants or variables at once:

.. testcode:: assignmentOperator

   -> let (x, y) = (1, 2)
   << // (x, y) : (Int, Int) = (1, 2)
   /> x is equal to \(x), and y is equal to \(y)
   </ x is equal to 1, and y is equal to 2

Unlike C and Objective-C, the assignment operator does not itself return a value.
The following statement is not valid:

::

   if x = y {
      // this is not valid, because x = y does not return a value
   }

This avoids the assignment operator (``=``) being used by accident
when the equality comparison operator (``==``) is actually intended.
By making ``if x = y`` invalid,
Swift helps you to avoid these kinds of errors in your code.

.. TODO: Should we mention that x = y = z is also not valid?
   If so, is there a convincing argument as to why this is a good thing?

.. _BasicOperators_ArithmeticOperators:

Arithmetic Operators
--------------------

Swift supports the four standard :newTerm:`arithmetic operators` for all number types:

* addition (``+``)
* subtraction (``-``)
* multiplication (``*``)
* division (``/``)

.. testcode:: arithmeticOperators

   -> 1 + 2       // equals 3
   << // r0 : Int = 3
   -> 5 - 3       // equals 2
   << // r1 : Int = 2
   -> 2 * 3       // equals 6
   << // r2 : Int = 6
   -> 10.0 / 2.5   // equals 4.0
   << // r3 : Double = 4.0

The addition operator is also supported for ``String`` concatenation:

.. testcode:: arithmeticOperators

   -> "hello, " + "world"      // equals "hello, world"
   << // r4 : String = "hello, world"

Two ``UnicodeScalar`` values,
or one ``UnicodeScalar`` value and one ``String`` value,
can be added together to make a new ``String`` value:

.. testcode:: arithmeticOperators

   -> let dog = '🐶'
   << // dog : UnicodeScalar = '🐶'
   -> let cow = '🐮'
   << // cow : UnicodeScalar = '🐮'
   -> let dogCow = dog + cow
   << // dogCow : String = "🐶🐮"
   /> dogCow is equal to \"🐶🐮\"
   </ dogCow is equal to "🐶🐮"

.. TODO: revisit this example based on whether single quotes
   continue to return a UnicodeScalar,
   and in light of where we end up with characters vs scalars.
   This also raises the question of my use of the name 'scalar'
   when using for-in to iterate over someString.chars.
   I've used 'scalar' several times throughout the book.

.. _BasicOperators_RemainderOperator:

Remainder Operator
~~~~~~~~~~~~~~~~~~

The :newTerm:`binary remainder operator` (``a % b``)
works out how many multiples of ``b`` will fit inside ``a``,
and returns the value that is left over
(known as the :newTerm:`remainder`).

.. note::

   The remainder operator (``%``) is also known as
   a :newTerm:`modulo operator` in other languages.
   However, its behavior in Swift for negative numbers means that it is,
   strictly speaking, a remainder rather than a modulo operation.

Here's how the remainder operator works.
To calculate ``9 % 4``, you first work out how many ``4``\ s will fit inside ``9``:

.. image:: ../images/remainderInteger.png
   :align: center

You can fit two ``4``\ s inside ``9``, as this illustration shows.
After doing so, there is a remainder of ``1`` left over (shown in orange).

In Swift, this would be written as:

.. testcode:: arithmeticOperators

   -> 9 % 4    // equals 1
   << // r5 : Int = 1

To determine the answer for ``a % b``,
the ``%`` operator calculates the following equation,
and returns ``remainder`` as its output:

``a`` = (``b`` × ``some multiplier``) + ``remainder``

where ``some multiplier`` is the largest number of multiples of ``b``
that will fit inside ``a``.

Inserting ``9`` and ``4`` into this equation gives:

``9`` = (``4`` × ``2``) + ``1``

The same method is applied when calculating the remainder for a negative value of ``a``:

.. testcode:: arithmeticOperators

   -> -9 % 4   // equals -1
   << // r6 : Int = -1

Inserting ``-9`` and ``4`` into the equation gives:

``-9`` = (``4`` × ``-2``) + ``-1``

giving a remainder value of ``-1``.

The sign of ``b`` is ignored for negative values of ``b``.
This means that ``a % b`` and ``a % -b`` always give the same answer.

.. _BasicOperators_FloatingPointRemainderCalculations:

Floating-Point Remainder Calculations
_____________________________________

Unlike the remainder operator in C and Objective-C,
Swift's remainder operator can also operate on floating-point numbers:

.. testcode:: arithmeticOperators

   -> 8 % 2.5   // equals 0.5
   << // r7 : Double = 0.5

In this example, ``8`` divided by ``2.5`` equals ``3``, with a remainder of ``0.5``,
so the remainder operator returns a ``Double`` value of ``0.5``.

.. image:: ../images/remainderFloat.png
   :align: center

.. _BasicOperators_IncrementAndDecrementOperators:

Increment and Decrement Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Like C, Swift provides an :newTerm:`increment operator` (``++``)
and an :newTerm:`decrement operator` (``--``)
as a shorthand way to increase or decrease the value of a numeric variable by ``1``.
These operators can be used with variables of any integer or floating-point type.

.. testcode:: arithmeticOperators

   -> var i = 0
   << // i : Int = 0
   -> ++i      // i now equals 1
   << // r8 : Int = 1

Each time you call ``++i``, the value of ``i`` is increased by ``1``.
Essentially, ``++i`` is shorthand for saying ``i = i + 1``.
Likewise, ``--i`` can be used as shorthand for ``i = i - 1``.

``++`` and ``--`` can be used as prefix operators or as postfix operators.
``++i`` and ``i++`` are both valid ways to increase the value of ``i`` by ``1``.

Note that these operators modify ``i``, and also return a value.
If you only want to increment or decrement the value stored in ``i``,
you can choose to ignore the returned value.
However, if you *do* use the returned value,
it will be different based on whether you used the prefix or postfix version of the operator,
based on the following rules:

* if the operator is written *before* the variable,
  it increments the variable *before* returning its value
* if the operator is written *after* the variable,
  it increments the variable *after* returning its value

For example:

.. testcode:: arithmeticOperators

   -> var a = 0
   << // a : Int = 0
   -> let b = ++a
   << // b : Int = 1
   /> a and b are now both equal to \(a)
   </ a and b are now both equal to 1
   -> let c = a++
   << // c : Int = 1
   /> a is now equal to \(a), but c has been set to the pre-increment value of \(c)
   </ a is now equal to 2, but c has been set to the pre-increment value of 1

In the example above,
``let b = ++a`` increments ``a`` *before* returning its value.
This is why both ``a`` and ``b`` are equal to to the new value of ``1``.

However, ``let c = a++`` increments ``a`` *after* returning its value.
This means that ``c`` gets the old value of ``1``,
and ``a`` is then updated to equal ``2``.

Unless you need the specific behavior of ``i++``,
it is recommended that you use ``++i`` and ``--i`` in all cases,
because they have the typical expected behavior of modifying ``i``,
and then returning the result.

.. QUESTION: is this good advice
   (given the general prevalence of i++ in the world),
   and indeed is it even advice we need to bother giving
   (given that lots of people might disagree or not care)?

.. QUESTION: if so, have I followed this advice throughout the book?

.. _BasicOperators_UnaryMinusOperator:

Unary Minus Operator
~~~~~~~~~~~~~~~~~~~~

The sign of a numeric value can be toggled using a prefixed ``-``,
known as the :newTerm:`unary minus operator`:

.. testcode:: arithmeticOperators

   -> let three = 3
   << // three : Int = 3
   -> let minusThree = -three      // minusThree equals -3
   << // minusThree : Int = -3
   -> let plusThree = -minusThree   // plusThree equals 3, or "minus minus three"
   << // plusThree : Int = 3

The unary minus operator (``-``) is prepended directly before the value it operates on,
without any whitespace.

.. _BasicOperators_UnaryPlusOperator:

Unary Plus Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`unary plus operator` (``+``) simply returns
the value it operates on, without any change:

.. testcode:: arithmeticOperators

   -> let minusSix = -6
   << // minusSix : Int = -6
   -> let alsoMinusSix = +minusSix   // alsoMinusSix equals -6
   << // alsoMinusSix : Int = -6

The unary plus operator doesn't actually do anything.
However, it can be used to provide symmetry in your code
when used alongside the unary minus operator.

.. _BasicOperators_CompoundAssignmentOperators:

Compound Assignment Operators
-----------------------------

Like C, Swift provides :newTerm:`compound assignment operators` that combine assignment (``=``) with another operation.
One example is the :newTerm:`addition assignment operator` (``+=``):

.. testcode:: compoundAssignment

   -> var a = 1
   << // a : Int = 1
   -> a += 2
   /> a is now equal to \(a)
   </ a is now equal to 3

The expression ``a += 2`` is shorthand for ``a = a + 2``.
Effectively, the addition and the assignment are combined into one operator
that performs both tasks at the same time.

.. note::

   The compound assignment operators do not return a value.
   You cannot write ``let b = a += 2``, for example.
   This behavior is different from the increment and decrement operators mentioned above.

A complete list of compound assignment operators can be found in the :doc:`../ReferenceManual/index`.

.. _BasicOperators_ComparisonOperators:

Comparison Operators
--------------------

Swift supports all of the standard C :newTerm:`comparison operators`:

* Equal to (``a == b``)
* Not equal to (``a != b``)
* Greater than (``a > b``)
* Less than (``a < b``)
* Greater than or equal to (``a >= b``)
* Less than or equal to (``a <= b``)

.. note::

   Swift also provides two :newTerm:`identity operators` (``===`` and ``!==``),
   which are used to test if two object references both refer to the same object instance.
   These identity operators are described in more detail in :doc:`ClassesAndStructures`.

Each of the comparison operators returns a ``Bool`` value to indicate whether or not the statement is true:

.. testcode:: comparisonOperators

   -> 1 == 1   // true, because 1 is equal to 1
   << // r0 : Bool = true
   -> 2 != 1   // true, because 2 is not equal to 1
   << // r1 : Bool = true
   -> 2 > 1    // true, because 2 is greater than 1
   << // r2 : Bool = true
   -> 1 < 2    // true, because 1 is less than 2
   << // r3 : Bool = true
   -> 1 >= 1   // true, because 1 is greater than or equal to 1
   << // r4 : Bool = true
   -> 2 <= 1   // false, because 2 is not less than or equal to 1
   << // r5 : Bool = false

Comparison operators are often used in conditional statements,
such as the ``if``-``else`` statement:

.. testcode:: comparisonOperators

   -> let name = "world";
   << // name : String = "world"
   -> if name == "world" {
         println("hello, world")
      } else {
         println("I'm sorry \(name), but I don't recognize you")
      }
   << hello, world
   // prints "hello, world", because name is indeed equal to "world"

The ``if``-``else`` statement is described in more detail in :doc:`ControlFlow`.

.. TODO: which types do these operate on by default?
   How do they work with strings?
   How about with tuples / with your own types?

.. _BasicOperators_TernaryConditionalOperator:

Ternary Conditional Operator
----------------------------

The :newTerm:`ternary conditional operator` is a special operator with three parts,
which takes the form ``question ? answer1 : answer2``.
It provides a shorthand way to evaluate one of two expressions
based on whether ``question`` is true or false.
If ``question`` is true, it evaluates ``answer1`` and returns its value;
otherwise, it evaluates ``answer2`` and returns its value.

Effectively, it is shorthand for:

::

   if question {
      answer1
   } else {
      answer2
   }

Here's an example, which calculates the pixel height for a table row.
The row should be 50 pixels taller than the content if it has a header,
and 20 pixels taller if it doesn't:

.. testcode:: ternaryConditionalOperatorPart1

   -> let contentHeight = 40
   << // contentHeight : Int = 40
   -> let hasHeader = true
   << // hasHeader : Bool = true
   -> let rowHeight = contentHeight + (hasHeader ? 50 : 20)
   << // rowHeight : Int = 90
   /> rowHeight is equal to \(rowHeight)
   </ rowHeight is equal to 90

This is shorthand for:

.. testcode:: ternaryConditionalOperatorPart2

   -> let contentHeight = 40
   << // contentHeight : Int = 40
   -> let hasHeader = true
   << // hasHeader : Bool = true
   -> var rowHeight = contentHeight
   << // rowHeight : Int = 40
   -> if hasHeader {
         rowHeight = rowHeight + 50
      } else {
         rowHeight = rowHeight + 20
      }
   /> rowHeight is equal to \(rowHeight)
   </ rowHeight is equal to 90

The shorthand version is more concise,
and removes the need for ``rowHeight`` to be a variable rather than a constant.

.. TODO: leave rowHeight uninitialized once the REPL allows uninitialized variables?

The ternary conditional operator provides
an efficient shorthand for deciding which of two expressions to consider.
The ternary conditional operator should be used with care, however.
It is very concise, but this conciseness can lead to hard-to-read code if overused.
Avoid combining multiple instances of the ternary conditional operator into one compound statement.

.. _BasicOperators_RangeOperators:

Range Operators
---------------

Swift includes two :newTerm:`range operators`,
which provide shorthand ways to express a range of values.

.. _BasicOperators_ClosedRangeOperator:

Closed Range Operator
~~~~~~~~~~~~~~~~~~~~~

The :newTerm:`closed range operator` (``a..b``)
defines a range that runs from ``a`` to ``b``,
and includes the values ``a`` and ``b``.

The closed range operator is useful when iterating over a range
in which you want all of the values to be used,
such as with a ``for``-``in`` loop:

.. testcode:: rangeOperators

   -> for index in 1..5 {
         println("\(index) times 5 is \(index * 5)")
      }
   </ 1 times 5 is 5
   </ 2 times 5 is 10
   </ 3 times 5 is 15
   </ 4 times 5 is 20
   </ 5 times 5 is 25

``for``-``in`` loops are described in more detail in :doc:`ControlFlow`.

.. _BasicOperators_HalfClosedRangeOperator:

Half-Closed Range Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~

The :newTerm:`half-closed range operator` (``a...b``)
defines a range that runs from ``a`` to ``b``,
but does not include ``b``.
It is said to be :newTerm:`half-closed`
because it contains its first value, but not its final value.

Half-closed ranges are particularly useful when working with
zero-based lists such as arrays,
where it is useful to count up to (but not including) the length of the list:

.. testcode:: rangeOperators

   -> let names = ["Anna", "Alex", "Brian", "Jack"]
   << // names : String[] = ["Anna", "Alex", "Brian", "Jack"]
   -> let count = names.count
   << // count : Int = 4
   -> for i in 0...count {
         println("Person \(i + 1) is called \(names[i])")
      }
   </ Person 1 is called Anna
   </ Person 2 is called Alex
   </ Person 3 is called Brian
   </ Person 4 is called Jack

Note that the array contains four items,
but ``0...count`` only counts as far as ``3``
(the index of the last item in the array),
because it is a half-closed range.
(Arrays are described in more detail in :ref:`CollectionTypes_Arrays`.)

.. _BasicOperators_LogicalOperators:

Logical Operators
-----------------

:newTerm:`Logical operators` modify or combine
the Boolean logic values ``true`` and ``false``.
Swift supports the three standard logical operators found in C-based languages:

* Logical NOT (``!a``)
* Logical AND (``a && b``)
* Logical OR (``a || b``)

.. _BasicOperators_LogicalNOTOperator:

Logical NOT Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`logical NOT operator` (``!a``) inverts a Boolean value so that ``true`` becomes ``false``,
and ``false`` becomes ``true``.

The logical NOT operator is a prefix operator,
and appears immediately before the value it operates on,
without any whitespace.
It can be read as “not ``a``”, as seen in the following example:

.. testcode:: logicalOperators

   -> let allowedEntry = false
   << // allowedEntry : Bool = false
   -> if !allowedEntry {
         println("ACCESS DENIED")
      }
   <- ACCESS DENIED

The phrase ``if !allowedEntry`` can be read as “if not allowed entry.”
The subsequent line is only executed if “not allowed entry” is true,
i.e. if ``allowedEntry`` is ``false``.

As in this example,
careful choice of Boolean constant and variable names
can help to keep code readable and concise,
while avoiding double negatives or confusing logic statements.

.. _BasicOperators_LogicalANDOperator:

Logical AND Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`logical AND operator` (``a && b``) is used to create logical expressions
where both values must be ``true`` for the overall expression to also be ``true``.

If either value is ``false``,
the overall expression will also be ``false``.
In fact, if the *first* value is ``false``,
the second value won't even be evaluated,
because it can't possibly make the overall expression equate to ``true``.
This is known as :newTerm:`short-circuit evaluation`.

This example considers two ``Bool`` values,
and only allows access if both values are ``true``:

.. testcode:: logicalOperators

   -> let enteredDoorCode = true
   << // enteredDoorCode : Bool = true
   -> let passedRetinaScan = false
   << // passedRetinaScan : Bool = false
   -> if enteredDoorCode && passedRetinaScan {
         println("Welcome!")
      } else {
         println("ACCESS DENIED")
      }
   <- ACCESS DENIED

.. _BasicOperators_LogicalOROperator:

Logical OR Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`logical OR operator`
(``a || b``, i.e. an infix operator made from two adjacent pipe characters)
is used to create logical expressions where only *one* of the two values has to be ``true``
for the overall expression to be ``true``.

Like the Logical AND operator above,
the Logical OR operator uses short-circuit evaluation when considering its expressions.
If the left-hand side of a Logical OR expression is ``true``,
the right-hand side will not be evaluated,
because it cannot change the outcome of the overall expression.

For example:

.. testcode:: logicalOperators

   -> let hasDoorKey = false
   << // hasDoorKey : Bool = false
   -> let knowsOverridePassword = true
   << // knowsOverridePassword : Bool = true
   -> if hasDoorKey || knowsOverridePassword {
         println("Welcome!")
      } else {
         println("ACCESS DENIED")
      }
   <- Welcome!

In this example,
the first ``Bool`` value (``hasDoorKey``) is ``false``,
but the second value (``knowsOverridePassword``) is ``true``.
Because one value is ``true``,
the overall expression also equates to ``true``,
and access is allowed.

.. _BasicOperators_CombiningLogicalOperators:

Combining Logical Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can combine multiple logical operators to create longer compound expressions:

.. testcode:: logicalOperators

   -> if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
         println("Welcome!")
      } else {
         println("ACCESS DENIED")
      }
   <- Welcome!

This example uses multiple ``&&`` and ``||`` operators to create a longer compound expression.
However, the ``&&`` and ``||`` operators still only operate on two values,
so this is actually three smaller expressions chained together.
It can be read as:

If we've entered the correct door code and passed the retina scan;
or if we have a valid door key;
or if we know the emergency override password;
then allow access.

Based on the example values from earlier,
the first two mini-expressions are ``false``,
but we know the emergency override password,
so the overall compound expression still equates to ``true``.

.. _BasicOperators_Explicit Parentheses:

Explicit Parentheses
~~~~~~~~~~~~~~~~~~~~

It can sometimes be useful to include parentheses when they are not strictly needed,
to make the intention of a complex expression easier to read.
In the door access example above,
it is useful to add parentheses around the first part of the compound expression
to make its intent explicit:

.. testcode:: logicalOperators

   -> if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
         println("Welcome!")
      } else {
         println("ACCESS DENIED")
      }
   <- Welcome!

The parentheses make it clear that the first two values
are being considered as part of a separate possible state in the overall logic.
The output of the compound expression doesn't change,
but the overall intention is clearer to the reader.
Readability is always preferred over brevity;
use parentheses where they help to make your intentions clear.
