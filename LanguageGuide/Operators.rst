.. docnote:: Subjects to be covered in this section

    * Lack of promotion and truncation
    * Arithmetic operators
    * Operator precendence and associativity
    * Relational and equality operators
    * === vs ==
    * Short circuiting logical operators
    * Expressions
    * The ‘is’ pattern
    * No ternary expression

Operators
=========

Swift supports all of the standard :term:`operators` from C, as described below. It also has additional operators not found in other languages. These operators are implemented (where appropriate) for the standard Swift types such as numbers, strings and booleans.

In addition, you can define your own implementations of the standard operators – and create new ones – for any custom types you define. This process is covered in detail in :doc:`ClassesObjectsAndStructs`.

.. glossary ::

    operators
        An *operator* is a special symbol or phrase that is used to check or change values. A simple example is the *addition* operator, ``+``, which is used to add two numbers together (``var i = 2 + 3``). More complex examples include comparison operators such as the *and* operator ``&&`` (``if someBoolValue && someOtherBoolValue {...}``), or the *integer increment* operator ``++i``. All of these are explained in more detail below

.. TODO: precedence and associativity
.. TODO: the section on Operators should note that the floating-point types support the % (modulo) operation.

Note that operators are often referred to as *unary* or *binary* in the descriptions below.

* Unary operators operate on a single target (such as ``-a``). They are said to be *prefix* operators if they come before their target (such as ``!b``), and *postfix* operators if they come after their target (such as ``i++``).
* Binary operators operate on two targets (such as ``2 + 3``), and are said to be *infix* because they appear inbetween their two targets.

Assignment operator
-------------------

The assignment operator ``=`` is used to assign a value to a variable, as in the expression ``var i = 1``. Unlike other languages such as C++, Swift does not allow ``=`` to be overloaded with a custom definition for specific types.

.. TODO: this needs further explanation.

Arithmetic operators
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

The addition operator is also supported for ``String`` values…

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

Modulo operator
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

Like C, Swift provides ``++`` and ``--`` operators as shorthand for increasing or decreasing a variable by ``1`` . For example:

.. testcode:: arithmeticOperators

    (swift) var i = 0
    // i : Int = 0
    (swift) ++i
    (swift) println(i)
    >>> 1
    (swift) ++i
    (swift) println(i)
    >>> 2

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

Unless you need the specific behavior of ``i++``, it is recommended that you use ``++i`` in all cases, as it has the typical expected behavior of increasing ``i``, and then providing the result. (The same rules and advice apply for ``--``.)

Note that ``++`` and ``--`` only work with integers, and cannot be used to increment the values of floating-point variables.

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

Note that the unary plus and minus operators are not the same as the ``abs(x)`` function, which returns a positive value regardless of the sign of ``x``. The ``abs(x)`` function is described in more detail in :doc:`StandardFunctions`.

Comparison Operators
--------------------

Swift supports all of the standard C comparison operators:

* Equal to (``a == b``)
* Not equal to (``a != b``)
* Greater than (``a > b``)
* Less than (``a < b``)
* Greater than or equal to (``a >= b``)
* Less than or equal to (``a <= b``)

Each of these comparison operators returns a ``Bool`` value to indicate whether or not the statement is true:

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

The integer increment and comparison operators are often combined in a ``for`` loop to perform a task a certain number of times:

.. testcode:: comparisonOperators

    (swift) for (var i = 0; i < 3; ++i) {
                println("i is \(i)")
            }
    >>> i is 0
    >>> i is 1
    >>> i is 2

``for`` loops are defined in more detail in :doc:`ControlFlow`.

.. TODO: which types do these operate on by default? How do they work with strings? How about with tuples / with your own types?

Logical Operators
-----------------

NOT
~~~

The NOT operator (``!a``) inverts a ``Bool`` value so that ``true`` becomes ``false``, and ``false`` becomes ``true``. It can be read as “not a”, as seen in the following example:

.. testcode:: logicalOperators

    (swift) var allowedEntry = false
    // allowedEntry : Bool = false
    (swift) if !allowedEntry {
                println("You are not allowed entry into this restricted area. Go away!")
            }
    >>> You are not allowed entry into this restricted area. Go away!

``if !allowedEntry`` can be read as “if not allowed entry”. This makes sense as a human-readable line of code. The following line is only executed if “not allowed entry” is true, i.e. if ``allowedEntry`` is ``false``.

As in this example, careful choice of boolean variable names can help to keep code readable and concise, while avoiding double negatives and confusing logic statements.

AND
~~~

The AND operator (``&&``) is used to create compound logical statements where all values must be ``true`` for the compound statement to also be ``true``.

This example makes a compound statement from two ``Bool`` values, and only progresses if both values are ``true``:

.. testcode:: logicalOperators

    (swift) var enteredCorrectDoorCode = true
    // enteredCorrectDoorCode : Bool = true
    (swift) var passedRetinaScan = true
    // passedRetinaScan : Bool = true
    (swift) if enteredCorrectDoorCode && passedRetinaScan {
                println("Come on in!")
            }
    >>> Come on in!

If either value was ``false``, the compound statement would fail. In fact, if the *first* value was false, the second value wouldn't even be checked, as it can't possibly make the compound statement equal ``true``.

.. TODO: give an example where this is useful.

OR
~~~

The OR operator (``||``, i.e. two adjacent pipe characters) is used to create compound logical statements where only *one* of the values has to be ``true`` for the compound statement to be ``true``. For example:

.. testcode:: logicalOperators

    (swift) var hasValidDoorKey = false
    // hasValidDoorKey : Bool = false
    (swift) var knowsEmergencyOverridePassword = true
    // knowsEmergencyOverridePassword : Bool = true
    (swift) if hasValidDoorKey || knowsEmergencyOverridePassword {
                println("YOU MAY PASS.")
            }
    >>> YOU MAY PASS.

In this example, the first ``Bool`` value (``hasValidDoorKey``) is ``false``, but the second value (``knowsEmergencyOverridePassword``) is ``true``. Because one value was ``true``, the compound OR statement also equals ``true``, and access is allowed.

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-silent-truncation-or-undefined-behavior
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
    * http://en.wikipedia.org/wiki/Operator_(computer_programming)