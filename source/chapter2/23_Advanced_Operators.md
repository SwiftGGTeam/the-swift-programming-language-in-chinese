# 高级运算符
-----------------

本页内容包括：

- [位运算符](#bitwise_operators)
- [溢出运算符](#overflow_operators)
- [优先级和结合性(Precedence and Associativity)](#precedence_and_associativity)
- [运算符函数(Operator Functions)](#operator_functions)
- [自定义运算符](#custom_operators)

In addition to the operators described in [Basic Operators](Basic Operators), Swift provides several advanced operators that perform more complex value manipulation. These include all of the bitwise and bit shifting operators you will be familiar with from C and Objective-C.

除了[基本操作符](02_Basic_Operators.html)中所讲的运算符，Swift还有许多复杂的高级运算符，包括了C语和Objective-C中的位运算符和移位运算。

Unlike arithmetic operators in C, arithmetic operators in Swift do not overflow by default. Overflow behavior is trapped and reported as an error. To opt in to overflow behavior, use Swift’s second set of arithmetic operators that overflow by default, such as the overflow addition operator (&+). All of these overflow operators begin with an ampersand (&).

不同于C语言中的数值计算，Swift的数值计算默认是不可溢出的。溢出行为会被捕获并报告为错误。你是故意的？好吧，你可以使用Swift为你准备的另一套默认允许溢出的数值运算符，如可溢出加`&+`。所有允许溢出的运算符都是以`&`开始的。

When you define your own structures, classes, and enumerations, it can be useful to provide your own implementations of the standard Swift operators for these custom types. Swift makes it easy to provide tailored implementations of these operators and to determine exactly what their behavior should be for each type you create.

自定义的结构，类和枚举，是否可以使用标准的运算符来定义操作？当然可以！在Swift中，你可以为你创建的所有类型定制运算符的操作。

You’re not just limited to the predefined operators. Swift gives you the freedom to define your own custom infix, prefix, postfix, and assignment operators, with custom precedence and associativity values. These operators can be used and adopted in your code just like any of the predefined operators, and you can even extend existing types to support the custom operators you define.

可定制的运算符并不限于那些预设的运算符，自定义有个性的中置，前置，后置及赋值运算符，当然还有优先级和结合性。这些运算符的实现可以运用预设的运算符，也可以运用之前定制的运算符。

## Bitwise Operators

<a name="bitwise_operators"></a>
## 位运算符

Bitwise operators enable you to manipulate the individual raw data bits within a data structure. They are often used in low-level programming, such as graphics programming and device driver creation. Bitwise operators can also be useful when you work with raw data from external sources, such as encoding and decoding data for communication over a custom protocol.

位操作符通常在诸如图像处理和创建设备驱动等底层开发中使用，使用它可以单独操作数据结构中原始数据的比特位。在使用一个自定义的协议进行通信的时候，运用位运算符来对原始数据进行编码和解码也是非常有效的。

Swift supports all of the bitwise operators found in C, as described below.

Swift支持如下所有C语言的位运算符：

### Bitwise NOT Operator

### 按位取反运算符
 
The bitwise NOT operator (~) inverts all bits in a number:

按位取反运算符`~`对一个操作数的每一位都取反。

![Art/bitwiseNOT_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseNOT_2x.png "Art/bitwiseNOT_2x.png")

The bitwise NOT operator is a prefix operator, and appears immediately before the value it operates on, without any white space:

这个运算符是前置的，所以请不加任何空格地写着操作数之前。

```
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits  // 等于 0b11110000
```

UInt8 integers have eight bits and can store any value between 0 and 255. This example initializes a UInt8 integer with the binary value 00001111, which has its first four bits set to 0, and its second four bits set to 1. This is equivalent to a decimal value of 15.

`UInt8`是8位无符整型，可以存储0~255之间的任意数。这个例子初始化一个整型为二进制值`00001111`(前4位为`0`，后4位为`1`)，它的十进制值为`15`。

The bitwise NOT operator is then used to create a new constant called invertedBits, which is equal to initialBits, but with all of the bits inverted. Zeroes become ones, and ones become zeroes. The value of invertedBits is 11110000, which is equal to an unsigned decimal value of 240.

使用按位取反运算`~`对`initialBits`操作，然后赋值给`invertedBits`这个新常量。这个新常量的值等于所有位都取反的`initialBits`，即`1`变成`0`，`0`变成`1`，变成了`11110000`，十进制值为`240`。

### Bitwise AND Operator

### 按位与运算符

The bitwise AND operator (&) combines the bits of two numbers. It returns a new number whose bits are set to 1 only if the bits were equal to 1 in both input numbers:

按位与运算符对两个数进行操作，然后返回一个新的数，这个数的每个位都需要两个输入数的同一位都为1时才为1。

![Art/bitwiseAND_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseAND_2x.png "Art/bitwiseAND_2x.png")

In the example below, the values of firstSixBits and lastSixBits both have four middle bits equal to 1. The bitwise AND operator combines them to make the number 00111100, which is equal to an unsigned decimal value of 60:

以下代码，`firstSixBits`和`lastSixBits`中间4个位都为1。对它俩进行按位与运算后，就得到了`00111100`，即十进制的`60`。

```
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8  = 0b00111111
let middleFourBits = firstSixBits & lastSixBits  // 等于 00111100
```

### Bitwise OR Operator

### 按位或运算

The bitwise OR operator (|) compares the bits of two numbers. The operator returns a new number whose bits are set to 1 if the bits are equal to 1 in either input number:

按位或运算符`|`比较两个数，然后返回一个新的数，这个数的每一位设置1的条件是两个输入数的同一位都不为0(即任意一个为1，或都为1)。

![Art/bitwiseOR_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseOR_2x.png "Art/bitwiseOR_2x.png")

In the example below, the values of someBits and moreBits have different bits set to 1. The bitwise OR operator combines them to make the number 11111110, which equals an unsigned decimal of 254:

如下代码，`someBits`和`moreBits`在不同位上有`1`。按位或运行的结果是`11111110`，即十进制的`254`。

```
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedbits = someBits | moreBits  // 等于 11111110
```

### Bitwise XOR Operator

### 按位异或运算符

The bitwise XOR operator, or “exclusive OR operator” (^), compares the bits of two numbers. The operator returns a new number whose bits are set to 1 where the input bits are different and are set to 0 where the input bits are the same:

按位异或运算符`^`比较两个数，然后返回一个数，这个数的每个位设为`1`的条件是两个输入数的同一位不同，如果相同就设为`0`。

![Art/bitwiseXOR_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseXOR_2x.png "Art/bitwiseXOR_2x.png")

In the example below, the values of firstBits and otherBits each have a bit set to 1 in a location that the other does not. The bitwise XOR operator sets both of these bits to 1 in its output value. All of the other bits in firstBits and otherBits match and are set to 0 in the output value:

以下代码，`firstBits`和`otherBits`都有一个`1`跟另一个数不同的。所以按位异或的结果是把它这些位置为`1`，其他都置为`0`。

```
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // 等于 00010001
```

### Bitwise Left and Right Shift Operators
### 按位左移/右移运算符

The bitwise left shift operator (<<) and bitwise right shift operator (>>) move all bits in a number to the left or the right by a certain number of places, according to the rules defined below.

左移运算符`<<`和右移运算符`>>`会把一个数的所有比特位按以下定义的规则向左或向右移动指定位数。

Bitwise left and right shifts have the effect of multiplying or dividing an integer number by a factor of two. Shifting an integer’s bits to the left by one position doubles its value, whereas shifting it to the right by one position halves its value.

按位左移和按位右移的效果相当把一个整数乘于或除于一个因子为`2`的整数。向左移动一个整型的比特位相当于把这个数乘于`2`，向右移一位就是除于`2`。

#### Shifting Behavior for Unsigned Integers
#### 无符整型的移位操作

The bit-shifting behavior for unsigned integers is as follows:
对无符整型的移位的效果如下：

Existing bits are moved to the left or right by the requested number of places.
Any bits that are moved beyond the bounds of the integer’s storage are discarded.
Zeroes are inserted in the spaces left behind after the original bits are moved to the left or right.
This approach is known as a logical shift.

已经存在的比特位向左或向右移动指定的位数。被移出整型存储边界的的位数直接抛弃，移动留下的空白位用零`0`来填充。这种方法称为逻辑移位。

The illustration below shows the results of 11111111 << 1 (which is 11111111 shifted to the left by 1 place), and 11111111 >> 1 (which is 11111111 shifted to the right by 1 place). Blue numbers are shifted, gray numbers are discarded, and orange zeroes are inserted:

以下这张把展示了 `11111111 << 1`(`11111111`向左移1位)，和 `11111111 >> 1`(`11111111`向右移1位)。蓝色的是被移位的，灰色是被抛弃的，橙色的`0`是被填充进来的。

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
你可以使用移位操作进行其他数据类型的编码和解码。

```
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent 是 0xCC, 即 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent 是 0x66, 即 102
let blueComponent = pink & 0x0000FF           // blueComponent 是 0x99, 即 153
```

This example uses a UInt32 constant called pink to store a Cascading Style Sheets color value for the color pink. The CSS color value #CC6699 is written as 0xCC6699 in Swift’s hexadecimal number representation. This color is then decomposed into its red (CC), green (66), and blue (99) components by the bitwise AND operator (&) and the bitwise right shift operator (>>).

这个例子使用了一个`UInt32`的命名为`pink`的常量来存储层叠样式表`CSS`中粉色的颜色值，`CSS`颜色`#CC6699`在Swift用十六进制`0xCC6699`来表示。然后使用按位与(&)和按位右移就可以从这个颜色值中解析出红(CC)，绿(66)，蓝(99)三个部分。

The red component is obtained by performing a bitwise AND between the numbers 0xCC6699 and 0xFF0000. The zeroes in 0xFF0000 effectively “mask” the second and third bytes of 0xCC6699, causing the 6699 to be ignored and leaving 0xCC0000 as the result.

对`0xCC6699`和`0xFF0000`进行按位与`&`操作就可以得到红色部分。`0xFF0000`中的`0`了遮盖了`OxCC6699`的第二和第三个字节，这样`6699`被忽略了，只留下`0xCC0000`。

This number is then shifted 16 places to the right (>> 16). Each pair of characters in a hexadecimal number uses 8 bits, so a move 16 places to the right will convert 0xCC0000 into 0x0000CC. This is the same as 0xCC, which has a decimal value of 204.

然后，按向右移动16位，即 `>> 16`。十六进制中每两个字符是8比特位，所以移动16位的结果是把`0xCC0000`变成`0x0000CC`。这和`0xCC`是相等的，都是十进制的`204`。

Similarly, the green component is obtained by performing a bitwise AND between the numbers 0xCC6699 and 0x00FF00, which gives an output value of 0x006600. This output value is then shifted eight places to the right, giving a a value of 0x66, which has a decimal value of 102.

同样的，绿色部分来自于`0xCC6699`和`0x00FF00`的按位操作得到`0x006600`。然后向右移动8們，得到`0x66`，即十进制的`102`。

Finally, the blue component is obtained by performing a bitwise AND between the numbers 0xCC6699 and 0x0000FF, which gives an output value of 0x000099. There’s no need to shift this to the right, as 0x000099 already equals 0x99, which has a decimal value of 153.

最后，蓝色部分对`0xCC6699`和`0x0000FF`进行按位与运算，得到`0x000099`，无需向右移位了，所以结果就是`0x99`，即十进制的`153`。

#### Shifting Behavior for Signed Integers
#### 有符整型的移位操作

The shifting behavior is more complex for signed integers than for unsigned integers, because of the way signed integers are represented in binary. (The examples below are based on 8-bit signed integers for simplicity, but the same principles apply for signed integers of any size.)

有符整型的移位操作相对复杂得多，因为正负号也是用二进制位表示的。(这里举的例子虽然都是8位的，但它的原理是通用的。)

Signed integers use their first bit (known as the sign bit) to indicate whether the integer is positive or negative. A sign bit of 0 means positive, and a sign bit of 1 means negative.

有符整型通过第1个比特位(称为符号位)来表达这个整数是正数还是负数。`0`代表正数，`1`代表负数。

The remaining bits (known as the value bits) store the actual value. Positive numbers are stored in exactly the same way as for unsigned integers, counting upwards from 0. Here’s how the bits inside an Int8 look for the number 4:

其余的比特位(称为数值位)存储其实值。有符正整数和无符正整数在计算机里的存储结果是一样的，下来我们来看`+4`内部的二进制结构。

![Art/bitshiftSignedFour_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedFour_2x.png "Art/bitshiftSignedFour_2x.png")

The sign bit is 0 (meaning “positive”), and the seven value bits are just the number 4, written in binary notation.

符号位为`0`，代表正数，另外7比特位二进制表示的实际值就刚好是`4`。

Negative numbers, however, are stored differently. They are stored by subtracting their absolute value from 2 to the power of n, where n is the number of value bits. An eight-bit number has seven value bits, so this means 2 to the power of 7, or 128.

负数呢，跟正数不同。负数存储的是2的n次方减去它的绝对值，n为数值位的位数。一个8比特的数有7个数值位，所以是2的7次方，即128。

Here’s how the bits inside an Int8 look for the number -4:

我们来看`-4`存储的二进制结构。

![Art/bitshiftSignedMinusFour_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedMinusFour_2x.png "Art/bitshiftSignedMinusFour_2x.png")

This time, the sign bit is 1 (meaning “negative”), and the seven value bits have a binary value of 124 (which is 128 - 4):

现在符号位为`1`，代表负数，7个数值位要表达的二进制值是124，即128 - 4。

![Art/bitshiftSignedMinusFourValue_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedMinusFourValue_2x.png "Art/bitshiftSignedMinusFourValue_2x.png")

The encoding for negative numbers is known as a two’s complement representation. It may seem an unusual way to represent negative numbers, but it has several advantages.

负数的编码方式称为二进制补码表示。这种表示方式看起来很奇怪，但它有几个优点。

First, you can add -1 to -4, simply by performing a standard binary addition of all eight bits (including the sign bit), and discarding anything that doesn’t fit in the eight bits once you’re done:

首先，只需要对全部8个比特位(包括符号)做标准的二进制加法就可以完成 `-1 + -4` 的操作，忽略加法过程产生的超过8个比特位表达的任何信息。

![Art/bitshiftSignedAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedAddition_2x.png "Art/bitshiftSignedAddition_2x.png")

Second, the two’s complement representation also lets you shift the bits of negative numbers to the left and right like positive numbers, and still end up doubling them for every shift you make to the left, or halving them for every shift you make to the right. To achieve this, an extra rule is used when signed integers are shifted to the right:

第二，由于使用二进制补码表示，我们可以和正数一样对负数进行按位左移右移的，同样也是左移1位时乘于`2`，右移1位时除于`2`。要达到此目的，对有符整型的右移有一个特别的要求：

When you shift signed integers to the right, apply the same rules as for unsigned integers, but fill any empty bits on the left with the sign bit, rather than with a zero.

对有符整型按位右移时，使用符号位(正数为`0`，负数为`1`)填充空白位。

![Art/bitshiftSigned_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSigned_2x.png "Art/bitshiftSigned_2x.png")


This action ensures that signed integers have the same sign after they are shifted to the right, and is known as an arithmetic shift.

这就确保了在右移的过程中，有符整型的符号不会发生变化。这称为算术移位。

Because of the special way that positive and negative numbers are stored, shifting either of them to the right moves them closer to zero. Keeping the sign bit the same during this shift means that negative integers remain negative as their value moves closer to zero.

正因为正数和负数特殊的存储方式，向右移位使它接近于`0`。移位过程中保持符号会不变，负数在接近`0`的过程中一直是负数。

## Overflow Operators

<a name="overflow_operators"></a>
## 溢出运算符

If you try to insert a number into an integer constant or variable that cannot hold that value, by default Swift reports an error rather than allowing an invalid value to be created. This behavior gives extra safety when you work with numbers that are too large or too small.

默认情况下，当你往一个整型常量或变量赋于一个它不能承载的大数时，Swift不会让你这么干的，它会报错。这样，在操作过大或过小的数的时候就很安全了。

For example, the Int16 integer type can hold any signed integer number between -32768 and 32767. Trying to set a UInt16 constant or variable to a number outside of this range causes an error:

例如，`Int16`整型能承载的整数范围是`-32768`到`32767`，如果给它赋上超过这个范围的数，就会报错：

```
var potentialOverflow = Int16.max
// potentialOverflow 等于 32767, 这是 Int16 能承载的最大整数
potentialOverflow += 1
// 噢, 出错了
```

Providing error handling when values get too large or too small gives you much more flexibility when coding for boundary value conditions.

对过大或过小的数值进行错误处理让你的数值边界条件更灵活。

However, when you specifically want an overflow condition to truncate the number of available bits, you can opt in to this behavior rather than triggering an error. Swift provides five arithmetic overflow operators that opt in to the overflow behavior for integer calculations. These operators all begin with an ampersand (&):

当然，你有意在溢出时对有效位进行截断，你可采用溢出运算，而非错误处理。Swfit为整型计算提供了5个`&`符号开头的溢出运算符。

- 溢出加法 `&+`
- 溢出减法 `&-`
- 溢出乘法 `&*`
- 溢出除法 `&/`
- 溢出求余 `&%`

### Value Overflow
### 值的上溢出

Here’s an example of what happens when an unsigned value is allowed to overflow, using the overflow addition operator (&+):

下面例子使用了溢出加法`&+`来解剖的无符整数的上溢出

```
var willOverflow = UInt8.max
// willOverflow 等于UInt8的最大整数 255
willOverflow = willOverflow &+ 1
// 这时候 willOverflow 等于 0
```

The variable willOverflow is initialized with the largest value a UInt8 can hold (255, or 11111111 in binary). It is then incremented by 1 using the overflow addition operator (&+). This pushes its binary representation just over the size that a UInt8 can hold, causing it to overflow beyond its bounds, as shown in the diagram below. The value that remains within the bounds of the UInt8 after the overflow addition is 00000000, or zero:

`willOverflow`用`Int8`所能承载的最大值`255`(二进制`11111111`)，然后用`&+`加1。然后`UInt8`就无法表达这个新值的二进制了，也就导致了这个新值上溢出了，大家可以看下图。溢出后，新值在`UInt8`的承载范围内的那部分是`00000000`，也就是`0`。

![Art/overflowAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowAddition_2x.png "Art/overflowAddition_2x.png")

### Value Underflow
### 值的下溢出

Numbers can also become too small to fit in their type’s maximum bounds. Here’s an example.
数值也有可能因为太小而越界。举个例子：

The smallest value that a UInt8 can hold is 0 (which is 00000000 in eight-bit binary form). If you subtract 1 from 00000000 using the overflow subtraction operator, the number will overflow back round to 11111111, or 255 in decimal:

`UInt8`的最小值是`0`(二进制为`00000000`)。使用`&-`进行溢出减1，就会得到二进制的`11111111`即十进制的`255`。

![Art/overflowUnsignedSubtraction_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowUnsignedSubtraction_2x.png "Art/overflowUnsignedSubtraction_2x.png")


Here’s how that looks in Swift code:
Swift代码是这样的:

```
var willUnderflow = UInt8.min
// willUnderflow 等于UInt8的最小值0
willUnderflow = willUnderflow &- 1
// 此时 willUnderflow 等于 255
```

A similar underflow occurs for signed integers. All subtraction for signed integers is performed as straight binary subtraction, with the sign bit included as part of the numbers being subtracted, as described in Bitwise Left and Right Shift Operators. The smallest number that an Int8 can hold is -128, which is 10000000 in binary. Subtracting 1 from this binary number with the overflow operator gives a binary value of 01111111, which toggles the sign bit and gives positive 127, the largest positive value that an Int8 can hold:

有符整型也有类似的下溢出，有符整型所有的减法也都是对包括在符号位在内的二进制数进行二进制减法的，这在 "按位左移/右移运算符" 一节提到过。最小的有符整数是`-128`，即二进制的`10000000`。用溢出减法减去去1后，变成了`01111111`，即UInt8所能承载的最大整数`127`。

![Art/overflowSignedSubtraction_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowSignedSubtraction_2x.png "Art/overflowSignedSubtraction_2x.png")

Here’s the same thing in Swift code:

来看看Swift代码：

```
var signedUnderflow = Int8.min
// signedUnderflow 等于最小的有符整数 -128
signedUnderflow = signedUnderflow &- 1
// 如今 signedUnderflow 等于 127
```

The end result of the overflow and underflow behavior described above is that for both signed and unsigned integers, overflow always wraps around from the largest valid integer value back to the smallest, and underflow always wraps around from the smallest value to the largest.

### Division by Zero
### 除零溢出

Dividing a number by zero(i / 0), or trying to calculate remainder by zero(i % 0), causes an error:

一个数除于0 `i / 0`，或者对0求余数 `i % 0`，就会产生一个错误。

```
let x = 1
let y = x / 0
```

However, the overflow versions of these operators (&/ and &%) return a value of zero if you divide by zero:

使用它们对应的可溢出的版本的运算符`&/`和`&%`进行除0操作时就会得到`0`值。

```
let x = 1
let y = x &/ 0
// y 等于 0
```

## Precedence and Associativity

<a name="precedence_and_associativity"></a>
## 优先级和结合性

Operator precedence gives some operators higher priority than others; these operators are calculated first.

运算符的优先级使得一些运算符优先于其他运算符，高优先级的运算符会先被计算。

Operator associativity defines how operators of the same precedence are grouped together (or associated)—either grouped from the left, or grouped from the right. Think of it as meaning “they associate with the expression to their left,” or “they associate with the expression to their right.”

结合性定义相同优先级的运算符在一起时是怎么组合或关联的，是和左边的一组呢，还是和右边的一组。意思就是，到底是和左边的表达式结合呢，还是和右边的表达式结合？

It is important to consider each operator’s precedence and associativity when working out the order in which a compound expression will be calculated. Here’s an example. Why does the following expression equal 4?

在混合表达式中，运算符的优先级和结合性是非常重要的。举个例子，为什么下列表达式的结果为`4`？

```
2 + 3 * 4 % 5
// 结果是 4
```

Taken strictly from left to right, you might expect this to read as follows:

如果严格地从左计算到右，计算过程会是这样：

- 2 plus 3 equals 5;
- 2 + 3 = 5
- 5 times 4 equals 20;
- 5 * 4 = 20
- 20 remainder 5 equals 0
- 20 / 5 = 4 余 0

However, the actual answer is 4, not 0. Higher-precedence operators are evaluated before lower-precedence ones. In Swift, as in C, the multiplication operator (*) and the remainder operator (%) have a higher precedence than the addition operator (+). As a result, they are both evaluated before the addition is considered.

但是正确答案是`4`而不是`0`。优先级高的运算符要先计算，在Swift和C语言中，都是先乘除后加减的。所以，执行完乘法和求余运算才能执行加减运算。

However, multiplication and remainder have the same precedence as each other. To work out the exact evaluation order to use, you also need to consider their associativity. Multiplication and remainder both associate with the expression to their left. Think of this as adding implicit parentheses around these parts of the expression, starting from their left:

乘法和求余拥有相同的优先级，在运算过程中，我们还需要结合性，乘法和求余运算都是左结合的。这相当于在表达式中有隐藏的括号让运算从左开始。

```
2 + ((3 * 4) % 5)
```

(3 * 4) is 12, so this is equivalent to:
3 * 4 = 12，所以这相当于：


```
2 + (12 % 5)
```

(12 % 5) is 2, so this is equivalent to:
12 % 5 = 2，所这又相当于

```
2 + 2
```

This calculation yields the final answer of 4.

计算结果为 4。

For a complete list of Swift operator precedences and associativity rules, see [Expressions](Expressions).

查阅Swift运算符的优先级和结合性的完整列表，请看[表达式](../chapter3/04_Expressions.html)。

> NOTE

> Swift’s operator precedences and associativity rules are simpler and more predictable than those found in C and Objective-C. However, this means that they are not the same as in C-based languages. Be careful to ensure that operator interactions still behave in the way you intend when porting existing code to Swift.

> 注意：
Swift的运算符较C语言和Objective-C来得更简单和保守，这意味着跟基于C的语言可能不一样。所以，在移植已有代码到Swift时，注意去确保代码按你想的那样去执行。

## Operator Functions

<a name="operator_functions"></a>
## 运算符函数

Classes and structures can provide their own implementations of existing operators. This is known as overloading the existing operators.

让已有的运算符也可以对自定义的类和结构进行运算，这称为运算符重载。

The example below shows how to implement the arithmetic addition operator (+) for a custom structure. The arithmetic addition operator is a binary operator because it operates on two targets and is said to be infix because it appears in between those two targets.

The example defines a Vector2D structure for a two-dimensional position vector (x, y), followed by a definition of an operator function to add together instances of the Vector2D structure:

这个例子展示了如何用`+`让一个自定义的结构做加法。算术运算符`+`是一个两目运算符，因为它有两个操作数，而且它必须出现在两个操作数之间。

例子中定义了一个名为`Vector2D`的二维坐标向量 `(x，y)` 的结构，然后定义了让两个`Vector2D`的对象相加的运算符函数。

```
struct Vector2D {
    var x = 0.0, y = 0.0
}
@infix func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}
```

The operator function is defined as a global function called +, which takes two input parameters of type Vector2D and returns a single output value, also of type Vector2D. You implement an infix operator by writing the @infix attribute before the func keyword when declaring the operator function.

该运算符函数定义了一个全局的`+`函数，这个函数需要两个`Vector2D`类型的参数，返回值也是`Vector2D`类型。需要定义和实现一个中置运算的时候，在关键字`func`之前写上属性 `@infix` 就可以了。

In this implementation, the input parameters are named left and right to represent the Vector2D instances that will be on the left side and right side of the + operator. The function returns a new Vector2D instance, whose x and y properties are initialized with the sum of the x and y properties from the two Vector2D instances that are added together.

在这个代码实现中，参数被命名为了`left`和`right`，代表`+`左边和右边的两个`Vector2D`对象。函数返回了一个新的`Vector2D`的对象，这个对象的`x`和`y`分别等于两个参数对象的`x`和`y`的和。

The function is defined globally, rather than as a method on the Vector2D structure, so that it can be used as an infix operator between existing Vector2D instances:

这个函数是全局的，而不是`Vector2D`结构的成员方法，所以任意两个`Vector2D`对象都可以使用这个中置运算符。

```
let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector 是一个新的Vector2D, 值为 (5.0, 5.0)
```

This example adds together the vectors (3.0, 1.0) and (2.0, 4.0) to make the vector (5.0, 5.0), as illustrated below.

这个例子实现两个向量 `(3.0，1.0)` 和 `(2.0，4.0)` 相加，得到向量 `(5.0，5.0)` 的过程。如下图示：

![Art/vectorAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/vectorAddition_2x.png "Art/vectorAddition_2x.png")

### Prefix and Postfix Operators
### 前置和后置运算符

The example shown above demonstrates a custom implementation of a binary infix operator. Classes and structures can also provide implementations of the standard unary operators. Unary operators operate on a single target. They are prefix if they precede their target (such as -a) and postfix operators if they follow their target (such as i++).

You implement a prefix or postfix unary operator by writing the @prefix or @postfix attribute before the func keyword when declaring the operator function:

上个例子演示了一个双目中置运算符的自定义实现，同样我们也可以玩标准单目运算符的实现。单目运算符只有一个操作数，在操作数之前就是前置的，如`-a`; 在操作数之后就是后置的，如`i++`。

实现一个前置或后置运算符时，在定义该运算符的时候于关键字`func`之前标注 `@prefix` 或 `@postfix` 属性。

```
@prefix func - (vector: Vector2D) -> Vector2D {
    return Vector2D(x: -vector.x, y: -vector.y)
}
```

The example above implements the unary minus operator (-a) for Vector2D instances. The unary minus operator is a prefix operator, and so this function has to be qualified with the @prefix attribute.

这段代码为`Vector2D`类型提供了单目减运算`-a`，`@prefix`属性表明这是个前置运算符。

For simple numeric values, the unary minus operator converts positive numbers into their negative equivalent and vice versa. The corresponding implementation for Vector2D instances performs this operation on both the x and y properties:

对于数值，单目减运算符可以把正数变负数，把负数变正数。对于`Vector2D`，单目减运算将其`x`和`y`都进进行单目减运算。

```
let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative 为 (-3.0, -4.0)
let alsoPositive = -negative
// alsoPositive 为 (3.0, 4.0)
```

### Compound Assignment Operators
### 组合赋值运算符

Compound assignment operators combine assignment (=) with another operation. For example, the addition assignment operator (+=) combines addition and assignment into a single operation. Operator functions that implement compound assignment must be qualified with the @assignment attribute. You must also mark a compound assignment operator’s left input parameter as inout, because the parameter’s value will be modified directly from within the operator function.

The example below implements an addition assignment operator function for Vector2D instances:

组合赋值是其他运算符和赋值运算符一起执行的运算。如`+=`把加运算和赋值运算组合成一个操作。实现一个组合赋值符号需要使用`@assignment`属性，还需要把运算符的左参数设置成`inout`，因为这个参数会在运算符函数内直接修改它的值。

```
@assignment func += (inout left: Vector2D, right: Vector2D) {
    left = left + right
}
```

Because an addition operator was defined earlier, you don’t need to reimplement the addition process here. Instead, the addition assignment operator function takes advantage of the existing addition operator function, and uses it to set the left value to be the left value plus the right value:

因为加法运算在之前定义过了，这里无需重新定义。所以，加赋运算符函数使用已经存在的高级加法运算符函数来执行左值加右值的运算。

```
var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original 现在为 (4.0, 6.0)
```

You can combine the @assignment attribute with either the @prefix or @postfix attribute, as in this implementation of the prefix increment operator (++a) for Vector2D instances:

你可以将 `@assignment` 属性和 `@prefix` 或 `@postfix` 属性起来组合，实现一个`Vector2D`的前置运算符。

```
@prefix @assignment func ++ (inout vector: Vector2D) -> Vector2D {
    vector += Vector2D(x: 1.0, y: 1.0)
    return vector
}
```

The prefix increment operator function above takes advantage of the addition assignment operator defined earlier. It adds a Vector2D with x and y values of 1.0 to the Vector2D on which it is called, and returns the result:

这个前置使用了已经定义好的高级加赋运算，将自己加上一个值为 `(1.0，1.0)` 的对象然后赋给自己，然后再将自己返回。

```
var toIncrement = Vector2D(x: 3.0, y: 4.0)
let afterIncrement = ++toIncrement
// toIncrement 现在是 (4.0, 5.0)
// afterIncrement 现在也是 (4.0, 5.0)
```

> NOTE

> It is not possible to overload the default assignment operator (=). Only the compound assignment operators can be overloaded. Similarly, the ternary conditional operator (a ? b : c) cannot be overloaded.

>注意：
默认的赋值符是不可重载的。只有组合赋值符可以重载。三目条件运算符 `a？b：c` 也是不可重载。

### Equivalence Operators
### 比较运算符

Custom classes and structures do not receive a default implementation of the equivalence operators, known as the “equal to” operator (==) and “not equal to” operator (!=). It is not possible for Swift to guess what would qualify as “equal” for your own custom types, because the meaning of “equal” depends on the roles that those types play in your code.

Swift无所知道自定义类型是否相等或不等，因为等于或者不等于由你的代码说了算了。所以自定义的类和结构要使用比较符`==`或`!=`就需要重载。

To use the equivalence operators to check for equivalence of your own custom type, provide an implementation of the operators in the same way as for other infix operators:

定义相等运算符函数跟定义其他中置运算符雷同：

```
@infix func == (left: Vector2D, right: Vector2D) -> Bool {
    return (left.x == right.x) && (left.y == right.y)
}

@infix func != (left: Vector2D, right: Vector2D) -> Bool {
    return !(left == right)
}
```

The above example implements an “equal to” operator (==) to check if two Vector2D instances have equivalent values. In the context of Vector2D, it makes sense to consider “equal” as meaning “both instances have the same x values and y values”, and so this is the logic used by the operator implementation. The example also implements the “not equal to” operator (!=), which simply returns the inverse of the result of the “equal to” operator.

上述代码实现了相等运算符`==`来判断两个`Vector2D`对象是否有相等的值，相等的概念就是他们有相同的`x`值和相同的`y`值，我们就用这个逻辑来实现。接着使用`==`的结果实现了不相等运算符`!=`。

You can now use these operators to check whether two Vector2D instances are equivalent:

现在我们可以使用这两个运算符来判断两个`Vector2D`对象是否相等。

```
let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    println("这两个向量是相等的.")
}
// prints "这两个向量是相等的."
```

### Custom Operators
### 自定义运算符

You can declare and implement your own custom operators in addition to the standard operators provided by Swift. Custom operators can be defined only with the characters / = - + * % < > ! & | ^ . ~.

标准的运算符不够玩，那你可以声明一些个性的运算符，但个性的运算符只能使用这些字符 `/ = - + * % < >！& | ^。~`。

New operators are declared at a global level using the operator keyword, and can be declared as prefix, infix or postfix:

新的运算符声明需在全局域使用`operator`关键字声明，可以声明为前置，中置或后置的。

```
operator prefix +++ {}
```

The example above defines a new prefix operator called +++. This operator does not have an existing meaning in Swift, and so it is given its own custom meaning below in the specific context of working with Vector2D instances. For the purposes of this example, +++ is treated as a new “prefix doubling incrementer” operator. It doubles the x and y values of a Vector2D instance, by adding the vector to itself with the addition assignment operator defined earlier:

这段代码定义了一个新的前置运算符叫`+++`，此前Swift并不存在这个运算符。此处为了演示，我们让`+++`对`Vector2D`对象的操作定义为 `双自增` 这样一个独有的操作，这个操作使用了之前定义的加赋运算实现了自已加上自己然后返回的运算。

```
@prefix @assignment func +++ (inout vector: Vector2D) -> Vector2D {
    vector += vector
    return vector
}
```

This implementation of +++ is very similar to the implementation of ++ for Vector2D, except that this operator function adds the vector to itself, rather than adding Vector2D(1.0, 1.0):

`Vector2D` 的 `+++` 的实现和 `++` 的实现很接近, 唯一不同的前者是加自己, 后者是加值为 `(1.0, 1.0)` 的向量. 

```
var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled 现在是 (2.0, 8.0)
// afterDoubling 现在也是 (2.0, 8.0)
```

### Precedence and Associativity for Custom Infix Operators
### 自定义中置运算符的优先级和结合性

Custom infix operators can also specify a precedence and an associativity. See [Precedence and Associativity](#PrecedenceandAssociativity) for an explanation of how these two characteristics affect an infix operator’s interaction with other infix operators.

可以为自定义的中置运算符指定优先级和结合性。可以回头看看[优先级和结合性](#PrecedenceandAssociativity)解释这两个因素是如何影响多种中置运算符混合的表达式的计算的。

The possible values for associativity are left, right, and none. Left-associative operators associate to the left if written next to other left-associative operators of the same precedence. Similarly, right-associative operators associate to the right if written next to other right-associative operators of the same precedence. Non-associative operators cannot be written next to other operators with the same precedence.

结合性(associativity)的值可取的值有`left`，`right`和`none`。左结合运算符跟其他优先级相同的左结合运算符写在一起时，会跟左边的操作数结合。同理，右结合运算符会跟右边的操作数结合。而非结合运算符不能跟其他相同优先级的运算符写在一起。

The associativity value defaults to none if it is not specified. The precedence value defaults to 100 if it is not specified.

结合性(associativity)的值默认为`none`，优先级(precedence)默认为`100`。

The following example defines a new custom infix operator called +-, with left associativity and a precedence of 140:

以下例子定义了一个新的中置符`+-`，是左结合的`left`，优先级为`140`。

```
operator infix +- { associativity left precedence 140 }
func +- (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y - right.y)
}
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector 此时的值为 (4.0, -2.0)
```

This operator adds together the x values of two vectors, and subtracts the y value of the second vector from the first. Because it is in essence an “additive” operator, it has been given the same associativity and precedence values (left and 140) as default additive infix operators such as + and -. For a complete list of the default Swift operator precedence and associativity settings, see [Expressions](Expressions).

这个运算符把两个向量的`x`相加，把向量的`y`相减。因为他实际是属于加减运算，所以让它保持了和加法一样的结合性和优先级(`left`和`140`)。查阅完整的Swift默认结合性和优先级的设置，请移步[表达式](../chapter3/04_Expressions.html);