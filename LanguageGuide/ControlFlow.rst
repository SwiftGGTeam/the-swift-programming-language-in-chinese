.. docnote:: Control flow

    Some aspects of control flow will already have been introduced before this chapter as part of the language tour. I'm envisaging that the basic flow control introduced in that chapter will provide enough flexibility to get us through the chapters on types, operators, strings and generics, before going into much more detail on all the possibilities here.

.. docnote:: Subjects to be covered in this section

    * Conditional branching (if)
    * Looping (while, do while, for, for in)
    * Iterators
    * Switch statement (including pattern matching)
    * Pattern matching and expressions in patterns
    * Overloading the ~= function for pattern matching
    * Control transfer (return, break, continue, fallthrough)
    * Ranges
    * Variable scope (as this is the first time we've defined scopes)
    * Clarification around expressions and statements?

Control Flow
============

Swift provides several different ways to structure and control the flow of your code's execution.
These include:

* :newTerm:`Loops`, which perform a task multiple times
* :newTerm:`Conditional statements`,
  which execute different branches of code based on certain conditions
* :newTerm:`Control transfer statements`,
  which immediately transfer the flow of execution to another point in your code

.. _ControlFlow_ForLoops:

For Loops
---------

A ``for`` loop is used to iterate over multiple items in a range, sequence, collection or progression.
Swift provides two types of ``for`` loop:

* ``for``-``in``, and
* ``for``-``condition``-``increment``

.. _ControlFlow_ForIn:

For-In
~~~~~~

Swift's ``for``-``in`` loop provides a powerful way to iterate over collections of items,
such as ranges of numbers, items in an array, or characters in a string.
Here's a simple example,
which prints the first few entries in the five-times-table:

.. testcode::

    (swift) for index in 1..5 {
        println("\(index) times 5 is \(index * 5)")
    }
    >>> 1 times 5 is 5
    >>> 2 times 5 is 10
    >>> 3 times 5 is 15
    >>> 4 times 5 is 20
    >>> 5 times 5 is 25

Here, the collection of items being iterated is a
:ref:`closed range <Operators_ClosedRangeOperator>` of numbers from ``1`` to ``5``.
The value of ``index`` is set to the first number in the range (``1``),
and the statements inside the loop are executed.
In this case, the loop only contains one statement,
which prints an entry from the five-times-table for the current value of ``index``.
Once the statement has been executed,
the value of ``index`` is updated to contain the second value in the range (``2``),
and the ``println`` function is called again.
This continues until the end of the range is reached.

The ``index`` variable does not have to be declared before it is used as part of this loop.
It is implicitly declared simply by its inclusion in the loop declaration,
without the need for a ``var`` declaration keyword.
This does, however, mean that it only exists within the scope of the loop.
If you want to check the value of ``index`` after the loop has completed,
you must declare it in advance of its use in the loop.

If you don't actually need each value from the range,
you can ignore the values using an underscore in place of a variable name:

.. testcode::

    (swift) let base = 3
    // base : Int = 3
    (swift) let power = 10
    // power : Int = 10
    (swift) var answer = 1
    // answer : Int = 1
    (swift) for _ in 0...power {
        answer *= base
    }
    (swift) println("\(base) to the power of \(power) is \(answer)")
    >>> 3 to the power of 10 is 59049

This example calculates the value of one number to the power of another
(in this case, ``3`` to the power of ``10``).
It does this by multiplying a starting value of ``1``
(i.e. ``3`` to the power of ``0``)
by ``3``, ten times,
using a half-open loop that starts with ``0`` and ends with ``9``.
This calculation doesn't need to know the individual counter values each time through the loop –
it simply needs to execute the loop the correct number of times.
The underscore character ``_``
(used in place of a loop variable)
causes the individual values to be ignored,
and does not provide access to the current value during each iteration of the loop.

A ``for``-``in`` loop can be used to iterate over the items in an array:

.. testcode::

    (swift) let names = ["Alan", "Barbara", "Carol", "Doug"]
    // names : String[] = ["Alan", "Barbara", "Carol", "Doug"]
    (swift) for name in names {
        println("Hello, \(name)!")
    }
    >>> Hello, Alan!
    >>> Hello, Barbara!
    >>> Hello, Carol!
    >>> Hello, Doug!

Swift's ``String`` type has a ``chars`` property,
which provides the individual characters in the string as an ``Array`` of ``UnicodeScalar`` values
(also known as an “``Array`` of type ``UnicodeScalar``”).
This can be used to iterate through the characters of a string in order:

.. testcode::

    (swift) for scalar in "Hello".chars {
        println(scalar)
    }
    >>> H
    >>> e
    >>> l
    >>> l
    >>> o

Iteration can also be used to access the key-value pairs in a dictionary.
Every item in a dictionary has a ``key`` property and a ``value`` property,
which can be accessed via dot syntax:

.. testcode::

    (swift) let numberOfLegs = ["spider" : 8, "ant" : 6, "cat" : 4]
    // numberOfLegs : Dictionary<String, Int> = Dictionary<String, Int>(1.33333, 3, <DictionaryBufferOwner<String, Int> instance>)
    (swift) for item in numberOfLegs {
        println("\(item.key)s have \(item.value) legs")
    }
    >>> spiders have 8 legs
    >>> ants have 6 legs
    >>> cats have 4 legs

Items in a ``Dictionary`` may not necessarily be iterated in the same order as they were inserted.
The contents of a ``Dictionary`` are inherently unordered,
and iterating over them does not guarantee the order in which they will be retrieved.

.. TODO: provide some advice on how to iterate over a Dictionary in order
   (perhaps sorted by key), using a predicate or array sort or some kind.

The examples above use a ``for``-``in`` loop to iterate
ranges, arrays, strings and dictionaries.
However, this syntax can be used to iterate *any* collection,
as long as it conforms to the ``Sequence`` protocol.
This can include your own classes and collection types.
Protocols, including ``Sequence``,
are described in detail in :doc:`Protocols`.

.. QUESTION: are there any plans for enums to conform to Sequence?
   If so, they might make for a good example.
   What would the syntax be if they did?
   'for planet in Planet'?

.. TODO: for (index, object) in enumerate(collection)
   and also for i in indices(collection) { collection[i] }

.. _ControlFlow_ForConditionIncrement:

For-Condition-Increment
~~~~~~~~~~~~~~~~~~~~~~~

In addition to ``for``-``in`` loops,
Swift also supports traditional C-style ``for`` loops with a condition and an incrementer:

.. testcode::

    (swift) for var index = 0; index < 3; ++index {
        println("index is \(index)")
    }
    >>> index is 0
    >>> index is 1
    >>> index is 2

The general form of this loop format is::

    for <#initialization#>; <#condition#>; <#increment#> {
        <#statements#>
    }

Semicolons are used to separate the three parts of the loop's definition, as in C.
However, unlike C, there is no need to add parentheses around
the entire “initialization; condition; increment” block.

The loop is executed as follows:

1. When the loop is first entered,
   the :newTerm:`initialization expression` is evaluated once,
   to set up any named values that are needed for the loop.

2. Next, the :newTerm:`condition expression` is evaluated.
   If it equates to ``false``, the loop ends,
   and code execution continues after the for loop's closing brace (``}``).
   Otherwise, code execution continues by executing the :newTerm:`statements` inside the braces.

3. After executing all of the statements,
   the :newTerm:`increment expression` is evaluated.
   It might increase or decrease the value of a counter,
   or set one of the initialized variables to a new value based on the outcome of the statements.
   After it has been evaluated,
   execution returns to step 2,
   and the condition expression is evaluated again.

This is effectively shorthand for (and equivalent to)::

    <#initialization#>
    while <#condition#> {
        <#statements#>
        <#increment#>
    }

Named values defined within the initialization expression
(such as ``var index = 0``)
are only valid within the scope of the for loop itself.
If you want to retrieve the final value of ``index`` after the loop ends,
you must declare ``index`` before the loop's scope begins:

.. testcode::

    (swift) var index = 0
    // index : Int = 0
    (swift) for index = 0; index < 3; ++index {
        println("index is \(index)")
    }
    >>> index is 0
    >>> index is 1
    >>> index is 2
    (swift) println("The loop statements were executed \(index) times")
    >>> The loop statements were executed 3 times

.. TODO: We shouldn't need to initialize index to 0 on the first line of this example,
   but variables can't currently be used unitialized in the REPL.

Note that the final value of ``index`` after completing this loop is ``3``, not ``2``.
The last time the increment statement ``++index`` is called,
it sets ``index`` to ``3``,
which causes ``index < 3`` to equate to ``false``,
ending the loop.

.. TODO: Need to mention that loop variables are immutable by default.
.. QUESTION: Can you make a loop variable mutable –
   and therefore influence loop execution, such as jumping ahead –
   by prepending it with 'var'?

.. _ControlFlow_WhileLoops:

While Loops
-----------

A ``while`` loop performs a set of statements until a condition becomes ``false``.
These kinds of loops are best used when
the number of iterations is not known before the first iteration begins.
Swift provides two variations of this loop:

* ``while``, and
* ``do``-``while``

.. _ControlFlow_While:

While
~~~~~

A ``while`` loop starts by considering a single condition.
If the condition is ``true``,
a set of statements is repeated until the condition becomes ``false``.

The general form of a ``while`` loop is::

    while <#condition equates to true#> {
        <#statements#>
    }

For example::

    (swift) var personName = ""
    // personName : String = ""
    (swift) let keyboard = Keyboard()
    // keyboard : Keyboard = <_TtCSs8Keyboard instance>
    (swift) println("Please enter your name, then press return.")
    >>> Please enter your name, then press return.
    (swift) var inputCharacter = UnicodeScalar(keyboard.read())
    // inputCharacter : UnicodeScalar = 'a'
    (swift) while inputCharacter != '\n' {
        personName += inputCharacter
        inputCharacter = UnicodeScalar(keyboard.read())
    }
    (swift) if personName == "" {
        println("You didn't enter your name. How can I say hello to you?")
    } else {
        println("Hello, \(personName)!")
    }

.. TODO: This example cannot be auto-tested, as it is reliant on keyboard input.
   It must be tested manually before this book is published.

This example reads input from the keyboard one character at a time,
and appends each character to a string.
It does this using Swift's built-in ``Keyboard`` class,
which reads keystrokes from an attached keyboard.
The example creates a new ``Keyboard`` instance by calling its initializer ``Keyboard()``.
It then reads a key using the keyboard's ``read`` method.
This causes the program to pause and wait for a keystroke before continuing.
The keystroke's value is returned as a ``UInt8`` value,
containing the ASCII code of the key that was pressed.
This is converted to a ``UnicodeScalar`` value,
so that it can be appended to a ``String`` representing the person's name.

This program continues to read in keystrokes until the user presses the return key.
When they do so,
the value of ``inputCharacter`` will be a line feed character (``\n``),
causing ``while inputCharacter != '\n'`` to equate to ``false``,
ending the loop.
The person's name is then validated
(to ensure that they did not press the return key without entering a name),
and is printed if it exists.

A ``while`` loop is appropriate in this case
because the length of the input name is not known at the start of the ``while`` loop.
Instead, the loop is executed until a particular condition is satisfied.

.. NOTE: this example cannot be run in the REPL,
   due to the fact that it is reliant on keyboard input.
   I have yet to come up with a better example where “while” is the right kind of loop to use, however.
   (I'm trying to avoid any examples where the number of iterations is known at the start of the loop.)

.. _ControlFlow_DoWhile:

Do-While
~~~~~~~~

The second variation of the ``while`` loop,
known as the ``do``-``while`` loop,
performs a single pass through the loop block first,
*before* considering a condition.
It then continues to repeat the loop until the condition is ``false``::

    do {
        <#statements#>
    } while <#condition equates to true#>

.. TODO: come up with a good example for when you'd actually want to use a do-while loop.

.. _ControlFlow_ConditionalStatements:

Conditional Statements
----------------------

It is often useful to execute different pieces of code based on certain conditions.
You might want to run an extra piece of code when an error occurs,
or to display a message when some value becomes too high or too low.
To do this, you need to make parts of your code :newTerm:`conditional`.

Swift provides two ways to add conditional branches to your code:

* ``if``-``else``, and
* ``switch``

The ``if``-``else`` statement is typically used to consider simple conditions with only a few possible outcomes.
The ``switch`` statement is better suited to more complex conditions with multiple possible permutations.

.. _ControlFlow_IfElse:

If-Else
~~~~~~~

In its simplest form,
the ``if``-``else`` statement has a single ``if`` condition.
It only executes a set of statements if that condition is ``true``:

.. testcode::

    (swift) var temperatureInFahrenheit = 30
    // temperatureInFahrenheit : Int = 30
    (swift) if temperatureInFahrenheit <= 32 {
        println("It's very cold. Consider wearing a scarf.")
    }
    >>> It's very cold. Consider wearing a scarf.

This example checks to see if the temperature
(expressed using the Fahrenheit scale)
is less than or equal to 32 degrees
(the freezing point of water).
If it is, a message is printed.
Otherwise, no message is printed,
and code execution continues after the if statement's closing brace.

As its name suggests, the ``if``-``else`` statement can provide an alternative set of statements for when the ``if`` condition is ``false``:

.. testcode::

    (swift) temperatureInFahrenheit = 40
    (swift) if temperatureInFahrenheit <= 32 {
        println("It's very cold. Consider wearing a scarf.")
    } else {
        println("It's not that cold. Wear a t-shirt.")
    }
    >>> It's not that cold. Wear a t-shirt.

One of of these two branches will always be executed.
Because the temperature has increased to ``40`` degrees Fahrenheit,
it is no longer cold enough to advise wearing a scarf,
and so the ``else`` branch is triggered instead.

Multiple ``if``-``else`` statements can be chained together,
to consider additional clauses:

.. testcode::

    (swift) temperatureInFahrenheit = 90
    (swift) if temperatureInFahrenheit <= 32 {
        println("It's very cold. Consider wearing a scarf.")
    } else if temperatureInFahrenheit >= 86 {
        println("It's really warm. Don't forget to to wear sunscreen.")
    } else {
        println("It's not that cold. Wear a t-shirt.")
    }
    >>> It's really warm. Don't forget to to wear sunscreen.

Here, an additional ``if`` clause has been added to respond to particularly warm temperatures.
The final ``else`` clause still remains,
as a catch-all for temperatures that are neither too warm nor too cold.

The final ``else`` clause is optional, however, and can be excluded if the set of conditions does not need to be complete:

.. testcode::

    (swift) temperatureInFahrenheit = 72
    (swift) if temperatureInFahrenheit <= 32 {
        println("It's very cold. Consider wearing a scarf.")
    } else if temperatureInFahrenheit >= 86 {
        println("It's really warm. Don't forget to to wear sunscreen.")
    }

In this example,
the temperature is neither too cold nor too warm to trigger the ``if`` or ``else if`` conditions,
and so no message is printed.

.. _ControlFlow_Switch:

Switch
~~~~~~

A ``switch`` statement considers several possible values of the same type,
and executes different code depending on the value that is matched.
It provides an alternative approach to the ``if``-``else`` statement for responding to multiple states.

.. TODO: have I actually described how case statements work by this point?
   They were previously described in the enumerations section of Basic Types,
   which appeared before this section, but has now been moved.

The following example matches a ``UnicodeScalar``,
and determines if it represents a number symbol in one of four languages.
Multiple values are covered in a single ``case`` statement on one line,
for brevity:

.. testcode::

    (swift) let numberSymbol = '三'   // Simplified Chinese symbol for the number 3
    // numberSymbol : UnicodeScalar = '三'
    (swift) var integerValue: Int? = .None
    // integerValue : Int? = <unprintable value>
    (swift) switch numberSymbol {
        case '1', '١', '一', '๑':
            integerValue = 1
        case '2', '٢', '二', '๒':
            integerValue = 2
        case '3', '٣', '三', '๓':
            integerValue = 3
        case '4', '٤', '四', '๔':
            integerValue = 4
        default:
            integerValue = .None
    }
    (swift) if integerValue {
        println("The integer value of \(numberSymbol) is \(integerValue!).")
    } else {
        println("An integer value could not be found for \(numberSymbol).")
    }
    >>> The integer value of 三 is 3.

.. TODO: The initialization of integerValue can be removed
  once the REPL supports uninitialized named values.

This example checks ``numberSymbol`` to see if it is
a Latin, Arabic, Chinese or Thai symbol for
the numbers ``1`` to ``4``.
If a match is found,
it sets an optional ``Int?`` variable (``integerValue``) to the appropriate integer value.
If the symbol is not recognized,
the optional ``Int?`` is set to a value of ``.None``, meaning “no value”.
Finally, it checks to see if a value was found.
If it was, the output value is printed;
otherwise, an error message is reported.

Note that the value of ``integerValue`` has
an exclamation mark on the end (``integerValue!``)
when it is printed by the ``println`` function.
This tells Swift to retrieve and use the *actual* value stored inside the optional variable,
which has been confirmed to exist by the previous line of code.
(Optional values are described in more detail in :doc:`BasicTypes`.)

Every ``switch`` statement must be exhaustive.
This means that every possible input value must be matched by
one of the ``case`` statements inside the ``switch`` statement.
If it is not appropriate to provide a ``case`` statement for every possible value,
you can define a default catch-all case to cover any values that are not addressed explicitly.
This catch-all case is indicated by the keyword ``default``,
and should always appear last, as in the example above.

It is not practical to list every single possible ``UnicodeScalar`` value,
and so a ``default`` case is used here
to provide a catch-all case for any characters that have not already been matched.
This also provides a handy opportunity to set the optional integer value to ``.None``,
to indicate that no match was found.

.. _ControlFlow_RangeMatching:

Range Matching
______________

Values in ``case`` statements can be checked for their inclusion in a range.
This example uses number ranges
to provide a natural-language count for numbers of any size:

.. testcode::

    (swift) let count = 3_000_000_000_000
    // count : Int = 3000000000000
    (swift) let countedThings = "stars in the Milky Way"
    // countedThings : String = "stars in the Milky Way"
    (swift) var naturalCount = ""
    // naturalCount : String = ""
    (swift) switch count {
        case 0:
            naturalCount = "no"
        case 1:
            naturalCount = "one"
        case 2:
            naturalCount = "a couple of"
        case 3:
            naturalCount = "a few"
        case 4..11:
            naturalCount = "several"
        case 12..99:
            naturalCount = "dozens of"
        case 100..999:
            naturalCount = "hundreds of"
        default:
            naturalCount = "lots and lots of"
    }
    (swift) println("There are \(naturalCount) \(countedThings).")
    >>> There are lots and lots of stars in the Milky Way.

.. TODO: change these ranges to be closed ranges rather than half-closed ranges
   once rdar://14586400 is implemented.
.. TODO: remove the initializer for naturalCount once we can declare unitialized variables in the REPL.
.. TODO: Add a description for this example.

.. _ControlFlow_Tuples:

Tuples
______

Multiple values can be tested in the same ``switch`` statement using tuples.
Each element of the tuple can be tested against a different value or range of values.
Alternatively, the underscore (``_``) identifier can be used to match any possible value.

This example takes an (x, y) point,
and categorizes it on the following graph:

.. image:: ../images/coordinateGraphSimple.png
    :height: 250
    :align: center

It decides if the point is
at the origin (0, 0);
on the red x-axis;
on the orange y-axis;
inside the blue 4-by-4 box centered on the origin;
or outside of the box altogether.

.. testcode::

    (swift) var point = (1, 1)
    // point : (Int, Int) = (1, 1)
    (swift) switch point {
        case (0, 0):
            println("(0, 0) is at the origin")
        case (_, 0):
            println("(\(point.0), 0) is on the x-axis")
        case (0, _):
            println("(0, \(point.1)) is on the y-axis")
        case (-2..2, -2..2):
            println("(\(point.0), \(point.1)) is inside the box")
        default:
            println("(\(point.0), \(point.1)) is outside of the box")
    }
    >>> (1, 1) is inside the box

Unlike C, Swift allows multiple ``case`` statements to consider the same value or values.
In fact, the point (0, 0) could match all *four* of the ``case`` statements in this example.
However, if multiple matches are possible,
the first matching ``case`` will always be used.
The point (0, 0) would match ``case (0, 0)`` first,
and so all other matching ``case`` and ``default`` statements would be ignored.

.. TODO: The type of a tuple can be used in a case statement to check for different types:
   var x: Any = (1, 2)
   switch x {
   case is (Int, Int):

.. _ControlFlow_Where:

Where
_____

A ``case`` statement can check for additional conditions using the ``where`` clause.
The example below takes an (x, y) point expressed as a tuple of type ``(Int, Int)``,
and categorizes it on the following graph:

.. image:: ../images/coordinateGraphComplex.png
    :height: 250
    :align: center

It decides if the point is
at the origin (0, 0);
on the red x-axis;
on the orange y-axis;
on the green diagonal line where ``x == y``;
on the purple diagonal line where ``x == -y``;
or none of the above.

.. testcode::

    (swift) point = (1, -1)
    (swift) switch point {
        case (0, 0):
            println("(0, 0) is at the origin")
        case (_, 0):
            println("(\(point.0), 0) is on the x-axis")
        case (0, _):
            println("(0, \(point.1)) is on the y-axis")
        case let (x, y) where x == y:
            println("(\(x), \(y)) is on the line x == y")
        case let (x, y) where x == -y:
            println("(\(x), \(y)) is on the line x == -y")
        case let (x, y):
            println("(\(x), \(y)) is just some arbitrary point")
    }
    >>> (1, -1) is on the line x == -y

The final three ``case`` statements declare placeholder constants ``x`` and ``y``,
which temporarily take on the two tuple values from ``point``.
These constants can then be used as part of a ``where`` clause,
to create a dynamic filter.
The ``case`` statement will only match the current value of ``point``
if the ``where`` clause's condition equates to ``true`` for that value.

The x-axis and y-axis checks could also have been written with a ``where`` clause.
``case (_, 0)`` could have been written as ``case (_, let y) where y == 0``,
to match points on the x-axis.
However, the original version is more concise,
and is preferred when matching against a fixed value.

Once the temporary constants ``x`` and ``y`` have been declared,
they can be used within the ``case`` statement's code block.
Here, they are used as shorthand for printing the values via the ``println`` function.
(The earlier ``case`` blocks printed the tuples' individual values
using the shorthand syntax ``point.0`` and ``point.1`` instead,
because they did not have the temporary constants to hand.)

Note that this ``switch`` statement does not have a ``default`` block.
The final ``case`` block,
``case let (x, y)``,
declares a tuple of two placeholder constants,
but does *not* provide a ``where`` clause to filter them.
As a result, it matches all possible remaining values,
and a ``default`` block is not needed to make the ``switch`` statement exhaustive.

.. QUESTION: This example is not self-contained,
   in that it uses the same declared variable (point) as the previous example.
   This is primarily to keep the variable name readable within the println string interpolation.
   Is this okay? Should it be changed so that it is self-contained?

.. _ControlFlow_OptionalBinding:

Optional Binding
----------------

:newTerm:`Optional binding` is a convenient way to find out if an optional contains a value,
and to make that value available if it exists.
Optional bindings can be used with ``if``-``else`` and ``while`` statements
to simplify and shorten the unwrapping of optionals.

For example:

.. testcode::

    (swift) let possibleNumber = "123"
    // possibleNumber : String = "123"
    (swift) if let convertedNumber = possibleNumber.toInt() {
        println("'\(possibleNumber)' has the integer value \(convertedNumber)")
    } else {
        println("'\(possibleNumber)' could not be converted to a number")
    }
    >>> '123' has the integer value 123

This example uses ``String``\ 's ``toInt()`` function
to try and convert the string ``"123"`` into an ``Int``.
It then prints a message to indicate if the conversion was successful.
(``toInt()`` returns an *optional* ``Int``,
which only contains an ``Int`` if the conversion is succesful.)

``if let convertedNumber = possibleNumber.toInt()`` can be read as:

“If the optional returned by ``possibleNumber.toInt()`` contains a value,
set a new constant called ``convertedNumber`` to the value contained in the optional.”

If the conversion is successful,
the ``convertedNumber`` constant becomes available for use within
the first branch of the ``if``-``else`` statement.
It has already been initialized with the value contained *within* the optional,
and so there is no need to use the ``!`` suffix to access its value.
In this example, ``convertedNumber`` is simply used to print the result of the conversion.

You can use both constants and variables with optional binding.
If you wanted to manipulate the value of ``convertedNumber``
within the first block of the ``if``-``else`` statement,
you could write ``if var convertedNumber`` instead,
and the value contained within the optional
would be made available as a variable rather than a constant.

.. note::

    Constants or variables created via optional binding
    are only available within the code block following their creation,
    as in the first branch of the ``if``-``else`` statement above.
    If you want to work with the optional's value outside of this code block,
    you should declare a constant or variable yourself
    before the ``if``-``else`` statement begins.

.. TODO add an example for 'while'.

.. _ControlFlow_ControlTransferStatements:

Control Transfer Statements
---------------------------

:newTerm:`Control transfer statements` give a way to
change the order in which your code is executed,
by transferring control from one piece of code to another.
Swift has four control transfer statements:

* ``continue``
* ``break``
* ``fallthrough``, and
* ``return``

Unlike some languages,
the ``return`` statement is only ever used with functions and closures in Swift.
The ``return`` statement is described in :doc:`Functions`.

.. _ControlFlow_Continue:

Continue
~~~~~~~~

The ``continue`` statement tells a loop to stop what it is doing,
and start again at the beginning of the next iteration through the loop.
It gives a way to say “I am done with the current loop iteration”,
without leaving the loop altogether.

.. note::

    In a ``for``-``condition``-``increment`` loop,
    the incrementer will still be evaluated after calling the ``continue`` statement.
    The loop itself continues to work as normal;
    only code within the loop's body is skipped.

The following example takes a lowercase string,
and removes all of its vowels and spaces to create a cryptic puzzle phrase for someone to try and guess:

.. testcode::

    (swift) let puzzleInput = "great minds think alike"
    // puzzleInput : String = "great minds think alike"
    (swift) var puzzleOutput = ""
    // puzzleOutput : String = ""
    (swift) for letter in puzzleInput.chars {
        switch letter {
            case 'a', 'e', 'i', 'o', 'u', ' ':
                continue
            default:
                puzzleOutput += letter
        }
    }
    (swift) println(puzzleOutput)
    >>> grtmndsthnklk

The ``letter`` constant is inferred to be of type ``UnicodeScalar``
from the fact that it is iterating over a sequence of ``UnicodeScalar`` values.
This is why the case statement compares ``letter`` against ``UnicodeScalar`` values
(with single quote marks) rather than ``String`` values.

The code above calls the ``continue`` keyword whenever it matches a vowel or a space.
This causes the current iteration of the loop to end immediately,
and jump straight to the start of the next iteration.
It enables the switch block to match (and ignore) just these six special characters,
rather than having to match every character that should get printed.

.. _ControlFlow_Break:

Break
~~~~~

The ``break`` statement is similar to the ``continue`` statement,
except that it jumps out of the loop altogether,
transferring control to the first line of code after the loop's closing brace (``}``).
No further code from the current iteration of the loop is executed,
and no further iterations of the loop are started.

The following example shows the ``continue`` and ``break`` statements in action.
This is an adapted version of the keyboard example from earlier.
Unlike before, this version deliberately ignores any spaces in the person's name.
Try entering your full name
(rather than just your first name or given name)
to see it in action::

    (swift) var personName = ""
    // personName : String = ""
    (swift) let keyboard = Keyboard()
    // keyboard : Keyboard = <_TtCSs8Keyboard instance>
    (swift) println("Please enter your name, then press return.")
    >>> Please enter your name, then press return.
    (swift) while true {
        let inputCharacter = UnicodeScalar(keyboard.read())
        switch inputCharacter {
            case ' ':
                continue
            case '\n':
                break
            default:
                personName += inputCharacter
        }
    }
    (swift) if personName == "" {
        println("You didn't enter your name. How can I say hello to you?")
    } else {
        println("Hello, \(personName)!")
    }

.. TODO: This example cannot be auto-tested, as it is reliant on keyboard input.
   It must be tested manually before this book is published.

This time, the keyboard's ``while`` loop has a very simple condition: ``while true``.
This condition will *always* be true,
and so this is effectively an infinite loop.
The only way to end this loop is to break out of it from within.

Each time the loop runs,
a new ``inputCharacter`` is read from the keyboard.
If the character is a space,
a ``continue`` statement is used to skip to the next loop iteration.
This effectively ignores the space altogether.
If the character is a line break
(meaning that the return key was pressed),
a ``break`` statement is used to exit the loop immediately,
jumping to the ``if personName == ""`` line after the loop.
Otherwise, the new character is appended to the ``personName`` string as before.

.. _ControlFlow_Fallthrough:

Fallthrough
~~~~~~~~~~~

Switch statements in Swift do not fall through the bottom of each case and into the next one.
Instead, the entire switch statement completes its execution as soon as the first matching case is completed.
This is different from C,
which requires you to insert an explicit ``break`` statement at the end of every ``case`` to prevent fall-through.
Avoiding default fall-through means that Swift ``switch`` statements are
much more concise and predictable than their counterparts in C,
and avoids executing multiple ``case`` blocks by mistake.

If you want to opt in to C-style fallthrough behavior,
you can do so using the ``fallthrough`` keyword.
The example below uses ``fallthrough`` to create a textual description of a number:

.. testcode::

    (swift) let integerToDescribe = 5
    // integerToDescribe : Int = 5
    (swift) var description = "The number \(integerToDescribe) is"
    // description : String = "The number 5 is"
    (swift) switch integerToDescribe {
        case 2, 3, 5, 7, 11, 13, 17, 19:
            description += " a prime number, and also"
            fallthrough
        default:
            description += " an integer."
    }
    (swift) println(description)
    >>> The number 5 is a prime number, and also an integer.

This example declares a new ``String`` variable called ``description``,
and assigns it an initial value.
The function then considers the value of ``integerToDescribe`` using a ``switch`` statement.
If the value of ``integerToDescribe`` is one of the prime numbers in the list,
the function appends some text to the end of ``description``,
to note that the number is prime.
It then uses the ``fallthrough`` keyword to “fall into” the ``default`` case as well.
The ``default`` case adds some extra text onto the end of the description,
and the ``switch`` statement is complete.

If the value value of ``integerToDescribe`` is *not* in the list of known prime numbers,
it is not matched by the first ``case`` statement at all.
There are no other specific cases,
and so it ends up being matched by the catch-all ``default`` case.

Once the ``switch`` statement is done,
the number's description is printed using the ``println`` function.
In this example,
the number ``5`` is correctly identified as being a prime number.

Fallthrough does not check the ``case`` conditions for the block it falls into.
It simply causes code execution to move directly to the statements inside the next ``case`` (or ``default``) block,
as in C's standard ``switch`` statement behavior.

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#branching-and-looping
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#pattern-matching
    * https://[Internal Staging Server]/docs/Pattern%20Matching.html
    * https://[Internal Staging Server]/docs/LangRef.html#pattern-expr
    * /swift/include/swift/AST/Stmt.h
    * /swift/test/IDE/complete_stmt_controlling_expr.swift
    * /swift/test/interpreter/break_continue.swift
    * /swift/test/Parse/foreach.swift
    * /swift/test/reverse.swift
    * /swift/test/statements.swift
