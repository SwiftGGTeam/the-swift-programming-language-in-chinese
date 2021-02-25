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

   which comes next, actors or tasks?
   Transition into what you need for parallelism


.. Other stuff to cover

   SE-0300
   withUnsafeContinuation
   withUnsafeThrowingContinuation
   withCheckedContinuation
   withCheckedThrowingContinuation

   SE-0302 concurrent values
