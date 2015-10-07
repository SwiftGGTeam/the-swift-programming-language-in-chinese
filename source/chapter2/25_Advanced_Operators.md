# 高级运算符（Advanced Operators）
-----------------

> 1.0
> 翻译：[xielingwang](https://github.com/xielingwang)
> 校对：[numbbbbb](https://github.com/numbbbbb)

> 2.0
> 翻译+校对：[buginux](https://github.com/buginux)

本页内容包括：

- [位运算符](#bitwise_operators)
- [溢出运算符](#overflow_operators)
- [优先级和结合性(Precedence and Associativity)](#precedence_and_associativity)
- [运算符函数(Operator Functions)](#operator_functions)
- [自定义运算符](#custom_operators)

除了在之前介绍过的[基本运算符](./02_Basic_Operators.html)，Swift 中还有许多可以对数值进行复杂操作的高级运算符。这些高级运算符包含了在 C 和 Objective-C 中已经被大家所熟知的位运算符和移位运算符。

与C语言中的算术运算符不同，Swift 中的算术运算符默认是不会溢出的。所有溢出行为都会被捕获并报告为错误。如果想让系统允许溢出行为，可以选择使用 Swift 中另一套默认支持溢出的运算符，比如溢出加法运算符(`&+`)。所有的这些溢出运算符都是以 `&` 开头的。

在定义自有的结构体、类和枚举时，最好也同时为它们提供标准Swift运算符的实现。Swift简化了运算符的自定义实现，也使判断不同类型所对应的行为更为简单。

我们不用被预定义的运算符所限制。在 Swift 当中可以自由地定义中缀、前缀、后缀和赋值运算符，以及相应的优先级与结合性。这些运算符在代码中可以像预设的运算符一样使用，我们甚至可以扩展已有的类型以支持自定义的运算符。

<a name="bitwise_operators"></a>
## 位运算符

位运算符(`Bitwise operators`)可以操作一个数据结构中每个独立的位。它们通常被用在底层开发中，比如图形编程和创建设备驱动。位运算符在处理外部资源的原始数据时也十分有用，比如对自定义通信协议传输的数据进行编码和解码。

Swift 支持C语言中的全部位运算符，具体如下：

### 按位取反运算符(`bitwise NOT operator`)

按位取反运算符(`~`) 可以对一个数值的全部位进行取反：

![Art/bitwiseNOT_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseNOT_2x.png)

按位取反操作符是一个前置运算符，需要直接放在操作数的之前，并且它们之间不能添加任何空格。

```
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits  // 等于 0b11110000
```

`UInt8` 类型的整数有 8 个比特位，可以存储 0 ~ 255之间的任意整数。这个例子初始化了一个 `UInt8` 类型的整数，并赋值为二进制的 `00001111`，它的前 4 位都为`0`，后 4 位都为`1`。这个值等价于十进制的 `15` 。

接着使用按位取反运算符创建了一个名为 `invertedBits` 的常量，这个常量的值与全部位取反后的 `initialBits` 相等。即所有的 `0` 都变成了 `1`，同时所有的 `1` 都变成 `0`。`invertedBits` 的二进制值为 `11110000`，等价于无符号十进制数的 `240`。

### 按位与运算符(Bitwise AND Operator)

按位与运算符(`&`)可以对两个数的比特位进行合并。它返回一个新的数，只有当两个操作数的对应位*都*为 `1` 的时候，该数的对应位才为 `1`。

![Art/bitwiseAND_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseAND_2x.png "Art/bitwiseAND_2x.png")

在下面的示例当中，`firstSixBits` 和 `lastSixBits` 中间 4 个位的值都为 1 。按位与运算符对它们进行了运算，得到二进制数值 `00111100`，等价于无符号十进制数的 `60`：

```
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8  = 0b00111111
let middleFourBits = firstSixBits & lastSixBits  // 等于 00111100
```

### 按位或运算符(Bitwise OR Operator)

按位或运算符(`|`)可以对两个数的比特位进行比较。它返回一个新的数，只要两个操作数的对应位中有*任意*一个为 `1` 时，该数的对应位就为 `1`。

![Art/bitwiseOR_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseOR_2x.png "Art/bitwiseOR_2x.png")

在下面的示例当中，`someBits` 和 `moreBits` 将不同的位设置为 `1`。接位或运算符对它们进行了运算，得到二进制数值 `11111110`，等价于无符号十进制数的 `254`：

```
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedbits = someBits | moreBits  // 等于 11111110
```

### 按位异或运算符(Bitwise XOR Opoerator)

按位异或运算符(`^`)可以对两个数的比特位进行比较。它返回一个新的数，当两个操作数的对应位不相同时，该数的对应位就为 `1`：

![Art/bitwiseXOR_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitwiseXOR_2x.png "Art/bitwiseXOR_2x.png")

在下面的示例当中，`firstBits` 和 `otherBits` 都有一个自己设置为 `1` 而对方设置为 `0` 的位。 按位异或运算符将这两个位都设置为 `1`，同时将其它位都设置为 `0`：

```
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // 等于 00010001
```

### 按位左移/右移运算符

按位左移运算符(`<<`)和按位右移运算符(`>>`)可以对一个数进行指定位数的左移和右移，但是需要遵守下面定义的规则。

对一个数进行按位左移或按位右移，相当于对这个数进行乘以 2 或除以 2 的运算。将一个整数左移一位，等价于将这个数乘以 2，同样地，将一个整数右移一位，等价于将这个数除以 2。

#### 无符号整型的移位操作

对无符号整型进行移位的规则如下：

1. 已经存在的比特位按指定的位数进行左移和右移。
2. 任何移动超出整型存储边界的位都会被丢弃。
3. 用 0 来填充移动后产生的空白位。

这种方法称为逻辑移位(`logical shift`)。

以下这张图展示了 `11111111 << 1`(即把 `11111111` 向左移动 1 位)，和 `11111111 >> 1`(即把 `11111111` 向右移动 1 位) 的结果。蓝色的部分是被移位的，灰色的部分是被抛弃的，橙色的部分则是被填充进来的。

![Art/bitshiftUnsigned_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftUnsigned_2x.png "Art/bitshiftUnsigned_2x.png")

下面的代码演示了 Swift 中的移位操作：

```
let shiftBits: UInt8 = 4   // 即二进制的00000100
shiftBits << 1             // 00001000
shiftBits << 2             // 00010000
shiftBits << 5             // 10000000
shiftBits << 6             // 00000000
shiftBits >> 2             // 00000001
```

可以使用移位操作对其他的数据类型进行编码和解码：

```
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent 是 0xCC, 即 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent 是 0x66, 即 102
let blueComponent = pink & 0x0000FF           // blueComponent 是 0x99, 即 153
```

这个示例使用了一个命名为 `pink` 的 `UInt32` 型常量来存储层叠样式表(`CSS`)中粉色的颜色值。该 `CSS` 的十六进制颜色值 `#CC6699`， 在 Swift 中表示为 `0xCC6699`。然后利用按位与运算符(`&`)和按位右移运算符(`>>`)从这个颜色值中分解出红(`CC`)、绿(`66`)以及蓝(`99`)三个部分。

红色部分是通过对 `0xCC6699` 和 `0xFF0000` 进行按位与运算后得到的。`0xFF0000` 中的 `0` 部分作为*掩码*，掩盖了 `OxCC6699` 中的第二和第三个字节，使得数值中的 `6699` 被忽略，只留下 `0xCC0000`。

然后，再将这个数按向右移动 16 位(`>> 16`)。十六进制中每两个字符表示 8 个比特位，所以移动 16 位后 `0xCC0000` 就变为 `0x0000CC`。这个数和`0xCC`是等同的，也就是十进制数值的 `204`。

同样的，绿色部分通过对 `0xCC6699` 和 `0x00FF00` 进行按位与运算得到 `0x006600`。然后将这个数向右移动 8 位，得到 `0x66`，也就是十进制数值的 `102`。

最后，蓝色部分通过对 `0xCC6699` 和 `0x0000FF` 进行按位与运算得到 `0x000099`。并且不需要进行向右移位，所以结果为 `0x99` ，也就是十进制数值的 `153`。

#### 有符号整型的移位操作

对比无符号整型来说，有符整型的移位操作相对复杂得多，这种复杂性源于有符号整数的二进制表现形式。(为了简单起见，以下的示例都是基于 8 位有符号整数的，但是其中的原理对任何位数的有符号整数都是通用的。)

有符号整数使用第 1 个比特位(通常被称为符号位)来表示这个数的正负。符号位为 `0` 代表正数，为 `1` 代表负数。

其余的比特位(通常被称为数值位)存储了这个数的真实值。有符号正整数和无符号数的存储方式是一样的，都是从 `0`  开始算起。这是值为 `4` 的 `Int8` 型整数的二进制位表现形式：

![Art/bitshiftSignedFour_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedFour_2x.png "Art/bitshiftSignedFour_2x.png")

符号位为 `0`，说明这是一个正数，另外 7 位则代表了十进制数值 `4` 的二进制表示。

负数的存储方式略有不同。它存储的是 `2` 的 n 次方减去它的真实值绝对值，这里的 n 为数值位的位数。一个 8 位的数有 7 个数值位，所以是 2 的 7 次方，即 128。

这是值为 `-4` 的 `Int8` 型整数的二进制位表现形式：

![Art/bitshiftSignedMinusFour_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedMinusFour_2x.png "Art/bitshiftSignedMinusFour_2x.png")

这次的符号位为 `1`，说明这是一个负数，另外 7 个位则代表了数值 `124`(即 `128 - 4`) 的二进制表示。

![Art/bitshiftSignedMinusFourValue_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedMinusFourValue_2x.png "Art/bitshiftSignedMinusFourValue_2x.png")

负数的表示通常被称为二进制补码(`two's complement`)表示法。用这种方法来表示负数乍看起来有点奇怪，但它有几个优点。

首先，如果想对 `-1` 和 `-4` 进行加法操作，我们只需要将这两个数的全部 8 个比特位进行相加，并且将计算结果中超出 8 位的数值丢弃：

![Art/bitshiftSignedAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSignedAddition_2x.png "Art/bitshiftSignedAddition_2x.png")

其次，使用二进制补码可以使负数的按位左移和右移操作得到跟正数同样的效果，即每向左移一位就将自身的数值乘以 2，每向右一位就将自身的数值除以 2。要达到此目的，对有符号整数的右移有一个额外的规则：

* 当对正整数进行按位右移操作时，遵循与无符号整数相同的规则，但是对于移位产生的空白位使用*符号位*进行填充，而不是用 0。

![Art/bitshiftSigned_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/bitshiftSigned_2x.png "Art/bitshiftSigned_2x.png")

这个行为可以确保有符号整数的符号位不会因为右移操作而改变，这通常被称为算术移位(`arithmetic shift`)。

由于正数和负数的特殊存储方式，在对它们进行右移的时候，会使它们越来越接近 0。在移位的过程中保持符号位不变，意味着负整数在接近 `0` 的过程中会一直保持为负。

<a name="overflow_operators"></a>
## 溢出运算符

在默认情况下，当向一个整数赋超过它容量的值时，Swift 默认会报错，而不是生成一个无效的数。这个行为给我们操作过大或着过小的数的时候提供了额外的安全性。

例如，`Int16` 型整数能容纳的有符号整数范围是 `-32768` 到 `32767`，当为一个 `Int16` 型变量赋的值超过这个范围时，系统就会报错：

```
var potentialOverflow = Int16.max
// potentialOverflow 的值是 32767, 这是 Int16 能容纳的最大整数

potentialOverflow += 1
// 这里会报错
```

为过大或者过小的数值提供错误处理，能让我们在处理边界值时更加灵活。

然而，也可以选择让系统在数值溢出的时候采取截断操作，而非报错。可以使用 Swift 提供的三个溢出操作符(`overflow operators`)来让系统支持整数溢出运算。这些操作符都是以 `&` 开头的：

* 溢出加法 `&+`
* 溢出减法 `&-`
* 溢出乘法 `&*`

### 数值溢出

数值有可能出现上溢或者下溢。

这个示例演示了当我们对一个无符号整数使用溢出加法(`&+`)进行上溢运算时会发生什么：
```
var unsignedOverflow = UInt8.max
// unsignedOverflow 等于 UInt8 所能容纳的最大整数 255

unsignedOverflow = unsignedOverflow &+ 1
// 此时 unsignedOverflow 等于 0
```

`unsignedOverflow` 被初始化为 `UInt8` 所能容纳的最大整数(`255`，以二进制表示即 `11111111`)。然后使用了溢出加法运算符(`&+`)对其进行加 1 操作。这使得它的二进制表示正好超出 `UInt8` 所能容纳的位数，也就导致了数值的溢出，如下图所示。数值溢出后，留在 `UInt8` 边界内的值是 `00000000`，也就是十进制数值的 0。

![Art/overflowAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowAddition_2x.png "Art/overflowAddition_2x.png")

同样地，当我们对一个无符号整数使用溢出减法(`&-`)进行下溢运算时也会产生类似的现象：

```
var unsignedOverflow = UInt8.min
// unsignedOverflow 等于 UInt8 所能容纳的最小整数 0

unsignedOverflow = unsignedOverflow &- 1
// 此时 unsignedOverflow 等于 255
```

`UInt8` 型整数能容纳的最小值是 0，以二进制表示即 `00000000`。当使用溢出减法运算符对其进行减 1 操作时，数值会产生下溢并被截断为 `11111111`， 也就是十进制数值的 255。

![Art/overflowUnsignedSubtraction_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowUnsignedSubtraction_2x.png "Art/overflowAddition_2x.png")

溢出也会发生在有符号整型数值上。在对有符号整型数值进行溢出加法或溢出减法运算时，符号位也需要参与计算，正如[按位左移/右移运算符](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID34)所描述的。

```
var signedOverflow = Int8.min
// signedOverflow 等于 Int8 所能容纳的最小整数 -128

signedOverflow = signedOverflow &- 1
// 此时 signedOverflow 等于 127
```

`Int8` 型整数能容纳的最小值是 -128，以二进制表示即 `10000000`。当使用溢出减法操作符对其进行减 1 操作时，符号位被翻转，得到二进制数值 `01111111`，也就是十进制数值的 `127`，这个值也是 `Int8` 型整数所能容纳的最大值。

![Art/overflowSignedSubtraction_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/overflowSignedSubtraction_2x.png "Art/overflowSignedSubtraction_2x.png")

对于无符号与有符号整型数值来说，当出现上溢时，它们会从数值所能容纳的最大数变成最小的数。同样地，当发生下溢时，它们会从所能容纳的最小数变成最大的数。

<a name="precedence_and_associativity"></a>
## 优先级和结合性

运算符的优先级(`precedence`)使得一些运算符优先于其他运算符，高优先级的运算符会先被计算。

结合性(`associativity`)定义了相同优先级的运算符是如何结合（或关联）的 —— 是与左边结合为一组，还是与右边结合为一组。可以将这意思理解为“它们是与左边的表达式结合的”或者“它们是与右边的表达式结合的”。

在复合表达式的运算顺序中，运算符的优先级和结合性是非常重要的。举例来说，为什么下面这个表达式的运算结果是 `4`？

```swift
2 + 3 * 4 % 5
// 结果是 4
```

如果严格地从左到右进行运算，则运算的过程是这样的：

- 2 + 3 = 5
- 5 * 4 = 20
- 20 % 5 = 0

但是正确答案是 `4` 而不是 `0`。优先级高的运算符要先于优先级低的运算符进行计算。与C语言类似，在 Swift 当中，乘法运算符(`*`)与取余运算符(`%`)的优先级高于加法运算符(`+`)。因此，它们的计算顺序要先于加法运算。

而乘法与取余的优先级相同。这时为了得到正确的运算顺序，还需要考虑结合性。乘法与取余运算都是左结合的。可以将这考虑成为这两部分表达式都隐式地加上了括号：

```swift
2 + ((3 * 4) % 5)
```

`(3 * 4) = 12`，所以表达式相当于：


```swift
2 + (12 % 5)
```

`12 % 5 = 2`，所以表达式相当于：

```swift
2 + 2
```

此时可以容易地看出计算的结果为 `4`。

如果想查看完整的 Swift 运算符优先级和结合性规则，请参考[表达式](../chapter3/04_Expressions.html)。

> 注意：  
> 对于C语言和 Objective-C 来说，Swift 的运算符优先级和结合性规则是更加简洁和可预测的。但是，这也意味着它们于那些基于C的语言不是完全一致的。在对现有的代码进行移植的时候，要注意确保运算符的行为仍然是按照你所想的那样去执行。

<a name="operator_functions"></a>
## 运算符函数

类和结构可以为现有的操作符提供自定义的实现，这通常被称为运算符重载(`overloading`)。

下面的例子展示了如何为自定义的结构实现加法操作符(`+`)。算术加法运算符是一个两目运算符(`binary operator`)，因为它可以对两个目标进行操作，同时它还是中缀(`infix`)运算符，因为它出现在两个目标中间。

例子中定义了一个名为 `Vector2D` 的结构体用来表示二维坐标向量`(x, y)`，紧接着定义了一个可以对两个 `Vector2D` 结构体进行相加的运算符函数(`operator function`)：

```swift
struct Vector2D {
    var x = 0.0, y = 0.0
}

func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}
```

该运算符函数被定义为一个全局函数，并且函数的名字与它要进行重载的 `+` 名字一致。因为算术加法运算符是双目运算符，所以这个运算符函数接收两个类型为 `Vector2D` 的输入参数，同时有一个 `Vector2D` 类型的返回值。

在这个实现中，输入参数分别被命名为 `left` 和 `right`，代表在 `+` 运算符左边和右边的两个 `Vector2D` 对象。函数返回了一个新的 `Vector2D` 的对象，这个对象的 `x` 和 `y` 分别等于两个参数对象的 `x` 和 `y` 的值之和。

这个函数被定义成全局的，而不是 `Vector2D` 结构的成员方法，所以任意两个 `Vector2D` 对象都可以使用这个中缀运算符：

```swift
let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector 是一个新的Vector2D, 值为 (5.0, 5.0)
```

这个例子实现两个向量 `(3.0，1.0)` 和 `(2.0，4.0)` 的相加，并得到新的向量 `(5.0，5.0)`。这个过程如下图示：

![Art/vectorAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/vectorAddition_2x.png "Art/vectorAddition_2x.png")

### 前缀和后缀运算符

上个例子演示了一个双目中缀运算符的自定义实现。类与结构体也能提供标准单目运算符(`unary operators`)的实现。单目运算符只有一个操作目标。当运算符出现在操作目标之前时，它就是前缀(`prefix`)的(比如 `-a`)，而当它出现在操作目标之后时，它就是后缀(`postfix`)的(比如 `i++`)。

要实现前缀或者后缀运算符，需要在声明运算符函数的时候在 `func` 关键字之前指定 `prefix` 或者 `postfix` 限定符：

```swift
prefix func - (vector: Vector2D) -> Vector2D {
    return Vector2D(x: -vector.x, y: -vector.y)
}
```

这段代码为 `Vector2D` 类型实现了单目减运算符(`-a`)。由于单目减运算符是前缀运算符，所以这个函数需要加上 `prefix` 限定符。

对于简单数值，单目减运算符可以对它们的正负性进行改变。对于 `Vector2D` 来说，单目减运算将其 `x` 和 `y` 属性的正负性都进行了改变。

```swift
let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative 是一个值为 (-3.0, -4.0) 的 Vector2D 实例

let alsoPositive = -negative
// alsoPositive 是一个值为 (3.0, 4.0) 的 Vector2D 实例
```

### 复合赋值运算符

复合赋值运算符(`Compound assignment operators`)将赋值运算符(`=`)与其它运算符进行结合。比如，将加法与赋值结合成加法赋值运算符(`+=`)。在实现的时候，需要把运算符的左参数设置成 `inout` 类型，因为这个参数的值会在运算符函数内直接被修改。

```swift
func += (inout left: Vector2D, right: Vector2D) {
    left = left + right
}
```

因为加法运算在之前已经定义过了，所以在这里无需重新定义。在这里可以直接利用现有的加法运算符函数，用它来对左值和右值进行相加，并再次赋值给左值：

```swift
var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original 的值现在为 (4.0, 6.0)
```

还可以将赋值与 `prefix` 或 `postfix` 限定符结合起来，下面的代码为 `Vector2D` 实例实现了前缀自增运算符(`++a`)：

```swift
prefix func ++ (inout vector: Vector2D) -> Vector2D {
    vector += Vector2D(x: 1.0, y: 1.0)
    return vector
}
```

这个前缀自增运算符使用了前面定义的加法赋值操作。它对 `Vector2D` 的 `x` 和 `y` 属性都进行了加 `1` 操作，再将结果返回：

```swift
var toIncrement = Vector2D(x: 3.0, y: 4.0)
let afterIncrement = ++toIncrement
// toIncrement 的值现在为 (4.0, 5.0)
// afterIncrement 的值同样为 (4.0, 5.0)
```

> 注意：
> 不能对默认的赋值运算符(`=`)进行重载。只有组合赋值符可以被重载。同样地，也无法对三目条件运算符 `a ? b : c` 进行重载。

<a name="equivalence_operators"></a>
### 等价操作符

自定义的类和结构体没有对等价操作符(`equivalence operators`)进行默认实现，等价操作符通常被称为“相等”操作符(`==`)与“不等”操作符(`!=`)。对于自定义类型，Swift 无法判断其是否“相等”，因为“相等”的含义取决于这些自定义类型在你的代码中所扮演的角色。

为了使用等价操作符来对自定义的类型进行判等操作，需要为其提供自定义实现，实现的方法与其它中缀运算符一样：

```swift
func == (left: Vector2D, right: Vector2D) -> Bool {
    return (left.x == right.x) && (left.y == right.y)
}
func != (left: Vector2D, right: Vector2D) -> Bool {
    return !(left == right)
}
```

上述代码实现了“相等”运算符(`==`)来判断两个 `Vector2D` 对象是否有相等。对于 `Vector2D` 类型来说，“相等”意味“两个实例的 `x`属性 和 `y` 属性都相等”，这也是代码中用来进行判等的逻辑。示例里同时也实现了“不等”操作符(`!=`)，它简单地将“相等”操作符进行取反后返回。

现在我们可以使用这两个运算符来判断两个 `Vector2D` 对象是否相等。

```swift
let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    print("These two vectors are equivalent.")
}
// prints "These two vectors are equivalent."
```

<a name="custom_operators"></a>
### 自定义运算符

除了实现标准运算符，在 Swift 当中还可以声明和实现自定义运算符(`custom operators`)。可以用来自定义运算符的字符列表请参考[操作符](../chapter3/02_Lexical_Structure.html#operators)

新的运算符要在全局作用域内，使用 `operator` 关键字进行声明，同时还要指定 `prefix`、`infix` 或者 `postfix` 限定符：

```swift
prefix operator +++ {}
```

上面的代码定义了一个新的名为 `+++` 的前缀运算符。对于这个运算符，在 Swift 中并没有意义，因为我们针对 `Vector2D` 的实例来定义它的意义。对这个示例来讲，`+++` 被实现为“前缀双自增”运算符。它使用了前面定义的复合加法操作符来让矩阵对自身进行相加，从而让 `Vector2D` 实例的 `x` 属性和 `y`属性的值翻倍：

```swift
prefix func +++ (inout vector: Vector2D) -> Vector2D {
    vector += vector
    return vector
}
```

`Vector2D` 的 `+++` 的实现和 `++` 的实现很相似, 唯一不同的是前者对自身进行相加, 而后者是与另一个值为 `(1.0, 1.0)` 的向量相加.

```swift
var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled 现在的值为 (2.0, 8.0)
// afterDoubling 现在的值也为 (2.0, 8.0)
```

### 自定义中缀运算符的优先级和结合性

自定义的中缀(`infix`)运算符也可以指定优先级(`precedence`)和结合性(`associativity`)。[优先级和结合性](#PrecedenceandAssociativity)中详细阐述了这两个特性是如何对中缀运算符的运算产生影响的。

结合性(`associativity`)可取的值有` left`，`right` 和 `none`。当左结合运算符跟其他相同优先级的左结合运算符写在一起时，会跟左边的操作数进行结合。同理，当右结合运算符跟其他相同优先级的右结合运算符写在一起时，会跟右边的操作数进行结合。而非结合运算符不能跟其他相同优先级的运算符写在一起。

结合性(`associativity`)的默认值是 `none`，优先级(`precedence`)如果没有指定，则默认为 `100`。

以下例子定义了一个新的中缀运算符 `+-`，此操作符是左结合的，并且它的优先级为 `140`：

```swift
infix operator +- { associativity left precedence 140 }
func +- (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y - right.y)
}
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector 是一个 Vector2D 类型，并且它的值为 (4.0, -2.0)
```

这个运算符把两个向量的 `x` 值相加，同时用第一个向量的 `y` 值减去第二个向量的 `y` 值。因为它本质上是属于“加型”运算符，所以将它的结合性和优先级被设置为(`left` 和 `140`)，这与 `+` 和 `-` 等默认的中缀加型操作符是相同的。完整的 Swift 操作符默认结合性与优先级请参考[表达式](../chapter3/04_Expressions.html)。

> 注意：
> 当定义前缀与后缀操作符的时候，我们并没有指定优先级。然而，如果对同一个操作数同时使用前缀与后缀操作符，则后缀操作符会先被执行。
