In addition to the operators described in [Basic Operators](Basic Operators), Swift provides several advanced operators that perform more complex value manipulation. These include all of the bitwise and bit shifting operators you will be familiar with from C and Objective-C.

除于[基本操作符](Basic Operators)中所讲的运算符, Swift还有许多复杂的高级运算符, 包括了C语和Objective-C中的位运算符和位移运算.

Unlike arithmetic operators in C, arithmetic operators in Swift do not overflow by default. Overflow behavior is trapped and reported as an error. To opt in to overflow behavior, use Swift’s second set of arithmetic operators that overflow by default, such as the overflow addition operator (&+). All of these overflow operators begin with an ampersand (&).

不同于C语言中的数值计算, Swift的数值计算默认是不可溢出的. 溢出行为会被捕获并报告为错误. 你是故意的? 好吧, 你可以使用Swift为你准备的另一套默认允许溢出的数值运算符, 如可溢出加 `&+`. 所有允许溢出的运算符都是以 `&` 开始的.

When you define your own structures, classes, and enumerations, it can be useful to provide your own implementations of the standard Swift operators for these custom types. Swift makes it easy to provide tailored implementations of these operators and to determine exactly what their behavior should be for each type you create.

自定义的结构, 类和枚举, 是否可以使用标准的运算符来定义操作? 当然可以, 在Swift中, 你可以对你创建的类型定制运算符的行为.

You’re not just limited to the predefined operators. Swift gives you the freedom to define your own custom infix, prefix, postfix, and assignment operators, with custom precedence and associativity values. These operators can be used and adopted in your code just like any of the predefined operators, and you can even extend existing types to support the custom operators you define.

可定制的运算符并不限于那些预设的运算符, 也创建个性的中置, 前置,后置,还有赋值运算符, 当然优先级和结合性也是可以自定义的. 这些运算符的实现可以使用预设的运算符, 也可以使用已定制好的运算符.

# Bitwise Operators

# 位运算符

Bitwise operators enable you to manipulate the individual raw data bits within a data structure. They are often used in low-level programming, such as graphics programming and device driver creation. Bitwise operators can also be useful when you work with raw data from external sources, such as encoding and decoding data for communication over a custom protocol.

位操作符通常在诸如图像处理和创建设备驱动等底层开发中使用, 使用它可以操作数据结构中原始数据中的个别比特. 当然, 使用一个自定的协议进行通信的时候, 使用位运算符来对原始数据进行编码和解码也是非常有效的.

Swift supports all of the bitwise operators found in C, as described below.

Swift支持所有C语言的位运算符, 如下描述:

## Bitwise NOT Operator

## 按位取反运算符
 
The bitwise NOT operator (~) inverts all bits in a number:

按位取反运算符 `~` 对一个操作数的每一位都取反.

![Art/bitwiseNOT_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseNOT_2x.png "Art/bitwiseNOT_2x.png")

The bitwise NOT operator is a prefix operator, and appears immediately before the value it operates on, without any white space:

这个运算符是前置, 所以请不加任何空格地写着操作数之前.

```
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits  // 等于 0b11110000
```

UInt8 integers have eight bits and can store any value between 0 and 255. This example initializes a UInt8 integer with the binary value 00001111, which has its first four bits set to 0, and its second four bits set to 1. This is equivalent to a decimal value of 15.

`UInt8` 整型是8位的, 可以储存0~255之间的任意数. 这个例子初始化一个整型为二进制值 `00001111`(前4位为 `0`, 后4位为 `1`), 它的十进制值为 `15`.

The bitwise NOT operator is then used to create a new constant called invertedBits, which is equal to initialBits, but with all of the bits inverted. Zeroes become ones, and ones become zeroes. The value of invertedBits is 11110000, which is equal to an unsigned decimal value of 240.

使用按位取反运算 `~` 对 `initialBits` 操作, 然后赋值给 `invertedBits` 这个新常量. 这个新常量的值等于所有位都取反的`initialBits`, 即 `1` 变成 `0`, `0` 变成 `1`, 变成了 `11110000`, 十进制值为 `240`.

## Bitwise AND Operator

## 按位与运算符

The bitwise AND operator (&) combines the bits of two numbers. It returns a new number whose bits are set to 1 only if the bits were equal to 1 in both input numbers:

按位与运算符对两个数进行操作, 然后返回一个新的数, 这个数的每个位都需两个输入数的同一位都为1的时候才为1.

![Art/bitwiseAND_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseAND_2x.png "Art/bitwiseAND_2x.png")

In the example below, the values of firstSixBits and lastSixBits both have four middle bits equal to 1. The bitwise AND operator combines them to make the number 00111100, which is equal to an unsigned decimal value of 60:

如下代码, `firstSixBits` 和 `lastSixBits` 中间4个位都为1. 对它俩进行按位与运算后, 就得到了 `00111100`, 即十进制的 `60`.

```
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8  = 0b00111111
let middleFourBits = firstSixBits & lastSixBits  // 等于 00111100
```

## Bitwise OR Operator

## 按位或运算

The bitwise OR operator (|) compares the bits of two numbers. The operator returns a new number whose bits are set to 1 if the bits are equal to 1 in either input number:

按位或运算符 `|` 比较两个数, 然后返回一个新的数, 这个数的每一位设置1的条件是两个输入数的同一位都不为0(即任意一个为1, 或都为1).

![Art/bitwiseOR_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseOR_2x.png "Art/bitwiseOR_2x.png")

In the example below, the values of someBits and moreBits have different bits set to 1. The bitwise OR operator combines them to make the number 11111110, which equals an unsigned decimal of 254:

如下代码, `someBits` 和 `moreBits` 在不同位上有 `1`. 按位或运行的结果是 `11111110`, 即十进制的 `254`.

```
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedbits = someBits | moreBits  // 等于 11111110
```

## Bitwise XOR Operator

## 按位异或运算符

The bitwise XOR operator, or “exclusive OR operator” (^), compares the bits of two numbers. The operator returns a new number whose bits are set to 1 where the input bits are different and are set to 0 where the input bits are the same:

按位异或运算符 `^` 比较两个数, 然后返回一个数, 这个数的每个位设为 `1`的条件是两个输入数的同一位不同, 如果相同就设为 `0`.

![Art/bitwiseXOR_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseXOR_2x.png "Art/bitwiseXOR_2x.png")

In the example below, the values of firstBits and otherBits each have a bit set to 1 in a location that the other does not. The bitwise XOR operator sets both of these bits to 1 in its output value. All of the other bits in firstBits and otherBits match and are set to 0 in the output value:

以下代码, `firstBits` 和 `otherBits` 都有一个 `1` 跟另一个数不同的. 所以按位异或的结果是把它这些位置为 `1`, 其他都置为 `0`.

```
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // 等于 00010001
```

## Bitwise Left and Right Shift Operators
## 按位左移/右移运算符

The bitwise left shift operator (<<) and bitwise right shift operator (>>) move all bits in a number to the left or the right by a certain number of places, according to the rules defined below.

左移运算符 `<<` 和右移运算符 `>>` 会把一个数的所有比特位按以下定义的规则向左或向右移动指定位数.

Bitwise left and right shifts have the effect of multiplying or dividing an integer number by a factor of two. Shifting an integer’s bits to the left by one position doubles its value, whereas shifting it to the right by one position halves its value.

按位左移和按位右移的效果相当把一个整数乘于或除于一个因子为 `2` 的整数. 向左移动一个整型的比特位相当于把这个数乘于 `2`, 向右移一位就是除于 `2`.

### Shifting Behavior for Unsigned Integers
### 对无符整型进行移位

The bit-shifting behavior for unsigned integers is as follows:
对无符整型的移位的效果如下:

Existing bits are moved to the left or right by the requested number of places.
Any bits that are moved beyond the bounds of the integer’s storage are discarded.
Zeroes are inserted in the spaces left behind after the original bits are moved to the left or right.
This approach is known as a logical shift.

已经存在的比特位向左或向右移动指定的位数. 被移出整型存储边界的的位数直接抛弃, 移动留下的空白位用零 `0` 来填充. 这种方法称为逻辑移位.

The illustration below shows the results of 11111111 << 1 (which is 11111111 shifted to the left by 1 place), and 11111111 >> 1 (which is 11111111 shifted to the right by 1 place). Blue numbers are shifted, gray numbers are discarded, and orange zeroes are inserted:

以下这张把展示了 `11111111 << 1` (`11111111` 向左移1位), 和 `11111111 << 1` (`11111111` 向右移1位). 蓝色的是被移位的, 灰色是被抛弃的, 橙色的 `0` 是被填充进来的.

![Art/bitshiftUnsigned_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftUnsigned_2x.png "Art/bitshiftUnsigned_2x.png")
Here’s how bit shifting looks in Swift code:

```
let shiftBits: UInt8 = 4   // 即二进制的00000100
shiftBits << 1             // 00001000
shiftBits << 2             // 00010000
shiftBits << 5             // 10000000
shiftBits << 6             // 00000000
shiftBits >> 2             // 00000001
```

You can use bit shifting to encode and decode values within other data types:
你可以使用移位操作进行其他数据类型的编码和解码.

```
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent 是 0xCC, 即 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent 是 0x66, 即 102
let blueComponent = pink & 0x0000FF           // blueComponent 是 0x99, 即 153
```

This example uses a UInt32 constant called pink to store a Cascading Style Sheets color value for the color pink. The CSS color value #CC6699 is written as 0xCC6699 in Swift’s hexadecimal number representation. This color is then decomposed into its red (CC), green (66), and blue (99) components by the bitwise AND operator (&) and the bitwise right shift operator (>>).

这个例子使用了一个 `UInt32` 的命名为 `pink`的常量来储存层叠样式表 `CSS` 中粉色的颜色值, `CSS`颜色`#CC6699`在Swift用十六进制`0xCC6699`来表示. 然后使用按位与(&)和按位右移就可以从这个颜色值中解析出红(CC), 绿(66), 蓝(99)三个部分.

The red component is obtained by performing a bitwise AND between the numbers 0xCC6699 and 0xFF0000. The zeroes in 0xFF0000 effectively “mask” the second and third bytes of 0xCC6699, causing the 6699 to be ignored and leaving 0xCC0000 as the result.

对 `0xCC6699` 和 `0xFF0000` 进行按位与 `&` 操作就可以得到红色部分. `0xFF0000` 中的 `0` 了遮盖了 `OxCC6699` 的第二和第三个字节, 这样 `6699` 被忽略了, 只留下 `0xCC0000`.

This number is then shifted 16 places to the right (>> 16). Each pair of characters in a hexadecimal number uses 8 bits, so a move 16 places to the right will convert 0xCC0000 into 0x0000CC. This is the same as 0xCC, which has a decimal value of 204.

然后, 按向右移动16位, 即 `>> 16`. 十六进制中每两个字符是8比特位, 所以移动16位的结果是把 `0xCC0000` 变成 `0x0000CC`. 这和 `0xCC` 是相等的, 都是十进制的 `204`.

Similarly, the green component is obtained by performing a bitwise AND between the numbers 0xCC6699 and 0x00FF00, which gives an output value of 0x006600. This output value is then shifted eight places to the right, giving a a value of 0x66, which has a decimal value of 102.

同样的, 绿色部分来自于 `0xCC6699` 和 `0x00FF00` 的按位操作得到 `0x006600`. 然后向右移动8們, 得到 `0x66`, 即十进制的 `102`.

Finally, the blue component is obtained by performing a bitwise AND between the numbers 0xCC6699 and 0x0000FF, which gives an output value of 0x000099. There’s no need to shift this to the right, as 0x000099 already equals 0x99, which has a decimal value of 153.

最后, 蓝色部分对 `0xCC6699` 和 `0x0000FF` 进行按位与运算, 得到 `0x000099`, 无需向右移位了, 所以结果就是 `0x99`, 即十进制的 `153`.

### Shifting Behavior for Signed Integers

The shifting behavior is more complex for signed integers than for unsigned integers, because of the way signed integers are represented in binary. (The examples below are based on 8-bit signed integers for simplicity, but the same principles apply for signed integers of any size.)

Signed integers use their first bit (known as the sign bit) to indicate whether the integer is positive or negative. A sign bit of 0 means positive, and a sign bit of 1 means negative.

The remaining bits (known as the value bits) store the actual value. Positive numbers are stored in exactly the same way as for unsigned integers, counting upwards from 0. Here’s how the bits inside an Int8 look for the number 4:

![Art/bitshiftSignedFour_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedFour_2x.png "Art/bitshiftSignedFour_2x.png")
The sign bit is 0 (meaning “positive”), and the seven value bits are just the number 4, written in binary notation.

Negative numbers, however, are stored differently. They are stored by subtracting their absolute value from 2 to the power of n, where n is the number of value bits. An eight-bit number has seven value bits, so this means 2 to the power of 7, or 128.

Here’s how the bits inside an Int8 look for the number -4:

![Art/bitshiftSignedMinusFour_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedMinusFour_2x.png "Art/bitshiftSignedMinusFour_2x.png")
This time, the sign bit is 1 (meaning “negative”), and the seven value bits have a binary value of 124 (which is 128 - 4):

![Art/bitshiftSignedMinusFourValue_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedMinusFourValue_2x.png "Art/bitshiftSignedMinusFourValue_2x.png")
The encoding for negative numbers is known as a two’s complement representation. It may seem an unusual way to represent negative numbers, but it has several advantages.

First, you can add -1 to -4, simply by performing a standard binary addition of all eight bits (including the sign bit), and discarding anything that doesn’t fit in the eight bits once you’re done:

![Art/bitshiftSignedAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedAddition_2x.png "Art/bitshiftSignedAddition_2x.png")
Second, the two’s complement representation also lets you shift the bits of negative numbers to the left and right like positive numbers, and still end up doubling them for every shift you make to the left, or halving them for every shift you make to the right. To achieve this, an extra rule is used when signed integers are shifted to the right:

When you shift signed integers to the right, apply the same rules as for unsigned integers, but fill any empty bits on the left with the sign bit, rather than with a zero.
![Art/bitshiftSigned_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSigned_2x.png "Art/bitshiftSigned_2x.png")
This action ensures that signed integers have the same sign after they are shifted to the right, and is known as an arithmetic shift.

Because of the special way that positive and negative numbers are stored, shifting either of them to the right moves them closer to zero. Keeping the sign bit the same during this shift means that negative integers remain negative as their value moves closer to zero.

# Overflow Operators

If you try to insert a number into an integer constant or variable that cannot hold that value, by default Swift reports an error rather than allowing an invalid value to be created. This behavior gives extra safety when you work with numbers that are too large or too small.

For example, the Int16 integer type can hold any signed integer number between -32768 and 32767. Trying to set a UInt16 constant or variable to a number outside of this range causes an error:

```
var potentialOverflow = Int16.max
// potentialOverflow equals 32767, which is the largest value an Int16 can hold
potentialOverflow += 1
// this causes an error
```

Providing error handling when values get too large or too small gives you much more flexibility when coding for boundary value conditions.

However, when you specifically want an overflow condition to truncate the number of available bits, you can opt in to this behavior rather than triggering an error. Swift provides five arithmetic overflow operators that opt in to the overflow behavior for integer calculations. These operators all begin with an ampersand (&):

- Overflow addition (&+)
- Overflow subtraction (&-)
- Overflow multiplication (&*)
- Overflow division (&/)
- Overflow remainder (&%)

## Value Overflow

Here’s an example of what happens when an unsigned value is allowed to overflow, using the overflow addition operator (&+):

```
var willOverflow = UInt8.max
// willOverflow equals 255, which is the largest value a UInt8 can hold
willOverflow = willOverflow &+ 1
// willOverflow is now equal to 0
```

The variable willOverflow is initialized with the largest value a UInt8 can hold (255, or 11111111 in binary). It is then incremented by 1 using the overflow addition operator (&+). This pushes its binary representation just over the size that a UInt8 can hold, causing it to overflow beyond its bounds, as shown in the diagram below. The value that remains within the bounds of the UInt8 after the overflow addition is 00000000, or zero:

![Art/overflowAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowAddition_2x.png "Art/overflowAddition_2x.png")
Value Underflow

Numbers can also become too small to fit in their type’s maximum bounds. Here’s an example.

The smallest value that a UInt8 can hold is 0 (which is 00000000 in eight-bit binary form). If you subtract 1 from 00000000 using the overflow subtraction operator, the number will overflow back round to 11111111, or 255 in decimal:

![Art/overflowUnsignedSubtraction_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowUnsignedSubtraction_2x.png "Art/overflowUnsignedSubtraction_2x.png")
Here’s how that looks in Swift code:

```
var willUnderflow = UInt8.min
// willUnderflow equals 0, which is the smallest value a UInt8 can hold
willUnderflow = willUnderflow &- 1
// willUnderflow is now equal to 255
```

A similar underflow occurs for signed integers. All subtraction for signed integers is performed as straight binary subtraction, with the sign bit included as part of the numbers being subtracted, as described in Bitwise Left and Right Shift Operators. The smallest number that an Int8 can hold is -128, which is 10000000 in binary. Subtracting 1 from this binary number with the overflow operator gives a binary value of 01111111, which toggles the sign bit and gives positive 127, the largest positive value that an Int8 can hold:

![Art/overflowSignedSubtraction_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowSignedSubtraction_2x.png "Art/overflowSignedSubtraction_2x.png")

Here’s the same thing in Swift code:

```
var signedUnderflow = Int8.min
// signedUnderflow equals -128, which is the smallest value an Int8 can hold
signedUnderflow = signedUnderflow &- 1
// signedUnderflow is now equal to 127
```

The end result of the overflow and underflow behavior described above is that for both signed and unsigned integers, overflow always wraps around from the largest valid integer value back to the smallest, and underflow always wraps around from the smallest value to the largest.

## Division by Zero

Dividing a number by zero (i / 0), or trying to calculate remainder by zero (i % 0), causes an error:

```
let x = 1
let y = x / 0
```

However, the overflow versions of these operators (&/ and &%) return a value of zero if you divide by zero:

```
let x = 1
let y = x &/ 0
// y is equal to 0
```

# Precedence and Associativity

Operator precedence gives some operators higher priority than others; these operators are calculated first.

Operator associativity defines how operators of the same precedence are grouped together (or associated)—either grouped from the left, or grouped from the right. Think of it as meaning “they associate with the expression to their left,” or “they associate with the expression to their right.”

It is important to consider each operator’s precedence and associativity when working out the order in which a compound expression will be calculated. Here’s an example. Why does the following expression equal 4?

```
2 + 3 * 4 % 5
// this equals 4
```

Taken strictly from left to right, you might expect this to read as follows:

2 plus 3 equals 5;
5 times 4 equals 20;
20 remainder 5 equals 0
However, the actual answer is 4, not 0. Higher-precedence operators are evaluated before lower-precedence ones. In Swift, as in C, the multiplication operator (*) and the remainder operator (%) have a higher precedence than the addition operator (+). As a result, they are both evaluated before the addition is considered.

However, multiplication and remainder have the same precedence as each other. To work out the exact evaluation order to use, you also need to consider their associativity. Multiplication and remainder both associate with the expression to their left. Think of this as adding implicit parentheses around these parts of the expression, starting from their left:

```
2 + ((3 * 4) % 5)
```

(3 * 4) is 12, so this is equivalent to:

```
2 + (12 % 5)
```

(12 % 5) is 2, so this is equivalent to:

```
2 + 2
```

This calculation yields the final answer of 4.

For a complete list of Swift operator precedences and associativity rules, see Expressions.

> NOTE

> Swift’s operator precedences and associativity rules are simpler and more predictable than those found in C and Objective-C. However, this means that they are not the same as in C-based languages. Be careful to ensure that operator interactions still behave in the way you intend when porting existing code to Swift.

Operator Functions

Classes and structures can provide their own implementations of existing operators. This is known as overloading the existing operators.

The example below shows how to implement the arithmetic addition operator (+) for a custom structure. The arithmetic addition operator is a binary operator because it operates on two targets and is said to be infix because it appears in between those two targets.

The example defines a Vector2D structure for a two-dimensional position vector (x, y), followed by a definition of an operator function to add together instances of the Vector2D structure:

struct Vector2D {
    var x = 0.0, y = 0.0
}
@infix func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}
The operator function is defined as a global function called +, which takes two input parameters of type Vector2D and returns a single output value, also of type Vector2D. You implement an infix operator by writing the @infix attribute before the func keyword when declaring the operator function.

In this implementation, the input parameters are named left and right to represent the Vector2D instances that will be on the left side and right side of the + operator. The function returns a new Vector2D instance, whose x and y properties are initialized with the sum of the x and y properties from the two Vector2D instances that are added together.

The function is defined globally, rather than as a method on the Vector2D structure, so that it can be used as an infix operator between existing Vector2D instances:

let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector is a Vector2D instance with values of (5.0, 5.0)
This example adds together the vectors (3.0, 1.0) and (2.0, 4.0) to make the vector (5.0, 5.0), as illustrated below.

![Art/vectorAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/vectorAddition_2x.png "Art/vectorAddition_2x.png")
Prefix and Postfix Operators

The example shown above demonstrates a custom implementation of a binary infix operator. Classes and structures can also provide implementations of the standard unary operators. Unary operators operate on a single target. They are prefix if they precede their target (such as -a) and postfix operators if they follow their target (such as i++).

You implement a prefix or postfix unary operator by writing the @prefix or @postfix attribute before the func keyword when declaring the operator function:

@prefix func - (vector: Vector2D) -> Vector2D {
    return Vector2D(x: -vector.x, y: -vector.y)
}
The example above implements the unary minus operator (-a) for Vector2D instances. The unary minus operator is a prefix operator, and so this function has to be qualified with the @prefix attribute.

For simple numeric values, the unary minus operator converts positive numbers into their negative equivalent and vice versa. The corresponding implementation for Vector2D instances performs this operation on both the x and y properties:

let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative is a Vector2D instance with values of (-3.0, -4.0)
let alsoPositive = -negative
// alsoPositive is a Vector2D instance with values of (3.0, 4.0)
Compound Assignment Operators

Compound assignment operators combine assignment (=) with another operation. For example, the addition assignment operator (+=) combines addition and assignment into a single operation. Operator functions that implement compound assignment must be qualified with the @assignment attribute. You must also mark a compound assignment operator’s left input parameter as inout, because the parameter’s value will be modified directly from within the operator function.

The example below implements an addition assignment operator function for Vector2D instances:

@assignment func += (inout left: Vector2D, right: Vector2D) {
    left = left + right
}
Because an addition operator was defined earlier, you don’t need to reimplement the addition process here. Instead, the addition assignment operator function takes advantage of the existing addition operator function, and uses it to set the left value to be the left value plus the right value:

var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original now has values of (4.0, 6.0)
You can combine the @assignment attribute with either the @prefix or @postfix attribute, as in this implementation of the prefix increment operator (++a) for Vector2D instances:

@prefix @assignment func ++ (inout vector: Vector2D) -> Vector2D {
    vector += Vector2D(x: 1.0, y: 1.0)
    return vector
}
The prefix increment operator function above takes advantage of the addition assignment operator defined earlier. It adds a Vector2D with x and y values of 1.0 to the Vector2D on which it is called, and returns the result:

var toIncrement = Vector2D(x: 3.0, y: 4.0)
let afterIncrement = ++toIncrement
// toIncrement now has values of (4.0, 5.0)
// afterIncrement also has values of (4.0, 5.0)
NOTE

It is not possible to overload the default assignment operator (=). Only the compound assignment operators can be overloaded. Similarly, the ternary conditional operator (a ? b : c) cannot be overloaded.

Equivalence Operators

Custom classes and structures do not receive a default implementation of the equivalence operators, known as the “equal to” operator (==) and “not equal to” operator (!=). It is not possible for Swift to guess what would qualify as “equal” for your own custom types, because the meaning of “equal” depends on the roles that those types play in your code.

To use the equivalence operators to check for equivalence of your own custom type, provide an implementation of the operators in the same way as for other infix operators:

@infix func == (left: Vector2D, right: Vector2D) -> Bool {
    return (left.x == right.x) && (left.y == right.y)
}
@infix func != (left: Vector2D, right: Vector2D) -> Bool {
    return !(left == right)
}
The above example implements an “equal to” operator (==) to check if two Vector2D instances have equivalent values. In the context of Vector2D, it makes sense to consider “equal” as meaning “both instances have the same x values and y values”, and so this is the logic used by the operator implementation. The example also implements the “not equal to” operator (!=), which simply returns the inverse of the result of the “equal to” operator.

You can now use these operators to check whether two Vector2D instances are equivalent:

let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    println("These two vectors are equivalent.")
}
// prints "These two vectors are equivalent."
Custom Operators

You can declare and implement your own custom operators in addition to the standard operators provided by Swift. Custom operators can be defined only with the characters / = - + * % < > ! & | ^ . ~.

New operators are declared at a global level using the operator keyword, and can be declared as prefix, infix or postfix:

operator prefix +++ {}
The example above defines a new prefix operator called +++. This operator does not have an existing meaning in Swift, and so it is given its own custom meaning below in the specific context of working with Vector2D instances. For the purposes of this example, +++ is treated as a new “prefix doubling incrementer” operator. It doubles the x and y values of a Vector2D instance, by adding the vector to itself with the addition assignment operator defined earlier:

@prefix @assignment func +++ (inout vector: Vector2D) -> Vector2D {
    vector += vector
    return vector
}
This implementation of +++ is very similar to the implementation of ++ for Vector2D, except that this operator function adds the vector to itself, rather than adding Vector2D(1.0, 1.0):

var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled now has values of (2.0, 8.0)
// afterDoubling also has values of (2.0, 8.0)
Precedence and Associativity for Custom Infix Operators

Custom infix operators can also specify a precedence and an associativity. See Precedence and Associativity for an explanation of how these two characteristics affect an infix operator’s interaction with other infix operators.

The possible values for associativity are left, right, and none. Left-associative operators associate to the left if written next to other left-associative operators of the same precedence. Similarly, right-associative operators associate to the right if written next to other right-associative operators of the same precedence. Non-associative operators cannot be written next to other operators with the same precedence.

The associativity value defaults to none if it is not specified. The precedence value defaults to 100 if it is not specified.

The following example defines a new custom infix operator called +-, with left associativity and a precedence of 140:

operator infix +- { associativity left precedence 140 }
func +- (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y - right.y)
}
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector is a Vector2D instance with values of (4.0, -2.0)
This operator adds together the x values of two vectors, and subtracts the y value of the second vector from the first. Because it is in essence an “additive” operator, it has been given the same associativity and precedence values (left and 140) as default additive infix operators such as + and -. For a complete list of the default Swift operator precedence and associativity settings, see Expressions.