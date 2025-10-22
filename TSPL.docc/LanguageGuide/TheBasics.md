# The Basics

Work with common kinds of data and write basic syntax.

Swift provides many fundamental data types,
including `Int` for integers,
`Double` for floating-point values,
`Bool` for Boolean values,
and `String` for text.
Swift also provides powerful versions of the three primary collection types,
`Array`, `Set`, and `Dictionary`,
as described in <doc:CollectionTypes>.

Swift uses variables to store and refer to values by an identifying name.
Swift also makes extensive use of variables whose values can't be changed.
These are known as constants, and are used throughout Swift to make code safer and clearer in intent
when you work with values that don't need to change.

In addition to familiar types,
Swift introduces advanced types such as tuples.
Tuples enable you to create and pass around groupings of values.
You can use a tuple to return multiple values from a function as a single compound value.

Swift handles the absence of a value
using optional types.
Optionals say either “there *is* a value, which is *x*”
or “there *isn't* a value at all”.
Optionals ensure that code always
checks whether a value is missing before using the value,
and non-optional values are guaranteed to never be missing.

Swift is a safe language,
which means it makes it easier for you find and fix several categories of bugs
as early as possible during the development process,
and lets you guarantee that certain kinds of bugs can't happen.
Type safety enables you to be clear about
the types of values your code works with.
If part of your code requires a `String`,
type safety prevents you from passing it an `Int` by mistake.
Memory safety ensures that you work with valid data only,
not uninitialized memory or deinitialized objects,
and ensures that you work with that data in safe ways ---
even in programs that run multiple pieces of code at the same time.
Swift performs most of its safety checks while building your code,
and in some cases performs additional checks while your code is running.

## Constants and Variables

Constants and variables associate a name
(such as `maximumNumberOfLoginAttempts` or `welcomeMessage`)
with a value of a particular type
(such as the number `10` or the string `"Hello"`).
The value of a *constant* can't be changed once it's set,
whereas a *variable* can be set to a different value in the future.

### Declaring Constants and Variables

Constants and variables must be declared before they're used.
You declare constants with the `let` keyword
and variables with the `var` keyword.
Here's an example of how constants and variables can be used
to track the number of login attempts a user has made:

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> let maximumNumberOfLoginAttempts = 10
  -> var currentLoginAttempt = 0
  ```
-->

This code can be read as:

“Declare a new constant called `maximumNumberOfLoginAttempts`,
and give it a value of `10`.
Then, declare a new variable called `currentLoginAttempt`,
and give it an initial value of `0`.”

In this example,
the maximum number of allowed login attempts is declared as a constant,
because the maximum value never changes.
The current login attempt counter is declared as a variable,
because this value must be incremented after each failed login attempt.

If a stored value in your code won't change,
always declare it as a constant with the `let` keyword.
Use variables only for storing values that change.

When you declare a constant or a variable,
you can give it a value as part of that declaration,
like the examples above.
Alternatively,
you can assign its initial value later in the program,
as long as it's guaranteed to have a value
before the first time you read from it.

```swift
var environment = "development"
let maximumNumberOfLoginAttempts: Int
// maximumNumberOfLoginAttempts has no value yet.

if environment == "development" {
    maximumNumberOfLoginAttempts = 100
} else {
    maximumNumberOfLoginAttempts = 10
}
// Now maximumNumberOfLoginAttempts has a value, and can be read.
```

<!--
  - test: `constantsWithDeferredInitialization`

  ```swifttest
  -> var environment = "development"
  -> let maximumNumberOfLoginAttempts: Int
  -> if environment == "development" {
         maximumNumberOfLoginAttempts = 100
     } else {
         maximumNumberOfLoginAttempts = 10
     }
  >> print(maxNumberOfLoginAttempts)
  << 100
  ```
-->

In this example,
the maximum number of login attempts is constant,
and its value depends on the environment.
In the development environment,
it has a value of 100;
in any other environment, its value is 10.
Both branches of the `if` statement
initialize `maximumNumberOfLoginAttempts` with some value,
guaranteeing that the constant always gets a value.
For information about how Swift checks your code
when you set an initial value this way,
see <doc:Declarations#Constant-Declaration>.

You can declare multiple constants or multiple variables on a single line,
separated by commas:

```swift
var x = 0.0, y = 0.0, z = 0.0
```

<!--
  - test: `multipleDeclarations`

  ```swifttest
  -> var x = 0.0, y = 0.0, z = 0.0
  >> print(x, y, z)
  << 0.0 0.0 0.0
  ```
-->

### Type Annotations

You can provide a *type annotation* when you declare a constant or variable,
to be clear about the kind of values the constant or variable can store.
Write a type annotation by placing a colon after the constant or variable name,
followed by a space, followed by the name of the type to use.

This example provides a type annotation for a variable called `welcomeMessage`,
to indicate that the variable can store `String` values:

```swift
var welcomeMessage: String
```

<!--
  - test: `typeAnnotations`

  ```swifttest
  -> var welcomeMessage: String
  ```
-->

The colon in the declaration means “…of type…,”
so the code above can be read as:

“Declare a variable called `welcomeMessage` that's of type `String`.”

The phrase “of type `String`” means “can store any `String` value.”
Think of it as meaning “the type of thing” (or “the kind of thing”) that can be stored.

The `welcomeMessage` variable can now be set to any string value without error:

```swift
welcomeMessage = "Hello"
```

<!--
  - test: `typeAnnotations`

  ```swifttest
  -> welcomeMessage = "Hello"
  >> print(welcomeMessage)
  << Hello
  ```
-->

You can define multiple related variables of the same type on a single line,
separated by commas, with a single type annotation after the final variable name:

```swift
var red, green, blue: Double
```

<!--
  - test: `typeAnnotations`

  ```swifttest
  -> var red, green, blue: Double
  ```
-->

> Note: It's rare that you need to write type annotations in practice.
> If you provide an initial value for a constant or variable at the point that it's defined,
> Swift can almost always infer the type to be used for that constant or variable,
> as described in <doc:TheBasics#Type-Safety-and-Type-Inference>.
> In the `welcomeMessage` example above, no initial value is provided,
> and so the type of the `welcomeMessage` variable is specified with a type annotation
> rather than being inferred from an initial value.

### Naming Constants and Variables

Constant and variable names can contain almost any character,
including Unicode characters:

```swift
let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> let π = 3.14159
  -> let 你好 = "你好世界"
  -> let 🐶🐮 = "dogcow"
  ```
-->

Constant and variable names can't contain
whitespace characters, mathematical symbols, arrows, private-use Unicode scalar values,
or line- and box-drawing characters.
Nor can they begin with a number,
although numbers may be included elsewhere within the name.

Once you've declared a constant or variable of a certain type,
you can't declare it again with the same name,
or change it to store values of a different type.
Nor can you change a constant into a variable
or a variable into a constant.

> Note: If you need to give a constant or variable the same name as a reserved Swift keyword,
> surround the keyword with backticks (`` ` ``) when using it as a name.
> However, avoid using keywords as names unless you have absolutely no choice.

You can change the value of an existing variable to another value of a compatible type.
In this example, the value of `friendlyWelcome` is changed from
`"Hello!"` to `"Bonjour!"`:

```swift
var friendlyWelcome = "Hello!"
friendlyWelcome = "Bonjour!"
// friendlyWelcome is now "Bonjour!"
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> var friendlyWelcome = "Hello!"
  -> friendlyWelcome = "Bonjour!"
  /> friendlyWelcome is now \"\(friendlyWelcome)\"
  </ friendlyWelcome is now "Bonjour!"
  ```
-->

Unlike a variable, the value of a constant can't be changed after it's set.
Attempting to do so is reported as an error when your code is compiled:

```swift
let languageName = "Swift"
languageName = "Swift++"
// This is a compile-time error: languageName cannot be changed.
```

<!--
  - test: `constantsAndVariables_err`

  ```swifttest
  -> let languageName = "Swift"
  -> languageName = "Swift++"
  // This is a compile-time error: languageName cannot be changed.
  !$ error: cannot assign to value: 'languageName' is a 'let' constant
  !! languageName = "Swift++"
  !! ^~~~~~~~~~~~
  !! /tmp/swifttest.swift:1:1: note: change 'let' to 'var' to make it mutable
  !! let languageName = "Swift"
  !! ^~~
  !! var
  ```
-->

### Printing Constants and Variables

You can print the current value of a constant or variable with the `print(_:separator:terminator:)` function:

```swift
print(friendlyWelcome)
// Prints "Bonjour!"
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> print(friendlyWelcome)
  <- Bonjour!
  ```
-->

The `print(_:separator:terminator:)` function
is a global function that prints one or more values
to an appropriate output.
In Xcode, for example,
the `print(_:separator:terminator:)` function prints its output in Xcode's “console” pane.
The `separator` and `terminator` parameter have default values,
so you can omit them when you call this function.
By default, the function terminates the line it prints by adding a line break.
To print a value without a line break after it,
pass an empty string as the terminator --- for example,
`print(someValue, terminator: "")`.
For information about parameters with default values,
see <doc:Functions#Default-Parameter-Values>.

<!--
  - test: `printingWithoutNewline`

  ```swifttest
  >> let someValue = 10
  -> print(someValue, terminator: "")
  -> print(someValue)
  << 1010
  ```
-->

<!--
  QUESTION: have I referred to Xcode's console correctly here?
  Should I mention other output streams, such as the REPL / playgrounds?
-->

<!--
  NOTE: this is a deliberately simplistic description of what you can do with print().
  It will be expanded later on.
-->

Swift uses *string interpolation* to include the name of a constant or variable
as a placeholder in a longer string,
and to prompt Swift to replace it with the current value of that constant or variable.
Wrap the name in parentheses and escape it with a backslash before the opening parenthesis:

```swift
print("The current value of friendlyWelcome is \(friendlyWelcome)")
// Prints "The current value of friendlyWelcome is Bonjour!"
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> print("The current value of friendlyWelcome is \(friendlyWelcome)")
  <- The current value of friendlyWelcome is Bonjour!
  ```
-->

> Note: All options you can use with string interpolation
> are described in <doc:StringsAndCharacters#String-Interpolation>.

## Comments

Use comments to include nonexecutable text in your code,
as a note or reminder to yourself.
Comments are ignored by the Swift compiler when your code is compiled.

Comments in Swift are very similar to comments in C.
Single-line comments begin with two forward-slashes (`//`):

```swift
// This is a comment.
```

<!--
  - test: `comments`

  ```swifttest
  -> // This is a comment.
  ```
-->

Multiline comments start with a forward-slash followed by an asterisk (`/*`)
and end with an asterisk followed by a forward-slash (`*/`):

```swift
/* This is also a comment
but is written over multiple lines. */
```

<!--
  - test: `comments`

  ```swifttest
  -> /* This is also a comment
     but is written over multiple lines. */
  ```
-->

Unlike multiline comments in C,
multiline comments in Swift can be nested inside other multiline comments.
You write nested comments by starting a multiline comment block
and then starting a second multiline comment within the first block.
The second block is then closed, followed by the first block:

```swift
/* This is the start of the first multiline comment.
    /* This is the second, nested multiline comment. */
This is the end of the first multiline comment. */
```

<!--
  - test: `comments`

  ```swifttest
  -> /* This is the start of the first multiline comment.
        /* This is the second, nested multiline comment. */
     This is the end of the first multiline comment. */
  ```
-->

Nested multiline comments enable you to comment out large blocks of code quickly and easily,
even if the code already contains multiline comments.

## Semicolons

Unlike many other languages,
Swift doesn't require you to write a semicolon (`;`) after each statement in your code,
although you can do so if you wish.
However, semicolons *are* required
if you want to write multiple separate statements on a single line:

```swift
let cat = "🐱"; print(cat)
// Prints "🐱".
```

<!--
  - test: `semiColons`

  ```swifttest
  -> let cat = "🐱"; print(cat)
  <- 🐱
  ```
-->

## Integers

*Integers* are whole numbers with no fractional component,
such as `42` and `-23`.
Integers are either *signed* (positive, zero, or negative)
or *unsigned* (positive or zero),
and their maximum and minimum value depends on their *size*
(the number of bits used to store values).
The integer types include their size and sign in their names ---
for example, an 8-bit unsigned integer is of type `UInt8`,
and a 32-bit signed integer is of type `Int32`.
Like all types in Swift, these integer types have capitalized names.
In most cases,
when you don't need to specify the exact integer size,
you use the `Int` type described below.

Integer types behave like most arithmetic you do by hand;
integer math produces results without approximating.
These characteristics make integers suitable for counting
and other calculations that represent exact amounts ---
for example,
finding the longest line in a text file,
applying a score multiplier in a game,
or totaling prices on a receipt.

Although integers don't have a fractional component,
you can use integers to represent quantities with fractions
by counting a fractional part.
For example,
you can represent $1.23 by storing the number `123`
in an integer that counts cents.
This approach is known as *fixed-point math*
because the decimal point is at a fixed position in the number.
In the example above,
the number `123` is understood to have a decimal point
before the last two digits.

> Note:
> For calculations in a regulated area like finance or construction,
> or in a domain that has an expectation of high-precision results,
> you might need a special-purpose numeric type
> that implements behaviors such as rounding and truncation,
> according to that area's requirements.

### Integer Bounds

You can access the minimum and maximum values of each integer type
with its `min` and `max` properties:

```swift
let minValue = UInt8.min  // minValue is equal to 0, and is of type UInt8
let maxValue = UInt8.max  // maxValue is equal to 255, and is of type UInt8
```

<!--
  - test: `integerBounds`

  ```swifttest
  -> let minValue = UInt8.min  // minValue is equal to 0, and is of type UInt8
  -> let maxValue = UInt8.max  // maxValue is equal to 255, and is of type UInt8
  >> print(minValue, maxValue)
  << 0 255
  ```
-->

The values of these properties are of the appropriate-sized number type
(such as `UInt8` in the example above)
and can therefore be used in expressions alongside other values of the same type.

Calculations that produce out-of-bounds results,
like a number larger that the `max` property,
stop the program's execution instead of storing an invalid result.
You can explicitly make the operation overflow instead,
as described in <doc:AdvancedOperators#Overflow-Operators>.

### Int

In most cases, you don't need to pick a specific size of integer to use in your code.
Swift provides an additional integer type, `Int`,
which has the same size as the current platform's native word size:

- On a 32-bit platform, `Int` is the same size as `Int32`.
- On a 64-bit platform, `Int` is the same size as `Int64`.

Unless you need to work with a specific size of integer,
always use `Int` for integer values in your code.
This aids code consistency and interoperability.
Even on 32-bit platforms, `Int` can store any value between `-2,147,483,648` and `2,147,483,647`,
and is large enough for many integer ranges.

### UInt

Swift also provides an unsigned integer type, `UInt`,
which has the same size as the current platform's native word size:

- On a 32-bit platform, `UInt` is the same size as `UInt32`.
- On a 64-bit platform, `UInt` is the same size as `UInt64`.

> Note: Use `UInt` only when you specifically need
> an unsigned integer type with the same size as the platform's native word size.
> If this isn't the case, `Int` is preferred,
> even when the values to be stored are known to be nonnegative.
> A consistent use of `Int` for integer values aids code interoperability,
> avoids the need to convert between different number types,
> and matches integer type inference, as described in <doc:TheBasics#Type-Safety-and-Type-Inference>.

## Floating-Point Numbers

*Floating-point numbers* have a fractional component,
such as `3.14159`, `0.1`, and `-273.15`.
Swift provides a variety of floating-point types
that support different sizes of numbers,
just like it has different sizes of integers.
If you don't need to specify an exact size, use `Double`.
Otherwise,
use the type that includes the needed size in its name,
such as `Float16` or `Float80`.
Following common terminology for floating-point math,
`Float` uses 32 bits and `Double` uses 64 bits.
You can also write these types as `Float32` or `Float64`.
For example,
graphics code often uses `Float` to match the GPU's fastest data type.
Some floating-point types are supported only by certain platforms,
but `Float` and `Double` are available on all platforms.

Floating-point numbers let you work with
very small and very large numbers,
but can't represent every possible value in that range.
Unlike integer calculations,
which always produce an exact result,
floating-point math rounds results to the nearest representable number.
For example,
when storing the number 10,000 as a `Float`,
the next largest number you can represent is 10,000.001 ----
values between these two numbers round to one or the other.
The space between numbers is also variable;
there are larger spaces between large numbers
than between small numbers.
For example,
the next `Float` value after 0.001 is 0.0010000002,
which is smaller than the spacing after 10,000.

<!---
var n: Float = 10_000
print(n.nextUp)
n = 0.001
print(n.nextUp)
-->

Floating-point numbers have values for
negative zero, infinity, and negative infinity,
which represent overflow and underflow in calculations.
They also have include not-a-number (NaN) values
to represent an invalid or undefined result,
such as dividing zero by zero.
This behavior is different from integers,
which stop the program if they can't represent the result.

If you need the same spacing between all possible values,
or if the calculations you're doing
require exact results
and don't call for the special values listed above,
a floating-point number might not be the right data type.
Consider using fixed-point numbers instead,
as described in <doc:TheBasics#Integers>.

## Type Safety and Type Inference

Every value in a Swift program has a type.
Every place you store a value ---
including constants, variables, and properties ---
also has a type.
You might write the type explicitly using a type annotation,
or Swift might infer the type from an initial value.
Every place in your code where you provide a value,
that value's type must match the place you use it.
For example,
if part of your code requires a `String`,
you can't pass it an `Int` by mistake.
This kind of checking makes Swift a *type-safe* language.

A type safe language encourages you to be clear about
the types of values your code works with.
Values of one type are never implicitly converted to another type.
However, some types can be explicitly converted.
When building code,
Swift checks the code for type safety
and flags any mismatched types as errors.

Type checking helps you avoid errors when you're working with different types of values.
However, this doesn't mean that you have to specify the type of
every constant and variable that you declare.
If you don't specify the type of value you need,
Swift uses *type inference* to work out the appropriate type.
Type inference enables a compiler to
deduce the type of a particular expression automatically when it compiles your code,
simply by examining the values you provide.

Because of type inference, Swift requires far fewer type declarations
than languages such as C or Objective-C.
Constants and variables are still explicitly typed,
but much of the work of specifying their type is done for you.

Type inference is particularly useful
when you declare a constant or variable with an initial value.
This is often done by assigning a *literal value* (or *literal*)
to the constant or variable at the point that you declare it.
(A literal value is a value that appears directly in your source code,
such as `42` and `3.14159` in the examples below.)

For example, if you assign a literal value of `42` to a new constant
without saying what type it is,
Swift infers that you want the constant to be an `Int`,
because you have initialized it with a number that looks like an integer:

```swift
let meaningOfLife = 42
// meaningOfLife is inferred to be of type Int
```

<!--
  - test: `typeInference`

  ```swifttest
  -> let meaningOfLife = 42
  // meaningOfLife is inferred to be of type Int
  >> print(type(of: meaningOfLife))
  << Int
  ```
-->

Likewise, if you don't specify a type for a floating-point literal,
Swift infers that you want to create a `Double`:

```swift
let pi = 3.14159
// pi is inferred to be of type Double
```

<!--
  - test: `typeInference`

  ```swifttest
  -> let pi = 3.14159
  // pi is inferred to be of type Double
  >> print(type(of: pi))
  << Double
  ```
-->

Swift always chooses `Double` (rather than `Float`)
when inferring the type of floating-point numbers.

If you combine integer and floating-point literals in an expression,
a type of `Double` will be inferred from the context:

```swift
let anotherPi = 3 + 0.14159
// anotherPi is also inferred to be of type Double
```

<!--
  - test: `typeInference`

  ```swifttest
  -> let anotherPi = 3 + 0.14159
  // anotherPi is also inferred to be of type Double
  >> print(type(of: anotherPi))
  << Double
  ```
-->

The literal value of `3` has no explicit type in and of itself,
and so an appropriate output type of `Double` is inferred
from the presence of a floating-point literal as part of the addition.

## Numeric Literals

Integer literals can be written as:

- A *decimal* number, with no prefix
- A *binary* number, with a `0b` prefix
- An *octal* number, with a `0o` prefix
- A *hexadecimal* number, with a `0x` prefix

All of these integer literals have a decimal value of `17`:

```swift
let decimalInteger = 17
let binaryInteger = 0b10001       // 17 in binary notation
let octalInteger = 0o21           // 17 in octal notation
let hexadecimalInteger = 0x11     // 17 in hexadecimal notation
```

<!--
  - test: `numberLiterals`

  ```swifttest
  -> let decimalInteger = 17
  -> let binaryInteger = 0b10001       // 17 in binary notation
  -> let octalInteger = 0o21           // 17 in octal notation
  -> let hexadecimalInteger = 0x11     // 17 in hexadecimal notation
  >> print(binaryInteger, octalInteger, hexadecimalInteger)
  << 17 17 17
  ```
-->

Floating-point literals can be decimal (with no prefix),
or hexadecimal (with a `0x` prefix).
They must always have a number (or hexadecimal number) on both sides of the decimal point.
Decimal floats can also have an optional *exponent*,
indicated by an uppercase or lowercase `e`;
hexadecimal floats must have an exponent,
indicated by an uppercase or lowercase `p`.

<!--
  - test: `float-required-vs-optional-exponent-err`

  ```swifttest
  -> let hexWithout = 0x1.5
  !$ error: hexadecimal floating point literal must end with an exponent
  !! let hexWithout = 0x1.5
  !!                       ^
  ```
-->

<!--
  - test: `float-required-vs-optional-exponent`

  ```swifttest
  -> let hexWith = 0x1.5p7
  -> let decimalWithout = 0.5
  -> let decimalWith = 0.5e7
  ```
-->

For decimal numbers with an exponent of `x`,
the base number is multiplied by 10ˣ:

- `1.25e2` means 1.25 x 10², or `125.0`.
- `1.25e-2` means 1.25 x 10⁻², or `0.0125`.

For hexadecimal numbers with an exponent of `x`,
the base number is multiplied by 2ˣ:

- `0xFp2` means 15 x 2², or `60.0`.
- `0xFp-2` means 15 x 2⁻², or `3.75`.

All of these floating-point literals have a decimal value of `12.1875`:

```swift
let decimalDouble = 12.1875
let exponentDouble = 1.21875e1
let hexadecimalDouble = 0xC.3p0
```

<!--
  - test: `numberLiterals`

  ```swifttest
  -> let decimalDouble = 12.1875
  -> let exponentDouble = 1.21875e1
  -> let hexadecimalDouble = 0xC.3p0
  ```
-->

Numeric literals can contain extra formatting to make them easier to read.
Both integers and floats can be padded with extra zeros
and can contain underscores to help with readability.
Neither type of formatting affects the underlying value of the literal:

```swift
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```

<!--
  - test: `numberLiterals`

  ```swifttest
  -> let paddedDouble = 000123.456
  -> let oneMillion = 1_000_000
  -> let justOverOneMillion = 1_000_000.000_000_1
  ```
-->

## Numeric Type Conversion

Use the `Int` type for all general-purpose integer constants and variables in your code,
even if they're known to be nonnegative.
Using the default integer type in everyday situations means that
integer constants and variables are immediately interoperable in your code
and will match the inferred type for integer literal values.

Use other integer types only when they're specifically needed for the task at hand,
because of explicitly sized data from an external source,
or for performance, memory usage, or other necessary optimization.
Using explicitly sized types in these situations
helps to catch any accidental value overflows
and implicitly documents the nature of the data being used.

### Integer Conversion

The range of numbers that can be stored in an integer constant or variable
is different for each numeric type.
An `Int8` constant or variable can store numbers between `-128` and `127`,
whereas a `UInt8` constant or variable can store numbers between `0` and `255`.
A number that won't fit into a constant or variable of a sized integer type
is reported as an error when your code is compiled:

```swift
let cannotBeNegative: UInt8 = -1
// UInt8 can't store negative numbers, and so this will report an error
let tooBig: Int8 = Int8.max + 1
// Int8 can't store a number larger than its maximum value,
// and so this will also report an error
```

<!--
  - test: `constantsAndVariablesOverflowError`

  ```swifttest
  -> let cannotBeNegative: UInt8 = -1
  // UInt8 can't store negative numbers, and so this will report an error
  -> let tooBig: Int8 = Int8.max + 1
  // Int8 can't store a number larger than its maximum value,
  // and so this will also report an error
  !! /tmp/swifttest.swift:2:29: error: arithmetic operation '127 + 1' (on type 'Int8') results in an overflow
  !! let tooBig: Int8 = Int8.max + 1
  !!                    ~~~~~~~~ ^ ~
  !! /tmp/swifttest.swift:1:31: error: negative integer '-1' overflows when stored into unsigned type 'UInt8'
  !! let cannotBeNegative: UInt8 = -1
  !!                                ^
  ```
-->

Because each numeric type can store a different range of values,
you must opt in to numeric type conversion on a case-by-case basis.
This opt-in approach prevents hidden conversion errors
and helps make type conversion intentions explicit in your code.

To convert one specific number type to another,
you initialize a new number of the desired type with the existing value.
In the example below,
the constant `twoThousand` is of type `UInt16`,
whereas the constant `one` is of type `UInt8`.
They can't be added together directly,
because they're not of the same type.
Instead, this example calls `UInt16(one)` to create
a new `UInt16` initialized with the value of `one`,
and uses this value in place of the original:

```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

<!--
  - test: `typeConversion`

  ```swifttest
  -> let twoThousand: UInt16 = 2_000
  -> let one: UInt8 = 1
  -> let twoThousandAndOne = twoThousand + UInt16(one)
  >> print(twoThousandAndOne)
  << 2001
  ```
-->

Because both sides of the addition are now of type `UInt16`,
the addition is allowed.
The output constant (`twoThousandAndOne`) is inferred to be of type `UInt16`,
because it's the sum of two `UInt16` values.

`SomeType(ofInitialValue)` is the default way to call the initializer of a Swift type
and pass in an initial value.
Behind the scenes, `UInt16` has an initializer that accepts a `UInt8` value,
and so this initializer is used to make a new `UInt16` from an existing `UInt8`.
You can't pass in *any* type here, however ---
it has to be a type for which `UInt16` provides an initializer.
Extending existing types to provide initializers that accept new types
(including your own type definitions)
is covered in <doc:Extensions>.

### Integer and Floating-Point Conversion

Conversions between integer and floating-point numeric types must be made explicit:

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi equals 3.14159, and is inferred to be of type Double
```

<!--
  - test: `typeConversion`

  ```swifttest
  -> let three = 3
  -> let pointOneFourOneFiveNine = 0.14159
  -> let pi = Double(three) + pointOneFourOneFiveNine
  /> pi equals \(pi), and is inferred to be of type Double
  </ pi equals 3.14159, and is inferred to be of type Double
  ```
-->

Here, the value of the constant `three` is used to create a new value of type `Double`,
so that both sides of the addition are of the same type.
Without this conversion in place, the addition would not be allowed.

Floating-point to integer conversion must also be made explicit.
An integer type can be initialized with a `Double` or `Float` value:

```swift
let integerPi = Int(pi)
// integerPi equals 3, and is inferred to be of type Int
```

<!--
  - test: `typeConversion`

  ```swifttest
  -> let integerPi = Int(pi)
  /> integerPi equals \(integerPi), and is inferred to be of type Int
  </ integerPi equals 3, and is inferred to be of type Int
  ```
-->

Floating-point values are always truncated when used to initialize a new integer value in this way.
This means that `4.75` becomes `4`, and `-3.9` becomes `-3`.

> Note: The rules for combining numeric constants and variables are different from
> the rules for numeric literals.
> The literal value `3` can be added directly to the literal value `0.14159`,
> because number literals don't have an explicit type in and of themselves.
> Their type is inferred only at the point that they're evaluated by the compiler.

<!--
  NOTE: this section on explicit conversions could be included in the Operators section.
  I think it's more appropriate here, however,
  and helps to reinforce the “just use Int” message.
-->

## Type Aliases

*Type aliases* define an alternative name for an existing type.
You define type aliases with the `typealias` keyword.

Type aliases are useful when you want to refer to an existing type
by a name that's contextually more appropriate,
such as when working with data of a specific size from an external source:

```swift
typealias AudioSample = UInt16
```

<!--
  - test: `typeAliases`

  ```swifttest
  -> typealias AudioSample = UInt16
  ```
-->

Once you define a type alias,
you can use the alias anywhere you might use the original name:

```swift
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound is now 0
```

<!--
  - test: `typeAliases`

  ```swifttest
  -> var maxAmplitudeFound = AudioSample.min
  /> maxAmplitudeFound is now \(maxAmplitudeFound)
  </ maxAmplitudeFound is now 0
  ```
-->

Here, `AudioSample` is defined as an alias for `UInt16`.
Because it's an alias,
the call to `AudioSample.min` actually calls `UInt16.min`,
which provides an initial value of `0` for the `maxAmplitudeFound` variable.

## Booleans

Swift has a basic *Boolean* type, called `Bool`.
Boolean values are referred to as *logical*,
because they can only ever be true or false.
Swift provides two Boolean constant values,
`true` and `false`:

```swift
let orangesAreOrange = true
let turnipsAreDelicious = false
```

<!--
  - test: `booleans`

  ```swifttest
  -> let orangesAreOrange = true
  -> let turnipsAreDelicious = false
  ```
-->

The types of `orangesAreOrange` and `turnipsAreDelicious`
have been inferred as `Bool` from the fact that
they were initialized with Boolean literal values.
As with `Int` and `Double` above,
you don't need to declare constants or variables as `Bool`
if you set them to `true` or `false` as soon as you create them.

Boolean values are particularly useful when you work with conditional statements
such as the `if` statement:

```swift
if turnipsAreDelicious {
    print("Mmm, tasty turnips!")
} else {
    print("Eww, turnips are horrible.")
}
// Prints "Eww, turnips are horrible."
```

<!--
  - test: `booleans`

  ```swifttest
  -> if turnipsAreDelicious {
        print("Mmm, tasty turnips!")
     } else {
        print("Eww, turnips are horrible.")
     }
  <- Eww, turnips are horrible.
  ```
-->

Conditional statements such as the `if` statement are covered in more detail in <doc:ControlFlow>.

Swift's type safety prevents non-Boolean values from being substituted for `Bool`.
The following example reports a compile-time error:

```swift
let i = 1
if i {
    // this example will not compile, and will report an error
}
```

<!--
  - test: `booleansNotBoolean`

  ```swifttest
  -> let i = 1
  -> if i {
        // this example will not compile, and will report an error
     }
  !$ error: type 'Int' cannot be used as a boolean; test for '!= 0' instead
  !! if i {
  !!   ^
  !! ( != 0)
  ```
-->

However, the alternative example below is valid:

```swift
let i = 1
if i == 1 {
    // this example will compile successfully
}
```

<!--
  - test: `booleansIsBoolean`

  ```swifttest
  -> let i = 1
  -> if i == 1 {
        // this example will compile successfully
     }
  ```
-->

The result of the `i == 1` comparison is of type `Bool`,
and so this second example passes the type checking.
Comparisons like `i == 1` are discussed in <doc:BasicOperators>.

As with other examples of type safety in Swift,
this approach avoids accidental errors
and ensures that the intention of a particular section of code is always clear.

## Tuples

*Tuples* group multiple values into a single compound value.
The values within a tuple can be of any type
and don't have to be of the same type as each other.

In this example, `(404, "Not Found")` is a tuple that describes an *HTTP status code*.
An HTTP status code is a special value returned by a web server whenever you request a web page.
A status code of `404 Not Found` is returned if you request a webpage that doesn't exist.

```swift
let http404Error = (404, "Not Found")
// http404Error is of type (Int, String), and equals (404, "Not Found")
```

<!--
  - test: `tuples`

  ```swifttest
  -> let http404Error = (404, "Not Found")
  /> http404Error is of type (Int, String), and equals (\(http404Error.0), \"\(http404Error.1)\")
  </ http404Error is of type (Int, String), and equals (404, "Not Found")
  ```
-->

The `(404, "Not Found")` tuple groups together an `Int` and a `String`
to give the HTTP status code two separate values:
a number and a human-readable description.
It can be described as “a tuple of type `(Int, String)`”.

You can create tuples from any permutation of types,
and they can contain as many different types as you like.
There's nothing stopping you from having
a tuple of type `(Int, Int, Int)`, or `(String, Bool)`,
or indeed any other permutation you require.

You can *decompose* a tuple's contents into separate constants or variables,
which you then access as usual:

```swift
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)")
// Prints "The status code is 404".
print("The status message is \(statusMessage)")
// Prints "The status message is Not Found".
```

<!--
  - test: `tuples`

  ```swifttest
  -> let (statusCode, statusMessage) = http404Error
  -> print("The status code is \(statusCode)")
  <- The status code is 404
  -> print("The status message is \(statusMessage)")
  <- The status message is Not Found
  ```
-->

If you only need some of the tuple's values,
ignore parts of the tuple with an underscore (`_`)
when you decompose the tuple:

```swift
let (justTheStatusCode, _) = http404Error
print("The status code is \(justTheStatusCode)")
// Prints "The status code is 404".
```

<!--
  - test: `tuples`

  ```swifttest
  -> let (justTheStatusCode, _) = http404Error
  -> print("The status code is \(justTheStatusCode)")
  <- The status code is 404
  ```
-->

Alternatively,
access the individual element values in a tuple using index numbers starting at zero:

```swift
print("The status code is \(http404Error.0)")
// Prints "The status code is 404".
print("The status message is \(http404Error.1)")
// Prints "The status message is Not Found".
```

<!--
  - test: `tuples`

  ```swifttest
  -> print("The status code is \(http404Error.0)")
  <- The status code is 404
  -> print("The status message is \(http404Error.1)")
  <- The status message is Not Found
  ```
-->

You can name the individual elements in a tuple when the tuple is defined:

```swift
let http200Status = (statusCode: 200, description: "OK")
```

<!--
  - test: `tuples`

  ```swifttest
  -> let http200Status = (statusCode: 200, description: "OK")
  ```
-->

If you name the elements in a tuple,
you can use the element names to access the values of those elements:

```swift
print("The status code is \(http200Status.statusCode)")
// Prints "The status code is 200".
print("The status message is \(http200Status.description)")
// Prints "The status message is OK".
```

<!--
  - test: `tuples`

  ```swifttest
  -> print("The status code is \(http200Status.statusCode)")
  <- The status code is 200
  -> print("The status message is \(http200Status.description)")
  <- The status message is OK
  ```
-->

Tuples are particularly useful as the return values of functions.
A function that tries to retrieve a web page might return the `(Int, String)` tuple type
to describe the success or failure of the page retrieval.
By returning a tuple with two distinct values,
each of a different type,
the function provides more useful information about its outcome
than if it could only return a single value of a single type.
For more information, see <doc:Functions#Functions-with-Multiple-Return-Values>.

> Note: Tuples are useful for simple groups of related values.
> They're not suited to the creation of complex data structures.
> If your data structure is likely to be more complex,
> model it as a class or structure, rather than as a tuple.
> For more information, see <doc:ClassesAndStructures>.

## Optionals

You use *optionals* in situations where a value may be absent.
An optional represents two possibilities:
Either there *is* a value of a specified type,
and you can unwrap the optional to access that value,
or there *isn't* a value at all.

As an example of a value that might be missing,
Swift's `Int` type has an initializer
that tries to convert a `String` value into an `Int` value.
However, only some strings can be converted into integers.
The string `"123"` can be converted into the numeric value `123`,
but the string `"hello, world"` doesn't have a corresponding numeric value.
The example below uses the initializer to try to convert a `String` into an `Int`:

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)
// The type of convertedNumber is "optional Int"
```

<!--
  - test: `optionals`

  ```swifttest
  -> let possibleNumber = "123"
  -> let convertedNumber = Int(possibleNumber)
  // convertedNumber is inferred to be of type "Int?", or "optional Int"
  >> print(type(of: convertedNumber))
  << Optional<Int>
  ```
-->

Because the initializer in the code above might fail,
it returns an *optional* `Int`, rather than an `Int`.

To write an optional type,
you write a question mark (`?`)
after the name of the type that the optional contains ---
for example, the type of an optional `Int` is `Int?`.
An optional `Int` always contains
either some `Int` value or no value at all.
It can't contain anything else, like a `Bool` or `String` value.

### nil

You set an optional variable to a valueless state
by assigning it the special value `nil`:

```swift
var serverResponseCode: Int? = 404
// serverResponseCode contains an actual Int value of 404
serverResponseCode = nil
// serverResponseCode now contains no value
```

<!--
  - test: `optionals`

  ```swifttest
  -> var serverResponseCode: Int? = 404
  /> serverResponseCode contains an actual Int value of \(serverResponseCode!)
  </ serverResponseCode contains an actual Int value of 404
  -> serverResponseCode = nil
  // serverResponseCode now contains no value
  ```
-->

If you define an optional variable without providing a default value,
the variable is automatically set to `nil`:

```swift
var surveyAnswer: String?
// surveyAnswer is automatically set to nil
```

<!--
  - test: `optionals`

  ```swifttest
  -> var surveyAnswer: String?
  // surveyAnswer is automatically set to nil
  ```
-->

You can use an `if` statement to find out whether an optional contains a value
by comparing the optional against `nil`.
You perform this comparison with the “equal to” operator (`==`)
or the “not equal to” operator (`!=`).

If an optional has a value, it's considered as “not equal to” `nil`:

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)

if convertedNumber != nil {
    print("convertedNumber contains some integer value.")
}
// Prints "convertedNumber contains some integer value."
```

<!--
  - test: `optionals`

  ```swifttest
  -> if convertedNumber != nil {
        print("convertedNumber contains some integer value.")
     }
  <- convertedNumber contains some integer value.
  ```
-->

You can't use `nil` with non-optional constants or variables.
If a constant or variable in your code needs to work with
the absence of a value under certain conditions,
declare it as an optional value of the appropriate type.
A constant or variable that's declared as a non-optional value
is guaranteed to never contain a `nil` value.
If you try to assign `nil` to a non-optional value,
you'll get a compile-time error.

This separation of optional and non-optional values
lets you explicitly mark what information can be missing,
and makes it easier to write code that handle missing values.
You can't accidentally treat an optional as if it were non-optional
because this mistake produces an error at compile time.
After you unwrap the value,
none of the other code that works with that value needs to check for `nil`,
so there's no need to repeatedly check the same value
in different parts of your code.

When you access an optional value,
your code always handles both the `nil` and non-`nil` case.
There are several things you can do when a value is missing,
as described in the following sections:

- Skip the code that operates on the value when it's `nil`.

- Propagate the `nil` value,
  by returning `nil`
  or using the `?.` operator described in <doc:OptionalChaining>.

- Provide a fallback value, using the `??` operator.

- Stop program execution, using the `!` operator.

> Note:
> In Objective-C, `nil` is a pointer to a nonexistent object.
> In Swift, `nil` isn't a pointer --- it's the absence of a value of a certain type.
> Optionals of *any* type can be set to `nil`, not just object types.

### Optional Binding

You use optional binding to find out whether an optional contains a value,
and if so, to make that value available as a temporary constant or variable.
Optional binding can be used with `if`, `guard`, and `while` statements
to check for a value inside an optional,
and to extract that value into a constant or variable,
as part of a single action.
For more information about `if`, `guard`, and `while` statements,
see <doc:ControlFlow>.

Write an optional binding for an `if` statement as follows:

```swift
if let <#constantName#> = <#someOptional#> {
   <#statements#>
}
```

You can rewrite the `possibleNumber` example from
the <doc:TheBasics#Optionals> section
to use optional binding rather than forced unwrapping:

```swift
if let actualNumber = Int(possibleNumber) {
    print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
} else {
    print("The string \"\(possibleNumber)\" couldn't be converted to an integer")
}
// Prints "The string "123" has an integer value of 123".
```

<!--
  - test: `optionals`

  ```swifttest
  -> if let actualNumber = Int(possibleNumber) {
        print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
     } else {
        print("The string \"\(possibleNumber)\" couldn't be converted to an integer")
     }
  <- The string "123" has an integer value of 123
  ```
-->

This code can be read as:

“If the optional `Int` returned by `Int(possibleNumber)` contains a value,
set a new constant called `actualNumber` to the value contained in the optional.”

If the conversion is successful,
the `actualNumber` constant becomes available for use within
the first branch of the `if` statement.
It has already been initialized with the value contained within the optional,
and has the corresponding non-optional type.
In this case, the type of `possibleNumber` is `Int?`,
so the type of `actualNumber` is `Int`.

If you don't need to refer to the original, optional constant or variable
after accessing the value it contains,
you can use the same name for the new constant or variable:

```swift
let myNumber = Int(possibleNumber)
// Here, myNumber is an optional integer
if let myNumber = myNumber {
    // Here, myNumber is a non-optional integer
    print("My number is \(myNumber)")
}
// Prints "My number is 123".
```

<!--
  - test: `optionals`

  ```swifttest
  -> let myNumber = Int(possibleNumber)
  // Here, myNumber is an optional integer
  -> if let myNumber = myNumber {
         // Here, myNumber is a non-optional integer
         print("My number is \(myNumber)")
     }
  <- My number is 123
  ```
-->

This code starts by checking whether `myNumber` contains a value,
just like the code in the previous example.
If `myNumber` has a value,
the value of a new constant named `myNumber` is set to that value.
Inside the body of the `if` statement,
writing `myNumber` refers to that new non-optional constant.
Writing `myNumber` before or after the `if` statement
refers to the original optional integer constant.

Because this kind of code is so common,
you can use a shorter spelling to unwrap an optional value:
Write just the name of the constant or variable that you're unwrapping.
The new, unwrapped constant or variable
implicitly uses the same name as the optional value.

```swift
if let myNumber {
    print("My number is \(myNumber)")
}
// Prints "My number is 123".
```

<!--
  - test: `optionals`

  ```swifttest
  -> if let myNumber {
         print("My number is \(myNumber)")
     }
  <- My number is 123
  ```
-->

You can use both constants and variables with optional binding.
If you wanted to manipulate the value of `myNumber`
within the first branch of the `if` statement,
you could write `if var myNumber` instead,
and the value contained within the optional
would be made available as a variable rather than a constant.
Changes you make to `myNumber` inside the body of the `if` statement
apply only to that local variable,
*not* to the original, optional constant or variable that you unwrapped.

You can include as many optional bindings and Boolean conditions
in a single `if` statement as you need to,
separated by commas.
If any of the values in the optional bindings are `nil`
or any Boolean condition evaluates to `false`,
the whole `if` statement's condition
is considered to be `false`.
The following `if` statements are equivalent:

```swift
if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
    print("\(firstNumber) < \(secondNumber) < 100")
}
// Prints "4 < 42 < 100".

if let firstNumber = Int("4") {
    if let secondNumber = Int("42") {
        if firstNumber < secondNumber && secondNumber < 100 {
            print("\(firstNumber) < \(secondNumber) < 100")
        }
    }
}
// Prints "4 < 42 < 100".
```

<!--
  - test: `multipleOptionalBindings`

  ```swifttest
  -> if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
        print("\(firstNumber) < \(secondNumber) < 100")
     }
  <- 4 < 42 < 100

  -> if let firstNumber = Int("4") {
         if let secondNumber = Int("42") {
             if firstNumber < secondNumber && secondNumber < 100 {
                 print("\(firstNumber) < \(secondNumber) < 100")
             }
         }
     }
  <- 4 < 42 < 100
  ```
-->

<!--
  The example above uses multiple optional bindings
  to show that you can have more than one
  and to show the short-circuiting behavior.
  It has multiple Boolean conditions
  to show that you should join logically related conditions
  using the && operator instead of a comma.
-->

Constants and variables created with optional binding in an `if` statement
are available only within the body of the `if` statement.
In contrast, the constants and variables created with a `guard` statement
are available in the lines of code that follow the `guard` statement,
as described in <doc:ControlFlow#Early-Exit>.

### Providing a Fallback Value

Another way to handle a missing value is to supply
a default value using the nil-coalescing operator (`??`).
If the optional on the left of the `??` isn't `nil`,
that value is unwrapped and used.
Otherwise, the value on the right of `??` is used.
For example,
the code below greets someone by name if one is specified,
and uses a generic greeting when the name is `nil`.

```swift
let name: String? = nil
let greeting = "Hello, " + (name ?? "friend") + "!"
print(greeting)
// Prints "Hello, friend!"
```

<!--
.. testcode:: optionalFallback

   ```swifttest
   -> let name: String? = nil
   -> let greeting = "Hello, " + (name ?? "friend") + "!"
   -> print(greeting)
   <- Hello, friend!
   ```
-->

For more information about using `??` to provide a fallback value,
see <doc:BasicOperators#Nil-Coalescing-Operator>.

### Force Unwrapping

When `nil` represents an unrecoverable failure,
such as a programmer error or corrupted state,
you can access the underlying value
by adding an exclamation mark (`!`) to the end of the optional's name.
This is known as *force unwrapping* the optional's value.
When you force unwrap a non-`nil` value,
the result is its unwrapped value.
Force unwrapping a `nil` value triggers a runtime error.

The `!` is, effectively, a shorter spelling of [`fatalError(_:file:line:)`][].
For example, the code below shows two equivalent approaches:

[`fatalError(_:file:line:)`]: https://developer.apple.com/documentation/swift/fatalerror(_:file:line:)

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)

let number = convertedNumber!

guard let number = convertedNumber else {
    fatalError("The number was invalid")
}
```

Both versions of the code above depend on `convertedNumber`
always containing a value.
Writing that requirement as part of the code,
using either of the approaches above,
lets your code check that the requirement is true at runtime.

For more information about enforcing data requirements
and checking assumptions at runtime,
see <doc:TheBasics#Assertions-and-Preconditions>.

### Implicitly Unwrapped Optionals

As described above,
optionals indicate that a constant or variable is allowed to have “no value”.
Optionals can be checked with an `if` statement to see if a value exists,
and can be conditionally unwrapped with optional binding
to access the optional's value if it does exist.

Sometimes it's clear from a program's structure that an optional will *always* have a value,
after that value is first set.
In these cases, it's useful to remove the need
to check and unwrap the optional's value every time it's accessed,
because it can be safely assumed to have a value all of the time.

These kinds of optionals are defined as *implicitly unwrapped optionals*.
You write an implicitly unwrapped optional by placing an exclamation point (`String!`)
rather than a question mark (`String?`) after the type that you want to make optional.
Rather than placing an exclamation point after the optional's name when you use it,
you place an exclamation point after the optional's type when you declare it.

Implicitly unwrapped optionals are useful when
an optional's value is confirmed to exist immediately after the optional is first defined
and can definitely be assumed to exist at every point thereafter.
The primary use of implicitly unwrapped optionals in Swift is during class initialization,
as described in <doc:AutomaticReferenceCounting#Unowned-References-and-Implicitly-Unwrapped-Optional-Properties>.

Don't use an implicitly unwrapped optional when there's a possibility of
a variable becoming `nil` at a later point.
Always use a normal optional type if you need to check for a `nil` value
during the lifetime of a variable.

An implicitly unwrapped optional is a normal optional behind the scenes,
but can also be used like a non-optional value,
without the need to unwrap the optional value each time it's accessed.
The following example shows the difference in behavior between
an optional string and an implicitly unwrapped optional string
when accessing their wrapped value as an explicit `String`:

```swift
let possibleString: String? = "An optional string."
let forcedString: String = possibleString! // Requires explicit unwrapping

let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString // Unwrapped automatically
```

<!--
  - test: `implicitlyUnwrappedOptionals`

  ```swifttest
  -> let possibleString: String? = "An optional string."
  -> let forcedString: String = possibleString! // requires an exclamation point

  -> let assumedString: String! = "An implicitly unwrapped optional string."
  -> let implicitString: String = assumedString // no need for an exclamation point
  ```
-->

You can think of an implicitly unwrapped optional as
giving permission for the optional to be force-unwrapped if needed.
When you use an implicitly unwrapped optional value,
Swift first tries to use it as an ordinary optional value;
if it can't be used as an optional, Swift force-unwraps the value.
In the code above,
the optional value `assumedString` is force-unwrapped
before assigning its value to `implicitString`
because `implicitString` has an explicit, non-optional type of `String`.
In code below,
`optionalString` doesn't have an explicit type
so it's an ordinary optional.

```swift
let optionalString = assumedString
// The type of optionalString is "String?" and assumedString isn't force-unwrapped.
```

<!--
  - test: `implicitlyUnwrappedOptionals`

  ```swifttest
  -> let optionalString = assumedString
  // The type of optionalString is "String?" and assumedString isn't force-unwrapped.
  >> print(type(of: optionalString))
  << Optional<String>
  ```
-->

If an implicitly unwrapped optional is `nil` and you try to access its wrapped value,
you'll trigger a runtime error.
The result is exactly the same as if you write an exclamation point
to force unwrap a normal optional that doesn't contain a value.

You can check whether an implicitly unwrapped optional is `nil`
the same way you check a normal optional:

```swift
if assumedString != nil {
    print(assumedString!)
}
// Prints "An implicitly unwrapped optional string."
```

<!--
  - test: `implicitlyUnwrappedOptionals`

  ```swifttest
  -> if assumedString != nil {
        print(assumedString!)
     }
  <- An implicitly unwrapped optional string.
  ```
-->

You can also use an implicitly unwrapped optional with optional binding,
to check and unwrap its value in a single statement:

```swift
if let definiteString = assumedString {
    print(definiteString)
}
// Prints "An implicitly unwrapped optional string."
```

<!--
  - test: `implicitlyUnwrappedOptionals`

  ```swifttest
  -> if let definiteString = assumedString {
        print(definiteString)
     }
  <- An implicitly unwrapped optional string.
  ```
-->

## Memory Safety

In addition to the checks that prevent type mismatches,
described above in <doc:TheBasics#Type-Safety-and-Type-Inference>,
Swift also protects code against working with invalid memory.
This protection is known as *memory safety*
and includes the following requirements:

- Values are set before being read.
  The protection against interacting with uninitialized regions of memory
  is also known as *definite initialization*.
- Arrays and buffers are accessed only at valid indexes.
  The protection against out-of-bounds access
  is also known as *bounds safety*.
- Memory is accessed only during the value’s lifetime.
  The protection against use-after-free errors
  is also known as *lifetime safety*.
- Access to memory overlaps only in provably safe ways.
  The protection against possible data races in concurrent code
  is also known as *thread safety*.

If you've worked in languages that don't provide these guarantees,
you may be familiar with some of the errors and bugs
named in the list above.
If you haven't encountered these issues, that's ok;
safe code in Swift avoids these problems.
For information about how Swift ensures you set initial values,
see <doc:Initialization>,
for information about how Swift checks memory safety in concurrent code,
see <doc:Concurrency>,
and for information about how Swift checks overlapping accesses to memory,
see <doc:MemorySafety>.

Sometimes you need to work outside of the bounds of safety ---
for example, because of limitations of the language or standard library ---
so Swift also provides unsafe versions of some APIs.
When you use types or methods whose name includes words such as
"unsafe", "unchecked", or "unmanaged",
you take on the responsibility for safety.

Safe code in Swift can still encounter errors and unexpected failures,
which might stop the program's execution.
Safety doesn't ensure that your code runs to completion.
Swift provides several ways to indicate and recover from errors,
discussed in <doc:TheBasics#Error-Handling>
and <doc:TheBasics#Assertions-and-Preconditions> below.
However, in some cases,
the *only* safe way to handle an error is to stop execution.
If you need to guarantee that a service never unexpected stops,
incorporate fault tolerance into its overall architecture,
so it can recover from any of its components stopping unexpectedly.

## Error Handling

You use *error handling* to respond to error conditions
your program may encounter during execution.

In contrast to optionals,
which can use the presence or absence of a value
to communicate success or failure of a function,
error handling allows you to determine the underlying cause of failure,
and, if necessary, propagate the error to another part of your program.

When a function encounters an error condition, it *throws* an error.
That function's caller can then *catch* the error and respond appropriately.

```swift
func canThrowAnError() throws {
    // this function may or may not throw an error
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  >> enum SimpleError: Error {
  >>    case someError
  >> }
  >> let condition = true
  -> func canThrowAnError() throws {
        // this function may or may not throw an error
  >>    if condition {
  >>       throw SimpleError.someError
  >>    }
     }
  ```
-->

A function indicates that it can throw an error
by including the `throws` keyword in its declaration.
When you call a function that can throw an error,
you prepend the `try` keyword to the expression.

Swift automatically propagates errors out of their current scope
until they're handled by a `catch` clause.

```swift
do {
    try canThrowAnError()
    // no error was thrown
} catch {
    // an error was thrown
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> do {
  ->    try canThrowAnError()
  >>    print("No Error")
  ->    // no error was thrown
  -> } catch {
  >>    print("Error")
  ->    // an error was thrown
  -> }
  << Error
  ```
-->

A `do` statement creates a new containing scope,
which allows errors to be propagated to one or more `catch` clauses.

Here's an example of how error handling can be used
to respond to different error conditions:

```swift
func makeASandwich() throws {
    // ...
}

do {
    try makeASandwich()
    eatASandwich()
} catch SandwichError.outOfCleanDishes {
    washDishes()
} catch SandwichError.missingIngredients(let ingredients) {
    buyGroceries(ingredients)
}
```

<!--
  - test: `errorHandlingTwo`

  ```swifttest
  >> enum SandwichError: Error {
  >>     case outOfCleanDishes
  >>     case missingIngredients([String])
  >> }
  >> func washDishes() { print("Wash dishes") }
  >> func buyGroceries(_ shoppingList: [String]) { print("Buy \(shoppingList)") }
  -> func makeASandwich() throws {
         // ...
     }
  >> func eatASandwich() {}

  -> do {
         try makeASandwich()
         eatASandwich()
     } catch SandwichError.outOfCleanDishes {
         washDishes()
     } catch SandwichError.missingIngredients(let ingredients) {
         buyGroceries(ingredients)
     }
  ```
-->

In this example, the `makeASandwich()` function will throw an error
if no clean dishes are available
or if any ingredients are missing.
Because `makeASandwich()` can throw an error,
the function call is wrapped in a `try` expression.
By wrapping the function call in a `do` statement,
any errors that are thrown will be propagated
to the provided `catch` clauses.

If no error is thrown, the `eatASandwich()` function is called.
If an error is thrown and it matches the `SandwichError.outOfCleanDishes` case,
then the `washDishes()` function will be called.
If an error is thrown and it matches the `SandwichError.missingIngredients` case,
then the `buyGroceries(_:)` function is called
with the associated `[String]` value captured by the `catch` pattern.

Throwing, catching, and propagating errors is covered in greater detail in
<doc:ErrorHandling>.

## Assertions and Preconditions

*Assertions* and *preconditions*
are checks that happen at runtime.
You use them to make sure an essential condition is satisfied
before executing any further code.
If the Boolean condition in the assertion or precondition
evaluates to `true`,
code execution continues as usual.
If the condition evaluates to `false`,
the current state of the program is invalid;
code execution ends, and your app is terminated.

You use assertions and preconditions
to express the assumptions you make
and the expectations you have
while coding,
so you can include them as part of your code.
Assertions help you find mistakes and incorrect assumptions during development,
and preconditions help you detect issues in production.

In addition to verifying your expectations at runtime,
assertions and preconditions also become a useful form of documentation
within the code.
Unlike the error conditions discussed in <doc:TheBasics#Error-Handling> above,
assertions and preconditions aren't used
for recoverable or expected errors.
Because a failed assertion or precondition
indicates an invalid program state,
there's no way to catch a failed assertion.
Recovering from an invalid state is impossible.
When an assertion fails,
at least one piece of the program's data is invalid ---
but you don't know why it's invalid
or whether an additional state is also invalid.

Using assertions and preconditions
isn't a substitute for designing your code in such a way
that invalid conditions are unlikely to arise.
However,
using them to enforce valid data and state
causes your app to terminate more predictably
if an invalid state occurs,
and helps make the problem easier to debug.
When assumptions aren't checked,
you might not notice this kind problem until much later
when code elsewhere starts failing visibly,
and after user data has been silently corrupted.
Stopping execution as soon as an invalid state is detected
also helps limit the damage caused by that invalid state.

The difference between assertions and preconditions is in when they're checked:
Assertions are checked only in debug builds,
but preconditions are checked in both debug and production builds.
In production builds,
the condition inside an assertion isn't evaluated.
This means you can use as many assertions as you want
during your development process,
without impacting performance in production.

### Debugging with Assertions

<!--
  If your code triggers an assertion while running in a debug environment,
  such as when you build and run an app in Xcode,
  you can see exactly where the invalid state occurred
  and query the state of your app at the time that the assertion was triggered.
  An assertion also lets you provide a suitable debug message as to the nature of the assert.
-->

You write an assertion by calling the
[`assert(_:_:file:line:)`](https://developer.apple.com/documentation/swift/1541112-assert) function
from the Swift standard library.
You pass this function an expression that evaluates to `true` or `false`
and a message to display if the result of the condition is `false`.
For example:

```swift
let age = -3
assert(age >= 0, "A person's age can't be less than zero.")
// This assertion fails because -3 isn't >= 0.
```

<!--
  - test: `assertions-1`

  ```swifttest
  -> let age = -3
  -> assert(age >= 0, "A person's age can't be less than zero.")
  xx assert
  // This assertion fails because -3 isn't >= 0.
  ```
-->

In this example, code execution continues if `age >= 0` evaluates to `true`,
that is, if the value of `age` is nonnegative.
If the value of `age` is negative, as in the code above,
then `age >= 0` evaluates to `false`,
and the assertion fails, terminating the application.

You can omit the assertion message ---
for example, when it would just repeat the condition as prose.

```swift
assert(age >= 0)
```

<!--
  - test: `assertions-2`

  ```swifttest
  >> let age = -3
  -> assert(age >= 0)
  xx assert
  ```
-->

<!--
  - test: `assertionsCanUseStringInterpolation`

  ```swifttest
  -> let age = -3
  -> assert(age >= 0, "A person's age can't be less than zero, but value is \(age).")
  xx assert
  ```
-->

If the code already checks the condition,
you use the
[`assertionFailure(_:file:line:)`](https://developer.apple.com/documentation/swift/1539616-assertionfailure) function
to indicate that an assertion has failed.
For example:

```swift
if age > 10 {
    print("You can ride the roller-coaster or the ferris wheel.")
} else if age >= 0 {
    print("You can ride the ferris wheel.")
} else {
    assertionFailure("A person's age can't be less than zero.")
}
```

<!--
  - test: `assertions-3`

  ```swifttest
  >> let age = -3
  -> if age > 10 {
         print("You can ride the roller-coaster or the ferris wheel.")
     } else if age >= 0 {
         print("You can ride the ferris wheel.")
     } else {
         assertionFailure("A person's age can't be less than zero.")
     }
  xx assert
  ```
-->

### Enforcing Preconditions

Use a precondition whenever a condition has the potential to be false,
but must *definitely* be true for your code to continue execution.
For example, use a precondition to check that a subscript isn't out of bounds,
or to check that a function has been passed a valid value.

You write a precondition by calling the
[`precondition(_:_:file:line:)`](https://developer.apple.com/documentation/swift/1540960-precondition) function.
You pass this function an expression that evaluates to `true` or `false`
and a message to display if the result of the condition is `false`.
For example:

```swift
// In the implementation of a subscript...
precondition(index > 0, "Index must be greater than zero.")
```

<!--
  - test: `preconditions`

  ```swifttest
  >> let index = -1
  // In the implementation of a subscript...
  -> precondition(index > 0, "Index must be greater than zero.")
  xx assert
  ```
-->

You can also call the
[`preconditionFailure(_:file:line:)`](https://developer.apple.com/documentation/swift/1539374-preconditionfailure) function
to indicate that a failure has occurred ---
for example, if the default case of a switch was taken,
but all valid input data should have been handled
by one of the switch's other cases.

> Note: If you compile in unchecked mode (`-Ounchecked`),
> preconditions aren't checked.
> The compiler assumes that preconditions are always true,
> and it optimizes your code accordingly.
> However, the `fatalError(_:file:line:)` function always halts execution,
> regardless of optimization settings.
>
> You can use the `fatalError(_:file:line:)` function
> during prototyping and early development
> to create stubs for functionality that hasn't been implemented yet,
> by writing `fatalError("Unimplemented")` as the stub implementation.
> Because fatal errors are never optimized out,
> unlike assertions or preconditions,
> you can be sure that execution always halts
> if it encounters a stub implementation.

<!--
  "\ " in the first cell below lets it be empty.
  Otherwise RST treats the row as a continuation.

  ============ =====  ==========  ===============================
  \            Debug  Production  Production with ``-Ounchecked``
  ============ =====  ==========  ===============================
  Assertion    Yes    No          No
  ------------ -----  ----------  -------------------------------
  Precondition Yes    Yes         No
  ------------ -----  ----------  -------------------------------
  Fatal Error  Yes    Yes         Yes
  ============ =====  ==========  ===============================
-->

<!--
  TODO: In Xcode, can you set a breakpoint on assertion/precondition failure?
  If so, mention that fact and give a link to a guide that shows you how.
  In LLDB, 'breakpoint set -E swift' catches when errors are thrown,
  but doesn't stop at assertions.
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
