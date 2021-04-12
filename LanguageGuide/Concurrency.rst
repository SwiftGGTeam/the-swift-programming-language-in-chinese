Concurrency
===========

Swift has built-in support for both asynchronous and concurrent code.
:newTerm:`Asynchronous code` can be suspended and resumed later,
although only one piece of the program is executing at a time.
Suspending and resuming code in your program
lets it continue to make progress
on short-term operations like updating its UI
while it continues to work on long-running operations
like fetching data over the network or parsing files.
:newTerm:`Concurrent code` means multiple pieces of code run at a time ---
for example, a computer with a four-core processor
can run four pieces of code at the same time,
with each core carrying out one of the four tasks.
A program that uses concurrent and asynchronous code
carries out multiple operations at a time,
it suspends operations that are waiting for an external system,
and does so in a memory-safe way.

The additional scheduling flexibility from concurrent or asynchronous code
also comes with a cost of increased complexity.
The language features that Swift gives you
let you express your intent in a way that Swift can verify when compiling,
for example ◊FIXME◊
However, adding concurrency to slow or buggy code
isn't a guarantee that it will become fast or correct;
it might even make it harder to debug.

The rest of this chapter uses the term *concurrency*
to refer to this common combination of asynchronous and concurrent code.

.. note::

   If you've written concurrent or asynchronous code before,
   you might be used to working with threads.
   The concurrency model in Swift
   is built on top of the operating system's support for threads,
   but you don't interact with threads directly.

◊ Outline ◊

- why you would want async code?  common use cases include:

  + network operations
  + long running model-layer calculations
  + parsing files
  + don't block the UI!

- the difference between async and concurrency

  + The execution of :newTerm:`asynchronous code` can be suspended and resumed later

  + :newTerm:`Concurrent code` means multiple pieces of code run at a time

  + they're commonly used together --- but one doesn't imply the other

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

- only async code can call async functions, including

  + top-level code

  + code marked ``@main``

  + non-async code wrapped in ``runAsyncAndBlock``

  + TR: I see ``runAsyncAndBlock`` marked deprecated now;
    what do we want people to use instead?

- you mark a call to an async function with ``await``

- this is like ``try`` when calling a throwing function

- it reminds you when reading the code that the program can stop here
  and go do something else while waiting for the function to return

- likewise, you know that when there's no ``await`` there's no suspension point

◊ code narrative: downloading a level's definition from the server,
parsing it in the background because that can be slow,
and then adding it to the list of levels

.. testcode:: defining-async-function
    :compile: true

    >> struct Data {}  // Instead of actually importing Foundation
    // Reads a shared gallery from the server and returns a list
    // of the names of pictures in that gallery.
    -> func listPhotos(inGallery name: String) async -> [String] {
           // ...
    >>     return ["IMG001", "IMG99", "IMG0404"]
       }
    // Downloads and returns the given picture.
    -> func downloadPhoto(named name: String) async -> Data {
           // ...
    >>     return Data()
       }
    // Displays the given picture on the user's screen.
    -> func show(_ image: Data) {
           // ...
       }
    ---
    >> runAsyncAndBlock {
    -> let photoNames = await listPhotos(inGallery: "Summer Vacation")
    -> let photo = await downloadPhoto(named: photoNames[0])
    -> show(photo)
    >> }

The callback-based version of the code above would like the following:

.. testcode:: defining-async-function
    :compile: true

    >> func listPhotos(inGallery name: String, completionHandler: ([String]) -> Void ) {
    >>   completionHandler(["IMG001", "IMG99", "IMG0404"])
    >> }
    >> func downloadPhoto(named name: String, completionHandler: (Data) -> Void) {
    >>     completionHandler(Data())
    >> }
    -> listPhotos(inGallery: "Summer Vacation") { photoNames in
           downloadPhoto(named: photoNames[0]) { photo in
               show(photo)
           }
       }

The behavior is the same,
but the ``await`` version in much easier to read and reason about.

◊TODO: Revise the discussion in the Closures chapter
where we currently talk about completion handlers.

◊TODO: Maybe talk about AsyncSequence here?

- async for loops --- loop over a bunch of values
- that are being generated asynchronously.
- handle them one at a time, instead of waiting for the whole thing:

::

   for try await photoName in listPhotos(inGallery...) { }
   

.. _Concurrency_AsyncLet:

Calling Asynchronous Functions Without Waiting
----------------------------------------------

◊ Outline ◊

- calls an async function, but then continues on rather than waiting
- you can us async-let multiple times, and that work can run at the same time
- when you need to use the return value, then you ``await``
- show a couple async-let use cases... a depends on b depends on c, but also
  a depends on b & c & d together
- behind the scenes, async-let is implicitly creating a Task

Calling an asynchronous function with ``await``
runs only one piece of code at a time.
While the asynchronous code is running,
the caller waits for that code to finish
before moving on to run the next line of code.
One way to call an asynchronous function without waiting
is to use ``async``-``let`` as shown below:

.. testcode:: defining-async-function
    :compile: true

    -> func show(_ images: [Data]) {
           // ...
       }
    >> runAsyncAndBlock {
    -> let photoNames = await listPhotos(inGallery: "Summer Vacation")
    ---
    -> async let firstPhoto = downloadPhoto(named: photoNames[0])
    -> async let secondPhoto = downloadPhoto(named: photoNames[1])
    -> async let thirdPhoto = downloadPhoto(named: photoNames[2])
    ---
    -> let photos = await [firstPhoto, secondPhoto, thirdPhoto]
    -> show(photos)
    >> }

In the example above,
writing ``await`` before the call to ``listPhotos(inGallery:)``
makes the function suspend there, as before.
However, the next three lines can run at the same time ---
loading the first, second, and third photo by calling ``downloadPhoto(named:)``
like this with ``async``-``let`` marks this as nonblocking asynchronous code.
All three function calls could happen at the same time
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

    + cancellation
    + timeouts
    + priority

- task group models a hierarchy or collection of tasks

    + QUESTION: What relationships can the tasks in group have to each other?
      Is there anything other than parent/child?

- task have deadlines, not timeouts --- like "now + 20 ms" ---
  a deadline is usually what you want anyhow when you think of a timeout

- this chapter introduces the core ways you use tasks;
  for the full list what you can do,
  see the Task API reference [link to stdlib]

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

- TR: Why do we have both ``Task.priority`` and ``Task.currentPriority``?
  What's the difference in the use case between them?

- The exact result of setting a task's priority depends on the executor

- TR: What's the built-in stdlib executor do?

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

- The cancellation model is "cooperative" --- each task checks whether it was canceled

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
◊ TODO: Rename this --- it's not really a "logger"... more of a history?

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
