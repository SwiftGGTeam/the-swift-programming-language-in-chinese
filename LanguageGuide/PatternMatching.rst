Pattern Matching
================

:newTerm:`Patterns` express the structure of values,
rather than the values themselves.
A pattern can describe any values that follow a particular rule, like
"all numbers within the range ``1`` to ``10``",
"all tuples whose first value is ``true``, or
"all values of type ``String``".
In Swift, patterns can be used to represent
single values, tuples, and enumeration cases, as well as
type-cast values, optionals, and certain expressions.
By testing a value against a pattern
rather than against another individual value,
you can use an expression to evaluate a variety of different values.
This is known as :newTerm:`pattern matching`.

For example,
the tuples ``(1, 2, 3)`` and ``("alpha", "bravo", "charlie")``
have different values and different types,
but can both be represented by a pattern consisting of a three-element tuple.
When matching these values against a pattern,
each element of the tuple can be either ignored using the wildcard pattern (`_`),
or bound to a constant or variable name:

.. testcode:: patternMatchingIntroduction

   -> let numbers = (1, 2, 3)
   << // numbers : (Int, Int, Int) = (1, 2, 3)
   -> if case (_, let second, _) = numbers {
         print(second)
      }
   <- 2
   ---
   -> let words = ("alpha", "bravo", "charlie")
   << // words : (String, String, String) = ("alpha", "bravo", "charlie")
   -> if case (_, let second, _) = words {
         print(second)
      }
   <- bravo

In Swift, patterns are matched by the ``case`` keyword,
which can be used in
``switch`` statements,
``if`` and ``guard`` statements,
and ``for``-``in`` loops.

As described in :ref:`ControlFlow_Switch`,
a ``switch`` statement consists of one or more ``case`` statements,
which are used to determine which control flow branch should be selected:

.. syntax-outline::

   switch <#value#> {
      case <#pattern#>:
         <#statements#>
   }

An ``if`` or ``guard`` statement can use a pattern as its condition,
instead of using an expression.
In this case, the pattern is evaluated against a value of an assignment expression:

.. syntax-outline::

   if case <#pattern#> = <#value#> {
      <#statements#>
   }

   guard case <#pattern#> = <#value#> else {
      <#statements#>
   }

A ``for``-``in`` loop can specify a pattern
to iterate over only the values that match the specified pattern:

.. syntax-outline::

   for case <#pattern#> in <#values#> {
      <#statements#>
   }

Pattern matching allows you to express complex ideas
using concise, idiomatic syntax
that reduces complexity and eliminates boilerplate code.
As a result, code is not only easier to write,
but easier to read and maintain as well.

Matching Enumeration Cases with Associated Values
-------------------------------------------------

You can use patterns to match on enumeration cases and their associated values.

For example,
consider a ``Status`` enumeration,
which represents whether a train is running on time or is delayed:

.. testcode:: patternMatchingEnumeration

   -> enum Status {
          case OnTime
          case Delayed(minutes: Int)
      }
   ---
   -> class Train {
         var status = Status.OnTime
      }

When a train is running on time,
its status is ``.OnTime``,
which does not store an associated value.
However, when a train is delayed,
its status is ``.Delayed(Int)``,
which stores an associated ``Int`` value
representing the extent of the delay in minutes:

.. testcode:: patternMatchingEnumeration

   -> let goodNews = Status.OnTime
   << // goodNews : Status = REPL.Status.OnTime
   -> let badNews = Status.Delayed(minutes: 90)
   << // badNews : Status = REPL.Status.Delayed(90)

You can extend the ``Train`` class to implement a ``description`` property,
which returns a human-readable ``String`` value reporting the status of the train:

.. testcode:: patternMatchingEnumeration

   -> extension Train {
         var description: String {
             switch status {
             case .OnTime:
                 return "On time"
             case .Delayed(minutes: 1...5):
                 return "Slight delay"
             case .Delayed(_):
                 return "Delayed"
             }
         }
      }

In the example above,
the ``switch`` statement evaluates the ``status`` property of the train.
For each ``case`` expression,
the ``status`` is matched against the specified enumeration pattern.
If the train is on time,
``status`` will match on the ``.OnTime`` enumeration pattern,
which matches by simple equality.
If the train is delayed, but only by a few minutes,
``status`` will match on the ``.Delayed`` enumeration pattern
and the ``0...5`` expression pattern in the enumeration's associated value.
If the train is delayed by any other amount of time,
``status`` will match on the ``.Delayed`` enumeration pattern
and the wildcard (``_``) pattern in the enumeration's associated value,
which matches any number of minutes.

In addition to matching an enumeration case,
you can bind any associated values to a constant or variable.
For example,
the corresponding ``case`` for a slightly delayed train
can capture the associated ``minutes`` value using a value-binding pattern,
and specify the range in an additional ``where`` clause.
This capability allows the associated value to be used in the branch:

.. testcode:: patternMatchingEnumeration

   >> let status = Status.OnTime
   << // status : Status = REPL.Status.OnTime
   >> func delayDescription() -> String? {
   >> switch status {
   -> case .Delayed(let minutes) where minutes >= 1 && minutes <= 5:
   ->    return "Slight delay of \(minutes) min"
   >> default: return nil
   >> }
   >> }

You can match enumeration patterns and associated value-binding patterns
in a ``for``-``in`` loop as well.
Consider the following three ``Train`` values:

.. testcode:: patternMatchingEnumeration

   -> let wabashCannonball = Train()
   << // wabashCannonball : Train = REPL.Train
   >> print(wabashCannonball.description)
   << On time
   ---
   -> let polarExpress = Train()
      polarExpress.status = .Delayed(minutes: 4)
   << // polarExpress : Train = REPL.Train
   >> print(polarExpress.description)
   << Slight delay
   ---
   -> let darjeelingLimited = Train()
      darjeelingLimited.status = .Delayed(minutes: 20)
   << // darjeelingLimited : Train = REPL.Train
   >> print(darjeelingLimited.description)
   << Delayed
   ---
   -> let trains: [Train] = [wabashCannonball, polarExpress, darjeelingLimited]
   << // trains : [Train] = [REPL.Train, REPL.Train, REPL.Train]

You can specify a pattern for each iteration of a ``for``-``in`` loop
to evaluate only values that match the pattern:

.. testcode:: patternMatchingEnumeration

   -> var totalDelay = 0
   << // totalDelay : Int = 0
   -> for case .Delayed(let minutes) in trains.map({$0.status}) {
          totalDelay += minutes
      }
   -> print("Total delay: \(totalDelay) min")
   <- Total delay: 24 min

In the example above,
the ``status`` property value for each train
is collected using the ``map`` method
and iterated over in a ``for``-``in`` loop.
For each ``Status`` value matching the specified enumeration pattern ``.Delayed``,
the associated value is bound to the ``minutes`` constant,
which is then added to the ``runningTotal`` variable.

Matching Optionals
------------------

You can use patterns to match on values of optional types.

For example,
consider an array of type ``[Int?]``,
which contains optional integer values
corresponding to responses to a survey.
Responses from participants are represented by a score between ``1`` and ``5``.
A ``nil`` response indicates that a participant abstained from responding.

.. testcode:: patternMatchingOptional

   -> let surveyResponses: [Int?] = [nil, 4, 5, nil, 3, 5, 2, nil, 2]
   << // surveyResponses : [Int?] = [nil, Optional(4), Optional(5), nil, Optional(3), Optional(5), Optional(2), nil, Optional(2)]

To determine the average score from respondents,
you can use a ``for``-``in`` loop to iterate over all of the responses,
use a value-binding expression in a ``guard`` statement
to record only responses with a score:

.. testcode:: patternMatchingOptional

   -> var count = 0
   << // count : Int = 0
   -> var total = 0
   << // total : Int = 0
   ---
   -> for possibleScore in surveyResponses {
          guard let score = possibleScore else { continue }
          total += score
          ++count
      }
   -> let averageScore = Double(total) / Double(count)
   << // averageScore : Double = 3.5
   // 3.5

However, as discussed in the previous section,
enumeration cases can be pattern matched
in such a way that their associated values are bound to a constant or variable.
Because optionals use the ``Optional<T>`` enumeration
in their underlying implementation,
the same enumeration pattern matching approach can be used
to iterate over only non-``nil`` values in the ``surveyResponses`` array:

.. testcode:: patternMatchingOptional

   >> (total, count) = (0, 0)
   -> for case .Some(let score) in surveyResponses {
          total += score
          ++count
      }
   >> print(averageScore == Double(total) / Double(count))
   << true

Because of how important optionals are to the language,
Swift provides a shorthand syntax for matching on optional values:
the optional pattern.
You can append a question mark (``?``) to a constant or variable name
to match optionals that contain a value,
and bind that value to the constant or variable.

The following code is an easier way to express the code above,
matching on an optional pattern ``score?``
instead of an enumeration pattern:

.. testcode:: patternMatchingOptional

   >> (total, count) = (0, 0)
   -> for case let score? in surveyResponses {
          total += score
          ++count
      }
   >> print(averageScore == Double(total) / Double(count))
   << true

Matching Values in a Tuple
--------------------------

You can use patterns to match on tuples with any number of elements.

For example,
consider a ``Symbol`` enumeration that represents
the possible values on a slot machine reel in a casino:

.. testcode:: patternMatchingTuple

   -> enum Symbol {
          case 🍒, 🍊, 🍋, 🍇, 🍉, 🔔, 💰
      }

To calculate the payoff for a particular result of a spin,
test for each combination of winning possibilities
using a series of ``if`` statements and equality operators (``==``):

.. testcode:: patternMatchingTuple_Alternative

   >> enum Symbol { case 🍒, 🍊, 🍋, 🍇, 🍉, 🔔, 💰 }
   -> func payoff(firstReel: Symbol, _ secondReel: Symbol, _ thirdReel: Symbol) -> Int {
          if firstReel == .💰 && secondReel == .💰 && thirdReel == .💰 {
              return 100
          } else if firstReel == .🔔 && secondReel == .🔔 && thirdReel == .🔔 {
              return 50
          }
          // etc.
          else {
              return 0
          }
      }

Although this is a straightforward approach,
the resulting code is not particularly concise or readable.

However, by pattern matching on tuples in a ``switch`` statement,
you can visually inspect each of the winning combinations:

.. testcode:: patternMatchingTuple

   -> func payoff(firstReel: Symbol, _ secondReel: Symbol, _ thirdReel: Symbol) -> Int {
          switch (firstReel, secondReel, thirdReel) {
          case (.💰, .💰, .💰): return 100
          case (.🔔, .🔔, .🔔): return 50
          case (.🍉, .🍉, .🍉): return 30
          case (.🍇, .🍇, .🍇): return 25
          case (.🍋, .🍋, .🍋): return 20
          case (.🍊, .🍊, .🍊): return 15
          case (.🍒, .🍒, .🍒): return 10
          case (.🍒, .🍒,  _ ): return 5
          case (.🍒,  _ ,  _ ): return 2
          default:
              return 0
          }
      }

For each of the ``case`` expressions in the ``switch`` statement,
a tuple pattern is matched against the evaluated tuple of ``Symbol`` values.
When matching on a tuple value,
a tuple pattern first determines whether the tuple has the same number of elements,
and then proceeds to evaluate each tuple element
according to its corresponding subpattern.
Most of the combinations involve getting three-in-a-row of the same symbol,
however combinations starting with 🍒 or 🍒🍒 return a consolation prize.
Because the wildcard pattern ``_`` matches all ``Symbol`` values ---
including ``.🍒`` ---
the pattern ``(.🍒, .🍒,  _ )`` must precede the pattern ``(.🍒, _ ,  _ )``
in order to be evaluated:

.. TODO

   Even though most of the winning combinations are mutually exclusive ---
   that is, you cannot get three-in-a-row of 🍋
   while also getting three-in-a-row of 🍊 ---
   checking in order of highest-paying possibility ensures that
   the player always receives the best possible outcome.

.. testcode:: patternMatchingTuple

   -> let unluckySpin: (Symbol, Symbol, Symbol) = (.🍇, .🔔, .🍋)
   << // unluckySpin : (Symbol, Symbol, Symbol) = (REPL.Symbol.🍇, REPL.Symbol.🔔, REPL.Symbol.🍋)
   -> payoff(unluckySpin)
   <$ : Int = 0
   // 0
   ---
   -> let okSpin: (Symbol, Symbol, Symbol) = (.🍒, .🍒, .🍉)
   << // okSpin : (Symbol, Symbol, Symbol) = (REPL.Symbol.🍒, REPL.Symbol.🍒, REPL.Symbol.🍉)
   -> payoff(okSpin)
   <$ : Int = 5
   // 5
   ---
   -> let luckySpin: (Symbol, Symbol, Symbol) = (.💰, .💰, .💰)
   << // luckySpin : (Symbol, Symbol, Symbol) = (REPL.Symbol.💰, REPL.Symbol.💰, REPL.Symbol.💰)
   -> payoff(luckySpin)
   <$ : Int = 100
   // 100

Matching Values by Type
-----------------------

You can use patterns to match on particular types.

For example,
consider a ``Waterfowl`` protocol,
with conforming classes ``Duck`` and ``Goose``,
and a ``mixedFlock`` array that stores a collection of ducks and geese:

.. testcode:: patternMatchingType

   -> protocol Waterfowl {}
   ---
   -> class Duck: Waterfowl {
          func quack() {
              print("Quack!")
          }
      }
   ---
   -> class Goose: Waterfowl {
          func honk() {
              print("Honk!")
          }
      }
   ---
   -> let mixedFlock: [Waterfowl] = [Duck(), Duck(), Goose()]
   << // mixedFlock : [Waterfowl] = [REPL.Duck, REPL.Duck, REPL.Goose]

For each element in the heterogeneous array,
you can use a ``switch`` statement
with cases matching ``is`` type-casting patterns
to determine the element's specific class type ---
either ``Duck`` or ``Goose``:

.. testcode:: patternMatchingType

   -> for bird in mixedFlock {
          switch bird {
          case is Duck:
              print("Duck!")
          case is Goose:
              print("Goose!")
          default:
              continue
          }
      }
   <- Duck!
   <- Duck!
   <- Goose!

The ``is`` pattern matches a value if it is the type specified by the pattern.
The ``is`` pattern behaves like the ``is`` operator by performing a type cast,
but discarding the returned type.

Pattern Matching with Type-Cast
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When matching with the ``is`` type-casting pattern,
you must either use a forced downcast
or a conditional downcast with optional chaining
in order to use a value as its matched type:

.. testcode:: patternMatchingType

   >> for bird in mixedFlock {
   >> switch bird {
   -> case is Duck:
         // forced downcast
         (bird as! Duck).quack()
      case is Goose:
         // conditional downcast with optional chaining
         (bird as? Goose)?.honk()
   >> default: continue
   >> }
   >> }
   << Quack!
   << Quack!
   << Honk!

However, neither of these options are particularly well-suited,
because a forced downcast can fail and trigger a runtime error,
and a conditional downcast with optional chaining is inconvenient.
Instead, you can use the ``as`` type-casting pattern
when you're interested in working with the matched value
as a particular type.

The ``as`` pattern, like the ``is`` pattern,
matches a value if it is the type specified by the pattern.
Unlike the ``is`` pattern, however,
the matched value can be bound to a constant or variable of the returned type:

.. testcode:: patternMatchingType

   -> for bird in mixedFlock {
          switch bird {
          case let duck as Duck:
              duck.quack()
          case let goose as Goose:
              goose.honk()
          default:
              continue
          }
      }
   <- Quack!
   <- Quack!
   <- Honk!

In the example above,
each case in the ``switch`` statement matches on an ``as`` pattern,
which binds the evaluated ``bird`` value to a local constant
that is used in the corresponding branch statements.

Pattern Matching Over a Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can iterate over only elements of a particular type in a sequence
by matching an ``as`` pattern in a ``for``-``in`` loop:

.. testcode:: patternMatchingType

   -> for case let duck as Duck in mixedFlock {
          duck.quack()
      }
   <- Quack!
   <- Quack!

In the example above,
each value in ``mixedFlock`` is matched against
the pattern ``case let duck as Duck``.
If the value is of type ``Duck``,
then that value is bound to the ``duck`` constant,
which is then used in the body of the loop.

Matching Values in a Range
--------------------------

In addition to matching a pattern against specific value by equality,
Swift also supports a more general form of expression pattern matching.
For example, :ref:`ControlFlow_RangeMatching` describes how
the  ``...`` and ``..<`` range operators produce ranges
that can be used as expressions in ``switch`` statement
to check for the inclusion of values in that range.

Consider the following ``switch`` statement,
which prints the letter grade corresponding to a score out of 100:

.. testcode:: patternMatchingRange

   -> let grade = 87
   << // grade : Int = 87
   -> switch grade {
         case 90...100:
            print("A - Excellent")
         case 80..<90:
            print("B - Satisfactory")
         case 70..<80:
            print("C - Mediocre")
         case 60..<70:
            print("D - Insufficient")
         default:
            print("F - Failure")
      }
   <- B - Satisfactory

For each ``case`` expression,
the specified range is tested for inclusion of the ``grade`` value
using the contains (``~=``) operator.
In the example above, the ``grade`` value of ``87``
is contained by the range ``80..<90``,
which corresponds to a "B" letter grade.

.. TODO

   .. testcode:: patternMatchingRange_Alternative

      >> let grade = 87
      << // grade : Int = 87
      -> if grade > 90 {
            print("A - Excellent")
         } else if grade > 80 {
            print("B - Excellent")
         } else if grade > 70 {
            print("C - Mediocre")
         } else if grade > 60 {
            print("D - Insufficient")
         } else {
            print("F - Failure")
         }
      <- B - Satisfactory

You can also pattern match on a range in a ``for``-``in`` loop.
For example,
given a dictionary with student names as keys
and their corresponding grades as values,
a ``for``-``in`` loop can pattern match on a range
to iterate over only a subset of keys:

.. testcode:: patternMatchingRange

   -> var grades: [String: Int] = [
         "Alexandra": 92,
         "Buddy": 87,
         "Christy": 76,
         "Duncan": 68
      ]
   << // grades : [String : Int] = ["Alexandra": 92, "Buddy": 87, "Christy": 76, "Duncan": 68]
   ---
   -> for case (let passingStudent, 75...100) in grades {
          print(passingStudent)
      }
   <- Alexandra
   <- Buddy
   <- Christy

For each key/value pair in the dictionary,
the tuple pattern is evaluated.
If the iterated value is contained by the range ``75...100``,
then the key is bound to the ``passingStudent`` constant
within the body of the loop.

.. note::

   Intervals are matched using the expression pattern.
   Any type can be matched using the expression pattern
   if the type provides an implementation of the contains (``~=``) operator.
   By default, the ``~=`` operator compares
   two values of the same type using the ``==`` operator.

   For more information, see :ref:`Patterns_ExpressionPattern`.
