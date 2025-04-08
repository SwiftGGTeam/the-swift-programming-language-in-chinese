# 基础知识

处理常见数据类型并编写基本语法。

Swift 提供了许多基本数据类型，包括表示整数的 `Int`、表示浮点数的 `Double`、表示布尔值的 `Bool` 和表示文本的 `String`。Swift 还提供了三种主要集合类型（`Array`（数组），`Set`（集合），和 `Dictionary`（字典））的强大版本，详见 <doc:CollectionTypes>。

Swift 使用变量来存储值，并通过标识名称来引用值。Swift 还广泛使用不可更改其值的变量。这些变量被称为常量，在整个 Swift 中都有使用，以便在处理无需更改的值时使代码更安全、更清晰。

除了熟悉的类型外，Swift 还引入了元组等高级类型。通过元组，你可以创建并传递一组值。你可以使用元组从函数返回一个包含了多个值的复合值。

Swift 还引入了可选类型，用于处理值缺失的情况。可选类型要么表示“变量*有*值，且等于 *x*”，要么表示“压根就*没有*值”。

Swift 是一种*类型安全*的语言，这意味着该语言可以帮助你明确代码可以处理的值的类型。如果你的部分代码需要字符串，类型安全可以防止你错误地将整数传递给它。同样，类型安全也能防止你不小心将可选字符串传递给需要非可选字符串的代码。类型安全可帮助你在开发过程中尽早发现并修复错误。

## 常量和变量

常量和变量将名称（如 `maximumNumberOfLoginAttempts` 或 `welcomeMessage`）与特定类型的值（如数字 `10` 或字符串 `"Hello"`）相关联。*常量*的值一旦设置就不能更改，而*变量*则可以在将来设置不同的值。

### 声明常量和变量

常量和变量在使用前必须先声明。使用 `let` 关键字声明常量，使用 `var` 关键字声明变量。下面举例说明如何使用常量和变量来追踪用户尝试登录的次数：

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

该代码可理解为：

“声明一个名为 `maximumNumberOfLoginAttempts` 的新常量，并赋予其 `10` 的值。然后，声明一个名为 `currentLoginAttempt` 的新变量，并赋予其 `0` 的初始值。”

在这个示例中，允许的最大登录尝试次数被声明为一个常量，因为最大值永远不会改变。当前登录尝试计数器被声明为变量，因为每次登录尝试失败后，该值都必须递增。

如果代码中的某个存储值不会改变，请使用 `let` 关键字将其声明为常量。变量只用于存储会发生变化的值。

在声明常量或变量时，可以像上面的示例一样，在声明中为其赋值。或者你也可以稍后在程序中为变量分配初始值，只要能保证在第一次读取前它有值即可。

```swift
var environment = "development"
let maximumNumberOfLoginAttempts: Int
// maximumNumberOfLoginAttempts 尚无值。

if environment == "development" {
    maximumNumberOfLoginAttempts = 100
} else {
    maximumNumberOfLoginAttempts = 10
}
// 现在 maximumNumberOfLoginAttempts 有了值，可以读取了。
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

在本例中，登录尝试的最大次数是常数，其值取决于环境。在开发环境中，其值为 100；在其他环境中，其值为 10。`if` 语句的两个分支都将 `maximumNumberOfLoginAttempts` 初始化为某个值，从而保证该常量一定有一个值。有关 Swift 如何在以这种方式设置初始值时检查代码的详情，请参阅 <doc:Declarations#常量声明>。

你可以在一行中声明多个常量或多个变量，中间用逗号隔开：

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

### 类型注解

在声明常量或变量时，可以提供*类型注解*，以明确常量或变量可以存储的值的类型。编写类型注解时，在常量或变量名后加上冒号，后跟一个空格，然后是要使用的类型名称。

本例为名为 `welcomeMessage` 的变量提供了一个类型注解，以指示该变量可以存储字符串值：

```swift
var welcomeMessage: String
```

<!--
  - test: `typeAnnotations`

  ```swifttest
  -> var welcomeMessage: String
  ```
-->

声明中的冒号表示“…类型的…”，因此上面的代码可以理解为：

“声明一个名为 `welcomeMessage` 的字符串类型的变量。”

短语“字符串类型”意味着“可以存储任何字符串值“。请将其理解为变量可以存储的“值的类型”。

现在，你可以将 `welcomeMessage` 变量设置为任何字符串值且不会出错：

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

你可以在一行中定义多个相同类型的相关变量，中间用逗号隔开，并在最后一个变量名后加一个类型注解：

```swift
var red, green, blue: Double
```

<!--
  - test: `typeAnnotations`

  ```swifttest
  -> var red, green, blue: Double
  ```
-->

> 备注: 在实践中很少需要编写类型注解。如果你在定义常量或变量时为其提供了初始值，Swift 几乎总是可以推断出该常量或变量的类型，如 <doc:TheBasics#类型安全和类型推断> 中所述。上面的 `welcomeMessage` 示例中，没有提供初始值，因此 `welcomeMessage` 变量的类型是通过类型注解指定的，而不是从初始值推断出来的。

### 命名常量和变量

常量和变量名几乎可以包含任何字符，包括 Unicode 字符：

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

常量和变量名不能包含空格字符、数学符号、箭头、专用的 Unicode 标量值，或画线和画框字符。常量和变量名也不能以数字开头，但数字可以包含在名称的其他部分。

一旦声明了某个类型的常量或变量，就不能再用相同的名称声明，也不能更改它以存储不同类型的值。同时也不能将常量改为变量，或将变量改为常量。

> 备注: 如果要使用与 Swift 保留关键字相同的名称命名常量或变量，在使用关键字时，请用反引号 (`` ` ``) 包裹。不过，除非别无他选，请尽量避免使用关键字作为变量名称。

你可以将现有变量的值更改为另一个兼容类型的值。在本例中，`friendlyWelcome` 的值从 `"Hello!"` 改为了 `"Bonjour!"`：

```swift
var friendlyWelcome = "Hello!"
friendlyWelcome = "Bonjour!"
// friendlyWelcome 的当前值是 "Bonjour!"
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

与变量不同，常量的值在设置后不能更改。在编译代码时，如果试图更改常量的值，就会报错：

```swift
let languageName = "Swift"
languageName = "Swift++"
// 这是一个编译时错误：languageName 不能更改。
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

### 打印常量和变量

使用 `print(_:separator:terminator:)` 函数可以打印常量或变量的当前值：

```swift
print(friendlyWelcome)
// 打印 "Bonjour!"
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> print(friendlyWelcome)
  <- Bonjour!
  ```
-->

`print(_:separator:terminator:)` 函数是一个全局函数，用于将一个或多个值打印到适当的输出端。例如，在 Xcode 中，`print(_:separator:termininator:)` 函数将在 Xcode 的 “控制台” 窗格中打印输出。参数 `separator`（分隔符） 和 `terminator`（结束符） 有默认值，因此在调用此函数时可以省略。默认情况下，该函数通过添加换行符来结束打印行。如果要打印一个值且不换行，可以传递一个空字符串作为结束符，例如 `print(someValue,termininator:"")`。有关带默认值参数的信息，请参阅 <doc:Functions#默认参数值>。

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

Swift 使用*字符串插值*将常量或变量的名称作为占位符包含在较长的字符串中，并提示 Swift 将其替换为该常量或变量的当前值。将名称包在括号中，并在左括号前用反斜杠进行转义：

```swift
print("The current value of friendlyWelcome is \(friendlyWelcome)")
// 打印 "The current value of friendlyWelcome is Bonjour！"
```

<!--
  - test: `constantsAndVariables`

  ```swifttest
  -> print("The current value of friendlyWelcome is \(friendlyWelcome)")
  <- The current value of friendlyWelcome is Bonjour!
  ```
-->

> 备注: 在 <doc:StringsAndCharacters#字符串插值> 中描述了所有字符串插值选项。

## 注释

使用注释在代码中包含不可执行的文本，作为给自己的注释或提醒。在编译代码时，Swift 编译器会忽略注释。

Swift 中的注释与 C 语言中的注释非常相似。单行注释以两个正斜杠 (`//`) 开头：

```swift
// 这是一个注释。
```

<!--
  - test: `comments`

  ```swifttest
  -> // This is a comment.
  ```
-->

多行注释以正斜杠 + 星号 (`/*`) 开始，并以星号 + 正斜杠 (`*/`) 结束：

```swift
/* 这也是一个注释
但写了多行。*/
```

<!--
  - test: `comments`

  ```swifttest
  -> /* This is also a comment
     but is written over multiple lines. */
  ```
-->

与 C 语言中的多行注释不同，Swift 中的多行注释可以嵌套在其他多行注释中。在编写嵌套注释时，你可以先编写一个多行注释块，然后在第一个注释块中编写第二个多行注释块。然后关闭第二个注释块，接着关闭第一个注释块：

```swift
/* 这是第一个多行注释的开始。
    /* 这是第二个嵌套的多行注释。*/
这是第一个多行注释的结束。*/
```

<!--
  - test: `comments`

  ```swifttest
  -> /* This is the start of the first multiline comment.
        /* This is the second, nested multiline comment. */
     This is the end of the first multiline comment. */
  ```
-->

通过嵌套多行注释，即使代码中已包含多行注释，你也能快速、轻松地注释大块代码。

## 分号

与许多其他语言不同，Swift 并不要求你在代码中的每条语句后都写上分号（`;`），不过如果你愿意，也可以这样做。不过，如果你想在一行中编写多个独立语句，则*必须*使用分号：

```swift
let cat = "🐱"; print(cat)
// 打印 "🐱"
```

<!--
  - test: `semiColons`

  ```swifttest
  -> let cat = "🐱"; print(cat)
  <- 🐱
  ```
-->

## 整数

*整数*是没有小数成分的数字，如 `42` 和 `-23`。 整数可以是*有符号的*（正数、零或负数），也可以是*无符号的*（正数或零）。

Swift 提供 8、16、32 和 64 位有符号和无符号整数。这些整数遵循与 C 类似的命名规则，即 8 位无符号整数的类型是 `UInt8`，32 位有符号整数的类型是 `Int32`。与 Swift 中的所有类型一样，这些整数类型的名称也是大写的。

### 整数边界

你可以使用 `min` 和 `max` 属性访问每个整数类型的最小值和最大值：

```swift
let minValue = UInt8.min  // minValue 等于 0，类型为 UInt8
let maxValue = UInt8.max  // maxValue 等于 255，类型为 UInt8
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

这些属性的值属于适当大小的数字类型（如上例中的 `UInt8`），因此可以在表达式中与同类型的其他值一起使用。

### Int（整数）

在大多数情况下，你不需要在代码中使用特定大小的整数。Swift 提供了一种额外的整数类型 `Int`，其大小与当前平台的原生字长大小相同：

- 在 32 位平台上，`Int` 的大小与 `Int32` 相同。
- 在 64 位平台上，`Int` 的大小与 `Int64` 相同。

除非你需要使用特定大小的整数，否则在代码中始终使用 `Int` 表示整数值。这有助于代码的一致性和互操作性。即使在 32 位平台上，`Int` 也可以存储介于 `-2,147,483,648` 和 `2,147,483,647` 之间的任何值，其大小足以容纳许多整数范围。

### UInt（无符号整数）

Swift 还提供了无符号整数类型 `UInt`，其大小与当前平台的原生字长大小相同：

- 在 32 位平台上，`UInt` 的大小与 `UInt32` 相同。
- 在 64 位平台上，`UInt` 的大小与 `UInt64` 相同。

> 备注: 只有在特别需要无符号整数类型且其大小与平台的原生字长大小相同时，才使用 `UInt`。如果不是这种情况，最好使用 `Int`，即使要存储的值是非负值。对整数值一致使用 `Int` 可以提高代码的互操作性，避免在不同数字类型之间进行转换，并符合 <doc:TheBasics#类型安全和类型推断> 中所述的整数类型推断。

## 浮点数

*浮点数*是带有小数成分的数字，如 `3.14159`、`0.1` 和 `-273.15`。

与整数类型相比，浮点类型可以表示的数值范围更广，而且可以存储比 `Int` 类型大得多或小得多的数字。Swift 提供了两种带符号浮点数类型：

- `Double` 表示 64 位浮点数。
- `Float` 表示 32 位浮点数。

> 备注: `Double` 的精度至少为小数点后 15 位，而 `Float` 的精度可以少至小数点后 6 位。使用哪种浮点类型更合适，取决于代码中需要处理数值的性质和范围。在两种类型都适用的情况下，`Double` 是首选。

<!--
  TODO: Explicitly mention situations where Float is appropriate,
  such as when optimizing for storage size of collections?
-->

<!--
  TODO: mention infinity, -infinity etc.
-->

## 类型安全和类型推断

Swift 是一种*类型安全*的语言。类型安全语言鼓励你显式指示代码可处理的值的类型。如果代码的一部分需要 `String`，你就不能错误地将 `Int` 传递给它。

由于 Swift 是类型安全的语言，因此它在编译代码时会执行*类型检查*，并将任何不匹配的类型标记为错误。这样，你就能在开发过程中尽早发现并修复错误。

类型检查可帮助你在处理不同类型的值时避免错误。但是，这并不意味着你必须指定你声明的每个常量和变量的类型。如果你没有指定所需值的类型，Swift 会使用*类型推断*来确定适当的类型。类型推断使编译器在编译代码时，仅通过检查你提供的值，就能自动推断出特定表达式的类型。

由于有了类型推断，Swift 所需的类型声明比 C 或 Objective-C 等语言要少得多。常量和变量仍然是显式类型的，但为其指定类型的大部分工作都是自动完成的。

当你声明一个带有初始值的常量或变量时，类型推断尤其有用。通常的做法是在声明常量或变量时为其赋*字面量*。（字面量指的是直接出现在源代码中的值，如下面示例中的 `42` 和 `3.14159`）。

例如，如果你将字面量 `42` 赋给一个新常量，但没有说明它是什么类型，Swift 就会推断你希望该常量是一个 `Int` 常量，因为你刚使用了一个看起来像整数的数字对它进行了初始化：

```swift
let meaningOfLife = 42
// meaningOfLife 被推断为 Int 类型
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

同样，如果你没有为浮点数字面量指定类型，Swift 会认为你想创建一个 `Double`：

```swift
let pi = 3.14159
// pi 推断为 Double 类型
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

在推断浮点数类型时，Swift 总是选择 `Double`（而非 `Float`）。

如果在表达式中结合使用整数和浮点数字面量，则会根据上下文推断出 `Double` 类型：

```swift
let anotherPi = 3 + 0.14159
// anotherPi 也被推断为 Double 类型
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

`3` 的字面量本身并没有显式类型，因此可以根据加法中的浮点数字面量推断出合适的输出类型 `Double`。

## 数值字面量

整数字面量可以写成：

- 不带前缀的*十进制*数
- 带 `0b` 前缀的*二进制*数
- 带前缀 `0o` 的*八进制*数
- 带前缀 `0x` 的*十六进制*数

以下所有整数字面量的十进制值都是 `17`：

```swift
let decimalInteger = 17
let binaryInteger = 0b10001       // 以二进制表示的 17
let octalInteger = 0o21           // 以八进制表示的 17
let hexadecimalInteger = 0x11     // 以十六进制表示的 17
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

浮点字面量可以是十进制（不带前缀），也可以是十六进制（带 `0x` 前缀）。浮点数的小数点两边必须始终有一个数字（或十六进制数）。十进制浮点数还可以有一个可选的*指数*，用大写或小写 `e` 表示；十六进制浮点数必须有一个指数，用大写或小写 `p` 表示。

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

对于指数为 `x` 的十进制数，字面量是基数乘以 10ˣ：

- `1.25e2` 表示 1.25 x 10² 或 `125.0`。
- `1.25e-2` 表示 1.25 x 10⁻² 或 `0.0125`。

对于指数为 `x` 的十六进制数，字面量是基数乘以 2ˣ：

- `0xFp2` 表示 15 x 2² 或 `60.0`。
- `0xFp-2` 表示 15 x 2⁻²，或 `3.75`。

以下所有浮点字面量的十进制值都是 `12.1875`：

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

数值字面量可以包含额外的格式，以便于阅读。整数和浮点数都可以填充额外的零，也可以包含下划线，以提高可读性。这两种格式都不会影响字面量的实际值：

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

## 数字类型转换

对代码中的所有通用整数常量和变量使用 `Int` 类型，即使它们已知是非负值。在通常情况下使用默认整数类型意味着整数常量和变量可以立即在代码中互操作，并且与整数字面量的推断类型相匹配。

只有当手头的任务特别需要其他整数类型时，或者因为外部数据源提供了显式大小的数据，或者为了性能、内存使用或其他必要的优化，再考虑使用其他整数类型。在这些情况下使用显式大小的类型有助于捕捉任何意外的数值溢出，并隐式地记录所使用数据的性质。

### 整数转换

每种数字类型的整数常量或变量可存储的数字范围都不同。`Int8` 常量或变量可以存储 `-128` 到 `127` 之间的数字，而 `UInt8` 常量或变量可以存储 `0` 到 `255` 之间的数字。编译代码时，如果一个数字无法放入一个规定大小的整数类型常量或变量中，就会报错：

```swift
let cannotBeNegative: UInt8 = -1
// UInt8 不能存储负数，因此会报错
let tooBig: Int8 = Int8.max + 1
// Int8 不能存储大于其最大值的数字，
// 因此也会报错
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

由于每种数值类型可以存储不同范围的值，因此必须根据具体情况选择是否进行数值类型转换。这种选择加入的方法可以防止隐藏的转换错误，并有助于在代码中明确类型转换的意图。

要将一种特定的数字类型转换为另一种，需要用现有值初始化一个所需类型的新数字。在下面的示例中，常量 `twoThousand` 的类型是 `UInt16`，而常量 `one` 的类型是 `UInt8`。由于它们的类型不同，因此不能直接相加。所以，本例调用 `UInt16(one)` 创建了一个初始值为 `one` 的新 `UInt16`，并用这个值代替原来的值进行计算：

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

因为加法的两边现在都是 UInt16 类型，所以加法是允许的。输出常量 (`twoThousandAndOne`) 被推断为 `UInt16` 类型，因为它是两个 `UInt16` 值的和。

`SomeType(ofInitialValue)` 是调用 Swift 类型初始化器并赋予初始值的默认方式。在后台，`UInt16` 有一个接受 `UInt8` 值的初始化器，因此该初始化器用于从现有的 `UInt8` 生成一个新的 `UInt16`。但在这里不能使用*任意*类型，而必须是 `UInt16` 提供了初始化器的类型。扩展现有类型以提供接受新类型（包括你自己的类型定义）的初始化器，将在 <doc:Extensions> 中介绍。

### 整数和浮点数转换

整数和浮点数值类型之间必须进行显式转换：

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi 等于 3.14159，并被推断为 Double 类型
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

在这里，常量 `three` 的值被用来创建一个 `Double` 类型的新值，这样加法的两边都是相同的类型。如果没有这种转换，加法运算将无法进行。

浮点数到整数也必须进行显式转换。整数类型可以用 `Double` 或 `Float` 值进行初始化：

```swift
let integerPi = Int(pi)
// integerPi 等于 3，并被推断为 Int 类型
```

<!--
  - test: `typeConversion`

  ```swifttest
  -> let integerPi = Int(pi)
  /> integerPi equals \(integerPi), and is inferred to be of type Int
  </ integerPi equals 3, and is inferred to be of type Int
  ```
-->

用这种方法初始化一个新的整数值时，浮点数总是被截断的。这意味着 `4.75` 变为 `4`，`-3.9` 变为 `-3`。

> 备注: 组合数值常量和变量的规则与组合数值字面量的规则不同。字面量 `3` 可以与字面量 `0.14159` 相加，因为数值字面量本身并没有显式类型。只有在编译器对其进行评估时才会推断出其类型。

<!--
  NOTE: this section on explicit conversions could be included in the Operators section.
  I think it's more appropriate here, however,
  and helps to reinforce the “just use Int” message.
-->

## 类型别名

*类型别名*用于定义现有类型的替代名称。你可以使用 `typealias` 关键字定义类型别名。

当你想用一个更适合上下文的名称来代指现有类型时，比如在处理源自外部的特定大小的数据时，类型别名就非常有用：

```swift
typealias AudioSample = UInt16
```

<!--
  - test: `typeAliases`

  ```swifttest
  -> typealias AudioSample = UInt16
  ```
-->

一旦定义了类型别名，就可以在任何可以使用原名的地方使用此别名：

```swift
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound 现在为 0
```

<!--
  - test: `typeAliases`

  ```swifttest
  -> var maxAmplitudeFound = AudioSample.min
  /> maxAmplitudeFound is now \(maxAmplitudeFound)
  </ maxAmplitudeFound is now 0
  ```
-->

在这里，`AudioSample` 被定义为 `UInt16` 的别名。因为是别名，所以调用 `AudioSample.min` 实际上是调用 `UInt16.min`，为 `maxAmplitudeFound` 变量提供一个初始值 `0`。

## 布尔类型

Swift 有一种基本的*布尔*类型，称为 `Bool`。布尔值又被称为*逻辑值*，因为它们只能为真或假。Swift 提供了两个布尔常量值：`true` 和 `false`。

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

`orangesAreOrange` 和 `turnipsAreDelicious` 的类型已被推断为 `Bool`，因为它们使用了布尔字面量初始化。与上述的 `Int` 和 `Double` 一样，如果你在创建常量或变量时将其设置为 `true` 或 `false`，则无需将其声明为 Bool。类型推断有助于让 Swift 代码在使用类型已知的值初始化常量或变量时更简洁易读。

布尔值在使用条件语句（如 `if` 语句）时尤其有用：

```swift
if turnipsAreDelicious {
    print("Mmm, tasty turnips!")
} else {
    print("Eww, turnips are horrible.")
}
// 打印 "Eww, turnips are horrible."
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

<doc:ControlFlow> 将详细介绍 `if` 语句等条件语句。

Swift 的类型安全防止非布尔值被替换为布尔值。下面的示例代码会报告编译时错误：

```swift
let i = 1
if i {
    // 该示例将无法编译，并报错
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

不过，下面的替代示例是合法的：

```swift
let i = 1
if i == 1 {
    // 此示例将成功编译
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

`i == 1` 的比较结果是 `Bool` 类型，因此第二个示例通过了类型检查。类似 `i == 1` 的比较结果将在 <doc:BasicOperators> 中讨论。

与 Swift 中其他类型安全示例一样，这种方法可以避免意外错误，并确保特定代码部分的意图始终清晰明了。

## 元组

*元组*将多个值组合成一个复合值。元组内的值可以是任何类型，且不必彼此属于同一类型。

在下例中，`(404, "Not Found")` 是一个描述 *HTTP 状态代码*的元组。HTTP 状态代码是网络服务器在你请求网页时返回的一个特殊值。如果你请求一个不存在的网页，返回的状态代码就是 `404 Not Found`。

```swift
let http404Error = (404, "Not Found")
// http404Error 的类型为（Int，String），且等于（404，"Not Found"）
```

<!--
  - test: `tuples`

  ```swifttest
  -> let http404Error = (404, "Not Found")
  /> http404Error is of type (Int, String), and equals (\(http404Error.0), \"\(http404Error.1)\")
  </ http404Error is of type (Int, String), and equals (404, "Not Found")
  ```
-->

`(404，"Not Found")` 元组将一个 `Int` 和一个 `String` 组合在一起，赋予 HTTP 状态代码两个独立的值：一个数字和一个人类可读的描述。它可以描述为 “一个 `(Int, String)` 类型的元组”。

你可以从任何的类型排列中创建元组，而且元组中可以包含任意多的不同类型。没有什么能阻止你创建一个 `(Int, Int, Int)` 或 `(String, Bool)` 类型的元组，或者其他任何你需要的排列。

你可以将元组的内容*分解*成单独的常量或变量，然后像往常一样访问它们：

```swift
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)")
// 打印 "The status code is 404"
print("The status message is \(statusMessage)")
// 打印 "The status message is Not Found"
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

如果只需要元组的部分值，则在分解元组时使用下划线 (`_`) 忽略不需要的部分：

```swift
let (justTheStatusCode, _) = http404Error
print("The status code is \(justTheStatusCode)")
// 打印 "The status code is 404"
```

<!--
  - test: `tuples`

  ```swifttest
  -> let (justTheStatusCode, _) = http404Error
  -> print("The status code is \(justTheStatusCode)")
  <- The status code is 404
  ```
-->

或者，使用从零开始的索引号访问元组中的单个元素值：

```swift
print("The status code is \(http404Error.0)")
// 打印 "The status code is 404"
print("The status message is \(http404Error.1)")
// 打印 "The status message is Not Found"
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

你可以在定义元组时为元组中的各个元素命名：

```swift
let http200Status = (statusCode: 200, description: "OK")
```

<!--
  - test: `tuples`

  ```swifttest
  -> let http200Status = (statusCode: 200, description: "OK")
  ```
-->

如果为元组中的元素命名了，就可以使用元素名访问这些元素的值：

```swift
print("The status code is \(http200Status.statusCode)")
// 打印 "The status code is 200"
print("The status message is \(http200Status.description)")
// 打印 "The status message is OK"
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

元组作为函数的返回值特别有用。一个试图检索网页的函数可能会返回 `(Int, String)` 元组类型来描述网页检索的成功或失败。在函数中返回包含两个不同值（每个值的类型都不同）的元组，比只能返回单一类型的单个值提供了更多关于其结果的有用信息。更多信息，请参阅 <doc:Functions#多重返回值函数>。

> 备注: 元组适用于简单的相关值组。它们不适合创建复杂的数据结构。如果你的数据结构可能会变得复杂，请将其创建为类或结构体，而不是元组。更多信息，请参阅 <doc:ClassesAndStructures>。

## 可选

在可能缺失值的情况下，请使用*可选*。可选代表两种可能性：要么*存在*一个指定类型的值，并可以解包可选以访问该值；要么*根本就没有*值。

举一个可能缺失值的例子，Swift 的 `Int` 类型有一个初始化器，它会尝试将 `String` 值转换为 `Int` 值。但是，只有某些字符串可以转换成整数。字符串 `"123"` 可以转换成数值 `123`，但字符串 `"hello, world"` 却没有对应的数值。下面的示例使用初始化器尝试将 `String` 转换为 `Int`：

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)
// convertedNumber 的类型是 "可选 Int"。
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

因为上面代码中的初始化器可能会失败，所以它返回的是*可选* `Int`，而不是 `Int`。

要编写可选类型，需要在可选包含的类型名称后面加一个问号（`?`）。例如，可选 `Int` 的类型是 `Int?`。可选 `Int` 只能储存某个 `Int` 值或不储存任何值。它不能储存任何其他值，如 `Bool` 或 `String` 值。

### nil

通过给可选变量赋特殊值 `nil`，可以将其设置为无值状态：

```swift
var serverResponseCode: Int? = 404
// serverResponseCode 包含一个实际 Int 值 404
serverResponseCode = nil
// serverResponseCode 现在不包含任何值
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

如果你定义了一个可选变量，但没有提供默认值，那么该变量将自动设置为 `nil`：

```swift
var surveyAnswer: String?
// surveyAnswer 自动设置为 nil
```

<!--
  - test: `optionals`

  ```swifttest
  -> var surveyAnswer: String?
  // surveyAnswer is automatically set to nil
  ```
-->

你可以使用 `if` 语句，通过比较可选和 nil 来确定可选是否包含一个值。你可以使用“等于”操作符（`==`）或“不等于”操作符（`!=`）进行比较。

如果可选有一个值，它就被视为“不等于” `nil`：

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)

if convertedNumber != nil {
    print("convertedNumber contains some integer value.")
}
// 打印 "convertedNumber contains some integer value."
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

不能在非可选常量或变量中使用 `nil`。如果代码中的常量或变量在某些条件下需要在没有值的情况下工作，请将其声明为适当类型的可选值。声明为非可选值的常量或变量保证永远不会包含 `nil` 值。如果尝试将 `nil` 赋值给一个非可选值，就会出现编译时错误。

通过将可选值和非可选值分开，可以显式标记哪些信息可能缺失，从而更方便编写处理缺失值的代码。你不能意外地将可选值当作非可选值来处理，因为这种错误会在编译时产生错误。在对值进行解包后，使用该值的其他代码都不需要检查 `nil`，因此不需要在代码的不同部分重复检查同一个值。

在访问可选值时，代码总是同时处理 `nil` 和非 `nil` 两种情况。当值缺失时，可以执行如以下各节所述的几项操作：

- 当值为 `nil` 时，跳过对其进行操作的代码。

- 通过返回 `nil` 或使用 <doc:OptionalChaining> 中记述的 `?.` 运算符传播 `nil` 值。

- 使用 `??` 运算符提供一个后备值。

- 使用 `!` 运算符停止程序执行。

> 备注: 在 Objective-C 中，`nil` 是指向不存在对象的指针。在 Swift 中，`nil` 并非指针，而是特定类型值的缺失。*任何*类型的可选都可以被设置为 `nil`，而不仅仅是对象类型。

### 可选绑定


你可以使用可选绑定来确定可选是否包含值，如果包含，则将该值作为临时常量或变量使用。可选绑定可与 `if`、`guard` 和 `while` 语句一起使用，以检查可选中的值，并将该值提取到常量或变量中，作为单个操作的一部分。有关 `if`、`guard` 和 `while` 语句的更多信息，请参阅 <doc:ControlFlow>。

使用 `if` 语句编写的可选绑定如下：

```swift
if let <#constantName#> = <#someOptional#> {
   <#statements#>
}
```

你可以重写 <doc:TheBasics#可选> 部分中的 `possibleNumber` 示例，使用可选绑定而不是强制解包：

```swift
if let actualNumber = Int(possibleNumber) {
    print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
} else {
    print("The string \"\(possibleNumber)\" couldn't be converted to an integer")
}
// 打印 "The string "123" has an integer value of 123"
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

该代码可理解为：

“如果 `Int(possibleNumber)` 返回的可选 `Int` 中包含一个值，则将它赋值给名为 `actualNumber` 的新常量。”

如果转换成功，`actualNumber` 常量就可以在 `if` 语句的第一个分支中使用。这个常量已经用可选中的值进行了初始化，并具有相应的非可选类型。在本例中，`possibleNumber` 的类型是 `Int?`，因此 `actualNumber` 的类型是 `Int`。

如果在访问原可选常量或变量的值后不需要再引用它，则可以考虑使用相同的名称来命名新常量或变量：

```swift
let myNumber = Int(possibleNumber)
// 这里，myNumber 是一个可选整数
if let myNumber = myNumber {
    // 这里，myNumber 是一个非可选整数
    print("My number is \(myNumber)")
}
// 打印 "My number is 123"
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

这段代码首先检查 `myNumber` 是否包含一个值，就像上一个示例中的代码一样。如果 `myNumber` 有一个值，名为 `myNumber` 的新常量的值就会被设置为该值。在 `if` 语句的正文中，`myNumber` 指的就是这个新的非可选常量。在 `if` 语句之前或之后写 `myNumber`，指的是原来的可选整数常量。

由于这种代码非常常见，因此可以使用更简短的语法来解包可选值：只写常量或变量的名称即可。解包后的新常量或变量隐式地使用与可选值相同的名称。

```swift
if let myNumber {
    print("My number is \(myNumber)")
}
// 打印 "My number is 123"
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

你可以在可选绑定时使用常量或变量。如果你想在 `if` 语句的第一个分支中修改 `myNumber` 的值，你可以改写为 `if var myNumber`，这样，包含在可选中的值就可以作为变量而不是常量使用了。在 `if` 语句正文中对 `myNumber` 所做的修改仅适用于该局部变量，而*不适用于*原来的可选常量或变量。

你可以在一个 `if` 语句中包含任意数量的可选绑定和布尔条件，并用逗号分隔。如果可选绑定中的任何值为 `nil`，或任何布尔条件的值为 `false`，则整个 `if` 语句的条件被视为 `false`。以下 `if` 语句是等价的：

```swift
if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
    print("\(firstNumber) < \(secondNumber) < 100")
}
// 打印 "4 < 42 < 100"

if let firstNumber = Int("4") {
    if let secondNumber = Int("42") {
        if firstNumber < secondNumber && secondNumber < 100 {
            print("\(firstNumber) < \(secondNumber) < 100")
        }
    }
}
// 打印 "4 < 42 < 100"
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

在 `if` 语句中使用可选绑定创建的常量和变量只能在 `if` 语句的正文中使用。与此相反，用 `guard` 语句创建的常量和变量仅在 `guard` 语句后的代码行中可用，如 <doc:ControlFlow#提前退出> 中所述。

### 提供后备值

处理缺失值的另一种方法是使用 nil-coalescing 操作符（`??`）提供一个缺省值。如果 `??` 左边的可选值不是 `nil`，那么该值将被解包并使用。否则，将使用 `??` 右侧的值。例如，如果指定了姓名，下面的代码会用姓名问候某人，如果姓名为 `nil`，则使用通用问候语。

```swift
let name: String? = nil
let greeting = "Hello, " + (name ?? "friend") + "!"
print(greeting)
// 打印 "Hello, friend!"
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

关于使用 `??` 提供后备值的更多信息，请参阅 <doc:BasicOperators#空合并运算符>。

### 强制解包

当 `nil` 表示不可恢复的故障时（如程序员错误或状态损坏），你可以通过在可选名称的末尾添加感叹号 (`!`) 来访问底层值。这被称为*强制解包*可选的值。强制解包一个非 `nil` 值时，结果是其解包值。强制解包一个 `nil` 值则会引发运行时错误。

实际上，`!` 是 [`fatalError(_:file:line:)`][] 的简写。例如，下面的代码显示了两种等效的方法：

[`fatalError(_:file:line:)`]: https://developer.apple.com/documentation/swift/fatalerror(_:file:line:)

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)

let number = convertedNumber!

guard let number = convertedNumber else {
    fatalError("The number was invalid")
}
```

上述两个版本的代码都要求于 `convertedNumber` 始终包含一个值。使用上述任一方法将该要求写入代码，可让代码在运行时检查该要求是否为真。

有关在运行时执行数据要求和检查假设的更多信息，请参阅 <doc:TheBasics#断言和先决条件>。

### 隐式解包可选

如上所述，可选表示允许常量或变量“无值”。可以用 `if` 语句检查可选值是否存在，如果可选值确实存在，则可以通过可选绑定有条件地解除对可选值的包裹。

有时，从程序结构中可以清楚地看出，在首次设置可选值后，该可选将*始终*有一个值。在这种情况下，无需在每次访问可选时都对其值进行检查和解包，因为你可以安全地假定它一直都有值。

这类可选被定义为*隐式解包可选*。在编写隐式解包可选时，需要在可选类型后面加上感叹号（`String!`）而不是问号（`String?`）。要注意不是在使用可选时在其名称后加上感叹号，而是在声明可选时在其类型后加上感叹号。

当首次定义可选后，可选的值立即被确认存在，并且可以确保在此后的每一个时间点都存在值时，隐式解包可选就非常有用了。在 Swift 中，隐式解包可选的主要用途是在类初始化过程中，如 <doc:AutomaticReferenceCounting#无主引用和隐式解包可选属性> 中所述。

当变量有可能在稍后阶段变为 `nil` 时，不要使用隐式解包可选。如果需要在变量的生命周期内检查变量是否为 `nil`，请务必使用普通的可选类型。

隐式解包的可选在幕后是一个普通的可选值，但也可以像非可选值一样使用，而无需在每次访问时都进行解包。下面的示例显示了可选字符串和隐式解包的可选字符串在作为显式字符串访问其被包装值时的行为差异：

```swift
let possibleString: String? = "An optional string."
let forcedString: String = possibleString! // 需要显式解包

let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString // 隐式解包
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

你可以将隐式解包可选视为允许可选值在需要时被强制解包。在使用隐式解包的可选值时，Swift 会首先尝试将其作为普通可选值使用；如果不能将其作为可选值使用，Swift 就会强制解包该值。在上面的代码中，可选值 `assumedString` 在赋值给 `implicitString` 之前被强制解包，因为 `implicitString` 的类型是显式定义的非可选字符串。在下面的代码中，`optionalString` 没有显式类型，所以它是一个普通的可选值。

```swift
let optionalString = assumedString
// optionalString 的类型是 "String?"，而 assumedString 没有强制解包。
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

如果一个隐式解包的可选值为 `nil`，而你试图访问它的被包装值，就会触发运行时错误。其结果与用感叹号来强制解包一个不包含值的普通可选完全相同。

你可以像检查普通可选一样，检查隐式解包的可选是否为 `nil`：

```swift
if assumedString != nil {
    print(assumedString!)
}
// 打印 "An implicitly unwrapped optional string."
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

你也可以对隐式解包的可选使用可选绑定，在单个语句中检查并解包其值：

```swift
if let definiteString = assumedString {
    print(definiteString)
}
// 打印 "An implicitly unwrapped optional string."
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

## 错误处理

你可以使用*错误处理*来应对程序在执行过程中可能遇到的错误情况。

与可以使用值的存在与否来传达函数的成功或失败的可选不同，错误处理允许你确定失败的根本原因，并在必要时将错误传播到程序的另一部分。

当函数遇到错误条件时，它会*抛出*一个错误。该函数的调用者可以*捕获*错误并做出适当的响应。

```swift
func canThrowAnError() throws {
    // 此函数可能抛出错误，也可能不抛错
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

函数在声明中包含 `throws` 关键字，表示它可以抛出错误。调用可以抛出错误的函数时，要在表达式前加上 `try` 关键字。

Swift 会自动将错误传播到当前作用域之外，直到它们被 `catch` 子句处理为止。

```swift
do {
    try canThrowAnError()
    // 无错误的情况
} catch {
    // 抛出错误的情况
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

`do` 语句会创建一个新的包含作用域，允许错误传播到一个或多个 `catch` 子句。

下面的示例说明了如何使用错误处理来应对不同的错误条件：

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

在本例中，如果没有干净的餐具或缺少任何配料，`makeASandwich()` 函数就会出错。由于 `makeASandwich()` 可能会出错，因此函数调用被封装在 `try` 表达式中。通过将函数调用封装在 `do` 语句中，任何抛出的错误都会传播到所提供的 `catch` 子句中。

如果函数没有出错，就会继续调用 `eatASandwich()` 函数。如果函数抛错且错误符合 `SandwichError.outOfCleanDishes` 的情况，则会调用 `washDishes()` 函数。如果出现与 `SandwichError.missingIngredients` 情况匹配的错误，则会调用 `buyGroceries(_:)` 函数，并使用 `catch` 模式捕获相关的 `[String]` 值。

在 <doc:ErrorHandling> 中有对于抛出、捕获和传播错误更详细的介绍。

## 断言和先决条件

*断言*和*先决条件*是在运行时进行的检查。使用它们可以确保在执行任何进一步代码之前满足一个基本条件。如果断言或前提条件中的布尔条件为 `true`，代码将照常执行。如果条件的计算结果为 `false`，则程序的当前状态无效;代码执行结束，应用会被终止。

你可以使用断言和前提条件来表达你在编码时的假设和期望，因此你可以将它们作为代码的一部分。断言可以帮助你在开发过程中发现错误和不正确的假设，而前提条件可以帮助你在生产过程中发现问题。

除了在运行时验证你的预期，断言和前提条件也是代码中一种有用的文档形式。与上文 <doc:TheBasics#错误处理> 中讨论的错误条件不同，断言和前提条件不用于可恢复或预期的错误。因为一个失败的断言或前提条件表示程序状态无效，所以没有办法捕获一个失败的断言。从无效状态恢复是不可能的。当断言失败时，程序中至少有一个数据是无效的，但你不知道它为什么无效，也不知道是否还有其他状态也无效。

使用断言和先决条件并不能代替代码设计，减少无效条件出现的可能。但是，使用断言和前提条件来强制确保有效的数据和状态，会使应用在出现无效状态时以更可预测的方式终止，并使问题更容易调试。如果不对假设进行检查，可能要到很久以后，当其他地方的代码开始明显失效，以及用户数据被悄无声息地破坏后，你才会注意到这类问题。一旦检测到无效状态，立即停止执行也有助于限制无效状态造成的损害。

断言和前提条件的区别在于何时检查：断言只在调试构建中进行检查，而前提条件则在调试构建和生产构建中都进行检查。在生产版本中，断言中的条件不会被评估。这意味着你可以在开发过程中随意使用断言，而不会影响生产过程中的性能。

### 使用断言进行调试

<!--
  If your code triggers an assertion while running in a debug environment,
  such as when you build and run an app in Xcode,
  you can see exactly where the invalid state occurred
  and query the state of your app at the time that the assertion was triggered.
  An assertion also lets you provide a suitable debug message as to the nature of the assert.
-->

你可以调用 Swift 标准库中的 [`assert(_:_:file:line:)`](https://developer.apple.com/documentation/swift/1541112-assert) 函数来编写断言。你可以向该函数传递一个计算结果为 `true` 或 `false` 的表达式，以及一条在条件结果为 `false` 时显示的信息。例如：

```swift
let age = -3
assert(age >= 0, "A person's age can't be less than zero.")
// 该断言失败的原因是 -3 并不 >= 0。
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

在本例中，如果 `age >= 0` 的值为 `true`，即 `age` 的值为非负值，代码将继续执行。如果 `age` 的值为负数（如上面的代码），则 `age >= 0 `的值为 `false`，断言失败，应用终止。

你可以省略断言信息，例如，当信息只是重复解释断言条件时。

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

如果代码已经检查了条件，则使用 [`assertionFailure(_:file:line:)`](https://developer.apple.com/documentation/swift/1539616-assertionfailure) 函数来表示断言失败。例如：

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

### 强制执行先决条件

当条件有可能为假，但*必须*为真才能继续执行代码时，请使用先决条件。例如，使用先决条件检查下标是否越界，或检查函数是否传递了有效值。

你可以通过调用 [`precondition(_:_:file:line:)`](https://developer.apple.com/documentation/swift/1540960-precondition) 函数来编写先决条件。你可以向该函数传递一个计算结果为 `true` 或 `false` 的表达式，以及一条在条件结果为 `false` 时显示的信息。例如：

```swift
// 在下标的实现中...
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

你还可以调用 [`preconditionFailure(_:file:line:)`](https://developer.apple.com/documentation/swift/1539374-preconditionfailure) 函数来表示发生了故障，例如，如果执行了 switch 的默认情况，但所有有效输入数据本应由其他情况来处理。

> 备注: 如果以非检查模式（`-Ounchecked`）编译，则不会检查前置条件。编译器会假定前提条件总是为真，并据此优化代码。不过，无论优化设置如何，`fatalError(_:file:line:)` 函数始终会停止执行。
>
> 在原型开发和早期开发过程中，你可以使用 `fatalError(_:file:line:)` 函数为尚未实现的功能创建存根，方法是将 `fatalError("Unimplemented")` 写成存根实现。与断言或先决条件不同，致命错误永远不会被优化掉，因此可以确保在遇到存根实现时始终停止执行。

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
