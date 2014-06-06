# 基础运算符

运算符是检查, 改变, 合并值的特殊符号或短语. 例如, 加号`+`把计算两个数的和(如 `let i = 1 + 2`). 复杂些的运行算包括逻辑与`&&`(如 `if enteredDoorCode && passedRetinaScan`), 还有自增运算符 `++i`, 这一个自身加一的快捷操作.

Swift支持大部分标准C的运算符, 且改进许多项来获得减少常规编码错误. 赋值符`=`不返回值, 以防止出现错把等号 `==` 写成赋值号 `=` 导致的Bug. 数值运算符(`+`, `-`, `*`, `/`, `%`等)会检测并不允许值溢出, 以此来避免保存变量时由于变量大于或小于其类型所能承载的范围时导致的异常结果. 你可以选择使用Swift的溢出运算符来玩溢出. 具体使用请移步[溢出运算符](http://#).

与C不同, Swift中你可以对浮点数进行取余运算(`%`). Swift也提供在C语言没有的表达两数之间的范围操作符, (`a..b`和`a...b`),这方便我们表达一个范围的数值.

本章节只描述了Swift中的常规运算符, [高级运算符](http://#)包含了高级运算符,及如何自定义运算符,及自定义类型的运算符重载.


‌# 术语
运算符有一目,双目和三目运算符.

一目运算符对单一操作对象操作, 如`-a`. 

一目运算符分前置符和后置运算符, 前置运算符需紧排操作对象之前, 如`!b`, 后置运算符需紧跟操作对象之后,如`i++`,

双目运算符操作两个操作对象, 如`2 + 3`. 是中置的, 因为它们出现在两个操作对象之间.

三目运算符操作三个操作对象, 跟C一样, Swift只有一个三目运算符, 就是三目条件运算符 `a ? b : c`.

受运算符影响的值叫操作数, 在表达式`1 + 2`中, 加号`+`是双目运算符, 它的两个操作数是值`1`和`2`.


‌
# 赋值运算符

赋值运算 `a = b`, 表示用`b`的值来初始化或更新`a`的值.

```
let b = 10
var a = 5
a = b
// a 现在等于 10
```

如果赋值的右边是一个多元组, 它的元素可以马上被分解多个变量或变量
```
let (x, y) = (1, 2)
// 现在 x 等于 1, y 等于 2
```
与C和Objective-C又不同了, Swift的赋值操作并不返回任何值. 所以以下代码是错误的:

```
if x = y {
    // 此句错误, 因为 x = y 并不返回任何值
}
```

这个特性使得你不能够再把`==`错写成`=`了, 由于`if x = y`是错误代码, Swift从底层帮你避免了这些代码错误.

# 数值运算
Swift让所有数值类型都支持了基本的四则运算:
- 加法 (+)
- 减法 (-)
- 乘法 (*)
- 除法 (/)

```
1 + 2       // 等于 3
5 - 3       // 等于 2
2 * 3       // 等于 6
10.0 / 2.5  // 等于 4.0
```

又与C和Objective-C不一样了, Swift默认不允许数值运算出现溢出. 但你可以使用Swift的溢出运算符来达到你的目的, (如 `a &+ b` ). 详情请移步: [溢出运算符](http://#).

加法操作也可以用于字符串的拼接:

```
"hello, " + "world"  // 等于 "hello, world"
```

两个字符类型或一个字符类型和一个字符串类型, 相加会生成一个新的字符串类型:

```
let dog: Character = "🐶"
let cow: Character = "🐮"
let dogCow = dog + cow
// dogCow 现在是 "🐶🐮"
```
详细请点击 [字符,字符串的拼接](http://#).

‌# 求余运算

求余运算`a % b`是计算`b`的多少倍刚好可以装进`a`, 多出来的那部分叫余数.

> 注意

> 求余运算(%)在其他语言也叫取模运算. 然而, 鉴于在Swift中该运算符对负数的操作结果, 严格来说, 求余比取模更合适些.

我们来谈谈取余是怎么回事, 计算 `9 % 4`, 你先计算出4的多少倍会刚好可以装进`9`中. 
2, 好的, 余数是1 (用橙色标出)

```
传说这里有张求余数的图...
传说这里有张求余数的图...
```

在Swift中这么来表达

```
9 % 4    // 等于 1
```

为了得到`a % b`的结果, `%`计算了以下等式, 并输出`余数`作为结果:
```
a = (b × `倍数`) + `余数`
```
当`倍数`取最大值的时候, 就会刚好可以装进`a`中.

把 `9` 和 `4` 代入等式中:

```
9 = (4 × 2) + 1
```

同样的方法, 我来们计算`-9 % 4`:
```
-9 % 4   // equals -1
```

把 `-9` 和 4 代入等式:

```
-9 = (4 × -2) + -1
```

等于余数是-1.

在对负数的`b`求余时, `b`的符号会被忽略. 这意味着 `a % b` 和 `a % -b`的结果是相同的.

# 浮点数的求余计算

Floating-Point Remainder Calculations
Unlike the remainder operator in C and Objective-C, Swift’s remainder operator can also operate on floating-point numbers:

“8 % 2.5   // equals 0.5
In this example, 8 divided by 2.5 equals 3, with a remainder of 0.5, so the remainder operator returns a Double value of 0.5.

 
‌
Increment and Decrement Operators
Like C, Swift provides an increment operator (++) and a decrement operator (--) as a shortcut to increase or decrease the value of a numeric variable by 1. You can use these operators with variables of any integer or floating-point type.

var i = 0
++i      // i now equals 1
Each time you call ++i, the value of i is increased by 1. Essentially, ++i is shorthand for saying i = i + 1. Likewise, --i can be used as shorthand for i = i - 1.

The ++ and -- symbols can be used as prefix operators or as postfix operators. ++i and i++ are both valid ways to increase the value of i by 1. Similarly, --i and i-- are both valid ways to decrease the value of i by 1.

Note that these operators modify i and also return a value. If you only want to increment or decrement the value stored in i, you can ignore the returned value. However, if you do use the returned value, it will be different “based on whether you used the prefix or postfix version of the operator, according to the following rules:

If the operator is written before the variable, it increments the variable before returning its value.
If the operator is written after the variable, it increments the variable after returning its value.
For example:

var a = 0
let b = ++a
// a and b are now both equal to 1
let c = a++
// a is now equal to 2, but c has been set to the pre-increment value of 1
In the example above, let b = ++a increments a before returning its value. This is why both a and b are equal to to the new value of 1.

However, let c = a++ increments a after returning its value. This means that c gets the old value of 1, and a is then updated to equal 2.

Unless you need the specific behavior of i++, it is recommended that you use ++i and --i in all cases, because they have the typical expected behavior of modifying i and returning the result.

“Unary Minus Operator
The sign of a numeric value can be toggled using a prefixed -, known as the unary minus operator:

let three = 3
let minusThree = -three       // minusThree equals -3
let plusThree = -minusThree   // plusThree equals 3, or "minus minus three"
The unary minus operator (-) is prepended directly before the value it operates on, without any white space.

‌
Unary Plus Operator
The unary plus operator (+) simply returns the value it operates on, without any change:

let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSix equals -6
Although the unary plus operator doesn’t actually do anything, you can use it to provide symmetry in your code for positive numbers when also using the unary minus operator for negative numbers.

“Compound Assignment Operators
Like C, Swift provides compound assignment operators that combine assignment (=) with another operation. One example is the addition assignment operator (+=):

var a = 1
a += 2
// a is now equal to 3
The expression a += 2 is shorthand for a = a + 2. Effectively, the addition and the assignment are combined into one operator that performs both tasks at the same time.

NOTE

The compound assignment operators do not return a value. You cannot write let b = a += 2, for example. This behavior is different from the increment and decrement operators mentioned above.

A complete list of compound assignment operators can be found in [Expressions](http://#).

‌
Comparison Operators
Swift supports all standard C comparison operators:

Equal to (a == b)
Not equal to (a != b)

“Greater than (a > b)
Less than (a < b)
Greater than or equal to (a >= b)
Less than or equal to (a <= b)
NOTE

Swift also provides two identity operators (=== and !==), which you use to test whether two object references both refer to the same object instance. For more information, see [Classes and Structures](http://#).

Each of the comparison operators returns a Bool value to indicate whether or not the statement is true:

1 == 1   // true, because 1 is equal to 1
2 != 1   // true, because 2 is not equal to 1
2 > 1    // true, because 2 is greater than 1
1 < 2    // true, because 1 is less than 2
1 >= 1   // true, because 1 is greater than or equal to 1
2 <= 1   // false, because 2 is not less than or equal to 1
Comparison operators are often used in conditional statements, such as the if statement:


“let name = "world"
if name == "world" {
    println("hello, world")
} else {
    println("I'm sorry \(name), but I don't recognize you")
}
// prints "hello, world", because name is indeed equal to "world"
For more on the if statement, see Control Flow.

‌
Ternary Conditional Operator
The ternary conditional operator is a special operator with three parts, which takes the form question ? answer1 : answer2. It is a shortcut for evaluating one of two expressions based on whether question is true or false. If question is true, it evaluates answer1 and returns its value; otherwise, it evaluates answer2 and returns its value.

The ternary conditional operator is shorthand for the code below:

if question {
    answer1
} else {
    answer2
}
Here’s an example, which calculates the pixel height for a table row. The row height should be 50 pixels taller “than the content height if the row has a header, and 20 pixels taller if the row doesn’t have a header:

let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
// rowHeight is equal to 90
The preceding example is shorthand for the code below:

let contentHeight = 40
let hasHeader = true
var rowHeight = contentHeight
if hasHeader {
    rowHeight = rowHeight + 50
} else {
    rowHeight = rowHeight + 20
}
// rowHeight is equal to 90
The first example’s use of the ternary conditional operator means that rowHeight can be set to the correct value on a single line of code. This is more concise than the second example, and removes the need for rowHeight to be a variable, because its value does not need to be modified within an if statement.

“The ternary conditional operator provides an efficient shorthand for deciding which of two expressions to consider. Use the ternary conditional operator with care, however. Its conciseness can lead to hard-to-read code if overused. Avoid combining multiple instances of the ternary conditional operator into one compound statement.

‌
Range Operators
Swift includes two range operators, which are shortcuts for expressing a range of values.

‌
Closed Range Operator
The closed range operator (a...b) defines a range that runs from a to b, and includes the values a and b.

The closed range operator is useful when iterating over a range in which you want all of the values to be used, such as with a for-in loop:

for index in 1...5 {
    println("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
For more on for-in loops, see [Control Flow](http://#). 

“Half-Closed Range Operator
The half-closed range operator (a..b) defines a range that runs from a to b, but does not include b. It is said to be half-closed because it contains its first value, but not its final value.

Half-closed ranges are particularly useful when you work with zero-based lists such as arrays, where it is useful to count up to (but not including) the length of the list:

let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..count {
    println("Person \(i + 1) is called \(names[i])")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack
Note that the array contains four items, but 0..count only counts as far as 3 (the index of the last item in the array), because it is a half-closed range. For more on arrays, see [Arrays](http://#).


“Logical Operators
Logical operators modify or combine the Boolean logic values true and false. Swift supports the three standard logical operators found in C-based languages:

Logical NOT (!a)
Logical AND (a && b)
Logical OR (a || b)
‌
Logical NOT Operator
The logical NOT operator (!a) inverts a Boolean value so that true becomes false, and false becomes true.

The logical NOT operator is a prefix operator, and appears immediately before the value it operates on, without any white space. It can be read as “not a”, as seen in the following example:

let allowedEntry = false
if !allowedEntry {
    println("ACCESS DENIED")
}
// prints "ACCESS DENIED"
The phrase if !allowedEntry can be read as “if not allowed entry.” The subsequent line is only executed if “not allowed entry” is true; that is, if allowedEntry is false.

As in this example, careful choice of Boolean constant and variable names can help to keep code readable and concise, while avoiding double negatives or confusing logic statements.

“Logical AND Operator
The logical AND operator (a && b) creates logical expressions where both values must be true for the overall expression to also be true.

If either value is false, the overall expression will also be false. In fact, if the first value is false, the second value won’t even be evaluated, because it can’t possibly make the overall expression equate to true. This is known as short-circuit evaluation.

This example considers two Bool values and only allows access if both values are true:

let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// prints "ACCESS DENIED

“Logical OR Operator
The logical OR operator (a || b) is an infix operator made from two adjacent pipe characters. You use it to create logical expressions in which only one of the two values has to be true for the overall expression to be true.

Like the Logical AND operator above, the Logical OR operator uses short-circuit evaluation to consider its expressions. If the left side of a Logical OR expression is true, the right side is not evaluated, because it cannot change the outcome of the overall expression.

In the example below, the first Bool value (hasDoorKey) is false, but the second value (knowsOverridePassword) is true. Because one value is true, the overall expression also evaluates to true, and access is allowed:

let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// prints "Welcome!"
‌
Combining Logical Operators
You can combine multiple logical operators to create longer compound expressions:

“if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// prints "Welcome!"
This example uses multiple && and || operators to create a longer compound expression. However, the && and || operators still operate on only two values, so this is actually three smaller expressions chained together. It can be read as:

If we’ve entered the correct door code and passed the retina scan; or if we have a valid door key; or if we know the emergency override password, then allow access.

Based on the values of enteredDoorCode, passedRetinaScan, and hasDoorKey, the first two mini-expressions are false. However, the emergency override password is known, so the overall compound expression still evaluates to true.

‌
Explicit Parentheses
It is sometimes useful to include parentheses when they are not strictly needed, to make the intention of a complex expression easier to read. In the door access example above, it is useful to add parentheses around the first part of the compound expression to make its intent explicit:

if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// prints "Welcome!"
The parentheses make it clear that the first two values are considered as part of a separate possible state in the overall logic. “The output of the compound expression doesn’t change, but the overall intention is clearer to the reader. Readability is always preferred over brevity; use parentheses where they help to make your intentions clear.
