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

.. write-me::

.. named functions can be nested inside other named functions
.. closures can have an variadic parameter
.. closure parameters can be inout
.. types can be inferred

.. we've "claimed" {} for functions, closures and block statements
.. @auto-closure attribute seems to automatically make a closure over the thing assigned to it

:newTerm:`Closures` are a way to write functions within other functions,
and to :newTerm:`capture` and refer to any named values that are available within the outer function.

Swift's closures are similar to :newTerm:`lambdas` in other programming languages,
and :newTerm:`blocks` in C-like languages.
Closures have a clean, clear syntax,
with optimizations for writing brief, clutter-free closures in common scenarios.
These optimizations include
inference of parameter types,
implicit returning of values from single-expression closures,
short-hand parameter names,
and a trailing closure syntax.
All of these optimizations are described in detail below.

Closure Syntax
--------------

.. testcode:: closures

   -> let strings = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]
   << // strings : String[] = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]

Swift's standard library provides a ``sort()`` function,
which takes an array of strings, together with a sorting closure,
and uses the closure to sort the array.

When sorting values of type ``String``,
``sort()`` expects to receive a closure that has two ``String`` parameters,
and returns a ``Bool`` value.
The closure it expects is like a function with the following form:

::

   func sortingFunction(lhs: String, rhs: String) -> Bool {
      // 
   }

.. testcode:: closures

   -> func backwards(lhs: String, rhs: String) -> Bool {
         return lhs > rhs
      }
   -> var reverseSorted = sort(strings, backwards)
   << // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

.. testcode:: closures

   -> reverseSorted = sort(strings, { (lhs: String, rhs: String) -> Bool in 
         return lhs > rhs
      })

.. testcode:: closures

   -> reverseSorted = sort(strings, { (lhs, rhs) in return lhs > rhs } )

.. testcode:: closures

   -> reverseSorted = sort(strings, { (lhs, rhs) in lhs > rhs } )

.. testcode:: closures

   -> reverseSorted = sort(strings, { $0 > $1 } )

.. testcode:: closures

   -> reverseSorted = sort(strings) { $0 > $1 } // trailing closure

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
