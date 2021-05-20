Concurrency
===========

Swift has built-in support for writing asynchronous and parallel code
in a structured way.
:newTerm:`Asynchronous code` can be suspended and resumed later,
although only one piece of the program is executing at a time.
Suspending and resuming code in your program
lets it continue to make progress
on short-term operations like updating its UI
while it continues to work on long-running operations
like fetching data over the network or parsing files.
:newTerm:`Parallel code` means multiple pieces of code run at a time ---
for example, a computer with a four-core processor
can run four pieces of code simultaneously,
with each core carrying out one of the four tasks.
A program that uses parallel and asynchronous code
carries out multiple operations at a time,
it suspends operations that are waiting for an external system,
and does so in a memory-safe way.

The additional scheduling flexibility from parallel or asynchronous code
also comes with a cost of increased complexity.
The language features that Swift gives you
let you express your intent in a way that Swift can verify when compiling ---
for example, you can use actors to safely share mutable state.
However, adding concurrency to slow or buggy code
isn't a guarantee that it will become fast or correct;
it might even make it harder to debug.
Swift's language-level support for safe concurrency, however,

.. XXX above -- if you don't actually *need* concurrency,
   just write simple synchronous code

The rest of this chapter uses the term *concurrency*
to refer to this common combination of asynchronous and parallel code.

.. note::

   If you've written parallel or asynchronous code before,
   you might be used to working with threads.
   The concurrency model in Swift is built on top of threads,
   but you don't interact with them directly.
   An asynchronous function in Swift
   can give up the thread it was running on,
   which lets another asynchronous function run on that thread
   while the first function is blocked.

.. XXX From Chuck:
   Should we have a more explicit comparison between Swift concurrency and threads?
   Things like "if you used threads to do X, do Y in Swift instead"?


.. _Concurrency_AsyncFunc:

Defining and Calling Asynchronous Functions
-------------------------------------------

.. XXX Since free functions seem to be less common in app code,
   maybe we should call these "async methods" throughout the guide
   and just mention that you can also use async on free functions?

An :newTerm:`asynchronous function` or :newTerm:`asynchronous method`
is a special kind of function or method
that can be suspended while it's partway through execution.
This is in contrast to ordinary, synchronous functions and methods,
which either run to completion, throw an error, or never return.
An asynchronous function or method still does one of those three things,
but it can also pause in the middle when it's waiting for something.
Inside the body of an asynchronous function or method,
you mark each of these places where execution can be suspended.

.. XXX Editorial: Stet passive "be suspended" above.
   Repeating "pause" from the previous sentence is unhelpful.
   Using "can suspend" is incorrect
   because the function doesn't perform the suspension.
   The entity that does carry out the suspension isn't relevant
   to the developer in the context of this discussion.
   The actor/agent is somewhere between Swift the language,
   the executor (a concept we're not explaining until next year
   when custom executors become a thing)
   and possibly the operating system.

To indicate that a function or method is asynchronous,
you write the ``async`` keyword in its declaration after its parameters,
similar to how you use ``throws`` to mark a throwing function.
If the function or method returns a value,
you write ``async`` before the return arrow (``->``).
For example,
here's how you might fetch the names of a collection of photos from a server:

.. testcode:: async-function-shape

    -> func listPhotos(inGallery name: String) async -> [String] {
           let result = // ... some asynchronous networking code ...
    >>     ["IMG001", "IMG99", "IMG0404"]
           return result
       }

For a function or method that's both asynchronous and throwing,
you write ``async`` before ``throws``.

.. assertion:: async-comes-before-throws

    >> func right() async throws -> Int { return 12 }
    >> func wrong() throws async -> Int { return 12 }
    !$ error: 'async' must precede 'throws'
    !! func wrong() throws async -> Int { return 12 }
    !! ^~~~~~
    !! async

When calling an asynchronous method,
execution suspends until that method returns.
You write ``await`` in front of the call
to mark the possible suspension point.
This is like how you write ``try`` when calling a throwing function,
to mark the possible change to the program's flow if there's an error.
Inside an asynchronous method,
the flow of execution is suspended *only* when you call another asynchronous method ---
suspension is never implicit or preemptive ---
which means every possible suspension point is marked with ``await``.

For example,
the code below fetches the names of all the pictures in a gallery
and then show the first picture:

.. testcode:: defining-async-function

    >> struct Data {}  // Instead of actually importing Foundation
    >> func downloadPhoto(named name: String) async -> Data { return Data() }
    >> func show(_ image: Data, _ caption: Caption) { }
    -> let photoNames = await listPhotos(inGallery: "Summer Vacation")
    -> let sortedNames = sort(photoNames)
    -> let name = sortedNames[1]
    -> let photo = await downloadPhoto(named: name)
    -> show(photo)

Because the ``listPhotos(inGallery:)`` and ``downloadPhoto(named:)`` methods
both need to make network requests,
they could take a relatively long time to complete.
Making them both asynchronous by writing ``async`` before the return arrow
lets the rest of the app's code keep running
while this code waits for the picture to be ready.

To understand the concurrent nature of the example above,
here's one possible order of execution:

#. The code starts running from the first line
   and runs up to the first ``await``.
   It calls the ``listPhotos(inGallery:)`` function
   and then suspends execution while it waits for that function to return.

#. While this code's execution is suspended,
   some other concurrent code in the same program runs.
   For example, maybe a long-running background task
   continues updating a list of new photo galleries.
   That code also runs until the next suspension point, marked by ``await``,
   or until it completes.

#. After ``listPhotos(inGallery:)`` returns,
   this code continues execution starting at that point.
   It assigns the value that was returned to ``photoNames``.

#. The lines that define ``sortedNames`` and ``name``
   are regular, synchronous code.
   Because nothing is marked ``await`` on these lines,
   there aren't any possible suspension points.

#. The next ``await`` marks the call to the ``downloadPhoto(named:)`` function.
   This code pauses execution again until that function returns.
   Once again, other concurrent code has an opportunity to run.

#. After ``downloadPhoto(named:)`` returns,
   its return value is assigned to ``photo``
   and then passed as an argument when calling ``show(_:)``.

The possible suspension points in your code marked with ``await``
indicate that the current piece of code might pause execution
while waiting for the asynchronous function or method to return.
This is also called :newTerm:`yielding the thread`
because, behind the scenes,
Swift suspends the execution of your code on the current thread
and runs some other code on that thread instead.
Because code with ``await`` needs to be able to suspend execution,
only certain places in your program can call asynchronous functions or methods:

- Code in an asynchronous function or method.

- Code in the static ``main()`` method of
  a structure, class, or enumeration that's marked with ``@main``.

- Code in a detached child task,
  as shown in :ref:`Concurrency_TaskHandle` below.

.. SE-0296 specificalls out that top-level code is *not* an async context,
   contrary to what you might expect.
   If that get changed, put this bullet back into the list above:
   Code at the top level that makes up an implicit main function.

In contrast to using ``async`` and ``await``,
consider how you would write the example above
using functions that take a closure as completion handler
to run after each operation completes:

.. testcode:: defining-async-function

    XXX REWRITE XXX

    >> func listPhotos(inGallery name: String, completionHandler: ([String]) -> Void ) {
    >>   completionHandler(["IMG001", "IMG99", "IMG0404"])
    >> }
    >> func downloadPhoto(named name: String, completionHandler: (Data) -> Void) {
    >>     completionHandler(Data())
    >> }
    -> listPhotos(inGallery: "Summer Vacation") { photoNames in
           let sortedNames = sort(photoNames)
           let name = sortedNames[1]
           downloadPhoto(named: first) { photo in
               show(photo, caption)
           }
       }

Even in this simple case, the closures are harder to read
because the code has to be written as a series of completion handlers.
In contrast, the version above that uses ``await``
reads as a linear, sequential series of steps.

.. XXX add detail above about how the *compiler* can reason about
   the async/await version better too
   and give you better guarantees and clearer errors

.. XXX Revise the discussion in the Closures chapter
   where we currently talk about completion handlers.

.. XXX make Task.sleep() below a live link

.. note::

   The ``Task.sleep()`` method is useful when writing simple code
   to learn how concurrency works.
   This method does nothing,
   but waits at least the given number of seconds before it returns.
   Here's a version of the ``listPhotos(inGallery:)`` function
   that uses ``sleep()`` to simulate waiting for a network operation:

   .. testcode:: sleep-in-toy-code

       >> struct Data {}  // Instead of actually importing Foundation
       >> @available(macOS 9999, *)  // XXX stdlib has placeholder availability
       -> func listPhotos(inGallery name: String) async -> [String] {
              await Task.sleep(2)
              return ["IMG001", "IMG99", "IMG0404"]
       }

.. x*  Bogus * paired with the one in the listing, to fix VIM syntax highlighting.

.. XXX either add an example or maybe a short section
   about throwing and async together
   to give a place where I can note the order of the keywords
   in the declaration and in the calls

.. _Concurrency_AsyncSequence:

Asynchronous Sequences
----------------------

◊ Outline ◊

- the async function in the previous section
  returned its whole result asynchronously

- another way a function can be async is to return a collection/sequence
  one item at a time, as that element becomes available

- to do this, return ``AsyncSequence``
  which mostly acts like a vanilla ``Sequence`` but async-ified

- to make an async sequence,
  define a type that includes a nested ``AsyncIterator`` type

- in the iterator, define a ``next()`` method
  that returns one element and updates the iterator's state

- ◊TR: It doesn't look like there's an easy way to make an async sequence.
  You have to make your own container/iterator type

- TODO: check for overlap with ``AsyncSequence`` reference

.. testcode:: defining-async-function

    -> struct Photos: AsyncSequence {
           let names: [String]
           func makeAsyncIterator() -> AsyncIterator {
               return AsyncIterator(names)
           }
           typealias Element = Data
           struct AsyncIterator: AsyncIteratorProtocol {
    >>         // Not using the syntactic sugar for [String]
    >>         // because [String].Index doesn't work.
               private let names: Array<String>
               private var index: Array<String>.Index
               init(_ names: [String]) {
                   self.names = names
                   self.index = 0
               }
               mutating func next() async -> Data? {
                   guard index < names.endIndex else { return nil }
                   index += 1
                   return await downloadPhoto(named: names[index])
               }
           }
       }

- use ``for``-``await`` to handle the elements one at a time,
  instead of waiting for the whole thing:

.. testcode:: defining-async-function
    -> let names = await listPhotos(inGallery: "Winter Vacation")
    -> for await photo in Photos(names: names) {
           show(photo)
       }


.. _Concurrency_AsyncLet:

Calling Asynchronous Functions Without Waiting
----------------------------------------------

◊ Outline ◊

- calls an async function, but then continues on rather than waiting
- you can us async-let multiple times, and that work can run simultaneously
- when you need to use the return value, then you ``await``
- show a couple async-let use cases... a depends on b depends on c, but also
  a depends on b & c & d together
- behind the scenes, async-let implicitly creates a child Task

Calling an asynchronous function with ``await``
runs only one piece of code at a time.
While the asynchronous code is running,
the caller waits for that code to finish
before moving on to run the next line of code.
One way to call an asynchronous function without waiting
is to use ``async``-``let`` as shown below:

.. testcode:: defining-async-function

    -> func show(_ images: [Data]) {
           // ...
       }
    -> let photoNames = await listPhotos(inGallery: "Summer Vacation")
    ---
    -> async let firstPhoto = downloadPhoto(named: photoNames[0])
    -> async let secondPhoto = downloadPhoto(named: photoNames[1])
    -> async let thirdPhoto = downloadPhoto(named: photoNames[2])
    ---
    -> let photos = await [firstPhoto, secondPhoto, thirdPhoto]
    -> show(photos)

In the example above,
writing ``await`` before the call to ``listPhotos(inGallery:)``
makes the function suspend there, as before.
However, the next three lines can run simultaneously ---
loading the first, second, and third photo by calling ``downloadPhoto(named:)``
like this with ``async``-``let`` marks this as nonblocking asynchronous code.
All three function calls could happen simultaneously
if there are enough system resources available.
It's not until the next ``await``,
when the results of those asynchronous interactions with the server are needed
that this function will suspend.

.. _Concurrency_Tasks:

Tasks and Task Groups
---------------------

A :newTerm:`task` is a unit of work
that can be run asynchronously as part of your program.

◊ Outline ◊

- All async code runs as part of some task

- A task itself doesn't have any concurrency; it does one thing at a time

- async-let lets you implicitly create tasks that have dependencies;
  if you need to create tasks dynamically or with extra options
  you use the ``Task`` APIs directly

- other reasons to use the API include setting:

    + cancellation (``Task.isCancelled``)
    + timeouts
    + priority (``Task.currentPriority``)

- task group models a hierarchy or collection of tasks

- the only relationship between tasks is parent/child;
  "siblings" don't have any connection

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

::

    let numbers = [10, 20, 30]

TODO: Custom executor, default executor

::

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

::

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Creating a group with ``withTaskGroup`` and ``withThrowingTaskGroup``

- awaiting ``withGroup`` means waiting for all child tasks to complete

- a child task can't outlive its parent,
  like how ``async``-``let`` can't outlive the (implicit) parent
  which is the function scope

- Adding a child with ``Task.Group.spawn``

- awaiting ``add`` means waiting for that child task to be added,
  not waiting for that child task to finish

- ?? maybe cover ``Task.Group.next``
  probably nicer to use the ``for await result in someGroup`` syntax

◊ quote from the SE proposal --- I want to include this fact here too

> There's no way for reference to the child task to
> escape the scope in which the child task is created.
> This ensures that the structure of structured concurrency is maintained.
> It makes it easier to reason about
> the concurrent tasks that are executing within a given scope,
> and also enables various optimizations.


.. _Concurrency_TaskPriority:

Setting Task Priority
~~~~~~~~~~~~~~~~~~~~~

◊ Outline ◊

- priority values defined by ``Task.Priority`` enum

- instance property ``Task.priority``
  and type property ``Task.currentPriority``
  (the latter is easier to use in most cases)

- The exact result of setting a task's priority depends on the executor

- TR: What's the built-in stdlib executor do?

- Child tasks inherit the priority of their parents

- If a high-priority task is waiting for a low-priority one,
  the low-priority one gets scheduled at high priority
  (this is known as :newTerm:`priority escalation`)

- In addition, or instead of, setting a low priority,
  you can use ``Task.yield()`` to explicitly pass execution to the next scheduled task.
  This is a sort of cooperative multitasking for long-running work.


.. _Concurrency_TaskHandle:

Detached Tasks
~~~~~~~~~~~~~~

◊ Outline ◊

- ``detach`` makes a new task with no parent,
  which means that child task can run indefinitely

- you use a :newTerm:`task handle` to interact with it

- ``Task.Handle``

- To get the result of the detached task, ``await someTaskHandle.get()``


◊ When to make a method do its work in a detached task
versus making the method itself async?
(Pull from 2021-04-21 notes from Ben's talk.)


.. _Concurrency_TaskCancellation:

Task Cancellation
~~~~~~~~~~~~~~~~~

◊ Outline ◊

- The cancellation model is "cooperative" --- each task checks whether it was canceled

- conventionally, you call ``Task.checkCancellation()``
  which throws ``CancellationError`` if the task has been canceled

- You can check manually via ``Task.isCancelled``,
  which lets you do clean-up before throwing an error
  for example to release resources or to close network connections

- task handle

- ``Task.Handle.cancel()``

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

- Use ``Task.withCancellationHandler`` to specify a closure to run
  if the task is canceled
  along with a closure that defines the task's work
  (it doesn't throw like ``checkCancellation`` does)


.. _Concurrency_Actors:

Actors
------

◊ Outline ◊

- actors are reference types like classes

- unlike classes, it's safe to use the same actor
  from multiple execution contexts (tasks/threads)

- like classes, actors can inherit from other actors

- actors can also inherit from ``NSObject``,
  which lets you mark them ``@objc`` and do interop stuff with them

- every actor implicitly conforms to the ``Actor`` protocol,
  which has no requirements

- you can use the ``Actor`` protocol to write code that's generic across actors

◊ Narrative code example ◊

- You're reading temperature data from a remote sensor

- It prints out a human-readable label on startup,
  followed by measurement/units lines

- Some code elsewhere is already doing the over-the-network or over-USB bits

.. In the future, when we get distributed actors,
   this might be a good example to expand when explaining them.

◊ TODO: Incorporate @MainActor into the outline:

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

◊ define an actor and a helper function

::

    actor TemperatureSensor {
        let label: String
        let units: String
        var measurements: [Int]
        var max: Int

        init(lines: [String]) {
            assert(lines.count >= 2)

            self.label = lines[0]
            let (firstMeasurement, firstLabel) = parse(line: lines[1])
            self.units = firstLabel
            self.measurements = [firstMeasurement]
            self.max = firstMeasurement

            for line in lines[2...] {
                update(with: line)
            }
        }
    }

    private func parse(line: String) -> (measurement: Int, units: String) {
        let parts = line.split(separator: " ", maxSplits: 1)
        let measurement = Int(parts[0])!
        let units = String(parts[1])
        return (measurement: measurement, units: units)
    }

◊ is there a better example that doesn't need type conversions & force unwrap?
◊ give it some client-facing API

::

    extension TemperatureSensor {
        func update(with line: String) {
            let (measurement, units) = parse(line: line)
            assert(units == self.units)
            measurements.append(measurement)
            if measurement > max {
                max = measurement
            }
        }

        func getMax() -> Int { return max }

        func reset() {
            measurements = [measurements.last!]
            max = measurements.last!
        }
    }

◊ TR: Is there a better "getter" pattern than ``getMax()``?

In the example above,
the ``update(with:)``, ``getMax()``, and ``reset()`` functions
can access the properties of the actor.
However, if you try to access those properties from outside the actor,
like you would with an instance of a class,
you'll get a compile-time error.
For example:

::

    var logger = TemperatureSensor(lines: [
        "Outdoor air temperature",
        "25 C",
        "24 C",
    ])
    logger.measurements.add(100)  // Error

Accessing ``logger.measurements`` fails because
the properties of an actor are part of that actor's local state.
The language guarantee that only code inside an actor
can access the actor's local state is called *actor isolation*.

.. _Concurrency_ActorIsolation:

Actor Isolation
~~~~~~~~~~~~~~~

◊ Outline ◊

- actors protect their mutable state using :newTerm:`actor isolation`
  to prevent data races
  (one actor reading data that's in an inconsistent state
  while another actor is updating/writing to that data)

- within an actor's implementation,
  you can read and write to properties of ``self`` synchronously,
  likewise for calling methods of ``self`` or ``super``

- method calls from outside the actor are always async,
  as is reading the value of an actor's property

- the values you pass to a method call from outside of an actor
  have to be sendable (conform to the ``Sendable`` marker protocol)

  + structs and enums implicitly conform to ``Sendable``
    if they're non-public, non-frozen,
    and all of their properties are also ``Sendable``

  + all actors are implicitly sendable

  + everything else needs to be marked ``Sendable`` explicitly

  + the only valid superclass for a sendable class is ``NSObject``
    (allowed for Obj-C interop)

- you can't write to a property directly from outside the actor

◊ TODO: Either define "data race" or use a different term;
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


◊ exercise the log actor, using its client API to mutate state

::

    let logger = TemperatureSensor(lines: [
        "Outdoor air temperature",
        "25 C",
        "24 C",
    ])
    print(await logger.getMax())

    await logger.update(with: "27 C")
    print(await logger.getMax())


.. _Concurrency_Sendable:

Sending Data Between Actors
~~~~~~~~~~~~~~~~~~~~~~~~~~~

TODO: Fill this in from SE-0302

◊ Outline leftovers ◊
---------------------

you can wait for each child of a task

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
