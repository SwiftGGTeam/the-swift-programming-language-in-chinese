# Concurrency

Perform asynchronous operations.

Swift has built-in support for writing asynchronous and parallel code
in a structured way.
*Asynchronous code* can be suspended and resumed later,
although only one piece of the program executes at a time.
Suspending and resuming code in your program
lets it continue to make progress
on short-term operations like updating its UI
while continuing to work on long-running operations
like fetching data over the network or parsing files.
*Parallel code* means multiple pieces of code run simultaneously ---
for example, a computer with a four-core processor
can run four pieces of code at the same time,
with each core carrying out one of the tasks.
A program that uses parallel and asynchronous code
carries out multiple operations at a time;
it suspends operations that are waiting for an external system,
and makes it easier to write this code in a memory-safe way.

The additional scheduling flexibility from parallel or asynchronous code
also comes with a cost of increased complexity.
Swift lets you express your intent
in a way that enables some compile-time checking ---
for example, you can use actors to safely access mutable state.
However, adding concurrency to slow or buggy code
isn't a guarantee that it will become fast or correct.
In fact, adding concurrency might even make your code harder to debug.
However, using Swift's language-level support for concurrency
in code that needs to be concurrent
means Swift can help you catch problems at compile time.

The rest of this chapter uses the term *concurrency*
to refer to this common combination of asynchronous and parallel code.

> Note: If you've written concurrent code before,
> you might be used to working with threads.
> The concurrency model in Swift is built on top of threads,
> but you don't interact with them directly.
> An asynchronous function in Swift
> can give up the thread that it's running on,
> which lets another asynchronous function run on that thread
> while the first function is blocked.
> When an asynchronous function resumes,
> Swift doesn't make any guarantee about which thread
> that function will run on.

Although it's possible to write concurrent code
without using Swift's language support,
that code tends to be harder to read.
For example, the following code downloads a list of photo names,
downloads the first photo in that list,
and shows that photo to the user:

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

Even in this simple case,
because the code has to be written as a series of completion handlers,
you end up writing nested closures.
In this style,
more complex code with deep nesting can quickly become unwieldy.

## Defining and Calling Asynchronous Functions

An *asynchronous function* or *asynchronous method*
is a special kind of function or method
that can be suspended while it's partway through execution.
This is in contrast to ordinary, synchronous functions and methods,
which either run to completion, throw an error, or never return.
An asynchronous function or method still does one of those three things,
but it can also pause in the middle when it's waiting for something.
Inside the body of an asynchronous function or method,
you mark each of these places where execution can be suspended.

To indicate that a function or method is asynchronous,
you write the `async` keyword in its declaration after its parameters,
similar to how you use `throws` to mark a throwing function.
If the function or method returns a value,
you write `async` before the return arrow (`->`).
For example,
here's how you might fetch the names of photos in a gallery:

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

For a function or method that's both asynchronous and throwing,
you write `async` before `throws`.

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

When calling an asynchronous method,
execution suspends until that method returns.
You write `await` in front of the call
to mark the possible suspension point.
This is like writing `try` when calling a throwing function,
to mark the possible change to the program's flow if there's an error.
Inside an asynchronous method,
the flow of execution is suspended *only* when you call another asynchronous method ---
suspension is never implicit or preemptive ---
which means every possible suspension point is marked with `await`.

For example,
the code below fetches the names of all the pictures in a gallery
and then shows the first picture:

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

Because the `listPhotos(inGallery:)` and `downloadPhoto(named:)` functions
both need to make network requests,
they could take a relatively long time to complete.
Making them both asynchronous by writing `async` before the return arrow
lets the rest of the app's code keep running
while this code waits for the picture to be ready.

To understand the concurrent nature of the example above,
here's one possible order of execution:

1. The code starts running from the first line
   and runs up to the first `await`.
   It calls the `listPhotos(inGallery:)` function
   and suspends execution while it waits for that function to return.

2. While this code's execution is suspended,
   some other concurrent code in the same program runs.
   For example, maybe a long-running background task
   continues updating a list of new photo galleries.
   That code also runs until the next suspension point, marked by `await`,
   or until it completes.

3. After `listPhotos(inGallery:)` returns,
   this code continues execution starting at that point.
   It assigns the value that was returned to `photoNames`.

4. The lines that define `sortedNames` and `name`
   are regular, synchronous code.
   Because nothing is marked `await` on these lines,
   there aren't any possible suspension points.

5. The next `await` marks the call to the `downloadPhoto(named:)` function.
   This code pauses execution again until that function returns,
   giving other concurrent code an opportunity to run.

6. After `downloadPhoto(named:)` returns,
   its return value is assigned to `photo`
   and then passed as an argument when calling `show(_:)`.

The possible suspension points in your code marked with `await`
indicate that the current piece of code might pause execution
while waiting for the asynchronous function or method to return.
This is also called *yielding the thread*
because, behind the scenes,
Swift suspends the execution of your code on the current thread
and runs some other code on that thread instead.
Because code with `await` needs to be able to suspend execution,
only certain places in your program can call asynchronous functions or methods:

- Code in the body of an asynchronous function, method, or property.

- Code in the static `main()` method of
  a structure, class, or enumeration that's marked with `@main`.

- Code in an unstructured child task,
  as shown in <doc:Concurrency#Unstructured-Concurrency> below.

<!--
  SE-0296 specifically calls out that top-level code is *not* an async context,
  contrary to what you might expect.
  If that gets changed, add this bullet to the list above:

  - Code at the top level that forms an implicit main function.
-->

Code in between possible suspension points runs sequentially,
without the possibility of interruption from other concurrent code.
For example, the code below moves a picture from one gallery to another.

```swift
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
add(firstPhoto, toGallery: "Road Trip")
// At this point, firstPhoto is temporarily in both galleries.
remove(firstPhoto, fromGallery: "Summer Vacation")
```

There's no way for other code to run in between
the call to `add(_:toGallery:)` and `remove(_:fromGallery:)`.
During that time, the first photo appears in both galleries,
temporarily breaking one of the app's invariants.
To make it even clearer that this chunk of code
must not have `await` added to it in the future,
you can refactor that code into a synchronous function:

```swift
func move(_ photoName: String, from source: String, to destination: String) {
    add(photoName, toGallery: destination)
    remove(photoName, fromGallery: source)
}
// ...
let firstPhoto = await listPhotos(inGallery: "Summer Vacation")[0]
move(firstPhoto, from: "Summer Vacation", to: "Road Trip")
```

In the example above,
because the `move(_:from:to:)` function is synchronous,
you guarantee that it can never contain possible suspension points.
In the future,
if you try to add concurrent code to this function,
introducing a possible suspension point,
you'll get compile-time error instead of introducing a bug.

<!--
  TODO you can also explicitly insert a suspension point
  by calling ``Task.yield()``
  https://developer.apple.com/documentation/swift/task/3814840-yield
-->

<!--
  TODO add detail above about how the *compiler* can reason about
  the async/await version better too
  and give you better guarantees and clearer errors
-->

> Note: The [`Task.sleep(until:tolerance:clock:)`](https://developer.apple.com/documentation/swift/task/sleep(until:tolerance:clock:)) method
> is useful when writing simple code
> to learn how concurrency works.
> This method does nothing,
> but waits at least the given number of nanoseconds before it returns.
> Here's a version of the `listPhotos(inGallery:)` function
> that uses `sleep(until:tolerance:clock:)` to simulate waiting for a network operation:
>
> ```swift
> func listPhotos(inGallery name: String) async throws -> [String] {
>     try await Task.sleep(until: .now + .seconds(2), clock: .continuous)
>     return ["IMG001", "IMG99", "IMG0404"]
> }
> ```

<!--
  - test: `sleep-in-toy-code`

  ```swifttest
  >> struct Data {}  // Instead of actually importing Foundation
  -> func listPhotos(inGallery name: String) async throws -> [String] {
         try await Task.sleep(until: .now + .seconds(2), clock: .continuous)
         return ["IMG001", "IMG99", "IMG0404"]
  }
  ```
-->

<!--
  TODO either add an example or maybe a short section
  about throwing and async together
  to give a place where I can note the order of the keywords
  in the declaration and in the calls
-->

<!--
  TODO closures can be async too -- outline

  like how you can have an async function, a closure con be async
  if a closure contains 'await' that implicitly makes it async
  you can mark it explicitly with "async -> in"

  (discussion of @MainActor closures can probably go here too)
-->

## Asynchronous Sequences

The `listPhotos(inGallery:)` function in the previous section
asynchronously returns the whole array at once,
after all of the array's elements are ready.
Another approach
is to wait for one element of the collection at a time
using an *asynchronous sequence*.
Here's what iterating over an asynchronous sequence looks like:

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
  ---
  >> func f() async throws {
  -> let handle = FileHandle.standardInput
  -> for try await line in handle.bytes.lines {
         print(line)
     }
  >> }
  ```
-->

Instead of using an ordinary `for`-`in` loop,
the example above writes `for` with `await` after it.
Like when you call an asynchronous function or method,
writing `await` indicates a possible suspension point.
A `for`-`await`-`in` loop potentially suspends execution
at the beginning of each iteration,
when it's waiting for the next element to be available.

<!--
  FIXME TR: Where does the 'try' above come from?
-->

In the same way that you can use your own types in a `for`-`in` loop
by adding conformance to the [`Sequence`](https://developer.apple.com/documentation/swift/sequence) protocol,
you can use your own types in a `for`-`await`-`in` loop
by adding conformance to the
[`AsyncSequence`](https://developer.apple.com/documentation/swift/asyncsequence) protocol.

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

## Calling Asynchronous Functions in Parallel

<!--
  FIXME
  As pointed out on the Swift forums
  <https://forums.swift.org/t/swift-concurrency-feedback-wanted/49336/53>
  whether this work is actually carried out in parallel
  depends on what's happening at run time.
  However,
  the syntax introduced in this section contrasts to the previous section
  in that async-let makes it *possible* for that work to be parallel.
-->

Calling an asynchronous function with `await`
runs only one piece of code at a time.
While the asynchronous code is running,
the caller waits for that code to finish
before moving on to run the next line of code.
For example,
to fetch the first three photos from a gallery,
you could await three calls to the `downloadPhoto(named:)` function
as follows:

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
  ---
  -> let photos = [firstPhoto, secondPhoto, thirdPhoto]
  -> show(photos)
  >> }
  ```
-->

This approach has an important drawback:
Although the download is asynchronous
and lets other work happen while it progresses,
only one call to `downloadPhoto(named:)` runs at a time.
Each photo downloads completely before the next one starts downloading.
However, there's no need for these operations to wait ---
each photo can download independently, or even at the same time.

To call an asynchronous function
and let it run in parallel with code around it,
write `async` in front of `let` when you define a constant,
and then write `await` each time you use the constant.

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
  ---
  -> let photos = await [firstPhoto, secondPhoto, thirdPhoto]
  -> show(photos)
  >> }
  ```
-->

In this example,
all three calls to `downloadPhoto(named:)` start
without waiting for the previous one to complete.
If there are enough system resources available, they can run at the same time.
None of these function calls are marked with `await`
because the code doesn't suspend to wait for the function's result.
Instead, execution continues
until the line where `photos` is defined ---
at that point, the program needs the results from these asynchronous calls,
so you write `await` to pause execution
until all three photos finish downloading.

Here's how you can think about the differences between these two approaches:

- Call asynchronous functions with `await`
  when the code on the following lines depends on that function's result.
  This creates work that is carried out sequentially.
- Call asynchronous functions with `async`-`let`
  when you don't need the result until later in your code.
  This creates work that can be carried out in parallel.
- Both `await` and `async`-`let`
  allow other code to run while they're suspended.
- In both cases, you mark the possible suspension point with `await`
  to indicate that execution will pause, if needed,
  until an asynchronous function has returned.

You can also mix both of these approaches in the same code.

## Tasks and Task Groups

A *task* is a unit of work
that can be run asynchronously as part of your program.
All asynchronous code runs as part of some task.
The `async`-`let` syntax described in the previous section
creates a child task for you.
You can also create a task group
and add child tasks to that group,
which gives you more control over priority and cancellation,
and lets you create a dynamic number of tasks.

Tasks are arranged in a hierarchy.
Each task in a task group has the same parent task,
and each task can have child tasks.
Because of the explicit relationship between tasks and task groups,
this approach is called *structured concurrency*.
Although you take on some of the responsibility for correctness,
the explicit parent-child relationships between tasks
let Swift handle some behaviors like propagating cancellation for you,
and lets Swift detect some errors at compile time.

```swift
await withTaskGroup(of: Data.self) { taskGroup in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        taskGroup.addTask { await downloadPhoto(named: name) }
    }
}
```

<!--
  TODO walk through the example
-->

For more information about task groups,
see [`TaskGroup`](https://developer.apple.com/documentation/swift/taskgroup).

<!--
  OUTLINE

  - A task itself doesn't have any concurrency; it does one thing at a time

  - other reasons to use the API include setting:

  + cancellation (``Task.isCancelled``)
  + priority (``Task.currentPriority``)

  .. not for WWDC, but keep for future:
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

  - Creating a group with ``withTaskGroup`` and ``withThrowingTaskGroup``

  - awaiting ``withGroup`` means waiting for all child tasks to complete

  - a child task can't outlive its parent,
  like how ``async``-``let`` can't outlive the (implicit) parent
  which is the function scope

  - Adding a child with ``TaskGroup.addTask(priority:operation:)``

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

### Unstructured Concurrency

In addition to the structured approaches to concurrency
described in the previous sections,
Swift also supports unstructured concurrency.
Unlike tasks that are part of a task group,
an *unstructured task* doesn't have a parent task.
You have complete flexibility to manage unstructured tasks
in whatever way your program needs,
but you're also completely responsible for their correctness.
To create an unstructured task that runs on the current actor,
call the [`Task.init(priority:operation:)`](https://developer.apple.com/documentation/swift/task/3856790-init) initializer.
To create an unstructured task that's not part of the current actor,
known more specifically as a *detached task*,
call the [`Task.detached(priority:operation:)`](https://developer.apple.com/documentation/swift/task/3856786-detached) class method.
Both of these operations return a task that you can interact with ---
for example, to wait for its result or to cancel it.

```swift
let newPhoto = // ... some photo data ...
let handle = Task {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.value
```

For more information about managing detached tasks,
see [`Task`](https://developer.apple.com/documentation/swift/task).

<!--
  TODO Add some conceptual guidance about
  when to make a method do its work in a detached task
  versus making the method itself async?
  (Pull from my 2021-04-21 notes from Ben's talk rehearsal.)
-->

### Task Cancellation

Swift concurrency uses a cooperative cancellation model.
Each task checks whether it has been canceled
at the appropriate points in its execution,
and responds to cancellation in whatever way is appropriate.
Depending on the work you're doing,
that usually means one of the following:

- Throwing an error like `CancellationError`
- Returning `nil` or an empty collection
- Returning the partially completed work

To check for cancellation,
either call [`Task.checkCancellation()`](https://developer.apple.com/documentation/swift/task/3814826-checkcancellation),
which throws `CancellationError` if the task has been canceled,
or check the value of [`Task.isCancelled`](https://developer.apple.com/documentation/swift/task/3814832-iscancelled)
and handle the cancellation in your own code.
For example,
a task that's downloading photos from a gallery
might need to delete partial downloads and close network connections.

To propagate cancellation manually,
call [`Task.cancel()`](https://developer.apple.com/documentation/swift/task/3851218-cancel).

<!--
  OUTLINE

  - task

  - cancellation propagates (Konrad's example below)

  ::

      let handle = spawnDetached {
      await withTaskGroup(of: Bool.self) { group in
          var done = false
          while done {
          await group.spawn { Task.isCancelled } // is this child task cancelled?
          done = try await group.next() ?? false
          }
      print("done!") // <1>
      }

      handle.cancel()
      // done!           <1>

  - Use ``withCancellationHandler()`` to specify a closure to run
  if the task is canceled
  along with a closure that defines the task's work
  (it doesn't throw like ``checkCancellation`` does)
-->

## Actors

You can use tasks to break up your program into isolated, concurrent pieces.
Tasks are isolated from each other,
which is what makes it safe for them to run at the same time,
but sometimes you need to share some information between tasks.
Actors let you safely share information between concurrent code.

Like classes, actors are reference types,
so the comparison of value types and reference types
in <doc:ClassesAndStructures#Classes-Are-Reference-Types>
applies to actors as well as classes.
Unlike classes,
actors allow only one task to access their mutable state at a time,
which makes it safe for code in multiple tasks
to interact with the same instance of an actor.
For example, here's an actor that records temperatures:

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

You introduce an actor with the `actor` keyword,
followed by its definition in a pair of braces.
The `TemperatureLogger` actor has properties
that other code outside the actor can access,
and restricts the `max` property so only code inside the actor
can update the maximum value.

You create an instance of an actor
using the same initializer syntax as structures and classes.
When you access a property or method of an actor,
you use `await` to mark the potential suspension point.
For example:

```swift
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
// Prints "25"
```

In this example,
accessing `logger.max` is a possible suspension point.
Because the actor allows only one task at a time to access its mutable state,
if code from another task is already interacting with the logger,
this code suspends while it waits to access the property.

In contrast,
code that's part of the actor doesn't write `await`
when accessing the actor's properties.
For example,
here's a method that updates a `TemperatureLogger` with a new temperature:

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

The `update(with:)` method is already running on the actor,
so it doesn't mark its access to properties like `max` with `await`.
This method also shows one of the reasons
why actors allow only one task at a time to interact with their mutable state:
Some updates to an actor's state temporarily break invariants.
The `TemperatureLogger` actor keeps track of
a list of temperatures and a maximum temperature,
and it updates the maximum temperature when you record a new measurement.
In the middle of an update,
after appending the new measurement but before updating `max`,
the temperature logger is in a temporary inconsistent state.
Preventing multiple tasks from interacting with the same instance simultaneously
prevents problems like the following sequence of events:

1. Your code calls the `update(with:)` method.
   It updates the `measurements` array first.
2. Before your code can update `max`,
   code elsewhere reads the maximum value and the array of temperatures.
3. Your code finishes its update by changing `max`.

In this case,
the code running elsewhere would read incorrect information
because its access to the actor was interleaved
in the middle of the call to `update(with:)`
while the data was temporarily invalid.
You can prevent this problem when using Swift actors
because they only allow one operation on their state at a time,
and because that code can be interrupted
only in places where `await` marks a suspension point.
Because `update(with:)` doesn't contain any suspension points,
no other code can access the data in the middle of an update.

If you try to access those properties from outside the actor,
like you would with an instance of a class,
you'll get a compile-time error.
For example:

```swift
print(logger.max)  // Error
```

Accessing `logger.max` without writing `await` fails because
the properties of an actor are part of that actor's isolated local state.
Swift guarantees that
only code inside an actor can access the actor's local state.
This guarantee is known as *actor isolation*.

<!--
  OUTLINE -- design patterns for actors

  - do your mutation in a sync function
-->

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

## Sendable Types

Tasks and actors let you divide a program
into pieces that can safely run concurrently.
Inside of a task or an instance of an actor,
the part of a program that contains mutable state,
like variables and properties,
is called a *concurrency domain*.
Some kinds of data can't be shared between concurrency domains,
because that data contains mutable state,
but it doesn't protect against overlapping access.

A type that can be shared from one concurrency domain to another
is known as a *sendable* type.
For example, it can be passed as an argument when calling an actor method
or be returned as the result of a task.
The examples earlier in this chapter didn't discuss sendability
because those examples use simple value types
that are always safe to share
for the data being passed between concurrency domains.
In contrast,
some types aren't safe to pass across concurrency domains.
For example, a class that contains mutable properties
and doesn't serialize access to those properties
can produce unpredictable and incorrect results
when you pass instances of that class between different tasks.

You mark a type as being sendable
by declaring conformance to the `Sendable` protocol.
That protocol doesn't have any code requirements,
but it does have semantic requirements that Swift enforces.
In general, there are three ways for a type to be sendable:

- The type is a value type,
  and its mutable state is made up of other sendable data ---
  for example, a structure with stored properties that are sendable
  or an enumeration with associated values that are sendable.
- The type doesn't have any mutable state,
  and its immutable state is made up of other sendable data ---
  for example, a structure or class that has only read-only properties.
- The type has code that ensures the safety of its mutable state,
  like a class that's marked `@MainActor`
  or a class that serializes access to its properties
  on a particular thread or queue.

<!--
  There's no example of the third case,
  where you serialize access to the class's members,
  because the stdlib doesn't include the locking primitives you'd need.
  Implementing it in terms of NSLock or some Darwin API
  isn't a good fit for TSPL.
  Implementing it in terms of isKnownUniquelyReferenced(_:)
  and copy-on-write is also probably too involved for TSPL.
-->

For a detailed list of the semantic requirements,
see the [`Sendable`](https://developer.apple.com/documentation/swift/sendable) protocol reference.

Some types are always sendable,
like structures that have only sendable properties
and enumerations that have only sendable associated values.
For example:

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
  ---
  -> extension TemperatureLogger {
         func addReading(from reading: TemperatureReading) {
             measurements.append(reading.measurement)
         }
     }
  ---
  -> let logger = TemperatureLogger(label: "Tea kettle", measurement: 85)
  -> let reading = TemperatureReading(measurement: 45)
  -> await logger.addReading(from: reading)
  ```
-->

Because `TemperatureReading` is a structure that has only sendable properties,
and the structure isn't marked `public` or `@usableFromInline`,
it's implicitly sendable.
Here's a version of the structure
where conformance to the `Sendable` protocol is implied:

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

To explicitly mark a type as not being sendable,
overriding an implicit conformance to the `Sendable` protocol,
use an extension:

```swift
struct FileDescriptor {
    let rawValue: CInt
}

@available(*, unavailable)
extension FileDescriptor: Sendable { }
```

<!--
The example above is abbreviated from a Swift System API.
https://github.com/apple/swift-system/blob/main/Sources/System/FileDescriptor.swift
-->

The code above shows part of a wrapper around POSIX file descriptors.
Even though interface for file descriptors uses integers
to identify and interact with open files,
and integer values are sendable,
a file descriptor isn't safe to send across concurrency domains.

<!--
  - test: `suppressing-implied-sendable-conformance`

  -> struct NonsendableTemperatureReading {
  ->     var measurement: Int
  -> }
  ---
  -> @available(*, unavailable)
  -> extension NonsendableTemperatureReading: Sendable { }
  >> let nonsendable: Sendable = NonsendableTemperatureReading(measurement: 10)
  !$ warning: conformance of 'NonsendableTemperatureReading' to 'Sendable' is unavailable; this is an error in Swift 6
  !! let nonsendable: Sendable = NonsendableTemperatureReading(measurement: 10)
  !! ^
  !$ note: conformance of 'NonsendableTemperatureReading' to 'Sendable' has been explicitly marked unavailable here
  !! extension NonsendableTemperatureReading: Sendable { }
  !! ^
-->

In the code above,
the `NonsendableTemperatureReading` is a structure
that meets the criteria to be implicitly sendable.
However, the extension makes its conformance to `Sendable` unavailable,
preventing the type from being sendable.

<!--
  OUTLINE
  .. _Concurrency_MainActor:

  The Main Actor
  ~~~~~~~~~~~~~~


  - the main actor is kinda-sorta like the main thread

  - use it when you have shared mutable state,
  but that state isn't neatly wrapped up in a single type

  - you can put it on a function,
  which makes calls to the function always run on the main actor

  - you can put it on a type,
  which makes calls to all of the type's methods run on the main actor

  - some property wrappers like ``@EnvironmentObject`` from SwiftUI
  imply ``@MainActor`` on a type.
  Check for a ``wrappedValue`` that's marked ``@MainActor``.
  If you mark the property of a type with one of these implicit-main-actor properties,
  that has the same effect as marking the type with ``@MainActor``
  you can wait for each child of a task
-->

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

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
