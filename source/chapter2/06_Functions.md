# 函数（Functions）
-----------------

> 1.0
> 翻译：[honghaoz](https://github.com/honghaoz)
> 校对：[LunaticM](https://github.com/LunaticM)

> 2.0
> 翻译+校对：[dreamkidd](https://github.com/dreamkidd)

本页包含内容：

- [函数定义与调用（Defining and Calling Functions）](#Defining_and_Calling_Functions)
- [函数参数与返回值（Function Parameters and Return Values）](#Function_Parameters_and_Return_Values)
- [函数参数名称（Function Parameter Names）](#Function_Parameter_Names)
- [函数类型（Function Types）](#Function_Types)
- [函数嵌套（Nested Functions）](#Nested_Functions)

函数是用来完成特定任务的独立的代码块。你给一个函数起一个合适的名字，用来标识函数做什么，并且当函数需要执行的时候，这个名字会被“调用”。

Swift 统一的函数语法足够灵活，可以用来表示任何函数，包括从最简单的没有参数名字的 C 风格函数，到复杂的带局部和外部参数名的 Objective-C 风格函数。参数可以提供默认值，以简化函数调用。参数也可以既当做传入参数，也当做传出参数，也就是说，一旦函数执行结束，传入的参数值可以被修改。

在 Swift 中，每个函数都有一种类型，包括函数的参数值类型和返回值类型。你可以把函数类型当做任何其他普通变量类型一样处理，这样就可以更简单地把函数当做别的函数的参数，也可以从其他函数中返回函数。函数的定义可以写在在其他函数定义中，这样可以在嵌套函数范围内实现功能封装。

<a name="Defining_and_Calling_Functions"></a>
## 函数的定义与调用（Defining and Calling Functions）

当你定义一个函数时，你可以定义一个或多个有名字和类型的值，作为函数的输入（称为参数，parameters），也可以定义某种类型的值作为函数执行结束的输出（称为返回类型）。

每个函数有个函数名，用来描述函数执行的任务。要使用一个函数时，你用函数名“调用”，并传给它匹配的输入值（称作实参，arguments）。一个函数的实参必须与函数参数表里参数的顺序一致。

在下面例子中的函数叫做`"sayHello(_:)"`，之所以叫这个名字,是因为这个函数用一个人的名字当做输入，并返回给这个人的问候语。为了完成这个任务，你定义一个输入参数-一个叫做 `personName` 的 `String` 值，和一个包含给这个人问候语的 `String` 类型的返回值：

```swift
func sayHello(personName: String) -> String {
    let greeting = "Hello, " + personName + "!"
    return greeting
}
```

所有的这些信息汇总起来成为函数的定义，并以 `func` 作为前缀。指定函数返回类型时，用返回箭头 `->`（一个连字符后跟一个右尖括号）后跟返回类型的名称的方式来表示。

该定义描述了函数做什么，它期望接收什么和执行结束时它返回的结果是什么类型。这样的定义使得函数可以在别的地方以一种清晰的方式被调用：

```swift
print(sayHello("Anna"))
// prints "Hello, Anna!"
print(sayHello("Brian"))
// prints "Hello, Brian!"
```

调用 `sayHello(_:)` 函数时，在圆括号中传给它一个 `String` 类型的实参。因为这个函数返回一个 `String` 类型的值，`sayHello` 可以被包含在 `print` 的调用中，用来输出这个函数的返回值，正如上面所示。

在 `sayHello(_:)` 的函数体中，先定义了一个新的名为 `greeting` 的 `String` 常量，同时赋值了给 `personName` 的一个简单问候消息。然后用 `return` 关键字把这个问候返回出去。一旦 `return greeting` 被调用，该函数结束它的执行并返回 `greeting` 的当前值。

你可以用不同的输入值多次调用 `sayHello(_:)`。上面的例子展示的是用`"Anna"`和`"Brian"`调用的结果，该函数分别返回了不同的结果。

为了简化这个函数的定义，可以将问候消息的创建和返回写成一句：

```swift
func sayHelloAgain(personName: String) -> String {
    return "Hello again, " + personName + "!"
}
print(sayHelloAgain("Anna"))
// prints "Hello again, Anna!"
```

<a name="Function_Parameters_and_Return_Values"></a>
## 函数参数与返回值（Function Parameters and Return Values）

函数参数与返回值在Swift中极为灵活。你可以定义任何类型的函数，包括从只带一个未名参数的简单函数到复杂的带有表达性参数名和不同参数选项的复杂函数。

### 多重输入参数（Multiple Input Parameters）

函数可以有多个输入参数，写在圆括号中，用逗号分隔。

下面这个函数用一个半开区间的开始点和结束点，计算出这个范围内包含多少数字：

```swift
func halfOpenRangeLength(start: Int, end: Int) -> Int {
    return end - start
}
print(halfOpenRangeLength(1, 10))
// prints "9"
```

### 无参函数（Functions Without Parameters）

函数可以没有参数。下面这个函数就是一个无参函数，当被调用时，它返回固定的 `String` 消息：

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// prints "hello, world"
```

尽管这个函数没有参数，但是定义中在函数名后还是需要一对圆括号。当被调用时，也需要在函数名后写一对圆括号。

### 多参量函数 (Functions With Multiple Parameters)

函数可以有多种输入参数，这些参数被包含在函数的括号之中，以逗号分隔。

这个函数取得一个人的名字和是否被招呼作为输入，并对那个人返回适当的问候语:

```swift
func sayHello(personName: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return sayHelloAgain(personName)
    } else {
        return sayHello(personName)
    }
}
print(sayHello("Tim", alreadyGreeted: true))
// prints "Hello again, Tim!"
```

你通过在括号内传递一个`String`参数值和一个标识为`alreadyGreeted`的`Bool`值，使用逗号分隔来调用`sayHello(_:alreadyGreeted:)`函数。

当调用超过一个参数的函数时，第一个参数后的参数根据其对应的参数名称标记，函数参数命名在[函数参数名称（Function Parameter Names）](#Function_Parameter_Names)有更详细的描述。

<a name="functions_without_return_values"></a>
### 无返回值函数（Functions Without Return Values）

函数可以没有返回值。下面是 `sayHello(_:)` 函数的另一个版本，叫 `sayGoodbye(_:)`，这个函数直接输出 `String` 值，而不是返回它：

```swift
func sayGoodbye(personName: String) {
    print("Goodbye, \(personName)!")
}
sayGoodbye("Dave")
// prints "Goodbye, Dave!"
```

因为这个函数不需要返回值，所以这个函数的定义中没有返回箭头（->）和返回类型。

> 注意：
> 严格上来说，虽然没有返回值被定义，`sayGoodbye(_:)` 函数依然返回了值。没有定义返回类型的函数会返回特殊的值，叫 `Void`。它其实是一个空的元组（tuple），没有任何元素，可以写成`()`。

被调用时，一个函数的返回值可以被忽略：

```swift
func printAndCount(stringToPrint: String) -> Int {
    print(stringToPrint)
    return stringToPrint.characters.count
}
func printWithoutCounting(stringToPrint: String) {
    printAndCount(stringToPrint)
}
printAndCount("hello, world")
// prints "hello, world" and returns a value of 12
printWithoutCounting("hello, world")
// prints "hello, world" but does not return a value

```

第一个函数 `printAndCount(_:)`，输出一个字符串并返回 `Int` 类型的字符数。第二个函数 `printWithoutCounting`调用了第一个函数，但是忽略了它的返回值。当第二个函数被调用时，消息依然会由第一个函数输出，但是返回值不会被用到。

> 注意：
> 返回值可以被忽略，但定义了有返回值的函数必须返回一个值，如果在函数定义底部没有返回任何值，并且试图这样做,这将导致编译错误（compile-time error）。

### 多重返回值函数（Functions with Multiple Return Values）

你可以用元组（tuple）类型让多个值作为一个复合值从函数中返回。

下面的这个例子中，定义了一个名为`minMax(_:)`的函数，作用是在一个`Int`数组中找出最小值与最大值。

```swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

`minMax(_:)`函数返回一个包含两个`Int`值的元组，这些值被标记为`min`和`max`，以便查询函数的返回值时他们可以被访问。

`minMax(_:)`的函数体中，在开始的时候设置两个工作变量`currentMin`和`currentMax`作为数组中的第一个`Int`值。然后函数会遍历数组中剩余的值并检查该值是否比`currentMin`和`currentMax`更小或更大。最后数组中的最小值与最大值返回两个`Int`值最为一个元组。

因为元组的成员值被命名为函数的返回类型的一部分​​，可以通过点语法来访问与取回发现的最小值与最小值:

```swift
let bounds = minMax([8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
// prints "min is -6 and max is 109"
```

需要注意的是，元组的成员不需要在函数中返回时命名，因为它们的名字已经在函数返回类型中有了定义。

可选元组返回类型(Optional Tuple Return Types)

如果函数返回的元组类型中有可能在整个元组中含有“没有值”，你可以使用*可选的(Optional)* 元组返回类型反映整个元组可以是`nil`的事实。你可以通过在元组类型的右括号后放置一个问号来定义一个可选元组，例如`(Int,Int)?`或`(String,Int,Bool)?`

> 注意:
> 可选元组类型如`(Int,Int)?`与元组包含可选属性如`(Int?,Int?)`是不同的.可选的元组类型，整个数组是可选的，而不只是元组中的每个元素值。

前面的`minMax(_:)`函数返回了一个包含两个`Int`值的元组。但是函数不会在数组中执行任何安全检查，如果`array`参数有一个空数组，如上定义的`minMax(_:)`在试图访问`array[0]`时会触发一个运行时错误。

为了安全的处理这个"空数组"问题，写一个`minMax(_:)`函数使用可选元组返回类型，并且当数组为空时返回`nil`:

```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

你可以选择性的绑定当`minMax(_:)`函数返回的是一个实际的元组值还是`nil`

```swift
if let bounds = minMax([8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// prints "min is -6 and max is 109"
```

<a name="Function_Parameter_Names"></a>
## 函数参数名称（Function Parameter Names）

函数参数都有一个*外部参数名(external parameter name)*和一个*本地参数名(local parameter name)*。外部参数名用来标记传递给函数调用的参数，本地参数名在实现函数的时候使用。

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // function body goes here
    // firstParameterName and secondParameterName refer to
    // the argument values for the first and second parameters
}
someFunction(1, secondParameterName: 2)
```

一般情况下，第一个参数省略其外部参数名，第二个以后的参数使用其本地参数名作为自己的外部参数名。所有参数需要有不同的本地参数名，但可以共享相同的外部参数名。

<a name="specifying_external_parameter_names"></a>
### 指定外部参数名(Specifying External Parameter Names)

你可以在本地参数名前指定外部参数名，中间以空格分隔。

```swift
func someFunction(externalParameterName localParameterName: Int) {
    // function body goes here, and can use localParameterName
    // to refer to the argument value for that parameter
}
```

> 注意：
> 如果你提供了外部参数名，那么函数在被调用时，必须使用外部参数名。

这个版本的`sayHello(_:)`函数，得到了两个人的名字，会同时返回对他俩的问候：

```swift
func sayHello(to person: String, and anotherPerson: String) -> String {
    return "Hello \(person) and \(anotherPerson)!"
}
print(sayHello(to: "Bill", and: "Ted"))
// prints "Hello Bill and Ted!"
```

为每个参数指定外部参数名，在你调用函数`sayHello(to:and:)`函数时时两个参数都必须被标记出来。

使用外部函数名可以使得函数可以用一句话表达清楚，并且使得函数体内部可读，能表达出函数的明确意图。

### 忽略外部参数名(Omitting External Parameter Names)

如果你不想为第二个及后续的参数设置参数名，用一个下划线(`_`)代替一个明确地参数名。

```swift
func someFunction(firstParameterName: Int, _ secondParameterName: Int) {
    // function body goes here
    // firstParameterName and secondParameterName refer to
    // the argument values for the first and second parameters
}
someFunction(1, 2)
```

> 注意:
> 因为第一个参数默认忽略其外部参数名称，明确写下划线是多余的。

<a name="default_parameter_values"></a>
### 默认参数值（Default Parameter Values）

你可以在函数体中为每个参数定义`默认值(Deafult Values)`。当默认值被定义后，调用这个函数时可以忽略这个参数。

```swift
func someFunction(parameterWithDefault: Int = 12) {
    // function body goes here
    // if no arguments are passed to the function call,
    // value of parameterWithDefault is 12
}
someFunction(6) // parameterWithDefault is 6
someFunction() // parameterWithDefault is 12
```

> 注意：
> 将带有默认值的参数放在函数参数列表的最后。这样可以保证在函数调用时，非默认参数的顺序是一致的，同时使得相同的函数在不同情况下调用时显得更为清晰。

### 可变参数（Variadic Parameters）

一个`可变参数（variadic parameter）`可以接受零个或多个值。函数调用时，你可以用可变参数来传入不确定数量的输入参数。通过在变量类型名后面加入`（...）`的方式来定义可变参数。

可变参数的传入值在函数体为此类型的一个数组。例如，一个叫做 `numbers` 的 `Double...` 型可变参数，在函数体内可以当做一个叫 `numbers` 的 `[Double]` 型的数组常量。

下面的这个函数用来计算一组任意长度数字的`算术平均数(arithmetic mean)`：

```swift
func arithmeticMean(numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// returns 3.0, which is the arithmetic mean of these five numbers
arithmeticMean(3, 8.25, 18.75)
// returns 10.0, which is the arithmetic mean of these three numbers
```

> 注意：
> 一个函数最多只能有一个可变参数。

如果函数有一个或多个带默认值的参数，而且还有一个可变参数，那么把可变参数放在参数表的最后。

### 常量参数和变量参数（Constant and Variable Parameters）

函数参数默认是常量。试图在函数体中更改参数值将会导致编译错误。这意味着你不能错误地更改参数值。

但是，有时候，如果函数中有传入参数的变量值副本将是很有用的。你可以通过指定一个或多个参数为变量参数，从而避免自己在函数中定义新的变量。变量参数不是常量，你可以在函数中把它当做新的可修改副本来使用。

通过在参数名前加关键字 `var` 来定义变量参数：

```swift
func alignRight(var string: String, totalLength: Int, pad: Character) -> String {
    let amountToPad = totalLength - string.characters.count
    if amountToPad < 1 {
        return string
    }
    let padString = String(pad)
    for _ in 1...amountToPad {
        string = padString + string
    }
    return string
}
let originalString = "hello"
let paddedString = alignRight(originalString, totalLength: 10, pad: "-")
// paddedString is equal to "-----hello"
// originalString is still equal to "hello"
```

这个例子中定义了一个新的叫做 `alignRight(_:totalLength:pad:)` 的函数，用来右对齐输入的字符串到一个长的输出字符串中。左侧空余的地方用指定的填充字符填充。这个例子中，字符串`"hello"`被转换成了`"-----hello"`。

`alignRight(_:totalLength:pad:)` 函数将参数 `string` 定义为变量参数。这意味着 `string` 现在可以作为一个局部变量，用传入的字符串值初始化，并且可以在函数体中进行操作。

　函数首先找出有多少字符需要被添加到左边的字符串以右对齐在整个字符串。这个值是存储在一个本地常数称为amountToPad。如果不需要填充(也就是说,如果amountToPad小于1),该函数返回字符串没有填充的输入值。
　　
　　否则,该函数创建一个新的临时字符串常量称为padString，初始化填充字符，并将amountToPad padString副本添加到现有的左边的字符串。(一个字符串值不能被添加到一个字符值，所以padString常数用于确保双方+操作符的字符串值)。

该函数首先计算出多少个字符需要被添加到 `string` 的左边，以右对齐到总的字符串中。这个值存在局部常量 `amountToPad` 中。如果不需要填充(即，如果`amountToPad`小于`1`)，该函数返回没有填充输入的`string`。

否则，该函数会建立一个临时的String常量称为`padString`，初始化`pad`字符,并将`amountToPad`作为`padString`的副本添加到现有的字符串左边。(一个`Character`后不能直接添加一个`String`值，所以`padString`经常用于确保`+`号两边都是`String`值。)

> 注意：
> 对变量参数所进行的修改在函数调用结束后便消失了，并且对于函数体外是不可见的。变量参数仅仅存在于函数调用的生命周期中。

<a name="in_out_parameters"></a>
### 输入输出参数（In-Out Parameters）

变量参数，正如上面所述，仅仅能在函数体内被更改。如果你想要一个函数可以修改参数的值，并且想要在这些修改在函数调用结束后仍然存在，那么就应该把这个参数定义为输入输出参数（In-Out Parameters）。

定义一个输入输出参数时，在参数定义前加 `inout` 关键字。一个输入输出参数有传入函数的值，这个值被函数修改，然后被传出函数，替换原来的值。

你只能将变量作为输入输出参数。你不能传入常量或者字面量（literal value），因为这些量是不能被修改的。当传入的参数作为输入输出参数时，需要在参数前加`&`符，表示这个值可以被函数修改。

> 注意：
> 输入输出参数不能有默认值，而且可变参数不能用 `inout` 标记。如果你用 `inout` 标记一个参数，这个参数不能被 `var` 或者 `let` 标记。

下面是例子，`swapTwoInts(_:_:)` 函数，有两个分别叫做 `a` 和 `b` 的输入输出参数：

```swift
func swapTwoInts(inout a: Int, inout _ b: Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

这个 `swapTwoInts(_:_:)` 函数仅仅交换 `a` 与 `b` 的值。该函数先将 `a` 的值存到一个暂时常量 `temporaryA` 中，然后将 `b` 的值赋给 `a`，最后将 `temporaryA` 幅值给 `b`。

你可以用两个 `Int` 型的变量来调用 `swapTwoInts(_:_:)`。需要注意的是，`someInt` 和 `anotherInt` 在传入 `swapTwoInts(_:_:)` 函数前，都加了 `&` 的前缀：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// prints "someInt is now 107, and anotherInt is now 3"
```

从上面这个例子中，我们可以看到 `someInt` 和 `anotherInt` 的原始值在 `swapTwoInts(_:_:)` 函数中被修改，尽管它们的定义在函数体外。

> 注意：
> 输入输出参数和返回值是不一样的。上面的 `swapTwoInts` 函数并没有定义任何返回值，但仍然修改了 `someInt` 和 `anotherInt` 的值。输入输出参数是函数对函数体外产生影响的另一种方式。

<a name="Function_Types"></a>
## 函数类型（Function Types）

每个函数都有种特定的函数类型，由函数的参数类型和返回类型组成。

例如：

```swift
func addTwoInts(a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(a: Int, _ b: Int) -> Int {
    return a * b
}
```

这个例子中定义了两个简单的数学函数：`addTwoInts` 和 `multiplyTwoInts`。这两个函数都传入两个 `Int` 类型， 返回一个合适的`Int`值。

这两个函数的类型是 `(Int, Int) -> Int`，可以读作”这个函数类型，它有两个 `Int` 型的参数并返回一个 `Int` 型的值。”。

下面是另一个例子，一个没有参数，也没有返回值的函数：

```swift
func printHelloWorld() {
    print("hello, world")
}
```

这个函数的类型是：`() -> void`，或者叫“没有参数，并返回 `Void` 类型的函数”。

### 使用函数类型（Using Function Types）

在 Swift 中，使用函数类型就像使用其他类型一样。例如，你可以定义一个类型为函数的常量或变量，并将函数赋值给它：

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

这个可以读作：

“定义一个叫做 `mathFunction` 的变量，类型是‘一个有两个 `Int` 型的参数并返回一个 `Int` 型的值的函数’，并让这个新变量指向 `addTwoInts` 函数”。

`addTwoInts` 和 `mathFunction` 有同样的类型，所以这个赋值过程在 Swift 类型检查中是允许的。

现在，你可以用 `mathFunction` 来调用被赋值的函数了：

```swift
print("Result: \(mathFunction(2, 3))")
// prints "Result: 5"
```

有相同匹配类型的不同函数可以被赋值给同一个变量，就像非函数类型的变量一样：

```swift
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// prints "Result: 6"
```

就像其他类型一样，当赋值一个函数给常量或变量时，你可以让 Swift 来推断其函数类型：

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction is inferred to be of type (Int, Int) -> Int
```

### 函数类型作为参数类型（Function Types as Parameter Types）

你可以用`(Int, Int) -> Int`这样的函数类型作为另一个函数的参数类型。这样你可以将函数的一部分实现交由给函数的调用者。

下面是另一个例子，正如上面的函数一样，同样是输出某种数学运算结果：

```swift
func printMathResult(mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// prints "Result: 8"
```

这个例子定义了 `printMathResult(_:_:_:)` 函数，它有三个参数：第一个参数叫 `mathFunction`，类型是`(Int, Int) -> Int`，你可以传入任何这种类型的函数；第二个和第三个参数叫 `a` 和 `b`，它们的类型都是 `Int`，这两个值作为已给的函数的输入值。

当 `printMathResult(_:_:_:)` 被调用时，它被传入 `addTwoInts` 函数和整数`3`和`5`。它用传入`3`和`5`调用 `addTwoInts`，并输出结果：`8`。

`printMathResult(_:_:_:)` 函数的作用就是输出另一个合适类型的数学函数的调用结果。它不关心传入函数是如何实现的，它只关心这个传入的函数类型是正确的。这使得 `printMathResult(_:_:_:)` 可以以一种类型安全（type-safe）的方式来保证传入函数的调用是正确的。

### 函数类型作为返回类型（Function Type as Return Types）

你可以用函数类型作为另一个函数的返回类型。你需要做的是在返回箭头（`->`）后写一个完整的函数类型。

下面的这个例子中定义了两个简单函数，分别是 `stepForward` 和`stepBackward`。`stepForward` 函数返回一个比输入值大一的值。`stepBackward` 函数返回一个比输入值小一的值。这两个函数的类型都是 `(Int) -> Int`：

```swift
func stepForward(input: Int) -> Int {
    return input + 1
}
func stepBackward(input: Int) -> Int {
    return input - 1
}
```

下面这个叫做 `chooseStepFunction(_:)` 的函数，它的返回类型是 `(Int) -> Int` 的函数。`chooseStepFunction(_:)` 根据布尔值 `backwards` 来返回 `stepForward(_:)` 函数或 `stepBackward(_:)` 函数：

```swift
func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
    return backwards ? stepBackward : stepForward
}
```

你现在可以用 `chooseStepFunction(_:)` 来获得一个函数，不管是那个方向：

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

上面这个例子中计算出从 `currentValue` 逐渐接近到`0`是需要向正数走还是向负数走。`currentValue` 的初始值是`3`，这意味着 `currentValue > 0` 是真的（`true`），这将使得 `chooseStepFunction(_:)` 返回 `stepBackward(_:)` 函数。一个指向返回的函数的引用保存在了 `moveNearerToZero` 常量中。

现在，`moveNearerToZero` 指向了正确的函数，它可以被用来数到`0`：

```swift
print("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// 3...
// 2...
// 1...
// zero!

```

<a name="Nested_Functions"></a>
## 嵌套函数（Nested Functions）

这章中你所见到的所有函数都叫全局函数（global functions），它们定义在全局域中。你也可以把函数定义在别的函数体中，称作嵌套函数（nested functions）。

默认情况下，嵌套函数是对外界不可见的，但是可以被他们封闭函数（enclosing function）来调用。一个封闭函数也可以返回它的某一个嵌套函数，使得这个函数可以在其他域中被使用。

你可以用返回嵌套函数的方式重写 `chooseStepFunction(_:)` 函数：

```swift
func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backwards ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(currentValue > 0)
// moveNearerToZero now refers to the nested stepForward() function
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// -4...
// -3...
// -2...
// -1...
// zero!
```
