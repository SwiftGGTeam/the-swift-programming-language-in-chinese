# 泛型（Generics）

------

> 1.0
> 翻译：[takalard](https://github.com/takalard)
> 校对：[lifedim](https://github.com/lifedim)

> 2.0
> 翻译+校对： [SergioChan](https://github.com/SergioChan)

> 2.1
> 校对：[shanks](http://codebuild.me)，2015-11-01

本页包含内容：

- [泛型所解决的问题](#the_problem_that_generics_solve)
- [泛型函数](#generic_functions)
- [类型参数](#type_parameters)
- [命名类型参数](#naming_type_parameters)
- [泛型类型](#generic_types)
- [扩展一个泛型类型](#extending_a_generic_type)
- [类型约束](#type_constraints)
- [关联类型](#associated_types)
- [Where 子句](#where_clauses)

泛型代码可以让你编写适用自定义需求以及任意类型的灵活可重用的函数和类型。它的可以让你避免重复的代码，用一种清晰和抽象的方式来表达代码的意图。

泛型是 Swift 的强大特性之一，许多 Swift 标准库是通过泛型代码构建的。事实上，泛型的使用贯穿了整本语言手册，只是你可能没有发现而已。例如，Swift 的 `Array` 和 `Dictionary` 都是泛型集合。你可以创建一个 `Int` 数组，也可创建一个 `String` 数组，甚至可以是任意其他 Swift 类型的数组。同样的，你也可以创建存储任意指定类型的字典。

<a name="the_problem_that_generics_solve"></a>
## 泛型所解决的问题

下面是一个标准的非泛型函数 `swapTwoInts(_:_:)`，用来交换两个 `Int` 值：

```swift
func swapTwoInts(inout a: Int, inout _ b: Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

这个函数使用输入输出参数（`inout`）来交换 `a` 和 `b` 的值，请参考[输入输出参数](./06_Functions.html#in_out_parameters)。

`swapTwoInts(_:_:)` 函数交换 `b` 的原始值到 `a`，并交换 `a` 的原始值到 `b`。你可以调用这个函数交换两个 `Int` 变量的值：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// 打印 “someInt is now 107, and anotherInt is now 3”
```

诚然，`swapTwoInts(_:_:)` 函数挺有用，但是它只能交换 `Int` 值，如果你想要交换两个 `String` 值或者 `Double`值，就不得不写更多的函数，例如 `swapTwoStrings(_:_:)` 和 `swapTwoDoubles(_:_:)`，如下所示：

```swift
func swapTwoStrings(inout a: String, inout _ b: String) {
    let temporaryA = a
    a = b
    b = temporaryA
}

func swapTwoDoubles(inout a: Double, inout _ b: Double) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

你可能注意到 `swapTwoInts(_:_:)`、`swapTwoStrings(_:_:)` 和 `swapTwoDoubles(_:_:)` 的函数功能都是相同的，唯一不同之处就在于传入的变量类型不同，分别是 `Int`、`String` 和 `Double`。

在实际应用中，通常需要一个更实用更灵活的函数来交换两个任意类型的值，幸运的是，泛型代码帮你解决了这种问题。（这些函数的泛型版本已经在下面定义好了。）

> 注意  
在上面三个函数中，`a` 和 `b` 类型相同。如果 `a` 和 `b` 类型不同，那它们俩就不能互换值。Swift 是类型安全的语言，所以它不允许一个 `String` 类型的变量和一个 `Double` 类型的变量互换值。试图这样做将导致编译错误。

<a name="generic_functions"></a>
## 泛型函数

泛型函数可以适用于任何类型，下面的 `swapTwoValues(_:_:)` 函数是上面三个函数的泛型版本：

```swift
func swapTwoValues<T>(inout a: T, inout _ b: T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoValues(_:_:)` 的函数主体和 `swapTwoInts(_:_:)` 函数是一样的，它们只在第一行有点不同，如下所示：

```swift
func swapTwoInts(inout a: Int, inout _ b: Int)
func swapTwoValues<T>(inout a: T, inout _ b: T)
```

这个函数的泛型版本使用了占位类型名（在这里用字母 `T` 来表示）来代替实际类型名（例如 `Int`、`String` 或 `Double`）。占位类型名没有指明 `T` 必须是什么类型，但是它指明了 `a` 和 `b` 必须是同一类型 `T`，而无论 `T` 代表什么类型。只有 `swapTwoValues(_:_:)` 函数在调用时，才能根据所传入的实际类型决定 `T` 所代表的类型。

另外一个不同之处在于这个泛型函数名后面跟着占位类型名（`T`），而且是用尖括号括起来的（`<T>`）。这个尖括号告诉 Swift 那个 `T` 是 `swapTwoValues(_:_:)` 函数定义的一个占位类型名，因此 Swift 不会去查找名为 `T` 的实际类型。

`swapTwoValues(_:_:)` 函数现在可以像 `swapTwoInts(_:_:)` 那样调用，可以传入任意类型的值，只要两个值的类型相同。`swapTwoValues(_:_:)` 函数被调用时，`T` 所代表的类型都会由传入的值的类型推断出来。

在下面的两个例子中，`T` 分别代表 `Int` 和 `String`：

```swift
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
// someInt is now 107, and anotherInt is now 3

var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)
// someString is now "world", and anotherString is now "hello"
```

> 注意  
上面定义的 `swapTwoValues(_:_:)` 函数是受 `swap(_:_:)` 函数启发而实现的。后者存在于 Swift 标准库，你可以在你的应用程序中使用它。如果你在代码中需要类似 `swapTwoValues(_:_:)` 函数的功能，你可以使用已存在的 `swap(_:_:)` 函数。

<a name="type_parameters"></a>
## 类型参数

在上面的 `swapTwoValues(_:_:)` 例子中，占位类型 `T` 是类型参数的一个例子。类型参数指定并命名一个占位类型，并且紧随在函数名后面，使用一对尖括号括起来（例如 `<T>`）。

一旦一个类型参数被指定，你可以用它来定义一个函数的参数类型（例如 `swapTwoValues(_:_:)` 函数中的参数 `a` 和 `b`），或者作为函数的返回类型，还可以用作函数主体中的注释类型。在这些情况下，类型参数会在函数调用时被实际类型所替换。（在上面的 `swapTwoValues(_:_:)` 例子中，当函数第一次被调用时，`T` 被 `Int` 替换，第二次调用时，被 `String` 替换。）

你可提供多个类型参数，将它们都写在尖括号中，用逗号分开。

<a name="naming_type_parameters"></a>
## 命名类型参数

在大多数情况下，类型参数具有一个描述性名字，例如 `Dictionary<Key, Value>` 中的 `Key` 和 `Value`，以及 `Array<Element>` 中的 `Element`，这可以告诉阅读代码的人这些类型参数和泛型函数之间的关系。然而，当它们之间的关系没有意义时，通常使用单一的字母来命名，例如 `T`、`U`、`V`，正如上面演示的 `swapTwoValues(_:_:)` 函数中的 `T` 一样。

> 注意  
请始终使用大写字母开头的驼峰式命名法（例如 `T` 和 `MyTypeParameter`）来为类型参数命名，以表明它们是占位类型，而不是一个值。

<a name="generic_types"></a>
## 泛型类型

除了泛型函数，Swift 还允许你定义泛型类型。这些自定义类、结构体和枚举可以适用于任何类型，如同 `Array` 和 `Dictionary` 的用法。

这部分内容将向你展示如何编写一个名为 `Stack` （栈）的泛型集合类型。栈是一系列值的有序集合，和 `Array` 类似，但它相比 Swift 的 `Array` 类型有更多的操作限制。数组允许对其中任意位置的元素执行插入或删除操作。而栈，只允许在集合的末端添加新的元素（称之为入栈）。同样的，栈也只能从末端移除元素（称之为出栈）。

> 注意  
栈的概念已被 `UINavigationController` 类用来模拟视图控制器的导航结构。你通过调用 `UINavigationController` 的 `pushViewController(_:animated:)` 方法来添加新的视图控制器到导航栈，通过 `popViewControllerAnimated(_:)` 方法来从导航栈中移除某个视图控制器。每当你需要一个严格的“后进先出”方式来管理集合，栈都是最实用的模型。

下图展示了一个栈的压栈（push）和出栈（pop）的行为：

![此处输入图片的描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushPop_2x.png)

1. 现在有三个值在栈中。
2. 第四个值被压入到栈的顶部。
3. 现在有四个值在栈中，最近入栈的那个值在顶部。
4. 栈中最顶部的那个值被移除，或称之为出栈。
5. 移除掉一个值后，现在栈再一次只有三个值。

下面展示了如何编写一个非泛型版本的栈，在这种情况下是 `Int` 型的栈：

```swift
struct IntStack {
    var items = [Int]()
    mutating func push(item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
}
```

这个结构体在栈中使用一个名为 `items` 的 `Array` 属性来存储值。`Stack` 提供了两个方法：`push(_:)` 和 `pop()`，用来向栈中压入值以及从栈中移除值。这些方法被标记为 `mutating`，因为它们需要修改结构体的 `items` 数组。

上面的 `IntStack` 结构体只能用于 `Int` 类型。不过，可以定义一个泛型 `Stack` 结构体，从而能够处理任意类型的值。

下面是相同代码的泛型版本：

```swift
struct Stack<Element> {
    var items = [Element]()
    mutating func push(item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}
```

注意，`Stack` 基本上和 `IntStack` 相同，只是用占位类型参数 `Element` 代替了实际的 `Int` 类型。这种类型参数包裹在一对尖括号里（`<Element>`），紧跟在结构体名后面。

`Element` 为尚未提供的类型定义了一个占位名。这种尚未提供的类型可以在结构体的定义中通过 `Element` 来引用。在这种情况下，`Element` 在如下三个地方被用作占位符：

- 创建 `items` 属性，使用 `Element` 类型的空数组对其进行初始化。
- 指定 `push(_:)` 方法的单一参数 `item` 的类型必须是 `Element` 类型。
- 指定 `pop()` 方法的返回值类型必须是 `Element` 类型。

由于 `Stack` 是泛型类型，因此可以用来创建 Swift 中任意有效类型的栈，如同 `Array` 和 `Dictionary`。

你可以通过在尖括号中写出栈中需要存储的数据类型来创建并初始化一个 `Stack` 实例。例如，要创建一个 `String` 类型的栈，可以写成 `Stack<String>()`：

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")
// 栈中现在有 4 个字符串
```

下图展示了 `stackOfStrings` 如何将这四个值入栈：

![此处输入图片的描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushedFourStrings_2x.png)

移除并返回栈顶部的值 `"cuatro"`，即将其出栈：

```swift
let fromTheTop = stackOfStrings.pop()
// fromTheTop 的值为 "cuatro"，现在栈中还有 3 个字符串
```

下图展示了 `stackOfStrings` 如何将顶部的值出栈：

![此处输入图片的描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPoppedOneString_2x.png)

<a name="extending_a_generic_type"></a>
## 扩展一个泛型类型

当你扩展一个泛型类型的时候，你并不需要在扩展的定义中提供类型参数列表。更加方便的是，原始类型定义中声明的类型参数列表在扩展里是可以使用的，并且这些来自原始类型中的参数名称会被用作原始定义中类型参数的引用。

下面的例子扩展了泛型`Stack`类型，为其添加了一个名为`topItem`的只读计算属性，它将会返回当前栈顶端的元素而不会将其从栈中移除。

```swift
extension Stack {
	var topItem: T? {
    	return items.isEmpty ? nil : items[items.count - 1]
    }
}
```

`topItem`属性会返回一个`T`类型的可选值。当栈为空的时候，`topItem`将会返回`nil`；当栈不为空的时候，`topItem`会返回`items`数组中的最后一个元素。

注意这里的扩展并没有定义一个类型参数列表。相反的，`Stack`类型已有的类型参数名称，`T`，被用在扩展中当做`topItem`计算属性的可选类型。

`topItem`计算属性现在可以被用来返回任意`Stack`实例的顶端元素而无需移除它：

```swift
if let topItem = stackOfStrings.topItem {
	print("The top item on the stack is \(topItem).")
}
// 输出 "The top item on the stack is tres."
```

<a name="type_constraints"></a>
##类型约束

`swapTwoValues(_:_:)`函数和`Stack`类型可以作用于任何类型，不过，有的时候对使用在泛型函数和泛型类型上的类型强制约束为某种特定类型是非常有用的。类型约束指定了一个必须继承自指定类的类型参数，或者遵循一个特定的协议或协议构成。

例如，Swift 的`Dictionary`类型对作用于其键的类型做了些限制。在[字典](./04_Collection_Types.html#dictionaries)的描述中，字典的键类型必须是*可哈希*，也就是说，必须有一种方法可以使其被唯一的表示。`Dictionary`之所以需要其键是可哈希是为了以便于其检查其是否已经包含某个特定键的值。如无此需求，`Dictionary`既不会告诉是否插入或者替换了某个特定键的值，也不能查找到已经存储在字典里面的给定键值。

这个需求强制加上一个类型约束作用于`Dictionary`的键上，当然其键类型必须遵循`Hashable`协议（Swift 标准库中定义的一个特定协议）。所有的 Swift 基本类型（如`String`，`Int`， `Double`和 `Bool`）默认都是可哈希。

当你创建自定义泛型类型时，你可以定义你自己的类型约束，当然，这些约束要支持泛型编程的强力特征中的多数。抽象概念如`可哈希`具有的类型特征是根据它们概念特征来界定的，而不是它们的直接类型特征。

<a name="type_constraint_syntax"></a>
### 类型约束语法

你可以写一个在一个类型参数名后面的类型约束，通过冒号分割，来作为类型参数链的一部分。这种作用于泛型函数的类型约束的基础语法如下所示（和泛型类型的语法相同）：

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // 这里是函数主体
}
```

上面这个假定函数有两个类型参数。第一个类型参数`T`，有一个需要`T`必须是`SomeClass`子类的类型约束；第二个类型参数`U`，有一个需要`U`必须遵循`SomeProtocol`协议的类型约束。

<a name="type_constraints_in_action"></a>
### 类型约束实例

这里有个名为`findStringIndex`的非泛型函数，该函数功能是去查找包含一给定`String`值的数组。若查找到匹配的字符串，`findStringIndex(_:_:)`函数返回该字符串在数组中的索引值（`Int`），反之则返回`nil`：

```swift
func findStringIndex(array: [String], _ valueToFind: String) -> Int? {
    for (index, value) in array.enumerate() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```


`findStringIndex(_:_:)`函数可以作用于查找一字符串数组中的某个字符串:

```swift
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
if let foundIndex = findStringIndex(strings, "llama") {
    print("The index of llama is \(foundIndex)")
}
// 输出 "The index of llama is 2"
```

如果只是针对字符串而言查找在数组中的某个值的索引，用处不是很大，不过，你可以写出相同功能的泛型函数`findIndex`，用某个类型`T`值替换掉提到的字符串。

这里展示如何写一个你或许期望的`findStringIndex`的泛型版本`findIndex`。请注意这个函数仍然返回`Int`，是不是有点迷惑呢，而不是泛型类型?那是因为函数返回的是一个可选的索引数，而不是从数组中得到的一个可选值。需要提醒的是，这个函数不会编译，原因在例子后面会说明：

```swift
func findIndex<T>(array: [T], _ valueToFind: T) -> Int? {
    for (index, value) in array.enumerate() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

上面所写的函数不会编译。这个问题的位置在等式的检查上，`“if value == valueToFind”`。不是所有的 Swift 中的类型都可以用等式符（==）进行比较。例如，如果你创建一个你自己的类或结构体来表示一个复杂的数据模型，那么 Swift 没法猜到对于这个类或结构体而言“等于”的意思。正因如此，这部分代码不能可能保证工作于每个可能的类型`T`，当你试图编译这部分代码时估计会出现相应的错误。

不过，所有的这些并不会让我们无从下手。Swift 标准库中定义了一个`Equatable`协议，该协议要求任何遵循的类型实现等式符（==）和不等符（!=）对任何两个该类型进行比较。所有的 Swift 标准类型自动支持`Equatable`协议。

任何`Equatable`类型都可以安全的使用在`findIndex(_:_:)`函数中，因为其保证支持等式操作。为了说明这个事实，当你定义一个函数时，你可以写一个`Equatable`类型约束作为类型参数定义的一部分：

```swift
func findIndex<T: Equatable>(array: [T], _ valueToFind: T) -> Int? {
    for (index, value) in array.enumerate() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```


`findIndex`中这个单个类型参数写做：`T: Equatable`，也就意味着“任何T类型都遵循`Equatable`协议”。

`findIndex(_:_:)`函数现在则可以成功的编译过，并且作用于任何遵循`Equatable`的类型，如`Double`或`String`:

```swift
let doubleIndex = findIndex([3.14159, 0.1, 0.25], 9.3)
// doubleIndex is an optional Int with no value, because 9.3 is not in the array
let stringIndex = findIndex(["Mike", "Malcolm", "Andrea"], "Andrea")
// stringIndex is an optional Int containing a value of 2
```

<a name="associated_types"></a>
##关联类型(Associated Types)

当定义一个协议时，有的时候声明一个或多个关联类型作为协议定义的一部分是非常有用的。一个关联类型作为协议的一部分，给定了类型的一个占位名（或别名）。作用于关联类型上实际类型在协议被实现前是不需要指定的。关联类型被指定为`typealias`关键字。

<a name="associated_types_in_action"></a>
### 关联类型实例

这里是一个`Container`协议的例子，定义了一个`ItemType`关联类型：

```swift
protocol Container {
    typealias ItemType
    mutating func append(item: ItemType)
    var count: Int { get }
    subscript(i: Int) -> ItemType { get }
}
```

`Container`协议定义了三个任何容器必须支持的兼容要求：

- 必须可以通过`append(_:)`方法添加一个新元素到容器里；
- 必须可以通过使用`count`属性获取容器里元素的数量，并返回一个`Int`值；
- 必须可以通过容器的`Int`索引值下标可以检索到每一个元素。

这个协议没有指定容器里的元素是如何存储的或何种类型是允许的。这个协议只指定三个任何遵循`Container`类型所必须支持的功能点。一个遵循的类型在满足这三个条件的情况下也可以提供其他额外的功能。

任何遵循`Container`协议的类型必须指定存储在其里面的值类型，必须保证只有正确类型的元素可以加进容器里，必须明确可以通过其下标返回元素类型。

为了定义这三个条件，`Container`协议需要一个方法指定容器里的元素将会保留，而不需要知道特定容器的类型。`Container`协议需要指定任何通过`append(_:)`方法添加到容器里的值和容器里元素是相同类型，并且通过容器下标返回的容器元素类型的值的类型是相同类型。

为了达到此目的，`Container`协议声明了一个`ItemType`的关联类型，写作`typealias ItemType`。这个协议不会定义`ItemType`是什么的别名，这个信息将由任何遵循协议的类型来提供。尽管如此，`ItemType`别名提供了一种识别`Container`中元素类型的方法，并且用于`append(_:)`方法和`subscript`方法的类型定义，以便保证任何`Container`期望的行为能够被执行。

这里是一个早前`IntStack`类型的非泛型版本，遵循`Container`协议：

```swift
struct IntStack: Container {
    // IntStack的原始实现
    var items = [Int]()
    mutating func push(item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
    // 遵循Container协议的实现
    typealias ItemType = Int
    mutating func append(item: Int) {
        self.push(item)
    }
    var count: Int {
    	return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```


`IntStack`类型实现了`Container`协议的所有三个要求，在`IntStack`类型的每个包含部分的功能都满足这些要求。

此外，`IntStack`指定了`Container`的实现，适用的`ItemType`被用作`Int`类型。对于这个`Container`协议实现而言，定义 `typealias ItemType = Int`，将抽象的`ItemType`类型转换为具体的`Int`类型。

感谢Swift类型参考，你不用在`IntStack`定义部分声明一个具体的`Int`的`ItemType`。由于`IntStack`遵循`Container`协议的所有要求，只要通过简单的查找`append(_:)`方法的`item`参数类型和下标返回的类型，Swift就可以推断出合适的`ItemType`来使用。确实，如果上面的代码中你删除了 `typealias ItemType = Int`这一行，一切仍旧可以工作，因为它清楚的知道`ItemType`使用的是何种类型。

你也可以生成遵循`Container`协议的泛型`Stack`类型：

```swift
struct Stack<T>: Container {
    // original Stack<T> implementation
    var items = [T]()
    mutating func push(item: T) {
        items.append(item)
    }
    mutating func pop() -> T {
        return items.removeLast()
    }
    // conformance to the Container protocol
    mutating func append(item: T) {
        self.push(item)
    }
    var count: Int {
    	return items.count
    }
    subscript(i: Int) -> T {
        return items[i]
    }
}
```

这个时候，占位类型参数`T`被用作`append(_:)`方法的`item`参数和下标的返回类型。Swift 因此可以推断出被用作这个特定容器的`ItemType`的`T`的合适类型。

<a name="extending_an_existing_type_to_specify_an_associated_type"></a>
### 扩展一个存在的类型为一指定关联类型

在[在扩展中添加协议成员](./22_Protocols.html#adding_protocol_conformance_with_an_extension)中有描述扩展一个存在的类型添加遵循一个协议。这个类型包含一个关联类型的协议。

Swift的`Array`已经提供`append(_:)`方法，一个`count`属性和通过下标来查找一个自己的元素。这三个功能都达到`Container`协议的要求。也就意味着你可以扩展`Array`去遵循`Container`协议，只要通过简单声明`Array`适用于该协议而已。如何实践这样一个空扩展，在[通过扩展补充协议声明](./22_Protocols.html#declaring_protocol_adoption_with_an_extension)中有描述这样一个实现一个空扩展的行为：

```swift
extension Array: Container {}
```

如同上面的泛型`Stack`类型一样，`Array`的`append(_:)`方法和下标保证`Swift`可以推断出`ItemType`所使用的适用的类型。定义了这个扩展后，你可以将任何`Array`当作`Container`来使用。

<a name="where_clauses"></a>
## Where 语句

[类型约束](#type_constraints)能够确保类型符合泛型函数或类的定义约束。

对关联类型定义约束是非常有用的。你可以在参数列表中通过*where*语句定义参数的约束。一个`where`语句能够使一个关联类型遵循一个特定的协议，以及（或）那个特定的类型参数和关联类型可以是相同的。你可以写一个`where`语句，紧跟在在类型参数列表后面，where语句后跟一个或者多个针对关联类型的约束，以及（或）一个或多个类型和关联类型间的等价(equality)关系。

下面的例子定义了一个名为`allItemsMatch`的泛型函数，用来检查两个`Container`实例是否包含相同顺序的相同元素。如果所有的元素能够匹配，那么返回一个为`true`的`Boolean`值，反之则为`false`。

被检查的两个`Container`可以不是相同类型的容器（虽然它们可以是），但它们确实拥有相同类型的元素。这个需求通过一个类型约束和`where`语句结合来表示：

```swift
func allItemsMatch<
    C1: Container, C2: Container
    where C1.ItemType == C2.ItemType, C1.ItemType: Equatable>
    (someContainer: C1, anotherContainer: C2) -> Bool {

        // 检查两个Container的元素个数是否相同
        if someContainer.count != anotherContainer.count {
            return false
        }

        // 检查两个Container相应位置的元素彼此是否相等
        for i in 0..<someContainer.count {
            if someContainer[i] != anotherContainer[i] {
                return false
            }
        }

        // 如果所有元素检查都相同则返回true
        return true

}
```


这个函数用了两个参数：`someContainer`和`anotherContainer`。`someContainer`参数是类型`C1`，`anotherContainer`参数是类型`C2`。`C1`和`C2`是容器的两个占位类型参数，决定了这个函数何时被调用。

这个函数的类型参数列紧随在两个类型参数需求的后面：

- `C1`必须遵循`Container`协议 (写作 `C1: Container`)。
- `C2`必须遵循`Container`协议 (写作 `C2: Container`)。
- `C1`的`ItemType`同样是C2的`ItemType`（写作 `C1.ItemType == C2.ItemType`）。
- `C1`的`ItemType`必须遵循`Equatable`协议 (写作 `C1.ItemType: Equatable`)。

第三个和第四个要求被定义为一个`where`语句的一部分，写在关键字`where`后面，作为函数类型参数链的一部分。

这些要求意思是：

`someContainer`是一个`C1`类型的容器。
`anotherContainer`是一个`C2`类型的容器。
`someContainer`和`anotherContainer`包含相同的元素类型。
`someContainer`中的元素可以通过不等于操作(`!=`)来检查它们是否彼此不同。

第三个和第四个要求结合起来的意思是`anotherContainer`中的元素也可以通过 `!=` 操作来检查，因为它们在`someContainer`中元素确实是相同的类型。

这些要求能够使`allItemsMatch(_:_:)`函数比较两个容器，即便它们是不同的容器类型。

`allItemsMatch(_:_:)`首先检查两个容器是否拥有同样数目的items，如果它们的元素数目不同，没有办法进行匹配，函数就会`false`。

检查完之后，函数通过`for-in`循环和半闭区间操作（`..<`）来迭代`someContainer`中的所有元素。对于每个元素，函数检查是否`someContainer`中的元素不等于对应的`anotherContainer`中的元素，如果这两个元素不等，则这两个容器不匹配，返回`false`。

如果循环体结束后未发现没有任何的不匹配，那表明两个容器匹配，函数返回`true`。

这里演示了`allItemsMatch(_:_:)`函数运算的过程：

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")

var arrayOfStrings = ["uno", "dos", "tres"]

if allItemsMatch(stackOfStrings, arrayOfStrings) {
    print("All items match.")
} else {
    print("Not all items match.")
}
// 输出 "All items match."
```

 上面的例子创建一个`Stack`单例来存储`String`，然后压了三个字符串进栈。这个例子也创建了一个`Array`单例，并初始化包含三个同栈里一样的原始字符串。即便栈和数组是不同的类型，但它们都遵循`Container`协议，而且它们都包含同样的类型值。因此你可以调用`allItemsMatch(_:_:)`函数，用这两个容器作为它的参数。在上面的例子中，`allItemsMatch(_:_:)`函数正确的显示了这两个容器的所有元素都是相互匹配的。

  [1]: ../chapter2/06_Functions.html
  [2]: https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushPop_2x.png
  [3]: https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushedFourStrings_2x.png
  [4]: https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPoppedOneString_2x.png
  [5]: ../chapter2/04_Collection_Types.html
  [6]: ../chapter2/21_Protocols.html
  [7]: ../chapter2/21_Protocols.html
  [8]: #type_constraints
