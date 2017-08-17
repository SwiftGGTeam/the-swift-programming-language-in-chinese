Memory Safety
=============

There are several aspects of memory safety that Swift enforces:

* Variables and constants must have a value assigned to them
  before they can be read.
  This guarantee is called :newTerm:`definite initialization`
  and is discussed in "Initialization".

  .. XXX xref to chapter

* Only memory that is part of a data structure
  can be accessed through that data structure.
  For example, reading past the end of an array
  is an error,
  it doesn't access the adjacent memory.

* Memory must not be accessed after it has been deallocated.
  This guarantee is discussed in "Automatic Reference Counting".

.. XXX xref to chapter
   XXX Value types
   XXX Unsafe types

* Memory that contains shared mutable state
  must not have conflicting accesses.
  This guarantee is called :newTerm:`exclusive access`.
  The rest of this chapter discusses the guarantee of exclusive access.

Simultaneous Access to Memory
-----------------------------

When you think about how your program executes,
in many cases the smallest unit you consider
is an individual line of code.
For example,
when you're using the debugger,
you can step through the execution of your program,
one line at a time.
However, within each line of code,
Swift performs several actions.
For example,
consider the steps needed
to execute the second line in the following code listing:

.. TR: SE-076 wants this to be the model, but it's not today.
   Today, we do a copy at the beginning of the call,
   not a long-term read.
   Today, we don't have anything that does long-term read
   except for working with an unsafe pointer.

.. TR: Try using sort() below to make a long-term write
   and then go into a read/write overlap.

.. TR: Looks like you mostly show read/write conflict.
   Might want to show write/write conflict too.

.. testcode:: memory-map-1

    -> let numbers = [10, 20, 30]
    -> let newNumbers = numbers.map { $0 + 100 }
    << // numbers : [Int] = [10, 20, 30]
    << // newNumbers : [Int] = [110, 120, 130]

Swift performs the following more granular steps
to execute that line:

* Start reading from ``numbers``.
* Execute the body of the closure three times.
  Accumulate the results in  a new, empty array.
* Finish reading from ``numbers``.
* Assign the new array as the value of ``newNumbers``.

.. TR: We only read ``numbers``
   while getting ``numbers[0]`` during the addition.
   Not for the entire duration of the closure.
   This is related to why ``s+=`` works;
   we copy ``s`` first and pass it as an argument.

Note in particular that
Swift is accessing ``numbers`` for the entire duration
of the ``map`` operation.
Because the read access doesn't start and end
in the same step,
it's possible for another access to start
before this access ends,
which is called an *overlapping access*.
For example:

.. testcode:: memory-map-2

    -> let numbers = [10, 20, 30]
    -> let newNumbers = numbers.map { $0 + numbers[0] }
    << // numbers : [Int] = [10, 20, 30]
    << // newNumbers : [Int] = [20, 30, 40]

This time,
instead of adding a constant amount to each element,
the closure body adds the value of the first element
to each element in ``numbers``.
Swift performs the following more granular steps
to execute the second line:

* Start reading from ``numbers``.
* Make a new, empty array to accumulate the mapped results.
* Execute the closure body three times:
    - Start reading from ``numbers`` to access ``numbers[0]``.
    - Calculate ``$0 + numbers[0]``
      and append the result to the new array.
    - Finish reading from ``numbers``.
* Finish reading from ``numbers``.
* Assign the new array as the value of ``newNumbers``.

The access to ``numbers[0]`` inside the body of the closure
overlaps the ongoing access to ``numbers``
that started in the first step.
However, this overlap is safe
because both accesses are *reading* from the array.

.. image:: ../images/memory_map_2x.png
   :align: center

.. docnote:: FIGURE: change $1 to $0
.. docnote:: FIGURE: add spaces around all { and } braces

In contrast to the example above,
where two reads are allowed to overlap,
the example below shows a read and write that overlap,
violating memory exclusivity,
and causing a compiler error.
Consider an in-place, mutating version of ``map`` called ``mapInPlace``:

.. testcode:: memory-map-in-place

    >> extension MutableCollection {
    >>     mutating func mapInPlace(transform: (Element) -> Element) {
    >>         var i = self.startIndex
    >>         while i < self.endIndex {
    >>             self[i] = transform(self[i])
    >>             formIndex(after: &i)
    >>         }
    >>     }
    >> }
    -> var numbers = [10, 20, 30]
    -> numbers.mapInPlace { $0 + numbers[0] }  // Error
    xx Simultaneous accesses to 0x11584c8d0, but modification requires exclusive access.
    xx Previous access (a modification) started at  (0x115851075).
    xx Current access (a read) started at:

Because ``mapInPlace`` changes the array,
it has a write access to ``numbers`` for the duration
of the function call.
Just like the read access for ``map``,
the write access for ``mapInPlace`` spans several steps ---
overlapping with the read inside the closure
to get the first element of the array.
Different parts of the program
are reading from and writing to the same memory at the same time
which is a violation of memory safety.

.. image:: ../images/memory_mapInPlace_2x.png
   :align: center

In this case,
you can also see the ambiguity
by considering what the value of ``numbers`` should be
after running the code.
Should ``numbers[0]`` access the first element
of the original array,
giving an answer of ``[20, 30, 40]``
or should it access the first element
after it was transformed in place,
giving an answer of ``[20, 40, 50]``?
The answer isn't clear ---
both interpretations of that piece of code
are reasonable.

What Exclusive Access Guarantees
--------------------------------

.. docnote:: Facts that need to go somewhere...

    - Within a single thread (use TSan for multithreading)...
    - When working with shared mutable state...
    - It's guaranteed not accessed by two pieces of code at the same time
    - Except for two overlapping reads
    - And except for things that we can prove are safe

Exclusive Access for In-Out Paramaters
--------------------------------------

A function has write access
to all of its in-out parameters.
The write access for in-out parameter starts
after all of the other parameters have been evaluated
and lasts for that entire duration of the function call.

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
    << // myNumber : Int = 42
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

.. docnote:: TODO: explain the violation -- overlapping writes

.. XXX This is a generalization of existing rules around inout.
   Worth revisiting the discussion in the guide/reference
   to adjust wording there, now that it's a consequence of a general rule
   instead of a one-off rule specifically for in-out parameters.

Exclusive Access for Methods
----------------------------

A mutating method has write access to ``self``
for the duration of the method.
For example:

.. docnote:: This behaves like self is passed to the method as inout
	     because, under the hood, that's exactly what happens.

.. testcode:: memory-player-share-with-self

    -> struct Player {
           var name: String
           var health: Int
           var energy: Int
    ---
           mutating func shareHealth(with player: inout Player) {
               balance(&player.health, &health)
           }
       }
    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
    -> var maria = Player(name: "Maria", health: 5, energy: 10)
    << // oscar : Player = REPL.Player(name: "Oscar", health: 10, energy: 10)
    << // maria : Player = REPL.Player(name: "Maria", health: 5, energy: 10)
    -> oscar.shareHealth(with: &maria)  // Ok

.. docnote:: Is this too complex of an example to be first?
	     We've got both mutating and inout to get the write/write violation.
	     Maybe show nonmutating/inout or mutating/non-inout
	     as a version that works, building up to this.

However,
if you pass ``oscar`` as the other player,
there's a violation ---
both the mutating method on ``oscar``
and passing ``oscar`` as an in-out parameter to that method
require a write access to the same memory at the same time.

.. testcode:: memory-player-share-with-self

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
   
.. docnote:: TR: Check the following example—working as intended?

::

    extension Player {
        func giveHealth(to player: inout Player) {
            player.health += health
            player.health += health
        }
    }

    // Is this allowed on purpose? Write access to `oscar` inside read?
    // Unpredictable results: If `oscar` starts w/ health @ 10, should end with 30 or 40?
    oscar.giveHealth(to: &oscar)  // Ok


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
Because these are value types, mutation to any piece of the value
is a mutation to the whole value ---
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
which means ``balance(_:_:)`` needs write acces to them.
In both cases, a write access to the tuple member
requires a write access to the entire tuple.
This means you have two write access to ``myTuple`` with exactly the same duration.

Although a structure is also a value type,
in many cases the compiler can prove
that the overlapping access are safe.
This means most access to stored properties *can* overlap for stuctures.
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
    -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
    -> var maria = Player(name: "Maria", health: 5, energy: 10)
    << // oscar : Player = REPL.Player(name: "Oscar", health: 10, energy: 10)
    << // maria : Player = REPL.Player(name: "Maria", health: 5, energy: 10)
    -> balance(&oscar.health, &oscar.energy)  // Ok

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

.. docnoce:: Not quite the right wording here...
   In some places, the compiler could prove this,
   we just made the bright line that it doesn't try
   for getters and setters.
   That would be even more confusing, since you'd have a hidden cliff.

Any mutation to a property of ``oscar``
requires mutation to the entire ``Player`` structure,
so overlapping changes to its properties aren't allowed.

.. Because there's no syntax
   to mutate an enum's associated value in place,
   we can't show that overlapping mutations
   to two different associated values on the same enum
   would violate exclusivity.


.. docnote:: REVISION ENDED HERE

Exclusive Access for Reference Types
------------------------------------

Because classes are reference types,
a mutation to one of the properties of a class instance
isn't considered a mutation to the class instance as a whole.
That rule ensures that value semantics are preserved for value types,
but it doesn't apply to classes, which are reference types.
It's not unusual to have faraway code change parts of a class.

For example,
the code below uses the ``balance(_:_:)`` function
from the previous example
to level the odds for two players
by balancing their scores.

.. testcode:: memory-reference-types

    >> func balance(_ x: inout Int, _ y: inout Int) {
    >>     let sum = x + y
    >>     x = sum / 2
    >>     y = sum - x
    >> }
    -> class Game {
           var playerOneScore: Int = 5
           var playerTwoScore: Int = 10
       }
    ---
    -> let game = Game()
    << // game : Game = REPL.Game
    -> balance(&game.playerOneScore, &game.playerTwoScore)  // Ok
    >> game.playerOneScore
    << // r0 : Int = 7
    >> game.playerTwoScore
    << // r1 : Int = 8

Here, the access to ``game.playerOneScore`` and ``game.playerTwoScore`` do overlap,
and they're both write accesses.
However,
because ``Game`` is a class,
access to one of its properties
*doesn't* require access to the entire instance.
The two write accesses happen alongside one another

::

    PLACEHOLDER ART FOR SUGGESTED FIGURE

    balance(&game.playerOneScore, &game.playerTwoScore)
            --------------------  --------------------
                    |                     |                game
                    |                     |
                    |                     +------------->  p2score
                    +----------------------------------->  p1score

.. XXX Contrast the figure above
   with the "share health" figure for a struct.

.. XXX Along the lines of the above discussion for properties,
   mutating methods on classes
   have read/write access to only the properties they actually access.
   No long-term access to 'self'.

Exclusive Access for Closures
-----------------------------

.. docnote:: Either here or elsewhere...

   Closures have reference semantics and they behave as such.
   For example, if you capture x and y in the same closure,
   you can have overlapping accesses to them elsewhere.

Swift has a rule about passing more than one closure to the same function. 
This rule allows Swift to perform
all of its checks for memory exclusivity violations
in nonescaping closures at compile time,
and not have to do any checking at runtime.

.. docnote:: TR: Is there any rule around capturing that we're missing?

   If you have a nonescaping closure,
   it's considered as accessing its captures
   as an instantaneous read
   at the point where it's passed.

For the purposes of checking exclusive access to memory,
a closure is considered nonescaping
if it is one of the following:

* A closure expression that's called immediately.
* A closure expression that's passed
  as a nonescaping function argument.
* A nested function that captures a value
  which is guaranteed to never escape,
  such as an in-out parameter.

.. TR: John suggests moving the above.
   It's the same semantics for closures.
   This list is the places where we decide
   that local functions can't escape.
   The only exclusivity-specific rule here
   is the restriction on nonescaping function paramaters.

.. TR: There are a bunch of technical restrictions on escaping closures.
   Maybe that should go in the Reference under function types
   or under closure expressions?
   In the type system, a function type does have a notion
   of whether or not it is escaping.
   We don't have a spot to put non-syntax entities in the reference,
   so this kind of cross-cutting topic doesn't have a good home.

.. TR: Xref to the reference and move this whole rule there.

.. Because the captured value can't escape,
   the nested function will also be restricted from escaping,
   making it nonescaping too.

For functions that take multiple closures,
the restriction is as follows:
one nonescaping closure that's passed as a parameter
to the function
can't be used as a parameter when calling the other closure.
For example,
the following isn't allowed:

.. TR: Technically, this doesn't apply
   only when there are multiple closures.
   You can also get this by passing a closure to itself.

.. testcode:: memory-closures

    -> typealias Transformation = (Int) -> Int
    -> typealias MetaTransformation = (Transformation, Int) -> Int
    ---
    -> func myFunction(_ transformation: Transformation, _ metaTransformation: MetaTransformation) -> Int {
           return metaTransformation(transformation, 9000)
       }
    !! <REPL Input>:2:14: error: passing a non-escaping function parameter 'transformation' to a call to a non-escaping function parameter can allow re-entrant modification of a variable
    !! return metaTransformation(transformation, 9000)
    !!        ^                  ~~~~~~~~~~~~~~


In the code above,
both of the parameters to ``myFunction(_:_:)`` are closures.
Because neither one is marked ``@escaping``,
they are both nonescaping.
However, in the function body,
one nonescaping closure, ``transformation``,
is passed as the argument when calling
another nonescaping closure, ``metaTransformation``.

.. note::

   If you have code that needs to violate this rule,
   mark one of the closures as escaping.


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
