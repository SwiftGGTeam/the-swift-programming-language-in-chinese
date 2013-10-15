.. docnote:: Subjects to be covered in this section

    * Lack of promotion and truncation
    * Arithmetic operators
    * Operator precendence and associativity
    * Relational and equality operators
    * === vs ==
    * Short-circuit nature of the logical operators && and ||
    * Expressions
    * The ternary operator
    * range operators
    * ,

Operators
=========

.. TODO: check this against the complete list of operators nearer to release, to check for implementations for &&= and ||= , which currently have a priority but not an implementation.

Swift supports all of the standard :term:`operators` from C, which are described in detail below. It also introduces new operators not found in other languages. In addition, you can define your own implementations of the standard operators – and create new ones – for any custom types you define. This process is covered in detail in :doc:`ClassesObjectsAndStructs`.

.. glossary ::

    operators
        An *operator* is a special symbol or phrase that is used to check or change values. A simple example is the *addition* operator, ``+``, which is used to add two numbers together (``var i = 2 + 3``). More complex examples include comparison operators such as the *and* operator ``&&`` (``if someBoolValue && someOtherBoolValue {...}``), or the *integer increment* operator ``++i``. All of these are explained in more detail below.

Operators are often referred to as *unary*, *binary* or *ternary*:

* Unary operators operate on a single target (such as ``-a``). They are said to be *prefix* operators if they come before their target (such as ``!b``), and *postfix* operators if they come after their target (such as ``i++``).
* Binary operators operate on two targets (such as ``2 + 3``), and are said to be *infix* because they appear inbetween their two targets.
* Ternary operators operate on three targets. Like C, Swift has just one ternary operator, known as the *ternary comparison operator* (``a ? b : c``).

Assignment Operator
-------------------

[TODO]

Arithmetic Operators
--------------------

Swift supports the four standard mathematical operators – addition (``+``), subtraction (``-``), multiplication (``*``) and division (``/``) – for all number types:

.. testcode:: arithmeticOperators

    (swift) 1 + 2
    // r0 : Int = 3
    (swift) 5 - 3
    // r1 : Int = 2
    (swift) 2 * 3
    // r2 : Int = 6
    (swift) 10.0 / 2.5
    // r3 : Double = 4.0

The addition operator is also supported for ``String`` concatenation:

.. testcode:: arithmeticOperators

    (swift) "hello, " + "world"
    // r4 : String = "hello, world"

…and two ``Char`` values, or one ``Char`` and one ``String``, can be added together via ``+`` to make a new ``String``:

.. testcode:: arithmeticOperators

    (swift) var dog = '🐶'
    // dog : Char = '🐶'
    (swift) var cow = '🐮'
    // cow : Char = '🐮'
    (swift) var dogCow = dog + cow
    // dogCow : String = "🐶🐮"

Modulo Operator
~~~~~~~~~~~~~~~

The *binary modulo operator*, ``a % b``, divides ``a`` by ``b``, and returns the remainder. For example:

.. testcode:: arithmeticOperators

    (swift) 9 % 4
    // r5 : Int = 1

There are two 4's in 9, with a remainder of 1, so the modulo operator returns an ``Int`` value of ``1``.

Unlike C and Objective-C, Swift can also perform modulo operations on floating-point numbers:

.. testcode:: arithmeticOperators

    (swift) 8 % 2.5
    // r6 : Double = 0.5

There are three 2.5's in 8, with a remainder of 0.5, so the modulo operator returns a ``Double`` value of ``0.5``.

Integer Increment and Decrement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Like C, Swift provides ``++`` and ``--`` operators as shorthand for increasing or decreasing an integer variable by ``1`` . For example:

.. testcode:: arithmeticOperators

    (swift) var i = 0
    // i : Int = 0
    (swift) ++i
    // r7 : Int = 1
    (swift) ++i
    // r8 : Int = 2

Each time you call ``++i``, the value of ``i`` is increased by ``1``. Essentially, ``++i`` is shorthand for saying ``i = i + 1``. Likewise, ``--i`` can be used as shorthand for ``i = i - 1``.

There's an interesting twist, however. Both ``++`` and ``--`` can be used as a *prefix* operator, or as a *postfix* operator. ``++i`` and ``i++`` are both valid ways to increase the value of ``i`` by ``1``.

The twist comes if you want to use ``++`` to increment a variable, while also finding out the value that it is incrementing. In this case, ``++i`` will increase the value *before* it is accessed, whereas ``i++`` will increase the value *after* it is accessed.

Here's an example:

.. testcode:: arithmeticOperators

    (swift) var a = 0
    // a : Int = 0
    (swift) var b = ++a
    // b : Int = 1
    (swift) println("a is now \(a)")
    >>> a is now 1
    (swift) var c = a++
    // c : Int = 1
    (swift) println("a is now \(a)")
    >>> a is now 2

In the example above, ``var b = ++a`` sets ``b`` to the value of ``a``, *after* it has been incremented. This is why both ``a`` and ``b`` are equal to ``1``.

However, ``var c = a++`` sets ``c`` to the value of ``a`` *before* it is incremented. The result is that ``c`` gets the old value of ``1``, but ``a`` now equals ``2``.

Unless you need the specific behavior of ``i++``, it is recommended that you use ``++i`` in all cases, because it has the typical expected behavior of increasing ``i``, and then providing the result. (The same rules and advice apply for ``--``.)

Unary Plus and Minus
~~~~~~~~~~~~~~~~~~~~

The sign of a numeric value can be toggled using a prefixed ``-`` (known as *unary minus*):

.. testcode:: arithmeticOperators

    (swift) var minusThree = -3
    // minusThree : Int = -3
    (swift) var plusThree = -minusThree         // effectively "minus minus three"
    // plusThree : Int = 3
    (swift) var anotherMinusThree = -plusThree
    // anotherMinusThree : Int = -3

Note that the unary minus operator ``-`` is prepended directly before the value it operates on, without any whitespace.

There is a corresponding *unary plus* operator, ``+``, which simply returns the value it operates on, without any change:

.. testcode:: arithmeticOperators

    (swift) var minusSix = -6
    // minusSix : Int = -6
    (swift) var alsoMinusSix = +minusSix
    // alsoMinusSix : Int = -6

The unary plus operator may not actually do anything, but it helps to provide symmetry in your code when also using the unary minus operator.

Comparison Operators
--------------------

Swift supports all of the standard C comparison operators:

* Equal to (``a == b``)
* Not equal to (``a != b``)
* Greater than (``a > b``)
* Less than (``a < b``)
* Greater than or equal to (``a >= b``)
* Less than or equal to (``a <= b``)

Swift supports two additional comparison operators, to check if values are identical:

* Identical to (``a === b``)
* Not identical to (``a !== b``)

The identical operators are used to test if two object variables both refer to the same object instance. They are described in detail in :doc:`ClassesObjectsAndStructs`.

Each of the comparison operators returns a ``Bool`` value to indicate whether or not the statement is true:

.. testcode:: comparisonOperators

    (swift) 1 == 1          // true, because 1 is equal to 1
    // r0 : Bool = true
    (swift) 2 != 1          // true, because 2 is not equal to 1
    // r1 : Bool = true
    (swift) 2 > 1           // true, because 2 is greater than 1
    // r2 : Bool = true
    (swift) 1 < 2           // true, because 1 is less than 2
    // r3 : Bool = true
    (swift) 1 >= 1          // true, because 1 is equal to 1, so 1 is therefore greater than or equal to 1
    // r4 : Bool = true
    (swift) 2 <= 1          // false, because 2 is greater than 1, so 2 is not less than or equal to 1
    // r5 : Bool = false

The comparison operators are often combined with an integer increment operator (``++i``) in a ``for`` loop, to perform a task a certain number of times:

.. testcode:: comparisonOperators

    (swift) for (var i = 0; i < 3; ++i) {
                println("i is \(i)")
            }
    >>> i is 0
    >>> i is 1
    >>> i is 2

``for`` loops are defined in more detail in :doc:`ControlFlow`.

Comparison operators are also often seen in conditional statements such as the ``if {...} else {...}`` statement:

.. testcode:: comparisonOperators

    (swift) var name = "world";
    // name : String = "world"
    (swift) if name == "world" {
                println("hello, world")
            } else {
                println("I'm sorry \(name), but I don't recognize you")
            }
    >>> hello, world

.. TODO: which types do these operate on by default? How do they work with strings? How about with tuples / with your own types?

Ternary Comparison Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ternary comparison operator is a special operator with three parts, which takes the form ``expression ? value1 : value2``. It provides a shorthand way to select one of two values based on whether ``expression`` is ``true`` or ``false``. If ``expression`` is ``true``, it equates to ``value1``; if ``expression`` is ``false``, it equates to ``value2``.

Here's an example to calculate the pixel height for a table row. The height should be 80 pixels if the row has a header, and 44 pixels if it doesn't.

.. testcode:: ternaryComparisonOperatorPart1

    (swift) var hasHeader = true
    // hasHeader : Bool = true
    (swift) var rowHeight = hasHeader ? 80 : 44
    // rowHeight : Int = 80
    (swift) println("The row height is \(rowHeight) pixels.")
    >>> The row height is 80 pixels.

This is effectively shorthand for:

.. testcode:: ternaryComparisonOperatorPart2

    (swift) var hasHeader = true
    // hasHeader : Bool = true
    (swift) var rowHeight = 0
    // rowHeight : Int = 0
    (swift) if hasHeader {
                rowHeight = 80
            } else {
                rowHeight = 44
            }
    (swift) println("The row height is \(rowHeight) pixels.")
    >>> The row height is 80 pixels.

.. TODO: leave yearSuffix uninitialized once the REPL allows uninitialized variables.

In this case, the ternary comparison operator provides an efficient shorthand when deciding which of two values to use.

The ternary comparison operator should be used with care, however. It is very concise, but this conciseness can lead to hard-to-read code if over-used. Don't be tempted to combine multiple instances of it into one compound statement; this quickly becomes difficult to read.

Bitwise Operators
-----------------

Swift supports all of the bitwise operators found in C, as described below.

Bitwise NOT
~~~~~~~~~~~

The bitwise NOT operator (``~``) inverts all of the bits in a number. For example:

.. testcode:: bitwiseOperators

    (swift) var initialBits : UInt8 = 0b00001111
    // initialBits : UInt8 = 15
    (swift) var invertedBits = ~initialBits  // equals 0b11110000
    // invertedBits : UInt8 = 240

``UInt8`` integers have eight bits. This example initializes a ``UInt8`` with the binary value ``00001111``, which has its first four bits set to ``0``, and its second four bits set to ``1``. This is equivalent to a decimal value of ``15``.

The bitwise NOT operator is then used to create a new variable ``invertedBits``, which is equal to ``initialBits`` but with all of the bits inverted. Zeroes become ones, and ones become zeroes. This gives a new value of ``11110000``, which is equal to an unsigned decimal value of ``240``.

Bitwise AND
~~~~~~~~~~~

The bitwise AND operator (``&``) combines the bits of two numbers. It returns a new number whose bits are only set to ``1`` if the bits were equal to ``1`` in *both* input numbers. For example:

.. testcode:: bitwiseOperators

    (swift) var firstSixBits : UInt8 = 0b11111100
    // firstSixBits : UInt8 = 252
    (swift) var lastSixBits : UInt8  = 0b00111111
    // lastSixBits : UInt8 = 63
    (swift) var middleFourBits = firstSixBits & lastSixBits  // equals 0b00111100
    // middleFourBits : UInt8 = 60

The values of ``firstSixBits`` and ``lastSixBits`` both have their four middle bits equal to ``1``. The bitwise AND operator combines them to make the number ``00111100``, which is equal to an unsigned decimal value of ``60``.

Bitwise OR
~~~~~~~~~~

The bitwise OR operator (``|``) compares the bits of two numbers, and returns a new number whose bits are set to ``1`` if the bits were equal to ``1`` in *either* of the input numbers. For example:

.. testcode:: bitwiseOperators

    (swift) var someBits : UInt8 = 0b01011110
    // someBits : UInt8 = 94
    (swift) var moreBits : UInt8 = 0b10100000
    // moreBits : UInt8 = 160
    (swift) var combinedbits = someBits | moreBits  // equals 0b11111110
    // combinedbits : UInt8 = 254

The values of ``someBits`` and ``moreBits`` have different bits set to ``1``. The bitwise OR operator combines them to make the number ``11111110``, which equals an unsigned decimal of ``254``.

Bitwise XOR
~~~~~~~~~~~

The bitwise :term:`XOR` operator (``^``) compares the bits of two numbers, and returns a new number whose bits are set to ``1`` if the bits are equal to ``1`` in *either* of the input numbers, but not if they are set to ``1`` in *both* of the input numbers. For example:

.. glossary::

    XOR
        XOR is read as ‘exclusive OR’.

.. testcode:: bitwiseOperators

    (swift) var firstBits : UInt8 = 0b00001100
    // firstBits : UInt8 = 12
    (swift) var otherBits : UInt8 = 0b00000101
    // otherBits : UInt8 = 5
    (swift) var outputBits = firstBits ^ otherBits  // equals 0b00001001
    // outputBits : UInt8 = 9

.. TODO: Explain how this can be useful to toggle just a few bits in a bitfield.

Bitwise Left and Right Shifts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

[TODO]

Compound Assignment Operators
-----------------------------

Like C, Swift provides shorthand operators that combine *assignment* (``=``) with another operation. For example:

.. testcode:: compoundAssignment

    (swift) var a = 1
    // a : Int = 1
    (swift) a += 2
    (swift) println("a is now equal to \(a)")
    >>> a is now equal to 3

The expression ``a += b`` is shorthand for ``a = a + b``. Effectively, the addition and the assignment are rolled into one operator that performs both tasks in one go.

A complete list of compound assignment operators can be found in the :doc:`../ReferenceManual/ReferenceManual`.

Overflow Operators
------------------

Swift will throw an error if you try to insert a value into an integer variable that cannot hold that value. This gives extra safety when working with values that are too large or too small.

For example, the ``Int16`` integer type can hold any signed value between ``-32768`` and ``32767``. If you try and set a variable of this type to a value outside of this range, Swift will throw an error:

.. testcode:: overflowOperators

    (swift) var potentialOverflow = Int16.max()     // the largest value that Int16 can hold
    // potentialOverflow : Int16 = 32767
    (swift) potentialOverflow += 1                  // this will throw an error

.. TODO: is "throw an error" the correct phrase to use here? It actually triggers an assertion, causing the REPL to crash.

Throwing an error in these scenarios is much safer than allowing an outsized value to :term:`overflow`. Providing error handling when values get too large or too small gives you much more flexibility when coding for boundary value conditions.

.. glossary::

    overflow
        A variable *overflows* when it no longer fits into the space assigned to it. In the case of a ``UInt8``, the variable has eight bits of storage, giving a maximum unsigned value of ``11111111`` in binary (or ``255`` in decimal). If you add ``1`` to this number, you get the binary number ``100000000`` (a one with eight zeroes), which needs nine bits of storage. Because ``UInt8`` only has eight bits of storage, it *overflows*, and the value that remains is the the value that is still stored in the right-hand eight bits. In this case, the value is ``00000000``, or zero.

However, in the cases where you *do* want the value to overflow, you can opt in to this behavior rather than triggering an error. Swift provides five arithmetic *overflow operators* that opt in to the overflow behavior. These operators all begin with an ampersand (``&``):

* Overflow addition (``&+``)
* Overflow subtraction (``&-``)
* Overflow multiplication (``&*``)
* Overflow division (``&/``)
* Overflow modulo (``&%``)

For example:

.. testcode:: overflowOperators

    (swift) var willOverflow = UInt8.max()      // the largest value that UInt8 can hold
    // willOverflow : UInt8 = 255
    (swift) willOverflow = willOverflow &+ 1
    (swift) println("willOverflow is now \(willOverflow)")
    >>> willOverflow is now 0

The variable ``willOverflow`` is initialized with the largest value a ``UInt8`` can hold. It is then incremented by ``1`` using the overflow addition operator, ``&+``. This pushes it just over the size it can hold, causing it to overflow round to its smallest possible value (``0``).

Similarly, if a value becomes too small:

.. testcode:: overflowOperators

    (swift) var willUnderflow = Int16.min()     // the smallest value that Int16 can hold
    // willUnderflow : Int16 = -32768
    (swift) willUnderflow = willUnderflow &- 1
    (swift) println("willUnderflow is now \(willUnderflow)")
    >>> willUnderflow is now 32767

Pushing the value of ``willUnderflow`` just slightly lower than it can store causes it to overflow round to its maximum value.

Note: the overflow operators should not be confused with the bitwise AND compound assignment operator ``&=``.

Division by zero
~~~~~~~~~~~~~~~~

If you divide a number by zero, or try to calculate modulo zero, Swift will throw an error:

.. testcode:: overflowOperators

    (swift) var x = 1
    // x : Int = 1
    (swift) var y = x / 0       // this will throw an error

Integer division by zero is not a valid mathematical action, which is why Swift throws an error rather than creating an invalid value.

Logical Operators
-----------------

Logical NOT
~~~~~~~~~~~

The NOT operator (``!a``) inverts a boolean value so that ``true`` becomes ``false``, and ``false`` becomes ``true``. It can be read as “not ``a``”, as seen in the following example:

.. testcode:: logicalOperators

    (swift) var allowedEntry = false
    // allowedEntry : Bool = false
    (swift) if !allowedEntry {
                println("ACCESS DENIED")
            }
    >>> ACCESS DENIED

The phrase ``if !allowedEntry`` can be read as “if not allowed entry”. The subsequent line is only executed if “not allowed entry” is true, i.e. if ``allowedEntry`` is ``false``.

As in this example, careful choice of boolean variable names can help to keep code readable and concise, while avoiding double negatives or confusing logic statements.

Logical AND
~~~~~~~~~~~

The AND operator (``&&``) is used to create logical expressions where both values must be ``true`` for the overall expression to also be ``true``.

This example considers two ``Bool`` values, and only allows access if both values are ``true``:

.. testcode:: logicalOperators

    (swift) var enteredCorrectDoorCode = true
    // enteredCorrectDoorCode : Bool = true
    (swift) var passedRetinaScan = false
    // passedRetinaScan : Bool = false
    (swift) if enteredCorrectDoorCode && passedRetinaScan {
                println("Welcome!")
            } else {
                println("ACCESS DENIED")
            }
    >>> ACCESS DENIED

If either value is ``false``, the overall expression will also be ``false``, as shown above. In fact, if the *first* value is false, the second value :term:`won't even be checked`, as it can't possibly make the overall expression equal ``true``.

.. glossary::

    won't even be checked
        This is known as *short-circuit evaluation*.

Logical OR
~~~~~~~~~~

The OR operator (``||``, i.e. two adjacent pipe characters) is used to create logical expressions where only *one* of the two values has to be ``true`` for the overall expression to be ``true``. For example:

.. testcode:: logicalOperators

    (swift) var hasValidDoorKey = false
    // hasValidDoorKey : Bool = false
    (swift) var knowsEmergencyOverridePassword = true
    // knowsEmergencyOverridePassword : Bool = true
    (swift) if hasValidDoorKey || knowsEmergencyOverridePassword {
                println("Welcome!")
            } else {
                println("ACCESS DENIED")
            }
    >>> Welcome!

In this example, the first ``Bool`` value (``hasValidDoorKey``) is ``false``, but the second value (``knowsEmergencyOverridePassword``) is ``true``. Because one value is ``true``, the overall expression also equates to ``true``, and access is allowed.

Note that if the left-hand side of an OR expression is ``true``, the right-hand side will not be evaluated, because it cannot change the outcome of the overall expression.

Combining Logical Operators
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can combine multiple logical operators to create longer compound expressions, which are evaluated from left to right. For example:

.. testcode:: logicalOperators

    (swift) if enteredCorrectDoorCode && passedRetinaScan || hasValidDoorKey || knowsEmergencyOverridePassword {
                println("Welcome!")
            } else {
                println("ACCESS DENIED")
            }
    >>> Welcome!

This example uses multiple ``&&`` and ``||`` operators to create a longer compound expression. Note that ``&&`` and ``||`` still only operate on two values, so this is actually three smaller expressions chained together. It can be read as:

    “If we've entered the correct door code and passed the retina scan; or if we have a valid door key; or if we know the emergency override password; then allow access.”

Based on the example values from earlier, the first two mini-expressions are ``false``, but we know the emergency override password, so the overall compound expression still equates to ``true``.

Priority and Associativity
--------------------------

.. NOTE: I've chosen to use ‘priority’ rather than ‘precedence’ here, because I think it's a clearer phrase to use.
.. QUESTION: Could priority and associativity be made clear as part of the hypothetical ‘show invisibles’ feature, to show the invisible parentheses implied by priority and associativity?

It is important to consider each operator's *priority* and *associativity* when working out how to calculate a compound expression. These two principles are used to work out the order in which an expression should be calculated.

* Operator :term:`priority` means that some operators are given higher priority than others.

* Operator :term:`associativity` defines how operators of the same priority are grouped together – either grouped from the left, or grouped from the right. Think of it as meaning ‘they associate with the expression to their left’, or ‘they associate with the expression to their right’.

.. glossary::

    priority
        Operator priority is also known as *operator precendence*, or *order of operations*.
        
    associativity
        Operator associativity is also known as *fixity*.

.. NOTE: these examples are taking an awful long time to run!

Here's an example. Why does the following expression equal ``4``?

.. testcode:: evaluationOrder

    (swift) 2 + 3 * 4 % 5
    // r0 : Int = 4

Taken literally, you might expect this to read:

    2 plus 3 equals 5; 5 times 4 equals 20; 20 modulo 5 equals 0.

However, this is not the actual answer, due to the priorities and associativity of the operators used.

Here's how the actual evaluation order is calculated. Priority is considered first. Higher-priority operators are evaluated before lower-priority ones. In Swift, as in C, the multiplication operator (``*``) and the modulo operator (``%``) have a higher priority than the addition operator (``+``). As a result, they are both evaluated before the addition is considered.

However, multiplication and modulo happen to have the *same* priority as each other. To work out the exact evaluation order to use, we therefore need to also look at their *associativity*. Multiplication and modulo both associate with the expression to their left. You can think of this as adding implicit parentheses around these parts of the expression, starting from their left:

.. testcode:: evaluationOrder

    (swift) 2 + ((3 * 4) % 5)
    // r1 : Int = 4

The expression can now be refactored to give:

.. testcode:: evaluationOrder

    (swift) 2 + (12 % 5)
    // r2 : Int = 4

…which can be refactored even further to give:

.. testcode:: evaluationOrder

    (swift) 2 + 2
    // r3 : Int = 4

…giving the eventual answer of ``4``.

A complete list of Swift operator priorities and associativity rules can be found in the :doc:`../ReferenceManual/ReferenceManual`.

Explicit Parentheses
~~~~~~~~~~~~~~~~~~~~

Priority and associativity mean that evaluation can always be tied down to one and only one possible order. However, it can sometimes be useful to include parentheses anyway, to make the intention of a complex expression easier to read. In the door access example above, it would be useful to add parentheses around the first part of the compound expression:

.. testcode:: logicalOperators

    (swift) if (enteredCorrectDoorCode && passedRetinaScan) || hasValidDoorKey || knowsEmergencyOverridePassword {
                println("Welcome!")
            } else {
                println("ACCESS DENIED")
            }
    >>> Welcome!

The parentheses make it clear that the first two values are being considered as part of a separate possible state in the overall logic. The output of the compound expression doesn't change, but the overall intention is clearer to the reader. Readability is always to be preferred over brevity, and parentheses should be used if they help to make your intentions clear.

Range Operators
---------------

.. refnote:: References

    * https://[Internal Staging Server]/docs/LangRef.html#expr-assign
    * https://[Internal Staging Server]/docs/LangRef.html#expr-ternary
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-silent-truncation-or-undefined-behavior
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
    * http://en.wikipedia.org/wiki/Operator_(computer_programming)
    * /swift/stdlib/core/Policy.swift