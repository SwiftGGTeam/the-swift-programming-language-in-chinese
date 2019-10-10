# 扩展

*扩展*可以给一个现有的类，结构体，枚举，还有协议添加新的功能。它还拥有不需要访问被扩展类型源代码就能完成扩展的能力（即*逆向建模*）。扩展和 Objective-C 的分类很相似。（与 Objective-C 分类不同的是，Swift 扩展是没有名字的。）

Swift 中的扩展可以：

 - 添加计算型实例属性和计算型类属性
 - 定义实例方法和类方法
 - 提供新的构造器
 - 定义下标
 - 定义和使用新的嵌套类型
 - 使已经存在的类型遵循（conform）一个协议

在 Swift 中，你甚至可以扩展协议以提供其需要的实现，或者添加额外功能给遵循的类型所使用。你可以从 [协议扩展](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html#ID521) 获取更多细节。

> 注意
> 
> 扩展可以给一个类型添加新的功能，但是不能重写已经存在的功能。

## 扩展的语法 {#extension-syntax}

使用 `extension` 关键字声明扩展：

```swift
extension SomeType {
  // 在这里给 SomeType 添加新的功能
}
```

扩展可以扩充一个现有的类型，给它添加一个或多个协议。协议名称的写法和类或者结构体一样：

```swift
extension SomeType: SomeProtocol, AnotherProtocol {
  // 协议所需要的实现写在这里
}
```

这种遵循协议的方式在 [使用扩展遵循协议](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html#ID277) 中有描述。

扩展可以使用在现有范型类型上，就像 [扩展范型类型](https://docs.swift.org/swift-book/LanguageGuide/Generics.html#ID185) 中描述的一样。你还可以使用扩展给泛型类型有条件的添加功能，就像 [扩展一个带有 Where 字句的范型](https://docs.swift.org/swift-book/LanguageGuide/Generics.html#ID553) 中描述的一样。

> 注意
> 
> 对一个现有的类型，如果你定义了一个扩展来添加新的功能，那么这个类型的所有实例都可以使用这个新功能，包括那些在扩展定义之前就存在的实例。

## 计算型属性 {#computed-properties}

扩展可以给现有类型添加计算型实例属性和计算型类属性。这个例子给 Swift 内建的 `Double` 类型添加了五个计算型实例属性，从而提供与距离单位相关工作的基本支持：

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")
// 打印“One inch is 0.0254 meters”
let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")
// 打印“Three feet is 0.914399970739201 meters”
```

这些计算型属性表示的含义是把一个 `Double` 值看作是某单位下的长度值。即使它们被实现为计算型属性，但这些属性的名字仍可紧接一个浮点型字面值，从而通过点语法来使用，并以此实现距离转换。

在上述例子中，`Double` 类型的 `1.0` 代表的是“一米”。这就是为什么计算型属性 `m` 返回的是 `self`——表达式 `1.m` 被认为是计算一个 `Double` 类型的 `1.0`。

其它单位则需要一些单位换算。一千米等于 1,000 米，所以计算型属性 `km` 要把值乘以 `1_000.00` 来实现千米到米的单位换算。类似地，一米有 3.28084 英尺，所以计算型属性 `ft` 要把对应的 `Double` 值除以 `3.28084`，来实现英尺到米的单位换算。

这些属性都是只读的计算型属性，所以为了简便，它们的表达式里面都不包含 `get` 关键字。它们使用 `Double` 作为返回值类型，并可用于所有接受 `Double` 类型的数学计算中：

```swift
let aMarathon = 42.km + 195.m
print("A marathon is \(aMarathon) meters long")
// 打印“A marathon is 42195.0 meters long”
```

> 注意
>   
> 扩展可以添加新的计算属性，但是它们不能添加存储属性，或向现有的属性添加属性观察者。

## 构造器 {#initializers}

扩展可以给现有的类型添加新的构造器。它使你可以把自定义类型作为参数来供其他类型的构造器使用，或者在类型的原始实现上添加额外的构造选项。

扩展可以给一个类添加新的便利构造器，但是它们不能给类添加新的指定构造器或者析构器。指定构造器和析构器必须始终由类的原始实现提供。

如果你使用扩展给一个值类型添加构造器只是用于给所有的存储属性提供默认值，并且没有定义任何自定义构造器，那么你可以在该值类型扩展的构造器中使用默认构造器和成员构造器。如果你把构造器写到了值类型的原始实现中，就像 [值类型的构造器委托](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID215) 中所描述的，那么就不属于在扩展中添加构造器。

如果你使用扩展给另一个模块中定义的结构体添加构造器，那么新的构造器直到定义模块中使用一个构造器之前，不能访问 `self`。

在下面的例子中，自定义了一个的 `Rect` 结构体用来表示一个几何矩形。这个例子中还定义了两个给予支持的结构体 `Size` 和 `Point`，它们都把属性的默认值设置为 `0.0`：

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
}
```

因为 `Rect` 结构体给所有的属性都提供了默认值，所以它自动获得了一个默认构造器和一个成员构造器，就像 [默认构造器](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html#ID213) 中描述的一样。这些构造器可以用来创建新的 `Rect` 实例：

```swift
let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
   size: Size(width: 5.0, height: 5.0))
```

你可以通过扩展 `Rect` 结构体来提供一个允许指定 point 和 size 的构造器：

```swift
extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

这个新的构造器首先根据提供的 `center` 和 `size` 计算一个适当的原点。然后这个构造器调用结构体自带的成员构造器 `init(origin:size:)`，它会将新的 origin 和 size 值储存在适当的属性中：

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
                      size: Size(width: 3.0, height: 3.0))
// centerRect 的 origin 是 (2.5, 2.5) 并且它的 size 是 (3.0, 3.0)
```

> 注意
> 
> 如果你通过扩展提供一个新的构造器，你有责任确保每个通过该构造器创建的实例都是初始化完整的。

## 方法 {#methods}

扩展可以给现有类型添加新的实例方法和类方法。在下面的例子中，给 `Int` 类型添加了一个新的实例方法叫做 `repetitions`：

```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}
```

`repetitions(task:)` 方法仅接收一个 `() -> Void` 类型的参数，它表示一个没有参数没有返回值的方法。

定义了这个扩展之后，你可以对任意整形数值调用 `repetitions(task:)` 方法，来执行对应次数的任务：

```swift
3.repetitions {
    print("Hello!")
}
// Hello!
// Hello!
// Hello!
```

### 可变实例方法 {#mutating-instance-methods}

通过扩展添加的实例方法同样也可以修改（或 *mutating（改变）*）实例本身。结构体和枚举的方法，若是可以修改 `self` 或者它自己的属性，则必须将这个实例方法标记为 `mutating`，就像是改变了方法的原始实现。

在下面的例子中，对 Swift 的 `Int` 类型添加了一个新的 mutating 方法，叫做 `square`，它将原始值求平方：

```swift
extension Int {
    mutating func square() {
        self = self * self
    }
}
var someInt = 3
someInt.square()
// someInt 现在是 9
```

## 下标 {#subscripts}

扩展可以给现有的类型添加新的下标。下面的例子中，对 Swift 的 `Int` 类型添加了一个整数类型的下标。下标 `[n]` 从数字右侧开始，返回小数点后的第 `n` 位：

- `123456789[0]` 返回 `9`
- `123456789[1]` 返回 `8`

……以此类推：
```swift
extension Int {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
        for _ in 0..<digitIndex {
            decimalBase *= 10
        }
        return (self / decimalBase) % 10
    }
}
746381295[0]
// 返回 5
746381295[1]
// 返回 9
746381295[2]
// 返回 2
746381295[8]
// 返回 7
```

如果操作的 `Int` 值没有足够的位数满足所请求的下标，那么下标的现实将返回 `0`，将好像在数字的左边补上了 0：

```swift
746381295[9]
// 返回 0，就好像你进行了这个请求：
0746381295[9]
```

## 嵌套类型 {#nested-yypes}

扩展可以给现有的类，结构体，还有枚举添加新的嵌套类型：

```swift
extension Int {
    enum Kind {
        case negative, zero, positive
    }
    var kind: Kind {
        switch self {
        case 0:
            return .zero
        case let x where x > 0:
            return .positive
        default:
            return .negative
        }
    }
}
```

这个例子给 `Int` 添加了一个新的嵌套枚举。这个枚举叫做 `Kind`，表示特定整数所代表的数字类型。具体来说，它表示数字是负的、零的还是正的。

这个例子同样给 `Int` 添加了一个新的计算型实例属性，叫做 `kind`，它返回被操作整数所对应的 `Kind` 枚举 case 分支。

现在，任意 `Int` 的值都可以使用这个嵌套类型：

```swift
func printIntegerKinds(_ numbers: [Int]) {
    for number in numbers {
        switch number.kind {
        case .negative:
            print("- ", terminator: "")
        case .zero:
            print("0 ", terminator: "")
        case .positive:
            print("+ ", terminator: "")
        }
    }
    print("")
}
printIntegerKinds([3, 19, -27, 0, -6, 0, 7])
// 打印“+ + - 0 - 0 + ”
```

方法 `printIntegerKinds(_:)`，使用一个 `Int` 类型的数组作为输入，然后依次迭代这些值。对于数组中的每一个整数，方法会检查它的 `kind` 计算型属性，然后打印适当的描述。

> 注意
>  
> `number.kind` 已经被认为是 `Int.Kind` 类型。所以，在 `switch` 语句中所有的 `Int.Kind` case 分支可以被缩写，就像使用 `.negative` 替代 `Int.Kind.negative.`。
