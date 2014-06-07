#扩展（Extensions）

----

本页包含内容：

-   扩展语法（Extension Syntax）
-   计算属性（Computed Properties）
-   构造器（Initializers）
-   方法（Methods）
-   下标（Subscripts）
-   嵌套类型（Nested Types）

*扩展*就是向一个已有的类、结构体或枚举类型添加新功能（functionality）。这包括在没有权限获取原始源代码的情况下扩展类型的能力（即*逆向建模*）。扩展和Objective-C中的分类(categories)类似。（不过与Objective-C不同的是，Swift的扩展没有名字。）

Swift中的扩展可以：

-   添加计算属性和计算静态属性
-   定义实例方法和类型方法
-   提供新的构造器
-   定义下标
-   定义和使用新的嵌套类型
-   使一个已有类型符合某个接口

注意

如果你定义了一个扩展向一个已有类型添加新功能，那么这个新功能对该类型的所有已有实例中都是可用的，即使它们是在你的这个扩展之前定义的。

##扩展语法

声明一个扩展使用关键字`extension`：

```javascript
extension SomeType{
 // new functionality to add to SomeType goes here
}
```

一个扩展可以扩展一个已有类型，使其能够适配一个或多个接口。当这种情况发生时，接口的名字应该完全按照类或结构体的名字的方式进行书写：

```javascript
extension SomeType: SomeProtocol, AnotherProctocol{
 // implementation of protocol requirments goes here
}
```

按照这种方式添加的接口一致性被称之为**给扩展添加接口一致性(Protocal Conformance)**


##计算属性

扩展可以向已有类型添加计算实例属性和计算类型属性。下面的例子向Swift的内建`Double`类型添加了5个计算实例属性，从而提供与距离单位协作的基本支持。

```javascript
extension Double{
 var km: Double { return self * 1_000.0 }
 var m : Double { return self }
 var cm: Double { return self / 100.0 }
 var mm: Double { return self / 1_000.0 }
 var ft: Double { return self / 3.28084 }
}
let oneInch = 25.4.mm
println("One inch is \\(oneInch) meters")
// prints "One inch is 0.0254 meters"
let threeFeet = 3.ft
println("Three feet is \\(threeFeet) meters")
// prints "Three feet is 0.914399970739201 meters"
```

这些计算属性表达的含义是把一个`Double`型的值看作是某单位下的长度值。即使它们被实现为计算属性，但这些属性仍可以接一个带有dot语法的浮点型字面值，而这恰恰是使用这些浮点型字面量实现距离转换的方式。

在上述例子中，一个`Double`型的值`1.0`被用来表示“1米”。这就是为什么`m`计算属性返回`self`——表达式`1.m`被认为是计算`1.0`的`Double`值。

其它单位则需要一些转换来表示在米下测量的值。1千米等于1,000米，所以`km`计算属性要把值乘以`1_000.00`来转化成单位米下的数值。类似地，1米有3.28024英尺，所以`ft`计算属性要把对应的`Double`值除以`3.28024`来实现英尺到米的单位换算。

这些属性是只读的计算属性，所有从简考虑它们不用`get`关键字表示。它们的返回值是`Double`型，而且可以用于所有接受`Double`的数学计算中：

```javascript
let aMarathon = 42.km \+ 195.m
println("A marathon is \\(aMarathon) meters long")
// prints "A marathon is 42495.0 meters long"
```

注意

扩展可以添加新的计算属性，但是不可以添加存储属性，也不可以向已有属性添加属性观测器(property observers)。

##构造器

扩展可以向已有类型添加新的构造器。这可以让你扩展其它类型，将你自己的定制类型作为构造器参数，或者提供该类型的原始实现中没有包含的额外初始化选项。

扩展可以向一个类添加新的便捷构造器，但是无法添加新的制定构造器，也无法添加析构器。指定的构造器和析构器必须由原始的类实现来提供。

注意

如果你使用扩展向一个值类型添加一个构造器，该构造器向所有的存储属性提供默认值，而且没有定义任何定制构造器（custom initializers），那么对于来自你的扩展构造器中的值类型，你可以调用默认构造器(default initializers)和成员级构造器(memberwise initializer)。

正如在值类型的构造器授权中描述的，如果你已经把构造器写成值类型原始实现的一部分，上述规则不再适用。

下面的例子定义了一个用于描述几何矩形的定制结构体`Rect`。这个例子同时定义了两个辅助结构体`Size`和`Point`，它们都把`0.0`作为所有属性的默认值：
```javascript
struct Size{
 var width = 0.0, height = 0.0
}
struct Point{
 var x = 0.0, y = 0.0
}
struct Rect{
 var origin = Point()
 var size = Size()
}
```

因为结构体`Rect`提供了其所有属性的默认值，所以正如默认构造器中描述的，它可以自动接受一个默认的构造器和一个成员级构造器。这些构造器可以用于构造新的`Rect`实例：

```javascript
let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0), 
    size: Size(width: 5.0, height: 5.0))
```

你可以提供一个额外的使用特殊中心点和大小的构造器来扩展`Rect`结构体：
```javascript
extension Rect{
 init(center: Point, size: Size){
 let originX = center.x \- (size.width / 2)
 let originY = center.y \- (size.height / 2)
 self.init(origin: Point(x: originX, y: originY), size: size)
 }
}
```

这个新的构造器首先根据提供的`center`和`size`值计算一个合适的原点。然后调用该结构体自动的成员构造器`init(origin:size:)`，该构造器将新的原点和大小存到了合适的属性中：
```javascript
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
// centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)
```

注意

如果你使用扩展提供了一个新的构造器，你依旧有责任保证构造过程能够让所有实例完全初始化。