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

Swift's unified function syntax is flexible enough to express anything from
a simple C-style function with no parameter names,
all the way to to a complex Objective-C style method
with local and external parameter names for each parameter.
Parameters can be used to create automatic local variables
for use within the function's body,
and can provide default values to simplify function calls.
Parameters can also be passed as ``inout`` parameters,
which modify a passed variable once the function has completed its execution.

Every function in Swift has a type, made up of its parameter and return types,
and this type can be used like any other type in Swift.
This makes it easy to pass functions as parameters to other functions,
and to return functions from functions.
Functions can also be nested within other functions
to encapsulate useful functionality within a local function scope.

.. TODO: should this chapter mention __FUNCTION__
   (as described in the release notes for 2014-03-12)?

.. _Functions_DefiningAndCallingFunctions:

Defining and Calling Functions
------------------------------

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
and returns an output ``String`` value containing a greeting for that person:

.. testcode:: definingAndCalling

   -> func sayHello(personName: String) -> String {
         let greeting = "Hello, " + personName + "!"
         return greeting
      }

All of this information is rolled up into the function's :newTerm:`definition`.
Functions are defined using the ``func`` keyword.
This example defines a function called ``sayHello``
that accepts a single parameter called ``personName``,
which is of type ``String``.
The function returns a ``String`` value when it is done,
as indicated by the :newTerm:`return arrow` ``->``
(a hyphen followed by a greater-than symbol)
followed by the type name “``String``”.

The definition describes what the function does,
what it expects to receive,
and what it returns when it is done.
The definition makes it easy for the function to be :newTerm:`called` (that is, used)
elsewhere in your code in a clear and unambiguous way:

.. testcode:: definingAndCalling

   -> println(sayHello("Anna"))
   <- Hello, Anna!
   -> println(sayHello("Brian"))
   <- Hello, Brian!

You call the ``sayHello`` function by passing it a ``String`` value in parentheses,
such as ``sayHello("Anna")``.
Because the function returns a ``String`` value,
``sayHello`` can be wrapped in a call to the ``println`` function
to print that string and see its value, as shown above.

The body of the ``sayHello`` function starts by
defining a new ``String`` constant called ``greeting``,
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

.. testcode:: definingAndCalling

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

.. _Functions_FunctionParametersAndReturnValues:

Function Parameters and Return Values
-------------------------------------

Function parameters and return values are extremely flexible in Swift.
You can define anything from a simple utility function with a single unnamed parameter
to a complex function with expressive parameter names and different parameter options.

.. _Functions_MultipleInputParameters:

Multiple Input Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~

Functions can have multiple input parameters.
Where this is the case,
all of the parameter definitions are written within the function's surrounding parentheses
when the functions is defined.

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
if it is defined appropriately.
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

Alternatively, decompose the tuple into multiple constants or variables
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

You use the parameter names from the function's definition
to pass values (known as :newTerm:`arguments`) to the function when it is called.
This helps make the purpose of the values clear,
and also enables values to be passed in a different order to the original function definition.

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

.. TODO: this function's first line is too long.

Here, the parameter values are passed in a different order to the original function definition
when the function is actually called.
Because they are named,
it is still clear which value should be used for which parameter.

.. note::

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
the passed parameters are assumed to be in the order they were originally defined:

.. testcode:: functionParameters

   -> let containsAHyphen = containsCharacter("This will return false", '-')
   << // containsAHyphen : Bool = false
   /> containsAHyphen equals \(containsAHyphen), because the string does not contain a hyphen
   </ containsAHyphen equals false, because the string does not contain a hyphen

.. _Functions_LocalParameterNames:

Local Parameter Names
_____________________

The parameter names that you define for callers of your function to use
are not always the most appropriate names to use within your function's implementation.
You can define alternative :newTerm:`local parameter names` for use within the function's body,
to help make your function implementation read more naturally.

If you provide a local parameter name for a given parameter,
you can still provide a separate external name for callers of your function to use.
The local name is written after the external name, separated by a space.

The example below defines a function called ``join`` that
combines two strings into a single string.
A third “joiner” string is inserted between the two strings:

.. testcode:: localParameterNames1

   -> func join(string: String, toString: String, joiner: String) -> String {
         return string + joiner + toString
      }
   -> join(string: "hello", toString: "world", joiner: " ")
   << // r0 : String = "hello world"
   /> returns \"\(r0)\"
   </ returns "hello world"

The second parameter of the ``join`` function above is called ``toString``.
This choice of name makes for a clear, expressive sentence when the function is called.

The ``join`` function uses the ``toString`` parameter name within its function body
to refer to the string's value.
However, this parameter name does not read cleanly as a sentence
as part of the function's return statement
(``return string + joiner + toString``).

You can rewrite the ``join`` function with local parameter names,
to make its implementation clearer to read:

.. testcode:: localParameterNames2

   -> func join(string s1: String, toString s2: String, joiner: String) -> String {
         return s1 + joiner + s2
      }
   -> join(string: "hello", toString: "world", joiner: ", ")
   << // r0 : String = "hello, world"
   /> returns \"\(r0)\"
   </ returns "hello, world"

In this version of the ``join`` function,
the first parameter has a name of ``string``, and a local name of ``s1``.
The second parameter has a name of ``toString``, and a local name of ``s2``.
The third parameter does not have separate names,
and so the name ``joiner`` is used both when calling the function
and when referring to the parameter's value within the function implementation.

This use of local parameter names enables the ``join`` function
to be called in an expressive, sentence-like manner by external users,
while also providing a function body that reads clearly in its intent.

.. _Functions_UnnamedParameters:

Unnamed Parameters
__________________

You can write functions with parameters that do not have external parameter names at all,
but which still have local parameter names for use within the function's body.

To define a parameter without an external name,
write an underscore character (``_``) in place of the external name.
The underscore character should still be
separated from the local parameter name by a space:

.. testcode:: functionParameters

   -> func columnize(_ stringToColumnize: String) -> String {
         var output = ""
         for character in stringToColumnize.chars {
            output += character + '\n'
         }
         return output
      }
   -> print(columnize("abc"))
   </ a
   </ b
   </ c

This example defines a function called ``columnize`` that takes an input string
and prints each of its characters on a separate line to create a column of text.

Because the ``columnize`` function has a single parameter,
and has a function name that makes the purpose of that parameter clear,
the function does not define an external name for its single parameter.
The function does, however, define a local parameter name of ``stringToColumnize``,
so that the function implementation can refer to the parameter's value within the function body.

Note that this example calls ``print`` rather than ``println``
to print its output, as the ``output`` string already has a line break
at the end of the returned string.

.. _Functions_DefaultParameterValues:

Default Parameter Values
~~~~~~~~~~~~~~~~~~~~~~~~

You can define a default value for a parameter as part of a function definition.
If a default value is defined, you can omit that parameter when calling the function:

.. testcode:: defaultParameterValues1

   -> func join(string s1: String, toString s2: String, joiner: String = " ") -> String {
         return s1 + joiner + s2
      }
   -> join(string: "hello", toString: "world", joiner: "-")
   << // r0 : String = "hello-world"
   /> returns \"\(r0)\"
   </ returns "hello-world"
   -> join(string: "hello", toString: "world")
   << // r1 : String = "hello world"
   /> returns \"\(r1)\"
   </ returns "hello world"

This version of the ``join`` function provides a default value for the ``joiner`` parameter.
If a string value for ``joiner`` is provided when the ``join`` function is called,
that string value is used to join the two strings together,
as shown in the first call to the ``join`` function above,
which uses a hyphen to join the two strings.
If no value of ``joiner`` is provided,
the default value of a single space (``" "``) is used instead,
as shown in the second call to the ``join`` function above.

It's important to choose an appropriate function parameter order when working with default values.
The ``join`` function could be written
with ``joiner`` as the second (rather than third) parameter:

.. testcode:: defaultParameterValues2

   -> func join(string s1: String, joiner: String = " ", toString s2: String) -> String {
         return s1 + joiner + s2
      }
   -> join("hello", "-", "world")
   << // r0 : String = "hello-world"
   /> returns \"\(r0)\"
   </ returns "hello-world"

.. TODO: the first line of this example is too long,
   and needs to be wrapped in line with the Style Guide

This version of the ``join`` function places its ``joiner`` parameter
as the second (rather than third) parameter in the list.
However, if you call this version of the ``join`` function
without passing in a value for ``joiner``, and without using parameter names,
the code does not compile:

.. testcode:: defaultParameterValues2

   -> join("hello", "world")   // this will report an error
   !! <REPL Input>:1:5: error: tuple types '($T1, $T2)' and '(string: String, joiner: String, toString: String)' have a different number of elements (2 vs. 3)
   !! join("hello", "world")   // this will report an error
   !!               ^

Because the argument values are not named in the function call,
it looks as though you have provided only two (rather than three)
of the expected arguments for the function.
Without named arguments,
Swift assigns the first value (``"hello"``)
to the first parameter (``string``);
the second value (``"world"``)
to the second parameter (``joiner``);
and cannot find a value for the third parameter (``toString``).

Avoid this problem by naming the values when you call the function:

.. testcode:: defaultParameterValues2

   -> join(string: "hello", toString: "world")
   << // r1 : String = "hello world"
   /> returns \"\(r1)\"
   </ returns "hello world"

This code tells Swift which parameters you want
the values of ``"hello"`` and ``"world"`` to be used for,
and the code compiles without error,
using the default value of ``joiner`` as before.

As a general rule,
place parameters with default values at the end of a function's parameter list.
It is also advisable to name the values in your function calls
whenever a function takes more than one parameter.
This helps to ensure that your intentions are clearly expressed in your code.
Even if you do not *require* callers to use parameter names when calling your function,
it is still good practice to provide names for them to use if they wish.

.. QUESTION: how does this advice overlap with
   the principle of putting variadic parameters last,
   and also the principle of putting closure parameters last?

.. _Functions_StrictParameterNames:

Strict Parameter Names
~~~~~~~~~~~~~~~~~~~~~~

.. note::

   Strict parameter names have not yet been implemented.
   This section has been written in advance of their implementation,
   in order to help plan the overall flow of this chapter.

.. TODO: this feature is not yet implemented.
   Remove this note and test that the final two code snippets produce an error
   once strict parameter names have been implemented.

It is sometimes useful to require that parameter names are provided when a function is called,
to avoid ambiguity as to each parameter's purpose.
You can require callers to use a function's parameter names
by marking the function with the ``@call_arguments(strict)`` attribute.
This attribute also requires that the parameters are provided
in the same order as in the function's definition.

.. testcode:: strictParameterNames

   // @call_arguments(strict) - not yet implemented
   -> func join(string s1: String, toString s2: String, joiner: String = " ") -> String {
         return s1 + joiner + s2
      }
   -> join(string: "hello", toString: "world", joiner: "#")
   << // r0 : String = "hello#world"
   /> returns \"\(r0)\"
   </ returns "hello#world"

This version of the ``join`` function requires any callers to provide
all of the function's parameter names when they call the function.
Trying to call this version of the ``join`` function without using its parameter names
results in a compile-time error:

::

   join("hello", "world", "#")
   // this reports a compile-time error

Trying to call the function with its parameter names in the wrong order
also results in a compile-time error:

::

   join(toString: "world", joiner: "#", string: "hello")
   // this reports a compile-time error

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

The function definition still needs parentheses after the function's name,
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
the function's definition does not include the return arrow (``->``)
or a return type.

.. note::

   Strictly speaking, the ``waveGoodbye`` function *does* still return a value,
   even though no return value is defined.
   Functions without a defined return type return a special value of type ``Void``.
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
   << // r1 : Int = 12
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

.. note::

   Return values can be ignored,
   but a function that says it will return a value must always do so.
   A function with a defined return type must
   never allow control to fall out of the bottom of the function
   without returning a value.

.. _Functions_VariadicParameters:

Variadic Parameters
~~~~~~~~~~~~~~~~~~~

A :newTerm:`variadic parameter` accepts zero or more values of a certain type.
You use a variadic parameter to specify that the parameter can be passed
a varying number of input values when the function is called,
by inserting three period characters (``...``) after the parameter's type name.

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
   << // r2 : Double = 3.0
   /> returns \(r2), which is the arithmetic mean of these five numbers
   </ returns 3.0, which is the arithmetic mean of these five numbers
   -> arithmeticMean(3, 8, 19)
   << // r3 : Double = 10.0
   /> returns \(r3), which is the arithmetic mean of these three numbers
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

.. _Functions_ConstantAndVariableParameters:

Constant and Variable Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Function parameters are constants by default.
Trying to change the value of a function parameter
from within the body of that function results in a compile-time error.
This means that you can't accidentally change the value of a parameter
and expect that change to be visible outside the function.

However, sometimes it is useful for a function to have
a *variable* copy of a parameter's value to work with.
You can avoid defining a new variable yourself within the function
by specifying one or more parameters as variable parameters instead.
Variable parameters are available as variables rather than constants,
and give a new modifiable copy of the parameter's value for your function to work with.

Define variable parameters by prefixing the parameter name with the keyword ``var``:

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

The ``alignRight`` function defines the input parameter ``string`` to be a variable parameter.
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

.. _Functions_InoutParameters:

Inout Parameters
~~~~~~~~~~~~~~~~

A function receives *constant* argument values by default.
You can define individual parameters to receive *variable* argument values instead,
as described in the previous section.
However, any changes you make to a variable argument value
do not persist beyond the end of each call to the function,
and do not affect the original value that was used to call the function.

It is sometimes useful for a function parameter to represent
the *actual* external value used for the call,
and for any modifications to that value to change
the original value from outside of the function,
after the function has completed its execution.
You define such parameters as :newTerm:`inout parameters`,
which are written by placing the ``inout`` keyword at the start of their parameter definition.

You can think of ``inout`` parameters in the following way:

An ``inout`` parameter has a value that is passed *in* to the function;
is modified by the function;
and is passed back *out* of the function to replace the original value.

You can only ever pass a variable as the argument for an ``inout`` parameter.
You cannot pass a constant or a literal value as the argument,
because constants and literals cannot be modified.
You place an ampersand (``&``) directly before a variable's name
when you pass it as an argument to an inout parameter,
to indicate that it can be modified by the function.
(This is similar to C's use of the ampersand character as a reference operator.)

.. note::

   In-out parameters cannot have default values,
   and variadic parameters cannot be marked as ``inout``.
   If you mark a parameter as ``inout``,
   it cannot also be marked as ``var`` or ``let``.

Here's an example of a function called ``swapTwoInts``,
which has two ``inout`` integer parameters called ``a`` and ``b``:

.. testcode:: inout

   -> func swapTwoInts(inout a: Int, inout b: Int) {
         let temporaryA = a
         a = b
         b = temporaryA
      }

The ``swapTwoInts`` function simply swaps the value of ``b`` into ``a``,
and the value of ``a`` into ``b``.
The function performs this swap by storing the value of ``a`` in
a temporary constant called ``temporaryA``; assigning the value of ``b`` to ``a``;
and then assigning ``temporaryA`` to ``b``.

The ``swapTwoInts`` function can be called with two variables of type ``Int``
to swap their values.
Note that the names of ``someInt`` and ``anotherInt`` are prefixed with an ampersand
when they are passed to the ``swapTwoInts`` function:

.. testcode:: inout

   -> var someInt = 3
   << // someInt : Int = 3
   -> var anotherInt = 107
   << // anotherInt : Int = 107
   -> swapTwoInts(&someInt, &anotherInt)
   -> println("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
   <- someInt is now 107, and anotherInt is now 3

After calling the ``swapTwoInts`` function,
the values of ``someInt`` and ``anotherInt`` have both been modified,
even though they were originally defined outside of the function.

.. note::

   In-out parameters are not the same as returning a value from a function.
   The ``swapTwoInts`` example above does not define a return type or return a value,
   but it still modifies the values of ``someInt`` and ``anotherInt``.
   In-out parameters are an alternative way for a function to have an effect
   outside of the scope of its function body.

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
and return an ``Int`` value, which is the result of
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

You use function types just like any other types in Swift.
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

You can use a function type such as ``(Int, Int) -> Int``
as a parameter type for another function.
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

The role of ``printMathResult`` is to print the result of
a call to a math function of an appropriate type.
It doesn't matter what that function's implementation actually does –
it matters only that the function is of the correct type.
This enables ``printMathResult`` to hand off some of its functionality
to the caller of the function in a type-safe way.

.. _Functions_FunctionTypesAsReturnTypes:

Function Types as Return Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use a function type as the return type of another function.
You do this by writing a complete function type
immediately after the return arrow (``->``) of the returning function.

The next example defines two simple functions called ``stepForward`` and ``stepBackward``.
The ``stepForward`` function returns a value one more than its input value, 
and the ``stepBackward`` function returns a value one less than its input value.
Both functions have a type of ``(Int) -> Int``:

.. testcode:: functionTypes

   -> func stepForward(input: Int) -> Int {
         return input + 1
      }
   -> func stepBackward(input: Int) -> Int {
         return input - 1
      }

Here's a function called ``chooseStepFunction``,
whose return type is “a function of type ``(Int) -> Int``”.
``chooseStepFunction`` returns the ``stepForward`` function or the ``stepBackward`` function
based on a Boolean parameter called ``backwards``:

.. testcode:: functionTypes

   -> func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
         return backwards ? stepBackward : stepForward
      }

You can now use ``chooseStepFunction`` to obtain a function
that will step in one direction or the other.
For example:

.. testcode:: functionTypes

   -> var currentValue = 3
   << // currentValue : Int = 3
   -> let moveNearerToZero = chooseStepFunction(currentValue > 0)
   << // moveNearerToZero : (Int) -> Int = <unprintable value>
   // moveNearerToZero now refers to the stepBackward() function

The preceding example works out whether a positive or negative step is needed
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
The nested function is hidden from the outside world by default,
but can still be used by its enclosing function.
An enclosing function can return one of its nested functions
to allow the nested function to be used in another scope.

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