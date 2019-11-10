# 词法结构（Lexical Structure）

Swift 的*“词法结构（lexical structure）”* 描述了能构成该语言中有效符号（token）的字符序列。这些合法符号组成了语言中最底层的构建基块，并在之后的章节中用于描述语言的其他部分。一个合法符号由一个标识符（identifier）、关键字（keyword）、标点符号（punctuation）、字面量（literal）或运算符（operator）组成。

通常情况下，符号是考虑了输入文本中最长可能的子字符串，并被随后将介绍的语法约束，根据 Swift 源文件的字符生成的。这种方法称为*“最长匹配（longest match）”*，或者*“最大适合（maximal munch）”*。

## 空白与注释 {#whitespace}

空白（whitespace）有两个用途：分隔源文件中的符号以及帮助区分运算符属于前缀还是后缀（参见 [运算符](#operators)），在其他情况下空白则会被忽略。以下的字符会被当作空白：空格（U+0020）、换行符（U+000A）、回车符（U+000D）、水平制表符（U+0009）、垂直制表符（U+000B）、换页符（U+000C）以及空字符（U+0000）。

注释被编译器当作空白处理。单行注释由 `//` 开始直至遇到换行符（U+000A）或者回车符（U+000D）。多行注释由 `/*` 开始，以 `*/` 结束。多行注释允许嵌套，但注释标记必须成对出现。

注释可以包含其他的格式和标记，如 [标记格式参考](https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_markup_formatting_ref/index.html)中所述。

> 空白语法
> 
> *空白* → [空白项](#whitespace-item) [空白](#whitespace)<sub>可选</sub>
> 
#### whitespace-item {#whitespace-item}
> 
> *空白项* → [断行符](#line-break)
> 
> *空白项* → [注释](#comment)
> 
> *空白项* → [多行注释](#multiline-comment)
> 
> *空白项* → U+0000，U+0009，U+000B，U+000C 或者 U+0020
> 
> 
#### line-break {#line-break}
> 
> *断行符* → U+000A
> 
> *断行符* → U+000D
> 
> *断行符* → U+000D 接着是 U+000A
> 
> 
#### comment {#comment}
> 
> *注释* → // [注释内容](#comment-text)  [断行符](#line-break)
> 
> 
#### multiline-comment {#multiline-comment}
> 
> *多行注释* → `/*` [多行注释内容](#multiline-commnet-text) `*/`
> 
> 
#### comment-text {#comment-text}
> 
> *注释内容* → [注释内容项](#comment-text-item) [注释内容](#comment-text)<sub>可选</sub>
> 
> 
#### comment-text-item {#comment-text-item}
> 
> *注释内容项* → 任何 Unicode 标量值，除了 U+000A 或者 U+000D
> 
> 
#### multiline-commnet-text {#multiline-commnet-text}
> 
> *多行注释内容* → [多行注释内容项](#multiline-comment-text-item) [多行注释内容](#multiline-comment-text)<sub>可选</sub>
> 
> *多行注释内容项* → [多行注释](#multiline-comment).
> 
> *多行注释内容项* → [注释内容项](#comment-text-item)
> 
> *多行注释内容项* → 任何 Unicode 标量值，除了 `/*` 或者 `*/`

## 标识符 {#identifiers}

*标识符（identifier）* 可以由以下的字符开始：大写或小写的字母 `A` 到 `Z`、下划线（`_`）、基本多文种平面（Basic Multilingual Plane）中非字符数字组合的 Unicode 字符以及基本多文种平面以外的非个人专用区字符。在首字符之后，允许使用数字和组合 Unicode 字符。

使用保留字作为标识符，需要在其前后增加反引号（`` ` ``）。例如，`class` 不是合法的标识符，但可以使用 `` `class` ``。反引号不属于标识符的一部分，`` `x` `` 和 `x` 表示同一标识符。

闭包中如果没有明确指定参数名称，参数将被隐式命名为 `$0`、`$1`、`$2` 等等。这些命名在闭包作用域范围内是合法的标识符。

编译器给含有属性包装器呈现值的属性自动合成以美元符号（*$*）开头的标识符。你的代码可以与这些标识符进行交互，，但是不能使用该前缀声明标识符。更详细的介绍，请查看 [特性](./07_Attributes.md) 章节中的 [属性包装器](./07_Attributes.md#propertywrapper) 部分。

> 标识符语法
> 
> *标识符* → [头部标识符](#identifier-head) [标识符字符组](#identifier-characters)<sub>可选</sub>
> 
> *标识符* → \`[头部标识符](#identifier-head) [标识符字符组](#identifier-characters)<sub>可选</sub>\`
> 
> *标识符* → [隐式参数名](#implicit-parameter-name)
> 
> *标识符列表* → [标识符](#identifier) | [标识符](#identifier) **,** [标识符列表](#identifier)
> 
> 
#### identifier-head {#identifier-head}
> 
> *头部标识符* → 大写或小写字母 A - Z
> 
> *头部标识符* → **_**
> 
> *头部标识符* → U+00A8，U+00AA，U+00AD，U+00AF，U+00B2–U+00B5，或者 U+00B7–U+00BA
> 
> *头部标识符* → U+00BC–U+00BE，U+00C0–U+00D6，U+00D8–U+00F6，或者 U+00F8–U+00FF
> 
> *头部标识符* → U+0100–U+02FF，U+0370–U+167F，U+1681–U+180D，或者 U+180F–U+1DBF
> 
> *头部标识符* → U+1E00–U+1FFF
> 
> *头部标识符* → U+200B–U+200D，U+202A–U+202E，U+203F–U+2040，U+2054，或者 U+2060–U+206F
> 
> *头部标识符* → U+2070–U+20CF，U+2100–U+218F，U+2460–U+24FF，或者 U+2776–U+2793
> 
> *头部标识符* → U+2C00–U+2DFF 或者 U+2E80–U+2FFF
> 
> *头部标识符* → U+3004–U+3007，U+3021–U+302F，U+3031–U+303F，或者 U+3040–U+D7FF
> 
> *头部标识符* → U+F900–U+FD3D，U+FD40–U+FDCF，U+FDF0–U+FE1F，或者 U+FE30–U+FE44
> 
> *头部标识符* → U+FE47–U+FFFD
> 
> *头部标识符* → U+10000–U+1FFFD，U+20000–U+2FFFD，U+30000–U+3FFFD，或者 U+40000–U+4FFFD
> 
> *头部标识符* → U+50000–U+5FFFD，U+60000–U+6FFFD，U+70000–U+7FFFD，或者 U+80000–U+8FFFD
> 
> *头部标识符* → U+90000–U+9FFFD，U+A0000–U+AFFFD，U+B0000–U+BFFFD，或者 U+C0000–U+CFFFD
> 
> *头部标识符* → U+D0000–U+DFFFD 或者 U+E0000–U+EFFFD
>  
#### identifier-character {#identifier-character}
>
> *标识符字符* → 数值 0 - 9
> 
> *标识符字符* → U+0300–U+036F，U+1DC0–U+1DFF，U+20D0–U+20FF，或者 U+FE20–U+FE2F
> 
> *标识符字符* → [头部标识符](#identifier-head)
> 
> 
#### identifier-characters {#identifier-characters}
> 
> *标识符字符组* → [标识符字符](#identifier-character) [标识符字符组](#identifier-characters)<sub>可选</sub>
> 
> 
#### implicit-parameter-name {#implicit-parameter-name}
> 
> *隐式参数名* → **$** [十进制数字列表](#decimal-digit)
>
#### property-wrapper-projection {#property-wrapper-projection}
>
> *属性包装器呈现值* → **$** [标识符字符组](#identifier-characters)
>

## 关键字和标点符号 {#keywords-and-punctuation}

下面这些被保留的关键字不允许用作标识符，除非使用反引号转义，具体描述请参考 [标识符](#identifiers)。除了 `inout`、`var` 以及 `let` 之外的关键字可以用作某个函数声明或者函数调用当中的外部参数名，无需添加反引号转义。当一个成员与一个关键字具有相同的名称时，不需要使用反引号来转义对该成员的引用，除非在引用该成员和使用该关键字之间存在歧义 - 例如，`self`，`Type` 和 `Protocol` 在显式的成员表达式中具有特殊的含义，因此它们必须在该上下文中使用反引号进行转义。

* 用在声明中的关键字：`associatedtype`、`class`、`deinit`、`enum`、`extension`、`fileprivate `、`func`、`import`、`init`、`inout`、`internal`、`let`、`open`、`operator`、`private`、`protocol`、`public`、`rethrows`、`static`、`struct`、`subscript`、`typealias` 以及 `var`。
* 用在语句中的关键字：`break`、`case`、`continue`、`default`、`defer`、`do`、`else`、`fallthrough`、`for`、`guard`、`if`、`in`、`repeat`、`return`、`switch`、`where` 以及 `while`。
* 用在表达式和类型中的关键字：`as`、`Any`、`catch`、`false`、`is`、`nil`、`super`、`self`、`Self`、`throw`、`throws`、`true` 以及 `try `。
* 用在模式中的关键字：`_`。
* 以井字号（`#`）开头的关键字：`#available`、`#colorLiteral`、`#column`、`#else`、`#elseif`、`#endif`、`#error`、`#file`、`#fileLiteral`、`#function`、`#if`、`#imageLiteral`、`#line`、`#selector`、`#sourceLocation`以及 `#warning`。
* 特定上下文中被保留的关键字：`associativity`、`convenience`、`dynamic`、`didSet`、`final`、`get`、`infix`、`indirect`、`lazy`、`left`、`mutating`、`none`、`nonmutating`、`optional`、`override`、`postfix`、`precedence`、`prefix`、`Protocol`、`required`、`right`、`set`、`Type`、`unowned`、`weak` 以及 `willSet`。这些关键字在特定上下文之外可以被用做标识符。

以下符号被保留为标点符号，不能用于自定义运算符：`(`、`)`、`{`、`}`、`[`、`]`、`.`、`,`、`:`、`;`、`=`、`@`、`#`、`&`（作为前缀运算符）、`->`、`` ` ``、`?`、以及 `!`（作为后缀运算符）。

## 字面量 {#literal}

*字面量（literal）* 用来表示源码中某种特定类型的值，比如一个数字或字符串。

下面是字面量的一些示例：

```swift
42              // 整数字面量
3.14159         // 浮点数字面量
"Hello, world!" // 字符串字面量
true		    // 布尔值字面量
```

字面量本身并不包含类型信息。事实上，一个字面量会被解析为拥有无限的精度，然后 Swift 的类型推导会尝试去推导出这个字面量的类型。比如，在 `let x: Int8 = 42` 这个声明中，Swift 使用了显式类型注解（`: Int8`）来推导出 `42` 这个整数字面量的类型是 `Int8`。如果没有可用的类型信息，Swift 则会从标准库中定义的字面量类型中推导出一个默认的类型。整数字面量的默认类型是 `Int`，浮点数字面量的默认类型是 `Double`，字符串字面量的默认类型是 `String`，布尔值字面量的默认类型是 `Bool`。比如，在 `let str = "Hello, world"` 这个声明中，字符串 `"Hello, world"` 的默认推导类型就是 `String`。

当为一个字面量值指定了类型注解的时候，这个注解类型必须能通过这个字面量值实例化。也就是说，这个类型必须符合这些 Swift 标准库协议中的一个：整数字面量的 `ExpressibleByIntegerLiteral` 协议、浮点数字面量的 `ExpressibleByFloatLiteral` 协议、字符串字面量的 `ExpressibleByStringLiteral` 协议、布尔值字面量的 `ExpressibleByBooleanLiteral` 协议、只包含单个 Unicode 标量字符串文本的 `ExpressibleByUnicodeScalarLiteral` 协议以及只包含单个扩展字形簇（grapheme cluster）字符串文字的 `ExpressibleByExtendedGraphemeClusterLiteral` 协议。比如，`Int8` 符合 `ExpressibleByIntegerLiteral` 协议，因此它能在 `let x: Int8 = 42` 这个声明中作为整数字面量 `42` 的类型注解。


> 字面量语法
> 
> *字面量* → [数值字面量](#integer-literal) | [字符串字面量](#string-literal) | [布尔值字面量](#integer-literal) | [nil 字面量](#integer-literal)
> 
> *数值字面量* → **-**<sub>可选</sub> [整数字面量](#integer-literal) | **-**<sub>可选</sub> [浮点数字面量](#floating-point-literal)
> 
> *布尔值字面量* → **true** | **false**
>
> *nil 字面量* → **nil**


### 整数字面量{#integer-literal}

*整数字面量（Integer Literals）* 表示未指定精度的整数值。整数字面量默认用十进制表示；可以加前缀来指定其他的进制。二进制字面量加 `0b`，八进制字面量加 `0o`，十六进制字面量加 `0x`。

十进制字面量包含数字 `0` 至 `9`。二进制字面量包含 `0` 和 `1`，八进制字面量包含数字 `0` 至 `7`，十六进制字面量包含数字 `0` 至 `9` 以及字母 `A` 至 `F`（大小写均可）。

负整数字面量的表示方式为在整数字面量前加负号 `-`，比如 `-42`。

整型字面面可以使用下划线（`_`）来增加数字的可读性，下划线会被系统忽略，因此不会影响字面量的值。同样地，也可以在数字前加 `0`，这同样也会被系统所忽略，并不会影响字面量的值。

除非特别指定，整数字面量的默认推导类型为 Swift 标准库类型中的 `Int`。Swift 标准库还定义了其他不同长度以及是否带符号的整数类型，请参考 [整数](../02_language_guide/01_The_Basics.md#integers)。

> 整数字面量语法
> 
> 
#### integer-literal {#integer-literal}
> 
> *整数字面量* → [二进制字面量](#binary-literal)
> 
> *整数字面量* → [八进制字面量](#octal-literal)
> 
> *整数字面量* → [十进制字面量](#decimal-literal)
> 
> *整数字面量* → [十六进制字面量](#hexadecimal-literal)
> 
> 
#### binary-literal {#binary-literal}
> 
> *二进制字面量* → **0b** [二进制数字](#binary-digit) [二进制字面量字符组](#binary-literal-characters)<sub>可选</sub>
> 
> 
#### binary-digit {#binary-digit}
> 
> *二进制数字* → 数值 0 或 1
> 
> *二进制字面量字符* → [二进制数字](#binary-digit) | **_**
>
> 
#### binary-literal-characters {#binary-literal-characters}
>
> *二进制字面量字符组* → [二进制字面量字符](#binary-literal-character) [二进制字面量字符组](#binary-literal-characters)<sub>可选</sub>
> 
> 
#### octal-literal {#octal-literal}
> 
> *八进制字面量* → **0o** [八进字数字](#octal-digit) [八进制字符组](#octal-literal-characters)<sub>可选</sub>
>
> 
#### octal-digit {#octal-digit}
>
> *八进字数字* → 数值 0 到 7
>
> *八进制字符* → [八进字数字](#octal-digit) | **_**
>
> 
#### octal-literal-characters {#octal-literal-characters}
>
> *八进制字符组* → [八进制字符](#octal-literal-character) [八进制字符组](#octal-literal-characters)<sub>可选</sub>
> 
> 
#### decimal-literal {#decimal-literal}
> 
> *十进制字面量* → [十进制数字](#decimal-digit) [十进制字符组](#decimal-literal-characters)<sub>可选</sub>
>
> 
#### decimal-digit {#decimal-digit}
>
> *十进制数字* → 数值 0 到 9
>
> 
#### decimal-literal-characters {#decimal-literal-characters}
>
> *十进制数字组* → [十进制数字](#decimal-digit) [十进制数字组](#decimal-literal-characters)<sub>可选</sub>
>
> *十进制字符* → [十进制数字](#decimal-digit) | **_**
>
> *十进制字符组* → [十进制字符](#decimal-literal-characters) [十进制字符组](#decimal-literal-characters)<sub>可选</sub>
> 
> 
#### hexadecimal-literal {#hexadecimal-literal}
> 
> *十六进制字面量* → **0x** [十六进制数字](#hexadecimal-digit) [十六进制字面量字符组](#hexadecimal-literal-characters)<sub>可选</sub>
>
> 
#### hexadecimal-digit {#hexadecimal-digit}
>
> *十六进制数字* → 数值 0 到 9, 字母 a 到 f, 或 A 到 F
>
> *十六进制字符* → [十六进制数字](#hexadecimal-digit) | **-**
>
> 
#### hexadecimal-literal-characters {#hexadecimal-literal-characters}
>
> *十六进制字面量字符组* → [十六进制字符](#hexadecimal-literal-characters) [十六进制字面量字符组](#hexadecimal-literal-characters)<sub>可选</sub>

### 浮点数字面量{#floating-point-literal}

*浮点数字面量（Floating-point literals）*表示未指定精度浮点数的值。

浮点数字面量默认用十进制表示（无前缀），也可以用十六进制表示（加前缀 `0x`）。

十进制浮点数字面量由十进制数字串后跟十进制小数部分或十进制指数部分（或两者皆有）组成。十进制小数部分由小数点（`.`）后跟十进制数字串组成。指数部分由大写或小写字母 `e` 为前缀后跟十进制数字串组成，这串数字表示 `e` 之前的数值乘以 10 的几次方。例如：`1.25e2` 表示 1.25 x 10²，也就是 `125.0`。同样，`1.25e－2` 表示 1.25 x 10¯²，也就是 `0.0125`。

十六进制浮点数字面量由前缀 `0x` 后跟可选的十六进制小数部分以及十六进制指数部分组成。十六进制小数部分由小数点后跟十六进制数字串组成。指数部分由大写或小写字母 `p` 为前缀后跟十进制数字串组成，这串数字表示 `p` 之前的数量乘以 2 的几次方。例如：`0xFp2` 表示 15 x 2²，也就是 `60`。同样，`0xFp-2` 表示 15 x 2¯²，也就是 `3.75`。

负数的浮点数字面量由负号（`-`）和浮点数字面量组成，例如 `-42.5`。

浮点数字面量允许使用下划线（`_`）来增强数字的可读性，下划线会被系统忽略，因此不会影响字面量的值。同样地，也可以在数字前加 `0`，并不会影响字面量的值。

除非特别指定，浮点数字面量的默认推导类型为 Swift 标准库类型中的 `Double`，表示 64 位浮点数。Swift 标准库也定义了 `Float` 类型，表示 32 位浮点数。

> 浮点数字面量语法
> 
> 
#### floating-point-literal {#floating-point-literal}
> 
> *浮点数字面量* → [十进制字面量](#decimal-literal) [十进制分数](#decimal-fraction)<sub>可选</sub> [十进制指数](#decimal-exponent)<sub>可选</sub>
> 
> *浮点数字面量* → [十六进制字面量](#hexadecimal-literal) [十六进制分数](#hexadecimal-fraction)<sub>可选</sub> [十六进制指数](#hexadecimal-exponent)
> 
> 
#### decimal-fraction {#decimal-fraction}
> 
> *十进制分数* → **.** [十进制字面量](#decimal-literal)
>
> 
#### decimal-exponent {#decimal-exponent}
>
> *十进制指数* → [十进制指数 e](#floating-point-e) [正负号](#sign)<sub>可选</sub> [十进制字面量](#decimal-literal)
> 
> 
#### hexadecimal-fraction {#hexadecimal-fraction}
> 
> *十六进制分数* → **.** [十六进制数字](#hexadecimal-digit) [十六进制字面量字符组](#hexadecimal-literal-characters)<sub>可选</sub>
>
> 
#### hexadecimal-exponent {#hexadecimal-exponent}
>
> *十六进制指数* → [十六进制指数 p](#floating-point-p) [正负号](#sign)<sub>可选</sub> [十进制字面量](#decimal-literal)
> 
> 
#### floating-point-e {#floating-point-e}
> 
> *十进制指数 e* → **e** | **E**
> 
> 
#### floating-point-p {#floating-point-p}
> 
> *十六进制指数 p* → **p** | **P**
>
> 
#### sign {#sign}
>
> *正负号* → **+** | **-**

### 字符串字面量 {#string-literal}

字符串字面量是被引号包括的一串字符组成。单行字符串字面量是被包在双引号中的一串字符组成，形式如下：

> "`字符`"

字符串字面量中不能包含未转义的双引号（`"`）、未转义的反斜线（`\`）、回车符、换行符。

多行字符串字面量被包在三个双引号中的一串字符组成，形式如下：
> """
> `字符`
> """

与单行字符串字面量不同的是，多行字符串字面量可以包含不转义的双引号（"），回车以及换行。它不能包含三个未转义的连续双引号。

`"""` 之后的回车或者换行开始多行字符串字面量，它们不是字符串的一部分。结束部分的 `"""` 以及它之前的回车或者换行，也不是字符串的一部分。要让多行字符串字面量的开始或结束带有换行，就在第一行或者最后一行写一个空行。

多行字符串字面量可以使用任何空格或制表符组合进行缩进；这些缩进不会包含在字符串中。`"""` 的结束符号决定了缩进：字面量中的每一个非空行开头都必须与结束符 `"""` 之前出现的缩进完全一致；空格和制表符不会被转换。你可以在缩进后包含额外的空格和制表符；这些空格和制表符会在字符串中出现。

多行字符串字面量中的一行结束使用规范化的换行符号。尽管你的源代码混用了回车和换行符，字符串中所有的行结束都必须一样.

在多行字符串字面量里，在行末用反斜线（`\`）可以省略字符串行间中断。反斜线和换行符之间的空白也将被忽略。你可以在你的代码里用这种语法硬包裹多行字符串字面量，而不改变结果字符串的值。

可以在字符串字面量中使用的转义特殊符号如下：

* 空字符 （`\0`）
* 反斜线 （`\\`）
* 水平制表符 （`\t`）
* 换行符 （`\n`）
* 回车符 （`\r`）
* 双引号 （`\"`）
* 单引号 （`\'`）
* Unicode 标量 （`\u{`n`}`），n 为一到八位的十六进制数字

字符串字面量允许在反斜杠（`\`）后的括号 `()` 中插入表达式的值。插入表达式可以包含字符串字面量，但不能包含未转义的反斜线（`\`）、回车符以及换行符。

例如，以下所有字符串字面量的值都是相同的：

```swift
"1 2 3"
"1 2 \("3")"
"1 2 \(3)"
"1 2 \(1 + 2)"
let x = 3; "1 2 \(x)"
```

由扩展分隔符包裹的字符串，它是由引号以及成对出现的数字符号（`#`）包裹的字符串序列。由扩展分隔符包裹的字符串形式如下所示：

> \#"`characters`"#
> 
> \#"""
> 
> `characters`
> 
> """#

特殊字符在被扩展分隔符分隔的结果字符串中会展示为普通字符，而不是特殊字符。你可以使用扩展分隔符来创建一些通常情况下具有特殊效果的字符串。例如，生成字符串插值，启动转义序列或终止字符串。

以下所示，由字符串字面量和扩展分隔符所创建的字符串是等价的:

```swift
let string = #"\(x) \ " \u{2603}"#
let escaped = "\\(x) \\ \" \\u{2603}"
print(string)
// Prints "\(x) \ " \u{2603}"
print(string == escaped)
// Prints "true"

```

如果在一个字符串中使用多对扩展分隔符，请不要在分隔符之间使用空格。

```swift
print(###"Line 1\###nLine 2"###) // OK
print(# # #"Line 1\# # #nLine 2"# # #) // Error

```

使用扩展分隔符创建的多行字符串字面量与普通多行字符串字面量具有相同的缩进要求。

字符串字面量的默认推导类型为 `String`。更多有关 `String` 类型的信息请参考 [字符串和字符](../02_language_guide/03_Strings_and_Characters.md) 以及 [*字符串结构参考*](https://developer.apple.com/documentation/swift/string)。

用 `＋` 操作符连接的字符型字面量是在编译时进行连接的。比如下面的 `textA` 和 `textB` 是完全一样的，`textA` 没有任何运行时的连接操作。

```swift
let textA = "Hello " + "world"
let textB = "Hello world"
```

> 字符串字面量语法
> 
> *字符串字面量* → [静态字符串字面量](#static-string-literal) | [插值字符串字面量](#interpolated-string-literal)
> 
> *字符串开分隔定界符* → [字符串扩展分隔符](#extended-string-literal-delimiter) **"**
> 
> *字符串闭分隔定界符* → **"** [字符串扩展分隔符](#extended-string-literal-delimiter)<sub>可选</sub>
> 
> 
#### static-string-literal {#static-string-literal}
> 
> *静态字符串字面量* → [字符串开分隔定界符](#extended-string-literal-delimiter) [引用文本](#quoted-text)<sub>可选</sub> [字符串闭分隔定界符](#extended-string-literal-delimiter)
> 
> *静态字符串字面量* → [多行字符串开分隔定界符](#extended-string-literal-delimiter) [多行引用文本](#multiline-quoted-text)<sub>可选</sub> [多行字符串闭分隔定界符](#extended-string-literal-delimiter)
>
> *多行字符串开分隔定界符* → [字符串扩展分隔符](#extended-string-literal-delimiter) **"""**
> 
> *多行字符串闭分隔定界符* → **"""** [字符串扩展分隔符](#extended-string-literal-delimiter)
> 
> 
#### extended-string-literal-delimiter {#extended-string-literal-delimiter}
> 
> *字符串扩展分隔符* → **#** [字符串扩展分隔符](#extended-string-literal-delimiter)<sub>可选</sub>
>
> 
#### quoted-text {#quoted-text}
>
> *引用文本* → [引用文本项](#quoted-text-item) [引用文本](#quoted-text)<sub>可选</sub>
>
> 
#### quoted-text-item {#quoted-text-item}
>
> *引用文本项* → [转义字符](#escaped-character)
> 
> *引用文本项* → 除了 **"**、**\\**、U+000A、U+000D 以外的所有 Unicode 字符
> 
> 
#### multiline-quoted-text {#multiline-quoted-text}
> 
> *多行引用文本* → [多行引用文本项](#multiline-quoted-text-item) [多行引用文本](#multiline-quoted-text)<sub>可选</sub>
> 
> 
#### multiline-quoted-text-item {#multiline-quoted-text-item}
> 
> *多行引用文本项* [转义字符](#escaped-character)<sub>可选</sub>
> 
> 
#### multiline-quoted-text {#multiline-quoted-text}
> 
> *多行引用文本* → 除了 **\\** 以外的任何 Unicode 标量值
> 
> *多行引用文本* → [转义换行](#escaped-newline)
> 
> 
#### interpolated-string-literal {#interpolated-string-literal}
> 
> *插值字符串字面量* → [字符串开分隔定界符](#extended-string-literal-delimiter) [插值文本](#interpolated-text)<sub>可选</sub> [字符串闭分隔定界符](#extended-string-literal-delimiter)
> 
> *插值字符串字面量* → [多行字符串开分隔定界符](#extended-string-literal-delimiter) [插值文本](#interpolated-text)<sub>可选</sub> [多行字符串闭分隔定界符](#extended-string-literal-delimiter)
>
> 
#### interpolated-text {#interpolated-text}
>
> *插值文本* → [插值文本项](#interpolated-text-item) [插值文本](#interpolated-text)<sub>可选</sub>
>
> 
#### interpolated-text-item {#interpolated-text-item}
>
> *插值文本项* → **\\(**[ 表达式 ](./04_Expressions.md)**)** | [引用文本项](#quoted-text-item)
> 
> *多行插值文本* → [多行插值文本项](#multiline-quoted-text-item) [多行插值文本](#multiline-quoted-text)<sub>可选</sub>
> 
> *多行插值文本项* → **\\(** [表达式](./04_Expressions.md) **)** | [多行引用文本项](#multiline-quoted-text-item)
> 
> 
#### escape-sequence {#escape-sequence}
> 
> *转义序列* → **\\** [字符串扩展分隔符](#extended-string-literal-delimiter)
> 
> 
#### escaped-character {#escaped-character}
> 
> *转义字符* → [转义序列](#escape-sequence) **0** | [转义序列](#escape-sequence) **\\** | [转义序列](#escape-sequence) **t** | [转义序列](#escape-sequence) **n** | [转义序列](#escape-sequence) **r** | [转义序列](#escape-sequence) **\"** | [转义序列](#escape-sequence) **'**
> 
> *转义字符* → [转义序列](#escape-sequence) **u {** [unicode 标量数字](#unicode-scalar-digits) **}**
>
> 
#### unicode-scalar-digits {#unicode-scalar-digits}
>
> *unicode 标量数字* → 一到八位的十六进制数字
> 
> 
#### escaped-newline {#escaped-newline}
> 
> *转义换行符* → [转义序列](#escape-sequence) [空白](#whitespace)<sub>可选</sub> [断行符](#line-break)


## 运算符 {#operator}

Swift 标准库定义了许多可供使用的运算符，其中大部分在 [基础运算符](../02_language_guide/02_Basic_Operators.md) 和 [高级运算符](../02_language_guide/27_Advanced_Operators.md) 中进行了阐述。这一小节将描述哪些字符能用于自定义运算符。

自定义运算符可以由以下其中之一的 ASCII 字符 `/`、`=`、`-`、`+`、`!`、`*`、`%`、`<`、`>`、`&`、`|`、`^`、`?` 以及 `~`，或者后面语法中规定的任一个 Unicode 字符（其中包含了*数学运算符*、*零散符号（Miscellaneous Symbols）* 以及*印刷符号（Dingbats）*之类的 Unicode 块）开始。在第一个字符之后，允许使用组合型 Unicode 字符。

您也可以以点号（`.`）开头来定义自定义运算符。这些运算符可以包含额外的点。例如 `.+.` 会被看作一个单独的运算符。如果某个运算符不是以点号开头的，那么它就无法再包含另外的点号了。例如，`+.+` 就会被看作为一个 `+` 运算符后面跟着一个 `.+` 运算符。

虽然您可以用问号 `（?）` 来自定义运算符，但是这个运算符不能只包含单独的一个问号。此外，虽然运算符可以包含一个惊叹号 `（!）`，但是前缀运算符不能够以问号或者惊叹号开头。

> 注意
> 
> 以下这些标记 `=`、`->`、`//`、`/*`、`*/`、`.`，前缀运算符 `<`、`&` 和 `?`，中缀运算符 `?`，后缀运算符 `>`、`!` 和 `?` 是被系统保留的。这些符号不能被重载，也不能用作自定义运算符。

运算符两侧的空白被用来区分该运算符是否为前缀运算符、后缀运算符或二元运算符。规则总结如下：

* 如果运算符两侧都有空白或两侧都无空白，将被看作二元运算符。例如：`a+++b` 和 `a +++ b` 当中的 `+++` 运算符会被看作二元运算符。
* 如果运算符只有左侧空白，将被看作一元前缀运算符。例如 `a +++b` 中的 `+++` 运算符会被看做是一元前缀运算符。
* 如果运算符只有右侧空白，将被看作一元后缀运算符。例如 `a+++ b` 中的 `+++` 运算符会被看作是一元后缀运算符。
* 如果运算符左侧没有空白并紧跟 `（.）`，将被看作一元后缀运算符。例如 `a+++.b` 中的 `+++` 运算符会被视为一元后缀运算符（即上式被视为 `a+++ .b` 而不是 `a +++ .b`）。

鉴于这些规则，`(`、`[` 和 `{` 是在运算符前面，`)`、`]` 和 `}` 是在运算符后面，以及字符 `,`、`;` 和 `:` 都被视为空白。

以上规则需注意一点。如果预定义运算符 `!` 或 `?` 左侧没有空白，则不管右侧是否有空白都将被看作后缀运算符。如果将 `?` 用作可选链式调用运算符，左侧必须无空白。如果用于条件运算符 `（? :）`，必须两侧都有空白。

在某些特定的设计中，以 `<` 或 `>` 开头的运算符会被分离成两个或多个符号。剩余部分可能会以同样的方式被再次分离。因此，在 `Dictionary<String, Array<Int>>` 中没有必要添加空白来消除闭合字符 `>` 的歧义。在这个例子中，闭合字符 `>` 不会被视为单独的符号，因而不会被错误解析为 `>>` 运算符。

要学习如何自定义运算符，请参考 [自定义运算符](../02_language_guide/27_Advanced_Operators.md#custom-operators) 和 [运算符声明](./06_Declarations.md#operator-declaration)。要学习如何重载运算符，请参考 [运算符函数](../02_language_guide/27_Advanced_Operators.md#operator-functions)。

> 运算符语法
> 
> *运算符* → [头部运算符](#operator-head) [运算符字符组](#operator-characters)<sub>可选</sub>
> 
> *运算符* → [头部点运算符](#dot-operator-head) [点运算符字符组](#dot-operator-characters)
>
> 
#### operator-head {#operator-head}
>
> *头部运算符* → **/** | **=** | **-** | **+** | **!** | __*__ | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **?**
> 
> *头部运算符* → U+00A1–U+00A7
> 
> *头部运算符* → U+00A9 或 U+00AB
> 
> *头部运算符* → U+00AC 或 U+00AE
> 
> *头部运算符* → U+00B0–U+00B1
>
> *头部运算符* → U+00B6，U+00BB，U+00BF，U+00D7，或 U+00F7
> 
> *头部运算符* → U+2016–U+2017
>
> *头部运算符* → U+2020–U+2027
> 
> *头部运算符* → U+2030–U+203E
> 
> *头部运算符* → U+2041–U+2053
> 
> *头部运算符* → U+2055–U+205E
> 
> *头部运算符* → U+2190–U+23FF
> 
> *头部运算符* → U+2500–U+2775
> 
> *头部运算符* → U+2794–U+2BFF
> 
> *头部运算符* → U+2E00–U+2E7F
> 
> *头部运算符* → U+3001–U+3003
> 
> *头部运算符* → U+3008–U+3020
>
> *头部运算符* → U+3030
> 
> 
#### operator-character {#operator-character}
> 
> *运算符字符* → [头部运算符](#operator-head)
> 
> *运算符字符* → U+0300–U+036F
> 
> *运算符字符* → U+1DC0–U+1DFF
> 
> *运算符字符* → U+20D0–U+20FF
> 
> *运算符字符* → U+FE00–U+FE0F
> 
> *运算符字符* → U+FE20–U+FE2F
> 
> *运算符字符* → U+E0100–U+E01EF
>
> 
#### operator-characters {#operator-characters}
>
> *运算符字符组* → [运算符字符](#operator-character) [运算符字符组](#operator-characters)<sub>可选</sub>
> 
> 
#### dot-operator-head {#dot-operator-head}
> 
> *头部点运算符* → **.**
> 
> 
#### dot-operator-character {#dot-operator-character}
> 
> *点运算符字符* → **.** | [运算符字符](#operator-character)
> 
> 
#### dot-operator-characters {#dot-operator-characters}
> 
> *点运算符字符组* → [点运算符字符](#dot-operator-character) [点运算符字符组](#dot-operator-characters)<sub>可选</sub>
>
> *二元运算符* → [运算符](#operator)
>
> *前缀运算符* → [运算符](#operator)
>
> *后缀运算符* → [运算符](#operator)
