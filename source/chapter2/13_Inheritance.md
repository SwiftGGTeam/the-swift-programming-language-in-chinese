# 继承

一个类可以继承另一个类的方法，属性和其它特性。当一个类继承其它类，继承类叫子类，被继承类叫超类（或父类）。在Swift中，继承是区分「类」与其它类型的一个基本特征。

在Swift中，类可以调用和访问超类的方法，属性和下标，并且可以重写（override）这些方法，属性和下标来优化或修改它们的行为。Swift会检查你的重写定义在超类中是否有匹配的定义，以此确保你的重写行为是正确的。

可以为类中继承来的属性添加属性观察者（property observer），这样一来，当属性值改变时，类就会被通知到。可以为任何属性添加属性观察者，无论它原本被定义为存储型属性（stored property）还是计算型属性（computed property）。

## 定义一个基类

不继承于其它类的类，称之为基类。

> 注意：Swift中的类并不是从一个通用的基类继承而来。如果你不为你定义的类指定一个超类的话，这个类就自动成为基类。

下面的例子定义了一个叫`Vehicle`的基类。这个基类声明了两个对所有车辆都通用的属性（`numberOfWheels`和`maxPassengers`）。这些属性在`description`方法中使用，这个方法返回一个`String`类型的，对车辆特征的描述：

    class Vehicle {
        var numberOfWheels: Int
        var maxPassengers: Int
        func description() -> String {
            return "\(numberOfWheels) wheels; up to \(maxPassengers) passengers"
        }
        init() {
            numberOfWheels = 0
            maxPassengers = 1
        }
    }

`Vehicle`类定义了初始化器（initializer）来设置属性的值。初始化器会在[构造函数]()一节中详细介绍，这里我们做一下简单介绍，以便于讲解子类中继承来的属性可以如何被修改。

初始化器用于创建某个类型的一个新实例。尽管初始化器并不是方法，但在语法上，两者很相似。初始化器的工作是准备新实例以供使用，并确保实例中的所有属性都拥有有效的初始化值。

初始化器的最简单形式就像一个没有参数的实例方法，使用`init`关键字：

    init() {
        // perform some initialization here
    }

如果要创建一个`Vehicle`类的新实例，使用初始化器语法调用上面的初始化器，即类名后面跟一个空的小括号：

    let someVehicle = Vehicle()

这个`Vehicle`类的初始化器为任意的一辆车设置一些初始化属性值（`numberOfWheels = 0 `和`maxPassengers = 1`）。

`Vehicle`类定义了车辆的共同特性，但这个类本身并没太大用处。为了使它更为实用，你需要进一步细化它来描述更具体的车辆。

## Subclassing

## Overriding

## Preventing Overrides
