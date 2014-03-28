.. docnote:: Subjects to be covered in this section

   * Functions
   * Function signatures (including pattern matching)
   * Setting variables to functions
   * Naming conventions
   * return statement
   * Can only have one variadic parameter
   * Attributes (infix, resilience, inout, auto_closure, noreturn)
   * Marking functions as transparent (and what this means)

Functions
=========

:newTerm:`Functions` are self-contained chunks of code that perform a specific task.
Every function is given a name to identify what it does,
and this name is used to “call” the function to perform its task when needed.

.. TODO: should this chapter mention __FUNCTION__
   (as described in the release notes for 2014-03-12)?

.. _Functions_FunctionDeclarations:

Function Declarations
---------------------

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

All of this information is rolled up into the function's :newTerm:`declaration`.
Functions are defined using the ``func`` keyword.
This example defines a function called ``sayHello`` that accepts a single parameter called ``personName``,
which is of type ``String``.
The function returns a ``String`` value when it is done,
as indicated by the :newTerm:`return operator` ``->``
(a hyphen followed by a greater-than symbol).

.. TODO: revisit this introduction to make it slightly less academic and formal.

The declaration describes what the function does,
what it expects to receive,
and what it will return when it is done.
This makes it easy for the function to be called from elsewhere in your code in a clear and unambiguous way.

.. testcode:: functionDeclaration

   -> func sayHello(personName: String) -> String {
         let greeting = "Hello, " + personName + "!"
         return greeting
      }
   -> println(sayHello("Anna"))
   <- Hello, Anna!
   -> println(sayHello("Brian"))
   <- Hello, Brian!

The ``sayHello`` function is called by passing it a ``String`` value in parentheses,
such as ``sayHello("Anna")``.
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
The example above shows what happens if it is called with an input value of ``"Anna"``,
and an input value of ``"Brian"``.
The function returns a tailored greeting in each case.

The contents of this function could actually be simplified further,
to combine the message creation and the return statement into one line:

.. testcode:: functionDeclaration

   -> func sayHelloAgain(personName: String) -> String {
         return "Hello again, " + personName + "!"
      }
   -> println(sayHelloAgain("Anna"))
   <- Hello again, Anna!

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

.. _Functions_MultipleInputParameters:

Multiple Input Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~

Functions can have multiple input parameters.
This function takes a start and an end index for a half-open range,
and works out how many elements the range contains:

.. testcode:: functionParameters

   -> func halfOpenRangeLength(startIndex: Int, endIndex: Int) -> Int {
         return endIndex - startIndex
      }
   -> println(halfOpenRangeLength(1, 10))
   <- 9

.. _Functions_TuplesAsInputParameters:

Tuples as Input Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~

Any type of value can be used as an input parameter for a function,
if it is declared appropriately.
For example, the range function above can be rewritten to take a tuple of two ``Int`` values:

.. QUESTION: Is my use of “any” technically correct here?
   Is there some type that cannot be passed to a function?

.. testcode:: functionParameters

   -> func halfOpenRangeLengthForRange(range: (Int, Int)) -> Int {
         return range.1 - range.0
      }
   -> let someRange = (1, 10)
   << // someRange : (Int, Int) = (1, 10)
   -> println(halfOpenRangeLengthForRange(someRange))
   <- 9

Note that this function takes *one* input parameter, not two.
Its single input parameter is a tuple containing two ``Int`` values.
This ability to bundle up related values into a single compound value
is one of the major benefits of tuples.
This function can be passed any tuple of type ``(Int, Int)`` –
such as ``(1, 10)`` in the example above –
and it will calculate the half-open range length for that tuple.

.. TODO: mention that you can pass a tuple as the entire set of arguments,
   as in var argTuple = (0, "one", '2'); x.foo:bar:bas:(argTuple)

.. _Functions_TuplesAsReturnValues:

Tuples as Return Values
~~~~~~~~~~~~~~~~~~~~~~~

Functions can also return a tuple as their return type.
This enables a function to return a combination of values as part of one compound return:

.. testcode:: functionParameters

   -> func splitOnFirst(string: String, splitter: UnicodeScalar) -> (String, String?) {
         let size = string.size()
         for i in 0...size {
            if string[i] == splitter {
               return (string[0...i], string[i+1...size])
            }
         }
         return (string, .None)
      }

This example defines a function called ``splitOnFirst``,
which looks for a ``UnicodeScalar`` called ``splitter``
within a ``String`` called ``string``.
It returns a tuple of type ``(String, String?)``.
This tuple will contain an initial ``String``,
and an optional second ``String``,
wrapped up together as a compound value inside a single tuple.

If ``splitter`` is found,
the tuple will contain two strings –
a string made up of all of the characters from before the first instance of the splitter,
and a string made up of all of the remaining characters.

If ``splitter`` is *not* found,
the tuple will contain the entire string as its first string value,
and a value of ``.None`` in its second value to indicate that ``splitter`` was not found:

.. testcode:: functionParameters

   -> let helloWorld = splitOnFirst("hello world", ' ')
   << // helloWorld : (String, String?) = ("hello", <unprintable value>)
   -> if let secondPart = helloWorld.1 {
         println("The text from after the splitter is '\(secondPart)'")
      }
   <- The text from after the splitter is 'world'

Alternatively, you can decompose the tuple into multiple named values
as part of the function return value assignment:

.. testcode:: functionParameters

   -> let (first, possibleSecond) = splitOnFirst("hello world", ' ')
   << // (first, possibleSecond) : (String, String?) = ("hello", <unprintable value>)
   -> if let second = possibleSecond {
         println("The text from after the splitter is '\(second)'")
      }
   <- The text from after the splitter is 'world'

This example sets two constants called ``first`` and ``possibleSecond``
to equal the two output values stored in the ``splitOnFirst()`` function's
return tuple value.
These two constants can then be used independently of each other.
Here, the value stored in the optional second tuple value is unwrapped and accessed
with optional binding.

.. _Functions_ParameterNames:

Parameter Names
~~~~~~~~~~~~~~~

Values can be passed to a function using the parameter names from the function's declaration.
This helps to make their purpose clear,
and also enables values to be passed in a different order to the original function declaration.

.. testcode:: functionParameters

   -> func containsCharacter(stringToSearch: String, characterToFind: UnicodeScalar) -> Bool {
         for character in stringToSearch.chars {
            if character == characterToFind {
               return true
            }
         }
         return false
      }
   -> let containsASpace = containsCharacter(
         characterToFind: ' ',
         stringToSearch: "This will return true")
   << // containsASpace : Bool = true
   /> containsASpace equals \(containsASpace), because stringToSearch contains a space
   </ containsASpace equals true, because stringToSearch contains a space

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

.. testcode:: functionParameters

   -> let containsAHyphen = containsCharacter("This will return false", '-')
   << // containsAHyphen : Bool = false
   /> containsAHyphen equals \(containsAHyphen), because the string does not contain a hyphen
   </ containsAHyphen equals false, because the string does not contain a hyphen

.. _Functions_DefaultParameterValues:

Default Parameter Values
~~~~~~~~~~~~~~~~~~~~~~~~

Function parameters can be assigned :newTerm:`default values`.
If a default value is defined in the function declaration,
it can be omitted when calling the function:

.. testcode:: functionParameters

   -> func joinTwoStrings(string1: String, string2: String, joiner: String = " ") -> String {
         return string1 + joiner + string2
      }
   -> joinTwoStrings("hello", "world", ":")
   << // r1 : String = "hello:world"
   /> returns \"\(r1)\"
   </ returns "hello:world"
   -> joinTwoStrings("hello", "world")
   << // r2 : String = "hello world"
   /> returns \"\(r2)\"
   </ returns "hello world"

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

.. testcode:: functionParameters

   -> func joinTwoMoreStrings(string1: String, joiner: String = " ", string2: String) -> String {
         return string1 + joiner + string2
      }
   -> joinTwoMoreStrings("hello", ":", "world")
   << // r3 : String = "hello:world"
   /> this also returns \"\(r3)\"
   </ this also returns "hello:world"

.. TODO: the first line of this example is too long,
   and needs to be wrapped in line with the Style Guide

However, if you try and call this version of the function without passing in a value for ``joiner``,
and without using named values,
the code will not compile:

.. testcode:: functionParameters

   -> joinTwoMoreStrings("hello", "world")   // this will report an error
   !! <REPL Input>:1:19: error: tuple types '($T1, $T2)' and '(string1: String, joiner: String, string2: String)' have a different number of elements (2 vs. 3)
   !! joinTwoMoreStrings("hello", "world")   // this will report an error
   !!               ^

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

.. testcode:: functionParameters

   -> joinTwoMoreStrings(string1: "hello", string2: "world")
   << // r4 : String = "hello world"
   /> returns \"\(r4)\"
   </ returns "hello world"

This tells Swift which parameters you want
the values of "hello" and "world" to be used for,
and the code compiles without error,
using the default value of ``joiner`` as before.

As a general rule,
it is best to place any parameters with default values at the end of a function declaration.
It is also advisable to name the values in your function calls
whenever a function takes more than one parameter, if it aids readability.
This helps to ensure that your intentions are clearly expressed in your code.

.. QUESTION: how does this advice overlap with
   the principle of putting variadic parameters last,
   and also the principle of putting closure parameters last?

.. _Functions_FunctionsWithoutParametersAndReturnValues:

Functions Without Parameters and Return Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Functions don't have to have input parameters.
Here's a function with no input parameters,
which always returns the same ``String`` message whenever it is called:

.. testcode:: functionParameters

   -> func sayHelloWorld() -> String {
         return "hello, world"
      }
   -> println(sayHelloWorld())
   <- hello, world

The function declaration still needs parentheses after the function's name,
even though it does not take any parameters.
It is also called with empty parentheses when used.

Functions don't have to return a value, either.
Here's a version of the ``sayHello`` function,
called ``waveGoodbye``,
which prints its own ``String`` value rather than returning it:

.. testcode:: functionParameters

   -> func waveGoodbye(personName: String) {
         println("Goodbye, \(personName) 👋")
      }
   -> waveGoodbye("Dave")
   <- Goodbye, Dave 👋

Because it does not need to return a value,
the function's declaration does not include the return operator (``->``)
or a return type.

.. note::

   Strictly speaking, this function *does* still return a value,
   even though no return value is declared.
   Functions without a declared return type return a special value of type ``Void``.
   This is simply an empty tuple,
   i.e. a tuple with zero elements,
   which can be written as ``()``.

The return value of a function can be ignored when it is called:

.. testcode:: functionParameters

   -> func printAndCount(stringToPrint: String) -> Int {
         println(stringToPrint)
         return stringToPrint.size()
      }
   -> func printWithoutCounting(stringToPrint: String) {
         printAndCount(stringToPrint)
      }
   -> printAndCount("hello, world")
   << hello, world
   // prints "hello, world" and returns a value of 12
   << // r5 : Int = 12
   -> printWithoutCounting("hello, world")
   << hello, world
   // prints "hello, world" but does not return a value

The first function,
``printAndCount``,
prints a string,
and then returns its character count as an ``Int``.
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

.. _Functions_ConstantAndVariableParameters:

Constant and Variable Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Function parameters are :newTerm:`constants` by default.
You cannot change the value of a function parameter
from within the body of that function,
and trying to do so will result in an error.
This approach means that you can't accidentally change the value of a parameter
and expect that change to be visible outside of the function.

However, it can sometimes be useful for a function to have
a variable copy of a parameter's value to work with.
One approach would be to declare a new variable yourself within the function,
and copy the parameter's value in to it.
To simplify this process, Swift enables you to specify
one or more parameters as :newTerm:`variable parameters` instead.
Variable parameters are made available as variables rather than constants,
and give a new modifiable copy of the parameter's value for your function to work with.

Variable parameters are declared by prefixing the parameter name with the keyword ``var``:

.. testcode:: functionParameters

   -> func alignRight(var string: String, count: Int, pad: UnicodeScalar) -> String {
         let amountToPad = count - string.size()
         for _ in 0...amountToPad {
            string = pad + string
         }
         return string
      }
   -> let originalString = "hello"
   << // originalString : String = "hello"
   -> let paddedString = alignRight(originalString, 10, '-')
   << // paddedString : String = "-----hello"
   /> paddedString is equal to \"\(paddedString)\"
   </ paddedString is equal to "-----hello"
   /> originalString is still equal to \"\(originalString)\"
   </ originalString is still equal to "hello"

This example defines a new function called ``alignRight``,
which aligns an input string to the right-hand edge of a longer output string.
Any space on the left is filled with a specified padding character.
In this example, the string ``"hello"`` is converted to the string ``"-----hello"``.

This function declares the input parameter ``string`` to be a variable parameter.
This means that ``string`` is now available as a local variable,
initialized with the passed-in string value,
and can be manipulated within the body of the function.

The function starts by working out how many characters need to be added to the left of ``string``
in order to right-align it within the overall string.
This value is stored in a local constant called ``amountToPad``.
The function then adds ``amountToPad`` copies of the ``pad`` character to the left of the existing string,
and returns the result.
It uses the ``string`` variable parameter for all of its string manipulation.

.. note::

   The changes you make to a variable parameter do not
   persist beyond the end of each call to the function,
   and are not visible outside of the function's body.
   The variable parameter only exists for the lifetime of that function call.

.. _Functions_VariadicParameters:

Variadic Parameters
~~~~~~~~~~~~~~~~~~~

A :newTerm:`variadic parameter` is a parameter that accepts zero or more values of a certain type.
Variadic parameters give a way to cope with a varying number of input values.
They are indicated by inserting three period characters (``...``) after their type declaration.

This example calculates the :newTerm:`arithmetic mean`
(also known as the :newTerm:`average`) for a list of numbers of any length:

.. testcode:: functionParameters

   -> func arithmeticMean(numbers: Double...) -> Double {
         var total: Double = 0
         for number in numbers {
            total += number
         }
         return total / Double(numbers.count)
      }
   -> arithmeticMean(1, 2, 3, 4, 5)
   << // r6 : Double = 3.0
   /> returns \(r6), which is the arithmetic mean of these five numbers
   </ returns 3.0, which is the arithmetic mean of these five numbers
   -> arithmeticMean(3, 8, 19)
   << // r7 : Double = 10.0
   /> returns \(r7), which is the arithmetic mean of these three numbers
   </ returns 10.0, which is the arithmetic mean of these three numbers

As shown in this example,
a variadic parameter can be used with the ``for``-``in`` statement
to iterate through the list of values represented by the parameter.
Variadic parameters automatically conform to the ``Sequence`` protocol,
and can be used anywhere that a ``Sequence`` is valid.
(Protocols such as ``Sequence`` are covered in more detail in :doc:`Protocols`.)

.. note::

   A function may have at most one variadic parameter,
   and it must always appear last in the parameters list,
   to avoid ambiguity when calling the function with multiple parameters.

.. TODO: A function's variadic parameter cannot be referred to by name
   when the function is called.
   I've reported this as rdar://16387108;
   if it doesn't get fixed, I should mention it here.

.. _Functions_SelectorStyleFunctions:

Selector-Style Functions
------------------------

All of the examples so far have used a declaration syntax known as
:newTerm:`function-style declaration`.
This follows the C approach of
putting all of the parameters inside one set of parentheses
immediately after the function name.

In addition to function-style declarations,
Swift also supports a second declaration syntax known as
:newTerm:`selector-style declaration`.
This syntax follows a similar style to Objective-C messaging.
The function name is written as a series of separate :newTerm:`selector parts`.
Each selector part has a corresponding parameter name and type,
and has its own set of parentheses when defined.

Here's how the string-joining function from above could be written
as a selector-style declaration:

.. testcode:: selectorStyle

   -> func joinString(string1: String) toString(string2: String)
         withJoiner(joiner: String = " ") -> String
      {
         return string1 + joiner + string2
      }

``joinString``, ``toString`` and ``withJoiner`` are the selector parts;
``string1``, ``string2`` and ``joiner`` are the parameter names;
and all three parameters have a type of ``String``.

.. note::

   The parameter names are not used when calling the function.
   They are only used within the function's declaration.

Selector-style syntax lends itself to expressive function declarations,
which can be written and read as sentences for ease of comprehension.
The use of prepositions such as “to” and “with” is not mandatory,
but is encouraged where it aids readability.

.. _Functions_CallingSelectorStyleFunctions:

Calling Selector-Style Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Selector-style functions are called by placing the first selector part
outside a set of parentheses, and their second and subsequent selector parts
inside the parentheses, separated by commas.
Each selector part within the parentheses is separated from its parameter value
by a colon:

.. testcode:: selectorStyle

   -> joinString("hello", toString: "world", withJoiner: ":")
   << // r0 : String = "hello:world"
   /> returns \"\(r0)\"
   </ returns "hello:world"

As before, any parameters with default values can be excluded when the function is called:

.. testcode:: selectorStyle

   -> joinString("hello", toString: "world")
   << // r1 : String = "hello world"
   /> returns \"\(r1)\"
   </ returns "hello world"

With the exception of the first selector part,
the selector parts may be provided in any order:

.. testcode:: selectorStyle

   -> joinString("hello", withJoiner: "-", toString: "world")
   << // r2 : String = "hello-world"
   /> returns \"\(r2)\"
   </ returns "hello-world"

.. _Functions_AutomaticParameterNames:

Automatic Parameter Names
~~~~~~~~~~~~~~~~~~~~~~~~~

If a parameter name is omitted from a selector-style declaration,
the parameter is automatically given the same name as its selector part.
Default values are still allowed:

.. testcode:: selectorStyle

   -> func columnize(String) backwards(Bool = false) -> String {
         var output = ""
         for character in columnize.chars {
            if backwards {
               output = character + '\n' + output
            } else {
               output += character + '\n'
            }
         }
         return output
      }
   -> print(columnize("abc"))
   </ a
   </ b
   </ c
   -> print(columnize("abc", backwards: true))
   </ c
   </ b
   </ a

This example takes an input string,
and prints each of its characters on a separate line in a column.
The first selector part, ``columnize``,
is also used as the name of the string to be converted into a column.
Likewise, the second selector part, ``backwards``,
is also used as the name of the Boolean indicator of whether the string
should be converted into a column of characters in reverse order.

Note that this example calls ``print()`` rather than ``println()``
to print its output, as the ``output`` string already has a line break
at the end of the returned string.

.. TODO: It is not currently possible to use variadic parameters with selector-style declarations,
   but this may be added as part of the revision of selector-style syntax.
   This is tracked as rdar://16030076, and this section should be updated
   once it is implemented.
   In the meantime, I have chosen not to mention it either way,
   as Joe wasn't sure whether this would make it in for their March deadline.

.. _Functions_InoutParameters:

Inout Parameters
----------------

.. write-me::

.. inout properties and a general discussion of byref / byvalue

.. _Functions_FunctionsAsParametersAndReturnTypes:

Functions as Parameters and Return Types
----------------------------------------

.. write-me::

.. functions can be passed in as parameters, and can be returned as return values

.. _Functions_FunctionBinding:

Function Binding
----------------

.. write-me::

.. variables can be bound to functions, and then called e.g. var fork = g.fork; fork() .
.. functions are reference types
.. you can get a function that refers to a method, either with or without the 'self' argument already being bound:
.. class C {
..    func foo(x: Int) -> Float { ... }
.. }
.. var c = C()
.. var boundFunc = c.foo 	// a function with type (Int) -> Float
.. var unboundFunc = C.foo // a function with type (C) -> (Int) -> Float
.. selector-style methods can be referenced as foo.bar:bas:
   (see Doug's comments from the 2014-03-12 release notes)

.. _Functions_CurriedFunctions:

Curried Functions
-----------------

.. write-me::

.. function currying syntax 
.. partial application

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