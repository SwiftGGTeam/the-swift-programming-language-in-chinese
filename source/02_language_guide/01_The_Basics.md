# 基础部分

Swift 是一门开发 iOS, macOS, watchOS 和 tvOS 应用的新语言。然而，如果你有 C 或者 Objective-C 开发经验的话，你会发现 Swift 的很多内容都是你熟悉的。

Swift 包含了 C 和 Objective-C 上所有基础数据类型，`Int` 表示整型值； `Double` 和 `Float` 表示浮点型值； `Bool` 是布尔型值；`String` 是文本型数据。 Swift 还提供了三个基本的集合类型，`Array`、`Set` 和 `Dictionary` ，详见 [集合类型](./04_Collection_Types.md)。

就像 C 语言一样，Swift 使用变量来进行存储并通过变量名来关联值。在 Swift 中，广泛的使用着值不可变的变量，它们就是常量，而且比 C 语言的常量更强大。在 Swift 中，如果你要处理的值不需要改变，那使用常量可以让你的代码更加安全并且更清晰地表达你的意图。

除了我们熟悉的类型，Swift 还增加了 Objective-C 中没有的高阶数据类型比如元组（Tuple）。元组可以让你创建或者传递一组数据，比如作为函数的返回值时，你可以用一个元组可以返回多个值。

Swift 还增加了可选（Optional）类型，用于处理值缺失的情况。可选表示 “那儿有一个值，并且它等于 *x* ” 或者 “那儿没有值” 。可选有点像在 Objective-C 中使用 `nil` ，但是它可以用在任何类型上，不仅仅是类。可选类型比 Objective-C 中的 `nil` 指针更加安全也更具表现力，它是 Swift 许多强大特性的重要组成部分。

Swift 是一门 *类型安全* 的语言，这意味着 Swift 可以让你清楚地知道值的类型。如果你的代码需要一个 `String` ，类型安全会阻止你不小心传入一个 `Int` 。同样的，如果你的代码需要一个 `String`，类型安全会阻止你意外传入一个可选的 `String` 。类型安全可以帮助你在开发阶段尽早发现并修正错误。

## 常量和变量 {#constants-and-variables}

常量和变量把一个名字（比如 `maximumNumberOfLoginAttempts` 或者 `welcomeMessage` ）和一个指定类型的值（比如数字 `10` 或者字符串 `"Hello"` ）关联起来。 *常量* 的值一旦设定就不能改变，而 *变量* 的值可以随意更改。

### 声明常量和变量 {#declaring}

常量和变量必须在使用前声明，用 `let` 来声明常量，用 `var` 来声明变量。下面的例子展示了如何用常量和变量来记录用户尝试登录的次数：

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

这两行代码可以被理解为：

“声明一个名字是 `maximumNumberOfLoginAttempts` 的新常量，并给它一个值 `10` 。然后，声明一个名字是 `currentLoginAttempt` 的变量并将它的值初始化为 `0` 。”

在这个例子中，允许的最大尝试登录次数被声明为一个常量，因为这个值不会改变。当前尝试登录次数被声明为一个变量，因为每次尝试登录失败的时候都需要增加这个值。

你可以在一行中声明多个常量或者多个变量，用逗号隔开：

```swift
var x = 0.0, y = 0.0, z = 0.0
```

> 注意
> 
> 如果你的代码中有不需要改变的值，请使用 `let` 关键字将它声明为常量。只将需要改变的值声明为变量。

### 类型注解 {#type-annotations}

当你声明常量或者变量的时候可以加上 *类型注解（type annotation）* ，说明常量或者变量中要存储的值的类型。如果要添加类型注解，需要在常量或者变量名后面加上一个冒号和空格，然后加上类型名称。

这个例子给 `welcomeMessage` 变量添加了类型注解，表示这个变量可以存储 `String` 类型的值：

```swift
var welcomeMessage: String
```

声明中的冒号代表着 *“是...类型”* ，所以这行代码可以被理解为：

“声明一个类型为 `String` ，名字为 `welcomeMessage` 的变量。”

“类型为 `String` ”的意思是“可以存储任意 `String` 类型的值。”

`welcomeMessage` 变量现在可以被设置成任意字符串：

```swift
welcomeMessage = "Hello"
```

你可以在一行中定义多个同样类型的变量，用逗号分割，并在最后一个变量名之后添加类型注解：

```swift
var red, green, blue: Double
```

> 注意
> 
> 一般来说你很少需要写类型注解。如果你在声明常量或者变量的时候赋了一个初始值，Swift 可以推断出这个常量或者变量的类型，请参考 [类型安全和类型推断](#type-safety-and-type-inference)。在上面的例子中，没有给 `welcomeMessage` 赋初始值，所以变量 `welcomeMessage` 的类型是通过一个类型注解指定的，而不是通过初始值推断的。

### 常量和变量的命名 {#naming}

常量和变量名可以包含几乎所有的字符，包括 Unicode 字符：

```swift
let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"
```

常量与变量名不能包含数学符号，箭头，保留的（或者非法的）Unicode 码位，连线与制表符。也不能以数字开头，但是可以在常量与变量名的其他地方包含数字。

一旦你将常量或者变量声明为确定的类型，你就不能使用相同的名字再次进行声明，或者改变其存储的值的类型。同时，你也不能将常量与变量进行互转。

> 注意
> 
> 如果你需要使用与 Swift 保留关键字相同的名称作为常量或者变量名，你可以使用反引号（`）将关键字包围的方式将其作为名字使用。无论如何，你应当避免使用关键字作为常量或变量名，除非你别无选择。

你可以更改现有的变量值为其他同类型的值，在下面的例子中，`friendlyWelcome` 的值从 `"Hello!"` 改为了 `"Bonjour!"`:

```swift
var friendlyWelcome = "Hello!"
friendlyWelcome = "Bonjour!"
// friendlyWelcome 现在是 "Bonjour!"
```

与变量不同，常量的值一旦被确定就不能更改了。尝试这样做会导致编译时报错：

```swift
let languageName = "Swift"
languageName = "Swift++"
// 这会报编译时错误 - languageName 不可改变
```

### 输出常量和变量 {#printing}

你可以用 `print(_:separator:terminator:)` 函数来输出当前常量或变量的值:

```swift
print(friendlyWelcome)
// 输出“Bonjour!”
```

`print(_:separator:terminator:)` 是一个用来输出一个或多个值到适当输出区的全局函数。如果你用 Xcode，`print(_:separator:terminator:)` 将会输出内容到“console”面板上。`separator` 和 `terminator` 参数具有默认值，因此你调用这个函数的时候可以忽略它们。默认情况下，该函数通过添加换行符来结束当前行。如果不想换行，可以传递一个空字符串给 `terminator` 参数--例如，`print(someValue, terminator:"")` 。关于参数默认值的更多信息，请参考 [默认参数值](./06_Functions.md#default-parameter-values)。

Swift 用 *字符串插值（string interpolation）* 的方式把常量名或者变量名当做占位符加入到长字符串中，Swift 会用当前常量或变量的值替换这些占位符。将常量或变量名放入圆括号中，并在开括号前使用反斜杠将其转义：

```swift
print("The current value of friendlyWelcome is \(friendlyWelcome)")
// 输出“The current value of friendlyWelcome is Bonjour!”
```

> 注意
> 
> 字符串插值所有可用的选项，请参考 [字符串插值](./03_Strings_and_Characters.md#string-interpolation)。

## 注释 {#comments}

请将你的代码中的非执行文本注释成提示或者笔记以方便你将来阅读。Swift 的编译器将会在编译代码时自动忽略掉注释部分。

Swift 中的注释与 C 语言的注释非常相似。单行注释以双正斜杠（`//`）作为起始标记:

```swift
// 这是一个注释
```

你也可以进行多行注释，其起始标记为单个正斜杠后跟随一个星号（`/*`），终止标记为一个星号后跟随单个正斜杠（`*/`）:

```swift
/* 这也是一个注释，
但是是多行的 */
```

与 C 语言多行注释不同，Swift 的多行注释可以嵌套在其它的多行注释之中。你可以先生成一个多行注释块，然后在这个注释块之中再嵌套成第二个多行注释。终止注释时先插入第二个注释块的终止标记，然后再插入第一个注释块的终止标记：

```swift
/* 这是第一个多行注释的开头
/* 这是第二个被嵌套的多行注释 */
这是第一个多行注释的结尾 */
```

通过运用嵌套多行注释，你可以快速方便的注释掉一大段代码，即使这段代码之中已经含有了多行注释块。

## 分号 {#semicolons}

与其他大部分编程语言不同，Swift 并不强制要求你在每条语句的结尾处使用分号（`;`），当然，你也可以按照你自己的习惯添加分号。有一种情况下必须要用分号，即你打算在同一行内写多条独立的语句：

```swift
let cat = "🐱"; print(cat)
// 输出“🐱”
```

## 整数 {#integers}

整数就是没有小数部分的数字，比如 `42` 和 `-23` 。整数可以是 `有符号`（正、负、零）或者 `无符号`（正、零）。

Swift 提供了8、16、32和64位的有符号和无符号整数类型。这些整数类型和 C 语言的命名方式很像，比如8位无符号整数类型是 `UInt8`，32位有符号整数类型是 `Int32` 。就像 Swift 的其他类型一样，整数类型采用大写命名法。

### 整数范围 {#integer-bounds}

你可以访问不同整数类型的 `min` 和 `max` 属性来获取对应类型的最小值和最大值：

```swift
let minValue = UInt8.min  // minValue 为 0，是 UInt8 类型
let maxValue = UInt8.max  // maxValue 为 255，是 UInt8 类型
```

`min` 和 `max` 所传回值的类型，正是其所对的整数类型（如上例 UInt8, 所传回的类型是 UInt8），可用在表达式中相同类型值旁。

### Int {#Int}

一般来说，你不需要专门指定整数的长度。Swift 提供了一个特殊的整数类型 `Int`，长度与当前平台的原生字长相同：

* 在32位平台上，`Int` 和 `Int32` 长度相同。
* 在64位平台上，`Int` 和 `Int64` 长度相同。

除非你需要特定长度的整数，一般来说使用 `Int` 就够了。这可以提高代码一致性和可复用性。即使是在32位平台上，`Int` 可以存储的整数范围也可以达到 `-2,147,483,648` ~ `2,147,483,647`，大多数时候这已经足够大了。

### UInt {#UInt}

Swift 也提供了一个特殊的无符号类型 `UInt`，长度与当前平台的原生字长相同：

* 在32位平台上，`UInt` 和 `UInt32` 长度相同。
* 在64位平台上，`UInt` 和 `UInt64` 长度相同。

> 注意
> 
> 尽量不要使用 `UInt`，除非你真的需要存储一个和当前平台原生字长相同的无符号整数。除了这种情况，最好使用 `Int`，即使你要存储的值已知是非负的。统一使用 `Int` 可以提高代码的可复用性，避免不同类型数字之间的转换，并且匹配数字的类型推断，请参考 [类型安全和类型推断](#type-safety-and-type-inference)。

## 浮点数 {#floating-point-numbers}

浮点数是有小数部分的数字，比如 `3.14159`、`0.1` 和 `-273.15`。

浮点类型比整数类型表示的范围更大，可以存储比 `Int` 类型更大或者更小的数字。Swift 提供了两种有符号浮点数类型：

* `Double` 表示64位浮点数。当你需要存储很大或者很高精度的浮点数时请使用此类型。
* `Float` 表示32位浮点数。精度要求不高的话可以使用此类型。

> 注意
> 
> `Double` 精确度很高，至少有 15 位小数，而 `Float` 只有 6 位小数。选择哪个类型取决于你的代码需要处理的值的范围，在两种类型都匹配的情况下，将优先选择 `Double`。

## 类型安全和类型推断 {#type-safety-and-type-inference}

Swift 是一个 *类型安全（type safe）* 的语言。类型安全的语言可以让你清楚地知道代码要处理的值的类型。如果你的代码需要一个 `String`，你绝对不可能不小心传进去一个 `Int`。

由于 Swift 是类型安全的，所以它会在编译你的代码时进行 *类型检查（type checks）*，并把不匹配的类型标记为错误。这可以让你在开发的时候尽早发现并修复错误。

当你要处理不同类型的值时，类型检查可以帮你避免错误。然而，这并不是说你每次声明常量和变量的时候都需要显式指定类型。如果你没有显式指定类型，Swift 会使用 *类型推断（type inference）* 来选择合适的类型。有了类型推断，编译器可以在编译代码的时候自动推断出表达式的类型。原理很简单，只要检查你赋的值即可。

因为有类型推断，和 C 或者 Objective-C 比起来 Swift 很少需要声明类型。常量和变量虽然需要明确类型，但是大部分工作并不需要你自己来完成。

当你声明常量或者变量并赋初值的时候类型推断非常有用。当你在声明常量或者变量的时候赋给它们一个字面量（literal value 或 literal）即可触发类型推断。（字面量就是会直接出现在你代码中的值，比如 `42` 和 `3.14159` 。）

例如，如果你给一个新常量赋值 `42` 并且没有标明类型，Swift 可以推断出常量类型是 `Int` ，因为你给它赋的初始值看起来像一个整数：

```swift
let meaningOfLife = 42
// meaningOfLife 会被推测为 Int 类型
```

同理，如果你没有给浮点字面量标明类型，Swift 会推断你想要的是 `Double`：

```swift
let pi = 3.14159
// pi 会被推测为 Double 类型
```

当推断浮点数的类型时，Swift 总是会选择 `Double` 而不是 `Float`。

如果表达式中同时出现了整数和浮点数，会被推断为 `Double` 类型：

```swift
let anotherPi = 3 + 0.14159
// anotherPi 会被推测为 Double 类型
```

原始值 `3` 没有显式声明类型，而表达式中出现了一个浮点字面量，所以表达式会被推断为 `Double` 类型。

## 数值型字面量 {#numeric-literals}

整数字面量可以被写作：

* 一个 *十进制* 数，没有前缀
* 一个 *二进制* 数，前缀是 `0b`
* 一个 *八进制* 数，前缀是 `0o`
* 一个 *十六进制* 数，前缀是 `0x`

下面的所有整数字面量的十进制值都是 `17`:

```swift
let decimalInteger = 17
let binaryInteger = 0b10001       // 二进制的17
let octalInteger = 0o21           // 八进制的17
let hexadecimalInteger = 0x11     // 十六进制的17
```

浮点字面量可以是十进制（没有前缀）或者是十六进制（前缀是 `0x` ）。小数点两边必须有至少一个十进制数字（或者是十六进制的数字）。十进制浮点数也可以有一个可选的指数（exponent)，通过大写或者小写的 `e` 来指定；十六进制浮点数必须有一个指数，通过大写或者小写的 `p` 来指定。

如果一个十进制数的指数为 `exp`，那这个数相当于基数和10^exp 的乘积：

* `1.25e2` 表示 1.25 × 10^2，等于 `125.0`。
* `1.25e-2` 表示 1.25 × 10^-2，等于 `0.0125`。

如果一个十六进制数的指数为 `exp`，那这个数相当于基数和2^exp 的乘积：

* `0xFp2` 表示 15 × 2^2，等于 `60.0`。
* `0xFp-2` 表示 15 × 2^-2，等于 `3.75`。

下面的这些浮点字面量都等于十进制的 `12.1875`：

```swift
let decimalDouble = 12.1875
let exponentDouble = 1.21875e1
let hexadecimalDouble = 0xC.3p0
```

数值类字面量可以包括额外的格式来增强可读性。整数和浮点数都可以添加额外的零并且包含下划线，并不会影响字面量：

```swift
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```

## 数值型类型转换 {#numeric-type-conversion}

通常来讲，即使代码中的整数常量和变量已知非负，也请使用 `Int` 类型。总是使用默认的整数类型可以保证你的整数常量和变量可以直接被复用并且可以匹配整数类字面量的类型推断。

只有在必要的时候才使用其他整数类型，比如要处理外部的长度明确的数据或者为了优化性能、内存占用等等。使用显式指定长度的类型可以及时发现值溢出并且可以暗示正在处理特殊数据。

### 整数转换 {#integer-conversion}

不同整数类型的变量和常量可以存储不同范围的数字。`Int8` 类型的常量或者变量可以存储的数字范围是 `-128`~`127`，而 `UInt8` 类型的常量或者变量能存储的数字范围是 `0`~`255`。如果数字超出了常量或者变量可存储的范围，编译的时候会报错：

```swift
let cannotBeNegative: UInt8 = -1
// UInt8 类型不能存储负数，所以会报错
let tooBig: Int8 = Int8.max + 1
// Int8 类型不能存储超过最大值的数，所以会报错
```

由于每种整数类型都可以存储不同范围的值，所以你必须根据不同情况选择性使用数值型类型转换。这种选择性使用的方式，可以预防隐式转换的错误并让你的代码中的类型转换意图变得清晰。

要将一种数字类型转换成另一种，你要用当前值来初始化一个期望类型的新数字，这个数字的类型就是你的目标类型。在下面的例子中，常量 `twoThousand` 是 `UInt16` 类型，然而常量 `one` 是 `UInt8` 类型。它们不能直接相加，因为它们类型不同。所以要调用 `UInt16(one)` 来创建一个新的 `UInt16` 数字并用 `one` 的值来初始化，然后使用这个新数字来计算：

```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

现在两个数字的类型都是 `UInt16`，可以进行相加。目标常量 `twoThousandAndOne` 的类型被推断为 `UInt16`，因为它是两个 `UInt16` 值的和。

`SomeType(ofInitialValue)` 是调用 Swift 构造器并传入一个初始值的默认方法。在语言内部，`UInt16` 有一个构造器，可以接受一个 `UInt8` 类型的值，所以这个构造器可以用现有的 `UInt8` 来创建一个新的 `UInt16`。注意，你并不能传入任意类型的值，只能传入 `UInt16` 内部有对应构造器的值。不过你可以扩展现有的类型来让它可以接收其他类型的值（包括自定义类型），请参考 [扩展](./20_Extensions.md)。

### 整数和浮点数转换 {#integer-and-floating-point-conversion}

整数和浮点数的转换必须显式指定类型：

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi 等于 3.14159，所以被推测为 Double 类型
```

这个例子中，常量 `three` 的值被用来创建一个 `Double` 类型的值，所以加号两边的数类型须相同。如果不进行转换，两者无法相加。

浮点数到整数的反向转换同样行，整数类型可以用 `Double` 或者 `Float` 类型来初始化：

```swift
let integerPi = Int(pi)
// integerPi 等于 3，所以被推测为 Int 类型
```

当用这种方式来初始化一个新的整数值时，浮点值会被截断。也就是说 `4.75` 会变成 `4`，`-3.9` 会变成 `-3`。

> 注意
> 
> 结合数字类常量和变量不同于结合数字类字面量。字面量 `3` 可以直接和字面量 `0.14159` 相加，因为数字字面量本身没有明确的类型。它们的类型只在编译器需要求值的时候被推测。

## 类型别名 {#type-aliases}

*类型别名（type aliases）* 就是给现有类型定义另一个名字。你可以使用 `typealias` 关键字来定义类型别名。

当你想要给现有类型起一个更有意义的名字时，类型别名非常有用。假设你正在处理特定长度的外部资源的数据：

```swift
typealias AudioSample = UInt16
```

定义了一个类型别名之后，你可以在任何使用原始名的地方使用别名：

```swift
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound 现在是 0
```

本例中，`AudioSample` 被定义为 `UInt16` 的一个别名。因为它是别名，`AudioSample.min` 实际上是 `UInt16.min`，所以会给 `maxAmplitudeFound` 赋一个初值 `0`。

## 布尔值 {#booleans}

Swift 有一个基本的 *布尔（Boolean）类型*，叫做 `Bool`。布尔值指 *逻辑* 上的值，因为它们只能是真或者假。Swift 有两个布尔常量，`true` 和 `false`：

```swift
let orangesAreOrange = true
let turnipsAreDelicious = false
```

`orangesAreOrange` 和 `turnipsAreDelicious` 的类型会被推断为 `Bool`，因为它们的初值是布尔字面量。就像之前提到的 `Int` 和 `Double` 一样，如果你创建变量的时候给它们赋值 `true` 或者 `false`，那你不需要将常量或者变量声明为 `Bool` 类型。初始化常量或者变量的时候如果所赋的值类型已知，就可以触发类型推断，这让 Swift 代码更加简洁并且可读性更高。

当你编写条件语句比如 `if` 语句的时候，布尔值非常有用：

```swift
if turnipsAreDelicious {
    print("Mmm, tasty turnips!")
} else {
    print("Eww, turnips are horrible.")
}
// 输出“Eww, turnips are horrible.”
```

条件语句，例如 `if`，请参考 [控制流](./05_Control_Flow.md)。

如果你在需要使用 `Bool` 类型的地方使用了非布尔值，Swift 的类型安全机制会报错。下面的例子会报告一个编译时错误：

```swift
let i = 1
if i {
    // 这个例子不会通过编译，会报错
}
```

然而，下面的例子是合法的：

```swift
let i = 1
if i == 1 {
    // 这个例子会编译成功
}
```

`i == 1` 的比较结果是 `Bool` 类型，所以第二个例子可以通过类型检查。类似 `i == 1` 这样的比较，请参考 [基本操作符](./05_Control_Flow.md)。

和 Swift 中的其他类型安全的例子一样，这个方法可以避免错误并保证这块代码的意图总是清晰的。

## 元组 {#tuples}

*元组（tuples）* 把多个值组合成一个复合值。元组内的值可以是任意类型，并不要求是相同类型。

下面这个例子中，`(404, "Not Found")` 是一个描述 *HTTP 状态码（HTTP status code）* 的元组。HTTP 状态码是当你请求网页的时候 web 服务器返回的一个特殊值。如果你请求的网页不存在就会返回一个 `404 Not Found` 状态码。

```swift
let http404Error = (404, "Not Found")
// http404Error 的类型是 (Int, String)，值是 (404, "Not Found")
```

`(404, "Not Found")` 元组把一个 `Int` 值和一个 `String` 值组合起来表示 HTTP 状态码的两个部分：一个数字和一个人类可读的描述。这个元组可以被描述为“一个类型为 `(Int, String)` 的元组”。

你可以把任意顺序的类型组合成一个元组，这个元组可以包含所有类型。只要你想，你可以创建一个类型为 `(Int, Int, Int)` 或者 `(String, Bool)` 或者其他任何你想要的组合的元组。

你可以将一个元组的内容分解（decompose）成单独的常量和变量，然后你就可以正常使用它们了：

```swift
let (statusCode, statusMessage) = http404Error
print("The status code is \(statusCode)")
// 输出“The status code is 404”
print("The status message is \(statusMessage)")
// 输出“The status message is Not Found”
```

如果你只需要一部分元组值，分解的时候可以把要忽略的部分用下划线（`_`）标记：

```swift
let (justTheStatusCode, _) = http404Error
print("The status code is \(justTheStatusCode)")
// 输出“The status code is 404”
```

此外，你还可以通过下标来访问元组中的单个元素，下标从零开始：

```swift
print("The status code is \(http404Error.0)")
// 输出“The status code is 404”
print("The status message is \(http404Error.1)")
// 输出“The status message is Not Found”
```

你可以在定义元组的时候给单个元素命名：

```swift
let http200Status = (statusCode: 200, description: "OK")
```

给元组中的元素命名后，你可以通过名字来获取这些元素的值：

```swift
print("The status code is \(http200Status.statusCode)")
// 输出“The status code is 200”
print("The status message is \(http200Status.description)")
// 输出“The status message is OK”
```

作为函数返回值时，元组非常有用。一个用来获取网页的函数可能会返回一个 `(Int, String)` 元组来描述是否获取成功。和只能返回一个类型的值比较起来，一个包含两个不同类型值的元组可以让函数的返回信息更有用。请参考 [函数参数与返回值](./06_Functions.md#Function-Parameters-and-Return-Values)。

> 注意
> 
> 当遇到一些相关值的简单分组时，元组是很有用的。元组不适合用来创建复杂的数据结构。如果你的数据结构比较复杂，不要使用元组，用类或结构体去建模。欲获得更多信息，请参考 [结构体和类](./09_Structures_And_Classes.md)。

## 可选类型 {#optionals}

使用 *可选类型（optionals）* 来处理值可能缺失的情况。可选类型表示两种可能：
或者有值， 你可以解析可选类型访问这个值， 或者根本没有值。

> 注意
> 
> C 和 Objective-C 中并没有可选类型这个概念。最接近的是 Objective-C 中的一个特性，一个方法要不返回一个对象要不返回 `nil`，`nil` 表示“缺少一个合法的对象”。然而，这只对对象起作用——对于结构体，基本的 C 类型或者枚举类型不起作用。对于这些类型，Objective-C 方法一般会返回一个特殊值（比如 `NSNotFound`）来暗示值缺失。这种方法假设方法的调用者知道并记得对特殊值进行判断。然而，Swift 的可选类型可以让你暗示*任意类型*的值缺失，并不需要一个特殊值。

来看一个例子。Swift 的 `Int` 类型有一种构造器，作用是将一个 `String` 值转换成一个 `Int` 值。然而，并不是所有的字符串都可以转换成一个整数。字符串 `"123"` 可以被转换成数字 `123` ，但是字符串 `"hello, world"` 不行。

下面的例子使用这种构造器来尝试将一个 `String` 转换成 `Int`：

```swift
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)
// convertedNumber 被推测为类型 "Int?"， 或者类型 "optional Int"
```

因为该构造器可能会失败，所以它返回一个 *可选类型* （optional）`Int`，而不是一个 `Int`。一个可选的 `Int` 被写作 `Int?` 而不是 `Int`。问号暗示包含的值是可选类型，也就是说可能包含 `Int` 值也可能 *不包含值* 。（不能包含其他任何值比如 `Bool` 值或者 `String` 值。只能是 `Int` 或者什么都没有。）

### nil {#nil}

你可以给可选变量赋值为 `nil` 来表示它没有值：

```swift
var serverResponseCode: Int? = 404
// serverResponseCode 包含一个可选的 Int 值 404
serverResponseCode = nil
// serverResponseCode 现在不包含值
```

> 注意
> 
> `nil` 不能用于非可选的常量和变量。如果你的代码中有常量或者变量需要处理值缺失的情况，请把它们声明成对应的可选类型。

如果你声明一个可选变量但是没有赋值，它们会自动被设置为 `nil`：

```swift
var surveyAnswer: String?
// surveyAnswer 被自动设置为 nil
```

> 注意
> 
> Swift 的 `nil` 和 Objective-C 中的 `nil` 并不一样。在 Objective-C 中，`nil` 是一个指向不存在对象的指针。在 Swift 中，`nil` 不是指针——它是一个确定的值，用来表示值缺失。任何类型的可选状态都可以被设置为 `nil`，不只是对象类型。

### if 语句以及强制解析 {#if}

你可以使用 `if` 语句和 `nil` 比较来判断一个可选值是否包含值。你可以使用“相等”(`==`)或“不等”(`!=`)来执行比较。

如果可选类型有值，它将不等于 `nil`：

```swift
if convertedNumber != nil {
    print("convertedNumber contains some integer value.")
}
// 输出“convertedNumber contains some integer value.”
```

当你确定可选类型确实包含值之后，你可以在可选的名字后面加一个感叹号（`!`）来获取值。这个惊叹号表示“我知道这个可选有值，请使用它。”这被称为可选值的 *强制解析（forced unwrapping）* ：

```swift
if convertedNumber != nil {
    print("convertedNumber has an integer value of \(convertedNumber!).")
}
// 输出“convertedNumber has an integer value of 123.”
```

更多关于 `if` 语句的内容，请参考 [控制流](./05_Control_Flow.md)。

> 注意
> 
> 使用 `!` 来获取一个不存在的可选值会导致运行时错误。使用 `!` 来强制解析值之前，一定要确定可选包含一个非 `nil` 的值。

### 可选绑定 {#optional-binding}

使用 *可选绑定（optional binding）* 来判断可选类型是否包含值，如果包含就把值赋给一个临时常量或者变量。可选绑定可以用在 `if` 和 `while` 语句中，这条语句不仅可以用来判断可选类型中是否有值，同时可以将可选类型中的值赋给一个常量或者变量。`if` 和 `while` 语句，请参考 [控制流](./05_Control_Flow.md)。

像下面这样在 `if` 语句中写一个可选绑定：

```swift
if let constantName = someOptional {
    statements
}
```

你可以像上面这样使用可选绑定来重写 在 [可选类型](./01_The_Basics.md#optionals) 举出的 `possibleNumber` 例子：

```swift
if let actualNumber = Int(possibleNumber) {
    print("\'\(possibleNumber)\' has an integer value of \(actualNumber)")
} else {
    print("\'\(possibleNumber)\' could not be converted to an integer")
}
// 输出“'123' has an integer value of 123”
```

这段代码可以被理解为：

“如果 `Int(possibleNumber)` 返回的可选 `Int` 包含一个值，创建一个叫做 `actualNumber` 的新常量并将可选包含的值赋给它。”

如果转换成功，`actualNumber` 常量可以在 `if` 语句的第一个分支中使用。它已经被可选类型 *包含的* 值初始化过，所以不需要再使用 `!` 后缀来获取它的值。在这个例子中，`actualNumber` 只被用来输出转换结果。

如果你在访问它包含的值后不需要引用原来的可选常量或是可选变量，你可以对新的常量或是新的变量使用相同的名称：

```swift
let myNumber = Int(possibleNumber)
// 此处 myNumber 为一可选整型
if let myNumber = myNumber {
	// 此处 myNumber 为一不可选整型
	print("My number is \(myNumber)")
}
// 输出 "My number is 123"
```

正如前一个例子中的代码一样，本例代码首先检查 `myNumber` 是否包含任何值。若 `myNumber` 包含有任何值，则该值将成为新常量 `myNumber` 的值。在 `if` 语句的主体中，写入的 `myNumber` 指向这一个新的非可选常量。在 `if` 语句开始前和语句结束后，写入的 `myNumber` 指向可选的整数常量。

由于这种代码非常常见，你可以通过一个更简短的写法来解包一个可选值：只写你要展开的常量或变量的名称。新的常量/变量将使用相同的名称作为其隐式解包可选值。

``` swift
if let myNumber{
	print("My number is \(myNumber)")
}
// 输出 "My number is 123"
```

你可以在可选绑定中使用常量和变量。如果你想在 `if` 语句的第一个分支中操作 `actualNumber` 的值，你可以改成 `if var actualNumber`，这样可选类型包含的值就会被赋给一个变量而非常量。你在 `if` 语句中对 `myNumber` 所做的更改将仅作用于该局部变量而非你解包的原始可选常量/变量。

你可以包含多个可选绑定或多个布尔条件在一个 `if` 语句中，只要使用逗号分开就行。只要有任意一个可选绑定的值为 `nil`，或者任意一个布尔条件为 `false`，则整个 `if` 条件判断为 `false`。下面的两个 `if` 语句是等效的：

```swift
if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
    print("\(firstNumber) < \(secondNumber) < 100")
}
// 输出“4 < 42 < 100”
if let firstNumber = Int("4") {
    if let secondNumber = Int("42") {
        if firstNumber < secondNumber && secondNumber < 100 {
            print("\(firstNumber) < \(secondNumber) < 100")
        }
    }
}
// 输出“4 < 42 < 100”
```

> 注意
> 
> 在 `if` 条件语句中使用常量和变量来创建一个可选绑定，仅在 `if` 语句的句中（`body`）中才能获取到值。相反，在 `guard` 语句中使用常量和变量来创建一个可选绑定，仅在 `guard` 语句外且在语句后才能获取到值，请参考 [提前退出](./05_Control_Flow.md#early-exit)。

### 隐式解析可选类型 {#implicityly-unwrapped-optionals}

如上所述，可选类型暗示了常量或者变量可以“没有值”。可选可以通过 `if` 语句来判断是否有值，如果有值的话可以通过可选绑定来解析值。

有时候在程序架构中，第一次被赋值之后，可以确定一个可选类型_总会_有值。在这种情况下，每次都要判断和解析可选值是非常低效的，因为可以确定它总会有值。

这种类型的可选状态被定义为隐式解析可选类型（implicitly unwrapped optionals）。把想要用作可选的类型的后面的问号（`String?`）改成感叹号（`String!`）来声明一个隐式解析可选类型。与其在使用时把感叹号放在可选类型的名称的后面，你可以在定义它时，直接把感叹号放在可选类型的后面。

当可选类型被第一次赋值之后就可以确定之后一直有值的时候，隐式解析可选类型非常有用。隐式解析可选类型主要被用在 Swift 中类的构造过程中，请参考 [无主引用以及隐式解析可选属性](./24_Automatic_Reference_Counting.md#unowned-references-and-implicitly-unwrapped-optional-properties)。

一个隐式解析可选类型其实就是一个普通的可选类型，但是可以被当做非可选类型来使用，并不需要每次都使用解析来获取可选值。下面的例子展示了可选类型 `String` 和隐式解析可选类型 `String` 之间的区别：

```swift
let possibleString: String? = "An optional string."
let forcedString: String = possibleString! // 需要感叹号来获取值

let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString  // 不需要感叹号
```

你可以把隐式解析可选类型当做一个可以自动解析的可选类型。当你使用一个隐式解析可选值时，Swift 首先会把它当作普通的可选值；如果它不能被当成可选类型使用，Swift 会强制解析可选值。在以上的代码中，可选值 `assumedString` 在把自己的值赋给 `implicitString` 之前会被强制解析，原因是 `implicitString` 本身的类型是非可选类型的 `String`。在下面的代码中，`optionalString` 并没有显式的数据类型。那么根据类型推断，它就是一个普通的可选类型。
```swift
let optionalString = assumedString
// optionalString 的类型是 "String?"，assumedString 也没有被强制解析。
```

如果你在隐式解析可选类型没有值的时候尝试取值，会触发运行时错误。和你在没有值的普通可选类型后面加一个感叹号一样。

你可以把隐式解析可选类型当做普通可选类型来判断它是否包含值：

```swift
if assumedString != nil {
    print(assumedString!)
}
// 输出“An implicitly unwrapped optional string.”
```

你也可以在可选绑定中使用隐式解析可选类型来检查并解析它的值：

```swift
if let definiteString = assumedString {
    print(definiteString)
}
// 输出“An implicitly unwrapped optional string.”
```

> 注意
> 
> 如果一个变量之后可能变成 `nil` 的话请不要使用隐式解析可选类型。如果你需要在变量的生命周期中判断是否是 `nil` 的话，请使用普通可选类型。

## 错误处理 {#error-handling}

你可以使用 *错误处理（error handling）* 来应对程序执行中可能会遇到的错误条件。

相对于可选中运用值的存在与缺失来表达函数的成功与失败，错误处理可以推断失败的原因，并传播至程序的其他部分。

当一个函数遇到错误条件，它能报错。调用函数的地方能抛出错误消息并合理处理。

```swift
func canThrowAnError() throws {
    // 这个函数有可能抛出错误
}
```

一个函数可以通过在声明中添加 `throws` 关键词来抛出错误消息。当你的函数能抛出错误消息时，你应该在表达式中前置 `try` 关键词。

```swift
do {
    try canThrowAnError()
    // 没有错误消息抛出
} catch {
    // 有一个错误消息抛出
}
```

一个 `do` 语句创建了一个新的包含作用域，使得错误能被传播到一个或多个 `catch` 从句。

这里有一个错误处理如何用来应对不同错误条件的例子。

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

在此例中，`makeASandwich()`（做一个三明治）函数会抛出一个错误消息如果没有干净的盘子或者某个原料缺失。因为 `makeASandwich()` 抛出错误，函数调用被包裹在 `try` 表达式中。将函数包裹在一个 `do` 语句中，任何被抛出的错误会被传播到提供的 `catch` 从句中。

如果没有错误被抛出，`eatASandwich()` 函数会被调用。如果一个匹配 `SandwichError.outOfCleanDishes` 的错误被抛出，`washDishes()` 函数会被调用。如果一个匹配 `SandwichError.missingIngredients` 的错误被抛出，`buyGroceries(_:)` 函数会被调用，并且使用 `catch` 所捕捉到的关联值 `[String]` 作为参数。

抛出，捕捉，以及传播错误会在 [错误处理](./17_Error_Handling.md) 章节详细说明。

## 断言和先决条件 {#assertions-and-preconditions}

断言和先决条件是在运行时所做的检查。你可以用他们来检查在执行后续代码之前是否一个必要的条件已经被满足了。如果断言或者先决条件中的布尔条件评估的结果为 true（真），则代码像往常一样继续执行。如果布尔条件评估结果为 false（假），程序的当前状态是无效的，则代码执行结束，应用程序中止。

你使用断言和先决条件来表达你所做的假设和你在编码时候的期望。你可以将这些包含在你的代码中。断言帮助你在开发阶段找到错误和不正确的假设，先决条件帮助你在生产环境中探测到存在的问题。

除了在运行时验证你的期望值，断言和先决条件也变成了一个在你的代码中的有用的文档形式。和在上面讨论过的 [错误处理](./17_Error_Handling.md) 不同，断言和先决条件并不是用来处理可以恢复的或者可预期的错误。因为一个断言失败表明了程序正处于一个无效的状态，没有办法去捕获一个失败的断言。

使用断言和先决条件不是一个能够避免出现程序出现无效状态的编码方法。然而，如果一个无效状态程序产生了，断言和先决条件可以强制检查你的数据和程序状态，使得你的程序可预测的中止（译者：不是系统强制的，被动的中止），并帮助使这个问题更容易调试。一旦探测到无效的状态，执行则被中止，防止无效的状态导致的进一步对于系统的伤害。

断言和先决条件的不同点是，他们什么时候进行状态检测：断言仅在调试环境运行，而先决条件则在调试环境和生产环境中运行。在生产环境中，断言的条件将不会进行评估。这个意味着你可以使用很多断言在你的开发阶段，但是这些断言在生产环境中不会产生任何影响。

### 使用断言进行调试 {#debugging-with-assertions}

你可以调用 Swift 标准库的 `assert(_:_:file:line:)` 函数来写一个断言。向这个函数传入一个结果为 `true` 或者 `false` 的表达式以及一条信息，当表达式的结果为 `false` 的时候这条信息会被显示：

```swift
let age = -3
assert(age >= 0, "A person's age cannot be less than zero")
// 因为 age < 0，所以断言会触发
```

在这个例子中，只有 `age >= 0` 为 `true` 时，即 `age` 的值非负的时候，代码才会继续执行。如果 `age` 的值是负数，就像代码中那样，`age >= 0` 为 `false`，断言被触发，终止应用。

如果不需要断言信息，可以就像这样忽略掉：

```swift
assert(age >= 0)
```

如果代码已经检查了条件，你可以使用 `assertionFailure(_:file:line:)` 函数来表明断言失败了，例如：

```swift
if age > 10 {
    print("You can ride the roller-coaster or the ferris wheel.")
} else if age > 0 {
    print("You can ride the ferris wheel.")
} else {
    assertionFailure("A person's age can't be less than zero.")
}
```

### 强制执行先决条件 {#enforcing-preconditions}

当一个条件可能为假，但是继续执行代码要求条件必须为真的时候，需要使用先决条件。例如使用先决条件来检查是否下标越界，或者来检查是否将一个正确的参数传给函数。

你可以使用全局 `precondition(_:_:file:line:)` 函数来写一个先决条件。向这个函数传入一个结果为 `true` 或者 `false` 的表达式以及一条信息，当表达式的结果为 `false` 的时候这条信息会被显示：

```swift
// 在一个下标的实现里...
precondition(index > 0, "Index must be greater than zero.")
```

你可以调用　`preconditionFailure(_:file:line:)` 方法来表明出现了一个错误，例如，switch 进入了 default 分支，但是所有的有效值应该被任意一个其他分支（非 default 分支）处理。

> 注意
> 
> 如果你使用 unchecked 模式（-Ounchecked）编译代码，先决条件将不会进行检查。编译器假设所有的先决条件总是为 true（真），他将优化你的代码。然而，`fatalError(_:file:line:)` 函数总是中断执行，无论你怎么进行优化设定。
> 
> 你能使用 `fatalError(_:file:line:)` 函数在设计原型和早期开发阶段，这个阶段只有方法的声明，但是没有具体实现，你可以在方法体中写上 fatalError("Unimplemented")作为具体实现。因为 fatalError 不会像断言和先决条件那样被优化掉，所以你可以确保当代码执行到一个没有被实现的方法时，程序会被中断。
