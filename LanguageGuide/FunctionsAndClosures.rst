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

Functions and Closures
======================

Functions
---------

Functions are self-contained chunks of code that perform a specific task. Every function is given a name to identify what it does, and this name is used to ‘call’ the function to perform its task when needed.

A function can be given some *input* values to work with (known as *parameters*), and can pass back some *output* (known as a *return value*) when it is done. The function below is called ``sayHello``, because that's what it does – it takes a person's name as input, and passes back a greeting for that person. To do this, it takes one input parameter – a ``String`` value called ``personName`` – and returns an output ``String`` value containing a greeting for that person.

All of this information is rolled up into the function's *declaration*, which can be seen in the first line of the example below. Functions are declared using the ``func`` keyword (in a similar way to how variables are declared using the ``var`` keyword). This example declares a function called ``sayHello`` that accepts a single parameter called ``personName``, which is of type ``String``. The function returns a ``String`` value when it is done, as indicated by the return symbol, ``->``.

This declaration describes what the function does, what it expects to receive, and what it will return when it is done. This makes it easy for the function to be called from elsewhere in your code in a clear and unambiguous way.

.. testcode::

    (swift) func sayHello(personName : String) -> String {
                var greeting = "Hello, " + personName + "!"
                return greeting
            }
    (swift) println(sayHello("Cheryl"))
    >>> Hello, Cheryl!
    (swift) println(sayHello("Dave"))
    >>> Hello, Dave!

The ``sayHello`` function is called by passing it a ``String`` value in parentheses, such as ``sayHello("Cheryl")``. Because ``sayHello`` returns a ``String``, it can be wrapped in a ``println()`` function to print that string and see its value, as shown above.

``sayHello`` starts by declaring a new ``String`` variable called ``greeting``, and setting it to a simple greeting message for ``personName``. This greeting is then passed back out of the function using the ``return`` keyword. As soon as ``return greeting`` is called, the function finishes its execution, and passes back the current value of ``greeting``.

Now that it has been defined as a function, ``sayHello()`` can be called multiple times with different input values. The example above shows what happens if it is called with an input value of ``"Cheryl"``, and an input value of ``"Dave"``. The function returns a different greeting in each case.

The contents of this function could actually be simplified further, to combine the message creation and ``return`` statement into one line:

.. testcode::

    (swift) func sayHelloAgain(personName : String) -> String {
                return "Hello again, " + personName + "!"
            }
    (swift) println(sayHelloAgain("Cheryl"))
    >>> Hello again, Cheryl!

.. admonition:: Experiment

    Try calling this function with your own name. See what happens if you change the message to a different greeting.
    
    Try using this function to say hello to a friend instead. Perhaps use an ``if else`` statement to make it reply with a special greeting when it recognizes your name, and a different greeting for everyone else.
    
    What about if you pass in a second input parameter (also a ``String``), called ``birthdayType``? (You can separate multiple input parameters using a comma.) ``birthdayType`` should contain the type of birthday you want to celebrate, such as ``12th`` or ``21st``. Can you make a function called ``sayHappyBirthday``, and use it to wish somebody called ``Peter`` a happy ``40th`` birthday?
    
    For bonus points, make the second parameter be an ``Int`` called ``age`` (rather than a ``String`` called ``birthdayType``), and work out whether ``age`` should have ``st``, ``nd``, ``rd`` or ``th`` (as in ``1st``, ``2nd``, ``3rd`` and ``4th``) on the end. Can you get it to work for any value of ``age``?

Functions can have multiple input parameters. This function takes an x and y value for a coordinate, and works out how far that coordinate is from the origin (0, 0) using Pythagoras' Theorem:

.. testcode::

    (swift) func distanceFromOrigin(x : Double, y : Double) -> Double {
                return sqrt(Double(x * x + y * y))
            }
    (swift) println(distanceFromOrigin(3.0, 4.0))
    >>> 5.0

This example uses a ‘square root’ function, called ``sqrt()``, to help calculate Pythagoras' Theorem. ``sqrt()`` takes one ``Double`` value as input, and returns the square root of that value as its output (also as a ``Double``).

``sqrt()`` is one of several always-available math functions provided ‘for free’ by Swift. These are described in more detail in :doc:`StandardFunctions`.

Any type of value can be passed into a function. The distance function above could be reritten to take a tuple called ``point``, as a tuple made up of two ``Double`` values:

.. testcode::

    (swift) func distanceFromOriginForPoint(point : (Double, Double)) -> Double {
                return sqrt(Double(point.0 * point.0 + point.1 * point.1))
            }
    (swift) var somePoint = (3.0, 4.0)
    // somePoint : (Double, Double) = (3.0, 4.0)
    (swift) println(distanceFromOriginForPoint(somePoint))
    >>> 5.0

Note that this function only takes *one* input parameter, not two. It's single input parameter is a tuple containing two ``Double`` values. This ability to bundle up related values into a single compound value is one of the major benefits of tuples. This function can be passed any tuple of type ``(Double, Double)`` – such as ``(3.0, 4.0)`` in the example above – and it will happily calculate the distance for that tuple.

The elements of an input tuple can be named by a function's declaration, even if the original tuple doesn't have named elements. For example, the two ``Double`` elements above could be called ``x`` and ``y`` by the function:

.. testcode::

    (swift) func distanceFromOriginForPoint2(point : (x : Double, y : Double)) -> Double {
                return sqrt(Double(point.x * point.x + point.y * point.y))
            }
    (swift) var somePoint = (3.0, 4.0)
    // somePoint : (Double, Double) = (3.0, 4.0)
    (swift) println(distanceFromOriginForPoint2(somePoint))
    >>> 5.0

``somePoint``'s elements are not named when it is created outside of the function. However, ``distanceFromOriginForPoint2`` gives the tuple values it receives a temporary name for use within the function.

.. QUESTION Is my use of ‘any’ technically correct here? Is there some kind of value that cannot be passed to a function?

Functions don't have to return a value. Here's a version of the ``sayHello`` function, called ``sayGoodbye``, which prints its own ``String`` value rather than returning it:

.. testcode::

    (swift) func sayGoodbye(personName : String) {
                println("Goodbye, \(personName) 👋")
            }
    (swift) sayGoodbye("Dave")
    >>> Goodbye, Dave 👋

Because it does not return a value, the function's declaration does not include the return symbol (``->``) or a return type.

Functions don't have to have input parameters, either. Here's a function that always returns the same ``String`` message whenever it is called:

.. testcode::

    (swift) func sayHelloWorld() -> String {
                return "hello, world"
            }
    (swift) println(sayHelloWorld())
    >>> hello, world

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
