# 方法(Methods)

**方法**是与某些特定类型相关联的功能/函数。类、结构体、枚举都可以定义实例方法；实例方法为指定类型的实例封装了特定的任务与功能。类、结构体、枚举也可以定义类(型)方法(type itself)；类型方法与类型自身相关联。类型方法与Objective-C中的类方法(class methods)相似。

在Swift中,结构体和枚举能够定义方法；事实上这是Swift与C/Objective-C的主要区别之一。在Objective-C中,类是唯一能定义方法的类型。在Swift中，你能够选择是否定义一个类/结构体/枚举，并且你仍然享有在你创建的类型(类/结构体/枚举)上定义方法的灵活性。

### 实例方法(Instance Methods)

**实例方法**是某个特定类、结构体或者枚举类型的实例的方法。实例方法支撑实例的功能: 或者提供方法,以访问和修改实例属性;或者提供与实例的目的相关的功能。实例方法的语法与函数完全一致，参考[函数说明](functions.md "函数说明")。

实例方法要写在它所属的类型的前后括号之间。实例方法能够访问他所属类型的所有的其他实例方法和属性。实例方法只能被它所属的类的特定实例调用。实例方法不能被孤立于现存的实例而被调用。

下面是定义一个很简单的类`Counter`的例子(`Counter`能被用来对一个动作发生的次数进行计数):

```
class Counter {
  var count = 0
  func increment() {
    count++
  }
  func incrementBy(amount: Int) {
    count += amount
  }
  func reset() {
    count = 0
  }
}
```

`Counter`类定理了三个实例方法：
- `increment`让计数器按一递增；
- `incrementBy(amount: Int)`让计数器按一个指定的整数值递增；
- `reset`将计数器重置为0。

`Counter`这个类还声明了一个可变属性`count`，用它来保持对当前计数器值的追踪。

和调用属性一样，用点语法(dot syntax)调用实例方法:

```
 let counter = Counter()
 // the initial counter value is 0
 counter.increment()
 // the counter's value is now 1
 counter.incrementBy(5)
 // the counter's value is now 6
 counter.reset()
 // the counter's value is now 0
```

### 方法的局部参数名称和外部参数名称(Local and External Parameter Names for Methods)

函数参数有一个局部名称(在函数体内部使用)和一个外部名称(在调用函数时使用),参考[External Parameter Names](external_parameter_names.md)。对于方法参数也是这样，因为方法就是函数(只是这个函数与某个类型相关联了)。但是，方法和函数的局部名称和外部名称的默认行为是不一样的。

Swift中的方法和Objective-C中的方法极其相似。像在Objective-C中一样，Swift中方法的名称通常用一个介词指向方法的第一个参数，比如：`with`,`for`,`by`等等。前面的`Counter`类的例子中`incrementBy`方法就是这样的。介词的使用让方法在被调用时能像一个句子一样被解读。Swift这种方法命名约定很容易落实,因为它是用不同的默认处理方法参数的方式，而不是用函数参数(来实现的)。

具体来说，Swift默认仅给方法的第一个参数名称一个局部参数名称;但是默认同时给第二个和后续的参数名称局部参数名称和外部参数名称。
这个约定与典型的命名和调用约定相匹配，这与你在写Objective-C的方法时很相似。这个约定还让expressive method调用不需要再检查/限定参数名。

看看下面这个`Counter`的替换版本（它定义了一个更复杂的`incrementBy`方法）：

```
class Counter {
  var count: Int = 0
  func incrementBy(amount: Int, numberOfTimes: Int) {
    count += amount * numberOfTimes
  }
}
```

`incrementBy`方法有两个参数： `amount`和`numberOfTimes`。默认地，Swift只把`amount`当作一个局部名称，但是把`numberOfTimes`即看作本地名称又看作外部名称。下面调用这个方法：

```
let counter = Counter()
counter.incrementBy(5, numberOfTimes: 3)
// counter value is now 15
```

你不必为第一个参数值再定义一个外部变量名：因为从函数名`incrementBy`已经能很清楚地看出它的目的/作用。但是第二个参数，就要被一个外部参数名称所限定,以便在方法被调用时让他目的/作用明确。

这种默认的行为能够有效的检查方法，比如你在参数numberOfTimes前写了个井号( `#` )时:

```
func incrementBy(amount: Int, #numberOfTimes: Int) {
 count += amount * numberOfTimes
}
```

这种默认行为使上面代码意味着：在Swift中定义方法使用了与Objective-C同样的语法风格，并且方法将以自然表达式的方式被调用。

### 修改外部参数名称(Modifying External Parameter Name Behavior for Methods)

有时为方法的第一个参数提供一个外部参数名称是非常有用的，尽管这不是默认的行为。你可以自己添加一个明确的外部名称;你也可以用一个hash符号作为第一个参数的前缀，然后用这个局部名字作为外部名字。

相反，如果你不想为方法的第二个及后续的参数提供一个外部名称，你可以通过使用下划线(`_`)作为该参数的显式外部名称来覆盖默认行为。

### `self`属性(The self Property)

类型的每一个实例都有一个隐含属性叫做`self`，它完全等同于这个实力变量本身。你可以在一个实例的实例方法中使用这个隐含的`self`属性来引用当前实例。

上面例子中的`increment`方法可以被写成这样：
```
func increment() {
  self.count++
}
```

实际上，你不必在你的代码里面经常写`self`。不论何时，在一个方法中使用一个已知的属性或者方法名称，如果你没有明确的写`self`，Swift假定你是指当前实例的属性或者方法。这种假定在上面的`Counter`中已经示范了：`Counter`中的三个实例方法中都使用的是`count`(而不是`self.count`)

这条规则的主要例外发生在当实例方法的某个参数名称与实例的某个属性名称相同时。
在这种情况下，参数名称享有优先权，并且在引用属性时必须使用一种更恰当(被限定更严格)的方式。
你可以使用隐藏的`self`属性来区分参数名称和属性名称。

下面的例子演示了`self`消除方法参数`x`和实例属性`x`之间的歧义：

```
struct Point {
  var x = 0.0, y = 0.0
  func isToTheRightOfX(x: Double) -> Bool {
    return self.x > x
  }
}
let somePoint = Point(x: 4.0, y: 5.0)
if somePoint.isToTheRightOfX(1.0) {
  println("This point is to the right of the line where x == 1.0")
}
// prints "This point is to the right of the line where x == 1.0"
```

如果不使用`self`前缀，Swift就认为两次使用的`x`都指的是名称为`x`的函数参数。

### 在实例方法中修改值类型(Modifying Value Types from Within Instance Methods)

结构体和枚举是**值类型**[Structures and Enumerations Are Value Types]("#")。一般情况下，值类型的属性不能在他的实例方法中被修改。

但是，如果你确实需要在某个具体的方法中修改结构体或者枚举的属性，你可以选择`变异(mutating)`这个方法。方法可以从内部变异它的属性；并且它做的任何改变在方法结束时都会回写到原始结构。方法会给它隐含的`self`属性赋值一个全新的实例,这个新实例在方法结束后将替换原来的实例。

要`变异`方法, 将关键字`mutating` 放到方法的`func`关键字之前就可以了：

```
struct Point {
  var x = 0.0, y = 0.0
  mutating func moveByX(deltaX: Double, y deltaY: Double) {
    x += deltaX
    y += deltaY
  }
}
var somePoint = Point(x: 1.0, y: 1.0)
somePoint.moveByX(2.0, y: 3.0)
println("The point is now at (\(somePoint.x), \(somePoint.y))")
// prints "The point is now at (3.0, 4.0)"
```

上面的Point结构体定义了一个变异方法(mutating method)`moveByX`，`moveByX`用来移动一个point。`moveByX`方法在被调用时修改了这个point,而不是返回一个新的point。方法定义是加上那个了`mutating`关键字,所以方法可以修改值类型的属性了。

注意：不能在结构体类型的常量上调用变异方法,因为常量的属性不能被改变,就算你想改变的是常量的可变属性也不行，参考[Stored Properties of Constant Structure Instances]("#")

```
let fixedPoint = Point(x: 3.0, y: 3.0)
fixedPoint.moveByX(2.0, y: 3.0)
// this will report an error
```
### 在变异方法中给self赋值(Assigning to self Within a Mutating Method)

变异方法能够赋给隐含属性`self`一个全新的实例。上面`Point`的例子可以用下面的方式改写：

```
struct Point {
  var x = 0.0, y = 0.0
  mutating func moveByX(deltaX: Double, y deltaY: Double) {
    self = Point(x: x + deltaX, y: y + deltaY)
  }
}
```

新版的变异方法`moveByX`创建了一个新的分支结构(他的x和y的值都被设定为目标值了)。调用这个版本的方法和调用上个版本的最终结果是一样的。

枚举的变异方法可以让`self`从相同的枚举设置为不同的成员。

```
enum TriStateSwitch {
  case Off, Low, High
  mutating func next() {
    switch self {
    case Off:
      self = Low
    case Low:
      self = High
    case High:
      self = Off
    }
  }
}
var ovenLight = TriStateSwitch.Low
ovenLight.next()
// ovenLight is now equal to .High
ovenLight.next()
// ovenLight is now equal to .Off
```

上面的例子中定义了一个三态开关的枚举。每次调用`next`方法时，开关在不同的电源状态(`Off`,`Low`,`High`)之前循环切换。

### 类型方法(Type Methods)
