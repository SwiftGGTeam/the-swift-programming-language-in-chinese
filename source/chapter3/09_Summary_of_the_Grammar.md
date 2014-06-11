# 语法总结
-----------------

本页包含内容：

* [语句（Statements）](#statements)
* [泛型参数（Generic Parameters and Arguments）](#generic_parameters_and_arguments)
* [声明（Declarations）](#declarations)
* [模式（Patterns）](#patterns)
* [特性（Attributes）](#attributes)
* [表达式（Expressions）](#expressions)
* [词法结构（Lexical Structure）](#lexical_structure)
* [类型（Types）](#types)

<a name="statements"></a>
## 语句

> 语句语法  
> *语句* → [*表达式*](Expressions.html#expression) **;** _可选_  
> *语句* → [*声明*](Declarations.html#declaration) **;** _可选_  
> *语句* → [*循环语句*](Statements.html#loop-statement) **;** _可选_  
> *语句* → [*分支语句*](Statements.html#branch-statement) **;** _可选_  
> *语句* → [*标记语句(Labeled Statement)*](Statements.html#labeled-statement)  
> *语句* → [*控制转移语句*](Statements.html#control-transfer-statement) **;** _可选_  
> *多条语句(Statements)* → [*语句*](Statements.html#statement) [*多条语句(Statements)*](Statements.html#statements) _可选_  

<p></p>

> 循环语句语法  
> *循环语句* → [*for语句*](Statements.html#for-statement)  
> *循环语句* → [*for-in语句*](Statements.html#for-in-statement)  
> *循环语句* → [*while语句*](Statements.html#wheetatype类型ile-statement)  
> *循环语句* → [*do-while语句*](Statements.html#do-while-statement)  

<p></p>

> For 循环语法  
> *for语句* → **for** [*for初始条件*](Statements.html#for-init) _可选_ **;** [*表达式*](Expressions.html#expression) _可选_ **;** [*表达式*](Expressions.html#expression) _可选_ [*代码块*](Declarations.html#code-block)  
> *for语句* → **for** **(** [*for初始条件*](Statements.html#for-init) _可选_ **;** [*表达式*](Expressions.html#expression) _可选_ **;** [*表达式*](Expressions.html#expression) _可选_ **)** [*代码块*](Declarations.html#code-block)  
> *for初始条件* → [*变量声明*](Declarations.html#variable-declaration) | [*expression-list*](Expressions.html#expression-list)  

<p></p>

> For-In 循环语法  
> *for-in语句* → **for** [*模式*](Patterns.html#pattern) **in** [*表达式*](Expressions.html#expression) [*代码块*](Declarations.html#code-block)  

<p></p>

> While 循环语法  
> *while语句* → **while** [*while条件*](Statements.html#while-condition) [*代码块*](Declarations.html#code-block)  
> *while条件* → [*表达式*](Expressions.html#expression) | [*声明*](Declarations.html#declaration)  

<p></p>

> Do-While 循环语法  
> *do-while语句* → **do** [*代码块*](Declarations.html#code-block) **while** [*while条件*](Statements.html#while-condition)  

<p></p>

> 分支语句语法  
> *分支语句* → [*if语句*](Statements.html#if-statement)  
> *分支语句* → [*switch语句*](Statements.html#switch-statement)  

<p></p>

> If语句语法  
> *if语句* → **if** [*if条件*](Statements.html#if-condition) [*代码块*](Declarations.html#code-block) [*else子句(Clause)*](Statements.html#else-clause) _可选_  
> *if条件* → [*表达式*](Expressions.html#expression) | [*声明*](Declarations.html#declaration)  
> *else子句(Clause)* → **else** [*代码块*](Declarations.html#code-block) | **else** [*if语句*](Statements.html#if-statement)  

<p></p>

> Switch语句语法  
> *switch语句* → **switch** [*表达式*](Expressions.html#expression) **{** [*switch多情形(Switch Cases)*](Statements.html#switch-cases) _可选_ **}**  
> *switch多情形(Switch Cases)* → [*switch情形(Switch Case)*](Statements.html#switch-case) [*switch多情形(Switch Cases)*](Statements.html#switch-cases) _可选_  
> *switch情形(Switch Case)* → [*case标签*](Statements.html#case-label) [*多条语句(Statements)*](Statements.html#statements) | [*default标签*](Statements.html#default-label) [*多条语句(Statements)*](Statements.html#statements)  
> *switch情形(Switch Case)* → [*case标签*](Statements.html#case-label) **;** | [*default标签*](Statements.html#default-label) **;**  
> *case标签* → **case** [*case项列表*](Statements.html#case-item-list) **:**  
> *case项列表* → [*模式*](Patterns.html#pattern) [*guard-clause*](Statements.html#guard-clause) _可选_ | [*模式*](Patterns.html#pattern) [*guard-clause*](Statements.html#guard-clause) _可选_ **,** [*case项列表*](Statements.html#case-item-list)  
> *default标签* → **default** **:**  
> *guard-clause* → **where** [*guard-expression*](Statements.html#guard-expression)  
> *guard-expression* → [*表达式*](Expressions.html#expression)  

<p></p>

> 标记语句语法  
> *标记语句(Labeled Statement)* → [*语句标签*](Statements.html#statement-label) [*循环语句*](Statements.html#loop-statement) | [*语句标签*](Statements.html#statement-label) [*switch语句*](Statements.html#switch-statement)  
> *语句标签* → [*标签名称*](Statements.html#label-name) **:**  
> *标签名称* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 控制传递语句(Control Transfer Statement) 语法  
> *控制转移语句* → [*break语句*](Statements.html#break-statement)  
> *控制转移语句* → [*continue语句*](Statements.html#continue-statement)  
> *控制转移语句* → [*fallthrough语句*](Statements.html#fallthrough-statement)  
> *控制转移语句* → [*return语句*](Statements.html#return-statement)  

<p></p>

> Break 语句语法  
> *break语句* → **break** [*标签名称*](Statements.html#label-name) _可选_  

<p></p>

> Continue 语句语法  
> *continue语句* → **continue** [*标签名称*](Statements.html#label-name) _可选_  

<p></p>

> Fallthrough 语句语法  
> *fallthrough语句* → **fallthrough**  

<p></p>

> Return 语句语法  
> *return语句* → **return** [*表达式*](Expressions.html#expression) _可选_  

<a name="generic_parameters_and_arguments"></a>
## 泛型参数

> 泛型形参子句(Generic Parameter Clause) 语法  
> *泛型参数子句* → **<** [*泛型参数列表*](GenericParametersAndArguments.html#generic-parameter-list) [*requirement-clause*](GenericParametersAndArguments.html#requirement-clause) _可选_ **>**  
> *泛型参数列表* → [*泛形参数*](GenericParametersAndArguments.html#generic-parameter) | [*泛形参数*](GenericParametersAndArguments.html#generic-parameter) **,** [*泛型参数列表*](GenericParametersAndArguments.html#generic-parameter-list)  
> *泛形参数* → [*类名*](Types.html#type-name)  
> *泛形参数* → [*类名*](Types.html#type-name) **:** [*类型标识*](Types.html#type-identifier)  
> *泛形参数* → [*类名*](Types.html#type-name) **:** [*protocol-composition-type*](Types.html#protocol-composition-type)  
> *requirement-clause* → **where** [*requirement-list*](GenericParametersAndArguments.html#requirement-list)  
> *requirement-list* → [*requirement*](GenericParametersAndArguments.html#requirement) | [*requirement*](GenericParametersAndArguments.html#requirement) **,** [*requirement-list*](GenericParametersAndArguments.html#requirement-list)  
> *requirement* → [*conformance-requirement*](GenericParametersAndArguments.html#conformance-requirement) | [*same-type-requirement*](GenericParametersAndArguments.html#same-type-requirement)  
> *conformance-requirement* → [*类型标识*](Types.html#type-identifier) **:** [*类型标识*](Types.html#type-identifier)  
> *conformance-requirement* → [*类型标识*](Types.html#type-identifier) **:** [*protocol-composition-type*](Types.html#protocol-composition-type)  
> *same-type-requirement* → [*类型标识*](Types.html#type-identifier) **==** [*类型标识*](Types.html#type-identifier)  

<p></p>

> 泛型实参子句语法  
> *(泛型参数子句Generic Argument Clause)* → **<** [*generic-argument-list*](GenericParametersAndArguments.html#generic-argument-list) **>**  
> *generic-argument-list* → [*generic-argument*](GenericParametersAndArguments.html#generic-argument) | [*generic-argument*](GenericParametersAndArguments.html#generic-argument) **,** [*generic-argument-list*](GenericParametersAndArguments.html#generic-argument-list)  
> *generic-argument* → [*type*](Types.html#type)  

<a name="declarations"></a>
## 声明 (Declarations)

> 声明语法  
> *声明* → [*导入声明*](Declarations.html#import-declaration)  
> *声明* → [*常量声明*](Declarations.html#constant-declaration)  
> *声明* → [*变量声明*](Declarations.html#variable-declaration)  
> *声明* → [*类型别名声明*](Declarations.html#typealias-declaration)  
> *声明* → [*函数声明*](Declarations.html#function-declaration)  
> *声明* → [*枚举声明*](Declarations.html#enum-declaration)  
> *声明* → [*结构体声明*](Declarations.html#struct-declaration)  
> *声明* → [*类声明*](Declarations.html#class-declaration)  
> *声明* → [*协议声明*](Declarations.html#protocol-declaration)  
> *声明* → [*构造函数声明*](Declarations.html#initializer-declaration)  
> *声明* → [*析构函数声明*](Declarations.html#deinitializer-declaration)  
> *声明* → [*扩展声明*](Declarations.html#extension-declaration)  
> *声明* → [*附属脚本声明*](Declarations.html#subscript-declaration)  
> *声明* → [*运算符声明*](Declarations.html#operator-declaration)  
> *多个声明(Declarations)* → [*声明*](Declarations.html#declaration) [*多个声明(Declarations)*](Declarations.html#declarations) _可选_  
> *多个声明描述符(Specifiers)* → [*声明描述符(Specifier)*](Declarations.html#declaration-specifier) [*多个声明描述符(Specifiers)*](Declarations.html#declaration-specifiers) _可选_  
> *声明描述符(Specifier)* → **class** | **mutating** | **nonmutating** | **override** | **static** | **unowned** | **unowned(safe)** | **unowned(unsafe)** | **weak**  

<p></p>

> 顶级(Top Level) 声明语法  
> *顶级声明* → [*多条语句(Statements)*](Statements.html#statements) _可选_  

<p></p>

> 代码块语法  
> *代码块* → **{** [*多条语句(Statements)*](Statements.html#statements) _可选_ **}**  

<p></p>

> 导入(Import)声明语法  
> *导入声明* → [*attributes*](Attributes.html#attributes) _可选_ **import** [*导入类型*](Declarations.html#import-kind) _可选_ [*导入路径*](Declarations.html#import-path)  
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **var** | **func**  
> *导入路径* → [*导入路径标识符*](Declarations.html#import-path-identifier) | [*导入路径标识符*](Declarations.html#import-path-identifier) **.** [*导入路径*](Declarations.html#import-path)  
> *导入路径标识符* → [*标识符*](LexicalStructure.html#identifier) | [*运算符*](LexicalStructure.html#operator)  

<p></p>

> 常数声明语法  
> *常量声明* → [*attributes*](Attributes.html#attributes) _可选_ [*多个声明描述符(Specifiers)*](Declarations.html#declaration-specifiers) _可选_ **let** [*模式构造函数列表*](Declarations.html#pattern-initializer-list)  
> *模式构造函数列表* → [*模式构造器*](Declarations.html#pattern-initializer) | [*模式构造器*](Declarations.html#pattern-initializer) **,** [*模式构造函数列表*](Declarations.html#pattern-initializer-list)  
> *模式构造器* → [*模式*](Patterns.html#pattern) [*构造函数*](Declarations.html#initializer) _可选_  
> *构造函数* → **=** [*表达式*](Expressions.html#expression)  

<p></p>

> 变量声明语法  
> *变量声明* → [*变量声明头(Head)*](Declarations.html#variable-declaration-head) [*模式构造函数列表*](Declarations.html#pattern-initializer-list)  
> *变量声明* → [*变量声明头(Head)*](Declarations.html#variable-declaration-head) [*variable-name*](Declarations.html#variable-name) [*type-annotation*](Types.html#type-annotation) [*代码块*](Declarations.html#code-block)  
> *变量声明* → [*变量声明头(Head)*](Declarations.html#variable-declaration-head) [*variable-name*](Declarations.html#variable-name) [*type-annotation*](Types.html#type-annotation) [*getter-setter块*](Declarations.html#getter-setter-block)  
> *变量声明* → [*变量声明头(Head)*](Declarations.html#variable-declaration-head) [*variable-name*](Declarations.html#variable-name) [*type-annotation*](Types.html#type-annotation) [*getter-setter关键字(Keyword)块*](Declarations.html#getter-setter-keyword-block)  
> *变量声明* → [*变量声明头(Head)*](Declarations.html#variable-declaration-head) [*variable-name*](Declarations.html#variable-name) [*type-annotation*](Types.html#type-annotation) [*构造函数*](Declarations.html#initializer) _可选_ [*willSet-didSet-block*](Declarations.html#willSet-didSet-block)  
> *变量声明头(Head)* → [*attributes*](Attributes.html#attributes) _可选_ [*多个声明描述符(Specifiers)*](Declarations.html#declaration-specifiers) _可选_ **var**  
> *变量名称* → [*标识符*](LexicalStructure.html#identifier)  
> *getter-setter块* → **{** [*getter子句*](Declarations.html#getter-clause) [*setter子句*](Declarations.html#setter-clause) _可选_ **}**  
> *getter-setter块* → **{** [*setter子句*](Declarations.html#setter-clause) [*getter子句*](Declarations.html#getter-clause) **}**  
> *getter子句* → [*attributes*](Attributes.html#attributes) _可选_ **get** [*代码块*](Declarations.html#code-block)  
> *setter子句* → [*attributes*](Attributes.html#attributes) _可选_ **set** [*setter-name*](Declarations.html#setter-name) _可选_ [*代码块*](Declarations.html#code-block)  
> *setter-name* → **(** [*标识符*](LexicalStructure.html#identifier) **)**  
> *getter-setter关键字(Keyword)块* → **{** [*getter关键字(Keyword)子句*](Declarations.html#getter-keyword-clause) [*setter关键字(Keyword)子句*](Declarations.html#setter-keyword-clause) _可选_ **}**  
> *getter-setter关键字(Keyword)块* → **{** [*setter关键字(Keyword)子句*](Declarations.html#setter-keyword-clause) [*getter关键字(Keyword)子句*](Declarations.html#getter-keyword-clause) **}**  
> *getter关键字(Keyword)子句* → [*attributes*](Attributes.html#attributes) _可选_ **get**  
> *setter关键字(Keyword)子句* → [*attributes*](Attributes.html#attributes) _可选_ **set**  
> *willSet-didSet-block* → **{** [*willSet-clause*](Declarations.html#willSet-clause) [*didSet-clause*](Declarations.html#didSet-clause) _可选_ **}**  
> *willSet-didSet-block* → **{** [*didSet-clause*](Declarations.html#didSet-clause) [*willSet-clause*](Declarations.html#willSet-clause) **}**  
> *willSet-clause* → [*attributes*](Attributes.html#attributes) _可选_ **willSet** [*setter-name*](Declarations.html#setter-name) _可选_ [*代码块*](Declarations.html#code-block)  
> *didSet-clause* → [*attributes*](Attributes.html#attributes) _可选_ **didSet** [*setter-name*](Declarations.html#setter-name) _可选_ [*代码块*](Declarations.html#code-block)  

<p></p>

> 类型别名声明语法  
> *类型别名声明* → [*typealias-head*](Declarations.html#typealias-head) [*typealias-assignment*](Declarations.html#typealias-assignment)  
> *typealias-head* → **typealias** [*typealias-name*](Declarations.html#typealias-name)  
> *typealias-name* → [*标识符*](LexicalStructure.html#identifier)  
> *typealias-assignment* → **=** [*type*](Types.html#type)  

<p></p>

> 函数声明语法  
> *函数声明* → [*function-head*](Declarations.html#function-head) [*function-name*](Declarations.html#function-name) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ [*function-signature*](Declarations.html#function-signature) [*function-body*](Declarations.html#function-body)  
> *function-head* → [*attributes*](Attributes.html#attributes) _可选_ [*多个声明描述符(Specifiers)*](Declarations.html#declaration-specifiers) _可选_ **func**  
> *function-name* → [*标识符*](LexicalStructure.html#identifier) | [*运算符*](LexicalStructure.html#operator)  
> *function-signature* → [*parameter-clauses*](Declarations.html#parameter-clauses) [*function-result*](Declarations.html#function-result) _可选_  
> *function-result* → **->** [*attributes*](Attributes.html#attributes) _可选_ [*type*](Types.html#type)  
> *function-body* → [*代码块*](Declarations.html#code-block)  
> *parameter-clauses* → [*parameter-clause*](Declarations.html#parameter-clause) [*parameter-clauses*](Declarations.html#parameter-clauses) _可选_  
> *parameter-clause* → **(** **)** | **(** [*parameter-list*](Declarations.html#parameter-list) **...** _可选_ **)**  
> *parameter-list* → [*parameter*](Declarations.html#parameter) | [*parameter*](Declarations.html#parameter) **,** [*parameter-list*](Declarations.html#parameter-list)  
> *parameter* → **inout** _可选_ **let** _可选_ **#** _可选_ [*parameter-name*](Declarations.html#parameter-name) [*local-parameter-name*](Declarations.html#local-parameter-name) _可选_ [*type-annotation*](Types.html#type-annotation) [*default-argument-clause*](Declarations.html#default-argument-clause) _可选_  
> *parameter* → **inout** _可选_ **var** **#** _可选_ [*parameter-name*](Declarations.html#parameter-name) [*local-parameter-name*](Declarations.html#local-parameter-name) _可选_ [*type-annotation*](Types.html#type-annotation) [*default-argument-clause*](Declarations.html#default-argument-clause) _可选_  
> *parameter* → [*attributes*](Attributes.html#attributes) _可选_ [*type*](Types.html#type)  
> *parameter-name* → [*标识符*](LexicalStructure.html#identifier) | **_**  
> *local-parameter-name* → [*标识符*](LexicalStructure.html#identifier) | **_**  
> *default-argument-clause* → **=** [*表达式*](Expressions.html#expression)  

<p></p>

> 枚举声明语法  
> *枚举声明* → [*attributes*](Attributes.html#attributes) _可选_ [*union-style-enum*](Declarations.html#union-style-enum) | [*attributes*](Attributes.html#attributes) _可选_ [*raw-value-style-enum*](Declarations.html#raw-value-style-enum)  
> *union-style-enum* → [*enum-name*](Declarations.html#enum-name) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ **{** [*union-style-enum-members*](Declarations.html#union-style-enum-members) _可选_ **}**  
> *union-style-enum-members* → [*union-style-enum-member*](Declarations.html#union-style-enum-member) [*union-style-enum-members*](Declarations.html#union-style-enum-members) _可选_  
> *union-style-enum-member* → [*声明*](Declarations.html#declaration) | [*union-style-enum-case-clause*](Declarations.html#union-style-enum-case-clause)  
> *union-style-enum-case-clause* → [*attributes*](Attributes.html#attributes) _可选_ **case** [*union-style-enum-case-list*](Declarations.html#union-style-enum-case-list)  
> *union-style-enum-case-list* → [*union-style-enum-case*](Declarations.html#union-style-enum-case) | [*union-style-enum-case*](Declarations.html#union-style-enum-case) **,** [*union-style-enum-case-list*](Declarations.html#union-style-enum-case-list)  
> *union-style-enum-case* → [*enum-case-name*](Declarations.html#enum-case-name) [*tuple-type*](Types.html#tuple-type) _可选_  
> *enum-name* → [*标识符*](LexicalStructure.html#identifier)  
> *enum-case-name* → [*标识符*](LexicalStructure.html#identifier)  
> *raw-value-style-enum* → [*enum-name*](Declarations.html#enum-name) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ **:** [*类型标识*](Types.html#type-identifier) **{** [*raw-value-style-enum-members*](Declarations.html#raw-value-style-enum-members) _可选_ **}**  
> *raw-value-style-enum-members* → [*raw-value-style-enum-member*](Declarations.html#raw-value-style-enum-member) [*raw-value-style-enum-members*](Declarations.html#raw-value-style-enum-members) _可选_  
> *raw-value-style-enum-member* → [*声明*](Declarations.html#declaration) | [*raw-value-style-enum-case-clause*](Declarations.html#raw-value-style-enum-case-clause)  
> *raw-value-style-enum-case-clause* → [*attributes*](Attributes.html#attributes) _可选_ **case** [*raw-value-style-enum-case-list*](Declarations.html#raw-value-style-enum-case-list)  
> *raw-value-style-enum-case-list* → [*raw-value-style-enum-case*](Declarations.html#raw-value-style-enum-case) | [*raw-value-style-enum-case*](Declarations.html#raw-value-style-enum-case) **,** [*raw-value-style-enum-case-list*](Declarations.html#raw-value-style-enum-case-list)  
> *raw-value-style-enum-case* → [*enum-case-name*](Declarations.html#enum-case-name) [*raw-value-assignment*](Declarations.html#raw-value-assignment) _可选_  
> *raw-value-assignment* → **=** [*literal*](LexicalStructure.html#literal)  

<p></p>

> 结构体声明语法  
> *结构体声明* → [*attributes*](Attributes.html#attributes) _可选_ **struct** [*结构体名称*](Declarations.html#struct-name) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ [*类型继承子句*](Types.html#type-inheritance-clause) _可选_ [*结构体主体*](Declarations.html#struct-body)  
> *结构体名称* → [*标识符*](LexicalStructure.html#identifier)  
> *结构体主体* → **{** [*多个声明(Declarations)*](Declarations.html#declarations) _可选_ **}**  

<p></p>

> 类声明语法  
> *类声明* → [*attributes*](Attributes.html#attributes) _可选_ **class** [*类名*](Declarations.html#class-name) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ [*类型继承子句*](Types.html#type-inheritance-clause) _可选_ [*类主体*](Declarations.html#class-body)  
> *类名* → [*标识符*](LexicalStructure.html#identifier)  
> *类主体* → **{** [*多个声明(Declarations)*](Declarations.html#declarations) _可选_ **}**  

<p></p>

> 协议(Protocol)声明语法  
> *协议声明* → [*attributes*](Attributes.html#attributes) _可选_ **protocol** [*协议名*](Declarations.html#protocol-name) [*类型继承子句*](Types.html#type-inheritance-clause) _可选_ [*协议主体*](Declarations.html#protocol-body)  
> *协议名* → [*标识符*](LexicalStructure.html#identifier)  
> *协议主体* → **{** [*多个协议成员声明(Declarations)*](Declarations.html#protocol-member-declarations) _可选_ **}**  
> *协议成员声明* → [*协议属性声明*](Declarations.html#protocol-property-declaration)  
> *协议成员声明* → [*protocol-method-declaration*](Declarations.html#protocol-method-declaration)  
> *协议成员声明* → [*protocol-initializer-declaration*](Declarations.html#protocol-initializer-declaration)  
> *协议成员声明* → [*协议附属脚本声明*](Declarations.html#protocol-subscript-declaration)  
> *协议成员声明* → [*protocol-associated-type-declaration*](Declarations.html#protocol-associated-type-declaration)  
> *多个协议成员声明(Declarations)* → [*协议成员声明*](Declarations.html#protocol-member-declaration) [*多个协议成员声明(Declarations)*](Declarations.html#protocol-member-declarations) _可选_  

<p></p>

> 协议属性声明语法  
> *协议属性声明* → [*变量声明头(Head)*](Declarations.html#variable-declaration-head) [*variable-name*](Declarations.html#variable-name) [*type-annotation*](Types.html#type-annotation) [*getter-setter关键字(Keyword)块*](Declarations.html#getter-setter-keyword-block)  

<p></p>

> 协议方法声明语法  
> *protocol-method-declaration* → [*function-head*](Declarations.html#function-head) [*function-name*](Declarations.html#function-name) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ [*function-signature*](Declarations.html#function-signature)  

<p></p>

> 协议构造函数声明语法  
> *protocol-initializer-declaration* → [*initializer-head*](Declarations.html#initializer-head) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ [*parameter-clause*](Declarations.html#parameter-clause)  

<p></p>

> 协议附属脚本声明语法  
> *协议附属脚本声明* → [*附属脚本头(Head)*](Declarations.html#subscript-head) [*附属脚本结果(Result)*](Declarations.html#subscript-result) [*getter-setter关键字(Keyword)块*](Declarations.html#getter-setter-keyword-block)  

<p></p>

> 协议关联类型声明语法  
> *protocol-associated-type-declaration* → [*typealias-head*](Declarations.html#typealias-head) [*类型继承子句*](Types.html#type-inheritance-clause) _可选_ [*typealias-assignment*](Declarations.html#typealias-assignment) _可选_  

<p></p>

> 构造函数声明语法  
> *构造函数声明* → [*initializer-head*](Declarations.html#initializer-head) [*泛型参数子句*](GenericParametersAndArguments.html#generic-parameter-clause) _可选_ [*parameter-clause*](Declarations.html#parameter-clause) [*initializer-body*](Declarations.html#initializer-body)  
> *initializer-head* → [*attributes*](Attributes.html#attributes) _可选_ **convenience** _可选_ **init**  
> *initializer-body* → [*代码块*](Declarations.html#code-block)  

<p></p>

> 析构函数声明语法  
> *析构函数声明* → [*attributes*](Attributes.html#attributes) _可选_ **deinit** [*代码块*](Declarations.html#code-block)  

<p></p>

> 扩展(Extension)声明语法  
> *扩展声明* → **extension** [*类型标识*](Types.html#type-identifier) [*类型继承子句*](Types.html#type-inheritance-clause) _可选_ [*extension-body*](Declarations.html#extension-body)  
> *extension-body* → **{** [*多个声明(Declarations)*](Declarations.html#declarations) _可选_ **}**  

<p></p>

> 附属脚本声明语法  
> *附属脚本声明* → [*附属脚本头(Head)*](Declarations.html#subscript-head) [*附属脚本结果(Result)*](Declarations.html#subscript-result) [*代码块*](Declarations.html#code-block)  
> *附属脚本声明* → [*附属脚本头(Head)*](Declarations.html#subscript-head) [*附属脚本结果(Result)*](Declarations.html#subscript-result) [*getter-setter块*](Declarations.html#getter-setter-block)  
> *附属脚本声明* → [*附属脚本头(Head)*](Declarations.html#subscript-head) [*附属脚本结果(Result)*](Declarations.html#subscript-result) [*getter-setter关键字(Keyword)块*](Declarations.html#getter-setter-keyword-block)  
> *附属脚本头(Head)* → [*attributes*](Attributes.html#attributes) _可选_ **subscript** [*parameter-clause*](Declarations.html#parameter-clause)  
> *附属脚本结果(Result)* → **->** [*attributes*](Attributes.html#attributes) _可选_ [*type*](Types.html#type)  

<p></p>

> 运算符声明语法  
> *运算符声明* → [*前置运算符声明*](Declarations.html#prefix-operator-declaration) | [*后置运算符声明*](Declarations.html#postfix-operator-declaration) | [*中置运算符声明*](Declarations.html#infix-operator-declaration)  
> *前置运算符声明* → **运算符** **prefix** [*运算符*](LexicalStructure.html#operator) **{** **}**  
> *后置运算符声明* → **运算符** **postfix** [*运算符*](LexicalStructure.html#operator) **{** **}**  
> *中置运算符声明* → **运算符** **infix** [*运算符*](LexicalStructure.html#operator) **{** [*中置运算符属性*](Declarations.html#infix-operator-attributes) _可选_ **}**  
> *中置运算符属性* → [*优先级子句*](Declarations.html#precedence-clause) _可选_ [*结和性子句*](Declarations.html#associativity-clause) _可选_  
> *优先级子句* → **precedence** [*优先级水平*](Declarations.html#precedence-level)  
> *优先级水平* → 数值 0 到 255  
> *结和性子句* → **associativity** [*结和性*](Declarations.html#associativity)  
> *结和性* → **left** | **right** | **none**  

<a name="patterns"></a>
## 模式

> 模式(Patterns) 语法  
> *模式* → [*wildcard-pattern*](Patterns.html#wildcard-pattern) [*type-annotation*](Types.html#type-annotation) _可选_  
> *模式* → [*identifier-pattern*](Patterns.html#identifier-pattern) [*type-annotation*](Types.html#type-annotation) _可选_  
> *模式* → [*value-binding-pattern*](Patterns.html#value-binding-pattern)  
> *模式* → [*tuple-pattern*](Patterns.html#tuple-pattern) [*type-annotation*](Types.html#type-annotation) _可选_  
> *模式* → [*enum-case-pattern*](Patterns.html#enum-case-pattern)  
> *模式* → [*type-casting-pattern*](Patterns.html#type-casting-pattern)  
> *模式* → [*expression-pattern*](Patterns.html#expression-pattern)  

<p></p>

> 通配符模式语法  
> *wildcard-pattern* → **_**  

<p></p>

> 标识符模式语法  
> *identifier-pattern* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 值绑定模式语法  
> *value-binding-pattern* → **var** [*模式*](Patterns.html#pattern) | **let** [*模式*](Patterns.html#pattern)  

<p></p>

> 元组模式语法  
> *tuple-pattern* → **(** [*tuple-pattern-element-list*](Patterns.html#tuple-pattern-element-list) _可选_ **)**  
> *tuple-pattern-element-list* → [*tuple-pattern-element*](Patterns.html#tuple-pattern-element) | [*tuple-pattern-element*](Patterns.html#tuple-pattern-element) **,** [*tuple-pattern-element-list*](Patterns.html#tuple-pattern-element-list)  
> *tuple-pattern-element* → [*模式*](Patterns.html#pattern)  

<p></p>

> 枚举用例模式语法  
> *enum-case-pattern* → [*类型标识*](Types.html#type-identifier) _可选_ **.** [*enum-case-name*](Declarations.html#enum-case-name) [*tuple-pattern*](Patterns.html#tuple-pattern) _可选_  

<p></p>

> 类型转换模式语法  
> *type-casting-pattern* → [*is-pattern*](Patterns.html#is-pattern) | [*as-pattern*](Patterns.html#as-pattern)  
> *is-pattern* → **is** [*type*](Types.html#type)  
> *as-pattern* → [*模式*](Patterns.html#pattern) **as** [*type*](Types.html#type)  

<p></p>

> 表达式模式语法  
> *expression-pattern* → [*表达式*](Expressions.html#expression)  

<a name="attributes"></a>
## 特性

> 特性语法  
> *attribute* → **@** [*attribute-name*](Attributes.html#attribute-name) [*attribute-argument-clause*](Attributes.html#attribute-argument-clause) _可选_  
> *attribute-name* → [*标识符*](LexicalStructure.html#identifier)  
> *attribute-argument-clause* → **(** [*balanced-tokens*](Attributes.html#balanced-tokens) _可选_ **)**  
> *attributes* → [*attribute*](Attributes.html#attribute) [*attributes*](Attributes.html#attributes) _可选_  
> *balanced-tokens* → [*balanced-token*](Attributes.html#balanced-token) [*balanced-tokens*](Attributes.html#balanced-tokens) _可选_  
> *balanced-token* → **(** [*balanced-tokens*](Attributes.html#balanced-tokens) _可选_ **)**  
> *balanced-token* → **[** [*balanced-tokens*](Attributes.html#balanced-tokens) _可选_ **]**  
> *balanced-token* → **{** [*balanced-tokens*](Attributes.html#balanced-tokens) _可选_ **}**  
> *balanced-token* → Any identifier, keyword, literal, or operator  
> *balanced-token* → Any punctuation except (­, )­, [­, ]­, {­, or }­  

<a name="expressions"></a>
## 表达式

> 表达式语法  
> *表达式* → [*prefix-expression*](Expressions.html#prefix-expression) [*binary-expressions*](Expressions.html#binary-expressions) _可选_  
> *expression-list* → [*表达式*](Expressions.html#expression) | [*表达式*](Expressions.html#expression) **,** [*expression-list*](Expressions.html#expression-list)  

<p></p>

> 前缀表达式语法  
> *prefix-expression* → [*prefix-operator*](LexicalStructure.html#prefix-operator) _可选_ [*postfix-expression*](Expressions.html#postfix-expression)  
> *prefix-expression* → [*in-out-expression*](Expressions.html#in-out-expression)  
> *in-out-expression* → **&** [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 二进制表达式语法  
> *binary-expression* → [*binary-operator*](LexicalStructure.html#binary-operator) [*prefix-expression*](Expressions.html#prefix-expression)  
> *binary-expression* → [*assignment-operator*](Expressions.html#assignment-operator) [*prefix-expression*](Expressions.html#prefix-expression)  
> *binary-expression* → [*conditional-operator*](Expressions.html#conditional-operator) [*prefix-expression*](Expressions.html#prefix-expression)  
> *binary-expression* → [*type-casting-operator*](Expressions.html#type-casting-operator)  
> *binary-expressions* → [*binary-expression*](Expressions.html#binary-expression) [*binary-expressions*](Expressions.html#binary-expressions) _可选_  

<p></p>

> 赋值运算符语法  
> *assignment-operator* → **=**  

<p></p>

> 条件运算符语法  
> *conditional-operator* → **?** [*表达式*](Expressions.html#expression) **:**  

<p></p>

> 类型转换运算符语法  
> *type-casting-operator* → **is** [*type*](Types.html#type) | **as** **?** _可选_ [*type*](Types.html#type)  

<p></p>

> 主表达式语法  
> *primary-expression* → [*标识符*](LexicalStructure.html#identifier) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic-argument-clause) _可选_  
> *primary-expression* → [*literal-expression*](Expressions.html#literal-expression)  
> *primary-expression* → [*self-expression*](Expressions.html#self-expression)  
> *primary-expression* → [*superclass-expression*](Expressions.html#superclass-expression)  
> *primary-expression* → [*closure-expression*](Expressions.html#closure-expression)  
> *primary-expression* → [*parenthesized-expression*](Expressions.html#parenthesized-expression)  
> *primary-expression* → [*implicit-member-expression*](Expressions.html#implicit-member-expression)  
> *primary-expression* → [*wildcard-expression*](Expressions.html#wildcard-expression)  

<p></p>

> 字面量表达式语法  
> *literal-expression* → [*literal*](LexicalStructure.html#literal)  
> *literal-expression* → [*array-literal*](Expressions.html#array-literal) | [*dictionary-literal*](Expressions.html#dictionary-literal)  
> *literal-expression* → **&#95;&#95;FILE&#95;&#95;** | **&#95;&#95;LINE&#95;&#95;** | **&#95;&#95;COLUMN&#95;&#95;** | **&#95;&#95;FUNCTION&#95;&#95;**  
> *array-literal* → **[** [*array-literal-items*](Expressions.html#array-literal-items) _可选_ **]**  
> *array-literal-items* → [*array-literal-item*](Expressions.html#array-literal-item) **,** _可选_ | [*array-literal-item*](Expressions.html#array-literal-item) **,** [*array-literal-items*](Expressions.html#array-literal-items)  
> *array-literal-item* → [*表达式*](Expressions.html#expression)  
> *dictionary-literal* → **[** [*dictionary-literal-items*](Expressions.html#dictionary-literal-items) **]** | **[** **:** **]**  
> *dictionary-literal-items* → [*dictionary-literal-item*](Expressions.html#dictionary-literal-item) **,** _可选_ | [*dictionary-literal-item*](Expressions.html#dictionary-literal-item) **,** [*dictionary-literal-items*](Expressions.html#dictionary-literal-items)  
> *dictionary-literal-item* → [*表达式*](Expressions.html#expression) **:** [*表达式*](Expressions.html#expression)  

<p></p>

> Self 表达式语法  
> *self-expression* → **self**  
> *self-expression* → **self** **.** [*标识符*](LexicalStructure.html#identifier)  
> *self-expression* → **self** **[** [*表达式*](Expressions.html#expression) **]**  
> *self-expression* → **self** **.** **init**  

<p></p>

> 超类表达式语法  
> *superclass-expression* → [*superclass-method-expression*](Expressions.html#superclass-method-expression) | [*superclass-subscript-expression*](Expressions.html#superclass-subscript-expression) | [*superclass-initializer-expression*](Expressions.html#superclass-initializer-expression)  
> *superclass-method-expression* → **super** **.** [*标识符*](LexicalStructure.html#identifier)  
> *superclass-subscript-expression* → **super** **[** [*表达式*](Expressions.html#expression) **]**  
> *superclass-initializer-expression* → **super** **.** **init**  

<p></p>

> 闭包表达式语法  
> *closure-expression* → **{** [*closure-signature*](Expressions.html#closure-signature) _可选_ [*多条语句(Statements)*](Statements.html#statements) **}**  
> *closure-signature* → [*parameter-clause*](Declarations.html#parameter-clause) [*function-result*](Declarations.html#function-result) _可选_ **in**  
> *closure-signature* → [*identifier-list*](LexicalStructure.html#identifier-list) [*function-result*](Declarations.html#function-result) _可选_ **in**  
> *closure-signature* → [*capture-list*](Expressions.html#capture-list) [*parameter-clause*](Declarations.html#parameter-clause) [*function-result*](Declarations.html#function-result) _可选_ **in**  
> *closure-signature* → [*capture-list*](Expressions.html#capture-list) [*identifier-list*](LexicalStructure.html#identifier-list) [*function-result*](Declarations.html#function-result) _可选_ **in**  
> *closure-signature* → [*capture-list*](Expressions.html#capture-list) **in**  
> *capture-list* → **[** [*capture-specifier*](Expressions.html#capture-specifier) [*表达式*](Expressions.html#expression) **]**  
> *capture-specifier* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**  

<p></p>

> 隐式成员表达式语法  
> *implicit-member-expression* → **.** [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 带圆括号的表达式语法  
> *parenthesized-expression* → **(** [*expression-element-list*](Expressions.html#expression-element-list) _可选_ **)**  
> *expression-element-list* → [*expression-element*](Expressions.html#expression-element) | [*expression-element*](Expressions.html#expression-element) **,** [*expression-element-list*](Expressions.html#expression-element-list)  
> *expression-element* → [*表达式*](Expressions.html#expression) | [*标识符*](LexicalStructure.html#identifier) **:** [*表达式*](Expressions.html#expression)  

<p></p>

> 通配符表达式语法  
> *wildcard-expression* → **_**  

<p></p>

> 后缀表达式语法  
> *postfix-expression* → [*primary-expression*](Expressions.html#primary-expression)  
> *postfix-expression* → [*postfix-expression*](Expressions.html#postfix-expression) [*postfix-operator*](LexicalStructure.html#postfix-operator)  
> *postfix-expression* → [*function-call-expression*](Expressions.html#function-call-expression)  
> *postfix-expression* → [*initializer-expression*](Expressions.html#initializer-expression)  
> *postfix-expression* → [*explicit-member-expression*](Expressions.html#explicit-member-expression)  
> *postfix-expression* → [*postfix-self-expression*](Expressions.html#postfix-self-expression)  
> *postfix-expression* → [*dynamic-type-expression*](Expressions.html#dynamic-type-expression)  
> *postfix-expression* → [*subscript-expression*](Expressions.html#subscript-expression)  
> *postfix-expression* → [*forced-value-expression*](Expressions.html#forced-value-expression)  
> *postfix-expression* → [*optional-chaining-expression*](Expressions.html#optional-chaining-expression)  

<p></p>

> 函数调用表达式语法  
> *function-call-expression* → [*postfix-expression*](Expressions.html#postfix-expression) [*parenthesized-expression*](Expressions.html#parenthesized-expression)  
> *function-call-expression* → [*postfix-expression*](Expressions.html#postfix-expression) [*parenthesized-expression*](Expressions.html#parenthesized-expression) _可选_ [*trailing-closure*](Expressions.html#trailing-closure)  
> *trailing-closure* → [*closure-expression*](Expressions.html#closure-expression)  

<p></p>

> 初始化表达式语法  
> *initializer-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **.** **init**  

<p></p>

> 显式成员表达式语法  
> *explicit-member-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **.** [*decimal-digit*](LexicalStructure.html#decimal-digit)  
> *explicit-member-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **.** [*标识符*](LexicalStructure.html#identifier) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic-argument-clause) _可选_  

<p></p>

> Self 表达式语法  
> *postfix-self-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **.** **self**  

<p></p>

> 动态类型表达式语法  
> *dynamic-type-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **.** **dynamicType**  

<p></p>

> 附属脚本表达式语法  
> *subscript-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **[** [*expression-list*](Expressions.html#expression-list) **]**  

<p></p>

> Forced-value 表达式语法  
> *forced-value-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **!**  

<p></p>

> 可选链表达式语法  
> *optional-chaining-expression* → [*postfix-expression*](Expressions.html#postfix-expression) **?**  

<a name="lexical_structure"></a>
## 词法结构

> 标识符语法  
> *标识符* → [*identifier-head*](LexicalStructure.html#identifier-head) [*identifier-characters*](LexicalStructure.html#identifier-characters) _可选_  
> *标识符* → **`** [*identifier-head*](LexicalStructure.html#identifier-head) [*identifier-characters*](LexicalStructure.html#identifier-characters) _可选_ **`**  
> *标识符* → [*implicit-parameter-name*](LexicalStructure.html#implicit-parameter-name)  
> *identifier-list* → [*标识符*](LexicalStructure.html#identifier) | [*标识符*](LexicalStructure.html#identifier) **,** [*identifier-list*](LexicalStructure.html#identifier-list)  
> *identifier-head* → Upper- or lowercase letter A through Z  
> *identifier-head* → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, or U+00B7–U+00BA  
> *identifier-head* → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, or U+00F8–U+00FF  
> *identifier-head* → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, or U+180F–U+1DBF  
> *identifier-head* → U+1E00–U+1FFF  
> *identifier-head* → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, or U+2060–U+206F  
> *identifier-head* → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, or U+2776–U+2793  
> *identifier-head* → U+2C00–U+2DFF or U+2E80–U+2FFF  
> *identifier-head* → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, or U+3040–U+D7FF  
> *identifier-head* → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, or U+FE30–U+FE44  
> *identifier-head* → U+FE47–U+FFFD  
> *identifier-head* → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, or U+40000–U+4FFFD  
> *identifier-head* → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, or U+80000–U+8FFFD  
> *identifier-head* → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, or U+C0000–U+CFFFD  
> *identifier-head* → U+D0000–U+DFFFD or U+E0000–U+EFFFD  
> *identifier-character* → 数值 0 到 9  
> *identifier-character* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F  
> *identifier-character* → [*identifier-head*](LexicalStructure.html#identifier-head)  
> *identifier-characters* → [*identifier-character*](LexicalStructure.html#identifier-character) [*identifier-characters*](LexicalStructure.html#identifier-characters) _可选_  
> *implicit-parameter-name* → **$** [*decimal-digits*](LexicalStructure.html#decimal-digits)  

<p></p>

> 字面量语法  
> *literal* → [*integer-literal*](LexicalStructure.html#integer-literal) | [*floating-point-literal*](LexicalStructure.html#floating-point-literal) | [*string-literal*](LexicalStructure.html#string-literal)  

<p></p>

> 整形字面量语法  
> *integer-literal* → [*binary-literal*](LexicalStructure.html#binary-literal)  
> *integer-literal* → [*octal-literal*](LexicalStructure.html#octal-literal)  
> *integer-literal* → [*十进制字面量*](LexicalStructure.html#decimal-literal)  
> *integer-literal* → [*hexadecimal-literal*](LexicalStructure.html#hexadecimal-literal)  
> *binary-literal* → **0b** [*binary-digit*](LexicalStructure.html#binary-digit) [*binary-literal-characters*](LexicalStructure.html#binary-literal-characters) _可选_  
> *binary-digit* → 数值 0 到 1  
> *binary-literal-character* → [*binary-digit*](LexicalStructure.html#binary-digit) | **_**  
> *binary-literal-characters* → [*binary-literal-character*](LexicalStructure.html#binary-literal-character) [*binary-literal-characters*](LexicalStructure.html#binary-literal-characters) _可选_  
> *octal-literal* → **0o** [*octal-digit*](LexicalStructure.html#octal-digit) [*octal-literal-characters*](LexicalStructure.html#octal-literal-characters) _可选_  
> *octal-digit* → 数值 0 到 7  
> *octal-literal-character* → [*octal-digit*](LexicalStructure.html#octal-digit) | **_**  
> *octal-literal-characters* → [*octal-literal-character*](LexicalStructure.html#octal-literal-character) [*octal-literal-characters*](LexicalStructure.html#octal-literal-characters) _可选_  
> *十进制字面量* → [*decimal-digit*](LexicalStructure.html#decimal-digit) [*decimal-literal-characters*](LexicalStructure.html#decimal-literal-characters) _可选_  
> *decimal-digit* → 数值 0 到 9  
> *decimal-digits* → [*decimal-digit*](LexicalStructure.html#decimal-digit) [*decimal-digits*](LexicalStructure.html#decimal-digits) _可选_  
> *decimal-literal-character* → [*decimal-digit*](LexicalStructure.html#decimal-digit) | **_**  
> *decimal-literal-characters* → [*decimal-literal-character*](LexicalStructure.html#decimal-literal-character) [*decimal-literal-characters*](LexicalStructure.html#decimal-literal-characters) _可选_  
> *hexadecimal-literal* → **0x** [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-literal-characters*](LexicalStructure.html#hexadecimal-literal-characters) _可选_  
> *hexadecimal-digit* → 数值 0 到 9, a through f, or A through F  
> *hexadecimal-literal-character* → [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) | **_**  
> *hexadecimal-literal-characters* → [*hexadecimal-literal-character*](LexicalStructure.html#hexadecimal-literal-character) [*hexadecimal-literal-characters*](LexicalStructure.html#hexadecimal-literal-characters) _可选_  

<p></p>

> 浮点型字面量语法  
> *floating-point-literal* → [*十进制字面量*](LexicalStructure.html#decimal-literal) [*decimal-fraction*](LexicalStructure.html#decimal-fraction) _可选_ [*decimal-exponent*](LexicalStructure.html#decimal-exponent) _可选_  
> *floating-point-literal* → [*hexadecimal-literal*](LexicalStructure.html#hexadecimal-literal) [*hexadecimal-fraction*](LexicalStructure.html#hexadecimal-fraction) _可选_ [*hexadecimal-exponent*](LexicalStructure.html#hexadecimal-exponent)  
> *decimal-fraction* → **.** [*十进制字面量*](LexicalStructure.html#decimal-literal)  
> *decimal-exponent* → [*floating-point-e*](LexicalStructure.html#floating-point-e) [*sign*](LexicalStructure.html#sign) _可选_ [*十进制字面量*](LexicalStructure.html#decimal-literal)  
> *hexadecimal-fraction* → **.** [*hexadecimal-literal*](LexicalStructure.html#hexadecimal-literal) _可选_  
> *hexadecimal-exponent* → [*floating-point-p*](LexicalStructure.html#floating-point-p) [*sign*](LexicalStructure.html#sign) _可选_ [*hexadecimal-literal*](LexicalStructure.html#hexadecimal-literal)  
> *floating-point-e* → **e** | **E**  
> *floating-point-p* → **p** | **P**  
> *sign* → **+** | **-**  

<p></p>

> 字符型字面量语法  
> *string-literal* → **"** [*quoted-text*](LexicalStructure.html#quoted-text) **"**  
> *quoted-text* → [*quoted-text-item*](LexicalStructure.html#quoted-text-item) [*quoted-text*](LexicalStructure.html#quoted-text) _可选_  
> *quoted-text-item* → [*escaped-character*](LexicalStructure.html#escaped-character)  
> *quoted-text-item* → **\(** [*表达式*](Expressions.html#expression) **)**  
> *quoted-text-item* → Any Unicode extended grapheme cluster except "­, \­, U+000A, or U+000D  
> *escaped-character* → **\0** | **\\** | **\t** | **\n** | **\r** | **\"** | **\'**  
> *escaped-character* → **\x** [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit)  
> *escaped-character* → **\u** [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit)  
> *escaped-character* → **\U** [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit) [*hexadecimal-digit*](LexicalStructure.html#hexadecimal-digit)  

<p></p>

> 运算符语法语法  
> *运算符* → [*operator-character*](LexicalStructure.html#operator-character) [*运算符*](LexicalStructure.html#operator) _可选_  
> *operator-character* → **/** | **=** | **-** | **+** | **!** | **&#42;** | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **.**  
> *binary-operator* → [*运算符*](LexicalStructure.html#operator)  
> *prefix-operator* → [*运算符*](LexicalStructure.html#operator)  
> *postfix-operator* → [*运算符*](LexicalStructure.html#operator)  

<a name="types"></a>
## 类型

> 类型语法  
> *type* → [*array-type*](Types.html#array-type) | [*function-type*](Types.html#function-type) | [*类型标识*](Types.html#type-identifier) | [*tuple-type*](Types.html#tuple-type) | [*可选类型*](Types.html#optional-type) | [*implicitly-unwrapped-optional-type*](Types.html#implicitly-unwrapped-optional-type) | [*protocol-composition-type*](Types.html#protocol-composition-type) | [*metatype-type*](Types.html#metatype-type)  

<p></p>

> 类型标注语法  
> *type-annotation* → **:** [*attributes*](Attributes.html#attributes) _可选_ [*type*](Types.html#type)  

<p></p>

> 类型标识语法  
> *类型标识* → [*类名*](Types.html#type-name) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic-argument-clause) _可选_ | [*类名*](Types.html#type-name) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic-argument-clause) _可选_ **.** [*类型标识*](Types.html#type-identifier)  
> *类名* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 元组类型语法  
> *tuple-type* → **(** [*tuple-type-body*](Types.html#tuple-type-body) _可选_ **)**  
> *tuple-type-body* → [*tuple-type-element-list*](Types.html#tuple-type-element-list) **...** _可选_  
> *tuple-type-element-list* → [*tuple-type-element*](Types.html#tuple-type-element) | [*tuple-type-element*](Types.html#tuple-type-element) **,** [*tuple-type-element-list*](Types.html#tuple-type-element-list)  
> *tuple-type-element* → [*attributes*](Attributes.html#attributes) _可选_ **inout** _可选_ [*type*](Types.html#type) | **inout** _可选_ [*element-name*](Types.html#element-name) [*type-annotation*](Types.html#type-annotation)  
> *element-name* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 函数类型语法  
> *function-type* → [*type*](Types.html#type) **->** [*type*](Types.html#type)  

<p></p>

> 数组类型语法  
> *array-type* → [*type*](Types.html#type) **[** **]** | [*array-type*](Types.html#array-type) **[** **]**  

<p></p>

> 可选类型语法  
> *可选类型* → [*type*](Types.html#type) **?**  

<p></p>

> 隐式解析可选类型语法  
> *implicitly-unwrapped-optional-type* → [*type*](Types.html#type) **!**  

<p></p>

> 协议合成类型语法  
> *protocol-composition-type* → **protocol** **<** [*protocol-identifier-list*](Types.html#protocol-identifier-list) _可选_ **>**  
> *protocol-identifier-list* → [*protocol-identifier*](Types.html#protocol-identifier) | [*protocol-identifier*](Types.html#protocol-identifier) **,** [*protocol-identifier-list*](Types.html#protocol-identifier-list)  
> *protocol-identifier* → [*类型标识*](Types.html#type-identifier)  

<p></p>

> 元类型语法  
> *metatype-type* → [*type*](Types.html#type) **.** **Type** | [*type*](Types.html#type) **.** **Protocol**  

<p></p>

> 类型继承子句语法  
> *类型继承子句* → **:** [*type-inheritance-list*](Types.html#type-inheritance-list)  
> *type-inheritance-list* → [*类型标识*](Types.html#type-identifier) | [*类型标识*](Types.html#type-identifier) **,** [*type-inheritance-list*](Types.html#type-inheritance-list)
