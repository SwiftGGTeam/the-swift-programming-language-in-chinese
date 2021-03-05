Concurrency
===========

◊ Intro ◊

- why you would want async code
- the difference between async and concurrency (aka parallelism)
- common use cases
    + network operations
    + long running model-layer calculations
    + parsing files
    + don't block the UI!

.. _Concurrency_AsyncFunc:

Defining and Calling Asynchronous Functions
-------------------------------------------

◊ Outline ◊

- you mark a function as asynchronous by putting ``async`` next to the arrow
- sleep() does nothing, but takes the specified amount of time do do so,
  which makes it a useful function for testing asynchronous code
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
    + code in a do-this-thing-while-blocking call from the stdlib
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

- tasks aren't threads -- a task does run on a thread,
  but that's not exposed as part of the model
- task group models a hierarchy or collection of tasks
    + QUESTION: What relationships can the tasks in group have to each other?




◊ OUTLINE ◊
-----------

.. OUTLINE

   == Async await ==

   :newTerm:`Asynchronous` code it starts now, but doesn't finish until later,
   and the code after it goes ahead and runs.
   :newTerm:`Concurrent` code means multiple parts of your program
   are running at the same time.
   You can have either one, or both.  They're separate characteristics.

   You use 'async' to mark an asynchronous function
   and you use 'await' to mark a call to an async function.
   (This is parallel to using 'throws' and 'try' in code with error handling.
   There are a lot of parallels between them, which was intentional.)

   'async' means this might take time to return
   async on its own is a nicer way to write callbacks;
   it doesn't give you concurrency on its own.
   when you want concurrency, you create a task.

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

   You can call async functions only from another async context
   or with the stdlib call-async-and-wait function.
   Top-level code is implicitly async.
   You can have an async @main function if you write it that way.
   (To tell the full story here, you need tasks & actors.)

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

   Note: A task isn't a thread.
   Tasks run on threads - but that's not exposed as part of the model.

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

   task have deadlines, not timeouts
   "now + 20 ms"

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

   ... actors

   ◊ what promises are you making about concurrency/threading when you define an actor?



   in order for concurrency to happen,
   you have to be waiting for something to finish


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
