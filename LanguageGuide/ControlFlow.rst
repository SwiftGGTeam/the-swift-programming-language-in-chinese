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

Loops
-----

for x in y
~~~~~~~~~~

Swift provides a powerful way to iterate over collections of items, such as a range of numbers, the items in an array, or the characters in a string. Here's a simple example, which prints the first few entries in the five-times-table:

.. testcode::

    (swift) for index in 1..5 {
                println("\(index) times 5 is \(index * 5)")
            }
    >>> 1 times 5 is 5
    >>> 2 times 5 is 10
    >>> 3 times 5 is 15
    >>> 4 times 5 is 20

Here, the collection of items being iterated is a half-open range of numbers from ``1`` to ``5``. The value of ``index`` is set to the first number in the range (``1``), and the statements inside the loop are executed. In this case, the loop only contains one statement, which prints an entry from the five-times-table for the current value of ``index``. Once the statement has been executed, the value of ``index`` is updated to contain the second value in the range (``2``), and the ``println`` statement is executed again. This continues until the end of the range is reached. Because the range is half-open, its final value of ``5`` is not used.

Note that the variable ``index`` does not have to be declared before it is used as part of this loop. It is implicitly declared simply by its inclusion in the loop declaration. This does, however, mean that it only exists within the scope of the loop. If you want to check the value of ``index`` after the loop has completed, you must declare it as a variable in advance of its use in the loop.

If you don't actually need each value from the range, you can ignore them using an underscore in place of a variable name:

.. testcode::

    (swift) var base = 3
    // base : Int = 3
    (swift) var power = 10
    // power : Int = 10
    (swift) var answer = 1
    // answer : Int = 1
    (swift) for _ in 0..power {
                answer *= base
            }
    (swift) println("\(base) to the power of \(power) is \(answer)")
    >>> 3 to the power of 10 is 59049

This example calculates the value of one number to the power of another (in this case, ``3`` to the power of ``10``). It does this by multiplying a starting value of ``1`` (i.e. ``3`` to the power of ``0``) by ``3``, ten times, using a half-open loop that starts with ``0`` and ends with ``9``. This calculation doesn't need to know the individual counter values each time through the loop – it simply needs to execute the loop the correct number of times. The underscore character ``_``, used in place of a loop variable, causes the individual values to be ignored.

``for x in y`` can also be used to iterate over the items in an array:

.. testcode::

    (swift) var names = ["Alan", "Barbara", "Carol", "Doug"]
    // names : String[] = ["Alan", "Barbara", "Carol", "Doug"]
    (swift) for name in names {
                println("Hello, \(name)!")
            }
    >>> Hello, Alan!
    >>> Hello, Barbara!
    >>> Hello, Carol!
    >>> Hello, Doug!

Lists can be iterated in reverse, using the ``reverse()`` function:

.. testcode::

    (swift) for name in reverse(names) {
                println("Goodbye, \(name)!")
            }
    >>> Goodbye, Doug!
    >>> Goodbye, Carol!
    >>> Goodbye, Barbara!
    >>> Goodbye, Alan!

Swift's ``String`` type has a ``chars`` property, which provides the individual characters in the string as an ``Array`` of ``Char`` values (also known as an ‘``Array`` of type ``Char``’). This can be used to iterate through the characters of a string in order. The following example takes a lowercase string, and removes all of its vowels and spaces to create a cryptic puzzle phrase for someone to try and guess:

.. testcode::

    (swift) var puzzlePhrase = "great minds think alike"
    // puzzlePhrase : String = "great minds think alike"
    (swift) for letter in puzzlePhrase.chars {
                switch letter {
                    case 'a', 'e', 'i', 'o', 'u', ' ':
                        continue
                    default:
                        print(letter)
                }
            }
    >>> grtmndsthnklk

The ``letter`` variable is inferred to be of type ``Char`` from the fact that it is iterating over an array of ``Char`` values. This is why the ``case`` statement compares ``letter`` against ``Char`` values (with single quote marks) rather than ``String`` values.

Note that the code above calls the ``continue`` statement whenever it matches a vowel or a space. ``continue`` is a special control flow keyword that causes the current iteration of the loop to end immediately and jump straight to the start of the next iteration. It enables the ``switch`` block to match (and ignore) just these six special characters, rather than having to match every character that should get printed. (The ``continue`` keyword is described in more detail later in this section.)

Iteration can also be used with dictionaries, to iterate over their key-value pairs:

.. testcode::

    (swift) var numberOfLegs = ["spider" : 8, "ant" : 6, "cat" : 4, "bird" : 2]
    // numberOfLegs : Dictionary<String, Int> = ["spider" : 8, "cat" : 4, "insect" : 6, "bird" : 2]
    (swift) for (key, value) in numberOfLegs {
                println("\(key)s have \(value) legs")
            }
    >>> spiders have 8 legs
    >>> cats have 4 legs
    >>> ants have 6 legs
    >>> birds have 2 legs

Note that the items in the ``Dictionary`` are not iterated in the same order as they were inserted. The contents of a ``Dictionary`` are inherently unordered, and iterating over them does not guarantee the order in which they will be retrieved.

.. TODO: provide some advice on how to iterate over a Dictionary in order (perhaps sorted by key), using a predicate or array sort or some kind.

The examples above use ``for x in y`` to iterate ranges, arrays, strings and dictionaries. However, this syntax can be used to iterate *any* collection, as long as it conforms to the ``Enumerable`` protocol. This can include your own classes and collection types. Protocols, including ``Enumerable``, are described in detail in :doc:`ProtocolsAndExtensions`.

.. QUESTION: are there any plans for enums be Enumerable? If so, they might make for a good example. What would the syntax be if they did? 'for planet in Planet', or even just 'for Planet'?

while and do while
~~~~~~~~~~~~~~~~~~

``while`` loops perform a set of statements until a condition becomes ``false``. They are best used when the number of iterations is not known before the first iteration begins. Swift provides two variations of the loop, known as ``while`` and ``do while``.

while
_____

``while`` loops start by considering a single condition. If the condition is ``true``, a set of statements are repeated until the condition becomes ``false``.

``while`` loops have a general form of::

    while <#condition equates to true#> {
        <#statements#>
    }

For example:

.. testcode::

    (swift) var personName = ""
    (swift) var keyboard = Keyboard()
    (swift) println("Please enter your name, then press return.")
    (swift) var inputCharacter = Char(keyboard.read())
    (swift) while inputCharacter != '\r' {
                personName += inputCharacter
                inputCharacter = Char(keyboard.read())
            }
    (swift) if personName == "" {
                println("You didn't enter your name. How can I say hello to you?")
            } else {
                println("Hello, \(personName)!")
            }

This example reads input from the keyboard one character at a time, and appends each character to a string. It does this using Swift's built-in ``Keyboard`` class, which reads keystrokes from an attached keyboard. The example creates a new ``Keyboard`` instance by calling its initializer method ``Keyboard()``. It then reads a key using the keyboard's ``read()`` method. This causes the program to pause and wait for a keystroke before continuing. The keystroke's value is returned as a ``UInt8`` value, containing the ASCII code of the key that was pressed. This is converted to a ``Char`` value, so that it can be appended to a ``String`` representing the person's name.

This program continues to read in keystrokes until the user presses the return key. When they do so, the value of ``inputCharacter`` will be a carriage return character (``\r``), causing ``while inputCharacter != '\r'`` to equate to ``false``, ending the loop. The person's name is then validated (to ensure that they did not press the return key without entering a name), and is printed if it exists.

A ``while`` loop is appropriate in this case because the length of the input name is not known at the start of the ``while`` loop. The loop's condition is dependent on external forces that cannot be predicted.

.. NOTE: this example cannot be run in the REPL, due to the fact that it is reliant on keyboard input. I have yet to come up with a better example where ‘while’ is the right kind of loop to use, however. (I'm trying to avoid any examples where the number of iterations is known at the start of the loop.)

do while
________

The second variation of the ``while`` loop performs a single pass through the loop block first, *before* considering a condition. It then continues to repeat the loop until the condition is ``false``::

    do {
        <#statements#>
    } while <#condition equates to true#>

.. TODO: come up with a good example for when you'd actually want to use a do while loop.

for initialization; condition; increment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to ``for x in y``, Swift also supports traditional ``for`` loops:

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

Note that semicolons are used to separate the three parts of the ``for`` loop's definition, and that parentheses are not required.

Here's how the loop is executed:

1. When the loop is first entered, the *initialization* expression is evaluated once, to set up any variables or values that are needed for the loop.

2. Next, the *condition* expression is evaluated. If it equates to ``false``, the loop ends, and code execution continues after the ``for`` loop's closing brace (``}``). Otherwise, code execution continues by executing the *statements* inside the braces.

3. After executing all of the *statements*, the *increment* expression is evaluated. It might increase or decrease the value of a counter, or set one of the initialized variables to a new value based on the outcome of the statements. After it has been evaluated, execution returns to step 2, and the *condition* expression is evaluated again.

This is effectively shorthand for::

    <#initialization#>
    while <#condition#> {
        <#statements#>
        <#increment#>
    }

Variables defined within the initialization expression (such as ``var index = 0``) are only valid within the scope of the ``for`` loop itself. If you want to retrieve the final value of ``index`` after the loop ends, you must declare ``index`` before the loop's scope begins:

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

.. TODO: We shouldn't need to initialize index to 0 on the first line of this example, but variables can't currently be used unitialized in the REPL.

Note that the final value of ``index`` after completing this loop is ``3``, not ``2``. The last time the increment statement ``++index`` is called, it sets ``index`` to ``3``, which causes ``index < 3`` to equate to ``false``, ending the loop.

Conditional Checks
------------------

if condition {…} else {…}

if condition {…} else if condition {…} else {…}

Switch Statements
-----------------

switch {…}

* case
* default
* break
* fallthrough

Control Statements
------------------

return
break
continue

Pattern Matching
~~~~~~~~~~~~~~~~

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
