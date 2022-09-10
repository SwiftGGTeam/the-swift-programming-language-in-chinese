# 语法总结（Summary of the Grammar）

## 词法结构 {#lexical-structure}

> 空白字符语法
>
> *空白字符*  → [空白字符项](./02_Lexical_Structure.md#whitespace-item) [空白字符](./02_Lexical_Structure.md#whitespace)<sub>可选</sub>
>
> *空白字符项*  → [换行符](./02_Lexical_Structure.md#line-break)
>
> *空白字符项* → [内联空间](./02_Lexical_Structure.md#ginline-space)
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
>
>
> *注释*  → **//** [单行内容注释](./02_Lexical_Structure.md#comment-text) [换行符](./02_Lexical_Structure.md#line-break)
>
> *注释*  → **/\*** [多行内容注释](./02_Lexical_Structure.md#multiline-comment-text) **\*/**
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
> *多行注释内容项*  → 除 **/\*** 或 **\*/** 外的任何 Unicode 标量值
>

<!-- -->

> 标识符语法
>
> *标识符* → [标识符头（Head）](./02_Lexical_Structure.md#identifier-head) [标识符字符集](./02_Lexical_Structure.md#identifier-characters)<sub>可选</sub> 
>
> *标识符* → [标识符头（Head）](./02_Lexical_Structure.md#identifier-head) [标识符字符集](./02_Lexical_Structure.md#identifier-characters)<sub>可选</sub> 
>
> *标识符* → [隐式参数名](./02_Lexical_Structure.md#implicit-parameter-name)
>
> *标识符* → [属性包装器呈现值](./02_Lexical_Structure.md#property-wrapper-projection)
>
> *标识符集* → [标识符](./02_Lexical_Structure.md#identifier) | [标识符](./02_Lexical_Structure.md#identifier) **,** [标识符集](./02_Lexical_Structure.md#identifier-list)
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
> *标识符字符* → [标识符头（Head）](./02_Lexical_Structure.md#identifier-head)
>
> *标识符字符集* → [标识符字符](./02_Lexical_Structure.md#identifier-character) [标识符字符集](./02_Lexical_Structure.md#identifier-characters)<sub>可选</sub> 
>
> *隐式参数名* → **$** [十进制数字集](./02_Lexical_Structure.md#decimal-digits)
>
> *属性包装器呈现值* → **$**  [标识符字符集](./02_Lexical_Structure.md#identifier-characters)
>

<!-- -->

> 字面量语法
>
> *字面量* → [数值型字面量](./02_Lexical_Structure.md#numeric-literal) | [字符串字面量](./02_Lexical_Structure.md#string-literal) | [正则表达式字面量](./02_Lexical_Structure.md#regular-expression-literal)  | [布尔字面量](./02_Lexical_Structure.md#boolean-literal) | [空字面量](./02_Lexical_Structure.md#nil-literal)
>
> *数值型字面量* → **-**<sub>可选</sub>[整形字面量](./02_Lexical_Structure.md#integer-literal) | **-**<sub>可选</sub>[浮点型字面量](./02_Lexical_Structure.md#floating-point-literal)
>
> *布尔字面量* → **true** | **false**
>
> *空字面量* → **nil**
>

<!-- -->

> 整型字面量语法
>
> *整型字面量* → [二进制字面量](./02_Lexical_Structure.md#binary-literal)
>
> *整型字面量* → [八进制字面量](./02_Lexical_Structure.md#octal-literal)
>
> *整型字面量* → [十进制字面量](./02_Lexical_Structure.md#decimal-literal)
>
> *整型字面量* → [十六进制字面量](./02_Lexical_Structure.md#hexadecimal-literal)
>
> *二进制字面量* → **0b** [二进制数字](./02_Lexical_Structure.md#binary-digit) [二进制字面量字符集](./02_Lexical_Structure.md#binary-literal-characters)<sub>可选</sub> 
>
> *二进制数字* → 数值 0 到 1
>
> *二进制字面量字符* → [二进制数字](./02_Lexical_Structure.md#binary-digit) | **-**
>
> *二进制字面量字符集* → [二进制字面量字符](./02_Lexical_Structure.md#binary-literal-character) [二进制字面量字符集](./02_Lexical_Structure.md#binary-literal-characters)<sub>可选</sub> 
>
> *八进制字面量* → **0o** [八进制数字](./02_Lexical_Structure.md#octal-digit) [八进制字符集](./02_Lexical_Structure.md#octal-literal-characters)<sub>可选</sub> 
>
> *八进字数字* → 数值 0 到 7
>
> *八进制字符* → [八进制数字](./02_Lexical_Structure.md#octal-digit) | **-**
>
> *八进制字符集* → [八进制字符](./02_Lexical_Structure.md#octal-literal-character) [八进制字符集](./02_Lexical_Structure.md#octal-literal-characters)<sub>可选</sub> 
>
> *十进制字面量* → [十进制数字](./02_Lexical_Structure.md#decimal-digit) [十进制字符集](./02_Lexical_Structure.md#decimal-literal-characters)<sub>可选</sub> 
>
> *十进制数字* → 数值 0 到 9
>
> *十进制数字集* → [十进制数字](./02_Lexical_Structure.md#decimal-digit) [十进制数字集](./02_Lexical_Structure.md#decimal-digits)<sub>可选</sub> 
>
> *十进制字面量字符* → [十进制数字](./02_Lexical_Structure.md#decimal-digit) | **-**
>
> *十进制字面量字符集* → [十进制字面量字符](./02_Lexical_Structure.md#decimal-literal-character) [十进制字面量字符集](./02_Lexical_Structure.md#decimal-literal-characters)<sub>可选</sub> 
>
> *十六进制字面量* → **0x** [十六进制数字](./02_Lexical_Structure.md#hexadecimal-digit) [十六进制字面量字符集](./02_Lexical_Structure.md#hexadecimal-literal-characters)<sub>可选</sub> 
>
> *十六进制数字* → 数值 0 到 9，a 到 f，或者 A 到 F
>
> *十六进制字符* → [十六进制数字](./02_Lexical_Structure.md#hexadecimal-digit) | **-**
>
> *十六进制字面量字符集* → [十六进制字符](./02_Lexical_Structure.md#hexadecimal-literal-character) [十六进制字面量字符集](./02_Lexical_Structure.md#hexadecimal-literal-characters)<sub>可选</sub> 
>

<!-- -->

> 浮点型字面量语法
>
> *浮点数字面量* → [十进制字面量](./02_Lexical_Structure.md#decimal-literal) [十进制分数](./02_Lexical_Structure.md#decimal-fraction)<sub>可选</sub>[十进制指数](./02_Lexical_Structure.md#decimal-exponent)<sub>可选</sub> 
>
> *浮点数字面量* → [十六进制字面量](./02_Lexical_Structure.md#hexadecimal-literal) [十六进制分数](./02_Lexical_Structure.md#hexadecimal-fraction)<sub>可选</sub>[十六进制指数](./02_Lexical_Structure.md#hexadecimal-exponent)
>
> *十进制分数* → **.** [十进制字面量](./02_Lexical_Structure.md#decimal-literal)
>
> *十进制指数* → [浮点数 e](./02_Lexical_Structure.md#floating-point-e) [正负号](./02_Lexical_Structure.md#sign)<sub>可选</sub>[十进制字面量](./02_Lexical_Structure.md#decimal-literal)
>
> *十六进制分数* → **.** [十六进制数](./02_Lexical_Structure.md#hexadecimal-literal)
>
> *十六进制指数* → [浮点数 p](./02_Lexical_Structure.md#floating-point-p) [正负号](./02_Lexical_Structure.md#sign)<sub>可选</sub>[十六进制字面量](./02_Lexical_Structure.md#hexadecimal-literal)
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
> *引用文本项* → 除了 **"**、**\\\**、U+000A、U+000D 以外的所有 Unicode 字符    
>
> *多行引用文本* → [多行引用文本项](./02_Lexical_Structure.md#multiline-quoted-text-item) [多行引用文本](./02_Lexical_Structure.md#multiline-quoted-text)<sub>可选</sub>
>
> *多行引用文本项* [转义字符](./02_Lexical_Structure.md#escaped-character)<sub>可选</sub>
>
> *多行引用文本* → 除了 **\\** 以外的任何 Unicode 标量值
>
> *多行引用文本* → [转义换行](./02_Lexical_Structure.md#escaped-newline)

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
> *转义换行符* → [转义序列](./02_Lexical_Structure.md#escape-sequence) [空白](./02_Lexical_Structure.md#whitespace)<sub>可选</sub> [换行符](./02_Lexical_Structure.md#line-break)

<!-- -->

> 正则表达式字面量语法
> 
> *正则表达式字面量* → [正则表达式字面量开分隔定界符](./02_Lexical_Structure.md#regular-expression-literal-opening-delimiter) [正则表达式](./02_Lexical_Structure.md#regular-expression) [正则表达式字面量闭分隔定界符](./02_Lexical_Structure.md#regular-expression-literal-closing-delimiter)
> 
> *正则表达式* → 任何正则表达式
> 
> *正则表达式字面量开分隔定界符* → [正则表达式扩展分隔符](./02_Lexical_Structure.md#grammar_extended-regular-expression-literal-delimiter)<sub>可选</sub> **/**
> 
> *正则表达式字面量闭分割定界符* → **/** [正则表达式扩展分隔符](./02_Lexical_Structure.md#grammar_extended-regular-expression-literal-delimiter)<sub>可选</sub>
> 
> *正则表达式扩展分隔符* → **#** [正则表达式扩展分隔符](./02_Lexical_Structure.md#grammar_extended-regular-expression-literal-delimiter)<sub>可选</sub>

<!-- -->

> 运算符语法语法
>
> *运算符* → [运算符头](./02_Lexical_Structure.md#operator-character) [运算符字符集](./02_Lexical_Structure.md#operator)<sub>可选</sub> 
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
> *类型* → [数组类型](./03_Types.md#array-type)
>
> *类型* → [字典类型](./03_Types.md#dictionary-type)
>
> *类型* → [函数类型](./03_Types.md#function-type)
>
> *类型* → [类型标识符](./03_Types.md#type-identifier)
>
> *类型* → [元组类型](./03_Types.md./03_Types.md#tuple-type)
>
> *类型* → [可选类型](./03_Types.md#optional-type)
>
> *类型* → [隐式解析可选类型](./03_Types.md#implicitly-unwrapped-optional-type)
>
> *类型* → [协议合成类型](./03_Types.md#protocol-composition-type)
>
> *类型* → [隐含类型](./03_Types.md#opaque-type)
>
> *类型* → [元类型](./03_Types.md#metatype-type)
>
> *类型* → [任意类型](./03_Types.md#any-type)
>
> *类型* → [自身类型](./03_Types.md#self-type)
>
> *类型* → **（** [type](./03_Types.md#metatype-type) **）**

<!-- -->

> 类型注解语法
>
> *类型注解* → **:** [属性（Attributes）集](./07_Attributes.md#attributes)<sub>可选</sub>[类型](./03_Types.md#type)

<!-- -->

> 类型标识语法
>
> *类型标识* → [类型名称](./03_Types.md#type-name) [泛型参数从句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub>| [类型名称](./03_Types.md#type-name) [泛型参数从句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub>**.** [类型标识符](./03_Types.md#type-identifier)
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
> *函数类型* → [类型](./03_Types.md#type) [函数类型子句](.03/Types.md#function-type-argument-clause) **async**<sub>可选</sub> **throws**<sub>可选</sub>**->** [类型](./03_Types.md#type)
>
> *函数类型* → [类型](./03_Types.md#)  **rethrows** **->** [类型](./03_Types.md#)
> 
> *函数类型子句* → **(** **)**
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
> *数组类型* → **[** [*类型*](./03_Types.md#array-type) **]**

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
> *协议合成类型* → [类型标识符](./03_Types.md#type-identifier) | [协议合成延续](./03_Types.md#protocol-composition-continuation)
>
> *协议持续延续* → [类型标识符](./03_Types.md#type-identifier) | [协议合成类型](./03_Types.md#protocol-composition-type)

<!-- -->

> 元（Metatype）类型语法
>
> *元类型* → [类型](./03_Types.md#type) **.** **Type** | [类型](./03_Types.md#type) **.** **Protocol**

<!-- -->

> 类型继承从句语法
>
> *类型继承从句* → **:** [类型继承集](./03_Types.md#type-inheritance-list)
>
> *类型继承集* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [类型标识符](./03_Types.md#type-identifier) | [特性](./07_Attributes.md#attributes)<sub>可选</sub> [类型标识符](./03_Types.md#type-identifier) **,** [类型继承集](./03_Types.md#type-inheritance-list)
>
> *类条件* → **class**

## 表达式 {#expressions}

> 表达式语法
>
> *表达式* → [try 运算符](./04_Expressions.md#try-operator)<sub>可选</sub> [前缀表达式](./04_Expressions.md#prefix-expression) [二元表达式列表](./04_Expressions.md#binary-expressions)
>
> *表达式列表* → [表达式](./04_Expressions.md#expression)|[表达式](./04_Expressions.md#expression), [表达式列表](./04_Expressions.md#expression-list)
>

<!-- -->

> 前缀表达式语法
>
> *前缀表达式* → [前缀操作符]()<sub>可选</sub> [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *前缀表达式* → [输入输出表达式](./04_Expressions.md#in-out-expression)
>
> *输入输出表达式* → **&** [标识符](./02_Lexical_Structure.md#identifier)
>

<!-- -->

>try 表达式语法
>
> *try 操作符* → **try** | **try ? ** | ** try ! **
>

<!-- -->

> await 表达式语法
>
> *await 操作符* → **await**

<!-- -->

> 中缀表达式语法
>
> *中缀表达式* → [中缀运算符](./02_Lexical_Structure.md#infix-operator) [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *中缀表达式* → [赋值操作符](./06_Declarations.md#class-declaration) [try 运算符](./04_Expressions.md#try-operator)<sub>可选</sub> [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *中缀表达式* → [条件运算符](./04_Expressions.md#conditional-operator) [try 运算符](./04_Expressions.md#try-operator)<sub>可选</sub> [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *中缀表达式* → [类型转换运算符](./04_Expressions.md#type-casting-operator)
>
> *中缀表达式* → [中缀表达式](./04_Expressions.md#infix-expression) [中缀表达式列表](./04_Expressions.md#infix-expressions)<sub>可选</sub>
>

<!-- -->

> 赋值操作符语法
>
> *赋值运算符* → [=]
>

<!-- -->

> 条件运算符
>
> *条件运算符* → [?] [表达式](./04_Expressions.md#expression):

> 类型转换运算符语法
>
> *类型转换运算符* → [is] [类型](./03_Types.md#type)
>
> *类型转换运算符* → [as] [类型](./03_Types.md#type)
>
> *类型转换运算符* → [as ?] [类型](./03_Types.md#type)
>
> *类型转换运算符* → [as !] [类型](./03_Types.md#type)
>


<!-- -->

> 基础表达式语法
>
> *基础表达式* → [标识符](./02_Lexical_Structure.md#identifier) [泛型实参子句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub>
>
> *基础表达式* → [字面量表达式](./04_Expressions.md#literal-expression)
>
> *基础表达式* → [self 表达式](./04_Expressions.md#self-expression)
>
> *基础级表达式* → [父类表达式](./04_Expressions.md#superclass-expression)
>
> *基础表达式* → [闭包表达式](./04_Expressions.md#closure-expression)
>
> *基础表达式* → [圆括号表达式](./04_Expressions.md#parenthesized-expression)
>
> *基础表达式* → [元组表达式](./04_Expressions.md#Tuple-Expression)
>
> *基础表达式* → [隐式成员表达式](./04_Expressions.md#implicit-member-expression)
>
> *基础表达式* → [通配符表达式](./04_Expressions.md#wildcard-expression)
>
> *基础表达式* → [key-path表达式](./04_Expressions.md#key-path-expression)
>
> *基础表达式* → [选择器表达式](./04_Expressions.md#selector-expression)
>
> *基础表达式* → [key-path 字符串表达式](./04_Expressions.md#key-patch-string-expression)

<!-- -->

> 字面量表达式语法
>
> *字面量表达式* → [字面量](./04_Expressions.md#literal-expression)
>
> *字面量表达式* → [数组字面量](./04_Expressions.md#array-literal) | [字典字面量](./04_Expressions.md#dictionary-literal) | [练习场字面量](./04_Expressions.md#playground-literal)
>
> *字面量表达式* → **#file** | **#filePath** | **#line** | **#column** | **#function** | **dsohandle**
>
>*数组字面量* → **[** [数组字面量项列表](./04_Expressions.md#array-literal-items)<sub>可选</sub> **]**
> *数组字面量项列表* → [数组字面量项](./04_Expressions.md#array-literal-item)<sub>可选</sub> | [数组字面量项](./04_Expressions.md#array-literal-item),[数组字面量项列表](./04_Expressions.md#array-literal-items)
> *数组字面量项* → [表达式](./04_Expressions.md#expression)
> 
>
>*字典字面量* → [[字典字面量项列表](./04_Expressions.md#dictionary-literal-items) **]** | **[** **:** **]**
> 
> 
> *字典字面量项列表* → [字典字面量项](./04_Expressions.md#dictionary-literal-item) ,**<sub>可选</sub> | [字典字面量项](./04_Expressions.md#dictionary-literal-item) ,[字典字面量项列表](./04_Expressions.md#dictionary-literal-items)
> 
>*字典字面量项* → [表达式](./04_Expressions.md#expression) **:** [表达式](./04_Expressions.md#expression)
> 
>
> *palyground 字面量* → **#colorLiteral ( red :  [表达式](./04_Expressions.md#expression) , green :[表达式](./04_Expressions.md#expression),  blue :[表达式](./04_Expressions.md#expression) , alpha : [表达式](./04_Expressions.md#expression) )**
> 
>*playground 字面量* → **#fileLiteral ( resourceName : [表达式](#expression) )**
> 
>*playground 字面量* → **#imageLiteral ( resourceName : [表达式](#expression) )
> <!-- -->

> self 表达式语法
> 
> *self 表达式* → **self**  | [self 方法表达式](./04_Expressions.md#self-method-expression) ｜ [self 下标表达式](./04_Expressions.md#self-subscript-expression) | [self 构造器表达式](./04_Expressions.md#self-initializer-expression)
>
>
> *self 方法表达式* → **self** **.** [标识符](./02_Lexical_Structure.md#identifier)
>
> *self 下标表达式* → **self** **[** [函数调用参数表](./04_Expressions.md#function-call-argument-list­) **]**
>
> *self 构造器表达式* → **self** **.** **init**

<!-- -->

> 父类表达式语法
>
> *父类表达式* → [父类方法表达式](./04_Expressions.md#superclass-method-expression) | [父类下标表达式](./04_Expressions.md#superclass-subscript-expression) | [父类构造器表达式](./04_Expressions.md#superclass-initializer-expression)
>
> *父类方法表达式* → **super** **.** [标识符](./02_Lexical_Structure.md#identifier)
> 
> *父类下标表达式* → **super** [[函数调用参数表](./04_Expressions.md#function-call-argument-list­) **]**
>
> *父类构造器表达式* → **super** **.** **init**
> 


<!-- -->

> 闭包表达式语法
>
> *闭包表达式* → **{** [闭包签名](./04_Expressions.md#closure-signature)<sub>可选</sub> [语句](./04_Expressions.md#statements) **}**
>
>
> *闭包签名* → [捕获列表](./04_Expressions.md#capture-list) [参数子句](./04_Expressions.md#parameter-clause) **async**<sub>可选</sub> **throws**<sub>可选</sub> [函数结果](./06_Declarations.md#function-result)<sub>可选</sub> **in**
> 
> *闭包签名* → [标识符列表](./04_Expressions.md#identifier-list) [函数结果](./06_Declarations.md#function-result)<sub>可选</sub> **in**
> 
>
> *闭包参数子句* **(** **)** | **(** [闭包参数列表](./04_Expressions.md#closure-parameter-list) | [标识符列表](./04_Expressions.md#identifier-list) **)**
>
> *闭包参数列表* [闭包参数](./04_Expressions.md#implicit-member-expression) | [闭包参数](./04_Expressions.md#implicit-member-expression), [闭包参数列表](./04_Expressions.md#implicit-member-expression)
>
> *闭包参数* [闭包参数名](./04_Expressions.md#implicit-member-expression) [类型声明](./03_Types.md#type-annotation) <sub>可选</sub>
>
> *闭包参数* [闭包参数名](./04_Expressions.md#implicit-member-expression) [类型声明](./03_Types.md#type-annotation) **...**
>
> *闭包参数名* [标识符](./02_Lexical_Structure.md#identifier)
> 
>
> *捕获列表* → [捕获列表](./04_Expressions.md#capture-list) **[** [捕获列表项列表](./04_Expressions.md#capture-list-items) **]**
>
> *捕获列表项列表* → [捕获列表项](./04_Expressions.md#capture-list-item) | [捕获列表项](./04_Expressions.md#capture-list-item) **,** [捕获列表项列表](./04_Expressions.md#capture-list-items)
>
> *捕获列表项* → [捕获说明符](./04_Expressions.md#capture-specifier)<sub>可选</sub> [*表达式*](./04_Expressions.md#expression)
>
> *捕获说明符* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**
> 


<!-- -->

> 隐式成员表达式语法
>
> *隐式成员表达式* → **.** [标识符](./02_Lexical_Structure.md#identifier)
>

<!-- -->

> 圆括号表达式语法
>
> *圆括号表达式* → **( [表达式](./04_Expressions.md#expression) )**
> 

<!-- -->

> 元组表达式语法
>
> *元组表达式* → **( )** | **(**[元组元素](./04_Expressions.md#tuple-element)， [元组元素列表](./04_Expressions.md#tuple-element-list) **)**
> 
> *元组元素列表* → [元组元素](./04_Expressions.md#tuple-element) | [元组元素](./04_Expressions.md#tuple-element) **,** [元组元素列表](./04_Expressions.md#tuple-element-list)
> *元组元素* → [表达式](./04_Expressions.md#expression) | [标识符](./04_Expressions.md#identifier) **:** [表达式](./04_Expressions.md##expression)
> 

<!-- -->

> 通配符表达式语法
>
> *通配符表达式* → **_**
>


<!-- -->

> key-path表达式语法
>
> *key-path 表达式* → **\**  [类型](./03_Types.md#type)<sub>可选</sub>  **.**  [多个 key-path 组件]
> *多个 key-path 组件* → [key-path 组件](./04_Expressions.md#key-path-component) | [key-path 组件](./04_Expressions.md#key-path-component) **.** [多个 key-path 组件](./04_Expressions.md#key-path-components)
> *key-path 组件* →  [标识符](./02_Lexical_Structure.md#identifier) [多个 key-path 后缀](./04_Expressions.md#key-path-postfixes)<sub>可选<sub> | [多个 key-path 后缀](./04_Expressions.md#key-path-postfixes)
> *多个 key-path 后缀* →  [key-path 后缀](./04_Expressions.md#key-path-postfix) [多个 key-path 后缀](./04_Expressions.md#key-path-postfixes)<sub>可选<sub> key-path-postfixes {./04_Expressions.md#key-path-postfixes}
> 
> *key-path 后缀* → **?** | **!** | **self** | **[** [函数调用参数表](./04_Expressions.md#function-call-argument-list) **]** 
> 


<!-- -->

> 选择器表达式语法
>
> *选择器表达式* → **#selector** **(** [*表达式*](./04_Expressions.md#expression) **)**
> 
> *选择器表达式* → **#selector** **(** [*getter:表达式*](./04_Expressions.md#expression) **)**
> 
> *选择器表达式* → **#selector** **(** [*setter:表达式*](./04_Expressions.md#expression) **)**
> 

<!-- -->

> key-path 字符串表达式语法
> *key-path 字符串表达式* → **#keyPath (** [表达式](./04_Expressions.md#expression)  **)**
> 

<!-- -->

> 后缀表达式表达式语法
>
> *后缀表达式* → [基本表达式](./04_Expressions.md#primary-expression)
> 
> *后缀表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) [后缀运算符](02_Lexical_Structure.md#postfix-operator)
> 
> *后缀表达式* → [函数调用表达式](./04_Expressions.md#function-call-expression)
> 
> *后缀表达式* → [构造器表达式](./04_Expressions.md#initializer-expression)
> 
> *后缀表达式* → [显式成员表达式](./04_Expressions.md#explicit-member-expression)
> 
> *后缀表达式* → [后缀 self 表达式](./04_Expressions.md#postfix-self-expression)
>  
> *后缀表达式* → [下标表达式](./04_Expressions.md#subscript-expression)
> 
> *后缀表达式* → [强制取值表达式](./04_Expressions.md#forced-value-expression)
> 
> *后缀表达式* → [可选链表达式](./04_Expressions.md#optional-chaining-expression)
> 

<!-- -->

> 函数调用表达式语法
>
> *函数调用表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) [函数调用参数子句](./04_Expressions.md#function-call-argument-clause)
>
> *函数调用表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) [函数调用参数子句](./04_Expressions.md#function-call-argument-clause)<sub>可选</sub> [尾随闭包](./04_Expressions.md#trailing-closure)
>
> *函数调用参数子句* → **(**  **)**  | **(** [函数调用参数表](./04_Expressions.md#function-call-argument-list) **)**
>
> *函数调用参数表* → [函数调用参数](./04_Expressions.md#function-call-argument) | [函数调用参数](./04_Expressions.md#function-call-argument) **,** [函数调用参数表](./04_Expressions.md#function-call-argument-list)
>
> *函数调用参数* → [表达式](./04_Expressions.md#expression) | [标识符](02_Lexical_Structure.md#identifier) **:** [表达式](./04_Expressions.md#expression)
>
> *函数调用参数* → [运算符](./02_Lexical_Structure.md#operator) | [标识符](./02_Lexical_Structure.md#identifier) **:** [运算符](./02_Lexical_Structure.md#operator)
>
> *尾随闭包* → [闭包表达式](./04_Expressions.md#closure-expression) [标签尾随闭包]()<sub>可选</sub> 
>
> *标签尾随闭包集*→ [标签尾随闭包](./04_Expressions.md#labeled-trailing-closure) [标签尾随闭包集](./04_Expressions.md#labeled-trailing-closures)
> 
> *标签尾随闭包*→ [标识符](./02_Lexical_Structure.md#identifier) **:** [闭包表达式](./04_Expressions.md#closure-expression)

<!-- -->

> 初始化表达式语法
>
> *构造器表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** **init**
> 
> *构造器表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** **init** **(** [参数名称](./04_Expressions.md#argument-names) **)**
> 

<!-- -->

> 显式成员表达式语法
>
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** [十进制数字](02_Lexical_Structure.md#decimal-digit)
> 
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** [标识符](02_Lexical_Structure.md#identifier) [泛型实参子句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub><br/>
> 
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** [标识符](02_Lexical_Structure.md#identifier) **(** [参数名称](./04_Expressions.md#argument-names) **)**
>
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) [条件编译块](./05_Statements.md#conditional-compilation-block)
>
> *参数名称* → [参数名](./04_Expressions.md#argument-name) [参数名称](./04_Expressions.md#argument-names)<sub>可选</sub><br/>
> 
> *参数名* → [标识符](./02_Lexical_Structure.md#identifier) **:**
>

<!-- -->

> 后缀 self 表达式语法
>
> *后缀 self 表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** **self**
> 

<!-- -->

> 下标表达式语法
>
> *下标表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **[** [表达式列表](./04_Expressions.md#expression-list) **]**
> 

<!-- -->

> 强制取值表达式语法
> *强制取值表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **!**
> 


<!-- -->

> 可选链式表达式语法
> *可选链表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **?**
> 

## 语句 {#statements}

> 语句语法
>
> *语句* → [表达式](./04_Expressions.md#expression) **;**<sub>可选</sub>
>
> *语句* → [声明](./06_Declarations.md#declaration) **;**<sub>可选</sub>
>
> *语句* → [循环语句](./05_Statements.md#loop-statement) **;**<sub>可选</sub>
>
> *语句* → [分支语句](./05_Statements.md#branch-statement) **;**<sub>可选</sub>
>
> *语句* → [标签语句](./05_Statements.md#labeled-statement) **;**<sub>可选</sub>
>
> *语句* → [控制转移语句](./05_Statements.md#control-transfer-statement) **;**<sub>可选</sub>
>
> *语句* → [延迟语句](./05_Statements.md#defer-statement) **;**<sub>可选</sub>
>
> *语句* → [执行语句](./05_Statements.md#do-statement) **;**<sub>可选</sub>
>
> *语句* → [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *语句集* → [语句](./05_Statements.md#statement) [语句集](./05_Statements.md#statements)<sub>可选</sub>
>

<!-- -->

> 循环语句语法
>
> *循环语句* → [for-in 语句](./05_Statements.md#for-in-statement)
>
> *循环语句* → [while 语句](./05_Statements.md#wheetatype 类型 ile-statement)
>
> *循环语句* → [repeat-while 语句](./05_Statements.md#do-while-statement)
>

<!-- -->

> For-In 循环语法
>
> *for-in 语句* → **for case**<sub>可选</sub> [模式](./08_Patterns.md#pattern) **in** [表达式](./04_Expressions.md#expression) [where 子句](./05_Statements.md#where-clause)<sub>可选</sub> [代码块](./06_Declarations.md#code-block)
>

<!-- -->

> While 循环语法
>
> *while 语句* → **while** [条件集](./05_Statements.md#condition-list) [代码块](./06_Declarations.md#code-block)
>
> *条件集* → [条件](./05_Statements.md#condition) | [条件](./05_Statements.md#condition) **,** [条件集](./05_Statements.md#condition-list)
> 
> *条件* → [表达式](./04_Expressions.md#expression) | [可用性条件](./05_Statements.md#availability-condition) | [case 条件](./05_Statements.md#case-condition) | [可选绑定条件](./05_Statements.md#optional-binding-condition)
>
> *case 条件* → **case** [模式](./08_Patterns.md#pattern) [构造器](./06_Declarations.md#initializer)
>
> *可选绑定条件* → **let** [模式](./08_Patterns.md#pattern) [构造器](./06_Declarations.md#initializer)<sub>可选</sub> | **var** [模式](./08_Patterns.md#pattern) [构造器](./06_Declarations.md#initializer)<sub>可选</sub>
>

<!-- -->
> Repeat-While 语句语法
>
*repeat-while-statement* → **repeat** [代码块](./06_Declarations.md#code-block) **while** [表达式](./04_Expressions.md#expression)

<!-- -->

> 分支语句语法
>
> *分支语句* → [if 语句](./05_Statements.md#if-statement)
>
> *分支语句* → [guard 语句](./05_Statements.md#guard-statement)
>
> *分支语句* → [switch 语句](./05_Statements.md#switch-statement)
>

<!-- -->

> If 语句语法
>
> *if 语句* → **if** [条件集](./05_Statements.md#condition-list) [代码块](./06_Declarations.md#code-block) [else 子句](./05_Statements.md#else-clause)<sub>可选</sub>
>
> *else 子句* → **else** [代码块](./06_Declarations.md#code-block) | **else** [if 语句](./05_Statements.md#if-statement)
>

<!-- -->
> Guard 语句语法
>
> *guard 语句* → **guard** [条件集](./05_Statements.md#condition-list) **else** [代码块](./06_Declarations.md#code-block)
>


<!-- -->

> Switch 语句语法
>
> *switch 语句* → **switch** [表达式](./04_Expressions.md#expression) **{** [switch-case集](./05_Statements.md#switch-cases)<sub>可选</sub> **}**
>
> *switch-case集* → [switch-case](./05_Statements.md#switch-case) [switch-case集](./05_Statements.md#switch-cases)<sub>可选</sub>
>
> *switch-case* → [case 标签](./05_Statements.md#case-label) [语句集](./05_Statements.md#statements)
>
> *switch-case* → [default 标签](./05_Statements.md#default-label) [语句集](./05_Statements.md#statements)
>
> *switch-case* → [条件 switch-case](./05_Statements.md#conditional-switch-case)
>
> *case 标签* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **case** [case 项集](./05_Statements.md#case-item-list) **:**
>
> *case 项集* → [模式](./08_Patterns.md#pattern) [where 子句](./05_Statements.md#where-clause)<sub>可选</sub> | [模式](./08_Patterns.md#pattern) [where 子句](./05_Statements.md#guard-clause)<sub>可选</sub> **,** [case 项集](./05_Statements.md#case-item-list)
>
> *default 标签* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **default** **:**
>
> *where 子句* → **where** [where 表达式](./05_Statements.md#where-expression)
>
> *where 表达式* → [表达式](./04_Expressions.md#expression)
>
> *条件 switch-case* → [switch if 指令子句](./05_Statements.md#switch-if-directive-clause) [switch elseif 指令子句集](./05_Statements.md#switch-elseif-directive-clauses)<sub>可选</sub> [switch else 指令子句](./05_Statements.md#switch-else-directive-clause)<sub>可选</sub> [endif 指令](./05_Statements.md#endif-directive)
>
> *switch if 指令子句* → [if 指令](./05_Statements.md#if-directive) [编译条件](./05_Statements.md#compilation-condition) [switch-case集](./05_Statements.md#switch-cases)<sub>可选</sub>
>
> *switch elseif 指令子句集* → [elseif 指令子句](./05_Statements.md#else-if-directive-clause) [switch elseif 指令子句集](./05_Statements.md#switch-elseif-directive-clauses)<sub>可选</sub>
>
> *switch elseif 指令子句* → [elseif 指令](./05_Statements.md#elseif-directive) [编译条件](./05_Statements.md#compilation-condition) [switch-case集](./05_Statements.md#switch-cases)<sub>可选</sub>
>
> *switch else 指令子句* → [else 指令](./05_Statements.md#else-directive) [switch-case集](./05_Statements.md#switch-cases)<sub>可选</sub>
>

<!-- -->

> 标签语句语法
>
> *标签语句* → [语句标签](./05_Statements.md#statement-label) [循环语句](./05_Statements.md#loop-statement)
>
> *标签语句* → [语句标签](./05_Statements.md#statement-label) [if 语句](./05_Statements.md#if-statement)
>
> *标签语句* → [语句标签](./05_Statements.md#statement-label) [switch 语句](./05_Statements.md#switch-statement)
>
> *标签语句* → [语句标签](./05_Statements.md#statement-label) [do 语句](./05_Statements.md#do-statement)
>
> *语句标签* → [标签名称](./05_Statements.md#label-name) **:**
>
> *标签名称* → [标识符](./02_Lexical_Structure.md#identifier)
>

<!-- -->

> 控制转移语句语法
>
> *控制转移语句* → [break 语句](./05_Statements.md#break-statement)
>
> *控制转移语句* → [continue 语句](./05_Statements.md#continue-statement)
>
> *控制转移语句* → [fallthrough 语句](./05_Statements.md#fallthrough-statement)
>
> *控制转移语句* → [return 语句](./05_Statements.md#return-statement)
>
> *控制转移语句* → [throw 语句](./05_Statements.md#throw-statement)
>

<!-- -->

> Break 语句语法
>
> *break 语句* → **break** [标签名称](./05_Statements.md#label-name)<sub>可选</sub>
>

<!-- -->

> Continue 语句语法
>
> *continue 语句* → **continue** [标签名称](./05_Statements.md#label-name)<sub>可选</sub>
>

<!-- -->

> Fallthrough 语句语法
>
> *fallthrough 语句* → **fallthrough**
>

<!-- -->

> Return 语句语法
>
> *return 语句* → **return** [表达式](./04_Expressions.md#expression)<sub>可选</sub>
>

<!-- -->

> Throw 语句语法
>
> *throw 语句* → **throw** [表达式](./04_Expressions.md#expression)
>

<!-- -->

> Defer 语句语法
>
> *defer 语句* → **defer** [代码块](./06_Declarations.md#code-block)
>

<!-- -->

> Do 语句语法
>
> *do 语句* → **do** [代码块](./06_Declarations.md#code-block) [catch 子句集](./05_Statements.md#catch-clauses)<sub>可选</sub>
>
> *catch 子句集* → [catch 子句](./05_Statements.md#catch-clause) [catch 子句集](05_Statements.md#catch-clauses)<sub>可选</sub>
>
> *catch 子句* → **catch** [catch 模式列表](./05_Statements.md#catch-pattern-list)<sub>可选</sub>  [代码块](./06_Declarations.md#code-block)<sub>可选</sub>
> 
> *catch 模式列表* → [catch 模式](./05_Statements.md#catch-pattern) | [catch 模式](./05_Statements.md#catch-pattern) ，[catch 模式列表](./05_Statements.md#catch-pattern-list)
> 
> *catch 模式* → [模式](./08_Patterns.md#pattern) [where 子句](./05_Statements.md#where-clause)<sub>可选</sub>

<!-- -->
> 编译控制语句
>
> *编译控制语句* → [条件编译块](./05_Statements.md#conditional-complation-block)
>
> *编译控制语句* → [行控制语句](./05_Statements.md#line-control-statement)
>
> *编译控制语句* → [诊断语句](./05_Statements.md#diagnostic-statement)
>

<!-- -->
> 条件编译块语法
>
> *条件编译块* → [if 指令子句](./05_Statements.md#if-directive-clause) [elseif 指令子句集](./05_Statements.md#elseif-directive-clauses)<sub>可选</sub> [else 指令子句](./05_Statements.md#else-directive-clause)<sub>可选</sub> [endif 指令](./05_Statements.md#endif-directive)
>
> *if 指令子句* → [if 指令](./05_Statements.md#if-directive) [编译条件](./05_Statements.md#compilation-condition) [语句集](./05_Statements.md#statements)<sub>可选</sub>
>
> *elseif 指令子句集* → [elseif 指令子句](./05_Statements.md#else-if-directive-clause) [elseif 指令子句集](./05_Statements.md#elseif-directive-clauses)<sub>可选</sub>
>
> *elseif 指令子句* → [elseif 指令](./05_Statements.md#elseif-directive) [编译条件](./05_Statements.md#compilation-condition) [语句集](./05_Statements.md#statements)<sub>可选</sub>
>
> *else 指令子句* → [else 指令](./05_Statements.md#else-directive) [语句集](./05_Statements.md#statements)<sub>可选</sub>
>
> *if 指令* → **#if**
>
> *elseif 指令* → **#elseif**
>
> *else 指令* → **#else**
>
> *endif 指令* → **#endif**
>
> *编译条件* → [平台条件](./05_Statements.md#platform-condition)
>
> *编译条件* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *编译条件* → [布尔字面量](./02_Lexical_Structure.md#boolean-literal)
>
> *编译条件* → **(** [编译条件](./05_Statements.md#compilation-condition) **)**
>
> *编译条件* → **!** [编译条件](./05_Statements.md#compilation-condition)
>
> *编译条件* → [编译条件](./05_Statements.md#compilation-condition) **&&** [编译条件](./05_Statements.md#compilation-condition)
>
> *编译条件* → [编译条件](./05_Statements.md#compilation-condition) **||** [编译条件](./05_Statements.md#compilation-condition)
>
> *平台条件* → **os** **(** [操作系统](./05_Statements.md#operating-system) **)**
>
> *平台条件* → **arch** **(** [架构](./05_Statements.md#architecture) **)**
>
> *平台条件* → **swift** **(** **>=** [swift 版本](./05_Statements.md#swift-version) **)** | **swift** **(** **<** [swift 版本](./05_Statements.md#swift-version) **)**
>
> *平台条件* → **compiler** **(** **>=** [swift 版本](./05_Statements.md#swift-version) **)** | **compiler** **(** **<** [swift 版本](./05_Statements.md#swift-version) **)**
>
> *平台条件* → **canImport** **(** [模块名](./05_Statements.md#module-name) **)**
>
> *平台条件* → **targetEnvironment** **(** [环境](./05_Statements.md#environment) **)**
>
> *操作系统* → **macOS** | **iOS** | **watchOS** | **tvOS**
>
> *架构* → **i386** | **x86_64** | **arm** | **arm64**
>
> *swift 版本* → [十进制数字集](./02_Lexical_Structure.md#decimal-digits) [swift 版本后缀](./05_Statements.md#swift-version-continuation)<sub>可选</sub>
>
> *swift 版本后缀* → **.** [十进制数字集](./02_Lexical_Structure.md#decimal-digits) [swift 版本集](./05_Statements.md#swift-version-continuation)<sub>可选</sub>
>
> *模块名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *环境* → **模拟器** ｜ **macCatalyst**

<!-- -->
> 行控制语句语法
>
> *行控制语句* → **#sourceLocation** **(** **file:** [文件名](./05_Statements.md#file-name) **,** **line:**  [行号](./05_Statements.md#line-number) **)**
>
> *行控制语句* → **#sourceLocation** **(** **)**
>
> *行号* → 一个大于 0 的十进制数字
>
> *文件名* → [静态字符串字面量](./02_Lexical_Structure.md#static-string-literal)
>

<!-- -->
> 编译期诊断语句语法
>
> *诊断语句* → **#error** **(** [诊断信息](./05_Statements.md#diagnostic-message) **)**
>
> *诊断语句* → **#warning** **(** [诊断信息](./05_Statements.md#diagnostic-message) **)**
>
> *诊断信息* → [静态字符串字面量](./02_Lexical_Structure.md#static-string-literal)
>

<!-- -->
> 可用性条件语法
>
> *可用性条件* → **#available** **(** [可用性参数集](./05_Statements.md#availability-arguments) **)**
>
> *可用性参数集* → [可用性参数](./05_Statements.md#availability-argument) | [可用性参数](./05_Statements.md#availability-argument) , [可用性参数集）](./05_Statements.md#availability-arguments)
>
> *可用性参数* → [平台名](./05_Statements.md#platform-name) [平台版本](./05_Statements.md#platform-version)
>
> *可用性参数* → **\***
>
> *平台名* → **iOS** | **iOSApplicationExtension**
>
> *平台名* → **macOS** | **macOSApplicationExtension**
>
> *平台名* → **watchOS**
>
> *平台名* → **tvOS**
>
> *平台版本* → [十进制数字集](./02_Lexical_Structure.md#decimal-digits)
>
> *平台版本* → [十进制数字集](./02_Lexical_Structure.md#decimal-digits) **.** [十进制数字集](./02_Lexical_Structure.md#decimal-digits)
>
> *平台版本* → [十进制数字集](./02_Lexical_Structure.md#decimal-digits) **.** [十进制数字集](./02_Lexical_Structure.md#decimal-digits) **.** [十进制数字集](./02_Lexical_Structure.md#decimal-digits)
>

## 声明 {#declarations}

> 声明语法
>
> *声明* → [导入声明](./06_Declarations.md#import-declaration)
>
> *声明* → [常量声明](./06_Declarations.md#constant-declaration)
>
> *声明* → [变量声明](./06_Declarations.md#variable-declaration)
>
> *声明* → [类型别名声明](./06_Declarations.md#typealias-declaration)
>
> *声明* → [函数声明](./06_Declarations.md#function-declaration)
>
> *声明* → [枚举声明](./06_Declarations.md#enum-declaration)
>
> *声明* → [结构体声明](./06_Declarations.md#struct-declaration)
>
> *声明* → [类声明](./06_Declarations.md#class-declaration)
>
> *声明* → [actor 声明](./06_Declarations.md#actor-declaration)
>
> *声明* → [协议声明](./06_Declarations.md#protocol-declaration)
>
> *声明* → [构造器声明](./06_Declarations.md#initializer-declaration)
>
> *声明* → [析构器声明](./06_Declarations.md#deinitializer-declaration)
>
> *声明* → [扩展声明](./06_Declarations.md#extension-declaration)
>
> *声明* → [下标声明](./06_Declarations.md#subscript-declaration)
>
> *声明* → [运算符声明](./06_Declarations.md#operator-declaration)
>
> *声明* → [优先级组声明](./06_Declarations.md#precedence-group-declaration)
>
> *声明集* → [声明](./06_Declarations.md#declaration) [声明集](./06_Declarations.md#declarations)<sub>可选</sub>
>


<!-- -->

> 顶级声明语法
>
> *顶级声明* → [多条语句](./05_Statements.md#statements)<sub>可选</sub>
>

<!-- -->

> 代码块语法
>
> *代码块* → **{** [多条语句](./05_Statements.md#statements)<sub>可选</sub> **}**
>

<!-- -->

> 导入声明语法
>
> *导入声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **import** [导入类型](./06_Declarations.md#import-kind)<sub>可选</sub> [导入路径](./06_Declarations.md#import-path)
>
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **let** | **var** | **func**
>
> *导入路径* → [导入路径标识符](./06_Declarations.md#import-path-identifier) | [导入路径标识符](./06_Declarations.md#import-path-identifier) **.** [导入路径](./06_Declarations.md#import-path)
>
> *导入路径标识符* → [标识符](./02_Lexical_Structure.md#identifier) | [运算符](./02_Lexical_Structure.md#operator)
>

<!-- -->

> 常数声明语法
>
> *常量声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration-specifiers)<sub>可选</sub> **let** [模式构造器集](./06_Declarations.md#pattern-initializer-list)
>
> *模式构造器集* → [模式构造器](./06_Declarations.md#pattern-initializer) | [模式构造器](./06_Declarations.md#pattern-initializer)    **,** [模式构造器集](./06_Declarations.md#pattern-initializer-list)
>
> *模式构造器* → [模式](./08_Patterns.md#pattern) [构造器](./06_Declarations.md#initializer)<sub>可选</sub>
>
> *构造器* → **=** [表达式](./04_Expressions.md#expression)

<!-- -->

> 变量声明语法
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [模式构造器集](./06_Declarations.md#pattern-initializer-list)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [变量名](./06_Declarations.md#variable-name) [类型注解](./03_Types.md#type-annotation) [代码块](./06_Declarations.md#code-block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [变量名](./06_Declarations.md#variable-name) [类型注解](./03_Types.md#type-annotation) [getter-setter 块](./06_Declarations.md#getter-setter-block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [变量名](./06_Declarations.md#variable-name) [类型注解](./03_Types.md#type-annotation) [getter-setter 关键字块](./06_Declarations.md#getter-setter-keyword-block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [变量名](./06_Declarations.md#variable-name) [构造器](./06_Declarations.md#initializer)<sub>可选</sub> [willSet-didSet 代码块](./06_Declarations.md#willSet-didSet-block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [变量名](./06_Declarations.md#variable-name) [类型注解](./03_Types.md#type-annotation) [构造器](./06_Declarations.md#initializer)<sub>可选</sub> [willSet-didSet 代码块](./06_Declarations.md#willSet-didSet-block)
>
> *变量声明头* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration-specifiers)<sub>可选</sub> **var**
>
> *变量名称* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *getter-setter 块* → [代码块](./06_Declarations.md#code-block)
>
> *getter-setter 块* → **{** [getter 子句](./06_Declarations.md#getter-keyword-clause) [setter 子句](./06_Declarations.md#setter-keyword-clause)<sub>可选</sub> **}**
>
> *getter-setter 块* → **{** [setter 子句](./06_Declarations.md#setter-keyword-clause) [getter 子句](./06_Declarations.md#getter-keyword-clause) **}**
>
> *getter 子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub>  **get**  [代码块](./06_Declarations.md#code-block)
>
> *setter 子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub> **set** [setter 名称](./06_Declarations.md#setter-name)<sub>可选</sub> [代码块](./06_Declarations.md#code-block)
>
> *setter 名称* → **(** [标识符](./02_Lexical_Structure.md#identifier) **)**
>
> *getter-setter 关键字（Keyword）块* → **{** [getter 关键字子句](./06_Declarations.md#getter-keyword-clause) [setter 关键字子句](./06_Declarations.md#setter-keyword-clause)<sub>可选</sub> **}**
>
> *getter-setter 关键字（Keyword）块* → **{** [setter 关键字子句](./06_Declarations.md#setter-keyword-clause) [getter 关键字子句](./06_Declarations.md#getter-keyword-clause) **}**
>
> *getter 关键字（Keyword）子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub> **get**
>
> *setter 关键字（Keyword）子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub> **set**
>
> *willSet-didSet 代码块* → **{** [willSet 子句](./06_Declarations.md#willSet-clause) [didSet 子句](./06_Declarations.md#didSet-clause)<sub>可选</sub> **}**
>
> *willSet-didSet 代码块* → **{** [didSet 子句](./06_Declarations.md#didSet-clause) [willSet 子句](./06_Declarations.md#willSet-clause)<sub>可选</sub> **}**
>
> *willSet 子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **willSet** [setter 名称](./06_Declarations.md#setter-name)<sub>可选</sub> [代码块](./06_Declarations.md#code-block)
>
> *didSet 子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub>
>
 **didSet** [setter 名称](./06_Declarations.md#setter-name)<sub>可选</sub> [代码块](./06_Declarations.md#code-block)

<!-- -->

> 类型别名声明语法
>
> *类型别名声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier) **typealias** [类型别名名称](./06_Declarations.md#typealias-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型别名赋值](./06_Declarations.md#typealias-assignment)
>
> *类型别名名称* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *类型别名赋值* → **=** [类型](./03_Types.md#type)
>

<!-- -->

> 函数声明语法
>
> *函数声明* → [函数头](./06_Declarations.md#function-head) [函数名](./06_Declarations.md#function-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [函数签名](./06_Declarations.md#function-signature) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [函数体](./06_Declarations.md#function-body)<sub>可选</sub>
>
> *函数头* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明描述符集](./06_Declarations.md#declaration-specifiers)<sub>可选</sub> **func**
>
> *函数名* → [标识符](./02_Lexical_Structure.md#identifier) | [运算符](./02_Lexical_Structure.md#operator)
>
> *函数签名* → [参数子句](./06_Declarations.md#parameter-clause) **async**<sub>可选</sub> **throws**<sub>可选</sub> [函数结果](./06_Declarations.md#function-result)<sub>可选</sub>
>

> *函数签名* → [参数子句](./06_Declarations.md#parameter-clause) **async**<sub>可选</sub> **rethrows** [函数结果](./06_Declarations.md#function-result)<sub>可选</sub>
>
> *函数结果* → **->** [特性](./07_Attributes.md#attributes)<sub>可选</sub> [类型](./03_Types.md#type)
>
> *函数体* → [代码块](./06_Declarations.md#code-block)
>
> *参数子句* → **(** **)** | **(** [参数集](./06_Declarations.md#parameter-list) **)**
>
> *参数集* → [参数](./06_Declarations.md#parameter) | [参数](./06_Declarations.md#parameter) **,** [参数集](./06_Declarations.md#parameter-list)
>
> *参数* → [外部参数名](./06_Declarations.md#parameter-name)<sub>可选</sub> [本地参数名](./06_Declarations.md#local-parameter-name) [类型注解](./03_Types.md#type-annotation) [默认参数子句](./06_Declarations.md#default-argument-clause)<sub>可选</sub>
>
> *参数* → [外部参数名](./06_Declarations.md#parameter-name)<sub>可选</sub> [本地参数名](./06_Declarations.md#local-parameter-name) [类型注解](./03_Types.md#type-annotation)
>
> *参数* → [外部参数名](./06_Declarations.md#parameter-name)<sub>可选</sub> [本地参数名](./06_Declarations.md#local-parameter-name) [类型注解](./03_Types.md#type-annotation) **...**
>
> *外部参数名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *本地参数名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *默认参数子句* → **=** [表达式](./04_Expressions.md#expression)
>

<!-- -->

> 枚举声明语法
>
> *枚举声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> [联合式枚举](./06_Declarations.md#union-style-enum)
>
> *枚举声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> [原始值式枚举](./06_Declarations.md#raw-value-style-enum)
>
> *联合式枚举* → **indirect**<sub>可选</sub> **enum** [枚举名](./06_Declarations.md#enum-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> **{** [联合式枚举成员](./06_Declarations.md#union-style-enum-members)<sub>可选</sub> **}**
>
> *联合式枚举成员集* → [联合式枚举成员](./06_Declarations.md#union-style-enum-member) [联合样式枚举成员集](./06_Declarations.md#union-style-enum-members)<sub>可选</sub>
>
> *联合样式枚举成员* → [声明](./06_Declarations.md#declaration) | [联合式枚举 case 子句](./06_Declarations.md#union-style-enum-case-clause) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *联合式枚举 case 子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **indirect**<sub>可选</sub> **case** [联合式枚举 case 集](./06_Declarations.md#union-style-enum-case-list)
>
> *联合式枚举 case 集* → [联合式枚举 case](./06_Declarations.md#union-style-enum-case) | [联合式枚举 case](./06_Declarations.md#union-style-enum-case) **,** [联合式枚举 case 集](./06_Declarations.md#union-style-enum-case-list)
>
> *联合式枚举 case* → [枚举的 case 名](./06_Declarations.md#enum-case-name) [元组类型](./03_Types.md#tuple-type)<sub>可选</sub>
>
> *枚举名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *枚举的 case 名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *原始值式枚举* → **enum** [枚举名](./06_Declarations.md#enum-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> **{** [原始值式枚举成员集](./06_Declarations.md#raw-value-style-enum-members) **}**
>
> *原始值式枚举成员集* → [原始值式枚举成员](./06_Declarations.md#raw-value-style-enum-member) [原始值式枚举成员集](./06_Declarations.md#raw-value-style-enum-members)<sub>可选</sub>
>
> *原始值式枚举成员* → [声明](./06_Declarations.md#declaration) | [原始值式枚举 case 子句](./06_Declarations.md#raw-value-style-enum-case-clause) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *原始值式枚举 case 子句* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **case** [原始值式枚举 case 集](./06_Declarations.md#raw-value-style-enum-case-list)
>
> *原始值式枚举 case 集* → [原始值式枚举 case](./06_Declarations.md#raw-value-style-enum-case) | [原始值式枚举 case](./06_Declarations.md#raw-value-style-enum-case) **,** [原始值式枚举 case 集](./06_Declarations.md#raw-value-style-enum-case-list)
>
> *原始值式枚举 case* → [枚举的 case 名](./06_Declarations.md#enum-case-name) [原始值赋值](./06_Declarations.md#raw-value-assignment)<sub>可选</sub>
>
> *原始值赋值* → **=** [原始值字面量](./02_Lexical_Structure.md#literal)
>
> *原始值字面量（raw-value-literal）* → [数值字面量](./02_Lexical_Structure.md#literal) | [静态字符串字面量](./02_Lexical_Structure.md#literal) | [布尔字面量](./02_Lexical_Structure.md#literal)
>

<!-- -->

> 结构体声明语法
>
> *结构体声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **struct** [结构体名称](./06_Declarations.md#struct-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [结构体主体](./06_Declarations.md#struct-body)
>
> *结构体名称* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *结构体主体* → **{** [结构体成员集](./06_Declarations.md#declarations)<sub>可选</sub> **}**
>
> *结构体成员集* → [结构体成员](./06_Declarations.md#declarations) [结构体成员集](./06_Declarations.md#declarations)<sub>可选</sub>
>
> *结构体成员* → [声明集](./06_Declarations.md#declarations) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>

<!-- -->

> 类声明语法
>
> *类声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **final**<sub>可选</sub> **class** [类名](./06_Declarations.md#class-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [类主体](./06_Declarations.md#class-body)
>
> *类声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **final** [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **class** [类名](./06_Declarations.md#class-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [类主体](./06_Declarations.md#class-body)
>
> *类名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *类主体* → **{** [类成员集](./06_Declarations.md#declarations)<sub>可选</sub> **}**
>
> *类成员集* → [类成员](./06_Declarations.md#declarations) [类成员集](./06_Declarations.md#declarations)<sub>可选</sub>
>
> *类成员* → [声明集](./06_Declarations.md#declarations) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>

<!-- -->

> 协议声明语法
>
> *协议声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub>  **protocol** [协议名](./06_Declarations.md#protocol-name) [类型继承子句](./03_Types.md#type-inheritance-clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [协议主体](./06_Declarations.md#protocol-body)
>
> *协议名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *协议主体* → **{** [协议成员集](./06_Declarations.md#protocol-member-declarations)<sub>可选</sub> **}**
>
> *协议成员集* → [协议成员](./06_Declarations.md#declarations) [协议成员集](./06_Declarations.md#declarations)<sub>可选</sub>
>
> *协议成员* → [协议成员声明](./06_Declarations.md#declarations) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *协议成员声明* → [协议属性声明](./06_Declarations.md#protocol-property-declaration)
>
> *协议成员声明* → [协议方法声明](./06_Declarations.md#protocol-method-declaration)
>
> *协议成员声明* → [协议构造器声明](./06_Declarations.md#protocol-initializer-declaration)
>
> *协议成员声明* → [协议下标声明](./06_Declarations.md#protocol-subscript-declaration)
>
> *协议成员声明* → [协议关联类型声明](./06_Declarations.md#protocol-associated-type-declaration)
>
> *协议成员声明* → [类型别名声明](./06_Declarations.md#typealias-declaration)
>

<!-- -->

> 协议属性声明语法
>
> *协议属性声明* → [变量声明头](./06_Declarations.md#variable-declaration-head) [变量名](./06_Declarations.md#variable-name) [类型注解](./03_Types.md#type-annotation) [getter-setter 关键字块](./06_Declarations.md#getter-setter-keyword-block)
>

<!-- -->

> 协议方法声明语法
>
> *协议方法声明* → [函数头](./06_Declarations.md#function-head) [函数名](./06_Declarations.md#function-name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [函数签名](./06_Declarations.md#function-signature) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub>
>

<!-- -->

> 协议构造器声明语法
>
> *协议构造器声明* → [构造器头](./06_Declarations.md#initializer-head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter-clause) **throws**<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub>
>
> *协议构造器声明* → [构造器头](./06_Declarations.md#initializer-head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter-clause) **rethrows** [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub>
>

<!-- -->

> 协议下标声明语法
>
> *协议下标声明* → [下标头](./06_Declarations.md#subscript-head) [下标结果](./06_Declarations.md#subscript-result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [getter-setter 关键字块](./06_Declarations.md#getter-setter-keyword-block)
>

<!-- -->

> 协议关联类型声明语法
>
> *协议关联类型声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **associatedtype** [类型别名](./06_Declarations.md#typealias-name) [类型继承子句](./03_Types.md#type-inheritance-clause)<sub>可选</sub> [类型别名赋值](./06_Declarations.md#typealias-assignment)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub>
>

<!-- -->

> 构造器声明语法
>
> *构造器声明* → [构造器头](./06_Declarations.md#initializer-head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter-clause) **throws**<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [构造器主体](./06_Declarations.md#initializer-body)
>
> *构造器声明* → [构造器头](./06_Declarations.md#initializer-head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter-clause) **rethrows** [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [构造器主体](./06_Declarations.md#initializer-body)
>
> *构造器头（Head）* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration-modifiers)<sub>可选</sub>  **init**
>
> *构造器头（Head）* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration-modifiers)<sub>可选</sub>  **init ?**
>
> *构造器头（Head）* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration-modifiers)<sub>可选</sub>  **init !**
>
> *构造器主体* → [代码块](./06_Declarations.md#code-block)
>

<!-- -->

> 析构器声明语法
>
> *析构器声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> **deinit** [代码块](./06_Declarations.md#code-block)
>

<!-- -->

> 扩展声明语法
>
> *扩展声明* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **extension** [类型标识](./03_Types.md#type-identifier) [类型继承子句](./03_Types.md#type-inheritance-clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [扩展主体](./06_Declarations.md#extension-body)
>
> *扩展主体* → **{** [扩展成员集](./06_Declarations.md#declarations)<sub>可选</sub> **}**
>
> *扩展成员集* → [扩展成员](./06_Declarations.md#declarations) [扩展成员集](./06_Declarations.md#declarations)<sub>可选</sub>
>
> *扩展成员* → [声明集](./06_Declarations.md#declarations) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>

<!-- -->

> 下标声明语法
>
> *下标声明* → [下标头](./06_Declarations.md#subscript-head) [下标结果](./06_Declarations.md#subscript-result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [代码块](./06_Declarations.md#code-block)
>
> *下标声明* → [下标头](./06_Declarations.md#subscript-head) [下标结果](./06_Declarations.md#subscript-result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [getter-setter 块](./06_Declarations.md#getter-setter-block)
>
> *下标声明* → [下标头](./06_Declarations.md#subscript-head) [下标结果](./06_Declarations.md#subscript-result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic-where-clause)<sub>可选</sub> [getter-setter 关键字块](./06_Declarations.md#getter-setter-keyword-block)
>
> *下标头（Head）* → [特性](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration-modifiers)<sub>可选</sub> **subscript** [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter-clause)
>
> *下标结果（Result）* → **->** [特性](./07_Attributes.md#attributes)<sub>可选</sub> [类型](./03_Types.md#type)
>

<!-- -->

> 运算符声明语法
>
> *运算符声明* → [前置运算符声明](./06_Declarations.md#prefix-operator-declaration) | [后置运算符声明](./06_Declarations.md#postfix-operator-declaration) | [中置运算符声明](./06_Declarations.md#infix-operator-declaration)
>
> *前置运算符声明* → **prefix** **operator**  [运算符](./02_Lexical_Structure.md#operator)
>
> *后置运算符声明* → **postfix** **operator**  [运算符](./02_Lexical_Structure.md#operator)
>
> *中置运算符声明* → **infix** **operator**  [运算符](./02_Lexical_Structure.md#operator) [中置运算符特性](./06_Declarations.md#infix-operator-attributes)<sub>可选</sub>
>
> *中置运算符特性* → [优先级组名](./06_Declarations.md#precedence-group-name)
>

> 优先级组声明语法
>
> *优先级组声明* → **precedencegroup** [优先级组名](./06_Declarations.md#precedence-group-name) **{** [优先级组特性](./06_Declarations.md#precedence-group-attributes)<sub>可选</sub> **}**
>
> *优先级组特性* → [优先级组属性](./06_Declarations.md#declarations) [优先级组特性](./06_Declarations.md#declarations)<sub>可选</sub>
>
> *优先级组属性* → [优先级组关系](./06_Declarations.md#declarations)
>
> *优先级组属性* → [优先级组赋值](./06_Declarations.md#declarations)
>
> *优先级组属性* → [优先级组结合](./06_Declarations.md#declarations)
>
> *优先级组关系* → **higherThan :** [优先级组名集](./06_Declarations.md#declarations)
>
> *优先级组关系* → **lowerThan :** [优先级组名集](./06_Declarations.md#declarations)
>
> *优先级组赋值* → **assignment :** [布尔字面量](./02_Lexical_Structure.md#string-literal)
>
> *优先级组结合* → **associativity : left**
>
> *优先级组结合* → **associativity : right**
>
> *优先级组结合* → **associativity : none**
>
> *优先级组名集* → [优先级组名](./06_Declarations.md#declarations) | [优先级组名](./06_Declarations.md#declarations) **,** [优先级组名集](./06_Declarations.md#declarations)
>
> *优先级组名* → [标识符](./02_Lexical_Structure.md#identifier)
>

<!-- -->
> 声明修饰符语法
>
> *声明修饰符* → **class** | **convenience** | **dynamic** | **final** | **infix** | **lazy** | **optional** | **override** | **postfix** | **prefix** | **required** | **static** | **unowned** | **unowned(safe)** | **unowned(unsafe)** | **weak**
>
> *声明修饰符* → [访问级别修饰符](./07_Attributes.md#access-level-modifier)
>
> *声明修饰符* → [可变性修饰符](./07_Attributes.md#mutation-modifier)
> 
> *声明修饰符* → [actor 隔离修饰符](./06_Deeclarations.md#actor-isolation-modifier)
>
> *声明修饰符集* → [声明修饰符](./06_Declarations.md#declaration-modifier) [声明修饰符集](./06_Declarations.md#declaration-modifiers)<sub>可选</sub>
>
> *访问级别修饰符* → **private** | **private(set)**
>
> *访问级别修饰符* → **fileprivate** | **fileprivate(set)**
>
> *访问级别修饰符* → **internal** | **internal(set)**
>
> *访问级别修饰符* → **public** | **public(set)**
>
> *访问级别修饰符* → **open** | **open(set)**
>
> *可变性修饰符* → **mutating** | **nonmutating**
>  
> *actor 隔离修饰符* → **nonisolated**
>

## 属性 {#attributes}

> 属性语法
>
> *属性* → **@** [属性名](./07_Attributes.md#attribute-name) [属性参数子句](./07_Attributes.md#attribute-argument-clause)<sub>可选</sub>
>
> *属性名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *属性参数子句* → **{** [平衡令牌集](./07_Attributes.md#balanced-tokens)<sub>可选</sub>  **}**
>
> *属性（Attributes）集* → [属性](./07_Attributes.md#attribute) [特性](./07_Attributes.md#attributes)<sub>可选</sub>
>
> *平衡令牌集* → [平衡令牌](./07_Attributes.md#balanced-token) [平衡令牌集](./07_Attributes.md#balanced-tokens)<sub>可选</sub>
>
> *平衡令牌* → **(** [平衡令牌集](./07_Attributes.md#balanced-tokens)<sub>可选</sub> **)**
>
> *平衡令牌* → **[** [平衡令牌集](./07_Attributes.md#balanced-tokens)<sub>可选</sub> **]**
>
> *平衡令牌* → **{** [平衡令牌集](./07_Attributes.md#balanced-tokens)<sub>可选</sub> **}**
>
> *平衡令牌* → 任意标识符、关键字、字面量或运算符
>
> *平衡令牌* → 除 **(** 、**)**、**[**、**]**、**{**、**}** 外的任意标点符号
>
>

## 模式 {#patterns}

> 模式语法
>
> *模式* → [通配符模式](./08_Patterns.md#wildcard-pattern) [类型注解](./03_Types.md#type-annotation)<sub>可选</sub>
>
> *模式* → [标识符模式](./08_Patterns.md#identifier-pattern) [类型注解](./03_Types.md#type-annotati Value Bindingon )<sub>可选</sub>
>
> *模式* → [值绑定模式](./08_Patterns.md#value-binding-pattern)
>
> *模式* → [元组模式](./08_Patterns.md#tuple-pattern) [类型注解](./03_Types.md#type-annotation)<sub>可选</sub>
>
> *模式* → [枚举 case 模式](./08_Patterns.md#enum-case-pattern)
>
> *模式* → [可选模式](./08_Patterns.md#optional-pattern)
>
> *模式* → [类型转换模式](./08_Patterns.md#type-casting-pattern)
>
> *模式* → [表达式模式](./08_Patterns.md#expression-pattern)
>

<!-- -->

> 通配符模式语法
>
> *通配符模式* → **_**
>

<!-- -->

> 标识符模式语法
>
> *标识符模式* → [标识符](./02_Lexical_Structure.md#identifier)
>

<!-- -->

> 值绑定模式语法
>
> *值绑定模式* → **var** [模式](./08_Patterns.md#pattern) | **let** [模式](./08_Patterns.md#pattern)
>

<!-- -->

> 元组模式语法
>
> *元组模式* → **(** [元组模式元素集](./08_Patterns.md#tuple-pattern-element-list)<sub>可选</sub> **)**
>
> *元组模式元素集* → [元组模式元素](./08_Patterns.md#tuple-pattern-element) | [元组模式元素](./08_Patterns.md#tuple-pattern-element) **,** [元组模式元素集](./08_Patterns.md#tuple-pattern-element-list)
>
> *元组模式元素* → [模式](./08_Patterns.md#pattern) | [标识符](./02_Lexical_Structure.md#identifier) **:** [模式](./08_Patterns.md#pattern)
>

<!-- -->

> 枚举 case 模式语法
>
> *enum-case-pattern* → [类型标识](./03_Types.md#type-identifier)<sub>可选</sub> **.** [枚举 case 名](./06_Declarations.md#enum-case-name) [元组模式](./08_Patterns.md#tuple-pattern)<sub>可选</sub>
>

<!-- -->
> 可选模式语法
>
> *可选模式* → [标识符模式](./02_Lexical_Structure.md#identifier) **?**
>

<!-- -->

> 类型转换模式语法
>
> *类型转换模式* → [is 模式](./08_Patterns.md#is-pattern) | [as 模式](./08_Patterns.md#as-pattern)
>
> *is 模式* → **is** [类型](./03_Types.md#type)
>
> *as 模式* → [模式](./08_Patterns.md#pattern) **as** [类型](./03_Types.md#type)
>

<!-- -->

> 表达式模式语法
>
> *表达式模式* → [表达式](./04_Expressions.md#expression)
>

## 泛型参数 {#generic-parameters-and-arguments}

> 泛型形参子句语法
>
>
> *泛型参数子句* → **<** [泛型参数集](./09_Generic_Parameters_and_Arguments.md#generic-parameter-list) **>**
>
> *泛型参数集* → [泛型参数](./09_Generic_Parameters_and_Arguments.md#generic-parameter) | [泛形参数](./09_Generic_Parameters_and_Arguments.md#generic-parameter) **,** [泛型参数集](./09_Generic_Parameters_and_Arguments.md#generic-parameter-list)
>
> *泛形参数* → [类型名称](./03_Types.md#type-name)
>
> *泛形参数* → [类型名称](./03_Types.md#type-name) **:** [类型标识](./03_Types.md#type-identifier)
>
> *泛形参数* → [类型名称](./03_Types.md#type-name) **:** [协议合成类型](./03_Types.md#protocol-composition-type)
>
> *泛型 where 子句* → **where** [约束集](./09_Generic_Parameters_and_Arguments.md#requirement-list)
>
> *约束集* → [约束](./09_Generic_Parameters_and_Arguments.md#requirement) | [约束](./09_Generic_Parameters_and_Arguments.md#requirement) **,** [约束集](./09_Generic_Parameters_and_Arguments.md#requirement-list)
>
> *约束* → [一致性约束](./09_Generic_Parameters_and_Arguments.md#conformance-requirement) | [同类型约束](./09_Generic_Parameters_and_Arguments.md#same-type-requirement)
>
> *一致性约束* → [类型标识](./03_Types.md#type-identifier) **:** [类型标识](./03_Types.md#type-identifier)
>
> *一致性约束* → [类型标识](./03_Types.md#type-identifier) **:** [协议合成类型](./03_Types.md#protocol-composition-type)
>
> *同类型约束* → [类型标识](./03_Types.md#type-identifier) **==** [类型](./03_Types.md#type-identifier)
>

<!-- -->

> 泛型实参子句语法
>
> *泛型实参子句* → **<** [泛型实参集](./09_Generic_Parameters_and_Arguments.md#generic-argument-list) **>**
>
> *泛型实参集* → [泛型实参](./09_Generic_Parameters_and_Arguments.md#generic-argument) | [泛形实参](./09_Generic_Parameters_and_Arguments.md#generic-argument) **,** [泛型实参集](./09_Generic_Parameters_and_Arguments.md#generic-argument-list)
>
> *泛形实参* → [类型](./03_Types.md#type)