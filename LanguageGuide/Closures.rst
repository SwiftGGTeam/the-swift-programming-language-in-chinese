Closures
========

:newTerm:`Closures` are self-contained blocks of functionality
that can be passed around and used in your code.
Closures in Swift are similar to blocks in C and Objective-C
and to lambdas in other programming languages.

Closures can capture and store references to any constants and variables
from the context in which they are defined.
This is known as :newTerm:`closing` over those constants and variables,
hence the name “closures”.
Swift handles all of the memory management of capturing for you.

.. note::

   Don't worry if you are not familiar with the concept of “capturing”.
   It is explained in detail below in :ref:`Closures_CapturingValues`.

Global and nested functions, as introduced in :doc:`Functions`,
are actually special cases of closures.
Closures take one of three forms:

* Global functions are closures that have a name
  and do not capture any values.
* Nested functions are closures that have a name
  and can capture values from their enclosing function.
* Closure expressions are unnamed closures written in a lightweight syntax
  that can capture values from their surrounding context.

Swift's closure expressions have a clean, clear style,
with optimizations that encourage brief, clutter-free syntax in common scenarios.
These optimizations include:

* Inferring parameter and return value types from context
* Implicit returns from single-expression closures
* Shorthand argument names
* Trailing closure syntax

.. _Closures_ClosureExpressions:

Closure Expressions
-------------------

Nested functions, as introduced in :ref:`Functions_NestedFunctions`,
are a convenient means of naming and defining self-contained blocks of code
as part of a larger function.
However, it is sometimes useful to write shorter versions of function-like constructs
without a full declaration and name.
This is particularly true when you work with functions that take other functions
as one or more of their arguments.

:newTerm:`Closure expressions` are a way to write inline closures in a brief, focused syntax.
Closure expressions provide several syntax optimizations
for writing closures in a shortened form without loss of clarity or intent.
The closure expression examples below illustrate these optimizations
by refining a single example of the ``sorted`` function over several iterations,
each of which expresses the same functionality in a more succinct way.

.. _Closures_TheSortedFunction:

The Sorted Function
~~~~~~~~~~~~~~~~~~~

Swift's standard library provides a function called ``sorted``,
which sorts an array of values of a known type,
based on the output of a sorting closure that you provide.
Once it completes the sorting process,
the ``sorted`` function returns a new array of the same type and size as the old one,
with its elements in the correct sorted order.
The original array is not modified by the ``sorted`` function.

The closure expression examples below use the ``sorted`` function
to sort an array of ``String`` values in reverse alphabetical order.
Here's the initial array to be sorted:

.. testcode:: closureSyntax

   -> let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
   << // names : [String] = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

The ``sorted`` function takes two arguments:

* An array of values of a known type.
* A closure that takes two arguments of the same type as the array's contents,
  and returns a ``Bool`` value to say whether the first value should appear
  before or after the second value once the values are sorted.
  The sorting closure needs to return ``true``
  if the first value should appear *before* the second value,
  and ``false`` otherwise.

This example is sorting an array of ``String`` values,
and so the sorting closure needs to be a function of type ``(String, String) -> Bool``.

One way to provide the sorting closure is to write a normal function of the correct type,
and to pass it in as the ``sorted`` function's second parameter:

.. testcode:: closureSyntax

   -> func isOrderedAscending(s1: String, s2: String) -> Bool {
         return s1 > s2
      }
   -> var ascending = sorted(names, isOrderedAscending)
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
   // ascending is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

If the first string (``s1``) is greater than the second string (``s2``),
the ``isOrderedAscending(_:_:)`` function will return ``true``,
indicating that ``s1`` should appear before ``s2`` in the sorted array.
For characters in strings,
“greater than” means “appears later in the alphabet than”.
This means that the letter ``"B"`` is “greater than” the letter ``"A"``,
and the string ``"Tom"`` is greater than the string ``"Tim"``.
This gives a reverse alphabetical sort,
with ``"Barry"`` being placed before ``"Alex"``, and so on.

However, this is a rather long-winded way to write
what is essentially a single-expression function (``a > b``).
In this example, it would be preferable to write the sorting closure inline,
using closure expression syntax.

.. _Closures_ClosureExpressionSyntax:

Closure Expression Syntax
~~~~~~~~~~~~~~~~~~~~~~~~~

Closure expression syntax has the following general form:

.. syntax-outline::

   { (<#parameters#>) -> <#return type#> in
      <#statements#>
   }

Closure expression syntax can use
constant parameters, variable parameters, and ``inout`` parameters.
Default values cannot be provided.
Variadic parameters can be used if you name the variadic parameter
and place it last in the parameter list.
Tuples can also be used as parameter types and return types.

.. FIXME: the note about default values is tracked by rdar://16535452.
   Remove this note if and when that Radar is fixed.

.. FIXME: the note about variadic parameters requiring a name is tracked by rdar://16535434.
   Remove this note if and when that Radar is fixed.

The example below shows a closure expression version of the ``isOrderedAscending(_:_:)`` function
from earlier:

.. testcode:: closureSyntax

   -> ascending = sorted(names, { (s1: String, s2: String) -> Bool in
         return s1 > s2
      })
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Note that the declaration of parameters and return type for this inline closure
is identical to the declaration from the ``isOrderedAscending(_:_:)`` function.
In both cases, it is written as ``(s1: String, s2: String) -> Bool``.
However, for the inline closure expression,
the parameters and return type are written *inside* the curly braces,
not outside of them.

The start of the closure's body is introduced by the ``in`` keyword.
This keyword indicates that
the definition of the closure's parameters and return type has finished,
and the body of the closure is about to begin.

Because the body of the closure is so short,
it can even be written on a single line:

.. testcode:: closureSyntax

   -> ascending = sorted(names, { (s1: String, s2: String) -> Bool in return s1 > s2 } )
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

This illustrates that the overall call to the ``sorted`` function has remained the same.
A pair of parentheses still wrap the entire set of arguments for the function.
However, one of those arguments is now an inline closure.

.. _Closures_InferringTypeFromContext:

Inferring Type From Context
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because the sorting closure is passed as an argument to a function,
Swift can infer the types of its parameters
and the type of the value it returns
from the type of the ``sorted`` function's second parameter.
This parameter is expecting a function of type ``(String, String) -> Bool``.
This means that the ``(String, String)`` and ``Bool`` types do not need to be written
as part of the closure expression's definition.
Because all of the types can be inferred,
the return arrow (``->``) and the parentheses around the names of the parameters
can also be omitted:

.. testcode:: closureSyntax

   -> ascending = sorted(names, { s1, s2 in return s1 > s2 } )
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

It is always possible to infer the parameter types and return type
when passing a closure to a function as an inline closure expression.
As a result, you never need to write an inline closure in its fullest form
when the closure is used as a function argument.

Nonetheless, you can still make the types explicit if you wish,
and doing so is encouraged if it avoids ambiguity for readers of your code.
In the case of the ``sorted`` function,
the purpose of the closure is clear from the fact that sorting is taking place,
and it is safe for a reader to assume that
the closure is likely to be working with ``String`` values,
because it is assisting with the sorting of an array of strings.

.. _Closures_ImplicitReturnsFromSingleExpressionClosures:

Implicit Returns from Single-Expression Closures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Single-expression closures can implicitly return the result of their single expression
by omitting the ``return`` keyword from their declaration,
as in this version of the previous example:

.. testcode:: closureSyntax

   -> ascending = sorted(names, { s1, s2 in s1 > s2 } )
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Here, the function type of the ``sorted`` function's second argument
makes it clear that a ``Bool`` value must be returned by the closure.
Because the closure's body contains a single expression (``s1 > s2``)
that returns a ``Bool`` value,
there is no ambiguity, and the ``return`` keyword can be omitted.

.. _Closures_ShorthandArgumentNames:

Shorthand Argument Names
~~~~~~~~~~~~~~~~~~~~~~~~~

Swift automatically provides shorthand argument names to inline closures,
which can be used to refer to the values of the closure's arguments
by the names ``$0``, ``$1``, ``$2``, and so on.

If you use these shorthand argument names within your closure expression,
you can omit the closure's argument list from its definition,
and the number and type of the shorthand argument names
will be inferred from the expected function type.
The ``in`` keyword can also be omitted,
because the closure expression is made up entirely of its body:

.. testcode:: closureSyntax

   -> ascending = sorted(names, { $0 > $1 } )
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Here, ``$0`` and ``$1`` refer to the closure's first and second ``String`` arguments.

.. _Closures_OperatorFunctions:

Operator Functions
~~~~~~~~~~~~~~~~~~

There's actually an even *shorter* way to write the closure expression above.
Swift's ``String`` type defines its string-specific implementation of
the greater-than operator (``>``)
as a function that has two parameters of type ``String``,
and returns a value of type ``Bool``.
This exactly matches the function type needed for the ``sorted`` function's
second parameter.
Therefore, you can simply pass in the greater-than operator,
and Swift will infer that you want to use its string-specific implementation:

.. testcode:: closureSyntax

   -> ascending = sorted(names, >)
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

For more about operator functions, see :ref:`AdvancedOperators_OperatorFunctions`.

.. _Closures_TrailingClosures:

Trailing Closures
-----------------

If you need to pass a closure expression to a function as the function's final argument
and the closure expression is long,
it can be useful to write it as a :newTerm:`trailing closure` instead.
A trailing closure is a closure expression
that is written outside of (and *after*) the parentheses of the function call it supports:

.. testcode:: closureSyntax

   -> func someFunctionThatTakesAClosure(closure: () -> ()) {
         // function body goes here
      }
   ---
   -> // here's how you call this function without using a trailing closure:
   ---
   -> someFunctionThatTakesAClosure({
         // closure's body goes here
      })
   ---
   -> // here's how you call this function with a trailing closure instead:
   ---
   -> someFunctionThatTakesAClosure() {
         // trailing closure's body goes here
      }

.. note::

   If a closure expression is provided as the function's only argument
   and you provide that expression as a trailing closure,
   you do not need to write a pair of parentheses ``()``
   after the function's name when you call the function.

The string-sorting closure from the :ref:`Closures_ClosureExpressionSyntax` section above
can be written outside of the ``sorted`` function's parentheses as a trailing closure:

.. testcode:: closureSyntax

   -> ascending = sorted(names) { $0 > $1 }
   >> ascending
   << // ascending : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Trailing closures are most useful when the closure is sufficiently long that
it is not possible to write it inline on a single line.
As an example, Swift's ``Array`` type has a ``map(_:)`` method
which takes a closure expression as its single argument.
The closure is called once for each item in the array,
and returns an alternative mapped value (possibly of some other type) for that item.
The nature of the mapping and the type of the returned value
is left up to the closure to specify.

After applying the provided closure to each array element,
the ``map(_:)`` method returns a new array containing all of the new mapped values,
in the same order as their corresponding values in the original array.

Here's how you can use the ``map(_:)`` method with a trailing closure
to convert an array of ``Int`` values into an array of ``String`` values.
The array ``[16, 58, 510]`` is used to create the new array
``["OneSix", "FiveEight", "FiveOneZero"]``:

.. testcode:: arrayMap

   -> let digitNames = [
         0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
         5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
      ]
   << // digitNames : [Int : String] = [8: "Eight", 2: "Two", 4: "Four", 9: "Nine", 5: "Five", 6: "Six", 7: "Seven", 0: "Zero", 1: "One", 3: "Three"]
   -> let numbers = [16, 58, 510]
   << // numbers : [Int] = [16, 58, 510]

The code above creates a dictionary of mappings between
the integer digits and English-language versions of their names.
It also defines an array of integers, ready to be converted into strings.

You can now use the ``numbers`` array to create an array of ``String`` values,
by passing a closure expression to the array's ``map(_:)`` method as a trailing closure.
Note that the call to ``numbers.map`` does not need to include any parentheses after ``map``,
because the ``map(_:)`` method has only one parameter,
and that parameter is provided as a trailing closure:

.. testcode:: arrayMap

   -> let strings = numbers.map {
            (var number) -> String in
         var output = ""
         while number > 0 {
            output = digitNames[number % 10]! + output
            number /= 10
         }
         return output
      }
   << // strings : Array<String> = ["OneSix", "FiveEight", "FiveOneZero"]
   // strings is inferred to be of type [String]
   /> its value is [\"\(strings[0])\", \"\(strings[1])\", \"\(strings[2])\"]
   </ its value is ["OneSix", "FiveEight", "FiveOneZero"]

The ``map(_:)`` method calls the closure expression once for each item in the array.
You do not need to specify the type of the closure's input parameter, ``number``,
because the type can be inferred from the values in the array to be mapped.

In this example, the closure's ``number`` parameter is defined as a *variable parameter*,
as described in :ref:`Functions_ConstantAndVariableParameters`,
so that the parameter's value can be modified within the closure body,
rather than declaring a new local variable and assigning the passed ``number`` value to it.
The closure expression also specifies a return type of ``String``,
to indicate the type that will be stored in the mapped output array.

The closure expression builds a string called ``output`` each time it is called.
It calculates the last digit of ``number`` by using the remainder operator (``number % 10``),
and uses this digit to look up an appropriate string in the ``digitNames`` dictionary.
The closure can be used to create a string representation of any integer number greater than zero.

.. note::

   The call to the ``digitNames`` dictionary's subscript
   is followed by an exclamation mark (``!``),
   because dictionary subscripts return an optional value
   to indicate that the dictionary lookup can fail if the key does not exist.
   In the example above, it is guaranteed that ``number % 10``
   will always be a valid subscript key for the ``digitNames`` dictionary,
   and so an exclamation mark is used to force-unwrap the ``String`` value
   stored in the subscript's optional return value.

The string retrieved from the ``digitNames`` dictionary
is added to the *front* of ``output``,
effectively building a string version of the number in reverse.
(The expression ``number % 10`` gives a value of
``6`` for ``16``, ``8`` for ``58``, and ``0`` for ``510``.)

The ``number`` variable is then divided by ``10``.
Because it is an integer, it is rounded down during the division,
so ``16`` becomes ``1``, ``58`` becomes ``5``, and ``510`` becomes ``51``.

The process is repeated until ``number /= 10`` is equal to ``0``,
at which point the ``output`` string is returned by the closure,
and is added to the output array by the ``map`` function.

The use of trailing closure syntax in the example above
neatly encapsulates the closure's functionality
immediately after the function that closure supports,
without needing to wrap the entire closure within
the ``map`` function's outer parentheses.

.. _Closures_CapturingValues:

Capturing Values
----------------

A closure can :newTerm:`capture` constants and variables
from the surrounding context in which it is defined.
The closure can then refer to and modify
the values of those constants and variables from within its body,
even if the original scope that defined the constants and variables no longer exists.

In Swift, the simplest form of a closure that can capture values is a nested function,
written within the body of another function.
A nested function can capture any of its outer function's arguments
and can also capture any constants and variables defined within the outer function.

Here's an example of a function called ``makeIncrementer``,
which contains a nested function called ``incrementer``.
The nested ``incrementer`` function captures two values,
``runningTotal`` and ``amount``,
from its surrounding context.
After capturing these values,
``incrementer`` is returned by ``makeIncrementer`` as a closure
that increments ``runningTotal`` by ``amount`` each time it is called.

.. testcode:: closures

   -> func makeIncrementer(forIncrement amount: Int) -> () -> Int {
         var runningTotal = 0
         func incrementer() -> Int {
            runningTotal += amount
            return runningTotal
         }
         return incrementer
      }

The return type of ``makeIncrementer`` is ``() -> Int``.
This means that it returns a *function*, rather than a simple value.
The function it returns has no parameters,
and returns an ``Int`` value each time it is called.
To learn how functions can return other functions,
see :ref:`Functions_FunctionTypesAsReturnTypes`.

The ``makeIncrementer`` function defines an integer variable called ``runningTotal``,
to store the current running total of the incrementer that will be returned.
This variable is initialized with a value of ``0``.

The ``makeIncrementer`` function has a single ``Int`` parameter
with an external name of ``forIncrement``, and a local name of ``amount``.
The argument value passed to this parameter specifies
how much ``runningTotal`` should be incremented by
each time the returned incrementer function is called.

``makeIncrementer`` defines a nested function called ``incrementer``,
which performs the actual incrementing.
This function simply adds ``amount`` to ``runningTotal``, and returns the result.

When considered in isolation,
the nested ``incrementer`` function might seem unusual:

.. testcode:: closuresPullout

   -> func incrementer() -> Int {
   >>    var runningTotal = 0
   >>    var amount = 1
         runningTotal += amount
         return runningTotal
      }

The ``incrementer`` function doesn't have any parameters,
and yet it refers to ``runningTotal`` and ``amount`` from within its function body.
It does this by capturing the *existing* values of ``runningTotal`` and ``amount``
from its surrounding function
and using them within its own function body.

Because it modifies the ``runningTotal`` variable each time it is called,
``incrementer`` captures a *reference* to the current ``runningTotal`` variable,
and not just a copy of its initial value.
Capturing a reference ensures that ``runningTotal`` does not disappear
when the call to ``makeIncrementer`` ends,
and ensures that ``runningTotal`` is available
the next time the ``incrementer`` function is called..

However, because it does not modify ``amount``,
and ``amount`` is not mutated outside it,
``incrementer`` actually captures and stores a *copy* of the value stored in ``amount``.
This value is stored along with the new ``incrementer`` function.

.. note::

   Swift determines what should be captured by reference
   and what should be copied by value.
   You don't need to annotate ``amount`` or ``runningTotal``
   to say that they can be used within the nested ``incrementer`` function.
   Swift also handles all memory management involved in disposing of ``runningTotal``
   when it is no longer needed by the ``incrementer`` function.

Here's an example of ``makeIncrementer`` in action:

.. testcode:: closures

   -> let incrementByTen = makeIncrementer(forIncrement: 10)
   << // incrementByTen : () -> Int = (Function)

This example sets a constant called ``incrementByTen``
to refer to an incrementer function that adds ``10`` to
its ``runningTotal`` variable each time it is called.
Calling the function multiple times shows this behavior in action:

.. testcode:: closures

   -> incrementByTen()
   << // r0 : Int = 10
   /> returns a value of \(r0)
   </ returns a value of 10
   -> incrementByTen()
   << // r1 : Int = 20
   /> returns a value of \(r1)
   </ returns a value of 20
   -> incrementByTen()
   << // r2 : Int = 30
   /> returns a value of \(r2)
   </ returns a value of 30

If you create a second incrementer,
it will have its own stored reference to a new, separate ``runningTotal`` variable:

.. testcode:: closures

   -> let incrementBySeven = makeIncrementer(forIncrement: 7)
   << // incrementBySeven : () -> Int = (Function)
   -> incrementBySeven()
   << // r3 : Int = 7
   /> returns a value of \(r3)
   </ returns a value of 7

Calling the original incrementer (``incrementByTen``) again
continues to increment its own ``runningTotal`` variable,
and does not affect the variable captured by ``incrementBySeven``:

.. testcode:: closures

   -> incrementByTen()
   << // r4 : Int = 40
   /> returns a value of \(r4)
   </ returns a value of 40

.. note::

   If you assign a closure to a property of a class instance,
   and the closure captures that instance by referring to the instance or its members,
   you will create a strong reference cycle between the closure and the instance.
   Swift uses *capture lists* to break these strong reference cycles.
   For more information, see :ref:`AutomaticReferenceCounting_StrongReferenceCyclesForClosures`.

.. _Closures_ClosuresAreReferenceTypes:

Closures Are Reference Types
----------------------------

In the example above,
``incrementBySeven`` and ``incrementByTen`` are constants,
but the closures these constants refer to are still able to increment
the ``runningTotal`` variables that they have captured.
This is because functions and closures are :newTerm:`reference types`.

Whenever you assign a function or a closure to a constant or a variable,
you are actually setting that constant or variable to be
a *reference* to the function or closure.
In the example above,
it is the choice of closure that ``incrementByTen`` *refers to* that is constant,
and not the contents of the closure itself.

This also means that if you assign a closure to two different constants or variables,
both of those constants or variables will refer to the same closure:

.. testcode:: closures

   -> let alsoIncrementByTen = incrementByTen
   << // alsoIncrementByTen : () -> Int = (Function)
   -> alsoIncrementByTen()
   << // r5 : Int = 50
   /> returns a value of \(r5)
   </ returns a value of 50

.. TODO: Autoclosures
   ------------------

.. TODO: var closure1: @autoclosure () -> Int = 4  // Function producing 4 whenever it is called.

.. TODO: from Assert.swift in stdlib/core:
   @transparent
   func assert(
     condition: @autoclosure () -> Bool, message: StaticString = StaticString()
   ) {
   }
.. TODO: note that an @autoclosure's argument type must always be ()
   see also test/expr/closure/closures.swift

.. TODO: The autoclosure attribute modifies a function type,
   changing the behavior of any assignment into (or initialization of) a value with the function type.
   Instead of requiring that the rvalue and lvalue have the same function type,
   an "auto closing" function type requires its initializer expression to have
   the same type as the function's result type,
   and it implicitly binds a closure over this expression.
   This is typically useful for function arguments that want to
   capture computation that can be run lazily.
   autoclosure is only valid in a type of a syntactic function type
   that is defined to take a syntactic empty tuple.
