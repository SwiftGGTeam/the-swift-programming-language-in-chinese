Expressions
===========

In Swift, there are four kinds of expressions:
prefix expressions, binary expressions, primary expressions, and postfix expressions.
Evaluating an expression returns a value,
causes a side effect, or both.

Prefix and binary expressions let you
apply operators to smaller expressions.
Primary expressions are conceptually the simplest kind of expression,
and they provide a way to access values.
Postfix expressions,
like prefix and binary expressions,
let you build up more complex expressions
using postfixes such as function calls and member access.
Each kind of expression is described in detail
in the sections below.

.. syntax-grammar::

    Grammar of an expression

    expression --> try-operator-OPT prefix-expression binary-expressions-OPT
    expression-list --> expression | expression ``,`` expression-list


.. _Expressions_PrefixExpressions:

Prefix Expressions
------------------

:newTerm:`Prefix expressions` combine
an optional prefix operator with an expression.
Prefix operators take one argument,
the expression that follows them.

For information about the behavior of these operators,
see :doc:`../LanguageGuide/BasicOperators` and :doc:`../LanguageGuide/AdvancedOperators`.

For information about the operators provided by the Swift standard library,
see `Operator Declarations <https://developer.apple.com/documentation/swift/operator_declarations>`_.

In addition to the standard library operators,
you use ``&`` immediately before the name of a variable that's being passed
as an in-out argument to a function call expression.
For more information and to see an example,
see :ref:`Functions_InOutParameters`.

.. TODO: Need to a brief write up on the in-out-expression.

.. syntax-grammar::

    Grammar of a prefix expression

    prefix-expression --> prefix-operator-OPT postfix-expression
    prefix-expression --> in-out-expression
    in-out-expression --> ``&`` identifier


.. _Expressions_TryExpression:

Try Operator
~~~~~~~~~~~~

A :newTerm:`try expression` consists of the ``try`` operator
followed by an expression that can throw an error.
It has the following form:

.. syntax-outline::

   try <#expression#>

An :newTerm:`optional-try expression` consists of the ``try?`` operator
followed by an expression that can throw an error.
It has the following form:

.. syntax-outline::

   try? <#expression#>

If the *expression* does not throw an error,
the value of the optional-try expression
is an optional containing the value of the *expression*.
Otherwise, the value of the optional-try expression is ``nil``.

A :newTerm:`forced-try expression` consists of the ``try!`` operator
followed by an expression that can throw an error.
It has the following form:

.. syntax-outline::

   try! <#expression#>

If the *expression* throws an error,
a runtime error is produced.

When the expression on the left-hand side of a binary operator
is marked with ``try``, ``try?``, or ``try!``,
that operator applies to the whole binary expression.
That said, you can use parentheses to be explicit about the scope of the operator's application.

.. testcode:: placement-of-try

    >> func someThrowingFunction() throws -> Int { return 10 }
    >> func anotherThrowingFunction() throws -> Int { return 5 }
    >> var sum = 0
    << // sum : Int = 0
    -> sum = try someThrowingFunction() + anotherThrowingFunction()   // try applies to both function calls
    -> sum = try (someThrowingFunction() + anotherThrowingFunction()) // try applies to both function calls
    -> sum = (try someThrowingFunction()) + anotherThrowingFunction() // Error: try applies only to the first function call
    !! <REPL Input>:1:38: error: call can throw but is not marked with 'try'
    !! sum = (try someThrowingFunction()) + anotherThrowingFunction() // Error: try applies only to the first function call
    !!                                      ^~~~~~~~~~~~~~~~~~~~~~~~~
    !! <REPL Input>:1:38: note: did you mean to use 'try'?
    !! sum = (try someThrowingFunction()) + anotherThrowingFunction() // Error: try applies only to the first function call
    !!                                      ^
    !!                                      try
    !! <REPL Input>:1:38: note: did you mean to handle error as optional value?
    !! sum = (try someThrowingFunction()) + anotherThrowingFunction() // Error: try applies only to the first function call
    !!                                      ^
    !!                                      try?
    !! <REPL Input>:1:38: note: did you mean to disable error propagation?
    !! sum = (try someThrowingFunction()) + anotherThrowingFunction() // Error: try applies only to the first function call
    !!                                      ^
    !!                                      try!

A ``try`` expression can't appear on the right-hand side of a binary operator,
unless the binary operator is the assignment operator
or the ``try`` expression is enclosed in parentheses.

.. assertion:: try-on-right

    >> func someThrowingFunction() throws -> Int { return 10 }
    >> var sum = 0
    << // sum : Int = 0
    -> sum = 7 + try someThrowingFunction() // Error
    !! <REPL Input>:1:11: error: 'try' cannot appear to the right of a non-assignment operator
    !! sum = 7 + try someThrowingFunction() // Error
    !!           ^
    -> sum = 7 + (try someThrowingFunction()) // OK

For more information and to see examples of how to use ``try``, ``try?``, and ``try!``,
see :doc:`../LanguageGuide/ErrorHandling`.

.. syntax-grammar::

    Grammar of a try expression

    try-operator --> ``try`` | ``try`` ``?`` | ``try`` ``!``


.. _Expressions_BinaryExpressions:

Binary Expressions
------------------

:newTerm:`Binary expressions` combine
an infix binary operator with the expression that it takes
as its left-hand and right-hand arguments.
It has the following form:

.. syntax-outline::

   <#left-hand argument#> <#operator#> <#right-hand argument#>

For information about the behavior of these operators,
see :doc:`../LanguageGuide/BasicOperators` and :doc:`../LanguageGuide/AdvancedOperators`.

For information about the operators provided by the Swift standard library,
see `Operator Declarations <https://developer.apple.com/documentation/swift/operator_declarations>`_.

.. You have essentially expression sequences here, and within it are
   parts of the expressions.  We're calling them "expressions" even
   though they aren't what we ordinarily think of as expressions.  We
   have this two-phase thing where we do the expression sequence parsing
   which gives a rough parse tree.  Then after name binding we know
   operator precedence and we do a second phase of parsing that builds
   something that's a more traditional tree.

.. You're going to care about this if you're adding new operators --
   it's not a high priority.  We could probably loosely describe this
   process by saying that the parser handles it as a flat list and then
   applies the operator precedence to make a more typical parse tree.
   At some point, we will probably have to document the syntax around
   creating operators.  This may need to be discussed in the Language Guide
   in respect to the spacing rules -- ``x + y * z`` is different from
   ``x + y* z``.

.. note::

    At parse time,
    an expression made up of binary operators is represented
    as a flat list.
    This list is transformed into a tree
    by applying operator precedence.
    For example, the expression ``2 + 3 * 5``
    is initially understood as a flat list of five items,
    ``2``, ``+``, ``3``, ``*``, and ``5``.
    This process transforms it into the tree (2 + (3 * 5)).

.. syntax-grammar::

    Grammar of a binary expression

    binary-expression --> binary-operator prefix-expression
    binary-expression --> assignment-operator try-operator-OPT prefix-expression
    binary-expression --> conditional-operator try-operator-OPT prefix-expression
    binary-expression --> type-casting-operator
    binary-expressions --> binary-expression binary-expressions-OPT


.. _Expressions_AssignmentOperator:

Assignment Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`assignment operator` sets a new value
for a given expression.
It has the following form:

.. syntax-outline::

   <#expression#> = <#value#>

The value of the *expression*
is set to the value obtained by evaluating the *value*.
If the *expression* is a tuple,
the *value* must be a tuple
with the same number of elements.
(Nested tuples are allowed.)
Assignment is performed from each part of the *value*
to the corresponding part of the *expression*.
For example:

.. testcode:: assignmentOperator

    >> var (a, _, (b, c)) = ("test", 9.45, (12, 3))
    << // (a, _, (b, c)) : (String, Double, (Int, Int)) = ("test", 9.45, (12, 3))
    -> (a, _, (b, c)) = ("test", 9.45, (12, 3))
    /> a is \"\(a)\", b is \(b), c is \(c), and 9.45 is ignored
    </ a is "test", b is 12, c is 3, and 9.45 is ignored

The assignment operator does not return any value.

.. syntax-grammar::

    Grammar of an assignment operator

    assignment-operator --> ``=``


.. _Expressions_TernaryConditionalOperator:

Ternary Conditional Operator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The :newTerm:`ternary conditional operator` evaluates to one of two given values
based on the value of a condition.
It has the following form:

.. syntax-outline::

   <#condition#> ? <#expression used if true#> : <#expression used if false#>

If the *condition* evaluates to ``true``,
the conditional operator evaluates the first expression
and returns its value.
Otherwise, it evaluates the second expression
and returns its value.
The unused expression is not evaluated.

For an example that uses the ternary conditional operator,
see :ref:`BasicOperators_TernaryConditionalOperator`.

.. syntax-grammar::

    Grammar of a conditional operator

    conditional-operator --> ``?`` expression ``:``


.. _Expressions_Type-CastingOperators:

Type-Casting Operators
~~~~~~~~~~~~~~~~~~~~~~~

There are four type-casting operators:
the ``is`` operator,
the ``as`` operator,
the ``as?`` operator,
and the ``as!`` operator.

They have the following form:

.. syntax-outline::

    <#expression#> is <#type#>
    <#expression#> as <#type#>
    <#expression#> as? <#type#>
    <#expression#> as! <#type#>

The ``is`` operator checks at runtime whether the *expression*
can be cast to the specified *type*.
It returns ``true`` if the *expression* can be cast to the specified *type*;
otherwise, it returns ``false``.

.. assertion:: triviallyTrueIsAndAs

    -> "hello" is String
    -> "hello" is Int
    <$ : Bool = true
    <$ : Bool = false
    !! <REPL Input>:1:9: warning: 'is' test is always true
    !! "hello" is String
    !! ^
    !! <REPL Input>:1:9: warning: cast from 'String' to unrelated type 'Int' always fails
    !! "hello" is Int
    !! ~~~~~~~ ^  ~~~

.. assertion:: is-operator-tautology

   -> class Base {}
   -> class Subclass: Base {}
   -> var s = Subclass()
   << // s : Subclass = REPL.Subclass
   -> var b = Base()
   << // b : Base = REPL.Base
   ---
   -> s is Base
   !! <REPL Input>:1:3: warning: 'is' test is always true
   !! s is Base
   !!   ^
   << // r0 : Bool = true

The ``as`` operator performs a cast
when it is known at compile time
that the cast always succeeds,
such as upcasting or bridging.
Upcasting lets you use an expression as an instance of its type's supertype,
without using an intermediate variable.
The following approaches are equivalent:

.. testcode:: explicit-type-with-as-operator

   -> func f(_ any: Any) { print("Function for Any") }
   -> func f(_ int: Int) { print("Function for Int") }
   -> let x = 10
   << // x : Int = 10
   -> f(x)
   <- Function for Int
   ---
   -> let y: Any = x
   << // y : Any = 10
   -> f(y)
   <- Function for Any
   ---
   -> f(x as Any)
   <- Function for Any

Bridging lets you use an expression of
a Swift standard library type such as ``String``
as its corresponding Foundation type such as ``NSString``
without needing to create a new instance.
For more information on bridging,
see `Working with Foundation Types <https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types>`_.

The ``as?`` operator
performs a conditional cast of the *expression*
to the specified *type*.
The ``as?`` operator returns an optional of the specified *type*.
At runtime, if the cast succeeds,
the value of *expression* is wrapped in an optional and returned;
otherwise, the value returned is ``nil``.
If casting to the specified *type*
is guaranteed to fail or is guaranteed to succeed,
a compile-time error is raised.

The ``as!`` operator performs a forced cast of the *expression* to the specified *type*.
The ``as!`` operator returns a value of the specified *type*, not an optional type.
If the cast fails, a runtime error is raised.
The behavior of ``x as! T`` is the same as the behavior of ``(x as? T)!``.

For more information about type casting
and to see examples that use the type-casting operators,
see :doc:`../LanguageGuide/TypeCasting`.

.. syntax-grammar::

    Grammar of a type-casting operator

    type-casting-operator --> ``is`` type
    type-casting-operator --> ``as`` type
    type-casting-operator --> ``as`` ``?`` type
    type-casting-operator --> ``as`` ``!`` type


.. _Expressions_PrimaryExpressions:

Primary Expressions
-------------------

:newTerm:`Primary expressions`
are the most basic kind of expression.
They can be used as expressions on their own,
and they can be combined with other tokens
to make prefix expressions, binary expressions, and postfix expressions.

.. syntax-grammar::

    Grammar of a primary expression

    primary-expression --> identifier generic-argument-clause-OPT
    primary-expression --> literal-expression
    primary-expression --> self-expression
    primary-expression --> superclass-expression
    primary-expression --> closure-expression
    primary-expression --> parenthesized-expression
    primary-expression --> tuple-expression
    primary-expression --> implicit-member-expression
    primary-expression --> wildcard-expression
    primary-expression --> key-path-expression
    primary-expression --> selector-expression
    primary-expression --> key-path-string-expression

.. NOTE: One reason for breaking primary expressions out of postfix
   expressions is for exposition -- it makes it easier to organize the
   prose surrounding the production rules.

.. TR: Is a generic argument clause allowed
   after an identifier in expression context?
   It seems like that should only occur when an identifier
   is a *type* identifier.


.. _Expressions_LiteralExpression:

Literal Expression
~~~~~~~~~~~~~~~~~~

A :newTerm:`literal expression` consists of
either an ordinary literal (such as a string or a number),
an array or dictionary literal,
a playground literal,
or one of the following special literals:

==============  ====================  ==========================================
Literal         Type                  Value
==============  ====================  ==========================================
``#file``       ``String``            The name of the file in which it appears.
``#line``       ``Int``               The line number on which it appears.
``#column``     ``Int``               The column number in which it begins.
``#function``   ``String``            The name of the declaration in which it appears.
``#dsohandle``  ``UnsafeRawPointer``  The DSO (dynamic shared object) handle in use where it appears.
==============  ====================  ==========================================

Inside a function,
the value of ``#function`` is the name of that function,
inside a method it is the name of that method,
inside a property getter or setter it is the name of that property,
inside special members like ``init`` or ``subscript``
it is the name of that keyword,
and at the top level of a file it is the name of the current module.

When used as the default value of a function or method parameter,
the special literal's value is determined
when the default value expression is evaluated at the call site.

.. See also "Special Kinds of Parameters" in "Declarations"
   where the general rule is defined.

.. testcode:: special-literal-evaluated-at-call-site

    -> func logFunctionName(string: String = #function) {
           print(string)
       }
    -> func myFunction() {
          logFunctionName() // Prints "myFunction()".
       }
    >> myFunction()
    << myFunction()
    >> func noNamedArgs(_ i: Int, _ j: Int) { logFunctionName() }
    >> noNamedArgs(1, 2)
    << noNamedArgs(_:_:)
    >> func oneNamedArg(_ i: Int, withJay j: Int) { logFunctionName() }
    >> oneNamedArg(1, withJay: 2)
    << oneNamedArg(_:withJay:)
    >> func namedArgs(i: Int, withJay j: Int) { logFunctionName() }
    >> namedArgs(i: 1, withJay: 2)
    << namedArgs(i:withJay:)

An :newTerm:`array literal` is
an ordered collection of values.
It has the following form:

.. syntax-outline::

   [<#value 1#>, <#value 2#>, <#...#>]

The last expression in the array can be followed by an optional comma.
The value of an array literal has type ``[T]``,
where ``T`` is the type of the expressions inside it.
If there are expressions of multiple types,
``T`` is their closest common supertype.
Empty array literals are written using an empty
pair of square brackets and can be used to create an empty array of a specified type.

.. testcode:: array-literal-brackets

    -> var emptyArray: [Double] = []
    << // emptyArray : [Double] = []

.. Note: The normal style for the above would be
       var emptyArray = [Double]()
   but we're explicitly demonstrating the [] literal syntax here.

A :newTerm:`dictionary literal` is
an unordered collection of key-value pairs.
It has the following form:

.. syntax-outline::

   [<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#...#>]

The last expression in the dictionary can be followed by an optional comma.
The value of a dictionary literal has type ``[Key: Value]``,
where ``Key`` is the type of its key expressions
and ``Value`` is the type of its value expressions.
If there are expressions of multiple types,
``Key`` and ``Value`` are the closest common supertype
for their respective values.
An empty dictionary literal is written as
a colon inside a pair of brackets (``[:]``)
to distinguish it from an empty array literal.
You can use an empty dictionary literal to create an empty dictionary literal
of specified key and value types.

.. testcode:: dictionary-literal-brackets

    -> var emptyDictionary: [String: Double] = [:]
    << // emptyDictionary : [String : Double] = [:]

A :newTerm:`playground literal`
is used by Xcode to create an interactive representation
of a color, file, or image within the program editor.
Playground literals in plain text outside of Xcode
are represented using a special literal syntax.

For information on using playground literals in Xcode,
see `Add a color, file, or image literal <https://help.apple.com/xcode/mac/current/#/dev4c60242fc>`_
in Xcode Help.

.. syntax-grammar::

    Grammar of a literal expression

    literal-expression --> literal
    literal-expression --> array-literal | dictionary-literal | playground-literal
    literal-expression --> ``#file`` | ``#line`` | ``#column`` | ``#function`` | ``#dsohandle``

    array-literal --> ``[`` array-literal-items-OPT ``]``
    array-literal-items --> array-literal-item ``,``-OPT | array-literal-item ``,`` array-literal-items
    array-literal-item --> expression

    dictionary-literal --> ``[`` dictionary-literal-items ``]`` | ``[`` ``:`` ``]``
    dictionary-literal-items --> dictionary-literal-item ``,``-OPT | dictionary-literal-item ``,`` dictionary-literal-items
    dictionary-literal-item --> expression ``:`` expression

    playground-literal --> ``#colorLiteral`` ``(`` ``red`` ``:`` expression ``,`` ``green`` ``:`` expression ``,`` ``blue`` ``:`` expression ``,`` ``alpha`` ``:`` expression ``)``
    playground-literal --> ``#fileLiteral`` ``(`` ``resourceName`` ``:`` expression ``)``
    playground-literal --> ``#imageLiteral`` ``(`` ``resourceName`` ``:`` expression ``)``


.. _Expressions_SelfExpression:

Self Expression
~~~~~~~~~~~~~~~

The ``self`` expression is an explicit reference to the current type
or instance of the type in which it occurs.
It has the following forms:

.. syntax-outline::

    self
    self.<#member name#>
    self[<#subscript index#>]
    self(<#initializer arguments#>)
    self.init(<#initializer arguments#>)

.. TODO: Come back and explain the second to last form (i.e., self(arg: value)).

In an initializer, subscript, or instance method, ``self`` refers to the current
instance of the type in which it occurs. In a type method,
``self`` refers to the current type in which it occurs.

The ``self`` expression is used to specify scope when accessing members,
providing disambiguation when there is
another variable of the same name in scope,
such as a function parameter.
For example:

.. testcode:: self-expression

    -> class SomeClass {
           var greeting: String
           init(greeting: String) {
               self.greeting = greeting
           }
       }

In a mutating method of a value type,
you can assign a new instance of that value type to ``self``.
For example:

.. testcode:: self-expression

    -> struct Point {
          var x = 0.0, y = 0.0
          mutating func moveBy(x deltaX: Double, y deltaY: Double) {
             self = Point(x: x + deltaX, y: y + deltaY)
          }
       }
    >> var somePoint = Point(x: 1.0, y: 1.0)
    << // somePoint : Point = REPL.Point(x: 1.0, y: 1.0)
    >> somePoint.moveBy(x: 2.0, y: 3.0)
    >> print("The point is now at (\(somePoint.x), \(somePoint.y))")
    << The point is now at (3.0, 4.0)

.. iBooks Store screenshot begins here.

.. syntax-grammar::

    Grammar of a self expression

    self-expression -->  ``self`` | self-method-expression | self-subscript-expression | self-initializer-expression

    self-method-expression --> ``self`` ``.`` identifier
    self-subscript-expression --> ``self`` ``[`` function-call-argument-list ``]``
    self-initializer-expression --> ``self`` ``.`` ``init``


.. _Expressions_SuperclassExpression:

Superclass Expression
~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`superclass expression` lets a class
interact with its superclass.
It has one of the following forms:

.. syntax-outline::

    super.<#member name#>
    super[<#subscript index#>]
    super.init(<#initializer arguments#>)

The first form is used to access a member of the superclass.
The second form is used to access the superclass's subscript implementation.
The third form is used to access an initializer of the superclass.

Subclasses can use a superclass expression
in their implementation of members, subscripting, and initializers
to make use of the implementation in their superclass.

.. syntax-grammar::

    Grammar of a superclass expression

    superclass-expression --> superclass-method-expression | superclass-subscript-expression | superclass-initializer-expression

    superclass-method-expression --> ``super`` ``.`` identifier
    superclass-subscript-expression --> ``super`` ``[`` function-call-argument-list ``]``
    superclass-initializer-expression --> ``super`` ``.`` ``init``


.. _Expressions_ClosureExpression:

Closure Expression
~~~~~~~~~~~~~~~~~~

A :newTerm:`closure expression` creates a closure,
also known as a *lambda* or an *anonymous function*
in other programming languages.
Like a function declaration,
a closure contains statements,
and it captures constants and variables from its enclosing scope.
It has the following form:

.. syntax-outline::

   { (<#parameters#>) -> <#return type#> in
      <#statements#>
   }

The *parameters* have the same form
as the parameters in a function declaration,
as described in :ref:`Declarations_FunctionDeclaration`.

There are several special forms
that allow closures to be written more concisely:

.. iBooks Store screenshot ends here.

* A closure can omit the types
  of its parameters, its return type, or both.
  If you omit the parameter names and both types,
  omit the ``in`` keyword before the statements.
  If the omitted types can't be inferred,
  a compile-time error is raised.

* A closure may omit names for its parameters.
  Its parameters are then implicitly named
  ``$`` followed by their position:
  ``$0``, ``$1``, ``$2``, and so on.

* A closure that consists of only a single expression
  is understood to return the value of that expression.
  The contents of this expression are also considered
  when performing type inference on the surrounding expression.

The following closure expressions are equivalent:

.. testcode:: closure-expression-forms

    >> func myFunction(f: (Int, Int) -> Int) {}
    -> myFunction { (x: Int, y: Int) -> Int in
           return x + y
       }
    ---
    -> myFunction { x, y in
           return x + y
       }
    ---
    -> myFunction { return $0 + $1 }
    ---
    -> myFunction { $0 + $1 }

For information about passing a closure as an argument to a function,
see :ref:`Expressions_FunctionCallExpression`.

Closure expressions can be used
without being stored in a variable or constant,
such as when you immediately use a closure as part of a function call.
The closure expressions passed to ``myFunction`` in code above are
examples of this kind of immediate use.
As a result,
whether a closure expression is escaping or nonescaping depends
on the surrounding context of the expression.
A closure expression is nonescaping
if it is called immediately
or passed as a nonescaping function argument.
Otherwise, the closure expression is escaping.

For more information about escaping closures, see :ref:`Closures_Noescape`.

.. _Expressions_CaptureLists:

Capture Lists
+++++++++++++

By default, a closure expression captures
constants and variables from its surrounding scope
with strong references to those values.
You can use a :newTerm:`capture list` to explicitly control
how values are captured in a closure.

A capture list is written as a comma-separated list of expressions
surrounded by square brackets,
before the list of parameters.
If you use a capture list, you must also use the ``in`` keyword,
even if you omit the parameter names, parameter types, and return type.

The entries in the capture list are initialized
when the closure is created.
For each entry in the capture list,
a constant is initialized
to the value of the constant or variable that has the same name
in the surrounding scope.
For example in the code below,
``a`` is included in the capture list but ``b`` is not,
which gives them different behavior.

.. testcode:: capture-list-value-semantics

    -> var a = 0
    << // a : Int = 0
    -> var b = 0
    << // b : Int = 0
    -> let closure = { [a] in
        print(a, b)
    }
    << // closure : () -> () = (Function)
    ---
    -> a = 10
    -> b = 10
    -> closure()
    <- 0 10

There are two different things named ``a``,
the variable in the surrounding scope
and the constant in the closure's scope,
but only one variable named ``b``.
The ``a`` in the inner scope is initialized
with the value of the ``a`` in the outer scope
when the closure is created,
but their values are not connected in any special way.
This means that a change to the value of ``a`` in the outer scope
does not affect the value of ``a`` in the inner scope,
nor does a change to ``a`` inside the closure
affect the value of ``a`` outside the closure.
In contrast, there is only one variable named ``b`` ---
the ``b`` in the outer scope ---
so changes from inside or outside the closure are visible in both places.

.. [Contributor 6004] also describes the distinction as
   "capturing the variable, not the value"
   but he notes that we don't have a rigorous definition of
   capturing a variable in Swift
   (unlike some other languages)
   so that description's not likely to be very helpful for developers.

This distinction is not visible
when the captured variable's type has reference semantics.
For example,
there are two things named ``x`` in the code below,
a variable in the outer scope and a constant in the inner scope,
but they both refer to the same object
because of reference semantics.

.. testcode:: capture-list-reference-semantics

    -> class SimpleClass {
           var value: Int = 0
       }
    -> var x = SimpleClass()
    << // x : SimpleClass = REPL.SimpleClass
    -> var y = SimpleClass()
    << // y : SimpleClass = REPL.SimpleClass
    -> let closure = { [x] in
           print(x.value, y.value)
       }
    << // closure : () -> () = (Function)
    ---
    -> x.value = 10
    -> y.value = 10
    -> closure()
    <- 10 10

.. assertion:: capture-list-with-commas

    -> var x = 100
    << // x : Int = 100
    -> var y = 7
    << // y : Int = 7
    -> var f: () -> Int = { [x, y] in x+y }
    << // f : () -> Int = (Function)
    >> f()
    << // r0 : Int = 107

..  It's not an error to capture things that aren't included in the capture list,
    although maybe it should be.  See also rdar://17024367.

.. assertion:: capture-list-is-not-exhaustive

    -> var x = 100
       var y = 7
       var f: () -> Int = { [x] in x }
       var g: () -> Int = { [x] in x+y }
    << // x : Int = 100
    << // y : Int = 7
    << // f : () -> Int = (Function)
    << // g : () -> Int = (Function)
    ---
    -> f()
    << // r0 : Int = 100
    -> g()
    << // r1 : Int = 107

If the type of the expression's value is a class,
you can mark the expression in a capture list
with ``weak`` or ``unowned`` to capture a weak or unowned reference
to the expression's value.

.. testcode:: closure-expression-weak

    >> func myFunction(f: () -> Void) { f() }
    >> class C {
    >> let title = "Title"
    >> func method() {
    -> myFunction { print(self.title) }                    // implicit strong capture
    -> myFunction { [self] in print(self.title) }          // explicit strong capture
    -> myFunction { [weak self] in print(self!.title) }    // weak capture
    -> myFunction { [unowned self] in print(self.title) }  // unowned capture
    >> } }
    >> C().method()
    << Title
    << Title
    << Title
    << Title

You can also bind an arbitrary expression
to a named value in a capture list.
The expression is evaluated when the closure is created,
and the value is captured with the specified strength.
For example:

.. testcode:: closure-expression-capture

    >> func myFunction(f: () -> Void) { f() }
    >> class P { let title = "Title" }
    >> class C {
    >> let parent = P()
    >> func method() {
    // Weak capture of "self.parent" as "parent"
    -> myFunction { [weak parent = self.parent] in print(parent!.title) }
    >> } }
    >> C().method()
    << Title

For more information and examples of closure expressions,
see :ref:`Closures_ClosureExpressions`.
For more information and examples of capture lists,
see :ref:`AutomaticReferenceCounting_ResolvingStrongReferenceCyclesForClosures`.

.. syntax-grammar::

    Grammar of a closure expression

    closure-expression --> ``{`` closure-signature-OPT statements-OPT ``}``

    closure-signature --> capture-list-OPT closure-parameter-clause ``throws``-OPT function-result-OPT ``in``
    closure-signature --> capture-list ``in``

    closure-parameter-clause --> ``(`` ``)`` | ``(`` closure-parameter-list ``)`` | identifier-list
    closure-parameter-list --> closure-parameter | closure-parameter ``,`` closure-parameter-list
    closure-parameter --> closure-parameter-name type-annotation-OPT
    closure-parameter --> closure-parameter-name type-annotation ``...``
    closure-parameter-name --> identifier

    capture-list --> ``[`` capture-list-items ``]``
    capture-list-items --> capture-list-item | capture-list-item ``,`` capture-list-items
    capture-list-item --> capture-specifier-OPT expression
    capture-specifier --> ``weak`` | ``unowned`` | ``unowned(safe)`` | ``unowned(unsafe)``

.. _Expressions_ImplicitMemberExpression:

Implicit Member Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`implicit member expression`
is an abbreviated way to access a member of a type,
such as an enumeration case or a type method,
in a context where type inference
can determine the implied type.
It has the following form:

.. syntax-outline::

   .<#member name#>

For example:

.. testcode:: implicitMemberEnum

    >> enum MyEnumeration { case someValue, anotherValue }
    -> var x = MyEnumeration.someValue
    << // x : MyEnumeration = REPL.MyEnumeration.someValue
    -> x = .anotherValue

.. syntax-grammar::

    Grammar of a implicit member expression

    implicit-member-expression --> ``.`` identifier


.. _Expressions_ParenthesizedExpression:

Parenthesized Expression
~~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`parenthesized expression` consists of
an expression surrounded by parentheses.
You can use parentheses to specify the precedence of operations
by explicitly grouping expressions.
Grouping parentheses don't change an expression's type ---
for example, the type of ``(1)`` is simply ``Int``.

.. See "Tuple Expression" below for langref grammar.

.. syntax-grammar::

    Grammar of a parenthesized expression

    parenthesized-expression --> ``(`` expression ``)``


.. _Expressions_TupleExpression:

Tuple Expression
~~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`tuple expression` consists of
a comma-separated list of expressions surrounded by parentheses.
Each expression can have an optional identifier before it,
separated by a colon (``:``).
It has the following form:

.. syntax-outline::

   (<#identifier 1#>: <#expression 1#>, <#identifier 2#>: <#expression 2#>, <#...#>)

Each identifier in a tuple expression must be unique
within the scope of the tuple expression.
In a nested tuple expression,
identifiers at the same level of nesting must be unique.
For example,
``(a: 10, a: 20)`` is invalid
because the label ``a`` appears twice at the same level.
However, ``(a: 10, b: (a: 1, x: 2))`` is valid ---
although ``a`` appears twice,
it appears once in the outer tuple and once in the inner tuple.

.. assertion:: tuple-labels-must-be-unique
    :compile: true

    >> let bad = (a: 10, a: 20)
    >> let good = (a: 10, b: (a: 1, x: 2))
    !!  /tmp/swifttest.swift:1:11: error: cannot create a tuple with a duplicate element label
    !! let bad = (a: 10, a: 20)
    !! ^

A tuple expression can contain zero expressions,
or it can contain two or more expressions.
A single expression inside parentheses is a parenthesized expression.

.. note::

   Both an empty tuple expression and an empty tuple type
   are written ``()`` in Swift.
   Because ``Void`` is a type alias for ``()``,
   you can use it to write an empty tuple type.
   However, like all type aliases, ``Void`` is always a type ---
   you can't use it to write an empty tuple expression.

.. syntax-grammar::

    Grammar of a tuple expression

    tuple-expression --> ``(`` ``)`` | ``(`` tuple-element ``,`` tuple-element-list ``)``
    tuple-element-list --> tuple-element | tuple-element ``,`` tuple-element-list
    tuple-element --> expression | identifier ``:`` expression


.. _Expressions_WildcardExpression:

Wildcard Expression
~~~~~~~~~~~~~~~~~~~

A :newTerm:`wildcard expression`
is used to explicitly ignore a value during an assignment.
For example, in the following assignment
10 is assigned to ``x`` and 20 is ignored:

.. testcode:: wildcardTuple

    >> var (x, _) = (10, 20)
    << // (x, _) : (Int, Int) = (10, 20)
    -> (x, _) = (10, 20)
    -> // x is 10, and 20 is ignored

.. syntax-grammar::

    Grammar of a wildcard expression

    wildcard-expression --> ``_``


.. _Expression_TypedKeyPathExpression:

Key-Path Expression
~~~~~~~~~~~~~~~~~~~

A :newTerm:`key-path expression`
refers to a property or subscript of a type.
You use key-path expressions
in dynamic programming tasks,
such as key-value observing.
They have the following form:

.. syntax-outline::

   \<#type name#>.<#path#>

The *type name* is the name of a concrete type,
including any generic parameters,
such as ``String``, ``[Int]``, or ``Set<Int>``.

The *path* consists of
property names, subscripts, optional-chaining expressions,
and forced unwrapping expressions.
Each of these key-path components
can be repeated as many times as needed,
in any order.

At compile time, a key-path expression
is replaced by an instance
of the `KeyPath <//apple_ref/swift/cl/s:s7KeyPathC>`_ class.

To access a value using a key path,
pass the key path to the ``subscript(keyPath:)`` subscript,
which is available on all types.
For example:

.. The subscript name subscript(keyPath:) above is a little odd,
   but it matches what would be displayed on the web.
   There isn't actually an extension on Any that implements this subscript;
   it's a special case in the compiler.

.. testcode:: keypath-expression
   :compile: true

   -> struct SomeStructure {
          var someValue: Int
      }
   ---
   -> let s = SomeStructure(someValue: 12)
   -> let pathToProperty = \SomeStructure.someValue
   ---
   -> let value = s[keyPath: pathToProperty]
   /> value is \(value)
   </ value is 12

The *type name* can be omitted
in contexts where type inference
can determine the implied type.
The following code uses ``\.someProperty``
instead of ``\SomeClass.someProperty``:

.. testcode:: keypath-expression-implicit-type-name

   >> import Foundation
   -> class SomeClass: NSObject {
          @objc var someProperty: Int
          init(someProperty: Int) {
              self.someProperty = someProperty
          }
      }
   ---
   -> let c = SomeClass(someProperty: 10)
   <~ // c : SomeClass = <REPL.SomeClass:
   -> c.observe(\.someProperty) { object, change in
          // ...
      }
   <~ // r0 : NSKeyValueObservation = 

The *path* can refer to ``self`` to create the identity key path (``\.self``).
The identity key path refers to a whole instance,
so you can use it to access and change all of the data stored in a variable
in a single step.
For example:

.. testcode:: keypath-expression-self-keypath

   -> var compoundValue = (a: 1, b: 2)
   << // compoundValue : (a: Int, b: Int) = (a: 1, b: 2)
   // Equivalent to compoundValue = (a: 10, b: 20)
   -> compoundValue[keyPath: \.self] = (a: 10, b: 20)

The *path* can contain multiple property names, 
separated by periods,
to refer to a property of a property's value.
This code uses the key path expression
``\OuterStructure.outer.someValue``
to access the ``someValue`` property
of the ``OuterStructure`` type's ``outer`` property:

.. testcode:: keypath-expression
   :compile: true

   -> struct OuterStructure {
          var outer: SomeStructure
          init(someValue: Int) {
              self.outer = SomeStructure(someValue: someValue)
          }
      }
   ---
   -> let nested = OuterStructure(someValue: 24)
   -> let nestedKeyPath = \OuterStructure.outer.someValue
   ---
   -> let nestedValue = nested[keyPath: nestedKeyPath]
   /> nestedValue is \(nestedValue)
   </ nestedValue is 24

The *path* can include subscripts using brackets,
as long as the subscript's parameter type conforms to the ``Hashable`` protocol.
This example uses a subscript in a key path
to access the second element of an array:

.. testcode:: keypath-expression
   :compile: true

   -> let greetings = ["hello", "hola", "bonjour", "안녕"]
   -> let myGreeting = greetings[keyPath: \[String].[1]]
   /> myGreeting is '\(myGreeting)'
   </ myGreeting is 'hola'

.. TODO: Update examples here and below to remove type names once
   inference bugs are fixed. The compiler currently gives an error
   that the usage is ambiguous.
   <rdar://problem/34376681> [SR-5865]: Key path expression is "ambiguous without more context"

The value used in a subscript can be a named value or a literal.
Values are captured in key paths using value semantics.
The following code uses the variable ``index``
in both a key-path expression and in a closure to access
the third element of the ``greetings`` array.
When ``index`` is modified,
the key-path expression still references the third element,
while the closure uses the new index.

.. testcode:: keypath-expression
   :compile: true

   -> var index = 2
   -> let path = \[String].[index]
   -> let fn: ([String]) -> String = { strings in strings[index] }
   ---
   -> print(greetings[keyPath: path])
   <- bonjour
   -> print(fn(greetings))
   <- bonjour
   ---
   // Setting 'index' to a new value doesn't affect 'path'
   -> index += 1
   -> print(greetings[keyPath: path])
   <- bonjour
   ---
   // Because 'fn' closes over 'index', it uses the new value
   -> print(fn(greetings))
   <- 안녕
   
The *path* can use optional chaining and forced unwrapping.
This code uses optional chaining in a key path
to access a property of an optional string:

.. testcode:: keypath-expression
   :compile: true

   -> let firstGreeting: String? = greetings.first
   -> print(firstGreeting?.count as Any)
   <- Optional(5)
   ---
   // Do the same thing using a key path.
   -> let count = greetings[keyPath: \[String].first?.count]
   -> print(count as Any)
   <- Optional(5)

You can mix and match components of key paths to access values
that are deeply nested within a type.
The following code accesses different values and properties
of a dictionary of arrays 
by using key-path expressions 
that combine these components.

.. testcode:: keypath-expression
   :compile: true

   -> let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                                "triangular": [1, 3, 6, 10, 15, 21, 28],
                                "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
   -> print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
   <- Optional([2, 3, 5, 7, 11, 13, 17])
   -> print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
   <- 2
   -> print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
   <- 7
   -> print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
   <- 64
                                
For more information about using key paths
in code that interacts with Objective-C APIs,
see `Using Objective-C Runtime Features in Swift <https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift>`_.
For information about key-value coding and key-value observing,
see `Key-Value Coding Programming Guide <//apple_ref/doc/uid/10000107i>`_
and `Key-Value Observing Programming Guide <//apple_ref/doc/uid/10000177i>`_.

.. syntax-grammar::

   Grammar of a key-path expression

   key-path-expression --> ``\`` type-OPT ``.`` key-path-components
   key-path-components --> key-path-component | key-path-component ``.`` key-path-components
   key-path-component --> identifier key-path-postfixes-OPT | key-path-postfixes

   key-path-postfixes --> key-path-postfix key-path-postfixes-OPT
   key-path-postfix --> ``?`` | ``!`` | ``self`` | ``[`` function-call-argument-list ``]``


.. _Expression_SelectorExpression:

Selector Expression
~~~~~~~~~~~~~~~~~~~

A selector expression lets you access the selector
used to refer to a method or to a property's
getter or setter in Objective-C.
It has the following form:

.. syntax-outline::

   #selector(<#method name#>)
   #selector(getter: <#property name#>)
   #selector(setter: <#property name#>)

The *method name* and *property name* must be a reference to a method or a property
that is available in the Objective-C runtime.
The value of a selector expression is an instance of the ``Selector`` type.
For example:

.. testcode:: selector-expression

   >> import Foundation
   -> class SomeClass: NSObject {
          @objc let property: String
          @objc(doSomethingWithInt:)
          func doSomething(_ x: Int) {}
   ---
          init(property: String) {
              self.property = property
          }
      }
   -> let selectorForMethod = #selector(SomeClass.doSomething(_:))
   << // selectorForMethod : Selector = doSomethingWithInt:
   -> let selectorForPropertyGetter = #selector(getter: SomeClass.property)
   << // selectorForPropertyGetter : Selector = property

When creating a selector for a property's getter,
the *property name* can be a reference to a variable or constant property.
In contrast, when creating a selector for a property's setter,
the *property name* must be a reference to a variable property only.

The *method name* can contain parentheses for grouping,
as well the ``as`` operator to disambiguate between methods that share a name
but have different type signatures.
For example:

.. testcode:: selector-expression

   -> extension SomeClass {
          @objc(doSomethingWithString:)
          func doSomething(_ x: String) { }
      }
   -> let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
   << // anotherSelector : Selector = doSomethingWithString:

Because a selector is created at compile time, not at runtime,
the compiler can check that a method or property exists
and that they're exposed to the Objective-C runtime.

.. note::

    Although the *method name* and the *property name* are expressions,
    they're never evaluated.

For more information about using selectors
in Swift code that interacts with Objective-C APIs,
see `Using Objective-C Runtime Features in Swift <https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift>`_.

.. syntax-grammar::

    Grammar of a selector expression

    selector-expression --> ``#selector`` ``(`` expression  ``)``
    selector-expression --> ``#selector`` ``(`` ``getter:`` expression  ``)``
    selector-expression --> ``#selector`` ``(`` ``setter:`` expression  ``)``

.. Note: The parser does allow an arbitrary expression inside #selector(), not
   just a member name.  For example, see changes in Swift commit ef60d7289d in
   lib/Sema/CSApply.cpp -- there is explicit code to look through parens and
   optional binding.



.. _Expression_KeyPathExpression:

Key-Path String Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~

A key-path string expression lets you access the string
used to refer to a property in Objective-C,
for use in key-value coding and key-value observing APIs.
It has the following form:

.. syntax-outline::

   #keyPath(<#property name#>)

The *property name* must be a reference to a property
that is available in the Objective-C runtime.
At compile time, the key-path string expression is replaced by a string literal.
For example:

.. testcode:: keypath-string-expression

   >> import Foundation
   -> class SomeClass: NSObject {
         @objc var someProperty: Int
         init(someProperty: Int) {
             self.someProperty = someProperty
         }
      }
   ---
   -> let c = SomeClass(someProperty: 12)
   <~ // c : SomeClass = <REPL.SomeClass:
   -> let keyPath = #keyPath(SomeClass.someProperty)
   << // keyPath : String = "someProperty"
   ---
   -> if let value = c.value(forKey: keyPath) {
   ->     print(value)
   -> }
   <- 12

When you use a key-path string expression within a class,
you can refer to a property of that class
by writing just the property name, without the class name.

.. testcode:: keypath-string-expression

   -> extension SomeClass {
         func getSomeKeyPath() -> String {
            return #keyPath(someProperty)
         }
      }
   -> print(keyPath == c.getSomeKeyPath())
   <- true

Because the key path string is created at compile time, not at runtime,
the compiler can check that the property exists
and that the property is exposed to the Objective-C runtime.

For more information about using key paths
in Swift code that interacts with Objective-C APIs,
see `Using Objective-C Runtime Features in Swift <https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift>`_.
For information about key-value coding and key-value observing,
see `Key-Value Coding Programming Guide <//apple_ref/doc/uid/10000107i>`_
and `Key-Value Observing Programming Guide <//apple_ref/doc/uid/10000177i>`_.

.. note::

    Although the *property name* is an expression, it is never evaluated.


.. syntax-grammar::

    Grammar of a key-path string expression

    key-path-string-expression --> ``#keyPath`` ``(`` expression  ``)``


.. _Expressions_PostfixExpressions:

Postfix Expressions
-------------------

:newTerm:`Postfix expressions` are formed
by applying a postfix operator or other postfix syntax
to an expression.
Syntactically, every primary expression is also a postfix expression.

For information about the behavior of these operators,
see :doc:`../LanguageGuide/BasicOperators` and :doc:`../LanguageGuide/AdvancedOperators`.

For information about the operators provided by the Swift standard library,
see `Operator Declarations <https://developer.apple.com/documentation/swift/operator_declarations>`_.

.. syntax-grammar::

    Grammar of a postfix expression

    postfix-expression --> primary-expression
    postfix-expression --> postfix-expression postfix-operator
    postfix-expression --> function-call-expression
    postfix-expression --> initializer-expression
    postfix-expression --> explicit-member-expression
    postfix-expression --> postfix-self-expression
    postfix-expression --> subscript-expression
    postfix-expression --> forced-value-expression
    postfix-expression --> optional-chaining-expression


.. _Expressions_FunctionCallExpression:

Function Call Expression
~~~~~~~~~~~~~~~~~~~~~~~~

.. TODO: After we rewrite function decls,
   revisit this section to make sure that the names for things match.

A :newTerm:`function call expression` consists of a function name
followed by a comma-separated list of the function's arguments in parentheses.
Function call expressions have the following form:

.. syntax-outline::

    <#function name#>(<#argument value 1#>, <#argument value 2#>)

The *function name* can be any expression whose value is of a function type.

If the function definition includes names for its parameters,
the function call must include names before its argument values
separated by a colon (``:``).
This kind of function call expression has the following form:

.. syntax-outline::

   <#function name#>(<#argument name 1#>: <#argument value 1#>, <#argument name 2#>: <#argument value 2#>)

A function call expression can include a trailing closure
in the form of a closure expression immediately after the closing parenthesis.
The trailing closure is understood as an argument to the function,
added after the last parenthesized argument.
The following function calls are equivalent:

.. testcode:: trailing-closure

    >> func someFunction (x: Int, f: (Int) -> Bool) -> Bool {
    >>    return f(x)
    >> }
    >> let x = 10
    << // x : Int = 10
    // someFunction takes an integer and a closure as its arguments
    -> someFunction(x: x, f: {$0 == 13})
    << // r0 : Bool = false
    -> someFunction(x: x) {$0 == 13}
    << // r1 : Bool = false

If the trailing closure is the function's only argument,
the parentheses can be omitted.

.. testcode:: no-paren-trailing-closure

    >> class Data {
    >>    let data = 10
    >>    func someMethod(f: (Int) -> Bool) -> Bool {
    >>       return f(self.data)
    >>    }
    >> }
    >> let myData = Data()
    << // myData : Data = REPL.Data
    // someMethod takes a closure as its only argument
    -> myData.someMethod() {$0 == 13}
    << // r0 : Bool = false
    -> myData.someMethod {$0 == 13}
    << // r1 : Bool = false

A class, structure, or enumeration type
can enable syntactic sugar for function call syntax
by defining a call-as-function method.
The name of a call-as-function method is ``callAsFunction()``,
or another name that adds labelled or unlabeled arguments --
for example, ``callAsFunction(_:_:)`` and ``callAsFunction(something:)``.
A function call expression
whose *function name* is an instance of a type
that implements a call-as-function method
is understood as a call to that method.
The following function calls are equivalent:

.. testcode:: call-as-function
   :compile: true

   -> struct CallableStruct {
          var value: Int
          func callAsFunction(_ number: Int, scale: Int) {
              print(scale * (argument + value))
          }
      }
   -> let callable = CallableStruct(value: 100)
   -> callable(4, scale: 2)
   -> callable.callAsFunction(4, scale: 2)
   // Both function calls print 208.
   << 208
   << 208

If the class, structure, or enumeration type implements
both a call-as-function method
and one of the methods used by the ``dynamicCallable`` attribute,
the compiler gives preference to the call-as-function method.
For information about the ``dynamicCallable`` attribute,
see :ref:`Attributes_dynamicCallable`.

.. XXX Editorial: Do we have a better name than "a call-as-function method"?
   I'm avoiding naming it a ``callAsFunction`` method
   because that isn't actually a name for anything in your program,
   so it's a bit of an abuse of notation to write it in code voice.

.. syntax-grammar::

    Grammar of a function call expression

    function-call-expression --> postfix-expression function-call-argument-clause
    function-call-expression --> postfix-expression function-call-argument-clause-OPT trailing-closure

    function-call-argument-clause --> ``(`` ``)`` | ``(`` function-call-argument-list ``)``
    function-call-argument-list --> function-call-argument | function-call-argument ``,`` function-call-argument-list
    function-call-argument --> expression | identifier ``:`` expression
    function-call-argument --> operator | identifier ``:`` operator

    trailing-closure --> closure-expression

.. _Expressions_InitializerExpression:

Initializer Expression
~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`initializer expression` provides access
to a type's initializer.
It has the following form:

.. syntax-outline::

    <#expression#>.init(<#initializer arguments#>)

You use the initializer expression in a function call expression
to initialize a new instance of a type.
You also use an initializer expression
to delegate to the initializer of a superclass.

.. testcode:: init-call-superclass

    >> class SomeSuperClass { }
    -> class SomeSubClass: SomeSuperClass {
    ->     override init() {
    ->         // subclass initialization goes here
    ->         super.init()
    ->     }
    -> }

Like a function, an initializer can be used as a value.
For example:

.. testcode:: init-as-value

    // Type annotation is required because String has multiple initializers.
    -> let initializer: (Int) -> String = String.init
    << // initializer : (Int) -> String = (Function)
    -> let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
    << // oneTwoThree : String = "123"
    -> print(oneTwoThree)
    <- 123

If you specify a type by name,
you can access the type's initializer without using an initializer expression.
In all other cases, you must use an initializer expression.

.. testcode:: explicit-implicit-init

    >> struct SomeType {
    >>     let data: Int
    >> }
    -> let s1 = SomeType.init(data: 3)  // Valid
    << // s1 : SomeType = REPL.SomeType(data: 3)
    -> let s2 = SomeType(data: 1)       // Also valid
    << // s2 : SomeType = REPL.SomeType(data: 1)
    ---
    >> let someValue = s1
    << // someValue : SomeType = REPL.SomeType(data: 3)
    -> let s3 = type(of: someValue).init(data: 7)  // Valid
    << // s3 : SomeType = REPL.SomeType(data: 7)
    -> let s4 = type(of: someValue)(data: 5)       // Error
    !! <REPL Input>:1:29: error: initializing from a metatype value must reference 'init' explicitly
    !! let s4 = type(of: someValue)(data: 5)       // Error
    !!                              ^
    !!                              .init

.. syntax-grammar::

    Grammar of an initializer expression

    initializer-expression --> postfix-expression ``.`` ``init``
    initializer-expression --> postfix-expression ``.`` ``init`` ``(`` argument-names ``)``

.. _Expressions_ExplicitMemberExpression:

Explicit Member Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`explicit member expression` allows access
to the members of a named type, a tuple, or a module.
It consists of a period (``.``) between the item
and the identifier of its member.

.. syntax-outline::

   <#expression#>.<#member name#>

The members of a named type are named
as part of the type's declaration or extension.
For example:

.. testcode:: explicitMemberExpression

    -> class SomeClass {
           var someProperty = 42
       }
    -> let c = SomeClass()
    << // c : SomeClass = REPL.SomeClass
    -> let y = c.someProperty  // Member access
    << // y : Int = 42

The members of a tuple
are implicitly named using integers in the order they appear,
starting from zero.
For example:

.. testcode:: explicit-member-expression

    -> var t = (10, 20, 30)
    << // t : (Int, Int, Int) = (10, 20, 30)
    -> t.0 = t.1
    -> // Now t is (20, 20, 30)

The members of a module access
the top-level declarations of that module.

Types declared with the ``dynamicMemberLookup`` attribute
include members that are looked up at runtime,
as described in :doc:`Attributes`.

To distinguish between methods or initializers
whose names differ only by the names of their arguments,
include the argument names in parentheses,
with each argument name followed by a colon (``:``).
Write an underscore (``_``) for an argument with no name.
To distinguish between overloaded methods,
use a type annotation.
For example:

.. testcode:: function-with-argument-names

    -> class SomeClass {
           func someMethod(x: Int, y: Int) {}
           func someMethod(x: Int, z: Int) {}
           func overloadedMethod(x: Int, y: Int) {}
           func overloadedMethod(x: Int, y: Bool) {}
       }
    -> let instance = SomeClass()
    ---
    << // instance : SomeClass = REPL.SomeClass
    -> let a = instance.someMethod              // Ambiguous
    !! <REPL Input>:1:9: error: ambiguous use of 'someMethod'
    !! let a = instance.someMethod              // Ambiguous
    !!         ^
    !! <REPL Input>:2:12: note: found this candidate
    !!              func someMethod(x: Int, y: Int) {}
    !!                   ^
    !! <REPL Input>:3:12: note: found this candidate
    !!              func someMethod(x: Int, z: Int) {}
    !!                   ^
    -> let b = instance.someMethod(x:y:)        // Unambiguous
    << // b : (Int, Int) -> () = (Function)
    ---
    -> let d = instance.overloadedMethod        // Ambiguous
    !! <REPL Input>:1:9: error: ambiguous use of 'overloadedMethod(x:y:)'
    !! let d = instance.overloadedMethod        // Ambiguous
    !!         ^
    !! <REPL Input>:4:12: note: found this candidate
    !!              func overloadedMethod(x: Int, y: Int) {}
    !!                   ^
    !! <REPL Input>:5:12: note: found this candidate
    !!              func overloadedMethod(x: Int, y: Bool) {}
    !!                   ^
    -> let d = instance.overloadedMethod(x:y:)  // Still ambiguous
    !! <REPL Input>:1:9: error: ambiguous use of 'overloadedMethod(x:y:)'
    !!     let d = instance.overloadedMethod(x:y:)  // Still ambiguous
    !!             ^
    !! <REPL Input>:4:12: note: found this candidate
    !!              func overloadedMethod(x: Int, y: Int) {}
    !!                   ^
    !! <REPL Input>:5:12: note: found this candidate
    !!              func overloadedMethod(x: Int, y: Bool) {}
    !!                   ^
    -> let d: (Int, Bool) -> Void  = instance.overloadedMethod(x:y:)  // Unambiguous
    << // d : (Int, Bool) -> Void = (Function)

If a period appears at the beginning of a line,
it is understood as part of an explicit member expression,
not as an implicit member expression.
For example, the following listing shows chained method calls
split over several lines:

.. testcode:: period-at-start-of-line
   :compile: true

   -> let x = [10, 3, 20, 15, 4]
   ->     .sorted()
   ->     .filter { $0 > 5 }
   ->     .map { $0 * 100 }
   >> print(x)
   << [1000, 1500, 2000]

.. syntax-grammar::

    Grammar of an explicit member expression

    explicit-member-expression --> postfix-expression ``.`` decimal-digits
    explicit-member-expression --> postfix-expression ``.`` identifier generic-argument-clause-OPT
    explicit-member-expression --> postfix-expression ``.`` identifier ``(`` argument-names ``)``

    argument-names --> argument-name argument-names-OPT
    argument-name --> identifier ``:``

.. The grammar for method-name doesn't include the following:
       method-name --> identifier argument-names-OPT
   because the "postfix-expression . identifier" line above already covers that case.

.. See grammar for initializer-expression for the related "argument name" production there.



.. _Expressions_PostfixSelfExpression:

Postfix Self Expression
~~~~~~~~~~~~~~~~~~~~~~~

A postfix ``self`` expression consists of an expression or the name of a type,
immediately followed by ``.self``. It has the following forms:

.. syntax-outline::

       <#expression#>.self
       <#type#>.self

The first form evaluates to the value of the *expression*.
For example, ``x.self`` evaluates to ``x``.

The second form evaluates to the value of the *type*. Use this form
to access a type as a value. For example,
because ``SomeClass.self`` evaluates to the ``SomeClass`` type itself,
you can pass it to a function or method that accepts a type-level argument.

.. syntax-grammar::

    Grammar of a postfix self expression

    postfix-self-expression --> postfix-expression ``.`` ``self``


.. _Expressions_SubscriptExpression:

Subscript Expression
~~~~~~~~~~~~~~~~~~~~

A :newTerm:`subscript expression` provides subscript access
using the getter and setter
of the corresponding subscript declaration.
It has the following form:

.. syntax-outline::

   <#expression#>[<#index expressions#>]

To evaluate the value of a subscript expression,
the subscript getter for the *expression*'s type is called
with the *index expressions* passed as the subscript parameters.
To set its value,
the subscript setter is called in the same way.

.. TR: Confirm that indexing on
   a comma-separated list of expressions
   is intentional, not just a side effect.
   I see this working, for example:
   (swift) class Test {
             subscript(a: Int, b: Int) -> Int { return 12 }
           }
   (swift) var t = Test()
   // t : Test = <Test instance>
   (swift) t[1, 2]
   // r0 : Int = 12

For information about subscript declarations,
see :ref:`Declarations_ProtocolSubscriptDeclaration`.

.. syntax-grammar::

    Grammar of a subscript expression

    subscript-expression --> postfix-expression ``[`` function-call-argument-list ``]``

.. assertion:: subscripts-can-take-operators

   >> struct S {
          let x: Int
          let y: Int
          subscript(operation: (Int, Int) -> Int) -> Int {
              return operation(x, y)
          }
      }
   >> let s = S(x: 10, y: 20)
   << // s : S = REPL.S(x: 10, y: 20)
   >> s[+]
   << // r0 : Int = 30


.. _Expressions_Forced-ValueExpression:

Forced-Value Expression
~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`forced-value expression` unwraps an optional value
that you are certain is not ``nil``.
It has the following form:

.. syntax-outline::

   <#expression#>!

If the value of the *expression* is not ``nil``,
the optional value is unwrapped
and returned with the corresponding non-optional type.
Otherwise, a runtime error is raised.

The unwrapped value of a forced-value expression can be modified,
either by mutating the value itself,
or by assigning to one of the value's members.
For example:

.. testcode:: optional-as-lvalue

   -> var x: Int? = 0
   << // x : Int? = Optional(0)
   -> x! += 1
   /> x is now \(x!)
   </ x is now 1
   ---
   -> var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
   << // someDictionary : [String : [Int]] = ["a": [1, 2, 3], "b": [10, 20]]
   -> someDictionary["a"]![0] = 100
   /> someDictionary is now \(someDictionary)
   </ someDictionary is now ["a": [100, 2, 3], "b": [10, 20]]

.. syntax-grammar::

    Grammar of a forced-value expression

    forced-value-expression --> postfix-expression ``!``


.. _Expression_OptionalChainingOperator:

Optional-Chaining Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`optional-chaining expression` provides a simplified syntax
for using optional values in postfix expressions.
It has the following form:

.. syntax-outline::

    <#expression#>?

The postfix ``?`` operator makes an optional-chaining expression
from an expression without changing the expression's value.

Optional-chaining expressions must appear within a postfix expression,
and they cause the postfix expression to be evaluated in a special way.
If the value of the optional-chaining expression is ``nil``,
all of the other operations in the postfix expression are ignored
and the entire postfix expression evaluates to ``nil``.
If the value of the optional-chaining expression is not ``nil``,
the value of the optional-chaining expression is unwrapped
and used to evaluate the rest of the postfix expression.
In either case,
the value of the postfix expression is still of an optional type.

If a postfix expression that contains an optional-chaining expression
is nested inside other postfix expressions,
only the outermost expression returns an optional type.
In the example below,
when ``c`` is not ``nil``,
its value is unwrapped and used to evaluate ``.property``,
the value of which is used to evaluate ``.performAction()``.
The entire expression ``c?.property.performAction()``
has a value of an optional type.

.. testcode:: optional-chaining

   >> class OtherClass { func performAction() -> Bool {return true} }
   >> class SomeClass { var property: OtherClass = OtherClass() }
   -> var c: SomeClass?
   << // c : SomeClass? = nil
   -> var result: Bool? = c?.property.performAction()
   << // result : Bool? = nil

The following example shows the behavior
of the example above
without using optional chaining.

.. testcode:: optional-chaining-alt

   >> class OtherClass { func performAction() -> Bool {return true} }
   >> class SomeClass { var property: OtherClass = OtherClass() }
   >> var c: SomeClass?
   << // c : SomeClass? = nil
   -> var result: Bool?
   << // result : Bool? = nil
   -> if let unwrappedC = c {
         result = unwrappedC.property.performAction()
      }

The unwrapped value of an optional-chaining expression can be modified,
either by mutating the value itself,
or by assigning to one of the value's members.
If the value of the optional-chaining expression is ``nil``,
the expression on the right-hand side of the assignment operator
is not evaluated.
For example:

.. testcode:: optional-chaining-as-lvalue

   -> func someFunctionWithSideEffects() -> Int {
         return 42  // No actual side effects.
      }
   -> var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
   << // someDictionary : [String : [Int]] = ["a": [1, 2, 3], "b": [10, 20]]
   ---
   -> someDictionary["not here"]?[0] = someFunctionWithSideEffects()
   <$ : ()? = nil
   // someFunctionWithSideEffects is not evaluated
   /> someDictionary is still \(someDictionary)
   </ someDictionary is still ["a": [1, 2, 3], "b": [10, 20]]
   ---
   -> someDictionary["a"]?[0] = someFunctionWithSideEffects()
   <$ : ()? = Optional(())
   /> someFunctionWithSideEffects is evaluated and returns \(someFunctionWithSideEffects())
   </ someFunctionWithSideEffects is evaluated and returns 42
   /> someDictionary is now \(someDictionary)
   </ someDictionary is now ["a": [42, 2, 3], "b": [10, 20]]

.. syntax-grammar::

   Grammar of an optional-chaining expression

   optional-chaining-expression --> postfix-expression ``?``
