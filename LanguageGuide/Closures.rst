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

.. testcode:: closures

    --> let strings = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]
    <<< // strings : String[] = ["Alex", "Barry", "Chris", "Daniella", "Ewa"]

.. testcode:: closures

    --> func sort<T>(var array: T[], pred: (T, T) -> Bool) -> T[] {
        insertionSort(&array, 0...array.count, pred)
        return array
    }

.. testcode:: closures

    --> var reverseSorted = sort(strings, { 
            (lhs: String, rhs: String) -> Bool 
          in 
            return lhs > rhs } )
    <<< // reverseSorted : String[] = ["Ewa", "Daniella", "Chris", "Barry", "Alex"]

.. testcode:: closures

    --> var reverseSorted = sort(strings, { (lhs, rhs) in return lhs > rhs } )

.. testcode:: closures

    --> var reverseSorted = sort(strings, { (lhs, rhs) in lhs > rhs } )

.. testcode:: closures

    --> var reverseSorted = sort(strings, { $0 > $1 } )

.. testcode:: closures

    --> var reverseSorted = sort(strings) { $0 > $1 } // trailing closure

.. testcode:: closures

    --> var reverseSorted = sort(strings, > )



Function Parameters Can Be Closures
-----------------------------------

func reduce(values : Int[], initialValue : Int, 
 fn : (Int, Int) -> Int) -> Int {
var result = initialValue
for val in values {
result = fn(result, val)
}
return result
}

func add(x : Int, y : Int) -> Int { return x + y }
var myResult = reduce([1, 2, 3, 4, 5], 0, add)
// myResult : Int = 15

var myResult = reduce([1, 2, 3, 4, 5], 0, +)




.. capturing / closing over variables (and what this means in practice)
.. no need for __block; discuss memory safety
.. functions are just a really special non-capturing version of closures
.. closures can be named
.. you have to write "self." for property references in an explicit closure expression,
   since "self" will be captured, not the property (as per rdar://16193162)
   we don't do this for autoclosures, however -
   see the commits comments from r14676 for the reasons why

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
