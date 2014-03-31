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

.. named functions can be nested inside other named functions
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

In addition to everything mentioned in the Functions chapter,
closures have two extra abilities:

* they can be written without a function name
  (although you can name them if you wish)
* they can :newTerm:`capture` and modify constants and variables
  from the context in which they are defined

Swift handles all of the memory management of capturing for you.
(The concept and meaning of “capturing state” is explained in detail below.)

The relationship between functions and closures is an important one.
Another way to think about it is
“functions are just simple closures that have a name, and don't capture anything.”
(Although functions are really just specialized closures,
this chapter will still refer to them as “functions” for simplicity.)

Swift's closures are similar to :newTerm:`lambdas` in other programming languages,
and :newTerm:`blocks` in C-like languages.
Swift's closures have a clean, clear syntax,
with optimizations for writing brief, clutter-free closures in common scenarios.
These optimizations include:

* inference of parameter types
* implicit return values from single-expression closures
* short-hand parameter names
* trailing closure syntax

All of these optimizations are described in detail below.

Function Types
--------------

Every closure – including simple closures such as functions –
has a specific :newTerm:`function type`.
This is made up of all of the parameter types for the function,
together with its return type.

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
called ``addTwoInts()`` and ``multiplyTwoInts()``.
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

Function types can be used just like any other types in Swift.
For example you can define a constant or variable to be of a function type,
and can assign an appropriate function to that variable:

.. testcode:: functionTypes

   -> var mathFunction: (Int, Int) -> Int = addTwoInts
   << // mathFunction : (Int, Int) -> Int = <unprintable value>

This can be read as:

“Define a variable called ``mathFunction``,
which has a type of ‘a function that takes two ``Int`` values,
and returns an ``Int`` value.’
Set this new variable to refer to the function called ``addTwoInts``.”

The ``addTwoInts()`` function has the same type as the ``mathFunction`` variable,
and so this assignment is allowed by Swift's type-checker.

You can now call the assigned function by using the constant or variable's name:

.. testcode:: functionTypes

   -> println("Two plus three is \(mathFunction(2, 3))")
   <- Two plus three is 5

A different function with the same matching type can be assigned to the same variable,
in the same way as for non-function types:

.. testcode:: functionTypes

   -> mathFunction = multiplyTwoInts
   -> println("Two times three is \(mathFunction(2, 3))")
   <- Two times three is 6

You can leave it up to Swift to infer the appropriate function type to use
by assigning a function when you define the constant or variable:

.. testcode:: functionTypes

   -> let anotherMathFunction = addTwoInts
   // anotherMathFunction is inferred to be of type (Int, Int) -> Int

Closure Syntax
--------------

.. write-me::

.. Swift's standard library provides a ``sort()`` function,
   which takes an array of strings, together with a sorting closure,
   and uses the closure to sort the array.

.. When sorting values of type ``String``,
   ``sort()`` expects to receive a closure that has two ``String`` parameters,
   and returns a ``Bool`` value.
   The closure it expects is like a function with the following form:

.. note::

   This section has yet to be written.
   I've included some syntax examples in the meantime.

Here are some strings to be sorted:

.. testcode:: closures

   -> let strings = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]
   << // strings : String[] = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]

The Standard Library's ``sort()`` function takes an ``Array<T>``
and a sorting closure of type ``(T, T) -> Bool``.
It can be called by passing in a named function as the sorting closure:

.. testcode:: closures

   -> func backwards(lhs: String, rhs: String) -> Bool {
         return lhs > rhs
      }
   -> var reverseSorted = sort(strings, backwards)
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Alternatively, you can pass in an unnamed closure expression:

.. testcode:: closures

   -> reverseSorted = sort(strings, { (lhs: String, rhs: String) -> Bool in 
         return lhs > rhs
      })

The types of the parameters and return type can be inferred from context:

.. testcode:: closures

   -> reverseSorted = sort(strings, { (lhs, rhs) in return lhs > rhs } )

Single-expression closures implicitly return their expression value
if you leave out the ``return`` keyword:

.. testcode:: closures

   -> reverseSorted = sort(strings, { (lhs, rhs) in lhs > rhs } )

Parameter names can be left out if you use shorthand ``$n`` parameter references instead:

.. testcode:: closures

   -> reverseSorted = sort(strings, { $0 > $1 } )

The last closure in a function can be written as a :newTerm:`trailing closure`,
with its braces outside of the function parentheses:

.. testcode:: closures

   -> reverseSorted = sort(strings) { $0 > $1 } // trailing closure

If you have an operator function that satisfies the type-check,
it can be passed in by name,
and the correct overloaded version to use will be inferred:

.. testcode:: closures

   -> reverseSorted = sort(strings, > )


.. capturing / closing over variables (and what this means in practice)
.. no need for __block; discuss memory safety
.. functions are just a really special non-capturing version of closures
.. closures can be named
.. you have to write "self." for property references in an explicit closure expression,
   since "self" will be captured, not the property (as per rdar://16193162)
   we don't do this for autoclosures, however -
   see the commits comments from r14676 for the reasons why
.. can use 'var' and 'let' for closure parameters
.. var closure3a : ()->()->(Int,Int) = {{ (4, 2) }} // multi-level closing.

.. auto-closures can also be created:
.. var closure1 : @auto_closure () -> Int = 4  // Function producing 4 whenever it is called.
.. from Assert.swift in stdlib/core:
   @transparent
   func assert(
     condition: @auto_closure () -> Bool, message: StaticString = StaticString()
   ) {
   }
.. note that an @auto_closure's argument type must always be ()
.. see also test/expr/closure/closures.swift

.. The auto_closure attribute modifies a function type,
   changing the behavior of any assignment into (or initialization of) a value with the function type.
   Instead of requiring that the rvalue and lvalue have the same function type,
   an "auto closing" function type requires its initializer expression to have
   the same type as the function's result type,
   and it implicitly binds a closure over this expression.
   This is typically useful for function arguments that want to
   capture computation that can be run lazily.
   auto_closure is only valid in a type of a syntactic function type
   that is defined to take a syntactic empty tuple.

.. <rdar://problem/16193162> Require specifying self for locations in code
   where strong reference cycles are likely
   This requires that property references have an explicit "self." qualifier
   when in an explicit closure expression, since self will be captured, not the property.
   We don't do the same for autoclosures.
   The logic here is that autoclosures can't practically be used in capturing situations anyway,
   since that would be extremely surprising to clients.
   Further, forcing a syntactic requirement in an autoclosure context
   would defeat the whole point of autoclosures: make them implicit.

.. To avoid reference cycles when a property closure references self or a property of self,
   you should use the same workaround as in Obj-C –
   that is, to declare a @weak (or @unowned) local variable, and capture that instead.
   There are proposals for a better solution in /swift/docs/weak.rst,
   but they are yet to be implemented.
   The Radar for their implementation is rdar://15046325.

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
