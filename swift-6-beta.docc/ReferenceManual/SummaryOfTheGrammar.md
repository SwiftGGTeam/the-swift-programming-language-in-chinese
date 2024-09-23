<!--
要翻译的文件：https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/swift-6-beta-translation/swift-6-beta.docc/ReferenceManual/SummaryOfTheGrammar.md
Swift 文档源文件地址：https://docs.swift.org/swift-book/documentation/the-swift-programming-language/summaryofthegrammar
翻译估计用时：⭐️⭐️⭐️⭐️⭐️
-->

# Summary of the Grammar

Read the whole formal grammar.

<!--

=== IMPORTANT ===

This file is manually updated.

If you edit formal grammar elsewhere in the reference,
make the same change here also.

=== IMPORTANT ===

-->

## 词法结构

> 空白符的语法：
>
> *空白符* → *空白符项* *空白符*可选 \
> *空白符项* → *换行符* \
> *空白符项* → *行内空格* \
> *空白符项* → *注释* \
> *空白符项* → *多行注释* \
> *空白符项* → U+0000, U+000B, 或 U+000C
>
> *换行符* → U+000A \
> *换行符* → U+000D \
> *换行符* → U+000D 后接 U+000A
>
> *行内空格* → *行内空格符* *行内空格*可选 \
> *行内空格符* → U+0009 或 U+0020
>
> *注释* → **`//`** *注释文本* *换行符* \
> *多行注释* → **`/*`** *多行注释文本* **`*/`**
>
> *注释文本* → *注释文本项* *注释文本*可选 \
> *注释文本项* → 除 U+000A 或 U+000D 外的任意 Unicode 标量值
>
> *多行注释文本* → *多行注释文本项* *多行注释文本*可选 \
> *多行注释文本项* → *多行注释* \
> *多行注释文本项* → *注释文本项* \
> *多行注释文本项* → 除 **`/*`** 或 **`*/`** 外的任意 Unicode 标量值

> 标识符的语法：
>
> *标识符* → *标识符头（Head）* *标识符字符集*可选 \
> *标识符* → **`` ` ``** *标识符头（Head）* *标识符字符集*可选 **`` ` ``** \
> *标识符* → *隐式参数名* \
> *标识符* → *属性包装器呈现值* \
> *标识符列表* → *标识符* | *标识符* **`,`** *标识符列表*
>
> *标识符头（Head）* → A 到 Z 的大写或小写字母 \
> *标识符头（Head）* → **`_`** \
> *标识符头（Head）* → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, 或 U+00B7–U+00BA \
> *标识符头（Head）* → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, 或 U+00F8–U+00FF \
> *标识符头（Head）* → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, 或 U+180F–U+1DBF \
> *标识符头（Head）* → U+1E00–U+1FFF \
> *标识符头（Head）* → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, 或 U+2060–U+206F \
> *标识符头（Head）* → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, 或 U+2776–U+2793 \
> *标识符头（Head）* → U+2C00–U+2DFF 或 U+2E80–U+2FFF \
> *标识符头（Head）* → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, 或 U+3040–U+D7FF \
> *标识符头（Head）* → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, 或 U+FE30–U+FE44 \
> *标识符头（Head）* → U+FE47–U+FFFD \
> *标识符头（Head）* → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, 或 U+40000–U+4FFFD \
> *标识符头（Head）* → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, 或 U+80000–U+8FFFD \
> *标识符头（Head）* → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, 或 U+C0000–U+CFFFD \
> *标识符头（Head）* → U+D0000–U+DFFFD 或 U+E0000–U+EFFFD
>
> *标识符字符* → 数字 0 到 9 \
> *标识符字符* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, 或 U+FE20–U+FE2F \
> *标识符字符* → *标识符头（Head）* \
> *标识符字符集* → *标识符字符项* *标识符字符集*可选
>
> *隐式参数名* → **`$`** *十进制数字* \
> *属性包装器呈现值* → **`$`** *标识符字符集*

> 字面量的语法：
>
> *字面量* → *数字字面量* | *字符串字面量* | *正则表达式字面量* | *布尔字面量* | *空字面量*
>
> *数字字面量* → **`-`** 可选 *整型字面量* | **`-`** 可选 *浮点型字面量* \
> *布尔字面量* → **`true`** | **`false`** \
> *空字面量* → **`nil`**

> 整型字面量的语法：
>
> *整型字面量* → *二进制字面量* \
> *整型字面量* → *八进制字面量* \
> *整型字面量* → *十进制字面量* \
> *整型字面量* → *十六进制字面量*
>
> *二进制字面量* → **`0b`** *二进制数字* *二进制字面量字符* 可选 \
> *二进制数字* → 数字 0 或 1 \
> *二进制字面量字符* → *二进制数字* | **`_`** \
> *二进制字面量字符* → *二进制字面量字符* *二进制字面量字符* 可选
>
> *八进制字面量* → **`0o`** *八进制数字* *八进制字面量字符* 可选 \
> *八进制数字* → 数字 0 到 7 \
> *八进制字面量字符* → *八进制数字* | **`_`** \
> *八进制字面量字符* → *八进制字面量字符* *八进制字面量字符* 可选
>
> *十进制字面量* → *十进制数字* *十进制字面量字符* 可选 \
> *十进制数字* → 数字 0 到 9 \
> *十进制数字* → *十进制数字* *十进制数字* 可选 \
> *十进制字面量字符* → *十进制数字* | **`_`** \
> *十进制字面量字符* → *十进制字面量字符* *十进制字面量字符* 可选
>
> *十六进制字面量* → **`0x`** *十六进制数字* *十六进制字面量字符* 可选 \
> *十六进制数字* → 数字 0 到 9，a 到 f，或 A 到 F \
> *十六进制字面量字符* → *十六进制数字* | **`_`** \
> *十六进制字面量字符* → *十六进制字面量字符* *十六进制字面量字符* 可选

> 浮点型字面量的语法：
>
> *浮点型字面量* → *十进制字面量* *十进制分数* 可选 *十进制指数* 可选 \
> *浮点型字面量* → *十六进制字面量* *十六进制分数* 可选 *十六进制指数*
>
> *十进制分数* → **`.`** *十进制字面量* \
> *十进制指数* → *浮点数 e* *正负号* 可选 *十进制字面量*
>
> *十六进制分数* → **`.`** *十六进制数字* *十六进制字面量字符* 可选 \
> *十六进制指数* → *浮点数 p* *正负号* 可选 *十进制字面量*
>
> *浮点数 e* → **`e`** | **`E`** \
> *浮点数 p* → **`p`** | **`P`** \
> *正负号* → **`+`** | **`-`**

> 字符串字面量的语法：
>
> *字符串字面量* → *静态字符串字面量* | *插值字符串字面量*
>
> *字符串开分隔定界符* → *字符串扩展分隔符* 可选 **`"`** \
> *字符串闭分隔定界符* → **`"`** *字符串扩展分隔符* 可选
>
> *静态字符串字面量* → *字符串开分隔定界符* *引用文本* 可选 *字符串闭分隔定界符* \
> *静态字符串字面量* → *多行字符串开分隔定界符* *多行引用文本* 可选 *多行字符串闭分隔定界符*
>
> *多行字符串开分隔定界符* → *字符串扩展分隔符* 可选 **`"""`** \
> *多行字符串闭分隔定界符* → **`"""`** *字符串扩展分隔符* 可选 \
> * 字符串扩展分隔符* → **`#`** *字符串扩展分隔符* 可选
>
> *引用文本* → *引用文本项* *引用文本* 可选 \
> *引用文本项* → *转义字符* \
> *引用文本项* → 任何 Unicode 标量值，除了 **`"`**、**`\`**、U+000A 或 U+000D
>
> *多行引用文本* → *多行引用文本项* *多行引用文本* 可选 \
> *多行引用文本项* → *转义字符* \
> *多行引用文本项* → 任何 Unicode 标量值，除了 **`\`** \
> *多行引用文本项* → *转义换行符*
>
> *插值字符串字面量* → *字符串开分隔定界符* *插值文本* 可选 *字符串闭分隔定界符* \
> *插值字符串字面量* → *多行字符串开分隔定界符* *多行插值文本* 可选 *多行字符串闭分隔定界符*
>
> *插值文本* → *插值文本项* *插值文本* 可选 \
> *插值文本项* → **`\(`** *表达式* **`)`** | *引用文本项*
>
> *多行插值文本* → *多行插值文本项* *多行插值文本* 可选 \
> *多行插值文本项* → **`\(`** *表达式* **`)`** | *多行引用文本项*
>
> *转义序列* → **`\`** * 字符串扩展分隔符* \
> *转义字符* → *转义序列* **`0`** | *转义序列* **`\`** | *转义序列* **`t`** | *转义序列* **`n`** | *转义序列* **`r`** | *转义序列* **`"`** | *转义序列* **`'`** \
> *转义字符* → *转义序列* **`u`** **`{`** *unicode-标量-数字* **`}`** \
> *unicode-标量-数字* → 一到八个十六进制数字
>
> *转义换行符* → *转义序列* *内联空格* 可选 *换行符*

> 正则表达式字面量的语法：
>
> *正则表达式字面量* → *正则表达式字面量开分隔定界符* *正则表达式* *正则表达式字面量闭分隔定界符* \
> *正则表达式* → 任何正则表达式
>
> *正则表达式字面量开分隔定界符* → *正则表达式扩展分隔符* 可选 **`/`** \
> *正则表达式字面量闭分隔定界符* → **`/`** *正则表达式扩展分隔符* 可选
>
> *正则表达式扩展分隔符* → **`#`** *正则表达式扩展分隔符* 可选

> 运算符的语法：
>
> *运算符* → *运算符头* *运算符字符集* 可选 \
> *运算符* → *点运算符头* *点运算符字符集*
>
> *运算符头* → **`/`** | **`=`** | **`-`** | **`+`** | **`!`** | **`*`** | **`%`** | **`<`** | **`>`** | **`&`** | **`|`** | **`^`** | **`~`** | **`?`** \
> *运算符头* → U+00A1–U+00A7 \
> *运算符头* → U+00A9 或 U+00AB \
> *运算符头* → U+00AC 或 U+00AE \
> *运算符头* → U+00B0–U+00B1 \
> *运算符头* → U+00B6、U+00BB、U+00BF、U+00D7 或 U+00F7 \
> *运算符头* → U+2016–U+2017 \
> *运算符头* → U+2020–U+2027 \
> *运算符头* → U+2030–U+203E \
> *运算符头* → U+2041–U+2053 \
> *运算符头* → U+2055–U+205E \
> *运算符头* → U+2190–U+23FF \
> *运算符头* → U+2500–U+2775 \
> *运算符头* → U+2794–U+2BFF \
> *运算符头* → U+2E00–U+2E7F \
> *运算符头* → U+3001–U+3003 \
> *运算符头* → U+3008–U+3020 \
> *运算符头* → U+3030
>
> *运算符字符* → *运算符头* \
> *运算符字符* → U+0300–U+036F \
> *运算符字符* → U+1DC0–U+1DFF \
> *运算符字符* → U+20D0–U+20FF \
> *运算符字符* → U+FE00–U+FE0F \
> *运算符字符* → U+FE20–U+FE2F \
> *运算符字符* → U+E0100–U+E01EF \
> *运算符字符集* → *运算符字符* *运算符字符集* 可选
>
> *点运算符头* → **`.`** \
> *点运算符字符* → **`.`** | *运算符字符* \
> *点运算符字符集* → *点运算符字符* *点运算符字符集* 可选
>
> *中缀运算符* → *运算符* \
> *前缀运算符* → *运算符* \
> *后缀运算符* → *运算符*

## 类型

> 类型的语法：
>
> *类型* → *函数类型* \
> *类型* → *数组类型* \
> *类型* → *字典类型* \
> *类型* → *类型标识符* \
> *类型* → *元组类型* \
> *类型* → *可选类型* \
> *类型* → *隐式解析可选类型* \
> *类型* → *协议合成类型* \
> *类型* → *不透明类型* \
> *类型* → *元类型* \
> *类型* → *任意类型* \
> *类型* → *自身类型* \
> *类型* → **`(`** *type* **`)`**

> 类型注释的语法：
>
> *类型注释* → **`:`** *属性（Attributes）* 可选 **`inout`** 可选 *类型*

> 类型标识符的语法：
>
> *类型标识符* → *类型名称* *泛型实参子句* 可选 | *类型名称* *泛型实参子句* 可选 **`.`** *类型标识符* \
> *类型名称* → *标识符*

> 元组类型的语法：
>
> *元组类型* → **`(`** **`)`** | **`(`** *元组类型元素* **`,`** *元组类型元素列表* **`)`** \
> *元组类型元素列表* → *元组类型元素* | *元组类型元素* **`,`** *元组类型元素列表* \
> *元组类型元素* → *元素名称* *类型注释* | *类型* \
> *元素名称* → *标识符*

> 函数类型的语法：
>
> *函数类型* → *属性* 可选 *函数类型子句* **`async`** 可选 *throws* 可选 **`->`** *类型*
>
> *函数类型子句* → **`(`** **`)`** \
> *函数类型子句* → **`(`** *函数类型参数列表* **`...`** 可选 **`)`**
>
> *函数类型参数列表* → *函数类型参数* | *函数类型参数* **`,`** *函数类型参数列表* \
> *函数类型参数* → *属性* 可选 **`inout`** 可选 *类型* | *参数标签* *类型注释* \
> *参数标签* → *标识符*
>
> *异常throws* → **`throws`** | **`throws`** **`(`** *类型* **`)`**

> 数组类型的语法：
>
> *数组类型* → **`[`** *类型* **`]`**

> 字典类型的语法：
>
> *字典类型* → **`[`** *类型* **`:`** *类型* **`]`**

> 可选类型的语法：
>
> *可选类型* → *类型* **`?`**

> 隐式解析可选类型的语法：
>
> *隐式解析可选类型* → *类型* **`!`**

> 协议合成类型的语法：
>
> *协议合成类型* → *类型标识符* **`&`** *协议合成延续* \
> *协议合成延续* → *类型标识符* | *协议合成类型*

> 不透明类型的语法：
>
> *不透明类型* → **`some`** *类型*

> 被包装的协议类型的语法：
>
> *被包装的协议类型* → **`any`** *类型*

> 元类型的语法：
>
> *元类型* → *类型* **`.`** **`Type`** | *类型* **`.`** **`Protocol`**

> 任意类型的语法：
>
> *任意类型* → **`Any`**

> 自身类型的语法：
>
> *自身类型* → **`Self`**

> 类型继承从句的语法：
>
> *类型继承从句* → **`:`** *类型继承集* \
> *类型继承集* → *属性* 可选 *类型标识符* | *属性* 可选 *类型标识符* **`,`** *类型继承集*

## 表达式

> 表达式的语法：
>
> *表达式* → *try 运算符* 可选 *await 运算符* 可选 *前缀表达式* *中缀表达式* 可选 \

> 前缀表达式的语法：
>
> *前缀表达式* → *前缀运算符* 可选 *后缀表达式* \
> *前缀表达式* → *输入输出表达式*

> 输入输出表达式的语法：
>
> *输入输出表达式* → **`&`** *基础表达式*

> try 表达式的语法：
>
> *try 运算符* → **`try`** | **`try`** **`?`** | **`try`** **`!`**

> await 表达式的语法：
>
> *await 运算符* → **`await`**

> 中缀表达式的语法：
>
> *中缀表达式* → *中缀运算符* *前缀表达式* \
> *中缀表达式* → *赋值运算符* *try 运算符* 可选 *await 运算符* 可选 *前缀表达式* \
> *中缀表达式* → *条件运算符* *try 运算符* 可选 *await 运算符* 可选 *前缀表达式* \
> *中缀表达式* → *类型转换运算符* \
> *中缀表达式* → *中缀表达式* *中缀表达式* 可选

> 赋值运算符的语法：
>
> *赋值运算符* → **`=`**

> 条件运算符的语法：
>
> *条件运算符* → **`?`** *表达式* **`:`**

> 类型转换运算符的语法：
>
> *类型转换运算符* → **`is`** *类型* \
> *类型转换运算符* → **`as`** *类型* \
> *类型转换运算符* → **`as`** **`?`** *类型* \
> *类型转换运算符* → **`as`** **`!`** *类型*

> 基础表达式的语法：
>
> *基础表达式* → *标识符* *泛型实参子句* 可选 \
> *基础表达式* → *字面量表达式* \
> *基础表达式* → *self 表达式* \
> *基础表达式* → *父类表达式* \
> *基础表达式* → *条件表达式* \
> *基础表达式* → *闭包表达式* \
> *基础表达式* → *圆括号表达式* \
> *基础表达式* → *元组表达式* \
> *基础表达式* → *隐式成员表达式* \
> *基础表达式* → *通配符表达式* \
> *基础表达式* → *宏展开表达式* \
> *基础表达式* → *key-path 表达式* \
> *基础表达式* → *选择器表达式* \
> *基础表达式* → *key-path字符串表达式*

> 字面量表达式的语法：
>
> *字面量表达式* → *字面量* \
> *字面量表达式* → *数组字面量* | *字典字面量* | *playground 字面量*
>
> *数组字面量* → **`[`** *数组字面量项* 可选 **`]`** \
> *数组字面量项* → *数组字面量项* **`,`** 可选 | *数组字面量项* **`,`** *数组字面量项* \
> *数组字面量项* → *表达式*
>
> *字典字面量* → **`[`** *字典字面量项* **`]`** | **`[`** **`:`** **`]`** \
> *字典字面量项* → *字典字面量项* **`,`** 可选 | *字典字面量项* **`,`** *字典字面量项* \
> *字典字面量项* → *表达式* **`:`** *表达式*
>
> *playground 字面量* → **`#colorLiteral`** **`(`** **`red`** **`:`** *表达式* **`,`** **`green`** **`:`** *表达式* **`,`** **`blue`** **`:`** *表达式* **`,`** **`alpha`** **`:`** *表达式* **`)`** \
> *playground 字面量* → **`#fileLiteral`** **`(`** **`resourceName`** **`:`** *表达式* **`)`** \
> *playground 字面量* → **`#imageLiteral`** **`(`** **`resourceName`** **`:`** *表达式* **`)`**

> self 表达式的语法：
>
> *self 表达式* → **`self`** | *self 方法表达式* | *self 下标表达式* | *self 构造器表达式*
>
> *self 方法表达式* → **`self`** **`.`** *标识符* \
> *self 下标表达式* → **`self`** **`[`** *函数调用参数表* **`]`** \
> *self 构造器表达式* → **`self`** **`.`** **`init`**

> 父类表达式的语法：
>
> *父类表达式* → *父类方法表达式* | *父类下标表达式* | *父类构造器表达式*
>
> *父类方法表达式* → **`super`** **`.`** *标识符* \
> *父类下标表达式* → **`super`** **`[`** *函数调用参数表* **`]`** \
> *父类构造器表达式* → **`super`** **`.`** **`init`**

> 条件表达式的语法：
>
> *条件表达式* → *if 表达式* | *switch 表达式*
>
> *if 表达式* → **`if`** *条件列表* **`{`** *语句* **`}`** *if 表达式尾* \
> *if 表达式尾* → **`else`** *if 表达式* \
> *if 表达式尾* → **`else`** **`{`** *语句* **`}`**
>
> *switch 表达式* → **`switch`** *表达式* **`{`** *switch表 达式案例* **`}`** \
> *switch 表达式案例* → *switch 表达式案例* *switch 表达式案例* 可选 \
> *switch case 表达式* → *case 标签* *语句* \
> *switch case 表达式* → *default 标签* *语句*

> 闭包表达式的语法：
>
> *闭包表达式* → **`{`** *属性* 可选 *闭包签名* 可选 *语句* 可选 **`}`**
>
> *闭包签名* → *捕获列表* 可选 *闭包参数子句* **`async`** 可选 *throws* 可选 *函数结果* 可选 **`in`** \
> *闭包签名* → *捕获列表* **`in`**
>
> *闭包参数子句* → **`(`** **`)`** | **`(`** *闭包参数列表* **`)`** | *标识符列表* \
> *闭包参数列表* → *闭包参数* | *闭包参数* **`,`** *闭包参数列表* \
> *闭包参数* → *闭包参数名* *类型注释* 可选 \
> *闭包参数* → *闭包参数名* *类型注释* **`...`** \
> *闭包参数名* → *标识符*
>
> *捕获列表* → **`[`** *捕获列表项* **`]`** \
> *捕获列表项* → *捕获列表项* | *捕获列表项* **`,`** *捕获列表项* \
> *捕获列表项* → *捕获说明符* 可选 *标识符* \
> *捕获列表项* → *捕获说明符* 可选 *标识符* **`=`** *表达式* \
> *捕获列表项* → *捕获说明符* 可选 *self 表达式* \
> *捕获说明符* → **`weak`** | **`unowned`** | **`unowned(safe)`** | **`unowned(unsafe)`**

> 隐式成员表达式的语法：
>
> *隐式成员表达式* → **`.`** *标识符* \
> *隐式成员表达式* → **`.`** *标识符* **`.`** *后缀表达式*

> 圆括号表达式的语法：
>
> *圆括号表达式* → **`(`** *表达式* **`)`**

> 元组表达式的语法：
>
> *元组表达式* → **`(`** **`)`** | **`(`** *元组元素* **`,`** *元组元素列表* **`)`** \
> *元组元素列表* → *元组元素* | *元组元素* **`,`** *元组元素列表* \
> *元组元素* → *表达式* | *标识符* **`:`** *表达式*

> 通配符表达式的语法：
>
> *通配符表达式* → **`_`**

> 宏展开表达式的语法：
>
> *宏展开表达式* → **`#`** *标识符* *泛型参数子句* 可选 *函数调用参数子句* 可选 *尾随闭包* 可选

> ke'y表达式的语法：
>
> *key-path 表达式* → **`\`** *类型* 可选 **`.`** *key-path 组件* \
> *key-path 组件* → *key-path 组件* | *key-path 组件* **`.`** *key-path 组件* \
> *key-path 组件* → *标识符* *key-path 后缀* 可选 | *key-path 后缀*
>
> *key-path 后缀* → *key-path 后缀* *key-path 后缀* 可选 \
> *key-path 后缀* → **`?`** | **`!`** | **`self`** | **`[`** *函数调用参数列表* **`]`**

> 选择器表达式的语法：
>
> *选择器表达式* → **`#selector`** **`(`** *表达式* **`)`** \
> *选择器表达式* → **`#selector`** **`(`** **`getter:`** *表达式* **`)`** \
> *选择器表达式* → **`#selector`** **`(`** **`setter:`** *表达式* **`)`**

> key-path 字符串表达式的语法：
>
> *key-path 字符串表达式* → **`#keyPath`** **`(`** *表达式* **`)`**

> 后缀表达式的语法：
>
> *后缀表达式* → *基本表达式* \
> *后缀表达式* → *后缀表达式* *后缀运算符* \
> *后缀表达式* → *函数调用表达式* \
> *后缀表达式* → *构造器表达式* \
> *后缀表达式* → *显式成员表达式* \
> *后缀表达式* → *后缀 self 表达式* \
> *后缀表达式* → *下标表达式* \
> *后缀表达式* → *强制取值表达式* \
> *后缀表达式* → *可选链式表达式*

> 函数调用表达式的语法：
>
> *函数调用表达式* → *后缀表达式* *函数调用参数子句* \
> *函数调用表达式* → *后缀表达式* *函数调用参数子句* 可选 *尾随闭包*
>
> *函数调用参数子句* → **`(`** **`)`** | **`(`** *函数调用参数列表* **`)`** \
> *函数调用参数列表* → *函数调用参数* | *函数调用参数* **`,`** *函数调用参数列表* \
> *函数调用参数* → *表达式* | *标识符* **`:`** *表达式* \
> *函数调用参数* → *运算符* | *标识符* **`:`** *运算符*
>
> *尾随闭包* → *闭包表达式* *带标签的尾随闭包* 可选 \
> *带标签的尾随闭包* → *带标签的尾随闭包* *带标签的尾随闭包* 可选 \
> *带标签的尾随闭包* → *标识符* **`:`** *闭包表达式*

> 构造器表达式的语法：
>
> *构造器表达式* → *后缀表达式* **`.`** **`init`** \
> *构造器表达式* → *后缀表达式* **`.`** **`init`** **`(`** *参数名称* **`)`**

> 显式成员表达式的语法：
>
> *显式成员表达式* → *后缀表达式* **`.`** *十进制数字* \
> *显式成员表达式* → *后缀表达式* **`.`** *标识符* *泛型参数子句* 可选 \
> *显式成员表达式* → *后缀表达式* **`.`** *标识符* **`(`** *参数名称* **`)`** \
> *显式成员表达式* → *后缀表达式* *条件编译块*
>
> *参数名称* → *参数名称* *参数名称* 可选 \
> *参数名称* → *标识符* **`:`**

> 后缀 self表达式的语法：
>
> *后缀 self 表达式* → *后缀表达式* **`.`** **`self`**

> 下标表达式的语法：
>
> *下标表达式* → *后缀表达式* **`[`** *函数调用参数列表* **`]`**

> 强制取值表达式的语法：
>
> *强制取值表达式* → *后缀表达式* **`!`**

> 可选链式表达式的语法：
>
> *可选链式表达式* → *后缀表达式* **`?`**

## 语句

> 语句的语法：
>
> *语句* → *表达式* **`;`** 可选 \
> *语句* → *声明* **`;`** 可选 \
> *语句* → *循环语句* **`;`** 可选 \
> *语句* → *分支语句* **`;`** 可选 \
> *语句* → *带标签的语句* **`;`** 可选 \
> *语句* → *控制转移语句* **`;`** 可选 \
> *语句* → *延迟语句* **`;`** 可选 \
> *语句* → *执行语句* **`;`** 可选 \
> *语句* → *编译器控制语句* \
> *语句集合* → *语句* *语句集合* 可选

> 循环语句的语法：
>
> *循环语句* → *for-in 语句* \
> *循环语句* → *while 语句* \
> *循环语句* → *repeat-while 语句*

> for-in 语句的语法：
>
> *for-in 语句* → **`for`** **`case`** 可选 *模式* **`in`** *表达式* *where 子句* 可选 *代码块*

> while 语句的语法：
>
> *while 语句* → **`while`** *条件列表* *代码块*
>
> *条件列表* → *条件* | *条件* **`,`** *条件列表* \
> *条件* → *表达式* | *可用性条件* | *case条件* | *可选绑定条件*
>
> *case条件* → **`case`** *模式* *初始化器* \
> *可选绑定条件* → **`let`** *模式* *初始化器* 可选 | **`var`** *模式* *初始化器* 可选

> repeat-while 语句的语法：
>
> *repeat-while 语句* → **`repeat`** *代码块* **`while`** *表达式*

> 分支语句的语法：
>
> *分支语句* → *if 语句* \
> *分支语句* → *guard 语句* \
> *分支语句* → *switch 语句*

> if 语句的语法：
>
> *if 语句* → **`if`** *条件列表* *代码块* *else 子句* 可选 \
> *else 子句* → **`else`** *代码块* | **`else`** *if 语句*

> guard 语句的语法：
>
> *guard 语句* → **`guard`** *条件列表* **`else`** *代码块*

> switch 语句的语法：
>
> *switch 语句* → **`switch`** *表达式* **`{`** *switch 语句* 可选 **`}`** \
> *switch 语句* → *switch 语句* *switch 语句* 可选 \
> *switch 语句* → *case 标签* *语句集合* \
> *switch 语句* → *default 标签* *语句集合* \
> *switch 语句* → *条件 switch 语句*
>
> *case 标签* → *属性* 可选 **`case`** *case 项列表* **`:`** \
> *case 项列表* → *模式* *where 子句* 可选 | *模式* *where 子句* 可选 **`,`** *case 项列表* \
> *default 标签* → *属性* 可选 **`default`** **`:`**
>
> *where 子句* → **`where`** *where 表达式* \
> *where 表达式* → *表达式*
>
> *条件 switch 语句* → *switch-if 指令子句* *switch-elseif 指令子句集* 可选 *switch-else 指令子句* 可选 *endif 指令* \
> *switch-if 指令子句* → *if 指令* *编译条件* *switch-case 集* 可选 \
> *switch-elseif 指令子句* → *elseif 指令子句* *switch-elseif 指令子句集* 可选 \
> *switch-elseif 指令子句* → *elseif 指令* *编译条件* *switch-case 集* 可选 \
> *switch-else 指令子句* → *else 指令* *switch-case 集* 可选

> Grammar of a labeled statement:
>
> *labeled-statement* → *statement-label* *loop-statement* \
> *labeled-statement* → *statement-label* *if-statement* \
> *labeled-statement* → *statement-label* *switch-statement* \
> *labeled-statement* → *statement-label* *do-statement*
>
> *statement-label* → *label-name* **`:`** \
> *label-name* → *identifier*

> Grammar of a control transfer statement:
>
> *control-transfer-statement* → *break-statement* \
> *control-transfer-statement* → *continue-statement* \
> *control-transfer-statement* → *fallthrough-statement* \
> *control-transfer-statement* → *return-statement* \
> *control-transfer-statement* → *throw-statement*

> Grammar of a break statement:
>
> *break-statement* → **`break`** *label-name*可选

> Grammar of a continue statement:
>
> *continue-statement* → **`continue`** *label-name*可选

> Grammar of a fallthrough statement:
>
> *fallthrough-statement* → **`fallthrough`**

> Grammar of a return statement:
>
> *return-statement* → **`return`** *expression*可选

> Grammar of a throw statement:
>
> *throw-statement* → **`throw`** *expression*

> Grammar of a defer statement:
>
> *defer-statement* → **`defer`** *code-block*

> Grammar of a do statement:
>
> *do-statement* → **`do`** *throws-clause*可选 *code-block* *catch-clauses*可选 \
> *catch-clauses* → *catch-clause* *catch-clauses*可选 \
> *catch-clause* → **`catch`** *catch-pattern-list*可选 *code-block* \
> *catch-pattern-list* → *catch-pattern* | *catch-pattern* **`,`** *catch-pattern-list* \
> *catch-pattern* → *pattern* *where-clause*可选

> Grammar of a compiler control statement:
>
> *compiler-control-statement* → *conditional-compilation-block* \
> *compiler-control-statement* → *line-control-statement* \
> *compiler-control-statement* → *diagnostic-statement*

> Grammar of a conditional compilation block:
>
> *conditional-compilation-block* → *if-directive-clause* *elseif-directive-clauses*可选 *else-directive-clause*可选 *endif-directive*
>
> *if-directive-clause* → *if-directive* *compilation-condition* *statements*可选 \
> *elseif-directive-clauses* → *elseif-directive-clause* *elseif-directive-clauses*可选 \
> *elseif-directive-clause* → *elseif-directive* *compilation-condition* *statements*可选 \
> *else-directive-clause* → *else-directive* *statements*可选 \
> *if-directive* → **`#if`** \
> *elseif-directive* → **`#elseif`** \
> *else-directive* → **`#else`** \
> *endif-directive* → **`#endif`**
>
> *compilation-condition* → *platform-condition* \
> *compilation-condition* → *identifier* \
> *compilation-condition* → *boolean-literal* \
> *compilation-condition* → **`(`** *compilation-condition* **`)`** \
> *compilation-condition* → **`!`** *compilation-condition* \
> *compilation-condition* → *compilation-condition* **`&&`** *compilation-condition* \
> *compilation-condition* → *compilation-condition* **`||`** *compilation-condition*
>
> *platform-condition* → **`os`** **`(`** *operating-system* **`)`** \
> *platform-condition* → **`arch`** **`(`** *architecture* **`)`** \
> *platform-condition* → **`swift`** **`(`** **`>=`** *swift-version* **`)`** | **`swift`** **`(`** **`<`** *swift-version* **`)`** \
> *platform-condition* → **`compiler`** **`(`** **`>=`** *swift-version* **`)`** | **`compiler`** **`(`** **`<`** *swift-version* **`)`** \
> *platform-condition* → **`canImport`** **`(`** *import-path* **`)`** \
> *platform-condition* → **`targetEnvironment`** **`(`** *environment* **`)`**
>
> *operating-system* → **`macOS`** | **`iOS`** | **`watchOS`** | **`tvOS`** | **`visionOS`** | **`Linux`** | **`Windows`** \
> *architecture* → **`i386`** | **`x86_64`** | **`arm`** | **`arm64`** \
> *swift-version* → *decimal-digits* *swift-version-continuation*可选 \
> *swift-version-continuation* → **`.`** *decimal-digits* *swift-version-continuation*可选 \
> *environment* → **`simulator`** | **`macCatalyst`**

> Grammar of a line control statement:
>
> *line-control-statement* → **`#sourceLocation`** **`(`** **`file:`** *file-path* **`,`** **`line:`** *line-number* **`)`** \
> *line-control-statement* → **`#sourceLocation`** **`(`** **`)`** \
> *line-number* → A decimal integer greater than zero \
> *file-path* → *static-string-literal*

> Grammar of an availability condition:
>
> *availability-condition* → **`#available`** **`(`** *availability-arguments* **`)`** \
> *availability-condition* → **`#unavailable`** **`(`** *availability-arguments* **`)`** \
> *availability-arguments* → *availability-argument* | *availability-argument* **`,`** *availability-arguments* \
> *availability-argument* → *platform-name* *platform-version* \
> *availability-argument* → **`*`**
>
> *platform-name* → **`iOS`** | **`iOSApplicationExtension`** \
> *platform-name* → **`macOS`** | **`macOSApplicationExtension`** \
> *platform-name* → **`macCatalyst`** | **`macCatalystApplicationExtension`** \
> *platform-name* → **`watchOS`** | **`watchOSApplicationExtension`** \
> *platform-name* → **`tvOS`** | **`tvOSApplicationExtension`** \
> *platform-name* → **`visionOS`** | **`visionOSApplicationExtension`** \
> *platform-version* → *decimal-digits* \
> *platform-version* → *decimal-digits* **`.`** *decimal-digits* \
> *platform-version* → *decimal-digits* **`.`** *decimal-digits* **`.`** *decimal-digits*

## Declarations

> Grammar of a declaration:
>
> *declaration* → *import-declaration* \
> *declaration* → *constant-declaration* \
> *declaration* → *variable-declaration* \
> *declaration* → *typealias-declaration* \
> *declaration* → *function-declaration* \
> *declaration* → *enum-declaration* \
> *declaration* → *struct-declaration* \
> *declaration* → *class-declaration* \
> *declaration* → *actor-declaration* \
> *declaration* → *protocol-declaration* \
> *declaration* → *initializer-declaration* \
> *declaration* → *deinitializer-declaration* \
> *declaration* → *extension-declaration* \
> *declaration* → *subscript-declaration* \
> *declaration* → *operator-declaration* \
> *declaration* → *precedence-group-declaration* \

> Grammar of a top-level declaration:
>
> *top-level-declaration* → *statements*可选

> Grammar of a code block:
>
> *code-block* → **`{`** *statements*可选 **`}`**

> Grammar of an import declaration:
>
> *import-declaration* → *attributes*可选 **`import`** *import-kind*可选 *import-path*
>
> *import-kind* → **`typealias`** | **`struct`** | **`class`** | **`enum`** | **`protocol`** | **`let`** | **`var`** | **`func`** \
> *import-path* → *identifier* | *identifier* **`.`** *import-path*

> Grammar of a constant declaration:
>
> *constant-declaration* → *attributes*可选 *declaration-modifiers*可选 **`let`** *pattern-initializer-list*
>
> *pattern-initializer-list* → *pattern-initializer* | *pattern-initializer* **`,`** *pattern-initializer-list* \
> *pattern-initializer* → *pattern* *initializer*可选 \
> *initializer* → **`=`** *expression*

> Grammar of a variable declaration:
>
> *variable-declaration* → *variable-declaration-head* *pattern-initializer-list* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *code-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-keyword-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *initializer* *willSet-didSet-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *initializer*可选 *willSet-didSet-block*
>
> *variable-declaration-head* → *attributes*可选 *declaration-modifiers*可选 **`var`** \
> *variable-name* → *identifier*
>
> *getter-setter-block* → *code-block* \
> *getter-setter-block* → **`{`** *getter-clause* *setter-clause*可选 **`}`** \
> *getter-setter-block* → **`{`** *setter-clause* *getter-clause* **`}`** \
> *getter-clause* → *attributes*可选 *mutation-modifier*可选 **`get`** *code-block* \
> *setter-clause* → *attributes*可选 *mutation-modifier*可选 **`set`** *setter-name*可选 *code-block* \
> *setter-name* → **`(`** *identifier* **`)`**
>
> *getter-setter-keyword-block* → **`{`** *getter-keyword-clause* *setter-keyword-clause*可选 **`}`** \
> *getter-setter-keyword-block* → **`{`** *setter-keyword-clause* *getter-keyword-clause* **`}`** \
> *getter-keyword-clause* → *attributes*可选 *mutation-modifier*可选 **`get`** \
> *setter-keyword-clause* → *attributes*可选 *mutation-modifier*可选 **`set`**
>
> *willSet-didSet-block* → **`{`** *willSet-clause* *didSet-clause*可选 **`}`** \
> *willSet-didSet-block* → **`{`** *didSet-clause* *willSet-clause*可选 **`}`** \
> *willSet-clause* → *attributes*可选 **`willSet`** *setter-name*可选 *code-block* \
> *didSet-clause* → *attributes*可选 **`didSet`** *setter-name*可选 *code-block*

> Grammar of a type alias declaration:
>
> *typealias-declaration* → *attributes*可选 *access-level-modifier*可选 **`typealias`** *typealias-name* *generic-parameter-clause*可选 *typealias-assignment* \
> *typealias-name* → *identifier* \
> *typealias-assignment* → **`=`** *type*

> Grammar of a function declaration:
>
> *function-declaration* → *function-head* *function-name* *generic-parameter-clause*可选 *function-signature* *generic-where-clause*可选 *function-body*可选
>
> *function-head* → *attributes*可选 *declaration-modifiers*可选 **`func`** \
> *function-name* → *identifier* | *operator*
>
> *function-signature* → *parameter-clause* **`async`**可选 *throws-clause*可选 *function-result*可选 \
> *function-signature* → *parameter-clause* **`async`**可选 **`rethrows`** *function-result*可选 \
> *function-result* → **`->`** *attributes*可选 *type* \
> *function-body* → *code-block*
>
> *parameter-clause* → **`(`** **`)`** | **`(`** *parameter-list* **`)`** \
> *parameter-list* → *parameter* | *parameter* **`,`** *parameter-list* \
> *parameter* → *external-parameter-name*可选 *local-parameter-name* *parameter-type-annotation* *default-argument-clause*可选 \
> *parameter* → *external-parameter-name*可选 *local-parameter-name* *parameter-type-annotation* \
> *parameter* → *external-parameter-name*可选 *local-parameter-name* *parameter-type-annotation* **`...`**
>
> *external-parameter-name* → *identifier* \
> *local-parameter-name* → *identifier* \
> *parameter-type-annotation* → **`:`** *attributes*可选 *parameter-modifier*可选 *type* \
> *parameter-modifier* → **`inout`** | **`borrowing`** | **`consuming`**
> *default-argument-clause* → **`=`** *expression*

> Grammar of an enumeration declaration:
>
> *enum-declaration* → *attributes*可选 *access-level-modifier*可选 *union-style-enum* \
> *enum-declaration* → *attributes*可选 *access-level-modifier*可选 *raw-value-style-enum*
>
> *union-style-enum* → **`indirect`**可选 **`enum`** *enum-name* *generic-parameter-clause*可选 *type-inheritance-clause*可选 *generic-where-clause*可选 **`{`** *union-style-enum-members*可选 **`}`** \
> *union-style-enum-members* → *union-style-enum-member* *union-style-enum-members*可选 \
> *union-style-enum-member* → *declaration* | *union-style-enum-case-clause* | *compiler-control-statement* \
> *union-style-enum-case-clause* → *attributes*可选 **`indirect`**可选 **`case`** *union-style-enum-case-list* \
> *union-style-enum-case-list* → *union-style-enum-case* | *union-style-enum-case* **`,`** *union-style-enum-case-list* \
> *union-style-enum-case* → *enum-case-name* *tuple-type*可选 \
> *enum-name* → *identifier* \
> *enum-case-name* → *identifier*
>
> *raw-value-style-enum* → **`enum`** *enum-name* *generic-parameter-clause*可选 *type-inheritance-clause* *generic-where-clause*可选 **`{`** *raw-value-style-enum-members* **`}`** \
> *raw-value-style-enum-members* → *raw-value-style-enum-member* *raw-value-style-enum-members*可选 \
> *raw-value-style-enum-member* → *declaration* | *raw-value-style-enum-case-clause* | *compiler-control-statement* \
> *raw-value-style-enum-case-clause* → *attributes*可选 **`case`** *raw-value-style-enum-case-list* \
> *raw-value-style-enum-case-list* → *raw-value-style-enum-case* | *raw-value-style-enum-case* **`,`** *raw-value-style-enum-case-list* \
> *raw-value-style-enum-case* → *enum-case-name* *raw-value-assignment*可选 \
> *raw-value-assignment* → **`=`** *raw-value-literal* \
> *raw-value-literal* → *numeric-literal* | *static-string-literal* | *boolean-literal*

> Grammar of a structure declaration:
>
> *struct-declaration* → *attributes*可选 *access-level-modifier*可选 **`struct`** *struct-name* *generic-parameter-clause*可选 *type-inheritance-clause*可选 *generic-where-clause*可选 *struct-body* \
> *struct-name* → *identifier* \
> *struct-body* → **`{`** *struct-members*可选 **`}`**
>
> *struct-members* → *struct-member* *struct-members*可选 \
> *struct-member* → *declaration* | *compiler-control-statement*

> Grammar of a class declaration:
>
> *class-declaration* → *attributes*可选 *access-level-modifier*可选 **`final`**可选 **`class`** *class-name* *generic-parameter-clause*可选 *type-inheritance-clause*可选 *generic-where-clause*可选 *class-body* \
> *class-declaration* → *attributes*可选 **`final`** *access-level-modifier*可选 **`class`** *class-name* *generic-parameter-clause*可选 *type-inheritance-clause*可选 *generic-where-clause*可选 *class-body* \
> *class-name* → *identifier* \
> *class-body* → **`{`** *class-members*可选 **`}`**
>
> *class-members* → *class-member* *class-members*可选 \
> *class-member* → *declaration* | *compiler-control-statement*

> Grammar of an actor declaration:
>
> *actor-declaration* → *attributes*可选 *access-level-modifier*可选 **`actor`** *actor-name* *generic-parameter-clause*可选 *type-inheritance-clause*可选 *generic-where-clause*可选 *actor-body* \
> *actor-name* → *identifier* \
> *actor-body* → **`{`** *actor-members*可选 **`}`**
>
> *actor-members* → *actor-member* *actor-members*可选 \
> *actor-member* → *declaration* | *compiler-control-statement*

> Grammar of a protocol declaration:
>
> *protocol-declaration* → *attributes*可选 *access-level-modifier*可选 **`protocol`** *protocol-name* *type-inheritance-clause*可选 *generic-where-clause*可选 *protocol-body* \
> *protocol-name* → *identifier* \
> *protocol-body* → **`{`** *protocol-members*可选 **`}`**
>
> *protocol-members* → *protocol-member* *protocol-members*可选 \
> *protocol-member* → *protocol-member-declaration* | *compiler-control-statement*
>
> *protocol-member-declaration* → *protocol-property-declaration* \
> *protocol-member-declaration* → *protocol-method-declaration* \
> *protocol-member-declaration* → *protocol-initializer-declaration* \
> *protocol-member-declaration* → *protocol-subscript-declaration* \
> *protocol-member-declaration* → *protocol-associated-type-declaration* \
> *protocol-member-declaration* → *typealias-declaration*

> Grammar of a protocol property declaration:
>
> *protocol-property-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-keyword-block*

> Grammar of a protocol method declaration:
>
> *protocol-method-declaration* → *function-head* *function-name* *generic-parameter-clause*可选 *function-signature* *generic-where-clause*可选

> Grammar of a protocol initializer declaration:
>
> *protocol-initializer-declaration* → *initializer-head* *generic-parameter-clause*可选 *parameter-clause* *throws-clause*可选 *generic-where-clause*可选 \
> *protocol-initializer-declaration* → *initializer-head* *generic-parameter-clause*可选 *parameter-clause* **`rethrows`** *generic-where-clause*可选

> Grammar of a protocol subscript declaration:
>
> *protocol-subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*可选 *getter-setter-keyword-block*

> Grammar of a protocol associated type declaration:
>
> *protocol-associated-type-declaration* → *attributes*可选 *access-level-modifier*可选 **`associatedtype`** *typealias-name* *type-inheritance-clause*可选 *typealias-assignment*可选 *generic-where-clause*可选

> Grammar of an initializer declaration:
>
> *initializer-declaration* → *initializer-head* *generic-parameter-clause*可选 *parameter-clause* **`async`**可选 *throws-clause*可选 *generic-where-clause*可选 *initializer-body* \
> *initializer-declaration* → *initializer-head* *generic-parameter-clause*可选 *parameter-clause* **`async`**可选 **`rethrows`** *generic-where-clause*可选 *initializer-body* \
> *initializer-head* → *attributes*可选 *declaration-modifiers*可选 **`init`** \
> *initializer-head* → *attributes*可选 *declaration-modifiers*可选 **`init`** **`?`** \
> *initializer-head* → *attributes*可选 *declaration-modifiers*可选 **`init`** **`!`** \
> *initializer-body* → *code-block*

> Grammar of a deinitializer declaration:
>
> *deinitializer-declaration* → *attributes*可选 **`deinit`** *code-block*

> Grammar of an extension declaration:
>
> *extension-declaration* → *attributes*可选 *access-level-modifier*可选 **`extension`** *type-identifier* *type-inheritance-clause*可选 *generic-where-clause*可选 *extension-body* \
> *extension-body* → **`{`** *extension-members*可选 **`}`**
>
> *extension-members* → *extension-member* *extension-members*可选 \
> *extension-member* → *declaration* | *compiler-control-statement*

> Grammar of a subscript declaration:
>
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*可选 *code-block* \
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*可选 *getter-setter-block* \
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*可选 *getter-setter-keyword-block* \
> *subscript-head* → *attributes*可选 *declaration-modifiers*可选 **`subscript`** *generic-parameter-clause*可选 *parameter-clause* \
> *subscript-result* → **`->`** *attributes*可选 *type*

> Grammar of a macro declaration:
>
> *macro-declaration* → *macro-head* *identifier* *generic-parameter-clause*可选 *macro-signature* *macro-definition*可选 *generic-where-clause* \
> *macro-head* → *attributes*可选 *declaration-modifiers*可选 **`macro`**  \
> *macro-signature* → *parameter-clause* *macro-function-signature-result*可选 \
> *macro-function-signature-result* → **`->`** *type* \
> *macro-definition* → **`=`** *expression*

> Grammar of an operator declaration:
>
> *operator-declaration* → *prefix-operator-declaration* | *postfix-operator-declaration* | *infix-operator-declaration*
>
> *prefix-operator-declaration* → **`prefix`** **`operator`** *operator* \
> *postfix-operator-declaration* → **`postfix`** **`operator`** *operator* \
> *infix-operator-declaration* → **`infix`** **`operator`** *operator* *infix-operator-group*可选
>
> *infix-operator-group* → **`:`** *precedence-group-name*

> Grammar of a precedence group declaration:
>
> *precedence-group-declaration* → **`precedencegroup`** *precedence-group-name* **`{`** *precedence-group-attributes*可选 **`}`**
>
> *precedence-group-attributes* → *precedence-group-attribute* *precedence-group-attributes*可选 \
> *precedence-group-attribute* → *precedence-group-relation* \
> *precedence-group-attribute* → *precedence-group-assignment* \
> *precedence-group-attribute* → *precedence-group-associativity*
>
> *precedence-group-relation* → **`higherThan`** **`:`** *precedence-group-names* \
> *precedence-group-relation* → **`lowerThan`** **`:`** *precedence-group-names*
>
> *precedence-group-assignment* → **`assignment`** **`:`** *boolean-literal*
>
> *precedence-group-associativity* → **`associativity`** **`:`** **`left`** \
> *precedence-group-associativity* → **`associativity`** **`:`** **`right`** \
> *precedence-group-associativity* → **`associativity`** **`:`** **`none`**
>
> *precedence-group-names* → *precedence-group-name* | *precedence-group-name* **`,`** *precedence-group-names* \
> *precedence-group-name* → *identifier*

> Grammar of a declaration modifier:
>
> *declaration-modifier* → **`class`** | **`convenience`** | **`dynamic`** | **`final`** | **`infix`** | **`lazy`** | **`optional`** | **`override`** | **`postfix`** | **`prefix`** | **`required`** | **`static`** | **`unowned`** | **`unowned`** **`(`** **`safe`** **`)`** | **`unowned`** **`(`** **`unsafe`** **`)`** | **`weak`** \
> *declaration-modifier* → *access-level-modifier* \
> *declaration-modifier* → *mutation-modifier* \
> *declaration-modifier* → *actor-isolation-modifier* \
> *declaration-modifiers* → *declaration-modifier* *declaration-modifiers*可选
>
> *access-level-modifier* → **`private`** | **`private`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`fileprivate`** | **`fileprivate`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`internal`** | **`internal`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`package`** | **`package`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`public`** | **`public`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`open`** | **`open`** **`(`** **`set`** **`)`**
>
> *mutation-modifier* → **`mutating`** | **`nonmutating`**
>
> *actor-isolation-modifier* → **`nonisolated`**

## Attributes

> Grammar of an attribute:
>
> *attribute* → **`@`** *attribute-name* *attribute-argument-clause*可选 \
> *attribute-name* → *identifier* \
> *attribute-argument-clause* → **`(`** *balanced-tokens*可选 **`)`** \
> *attributes* → *attribute* *attributes*可选
>
> *balanced-tokens* → *balanced-token* *balanced-tokens*可选 \
> *balanced-token* → **`(`** *balanced-tokens*可选 **`)`** \
> *balanced-token* → **`[`** *balanced-tokens*可选 **`]`** \
> *balanced-token* → **`{`** *balanced-tokens*可选 **`}`** \
> *balanced-token* → Any identifier, keyword, literal, or operator \
> *balanced-token* → Any punctuation except  **`(`**,  **`)`**,  **`[`**,  **`]`**,  **`{`**, or  **`}`**

## Patterns

> Grammar of a pattern:
>
> *pattern* → *wildcard-pattern* *type-annotation*可选 \
> *pattern* → *identifier-pattern* *type-annotation*可选 \
> *pattern* → *value-binding-pattern* \
> *pattern* → *tuple-pattern* *type-annotation*可选 \
> *pattern* → *enum-case-pattern* \
> *pattern* → *optional-pattern* \
> *pattern* → *type-casting-pattern* \
> *pattern* → *expression-pattern*

> Grammar of a wildcard pattern:
>
> *wildcard-pattern* → **`_`**

> Grammar of an identifier pattern:
>
> *identifier-pattern* → *identifier*

> Grammar of a value-binding pattern:
>
> *value-binding-pattern* → **`var`** *pattern* | **`let`** *pattern*

> Grammar of a tuple pattern:
>
> *tuple-pattern* → **`(`** *tuple-pattern-element-list*可选 **`)`** \
> *tuple-pattern-element-list* → *tuple-pattern-element* | *tuple-pattern-element* **`,`** *tuple-pattern-element-list* \
> *tuple-pattern-element* → *pattern* | *identifier* **`:`** *pattern*

> Grammar of an enumeration case pattern:
>
> *enum-case-pattern* → *type-identifier*可选 **`.`** *enum-case-name* *tuple-pattern*可选

> Grammar of an optional pattern:
>
> *optional-pattern* → *identifier-pattern* **`?`**

> Grammar of a type casting pattern:
>
> *type-casting-pattern* → *is-pattern* | *as-pattern* \
> *is-pattern* → **`is`** *type* \
> *as-pattern* → *pattern* **`as`** *type*

> Grammar of an expression pattern:
>
> *expression-pattern* → *expression*

## Generic Parameters and Arguments

> Grammar of a generic parameter clause:
>
> *generic-parameter-clause* → **`<`** *generic-parameter-list* **`>`** \
> *generic-parameter-list* → *generic-parameter* | *generic-parameter* **`,`** *generic-parameter-list* \
> *generic-parameter* → *type-name* \
> *generic-parameter* → *type-name* **`:`** *type-identifier* \
> *generic-parameter* → *type-name* **`:`** *protocol-composition-type*
>
> *generic-where-clause* → **`where`** *requirement-list* \
> *requirement-list* → *requirement* | *requirement* **`,`** *requirement-list* \
> *requirement* → *conformance-requirement* | *same-type-requirement*
>
> *conformance-requirement* → *type-identifier* **`:`** *type-identifier* \
> *conformance-requirement* → *type-identifier* **`:`** *protocol-composition-type* \
> *same-type-requirement* → *type-identifier* **`==`** *type*

> Grammar of a generic argument clause:
>
> *generic-argument-clause* → **`<`** *generic-argument-list* **`>`** \
> *generic-argument-list* → *generic-argument* | *generic-argument* **`,`** *generic-argument-list* \
> *generic-argument* → *type*

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
