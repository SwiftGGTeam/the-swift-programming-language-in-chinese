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
>
> *数组字面量* → **[** [数组字面量项列表](./04_Expressions.md#array-literal-items)<sub>可选</sub> **]**
> *数组字面量项列表* → [数组字面量项](./04_Expressions.md#array-literal-item)<sub>可选</sub> | [数组字面量项](./04_Expressions.md#array-literal-item),[数组字面量项列表](./04_Expressions.md#array-literal-items)
> *数组字面量项* → [表达式](./04_Expressions.md#expression)
>
>
> *字典字面量* → [[字典字面量项列表](./04_Expressions.md#dictionary-literal-items) **]** | **[** **:** **]**
> 
> 
> *字典字面量项列表* → [字典字面量项](./04_Expressions.md#dictionary-literal-item) ,**<sub>可选</sub> | [字典字面量项](./04_Expressions.md#dictionary-literal-item) ,[字典字面量项列表](./04_Expressions.md#dictionary-literal-items)
>
> *字典字面量项* → [表达式](./04_Expressions.md#expression) **:** [表达式](./04_Expressions.md#expression)
>
> 
> *palyground 字面量* → **#colorLiteral ( red :  [表达式](./04_Expressions.md#expression) , green :[表达式](./04_Expressions.md#expression),  blue :[表达式](./04_Expressions.md#expression) , alpha : [表达式](./04_Expressions.md#expression) )**
>
> *playground 字面量* → **#fileLiteral ( resourceName : [表达式](#expression) )**
>
> *playground 字面量* → **#imageLiteral ( resourceName : [表达式](#expression) )
<!-- -->

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
> 闭包签名* → [参数子句](./04_Expressions.md#parameter-clause) [函数结果](05_Declarations.md#function-result)<sub>可选</sub> **in**
> 
> *闭包签名* → [标识符列表](./04_Expressions.md#identifier-list) [函数结果](05_Declarations.md#function-result)<sub>可选</sub> **in**
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
> *key-path 后缀* → **?** | **!** | **self** | **\[** [函数调用参数表](./04_Expressions.md#function-call-argument-list) **\]** 
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
> *尾随闭包* → [闭包表达式](./04_Expressions.md#closure-expression)
>

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
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** [十进制数字]    (02_Lexical_Structure.md#decimal-digit)
> 
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** [标识符](02_Lexical_Structure.md#identifier) [泛型实参子句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub><br/>
> 
> *显式成员表达式* → [后缀表达式](./04_Expressions.md#postfix-expression) **.** [标识符]    (02_Lexical_Structure.md#identifier) **(** [参数名称](./04_Expressions.md#argument-names) **)**
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
