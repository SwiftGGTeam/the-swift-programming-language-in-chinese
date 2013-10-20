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
    * Clarity around half-closed (1..10) and closed (1...10) ranges
    * Variable scope (as this is the first time we've defined scopes)
    * Clarification around expressions and statements?

Control Flow
============

Loops
-----

for x in y
~~~~~~~~~~

Enumerable protocol

for x in y {…}

for _ in y {…}

for i in a..b {…}

for i in reverse(a..b) {…}

for (key, value) in dict {…}

while and do while
------------------

``while`` loops are useful when you need to repeat a task an unknown number of times until a certain condition arises. They keep repeating a task ``while`` a certain condition is true. Usually, the condition will change from ``true`` to ``false`` at some point due to the actions in the loop's body, causing the loop to end the next time around.

Swift provides two variations of the ``while`` loop. The first considers a single condition, and then repeats the loop until the condition equates to false:

.. testcode::

    (swift) var alphabet = ""
    // alphabet : String = ""
    (swift) var asciiCodeForA = 65
    (swift) while alphabet.length < 26 {
                alphabet += Char(asciiCodeForA + alphabet.length)
            }
    (swift) println(alphabet)
    >>> ABCDEFGHIJKLMNOPQRSTUVWXYZ

.. testcode::

    (swift) var output = ""
    (swift) var keyboard = Keyboard()
    (swift) println("Please enter your name, then press return.")
    (swift) var input = Char(keyboard.read())
    (swift) while input != '\r' {
                output += input
                input = keyboard.read()
            }
    (swift) if output == "" {
                println("You didn't enter your name. How can I say hello to you?")
            } else {
                println("Hello, \(output)!")
            }

The second form performs a single pass through the loop block first, *before* considering the single condition. It then continues to repeat the loop until the condition is ``false`` at the end of one pass through the loop:

    (swift) do {
                
            } while condition

for initialization; condition; increment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Although ``for x in y`` is the preferred loop syntax, Swift also supports the traditional C-style ``for`` loop:

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

Note that semicolons are used to separate the three parts of the ``for`` loop's definition, and that parentheses are not required around the three expressions that define the ``for`` loop.

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

Note that any variables defined within the initialization expression (such as ``var index = 0``) are only valid within the scope of the ``for`` loop. If you want to retrieve the final value of ``index`` after the loop had ended, you need to declare ``index`` before the loop scope begins:

.. testcode::

    (swift) var index : Int = 0
    (swift) for index = 0; index < 3; ++index {
                println("index is \(index)")
            }
    >>> index is 0
    >>> index is 1
    >>> index is 2
    (swift) println("The loop statements were executed \(index) times")
    >>> The loop statements were executed 3 times

.. We shouldn't need to initialize index to 0 on the first line of this example, but sadly we have no choice, as variables can't currently be used unitialized in the REPL.

Note that the final value of ``index`` after completing this loop is ``3``, not ``2``. The last time the increment statement ``++index`` is called, it sets ``index`` to ``3``, which causes ``index < 3`` to equate to ``false``, ending the loop.

Multiple variables can be initialized at the same time, and multiple incrementers can be evaluated at once:

.. testcode::

    (swift) for var x = 0, y = 0; x + y <= 9; (++x, ++y) {
                println("Point \(x) on the line x == y is (\(x), \(y))")
            }
    >>> Point 0 on the line x == y is (0, 0)
    >>> Point 1 on the line x == y is (1, 1)
    >>> Point 2 on the line x == y is (2, 2)
    >>> Point 3 on the line x == y is (3, 3)

.. TODO: Remove the parentheses around the incrementers once rdar://15267269 is fixed.

.. QUESTION: this is quite a lot of information on C-style for loops, which aren't really the preferred way to loop in Swift. Should we cut this section back?

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
