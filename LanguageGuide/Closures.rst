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

* inference of parameter types
* implicit return values from single-expression closures
* short-hand parameter names
* trailing closure syntax

All of these optimizations are described in detail below.

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
they will both refer to the same single closure:

.. testcode:: closures

   -> let alsoIncrementByTen = incrementByTen
   << // alsoIncrementByTen : () -> Int = <unprintable value>
   -> alsoIncrementByTen()
   << // r5 : Int = 50
   /> returns a value of \(r5)
   </ returns a value of 50

Closure Expressions
-------------------

.. write-me::

.. Swift's standard library provides a ``sort`` function,
   which takes an array of strings, together with a sorting closure,
   and uses the closure to sort the array.

.. When sorting values of type ``String``,
   ``sort`` expects to receive a closure that has two ``String`` parameters,
   and returns a ``Bool`` value.
   The closure it expects is like a function with the following form:

.. note::

   This section has yet to be written.
   I've included some syntax examples in the meantime.

Here are some strings to be sorted:

.. testcode:: closureSyntax

   -> let strings = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]
   << // strings : String[] = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]

The Standard Library's ``sort`` function takes an ``Array<T>``
and a sorting closure of type ``(T, T) -> Bool``.
It can be called by passing in a named function as the sorting closure:

.. testcode:: closureSyntax

   -> func backwards(lhs: String, rhs: String) -> Bool {
         return lhs > rhs
      }
   -> var reverseSorted = sort(strings, backwards)
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Alternatively, you can pass in an unnamed closure expression:

.. testcode:: closureSyntax

   -> reverseSorted = sort(strings, { (lhs: String, rhs: String) -> Bool in 
         return lhs > rhs
      })
   >> reverseSorted
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

The types of the parameters and return type can be inferred from context:

.. testcode:: closureSyntax

   -> reverseSorted = sort(strings, { (lhs, rhs) in return lhs > rhs } )
   >> reverseSorted
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Single-expression closures implicitly return their expression value
if you leave out the ``return`` keyword:

.. testcode:: closureSyntax

   -> reverseSorted = sort(strings, { (lhs, rhs) in lhs > rhs } )
   >> reverseSorted
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

Parameter names can be left out if you use shorthand ``$n`` parameter references instead:

.. testcode:: closureSyntax

   -> reverseSorted = sort(strings, { $0 > $1 } )
   >> reverseSorted
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

The last closure in a function can be written as a :newTerm:`trailing closure`,
with its braces outside of the function parentheses:

.. testcode:: closureSyntax

   -> reverseSorted = sort(strings) { $0 > $1 } // trailing closure
   >> reverseSorted
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

If you have an operator function that satisfies the type-check,
it can be passed in by name,
and the correct overloaded version to use will be inferred:

.. testcode:: closureSyntax

   -> reverseSorted = sort(strings, > )
   >> reverseSorted
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

.. misc notes…

.. functions and closures are reference types

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
