Expressions

In Swift, there are four kinds of expressions: prefix expressions, binary expressions, primary expressions, and postfix expressions. Evaluating an expression returns a value, causes a side effect, or both.

Prefix and binary expressions let you apply operators to smaller expressions. Primary expressions are conceptually the simplest kind of expression, and they provide a way to access values. Postfix expressions, like prefix and binary expressions, let you build up more complex expressions using postfixes such as function calls and member access. Each kind of expression is described in detail in the sections below.

GRAMMAR OF AN EXPRESSION

expression → prefix-expression­binary-expressions­opt­
expression-list → expression­  expression­,­expression-list­
Prefix Expressions

Prefix expressions combine an optional prefix operator with an expression. Prefix operators take one argument, the expression that follows them.

The Swift standard library provides the following prefix operators:

++ Increment
-- Decrement
! Logical NOT
~ Bitwise NOT
+ Unary plus
- Unary minus
For information about the behavior of these operators, see Basic Operators and Advanced Operators.

In addition to the standard library operators listed above, you use & immediately before the name of a variable that’s being passed as an in-out argument to a function call expression. For more information and to see an example, see In-Out Parameters.

GRAMMAR OF A PREFIX EXPRESSION

prefix-expression → prefix-operator­opt­postfix-expression­
prefix-expression → in-out-expression­
in-out-expression → &­identifier­
Binary Expressions

Binary expressions combine an infix binary operator with the expression that it takes as its left-hand and right-hand arguments. It has the following form:

left-hand argument operator right-hand argument
The Swift standard library provides the following binary operators:

Exponentiative (No associativity, precedence level 160)
<< Bitwise left shift
>> Bitwise right shift
Multiplicative (Left associative, precedence level 150)
* Multiply
/ Divide
% Remainder
&* Multiply, ignoring overflow
&/ Divide, ignoring overflow
&% Remainder, ignoring overflow
& Bitwise AND
Additive (Left associative, precedence level 140)
+ Add
- Subtract
&+ Add with overflow
&- Subtract with overflow
| Bitwise OR
^ Bitwise XOR
Range (No associativity, precedence level 135)
.. Half-closed range
... Closed range
Cast (No associativity, precedence level 132)
is Type check
as Type cast
Comparative (No associativity, precedence level 130)
< Less than
<= Less than or equal
> Greater than
>= Greater than or equal
== Equal
!= Not equal
=== Identical
!== Not identical
~= Pattern match
Conjunctive (Left associative, precedence level 120)
&& Logical AND
Disjunctive (Left associative, precedence level 110)
|| Logical OR
Ternary Conditional (Right associative, precedence level 100)
?: Ternary conditional
Assignment (Right associative, precedence level 90)
= Assign
*= Multiply and assign
/= Divide and assign
%= Remainder and assign
+= Add and assign
-= Subtract and assign
<<= Left bit shift and assign
>>= Right bit shift and assign
&= Bitwise AND and assign
^= Bitwise XOR and assign
|= Bitwise OR and assign
&&= Logical AND and assign
||= Logical OR and assign
For information about the behavior of these operators, see Basic Operators and Advanced Operators.

NOTE

At parse time, an expression made up of binary operators is represented as a flat list. This list is transformed into a tree by applying operator precedence For example, the expression 2 + 3 * 5 is initially understood as a flat list of five items, 2, +, `` 3``, *, and 5. This process transforms it into the tree (2 + (3 * 5)).

GRAMMAR OF A BINARY EXPRESSION

binary-expression → binary-operator­prefix-expression­
binary-expression → assignment-operator­prefix-expression­
binary-expression → conditional-operator­prefix-expression­
binary-expression → type-casting-operator­
binary-expressions → binary-expression­binary-expressions­opt­
Assignment Operator

The assigment operator sets a new value for a given expression. It has the following form:

expression = value
The value of the expression is set to the value obtained by evaluating the value. If the expression is a tuple, the value must be a tuple with the same number of elements. (Nested tuples are allowed.) Assignment is performed from each part of the value to the corresponding part of the expression. For example:

(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a is "test", b is 12, c is 3, and 9.45 is ignored
The assignment operator does not return any value.

GRAMMAR OF AN ASSIGNMENT OPERATOR

assignment-operator → =­
Ternary Conditional Operator

The ternary conditional operator evaluates to one of two given values based on the value of a condition. It has the following form:

condition ? expression used if true : expression used if false
If the condition evaluates to true, the conditional operator evaluates the first expression and returns its value. Otherwise, it evaluates the second expression and returns its value. The unused expression is not evaluated.

For an example that uses the ternary conditional operator, see Ternary Conditional Operator.

GRAMMAR OF A CONDITIONAL OPERATOR

conditional-operator → ?­expression­:­
Type-Casting Operators

There are two type-casting operators, the as operator and the is operator. They have the following form:

expression as type
expression as? type
expression is type
The as operator performs a cast of the expression to the specified type. It behaves as follows:

If conversion to the specified type is guaranteed to succeed, the value of the expression is returned as an instance of the specified type. An example is casting from a subclass to a superclass.
If conversion to the specified type is guaranteed to fail, a compile-time error is raised.
Otherwise, if it’s not known at compile time whether the conversion will succeed, the type of the cast expresion is an optional of the specified type. At runtime, if the cast succeeds, the value of expression is wrapped in an optional and returned; otherwise, the value returned is nil. An example is casting from a superclass to a subclass.
class SomeSuperType {}
class SomeType: SomeSuperType {}
class SomeChildType: SomeType {}
let s = SomeType()

let x = s as SomeSuperType  // known to succeed; type is SomeSuperType
let y = s as Int            // known to fail; compile-time error
let z = s as SomeChildType  // might fail at runtime; type is SomeChildType?
Specifying a type with as provides the same information to the compiler as a type annotation, as shown in the following example:

let y1 = x as SomeType  // Type information from 'as'
let y2: SomeType = x    // Type information from an annotation
The is operator checks at runtime to see whether the expression is of the specified type. If so, it returns true; otherwise, it returns false.

The check must not be known to be true or false at compile time. The following are invalid:

"hello" is String
"hello" is Int
For more information about type casting and to see more examples that use the type-casting operators, see Type Casting.

GRAMMAR OF A TYPE-CASTING OPERATOR

type-casting-operator → is­type­  as­?­opt­type­
Primary Expressions

Primary expressions are the most basic kind of expression. They can be used as expressions on their own, and they can be combined with other tokens to make prefix expressions, binary expressions, and postfix expressions.

GRAMMAR OF A PRIMARY EXPRESSION

primary-expression → identifier­generic-argument-clause­opt­
primary-expression → literal-expression­
primary-expression → self-expression­
primary-expression → superclass-expression­
primary-expression → closure-expression­
primary-expression → parenthesized-expression­
primary-expression → implicit-member-expression­
primary-expression → wildcard-expression­
Literal Expression

A literal expression consists of either an ordinary literal (such as a string or a number), an array or dictionary literal, or one of the following special literals:

Literal
Type
Value
__FILE__
String
The name of the file in which it appears.
__LINE__
Int
The line number on which it appears.
__COLUMN__
Int
The column number in which it begins.
__FUNCTION__
String
The name of the declaration in which it appears.
Inside a function, the value of __FUNCTION__ is the name of that function, inside a method it is the name of that method, inside a property getter or setter it is the name of that property, inside special members like init or subscript it is the name of that keyword, and at the top level of a file it is the name of the current module.

An array literal is an ordered collection of values. It has the following form:

[value 1, value 2, ...]
The last expression in the array can be followed by an optional comma. An empty array literal is written as an empty pair of brackets ([]). The value of an array literal has type T[], where T is the type of the expressions inside it. If there are expressions of multiple types, T is their closest common supertype.

A dictionary literal is an unordered collection of key-value pairs. It has the following form:

[key 1: value 1, key 2: value 2, ...]
The last expression in the dictionary can be followed by an optional comma. An empty dictionary literal is written as a colon inside a pair of brackets ([:]) to distinguish it from an empty array literal. The value of a dictionary literal has type Dictionary<KeyType, ValueType>, where KeyType is the type of its key expressions and ValueType is the type of its value expressions. If there are expressions of multiple types, KeyType and ValueType are the closest common supertype for their respective values.

GRAMMAR OF A LITERAL EXPRESSION

literal-expression → literal­
literal-expression → array-literal­  dictionary-literal­
literal-expression → __FILE__­  __LINE__­  __COLUMN__­  __FUNCTION__­
array-literal → [­array-literal-items­opt­]­
array-literal-items → array-literal-item­,­opt­  array-literal-item­,­array-literal-items­
array-literal-item → expression­
dictionary-literal → [­dictionary-literal-items­]­  [­:­]­
dictionary-literal-items → dictionary-literal-item­,­opt­  dictionary-literal-item­,­dictionary-literal-items­
dictionary-literal-item → expression­:­expression­
Self Expression

The self expression is an explicit reference to the current type or instance of the type in which it occurs. It has the following forms:

self
self.member name
self[subscript index]
self(initializer arguments)
self.init(initializer arguments)
In an initializer, subscript, or instance method, self refers to the current instance of the type in which it occurs. In a static or class method, self refers to the current type in which it occurs.

The self expression is used to specify scope when accessing members, providing disambiguation when there is another variable of the same name in scope, such as a function parameter. For example:

class SomeClass {
    var greeting: String
    init(greeting: String) {
        self.greeting = greeting
    }
}
In a mutating method of value type, you can assign a new instance of that value type to self. For example:

struct Point {
    var x = 0.0, y = 0.0
    mutating func moveByX(deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
GRAMMAR OF A SELF EXPRESSION

self-expression → self­
self-expression → self­.­identifier­
self-expression → self­[­expression­]­
self-expression → self­.­init­
Superclass Expression

A superclass expression lets a class interact with its superclass. It has one of the following forms:

super.member name
super[subscript index]
super.init(initializer arguments)
The first form is used to access a member of the superclass. The second form is used to access the superclass’s subscript implementation. The third form is used to access an initializer of the superclass.

Subclasses can use a superclass expression in their implementation of members, subscripting, and initializers to make use of the implementation in their superclass.

GRAMMAR OF A SUPERCLASS EXPRESSION

superclass-expression → superclass-method-expression­  superclass-subscript-expression­ superclass-initializer-expression­
superclass-method-expression → super­.­identifier­
superclass-subscript-expression → super­[­expression­]­
superclass-initializer-expression → super­.­init­
Closure Expression

A closure expression creates a closure, also known as a lambda or an anonymous function in other programming languages. Like function declarations, closures contain statements which they execute, and they capture values from their enclosing scope. It has the following form:

{ (parameters) -> return type in
    statements
}
The parameters have the same form as the parameters in a function declaration, as described in Function Declaration.

There are several special forms that allow closures to be written more concisely:

A closure can omit the types of its parameters, its return type, or both. If you omit the parameter names and both types, omit the in keyword before the statements. If the omitted types can’t be inferred, a compile-time error is raised.
A closure may omit names for its parameters. Its parameters are then implicitly named $ followed by their position: $0, $1, $2, and so on.
A closure that consists of only a single expression is understood to return the value of that expression. The contents of this expression is also considered when performing type inference on the surrounding expression.
The following closure expressions are equivalent:

myFunction {
    (x: Int, y: Int) -> Int in
    return x + y
}

myFunction {
    (x, y) in
    return x + y
}

myFunction { return $0 + $1 }

myFunction { $0 + $1 }
For information about passing a closure as an argument to a function, see Function Call Expression.

A closure expression can explicitly specify the values that it captures from the surrounding scope using a capture list. A capture list is written as a comma separated list surrounded by square brackets, before the list of parameters. If you use a capture list, you must also use the in keyword, even if you omit the parameter names, parameter types, and return type.

Each entry in the capture list can be marked as weak or unowned to capture a weak or unowned reference to the value.

myFunction { print(self.title) }                    // strong capture
myFunction { [weak self] in print(self!.title) }    // weak capture
myFunction { [unowned self] in print(self.title) }  // unowned capture
You can also bind arbitrary expression to named values in the capture list. The expression is evaluated when the closure is formed, and captured with the specified strength. For example:

// Weak capture of "self.parent" as "parent"
myFunction { [weak parent = self.parent] in print(parent!.title) }
For more information and examples of closure expressions, see Closure Expressions.

GRAMMAR OF A CLOSURE EXPRESSION

closure-expression → {­closure-signature­opt­statements­}­
closure-signature → parameter-clause­function-result­opt­in­
closure-signature → identifier-list­function-result­opt­in­
closure-signature → capture-list­parameter-clause­function-result­opt­in­
closure-signature → capture-list­identifier-list­function-result­opt­in­
closure-signature → capture-list­in­
capture-list → [­capture-specifier­expression­]­
capture-specifier → weak­  unowned­  unowned(safe)­  unowned(unsafe)­
Implicit Member Expression

An implicit member expression is an abbreviated way to access a member of a type, such as an enumeration case or a class method, in a context where type inference can determine the implied type. It has the following form:

.member name
For example:

var x = MyEnumeration.SomeValue
x = .AnotherValue
GRAMMAR OF A IMPLICIT MEMBER EXPRESSION

implicit-member-expression → .­identifier­
Parenthesized Expression

A parenthesized expression consists of a comma-separated list of expressions surrounded by parentheses. Each expression can have an optional identifier before it, separated by a colon (:). It has the following form:

(identifier 1: expression 1, identifier 2: expression 2, ...)
Use parenthesized expressions to create tuples and to pass arguments to a function call. If there is only one value inside the parenthesized expression, the type of the parenthesized expression is the type of that value. For example, the type of the parenthesized expression (1) is Int, not (Int).

GRAMMAR OF A PARENTHESIZED EXPRESSION

parenthesized-expression → (­expression-element-list­opt­)­
expression-element-list → expression-element­  expression-element­,­expression-element-list­
expression-element → expression­  identifier­:­expression­
Wildcard Expression

A wildcard expression is used to explicitly ignore a value during an assignment. For example, in the following assignment 10 is assigned to x and 20 is ignored:

(x, _) = (10, 20)
// x is 10, 20 is ignored
GRAMMAR OF A WILDCARD EXPRESSION

wildcard-expression → _­
Postfix Expressions

Postfix expressions are formed by applying a postfix operator or other postfix syntax to an expression. Syntactically, every primary expression is also a postfix expression.

The Swift standard library provides the following postfix operators:

++ Increment
-- Decrement
For information about the behavior of these operators, see Basic Operators and Advanced Operators.

GRAMMAR OF A POSTFIX EXPRESSION

postfix-expression → primary-expression­
postfix-expression → postfix-expression­postfix-operator­
postfix-expression → function-call-expression­
postfix-expression → initializer-expression­
postfix-expression → explicit-member-expression­
postfix-expression → postfix-self-expression­
postfix-expression → dynamic-type-expression­
postfix-expression → subscript-expression­
postfix-expression → forced-value-expression­
postfix-expression → optional-chaining-expression­
Function Call Expression

A function call expression consists of a function name followed by a comma-separated list of the function’s arguments in parentheses. Function call expressions have the following form:

function name(argument value 1, argument value 2)
The function name can be any expression whose value is of a function type.

If the function definition includes names for its parameters, the function call must include names before its argument values separated by a colon (:). This kind of function call expression has the following form:

function name(argument name 1: argument value 1, argument name 2: argument value 2)
A function call expression can include a trailing closure in the form of a closure expression immediately after the closing parenthesis. The trailing closure is understood as an argument to the function, added after the last parenthesized argument. The following function calls are equivalent:

// someFunction takes an integer and a closure as its arguments
someFunction(x, {$0 == 13})
someFunction(x) {$0 == 13}
If the trailing closure is the function’s only argument, the parentheses can be omitted.

// someFunction takes a closure as its only argument
myData.someMethod() {$0 == 13}
myData.someMethod {$0 == 13}
GRAMMAR OF A FUNCTION CALL EXPRESSION

function-call-expression → postfix-expression­parenthesized-expression­
function-call-expression → postfix-expression­parenthesized-expression­opt­trailing-closure­
trailing-closure → closure-expression­
Initializer Expression

An initializer expression provides access to a type’s initializer. It has the following form:

expression.init(initializer arguments)
You use the initializer expression in a function call expression to initialize a new instance of a type. Unlike functions, an initializer can’t be used as a value. For example:

var x = SomeClass.someClassFunction // ok
var y = SomeClass.init              // error
You also use an initializer expression to delegate to the initializer of a superclass.

class SomeSubClass: SomeSuperClass {
    init() {
        // subclass initialization goes here
        super.init()
    }
}
GRAMMAR OF AN INITIALIZER EXPRESSION

initializer-expression → postfix-expression­.­init­
Explicit Member Expression

A explicit member expression allows access to the members of a named type, a tuple, or a module. It consists of a period (.) between the item and the identifier of its member.

expression.member name
The members of a named type are named as part of the type’s declaration or extension. For example:

class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // Member access
The members of a tuple are implicitly named using integers in the order they appear, starting from zero. For example:

var t = (10, 20, 30)
t.0 = t.1
// Now t is (20, 20, 30)
The members of a module access the top-level declarations of that module.

GRAMMAR OF AN EXPLICIT MEMBER EXPRESSION

explicit-member-expression → postfix-expression­.­decimal-digit­
explicit-member-expression → postfix-expression­.­identifier­generic-argument-clause­opt­
Postfix Self Expression

A postfix self expression consists of an expression or the name of a type, immediately followed by .self. It has the following forms:

expression.self
type.self
The first form evaluates to the value of the expression. For example, x.self evaluates to x.

The second form evaluates to the value of the type. Use this form to access a type as a value. For example, because SomeClass.self evaluates to the SomeClass type itself, you can pass it to a function or method that accepts a type-level argument.

GRAMMAR OF A SELF EXPRESSION

postfix-self-expression → postfix-expression­.­self­
Dynamic Type Expression

A dynamicType expression consists of an expression, immediately followed by .dynamicType. It has the following form:

expression.dynamicType
The expression can’t be the name of a type. The entire dynamicType expression evaluates to the value of the runtime type of the expression, as the following example shows:

class SomeBaseClass {
    class func printClassName() {
        println("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        println("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()
// someInstance is of type SomeBaseClass at compile time, but
// someInstance is of type SomeSubClass at runtime
someInstance.dynamicType.printClassName()
// prints "SomeSubClass"
GRAMMAR OF A DYNAMIC TYPE EXPRESSION

dynamic-type-expression → postfix-expression­.­dynamicType­
Subscript Expression

A subscript expression provides subscript access using the getter and setter of the corresponding subscript declaration. It has the following form:

expression[index expressions]
To evaluate the value of a subscript expression, the subscript getter for the expression’s type is called with the index expressions passed as the subscript parameters. To set its value, the subscript setter is called in the same way.

For information about subscript declarations, see Protocol Subscript Declaration.

GRAMMAR OF A SUBSCRIPT EXPRESSION

subscript-expression → postfix-expression­[­expression-list­]­
Forced-Value Expression

A forced-value expression unwraps an optional value that you are certain is not nil. It has the following form:

expression!
If the value of the expression is not nil, the optional value is unwrapped and returned with the corresponding nonoptional type. Otherwise, a runtime error is raised.

GRAMMAR OF A FORCED-VALUE EXPRESSION

forced-value-expression → postfix-expression­!­
Optional-Chaining Expression

An optional-chaining expression provides a simplified syntax for using optional values in postfix expressions. It has the following form:

expression?
On its own, the postfix ? operator simply returns the value of its argument as an optional.

Postfix expressions that contain an optional-chaining expression are evaluated in a special way. If the optional-chaining expression is nil, all of the other operations in the postfix expression are ignored and the entire postfix expression evaluates to nil. If the optional-chaining expression is not nil, the value of the optional-chaining expression is unwrapped and used to evaluate the rest of the postfix expression. In either case, the value of the postfix expression is still of an optional type.

If a postfix expression that contains an optional-chaining expression is nested inside other postfix expressions, only the outermost expression returns an optional type. In the example below, when c is not nil, its value is unwrapped and used to evaluate both .property and .performAction(), and the entire expression c?.property.performAction() has a value of an optional type.

var c: SomeClass?
var result: Bool? = c?.property.performAction()
The following example shows the behavior of the example above without using optional chaining.

if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}
GRAMMAR OF AN OPTIONAL-CHAINING EXPRESSION

optional-chaining-expression → postfix-expression­?­
