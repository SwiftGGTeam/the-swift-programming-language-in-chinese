# 属性

访问属于实例或类型的存储值和计算值。

**属性**将值与特定的类、结构或枚举关联。存储属性将常量和变量值作为实例的一部分进行存储，而计算属性则计算（而不是存储）一个值。计算属性由类、结构和枚举提供。存储属性仅由类和结构体提供。

<!--
  - test: `enumerationsCantProvideStoredProperties`

  ```swifttest
  -> enum E { case a, b; var x = 0 }
  !$ error: enums must not contain stored properties
  !! enum E { case a, b; var x = 0 }
  !! ^
  ```
-->

存储和计算属性通常与特定类型的实例相关联。然而，属性也可以与类型本身相关联。这种属性称为类型属性。

另外，还可以定义属性观察器来监控属性值的变化，以此来触发自定义的操作。属性观察器可以添加到类本身定义的存储属性上，也可以添加到从父类继承的属性上。

<!--  
  - test: `propertyObserverIntroClaims`

  ```swifttest
  -> class C {
        var x: Int = 0 {
           willSet { print("C willSet x to \(newValue)") }
           didSet { print("C didSet x from \(oldValue)") }
        }
     }
  -> class D: C {
        override var x: Int {
           willSet { print("D willSet x to \(newValue)") }
           didSet { print("D didSet x from \(oldValue)") }
        }
     }
  -> var c = C(); c.x = 42
  <- C willSet x to 42
  <- C didSet x from 0
  -> var d = D(); d.x = 42
  <- D willSet x to 42
  <- C willSet x to 42
  <- C didSet x from 0
  <- D didSet x from 0
  ```
-->

你也可以利用属性包装器在多个属性的 getter 和 setter 中复用代码。

## 存储属性

简单来说，存储属性是作为特定类或结构实例的一部分所存储的常量或变量。存储属性可以是*变量存储属性*（用关键字 `var` 定义）
也可以是*常量存储属性*（用关键字 `let` 定义）。

可以在定义存储属性的时候指定默认值，请参考 <doc:Initialization#Default-Property-Values> 一节。还可以在构造过程中设置和修改存储属性的初始值，甚至修改常量存储属性的值，请参考 <doc:Initialization#Assigning-Constant-Properties-During-Initialization> 一节。

下面的例子定义了一个名为 `FixedLengthRange`的结构体，该结构体用于描述整数的区间，且这个区间值在被创建后不能被修改。

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
// 该区间表示整数 0，1，2
rangeOfThreeItems.firstValue = 6
// 该区间现在表示整数 6，7，8
```

<!--
  - test: `storedProperties, storedProperties-err`

  ```swifttest
  -> struct FixedLengthRange {
        var firstValue: Int
        let length: Int
     }
  -> var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
  // the range represents integer values 0, 1, and 2
  -> rangeOfThreeItems.firstValue = 6
  // the range now represents integer values 6, 7, and 8
  ```
-->

`FixedLengthRange` 的实例包含一个名为 `firstValue`的变量存储属性和一个名为 `length`的常量存储属性。在上面的例子中， `length` 在创建实例的时候被初始化，且之后无法修改它的值，因为它是一个常量属性。

### 常量结构体实例的存储属性

如果创建了一个结构体实例并将其赋值给一个常量，则无法修改该实例的任何属性，即使它们被声明为可变属性：

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
// 该区间表示整数 0，1，2，3
rangeOfFourItems.firstValue = 6
// 尽管 firstValue 是个可变属性，但这里还是会报错
```

<!--
  - test: `storedProperties-err`

  ```swifttest
  -> let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
  // this range represents integer values 0, 1, 2, and 3
  -> rangeOfFourItems.firstValue = 6
  !$ error: cannot assign to property: 'rangeOfFourItems' is a 'let' constant
  !! rangeOfFourItems.firstValue = 6
  !! ~~~~~~~~~~~~~~~~ ^
  !$ note: change 'let' to 'var' to make it mutable
  !! let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
  !! ^~~
  !! var
  // 尽管 firstValue 是个可变属性，但这里还是会报错
  ```
-->

因为 `rangeOfFourItems` 被声明为常量（使用 `let` 关键字），所以即使 `firstValue` 是一个可变属性，也无法再修改它了。

这种行为是由于结构体属于**值类型**。当值类型的实例被声明为常量的时候，它的所有属性也就成了常量。

属于*引用类型*的类别则不一样，把一个引用类型的实例赋给一个常量后，依然可以修改该实例的可变属性。

<!--
  TODO: this explanation could still do to be improved.
-->

### 延时加载存储属性

<!--
  QUESTION: is this section too complex for this point in the book?
  Should it go in the Default Property Values section of Initialization instead?
-->

*延时加载存储属性*是指当第一次被调用的时候才会计算其初始值的属性。在属性声明前使用 `lazy` 来标示一个延时加载存储属性。

> 注意: 
> 必须将延时加载属性声明成变量（使用 `var` 关键词），因为属性的初始值可能在实例构造完成之后才会得到。而常量属性在构造过程完成之前必须要有初始值，因此无法声明成延时加载。

<!--
  - test: `lazyPropertiesMustAlwaysBeVariables`

  ```swifttest
  -> class C { lazy let x = 0 }
  !$ error: 'lazy' cannot be used on a let
  !! class C { lazy let x = 0 }
  !! ^~~~~
  !!-
  ```
-->

延时加载属性在属性的初始值依赖于外部因素，且这些因素的值在实例初始化完成后才会知道时非常有用。或者当获得属性的值因为需要复杂或者大量的计算，而应该采用需要的时候再计算的方式，延时加载属性也会很有用。

<!--
  TODO: add a note that if you assign a value to a lazy property before first access,
  the initial value you give in your code will be ignored.
-->

下面的例子使用了延时加载存储属性来避免复杂类中不必要的初始化工作。例子中定义了 `DataImporter` 和 `DataManager` 两个类，下面是部分代码：

```swift
class DataImporter {
    /*
    DataImporter 是一个负责将外部文件中的数据导入的类。
    这个类的初始化会消耗不少时间。
    */
    var filename = "data.txt"
    // 这里会提供数据导入功能
}

class DataManager {
    lazy var importer = DataImporter()
    var data: [String] = []
    // 这里会提供数据管理功能
}

let manager = DataManager()
manager.data.append("Some data")
manager.data.append("Some more data")
// DataImporter 实例的 importer 属性还没有被创建
```

<!--
  - test: `lazyProperties`

  ```swifttest
  -> class DataImporter {
        /*
        DataImporter is a class to import data from an external file.
        The class is assumed to take a nontrivial amount of time to initialize.
        */
        var filename = "data.txt"
        // the DataImporter class would provide data importing functionality here
  >>    init() {
  >>       print("the DataImporter instance for the importer property has now been created")
  >>    }
     }
  ---
  -> class DataManager {
        lazy var importer = DataImporter()
        var data: [String] = []
        // the DataManager class would provide data management functionality here
     }
  ---
  -> let manager = DataManager()
  -> manager.data.append("Some data")
  -> manager.data.append("Some more data")
  // the DataImporter instance for the importer property hasn't yet been created
  ```
-->

`DataManager` 类包含一个名为 `data`的存储属性，初始值是一个空的字符串数组。这里没有给出全部代码，只需知道 `DataManager` 类的目的是管理和提供对这个字符串数组的访问即可。

`DataManager` 的一个功能是从文件中导入数据。这个功能由 `DataImporter` 类提供，`DataImporter` 完成初始化需要消耗不少时间：因为它的实例在初始化时可能需要打开文件并读取文件中的内容到内存中。

`DataManager` 管理数据时也可能不从文件中导入数据。所以当 `DataManager` 的实例被创建时，不会创建一个 `DataImporter` 的实例，更明智的做法是第一次用到 `DataManager` 的时候才去创建它。

由于使用了 `lazy`，`DataImporter` 的实例 `importer` 属性只有在第一次被访问的时候才被创建。比如访问它的属性 `filename` 的时候：

```swift
print(manager.importer.filename)
// DataImporter 实例的 importer 属性现在被创建了
// 输出“data.txt”
```

<!--
  - test: `lazyProperties`

  ```swifttest
  -> print(manager.importer.filename)
  </ the DataImporter instance for the importer property has now been created
  <- data.txt
  ```
-->

> 注意: 
> 如果一个被标记为 `lazy` 的属性在没有初始化时就同时被多个线程访问，则无法保证该属性只会被初始化一次。

<!--
  6/19/14, 10:54 PM [Contributor 7746]: @lazy isn't thread safe.  Global variables (and static struct/enum fields) *are*.
-->

### 存储属性和实例变量

如果你有过使用 Objective-C 的经验，应该知道 Objective-C 为类实例存储值和引用提供了两种方法。除了属性之外，还可以使用实例变量作为一个备份存储将变量值赋值给属性。

Swift 编程语言中把这些理论统一用属性来实现。Swift 中的属性没有对应的实例变量，属性的备份存储也无法直接访问。这就避免了不同场景下访问方式的困扰，同时也将属性的定义简化成一个语句。属性的全部信息——包括命名、类型和内存管理特征——作为类型定义的一部分，都定义在一个地方。

<!--
  TODO: what happens if one property of a constant structure is an object reference?
-->

## 计算属性

除存储属性外，类、结构体和枚举还可以定义计算属性。计算属性不直接存储值，而是提供一个 getter 和一个可选的 setter，来间接获取和设置其他属性或变量的值。

```swift
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
// initialSquareCenter 位于（5.0， 5.0）
square.center = Point(x: 15.0, y: 15.0)
print("square.origin is now at (\(square.origin.x), \(square.origin.y))")
// 打印“square.origin is now at (10.0, 10.0)”
```

<!--
  - test: `computedProperties`

  ```swifttest
  -> struct Point {
        var x = 0.0, y = 0.0
     }
  -> struct Size {
        var width = 0.0, height = 0.0
     }
  -> struct Rect {
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
  -> var square = Rect(origin: Point(x: 0.0, y: 0.0),
        size: Size(width: 10.0, height: 10.0))
  -> let initialSquareCenter = square.center
  /> initialSquareCenter is at (\(initialSquareCenter.x), \(initialSquareCenter.y))
  </ initialSquareCenter is at (5.0, 5.0)
  -> square.center = Point(x: 15.0, y: 15.0)
  -> print("square.origin is now at (\(square.origin.x), \(square.origin.y))")
  <- square.origin is now at (10.0, 10.0)
  ```
-->

此示例定义了三个用于处理几何形状的结构：

- `Point` 封装了一个点的 x 和 y 坐标。
- `Size` 包含 `width` 和 `height`.
- `Rect` 通过一个原点和大小来定义一个矩形。

`Rect` 还提供了一个名为 `center` 的计算属性。`Rect` 的当前中心位置始终可以从其原点和大小确定，因此不需要将中心点以 `Point` 类型的值来存储。`Rect` 的计算属性 `center`提供了自定义的 getter 和 setter 来获取和设置矩形的中心点，就像它有一个存储属性一样。

上面的示例创建了一个名为 `square` 的 `Rect` 变量，初始值原点是 `(0, 0)`，宽度和高度均为 `10`。如下图中的浅绿色正方形所示。

`square` 的 `center` 属性可以通过点运算符（`square.center`）来访问，这会调用该属性的 getter 来获取它的值。跟直接返回已经存在的值不同，getter 实际上是通过计算然后返回一个新的 `Point` 来表示 `square` 的中心点，如代码所示，它正确返回了中心点 `(5, 5)`。

将 `center` 属性设置为新的值 `(15, 15)`，会将正方形向上和向右移动，移动到下图中深绿色正方形所示的新位置。设置 `center` 属性会调用 `center` 的 setter，修改存储的 `origin` 属性的 `x` 和 `y` 值，从而将正方形移动到新的位置。

<!-- Apple Books screenshot begins here. -->

![](computedProperties)

### 简化 Setter 声明

如果计算属性的 setter 没有为要设置的新值定义名称，则默认会使用 `newValue` 作为名称。这里是利用这种简写方式的 `Rect` 结构体的另一个版本：

```swift
struct AlternativeRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            let centerX = origin.x + (size.width / 2)
            let centerY = origin.y + (size.height / 2)
            return Point(x: centerX, y: centerY)
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

<!--
  - test: `computedProperties`

  ```swifttest
  -> struct AlternativeRect {
        var origin = Point()
        var size = Size()
        var center: Point {
           get {
              let centerX = origin.x + (size.width / 2)
              let centerY = origin.y + (size.height / 2)
              return Point(x: centerX, y: centerY)
           }
           set {
              origin.x = newValue.x - (size.width / 2)
              origin.y = newValue.y - (size.height / 2)
           }
        }
     }
  ```
-->

<!-- Apple Books screenshot ends here. -->

### 简化 Getter 声明

如果 getter 的主体是一个单一表达式，那么 getter 会隐式返回该表达式。这里是另一个利用这种 getter 和 setter 简写方式的 `Rect` 结构体版本：

```swift
struct CompactRect {
    var origin = Point()
    var size = Size()
    var center: Point {
        get {
            Point(x: origin.x + (size.width / 2),
                  y: origin.y + (size.height / 2))
        }
        set {
            origin.x = newValue.x - (size.width / 2)
            origin.y = newValue.y - (size.height / 2)
        }
    }
}
```

<!--
  - test: `computedProperties`

  ```swifttest
  -> struct CompactRect {
        var origin = Point()
        var size = Size()
        var center: Point {
           get {
              Point(x: origin.x + (size.width / 2),
                    y: origin.y + (size.height / 2))
           }
           set {
              origin.x = newValue.x - (size.width / 2)
              origin.y = newValue.y - (size.height / 2)
           }
        }
     }
  ```
-->

省略 getter 中的 `return` 遵循与函数省略 `return` 相同的规则，详见 <doc:Functions#Functions-With-an-Implicit-Return>。

### 只读计算属性

只有 getter 而没有 setter 的计算属性被称为*只读计算属性*。只读计算属性总是返回一个值，可以通过点运算符访问，但不能设置为其他值。

> 注意: 
> 你必须将计算属性——包括只读计算属性——声明为使用 `var` 关键字的变量属性，因为它们的值并非固定的。`let` 关键字只用于常量属性，表示它们的值在实例初始化时设置后就无法更改。

<!--
  - test: `readOnlyComputedPropertiesMustBeVariables`

  ```swifttest
  -> class C {
        let x: Int { return 42 }
        let y: Int { get { return 42 } set {} }
     }
  !! /tmp/swifttest.swift:2:15: error: 'let' declarations cannot be computed properties
  !! let x: Int { return 42 }
  !! ~~~        ^
  !! var
  !! /tmp/swifttest.swift:3:15: error: 'let' declarations cannot be computed properties
  !! let y: Int { get { return 42 } set {} }
  !! ~~~        ^
  !! var
  ```
-->

可以通过省略 `get` 关键字和它的花括号来简化只读计算属性的声明：

```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double {
        return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
// 打印 "the volume of fourByFiveByTwo is 40.0"
```

<!--
  - test: `computedProperties`

  ```swifttest
  -> struct Cuboid {
        var width = 0.0, height = 0.0, depth = 0.0
        var volume: Double {
           return width * height * depth
        }
     }
  -> let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
  -> print("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
  <- the volume of fourByFiveByTwo is 40.0
  ```
-->

这个示例定义了一个名为 `Cuboid` 的新结构体，用于表示一个具有 `width`、`height` 和 `depth` 属性的三维立方体。该结构体还包含一个名为 `volume` 的只读计算属性，用于计算并返回立方体的当前体积。`volume` 属性不应是可设置的，因为这样会导致对于应使用哪些 `width`、`height` 和 `depth` 值来计算特定体积产生歧义。然而，`Cuboid` 提供一个只读计算属性来让外部用户了解其当前计算的体积是非常有用的。

<!--
  NOTE: getters and setters are also allowed for constants and variables
  that aren't associated with a particular class or struct.
  Where should this be mentioned?
-->

<!--
  TODO: Anything else from https://[Internal Staging Server]/docs/StoredAndComputedVariables.html
-->

<!--
  TODO: Add an example of a computed property for an enumeration
  (now that the Enumerations chapter no longer has an example of this itself).
-->

## 属性观察器

属性观察器用于监测并响应属性值的变化。每次属性值被设置时，无论新值是否与当前值相同，属性观察器都会被调用。

<!--
  - test: `observersAreCalledEvenIfNewValueIsTheSameAsOldValue`

  ```swifttest
  -> class C { var x: Int = 0 { willSet { print("willSet") } didSet { print("didSet") } } }
  -> let c = C()
  -> c.x = 24
  <- willSet
  <- didSet
  -> c.x = 24
  <- willSet
  <- didSet
  ```
-->

属性观察器可以添加在以下位置：

- 自定义的存储属性
- 继承的存储属性
- 继承的计算属性

对于继承的属性，可以通过在子类中重写该属性来添加属性观察器。对于自定义的计算属性，应使用属性的 setter 来观察和响应值的变化，而不是试图创建一个观察器。重写属性的相关内容详见 <doc:Inheritance#Overriding>。

<!--
  - test: `lazyPropertiesCanHaveObservers`

  ```swifttest
  >> class C {
        lazy var x: Int = 0 {
           willSet { print("C willSet x to \(newValue)") }
           didSet { print("C didSet x from \(oldValue)") }
        }
     }
  >> let c = C()
  >> print(c.x)
  << 0
  >> c.x = 12
  << C willSet x to 12
  << C didSet x from 0
  >> print(c.x)
  << 12
  ```
-->

<!--
  - test: `storedAndComputedInheritedPropertiesCanBeObserved`

  ```swifttest
  -> class C {
        var x = 0
        var y: Int { get { return 42 } set {} }
     }
  -> class D: C {
        override var x: Int {
           willSet { print("D willSet x to \(newValue)") }
           didSet { print("D didSet x from \(oldValue)") }
        }
        override var y: Int {
           willSet { print("D willSet y to \(newValue)") }
           didSet { print("D didSet y from \(oldValue)") }
        }
     }
  -> var d = D()
  -> d.x = 42
  <- D willSet x to 42
  <- D didSet x from 0
  -> d.y = 42
  <- D willSet y to 42
  <- D didSet y from 42
  ```
-->

可以为属性添加以下一个或两个观察器：

- `willSet` 在值存储之前被调用。
- `didSet` 在新值存储之后立即被调用。

如果实现了 `willSet` 观察器，新的属性值会作为一个常量参数传递。可以在 `willSet` 实现中为这个参数指定名称。如果没有在实现中写出参数名称和括号，则该参数将以默认名称 `newValue` 提供。

同样地，如果实现了 `didSet` 观察器，旧的属性值会作为一个常量参数传递。可以命名这个参数，也可以使用默认名称 `oldValue`。如果在 `didSet` 观察器内为属性赋值，所分配的新值将覆盖刚刚设置的值。

<!--
  - test: `assigningANewValueInADidSetReplacesTheNewValue`

  ```swifttest
  -> class C { var x: Int = 0 { didSet { x = -273 } } }
  -> let c = C()
  -> c.x = 24
  -> print(c.x)
  <- -273
  ```
-->

> 注意: 
> 父类属性的 `willSet` 和 `didSet` 观察器会在子类初始化器中设置属性时调用，此时父类的初始化器已经被调用。而在父类初始化器被调用之前，给子类的属性赋值时不会调用子类属性的观察器。
>
> 有关初始化器代理的更多信息，请参见 <doc:Initialization#Initializer-Delegation-for-Value-Types> 和 <doc:Initialization#Initializer-Delegation-for-Class-Types>。

<!--
  - test: `observersDuringInitialization`

  ```swifttest
  -> class C {
        var x: Int { willSet { print("willSet x") } didSet { print("didSet x") } }
        init(x: Int) { self.x = x }
     }
  -> let c = C(x: 42)
  -> c.x = 24
  <- willSet x
  <- didSet x
  -> class C2: C {
        var y: Int { willSet { print("willSet y") } didSet { print("didSet y") } }
        init() {
            self.y = 1
            print("calling super")
            super.init(x: 100)
            self.x = 10
        }
     }
  -> let c2 = C2()
  <- calling super
  <- willSet x
  <- didSet x
  ```
-->

下面是一个 `willSet` 和 `didSet` 实际应用的例子。以下示例定义了一个名为 `StepCounter` 的新类，用于跟踪一个人在行走时所走的总步数。这个类可以与计步器或其他步数计数器的输入数据配合使用，以记录一个人在日常锻炼中的活动情况。

```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet(newTotalSteps) {
            print("About to set totalSteps to \(newTotalSteps)")
        }
        didSet {
            if totalSteps > oldValue  {
                print("Added \(totalSteps - oldValue) steps")
            }
        }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// 将 totalSteps 的值设置为 200
// 增加了 200 步
stepCounter.totalSteps = 360
// 将 totalSteps 的值设置为 360
// 增加了 160 步
stepCounter.totalSteps = 896
// 将 totalSteps 的值设置为 896
// 增加了 536 步
```

<!--
  - test: `storedProperties`

  ```swifttest
  -> class StepCounter {
        var totalSteps: Int = 0 {
           willSet(newTotalSteps) {
              print("About to set totalSteps to \(newTotalSteps)")
           }
           didSet {
              if totalSteps > oldValue  {
                 print("Added \(totalSteps - oldValue) steps")
              }
           }
        }
     }
  -> let stepCounter = StepCounter()
  -> stepCounter.totalSteps = 200
  </ About to set totalSteps to 200
  </ Added 200 steps
  -> stepCounter.totalSteps = 360
  </ About to set totalSteps to 360
  </ Added 160 steps
  -> stepCounter.totalSteps = 896
  </ About to set totalSteps to 896
  </ Added 536 steps
  ```
-->

`StepCounter` 类声明了一个名为 `totalSteps` 的 `Int` 类型属性。这是一个具有 `willSet` 和 `didSet` 观察器的存储属性。

当 `totalSteps` 属性被赋予新值时，这些观察器都会被调用，即使新值与当前值相同也是如此。

这个例子中的 `willSet` 观察器为即将设置的新值使用了自定义参数名称 `newTotalSteps`，在这里，它简单地打印出即将被设置的值。

`didSet` 观察器在 `totalSteps` 的值更新后被调用。它将 `totalSteps` 的新值与旧值进行比较。如果步数总数增加了，则会打印一条消息，指示增加了多少步数。`didSet` 观察器没有为旧值提供自定义参数名称，使用的是默认名称 `oldValue`。

> 注意: 
> 如果将一个具有观察器的属性作为 in-out 参数传递给函数，那么 `willSet` 和 `didSet` 观察器总是会被调用。这是因为 in-out 参数的复制-写回内存模型：在函数结束时，值总是会被写回属性。关于 in-out 参数行为的详细讨论，请参见 <doc:Declarations#In-Out-Parameters>。

<!--
  - test: `observersCalledAfterInout`

  ```swifttest
  -> var a: Int = 0 {
         willSet { print("willSet") }
         didSet { print("didSet") }
     }
  -> func f(b: inout Int) { print("in f") }
  -> f(b: &a)
  << in f
  << willSet
  << didSet
  ```
-->

<!--
  TODO: If you add a property observer to a stored property of structure type,
  that property observer is fired whenever any of the subproperties
  of that structure instance are set. This is cool, but nonobvious.
  Provide an example of it here.
-->

## 属性包装器

属性包装器在管理属性存储方式的代码和定义属性的代码之间添加了一层分离。例如，如果有一些属性需要提供线程安全检查或将其底层数据存储在数据库中，那么你必须在每个属性上编写这些代码。而使用属性包装器时，只需在定义包装器时编写一次管理代码，然后通过将其应用于多个属性来重复使用这些管理代码。

要定义属性包装器，需要创建一个结构体、枚举或类，并定义一个 `wrappedValue` 属性。在下面的代码中，`TwelveOrLess` 结构体确保它所包装的值始终不大于 12。如果试图存储更大的数字，它会将数字存储为 12。

```swift
@propertyWrapper
struct TwelveOrLess {
    private var number = 0
    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, 12) }
    }
}
```

<!--
  - test: `small-number-wrapper, property-wrapper-expansion`

  ```swifttest
  -> @propertyWrapper
  -> struct TwelveOrLess {
         private var number = 0
         var wrappedValue: Int {
             get { return number }
             set { number = min(newValue, 12) }
         }
     }
  ```
-->

<!--
  No init(wrappedValue:) in this example -- that's in a later example.
  Always initializing the wrapped value is a simpler starting point.
-->

setter 确保新值不大于 12，而 getter 返回存储的值。

> 注意: 
> 上例中 `number` 的声明被标记为 `private`，这确保了 `number` 只能在 `TwelveOrLess` 的实现中使用。其他地方的代码只能通过 `wrappedValue` 的 getter 和 setter 来访问这个值，而不能直接使用 `number`。关于 `private` 的更多信息，请参见 <doc:AccessControl>。

<!--
  In this example,
  the number is stored in the wrapper's private ``number`` property,
  but you could write a version of ``EvenNumber``
  that implements ``wrappedValue`` as a stored property
  and uses ``didSet`` to ensure the number is always even.

  However, the general framing we use in the docs
  is that didSet is mostly for reacting to the new value,
  not changing it,
  so I'm not highlighting that fact here.
  The order of operations for willSet, set, and didSet is well defined,
  but might be something you have to pay attention to.
-->

<!--
  - test: `stored-property-wrappedValue`

  ```swifttest
  >> @propertyWrapper
  >> struct TwelveOrLess {
  >>     var wrappedValue: Int = 0 {
  >>         didSet {
  >>             if wrappedValue > 12 {
  >>                 wrappedValue = 12
  >>             }
  >>         }
  >>     }
  >> }
  >> struct SomeStructure {
  >>     @TwelveOrLess var someNumber: Int
  >> }
  >> var s = SomeStructure()
  >> print(s.someNumber)
  << 0
  >> s.someNumber = 10
  >> print(s.someNumber)
  << 10
  >> s.someNumber = 21
  >> print(s.someNumber)
  << 12
  ```
-->

可以通过在属性前作为特性写上包装器的名称来应用包装器。下面是一个存储矩形的结构体，使用 `TwelveOrLess` 属性包装器来确保其尺寸始终不超过 12：

```swift
struct SmallRectangle {
    @TwelveOrLess var height: Int
    @TwelveOrLess var width: Int
}

var rectangle = SmallRectangle()
print(rectangle.height)
// 打印 "0"

rectangle.height = 10
print(rectangle.height)
// 打印 "10"

rectangle.height = 24
print(rectangle.height)
// 打印 "12"
```

<!--
  - test: `small-number-wrapper`

  ```swifttest
  -> struct SmallRectangle {
  ->     @TwelveOrLess var height: Int
  ->     @TwelveOrLess var width: Int
  -> }
  ---
  -> var rectangle = SmallRectangle()
  -> print(rectangle.height)
  <- 0
  ---
  -> rectangle.height = 10
  -> print(rectangle.height)
  <- 10
  ---
  -> rectangle.height = 24
  -> print(rectangle.height)
  <- 12
  ```
-->

`height` 和 `width` 属性的初始值来自 `TwelveOrLess` 的定义，其中将 `TwelveOrLess.number` 设置为0。`TwelveOrLess` 中的 setter 将 10 视为有效值，因此将数字 10 存储在 `rectangle.height` 中的操作能成功。然而，24 超出了 `TwelveOrLess` 允许的范围，因此尝试存储 24 最终会将 `rectangle.height` 设置为 12，这是允许的最大值。

当为属性应用包装器时，编译器会生成代码，为包装器提供存储空间，并通过包装器提供对属性的访问。（属性包装器负责存储被包装的值，因此不会为此生成代码。）可以编写代码使用属性包装器的行为，而不必利用特殊的特性语法。例如，下面是前面代码示例中 `SmallRectangle` 的一个版本，它明确的将其属性包装在 `TwelveOrLess` 结构体中，而不是将 `@TwelveOrLess` 写作一个特性：

```swift
struct SmallRectangle {
    private var _height = TwelveOrLess()
    private var _width = TwelveOrLess()
    var height: Int {
        get { return _height.wrappedValue }
        set { _height.wrappedValue = newValue }
    }
    var width: Int {
        get { return _width.wrappedValue }
        set { _width.wrappedValue = newValue }
    }
}
```

<!--
  - test: `property-wrapper-expansion`

  ```swifttest
  -> struct SmallRectangle {
         private var _height = TwelveOrLess()
         private var _width = TwelveOrLess()
         var height: Int {
             get { return _height.wrappedValue }
             set { _height.wrappedValue = newValue }
         }
         var width: Int {
             get { return _width.wrappedValue }
             set { _width.wrappedValue = newValue }
         }
     }
  ```
-->

`_height` 和 `_width` 属性存储了属性包装器 `TwelveOrLess` 的一个实例。`height` 和 `width` 的 getter 和 setter 包装了对 `wrappedValue` 属性的访问。

### 设置被包装属性的初始值

上面示例中的代码通过在 `TwelveOrLess` 的定义中为 `number` 赋予初始值来设置被包装属性的初始值。使用该属性包装器的代码不能为被 `TwelveOrLess` 包装的属性指定不同的初始值——例如，`SmallRectangle` 的定义不能为 `height` 或 `width` 赋予初始值。为了支持设置初始值或其他自定义，属性包装器需要添加一个构造器。这里是 `TwelveOrLess` 的扩展版本，名为 `SmallNumber`，它定义了可以设置被包装值和最大值的构造器：

```swift
@propertyWrapper
struct SmallNumber {
    private var maximum: Int
    private var number: Int

    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, maximum) }
    }

    init() {
        maximum = 12
        number = 0
    }
    init(wrappedValue: Int) {
        maximum = 12
        number = min(wrappedValue, maximum)
    }
    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        number = min(wrappedValue, maximum)
    }
}
```

<!--
  - test: `property-wrapper-init, property-wrapper-mixed-init`

  ```swifttest
  -> @propertyWrapper
  -> struct SmallNumber {
         private var maximum: Int
         private var number: Int
  ---
         var wrappedValue: Int {
             get { return number }
             set { number = min(newValue, maximum) }
         }
  ---
         init() {
             maximum = 12
             number = 0
         }
         init(wrappedValue: Int) {
             maximum = 12
             number = min(wrappedValue, maximum)
         }
         init(wrappedValue: Int, maximum: Int) {
             self.maximum = maximum
             number = min(wrappedValue, maximum)
         }
     }
  ```
-->

<!--
  The initializers above could be written to use
  init(wrappedValue:maximum:) as the designated initializer,
  with the other two calling it instead of doing initialization.
  However, in this case, the initialization logic is small enough
  that the risk of bugs isn't significant,
  and the reader hasn't seen init syntax/rules in detail yet
  so it's clearer to make each init stand on its own.
-->

`SmallNumber` 的定义包括三个构造器——`init()`、`init(wrappedValue:)` 和 `init(wrappedValue:maximum:)`——下面的示例使用这些构造器来设置被包装值和最大值。关于初始化和构造器语法的更多信息，请参见 <doc:Initialization>。

当为属性应用包装器且未指定初始值时，Swift 使用 `init()` 构造器来设置包装器。例如：

```swift
struct ZeroRectangle {
    @SmallNumber var height: Int
    @SmallNumber var width: Int
}

var zeroRectangle = ZeroRectangle()
print(zeroRectangle.height, zeroRectangle.width)
// 打印 "0 0"
```

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> struct ZeroRectangle {
  ->     @SmallNumber var height: Int
  ->     @SmallNumber var width: Int
  -> }
  ---
  -> var zeroRectangle = ZeroRectangle()
  -> print(zeroRectangle.height, zeroRectangle.width)
  <- 0 0
  ```
-->

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> struct ZeroRectangle_equiv {
         private var _height = SmallNumber()
         private var _width = SmallNumber()
         var height: Int {
             get { return _height.wrappedValue }
             set { _height.wrappedValue = newValue }
         }
         var width: Int {
             get { return _width.wrappedValue }
             set { _width.wrappedValue = newValue }
         }
     }
  -> var zeroRectangle_equiv = ZeroRectangle_equiv()
  -> print(zeroRectangle_equiv.height, zeroRectangle_equiv.width)
  <- 0 0
  ```
-->

通过调用 `SmallNumber()` 创建了用于包装 `height` 和 `width` 的 `SmallNumber` 实例。该构造器中的代码使用默认值 0 和 12 设置了初始包装值和初始最大值。属性包装器仍然提供所有的初始值，就像前面在 `SmallRectangle` 中使用 `TwelveOrLess` 的示例一样。但与该示例不同，`SmallNumber` 还支持在声明属性时写入这些初始值。

当为属性指定初始值时，Swift 使用 `init(wrappedValue:)` 构造器来设置包装器。例如：

```swift
struct UnitRectangle {
    @SmallNumber var height: Int = 1
    @SmallNumber var width: Int = 1
}

var unitRectangle = UnitRectangle()
print(unitRectangle.height, unitRectangle.width)
// 打印 "1 1"
```

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> struct UnitRectangle {
  ->     @SmallNumber var height: Int = 1
  ->     @SmallNumber var width: Int = 1
  -> }
  ---
  -> var unitRectangle = UnitRectangle()
  -> print(unitRectangle.height, unitRectangle.width)
  <- 1 1
  ```
-->

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> struct UnitRectangle_equiv {
         private var _height = SmallNumber(wrappedValue: 1)
         private var _width = SmallNumber(wrappedValue: 1)
         var height: Int {
             get { return _height.wrappedValue }
             set { _height.wrappedValue = newValue }
         }
         var width: Int {
             get { return _width.wrappedValue }
             set { _width.wrappedValue = newValue }
         }
     }
  -> var unitRectangle_equiv = UnitRectangle_equiv()
  -> print(unitRectangle_equiv.height, unitRectangle_equiv.width)
  <- 1 1
  ```
-->

当在具有包装器的属性上写 `= 1` 时，这会被转换为调用 `init(wrappedValue:)` 构造器。用于包装 `height` 和 `width` 的 `SmallNumber` 实例通过调用 `SmallNumber(wrappedValue: 1)` 创建。构造器使用了这里指定的包装值，并使用默认的最大值 12。

当在自定义特性后面的括号中写入参数时，Swift 使用接受这些参数的构造器来设置包装器。例如，如果提供了初始值和最大值，Swift 会使用 `init(wrappedValue:maximum:)` 构造器：

```swift
struct NarrowRectangle {
    @SmallNumber(wrappedValue: 2, maximum: 5) var height: Int
    @SmallNumber(wrappedValue: 3, maximum: 4) var width: Int
}

var narrowRectangle = NarrowRectangle()
print(narrowRectangle.height, narrowRectangle.width)
// 打印 "2 3"

narrowRectangle.height = 100
narrowRectangle.width = 100
print(narrowRectangle.height, narrowRectangle.width)
// 打印 "5 4"
```

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> struct NarrowRectangle {
  ->     @SmallNumber(wrappedValue: 2, maximum: 5) var height: Int
  ->     @SmallNumber(wrappedValue: 3, maximum: 4) var width: Int
  -> }
  ---
  -> var narrowRectangle = NarrowRectangle()
  -> print(narrowRectangle.height, narrowRectangle.width)
  <- 2 3
  ---
  -> narrowRectangle.height = 100
  -> narrowRectangle.width = 100
  -> print(narrowRectangle.height, narrowRectangle.width)
  <- 5 4
  ```
-->

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> struct NarrowRectangle_equiv {
         private var _height = SmallNumber(wrappedValue: 2, maximum: 5)
         private var _width = SmallNumber(wrappedValue: 3, maximum: 4)
         var height: Int {
             get { return _height.wrappedValue }
             set { _height.wrappedValue = newValue }
         }
         var width: Int {
             get { return _width.wrappedValue }
             set { _width.wrappedValue = newValue }
         }
     }
  -> var narrowRectangle_equiv = NarrowRectangle_equiv()
  -> print(narrowRectangle_equiv.height, narrowRectangle_equiv.width)
  <- 2 3
  -> narrowRectangle_equiv.height = 100
  -> narrowRectangle_equiv.width = 100
  -> print(narrowRectangle_equiv.height, narrowRectangle_equiv.width)
  <- 5 4
  ```
-->

用于包装 `height` 的 `SmallNumber` 实例是通过调用 `SmallNumber(wrappedValue: 2, maximum: 5)` 创建的，而用于包装 `width` 的实例是通过调用 `SmallNumber(wrappedValue: 3, maximum: 4)` 创建的。

通过在属性包装器中包含参数，可以在包装器中设置初始状态或在创建时传递其他选项。这种语法是使用属性包装器的最通用方式，可以为特性提供所需的任何参数，这些参数会被传递给构造器。

当包含属性包装器参数时，还可以通过赋值指定初始值。Swift 会将该赋值视为 `wrappedValue` 参数，并使用接受所包含参数的构造器。例如：

```swift
struct MixedRectangle {
    @SmallNumber var height: Int = 1
    @SmallNumber(maximum: 9) var width: Int = 2
}

var mixedRectangle = MixedRectangle()
print(mixedRectangle.height)
// 打印 "1"

mixedRectangle.height = 20
print(mixedRectangle.height)
// 打印 "12"
```

<!--
  - test: `property-wrapper-mixed-init`

  ```swifttest
  -> struct MixedRectangle {
  ->     @SmallNumber var height: Int = 1
  ->     @SmallNumber(maximum: 9) var width: Int = 2
  -> }
  ---
  -> var mixedRectangle = MixedRectangle()
  -> print(mixedRectangle.height)
  <- 1
  ---
  -> mixedRectangle.height = 20
  -> print(mixedRectangle.height)
  <- 12
  ```
-->

用于包装 `height` 的 `SmallNumber` 实例是通过调用 `SmallNumber(wrappedValue: 1)` 创建的，使用默认的最大值 12。用于包装 `width` 的实例是通过调用 `SmallNumber(wrappedValue: 2, maximum: 9)` 创建的。

### 从属性包装器中呈现一个值

除了被包装的值之外，属性包装器还可以通过定义*被呈现值*来提供额外的功能——例如，管理数据库访问的属性包装器可以在其被呈现值上暴露一个 `flushDatabaseConnection()` 方法。被呈现值的名称与被包装值相同，只是以美元符号 (`$`) 开头。由于代码中不能定义以 `$` 开头的属性，因此被呈现值不会与定义的属性产生冲突。

在上面的 `SmallNumber` 示例中，如果尝试将属性设置为一个过大的数字，属性包装器会在存储之前调整该数字。下面的代码向 `SmallNumber` 结构体添加了一个 `projectedValue` 属性，用于跟踪属性包装器在存储新值之前是否调整了该新值。

```swift
@propertyWrapper
struct SmallNumber {
    private var number: Int
    private(set) var projectedValue: Bool

    var wrappedValue: Int {
        get { return number }
        set {
            if newValue > 12 {
                number = 12
                projectedValue = true
            } else {
                number = newValue
                projectedValue = false
            }
        }
    }

    init() {
        self.number = 0
        self.projectedValue = false
    }
}
struct SomeStructure {
    @SmallNumber var someNumber: Int
}
var someStructure = SomeStructure()

someStructure.someNumber = 4
print(someStructure.$someNumber)
// 打印 "false"

someStructure.someNumber = 55
print(someStructure.$someNumber)
// 打印 "true"
```

<!--
  - test: `small-number-wrapper-projection`

  ```swifttest
  -> @propertyWrapper
  -> struct SmallNumber {
         private var number: Int
         private(set) var projectedValue: Bool
  ---
         var wrappedValue: Int {
             get { return number }
             set {
                 if newValue > 12 {
                     number = 12
                     projectedValue = true
                 } else {
                     number = newValue
                     projectedValue = false
                 }
             }
         }
  ---
         init() {
             self.number = 0
             self.projectedValue = false
         }
     }
  -> struct SomeStructure {
  ->     @SmallNumber var someNumber: Int
  -> }
  -> var someStructure = SomeStructure()
  ---
  -> someStructure.someNumber = 4
  -> print(someStructure.$someNumber)
  <- false
  ---
  -> someStructure.someNumber = 55
  -> print(someStructure.$someNumber)
  <- true
  ```
-->

写作 `someStructure.$someNumber` 时会访问包装器的被呈现值。存储像 4 这样的小数字后，`someStructure.$someNumber` 的值是 `false`。然而，在尝试存储过大的数字（如 55）后，被呈现值会变为 `true`。

属性包装器可以将任何类型的值作为其被呈现值。在这个例子中，属性包装器只暴露了一条信息——数字是否被调整——因此它将这个布尔值作为被呈现值暴露出来。需要暴露更多信息的包装器可以返回某种其他类型的实例，或者返回 `self`，以将包装器的实例作为被呈现值暴露出来。

当在类型的代码中（如属性的 getter 或实例方法）访问被呈现值时，可以省略属性名称前的 `self.`，就像访问其他属性一样。以下示例中的代码将围绕 `height` 和 `width` 的包装器的被呈现值分别引用为 `$height` 和 `$width`：

```swift
enum Size {
    case small, large
}

struct SizedRectangle {
    @SmallNumber var height: Int
    @SmallNumber var width: Int

    mutating func resize(to size: Size) -> Bool {
        switch size {
        case .small:
            height = 10
            width = 20
        case .large:
            height = 100
            width = 100
        }
        return $height || $width
    }
}
```

<!--
  - test: `small-number-wrapper-projection`

  ```swifttest
  -> enum Size {
         case small, large
     }
  ---
  -> struct SizedRectangle {
  ->     @SmallNumber var height: Int
  ->     @SmallNumber var width: Int
  ---
         mutating func resize(to size: Size) -> Bool {
             switch size {
                 case .small:
                     height = 10
                     width = 20
                 case .large:
                     height = 100
                     width = 100
             }
             return $height || $width
         }
     }
  >> var r = SizedRectangle()
  >> print(r.height, r.width)
  << 0 0
  >> var adj = r.resize(to: .large)
  >> print(adj, r.height, r.width)
  << true 12 12
  ```
-->

由于属性包装器语法只是带有 getter 和 setter 的属性的语法糖，访问 `height` 和 `width` 的行为与访问其他属性相同。例如，`resize(to:)` 中的代码使用它们的属性包装器访问 `height` 和 `width`。如果调用 `resize(to: .large)`，那么 `.large` 的 switch 分支会将矩形的高度和宽度设置为 100。包装器会防止这些属性的值大于 12，并将被呈现值设置为 `true`，以记录它调整了这些值的事实。在 `resize(to:)` 的末尾，return 语句检查 `$height` 和 `$width` 以确定属性包装器是否调整了 `height` 或 `width`。

## 全局变量和局部变量

上面描述的用于计算和观察属性的功能同样适用于*全局变量*和*局部变量*。全局变量是定义在任何函数、方法、闭包或类型上下文之外的变量。局部变量是在函数、方法或闭包上下文中定义的变量。

在前面的章节中遇到的全局变量和局部变量都是*存储变量*。存储变量与存储属性类似，为某种类型的值提供存储，并允许设置和获取该值。

然而，也可以在全局或局部范围内定义*计算变量*并为存储变量定义观察器。计算变量计算它们的值，而不是存储它，并且它们的写法与计算属性相同。

<!--
  - test: `computedVariables`

  ```swifttest
  -> var a: Int { get { return 42 } set { print("set a to \(newValue)") } }
  -> a = 37
  <- set a to 37
  -> print(a)
  <- 42
  ```
-->

<!--
  - test: `observersForStoredVariables`

  ```swifttest
  -> var a: Int = 0 { willSet { print("willSet") } didSet { print("didSet") } }
  -> a = 42
  <- willSet
  <- didSet
  ```
-->

> 注意: 
> 全局常量和变量总是以类似于 <doc:Properties#Lazy-Stored-Properties> 的方式被延迟计算。与延迟存储属性不同，全局常量和变量不需要用 `lazy` 修饰符标记。
>
> 局部常量和变量从不延迟计算。

可以将属性包装器应用于局部存储变量，但不能应用于全局变量或计算变量。例如，下面的代码中，`myNumber` 使用 `SmallNumber` 作为属性包装器。

```swift
func someFunction() {
    @SmallNumber var myNumber: Int = 0

    myNumber = 10
    // 这时 myNumber 是 10

    myNumber = 24
    // 这时 myNumber 是 12
}
```

<!--
  - test: `property-wrapper-init`

  ```swifttest
  -> func someFunction() {
  ->     @SmallNumber var myNumber: Int = 0
  ---
         myNumber = 10
         // now myNumber is 10
  >>     print(myNumber)
  ---
         myNumber = 24
         // now myNumber is 12
  >>     print(myNumber)
     }
  >> someFunction()
  << 10
  << 12
  ```
-->

就像将 `SmallNumber` 应用于属性一样，将 `myNumber` 的值设置为 10 是有效的。由于属性包装器不允许超过 12 的值，它会将 `myNumber` 设置为 12，而不是 24。

<!--
  The discussion of local variables with property wrappers
  has to come later, because we need to use init(wrappedValue:)
  to work around <rdar://problem/74616133>.
-->

<!--
  TODO: clarify what we mean by "global variables" here.
  According to [Contributor 6004], anything defined in a playground, REPL, or in main.swift
  is a local variable in top-level code, not a global variable.
-->

<!--
  TODO: this also makes it impossible (at present) to test the "always lazy" assertion.
-->

## 类型属性

实例属性是属于特定类型实例的属性。每次创建该类型的新实例时，它都有自己的一组属性值，实例之间的属性相互独立。

还可以定义属于类型本身的属性，而不是属于该类型的某个实例。无论创建多少个该类型的实例，这些属性都只有一份。这类属性称为*类型属性*。

类型属性对于定义对特定类型的*所有*实例通用的值非常有用，例如所有实例都可以使用的常量属性（类似于 C 语言中的静态常量），或存储对该类型的所有实例都全局有效的值的变量属性（类似于 C 语言中的静态变量）。

存储的类型属性可以是变量或常量。计算的类型属性始终像计算实例属性一样声明为变量属性。

> 注意: 
> 与存储实例属性不同，存储类型属性必须始终指定默认值。这是因为类型本身没有构造器，无法在初始化时为存储类型属性赋值。
>
> 存储类型属性在第一次访问时会被延迟初始化。即使在多个线程同时访问时，也保证只会初始化一次，并且不需要用 `lazy` 修饰符标记。

### 类型属性语法

在 C 和 Objective-C 中，定义与类型关联的静态常量和变量时，通常作为*全局*静态变量来定义。然而，在 Swift 中，类型属性是作为类型定义的一部分编写的，在类型的外部大括号内，每个类型属性都明确地限定在它所支持的类型范围内。

使用 `static` 关键字定义类型属性。对于类类型的计算类型属性，可以使用 `class` 关键字，允许子类重写父类的实现。下面的示例展示了存储类型属性和计算类型属性的语法：

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 1
    }
}
enum SomeEnumeration {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 6
    }
}
class SomeClass {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
        return 27
    }
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```

<!--
  - test: `typePropertySyntax`

  ```swifttest
  -> struct SomeStructure {
        static var storedTypeProperty = "Some value."
        static var computedTypeProperty: Int {
           return 1
        }
     }
  -> enum SomeEnumeration {
        static var storedTypeProperty = "Some value."
        static var computedTypeProperty: Int {
           return 6
        }
     }
  -> class SomeClass {
        static var storedTypeProperty = "Some value."
        static var computedTypeProperty: Int {
           return 27
        }
        class var overrideableComputedTypeProperty: Int {
           return 107
        }
     }
  ```
-->

<!--
  - test: `classComputedTypePropertiesAreOverrideable`

  ```swifttest
  -> class A { class var cp: String { return "A" } }
  -> class B: A { override class var cp: String { return "B" } }
  -> assert(A.cp == "A")
  -> assert(B.cp == "B")
  ```
-->

<!--
  - test: `staticComputedTypePropertiesAreFinal`

  ```swifttest
  -> class A { static var cp: String { return "A" } }
  -> class B: A { override static var cp: String { return "B" } }
  !$ error: cannot override static property
  !! class B: A { override static var cp: String { return "B" } }
  !!                                  ^
  !$ note: overridden declaration is here
  !! class A { static var cp: String { return "A" } }
  !!                      ^
  ```
-->

> 注意: 
> 上面的计算类型属性示例是针对只读计算类型属性的，但也可以使用与计算实例属性相同的语法定义读写计算类型属性。

### 获取和设置类型属性的值

类型属性的查询和设置使用点语法，就像实例属性一样。然而，类型属性是针对*类型*本身进行查询和设置的，而不是针对该类型的某个实例。例如：

```swift
print(SomeStructure.storedTypeProperty)
// 打印 "Some value."
SomeStructure.storedTypeProperty = "Another value."
print(SomeStructure.storedTypeProperty)
// 打印 "Another value."
print(SomeEnumeration.computedTypeProperty)
// 打印 "6"
print(SomeClass.computedTypeProperty)
// 打印 "27"
```

<!--
  - test: `typePropertySyntax`

  ```swifttest
  -> print(SomeStructure.storedTypeProperty)
  <- Some value.
  -> SomeStructure.storedTypeProperty = "Another value."
  -> print(SomeStructure.storedTypeProperty)
  <- Another value.
  -> print(SomeEnumeration.computedTypeProperty)
  <- 6
  -> print(SomeClass.computedTypeProperty)
  <- 27
  ```
-->

接下来的示例使用了两个存储类型属性，作为一个结构体的一部分，用于模拟多个音频通道的音频电平仪。每个通道的音频电平都是一个介于 `0` 到 `10` 之间的整数（包括 `0` 和 `10`）。

下图展示了如何将这两个音频通道组合在一起，以模拟一个立体声音频电平仪。当某个通道的音频电平为 `0` 时，该通道的指示灯全部熄灭；当音频电平为 `10` 时，该通道的指示灯全部点亮。在这个图中，左通道的当前电平为 `9`，右通道的当前电平为 `7`：

![](staticPropertiesVUMeter)

上述音频通道由 `AudioChannel` 结构体的实例表示：

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel: Int = 0 {
        didSet {
            if currentLevel > AudioChannel.thresholdLevel {
                // 将当前音量限制在阈值之内
                currentLevel = AudioChannel.thresholdLevel
            }
            if currentLevel > AudioChannel.maxInputLevelForAllChannels {
                // 存储当前音量作为新的最大输入音量
                AudioChannel.maxInputLevelForAllChannels = currentLevel
            }
        }
    }
}
```

<!--
  - test: `staticProperties`

  ```swifttest
  -> struct AudioChannel {
        static let thresholdLevel = 10
        static var maxInputLevelForAllChannels = 0
        var currentLevel: Int = 0 {
           didSet {
              if currentLevel > AudioChannel.thresholdLevel {
                 // cap the new audio level to the threshold level
                 currentLevel = AudioChannel.thresholdLevel
              }
              if currentLevel > AudioChannel.maxInputLevelForAllChannels {
                 // store this as the new overall maximum input level
                 AudioChannel.maxInputLevelForAllChannels = currentLevel
              }
           }
        }
     }
  ```
-->

`AudioChannel` 结构体定义了两个存储类型属性来支持其功能。第一个，`thresholdLevel`，定义了音频电平的最大阈值。对于所有 `AudioChannel` 实例，这个值是一个恒定的 `10`。如果输入的音频信号值高于 `10`，它将被限制在这个阈值内（如下所述）。

第二个类型属性是一个名为 `maxInputLevelForAllChannels` 的变量存储属性，用于跟踪*任何* `AudioChannel` 实例所接收到的最大输入值。该属性初始值为 `0`。

`AudioChannel` 结构体还定义了一个存储实例属性，称为 `currentLevel`，表示通道当前的音频电平，范围从 `0` 到 `10`。

`currentLevel` 属性有一个 `didSet` 属性观察器，每当设置 `currentLevel` 时检查其值。这个观察器执行两个检查：

- 如果 `currentLevel` 的新值大于允许的 `thresholdLevel`，属性观察器会将 `currentLevel` 限制在 `thresholdLevel`。
- 如果 `currentLevel` 的新值（在任何限制之后）高于之前*任何* `AudioChannel` 实例接收到的值，属性观察器会将新的 `currentLevel` 值存储在 `maxInputLevelForAllChannels` 类型属性中。

> 注意: 
> 在这两个检查中的第一个中，`didSet` 观察器将 `currentLevel` 设置为不同的值。但这不会导致观察器再次被调用。

可以使用 `AudioChannel` 结构体创建两个新的音频通道，称为 `leftChannel` 和 `rightChannel`，用于表示立体声音响系统的音频电平：

```swift
var leftChannel = AudioChannel()
var rightChannel = AudioChannel()
```

<!--
  - test: `staticProperties`

  ```swifttest
  -> var leftChannel = AudioChannel()
  -> var rightChannel = AudioChannel()
  ```
-->

如果将*左*通道的 `currentLevel` 设置为 `7`，可以看到 `maxInputLevelForAllChannels` 类型属性更新为 `7`：
```swift
leftChannel.currentLevel = 7
print(leftChannel.currentLevel)
// 打印 "7"
print(AudioChannel.maxInputLevelForAllChannels)
// 打印 "7"
```

<!--
  - test: `staticProperties`

  ```swifttest
  -> leftChannel.currentLevel = 7
  -> print(leftChannel.currentLevel)
  <- 7
  -> print(AudioChannel.maxInputLevelForAllChannels)
  <- 7
  ```
-->

如果尝试将*右*通道的 `currentLevel` 设置为 `11`，可以看到右通道的 `currentLevel` 属性被限制在最大值 `10`，并且 `maxInputLevelForAllChannels` 类型属性更新为 `10`：

```swift
rightChannel.currentLevel = 11
print(rightChannel.currentLevel)
// 打印 "10"
print(AudioChannel.maxInputLevelForAllChannels)
// 打印 "10"
```

<!--
  - test: `staticProperties`

  ```swifttest
  -> rightChannel.currentLevel = 11
  -> print(rightChannel.currentLevel)
  <- 10
  -> print(AudioChannel.maxInputLevelForAllChannels)
  <- 10
  ```
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
