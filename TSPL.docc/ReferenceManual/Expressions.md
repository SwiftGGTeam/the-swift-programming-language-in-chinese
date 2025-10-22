# Expressions

Access, modify, and assign values.

In Swift, there are four kinds of expressions:
prefix expressions, infix expressions, primary expressions, and postfix expressions.
Evaluating an expression returns a value,
causes a side effect, or both.

Prefix and infix expressions let you
apply operators to smaller expressions.
Primary expressions are conceptually the simplest kind of expression,
and they provide a way to access values.
Postfix expressions,
like prefix and infix expressions,
let you build up more complex expressions
using postfixes such as function calls and member access.
Each kind of expression is described in detail
in the sections below.

> Grammar of an expression:
>
> *expression* → *try-operator*_?_ *await-operator*_?_ *prefix-expression* *infix-expressions*_?_

## Prefix Expressions

*Prefix expressions* combine
an optional prefix operator with an expression.
Prefix operators take one argument,
the expression that follows them.

For information about the behavior of these operators,
see <doc:BasicOperators> and <doc:AdvancedOperators>.

For information about the operators provided by the Swift standard library,
see [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> Grammar of a prefix expression:
>
> *prefix-expression* → *prefix-operator*_?_ *postfix-expression* \
> *prefix-expression* → *in-out-expression*

### In-Out Expression

An *in-out expression* marks a variable
that's being passed
as an in-out argument to a function call expression.

```swift
&<#expression#>
```

For more information about in-out parameters and to see an example,
see <doc:Functions#In-Out-Parameters>.

In-out expressions are also used
when providing a non-pointer argument
in a context where a pointer is needed,
as described in <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type>.

> Grammar of an in-out expression:
>
> *in-out-expression* → **`&`** *primary-expression*

### Try Operator

A *try expression* consists of the `try` operator
followed by an expression that can throw an error.
It has the following form:

```swift
try <#expression#>
```

The value of a `try` expression is the value of the *expression*.

An *optional-try expression* consists of the `try?` operator
followed by an expression that can throw an error.
It has the following form:

```swift
try? <#expression#>
```

If the *expression* doesn't throw an error,
the value of the optional-try expression
is an optional containing the value of the *expression*.
Otherwise, the value of the optional-try expression is `nil`.

A *forced-try expression* consists of the `try!` operator
followed by an expression that can throw an error.
It has the following form:

```swift
try! <#expression#>
```

The value of a forced-try expression is the value of the *expression*.
If the *expression* throws an error,
a runtime error is produced.

When the expression on the left-hand side of an infix operator
is marked with `try`, `try?`, or `try!`,
that operator applies to the whole infix expression.
That said, you can use parentheses to be explicit about the scope of the operator's application.

```swift
// Writing 'try' applies to both function calls.
sum = try someThrowingFunction() + anotherThrowingFunction()

// Writing 'try' applies to both function calls.
sum = try (someThrowingFunction() + anotherThrowingFunction())

// Error: Writing 'try' applies only to the first function call.
sum = (try someThrowingFunction()) + anotherThrowingFunction()
```

<!--
  - test: `placement-of-try`

  ```swifttest
  >> func someThrowingFunction() throws -> Int { return 10 }
  >> func anotherThrowingFunction() throws -> Int { return 5 }
  >> var sum = 0
  // Writing 'try' applies to both function calls.
  -> sum = try someThrowingFunction() + anotherThrowingFunction()

  // Writing 'try' applies to both function calls.
  -> sum = try (someThrowingFunction() + anotherThrowingFunction())

  // Error: Writing 'try' applies only to the first function call.
  -> sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !$ error: call can throw but is not marked with 'try'
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^~~~~~~~~~~~~~~~~~~~~~~~~
  !$ note: did you mean to use 'try'?
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^
  !!                                      try
  !$ note: did you mean to handle error as optional value?
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^
  !!                                      try?
  !$ note: did you mean to disable error propagation?
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^
  !!                                      try!
  ```
-->

A `try` expression can't appear on the right-hand side of an infix operator,
unless the infix operator is the assignment operator
or the `try` expression is enclosed in parentheses.

<!--
  - test: `try-on-right`

  ```swifttest
  >> func someThrowingFunction() throws -> Int { return 10 }
  >> var sum = 0
  -> sum = 7 + try someThrowingFunction() // Error
  !$ error: 'try' cannot appear to the right of a non-assignment operator
  !! sum = 7 + try someThrowingFunction() // Error
  !!           ^
  -> sum = 7 + (try someThrowingFunction()) // OK
  ```
-->

If an expression includes both the `try` and `await` operator,
the `try` operator must appear first.

<!--
  The "try await" ordering is also part of the grammar for 'expression',
  but it's important enough to be worth re-stating in prose.
-->

For more information and to see examples of how to use `try`, `try?`, and `try!`,
see <doc:ErrorHandling>.

> Grammar of a try expression:
>
> *try-operator* → **`try`** | **`try`** **`?`** | **`try`** **`!`**

### Await Operator

An *await expression* consists of the `await` operator
followed by an expression that uses the result of an asynchronous operation.
It has the following form:

```swift
await <#expression#>
```

The value of an `await` expression is the value of the *expression*.

An expression marked with `await` is called a *potential suspension point*.
Execution of an asynchronous function can be suspended
at each expression that's marked with `await`.
In addition,
execution of concurrent code is never suspended at any other point.
This means code between potential suspension points
can safely update state that requires temporarily breaking invariants,
provided that it completes the update
before the next potential suspension point.

An `await` expression can appear only within an asynchronous context,
such as the trailing closure passed to the `async(priority:operation:)` function.
It can't appear in the body of a `defer` statement,
or in an autoclosure of synchronous function type.

When the expression on the left-hand side of an infix operator
is marked with the `await` operator,
that operator applies to the whole infix expression.
That said, you can use parentheses
to be explicit about the scope of the operator's application.

```swift
// Writing 'await' applies to both function calls.
sum = await someAsyncFunction() + anotherAsyncFunction()

// Writing 'await' applies to both function calls.
sum = await (someAsyncFunction() + anotherAsyncFunction())

// Error: Writing 'await' applies only to the first function call.
sum = (await someAsyncFunction()) + anotherAsyncFunction()
```

<!--
  - test: `placement-of-await`

  ```swifttest
  >> func someAsyncFunction() async -> Int { return 10 }
  >> func anotherAsyncFunction() async -> Int { return 5 }
  >> func f() async {
  >> var sum = 0
  // Writing 'await' applies to both function calls.
  -> sum = await someAsyncFunction() + anotherAsyncFunction()

  // Writing 'await' applies to both function calls.
  -> sum = await (someAsyncFunction() + anotherAsyncFunction())

  // Error: Writing 'await' applies only to the first function call.
  -> sum = (await someAsyncFunction()) + anotherAsyncFunction()
  >> _ = sum  // Suppress irrelevant written-but-not-read warning
  >> }
  !$ error: expression is 'async' but is not marked with 'await'
  !! sum = (await someAsyncFunction()) + anotherAsyncFunction()
  !! ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  !! await
  !$ note: call is 'async'
  !! sum = (await someAsyncFunction()) + anotherAsyncFunction()
  !! ^
  ```
-->

An `await` expression can't appear on the right-hand side of an infix operator,
unless the infix operator is the assignment operator
or the `await` expression is enclosed in parentheses.

<!--
  - test: `await-on-right`

  ```swifttest
  >> func f() async {
  >> func someAsyncFunction() async -> Int { return 10 }
  >> var sum = 0
  >> sum = 7 + await someAsyncFunction()    // Error
  !$ error: 'await' cannot appear to the right of a non-assignment operator
  !! sum = 7 + await someAsyncFunction()    // Error
  !! ^
  >> sum = 7 + (await someAsyncFunction())  // OK
  >> _ = sum  // Suppress irrelevant written-but-not-read warning
  >> }
  ```
-->

If an expression includes both the `await` and `try` operator,
the `try` operator must appear first.

<!--
  The "try await" ordering is also part of the grammar for 'expression',
  but it's important enough to be worth re-stating in prose.
-->

> Grammar of an await expression:
>
> *await-operator* → **`await`**

## Infix Expressions

*Infix expressions* combine
an infix binary operator with the expression that it takes
as its left- and right-hand arguments.
It has the following form:

```swift
<#left-hand argument#> <#operator#> <#right-hand argument#>
```

For information about the behavior of these operators,
see <doc:BasicOperators> and <doc:AdvancedOperators>.

For information about the operators provided by the Swift standard library,
see [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

<!--
  You have essentially expression sequences here, and within it are
  parts of the expressions.  We're calling them "expressions" even
  though they aren't what we ordinarily think of as expressions.  We
  have this two-phase thing where we do the expression sequence parsing
  which gives a rough parse tree.  Then after name binding we know
  operator precedence and we do a second phase of parsing that builds
  something that's a more traditional tree.
-->

> Note: At parse time,
> an expression made up of infix operators is represented
> as a flat list.
> This list is transformed into a tree
> by applying operator precedence.
> For example, the expression `2 + 3 * 5`
> is initially understood as a flat list of five items,
> `2`, `+`, `3`, `*`, and `5`.
> This process transforms it into the tree (2 + (3 * 5)).

> Grammar of an infix expression:
>
> *infix-expression* → *infix-operator* *prefix-expression* \
> *infix-expression* → *assignment-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *conditional-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *type-casting-operator* \
> *infix-expressions* → *infix-expression* *infix-expressions*_?_

### Assignment Operator

The *assignment operator* sets a new value
for a given expression.
It has the following form:

```swift
<#expression#> = <#value#>
```

The value of the *expression*
is set to the value obtained by evaluating the *value*.
If the *expression* is a tuple,
the *value* must be a tuple
with the same number of elements.
(Nested tuples are allowed.)
Assignment is performed from each part of the *value*
to the corresponding part of the *expression*.
For example:

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a is "test", b is 12, c is 3, and 9.45 is ignored
```

<!--
  - test: `assignmentOperator`

  ```swifttest
  >> var (a, _, (b, c)) = ("test", 9.45, (12, 3))
  -> (a, _, (b, c)) = ("test", 9.45, (12, 3))
  /> a is \"\(a)\", b is \(b), c is \(c), and 9.45 is ignored
  </ a is "test", b is 12, c is 3, and 9.45 is ignored
  ```
-->

The assignment operator doesn't return any value.

> Grammar of an assignment operator:
>
> *assignment-operator* → **`=`**

### Ternary Conditional Operator

The *ternary conditional operator* evaluates to one of two given values
based on the value of a condition.
It has the following form:

```swift
<#condition#> ? <#expression used if true#> : <#expression used if false#>
```

If the *condition* evaluates to `true`,
the conditional operator evaluates the first expression
and returns its value.
Otherwise, it evaluates the second expression
and returns its value.
The unused expression isn't evaluated.

For an example that uses the ternary conditional operator,
see <doc:BasicOperators#Ternary-Conditional-Operator>.

> Grammar of a conditional operator:
>
> *conditional-operator* → **`?`** *expression* **`:`**

### Type-Casting Operators

There are four type-casting operators:
the `is` operator,
the `as` operator,
the `as?` operator,
and the `as!` operator.

They have the following form:

```swift
<#expression#> is <#type#>
<#expression#> as <#type#>
<#expression#> as? <#type#>
<#expression#> as! <#type#>
```

The `is` operator checks at runtime whether the *expression*
can be cast to the specified *type*.
It returns `true` if the *expression* can be cast to the specified *type*;
otherwise, it returns `false`.

<!--
  - test: `triviallyTrueIsAndAs`

  ```swifttest
  -> assert("hello" is String)
  -> assert(!("hello" is Int))
  !$ warning: 'is' test is always true
  !! assert("hello" is String)
  !!                ^
  !$ warning: cast from 'String' to unrelated type 'Int' always fails
  !! assert(!("hello" is Int))
  !!          ~~~~~~~ ^  ~~~
  ```
-->

<!--
  - test: `is-operator-tautology`

  ```swifttest
  -> class Base {}
  -> class Subclass: Base {}
  -> var s = Subclass()
  -> var b = Base()

  -> assert(s is Base)
  !$ warning: 'is' test is always true
  !! assert(s is Base)
  !!          ^
  ```
-->

The `as` operator performs a cast
when it's known at compile time
that the cast always succeeds,
such as upcasting or bridging.
Upcasting lets you use an expression as an instance of its type's supertype,
without using an intermediate variable.
The following approaches are equivalent:

```swift
func f(_ any: Any) { print("Function for Any") }
func f(_ int: Int) { print("Function for Int") }
let x = 10
f(x)
// Prints "Function for Int".

let y: Any = x
f(y)
// Prints "Function for Any".

f(x as Any)
// Prints "Function for Any".
```

<!--
  - test: `explicit-type-with-as-operator`

  ```swifttest
  -> func f(_ any: Any) { print("Function for Any") }
  -> func f(_ int: Int) { print("Function for Int") }
  -> let x = 10
  -> f(x)
  <- Function for Int

  -> let y: Any = x
  -> f(y)
  <- Function for Any

  -> f(x as Any)
  <- Function for Any
  ```
-->

Bridging lets you use an expression of
a Swift standard library type such as `String`
as its corresponding Foundation type such as `NSString`
without needing to create a new instance.
For more information on bridging,
see [Working with Foundation Types](https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types).

The `as?` operator
performs a conditional cast of the *expression*
to the specified *type*.
The `as?` operator returns an optional of the specified *type*.
At runtime, if the cast succeeds,
the value of *expression* is wrapped in an optional and returned;
otherwise, the value returned is `nil`.
If casting to the specified *type*
is guaranteed to fail or is guaranteed to succeed,
a compile-time error is raised.

The `as!` operator performs a forced cast of the *expression* to the specified *type*.
The `as!` operator returns a value of the specified *type*, not an optional type.
If the cast fails, a runtime error is raised.
The behavior of `x as! T` is the same as the behavior of `(x as? T)!`.

For more information about type casting
and to see examples that use the type-casting operators,
see <doc:TypeCasting>.

> Grammar of a type-casting operator:
>
> *type-casting-operator* → **`is`** *type* \
> *type-casting-operator* → **`as`** *type* \
> *type-casting-operator* → **`as`** **`?`** *type* \
> *type-casting-operator* → **`as`** **`!`** *type*

## Primary Expressions

*Primary expressions*
are the most basic kind of expression.
They can be used as expressions on their own,
and they can be combined with other tokens
to make prefix expressions, infix expressions, and postfix expressions.

> Grammar of a primary expression:
>
> *primary-expression* → *identifier* *generic-argument-clause*_?_ \
> *primary-expression* → *literal-expression* \
> *primary-expression* → *self-expression* \
> *primary-expression* → *superclass-expression* \
> *primary-expression* → *conditional-expression* \
> *primary-expression* → *closure-expression* \
> *primary-expression* → *parenthesized-expression* \
> *primary-expression* → *tuple-expression* \
> *primary-expression* → *implicit-member-expression* \
> *primary-expression* → *wildcard-expression* \
> *primary-expression* → *macro-expansion-expression* \
> *primary-expression* → *key-path-expression* \
> *primary-expression* → *selector-expression* \
> *primary-expression* → *key-path-string-expression*

<!--
  NOTE: One reason for breaking primary expressions out of postfix
  expressions is for exposition -- it makes it easier to organize the
  prose surrounding the production rules.
-->

<!--
  TR: Is a generic argument clause allowed
  after an identifier in expression context?
  It seems like that should only occur when an identifier
  is a *type* identifier.
-->

### Literal Expression

A *literal expression* consists of
either an ordinary literal (such as a string or a number),
an array or dictionary literal,
or a playground literal.

> Note:
> Prior to Swift 5.9,
> the following special literals were recognized:
> `#column`,
> `#dsohandle`,
> `#fileID`,
> `#filePath`,
> `#file`,
> `#function`,
> and `#line`.
> These are now implemented as macros in the Swift standard library:
> [`column()`](https://developer.apple.com/documentation/swift/column()),
> [`dsohandle()`](https://developer.apple.com/documentation/swift/dsohandle()),
> [`fileID()`](https://developer.apple.com/documentation/swift/fileID()),
> [`filePath()`](https://developer.apple.com/documentation/swift/filePath()),
> [`file()`](https://developer.apple.com/documentation/swift/file()),
> [`function()`](https://developer.apple.com/documentation/swift/function()),
> and [`line()`](https://developer.apple.com/documentation/swift/line()).

<!--
  - test: `pound-file-flavors`

  ```swifttest
  >> print(#file == #filePath)
  << true
  >> print(#file == #fileID)
  << false
  ```
-->

An *array literal* is
an ordered collection of values.
It has the following form:

```swift
[<#value 1#>, <#value 2#>, <#...#>]
```

The last expression in the array can be followed by an optional comma.
The value of an array literal has type `[T]`,
where `T` is the type of the expressions inside it.
If there are expressions of multiple types,
`T` is their closest common supertype.
Empty array literals are written using an empty
pair of square brackets and can be used to create an empty array of a specified type.

```swift
var emptyArray: [Double] = []
```

<!--
  - test: `array-literal-brackets`

  ```swifttest
  -> var emptyArray: [Double] = []
  ```
-->

A *dictionary literal* is
an unordered collection of key-value pairs.
It has the following form:

```swift
[<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#...#>]
```

The last expression in the dictionary can be followed by an optional comma.
The value of a dictionary literal has type `[Key: Value]`,
where `Key` is the type of its key expressions
and `Value` is the type of its value expressions.
If there are expressions of multiple types,
`Key` and `Value` are the closest common supertype
for their respective values.
An empty dictionary literal is written as
a colon inside a pair of brackets (`[:]`)
to distinguish it from an empty array literal.
You can use an empty dictionary literal to create an empty dictionary literal
of specified key and value types.

```swift
var emptyDictionary: [String: Double] = [:]
```

<!--
  - test: `dictionary-literal-brackets`

  ```swifttest
  -> var emptyDictionary: [String: Double] = [:]
  ```
-->

A *playground literal*
is used by Xcode to create an interactive representation
of a color, file, or image within the program editor.
Playground literals in plain text outside of Xcode
are represented using a special literal syntax.

For information on using playground literals in Xcode,
see [Add a color, file, or image literal](https://help.apple.com/xcode/mac/current/#/dev4c60242fc)
in Xcode Help.

> Grammar of a literal expression:
>
> *literal-expression* → *literal* \
> *literal-expression* → *array-literal* | *dictionary-literal* | *playground-literal*
>
> *array-literal* → **`[`** *array-literal-items*_?_ **`]`** \
> *array-literal-items* → *array-literal-item* **`,`**_?_ | *array-literal-item* **`,`** *array-literal-items* \
> *array-literal-item* → *expression*
>
> *dictionary-literal* → **`[`** *dictionary-literal-items* **`]`** | **`[`** **`:`** **`]`** \
> *dictionary-literal-items* → *dictionary-literal-item* **`,`**_?_ | *dictionary-literal-item* **`,`** *dictionary-literal-items* \
> *dictionary-literal-item* → *expression* **`:`** *expression*
>
> *playground-literal* → **`#colorLiteral`** **`(`** **`red`** **`:`** *expression* **`,`** **`green`** **`:`** *expression* **`,`** **`blue`** **`:`** *expression* **`,`** **`alpha`** **`:`** *expression* **`)`** \
> *playground-literal* → **`#fileLiteral`** **`(`** **`resourceName`** **`:`** *expression* **`)`** \
> *playground-literal* → **`#imageLiteral`** **`(`** **`resourceName`** **`:`** *expression* **`)`**

### Self Expression

The `self` expression is an explicit reference to the current type
or instance of the type in which it occurs.
It has the following forms:

```swift
self
self.<#member name#>
self[<#subscript index#>]
self(<#initializer arguments#>)
self.init(<#initializer arguments#>)
```

<!--
  TODO: Come back and explain the second to last form (i.e., self(arg: value)).
-->

In an initializer, subscript, or instance method, `self` refers to the current
instance of the type in which it occurs. In a type method,
`self` refers to the current type in which it occurs.

The `self` expression is used to specify scope when accessing members,
providing disambiguation when there's
another variable of the same name in scope,
such as a function parameter.
For example:

```swift
class SomeClass {
    var greeting: String
    init(greeting: String) {
        self.greeting = greeting
    }
}
```

<!--
  - test: `self-expression`

  ```swifttest
  -> class SomeClass {
         var greeting: String
         init(greeting: String) {
             self.greeting = greeting
         }
     }
  ```
-->

In a mutating method of a value type,
you can assign a new instance of that value type to `self`.
For example:

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

<!--
  - test: `self-expression`

  ```swifttest
  -> struct Point {
        var x = 0.0, y = 0.0
        mutating func moveBy(x deltaX: Double, y deltaY: Double) {
           self = Point(x: x + deltaX, y: y + deltaY)
        }
     }
  >> var somePoint = Point(x: 1.0, y: 1.0)
  >> somePoint.moveBy(x: 2.0, y: 3.0)
  >> print("The point is now at (\(somePoint.x), \(somePoint.y))")
  << The point is now at (3.0, 4.0)
  ```
-->

<!-- Apple Books screenshot begins here. -->

> Grammar of a self expression:
>
> *self-expression* → **`self`** | *self-method-expression* | *self-subscript-expression* | *self-initializer-expression*
>
> *self-method-expression* → **`self`** **`.`** *identifier* \
> *self-subscript-expression* → **`self`** **`[`** *function-call-argument-list* **`]`** \
> *self-initializer-expression* → **`self`** **`.`** **`init`**

### Superclass Expression

A *superclass expression* lets a class
interact with its superclass.
It has one of the following forms:

```swift
super.<#member name#>
super[<#subscript index#>]
super.init(<#initializer arguments#>)
```

The first form is used to access a member of the superclass.
The second form is used to access the superclass's subscript implementation.
The third form is used to access an initializer of the superclass.

Subclasses can use a superclass expression
in their implementation of members, subscripting, and initializers
to make use of the implementation in their superclass.

> Grammar of a superclass expression:
>
> *superclass-expression* → *superclass-method-expression* | *superclass-subscript-expression* | *superclass-initializer-expression*
>
> *superclass-method-expression* → **`super`** **`.`** *identifier* \
> *superclass-subscript-expression* → **`super`** **`[`** *function-call-argument-list* **`]`** \
> *superclass-initializer-expression* → **`super`** **`.`** **`init`**

### Conditional Expression

A *conditional expression* evaluates to one of several given values
based on the value of a condition.
It has one the following forms:

```swift
if <#condition 1#> {
   <#expression used if condition 1 is true#>
} else if <#condition 2#> {
   <#expression used if condition 2 is true#>
} else {
   <#expression used if both conditions are false#>
}

switch <#expression#> {
case <#pattern 1#>:
    <#expression 1#>
case <#pattern 2#> where <#condition#>:
    <#expression 2#>
default:
    <#expression 3#>
}
```

A conditional expression
has the same behavior and syntax as an `if` statement or a `switch` statement,
except for the differences that the paragraphs below describe.

A conditional expression appears only in the following contexts:

  - As the value assigned to a variable.
  - As the initial value in a variable or constant declaration.
  - As the error thrown by a `throw` expression.
  - As the value returned by a function, closure, or property getter.
  - As the value inside a branch of a conditional expression.

The branches of a conditional expression are exhaustive,
ensuring that the expression always produces a value
regardless of the condition.
This means each `if` branch needs a corresponding `else` branch.

Each branch contains either a single expression,
which is used as the value for the conditional expression
when that branch's conditional is true,
a `throw` statement,
or a call to a function that never returns.

Each branch must produce a value of the same type.
Because type checking of each branch is independent,
you sometimes need to specify the value's type explicitly,
like when branches include different kinds of literals,
or when a branch's value is `nil`.
When you need to provide this information,
add a type annotation to the variable that the result is assigned to,
or add an `as` cast to the branches' values.

```swift
let number: Double = if someCondition { 10 } else { 12.34 }
let number = if someCondition { 10 as Double } else { 12.34 }
```

Inside a result builder,
conditional expressions can appear
only as the initial value of a variable or constant.
This behavior means when you write `if` or `switch` in a result builder ---
outside of a variable or constant declaration ---
that code is understood as a branch statement
and one of the result builder's methods transforms that code.

Don't put a conditional expression in a `try` expression,
even if one of the branches of a conditional expression is throwing.

> Grammar of a conditional expression:
>
> *conditional-expression* → *if-expression* | *switch-expression*
>
> *if-expression* → **`if`** *condition-list* **`{`** *statement* **`}`** *if-expression-tail* \
> *if-expression-tail* → **`else`** *if-expression* \
> *if-expression-tail* → **`else`** **`{`** *statement* **`}`**
>
> *switch-expression* → **`switch`** *expression* **`{`** *switch-expression-cases* **`}`** \
> *switch-expression-cases* → *switch-expression-case* *switch-expression-cases*_?_ \
> *switch-expression-case* → *case-label* *statement* \
> *switch-expression-case* → *default-label* *statement*

### Closure Expression

A *closure expression* creates a closure,
also known as a *lambda* or an *anonymous function*
in other programming languages.
Like a function declaration,
a closure contains statements,
and it captures constants and variables from its enclosing scope.
It has the following form:

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

The *parameters* have the same form
as the parameters in a function declaration,
as described in <doc:Declarations#Function-Declaration>.

Writing `throws` or `async` in a closure expression
explicitly marks a closure as throwing or asynchronous.

```swift
{ (<#parameters#>) async throws -> <#return type#> in
   <#statements#>
}
```

If the body of a closure includes a `throws` statement or a `try` expression
that isn't nested inside of a `do` statement with exhaustive error handling,
the closure is understood to be throwing.
If a throwing closure throws errors of only a single type,
the closure is understood as throwing that error type;
otherwise, it's understood as throwing `any Error`.
Likewise, if the body includes an `await` expression,
it's understood to be asynchronous.

There are several special forms
that allow closures to be written more concisely:

<!-- Apple Books screenshot ends here. -->

- A closure can omit the types
  of its parameters, its return type, or both.
  If you omit the parameter names and both types,
  omit the `in` keyword before the statements.
  If the omitted types can't be inferred,
  a compile-time error is raised.
- A closure may omit names for its parameters.
  Its parameters are then implicitly named
  `$` followed by their position:
  `$0`, `$1`, `$2`, and so on.
- A closure that consists of only a single expression
  is understood to return the value of that expression.
  The contents of this expression are also considered
  when performing type inference on the surrounding expression.

The following closure expressions are equivalent:

```swift
myFunction { (x: Int, y: Int) -> Int in
    return x + y
}

myFunction { x, y in
    return x + y
}

myFunction { return $0 + $1 }

myFunction { $0 + $1 }
```

<!--
  - test: `closure-expression-forms`

  ```swifttest
  >> func myFunction(f: (Int, Int) -> Int) {}
  -> myFunction { (x: Int, y: Int) -> Int in
         return x + y
     }

  -> myFunction { x, y in
         return x + y
     }

  -> myFunction { return $0 + $1 }

  -> myFunction { $0 + $1 }
  ```
-->

For information about passing a closure as an argument to a function,
see <doc:Expressions#Function-Call-Expression>.

Closure expressions can be used
without being stored in a variable or constant,
such as when you immediately use a closure as part of a function call.
The closure expressions passed to `myFunction` in code above are
examples of this kind of immediate use.
As a result,
whether a closure expression is escaping or nonescaping depends
on the surrounding context of the expression.
A closure expression is nonescaping
if it's called immediately
or passed as a nonescaping function argument.
Otherwise, the closure expression is escaping.

For more information about escaping closures, see <doc:Closures#Escaping-Closures>.

#### Capture Lists

By default, a closure expression captures
constants and variables from its surrounding scope
with strong references to those values.
You can use a *capture list* to explicitly control
how values are captured in a closure.

A capture list is written as a comma-separated list of expressions
surrounded by square brackets,
before the list of parameters.
If you use a capture list, you must also use the `in` keyword,
even if you omit the parameter names, parameter types, and return type.

The entries in the capture list are initialized
when the closure is created.
For each entry in the capture list,
a constant is initialized
to the value of the constant or variable that has the same name
in the surrounding scope.
For example in the code below,
`a` is included in the capture list but `b` is not,
which gives them different behavior.

```swift
var a = 0
var b = 0
let closure = { [a] in
 print(a, b)
}

a = 10
b = 10
closure()
// Prints "0 10".
```

<!--
  - test: `capture-list-value-semantics`

  ```swifttest
  -> var a = 0
  -> var b = 0
  -> let closure = { [a] in
      print(a, b)
  }

  -> a = 10
  -> b = 10
  -> closure()
  <- 0 10
  ```
-->

There are two different things named `a`,
the variable in the surrounding scope
and the constant in the closure's scope,
but only one variable named `b`.
The `a` in the inner scope is initialized
with the value of the `a` in the outer scope
when the closure is created,
but their values aren't connected in any special way.
This means that a change to the value of `a` in the outer scope
doesn't affect the value of `a` in the inner scope,
nor does a change to `a` inside the closure
affect the value of `a` outside the closure.
In contrast, there's only one variable named `b` ---
the `b` in the outer scope ---
so changes from inside or outside the closure are visible in both places.

<!--
  [Contributor 6004] also describes the distinction as
  "capturing the variable, not the value"
  but he notes that we don't have a rigorous definition of
  capturing a variable in Swift
  (unlike some other languages)
  so that description's not likely to be very helpful for developers.
-->

This distinction isn't visible
when the captured variable's type has reference semantics.
For example,
there are two things named `x` in the code below,
a variable in the outer scope and a constant in the inner scope,
but they both refer to the same object
because of reference semantics.

```swift
class SimpleClass {
    var value: Int = 0
}
var x = SimpleClass()
var y = SimpleClass()
let closure = { [x] in
    print(x.value, y.value)
}

x.value = 10
y.value = 10
closure()
// Prints "10 10".
```

<!--
  - test: `capture-list-reference-semantics`

  ```swifttest
  -> class SimpleClass {
         var value: Int = 0
     }
  -> var x = SimpleClass()
  -> var y = SimpleClass()
  -> let closure = { [x] in
         print(x.value, y.value)
     }

  -> x.value = 10
  -> y.value = 10
  -> closure()
  <- 10 10
  ```
-->

<!--
  - test: `capture-list-with-commas`

  ```swifttest
  -> var x = 100
  -> var y = 7
  -> var f: () -> Int = { [x, y] in x+y }
  >> let r0 = f()
  >> assert(r0 == 107)
  ```
-->

<!--
  It's not an error to capture things that aren't included in the capture list,
  although maybe it should be.  See also rdar://17024367.
-->

<!--
  - test: `capture-list-is-not-exhaustive`

  ```swifttest
  -> var x = 100
     var y = 7
     var f: () -> Int = { [x] in x }
     var g: () -> Int = { [x] in x+y }

  -> let r0 = f()
  -> assert(r0 == 100)
  -> let r1 = g()
  -> assert(r1 == 107)
  ```
-->

If the type of the expression's value is a class,
you can mark the expression in a capture list
with `weak` or `unowned` to capture a weak or unowned reference
to the expression's value.

```swift
myFunction { print(self.title) }                    // implicit strong capture
myFunction { [self] in print(self.title) }          // explicit strong capture
myFunction { [weak self] in print(self!.title) }    // weak capture
myFunction { [unowned self] in print(self.title) }  // unowned capture
```

<!--
  - test: `closure-expression-weak`

  ```swifttest
  >> func myFunction(f: () -> Void) { f() }
  >> class C {
  >> let title = "Title"
  >> func method() {
  -> myFunction { print(self.title) }                    // implicit strong capture
  -> myFunction { [self] in print(self.title) }          // explicit strong capture
  -> myFunction { [weak self] in print(self!.title) }    // weak capture
  -> myFunction { [unowned self] in print(self.title) }  // unowned capture
  >> } }
  >> C().method()
  << Title
  << Title
  << Title
  << Title
  ```
-->

You can also bind an arbitrary expression
to a named value in a capture list.
The expression is evaluated when the closure is created,
and the value is captured with the specified strength.
For example:

```swift
// Weak capture of "self.parent" as "parent"
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

<!--
  - test: `closure-expression-capture`

  ```swifttest
  >> func myFunction(f: () -> Void) { f() }
  >> class P { let title = "Title" }
  >> class C {
  >> let parent = P()
  >> func method() {
  // Weak capture of "self.parent" as "parent"
  -> myFunction { [weak parent = self.parent] in print(parent!.title) }
  >> } }
  >> C().method()
  << Title
  ```
-->

For more information and examples of closure expressions,
see <doc:Closures#Closure-Expressions>.
For more information and examples of capture lists,
see <doc:AutomaticReferenceCounting#Resolving-Strong-Reference-Cycles-for-Closures>.

<!--
  - test: `async-throwing-closure-syntax`

  ```swifttest
  >> var a = 12
  >> let c1 = { [a] in return a }                  // OK: No async or throws
  >> let c2 = { [a] async in return a }            // Error
  >> let c3 = { [a] async -> in return a }         // Error
  >> let c4 = { [a] () async -> Int in return a }  // OK: Has () and ->
  !$ error: expected expression
  !! let c3 = { [a] async -> in return a }         // Error
  !! ^
  !$ error: unable to infer type of a closure parameter 'async' in the current context
  !! let c2 = { [a] async in return a }            // Error
  !! ^
  // NOTE: The error message for c3 gets printed by the REPL before the c2 error.
  ```
-->

> Grammar of a closure expression:
>
> *closure-expression* → **`{`** *attributes*_?_ *closure-signature*_?_ *statements*_?_ **`}`**
>
> *closure-signature* → *capture-list*_?_ *closure-parameter-clause* **`async`**_?_ *throws-clause*_?_ *function-result*_?_ **`in`** \
> *closure-signature* → *capture-list* **`in`**
>
> *closure-parameter-clause* → **`(`** **`)`** | **`(`** *closure-parameter-list* **`)`** | *identifier-list* \
> *closure-parameter-list* → *closure-parameter* | *closure-parameter* **`,`** *closure-parameter-list* \
> *closure-parameter* → *closure-parameter-name* *type-annotation*_?_ \
> *closure-parameter* → *closure-parameter-name* *type-annotation* **`...`** \
> *closure-parameter-name* → *identifier*
>
> *capture-list* → **`[`** *capture-list-items* **`]`** \
> *capture-list-items* → *capture-list-item* | *capture-list-item* **`,`** *capture-list-items* \
> *capture-list-item* → *capture-specifier*_?_ *identifier* \
> *capture-list-item* → *capture-specifier*_?_ *identifier* **`=`** *expression* \
> *capture-list-item* → *capture-specifier*_?_ *self-expression* \
> *capture-specifier* → **`weak`** | **`unowned`** | **`unowned(safe)`** | **`unowned(unsafe)`**

### Implicit Member Expression

An *implicit member expression*
is an abbreviated way to access a member of a type,
such as an enumeration case or a type method,
in a context where type inference
can determine the implied type.
It has the following form:

```swift
.<#member name#>
```

For example:

```swift
var x = MyEnumeration.someValue
x = .anotherValue
```

<!--
  - test: `implicitMemberEnum`

  ```swifttest
  >> enum MyEnumeration { case someValue, anotherValue }
  -> var x = MyEnumeration.someValue
  -> x = .anotherValue
  ```
-->

If the inferred type is an optional,
you can also use a member of the non-optional type
in an implicit member expression.

```swift
var someOptional: MyEnumeration? = .someValue
```

<!--
  - test: `implicitMemberEnum`

  ```swifttest
  -> var someOptional: MyEnumeration? = .someValue
  ```
-->

Implicit member expressions can be followed by
a postfix operator or other postfix syntax listed in
<doc:Expressions#Postfix-Expressions>.
This is called a *chained implicit member expression*.
Although it's common for all of the chained postfix expressions
to have the same type,
the only requirement is that the whole chained implicit member expression
needs to be convertible to the type implied by its context.
Specifically,
if the implied type is an optional
you can use a value of the non-optional type,
and if the implied type is a class type
you can use a value of one of its subclasses.
For example:

```swift
class SomeClass {
    static var shared = SomeClass()
    static var sharedSubclass = SomeSubclass()
    var a = AnotherClass()
}
class SomeSubclass: SomeClass { }
class AnotherClass {
    static var s = SomeClass()
    func f() -> SomeClass { return AnotherClass.s }
}
let x: SomeClass = .shared.a.f()
let y: SomeClass? = .shared
let z: SomeClass = .sharedSubclass
```

<!--
  - test: `implicit-member-chain`

  ```swifttest
  -> class SomeClass {
         static var shared = SomeClass()
         static var sharedSubclass = SomeSubclass()
         var a = AnotherClass()
     }
  -> class SomeSubclass: SomeClass { }
  -> class AnotherClass {
         static var s = SomeClass()
         func f() -> SomeClass { return AnotherClass.s }
     }
  -> let x: SomeClass = .shared.a.f()
  -> let y: SomeClass? = .shared
  -> let z: SomeClass = .sharedSubclass
  ```
-->

In the code above,
the type of `x` matches the type implied by its context exactly,
the type of `y` is convertible from `SomeClass` to `SomeClass?`,
and the type of `z` is convertible from `SomeSubclass` to `SomeClass`.

> Grammar of an implicit member expression:
>
> *implicit-member-expression* → **`.`** *identifier* \
> *implicit-member-expression* → **`.`** *identifier* **`.`** *postfix-expression*

<!--
  The grammar above allows the additional pieces tested below,
  which work even though they're omitted from the SE-0287 list.
  The grammar also overproduces, allowing any primary expression
  because of the definition of postfix-expression.
-->

<!--
  - test: `implicit-member-grammar`

  ```swifttest
  // self expression
  >> enum E { case left, right }
  >> let e: E = .left
  >> let e2: E = .left.self
  >> assert(e == e2)

  // postfix operator
  >> postfix operator ~
  >> extension E {
  >>     static postfix func ~ (e: E) -> E {
  >>         switch e {
  >>         case .left: return .right
  >>         case .right: return .left
  >>         }
  >>     }
  >> }
  >> let e3: E = .left~
  >> assert(e3 == .right)

  // initializer expression
  >> class S {
  >>     var num: Int
  >>     init(bestNumber: Int) { self.num = bestNumber }
  >> }
  >> let s: S = .init(bestNumber: 42)
  ```
-->

### Parenthesized Expression

A *parenthesized expression* consists of
an expression surrounded by parentheses.
You can use parentheses to specify the precedence of operations
by explicitly grouping expressions.
Grouping parentheses don't change an expression's type ---
for example, the type of `(1)` is simply `Int`.

<!--
  See "Tuple Expression" below for langref grammar.
-->

> Grammar of a parenthesized expression:
>
> *parenthesized-expression* → **`(`** *expression* **`)`**

### Tuple Expression

A *tuple expression* consists of
a comma-separated list of expressions surrounded by parentheses.
Each expression can have an optional identifier before it,
separated by a colon (`:`).
It has the following form:

```swift
(<#identifier 1#>: <#expression 1#>, <#identifier 2#>: <#expression 2#>, <#...#>)
```

Each identifier in a tuple expression must be unique
within the scope of the tuple expression.
In a nested tuple expression,
identifiers at the same level of nesting must be unique.
For example,
`(a: 10, a: 20)` is invalid
because the label `a` appears twice at the same level.
However, `(a: 10, b: (a: 1, x: 2))` is valid ---
although `a` appears twice,
it appears once in the outer tuple and once in the inner tuple.

<!--
  - test: `tuple-labels-must-be-unique`

  ```swifttest
  >> let bad = (a: 10, a: 20)
  >> let good = (a: 10, b: (a: 1, x: 2))
  !$ error: cannot create a tuple with a duplicate element label
  !! let bad = (a: 10, a: 20)
  !! ^
  ```
-->

A tuple expression can contain zero expressions,
or it can contain two or more expressions.
A single expression inside parentheses is a parenthesized expression.

> Note: Both an empty tuple expression and an empty tuple type
> are written `()` in Swift.
> Because `Void` is a type alias for `()`,
> you can use it to write an empty tuple type.
> However, like all type aliases, `Void` is always a type ---
> you can't use it to write an empty tuple expression.

> Grammar of a tuple expression:
>
> *tuple-expression* → **`(`** **`)`** | **`(`** *tuple-element* **`,`** *tuple-element-list* **`)`** \
> *tuple-element-list* → *tuple-element* | *tuple-element* **`,`** *tuple-element-list* \
> *tuple-element* → *expression* | *identifier* **`:`** *expression*

### Wildcard Expression

A *wildcard expression*
is used to explicitly ignore a value during an assignment.
For example, in the following assignment
10 is assigned to `x` and 20 is ignored:

```swift
(x, _) = (10, 20)
// x is 10, and 20 is ignored
```

<!--
  - test: `wildcardTuple`

  ```swifttest
  >> var (x, _) = (10, 20)
  -> (x, _) = (10, 20)
  -> // x is 10, and 20 is ignored
  ```
-->

> Grammar of a wildcard expression:
>
> *wildcard-expression* → **`_`**

### Macro-Expansion Expression

A *macro-expansion expression* consists of a macro name
followed by a comma-separated list of the macro's arguments in parentheses.
The macro is expanded at compile time.
Macro-expansion expressions have the following form:

```swift
<#macro name#>(<#macro argument 1#>, <#macro argument 2#>)
```

A macro-expansion expression omits the parentheses after the macro's name
if the macro doesn't take any arguments.

A macro-expansion expression can appear as the default value for a parameter.
When used as the default value of a function or method parameter,
macros are evaluated using the source code location of the call site,
not the location where they appear in a function definition.
However, when a default value is a larger expression
that contains a macro in addition to other code,
those macros are evaluated where they appear in the function definition.

```swift
func f(a: Int = #line, b: Int = (#line), c: Int = 100 + #line) {
    print(a, b, c)
}
f()  // Prints "4 1 101"
```

In the function above,
the default value for `a` is a single macro expression,
so that macro is evaluated using the source code location
where `f(a:b:c:)` is called.
In contrast, the values for `b` and `c`
are expressions that contain a macro ---
the macros in those expressions are evaluated
using the source code location where `f(a:b:c:)` is defined.

When you use a macro as a default value,
it's type checked without expanding the macro,
to check the following requirements:

- The macro's access level
  is the same as or less restrictive than the function that uses it.
- The macro either takes no arguments,
  or its arguments are literals without string interpolation.
- The macro's return type matches the parameter's type.

You use macro expressions to call freestanding macros.
To call an attached macro,
use the custom attribute syntax described in <doc:Attributes>.
Both freestanding and attached macros expand as follows:

1. Swift parses the source code
   to produce an abstract syntax tree (AST).

2. The macro implementation receives AST nodes as its input
   and performs the transformations needed by that macro.

3. The transformed AST nodes that the macro implementation produced
   are added to the original AST.

The expansion of each macro is independent and self-contained.
However, as a performance optimization,
Swift might start an external process that implements the macro
and reuse the same process to expand multiple macros.
When you implement a macro,
that code must not depend on what macros your code previously expanded,
or on any other external state like the current time.

For nested macros and attached macros that have multiple roles,
the expansion process repeats.
Nested macro-expansion expressions expand from the outside in.
For example, in the code below
`outerMacro(_:)` expands first and the unexpanded call to `innerMacro(_:)`
appears in the abstract syntax tree
that `outerMacro(_:)` receives as its input.

```swift
#outerMacro(12, #innerMacro(34), "some text")
```

An attached macro that has multiple roles expands once for each role.
Each expansion receives the same, original, AST as its input.
Swift forms the overall expansion
by collecting all of the generated AST nodes
and putting them in their corresponding places in the AST.

For an overview of macros in Swift, see <doc:Macros>.

> Grammar of a macro-expansion expression:
>
> *macro-expansion-expression* → **`#`** *identifier* *generic-argument-clause*_?_ *function-call-argument-clause*_?_ *trailing-closures*_?_

### Key-Path Expression

A *key-path expression*
refers to a property or subscript of a type.
You use key-path expressions
in dynamic programming tasks,
such as key-value observing.
They have the following form:

```swift
\<#type name#>.<#path#>
```

The *type name* is the name of a concrete type,
including any generic parameters,
such as `String`, `[Int]`, or `Set<Int>`.

The *path* consists of
property names, subscripts, optional-chaining expressions,
and forced unwrapping expressions.
Each of these key-path components
can be repeated as many times as needed,
in any order.

At compile time, a key-path expression
is replaced by an instance
of the [`KeyPath`](https://developer.apple.com/documentation/swift/keypath) class.

To access a value using a key path,
pass the key path to the `subscript(keyPath:)` subscript,
which is available on all types.
For example:

<!--
  The subscript name subscript(keyPath:) above is a little odd,
  but it matches what would be displayed on the web.
  There isn't actually an extension on Any that implements this subscript;
  it's a special case in the compiler.
-->

```swift
struct SomeStructure {
    var someValue: Int
}

let s = SomeStructure(someValue: 12)
let pathToProperty = \SomeStructure.someValue

let value = s[keyPath: pathToProperty]
// value is 12
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> struct SomeStructure {
         var someValue: Int
     }

  -> let s = SomeStructure(someValue: 12)
  -> let pathToProperty = \SomeStructure.someValue

  -> let value = s[keyPath: pathToProperty]
  /> value is \(value)
  </ value is 12
  ```
-->

The *type name* can be omitted
in contexts where type inference
can determine the implied type.
The following code uses `\.someProperty`
instead of `\SomeClass.someProperty`:

```swift
class SomeClass: NSObject {
    @objc dynamic var someProperty: Int
    init(someProperty: Int) {
        self.someProperty = someProperty
    }
}

let c = SomeClass(someProperty: 10)
c.observe(\.someProperty) { object, change in
    // ...
}
```

<!--
  - test: `keypath-expression-implicit-type-name`

  ```swifttest
  >> import Foundation
  -> class SomeClass: NSObject {
  ->     @objc dynamic var someProperty: Int
  ->     init(someProperty: Int) {
  ->         self.someProperty = someProperty
  ->     }
  -> }

  -> let c = SomeClass(someProperty: 10)
  >> let r0 =
  -> c.observe(\.someProperty) { object, change in
         // ...
     }
  ```
-->

<!--
  Rewrite the above to avoid discarding the function's return value.
  Tracking bug is <rdar://problem/35301593>
-->

The *path* can refer to `self` to create the identity key path (`\.self`).
The identity key path refers to a whole instance,
so you can use it to access and change all of the data stored in a variable
in a single step.
For example:

```swift
var compoundValue = (a: 1, b: 2)
// Equivalent to compoundValue = (a: 10, b: 20)
compoundValue[keyPath: \.self] = (a: 10, b: 20)
```

<!--
  - test: `keypath-expression-self-keypath`

  ```swifttest
  -> var compoundValue = (a: 1, b: 2)
  // Equivalent to compoundValue = (a: 10, b: 20)
  -> compoundValue[keyPath: \.self] = (a: 10, b: 20)
  ```
-->

The *path* can contain multiple property names,
separated by periods,
to refer to a property of a property's value.
This code uses the key path expression
`\OuterStructure.outer.someValue`
to access the `someValue` property
of the `OuterStructure` type's `outer` property:

```swift
struct OuterStructure {
    var outer: SomeStructure
    init(someValue: Int) {
        self.outer = SomeStructure(someValue: someValue)
    }
}

let nested = OuterStructure(someValue: 24)
let nestedKeyPath = \OuterStructure.outer.someValue

let nestedValue = nested[keyPath: nestedKeyPath]
// nestedValue is 24
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> struct OuterStructure {
         var outer: SomeStructure
         init(someValue: Int) {
             self.outer = SomeStructure(someValue: someValue)
         }
     }

  -> let nested = OuterStructure(someValue: 24)
  -> let nestedKeyPath = \OuterStructure.outer.someValue

  -> let nestedValue = nested[keyPath: nestedKeyPath]
  /> nestedValue is \(nestedValue)
  </ nestedValue is 24
  ```
-->

The *path* can include subscripts using brackets,
as long as the subscript's parameter type conforms to the `Hashable` protocol.
This example uses a subscript in a key path
to access the second element of an array:

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
// myGreeting is 'hola'
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> let greetings = ["hello", "hola", "bonjour", "안녕"]
  -> let myGreeting = greetings[keyPath: \[String].[1]]
  /> myGreeting is '\(myGreeting)'
  </ myGreeting is 'hola'
  ```
-->

<!--
  TODO: Update examples here and below to remove type names once
  inference bugs are fixed. The compiler currently gives an error
  that the usage is ambiguous.
  <rdar://problem/34376681> [SR-5865]: Key path expression is "ambiguous without more context"
-->

The value used in a subscript can be a named value or a literal.
Values are captured in key paths using value semantics.
The following code uses the variable `index`
in both a key-path expression and in a closure to access
the third element of the `greetings` array.
When `index` is modified,
the key-path expression still references the third element,
while the closure uses the new index.

```swift
var index = 2
let path = \[String].[index]
let fn: ([String]) -> String = { strings in strings[index] }

print(greetings[keyPath: path])
// Prints "bonjour".
print(fn(greetings))
// Prints "bonjour".

// Setting 'index' to a new value doesn't affect 'path'
index += 1
print(greetings[keyPath: path])
// Prints "bonjour".

// Because 'fn' closes over 'index', it uses the new value
print(fn(greetings))
// Prints "안녕".
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> var index = 2
  -> let path = \[String].[index]
  -> let fn: ([String]) -> String = { strings in strings[index] }

  -> print(greetings[keyPath: path])
  <- bonjour
  -> print(fn(greetings))
  <- bonjour

  // Setting 'index' to a new value doesn't affect 'path'
  -> index += 1
  -> print(greetings[keyPath: path])
  <- bonjour

  // Because 'fn' closes over 'index', it uses the new value
  -> print(fn(greetings))
  <- 안녕
  ```
-->

The *path* can use optional chaining and forced unwrapping.
This code uses optional chaining in a key path
to access a property of an optional string:

```swift
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// Prints "Optional(5)".

// Do the same thing using a key path.
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// Prints "Optional(5)".
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> let firstGreeting: String? = greetings.first
  -> print(firstGreeting?.count as Any)
  <- Optional(5)

  // Do the same thing using a key path.
  -> let count = greetings[keyPath: \[String].first?.count]
  -> print(count as Any)
  <- Optional(5)
  ```
-->

<!--
  The test above is failing, which appears to be a compiler bug.
  <rdar://problem/58484319> Swift 5.2 regression in keypaths
-->

You can mix and match components of key paths to access values
that are deeply nested within a type.
The following code accesses different values and properties
of a dictionary of arrays
by using key-path expressions
that combine these components.

```swift
let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                          "triangular": [1, 3, 6, 10, 15, 21, 28],
                          "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
// Prints "Optional([2, 3, 5, 7, 11, 13, 17])".
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
// Prints "2".
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
// Prints "7".
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
// Prints "64".
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                               "triangular": [1, 3, 6, 10, 15, 21, 28],
                               "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
  -> print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
  <- Optional([2, 3, 5, 7, 11, 13, 17])
  -> print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
  <- 2
  -> print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
  <- 7
  -> print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
  <- 64
  ```
-->

You can use a key path expression
in contexts where you would normally provide a function or closure.
Specifically,
you can use a key path expression
whose root type is `SomeType`
and whose path produces a value of type `Value`,
instead of a function or closure of type `(SomeType) -> Value`.

```swift
struct Task {
    var description: String
    var completed: Bool
}
var toDoList = [
    Task(description: "Practice ping-pong.", completed: false),
    Task(description: "Buy a pirate costume.", completed: true),
    Task(description: "Visit Boston in the Fall.", completed: false),
]

// Both approaches below are equivalent.
let descriptions = toDoList.filter(\.completed).map(\.description)
let descriptions2 = toDoList.filter { $0.completed }.map { $0.description }
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> struct Task {
         var description: String
         var completed: Bool
     }
  -> var toDoList = [
         Task(description: "Practice ping-pong.", completed: false),
         Task(description: "Buy a pirate costume.", completed: true),
         Task(description: "Visit Boston in the Fall.", completed: false),
     ]

  // Both approaches below are equivalent.
  -> let descriptions = toDoList.filter(\.completed).map(\.description)
  -> let descriptions2 = toDoList.filter { $0.completed }.map { $0.description }
  >> assert(descriptions == descriptions2)
  ```
-->

<!--
  REFERENCE
  The to-do list above draws from the lyrics of the song
  "The Pirates Who Don't Do Anything".
-->

Any side effects of a key path expression
are evaluated only at the point where the expression is evaluated.
For example,
if you make a function call inside a subscript in a key path expression,
the function is called only once as part of evaluating the expression,
not every time the key path is used.

```swift
func makeIndex() -> Int {
    print("Made an index")
    return 0
}
// The line below calls makeIndex().
let taskKeyPath = \[Task][makeIndex()]
// Prints "Made an index".

// Using taskKeyPath doesn't call makeIndex() again.
let someTask = toDoList[keyPath: taskKeyPath]
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> func makeIndex() -> Int {
         print("Made an index")
         return 0
     }
  // The line below calls makeIndex().
  -> let taskKeyPath = \[Task][makeIndex()]
  <- Made an index
  >> print(type(of: taskKeyPath))
  << WritableKeyPath<Array<Task>, Task>

  // Using taskKeyPath doesn't call makeIndex() again.
  -> let someTask = toDoList[keyPath: taskKeyPath]
  ```
-->

For more information about using key paths
in code that interacts with Objective-C APIs,
see [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
For information about key-value coding and key-value observing,
see [Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
and [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> Grammar of a key-path expression:
>
> *key-path-expression* → **`\`** *type*_?_ **`.`** *key-path-components* \
> *key-path-components* → *key-path-component* | *key-path-component* **`.`** *key-path-components* \
> *key-path-component* → *identifier* *key-path-postfixes*_?_ | *key-path-postfixes*
>
> *key-path-postfixes* → *key-path-postfix* *key-path-postfixes*_?_ \
> *key-path-postfix* → **`?`** | **`!`** | **`self`** | **`[`** *function-call-argument-list* **`]`**

### Selector Expression

A selector expression lets you access the selector
used to refer to a method or to a property's
getter or setter in Objective-C.
It has the following form:

```swift
#selector(<#method name#>)
#selector(getter: <#property name#>)
#selector(setter: <#property name#>)
```

The *method name* and *property name* must be a reference to a method or a property
that's available in the Objective-C runtime.
The value of a selector expression is an instance of the `Selector` type.
For example:

```swift
class SomeClass: NSObject {
    @objc let property: String

    @objc(doSomethingWithInt:)
    func doSomething(_ x: Int) { }

    init(property: String) {
        self.property = property
    }
}
let selectorForMethod = #selector(SomeClass.doSomething(_:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```

<!--
  - test: `selector-expression`

  ```swifttest
  >> import Foundation
  -> class SomeClass: NSObject {
  ->     @objc let property: String

  ->     @objc(doSomethingWithInt:)
         func doSomething(_ x: Int) { }

         init(property: String) {
             self.property = property
         }
     }
  -> let selectorForMethod = #selector(SomeClass.doSomething(_:))
  -> let selectorForPropertyGetter = #selector(getter: SomeClass.property)
  ```
-->

When creating a selector for a property's getter,
the *property name* can be a reference to a variable or constant property.
In contrast, when creating a selector for a property's setter,
the *property name* must be a reference to a variable property only.

The *method name* can contain parentheses for grouping,
as well the `as` operator to disambiguate between methods that share a name
but have different type signatures.
For example:

```swift
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
```

<!--
  - test: `selector-expression-with-as`

  ```swifttest
  >> import Foundation
  >> class SomeClass: NSObject {
  >>     @objc let property: String
  >>     @objc(doSomethingWithInt:)
  >>     func doSomething(_ x: Int) {}
  >>     init(property: String) {
  >>         self.property = property
  >>     }
  >> }
  -> extension SomeClass {
  ->     @objc(doSomethingWithString:)
         func doSomething(_ x: String) { }
     }
  -> let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
  ```
-->

Because a selector is created at compile time, not at runtime,
the compiler can check that a method or property exists
and that they're exposed to the Objective-C runtime.

> Note: Although the *method name* and the *property name* are expressions,
> they're never evaluated.

For more information about using selectors
in Swift code that interacts with Objective-C APIs,
see [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).

> Grammar of a selector expression:
>
> *selector-expression* → **`#selector`** **`(`** *expression* **`)`** \
> *selector-expression* → **`#selector`** **`(`** **`getter:`** *expression* **`)`** \
> *selector-expression* → **`#selector`** **`(`** **`setter:`** *expression* **`)`**

<!--
  Note: The parser does allow an arbitrary expression inside #selector(), not
  just a member name.  For example, see changes in Swift commit ef60d7289d in
  lib/Sema/CSApply.cpp -- there's explicit code to look through parens and
  optional binding.
-->

### Key-Path String Expression

A key-path string expression lets you access the string
used to refer to a property in Objective-C,
for use in key-value coding and key-value observing APIs.
It has the following form:

```swift
#keyPath(<#property name#>)
```

The *property name* must be a reference to a property
that's available in the Objective-C runtime.
At compile time, the key-path string expression is replaced by a string literal.
For example:

```swift
class SomeClass: NSObject {
    @objc var someProperty: Int
    init(someProperty: Int) {
       self.someProperty = someProperty
    }
}

let c = SomeClass(someProperty: 12)
let keyPath = #keyPath(SomeClass.someProperty)

if let value = c.value(forKey: keyPath) {
    print(value)
}
// Prints "12".
```

<!--
  - test: `keypath-string-expression`

  ```swifttest
  >> import Foundation
  -> class SomeClass: NSObject {
  ->    @objc var someProperty: Int
        init(someProperty: Int) {
            self.someProperty = someProperty
        }
     }

  -> let c = SomeClass(someProperty: 12)
  -> let keyPath = #keyPath(SomeClass.someProperty)

  -> if let value = c.value(forKey: keyPath) {
  ->     print(value)
  -> }
  <- 12
  ```
-->

When you use a key-path string expression within a class,
you can refer to a property of that class
by writing just the property name, without the class name.

```swift
extension SomeClass {
    func getSomeKeyPath() -> String {
        return #keyPath(someProperty)
    }
}
print(keyPath == c.getSomeKeyPath())
// Prints "true".
```

<!--
  - test: `keypath-string-expression`

  ```swifttest
  -> extension SomeClass {
        func getSomeKeyPath() -> String {
           return #keyPath(someProperty)
        }
     }
  -> print(keyPath == c.getSomeKeyPath())
  <- true
  ```
-->

Because the key path string is created at compile time, not at runtime,
the compiler can check that the property exists
and that the property is exposed to the Objective-C runtime.

For more information about using key paths
in Swift code that interacts with Objective-C APIs,
see [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
For information about key-value coding and key-value observing,
see [Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
and [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> Note: Although the *property name* is an expression, it's never evaluated.

> Grammar of a key-path string expression:
>
> *key-path-string-expression* → **`#keyPath`** **`(`** *expression* **`)`**

## Postfix Expressions

*Postfix expressions* are formed
by applying a postfix operator or other postfix syntax
to an expression.
Syntactically, every primary expression is also a postfix expression.

For information about the behavior of these operators,
see <doc:BasicOperators> and <doc:AdvancedOperators>.

For information about the operators provided by the Swift standard library,
see [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> Grammar of a postfix expression:
>
> *postfix-expression* → *primary-expression* \
> *postfix-expression* → *postfix-expression* *postfix-operator* \
> *postfix-expression* → *function-call-expression* \
> *postfix-expression* → *initializer-expression* \
> *postfix-expression* → *explicit-member-expression* \
> *postfix-expression* → *postfix-self-expression* \
> *postfix-expression* → *subscript-expression* \
> *postfix-expression* → *forced-value-expression* \
> *postfix-expression* → *optional-chaining-expression*

### Function Call Expression

<!--
  TODO: After we rewrite function decls,
  revisit this section to make sure that the names for things match.
-->

A *function call expression* consists of a function name
followed by a comma-separated list of the function's arguments in parentheses.
Function call expressions have the following form:

```swift
<#function name#>(<#argument value 1#>, <#argument value 2#>)
```

The *function name* can be any expression whose value is of a function type.

If the function definition includes names for its parameters,
the function call must include names before its argument values,
separated by a colon (`:`).
This kind of function call expression has the following form:

```swift
<#function name#>(<#argument name 1#>: <#argument value 1#>, <#argument name 2#>: <#argument value 2#>)
```

A function call expression can include trailing closures
in the form of closure expressions immediately after the closing parenthesis.
The trailing closures are understood as arguments to the function,
added after the last parenthesized argument.
The first closure expression is unlabeled;
any additional closure expressions are preceded by their argument labels.
The example below shows the equivalent version of function calls
that do and don't use trailing closure syntax:

```swift
// someFunction takes an integer and a closure as its arguments
someFunction(x: x, f: { $0 == 13 })
someFunction(x: x) { $0 == 13 }

// anotherFunction takes an integer and two closures as its arguments
anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
anotherFunction(x: x) { $0 == 13 } g: { print(99) }
```

<!--
  - test: `trailing-closure`

  ```swifttest
  >> func someFunction (x: Int, f: (Int) -> Bool) -> Bool {
  >>    return f(x)
  >> }
  >> let x = 10
  // someFunction takes an integer and a closure as its arguments
  >> let r0 =
  -> someFunction(x: x, f: { $0 == 13 })
  >> assert(r0 == false)
  >> let r1 =
  -> someFunction(x: x) { $0 == 13 }
  >> assert(r1 == false)

  >> func anotherFunction(x: Int, f: (Int) -> Bool, g: () -> Void) -> Bool {
  >>    g(); return f(x)
  >> }
  // anotherFunction takes an integer and two closures as its arguments
  >> let r2 =
  -> anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
  << 99
  >> assert(r2 == false)
  >> let r3 =
  -> anotherFunction(x: x) { $0 == 13 } g: { print(99) }
  << 99
  >> assert(r3 == false)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

If the trailing closure is the function's only argument,
you can omit the parentheses.

```swift
// someMethod takes a closure as its only argument
myData.someMethod() { $0 == 13 }
myData.someMethod { $0 == 13 }
```

<!--
  - test: `no-paren-trailing-closure`

  ```swifttest
  >> class Data {
  >>    let data = 10
  >>    func someMethod(f: (Int) -> Bool) -> Bool {
  >>       return f(self.data)
  >>    }
  >> }
  >> let myData = Data()
  // someMethod takes a closure as its only argument
  >> let r0 =
  -> myData.someMethod() { $0 == 13 }
  >> assert(r0 == false)
  >> let r1 =
  -> myData.someMethod { $0 == 13 }
  >> assert(r1 == false)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

To include the trailing closures in the arguments,
the compiler examines the function's parameters from left to right as follows:

| Trailing Closure | Parameter | Action |
| ---------------- | --------- | ------ |
| Labeled | Labeled | If the labels are the same, the closure matches the parameter; otherwise, the parameter is skipped. |
| Labeled | Unlabeled | The parameter is skipped. |
| Unlabeled | Labeled or unlabeled | If the parameter structurally resembles a function type, as defined below, the closure matches the parameter; otherwise, the parameter is skipped. |

The trailing closure is passed as the argument for the parameter that it matches.
Parameters that were skipped during the scanning process
don't have an argument passed to them ---
for example, they can use a default parameter.
After finding a match, scanning continues
with the next trailing closure and the next parameter.
At the end of the matching process,
all trailing closures must have a match.

A parameter *structurally resembles* a function type
if the parameter isn't an in-out parameter,
and the parameter is one of the following:

- A parameter whose type is a function type,
  like `(Bool) -> Int`
- An autoclosure parameter
  whose wrapped expression's type is a function type,
  like `@autoclosure () -> ((Bool) -> Int)`
- A variadic parameter
  whose array element type is a function type,
  like `((Bool) -> Int)...`
- A parameter whose type is wrapped in one or more layers of optional,
  like `Optional<(Bool) -> Int>`
- A parameter whose type combines these allowed types,
  like `(Optional<(Bool) -> Int>)...`

When a trailing closure is matched to a parameter
whose type structurally resembles a function type, but isn't a function,
the closure is wrapped as needed.
For example, if the parameter's type is an optional type,
the closure is wrapped in `Optional` automatically.

<!--
  - test: `when-can-you-use-trailing-closure`

  ```swifttest
  // These tests match the example types given above
  // when describing what "structurally resembles" a function type.

  >> func f1(x: Int, y: (Bool)->Int) { print(x + y(true)) }
  >> f1(x: 10) { $0 ? 1 : 100 }
  << 11
  >> func f2(x: Int, y: @autoclosure ()->((Bool)->Int)) { print(x + y()(false)) }
  >> f2(x: 20) { $0 ? 2 : 200 }
  << 220
  >> func f3(x: Int, y: ((Bool)->Int)...) { print(x + y[0](true)) }
  >> f3(x: 30) { $0 ? 3 : 300}
  << 33
  >> func f4(x: Int, y: Optional<(Bool)->Int>) { print(x + y!(false)) }
  >> f4(x: 40) { $0 ? 4 : 400 }
  << 440
  >> func f5(x: Int, y: (Optional<(Bool) -> Int>)...) { print(x + y[0]!(true)) }
  >> f5(x: 50) { $0 ? 5 : 500 }
  << 55
  ```
-->

To ease migration of code from versions of Swift prior to 5.3 ---
which performed this matching from right to left ---
the compiler checks both the left-to-right and right-to-left orderings.
If the scan directions produce different results,
the old right-to-left ordering is used
and the compiler generates a warning.
A future version of Swift will always use the left-to-right ordering.

```swift
typealias Callback = (Int) -> Int
func someFunction(firstClosure: Callback? = nil,
                secondClosure: Callback? = nil) {
    let first = firstClosure?(10)
    let second = secondClosure?(20)
    print(first ?? "-", second ?? "-")
}

someFunction()  // Prints "- -"
someFunction { return $0 + 100 }  // Ambiguous
someFunction { return $0 } secondClosure: { return $0 }  // Prints "10 20"
```

<!--
  - test: `trailing-closure-scanning-direction`

  ```swifttest
  -> typealias Callback = (Int) -> Int
  -> func someFunction(firstClosure: Callback? = nil,
                     secondClosure: Callback? = nil) {
         let first = firstClosure?(10)
         let second = secondClosure?(20)
         print(first ?? "-", second ?? "-")
     }

  -> someFunction()  // Prints "- -"
  << - -
  -> someFunction { return $0 + 100 }  // Ambiguous
  << - 120
  !$ warning: backward matching of the unlabeled trailing closure is deprecated; label the argument with 'secondClosure' to suppress this warning
  !! someFunction { return $0 + 100 }  // Ambiguous
  !!              ^
  !!              (secondClosure:     )
  !$ note: 'someFunction(firstClosure:secondClosure:)' declared here
  !! func someFunction(firstClosure: Callback? = nil,
  !!      ^
  -> someFunction { return $0 } secondClosure: { return $0 }  // Prints "10 20"
  << 10 20
  ```
-->

In the example above,
the function call marked "Ambiguous"
prints "- 120" and produces a compiler warning on Swift 5.3.
A future version of Swift will print “110 -”.

<!--
  Smart quotes on the line above are needed
  because the regex heuristics gets the close quote wrong.
-->

A class, structure, or enumeration type
can enable syntactic sugar for function call syntax
by declaring one of several methods,
as described in <doc:Declarations#Methods-with-Special-Names>.

#### Implicit Conversion to a Pointer Type

In a function call expression,
if the argument and parameter have a different type,
the compiler tries to make their types match
by applying one of the implicit conversions in the following list:

- `inout SomeType` can become
  `UnsafePointer<SomeType>` or `UnsafeMutablePointer<SomeType>`
- `inout Array<SomeType>` can become
  `UnsafePointer<SomeType>` or `UnsafeMutablePointer<SomeType>`
- `Array<SomeType>` can become `UnsafePointer<SomeType>`
- `String` can become `UnsafePointer<CChar>`

The following two function calls are equivalent:

```swift
func unsafeFunction(pointer: UnsafePointer<Int>) {
    // ...
}
var myNumber = 1234

unsafeFunction(pointer: &myNumber)
withUnsafePointer(to: myNumber) { unsafeFunction(pointer: $0) }
```

<!--
  - test: `inout-unsafe-pointer`

  ```swifttest
  -> func unsafeFunction(pointer: UnsafePointer<Int>) {
  ->     // ...
  >>     print(pointer.pointee)
  -> }
  -> var myNumber = 1234

  -> unsafeFunction(pointer: &myNumber)
  -> withUnsafePointer(to: myNumber) { unsafeFunction(pointer: $0) }
  << 1234
  << 1234
  ```
-->

A pointer that's created by these implicit conversions
is valid only for the duration of the function call.
To avoid undefined behavior,
ensure that your code
never persists the pointer after the function call ends.

> Note: When implicitly converting an array to an unsafe pointer,
> Swift ensures that the array's storage is contiguous
> by converting or copying the array as needed.
> For example, you can use this syntax
> with an array that was bridged to `Array`
> from an `NSArray` subclass that makes no API contract about its storage.
> If you need to guarantee that the array's storage is already contiguous,
> so the implicit conversion never needs to do this work,
> use `ContiguousArray` instead of `Array`.

Using `&` instead of an explicit function like `withUnsafePointer(to:)`
can help make calls to low-level C functions more readable,
especially when the function takes several pointer arguments.
However, when calling functions from other Swift code,
avoid using `&` instead of using the unsafe APIs explicitly.

<!--
  - test: `implicit-conversion-to-pointer`

  ```swifttest
  >> import Foundation
  >> func takesUnsafePointer(p: UnsafePointer<Int>) { }
  >> func takesUnsafeMutablePointer(p: UnsafeMutablePointer<Int>) { }
  >> func takesUnsafePointerCChar(p: UnsafePointer<CChar>) { }
  >> func takesUnsafeMutablePointerCChar(p: UnsafeMutablePointer<CChar>) { }
  >> var n = 12
  >> var array = [1, 2, 3]
  >> var nsarray: NSArray = [10, 20, 30]
  >> var bridgedNSArray = nsarray as! Array<Int>
  >> var string = "Hello"

  // bullet 1
  >> takesUnsafePointer(p: &n)
  >> takesUnsafeMutablePointer(p: &n)

  // bullet 2
  >> takesUnsafePointer(p: &array)
  >> takesUnsafeMutablePointer(p: &array)
  >> takesUnsafePointer(p: &bridgedNSArray)
  >> takesUnsafeMutablePointer(p: &bridgedNSArray)

  // bullet 3
  >> takesUnsafePointer(p: array)
  >> takesUnsafePointer(p: bridgedNSArray)

  // bullet 4
  >> takesUnsafePointerCChar(p: string)

  // invalid conversions
  >> takesUnsafeMutablePointer(p: array)
  !$ error: cannot convert value of type '[Int]' to expected argument type 'UnsafeMutablePointer<Int>'
  !! takesUnsafeMutablePointer(p: array)
  !!                              ^
  >> takesUnsafeMutablePointerCChar(p: string)
  !$ error: cannot convert value of type 'String' to expected argument type 'UnsafeMutablePointer<CChar>' (aka 'UnsafeMutablePointer<Int8>')
  !! takesUnsafeMutablePointerCChar(p: string)
  !!                                   ^
  ```
-->

> Grammar of a function call expression:
>
> *function-call-expression* → *postfix-expression* *function-call-argument-clause* \
> *function-call-expression* → *postfix-expression* *function-call-argument-clause*_?_ *trailing-closures*
>
> *function-call-argument-clause* → **`(`** **`)`** | **`(`** *function-call-argument-list* **`)`** \
> *function-call-argument-list* → *function-call-argument* | *function-call-argument* **`,`** *function-call-argument-list* \
> *function-call-argument* → *expression* | *identifier* **`:`** *expression* \
> *function-call-argument* → *operator* | *identifier* **`:`** *operator*
>
> *trailing-closures* → *closure-expression* *labeled-trailing-closures*_?_ \
> *labeled-trailing-closures* → *labeled-trailing-closure* *labeled-trailing-closures*_?_ \
> *labeled-trailing-closure* → *identifier* **`:`** *closure-expression*

### Initializer Expression

An *initializer expression* provides access
to a type's initializer.
It has the following form:

```swift
<#expression#>.init(<#initializer arguments#>)
```

You use the initializer expression in a function call expression
to initialize a new instance of a type.
You also use an initializer expression
to delegate to the initializer of a superclass.

```swift
class SomeSubClass: SomeSuperClass {
    override init() {
        // subclass initialization goes here
        super.init()
    }
}
```

<!--
  - test: `init-call-superclass`

  ```swifttest
  >> class SomeSuperClass { }
  -> class SomeSubClass: SomeSuperClass {
  ->     override init() {
  ->         // subclass initialization goes here
  ->         super.init()
  ->     }
  -> }
  ```
-->

Like a function, an initializer can be used as a value.
For example:

```swift
// Type annotation is required because String has multiple initializers.
let initializer: (Int) -> String = String.init
let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
print(oneTwoThree)
// Prints "123".
```

<!--
  - test: `init-as-value`

  ```swifttest
  // Type annotation is required because String has multiple initializers.
  -> let initializer: (Int) -> String = String.init
  -> let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
  -> print(oneTwoThree)
  <- 123
  ```
-->

If you specify a type by name,
you can access the type's initializer without using an initializer expression.
In all other cases, you must use an initializer expression.

```swift
let s1 = SomeType.init(data: 3)  // Valid
let s2 = SomeType(data: 1)       // Also valid

let s3 = type(of: someValue).init(data: 7)  // Valid
let s4 = type(of: someValue)(data: 5)       // Error
```

<!--
  - test: `explicit-implicit-init`

  ```swifttest
  >> struct SomeType {
  >>     let data: Int
  >> }
  -> let s1 = SomeType.init(data: 3)  // Valid
  -> let s2 = SomeType(data: 1)       // Also valid

  >> let someValue = s1
  -> let s3 = type(of: someValue).init(data: 7)  // Valid
  -> let s4 = type(of: someValue)(data: 5)       // Error
  !$ error: initializing from a metatype value must reference 'init' explicitly
  !! let s4 = type(of: someValue)(data: 5)       // Error
  !!                              ^
  !!                              .init
  ```
-->

> Grammar of an initializer expression:
>
> *initializer-expression* → *postfix-expression* **`.`** **`init`** \
> *initializer-expression* → *postfix-expression* **`.`** **`init`** **`(`** *argument-names* **`)`**

### Explicit Member Expression

An *explicit member expression* allows access
to the members of a named type, a tuple, or a module.
It consists of a period (`.`) between the item
and the identifier of its member.

```swift
<#expression#>.<#member name#>
```

The members of a named type are named
as part of the type's declaration or extension.
For example:

```swift
class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // Member access
```

<!--
  - test: `explicitMemberExpression`

  ```swifttest
  -> class SomeClass {
         var someProperty = 42
     }
  -> let c = SomeClass()
  -> let y = c.someProperty  // Member access
  ```
-->

The members of a tuple
are implicitly named using integers in the order they appear,
starting from zero.
For example:

```swift
var t = (10, 20, 30)
t.0 = t.1
// Now t is (20, 20, 30)
```

<!--
  - test: `explicit-member-expression`

  ```swifttest
  -> var t = (10, 20, 30)
  -> t.0 = t.1
  -> // Now t is (20, 20, 30)
  ```
-->

The members of a module access
the top-level declarations of that module.

Types declared with the `dynamicMemberLookup` attribute
include members that are looked up at runtime,
as described in <doc:Attributes>.

To distinguish between methods or initializers
whose names differ only by the names of their arguments,
include the argument names in parentheses,
with each argument name followed by a colon (`:`).
Write an underscore (`_`) for an argument with no name.
To distinguish between overloaded methods,
use a type annotation.
For example:

```swift
class SomeClass {
    func someMethod(x: Int, y: Int) {}
    func someMethod(x: Int, z: Int) {}
    func overloadedMethod(x: Int, y: Int) {}
    func overloadedMethod(x: Int, y: Bool) {}
}
let instance = SomeClass()

let a = instance.someMethod              // Ambiguous
let b = instance.someMethod(x:y:)        // Unambiguous

let d = instance.overloadedMethod        // Ambiguous
let d = instance.overloadedMethod(x:y:)  // Still ambiguous
let d: (Int, Bool) -> Void  = instance.overloadedMethod(x:y:)  // Unambiguous
```

<!--
  - test: `function-with-argument-names`

  ```swifttest
  -> class SomeClass {
         func someMethod(x: Int, y: Int) {}
         func someMethod(x: Int, z: Int) {}
         func overloadedMethod(x: Int, y: Int) {}
         func overloadedMethod(x: Int, y: Bool) {}
     }
  -> let instance = SomeClass()

  -> let a = instance.someMethod              // Ambiguous
  !$ error: ambiguous use of 'someMethod'
  !! let a = instance.someMethod              // Ambiguous
  !!         ^
  !$ note: found this candidate
  !!              func someMethod(x: Int, y: Int) {}
  !!                   ^
  !$ note: found this candidate
  !!              func someMethod(x: Int, z: Int) {}
  !!                   ^
  -> let b = instance.someMethod(x:y:)        // Unambiguous

  -> let d = instance.overloadedMethod        // Ambiguous
  !$ error: ambiguous use of 'overloadedMethod(x:y:)'
  !! let d = instance.overloadedMethod        // Ambiguous
  !!         ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Int) {}
  !!                   ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Bool) {}
  !!                   ^
  -> let d = instance.overloadedMethod(x:y:)  // Still ambiguous
  !$ error: ambiguous use of 'overloadedMethod(x:y:)'
  !!     let d = instance.overloadedMethod(x:y:)  // Still ambiguous
  !!             ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Int) {}
  !!                   ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Bool) {}
  !!                   ^
  -> let d: (Int, Bool) -> Void  = instance.overloadedMethod(x:y:)  // Unambiguous
  ```
-->

If a period appears at the beginning of a line,
it's understood as part of an explicit member expression,
not as an implicit member expression.
For example, the following listing shows chained method calls
split over several lines:

```swift
let x = [10, 3, 20, 15, 4]
    .sorted()
    .filter { $0 > 5 }
    .map { $0 * 100 }
```

<!--
  - test: `period-at-start-of-line`

  ```swifttest
  -> let x = [10, 3, 20, 15, 4]
  ->     .sorted()
  ->     .filter { $0 > 5 }
  ->     .map { $0 * 100 }
  >> print(x)
  << [1000, 1500, 2000]
  ```
-->

You can combine this multiline chained syntax
with compiler control statements
to control when each method is called.
For example,
the following code uses a different filtering rule on iOS:

```swift
let numbers = [10, 20, 33, 43, 50]
#if os(iOS)
    .filter { $0 < 40 }
#else
    .filter { $0 > 25 }
#endif
```

<!--
  - test: `pound-if-inside-postfix-expression`

  ```swifttest
  -> let numbers = [10, 20, 33, 43, 50]
     #if os(iOS)
         .filter { $0 < 40 }
     #else
         .filter { $0 > 25 }
     #endif
  >> print(numbers)
  << [33, 43, 50]
  ```
-->

Between `#if`, `#endif`, and other compilation directives,
the conditional compilation block can contain
an implicit member expression
followed by zero or more postfixes,
to form a postfix expression.
It can also contain
another conditional compilation block,
or a combination of these expressions and blocks.

You can use this syntax anywhere that you can write
an explicit member expression,
not just in top-level code.

In the conditional compilation block,
the branch for the `#if` compilation directive
must contain at least one expression.
The other branches can be empty.

<!--
  - test: `pound-if-empty-if-not-allowed`

  ```swifttest
  >> let numbers = [10, 20, 33, 43, 50]
  >> #if os(iOS)
  >> #else
  >>     .filter { $0 > 25 }
  >> #endif
  !$ error: reference to member 'filter' cannot be resolved without a contextual type
  !! .filter { $0 > 25 }
  !! ~^~~~~~
  ```
-->

<!--
  - test: `pound-if-else-can-be-empty`

  ```swifttest
  >> let numbers = [10, 20, 33, 43, 50]
  >> #if os(iOS)
  >>     .filter { $0 > 25 }
  >> #else
  >> #endif
  >> print(numbers)
  << [10, 20, 33, 43, 50]
  ```
-->

<!--
  - test: `pound-if-cant-use-binary-operators`

  ```swifttest
  >> let s = "some string"
  >> #if os(iOS)
  >>     + " on iOS"
  >> #endif
  !$ error: unary operator cannot be separated from its operand
  !! + " on iOS"
  !! ^~
  !!-
  ```
-->

> Grammar of an explicit member expression:
>
> *explicit-member-expression* → *postfix-expression* **`.`** *decimal-digits* \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* *generic-argument-clause*_?_ \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* **`(`** *argument-names* **`)`** \
> *explicit-member-expression* → *postfix-expression* *conditional-compilation-block*
>
> *argument-names* → *argument-name* *argument-names*_?_ \
> *argument-name* → *identifier* **`:`**

<!--
  The grammar for method-name doesn't include the following:
      method-name -> identifier argument-names-OPT
  because the "postfix-expression . identifier" line above already covers that case.
-->

<!--
  See grammar for initializer-expression for the related "argument name" production there.
-->

### Postfix Self Expression

A postfix `self` expression consists of an expression or the name of a type,
immediately followed by `.self`. It has the following forms:

```swift
<#expression#>.self
<#type#>.self
```

The first form evaluates to the value of the *expression*.
For example, `x.self` evaluates to `x`.

The second form evaluates to the value of the *type*. Use this form
to access a type as a value. For example,
because `SomeClass.self` evaluates to the `SomeClass` type itself,
you can pass it to a function or method that accepts a type-level argument.

> Grammar of a postfix self expression:
>
> *postfix-self-expression* → *postfix-expression* **`.`** **`self`**

### Subscript Expression

A *subscript expression* provides subscript access
using the getter and setter
of the corresponding subscript declaration.
It has the following form:

```swift
<#expression#>[<#index expressions#>]
```

To evaluate the value of a subscript expression,
the subscript getter for the *expression*'s type is called
with the *index expressions* passed as the subscript parameters.
To set its value,
the subscript setter is called in the same way.

<!--
  TR: Confirm that indexing on
  a comma-separated list of expressions
  is intentional, not just a side effect.
  I see this working, for example:
  (swift) class Test {
            subscript(a: Int, b: Int) -> Int { return 12 }
          }
  (swift) var t = Test()
  // t : Test = <Test instance>
  (swift) t[1, 2]
  // r0 : Int = 12
-->

For information about subscript declarations,
see <doc:Declarations#Protocol-Subscript-Declaration>.

> Grammar of a subscript expression:
>
> *subscript-expression* → *postfix-expression* **`[`** *function-call-argument-list* **`]`**

<!--
  - test: `subscripts-can-take-operators`

  ```swifttest
  >> struct S {
         let x: Int
         let y: Int
         subscript(operation: (Int, Int) -> Int) -> Int {
             return operation(x, y)
         }
     }
  >> let s = S(x: 10, y: 20)
  >> assert(s[+] == 30)
  ```
-->

### Forced-Value Expression

A *forced-value expression* unwraps an optional value
that you are certain isn't `nil`.
It has the following form:

```swift
<#expression#>!
```

If the value of the *expression* isn't `nil`,
the optional value is unwrapped
and returned with the corresponding non-optional type.
Otherwise, a runtime error is raised.

The unwrapped value of a forced-value expression can be modified,
either by mutating the value itself,
or by assigning to one of the value's members.
For example:

```swift
var x: Int? = 0
x! += 1
// x is now 1

var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
someDictionary["a"]![0] = 100
// someDictionary is now ["a": [100, 2, 3], "b": [10, 20]]
```

<!--
  - test: `optional-as-lvalue`

  ```swifttest
  -> var x: Int? = 0
  -> x! += 1
  /> x is now \(x!)
  </ x is now 1

  -> var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
  -> someDictionary["a"]![0] = 100
  /> someDictionary is now \(someDictionary)
  </ someDictionary is now ["a": [100, 2, 3], "b": [10, 20]]
  ```
-->

> Grammar of a forced-value expression:
>
> *forced-value-expression* → *postfix-expression* **`!`**

### Optional-Chaining Expression

An *optional-chaining expression* provides a simplified syntax
for using optional values in postfix expressions.
It has the following form:

```swift
<#expression#>?
```

The postfix `?` operator makes an optional-chaining expression
from an expression without changing the expression's value.

Optional-chaining expressions must appear within a postfix expression,
and they cause the postfix expression to be evaluated in a special way.
If the value of the optional-chaining expression is `nil`,
all of the other operations in the postfix expression are ignored
and the entire postfix expression evaluates to `nil`.
If the value of the optional-chaining expression isn't `nil`,
the value of the optional-chaining expression is unwrapped
and used to evaluate the rest of the postfix expression.
In either case,
the value of the postfix expression is still of an optional type.

If a postfix expression that contains an optional-chaining expression
is nested inside other postfix expressions,
only the outermost expression returns an optional type.
In the example below,
when `c` isn't `nil`,
its value is unwrapped and used to evaluate `.property`,
the value of which is used to evaluate `.performAction()`.
The entire expression `c?.property.performAction()`
has a value of an optional type.

```swift
var c: SomeClass?
var result: Bool? = c?.property.performAction()
```

<!--
  - test: `optional-chaining`

  ```swifttest
  >> class OtherClass { func performAction() -> Bool {return true} }
  >> class SomeClass { var property: OtherClass = OtherClass() }
  -> var c: SomeClass?
  -> var result: Bool? = c?.property.performAction()
  >> assert(result == nil)
  ```
-->

The following example shows the behavior
of the example above
without using optional chaining.

```swift
var result: Bool?
if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}
```

<!--
  - test: `optional-chaining-alt`

  ```swifttest
  >> class OtherClass { func performAction() -> Bool {return true} }
  >> class SomeClass { var property: OtherClass = OtherClass() }
  >> var c: SomeClass?
  -> var result: Bool?
  -> if let unwrappedC = c {
        result = unwrappedC.property.performAction()
     }
  ```
-->

The unwrapped value of an optional-chaining expression can be modified,
either by mutating the value itself,
or by assigning to one of the value's members.
If the value of the optional-chaining expression is `nil`,
the expression on the right-hand side of the assignment operator
isn't evaluated.
For example:

```swift
func someFunctionWithSideEffects() -> Int {
    return 42  // No actual side effects.
}
var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]

someDictionary["not here"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffects isn't evaluated
// someDictionary is still ["a": [1, 2, 3], "b": [10, 20]]

someDictionary["a"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffects is evaluated and returns 42
// someDictionary is now ["a": [42, 2, 3], "b": [10, 20]]
```

<!--
  - test: `optional-chaining-as-lvalue`

  ```swifttest
  -> func someFunctionWithSideEffects() -> Int {
        return 42  // No actual side effects.
     }
  -> var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]

  -> someDictionary["not here"]?[0] = someFunctionWithSideEffects()
  // someFunctionWithSideEffects isn't evaluated
  /> someDictionary is still \(someDictionary)
  </ someDictionary is still ["a": [1, 2, 3], "b": [10, 20]]

  -> someDictionary["a"]?[0] = someFunctionWithSideEffects()
  /> someFunctionWithSideEffects is evaluated and returns \(someFunctionWithSideEffects())
  </ someFunctionWithSideEffects is evaluated and returns 42
  /> someDictionary is now \(someDictionary)
  </ someDictionary is now ["a": [42, 2, 3], "b": [10, 20]]
  ```
-->

> Grammar of an optional-chaining expression:
>
> *optional-chaining-expression* → *postfix-expression* **`?`**

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
