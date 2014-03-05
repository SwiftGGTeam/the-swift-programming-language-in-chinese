.. docnote:: Subjects to be covered in this section

    * Lack of promotion and truncation ✔︎
    * Arithmetic operators ✔︎
    * Operator precendence and associativity ✔︎
    * Relational and equality operators ✔︎
    * Short-circuit nature of the logical operators && and || ✔︎
    * Expressions (kind of ✔︎)
    * The ternary conditional operator ✔︎
    * range operators ✔︎
    * The comma operator

Operators
=========

An :newTerm:`operator` is a special symbol or phrase that is used to check or change values.
A simple example is the addition operator (``+``)
which is used to add two numbers together (as in ``let i = 1 + 2``).
More complex examples include the logical AND operator ``&&``
(as in ``if enteredDoorCode && passedRetinaScan``),
or the increment operator ``++i``,
which gives a shorthand way to increase the value of ``i`` by ``1``.
All of these operators are explained in more detail below.

Swift supports all of the standard operators from C,
and improves several of their capabilities:

* Assignment (``=``) does not return a value, to avoid common coding errors
* Remainder (``%``) calculations can be performed on floating-point numbers
* Arithmetic operators (``+``, ``-``, ``*``, ``/``, ``%`` etc.)
  detect value overflow, eliminating a category of common coding errors

It also provides expressive operators that make development easier or more explicit:

* :ref:`Operators_RangeOperators`
  ``a..b`` and ``a...b``, which give a short-hand way to express a range of values
* :ref:`Operators_OverflowOperators`
  such as ``a &+ b``, to opt in to overflowing arithmetic behavior

In addition, you can define your own implementations of the standard operators –
and create new ones –
for any custom types you define.
This process is covered in detail in :doc:`ClassesAndStructures`.

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
  known as the ternary conditional operator (``a ? b : c``).

The values that operators affect are known as :newTerm:`operands`.
In the expression ``1 + 2``, the ``+`` symbol is a binary operator
and its two operands are the values ``1`` and ``2``.

.. _Operators_AssignmentOperator:

Assignment Operator
-------------------

The :newTerm:`assignment operator` (``a = b``) updates the value of ``a`` with the value of ``b``:

.. testcode:: assignmentOperator

    --> let b = 10
    <-- // b : Int = 10
    --> var a = 5
    <-- // a : Int = 5
    --> a = b
    >>> println("a is now \(a)")
    <<< a is now 10
    /// a is now equal to 10

If the right side of the assignment is a tuple with multiple values,
its elements can be decomposed into multiple named values at once:

.. testcode:: assignmentOperator

    --> let (x, y) = (1, 2)
    <-- // (x, y) : (Int, Int) = (1, 2)
    >>> println("x is \(x)")
    <<< x is 1
    >>> println("y is \(y)")
    <<< y is 2
    /// x is now equal to 1, and y is now equal to 2

Unlike C and Objective-C, the assignment operator does not itself return a value.
The following statement is not valid:

::

    if x = y {
        // this is not valid, because x = y does not return a value
    }

This avoids the assignment operator (``=``) being used by accident
when the equality comparison operator (``==``) is actually intended.
By making ``if x = y`` invalid,
Swift makes it much easier to avoid these kinds of errors in your code.

.. TODO: Should we mention that x = y = z is also not valid?
   If so, is there a convincing argument as to why this is a good thing?
.. TODO: Add a section about the new assignments bindings.

.. _Operators_ArithmeticOperators:

Arithmetic Operators
--------------------

Swift supports the four standard :newTerm:`arithmetic operators` for all number types:

* addition (``+``)
* subtraction (``-``)
* multiplication (``*``)
* division (``/``)

.. testcode:: arithmeticOperators

    --> 1 + 2         // equals 3
    <-- // r0 : Int = 3
    --> 5 - 3         // equals 2
    <-- // r1 : Int = 2
    --> 2 * 3         // equals 6
    <-- // r2 : Int = 6
    --> 10.0 / 2.5    // equals 4.0
    <-- // r3 : Double = 4.0

The addition operator is also supported for ``String`` concatenation:

.. testcode:: arithmeticOperators

    --> "hello, " + "world"       // equals "hello, world"
    <-- // r4 : String = "hello, world"

Two ``UnicodeScalar`` values,
or one ``UnicodeScalar`` value and one ``String`` value,
can be added together to make a new ``String`` value:

.. testcode:: arithmeticOperators

    --> let dog = '🐶'
    <-- // dog : UnicodeScalar = '🐶'
    --> let cow = '🐮'
    <-- // cow : UnicodeScalar = '🐮'
    --> let dogCow = dog + cow    // dogCow is now equal to "🐶🐮"
    <-- // dogCow : String = "🐶🐮"

.. TODO: revisit this example based on whether single quotes
   continue to return a UnicodeScalar,
   and in light of where we end up with characters vs scalars.
   This also raises the question of my use of the name 'scalar'
   when using for-in to iterate over someString.chars.
   I've used 'scalar' several times throughout the book.

.. _Operators_RemainderOperator:

Remainder Operator
~~~~~~~~~~~~~~~~~~

The :newTerm:`binary remainder operator` (``a % b``)
works out how many multiples of ``b`` will fit inside ``a``
and returns the value that is left over
(known as the :newTerm:`remainder`).

For example: to calculate ``9 % 4``,
you first work out how many ``4``\ s will fit inside ``9``:

.. image:: ../images/remainderInteger.png
    :width: 349
    :align: center

You can fit two ``4``\ s inside ``9``, as this illustration shows.
After doing so, there is a remainder of ``1`` left over (shown in orange).

In Swift, this would be written as:

.. testcode:: arithmeticOperators

    --> 9 % 4     // equals 1
    <-- // r5 : Int = 1

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

    --> -9 % 4    // equals -1
    <-- // r6 : Int = -1

Inserting ``-9`` and ``4`` into the equation gives:

``-9`` = (``4`` × ``-2``) + ``-1``

giving a remainder value of ``-1``.

The sign of ``b`` is ignored for negative values of ``b``.
This means that ``a % b`` and ``a % -b`` always give the same answer.

.. _Operators_FloatingPointRemainderCalculations:

Floating-Point Remainder Calculations
_____________________________________

Unlike the remainder operator in C and Objective-C,
Swift's remainder operator can also operate on floating-point numbers:

.. testcode:: arithmeticOperators

    --> 8 % 2.5   // equals 0.5
    <-- // r7 : Double = 0.5

In this example, ``8`` divided by ``2.5`` equals ``3``, with a remainder of ``0.5``,
so the remainder operator returns a ``Double`` value of ``0.5``.

.. image:: ../images/remainderFloat.png
    :width: 311
    :align: center

.. _Operators_IncrementAndDecrementOperators:

Increment and Decrement Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Like C, Swift provides an :newTerm:`increment operator` (``++``)
and an :newTerm:`decrement operator` (``--``)
as a shorthand way to increase or decrease the value of a numeric variable by ``1``.
These operators can be used with named values of any integer or floating-point type.

.. testcode:: arithmeticOperators

    --> var i = 0
    <-- // i : Int = 0
    --> ++i        // i now equals 1
    <-- // r8 : Int = 1

Each time you call ``++i``, the value of ``i`` is increased by ``1``.
Essentially, ``++i`` is shorthand for saying ``i = i + 1``.
Likewise, ``--i`` can be used as shorthand for ``i = i - 1``.

``++`` and ``--`` can be used as prefix operators or as postfix operators.
``++i`` and ``i++`` are both valid ways to increase the value of ``i`` by ``1``.

Note that these operators modify ``i``, and also return a value.
If you only want to increment or decrement the value stored in ``i``,
you can choose to ignore the returned value.
However, if you *do* use the returned value,
it will be different based on whether you used the prefix or postfix
version of the operator:

* ``++i`` and ``--i`` modify ``i``, and return the *new* value
* ``i++`` and ``i--`` modify ``i``, and return the *old* value

This is important if you are using ``++`` or ``--`` to modify a variable
while also finding out its value:

.. testcode:: arithmeticOperators

    --> var a = 0
    <-- // a : Int = 0
    --> let b = ++a
    <-- // b : Int = 1
    >>> println("a is now \(a)")
    <<< a is now 1
    /// a and b are now both equal to 1
    --> let c = a++
    <-- // c : Int = 1
    >>> println("a is now \(a)")
    <<< a is now 2
    /// a is now equal to 2, but c has been set to the pre-increment value of 1

In the example above,
``let b = ++a`` sets ``b`` to the value of ``a``,
*after* it has been incremented.
This is why both ``a`` and ``b`` are equal to ``1``.

However, ``let c = a++`` sets ``c`` to the value of ``a`` *before* it is incremented.
The result is that ``c`` gets the old value of ``1``,
but ``a`` now equals ``2``.

Unless you need the specific behavior of ``i++``,
it is recommended that you use ``++i`` and ``--i`` in all cases,
because they have the typical expected behavior of modifying ``i``
and then returning the result.

.. QUESTION: is this good advice
   (given the general prevalence of i++ in the world),
   and indeed is it even advice we need to bother giving
   (given that lots of people might disagree or not care)?

.. QUESTION: if so, have I followed this advice throughout the book?

.. _Operators_UnaryMinusOperator:

Unary Minus Operator
~~~~~~~~~~~~~~~~~~~~

The sign of a numeric value can be toggled using a prefixed ``-``,
known as the :newTerm:`unary minus operator`:

.. testcode:: arithmeticOperators

    --> let three = 3
    <-- // three : Int = 3
    --> let minusThree = -three        // minusThree equals -3
    <-- // minusThree : Int = -3
    --> let plusThree = -minusThree    // plusThree equals 3, or "minus minus three"
    <-- // plusThree : Int = 3

The unary minus operator (``-``) is prepended directly before the value it operates on,
without any whitespace.

.. _Operators_UnaryPlusOperator:

Unary Plus Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`unary plus operator` (``+``) simply returns
the value it operates on, without any change:

.. testcode:: arithmeticOperators

    --> let minusSix = -6
    <-- // minusSix : Int = -6
    --> let alsoMinusSix = +minusSix   // alsoMinusSix equals -6
    <-- // alsoMinusSix : Int = -6

The unary plus operator doesn't actually do anything.
However, it can be used to provide symmetry in your code
when used alongside the unary minus operator.

.. _Operators_CompoundAssignmentOperators:

Compound Assignment Operators
-----------------------------

Like C, Swift provides :newTerm:`compound assignment operators` that combine assignment (``=``) with another operation.
One example is the :newTerm:`addition assignment operator` (``+=``):

.. testcode:: compoundAssignment

    --> var a = 1
    <-- // a : Int = 1
    --> a += 2     // a is now equal to 3
    >>> println("a is now equal to \(a)")
    <<< a is now equal to 3

The expression ``a += 2`` is shorthand for ``a = a + 2``.
Effectively, the addition and the assignment are combined into one operator
that performs both tasks at the same time.

.. note::

    The compound assignment operators do not return a value.
    You cannot write ``let b = a += 2``, for example.
    This behavior is different from the increment and decrement operators mentioned above.

A complete list of compound assignment operators can be found in the :doc:`../ReferenceManual/index`.

.. _Operators_ComparisonOperators:

Comparison Operators
--------------------

Swift supports all of the standard C :newTerm:`comparison operators`:

* Equal to (``a == b``)
* Not equal to (``a != b``)
* Greater than (``a > b``)
* Less than (``a < b``)
* Greater than or equal to (``a >= b``)
* Less than or equal to (``a <= b``)

.. TODO: we don't currently have identity and non-identity operators outside of Cocoa.
   It's been decided that these will be called === and !===,
   but they don't exist at present for Swift-pure classes.
   They should be added to this section if and when they are implemented.

These :newTerm:`identity operators` are used to test if two object named values both refer to the same object instance.
They are described in :doc:`ClassesAndStructures`.

Each of the comparison operators returns a ``Bool`` value to indicate whether or not the statement is true:

.. testcode:: comparisonOperators

    --> 1 == 1    // true, because 1 is equal to 1
    <-- // r0 : Bool = true
    --> 2 != 1    // true, because 2 is not equal to 1
    <-- // r1 : Bool = true
    --> 2 > 1     // true, because 2 is greater than 1
    <-- // r2 : Bool = true
    --> 1 < 2     // true, because 1 is less than 2
    <-- // r3 : Bool = true
    --> 1 >= 1    // true, because 1 is greater than or equal to 1
    <-- // r4 : Bool = true
    --> 2 <= 1    // false, because 2 is not less than or equal to 1
    <-- // r5 : Bool = false

Comparison operators are often used in conditional statements,
such as the ``if else`` statement:

.. testcode:: comparisonOperators

    --> let name = "world";
    <-- // name : String = "world"
    --> if name == "world" {
        println("hello, world")
    } else {
        println("I'm sorry \(name), but I don't recognize you")
    }
    <<< hello, world
    /// this will print "hello, world", because name is equal to "world"

The ``if else`` statement is described in more detail in :doc:`ControlFlow`.

.. TODO: which types do these operate on by default?
   How do they work with strings?
   How about with tuples / with your own types?

.. _Operators_TernaryConditionalOperator:

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

    --> let contentHeight = 40
    <-- // contentHeight : Int = 40
    --> let hasHeader = true
    <-- // hasHeader : Bool = true
    --> let rowHeight = contentHeight + (hasHeader ? 50 : 20)
    <-- // rowHeight : Int = 90
    >>> println("The row height is \(rowHeight) pixels.")
    <<< The row height is 90 pixels.
    /// rowHeight is now equal to 90

This is shorthand for:

.. testcode:: ternaryConditionalOperatorPart2

    --> let contentHeight = 40
    <-- // contentHeight : Int = 40
    --> let hasHeader = true
    <-- // hasHeader : Bool = true
    --> var rowHeight = contentHeight
    <-- // rowHeight : Int = 40
    --> if hasHeader {
        rowHeight = rowHeight + 50
    } else {
        rowHeight = rowHeight + 20
    }
    >>> println("The row height is \(rowHeight) pixels.")
    <<< The row height is 90 pixels.
    /// rowHeight is now equal to 90

The shorthand version is more concise,
and removes the need for ``rowHeight`` to be a variable named value
rather than a constant named value.

.. TODO: leave rowHeight uninitialized once the REPL allows uninitialized variables?

The ternary conditional operator provides
an efficient shorthand for deciding which of two expressions to consider.
The ternary conditional operator should be used with care, however.
It is very concise, but this conciseness can lead to hard-to-read code if overused.
Avoid combining multiple instances of the ternary conditional operator into one compound statement.

.. _Operators_RangeOperators:

Range Operators
---------------

Swift includes two :newTerm:`range operators`,
which provide shorthand ways to express a range of values.

.. _Operators_ClosedRangeOperator:

Closed Range Operator
~~~~~~~~~~~~~~~~~~~~~

The :newTerm:`closed range operator` (``a..b``)
defines a range that runs from ``a`` to ``b``,
and includes the values ``a`` and ``b``.

The closed range operator is useful when iterating over a range
in which you want all of the values to be used,
such as with a ``for``-``in`` loop:

.. testcode:: rangeOperators

    --> for index in 1..5 {
        println("\(index) times 5 is \(index * 5)")
    }
    <<< 1 times 5 is 5
    <<< 2 times 5 is 10
    <<< 3 times 5 is 15
    <<< 4 times 5 is 20
    <<< 5 times 5 is 25
    /// this will print…
    /// 1 times 5 is 5
    /// 2 times 5 is 10
    /// 3 times 5 is 15
    /// 4 times 5 is 20
    /// 5 times 5 is 25

``for``-``in`` loops are described in more detail in :doc:`ControlFlow`.

.. _Operators_HalfClosedRangeOperator:

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

    --> let names = ["Anna", "Brian", "Christine", "Daniel"]
    <-- // names : String[] = ["Anna", "Brian", "Christine", "Daniel"]
    --> let count = names.count
    <-- // count : Int = 4
    --> for i in 0...count {
        println("Person \(i + 1) is called \(names[i])")
    }
    <<< Person 1 is called Anna
    <<< Person 2 is called Brian
    <<< Person 3 is called Christine
    <<< Person 4 is called Daniel
    /// this will print…
    /// Person 1 is called Anna
    /// Person 2 is called Brian
    /// Person 3 is called Christine
    /// Person 4 is called Daniel

Note that the array contains four items,
but ``0...count`` only counts as far as ``3``
(the index of the last item in the array),
because it is a half-closed range.

.. _Operators_BitwiseOperators:

Bitwise Operators
-----------------

:newTerm:`Bitwise operators` enable you to manipulate the individual raw data bits within a data structure.
They are often used in low-level programming,
such as graphics programming and device driver creation.
They can also be useful when working with raw data from external sources,
integrating with electronics hardware,
and when encoding and decoding data for communication via a custom protocol.

Swift supports all of the bitwise operators found in C, as described below.

.. _Operators_BitwiseNOTOperator:

Bitwise NOT Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise NOT operator` (``~``) inverts all of the bits in a number:

.. image:: ../images/bitwiseNOT.png
    :width: 570
    :align: center

The bitwise NOT operator is a prefix operator,
and appears immediately before the value it operates on,
without any whitespace:

.. testcode:: bitwiseOperators

    --> let initialBits: UInt8 = 0b00001111
    <-- // initialBits : UInt8 = 15
    --> let invertedBits = ~initialBits  // equals 11110000
    <-- // invertedBits : UInt8 = 240

``UInt8`` integers have eight bits,
and can store any value between ``0`` and ``255``.
This example initializes a ``UInt8`` with the binary value ``00001111``,
which has its first four bits set to ``0``,
and its second four bits set to ``1``.
This is equivalent to a decimal value of ``15``.

The bitwise NOT operator is then used to create a new constant called ``invertedBits``,
which is equal to ``initialBits``,
but with all of the bits inverted.
Zeroes become ones, and ones become zeroes.
This gives a new value of ``11110000``,
which is equal to an unsigned decimal value of ``240``.

.. _Operators_BitwiseANDOperator:

Bitwise AND Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise AND operator` (``&``) combines the bits of two numbers.
It returns a new number whose bits are set to ``1`` only if the bits were equal to ``1`` in *both* input numbers:

.. image:: ../images/bitwiseAND.png
    :width: 570
    :align: center

For example:

.. testcode:: bitwiseOperators

    --> let firstSixBits: UInt8 = 0b11111100
    <-- // firstSixBits : UInt8 = 252
    --> let lastSixBits: UInt8  = 0b00111111
    <-- // lastSixBits : UInt8 = 63
    --> let middleFourBits = firstSixBits & lastSixBits  // equals 00111100
    <-- // middleFourBits : UInt8 = 60

The values of ``firstSixBits`` and ``lastSixBits`` both have their four middle bits equal to ``1``.
The bitwise AND operator combines them to make the number ``00111100``,
which is equal to an unsigned decimal value of ``60``.

.. _Operators_BitwiseOROperator:

Bitwise OR Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise OR operator` (``|``) compares the bits of two numbers,
and returns a new number whose bits are set to ``1``
if the bits were equal to ``1`` in *either* of the input numbers:

.. image:: ../images/bitwiseOR.png
    :width: 570
    :align: center

For example:

.. testcode:: bitwiseOperators

    --> let someBits: UInt8 = 0b10110010
    <-- // someBits : UInt8 = 178
    --> let moreBits: UInt8 = 0b01011110
    <-- // moreBits : UInt8 = 94
    --> let combinedbits = someBits | moreBits  // equals 11111110
    <-- // combinedbits : UInt8 = 254

The values of ``someBits`` and ``moreBits`` have different bits set to ``1``.
The bitwise OR operator combines them to make the number ``11111110``,
which equals an unsigned decimal of ``254``.

.. _Operators_BitwiseXOROperator:

Bitwise XOR Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise XOR operator` (``^``) compares the bits of two numbers,
and returns a new number whose bits are set to ``1`` where the input bits are different,
and ``0`` where the input bits are the same:

.. image:: ../images/bitwiseXOR.png
    :width: 570
    :align: center

For example:

.. testcode:: bitwiseOperators

    --> let firstBits: UInt8 = 0b00010100
    <-- // firstBits : UInt8 = 20
    --> let otherBits: UInt8 = 0b00000101
    <-- // otherBits : UInt8 = 5
    --> let outputBits = firstBits ^ otherBits  // equals 00010001
    <-- // outputBits : UInt8 = 17

.. TODO: Explain how this can be useful to toggle just a few bits in a bitfield.

.. note::

    “XOR” is pronounced “exclusive OR”.

.. _Operators_BitwiseLeftAndRightShifts:

Bitwise Left and Right Shifts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise left shift operator` (``<<``) and :newTerm:`bitwise right shift operator` (``>>``)
move all of the bits in a number to the left or the right by a certain number of places,
according to the rules defined below.

Bitwise left and right shifts have the effect of multiplying (or dividing) an integer number by a factor of two.
Shifting an integer's bits to the left by one position doubles its value,
whereas shifting it to the right by one position halves its value.

.. TODO: mention the caveats to this claim.

.. _Operators_ShiftingBehaviorForUnsignedIntegers:

Shifting Behavior for Unsigned Integers
_______________________________________

The bit-shifting behavior for unsigned integers is as follows:

1. Existing bits are moved to the left or right by the requested number of places.
2. Any bits that fall off the edge of the integer's storage are discarded.
3. Zeroes are inserted in the spaces left behind.

This approach is known as a :newTerm:`logical shift`.

The illustration below shows the results of ``11111111 << 1``
(which is ``11111111`` shifted to the left by ``1`` place),
and ``11111111 >> 1``
(which is ``11111111`` shifted to the right by ``1`` place).
Blue numbers have been shifted,
gray numbers have been discarded,
and orange zeroes have been inserted:

.. image:: ../images/bitshiftUnsigned.png
    :width: 639
    :align: center

Here's how bit shifting looks in Swift code:

.. testcode:: bitwiseShiftOperators

    --> let shiftBits: UInt8 = 4    // 00000100 in binary
    <-- // shiftBits : UInt8 = 4
    --> shiftBits << 1              // 00001000
    <-- // r0 : UInt8 = 8
    --> shiftBits << 2              // 00010000
    <-- // r1 : UInt8 = 16
    --> shiftBits << 5              // 10000000
    <-- // r2 : UInt8 = 128
    --> shiftBits << 6              // 00000000
    <-- // r3 : UInt8 = 0
    --> shiftBits >> 2              // 00000001
    <-- // r4 : UInt8 = 1

Bit shifting can be used to encode and decode values within other data types:

.. testcode:: bitwiseShiftOperators

    --> let pink: UInt32 = 0xCC6699
    <-- // pink : UInt32 = 13395609
    --> let redComponent = (pink & 0xFF0000) >> 16     // redComponent now equals 204
    <-- // redComponent : UInt32 = 204
    --> let greenComponent = (pink & 0x00FF00) >> 8    // greenComponent now equals 102
    <-- // greenComponent : UInt32 = 102
    --> let blueComponent = pink & 0x0000FF            // blueComponent now equals 153
    <-- // blueComponent : UInt32 = 153

This example uses a ``UInt32`` constant called ``pink`` to store a
Cascading Style Sheets color value for the color pink.
Here, the CSS color value ``#CC6699`` is written as ``0xCC6699`` in Swift's hexadecimal number representation.
This color is then decomposed into its red (``CC``), green (``66``) and blue (``99``) components
using the bitwise AND operator (``&``) and the bitwise right shift operator (``>>``).

The red component is obtained by performing a bitwise AND
between the numbers ``0xCC6699`` and ``0xFF0000``.
The zeroes in ``0xFF0000`` effectively “mask” the second and third bytes of ``0xCC6699``,
causing the ``6699`` to be ignored and leaving ``0xCC0000`` as the result.

This number is then shifted 16 places to the right (``>> 16``).
Each pair of characters in a hexadecimal number uses 8 bits,
so a move 16 places to the right will convert ``0xCC0000`` into ``0x0000CC``.
This is the same as ``0xCC``, which has a decimal value of ``204``.

Similarly, the green component is obtained by performing a bitwise AND
between the numbers ``0xCC6699`` and ``0x00FF00``,
which gives an output value of ``0x006600``.
This output value is then shifted eight places to the right,
giving a a value of ``0x66``, which has a decimal value of ``102``.

Finally, the blue component is obtained by performing a bitwise AND
between the numbers ``0xCC6699`` and ``0x0000FF``,
which gives an output value of ``0x000099``.
There's no need to shift this to the right,
as ``0x000099`` already equals ``0x99``,
which has a decimal value of ``153``.

.. admonition:: Experiment

    Try removing the parentheses around ``(pink & 0xFF0000)`` and ``(pink & 0x00FF00)``.
    Why do the values of ``redComponent`` and ``greenComponent`` change?
    Why do you then get same value of ``153`` for all three components?

.. QUESTION: I've used UInt32 values here,
   but this would also work with an inferred Int.
   Which is a better example? (I've chosen not to use Int so far,
   as this section is about unsigned shifts.)

.. _Operators_ShiftingBehaviorForSignedIntegers:

Shifting Behavior for Signed Integers
_____________________________________

The shifting behavior is slightly more involved for signed integers,
due to the way that they are represented in binary.
(The examples below are based on 8-bit signed integers for simplicity,
but the same principles apply for signed integers of any size.)

Signed integers use their first bit (known as the :newTerm:`sign bit`)
to indicate whether the integer is positive or negative.
A sign bit of ``0`` means positive, and a sign bit of ``1`` means negative.

The remaining bits (known as the :newTerm:`value bits`) are then used to store the actual value.
Positive numbers are stored in exactly the same way as for unsigned integers,
counting upwards from ``0``.
Here's how the bits inside an ``Int8`` look for the number ``4``:

.. image:: ../images/bitshiftSignedFour.png
    :width: 388
    :align: center

The sign bit is ``0`` (meaning “positive”),
and the seven value bits are just the number ``4``,
written in binary notation.

Negative numbers, however, are stored differently.
They are stored by subtracting their absolute value from ``2`` to the power of ``n``,
where ``n`` is the number of value bits.
In an eight-bit number, we have seven value bits,
so this means ``2`` to the power of ``7``, or ``128``.

Here's how the bits inside an ``Int8`` look for the number ``-4``:

.. image:: ../images/bitshiftSignedMinusFour.png
    :width: 388
    :align: center

This time, the sign bit is ``1`` (meaning “negative”),
and the seven value bits actually have a binary value of ``124`` (which is ``128 - 4``):

.. image:: ../images/bitshiftSignedMinusFourValue.png
    :width: 388
    :align: center

The encoding used for negative numbers is known as a :newTerm:`two's complement` representation.
It may seem an unusual way to represent negative numbers,
but it has several advantages.

Firstly, it means you can add ``-1`` to ``-4``,
just by performing a standard binary addition of all eight bits
(including the sign bit),
and discarding anything that doesn't fit in the eight bits once you're done:

.. image:: ../images/bitshiftSignedAddition.png
    :width: 445
    :align: center

The two's complement representation also means that you can
shift the bits of negative numbers to the left and right just like positive numbers,
and still end up doubling them for every shift you make to the left,
or halving them for every shift you make to the right.
To achieve this, an extra rule is used when shifting signed integers to the right:

* When shifting to the right,
  apply the same rules as for unsigned integers,
  but fill any empty bits on the left with the *sign bit*,
  rather than with a zero.

.. image:: ../images/bitshiftSigned.png
    :width: 639
    :align: center

This ensures that signed integers have the same sign after they are shifted to the right,
and is known as an :newTerm:`arithmetic shift`.

Because of the special way that positive and negative numbers are stored,
shifting either of them to the right has the effect of moving them closer to zero.
Keeping the sign bit the same during this shift means that
negative integers remain negative as their value moves closer to zero.

.. _Operators_OverflowOperators:

Overflow Operators
------------------

An error will be thrown if you try to insert a number into an integer named value that cannot hold that value.
This gives extra safety when working with numbers that are too large or too small.

For example, the ``Int16`` integer type can hold any signed integer number between ``-32768`` and ``32767``.
If you try and set a ``UInt16`` named value to a number outside of this range,
an error is thrown:

.. testcode:: overflowOperatorsWillFailToOverflow

    --> var potentialOverflow = Int16.max
    <-- // potentialOverflow : Int16 = 32767
    --> potentialOverflow += 1                  // this will trigger an error
    xxx overflow

.. TODO: change the error text we detect here
   once overflowing provides an error message rather than just an assert.

Throwing an error in these scenarios is much safer than allowing an outsized value to overflow.
Providing error handling when values get too large or too small
gives you much more flexibility when coding for boundary value conditions.

However, in the cases where you specifically want an overflow condition
to truncate the number of available bits,
you can opt in to this behavior rather than triggering an error.
Swift provides five arithmetic :newTerm:`overflow operators` that opt in to
the overflow behavior for integer calculations.
These operators all begin with an ampersand (``&``):

* Overflow addition (``&+``)
* Overflow subtraction (``&-``)
* Overflow multiplication (``&*``)
* Overflow division (``&/``)
* Overflow remainder (``&%``)

.. _Operators_ValueOverflow:

Value Overflow
~~~~~~~~~~~~~~

Here's an example of what happens when an unsigned value is allowed to overflow,
using the overflow addition operator (``&+``):

.. testcode:: overflowOperatorsWillOverflow

    --> var willOverflow = UInt8.max
    <-- // willOverflow : UInt8 = 255
    /// willOverflow equals 255, which is the largest value a UInt8 can hold
    --> willOverflow = willOverflow &+ 1
    >>> println("willOverflow is now \(willOverflow)")
    <<< willOverflow is now 0
    /// willOverflow is now equal to 0

Here, the variable ``willOverflow`` is initialized with the largest value a ``UInt8`` can hold
(``255``, or ``11111111`` in binary).
It is then incremented by ``1`` using the overflow addition operator (``&+``).
This pushes its binary representation just over the size that a ``UInt8`` can hold,
causing it to overflow beyond its bounds,
as shown in the diagram below.
The value that remains within the bounds of the ``UInt8`` after the overflow addition is ``00000000``, or zero:

.. image:: ../images/overflowAddition.png
    :width: 390
    :align: center

.. _Operators_ValueUnderflow:

Value Underflow
~~~~~~~~~~~~~~~

Numbers can also become too small to fit in their type's maximum bounds.
Here's an example.

The *smallest* value that a UInt8 can hold is ``0`` (which is ``00000000`` in eight-bit binary form).
If you subtract ``1`` from ``00000000`` using the overflow subtraction operator,
the number will overflow back round to ``11111111``,
or ``255`` in decimal:

.. image:: ../images/overflowUnsignedSubtraction.png
    :width: 419
    :align: center

Here's how that looks in Swift code:

.. testcode:: overflowOperatorsWillUnderflow

    --> var willUnderflow = UInt8.min
    <-- // willUnderflow : UInt8 = 0
    /// willUnderflow equals 0, which is the smallest value a UInt8 can hold
    --> willUnderflow = willUnderflow &- 1
    >>> println("willUnderflow is now \(willUnderflow)")
    <<< willUnderflow is now 255
    /// willOverflow is now equal to 255

A similar underflow happens for signed integers.
As described under :ref:`Operators_BitwiseLeftAndRightShifts`,
all subtraction for signed integers is performed as straight binary subtraction,
with the sign bit included as part of the numbers being subtracted.
The smallest number that an ``Int8`` can hold is ``-128``,
which is ``10000000`` in binary.
Subtracting ``1`` from this binary number with the overflow operator gives a binary value of ``01111111``,
which toggles the sign bit and gives positive ``127``,
the largest positive value that an ``Int8`` can hold:

.. image:: ../images/overflowSignedSubtraction.png
    :width: 419
    :align: center

Here's the same thing in Swift code:

.. testcode:: overflowOperatorsWillUnderflow

    --> var signedUnderflow = Int8.min
    <-- // signedUnderflow : Int8 = -128
    /// signedUnderflow equals -128, which is the smallest value an Int8 can hold
    --> signedUnderflow = signedUnderflow &- 1
    >>> println("signedUnderflow is now \(signedUnderflow)")
    <<< signedUnderflow is now 127
    /// signedUnderflow is now equal to 127

The end result of the overflow and underflow behavior described above is that for both signed and unsigned integers,
overflow always wraps around from the largest valid integer value back to the smallest,
and underflow always wraps around from the smallest value to the largest.

.. _Operators_DivisionByZero:

Division by Zero
~~~~~~~~~~~~~~~~

Normally, if you divide a number by zero (i / 0),
or try to calculate remainder by zero (i % 0),
Swift will throw an error:

.. testcode:: overflowOperatorsDivZeroError

    --> let x = 1
    <-- // x : Int = 1
    --> let y = x / 0
    xxx division by zero
    /// this will cause an error
 
However, the overflow versions of these operators (``&/`` and ``&%``)
return a value of zero if you divide by zero:

.. testcode:: overflowOperatorsAllowedDivZero

    --> let x = 1
    <-- // x : Int = 1
    /// x is now equal to 1
    --> let y = x &/ 0
    <-- // y : Int = 0
    /// y is now equal to 0

.. NOTE: currently, this testcode block must be the last in the overflowOperators group,
   as otherwise the stack trace crash from the division-by-zero will mean that
   subsequent blocks in the group won't get tested.

.. TODO: update this example code to check for a true error,
   rather than a stack trace,
   once rdar://15804939 has been fixed.

.. _Operators_LogicalOperators:

Logical Operators
-----------------

.. TODO: write an introduction to this section.

.. _Operators_LogicalNOTOperator:

Logical NOT Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`logical NOT operator` (``!a``) inverts a Boolean value so that ``true`` becomes ``false``,
and ``false`` becomes ``true``.

The logical NOT operator is a prefix operator,
and appears immediately before the value it operates on,
without any whitespace.
It can be read as “not ``a``”, as seen in the following example:

.. testcode:: logicalOperators

    --> let allowedEntry = false
    <-- // allowedEntry : Bool = false
    --> if !allowedEntry {
        println("ACCESS DENIED")
    }
    <<< ACCESS DENIED
    /// this will print "ACCESS DENIED"

The phrase ``if !allowedEntry`` can be read as “if not allowed entry”.
The subsequent line is only executed if “not allowed entry” is true,
i.e. if ``allowedEntry`` is ``false``.

As in this example,
careful choice of Boolean constant and variable names
can help to keep code readable and concise,
while avoiding double negatives or confusing logic statements.

.. _Operators_LogicalANDOperator:

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

    --> let enteredDoorCode = true
    <-- // enteredDoorCode : Bool = true
    --> let passedRetinaScan = false
    <-- // passedRetinaScan : Bool = false
    --> if enteredDoorCode && passedRetinaScan {
        println("Welcome!")
    } else {
        println("ACCESS DENIED")
    }
    <<< ACCESS DENIED
    /// this will print "ACCESS DENIED"

.. _Operators_LogicalOROperator:

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

    --> let hasDoorKey = false
    <-- // hasDoorKey : Bool = false
    --> let knowsOverridePassword = true
    <-- // knowsOverridePassword : Bool = true
    --> if hasDoorKey || knowsOverridePassword {
        println("Welcome!")
    } else {
        println("ACCESS DENIED")
    }
    <<< Welcome!
    /// this will print "Welcome!"

In this example,
the first ``Bool`` value (``hasDoorKey``) is ``false``,
but the second value (``knowsOverridePassword``) is ``true``.
Because one value is ``true``,
the overall expression also equates to ``true``,
and access is allowed.

.. _Operators_CombiningLogicalOperators:

Combining Logical Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can combine multiple logical operators to create longer compound expressions:

.. testcode:: logicalOperators

    --> if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
        println("Welcome!")
    } else {
        println("ACCESS DENIED")
    }
    <<< Welcome!
    /// this will print "Welcome!"

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

.. _Operators_PrecedenceAndAssociativity:

Precedence and Associativity
----------------------------

.. QUESTION: Could precedence and associativity be made clear
   as part of the hypothetical “show invisibles” feature,
   to show the invisible parentheses implied by precedence and associativity?

It is important to consider each operator's :newTerm:`precedence` and :newTerm:`associativity` when working out how to calculate a compound expression.
These two principles are used to work out the order in which an expression should be calculated.

Here's an example.
Why does the following expression equal ``4``?

.. testcode:: evaluationOrder

    --> 2 + 3 * 4 % 5
    <-- // r0 : Int = 4
    /// this equals 4

Taken strictly from left to right, you might expect this to read as follows:

* 2 plus 3 equals 5;
* 5 times 4 equals 20;
* 20 remainder 5 equals 0

However, the actual answer is ``4``, not ``0``.
This is due to the priorities and associativity of the operators used:

* Operator :newTerm:`precedence` (also known as :newTerm:`priority`) means that
  some operators are given more precedence than others,
  and are calculated first.

* Operator :newTerm:`associativity` defines how operators of the same precedence
  are grouped together (or :newTerm:`associated`) –
  either grouped from the left, or grouped from the right.
  Think of it as meaning “they associate with the expression to their left”,
  or “they associate with the expression to their right”.

Here's how the actual evaluation order is calculated for the example above.
Precedence is considered first.
Higher-precedence operators are evaluated before lower-precedence ones.
In Swift, as in C,
the multiplication operator (``*``) and the remainder operator (``%``)
have a higher precedence than the addition operator (``+``).
As a result, they are both evaluated before the addition is considered.

However, multiplication and remainder happen to have the *same* precedence as each other.
To work out the exact evaluation order to use,
we therefore need to also look at their associativity.
Multiplication and remainder both associate with the expression to their left.
You can think of this as adding implicit parentheses around these parts of the expression,
starting from their left:

.. testcode:: evaluationOrder

    --> 2 + ((3 * 4) % 5)
    <-- // r1 : Int = 4

``(3 * 4)`` is ``12``, so this is equivalent to:

.. testcode:: evaluationOrder

    --> 2 + (12 % 5)
    <-- // r2 : Int = 4

``(12 % 5)`` is ``2``, so this is equivalent to:

.. testcode:: evaluationOrder

    --> 2 + 2
    <-- // r3 : Int = 4

This gives the final answer of ``4``.

A complete list of Swift operator precedences and associativity rules can be found in the :doc:`../ReferenceManual/index`.

.. note::

    Swift's operator precedences and associativity rules are simpler and more predictable
    than those found in C and Objective-C.
    However, this means that they are not the same as in C-based languages.
    Be careful to ensure that operator interactions still behave in the way you intend
    when porting existing code to Swift.

.. TODO: update this link to go to the specific section of the Reference Manual.

.. _Operators_Explicit Parentheses:

Explicit Parentheses
~~~~~~~~~~~~~~~~~~~~

Precedence and associativity define exactly one order of calculation
when multiple operators are used.
However, it can sometimes be useful to include parentheses anyway,
to make the intention of a complex expression easier to read.
In the door access example above,
it is useful to add parentheses around the first part of the compound expression:

.. testcode:: logicalOperators

    --> if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
        println("Welcome!")
    } else {
        println("ACCESS DENIED")
    }
    <<< Welcome!
    /// this will print "Welcome!"

The parentheses make it clear that the first two values
are being considered as part of a separate possible state in the overall logic.
The output of the compound expression doesn't change,
but the overall intention is clearer to the reader.
Readability is always preferred over brevity;
use parentheses where they help to make your intentions clear.

.. refnote:: References

    * https://[Internal Staging Server]/docs/LangRef.html#expr-assign
    * https://[Internal Staging Server]/docs/LangRef.html#expr-ternary
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-silent-truncation-or-undefined-behavior
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
    * http://en.wikipedia.org/wiki/Operator_(computer_programming)
    * /swift/stdlib/core/Policy.swift
