# 构造过程

设置类型的初始值并执行一次性构造过程。

*构造过程*是使用类、结构体或枚举等实例之前的准备过程。这个过程包括为该实例的每个存储属性设置初始值，并执行任何其他必要的设置或构造过程，以确保新实例在使用前已经完成正确的构造。

你可以通过定义*构造器*来实现这个构造过程，它就像是用来创建特定类型新实例的特殊方法。与Objective-C构造器不同，Swift构造器不返回值，它们的主要作用是确保新类型实例在首次使用前被正确构造。

类的实例在被释放之前，可以通过*析构器*进行任何自定义清理操作。想了解析构器的更多内容，请参见 <doc:Deinitialization>.

## 存储属性的初始赋值

类和结构体*必须*在其实例被创建时为所有的存储属性设置一个适当的初始值。存储属性不能处于不确定的状态。

你可以在构造器中为存储属性设置初始值，或者在定义属性时赋予默认值。以下部分将会详细介绍这两种方法。

> 注意：当你为存储属性赋予默认值，或者在构造器中设置其初始值时，该属性的值会被直接设置，而不会触发任何属性观察器。

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
// 打印 "The default temperature is 32.0° Fahrenheit"
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

这个结构体定义了一个不带形参的构造器 `init`，并在里面将存储型属性 `temperature` 的值初始化为 `32.0`（华氏温度下水的冰点）。

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

你可以通过输入形参和可选属性类型，或在初始化期间分配常量属性来定制初始化过程，这些都将在后面章节中提到。

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

第一个构造器拥有一个构造形参，其实参标签为 `fromFahrenheit`，形参命名为 `fahrenheit`；第二个构造器也拥有一个构造形参，其实参标签为 `fromKelvin`，形参命名为 `kelvin`。这两个构造器都将单一的实参转换成摄氏温度值，并保存在属性 `temperatureInCelsius` 中。

<!--
  TODO: I need to provide an example of default values for initializer parameters,
  to show they can help you to get multiple initializers "for free" (after a fashion).
-->

### 形参命名和实参标签

与函数和方法形参相同，构造形参可以同时具有在构造器内部使用的形参名称和在调用构造器时使用的实参标签。

然而，构造器在括号前没有像函数和方法那样的可辨别的方法名。因此，构造器的形参名称和类型在确定应调用哪个构造器时起着至关重要的作用。正因为如此，如果你没有提供实参标签，Swift会为构造器的每个形参自动提供一个实参标签。


下面例子中的`Color`结构体包含了三个 `Double` 类型的常量（ `red` 、 `green`、 `blue` ）,表明颜色中红、绿、蓝成分的含量。
Color 提供了一个构造器，为红蓝绿提供三个合适 Double 类型的形参命名。Color 也提供了第二个构造器，它只包含名为 white 的 Double 类型的形参，它为三个颜色的属性提供相同的值。

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

如果你不希望构造器的某个形参使用实参标签，可以使用下划线 `（_）` 来代替显式的实参标签来重写默认行为。

接下来是 <doc:Initialization#Initialization-Parameters> 带来的扩展版本的 `Celsius`, 增加了一个构造器用于从已经是摄氏温标的 `Double` 值创建一个新的 `Celsius` 实例:

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

对调查问题的回答在问题被问到之前是未知的，因此 `response` 属性被声明为 `String?` 类型，即“可选的 `String`”。当一个新的 `SurveyQuestion` 实例被初始化时，它会自动被赋予默认值 `nil`，表示“尚无字符串”。

### 构造过程中常量属性的赋值

你可以在构造过程中的任意时间点给常量属性赋值，只要在构造过程结束时它设置成确定的值。一旦常量属性被赋值，它将永远不可更改。

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

> 注意: 对于类的实例来说，它的常量属性只能在定义它的类的构造过程中修改；不能在子类中修改。

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

### Memberwise Initializers for Structure Types

Structure types automatically receive a *memberwise initializer*
if they don't define any of their own custom initializers.
Unlike a default initializer,
the structure receives a memberwise initializer
even if it has stored properties that don't have default values.

<!--
  - test: `memberwiseInitializersDontRequireDefaultStoredPropertyValues`

  ```swifttest
  -> struct S { var int: Int; var string: String }
  -> let s = S(int: 42, string: "hello")
  ---
  -> struct SS { var int = 10; var string: String }
  -> let ss = SS(int: 42, string: "hello")
  ```
-->

The memberwise initializer is a shorthand way
to initialize the member properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name.

The example below defines a structure called `Size`
with two properties called `width` and `height`.
Both properties are inferred to be of type `Double`
by assigning a default value of `0.0`.

The `Size` structure automatically receives an `init(width:height:)`
memberwise initializer,
which you can use to initialize a new `Size` instance:

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

```swift
let zeroByTwo = Size(height: 2.0)
print(zeroByTwo.width, zeroByTwo.height)
// Prints "0.0 2.0"

let zeroByZero = Size()
print(zeroByZero.width, zeroByZero.height)
// Prints "0.0 0.0"
```

<!--
  - test: `initialization`

  ```swifttest
  -> let zeroByTwo = Size(height: 2.0)
  -> print(zeroByTwo.width, zeroByTwo.height)
  <- 0.0 2.0
  ---
  -> let zeroByZero = Size()
  -> print(zeroByZero.width, zeroByZero.height)
  <- 0.0 0.0
  ```
-->

## Initializer Delegation for Value Types

Initializers can call other initializers to perform part of an instance's initialization.
This process, known as *initializer delegation*,
avoids duplicating code across multiple initializers.

The rules for how initializer delegation works,
and for what forms of delegation are allowed,
are different for value types and class types.
Value types (structures and enumerations) don't support inheritance,
and so their initializer delegation process is relatively simple,
because they can only delegate to another initializer that they provide themselves.
Classes, however, can inherit from other classes,
as described in <doc:Inheritance>.
This means that classes have additional responsibilities for ensuring that
all stored properties they inherit are assigned a suitable value during initialization.
These responsibilities are described in
<doc:Initialization#Class-Inheritance-and-Initialization> below.

For value types, you use `self.init` to refer to other initializers
from the same value type when writing your own custom initializers.
You can call `self.init` only from within an initializer.

Note that if you define a custom initializer for a value type,
you will no longer have access to the default initializer
(or the memberwise initializer, if it's a structure) for that type.
This constraint prevents a situation in which additional essential setup
provided in a more complex initializer
is accidentally circumvented by someone using one of the automatic initializers.

> Note: If you want your custom value type to be initializable with
> the default initializer and memberwise initializer,
> and also with your own custom initializers,
> write your custom initializers in an extension
> rather than as part of the value type's original implementation.
> For more information, see <doc:Extensions>.

The following example defines a custom `Rect` structure to represent a geometric rectangle.
The example requires two supporting structures called `Size` and `Point`,
both of which provide default values of `0.0` for all of their properties:

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

You can initialize the `Rect` structure below in one of three ways ---
by using its default zero-initialized `origin` and `size` property values,
by providing a specific origin point and size,
or by providing a specific center point and size.
These initialization options are represented by
three custom initializers that are part of the `Rect` structure's definition:

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

The first `Rect` initializer, `init()`,
is functionally the same as the default initializer that the structure would have received
if it didn't have its own custom initializers.
This initializer has an empty body,
represented by an empty pair of curly braces `{}`.
Calling this initializer returns a `Rect` instance whose
`origin` and `size` properties are both initialized with
the default values of `Point(x: 0.0, y: 0.0)`
and `Size(width: 0.0, height: 0.0)`
from their property definitions:

```swift
let basicRect = Rect()
// basicRect's origin is (0.0, 0.0) and its size is (0.0, 0.0)
```

<!--
  - test: `valueDelegation`

  ```swifttest
  -> let basicRect = Rect()
  /> basicRect's origin is (\(basicRect.origin.x), \(basicRect.origin.y)) and its size is (\(basicRect.size.width), \(basicRect.size.height))
  </ basicRect's origin is (0.0, 0.0) and its size is (0.0, 0.0)
  ```
-->

The second `Rect` initializer, `init(origin:size:)`,
is functionally the same as the memberwise initializer that the structure would have received
if it didn't have its own custom initializers.
This initializer simply assigns the `origin` and `size` argument values to
the appropriate stored properties:

```swift
let originRect = Rect(origin: Point(x: 2.0, y: 2.0),
    size: Size(width: 5.0, height: 5.0))
// originRect's origin is (2.0, 2.0) and its size is (5.0, 5.0)
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

The third `Rect` initializer, `init(center:size:)`, is slightly more complex.
It starts by calculating an appropriate origin point based on
a `center` point and a `size` value.
It then calls (or *delegates*) to the `init(origin:size:)` initializer,
which stores the new origin and size values in the appropriate properties:

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
// centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)
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

The `init(center:size:)` initializer could have assigned
the new values of `origin` and `size` to the appropriate properties itself.
However, it's more convenient (and clearer in intent)
for the `init(center:size:)` initializer to take advantage of an existing initializer
that already provides exactly that functionality.

> Note: For an alternative way to write this example without defining
> the `init()` and `init(origin:size:)` initializers yourself,
> see <doc:Extensions>.

## Class Inheritance and Initialization

All of a class's stored properties ---
including any properties the class inherits from its superclass ---
*must* be assigned an initial value during initialization.

Swift defines two kinds of initializers for class types
to help ensure all stored properties receive an initial value.
These are known as designated initializers and convenience initializers.

### Designated Initializers and Convenience Initializers

*Designated initializers* are the primary initializers for a class.
A designated initializer fully initializes all properties introduced by that class
and calls an appropriate superclass initializer
to continue the initialization process up the superclass chain.

Classes tend to have very few designated initializers,
and it's quite common for a class to have only one.
Designated initializers are “funnel” points through which initialization takes place,
and through which the initialization process continues up the superclass chain.

Every class must have at least one designated initializer.
In some cases, this requirement is satisfied
by inheriting one or more designated initializers from a superclass,
as described in <doc:Initialization#Automatic-Initializer-Inheritance> below.

*Convenience initializers* are secondary, supporting initializers for a class.
You can define a convenience initializer to call a designated initializer
from the same class as the convenience initializer
with some of the designated initializer's parameters set to default values.
You can also define a convenience initializer to create
an instance of that class for a specific use case or input value type.

You don't have to provide convenience initializers if your class doesn't require them.
Create convenience initializers whenever a shortcut to a common initialization pattern
will save time or make initialization of the class clearer in intent.

### Syntax for Designated and Convenience Initializers

Designated initializers for classes are written in the same way as
simple initializers for value types:

```swift
init(<#parameters#>) {
   <#statements#>
}
```

Convenience initializers are written in the same style,
but with the `convenience` modifier placed before the `init` keyword,
separated by a space:

```swift
convenience init(<#parameters#>) {
   <#statements#>
}
```

### Initializer Delegation for Class Types

To simplify the relationships between designated and convenience initializers,
Swift applies the following three rules for delegation calls between initializers:

- term **Rule 1**:
  A designated initializer must call a designated initializer from its immediate superclass.

- term **Rule 2**:
  A convenience initializer must call another initializer from the *same* class.

- term **Rule 3**:
  A convenience initializer must ultimately call a designated initializer.

A simple way to remember this is:

- Designated initializers must always delegate *up*.
- Convenience initializers must always delegate *across*.

These rules are illustrated in the figure below:

![](initializerDelegation01)

Here, the superclass has a single designated initializer and two convenience initializers.
One convenience initializer calls another convenience initializer,
which in turn calls the single designated initializer.
This satisfies rules 2 and 3 from above.
The superclass doesn't itself have a further superclass, and so rule 1 doesn't apply.

The subclass in this figure has two designated initializers and one convenience initializer.
The convenience initializer must call one of the two designated initializers,
because it can only call another initializer from the same class.
This satisfies rules 2 and 3 from above.
Both designated initializers must call the single designated initializer
from the superclass, to satisfy rule 1 from above.

> Note: These rules don't affect how users of your classes *create* instances of each class.
> Any initializer in the diagram above can be used to create
> a fully initialized instance of the class they belong to.
> The rules only affect how you write the implementation of the class's initializers.

The figure below shows a more complex class hierarchy for four classes.
It illustrates how the designated initializers in this hierarchy
act as “funnel” points for class initialization,
simplifying the interrelationships among classes in the chain:

![](initializerDelegation02)

### Two-Phase Initialization

Class initialization in Swift is a two-phase process.
In the first phase, each stored property is assigned an initial value
by the class that introduced it.
Once the initial state for every stored property has been determined,
the second phase begins,
and each class is given the opportunity to customize its stored properties further
before the new instance is considered ready for use.

The use of a two-phase initialization process makes initialization safe,
while still giving complete flexibility to each class in a class hierarchy.
Two-phase initialization prevents property values
from being accessed before they're initialized,
and prevents property values from being set to a different value
by another initializer unexpectedly.

> Note: Swift's two-phase initialization process is similar to initialization in Objective-C.
> The main difference is that during phase 1,
> Objective-C assigns zero or null values (such as `0` or `nil`) to every property.
> Swift's initialization flow is more flexible
> in that it lets you set custom initial values,
> and can cope with types for which `0` or `nil` isn't a valid default value.

Swift's compiler performs four helpful safety-checks to make sure that
two-phase initialization is completed without error:

- term **Safety check 1**:
  A designated initializer must ensure that all of the properties introduced by its class
  are initialized before it delegates up to a superclass initializer.

As mentioned above,
the memory for an object is only considered fully initialized
once the initial state of all of its stored properties is known.
In order for this rule to be satisfied, a designated initializer must make sure that
all of its own properties are initialized before it hands off up the chain.

- term **Safety check 2**:
  A designated initializer must delegate up to a superclass initializer
  before assigning a value to an inherited property.
  If it doesn't, the new value the designated initializer assigns
  will be overwritten by the superclass as part of its own initialization.

- term **Safety check 3**:
  A convenience initializer must delegate to another initializer
  before assigning a value to *any* property
  (including properties defined by the same class).
  If it doesn't, the new value the convenience initializer assigns
  will be overwritten by its own class's designated initializer.

- term **Safety check 4**:
  An initializer can't call any instance methods,
  read the values of any instance properties,
  or refer to `self` as a value
  until after the first phase of initialization is complete.

The class instance isn't fully valid until the first phase ends.
Properties can only be accessed, and methods can only be called,
once the class instance is known to be valid at the end of the first phase.

Here's how two-phase initialization plays out, based on the four safety checks above:

**Phase 1**

- A designated or convenience initializer is called on a class.
- Memory for a new instance of that class is allocated.
  The memory isn't yet initialized.
- A designated initializer for that class confirms that
  all stored properties introduced by that class have a value.
  The memory for these stored properties is now initialized.
- The designated initializer hands off to a superclass initializer to perform the same task
  for its own stored properties.
- This continues up the class inheritance chain until the top of the chain is reached.
- Once the top of the chain is reached,
  and the final class in the chain has ensured that all of its stored properties have a value,
  the instance's memory is considered to be fully initialized, and phase 1 is complete.

**Phase 2**

- Working back down from the top of the chain,
  each designated initializer in the chain has the option to customize the instance further.
  Initializers are now able to access `self`
  and can modify its properties, call its instance methods, and so on.
- Finally, any convenience initializers in the chain have the option
  to customize the instance and to work with `self`.

Here's how phase 1 looks for an initialization call for a hypothetical subclass and superclass:

![](twoPhaseInitialization01)

In this example, initialization begins with a call to
a convenience initializer on the subclass.
This convenience initializer can't yet modify any properties.
It delegates across to a designated initializer from the same class.

The designated initializer makes sure that all of the subclass's properties have a value,
as per safety check 1. It then calls a designated initializer on its superclass
to continue the initialization up the chain.

The superclass's designated initializer makes sure that
all of the superclass properties have a value.
There are no further superclasses to initialize,
and so no further delegation is needed.

As soon as all properties of the superclass have an initial value,
its memory is considered fully initialized, and phase 1 is complete.

Here's how phase 2 looks for the same initialization call:

![](twoPhaseInitialization02)

The superclass's designated initializer now has an opportunity
to customize the instance further
(although it doesn't have to).

Once the superclass's designated initializer is finished,
the subclass's designated initializer can perform additional customization
(although again, it doesn't have to).

Finally, once the subclass's designated initializer is finished,
the convenience initializer that was originally called
can perform additional customization.

### Initializer Inheritance and Overriding

Unlike subclasses in Objective-C,
Swift subclasses don't inherit their superclass initializers by default.
Swift's approach prevents a situation in which a simple initializer from a superclass
is inherited by a more specialized subclass
and is used to create a new instance of the subclass
that isn't fully or correctly initialized.

> Note: Superclass initializers *are* inherited in certain circumstances,
> but only when it's safe and appropriate to do so.
> For more information, see <doc:Initialization#Automatic-Initializer-Inheritance> below.

If you want a custom subclass to present
one or more of the same initializers as its superclass,
you can provide a custom implementation of those initializers within the subclass.

When you write a subclass initializer that matches a superclass *designated* initializer,
you are effectively providing an override of that designated initializer.
Therefore, you must write the `override` modifier before the subclass's initializer definition.
This is true even if you are overriding an automatically provided default initializer,
as described in <doc:Initialization#Default-Initializers>.

As with an overridden property, method or subscript,
the presence of the `override` modifier prompts Swift to check that
the superclass has a matching designated initializer to be overridden,
and validates that the parameters for your overriding initializer have been specified as intended.

> Note: You always write the `override` modifier when overriding a superclass designated initializer,
> even if your subclass's implementation of the initializer is a convenience initializer.

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

Conversely, if you write a subclass initializer that matches a superclass *convenience* initializer,
that superclass convenience initializer can never be called directly by your subclass,
as per the rules described above in <doc:Initialization#Initializer-Delegation-for-Class-Types>.
Therefore, your subclass is not (strictly speaking) providing an override of the superclass initializer.
As a result, you don't write the `override` modifier when providing
a matching implementation of a superclass convenience initializer.

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

The example below defines a base class called `Vehicle`.
This base class declares a stored property called `numberOfWheels`,
with a default `Int` value of `0`.
The `numberOfWheels` property is used by a computed property called `description`
to create a `String` description of the vehicle's characteristics:

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

The `Vehicle` class provides a default value for its only stored property,
and doesn't provide any custom initializers itself.
As a result, it automatically receives a default initializer,
as described in <doc:Initialization#Default-Initializers>.
The default initializer (when available) is always a designated initializer for a class,
and can be used to create a new `Vehicle` instance with a `numberOfWheels` of `0`:

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

The next example defines a subclass of `Vehicle` called `Bicycle`:

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

The `Bicycle` subclass defines a custom designated initializer, `init()`.
This designated initializer matches a designated initializer from the superclass of `Bicycle`,
and so the `Bicycle` version of this initializer is marked with the `override` modifier.

The `init()` initializer for `Bicycle` starts by calling `super.init()`,
which calls the default initializer for the `Bicycle` class's superclass, `Vehicle`.
This ensures that the `numberOfWheels` inherited property is initialized by `Vehicle`
before `Bicycle` has the opportunity to modify the property.
After calling `super.init()`,
the original value of `numberOfWheels` is replaced with a new value of `2`.

If you create an instance of `Bicycle`,
you can call its inherited `description` computed property
to see how its `numberOfWheels` property has been updated:

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

If a subclass initializer performs no customization
in phase 2 of the initialization process,
and the superclass has a synchronous, zero-argument designated initializer,
you can omit a call to `super.init()`
after assigning values to all of the subclass's stored properties.
If the superclass's initializer is asynchronous,
you need to write `await super.init()` explicitly.

This example defines another subclass of `Vehicle`, called `Hoverboard`.
In its initializer, the `Hoverboard` class sets only its `color` property.
Instead of making an explicit call to `super.init()`,
this initializer relies on an implicit call to its superclass's initializer
to complete the process.

```swift
class Hoverboard: Vehicle {
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

An instance of `Hoverboard` uses the default number of wheels
supplied by the `Vehicle` initializer.

```swift
let hoverboard = Hoverboard(color: "silver")
print("Hoverboard: \(hoverboard.description)")
// Hoverboard: 0 wheel(s) in a beautiful silver
```

<!--
  - test: `initializerInheritance`

  ```swifttest
  -> let hoverboard = Hoverboard(color: "silver")
  -> print("Hoverboard: \(hoverboard.description)")
  </ Hoverboard: 0 wheel(s) in a beautiful silver
  ```
-->

> Note: Subclasses can modify inherited variable properties during initialization,
> but can't modify inherited constant properties.

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

### Automatic Initializer Inheritance

As mentioned above,
subclasses don't inherit their superclass initializers by default.
However, superclass initializers *are* automatically inherited if certain conditions are met.
In practice, this means that
you don't need to write initializer overrides in many common scenarios,
and can inherit your superclass initializers with minimal effort whenever it's safe to do so.

Assuming that you provide default values for any new properties you introduce in a subclass,
the following two rules apply:

- term **Rule 1**:
  If your subclass doesn't define any designated initializers,
  it automatically inherits all of its superclass designated initializers.

- term **Rule 2**:
  If your subclass provides an implementation of
  *all* of its superclass designated initializers ---
  either by inheriting them as per rule 1,
  or by providing a custom implementation as part of its definition ---
  then it automatically inherits all of the superclass convenience initializers.

These rules apply even if your subclass adds further convenience initializers.

> Note: A subclass can implement a superclass designated initializer
> as a subclass convenience initializer as part of satisfying rule 2.

<!--
  TODO: feedback from Beto is that this note is a little hard to parse.
  Perhaps this point should be left until the later "in action" example,
  where this principle is demonstrated?
-->

<!--
  TODO: There are rare cases in which we automatically insert a call to super.init() for you.
  When is this? Either way, I need to mention it in here.
-->

### Designated and Convenience Initializers in Action

The following example shows designated initializers, convenience initializers,
and automatic initializer inheritance in action.
This example defines a hierarchy of three classes called
`Food`, `RecipeIngredient`, and `ShoppingListItem`,
and demonstrates how their initializers interact.

The base class in the hierarchy is called `Food`,
which is a simple class to encapsulate the name of a foodstuff.
The `Food` class introduces a single `String` property called `name`
and provides two initializers for creating `Food` instances:

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

The figure below shows the initializer chain for the `Food` class:

![](initializersExample01)

Classes don't have a default memberwise initializer,
and so the `Food` class provides a designated initializer
that takes a single argument called `name`.
This initializer can be used to create a new `Food` instance with a specific name:

```swift
let namedMeat = Food(name: "Bacon")
// namedMeat's name is "Bacon"
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> let namedMeat = Food(name: "Bacon")
  /> namedMeat's name is \"\(namedMeat.name)\"
  </ namedMeat's name is "Bacon"
  ```
-->

The `init(name: String)` initializer from the `Food` class
is provided as a *designated* initializer,
because it ensures that all stored properties of
a new `Food` instance are fully initialized.
The `Food` class doesn't have a superclass,
and so the `init(name: String)` initializer doesn't need to call `super.init()`
to complete its initialization.

The `Food` class also provides a *convenience* initializer, `init()`, with no arguments.
The `init()` initializer provides a default placeholder name for a new food
by delegating across to the `Food` class's `init(name: String)` with
a `name` value of `[Unnamed]`:

```swift
let mysteryMeat = Food()
// mysteryMeat's name is "[Unnamed]"
```

<!--
  - test: `designatedConvenience`

  ```swifttest
  -> let mysteryMeat = Food()
  /> mysteryMeat's name is \"\(mysteryMeat.name)\"
  </ mysteryMeat's name is "[Unnamed]"
  ```
-->

The second class in the hierarchy is a subclass of `Food` called `RecipeIngredient`.
The `RecipeIngredient` class models an ingredient in a cooking recipe.
It introduces an `Int` property called `quantity`
(in addition to the `name` property it inherits from `Food`)
and defines two initializers for creating `RecipeIngredient` instances:

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

The figure below shows the initializer chain for the `RecipeIngredient` class:

![](initializersExample02)

The `RecipeIngredient` class has a single designated initializer,
`init(name: String, quantity: Int)`,
which can be used to populate all of the properties of a new `RecipeIngredient` instance.
This initializer starts by assigning
the passed `quantity` argument to the `quantity` property,
which is the only new property introduced by `RecipeIngredient`.
After doing so, the initializer delegates up to
the `init(name: String)` initializer of the `Food` class.
This process satisfies safety check 1
from <doc:Initialization#Two-Phase-Initialization> above.

`RecipeIngredient` also defines a convenience initializer, `init(name: String)`,
which is used to create a `RecipeIngredient` instance by name alone.
This convenience initializer assumes a quantity of `1`
for any `RecipeIngredient` instance that's created without an explicit quantity.
The definition of this convenience initializer makes
`RecipeIngredient` instances quicker and more convenient to create,
and avoids code duplication when creating
several single-quantity `RecipeIngredient` instances.
This convenience initializer simply delegates across to the class's designated initializer,
passing in a `quantity` value of `1`.

The `init(name: String)` convenience initializer provided by `RecipeIngredient`
takes the same parameters as the `init(name: String)` *designated* initializer from `Food`.
Because this convenience initializer overrides a designated initializer from its superclass,
it must be marked with the `override` modifier
(as described in <doc:Initialization#Initializer-Inheritance-and-Overriding>).

Even though `RecipeIngredient` provides
the `init(name: String)` initializer as a convenience initializer,
`RecipeIngredient` has nonetheless provided an implementation of
all of its superclass's designated initializers.
Therefore, `RecipeIngredient` automatically inherits
all of its superclass's convenience initializers too.

In this example, the superclass for `RecipeIngredient` is `Food`,
which has a single convenience initializer called `init()`.
This initializer is therefore inherited by `RecipeIngredient`.
The inherited version of `init()` functions in exactly the same way as the `Food` version,
except that it delegates to the `RecipeIngredient` version of `init(name: String)`
rather than the `Food` version.

All three of these initializers can be used to create new `RecipeIngredient` instances:

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

The third and final class in the hierarchy is
a subclass of `RecipeIngredient` called `ShoppingListItem`.
The `ShoppingListItem` class models a recipe ingredient as it appears in a shopping list.

Every item in the shopping list starts out as “unpurchased”.
To represent this fact,
`ShoppingListItem` introduces a Boolean property called `purchased`,
with a default value of `false`.
`ShoppingListItem` also adds a computed `description` property,
which provides a textual description of a `ShoppingListItem` instance:

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

> Note: `ShoppingListItem` doesn't define an initializer to provide
> an initial value for `purchased`,
> because items in a shopping list (as modeled here) always start out unpurchased.

Because it provides a default value for all of the properties it introduces
and doesn't define any initializers itself,
`ShoppingListItem` automatically inherits
*all* of the designated and convenience initializers from its superclass.

The figure below shows the overall initializer chain for all three classes:

![](initializersExample03)

You can use all three of the inherited initializers
to create a new `ShoppingListItem` instance:

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

Here, a new array called `breakfastList` is created from
an array literal containing three new `ShoppingListItem` instances.
The type of the array is inferred to be `[ShoppingListItem]`.
After the array is created,
the name of the `ShoppingListItem` at the start of the array
is changed from `"[Unnamed]"` to `"Orange juice"`
and it's marked as having been purchased.
Printing the description of each item in the array
shows that their default states have been set as expected.

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

## Failable Initializers

It's sometimes useful to define a class, structure, or enumeration
for which initialization can fail.
This failure might be triggered by invalid initialization parameter values,
the absence of a required external resource,
or some other condition that prevents initialization from succeeding.

To cope with initialization conditions that can fail,
define one or more failable initializers as part of
a class, structure, or enumeration definition.
You write a failable initializer
by placing a question mark after the `init` keyword (`init?`).

> Note: You can't define a failable and a nonfailable initializer
> with the same parameter types and names.

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

A failable initializer creates an *optional* value of the type it initializes.
You write `return nil` within a failable initializer
to indicate a point at which initialization failure can be triggered.

> Note: Strictly speaking, initializers don't return a value.
> Rather, their role is to ensure that `self` is fully and correctly initialized
> by the time that initialization ends.
> Although you write `return nil` to trigger an initialization failure,
> you don't use the `return` keyword to indicate initialization success.

For instance, failable initializers are implemented for numeric type conversions.
To ensure conversion between numeric types maintains the value exactly,
use the `init(exactly:)` initializer.
If the type conversion can't maintain the value,
the initializer fails.

```swift
let wholeNumber: Double = 12345.0
let pi = 3.14159

if let valueMaintained = Int(exactly: wholeNumber) {
    print("\(wholeNumber) conversion to Int maintains value of \(valueMaintained)")
}
// Prints "12345.0 conversion to Int maintains value of 12345"

let valueChanged = Int(exactly: pi)
// valueChanged is of type Int?, not Int

if valueChanged == nil {
    print("\(pi) conversion to Int doesn't maintain value")
}
// Prints "3.14159 conversion to Int doesn't maintain value"
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let wholeNumber: Double = 12345.0
  -> let pi = 3.14159
  ---
  -> if let valueMaintained = Int(exactly: wholeNumber) {
         print("\(wholeNumber) conversion to Int maintains value of \(valueMaintained)")
     }
  <- 12345.0 conversion to Int maintains value of 12345
  ---
  -> let valueChanged = Int(exactly: pi)
  // valueChanged is of type Int?, not Int
  ---
  -> if valueChanged == nil {
         print("\(pi) conversion to Int doesn't maintain value")
     }
  <- 3.14159 conversion to Int doesn't maintain value
  ```
-->

The example below defines a structure called `Animal`,
with a constant `String` property called `species`.
The `Animal` structure also defines a failable initializer
with a single parameter called `species`.
This initializer checks if the `species` value passed to the initializer is an empty string.
If an empty string is found, an initialization failure is triggered.
Otherwise, the `species` property's value is set, and initialization succeeds:

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

You can use this failable initializer to try to initialize a new `Animal` instance
and to check if initialization succeeded:

```swift
let someCreature = Animal(species: "Giraffe")
// someCreature is of type Animal?, not Animal

if let giraffe = someCreature {
    print("An animal was initialized with a species of \(giraffe.species)")
}
// Prints "An animal was initialized with a species of Giraffe"
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let someCreature = Animal(species: "Giraffe")
  // someCreature is of type Animal?, not Animal
  ---
  -> if let giraffe = someCreature {
        print("An animal was initialized with a species of \(giraffe.species)")
     }
  <- An animal was initialized with a species of Giraffe
  ```
-->

If you pass an empty string value to the failable initializer's `species` parameter,
the initializer triggers an initialization failure:

```swift
let anonymousCreature = Animal(species: "")
// anonymousCreature is of type Animal?, not Animal

if anonymousCreature == nil {
    print("The anonymous creature couldn't be initialized")
}
// Prints "The anonymous creature couldn't be initialized"
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let anonymousCreature = Animal(species: "")
  // anonymousCreature is of type Animal?, not Animal
  ---
  -> if anonymousCreature == nil {
        print("The anonymous creature couldn't be initialized")
     }
  <- The anonymous creature couldn't be initialized
  ```
-->

> Note: Checking for an empty string value (such as `""` rather than `"Giraffe"`)
> isn't the same as checking for `nil` to indicate the absence of an *optional* `String` value.
> In the example above, an empty string (`""`) is a valid, non-optional `String`.
> However, it's not appropriate for an animal
> to have an empty string as the value of its `species` property.
> To model this restriction,
> the failable initializer triggers an initialization failure if an empty string is found.

### Failable Initializers for Enumerations

You can use a failable initializer to select an appropriate enumeration case
based on one or more parameters.
The initializer can then fail if the provided parameters
don't match an appropriate enumeration case.

The example below defines an enumeration called `TemperatureUnit`,
with three possible states (`kelvin`, `celsius`, and `fahrenheit`).
A failable initializer is used to find an appropriate enumeration case
for a `Character` value representing a temperature symbol:

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

You can use this failable initializer to choose
an appropriate enumeration case for the three possible states
and to cause initialization to fail if the parameter doesn't match one of these
states:

```swift
let fahrenheitUnit = TemperatureUnit(symbol: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// Prints "This is a defined temperature unit, so initialization succeeded."

let unknownUnit = TemperatureUnit(symbol: "X")
if unknownUnit == nil {
    print("This isn't a defined temperature unit, so initialization failed.")
}
// Prints "This isn't a defined temperature unit, so initialization failed."
```

<!--
  - test: `failableInitializers`

  ```swifttest
  -> let fahrenheitUnit = TemperatureUnit(symbol: "F")
  -> if fahrenheitUnit != nil {
        print("This is a defined temperature unit, so initialization succeeded.")
     }
  <- This is a defined temperature unit, so initialization succeeded.
  ---
  -> let unknownUnit = TemperatureUnit(symbol: "X")
  -> if unknownUnit == nil {
        print("This isn't a defined temperature unit, so initialization failed.")
     }
  <- This isn't a defined temperature unit, so initialization failed.
  ```
-->

### Failable Initializers for Enumerations with Raw Values

Enumerations with raw values automatically receive a failable initializer,
`init?(rawValue:)`,
that takes a parameter called `rawValue` of the appropriate raw-value type
and selects a matching enumeration case if one is found,
or triggers an initialization failure if no matching value exists.

You can rewrite the `TemperatureUnit` example from above
to use raw values of type `Character`
and to take advantage of the `init?(rawValue:)` initializer:

```swift
enum TemperatureUnit: Character {
    case kelvin = "K", celsius = "C", fahrenheit = "F"
}

let fahrenheitUnit = TemperatureUnit(rawValue: "F")
if fahrenheitUnit != nil {
    print("This is a defined temperature unit, so initialization succeeded.")
}
// Prints "This is a defined temperature unit, so initialization succeeded."

let unknownUnit = TemperatureUnit(rawValue: "X")
if unknownUnit == nil {
    print("This isn't a defined temperature unit, so initialization failed.")
}
// Prints "This isn't a defined temperature unit, so initialization failed."
```

<!--
  - test: `failableInitializersForEnumerations`

  ```swifttest
  -> enum TemperatureUnit: Character {
        case kelvin = "K", celsius = "C", fahrenheit = "F"
     }
  ---
  -> let fahrenheitUnit = TemperatureUnit(rawValue: "F")
  -> if fahrenheitUnit != nil {
        print("This is a defined temperature unit, so initialization succeeded.")
     }
  <- This is a defined temperature unit, so initialization succeeded.
  ---
  -> let unknownUnit = TemperatureUnit(rawValue: "X")
  -> if unknownUnit == nil {
        print("This isn't a defined temperature unit, so initialization failed.")
     }
  <- This isn't a defined temperature unit, so initialization failed.
  ```
-->

### Propagation of Initialization Failure

A failable initializer of a class, structure, or enumeration
can delegate across to another failable initializer from the same class, structure, or enumeration.
Similarly, a subclass failable initializer can delegate up to a superclass failable initializer.

In either case, if you delegate to another initializer that causes initialization to fail,
the entire initialization process fails immediately,
and no further initialization code is executed.

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

> Note: A failable initializer can also delegate to a nonfailable initializer.
> Use this approach if you need to add a potential failure state
> to an existing initialization process that doesn't otherwise fail.

The example below defines a subclass of `Product` called `CartItem`.
The `CartItem` class models an item in an online shopping cart.
`CartItem` introduces a stored constant property called `quantity`
and ensures that this property always has a value of at least `1`:

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
  ---
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

The failable initializer for `CartItem` starts by
validating that it has received a `quantity` value of `1` or more.
If the `quantity` is invalid,
the entire initialization process fails immediately
and no further initialization code is executed.
Likewise, the failable initializer for `Product`
checks the `name` value,
and the initializer process fails immediately
if `name` is the empty string.

If you create a `CartItem` instance with a nonempty name and a quantity of `1` or more,
initialization succeeds:

```swift
if let twoSocks = CartItem(name: "sock", quantity: 2) {
    print("Item: \(twoSocks.name), quantity: \(twoSocks.quantity)")
}
// Prints "Item: sock, quantity: 2"
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

If you try to create a `CartItem` instance with a `quantity` value of `0`,
the `CartItem` initializer causes initialization to fail:

```swift
if let zeroShirts = CartItem(name: "shirt", quantity: 0) {
    print("Item: \(zeroShirts.name), quantity: \(zeroShirts.quantity)")
} else {
    print("Unable to initialize zero shirts")
}
// Prints "Unable to initialize zero shirts"
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

Similarly, if you try to create a `CartItem` instance with an empty `name` value,
the superclass `Product` initializer causes initialization to fail:

```swift
if let oneUnnamed = CartItem(name: "", quantity: 1) {
    print("Item: \(oneUnnamed.name), quantity: \(oneUnnamed.quantity)")
} else {
    print("Unable to initialize one unnamed product")
}
// Prints "Unable to initialize one unnamed product"
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

### Overriding a Failable Initializer

You can override a superclass failable initializer in a subclass,
just like any other initializer.
Alternatively, you can override a superclass failable initializer
with a subclass *nonfailable* initializer.
This enables you to define a subclass for which initialization can't fail,
even though initialization of the superclass is allowed to fail.

Note that if you override a failable superclass initializer with a nonfailable subclass initializer,
the only way to delegate up to the superclass initializer
is to force-unwrap the result of the failable superclass initializer.

> Note: You can override a failable initializer with a nonfailable initializer
> but not the other way around.

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

The example below defines a class called `Document`.
This class models a document that can be initialized with
a `name` property that's either a nonempty string value or `nil`,
but can't be an empty string:

```swift
class Document {
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

The next example defines a subclass of `Document` called `AutomaticallyNamedDocument`.
The `AutomaticallyNamedDocument` subclass overrides
both of the designated initializers introduced by `Document`.
These overrides ensure that an `AutomaticallyNamedDocument` instance has
an initial `name` value of `"[Untitled]"`
if the instance is initialized without a name,
or if an empty string is passed to the `init(name:)` initializer:

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

The `AutomaticallyNamedDocument` overrides its superclass's
failable `init?(name:)` initializer with a nonfailable `init(name:)` initializer.
Because `AutomaticallyNamedDocument` copes with the empty string case
in a different way than its superclass,
its initializer doesn't need to fail,
and so it provides a nonfailable version of the initializer instead.

You can use forced unwrapping in an initializer
to call a failable initializer from the superclass
as part of the implementation of a subclass's nonfailable initializer.
For example, the `UntitledDocument` subclass below is always named `"[Untitled]"`,
and it uses the failable `init(name:)` initializer
from its superclass during initialization.

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

In this case, if the `init(name:)` initializer of the superclass
were ever called with an empty string as the name,
the forced unwrapping operation would result in a runtime error.
However, because it's called with a string constant,
you can see that the initializer won't fail,
so no runtime error can occur in this case.

### The init! Failable Initializer

You typically define a failable initializer
that creates an optional instance of the appropriate type
by placing a question mark after the `init` keyword (`init?`).
Alternatively, you can define a failable initializer that creates
an implicitly unwrapped optional instance of the appropriate type.
Do this by placing an exclamation point after the `init` keyword (`init!`)
instead of a question mark.

You can delegate from `init?` to `init!` and vice versa,
and you can override `init?` with `init!` and vice versa.
You can also delegate from `init` to `init!`,
although doing so will trigger an assertion
if the `init!` initializer causes initialization to fail.

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

## Required Initializers

Write the `required` modifier before the definition of a class initializer
to indicate that every subclass of the class must implement that initializer:

```swift
class SomeClass {
    required init() {
        // initializer implementation goes here
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

You must also write the `required` modifier before
every subclass implementation of a required initializer,
to indicate that the initializer requirement applies to further subclasses in the chain.
You don't write the `override` modifier when overriding a required designated initializer:

```swift
class SomeSubclass: SomeClass {
    required init() {
        // subclass implementation of the required initializer goes here
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

> Note: You don't have to provide an explicit implementation of a required initializer
> if you can satisfy the requirement with an inherited initializer.

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

## Setting a Default Property Value with a Closure or Function

If a stored property's default value requires some customization or setup,
you can use a closure or global function to provide
a customized default value for that property.
Whenever a new instance of the type that the property belongs to is initialized,
the closure or function is called,
and its return value is assigned as the property's default value.

These kinds of closures or functions typically create
a temporary value of the same type as the property,
tailor that value to represent the desired initial state,
and then return that temporary value to be used as the property's default value.

Here's a skeleton outline of how a closure can be used
to provide a default property value:

```swift
class SomeClass {
    let someProperty: SomeType = {
        // create a default value for someProperty inside this closure
        // someValue must be of the same type as SomeType
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

Note that the closure's end curly brace is followed by an empty pair of parentheses.
This tells Swift to execute the closure immediately.
If you omit these parentheses,
you are trying to assign the closure itself to the property,
and not the return value of the closure.

<!--
  TODO: feedback from Peter is that this is very close to the syntax for
  a computed property that doesn't define a separate getter.
  He's right, and it would be good to provide an additional example -
  perhaps with a stored property that's assigned the result of a function -
  to make the difference more explicit.
-->

> Note: If you use a closure to initialize a property,
> remember that the rest of the instance hasn't yet been initialized
> at the point that the closure is executed.
> This means that you can't access any other property values from within your closure,
> even if those properties have default values.
> You also can't use the implicit `self` property,
> or call any of the instance's methods.

The example below defines a structure called `Chessboard`,
which models a board for the game of chess.
Chess is played on an 8 x 8 board,
with alternating black and white squares.

![](chessBoard)

To represent this game board,
the `Chessboard` structure has a single property called `boardColors`,
which is an array of 64 `Bool` values.
A value of `true` in the array represents a black square
and a value of `false` represents a white square.
The first item in the array represents the top left square on the board
and the last item in the array represents the bottom right square on the board.

The `boardColors` array is initialized with a closure to set up its color values:

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

Whenever a new `Chessboard` instance is created, the closure is executed,
and the default value of `boardColors` is calculated and returned.
The closure in the example above calculates and sets
the appropriate color for each square on the board
in a temporary array called `temporaryBoard`,
and returns this temporary array as the closure's return value
once its setup is complete.
The returned array value is stored in `boardColors`
and can be queried with the `squareIsBlackAt(row:column:)` utility function:

```swift
let board = Chessboard()
print(board.squareIsBlackAt(row: 0, column: 1))
// Prints "true"
print(board.squareIsBlackAt(row: 7, column: 7))
// Prints "false"
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
