--- [@haolloyin](https://github.com/haolloyin) 翻译自苹果官方文档 [Using Swift with Cocoa and Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_75) 的 [Interacting with Objective-C APIs](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) 章节


## Interacting with Objective-C APIs - 与 Objc API 交互

Swift 和 Objc 之间双向的`互用性`（`Interoperability`），让你可以用一种语言访问另一种语言写的代码。当你开始整合 Swift 代码到应用的开发工作流时，可以很好地理解这种互用性在重新定义，改善并强化你写 Cocoa 应用的方式。

互用性一个很重要的方面是在写 Swift 代码的同时可以用 Objc API。导入 Objc framework 之后，你可以用 Swift 原生的语法来实例化类，并和它们进行交互。

### Initialization - 初始化

你可以用 Swift 语法调用 Objc 类的初始化方法，在 Swift 代码中进行 Objc 类的实例化。因为 Objc 的初始化方法都迁移到 Swift 了。`init` 前缀被去掉并成为关键字表示一个方法是初始化方法。以 `initWith` 开头的初始化方法中的 `With` 也被去掉了。从 `init` 或 `initWith` 中切分出来首字母变成小写，并且作为第一个参数名，该 selector 的其他部分也同样变成参数名。selector 括号内的各部分也是调用端

例如 Objc 中这么写：

```
// OBJECTIVE-C

UITableView *myTableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStyleGrouped];
```

Swift 中则这么写：

```
// SWIFT

let myTableView: UITableView = UITableView(frame: CGRectZero, style: .Grouped)
```

不需要调用 `alloc`，Swift 会为你正确处理。**注意调用 Swift 初始化方法时不应该再出现 `init` 字眼。**

初始化时你可以显式指明变量的类型，也可以忽略不写，Swift 的类型推导会确定对象的类型。

```
// SWIFT

let myTextField = UITextField(frame: CGRect(0.0, 0.0, 200.0, 40.0))
```

`UITableView` 和 `UITextField` 拥有和 Objc 类似的方法，可以像在 Objc 代码中那样使用它们来访问在类中定义的属性或方法。

为了一致性和简单性，Objc 的工厂方法在 Swift 中以方便的初始化方法出现，这种映射方法使它们和初始化方法一样简洁明了。例如你在 Objc 中这么调用工厂方法：

```
// OBJECTIVE-C

UIColor *color = [UIColor colorWithRed:0.5 green:0.0 blue:0.5 alpha:1.0];
```

在 Swift 中这么调用：

```
// SWIFT

let color = UIColor(red: 0.5, green: 0.0, blue: 0.5, alpha: 1.0)
```

### Accessing Properties - 属性访问

在 Swift 中用点语法来访问、设置属性。

```
// SWIFT

myTextField.textColor = UIColor.darkGrayColor()
myTextField.text = "Hello world"
if myTextField.editing {
    myTextField.editing = false
}
```

当获取或设置属性时，直接用属性名，不需要括号。注意 `darkGrayColor` 是 `UIColor` 中的方法，不是属性，因此带有括号。

在 Objc 中返回一个值并且不带参数的方法，可以看作隐式的属性访问器，并用和访问属性一样的语法来调用。这在 Swift 中很简单，只有在 Objc 中用 `@property` 语法声明的属性才会被看作属性。方法的导入、调用详见 [Working with Methods](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html#//apple_ref/doc/uid/TP40014216-CH4-XID_29)。

### Working with Methods - 方法调用

在 Swift 中调用 Obc 方法时，使用点语法。

因为 Objc 的方法都迁移到 Swift，方法名的第一部分作为基本的方法名，并出现在小括号左边。第一个实参写在小括号里面，并且不需要参数名；方法名的其余部分与实参相应写在小括号里面。方法名的所有部分在调用端都是必须的。

例如 Objc 中这样调用：

```
// OBJECTIVE-C

[myTableView insertSubview:mySubview atIndex:2];
```

在 Swift 中这样调用：

```
// SWIFT

myTableView.insertSubview(mySubview, atIndex: 2)
```

如果调用的方法不带参数，你还是需要写上括号。

```
// SWIFT

myTableView.layoutIfNeeded()
```

### id Compatibility - 兼容 id

Swift 包含一个叫做 `AnyObject` 的协议类型来表示任意一种对象，就像 Objc `id` 一样。`AnyObject` 协议允许你在写类型安全的 Swift 代码的同时，保留无类型（`untyped`）对象的灵活性。正由于 `AnyObjcet` 协议提供的安全性，Swift 用 `AnyObject` 替代 `id`。

像 `id` 一样，你可以把任何类类型的对象赋值（assign）给用 `AnyObject` 声明的常量或变量，也可以把变量重新赋值到不同类型的对象。

```
// SWIFT

var myObject: AnyObject = UITableViewCell()
myObject = NSDate()
```

也可以不经过类型转换来调用 Objc 的方法或访问属性（后赋值给常量），但必须是 Objc 中用 `@objc attribute` 标记过的兼容方法。

```
// SWIFT

let futureDate = myObject.dateByAddingTimeInterval(10)
let timeSinceNow = myObject.timeIntervalSinceNow
```

然而因为 `AnyObject` 对象只有到运行时才确定其真实类型，这很可能写出不安全的代码。另外对比 Objc ，如果你调用（或访问） `AnyObject` 对象不存在的方法（或属性），这会导致运行时错误。例如下面的代码会编译通过，但是在运行时引发 `unrecognized selector error`：

```
// SWIFT

myObject.characterAtIndex(5)
// crash, myObject does't respond to that method
```

但是，你可以在代码中用 Swift 中的`可选值`（`optional`）来消除这种常见的 Objc error。当你在一个 `AnyObject` 类型的对象上调用一个 Objc 方法时，事实上跟`可选值隐式拆包`（`implicitly unwrapped optional`）很类似。你可以用跟可选协议中的方法相同的`可选链`（`optional chaining`）语法来调用 `AnyObject` 对象的方法。这对属性也同样适用。

例如下面的代码，第1~2行将不会执行，因为 `NSDate` 对象不存在 `length` 属性和 `characterAtIndex:` 方法。常量 `myLength` 将会被推断为可选整型（`optional Int`），并且赋值为 `nil`。你也可以用 `if-let` 语句来尝试性地拆包方法调用的结果，因为对象调用的方法可能不存在（not respond to），正如下面第3行所示：

```
// SWIFT

let myLength = myObject.length?
let myChar = myObject.characterAtIndex?(5)
if let fifthCharacter = myObject.characterAtIndex(5) {
    println("Found \(fifthCharacter) at index 5")
}
```

> 译注：关于可选链（`Optional Chain`），建议读下官方教程的 [Optional Chaining](https://github.com/CocoaChina-editors/Welcome-to-Swift/blob/master/The%20Swift%20Programming%20Language/02Language%20Guide/17Optional%20Chaining.md) 和这篇 “[Swift之 ? 和 !](http://joeyio.com/ios/2014/06/04/swift---/)”。

和 Swfit 中所有向下转型（`downcast`）一样，从 `AnyObject` 转型为具体对象类型是不保证成功的，因此会返回可选值（`optional value`），你可以通过检测可选值来确定转型是否成功。

```
// SWIFT

let userDefaults = NSUserDefaults.standardUserDefaults()
let lastRefreshDate: AnyObject? = userDefaults.objectForKey("LastRefreshDate")
if let date = lastRefreshDate as? NSDate {
    println("\(date.timeIntervalSinceReferenceDate)")
}
```

Of course, if you are certain of the type of the object (and know that it is not nil), you can force the invocation with the as operator.

当然如果你确定一个对象的类型（并且对象不为 `nil`），你可以把它作为操作数强行调用。

```
// SWIFT

let myDate = lastRefreshDate as NSDate
let timeInterval = myDate.timeIntervalSinceReferenceDate
```

### Working with nil - 关于 nil

Objc 用原始指针（可能为 `NULL`，即 Objc 中的 `nil`）来指向对象。Swift 中的所有值（包括结构体，对象引用）都是非空的（`non-nil`）。作为替代，可以用一个`可选类型`（`optional type`）来表示一个值，尽管在封包过程中可能会丢失这个值。当值丢失时，得到的是 `nil`。阅读 [Optional](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5) 来了解更多。

**由于 Objc 没有确保对象非空（`non-nil`），Swift 在将 Objc API 导入时，将所有实参类型和返回类型都改成可选类型。当你使用 Objc 对象时，应该先检查它是否为 `nil`。**

在某些情况下，你可能100%确定一个 Objc 方法或属性不会返回 `nil` 对象引用。为了在这些情景下更方便地使用对象，Swift 引入了叫做`隐式拆包可选值`（`implicitly unwrapped optionals`）的类型，它包含所有可选类型的安全特性。另外，你可以直接访问它的值，不用判断是否为 `nil`或者将它拆包。当你在未经过安全拆包之前访问这种可选类型的值时，隐式拆包可选值会检查值是否已经丢失，如果已经丢失，会发生运行时错误。因此，你应该总是自行检查或拆包一个`隐式拆包可选值`，除非你确定这个值没有丢失。


### Extensions - 扩展

Swift 的扩展（`extension`）类似于 Objc 的类别（`category`），`extension` 给 Swift 现有的类，结构体，枚举，增加行为，也适用于 Objc 中定义的类、结构体和枚举。你可以给一个类型定义一个 `extension`，不管这个类型来自系统 framework 还是你自定义的类型。简单地导入对应的模块，用你在 Objc 中那样用相同的名字引用类，结构体和枚举。

例如你可以用等边三角型来扩展 `UIBezierPath` 类，基于你提供的边长和起始点创建一个简单的 Bézier 路径。

```
// SWIFT

extension UIBezierPath {
    convenience init(triangleSideLength: Float, origin: CGPoint) {
        self.init()
        let squareRoot = Float(sqrt(3))
        let altitude = (squareRoot * triangleSideLength) / 2
        moveToPoint(origin)
        addLineToPoint(CGPoint(triangleSideLength, origin.x))
        addLineToPoint(CGPoint(triangleSideLength / 2, altitude))
        closePath()
    }
}
```

可以用 `extension` 添加属性（包括类属性，静态属性），但是这些**属性必须进行计算；`extension` 并不能给类型，结构体，枚举添加存储属性（`stored property`）。**

下面的例子扩展了 `CGRect` 结构体，使之拥有一个计算 `area` 的属性：

```
// SWIFT

extension CGRect {
    var area: CGFloat {
    return width * height
    }
}
let rect = CGRect(x: 0.0, y: 0.0, width: 10.0, height: 50.0)
let area = rect.area
// area: CGFloat = 500.0
```

也可以用 `extension` 给类添加协议（`protocol conformance`）而无需继承这个类。如果是 Swift 中定义的协议，你可以将它添加到结构体或者枚举，不管这个结构体或枚举是来自 Swift 还是 Objc。

**不能用 `extension` 对 Objc 类型现有的方法或属性进行重载（`override`）。**

### Closures - 闭包

Objective-C blocks are automatically imported as Swift closures. For example, here is an Objective-C block variable:

Objc 的 `block` 被自动导入为 Swift 的闭包（`closure`）。例如下面的 Objc block 变量：

```
// OBJECTIVE-C

void (^completionBlock)(NSData *, NSError *) = ^(NSData *data, NSError *error) {
    /* ... */
}
```

在 Swift 中看起来是这样的：

```
// SWIFT

let completionBlock: (NSData, NSError) -> Void = { data, error in 
    /* ... */
}
```

Swift 的闭包和 Objc 的 block 是兼容的，所以你可以将 Swift 的闭包作为实参传给 Objc 中期望传入 block 的方法。Swift 的闭包和函数是相同的类型，所以你甚至可以传递 Swift 的函数名。

闭包拥有和 block 相似的捕获语义（`capture semantic`），但是有一个关键的不同之处：变量是可变的而不是拷贝一个副本。换句话说，Swift 中闭包的变量默认等同于 Objc 中用 `__block` 修饰的变量。

### Object Comparison - 对象比较

Swift 中比较两个对象有两种不同的方式。一种是相等（`equality ==`），比较两个对象的内容；另一种是全等（`identity ===`），比较两个常量或变量是否指向同一个的对象实例。

Swift 和 Objc 对象在 Swift 中一般用 `==` 和 `===` 操作符进行比较。Swift 为继承自 `NSObject` 类的对象提供了 `==` 操作符的默认实现，即 Swift 会调用 `NSObject` 类定义的 `isEqual:` 方法。`NSObject` 类只会判断是否全等（`identity comparison`，即是否指向同一实例），所以你应该自己实现 `NSObject` 子类的 `isEqual:` 方法。由于你可以传递 Swift 对心爱难过（包括那些没有继承自 `NSObject` 类的类对象）给 Objc API，你应该实现 `isEqual:` 方法，以便 Objc API 可以判断两个对象的内容是否相同，而不是判断是否指向同一个实例。

作为类对象判等的一部分，确保根据对象比较的规则来实现 `hash` 属性。进一步说，如果你想用你的类对象作为字典的 key，你还要实现 `Hashable` 协议的 `hashValue` 属性。

### Swift Type Compatibility - Swift 类型兼容性

当你在 Swift 中定义一个类继承自 `NSObject` 类或其他任意 Objc 类时，这个类自动与 Objc 兼容。这些步骤由 Swift 编译器为你完成。如果你不打算将一个 Swift 类导入到 Objc，那么你不用担心类型兼容相关的问题。另外，如果你的 Swift 类没有继承自 Objc 的类，并且你将会在 Objc 代码中使用，那么可以用 `@objc` 来修饰它。

`@objc attribute` 使你的 Swift API 在 Objc 与其运行时中可用。换句话说，你可以用 `@objc` 来修饰任何你想在 Objc 使用的 Swift 类，方法，属性。如果你的 Swift 类继承自 Objc 的类，编译器会自动给 Swift 类插入 `@objc`。编译器也会自动为类的所有方法和属性添加 `@objc`，只要这个类用 `@objc` 修饰了。当你用 `@IBOutlet` `@IBAction` `@NSManaged` 时，`@objc` 也会被自动加上。`@objc` 在你用 Objc 类的 `selector` 实现 `target-action` 设计模式这一类工作时很有用，例如 `NSTimer` 和 `UIButton`。

当你在 Objc 中使用 Swift API，编译器通常直接翻译。例如 Swift API `func playSong(name: String)` 会被导入 Objc 变成 `- (void)playSong:(NSString *)name`。但是有一个例外：当你在 Objc 中使用 Swift 初始化方法时，编译器为你在方法名最前面添加 `initWith` 字样，并且适当地将原来初始化方法的首字母大写。例如，Swift 的初始化方法 ` init (songName: String, artist: String)` 会被导入 Objc 变成 `(instancetype)initWithSongName:(NSString *)songName artist:(NSString *)artist`。

Swift 也提供一个 `@objc` 的变型类允许你指定 Objc 的符号名（`symbol`）。例如，如果你的 Swift 类名含有 Objc 不支持的字符，你可以指定一个替代名以便在 Objc 中使用。如果你想为 Swift 函数提供一个 Objc 名称，应该使用 Objc 的 `selector` 语法，要记得为 `selector` 的每一部分加上分号（`:`）。

```
// SWIFT

@objc(Squirrel)
class Белка {
    @objc(initWithName:)
    init (имя: String) { /*...*/ }
    @objc(hideNuts:inTree:)
    func прячьОрехи(Int, вДереве: Дерево) { /*...*/ }
}
```

当你给 Swift 类使用 `@objc(<#name#>)` 时，这个类可以在 Objc 中使用，并且不需要任何命名空间。因此 `@objc(<#name#>)` 在你迁移可存档的（`archivable`） Objc 类到 Swift 时很有用，因为被存档的（`archived`）对象在存档中保存了它们的类名，你在 Objc 类中应该用 `@objc(<#name#>)` 来指定同样的名字，使得旧的存档可以在你新的 Swift 类中反存档（`unarchived`）。

### Objective-C Selectors

Objc 的 `selector` 是一种指向 Objc 方法名的类型。在 Swift 中，Objc 的 `selector` 相应地用 `Selector` 结构体表示。你可以用 string 字面量来构造一个 Swift 的 `Selector`，例如：`let mySelector: Selector = "tappedButton:"`。由于 string 字面量会自动转化为 `selector`，因此你可以传递一个 string 字面量给任何接受 `selector` 作为参数的方法。

```
// SWIFT

import UIKit

class MyViewController: UIViewController {
    let myButton = UIButton(frame: CGRect(x: 0, y: 0, width: 100, height: 50))
    
    init(nibName nibNameOrNil: String!, bundle nibBundleOrNil: NSBundle!) {
        super.init(nibName: nibName, bundle: nibBundle)
        myButton.targetForAction("tappedButton:", withSender: self)
    }
    
    func tappedButton(sender: UIButton!) {
        println("tapped button")
    }
}
```

> **注意**
> 
> **`performSelector:` 方法和其他与方法调用（`selector-invoking`）相关的方法没有被迁移到 Swift，因为他们固有的不安全性。**

如果你的 Swift 类继承自 Objc 的类，那么这个类的所有方法和属性都是对 Objc `selector` 可见的。反之，如果 Swift 类没有继承自 Objc 类，你需要加上 `@objc` 修饰符，使得它们成为 Objc 中可用的 `selector`，详见前面的 [Swift Type Compatibility](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html#//apple_ref/doc/uid/TP40014216-CH4-XID_36) 一节。



