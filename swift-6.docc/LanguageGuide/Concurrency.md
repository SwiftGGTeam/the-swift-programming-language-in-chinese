# 并发

执行异步操作。

Swift 原生支持结构化的异步和并行代码。

*异步代码*是能够被暂时挂起并在稍后继续执行的代码，不过在同一时刻中只有一段程序代码执行。通过挂起和恢复代码，你的程序就可以在执行耗时很长的任务时抽空执行一些快速的操作，比如在下载文件、解析文件的过程中更新 UI。*并行代码*则意味着多段代码可以在同一时刻执行；例如，一台拥有四核处理器的电脑可以同时运行四段代码（每个核心执行一项任务）。一款运用并行和异步代码编写的程序可以同时运行多个任务，且可以在等待外部系统处理时，暂时挂起一些任务。本章剩余的部分将使用*并发*一词指代异步和并行代码这一常见的组合。

并发和异步代码在增加调度灵活性的同时也会增加复杂度。在编写并发代码时，你无法事先知道哪些代码会同时运行，也可能不总是知道代码的运行顺序。并发代码中的一个常见问题是当多段代码试图访问某些共享的可变状态时会发生——这被称为*数据竞争*。当你使用语言级别的并发支持时，Swift 会检测并防止数据竞争，大多数数据竞争会产生编译时错误。有些数据竞争在代码运行之前无法被检测到；这些数据竞争会终止代码执行。你可以使用 actor 和隔离来防止数据竞争，本章将对此进行描述。

> 如果你曾经编写过并发代码的话，那你可能习惯于使用线程。Swift 中的并发模型基于线程，但你不会直接与线程打交道。在 Swift 中，一个异步函数可以交出它在某个线程上的运行权 —— 这样，另一个异步函数在这个函数被阻塞时就能获得此在此线程上的运行权。但是，Swift 并不保证异步函数恢复运行时其将在哪条线程上运行。

你当然也可以不用 Swift 原生支持去写并发的代码，但这样代码的可读性会下降。比如，下面的这段代码会拉取一系列图片名称的列表，下载列表中的第一张图片然后展示给用户：

```swift
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[0]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

<!--
  - test: `async-via-nested-completion-handlers`

  ```swifttest
  >> struct Data {}  // Instead of actually importing Foundation
  >> func listPhotos(inGallery name: String, completionHandler: ([String]) -> Void ) {
  >>   completionHandler(["IMG001", "IMG99", "IMG0404"])
  >> }
  >> func downloadPhoto(named name: String, completionHandler: (Data) -> Void) {
  >>     completionHandler(Data())
  >> }
  >> func show(_ image: Data) { }
  -> listPhotos(inGallery: "Summer Vacation") { photoNames in
         let sortedNames = photoNames.sorted()
         let name = sortedNames[0]
         downloadPhoto(named: name) { photo in
             show(photo)
         }
     }
  ```
-->

即便是编写这样一个简单的案例，代码中都不可避免地需要使用一系列的完成回调，这导致出现了多层嵌套的闭包。可想而知，使用这种方式编写更复杂的代码会产生更深的嵌套，从而使得代码迅速变得臃肿、难以阅读。

## 定义和调用异步函数

*异步函数* 或 *异步方法* 是一种能在运行中被挂起的特殊函数或方法。相比之下，普通的同步函数和方法只能持续运行到完成、抛出错误，或是永远不返回。异步函数或方法也能做到这三件事，但多出了等待其他资源时暂停执行的能力。在异步函数或者方法的代码块中，你需要明确标注这些可以暂停执行的位置。

要将一个函数或方法标记为异步，你需要在函数 / 方法签名的参数列表后边加上 `async` 关键字 —— 这和使用`throws` 关键字来标记可抛出错误的函数十分相似。如果你的函数或方法有返回值，你需要将 `async` 添加在返回箭头 (`->`) 的前面。比如，下面这段代码会从图库中提取照片名：

```swift
func listPhotos(inGallery name: String) async -> [String] {
    let result = // ... some asynchronous networking code ...
    return result
}
```

<!--
  - test: `async-function-shape`

  ```swifttest
  -> func listPhotos(inGallery name: String) async -> [String] {
         let result = // ... some asynchronous networking code ...
  >>     ["IMG001", "IMG99", "IMG0404"]
         return result
     }
  ```
-->

对于既是异步又可抛出错误的方法或函数，请将 `async` 写在 `throws` 的前面。

<!--
  - test: `async-comes-before-throws`

  ```swifttest
  >> func right() async throws -> Int { return 12 }
  >> func wrong() throws async -> Int { return 12 }
  !$ error: 'async' must precede 'throws'
  !! func wrong() throws async -> Int { return 12 }
  !! ^~~~~~
  !! async
  ```
-->

在调用异步方法时，当前方法的执行会被暂时挂起，直到被调用异步方法返回。你需要在调用前增加 await 关键字来标记此处为可能的挂起点（suspension point）。这就和在调用会抛出错误的方法前需要添加 `try` 一样 —— 为了标记在发生错误时，程序的执行流程可能发生变化。在一个异步方法中，方法*只会*在调用另一个异步方法时被挂起 —— 挂起永远不会是隐式或抢占式的，所有可能的挂起点都会用 `await` 明确地标注出来。这样一来，并发代码的可读性就获得了提升。

举个例子，下面这段代码会读取图库中所有图片的名称，然后展示第一张图片：

```swift
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[0]
let photo = await downloadPhoto(named: name)
show(photo)
```

<!--

  - test: `defining-async-function`

  ```swifttest
  >> struct Data {}  // Instead of actually importing Foundation
  >> func downloadPhoto(named name: String) async -> Data { return Data() }
  >> func show(_ image: Data) { }
  >> func listPhotos(inGallery name: String) async -> [String] {
  >>     return ["IMG001", "IMG99", "IMG0404"]
  >> }
  >> func f() async {
  -> let photoNames = await listPhotos(inGallery: "Summer Vacation")
  -> let sortedNames = photoNames.sorted()
  -> let name = sortedNames[0]
  -> let photo = await downloadPhoto(named: name)
  -> show(photo)
  >> }
  ```
-->

由于 `listPhotos(inGallery:)` 和 `downloadPhoto(named:)` 这两个方法都需要发起网络请求，他们都可能耗时较长。为这两个函数在返回箭头前加上 `async` 可以将它们定义为异步函数，从而使得这部分代码在等待图片下载时，程序中的其他部分可以继续运行。

为了更好理解上面这段代码的并发本质，下面列举出这段程序其中一种可能的执行顺序：

1. 代码从第一行开始执行到第一个 `await`，调用 `listPhotos(inGallery:)` 函数并且挂起这段代码的执行，等待这个函数的返回。
   
2. 当这段代码的执行被挂起时，程序的其他并行代码便获得了继续执行的机会。比如，也许此时后台有一个耗时长的任务会更新其他一些图库。这个新任务会一直执行到下一个被 `await` 的标记的挂起点，或者一直执行到完成。
   
3. 在 `listPhotos(inGallery:)` 函数返回之后，上面这段代码会从上次的挂起点处恢复并继续执行。函数的返回返回值会被赋给 photoNames 变量。 
   
4. 定义 `sortedNames` 和 `name` 的两行代码是普通的同步代码。因为并没有被 `await` 标记，这里并不会有任何潜在的挂起点。
   
5. 接下来的 `await` 标记出现在调用 `downloadPhoto(named:)` 的地方。这里会再次暂停这段代码的执行直到函数返回，从而给了其他并行代码执行的机会。
   
6. 在 `downloadPhoto(named:)` 返回后，它的返回值会被赋值到 photo 变量中，然后被作为参数传递给 `show(_:)`。

代码中被 `await` 标记的挂起点表明当前这段代码可能会暂停等待异步方法或函数的返回。这也被称为*让出线程*，因为在幕后 Swift 会挂起这段代码在当前线程的执行，转而让其他代码在当前线程执行。因为有 `await` 标记的代码可以被挂起，所以在程序中只有特定的地方才能调用异步方法或函数：

- 异步函数，方法或变量的内部的代码

- 静态函数 `main()` 中被打上 `@main` 标记的结构体、类或者枚举中的代码
  
- 非结构化的子任务中的代码，之后会在 <doc:Concurrency#非结构化并发> 中说明

<!--
  SE-0296 specifically calls out that top-level code is *not* an async context,
  contrary to what you might expect.
  If that gets changed, add this bullet to the list above:

  - Code at the top level that forms an implicit main function.
-->

在学习并发编程时， [`Task.sleep(for:tolerance:clock:)`][] 这个方法非常有用。这个方法会将当前任务挂起至少指定的时长。以下是 `listPhotos(inGallery:)` 这个函数的另一个版本，它使用 `sleep(for:tolerance:clock:)` 来模拟等待网络请求:

[`Task.sleep(for:tolerance:clock:)`]: https://developer.apple.com/documentation/swift/task/sleep(for:tolerance:clock:)

```swift
func listPhotos(inGallery name: String) async throws -> [String] {
    try await Task.sleep(for: .seconds(2))
    return ["IMG001", "IMG99", "IMG0404"]
}
```

<!--
  - test: `sleep-in-toy-code`

  ```swifttest
  >> struct Data {}  // Instead of actually importing Foundation
  -> func listPhotos(inGallery name: String) async throws -> [String] {
         try await Task.sleep(for: .seconds(2))
         return ["IMG001", "IMG99", "IMG0404"]
  }
  ```
-->

这个版本的 `listPhotos(inGallery:)` 既是异步的，又可能抛出错误，因为 `Task.sleep(until:tolerance:clock:)` 可能抛出错误。当你调用这个版本的 `listPhotos(inGallery:)` 时，你需要同时添加 `try` 和 `await`：

```swift
let photos = try await listPhotos(inGallery: "A Rainy Weekend")
```

异步函数和可抛出错误的函数有一些相似点：当你定义一个异步或是可抛出错误的函数时，你不仅需要添加 `async` 或者 `throws`，还需要在调用这些方法的代码处添加 `await` 或 `try`。一个异步函数可以调用另一个异步函数，就像一个可抛出错误的函数也可以调用另一个可抛出错误的函数。

但是，这里有一个非常重要的区别。你可以通过用 `do-catch` 包裹可抛错误的代码来处理错误；也可以使用 `Result` 来存储这个错误，以便将错误交由其他地方的代码来处理。这个方法可以让你在不抛错误的函数里调用可抛错误的函数。例如：

```swift
func availableRainyWeekendPhotos() -> Result<[String], Error> {
    return Result {
        try listDownloadedPhotos(inGallery: "A Rainy Weekend")
    }
}
```

相比之下，并没有什么安全的方式可以让你在同步代码里执行异步代码并等待结果。因此，Swift 的标准库特意舍弃了这样不安全的功能 —— 如果你执意要自己编写这样的逻辑，最终很有可能导致难以排查的数据竞争、线程问题，或是死锁。当你向现有项目添加并发代码时，请自顶向下进行。特别地，请先将最顶层的代码转换为异步的，然后再开始转换被其调用的其他代码，以此类推一层一层地向下转换。自底向上改造代码的方法是不可能的，因为同步代码无法调用异步代码。

<!--
  OUTLINE

  ## Asynchronous Closures

  like how you can have an async function, a closure con be async
  if a closure contains 'await' that implicitly makes it async
  you can mark it explicitly with "async -> in"

  (discussion of @MainActor closures can probably go here too)
-->

## 异步序列

前文的 `listPhotos(inGallery:)` 方法会在异步地准备好整个数组的所有元素后，一次性返回整个数组；另一种方式是使用*异步序列 (asynchronous sequence)* 在每个元素就绪的当下都将其返回。下面这段代码展示了如何遍历一个异步序列：

```swift
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

<!--

  - test: `async-sequence`

  ```swifttest
  -> import Foundation

  >> func f() async throws {
  -> let handle = FileHandle.standardInput
  -> for try await line in handle.bytes.lines {
         print(line)
     }
  >> }
  ```
-->

在这个事例中，我们使用 `for` 和 `await` 来代替了普通的 `for`-`in` 循环。和你调用异步函数或方法一样，在这里 `await` 也标注了潜在的挂起点。一个 `for`-`await`-`in` 循环在每一轮迭代的开头都有可能挂起，以便等待序列中下一个元素的就绪。

正如同你可以在 `for`-`in` 循环中通过遵从 [`Sequence`][] 协议来使用自定义类型一样，你也可以在 `for`-`await`-`in` 循环中通过遵循 [`AsyncSequence`] 来使用自定义类型。

[`Sequence`]: https://developer.apple.com/documentation/swift/sequence
[`AsyncSequence`]: https://developer.apple.com/documentation/swift/asyncsequence

<!--
  TODO what happened to ``Series`` which was supposed to be a currency type?
  Is that coming from Combine instead of the stdlib maybe?

  Also... need a real API that produces a async sequence.
  I'd prefer not to go through the whole process of making one here,
  since the protocol reference has enough detail to show you how to do that.
  There's nothing in the stdlib except for the AsyncFooSequence types.
  Maybe one of the other conforming types from an Apple framework --
  how about FileHandle.AsyncBytes (myFilehandle.bytes.lines) from Foundation?

  https://developer.apple.com/documentation/swift/asyncsequence
  https://developer.apple.com/documentation/foundation/filehandle

  if we get a stdlib-provided async sequence type at some point,
  rewrite the above to fit the same narrative flow
  using something like the following

  let names = await listPhotos(inGallery: "Winter Vacation")
  for await photo in Photos(names: names) {
      show(photo)
  }
-->

## 并行调用异步函数

使用 `await` 来调用异步方法时，在同一时刻只会有一段代码运行。在一段异步代码运行的过程中，调用方会先等待其返回，然后才会执行下一行代码。举个例子，如果你想要读取图库中的前三张照片，你可以像下方这样轮流等待三次对 `downloadPhoto(named:)` 调用的返回：

```swift
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

<!--
  - test: `defining-async-function`

  ```swifttest
  >> func show(_ images: [Data]) { }
  >> func ff() async {
  >> let photoNames = ["IMG001", "IMG99", "IMG0404"]
  -> let firstPhoto = await downloadPhoto(named: photoNames[0])
  -> let secondPhoto = await downloadPhoto(named: photoNames[1])
  -> let thirdPhoto = await downloadPhoto(named: photoNames[2])

  -> let photos = [firstPhoto, secondPhoto, thirdPhoto]
  -> show(photos)
  >> }
  ```
-->

这种方式有一个显著的缺点：尽管下载过程是异步的，并且其他的任务也可以在下载过程中继续执行，但每次只有一个 `downloadPhoto(named:)` 的调用会运行 —— 每张照片都只有在上一张照片完成下载后才会开始下载。然而，这些任务其实没有必要相互等待：每张照片都可以独立下载，甚至是在同一时间下载。

要想在调用异步函数时，允许其与周围的代码并行执行，你可以在使用 `let` 定义一个常量时，在前方添加 `async` 标注。然后，你需要在使用此常量时，添加 `await` 标记。

```swift
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

<!--

  - test: `calling-with-async-let`

  ```swifttest
  >> struct Data {}  // Instead of actually importing Foundation
  >> func show(_ images: [Data]) { }
  >> func downloadPhoto(named name: String) async -> Data { return Data() }
  >> let photoNames = ["IMG001", "IMG99", "IMG0404"]
  >> func f() async {
  -> async let firstPhoto = downloadPhoto(named: photoNames[0])
  -> async let secondPhoto = downloadPhoto(named: photoNames[1])
  -> async let thirdPhoto = downloadPhoto(named: photoNames[2])

  -> let photos = await [firstPhoto, secondPhoto, thirdPhoto]
  -> show(photos)
  >> }
  ```
-->

在这个例子中，所有三次对 `downloadPhoto(named:)` 的调用都会立即开始，而不等待前一个调用返回。如果系统此时有足够的可用资源，三个下载任务会并行执行。注意到在这三次函数调用中，我们都没有使用 `await` 标注，因为这些调用并不会导致代码执行挂起。代码持续执行到 `photos` 被定义的那一行时，你才需要 `await` 来暂停程序执行，因为程序需要前面的调用结果才能为 `photos` 赋值。

你可以这样理解这两种方式的区别：

- 当紧接下来的代码就需要依赖当前函数的返回值时，使用 `await` 来调用函数。这样一来，任务就可以按顺序执行。
- 短时间内不需要异步函数的返回结果时，使用 `async-let` 来调用函数。这样任务就可以并行执行。 
- `await` 和 `async-let` 都允许其他任务在他们被挂起的时候执行。
- 在两种情况下，都需要用 `await` 标记可能的挂起点，以表明代码在这些点在需要的情况下会被暂停，直到被调用的异步函数返回。

你也可以在同一段代码中混合使用两种方法。

## 任务和任务组

一项*任务 (task)*是一个单元的工作，且可以作为程序的一部分异步执行。所有的异步代码都在某一项任务中执行。一项任务本身只能完成一件事情，但当你创建多个任务时，Swift 可以让他们同时运行。

上一节中的 `async`-`let` 会隐式地创建一项子任务 —— 如果你已经知道程序需要执行什么任务，这种语法十分便捷。你也可以创建一个任务组（`TaskGroup` 的实例）然后显式地向其中添加子任务。这可以让你更好地控制优先级和任务取消，也可以让你动态决定要创建多少任务。

[`TaskGroup`]: https://developer.apple.com/documentation/swift/taskgroup

任务的排列具有层级结构。同一个任务组中的所有任务都具有相同的父任务， 且他们也可以拥有自己的子任务。考虑到任务和任务组之间具有这种显式的关系，我们将这种范式称为*结构化并发 (structured concurrency)*。这种任务间的显式父 - 子关系有几种优势：

- 杜绝了在父任务中忘记等待子任务完成的可能性。
- 当子任务被赋予更高的优先级时，父任务的优先级也会随之自动提高。
- 当父任务被取消时，其所有的子任务都会被自动取消。
- 一项任务的本地值会自动而高效地扩散到子任务中。

在下面这个代码示例中，我们可以处理任意数量的照片下载任务：

```swift
await withTaskGroup(of: Data.self) { group in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        group.addTask {
            return await downloadPhoto(named: name)
        }
    }

    for await photo in group {
        show(photo)
    }
}
```

上面的代码创建了一个新的任务组，并创建了一些子任务，每个任务会下载一张照片。Swift 会在条件许可的情况下，尽可能多地并行执行这些任务。在某一项子任务完成下载后，其对应的照片就会立即被显示出来。不过，这些子任务会以任意顺序完成执行，所以这些照片的最终展示顺序也会是随机的。

> 如果下载照片的代码可能抛出错误，你需要调用 `withThrowingTaskGroup(of:returning:body:)`。

在上面的代码中，每张照片都会被下载然后展示出来，所以任务组没有返回值。对于需要返回结果的任务组，你可以在传递给 `withTaskGroup(of:returning:body:)` 的闭包中，编写聚合任务结果的逻辑。

```swift
let photos = await withTaskGroup(of: Data.self) { group in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        group.addTask {
            return await downloadPhoto(named: name)
        }
    }

    var results: [Data] = []
    for await photo in group {
        results.append(photo)
    }

    return results
}
```

如同之前的范例，这个示例中为每张照片创建了一个下载子任务。与之前不同的是，这里的 `for`-`await`-`in` 循环会等待下一个子任务结束，将其的结果插入到结果数组中，然后继续等待所有子任务完成。最后，这个任务组会将所有下载完毕的照片数组作为一个整体返回。

<!--
TODO:
In the future,
we could extend the example above
to show how you can limit the number of concurrent tasks
that get spun up by a task group.
There isn't a specific guideline we can give
in terms of how many concurrent tasks to run --
it's more "profile your code, and then adjust".

See also:
https://developer.apple.com/videos/play/wwdc2023/10170?time=688

We could also show withDiscardingTaskGroup(...)
since that's optimized for child tasks
whose values aren't collected.
-->

### 任务取消

Swift 中的并发使用的是「协作取消」模型：每个任务都应当在合适的位置检查其是否已被取消，然后对取消指令做出合理的响应。取决于任务所执行工作的性质，通常有这几种方式来响应取消指令：

- 抛出类似 `CancellationError` 的错误
- 返回 `nil` 或是一个空的集合
- 返回部分完成的工作

如果图片较大或网络较慢，图片下载可能耗时非常长。要允许用户取消这项事务，而不必等待所有任务完成，这些任务必须要检查取消指令，并在收到指令时停止运行。有两种方式可以做到这件事：调用 `Task.checkCancellation()` 方法，或是检查 `Task.isCancelled` 属性。如果任务已被取消，调用 `checkCancellation()` 会抛出错误；一项可抛错误的任务可以将错误向外扩散，并停止任务中的所有工作。这样做的好处是代码编写简单、理解成本更低。要获得更多的灵活度，你可使用 `isCancelled` 属性，这样你就可以在停止任务的过程中，做一些例如关闭网络连接、清理临时文件的清理工作。

[`Task.checkCancellation()`]: https://developer.apple.com/documentation/swift/task/3814826-checkcancellation
[`Task.isCancelled` type]: https://developer.apple.com/documentation/swift/task/iscancelled-swift.type.property

```swift
let photos = await withTaskGroup(of: Optional<Data>.self) { group in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        let added = group.addTaskUnlessCancelled {
            guard !Task.isCancelled else { return nil }
            return await downloadPhoto(named: name)
        }
        guard added else { break }
    }

    var results: [Data] = []
    for await photo in group {
        if let photo { results.append(photo) }
    }
    return results
}
```

上面这段代码相比前一个版本有几个变动：

- 每项任务都使用 [`TaskGroup.addTaskUnlessCancelled(priority:operation:)`][] 方法来添加,
  以避免在任务取消之后产生新的任务。
- 在每次调用 `addTaskUnlessCancelled(priority:operation:)` 之后,
  这段代码都会确认子任务的确已经添加成功了。如果任务组已被取消，那么 `added` 的值就会为 `false` —— 这种情况下，代码会不再尝试下载更多的照片。
- 每项任务都会在开始下载照片前，检查取消指令。如果发现任务已被取消，那么返回 `nil`。
- 最后，任务组在收集结果时会跳过所有的 `nil`。通过返回 `nil` 来响应取消指令意味着任务组可以返回部分结果（也就是在取消的那一刻之前已经下载完成的照片），而不是将已完成的工作也一并丢弃。

[`TaskGroup.addTaskUnlessCancelled(priority:operation:)`]: https://developer.apple.com/documentation/swift/taskgroup/addtaskunlesscancelled(priority:operation:)

> 若要在一项任务之外检查这项任务是否已被取消，请使用 `Task.isCancelled` 实例属性，而不是类属性。

[`Task.isCancelled` instance]: https://developer.apple.com/documentation/swift/task/iscancelled-swift.property

如果你的事务需要在被取消时立即收到提醒，可以使用 [`Task.withTaskCancellationHandler(operation:onCancel:isolation:)`][] 方法。例如：

[`Task.withTaskCancellationHandler(operation:onCancel:isolation:)`]: https://developer.apple.com/documentation/swift/withtaskcancellationhandler(operation:oncancel:isolation:)

```swift
let task = await Task.withTaskCancellationHandler {
    // ...
} onCancel: {
    print("Canceled!")
}

// ... 一段时间之后 ...
task.cancel()  // 输出 "Canceled!"
```

在你使用取消回调时，任务取消依然是协作的：任务要么一直执行到完成，要么主动检查取消指令并提早停止。因为在取消回调开始执行时，任务本身依然还在运行，请注意避免在任务和取消回调之间共享状态 —— 这可能导致数据竞争。

<!--
  OUTLINE

  - cancellation propagates (Konrad's example below)

  ::

      let handle = Task.detached {
      await withTaskGroup(of: Bool.self) { group in
          var done = false
          while done {
          await group.addTask { Task.isCancelled } // 这项子任务被取消了吗？
          done = try await group.next() ?? false
          }
      print("done!") // <1>
      }
    
      handle.cancel()
      // 完成!           <1>
-->

<!--
  Not for WWDC, but keep for future:

  task have deadlines, not timeouts --- like "now + 20 ms" ---
  a deadline is usually what you want anyhow when you think of a timeout

  - this chapter introduces the core ways you use tasks;
  for the full list what you can do,
  including the unsafe escape hatches
  and ``Task.current()`` for advanced use cases,
  see the Task API reference [link to stdlib]

  - task cancellation isn't part of the state diagram below;
  it's an independent property that can happen in any state

  [PLACEHOLDER ART]

  Task state diagram

     |
     v
  Suspended <-+
     |        |
     v        |
  Running ----+
     |
     v
  Completed

  [PLACEHOLDER ART]

  Task state diagram, including "substates"

     |
     v
  Suspended <-----+
  (Waiting) <---+ |
     |          | |
     v          | |
  Suspended     | |
  (Schedulable) / |
     |            |
     v            |
  Running --------+
     |
     v
  Completed

  .. _Concurrency_ChildTasks:

  Adding Child Tasks to a Task Group

  - awaiting ``withGroup`` means waiting for all child tasks to complete

  - a child task can't outlive its parent,
    like how ``async``-``let`` can't outlive the (implicit) parent
    which is the function scope

  - awaiting ``addTask(priority:operation:)``
    means waiting for that child task to be added,
    not waiting for that child task to finish

  - ?? maybe cover ``TaskGroup.next``
    probably nicer to use the ``for await result in someGroup`` syntax

  quote from the SE proposal --- I want to include this fact here too

  > There's no way for reference to the child task to
  > escape the scope in which the child task is created.
  > This ensures that the structure of structured concurrency is maintained.
  > It makes it easier to reason about
  > the concurrent tasks that are executing within a given scope,
  > and also enables various optimizations.
-->

<!--
  OUTLINE

  .. _Concurrency_TaskPriority:

  Setting Task Priority
  ~~~~~~~~~~~~~~~~~~~~~

  - priority values defined by ``Task.Priority`` enum

  - type property ``Task.currentPriority``

  - The exact result of setting a task's priority depends on the executor

  - TR: What's the built-in stdlib executor do?

  - Child tasks inherit the priority of their parents

  - If a high-priority task is waiting for a low-priority one,
  the low-priority one gets scheduled at high priority
  (this is known as :newTerm:`priority escalation`)

  - In addition, or instead of, setting a low priority,
  you can use ``Task.yield()`` to explicitly pass execution to the next scheduled task.
  This is a sort of cooperative multitasking for long-running work.
-->

### 非结构化并发

除了像前文所述那样以结构化的方式编写并发逻辑，Swift 也支持非结构化并发。不像从属于某个任务组的任务，一项*非结构化*的任务没有父任务。管理非结构化任务时，你将拥有最大的灵活性，可以按任意方式组织他们。但是，你也将需要对他们的正确性承担全部责任。

要创建一个与周围代码运行方式类似的非结构化任务，请调用 [`Task.init(name:priority:operation:)`][] 构造器。新任务默认会继承当前任务的 actor 隔离、优先级和任务局部状态。要创建一个更独立于周围代码的非结构化任务——更具体地说是*分离任务*——请调用 [`Task.detached(name:priority:operation:)`][] 静态方法。新任务默认会在没有任何 actor 隔离的情况下运行，并且不会继承当前任务的优先级或任务局部状态。这两项操作都会返回 task 实例，便于你管理他们。比如，你可以等待他们的返回结果，也可以取消他们：
<!-- TODO: In SE-0461 terms, Task.detached runs as an @concurrent function. -->

```swift
let newPhoto = // ... some photo data ...
let handle = Task {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

要了解更多有关如何管理分离任务的信息，请查看 [`Task`](https://developer.apple.com/documentation/swift/task).

[`Task.init(name:priority:operation:)`]: https://developer.apple.com/documentation/swift/task/init(name:priority:operation:)-43wmk
[`Task.detached(name:priority:operation:)`]: https://developer.apple.com/documentation/swift/task/detached(name:priority:operation:)-795w1

<!--
  TODO Add some conceptual guidance about
  when to make a method do its work in a detached task
  versus making the method itself async?
  (Pull from my 2021-04-21 notes from Ben's talk rehearsal.)
-->

## 隔离

前面的章节讨论了拆分并发工作的方法。这些工作可能涉及修改共享数据，例如应用程序的 UI。如果代码的不同部分可以同时修改相同的数据，就会有产生数据竞争的风险。Swift 可以保护你的代码免受数据竞争的影响：每当你读取或修改一段数据时，Swift 会确保没有其他代码同时修改它。这种保证被称为*数据隔离*。数据隔离主要有三种方式：

1. 不可变数据始终是隔离的。因为你无法修改常量，所以不存在其他代码在你读取常量的同时修改它的风险。

2. 仅由当前任务引用的数据始终是隔离的。局部变量可以安全地读写，因为任务之外的代码没有对该内存的引用，所以其他代码无法修改该数据。此外，如果你在闭包中捕获该变量，Swift 会确保该闭包不会被并发使用。

3. 由 actor 保护的数据是隔离的，前提是访问该数据的代码也隔离到该 actor。如果当前函数隔离到某个 actor，那么读写该 actor 保护的数据是安全的，因为隔离到同一 actor 的任何其他代码都必须等待轮到它才能运行。

## 主 Actor

Actor 是一个对象，它通过强制代码轮流访问可变数据来保护对可变数据的访问。在许多程序中，最重要的 actor 是*主 actor*。在应用程序中，主 actor 保护用于显示 UI 的所有数据。主 actor 轮流渲染 UI、处理 UI 事件以及运行需要查询或更新 UI 的代码。

在开始在代码中使用并发之前，所有内容都在主 actor 上运行。当你识别出长时间运行或资源密集型的代码时，可以以安全且正确的方式将这些工作移出主 actor。

> 注意：主 actor 与主线程密切相关，但它们不是同一回事。主 actor 有私有可变状态，主线程序列化对该状态的访问。当你在主 actor 上运行代码时，Swift 会在主线程上执行该代码。由于这种联系，你可能会看到这两个术语可以互换使用。你的代码与主 actor 交互；主线程是较低级别的实现细节。

<!--
TODO: Discuss the SE-0478 syntax for 'using @MainActor'

When you're writing UI code,
you often want all of it to be isolated to the main actor.
To do this, you can write `using @MainActor`
at the top of a Swift file to apply that attribute by default
to all the code in the file.
If there's a specific function or property
that you want to exclude from `using @MainActor`,
you can use the `nonisolated` modifier on that declaration
to override the default.
Modules can be configured to be built using `using @MainActor` by default.
This can be overridden on a per-file basis
by writing `using nonisolated` at the top of a file.
-->

有几种方法可以在主 actor 上运行工作。要确保函数始终在主 actor 上运行，请使用 `@MainActor` 属性标记它：

```swift
@MainActor
func show(_: Data) {
    // ... UI 代码用于显示照片 ...
}
```

在上面的代码中，`show(_:)` 函数上的 `@MainActor` 属性要求此函数只能在主 actor 上运行。在主 actor 上运行的其他代码中，你可以将 `show(_:)` 作为同步函数调用。但是，要从不在主 actor 上运行的代码调用 `show(_:)`，你必须包含 `await` 并将其作为异步函数调用，因为切换到主 actor 会引入一个潜在的挂起点。例如：

```swift
func downloadAndShowPhoto(named name: String) async {
    let photo = await downloadPhoto(named: name)
    await show(photo)
}
```

在上面的代码中，`downloadPhoto(named:)` 和 `show(_:)` 函数在调用时都可能挂起。这段代码还展示了一个常见模式：在后台执行长时间运行和 CPU 密集型的工作，然后切换到主 actor 更新 UI。因为 `downloadAndShowPhoto(named:)` 函数不在主 actor 上，`downloadPhoto(named:)` 中的工作也不在主 actor 上运行。只有 `show(_:)` 中更新 UI 的工作在主 actor 上运行，因为该函数标记了 `@MainActor` 属性。
<!-- TODO
When updating for SE-0461,
this is a good place to note
that downloadPhoto(named:) runs
on whatever actor you were on when you called it.
-->

要确保闭包在主 actor 上运行，请在捕获列表之前和 `in` 之前、闭包开头写入 `@MainActor`。

```swift
let photo = await downloadPhoto(named: "Trees at Sunrise")
Task { @MainActor in
    show(photo)
}
```

上面的代码与前面代码清单中的 `downloadAndShowPhoto(named:)` 类似，但此示例中的代码不等待 UI 更新。你还可以在结构、类或枚举上写入 `@MainActor`，以确保其所有方法和对其属性的所有访问都在主 actor 上运行：

```swift
@MainActor
struct PhotoGallery {
    var photoNames: [String]
    func drawUI() { /* ... 其他 UI 代码 ... */ }
}
```

上面代码中的 `PhotoGallery` 结构在屏幕上绘制照片，使用其 `photoNames` 属性中的名称来确定要显示哪些照片。因为 `photoNames` 影响 UI，更改它的代码需要在主 actor 上运行以序列化该访问。

在基于框架构建时，该框架的协议和基类通常已经标记了 `@MainActor`，所以在这种情况下，你通常不需要在自己的类型上写入 `@MainActor`。这里有一个简化的例子：

```swift
@MainActor
protocol View { /* ... */ }

// 隐式地标记为 @MainActor
struct PhotoGalleryView: View { /* ... */ }
```

在上面的代码中，像 SwiftUI 这样的框架定义了 `View` 协议。通过在协议声明上写入 `@MainActor`，像 `PhotoGalleryView` 这样符合该协议的类型也会隐式地标记为 `@MainActor`。如果 `View` 是基类而 `PhotoGalleryView` 是子类，你会看到相同的行为——子类会隐式地标记为 `@MainActor`。

在上面的例子中，`PhotoGallery` 在主 actor 上保护整个结构。为了更精细的控制，你可以仅在需要在主线程上访问或运行的属性或方法上写入 `@MainActor`：

```swift
struct PhotoGallery {
    @MainActor var photoNames: [String]
    var hasCachedPhotos = false

    @MainActor func drawUI() { /* ... UI 代码 ... */ }
    func cachePhotos() { /* ... 网络代码 ... */ }
}
```

在上面版本的 `PhotoGallery` 中，`drawUI()` 方法在屏幕上绘制图库的图片，所以它需要隔离到主 actor。`photoNames` 属性不直接创建 UI，但它确实存储了 `drawUI()` 函数用于绘制 UI 的状态，因此该属性也需要仅在主 actor 上访问。相反，对 `hasCachedPhotos` 属性的更改不与 UI 交互，`cachePhotos()` 方法不访问任何需要在主 actor 上运行的状态。所以这些没有标记 `@MainActor`。

与前面的例子一样，如果你使用框架来构建 UI，该框架的属性包装器可能已经将你的 UI 状态属性标记为 `@MainActor`。在定义属性包装器时，如果其 `wrappedValue` 属性标记为 `@MainActor`，那么你应用该属性包装器的任何属性也会隐式地标记为 `@MainActor`。

## Actors

Swift 为你提供了主 actor——你也可以定义自己的 actor。Actor 让你可以在并发代码之间安全地共享信息。

就和类一样，actor 也是引用类型，所以在  <doc:ClassesAndStructures#类是引用类型> 一文中有关引用类型和值类型的对比，同时适用于类和 actor。与类不同的是，actor 在同一时刻只允许一项任务访问其可变状态，这样多个任务同时与 actor 交互时才不会产生安全性问题。举个例子，下面是一个用于记录温度的 actor：

```swift
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

<!--
  - test: `actors, actors-implicitly-sendable`

  ```swifttest
  -> actor TemperatureLogger {
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
-->

你可通过 `actor` 关键字和紧随其后的括弧来定义一个 actor。`TemperatureLogger` actor 具有可供外部代码访问的属性，也有 `max` 这个只有 actor 内部代码才能修改的属性。

你可通过使用与结构体和类相同的构造体语法来创建一个 `actor` 实例。在你访问一个 `actor` 的属性或方法时，需要使用 `await` 来表明这是一个潜在的挂起点。比如：


```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
// Prints "25"
```

在这个例子中，对 `logger.max` 的访问是一个可能的挂起点。这是因为其 actor 同一时刻只允许一项任务访问其可变状态。如果另一项任务正与 logger 进行交互，这段代码就需要先挂起，直到轮到他来访问这个属性。

相比之下，actor 内部的代码不需要使用 `await` 来访问 actor 的属性。比如，这是一个用于更新 `TemperatureLogger` 所记录温度的方法：

```swift
extension TemperatureLogger {
    func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}
```

`update(with:)` 这个方法已经是在 actor 上运行的了，所以它在访问 `max` 这样的属性时，不需要使用 `await` 来进行标注。这个方法也揭示了 actor 同一时刻仅允许一项任务与其可变状态交互的其中一项原因：有些对于 actor 状态的更新会暂时打破不变式。`TemperatureLogger` 这个 actor 记录了一系列温度数据以及一项最高温度，并且它应当会在记录一项新的测量数据时，更新最高温度纪录。在一次更新操作插入新的测量数据之后、更新最高温度纪录之前的那一刻，我们的温度记录器 actor 暂时处于一个非法的状态中。禁止多个任务同时与某个实例交互能够在下列事件序列中，防止问题的出现：

1. 你的代码调用 `update(with:)` 方法，该方法先更新了 `measurements` 数组。
2. 在你的代码能够更新 `max` 之前，其他地方的代码读取了最大温度值和温度数据列表。
3. 然后，你的代码才更新了 `max` 数据，完成了整个更新流程。 

在这种情况下，其它地方的代码会读取到错误的信息，因为他们对 actor 的访问被插入在了 `update(with:)` 执行过程的中间，从而读取到了不合法的数据。使用 Swift actor 能让你避免这种情况，因为它同一时刻只允许一项对其状态的操作，且代码执行只能在有 `await` 标注的挂起点处被打断；又因为 `update(with:)` 并不包含任何挂起点，其执行过程中没有任何其它代码可以访问数据。

如果 actor 之外的代码尝试直接访问这些属性，编译器会报错。比如：

```swift
print(logger.max)  // Error
```

不加 `await` 访问 `logger.max` 会失败，因为一个 actor 的属性是这个 actor 的本地受隔离状态的一部分。想要访问该属性的代码必须在此 actor 上执行，这是一个异步操作，所以必须用 `await` 标注。Swift 保证了只有在 actor 上运行的代码才能访问这个 actor 的本地状态。这种保证称为 *actor 隔离*。

Swift 并发模型的以下几个特点共同降低了使用者对共享可变属性的理解成本：

- 挂起点之间的代码总是按顺序执行，且不可能被任何其它并发代码打断。

- 与一个 actor 本地状态交互的代码只会运行在这个 actor 之上。

- 一个 actor 一次只运行一段代码。

基于这些保证，处于一个 actor 之内、且不包含 `await` 的方法可以安全地对 actor 状态进行更新，而不用担心程序中的其它部分意外读取到不合法状态。

例如，下面这段代码会将测量到的温度从华氏度转换到摄氏度：

```swift
extension TemperatureLogger {
    func convertFahrenheitToCelsius() {
        for i in measurements.indices {
            measurements[i] = (measurements[i] - 32) * 5 / 9
        }
    }
}
```

上面这段代码会逐个转换数组内的测量数据。在 map 操作的执行过程中，有些温度还是华氏度，有些则已经转换为了摄氏度。但是，因为其中没有任何代码包含 `await`，这里不会出现潜在的挂起点。这个方法所修改的状态从属于 actor，actor 为这个状态提供了保护，使其免受不在 actor 上运行的代码的读取或修改。这意味着其它代码不可能有办法读取到单位转换过程中，只被转换了一半的测量数据。

除了将代码编写在一个 actor 中，并在其中舍弃掉所有的挂起点之外，还有更进一步的方式来避免出现临时性的不合法状态：将这些代码移动到一个同步方法中。上方的 `convertFahrenheitToCelsius()` 方法就是一个同步方法，保证了它*永远*不可能包含挂起点。这个方法封装了会暂时造成不合法数据状态的代码，从而使得阅读代码的人更容易意识到：在这个方法完成自己的任务、并将合法的数据状态被恢复之前，没有其它代码可以运行。在未来，如果你试图向这个方法中添加并发代码，或是一个可能的挂起点，编译器会及时报错，以防引入新 bug。

<!--
  OUTLINE

  Add this post-WWDC when we have a more solid story to tell around Sendable

   .. _Concurrency_ActorIsolation:

   Actor Isolation
   ~~~~~~~~~~~~~~~

   TODO outline impact from SE-0313 Control Over Actor Isolation
   about the 'isolated' and 'nonisolated' keywords

   - actors protect their mutable state using :newTerm:`actor isolation`
   to prevent data races
   (one actor reading data that's in an inconsistent state
   while another actor is updating/writing to that data)

   - within an actor's implementation,
   you can read and write to properties of ``self`` synchronously,
   likewise for calling methods of ``self`` or ``super``

   - method calls from outside the actor are always async,
   as is reading the value of an actor's property

   - you can't write to a property directly from outside the actor

   TODO: Either define "data race" or use a different term;
   the chapter on exclusive ownership talks about "conflicting access",
   which is related, but different.
   Konrad defines "data race" as concurrent access to shared state,
   noting that our current design doesn't prevent all race conditions
   because suspension points allow for interleaving.

   - The same actor method can be called multiple times, overlapping itself.
   This is sometimes referred to as *reentrant code*.
   The behavior is defined and safe... but might have unexpected results.
   However, the actor model doesn't require or guarantee
   that these overlapping calls behave correctly (that they're *idempotent*).
   Encapsulate state changes in a synchronous function
   or write them so they don't contain an ``await`` in the middle.

   - If a closure is ``@Sendable`` or ``@escaping``
   then it behaves like code outside of the actor
   because it could execute concurrently with other code that's part of the actor


   exercise the log actor, using its client API to mutate state

   ::

       let logger = TemperatureSensor(lines: [
           "Outdoor air temperature",
           "25 C",
           "24 C",
       ])
       print(await logger.getMax())

       await logger.update(with: "27 C")
       print(await logger.getMax())
-->


## 全局 Actor

主 actor 是 [`MainActor`][] 类型的全局单例实例。Actor 通常可以有多个实例，每个实例提供独立的隔离。这就是为什么你将 actor 的所有隔离数据声明为该 actor 的实例属性。然而，因为 `MainActor` 是单例——该类型只有一个实例——仅类型本身就足以标识该 actor，允许你仅使用属性来标记主 actor 隔离。这种方法让你更灵活地以最适合你的方式组织代码。

[`MainActor`]: https://developer.apple.com/documentation/swift/mainactor

你可以使用 `@globalActor` 属性定义自己的单例全局 actor，如 <doc:Attributes#globalActor> 中所述。


<!--
  OUTLINE
  .. _Concurrency_Nonisolated:

   .. _Concurrency_ActorIsolation:

   Actor Isolation

   TODO outline impact from SE-0313 Control Over Actor Isolation
   about the 'isolated' and 'nonisolated' keywords

   - when you access an actor property from outside the actor,
   you get a getter function that returns ... a future?  Some sendable thing.
   You can't say ``instance.property++`` because you can't get and set
   from outside the actor.

   - Swift infers what properties are accessible from outside
   based on what you put in the actor definition.
   Actor-isolated properties (ones that default to being on the actor)
   aren't available outside the actor.

   - you can't write to a property directly from outside the actor

   - The same actor method can be called multiple times, overlapping itself.
   This is sometimes referred to as *reentrant code*.
   The behavior is defined and safe... but might have unexpected results.
   Consider a withdrawal function that
   checks you have at least the requested money in your account,
   performs a slow async operation,
   and then debits your account at the end.
   When the second call starts,
   it checks your account balance
   and the first call has not yet removed funds.
   It might allow you to overdraft if the first plus second call
   spend more than you have.

   .. _Concurrency_PerformanceConsiderations:

   Performance Considerations
   ~~~~~~~~~~~~~~~~~~~~~~~~~~

   - Switching to an actor might have costs;
   don't use them to protect a simple int that you're incrementing.

   - The more work you can do inside an actor,
   without needing to switch back and forth,
   the better its performance.

  .. _Concurrency_Sendability:

-->

## 可发送类型

任务和 actor 能让你将一个程序分成多个小段并安全地并行运行。一个任务或是一个 actor 的实例内部所包含的可变状态（例如变量或属性），被称为*并发域*。有些数据无法在不同的并发域之间共享，因为这些数据包含可变状态，但其又无法对重叠访问提供保护。

对于可以被从一个并发域共享到另一个并发域的类型，被称作*可发送类型*。例如，它可以在调用一个 actor 时被作为参数传递，或是作为一项任务的返回值返回。本章前述的几个例子没有讨论可发送性，因为这些例子使用的都是简单的值类型，而这些类型永远是可以被安全地在并发域之前传递的。相比之下，有些类型无法被安全地在并发域之间传递。比如，一个包含了可变属性、但又没有添加串行访问保护的类，如果在不同任务之间传递，可能会产生无法预测或是错误的结果。

你可以通过使一个类型遵循 `Sendable` 协议来将其标注为可发送的。这个协议并不包含任何代码要求，但是其包含了由 Swift 强制实施的语义要求。总的来说，有三种方式能让一个类变得可发送：

- 这个类型是一个值类型，并且它的可变状态仅由其它的可发送数据构成 —— 比如，一个只包含可发送属性的结构体，或是一个只包含可发送关联值的枚举。
- 这个类型不包含任何可变状态，并且它的不可变状态只由其它的可发送数据构成 —— 比如，一个仅包含只读属性的结构体或类。
- 这个类型包含能够保证其可变属性访问安全性的代码，比如一个被标注了 `@MainActor` 的类，或是一个通过队列 / 线程来对其属性增加了串行访问保护的类。

<!--
  There's no example of the third case,
  where you serialize access to the class's members,
  because the stdlib doesn't include the locking primitives you'd need.
  Implementing it in terms of NSLock or some Darwin API
  isn't a good fit for TSPL.
  Implementing it in terms of isKnownUniquelyReferenced(_:)
  and copy-on-write is also probably too involved for TSPL.
-->

若想了解所有的语义要求，请参见 [`Sendable`](https://developer.apple.com/documentation/swift/sendable) 协议指南。

有些类型总是可发送的，比如只包含可发送属性的结构体，或是只包含可发送关联值的枚举。比如：

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

<!--
  - test: `actors`

  ```swifttest
  -> struct TemperatureReading: Sendable {
         var measurement: Int
     }

  -> extension TemperatureLogger {
         func addReading(from reading: TemperatureReading) {
             measurements.append(reading.measurement)
         }
     }

  -> let logger = TemperatureLogger(label: "Tea kettle", measurement: 85)
  -> let reading = TemperatureReading(measurement: 45)
  -> await logger.addReading(from: reading)
  ```
-->

由于 `TemperatureReading` 是个结构体，并且只包含可发送属性，又因为这个结构体没有被标注为 `public` 或 `@usableFromInline`，它是隐式可发送的。下面这个版本的结构体隐式地遵从了 `Sendable` 协议：

```swift
struct TemperatureReading {
    var measurement: Int
}
```

<!--
  - test: `actors-implicitly-sendable`

  ```swifttest
  -> struct TemperatureReading {
         var measurement: Int
     }
  ```
-->

要显式地标注一个类型为不可发送，请编写一个不可用的 `Sendable` 遵循：

```swift
struct FileDescriptor {
    let rawValue: Int
}

@available(*, unavailable)
extension FileDescriptor: Sendable {}
```

<!--
The example above is based on a Swift System API.
https://github.com/apple/swift-system/blob/main/Sources/System/FileDescriptor.swift

See also this PR that adds Sendable conformance to FileDescriptor:
https://github.com/apple/swift-system/pull/112
-->

你还可以使用不可用的遵循来抑制对协议的隐式遵循，如 <doc:Protocols#Implicit-Conformance-to-a-Protocol> 中所述。

<!--
  LEFTOVER OUTLINE BITS

  - like classes, actors can inherit from other actors

  - actors can also inherit from ``NSObject``,
  which lets you mark them ``@objc`` and do interop stuff with them

  - every actor implicitly conforms to the ``Actor`` protocol,
  which has no requirements

  - you can use the ``Actor`` protocol to write code that's generic across actors

  - In the future, when we get distributed actors,
    the TemperatureSensor example
    might be a good example to expand when explaining them.


  ::

      while let result = try await group.next() { }
      for try await result in group { }

  how much should you have to understand threads to understand this?
  Ideally you don't have to know anything about them.

  How do you meld async-await-Task-Actor with an event driven model?
  Can you feed your user events through an async sequence or Combine
  and then use for-await-in to spin an event loop?
  I think so --- but how do you get the events *into* the async sequence?

  Probably don't cover unsafe continuations (SE-0300) in TSPL,
  but maybe link to them?
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
