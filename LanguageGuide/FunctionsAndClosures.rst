.. docnote:: Subjects to be covered in this section

    * Functions
    * Function signatures (including pattern matching)
    * Setting variables to functions
    * init() functions for enums
    * Naming conventions
    * return statement
    * Closures
    * Trailing closures
    * Can only have one variadic parameter
    * Nested closures
    * Capturing values
    * Different closure expression forms
    * Anonymous closure arguments
    * Thick and thin functions (?)
    * Attributes (infix, resilience, inout, auto_closure, noreturn)
    * Typedefs for closure signatures to aid readability?
    * Metatypes and static functions on types
    * Marking functions as transparent (and what this means)

Functions and Closures
======================

Functions
---------

:newTerm:`Functions` are self-contained chunks of code that perform a specific task.
Every function is given a name to identify what it does,
and this name is used to ‘call’ the function to perform its task when needed.

Function Declarations
~~~~~~~~~~~~~~~~~~~~~

A function can be given some *input* values to work with
(known as :newTerm:`parameters`),
and can pass back some *output*
(known as a :newTerm:`return value`)
when it is done.
The function's name should describe the task that it performs.
The function below is called ``sayHello``,
because that's what it does –
it takes a person's name as input,
and passes back a greeting for that person.
To do this, it takes one input parameter –
a ``String`` value called ``personName`` –
and returns an output ``String`` value containing a greeting for that person.

All of this information is rolled up into the function's :newTerm:`declaration`,
which can be seen in the first line of the example below.
Functions are declared using the ``func`` keyword
(in a similar way to how variables are declared using the ``var`` keyword).
This example declares a function called ``sayHello`` that accepts a single parameter called ``personName``,
which is of type ``String``.
The function returns a ``String`` value when it is done,
as indicated by the return operator ``->``
(a hyphen followed by a greater-than symbol).

The declaration describes what the function does,
what it expects to receive,
and what it will return when it is done.
This makes it easy for the function to be called from elsewhere in your code in a clear and unambiguous way.

.. testcode::

    (swift) func sayHello(personName: String) -> String {
        let greeting = "Hello, " + personName + "!"
        return greeting
    }
    (swift) println(sayHello("Cheryl"))
    >>> Hello, Cheryl!
    (swift) println(sayHello("Dave"))
    >>> Hello, Dave!

The ``sayHello`` function is called by passing it a ``String`` value in parentheses,
such as ``sayHello("Cheryl")``.
Because ``sayHello`` returns a ``String``,
it can be wrapped in a call to the ``println`` function
to print that ``String`` and see its value, as shown above.

The ``sayHello`` function starts by declaring a new ``String`` constant called ``greeting``,
and setting it to a simple greeting message for ``personName``.
This greeting is then passed back out of the function using the ``return`` keyword.
As soon as ``return greeting`` is called,
the function finishes its execution,
and passes back the current value of ``greeting``.

Now that it has been defined as a function,
``sayHello`` can be called multiple times with different input values.
The example above shows what happens if it is called with an input value of ``"Cheryl"``,
and an input value of ``"Dave"``.
The function returns a tailored greeting in each case.

The contents of this function could actually be simplified further,
to combine the message creation and the return statement into one line:

.. testcode::

    (swift) func sayHelloAgain(personName: String) -> String {
        return "Hello again, " + personName + "!"
    }
    (swift) println(sayHelloAgain("Cheryl"))
    >>> Hello again, Cheryl!

.. admonition:: Experiment

    Try calling this function with your own name.
    Once you've done that,
    see what happens if you change the message to a different greeting.

    Try using this function to say hello to a friend instead.
    You could use an ``if else`` statement to make it reply with a special greeting when it recognizes your name,
    and a different greeting for everyone else.

    What about if you pass in a second input parameter (also a ``String``),
    called ``birthdayType``?
    (You can separate multiple input parameters with a comma.)
    ``birthdayType`` should contain the type of birthday you want to celebrate,
    such as ``12th`` or ``21st``.
    Can you make a function called ``sayHappyBirthday``,
    and use it to wish somebody called ``Peter`` a happy ``40th`` birthday?

    For bonus points,
    make this new second parameter be an ``Int`` called ``age``
    (rather than a ``String`` called ``birthdayType``),
    and work out whether ``age`` should have
    ``st``, ``nd``, ``rd`` or ``th``
    (as in ``1st``, ``2nd``, ``3rd`` or ``4th``)
    on the end.
    Can you get it to work for any value of ``age``?

Multiple Input Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~

Functions can have multiple input parameters.
This function takes an x and y value for a coordinate,
and works out how far that coordinate is from the origin (0, 0) using Pythagoras' Theorem:

.. testcode::

    (swift) func distanceFromOrigin(x: Double, y: Double) -> Double {
        return 5.0
        //return sqrt(x * x + y * y)
    }
    (swift) println(distanceFromOrigin(3.0, 4.0))
    >>> 5.0

This example uses a square root function called ``sqrt`` to help calculate Pythagoras' Theorem.
``sqrt`` is an always-available global math function provided ‘for free’ by Swift.
(There are quite a few others too, as described in :doc:`StandardFunctions`.)

The ``sqrt`` function is defined to take a ``Double`` value as its only input parameter,
and to return the square root of that value as its output
(also as a ``Double``).

.. TODO: Replace sqrt() with something that doesn't require us to import Darwin.

Tuples As Input Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~

Any type of value can be used as an input parameter for a function,
if it is declared appropriately.
For example, the distance function above can be rewritten to take a tuple of two ``Double`` values:

.. QUESTION: Is my use of ‘any’ technically correct here?
   Is there some type that cannot be passed to a function?

.. testcode::

    (swift) func distanceFromOriginForPoint(point: (Double, Double)) -> Double {
        return 5.0
        //return sqrt(point.0 * point.0 + point.1 * point.1)
    }
    (swift) var somePoint = (3.0, 4.0)
    // somePoint : (Double, Double) = (3.0, 4.0)
    (swift) println(distanceFromOriginForPoint(somePoint))
    >>> 5.0

Note that this function takes *one* input parameter, not two.
Its single input parameter is a tuple containing two ``Double`` values.
This ability to bundle up related values into a single compound value is one of the major benefits of tuples.
This function can be passed any tuple of type ``(Double, Double)`` –
such as ``(3.0, 4.0)`` in the example above –
and it will happily calculate the distance for that tuple.

.. TODO: These examples use sqrt(), which now has to be imported from Darwin.
   This has been temporarily disabled,
   as it might be better to find an example that does not require an import at this stage.

Parameter Names
~~~~~~~~~~~~~~~

Values can be passed to a function using the parameter names from the function's declaration.
This helps to make their purpose clear,
and also enables values to be passed in a different order to the original function declaration.

.. testcode::

    (swift) func containsCharacter(stringToSearch: String, characterToFind: UnicodeScalar) -> Bool {
        for character in stringToSearch.chars {
            if character == characterToFind {
                return true
            }
        }
        return false
    }
    (swift) let containsASpace = containsCharacter(
        characterToFind: ' ',
        stringToSearch: "This will return true")
    // containsASpace : Bool = true

Here, the parameter values are passed in a different order when the function is actually called.
Because they are named,
it is still clear which value should be used for which parameter.

If ``characterToFind`` is found quickly,
this example returns ``true`` before the entire set of characters in ``stringToSearch`` has been checked.
As soon as the first matching character is found,
``containsCharacter`` returns ``true``,
and doesn't even bother to check the remaining characters.
You can return control from a function at any time,
and it will stop what it is doing immediately.
In fact, this function will only return ``false`` if the entire set of characters in ``stringToSearch`` is exhausted,
and the end of the for loop is reached.

If parameter names are *not* provided when calling a method,
the passed parameters are assumed to be in the order they were originally declared:

.. testcode::

    (swift) let containsAHyphen = containsCharacter("This will return false", '-')
    // containsAHyphen : Bool = false

Default Parameter Values
~~~~~~~~~~~~~~~~~~~~~~~~

Function parameters can be assigned :newTerm:`default values`.
If a default value is defined in the function declaration,
it can be omitted when calling the function:

.. testcode::

    (swift) func joinTwoStrings(string1: String, string2: String, joiner: String = " ") -> String {
        return string1 + joiner + string2
    }
    (swift) joinTwoStrings("hello", "world", ":")
    // r0 : String = "hello:world"
    (swift) joinTwoStrings("hello", "world")
    // r1 : String = "hello world"

This function joins two strings together.
If a value for ``joiner`` is provided,
that string is used to join the two strings together,
as shown in the first example,
which uses a colon to join the two words.
If no value of ``joiner`` is provided,
a default value
(in this case a string containing a single space)
is used instead.

It's important to choose an appropriate order for function parameters when working with default values.
The ``joinTwoStrings`` function could have been written with ``joiner`` as the second (rather than third) parameter:

.. testcode::

    (swift) func joinTwoMoreStrings(string1: String, joiner: String = " ", string2: String) -> String {
        return string1 + joiner + string2
    }
    (swift) joinTwoMoreStrings("hello", ":", "world")
    // r2 : String = "hello:world"

However, if you try and call this version of the function without passing in a value for ``joiner``,
and without using named values,
the code will not compile::

    (swift) joinTwoMoreStrings("hello", "world")           // this will cause an error

Because the values are not named in the function call,
it looks as though you have only provided two (rather than three)
of the expected parameters for the function.
Without named values,
Swift assigns the first value (``"hello"``)
to the first parameter (``string1``);
the second value (``"world"``)
to the second parameter (``joiner``);
and cannot find a value for the third parameter (``string2``).

This problem can be avoided by naming the values when you call the function:

.. testcode::

    (swift) joinTwoMoreStrings(string1: "hello", string2: "world")
    // r3 : String = "hello world"

This tells Swift which parameters you want
the values of "hello" and "world" to be used for,
and the code compiles without error,
using the default value of ``joiner`` as before.

As a general rule,
it is best to place any parameters with default values at the end of a function declaration.
It is also advisable to name the values in your function calls whenever a function takes more than one parameter,
to ensure that your intentions are clearly expressed in your code.

.. QUESTION: how does this advice overlap with
   the principle of putting variadic parameters last,
   and also the principle of putting closure parameters last?

Non-Mandatory Parameters and Return Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Functions don't have to have input parameters.
Here's a function with no input parameters,
which always returns the same ``String`` message whenever it is called:

.. testcode::

    (swift) func sayHelloWorld() -> String {
        return "hello, world"
    }
    (swift) println(sayHelloWorld())
    >>> hello, world

The function declaration still needs parentheses after the function's name,
even though it does not take any parameters.
It is also called with empty parentheses when used.

Functions don't have to return a value, either.
Here's a version of the ``sayHello`` function,
called ``waveGoodbye``,
which prints its own ``String`` value rather than returning it:

.. testcode::

    (swift) func waveGoodbye(personName: String) {
        println("Goodbye, \(personName) 👋")
    }
    (swift) waveGoodbye("Dave")
    >>> Goodbye, Dave 👋

Because it does not need to return a value,
the function's declaration does not include the return operator (``->``)
or a return type.

Strictly speaking, this function *does* still return a value,
even though no return value is declared.
Functions without a declared return type return a special value of type ``Void``.
This is simply an empty tuple,
i.e. a tuple with zero elements,
which can be written as ``()``.

The return value of a function can be ignored when it is called:

.. testcode::

    (swift) func printAndCount(stringToPrint: String) -> Int {
        println(stringToPrint)
        return stringToPrint.length
    }
    (swift) func printWithoutCounting(stringToPrint: String) {
        printAndCount(stringToPrint)
    }
    (swift) printAndCount("hello, world")
    >>> hello, world
    // r4 : Int = 12
    (swift) printWithoutCounting("hello, world")
    >>> hello, world

The first function,
``printAndCount``,
prints a string,
and then returns its length as an ``Int``.
The second function,
``printWithoutCounting``,
calls the first function,
but ignores its returned value.
When the second function is called,
the message is still printed by the first function,
but the returned value is not used.

Return values can be ignored,
but a function that says it will return a value must always do so.
A function with a declared return type must
never allow control to fall out of the bottom of the function
without returning a value.

Selector-Style Function Declarations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift actually supports *two* different styles of function declaration.
All of the examples so far have used the first style,
known as *function-style* declaration.
This follows the C approach
of putting all of the parameters inside one set of parentheses
immediately after the function name.

The second style,
known as *selector-style* declaration,
follows a similar style to Objective-C messaging.
Each parameter has its own set of parentheses,
and the function's name is split into multiple parts
if it has more than one parameter.

[to be written]

Closures
--------

[to be written]

.. variables can be set to functions, and then called e.g. var fork = g.fork; fork() .
.. functions can be passed in as parameters, and can be returned as return values
.. capturing / closing over variables (and what this means in practice)
.. no need for __block; discuss memory safety
.. functions are just a really special non-capturing version of closures
.. closures can be named
.. inout properties and a general discussion of byref / byvalue
.. pass a tuple as the entire set of arguments, as in var argTuple = (0, "one", '2'); x.foo:bar:bas:(argTuple)
.. parameters are immutable by default, and do not implicitly create shadow variables

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#functions
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#closures
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#functions-vs-closures
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#nested-functions
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#closure-expressions
    * https://[Internal Staging Server]/docs/whitepaper/Closures.html#trailing-closures
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#functions
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#closures
    * https://[Internal Staging Server]/docs/Expressions.html
    * /test/Serialization/Inputs/def_transparent.swift (example of currying)