# 词法结构（Lexical Structure）
-----------------

> 1.0
> 翻译：[superkam](https://github.com/superkam)
> 校对：[numbbbbb](https://github.com/numbbbbb)

> 2.0
> 翻译+校对：[buginux](https://github.com/buginux)


本页包含内容：

- [空白与注释（*Whitespace and Comments*）](#whitespace_and_comments)
- [标识符（*Identifiers*）](#identifiers)
- [关键字（*Keywords*）](#keywords)
- [字面量（*Literals*）](#literals)
- [运算符（*Operators*）](#operators)

Swift 的“词法结构（*lexical structure*）”描述了能构成该语言中合法标记（*tokens*）的字符序列。这些合法标记组成了语言中最底层的构建基块，并在之后的章节中用于描述语言的其他部分。

通常情况下，标记是在随后将介绍的语法约束下，由 Swift 源文件的输入文本中提取可能的最长子串生成。这种方法称为“最长匹配项（*longest match*）”，或者“最大适合”（*maximal munch*）。

<a id="whitespace_and_comments"></a>
## 空白与注释

空白（*whitespace*）有两个用途：分隔源文件中的标记和帮助区分运算符属于前缀还是后缀（参见 [运算符](#operators)），在其他情况下则会被忽略。以下的字符会被当作空白：空格（*space*）（U+0020）、换行符（*line feed*）（U+000A）、回车符（*carriage return*）（U+000D）、水平制表符（*horizontal tab*）（U+0009）、垂直制表符（*vertical tab*）（U+000B）、换页符（*form feed*）（U+000C）以及空（*null*）（U+0000）。

注释（*comments*）被编译器当作空白处理。单行注释由 `//` 开始直至遇到换行符（*line feed*）（U+000A）或者回车符（*carriage return*）（U+000D）。多行注释由 `/*` 开始，以 `*/` 结束。注释允许嵌套，但注释标记必须匹配。

<a id="identifiers"></a>
## 标识符

标识符（*identifiers*）可以由以下的字符开始：大写或小写的字母 `A` 到 `Z`、下划线 `_`、基本多文种平面（*Basic Multilingual Plane*）中的 Unicode 非组合字符以及基本多文种平面以外的非专用区（*Private Use Area*）字符。首字符之后，允许使用数字和 Unicode 字符组合。

使用保留字（*reserved word*）作为标识符，需要在其前后增加反引号 \`。例如，`class` 不是合法的标识符，但可以使用 \`class\`。反引号不属于标识符的一部分，\`x\` 和 `x` 表示同一标识符。

闭包（*closure*）中如果没有明确指定参数名称，参数将被隐式命名为 `$0`、`$1`、`$2`等等。 这些命名在闭包作用域范围内是合法的标识符。

> 标识符语法  
<a id="identifier"></a>
> *标识符* → [*头部标识符*](#identifier_head) [*标识符字符组*](#identifier_characters)<sub>可选</sub>  
> *标识符* → \`[*头部标识符*](#identifier_head) [*标识符字符组*](#identifier_characters)<sub>可选</sub>\`  
> *标识符* → [*隐式参数名*](#implicit_parameter_name)  
> *标识符列表* → [*标识符*](#identifier) | [*标识符*](#identifier) **,** [*标识符列表*](#identifier_list)    
<a id="identifier_head"></a>        
> *头部标识符* → 大写或小写字母 A - Z  
> *头部标识符* → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, or U+00B7–U+00BA  
> *头部标识符* → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, or U+00F8–U+00FF  
> *头部标识符* → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, or U+180F–U+1DBF  
> *头部标识符* → U+1E00–U+1FFF  
> *头部标识符* → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, or U+2060–U+206F  
> *头部标识符* → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, or U+2776–U+2793  
> *头部标识符* → U+2C00–U+2DFF or U+2E80–U+2FFF  
> *头部标识符* → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, or U+3040–U+D7FF  
> *头部标识符* → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, or U+FE30–U+FE44  
> *头部标识符* → U+FE47–U+FFFD  
> *头部标识符* → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, or U+40000–U+4FFFD  
> *头部标识符* → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, or U+80000–U+8FFFD  
> *头部标识符* → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, or U+C0000–U+CFFFD  
> *头部标识符* → U+D0000–U+DFFFD or U+E0000–U+EFFFD  
> *标识符字符* → 数值 0 - 9  
> *标识符字符* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F  
> *标识符字符* → [*头部标识符*](#identifier_head)
<a id="identifier_characters"></a>        
> *标识符字符组* → [*标识符字符*](#identifier_character) [*标识符字符列表*](#identifier_characters)<sub>可选</sub>  
<a id="implicit_parameter_name"></a>    
> *隐式参数名* → **$** [*十进制数字列表*](#decimal_digits)  

<a id="keywords"></a>
## 关键字和符号

下面这些被保留的关键字（*keywords*）不允许用作标识符，除非被反引号转义，具体描述请参考 [标识符](#identifiers)。

* **用在声明中的关键字：** *class*、*deinit*、*enum*、*extension*、*func*、*import*、*init*、*let*、*protocol*、*static*、*struct*、*subscript*、*typealias*、*var*
* **用在语句中的关键字：** *break*、*case*、*continue*、*default*、*do*、*else*、*fallthrough*、*if*、*in*、*for*、*return*、*switch*、*where*、*while*
* **用在表达式和类型中的关键字：** *as*、*dynamicType*、*is*、*new*、*super*、*self*、*Self*、*Type*、*\_\_COLUMN\_\_*、*\_\_FILE\_\_*、*\_\_FUNCTION\_\_*、*\_\_LINE\_\_*
* **用在模式中的关键字：** *\_*
* **特定上下文中被保留的关键字：** *associativity*、*didSet*、*get*、*infix*、*inout*、*left*、*mutating*、*none*、*nonmutating*、*operator*、*override*、*postfix*、*precedence*、*prefix*、*right*、*set*、*unowned*、*unowned(safe)*、*unowned(unsafe)*、*weak*、*willSet*，这些关键字在特定上下文之外可以被用于标识符。
  
以下标记被当作保留符号，不能用于自定义操作符：`(`、`)`、`{`、`}`、`[`、`]`、`.`、`,`、`:`、`;`、`=`、`@`、`#`、`&（作为前缀操作符）`、`->`、`` `、`?` 和 `!(作为后缀操作符)`。

<a id="literals"></a>
## 字面量

字面量是用来表示源码中某种特定类型的值，比如一个数字或字符串。

下面是字面量的一些示例：

```swift
42                 // 整型字面量
3.14159            // 浮点型字面量
"Hello, world!"    // 字符串型字面量
true			   // 布尔型字面量
```

字面量本身并不包含类型信息。事实上，一个字面量会被解析为拥有无限的精度，然后 Swift 的类型推导会尝试去推导出这个字面量的类型。比如，在 `let x: Int8 = 42` 这个声明中，Swift 使用了显式类型标注（`: Int8`）来推导出 `42` 这个整型字面量的类型是 `Int8`。如果没有可用的类型信息， Swift 则会从标准库中定义的字面量类型中推导出一个默认的类型。整型字面量的默认类型是 `Int`，浮点型字面量的默认类型是 `Double`，字符串型字面量的默认类型是 `String`，布尔型字面量的默认类型是 `Bool`。比如，在 `let str = "Hello, world"` 这个声明中，字符串 `"Hello, world"`的默认推导类型就是 `String`。

当为一个字面量值指定了类型标注的时候，这个注解的类型必须能通过这个字面量值实例化后得到。也就是说，这个类型必须遵守这些 Swift 标准库协议中的一个：整型字面量的`IntegerLiteralConvertible`协议、符点型字面量的`FloatingPointLiteralConvertible`协议、字符串字面量的`StringLiteralConvertible`协议以及布尔型字面量的`BooleanLiteralConvertible`协议。比如，`Int8` 遵守了 `IntegerLiteralConvertible`协议，因此它能在 `let x: Int8 = 42` 这个声明中作为整型字面量 `42` 的类型标注。

> 字面量语法  
> *字面量* → [*数字型字面量*](#numeric_literal) | [*字符串型字面量*](#string_literal) | [*布尔型字面量*](#boolean_literal) | [*nil型字面量*](#nil_literal)    
<a id="numeric_literal"></a>    
> *数字型字面量* → -<sub>可选</sub>[*整型字面量*](#integer_literal) | -<sub>可选</sub>[*符点型字面量*](#floating_point_literal)    
> *布尔型字面量* → **true** | **false**    
> *nil型字面量* → **nil**

### 整型字面量

整型字面量（*integer literals*）表示未指定精度整型数的值。整型字面量默认用十进制表示，可以加前缀来指定其他的进制，二进制字面量加 `0b`，八进制字面量加 `0o`，十六进制字面量加 `0x`。

十进制字面量包含数字 `0` 至 `9`。二进制字面量只包含 `0` 或 `1`，八进制字面量包含数字 `0` 至 `7`，十六进制字面量包含数字 `0` 至 `9` 以及字母 `A` 至 `F` （大小写均可）。

负整数的字面量在整型字面量前加减号 `-`，比如 `-42`。

整型字面面可以使用下划线 `_` 来增加数字的可读性，下划线会被系统忽略，因此不会影响字面量的值。同样地，也可以在数字前加 `0`，并不会影响字面量的值。

除非特别指定，整型字面量的默认推导类型为 Swift 标准库类型中的 `Int`。Swift 标准库还定义了其他不同长度以及是否带符号的整数类型，请参考 [整数类型](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID323)。

> 整型字面量语法  
> *整型字面量* → [*二进制字面量*](#binary_literal)  
> *整型字面量* → [*八进制字面量*](#octal_literal)  
> *整型字面量* → [*十进制字面量*](#decimal_literal)  
> *整型字面量* → [*十六进制字面量*](#hexadecimal_literal)  
<a id="binary_literal"></a>
> *二进制字面量* → **0b** [*二进制数字*](#binary_digit) [*二进制字面量字符组*](#binary_literal_characters)<sub>可选</sub>  
> *二进制数字* → 数值 0 到 1  
> *二进制字面量字符* → [*二进制数字*](#binary_digit) | _    
> *二进制字面量字符组* → [*二进制字面量字符*](#binary_literal_character) [*二进制字面量字符组*](#binary_literal_characters)<sub>可选</sub>  
<a id="octal_literal"></a>    
> *八进制字面量* → **0o** [*八进字数字*](#octal_digit) [*八进制字符列表*](#octal_literal_characters)<sub>可选</sub>    
> *八进字数字* → 数值 0 到 7  
> *八进制字符* → [*八进字数字*](#octal_digit) | _    
> *八进制字符组* → [*八进制字符*](#octal_literal_character) [*八进制字符列表*](#octal_literal_characters)<sub>可选</sub>
<a id="decimal_literal"></a>    
> *十进制字面量* → [*十进制数字*](#decimal_digit) [*十进制字符组*](#decimal_literal_characters)<sub>可选</sub>    
> *十进制数字* → 数值 0 到 9  
> *十进制数字列表* → [*十进制数字*](#decimal_digit) [*十进制数字列表*](#decimal_digits)<sub>可选</sub>  
> *十进制字符* → [*十进制数字*](#decimal_digit) | _     
> *十进制字符列表* → [*十进制字符*](#decimal_literal_character) [*十进制字符列表*](#decimal_literal_characters)<sub>可选</sub> 
<a id="hexadecimal_literal"></a>    
> *十六进制字面量* → **0x** [*十六进制数字*](#hexadecimal_digit) [*十六进制字面量字符列表*](#hexadecimal_literal_characters)<sub>可选</sub>  
> *十六进制数字* → 数值 0 到 9, 字母 a 到 f, 或 A 到 F  
> *十六进制字符* → [*十六进制数字*](#hexadecimal_digit) | _     
> *十六进制字面量字符列表* → [*十六进制字符*](#hexadecimal_literal_character) [*十六进制字面量字符列表*](#hexadecimal_literal_characters)<sub>可选</sub>  

### 浮点型字面量

浮点型字面量（*floating-point literals*）表示未指定精度浮点数的值。

浮点型字面量默认用十进制表示（无前缀），也可以用十六进制表示（加前缀 `0x`）。

十进制浮点型字面量（*decimal floating-point literals*）由十进制数字串后跟小数部分或指数部分（或两者皆有）组成。十进制小数部分由小数点 `.` 后跟十进制数字串组成。指数部分由大写或小写字母 `e` 为前缀后跟十进制数字串组成，这串数字表示 `e` 之前的数量乘以 10 的几次方。例如：`1.25e2` 表示 `1.25 ⨉ 10^2`，也就是 `125.0`；同样，`1.25e－2` 表示 `1.25 ⨉ 10^－2`，也就是 `0.0125`。

十六进制浮点型字面量（*hexadecimal floating-point literals*）由前缀 `0x` 后跟可选的十六进制小数部分以及十六进制指数部分组成。十六进制小数部分由小数点后跟十六进制数字串组成。指数部分由大写或小写字母 `p` 为前缀后跟十进制数字串组成，这串数字表示 `p` 之前的数量乘以 2 的几次方。例如：`0xFp2` 表示 `15 ⨉ 2^2`，也就是 `60`；同样，`0xFp-2` 表示 `15 ⨉ 2^-2`，也就是 `3.75`。

负的浮点型字面量由一元运算符减号 `-` 和浮点型字面量组成，例如 `-42.5`。

浮点型字面量允许使用下划线 `_` 来增强数字的可读性，下划线会被系统忽略，因此不会影响字面量的值。同样地，也可以在数字前加 `0`，并不会影响字面量的值。

除非特别指定，浮点型字面量的默认推导类型为 Swift 标准库类型中的 `Double`，表示64位浮点数。Swift 标准库也定义了 `Float` 类型，表示32位浮点数。

> 浮点型字面量语法  
> *浮点数字面量* → [*十进制字面量*](#decimal_literal) [*十进制分数*](#decimal_fraction)<sub>可选</sub> [*十进制指数*](#decimal_exponent)<sub>可选</sub>      
> *浮点数字面量* → [*十六进制字面量*](#hexadecimal_literal) [*十六进制分数*](#hexadecimal_fraction)<sub>可选</sub> [*十六进制指数*](#hexadecimal_exponent)
<a id="decimal_fraction"></a>    
> *十进制分数* → **.** [*十进制字面量*](#decimal_literal)  
> *十进制指数* → [*浮点数e*](#floating_point_e) [*正负号*](#sign)<sub>可选</sub> [*十进制字面量*](#decimal_literal)  
<a id="hexadecimal_literal"></a>
> *十六进制分数* → **.** [*十六进制数字*](#hexadecimal_digit) [*十六进制字面量字符列表*](#hexadecimal_literal_characters)<sub>可选</sub>  
> *十六进制指数* → [*浮点数p*](#floating_point_p) [*正负号*](#sign)<sub>可选</sub> [*十进制字面量*](#decimal_literal)  
<a id="floating_point_e"></a>
> *浮点数e* → **e** | **E**  
> *浮点数p* → **p** | **P**  
> *正负号* → **+** | **-**  


### 字符串型字面量

字符串型字面量（*string literal*）由被包在双引号中的一串字符组成，形式如下：

```
"characters"
```

字符串型字面量中不能包含未转义的双引号 （`"`）、未转义的反斜线（`\`）、回车符（*carriage return*）或换行符（*line feed*）。

可以在字符串字面量中使用的转义特殊符号如下：

* 空字符（Null Character）`\0`
* 反斜线（Backslash）`\\`
* 水平制表符（Horizontal Tab）`\t`
* 换行符（Line Feed）`\n`
* 回车符（Carriage Return）`\r`
* 双引号（Double Quote）`\"`
* 单引号（Single Quote）`\'`
* Unicode标量 `\u{n}`，n为一到八位的十六进制数字

字符串字面量允许在反斜杠小括号 `\()` 中插入表达式的值。插入表达式（*interpolated expression*）不能包含未转义的双引号 `"`、未转义的反斜线 `\`、回车符或者换行符。表达式结果的类型必须在 *String* 类中有对应的初始化方法。

例如，以下所有字符串字面量的值都是相同的：

```
"1 2 3"
"1 2 \(3)"
"1 2 \(1 + 2)"
let x = 3; "1 2 \(x)"
```

字符串字面量的默认推导类型为 `String`。组成字符串的字符默认推导类型为 `Character`。更多有关 `String` 和 `Character` 的信息请参照 [字符串和字符](../chapter2/03_Strings_and_Characters.html)。

> 字符型字面量语法  
> *字符串字面量* → **"** [*引用文本*](#quoted_text)<sub>可选</sub> **"**  
<a id="quoted_text"></a>
> *引用文本* → [*引用文本条目*](#quoted_text_item) [*引用文本*](#quoted_text) <sub>可选</sub>  
> *引用文本条目* → [*转义字符*](#escaped_character)  
> *引用文本条目* → **\(** [*表达式*](./04_Expressions.html) **)**  
> *引用文本条目* → **除了"­, \­, U+000A, 或者 U+000D的所有Unicode的字符**  
> *转义字符* → **\0** | **\\** | **\t** | **\n** | **\r** | **\"** | **\'**     
> *转义字符* → **\u {** [*unicode标量数字*](#unicode_scalar_digits) **}** 
> *unicode标量数字* → 一到八位的十六进制数字

<a id="operators"></a>
## 运算符

Swift 标准库定义了许多可供使用的运算符，其中大部分在 [基础运算符](../chapter2/02_Basic_Operators.html) 和 [高级运算符](../chapter2/25_Advanced_Operators.html) 中进行了阐述。这一小节将描述哪些字符能用于自定义运算符。

自定义运算符可以由以下其中之一的 ASCII 字符 `/`、`=`、 `-`、`+`、`!`、`*`、`%`、`<`、`>`、`&`、`|`、`^`、`?` 以及 `~`, 或者后面语法中规定的任一个 Unicode 字符开始。在第一个字符之后，允许使用组合型 Unicode 字符。也可以使用两个或者多个的点号来自定义运算符（比如, `....`）。虽然可以自定义包含问号`?`的运算符，但是这个运算符不能只包含单独的一个问号。

	注意：
	以下这些标记 =, ->, //, /*, */, ., <（前缀运算符）, &, and ?, ?（中缀运算符）, >（后缀运算符）, ! 以及 ? 是被系统保留的。这些标记不能被重载，也不能用于自定义操作符。

运算符两侧的空白被用来区分该运算符是否为前缀运算符（*prefix operator*）、后缀运算符（*postfix operator*）或二元运算符（*binary operator*）。规则总结如下：

* 如果运算符两侧都有空白或两侧都无空白，将被看作二元运算符。例如：`a+b` 和 `a + b` 中的运算符 `+` 被看作二元运算符。
* 如果运算符只有左侧空白，将被看作前缀一元运算符。例如 `a ++b` 中的 `++` 被看作前缀一元运算符。
* 如果运算符只有右侧空白，将被看作后缀一元运算符。例如 `a++ b` 中的 `++` 被看作后缀一元运算符。
* 如果运算符左侧没有空白并紧跟 `.`，将被看作后缀一元运算符。例如 `a++.b` 中的 `++` 被看作后缀一元运算符（即上式被视为 `a++ .b` 而非 `a ++ .b`）。

鉴于这些规则，运算符前的字符 `(`、`[` 和 `{` ；运算符后的字符 `)`、`]` 和 `}` 以及字符 `,`、`;` 和 `:` 都被视为空白。

以上规则需注意一点，如果预定义运算符 `!` 或 `?` 左侧没有空白，则不管右侧是否有空白都将被看作后缀运算符。如果将 `?` 用作可选链（*optional-chaining*）操作符，左侧必须无空白。如果用于条件运算符 `? :`，必须两侧都有空白。

在某些特定的构造中 ，以 `<` 或 `>` 开头的运算符会被分离成两个或多个标记，剩余部分以同样的方式会被再次分离。因此，在 `Dictionary<String, Array<Int>>` 中没有必要添加空白来消除闭合字符 `>` 的歧义。在这个例子中， 闭合字符 `>` 不会被视为单独的标记，因而不会被误解析为 `>>` 运算符的一部分。

要学习如何自定义运算符，请参考 [自定义操作符](../chapter2/25_Advanced_Operators.html#custom_operators) 和 [运算符声明](./05_Declarations.html#operator_declaration)。要学习如何重载运算符，请参考 [运算符方法](../chapter2/25_Advanced_Operators.html#operator_functions)。

> 运算符语法语法  
> *运算符* → [*头部运算符*](#operator_head) [*运算符字符组*](#operator_characters)<sub>可选</sub>  
> *运算符* → [*头部点运算符*](#dot_operator_head) [*点运算符字符组*](#dot_operator_characters)<sub>可选</sub>    
<a id="operator_head"></a>    
> *头部运算符* → **/** | **=** | **+** | **!** |**\*** | **%** |**<** | **>** |**&** | **|** |**/** | **~** | **?** |
> *头部运算符* → U+00A1–U+00A7    
> *头部运算符* → U+00A9 or U+00AB    
> *头部运算符* → U+00AC or U+00AE    
> *头部运算符* → U+00B0–U+00B1, U+00B6, U+00BB, U+00BF, U+00D7, or U+00F7    
> *头部运算符* → U+2016–U+2017 or U+2020–U+2027    
> *头部运算符* → U+2030–U+203E    
> *头部运算符* → U+2041–U+2053    
> *头部运算符* → U+2055–U+205E    
> *头部运算符* → U+2190–U+23FF    
> *头部运算符* → U+2500–U+2775    
> *头部运算符* → U+2794–U+2BFF    
> *头部运算符* → U+2E00–U+2E7F    
> *头部运算符* → U+3001–U+3003    
> *头部运算符* → U+3008–U+3030 
<a id="operator_character"></a>       
> *运算符字符* → [*头部运算符*](#operator_head)    
> *运算符字符* → U+0300–U+036F    
> *运算符字符* → U+1DC0–U+1DFF    
> *运算符字符* → U+20D0–U+20FF    
> *运算符字符* → U+FE00–U+FE0F    
> *运算符字符* → U+FE20–U+FE2F    
> *运算符字符* → U+E0100–U+E01EF    
<a id="operator_characters"></a>    
> *运算符字符组* → [*运算符字符*](#operator_character) [*运算符字符组*]    (#operator_characters)<sub>可选</sub>    
<a id="dot_operator_head"></a>    
> *头部点运算符* → **..**    
> *头部点运算符字符* → . | [*运算符字符*](#operator_character)    
> *头部点运算符字符组* → [*点运算符字符*](#dot_operator_character) [*点运算符字符组*](#dot_operator_characters)<sub>可选</sub>
 
> *二元运算符* → [*运算符*](#operator)  
> *前置运算符* → [*运算符*](#operator)  
> *后置运算符* → [*运算符*](#operator)  
