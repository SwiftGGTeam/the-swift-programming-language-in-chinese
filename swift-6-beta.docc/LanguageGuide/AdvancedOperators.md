# 高级运算符

定义自定义运算符、执行位运算和使用构建器语法。

除了<doc:BasicOperators>中描述的运算符外,Swift 还提供了几种执行更复杂值操作的高级运算符。这些包括您在 C 和 Objective-C 中熟悉的所有位运算符和位移运算符。

与 C 中的算术运算符不同,Swift 中的算术运算符默认不会溢出。溢出行为会被捕获并报告为错误。要选择溢出行为，请使用 Swift 的第二组默认溢出的算术运算符，例如溢出加法运算符(`&+`)。所有这些溢出运算符都以 & 符号开头。

当您定义自己的结构体、类和枚举时，为这些自定义类型提供 Swift 标准运算符的自己实现可能会很有用。Swift 使为这些运算符提供量身定制的实现变得容易，并可以精确地确定它们对您创建的每种类型的行为应该是什么。

您并不局限于预定义的运算符。Swift 给予您自由定义自己的自定义中缀、前缀、后缀和赋值运算符的能力，并带有自定义优先级和结合性值。这些运算符可以像任何预定义运算符一样在您的代码中使用和采用，您甚至可以扩展现有类型以支持您定义的自定义运算符。

## 位运算符

*位运算符*使您能够操作数据结构内的单个原始数据位。它们经常用于低级编程，如图形编程和设备驱动程序创建。当您处理来自外部源的原始数据时，位运算符也可能很有用，例如为通过自定义协议进行通信而编码和解码数据。

Swift 支持 C 中的所有位运算符，如下所述。

### 按位取反运算符

*按位取反运算符* (`~`) 对一个数字中的所有位进行取反:

![](bitwiseNOT)

按位取反运算符是一个前缀运算符，它出现在其操作的值之前，中间没有任何空格:

```swift
let initialBits: UInt8 = 0b00001111
let invertedBits = ~initialBits  // equals 11110000
```

<!--
  - test: `bitwiseOperators`

  ```swifttest
  -> let initialBits: UInt8 = 0b00001111
  >> assert(initialBits == 15)
  -> let invertedBits = ~initialBits  // equals 11110000
  >> assert(invertedBits == 240)
  ```
-->

`UInt8` 整数有八位，可以存储 `0` 到 `255` 之间的任何值。这个例子用二进制值 `00001111` 初始化一个 `UInt8` 整数，其前四位设置为 `0`,后四位设置为 `1`。这相当于十进制值 15。

<!-- Apple Books screenshot begins here. -->

然后使用按位取反运算符创建一个名为 `invertedBits` 的新常量，它等于 `initialBits`,但所有位都被取反。零变成一，一变成零。`invertedBits` 的值是 `11110000`,等于无符号十进制值 240。

### 按位与运算符

*按位与运算符* (`&`) 组合两个数字的位。它返回一个新数字，只有在两个输入数字中相应的位都等于 1 时，新数字的相应位才设置为 1:

![](bitwiseAND)

在下面的例子中,`firstSixBits` 和 `lastSixBits` 的值在中间四位都等于 1。按位与运算符将它们组合成数字 `00111100`,等于无符号十进制值 60:

```swift
let firstSixBits: UInt8 = 0b11111100
let lastSixBits: UInt8  = 0b00111111
let middleFourBits = firstSixBits & lastSixBits  // equals 00111100
```

<!--
  - test: `bitwiseOperators`

  ```swifttest
  -> let firstSixBits: UInt8 = 0b11111100
  -> let lastSixBits: UInt8  = 0b00111111
  -> let middleFourBits = firstSixBits & lastSixBits  // equals 00111100
  >> assert(middleFourBits == 0b00111100)
  ```
-->

### 按位或运算符

*按位或运算符* (`|`) 比较两个数字的位。如果*任一*输入数字中的位等于 1,则运算符返回一个新数字，其相应位设置为 1:

![](bitwiseOR)

<!-- Apple Books screenshot ends here. -->

在下面的例子中,`someBits` 和 `moreBits` 的值在不同的位上设置为 1。按位或运算符将它们组合成数字 `11111110`,等于无符号十进制值 254:

```swift
let someBits: UInt8 = 0b10110010
let moreBits: UInt8 = 0b01011110
let combinedbits = someBits | moreBits  // equals 11111110
```

<!--
  - test: `bitwiseOperators`

  ```swifttest
  -> let someBits: UInt8 = 0b10110010
  -> let moreBits: UInt8 = 0b01011110
  -> let combinedbits = someBits | moreBits  // equals 11111110
  >> assert(combinedbits == 0b11111110)
  ```
-->

### 按位异或运算符

*按位异或运算符*,或"异或运算符" (`^`),比较两个数字的位。运算符返回一个新数字，在输入位不同的地方，新数字的相应位设置为 1,在输入位相同的地方，新数字的相应位设置为 0:

![](bitwiseXOR)

在下面的例子中,`firstBits` 和 `otherBits` 的值在对方没有的位置各有一位设置为 1。按位异或运算符在其输出值中将这两位都设置为 1。`firstBits` 和 `otherBits` 中的所有其他位都匹配，在输出值中设置为 0:

```swift
let firstBits: UInt8 = 0b00010100
let otherBits: UInt8 = 0b00000101
let outputBits = firstBits ^ otherBits  // equals 00010001
```

<!--
  - test: `bitwiseOperators`

  ```swifttest
  -> let firstBits: UInt8 = 0b00010100
  -> let otherBits: UInt8 = 0b00000101
  -> let outputBits = firstBits ^ otherBits  // equals 00010001
  >> assert(outputBits == 0b00010001)
  ```
-->

### 按位左移和右移运算符

*按位左移运算符* (`<<`) 和 *按位右移运算符* (`>>`) 根据下面定义的规则，将数字中的所有位向左或向右移动特定数量的位置。

按位左移和右移相当于将整数乘以或除以 2 的幂。将整数的位向左移动一位会使其值翻倍，而向右移动一位会将其值减半。

<!--
  TODO: mention the caveats to this claim.
-->

#### 无符号整数的移位行为

无符号整数的位移行为如下:

1. 现有的位按请求的位数向左或向右移动。
2. 任何移动超出整数存储边界的位都会被丢弃。
3. 在原始位向左或向右移动后留下的空位中插入零。

这种方法被称为*逻辑移位*。

下图显示了 `11111111 << 1` (即 `11111111` 向左移动 1 位)和 `11111111 >> 1` (即 `11111111` 向右移动 1 位)的结果。绿色数字是移位的，灰色数字被丢弃，插入的粉色零:

![](bitshiftUnsigned)

以下是 Swift 代码中位移的样子:

```swift
let shiftBits: UInt8 = 4   // 00000100 in binary
shiftBits << 1             // 00001000
shiftBits << 2             // 00010000
shiftBits << 5             // 10000000
shiftBits << 6             // 00000000
shiftBits >> 2             // 00000001
```

<!--
  - test: `bitwiseShiftOperators`

  ```swifttest
  -> let shiftBits: UInt8 = 4   // 00000100 in binary
  >> let r0 =
  -> shiftBits << 1             // 00001000
  >> assert(r0 == 8)
  >> let r1 =
  -> shiftBits << 2             // 00010000
  >> assert(r1 == 16)
  >> let r2 =
  -> shiftBits << 5             // 10000000
  >> assert(r2 == 128)
  >> let r3 =
  -> shiftBits << 6             // 00000000
  >> assert(r3 == 0)
  >> let r4 =
  -> shiftBits >> 2             // 00000001
  >> assert(r4 == 1)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

您可以使用位移来编码和解码其他数据类型中的值:

```swift
let pink: UInt32 = 0xCC6699
let redComponent = (pink & 0xFF0000) >> 16    // redComponent is 0xCC, or 204
let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent is 0x66, or 102
let blueComponent = pink & 0x0000FF           // blueComponent is 0x99, or 153
```

<!--
  - test: `bitwiseShiftOperators`

  ```swifttest
  -> let pink: UInt32 = 0xCC6699
  -> let redComponent = (pink & 0xFF0000) >> 16    // redComponent is 0xCC, or 204
  -> let greenComponent = (pink & 0x00FF00) >> 8   // greenComponent is 0x66, or 102
  -> let blueComponent = pink & 0x0000FF           // blueComponent is 0x99, or 153
  >> assert(redComponent == 204)
  >> assert(greenComponent == 102)
  >> assert(blueComponent == 153)
  ```
-->

这个例子使用一个名为 `pink` 的 `UInt32` 常量来存储粉红色的级联样式表 (CSS) 颜色值。CSS 颜色值 `#CC6699` 在 Swift 的十六进制数字表示中写作 `0xCC6699`。然后，通过按位与运算符 (`&`) 和按位右移运算符 (`>>`) 将这个颜色分解为红 (`CC`)、绿 (`66`) 和蓝 (`99`) 分量。

红色分量是通过对数字 `0xCC6699` 和 `0xFF0000` 执行按位与运算得到的。`0xFF0000` 中的零有效地"掩蔽"了 `0xCC6699` 的第二和第三个字节，导致 `6699` 被忽略，留下 `0xCC0000` 作为结果。

然后，这个数字向右移动 16 位 (`>> 16`)。十六进制数中的每对字符使用 8 位，所以向右移动 16 位会将 `0xCC0000` 转换为 `0x0000CC`。这与 `0xCC` 相同，十进制值为 204。

类似地，绿色分量是通过对数字 `0xCC6699` 和 `0x00FF00` 执行按位与运算得到的，得到输出值 `0x006600`。然后将这个输出值向右移动八位，得到值 `0x66`,十进制值为 102。

最后，蓝色分量是通过对数字 `0xCC6699` 和 `0x0000FF` 执行按位与运算得到的，得到输出值 `0x000099`。因为 `0x000099` 已经等于 `0x99`,十进制值为 153,所以这个值不需要向右移位就可以使用。

#### 有符号整数的移位行为

有符号整数的移位行为比无符号整数更复杂，因为有符号整数在二进制中的表示方式。(为简单起见，下面的例子基于 8 位有符号整数，但相同的原理适用于任何大小的有符号整数。)

有符号整数使用它们的第一位(称为*符号位*)来表示整数是正数还是负数。符号位为 0 表示正数，符号位为 1 表示负数。

剩余的位(称为*值位*)存储实际值。正数的存储方式与无符号整数完全相同，从 0 开始向上计数。以下是 `Int8` 中数字 4 的位的样子:

![](bitshiftSignedFour)

符号位是 0(表示"正"),七个值位只是数字 4 的二进制表示。

然而，负数的存储方式不同。它们通过从 2 的 n 次方中减去它们的绝对值来存储，其中 n 是值位的数量。8 位数字有 7 个值位，所以这意味着 2 的 7 次方，即 128。

以下是 `Int8` 中数字 -4 的位的样子:

![](bitshiftSignedMinusFour)

这次，符号位是 `1`(表示"负数"),七个值位的二进制值是 `124`(即 `128 - 4`):

![](bitshiftSignedMinusFourValue)

这种编码负数的方法被称为*二进制补码*表示。虽然这看起来是一种不寻常的表示负数的方式，但它有几个优点。

首先，你可以将 `-1` 加到 `-4` 上，只需对所有八个位(包括符号位)执行标准的二进制加法，并在完成后丢弃任何不适合八位的内容:

![](bitshiftSignedAddition)

其次，二进制补码表示还允许你像正数一样将负数的位向左和向右移动，并且每向左移动一位仍然会使其加倍，每向右移动一位则会将其减半。为了实现这一点，在对有符号整数进行右移时使用了一个额外的规则:当你将有符号整数向右移动时，应用与无符号整数相同的规则，但用*符号位*填充左侧的任何空位，而不是用零填充。

![](bitshiftSigned)

这个操作确保了有符号整数在向右移动后保持相同的符号，这被称为*算术移位*。

由于正数和负数的存储方式特殊，将它们中的任何一个向右移动都会使它们更接近零。在这个移位过程中保持符号位不变意味着负整数在其值接近零时仍然保持为负数。

## 溢出运算符

如果你试图将一个数字插入到无法容纳该值的整数常量或变量中，默认情况下 Swift 会报告一个错误，而不是允许创建一个无效的值。当你处理太大或太小的数字时，这种行为提供了额外的安全性。

例如,`Int16` 整数类型可以保存介于 `-32768` 和 `32767` 之间的任何有符号整数。试图将 `Int16` 常量或变量设置为超出此范围的数字会导致错误:

```swift
var potentialOverflow = Int16.max
// potentialOverflow 等于 32767,这是 Int16 可以容纳的最大值
potentialOverflow += 1
// 这会导致错误
```

<!--
  - test: `overflowOperatorsWillFailToOverflow`

  ```swifttest
  -> var potentialOverflow = Int16.max
  /> potentialOverflow equals \(potentialOverflow), which is the maximum value an Int16 can hold
  </ potentialOverflow equals 32767, which is the maximum value an Int16 can hold
  -> potentialOverflow += 1
  xx overflow
  // 这会导致错误
  ```
-->

当值变得过大或过小时提供错误处理，可以让你在编写边界值条件时拥有更大的灵活性。

然而，当你特别希望溢出条件截断可用位数时，你可以选择这种行为而不是触发错误。Swift 提供了三个算术*溢出运算符*,可以选择整数计算的溢出行为。这些运算符都以 & 符号开头:

- 溢出加法 (`&+`)
- 溢出减法 (`&-`)
- 溢出乘法 (`&*`)

### 值溢出

数字可以在正方向和负方向上溢出。

这里有一个例子，展示了当允许无符号整数在正方向上溢出时会发生什么，使用溢出加法运算符 (`&+`):

```swift
var unsignedOverflow = UInt8.max
// unsignedOverflow 等于 255,这是 UInt8 可以容纳的最大值
unsignedOverflow = unsignedOverflow &+ 1
// unsignedOverflow 现在等于 0
```

<!--
  - test: `overflowOperatorsWillOverflowInPositiveDirection`

  ```swifttest
  -> var unsignedOverflow = UInt8.max
  /> unsignedOverflow equals \(unsignedOverflow), which is the maximum value a UInt8 can hold
  </ unsignedOverflow equals 255, which is the maximum value a UInt8 can hold
  -> unsignedOverflow = unsignedOverflow &+ 1
  /> unsignedOverflow is now equal to \(unsignedOverflow)
  </ unsignedOverflow is now equal to 0
  ```
-->

变量 `unsignedOverflow` 被初始化为 `UInt8` 可以容纳的最大值(`255`,或二进制的 `11111111`)。然后使用溢出加法运算符 (`&+`) 将其加 1。这将其二进制表示推到了 `UInt8` 可以容纳的大小之外，导致它溢出超出其边界，如下图所示。溢出加法后留在 `UInt8` 边界内的值是 `00000000`,或零。

![](overflowAddition)

当允许无符号整数在负方向上溢出时，也会发生类似的情况。这里有一个使用溢出减法运算符 (`&-`) 的例子:

```swift
var unsignedOverflow = UInt8.min
// unsignedOverflow 等于 0,这是 UInt8 可以容纳的最小值
unsignedOverflow = unsignedOverflow &- 1
// unsignedOverflow 现在等于 255
```

<!--
  - test: `overflowOperatorsWillOverflowInNegativeDirection`

  ```swifttest
  -> var unsignedOverflow = UInt8.min
  /> unsignedOverflow equals \(unsignedOverflow), which is the minimum value a UInt8 can hold
  </ unsignedOverflow equals 0, which is the minimum value a UInt8 can hold
  -> unsignedOverflow = unsignedOverflow &- 1
  /> unsignedOverflow is now equal to \(unsignedOverflow)
  </ unsignedOverflow is now equal to 255
  ```
-->

`UInt8` 可以容纳的最小值是零，或二进制的 `00000000`。如果你使用溢出减法运算符 (`&-`) 从 `00000000` 中减去 1,这个数字将会溢出并绕回到 `11111111`,或十进制的 `255`。

![](overflowUnsignedSubtraction)

有符号整数也会发生溢出。所有有符号整数的加法和减法都以按位方式执行，符号位作为被加或被减数字的一部分包含在内，如 <doc:AdvancedOperators#Bitwise-Left-and-Right-Shift-Operators> 中所述。

```swift
var signedOverflow = Int8.min
// signedOverflow 等于 -128,这是 Int8 可以容纳的最小值
signedOverflow = signedOverflow &- 1
// signedOverflow 现在等于 127
```

<!--
  - test: `overflowOperatorsWillOverflowSigned`

  ```swifttest
  -> var signedOverflow = Int8.min
  /> signedOverflow equals \(signedOverflow), which is the minimum value an Int8 can hold
  </ signedOverflow equals -128, which is the minimum value an Int8 can hold
  -> signedOverflow = signedOverflow &- 1
  /> signedOverflow is now equal to \(signedOverflow)
  </ signedOverflow is now equal to 127
  ```
-->

`Int8` 可以容纳的最小值是 `-128`,或二进制的 `10000000`。使用溢出运算符从这个二进制数中减去 1 得到二进制值 `01111111`,这会切换符号位并得到正 `127`,这是 `Int8` 可以容纳的最大正值。

![](overflowSignedSubtraction)

对于有符号和无符号整数，正方向的溢出会从最大有效整数值绕回到最小值，而负方向的溢出会从最小值绕回到最大值。

## 优先级和结合性

运算符*优先级*给予某些运算符比其他运算符更高的优先级;这些运算符会首先被应用。

运算符*结合性*定义了具有相同优先级的运算符如何组合在一起 --- 要么从左边组合，要么从右边组合。可以将其理解为"它们与左边的表达式相关联",或"它们与右边的表达式相关联"。

在计算复合表达式的顺序时，考虑每个运算符的优先级和结合性很重要。例如，运算符优先级解释了为什么下面的表达式等于 `17`。

```swift
2 + 3 % 4 * 5
// 这等于 17
```

<!--
  - test: `evaluationOrder`

  ```swifttest
  >> let r0 =
  -> 2 + 3 % 4 * 5
  >> assert(r0 == 17)
  /> this equals \(2 + 3 % 4 * 5)
  </ this equals 17
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

如果你严格从左到右读，你可能会期望表达式按如下方式计算:

- `2` 加 `3` 等于 `5`
- `5` 除以 `4` 余 `1`
- `1` 乘以 `5` 等于 `5`

然而，实际答案是 `17`,而不是 `5`。优先级更高的运算符在优先级较低的运算符之前被评估。在 Swift 中，就像在 C 语言中一样，余数运算符 (`%`) 和乘法运算符 (`*`) 的优先级高于加法运算符 (`+`)。因此，它们都在考虑加法之前被评估。

然而，余数和乘法具有*相同*的优先级。要确定使用的确切评估顺序，你还需要考虑它们的结合性。余数和乘法都与它们左边的表达式相关联。可以将其理解为在表达式的这些部分周围添加隐式括号，从左边开始:


```swift
2 + ((3 % 4) * 5)
```

<!--
  - test: `evaluationOrder`

  ```swifttest
  >> let r1 =
  -> 2 + ((3 % 4) * 5)
  >> assert(r1 == 17)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

`(3 % 4)` is `3`, so this is equivalent to:

```swift
2 + (3 * 5)
```

<!--
  - test: `evaluationOrder`

  ```swifttest
  >> let r2 =
  -> 2 + (3 * 5)
  >> assert(r2 == 17)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

`(3 * 5)` is `15`, so this is equivalent to:

```swift
2 + 15
```

<!--
  - test: `evaluationOrder`

  ```swifttest
  >> let r3 =
  -> 2 + 15
  >> assert(r3 == 17)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

这个计算得出的最终答案是 `17`。

有关 Swift 标准库提供的运算符的信息，包括运算符优先级组和结合性设置的完整列表，请参阅[运算符声明](https://developer.apple.com/documentation/swift/operator_declarations)。

> 注意：Swift 的运算符优先级和结合性规则比 C 和 Objective-C 中的更简单和可预测。 然而，这意味着它们与基于 C 的语言并不完全相同。 在将现有代码移植到 Swift 时，请注意确保运算符交互仍然按照您预期的方式运行。

## 运算符方法

类和结构体可以为现有运算符提供自己的实现。 这被称为*重载*现有运算符。

下面的示例展示了如何为自定义结构体实现算术加法运算符（`+`）。 算术加法运算符是一个二元运算符，因为它操作两个目标，并且它是一个中缀运算符，因为它出现在这两个目标之间。

该示例定义了一个 `Vector2D` 结构体，用于表示二维位置向量 `(x, y)`，然后定义了一个*运算符方法*来将 `Vector2D` 结构体的实例相加：

```swift
struct Vector2D {
    var x = 0.0, y = 0.0
}

extension Vector2D {
    static func + (left: Vector2D, right: Vector2D) -> Vector2D {
       return Vector2D(x: left.x + right.x, y: left.y + right.y)
    }
}
```

<!--
  - test: `customOperators`

  ```swifttest
  -> struct Vector2D {
        var x = 0.0, y = 0.0
     }
  ---
  -> extension Vector2D {
         static func + (left: Vector2D, right: Vector2D) -> Vector2D {
            return Vector2D(x: left.x + right.x, y: left.y + right.y)
         }
     }
  ```
-->

运算符方法被定义为 `Vector2D` 的类型方法，方法名称与要重载的运算符（`+`）相匹配。 由于加法不是向量的基本行为，所以类型方法在 `Vector2D` 的扩展中定义，而不是在 `Vector2D` 的主结构声明中定义。 因为算术加法运算符是一个二元运算符，所以这个运算符方法接受两个类型为 `Vector2D` 的输入参数，并返回一个单一的输出值，也是 `Vector2D` 类型。

在这个实现中，输入参数被命名为 `left` 和 `right`，代表 `+` 运算符左侧和右侧的 `Vector2D` 实例。 该方法返回一个新的 `Vector2D` 实例，其 `x` 和 `y` 属性初始化为相加的两个 `Vector2D` 实例的 `x` 和 `y` 属性之和。

这个类型方法可以作为现有 `Vector2D` 实例之间的中缀运算符使用：

```swift
let vector = Vector2D(x: 3.0, y: 1.0)
let anotherVector = Vector2D(x: 2.0, y: 4.0)
let combinedVector = vector + anotherVector
// combinedVector 是一个 Vector2D 实例，值为 (5.0, 5.0)
```

<!--
  - test: `customOperators`

  ```swifttest
  -> let vector = Vector2D(x: 3.0, y: 1.0)
  -> let anotherVector = Vector2D(x: 2.0, y: 4.0)
  -> let combinedVector = vector + anotherVector
  /> combinedVector is a Vector2D instance with values of (\(combinedVector.x), \(combinedVector.y))
  </ combinedVector is a Vector2D instance with values of (5.0, 5.0)
  ```
-->

这个例子将向量 `(3.0, 1.0)` 和 `(2.0, 4.0)` 相加，得到向量 `(5.0, 5.0)`，如下图所示。

![](vectorAddition)

### 前缀和后缀运算符

上面的例子展示了自定义实现二元中缀运算符。 类和结构体还可以提供标准*一元运算符*的实现。 一元运算符操作单个目标。 如果它们在目标之前，则是*前缀*运算符（如 `-a`），如果在目标之后，则是*后缀*运算符（如 `b!`）。

通过在声明运算符方法时在 `func` 关键字之前写入 `prefix` 或 `postfix` 修饰符来实现前缀或后缀一元运算符：

```swift
extension Vector2D {
    static prefix func - (vector: Vector2D) -> Vector2D {
        return Vector2D(x: -vector.x, y: -vector.y)
    }
}
```

<!--
  - test: `customOperators`

  ```swifttest
  -> extension Vector2D {
         static prefix func - (vector: Vector2D) -> Vector2D {
             return Vector2D(x: -vector.x, y: -vector.y)
         }
     }
  ```
-->

上面的例子为 `Vector2D` 实例实现了一元减运算符（`-a`）。 一元减运算符是一个前缀运算符，因此这个方法必须用 `prefix` 修饰符限定。

对于简单的数值，一元减运算符将正数转换为其负数等价物，反之亦然。 `Vector2D` 实例的相应实现对 `x` 和 `y` 属性执行此操作：

```swift
let positive = Vector2D(x: 3.0, y: 4.0)
let negative = -positive
// negative 是一个 Vector2D 实例，值为 (-3.0, -4.0)
let alsoPositive = -negative
// alsoPositive 是一个 Vector2D 实例，值为 (3.0, 4.0)
```

<!--
  - test: `customOperators`

  ```swifttest
  -> let positive = Vector2D(x: 3.0, y: 4.0)
  -> let negative = -positive
  /> negative is a Vector2D instance with values of (\(negative.x), \(negative.y))
  </ negative is a Vector2D instance with values of (-3.0, -4.0)
  -> let alsoPositive = -negative
  /> alsoPositive is a Vector2D instance with values of (\(alsoPositive.x), \(alsoPositive.y))
  </ alsoPositive is a Vector2D instance with values of (3.0, 4.0)
  ```
-->

### 复合赋值运算符

*复合赋值运算符*将赋值（`=`）与另一个操作结合在一起。 例如，加法赋值运算符（`+=`）将加法和赋值组合成一个操作。 你将复合赋值运算符的左输入参数类型标记为 `inout`，因为参数的值将直接从运算符方法内部修改。

下面的例子为 `Vector2D` 实例实现了一个加法赋值运算符方法：

```swift
extension Vector2D {
    static func += (left: inout Vector2D, right: Vector2D) {
        left = left + right
    }
}
```

<!--
  - test: `customOperators`

  ```swifttest
  -> extension Vector2D {
         static func += (left: inout Vector2D, right: Vector2D) {
             left = left + right
         }
     }
  ```
-->

因为之前定义了加法运算符，所以这里不需要重新实现加法过程。 相反，加法赋值运算符方法利用现有的加法运算符方法，并使用它将左值设置为左值加右值：

```swift
var original = Vector2D(x: 1.0, y: 2.0)
let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
original += vectorToAdd
// original 现在的值为 (4.0, 6.0)
```

<!--
  - test: `customOperators`

  ```swifttest
  -> var original = Vector2D(x: 1.0, y: 2.0)
  -> let vectorToAdd = Vector2D(x: 3.0, y: 4.0)
  -> original += vectorToAdd
  /> original now has values of (\(original.x), \(original.y))
  </ original now has values of (4.0, 6.0)
  ```
-->

> 注意：不可能重载默认赋值运算符（`=`）。 只有复合赋值运算符可以被重载。 同样，三元条件运算符（`a ? b : c`）也不能被重载。

<!--
  - test: `cant-overload-assignment`

  ```swifttest
  >> struct Vector2D {
  >>    var x = 0.0, y = 0.0
  >> }
  >> extension Vector2D {
  >>     static func = (left: inout Vector2D, right: Vector2D) {
  >>         left = right
  >>     }
  >> }
  !$ error: expected identifier in function declaration
  !! static func = (left: inout Vector2D, right: Vector2D) {
  !!             ^
  ```
-->

### 等价运算符

默认情况下，自定义类和结构体没有*等价运算符*的实现，这些运算符包括*等于*运算符（`==`）和*不等于*运算符（`!=`）。 通常你需要实现 `==` 运算符，并使用 Swift 标准库的默认 `!=` 运算符实现，它会对 `==` 运算符的结果进行取反。 有两种方法可以实现 `==` 运算符：你可以自己实现它，或者对于许多类型，你可以要求 Swift 为你合成一个实现。 在这两种情况下，你都需要添加对 Swift 标准库的 `Equatable` 协议的遵循。

你可以像实现其他中缀运算符一样提供 `==` 运算符的实现：

```swift
extension Vector2D: Equatable {
    static func == (left: Vector2D, right: Vector2D) -> Bool {
       return (left.x == right.x) && (left.y == right.y)
    }
}
```

<!--
  - test: `customOperators`

  ```swifttest
  -> extension Vector2D: Equatable {
         static func == (left: Vector2D, right: Vector2D) -> Bool {
            return (left.x == right.x) && (left.y == right.y)
         }
     }
  ```
-->

上面的例子实现了一个 `==` 运算符来检查两个 `Vector2D` 实例是否具有相等的值。 在 `Vector2D` 的上下文中，将"相等"理解为"两个实例具有相同的 `x` 值和 `y` 值"是有意义的，因此这就是运算符实现所使用的逻辑。

现在你可以使用这个运算符来检查两个 `Vector2D` 实例是否相等：

```swift
let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    print("These two vectors are equivalent.")
}
// Prints "These two vectors are equivalent."
```

<!--
  - test: `customOperators`

  ```swifttest
  -> let twoThree = Vector2D(x: 2.0, y: 3.0)
  -> let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
  -> if twoThree == anotherTwoThree {
        print("These two vectors are equivalent.")
     }
  <- These two vectors are equivalent.
  ```
-->

在许多简单的情况下，你可以要求 Swift 为你提供等价运算符的合成实现，如 <doc:Protocols#Adopting-a-Protocol-Using-a-Synthesized-Implementation> 中所述。

## 自定义运算符

除了 Swift 提供的标准运算符外，你还可以声明和实现自己的*自定义运算符*。有关可用于定义自定义运算符的字符列表，请参见 <doc:LexicalStructure#Operators>。

新运算符使用 `operator` 关键字在全局级别声明，并用 `prefix`、`infix` 或 `postfix` 修饰符标记:

```swift
prefix operator +++
```

<!--
  - test: `customOperators`

  ```swifttest
  -> prefix operator +++
  ```
-->

上面的例子定义了一个名为 `+++` 的新前缀运算符。这个运算符在 Swift 中没有现有的含义，因此在下面特定的 `Vector2D` 实例工作环境中给予了它自己的自定义含义。出于本例的目的,`+++` 被视为一个新的"前缀加倍"运算符。它通过使用先前定义的加法赋值运算符将向量加到自身上，从而将 `Vector2D` 实例的 `x` 和 `y` 值加倍。要实现 `+++` 运算符，你需要向 `Vector2D` 添加一个名为 `+++` 的类型方法，如下所示:

```swift
extension Vector2D {
    static prefix func +++ (vector: inout Vector2D) -> Vector2D {
        vector += vector
        return vector
    }
}

var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
// toBeDoubled 现在的值为 (2.0, 8.0)
// afterDoubling 也有值 (2.0, 8.0)
```

<!--
  - test: `customOperators`

  ```swifttest
  -> extension Vector2D {
        static prefix func +++ (vector: inout Vector2D) -> Vector2D {
           vector += vector
           return vector
        }
     }
  ---
  -> var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
  -> let afterDoubling = +++toBeDoubled
  /> toBeDoubled now has values of (\(toBeDoubled.x), \(toBeDoubled.y))
  </ toBeDoubled now has values of (2.0, 8.0)
  /> afterDoubling also has values of (\(afterDoubling.x), \(afterDoubling.y))
  </ afterDoubling also has values of (2.0, 8.0)
  ```
-->

### 自定义中缀运算符的优先级

每个自定义中缀运算符都属于一个优先级组。优先级组指定了一个运算符相对于其他中缀运算符的优先级，以及运算符的结合性。有关这些特性如何影响中缀运算符与其他中缀运算符交互的解释，请参见 <doc:AdvancedOperators#Precedence-and-Associativity>。

没有被明确放入优先级组的自定义中缀运算符会被赋予一个默认优先级组，其优先级紧高于三元条件运算符的优先级。

下面的例子定义了一个名为 `+-` 的新自定义中缀运算符，它属于 `AdditionPrecedence` 优先级组:

```swift
infix operator +-: AdditionPrecedence
extension Vector2D {
    static func +- (left: Vector2D, right: Vector2D) -> Vector2D {
        return Vector2D(x: left.x + right.x, y: left.y - right.y)
    }
}
let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
// plusMinusVector 是一个 Vector2D 实例，其值为 (4.0, -2.0)
```

<!--
  - test: `customOperators`

  ```swifttest
  -> infix operator +-: AdditionPrecedence
  -> extension Vector2D {
        static func +- (left: Vector2D, right: Vector2D) -> Vector2D {
           return Vector2D(x: left.x + right.x, y: left.y - right.y)
        }
     }
  -> let firstVector = Vector2D(x: 1.0, y: 2.0)
  -> let secondVector = Vector2D(x: 3.0, y: 4.0)
  -> let plusMinusVector = firstVector +- secondVector
  /> plusMinusVector is a Vector2D instance with values of (\(plusMinusVector.x), \(plusMinusVector.y))
  </ plusMinusVector is a Vector2D instance with values of (4.0, -2.0)
  ```
-->

这个运算符将两个向量的 `x` 值相加，并从第一个向量的 `y` 值中减去第二个向量的 `y` 值。由于它本质上是一个"加法"运算符，因此它被赋予了与加法中缀运算符(如 `+` 和 `-`)相同的优先级组。有关 Swift 标准库提供的运算符的信息，包括运算符优先级组和结合性设置的完整列表，请参见 [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations)。有关优先级组的更多信息以及定义自己的运算符和优先级组的语法，请参见 <doc:Declarations#Operator-Declaration>。

> 注意: 在定义前缀或后缀运算符时，你不需要指定优先级。但是，如果你对同一个操作数同时应用前缀和后缀运算符，后缀运算符会先被应用。

<!--
  - test: `postfixOperatorsAreAppliedBeforePrefixOperators`

  ```swifttest
  -> prefix operator +++
  -> postfix operator ---
  -> extension Int {
         static prefix func +++ (x: Int) -> Int {
             return x * 2
         }
     }
  -> extension Int {
         static postfix func --- (x: Int) -> Int {
             return x - 1
         }
     }
  -> let x = +++1---
  -> let y = +++(1---)
  -> let z = (+++1)---
  -> print(x, y, z)
  <- 0 0 1
  // Note that x==y
  ```
-->

## 结果构建器

*结果构建器*是你定义的一种类型，它为以自然、声明式的方式创建嵌套数据(如列表或树)添加语法。使用结果构建器的代码可以包含普通的 Swift 语法，如 `if` 和 `for`,以处理条件或重复的数据片段。

下面的代码定义了几种类型，用于使用星号和文本在单行上绘图。

```swift
protocol Drawable {
    func draw() -> String
}
struct Line: Drawable {
    var elements: [Drawable]
    func draw() -> String {
        return elements.map { $0.draw() }.joined(separator: "")
    }
}
struct Text: Drawable {
    var content: String
    init(_ content: String) { self.content = content }
    func draw() -> String { return content }
}
struct Space: Drawable {
    func draw() -> String { return " " }
}
struct Stars: Drawable {
    var length: Int
    func draw() -> String { return String(repeating: "*", count: length) }
}
struct AllCaps: Drawable {
    var content: Drawable
    func draw() -> String { return content.draw().uppercased() }
}
```

<!--
  - test: `result-builder`

  ```swifttest
  -> protocol Drawable {
         func draw() -> String
     }
  -> struct Line: Drawable {
         var elements: [Drawable]
         func draw() -> String {
             return elements.map { $0.draw() }.joined(separator: "")
         }
     }
  -> struct Text: Drawable {
         var content: String
         init(_ content: String) { self.content = content }
         func draw() -> String { return content }
     }
  -> struct Space: Drawable {
         func draw() -> String { return " " }
     }
  -> struct Stars: Drawable {
         var length: Int
         func draw() -> String { return String(repeating: "*", count: length) }
     }
  -> struct AllCaps: Drawable {
         var content: Drawable
         func draw() -> String { return content.draw().uppercased() }
     }
  ```
-->

`Drawable` 协议定义了可以被绘制的东西(如线条或形状)的要求:该类型必须实现一个 `draw()` 方法。`Line` 结构表示单行绘图，它作为大多数绘图的顶层容器。要绘制一个 `Line`,该结构调用线条的每个组件的 `draw()` 方法，然后将结果字符串连接成一个单一的字符串。`Text` 结构包装一个字符串，使其成为绘图的一部分。`AllCaps` 结构包装并修改另一个绘图，将绘图中的任何文本转换为大写。

通过调用这些类型的初始化器，可以创建一个绘图:

```swift
let name: String? = "Ravi Patel"
let manualDrawing = Line(elements: [
     Stars(length: 3),
     Text("Hello"),
     Space(),
     AllCaps(content: Text((name ?? "World") + "!")),
     Stars(length: 2),
])
print(manualDrawing.draw())
// 打印 "***Hello RAVI PATEL!**"
```

<!--
  - test: `result-builder`

  ```swifttest
  -> let name: String? = "Ravi Patel"
  -> let manualDrawing = Line(elements: [
          Stars(length: 3),
          Text("Hello"),
          Space(),
          AllCaps(content: Text((name ?? "World") + "!")),
          Stars(length: 2),
     ])
  -> print(manualDrawing.draw())
  <- ***Hello RAVI PATEL!**
  ```
-->

这段代码是可行的，但有点笨拙。`AllCaps` 之后的深度嵌套括号很难阅读。当 `name` 为 `nil` 时使用 "World" 的后备逻辑必须使用 `??` 运算符内联完成，如果有更复杂的内容，这将变得很困难。如果你需要包含 switch 或 `for` 循环来构建部分绘图，就无法做到这一点。结果构建器让你可以重写这样的代码，使其看起来像普通的 Swift 代码。

要定义一个结果构建器，你需要在类型声明上写 `@resultBuilder` 属性。例如，这段代码定义了一个名为 `DrawingBuilder` 的结果构建器，它让你可以使用声明式语法来描述一个绘图:

```swift
@resultBuilder
struct DrawingBuilder {
    static func buildBlock(_ components: Drawable...) -> Drawable {
        return Line(elements: components)
    }
    static func buildEither(first: Drawable) -> Drawable {
        return first
    }
    static func buildEither(second: Drawable) -> Drawable {
        return second
    }
}
```

<!--
  - test: `result-builder`

  ```swifttest
  -> @resultBuilder
  -> struct DrawingBuilder {
         static func buildBlock(_ components: Drawable...) -> Drawable {
             return Line(elements: components)
         }
         static func buildEither(first: Drawable) -> Drawable {
             return first
         }
         static func buildEither(second: Drawable) -> Drawable {
             return second
         }
     }
  ```
-->

`DrawingBuilder` 结构定义了三个方法来实现结果构建器语法的部分功能。`buildBlock(_:)` 方法支持在代码块中编写一系列行。它将该块中的组件组合成一个 `Line`。`buildEither(first:)` 和 `buildEither(second:)` 方法为 `if`-`else` 提供支持。

你可以将 `@DrawingBuilder` 属性应用于函数的参数，这会将传递给函数的闭包转换为结果构建器从该闭包创建的值。例如：

```swift
func draw(@DrawingBuilder content: () -> Drawable) -> Drawable {
    return content()
}
func caps(@DrawingBuilder content: () -> Drawable) -> Drawable {
    return AllCaps(content: content())
}

func makeGreeting(for name: String? = nil) -> Drawable {
    let greeting = draw {
        Stars(length: 3)
        Text("Hello")
        Space()
        caps {
            if let name = name {
                Text(name + "!")
            } else {
                Text("World!")
            }
        }
        Stars(length: 2)
    }
    return greeting
}
let genericGreeting = makeGreeting()
print(genericGreeting.draw())
// 打印 "***Hello WORLD!**"

let personalGreeting = makeGreeting(for: "Ravi Patel")
print(personalGreeting.draw())
// 打印 "***Hello RAVI PATEL!**"
```

<!--
  - test: `result-builder`

  ```swifttest
  -> func draw(@DrawingBuilder content: () -> Drawable) -> Drawable {
         return content()
     }
  -> func caps(@DrawingBuilder content: () -> Drawable) -> Drawable {
         return AllCaps(content: content())
     }
  ---
  -> func makeGreeting(for name: String? = nil) -> Drawable {
         let greeting = draw {
             Stars(length: 3)
             Text("Hello")
             Space()
             caps {
                 if let name = name {
                     Text(name + "!")
                 } else {
                     Text("World!")
                 }
             }
             Stars(length: 2)
         }
         return greeting
     }
  -> let genericGreeting = makeGreeting()
  -> print(genericGreeting.draw())
  <- ***Hello WORLD!**
  ---
  -> let personalGreeting = makeGreeting(for: "Ravi Patel")
  -> print(personalGreeting.draw())
  <- ***Hello RAVI PATEL!**
  ```
-->

`makeGreeting(for:)` 函数接受一个 `name` 参数并使用它来绘制个性化的问候语。`draw(_:)` 和 `caps(_:)` 函数都接受一个标记为 `@DrawingBuilder` 属性的单个闭包作为参数。当你调用这些函数时，你使用 `DrawingBuilder` 定义的特殊语法。Swift 将绘图的声明性描述转换为对 `DrawingBuilder` 方法的一系列调用，以构建作为函数参数传递的值。例如，Swift 将示例中对 `caps(_:)` 的调用转换为类似以下的代码：

```swift
let capsDrawing = caps {
    let partialDrawing: Drawable
    if let name = name {
        let text = Text(name + "!")
        partialDrawing = DrawingBuilder.buildEither(first: text)
    } else {
        let text = Text("World!")
        partialDrawing = DrawingBuilder.buildEither(second: text)
    }
    return partialDrawing
}
```

<!--
  - test: `result-builder`

  ```swifttest
  -> let capsDrawing = caps {
         let partialDrawing: Drawable
         if let name = name {
             let text = Text(name + "!")
             partialDrawing = DrawingBuilder.buildEither(first: text)
         } else {
             let text = Text("World!")
             partialDrawing = DrawingBuilder.buildEither(second: text)
         }
         return partialDrawing
  -> }
  >> print(capsDrawing.draw())
  << RAVI PATEL!
  ```
-->

Swift 将 `if`-`else` 块转换为对 `buildEither(first:)` 和 `buildEither(second:)` 方法的调用。尽管你在自己的代码中不会调用这些方法，但展示转换的结果可以更容易地看到 Swift 在你使用 `DrawingBuilder` 语法时如何转换你的代码。

要为在特殊绘图语法中编写 `for` 循环添加支持，请添加一个 `buildArray(_:)` 方法。

```swift
extension DrawingBuilder {
    static func buildArray(_ components: [Drawable]) -> Drawable {
        return Line(elements: components)
    }
}
let manyStars = draw {
    Text("Stars:")
    for length in 1...3 {
        Space()
        Stars(length: length)
    }
}
```

<!--
  - test: `result-builder`

  ```swifttest
  -> extension DrawingBuilder {
         static func buildArray(_ components: [Drawable]) -> Drawable {
             return Line(elements: components)
         }
     }
  -> let manyStars = draw {
         Text("Stars:")
         for length in 1...3 {
             Space()
             Stars(length: length)
         }
  -> }
  >> print(manyStars.draw())
  << Stars: * ** ***
  ```
-->

在上面的代码中，`for` 循环创建了一个绘图数组，`buildArray(_:)` 方法将该数组转换为一个 `Line`。

有关 Swift 如何将构建器语法转换为对构建器类型方法的调用的完整列表，请参阅 <doc:Attributes#resultBuilder>。

<!--
  The following needs more work...

   Protocol Operator Requirements
   ------------------------------

   You can include operators in the requirements of a protocol.
   A type conforms to the protocol
   only if there's an implementation of the operator for that type.
   You use ``Self`` to refer to the type that will conform to the protocol,
   just like you do in other protocol requirements.
   For example, the Swift standard library defines the ``Equatable`` protocol
   which requires the ``==`` operator:

   .. testcode:: protocolOperator

      -> protocol Equatable {
             static func == (lhs: Self, rhs: Self) -> Bool
         }

   To make a type conform to the protocol,
   you need to implement the ``==`` operator for that type.
   For example:

   .. testcode:: protocolOperator

  -> struct Vector3D {
        var x = 0.0, y = 0.0, z = 0.0
     }
  -> extension Vector3D: Equatable {
         static func == (left: Vector3D, right: Vector3D) -> Bool {
             return (left.x == right.x) && (left.y == right.y) && (left.z == right.z)
         }
     }
  >> let r0 =
  >> Vector3D(x: 1.1, y: 2.3, z: 12) == Vector3D(x: 1.1, y: 2.3, z: 12)
  >> assert(r0)
-->

<!--
  FIXME: This doesn't work
  <rdar://problem/27536066> SE-0091 -- can't have protocol conformance & operator implementation in different types

   For operators that take values of two different types,
   the operator's implementation doesn't have to be
   a member of the type that conforms to the protocol ---
   the implementation can also be a member of the other type.
   For example,
   the code below defines the ``*`` operator
   to scale a vector by a given amount.
   The ``Vector2D`` structure conforms to this protocol
   because there's an implementation of the operator
   that takes a ``Vector2D`` as its second argument,
   even though that implementation is a member of ``Double``.

   .. testcode:: customOperators

  -> infix operator *** {}
  -> protocol AnotherProtocol {
         // static func * (scale: Double, vector: Self) -> Self
         static func *** (scale: Double, vector: Vector2D) -> Vector2D
     }
  ---
  -> extension Double {
         static func *** (scale: Double, vector: Vector2D) -> Vector2D {
             return Vector2D(x: scale * vector.x, y: scale * vector.y)
         }
     }
  -> extension Vector2D: AnotherProtocol {}
  -> let unitVector = Vector2D(x: 1.0, y: 1.0)
  -> print(2.5 *** unitVector)
  <- Vector2D(x: 2.5, y: 2.5)
-->

<!--
  TODO: However, Doug thought that this might be better covered by Generics,
  where you know that two things are definitely of the same type.
  Perhaps mention it here, but don't actually show an example?
-->

<!--
  TODO: generic operators
-->

> Beta 软件：
>
> 本文档包含有关正在开发中的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实现的软件应该用最终的操作系统软件进行测试。
>
> 了解更多关于使用 [Apple 的 beta 软件](https://developer.apple.com/support/beta-software/)的信息。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->