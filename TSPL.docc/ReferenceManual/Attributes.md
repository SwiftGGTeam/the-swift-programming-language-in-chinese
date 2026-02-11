# Attributes

Add information to declarations and types.

There are two kinds of attributes in Swift ---
those that apply to declarations and those that apply to types.
An attribute provides additional information about the declaration or type.
For example,
the `discardableResult` attribute on a function declaration indicates that,
although the function returns a value,
the compiler shouldn't generate a warning if the return value is unused.

You specify an attribute by writing the `@` symbol followed by the attribute's name
and any arguments that the attribute accepts:

```swift
@<#attribute name#>
@<#attribute name#>(<#attribute arguments#>)
```

Some declaration attributes accept arguments
that specify more information about the attribute
and how it applies to a particular declaration.
These *attribute arguments* are enclosed in parentheses,
and their format is defined by the attribute they belong to.

Attached macros and property wrappers also use attribute syntax.
For information about how macros expand,
see <doc:Expressions#Macro-Expansion-Expression>.
For information about property wrappers,
see <doc:Attributes#propertyWrapper>.

## Declaration Attributes

You can apply a declaration attribute to declarations only.

### attached

Apply the `attached` attribute to a macro declaration.
The arguments to this attribute indicate the macro's role.
For a macro that has multiple roles,
apply the `attached` macro multiple times, once for each role.

<!-- TODO:
If there's a stable URL we can use, make the macro protocols below links.
-->

The first argument to this attribute
indicates the macro's role:

- term Peer macros:
  Write `peer` as the first argument to this attribute.
  The type that implements the macro conforms to the `PeerMacro` protocol.
  These macros produce new declarations
  in the same scope as the declaration
  that the macro is attached to.
  For example,
  applying a peer macro to a method of a structure
  can define additional methods and properties on that structure.

- term Member macros:
  Write `member` as the first argument to this attribute.
  The type that implements the macro conforms to the `MemberMacro` protocol.
  These macros produce new declarations
  that are members of the type or extension
  that the macro is attached to.
  For example,
  applying a member macro to a structure declaration
  can define additional methods and properties on that structure.

- term Member attribute:
  Write `memberAttribute` as the first argument to this attribute.
  The type that implements the macro conforms to the `MemberAttributeMacro` protocol.
  These macros add attributes to members of the type or extension
  that the macro is attached to.

- term Accessor macros:
  Write `accessor` as the first argument to this attribute.
  The type that implements the macro conforms to the `AccessorMacro` protocol.
  These macros add accessors to the stored property they're attached to,
  turning it into a computed property.

- term Extension macros:
  Write `extension` as the first argument to this attribute.
  The type that implements the macro conforms to the `ExtensionMacro` protocol.
  These macros can add protocol conformance,
  a `where` clause,
  and new declarations that are members of the type the macro is attached to.
  If the macro adds protocol conformances,
  include the `conformances:` argument and specify those protocols.
  The conformance list contains protocol names,
  type aliases that refer to conformance list items,
  or protocol compositions of conformance list items.
  An extension macro on a nested type
  expands to an extension at the top level of that file.
  You can't write an extension macro
  on an extension, a type alias, or a type that's nested inside a function,
  or use an extension macro to add an extension that has a peer macro.

The peer and member macro roles require a `names:` argument,
listing the names of the symbols that the macro generates.
The accessor macro role requires a `names:` argument if the
macro generates a `willSet` or `didSet` property observer. An
accessor macro that generates property observers can't add
other accessors, because observers only apply to stored properties.
The extension macro role also requires a `names:` argument
if the macro adds declarations inside the extension.
When a macro declaration includes the `names:` argument,
the macro implementation must generate
only symbol with names that match that list.
That said,
a macro need not generate a symbol for every listed name.
The value for that argument is a list of one or more of the following:

- `named(<#name#>)`
  where *name* is that fixed symbol name,
  for a name that's known in advance.

- `overloaded`
  for a name that's the same as an existing symbol.

- `prefixed(<#prefix#>)`
  where *prefix* is prepended to the symbol name,
  for a name that starts with a fixed string.

- `suffixed(<#suffix#>)`
  where *suffix* is appended to the symbol name,
  for a name that ends with a fixed string.

- `arbitrary`
  for a name that can't be determined until macro expansion.

As a special case,
you can write `prefixed($)`
for a macro that behaves similar to a property wrapper.
<!--
TODO TR: Is there any more detail about this case?
-->

### available

Apply this attribute to indicate a declaration's life cycle
relative to certain Swift language versions
or certain platforms and operating system versions.

The `available` attribute always appears
with a list of two or more comma-separated attribute arguments.
These arguments begin with one of the following platform or language names:

- `iOS`
- `iOSApplicationExtension`
- `macOS`
- `macOSApplicationExtension`
- `macCatalyst`
- `macCatalystApplicationExtension`
- `watchOS`
- `watchOSApplicationExtension`
- `tvOS`
- `tvOSApplicationExtension`
- `visionOS`
- `visionOSApplicationExtension`
- `swift`

<!--
  If you need to add a new platform to this list,
  you probably need to update platform-name in the grammar too.
-->

<!--
  For the list in source, see include/swift/AST/PlatformKinds.def
-->

You can also use an asterisk (`*`) to indicate the
availability of the declaration on all of the platform names listed above.
An `available` attribute
that specifies availability using a Swift version number
can't use the asterisk.

The remaining arguments can appear in any order
and specify additional information about the declaration's life cycle,
including important milestones.

- The `unavailable` argument indicates that the declaration
  isn't available on the specified platform.
  This argument can't be used when specifying Swift version availability.
- The `introduced` argument indicates the first version
  of the specified platform or language in which the declaration was introduced.
  It has the following form:

  ```swift
  introduced: <#version number#>
  ```
  The *version number* consists of one to three positive integers,
  separated by periods.
- The `deprecated` argument indicates the first version
  of the specified platform or language in which the declaration was deprecated.
  It has the following form:

  ```swift
  deprecated: <#version number#>
  ```
  The optional *version number* consists of one to three positive integers,
  separated by periods.
  Omitting the version number indicates that the declaration is currently deprecated,
  without giving any information about when the deprecation occurred.
  If you omit the version number, omit the colon (`:`) as well.
- The `obsoleted` argument indicates the first version
  of the specified platform or language in which the declaration was obsoleted.
  When a declaration is obsoleted,
  it's removed from the specified platform or language and can no longer be used.
  It has the following form:

  ```swift
  obsoleted: <#version number#>
  ```
  The *version number* consists of one to three positive integers, separated by periods.

- The `noasync` argument indicates that
  the declared symbol can't be used directly
  in an asynchronous context.

  Because Swift concurrency can resume on a different thread
  after a potential suspension point,
  using elements like thread-local storage, locks, mutexes, or semaphores
  across suspension points can lead to incorrect results.

  To avoid this problem,
  add an `@available(*, noasync)` attribute to the symbol's declaration:

  ```swift
  extension pthread_mutex_t {

    @available(*, noasync)
    mutating func lock() {
        pthread_mutex_lock(&self)
    }

    @available(*, noasync)
    mutating func unlock() {
        pthread_mutex_unlock(&self)
    }
  }
  ```

  This attribute raises a compile-time error
  when someone uses the symbol in an asynchronous context.
  You can also use the `message` argument to provide additional information
  about the symbol.

  ```swift
  @available(*, noasync, message: "Migrate locks to Swift concurrency.")
  mutating func lock() {
    pthread_mutex_lock(&self)
  }
  ```

  If you can guarantee that your code
  uses a potentially unsafe symbol in a safe manner,
  you can wrap it in a synchronous function and call that function
  from an asynchronous context.

  ```swift

  // Provide a synchronous wrapper around methods with a noasync declaration.
  extension pthread_mutex_t {
    mutating func withLock(_ operation: () -> ()) {
      self.lock()
      operation()
      self.unlock()
    }
  }

  func downloadAndStore(key: Int,
                      dataStore: MyKeyedStorage,
                      dataLock: inout pthread_mutex_t) async {
    // Safely call the wrapper in an asynchronous context.
    dataLock.withLock {
      dataStore[key] = downloadContent()
    }
  }
  ```

  You can use the `noasync` argument on most declarations;
  however, you can't use it when declaring deinitializers.
  Swift must be able to call a class's deinitializers from any context,
  both synchronous and asynchronous.

- The `message` argument provides a textual message that the compiler displays
  when emitting a warning or error about the use
  of a declaration marked `deprecated`, `obsoleted`, or `noasync`.
  It has the following form:

  ```swift
  message: <#message#>
  ```
  The *message* consists of a string literal.
- The `renamed` argument provides a textual message
  that indicates the new name for a declaration that's been renamed.
  The compiler displays the new name
  when emitting an error about the use of a renamed declaration.
  It has the following form:

  ```swift
  renamed: <#new name#>
  ```
  The *new name* consists of a string literal.

  You can apply the `available` attribute
  with the `renamed` and `unavailable` arguments
  to a type alias declaration, as shown below,
  to indicate that the name of a declaration changed
  between releases of a framework or library.
  This combination results in a compile-time error
  that the declaration has been renamed.

  ```swift
  // First release
  protocol MyProtocol {
      // protocol definition
  }
  ```

  <!--
    - test: `renamed1`

    ```swifttest
    -> // First release
    -> protocol MyProtocol {
           // protocol definition
       }
    ```
  -->

  ```swift
  // Subsequent release renames MyProtocol
  protocol MyRenamedProtocol {
      // protocol definition
  }

  @available(*, unavailable, renamed: "MyRenamedProtocol")
  typealias MyProtocol = MyRenamedProtocol
  ```

  <!--
    - test: `renamed2`

    ```swifttest
    -> // Subsequent release renames MyProtocol
    -> protocol MyRenamedProtocol {
           // protocol definition
       }

    -> @available(*, unavailable, renamed: "MyRenamedProtocol")
       typealias MyProtocol = MyRenamedProtocol
    ```
  -->

You can apply multiple `available` attributes on a single declaration
to specify the declaration's availability on different platforms
and different versions of Swift.
The declaration that the `available` attribute applies to
is ignored if the attribute specifies
a platform or language version that doesn't match the current target.
If you use multiple `available` attributes,
the effective availability is the combination of
the platform and Swift availabilities.

<!--
  - test: `multipleAvailableAttributes`

  ```swifttest
  -> @available(iOS 9, *)
  -> @available(macOS 10.9, *)
  -> func foo() { }
  -> foo()
  ```
-->

If an `available` attribute only specifies an `introduced` argument
in addition to a platform or language name argument,
you can use the following shorthand syntax instead:

```swift
@available(<#platform name#> <#version number#>, *)
@available(swift <#version number#>)
```

The shorthand syntax for `available` attributes
concisely expresses availability for multiple platforms.
Although the two forms are functionally equivalent,
the shorthand form is preferred whenever possible.

```swift
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // class definition
}
```

<!--
  - test: `availableShorthand`

  ```swifttest
  -> @available(iOS 10.0, macOS 10.12, *)
  -> class MyClass {
         // class definition
     }
  ```
-->

An `available` attribute
that specifies availability using a Swift version number
can't additionally specify a declaration's platform availability.
Instead, use separate `available` attributes to specify a Swift
version availability and one or more platform availabilities.

```swift
@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // struct definition
}
```

<!--
  - test: `availableMultipleAvailabilities`

  ```swifttest
  -> @available(swift 3.0.2)
  -> @available(macOS 10.12, *)
  -> struct MyStruct {
         // struct definition
     }
  ```
-->

### backDeployed

Apply this attribute to a function, method, subscript, or computed property
to include a copy of the symbol's implementation
in programs that call or access the symbol.
You use this attribute to annotate symbols that ship as part of a platform,
like the APIs that are included with an operating system.
This attribute marks symbols that can be made available retroactively
by including a copy of their implementation in programs that access them.
Copying the implementation is also known as *emitting into the client*.

This attribute takes a `before:` argument,
specifying the first version of platforms that provide this symbol.
These platform versions have the same meaning
as the platform version you specify for the `available` attribute.
Unlike the `available` attribute,
the list can't contain an asterisk (`*`) to refer to all versions.
For example, consider the following code:

```swift
@available(iOS 16, *)
@backDeployed(before: iOS 17)
func someFunction() { /* ... */ }
```

In the example above,
the iOS SDK provides `someFunction()` starting in iOS 17.
In addition,
the SDK makes `someFunction()` available on iOS 16 using back deployment.

When compiling code that calls this function,
Swift inserts a layer of indirection that finds the function's implementation.
If the code is run using a version of the SDK that includes this function,
the SDK's implementation is used.
Otherwise, the copy included in the caller is used.
In the example above,
calling `someFunction()` uses the implementation from the SDK
when running on iOS 17 or later,
and when running on iOS 16
it uses the copy of `someFunction()` that's included in the caller.

> Note:
> When the caller's minimum deployment target
> is the same as or greater than
> the first version of the SDK that includes the symbol,
> the compiler can optimize away the runtime check
> and call the SDK's implementation directly.
> In this case,
> if you access the back-deployed symbol directly,
> the compiler can also omit
> the copy of the symbol's implementation from the client.

<!--
Stripping out the copy emitted into the client
depends on a chain of optimizations that must all take place --
inlining the thunk,
constant-folding the availability check,
and stripping the emitted copy as dead code --
and the details could change over time,
so we don't guarantee in docs that it always happens.
-->

Functions, methods, subscripts, and computed properties
that meet the following criteria can be back deployed:

- The declaration is `public` or `@usableFromInline`.
- For class instance methods and class type methods,
  the method is marked `final` and isn't marked `@objc`.
- The implementation satisfies the requirements for an inlinable function,
  described in <doc:Attributes#inlinable>.

### discardableResult

Apply this attribute to a function or method declaration
to suppress the compiler warning
when the function or method that returns a value
is called without using its result.

### dynamicCallable

Apply this attribute to a class, structure, enumeration, or protocol
to treat instances of the type as callable functions.
The type must implement either a `dynamicallyCall(withArguments:)` method,
a `dynamicallyCall(withKeywordArguments:)` method,
or both.

You can call an instance of a dynamically callable type
as if it's a function that takes any number of arguments.

```swift
@dynamicCallable
struct TelephoneExchange {
    func dynamicallyCall(withArguments phoneNumber: [Int]) {
        if phoneNumber == [4, 1, 1] {
            print("Get Swift help on forums.swift.org")
        } else {
            print("Unrecognized number")
        }
    }
}

let dial = TelephoneExchange()

// Use a dynamic method call.
dial(4, 1, 1)
// Prints "Get Swift help on forums.swift.org".

dial(8, 6, 7, 5, 3, 0, 9)
// Prints "Unrecognized number".

// Call the underlying method directly.
dial.dynamicallyCall(withArguments: [4, 1, 1])
```

<!--
  - test: `dynamicCallable`

  ```swifttest
  -> @dynamicCallable
  -> struct TelephoneExchange {
         func dynamicallyCall(withArguments phoneNumber: [Int]) {
             if phoneNumber == [4, 1, 1] {
                 print("Get Swift help on forums.swift.org")
             } else {
                 print("Unrecognized number")
             }
         }
     }

  -> let dial = TelephoneExchange()

  -> // Use a dynamic method call.
  -> dial(4, 1, 1)
  <- Get Swift help on forums.swift.org

  -> dial(8, 6, 7, 5, 3, 0, 9)
  <- Unrecognized number

  -> // Call the underlying method directly.
  -> dial.dynamicallyCall(withArguments: [4, 1, 1])
  << Get Swift help on forums.swift.org
  ```
-->

The declaration of the `dynamicallyCall(withArguments:)` method
must have a single parameter that conforms to the
[`ExpressibleByArrayLiteral`](https://developer.apple.com/documentation/swift/expressiblebyarrayliteral)
protocol --- like `[Int]` in the example above.
The return type can be any type.

You can include labels in a dynamic method call
if you implement the `dynamicallyCall(withKeywordArguments:)` method.

```swift
@dynamicCallable
struct Repeater {
    func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
        return pairs
            .map { label, count in
                repeatElement(label, count: count).joined(separator: " ")
            }
            .joined(separator: "\n")
    }
}

let repeatLabels = Repeater()
print(repeatLabels(a: 1, b: 2, c: 3, b: 2, a: 1))
// a
// b b
// c c c
// b b
// a
```

<!--
  - test: `dynamicCallable`

  ```swifttest
  -> @dynamicCallable
     struct Repeater {
         func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
             return pairs
                 .map { label, count in
                     repeatElement(label, count: count).joined(separator: " ")
                 }
                 .joined(separator: "\n")
         }
     }

  -> let repeatLabels = Repeater()
  -> print(repeatLabels(a: 1, b: 2, c: 3, b: 2, a: 1))
  </ a
  </ b b
  </ c c c
  </ b b
  </ a
  ```
-->

The declaration of the `dynamicallyCall(withKeywordArguments:)` method
must have a single parameter that conforms to the
[`ExpressibleByDictionaryLiteral`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral)
protocol,
and the return type can be any type.
The parameter's [`Key`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral/2294108-key)
must be
[`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral).
The previous example uses [`KeyValuePairs`](https://developer.apple.com/documentation/swift/keyvaluepairs)
as the parameter type
so that callers can include duplicate parameter labels ---
`a` and `b` appear multiple times in the call to `repeat`.

If you implement both `dynamicallyCall` methods,
`dynamicallyCall(withKeywordArguments:)` is called
when the method call includes keyword arguments.
In all other cases, `dynamicallyCall(withArguments:)` is called.

You can only call a dynamically callable instance
with arguments and a return value that match the types you specify
in one of your `dynamicallyCall` method implementations.
The call in the following example doesn't compile because
there isn't an implementation of `dynamicallyCall(withArguments:)`
that takes `KeyValuePairs<String, String>`.

```swift
repeatLabels(a: "four") // Error
```

<!--
  - test: `dynamicCallable-err`

  ```swifttest
  >> @dynamicCallable
  >> struct Repeater {
  >>     func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
  >>         return pairs
  >>             .map { label, count in
  >>                 repeatElement(label, count: count).joined(separator: " ")
  >>             }
  >>             .joined(separator: "\n")
  >>     }
  >> }
  >> let repeatLabels = Repeater()
  -> repeatLabels(a: "four") // Error
  !$ error: cannot convert value of type 'String' to expected argument type 'Int'
  !! repeatLabels(a: "four") // Error
  !! ^
  ```
-->

### dynamicMemberLookup

Apply this attribute to a class, structure, enumeration, or protocol
to enable members to be looked up by name at runtime.
The type must implement a `subscript(dynamicMember:)` subscript.

In an explicit member expression,
if there isn't a corresponding declaration for the named member,
the expression is understood as a call to
the type's `subscript(dynamicMember:)` subscript,
passing information about the member as the argument.
The subscript can accept a parameter that's either a key path or a member name;
if you implement both subscripts,
the subscript that takes key path argument is used.

An implementation of `subscript(dynamicMember:)`
can accept key paths using an argument of type
[`KeyPath`](https://developer.apple.com/documentation/swift/keypath),
[`WritableKeyPath`](https://developer.apple.com/documentation/swift/writablekeypath),
or [`ReferenceWritableKeyPath`](https://developer.apple.com/documentation/swift/referencewritablekeypath).
It can accept member names using an argument of a type that conforms to the
[`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral) protocol ---
in most cases, `String`.
The subscript's return type can be any type.

Dynamic member lookup by member name
can be used to create a wrapper type around data
that can't be type checked at compile time,
such as when bridging data from other languages into Swift.
For example:

```swift
@dynamicMemberLookup
struct DynamicStruct {
    let dictionary = ["someDynamicMember": 325,
                      "someOtherMember": 787]
    subscript(dynamicMember member: String) -> Int {
        return dictionary[member] ?? 1054
    }
}
let s = DynamicStruct()

// Use dynamic member lookup.
let dynamic = s.someDynamicMember
print(dynamic)
// Prints "325".

// Call the underlying subscript directly.
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// Prints "true".
```

<!--
  - test: `dynamicMemberLookup`

  ```swifttest
  -> @dynamicMemberLookup
  -> struct DynamicStruct {
         let dictionary = ["someDynamicMember": 325,
                           "someOtherMember": 787]
         subscript(dynamicMember member: String) -> Int {
             return dictionary[member] ?? 1054
         }
     }
  -> let s = DynamicStruct()

  // Use dynamic member lookup.
  -> let dynamic = s.someDynamicMember
  -> print(dynamic)
  <- 325

  // Call the underlying subscript directly.
  -> let equivalent = s[dynamicMember: "someDynamicMember"]
  -> print(dynamic == equivalent)
  <- true
  ```
-->

Dynamic member lookup by key path
can be used to implement a wrapper type
in a way that supports compile-time type checking.
For example:

```swift
struct Point { var x, y: Int }

@dynamicMemberLookup
struct PassthroughWrapper<Value> {
    var value: Value
    subscript<T>(dynamicMember member: KeyPath<Value, T>) -> T {
        get { return value[keyPath: member] }
    }
}

let point = Point(x: 381, y: 431)
let wrapper = PassthroughWrapper(value: point)
print(wrapper.x)
```

<!--
  - test: `dynamicMemberLookup`

  ```swifttest
  -> struct Point { var x, y: Int }

  -> @dynamicMemberLookup
     struct PassthroughWrapper<Value> {
         var value: Value
         subscript<T>(dynamicMember member: KeyPath<Value, T>) -> T {
             get { return value[keyPath: member] }
         }
     }

  -> let point = Point(x: 381, y: 431)
  -> let wrapper = PassthroughWrapper(value: point)
  -> print(wrapper.x)
  << 381
  ```
-->

### export

Apply this attribute to a function or method declaration
to control how its definition is exported to client modules.
Include one of the following arguments,
indicating what aspect of the declaration to export:

- The `interface` argument specifies that
  only the interface is exported to clients,
  in the form of a callable symbol.
  The definition (function body) isn't available to clients
  for inlining, optimization, or any other purpose.
  Use this argument to hide the implementation from clients.

- The `implementation` argument specifies that
  only the definition (function body) is exported to clients.
  There's no symbol for this function emitted into the binary,
  and clients are responsible for emitting a copy of the definition
  wherever it's required.
  Use this argument to introduce a new function or method
  without affecting the Application Binary Interface (ABI).

### freestanding

Apply the `freestanding` attribute
to the declaration of a freestanding macro.

<!--

For the future, when other roles are supported:

The arguments to this attribute indicate the macro's roles:

- `expression`
  A macro that produces an expression

- `declaration`
  A macro that produces a declaration

Or are those supported today?
I see #error and #warning as @freestanding(declaration)
in the stdlib already:

https://github.com/swiftlang/swift/blob/main/stdlib/public/core/Macros.swift#L102
-->

### frozen

Apply this attribute to a structure or enumeration declaration
to restrict the kinds of changes you can make to the type.
This attribute is allowed only when compiling in library evolution mode.
Future versions of the library can't change the declaration
by adding, removing, or reordering
an enumeration's cases
or a structure's stored instance properties.
These changes are allowed on nonfrozen types,
but they break ABI compatibility for frozen types.

<!--
  - test: `can-use-frozen-without-evolution`

  ```swifttest
  >> @frozen public enum E { case x, y }
  >> @frozen public struct S { var a: Int = 10 }
  ```
-->

<!--
  <rdar://problem/54041692> Using @frozen without Library Evolution has inconsistent error messages [SE-0260]
-->

<!--
  - test: `frozen-is-fine-with-evolution`

  ```swifttest
  >> @frozen public enum E { case x, y }
  >> @frozen public struct S { var a: Int = 10 }
  ```
-->

In library evolution mode,
code that interacts with members of nonfrozen structures and enumerations
is compiled in a way that allows it to continue working without recompiling
even if a future version of the library
adds, removes, or reorders some of that type's members.
The compiler makes this possible using techniques like
looking up information at runtime
and adding a layer of indirection.
Marking a structure or enumeration as frozen
gives up this flexibility to gain performance:
Future versions of the library can make only limited changes to the type,
but the compiler can make additional optimizations
in code that interacts with the type's members.

Frozen types,
the types of the stored properties of frozen structures,
and the associated values of frozen enumeration cases
must be public or marked with the `usableFromInline` attribute.
The properties of a frozen structure can't have property observers,
and expressions that provide the initial value for stored instance properties
must follow the same restrictions as inlinable functions,
as discussed in <doc:Attributes#inlinable>.

<!--
  - test: `frozen-struct-prop-init-cant-refer-to-private-type`

  ```swifttest
  >> public protocol P { }
  >> private struct PrivateStruct: P { }
  >>         public struct S1 { var fine: P = PrivateStruct() }
  >> @frozen public struct S2 { var nope: P = PrivateStruct() }
  !$ error: struct 'PrivateStruct' is private and cannot be referenced from a property initializer in a '@frozen' type
  !! @frozen public struct S2 { var nope: P = PrivateStruct() }
  !!                                          ^
  !$ note: struct 'PrivateStruct' is not '@usableFromInline' or public
  !! private struct PrivateStruct: P { }
  !!                ^
  !$ error: initializer 'init()' is private and cannot be referenced from a property initializer in a '@frozen' type
  !! @frozen public struct S2 { var nope: P = PrivateStruct() }
  !! ^
  !$ note: initializer 'init()' is not '@usableFromInline' or public
  !! private struct PrivateStruct: P { }
  !! ^
  ```
-->

To enable library evolution mode on the command line,
pass the `-enable-library-evolution` option to the Swift compiler.
To enable it in Xcode,
set the "Build Libraries for Distribution" build setting
(`BUILD_LIBRARY_FOR_DISTRIBUTION`) to Yes,
as described in [Xcode Help](https://help.apple.com/xcode/mac/current/#/dev04b3a04ba).

<!--
  This is the first time we're talking about a specific compiler flag/option.
  In the long term, the discussion of library evolution mode
  will need to move to a new chapter in the guide
  that also talks about things like @available and ABI.
  See <rdar://problem/51929017> TSPL: Give guidance to library authors about @available @frozen and friends
-->

A switch statement over a frozen enumeration doesn't require a `default` case,
as discussed in <doc:Statements#Switching-Over-Future-Enumeration-Cases>.
Including a `default` or `@unknown default` case
when switching over a frozen enumeration
produces a warning because that code is never executed.

<!--
  - test: `NoUnknownDefaultOverFrozenEnum`

  ```swifttest
  >> public enum E { case x, y }
  >> @frozen public enum F { case x, y }
  ```
-->

<!--
  - test: `NoUnknownDefaultOverFrozenEnum_Test1`

  ```swifttest
  >> import NoUnknownDefaultOverFrozenEnum
  >> func main() {
  >>     let e = NoUnknownDefaultOverFrozenEnum.E.x
  >>     switch e {
  >>         case .x: print(9)
  >>         case .y: print(8)
  >>         @unknown default: print(0)
  >>     }
  >> }
  // Note that there's no warning -- this is fine because E isn't frozen.
  ```
-->

<!--
  - test: `NoUnknownDefaultOverFrozenEnum_Test2`

  ```swifttest
  >> import NoUnknownDefaultOverFrozenEnum
  >> func main() {
  >>     let f = NoUnknownDefaultOverFrozenEnum.F.x
  >>     switch f {
  >>         case .x: print(9)
  >>         case .y: print(8)
  >>         @unknown default: print(0)
  >>     }
  >> }
  // --- Main warning ---
  !! /tmp/sourcefile_0.swift:7:18: warning: case is already handled by previous patterns; consider removing it
  !! @unknown default: print(0)
  !! ~~~~~~~~~^~~~~~~~~~~~~~~~~
  !! /tmp/sourcefile_0.swift:7:9: warning: default will never be executed
  !! @unknown default: print(0)
  !! ^
  // --- Junk/ancillary warnings ---
  !! /tmp/sourcefile_0.swift:4:12: warning: switch condition evaluates to a constant
  !! switch f {
  !! ^
  !! /tmp/sourcefile_0.swift:6:24: note: will never be executed
  !! case .y: print(8)
  !! ^
  ```
-->

### GKInspectable

Apply this attribute to expose a custom GameplayKit component property
to the SpriteKit editor UI.
Applying this attribute also implies the `objc` attribute.

<!--
  See also <rdar://problem/27287369> Document @GKInspectable attribute
  which we will want to link to, once it's written.
-->

### globalActor

Apply this attribute to an actor, structure, enumeration, or final class.
The type must define a static property named `shared`,
which provides a shared instance of an actor.

A global actor generalizes the concept of actor isolation
to state that's spread out in several different places in code ---
such as multiple types, files, and modules ---
and makes it possible to safely access global variables from concurrent code.
The actor that the global actor provides
as the value of its `shared` property
serializes access to all this state.
You can also use a global actor to model constraints in concurrent code
like code that all needs to execute on the same thread.

Global actors implicitly conform to the [`GlobalActor`][] protocol.
The main actor is a global actor provided by the standard library,
as discussed in <doc:Concurrency#The-Main-Actor>.
Most code can use the main actor instead of defining a new global actor.

[`GlobalActor`]: https://developer.apple.com/documentation/swift/globalactor

### inlinable

Apply this attribute to a
function, method, computed property, subscript,
convenience initializer, or deinitializer declaration
to expose that declaration's implementation
as part of the module's public interface.
The compiler is allowed to replace calls to an inlinable symbol
with a copy of the symbol's implementation at the call site.

Inlinable code
can interact with `open` and `public` symbols declared in any module,
and it can interact with `internal` symbols
declared in the same module
that are marked with the `usableFromInline` attribute.
Inlinable code can't interact with `private` or `fileprivate` symbols.

This attribute can't be applied
to declarations that are nested inside functions
or to `fileprivate` or `private` declarations.
Functions and closures that are defined inside an inlinable function
are implicitly inlinable,
even though they can't be marked with this attribute.

<!--
  - test: `cant-inline-private`

  ```swifttest
  >> @inlinable private func f() { }
  !$ error: '@inlinable' attribute can only be applied to public declarations, but 'f' is private
  !! @inlinable private func f() { }
  !! ^~~~~~~~~~~
  ```
-->

<!--
  - test: `cant-inline-nested`

  ```swifttest
  >> public func outer() {
  >>    @inlinable func f() { }
  >> }
  !$ error: '@inlinable' attribute can only be applied to public declarations, but 'f' is private
  !! @inlinable func f() { }
  !! ^~~~~~~~~~~
  !!-
  ```
-->

<!--
  TODO: When we get resilience, this will actually be a problem.
  Until then, per discussion with [Contributor 6004], there's no (supported) way
  for folks to get into the state where this behavior would be triggered.

  If a project uses a module that includes inlinable functions,
  the inlined copies aren't necessarily updated
  when the module's implementation of the function changes.
  For this reason,
  an inlinable function must be compatible with
  every past version of that function.
  In most cases, this means
  externally visible aspects of their implementation can't be changed.
  For example,
  an inlinable hash function can't change what algorithm is used ---
  inlined copies outside the module would use the old algorithm
  and the noninlined copy would use the new algorithm,
  yielding inconsistent results.
-->

### main

Apply this attribute to a structure, class, or enumeration declaration
to indicate that it contains the top-level entry point for program flow.
The type must provide a `main` type function
that doesn't take any arguments and returns `Void`.
For example:

```swift
@main
struct MyTopLevel {
    static func main() {
        // Top-level code goes here
    }
}
```

<!--
  - test: `atMain`

  ```swifttest
  -> @main
  -> struct MyTopLevel {
  ->     static func main() {
  ->         // Top-level code goes here
  >>         print("Hello")
  ->     }
  -> }
  << Hello
  ```
-->

Another way to describe the requirements of the `main` attribute
is that the type you write this attribute on
must satisfy the same requirements
as types that conform to the following hypothetical protocol:

```swift
protocol ProvidesMain {
    static func main() throws
}
```

<!--
  - test: `atMain_ProvidesMain`

  ```swifttest
  -> protocol ProvidesMain {
         static func main() throws
     }
  ```
-->

The Swift code you compile to make an executable
can contain at most one top-level entry point,
as discussed in <doc:Declarations#Top-Level-Code>.

<!--
  - test: `no-at-main-in-top-level-code`

  ```swifttest
  // This is the same example as atMain, but without :compile: true.
  >> @main
  >> struct MyTopLevel {
  >>     static func main() {
  >>         print("Hello")
  >>     }
  >> }
  !$ error: 'main' attribute cannot be used in a module that contains top-level code
  !! @main
  !! ^
  !$ note: top-level code defined in this source file
  !! @main
  !! ^
  ```
-->

<!--
  - test: `atMain_library`

  ```swifttest
  -> // In file "library.swift"
  -> open class C {
         public static func main() { print("Hello") }
     }
  ```
-->

<!--
  - test: `atMain_client`

  ```swifttest
  -> import atMain_library
  -> @main class CC: C { }
  ```
-->

### nonobjc

Apply this attribute to a
method, property, subscript, or initializer declaration
to suppress an implicit `objc` attribute.
The `nonobjc` attribute tells the compiler
to make the declaration unavailable in Objective-C code,
even though it's possible to represent it in Objective-C.

Applying this attribute to an extension
has the same effect as
applying it to every member of that extension
that isn't explicitly marked with the `objc` attribute.

You use the `nonobjc` attribute to resolve circularity
for bridging methods in a class marked with the `objc` attribute,
and to allow overloading of methods and initializers
in a class marked with the `objc` attribute.

A method marked with the `nonobjc` attribute
can't override a method marked with the `objc` attribute.
However, a method marked with the `objc` attribute
can override a method marked with the `nonobjc` attribute.
Similarly, a method marked with the `nonobjc` attribute
can't satisfy a protocol requirement
for a method marked with the `objc` attribute.

### NSApplicationMain

> Deprecated:
> This attribute is deprecated;
> use the <doc:Attributes#main> attribute instead.
> In Swift 6,
> using this attribute produces a compile-time error.

Apply this attribute to a class
to indicate that it's the app delegate.
Using this attribute is equivalent to calling the
`NSApplicationMain(_:_:)` function.

If you don't use this attribute,
supply a `main.swift` file with code at the top level
that calls the `NSApplicationMain(_:_:)` function as follows:

```swift
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

<!--
  Above code isn't tested because it hangs the REPL indefinitely,
  which is correct behavior if you call a non-returning function like this.
-->

The Swift code you compile to make an executable
can contain at most one top-level entry point,
as discussed in <doc:Declarations#Top-Level-Code>.

### NSCopying

Apply this attribute to a stored variable property of a class.
This attribute causes the property's setter to be synthesized with a *copy*
of the property's value --- returned by the `copyWithZone(_:)` method --- instead of the
value of the property itself.
The type of the property must conform to the `NSCopying` protocol.

The `NSCopying` attribute behaves in a way similar to the Objective-C `copy`
property attribute.

<!--
  TODO: If and when Dave includes a section about this in the Guide,
  provide a link to the relevant section.
-->

### NSManaged

Apply this attribute to an instance method or stored variable property
of a class that inherits from `NSManagedObject`
to indicate that Core Data dynamically provides its implementation at runtime,
based on the associated entity description.
For a property marked with the `NSManaged` attribute,
Core Data also provides the storage at runtime.
Applying this attribute also implies the `objc` attribute.

### objc

Apply this attribute to any declaration that can be represented in Objective-C ---
for example, nonnested classes, protocols,
nongeneric enumerations (constrained to integer raw-value types),
properties and methods (including getters and setters) of classes,
protocols and optional members of a protocol,
initializers, and subscripts.
The `objc` attribute tells the compiler
that a declaration is available to use in Objective-C code.

Applying this attribute to an extension
has the same effect as
applying it to every member of that extension
that isn't explicitly marked with the `nonobjc` attribute.

The compiler implicitly adds the `objc` attribute
to subclasses of any class defined in Objective-C.
However, the subclass must not be generic,
and must not inherit from any generic classes.
You can explicitly add the `objc` attribute
to a subclass that meets these criteria,
to specify its Objective-C name as discussed below.
Protocols that are marked with the `objc` attribute can't inherit
from protocols that aren't marked with this attribute.

The `objc` attribute is also implicitly added in the following cases:

- The declaration is an override in a subclass,
  and the superclass's declaration has the `objc` attribute.
- The declaration satisfies a requirement
  from a protocol that has the `objc` attribute.
- The declaration has the `IBAction`, `IBSegueAction`, `IBOutlet`,
  `IBDesignable`, `IBInspectable`,
  `NSManaged`, or `GKInspectable` attribute.

If you apply the `objc` attribute to an enumeration,
each enumeration case is exposed to Objective-C code
as the concatenation of the enumeration name and the case name.
The first letter of the case name is capitalized.
For example, a case named `venus` in a Swift `Planet` enumeration
is exposed to Objective-C code as a case named `PlanetVenus`.

The `objc` attribute optionally accepts a single attribute argument,
which consists of an identifier.
The identifier specifies the name to be exposed to Objective-C
for the entity that the `objc` attribute applies to.
You can use this argument to name
classes, enumerations, enumeration cases, protocols,
methods, getters, setters, and initializers.
If you specify the Objective-C name
for a class, protocol, or enumeration,
include a three-letter prefix on the name,
as described in [Conventions](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH10-SW1)
in [Programming with Objective-C](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210).
The example below exposes
the getter for the `enabled` property of the `ExampleClass`
to Objective-C code as `isEnabled`
rather than just as the name of the property itself.

```swift
class ExampleClass: NSObject {
    @objc var enabled: Bool {
        @objc(isEnabled) get {
            // Return the appropriate value
        }
    }
}
```

<!--
  - test: `objc-attribute`

  ```swifttest
  >> import Foundation
  -> class ExampleClass: NSObject {
  ->    @objc var enabled: Bool {
  ->       @objc(isEnabled) get {
  ->          // Return the appropriate value
  >>          return true
  ->       }
  ->    }
  -> }
  ```
-->

For more information, see
[Importing Swift into Objective-C](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c).

> Note: The argument to the `objc` attribute
> can also change the runtime name for that declaration.
> You use the runtime name when calling functions
> that interact with the Objective-C runtime,
> like [`NSClassFromString(_:)`](https://developer.apple.com/documentation/foundation/1395135-nsclassfromstring),
> and when specifying class names in an app's Info.plist file.
> If you specify a name by passing an argument,
> that name is used as the name in Objective-C code
> and as the runtime name.
> If you omit the argument,
> the name used in Objective-C code matches the name in Swift code,
> and the runtime name follows the normal Swift compiler convention
> of name mangling.

### objcMembers

Apply this attribute to a class declaration,
to implicitly apply the `objc` attribute
to all Objective-C compatible members of the class,
its extensions, its subclasses, and all of the extensions of its subclasses.

Most code should use the `objc` attribute instead,
to expose only the declarations that are needed.
If you need to expose many declarations,
you can group them in an extension that has the `objc` attribute.
The `objcMembers` attribute is a convenience for
libraries that make heavy use of
the introspection facilities of the Objective-C runtime.
Applying the `objc` attribute when it isn't needed
can increase your binary size and adversely affect performance.

<!--
  The binary size comes from the additional thunks
  to translate between calling conventions.
  The performance of linking and launch are slower
  because of the larger symbol table slowing dyld down.
-->

### preconcurrency

Apply this attribute to a declaration,
to suppress strict concurrency checking.
You can apply this attribute
to the following kinds of declarations:

- Imports
- Structures, classes, and actors
- Enumerations and enumeration cases
- Protocols
- Variables and constants
- Subscripts
- Initializers
- Functions

On an import declaration,
this attribute reduces the strictness of concurrency checking
for code that uses types from the imported module.
Specifically,
types from the imported module
that aren't explicitly marked as nonsendable
can be used in a context that requires sendable types.

On other declarations,
this attribute reduces the strictness of concurrency checking
for code that uses the symbol being declared.
When you use this symbol in a scope that has minimal concurrency checking,
concurrency-related constraints specified by that symbol,
such as `Sendable` requirements or global actors,
aren't checked.

You can use this attribute as follows,
to aid in migrating code to strict concurrency checking:

1. Enable strict checking.
1. Annotate imports with the `preconcurrency` attribute
   for modules that haven't enabled strict checking.
1. After migrating a module to strict checking,
   remove the `preconcurrency` attribute.
   The compiler warns you about
   any places where the `preconcurrency` attribute on an import
   no longer has an effect and should be removed.

For other declarations,
add the `preconcurrency` attribute
when you add concurrency-related constraints to the declaration,
if you still have clients
that haven't migrated to strict checking.
Remove the `preconcurrency` attribute after all your clients have migrated.

Declarations from Objective-C are always imported
as if they were marked with the `preconcurrency` attribute.

### propertyWrapper

Apply this attribute to a class, structure, or enumeration declaration
to use that type as a property wrapper.
When you apply this attribute to a type,
you create a custom attribute with the same name as the type.
Apply that new attribute to a property of a class, structure, or enumeration
to wrap access to the property through an instance of the wrapper type;
apply the attribute to a local stored variable declaration
to wrap access to the variable the same way.
Computed variables, global variables, and constants can't use property wrappers.

<!--
  - test: `property-wrappers-can-go-on-stored-variable`

  ```swifttest
  >> @propertyWrapper struct UselessWrapper { var wrappedValue: Int }
  >> func f() {
  >>     @UselessWrapper var d: Int = 20
  >>     print(d)
  >> }
  >> f()
  << 20
  ```
-->

<!--
  - test: `property-wrappers-cant-go-on-constants`

  ```swifttest
  >> @propertyWrapper struct UselessWrapper { var wrappedValue: Int }
  >> func f() {
  >>     @UselessWrapper let d: Int = 20
  >>     print(d)
  >> }
  !$ error: property wrapper can only be applied to a 'var'
  !! @UselessWrapper let d: Int = 20
  !! ^
  ```
-->

<!--
  - test: `property-wrappers-cant-go-on-computed-variable`

  ```swifttest
  >> @propertyWrapper struct UselessWrapper { var wrappedValue: Int }
  >> func f() {
  >>     @UselessWrapper var d: Int { return 20 }
  >>     print(d)
  >> }
  >> f()
  !$ error: property wrapper cannot be applied to a computed property
  !! @UselessWrapper var d: Int { return 20 }
  !! ^
  ```
-->

The wrapper must define a `wrappedValue` instance property.
The *wrapped value* of the property
is the value that the getter and setter for this property expose.
In most cases, `wrappedValue` is a computed value,
but it can be a stored value instead.
The wrapper defines and manages
any underlying storage needed by its wrapped value.
The compiler synthesizes storage for the instance of the wrapper type
by prefixing the name of the wrapped property with an underscore (`_`) ---
for example, the wrapper for `someProperty` is stored as `_someProperty`.
The synthesized storage for the wrapper has an access control level of `private`.

A property that has a property wrapper
can include `willSet` and `didSet` blocks,
but it can't override the compiler-synthesized `get` or `set` blocks.

Swift provides two forms of syntactic sugar
for initialization of a property wrapper.
You can use assignment syntax in the definition of a wrapped value
to pass the expression on the right-hand side of the assignment
as the argument to the `wrappedValue` parameter
of the property wrapper's initializer.
You can also provide arguments to the attribute
when you apply it to a property,
and those arguments are passed to the property wrapper's initializer.
For example, in the code below,
`SomeStruct` calls each of the initializers that `SomeWrapper` defines.

```swift
@propertyWrapper
struct SomeWrapper {
    var wrappedValue: Int
    var someValue: Double
    init() {
        self.wrappedValue = 100
        self.someValue = 12.3
    }
    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
        self.someValue = 45.6
    }
    init(wrappedValue value: Int, custom: Double) {
        self.wrappedValue = value
        self.someValue = custom
    }
}

struct SomeStruct {
    // Uses init()
    @SomeWrapper var a: Int

    // Uses init(wrappedValue:)
    @SomeWrapper var b = 10

    // Both use init(wrappedValue:custom:)
    @SomeWrapper(custom: 98.7) var c = 30
    @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
}
```

<!--
  - test: `propertyWrapper`

  ```swifttest
  -> @propertyWrapper
  -> struct SomeWrapper {
         var wrappedValue: Int
         var someValue: Double
         init() {
             self.wrappedValue = 100
             self.someValue = 12.3
         }
         init(wrappedValue: Int) {
             self.wrappedValue = wrappedValue
             self.someValue = 45.6
         }
         init(wrappedValue value: Int, custom: Double) {
             self.wrappedValue = value
             self.someValue = custom
         }
     }

  -> struct SomeStruct {
  ->     // Uses init()
  ->     @SomeWrapper var a: Int

  ->     // Uses init(wrappedValue:)
  ->     @SomeWrapper var b = 10

  ->     // Both use init(wrappedValue:custom:)
  ->     @SomeWrapper(custom: 98.7) var c = 30
  ->     @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
  -> }
  ```
-->

<!--
  Comments in the SomeStruct part of the example above
  are on the line before instead of at the end of the line
  because the last example gets too long to fit on one line.
-->

<!--
  Initialization of a wrapped property using ``init(wrappedValue:)``
  can be split across multiple statements.
  However, you can only see that behavior using local variables
  which currently can't have a property wrapper.
  It would look like this:

  -> @SomeWrapper var e
  -> e = 20  // Uses init(wrappedValue:)
  -> e = 30  // Uses the property setter
-->

The *projected value* for a wrapped property is a second value
that a property wrapper can use to expose additional functionality.
The author of a property wrapper type
is responsible for determining the meaning of its projected value
and defining the interface that the projected value exposes.
To project a value from a property wrapper,
define a `projectedValue` instance property on the wrapper type.
The compiler synthesizes an identifier for the projected value
by prefixing the name of the wrapped property with a dollar sign (`$`) ---
for example, the projected value for `someProperty` is `$someProperty`.
The projected value has the same access control level
as the original wrapped property.

```swift
@propertyWrapper
struct WrapperWithProjection {
    var wrappedValue: Int
    var projectedValue: SomeProjection {
        return SomeProjection(wrapper: self)
    }
}
struct SomeProjection {
    var wrapper: WrapperWithProjection
}

struct SomeStruct {
    @WrapperWithProjection var x = 123
}
let s = SomeStruct()
s.x           // Int value
s.$x          // SomeProjection value
s.$x.wrapper  // WrapperWithProjection value
```

<!--
  - test: `propertyWrapper-projection`

  ```swifttest
  -> @propertyWrapper
  -> struct WrapperWithProjection {
         var wrappedValue: Int
         var projectedValue: SomeProjection {
             return SomeProjection(wrapper: self)
         }
  }
  -> struct SomeProjection {
         var wrapper: WrapperWithProjection
  }

  -> struct SomeStruct {
  ->     @WrapperWithProjection var x = 123
  -> }
  -> let s = SomeStruct()
  >> _ =
  -> s.x           // Int value
  >> _ =
  -> s.$x          // SomeProjection value
  >> _ =
  -> s.$x.wrapper  // WrapperWithProjection value
  ```
-->

### resultBuilder

Apply this attribute to a class, structure, or enumeration
to use that type as a result builder.
A *result builder* is a type
that builds a nested data structure step by step.
You use result builders to implement a domain-specific language (DSL)
for creating nested data structures in a natural, declarative way.
For an example of how to use the `resultBuilder` attribute,
see <doc:AdvancedOperators#Result-Builders>.

#### Result-Building Methods

A result builder implements static methods described below.
Because all of the result builder's functionality
is exposed through static methods,
you don't ever initialize an instance of that type.
A result builder must implement either the `buildBlock(_:)` method
or both the `buildPartialBlock(first:)`
and `buildPartialBlock(accumulated:next:)` methods.
The other methods ---
which enable additional functionality in the DSL ---
are optional.
The declaration of a result builder type
doesn't actually have to include any protocol conformance.

The description of the static methods uses three types as placeholders.
The type `Expression` is a placeholder
for the type of the result builder's input,
`Component` is a placeholder for the type of a partial result,
and `FinalResult` is a placeholder
for the type of the result that the result builder produces.
You replace these types with the actual types that your result builder uses.
If your result-building methods
don't specify a type for `Expression` or `FinalResult`,
they default to being the same as `Component`.

The block-building methods are as follows:

- term `static func buildBlock(_ components: Component...) -> Component`:
  Combines an array of partial results into a single partial result.

- term `static func buildPartialBlock(first: Component) -> Component`:
  Builds a partial result component from the first component.
  Implement both this method and `buildPartialBlock(accumulated:next:)`
  to support building blocks one component at a time.
  Compared to `buildBlock(_:)`,
  this approach reduces the need for generic overloads
  that handle different numbers of arguments.

- term `static func buildPartialBlock(accumulated: Component, next: Component) -> Component`:
  Builds a partial result component
  by combining an accumulated component with a new component.
  Implement both this method and `buildPartialBlock(first:)`
  to support building blocks one component at a time.
  Compared to `buildBlock(_:)`,
  this approach reduces the need for generic overloads
  that handle different numbers of arguments.

A result builder can implement all three of the block-building methods listed above;
in that case, availability determines which method is called.
By default, Swift calls the `buildPartialBlock(first:)` and `buildPartialBlock(accumulated:next:)`
methods. To make Swift call `buildBlock(_:)` instead,
mark the enclosing declaration as being available
before the availability you write on `buildPartialBlock(first:)` and
`buildPartialBlock(accumulated:next:)`.

The additional result-building methods are as follows:

- term `static func buildOptional(_ component: Component?) -> Component`:
  Builds a partial result from a partial result that can be `nil`.
  Implement this method to support `if` statements
  that don’t include an `else` clause.

- term `static func buildEither(first: Component) -> Component`:
  Builds a partial result whose value varies depending on some condition.
  Implement both this method and `buildEither(second:)`
  to support `switch` statements
  and `if` statements that include an `else` clause.

- term `static func buildEither(second: Component) -> Component`:
  Builds a partial result whose value varies depending on some condition.
  Implement both this method and `buildEither(first:)`
  to support `switch` statements
  and `if` statements that include an `else` clause.

- term `static func buildArray(_ components: [Component]) -> Component`:
  Builds a partial result from an array of partial results.
  Implement this method to support `for` loops.

- term `static func buildExpression(_ expression: Expression) -> Component`:
  Builds a partial result from an expression.
  You can implement this method to perform preprocessing ---
  for example, converting expressions to an internal type ---
  or to provide additional information for type inference at use sites.

- term `static func buildFinalResult(_ component: Component) -> FinalResult`:
  Builds a final result from a partial result.
  You can implement this method as part of a result builder
  that uses a different type for partial and final results,
  or to perform other postprocessing on a result before returning it.

- term `static func buildLimitedAvailability(_ component: Component) -> Component`:
  Builds a partial result that erases type information.
  You can implement this method to prevent type information
  from propagating outside a compiler-control statement
  that performs an availability check.

For example, the code below defines a simple result builder
that builds an array of integers.
This code defines `Component` and `Expression` as type aliases,
to make it easier to match the examples below to the list of methods above.

```swift
@resultBuilder
struct ArrayBuilder {
    typealias Component = [Int]
    typealias Expression = Int
    static func buildExpression(_ element: Expression) -> Component {
        return [element]
    }
    static func buildOptional(_ component: Component?) -> Component {
        guard let component = component else { return [] }
        return component
    }
    static func buildEither(first component: Component) -> Component {
        return component
    }
    static func buildEither(second component: Component) -> Component {
        return component
    }
    static func buildArray(_ components: [Component]) -> Component {
        return Array(components.joined())
    }
    static func buildBlock(_ components: Component...) -> Component {
        return Array(components.joined())
    }
}
```

<!--
  - test: `array-result-builder`

  ```swifttest
  -> @resultBuilder
  -> struct ArrayBuilder {
         typealias Component = [Int]
         typealias Expression = Int
         static func buildExpression(_ element: Expression) -> Component {
             return [element]
         }
         static func buildOptional(_ component: Component?) -> Component {
  >>         print("Building optional...", component as Any)
             guard let component = component else { return [] }
             return component
         }
         static func buildEither(first component: Component) -> Component {
  >>         print("Building first...", component)
             return component
         }
         static func buildEither(second component: Component) -> Component {
  >>         print("Building second...", component)
             return component
         }
         static func buildArray(_ components: [Component]) -> Component {
             return Array(components.joined())
         }
         static func buildBlock(_ components: Component...) -> Component {
             return Array(components.joined())
         }
     }
  ```
-->

#### Result Transformations

The following syntactic transformations are applied recursively
to turn code that uses result-builder syntax
into code that calls the static methods of the result builder type:

- If the result builder has a `buildExpression(_:)` method,
  each expression becomes a call to that method.
  This transformation is always first.
  For example, the following declarations are equivalent:

  ```swift
  @ArrayBuilder var builderNumber: [Int] { 10 }
  var manualNumber = ArrayBuilder.buildExpression(10)
  ```

  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderNumber: [Int] { 10 }
    -> var manualNumber = ArrayBuilder.buildExpression(10)
    >> assert(builderNumber == manualNumber)
    ```
  -->
- An assignment statement is transformed like an expression,
  but is understood to evaluate to `()`.
  You can define an overload of `buildExpression(_:)`
  that takes an argument of type `()` to handle assignments specifically.
- A branch statement that checks an availability condition
  becomes a call to the `buildLimitedAvailability(_:)` method,
  if that method is implemented.
  If you don't implement `buildLimitedAvailability(_:)`,
  then branch statements that check availability
  use the same transformations as other branch statements.
  This transformation happens before the transformation into a call to
  `buildEither(first:)`, `buildEither(second:)`, or `buildOptional(_:)`.

  You use the `buildLimitedAvailability(_:)` method to erase type information
  that changes depending on which branch is taken.
  For example,
  the `buildEither(first:)` and  `buildEither(second:)` methods below
  use a generic type that captures type information about both branches.

  ```swift
  protocol Drawable {
      func draw() -> String
  }
  struct Text: Drawable {
      var content: String
      init(_ content: String) { self.content = content }
      func draw() -> String { return content }
  }
  struct Line<D: Drawable>: Drawable {
      var elements: [D]
      func draw() -> String {
          return elements.map { $0.draw() }.joined(separator: "")
      }
  }
  struct DrawEither<First: Drawable, Second: Drawable>: Drawable {
      var content: Drawable
      func draw() -> String { return content.draw() }
  }

  @resultBuilder
  struct DrawingBuilder {
      static func buildBlock<D: Drawable>(_ components: D...) -> Line<D> {
          return Line(elements: components)
      }
      static func buildEither<First, Second>(first: First)
              -> DrawEither<First, Second> {
          return DrawEither(content: first)
      }
      static func buildEither<First, Second>(second: Second)
              -> DrawEither<First, Second> {
          return DrawEither(content: second)
      }
  }
  ```

  <!-- Comment block with swifttest for the code listing above is after the end of this bulleted list, due to tooling limitations. -->

  However, this approach causes a problem in code that has availability checks:

  ```swift
  @available(macOS 99, *)
  struct FutureText: Drawable {
      var content: String
      init(_ content: String) { self.content = content }
      func draw() -> String { return content }
  }
  @DrawingBuilder var brokenDrawing: Drawable {
      if #available(macOS 99, *) {
          FutureText("Inside.future")  // Problem
      } else {
          Text("Inside.present")
      }
  }
  // The type of brokenDrawing is Line<DrawEither<Line<FutureText>, Line<Text>>>
  ```

  <!-- Comment block with swifttest for the code listing above is after the end of this bulleted list, due to tooling limitations. -->

  In the code above,
  `FutureText` appears as part of the type of `brokenDrawing`
  because it's one of the types in the `DrawEither` generic type.
  This could cause your program to crash if `FutureText`
  isn't available at runtime,
  even in the case where that type is explicitly not being used.

  To solve this problem,
  implement a `buildLimitedAvailability(_:)` method
  to erase type information by returning a type that's always available.
  For example, the code below builds an `AnyDrawable` value
  from its availability check.

  ```swift
  struct AnyDrawable: Drawable {
      var content: Drawable
      func draw() -> String { return content.draw() }
  }
  extension DrawingBuilder {
      static func buildLimitedAvailability(_ content: some Drawable) -> AnyDrawable {
          return AnyDrawable(content: content)
      }
  }

  @DrawingBuilder var typeErasedDrawing: Drawable {
      if #available(macOS 99, *) {
          FutureText("Inside.future")
      } else {
          Text("Inside.present")
      }
  }
  // The type of typeErasedDrawing is Line<DrawEither<AnyDrawable, Line<Text>>>
  ```

  <!-- Comment block with swifttest for the code listing above is after the end of this bulleted list, due to tooling limitations. -->

- A branch statement becomes a series of nested calls to the
  `buildEither(first:)` and `buildEither(second:)` methods.
  The statements' conditions and cases are mapped onto
  the leaf nodes of a binary tree,
  and the statement becomes
  a nested call to the `buildEither` methods
  following the path to that leaf node from the root node.

  For example, if you write a switch statement that has three cases,
  the compiler uses a binary tree with three leaf nodes.
  Likewise,
  because the path from the root node to the second case is
  "second child" and then "first child",
  that case becomes a nested call like
  `buildEither(first: buildEither(second: ... ))`.
  The following declarations are equivalent:

  ```swift
  let someNumber = 19
  @ArrayBuilder var builderConditional: [Int] {
      if someNumber < 12 {
          31
      } else if someNumber == 19 {
          32
      } else {
          33
      }
  }

  var manualConditional: [Int]
  if someNumber < 12 {
      let partialResult = ArrayBuilder.buildExpression(31)
      let outerPartialResult = ArrayBuilder.buildEither(first: partialResult)
      manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
  } else if someNumber == 19 {
      let partialResult = ArrayBuilder.buildExpression(32)
      let outerPartialResult = ArrayBuilder.buildEither(second: partialResult)
      manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
  } else {
      let partialResult = ArrayBuilder.buildExpression(33)
      manualConditional = ArrayBuilder.buildEither(second: partialResult)
  }
  ```

  <!--
    - test: `array-result-builder`

    ```swifttest
    -> let someNumber = 19
    -> @ArrayBuilder var builderConditional: [Int] {
           if someNumber < 12 {
               31
           } else if someNumber == 19 {
               32
           } else {
               33
           }
       }
    << Building second... [32]
    << Building first... [32]

    -> var manualConditional: [Int]
    -> if someNumber < 12 {
           let partialResult = ArrayBuilder.buildExpression(31)
           let outerPartialResult = ArrayBuilder.buildEither(first: partialResult)
           manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
       } else if someNumber == 19 {
           let partialResult = ArrayBuilder.buildExpression(32)
           let outerPartialResult = ArrayBuilder.buildEither(second: partialResult)
           manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
       } else {
           let partialResult = ArrayBuilder.buildExpression(33)
           manualConditional = ArrayBuilder.buildEither(second: partialResult)
       }
    >> assert(builderConditional == manualConditional)
    << Building second... [32]
    << Building first... [32]
    ```
  -->
- A branch statement that might not produce a value,
  like an `if` statement without an `else` clause,
  becomes a call to `buildOptional(_:)`.
  If the `if` statement's condition is satisfied,
  its code block is transformed and passed as the argument;
  otherwise, `buildOptional(_:)` is called with `nil` as its argument.
  For example, the following declarations are equivalent:

  ```swift
  @ArrayBuilder var builderOptional: [Int] {
      if (someNumber % 2) == 1 { 20 }
  }

  var partialResult: [Int]? = nil
  if (someNumber % 2) == 1 {
      partialResult = ArrayBuilder.buildExpression(20)
  }
  var manualOptional = ArrayBuilder.buildOptional(partialResult)
  ```

  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderOptional: [Int] {
           if (someNumber % 2) == 1 { 20 }
       }
    << Building optional... Optional([20])

    -> var partialResult: [Int]? = nil
    -> if (someNumber % 2) == 1 {
           partialResult = ArrayBuilder.buildExpression(20)
       }
    -> var manualOptional = ArrayBuilder.buildOptional(partialResult)
    << Building optional... Optional([20])
    >> assert(builderOptional == manualOptional)
    ```
  -->
- If the result builder implements
  the `buildPartialBlock(first:)`
  and `buildPartialBlock(accumulated:next:)` methods,
  a code block or `do` statement becomes a call to those methods.
  The first statement inside of the block
  is transformed to become an argument
  to the `buildPartialBlock(first:)` method,
  and the remaining statements become nested calls
  to the `buildPartialBlock(accumulated:next:)` method.
  For example, the following declarations are equivalent:

  ```swift
  struct DrawBoth<First: Drawable, Second: Drawable>: Drawable {
      var first: First
      var second: Second
      func draw() -> String { return first.draw() + second.draw() }
  }

  @resultBuilder
  struct DrawingPartialBlockBuilder {
      static func buildPartialBlock<D: Drawable>(first: D) -> D {
          return first
      }
      static func buildPartialBlock<Accumulated: Drawable, Next: Drawable>(
          accumulated: Accumulated, next: Next
      ) -> DrawBoth<Accumulated, Next> {
          return DrawBoth(first: accumulated, second: next)
      }
  }

  @DrawingPartialBlockBuilder var builderBlock: some Drawable {
      Text("First")
      Line(elements: [Text("Second"), Text("Third")])
      Text("Last")
  }

  let partialResult1 = DrawingPartialBlockBuilder.buildPartialBlock(first: Text("first"))
  let partialResult2 = DrawingPartialBlockBuilder.buildPartialBlock(
      accumulated: partialResult1,
      next: Line(elements: [Text("Second"), Text("Third")])
  )
  let manualResult = DrawingPartialBlockBuilder.buildPartialBlock(
      accumulated: partialResult2,
      next: Text("Last")
  )
  ```

  <!--
    - test: `drawing-partial-block-builder`

    ```swifttest
    -> @resultBuilder
    -> struct DrawingPartialBlockBuilder {
           static func buildPartialBlock<D: Drawable>(first: D) -> D {
               return first
           }
           static func buildPartialBlock<Accumulated: Drawable, Next: Drawable>(
               accumulated: Accumulated, next: Next
           ) -> DrawBoth<Accumulated, Next> {
               return DrawBoth(first: accumulated, second: next)
           }
       }
    -> @DrawingPartialBlockBuilder var builderBlock: some Drawable {
          Text("First")
          Line(elements: [Text("Second"), Text("Third")])
          Text("Last")
       }

    -> let partialResult1 = DrawingPartialBlockBuilder.buildPartialBlock(first: Text("first"))
    -> let partialResult2 = DrawingPartialBlockBuilder.buildPartialBlock(
          accumulated: partialResult1,
          next: Line(elements: [Text("Second"), Text("Third")])
       )
       let manualResult = DrawingPartialBlockBuilder.buildPartialBlock(
           accumulated: partialResult2,
           next: Text("Last")
       )
    >> assert(type(of: builderBlock) == type(of: manualResult))
    ```
  -->
- Otherwise, a code block or `do` statement
  becomes a call to the `buildBlock(_:)` method.
  Each of the statements inside of the block is transformed,
  one at a time,
  and they become the arguments to the `buildBlock(_:)` method.
  For example, the following declarations are equivalent:

  ```swift
  @ArrayBuilder var builderBlock: [Int] {
      100
      200
      300
  }

  var manualBlock = ArrayBuilder.buildBlock(
      ArrayBuilder.buildExpression(100),
      ArrayBuilder.buildExpression(200),
      ArrayBuilder.buildExpression(300)
  )
  ```

  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderBlock: [Int] {
           100
           200
           300
       }

    -> var manualBlock = ArrayBuilder.buildBlock(
           ArrayBuilder.buildExpression(100),
           ArrayBuilder.buildExpression(200),
           ArrayBuilder.buildExpression(300)
       )
    >> assert(builderBlock == manualBlock)
    ```
  -->
- A `for` loop becomes a temporary variable, a `for` loop,
  and call to the `buildArray(_:)` method.
  The new `for` loop iterates over the sequence
  and appends each partial result to that array.
  The temporary array is passed as the argument in the `buildArray(_:)` call.
  For example, the following declarations are equivalent:

  ```swift
  @ArrayBuilder var builderArray: [Int] {
      for i in 5...7 {
          100 + i
      }
  }

  var temporary: [[Int]] = []
  for i in 5...7 {
      let partialResult = ArrayBuilder.buildExpression(100 + i)
      temporary.append(partialResult)
  }
  let manualArray = ArrayBuilder.buildArray(temporary)
  ```

  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderArray: [Int] {
           for i in 5...7 {
               100 + i
           }
       }

    -> var temporary: [[Int]] = []
    -> for i in 5...7 {
           let partialResult = ArrayBuilder.buildExpression(100 + i)
           temporary.append(partialResult)
       }
    -> let manualArray = ArrayBuilder.buildArray(temporary)
    >> assert(builderArray == manualArray)
    ```
  -->
- If the result builder has a `buildFinalResult(_:)` method,
  the final result becomes a call to that method.
  This transformation is always last.

<!--
  - test: `result-builder-limited-availability-broken, result-builder-limited-availability-ok`, `drawing-partial-result-builder`

  ```swifttest
  -> protocol Drawable {
         func draw() -> String
     }
  -> struct Text: Drawable {
         var content: String
         init(_ content: String) { self.content = content }
         func draw() -> String { return content }
     }
  -> struct Line<D: Drawable>: Drawable {
         var elements: [D]
         func draw() -> String {
             return elements.map { $0.draw() }.joined(separator: "")
         }
     }
  -> struct DrawEither<First: Drawable, Second: Drawable>: Drawable {
         var content: Drawable
         func draw() -> String { return content.draw() }
     }

  -> @resultBuilder
     struct DrawingBuilder {
         static func buildBlock<D: Drawable>(_ components: D...) -> Line<D> {
             return Line(elements: components)
         }
         static func buildEither<First, Second>(first: First)
                 -> DrawEither<First, Second> {
             return DrawEither(content: first)
         }
         static func buildEither<First, Second>(second: Second)
                 -> DrawEither<First, Second> {
             return DrawEither(content: second)
         }
     }
  ```
-->

<!--
  - test: `result-builder-limited-availability-broken`

  ```swifttest
  -> @available(macOS 99, *)
  -> struct FutureText: Drawable {
         var content: String
         init(_ content: String) { self.content = content }
         func draw() -> String { return content }
     }
  -> @DrawingBuilder var brokenDrawing: Drawable {
         if #available(macOS 99, *) {
             FutureText("Inside.future")  // Problem
         } else {
             Text("Inside.present")
         }
     }
  /> The type of brokenDrawing is \(type(of: brokenDrawing))
  </ The type of brokenDrawing is Line<DrawEither<Line<FutureText>, Line<Text>>>
  !$ warning: result builder 'DrawingBuilder' does not implement 'buildLimitedAvailability'; this code may crash on earlier versions of the OS
  !! if #available(macOS 99, *) {
  !! ^
  !$ note: add 'buildLimitedAvailability(_:)' to the result builder 'DrawingBuilder' to erase type information for less-available types
  !! struct DrawingBuilder {
  !! ^
  ```
-->

<!--
  - test: `result-builder-limited-availability-ok`

  ```swifttest
  >> @available(macOS 99, *)
  >> struct FutureText: Drawable {
  >>     var content: String
  >>     init(_ content: String) { self.content = content }
  >>     func draw() -> String { return content }
  >> }
  >> @DrawingBuilder var x: Drawable {
  >>     if #available(macOS 99, *) {
  >>         FutureText("Inside.future")
  >>     } else {
  >>         Text("Inside.present")
  >>     }
  >> }
  -> struct AnyDrawable: Drawable {
         var content: Drawable
         func draw() -> String { return content.draw() }
     }
  -> extension DrawingBuilder {
         static func buildLimitedAvailability(_ content: some Drawable) -> AnyDrawable {
             return AnyDrawable(content: content)
         }
     }

  -> @DrawingBuilder var typeErasedDrawing: Drawable {
         if #available(macOS 99, *) {
             FutureText("Inside.future")
         } else {
             Text("Inside.present")
         }
     }
  /> The type of typeErasedDrawing is \(type(of: typeErasedDrawing))
  </ The type of typeErasedDrawing is Line<DrawEither<AnyDrawable, Line<Text>>>
  ```
-->

Although the transformation behavior is described in terms of temporary variables,
using a result builder doesn't actually create any new declarations
that are visible from the rest of your code.

You can't use
`break`, `continue`, `defer`, `guard`, or `return` statements,
`while` statements,
or `do`-`catch` statements
in the code that a result builder transforms.

The transformation process doesn't change declarations in the code,
which lets you use temporary constants and variables
to build up expressions piece by piece.
It also doesn't change
`throw` statements,
compile-time diagnostic statements,
or closures that contain a `return` statement.

Whenever possible, transformations are coalesced.
For example, the expression `4 + 5 * 6` becomes
`buildExpression(4 + 5 * 6)` rather multiple calls to that function.
Likewise, nested branch statements become
a single binary tree of calls to the `buildEither` methods.

<!--
  - test: `result-builder-transform-complex-expression`

  ```swifttest
  >> @resultBuilder
  >> struct ArrayBuilder {
  >>     static func buildExpression(_ element: Int) -> [Int] {
  >>         print("Building", element)
  >>         return [element]
  >>     }
  >>     static func buildBlock(_ components: [Int]...) -> [Int] {
  >>         return Array(components.joined())
  >>     }
  >> }
  >> @ArrayBuilder var x: [Int] {
  >>     10+12*3
  >> }
  << Building 46
  >> print(x)
  << [46]
  ```
-->

#### Custom Result-Builder Attributes

Creating a result builder type creates a custom attribute with the same name.
You can apply that attribute in the following places:

- On a function declaration,
  the result builder builds the body of the function.
- On a variable or subscript declaration that includes a getter,
  the result builder builds the body of the getter.
- On a parameter in a function declaration,
  the result builder builds the body of a closure
  that's passed as the corresponding argument.

Applying a result builder attribute doesn't impact ABI compatibility.
Applying a result builder attribute to a parameter
makes that attribute part of the function's interface,
which can affect source compatibility.

### requires_stored_property_inits

Apply this attribute to a class declaration
to require all stored properties within the class
to provide default values as part of their definitions.
This attribute is inferred for any class
that inherits from `NSManagedObject`.

<!--
  - test: `requires_stored_property_inits-requires-default-values`

  ```swifttest
  >> @requires_stored_property_inits class DefaultValueProvided {
         var value: Int = -1
         init() { self.value = 0 }
     }
  -> @requires_stored_property_inits class NoDefaultValue {
         var value: Int
         init() { self.value = 0 }
     }
  !$ error: stored property 'value' requires an initial value
  !! var value: Int
  !! ^
  !$ note: class 'NoDefaultValue' requires all stored properties to have initial values
  !! @requires_stored_property_inits class NoDefaultValue {
  !! ^
  ```
-->

### testable

Apply this attribute to an `import` declaration
to import that module with changes to its access control
that simplify testing the module's code.
Entities in the imported module
that are marked with the `internal` access-level modifier
are imported as if they were declared with the `public` access-level modifier.
Classes and class members
that are marked with the `internal` or `public` access-level modifier
are imported as if they were declared with the `open` access-level modifier.
The imported module must be compiled with testing enabled.

### UIApplicationMain

> Deprecated:
> This attribute is deprecated;
> use the <doc:Attributes#main> attribute instead.
> In Swift 6,
> using this attribute produces a compile-time error.

Apply this attribute to a class
to indicate that it's the app delegate.
Using this attribute is equivalent to calling the
`UIApplicationMain` function and
passing this class's name as the name of the delegate class.

If you don't use this attribute,
supply a `main.swift` file with code at the top level
that calls the [`UIApplicationMain(_:_:_:_:)`](https://developer.apple.com/documentation/uikit/1622933-uiapplicationmain) function.
For example,
if your app uses a custom subclass of `UIApplication`
as its principal class,
call the `UIApplicationMain(_:_:_:_:)` function
instead of using this attribute.

The Swift code you compile to make an executable
can contain at most one top-level entry point,
as discussed in <doc:Declarations#Top-Level-Code>.

### unchecked

Apply this attribute to a protocol type
as part of a type declaration's list of adopted protocols
to turn off enforcement of that protocol's requirements.

The only supported protocol is [`Sendable`](https://developer.apple.com/documentation/swift/sendable).

### usableFromInline

Apply this attribute to a
function, method, computed property, subscript,
initializer, or deinitializer declaration
to allow that symbol to be used in inlinable code
that's defined in the same module as the declaration.
The declaration must have the `internal` access-level modifier.
A structure or class marked `usableFromInline`
can use only types that are public or `usableFromInline` for its properties.
An enumeration marked `usableFromInline`
can use only types that are public or `usableFromInline`
for the raw values and associated values of its cases.

Like the `public` access-level modifier,
this attribute
exposes the declaration as part of the module's public interface.
Unlike `public`,
the compiler doesn't allow declarations marked with `usableFromInline`
to be referenced by name in code outside the module,
even though the declaration's symbol is exported.
However, code outside the module might still be able
to interact with the declaration's symbol by using runtime behavior.

Declarations marked with the `inlinable` attribute
are implicitly usable from inlinable code.
Although either `inlinable` or `usableFromInline`
can be applied to `internal` declarations,
applying both attributes is an error.

<!--
  - test: `usableFromInline-and-inlinable-is-redundant`

  ```swifttest
  >> @usableFromInline @inlinable internal func f() { }
  !$ warning: '@usableFromInline' attribute has no effect on '@inlinable' global function 'f()'
  !! @usableFromInline @inlinable internal func f() { }
  !! ^~~~~~~~~~~~~~~~~~
  ```
-->

### warn_unqualified_access

Apply this attribute to a
top-level function, instance method, or class or static method
to trigger warnings when that function or method is used
without a preceding qualifier,
such as a module name, type name, or instance variable or constant.
Use this attribute to help discourage ambiguity between functions
with the same name that are accessible from the same scope.

For example,
the Swift standard library includes both a top-level
[`min(_:_:)`](https://developer.apple.com/documentation/swift/1538339-min/)
function and a
[`min()`](https://developer.apple.com/documentation/swift/sequence/1641174-min)
method for sequences with comparable elements.
The sequence method is declared with the `warn_unqualified_access` attribute
to help reduce confusion
when attempting to use one or the other from within a `Sequence` extension.

### Declaration Attributes Used by Interface Builder

Interface Builder attributes are declaration attributes
used by Interface Builder to synchronize with Xcode.
Swift provides the following Interface Builder attributes:
`IBAction`, `IBSegueAction`, `IBOutlet`,
`IBDesignable`, and `IBInspectable`.
These attributes are conceptually the same as their
Objective-C counterparts.

<!--
  TODO: Need to link to the relevant discussion of these attributes in Objc.
-->

You apply the `IBOutlet` and `IBInspectable` attributes
to property declarations of a class.
You apply the `IBAction` and `IBSegueAction` attribute
to method declarations of a class
and the `IBDesignable` attribute to class declarations.

Applying the `IBAction`, `IBSegueAction`, `IBOutlet`,
`IBDesignable`, or `IBInspectable` attribute
also implies the `objc` attribute.

## Type Attributes

You can apply type attributes to types only.

### autoclosure

Apply this attribute to delay the evaluation of an expression
by automatically wrapping that expression in a closure with no arguments.
You apply it to a parameter's type in a function or method declaration,
for a parameter whose type is a function type that takes no arguments
and that returns a value of the type of the expression.
For an example of how to use the `autoclosure` attribute,
see <doc:Closures#Autoclosures> and <doc:Types#Function-Type>.

### convention

Apply this attribute to the type of a function
to indicate its calling conventions.

The `convention` attribute always appears with
one of the following arguments:

- The `swift` argument indicates a Swift function reference.
  This is the standard calling convention for function values in Swift.
- The `block` argument indicates an Objective-C compatible block reference.
  The function value is represented as a reference to the block object,
  which is an `id`-compatible Objective-C object that embeds its invocation
  function within the object.
  The invocation function uses the C calling convention.
- The `c` argument indicates a C function reference.
  The function value carries no context and uses the C calling convention.

<!--
  Note: @convention(thin) is private, even though it doesn't have an underscore
  https://forums.swift.org/t/12087/6
-->

With a few exceptions,
a function of any calling convention can be used
when a function any other calling convention is needed.
A nongeneric global function,
a local function that doesn't capture any local variables,
or a closure that doesn't capture any local variables
can be converted to the C calling convention.
Other Swift functions can't be converted to the C calling convention.
A function with the Objective-C block calling convention
can't be converted to the C calling convention.

### escaping

Apply this attribute to a parameter's type in a function or method declaration
to indicate that the parameter's value can be stored for later execution.
This means that the value is allowed to outlive the lifetime of the call.
Function type parameters with the `escaping` type attribute
require explicit use of `self.` for properties or methods.
For an example of how to use the `escaping` attribute,
see <doc:Closures#Escaping-Closures>.

### Sendable

Apply this attribute to the type of a function
to indicate that the function or closure is sendable.
Applying this attribute to a function type
has the same meaning as conforming a non–function type
to the [`Sendable`](https://developer.apple.com/documentation/swift/sendable) protocol.

This attribute is inferred on functions and closures
if the function or closure is used in a context
that expects a sendable value,
and the function or closure satisfies the requirements to be sendable.

A sendable function type
is a subtype of the corresponding nonsendable function type.

## Switch Case Attributes

You can apply switch case attributes to switch cases only.

### unknown

Apply this attribute to a switch case
to indicate that it isn't expected to be matched
by any case of the enumeration that's known
at the time the code is compiled.
For an example of how to use the `unknown` attribute,
see <doc:Statements#Switching-Over-Future-Enumeration-Cases>.

> Grammar of an attribute:
>
> *attribute* → **`@`** *attribute-name* *attribute-argument-clause*_?_ \
> *attribute-name* → *identifier* \
> *attribute-argument-clause* → **`(`** *balanced-tokens*_?_ **`)`** \
> *attributes* → *attribute* *attributes*_?_
>
> *balanced-tokens* → *balanced-token* *balanced-tokens*_?_ \
> *balanced-token* → **`(`** *balanced-tokens*_?_ **`)`** \
> *balanced-token* → **`[`** *balanced-tokens*_?_ **`]`** \
> *balanced-token* → **`{`** *balanced-tokens*_?_ **`}`** \
> *balanced-token* → Any identifier, keyword, literal, or operator \
> *balanced-token* → Any punctuation except  **`(`**,  **`)`**,  **`[`**,  **`]`**,  **`{`**, or  **`}`**

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
