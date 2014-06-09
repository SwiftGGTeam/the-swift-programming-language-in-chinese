# 语法结构

本页包含内容：

- 空白与注释（*Whitespace and Comments*）
- 标识符（*Identifiers*）
- 关键字（*Keywords*）
- 字面值（*Literals*）
- 操作符（*Operators*）

Swift 的“语法结构（*lexical structure*）”描述了如何在该语言中用字符序列构建合法标记，组成该语言中最底层的代码快，并在之后的章节中用于描述语言的其他部分。

通常，标记在随后介绍的语法约束下，从 Swift 源文件的输入文本中提取可能的最长子串生成。这种方法称为“最长匹配项（*longest match*）”，或者“最大适合”（*maximal munch*）。

## 空白与注释

空白（*whitespace*）有两个用途：分隔源文件中的标记和区分操作符属于前缀还是后缀，（参见 [操作符](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_871)）在其他情况下则会被忽略。以下的字符会被当作空白：空格（*space*）（U+0020）、换行符（*line feed*）（U+000A）、回车符（*carriage return*）（U+000D）、水平 tab（*horizontal tab*）（U+0009）、垂直 tab（*vertical tab*）（U+000B）、换页符（*form feed*）（U+000C）以及空（*null*）（U+0000）。

注释（*comments*）被编译器当作空白处理。单行注释由 `//` 开始直到该行结束。多行注释由 `/*` 开始，以 `*/` 结束。可以嵌套注释，但注意注释标记必须匹配。

## 标识符

标识符（*identifiers*）可以由以下的字符开始：`A` 到 `Z` 的大写或者小写字母、下划线 `_`、基本多语言面（*Basic Multilingual Plane*）中的 Unicode 非组合字符以及基本多语言面以外的非专用区（*Private Use Area*）字符。首字符之后，标识符允许使用数字和 Unicode 字符组合。

使用保留字（*reserved word*）作为标识符，需要在其前后增加反引号 <code>\`</code>。例如，<code>class</code> 不是合法的标识符，但可以使用 <code>\`class\`</code>。反引号不属于标识符的一部分，<code>\`x\`</code> 和 `x` 表示同一标识符。

闭包（*closure*）中如果没有明确指定参数名称，参数将被隐式命名为 <code>$0</code>、<code>$1</code>、<code>$2</code>... 这些命名在闭包作用域内是合法的标识符。

> 标识符语法
> 
> *identifier* → [identifier-head­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-head) [identifier-characters](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-characters)­ *opt*
> 
> *identifier* → \`­ [identifier-head­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-head) [identifier-characters­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-characters) *opt­* \`­
> 
> *identifier* → [implicit-parameter-name­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/implicit-parameter-name)
> 
> *identifier-list* → [identifier­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) | [identifier­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) , [­identifier-list](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-list)­
> 
> *identifier-head* → A 到 Z 大写或小写字母
> 
> *identifier-head* → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, 或 U+00B7–U+00BA
> 
> *identifier-head* → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, 或 U+00F8–U+00FF
> 
> *identifier-head* → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, 或 U+180F–U+1DBF
> 
> *identifier-head* → U+1E00–U+1FFF
> 
> *identifier-head* → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, 或 U+2060–U+206F
> 
> *identifier-head* → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, 或 U+2776–U+2793
> 
> *identifier-head* → U+2C00–U+2DFF 或 U+2E80–U+2FFF
> 
> *identifier-head* → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, 或 U+3040–U+D7FF
> 
> *identifier-head* → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, 或 U+FE30–U+FE44
> 
> *identifier-head* → U+FE47–U+FFFD
> 
> *identifier-head* → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, 或 U+40000–U+4FFFD
> 
> *identifier-head* → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, 或 U+80000–U+8FFFD
> 
> *identifier-head* → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, 或 U+C0000–U+CFFFD
> 
> *identifier-head* → U+D0000–U+DFFFD 或 U+E0000–U+EFFFD
> 
> *identifier-character* → 数字 0 到 9
> 
> *identifier-character* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F
> 
> *identifier-character* → [identifier-head­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-head)
> 
> *identifier-characters* → [identifier-character](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-character) [­identifier-characters­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-characters) *opt­*
> 
> *implicit-parameter-name* → **$­** [decimal-digits­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digits)

## 关键字

被保留的关键字（*keywords*）不允许用作标识符，除非被反引号转义，参见 [标识符](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_796)。

* **用作声明的关键字：**class、deinit、enum、extension、func、import、init、let、protocol、static、struct、subscript、typealias、var
* **用作语句的关键字：**break、case、continue、default、do、else、fallthrough、if、in、for、return、switch、where、while
* **用作表达和类型的关键字：**as、dynamicType、is、new、super、self、Self、Type、\_\_COLUMN\_\_、\_\_FILE\_\_、\_\_FUNCTION\_\_、\_\_LINE\_\_
* **特定上下文中被保留的关键字：**associativity、didSet、get、infix、inout、left、mutating、none、nonmutating、operator、override、postfix、precedence、prefix、right、set、unowned、unowned(safe)、unowned(unsafe)、weak、willSet，这些关键字在特定上下文之外可以被用于标识符。

## 字面值

字面值表示整型、浮点型数字或文本类型的值，举例如下：

	42                 // 整数字面值
	3.14159            // 浮点数字面值
	"Hello, world!"    // 文本字面值

> 字面值语法
> 
> *literal* → [integer-literal­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/integer-literal) | [floating-point-literal](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/floating-point-literal)­ | [string-literal­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/string-literal)

### 整数字面值
### 浮点数字面值
### 文本字面值

## 操作符


