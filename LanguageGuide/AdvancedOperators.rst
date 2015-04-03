Advanced Operators
==================

In addition to the operators described in :doc:`BasicOperators`,
Swift provides several advanced operators that perform more complex value manipulation.
These include all of the bitwise and bit shifting operators you will be familiar with
from C and Objective-C.

Unlike arithmetic operators in C,
arithmetic operators in Swift do not overflow by default.
Overflow behavior is trapped and reported as an error.
To opt in to overflow behavior,
use Swift's second set of arithmetic operators that overflow by default,
such as the overflow addition operator (``&+``).
All of these overflow operators begin with an ampersand (``&``).

When you define your own structures, classes, and enumerations,
it can be useful to provide your own implementations of
the standard Swift operators for these custom types.
Swift makes it easy to provide tailored implementations of these operators
and to determine exactly what their behavior should be for each type you create.

You're not limited to the predefined operators.
Swift gives you the freedom to define your own custom
infix, prefix, postfix, and assignment operators,
with custom precedence and associativity values.
These operators can be used and adopted in your code like any of the predefined operators,
and you can even extend existing types to support the custom operators you define.

.. _AdvancedOperators_BitwiseOperators:

Bitwise Operators
-----------------

:newTerm:`Bitwise operators` enable you to manipulate
the individual raw data bits within a data structure.
They are often used in low-level programming,
such as graphics programming and device driver creation.
Bitwise operators can also be useful when you work with raw data from external sources,
such as encoding and decoding data for communication over a custom protocol.

Swift supports all of the bitwise operators found in C, as described below.

.. _AdvancedOperators_BitwiseNOTOperator:

Bitwise NOT Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise NOT operator` (``~``) inverts all bits in a number:

.. image:: ../images/bitwiseNOT_2x.png
   :align: center

The bitwise NOT operator is a prefix operator,
and appears immediately before the value it operates on,
without any white space:

.. testcode:: bitwiseOperators

   -> let initialBits: UInt8 = 0b00001111
   << // initialBits : UInt8 = 15
   -> let invertedBits = ~initialBits  // equals 11110000
   << // invertedBits : UInt8 = 240

``UInt8`` integers have eight bits
and can store any value between ``0`` and ``255``.
This example initializes a ``UInt8`` integer with the binary value ``00001111``,
which has its first four bits set to ``0``,
and its second four bits set to ``1``.
This is equivalent to a decimal value of ``15``.

The bitwise NOT operator is then used to create a new constant called ``invertedBits``,
which is equal to ``initialBits``,
but with all of the bits inverted.
Zeroes become ones, and ones become zeroes.
The value of ``invertedBits`` is ``11110000``,
which is equal to an unsigned decimal value of ``240``.

.. _AdvancedOperators_BitwiseANDOperator:

Bitwise AND Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise AND operator` (``&``) combines the bits of two numbers.
It returns a new number whose bits are set to ``1``
only if the bits were equal to ``1`` in *both* input numbers:

.. image:: ../images/bitwiseAND_2x.png
   :align: center

In the example below,
the values of ``firstSixBits`` and ``lastSixBits``
both have four middle bits equal to ``1``.
The bitwise AND operator combines them to make the number ``00111100``,
which is equal to an unsigned decimal value of ``60``:

.. testcode:: bitwiseOperators

   -> let firstSixBits: UInt8 = 0b11111100
   << // firstSixBits : UInt8 = 252
   -> let lastSixBits: UInt8  = 0b00111111
   << // lastSixBits : UInt8 = 63
   -> let middleFourBits = firstSixBits & lastSixBits  // equals 00111100
   << // middleFourBits : UInt8 = 60

.. _AdvancedOperators_BitwiseOROperator:

Bitwise OR Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise OR operator` (``|``) compares the bits of two numbers.
The operator returns a new number whose bits are set to ``1``
if the bits are equal to ``1`` in *either* input number:

.. image:: ../images/bitwiseOR_2x.png
   :align: center

In the example below,
the values of ``someBits`` and ``moreBits`` have different bits set to ``1``.
The bitwise OR operator combines them to make the number ``11111110``,
which equals an unsigned decimal of ``254``:

.. testcode:: bitwiseOperators

   -> let someBits: UInt8 = 0b10110010
   << // someBits : UInt8 = 178
   -> let moreBits: UInt8 = 0b01011110
   << // moreBits : UInt8 = 94
   -> let combinedbits = someBits | moreBits  // equals 11111110
   << // combinedbits : UInt8 = 254

.. _AdvancedOperators_BitwiseXOROperator:

Bitwise XOR Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise XOR operator`, or “exclusive OR operator” (``^``),
compares the bits of two numbers.
The operator returns a new number whose bits are set to ``1``
where the input bits are different
and are set to ``0`` where the input bits are the same:

.. image:: ../images/bitwiseXOR_2x.png
   :align: center

In the example below,
the values of ``firstBits`` and ``otherBits`` each have a bit set to ``1``
in a location that the other does not.
The bitwise XOR operator sets both of these bits to ``1`` in its output value.
All of the other bits in ``firstBits`` and ``otherBits`` match
and are set to ``0`` in the output value:

.. testcode:: bitwiseOperators

   -> let firstBits: UInt8 = 0b00010100
   << // firstBits : UInt8 = 20
   -> let otherBits: UInt8 = 0b00000101
   << // otherBits : UInt8 = 5
   -> let outputBits = firstBits ^ otherBits  // equals 00010001
   << // outputBits : UInt8 = 17

.. TODO: Explain how this can be useful to toggle just a few bits in a bitfield.

.. _AdvancedOperators_BitwiseLeftAndRightShiftOperators:

Bitwise Left and Right Shift Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :newTerm:`bitwise left shift operator` (``<<``)
and :newTerm:`bitwise right shift operator` (``>>``)
move all bits in a number to the left or the right by a certain number of places,
according to the rules defined below.

Bitwise left and right shifts have the effect of
multiplying or dividing an integer number by a factor of two.
Shifting an integer's bits to the left by one position doubles its value,
whereas shifting it to the right by one position halves its value.

.. TODO: mention the caveats to this claim.

.. _AdvancedOperators_ShiftingBehaviorForUnsignedIntegers:

Shifting Behavior for Unsigned Integers
_______________________________________

The bit-shifting behavior for unsigned integers is as follows:

1. Existing bits are moved to the left or right by the requested number of places.
2. Any bits that are moved beyond the bounds of the integer's storage are discarded.
3. Zeroes are inserted in the spaces left behind
   after the original bits are moved to the left or right.

This approach is known as a :newTerm:`logical shift`.

The illustration below shows the results of ``11111111 << 1``
(which is ``11111111`` shifted to the left by ``1`` place),
and ``11111111 >> 1``
(which is ``11111111`` shifted to the right by ``1`` place).
Blue numbers are shifted,
gray numbers are discarded,
and orange zeroes are inserted:

.. image:: ../images/bitshiftUnsigned_2x.png
   :align: center

Here's how bit shifting looks in Swift code:

.. testcode:: bitwiseShiftOperators

   -> let shiftBits: UInt8 = 4   // 00000100 in binary
   << // shiftBits : UInt8 = 4
   -> shiftBits << 1             // 00001000
   << // r0 : UInt8 = 8
   -> shiftBits << 2             // 00010000
   << // r1 : UInt8 = 16
   -> shiftBits << 5             // 10000000
   << // r2 : UInt8 = 128
   -> shiftBits << 6             // 00000000
   << // r3 : UInt8 = 0
   -> shiftBits >> 2             // 00000001
   << // r4 : UInt8 = 1

You can use bit shifting to encode and decode values within other data types:

.. testcode:: bitwiseShiftOperators

   -> let pink: UInt32 = 0xCC6699
   << // pink : UInt32 = 13395609
   -> let redComponent = (pink & 0xFF0000) >> 16    // redComponent is 0xCC, or 204
   << // redComponent : UInt32 = 204
   -> let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent is 0x66, or 102
   << // greenComponent : UInt32 = 102
   -> let blueComponent = pink & 0x0000FF           // blueComponent is 0x99, or 153
   << // blueComponent : UInt32 = 153

This example uses a ``UInt32`` constant called ``pink`` to store a
Cascading Style Sheets color value for the color pink.
The CSS color value ``#CC6699`` is written as
``0xCC6699`` in Swift's hexadecimal number representation.
This color is then decomposed into its
red (``CC``), green (``66``), and blue (``99``) components
by the bitwise AND operator (``&``) and the bitwise right shift operator (``>>``).

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
giving a value of ``0x66``, which has a decimal value of ``102``.

Finally, the blue component is obtained by performing a bitwise AND
between the numbers ``0xCC6699`` and ``0x0000FF``,
which gives an output value of ``0x000099``.
There's no need to shift this to the right,
as ``0x000099`` already equals ``0x99``,
which has a decimal value of ``153``.

.. QUESTION: I've used UInt32 values here,
   but this would also work with an inferred Int.
   Which is a better example? (I've chosen not to use Int so far,
   as this section is about unsigned shifts.)

.. _AdvancedOperators_ShiftingBehaviorForSignedIntegers:

Shifting Behavior for Signed Integers
_____________________________________

The shifting behavior is more complex for signed integers than for unsigned integers,
because of the way signed integers are represented in binary.
(The examples below are based on 8-bit signed integers for simplicity,
but the same principles apply for signed integers of any size.)

Signed integers use their first bit (known as the :newTerm:`sign bit`)
to indicate whether the integer is positive or negative.
A sign bit of ``0`` means positive, and a sign bit of ``1`` means negative.

The remaining bits (known as the :newTerm:`value bits`) store the actual value.
Positive numbers are stored in exactly the same way as for unsigned integers,
counting upwards from ``0``.
Here's how the bits inside an ``Int8`` look for the number ``4``:

.. image:: ../images/bitshiftSignedFour_2x.png
   :align: center

The sign bit is ``0`` (meaning “positive”),
and the seven value bits are just the number ``4``,
written in binary notation.

Negative numbers, however, are stored differently.
They are stored by subtracting their absolute value from ``2`` to the power of ``n``,
where ``n`` is the number of value bits.
An eight-bit number has seven value bits,
so this means ``2`` to the power of ``7``, or ``128``.

Here's how the bits inside an ``Int8`` look for the number ``-4``:

.. image:: ../images/bitshiftSignedMinusFour_2x.png
   :align: center

This time, the sign bit is ``1`` (meaning “negative”),
and the seven value bits have a binary value of ``124`` (which is ``128 - 4``):

.. image:: ../images/bitshiftSignedMinusFourValue_2x.png
   :align: center

The encoding for negative numbers is known as a :newTerm:`two's complement` representation.
It may seem an unusual way to represent negative numbers,
but it has several advantages.

First, you can add ``-1`` to ``-4``,
simply by performing a standard binary addition of all eight bits
(including the sign bit),
and discarding anything that doesn't fit in the eight bits once you're done:

.. image:: ../images/bitshiftSignedAddition_2x.png
   :align: center

Second, the two's complement representation also lets you
shift the bits of negative numbers to the left and right like positive numbers,
and still end up doubling them for every shift you make to the left,
or halving them for every shift you make to the right.
To achieve this, an extra rule is used when signed integers are shifted to the right:

* When you shift signed integers to the right,
  apply the same rules as for unsigned integers,
  but fill any empty bits on the left with the *sign bit*,
  rather than with a zero.

.. image:: ../images/bitshiftSigned_2x.png
   :align: center

This action ensures that signed integers have the same sign after they are shifted to the right,
and is known as an :newTerm:`arithmetic shift`.

Because of the special way that positive and negative numbers are stored,
shifting either of them to the right moves them closer to zero.
Keeping the sign bit the same during this shift means that
negative integers remain negative as their value moves closer to zero.

.. _AdvancedOperators_OverflowOperators:

Overflow Operators
------------------

If you try to insert a number into an integer constant or variable
that cannot hold that value,
by default Swift reports an error rather than allowing an invalid value to be created.
This behavior gives extra safety when you work with numbers that are too large or too small.

For example, the ``Int16`` integer type can hold
any signed integer number between ``-32768`` and ``32767``.
Trying to set an ``Int16`` constant or variable to a number outside of this range
causes an error:

.. testcode:: overflowOperatorsWillFailToOverflow

   -> var potentialOverflow = Int16.max
   << // potentialOverflow : Int16 = 32767
   /> potentialOverflow equals \(potentialOverflow), which is the maximum value an Int16 can hold
   </ potentialOverflow equals 32767, which is the maximum value an Int16 can hold
   -> potentialOverflow += 1
   xx overflow
   // this causes an error

.. FIXME: change the error text we detect here
   once overflowing provides an error message rather than just an assert.

Providing error handling when values get too large or too small
gives you much more flexibility when coding for boundary value conditions.

However, when you specifically want an overflow condition
to truncate the number of available bits,
you can opt in to this behavior rather than triggering an error.
Swift provides three arithmetic :newTerm:`overflow operators` that opt in to
the overflow behavior for integer calculations.
These operators all begin with an ampersand (``&``):

* Overflow addition (``&+``)
* Overflow subtraction (``&-``)
* Overflow multiplication (``&*``)

.. _AdvancedOperators_ValueOverflow:

Value Overflow
~~~~~~~~~~~~~~

Numbers can overflow in both the positive and negative direction.

Here's an example of what happens when
an unsigned integer is allowed to overflow in the positive direction,
using the overflow addition operator (``&+``):

.. testcode:: overflowOperatorsWillOverflowInPositiveDirection

   -> var unsignedOverflow = UInt8.max
   << // unsignedOverflow : UInt8 = 255
   /> unsignedOverflow equals \(unsignedOverflow), which is the maximum value a UInt8 can hold
   </ unsignedOverflow equals 255, which is the maximum value a UInt8 can hold
   -> unsignedOverflow = unsignedOverflow &+ 1
   /> unsignedOverflow is now equal to \(unsignedOverflow)
   </ unsignedOverflow is now equal to 0

The variable ``unsignedOverflow`` is initialized with the maximum value a ``UInt8`` can hold
(``255``, or ``11111111`` in binary).
It is then incremented by ``1`` using the overflow addition operator (``&+``).
This pushes its binary representation just over the size that a ``UInt8`` can hold,
causing it to overflow beyond its bounds,
as shown in the diagram below.
The value that remains within the bounds of the ``UInt8``
after the overflow addition is ``00000000``, or zero:

.. image:: ../images/overflowAddition_2x.png
   :align: center

Something similar happens when
an unsigned integer is allowed to overflow in the negative direction.
Here's an example using the overflow subtraction operator (``&-``):

The minimum value that a ``UInt8`` can hold is zero,
or ``00000000`` in binary.
If you subtract ``1`` from ``00000000`` using the overflow subtraction operator (``&-``),
the number will overflow and wrap around to ``11111111``,
or ``255`` in decimal:

.. testcode:: overflowOperatorsWillOverflowInNegativeDirection

   -> var unsignedOverflow = UInt8.min
   << // unsignedOverflow : UInt8 = 0
   /> unsignedOverflow equals \(unsignedOverflow), which is the minimum value a UInt8 can hold
   </ unsignedOverflow equals 0, which is the minimum value a UInt8 can hold
   -> unsignedOverflow = unsignedOverflow &- 1
   /> unsignedOverflow is now equal to \(unsignedOverflow)
   </ unsignedOverflow is now equal to 255

.. image:: ../images/overflowUnsignedSubtraction_2x.png
   :align: center

Overflow also occurs for signed integers.
All addition and subtraction for signed integers is performed in bitwise fashion,
with the sign bit included as part of the numbers being added or subtracted,
as described in :ref:`AdvancedOperators_BitwiseLeftAndRightShiftOperators`.
For example, the minimum value that an ``Int8`` can hold is ``-128``,
or ``10000000`` in binary.
Subtracting ``1`` from this binary number with the overflow operator
gives a binary value of ``01111111``,
which toggles the sign bit and gives positive ``127``,
the maximum positive value that an ``Int8`` can hold:

.. image:: ../images/overflowSignedSubtraction_2x.png
   :align: center

Here's the same thing in Swift code:

.. testcode:: overflowOperatorsWillOverflowSigned

   -> var signedOverflow = Int8.min
   << // signedOverflow : Int8 = -128
   /> signedOverflow equals \(signedOverflow), which is the minimum value an Int8 can hold
   </ signedOverflow equals -128, which is the minimum value an Int8 can hold
   -> signedOverflow = signedOverflow &- 1
   /> signedOverflow is now equal to \(signedOverflow)
   </ signedOverflow is now equal to 127

The end result of the overflow behavior described above
is that for both signed and unsigned integers,
Overflow in the positive direction
wraps around from the maximum valid integer value back to the minimum,
and overflow in the negative direction
wraps around from the minimum value to the maximum.


.. _AdvancedOperators_PrecedenceAndAssociativity:

Precedence and Associativity
----------------------------

Operator :newTerm:`precedence` gives some operators higher priority than others;
these operators are applied first.

Operator :newTerm:`associativity` defines how operators of the same precedence
are grouped together (or :newTerm:`associated`) ---
either grouped from the left, or grouped from the right.
Think of it as meaning “they associate with the expression to their left,”
or “they associate with the expression to their right.”

It is important to consider
each operator's precedence and associativity
when working out the order in which a compound expression will be calculated.
Here's an example.
Why does the following expression equal ``4``?

.. testcode:: evaluationOrder

   -> 2 + 3 * 4 % 5
   << // r0 : Int = 4
   /> this equals \(2 + 3 * 4 % 5)
   </ this equals 4

Taken strictly from left to right, you might expect this to read as follows:

* 2 plus 3 equals 5;
* 5 times 4 equals 20;
* 20 remainder 5 equals 0

However, the actual answer is ``4``, not ``0``.
Higher-precedence operators are evaluated before lower-precedence ones.
In Swift, as in C,
the multiplication operator (``*``) and the remainder operator (``%``)
have a higher precedence than the addition operator (``+``).
As a result, they are both evaluated before the addition is considered.

However, multiplication and remainder have the *same* precedence as each other.
To work out the exact evaluation order to use,
you also need to consider their associativity.
Multiplication and remainder both associate with the expression to their left.
Think of this as adding implicit parentheses around these parts of the expression,
starting from their left:

.. testcode:: evaluationOrder

   -> 2 + ((3 * 4) % 5)
   << // r1 : Int = 4

``(3 * 4)`` is ``12``, so this is equivalent to:

.. testcode:: evaluationOrder

   -> 2 + (12 % 5)
   << // r2 : Int = 4

``(12 % 5)`` is ``2``, so this is equivalent to:

.. testcode:: evaluationOrder

   -> 2 + 2
   << // r3 : Int = 4

This calculation yields the final answer of ``4``.

For a complete list of Swift operator precedences and associativity rules, see  :doc:`../ReferenceManual/Expressions`.

.. note::

   Swift's operator precedences and associativity rules are simpler and more predictable
   than those found in C and Objective-C.
   However, this means that they are not the same as in C-based languages.
   Be careful to ensure that operator interactions still behave in the way you intend
   when porting existing code to Swift.

.. _AdvancedOperators_OperatorFunctions:

Operator Functions
------------------

Classes and structures can provide their own implementations of existing operators.
This is known as :newTerm:`overloading` the existing operators.

The example below shows how to implement
the arithmetic addition operator (``+``) for a custom structure.
The arithmetic addition operator is a :newTerm:`binary operator`
because it operates on two targets
and is said to be :newTerm:`infix` because it appears in between those two targets.

The example defines a ``Vector2D`` structure for
a two-dimensional position vector ``(x, y)``,
followed by a definition of an :newTerm:`operator function`
to add together instances of the ``Vector2D`` structure:

.. testcode:: customOperators

   -> struct Vector2D {
         var x = 0.0, y = 0.0
      }
   -> func + (left: Vector2D, right: Vector2D) -> Vector2D {
         return Vector2D(x: left.x + right.x, y: left.y + right.y)
      }

The operator function is defined as a global function
with a function name that matches the operator to be overloaded (``+``).
Because the arithmetic addition operator is a binary operator,
this operator function takes two input parameters of type ``Vector2D``
and returns a single output value, also of type ``Vector2D``.

In this implementation, the input parameters are named ``left`` and ``right``
to represent the ``Vector2D`` instances that will be on
the left side and right side of the ``+`` operator.
The function returns a new ``Vector2D`` instance,
whose ``x`` and ``y`` properties are
initialized with the sum of the ``x`` and ``y`` properties from
the two ``Vector2D`` instances that are added together.

The function is defined globally, rather than as a method on the ``Vector2D`` structure,
so that it can be used as an infix operator between existing ``Vector2D`` instances:

.. testcode:: customOperators

   -> let vector = Vector2D(x: 3.0, y: 1.0)
   << // vector : Vector2D = REPL.Vector2D
   -> let anotherVector = Vector2D(x: 2.0, y: 4.0)
   << // anotherVector : Vector2D = REPL.Vector2D
   -> let combinedVector = vector + anotherVector
   << // combinedVector : Vector2D = REPL.Vector2D
   /> combinedVector is a Vector2D instance with values of (\(combinedVector.x), \(combinedVector.y))
   </ combinedVector is a Vector2D instance with values of (5.0, 5.0)

This example adds together the vectors ``(3.0, 1.0)`` and ``(2.0, 4.0)``
to make the vector ``(5.0, 5.0)``, as illustrated below.

.. image:: ../images/vectorAddition_2x.png
   :align: center

.. _AdvancedOperators_PrefixAndPostfixOperators:

Prefix and Postfix Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The example shown above demonstrates a custom implementation of a binary infix operator.
Classes and structures can also provide implementations
of the standard :newTerm:`unary operators`.
Unary operators operate on a single target.
They are :newTerm:`prefix` if they precede their target (such as ``-a``)
and :newTerm:`postfix` operators if they follow their target (such as ``i++``).

You implement a prefix or postfix unary operator by writing
the ``prefix`` or ``postfix`` modifier
before the ``func`` keyword when declaring the operator function:

.. testcode:: customOperators

   -> prefix func - (vector: Vector2D) -> Vector2D {
         return Vector2D(x: -vector.x, y: -vector.y)
      }

The example above implements the unary minus operator
(``-a``) for ``Vector2D`` instances.
The unary minus operator is a prefix operator,
and so this function has to be qualified with the ``prefix`` modifier.

For simple numeric values, the unary minus operator converts
positive numbers into their negative equivalent and vice versa.
The corresponding implementation for ``Vector2D`` instances
performs this operation on both the ``x`` and ``y`` properties:

.. testcode:: customOperators

   -> let positive = Vector2D(x: 3.0, y: 4.0)
   << // positive : Vector2D = REPL.Vector2D
   -> let negative = -positive
   << // negative : Vector2D = REPL.Vector2D
   /> negative is a Vector2D instance with values of (\(negative.x), \(negative.y))
   </ negative is a Vector2D instance with values of (-3.0, -4.0)
   -> let alsoPositive = -negative
   << // alsoPositive : Vector2D = REPL.Vector2D
   /> alsoPositive is a Vector2D instance with values of (\(alsoPositive.x), \(alsoPositive.y))
   </ alsoPositive is a Vector2D instance with values of (3.0, 4.0)

.. QUESTION: is this the first time I will have introduced attributes?
   If so, do they need more qualification?

.. _AdvancedOperators_CompoundAssignmentOperators:

Compound Assignment Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:newTerm:`Compound assignment operators` combine assignment (``=``) with another operation.
For example, the addition assignment operator (``+=``)
combines addition and assignment into a single operation.
You mark a compound assignment operator's left input parameter as ``inout``,
because the parameter's value will be modified directly from within the operator function.

The example below implements
an addition assignment operator function for ``Vector2D`` instances:

.. testcode:: customOperators

   -> func += (inout left: Vector2D, right: Vector2D) {
         left = left + right
      }

Because an addition operator was defined earlier,
you don't need to reimplement the addition process here.
Instead, the addition assignment operator function
takes advantage of the existing addition operator function,
and uses it to set the left value to be the left value plus the right value:

.. testcode:: customOperators

   -> var original = Vector2D(x: 1.0, y: 2.0)
   << // original : Vector2D = REPL.Vector2D
   -> let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
   << // vectorToAdd : Vector2D = REPL.Vector2D
   -> original += vectorToAdd
   /> original now has values of (\(original.x), \(original.y))
   </ original now has values of (4.0, 6.0)

You can combine assignment with either the ``prefix`` or ``postfix`` modifier,
as in this implementation of the prefix increment operator (``++a``)
for ``Vector2D`` instances:

.. testcode:: customOperators

   -> prefix func ++ (inout vector: Vector2D) -> Vector2D {
         vector += Vector2D(x: 1.0, y: 1.0)
         return vector
      }

The prefix increment operator function above takes advantage
of the addition assignment operator defined earlier.
It adds a ``Vector2D`` with ``x`` and ``y`` values of ``1.0``
to the ``Vector2D`` on which it is called,
and returns the result:

.. testcode:: customOperators

   -> var toIncrement = Vector2D(x: 3.0, y: 4.0)
   << // toIncrement : Vector2D = REPL.Vector2D
   -> let afterIncrement = ++toIncrement
   << // afterIncrement : Vector2D = REPL.Vector2D
   /> toIncrement now has values of (\(toIncrement.x), \(toIncrement.y))
   </ toIncrement now has values of (4.0, 5.0)
   /> afterIncrement also has values of (\(afterIncrement.x), \(afterIncrement.y))
   </ afterIncrement also has values of (4.0, 5.0)

.. note::

   It is not possible to overload the default
   assignment operator (``=``).
   Only the compound assignment operators can be overloaded.
   Similarly, the ternary conditional operator
   (``a ? b : c``) cannot be overloaded.

.. QUESTION: some of the standard operators (such as equation and comparison)
   are implemented as part of a protocol (such as Equatable and Comparable).
   You don't seem to need to declare conformance to these protocols
   in order to implement the operator functions, however.
   Is that correct? Can you get != for free after implementing == , for example?
   UPDATE: going by rdar://14011860, we don't currently have a way for a protocol
   like Equatable to provide a default implementation of != if you implement ==

.. _AdvancedOperators_EquivalenceOperators:

Equivalence Operators
~~~~~~~~~~~~~~~~~~~~~

Custom classes and structures do not receive a default implementation of
the :newTerm:`equivalence operators`,
known as the “equal to” operator (``==``) and “not equal to” operator (``!=``).
It is not possible for Swift to guess what would qualify as “equal” for your own custom types,
because the meaning of “equal” depends on the roles that those types play in your code.

To use the equivalence operators to check for equivalence of your own custom type,
provide an implementation of the operators in the same way as for other infix operators:

.. testcode:: customOperators

   -> func == (left: Vector2D, right: Vector2D) -> Bool {
         return (left.x == right.x) && (left.y == right.y)
      }
   -> func != (left: Vector2D, right: Vector2D) -> Bool {
         return !(left == right)
      }

The above example implements an “equal to” operator (``==``)
to check if two ``Vector2D`` instances have equivalent values.
In the context of ``Vector2D``,
it makes sense to consider “equal” as meaning
“both instances have the same ``x`` values and ``y`` values”,
and so this is the logic used by the operator implementation.
The example also implements the “not equal to” operator (``!=``),
which simply returns the inverse of the result of the “equal to” operator.

You can now use these operators to check whether two ``Vector2D`` instances are equivalent:

.. testcode:: customOperators

   -> let twoThree = Vector2D(x: 2.0, y: 3.0)
   << // twoThree : Vector2D = REPL.Vector2D
   -> let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
   << // anotherTwoThree : Vector2D = REPL.Vector2D
   -> if twoThree == anotherTwoThree {
         println("These two vectors are equivalent.")
      }
   <- These two vectors are equivalent.

.. _AdvancedOperators_CustomOperators:

Custom Operators
----------------

You can declare and implement your own :newTerm:`custom operators` in addition to
the standard operators provided by Swift.
For a list of characters that can be used to define custom operators,
see :ref:`LexicalStructure_Operators`.

New operators are declared at a global level using the ``operator`` keyword,
and are marked with the ``prefix``, ``infix`` or ``postfix`` modifiers:

.. testcode:: customOperators

   -> prefix operator +++ {}

The example above defines a new prefix operator called ``+++``.
This operator does not have an existing meaning in Swift,
and so it is given its own custom meaning below in the specific context of
working with ``Vector2D`` instances. For the purposes of this example,
``+++`` is treated as a new “prefix doubling incrementer” operator.
It doubles the ``x`` and ``y`` values of a ``Vector2D`` instance,
by adding the vector to itself with the addition assignment operator defined earlier:

.. testcode:: customOperators

   -> prefix func +++ (inout vector: Vector2D) -> Vector2D {
         vector += vector
         return vector
      }

This implementation of ``+++`` is very similar to
the implementation of ``++`` for ``Vector2D``,
except that this operator function adds the vector to itself,
rather than adding ``Vector2D(1.0, 1.0)``:

.. testcode:: customOperators

   -> var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
   << // toBeDoubled : Vector2D = REPL.Vector2D
   -> let afterDoubling = +++toBeDoubled
   << // afterDoubling : Vector2D = REPL.Vector2D
   /> toBeDoubled now has values of (\(toBeDoubled.x), \(toBeDoubled.y))
   </ toBeDoubled now has values of (2.0, 8.0)
   /> afterDoubling also has values of (\(afterDoubling.x), \(afterDoubling.y))
   </ afterDoubling also has values of (2.0, 8.0)

.. _AdvancedOperators_PrecedenceAndAssociativityForCustomOperators:

Precedence and Associativity for Custom Infix Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Custom ``infix`` operators can also specify a :newTerm:`precedence`
and an :newTerm:`associativity`.
See :ref:`AdvancedOperators_PrecedenceAndAssociativity` for an explanation of
how these two characteristics affect an infix operator's interaction
with other infix operators.

The possible values for ``associativity`` are ``left``, ``right``, and ``none``.
Left-associative operators associate to the left if written next
to other left-associative operators of the same precedence.
Similarly, right-associative operators associate to the right if written
next to other right-associative operators of the same precedence.
Non-associative operators cannot be written next to
other operators with the same precedence.

The ``associativity`` value defaults to ``none`` if it is not specified.
The ``precedence`` value defaults to ``100`` if it is not specified.

The following example defines a new custom ``infix`` operator called ``+-``,
with ``left`` associativity and a precedence of ``140``:

.. testcode:: customOperators

   -> infix operator +- { associativity left precedence 140 }
   -> func +- (left: Vector2D, right: Vector2D) -> Vector2D {
         return Vector2D(x: left.x + right.x, y: left.y - right.y)
      }
   -> let firstVector = Vector2D(x: 1.0, y: 2.0)
   << // firstVector : Vector2D = REPL.Vector2D
   -> let secondVector = Vector2D(x: 3.0, y: 4.0)
   << // secondVector : Vector2D = REPL.Vector2D
   -> let plusMinusVector = firstVector +- secondVector
   << // plusMinusVector : Vector2D = REPL.Vector2D
   /> plusMinusVector is a Vector2D instance with values of (\(plusMinusVector.x), \(plusMinusVector.y))
   </ plusMinusVector is a Vector2D instance with values of (4.0, -2.0)

This operator adds together the ``x`` values of two vectors,
and subtracts the ``y`` value of the second vector from the first.
Because it is in essence an “additive” operator,
it has been given the same associativity and precedence values
(``left`` and ``140``)
as default additive infix operators such as ``+`` and ``-``.
For a complete list of the default Swift operator precedence
and associativity settings, see :doc:`../ReferenceManual/Expressions`.

.. note::

   You do not specify a precedence when defining a prefix or postfix operator.
   However, if you apply both a prefix and a postfix operator to the same operand,
   the postfix operator is applied first.

.. assertion:: postfixOperatorsAreAppliedBeforePrefixOperators

   -> prefix operator +++ {}
   -> postfix operator --- {}
   -> prefix func +++ (x: Int) -> Int { return x * 2 }
   -> postfix func --- (x: Int) -> Int { return x - 1 }
   -> +++1---
   << // r0 : Int = 0

.. FIXME: Custom operator declarations cannot be written over multiple lines in the REPL.
   This is being tracked as rdar://16061044.
   If this Radar is fixed, the operator declaration above should be split over multiple lines
   for consistency with the rest of the code.

.. TODO: Protocol Operator Requirements
   ------------------------------------

.. TODO: Protocols can require the implementation of operators
   (though assignment operators are broken)

.. TODO: Likewise for requiring custom operators

.. TODO: However, Doug thought that this might be better covered by Generics,
   where you know that two things are definitely of the same type.
   Perhaps mention it here, but don't actually show an example?

.. TODO: Self as the dynamic type of the current type that is implementing the protocols
   protocol Comparable {
      func <(Self, Self) -> Bool
   }

.. TODO: generic operators
