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
This is particularly true when you work with functions or methods that take functions
as one or more of their arguments.

:newTerm:`Closure expressions` are a way to write inline closures in a brief, focused syntax.
Closure expressions provide several syntax optimizations
for writing closures in a shortened form without loss of clarity or intent.
The closure expression examples below illustrate these optimizations
by refining a single example of the ``sort(_:)`` method over several iterations,
each of which expresses the same functionality in a more succinct way.

.. _Closures_TheSortedFunction:

The Sort Method
~~~~~~~~~~~~~~~

Swift's standard library provides a method called ``sort(_:)``,
which sorts an array of values of a known type,
based on the output of a sorting closure that you provide.
Once it completes the sorting process,
the ``sort(_:)`` method returns a new array of the same type and size as the old one,
with its elements in the correct sorted order.
The original array is not modified by the ``sort(_:)`` method.

The closure expression examples below use the ``sort(_:)`` method
to sort an array of ``String`` values in reverse alphabetical order.
Here's the initial array to be sorted:

.. testcode:: closureSyntax

   -> let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
   << // names : [String] = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

The ``sort(_:)`` method accepts a closure that takes two arguments
of the same type as the array's contents,
and returns a ``Bool`` value to say whether the first value should appear
before or after the second value once the values are sorted.
The sorting closure needs to return ``true``
if the first value should appear *before* the second value,
and ``false`` otherwise.

This example is sorting an array of ``String`` values,
and so the sorting closure needs to be a function of type ``(String, String) -> Bool``.

One way to provide the sorting closure is to write a normal function of the correct type,
and to pass it in as an argument to the ``sort(_:)`` method:

.. testcode:: closureSyntax

   -> func backwards(s1: String, _ s2: String) -> Bool {
         return s1 > s2
      }
   -> var reversed = names.sort(backwards)
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
   // reversed is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

If the first string (``s1``) is greater than the second string (``s2``),
the ``backwards(_:_:)`` function will return ``true``,
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
Variadic parameters can be used if you name the variadic parameter.
Tuples can also be used as parameter types and return types.

.. FIXME: the note about default values is tracked by rdar://16535452.
   Remove this note if and when that Radar is fixed.

.. FIXME: the note about variadic parameters requiring a name is tracked by rdar://16535434.
   Remove this note if and when that Radar is fixed.

.. QUESTION: is "reversed" the right name to use here?
   it's a backwards sort, not a reversed version of the original array

The example below shows a closure expression version of the ``backwards(_:_:)`` function
from earlier:

.. testcode:: closureSyntax

   -> reversed = names.sort({ (s1: String, s2: String) -> Bool in
         return s1 > s2
      })
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Note that the declaration of parameters and return type for this inline closure
is identical to the declaration from the ``backwards(_:_:)`` function.
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

   -> reversed = names.sort( { (s1: String, s2: String) -> Bool in return s1 > s2 } )
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

This illustrates that the overall call to the ``sort(_:)`` method has remained the same.
A pair of parentheses still wrap the entire argument for the method.
However, that argument is now an inline closure.

.. _Closures_InferringTypeFromContext:

Inferring Type From Context
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because the sorting closure is passed as an argument to a method,
Swift can infer the types of its parameters
and the type of the value it returns.
The ``sort(_:)`` method is being called on an array of strings,
so its argument must be a function of type ``(String, String) -> Bool``.
This means that the ``(String, String)`` and ``Bool`` types do not need to be written
as part of the closure expression's definition.
Because all of the types can be inferred,
the return arrow (``->``) and the parentheses around the names of the parameters
can also be omitted:

.. testcode:: closureSyntax

   -> reversed = names.sort( { s1, s2 in return s1 > s2 } )
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

It is always possible to infer the parameter types and return type
when passing a closure to a function or method as an inline closure expression.
As a result, you never need to write an inline closure in its fullest form
when the closure is used as a function or method argument.

Nonetheless, you can still make the types explicit if you wish,
and doing so is encouraged if it avoids ambiguity for readers of your code.
In the case of the ``sort(_:)`` method,
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

   -> reversed = names.sort( { s1, s2 in s1 > s2 } )
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Here, the function type of the ``sort(_:)`` method's argument
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

   -> reversed = names.sort( { $0 > $1 } )
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Here, ``$0`` and ``$1`` refer to the closure's first and second ``String`` arguments.

.. _Closures_OperatorFunctions:

Operator Functions
~~~~~~~~~~~~~~~~~~

There's actually an even *shorter* way to write the closure expression above.
Swift's ``String`` type defines its string-specific implementation of
the greater-than operator (``>``)
as a function that has two parameters of type ``String``,
and returns a value of type ``Bool``.
This exactly matches the function type needed by the ``sort(_:)`` method.
Therefore, you can simply pass in the greater-than operator,
and Swift will infer that you want to use its string-specific implementation:

.. testcode:: closureSyntax

   -> reversed = names.sort(>)
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

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

   -> func someFunctionThatTakesAClosure(closure: () -> Void) {
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

The string-sorting closure from the :ref:`Closures_ClosureExpressionSyntax` section above
can be written outside of the ``sort(_:)`` method's parentheses as a trailing closure:

.. testcode:: closureSyntax

   -> reversed = names.sort() { $0 > $1 }
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

If a closure expression is provided as the function or method's only argument
and you provide that expression as a trailing closure,
you do not need to write a pair of parentheses ``()``
after the function or method's name when you call the function:

.. testcode:: closureSyntax

   -> reversed = names.sort { $0 > $1 }
   >> reversed
   << // reversed : [String] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

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
by passing a closure expression to the array's ``map(_:)`` method as a trailing closure:

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
   << // strings : [String] = ["OneSix", "FiveEight", "FiveOneZero"]
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
and is added to the output array by the ``map(_:)`` method.

The use of trailing closure syntax in the example above
neatly encapsulates the closure's functionality
immediately after the function that closure supports,
without needing to wrap the entire closure within
the ``map(_:)`` method's outer parentheses.

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
The nested ``incrementer()`` function captures two values,
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

The ``makeIncrementer(forIncrement:)`` function defines an integer variable called ``runningTotal``,
to store the current running total of the incrementer that will be returned.
This variable is initialized with a value of ``0``.

The ``makeIncrementer(forIncrement:)`` function has a single ``Int`` parameter
with an external name of ``forIncrement``, and a local name of ``amount``.
The argument value passed to this parameter specifies
how much ``runningTotal`` should be incremented by
each time the returned incrementer function is called.

``makeIncrementer`` defines a nested function called ``incrementer``,
which performs the actual incrementing.
This function simply adds ``amount`` to ``runningTotal``, and returns the result.

When considered in isolation,
the nested ``incrementer()`` function might seem unusual:

.. testcode:: closuresPullout

   -> func incrementer() -> Int {
   >>    var runningTotal = 0
   >>    let amount = 1
         runningTotal += amount
         return runningTotal
      }

The ``incrementer()`` function doesn't have any parameters,
and yet it refers to ``runningTotal`` and ``amount`` from within its function body.
It does this by capturing a *reference* to ``runningTotal`` and ``amount``
from the surrounding function and using them within its own function body.
Capturing by reference ensures that ``runningTotal`` and ``amount`` do not disappear
when the call to ``makeIncrementer`` ends,
and also ensures that ``runningTotal`` is available
the next time the ``incrementer`` function is called.

.. note::

   As an optimization,
   Swift may instead capture and store a *copy* of a value
   if that value is not mutated by or outside a closure.

   Swift also handles all memory management involved in disposing of
   variables when they are no longer needed.

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


.. _Closures_Noescape:

Escaping and Nonescaping Closures
---------------------------------

A closure is said to :newTerm:`escape` a function
when the closure is passed as an argument to the function,
but is called after the function returns.
When you declare a function that takes a closure as one of its parameters,
you can write ``@noescape`` before the parameter name
to indicate that the closure is not allowed to escape.
Otherwise, the closure is allowed to escape the function.

.. testcode:: noescape-closure-as-argument

    -> func someFunctionWithNoescapeClosure(@noescape closure: () -> Void) {
           closure()
       }

The ``sort(_:)`` method takes a closure as its parameter
which is used to compare elements.
The parameter is marked ``@noescape``
because it is guaranteed not to be needed after the sorting is completed.

One way that a closure can escape
is by being stored in a variable that is defined outside the function.
For example:

.. testcode:: noescape-closure-as-argument

    -> var closures: [() -> Void] = []
    << // closures : [() -> Void] = []
    -> func someFunctionWithEscapingClosure(closure: () -> Void) {
           closures.append(closure)
       }

The function ``someFunctionWithEscapingClosure(_:)`` takes a closure as its argument
and adds it to an array that's declared outside the function.
If you tried to mark the parameter of this function with ``@noescape``,
you would get a compiler error.

Many functions that start an asynchronous operation
take a closure argument as a completion handler.
The function returns after it starts the operation,
but the closure isn't called until the operation is completed ---
the closure needs to escape, to be called later.

Marking a closure with ``@noescape``
lets the compiler make more aggressive optimizations
because it knows more information about the closure's lifespan.
It also lets you refer to ``self`` implicitly within the closure.

.. testcode:: noescape-closure-as-argument

    -> class SomeClass {
           var x = 10
           func doSomething() {
               someFunctionWithEscapingClosure { self.x = 100 }
               someFunctionWithNoescapeClosure { x = 200 }
           }
       }
    ---
    -> let instance = SomeClass()
    << // instance : SomeClass = REPL.SomeClass
    -> instance.doSomething()
    -> print(instance.x)
    <- 200
    ---
    -> closures.first?()
    << // r0 : Void? = Optional(())
    -> print(instance.x)
    <- 100


.. _Closures_Autoclosures:

Autoclosures
------------

An :newTerm:`autoclosure` is a closure that is automatically created 
to wrap an expression that's being passed as an argument to a function.
It doesn't take any arguments,
and when it's called, it returns the value
of the expression that's wrapped inside of it.
This syntactic convenience lets you omit braces around a function's parameter
by writing a normal expression instead of an explicit closure.

It's common to *call* functions that take autoclosures,
but it's not common to *implement* that kind of function.
For example,
the ``assert(condition:message:file:line:)`` function
takes an autoclosure for its ``condition`` and ``message`` parameters;
its ``condition`` parameter is evaluated only in debug builds
and its ``message`` parameter is evaluated only if ``condition`` is ``false``.

An autoclosure lets you delay evaluation,
because the code inside isn't run until you call the closure.
Delaying evaluation is useful for code
that has side effects or is computationally expensive,
because it lets you control when that code is evaluated.
The code below shows how a closure delays evaluation.

.. testcode:: autoclosures

    -> var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
    << // customersInLine : [String] = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
    -> print(customersInLine.count)
    <- 5
    ---
    -> let customerProvider = { customersInLine.removeAtIndex(0) }
    << // customerProvider : () -> String = (Function)
    -> print(customersInLine.count)
    <- 5
    ---
    -> print("Now serving \(customerProvider())!")
    <- Now serving Chris!
    -> print(customersInLine.count)
    <- 4

.. Using removeAtIndex(_:) instead of popFirst() because the latter only works
   with ArraySlice, not with Array:
       customersInLine[0..<3].popLast()     // fine
       customersInLine[0..<3].popFirst()    // fine
       customersInLine.popLast()            // fine
       customersInLine.popFirst()           // FAIL
   It also returns an optional, which complicates the listing.

.. TODO: It may be worth describing the differences between ``lazy`` and autoclousures.

Even though the first element of the ``customersInLine`` array is removed
by the code inside the closure,
the array element isn't removed until the closure is actually called.
If the closure is never called,
the expression inside the closure is never evaluated,
which means the array element is never removed.
Note that the type of ``customerProvider`` is not ``String``
but ``() -> String`` ---
a function with no parameters that returns a string.

You get the same behavior of delayed evaluation
when you pass a closure as an argument to a function.

.. testcode:: autoclosures-function

    >> var customersInLine = ["Alex", "Ewa", "Barry", "Daniella"]
    << // customersInLine : [String] = ["Alex", "Ewa", "Barry", "Daniella"]
    /> customersInLine is \(customersInLine)
    </ customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
    -> func serveCustomer(customerProvider: () -> String) {
           print("Now serving \(customerProvider())!")
       }
    -> serveCustomer( { customersInLine.removeAtIndex(0) } )
    <- Now serving Alex!

The ``serveCustomer(_:)`` function in the listing above
takes an explicit closure that returns a customer's name.
The version of ``serveCustomer(_:)`` below
performs the same operation but, instead of taking an explicit closure,
it takes an autoclosure
by marking its parameter with the ``@autoclosure`` attribute.
Now you can call the function
as if it took a ``String`` argument instead of a closure.
The argument is automatically converted to a closure,
because the ``customerProvider`` parameter is marked
with the ``@autoclosure`` attribute.

.. testcode:: autoclosures-function-with-autoclosure

    >> var customersInLine = ["Ewa", "Barry", "Daniella"]
    << // customersInLine : [String] = ["Ewa", "Barry", "Daniella"]
    /> customersInLine is \(customersInLine)
    </ customersInLine is ["Ewa", "Barry", "Daniella"]
    -> func serveCustomer(@autoclosure customerProvider: () -> String) {
           print("Now serving \(customerProvider())!")
       }
    -> serveCustomer(customersInLine.removeAtIndex(0))
    <- Now serving Ewa!

.. note::

   Overusing autoclosures can make your code hard to understand.
   The context and function name should make it clear
   that evaluation is being deferred.

The ``@autoclosure`` attribute implies the ``@noescape`` attribute,
which indicates that the closure is used only within the function.
That is, the closure isn't allowed to be stored in a way
that would let it "escape" the scope of the function
and be executed after the function returns.
If you want an autoclosure that is allowed to escape,
use the ``@autoclosure(escaping)`` form of the attribute.

.. testcode:: autoclosures-function-with-escape

    >> var customersInLine = ["Barry", "Daniella"]
    << // customersInLine : [String] = ["Barry", "Daniella"]
    /> customersInLine is \(customersInLine)
    </ customersInLine is ["Barry", "Daniella"]
    -> var customerProviders: [() -> String] = []
    << // customerProviders : [() -> String] = []
    -> func collectCustomerProviders(@autoclosure(escaping) customerProvider: () -> String) {
           customerProviders.append(customerProvider)
       }
    -> collectCustomerProviders(customersInLine.removeAtIndex(0))
    -> collectCustomerProviders(customersInLine.removeAtIndex(0))
    ---
    -> print("Collected \(customerProviders.count) closures.")
    <- Collected 2 closures.
    -> for customerProvider in customerProviders {
           print("Now serving \(customerProvider())!")
       }
    <- Now serving Barry!
    <- Now serving Daniella!

In the code above,
instead of calling the closure passed to it
as its ``customer`` argument,
the ``collectCustomerProviders(_:)`` function appends the closure to the ``customerProviders`` array.
The array is declared outside the scope of the function,
which means the closures in the array can be executed after the function returns.
As a result,
the value of the ``customer`` argument must be allowed to escape the function's scope.

For more information about the ``@autoclosure`` and ``@noescape`` attributes,
see :ref:`Attributes_DeclarationAttributes`.
