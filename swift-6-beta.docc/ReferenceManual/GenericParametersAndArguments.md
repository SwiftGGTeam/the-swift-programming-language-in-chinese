<!--
要翻译的文件：https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/swift-6-beta-translation/swift-6-beta.docc/ReferenceManual/GenericParametersAndArguments.md
Swift 文档源文件地址：https://docs.swift.org/swift-book/documentation/the-swift-programming-language/genericparametersandarguments
翻译估计用时：⭐️⭐️⭐️
-->

# Generic Parameters and Arguments

Generalize declarations to abstract away concrete types.

本节涉及泛型类型、函数和构造器的参数，包括形参和实参。在声明泛型类型、函数或构造器时，需要指定泛型可处理的类型参数。这些类型参数相当于占位符，当实例化泛型类型或调用泛型函数、初始化器时，会被具体的类型实参替换。

For an overview of generics in Swift, see <doc:Generics>.

<!--
  NOTE: Generic types are sometimes referred to as :newTerm:`parameterized types`
  because they're declared with one or more type parameters.
-->

## Generic Parameter Clause

A *generic parameter clause* specifies the type parameters of a generic
type or function, along with any associated constraints and requirements on those parameters.
A generic parameter clause is enclosed in angle brackets (<>)
and has the following form:

```swift
<<#generic parameter list#>>
```

The *generic parameter list* is a comma-separated list of generic parameters,
each of which has the following form:

```swift
<#type parameter#>: <#constraint#>
```

A generic parameter consists of a *type parameter* followed by
an optional *constraint*. A *type parameter* is simply the name
of a placeholder type
(for example, `T`, `U`, `V`, `Key`, `Value`, and so on).
You have access to the type parameters (and any of their associated types) in the rest of the
type, function, or initializer declaration, including in the signature of the function
or initializer.

The *constraint* specifies that a type parameter inherits
from a specific class or conforms to a protocol or protocol composition.
For example, in the generic function below, the generic parameter `T: Comparable`
indicates that any type argument substituted
for the type parameter `T` must conform to the `Comparable` protocol.

```swift
func simpleMax<T: Comparable>(_ x: T, _ y: T) -> T {
    if x < y {
        return y
    }
    return x
}
```

<!--
  - test: `generic-params`

  ```swifttest
  -> func simpleMax<T: Comparable>(_ x: T, _ y: T) -> T {
        if x < y {
           return y
        }
        return x
     }
  ```
-->

Because `Int` and `Double`, for example, both conform to the `Comparable` protocol,
this function accepts arguments of either type. In contrast with generic types, you don't
specify a generic argument clause when you use a generic function or initializer.
The type arguments are instead inferred from the type of the arguments passed
to the function or initializer.

```swift
simpleMax(17, 42) // T is inferred to be Int
simpleMax(3.14159, 2.71828) // T is inferred to be Double
```

<!--
  - test: `generic-params`

  ```swifttest
  >> let r0 =
  -> simpleMax(17, 42) // T is inferred to be Int
  >> assert(r0 == 42)
  >> let r1 =
  -> simpleMax(3.14159, 2.71828) // T is inferred to be Double
  >> assert(r1 == 3.14159)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

### Generic Where Clauses

You can specify additional requirements on type parameters and their associated types
by including a generic `where` clause right before the opening curly brace
of a type or function's body.
A generic `where` clause consists of the `where` keyword,
followed by a comma-separated list of one or more *requirements*.

```swift
where <#requirements#>
```

The *requirements* in a generic `where` clause specify that a type parameter inherits from
a class or conforms to a protocol or protocol composition.
Although the generic `where` clause provides syntactic
sugar for expressing simple constraints on type parameters
(for example, `<T: Comparable>` is equivalent to `<T> where T: Comparable` and so on),
you can use it to provide more complex constraints on type parameters
and their associated types. For example,
you can constrain the associated types of type parameters to conform to protocols.
For example, `<S: Sequence> where S.Iterator.Element: Equatable`
specifies that `S` conforms to the `Sequence` protocol
and that the associated type `S.Iterator.Element`
conforms to the `Equatable` protocol.
This constraint ensures that each element of the sequence is equatable.

You can also specify the requirement that two types be identical,
using the `==` operator. For example,
`<S1: Sequence, S2: Sequence> where S1.Iterator.Element == S2.Iterator.Element`
expresses the constraints that `S1` and `S2` conform to the `Sequence` protocol
and that the elements of both sequences must be of the same type.

Any type argument substituted for a type parameter must
meet all the constraints and requirements placed on the type parameter.

A generic `where` clause can appear
as part of a declaration that includes type parameters,
or as part of a declaration
that's nested inside of a declaration that includes type parameters.
The generic `where` clause for a nested declaration
can still refer to the type parameters of the enclosing declaration;
however,
the requirements from that `where` clause
apply only to the declaration where it's written.

If the enclosing declaration also has a `where` clause,
the requirements from both clauses are combined.
In the example below, `startsWithZero()` is available
only if `Element` conforms to both `SomeProtocol` and `Numeric`.

```swift
extension Collection where Element: SomeProtocol {
    func startsWithZero() -> Bool where Element: Numeric {
        return first == .zero
    }
}
```

<!--
  - test: `contextual-where-clauses-combine`

  ```swifttest
  >> protocol SomeProtocol { }
  >> extension Int: SomeProtocol { }
  -> extension Collection where Element: SomeProtocol {
         func startsWithZero() -> Bool where Element: Numeric {
             return first == .zero
         }
     }
  >> print( [1, 2, 3].startsWithZero() )
  << false
  ```
-->

<!--
  - test: `contextual-where-clause-combine-err`

  ```swifttest
  >> protocol SomeProtocol { }
  >> extension Bool: SomeProtocol { }
  ---
  >> extension Collection where Element: SomeProtocol {
  >>     func returnTrue() -> Bool where Element == Bool {
  >>         return true
  >>     }
  >>     func returnTrue() -> Bool where Element == Int {
  >>         return true
  >>     }
  >> }
  !$ error: no type for 'Self.Element' can satisfy both 'Self.Element == Int' and 'Self.Element : SomeProtocol'
  !! func returnTrue() -> Bool where Element == Int {
  !!                                            ^
  ```
-->

You can overload a generic function or initializer by providing different
constraints, requirements, or both on the type parameters.
When you call an overloaded generic function or initializer,
the compiler uses these constraints to resolve which overloaded function
or initializer to invoke.

For more information about generic `where` clauses and to see an example
of one in a generic function declaration,
see <doc:Generics#Generic-Where-Clauses>.

> Grammar of a generic parameter clause:
>
> *generic-parameter-clause* → **`<`** *generic-parameter-list* **`>`** \
> *generic-parameter-list* → *generic-parameter* | *generic-parameter* **`,`** *generic-parameter-list* \
> *generic-parameter* → *type-name* \
> *generic-parameter* → *type-name* **`:`** *type-identifier* \
> *generic-parameter* → *type-name* **`:`** *protocol-composition-type*
>
> *generic-where-clause* → **`where`** *requirement-list* \
> *requirement-list* → *requirement* | *requirement* **`,`** *requirement-list* \
> *requirement* → *conformance-requirement* | *same-type-requirement*
>
> *conformance-requirement* → *type-identifier* **`:`** *type-identifier* \
> *conformance-requirement* → *type-identifier* **`:`** *protocol-composition-type* \
> *same-type-requirement* → *type-identifier* **`==`** *type*

<!--
  NOTE: A conformance requirement can only have one type after the colon,
  otherwise, you'd have a syntactic ambiguity
  (a comma-separated list types inside of a comma-separated list of requirements).
-->

## Generic Argument Clause

A *generic argument clause* specifies the type arguments of a generic
type.
A generic argument clause is enclosed in angle brackets (<>)
and has the following form:

```swift
<<#generic argument list#>>
```

The *generic argument list* is a comma-separated list of type arguments.
A *type argument* is the name of an actual concrete type that replaces
a corresponding type parameter in the generic parameter clause of a generic type.
The result is a specialized version of that generic type.
The example below shows a simplified version of the Swift standard library's
generic dictionary type.

```swift
struct Dictionary<Key: Hashable, Value>: Collection, ExpressibleByDictionaryLiteral {
    /* ... */
}
```

<!--
  TODO: How are we supposed to wrap code lines like the above?
-->

The specialized version of the generic `Dictionary` type, `Dictionary<String, Int>`
is formed by replacing the generic parameters `Key: Hashable` and `Value`
with the concrete type arguments `String` and `Int`. Each type argument must satisfy
all the constraints of the generic parameter it replaces, including any additional
requirements specified in a generic `where` clause. In the example above,
the `Key` type parameter is constrained to conform to the `Hashable` protocol
and therefore `String` must also conform to the `Hashable` protocol.

You can also replace a type parameter with a type argument that's itself
a specialized version of a generic type (provided it satisfies the appropriate
constraints and requirements). For example, you can replace the type parameter
`Element` in `Array<Element>` with a specialized version of an array, `Array<Int>`,
to form an array whose elements are themselves arrays of integers.

```swift
let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

<!--
  - test: `array-of-arrays`

  ```swifttest
  -> let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  ```
-->

As mentioned in <doc:GenericParametersAndArguments#Generic-Parameter-Clause>,
you don't use a generic argument clause to specify the type arguments
of a generic function or initializer.

> Grammar of a generic argument clause:
>
> *generic-argument-clause* → **`<`** *generic-argument-list* **`>`** \
> *generic-argument-list* → *generic-argument* | *generic-argument* **`,`** *generic-argument-list* \
> *generic-argument* → *type*

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
