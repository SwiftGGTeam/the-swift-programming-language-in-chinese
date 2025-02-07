# 词法结构

使用语法的最低层级组件。

Swift 的 *词法结构* 描述了哪些字符序列构成了语言中的合法标记（tokens）。这些合法标记构成了语言的最低层级构建块，并在后续章节中用于描述语言的其他部分。一个标记可以由标识符、关键字、标点符号、字面量或运算符组成。

在大多数情况下，这些标记是从 Swift 源文件的字符中生成的，生成过程考虑了输入文本中最长的可能子字符串，并受以下语法规则的约束。这种行为策略被称为 *最长匹配策略（longest match）* 或 *最大吞噬策略（maximal munch）*。

## 空白和注释

空白字符有两个用途：在源文件中分隔标记，并区分前缀、后缀和中缀运算符（参见 <doc:LexicalStructure#运算符>），除此之外，空白字符会被忽略。以下字符被视为空白字符：空格 (U+0020)、换行符 (U+000A)、回车符 (U+000D)、水平制表符 (U+0009)、垂直制表符 (U+000B)、换页符 (U+000C) 和空字符 (U+0000)。

<!--
  Whitespace characters are listed roughly from
  most salient/common to least,
  not in order of Unicode scalar value.
-->

编译器将注释视为空白字符。单行注释以 `//` 开头，并持续到换行符 (U+000A) 或回车符 (U+000D)。多行注释以 `/*` 开头，以 `*/` 结束。多行注释可以嵌套，但注释符号必须头尾匹配。

注释中可以包含额外的格式和标记，如 [标记格式参考](https://developer.apple.com/library/content/documentation/Xcode/Reference/xcode_markup_formatting_ref/index.html) 中所述。

> 空白字符的语法:
>
> *whitespace* → *whitespace-item* *whitespace*_?_ \
> *whitespace-item* → *line-break* \
> *whitespace-item* → *inline-space* \
> *whitespace-item* → *comment* \
> *whitespace-item* → *multiline-comment* \
> *whitespace-item* → U+0000、U+000B 或 U+000C
>
> *line-break* → U+000A \
> *line-break* → U+000D \
> *line-break* → U+000D 后跟 U+000A
>
> *inline-spaces* → *inline-space* *inline-spaces*_?_ \
> *inline-space* → U+0009 或 U+0020
>
> *comment* → **`//`** *comment-text* *line-break* \
> *multiline-comment* → **`/*`** *multiline-comment-text* **`*/`**
>
> *comment-text* → *comment-text-item* *comment-text*_?_ \
> *comment-text-item* → 除 U+000A 或 U+000D 之外的任意 Unicode 标量值
>
> *multiline-comment-text* → *multiline-comment-text-item* *multiline-comment-text*_?_ \
> *multiline-comment-text-item* → *multiline-comment* \
> *multiline-comment-text-item* → *comment-text-item* \
> *multiline-comment-text-item* → 除 **`/*`** 或 **`*/`** 之外的任意 Unicode 标量值

## 标识符

*标识符* 以大写或小写字母 A 到 Z、下划线 (`_`)、基本多语言平面（Basic Multilingual Plane）的非组合字母数字 Unicode 字符（Noncombining Alphanumeric Unicode Character），或基本多语言平面之外但不在私用区（Private Use Area）的字符开头。在第一个字符之后，还允许使用数字和组合 Unicode 字符（Combining Unicode Character）。

即使声明具有 `public` 访问级别修饰符，也应将以下内容视为仅内部使用：以下划线开头的标识符、第一个参数标签以下划线开头的下标操作，以及第一个参数标签以下划线开头的构造函数。这个约定允许框架作者以此方式标记某个 API 的一部分内容，以防止客户端与之交互或依赖，尽管某些限制要求这些声明是公开可访问的。此外，以两个下划线开头的标识符需保留给 Swift 编译器和标准库使用。

要将保留字用作标识符，可以在其前后加上反引号（\`）。例如，`class` 不是一个合法的标识符，但 `` `class` `` 是合法的。反引号不被视为标识符的一部分；`` `x` `` 和 `x` 具有相同的指代含义。

<!--
The paragraph above produces a link-resolution warning
because of a known issue with ` in code voice.

https://github.com/apple/swift-book/issues/71
https://github.com/apple/swift-markdown/issues/93
-->

在没有显式参数名称的闭包中，参数会被隐式命名为 `$0`、`$1`、`$2` 等。这些名称在闭包的范围内是合法的标识符。

编译器会为具有属性包装器投射（Property Wrapper Projection）的属性合成以美元符号 (`$`) 开头的标识符。你的代码可以与这些标识符交互，但你不能声明带有该前缀的标识符。有关更多信息，请参阅 <doc:Attributes> 章节的 <doc:Attributes#propertyWrapper> 部分。

<!--
  The cross reference above includes both the section and chapter because,
  even though "propertyWrapper" is the title of the section,
  the section name isn't title case so it doesn't necessarily look like a title.
-->

<!--
The formal grammar below for 'identifier'
produces a link-resolution warning
because of a known issue with ` in code voice.

https://github.com/apple/swift-book/issues/71
https://github.com/apple/swift-markdown/issues/93
-->

> 标识符的语法:
>
> *identifier* → *identifier-head* *identifier-characters*_?_ \
> *identifier* → **`` ` ``** *identifier-head* *identifier-characters*_?_ **`` ` ``** \
> *identifier* → *implicit-parameter-name* \
> *identifier* → *property-wrapper-projection* \
> *identifier-list* → *identifier* | *identifier* **`,`** *identifier-list*
>
> *identifier-head* → 大写或小写字母 A 到 Z \
> *identifier-head* → **`_`** \
> *identifier-head* → U+00A8、U+00AA、U+00AD、U+00AF、U+00B2–U+00B5 或 U+00B7–U+00BA \
> *identifier-head* → U+00BC–U+00BE、U+00C0–U+00D6、U+00D8–U+00F6 或 U+00F8–U+00FF \
> *identifier-head* → U+0100–U+02FF、U+0370–U+167F、U+1681–U+180D 或 U+180F–U+1DBF \
> *identifier-head* → U+1E00–U+1FFF \
> *identifier-head* → U+200B–U+200D、U+202A–U+202E、U+203F–U+2040、U+2054 或 U+2060–U+206F \
> *identifier-head* → U+2070–U+20CF、U+2100–U+218F、U+2460–U+24FF 或 U+2776–U+2793 \
> *identifier-head* → U+2C00–U+2DFF 或 U+2E80–U+2FFF \
> *identifier-head* → U+3004–U+3007、U+3021–U+302F、U+3031–U+303F 或 U+3040–U+D7FF \
> *identifier-head* → U+F900–U+FD3D、U+FD40–U+FDCF、U+FDF0–U+FE1F 或 U+FE30–U+FE44 \
> *identifier-head* → U+FE47–U+FFFD \
> *identifier-head* → U+10000–U+1FFFD、U+20000–U+2FFFD、U+30000–U+3FFFD 或 U+40000–U+4FFFD \
> *identifier-head* → U+50000–U+5FFFD、U+60000–U+6FFFD、U+70000–U+7FFFD 或 U+80000–U+8FFFD \
> *identifier-head* → U+90000–U+9FFFD、U+A0000–U+AFFFD、U+B0000–U+BFFFD 或 U+C0000–U+CFFFD \
> *identifier-head* → U+D0000–U+DFFFD 或 U+E0000–U+EFFFD
>
> *identifier-character* → 数字 0 到 9 \
> *identifier-character* → U+0300–U+036F、U+1DC0–U+1DFF、U+20D0–U+20FF 或 U+FE20–U+FE2F \
> *identifier-character* → *identifier-head* \
> *identifier-characters* → *identifier-character* *identifier-characters*_?_
>
> *implicit-parameter-name* → **`$`** *decimal-digits* \
> *property-wrapper-projection* → **`$`** *identifier-characters*

## 关键字和标点符号

以下关键字是保留字，不能用作标识符，除非用反引号将它们转义，如上文 <doc:LexicalStructure#标识符> 中所述。除了 `inout`、`var` 和 `let` 之外，其他关键字可以作为函数声明或函数调用中的参数名称，而无需使用反引号进行转义。当成员名称与关键字相同时，引用该成员时不需要使用反引号进行转义，除非在引用成员与使用关键字之间存在歧义——例如，`self`、`Type` 和 `Protocol` 在显式成员表达式中具有特殊含义，因此在这种情况下必须用反引号将它们转义。

<!--
  - test: `keywords-without-backticks`

  ```swifttest
  -> func f(x: Int, in y: Int) {
        print(x+y)
     }
  ```
-->

<!--
  - test: `var-requires-backticks`

  ```swifttest
  -> func g(`var` x: Int) {}
  -> func f(var x: Int) {}
  !$ warning: 'var' in this position is interpreted as an argument label
  !! func f(var x: Int) {}
  !!        ^~~
  !!        `var`
  ```
-->

<!--
  - test: `let-requires-backticks`

  ```swifttest
  -> func g(`let` x: Int) {}
  -> func f(let x: Int) {}
  !$ warning: 'let' in this position is interpreted as an argument label
  !! func f(let x: Int) {}
  !!        ^~~
  !!        `let`
  ```
-->

<!--
  - test: `inout-requires-backticks`

  ```swifttest
  -> func g(`inout` x: Int) {}
  -> func f(inout x: Int) {}
  !$ error: 'inout' before a parameter name is not allowed, place it before the parameter type instead
  !! func f(inout x: Int) {}
  !!        ^~~~~
  !!                 inout
  ```
-->

<!--
  NOTE: This list of language keywords and punctuation
  is derived from the file "swift/include/swift/Parse/Tokens.def"
  and from "utils/gyb_syntax_support/Token.py",
  which generates the TokenKinds.def file.

  Last updated at Swift commit 2f1987567f5, for Swift 5.4.
-->

- 用于声明的关键字：`associatedtype`、`borrowing`、`class`、`consuming`、`deinit`、`enum`、`extension`、`fileprivate`、`func`、`import`、`init`、`inout`、`internal`、`let`、`nonisolated`、`open`、`operator`、`private`、`precedencegroup`、`protocol`、`public`、`rethrows`、`static`、`struct`、`subscript`、`typealias` 和 `var`。

<!--
  Token.py doesn't include 'open' but DeclNodes.py does.
-->

- 用于语句的关键字：`break`、`case`、`catch`、`continue`、`default`、`defer`、`do`、`else`、`fallthrough`、`for`、`guard`、`if`、`in`、`repeat`、`return`、`throw`、`switch`、`where` 和 `while`。
- 用于表达式和类型的关键字：`Any`、`as`、`await`、`catch`、`false`、`is`、`nil`、`rethrows`、`self`、`Self`、`super`、`throw`、`throws`、`true` 和 `try`。
- 用于模式的关键字：`_`。
- 以井号 (`#`) 开头的关键字：`#available`、`#colorLiteral`、`#else`、`#elseif`、`#endif`、`#fileLiteral`、`#if`、`#imageLiteral`、`#keyPath`、`#selector`、`#sourceLocation`、`#unavailable`。

> 注意:
> 在 Swift 5.9 之前，以下关键字是保留字：`#column`、`#dsohandle`、`#error`、`#fileID`、`#filePath`、`#file`、`#function`、`#line` 和 `#warning`。  
> 它们现在已经在 Swift 标准库中实现为宏：[`column`](https://developer.apple.com/documentation/swift/column())、[`dsohandle`](https://developer.apple.com/documentation/swift/dsohandle())、[`error(_:)`](https://developer.apple.com/documentation/swift/error(_:))、[`fileID`](https://developer.apple.com/documentation/swift/fileID())、[`filePath`](https://developer.apple.com/documentation/swift/filePath())、[`file`](https://developer.apple.com/documentation/swift/file())、[`function`](https://developer.apple.com/documentation/swift/function())、[`line`](https://developer.apple.com/documentation/swift/line()) 以及 [`warning(_:)`](https://developer.apple.com/documentation/swift/warning(_:))。

<!--
  Token.py includes #assert,
  which looks like it's part of an experimental feature
  based on the pound_assert_disabled diagnostic's error message:
  #assert is an experimental feature that is currently disabled
-->

<!--
  Token.py includes #fileID,
  which looks like it's part of a future feature related to
  -enable-experimental-concise-pound-file (see also Swift commit 0e569f5d9e66)
-->

<!--
  Token.py includes 'yield' as a keyword,
  which looks like it's related to a future feature around memory ownership.
-->

- 在特定上下文中保留的关键字：`associativity`、`async`,`convenience`、`didSet`、`dynamic`、`final`、`get`、`indirect`、`infix`、`lazy`、`left`、`mutating`、`none`、`nonmutating`、`optional`、`override`、`package`、`postfix`、`precedence`、`prefix`、`Protocol`、`required`、`right`、`set`、`some`、`Type`、`unowned`、`weak` 和 `willSet`。除了在语法中的特定上下文出现之外，它们可以被当作标识符使用。

<!--
  NOTE: The list of context-sensitive keywords above
  is derived from the file "swift/include/swift/AST/Attr.def"
  where they're marked CONTEXTUAL_SIMPLE_DECL_ATTR.
  However, not all context-sensitive keywords appear there;
-->

以下符号被保留为标点符号，不能用作自定义运算符：`(`、`)`、`{`、`}`、`[`、`]`、`.`、`,`、`:`、`;`、`=`、`@`、`#`、`&`（作为前缀运算符）、`->`、`` ` ``、`?` 和 `!`（作为后缀运算符）。

## 字面量

*字面量* 是某种类型值的源代码表示形式，例如数字或字符串。

以下是一些字面量的示例：

```swift
42               // 整数字面量
3.14159          // 浮点数字面量
"Hello, world!"  // 字符串字面量
/Hello, .*/      // 正则表达式字面量
true             // 布尔字面量
```

<!--
  - test: `basic-literals`

  ```swifttest
  >> let r0 =
  -> 42               // Integer literal
  >> let r1 =
  -> 3.14159          // Floating-point literal
  >> let r2 =
  -> "Hello, world!"  // String literal
  >> let r4 =
  -> /Hello, .*/      // Regular expression literal
  >> let r3 =
  -> true             // Boolean literal
  >> for x in [r0, r1, r2, r3] as [Any] { print(type(of: x)) }
  << Int
  << Double
  << String
  << Bool
  ```
-->

<!--
  Refactor the above if possible to avoid using bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

字面量本身没有类型。相反，字面量被解析为具有无限精度，Swift 的类型推断机制会尝试为字面量推断出一个类型。例如，在声明 `let x: Int8 = 42` 中，Swift 使用显式的类型注解（`: Int8`）来推断整数字面量 `42` 的类型为 `Int8`。如果没有适当的类型信息可用，Swift 会推断该字面量的类型为 Swift 标准库中定义的默认字面量类型之一，如下表所示。在为字面量值指定类型注解时，注解的类型必须是可以从该字面量值实例化的类型。也就是说，该类型必须遵循下表中列出的 Swift 标准库协议。

| 字面量 | 默认类型 | 协议 |
| ----- | ------ | ---- |
| 整数   | `Int`  | `ExpressibleByIntegerLiteral` |
| 浮点数 | `Double` | `ExpressibleByFloatLiteral` |
| 字符串 | `String` | `ExpressibleByStringLiteral`，对于只包含单个 Unicode 标量的字符串字面量，使用 `ExpressibleByUnicodeScalarLiteral`，对于只包含单个扩展字形簇（extended grapheme cluster）的字符串字面量，使用 `ExpressibleByExtendedGraphemeClusterLiteral` |
| 正则表达式 | `Regex` | 无 |
| 布尔值  | `Bool` | `ExpressibleByBooleanLiteral` |

例如，在声明 `let str = "Hello, world"` 中，字符串字面量 `"Hello, world"` 的默认推断类型是 `String`。同样，`Int8` 遵循 `ExpressibleByIntegerLiteral` 协议，因此可以在声明 `let x: Int8 = 42` 中用于整数字面量 `42` 的类型注解。

<!--
  The list of ExpressibleBy... protocols above also appears in Declarations_EnumerationsWithRawCaseValues.
  ExpressibleByNilLiteral is left out of the list because conformance to it isn't recommended.
  There is no protocol for regex literal in the list because the stdlib intentionally omits that.
-->

> 字面量的语法:
>
> *literal* → *numeric-literal* | *string-literal* | *regular-expression-literal* | *boolean-literal* | *nil-literal*
>
> *numeric-literal* → **`-`**_?_ *integer-literal* | **`-`**_?_ *floating-point-literal* \
> *boolean-literal* → **`true`** | **`false`** \
> *nil-literal* → **`nil`**

### 整数字面量

*整数字面量* 表示具有未指定精度的整数值。默认情况下，整数字面量以十进制表示；你可以使用前缀指定其他进制。二进制字面量以 `0b` 开头，八进制字面量以 `0o` 开头，十六进制字面量以 `0x` 开头。

十进制字面量包含数字 `0` 到 `9`。二进制字面量包含 `0` 和 `1`，八进制字面量包含 `0` 到 `7`，而十六进制字面量则包含 `0` 到 `9` 以及大写或小写的 `A` 到 `F`。

负整数字面量通过在整数字面量前加上负号 (`-`) 来表示，如 `-42`。

为了提高可读性，数字之间允许使用下划线 (`_`)，但它们会被忽略，因此不会影响字面量的值。整数字面量可以以前导零 (`0`) 开头，但这些零同样会被忽略，不会影响字面量的进制或值。

除非另有说明，否则整数字面量的默认推断类型是 Swift 标准库类型 `Int`。Swift 标准库还定义了用于表示各种大小的有符号和无符号整数的类型，详细内容请参阅 <doc:TheBasics#整数>。

<!--
  TR: The prose assumes underscores only belong between digits.
  Is there a reason to allow them at the end of a literal?
  Java and Ruby both require underscores to be between digits.
  Also, are adjacent underscores meant to be allowed, like 5__000?
  (REPL supports them as of swift-1.21 but it seems odd.)
-->

<!--
  NOTE: Updated the syntax-grammar to reflect [Contributor 7746]'s comment in
  <rdar://problem/15181997> Teach the compiler about a concept of negative integer literals.
  This feels very strange from a grammatical point of view.
  Update: This is a parser hack, not a lexer hack. Therefore,
  it's not part of the grammar for integer literal, contrary to [Contributor 2562]'s claim.
  (Doug confirmed this, 4/2/2014.)
-->

> 整数字面量的语法:
>
> *integer-literal* → *binary-literal* \
> *integer-literal* → *octal-literal* \
> *integer-literal* → *decimal-literal* \
> *integer-literal* → *hexadecimal-literal*
>
> *binary-literal* → **`0b`** *binary-digit* *binary-literal-characters*_?_ \
> *binary-digit* → 数字 0 或 1 \
> *binary-literal-character* → *binary-digit* | **`_`** \
> *binary-literal-characters* → *binary-literal-character* *binary-literal-characters*_?_
>
> *octal-literal* → **`0o`** *octal-digit* *octal-literal-characters*_?_ \
> *octal-digit* → 数字 0 到 7 \
> *octal-literal-character* → *octal-digit* | **`_`** \
> *octal-literal-characters* → *octal-literal-character* *octal-literal-characters*_?_
>
> *decimal-literal* → *decimal-digit* *decimal-literal-characters*_?_ \
> *decimal-digit* → 数字 0 到 9 \
> *decimal-digits* → *decimal-digit* *decimal-digits*_?_ \
> *decimal-literal-character* → *decimal-digit* | **`_`** \
> *decimal-literal-characters* → *decimal-literal-character* *decimal-literal-characters*_?_
>
> *hexadecimal-literal* → **`0x`** *hexadecimal-digit* *hexadecimal-literal-characters*_?_ \
> *hexadecimal-digit* → 数字 0 到 7, 字母 a 到 f 或字母 A 到 F \
> *hexadecimal-literal-character* → *hexadecimal-digit* | **`_`** \
> *hexadecimal-literal-characters* → *hexadecimal-literal-character* *hexadecimal-literal-characters*_?_

### 浮点数字面量

*浮点数字面量* 表示具有未指定精度的浮点值。

默认情况下，浮点数字面量以十进制形式表示（无前缀），但也可以以十六进制形式表示（带有 `0x` 前缀）。

十进制浮点数字面量由一串十进制数字序列组成，后面可以跟一个十进制小数部分、十进制指数部分或两者兼有。十进制小数部分由一个小数点 (`.`) 和紧随其后的一串十进制数字序列组成。指数部分以大写或小写的 `e` 为前缀，后面跟一串十进制数字，表示在 `e` 前面的值要乘以的 10 的幂。例如，`1.25e2` 表示 1.25 x 10²，结果为 `125.0`。类似地，`1.25e-2` 表示 1.25 x 10⁻²，结果为 `0.0125`。

十六进制浮点数字面量由一个 `0x` 前缀、一个可选的十六进制小数部分和一个十六进制指数部分组成。十六进制小数部分由一个小数点和紧随其后的一串十六进制数字序列组成。指数部分以大写或小写的 `p` 为前缀，后面跟一串十进制数字，表示在 `p` 前面的值要乘以的 2 的幂。例如，`0xFp2` 表示 15 x 2²，结果为 `60`。类似地，`0xFp-2` 表示 15 x 2⁻²，结果为 `3.75`。

负浮点数字面量通过在浮点数字面量前加上负号 (`-`) 来表示，如 `-42.5`。

为了提高可读性，数字之间允许使用下划线 (`_`)，但它们会被忽略，因此不会影响字面量的值。浮点数字面量可以以前导零 (`0`) 开头，但这些零同样会被忽略，不会影响字面量的进制或值。

除非另有说明，否则浮点数字面量的默认推断类型是 Swift 标准库类型 `Double`，它表示 64 位浮点数。Swift 标准库还定义了 `Float` 类型，它表示 32 位浮点数。

> 浮点数字面量的语法:
>
> *floating-point-literal* → *decimal-literal* *decimal-fraction*_?_ *decimal-exponent*_?_ \
> *floating-point-literal* → *hexadecimal-literal* *hexadecimal-fraction*_?_ *hexadecimal-exponent*
>
> *decimal-fraction* → **`.`** *decimal-literal* \
> *decimal-exponent* → *floating-point-e* *sign*_?_ *decimal-literal*
>
> *hexadecimal-fraction* → **`.`** *hexadecimal-digit* *hexadecimal-literal-characters*_?_ \
> *hexadecimal-exponent* → *floating-point-p* *sign*_?_ *decimal-literal*
>
> *floating-point-e* → **`e`** | **`E`** \
> *floating-point-p* → **`p`** | **`P`** \
> *sign* → **`+`** | **`-`**

### 字符串字面量

字符串字面量是由引号包围的一串字符序列。单行字符串字面量由双引号包围，其形式如下：

```swift
"<#characters#>"
```

字符串字面量不能包含未转义的双引号（`"`）、未转义的反斜杠（`\`）、回车符或换行符。

多行字符串字面量由三个双引号包围，其形式如下：

```swift
"""
<#characters#>
"""
```

与单行字符串字面量不同，多行字符串字面量可以包含未转义的双引号（`"`）、回车符和换行符。但它不能包含连续三个未转义的双引号。

开启多行字符串字面量的 `"""` 之后的换行符不属于字符串的一部分。结束字面量的 `"""` 之前的换行符也不属于字符串的一部分。要创建一个以换行符开始或结束的多行字符串字面量，请在其第一行或最后一行写一个空行。

多行字符串字面量可以使用任意组合的空格和制表符进行缩进，这些缩进不会包含在字符串中。结束字面量的 `"""` 确定了缩进的长度：字面量中的每一个非空行开头的缩进必须与结束 `"""` 之前的缩进完全相同。制表符和空格之间不会有相互转换。在该缩进之后可以包含额外的空格和制表符，这些空格和制表符会出现在字符串中。

多行字符串字面量中的换行符会被标准化为使用行分隔符。即使源文件中包含混合的回车符和换行符，字符串中的所有换行符也会变为一致。

在多行字符串字面量中，在行末尾写一个反斜杠 (`\`) 会将其后的换行符从字符串中忽略。任何在反斜杠和换行符之间的空白也会被忽略。你可以使用这种语法在源代码中硬折叠一个多行字符串字面量，而不会改变结果字符串的值。

特殊字符可以通过以下转义序列包含在单行和多行字符串字面量中：

- 空字符 (`\0`)
- 反斜杠 (`\\`)
- 水平制表符 (`\t`)
- 换行符 (`\n`)
- 回车符 (`\r`)
- 双引号 (`\"`)
- 单引号 (`\'`)
- Unicode 标量 (`\u{`*n*`}`)，其中 *n* 是一个包含一到八位数字的十六进制数字

<!--
  The behavior of \n and \r isn't the same as C.
  We specify exactly what those escapes mean.
  The behavior on C is platform dependent --
  in text mode, \n maps to the platform's line separator
  which could be CR or LF or CRLF.
-->

表达式的值可以通过在反斜杠 (`\`) 后面加上用括号括起来的表达式插入到字符串字面量中。插值表达式可以包含字符串字面量，但不能包含未转义的反斜杠、回车符或换行符。

例如，以下所有字符串字面量具有相同的值：

```swift
"1 2 3"
"1 2 \("3")"
"1 2 \(3)"
"1 2 \(1 + 2)"
let x = 3; "1 2 \(x)"
```

<!--
  - test: `string-literals`

  ```swifttest
  >> let r0 =
  -> "1 2 3"
  >> let r1 =
  -> "1 2 \("3")"
  >> assert(r0 == r1)
  >> let r2 =
  -> "1 2 \(3)"
  >> assert(r0 == r2)
  >> let r3 =
  -> "1 2 \(1 + 2)"
  >> assert(r0 == r3)
  -> let x = 3; "1 2 \(x)"
  >> assert(r0 == "1 2 \(x)")
  !$ warning: string literal is unused
  !! let x = 3; "1 2 \(x)"
  !!            ^~~~~~~~~~
  ```
-->

<!--
  Refactor the above if possible to avoid using bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

由扩展定界符包围的字符串是由引号和一组或多组配对的井号（`#`）包围的一串字符序列。由扩展定界符包围的字符串具有以下形式：

```swift
#"<#characters#>"#

#"""
<#characters#>
"""#
```

由扩展定界符包围的字符串中的特殊字符在结果字符串中显示为普通字符而不是特殊字符。你可以使用扩展定界符来创建包含通常会产生特殊效果字符的字符串，这些特殊效果比如有生成字符串插值、开启转义序列或终止字符串。

以下示例展示了一个字符串字面量和一个由扩展定界符包围的字符串，它们创建了等价的字符串值：

```swift
let string = #"\(x) \ " \u{2603}"#
let escaped = "\\(x) \\ \" \\u{2603}"
print(string)
// 打印 "\(x) \ " \u{2603}"
print(string == escaped)
// 打印 "true"
```

<!--
  - test: `extended-string-delimiters`

  ```swifttest
  -> let string = #"\(x) \ " \u{2603}"#
  -> let escaped = "\\(x) \\ \" \\u{2603}"
  -> print(string)
  <- \(x) \ " \u{2603}
  -> print(string == escaped)
  <- true
  ```
-->

如果你使用多个井号来形成由扩展定界符包围的字符串，不要在井号之间放置空格：

<!--
  - test: `extended-string-delimiters`

  ```swifttest
  -> print(###"Line 1\###nLine 2"###) // OK
  << Line 1
  << Line 2
  ```
-->

```swift
print(###"Line 1\###nLine 2"###) // 正确
print(# # #"Line 1\# # #nLine 2"# # #) // 错误
```

<!--
  - test: `extended-string-delimiters-err`

  ```swifttest
  -> print(###"Line 1\###nLine 2"###) // OK
  -> print(# # #"Line 1\# # #nLine 2"# # #) // Error
  !$ error: expected expression in list of expressions
  !! print(# # #"Line 1\# # #nLine 2"# # #) // Error
  !! ^
  !$ error: invalid escape sequence in literal
  !! print(# # #"Line 1\# # #nLine 2"# # #) // Error
  !! ^
  ```
-->

使用扩展定界符创建的多行字符串字面量具有与常规多行字符串字面量相同的缩进要求。

默认情况下，字符串字面量的推断类型为 `String`。

有关 `String` 类型的更多信息，请参见 <doc:StringsAndCharacters> 和 [`String`](https://developer.apple.com/documentation/swift/string)。

字符串字面量通过 `+` 运算符连接时，连接操作在编译时完成。
例如，以下示例中 `textA` 和 `textB` 的值是相同的——没有发生运行时的连接操作。

```swift
let textA = "Hello " + "world"
let textB = "Hello world"
```

<!--
  - test: `concatenated-strings`

  ```swifttest
  -> let textA = "Hello " + "world"
  -> let textB = "Hello world"
  ```
-->

> 字符串字面量的语法:
>
> *string-literal* → *static-string-literal* | *interpolated-string-literal*
>
> *string-literal-opening-delimiter* → *extended-string-literal-delimiter*_?_ **`"`** \
> *string-literal-closing-delimiter* → **`"`** *extended-string-literal-delimiter*_?_
>
> *static-string-literal* → *string-literal-opening-delimiter* *quoted-text*_?_ *string-literal-closing-delimiter* \
> *static-string-literal* → *multiline-string-literal-opening-delimiter* *multiline-quoted-text*_?_ *multiline-string-literal-closing-delimiter*
>
> *multiline-string-literal-opening-delimiter* → *extended-string-literal-delimiter*_?_ **`"""`** \
> *multiline-string-literal-closing-delimiter* → **`"""`** *extended-string-literal-delimiter*_?_ \
> *extended-string-literal-delimiter* → **`#`** *extended-string-literal-delimiter*_?_
>
> *quoted-text* → *quoted-text-item* *quoted-text*_?_ \
> *quoted-text-item* → *escaped-character* \
> *quoted-text-item* → 除 **`"`**、**`\`**、U+000A 或 U+000D 以外的任何 Unicode 标量值
>
> *multiline-quoted-text* → *multiline-quoted-text-item* *multiline-quoted-text*_?_ \
> *multiline-quoted-text-item* → *escaped-character* \
> *multiline-quoted-text-item* → 除 **`\`** 以外的任何 Unicode 标量值 \
> *multiline-quoted-text-item* → *escaped-newline*
>
> *interpolated-string-literal* → *string-literal-opening-delimiter* *interpolated-text*_?_ *string-literal-closing-delimiter* \
> *interpolated-string-literal* → *multiline-string-literal-opening-delimiter* *multiline-interpolated-text*_?_ *multiline-string-literal-closing-delimiter*
>
> *interpolated-text* → *interpolated-text-item* *interpolated-text*_?_ \
> *interpolated-text-item* → **`\(`** *expression* **`)`** | *quoted-text-item*
>
> *multiline-interpolated-text* → *multiline-interpolated-text-item* *multiline-interpolated-text*_?_ \
> *multiline-interpolated-text-item* → **`\(`** *expression* **`)`** | *multiline-quoted-text-item*
>
> *escape-sequence* → **`\`** *extended-string-literal-delimiter* \
> *escaped-character* → *escape-sequence* **`0`** | *escape-sequence* **`\`** | *escape-sequence* **`t`** | *escape-sequence* **`n`** | *escape-sequence* **`r`** | *escape-sequence* **`"`** | *escape-sequence* **`'`** \
> *escaped-character* → *escape-sequence* **`u`** **`{`** *unicode-scalar-digits* **`}`** \
> *unicode-scalar-digits* → 一到八位十六进制数字
>
> *escaped-newline* → *escape-sequence* *inline-spaces*_?_ *line-break*

<!--
  Quoted text resolves to a sequence of escaped characters by way of
  the quoted-text rule which allows repetition; no need to allow
  repetition in the quoted-text/escaped-character rule too.
-->

<!--
  Now that single quotes are gone, we don't have a character literal.
  Because we may one bring them back, here's the old grammar for them:

  textual-literal -> character-literal | string-literal

  character-literal -> ``'`` quoted-character ``'``
  quoted-character -> escaped-character
  quoted-character -> Any Unicode scalar value except ``'``, ``\``, U+000A, or U+000D
-->

### 正则表达式字面量

正则表达式字面量是一串被斜杠（`/`）包围的一串字符序列，形式如下：

```swift
/<#regular expression#>/
```

正则表达式字面量不能以未转义的制表符或空格开头，也不能包含未转义的斜杠（`/`）、回车符或换行符。

在正则表达式字面量中，反斜杠被视为正则表达式的一部分，而不仅仅是像在字符串字面量中那样作为转义字符。它表示后续的特殊字符应按字面理解，或者后续的非特殊字符应按特殊方式处理。例如，`/\(/` 匹配一个左括号，而 `/\d/` 匹配一个数字。

<!--
  OUTLINE

  Doc comments on Regex struct don't have more syntax details,
  or a cross reference to where you can learn more.
  We probably need at least some baseline coverage
  of the supported syntax here.
  (Unified dialect/superset of POSIX + PCRE 2 + Oniguruma + .NET)

  https://github.com/apple/swift-experimental-string-processing/blob/main/Sources/_StringProcessing/Regex/Core.swift

  Regex literals and the DSL take different approaches to captures.
  The literals give you more type safety.
  The DSL lets you access stuff by name.

  From SE-0354:
  A regex literal may be used with a prefix operator,
  e.g `let r = ^^/x/` is parsed as `let r = ^^(/x/)`.
  In this case,
  when encountering operator characters containing `/` in an expression position,
  the characters up to the first `/` are split into a prefix operator,
  and regex literal parsing continues as normal.
-->

由扩展定界符包围的正则表达式字面量是一串被斜杠（`/`）和一组或多组配对的井号（`#`）包围的字符序列。使用扩展定界符包围的正则表达式字面量有以下形式：

```swift
#/<#regular expression#>/#

#/
<#regular expression#>
/#
```

使用扩展定界符的正则表达式字面量可以以未转义的空格或制表符开头，可以包含未转义的斜杠（`/`），并且可以跨多行。在多行正则表达式字面量中，开始定界符必须在一行的末尾，结束定界符必须独立占一行。在多行正则表达式字面量内部，扩展正则表达式语法默认启用——具体来说，空白字符将被忽略，并允许使用注释。

<!--
  TODO As details about the multiline syntax shake out during SE review,
  like indentation and whitespace,
  add them above or spin out a separate paragraph.
-->

如果使用多个井号来形成由扩展定界符包围的正则表达式字面量，不要在井号之间留有空格：

```swift
let regex1 = ##/abc/##       // 正确
let regex2 = # #/abc/# #     // 错误
```

<!--
  - test: `extended-regex-delimiters-err`

  ```swifttest
  -> let regex1 = ##/abc/##       // OK
  -> let regex2 = # #/abc/# #     // Error
  ```
-->

如果你需要创建一个空的正则表达式字面量，则必须使用扩展定界符语法。

> 正则表达式字面量的语法:
>
> *regular-expression-literal* → *regular-expression-literal-opening-delimiter* *regular-expression* *regular-expression-literal-closing-delimiter* \
> *regular-expression* → 任何正则表达式
>
> *regular-expression-literal-opening-delimiter* → *extended-regular-expression-literal-delimiter*_?_ **`/`** \
> *regular-expression-literal-closing-delimiter* → **`/`** *extended-regular-expression-literal-delimiter*_?_
>
> *extended-regular-expression-literal-delimiter* → **`#`** *extended-regular-expression-literal-delimiter*_?_

## 运算符

Swift 标准库定义了许多运算符供你使用，其中许多运算符在 <doc:BasicOperators> 和 <doc:AdvancedOperators> 中进行了讨论。本节描述了哪些字符可以用于定义自定义运算符。

自定义运算符可以用这些 ASCII 字符之一开头：`/`、`=`、`-`、`+`、`!`、`*`、`%`、`<`、`>`、`&`、`|`、`^`、`?` 或 `~`，或者是定义在下面语法中的 Unicode 字符（其中包括来自 *数学运算符（Mathematical Operators）*、*杂项符号（Miscellaneous Symbols）* 和 *装饰符号（Dingbats）* Unicode 块的字符等）之一。在第一个字符之后，还允许使用组合 Unicode 字符（Combining Unicode Character）。

你还可以定义以点（`.`）开头的自定义运算符。这些运算符可以包含额外的点。例如，`.+.` 被视为一个单一的运算符。如果一个运算符不是以点开头的，则它不能在其他地方包含点。例如，`+.+` 被视为 `+` 运算符后跟 `.+` 运算符。

<!--
  - test: `dot-operator-must-start-with-dot`

  ```swifttest
  >> infix operator +.+ ;
  !$ error: consecutive statements on a line must be separated by ';'
  !! infix operator +.+ ;
  !!                 ^
  !!                 ;
  !$ error: operator with postfix spacing cannot start a subexpression
  !! infix operator +.+ ;
  !!                 ^
  !$ error: expected expression
  !! infix operator +.+ ;
  !!                    ^
  >> infix operator .+
  >> infix operator .+.
  ```
-->

虽然你可以定义包含问号 (`?`) 的自定义运算符，但它们不能仅由单个问号字符组成。此外，尽管运算符可以包含感叹号 (`!`)，但后缀运算符不能以问号或感叹号开头。

<!--
  - test: `postfix-operators-dont-need-unique-prefix`

  ```swifttest
  >> struct Num { var value: Int }
     postfix operator +
     postfix operator +*
     postfix func + (x: Num) -> Int { return x.value + 1 }
     postfix func +* (x: Num) -> Int { return x.value * 100 }
  >> let n = Num(value: 5)
  >> print(n+)
  << 6
  >> print(n+*)
  << 500
  ```
-->

<!--
  - test: `postfix-operator-cant-start-with-question-mark`

  ```swifttest
  >> postfix operator ?+
  >> postfix func ?+ (x: Int) -> Int {
         if x > 10 {
             return x
         }
         return x + 1
     }
  >> print(1?+)
  !$ error: postfix operator names starting with '?' or '!' are disallowed to avoid collisions with built-in unwrapping operators
  !! postfix operator ?+
  !!                  ^
  !$ error: '+' is not a postfix unary operator
  !! print(1?+)
  !!         ^
  ```
-->

> 注意: 标记符号 `=`、`->`、`//`、`/*`、`*/`、`.`，以及前缀运算符 `<`、`&` 和 `?`，中缀运算符 `?`，后缀运算符 `>`、`!` 和 `?` 都是保留标记符号。  
> 这些标记符号不能被重载，也不能用作自定义运算符。

运算符周围的空白用来确定运算符是作为前缀运算符、后缀运算符还是中缀运算符使用。这种行为遵循以下规则：

- 如果运算符两边都有空白或都没有空白，则它被视为中缀运算符。例如，表达式 `a+++b` 和 `a +++ b` 中的 `+++` 被视为中缀运算符。
- 如果运算符左边有空白而右边没有空白，则它被视为前缀一元运算符。例如，表达式 `a +++b` 中的 `+++` 被视为前缀一元运算符。
- 如果运算符右边有空白而左边没有空白，则它被视为后缀一元运算符。例如，表达式 `a+++ b` 中的 `+++` 被视为后缀一元运算符。
- 如果运算符左边没有空白但紧跟在它后面的是一个点号 (`.`)，则它被视为后缀一元运算符。例如，表达式 `a+++.b` 中的 `+++` 被视为后缀一元运算符（解释为 `a+++ .b` 而非 `a +++ .b`）。

在这些规则中，运算符前的字符 `(`、`[` 和 `{`，运算符后的字符 `)`、`]` 和 `}`，以及字符 `,`、`;` 和 `:` 也被视为空白。

如果预定义的 `!` 或 `?` 运算符左边没有空白，无论右边是否有空白，它都会被视为后缀运算符。要使用 `?` 作为可选链运算符（Optional-Chaining Operator），它左边必须没有空白。要在三元条件运算符 (`?` `:`) 中使用它，则必须在左右两边都有空白。

如果中缀运算符的其中一个参数是正则表达式字面量，则该运算符的左右两边都必须有空白。

在某些构造中，以 `<` 或 `>` 开头的运算符可能会被拆分为两个或多个标记符号。拆分后剩余的部分会以同样的规则处理，并可能再次被拆分。这意味着在 `Dictionary<String, Array<Int>>` 这样的构造中，你不需要添加空白来消除闭合 `>` 符号之间的歧义。在这个例子中，闭合的 `>` 符号不会被视为单个标记符号，也不会被错误解释为位移 `>>` 运算符。

<!--
  NOTE: Once the parser sees a < it goes into a pre-scanning lookahead mode.  It
  matches < and > and looks at what token comes after the > -- if it's a . or
  a ( it treats the <...> as a generic parameter list, otherwise it treats
  them as less than and greater than.

  This fails to parse things like x<<2>>(1+2) but it's the same as C#.  So
  don't write that.

  We call out the > > vs >> because
  C++ typically needs whitespace to resolve the ambiguity.
-->

要了解如何定义新的自定义操作符，请参阅 <doc:AdvancedOperators#自定义运算符> 和 <doc:Declarations#操作符声明>。要了解如何重载现有的操作符，请参阅 <doc:AdvancedOperators#Operator-Methods>。

<!--
  NOTE: The ? is a reserved punctuation.  Optional-chaining (foo?.bar) is actually a
  monad -- the ? is actually a monadic bind operator.  It is like a burrito.
  The current list of reserved punctuation is in Tokens.def.
-->

> 操作符的语法:
>
> *operator* → *operator-head* *operator-characters*_?_ \
> *operator* → *dot-operator-head* *dot-operator-characters*
>
> *operator-head* → **`/`** | **`=`** | **`-`** | **`+`** | **`!`** | **`*`** | **`%`** | **`<`** | **`>`** | **`&`** | **`|`** | **`^`** | **`~`** | **`?`** \
> *operator-head* → U+00A1–U+00A7 \
> *operator-head* → U+00A9 或 U+00AB \
> *operator-head* → U+00AC 或 U+00AE \
> *operator-head* → U+00B0–U+00B1 \
> *operator-head* → U+00B6、U+00BB、U+00BF、U+00D7 或 U+00F7 \
> *operator-head* → U+2016–U+2017 \
> *operator-head* → U+2020–U+2027 \
> *operator-head* → U+2030–U+203E \
> *operator-head* → U+2041–U+2053 \
> *operator-head* → U+2055–U+205E \
> *operator-head* → U+2190–U+23FF \
> *operator-head* → U+2500–U+2775 \
> *operator-head* → U+2794–U+2BFF \
> *operator-head* → U+2E00–U+2E7F \
> *operator-head* → U+3001–U+3003 \
> *operator-head* → U+3008–U+3020 \
> *operator-head* → U+3030
>
> *operator-character* → *operator-head* \
> *operator-character* → U+0300–U+036F \
> *operator-character* → U+1DC0–U+1DFF \
> *operator-character* → U+20D0–U+20FF \
> *operator-character* → U+FE00–U+FE0F \
> *operator-character* → U+FE20–U+FE2F \
> *operator-character* → U+E0100–U+E01EF \
> *operator-characters* → *operator-character* *operator-characters*_?_
>
> *dot-operator-head* → **`.`** \
> *dot-operator-character* → **`.`** | *operator-character* \
> *dot-operator-characters* → *dot-operator-character* *dot-operator-characters*_?_
>
> *infix-operator* → *operator* \
> *prefix-operator* → *operator* \
> *postfix-operator* → *operator*

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
