# Types

Use built-in named and compound types.

In Swift, there are two kinds of types: named types and compound types.
A *named type* is a type that can be given a particular name when it's defined.
Named types include classes, structures, enumerations, and protocols.
For example,
instances of a user-defined class named `MyClass` have the type `MyClass`.
In addition to user-defined named types,
the Swift standard library defines many commonly used named types,
including those that represent arrays, dictionaries, and optional values.

Data types that are normally considered basic or primitive in other languages ---
such as types that represent numbers, characters, and strings ---
are actually named types,
defined and implemented in the Swift standard library using structures.
Because they're named types,
you can extend their behavior to suit the needs of your program,
using an extension declaration,
discussed in <doc:Extensions> and <doc:Declarations#Extension-Declaration>.

A *compound type* is a type without a name, defined in the Swift language itself.
There are two compound types: function types and tuple types.
A compound type may contain named types and other compound types.
For example, the tuple type `(Int, (Int, Int))` contains two elements:
The first is the named type `Int`,
and the second is another compound type `(Int, Int)`.

You can put parentheses around a named type or a compound type.
However, adding parentheses around a type doesn't have any effect.
For example, `(Int)` is equivalent to `Int`.

This chapter discusses the types defined in the Swift language itself
and describes the type inference behavior of Swift.

> Grammar of a type:
>
> *type* → *function-type* \
> *type* → *array-type* \
> *type* → *dictionary-type* \
> *type* → *type-identifier* \
> *type* → *tuple-type* \
> *type* → *optional-type* \
> *type* → *implicitly-unwrapped-optional-type* \
> *type* → *protocol-composition-type* \
> *type* → *opaque-type* \
> *type* → *boxed-protocol-type* \
> *type* → *metatype-type* \
> *type* → *any-type* \
> *type* → *self-type* \
> *type* → **`(`** *type* **`)`**

## Type Annotation

A *type annotation* explicitly specifies the type of a variable or expression.
Type annotations begin with a colon (`:`) and end with a type,
as the following examples show:

```swift
let someTuple: (Double, Double) = (3.14159, 2.71828)
func someFunction(a: Int) { /* ... */ }
```

<!--
  - test: `type-annotation`

  ```swifttest
  -> let someTuple: (Double, Double) = (3.14159, 2.71828)
  -> func someFunction(a: Int) { /* ... */ }
  ```
-->

In the first example,
the expression `someTuple` is specified to have the tuple type `(Double, Double)`.
In the second example,
the parameter `a` to the function `someFunction` is specified to have the type `Int`.

Type annotations can contain an optional list of type attributes before the type.

> Grammar of a type annotation:
>
> *type-annotation* → **`:`** *attributes*_?_ *type*

## Type Identifier

A *type identifier* refers to either a named type
or a type alias of a named or compound type.

Most of the time, a type identifier directly refers to a named type
with the same name as the identifier.
For example, `Int` is a type identifier that directly refers to the named type `Int`,
and the type identifier `Dictionary<String, Int>` directly refers
to the named type `Dictionary<String, Int>`.

There are two cases in which a type identifier doesn't refer to a type with the same name.
In the first case, a type identifier refers to a type alias of a named or compound type.
For instance, in the example below,
the use of `Point` in the type annotation refers to the tuple type `(Int, Int)`.

```swift
typealias Point = (Int, Int)
let origin: Point = (0, 0)
```

<!--
  - test: `type-identifier`

  ```swifttest
  -> typealias Point = (Int, Int)
  -> let origin: Point = (0, 0)
  ```
-->

In the second case, a type identifier uses dot (`.`) syntax to refer to named types
declared in other modules or nested within other types.
For example, the type identifier in the following code references the named type `MyType`
that's declared in the `ExampleModule` module.

```swift
var someValue: ExampleModule.MyType
```

<!--
  - test: `type-identifier-dot`

  ```swifttest
  -> var someValue: ExampleModule.MyType
  !$ error: cannot find type 'ExampleModule' in scope
  !! var someValue: ExampleModule.MyType
  !!                ^~~~~~~~~~~~~
  ```
-->

> Grammar of a type identifier:
>
> *type-identifier* → *type-name* *generic-argument-clause*_?_ | *type-name* *generic-argument-clause*_?_ **`.`** *type-identifier* \
> *type-name* → *identifier*

## Tuple Type

A *tuple type* is a comma-separated list of types, enclosed in parentheses.

You can use a tuple type as the return type of a function
to enable the function to return a single tuple containing multiple values.
You can also name the elements of a tuple type and use those names to refer to
the values of the individual elements. An element name consists of an identifier
followed immediately by a colon (:). For an example that demonstrates both of
these features, see <doc:Functions#Functions-with-Multiple-Return-Values>.

When an element of a tuple type has a name,
that name is part of the type.

```swift
var someTuple = (top: 10, bottom: 12)  // someTuple is of type (top: Int, bottom: Int)
someTuple = (top: 4, bottom: 42) // OK: Names match.
someTuple = (9, 99)              // OK: Names are inferred.
someTuple = (left: 5, right: 5)  // Error: Names don't match.
```

<!--
  - test: `tuple-type-names`

  ```swifttest
  -> var someTuple = (top: 10, bottom: 12)  // someTuple is of type (top: Int, bottom: Int)
  -> someTuple = (top: 4, bottom: 42) // OK: Names match.
  -> someTuple = (9, 99)              // OK: Names are inferred.
  -> someTuple = (left: 5, right: 5)  // Error: Names don't match.
  !$ error: cannot assign value of type '(left: Int, right: Int)' to type '(top: Int, bottom: Int)'
  !! someTuple = (left: 5, right: 5)  // Error: Names don't match.
  !!             ^~~~~~~~~~~~~~~~~~~
  ```
-->

All tuple types contain two or more types,
except for `Void` which is a type alias for the empty tuple type, `()`.

> Grammar of a tuple type:
>
> *tuple-type* → **`(`** **`)`** | **`(`** *tuple-type-element* **`,`** *tuple-type-element-list* **`)`** \
> *tuple-type-element-list* → *tuple-type-element* | *tuple-type-element* **`,`** *tuple-type-element-list* \
> *tuple-type-element* → *element-name* *type-annotation* | *type* \
> *element-name* → *identifier*

## Function Type

A *function type* represents the type of a function, method, or closure
and consists of a parameter and return type separated by an arrow (`->`):

```swift
(<#parameter type#>) -> <#return type#>
```

The *parameter type* is comma-separated list of types.
Because the *return type* can be a tuple type,
function types support functions and methods
that return multiple values.

A parameter of the function type `() -> T`
(where `T` is any type)
can apply the `autoclosure` attribute
to implicitly create a closure at its call sites.
This provides a syntactically convenient way
to defer the evaluation of an expression
without needing to write an explicit closure
when you call the function.
For an example of an autoclosure function type parameter,
see <doc:Closures#Autoclosures>.

A function type can have variadic parameters in its *parameter type*.
Syntactically,
a variadic parameter consists of a base type name followed immediately by three dots (`...`),
as in `Int...`. A variadic parameter is treated as an array that contains elements
of the base type name. For instance, the variadic parameter `Int...` is treated
as `[Int]`. For an example that uses a variadic parameter,
see <doc:Functions#Variadic-Parameters>.

To specify an in-out parameter, prefix the parameter type with the `inout` keyword.
You can't mark a variadic parameter or a return type with the `inout` keyword.
In-out parameters are discussed in <doc:Functions#In-Out-Parameters>.

If a function type has only one parameter
and that parameter's type is a tuple type,
then the tuple type must be parenthesized when writing the function's type.
For example,
`((Int, Int)) -> Void`
is the type of a function that takes a single parameter
of the tuple type `(Int, Int)`
and doesn't return any value.
In contrast, without parentheses,
`(Int, Int) -> Void` is the type
of a function that takes two `Int` parameters
and doesn't return any value.
Likewise, because `Void` is a type alias for `()`,
the function type `(Void) -> Void`
is the same as `(()) -> ()` ---
a function that takes a single argument that's an empty tuple.
These types aren't the same as `() -> ()` ---
a function that takes no arguments.

Argument names in functions and methods
aren't part of the corresponding function type.
For example:

<!--
  - test: `argument-names`

  ```swifttest
  -> func someFunction(left: Int, right: Int) {}
  -> func anotherFunction(left: Int, right: Int) {}
  -> func functionWithDifferentLabels(top: Int, bottom: Int) {}

  -> var f = someFunction // The type of f is (Int, Int) -> Void, not (left: Int, right: Int) -> Void.
  >> print(type(of: f))
  << (Int, Int) -> ()
  -> f = anotherFunction              // OK
  -> f = functionWithDifferentLabels  // OK
  ```
-->

```swift
func someFunction(left: Int, right: Int) {}
func anotherFunction(left: Int, right: Int) {}
func functionWithDifferentLabels(top: Int, bottom: Int) {}

var f = someFunction // The type of f is (Int, Int) -> Void, not (left: Int, right: Int) -> Void.
f = anotherFunction              // OK
f = functionWithDifferentLabels  // OK

func functionWithDifferentArgumentTypes(left: Int, right: String) {}
f = functionWithDifferentArgumentTypes     // Error

func functionWithDifferentNumberOfArguments(left: Int, right: Int, top: Int) {}
f = functionWithDifferentNumberOfArguments // Error
```

<!--
  - test: `argument-names-err`

  ```swifttest
  -> func someFunction(left: Int, right: Int) {}
  -> func anotherFunction(left: Int, right: Int) {}
  -> func functionWithDifferentLabels(top: Int, bottom: Int) {}

  -> var f = someFunction // The type of f is (Int, Int) -> Void, not (left: Int, right: Int) -> Void.
  -> f = anotherFunction              // OK
  -> f = functionWithDifferentLabels  // OK

  -> func functionWithDifferentArgumentTypes(left: Int, right: String) {}
  -> f = functionWithDifferentArgumentTypes     // Error
  !$ error: cannot assign value of type '(Int, String) -> ()' to type '(Int, Int) -> ()'
  !! f = functionWithDifferentArgumentTypes     // Error
  !! ^

  -> func functionWithDifferentNumberOfArguments(left: Int, right: Int, top: Int) {}
  -> f = functionWithDifferentNumberOfArguments // Error
  !$ error: type of expression is ambiguous without more context
  !! f = functionWithDifferentNumberOfArguments // Error
  !! ~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  ```
-->

Because argument labels aren't part of a function's type,
you omit them when writing a function type.

```swift
var operation: (lhs: Int, rhs: Int) -> Int     // Error
var operation: (_ lhs: Int, _ rhs: Int) -> Int // OK
var operation: (Int, Int) -> Int               // OK
```

<!--
  - test: `omit-argument-names-in-function-type`

  ```swifttest
  -> var operation: (lhs: Int, rhs: Int) -> Int     // Error
  !$ error: function types cannot have argument labels; use '_' before 'lhs'
  !!    var operation: (lhs: Int, rhs: Int) -> Int     // Error
  !!                    ^
  !!                    _
  !$ error: function types cannot have argument labels; use '_' before 'rhs'
  !!    var operation: (lhs: Int, rhs: Int) -> Int     // Error
  !!                              ^
  !!                              _
  !$ error: invalid redeclaration of 'operation'
  !! var operation: (_ lhs: Int, _ rhs: Int) -> Int // OK
  !!     ^
  !$ note: 'operation' previously declared here
  !! var operation: (lhs: Int, rhs: Int) -> Int     // Error
  !!     ^
  !$ error: invalid redeclaration of 'operation'
  !! var operation: (Int, Int) -> Int               // OK
  !!     ^
  !$ note: 'operation' previously declared here
  !! var operation: (lhs: Int, rhs: Int) -> Int     // Error
  !!     ^
  -> var operation: (_ lhs: Int, _ rhs: Int) -> Int // OK
  -> var operation: (Int, Int) -> Int               // OK
  ```
-->

If a function type includes more than a single arrow (`->`),
the function types are grouped from right to left.
For example,
the function type `(Int) -> (Int) -> Int` is understood as `(Int) -> ((Int) -> Int)` ---
that is, a function that takes an `Int` and returns
another function that takes and returns an `Int`.

Function types for functions
that can throw or rethrow an error must include the `throws` keyword.
You can include a type after `throws` in parentheses
to specify the type of error that the function throws.
The throw error type must conform to the `Error` protocol.
Writing `throws` without specifying a type
is the same as writing `throws(any Error)`.
Omitting `throws` is the same as writing `throws(Never)`.
The error type that a function throws
can be any type that conforms to `Error`,
including generic types, boxed protocol types, and opaque types.

The type of error that a function throws is part of that function's type,
and a subtype relationship between error types
means the corresponding function types are also subtypes.
For example, if you declare a custom `MyError` type,
the relationship between some function types is as follows,
from supertype to subtype:

1. Functions that throw any error, marked `throws(any Error)`
1. Functions that throw a specific error, marked `throws(MyError)`
1. Functions that don't throw, marked `throws(Never)`

As a result of these subtype relationships:

- You can use a nonthrowing function
  in the same places as a throwing function.
- You can use a function that throws a concrete error type
  in the same places as a throwing function.
- You can use a function that throws a more specific error type
  in the same places as a function that throws a more general error type.

If you use an associated type or a generic type parameter
as the thrown error type in a function type,
then that associated type or generic type parameter
is implicitly required to conform to the `Error` protocol.

Throwing and rethrowing functions are described in
<doc:Declarations#Throwing-Functions-and-Methods>
and <doc:Declarations#Rethrowing-Functions-and-Methods>.

Function types for asynchronous functions
must be marked with the `async` keyword.
The `async` keyword is part of a function's type,
and synchronous functions are subtypes of asynchronous functions.
As a result, you can use a synchronous function
in the same places as an asynchronous one.
For information about asynchronous functions,
see <doc:Declarations#Asynchronous-Functions-and-Methods>.

<!--
  - test: `function-arrow-is-right-associative`

  ```swifttest
  >> func f(i: Int) -> (Int) -> Int {
  >>     func g(j: Int) -> Int {
  >>         return i + j
  >>     }
  >>     return g
  >> }

  >> let a: (Int) -> (Int) -> Int = f
  >> let r0 = a(3)(5)
  >> assert(r0 == 8)

  >> let b: (Int) -> ((Int) -> Int) = f
  >> let r1 = b(3)(5)
  >> assert(r1 == 8)
  ```
-->

### Restrictions for Nonescaping Closures

A parameter that's a nonescaping function
can't be stored in a property, variable, or constant of type `Any`,
because that might allow the value to escape.

<!--
  - test: `cant-store-nonescaping-as-Any`

  ```swifttest
  -> func f(g: ()->Void) { let x: Any = g }
  !$ error: converting non-escaping value to 'Any' may allow it to escape
  !! func f(g: ()->Void) { let x: Any = g }
  !!                                    ^
  ```
-->

A parameter that's a nonescaping function
can't be passed as an argument to another nonescaping function parameter.
This restriction helps Swift perform
more of its checks for conflicting access to memory
at compile time instead of at runtime.
For example:

```swift
let external: (() -> Void) -> Void = { _ in () }
func takesTwoFunctions(first: (() -> Void) -> Void, second: (() -> Void) -> Void) {
    first { first {} }       // Error
    second { second {}  }    // Error

    first { second {} }      // Error
    second { first {} }      // Error

    first { external {} }    // OK
    external { first {} }    // OK
}
```

<!--
  - test: `memory-nonescaping-functions`

  ```swifttest
  -> let external: (() -> Void) -> Void = { _ in () }
  -> func takesTwoFunctions(first: (() -> Void) -> Void, second: (() -> Void) -> Void) {
         first { first {} }       // Error
         second { second {}  }    // Error

         first { second {} }      // Error
         second { first {} }      // Error

         first { external {} }    // OK
         external { first {} }    // OK
     }
  !$ error: passing a closure which captures a non-escaping function parameter 'first' to a call to a non-escaping function parameter can allow re-entrant modification of a variable
  !! first { first {} }       // Error
  !! ^
  !$ error: passing a closure which captures a non-escaping function parameter 'second' to a call to a non-escaping function parameter can allow re-entrant modification of a variable
  !! second { second {}  }    // Error
  !! ^
  !$ error: passing a closure which captures a non-escaping function parameter 'second' to a call to a non-escaping function parameter can allow re-entrant modification of a variable
  !! first { second {} }      // Error
  !! ^
  !$ error: passing a closure which captures a non-escaping function parameter 'first' to a call to a non-escaping function parameter can allow re-entrant modification of a variable
  !! second { first {} }      // Error
  !! ^
  ```
-->

In the code above,
both of the parameters to `takesTwoFunctions(first:second:)` are functions.
Neither parameter is marked `@escaping`,
so they're both nonescaping as a result.

The four function calls marked "Error" in the example above
cause compiler errors.
Because the `first` and `second` parameters
are nonescaping functions,
they can't be passed as arguments to another nonescaping function parameter.
In contrast,
the two function calls marked "OK" don't cause a compiler error.
These function calls don't violate the restriction
because `external` isn't one of the parameters of `takesTwoFunctions(first:second:)`.

If you need to avoid this restriction, mark one of the parameters as escaping,
or temporarily convert one of the nonescaping function parameters to an escaping function
by using the `withoutActuallyEscaping(_:do:)` function.
For information about avoiding conflicting access to memory,
see <doc:MemorySafety>.

> Grammar of a function type:
>
> *function-type* → *attributes*_?_ *function-type-argument-clause* **`async`**_?_ *throws-clause*_?_ **`->`** *type*
>
> *function-type-argument-clause* → **`(`** **`)`** \
> *function-type-argument-clause* → **`(`** *function-type-argument-list* **`...`**_?_ **`)`**
>
> *function-type-argument-list* → *function-type-argument* | *function-type-argument* **`,`** *function-type-argument-list* \
> *function-type-argument* → *attributes*_?_ *parameter-modifier*_?_ *type* | *argument-label* *type-annotation* \
> *argument-label* → *identifier*
>
> *throws-clause* → **`throws`** | **`throws`** **`(`** *type* **`)`**

<!--
  NOTE: Functions are first-class citizens in Swift,
  except for generic functions, i.e., parametric polymorphic functions.
  This means that monomorphic functions can be assigned to variables
  and can be passed as arguments to other functions.
  As an example, the following three lines of code are OK::

      func polymorphicF<T>(a: Int) -> T { return a }
      func monomorphicF(a: Int) -> Int { return a }
      var myMonomorphicF = monomorphicF

  But, the following is NOT allowed::

      var myPolymorphicF = polymorphicF
-->

## Array Type

The Swift language provides the following syntactic sugar for the Swift standard library
`Array<Element>` type:

```swift
[<#type#>]
```

In other words, the following two declarations are equivalent:

```swift
let someArray: Array<String> = ["Alex", "Brian", "Dave"]
let someArray: [String] = ["Alex", "Brian", "Dave"]
```

<!--
  - test: `array-literal`

  ```swifttest
  >> let someArray1: Array<String> = ["Alex", "Brian", "Dave"]
  >> let someArray2: [String] = ["Alex", "Brian", "Dave"]
  >> assert(someArray1 == someArray2)
  ```
-->

In both cases, the constant `someArray`
is declared as an array of strings. The elements of an array can be accessed
through subscripting by specifying a valid index value in square brackets:
`someArray[0]` refers to the element at index 0, `"Alex"`.

You can create multidimensional arrays by nesting pairs of square brackets,
where the name of the base type of the elements is contained in the innermost
pair of square brackets.
For example, you can create
a three-dimensional array of integers using three sets of square brackets:

```swift
var array3D: [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
```

<!--
  - test: `array-3d`

  ```swifttest
  -> var array3D: [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
  ```
-->

When accessing the elements in a multidimensional array,
the left-most subscript index refers to the element at that index in the outermost
array. The next subscript index to the right refers to the element
at that index in the array that's nested one level in. And so on. This means that in
the example above, `array3D[0]` refers to `[[1, 2], [3, 4]]`,
`array3D[0][1]` refers to `[3, 4]`, and `array3D[0][1][1]` refers to the value 4.

For a detailed discussion of the Swift standard library `Array` type,
see <doc:CollectionTypes#Arrays>.

> Grammar of an array type:
>
> *array-type* → **`[`** *type* **`]`**

## Dictionary Type

The Swift language provides the following syntactic sugar for the Swift standard library
`Dictionary<Key, Value>` type:

```swift
[<#key type#>: <#value type#>]
```

In other words, the following two declarations are equivalent:

```swift
let someDictionary: [String: Int] = ["Alex": 31, "Paul": 39]
let someDictionary: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
```

<!--
  - test: `dictionary-literal`

  ```swifttest
  >> let someDictionary1: [String: Int] = ["Alex": 31, "Paul": 39]
  >> let someDictionary2: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
  >> assert(someDictionary1 == someDictionary2)
  ```
-->

In both cases, the constant `someDictionary`
is declared as a dictionary with strings as keys and integers as values.

The values of a dictionary can be accessed through subscripting
by specifying the corresponding key in
square brackets: `someDictionary["Alex"]` refers to the value associated
with the key `"Alex"`.
The subscript returns an optional value of the dictionary's value type.
If the specified key isn't contained in the dictionary,
the subscript returns `nil`.

The key type of a dictionary must conform to the Swift standard library `Hashable` protocol.

<!--
  Used to have an xref to :ref:`CollectionTypes_HashValuesForSetTypes` here.
  But it doesn't really work now that the Hashable content moved from Dictionary to Set.
-->

For a detailed discussion of the Swift standard library `Dictionary` type,
see <doc:CollectionTypes#Dictionaries>.

> Grammar of a dictionary type:
>
> *dictionary-type* → **`[`** *type* **`:`** *type* **`]`**

## Optional Type

The Swift language defines the postfix `?` as syntactic sugar for
the named type `Optional<Wrapped>`, which is defined in the Swift standard library.
In other words, the following two declarations are equivalent:

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```

<!--
  - test: `optional-literal`

  ```swifttest
  >> var optionalInteger1: Int?
  >> var optionalInteger2: Optional<Int>
  ```
-->

<!--
  We can't test the code listing above,
  because of the redeclaration of optionalInteger,
  so we at least test that the syntax shown in it compiles.
-->

In both cases, the variable `optionalInteger`
is declared to have the type of an optional integer.
Note that no whitespace may appear between the type and the `?`.

The type `Optional<Wrapped>` is an enumeration with two cases, `none` and `some(Wrapped)`,
which are used to represent values that may or may not be present.
Any type can be explicitly declared to be (or implicitly converted to) an optional type.
If you don't provide an initial value when you declare an
optional variable or property, its value automatically defaults to `nil`.

<!--
  TODO Add a link to the Optional Enum Reference page.
  For more information about the Optional type, see ...
-->

If an instance of an optional type contains a value,
you can access that value using the postfix operator `!`, as shown below:

```swift
optionalInteger = 42
optionalInteger! // 42
```

<!--
  - test: `optional-type`

  ```swifttest
  >> var optionalInteger: Int?
  -> optionalInteger = 42
  >> let r0 =
  -> optionalInteger! // 42
  >> assert(r0 == 42)
  ```
-->

<!--
  Refactor the above if possible to avoid using bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

Using the `!` operator to unwrap an optional
that has a value of `nil` results in a runtime error.

You can also use optional chaining and optional binding to conditionally perform an
operation on an optional expression. If the value is `nil`,
no operation is performed and therefore no runtime error is produced.

For more information and to see examples that show how to use optional types,
see <doc:TheBasics#Optionals>.

> Grammar of an optional type:
>
> *optional-type* → *type* **`?`**

## Implicitly Unwrapped Optional Type

The Swift language defines the postfix `!` as syntactic sugar for
the named type `Optional<Wrapped>`, which is defined in the Swift standard library,
with the additional behavior that
it's automatically unwrapped when it's accessed.
If you try to use an implicitly unwrapped optional that has a value of `nil`,
you'll get a runtime error.
With the exception of the implicit unwrapping behavior,
the following two declarations are equivalent:

```swift
var implicitlyUnwrappedString: String!
var explicitlyUnwrappedString: Optional<String>
```

Note that no whitespace may appear between the type and the `!`.

Because implicit unwrapping
changes the meaning of the declaration that contains that type,
optional types that are nested inside a tuple type or a generic type
--- such as the element types of a dictionary or array ---
can't be marked as implicitly unwrapped.
For example:

```swift
let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // Error
let implicitlyUnwrappedTuple: (Int, Int)!             // OK

let arrayOfImplicitlyUnwrappedElements: [Int!]        // Error
let implicitlyUnwrappedArray: [Int]!                  // OK
```

Because implicitly unwrapped optionals
have the same `Optional<Wrapped>` type as optional values,
you can use implicitly unwrapped optionals
in all the same places in your code
that you can use optionals.
For example, you can assign values of implicitly unwrapped
optionals to variables, constants, and properties of optionals, and vice versa.

As with optionals, if you don't provide an initial value when you declare an
implicitly unwrapped optional variable or property,
its value automatically defaults to `nil`.

Use optional chaining to conditionally perform an
operation on an implicitly unwrapped optional expression.
If the value is `nil`,
no operation is performed and therefore no runtime error is produced.

For more information about implicitly unwrapped optional types,
see <doc:TheBasics#Implicitly-Unwrapped-Optionals>.

> Grammar of an implicitly unwrapped optional type:
>
> *implicitly-unwrapped-optional-type* → *type* **`!`**

## Protocol Composition Type

A *protocol composition type* defines a type that conforms to each protocol
in a list of specified protocols,
or a type that's a subclass of a given class
and conforms to each protocol in a list of specified protocols.
Protocol composition types may be used only when specifying a type
in type annotations,
in generic parameter clauses,
and in generic `where` clauses.

<!--
  In places where a comma-separated list of types is allowed,
  the P&Q syntax isn't allowed.
-->

Protocol composition types have the following form:

```swift
<#Protocol 1#> & <#Protocol 2#>
```

A protocol composition type allows you to specify a value whose type conforms to the requirements
of multiple protocols without explicitly defining a new, named protocol
that inherits from each protocol you want the type to conform to.
For example,
you can use the protocol composition type `ProtocolA & ProtocolB & ProtocolC`
instead of declaring a new protocol
that inherits from `ProtocolA`, `ProtocolB`, and `ProtocolC`.
Likewise, you can use `SuperClass & ProtocolA`
instead of declaring a new protocol
that's a subclass of `SuperClass` and conforms to `ProtocolA`.

Each item in a protocol composition list is one of the following;
the list can contain at most one class:

- The name of a class
- The name of a protocol
- A type alias whose underlying type
  is a protocol composition type, a protocol, or a class.

When a protocol composition type contains type aliases,
it's possible for the same protocol to appear
more than once in the definitions ---
duplicates are ignored.
For example,
the definition of `PQR` in the code below
is equivalent to `P & Q & R`.

```swift
typealias PQ = P & Q
typealias PQR = PQ & Q & R
```

<!--
  - test: `protocol-composition-can-have-repeats`

  ```swifttest
  >> protocol P {}
  >> protocol Q {}
  >> protocol R {}
  -> typealias PQ = P & Q
  -> typealias PQR = PQ & Q & R
  ```
-->

> Grammar of a protocol composition type:
>
> *protocol-composition-type* → *type-identifier* **`&`** *protocol-composition-continuation* \
> *protocol-composition-continuation* → *type-identifier* | *protocol-composition-type*

## Opaque Type

An *opaque type* defines a type
that conforms to a protocol or protocol composition,
without specifying the underlying concrete type.

Opaque types appear as the return type of a function or subscript,
as the type of a parameter to a function, subscript, or initializer,
or as the type of a property.
Opaque types can't appear as part of a tuple type or a generic type,
such as the element type of an array or the wrapped type of an optional.

Opaque types have the following form:

```swift
some <#constraint#>
```

The *constraint* is a class type,
protocol type,
protocol composition type,
or `Any`.
A value can be used as an instance of the opaque type
only if it's an instance of a type
that conforms to the listed protocol or protocol composition,
or inherits from the listed class.
Code that interacts with an opaque value
can use the value only in ways
that are part of the interface defined by the *constraint*.

<!--
  The wording above intentionally follows generic constraints
  because the meaning here and there is the same,
  and the compiler uses the same machinery for both under the hood.
-->

At compile time,
a value whose type is opaque has a specific concrete type,
and Swift can use that underlying type for optimizations.
However,
the opaque type forms a boundary
that information about that underlying type can't cross.

Protocol declarations can't include opaque types.
Classes can't use an opaque type as the return type of a nonfinal method.

A function that uses an opaque type as its return type
must return values that share a single underlying type.
The return type can include types
that are part of the function's generic type parameters.
For example, a function `someFunction<T>()`
could return a value of type `T` or `Dictionary<String, T>`.

Writing an opaque type for a parameter
is syntactic sugar for using a generic type,
without specifying a name for the generic type parameter.
The implicit generic type parameter has a constraint
that requires it to conform to the protocol named in the opaque type.
If you write multiple opaque types,
each one makes its own generic type parameter.
For example, the following declarations are equivalent:

```swift
func someFunction(x: some MyProtocol, y: some MyProtocol) { }
func someFunction<T1: MyProtocol, T2: MyProtocol>(x: T1, y: T2) { }
```

In the second declaration,
because the generic type parameters `T1` and `T2` have names,
you can refer use these types elsewhere in the code.
In contrast,
the generic type parameters in the first declaration
don't have names and can't be referenced in other code.

You can't use an opaque type in the type of a variadic parameter.

You can't use an opaque type
as a parameter to a function type being returned,
or as a parameter in a parameter type that's a function type.
In these positions,
the function's caller would have to construct a value
of that unknown type.

```swift
protocol MyProtocol { }
func badFunction() -> (some MyProtocol) -> Void { }  // Error
func anotherBadFunction(callback: (some MyProtocol) -> Void) { }  // Error
```

> Grammar of an opaque type:
>
> *opaque-type* → **`some`** *type*

## Boxed Protocol Type

A *boxed protocol type* defines a type
that conforms to a protocol or protocol composition,
with the ability for that conforming type
to vary while the program is running.

Boxed protocol types have the following form:

```swift
any <#constraint#>
```

The *constraint* is a protocol type,
protocol composition type,
a metatype of a protocol type,
or a metatype of a protocol composition type.

At runtime,
an instance of a boxed protocol type can contain a value
of any type that satisfies the *constraint*.
This behavior contrasts with how an opaque types work,
where there is some specific conforming type known at compile time.
The additional level of indirection that's used
when working with a boxed protocol type is called *boxing*.
Boxing typically requires a separate memory allocation for storage
and an additional level of indirection for access,
which incurs a performance cost at runtime.

Applying `any` to the `Any` or `AnyObject` types
has no effect,
because those types are already boxed protocol types.

<!--
  - test: `any-any-does-nothing`

   >> var x: any Any = 12
   >> var y: Any = 12
   >> print(type(of: x))
   << Int
   >> print(type(of: y))
   << Int
   >> print(type(of: x) == type(of: y))
   << true
-->

<!--
  - test: `any-anyobject-does-nothing`

   >> import Foundation
   >> var x: any AnyObject = NSNumber(value: 12)
   >> var y: AnyObject = NSNumber(value: 12)
   >> print(type(of: x))
   << __NSCFNumber
   >> print(type(of: y))
   << __NSCFNumber
   >> print(type(of: x) == type(of: y))
   << true
-->

<!--
Contrast P.Type with (any P.Type) and (any P).Type
https://github.com/swiftlang/swift-evolution/blob/main/proposals/0335-existential-any.md#metatypes
-->

> Grammar of a boxed protocol type:
>
> *boxed-protocol-type* → **`any`** *type*

## Metatype Type

A *metatype type* refers to the type of any type,
including class types, structure types, enumeration types, and protocol types.

The metatype of a class, structure, or enumeration type is
the name of that type followed by `.Type`.
The metatype of a protocol type --- not the concrete type that
conforms to the protocol at runtime ---
is the name of that protocol followed by `.Protocol`.
For example, the metatype of the class type `SomeClass` is `SomeClass.Type`
and the metatype of the protocol `SomeProtocol` is `SomeProtocol.Protocol`.

You can use the postfix `self` expression to access a type as a value.
For example, `SomeClass.self` returns `SomeClass` itself,
not an instance of `SomeClass`.
And `SomeProtocol.self` returns `SomeProtocol` itself,
not an instance of a type that conforms to `SomeProtocol` at runtime.
You can call the `type(of:)` function with an instance of a type
to access that instance's dynamic, runtime type as a value,
as the following example shows:

```swift
class SomeBaseClass {
    class func printClassName() {
        print("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        print("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()
// The compile-time type of someInstance is SomeBaseClass,
// and the runtime type of someInstance is SomeSubClass
type(of: someInstance).printClassName()
// Prints "SomeSubClass".
```

<!--
  - test: `metatype-type`

  ```swifttest
  -> class SomeBaseClass {
         class func printClassName() {
             print("SomeBaseClass")
         }
     }
  -> class SomeSubClass: SomeBaseClass {
         override class func printClassName() {
             print("SomeSubClass")
         }
     }
  -> let someInstance: SomeBaseClass = SomeSubClass()
  -> // The compile-time type of someInstance is SomeBaseClass,
  -> // and the runtime type of someInstance is SomeSubClass
  -> type(of: someInstance).printClassName()
  <- SomeSubClass
  ```
-->

For more information,
see [`type(of:)`](https://developer.apple.com/documentation/swift/2885064-type)
in the Swift standard library.

Use an initializer expression to construct an instance of a type
from that type's metatype value.
For class instances,
the initializer that's called must be marked with the `required` keyword
or the entire class marked with the `final` keyword.

```swift
class AnotherSubClass: SomeBaseClass {
    let string: String
    required init(string: String) {
        self.string = string
    }
    override class func printClassName() {
        print("AnotherSubClass")
    }
}
let metatype: AnotherSubClass.Type = AnotherSubClass.self
let anotherInstance = metatype.init(string: "some string")
```

<!--
  - test: `metatype-type`

  ```swifttest
  -> class AnotherSubClass: SomeBaseClass {
        let string: String
        required init(string: String) {
           self.string = string
        }
        override class func printClassName() {
           print("AnotherSubClass")
        }
     }
  -> let metatype: AnotherSubClass.Type = AnotherSubClass.self
  -> let anotherInstance = metatype.init(string: "some string")
  ```
-->

> Grammar of a metatype type:
>
> *metatype-type* → *type* **`.`** **`Type`** | *type* **`.`** **`Protocol`**

## Any Type

The `Any` type can contain values from all other types.
`Any` can be used as the concrete type
for an instance of any of the following types:

- A class, structure, or enumeration
- A metatype, such as `Int.self`
- A tuple with any types of components
- A closure or function type

```swift
let mixed: [Any] = ["one", 2, true, (4, 5.3), { () -> Int in return 6 }]
```

<!--
  - test: `any-type`

  ```swifttest
  -> let mixed: [Any] = ["one", 2, true, (4, 5.3), { () -> Int in return 6 }]
  ```
-->

When you use `Any` as a concrete type for an instance,
you need to cast the instance to a known type
before you can access its properties or methods.
Instances with a concrete type of `Any`
maintain their original dynamic type
and can be cast to that type using one of the type-cast operators ---
`as`, `as?`, or `as!`.
For example,
use `as?` to conditionally downcast the first object in a heterogeneous array
to a `String` as follows:

```swift
if let first = mixed.first as? String {
    print("The first item, '\(first)', is a string.")
}
// Prints "The first item, 'one', is a string."
```

<!--
  - test: `any-type`

  ```swifttest
  -> if let first = mixed.first as? String {
         print("The first item, '\(first)', is a string.")
     }
  <- The first item, 'one', is a string.
  ```
-->

For more information about casting, see <doc:TypeCasting>.

The `AnyObject` protocol is similar to the `Any` type.
All classes implicitly conform to `AnyObject`.
Unlike `Any`,
which is defined by the language,
`AnyObject` is defined by the Swift standard library.
For more information, see
<doc:Protocols#Class-Only-Protocols>
and [`AnyObject`](https://developer.apple.com/documentation/swift/anyobject).

> Grammar of an Any type:
>
> *any-type* → **`Any`**

## Self Type

The `Self` type isn't a specific type,
but rather lets you conveniently refer to the current type
without repeating or knowing that type's name.

In a protocol declaration or a protocol member declaration,
the `Self` type refers to the eventual type that conforms to the protocol.

In a structure, class, or enumeration declaration,
the `Self` type refers to the type introduced by the declaration.
Inside the declaration for a member of a type,
the `Self` type refers to that type.
In the members of a class declaration,
`Self` can appear only as follows:

- As the return type of a method
- As the return type of a read-only subscript
- As the type of a read-only computed property
- In the body of a method

For example,
the code below shows an instance method `f`
whose return type is `Self`.

<!--
  - test: `self-in-class-cant-be-a-parameter-type`

  ```swifttest
  -> class C { func f(c: Self) { } }
  !$ error: covariant 'Self' or 'Self?' can only appear as the type of a property, subscript or method result; did you mean 'C'?
  !! class C { func f(c: Self) { } }
  !!                     ^~~~
  !!                     C
  ```
-->

<!--
  - test: `self-in-class-can-be-a-subscript-param`

  ```swifttest
  >> class C { subscript(s: Int) -> Self { return self } }
  >> let c = C()
  >> _ = c[12]
  ```
-->

<!--
  - test: `self-in-class-can-be-a-computed-property-type`

  ```swifttest
  >> class C { var s: Self { return self } }
  >> let c = C()
  >> _ = c.s
  ```
-->

```swift
class Superclass {
    func f() -> Self { return self }
}
let x = Superclass()
print(type(of: x.f()))
// Prints "Superclass".

class Subclass: Superclass { }
let y = Subclass()
print(type(of: y.f()))
// Prints "Subclass".

let z: Superclass = Subclass()
print(type(of: z.f()))
// Prints "Subclass".
```

<!--
  - test: `self-gives-dynamic-type`

  ```swifttest
  -> class Superclass {
         func f() -> Self { return self }
     }
  -> let x = Superclass()
  -> print(type(of: x.f()))
  <- Superclass

  -> class Subclass: Superclass { }
  -> let y = Subclass()
  -> print(type(of: y.f()))
  <- Subclass

  -> let z: Superclass = Subclass()
  -> print(type(of: z.f()))
  <- Subclass
  ```
-->

The last part of the example above shows that
`Self` refers to the runtime type `Subclass` of the value of `z`,
not the compile-time type `Superclass` of the variable itself.

<!--
  TODO: Using Self as the return type from a subscript or property doesn't
  currently work.  The compiler allows it, but you get the wrong type back,
  and the compiler doesn't enforce that the subscript/property must be
  read-only.  See https://bugs.swift.org/browse/SR-10326
-->

Inside a nested type declaration,
the `Self` type refers to the type
introduced by the innermost type declaration.

The `Self` type refers to the same type
as the [`type(of:)`](https://developer.apple.com/documentation/swift/2885064-type)
function in the Swift standard library.
Writing `Self.someStaticMember` to access a member of the current type
is the same as writing `type(of: self).someStaticMember`.

> Grammar of a Self type:
>
> *self-type* → **`Self`**

## Type Inheritance Clause

A *type inheritance clause* is used to specify which class a named type inherits from
and which protocols a named type conforms to.
A type inheritance clause begins with a colon (`:`),
followed by a list of type identifiers.

Class types can inherit from a single superclass and conform to any number of protocols.
When defining a class,
the name of the superclass must appear first in the list of type identifiers,
followed by any number of protocols the class must conform to.
If the class doesn't inherit from another class,
the list can begin with a protocol instead.
For an extended discussion and several examples of class inheritance,
see <doc:Inheritance>.

Other named types can only inherit from or conform to a list of protocols.
Protocol types can inherit from any number of other protocols.
When a protocol type inherits from other protocols,
the set of requirements from those other protocols are aggregated together,
and any type that inherits from the current protocol must conform to all of those requirements.

A type inheritance clause in an enumeration definition can be either a list of protocols,
or in the case of an enumeration that assigns raw values to its cases,
a single, named type that specifies the type of those raw values.
For an example of an enumeration definition that uses a type inheritance clause
to specify the type of its raw values, see <doc:Enumerations#Raw-Values>.

> Grammar of a type inheritance clause:
>
> *type-inheritance-clause* → **`:`** *type-inheritance-list* \
> *type-inheritance-list* → *attributes*_?_ *type-identifier* | *attributes*_?_ *type-identifier* **`,`** *type-inheritance-list*

## Type Inference

Swift uses *type inference* extensively,
allowing you to omit the type or part of the type of many variables and expressions in your code.
For example,
instead of writing `var x: Int = 0`, you can write `var x = 0`,
omitting the type completely ---
the compiler correctly infers that `x` names a value of type `Int`.
Similarly, you can omit part of a type when the full type can be inferred from context.
For example, if you write `let dict: Dictionary = ["A": 1]`,
the compiler infers that `dict` has the type `Dictionary<String, Int>`.

In both of the examples above,
the type information is passed up from the leaves of the expression tree to its root.
That is,
the type of `x` in `var x: Int = 0` is inferred by first checking the type of `0`
and then passing this type information up to the root (the variable `x`).

In Swift, type information can also flow in the opposite direction --- from the root down to the leaves.
In the following example, for instance,
the explicit type annotation (`: Float`) on the constant `eFloat`
causes the numeric literal `2.71828` to have an inferred type of `Float` instead of `Double`.

```swift
let e = 2.71828 // The type of e is inferred to be Double.
let eFloat: Float = 2.71828 // The type of eFloat is Float.
```

<!--
  - test: `type-inference`

  ```swifttest
  -> let e = 2.71828 // The type of e is inferred to be Double.
  -> let eFloat: Float = 2.71828 // The type of eFloat is Float.
  ```
-->

Type inference in Swift operates at the level of a single expression or statement.
This means that all of the information needed to infer an omitted type or part of a type
in an expression must be accessible from type-checking
the expression or one of its subexpressions.

<!--
  TODO: Email Doug for a list of rules or situations describing when type-inference
  is allowed and when types must be fully typed.
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
