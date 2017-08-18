Memory Safety
=============

Memory safety is the guarantee that accessing any allocated memory returns a valid result.
By Swift's standards, a valid result means that the allocated memory has been initialized to a value,
the value is of the expected type, and the value is of the most recent modification.
Think of writing and reading from memory safely like writing words onto a piece of paper:
you would not expect the words to have changed by themselves if you leave and come back to read them later.
Similarly, when you allocate and write to an address in memory, if you are not intentionally modifying that value,
other code should not be overwriting that value as an unintentional side-effect .

The compiler maintains memory safety by enforcing a set of guarantees around memory access.
Many of these guarantees have already been covered previously. For example:

* Variables and constants must have a value assigned to them
  before they can be read.
  This guarantee is called :newterm:`definite initialization`
  and is discussed in "Initialization".

* Only memory that is part of a data structure
  can be accessed through that data structure.
  For example, reading past the end of an array
  is an error,
  it doesn't access the adjacent memory and unintentionally overwrite some other value.

* Memory must not be accessed after it has been deallocated.
  This guarantee is discussed in "Automatic Reference Counting".

One aspect of memory safety that has not yet been covered is that
memory that contains shared mutable state must not be accessed at the same time.
This guarantee is called :newterm:`exclusive access`.

Characteristics of Memory Access
-------------------------------

.. XXX Convert listings in this section to test code.

There are three characteristics of memory access that are relevant 
to the discussion of exclusive access:
*what value* is the compiler accessing, *how* is the compiler accessing the value, and
*how long* the compiler needs access to that value.

*What value* the compiler is accessing is the address in memory the compiler is reading from.

The *how* of a memory access refers to whether the compiler is reading from or writing to that location in memory. 
If the compiler is loading from a value, the access is defined as a *read access*. 
Else if the compiler is assigning to or modifying a value, the access is defined as a *write access*.

The following code sample is annotated to demonstrate
where read and write accesses occur in code:

::

    var i = 1 // this is a write to i
    func incrementInPlace(_ number: inout Int) {

        number += i // this a read from i and then a write to number
    }

Finally, the *how long* of a memory access refers to whether 
the compiler needs *instantaneous* access or *long-term* access. 
An access is *instantaneous* if no other accesses can occur while the access in question is happening. 
For the most part, most memory accesses are instantaneous.  For example, 
all the accesses in the earlier example code are instantaneous accesses:


::

    var i = 1 // instantaneous write to i
    func incrementInPlace(_ number: inout Int) {

        number += i // instantaneous read from i, followed by instantaneous write to number
    }

However, there are certain conditions in code (that will be expanded upon later) 
that require the compiler to have a *long-term* access that lasts 
several lines of execution and can potentially overlap with other accesses.

With these definitions in place, the guarantee of exclusive access can defined as 
no write access can overlap any other access to the same area of memory at the same time of execution.
If a long-term access overlaps with another access to the same area of memory, 
where one of the accesses is a write access, then that is an exclusive access violation.


What Exclusive Access Guarantees
--------------------------------

.. docnote:: Facts that need to go somewhere...

    - Within a single thread (use TSan for multithreading)...
    - When working with shared mutable state...
    - It's guaranteed not accessed by two pieces of code at the same time
    - Except for two overlapping reads
    - And except for things that we can prove are safe

Exclusive Access for In-Out Parameters
--------------------------------------

A function has write access
to all of its in-out parameters.
The write access for in-out parameter starts
after all of the other parameters have been evaluated
and lasts for the entire duration of that function call.

.. docnote:: Possible example of the "after all other parameters" rule.

One consequence of this is that you can't access the original
variable that was passed as in-out,
even if scoping and access control would otherwise permit it ---
any access to the original
creates a conflict.
For example:

.. testcode:: memory-increment

    -> var i = 1
    ---
    -> func incrementInPlace(_ number: inout Int) {
           number += i
       }
    ---
    -> incrementInPlace(&i)  // Error
    xx Simultaneous accesses to 0x10e8667d8, but modification requires exclusive access.
    xx Previous access (a modification) started at  (0x10e86b032).
    xx Current access (a read) started at:

In the code above,
even though ``i`` is a global variable,
and would normally be accessible from within ``incrementInPlace(_:)``,
the read and write accesses to ``i`` conflict
if you call ``incrementInPlace(_:)`` with ``i`` as its parameter.

.. image:: ../images/memory_increment_2x.png
   :align: center

.. docnote:: FIGURE: add underscored parameter label: (_ number: inout Int)

Passing the same variable as an in-out parameter more than once
is also an error because of exclusive access.
For example:

.. testcode:: memory-balance

    -> func balance(_ x: inout Int, _ y: inout Int) {
           let sum = x + y
           x = sum / 2
           y = sum - x
       }
    -> var myNumber = 42
    -> var myOtherNumber = 9000
    << // myNumber : Int = 42
    << // myOtherNumber : Int = 9000
    -> balance(&myNumber, &myOtherNumber)  // Ok
    -> balance(&myNumber, &myNumber)  // Error
    !! <REPL Input>:1:20: error: inout arguments are not allowed to alias each other
    !! balance(&myNumber, &myNumber)  // Error
    !!                    ^~~~~~~~~
    !! <REPL Input>:1:9: note: previous aliasing argument
    !! balance(&myNumber, &myNumber)  // Error
    !!         ^~~~~~~~~
    !! <REPL Input>:1:9: error: overlapping accesses to 'myNumber', but modification requires exclusive access; consider copying to a local variable
    !! balance(&myNumber, &myNumber)  // Error
    !!                    ^~~~~~~~~
    !! <REPL Input>:1:20: note: conflicting access is here
    !! balance(&myNumber, &myNumber)  // Error
    !!         ^~~~~~~~~

The ``balance(_:_:)`` function above
modifies its two parameters
to divide the total value evenly between them.
(It's used again in the examples below
to evenly share health points between players in a game.)
Calling it with ``myNumber`` and ``myOtherNumber`` as parameters
doesn't violate exclusive access to memory ---
there are write accesses to both parameters at the same time,
but they access different memory.
In contrast,
passing ``myNumber`` as the value for both parameters
does violate exclusive access
because it tries to have two write accesses
to the same memory at the same time.

.. XXX This is a generalization of existing rules around inout.
   Worth revisiting the discussion in the guide/reference
   to adjust wording there, now that it's a consequence of a general rule
   instead of a one-off rule specifically for in-out parameters.

Exclusive Access for Methods
----------------------------

.. This (probably?) applies to all value types,
   but structures are the only place you can observe it.
   Enumerations can have mutating methods
   but you can't mutate their associated values in place,
   and tuples can't have methods.

A mutating method on a structure has write access to ``self``
for the duration of the method.
For example:

.. docnote:: This behaves like self is passed to the method as inout
             because, under the hood, that's exactly what happens.

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
           mutating func restoreHealth(completionHandler: () -> Void ) {
               health = 10
               completionHandler()
           }
       }

In the method above that restores a player's health to 10,
a write access to ``self`` starts at the beginning of the function
and lasts until the function returns.
That means, for example,
that code in the completion handler
can't also modify ``self``.
It also means that
to call ``restoreHealth(completionHandler:)``
when there's already a write access to ``self``.

By combining a mutating method with an in-out parameter,
you can construct an example
where exclusivity violations are possible
for code whose meaning is also unclear.
For example:

.. XXX polish wording in para above

.. testcode:: memory-player-share-with-self

    -> extension Player {
           mutating func shareHealth(with player: inout Player) {
               balance(&player.health, &health)
           }
       }
    ---
    -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
    -> var maria = Player(name: "Maria", health: 5, energy: 10)
    << // oscar : Player = REPL.Player(name: "Oscar", health: 10, energy: 10)
    << // maria : Player = REPL.Player(name: "Maria", health: 5, energy: 10)
    -> oscar.shareHealth(with: &maria)  // Ok
    -> oscar.shareHealth(with: &oscar)  // Error
    !! <REPL Input>:1:25: error: inout arguments are not allowed to alias each other
    !! oscar.shareHealth(with: &oscar)  // Error
    !!                         ^~~~~~
    !! <REPL Input>:1:1: note: previous aliasing argument
    !! oscar.shareHealth(with: &oscar)  // Error
    !! ^~~~~
    !! <REPL Input>:1:1: error: overlapping accesses to 'oscar', but modification requires exclusive access; consider copying to a local variable
    !! oscar.shareHealth(with: &oscar)  // Error
    !!                          ^~~~~
    !! <REPL Input>:1:25: note: conflicting access is here
    !! oscar.shareHealth(with: &oscar)  // Error
    !! ^~~~~~

In the example above,
calling the `shareHealth(with:)` method
for Oscar's player to share health with Maria's player
doesn't cause a violation.
There's a write access to ``oscar`` during the method call
because its the value of ``self`` in a mutating method,
and there's a write access to ``maria``
for the same duration
because it was passed as a in-out parameter.
These write accesses overlap in time,
but they are accessing different memory,
so there is no violation.

However,
if you pass ``oscar`` as the other player,
there's a violation ---
both the mutating method on ``oscar``
and passing ``oscar`` as an in-out parameter to that method
require a write access to the same memory at the same time.

Exclusive Access for Properties
-------------------------------

.. docnote:: Outline

   - In general, for value types, access to a property is access to
     the entire structure.  This preserves value semantics.
   - For structs, the compiler can often prove the overlap/violation
     is still safe, so we just let you do it.
   - Note that the above caveat doesn't apply to tuples.
   - For classes, ovrelapping access to different properties is always
     kosher, because there's no value semantics to preserve.

.. General thoughts on classes vs structs

   It's ok to have spooky action at a distance in classes
   because they're already reference types.
   You need to be able to deal with them having overlapping access
   in the same way that you need to deal with them having
   reference semantics.

   Because classes are reference types,
   a mutation to one of the properties of a class instance
   isn't considered a mutation to the class instance as a whole.
   That rule ensures that value semantics are preserved for value types,
   but it doesn't apply to classes, which are reference types.
   It's not unusual to have faraway code change parts of a class.

   Likewise, for structures,
   the language model for mutation is that
   when you assign a new value to a property of a struct,
   it's the moral equivalent of assigning a new value
   to the entire struct.
   There's no reference semantics,
   so no spooky action at a distance,
   and therefore no overlapping access
   (which could cause such a thing)
   is allowed.

Types like structures, tuples, and enumerations
are made up of individual constituent values,
such as a structure's properties or a tuple's elements.
Because these are value types, mutating any piece of the value
mutates the whole value ---
this means read or write access to one of the properties
requires read or write access to the whole value.

For example,

.. testcode:: memory-tuple

    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> var myTuple = (10, 20)
    << // myTuple : (Int, Int) = (10, 20)
    -> balance(&myTuple.0, &myTuple.1)  // Error
    xx Simultaneous accesses to 0x10794d848, but modification requires exclusive access.
    xx Previous access (a modification) started at  (0x107952037).
    xx Current access (a modification) started at:

In the example above,
calling ``balance(_:_:)`` on the elements of a tuple fails
because there are overlapping write accesses to the tuple.
Both ``myTuple.0`` and ``myTuple.1`` are passed as in-out parameters,
which means ``balance(_:_:)`` needs write access to them.
In both cases, a write access to the tuple member
requires a write access to the entire tuple.
This means you have two write access to ``myTuple`` with exactly the same duration.

Although a structure is also a value type,
in many cases the compiler can prove
that the overlapping access are safe.
This means most access to stored properties *can* overlap for structures.
For example, consider a game where each player
has a health amount, which decreases when taking damage,
and an energy amount, which decreases when using special abilities.

.. testcode:: memory-share-health

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
    >> func f() {
    -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
    -> balance(&oscar.health, &oscar.energy)  // Ok
    >> }
    >> f()

.. docnote:: The code in the listing above is wrapped in a hidden function
             because this "overlapping property access is safe" caveat really
             only works for local variables, not globals.  Need to add this to
             the discussion.

In the example above,
Oscar's health and energy are passed
as the two in-out parameters to ``balance(_:_:)`` ---
although this technically violates memory exclusivity
because both are properties of the same structure,
the compiler can prove that memory safety is preserved.
The two stored properties don't interact in any way,
so overlapping writes to them can't cause a problem.

In contrast, if ``health`` is a computed property,
it's no longer possible to prove that the overlapping writes are safe.

.. testcode:: memory-computed-property

    -> struct Player {
           var name: String
           var remainingLives = 5
           var energy = 10
           private var _health: Int = 10
           var health: Int {
               get {
                   return _health
               }
               set {
                   if newValue > 0 {
                       _health = newValue
                   } else {
                       remainingLives -= 1
                       _health = 10
                   }
               }
           }
           init(name: String) {
               self.name = name
           }
       }
    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    >> func f() {
    -> var oscar = Player(name: "Oscar")
    -> balance(&oscar.health, &oscar.energy)  // Error
    >> }
    >> f()
    !! <REPL Input>:3:11: error: overlapping accesses to 'oscar', but modification requires exclusive access; consider copying to a local variable
    !! balance(&oscar.health, &oscar.energy)  // Error
    !!                        ^~~~~~~~~~~~~
    !! <REPL Input>:3:26: note: conflicting access is here
    !! balance(&oscar.health, &oscar.energy)  // Error
    !!         ^~~~~~~~~~~~~
    !! <REPL Input>:1:1: error: use of unresolved identifier 'f'
    !! f()
    !! ^


.. docnote:: Not quite the right wording here...
   In some places, the compiler could prove this,
   we just made the bright line that it doesn't try
   for getters and setters.
   That would be even more confusing, since you'd have a hidden cliff.

In the version of ``health`` above,
any time the player runs out of health points,
the property setter subtracts a life
and resets ``health`` to its full value of ten.
Because ``health`` is a computed property,
any mutation to a property of ``oscar``
requires mutation to the entire ``Player`` structure,
so overlapping changes to the structure's properties aren't allowed.

.. Because there's no syntax
   to mutate an enum's associated value in place,
   we can't show that overlapping mutations
   to two different associated values on the same enum
   would violate exclusivity.

.. docnote:: REVISION ENDED HERE

Strategies for Resolving Exclusivity Violations
-----------------------------------------------

.. XXX Swap out below with a less throat-clearing intro.

Although, like all types of debugging,
every piece of code is different,
there are some common strategies that you can use
to resolve overlapping access to memory.

**Describe what the code should do.**
Although it might sound silly,
it's useful to work out exactly what was intended
by the code that's causing the compiler error.
In the example above that uses ``mapInPlace``
there were at least two ways
that the code could be expected to execute.

**Make an explicit copy.**
When you have an exclusivity violation
caused by reading memory while that memory is being modified,
you can assign the value to a local constant
before the mutation begins.
For example::

    var numbers = [10, 20, 30]
    let first = numbers[0]
    numbers.mapInPlace { $0 + first }

The first element of ``numbers`` is assigned to ``first``
before calling ``mapInPlace``.
The read access to assign ``first`` its value
completes before ``mapInPlace`` starts modifying the array,
so there isn't a conflict.

.. TR: If you have a conflict using overlapping inout writes,
   you can make an explicit copy using a var,
   and then you have to merge the two values after.

   func (inout foo, closure) { c() }
   var f = 100
   func(&f) { f += 1 }  // Error
   // FIXME: Use a local variable to copy 'f'.

**Operate on a whole structure instead of its properties.**
Instead of passing multiple properties of a structure
as in-out parameters to the same function,
either write a version of the function
that accepts an instance of the structure as a parameter,
or write a mutating method on the structure.
Both of these approaches avoid the problem
of overlapping write accesses
because they contain only one write access to the structure.

.. TR: This won't apply in nearly as many places.
   The same fundamental problem still applies,
   but the example will get more complicated.

For example,
the code listing below shows two ways
to fix the code from earlier in the chapter
for balancing health and energy.

::

    // Original approach:
    balance(&oscar.health, &oscar.energy)  // Error

    // Passing a single player:
    func balanceHealthAndEnergy(_ player: inout Player) {
        balance(&player.health, &player.energy)
    }
    balanceHealthAndEnergy(&oscar)  // Ok

    // Implemented as a mutating method:
    extension Player {
        mutating func balanceHealthAndEnergy() {
            balance(&health, &energy)
        }
    }
    oscar.balanceHealthAndEnergy()  // Ok

The original approach,
calling ``balance(_:_:)`` and passing it two properties of a ``Player``,
fails because each in-out parameter has its own write access
to ``oscar``.
Both write accesses last the entire duration of the function call,
so they overlap.

The alternate approaches ---
either passing ``oscar`` as the in-out parameter
or implementing ``balance()`` as a mutating method of ``Player`` ---
both resolve the issue the same way:
they have only one write access to ``oscar``.
While that single write access is ongoing,
the properties of ``oscar`` can be read or written.

.. docnote:: TR: Is this accurate?

   It looks like the underlying/nested call to balance(_:_:)
   still has two write accesses,
   one to ``health`` and one to ``energy``.
   Is the difference because those in-out write accesses
   are to a local variable of the outer function/method?


LEFTOVERS
---------

.. docnote:: These need to move to a section above or another chapter.

Some safety violations are detected when you compile your code,
which gives you an error at that time.
Some violations can't be detected at compile time,
because they depend on the current value
of a variable in your code,
such as the index you use to access the array.
These violations that can't be detected at compile time
are detected at runtime.
In general,
Swift detects as many safety violations as possible
at compile time.

At runtime,
when a safety violation is detected,
program execution stops immediately.
Because safety violations are *programmer errors*,
Swift stops program execution instead of throwing an error.
Swift's error-handling mechanism is for recoverable errors;
programmer error, such as a safety violation,
is not recoverable.
Stopping execution immediately, at the point of the violation,
prevents propagating invalid state to other parts of the program
which can corrupt the program's state and the user's data.
A predictable, immediate failure is also easier to debug.

.. note::

    Because exclusive access is a slightly broader guarantee
    than memory safety,
    some code that is memory safe
    violates the guarantee of exclusive access.
    Swift allows this code if the compiler can prove
    that the nonexclusive access is still safe.

    Versions of Swift before Swift 4 ensure memory safety
    by agressively making a copy of the shared mutable state
    when a conflicting access is possible.
    The copy is no longer shared, preventing the possibility of conflicts.
    However, the copying appproach has a negative impact
    on performance and memory usage.

    .. TR: Swift 4 does this copying too.
       Frame this in terms as the copying is the *only* thing Swift 3 did.
       The carrot today is that you have a cleaner semantic model,
       not that you don't get copying.
       It lets you actually know that you have non-overlapping access.

-- -- -- -- -- -- 

In Swift,
the term *safety* usually refers to :newTerm:`memory safety` ---
although there are are other kinds of safety,
such as type safety and thread safety.
You can see this naming convention in use
by looking in the standard library
for types and functions that include the word "unsafe" in their name.
Those APIs don't guarantee memory safety,
so it's your responsibility to review your code
when you use them.

-- -- -- -- -- -- 

Move to "Error Handling":

When Swift needs to stop program execution
in a controlled and predictable manner,
it uses a mechanism called a trap.
Although a trap may appear to be the same as a crash to a user
who sees the program suddenly stop,
the control and predictability of a trap
are an important difference.

.. Trapping is also something that Foundation and other frameworks do
   when you violate part of the API contract.
   (Pretty sure that's the same thing there & here.)
   It's implemented there an illegal instruction
   and in the stdlib by Builtin.int_trap().

.. XXX Details about trapping really belong under "Error Handling".
