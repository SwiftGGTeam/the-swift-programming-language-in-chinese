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

> 二元表达式语法
>
> *二元表达式* → [二元运算符](./02_Lexical_Structure.md#binary-operator) [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *二元表达式* → [赋值操作符](./06_Declarations.md#class_declaration) [try 运算符](./04_Expressions.md#try_operator)<sub>可选</sub> [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *二元表达式* → [条件运算符](./04_Expressions.md#conditional-operator) [try 运算符](./04_Expressions.md#try_operator)<sub>可选</sub> [前缀表达式](./04_Expressions.md#prefix-expression)
>
> *二元表达式* → [类型转换运算符](./04_Expressions.md#type-casting-operator)
>
> *二元表达式* → [二元表达式](./04_Expressions.md#binary-expression) [二元表达式列表](./04_Expressions.md#binary-expressions)<sub>可选</sub>
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
> *基础表达式* → [元组表达式](./04_Expressions.md#Tuple_Expression)
>
> *基础表达式* → [隐式成员表达式](./04_Expressions.md#implicit-member-expression)
>
> *基础表达式* → [通配符表达式](./04_Expressions.md#wildcard-expression)
>
> *基础表达式* → [key-path表达式](./04_Expressions.md#key-path_expression)
>
> *基础表达式* → [选择器表达式](./04_Expressions.md#selector-expression)
>
> *基础表达式* → [key-path字符串表达式](./04_Expressions.md#key-patch-string-expression)
>

<!-- -->

> 字面量表达式语法
>
> *字面量表达式* → [字面量](./04_Expressions.md#literal-expression)
>
> *字面量表达式* → [数组字面量](./04_Expressions.md#array-literal) | [字典字面量](./04_Expressions.md#dictionary-literal) | [练习场字面量](./04_Expressions.md#playground-literal)
>
> *字面量表达式* → **#file** | **#line** | **#column** | **#function** | **dsohandle**
>

<!-- -->

> self 表达式语法
> 

<!-- -->

> 父类表达式语法
>

<!-- -->

> 闭包表达式语法
>


<!-- -->

> 隐式成员表达式语法
>

<!-- -->

> 圆括号表达式语法
>

<!-- -->

> 元组表达式语法
>

<!-- -->

> 通配符表达式语法
>

<!-- -->

> key-path表达式语法
>

<!-- -->

> 选择器表达式语法
>

<!-- -->

> key-path 字符串表达式语法
>

<!-- -->

> 前缀表达式表达式语法
>

<!-- -->

> 函数调用表达式语法
>

<!-- -->

> 初始化表达式语法
>

<!-- -->

> 隐式成员表达式语法
>

<!-- -->

> 前缀 self 表达式语法
>

<!-- -->

> 可选链式表达式语法
>
