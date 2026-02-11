# 构造过程
设置类型中存储属性的初始值并执行一次性构造过程。

*构造过程*是使用类、结构体或枚举等实例之前的准备过程。这个过程包括为该实例的每个存储属性设置初始值，并执行任何其他必要的设置或构造过程，以确保新实例在使用前已经完成正确的构造。

你可以通过定义*构造器*来实现这个构造过程，它就像是用来创建特定类型新实例的特殊方法。与Objective-C构造器不同，Swift构造器没有返回值，它们的主要作用是确保类型的新实例在首次使用前被正确构造。

类的实例可以通过实现*析构器*来执行它释放之前自定义的清理工作。想了解析构器的更多内容，请参见 <doc:析构过程>.

## 存储属性的初始赋值

创建类和结构体的实例时，*必须*为它们所有的存储属性设置一个适当的初始值。存储属性不能处于不确定的状态。

你可以在构造器中为存储属性设置初始值，或者在定义属性时赋予默认值。以下部分将会详细介绍这两种方法。

> 注意：当你为存储属性赋予默认值，或者在构造器中设置其值时，该属性的值会被直接设置，而不会触发任何属性观察器。

### 构造器

*构造器* 被调用来创建某个特定类型的新实例。构造器在最简单的形式中就像一个没有参数的实例方法，以关键字`init` 来命名：

```swift
init() {
    // 在此处执行构造过程
}
```

<!--
  - test: `initializerSyntax`

  ```swifttest
  >> class Test {
  -> init() {
        // perform some initialization here
     }
  >> }
  ```
-->

下面例子中定义了一个用来保存华氏温度的结构体 `Fahrenheit`，它拥有一个 `Double` 类型的存储型属性 `temperature`：

```swift
struct Fahrenheit {
    var temperature: Double
    init() {
        temperature = 32.0
    }
}
var f = Fahrenheit()
print("The default temperature is \(f.temperature)° Fahrenheit")
// 打印 "The default temperature is 32.0° Fahrenheit"。
```

<!--
  - test: `fahrenheitInit`

  ```swifttest
  -> struct Fahrenheit {
        var temperature: Double
        init() {
           temperature = 32.0
        }
     }
  -> var f = Fahrenheit()
  -> print("The default temperature is \(f.temperature)° Fahrenheit")
  <- The default temperature is 32.0° Fahrenheit
  ```
-->

这个结构体只定义了一个不带形参的构造器 `init`，并在里面将存储型属性 `temperature` 的值初始化为 `32.0`（华氏温度下水的冰点）。

### 默认属性值

如上所示，你可以在构造器中设置存储属性的初始值。同样，你也可以在属性声明时为其设置默认值。

> 注意：如果一个属性总是使用相同的初始值，建议直接提供一个默认值，而不是每次都在构造器中设置值。两种方法的最终结果是一样的，但默认值使属性的初始化与其声明结合的更加紧密。它能让你的构造器更简洁、更清晰，且能够通过默认值推断属性的类型。默认值还能使你更容易利用默认构造器和构造器继承等特性，如本章后面所述。

你可以通过在声明 `temperature` 属性时提供一个默认值，将上面的 `Fahrenheit` 结构体写成如下更简单的形式：

```swift
struct Fahrenheit {
    var temperature = 32.0
}
```

<!--
  - test: `fahrenheitDefault`

  ```swifttest
  -> struct Fahrenheit {
        var temperature = 32.0
     }
  ```
-->

## 自定义构造过程

你可以自定义构造过程，比如提供输入的形参、可选属性类型或者给常量属性赋值，这些都将在后面章节中提到。

### 形参的构造过程

你可以在自定义构造过程的定义中提供*构造形参*，指定其值的类型和名字。构造形参的功能和语法与函数和方法的形参相同。

下面例子中定义了一个用来保存摄氏温度的结构体 `Celsius`。它定义了两个不同的构造器：`init(fromFahrenheit:)` 和 `init(fromKelvin:)`，二者分别通过接受不同温标下的温度值来创建新的实例：

```swift
struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
}
let boilingPointOfWater = Celsius(fromFahrenheit: 212.0)
// boilingPointOfWater.temperatureInCelsius 是 100.0
let freezingPointOfWater = Celsius(fromKelvin: 273.15)
// freezingPointOfWater.temperatureInCelsius 是 0.0
```

<!--
  - test: `initialization`

  ```swifttest
  -> struct Celsius {
        var temperatureInCelsius: Double
        init(fromFahrenheit fahrenheit: Double) {
           temperatureInCelsius = (fahrenheit - 32.0) / 1.8
        }
        init(fromKelvin kelvin: Double) {
           temperatureInCelsius = kelvin - 273.15
        }
     }
  -> let boilingPointOfWater = Celsius(fromFahrenheit: 212.0)
  /> boilingPointOfWater.temperatureInCelsius is \(boilingPointOfWater.temperatureInCelsius)
  </ boilingPointOfWater.temperatureInCelsius is 100.0
  -> let freezingPointOfWater = Celsius(fromKelvin: 273.15)
  /> freezingPointOfWater.temperatureInCelsius is \(freezingPointOfWater.temperatureInCelsius)
  </ freezingPointOfWater.temperatureInCelsius is 0.0
  ```
-->

第一个构造器只拥有一个构造形参，其实参标签为 `fromFahrenheit`，形参命名为 `fahrenheit`；第二个构造器也拥有一个构造形参，其实参标签为 `fromKelvin`，形参命名为 `kelvin`。这两个构造器都将单一的实参转换成摄氏温度值，并保存在属性 `temperatureInCelsius` 中。

<!--
  TODO: I need to provide an example of default values for initializer parameters,
  to show they can help you to get multiple initializers "for free" (after a fashion).
-->

### 形参命名和实参标签

与函数和方法形参相同，构造形参可以同时具有在构造器内部使用的形参名称和在调用构造器时使用的实参标签。

然而，构造器在括号前没有像函数和方法那样的可辨别的方法名。因此，构造器的形参名称和类型在确定应调用哪个构造器时起着至关重要的作用。正因为如此，如果你没有提供实参标签，Swift会为构造器的每个形参自动提供一个实参标签。


下面例子中的 `Color` 结构体包含了三个 `Double` 类型的常量（ `red` 、 `green`、 `blue` ）,表明颜色中红、绿、蓝成分的含量。
`Color` 提供了一个构造器，为红蓝绿提供三个合适 `Double` 类型的形参命名。`Color` 也提供了第二个构造器，它只包含名为 `white` 的 `Double` 类型的形参，它为三个颜色的属性提供相同的值。

```swift
struct Color {
    let red, green, blue: Double
    init(red: Double, green: Double, blue: Double) {
        self.red   = red
        self.green = green
        self.blue  = blue
    }
    init(white: Double) {
        red   = white
        green = white
        blue  = white
    }
}
```

<!--
  - test: `externalParameterNames, externalParameterNames-err`

  ```swifttest
  -> struct Color {
        let red, green, blue: Double
        init(red: Double, green: Double, blue: Double) {
           self.red   = red
           self.green = green
           self.blue  = blue
        }
        init(white: Double) {
           red   = white
           green = white
           blue  = white
        }
     }
  ```
-->

两种构造器都能通过为每一个构造器形参提供命名值来创建一个新的 Color 实例：

```swift
let magenta = Color(red: 1.0, green: 0.0, blue: 1.0)
let halfGray = Color(white: 0.5)
```

<!--
  - test: `externalParameterNames`

  ```swifttest
  -> let magenta = Color(red: 1.0, green: 0.0, blue: 1.0)
  -> let halfGray = Color(white: 0.5)
  >> assert(halfGray.red == 0.5)
  >> assert(halfGray.green == 0.5)
  >> assert(halfGray.blue == 0.5)
  ```
-->

> 注意: 如果不通过实参标签传值，这个构造器是没法调用的。如果构造器定义了某个实参标签，就必须使用它，忽略它将导致编译期错误：

```swift
let veryGreen = Color(0.0, 1.0, 0.0)
// 报编译期错误-需要实参标签
```

<!--
  - test: `externalParameterNames-err`

  ```swifttest
  -> let veryGreen = Color(0.0, 1.0, 0.0)
  // this reports a compile-time error - argument labels are required
  !$ error: missing argument labels 'red:green:blue:' in call
  !! let veryGreen = Color(0.0, 1.0, 0.0)
  !! ^
  !! red: green:  blue:
  ```
-->

### 不带实参标签的构造器形参

如果你不希望构造器的某个形参使用实参标签，可以使用下划线 `(_)` 来代替显式的实参标签来重写默认行为。

接下来是 <doc:形参的构造过程> 带来的扩展版本的 `Celsius`, 增加了一个构造器用于从已经是摄氏温标的 `Double` 值创建一个新的 `Celsius` 实例:

```swift
struct Celsius {
    var temperatureInCelsius: Double
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
    init(_ celsius: Double) {
        temperatureInCelsius = celsius
    }
}
let bodyTemperature = Celsius(37.0)
// bodyTemperature.temperatureInCelsius 是 37.0
```

<!--
  - test: `initializersWithoutExternalParameterNames`

  ```swifttest
  -> struct Celsius {
        var temperatureInCelsius: Double
        init(fromFahrenheit fahrenheit: Double) {
           temperatureInCelsius = (fahrenheit - 32.0) / 1.8
        }
        init(fromKelvin kelvin: Double) {
           temperatureInCelsius = kelvin - 273.15
        }
        init(_ celsius: Double) {
           temperatureInCelsius = celsius
        }
     }
  -> let bodyTemperature = Celsius(37.0)
  /> bodyTemperature.temperatureInCelsius is \(bodyTemperature.temperatureInCelsius)
  </ bodyTemperature.temperatureInCelsius is 37.0
  ```
-->

构造器调用 `Celsius(37.0)` 的意图非常明确，不需要实参标签。因此，适合使用构造器 `init(_ celsius: Double)`来通过未命名的 `Double` 值来构造 `Celsius` 。

### 可选属性类型

如果你自定义的类型有一个逻辑上允许值为空的存储型属性——无论是因为它无法在初始化时赋值，还是因为它在之后某个时机可以赋值为空——都需要将它声明为 `可选类型`。可选类型的属性将自动初始化为 `nil`，表示这个属性是特意在构造过程设置为空。

下面例子中定义了类 `SurveyQuestion`，它包含一个可选 `String` 属性 `response`：

```swift
class SurveyQuestion {
    var text: String
    var response: String?
    init(text: String) {
        self.text = text
    }
    func ask() {
        print(text)
    }
}
let cheeseQuestion = SurveyQuestion(text: "Do you like cheese?")
cheeseQuestion.ask()
// 打印 "Do you like cheese?"
cheeseQuestion.response = "Yes, I do like cheese."
```

<!--
  - test: `surveyQuestionVariable`

  ```swifttest
  -> class SurveyQuestion {
        var text: String
        var response: String?
        init(text: String) {
           self.text = text
        }
        func ask() {
           print(text)
        }
     }
  -> let cheeseQuestion = SurveyQuestion(text: "Do you like cheese?")
  -> cheeseQuestion.ask()
  <- Do you like cheese?
  -> cheeseQuestion.response = "Yes, I do like cheese."
  ```
-->

对调查问卷问题的答案，唯有提问后方能揭晓，因此 `response` 属性被声明为 `String?` 类型，即“可选的 `String` ”。当一个新的 `SurveyQuestion` 实例被初始化时，它会自动被赋予默认值 `nil`，表示“尚无字符串”。

### 构造过程中常量属性的赋值

你可以在构造过程中的任意时间点给常量属性赋值，只要在构造过程结束时将它设置成确定的值。一旦常量属性被赋值，它将永远不可更改。

<!--
  - test: `constantPropertyAssignment`

  ```swifttest
  >> struct S {
        let c: Int
        init() {
           self.c = 1
           self.c = 2
        }
     }
  !$ error: immutable value 'self.c' may only be initialized once
  !! self.c = 2
  !! ^
  !$ note: change 'let' to 'var' to make it mutable
  !! let c: Int
  !! ^~~
  !! var
  ```
-->

<!--
  - test: `constantPropertyAssignmentWithInitialValue`

  ```swifttest
  >> struct S {
        let c: Int = 0
        init() {
           self.c = 1
        }
     }
  !$ error: immutable value 'self.c' may only be initialized once
  !! self.c = 1
  !! ^
  !$ note: initial value already provided in 'let' declaration
  !! let c: Int = 0
  !! ^
  !$ note: change 'let' to 'var' to make it mutable
  !! let c: Int = 0
  !! ^~~
  !! var
  ```
-->

> 注意: 对于类的实例来说，它的常量属性只能在类的构造过程中修改，不能在子类中修改。

你可以修改上面的 `SurveyQuestion` 示例，将问题的 `text` 属性从变量属性改为常量属性，以表明一旦 `SurveyQuestion` 实例被创建，`text` 是不会改变的。即使 `text` 属性现在是一个常量，它仍然可以在类的构造器中被设置：

```swift
class SurveyQuestion {
    let text: String
    var response: String?
    init(text: String) {
        self.text = text
    }
    func ask() {
        print(text)
    }
}
let beetsQuestion = SurveyQuestion(text: "How about beets?")
beetsQuestion.ask()
// 打印 "How about beets?"
beetsQuestion.response = "I also like beets. (But not with cheese.)"
```

<!--
  - test: `surveyQuestionConstant`

  ```swifttest
  -> class SurveyQuestion {
        let text: String
        var response: String?
        init(text: String) {
           self.text = text
        }
        func ask() {
           print(text)
        }
     }
  -> let beetsQuestion = SurveyQuestion(text: "How about beets?")
  -> beetsQuestion.ask()
  <- How about beets?
  -> beetsQuestion.response = "I also like beets. (But not with cheese.)"
  ```
-->

## 默认构造器

如果结构体或类为所有属性提供了默认值，又没有提供任何自定义的构造器，那么 Swift 会给这些结构体或类提供一个默认构造器。这个默认构造器将简单地创建一个所有属性值都设置为它们默认值的实例。

<!--
  - test: `defaultInitializersForStructAndClass`

  ```swifttest
  -> struct S { var s: String = "s" }
  -> assert(S().s == "s")
  -> class A { var a: String = "a" }
  -> assert(A().a == "a")
  -> class B: A { var b: String = "b" }
  -> assert(B().a == "a")
  -> assert(B().b ==  "b")
  ```
-->

下面例子中定义了一个类 `ShoppingListItem`，它封装了购物清单中的某一物品的名字（`name`）、数量（`quantity`）和购买状态 `purchase state`：

```swift
class ShoppingListItem {
    var name: String?
    var quantity = 1
    var purchased = false
}
var item = ShoppingListItem()
```

<!--
  - test: `initialization`

  ```swifttest
  -> class ShoppingListItem {
        var name: String?
        var quantity = 1
        var purchased = false
     }
  -> var item = ShoppingListItem()
  ```
-->

由于 `ShoppingListItem` 类的所有属性都有默认值，并且它是一个没有超类的基类。因此，`ShoppingListItem` 会自动获得一个默认构造器实现，该实现会创建一个新实例，并将其所有属性设置为默认值。（`name` 属性是一个可选的 `String` 属性，因此它会自动接收一个默认值 `nil`，即使这个值没有在代码中写出。）上面的示例使用 `ShoppingListItem` 类的默认构造器来创建一个类的新实例（ `ShoppingListItem()`形式的构造语法），并将其赋值给变量 `item` 。

![](initializersExample03)

### 结构体类型的成员逐一构造器

如果结构体类型没有定义任何自定义构造器，它们会自动获得*逐一成员构造器*。与默认构造器不同，即使存储属性没有默认值，结构体也会获得逐一成员构造器。

<!--
  - test: `memberwiseInitializersDontRequireDefaultStoredPropertyValues`

  ```swifttest
  -> struct S { var int: Int; var string: String }
  -> let s = S(int: 42, string: "hello")

  -> struct SS { var int = 10; var string: String }
  -> let ss = SS(int: 42, string: "hello")
  ```
-->

成员逐一构造器是一种用于初始化新结构体实例里成员属性的快捷方法。新实例的属性的初始值可以通过名称传递给逐一成员构造器。

下面的示例定义了一个名为 `Size` 的结构体，该结构体有两个属性，分别是 `width` 和 `height`。通过赋予默认值 `0.0`，这两个属性都被推断为 `Double` 类型。

`Size` 结构体会自动获得一个 `init(width:height:)` 逐一成员构造器，你可以用它来构造一个新的 `Size` 实例：

```swift
struct Size {
    var width = 0.0, height = 0.0
}
let twoByTwo = Size(width: 2.0, height: 2.0)
```

<!--
  - test: `initialization`

  ```swifttest
  -> struct Size {
        var width = 0.0, height = 0.0
     }
  -> let twoByTwo = Size(width: 2.0, height: 2.0)
  ```
-->

When you call a memberwise initializer,
you can omit values for any properties
that have default values.
In the example above,
the `Size` structure has a default value
for both its `height` and `width` properties.
You can omit either property or both properties,
and the initializer uses the default value for anything you omit.
For example:
当你调用逐一成员构造器时，你可以省略任何具有默认值的属性。在上面的示例中，`Size` 结构体的 `height` 和 `width` 属性都有默认值。你可以省略其中一个或两个属性，构造器会使用默认值。例如：

```swift
let zeroByTwo = Size(height: 2.0)
print(zeroByTwo.width, zeroByTwo.height)
// 输出 "0.0 2.0"。

let zeroByZero = Size()
print(zeroByZero.width, zeroByZero.height)
// Prints "0.0 0.0".
```

<!--
  - test: `initialization`

  ```swifttest
  -> let zeroByTwo = Size(height: 2.0)
  -> print(zeroByTwo.width, zeroByTwo.height)
  <- 0.0 2.0

  -> let zeroByZero = Size()
  -> print(zeroByZero.width, zeroByZero.height)
  <- 0.0 0.0
  ```
-->

## 值类型的构造器代理

构造器可以调用其他构造器来完成实例的部分构造过程。这个过程被称为*构造器代理*，它避免了在多个构造器中重复代码。

构造器代理的实现规则和形式在值类型和类类型中有所不同。值类型（结构体和枚举类型）不支持继承，所以构造器代理的过程相对简单，因为它们只能代理给自己的其它构造器。
然而，类不一样，它可以继承自其他类（请参考<doc:继承>）。这意味着类有责任保证其所有继承的存储型属性在构造时也能正确的初始化。这些责任将在后续章节<doc:类的继承和构造过程>中介绍。

对于值类型，你可以使用 `self.init` 在自定义的构造器中引用相同值类型的构造器。并且，你只能在构造器内部调用 `self.init` 。

请注意，如果你为某个值类型定义了一个自定义构造器，你将无法访问到默认构造器（如果是结构体，还将无法访问逐一成员构造器）。这种限制避免了在一个更复杂的构造器中做了额外的重要设置，但有人不小心使用自动生成的构造器而导致错误的情况。

> 注意: 如果你希望默认构造器、逐一成员构造器以及你自己的自定义构造器都能用来创建实例，可以将自定义的构造器写到扩展（extension）中，而不是写在值类型的原始定义中。想查看更多内容，请查看<doc:Extensions>.

下面的示例中定义了一个自定义结构体 `Rect` ，用来代表几何矩形。这个示例需要两个辅助的结构体 `Size` 和 `Point` ，它们各自为其所有的属性提供了默认值 `0.0` .

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
```

<!--
  - test: `valueDelegation`

  ```swifttest
  -> struct Size {
        var width = 0.0, height = 0.0
     }
  -> struct Point {
        var x = 0.0, y = 0.0
     }
  ```
-->

你可以通过三种方式为 `Rect` 创建实例 (1)使用含有默认值 `origin` 和 `size` 属性来初始化；(2)提供指定的 `origin` 和 `size` 实例来初始化；(3)提供指定的 `center` 和 `size` 来初始化。在下面 `Rect` 结构体定义中，我们为这三种方法提供了三个自定义的构造器:

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

<!--
  - test: `valueDelegation`

  ```swifttest
  -> struct Rect {
        var origin = Point()
        var size = Size()
        init() {}
        init(origin: Point, size: Size) {
           self.origin = origin
           self.size = size
        }
        init(center: Point, size: Size) {
           let originX = center.x - (size.width / 2)
           let originY = center.y - (size.height / 2)
           self.init(origin: Point(x: originX, y: originY), size: size)
        }
     }
  ```
-->

第一个 `Rect` 构造器 `init()` ，在功能上跟没有自定义构造器时自动获得的默认构造器是一样的。这个构造器的函数是空的，使用一对大括号 `{}` 来表示。
调用这个构造器将返回一个 `Rect` 实例，它的`origin` 和 `size` 属性都使用定义时的默认值 `Point(x: 0.0, y: 0.0)` 和 `Size(width: 0.0, height: 0.0)` :

```swift
let basicRect = Rect()
// basicRect 的 origin 是 (0.0, 0.0) ， size 是 (0.0, 0.0)
```

<!--
  - test: `valueDelegation`

  ```swifttest
  -> let basicRect = Rect()
  /> basicRect's origin is (\(basicRect.origin.x), \(basicRect.origin.y)) and its size is (\(basicRect.size.width), \(basicRect.size.height))
  </ basicRect's origin is (0.0, 0.0) and its size is (0.0, 0.0)
  ```
-->

第二个 `Rect` 构造器  `init(origin:size:)` ，在功能上跟结构体在没有自定义构造器时获得的逐一成员构造器是一样的。这个构造器只是简单地将 `origin` 和 `size` 的实参值赋给对应的存储类型:

```swift
let originRect = Rect(origin: Point(x: 2.0, y: 2.0),
    size: Size(width: 5.0, height: 5.0))
// originRect 的 origin 是 (2.0, 2.0)，size 是 (5.0, 5.0)
```

<!--
  - test: `valueDelegation`

  ```swifttest
  -> let originRect = Rect(origin: Point(x: 2.0, y: 2.0),
        size: Size(width: 5.0, height: 5.0))
  /> originRect's origin is (\(originRect.origin.x), \(originRect.origin.y)) and its size is (\(originRect.size.width), \(originRect.size.height))
  </ originRect's origin is (2.0, 2.0) and its size is (5.0, 5.0)
  ```
-->

第三个 `Rect` 构造器  `init(center:size:)` 要稍微更复杂一点。它先通过 `center` 和 `size` 的值计算出 `origin` 的坐标，然后再调用（或者说 *代理* 给） `init(origin:size:)` 构造器来将新的 `origin` 和 `size` 值赋值到对应的属性中：

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
// centerRect 的 origin 是 (2.5, 2.5)，size 是 (3.0, 3.0)
```

<!--
  - test: `valueDelegation`

  ```swifttest
  -> let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
        size: Size(width: 3.0, height: 3.0))
  /> centerRect's origin is (\(centerRect.origin.x), \(centerRect.origin.y)) and its size is (\(centerRect.size.width), \(centerRect.size.height))
  </ centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)
  ```
-->

构造器 init(center:size:)` 可以直接将 `origin` 和 `size` 的新值赋值到对应的属性中。然而，构造器 `init(center:size:)` 通过使用提供了相关功能的现有构造器将会更加便捷（而且意图更清晰）。

> 注意: 如果你想使用另一种不需要自己定义的 `init()` and `init(origin:size:)` 构造器的方式来实现这个例子, 请参考 <doc:Extensions>.

## 类的继承和构造过程

类里面的所有存储型属性———包括所有继承自父类的属性——都必须在构造过程中设置初始值。

Swift 为类类型提供了两种构造器来确保实例中所有存储型属性都能获得初始值，它们被称为指定构造器和便利构造器。

### 指定构造器和便利构造器

*指定构造器* 是类中最主要的构造器。一个指定构造器将初始化类中提供的所有属性，并调用合适的父类构造器让构造过程沿着父类链继续往上进行。

类倾向于拥有极少的指定构造器，普遍的是一个类只拥有一个指定构造器。指定构造器像一个个“漏斗”放在构造过程发生的地方，让构造过程沿着父类链继续往上进行。

每一个类都必须至少拥有一个指定构造器。在某些情况下，许多类通过继承了父类中的指定构造器而满足了这个条件。具体内容请参考后续章节<doc:Initialization#构造器的自动继承>。

*便利构造器* 是类中比较次要的、辅助型的构造器。你可以定义便利构造器来调用同一个类中的指定构造器，并为部分形参提供默认值。你也可以定义便利构造器来创建一个特殊用途或特定输入值的实例。

你应当只在必要的时候为类提供便利构造器，比方说某种情况下通过使用便利构造器来快捷调用某个指定构造器，能够节省更多开发时间并让类的构造过程更清晰明了。

### 指定构造器和便利构造器的语法

类的指定构造器的写法跟值类型简单构造器一样:

```swift
init(<#parameters#>) {
   <#statements#>
}
```

便利构造器也采用相同样式的写法，但需要在 `init` 关键字之前放置 `convenience` 关键字，并使用空格将其分开:

```swift
convenience init(<#parameters#>) {
   <#statements#>
}
```

### 类类型的构造器代理

为了简化指定构造器和便利构造器之间的调用关系，Swift 构造器之间的代理调用遵循以下三条规则:

- term **规则 1**:
  指定构造器必须调用其直接父类的的指定构造器。

- term **规则 2**:
  便利构造器必须调用 *相同* 类中定义的其它构造器.

- term **规则 3**:
  便利构造器最后必须调用指定构造器。

一个更方便记忆的方法是:

- 指定构造器必须总是 *向上* 代理
- 便利构造器必须总是 *横向* 代理

这些规则可以通过下面图例来说明:

![](initializerDelegation01)

如图所示，父类中包含一个指定构造器和两个便利构造器。其中一个便利构造器调用了另外一个便利构造器，而后者又调用了唯一的指定构造器。这满足了上面提到的规则 2 和 3。这个父类没有自己的父类，所以规则 1 没有用到。

子类中包含两个指定构造器和一个便利构造器。便利构造器必须调用两个指定构造器中的任意一个，因为它只能调用同一个类里的其他构造器。这满足了上面提到的规则 2 和 3。而两个指定构造器必须调用父类中唯一的指定构造器，这满足了规则 1。

> 注意: 这些规则不会影响类的实例如何 *创建* 。任何上图中展示的构造器都可以用来创建完全初始化的实例。这些规则只影响类的构造器如何实现。

下面图例中展示了一种涉及四个类的更复杂的类层级结构。它演示了指定构造器是如何在类层级中充当“漏斗”的作用，在类的构造器链上简化了类之间的相互关系。

![](initializerDelegation02)

### 两段式构造过程

Swift 中类的构造过程包含两个阶段。第一个阶段，类中的每个存储型属性赋一个初始值。当每个存储型属性的初始值被赋值后，第二阶段开始，它给每个类一次机会，在新实例准备使用之前进一步自定义它们的存储型属性。

两段式构造过程的使用让构造过程更安全，同时在整个类层级结构中给予了每个类完全的灵活性。两段式构造过程可以防止属性值在初始化之前被访问，也可以防止属性被另外一个构造器意外地赋予不同的值。

> 注意: Swift 的两段式构造过程跟 Objective-C 中的构造过程类似。最主要的区别在于阶段 1，Objective-C 给每一个属性赋值零或空值(比如说 `0` 或 `nil`)。
> Swift 的构造流程则更加灵活，它允许你设置定制的初始值，并自如应对某些属性不能以 `0` 或 `nil` 作为合法默认值的情况。

Swift 编译器将执行 4 种有效的安全检查，以确保两段式构造过程不出错地完成：

- term **安全检查 1**:
  指定构造器必须保证它所在类的所有属性都初始化完成，之后才能将其它构造任务向上代理给父类中的构造器。

如上所述，一个对象的内存只有在其所有存储型属性确定之后才能完全初始化。为了满足这一规则，指定构造器必须保证它所在类的属性在它往上代理之前先完成初始化。

- term **安全检查 2**:
  指定构造器必须在为继承的属性设置新值之前向上代理调用父类构造器。如果没这么做，指定构造器赋予的新值将被父类中的构造器所覆盖。

- term **安全检查 3**:
  便利构造器必须为任意属性（包括所有同类中定义的）赋新值之前代理调用其它构造器。如果没这么做，便利构造器赋予的新值将被该类的指定构造器所覆盖。

- term **安全检查 4**:
  构造器在第一阶段构造完成之前，不能调用任何实例方法，不能读取任何实例属性的值，不能引用 `self` 作为一个值。

类的实例在第一阶段结束以前并不是完全有效的。只有第一阶段完成后，类的实例才是有效的，才能访问属性和调用方法。

以下是基于上述安全检查的两段式构造过程展示：

**阶段 1**

- 类的某个指定构造器或便利构造器被调用.
- 完成类的新实例内存的分配，但此时内存还没有被初始化.
- 指定构造器确保其所在类引入的所有存储型属性都已赋初值。存储型属性所属的内存完成初始化。
- 指定构造器切换到父类的构造器，对其存储属性完成相同的任务。
- 这个过程沿着类的继承链一直往上执行，直到到达继承链的最顶部。
- 当到达了继承链最顶部，而且继承链的最后一个类已确保所有的存储型属性都已经赋值，这个实例的内存被认为已经完全初始化。此时阶段 1 完成。

**阶段 2**

- 从继承链顶部往下，继承链中每个类的指定构造器都有机会进一步自定义实例。构造器此时可以访问 `self` 、修改它的属性并调用实例方法等等。
- 最终，继承链中任意的便利构造器有机会自定义实例和使用 `self`.

下图展示了在假定的子类和父类之间的构造阶段 1:

![](twoPhaseInitialization01)

在这个示例中，构造过程从对子类中一个便利构造器的调用开始。这个便利构造器此时还不能修改任何属性，它会代理到该类中的指定构造器。

如安全检查 1 所示，指定构造器将确保所有子类的属性都有值。然后它将调用父类的指定构造器，并沿着继承链一直往上完成父类的构造过程。

父类中的指定构造器确保所有父类的属性都有值。由于没有更多的父类需要初始化，也就无需继续向上代理。

一旦父类中所有属性都有了初始值，实例的内存被认为是完全初始化，阶段 1 完成。

以下展示了相同构造过程的阶段 2：

![](twoPhaseInitialization02)

父类中的指定构造器现在有机会进一步自定义实例（尽管这不是必须的）。

一旦父类中的指定构造器完成调用，子类中的指定构造器可以执行更多的自定义操作（这也不是必须的）。

最终，一旦子类的指定构造器完成调用，最开始被调用的便利构造器可以执行更多的自定义操作。

### 构造器的继承和重写

跟 Objective-C 中的子类不同，Swift 中的子类默认情况下不会继承父类的构造器。Swift 的这种机制可以防止一个父类的简单构造器被一个更精细的子类继承，而在用来创建子类的新实例时没有完全或错误被初始化。

> 注意: 父类的构造器仅会在安全和适当的某些情况下 *被* 继承。具体内容请参考后续章节 <doc:构造器的自动继承> .

假如你希望自定义的子类中能提供一个或多个跟父类相同的构造器，你可以在子类中提供这些构造器的自定义实现。

当你在编写一个和父类中指定构造器相匹配的子类构造器时，你实际上是在重写父类的这个指定构造器。因此，你必须在定义子类构造器时带上 `override` 修饰符。即使你重写的是系统自动提供的默认构造器，也需要带上 `override` 修饰符，具体内容请参考<doc:默认构造器>.

正如重写属性，方法或者是下标，`override` 修饰符会让编译器去检查父类中是否有相匹配的指定构造器，并验证构造器参数是否按预想中被指定。

> 注意: 当你重写一个父类的指定构造器时，你总是需要写 `override` 修饰符，即使是为了实现子类的便利构造器。

<!--
  - test: `youHaveToWriteOverrideWhenOverridingADesignatedInitializer`

  ```swifttest
  -> class C {
        init() {}
     }
  -> class D1: C {
        // this is correct
        override init() {}
     }
  -> class D2: C {
        // this isn't correct
        init() {}
     }
  !$ error: overriding declaration requires an 'override' keyword
  !! init() {}
  !! ^
  !! override
  !$ note: overridden declaration is here
  !! init() {}
  !! ^
  ```
-->

<!--
  - test: `youHaveToWriteOverrideEvenWhenOverridingADefaultInitializer`

  ```swifttest
  -> class C {
        var i = 0
     }
  -> class D1: C {
        // this is correct
        override init() {}
     }
  -> class D2: C {
        // this isn't correct
        init() {}
     }
  !$ error: overriding declaration requires an 'override' keyword
  !! init() {}
  !! ^
  !! override
  !$ note: overridden declaration is here
  !! class C {
  !! ^
  ```
-->

相反，如果你编写了一个和父类便利构造器相匹配的子类构造器，由于子类不能直接调用父类的便利构造器（每个规则都在上文<doc:类的构造器代理规则>有所描述）。
因此，严格意义上来讲，你的子类并未对一个父类构造器提供重写。最后的结果就是，你在子类中“重写”一个父类便利构造器时，不需要加 `override` 修饰符。

<!--
  - test: `youDoNotAndCannotWriteOverrideWhenOverridingAConvenienceInitializer`

  ```swifttest
  -> class C {
        var i: Int
        init(someInt: Int) {
           i = someInt
        }
        convenience init() {
           self.init(someInt: 42)
        }
     }
  -> class D1: C {
        // override for designated, so needs the override modifier
        override init(someInt: Int) {
           super.init(someInt: someInt)
        }
        // not technically an override, so doesn't need the override modifier
        convenience init() {
           self.init(someInt: 42)
        }
     }
  -> class D2: C {
        // override for designated, so needs the override modifier
        override init(someInt: Int) {
           super.init(someInt: someInt)
        }
        // this isn't correct - "override" isn't required
        override convenience init() {
           self.init(someInt: 42)
        }
     }
  !$ error: initializer does not override a designated initializer from its superclass
  !! override convenience init() {
  !! ~~~~~~~~             ^
  !$ note: attempt to override convenience initializer here
  !! convenience init() {
  !! ^
  ```
-->

在下面的例子中定义了一个叫 `Vehicle` 的基类。基类中声明了一个存储型属性 `numberOfWheels` ，它是默认值为 `Int` 类型的 `0` 。 `numberOfWheels` 属性用在一个描述车辆特征 `String` 类型为 `description` 的计算型属性中:

```swift
class Vehicle {
    var numberOfWheels = 0
    var description: String {
        return "\(numberOfWheels) wheel(s)"
    }
}
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> class Vehicle {
        var numberOfWheels = 0
        var description: String {
           return "\(numberOfWheels) wheel(s)"
        }
     }
  ```
-->

`Vehicle` 类只为存储型属性提供默认值，也没有提供自定义构造器。因此，它会自动获得一个默认构造器，具体内容请参考<doc:默认构造器>。默认构造器（如果有的话）总是类中的指定构造器，可以用于创建 `numberOfWheels` 为 `0` 的 `Vehicle` 实例:

```swift
let vehicle = Vehicle()
print("Vehicle: \(vehicle.description)")
// Vehicle: 0 wheel(s)
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> let vehicle = Vehicle()
  -> print("Vehicle: \(vehicle.description)")
  </ Vehicle: 0 wheel(s)
  ```
-->

下面例子中定义了一个 `Vehicle` 的子类 `Bicycle`:

```swift
class Bicycle: Vehicle {
    override init() {
        super.init()
        numberOfWheels = 2
    }
}
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> class Bicycle: Vehicle {
        override init() {
           super.init()
           numberOfWheels = 2
        }
     }
  ```
-->

子类 `Bicycle` 定义了一个自定义指定构造器 `init()`。这个指定构造器和父类的指定构造器相匹配，所以 `Bicycle` 中这个版本的构造器需要带上 `override` 修饰符。

`Bicycle` 的构造器 `init()` 以调用 `super.init()` 方法开始，这个方法的作用是调用 `Bicycle` 的父类 `Vehicle` 的默认构造器。这样可以确保 `Bicycle` 在修改属性之前，它所继承的属性 `numberOfWheels` 能被 `Vehicle` 类初始化。在调用 `super.init()` 之后，属性 `numberOfWheels` 的原值被新值 `2` 替换。


如果你创建一个 `Bicycle` 实例, 你可以调用继承的 `description` 计算型属性去查看属性 `numberOfWheels` 是否有改变:

```swift
let bicycle = Bicycle()
print("Bicycle: \(bicycle.description)")
// Bicycle: 2 wheel(s)
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> let bicycle = Bicycle()
  -> print("Bicycle: \(bicycle.description)")
  </ Bicycle: 2 wheel(s)
  ```
-->

如果子类的构造器没有在阶段 2 过程中做自定义操作，并且父类有一个同步、无参数的指定构造器，你可以在所有子类的存储属性赋值之后省略 `super.init()` 的调用。若父类的构造器是异步的，你就需要明确地写入 `await super.init()` 。

这个例子定义了另一个 `Vehicle` 的子类 `Hoverboard` ，只设置它的 `color` 属性。这个构造器依赖隐式调用父类的构造器来完成，而不是显式调用 `super.init()` 。

```swift
class Hoverboard: Vehicle {
    var color: String
    init(color: String) {
        self.color = color
        // super.init() 在这里被隐式调用
    }
    override var description: String {
        return "\(super.description) in a beautiful \(color)"
    }
}
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> class Hoverboard: Vehicle {
         var color: String
         init(color: String) {
             self.color = color
             // super.init() implicitly called here
         }
         override var description: String {
             return "\(super.description) in a beautiful \(color)"
         }
     }
  ```
-->

`Hoverboard` 的实例用 `Vehicle` 构造器里默认的轮子数量。

```swift
let hoverboard = Hoverboard(color: "silver")
print("Hoverboard: \(hoverboard.description)")
// Hoverboard: 0 wheel(s) 以美丽的银色
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> let hoverboard = Hoverboard(color: "silver")
  -> print("Hoverboard: \(hoverboard.description)")
  </ Hoverboard: 0 wheel(s) in a beautiful silver
  ```
-->

> 注意: 子类可以在构造过程修改继承来的变量属性，但是不能修改继承来的常量属性。

<!--
  - test: `youCantModifyInheritedConstantPropertiesFromASuperclass`

  ```swifttest
  -> class C {
        let constantProperty: Int
        var variableProperty: Int
        init() {
           // this is fine - a class can set its own constant and variable properties during init
           constantProperty = 0
           variableProperty = 0
        }
     }
  -> class D1: C {
        override init() {
           // this is fine - a subclass can set its superclass's variable properties during init
           super.init()
           variableProperty = 0
        }
     }
  -> class D2: C {
        override init() {
           // this is wrong - a subclass can't set its superclass's constant properties during init
           super.init()
           constantProperty = 0
        }
     }
  !$ error: cannot assign to property: 'constantProperty' is a 'let' constant
  !! constantProperty = 0
  !! ^~~~~~~~~~~~~~~~
  !$ note: change 'let' to 'var' to make it mutable
  !! let constantProperty: Int
  !! ^~~
  !! var
  ```
-->

### 构造器的自动继承

如上所述，子类在默认情况下不会继承父类的构造器。但是如果满足特定条件，父类构造器是可以 *被* 自动继承的。事实上，这意味着对于许多常见场景你不必重写父类的构造器，并且可以在安全的情况下以最小的代价继承父类的构造器。

假设你为子类中引入的所有新属性都提供了默认值，以下 2 个规则将适用:

- term *规则 1**:
  如果子类没有定义任何指定构造器，它将自动继承父类所有的指定构造器。

- term **规则 2**:
  如果子类提供了 *所有* 父类指定构造器的实现——无论是通过规则 1 继承过来的，还是提供了自定义实现——它将自动继承父类所有的便利构造器。

即使你在子类中添加了更多的便利构造器，这两条规则仍然适用。

> 注意: 子类可以将父类的指定构造器实现为便利构造器来满足规则 2。

<!--
  TODO: feedback from Beto is that this note is a little hard to parse.
  Perhaps this point should be left until the later "in action" example,
  where this principle is demonstrated?
-->

<!--
  TODO: There are rare cases in which we automatically insert a call to super.init() for you.
  When is this? Either way, I need to mention it in here.
-->

### 指定构造器和便利构造器实践

接下来的例子将在实践中展示指定构造器、便利构造器以及构造器的自动继承。这个例子定义了包含三个类 `Food`, `RecipeIngredient`, 以及 `ShoppingListItem` 的层级结构，并将演示它们的构造器是如何相互作用的。 

类层次中的基类是 `Food` ，它是一个简单的用来封装食物名字的类。 `Food` 类引入了一个叫做 `name` 的 `String` 类型的属性，并且提供了两个构造器来创建 `Food` 实例:

```swift
class Food {
    var name: String
    init(name: String) {
        self.name = name
    }
    convenience init() {
        self.init(name: "[Unnamed]")
    }
}
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> class Food {
        var name: String
        init(name: String) {
           self.name = name
        }
        convenience init() {
           self.init(name: "[Unnamed]")
        }
     }
  ```
-->

下图展示了 `Food` 的构造链路:

![](initializersExample01)

类类型没有默认的逐一成员构造器，所以 `Food` 类提供了一个接受单一参数 `name` 的指定构造器。这个构造器可以使用一个特定的名字来创建新的 `Food` 实例:

```swift
let namedMeat = Food(name: "Bacon")
// namedMeat 的名字是 "Bacon"
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> let namedMeat = Food(name: "Bacon")
  /> namedMeat's name is \"\(namedMeat.name)\"
  </ namedMeat's name is "Bacon"
  ```
-->

`Food` 类中的构造器 `init(name: String)` 被定义为一个 *指定* 构造器，因为它能确保 `Food` 实例的所有存储型属性都被初始化。 `Food` 类没有父类，所以 `init(name: String)` 构造器不需要调用 `super.init()` 来完成构造过程。

`Food` 类样提供了一个没有参数的便利构造器 `init()` 。这个 `init()` 构造器为新食物提供了一个默认的占位名字，通过横向代理到指定构造器 `init(name: String)` 并给参数 `name` 赋值为 `[Unnamed]` 来实现:

```swift
let mysteryMeat = Food()
// mysteryMeat 的名字是 "[Unnamed]"
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> let mysteryMeat = Food()
  /> mysteryMeat's name is \"\(mysteryMeat.name)\"
  </ mysteryMeat's name is "[Unnamed]"
  ```
-->

层级中的第二个类是 `Food` 的子类 `RecipeIngredient` 。 `RecipeIngredient` 类用来表示食谱中的一项原料。它引入了 `Int` 类型的属性 `quantity` (以及从 `Food` 继承过来的 `name` 属性)，并且定义了两个构造器来创建 `RecipeIngredient` 实例:

```swift
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    override convenience init(name: String) {
        self.init(name: name, quantity: 1)
    }
}
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> class RecipeIngredient: Food {
        var quantity: Int
        init(name: String, quantity: Int) {
           self.quantity = quantity
           super.init(name: name)
        }
        override convenience init(name: String) {
           self.init(name: name, quantity: 1)
        }
     }
  ```
-->

下图中展示了 `RecipeIngredient` 类的构造器链:

![](initializersExample02)

`RecipeIngredient` 类拥有一个指定构造器 `init(name: String, quantity: Int)`, 它可以用来填充 `RecipeIngredient` 的所有属性值。 这个构造器一开始先将传入的 `quantity` 实参赋值给 `quantity` 属性，这个属性也是唯一在 `RecipeIngredient` 中新引入的属性。随后，构造器向上代理到父类 `Food` 的 `init(name: String)` 。这个过程满足 <doc:两段式构造过程> 中的安全检查 1。

`RecipeIngredient` 也定义了一个便利构造器 `init(name: String)` ，它只通过 `name` 来创建 `RecipeIngredient` 的实例。这个便利构造器假设任意 `RecipeIngredient` 实例的 `quantity` 为 `1` ，所以不需要显式的质量即可创建出实例。这个便利构造器的定义可以更加方便和快捷地创建实例，并且避免了创建多个 `quantity` 为 `1` 的 `RecipeIngredient` 实例时的代码重复。这个便利构造器只是简单地横向代理到类中的指定构造器，并为 `quantity` 参数传递 `1` 。

`RecipeIngredient` 的便利构造器 `init(name: String)` 使用了跟 `Food` 中指定构造器 `init(name: String)` 相同的形参。由于这个便利构造器重写了父类的指定构造器 `init(name: String)` ， 因此必须在前面使用 `override` 修饰符(参见<doc:构造器的继承和重写>)

尽管 `RecipeIngredient` 将父类的指定构造器重写为了便利构造器，但是它依然提供了父类的所有指定构造器的实现。因此，`RecipeIngredient` 会自动继承父类的所有便利构造器。

在这个示例中， `RecipeIngredient` 的父类是 `Food`,它有一个便利构造器 `init()`。这个便利构造器会被 `RecipeIngredient` 继承。这个继承版本的 `init()` 在功能上跟 `Food` 提供的版本是一样的,只是它会代理到 `RecipeIngredient` 版本的 `init(name: String)` 而不是 `Food` 提供的版本.

所有的这三种构造器都可以用来创建新的 `RecipeIngredient` 实例:

```swift
let oneMysteryItem = RecipeIngredient()
let oneBacon = RecipeIngredient(name: "Bacon")
let sixEggs = RecipeIngredient(name: "Eggs", quantity: 6)
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> let oneMysteryItem = RecipeIngredient()
  -> let oneBacon = RecipeIngredient(name: "Bacon")
  -> let sixEggs = RecipeIngredient(name: "Eggs", quantity: 6)
  ```
-->

类层级中第三个也是最后一个类 `ShoppingListItem` 是 `RecipeIngredient` 的子类。它构建了购物单中出现的某一种食谱原料。

购物单中的每一项总是从未购买状态开始的。为了呈现这一事实， `ShoppingListItem` 引入了一个 Boolean（布尔类型）的属性 `purchased` ，它的默认值是 `false` 。 `ShoppingListItem` 还添加了一个计算型属性 `description` ， 它提供了关于 `ShoppingListItem` 实例的一些文字描述:

```swift
class ShoppingListItem: RecipeIngredient {
    var purchased = false
    var description: String {
        var output = "\(quantity) x \(name)"
        output += purchased ? " ✔" : " ✘"
        return output
    }
}
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> class ShoppingListItem: RecipeIngredient {
        var purchased = false
        var description: String {
           var output = "\(quantity) x \(name)"
           output += purchased ? " ✔" : " ✘"
           return output
        }
     }
  ```
-->

> 注意: `ShoppingListItem` 没有定义构造器来为 `purchased` 提供初始值，因为添加到购物单的物品的初始状态总是未购买。


因为它为自己引入的所有属性都提供了默认值，并且自己没有定义任何构造器，  `ShoppingListItem` 将自动继承 *所有* 父类中的指定构造器和便利构造器。

下图展示了这三个类的构造器链:

![](initializersExample03)

你可以使用三个继承来的构造器来创建 `ShoppingListItem` 的新实例:

```swift
var breakfastList = [
    ShoppingListItem(),
    ShoppingListItem(name: "Bacon"),
    ShoppingListItem(name: "Eggs", quantity: 6),
]
breakfastList[0].name = "Orange juice"
breakfastList[0].purchased = true
for item in breakfastList {
    print(item.description)
}
// 1 x Orange juice ✔
// 1 x Bacon ✘
// 6 x Eggs ✘
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> var breakfastList = [
        ShoppingListItem(),
        ShoppingListItem(name: "Bacon"),
        ShoppingListItem(name: "Eggs", quantity: 6),
     ]
  -> breakfastList[0].name = "Orange juice"
  -> breakfastList[0].purchased = true
  -> for item in breakfastList {
        print(item.description)
     }
  </ 1 x Orange juice ✔
  </ 1 x Bacon ✘
  </ 6 x Eggs ✘
  ```
-->

如上所述，例子中通过字面量方式创建了一个数组 `breakfastList` ，它包含了三个 `ShoppingListItem` 实例，因此数组的类型也能被自动推导为 `[ShoppingListItem]` 。 在数组创建完之后，数组中第一个 `ShoppingListItem` 实例的名字从 `"[Unnamed]"` 更改为 `"Orange juice"` ，并标记状态为已购买。打印数组中每个元素的描述显示了它们都已按照预期被赋值。

<!--
  TODO: talk about the general factory initializer pattern,
  and how Swift's approach to initialization removes the need for most factories.
-->

<!--
  NOTE: We import some Obj-C-imported factory initializers as init() -> MyType,
  but you can't currently write these in Swift yourself.
  After conferring with Doug, I've decided not to include these in the Guide
  if you can't write them yourself in pure Swift.
-->

<!--
  TODO: Feedback from Beto is that it would be useful to indicate the flow
  through these inherited initializers.
-->

## 可失败构造器

有时，定义一个构造器可失败的类，结构体或者枚举是很有用的。这里的“失败” 指的是，如给构造器传入无效的形参，或缺少某种所需的外部资源，又或是不满足某种必要的条件等。

为了妥善处理这种构造过程中可能会失败的情况。你可以在一个类，结构体或是枚举类型的定义中，添加一个或多个可失败构造器。其语法为在 `init` 关键字后面添加问号 (`init?`) 。

> 注意: 可失败构造器的参数名和参数类型，不能与其它非可失败构造器的参数名，及其参数类型相同。

<!--
  - test: `failableAndNonFailableInitializersCannotMatch`

  ```swifttest
  -> struct S {
        let s: String
        init(s: String) { self.s = s }
        init?(s: String) { self.s = s }
     }
  !$ error: invalid redeclaration of 'init(s:)'
  !!            init?(s: String) { self.s = s }
  !!            ^
  !$ note: 'init(s:)' previously declared here
  !!            init(s: String) { self.s = s }
  !!            ^
  ```
-->

可失败构造器会创建一个类型为自身类型的 *可选* 类型的对象。你通过 `return nil` 语句来表明可失败构造器在何种情况下应该 “失败”。

> 注意: 严格来说，构造器都不支持返回值。因为构造器本身的作用，只是为了确保对象能被正确构造。因此你只是用 `return nil` 表明可失败构造器构造失败，而不要用关键字 `return` 来表明构造成功。

例如，实现针对数字类型转换的可失败构造器。确保数字类型之间的转换能保持精确的值，使用这个 `init(exactly:)` 构造器。如果类型转换不能保持值不变，则这个构造器构造失败。

```swift
let wholeNumber: Double = 12345.0
let pi = 3.14159

if let valueMaintained = Int(exactly: wholeNumber) {
    print("\(wholeNumber) conversion to Int maintains value of \(valueMaintained)")
}
// 打印 "12345.0 conversion to Int maintains value of 12345"。

let valueChanged = Int(exactly: pi)
// valueChanged 是 Int? 类型，不是 Int 类型

if valueChanged == nil {
    print("\(pi) conversion to Int doesn't maintain value")
}
// 打印 "3.14159 conversion to Int doesn't maintain value"。
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let wholeNumber: Double = 12345.0
  -> let pi = 3.14159

  -> if let valueMaintained = Int(exactly: wholeNumber) {
         print("\(wholeNumber) conversion to Int maintains value of \(valueMaintained)")
     }
  <- 12345.0 conversion to Int maintains value of 12345

  -> let valueChanged = Int(exactly: pi)
  // valueChanged is of type Int?, not Int

  -> if valueChanged == nil {
         print("\(pi) conversion to Int doesn't maintain value")
     }
  <- 3.14159 conversion to Int doesn't maintain value
  ```
-->

下面示例中，定义一个名为 `Animal` 的结构体，其中有一个名为 `species` 的 `String` 类型的常量属性。同时该结构体还定义了一个接受一个名为 `species` 的 `String` 类型形参的可失败构造器。这个可失败构造器检查传入的 `species` 值是否为一个空字符串。如果为空字符串，则构造失败。否则， `species` 属性被赋值，构造成功。  


```swift
struct Animal {
    let species: String
    init?(species: String) {
        if species.isEmpty { return nil }
        self.species = species
    }
}
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> struct Animal {
        let species: String
        init?(species: String) {
           if species.isEmpty { return nil }
           self.species = species
        }
     }
  ```
-->

你可以通过该可失败构造器来尝试构建一个 `Animal` 的实例，并检查构造过程是否成功:

```swift
let someCreature = Animal(species: "Giraffe")
// someCreature 的类型是 Animal?, 而不是 Animal

if let giraffe = someCreature {
    print("An animal was initialized with a species of \(giraffe.species)")
}
// 打印 "An animal was initialized with a species of Giraffe"。
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let someCreature = Animal(species: "Giraffe")
  // someCreature is of type Animal?, not Animal

  -> if let giraffe = someCreature {
        print("An animal was initialized with a species of \(giraffe.species)")
     }
  <- An animal was initialized with a species of Giraffe
  ```
-->

如果你给该可失败构造器传入一个空字符串到形参 `species` ，则会导致构造失败:

```swift
let anonymousCreature = Animal(species: "")
// anonymousCreature 的类型是 Animal?, 而不是 Animal

if anonymousCreature == nil {
    print("The anonymous creature couldn't be initialized")
}
// 打印 "The anonymous creature couldn't be initialized"。
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let anonymousCreature = Animal(species: "")
  // anonymousCreature is of type Animal?, not Animal

  -> if anonymousCreature == nil {
        print("The anonymous creature couldn't be initialized")
     }
  <- The anonymous creature couldn't be initialized
  ```
-->

> 注意: 检查空字符串的值 (如 `""` 而不是 `"Giraffe"`) 不等同于检查 `nil` 以表示 *可选* `String` 值的缺失。
> 上述示例中的空字符串 (`""`) 是一个合法且非可选的 `String`.
> 然而, 对于 `Animal` 这个类来说，其 `species` 属性的值为空字符串是不合适的。
> 为了体现这个限制，如果发现使用空字符串，构造器就会触发初始化失败的错误。

### 枚举类型的可失败构造器

你可以通过一个基于一个或多个形参的可失败构造器来获取枚举类型中特定的枚举成员。如果提供的形参无法匹配任何枚举成员，则构造失败。

下面的示例中，定义了一个 `TemperatureUnit` 的枚举类型。其中包含了三个可能的枚举状态 (`kelvin`, `celsius`, and `fahrenheit`)，以及一个根据表示温度单位的 `Character` 值找出合适的枚举成员的可失败构造器:

```swift
enum TemperatureUnit {
    case kelvin, celsius, fahrenheit
    init?(symbol: Character) {
        switch symbol {
        case "K":
            self = .kelvin
        case "C":
            self = .celsius
        case "F":
            self = .fahrenheit
        default:
            return nil
        }
    }
}
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> enum TemperatureUnit {
        case kelvin, celsius, fahrenheit
        init?(symbol: Character) {
           switch symbol {
              case "K":
                 self = .kelvin
              case "C":
                 self = .celsius
              case "F":
                 self = .fahrenheit
              default:
                 return nil
           }
        }
     }
  ```
-->

你可以利用该可失败构造器在三个枚举成员中选择合适的枚举成员，当形参不能和任何枚举成员相匹配时，则构造失败：

```swift
let fahrenheitUnit = TemperatureUnit(symbol: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// 打印 "This is a defined temperature unit, so initialization succeeded."

let unknownUnit = TemperatureUnit(symbol: "X")
if unknownUnit == nil {
    print("This isn't a defined temperature unit, so initialization failed.")
}
// 打印 "This isn't a defined temperature unit, so initialization failed."
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let fahrenheitUnit = TemperatureUnit(symbol: "F")
  -> if fahrenheitUnit != nil {
        print("This is a defined temperature unit, so initialization succeeded.")
     }
  <- This is a defined temperature unit, so initialization succeeded.

  -> let unknownUnit = TemperatureUnit(symbol: "X")
  -> if unknownUnit == nil {
        print("This isn't a defined temperature unit, so initialization failed.")
     }
  <- This isn't a defined temperature unit, so initialization failed.
  ```
-->

### 带原始值的枚举类型的可失败构造器

带原始值的枚举类型会自带一个可失败构造器 `init?(rawValue:)` ，该可失败构造器有一个合适的原始值类型的 `rawValue` 形参，选择找到的相匹配的枚举成员，找不到则构造失败。

因此 `TemperatureUnit` 的例子可以用原始值类型的 `Character` 和进阶的 `init?(rawValue:)` 构造器重写为:

```swift
enum TemperatureUnit: Character {
    case kelvin = "K", celsius = "C", fahrenheit = "F"
}

let fahrenheitUnit = TemperatureUnit(rawValue: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// 打印 "This is a defined temperature unit, so initialization succeeded."

let unknownUnit = TemperatureUnit(rawValue: "X")
if unknownUnit == nil {
    print("This isn't a defined temperature unit, so initialization failed.")
}
// 打印 "This isn't a defined temperature unit, so initialization failed."
```

<!--
  - test: `failableInitializersForEnumerations`

  ```swifttest
  -> enum TemperatureUnit: Character {
        case kelvin = "K", celsius = "C", fahrenheit = "F"
     }

  -> let fahrenheitUnit = TemperatureUnit(rawValue: "F")
  -> if fahrenheitUnit != nil {
        print("This is a defined temperature unit, so initialization succeeded.")
     }
  <- This is a defined temperature unit, so initialization succeeded.

  -> let unknownUnit = TemperatureUnit(rawValue: "X")
  -> if unknownUnit == nil {
        print("This isn't a defined temperature unit, so initialization failed.")
     }
  <- This isn't a defined temperature unit, so initialization failed.
  ```
-->

### 构造失败的传递

类、结构体、枚举的可失败构造器可以横向代理到它们自己其他的可失败构造器。类似的，子类的可失败构造器也能向上代理到父类的可失败构造器。

无论是向上代理还是横向代理，如果你代理到的其他可失败构造器触发构造失败，整个构造过程将立即终止，接下来的任何构造代码不会再被执行。

<!--
  - test: `delegatingAcrossInAStructurePropagatesInitializationFailureImmediately`

  ```swifttest
  -> struct S {
        init?(string1: String) {
           self.init(string2: string1)
           print("Hello!") // this should never be printed, because initialization has already failed
        }
        init?(string2: String) { return nil }
     }
  -> let s = S(string1: "bing")
  -> assert(s == nil)
  ```
-->

<!--
  - test: `delegatingAcrossInAClassPropagatesInitializationFailureImmediately`

  ```swifttest
  -> class C {
        convenience init?(string1: String) {
           self.init(string2: string1)
           print("Hello!") // this should never be printed, because initialization has already failed
        }
        init?(string2: String) { return nil }
     }
  -> let c = C(string1: "bing")
  -> assert(c == nil)
  ```
-->

<!--
  - test: `delegatingUpInAClassPropagatesInitializationFailureImmediately`

  ```swifttest
  -> class C {
        init?(string1: String) { return nil }
     }
  -> class D: C {
        init?(string2: String) {
           super.init(string1: string2)
           print("Hello!") // this should never be printed, because initialization has already failed
        }
     }
  -> let d = D(string2: "bing")
  -> assert(d == nil)
  ```
-->

> 注意: 可失败构造器也可以代理到其它的不可失败构造器。通过这种方式，你可以增加一个可能的失败状态到现有的构造过程中。

下面这个示例中定义了一个 `Product` 的子类 `CartItem` 。 `CartItem` 类建立了一个在线购物车中的物品的模型，它有一个名为 `quantity` 的常量存储型属性，并确保给属性的值至少为 `1` :


```swift
class Product {
    let name: String
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}

class CartItem: Product {
    let quantity: Int
    init?(name: String, quantity: Int) {
        if quantity < 1 { return nil }
        self.quantity = quantity
        super.init(name: name)
    }
}
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> class Product {
        let name: String
        init?(name: String) {
           if name.isEmpty { return nil }
           self.name = name
        }
     }
  >> let p = Product(name: "")

  -> class CartItem: Product {
        let quantity: Int
        init?(name: String, quantity: Int) {
           if quantity < 1 { return nil }
           self.quantity = quantity
           super.init(name: name)
        }
     }
  ```
-->

`CartItem` 可失败构造器首先验证接收的 `quantity` 值是否大于等于1。倘若 `quantity` 值无效，则立即终止整个构造过程，返回失败结果，且不再执行余下代码。同样地， `Product` 的可失败构造器首先检查 `name` 值， 如果 `name` 值为空字符串，则构造器立即执行失败。

如果你通过传入一个非空的 `name` 以及 大于等于 `1` 的 `quantity` 来创建一个 `CartItem` 实例，构建方法将成功执行:

```swift
if let twoSocks = CartItem(name: "sock", quantity: 2) {
    print("Item: \(twoSocks.name), quantity: \(twoSocks.quantity)")
}
// 打印 "Item: sock, quantity: 2"。
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> if let twoSocks = CartItem(name: "sock", quantity: 2) {
        print("Item: \(twoSocks.name), quantity: \(twoSocks.quantity)")
     }
  <- Item: sock, quantity: 2
  ```
-->

如果你用值为 `0` 的 `quantity` 来创建一个 `CartItem` 实例，那么将导致 `CartItem` 的构造器失败:

```swift
if let zeroShirts = CartItem(name: "shirt", quantity: 0) {
    print("Item: \(zeroShirts.name), quantity: \(zeroShirts.quantity)")
} else {
    print("Unable to initialize zero shirts")
}
// 打印 "Unable to initialize zero shirts"。
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> if let zeroShirts = CartItem(name: "shirt", quantity: 0) {
        print("Item: \(zeroShirts.name), quantity: \(zeroShirts.quantity)")
     } else {
        print("Unable to initialize zero shirts")
     }
  <- Unable to initialize zero shirts
  ```
-->

同样地，如果你尝试传入一个值为空字符串的 `name` 来创建一个 `CartItem` 实例，那么将导致父类 `Product` 的构造过程失败:

```swift
if let oneUnnamed = CartItem(name: "", quantity: 1) {
    print("Item: \(oneUnnamed.name), quantity: \(oneUnnamed.quantity)")
} else {
    print("Unable to initialize one unnamed product")
}
// 打印 "Unable to initialize one unnamed product"。
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> if let oneUnnamed = CartItem(name: "", quantity: 1) {
        print("Item: \(oneUnnamed.name), quantity: \(oneUnnamed.quantity)")
     } else {
        print("Unable to initialize one unnamed product")
     }
  <- Unable to initialize one unnamed product
  ```
-->

### 重写一个可失败构造器

如同其它的构造器，你可以在子类中重写父类的可失败构造器。或者你也可以用子类的非可失败构造器重写一个父类的可失败构造器。这使你可以定义一个不会构造失败的子类，即使父类的构造器允许构造失败。

注意，当你用子类的非可失败构造器重写父类的可失败构造器时，向上代理到父类的可失败构造器的唯一方式是对父类的可失败构造器的返回值进行强制解包。

> 注意: 你可以用非可失败构造器重写可失败构造器，但反过来却不行。

<!--
  - test: `youCannotOverrideANonFailableInitializerWithAFailableInitializer`

  ```swifttest
  -> class C {
        init() {}
     }
  -> class D: C {
        override init?() {}
     }
  !$ error: failable initializer 'init()' cannot override a non-failable initializer
  !!            override init?() {}
  !!                     ^
  !$ note: non-failable initializer 'init()' overridden here
  !!            init() {}
  !!            ^
  ```
-->

下面的示例定义了 `Document` 类。这个类模拟一个文档并可以用 `name` 属性来构造，属性的值必须为一个非空的字符串或 `nil` ，但不能是一个空字符串:

```swift
class Document {
    var name: String?
    // 该构造器创建了一个 name 属性的值为 nil 的 document 实例
    init() {}
    // 该构造器创建了一个 name 属性的值为非空字符串的 document 实例
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> class Document {
        var name: String?
        // this initializer creates a document with a nil name value
        init() {}
        // this initializer creates a document with a nonempty name value
        init?(name: String) {
           if name.isEmpty { return nil }
           self.name = name
        }
     }
  ```
-->

下一个示例中定义了一个 `Document` 的子类 `AutomaticallyNamedDocument` 。 `AutomaticallyNamedDocument` 子类重写了所有父类引入的指定构造器。这些重写确保了 `AutomaticallyNamedDocument` 在没有 `name` 值时传递空字符串给 `init(name:)` 构造器，具有初始 `name` 值 `"[Untitled]"` 。

```swift
class AutomaticallyNamedDocument: Document {
    override init() {
        super.init()
        self.name = "[Untitled]"
    }
    override init(name: String) {
        super.init()
        if name.isEmpty {
            self.name = "[Untitled]"
        } else {
            self.name = name
        }
    }
}
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> class AutomaticallyNamedDocument: Document {
        override init() {
           super.init()
           self.name = "[Untitled]"
        }
        override init(name: String) {
           super.init()
           if name.isEmpty {
              self.name = "[Untitled]"
           } else {
              self.name = name
           }
        }
     }
  ```
-->

`AutomaticallyNamedDocument` 用一个不可失败构造器 `init?(name:)` 重写了父类的可失败构造器。因为子类用另一种方式处理了空字符串的情况，所以不再需要一个可失败构造器，因此子类用一个不可失败构造器代替了父类的可失败构造器。

你可以在子类的不可失败构造器中使用强制解包来调用父类的可失败构造器。比如，下面的 `UntitledDocument` 子类总是被命名为 `"[Untitled]"` 并且在初始化阶段使用父类的可失败构造器 `init(name:)` 。

```swift
class UntitledDocument: Document {
    override init() {
        super.init(name: "[Untitled]")!
    }
}
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> class UntitledDocument: Document {
        override init() {
           super.init(name: "[Untitled]")!
        }
     }
  ```
-->

在这个例子中，如果在调用父类的可失败构造器 `init(name:)` 时传入的是空字符串，那么强制解包操作会引发运行时错误。不过，因为这里是通过字符串字面量来调用它，构造器不会失败，所以在这个例子中并不会发生运行时错误。

### init! 可失败构造器

通常来说我们通过在 `init` 关键字后添加问号的方式 (`init?`) 来定义一个可失败的构造器。但你也可以通过在 `init` 后面添加感叹号的方式来定义一个可失败构造器 (`init!`) ，该可失败构造器将会构建一个对应类型的隐式解包可选类型的对象。

你可以在 `init?` 中代理到 `init!` ，反之亦然。你也可以用 `init?` 重写 `init!` ，反之亦然。你还可以用 `init` 代理到 `init!` ，不过，一旦 `init!` 构造失败，则会触发断言。

<!--
  - test: `structuresCanDelegateAcrossFromOptionalToIUO`

  ```swifttest
  -> struct S {
        init?(optional: Int) { self.init(iuo: optional) }
        init!(iuo: Int) {}
     }
  ```
-->

<!--
  - test: `structuresCanDelegateAcrossFromIUOToOptional`

  ```swifttest
  -> struct S {
        init!(iuo: Int) { self.init(optional: iuo) }
        init?(optional: Int) {}
     }
  ```
-->

<!--
  - test: `classesCanDelegateAcrossFromOptionalToIUO`

  ```swifttest
  -> class C {
        convenience init?(optional: Int) { self.init(iuo: optional) }
        init!(iuo: Int) {}
     }
  ```
-->

<!--
  - test: `classesCanDelegateAcrossFromIUOToOptional`

  ```swifttest
  -> class C {
        convenience init!(iuo: Int) { self.init(optional: iuo) }
        init?(optional: Int) {}
     }
  ```
-->

<!--
  - test: `classesCanDelegateUpFromOptionalToIUO`

  ```swifttest
  -> class C {
        init!(iuo: Int) {}
     }
  -> class D: C {
        init?(optional: Int) { super.init(iuo: optional) }
     }
  ```
-->

<!--
  - test: `classesCanDelegateUpFromIUOToOptional`

  ```swifttest
  -> class C {
        init?(optional: Int) {}
     }
  -> class D: C {
        init!(iuo: Int) { super.init(optional: iuo) }
     }
  ```
-->

<!--
  - test: `classesCanOverrideOptionalWithIUO`

  ```swifttest
  -> class C {
        init?(i: Int) {}
     }
  -> class D: C {
        override init!(i: Int) { super.init(i: i) }
     }
  ```
-->

<!--
  - test: `classesCanOverrideIUOWithOptional`

  ```swifttest
  -> class C {
        init!(i: Int) {}
     }
  -> class D: C {
        override init?(i: Int) { super.init(i: i) }
     }
  ```
-->

<!--
  - test: `structuresCanDelegateAcrossFromNonFailingToIUO`

  ```swifttest
  -> struct S {
        init(nonFailing: Int) { self.init(iuo: nonFailing) }
        init!(iuo: Int) {}
     }
  ```
-->

<!--
  - test: `classesCanDelegateAcrossFromNonFailingToIUO`

  ```swifttest
  -> class C {
        convenience init(nonFailing: Int) { self.init(iuo: nonFailing) }
        init!(iuo: Int) {}
     }
  ```
-->

<!--
  - test: `classesCanDelegateUpFromNonFailingToIUO`

  ```swifttest
  -> class C {
        init!(iuo: Int) {}
     }
  -> class D: C {
        init(nonFailing: Int) { super.init(iuo: nonFailing) }
     }
  ```
-->

<!--
  - test: `structuresAssertWhenDelegatingAcrossFromNonFailingToNilIUO`

  ```swifttest
  -> struct S {
        init(nonFailing: Int) { self.init(iuo: nonFailing) }
        init!(iuo: Int) { return nil }
     }
  -> let s = S(nonFailing: 42)
  xx assertion
  ```
-->

<!--
  - test: `classesAssertWhenDelegatingAcrossFromNonFailingToNilIUO`

  ```swifttest
  -> class C {
        convenience init(nonFailing: Int) { self.init(iuo: nonFailing) }
        init!(iuo: Int) { return nil }
     }
  -> let c = C(nonFailing: 42)
  xx assertion
  ```
-->

<!--
  - test: `classesAssertWhenDelegatingUpFromNonFailingToNilIUO`

  ```swifttest
  -> class C {
        init!(iuo: Int) { return nil }
     }
  -> class D: C {
        init(nonFailing: Int) { super.init(iuo: nonFailing) }
     }
  -> let d = D(nonFailing: 42)
  xx assertion
  ```
-->

## 必要构造器

在类的构造器前添加 `required` 修饰符表明所有该类的子类都必须实现该构造器:

```swift
class SomeClass {
    required init() {
        // 构造器的实现代码
    }
}
```

<!--
  - test: `requiredInitializers`

  ```swifttest
  -> class SomeClass {
        required init() {
           // initializer implementation goes here
        }
     }
  ```
-->

<!--
  - test: `requiredDesignatedInitializersMustBeImplementedBySubclasses`

  ```swifttest
  -> class C {
        required init(i: Int) {}
     }
  -> class D: C {
        init() {}
     }
  !$ error: 'required' initializer 'init(i:)' must be provided by subclass of 'C'
  !! }
  !! ^
  !$ note: 'required' initializer is declared in superclass here
  !!    required init(i: Int) {}
  !!             ^
  ```
-->

<!--
  - test: `requiredConvenienceInitializersMustBeImplementedBySubclasses`

  ```swifttest
  -> class C {
        init() {}
        required convenience init(i: Int) {
           self.init()
        }
     }
  -> class D: C {
        init(s: String) {}
     }
  !$ error: 'required' initializer 'init(i:)' must be provided by subclass of 'C'
  !! }
  !! ^
  !$ note: 'required' initializer is declared in superclass here
  !!    required convenience init(i: Int) {
  !!                         ^
  ```
-->

在子类重写父类的必要构造器时，必须在子类的构造器前也添加 `required` 修饰符，表明该构造器要求也应用于继承链后面的子类。在重写父类中必要的指定构造器时，不需要添加 `override` 修饰符:


```swift
class SomeSubclass: SomeClass {
    required init() {
        // 子类的必要构造器实现
    }
}
```

<!--
  - test: `requiredInitializers`

  ```swifttest
  -> class SomeSubclass: SomeClass {
        required init() {
           // subclass implementation of the required initializer goes here
        }
     }
  ```
-->

<!--
  - test: `youCannotWriteOverrideWhenOverridingARequiredDesignatedInitializer`

  ```swifttest
  -> class C {
        required init() {}
     }
  -> class D: C {
        override required init() {}
     }
  !$ warning: 'override' is implied when overriding a required initializer
  !!    override required init() {}
  !! ~~~~~~~~~         ^
  !!-
  !$ note: overridden required initializer is here
  !!    required init() {}
  !!             ^
  ```
-->

> 注意: 如果子类继承的构造器能满足必要构造器的要求，则无须在子类中显式提供必要构造器的实现。

<!--
  - test: `youCanSatisfyARequiredDesignatedInitializerWithAnInheritedInitializer`

  ```swifttest
  -> class C {
        var x = 0
        required init(i: Int) {}
     }
  -> class D: C {
        var y = 0
     }
  ```
-->

<!--
  - test: `youCanSatisfyARequiredConvenienceInitializerWithAnInheritedInitializer`

  ```swifttest
  -> class C {
        var x = 0
        init(i: Int) {}
        required convenience init() {
           self.init(i: 42)
        }
     }
  -> class D: C {
        var y = 0
     }
  ```
-->

<!--
  FIXME: This section still doesn't describe why required initializers are useful.
  This is because the reason for their usefulness -
  construction through a metatype of some protocol type with an initializer requirement -
  used to be broken due to
  <rdar://problem/13695680> Constructor requirements in protocols (needed for NSCoding).
  As of early 2015 that bug has been fixed.
  See the corresponding FIXME in the Protocols chapter introduction too.
-->

## 通过闭包或函数设置属性的默认值

如果某个存储型属性的默认值需要一些自定义或设置，你可以使用闭包或全局函数为其提供定制的默认值。每当某个属性所在类型的新实例被构造时，对应的闭包或函数会被调用，而它们的返回值会当做默认值赋值给这个属性。

这种类型的闭包或函数通常会创建一个跟属性类型相同的临时变量，然后修改它的值以满足预期的初始状态，最后返回这个临时变量，作为属性的默认值。

下面模板介绍了如何用闭包为属性提供默认值：

```swift
class SomeClass {
    let someProperty: SomeType = {
        // 在这个闭包中给 someProperty 创建一个默认值
        // someValue 必须和 SomeType 类型相同
        return someValue
    }()
}
```

<!--
  - test: `defaultPropertyWithClosure`

  ```swifttest
  >> class SomeType {}
  -> class SomeClass {
        let someProperty: SomeType = {
           // create a default value for someProperty inside this closure
           // someValue must be of the same type as SomeType
  >>       let someValue = SomeType()
           return someValue
        }()
     }
  ```
-->

注意闭包结尾的花括号后面接了一对空的小括号。这用来告诉 Swift 立即执行此闭包。如果你忽略了这对括号，相当于将闭包本身作为值赋值给了属性，而不是将闭包的返回值赋值给属性。

<!--
  TODO: feedback from Peter is that this is very close to the syntax for
  a computed property that doesn't define a separate getter.
  He's right, and it would be good to provide an additional example -
  perhaps with a stored property that's assigned the result of a function -
  to make the difference more explicit.
-->

> 注意: 如果你使用闭包来初始化属性，请记住在闭包执行时，实例的其它部分都还没有初始化。这意味着你不能在闭包里访问其它属性，即使这些属性有默认值。同样，你也不能使用隐式的 `self` 属性，或者调用任何实例方法。

下面的示例中定义了一个 `Chessboard` 结构体，它构建了西洋跳棋游戏的棋盘。西洋跳棋游戏在一副黑白格交替的 8 x 8 的棋盘中进行的：

![](chessBoard)

为了呈现这副游戏棋盘， `Chessboard` 结构体定义了一个属性 `boardColors` ，它是一个包含64个 `Bool` 值的数组。数组中值为 `true` 表示为一个黑格，值为 `false` 表示为一个白格。数组中第一个元素代表棋盘上左上角的格子，最后一个元素代表棋盘上右下角的格子。 .

`boardColors` 数组是同一个闭包初始化并设置颜色值的： array is initialized with a closure to set up its color values:

```swift
struct Chessboard {
    let boardColors: [Bool] = {
        var temporaryBoard: [Bool] = []
        var isBlack = false
        for i in 1...8 {
            for j in 1...8 {
                temporaryBoard.append(isBlack)
                isBlack = !isBlack
            }
            isBlack = !isBlack
        }
        return temporaryBoard
    }()
    func squareIsBlackAt(row: Int, column: Int) -> Bool {
        return boardColors[(row * 8) + column]
    }
}
```

<!--
  - test: `chessboard`

  ```swifttest
  -> struct Chessboard {
        let boardColors: [Bool] = {
           var temporaryBoard: [Bool] = []
           var isBlack = false
           for i in 1...8 {
              for j in 1...8 {
                 temporaryBoard.append(isBlack)
                 isBlack = !isBlack
              }
              isBlack = !isBlack
           }
           return temporaryBoard
        }()
        func squareIsBlackAt(row: Int, column: Int) -> Bool {
           return boardColors[(row * 8) + column]
        }
     }
  ```
-->

每当一个新的 `Chessboard` 实例被创建时，闭包就会被执行， `boardColors` 的默认值会被计算出来并返回。上面的示例中的闭包会计算出棋盘中每个格子对应的颜色，并将这些值保存到一个临时数组 `temporaryBoard` 中，最后在构建完成时将此数组作为闭包返回值返回。这个返回的数组会保存到 `boardColors` 中，并可以通过 `squareIsBlackAt(row:column:)` 工具函数来查询:

```swift
let board = Chessboard()
print(board.squareIsBlackAt(row: 0, column: 1))
// 打印 "true"。
print(board.squareIsBlackAt(row: 7, column: 7))
// 打印 "false"。
```

<!--
  - test: `chessboard`

  ```swifttest
  -> let board = Chessboard()
  >> assert(board.boardColors == [false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false, false, true, false, true, false, true, false, true, true, false, true, false, true, false, true, false])
  -> print(board.squareIsBlackAt(row: 0, column: 1))
  <- true
  -> print(board.squareIsBlackAt(row: 7, column: 7))
  <- false
  ```
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
