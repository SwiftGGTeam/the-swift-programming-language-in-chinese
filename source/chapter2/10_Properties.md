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
// the range now represents integer values 6, 7, and 8”

```

`FixedLengthRange`的实例包含一个名为`firstValue`的变量存储属性和一个名为`length`的常量存储属性。在上面的例子中，`length`在创建实例的时候被赋值，因为它是一个常量存储属性，所以再无法修改它的值。

## 常量化结构体实例中的存储属性

如果创建了一个结构体的实例并赋值给一个常量，则无法修改实例的任何属性，即使定义了变量存储属性：

```
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
// this range represents integer values 0, 1, 2, and 3
rangeOfFourItems.firstValue = 6
// this will report an error, even thought firstValue is a variable property”

```
