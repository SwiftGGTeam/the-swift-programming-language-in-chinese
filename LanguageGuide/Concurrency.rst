Concurrency
===========

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

   a()
   await b()
   c()

   vs

   a()
   b() {
    c()
   }

   The behavior is the same, but the 'await' version in much easier to read.

   You can call async functions only from another async context
   or with the stdlib call-async-and-wait function.
   (To tell the full story here, you need tasks & actors.)

   Calling an async function still runs only one piece of code at a time.
   First the code before async, then the async, and then when it's done,
   the code after the async call.

   async for loops -- loop over a bunch of values
   that are being generated asynchronously.
   handle them one at a time, instead of waiting for the whole thing:

   for try await line in doSomething() { }

   async let -- first taste of concurrency
   you can write a bunch of them, one after the other,
   and all of that code takes turns running
   TR: Is it running in parallel, or round-robin sharing the CPU/thread?

   async-let implicitly makes a task
   ... transition into Task APIs

   ... actors



   in order for concurrency to happen,
   you have to be waiting for something to finish


   how much should you have to understand threads to understand this?
   Ideally you don't have to know anything about them.



   How do you meld async-await-Task-Actor with an event driven model?
   Can you feed your user events through an async sequence or Combine
   and then use for-await-in to spin an event loop?
   I think so -- but how do you get the events *into* the async sequence?


.. Other stuff to cover

   SE-0300
   withUnsafeContinuation
   withUnsafeThrowingContinuation
   withCheckedContinuation
   withCheckedThrowingContinuation

   SE-0302 concurrent values
