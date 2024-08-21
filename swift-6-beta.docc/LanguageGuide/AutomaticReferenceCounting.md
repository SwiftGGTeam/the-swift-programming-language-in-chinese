# 自动引用计数

模拟对象及其关系的生命周期。

Swift 使用*自动引用计数*（ARC）来跟踪和管理应用的内存使用。在大多数情况下，这意味着 Swift 中的内存管理"自动运行"，你不需要自己考虑内存管理。当类实例不再需要时，ARC 会自动释放这些实例使用的内存。

然而，在少数情况下，ARC 需要更多关于代码各部分之间关系的信息，以便为你管理内存。本章描述了这些情况，并展示了如何使 ARC 管理应用的所有内存。Swift 中使用 ARC 的方法与[过渡到 ARC 发布说明](https://developer.apple.com/library/content/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html)中描述的在 Objective-C 中使用 ARC 的方法非常相似。

引用计数只适用于类的实例。结构体和枚举是值类型，不是引用类型，它们不是通过引用存储和传递的。

## ARC 如何工作

每次创建一个类的新实例时，ARC 都会分配一块内存来存储该实例的信息。这块内存保存了实例的类型信息，以及与该实例相关的所有存储属性的值。

此外，当一个实例不再需要时，ARC 会释放该实例使用的内存，以便内存可以用于其他目的。这确保了类实例在不再需要时不会占用内存空间。

然而，如果 ARC 在一个实例仍在使用时就将其释放，那么将无法再访问该实例的属性或调用该实例的方法。实际上，如果你试图访问该实例，你的应用很可能会崩溃。

为了确保实例在仍然需要时不会消失，ARC 会跟踪当前有多少属性、常量和变量正在引用每个类实例。只要至少还存在一个对该实例的活动引用，ARC 就不会释放该实例。

为了实现这一点，每当你将类实例分配给属性、常量或变量时，该属性、常量或变量就会对该实例进行*强引用*。之所以称之为"强"引用，是因为它牢牢地持有该实例，只要该强引用存在，就不允许释放该实例。

## ARC 的实际应用

下面是一个自动引用计数如何工作的例子。这个例子从一个简单的 `Person` 类开始，该类定义了一个名为 `name` 的存储常量属性:

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}
```

<!--
  - test: `howARCWorks`

  ```swifttest
  -> class Person {
        let name: String
        init(name: String) {
           self.name = name
           print("\(name) is being initialized")
        }
        deinit {
           print("\(name) is being deinitialized")
        }
     }
  ```
-->

`Person` 类有一个初始化器，用于设置实例的 `name` 属性并打印一条消息，表示初始化正在进行。`Person` 类还有一个析构器，当类的实例被释放时打印一条消息。

下面的代码片段定义了三个 `Person?` 类型的变量，这些变量在后续的代码片段中用于设置对新的 `Person` 实例的多个引用。因为这些变量是可选类型(`Person?`,而不是 `Person`),它们会自动初始化为 `nil` 值，目前并不引用 `Person` 实例。

```swift
var reference1: Person?
var reference2: Person?
var reference3: Person?
```

<!--
  - test: `howARCWorks`

  ```swifttest
  -> var reference1: Person?
  -> var reference2: Person?
  -> var reference3: Person?
  ```
-->

现在你可以创建一个新的 `Person` 实例并将其分配给这三个变量之一:

```swift
reference1 = Person(name: "John Appleseed")
// 打印 "John Appleseed is being initialized"
```

<!--
  - test: `howARCWorks`

  ```swifttest
  -> reference1 = Person(name: "John Appleseed")
  <- John Appleseed is being initialized
  ```
-->

注意，当你调用 `Person` 类的初始化器时，会打印消息 `"John Appleseed is being initialized"`。这确认了初始化已经发生。

因为新的 `Person` 实例已被分配给 `reference1` 变量，所以现在从 `reference1` 到新的 `Person` 实例有了一个强引用。因为至少存在一个强引用，ARC 会确保这个 `Person` 被保留在内存中而不被释放。

如果你将同一个 `Person` 实例分配给另外两个变量，就会建立两个对该实例的额外强引用:

```swift
reference2 = reference1
reference3 = reference1
```

<!--
  - test: `howARCWorks`

  ```swifttest
  -> reference2 = reference1
  -> reference3 = reference1
  ```
-->

现在这个单一的 `Person` 实例有*三个*强引用。

如果你通过将 `nil` 分配给两个变量来打破这些强引用中的两个(包括原始引用),一个强引用仍然存在，`Person` 实例不会被释放:

```swift
reference1 = nil
reference2 = nil
```

<!--
  - test: `howARCWorks`

  ```swifttest
  -> reference1 = nil
  -> reference2 = nil
  ```
-->

ARC 不会释放 `Person` 实例，直到第三个也是最后一个强引用被打破，这时很明显你不再使用 `Person` 实例:

```swift
reference3 = nil
// 打印 "John Appleseed is being deinitialized"
```

<!--
  - test: `howARCWorks`

  ```swifttest
  -> reference3 = nil
  <- John Appleseed is being deinitialized
  ```
-->

## 类实例之间的强引用循环

在上面的例子中，ARC 能够跟踪你创建的新 `Person` 实例的引用数量，并在不再需要这个 `Person` 实例时将其释放。

然而，可能会出现这样的情况:一个类的实例*永远*不会到达它有零个强引用的时刻。如果两个类实例彼此持有强引用，使得每个实例都使对方保持活跃，就可能发生这种情况。这被称为*强引用循环*。

你可以通过将类之间的某些关系定义为弱引用或无主引用，而不是强引用，来解决强引用循环。这个过程在<doc:AutomaticReferenceCounting#Resolving-Strong-Reference-Cycles-Between-Class-Instances>中描述。然而，在学习如何解决强引用循环之前，了解这种循环是如何产生的是很有用的。

这里有一个例子，展示了如何意外创建强引用循环。这个例子定义了两个名为 `Person` 和 `Apartment` 的类，用于模拟一个公寓楼及其居民:

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

<!--
  - test: `referenceCycles`

  ```swifttest
  -> class Person {
        let name: String
        init(name: String) { self.name = name }
        var apartment: Apartment?
        deinit { print("\(name) is being deinitialized") }
     }
  ---
  -> class Apartment {
        let unit: String
        init(unit: String) { self.unit = unit }
        var tenant: Person?
        deinit { print("Apartment \(unit) is being deinitialized") }
     }
  ```
-->

每个 `Person` 实例都有一个 `String` 类型的 `name` 属性和一个初始为 `nil` 的可选 `apartment` 属性。`apartment` 属性是可选的，因为一个人可能并不总是有公寓。

同样，每个 `Apartment` 实例都有一个 `String` 类型的 `unit` 属性和一个初始为 `nil` 的可选 `tenant` 属性。租户属性是可选的，因为一个公寓可能并不总是有租户。

这两个类还定义了一个析构器，它打印一条消息，表明该类的一个实例正在被释放。这使你能够看到 `Person` 和 `Apartment` 实例是否如预期那样被释放。

下一个代码片段定义了两个可选类型的变量 `john` 和 `unit4A`，它们将在下面被设置为特定的 `Apartment` 和 `Person` 实例。由于是可选类型，这两个变量的初始值都是 `nil`:

```swift
var john: Person?
var unit4A: Apartment?
```

<!--
  - test: `referenceCycles`

  ```swifttest
  -> var john: Person?
  -> var unit4A: Apartment?
  ```
-->

现在你可以创建特定的 `Person` 实例和 `Apartment` 实例，并将这些新实例分配给 `john` 和 `unit4A` 变量:

```swift
john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
```

<!--
  - test: `referenceCycles`

  ```swifttest
  -> john = Person(name: "John Appleseed")
  -> unit4A = Apartment(unit: "4A")
  ```
-->

以下是创建并分配这两个实例后强引用的样子。`john` 变量现在对新的 `Person` 实例有一个强引用，而 `unit4A` 变量对新的 `Apartment` 实例有一个强引用:

![](referenceCycle01)

现在你可以将这两个实例链接在一起，使这个人有一个公寓，而这个公寓有一个租户。注意使用感叹号(`!`)来解包和访问存储在 `john` 和 `unit4A` 可选变量中的实例，以便可以设置这些实例的属性:

```swift
john!.apartment = unit4A
unit4A!.tenant = john
```

<!--
  - test: `referenceCycles`

  ```swifttest
  -> john!.apartment = unit4A
  -> unit4A!.tenant = john
  ```
-->

以下是你将两个实例链接在一起后强引用的样子:

![](referenceCycle02)

不幸的是，链接这两个实例在它们之间创建了一个强引用循环。`Person` 实例现在对 `Apartment` 实例有一个强引用，而 `Apartment` 实例对 `Person` 实例有一个强引用。因此，当你打破 `john` 和 `unit4A` 变量持有的强引用时，引用计数不会降到零，实例不会被 ARC 释放:

```swift
john = nil
unit4A = nil
```

<!--
  - test: `referenceCycles`

  ```swifttest
  -> john = nil
  -> unit4A = nil
  ```
-->

注意，当你将这两个变量设置为 `nil` 时，两个析构器都没有被调用。强引用循环阻止了 `Person` 和 `Apartment` 实例被释放，导致你的应用出现内存泄漏。

以下是你将 `john` 和 `unit4A` 变量设置为 `nil` 后强引用的样子:

![](referenceCycle03)

`Person` 实例和 `Apartment` 实例之间的强引用仍然存在，无法被打破。

## 解决类实例之间的强引用循环

Swift 提供了两种方法来解决你使用类类型的属性时出现的强引用循环:弱引用和无主引用。

弱引用和无主引用使引用循环中的一个实例引用另一个实例而*不*对其保持强引用。这样，实例就可以相互引用而不创建强引用循环。

当另一个实例的生命周期更短时使用弱引用 --- 也就是说，当另一个实例可能先被释放时。在上面的 `Apartment` 例子中，公寓在其生命周期的某个时刻可能没有租户，所以在这种情况下，弱引用是打破引用循环的适当方式。相比之下，当另一个实例具有相同或更长的生命周期时，使用无主引用。

<!--
  QUESTION: how do I answer the question
  "which of the two properties in the reference cycle
  should be marked as weak or unowned?"
-->

### 弱引用

*弱引用*是一种不会对其引用的实例保持强持有的引用，因此不会阻止 ARC 处置被引用的实例。这种行为可以防止引用成为强引用循环的一部分。你可以通过在属性或变量声明前放置 `weak` 关键字来表示一个弱引用。

因为弱引用不会对其引用的实例保持强持有，所以有可能在弱引用仍然引用该实例时，该实例被释放。因此，当弱引用所引用的实例被释放时，ARC 会自动将弱引用设置为 `nil`。而且，由于弱引用需要允许它们的值在运行时被更改为 `nil`，它们总是被声明为可选类型的变量，而不是常量。

你可以像检查任何其他可选值一样检查弱引用中值的存在，并且你永远不会遇到引用已不存在的无效实例的情况。

> 注意:当 ARC 将弱引用设置为 `nil` 时，不会调用属性观察器。

<!--
  - test: `weak-reference-doesnt-trigger-didset`

  ```swifttest
  -> class C {
         weak var w: C? { didSet { print("did set") } }
     }
  -> var c1 = C()
  -> do {
  ->     let c2 = C()
  ->     assert(c1.w == nil)
  ->     c1.w = c2
  << did set
  ->     assert(c1.w != nil)
  -> } // ARC deallocates c2; didSet doesn't fire.
  -> assert(c1.w == nil)
  ```
-->

下面的例子与上面的 `Person` 和 `Apartment` 例子相同，只有一个重要的区别。这次，`Apartment` 类型的 `tenant` 属性被声明为弱引用:

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}
```

<!--
  - test: `weakReferences`

  ```swifttest
  -> class Person {
        let name: String
        init(name: String) { self.name = name }
        var apartment: Apartment?
        deinit { print("\(name) is being deinitialized") }
     }
  ---
  -> class Apartment {
        let unit: String
        init(unit: String) { self.unit = unit }
        weak var tenant: Person?
        deinit { print("Apartment \(unit) is being deinitialized") }
     }
  ```
-->

两个变量(`john` 和 `unit4A`)的强引用以及两个实例之间的链接像之前一样被创建:

```swift
var john: Person?
var unit4A: Apartment?

john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")

john!.apartment = unit4A
unit4A!.tenant = john
```

<!--
  - test: `weakReferences`

  ```swifttest
  -> var john: Person?
  -> var unit4A: Apartment?
  ---
  -> john = Person(name: "John Appleseed")
  -> unit4A = Apartment(unit: "4A")
  ---
  -> john!.apartment = unit4A
  -> unit4A!.tenant = john
  ```
-->

现在你已经将两个实例链接在一起，引用看起来是这样的:

![](weakReference01)

`Person` 实例仍然对 `Apartment` 实例有一个强引用，但 `Apartment` 实例现在对 `Person` 实例有一个*弱*引用。这意味着当你通过将 `john` 变量设置为 `nil` 来打破它所持有的强引用时，不再有对 `Person` 实例的强引用:

```swift
john = nil
// 打印 "John Appleseed is being deinitialized"
```

<!--
  - test: `weakReferences`

  ```swifttest
  -> john = nil
  <- John Appleseed is being deinitialized
  ```
-->

因为不再有对 `Person` 实例的强引用，它被释放，`tenant` 属性被设置为 `nil`:

![](weakReference02)

唯一剩下的对 `Apartment` 实例的强引用来自 `unit4A` 变量。如果你打破*那个*强引用，就不再有对 `Apartment` 实例的强引用:

```swift
unit4A = nil
// 打印 "Apartment 4A is being deinitialized"
```

<!--
  - test: `weakReferences`

  ```swifttest
  -> unit4A = nil
  <- Apartment 4A is being deinitialized
  ```
-->

因为不再有对 `Apartment` 实例的强引用，它也被释放:

![](weakReference03)

> 注意:在使用垃圾收集的系统中，弱指针有时被用来实现简单的缓存机制，因为没有强引用的对象只有在内存压力触发垃圾收集时才会被释放。然而，对于 ARC，值会在它们的最后一个强引用被移除时立即被释放，使得弱引用不适合这种目的。

### 无主引用

像弱引用一样，*无主引用*不会对它引用的实例保持强持有。然而，与弱引用不同，无主引用是在另一个实例具有相同或更长的生命周期时使用的。你通过在属性或变量声明前放置 `unowned` 关键字来表示一个无主引用。

与弱引用不同，无主引用总是被期望有一个值。因此，将一个值标记为无主不会使它成为可选的，ARC 也永远不会将无主引用的值设置为 `nil`。

<!--
  无主引用能做的一切，弱引用都可以做，只是速度更慢，更笨拙(但仍然是正确的)。无主引用之所以有趣，是因为它更快，更容易(没有可选项) ---在那些它实际上对你的数据是正确的情况下。
-->

> 重要:只有当你确定该引用*总是*指向一个尚未被释放的实例时，才使用无主引用。
>
> 如果你在该实例被释放后尝试访问无主引用的值,
> 你会得到一个运行时错误。

<!--
  满足该要求的一种方法是总是通过它们的所有者来访问具有非托管属性的对象，而不是直接保持对它们的引用，因为这些直接引用可能会比所有者存活得更久。然而...这种策略实际上只在无主引用是从一个对象向上到其所有者的反向指针时才有效。
-->

下面的例子定义了两个类，`Customer` 和 `CreditCard`，它们模拟了一个银行客户和该客户可能拥有的信用卡。这两个类各自将另一个类的实例存储为属性。这种关系有可能创建一个强引用循环。

`Customer` 和 `CreditCard` 之间的关系与上面弱引用例子中看到的 `Apartment` 和 `Person` 之间的关系略有不同。在这个数据模型中，一个客户可能有也可能没有信用卡，但一张信用卡将*总是*与一个客户相关联。`CreditCard` 实例永远不会比它引用的 `Customer` 存活得更久。为了表示这一点，`Customer` 类有一个可选的 `card` 属性，但 `CreditCard` 类有一个无主的(且非可选的) `customer` 属性。

此外，只能通过将 `number` 值和 `customer` 实例传递给自定义 `CreditCard` 初始化器来创建新的 `CreditCard` 实例。这确保了当 `CreditCard` 实例被创建时，它总是有一个与之关联的 `customer` 实例。

因为信用卡总是会有一个客户，你将其 `customer` 属性定义为无主引用，以避免强引用循环:

```swift
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit { print("\(name) is being deinitialized") }
}

class CreditCard {
    let number: UInt64
    unowned let customer: Customer
    init(number: UInt64, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { print("Card #\(number) is being deinitialized") }
}
```

<!--
  - test: `unownedReferences`

  ```swifttest
  -> class Customer {
        let name: String
        var card: CreditCard?
        init(name: String) {
           self.name = name
        }
        deinit { print("\(name) is being deinitialized") }
     }
  ---
  -> class CreditCard {
        let number: UInt64
        unowned let customer: Customer
        init(number: UInt64, customer: Customer) {
           self.number = number
           self.customer = customer
        }
        deinit { print("Card #\(number) is being deinitialized") }
     }
  ```
-->

> 注意:`CreditCard` 类的 `number` 属性被定义为 `UInt64` 类型而不是 `Int`，以确保 `number` 属性的容量足够大，可以在 32 位和 64 位系统上存储 16 位卡号。

下一个代码片段定义了一个名为 `john` 的可选 `Customer` 变量，它将用于存储对特定客户的引用。由于是可选的，这个变量的初始值为 nil:

```swift
var john: Customer?
```

<!--
  - test: `unownedReferences`

  ```swifttest
  -> var john: Customer?
  ```
-->

现在你可以创建一个 `Customer` 实例，并用它来初始化和分配一个新的 `CreditCard` 实例作为该客户的 `card` 属性:

```swift
john = Customer(name: "John Appleseed")
john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
```

<!--
  - test: `unownedReferences`

  ```swifttest
  -> john = Customer(name: "John Appleseed")
  -> john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
  ```
-->

现在你已经链接了两个实例，引用看起来是这样的:

![](unownedReference01)

`Customer` 实例现在对 `CreditCard` 实例有一个强引用，而 `CreditCard` 实例对 `Customer` 实例有一个无主引用。

由于无主的 `customer` 引用，当你打破 `john` 变量持有的强引用时，不再有对 `Customer` 实例的强引用:

![](unownedReference02)

因为不再有对 `Customer` 实例的强引用，它被释放。在这之后，不再有对 `CreditCard` 实例的强引用，它也被释放:

```swift
john = nil
// 打印 "John Appleseed is being deinitialized"
// 打印 "Card #1234567890123456 is being deinitialized"
```

<!--
  - test: `unownedReferences`

  ```swifttest
  -> john = nil
  <- John Appleseed is being deinitialized
  <- Card #1234567890123456 is being deinitialized
  ```
-->

上面的最后一个代码片段显示，在 `john` 变量被设置为 `nil` 后，`Customer` 实例和 `CreditCard` 实例的析构器都打印了它们的"deinitialized"消息。

> 注意:上面的例子展示了如何使用*安全*的无主引用。Swift 还提供了*不安全*的无主引用，用于你需要禁用运行时安全检查的情况 --- 例如，出于性能原因。与所有不安全操作一样，你承担了检查代码安全性的责任。
>
> 你通过写 `unowned(unsafe)` 来表示一个不安全的无主引用。如果你在实例被释放后尝试访问不安全的无主引用，你的程序将尝试访问该实例曾经所在的内存位置，这是一个不安全的操作。

<!--
  <rdar://problem/28805121> TSPL: ARC - Add discussion of "unowned" with different lifetimes
  Try expanding the example above so each customer has an array of credit cards.
-->

### 无主可选引用

你可以将对类的可选引用标记为无主的。在 ARC 所有权模型中，无主可选引用和弱引用可以在相同的上下文中使用。

不同之处在于，当你使用无主可选引用时，你有责任确保它始终引用一个有效的对象或被设置为 `nil`。

这里有一个例子，用于跟踪学校某个特定系的提供的课程:

```swift
class Department {
    var name: String
    var courses: [Course]
    init(name: String) {
        self.name = name
        self.courses = []
    }
}

class Course {
    var name: String
    unowned var department: Department
    unowned var nextCourse: Course?
    init(name: String, in department: Department) {
        self.name = name
        self.department = department
        self.nextCourse = nil
    }
}
```

`Department` 对它提供的每门课程保持强引用。在 ARC 所有权模型中，一个系拥有它的课程。`Course` 有两个无主引用，一个指向系，另一个指向学生应该学习的下一门课程; 一门课程不拥有这两个对象中的任何一个。每门课程都是某个系的一部分，所以 `department` 属性不是可选的。然而，因为有些课程没有推荐的后续课程，`nextCourse` 属性是可选的。

这里是使用这些类的一个例子:

```swift
let department = Department(name: "Horticulture")

let intro = Course(name: "Survey of Plants", in: department)
let intermediate = Course(name: "Growing Common Herbs", in: department)
let advanced = Course(name: "Caring for Tropical Plants", in: department)

intro.nextCourse = intermediate
intermediate.nextCourse = advanced
department.courses = [intro, intermediate, advanced]
```

上面的代码创建了一个系和它的三门课程。入门和中级课程都在它们的 `nextCourse` 属性中
存储了一个建议的下一门课程，这个属性维护了一个无主可选引用，指向学生完成这门课程后应该学习的课程。

![](unownedOptionalReference)

无主可选引用不会对它包装的类实例保持强持有，因此它不会阻止 ARC 释放该实例。它在 ARC 下的行为与无主引用相同，除了无主可选引用可以是 `nil`。

像非可选的无主引用一样，你有责任确保 `nextCourse` 始终引用一个尚未被释放的课程。在这个例子中，当你从 `department.courses` 中删除一门课程时，你还需要移除其他课程可能对它的任何引用。

> 注意:可选值的底层类型是 `Optional`，它是 Swift 标准库中的一个枚举。然而，可选类型是值类型不能被标记为 `unowned` 这个规则的一个例外。
>
> 包装类的可选类型不使用引用计数，所以你不需要对可选类型保持强引用。

### 无主引用和隐式解包可选属性

上面的弱引用和无主引用的例子涵盖了两种更常见的场景，在这些场景中需要打破强引用循环。

`Person` 和 `Apartment` 的例子展示了一种情况，其中两个属性都允许为 `nil`，有可能造成强引用循环。这种情况最好用弱引用来解决。

`Customer` 和 `CreditCard` 的例子展示了一种情况，其中一个属性允许为 `nil`，而另一个属性不能为 `nil`，有可能造成强引用循环。这种情况最好用无主引用来解决。

然而，还有第三种情况，其中*两个*属性都应该始终有值，一旦初始化完成，两个属性都不应该为 `nil`。在这种情况下，将一个类上的无主属性与另一个类上的隐式解包可选属性结合使用是很有用的。

这使得两个属性在初始化完成后都可以直接访问(无需可选解包)，同时仍然避免了引用循环。本节将向你展示如何设置这样的关系。

下面的例子定义了两个类，`Country` 和 `City`，每个类都将另一个类的实例存储为属性。在这个数据模型中，每个国家必须始终有一个首都，每个城市必须始终属于一个国家。为了表示这一点，`Country` 类有一个 `capitalCity` 属性，`City` 类有一个 `country` 属性:

```swift
class Country {
    let name: String
    var capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}

class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```

为了建立两个类之间的相互依赖关系，`City` 的初始化器接受一个 `Country` 实例，并将这个实例存储在其 `country` 属性中。

`City` 的初始化器是在 `Country` 的初始化器内部调用的。然而，`Country` 的初始化器在新的 `Country` 实例完全初始化之前，不能将 `self` 传递给 `City` 初始化器，如<doc:Initialization#Two-Phase-Initialization>中所述。

为了应对这个要求，你将 `Country` 的 `capitalCity` 属性声明为隐式解包可选属性，通过在其类型注解末尾加上感叹号(`City!`)来表示。这意味着 `capitalCity` 属性有一个默认值 `nil`，像任何其他可选类型一样，但可以在不需要解包其值的情况下访问，如<doc:TheBasics#Implicitly-Unwrapped-Optionals>中所述。

因为 `capitalCity` 有一个默认的 `nil` 值，一旦 `Country` 实例在其初始化器中设置了 `name` 属性，新的 `Country` 实例就被认为是完全初始化的。这意味着 `Country` 初始化器可以在 `name` 属性被设置后，立即开始引用和传递隐式的 `self` 属性。因此，当 `Country` 初始化器设置自己的 `capitalCity` 属性时，`Country` 初始化器可以将 `self` 作为参数之一传递给 `City` 初始化器。

所有这些意味着你可以在一个语句中创建 `Country` 和 `City` 实例，而不会创建强引用循环，并且可以直接访问 `capitalCity` 属性，而不需要使用感叹号来解包其可选值:

```swift
var country = Country(name: "Canada", capitalName: "Ottawa")
print("\(country.name)'s capital city is called \(country.capitalCity.name)")
// 打印 "Canada's capital city is called Ottawa"
```

在上面的例子中，使用隐式解包可选类型意味着满足了所有两阶段类初始化器的要求。一旦初始化完成，`capitalCity` 属性就可以像非可选值一样使用和访问，同时仍然避免了强引用循环。

## 闭包的强引用循环

你在上面看到了当两个类实例属性相互保持强引用时如何创建强引用循环。你还看到了如何使用弱引用和无主引用来打破这些强引用循环。

如果你将一个闭包分配给类实例的一个属性，并且该闭包的主体捕获了该实例，也可能发生强引用循环。这种捕获可能发生是因为闭包的主体访问了该实例的一个属性，例如 `self.someProperty`，或者因为闭包在该实例上调用了一个方法，例如 `self.someMethod()`。无论哪种情况，这些访问都导致闭包"捕获"`self`，创建了一个强引用循环。

这个强引用循环发生是因为闭包，像类一样，是*引用类型*。当你将一个闭包分配给一个属性时，你是在分配一个对该闭包的*引用*。本质上，这与上面的问题相同 ---两个强引用相互保持对方活着。然而，这次不是两个类实例，而是一个类实例和一个闭包相互保持对方活着。

Swift 为这个问题提供了一个优雅的解决方案，称为*闭包捕获列表*。然而，在你学习如何用闭包捕获列表打破强引用循环之前，先了解一下如何造成这样的循环是很有用的。

下面的例子展示了当使用引用 `self` 的闭包时，如何创建强引用循环。这个例子定义了一个名为 `HTMLElement` 的类，它为 HTML 文档中的单个元素提供了一个简单的模型:

```swift
class HTMLElement {

    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        print("\(name) is being deinitialized")
    }

}
```

`HTMLElement` 类定义了一个 `name` 属性，表示元素的名称，例如用于标题元素的 `"h1"`，用于段落元素的 `"p"`，或用于换行元素的 `"br"`。`HTMLElement` 还定义了一个可选的 `text` 属性，你可以将其设置为一个字符串，该字符串表示要在该 HTML 元素内渲染的文本。

除了这两个简单的属性，`HTMLElement` 类还定义了一个名为 `asHTML` 的延迟属性。这个属性引用了一个闭包，该闭包将 `name` 和 `text` 组合成一个 HTML 字符串片段。`asHTML` 属性的类型是 `() -> String`，或者说"一个不接受参数并返回 `String` 值的函数"。

默认情况下，`asHTML` 属性被分配了一个返回 HTML 标签字符串表示的闭包。如果 `text` 值存在，这个标签包含可选的 `text` 值，如果 `text` 不存在，则不包含文本内容。对于段落元素，闭包会返回 `"<p>some text</p>"` 或 `"<p />"`，这取决于 `text` 属性是等于 `"some text"` 还是 `nil`。

`asHTML` 属性的命名和使用有点像实例方法。然而，因为 `asHTML` 是一个闭包属性而不是实例方法，如果你想为特定的 HTML 元素更改 HTML 渲染，你可以用自定义闭包替换 `asHTML` 属性的默认值。

例如，可以将 `asHTML` 属性设置为一个闭包，如果 `text` 属性为 `nil`，则默认返回一些文本，以防止表示返回一个空的 HTML 标签:

```swift
let heading = HTMLElement(name: "h1")
let defaultText = "some default text"
heading.asHTML = {
    return "<\(heading.name)>\(heading.text ?? defaultText)</\(heading.name)>"
}
print(heading.asHTML())
// 打印 "<h1>some default text</h1>"
```

<!--
  - 测试: `strongReferenceCyclesForClosures`

  ```swifttest
  -> let heading = HTMLElement(name: "h1")
  -> let defaultText = "some default text"
  -> heading.asHTML = {
        return "<\(heading.name)>\(heading.text ?? defaultText)</\(heading.name)>"
     }
  -> print(heading.asHTML())
  <- <h1>some default text</h1>
  ```
-->

> 注意:`asHTML` 属性被声明为惰性属性，因为只有在元素实际需要被渲染为某个 HTML 输出目标的字符串值时才需要它。`asHTML` 是惰性属性这一事实意味着你可以在默认闭包中引用 `self`，因为直到初始化完成且确知 `self` 存在之前，惰性属性都不会被访问。

`HTMLElement` 类提供了一个单一的初始化器，它接受一个 `name` 参数和一个可选的 `text` 参数来初始化一个新元素。该类还定义了一个析构器，用于在 `HTMLElement` 实例被释放时打印一条消息。

下面是如何使用 `HTMLElement` 类来创建和打印一个新实例:

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// 打印 "<p>hello, world</p>"
```

<!--
  - 测试: `strongReferenceCyclesForClosures`

  ```swifttest
  -> var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
  -> print(paragraph!.asHTML())
  <- <p>hello, world</p>
  ```
-->

> 注意:上面的 `paragraph` 变量被定义为一个可选的 `HTMLElement`，这样它就可以在下面被设置为 `nil` 以演示存在强引用循环。

不幸的是，上面编写的 `HTMLElement` 类在 `HTMLElement` 实例和用于其默认 `asHTML` 值的闭包之间创建了一个强引用循环。循环看起来是这样的:

![](closureReferenceCycle01)

实例的 `asHTML` 属性持有对其闭包的强引用。然而，因为闭包在其主体内引用了 `self`(作为引用 `self.name` 和 `self.text` 的方式)，闭包*捕获*了 self，这意味着它持有对 `HTMLElement` 实例的强引用。两者之间创建了一个强引用循环。(关于在闭包中捕获值的更多信息，请参见<doc:Closures#Capturing-Values>。)

> 注意:即使闭包多次引用 `self`，它也只捕获对 `HTMLElement` 实例的一个强引用。

如果你将 `paragraph` 变量设置为 `nil` 并打破其对 `HTMLElement` 实例的强引用，强引用循环会阻止 `HTMLElement` 实例及其闭包的释放:

```swift
paragraph = nil
```

<!--
  - 测试: `strongReferenceCyclesForClosures`

  ```swifttest
  -> paragraph = nil
  ```
-->

注意 `HTMLElement` 析构器中的消息没有被打印，这表明 `HTMLElement` 实例没有被释放。

## 解决闭包的强引用循环

你可以通过在闭包的定义中定义一个*捕获列表*来解决闭包和类实例之间的强引用循环。捕获列表定义了在闭包体内捕获一个或多个引用类型时要使用的规则。就像两个类实例之间的强引用循环一样，你声明每个被捕获的引用为弱引用或无主引用，而不是强引用。选择弱引用还是无主引用取决于代码不同部分之间的关系。

> 注意:Swift 要求你在闭包内引用 `self` 的成员时写成 `self.someProperty` 或 `self.someMethod()`(而不仅仅是 `someProperty` 或 `someMethod()`)。这有助于提醒你可能会意外捕获 `self`。

### 定义捕获列表

捕获列表中的每个项目都是 `weak` 或 `unowned` 关键字与对类实例的引用(如 `self`)或初始化为某个值的变量(如 `delegate = self.delegate`)的配对。这些配对写在一对方括号内，用逗号分隔。

如果提供了闭包的参数列表和返回类型，则将捕获列表放在它们之前:

```swift
lazy var someClosure = {
        [unowned self, weak delegate = self.delegate]
        (index: Int, stringToProcess: String) -> String in
    // 闭包体在这里
}
```

<!--
  - 测试: `strongReferenceCyclesForClosures`

  ```swifttest
  >> class SomeClass {
  >> var delegate: AnyObject?
     lazy var someClosure = {
           [unowned self, weak delegate = self.delegate]
           (index: Int, stringToProcess: String) -> String in
        // 闭包体在这里
  >>    return "foo"
     }
  >> }
  ```
-->

如果闭包没有指定参数列表或返回类型，因为它们可以从上下文推断出来，则将捕获列表放在闭包的最开始，后面跟着 `in` 关键字:

```swift
lazy var someClosure = {
        [unowned self, weak delegate = self.delegate] in
    // 闭包体在这里
}
```

<!--
  - 测试: `strongReferenceCyclesForClosures`

  ```swifttest
  >> class AnotherClass {
  >> var delegate: AnyObject?
     lazy var someClosure = {
           [unowned self, weak delegate = self.delegate] in
        // 闭包体在这里
  >>    return "foo"
     }
  >> }
  ```
-->

### 弱引用和无主引用

当闭包和它捕获的实例总是相互引用，并且总是同时被释放时，将闭包中的捕获定义为无主引用。

相反，当被捕获的引用在将来的某个时刻可能变为 `nil` 时，将捕获定义为弱引用。弱引用总是可选类型，并且当它们引用的实例被释放时自动变为 `nil`。这使你能够在闭包体内检查它们是否存在。

<!--
  <rdar://problem/28812110> 重新框定弱/无主闭包捕获的讨论，以对象图为中心
-->

> 注意:如果被捕获的引用永远不会变为 `nil`，它应该始终被捕获为无主引用，而不是弱引用。

无主引用是解决<doc:AutomaticReferenceCounting#Strong-Reference-Cycles-for-Closures> 中 `HTMLElement` 示例强引用循环的适当捕获方法。以下是如何编写 `HTMLElement` 类以避免循环:

```swift
class HTMLElement {

    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
            [unowned self] in
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        print("\(name) is being deinitialized")
    }

}
```

<!--
  - 测试: `unownedReferencesForClosures`

  ```swifttest
  -> class HTMLElement {
  ---
        let name: String
        let text: String?
  ---
        lazy var asHTML: () -> String = {
              [unowned self] in
           if let text = self.text {
              return "<\(self.name)>\(text)</\(self.name)>"
           } else {
              return "<\(self.name) />"
           }
        }
  ---
        init(name: String, text: String? = nil) {
           self.name = name
           self.text = text
        }
  ---
        deinit {
           print("\(name) is being deinitialized")
        }
  ---
     }
  ```
-->

这个 `HTMLElement` 的实现与之前的实现完全相同，除了在 `asHTML` 闭包内添加了一个捕获列表。在这种情况下，捕获列表是 `[unowned self]`，这意味着"将 self 捕获为无主引用而不是强引用"。

你可以像之前一样创建和打印 `HTMLElement` 实例:

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
print(paragraph!.asHTML())
// 打印 "<p>hello, world</p>"
```

<!--
  - 测试: `unownedReferencesForClosures`

  ```swifttest
  -> var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
  -> print(paragraph!.asHTML())
  <- <p>hello, world</p>
  ```
-->

这是有捕获列表时引用的样子:

![](closureReferenceCycle02)

这次，闭包对 `self` 的捕获是一个无主引用，并且不会对它捕获的 `HTMLElement` 实例保持强引用。如果你将 `paragraph` 变量的强引用设置为 `nil`，`HTMLElement` 实例就会被释放，从下面示例中打印的析构器消息可以看出这一点:

```swift
paragraph = nil
// 打印 "p is being deinitialized"
```

<!--
  - 测试: `unownedReferencesForClosures`

  ```swifttest
  -> paragraph = nil
  <- p is being deinitialized
  ```
-->

关于捕获列表的更多信息，请参见<doc:Expressions#Capture-Lists>。

> 测试软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据此文档实现的软件应该使用最终的操作系统软件进行测试。
>
> 了解更多关于使用[Apple 的测试软件](https://developer.apple.com/support/beta-software/)的信息。

<!--
本源文件是 Swift.org 开源项目的一部分

版权所有 (c) 2014 - 2022 Apple Inc. 和 Swift 项目作者
根据 Apache License v2.0与 Runtime Library Exception 授权

有关许可证信息，请参见 https://swift.org/LICENSE.txt
有关 Swift 项目作者列表，请参见 https://swift.org/CONTRIBUTORS.txt
-->
