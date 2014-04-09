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
You give a function a name that identifies what it does,
and this name is used to “call” the function to perform its task when needed.

.. TODO: should this chapter mention __FUNCTION__
   (as described in the release notes for 2014-03-12)?

.. _Functions_FunctionDeclarations:

Function Declarations
---------------------

You can give a function some input values to work with
(known as :newTerm:`parameters`),
and it can pass back some output
(known as a :newTerm:`return value`).
The function's name should describe the task that it performs.
The function in the example below is called ``sayHello``,
because that's what it does –
it takes a person's name as input
and passes back a greeting for that person.
To do this, it takes one input parameter –
a ``String`` value called ``personName`` –
and returns an output ``String`` value containing a greeting for that person.

.. note::

   All examples in this “Functions Declarations” section use
   a declaration syntax known as function-style declaration.
   This syntax follows the C approach of putting
   all parameters inside one set of parentheses immediately after the function name.
   In addition to function-style declarations,
   Swift supports a declaration syntax known as selector-style declaration.
   This syntax follows a style similar to Objective-C messaging.
   For details, see “Selector-Style Function Declarations.”

All of this information is rolled up into the function's :newTerm:`declaration`.
Functions are defined using the ``func`` keyword.
This example defines a function called ``sayHello`` that accepts a single parameter called ``personName``,
which is of type ``String``.
The function returns a ``String`` value when it is done,
as indicated by the :newTerm:`return arrow` ``->``
(a hyphen followed by a greater-than symbol).

.. TODO: revisit this introduction to make it slightly less academic and formal.

The declaration describes what the function does,
what it expects to receive,
and what it returns when it is done.
The declaration makes it easy for the function to be called
from elsewhere in your code in a clear and unambiguous way.

.. testcode:: functionDeclaration

   -> func sayHello(personName: String) -> String {
         let greeting = "Hello, " + personName + "!"
         return greeting
      }
   -> println(sayHello("Anna"))
   <- Hello, Anna!
   -> println(sayHello("Brian"))
   <- Hello, Brian!

You call the ``sayHello`` function by passing it a ``String`` value in parentheses,
such as ``sayHello("Anna")``.
Because the function returns a ``String`` value,
``sayHello`` can be wrapped in a call to the ``println`` function
to print that string and see its value, as shown above.

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

The contents of this function can be simplified further,
to combine the message creation and the return statement into one line:

.. testcode:: functionDeclaration

   -> func sayHelloAgain(personName: String) -> String {
         return "Hello again, " + personName + "!"
      }
   -> println(sayHelloAgain("Anna"))
   <- Hello again, Anna!

.. admonition:: Experiment

   Try calling the ``sayHello`` function with your own name.
   Once you've done that,
   see what happens if you change the message to a different greeting.

   Try using this function to say hello to a friend instead.
   You could use an ``if else`` statement to make it reply with a special greeting when it recognizes your name,
   and a different greeting for everyone else.

   What about if you pass in a second input parameter (also a ``String``),
   called ``birthdayType``?
   (You separate multiple input parameters with a comma.)
   ``birthdayType`` should contain the type of birthday you want to celebrate,
   such as ``12th`` or ``21st``.
   Can you make a function called ``sayHappyBirthday``,
   and use it to wish somebody called ``Peter`` a happy ``40th`` birthday?

   For bonus points,
   make this new second parameter an ``Int`` called ``age``
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

You can use any type of value as an input parameter for a function,
if it is declared appropriately.
For example, suppose you rewrite the range function above
to take a tuple of two ``Int`` values:

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

Functions can return a tuple as their return type.
This enables a function to return a combination of values as part of one compound return:

.. testcode:: functionParameters

   -> func splitOnFirst(string: String, splitter: UnicodeScalar) -> (String, String?) {
         let size = string.size()
         for i in 0...size {
            if string[i] == splitter {
               return (string[0...i], string[i+1...size])
            }
         }
         return (string, nil)
      }

This example defines a function called ``splitOnFirst``,
which looks for a ``UnicodeScalar`` called ``splitter``
within a ``String`` called ``string``.
It returns a tuple of type ``(String, String?)``.
This tuple contains an initial ``String``
and an optional second ``String``,
wrapped up together as a compound value inside a single tuple.

If ``splitter`` is found,
the tuple will contain two strings –
a string made up of all of the characters from before the first instance of the splitter
and a string made up of all of the remaining characters.

If ``splitter`` is *not* found,
the tuple will contain the entire string as its first string value
and ``nil`` as its second value to indicate that ``splitter`` was not found:

.. testcode:: functionParameters

   -> let helloWorld = splitOnFirst("hello world", ' ')
   << // helloWorld : (String, String?) = ("hello", <unprintable value>)
   -> if let secondPart = helloWorld.1 {
         println("The text from after the splitter is '\(secondPart)'")
      }
   <- The text from after the splitter is 'world'

Alternatively, decompose the tuple into multiple named values
as part of the function return value assignment:

.. testcode:: functionParameters

   -> let (first, possibleSecond) = splitOnFirst("hello world", ' ')
   << // (first, possibleSecond) : (String, String?) = ("hello", <unprintable value>)
   -> if let second = possibleSecond {
         println("The text from after the splitter is '\(second)'")
      }
   <- The text from after the splitter is 'world'

This example sets two constants called ``first`` and ``possibleSecond``
to equal the two output values stored in the ``splitOnFirst`` function's
return tuple value.
These two constants can then be used independently of each other.
Here, the value stored in the optional second tuple value is unwrapped and accessed
with optional binding.

.. _Functions_ParameterNames:

Parameter Names
~~~~~~~~~~~~~~~

You use the parameter names from the function's declaration
to pass values to the function when it is called.
This helps make the purpose of the values clear,
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

Here, the parameter values are passed in a different order to the original function definition
when the function is actually called.
Because they are named,
it is still clear which value should be used for which parameter.

If ``characterToFind`` is found quickly,
this example returns ``true`` before the entire set of characters in ``stringToSearch`` is checked.
As soon as the first matching character is found,
``containsCharacter`` returns ``true``,
and doesn't bother to check the remaining characters.
You can return control from a function at any time,
and it will stop what it is doing immediately.
In fact, this function only returns ``false`` if
the entire set of characters in ``stringToSearch`` is exhausted,
and the end of the for loop is reached.

If you do not provide parameter names when calling a method,
the passed parameters are assumed to be in the order they were originally declared:

.. testcode:: functionParameters

   -> let containsAHyphen = containsCharacter("This will return false", '-')
   << // containsAHyphen : Bool = false
   /> containsAHyphen equals \(containsAHyphen), because the string does not contain a hyphen
   </ containsAHyphen equals false, because the string does not contain a hyphen

.. _Functions_DefaultParameterValues:

Default Parameter Values
~~~~~~~~~~~~~~~~~~~~~~~~

You can define default values for parameters.
If a default value is defined in the function declaration,
you can omit it when calling the function:

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

The ``joinTwoStrings`` function combines two strings into a single string.
A third “joiner” string is inserted between the two strings.

If a value for ``joiner`` is provided when ``joinTwoStrings`` is called,
that string is used to join the two strings together,
as shown in the first call to ``joinTwoString`` above,
which uses a colon to join the two words.
If no value of ``joiner`` is provided,
a default value of a single space (``" "``) is used instead.

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

However, if you call the ``joinTwoMoreStrings`` function without passing in a value for ``joiner``
and without using named values,
the code does not compile:

.. testcode:: functionParameters

   -> joinTwoMoreStrings("hello", "world")   // this will report an error
   !! <REPL Input>:1:19: error: tuple types '($T1, $T2)' and '(string1: String, joiner: String, string2: String)' have a different number of elements (2 vs. 3)
   !! joinTwoMoreStrings("hello", "world")   // this will report an error
   !!               ^

Because the values are not named in the function call,
it looks as though you have provided only two (rather than three)
of the expected parameters for the function.
Without named values,
Swift assigns the first value (``"hello"``)
to the first parameter (``string1``);
the second value (``"world"``)
to the second parameter (``joiner``);
and cannot find a value for the third parameter (``string2``).

Avoid this problem by naming the values when you call the function:

.. testcode:: functionParameters

   -> joinTwoMoreStrings(string1: "hello", string2: "world")
   << // r4 : String = "hello world"
   /> returns \"\(r4)\"
   </ returns "hello world"

This code tells Swift which parameters you want
the values of "hello" and "world" to be used for,
and the code compiles without error,
using the default value of ``joiner`` as before.

As a general rule,
place parameters with default values at the end of a function declaration.
It is also advisable to name the values in your function calls
whenever a function takes more than one parameter, if it aids readability.
This helps to ensure that your intentions are clearly expressed in your code.

.. QUESTION: how does this advice overlap with
   the principle of putting variadic parameters last,
   and also the principle of putting closure parameters last?

.. _Functions_FunctionsWithoutParameters:

Functions Without Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
The function name is also followed by empty parentheses when the function is called.

.. _Functions_FunctionsWithoutReturnValues:

Functions Without Return Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Functions don't have to return a value.
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
the function's declaration does not include the return arrow (``->``)
or a return type.

.. note::

   Strictly speaking, the ``waveGoodbye`` function *does* still return a value,
   even though no return value is declared.
   Functions without a declared return type return a special value of type ``Void``.
   This is simply an empty tuple,
   in effect a tuple with zero elements,
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

Function parameters are constant named values by default.
Trying to change the value of a function parameter
from within the body of that function results in a compile-time error.
This means that you can't accidentally change the value of a parameter
and expect that change to be visible outside the function.

However, sometimes it is useful for a function to have
a variable copy of a parameter's value to work with.
You can avoid declaring a new variable yourself within the function
by specifying one or more parameters as variable parameters instead.
Variable parameters are available as variables rather than constants,
and give a new modifiable copy of the parameter's value for your function to work with.

Declare variable parameters by prefixing the parameter name with the keyword ``var``:

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
which aligns an input string to the right edge of a longer output string.
Any space on the left is filled with a specified padding character.
In this example, the string ``"hello"`` is converted to the string ``"-----hello"``.

The ``alignRight`` function declares the input parameter ``string`` to be a variable parameter.
This means that ``string`` is now available as a local variable,
initialized with the passed-in string value,
and can be manipulated within the body of the function.

The function starts by working out how many characters need to be added to the left of ``string``
in order to right-align it within the overall string.
This value is stored in a local constant called ``amountToPad``.
The function then adds ``amountToPad`` copies of the ``pad`` character
to the left of the existing string and returns the result.
It uses the ``string`` variable parameter for all of its string manipulation.

.. note::

   The changes you make to a variable parameter do not
   persist beyond the end of each call to the function,
   and are not visible outside of the function's body.
   The variable parameter only exists for the lifetime of that function call.

.. _Functions_VariadicParameters:

Variadic Parameters
~~~~~~~~~~~~~~~~~~~

A :newTerm:`variadic parameter` accepts zero or more values of a certain type.
You use a variadic parameter to specify that the parameter can be passed
a varying number of input values when the function is called,
by inserting three period characters (``...``) after the parameter's type declaration.

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
``Sequence`` is covered in more detail in :doc:`Protocols`.

.. note::

   A function may have at most one variadic parameter,
   and it must always appear last in the parameters list,
   to avoid ambiguity when calling the function with multiple parameters.

.. TODO: A function's variadic parameter cannot be referred to by name
   when the function is called.
   I've reported this as rdar://16387108;
   if it doesn't get fixed, I should mention it here.

.. TODO: sequence isn't currently covered in Protocols.
   remove this comment if it is not included before release.

.. _Functions_SelectorStyleFunctionDeclaration:

Selector-Style Function Declaration
-----------------------------------

The previous examples in this chapter use a declaration syntax known as
:newTerm:`function-style declaration`.
This syntax follows the C approach of
putting all of the parameters inside one set of parentheses
immediately after the function name.

In addition to function-style declarations,
Swift supports another declaration syntax known as
:newTerm:`selector-style declaration`.
This syntax follows a similar style to Objective-C messaging.
The function name is written as a series of separate selector parts.
Each selector part has a corresponding parameter name and type,
and has its own set of parentheses when defined.

Here's how to write the string-joining function from “Default Parameter Values”
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

   Parameter names are not used when calling a function
   that was defined using selector-style syntax.
   Parameter names are only used within the function's declaration.

Selector-style syntax lends itself to expressive function declarations,
which can be written and read as sentences for ease of comprehension.
The use of prepositions such as “to” and “with” is not mandatory,
but is encouraged where it aids readability.

.. _Functions_CallingSelectorStyleFunctions:

Calling Selector-Style Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Call selector-style function by placing the first selector part
outside a set of parentheses, and the second and subsequent selector parts
inside the parentheses, separated by commas.
Separate each selector part within the parentheses from its parameter value by a colon:

.. testcode:: selectorStyle

   -> joinString("hello", toString: "world", withJoiner: ":")
   << // r0 : String = "hello:world"
   /> returns \"\(r0)\"
   </ returns "hello:world"

As in the earlier ``joinTwoStrings`` example,
any parameters with default values can be excluded when the function is called:

.. testcode:: selectorStyle

   -> joinString("hello", toString: "world")
   << // r1 : String = "hello world"
   /> returns \"\(r1)\"
   </ returns "hello world"

With the exception of the first selector part,
the selector parts can be provided in any order:

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

This example takes an input string
and prints each of its characters on a separate line in a column.
The first selector part, ``columnize``,
is also the name of the string to be converted into a column.
Likewise, the second selector part, ``backwards``,
is also the name of a Boolean parameter indicating whether the string
should be converted into a column of characters in reverse order.

Note that this example calls ``print`` rather than ``println``
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
.. presumably you can't pass a constant as the argument for an inout parameter

.. _Functions_FunctionTypes:

Function Types
--------------

Every function has a specific :newTerm:`function type`,
made up of the parameter types and the return type of the function.

For example:

.. testcode:: functionTypes

   -> func addTwoInts(a: Int, b: Int) -> Int {
         return a + b
      }
   >> addTwoInts
   << // r0 : (a: Int, b: Int) -> Int = <unprintable value>
   -> func multiplyTwoInts(a: Int, b: Int) -> Int {
         return a * b
      }
   >> multiplyTwoInts
   << // r1 : (a: Int, b: Int) -> Int = <unprintable value>

This example defines two simple mathematical functions
called ``addTwoInts`` and ``multiplyTwoInts``.
These functions each take two ``Int`` values,
and return an ``Int`` value which is the result of
performing an appropriate mathematical operation.

The type of both of these functions is ``(Int, Int) -> Int``.
This can be read as:

“A function type that has two parameters, both of type ``Int``,
and that returns a value of type ``Int``.”

.. QUESTION: does their "type" also include the parameter label names?

Here's another example, for a function with no parameters or return value:

.. testcode:: functionTypes

   -> func printHelloWorld() {
         println("hello, world")
      }
   >> printHelloWorld
   << // r2 : () -> () = <unprintable value>

The type of this function is ``() -> ()``,
or “a function that has no parameters, and returns ``Void``.”
Functions that don't specify a return value always return ``Void``,
which is equivalent to an empty tuple in Swift, shown as ``()``.

.. _Functions_UsingFunctionTypes:

Using Function Types
~~~~~~~~~~~~~~~~~~~~

Function types can be used just like any other types in Swift.
For example, you can define a constant or variable to be of a function type,
and assign an appropriate function to that variable:

.. testcode:: functionTypes

   -> var mathFunction: (Int, Int) -> Int = addTwoInts
   << // mathFunction : (Int, Int) -> Int = <unprintable value>

This can be read as:

“Define a variable called ``mathFunction``,
which has a type of ‘a function that takes two ``Int`` values,
and returns an ``Int`` value.’
Set this new variable to refer to the function called ``addTwoInts``.”

The ``addTwoInts`` function has the same type as the ``mathFunction`` variable,
and so this assignment is allowed by Swift's type-checker.

You can now call the assigned function with the name ``mathFunction``:

.. testcode:: functionTypes

   -> println("Result: \(mathFunction(2, 3))")
   <- Result: 5

A different function with the same matching type can be assigned to the same variable,
in the same way as for non-function types:

.. testcode:: functionTypes

   -> mathFunction = multiplyTwoInts
   -> println("Result: \(mathFunction(2, 3))")
   <- Result: 6

As with any other type,
you can leave it to Swift to infer the function type
when you assign a function to a constant or variable:

.. testcode:: functionTypes

   -> let anotherMathFunction = addTwoInts
   << // anotherMathFunction : (a: Int, b: Int) -> Int = <unprintable value>
   // anotherMathFunction is inferred to be of type (Int, Int) -> Int

.. _Functions_FunctionTypesAsParameterTypes:

Function Types as Parameter Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A function type such as ``(Int, Int) -> Int`` can be used as
a parameter type for another function.
This enables you to leave some aspects of a function's implementation
for the function's caller to provide when the function is called.

Here's an example to print the results of the math functions from above:

.. testcode:: functionTypes

   -> func printMathResult(mathFunction: (Int, Int) -> Int, a: Int, b: Int) {
         println("Result: \(mathFunction(a, b))")
      }
   -> printMathResult(addTwoInts, 3, 5)
   <- Result: 8

This example defines a function called ``printMathResult``, which has three parameters.
The first parameter is called ``mathFunction``, and is of type ``(Int, Int) -> Int``.
You can pass any function of that type as the argument for this first parameter.
The second and third parameters are called ``a`` and ``b``, and are both of type ``Int``.
These are used as the two input values for the provided math function.

When ``printMathResult`` is called above,
it is passed the ``addTwoInts`` function, and the integer values ``3`` and ``5``.
It calls the provided function with the values ``3`` and ``5``, and prints the result of ``8``.

The role of ``printMathResult`` is to print the result of some appropriate function.
It doesn't need to know or care what that function's implementation actually does –
it just cares that the function is of the correct type.
This enables ``printMathResult`` to hand off some of its functionality
to the caller of the function in a type-safe way.

.. _Functions_FunctionTypesAsReturnTypes:

Function Types as Return Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A function type can be used as the return type of another function.
This is indicated by writing a complete function type
immediately after the return arrow (``->``) of the returning function.

To help illustrate this, here are two simple functions,
``stepForward`` and ``stepBackward``,
which return a value of one more / one less than their input value.
Both of these functions have a type of ``(Int) -> Int``:

.. testcode:: functionTypes

   -> func stepForward(input: Int) -> Int {
         return input + 1
      }
   -> func stepBackward(input: Int) -> Int {
         return input - 1
      }

Here's a function called ``chooseStepFunction``,
whose return type is “a function of type ``(Int) -> Int``”.
It chooses whether to return
the ``stepForward`` function or the ``stepBackward`` function
based on a Boolean parameter called ``backwards``:

.. testcode:: functionTypes

   -> func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
         return backwards ? stepBackward : stepForward
      }

``chooseStepFunction`` can now be used to obtain a function
that will step in one direction or the other.
For example:

.. testcode:: functionTypes

   -> var currentValue = 3
   << // currentValue : Int = 3
   -> let moveNearerToZero = chooseStepFunction(currentValue > 0)
   << // moveNearerToZero : (Int) -> Int = <unprintable value>
   // moveNearerToZero now refers to the stepBackward() function

This example works out whether a positive or negative step is needed
to move a variable called ``currentValue`` progressively closer to zero.
``currentValue`` has an initial value of ``3``,
which means that ``currentValue > 0`` returns ``true``,
causing ``chooseStepFunction`` to return the ``stepBackward`` function.
A reference to the returned function is stored in a constant called ``moveNearerToZero``.

Now that ``moveNearerToZero`` refers to the correct function,
it can be used to count to zero:

.. testcode:: functionTypes

   -> println("Counting to zero:")
   </ Counting to zero:
   -> while currentValue != 0 {
         println("\(currentValue)... ")
         currentValue = moveNearerToZero(currentValue)
      }
   -> println("zero!")
   </ 3...
   </ 2...
   </ 1...
   </ zero!

.. _Functions_NestedFunctions:

Nested Functions
----------------

Functions can be :newTerm:`nested` inside other functions.
As its name suggests, a nested function is simply
a function written within the body of another function.
The nested function is hidden from the outside world,
but can still be used by its enclosing function.

The ``chooseStepFunction`` example above can be rewritten
to use and return nested functions:

.. testcode:: nestedFunctions

   -> func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
         func stepForward(input: Int) -> Int { return input + 1 }
         func stepBackward(input: Int) -> Int { return input - 1 }
         return backwards ? stepBackward : stepForward
      }
   -> var currentValue = -4
   << // currentValue : Int = -4
   -> let moveNearerToZero = chooseStepFunction(currentValue > 0)
   << // moveNearerToZero : (Int) -> Int = <unprintable value>
   // moveNearerToZero now refers to the nested stepForward() function
   -> while currentValue != 0 {
         println("\(currentValue)... ")
         currentValue = moveNearerToZero(currentValue)
      }
   -> println("zero!")
   </ -4...
   </ -3...
   </ -2...
   </ -1...
   </ zero!

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