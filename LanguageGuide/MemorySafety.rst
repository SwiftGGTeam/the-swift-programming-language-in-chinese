Memory Safety
=============

By default, Swift prevents unsafe behavior from happening in your code.
For example,
Swift ensures that variables are initialized before they're used,
memory isn't accessed after it's been deallocated,
and array indices are checked for out-of-bounds errors.

Swift also makes sure that multiple accesses
to the same area of memory don't conflict,
by requiring code that modifies an area of memory
to have exclusive access to that memory.
Because Swift manages memory automatically,
most of the time you don't have to think about accessing memory at all.
However,
it's important to understand where potential conflicts can occur,
so you can avoid writing code that has conflicting access to memory.
If your code does contain conflicts,
you'll get a compile-time or runtime error.

.. XXX maybe re-introduce this text...

   Memory safety refers to...
   The term *safety* usually refers to :newTerm:`memory safety`...
   Unsafe access to memory is available, if you ask for it explicitly...

.. _MemorySafety_WhatIsExclusivity:

Understanding Conflicting Access to Memory
------------------------------------------

A conflicting access to memory can occur
when different parts of your code are trying
to access the same area of memory at the same time.
If you've written concurrent or multithreaded code,
conflicting access to memory might be a familiar problem.
However,
the conflicting access discussed here can happen
on a single thread and
*doesn't* involve concurrent or multithreaded code.

Conflicting access can happen on a single thread.
In Swift, there are ways to modify a value
that span several lines of code,
which means it's possible for other code to be executed
in the middle of the modification.
Multiple accesses to an area of memory at the same time
can produce unpredictable or inconsistent behavior.

You can see a similar problem
by thinking about how you update a budget
that's written on a piece of paper.
Updating the budget is a two-step process:
First you add the items' names and prices,
and then you change the total amount
to reflect the items currently on the list.
Before and after the update,
you can read any information from the budget
and get a correct answer,
as shown in the figure below.

.. image:: ../images/memory_shopping_2x.png
   :align: center

While you're adding items to a budget,
it's in a temporary, invalid state
because the total amount hasn't been updated
to reflect the newly added items.
Reading the total amount
during the process of adding an item
gives you incorrect information.

This example also demonstrates
a common problem with code
that contains conflicting access to memory:
There are multiple ways to fix the conflict
that produce different answers,
and the intended behavior isn't obvious.
If you wanted the old total,
you'd expect an answer of $5,
and you'd fix the conflict by reading the total
before you started adding to the budget.
However, if wanted the updated total,
you'd expect an answer of $320,
and you'd fix the conflict by
waiting for the total to be updated
before trying to read it.
Both interpretations are reasonable ---
before you can fix the code,
you have to determine what it was intended to do.

.. note::

   If you have conflicting access to memory
   from within a single thread,
   Swift guarantees that you'll get an error
   at either compile time or runtime.
   For multithreaded code,
   use `Thread Sanitizer <https://developer.apple.com/documentation/code_diagnostics/thread_sanitizer>`_
   to help detect conflicting access across threads.

.. XXX The xref above doesn't seem to give enough information.
   What should I be looking for when I get to the linked page?

.. XXX This still isn't really the right place for this threading aside.

.. _Memory_Characteristics:

Characteristics of Memory Access
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Access to memory happens in your code
when you do things like set the value of a variable
or pass an argument to a function.
For example,
the following code contains both a read access and a write access:

.. testcode:: memory-read-write

    // A write access to the memory where "one" is stored
    -> var one = 1
    << // one : Int = 1
    ---
    // A read access from the memory where "one" is stored
    -> print("We're number \(one)!")
    << We're number 1!

.. Might be worth a different example,
   or else I'm going to keep getting "We are Number One" stuck in my head.
    

.. XXX The three characteristics get listed too many times.

You can recognize conflicting access to memory
if you break down your code according to three characteristics:
whether any accesses are writes,
the duration of the accesses, the locations in memory being accessed.
Specifically,
a conflict occurs if you have two accesses
that meet all of the following conditions:

- One is a write access.
- They access the same location.
- Their durations overlap.

The difference between a read and write access
is explained above.
The location of a memory access
refers to the address in memory.
The duration of a memory access
can be described as either instantaneous or long-term.

.. XXX better handwaving around memory location
   variables and properties that refer to the same instances

An access is :newterm:`instantaneous`
if it's not possible for other code to run
after that access starts but before it ends.
By their nature, two instantaneous accesses can't happen at the same time.
Most memory access is instantaneous.
For example,
all the read and write accesses in the code listing below are instantaneous:

.. testcode:: memory-instantaneous

    -> func oneMore(than number: Int) -> Int {
           return number + 1
       }
    ---
    -> var myNumber = 1
    << // myNumber : Int = 1
    -> myNumber = oneMore(than: myNumber)
    -> print(myNumber)
    <- 2

.. XXX It's strange to have a value of 2 for a variable called 'one'.

However,
there are several ways to access memory,
called :newterm:`long-term` accesses,
that span the execution of other code.
The difference between instantaneous access and long-term access
is that it’s possible for other code to run
after a long-term access starts but before it ends,
which is called :newTerm:`overlap`.
A long-term access can overlap
with other long-term accesses and instantaneous accesses.

.. XXX maybe re-introduce this text...

   The specific kinds of Swift code that use long-term access
   are discussed in the sections below.

.. _MemorySafety_Inout:

Conflicting Access to In-Out Parameters
---------------------------------------

A function has long-term write access
to all of its in-out parameters.
The write access for an in-out parameter starts
after all of the non-in-out parameters have been evaluated
and lasts for the entire duration of that function call.
If there are multiple in-out parameters,
the write accesses start in the same order as the parameters appear in.

One consequence of this long-term write access
is that you can't access the original
variable that was passed as in-out,
even if scoping rules and access control would otherwise permit it ---
any access to the original creates a conflict.
For example:

.. testcode:: memory-increment

    -> var stepSize = 1
    ---
    -> func increment(_ number: inout Int) {
           number += stepSize
       }
    ---
    -> increment(&stepSize)  // Error
    xx Simultaneous accesses to 0x10e8667d8, but modification requires exclusive access.
    xx Previous access (a modification) started at  (0x10e86b032).
    xx Current access (a read) started at:

In the code above,
even though ``stepSize`` is a global variable,
and would normally be accessible from within ``increment(_:)``,
the read and write accesses to ``stepSize`` conflict
if you call ``increment(_:)`` with ``stepSize`` as its parameter.
As shown in the figure below,
both ``number`` and ``stepSize`` refer to the same memory.

.. image:: ../images/memory_increment_2x.png
   :align: center

One way to solve this conflict
is to make an explicit copy of the step size:

.. testcode:: memory-increment-copy

    >> var stepSize = 1
    << // stepSize : Int = 1
    >> func increment(_ number: inout Int) {
    >>     number += stepSize
    >> }
    ---
    // Make an explicit copy.
    -> var copyOfStepSize = stepSize
    << // copyOfStepSize : Int = 1
    -> increment(&copyOfStepSize)
    ---
    // Update the original.
    -> stepSize = copyOfStepSize
    /> stepSize is now \(stepSize)
    </ stepSize is now 2

When you make a copy of ``stepSize`` before calling ``increment(_:)``,
it's clear that the value of ``copyOfStepSize`` is incremented
by the current step size.
There's only one access to ``stepSize`` in the function,
so there isn't a conflict.

Passing a variable
as the argument to multiple in-out parameters
of the same function is also an error.
For example:

.. testcode:: memory-balance

    -> func balance(_ x: inout Int, _ y: inout Int) {
           let sum = x + y
           x = sum / 2
           y = sum - x
       }
    -> var playerOneScore = 42
    -> var playerTwoScore = 30
    << // playerOneScore : Int = 42
    << // playerTwoScore : Int = 30
    -> balance(&playerOneScore, &playerTwoScore)  // OK
    -> balance(&playerOneScore, &playerOneScore)  // Error
    !! <REPL Input>:1:26: error: inout arguments are not allowed to alias each other
    !! balance(&playerOneScore, &playerOneScore)  // Error
    !!                          ^~~~~~~~~~~~~~~
    !! <REPL Input>:1:9: note: previous aliasing argument
    !! balance(&playerOneScore, &playerOneScore)  // Error
    !!         ^~~~~~~~~~~~~~~
    !! <REPL Input>:1:9: error: overlapping accesses to 'playerOneScore', but modification requires exclusive access; consider copying to a local variable
    !! balance(&playerOneScore, &playerOneScore)  // Error
    !!                          ^~~~~~~~~~~~~~~
    !! <REPL Input>:1:26: note: conflicting access is here
    !! balance(&playerOneScore, &playerOneScore)  // Error
    !!         ^~~~~~~~~~~~~~~

The ``balance(_:_:)`` function above
modifies its two parameters
to divide the total value evenly between them.
Calling it with ``playerOneScore`` and ``playerTwoScore`` as parameters
preserves exclusive access to memory ---
there are two write accesses that overlap in time,
but they access different locations in memory.
In contrast,
passing ``playerOneScore`` as the value for both parameters
causes conflicting access to memory
because it tries to perform two write accesses
to the same memory at the same time.

.. note::

    Because operators are functions,
    they can have long-term accesses to their in-out parameters too.
    For example, if ``balance`` was an operator function named ``+++``,
    writing ``playerOneScore +++ playerOneScore``
    would result in the same conflicting access
    as ``balance(&playerOneScore, &playerOneScore)``.

.. _MemorySafety_Methods:

Conflicting Access to self in Methods
-------------------------------------

.. This (probably?) applies to all value types,
   but structures are the only place you can observe it.
   Enumerations can have mutating methods
   but you can't mutate their associated values in place,
   and tuples can't have methods.

.. Methods behave like self is passed to the method as inout
   because, under the hood, that's exactly what happens.

A mutating method on a structure has write access to ``self``
for the duration of the method call.
For example, consider a game where each player
has a health amount, which decreases when taking damage,
and an energy amount, which decreases when using special abilities.

.. testcode:: memory-player-share-with-self

    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> struct Player {
           var name: String
           var health: Int
           var energy: Int
           mutating func restoreHealth() {
               health = 10
           }
       }

.. XXX Brian notes that the 10 above isn't clearly the "max value" of a health.

In the ``restoreHealth()`` method above,
a write access to ``self`` starts at the beginning of the method
and lasts until the method returns.
In this case, there's no other code
inside ``restoreHealth()``
that could have an overlapping access to the properties of a ``Player`` instance.
The ``shareHealth(with:)`` method below
takes another ``Player`` instance as an in-out parameter,
creating the possibility of overlapping accesses.

.. testcode:: memory-player-share-with-self

    -> extension Player {
           mutating func shareHealth(with teammate: inout Player) {
               balance(&teammate.health, &health)
           }
       }
    ---
    -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
    -> var maria = Player(name: "Maria", health: 5, energy: 10)
    << // oscar : Player = REPL.Player(name: "Oscar", health: 10, energy: 10)
    << // maria : Player = REPL.Player(name: "Maria", health: 5, energy: 10)
    -> oscar.shareHealth(with: &maria)  // OK! No conflicting accesses.

In the example above,
calling the ``shareHealth(with:)`` method
for Oscar's player to share health with Maria's player
doesn't cause a violation.
There's a write access to ``oscar`` during the method call
because ``oscar`` is the value of ``self`` in a mutating method,
and there's a write access to ``maria``
for the same duration
because ``maria`` was passed as an in-out parameter.
These write accesses overlap in time,
but they access different memory,
so there's no violation,
as shown in the figure below.

.. image:: ../images/memory_share_health_maria_2x.png
   :align: center

However,
if you pass ``oscar`` as the argument to ``shareHealth(with:)``,
there's a violation:

.. testcode:: memory-player-share-with-self

    -> oscar.shareHealth(with: &oscar)  // Error, accesses to oscar conflict!
    !! <REPL Input>:1:25: error: inout arguments are not allowed to alias each other
    !! oscar.shareHealth(with: &oscar)  // Error, accesses to oscar conflict!
    !!                         ^~~~~~
    !! <REPL Input>:1:1: note: previous aliasing argument
    !! oscar.shareHealth(with: &oscar)  // Error, accesses to oscar conflict!
    !! ^~~~~
    !! <REPL Input>:1:1: error: overlapping accesses to 'oscar', but modification requires exclusive access; consider copying to a local variable
    !! oscar.shareHealth(with: &oscar)  // Error, accesses to oscar conflict!
    !!                          ^~~~~
    !! <REPL Input>:1:25: note: conflicting access is here
    !! oscar.shareHealth(with: &oscar)  // Error, accesses to oscar conflict!
    !! ^~~~~~

The mutating method needs write access to ``self``
for the duration of the method,
and the in-out parameter needs write access to ``teammate``
for the same duration.
Within the method,
both ``self`` and ``teammate`` refer to the same ``Player`` ---
the value of ``oscar`` ---
which means the two write accesses conflict,
as shown in the figure below.

.. image:: ../images/memory_share_health_oscar_2x.png
   :align: center

.. _MemorySafety_Properties:

Conflicting Access to Properties
--------------------------------

Types like structures, tuples, and enumerations
are made up of individual constituent values,
such as the properties of a structure or the elements of a tuple.
Because these are value types, mutating any piece of the value
mutates the whole value,
meaning read or write access to one of the properties
requires read or write access to the whole value.
For example,
overlapping write accesses to the elements of a tuple
is an error:

.. testcode:: memory-tuple

    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> var playerInformation = (health: 10, energy: 20)
    << // playerInformation : (Int, Int) = (10, 20)
    -> balance(&playerInformation.health, &playerInformation.energy)  // Error
    xx Simultaneous accesses to 0x10794d848, but modification requires exclusive access.
    xx Previous access (a modification) started at  (0x107952037).
    xx Current access (a modification) started at:

In the example above,
calling ``balance(_:_:)`` on the elements of a tuple
is an error
because there are overlapping write accesses to ``playerInformation``.
Both ``playerInformation.health`` and ``playerInformation.energy``
are passed as in-out parameters,
which means ``balance(_:_:)`` needs write access to them
for the duration of the function call.
In both cases, a write access to the tuple element
requires a write access to the entire tuple.
This means there are two write accesses to ``playerInformation``
with durations that overlap.

The listing below shows that the same error appears
for overlapping write accesses
to the properties of a structure
that's stored in a global variable.

.. testcode:: memory-share-health-global

    >> struct Player {
    >>     var name: String
    >>     var health: Int
    >>     var energy: Int
    >> }
    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
    -> balance(&oscar.health, &oscar.energy)  // error
    xx Simultaneous accesses to 0x10794d848, but modification requires exclusive access.
    xx Previous access (a modification) started at  (0x107952037).
    xx Current access (a modification) started at:

The restriction against
overlapping access to properties of a structure
isn't always necessary to preserve memory safety.
Memory safety is the desired guarantee,
but exclusive access is a stricter requirement than memory safety ---
which means some code preserves memory safety,
even though it violates exclusive access to memory.
Swift allows this memory-safe code if the compiler can prove
that the nonexclusive access to memory is still safe.
Specifically, it can prove
that overlapping access to properties of a structure is safe
if the following conditions apply:

- You're accessing only stored properties of an instance,
  not computed properties or class properties.
- The structure is the value of a local variable,
  not a global variable.
- The structure is either not captured by any closures,
  or it's captured only by nonescaping closures.

In practice,
these conditions mean that most access
to the properties of a structure
can overlap safely.
For example,
if the variable ``oscar`` in the example above
refers to a local variable instead of a global variable,
the compiler can prove that overlapping access
to stored properties of the structure is safe:

.. testcode:: memory-share-health-local

    >> struct Player {
    >>     var name: String
    >>     var health: Int
    >>     var energy: Int
    >> }
    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> func someFunction() {
           var oscar = Player(name: "Oscar", health: 10, energy: 10)
           balance(&oscar.health, &oscar.energy)  // OK
       }
    >> someFunction()

In the example above,
Oscar's health and energy are passed
as the two in-out parameters to ``balance(_:_:)``.
Although this violates exclusive access to memory
the compiler can prove that memory safety is preserved.
The two stored properties don't interact in any way,
so overlapping writes to them can't cause a problem.

.. note::

   Although overlapping access may be safe in other circumstances,
   the compiler's ability to reason about it is limited.
   If it can't prove the access is safe,
   it doesn't allow the access.

.. Because there's no syntax
   to mutate an enum's associated value in place,
   we can't show that overlapping mutations
   to two different associated values on the same enum
   would violate exclusivity.
   Otherwise, we'd want an example of that
   in this section too --
   it's the moral equivalent of property access.

.. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..

.. In Swift 4, the only way to create a long-term read
   is to use implicit pointer conversion
   when passing a value as a nonmutating unsafe pointer parameter,
   as in the example below.
   There is discussion in <rdar://problem/33115142>
   about changing the semantics of nonmutating method calls
   to be long-term reads,
   but it's not clear if/when that change will land.

   ::

       var global = 4

       func foo(_ x: UnsafePointer<Int>){
           global = 7
       }

       foo(&global)
       print(global)

       // Simultaneous accesses to 0x106761618, but modification requires exclusive access.
       // Previous access (a read) started at temp2`main + 87 (0x10675e417).
       // Current access (a modification) started at:
       // 0    libswiftCore.dylib                 0x0000000106ac7b90 swift_beginAccess + 605
       // 1    temp2                              0x000000010675e500 foo(_:) + 39
       // 2    temp2                              0x000000010675e3c0 main + 102
       // 3    libdyld.dylib                      0x00007fff69c75144 start + 1
       // Fatal access conflict detected.

.. TEXT FOR THE FUTURE

   Versions of Swift before Swift 5 ensure memory safety
   by aggressively making a copy of the shared mutable state
   when a conflicting access is possible.
   The copy is no longer shared, preventing the possibility of conflicts.
   However, the copying approach has a negative impact
   on performance and memory usage.

