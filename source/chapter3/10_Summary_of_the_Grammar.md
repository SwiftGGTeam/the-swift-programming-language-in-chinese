# 语法总结（Summary of the Grammar）

## 语句 {#statements}

> 语句语法
> 
> *语句* → [*表达式*](./04_Expressions.md#expression) **;** _可选_
> 
> *语句* → [*声明*](./06_Declarations.md#declaration) **;** _可选_
> 
> *语句* → [*循环语句*](./05_Statements.md#loop_statement) **;** _可选_
> 
> *语句* → [*分支语句*](./05_Statements.md#branch_statement) **;** _可选_
> 
> *语句* → [*标记语句（Labeled Statement）*](./05_Statements.md#labeled_statement)
> 
> *语句* → [*控制转移语句*](./05_Statements.md#control_transfer_statement) **;** _可选_
> 
> *语句* → [*延迟语句*](TODO) **;** _可选_
> 

> *语句* → [*执行语句*](TODO) **;** _可选_
> 

> *多条语句（Statements）* → [*语句*](./05_Statements.md#statement) [*多条语句（Statements）*](./05_Statements.md#statements) _可选_
> 

<!-- -->

> 循环语句语法
> 
> *循环语句* → [*for 语句*](./05_Statements.md#for_statement)
> 
> *循环语句* → [*for-in 语句*](./05_Statements.md#for_in_statement)
> 
> *循环语句* → [*while 语句*](./05_Statements.md#wheetatype 类型 ile_statement)
> 
> *循环语句* → [*repeat-while 语句*](./05_Statements.md#do_while_statement)
> 

<!-- -->

> For 循环语法
> 
> *for 语句* → **for** [*for 初始条件*](./05_Statements.md#for_init) _可选_ **;** [*表达式*](./04_Expressions.md#expression) _可选_ **;** [*表达式*](./04_Expressions.md#expression) _可选_ [*代码块*](./06_Declarations.md#code_block)
> 
> *for 语句* → **for** **(** [*for 初始条件*](./05_Statements.md#for_init) _可选_ **;** [*表达式*](./04_Expressions.md#expression) _可选_ **;** [*表达式*](./04_Expressions.md#expression) _可选_ **)** [*代码块*](./06_Declarations.md#code_block)
> 
> *for 初始条件* → [*变量声明*](./06_Declarations.md#variable_declaration) | [*表达式集*](./04_Expressions.md#expression_list)
> 

<!-- -->

> For-In 循环语法
> 
> *for-in 语句* → **for case** _可选_ [*模式*](./08_Patterns.md#pattern) **in** [*表达式*](./04_Expressions.md#expression) [*代码块*](./06_Declarations.md#code_block) [*where 从句*](TODO) _可选_
> 

<!-- -->

> While 循环语法
>
> *while 语句* → **while** [*条件子句*](./05_Statements.md#while_condition) [*代码块*](./06_Declarations.md#code_block)
>
> *条件子句* → [*表达式*](TODO)
>
> *条件子句* → [*表达式*](TODO) *,* [*表达式集*]()
>
> *条件子句* → [*表达式集*](TODO)
>
> *条件子句* → [*可用条件（availability-condition*）](TODO) *|* [*表达式集*]()
>
> *条件集* → [*条件*](TODO) *|* [*条件*](TODO) *,* [*条件集*]()
> 
> *条件* → [*可用条件（availability-condition）*](TODO) *|* [*个例条件（case-condition）*](TODO) *|* [*可选绑定条件（optional-binding-condition）*](TODO)
> 
> *个例条件（case-condition）* → **case** [*模式*](TODO) [*构造器*](TODO) [*where 从句*](TODO)_可选_
> 
> *可选绑定条件（optional-binding-condition）* → [*可选绑定头（optional-binding-head）*](TODO) [*可选绑定连续集（optional-binding-continuation-list）*](TODO) _可选_ [*where 从句*](TODO) _可选_
> 
> *可选绑定头（optional-binding-head）* → **let** [*模式 构造器*](TODO) *|* **var**  [*模式 构造器*](TODO)
> 
> *可选绑定连续集（optional-binding-contiuation-list）* → [*可选绑定连续（optional-binding-contiuation）*](TODO) *|* [*可选绑定连续（optional-binding-contiuation）*](TODO) *，* [*可选绑定连续集（optional-binding-contiuation-list）*](TODO)
> 
> *可选绑定连续（optional-binding-continuation）* → [*模式 构造器*](TODO) *|* [*可选绑定头（optional-binding-head）*](TODO)
> 

<!-- -->
> Repeat-While 语句语法
> 
*repeat-while-statement* → **repeat** [*代码块*](TODO) **while** [*表达式*](TODO)

<!-- -->

> 分支语句语法
> 
> *分支语句* → [*if 语句*](./05_Statements.md#if_statement)
> 
> *分支语句* → [*guard 语句*](TODO)
> 
> *分支语句* → [*switch 语句*](./05_Statements.md#switch_statement)
> 

<!-- -->

> If 语句语法
>
> *if 语句* → **if** [*条件子句*](TODO) [*代码块*](TODO) [*else 子句（Clause）*](TODO) _可选_
>
> *else 子句（Clause）* → **else** [*代码块*](./06_Declarations.md#code_block) | **else** [*if 语句*](./05_Statements.md#if_statement)
>

<!-- -->
> Guard 语句语法
>
> *guard 语句* → **guard** [*条件子句*](TODO) **else** [*代码块*](TODO)
>


<!-- -->

> Switch 语句语法
> 
> *switch 语句* → **switch** [*表达式*](./04_Expressions.md#expression) **{** [*SwitchCase*](./05_Statements.md#switch_cases) _可选_ **}**
> 
> *SwitchCase 集* → [*SwitchCase*](./05_Statements.md#switch_case) [*SwitchCase 集*](./05_Statements.md#switch_cases) _可选_
> 
> *SwitchCase* → [*case 标签*](./05_Statements.md#case_label) [*多条语句（Statements）*](./05_Statements.md#statements) | [*default 标签*](./05_Statements.md#default_label) [*多条语句（Statements）*](./05_Statements.md#statements)
> 
> *SwitchCase* → [*case 标签*](./05_Statements.md#case_label) **;** | [*default 标签*](./05_Statements.md#default_label) **;**
> 
> *case 标签* → **case** [*case 项集*](./05_Statements.md#case_item_list) **:**
> 
> *case 项集* → [*模式*](./08_Patterns.md#pattern) [*where-clause*](./05_Statements.md#guard_clause) _可选_ | [*模式*](./08_Patterns.md#pattern) [*where-clause*](./05_Statements.md#guard_clause) _可选_ **,** [*case 项集*](./05_Statements.md#case_item_list)
> 
> *default 标签* → **default** **:**
>
> *where 子句* → **where** [*where 表达式*](TODO)
>
> *where 表达式* → [*表达式*](TODO)
> 

<!-- -->

> 标记语句语法
> 
> *标记语句（Labeled Statement）* → [*语句标签*](./05_Statements.md#statement_label) [*循环语句*](./05_Statements.md#loop_statement) | [*语句标签*](./05_Statements.md#statement_label) [*if 语句*](./05_Statements.md#switch_statement) | [*语句标签*](TODY) [*switch 语句*](TODY)
> 
> *语句标签* → [*标签名称*](./05_Statements.md#label_name) **:**
> 
> *标签名称* → [*标识符*](./02_Lexical_Structure.md#identifier)
> 

<!-- -->

> 控制传递语句（Control Transfer Statement）语法
> 
> *控制传递语句* → [*break 语句*](./05_Statements.md#break_statement)
> 
> *控制传递语句* → [*continue 语句*](./05_Statements.md#continue_statement)
> 
> *控制传递语句* → [*fallthrough 语句*](./05_Statements.md#fallthrough_statement)
> 
> *控制传递语句* → [*return 语句*](./05_Statements.md#return_statement)
> 
> *控制传递语句* → [*throw 语句*](TODO)
> 

<!-- -->

> Break 语句语法
> 
> *break 语句* → **break** [*标签名称*](./05_Statements.md#label_name) _可选_
> 

<!-- -->

> Continue 语句语法
> 
> *continue 语句* → **continue** [*标签名称*](./05_Statements.md#label_name) _可选_
> 

<!-- -->

> Fallthrough 语句语法
> 
> *fallthrough 语句* → **fallthrough**
> 

<!-- -->

> Return 语句语法
> 
> *return 语句* → **return** [*表达式*](./04_Expressions.md#expression) _可选_
> 

<!-- -->
> 可用条件（Availability Condition）语法
> 
> *可用条件（availability-condition）* → **#available** **(** [*多可用参数*(availability-arguments)](TODO) **)**
> 
> *多可用参数（availability- arguments）* → [*可用参数（availability-argument）*](TODO)|[*可用参数（availability-argument）*](TODO) , [多可用参数（availability-arguments）](TODO)
> 
> *可用参数（availability- argument）* → [*平台名（platform-name）*](TODO) [*平台版本（platform-version）*](TODO)
> 
> *可用参数（availability- argument）* → *
> 
> *平台名* → **iOS** | **iOSApplicationExtension**
> 
> *平台名* → **OSX** | **macOSApplicationExtension**
> 
> *平台名* → **watchOS**
> 
> *平台名* → **tvOS**
> 
> *平台版本* → [*十进制数（decimal-digits）*](TODO)
> 
> *平台版本* → [*十进制数（decimal-digits）*](TODO) . [*十进制数（decimal-digits）*](TODO)
> 
> *平台版本* → [*十进制数（decimal-digits）*](TODO) **.** [*十进制数（decimal-digits）*](TODO) **.** [*十进制数（decimal-digits)*](TODO))
> 

<!-- -->
> 抛出语句（Throw Statement）语法
> 
> *抛出语句（throw-statement）* → **throw** [*表达式（expression）*](TODO)
> 

<!-- -->
> 延迟语句（defer-statement）语法
> 
> *延迟语句（defer-statement）* → **defer** [*代码块*](TODO)
> 

<!-- -->
> 执行语句（do-statement）语法
> 
> *执行语句（do-statement）* → **do** [*代码块*](TODO) [*catch-clauses*](TODO) _可选_
> 
> *catch-clauses* → [*catch-clause*](TODO) [*catch-clauses*](TODO) _可选_
> 
> *catch-clauses* → **catch** [*模式（pattern）*](TODO) _可选_  [*where-clause*](TODO) _可选_ [*代码块（code-block）*](TODO) _可选_
> 

## 泛型参数 {#generic_parameters_and_arguments}

> 泛型形参子句（Generic Parameter Clause）语法
>
>
> *泛型参数子句* → **<** [*泛型参数集*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_list) [*约束子句*](./09_Generic_Parameters_and_Arguments.md#requirement_clause) _可选_ **>**
>
> *泛型参数集* → [*泛形参数*](./09_Generic_Parameters_and_Arguments.md#generic_parameter) | [*泛形参数*](./09_Generic_Parameters_and_Arguments.md#generic_parameter) **,** [*泛型参数集*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_list)
> 
> *泛形参数* → [*类型名称*](./03_Types.md#type_name)
> 
> *泛形参数* → [*类型名称*](./03_Types.md#type_name) **:** [*类型标识*](./03_Types.md#type_identifier)
> 
> *泛形参数* → [*类型名称*](./03_Types.md#type_name) **:** [*协议合成类型*](./03_Types.md#protocol_composition_type)
>
> *约束子句* → **where** [*约束集*](./09_Generic_Parameters_and_Arguments.md#requirement_list)
>
> *约束集* → [*约束*](./09_Generic_Parameters_and_Arguments.md#requirement) | [*约束*](./09_Generic_Parameters_and_Arguments.md#requirement) **,** [*约束集*](./09_Generic_Parameters_and_Arguments.md#requirement_list)
> 
> *约束* → [*一致性约束*](./09_Generic_Parameters_and_Arguments.md#conformance_requirement) | [*同类型约束*](./09_Generic_Parameters_and_Arguments.md#same_type_requirement)
> 
> *一致性约束* → [*类型标识*](./03_Types.md#type_identifier) **:** [*类型标识*](./03_Types.md#type_identifier)
> 
> *一致性约束* → [*类型标识*](./03_Types.md#type_identifier) **:** [*协议合成类型*](./03_Types.md#protocol_composition_type)
> 
> *同类型约束* → [*类型标识*](./03_Types.md#type_identifier) **==** [*类型*](./03_Types.md#type_identifier)
> 

<!-- -->

> 泛型实参子句语法
>
> *(泛型参数子句 Generic Argument Clause)* → **<** [*泛型参数集*](./09_Generic_Parameters_and_Arguments.md#generic_argument_list) **>**
>
> *泛型参数集* → [*泛型参数*](./09_Generic_Parameters_and_Arguments.md#generic_argument) | [*泛型参数*](./09_Generic_Parameters_and_Arguments.md#generic_argument) **,** [*泛型参数集*](./09_Generic_Parameters_and_Arguments.md#generic_argument_list)
> 
> *泛型参数* → [*类型*](./03_Types.md#type)
> 

## 声明（Declarations） {#declarations}

> 声明语法
> 
> *声明* → [*导入声明*](./06_Declarations.md#import_declaration)
> 
> *声明* → [*常量声明*](./06_Declarations.md#constant_declaration)
> 
> *声明* → [*变量声明*](./06_Declarations.md#variable_declaration)
> 
> *声明* → [*类型别名声明*](./06_Declarations.md#typealias_declaration)
> 
> *声明* → [*函数声明*](./06_Declarations.md#function_declaration)
> 
> *声明* → [*枚举声明*](./06_Declarations.md#enum_declaration)
> 
> *声明* → [*结构体声明*](./06_Declarations.md#struct_declaration)
> 
> *声明* → [*类声明*](./06_Declarations.md#class_declaration)
> 
> *声明* → [*协议声明*](./06_Declarations.md#protocol_declaration)
> 
> *声明* → [*构造器声明*](./06_Declarations.md#initializer_declaration)
> 
> *声明* → [*析构器声明*](./06_Declarations.md#deinitializer_declaration)
> 
> *声明* → [*扩展声明*](./06_Declarations.md#extension_declaration)
> 
> *声明* → [*下标声明*](./06_Declarations.md#subscript_declaration)
> 
> *声明* → [*运算符声明*](./06_Declarations.md#operator_declaration)
> 
> *声明* → [*优先级组声明*](./06_Declarations.md#precedence_group_declaration)
>
> *声明（Declarations）集* → [*声明*](./06_Declarations.md#declaration) [*声明（Declarations）集*](./06_Declarations.md#declarations) _可选_
> 


<!-- -->

> 顶级（Top Level）声明语法
> 
> *顶级声明* → [*多条语句（Statements）*](./05_Statements.md#statements) _可选_
> 

<!-- -->

> 代码块语法
> 
> *代码块* → **{** [*多条语句（Statements）*](./05_Statements.md#statements) _可选_ **}**
> 

<!-- -->

> 导入（Import）声明语法
> 
> *导入声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ **import** [*导入类型*](./06_Declarations.md#import_kind) _可选_ [*导入路径*](./06_Declarations.md#import_path)
>
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **let** | **var** | **func**
>
> *导入路径* → [*导入路径标识符*](./06_Declarations.md#import_path_identifier) | [*导入路径标识符*](./06_Declarations.md#import_path_identifier) **.** [*导入路径*](./06_Declarations.md#import_path)
> 
> *导入路径标识符* → [*标识符*](./02_Lexical_Structure.md#identifier) | [*运算符*](./02_Lexical_Structure.md#operator)
> 

<!-- -->

> 常数声明语法
>
> *常量声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明修饰符（Modifiers）集*](./06_Declarations.md#declaration_specifiers) _可选_ **let** [*模式构造器集*](./06_Declarations.md#pattern_initializer_list)
>
> *模式构造器集* → [*模式构造器*](./06_Declarations.md#pattern_initializer) | [*模式构造器*](./06_Declarations.md#pattern_initializer)    **,** [*模式构造器集*](./06_Declarations.md#pattern_initializer_list)
> 
> *模式构造器* → [*模式*](./08_Patterns.md#pattern) [*构造器*](./06_Declarations.md#initializer) _可选_
> 
> *构造器* → **=** [*表达式*](./04_Expressions.md#expression)
> 

<!-- -->

> 变量声明语法
> 
> *变量声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*模式构造器集*](./06_Declarations.md#pattern_initializer_list)
> 
> *变量声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*变量名*](./06_Declarations.md#variable_name) [*类型注解*](./03_Types.md#type_annotation) [*代码块*](./06_Declarations.md#code_block)
> 
> *变量声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*变量名*](./06_Declarations.md#variable_name) [*类型注解*](./03_Types.md#type_annotation) [*getter-setter 块*](./06_Declarations.md#getter_setter_block)
> 
> *变量声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*变量名*](./06_Declarations.md#variable_name) [*类型注解*](./03_Types.md#type_annotation) [*getter-setter 关键字（Keyword）块*](./06_Declarations.md#getter_setter_keyword_block)
> 
> *变量声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*变量名*](./06_Declarations.md#variable_name) [*构造器*](./06_Declarations.md#initializer) _可选_ [*willSet-didSet 代码块*](./06_Declarations.md#willSet_didSet_block)
>
> *变量声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*变量名*](./06_Declarations.md#variable_name) [*类型注解*](./03_Types.md#type_annotation) [*构造器*](./06_Declarations.md#initializer) _可选_ [*willSet-didSet 代码块*](./06_Declarations.md#willSet_didSet_block)
>
> *变量声明头（Head）* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明修饰符（Modifers）集*](./06_Declarations.md#declaration_specifiers) _可选_ **var**
>
> *变量名称* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *getter-setter 块* → [*代码块*](./06_Declarations.md#code_block)
>
> *getter-setter 块* → **{** [*getter 子句*](./06_Declarations.md#getter_clause) [*setter 子句*](./06_Declarations.md#setter_clause) _可选_ **}**
>
> *getter-setter 块* → **{** [*setter 子句*](./06_Declarations.md#setter_clause) [*getter 子句*](./06_Declarations.md#getter_clause) **}**
>
> *getter 子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*可变性修饰符（mutation-modifier）*](./06_Declarations.md#mutation-modifier) _可选_  **get**  [*代码块*](./06_Declarations.md#code_block)
>
> *setter 子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*可变性修饰符（mutation-modifier）*](./06_Declarations.md#mutation-modifier) _可选_ **set** [*setter 名称*](./06_Declarations.md#setter_name) _可选_ [*代码块*](./06_Declarations.md#code_block)
>
> *setter 名称* → **(** [*标识符*](./02_Lexical_Structure.md#identifier) **)**
>
> *getter-setter 关键字（Keyword）块* → **{** [*getter 关键字（Keyword）子句*](./06_Declarations.md#getter_keyword_clause) [*setter 关键字（Keyword）子句*](./06_Declarations.md#setter_keyword_clause) _可选_ **}**
>
> *getter-setter 关键字（Keyword）块* → **{** [*setter 关键字（Keyword）子句*](./06_Declarations.md#setter_keyword_clause) [*getter 关键字（Keyword）子句*](./06_Declarations.md#getter_keyword_clause) **}**
>
> *getter 关键字（Keyword）子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*可变性修饰符（mutation-modifier）*](./06_Declarations.md#mutation-modifier) _可选_ **get**
>
> *setter 关键字（Keyword）子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*可变性修饰符（mutation-modifier）*](./06_Declarations.md#mutation-modifier) _可选_ **set**
>
> *willSet-didSet 代码块* → **{** [*willSet 子句*](./06_Declarations.md#willSet_clause) [*didSet 子句*](./06_Declarations.md#didSet_clause) _可选_ **}**
>
> *willSet-didSet 代码块* → **{** [*didSet 子句*](./06_Declarations.md#didSet_clause) [*willSet 子句*](./06_Declarations.md#willSet_clause) _可选_ **}**
>
> *willSet 子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ **willSet** [*setter 名称*](./06_Declarations.md#setter_name) _可选_ [*代码块*](./06_Declarations.md#code_block)
>
> *didSet 子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_
>
 **didSet** [*setter 名称*](./06_Declarations.md#setter_name) _可选_ [*代码块*](./06_Declarations.md#code_block)

<!-- -->

> 类型别名声明语法
>
> *类型别名声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) **typealias** [*类型别名名称*](./06_Declarations.md#typealias_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*类型别名赋值*](./06_Declarations.md#typealias_assignment)
>
> *类型别名名称* → [*标识符*](./02_Lexical_Structure.md#identifier)
> 
> *类型别名赋值* → **=** [*类型*](./03_Types.md#type)
> 

<!-- -->

> 函数声明语法
>
> *函数声明* → [*函数头*](./06_Declarations.md#function_head) [*函数名*](./06_Declarations.md#function_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*函数签名（Signature）*](./06_Declarations.md#function_signature) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*函数体*](./06_Declarations.md#function_body) _可选_
>
> *函数头* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明描述符（Specifiers）集*](./06_Declarations.md#declaration_specifiers) _可选_ **func**
> 
> *函数名* → [*标识符*](./02_Lexical_Structure.md#identifier) | [*运算符*](./02_Lexical_Structure.md#operator)
>
> *函数签名（Signature）* → [*参数子句*](./06_Declarations.md#parameter_clause) **throws** _可选_ [*函数结果*](./06_Declarations.md#function_result) _可选_
>

> *函数签名（Signature）* → [*参数子句*](./06_Declarations.md#parameter_clause) **rethrows** [*函数结果*](./06_Declarations.md#function_result) _可选_
>
> *函数结果* → **->** [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*类型*](./03_Types.md#type)
> 
> *函数体* → [*代码块*](./06_Declarations.md#code_block)
>
> *参数子句* → **(** **)** | **(** [*参数集*](./06_Declarations.md#parameter_list) **)**
>
> *参数集* → [*参数*](./06_Declarations.md#parameter) | [*参数*](./06_Declarations.md#parameter) **,** [*参数集*](./06_Declarations.md#parameter_list)
>
> *参数* → [*外部参数名*](./06_Declarations.md#parameter_name) _可选_ [*本地参数名*](./06_Declarations.md#local_parameter_name) [*类型注解*](./03_Types.md#type_annotation) [*默认参数子句*](./06_Declarations.md#default_argument_clause) _可选_
>
> *参数* → [*外部参数名*](./06_Declarations.md#parameter_name) _可选_ [*本地参数名*](./06_Declarations.md#local_parameter_name) [*类型注解*](./03_Types.md#type_annotation)
>
> *参数* → [*外部参数名*](./06_Declarations.md#parameter_name) _可选_ [*本地参数名*](./06_Declarations.md#local_parameter_name) [*类型注解*](./03_Types.md#type_annotation) **...**
>
> *外部参数名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *本地参数名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *默认参数子句* → **=** [*表达式*](./04_Expressions.md#expression)
>

<!-- -->

> 枚举声明语法
>
> *枚举声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ [*联合式枚举*（union_style_enum）](./06_Declarations.md#union_style_enum)
>
> *枚举声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ [*原始值式枚举（raw-value-style-enum）*](./06_Declarations.md#raw-value-style-enum)
>
> *联合式枚举* → **indirect** _可选_ **enum** [*枚举名*](./06_Declarations.md#enum_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*类型继承子句（type-inheritance-clause）*](./03_Types.md#type-inheritance-clause) _可选_ [*泛型 where 子句（generic-where-clause）*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ **{** [*联合样式枚举成员*](./06_Declarations.md#union_style_enum_members) _可选_ **}**
>
> *联合式枚举成员集* → [*联合式枚举成员*](./06_Declarations.md#union_style_enum_member) [*联合样式枚举成员集*](./06_Declarations.md#union_style_enum_members) _可选_
>
> *联合样式枚举成员* → [*声明*](./06_Declarations.md#declaration) | [*联合式（Union Style）枚举 case 子句*](./06_Declarations.md#union_style_enum_case_clause) | [*编译控制语句*](./05_Statements.md#compiler-control-statement)
>
> *联合式（Union Style）枚举 case 子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ **indirect** _可选_ **case** [*联合式（Union Style）枚举 case 集*](./06_Declarations.md#union_style_enum_case_list)
>
> *联合式（Union Style）枚举 case 集* → [*联合式（Union Style）枚举 case*](./06_Declarations.md#union_style_enum_case) | [*联合式（Union Style）枚举 case*](./06_Declarations.md#union_style_enum_case) **,** [*联合式（Union Style）枚举 case 集*](./06_Declarations.md#union_style_enum_case_list)
>
> *联合式（Union Style）枚举 case* → [*枚举的 case 名*](./06_Declarations.md#enum_case_name) [*元组类型*](./03_Types.md#tuple_type) _可选_
>
> *枚举名* → [*标识符*](./02_Lexical_Structure.md#identifier)
> 
> *枚举的 case 名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *原始值式枚举* → **enum** [*枚举名*](./06_Declarations.md#enum_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*类型继承子句*](./03_Types.md#type-inheritance-clause) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ **{** [*原始值式枚举成员集*](./06_Declarations.md#raw_value_style_enum_members) **}**
>
> *原始值式枚举成员集* → [*原始值式枚举成员*](./06_Declarations.md#raw_value_style_enum_member) [*原始值式枚举成员集*](./06_Declarations.md#raw_value_style_enum_members) _可选_
>
> *原始值式枚举成员* → [*声明*](./06_Declarations.md#declaration) | [*原始值式枚举 case 子句*](./06_Declarations.md#raw_value_style_enum_case_clause) | [*编译控制语句*](./05_Statements.md#compiler-control-statement)
>
> *原始值式枚举 case 子句* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ **case** [*原始值式枚举 case 集*](./06_Declarations.md#raw_value_style_enum_case_list)
>
> *原始值式枚举 case 集* → [*原始值式枚举 case*](./06_Declarations.md#raw_value_style_enum_case) | [*原始值式枚举 case*](./06_Declarations.md#raw_value_style_enum_case) **,** [*原始值式枚举 case 集*](./06_Declarations.md#raw_value_style_enum_case_list)
> 
> *原始值式枚举 case* → [*枚举的 case 名*](./06_Declarations.md#enum_case_name) [*原始值赋值*](./06_Declarations.md#raw_value_assignment) _可选_
>
> *原始值赋值* → **=** [*原始值字面量*](./02_Lexical_Structure.md#literal)
>
> *原始值字面量（raw-value-literal）* → [*数值字面量*](./02_Lexical_Structure.md#literal) | [*静态字符串字面量*](./02_Lexical_Structure.md#literal) | [*布尔字面量*](./02_Lexical_Structure.md#literal)
>

<!-- -->

> 结构体声明语法
>
> *结构体声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ **struct** [*结构体名称*](./06_Declarations.md#struct_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*类型继承子句*](./03_Types.md#type_inheritance_clause) _可选_ [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*结构体主体*](./06_Declarations.md#struct_body)
>
> *结构体名称* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *结构体主体* → **{** [*结构体成员集*](./06_Declarations.md#declarations) _可选_ **}**
>
> *结构体成员集* → [*结构体成员*](./06_Declarations.md#declarations) [*结构体成员集*](./06_Declarations.md#declarations) _可选_
>
> *结构体成员* → [*声明集*](./06_Declarations.md#declarations) | [*编译控制语句*](./05_Statements.md#compiler-control-statement)
>

<!-- -->

> 类声明语法
>
> *类声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ **final** _可选_ **class** [*类名*](./06_Declarations.md#class_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*类型继承子句*](./03_Types.md#type_inheritance_clause) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*类主体*](./06_Declarations.md#class_body)
>
> *类声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ **final** [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ **class** [*类名*](./06_Declarations.md#class_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*类型继承子句*](./03_Types.md#type_inheritance_clause) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*类主体*](./06_Declarations.md#class_body)
>
> *类名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *类主体* → **{** [*类成员集*](./06_Declarations.md#declarations) _可选_ **}**
>
> *类成员集* → [*类成员*](./06_Declarations.md#declarations) [*类成员集*](./06_Declarations.md#declarations) _可选_
>
> *类成员* → [*声明集*](./06_Declarations.md#declarations) | [*编译控制语句*](./05_Statements.md#compiler-control-statement)
>

<!-- -->

> 协议（Protocol）声明语法
>
> *协议声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_  **protocol** [*协议名*](./06_Declarations.md#protocol_name) [*类型继承子句*](./03_Types.md#type_inheritance_clause) _可选_ [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*协议主体*](./06_Declarations.md#protocol_body)
>
> *协议名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *协议主体* → **{** [*协议成员集*](./06_Declarations.md#protocol_member_declarations) _可选_ **}**
>
> *协议成员集* → [*协议成员*](./06_Declarations.md#declarations) [*协议成员集*](./06_Declarations.md#declarations) _可选_
>
> *协议成员* → [*协议成员声明*](./06_Declarations.md#declarations) | [*编译控制语句*](./05_Statements.md#compiler-control-statement)
>
> *协议成员声明* → [*协议属性声明*](./06_Declarations.md#protocol_property_declaration)
> 
> *协议成员声明* → [*协议方法声明*](./06_Declarations.md#protocol_method_declaration)
> 
> *协议成员声明* → [*协议构造器声明*](./06_Declarations.md#protocol_initializer_declaration)
> 
> *协议成员声明* → [*协议下标声明*](./06_Declarations.md#protocol_subscript_declaration)
> 
> *协议成员声明* → [*协议关联类型声明*](./06_Declarations.md#protocol_associated_type_declaration)
>
> *协议成员声明* → [*类型别名声明*](./06_Declarations.md#typealias_declaration)
>

<!-- -->

> 协议属性声明语法
> 
> *协议属性声明* → [*变量声明头（Head）*](./06_Declarations.md#variable_declaration_head) [*变量名*](./06_Declarations.md#variable_name) [*类型注解*](./03_Types.md#type_annotation) [*getter-setter 关键字（Keyword）块*](./06_Declarations.md#getter_setter_keyword_block)
> 

<!-- -->

> 协议方法声明语法
>
> *协议方法声明* → [*函数头*](./06_Declarations.md#function_head) [*函数名*](./06_Declarations.md#function_name) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*函数签名（Signature）*](./06_Declarations.md#function_signature) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_
>

<!-- -->

> 协议构造器声明语法
>
> *协议构造器声明* → [*构造器头（Head）*](./06_Declarations.md#initializer_head) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*参数子句*](./06_Declarations.md#parameter_clause) **throws** _可选_ [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_
>
> *协议构造器声明* → [*构造器头（Head）*](./06_Declarations.md#initializer_head) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*参数子句*](./06_Declarations.md#parameter_clause) **rethrows** [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_
>

<!-- -->

> 协议下标声明语法
>
> *协议下标声明* → [*下标头（Head）*](./06_Declarations.md#subscript_head) [*下标结果（Result）*](./06_Declarations.md#subscript_result) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*getter-setter 关键字（Keyword）块*](./06_Declarations.md#getter_setter_keyword_block)
>

<!-- -->

> 协议关联类型声明语法
>
> *协议关联类型声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ **associatedtype** [*类型别名*](./06_Declarations.md#typealias_name) [*类型继承子句*](./03_Types.md#type_inheritance_clause) _可选_ [*类型别名赋值*](./06_Declarations.md#typealias_assignment) _可选_ [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_
>

<!-- -->

> 构造器声明语法
>
> *构造器声明* → [*构造器头（Head）*](./06_Declarations.md#initializer_head) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*参数子句*](./06_Declarations.md#parameter_clause) **throws** _可选_ [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*构造器主体*](./06_Declarations.md#initializer_body)
>
> *构造器声明* → [*构造器头（Head）*](./06_Declarations.md#initializer_head) [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*参数子句*](./06_Declarations.md#parameter_clause) **rethrows** [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*构造器主体*](./06_Declarations.md#initializer_body)
>
> *构造器头（Head）* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明修饰符集（declaration-modifiers）*](./06_Declarations.md#declaration_modifiers) _可选_  **init**
>
> *构造器头（Head）* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明修饰符集（declaration-modifiers）*](./06_Declarations.md#declaration_modifiers) _可选_  **init ?**
>
> *构造器头（Head）* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明修饰符集（declaration-modifiers）*](./06_Declarations.md#declaration_modifiers) _可选_  **init !**
>
> *构造器主体* → [*代码块*](./06_Declarations.md#code_block)
> 

<!-- -->

> 析构器声明语法
> 
> *析构器声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ **deinit** [*代码块*](./06_Declarations.md#code_block)
> 

<!-- -->

> 扩展（Extension）声明语法
>
> *扩展声明* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier) _可选_ **extension** [*类型标识*](./03_Types.md#type_identifier) [*类型继承子句*](./03_Types.md#type_inheritance_clause) _可选_ [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*扩展主体*](./06_Declarations.md#extension_body)
>
> *扩展主体* → **{** [*扩展成员集*](./06_Declarations.md#declarations) _可选_ **}**
>
> *扩展成员集* → [*扩展成员*](./06_Declarations.md#declarations) [*扩展成员集*](./06_Declarations.md#declarations) _可选_
>
> *扩展成员* → [*声明集*](./06_Declarations.md#declarations) | [*编译控制语句*](./05_Statements.md#compiler-control-statement)
>

<!-- -->

> 下标声明语法
>
> *下标声明* → [*下标头（Head）*](./06_Declarations.md#subscript_head) [*下标结果（Result）*](./06_Declarations.md#subscript_result) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*代码块*](./06_Declarations.md#code_block)
>
> *下标声明* → [*下标头（Head）*](./06_Declarations.md#subscript_head) [*下标结果（Result）*](./06_Declarations.md#subscript_result) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*getter-setter 块*](./06_Declarations.md#getter_setter_block)
>
> *下标声明* → [*下标头（Head）*](./06_Declarations.md#subscript_head) [*下标结果（Result）*](./06_Declarations.md#subscript_result) [*泛型 where 子句*](./09_Generic_Parameters_and_Arguments.md#generic_where_clause) _可选_ [*getter-setter 关键字（Keyword）块*](./06_Declarations.md#getter_setter_keyword_block)
>
> *下标头（Head）* → [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*声明修饰符集（declaration-modifiers）*](./06_Declarations.md#declaration_modifiers) _可选_ **subscript** [*泛型参数子句*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause) _可选_ [*参数子句*](./06_Declarations.md#parameter_clause)
>
> *下标结果（Result）* → **->** [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_ [*类型*](./03_Types.md#type)
> 

<!-- -->

> 运算符声明语法
> 
> *运算符声明* → [*前置运算符声明*](./06_Declarations.md#prefix_operator_declaration) | [*后置运算符声明*](./06_Declarations.md#postfix_operator_declaration) | [*中置运算符声明*](./06_Declarations.md#infix_operator_declaration)
>
> *前置运算符声明* → **prefix** **operator**  [*运算符*](./02_Lexical_Structure.md#operator)
>
> *后置运算符声明* → **postfix** **operator**  [*运算符*](./02_Lexical_Structure.md#operator)
>
> *中置运算符声明* → **infix** **operator**  [*运算符*](./02_Lexical_Structure.md#operator) [*中置运算符属性集*](./06_Declarations.md#infix_operator_attributes) _可选_
>
> *中置运算符属性集* → [*优先级组名*](./06_Declarations.md#precedence_group_name)
>

> 优先级组声明语法
>
> *优先级组声明* → **precedencegroup** [*优先级组名*](./06_Declarations.md#precedence_group_name) **{** [*优先级组属性集*](./06_Declarations.md#precedence_group_attributes) _可选_ **}**
>
> *优先级组属性集* → [*优先级组属性*](./06_Declarations.md#declarations) [*优先级组属性集*](./06_Declarations.md#declarations) _可选_
>
> *优先级组属性* → [*优先级组关系*](./06_Declarations.md#declarations)
>
> *优先级组属性* → [*优先级组赋值*](./06_Declarations.md#declarations)
>
> *优先级组属性* → [*优先级组结合*](./06_Declarations.md#declarations)
>
> *优先级组关系* → **higherThan :** [*优先级组名集*](./06_Declarations.md#declarations)
>
> *优先级组关系* → **lowerThan :** [*优先级组名集*](./06_Declarations.md#declarations)
>
> *优先级组赋值* → **assignment :** [*布尔字面量*](./02_Lexical_Structure.md#string_literal)
>
> *优先级组结合* → **associativity : left**
>
> *优先级组结合* → **associativity : right**
>
> *优先级组结合* → **associativity : none**
>
> *优先级组名集* → [*优先级组名*](./06_Declarations.md#declarations) | [*优先级组名*](./06_Declarations.md#declarations) **,** [*优先级组名集*](./06_Declarations.md#declarations)
>
> *优先级组名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>

<!-- -->
> 声明修饰符语法
>
> *声明修饰符* → **class** | **convenience** | **dynamic** | **final** | **infix** | **lazy** | **optional** | **override** | **postfix** | **prefix** | **required** | **static** | **unowned** | **unowned(safe)** | **unowned(unsafe)** | **weak**
>
> *声明修饰符* → [*访问级别修饰符（access-level-modifier）*](./07_Attributes.md#access-level-modifier)
>
> *声明修饰符* → [*可变性修饰符（mutation-modifier）*](./07_Attributes.md#mutation-modifier)
>
> *声明修饰符集* → [*声明修饰符（declaration-modifier）*](./06_Declarations.md#declaration_modifier) [*声明修饰符集（declaration-modifiers）*](./06_Declarations.md#declaration_modifiers) _可选_
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

## 属性 {#attributes}

> 属性语法
>
> *属性* → **@** [*属性名*](./07_Attributes.md#attribute_name) [*属性参数子句*](./07_Attributes.md#attribute_argument_clause) _可选_
>
> *属性名* → [*标识符*](./02_Lexical_Structure.md#identifier)
>
> *属性参数子句* → **{** [*平衡令牌集*](./07_Attributes.md#balanced_tokens) _可选_  **}**
>
> *属性（Attributes）集* → [*属性*](./07_Attributes.md#attribute) [*属性（Attributes）集*](./07_Attributes.md#attributes) _可选_
>
> *平衡令牌集* → [*平衡令牌*](./07_Attributes.md#balanced_token) [*平衡令牌集*](./07_Attributes.md#balanced_tokens) _可选_
>
> *平衡令牌* → **(** [*平衡令牌集*](./07_Attributes.md#balanced_tokens) _可选_ **)**
>
> *平衡令牌* → **[** [*平衡令牌集*](./07_Attributes.md#balanced_tokens) _可选_ **]**
>
> *平衡令牌* → **{** [*平衡令牌集*](./07_Attributes.md#balanced_tokens) _可选_ **}**
>
> *平衡令牌* → 任意标识符、关键字、字面量或运算符
>
> *平衡令牌* → 除 **(** 、**)**、**[**、**]**、**{**、**}** 外的任意标点符号
>
>

## 模式 {#patterns}

> 模式（Patterns）语法
> 
> *模式* → [*通配符模式*](./08_Patterns.md#wildcard_pattern) [*类型注解*](./03_Types.md#type_annotation) _可选_
> 
> *模式* → [*标识符模式*](./08_Patterns.md#identifier_pattern) [*类型注解*](./03_Types.md#type_annotati Value Bindingon ) _可选_
> 
> *模式* → [*值绑定模式*](./08_Patterns.md#value_binding_pattern)
> 
> *模式* → [*元组模式*](./08_Patterns.md#tuple_pattern) [*类型注解*](./03_Types.md#type_annotation) _可选_
>
> *模式* → [*枚举 case 模式*](./08_Patterns.md#enum_case_pattern)
>
> *模式* → [*可选模式*](./08_Patterns.md#optional_pattern)
>
> *模式* → [*类型转换模式*](./08_Patterns.md#type_casting_pattern)
> 
> *模式* → [*表达式模式*](./08_Patterns.md#expression_pattern)
> 

<!-- -->

> 通配符模式语法
> 
> *通配符模式* → **_**
> 

<!-- -->

> 标识符模式语法
> 
> *标识符模式* → [*标识符*](./02_Lexical_Structure.md#identifier)
> 

<!-- -->

> 值绑定（Value Binding）模式语法
> 
> *值绑定模式* → **var** [*模式*](./08_Patterns.md#pattern) | **let** [*模式*](./08_Patterns.md#pattern)
> 

<!-- -->

> 元组模式语法
> 
> *元组模式* → **(** [*元组模式元素集*](./08_Patterns.md#tuple_pattern_element_list) _可选_ **)**
> 
> *元组模式元素集* → [*元组模式元素*](./08_Patterns.md#tuple_pattern_element) | [*元组模式元素*](./08_Patterns.md#tuple_pattern_element) **,** [*元组模式元素集*](./08_Patterns.md#tuple_pattern_element_list)
>
> *元组模式元素* → [*模式*](./08_Patterns.md#pattern) | [*标识符*](./02_Lexical_Structure.md#identifier) **:** [*模式*](./08_Patterns.md#pattern)
>

<!-- -->

> 枚举 case 模式语法
>
> *enum-case-pattern* → [*类型标识*](./03_Types.md#type_identifier) _可选_ **.** [*枚举 case 名*](./06_Declarations.md#enum_case_name) [*元组模式*](./08_Patterns.md#tuple_pattern) _可选_
>

<!-- -->
> 可选模式语法
>
> *可选模式* → [*标识符模式*](./02_Lexical_Structure.md#identifier) **?**
>

<!-- -->

> 类型转换模式语法
> 
> *类型转换模式（type-casting-pattern）* → [*is 模式*](./08_Patterns.md#is_pattern) | [*as 模式*](./08_Patterns.md#as_pattern)
> 
> *is 模式* → **is** [*类型*](./03_Types.md#type)
> 
> *as 模式* → [*模式*](./08_Patterns.md#pattern) **as** [*类型*](./03_Types.md#type)
> 

<!-- -->

> 表达式模式语法
> 
> *表达式模式* → [*表达式*](./04_Expressions.md#expression)
>

## 泛型参数 {#generic_parameters_and_arguments}

> 泛型形参子句（Generic Parameter Clause）语法
>
>
> *泛型参数子句* → **<** [*泛型参数集*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_list) **>**
>
> *泛型参数集* → [*泛形参数*](./09_Generic_Parameters_and_Arguments.md#generic_parameter) | [*泛形参数*](./09_Generic_Parameters_and_Arguments.md#generic_parameter) **,** [*泛型参数集*](./09_Generic_Parameters_and_Arguments.md#generic_parameter_list)
>
> *泛形参数* → [*类型名称*](./03_Types.md#type_name)
>
> *泛形参数* → [*类型名称*](./03_Types.md#type_name) **:** [*类型标识*](./03_Types.md#type_identifier)
>
> *泛形参数* → [*类型名称*](./03_Types.md#type_name) **:** [*协议合成类型*](./03_Types.md#protocol_composition_type)
>
> *泛型 where 子句* → **where** [*约束集*](./09_Generic_Parameters_and_Arguments.md#requirement_list)
>
> *约束集* → [*约束*](./09_Generic_Parameters_and_Arguments.md#requirement) | [*约束*](./09_Generic_Parameters_and_Arguments.md#requirement) **,** [*约束集*](./09_Generic_Parameters_and_Arguments.md#requirement_list)
>
> *约束* → [*一致性约束*](./09_Generic_Parameters_and_Arguments.md#conformance_requirement) | [*同类型约束*](./09_Generic_Parameters_and_Arguments.md#same_type_requirement)
>
> *一致性约束* → [*类型标识*](./03_Types.md#type_identifier) **:** [*类型标识*](./03_Types.md#type_identifier)
>
> *一致性约束* → [*类型标识*](./03_Types.md#type_identifier) **:** [*协议合成类型*](./03_Types.md#protocol_composition_type)
>
> *同类型约束* → [*类型标识*](./03_Types.md#type_identifier) **==** [*类型*](./03_Types.md#type_identifier)
>
