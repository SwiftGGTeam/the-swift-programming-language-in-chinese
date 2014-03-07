Advanced Operators
==================

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
    <<< // initialBits : UInt8 = 15
    --> let invertedBits = ~initialBits  // equals 11110000
    <<< // invertedBits : UInt8 = 240

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
    <<< // firstSixBits : UInt8 = 252
    --> let lastSixBits: UInt8  = 0b00111111
    <<< // lastSixBits : UInt8 = 63
    --> let middleFourBits = firstSixBits & lastSixBits  // equals 00111100
    <<< // middleFourBits : UInt8 = 60

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
    <<< // someBits : UInt8 = 178
    --> let moreBits: UInt8 = 0b01011110
    <<< // moreBits : UInt8 = 94
    --> let combinedbits = someBits | moreBits  // equals 11111110
    <<< // combinedbits : UInt8 = 254

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
    <<< // firstBits : UInt8 = 20
    --> let otherBits: UInt8 = 0b00000101
    <<< // otherBits : UInt8 = 5
    --> let outputBits = firstBits ^ otherBits  // equals 00010001
    <<< // outputBits : UInt8 = 17

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
    <<< // shiftBits : UInt8 = 4
    --> shiftBits << 1              // 00001000
    <<< // r0 : UInt8 = 8
    --> shiftBits << 2              // 00010000
    <<< // r1 : UInt8 = 16
    --> shiftBits << 5              // 10000000
    <<< // r2 : UInt8 = 128
    --> shiftBits << 6              // 00000000
    <<< // r3 : UInt8 = 0
    --> shiftBits >> 2              // 00000001
    <<< // r4 : UInt8 = 1

Bit shifting can be used to encode and decode values within other data types:

.. testcode:: bitwiseShiftOperators

    --> let pink: UInt32 = 0xCC6699
    <<< // pink : UInt32 = 13395609
    --> let redComponent = (pink & 0xFF0000) >> 16     // redComponent is 0xCC, or 204
    <<< // redComponent : UInt32 = 204
    --> let greenComponent = (pink & 0x00FF00) >> 8    // greenComponent is 0x66, or 102
    <<< // greenComponent : UInt32 = 102
    --> let blueComponent = pink & 0x0000FF            // blueComponent is 0x99, or 153
    <<< // blueComponent : UInt32 = 153

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
    <<< // potentialOverflow : Int16 = 32767
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
    <<< // willOverflow : UInt8 = 255
    /-> willOverflow equals \(willOverflow), which is the largest value a UInt8 can hold
    <-/ willOverflow equals 255, which is the largest value a UInt8 can hold
    --> willOverflow = willOverflow &+ 1
    /-> willOverflow is now equal to \(willOverflow)
    <-/ willOverflow is now equal to 0

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
    <<< // willUnderflow : UInt8 = 0
    /-> willUnderflow equals \(willUnderflow), which is the smallest value a UInt8 can hold
    <-/ willUnderflow equals 0, which is the smallest value a UInt8 can hold
    --> willUnderflow = willUnderflow &- 1
    /-> willUnderflow is now equal to \(willUnderflow)
    <-/ willUnderflow is now equal to 255

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
    <<< // signedUnderflow : Int8 = -128
    /-> signedUnderflow equals \(signedUnderflow), which is the smallest value an Int8 can hold
    <-/ signedUnderflow equals -128, which is the smallest value an Int8 can hold
    --> signedUnderflow = signedUnderflow &- 1
    /-> signedUnderflow is now equal to \(signedUnderflow)
    <-/ signedUnderflow is now equal to 127

The end result of the overflow and underflow behavior described above is that for both signed and unsigned integers,
overflow always wraps around from the largest valid integer value back to the smallest,
and underflow always wraps around from the smallest value to the largest.

.. _Operators_DivisionByZero:

Division by Zero
~~~~~~~~~~~~~~~~

Dividing a number by zero (``i / 0``),
or trying to calculate remainder by zero (``i % 0``),
will cause an error:

.. testcode:: overflowOperatorsDivZeroError

    --> let x = 1
    <<< // x : Int = 1
    --> let y = x / 0
    xxx division by zero
    /// this causes an error
 
However, the overflow versions of these operators (``&/`` and ``&%``)
return a value of zero if you divide by zero:

.. testcode:: overflowOperatorsAllowedDivZero

    --> let x = 1
    <<< // x : Int = 1
    --> let y = x &/ 0
    <<< // y : Int = 0
    /-> y is equal to \(y)
    <-/ y is equal to 0

.. NOTE: currently, this testcode block must be the last in the overflowOperators group,
   as otherwise the stack trace crash from the division-by-zero will mean that
   subsequent blocks in the group won't get tested.

.. TODO: update this example code to check for a true error,
   rather than a stack trace,
   once rdar://15804939 has been fixed.

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
    <<< // r0 : Int = 4
    /-> this equals \(2 + 3 * 4 % 5)
    <-/ this equals 4

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
    <<< // r1 : Int = 4

``(3 * 4)`` is ``12``, so this is equivalent to:

.. testcode:: evaluationOrder

    --> 2 + (12 % 5)
    <<< // r2 : Int = 4

``(12 % 5)`` is ``2``, so this is equivalent to:

.. testcode:: evaluationOrder

    --> 2 + 2
    <<< // r3 : Int = 4

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
    <-- Welcome!

The parentheses make it clear that the first two values
are being considered as part of a separate possible state in the overall logic.
The output of the compound expression doesn't change,
but the overall intention is clearer to the reader.
Readability is always preferred over brevity;
use parentheses where they help to make your intentions clear.
