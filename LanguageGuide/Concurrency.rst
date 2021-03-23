Concurrency
===========

◊ Intro ◊

- why you would want async code?  common use cases include:
    + network operations
    + long running model-layer calculations
    + parsing files
    + don't block the UI!
- the difference between async and concurrency (aka parallelism)
    + The execution of :newTerm:`asynchronous code` can be suspended and resumed later
    + :newTerm:`Concurrent code` means multiple pieces of code run at a time
    + they're commonly used together -- but one doesn't imply the other
    + eg, a 4 core CPU can run four synchronous jobs at the same time
      and a one core CPU can round-robin between several asynchronous jobs
      without any concurrency
    + in order for concurrency to happen,
      you have to be waiting for something to finish
      and be able to work on something else in the mean time
- Swift has built-in support for asynchronous code,
  and for running async code concurrently
- when not to use async code (async isn't magic)
    + because Swift has language level support for concurrency,
      the language can help you make & keep certain promises
    + for example, actors let you safely share mutable state
    + however, even with that help, writing and debugging async code
      is more complex than doing the same thing synchronously
      because there are more "moving parts" to consider
    + if the problem is that your code is slow,
      profile it first to understand *why* it's slow,
      just like you'd do for any other performance bug
    + buggy or inefficient async code isn't necessarily any better than
      buggy or inefficient synchronous code,
      it might even be slower or harder to debug
.. note::

   If you've written concurrent or asynchronous code before,
   you might be used to working with threads.
   The concurrency model in Swift
   is built on top of the operating system's support for threads,
   but you don't interact with threads directly.

.. _Concurrency_AsyncFunc:

Defining and Calling Asynchronous Functions
-------------------------------------------

◊ Outline ◊

- you mark a function as asynchronous by putting ``async`` next to the arrow,
  like how you write ``throwing`` for a function that can throw an error
- ``sleep()`` does nothing, but takes the specified amount of time do do so,
  which makes it a useful function for writing simple asynchronous code
  to understand the language features
- QUESTION: What would you need to import to use ``sleep`` on Linux?

::

    import Darwin
    func someAsynchronousFunction(_ time: UInt32) async -> UInt32 {
        sleep(time)
        return 10 + time
    }

◊ Outline ◊

- only async code can call async functions, including
    + top-level code
    + code marked @main
    + non-async code wrapped in ``runAsyncAndBlock``
- you mark a call to an async function with ``await``
- this is like ``try`` when calling a throwing function
- it reminds you when reading the code that the program can stop here
  and go do something else while waiting for the function to return
- likewise, you know that when there's no ``await`` there's no suspension point

::

    let someNumber = await someAsynchronousFunction(3)
    // waits 3 seconds, then returns 13

.. _Concurrency_AsyncLet:

Calling Asynchronous Functions Without Blocking
-----------------------------------------------

◊ Outline ◊

- calls an async function, but then continues on rather than waiting
- you can us async-let multiple times, and that work can run at the same time
- when you need to use the return value, then you ``await``
- common usage patterns
    + fan out, then collect all
    + sequence of parallel operations
- behind the scenes, async-let is implicitly creating a Task

::

    async let x = someAsynchronousFunction(2)
    async let y = someAsynchronousFunction(4)
    let total = await x + y
    print(total)

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
    + cancellation
    + timeouts
    + priority
- task group models a hierarchy or collection of tasks
    + QUESTION: What relationships can the tasks in group have to each other?
- task have deadlines, not timeouts -- eg "now + 20 ms" --
  a deadline is usually what you want anyhow when you think of a timeout

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

TR: Is "canceled" a different state from "completed"?
Or is cancellation just a kind of completion?

TODO: Add discussion of "the current task"
like ``Task.current()`` and ``Task.unsafeCurrent``?


.. _Concurrency_ChildTasks:

Adding Child Tasks to a Task Group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Creating a group with ``Task.withGroup``
- awaiting ``withGroup`` means waiting for all child tasks to complete
- Adding a child with ``Task.Group.add``
- awaiting ``add`` means waiting for that child task to be added
- TR: Or is the await waiting for the child task to *finish*?
- ?? maybe cover ``Task.Group.next``
- ``Task.runDetached`` is like ``withGroup``,
  except it doesn't wait for the task or its children to finish


.. _Concurrency_TaskPriority:

Setting Task Priority
~~~~~~~~~~~~~~~~~~~~~

◊ Outline ◊

- priority values defined by ``Task.Priority`` enum
- TR: Why do we have both ``Task.priority`` and ``Task.currentPriority``?
  What's the difference in the use case between them?
- The exact result of setting a task's priority depends on the executor
- TR: What's the built in stdlib executor do?
- Child tasks inherit the priority of their parents
- If a high-priority task is waiting for a low-priority one,
  the low-priority one gets scheduled at high priority
- In addition, or instead of, setting a low priority,
  you can use ``Task.yield()`` to explicitly pass execution to the next scheduled task.
  This is a sort of cooperative multitasking for long-running work.


.. _Concurrency_TaskHandle:

Getting the Result of a Task
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

◊ Outline ◊

- when you start a task, a :newTerm:`task handle`
  lets you keep a reference to it
- ``Task.Handle``
- To get the result of the task, ``await someTaskHandle.get()``



.. _Concurrency_TaskCancellation:

Task Cancellation
~~~~~~~~~~~~~~~~~

◊ Outline ◊

- The cancelation model is "cooperative" -- each task checks whether it was canceled
- conventionally, you call ``Task.checkCancellation()``
  which throws ``CancellationError`` if the task has been canceled
- You can check manually via ``Task.isCancelled``,
  which lets you do clean-up before throwing an error
- task handle
- ``Task.Handle.cancel()``
- cancellation propagates (FIXME: How?  Show an example.)
- Use ``Task.withCancellationHandler`` to specify a closure to run
  if the task is canceled
  along with a closure that defines the task's work
- TR: Does ``withCancellationHandler`` throw like ``checkCancellation`` does?


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

◊ define an actor and a helper function
◊ TODO: Rename this -- it's not really a "logger"... more of a history?

::

    actor TemperatureLogger {
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

◊ give it some client-facing API

::

    extension TemperatureLogger {
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
the ``update(with:)``, ``getMax()``, and ``reset()`` function
can access the properties of the actor.
However, if you try to access those properties from outside the actor,
like you would with an instance of a class,
you'll get an error.
For example:

::

    var logger = TemperatureLogger(lines: [
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
- you can't write to a property directly from outside the actor

◊ TODO: Either define "data race" or use a different term;
the chapter on exclusive ownership talks about "conflicting access",
which is related, but different.

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

    runAsyncAndBlock {
        let logger = TemperatureLogger(lines: [
            "Outdoor air temperature",
            "25 C",
            "24 C",
        ])
        print(await logger.getMax())

        await logger.update(with: "27 C")
        print(await logger.getMax())
    }


.. _Concurrency_Sendable:

Sharing Data Across Actors
~~~~~~~~~~~~~~~~~~~~~~~~~~

TODO: Fill this in from SE-0302

◊ OUTLINE ◊
-----------

.. OUTLINE

   == Async await ==

   comparison with callbacks/closures/completion handlers:

   downloadGalleryIndex("Family Vacation") { gallery in
       downloadImage(gallery.first) { image in
           show(image)
       }
   }

   TODO: Revise the discussion in the Closures chapter
   where we currently talk about completion handlers.

   let gallery = await downloadGalleryIndex("Family Vacation")
   let image = await downloadImage(gallery.first)
   show(image)

   The behavior is the same, but the 'await' version in much easier to read.
   ◊ The sync/async versions are essentially the same, just the { } are implied

   ◊ Which do I want to show first -- defining or calling an async function?
   ◊ Are there any special considerations for defining an async function?
   ◊ It doesn't take an explicit completion handler, but can it?
   ◊ You just use 'return' to complete a async function, no need to call a completion handler

   Calling an async function still runs only one piece of code at a time.
   First the code before async, then the async, and then when it's done,
   the code after the async call.

   async for loops -- loop over a bunch of values
   that are being generated asynchronously.
   handle them one at a time, instead of waiting for the whole thing:

   for try await line in doSomething() { }
   
   ok, but all of that is still doing one thing at a time
   what about actual concurrency, where we do multiple things?

   async let -- first taste of concurrency
   you can write a bunch of them, one after the other,
   and all of that code takes turns running
   TR: Is it running in parallel, or round-robin sharing the CPU/thread?

   async-let implicitly makes a task
   ... transition into Task APIs

   Task.withGroup(resultType:)
   TaskGroup.add()
   TaskGroup.next()

   [FIGURE]
   Task states

   > There's no way for reference to the child task to
   > escape the scope in which the child task is created.
   > This ensures that the structure of structured concurrency is maintained.
   > It makes it easier to reason about
   > the concurrent tasks that are executing within a given scope,
   > and also enables various optimizations.

   detached tasks --> task handles

   ... defer UnsafeCurrentTask and similar to the stdlib reference

   tasks support cancellation --
   basically, you just ask "was this work cancelled?"
   before you start doing stuff in the task.
   By convention, if you need to bail after being cancelled,
   you throw CancellationError, which is what Task.checkCancellation() does.
   This also might defer to the stdlib.

   child tasks
   cancellation and priority propogate down from parent to children
   you can wait for each child
        while let result = try await group.next() { }
        for try await result in group { }

   how much should you have to understand threads to understand this?
   Ideally you don't have to know anything about them.



   How do you meld async-await-Task-Actor with an event driven model?
   Can you feed your user events through an async sequence or Combine
   and then use for-await-in to spin an event loop?
   I think so -- but how do you get the events *into* the async sequence?



   ◊ example of calling an actor function


.. Other stuff to cover

   SE-0300
   withUnsafeContinuation
   withUnsafeThrowingContinuation
   withCheckedContinuation
   withCheckedThrowingContinuation

   SE-0302 concurrent values

.. CODE SKETCH

   func downloadAsset(name: String) -> async Data { ... }
   func downloadAsset(name: String) -> async throws Data { ... }

   ... parse the Data object, maybe to turn it into the level of a game
   ... and figure out which sprite assets you need to fetch

   actor class AssetLoader {
       static func download(_ name: String) -> Data { }
   }
