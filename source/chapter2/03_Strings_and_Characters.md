# 字符串和字符（Strings and Characters）
---

> 1.0
> 翻译：[wh1100717](https://github.com/wh1100717)
> 校对：[Hawstein](https://github.com/Hawstein)

> 2.0
> 翻译+校对：[DianQK](https://github.com/DianQK)

> 2.1
> 翻译：[DianQK](https://github.com/DianQK)
> 校对：[shanks](http://codebuild.me), [Realank](https://github.com/Realank), 

> 2.2
> 校对：[SketchK](https://github.com/SketchK)

> 3.0
> 校对：[CMB](https://github.com/chenmingbiao)，版本日期：2016-09-13   
> 3.0.1, shanks, 2016-11-11

本页包含内容：

- [字符串字面量](#string_literals)
- [初始化空字符串](#initializing_an_empty_string)
- [字符串可变性](#string_mutability)
- [字符串是值类型](#strings_are_value_types)
- [使用字符](#working_with_characters)
- [连接字符串和字符](#concatenating_strings_and_characters)
- [字符串插值](#string_interpolation)
- [Unicode](#unicode)
- [计算字符数量](#counting_characters)
- [访问和修改字符串](#accessing_and_modifying_a_string)
- [比较字符串](#comparing_strings)
- [字符串的 Unicode 表示形式](#unicode_representations_of_strings)

*字符串*是例如`"hello, world"`，`"albatross"`这样的有序的`Character`（字符）类型的值的集合。通过`String`类型来表示。
一个`String`的内容可以用许多方式读取，包括作为一个`Character`值的集合。 
     
Swift 的`String`和`Character`类型提供了快速和兼容 Unicode 的方式供你的代码使用。创建和操作字符串的语法与 C 语言中字符串操作相似，轻量并且易读。
字符串连接操作只需要简单地通过`+`符号将两个字符串相连即可。与 Swift 中其他值一样，能否更改字符串的值，取决于其被定义为常量还是变量。你也可以在字符串内插过程中使用字符串插入常量、变量、字面量表达成更长的字符串，这样可以很容易的创建自定义的字符串值，进行展示、存储以及打印。  
   
尽管语法简易，但`String`类型是一种快速、现代化的字符串实现。
每一个字符串都是由编码无关的 Unicode 字符组成，并支持访问字符的多种 Unicode 表示形式（representations）。

> 注意：    
> Swift 的`String`类型与 Foundation `NSString`类进行了无缝桥接。Foundation 也可以对`String`进行扩展，暴露在`NSString`中定义的方法。 这意味着，如果你在`String`中调用这些`NSString`的方法，将不用进行转换。  
> 更多关于在 Foundation 和 Cocoa 中使用`String`的信息请查看 *[Using Swift with Cocoa and Objective-C (Swift 3.0.1)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/WorkingWithCocoaDataTypes.html#//apple_ref/doc/uid/TP40014216-CH6)*。


<a name="string_literals"></a>
## 字符串字面量

您可以在您的代码中包含一段预定义的字符串值作为字符串字面量。字符串字面量是由双引号 (`""`) 包裹着的具有固定顺序的文本字符集。
字符串字面量可以用于为常量和变量提供初始值：

```swift
let someString = "Some string literal value"
```

注意`someString`常量通过字符串字面量进行初始化，Swift 会推断该常量为`String`类型。

> 注意：
更多关于在字符串字面量中使用特殊字符的信息，请查看 [字符串字面量的特殊字符](#special_characters_in_string_literals) 。


<a name="initializing_an_empty_string"></a>
## 初始化空字符串

要创建一个空字符串作为初始值，可以将空的字符串字面量赋值给变量，也可以初始化一个新的`String`实例：

```swift
var emptyString = ""               // 空字符串字面量
var anotherEmptyString = String()  // 初始化方法
// 两个字符串均为空并等价。
```

您可以通过检查其`Bool`类型的`isEmpty`属性来判断该字符串是否为空：

```swift
if emptyString.isEmpty {
    print("Nothing to see here")
}
// 打印输出："Nothing to see here"
```


<a name="string_mutability"></a>
## 字符串可变性

您可以通过将一个特定字符串分配给一个变量来对其进行修改，或者分配给一个常量来保证其不会被修改：

```swift
var variableString = "Horse"
variableString += " and carriage"
// variableString 现在为 "Horse and carriage"

let constantString = "Highlander"
constantString += " and another Highlander"
// 这会报告一个编译错误 (compile-time error) - 常量字符串不可以被修改。
```

> 注意：   
在 Objective-C 和 Cocoa 中，您需要通过选择两个不同的类(`NSString`和`NSMutableString`)来指定字符串是否可以被修改。


<a name="strings_are_value_types"></a>
## 字符串是值类型

Swift 的`String`类型是*值类型*。
如果您创建了一个新的字符串，那么当其进行常量、变量赋值操作，或在函数/方法中传递时，会进行值拷贝。
任何情况下，都会对已有字符串值创建新副本，并对该新副本进行传递或赋值操作。
值类型在 [结构体和枚举是值类型](./09_Classes_and_Structures.html#structures_and_enumerations_are_value_types) 中进行了详细描述。

Swift 默认字符串拷贝的方式保证了在函数/方法中传递的是字符串的值。
很明显无论该值来自于哪里，都是您独自拥有的。
您可以确信传递的字符串不会被修改，除非你自己去修改它。

在实际编译时，Swift 编译器会优化字符串的使用，使实际的复制只发生在绝对必要的情况下，这意味着您将字符串作为值类型的同时可以获得极高的性能。


<a name="working_with_characters"></a>
## 使用字符

您可通过`for-in`循环来遍历字符串中的`characters`属性来获取每一个字符的值：

```swift
for character in "Dog!🐶".characters {
    print(character)
}
// D
// o
// g
// !
// 🐶
```

`for-in`循环在 [For 循环](./05_Control_Flow.html#for_loops) 中进行了详细描述。

另外，通过标明一个`Character`类型并用字符字面量进行赋值，可以建立一个独立的字符常量或变量：

```swift
let exclamationMark: Character = "!"
```
字符串可以通过传递一个值类型为`Character`的数组作为自变量来初始化：

```swift
let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)
print(catString)
// 打印输出："Cat!🐱"
```


<a name="concatenating_strings_and_characters"></a>
## 连接字符串和字符

字符串可以通过加法运算符（`+`）相加在一起（或称“连接”）创建一个新的字符串：

```swift
let string1 = "hello"
let string2 = " there"
var welcome = string1 + string2
// welcome 现在等于 "hello there"
```

您也可以通过加法赋值运算符 (`+=`) 将一个字符串添加到一个已经存在字符串变量上：

```swift
var instruction = "look over"
instruction += string2
// instruction 现在等于 "look over there"
```

您可以用`append()`方法将一个字符附加到一个字符串变量的尾部：

```swift
let exclamationMark: Character = "!"
welcome.append(exclamationMark)
// welcome 现在等于 "hello there!"
```

> 注意：  
您不能将一个字符串或者字符添加到一个已经存在的字符变量上，因为字符变量只能包含一个字符。


<a name="string_interpolation"></a>
## 字符串插值

*字符串插值*是一种构建新字符串的方式，可以在其中包含常量、变量、字面量和表达式。
您插入的字符串字面量的每一项都在以反斜线为前缀的圆括号中：

```swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message 是 "3 times 2.5 is 7.5"
```

在上面的例子中，`multiplier`作为`\(multiplier)`被插入到一个字符串常量量中。
当创建字符串执行插值计算时此占位符会被替换为`multiplier`实际的值。

`multiplier`的值也作为字符串中后面表达式的一部分。
该表达式计算`Double(multiplier) * 2.5`的值并将结果 (`7.5`) 插入到字符串中。
在这个例子中，表达式写为`\(Double(multiplier) * 2.5)`并包含在字符串字面量中。

> 注意：     
> 插值字符串中写在括号中的表达式不能包含非转义反斜杠 (`\`)，并且不能包含回车或换行符。不过，插值字符串可以包含其他字面量。


<a name="unicode"></a>
## Unicode

*Unicode*是一个国际标准，用于文本的编码和表示。
它使您可以用标准格式表示来自任意语言几乎所有的字符，并能够对文本文件或网页这样的外部资源中的字符进行读写操作。
Swift 的`String`和`Character`类型是完全兼容 Unicode 标准的。


<a name="unicode_scalars"></a>
### Unicode 标量

Swift 的`String`类型是基于 *Unicode 标量* 建立的。
Unicode 标量是对应字符或者修饰符的唯一的21位数字，例如`U+0061`表示小写的拉丁字母(`LATIN SMALL LETTER A`)("`a`")，`U+1F425`表示小鸡表情(`FRONT-FACING BABY CHICK`) ("`🐥`")。

> 注意：
> Unicode *码位(code poing)* 的范围是`U+0000`到`U+D7FF`或者`U+E000`到`U+10FFFF`。Unicode 标量不包括 Unicode *代理项(surrogate pair)* 码位，其码位范围是`U+D800`到`U+DFFF`。

注意不是所有的21位 Unicode 标量都代表一个字符，因为有一些标量是留作未来分配的。已经代表一个典型字符的标量都有自己的名字，例如上面例子中的`LATIN SMALL LETTER A`和`FRONT-FACING BABY CHICK`。

<a name="special_characters_in_string_literals"></a>
### 字符串字面量的特殊字符

字符串字面量可以包含以下特殊字符：

* 转义字符`\0`(空字符)、`\\`(反斜线)、`\t`(水平制表符)、`\n`(换行符)、`\r`(回车符)、`\"`(双引号)、`\'`(单引号)。
* Unicode 标量，写成`\u{n}`(u为小写)，其中`n`为任意一到八位十六进制数且可用的 Unicode 位码。

下面的代码为各种特殊字符的使用示例。
`wiseWords`常量包含了两个双引号。
`dollarSign`、`blackHeart`和`sparklingHeart`常量演示了三种不同格式的 Unicode 标量：

```swift
let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
// "Imageination is more important than knowledge" - Enistein
let dollarSign = "\u{24}"             // $, Unicode 标量 U+0024
let blackHeart = "\u{2665}"           // ♥, Unicode 标量 U+2665
let sparklingHeart = "\u{1F496}"      // 💖, Unicode 标量 U+1F496
```

<a name="extended_grapheme_clusters"></a>
### 可扩展的字形群集

每一个 Swift 的`Character`类型代表一个*可扩展的字形群*。
一个可扩展的字形群是一个或多个可生成人类可读的字符 Unicode 标量的有序排列。   
举个例子，字母`é`可以用单一的 Unicode 标量`é`(`LATIN SMALL LETTER E WITH ACUTE`, 或者`U+00E9`)来表示。然而一个标准的字母`e`(`LATIN SMALL LETTER E`或者`U+0065`) 加上一个急促重音(`COMBINING ACTUE ACCENT`)的标量(`U+0301`)，这样一对标量就表示了同样的字母`é`。
这个急促重音的标量形象的将`e`转换成了`é`。

在这两种情况中，字母`é`代表了一个单一的 Swift 的`Character`值，同时代表了一个可扩展的字形群。
在第一种情况，这个字形群包含一个单一标量；而在第二种情况，它是包含两个标量的字形群：

```swift
let eAcute: Character = "\u{E9}"                         // é
let combinedEAcute: Character = "\u{65}\u{301}"          // e 后面加上  ́
// eAcute 是 é, combinedEAcute 是 é
```

可扩展的字符群集是一个灵活的方法，用许多复杂的脚本字符表示单一的`Character`值。
例如，来自朝鲜语字母表的韩语音节能表示为组合或分解的有序排列。
在 Swift 都会表示为同一个单一的`Character`值：


```swift
let precomposed: Character = "\u{D55C}"                  // 한
let decomposed: Character = "\u{1112}\u{1161}\u{11AB}"   // ᄒ, ᅡ, ᆫ
// precomposed 是 한, decomposed 是 한
```

可拓展的字符群集可以使包围记号(例如`COMBINING ENCLOSING CIRCLE`或者`U+20DD`)的标量包围其他 Unicode 标量，作为一个单一的`Character`值：

```swift
let enclosedEAcute: Character = "\u{E9}\u{20DD}"
// enclosedEAcute 是 é⃝
```

地域性指示符号的 Unicode 标量可以组合成一个单一的`Character`值，例如`REGIONAL INDICATOR SYMBOL LETTER U`(`U+1F1FA`)和`REGIONAL INDICATOR SYMBOL LETTER S`(`U+1F1F8`)：


```swift
let regionalIndicatorForUS: Character = "\u{1F1FA}\u{1F1F8}"
// regionalIndicatorForUS 是 🇺🇸
```

<a name="counting_characters"></a>
## 计算字符数量

如果想要获得一个字符串中`Character`值的数量，可以使用字符串的`characters`属性的`count`属性：

```swift
let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
print("unusualMenagerie has \(unusualMenagerie.characters.count) characters")
// 打印输出 "unusualMenagerie has 40 characters"
```

注意在 Swift 中，使用可拓展的字符群集作为`Character`值来连接或改变字符串时，并不一定会更改字符串的字符数量。

例如，如果你用四个字符的单词`cafe`初始化一个新的字符串，然后添加一个`COMBINING ACTUE ACCENT`(`U+0301`)作为字符串的结尾。最终这个字符串的字符数量仍然是`4`，因为第四个字符是`é`，而不是`e`：

```swift
var word = "cafe"
print("the number of characters in \(word) is \(word.characters.count)")
// 打印输出 "the number of characters in cafe is 4"

word += "\u{301}"    // COMBINING ACUTE ACCENT, U+0301

print("the number of characters in \(word) is \(word.characters.count)")
// 打印输出 "the number of characters in café is 4"
```

> 注意：   
> 可扩展的字符群集可以组成一个或者多个 Unicode 标量。这意味着不同的字符以及相同字符的不同表示方式可能需要不同数量的内存空间来存储。所以 Swift 中的字符在一个字符串中并不一定占用相同的内存空间数量。因此在没有获取字符串的可扩展的字符群的范围时候，就不能计算出字符串的字符数量。如果您正在处理一个长字符串，需要注意`characters`属性必须遍历全部的 Unicode 标量，来确定字符串的字符数量。
>
> 另外需要注意的是通过`characters`属性返回的字符数量并不总是与包含相同字符的`NSString`的`length`属性相同。`NSString`的`length`属性是利用 UTF-16 表示的十六位代码单元数字，而不是 Unicode 可扩展的字符群集。作为佐证，当一个`NSString`的`length`属性被一个Swift的`String`值访问时，实际上是调用了`utf16Count`。


<a name="accessing_and_modifying_a_string"></a>
## 访问和修改字符串

你可以通过字符串的属性和方法来访问和修改它，当然也可以用下标语法完成。

<a name="string_indices"></a>
### 字符串索引

每一个`String`值都有一个关联的索引(*index*)类型，`String.Index`，它对应着字符串中的每一个`Character`的位置。

前面提到，不同的字符可能会占用不同数量的内存空间，所以要知道`Character`的确定位置，就必须从`String`开头遍历每一个 Unicode 标量直到结尾。因此，Swift 的字符串不能用整数(integer)做索引。

使用`startIndex`属性可以获取一个`String`的第一个`Character`的索引。使用`endIndex`属性可以获取最后一个`Character`的后一个位置的索引。因此，`endIndex`属性不能作为一个字符串的有效下标。如果`String`是空串，`startIndex`和`endIndex`是相等的。

通过调用 `String` 的 `index(before:)` 或 `index(after:)` 方法，可以立即得到前面或后面的一个索引。您还可以通过调用 `index(_:offsetBy:)` 方法来获取对应偏移量的索引，这种方式可以避免多次调用 `index(before:)` 或 `index(after:)` 方法。

你可以使用下标语法来访问 `String` 特定索引的 `Character`。

```swift
let greeting = "Guten Tag!"
greeting[greeting.startIndex]
// G
greeting[greeting.index(before: greeting.endIndex)]
// !
greeting[greeting.index(after: greeting.startIndex)]
// u
let index = greeting.index(greeting.startIndex, offsetBy: 7)
greeting[index]
// a
```

试图获取越界索引对应的 `Character`，将引发一个运行时错误。

```swift
greeting[greeting.endIndex] // error
greeting.index(after: endIndex) // error
```

使用 `characters` 属性的 `indices` 属性会创建一个包含全部索引的范围(`Range`)，用来在一个字符串中访问单个字符。

```swift
for index in greeting.characters.indices {
   print("\(greeting[index]) ", terminator: "")
}
// 打印输出 "G u t e n   T a g ! "
```

> 注意：  
> 您可以使用 `startIndex` 和 `endIndex` 属性或者 `index(before:)` 、`index(after:)` 和 `index(_:offsetBy:)` 方法在任意一个确认的并遵循 `Collection` 协议的类型里面，如上文所示是使用在 `String` 中，您也可以使用在 `Array`、`Dictionary` 和 `Set`中。 

<a name="inserting_and_removing"></a>
### 插入和删除

调用 `insert(_:at:)` 方法可以在一个字符串的指定索引插入一个字符，调用 `insert(contentsOf:at:)` 方法可以在一个字符串的指定索引插入一个段字符串。

```swift
var welcome = "hello"
welcome.insert("!", at: welcome.endIndex)
// welcome 变量现在等于 "hello!"
 
welcome.insert(contentsOf:" there".characters, at: welcome.index(before: welcome.endIndex))
// welcome 变量现在等于 "hello there!"
```

调用 `remove(at:)` 方法可以在一个字符串的指定索引删除一个字符，调用 `removeSubrange(_:)` 方法可以在一个字符串的指定索引删除一个子字符串。

```swift
welcome.remove(at: welcome.index(before: welcome.endIndex))
// welcome 现在等于 "hello there"
 
let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
// welcome 现在等于 "hello"
```

> 注意：
> 您可以使用 `insert(_:at:)`、`insert(contentsOf:at:)`、`remove(at:)` 和 `removeSubrange(_:)` 方法在任意一个确认的并遵循 `RangeReplaceableCollection` 协议的类型里面，如上文所示是使用在 `String` 中，您也可以使用在 `Array`、`Dictionary` 和 `Set` 中。 


<a name="comparing_strings"></a>
## 比较字符串

Swift 提供了三种方式来比较文本值：字符串字符相等、前缀相等和后缀相等。

<a name="string_and_character_equality"></a>
### 字符串/字符相等

字符串/字符可以用等于操作符(`==`)和不等于操作符(`!=`)，详细描述在[比较运算符](./02_Basic_Operators.html#comparison_operators)：

```swift
let quotation = "We're a lot alike, you and I."
let sameQuotation = "We're a lot alike, you and I."
if quotation == sameQuotation {
    print("These two strings are considered equal")
}
// 打印输出 "These two strings are considered equal"
```

如果两个字符串（或者两个字符）的可扩展的字形群集是标准相等的，那就认为它们是相等的。在这个情况下，即使可扩展的字形群集是有不同的 Unicode 标量构成的，只要它们有同样的语言意义和外观，就认为它们标准相等。

例如，`LATIN SMALL LETTER E WITH ACUTE`(`U+00E9`)就是标准相等于`LATIN SMALL LETTER E`(`U+0065`)后面加上`COMBINING ACUTE ACCENT`(`U+0301`)。这两个字符群集都是表示字符`é`的有效方式，所以它们被认为是标准相等的：

```swift
// "Voulez-vous un café?" 使用 LATIN SMALL LETTER E WITH ACUTE
let eAcuteQuestion = "Voulez-vous un caf\u{E9}?"

// "Voulez-vous un café?" 使用 LATIN SMALL LETTER E and COMBINING ACUTE ACCENT
let combinedEAcuteQuestion = "Voulez-vous un caf\u{65}\u{301}?"

if eAcuteQuestion == combinedEAcuteQuestion {
    print("These two strings are considered equal")
}
// 打印输出 "These two strings are considered equal"
```

相反，英语中的`LATIN CAPITAL LETTER A`(`U+0041`，或者`A`)不等于俄语中的`CYRILLIC CAPITAL LETTER A`(`U+0410`，或者`A`)。两个字符看着是一样的，但却有不同的语言意义：

```swift
let latinCapitalLetterA: Character = "\u{41}"

let cyrillicCapitalLetterA: Character = "\u{0410}"

if latinCapitalLetterA != cyrillicCapitalLetterA {
    print("These two characters are not equivalent")
}
// 打印 "These two characters are not equivalent"
```

> 注意：   
> 在 Swift 中，字符串和字符并不区分地域(not locale-sensitive)。


<a name="prefix_and_suffix_equality"></a>
### 前缀/后缀相等

通过调用字符串的`hasPrefix(_:)`/`hasSuffix(_:)`方法来检查字符串是否拥有特定前缀/后缀，两个方法均接收一个`String`类型的参数，并返回一个布尔值。

下面的例子以一个字符串数组表示莎士比亚话剧《罗密欧与朱丽叶》中前两场的场景位置：

```swift
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's mansion",
    "Act 1 Scene 4: A street outside Capulet's mansion",
    "Act 1 Scene 5: The Great Hall in Capulet's mansion",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Outside Friar Lawrence's cell",
    "Act 2 Scene 4: A street in Verona",
    "Act 2 Scene 5: Capulet's mansion",
    "Act 2 Scene 6: Friar Lawrence's cell"
]
```

您可以调用`hasPrefix(_:)`方法来计算话剧中第一幕的场景数：

```swift
var act1SceneCount = 0
for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        act1SceneCount += 1
    }
}
print("There are \(act1SceneCount) scenes in Act 1")
// 打印输出 "There are 5 scenes in Act 1"
```

相似地，您可以用`hasSuffix(_:)`方法来计算发生在不同地方的场景数：

```swift
var mansionCount = 0
var cellCount = 0
for scene in romeoAndJuliet {
    if scene.hasSuffix("Capulet's mansion") {
        mansionCount += 1
    } else if scene.hasSuffix("Friar Lawrence's cell") {
        cellCount += 1
    }
}
print("\(mansionCount) mansion scenes; \(cellCount) cell scenes")
// 打印输出 "6 mansion scenes; 2 cell scenes"
```

> 注意：   
> `hasPrefix(_:)`和`hasSuffix(_:)`方法都是在每个字符串中逐字符比较其可扩展的字符群集是否标准相等，详细描述在[字符串/字符相等](#string_and_character_equality)。


<a name="unicode_representations_of_strings"></a>
## 字符串的 Unicode 表示形式

当一个 Unicode 字符串被写进文本文件或者其他储存时，字符串中的 Unicode 标量会用 Unicode 定义的几种`编码格式`（encoding forms）编码。每一个字符串中的小块编码都被称`代码单元`（code units）。这些包括 UTF-8 编码格式（编码字符串为8位的代码单元）， UTF-16 编码格式（编码字符串位16位的代码单元），以及 UTF-32 编码格式（编码字符串32位的代码单元）。

Swift 提供了几种不同的方式来访问字符串的 Unicode 表示形式。
您可以利用`for-in`来对字符串进行遍历，从而以 Unicode 可扩展的字符群集的方式访问每一个`Character`值。
该过程在 [使用字符](#working_with_characters) 中进行了描述。

另外，能够以其他三种 Unicode 兼容的方式访问字符串的值：

* UTF-8 代码单元集合 (利用字符串的`utf8`属性进行访问)
* UTF-16 代码单元集合 (利用字符串的`utf16`属性进行访问)
* 21位的 Unicode 标量值集合，也就是字符串的 UTF-32 编码格式 (利用字符串的`unicodeScalars`属性进行访问)

下面由`D`,`o`,`g`,`‼`(`DOUBLE EXCLAMATION MARK`, Unicode 标量 `U+203C`)和`🐶`(`DOG FACE`，Unicode 标量为`U+1F436`)组成的字符串中的每一个字符代表着一种不同的表示：

```swift
let dogString = "Dog‼🐶"
```

<a name="UTF-8_representation"></a>
### UTF-8 表示

您可以通过遍历`String`的`utf8`属性来访问它的`UTF-8`表示。
其为`String.UTF8View`类型的属性，`UTF8View`是无符号8位 (`UInt8`) 值的集合，每一个`UInt8`值都是一个字符的 UTF-8 表示：

<table style='text-align:center'>
 <tr height="77">
  <td>Character</td>
  <td>D<br>U+0044</td>
  <td>o<br>U+006F</td>
  <td>g<br>U+0067</td>
  <td colspan="3">‼<br>U+203C</td>
  <td colspan="4">🐶<br>U+1F436</td>
 </tr>
 <tr height="77">
  <td height="77">UTF-8<br>Code Unit</td>
  <td>68</td>
  <td>111</td>
  <td>103</td>
  <td>226</td>
  <td>128</td>
  <td>188</td>
  <td>240</td>
  <td>159</td>
  <td>144</td>
  <td>182</td>
 </tr>
 <tr>
  <td height="77">Position</td>
  <td>0</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>4</td>
  <td>5</td>
  <td>6</td>
  <td>7</td>
  <td>8</td>
  <td>9</td>
 </tr>
</table>


```swift
for codeUnit in dogString.utf8 {
    print("\(codeUnit) ", terminator: "")
}
print("")
// 68 111 103 226 128 188 240 159 144 182
```

上面的例子中，前三个10进制`codeUnit`值 (`68`, `111`, `103`) 代表了字符`D`、`o`和 `g`，它们的 UTF-8 表示与 ASCII 表示相同。
接下来的三个10进制`codeUnit`值 (`226`, `128`, `188`) 是`DOUBLE EXCLAMATION MARK`的3字节 UTF-8 表示。
最后的四个`codeUnit`值 (`240`, `159`, `144`, `182`) 是`DOG FACE`的4字节 UTF-8 表示。


<a name="UTF-16_representation"></a>
### UTF-16 表示

您可以通过遍历`String`的`utf16`属性来访问它的`UTF-16`表示。
其为`String.UTF16View`类型的属性，`UTF16View`是无符号16位 (`UInt16`) 值的集合，每一个`UInt16`都是一个字符的 UTF-16 表示：

<table style='text-align:center'>
 <tr height="77">
  <td>Character</td>
  <td>D<br>U+0044</td>
  <td>o<br>U+006F</td>
  <td>g<br>U+0067</td>
  <td>‼<br>U+203C</td>
  <td colspan="2">🐶<br>U+1F436</td>
 </tr>
 <tr height="77">
  <td height="77">UTF-16<br>Code Unit</td>
  <td>68</td>
  <td>111</td>
  <td>103</td>
  <td>8252</td>
  <td>55357</td>
  <td>56374</td>
 </tr>
 <tr>
  <td height="77">Position</td>
  <td>0</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>4</td>
  <td>5</td>
 </tr>
</table>


```swift
for codeUnit in dogString.utf16 {
    print("\(codeUnit) ", terminator: "")
}
print("")
// 68 111 103 8252 55357 56374
```

同样，前三个`codeUnit`值 (`68`, `111`, `103`) 代表了字符`D`、`o`和`g`，它们的 UTF-16 代码单元和 UTF-8 完全相同（因为这些 Unicode 标量表示 ASCII 字符）。

第四个`codeUnit`值 (`8252`) 是一个等于十六进制`203C`的的十进制值。这个代表了`DOUBLE EXCLAMATION MARK`字符的 Unicode 标量值`U+203C`。这个字符在 UTF-16 中可以用一个代码单元表示。

第五和第六个`codeUnit`值 (`55357`和`56374`) 是`DOG FACE`字符的 UTF-16 表示。
第一个值为`U+D83D`(十进制值为`55357`)，第二个值为`U+DC36`(十进制值为`56374`)。

<a name="unicode_scalars_representation"></a>
### Unicode 标量表示

您可以通过遍历`String`值的`unicodeScalars`属性来访问它的 Unicode 标量表示。
其为`UnicodeScalarView`类型的属性，`UnicodeScalarView`是`UnicodeScalar`类型的值的集合。
`UnicodeScalar`是21位的 Unicode 代码点。

每一个`UnicodeScalar`拥有一个`value`属性，可以返回对应的21位数值，用`UInt32`来表示：


<table style='text-align:center'>
 <tr height="77">
  <td>Character</td>
  <td>D<br>U+0044</td>
  <td>o<br>U+006F</td>
  <td>g<br>U+0067</td>
  <td>‼<br>U+203C</td>
  <td>🐶<br>U+1F436</td>
 </tr>
 <tr height="77">
  <td height="77">Unicode Scalar<br>Code Unit</td>
  <td>68</td>
  <td>111</td>
  <td>103</td>
  <td>8252</td>
  <td>128054</td>
 </tr>
 <tr>
  <td height="77">Position</td>
  <td>0</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>4</td>
 </tr>
</table>


```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar.value) ", terminator: "")
}
print("")
// 68 111 103 8252 128054
```

前三个`UnicodeScalar`值(`68`, `111`, `103`)的`value`属性仍然代表字符`D`、`o`和`g`。
第四个`codeUnit`值(`8252`)仍然是一个等于十六进制`203C`的十进制值。这个代表了`DOUBLE EXCLAMATION MARK`字符的 Unicode 标量`U+203C`。

第五个`UnicodeScalar`值的`value`属性，`128054`，是一个十六进制`1F436`的十进制表示。其等同于`DOG FACE`的 Unicode 标量`U+1F436`。

作为查询它们的`value`属性的一种替代方法，每个`UnicodeScalar`值也可以用来构建一个新的`String`值，比如在字符串插值中使用：

```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar) ")
}
// D
// o
// g
// ‼
// 🐶
```
