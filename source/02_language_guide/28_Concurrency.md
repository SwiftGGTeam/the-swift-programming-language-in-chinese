# 并发
Swift 对于结构化的编写异步和并行代码有着原生的支持。异步代码可以被挂起并在之后继续执行，同一时间只能有一段代码被执行。代码支持挂起和继续执行，就可以在执行耗时很长的任务时抽空执行一些快速的操作，比如在下载文件、解析文件的过程中更新 UI。*并行代码*指的是多段代码同时执行；比如一个拥有四核处理器的电脑可以同时运行四段代码，每个核心执行其中一项任务。一个使用并行和异步代码的程序可以同时执行多个运算；它可以在某个运算等待外部系统的时候挂起这个运算，从而让编写内存安全的代码更加容易。

并发和异步代码在带来时序灵活性的同时不免会增加复杂度。一些异步代码会自动包含编译时检查——比如，你可以使用 actor 来安全的访问可变的状态。然而，给一段运行缓慢并且有错误的代码添加并发能力并不能让它更快或者更正确的运行。事实上，给代码增加并发能力还有可能导致代码问题更难排查。但如果在需要并发的代码中使用 Swift 原生支持的并发能力会让你在编译阶段就发现问题。

本章剩余的部分将使用*并发*指代异步和并行。

> 注意
> 
> 如果你曾经写过并发的代码的话，那可能使用过线程。Swift 中的并发模型是基于线程的，但你不会直接和线程打交道。在 Swift 中，一个异步函数可以交出它在某个线程上的运行权，这样另一个异步函数在这个函数被阻塞时就能获得此线程的运行权。但是，Swift并不能确定当异步函数恢复运行时其将在哪条线程上运行。

你当然也可以不用 Swift 原生支持去写并发的代码，只不过代码的可读性会下降。比如，下面的这段代码会拉取一系列图片名称的列表，下载列表中的图片然后展示给用户：

```Swift
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

在这个简单的案例中，由于代码中有一系列的 completion handler，最终你必须得使用嵌套闭包。更加复杂的代码会产生更深的嵌套，从而使代码迅速变得臃肿起来。

## 定义和调用异步函数 {#Defining-and-Calling-Asynchronous-Functions}

*异步函数*或*异步方法*是一种能在运行中被挂起的特殊函数或方法。对于普通的同步函数或方法来说，它们只能运行到完成闭包、抛出错误或者永远不返回。异步函数或方法也能做到这三件事，但同时也可以在等待其他资源的时候挂起。在异步函数或者方法的函数体中，你可以标记其中的任意位置是可以被挂起的。

为了标记某个函数或者方法是异步的，你可以在它的声明中的参数列表后边加上 `async` 关键字，和使用 `throws` 关键字来标记 throwing 函数是类似的。如果一个函数或方法有返回值，可以在返回箭头（->）前添加 `async` 关键字。 比如，下面是从图库中拉取图片名称的方法：

```Swift
func listPhotos(inGallery name: String) async -> [String] {
    let result = // 省略一些异步网络请求代码
    return result
}
```
对于那些既是异步又是 throwing 的函数，需要把 `async` 写在`throws` 关键字前边。

调用一个异步方法时，执行会被挂起直到这个异步方法返回。你需要在调用前增加 `await` 关键字来标记此处为可能的悬点（Suspension point）。这就像调用 throwing 函数需要添加 `try` 关键字来标记在发生错误的时候会改变程序流程一样。在一个异步方法中，执行只会在调用另一个异步方法的时候会被挂起；挂起永远都不会是隐式或者优先的，这也意味着所有的悬点都需要被标记为 `await`。

比如，下面的这段代码可以拉取图库中所有图片的名称，然后展示第一张图片：

```Swift
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[0]
let photo = await downloadPhoto(named: name)
show(photo)
```

因为 `listPhotos(inGallery:)` 和 `downloadPhoto(named:)` 都需要发起网络请求，需要花费较长的时间完成。给这两个函数在返回箭头前加上 `async` 可以将它们定义为异步函数，从而使得这部分代码在等待图片的时候让程序的其他部分继续运行。

为了更好理解上面这段代码的并发本质，下面列举出这段程序可能的一个执行顺序：

1. 代码从第一行开始执行到第一个 `await`，调用 `listPhotos(inGallery:)` 函数并且挂起这段代码的执行，等待这个函数的返回。
2. 当这段代码的执行被挂起时，程序的其他并行代码会继续执行。比如，后台有一个耗时长的任务更新其他一些图库。那段代码会执行到被 `await` 的标记的悬点，或者执行完成。
3. 当 `listPhotos(inGallery:)` 函数返回之后，上面这段代码会从上次的悬点开始继续执行。它会把函数的返回赋值给 `photoNames` 变量。
4. 定义 `sortedNames` 和 `name` 的那行代码是普通的同步代码，因为并没有被 `await` 标记，也不会有任何可能的悬点。
5. 接下来的 `await` 标记是在调用 `downloadPhoto(named:)` 的地方。这里会再次暂停这段代码的执行直到函数返回，从而给了其他并行代码执行的机会。
6. 在 `downloadPhoto(named:)` 返回后，它的返回值会被赋值到 `photo` 变量中，然后被作为参数传递给 `show(_:)`。

代码中被 `await` 标记的悬点表明当前这段代码可能会暂停等待异步方法或函数的返回。这也被称为*让出线程（yielding the thread）*，因为在幕后 Swift 会挂起你这段代码在当前线程的执行，转而让其他代码在当前线程执行。因为有 `await` 标记的代码可以被挂起，所以在程序中只有特定的地方才能调用异步方法或函数：

* 异步函数，方法或变量内部的代码
* 静态函数 `main()` 中被打上 `@main` 标记的结构体、类或者枚举中的代码
* 非结构化的子任务中的代码，之后会在 [非结构化并行](#Unstructured-Concurrency) 中说明

在可能的悬点之间的代码将按顺序运行，并不可能被其它并发代码中断。例如，以下代码将一张图片从一个图库移动到另一个图库：

```swift
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
add(firstPhoto, toGallery: "Road Trip")
//此时，firstPhoto暂时地同时存在于两个画廊中
remove(firstPhoto, fromGallery: "Summer Vacation")
```

其它代码不能在 `add(_:toGallery:)` 和 `remove(_:fromGallery:)` 两个方法之间运行。在此期间，第一张图片同时存在于两个图库，暂时打破了应用程序的一个不变量。为了更明确地表示这段代码不能加入 `await` 标记，你可以将这段代码重构为一个同步函数：

```swift
func move(_photoName: String, from source: String, to destination: String) {
	add(photoName, to: destination)
	remove(photoName, from: source)
}
//...
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
move(firstPhoto, from: "Summer Vacation", to: "Road Trip")
```

在上例中，由于 `move(_:from:to:)` 函数为同步函数，你将能够保证它将不会包含潜在的悬点。在未来，试图在该函数中写入并发代码将引发编译错误而非产生bug。

> 注意
> 
> 学习并行的过程中，[Task.sleep(_:)](https://developer.apple.com/documentation/swift/task/3814836-sleep) 方法非常有用。这个方法什么都没有做，只是等待不少于指定的时间（单位纳秒）后返回。下面是使用 `sleep(until:clock:)` 方法模拟网络请求实现 `listPhotos(inGallery:)` 的一个版本：
> 

```swift	
func listPhotos(inGallery name: String) async throws -> [String] {
	try await Task.sleep(until: .now + .seconds(2), clock: .continuous) 
	return ["IMG001", "IMG99", "IMG0404"]
}
```	

## 异步序列 {#Asynchronous-Sequences}

上一节中的 `listPhotos(inGallery:)` 方法会在拿到数组中的所有元素后，以异步的方式一次性返回整个数组。另一种方式是使用*异步序列（asynchronous sequence）*，每次收到一个元素后对其进行处理。下面这段代码展示了如何遍历一个异步序列：

```Swift
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

与普通的 `for-in` 循环相比，上面的例子在 `for` 之后添加了 `await` 关键字。就像在调用异步函数或方法时一样，`await` 表明代码中有一个可能的悬点。`for-await-in` 循环会在每次循环开始的时候因为有可能需要等待下一个元素而挂起当前代码的执行。

想让自己创建的类型使用 `for-in` 循环需要遵循 [Sequence](https://developer.apple.com/documentation/swift/sequence) 协议，这里也同理，如果想让自己创建的类型使用 `for-await-in` 循环，就需要遵循 [AsyncSequence](https://developer.apple.com/documentation/swift/asyncsequence) 协议。

## 并行的调用异步方法 {#Calling-Asynchronous-Functions-in-Parallel}

调用有 `await` 标记的异步函数在同一时间只能执行一段代码。在异步代码执行的过程中，调用方需要等待异步代码执行完后才能继续执行下一行代码。比如，当你想从图库中拉取前三张图片，可以像下面这样，等三次调用完后再执行 `downloadPhoto(named:)` 函数：

```Swift
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

这种方式有一个非常严重的缺陷：虽然下载过程是异步的，并且在等待过程中可以执行其他任务，但每次只能执行一个 `downloadPhoto(named:)`。每一张图片只能在上一张图片下载结束了才开始下载。然而，并没有必要让这些操作等待，每张图片可以独立甚至同时下载。

为了在调用异步函数的时候让它附近的代码并发执行，定义一个常量时，在 `let` 前添加 `async` 关键字，然后在每次使用这个常量时添加 `await` 标记。

```Swift
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

在上面的例子中，三次调用 `downloadPhoto(named:)` 都不需要等待前一次调用结束。如果系统有足够的资源，这三次调用甚至都可以同时执行。这三次调用都没有没标记为 `await`，因为代码不需要被挂起等待函数的结果。程序会继续执行直到 `photos` 被定义，与上面不同的是，在这个时间点由于程序需要上面几次异步调用的结果，所以你需要添加 `await` 关键字来挂起当前代码的执行直到所有图片下载完成。

下面是关于两种不同方法的一些说法：

* 代码中接下来的几行需要依赖异步函数的结果时，需要使用 `await` 来调用异步函数。这样产生的结果是有序的。
* 短时间内并不需要异步函数的结果时，需要使用 `async-let` 来调用异步函数。这样产生的任务是并发的。
* `await` 和 `async-let` 都允许其他任务在他们被挂起的时候执行。
* 在两种情况下，都需要用 `await` 标记可能的悬点，以表明代码在这些点在需要的情况下会被挂起，直到异步函数执行结束。

你也可以在同一段代码中混用两种方式。

## 任务和任务组 {#Tasks-and-Task-Groups}

*任务（task)* 是一项工作，可以作为程序的一部分并发执行。所有的异步代码都属于某个任务。上一部分介绍的 `async-let` 语法就会产生一个子任务。你也可以创建一个任务组并且给其中添加子任务，这可以让你对优先级和任务取消有了更多的掌控力，并且可以控制任务的数量。

任务是按层级结构排列的。同一个任务组中的任务拥有相同的父任务，并且每个任务都可以添加子任务。由于任务和任务组之间明确的关系，这种方式又被称为*结构化并发（structured concurrency）*。虽然你需要确保代码的正确性，但任务间明确的父子关系让 Swift 能替你处理一些如扩散取消（propagating cancellation）之类的行为，并且能让 Swift 在编译阶段发现一些错误。

```Swift
await withTaskGroup(of: Data.self) { taskGroup in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        taskGroup.addTask { await downloadPhoto(named: name) }
    }
}
```

如果想更多的了解任务组，可以参考 [TaskGroup](https://developer.apple.com/documentation/swift/taskgroup)。

### 非结构化并发 {#Unstructured-Concurrency}

对于并发来说，除了上一部分讲到的结构化的方式，Swift 还支持非结构化并发。与任务组中的任务不同的是，*非结构化任务（unstructured task）*并没有父任务。你能以任何方式来处理非结构化任务以满足你程序的需要，但与此同时，你需要对于他们的正确性付全责。如果想创建一个在当前 actor 上运行的非结构化任务，需要调用构造器 [Task.init(priority:operation:)](https://developer.apple.com/documentation/swift/task/3856790-init)。如果想要创建一个不在当前 actor 上运行的非结构化任务（更具体地说就是*游离任务（detached task）*），需要调用类方法 [Task.detached(priority:operation:)](https://developer.apple.com/documentation/swift/task/3856786-detached)。以上两种方法都能返回一个能让你与任务交互（继续等待结果或取消任务）的任务句柄，如下：

```swift
let newPhoto = // ... 图片数据 ...
let handle = Task {
	return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

如果你想更多的了解游离任务，可以参考 [Task](https://developer.apple.com/documentation/swift/task)。

### 任务取消 {#Task-Cancellation}

Swift 中的并发使用合作取消模型。每个任务都会在执行中合适的时间点检查自己是否被取消了，并且会用任何合适的方式来响应取消操作。这些方式会根据你所执行的工作分为以下几种：

* 抛出如 `CancellationError` 这样的错误
* 返回 nil 或者空的集合
* 返回完成一半的工作

如果想检查任务是否被取消，既可以使用 [Task.checkCancellation()](https://developer.apple.com/documentation/swift/task/3814826-checkcancellation)（如果任务取消会返回 `CancellationError`），也可以使用 [Task.isCancelled](https://developer.apple.com/documentation/swift/task/3814832-iscancelled) 来判断，继而在代码中对取消进行相应的处理。比如，一个从图库中下载图片的任务需要删除下载到一半的文件并且关闭连接。

如果想手动执行扩散取消，调用 [Task.cancel()](https://developer.apple.com/documentation/swift/task/3851218-cancel)。

## Actors {#Actors}

你可以使用任务来将自己的程序分割为孤立、并发的部分。任务间相互孤立，这也使得它们能够安全地同时运行。但有时你需要在任务间共享信息。Actors便能够帮助你安全地在并发代码间分享信息。

跟类一样，actor 也是一个引用类型，所以 [类是引用类型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID89) 中关于值类型和引用类型的比较同样适用于 actor 和类。不同于类的是，actor 在同一时间只允许一个任务访问它的可变状态，这使得多个任务中的代码与一个 actor 交互时更加安全。比如，下面是一个记录温度的 actor：

```Swift
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```
你可以用 `actor` 关键字引入一个 actor，后边的花括号中是它的定义。`TemperatureLogger` 中有外部能访问到的属性，并且限制 `max` 变量，所以只能在 actor 内部修改最大值。

你可以使用与结构体和类初始化相同的语法创建一个 actor。当你访问 actor 中的属性或方法时，需要使用 `await` 来标记潜在的悬点，比如：

```Swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
// 输出 "25"
```

在这个例子中，访问 `logger.max` 是一个可能的悬点。因为 actor 在同一时间只允许一个任务访问它的可变状态，如果别的任务正在与 logger 交互，上面这段代码将会在等待访问属性的时候被挂起。

相比之下，actor 内部的代码在访问其属性的时候不需要添加 `await` 关键字。比如，下面的方法是更新 `TemperatureLogger` 中的温度：

```Swift
extension TemperatureLogger {
    func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}
```

`update(with:)` 方法本来就在 actor 中运行，所以没必要在访问如 `max` 等属性的时候加 `await` 关键字。这个方法也展示了为什么要在同一时间只允许一个任务访问其可变状态的其中一个理由：一些对于 actor 状态的改变暂时打破了不可变性。 `TemperatureLogger` 记录了一个温度的列表和最高温度，并且会在你更新了一个新测量值之后更新最大温度。在更新的过程中，在增加了新测量值但没有更新 `max` 前，`TemperatureLogger` 正处于一个暂时不一致的状态。阻止不同的任务和同一个 actor 实例交互可以防止以下事件序列的发生：

1. 你的代码调用 `update(with:)` 方法，并且先更新了 `measurements` 数组。
2. 在你的代码更新 `max` 前，其他地方的代码读取了最大值和温度列表的值。
3. 你的代码更新了 `max` 完成调用。

在这种情况下，其他的代码读取到了错误的值，因为 actor 的读取操作被夹在 `update(with:)` 方法中间，而此时数据暂时是无效的。你可以用 Swift 中的 actor 以防止这种问题的发生，因为 actor 在同一时刻只允许有一个任务能访问它的状态，而且只有在被 `await` 标记为悬点的地方代码才会被打断。因为 `update(with:)` 方法没有任何悬点，没有其他任何代码可以在更新的过程中访问到数据。

如果你想在 actor 外部像访问类属性一样访问 actor 的属性，会得到一个编译时错误；比如：

```Swift
print(logger.max)  // 报错
```

不添加 `await` 关键字的情况下访问 `logger.max` 会失败，因为 actor 的属性是它隔离的本地状态的一部分。Swift 可以保证只有 actor 内部的代码可以访问 actor 的内部状态。这个保证也被称为 *actor isolation*。

## 可发送类型 {#Sendable-Types}

任务和Actor能够帮助你将程序分割为能够安全地并发运行的小块。在一个任务中，或是在一个Actor实例中，程序包含可变状态的部分（如变量和属性）被称为*并发域（Concurrency domain）*。部分类型的数据不能在并发域间共享，因为它们包含了可变状态，但它不能阻止重叠访问。

能够在并发域间共享的类型被称为*可发送类型(Sendable Type)*。例如在调用Actor方法时被作为实参传递，或是作为任务的结果返回。本章之前的例子并未讨论可发送性，因为这些例子均使用了简单值类型，对于在并发域间传递的数据而言，简单值类型总是安全的。而与之相反，另一些类型并不能安全地在并发域间传递。例如，当你在不同的任务间传递该类的实例时，包含可变属性且并未序列化对这些属性的访问的类可能产生不可预测和不正确的结果。

你可以通过声明其符合 `Sendable` 协议来将某个类型标记为可发送类型。该协议并不包含任何代码要求，但Swift对其做出了强制的语义要求。总之，有三种方法将一个类型声明为可发送类型：

- 该类型为值类型，且其可变状态由其它可发送数据构成——例如具有存储属性的结构体或是具有关联值的枚举。

- 该类型不包含任何可变状态，且其不可变状态由其它可发送数据构成——例如只包含只读属性的结构体或类

- 该类型包含能确保其可变状态安全的代码——例如标记了 `@MainActor` 的类或序列化了对特定线程/队列上其属性的访问的类。

如需了解Swift对Sendable协议的语义要求的详细信息，请访问 [Sendable](https://developer.apple.com/documentation/swift/sendable) 协议参考。

部分类型总是可发送类型，如只有可发送属性的结构体和只有可发送关联值的枚举。例如：

```swift
struct TemperatureReading: Sendable {
	var measurement: Int
}
extension TemperatureLogger {
	func addReading(from reading: TemperatureReading) {
		measurements.append(reading.measurement)
	}
}
let logger = TemperatureLogger(label: "Tea kettle", measurement: 85)
let reading = TemperatureReading(measurement: 45)
await logger.addReading(from: reading)
```
由于 `TemperatureReading` 是只有可发送属性的结构体，且该结构体并未被标记为 `public` 或 `@usableFromInline`，因此它是隐式可发送的。下文给出了该结构体的一个符合 `Sendable` 协议的版本：

```swift
struct TemperatureReading {
	var measurement: Int
}
```