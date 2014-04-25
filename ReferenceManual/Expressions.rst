Expressions
===========

In Swift, there are four kinds of expressions:
primary expressions, unary expressions, binary expressions, and postfix expressions.

Primary expressions are conceptually the core kind of expression
and they provide a way to access values.
They can be used on their own
and as part of a unary, binary, or postfix expression
to build up more complex expressions.
Unary and binary expressions let you
combine expressions and operators.
Postfix expressions,
like unary and binary expressions,
let you build up more complex expressions
using postfixes such as function calls and member access.
Each kind of expression is described in detail
in the sections below.

.. langref-grammar

    expr          ::= expr-basic
    expr          ::= expr-trailing-closure expr-cast?

    expr-basic    ::= expr-sequence expr-cast?

    expr-sequence ::= expr-unary expr-binary*


.. syntax-grammar::

    Grammar of an expression

    expression --> unary-expression binary-expressions-OPT
    expression-list --> expression | expression ``,`` expression-list

.. _Expressions_UnaryOperators:

Unary Expressions
-----------------

:newTerm:`Unary expressions` are formed by combining
an optional prefix operator with an expression.
Prefix operators take one argument,
the expression that follows them.

.. langref-grammar

    expr-unary   ::= operator-prefix* expr-postfix

.. syntax-grammar::

    Grammar of a unary expression

    unary-expression --> prefix-operators-OPT postfix-expression
    prefix-operators --> prefix-operator prefix-operators-OPT


.. _Expressions_BinaryOperators:

Binary Expressions
------------------

:newTerm:`Binary expressions` are formed by combining
an infix binary operator with the expression that it takes
as its left-hand and right-hand arguments.
It has the following form:

.. syntax-outline::

   <#left-hand argument#> <#operator#> <#right-hand argument#>

At parse time,
an expression made up of binary operators is represented as a flat list,
with the expression that follows each operator
understood as its right-hand argument,
and the unary expression of the containing expression
understood as the left-hand argument
to the first operator in the list.
This list is transformed into a tree
by applying operator precedence,
at which point the left- and right-hand arguments
of each operator are the appropriate expression.

For example the expression `2 + 3 * 5`
is initially understood as a list of three items,
`2`, `+ 3`, and `* 5`.
It is then transformed into the tree `(2 + (3 * 5))`.

.. TODO: In the amazing future, the previous paragraph would benefit from a diagram.

.. langref-grammar

    expr-binary ::= op-binary-or-ternary expr-unary expr-cast?
    op-binary-or-ternary ::= operator-binary
    op-binary-or-ternary ::= '='
    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a binary expression

    binary-expression --> binary-operator unary-expression
    binary-expression --> assignment-operator unary-expression
    binary-expression --> conditional-operator unary-expression
    binary-expression --> type-checking-operator

    binary-expressions --> binary-expression binary-expressions-OPT

.. TODO: Give a list of the binary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.

.. NOTE: You have essentially expression sequences here, and within it are
   parts of the expressions.  We're calling them "expressions" even
   though they aren't what we ordinarily think of as expressions.  We
   have this two-phase thing where we do the expression sequence parsing
   which gives a rough parse tree.  Then after name binding we know
   operator precedence and we do a second phase of parsing that builds
   something that's a more traditional tree.

.. TODO: You're going to care about this if you're adding new operators --
   it's not a high priority.  We could probably loosely describe this
   process by saying that the parser handles it as a flat list and then
   applies the operator precedence to make a more typical parse tree.
   At some point, we will probably have to document the syntax around
   creating operators.  This may need to be discussed in the Language Guide
   in respect to the spacing rules -- ``x + y * z`` is diffirent than
   ``x + y* z``.

.. TODO: Give a list of the unary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.
    Table of operator, meaning, precedence, and associativity.
    Only the most commonly used ones?
    We can discuss them in some detail now, knowing that it could migrate
    to a proper Standar Library Reference book later.

Assignment Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`assigment operator` updates the value of variables.
It has the following form:

.. syntax-outline::

   <#variable name#> = <#value#>

The value of the expression on the left of the ``=``
is set to the value obtained by evaluating the expression on the right.
The expression on the left side can be an
identifier, a ignored expressions, or a tuple.
In this usage, tuples contain only
identifier, ignored expressions, and other tuples.

If the left side is a tuple,
the right side must be a tuple
with the same number of elements.
The values of the right-hand tuple
are assigned to the corresponding variables in the left-hand tuple.
For example: ::

    (a, _, (b, c)) = ("test", 9.45, (12, 3))
    // a is "test", b is 12, and c is 3.

The assignment operator does not return any value.

.. langref-grammar

    op-binary-or-ternary ::= '='

.. syntax-grammar::

    Grammar of an assignment operator

    assignment-operator --> ``=``

.. _Expressions_ConditionalOperator:

Conditional Operator
~~~~~~~~~~~~~~~~~~~~

The :newTerm:`conditional operator` evaluates to one of two given values
based on the value of a condition;
it has the following form:

.. syntax-outline::

   <#condition#> ? <#expression used if true#> : <#expression used if false#>

If the *condition* evaluates to ``true``,
the conditional operator evaluates the first expression
and returns its value.
Otherwise, it evaluates the second expression
and returns its value.
The unused expression is not evaluated.

.. The REPL v1-28 allows nesting such as true ? false ? 10 : 20 : 2
   which parses as true ? (false ? 10 : 20) : 2 -- the parens are optional --
   but that's a really bad idea if you want your code to be readable.

.. langref-grammar

    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a conditional operator

    conditional-operator --> ``?`` expression ``:``

.. _Expressions_Type-CastingOperators:

Type-Checking Operators
~~~~~~~~~~~~~~~~~~~~~~~

There are two :newTerm:`type-checking operators`,
the ``is`` operator and the ``as`` operator.
They have the following form:

.. syntax-outline::

   <#variable#> is <#type>
   <#variable#> as <#type>
   <#variable#> as <#type>!

The ``is`` operator checks at runtime
whether the value of its left-hand argument
has the type specified by its right-hand argument
or one of its subtypes.
If so, it returns ``true``; otherwise, it returns ``false``.
The check must not be provably true or false at compile time.
The following are invalid: ::

    "hello" is String
    "hello" is Int

.. See also <rdar://problem/16639705> Proveably true/false "is" expressions should be a warning, not an error

The ``as`` operator explicitly specifies
that the value of its left-hand argument
is to be treated as the type specified
by its right-hand argument.

There are three possible values of the expression:

* If the value of the left-hand expression
  is of a type that is guaranteed to be convertable
  to the specified type,
  the value is returned as the specified type.

* If the value is guaranteed *not* to be convertable
  to the specified type,
  a compile-time error is raised.

* Otherwise, the value of the left-hand expression
  is returned as on optional of the type specified.
  At runtime, if the cast fails, its value is ``nil``.

For example: ::

    class SomeSuperType {}
    class SomeType : SomeSuperType {}
    class SomeChildType : SomeType {}

    let x = SomeType()

    let y = x as SomeSuperType  // y: SomeSuperType
    let z = x as SomeChildType  // z: SomeChildType?

Specifying a type with ``as`` provides the same type context
to the compiler as a function call and a variable type annotation.
For example, the following examples
are equivalent to the ones above: ::

    let y2 : SomeSuperType = x
    let z2 : SomeChildType? = x

    func f (a : SomeSuperType) -> SomeSuperType { return a }
    func g (a : SomeChildType) -> SomeChildType { return a }
    let y3 = f(x)
    let z3 = g(x)

If the type specified after ``as``
is followed by an exclamation mark (``!``),
the expression is understood as a force-value expression.
The following are equivalent: ::

    x as SomeType!
    (x as SomeType)!

.. TODO: Use test-code directive for the above code listings.

.. langref-grammar

    expr-cast ::= 'is' type
    expr-cast ::= 'as' type

.. syntax-grammar::

    Grammar of a type-checking operator

    type-checking-operator --> ``is`` type
    type-checking-operator --> ``as`` type ``!``-OPT

.. _Expressions_PrimaryExpressions:

Primary Expressions
-------------------

:newTerm:`Primary expression`
are the most basic kind of expression.
They can be used as expressions on their own,
and they can be combined with other tokens
such as operators, prefixes, and postfixes,
to make more complex expressions.

.. langref-grammar

    expr-primary  ::= expr-literal
    expr-primary  ::= expr-identifier
    expr-primary  ::= expr-super
    expr-primary  ::= expr-closure
    expr-primary  ::= expr-anon-closure-arg
    expr-primary  ::= expr-paren
    expr-primary  ::= expr-delayed-identifier

.. syntax-grammar::

    Grammar of a primary expression

    primary-expression --> identifier generic-argument-clause-OPT
    primary-expression --> literal-expression
    primary-expression --> superclass-expression
    primary-expression --> closure-expression
    primary-expression --> anonymous-closure-argument
    primary-expression --> parenthesized-expression
    primary-expression --> implicit-member-expression
    primary-expression --> ignored-expression

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

:newTerm:`Literal expression` consists of
either an ordinary literal (such as a string or a number),
an array literal,
a dictionary literal,
or one of the following special literals:

================    ======  ===============================================
Literal             Type    Value
================    ======  ===============================================
``__FILE__``        String  The name of the file in which it appears
``__LINE__``        Int     The line number on which it appears
``__COLUMN__``      Int     The column number in which it begins
``__FUNCTION__``    String  The name of the declaration in which it appears
================    ======  ===============================================

.. TODO: self and Self probably belong here as magic/special literals.

Inside a function,
the value of ``__FUNCTION__`` is the name of that function,
inside a method it is the name of that method,
inside a property getter or setter it is the name of that property,
inside special members like ``init`` or ``subscript`` it is the name of that keyword,
and at the top level of a file it is the name of the current module.

An :newTerm:`array literal` represent an ordered collection,
made up of items of the same type.
It has the following form:

.. syntax-outline::

   [<#value 1#>, <#value 2#>, <#...#>]

.. TODO: Decide on usage of <#...#> throughout the reference.

The last expression in the array can be followed by an optional comma.
The value of an array literal has type ``T[]``,
where ``T`` is the type of the expressions inside it.

A :newTerm:`dictionary literal` represents
an unordered collection of key-value pairs,
where all the keys are of the same type
and all the values are of the same type.
It has the following form:

.. syntax-outline::

   [<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#...#>]

The last expression in the dictionary can be followed by an optional comma.
An empty dictionary literal is written as ``[:]``
to distinguish it from an empty array literal.
The value of a dictionary literal has type ``Dictionary<KeyType, ValueType>``,
where ``KeyType`` is the type of its key expressions
and ``ValueType`` is the type of its value expressions.

.. langref-grammar

    expr-literal ::= integer_literal
    expr-literal ::= floating_literal
    expr-literal ::= character_literal
    expr-literal ::= string_literal
    expr-literal ::= '__FILE__'
    expr-literal ::= '__LINE__'
    expr-literal ::= '__COLUMN__'

.. syntax-grammar::

    Grammar of a literal expression

    literal-expression --> literal
    literal-expression --> array-expression | dictionary-expression
    literal-expression --> ``__FILE__`` | ``__LINE__`` | ``__COLUMN__`` | ``__FUNCTION__``

    array-expression --> ``[`` array-expression-items-OPT ``]``
	array-expression-items --> array-expression-item ``,``-OPT | array-expression-item ``,`` array-expression-items
	array-expression-item --> expression

	dictionary-expression --> ``[`` dictionary-expression-items ``]`` | empty-dictionary-expression
	empty-dictionary-expression --> ``[`` ``:`` ``]``
	dictionary-expression-items --> dictionary-expression-item ``,``-OPT | dictionary-expression-item ``,`` dictionary-expression-items
	dictionary-expression-item --> expression ``:`` expression


.. _Expressions_SuperclassExpression:

Superclass Expression
~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`superclass expression` lets a class
interact with its superclass.
It has one of the following forms:

.. syntax-outline::

   super.<#member name#>
   super[<#subscript index#>]
   super.init

The first form is understood as a member of the superclass.
This allows a subclass to call the superclass's
implementation of a method that it overrides,
to get and set propertiess defined by its superclass,
and to access its superclass's implementation of getters and setters.

.. TR: Confirm the above about properties.

The second form is understood as a call
to the superclass's subscript method.
This allows a subclass to use its superclass's support for subscripting
in the subclass's support for subscripting.

The third form is understood as the superclass's initializer.
This allows a subclass to call the initializer of its superclass
as part of the subclass's initializer.

.. TR: ParseExpr.cpp as of r14954 has a second form of expr-super
   where super.init is followed by 'identifier' and 'expr-call-suffix'
   What is this for?  What does it mean?

.. langref-grammar

    expr-super ::= expr-super-method
    expr-super ::= expr-super-subscript
    expr-super ::= expr-super-constructor
    expr-super-method ::= 'super' '.' expr-identifier
    expr-super-subscript ::= 'super' '[' expr ']'
    expr-super-constructor ::= 'super' '.' 'init'

.. syntax-grammar::

    Grammar of a superclass expression

    superclass-expression --> superclass-method-expression | superclass-subscript-expression | superclass-constructor-expression

    superclass-method-expression --> ``super`` ``.`` identifier
    superclass-subscript-expression --> ``super`` ``[`` expression ``]``
    superclass-constructor-expression --> ``super`` ``.`` ``init``

.. _Expressions_ClosureExpression:

Closure Expression
~~~~~~~~~~~~~~~~~~

A :newTerm:`closure expression` creates a closure,
also known as a *lambda* or an *anonymous function*.
Like function declarations,
closures contain statements which they execute,
and they can capture values from their enclosing scope.
Unlike function declarations,
the return type and parameter types can be omitted.
The omitted type information is inferred
from the context in which the closure is used.

A closure that consists of only a single expression
is understood to return the value of that expression.
In this special case,
type information from the expression
is used to infer omitted parameter or return types.

A closure may also omit names for its parameters.
Its parameters are then implicitly named
``$`` followed by their position:
``$0``, ``$1``, ``$2``, and so on.

Using implicit types, parameter names, and return statements
can make a closure expression much shorter.
The following closure expressions are equivalent: ::

    {
        (x : Int, y : Int) -> Int in
        let result = x + y
        return x + y
    }

    {
        (x, y) in
        let result = x + y
        return x + y
    }

    { (x, y) in x + y }

    { $0 + $1 }

.. TODO: Revisit style guide regarding placement of "in".

.. langref-grammar

    expr-closure ::= '{' closure-signature? brace-item* '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier)* func-signature-result? 'in'
    expr-anon-closure-arg ::= dollarident

.. syntax-grammar::

    Grammar of a closure expression

    closure-expression --> ``{`` closure-signature-OPT statements ``}``
    closure-expressions --> closure-expression closure-expressions-OPT

    closure-signature --> tuple-pattern function-signature-result-OPT ``in``
    closure-signature --> identifier-list function-signature-result-OPT ``in``

    anonymous-closure-argument --> dollar-identifier


.. _Expressions_ImplicitMemberExpression:

Implicit Member Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`implicit member expression`
is an abbreviated way to access a member of a type,
such as an enumeration case or a class method,
in a context where type inference
can determine the implied type.
It has the following form:

.. syntax-outline::

   .<#member name#>

For example, the following pairs of assignments are equivalent: ::

    var x: ExampleEnumeration
    x = ExampleEnumeration.SomeValue
    x = .SomeValue

    var y: ExampleClass
    y = .someClassMethod()
    y = ExampleClass.someClassMethod()

.. langref-grammar

    expr-delayed-identifier ::= '.' identifier


.. syntax-grammar::

    Grammar of a implicit member expression

    implicit-member-expression --> ``.`` identifier

.. _Expressions_ParenthesizedExpression:

Parenthesized Expression
~~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`parenthesized expression` consists of
a comma-separated list of expressions surrounded by paretheses.
Each expression can have an optional identifier before it,
separated by a colon (``:``).
It has the following form:

.. syntax-outline::

   (<#identifier#>: <#expression#>, <#identifier#>: <#expression#>)

.. TR: Should this only be used in a function call?
   As a primary expression, it seems like it is a remnant of named tuples
   which are going away, and should only be lightly documented.
   For example, you shouldn't do this anymore:

   (swift) var x = (a: 1, b: 2)
   // x : (a: Int, b: Int) = (1, 2)
   (swift) x.a
   // r1 : Int = 1

.. langref-grammar

    expr-paren      ::= '(' ')'
    expr-paren      ::= '(' expr-paren-element (',' expr-paren-element)* ')'
    expr-paren-element ::= (identifier ':')? expr


.. syntax-grammar::

    Grammar of a parenthesized expression

    parenthesized-expression --> ``(`` expression-element-list-OPT ``)``
    expression-element-list --> expression-element | expression-element ``,`` expression-element-list
    expression-element --> expression | identifier ``:`` expression


Ignored Expression
~~~~~~~~~~~~~~~~~~

An :newTerm:`ignored expression`
is used with the assignment operator
to explicitly discard a value.
For example: ::

    (x, _) = (10, 20)

.. <rdar://problem/16678866> Assignment to _ from a variable causes a REPL segfault

.. syntax-grammar::

   ignored-expression --> ``_``


.. _Expressions_PostfixExpressions:

Postfix Expressions
-------------------

:newTerm:`Postfix expressions` are formed
by applying a postfix operator or other postfix syntax
to an expression.
Syntactically, every primary expression is also a postfix expression.

.. Formed by putting a postfix operator or postfix-operator-like suffix
   after an expression.

.. langref-grammar

    expr-postfix  ::= expr-primary
    expr-postfix  ::= expr-postfix operator-postfix
    expr-postfix  ::= expr-new
    expr-postfix  ::= expr-init
    expr-postfix  ::= expr-dot
    expr-postfix  ::= expr-metatype
    expr-postfix  ::= expr-subscript
    expr-postfix  ::= expr-call
    expr-postfix  ::= expr-optional
    expr-force-value  ::= expr-force-value (typo in the langref; lhs should be expr-postfix)

.. syntax-grammar::

    Grammar of a postfix expression

    postfix-expression --> primary-expression
    postfix-expression --> postfix-expression postfix-operator
    postfix-expression --> function-call-expression
    postfix-expression --> initializer-expression
    postfix-expression --> dot-expression
    postfix-expression --> self-expression
    postfix-expression --> subscript-expression
    postfix-expression --> forced-expression
    postfix-expression --> optional-expression

.. _Expressions_FunctionCallExpression:

Function Call Expression
~~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`function call expression` consist of a function
followed by its arguments in parenthesis.
Arguments are separated by commas
and support optional labels.
They have the following form:

.. syntax-outline::

    <#function#>()
    <#function#>(<#argument#>)
    <#function#>(<#argument 1#>, <#argument 2#>, <#argument 3#>)

The *function* can be any expression whose value is of a functional type.

A function call expression can include a :newTerm:`trailing closure`
in the form of a closure expression immediately after the parenthesis.
The trailing closure is understood as an argument to the function,
added after the last parenthesized argument.
The following function calls are equivalent: ::

    exampleFunction(x, {$0 == 13})
    exampleFunction(x) {$0 == 13}

The parentheses can be omitted
the trailing closure is the functions's only argument: ::

    myData.process() {$0 * 2}
    myData.process {$0 * 2}

.. TR: Should we document the fact that multiple trailing closures work?
   The grammar box below and the prose above would need to change.

.. langref-grammar

    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+

.. syntax-grammar::

    Grammar of a function call expression

    function-call-expression --> postfix-expression parenthesized-expression trailing-closure-OPT
    function-call-expression --> postfix-expression parenthesized-expression-OPT trailing-closure
    trailing-closure --> closure-expressions

.. Multiple trailing closures in LangRef is an error,
   and so is the trailing typecast,
   per [Contributor 6004] 2014-03-04 email.


.. _Expressions_InitializerExpression:

Initializer Expression
~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`initializer expression` provides access
to a class's initializer.
It has the following form:

.. syntax-outline::

    <#class#>.init

The value of an initializer expression
is a function that can be called
to initialize a new instance of the class,
but can't be used as a value.
For example, the following is not allowed: ::

    var x = MyClass.init    // error

.. TR: Why is this function not like every other function?

.. langref-grammar

    expr-init ::= expr-postfix '.' 'init'

.. syntax-grammar::

    Grammar of an initializer expression

    initializer-expression --> postfix-expression ``.`` ``init``

.. _Expressions_DotExpression:

Dot Expression
~~~~~~~~~~~~~~

A :newTerm:`dot expression` allows access
to the members of a named type, a tuple, or a module.
It consists of a period (``.``) between the item
and the identifier of its member.

.. syntax-outline::

   <#expression#>.<#member name#>

The members of a named type are named
as part of the type's declaration or extension.
For example: ::

    class C { var x }
    var c = C()
    let y = c.x  // Member access

The members of a tuple
are implictly named using integers in the order they appear,
beginning with zero.
For example: ::

    var t = (10, 20, 30)
    t.0 = t.1
    // Now t is (20, 20, 30)

The member of a module access its top-level declarations.

.. TR: Confirm?

.. langref-grammar

    expr-dot ::= expr-postfix '.' dollarident
    expr-dot ::= expr-postfix '.' expr-identifier

.. syntax-grammar::

    Grammar of a dot expression

    dot-expression --> postfix-expression ``.`` decimal-digit
    dot-expression --> postfix-expression ``.`` named-expression

.. _Expressions_MetatypeExpression:

Self Expression
~~~~~~~~~~~~~~~

A :newTerm:`self expression` is an explicit reference
to a type or an instance of a type.
It has the following form:

.. syntax-outline::

   <#expression or type#>.self

On a type, ``self`` evaluates to the type itself.
It is used to refer to a type by name,
for example, to pass it as an argument to a function.

On an instance of a type, ``self`` evaluates to
the instance of the type.
It is used to specify scope when accessing members,
providing disambiguation when there is
another variable of the same name in scope,
such as a function parameter.

On either a type or an instance of a type,
the value of the self expression
has the same type as the expression or type before the period.

.. There is no definition for self-expression in the LangRef.
   This was probably just an oversight, according to Ted and Doug.

.. Both types and variables are identifier expressions,
   so postfix expression includes both.

.. syntax-grammar::

    Grammar of a self expression

    self-expression --> postfix-expression ``.`` ``self``

.. _Expressions_SubscriptExpression:

Subscript Expression
~~~~~~~~~~~~~~~~~~~~

A :newTerm:`subscript expression` provides access
to an item in a collection,
using the getter and setter
of the corresponding subscript declaration.
It has the following form:

.. syntax-outline::

   <#collection expression#>[<#index expressions#>]

To evaluate the value of a subscript expression,
getter of the *collection expression* is called
with the *index expressions* passed as the subscript parameters.
To set its value,
the setter is called in the same way.

.. TR: Confirm that inside the square brackets is an expression *list*,
   a comma-separated list of expressions.
   I see this, for example:
   (swift) class Test {
             subscript(a: Int, b: Int) -> Int { return 12 }
           }
   (swift) var t = Test()
   // t : Test = <Test instance>
   (swift) t[1, 2]
   // r0 : Int = 12


For information about subscript declarations,
see `Subscript Declaration`_.

.. langref-grammar

    expr-subscript ::= expr-postfix '[' expr ']'

.. syntax-grammar::

    Grammar of a subscript expression

    subscript-expression --> postfix-expression ``[`` expression-list ``]``


Forced Expression
~~~~~~~~~~~~~~~~~

A :newTerm:`forced expression` unwraps an optional value.
It has the following form:

.. syntax-outline::

   <#expression#>!

If the *expression* is of an optional type
and its value is not ``nil``,
the optional value is unwrapped
and returned with the corresponding non-optional type.
If its value is ``nil``, a runtime error is raised.

.. TR: In previous review, we noted that this also does downcast,
   but that doesn't match the REPL's behavior as of swift-600.0.23.1.11
    class A {}
    class B: A {}
    let l: Array<A> = [B(), A(), A()]
    var item: B = l[0] !        // Doesn't parse -- waiting for more expression
    var item: B = l[0]!         // Doesn't typecheck
    var item = l[0] as B!       // Ok

.. langref-grammar

    expr-force-value ::= expr-postfix '!'

.. syntax-grammar::

    Grammar of a forced-value expression

    forced-expression --> postfix-expression ``!``


Chained-Optional Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`chained-optional expression` provides a simplified synatax
for using optional values in postfix expressions.
It has the following form:

.. syntax-outline::

    <#expression#>?<#postfix operators#>

If the *expression* is not ``nil``,
the optional-member expression evaluates
to the unwrapped value of the expression,
and any chained postfix expression are evaluated.
Otherwise,
the chained-optional expression evaluates to ``nil``
and any chained postfix expressions are ignored.

Informally, all postfix expressions that follow the chained-optional expression
and are still part of the same expression
are understood to be chained to the chained-optional expression.
Specifically,
a postfix expression is :newTerm:`directly chained`
to the expression that is its first part.
A postfix expression is :newTerm:`chained` to an expression
if it is either directly chained to that expression
or if it is directly chained to another postfix expression
that is directly chained to that expression.
For example, in the expression ``x?.foo()[7]``
the array expression is directly chained
to the function call expression,
which is directly chained to the chained-optional expression.
Both the array expression and function call expression
are chained to the chained-optional expression;
they are both ignored if the value of ``x`` is ``nil``.

.. LangRef

   A postfix-expression E1 is said to directly chain to a
   postfix-expression E2 if E1 is syntactically the postfix-expression base
   of E2; note that this does not include any syntactic nesting, e.g. via
   parentheses. E1 chains to E2 if they are the same expression or E1
   directly chains to an expression which chains to E2. This relation has a
   maximum, called the largest chained expression.

   The largest chained expression of an expr-optional must be convertible to
   an r-value of type U? for some type U. Note that a single expression may
   be the largest chained expression of multiple expr-optionals.


.. langref-grammar

    expr-optional ::= expr-postfix '?'-postfix

.. syntax-grammar::

   Grammar of a chained optional expression

   chained-optional-expression --> postfix-expression ``?``

.. NOTE: The fact that ? must be postfix when it's used for Optional
   is in "Lexical Structure", under the discussion of left/right binding.
