# 基础运算符

运算符是检查, 改变, 合并值的特殊符号或短语. 例如, 加号`+`把计算两个数的和(如 `let i = 1 + 2`). 复杂些的运行算包括逻辑与`&&`(如 `if enteredDoorCode && passedRetinaScan`), 还有自增运算符 `++i`, 这一个自身增加一的快捷操作.

Swift supports most standard C operators and improves several capabilities to eliminate common coding errors. The assignment operator (=) does not return a value, to prevent it from being mistakenly used when the equal to operator (==) is intended. Arithmetic operators (+, -, *, /, % and so forth) detect and disallow value overflow, to avoid unexpected results when working with numbers that become larger or smaller than the allowed value range of the type that stores them. You can opt in to value overflow behavior by using Swift’s overflow operators, as described in Overflow Operators.

Unlike C, Swift lets you perform remainder (%) calculations on floating-point numbers. Swift also provides two range operators (a..b and a...b) not found in C, as a shortcut for expressing a range of values.

This chapter describes the common operators in Swift. Advanced Operators[…]”

Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/cn/jEUH0.l

“Terminology
Operators are unary, binary, or ternary:

Unary operators operate on a single target (such as -a). Unary prefix operators appear immediately before their target (such as !b), and unary postfix operators appear immediately after their target (such as i++).
Binary operators operate on two targets (such as 2 + 3) and are infix because they appear in between their two targets.
Ternary operators operate on three targets. Like C, Swift has only one ternary operator, the ternary conditional operator (a ? b : c).”

Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/cn/jEUH0.l

“The values that operators affect are operands. In the expression 1 + 2, the + symbol is a binary operator and its two operands are the values 1 and 2.

‌
Assignment Operator
The assignment operator (a = b) initializes or updates the value of a with the value of b:

let b = 10
var a = 5
a = b
// a is now equal to 10
If the right side of the assignment is a tuple with multiple values, its elements can be decomposed into multiple constants or variables at once:

let (x, y) = (1, 2)
// x is equal to 1, and y is equal to 2
Unlike the assignment operator in C and Objective-C, the assignment operator in Swift does not itself return a value. The following statement is not valid:

if x = y {
    // this is not valid, because x = y does not return a value
}
This feature prevents the assignment operator (=) from being used by accident when the equal to operator (==) is actually intended. By making if x = y invalid, Swift helps you to avoid these kinds of errors in your code.

‌
Arithmetic Operators
Swift supports the four standard arithmetic operators for all number types:

Addition (+)
Subtraction (-)
Multiplication (*)
Division (/)
1 + 2[…]”

Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/cn/jEUH0.l

“Unlike the arithmetic operators in C and Objective-C, the Swift arithmetic operators do not allow values to overflow by default. You can opt in to value overflow behavior by using Swift’s overflow operators (such as a &+ b). See Overflow Operators.

The addition operator is also supported for String concatenation:

"hello, " + "world"  // equals "hello, world"
Two Character values, or one Character value and one String value, can be added together to make a new String value:

let dog: Character = "🐶"
let cow: Character = "🐮"
let dogCow = dog + cow
// dogCow is equal to "🐶🐮"
See also Concatenating Strings and Characters.

‌
Remainder Operator
The remainder operator (a % b) works out how many multiples of b will fit inside a and returns the value that is left over (known as the remainder).

NOTE

The remainder operator (%) is also known as a modulo operator in other languages. However, its behavior in Swift for negative numbers means that it is, strictly speaking, a remainder rather than a modulo operation.

Here’s how the remainder operator works. To calculate 9 % 4, you first work out how many 4s will fit inside 9:

 
You can fit two 4s inside 9, and the remainder is 1 (shown in orange).

In Swift, this be written as:

9 % 4    // equals 1
To determine the answer for a % b, the % operator calculates the following equation and returns remainder as its output:

a = (b × some multiplier) + remainder

where some multiplier is the largest number of multiples of”

Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/cn/jEUH0.l

