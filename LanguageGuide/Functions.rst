Functions
=========

:newTerm:`Functions` are self-contained chunks of code that perform a specific task.
You give a function a name that identifies what it does,
and this name is used to “call” the function to perform its task when needed.

Swift's unified function syntax is flexible enough to express anything from
a simple C-style function with no parameter names,
all the way to to a complex Objective-C-style method
with local and external parameter names for each parameter.
Parameters can provide default values to simplify function calls,
and can be passed as ``inout`` parameters,
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

A function can define one or more types of value that it expects to receive as input
(known as :newTerm:`parameters`),
and can define the type of value that it will pass back as output when it is done
(known as its :newTerm:`return type`).

Every function must have a :newTerm:`function name`,
and this name should describe the task that the function performs.
To use a function, you “call” that function with its name,
and pass it some input values (known as :newTerm:`arguments`)
that match the types of the function's parameters.
A function's arguments must always be provided in the same order
as the function's parameter list.

The function in the example below is called ``greetingForPerson``,
because that's what it does –
it takes a person's name as input,
and passes back a greeting for that person.
To do this, it defines one input parameter –
a ``String`` value called ``personName`` –
and a return type of ``String``,
which will contain a greeting for that person:

.. testcode:: definingAndCalling

   -> func sayHello(personName: String) -> String {
         let greeting = "Hello, " + personName + "!"
         return greeting
      }

All of this information is rolled up into the function's :newTerm:`definition`.
Functions are defined using the ``func`` keyword.
The function's return type is indicated by the :newTerm:`return arrow` ``->``
(a hyphen followed by a greater-than symbol),
which is followed by the name of the type to return.

The definition describes what the function does,
what it expects to receive,
and what it returns when it is done.
The definition makes it easy for the function to be called
elsewhere in your code in a clear and unambiguous way:

.. testcode:: definingAndCalling

   -> println(sayHello("Anna"))
   <- Hello, Anna!
   -> println(sayHello("Brian"))
   <- Hello, Brian!

You call the ``sayHello`` function by passing it a ``String`` argument value in parentheses,
such as ``sayHello("Anna")``.
Because the function returns a ``String`` value,
``sayHello`` can be wrapped in a call to the ``println`` function
to print that string and see its return value, as shown above.

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
all of the parameter definitions are written within the function's parentheses
when the function is defined.

This function takes a start and an end index for a half-open range,
and works out how many elements the range contains:

.. testcode:: multipleInputParameters

   -> func halfOpenRangeLength(start: Int, end: Int) -> Int {
         return end - start
      }
   -> println(halfOpenRangeLength(1, 10))
   <- 9

.. _Functions_FunctionsWithoutParameters:

Functions Without Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Functions don't have to have input parameters.
Here's a function with no input parameters,
which always returns the same ``String`` message whenever it is called:

.. testcode:: functionsWithoutParameters

   -> func sayHelloWorld() -> String {
         return "hello, world"
      }
   -> println(sayHelloWorld())
   <- hello, world

The function definition still needs parentheses after the function's name,
even though it does not take any parameters.
The function name is also followed by
an empty pair of parentheses when the function is called.

.. _Functions_FunctionsWithoutReturnValues:

Functions Without Return Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Functions don't have to return a value.
Here's a version of the ``sayHello`` function,
called ``waveGoodbye``,
which prints its own ``String`` value rather than returning it:

.. testcode:: functionsWithoutReturnValues

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

.. testcode:: functionsWithoutReturnValues

   -> func printAndCount(stringToPrint: String) -> Int {
         println(stringToPrint)
         return countElements(stringToPrint)
      }
   -> func printWithoutCounting(stringToPrint: String) {
         printAndCount(stringToPrint)
      }
   -> printAndCount("hello, world")
   << hello, world
   // prints "hello, world" and returns a value of 12
   << // r0 : Int = 12
   -> printWithoutCounting("hello, world")
   << hello, world
   // prints "hello, world" but does not return a value

The first function, ``printAndCount``,
prints a string, and then returns its character count as an ``Int``.
The second function, ``printWithoutCounting``,
calls the first function, but ignores its return value.
When the second function is called,
the message is still printed by the first function,
but the returned value is not used.

.. note::

   Return values can be ignored,
   but a function that says it will return a value must always do so.
   A function with a defined return type
   cannot allow control to fall out of the bottom of the function
   without returning a value,
   and attempting to do so will result in a compile-time error.

.. _Functions_TupleTypesAsParameterTypes:

Tuple Types as Parameter Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use a tuple type as the type of a function parameter.
For example, you can rewrite the ``halfOpenRangeLength`` function from above
to have a single tuple parameter called ``range``,
which contains two named ``Int`` values called ``start`` and ``end``:

.. testcode:: tuplesTypesAsParameterTypes

   -> func halfOpenRangeLength(range: (start: Int, end: Int)) -> Int {
         return range.end - range.start
      }
   -> let someRange = (1, 10)
   << // someRange : (Int, Int) = (1, 10)
   -> println(halfOpenRangeLength(someRange))
   <- 9

Note that this function takes *one* input parameter, not two.
Its single input parameter is a tuple, which contains two ``Int`` values.
This ability to bundle up related values into a single compound value
is one of the major benefits of tuples.
This function can be passed any tuple of type ``(Int, Int)`` –
such as ``(1, 10)`` in the example above –
and it will calculate the half-open range length for that tuple.

In the example above, the ``someRange`` tuple's elements are not given names
when the tuple is created.
However, the tuple's elements *are* given names as part of the function's parameter list.
This means that the tuple elements can be accessed by name within the function's body.

.. TODO: mention that you can pass a tuple as the entire set of arguments,
   as in var argTuple = (0, "one", '2'); x.foo:bar:bas:(argTuple)

.. _Functions_TupleTypesAsReturnTypes:

Tuple Types as Return Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also use a tuple type as the return type for a function.
This enables a function to return multiple values as part of one compound return value.

The example below defines a function called ``count``,
which counts the number of vowels, consonants, and other characters in a string,
based on the standard set of vowels and consonants used in American English:

.. testcode:: tupleTypesAsReturnTypes

   -> func count(string: String) -> (vowels: Int, consonants: Int, others: Int) {
         var vowels = 0, consonants = 0, others = 0
         for character in string {
            switch String(character).lowercase {
               case "a", "e", "i", "o", "u":
                  ++vowels
               case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
                  "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
                  ++consonants
               default:
                  ++others
            }
         }
         return (vowels, consonants, others)
      }

You can use the ``count`` function to count the characters in an arbitrary string,
and to retrieve the counted totals as a tuple of three named ``Int`` values:

.. testcode:: tupleTypesAsReturnTypes

   -> let total = count("some arbitrary string!")
   << // total : (vowels: Int, consonants: Int, others: Int) = (6, 13, 3)
   -> println("\(total.vowels) vowels and \(total.consonants) consonants")
   <- 6 vowels and 13 consonants

Note that the tuple's members do not need to be named
at the point that the tuple is returned from the function,
because their names have already been specified as part of the function's return type.

.. _Functions_FunctionParameterNames:

Function Parameter Names
------------------------

All of the above functions define :newTerm:`parameter names` for their parameters:

.. testcode:: functionParameterNames

   -> func someFunction(parameterName: Int) {
         // function body goes here, and can use parameterName
         // to refer to the argument value for that parameter
      }

However, these parameter names are only used within
the body of the function itself, and cannot be used when calling the function.
These kinds of parameter names are known as :newTerm:`local parameter names`,
because they are only available for use within the function's body.

.. _Functions_ExternalParameterNames:

External Parameter Names
~~~~~~~~~~~~~~~~~~~~~~~~

It can sometimes be useful to provide a name for each parameter
when you *call* a function too.
This helps to indicate the intended purpose of each of the arguments
you are passing to the function.

If you want users of your function to provide parameter names
when they call your function,
you can define an :newTerm:`external parameter name` for each parameter,
in addition to the local parameter name.
An external parameter name is written before the local parameter name it supports,
separated by a space:

.. testcode:: externalParameterNames

   -> func someFunction(externalParameterName localParameterName: Int) {
         // function body goes here, and can use localParameterName
         // to refer to the argument value for that parameter
      }

.. note::

   If you provide an external parameter name for a parameter,
   that external name must *always* be used when calling the function.

As an example, consider the following function,
which joins two strings by inserting a third “joiner” string between them:

.. testcode:: externalParameterNames

   -> func join(s1: String, s2: String, joiner: String) -> String {
         return s1 + joiner + s2
      }

When you call this function,
the purpose of the three strings that you pass to the function is unclear:

.. testcode:: externalParameterNames

   -> join("hello", "world", ", ")
   << // r0 : String = "hello, world"
   /> returns \"\(r0)\"
   </ returns "hello, world"

To make the purpose of these ``String`` values clearer,
define external parameter names for each of the ``join`` function's parameters:

.. testcode:: externalParameterNames

   -> func join(string s1: String, toString s2: String, withJoiner joiner: String)
            -> String {
         return s1 + joiner + s2
      }

In this version of the ``join`` function,
the first parameter has an external name of ``string`` and a local name of ``s1``;
the second parameter has an external name of ``toString`` and a local name of ``s2``;
and the third parameter has an external name of ``withJoiner``
and a local name of ``joiner``.

You can now use these external parameter names to call the function
in a clear and unambiguous way:

.. testcode:: externalParameterNames

   -> join(string: "hello", toString: "world", withJoiner: ", ")
   << // r1 : String = "hello, world"
   /> returns \"\(r1)\"
   </ returns "hello, world"

The use of external parameter names enables this second version of the ``join`` function
to be called in an expressive, sentence-like manner by users of the function,
while still providing a function body that is readable and clear in intent.

.. note::

   Consider using external parameter names whenever the purpose of a function's arguments
   would be unclear to someone reading your code for the first time.
   You do not need to specify external parameter names
   if the purpose of each parameter is clear and unambiguous when the function is called.

.. _Functions_ShorthandExternalParameterNames:

Shorthand External Parameter Names
__________________________________

If you want to provide an external parameter name for a function parameter,
and the local parameter name is already an appropriate name to use,
you do not need to write the same name twice for that parameter.
Instead, you can write the name once,
and prefix the name with a back tick (`````).
This tells Swift to use that name as both
the local parameter name and the external parameter name.

This example defines a function called ``containsCharacter``,
which defines external parameter names for both of its parameters
by placing a back tick before their local parameter names:

.. testcode:: externalParameterNames

   -> func containsCharacter(`string: String, `characterToFind: Character) -> Bool {
         for character in string {
            if character == characterToFind {
               return true
            }
         }
         return false
      }

This function's choice of parameter names makes for a clear, readable function body,
while also enabling the function to be called without ambiguity:

.. testcode:: externalParameterNames

   -> let containsAVee = containsCharacter(string: "aardvark", characterToFind: "v")
   << // containsAVee : Bool = true
   /> containsAVee equals \(containsAVee), because \"aardvark\" contains a \"v\"
   </ containsAVee equals true, because "aardvark" contains a "v"

.. _Functions_DefaultParameterValues:

Default Parameter Values
~~~~~~~~~~~~~~~~~~~~~~~~

You can define a :newTerm:`default value` for any parameter as part of a function's definition.
If a default value is defined, you can omit that parameter when calling the function.

.. note::

   Place parameters with default values at the end of a function's parameter list.
   This ensures that all calls to the function
   use the same order for their non-defaulted arguments,
   and makes it clear that the same function is being called in each case.

Here's a version of the ``join`` function from earlier,
which provides a default value for its ``joiner`` parameter:

.. testcode:: defaultParameterValues

   -> func join(string s1: String, toString s2: String,
            withJoiner joiner: String = " ") -> String {
         return s1 + joiner + s2
      }

If a string value for ``joiner`` is provided when the ``join`` function is called,
that string value is used to join the two strings together, as before:

.. testcode:: defaultParameterValues

   -> join(string: "hello", toString: "world", withJoiner: "-")
   << // r0 : String = "hello-world"
   /> returns \"\(r0)\"
   </ returns "hello-world"

However, if no value of ``joiner`` is provided when the function is called,
the default value of a single space (``" "``) is used instead:

.. testcode:: defaultParameterValues

   -> join(string: "hello", toString: "world")
   << // r1 : String = "hello world"
   /> returns \"\(r1)\"
   </ returns "hello world"

.. _Functions_ExternalNamesForParametersWithDefaultValues:

External Names for Parameters with Default Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In most cases, it is useful to provide (and therefore require) an external name
for any parameter with a default value.
This makes sure that the argument for that parameter is clear in purpose
if a value is provided when the function is called.

To make this process easier,
Swift provides an automatic external name for any defaulted parameter you define,
if you do not provide an external name yourself.
The automatic external name is the same as the local name,
as if you had written a back tick before the local name in your code.

Here's a version of the ``join`` function from earlier,
which does not provide external names for any of its parameters,
but still provides a default value for its ``joiner`` parameter:

.. testcode:: automaticExternalNamesForDefaultParameterValues

   -> func join(s1: String, s2: String, joiner: String = " ") -> String {
         return s1 + joiner + s2
      }

In this case, Swift automatically provides
an external parameter name of ``joiner`` for the defaulted parameter.
This means that the external name must be provided when calling the function,
making the parameter's purpose clear and unambiguous:

.. testcode:: automaticExternalNamesForDefaultParameterValues

   -> join("hello", "world", joiner: "-")
   << // r0 : String = "hello-world"
   /> returns \"\(r0)\"
   </ returns "hello-world"

.. note::

   You can opt out of this behavior by writing an underscore (``_``)
   instead of an explicit external name when you define the parameter.
   However, external names for defaulted parameters are always preferred
   where appropriate.

.. _Functions_VariadicParameters:

Variadic Parameters
~~~~~~~~~~~~~~~~~~~

A :newTerm:`variadic parameter` accepts zero or more values of a certain type.
You use a variadic parameter to specify that the parameter can be passed
a varying number of input values when the function is called.
Variadic parameters are written by inserting
three period characters (``...``) after the parameter's type name.

A variadic parameter can be used with the ``for``-``in`` statement
to iterate through the list of values represented by the parameter.
Variadic parameters automatically conform to the ``Sequence`` protocol,
and can be used anywhere that a ``Sequence`` is valid.
``Sequence`` is covered in more detail in :doc:`Protocols`.

.. TODO: sequence isn't currently covered in Protocols.
   remove this comment if it is not included before release.

The example below calculates the :newTerm:`arithmetic mean`
(also known as the :newTerm:`average`) for a list of numbers of any length:

.. testcode:: variadicParameters

   -> func arithmeticMean(numbers: Double...) -> Double {
         var total: Double = 0
         for number in numbers {
            total += number
         }
         return total / Double(numbers.count)
      }
   -> arithmeticMean(1, 2, 3, 4, 5)
   << // r0 : Double = 3.0
   /> returns \(r0), which is the arithmetic mean of these five numbers
   </ returns 3.0, which is the arithmetic mean of these five numbers
   -> arithmeticMean(3, 8, 19)
   << // r1 : Double = 10.0
   /> returns \(r1), which is the arithmetic mean of these three numbers
   </ returns 10.0, which is the arithmetic mean of these three numbers

.. note::

   A function may have at most one variadic parameter,
   and it must always appear last in the parameter list,
   to avoid ambiguity when calling the function with multiple parameters.

   If your function has one or more parameters with a default value,
   and also has a variadic parameter,
   place the variadic parameter after all of the defaulted parameters
   at the very end of the list.

.. FIXME: A function's variadic parameter cannot be referred to by name
   when the function is called.
   I've reported this as rdar://16387108;
   if it doesn't get fixed, I should mention it here.

.. _Functions_ConstantAndVariableParameters:

Constant and Variable Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Function parameters are constants by default.
Trying to change the value of a function parameter
from within the body of that function results in a compile-time error.
This means that you can't accidentally change the value of a parameter by mistake.

However, sometimes it is useful for a function to have
a *variable* copy of a parameter's value to work with.
You can avoid defining a new variable yourself within the function
by specifying one or more parameters as :newTerm:`variable parameters` instead.
Variable parameters are available as variables rather than constants,
and give a new modifiable copy of the parameter's value for your function to work with.

Define variable parameters by prefixing the parameter name with the keyword ``var``:

.. testcode:: constantAndVariableParameters

   -> func alignRight(var string: String, count: Int, pad: Character) -> String {
         let amountToPad = count - countElements(string)
         for _ in 0...amountToPad {
            string = pad + string
         }
         return string
      }
   -> let originalString = "hello"
   << // originalString : String = "hello"
   -> let paddedString = alignRight(originalString, 10, "-")
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

.. _Functions_InOutParameters:

In-Out Parameters
~~~~~~~~~~~~~~~~~

It is sometimes useful for a function parameter to represent
the *actual* external value used for the call,
and for any modifications to that value to change
the original value from outside of the function,
after the function has completed its execution.
You define such parameters as :newTerm:`in-out parameters`,
which are written by placing the ``inout`` keyword at the start of their parameter definition.

You can think of in-out parameters in the following way:

An in-out parameter has a value that is passed *in* to the function;
is modified by the function;
and is passed back *out* of the function to replace the original value.

You can only ever pass a variable as the argument for an in-out parameter.
You cannot pass a constant or a literal value as the argument,
because constants and literals cannot be modified.
You place an ampersand (``&``) directly before a variable's name
when you pass it as an argument to an inout parameter,
to indicate that it can be modified by the function.

.. note::

   In-out parameters cannot have default values,
   and variadic parameters cannot be marked as ``inout``.
   If you mark a parameter as ``inout``,
   it cannot also be marked as ``var`` or ``let``.

Here's an example of a function called ``swapTwoInts``,
which has two in-out integer parameters called ``a`` and ``b``:

.. testcode:: inoutParameters

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

.. testcode:: inoutParameters

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
   << // r0 : (Int, Int) -> Int = <unprintable value>
   -> func multiplyTwoInts(a: Int, b: Int) -> Int {
         return a * b
      }
   >> multiplyTwoInts
   << // r1 : (Int, Int) -> Int = <unprintable value>

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
   << // anotherMathFunction : (Int, Int) -> Int = <unprintable value>
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

.. TODO: function currying syntax 
.. TODO: partial application
.. TODO: currying example from /test/Serialization/Inputs/def_transparent.swift