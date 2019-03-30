# 语法总结（Summary of the Grammar）

## 词法结构 {#lexical_structure}

> 空白字符语法
>
> *空白字符*  → [空白字符项](./02_Lexical_Structure.md#whitespace-item) [空白字符](./02_Lexical_Structure.md#whitespace)<sub>可选</sub>
>
> *空白字符项*  → [换行符](./02_Lexical_Structure.md#line-break)
>
> *空白字符项*   → [注释](./02_Lexical_Structure.md#comment)
>
> *空白字符项*  → [多行注释](./02_Lexical_Structure.md#multiline-comment)
>
> *空白字符项*  → U+0000，U+0009，U+000B，U+000C 或 U+0020
>
>
>
> 换行符*  → U+000A
>
> *换行符*  → U+000D
>
> *换行符*  → U+000D 后面是 U+000A
>
> *注释*  → **//** [单行内容注释](./02_Lexical_Structure.md#comment-text line-break)
>
> *注释*  → **/*** [多行内容注释](./02_Lexical_Structure.md#comment-text line-break) ***/**
>
>
>
> *注释内容*  → [注释内容项](./02_Lexical_Structure.md#comment-text-item) [注释内容](./02_Lexical_Structure.md#comment-text)<sub>可选</sub>  
>
> *注释内容项*  → 除 U+000A 或 U+000D 外的任何 Unicode 标量值
>
>
>
> *多行注释内容*  → [多行注释内容项](./02_Lexical_Structure.md#multiline-comment-text-item) [多行注释内容](./02_Lexical_Structure.md#multiline-comment-text)<sub>可选</sub>  
>
> *多行注释内容项*  → [多行内容](./02_Lexical_Structure.md#multiline-comment)
>
> *多行注释内容项*  → [注释内容项](./02_Lexical_Structure.md#comment-text-item)
>
> *多行注释内容项*  → 除 **/*** 或 ***/** 外的任何 Unicode 标量值
>

<!-- -->

> 标识符语法
>
> *标识符* → [标识符头（Head）](./02_Lexical_Structure.md#identifier_head) [标识符字符集](./02_Lexical_Structure.md#identifier_characters)<sub>可选</sub> 
>
> *标识符* → [标识符头（Head）](./02_Lexical_Structure.md#identifier_head) [标识符字符集](./02_Lexical_Structure.md#identifier_characters)<sub>可选</sub> 
>
> *标识符* → [隐式参数名](./02_Lexical_Structure.md#implicit_parameter_name)
>
> *标识符集* → [标识符](./02_Lexical_Structure.md#identifier) | [标识符](./02_Lexical_Structure.md#identifier) **,** [标识符集](./02_Lexical_Structure.md#identifier_list)
>
> *标识符头（Head）* → 大写或者小写字母 A 到 Z
>
> *标识符头（Head）* → _
>
> *标识符头（Head）* → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, or U+00B7–U+00BA
>
> *标识符头（Head）* → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, or U+00F8–U+00FF
>
> *标识符头（Head）* → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, or U+180F–U+1DBF
>
> *标识符头（Head）* → U+1E00–U+1FFF
>
> *标识符头（Head）* → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, or U+2060–U+206F
>
> *标识符头（Head）* → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, or U+2776–U+2793
>
> *标识符头（Head）* → U+2C00–U+2DFF or U+2E80–U+2FFF
>
> *标识符头（Head）* → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, or U+3040–U+D7FF
>
> *标识符头（Head）* → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, or U+FE30–U+FE44
>
> *标识符头（Head）* → U+FE47–U+FFFD
>
> *标识符头（Head）* → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, or U+40000–U+4FFFD
>
> *标识符头（Head）* → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, or U+80000–U+8FFFD
>
> *标识符头（Head）* → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, or U+C0000–U+CFFFD
>
> *标识符头（Head）* → U+D0000–U+DFFFD or U+E0000–U+EFFFD
>
> *标识符字符* → 数值 0 到 9
>
> *标识符字符* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F
>
> *标识符字符* → [标识符头（Head）](./02_Lexical_Structure.md#identifier_head)
>
> *标识符字符集* → [标识符字符](./02_Lexical_Structure.md#identifier_character) [标识符字符集](./02_Lexical_Structure.md#identifier_characters)<sub>可选</sub> 
>
> *隐式参数名* → **$** [十进制数字集](./02_Lexical_Structure.md#decimal_digits)

<!-- -->

> 字面量语法
>
> *字面量* → [数值型字面量](./02_Lexical_Structure.md#numeric-literal) | [字符串字面量](./02_Lexical_Structure.md#string-literal) | [布尔字面量](./02_Lexical_Structure.md#boolean-literal) | [空字面量](./02_Lexical_Structure.md#nil-literal)
>
> *数值型字面量* → **-**<sub>可选</sub>[整形字面量](./02_Lexical_Structure.md#integer_literal) | **-**<sub>可选</sub>[浮点型字面量](./02_Lexical_Structure.md#floating-point-literal)
>
> *布尔字面量* → **true** | **false**
>
> *空字面量* → **nil**
>

<!-- -->

> 整型字面量语法
>
> *整型字面量* → [二进制字面量](./02_Lexical_Structure.md#binary_literal)
>
> *整型字面量* → [八进制字面量](./02_Lexical_Structure.md#octal_literal)
>
> *整型字面量* → [十进制字面量](./02_Lexical_Structure.md#decimal_literal)
>
> *整型字面量* → [十六进制字面量](./02_Lexical_Structure.md#hexadecimal_literal)
>
> *二进制字面量* → **0b** [二进制数字](./02_Lexical_Structure.md#binary_digit) [二进制字面量字符集](./02_Lexical_Structure.md#binary_literal_characters)<sub>可选</sub> 
>
> *二进制数字* → 数值 0 到 1
>
> *二进制字面量字符* → [二进制数字](./02_Lexical_Structure.md#binary_digit) | **_**
>
> *二进制字面量字符集* → [二进制字面量字符](./02_Lexical_Structure.md#binary_literal_character) [二进制字面量字符集](./02_Lexical_Structure.md#binary_literal_characters)<sub>可选</sub> 
>
> *八进制字面量* → **0o** [八进制数字](./02_Lexical_Structure.md#octal_digit) [八进制字符集](./02_Lexical_Structure.md#octal_literal_characters)<sub>可选</sub> 
>
> *八进字数字* → 数值 0 到 7
>
> *八进制字符* → [八进制数字](./02_Lexical_Structure.md#octal_digit) | **_**
>
> *八进制字符集* → [八进制字符](./02_Lexical_Structure.md#octal_literal_character) [八进制字符集](./02_Lexical_Structure.md#octal_literal_characters)<sub>可选</sub> 
>
> *十进制字面量* → [十进制数字](./02_Lexical_Structure.md#decimal_digit) [十进制字符集](./02_Lexical_Structure.md#decimal_literal_characters)<sub>可选</sub> 
>
> *十进制数字* → 数值 0 到 9
>
> *十进制数字集* → [十进制数字](./02_Lexical_Structure.md#decimal_digit) [十进制数字集](./02_Lexical_Structure.md#decimal_digits)<sub>可选</sub> 
>
> *十进制字面量字符* → [十进制数字](./02_Lexical_Structure.md#decimal_digit) | **_**
>
> *十进制字面量字符集* → [十进制字面量字符](./02_Lexical_Structure.md#decimal_literal_character) [十进制字面量字符集](./02_Lexical_Structure.md#decimal_literal_characters)<sub>可选</sub> 
>
> *十六进制字面量* → **0x** [十六进制数字](./02_Lexical_Structure.md#hexadecimal_digit) [十六进制字面量字符集](./02_Lexical_Structure.md#hexadecimal_literal_characters)<sub>可选</sub> 
>
> *十六进制数字* → 数值 0 到 9，a 到 f，或者 A 到 F
>
> *十六进制字符* → [十六进制数字](./02_Lexical_Structure.md#hexadecimal_digit) | **_**
>
> *十六进制字面量字符集* → [十六进制字符](./02_Lexical_Structure.md#hexadecimal_literal_character) [十六进制字面量字符集](./02_Lexical_Structure.md#hexadecimal_literal_characters)<sub>可选</sub> 
>

<!-- -->

> 浮点型字面量语法
>
> *浮点数字面量* → [十进制字面量](./02_Lexical_Structure.md#decimal_literal) [十进制分数](./02_Lexical_Structure.md#decimal_fraction)<sub>可选</sub>[十进制指数](./02_Lexical_Structure.md#decimal_exponent)<sub>可选</sub> 
>
> *浮点数字面量* → [十六进制字面量](./02_Lexical_Structure.md#hexadecimal_literal) [十六进制分数](./02_Lexical_Structure.md#hexadecimal_fraction)<sub>可选</sub>[十六进制指数](./02_Lexical_Structure.md#hexadecimal_exponent)
>
> *十进制分数* → **.** [十进制字面量](./02_Lexical_Structure.md#decimal_literal)
>
> *十进制指数* → [浮点数 e](./02_Lexical_Structure.md#floating_point_e) [正负号](./02_Lexical_Structure.md#sign)<sub>可选</sub>[十进制字面量](./02_Lexical_Structure.md#decimal_literal)
>
> *十六进制分数* → **.** [十六进制数](./02_Lexical_Structure.md#hexadecimal_literal)
>
> *十六进制指数* → [浮点数 p](./02_Lexical_Structure.md#floating_point_p) [正负号](./02_Lexical_Structure.md#sign)<sub>可选</sub>[十六进制字面量](./02_Lexical_Structure.md#hexadecimal_literal)
>
> *浮点数 e* → **e** | **E**
>
> *浮点数 p* → **p** | **P**
>
> *正负号* → **+** | **-**
>

<!-- -->

> 字符串型字面量语法

> *字符串字面量* → [静态字符串字面量](./02_Lexical_Structure.md#static-string-literal) | [插值字符串字面量](./02_Lexical_Structure.md#interpolated-string-literal)
>
> *字符串开分隔定界符* → [字符串扩展分隔符](./02_Lexical_Structure.md#extended-string-literal-delimiter) **"**
>
> *字符串闭分隔定界符* → **"** [字符串扩展分隔符](./02_Lexical_Structure.md#extended-string-literal-delimiter)<sub>可选</sub>
>
> *静态字符串字面量* → [字符串开分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter) [引用文本](./02_Lexical_Structure.md#quoted-text)<sub>可选</sub> [字符串闭分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter)
>
> *静态字符串字面量* → [多行字符串开分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter) [多行引用文本](./02_Lexical_Structure.md#multiline-quoted-text)<sub>可选</sub> [多行字符串闭分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter)
>
> *多行字符串开分隔定界符* → [字符串扩展分隔符](./02_Lexical_Structure.md#extended-string-literal-delimiter) **"""**
>
> *多行字符串闭分隔定界符* → **"""** [字符串扩展分隔符](./02_Lexical_Structure.md#extended-string-literal-delimiter)
>
> *字符串扩展分隔符* → **#** [字符串扩展分隔符](./02_Lexical_Structure.md#extended-string-literal-delimiter)<sub>可选</sub>
>
> *引用文本* → [引用文本项](./02_Lexical_Structure.md#quoted-text-item) [引用文本](#quoted-text)<sub>可选</sub>
>
> *引用文本项* → [转义字符](./02_Lexical_Structure.md#escaped-character)
>
> *引用文本项* → 除了 **"**、**\\**、U+000A、U+000D 以外的所有 Unicode 字符
>
> *多行引用文本* → [多行引用文本项](./02_Lexical_Structure.md#multiline-quoted-text-item) [多行引用文本](./02_Lexical_Structure.md#multiline-quoted-text)<sub>可选</sub>
>
> *多行引用文本项* [转义字符](./02_Lexical_Structure.md#escaped-character)<sub>可选</sub>
>
> *多行引用文本* → 除了 **\** 以外的任何Unicode标量值
>
> *多行引用文本* → [转义换行](./02_Lexical_Structure.md#escaped-newline)
>
> *插值字符串字面量* → [字符串开分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter) [插值文本](./02_Lexical_Structure.md#interpolated-text)<sub>可选</sub> [字符串闭分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter)
>
> *插值字符串字面量* → [多行字符串开分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter) [插值文本](./02_Lexical_Structure.md#interpolated-text)<sub>可选</sub> [多行字符串闭分隔定界符](./02_Lexical_Structure.md#extended-string-literal-delimiter)
>
> *插值文本* → [插值文本项](./02_Lexical_Structure.md#interpolated-text-item) [插值文本](./02_Lexical_Structure.md#interpolated-text)<sub>可选</sub>
>
> *插值文本项* → **\\**(**[表达式](./04_Expressions.md)**) | [引用文本项](./02_Lexical_Structure.md#quoted-text-item)
>
> *多行插值文本* → [多行插值文本项](./02_Lexical_Structure.md#multiline-quoted-text-item) [多行插值文本](./02_Lexical_Structure.md#multiline-quoted-text)<sub>可选</sub>
>
> *多行插值文本项* → **\\(** [表达式](./04_Expressions.md) **)** | [多行引用文本项](./02_Lexical_Structure.md#multiline-quoted-text-item)
>
> *转义序列* → **\\** [字符串扩展分隔符](./02_Lexical_Structure.md#extended-string-literal-delimiter)
>
> *转义字符* → [转义序列](./02_Lexical_Structure.md#escape-sequence) **0** | [转义序列](./02_Lexical_Structure.md#escape-sequence) **\\** | [转义序列](./02_Lexical_Structure.md#escape-sequence) **t** | [转义序列](#escape-sequence) **n** | [转义序列](./02_Lexical_Structure.md#escape-sequence) **r** | [转义序列](./02_Lexical_Structure.md#escape-sequence) **\"** | [转义序列](./02_Lexical_Structure.md#escape-sequence) **'**
>
> *转义字符* → [转义序列](./02_Lexical_Structure.md#escape-sequence) **u {** [unicode 标量数字](./02_Lexical_Structure.md#unicode-scalar-digits) **}**
>
> *unicode 标量数字* → 一到八位的十六进制数字
>
> *转义换行符* → [转义序列](./02_Lexical_Structure.md#escape-sequence) [空白](./02_Lexical_Structure.md#whitespace)<sub>可选</sub> [断行符](./02_Lexical_Structure.md#line-break)


<!-- -->

> 运算符语法语法
>
> *运算符* → [运算符头](./02_Lexical_Structure.md#operator_character) [运算符字符集](./02_Lexical_Structure.md#operator)<sub>可选</sub> 
>
> *运算符* → [点运算符头](./02_Lexical_Structure.md#dot-operator-head) [点运算符字符集](./02_Lexical_Structure.md#dot-operator-characters)<sub>可选</sub> 
>
> *运算符字符* → **/** | **=** | **-** | **+** | **!** | **&#42;** | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **?**
>
> *运算符头* → U+00A1–U+00A7
>
> *运算符头* → U+00A9 or U+00AB
>
> *运算符头* →  U+00AC or U+00AE
>
> *运算符头* → U+00B0–U+00B1, U+00B6, U+00BB, U+00BF, U+00D7, or U+00F7
>
> *运算符头* → U+2016–U+2017 or U+2020–U+2027
>
> *运算符头* → U+2030–U+203E
>
> *运算符头* → U+2041–U+2053
>
> *运算符头* → U+2055–U+205E
>
> *运算符头* → U+2190–U+23FF
>
> *运算符头* → U+2500–U+2775
>
> *运算符头* → U+2794–U+2BFF
>
> *运算符头* → U+2E00–U+2E7F
>
> *运算符头* → U+3001–U+3003
>
> *运算符头* → U+3008–U+3030
>
> *运算符字符* → [运算符头](./02_Lexical_Structure.md#operator-head)
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
> *运算符字符集* → [运算符字符](./02_Lexical_Structure.md#operator-character) [运算符字符集](./02_Lexical_Structure.md#operator-characters)<sub>可选</sub> 
>
> *点运算符头* → **..**
>
> *点运算符字符* → **.** | [运算符字符](./02_Lexical_Structure.md#operator-character)
>
> *点运算符字符集* → [点运算符字符](./02_Lexical_Structure.md#dot-operator-character) [点运算符字符集](./02_Lexical_Structure.md#dot-operator-characters)<sub>可选</sub> 
>
> *二元运算符* → [运算符](./02_Lexical_Structure.md#operator)
>
> *前置运算符* → [运算符](./02_Lexical_Structure.md#operator)
>
> *后置运算符* → [运算符](./02_Lexical_Structure.md#operator)
>

## 类型 {#types}

> 类型语法
>
> *类型* → [数组类型](./03_Types.md#array_type)
>
> *类型* → [字典类型](./03_Types.md#dictionary-type)
>
> *类型* → [函数类型](./03_Types.md#function_type)
>
> *类型* → [类型标识符](./03_Types.md#type_identifier)
>
> *类型* → [元组类型](./03_Types.md./03_Types.md#tuple_type)
>
> *类型* → [可选类型](./03_Types.md#optional_type)
>
> *类型* → [隐式解析可选类型](./03_Types.md#implicitly_unwrapped_optional_type)
>
> *类型* → [协议合成类型](./03_Types.md#protocol_composition_type)
>
> *类型* → **Any**
>
> *类型* → **Self**
>
> *类型* → **（** [type](./03_Types.md#metatype_type) **）**

<!-- -->

> 类型注解语法
>
> *类型注解* → **:** [属性（Attributes）集](./07_Attributes.md#attributes)<sub>可选</sub>[类型](./03_Types.md#type)

<!-- -->

> 类型标识语法
>
> *类型标识* → [类型名称](./03_Types.md#type_name) [泛型参数从句](./09_Generic_Parameters_and_Arguments.md#generic_argument_clause)<sub>可选</sub>| [类型名称](./03_Types.md#type_name) [泛型参数从句](./09_Generic_Parameters_and_Arguments.md#generic_argument_clause)<sub>可选</sub>**.** [类型标识符](./03_Types.md#type_identifier)
>
> *类型名* → [标识符](./02_Lexical_Structure.md#identifier)
>

<!-- -->

> 元组类型语法
>
> *元组类型* → **(** **)** | **(** [元组类型元素](./03_Types.md#tuple-type-element) **,** [元组类型元素列表](./03_Types.md#tuple-type-element-list) **)**
>
> *元组类型元素列表* → [元组类型元素](./03_Types.md#tuple-type-element) | [元组类型元素](./03_Types.md#tuple-type-element) **,** [元组类型元素列表](./03_Types.md#tuple-type-element-list)
>
> *元组类型元素* → [元素名](./03_Types.md#element-name) [类型注解](./03_Types.md#type-annotation) | [类型](./03_Types.md#type)
>
> *元素名* → [标识符](./02_Lexical_Structure.md#identifier)

<!-- -->

> 函数类型语法
>
> *函数类型* → [类型](./03_Types.md#type)  **throws**<sub>可选</sub>**->** [类型](./03_Types.md#type)
>
> *函数类型* → [类型](./03_Types.md#)  **rethrows** **->** [类型](./03_Types.md#)
> 
> *函数类型子句* → **(**­  **)**­
> 
> *函数类型子句* → **(** [函数类型参数列表](./03_Types.md#function-type-argument-list) *...*­<sub>可选</sub> **)**
> 
> *函数类型参数列表* → [函数类型参数](./03_Types.md#function-type-argument) | [函数类型参数](function-type-argument)， [函数类型参数列表](./03_Types.md#function-type-argument-list)
> 
> *函数类型参数* → [特性列表](./07_Attributes.md#attributes)<sub>可选</sub> **输入输出参数**<sub>可选</sub> [类型](#type) | [参数标签](#argument-label) [类型注解](#type-annotation)
> 
> *参数标签* → [标识符](./02_Lexical_Structure.md#identifier)

<!-- -->

> 数组类型语法
>
> *数组类型* → **[** [*类型*](./03_Types.md#array_type) **]**

<!-- -->
> 字典类型语法
>
> *字典类型* → **[** [类型 **:** 类型](./03_Types.md#type) **]**

<!-- -->

> 可选类型语法
>
> *可选类型* → [类型](./03_Types.md#type) **?**
>

<!-- -->

> 隐式解析可选类型（Implicitly Unwrapped Optional Type）语法
>
> *隐式解析可选类型* → [类型](./03_Types.md#type) **!**
>

<!-- -->

> 协议合成类型语法
>
> *协议合成类型* → [类型标识符](./03_Types.md#type_identifier) | [协议合成延续](./03_Types.md#protocol-composition-continuation)
>
> *协议持续延续* → [类型标识符](./03_Types.md#type_identifier) | [协议合成类型](./03_Types.md#protocol-composition-type)

<!-- -->

> 元（Metatype）类型语法
>
> *元类型* → [类型](./03_Types.md#type) **.** **Type** | [类型](./03_Types.md#type) **.** **Protocol**

<!-- -->

> 类型继承从句语法
>
> *类型继承从句* → **:** [类型继承集](./03_Types.md#type_inheritance_list)
>
> *类型继承集* → [类型标识符](./03_Types.md#type_identifier) | [类型标识符](./03_Types.md#type_identifier) **,** [类型继承集](./03_Types.md#type_inheritance_list)
>
> *类条件* → **class**

