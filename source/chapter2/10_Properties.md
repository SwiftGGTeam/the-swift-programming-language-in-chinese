# 属性 (Properties)

**属性**将值跟特定的类、结构或枚举关联。一种是存储属性，把常量或变量的值作为实例的一部分，一种是计算属性，它计算一个值。计算属性可以用于类、结构和枚举里，存储属性只能用于类和结构。

存储属性和计算属性通常用于特定类型的实例，但是，属性也可以直接用于类型本身，这种属性称为类属性。

另外，还可以定义属性观察者来监控属性值的变化，以此来触发一个自定义的操作。属性观察者可以添加到自己写的存储属性上，也可以添加到从父类继承的属性上。

## 存储属性

简单来说，一个存储属性就是一个特定类型实例里表示常量或变量的部分，存储属性可以是*变量存储属性*（用关键字`var`定义），也可以是*常量存储属性*（用关键字`let`定义）。

可以在定义存储属性的时候指定默认值，详见[默认属性值](#)一节。也可以在初始化阶段设置或修改存储属性的值，甚至修改常量存储属性的值，详见[在初始化阶段修改常量存储属性](#)一节。

下面的例子定义了一个名为`FixedLengthRange`的结构体，表示一个在创建后无法修改整数范围的类型：

```
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
// the range represents integer values 0, 1, and 2
rangeOfThreeItems.firstValue = 6
// the range now represents integer values 6, 7, and 8

```

`FixedLengthRange`的实例包含一个名为`firstValue`的变量存储属性和一个名为`length`的常量存储属性。在上面的例子中，`length`在创建实例的时候被赋值，因为它是一个常量存储属性，所以再无法修改它的值。

### 常量和存储属性

如果创建了一个结构体的实例并赋值给一个常量，则无法修改实例的任何属性，即使定义了变量存储属性：

```
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
// this range represents integer values 0, 1, 2, and 3
rangeOfFourItems.firstValue = 6
// this will report an error, even thought firstValue is a variable property

```

因为`rangeOfFourItems`声明成了常量（用`let`关键字），即使`firstValue`是一个变量属性，也无法再修改属性它的值。

这种行为是由于结构体（struct）属于*值类型*。当值类型的实例被声明为常量的时候，它的所有属性也就成了常量。

属于*引用类型*的类（class）则不一样，把一个引用类型的实例赋给一个常量后，仍然可以修改实例的变量属性。

### 延迟存储属性

延迟存储属性是指当第一次被调用的时候才有初始值的属性。在属性声明前使用`@lazy`特性来表示一个延迟存储属性。

> 注意
> 
> 必须将延迟存储属性声明成变量（使用`var`关键字），因为可能在实例构造完成之前属性的值无法得到。常量属性在构造过程完成之前必须要有初始值，因此无法声明成延迟属性。

延迟属性很有用，当属性的值依赖于在实例的构造过程结束前无法知道具体值的外部因素时，或者当属性的值需要复杂或大量计算时，可以只在需要的时候来计算它。

下面复合类的例子使用了延迟存储属性来避免不必要的初始化。例子中定义了`DataImporter`和`DataManager`两个类，下面是部分代码：

```
class DataImporter {
    /*
    DataImporter is a class to import data from an external file.
    The class is assumed to take a non-trivial amount of time to initialize.
    */
    var fileName = "data.txt"
    // the DataImporter class would provide data importing functionality here
}
 
class DataManager {
    @lazy var importer = DataImporter()
    var data = String[]()
    // the DataManager class would provide data management functionality here
}
 
let manager = DataManager()
manager.data += "Some data"
manager.data += "Some more data"
// the DataImporter instance for the importer property has not yet been created

```

`DataManager`类包含一个名为`data`的存储属性，初始值是一个空的字符串（`String`）数组。虽然没有写出全部代码，`DataManager`类的目的是管理和提供对这个字符串数组的访问。

`DataManager`的一个功能是从文件导入数据，该功能由`DataImporter`类提供，它需要一定的时间来处理。因为它需要在实例化之后打开文件、读取文件内容到内存。

`DataManager`也可以不从文件中导入数据，所以当`DataManager`的实例被创建时，就没有必要创建一个`DataImporter`的实例。同时，更有意义的是当用到`DataImporter`的时候才去创建它。

由于使用了`@lazy`特性（Attribute），`importer`属性只有在第一次被访问的时候才被创建。比如访问它的属性`fileName`时：

```
println(manager.importer.fileName)
// the DataImporter instance for the importer property has now been created
// prints "data.txt”

```

### 存储属性和实例变量

如果您有过Objective-C经验，应该知道有2种方式在类实例存储值和引用。对于属性来说，也可以使用实例变量作为属性值的后端存储。

Swift编程语言中把这些理论统一用属性来实现。Swift中的属性没有对应的实例变量，属性的后端存储也无法直接访问。这就避免了不同场景下访问方式的困扰，同时也将属性的定义简化成一个语句。
一个类型中属性的全部信息——包括命名、类型和内存管理特征——都在唯一一个地方定义。

## 计算属性

除存储属性外，类、结构体和枚举可以定义*计算属性*，计算属性不直接存储值，而是提供一个getter来获取值，一个可选的setter来间接设置值。

```
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
    get {
        let centerX = origin.x + (size.width / 2)
        let centerY = origin.y + (size.height / 2)
        return Point(x: centerX, y: centerY)
    }
    set(newCenter) {
        origin.x = newCenter.x - (size.width / 2)
        origin.y = newCenter.y - (size.height / 2)
    }
    }
}
var square = Rect(origin: Point(x: 0.0, y: 0.0),
    size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = square.center
square.center = Point(x: 15.0, y: 15.0)
println("square.origin is now at (\(square.origin.x), \(square.origin.y))")
// prints "square.origin is now at (10.0, 10.0)”

```

这个例子定义了3个几何形状的结构体：

- `Point`封装了一个`(x, y)`的坐标
- `Size`封装了一个`width`和`height`
- `Rect`表示一个有原点和尺寸的矩形

`Rect`也提供了一个名为`center`的计算属性。一个矩形的中心点可以从原点和尺寸来算出，所以不需要将它以显式声明的`Point`来保存。`Rect`的计算属性`center`提供了自定义的getter和setter来获取和设置矩形的中心点，就像它有一个存储属性一样。

例子中接下来创建了一个名为`square`的`Rect`实例，初始值原点是`(0, 0)`，宽度高度都是`10`。如图所示蓝色正方形。

`square`的`center`属性可以通过点运算符（`square.center`）来访问，这会调用getter来获取属性的值。跟直接返回已经存在的值不同，getter实际上通过计算然后返回一个新的`Point`实例表示`square`的中心点。如代码所示，它正确返回了中心点`(5, 5)`。

`center`属性之后被设置了一个新的值`(15, 15)`，表示向右上方移动正方形到如图所示橙色正方形的位置。设置属性`center`的值会调用setter来修改属性`origin`的`x`和`y`的值，从而实现移动正方形到新的位置。

![Computed Properties sample](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/computedProperties_2x.png)