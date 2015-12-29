# 词法结构（Lexical Structure）
-----------------

> 1.0
> 翻译：[superkam](https://github.com/superkam)
> 校对：[numbbbbb](https://github.com/numbbbbb)

> 2.0
> 翻译+校对：[buginux](https://github.com/buginux)

> 2.1
> 翻译：[mmoaay](https://github.com/mmoaay)


本页包含内容：

- [空白与注释](#whitespace_and_comments)
- [标识符](#identifiers)
- [关键字和标点符号](#keywords)
- [字面量](#literals)
	- [整数字面量](#integer_literals) 
	- [浮点数字面量](#floating_point_literals)
	- [字符串字面量](#string_literals)
- [运算符](#operators)

Swift 的“词法结构”描述了能构成该语言中合法符号的字符序列。这些合法符号组成了语言中最底层的构建基块，并在之后的章节中用于描述语言的其他部分。一个合法符号由一个标识符、关键字、标点符号、字面量或运算符组成。

通常情况下，符号是根据随后将介绍的语法约束，由 Swift 源文件的输入文本中提取可能的最长子串生成。这种方法称为“最长匹配”，或者“最大适合”。

<a id="whitespace_and_comments"></a>
## 空白与注释

空白有两个用途：分隔源文件中的符号以及帮助区分运算符属于前缀还是后缀（参见 [运算符](#operators)），在其他情况下则会被忽略。以下的字符会被当作空白：空格（U+0020）、换行符（U+000A）、回车符（U+000D）、水平制表符（U+0009）、垂直制表符（U+000B）、换页符（U+000C）以及空（U+0000）。

注释被编译器当作空白处理。单行注释由 `//` 开始直至遇到换行符（U+000A）或者回车符（U+000D）。多行注释由 `/*` 开始，以 `*/` 结束。注释允许嵌套，但注释标记必须匹配。

正如 [*Markup Formatting Reference*](https://developer.apple.com/library/prerelease/ios/documentation/Xcode/Reference/xcode_markup_formatting_ref/index.html#//apple_ref/doc/uid/TP40016497) 所述，注释可以包含附加的格式和标记。

<a id="identifiers"></a>
## 标识符

标识符可以由以下的字符开始：大写或小写的字母 `A` 到 `Z`、下划线 `_`、基本多文种平面中的 Unicode 非组合字符以及基本多文种平面以外的非个人专用区字符。首字符之后，允许使用数字和 Unicode 字符组合。

使用保留字作为标识符，需要在其前后增加反引号 `` ` ``。例如，`class` 不是合法的标识符，但可以使用 `` `class` ``。反引号不属于标识符的一部分，`` `x` `` 和 `x` 表示同一标识符。

闭包中如果没有明确指定参数名称，参数将被隐式命名为 `$0`、`$1`、`$2` 等等。这些命名在闭包作用域范围内是合法的标识符。

> 标识符语法

<a id="identifier"></a>
> *标识符* → [*头部标识符*](#identifier-head) [*标识符字符组*](#identifier-characters)<sub>可选</sub>  
> *标识符* → \`[*头部标识符*](#identifier-head) [*标识符字符组*](#identifier-characters)<sub>可选</sub>\`  
> *标识符* → [*隐式参数名*](#implicit-parameter-name)  
<a id="identifier-list"></a>
> *标识符列表* → [*标识符*](#identifier) | [*标识符*](#identifier) **,** [*标识符列表*](#identifier-list)

<a id="identifier-head"></a>        
> *头部标识符* → 大写或小写字母 A - Z  
> *头部标识符* → _  
> *头部标识符* → U+00A8，U+00AA，U+00AD，U+00AF，U+00B2–U+00B5，或者 U+00B7–U+00BA  
> *头部标识符* → U+00BC–U+00BE，U+00C0–U+00D6，U+00D8–U+00F6，或者 U+00F8–U+00FF  
> *头部标识符* → U+0100–U+02FF，U+0370–U+167F，U+1681–U+180D，或者 U+180F–U+1DBF  
> *头部标识符* → U+1E00–U+1FFF  
> *头部标识符* → U+200B–U+200D，U+202A–U+202E，U+203F–U+2040，U+2054，或者 U+2060–U+206F  
> *头部标识符* → U+2070–U+20CF，U+2100–U+218F，U+2460–U+24FF，或者 U+2776–U+2793  
> *头部标识符* → U+2C00–U+2DFF 或者 U+2E80–U+2FFF  
> *头部标识符* → U+3004–U+3007，U+3021–U+302F，U+3031–U+303F，或者 U+3040–U+D7FF  
> *头部标识符* → U+F900–U+FD3D，U+FD40–U+FDCF，U+FDF0–U+FE1F，或者 U+FE30–U+FE44  
> *头部标识符* → U+FE47–U+FFFD  
> *头部标识符* → U+10000–U+1FFFD，U+20000–U+2FFFD，U+30000–U+3FFFD，或者 U+40000–U+4FFFD  
> *头部标识符* → U+50000–U+5FFFD，U+60000–U+6FFFD，U+70000–U+7FFFD，或者 U+80000–U+8FFFD  
> *头部标识符* → U+90000–U+9FFFD，U+A0000–U+AFFFD，U+B0000–U+BFFFD，或者 U+C0000–U+CFFFD  
> *头部标识符* → U+D0000–U+DFFFD 或者 U+E0000–U+EFFFD  

<a id="identifier-character"></a>
> *标识符字符* → 数值 0 - 9  
> *标识符字符* → U+0300–U+036F，U+1DC0–U+1DFF，U+20D0–U+20FF，或者 U+FE20–U+FE2F  
> *标识符字符* → [*头部标识符*](#identifier-head)
<a id="identifier-characters"></a>        
> *标识符字符组* → [*标识符字符*](#identifier-character) [*标识符字符组*](#identifier-characters)<sub>可选</sub>  

<a id="implicit-parameter-name"></a>    
> *隐式参数名* → **$** [*十进制数字列表*](#decimal-digits)  

<a id="keywords"></a>
## 关键字和标点符号

下面这些被保留的关键字不允许用作标识符，除非被反引号转义，具体描述请参考 [标识符](#identifiers)。

* 用在声明中的关键字： `class`、`deinit`、`enum`、`extension`、`func`、`import`、`init`、`inout`、`internal`、`let`、`operator`、`private`、`protocol`、`public`、`static`、`struct`、`subscript`、`typealias`、`var`。
* 用在语句中的关键字： `break`、`case`、`continue`、`default`、`defer`、`do`、`else`、`fallthrough`、`for`、`guard`、`if`、`in`、`repeat`、`return`、`switch`、`where`、`while`。
* 用在表达式和类型中的关键字： `as`、`catch`、`dynamicType`、`false`、`is`、`nil`、`rethrows`、`super`、`self`、`Self`、`throw`、`throws`、`true`、`try`、`__COLUMN__`、`__FILE__`、`__FUNCTION__`、`__LINE__`。
* 用在模式中的关键字：`_`
* 特定上下文中被保留的关键字： `associativity`、`convenience`、`dynamic`、`didSet`、`final`、`get`、`infix`、`indirect`、`lazy`、`left`、`mutating`、`none`、`nonmutating`、`optional`、`override`、`postfix`、`precedence`、`prefix`、`Protocol`、`required`、`right`、`set`、`Type`、`unowned`、`weak`、`willSet`，这些关键字在特定上下文之外可以被用做标识符。
  
以下符号被当作保留符号，不能用于自定义运算符： `(`、`)`、`{`、`}`、`[`、`]`、`.`、`,`、`:`、`;`、`=`、`@`、`#`、`&`（作为前缀运算符）、`->`、`` ` ``、`?`、`!`（作为后缀运算符）。

<a id="literals"></a>
## 字面量

字面量是用来表示源码中某种特定类型的值，比如一个数字或字符串。

下面是字面量的一些示例：

```swift
42              // 整数字面量
3.14159         // 浮点数字面量
"Hello, world!" // 字符串字面量
true			// 布尔值字面量
```

字面量本身并不包含类型信息。事实上，一个字面量会被解析为拥有无限的精度，然后 Swift 的类型推导会尝试去推导出这个字面量的类型。比如，在 `let x: Int8 = 42` 这个声明中，Swift 使用了显式类型标注（`: Int8`）来推导出 `42` 这个整数字面量的类型是 `Int8`。如果没有可用的类型信息， Swift 则会从标准库中定义的字面量类型中推导出一个默认的类型。整数字面量的默认类型是 `Int`，浮点数字面量的默认类型是 `Double`，字符串字面量的默认类型是 `String`，布尔值字面量的默认类型是 `Bool`。比如，在 `let str = "Hello, world"` 这个声明中，字符串 `"Hello, world"` 的默认推导类型就是 `String`。

当为一个字面量值指定了类型标注的时候，这个标注的类型必须能通过这个字面量值实例化。也就是说，这个类型必须符合这些 Swift 标准库协议中的一个：整数字面量的 `IntegerLiteralConvertible` 协议、浮点数字面量的 `FloatingPointLiteralConvertible` 协议、字符串字面量的 `StringLiteralConvertible` 协议以及布尔值字面量的 `BooleanLiteralConvertible` 协议。比如，`Int8` 符合 `IntegerLiteralConvertible` 协议，因此它能在 `let x: Int8 = 42` 这个声明中作为整数字面量 `42` 的类型标注。

> 字面量语法  

> *字面量* → [*数值字面量*](#numeric-literal) | [*字符串字面量*](#string-literal) | [*布尔值字面量*](#boolean-literal) | [*nil 字面量*](#nil-literal)    

<a id="numeric-literal"></a>    
> *数值字面量* → **-**<sub>可选</sub> [*整数字面量*](#integer-literal) | **-**<sub>可选</sub> [*浮点数字面量*](#floating-point-literal)   
<a id="boolean-literal"></a> 
> *布尔值字面量* → **true** | **false**    
<a id="nil-literal"></a> 
> *nil 字面量* → **nil**

<a id="integer_literals"></a>
### 整数字面量

整数字面量表示未指定精度整数的值。整数字面量默认用十进制表示，可以加前缀来指定其他的进制，二进制字面量加 `0b`，八进制字面量加 `0o`，十六进制字面量加 `0x`。

十进制字面量包含数字 `0` 至 `9`。二进制字面量只包含 `0` 或 `1`，八进制字面量包含数字 `0` 至 `7`，十六进制字面量包含数字 `0` 至 `9` 以及字母 `A` 至 `F`（大小写均可）。

负整数的字面量在整数字面量前加负号 `-`，比如 `-42`。

整型字面面可以使用下划线 `_` 来增加数字的可读性，下划线会被系统忽略，因此不会影响字面量的值。同样地，也可以在数字前加 `0`，并不会影响字面量的值。

除非特别指定，整数字面量的默认推导类型为 Swift 标准库类型中的 `Int`。Swift 标准库还定义了其他不同长度以及是否带符号的整数类型，请参考 [整数](../chapter2/01_The_Basics.html#integers)。

> 整数字面量语法  

<a id="integer-literal"></a>
> *整数字面量* → [*二进制字面量*](#binary-literal)  
> *整数字面量* → [*八进制字面量*](#octal-literal)  
> *整数字面量* → [*十进制字面量*](#decimal-literal)  
> *整数字面量* → [*十六进制字面量*](#hexadecimal-literal)  

<a id="binary-literal"></a>
> *二进制字面量* → **0b** [*二进制数字*](#binary-digit) [*二进制字面量字符组*](#binary-literal-characters)<sub>可选</sub> 
> <a id="binary-digit"></a>   
> *二进制数字* → 数值 0 到 1  
<a id="binary-literal-character"></a> 
> *二进制字面量字符* → [*二进制数字*](#binary-digit) | _    
<a id="binary-literal-characters"></a> 
> *二进制字面量字符组* → [*二进制字面量字符*](#binary-literal-character) [*二进制字面量字符组*](#binary-literal-characters)<sub>可选</sub>  

<a id="octal-literal"></a>    
> *八进制字面量* → **0o** [*八进字数字*](#octal-digit) [*八进制字符组*](#octal-literal-characters)<sub>可选</sub>    
<a id="octal-digit"></a>  
> *八进字数字* → 数值 0 到 7  
<a id="octal-literal-character"></a> 
> *八进制字符* → [*八进字数字*](#octal-digit) | _    
<a id="octal-literal-characters"></a> 
> *八进制字符组* → [*八进制字符*](#octal-literal-character) [*八进制字符组*](#octal-literal-characters)<sub>可选</sub>

<a id="decimal-literal"></a>    
> *十进制字面量* → [*十进制数字*](#decimal-digit) [*十进制字符组*](#decimal-literal-characters)<sub>可选</sub>    
<a id="decimal-digit"></a>
> *十进制数字* → 数值 0 到 9  
<a id="decimal-digits"></a>
> *十进制数字组* → [*十进制数字*](#decimal-digit) [*十进制数字组*](#decimal-digits)<sub>可选</sub>  
<a id="decimal-literal-character"></a>
> *十进制字符* → [*十进制数字*](#decimal-digit) | _    
<a id="decimal-literal-characters"></a>
> *十进制字符组* → [*十进制字符*](#decimal-literal-character) [*十进制字符组*](#decimal-literal-characters)<sub>可选</sub> 

<a id="hexadecimal-literal"></a>    
> *十六进制字面量* → **0x** [*十六进制数字*](#hexadecimal-digit) [*十六进制字面量字符组*](#hexadecimal-literal-characters)<sub>可选</sub>  
<a id="hexadecimal-digit"></a>
> *十六进制数字* → 数值 0 到 9, 字母 a 到 f, 或 A 到 F  
<a id="hexadecimal-literal-character"></a>
> *十六进制字符* → [*十六进制数字*](#hexadecimal-digit) | _     
<a id="hexadecimal-literal-characters"></a>
> *十六进制字面量字符组* → [*十六进制字符*](#hexadecimal-literal-character) [*十六进制字面量字符组*](#hexadecimal-literal-characters)<sub>可选</sub>  

<a id="floating_point_literals"></a>
### 浮点数字面量

浮点数字面量表示未指定精度浮点数的值。

浮点数字面量默认用十进制表示（无前缀），也可以用十六进制表示（加前缀 `0x`）。

十进制浮点数字面量由十进制数字串后跟小数部分或指数部分（或两者皆有）组成。十进制小数部分由小数点 `.` 后跟十进制数字串组成。指数部分由大写或小写字母 `e` 为前缀后跟十进制数字串组成，这串数字表示 `e` 之前的数量乘以 10 的几次方。例如：`1.25e2` 表示 `1.25 ⨉ 10^2`，也就是 `125.0`；同样，`1.25e－2` 表示 `1.25 ⨉ 10^－2`，也就是 `0.0125`。

十六进制浮点数字面量由前缀 `0x` 后跟可选的十六进制小数部分以及十六进制指数部分组成。十六进制小数部分由小数点后跟十六进制数字串组成。指数部分由大写或小写字母 `p` 为前缀后跟十进制数字串组成，这串数字表示 `p` 之前的数量乘以 2 的几次方。例如：`0xFp2` 表示 `15 ⨉ 2^2`，也就是 `60`；同样，`0xFp-2` 表示 `15 ⨉ 2^-2`，也就是 `3.75`。

负数的浮点数字面量由负号 `-` 和浮点数字面量组成，例如 `-42.5`。

浮点数字面量允许使用下划线 `_` 来增强数字的可读性，下划线会被系统忽略，因此不会影响字面量的值。同样地，也可以在数字前加 `0`，并不会影响字面量的值。

除非特别指定，浮点数字面量的默认推导类型为 Swift 标准库类型中的 `Double`，表示 64 位浮点数。Swift 标准库也定义了 `Float` 类型，表示 32 位浮点数。

> 浮点数字面量语法  

<a id="floating-point-literal"></a> 
> *浮点数字面量* → [*十进制字面量*](#decimal-literal) [*十进制分数*](#decimal-fraction)<sub>可选</sub> [*十进制指数*](#decimal-exponent)<sub>可选</sub>      
> *浮点数字面量* → [*十六进制字面量*](#hexadecimal-literal) [*十六进制分数*](#hexadecimal-fraction)<sub>可选</sub> [*十六进制指数*](#hexadecimal-exponent)

<a id="decimal-fraction"></a>    
> *十进制分数* → **.** [*十进制字面量*](#decimal-literal) 
<a id="decimal-exponent"></a>  
> *十进制指数* → [*十进制指数 e*](#floating-point-e) [*正负号*](#sign)<sub>可选</sub> [*十进制字面量*](#decimal-literal)  

<a id="hexadecimal-fraction"></a>
> *十六进制分数* → **.** [*十六进制数字*](#hexadecimal-digit) [*十六进制字面量字符组*](#hexadecimal-literal-characters)<sub>可选</sub>  
<a id="hexadecimal-exponent"></a>
> *十六进制指数* → [*十六进制指数 p*](#floating-point-p) [*正负号*](#sign)<sub>可选</sub> [*十进制字面量*](#decimal-literal)  

<a id="floating-point-e"></a>
> *十进制指数 e* → **e** | **E**  
<a id="floating-point-p"></a>
> *十六进制指数 p* → **p** | **P**  
<a id="sign"></a>
> *正负号* → **+** | **-**  

<a id="string_literals"></a>
### 字符串字面量

字符串字面量由被包在双引号中的一串字符组成，形式如下：

> "`字符`"

字符串字面量中不能包含未转义的双引号（`"`）、未转义的反斜线（`\`）、回车符、换行符。

可以在字符串字面量中使用的转义特殊符号如下：

* 空字符 `\0`
* 反斜线 `\\`
* 水平制表符 `\t`
* 换行符 `\n`
* 回车符 `\r`
* 双引号 `\"`
* 单引号 `\'`
* Unicode 标量 `\u{`n`}`，n 为一到八位的十六进制数字

字符串字面量允许在反斜杠 `\` 后的括号 `()` 中插入表达式的值。插入表达式可以包含字符串字面量，但不能包含未转义的双引号 `"`、未转义的反斜线 `\`、回车符、换行符。

例如，以下所有字符串字面量的值都是相同的：

```swift
"1 2 3"
"1 2 \("3")"
"1 2 \(3)"
"1 2 \(1 + 2)"
let x = 3; "1 2 \(x)"
```

字符串字面量的默认推导类型为 `String`。更多有关 `String` 类型的信息请参考 [字符串和字符](../chapter2/03_Strings_and_Characters.html) 以及 [*String Structure Reference*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Reference/Swift_String_Structure/index.html#//apple_ref/doc/uid/TP40015181)。

用 `＋` 操作符连接的字符型字面量是在编译时进行连接的。比如下面的 `textA` 和 `textB` 是完全一样的，`textA` 没有任何运行时的连接操作。

```swift
let textA = "Hello " + "world"
let textB = "Hello world"
```

> 字符串字面量语法  

<a id="string-literal"></a>
> *字符串字面量* → [*静态字符串字面量*](#static-string-literal) | [*插值字符串字面量*](#interpolated-string-literal) 

<a id="static-string-literal"></a>
> *静态字符串字面量* → **"**[*引用文本*](#quoted-text)<sub>可选</sub>**"**  
<a id="quoted-text"></a> 
> *引用文本* → [*引用文本项*](#quoted-text-item) [*引用文本*](#quoted-text)<sub>可选</sub> 
<a id="quoted-text-item"></a>  
> *引用文本项* → [*转义字符*](#escaped-character)  
> *引用文本项* → 除了 **"**、**\\**、U+000A、U+000D 以外的所有 Unicode 字符

<a id="interpolated-string-literal"></a>
> *插值字符串字面量* → **"**[*插值文本*](#interpolated-text)<sub>可选</sub>**"**  
<a id="interpolated-text"></a> 
> *插值文本* → [*插值文本项*](#interpolated-text-item) [*插值文本*](#interpolated-text)<sub>可选</sub> 
<a id="interpolated-text-item"></a>  
> *插值文本项* → **\\****(**[*表达式*](./04_Expressions.html)**)** | [*引用文本项*](#quoted-text-item)

<a id="escaped-character"></a>
> *转义字符* → **\\****0** | **\\****\\** | **\t** | **\n** | **\r** | **\\"** | **\\'**     
> *转义字符* → **\u {** [*unicode 标量数字*](#unicode-scalar-digits) **}**  
<a id="unicode-scalar-digits"></a>
> *unicode 标量数字* → 一到八位的十六进制数字

<a id="operators"></a>
## 运算符

Swift 标准库定义了许多可供使用的运算符，其中大部分在 [基础运算符](../chapter2/02_Basic_Operators.html) 和 [高级运算符](../chapter2/25_Advanced_Operators.html) 中进行了阐述。这一小节将描述哪些字符能用于自定义运算符。

自定义运算符可以由以下其中之一的 ASCII 字符 `/`、`=`、 `-`、`+`、`!`、`*`、`%`、`<`、`>`、`&`、`|`、`^`、`?` 以及 `~`，或者后面语法中规定的任一个 Unicode 字符开始。在第一个字符之后，允许使用组合型 Unicode 字符。也可以使用两个或者多个的点号来自定义运算符（比如，`....`）。虽然可以自定义包含问号 `?` 的运算符，但是这个运算符不能只包含单独的一个问号。

> 注意  
以下这些标记 `=`、`->`、`//`、`/*`、`*/`、`.`、`<`（前缀运算符）、`&`、`?`、`?`（中缀运算符）、`>`（后缀运算符）、`!` 、`?` 是被系统保留的。这些符号不能被重载，也不能用于自定义运算符。

运算符两侧的空白被用来区分该运算符是否为前缀运算符、后缀运算符或二元运算符。规则总结如下：

* 如果运算符两侧都有空白或两侧都无空白，将被看作二元运算符。例如：`a+b` 和 `a + b` 中的运算符 `+` 被看作二元运算符。
* 如果运算符只有左侧空白，将被看作前缀一元运算符。例如 `a ++b` 中的 `++` 被看作前缀一元运算符。
* 如果运算符只有右侧空白，将被看作后缀一元运算符。例如 `a++ b` 中的 `++` 被看作后缀一元运算符。
* 如果运算符左侧没有空白并紧跟 `.`，将被看作后缀一元运算符。例如 `a++.b` 中的 `++` 被看作后缀一元运算符（即上式被视为 `a++ .b` 而非 `a ++ .b`）。

鉴于这些规则，运算符前的字符 `(`、`[` 和 `{`，运算符后的字符 `)`、`]` 和 `}`，以及字符 `,`、`;` 和 `:` 都被视为空白。

以上规则需注意一点，如果预定义运算符 `!` 或 `?` 左侧没有空白，则不管右侧是否有空白都将被看作后缀运算符。如果将 `?` 用作可选链式调用运算符，左侧必须无空白。如果用于条件运算符 `? :`，必须两侧都有空白。

在某些特定的设计中 ，以 `<` 或 `>` 开头的运算符会被分离成两个或多个符号，剩余部分可能会以同样的方式被再次分离。因此，在 `Dictionary<String, Array<Int>>` 中没有必要添加空白来消除闭合字符 `>` 的歧义。在这个例子中， 闭合字符 `>` 不会被视为单独的符号，因而不会被错误解析为 `>>` 运算符。

要学习如何自定义运算符，请参考 [自定义运算符](../chapter2/25_Advanced_Operators.html#custom_operators) 和 [运算符声明](05_Declarations.html#operator_declaration)。要学习如何重载运算符，请参考 [运算符函数](../chapter2/25_Advanced_Operators.html#operator_functions)。

> 运算符语法  

<a id="operator"></a>
> *运算符* → [*头部运算符*](#operator-head) [*运算符字符组*](#operator-characters)<sub>可选</sub>  
> *运算符* → [*头部点运算符*](#dot-operator-head) [*点运算符字符组*](#dot-operator-characters)<sub>可选</sub>    

<a id="operator-head"></a>    
> *头部运算符* → **/** | **=** | **-** | **+** | **!** | __*__ | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **?**  
> *头部运算符* → U+00A1–U+00A7    
> *头部运算符* → U+00A9 或 U+00AB    
> *头部运算符* → U+00AC 或 U+00AE    
> *头部运算符* → U+00B0–U+00B1，U+00B6，U+00BB，U+00BF，U+00D7，或 U+00F7    
> *头部运算符* → U+2016–U+2017 或 U+2020–U+2027    
> *头部运算符* → U+2030–U+203E    
> *头部运算符* → U+2041–U+2053    
> *头部运算符* → U+2055–U+205E    
> *头部运算符* → U+2190–U+23FF    
> *头部运算符* → U+2500–U+2775    
> *头部运算符* → U+2794–U+2BFF    
> *头部运算符* → U+2E00–U+2E7F    
> *头部运算符* → U+3001–U+3003    
> *头部运算符* → U+3008–U+3030 

<a id="operator-character"></a>       
> *运算符字符* → [*头部运算符*](#operator-head)    
> *运算符字符* → U+0300–U+036F    
> *运算符字符* → U+1DC0–U+1DFF    
> *运算符字符* → U+20D0–U+20FF    
> *运算符字符* → U+FE00–U+FE0F    
> *运算符字符* → U+FE20–U+FE2F    
> *运算符字符* → U+E0100–U+E01EF  
<a id="operator-characters"></a>
> *运算符字符组* → [*运算符字符*](#operator-character) [*运算符字符组*](#operator-characters)<sub>可选</sub>    

<a id="dot-operator-head"></a>    
> *头部点运算符* → **..**    
<a id="dot-operator-character"></a> 
> *点运算符字符* → **.** | [*运算符字符*](#operator-character)    
<a id="dot-operator-characters"></a> 
> *点运算符字符组* → [*点运算符字符*](#dot-operator-character) [*点运算符字符组*](#dot-operator-characters)<sub>可选</sub>
 
<a id="binary-operator"></a>
> *二元运算符* → [*运算符*](#operator)  
<a id="prefix-operator"></a>
> *前缀运算符* → [*运算符*](#operator)  
<a id="postfix-operator"></a>
> *后缀运算符* → [*运算符*](#operator)  
