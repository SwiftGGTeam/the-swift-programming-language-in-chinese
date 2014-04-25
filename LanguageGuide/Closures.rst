.. docnote:: Subjects to be covered in this section

   * Closures
   * Trailing closures
   * Nested closures
   * Capturing values
   * Different closure expression forms
   * Anonymous closure arguments
   * Attributes (infix, resilience, inout, auto_closure, noreturn, weak)
   * Typedefs for closure signatures to aid readability

Closures
========

.. closures can have a variadic parameter
.. closure parameters can be inout
.. types can be inferred

.. we've "claimed" {} for functions, closures and block statements
.. @auto-closure attribute seems to automatically make a closure over the thing assigned to it

.. are methods "just" named closures that capture state from the instance they are defined on?

Functions, as introduced in the previous chapter,
are actually a special case of a more general feature known as :newTerm:`closures`.
Closures are a way to write self-contained blocks of functionality
that can be passed around and used in your code.
Swift's closures are similar to lambdas in other programming languages,
and blocks in C-like languages.

Closures have two extra abilities
in addition to those described in :doc:`Functions`:

* they can capture and modify constants and variables
  from the context in which they are defined
* they can be written without a function name
  (although you can name them if you wish)

In essence, functions are just simple closures that have a name,
and don't capture anything.
Although functions are really just specialized closures,
this chapter will continue to refer to them as “functions” for simplicity.

Swift handles all of the memory management of capturing for you.
The concept and meaning of “capturing” is explained in detail below.

Swift's closures have a clean, clear syntax,
with optimizations for writing brief, clutter-free closures in common scenarios.
These optimizations include:

* inferring parameter and return value types from context
* implicit returns from single-expression closures
* short-hand argument names
* trailing closure syntax

All of these optimizations are described in detail below.

.. _Closures_CapturingValues:

Capturing Values
----------------

A closure can :newTerm:`capture` constants and variables
from the surrounding context in which it is defined.
The closure is then able to refer to and modify
the values of those constants and variables from within its body,
even if the original scope that defined the constants and variables no longer exists.

The simplest form of a closure in Swift is a nested function,
written within the body of another function.
A nested function can capture any of its outer function's arguments,
and can also capture any constants and variables defined within the outer function.

Here's an example of a function called ``makeIncrementor``,
which creates functions that increment and return a stored value each time they are called:

.. testcode:: closures

   -> func makeIncrementor(amount: Int) -> () -> Int {
         var runningTotal = 0
         func incrementor() -> Int {
            runningTotal += amount
            return runningTotal
         }
         return incrementor
      }

The ``makeIncrementor`` function returns *another* function,
as described in :ref:`Functions_FunctionTypesAsReturnTypes`.
The functions it returns are of type ``() -> Int``.
This means that they have no parameters,
and return an ``Int`` value each time they are called.

The ``makeIncrementor`` function defines an integer variable called ``runningTotal``,
which stores the current running total of the incrementor it returns.
This variable is initialized with a value of ``0``.
``makeIncrementor`` also has a single ``Int`` parameter called ``amount``,
which defines the amount that the returned function will increment ``runningTotal`` by
each time it is called.

Next, ``makeIncrementor`` defines a nested function called ``incrementor``,
which performs the actual incrementing.
This function simply adds ``amount`` to ``runningTotal``, and returns the result.

When considered in isolation,
the nested ``incrementor`` function might seem unusual:

::

      func incrementor() -> Int {
         runningTotal += amount
         return runningTotal
      }

The ``incrementor`` function doesn't have any parameters,
and yet it refers to ``runningTotal`` and ``amount`` from within its function body.
It does this by capturing the *existing* values of ``runningTotal`` and ``amount``
from its surrounding function,
and using them within its own function body.

Because it does not modify ``amount``,
``incrementor`` actually captures and stores a *copy* of the value stored in ``amount``.
This value is stored along with the new ``incrementor`` function.

However, because it modifies the ``runningTotal`` variable each time it is called,
``incrementor`` captures a *reference* to the current ``runningTotal`` variable,
and not just a copy of its initial value.
This makes sure that ``runningTotal`` does not disappear
when the call to ``makeIncrementor`` ends,
and ensures that it will continue to be available
the next time that the returned incrementor function is called.

.. note::

   Swift handles all of the work of deciding what should be captured by reference
   and what should be copied by value.
   There is no need to annotate ``amount`` or ``runningTotal``
   to say that they can be used within the ``incrementor`` closure.
   Swift also handles all of the memory management involved in disposing of ``runningTotal``
   when it is no longer needed by the returned incrementor function.

Here's an example of ``makeIncrementor`` in action:

.. testcode:: closures

   -> let incrementByTen = makeIncrementor(10)
   << // incrementByTen : () -> Int = <unprintable value>

This example sets a constant called ``incrementByTen`` 
to refer to an incrementor function that adds ``10`` to its running total
each time it is called.
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

If you create another incrementor,
it will have its own stored reference to a new ``runningTotal`` variable,
and will not affect the original incrementor:

.. testcode:: closures

   -> let incrementBySeven = makeIncrementor(7)
   << // incrementBySeven : () -> Int = <unprintable value>
   -> incrementBySeven()
   << // r3 : Int = 7
   /> returns a value of \(r3)
   </ returns a value of 7
   -> incrementByTen()
   << // r4 : Int = 40
   /> returns a value of \(r4)
   </ returns a value of 40

.. _Closures_ClosuresAreReferenceTypes:

Closures are Reference Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the example above,
``incrementBySeven`` and ``incrementByTen`` are constants,
but the closures they refer to are still able to increment
the ``runningTotal`` variables that they have captured.
This is because functions and closures are :newTerm:`reference types`.
As such, they are passed around by reference, not by value.

Whenever you assign a function or a closure to a constant or a variable,
you are actually setting that constant or variable to be
a *reference* to the function or closure.
In the example above,
it is the choice of closure that ``incrementByTen`` *refers to* that is constant,
and not the contents of the closure itself.

This also means that if you assign the closure to another constant or variable,
it will refer to the same single closure:

.. testcode:: closures

   -> let alsoIncrementByTen = incrementByTen
   << // alsoIncrementByTen : () -> Int = <unprintable value>
   -> alsoIncrementByTen()
   << // r5 : Int = 50
   /> returns a value of \(r5)
   </ returns a value of 50

The subject of value types and reference types is covered in more detail
in :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

.. _Closures_ClosureExpressions:

Closure Expressions
-------------------

Nested functions are a convenient way to name and define self-contained blocks of code
as part of a larger function.
However, it can sometimes be useful to write shorter versions of function-like constructs, 
without the need for a full declaration and name.
This is particularly true when working with functions that take other functions
as one or more of their arguments.

:newTerm:`Closure expressions` are a way to write inline closures in a brief, focused syntax.
This section describes how closure expressions can be used,
and introduces several syntax optimizations you can use
to write closures in their simplest form without loss of clarity or intent.
To illustrate the options for closure expression syntax,
this section will refine a single example over several iterations,
each showing a more succint way to express the same functionality.

Swift's Standard Library provides a function called ``sort``,
which sorts an array of values of some known type,
based on the output of a sorting closure that you provide.
Once it has completed the sorting process,
the ``sort`` function returns a new array of the same type and size as the old one,
with its elements in the correct sorted order.

These examples use the ``sort`` function to sort an array of ``String`` values
in reverse alphabetical order.
Here's the initial array to be sorted:

.. testcode:: closureSyntax

   -> let array = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
   << // array : String[] = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

The ``sort`` function takes two arguments:

* An array of values of some known type.
* A closure that takes two arguments of the same type as the array's contents,
  and returns a ``Bool`` value to say whether the first value should appear
  before or after the second value once sorted.
  The sorting closure needs to return ``true``
  if the first value should appear *before* the second value,
  and ``false`` otherwise.

This example is sorting an array of ``String`` values,
and so the sorting closure needs to be a function of type ``(String, String) -> Bool``.

One way to provide the sorting closure would be to write a normal function of the correct type,
and to pass it in as the ``sort`` function's second parameter:

.. testcode:: closureSyntax

   -> func backwards(s1: String, s2: String) -> Bool {
         return s1 > s2
      }
   -> var reversed = sort(array, backwards)
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
   // reversed is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

If the first string (``s1``) is greater than the second string (``s2``),
the ``backwards`` function will return ``true``,
indicating that ``s1`` should appear before ``s2`` in the sorted array.
For characters in strings,
“greater than” means “appears later in the alphabet than”.
This means that the letter ``"B"`` is “greater than” the letter ``"A"``,
and the string ``"Tom"`` is greater than the string ``"Tim"``.
This gives a reverse alphabetical sort,
with ``"Brian"`` being placed before ``"Anna"``, and so on.

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
Variadic parameters can also be used,
as long as the variadic parameter is named,
and is the last parameter in the parameter list.
Tuples can also be used as parameter types and return types.

.. TODO: the note about default values is tracked by rdar://16535452.
   Remove this note if and when that Radar is fixed.

.. TODO: the note about variadic parameters requiring a name is tracked by rdar://16535434.
   Remove this note if and when that Radar is fixed.

This syntax can be used to write an inline version of the ``backwards`` function:

.. testcode:: closureSyntax

   -> reversed = sort(array, { (s1: String, s2: String) -> Bool in 
         return s1 > s2
      })
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Note that the declaration of parameters and return type for this inline closure
is identical to the declaration from the ``backwards`` function.
In both cases, it is written as ``(s1: String, s2: String) -> Bool``.
However, for the inline closure expression,
the parameters and return type are written *inside* the curly braces,
not outside of them.

Note also that the start of the closure's body is introduced by the ``in`` keyword.
This keyword indicates that
the definition of the closure's parameters and return type has finished,
and the body of the closure is about to begin.

Because the body of the closure is so short,
it can even be written on a single line:

.. testcode:: closureSyntax

   -> reversed = sort(array, { (s1: String, s2: String) -> Bool in return s1 > s2 } )
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

This illustrates that the overall call to the ``sort`` function has remained the same.
A pair of parentheses still wrap the entire set of arguments for the function –
it's just that one of those arguments happens to be an inline closure.

.. _Closures_InferringTypeFromContext:

Inferring Type From Context
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because the sorting closure is passed as an argument to a function,
it is possible to infer the types of its parameters,
and the type of the value it returns,
from the type of the ``sort`` function's second parameter.
This parameter is expecting a function of type ``(String, String) -> Bool``.
This means that the ``String`` and ``Bool`` types do not need to be written
as part of the closure expression.
Because the return type is inferred,
the return arrow (``->``) can also be omitted:

.. testcode:: closureSyntax

   -> reversed = sort(array, { (s1, s2) in return s1 > s2 } )
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

It is always possible to infer parameter types and return type
when passing a closure to a function as an inline closure expression.
As a result, it is rare to need to write an inline closure in its fullest form.

Nonetheless, you are free to make the types explicit if you wish,
and doing so is encouraged if it avoids ambiguity for readers of your code.
In the case of the ``sort`` function,
the purpose of the closure is clear from the fact that sorting is taking place,
and it is safe for a reader to assume that
the closure is likely to be working with ``String`` values,
because it is assisting with the sorting of an array of strings.

.. _Closures_ImplicitReturnsFromSingleExpressionClosures:

Implicit Returns From Single-Expression Closures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Single-expression closures can implicitly return the result of their single expression
by omitting the ``return`` keyword from their declaration:

.. testcode:: closureSyntax

   -> reversed = sort(array, { (s1, s2) in s1 > s2 } )
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Here, the function type of the ``sort`` function's second argument
makes it clear that a ``Bool`` value must be returned by the closure.
Because the closure's body contains a single expression (``s1 > s2``)
that returns a ``Bool`` value,
there is no ambiguity, and the ``return`` keyword can be omitted.

.. _Closures_ShortHandArgumentNames:

Short-Hand Argument Names
~~~~~~~~~~~~~~~~~~~~~~~~~

Swift automatically provides short-hand argument names to inline closures,
which can be used to refer to the values of the closure's arguments
by the names ``$0``, ``$1``, ``$2``, and so on.

If you use these short-hand argument names within your closure expression,
you can omit the closure's argument list from its definition,
and the number and type of the short-hand argument names
will be inferred from the expected function type.
The ``in`` keyword can also be omitted,
because the closure expression is made up entirely of its body:

.. testcode:: closureSyntax

   -> reversed = sort(array, { $0 > $1 } )
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Here, ``$0`` and ``$1`` are used as
short-hand ways to refer to the closure's first and second ``String`` arguments.

.. _Closures_OperatorFunctions:

Operator Functions
~~~~~~~~~~~~~~~~~~

There's actually an even *shorter* way to write the closure expression above.
Swift's ``String`` type defines its string-specific implementation of
the greater-than operator (``>``)
as a function that has two parameters of type ``String``,
and returns a value of type ``Bool``.
This exactly matches the function type needed for the ``sort`` function's
second parameter.
As a result, you can simply pass in the greater-than operator,
and Swift will infer that you want to use its string-specific implementation:

.. testcode:: closureSyntax

   -> reversed = sort(array, >)
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Operator functions are described in more detail in :ref:`AdvancedOperators_OperatorFunctions`.

.. _Closures_TrailingClosures:

Trailing Closures
-----------------

If you need to pass a closure expression to a function as one of the function's arguments,
and the closure expression is long,
it can sometimes be clearer to write it as a :newTerm:`trailing closure` instead.
A trailing closure is a closure expression
that is written outside of (and *after*) the parentheses of the function call it supports.

Multiple consecutive trailing closures can be written
for functions with multiple function type arguments.
The only requirement is that these trailing closures must always be
the final arguments provided for the function call.

Because the final argument to the ``sort`` function is a closure expression,
the string-sorting closure from above can be written
outside of the ``sort`` function's parentheses as a trailing closure:

.. testcode:: closureSyntax

   -> reversed = sort(array) { $0 > $1 }
   >> reversed
   << // reversed : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

As mentioned above,
trailing closures are most useful when the closure is sufficiently long that
it is not possible to write it inline on a single line.
As an example, Swift's ``Array`` type has a ``map`` function
which takes a closure expression as its single argument.
The closure is called once for each item in the array,
and returns an alternative mapped value (possibly of some other type) for that item.
The nature of the mapping, and the type of the returned value,
is left up to the closure to specify.

After applying the provided closure to each array element,
the ``map`` function returns a new array containing all of the new mapped values,
in the same order as their corresponding values in the original array.

Here's how the ``map`` function can be used with a trailing closure
to convert an array of ``Int`` values into an array of ``String`` values.
The array ``[16, 58, 510]`` will be used to create the new array 
``["OneSix", "FiveEight", "FiveOneZero"]``:

.. testcode:: arrayMap

   -> let digitNames = [
         0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
         5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
      ]
   << // digitNames : Dictionary<Int, String> = Dictionary<Int, String>(1.33333333333333, 10, <DictionaryBufferOwner<Int, String> instance>)
   -> let numbers = [16, 58, 510]
   << // numbers : Int[] = [16, 58, 510]

The code above creates a dictionary of mappings between
the integer digits and English-language versions of their names.
It also defines an array of integers, ready to be converted into strings.

The ``numbers`` array can now be used to create an array of ``String`` values,
by passing a closure expression to the array's ``map`` function as a trailing closure:

.. testcode:: arrayMap

   -> let strings = numbers.map() {
            (var number) -> String in
         var output = ""
         while number > 0 {
            output = digitNames[number % 10] + output
            number /= 10
         }
         return output
      }
   << // strings : Array<String> = ["OneSix", "FiveEight", "FiveOneZero"]
   // strings is inferred to be of type Array<String>
   /> its value is [\"\(strings[0])\", \"\(strings[1])\", \"\(strings[2])\"]
   </ its value is ["OneSix", "FiveEight", "FiveOneZero"]

The ``map`` function calls the closure expression once for each item in the array.
The closure expression does not need to specify the type of its input parameter, ``number``,
because the type can be inferred from the values in the array to be mapped.
However, it chooses to define the closure's ``number`` parameter as a *variable parameter*,
as described in :ref:`Functions_ConstantAndVariableParameters`,
so that the parameter's value can be modified within the closure body,
rather than declaring a new local variable and assigning the passed ``number`` value to it.
The closure expression also specifies a return type of ``String``,
to indicate the type that will be stored in the mapped output array.

The closure expression builds a string called ``output`` each time it is called.
It calculates the last digit of ``number`` by using the remainder operator (``number % 10``),
and uses this digit to look up an appropriate string in the ``digitNames`` dictionary.
The appropriate string is added to the *front* of ``output``,
effectively building a string version of the number in reverse.
(The expression ``number % 10`` gives a value of
``6`` for ``16``, ``8`` for ``58``, and ``0`` for ``510``.)

The ``number`` variable is then divided by ``10``.
Because it is an integer, it is rounded down during the division,
so ``16`` becomes ``1``, ``58`` becomes ``5``, and ``510`` becomes ``51``.

The process is repeated until ``number /= 10`` is equal to ``0``,
at which point the ``output`` string is returned by the closure,
and is added to the output array by the ``map`` function.

The use of a trailing closure here means that
the closure's functionality is neatly encapsulated,
and is written immediately after the function it supports,
without needing to wrap the entire closure within
the ``map`` function's outer parentheses.

.. TODO: you have to write "self." for property references in an explicit closure expression,
   since "self" will be captured, not the property (as per rdar://16193162)
   we don't do this for autoclosures, however -
   see the commits comments from r14676 for the reasons why

.. TODO: <rdar://problem/16193162> Require specifying self for locations in code
   where strong reference cycles are likely
   This requires that property references have an explicit "self." qualifier
   when in an explicit closure expression, since self will be captured, not the property.
   We don't do the same for autoclosures.
   The logic here is that autoclosures can't practically be used in capturing situations anyway,
   since that would be extremely surprising to clients.
   Further, forcing a syntactic requirement in an autoclosure context
   would defeat the whole point of autoclosures: make them implicit.

.. TODO: To avoid reference cycles when a property closure references self or a property of self,
   you should use the same workaround as in Obj-C –
   that is, to declare a @weak (or @unowned) local variable, and capture that instead.
   There are proposals for a better solution in /swift/docs/weak.rst,
   but they are yet to be implemented.
   The Radar for their implementation is rdar://15046325.

.. _Closures_AutoClosures:

Auto-Closures
-------------

.. TODO: var closure1: @auto_closure () -> Int = 4  // Function producing 4 whenever it is called.

.. TODO: from Assert.swift in stdlib/core:
   @transparent
   func assert(
     condition: @auto_closure () -> Bool, message: StaticString = StaticString()
   ) {
   }
.. TODO: note that an @auto_closure's argument type must always be ()
   see also test/expr/closure/closures.swift

.. TODO: The auto_closure attribute modifies a function type,
   changing the behavior of any assignment into (or initialization of) a value with the function type.
   Instead of requiring that the rvalue and lvalue have the same function type,
   an "auto closing" function type requires its initializer expression to have
   the same type as the function's result type,
   and it implicitly binds a closure over this expression.
   This is typically useful for function arguments that want to
   capture computation that can be run lazily.
   auto_closure is only valid in a type of a syntactic function type
   that is defined to take a syntactic empty tuple.

.. write-me::

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
