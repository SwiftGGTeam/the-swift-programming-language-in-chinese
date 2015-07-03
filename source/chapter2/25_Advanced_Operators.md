> 翻译：[xielingwang](https://github.com/xielingwang)  
> 校对：[numbbbbb](https://github.com/numbbbbb)

# 高级运算符
-----------------

本页内容包括：

- [位运算符](#bitwise_operators)
- [溢出运算符](#overflow_operators)
- [优先级和结合性(Precedence and Associativity)](#precedence_and_associativity)
- [运算符函数(Operator Functions)](#operator_functions)
- [自定义运算符](#custom_operators)

除了在之前介绍过的[基本运算符](02_Basic_Operators.html)，Swift 中还有许多可以对数值进行复杂操作的高级运算符。这些高级运算符包含了在 C 和 Objective-C 中已经被大家所熟知的位运算符和移位运算符。

与C语言中的算术运算符不同，Swift 中的算术运算符默认是不会溢出的。所有溢出行为都会被捕获并报告为错误。如果想让系统允许溢出行为，可以选择使用 Swift 中另一套默认支持溢出的运算符，比如溢出加法运算符(`&+`)。所有的这些溢出运算符都是以 `&` 开头的。

在定义自有的结构体、类和枚举时，最好也同时为它们提供标准swift运算符的实现。Swift简化了运算符的自定义实现，也使判断不同类型所对应的行为更为简单。

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

结合性(`associativity`)定义相同优先级的运算符在一起时是怎么组合或关联的，是和左边的一组呢，还是和右边的一组。意思就是，到底是和左边的表达式结合呢，还是和右边的表达式结合？

在混合表达式中，运算符的优先级和结合性是非常重要的。举个例子，为什么下列表达式的结果为`4`？

```swift
2 + 3 * 4 % 5
// 结果是 4
```

如果严格地从左计算到右，计算过程会是这样：


- 2 + 3 = 5
- 5 * 4 = 20
- 20 / 5 = 4 余 0

但是正确答案是`4`而不是`0`。优先级高的运算符要先计算，在Swift和C语言中，都是先乘除后加减的。所以，执行完乘法和求余运算才能执行加减运算。

乘法和求余拥有相同的优先级，在运算过程中，我们还需要结合性，乘法和求余运算都是左结合的。这相当于在表达式中有隐藏的括号让运算从左开始。

```swift
2 + ((3 * 4) % 5)
```

3 * 4 = 12，所以这相当于：


```swift
2 + (12 % 5)
```

12 % 5 = 2，所这又相当于

```swift
2 + 2
```

计算结果为 4。

查阅Swift运算符的优先级和结合性的完整列表，请看[表达式](../chapter3/04_Expressions.html)。

> 注意：  
Swift的运算符较C语言和Objective-C来得更简单和保守，这意味着跟基于C的语言可能不一样。所以，在移植已有代码到Swift时，注意去确保代码按你想的那样去执行。

<a name="operator_functions"></a>
## 运算符函数

让已有的运算符也可以对自定义的类和结构进行运算，这称为运算符重载。

这个例子展示了如何用`+`让一个自定义的结构做加法。算术运算符`+`是一个两目运算符，因为它有两个操作数，而且它必须出现在两个操作数之间。

例子中定义了一个名为`Vector2D`的二维坐标向量 `(x，y)` 的结构，然后定义了让两个`Vector2D`的对象相加的运算符函数。

```swift
struct Vector2D {
    var x = 0.0, y = 0.0
}
@infix func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}
```

该运算符函数定义了一个全局的`+`函数，这个函数需要两个`Vector2D`类型的参数，返回值也是`Vector2D`类型。需要定义和实现一个中置运算的时候，在关键字`func`之前写上属性 `@infix` 就可以了。

在这个代码实现中，参数被命名为了`left`和`right`，代表`+`左边和右边的两个`Vector2D`对象。函数返回了一个新的`Vector2D`的对象，这个对象的`x`和`y`分别等于两个参数对象的`x`和`y`的和。

这个函数是全局的，而不是`Vector2D`结构的成员方法，所以任意两个`Vector2D`对象都可以使用这个中置运算符。

```swift
let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector 是一个新的Vector2D, 值为 (5.0, 5.0)
```

这个例子实现两个向量 `(3.0，1.0)` 和 `(2.0，4.0)` 相加，得到向量 `(5.0，5.0)` 的过程。如下图示：

![Art/vectorAddition_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/vectorAddition_2x.png "Art/vectorAddition_2x.png")

### 前置和后置运算符

上个例子演示了一个双目中置运算符的自定义实现，同样我们也可以玩标准单目运算符的实现。单目运算符只有一个操作数，在操作数之前就是前置的，如`-a`; 在操作数之后就是后置的，如`i++`。

实现一个前置或后置运算符时，在定义该运算符的时候于关键字`func`之前标注 `@prefix` 或 `@postfix` 属性。

```swift
@prefix func - (vector: Vector2D) -> Vector2D {
    return Vector2D(x: -vector.x, y: -vector.y)
}
```

这段代码为`Vector2D`类型提供了单目减运算`-a`，`@prefix`属性表明这是个前置运算符。

对于数值，单目减运算符可以把正数变负数，把负数变正数。对于`Vector2D`，单目减运算将其`x`和`y`都进进行单目减运算。

```swift
let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative 为 (-3.0, -4.0)
let alsoPositive = -negative
// alsoPositive 为 (3.0, 4.0)
```

### 组合赋值运算符

组合赋值是其他运算符和赋值运算符一起执行的运算。如`+=`把加运算和赋值运算组合成一个操作。实现一个组合赋值符号需要使用`@assignment`属性，还需要把运算符的左参数设置成`inout`，因为这个参数会在运算符函数内直接修改它的值。

```swift
@assignment func += (inout left: Vector2D, right: Vector2D) {
    left = left + right
}
```

因为加法运算在之前定义过了，这里无需重新定义。所以，加赋运算符函数使用已经存在的高级加法运算符函数来执行左值加右值的运算。

```swift
var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original 现在为 (4.0, 6.0)
```

你可以将 `@assignment` 属性和 `@prefix` 或 `@postfix` 属性起来组合，实现一个`Vector2D`的前置运算符。

```swift
@prefix @assignment func ++ (inout vector: Vector2D) -> Vector2D {
    vector += Vector2D(x: 1.0, y: 1.0)
    return vector
}
```

这个前置使用了已经定义好的高级加赋运算，将自己加上一个值为 `(1.0，1.0)` 的对象然后赋给自己，然后再将自己返回。

```swift
var toIncrement = Vector2D(x: 3.0, y: 4.0)
let afterIncrement = ++toIncrement
// toIncrement 现在是 (4.0, 5.0)
// afterIncrement 现在也是 (4.0, 5.0)
```

>注意：  
默认的赋值符(=)是不可重载的。只有组合赋值符可以重载。三目条件运算符 `a？b：c` 也是不可重载。

### 比较运算符

Swift无所知道自定义类型是否相等或不等，因为等于或者不等于由你的代码说了算了。所以自定义的类和结构要使用比较符`==`或`!=`就需要重载。

定义相等运算符函数跟定义其他中置运算符雷同：

```swift
@infix func == (left: Vector2D, right: Vector2D) -> Bool {
    return (left.x == right.x) && (left.y == right.y)
}

@infix func != (left: Vector2D, right: Vector2D) -> Bool {
    return !(left == right)
}
```

上述代码实现了相等运算符`==`来判断两个`Vector2D`对象是否有相等的值，相等的概念就是它们有相同的`x`值和相同的`y`值，我们就用这个逻辑来实现。接着使用`==`的结果实现了不相等运算符`!=`。

现在我们可以使用这两个运算符来判断两个`Vector2D`对象是否相等。

```swift
let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    println("这两个向量是相等的.")
}
// prints "这两个向量是相等的."
```

### 自定义运算符

标准的运算符不够玩，那你可以声明一些个性的运算符，但个性的运算符只能使用这些字符 `/ = - + * % < > ! & | ^ . ~`。

新的运算符声明需在全局域使用`operator`关键字声明，可以声明为前置，中置或后置的。

```swift
operator prefix +++ {}
```


这段代码定义了一个新的前置运算符叫`+++`，此前Swift并不存在这个运算符。此处为了演示，我们让`+++`对`Vector2D`对象的操作定义为 `双自增` 这样一个独有的操作，这个操作使用了之前定义的加赋运算实现了自已加上自己然后返回的运算。

```swift
@prefix @assignment func +++ (inout vector: Vector2D) -> Vector2D {
    vector += vector
    return vector
}
```

`Vector2D` 的 `+++` 的实现和 `++` 的实现很接近, 唯一不同的是前者是加自己, 后者是加值为 `(1.0, 1.0)` 的向量.

```swift
var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled 现在是 (2.0, 8.0)
// afterDoubling 现在也是 (2.0, 8.0)
```

### 自定义中置运算符的优先级和结合性

可以为自定义的中置运算符指定优先级和结合性。可以回头看看[优先级和结合性](#PrecedenceandAssociativity)解释这两个因素是如何影响多种中置运算符混合的表达式的计算的。

结合性(associativity)的值可取的值有`left`，`right`和`none`。左结合运算符跟其他优先级相同的左结合运算符写在一起时，会跟左边的操作数结合。同理，右结合运算符会跟右边的操作数结合。而非结合运算符不能跟其他相同优先级的运算符写在一起。

结合性(associativity)的值默认为`none`，优先级(precedence)默认为`100`。

以下例子定义了一个新的中置符`+-`，是左结合的`left`，优先级为`140`。

```swift
operator infix +- { associativity left precedence 140 }
func +- (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y - right.y)
}
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector 此时的值为 (4.0, -2.0)
```

这个运算符把两个向量的`x`相加，把向量的`y`相减。因为他实际是属于加减运算，所以让它保持了和加法一样的结合性和优先级(`left`和`140`)。查阅完整的Swift默认结合性和优先级的设置，请移步[表达式](../chapter3/04_Expressions.html);
