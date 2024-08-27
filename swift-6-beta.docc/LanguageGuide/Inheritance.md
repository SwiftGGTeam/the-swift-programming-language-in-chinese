# 继承

通过子类化来添加或重写功能。

一个类可以从另一个类*继承*方法、属性和其他特性。当一个类从另一个类继承时，继承的类被称为*子类*，而被它继承的类被称为*父类*。继承是 Swift 中区别类与其他类型的基本特性。

Swift 中的类可以调用和访问属于其父类的方法、属性和下标，并且可以通过重写这些方法、属性和下标来优化或修改他们的行为。Swift 通过检查重写定义是否与父类定义相匹配来帮助确保您的覆盖是正确的。

类还可以为继承的属性添加属性观察器，以便在属性值发生变化时得到通知。无论最初是定义为存储属性还是计算属性，都可以为任何属性添加属性观察器。

## 定义基类

如果一个类没有继承其他类，那他就是一个基类。

> 注意: Swift 中没有统一的基类，所有类的起源都是平等的。您不指定父类的类会自动成为基类。

下面的示例定义了一个名为 `Vehicle` 的基类。这个基类定义了一个名为 `currentSpeed` 的存储属性，默认值为 `0.0`（推断出属性类型为 `Double`）。`currentSpeed` 属性的值被一个只读计算 `String` 属性 `description` 用于创建车辆的描述。

`Vehicle` 基类还定义了一个名为 `makeNoise()` 的方法。这个方法对于基类 Vehicle 的实例不会做任何事情，但稍后会被 `Vehicle` 的子类自定义：

```swift
class Vehicle {
    var currentSpeed = 0.0
    var description: String {
        return "traveling at \(currentSpeed) miles per hour"
    }
    func makeNoise() {
        // 不做任何事情 - 不是任何一辆车都会发出噪音。
    }
}
```

<!--
  - test: `inheritance`

  ```swifttest
  -> class Vehicle {
        var currentSpeed = 0.0
        var description: String {
           return "traveling at \(currentSpeed) miles per hour"
        }
        func makeNoise() {
           // 不做任何事情 - 不是任何一辆车都会发出噪音。
        }
     }
  ```
-->

您可以使用*构造语法*创建一个新的 `Vehicle` 实例，写作类型名后跟一对空括号：

```swift
let someVehicle = Vehicle()
```

<!--
  - test: `inheritance`

  ```swifttest
  -> let someVehicle = Vehicle()
  ```
-->

创建了一个新的 `Vehicle` 实例后，您可以访问它的 `description` 属性来打印车辆当前速度的描述:

```swift
print("Vehicle: \(someVehicle.description)") 
// Vehicle: traveling at 0.0 miles per hour
```

<!--
  - test: `inheritance`

  ```swifttest
  -> print("Vehicle: \(someVehicle.description)")
  </ Vehicle: traveling at 0.0 miles per hour
  ```
-->

`Vehicle` 类定义了任意车辆的通用特性，但本身并不太有用。要使其更有用，您需要对其进行完善以描述更具体的车辆类型。

## 子类化

*子类化*是基于现有类创建新类的行为。子类继承现有类的特性，然后您可以对其进行完善。您还可以向子类添加新的特性。

要指示子类有一个父类，请在父类名前写子类名，中间用冒号分隔：

```swift
class SomeSubclass: SomeSuperclass {
    // 子类定义在这里
}
```

<!--
  - test: `protocolSyntax`

  ```swifttest
  >> class SomeSuperclass {}
  -> class SomeSubclass: SomeSuperclass {
        // subclass definition goes here
     }
  ```
-->

下面的示例定义了一个名为 `Bicycle` 的子类，它的父类是 `Vehicle`：

```swift
class Bicycle: Vehicle {
    var hasBasket = false
}
```

<!--
  - test: `inheritance`

  ```swifttest
  -> class Bicycle: Vehicle {
        var hasBasket = false
     }
  ```
-->

新的 `Bicycle` 类自动获得了 `Vehicle` 的所有特性，例如它的 `currentSpeed` 和 `description` 属性以及 `makeNoise()` 方法。

除了继承的特性之外，`Bicycle` 类还定义了一个新的存储属性 `hasBasket`，默认值为 `false` （推断该属性的类型为 `Bool`）。

默认情况下，您创建的任何新 `Bicycle` 实例都默认没有篮子。在创建实例后，您可以将特定 `Bicycle` 实例的 `hasBasket` 属性设置为 `true`：

```swift
let bicycle = Bicycle()
bicycle.hasBasket = true
```

<!--
  - test: `inheritance`

  ```swifttest
  -> let bicycle = Bicycle()
  -> bicycle.hasBasket = true
  ```
-->

您还可以修改 `Bicycle` 实例继承的 `currentSpeed` 属性，并查询实例继承的 `description` 属性：

```swift
bicycle.currentSpeed = 15.0
print("Bicycle: \(bicycle.description)")
// Bicycle: traveling at 15.0 miles per hour
```

<!--
  - test: `inheritance`

  ```swifttest
  -> bicycle.currentSpeed = 15.0
  -> print("Bicycle: \(bicycle.description)")
  </ Bicycle: traveling at 15.0 miles per hour
  ```
-->

子类本身也可以被子类化。下一个示例创建了一个 `Bicycle` 的子类，用于双人自行车，称为 “tandem”：

```swift
class Tandem: Bicycle {
    var currentNumberOfPassengers = 0
}
```

<!--
  - test: `inheritance`

  ```swifttest
  -> class Tandem: Bicycle {
        var currentNumberOfPassengers = 0
     }
  ```
-->

`Tandem` 继承了 `Bicycle` 的所有属性和方法，而 `Bicycle` 又继承了 `Vehicle` 的所有属性和方法。`Tandem` 子类还添加了一个名为 `currentNumberOfPassengers` 的新存储属性，默认值为 `0`。

如果您创建一个 `Tandem` 实例，您可以使用它的任何新属性和继承的属性，并查询它从 `Vehicle` 继承的只读属性：`description`

```swift
let tandem = Tandem()
tandem.hasBasket = true
tandem.currentNumberOfPassengers = 2
tandem.currentSpeed = 22.0
print("Tandem: \(tandem.description)")
// Tandem: traveling at 22.0 miles per hour
```

<!--
  - test: `inheritance`

  ```swifttest
  -> let tandem = Tandem()
  -> tandem.hasBasket = true
  -> tandem.currentNumberOfPassengers = 2
  -> tandem.currentSpeed = 22.0
  -> print("Tandem: \(tandem.description)")
  </ Tandem: traveling at 22.0 miles per hour
  ```
-->

## 重写

子类可以提供自己的自定义实现来覆盖它将从父类继承的实例方法、类型方法、实例属性、类型属性或下标。这被称为*重写*。

要重写将被继承的特性，您需要在重写定义前加上 `override` 关键字。这样做可以明确您打算提供重写，而不是由于疏忽而提供了相同的定义。无意间的重写可能会导致意外行为，任何没有 `override` 关键字的重写在编译代码时都会被诊断为错误。

`override` 关键字还会提示 Swift 编译器检查您的重写类的父类（或其父类之一）是否有与您提供的重写定义相匹配的声明。这个检查可以确保您的重写定义是正确的。

### 访问父类方法、属性和下标

当您为子类提供方法、属性或下标重写时，有时使用现有父类实现作为重写的一部分是很有用的。例如，您可以改进现有实现的行为，或在现有继承的变量中存储修改后的值。

在适当的情况下，您可以使用 `super` 前缀来访问父类的方法、属性或下标：

- 一个被重写的名为 `someMethod()` 的方法可以在重写方法实现中通过调用 `super.someMethod()` 来调用父类版本的 `someMethod()`。
- 一个被重写的名为 `someProperty` 的属性可以在重写的 getter 或 setter 实现中通过 `super.someProperty` 来访问父类版本的 `someProperty`。
- 一个被重写的针对 `someIndex` 的下标可以在重写的下标实现中通过 `super[someIndex]` 来访问同一下标的父类版本。

### 重写方法

您可以重写继承的实例或类型方法，以在子类中提供该方法的定制或替代实现。

下面的示例定义了一个名为 `Train` 的新 `Vehicle` 子类，它重写了从 `Vehicle` 继承的 `makeNoise()` 方法:

```swift
class Train: Vehicle {
    override func makeNoise() {
        print("Choo Choo")
    }
}
```

<!--
  - test: `inheritance`

  ```swifttest
  -> class Train: Vehicle {
        override func makeNoise() {
           print("Choo Choo")
        }
     }
  ```
-->

如果您创建一个新的 `Train` 实例并调用它的 `makeNoise()` 方法，您可以看到调用了 `Train` 子类版本的方法:

```swift
let train = Train()
train.makeNoise()
// 打印 "Choo Choo"
```

<!--
  - test: `inheritance`

  ```swifttest
  -> let train = Train()
  -> train.makeNoise()
  <- Choo Choo
  ```
-->

### 重写属性

您可以重写继承的实例或类型属性，为该属性提供自己的自定义 getter 和 setter，或添加属性观察器以使重写的属性能够观察底层属性值的变化。

#### 重写属性 Getter 和 Setter

您可以为任何继承的属性提供自定义 getter（如果需要的话还有 setter），无论继承的属性在源码中是作为存储属性还是计算属性实现的。子类不知道继承属性的存储或计算性质，它只知道继承的属性有一个特定的名称和类型。您必须始终声明要重写的属性的名称和类型，以便编译器检查您的重写与父类中具有相同名称和类型的属性相匹配。

您可以通过在子类属性重写中提供 getter 和 setter 来将继承的只读属性表示为可读写属性。但是您不能将继承的可读写属性声明为只读属性。

> 如果您在属性重写中提供了 setter，您也必须为该重写提供 getter。如果您不想在重写的 getter 中修改继承属性的值。您可以简单地通过从 getter 返回 `super.someProperty` 来传递继承的值。其中 `someProperty` 是您正在重写的属性的名称。

下面的示例定义了一个名为 `Car` 的新类，它是 `Vehicle` 的子类。`Car` 类引入了一个名为 `gear` 的新存储属性，默认整数值为 `1`。`Car` 类还重写了它从 `Vehicle` 继承的 `description` 属性，以提供包含当前档位的自定义描述:

```swift
class Car: Vehicle {
    var gear = 1
    override var description: String {
        return super.description + " in gear \(gear)"
    }
}
```

<!--
  - test: `inheritance`

  ```swifttest
  -> class Car: Vehicle {
        var gear = 1
        override var description: String {
           return super.description + " in gear \(gear)"
        }
     }
  ```
-->

`description` 属性的重写首先调用 `super.description`，它返回 `Vehicle` 类的 `description` 属性。然后,`Car` 类的 `description` 版本在此描述的末尾添加了一些额外文本，以提供有关当前档位的信息。

如果您创建 `Car` 类的实例并设置其 `gear` 和 `currentSpeed` 属性，您可以看到它的 `description` 属性返回在 `Car` 类中定义的定制描述：

```swift
let car = Car()
car.currentSpeed = 25.0
car.gear = 3
print("Car: \(car.description)")
// 打印 "Car: traveling at 25.0 miles per hour in gear 3"
```

<!--
  - test: `inheritance`

  ```swifttest
  -> let car = Car()
  -> car.currentSpeed = 25.0
  -> car.gear = 3
  -> print("Car: \(car.description)")
  </ Car: traveling at 25.0 miles per hour in gear 3
  ```
-->

#### 重写属性观察器

您可以使用属性重写的方式为继承的属性添加属性观察器。这样无论该属性最初是如何实现的，您都能够在继承属性的值发生变化时得到通知。有关属性观察器的更多信息，请参阅 <doc:Properties#Property-Observers>。

> 注意: 你无法为继承的常量存储属性或继承的只读计算属性添加属性观察器。这些属性的值无法被修改，所以在重写时提供 `willSet` 或 `didSet` 实现是不合适的。
> 
> 另请注意，你不能为同一属性提供重写的 setter 和重写的属性观察器。如果你想观察属性值的变化，并且你已经为该属性提供了自定义 setter，你可以简单地在自定义 setter 中观察任何值的变化。

以下示例创建了一个名为 `AutomaticCar` 的新类，它继承自 `Car` 类。`AutomaticCar` 类表示一辆带有自动变速箱的汽车，根据当前速度自动选择合适的挡位：

```swift
class AutomaticCar: Car {
    override var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
```

<!--
  - test: `inheritance`

  ```swifttest
  -> class AutomaticCar: Car {
        override var currentSpeed: Double {
           didSet {
              gear = Int(currentSpeed / 10.0) + 1
           }
        }
     }
  ```
-->

每当你设置 `AutomaticCar` 实例的 `currentSpeed` 属性时，该属性的 `didSet` 观察器会根据新速度为实例的 `gear` 属性设置一个合适的挡位。具体来说，属性观察器选择一个挡位，该挡位是新 `currentSpeed` 值除以 10 向下取整后加 1。速度为 `35.0` 时会挂 `4` 挡:

```swift
let automatic = AutomaticCar()
automatic.currentSpeed = 35.0
print("AutomaticCar: \(automatic.description)")
// AutomaticCar: traveling at 35.0 miles per hour in gear 4
```

<!--
  - test: `inheritance`

  ```swifttest
  -> let automatic = AutomaticCar()
  -> automatic.currentSpeed = 35.0
  -> print("AutomaticCar: \(automatic.description)")
  </ AutomaticCar: traveling at 35.0 miles per hour in gear 4
  ```
-->

## 防止重写

你可以通过将其标记为 *final* 来防止方法、属性或下标被重写。在方法、属性或下标的引入关键字前写 `final` 修饰符。（如 `final var`、`final func`、`final class func` 和 `final subscript`）


任何尝试在子类中重写 final 方法、属性或下标的行为都会在编译时报错。你在扩展中添加到类的方法、属性或下标也可以在扩展的定义中标记为 final。有关更多信息，请参阅 <doc:Extensions>。

<!--
  - test: `finalPreventsOverriding`

  ```swifttest
  -> class C {
        final var someVar = 0
        final func someFunction() {
           print("In someFunction")
        }
     }
  -> class D : C {
        override var someVar: Int {
           get { return 1 }
           set {}
        }
        override func someFunction() {
           print("In overridden someFunction")
        }
     }
  !$ error: property overrides a 'final' property
  !! override var someVar: Int {
  !! ^
  !$ note: overridden declaration is here
  !! final var someVar = 0
  !! ^
  !$ error: instance method overrides a 'final' instance method
  !! override func someFunction() {
  !! ^
  !$ note: overridden declaration is here
  !! final func someFunction() {
  !! ^
  ```
-->

你可以通过在类定义（`final class`）中在 `class` 关键字前写 `final` 修饰符来将整个类标记为 final。任何尝试子类化 final 类的行为都会在编译时报错。

<!--
  - test: `finalClassPreventsOverriding`

  ```swifttest
  -> final class C {
        var someVar = 0
        func someFunction() {
           print("In someFunction")
        }
     }
  -> class D : C {
        override var someVar: Int {
           get { return 1 }
           set {}
        }
        override func someFunction() {
           print("In overridden someFunction")
        }
     }
  !$ error: property overrides a 'final' property
  !!      override var someVar: Int {
  !!                   ^
  !$ note: overridden declaration is here
  !!      var someVar = 0
  !!          ^
  !$ error: instance method overrides a 'final' instance method
  !!      override func someFunction() {
  !!                    ^
  !$ note: overridden declaration is here
  !!      func someFunction() {
  !!           ^
  !$ error: inheritance from a final class 'C'
  !! class D : C {
  !!       ^
  ```
-->

<!--
  TODO: 我应该在这里提供一个示例。
-->

<!--
  TODO: 提供有关函数签名的更多信息，
  以及什么构成了函数签名的唯一性。
  例如，参数名称不需要与父类中的类似签名匹配才能重写。
  （这对于两种函数声明语法都是正确的）
-->

<!--
  TODO: 提及在重写使用可选类型或未经检查的可选类型的方法时，
  可以返回更具体的类型，并接受更不具体的类型。
  TODO: 重写类型方法
  ~~~~~~~~~~~~~~~~~
-->

> 测试版软件: 
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实施的软件应使用最终操作系统软件进行测试。
>
> 了解有关使用 [Apple 测试版软件](https://developer.apple.com/support/beta-software/) 的更多信息.


<!--
此源文件属于 Swift.org 开源项目的一部分

版权所有 (c) 2014 - 2022 Apple Inc. 及 Swift 项目作者
根据 Apache License v2.0 许可证及运行库例外条款授权

有关许可证信息，请参见 https://swift.org/LICENSE.txt
有关 Swift 项目作者的列表，请参见 https://swift.org/CONTRIBUTORS.txt
-->