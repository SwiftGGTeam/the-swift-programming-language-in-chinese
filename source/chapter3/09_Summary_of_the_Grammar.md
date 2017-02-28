# 语法总结（Summary of the Grammar）
-----

> 1.0
> 翻译：[stanzhai](https://github.com/stanzhai)
> 校对：[xielingwang](https://github.com/xielingwang)

> 2.0
> 翻译+校对：[miaosiqi](https://github.com/miaosiqi)

本页包含内容：

* [语句（Statements）](#statements)
* [泛型参数（Generic Parameters and Arguments）](#generic_parameters_and_arguments)
* [声明（Declarations）](#declarations)
* [模式（Patterns）](#patterns)
* [属性（Attributes）](#attributes)
* [表达式（Expressions）](#expressions)
* [词法结构（Lexical Structure）](#lexical_structure)
* [类型（Types）](#types)

<a name="statements"></a>
## 语句

> 语句语法  
> *语句* → [*表达式*](../chapter3/04_Expressions.html#expression) **;** _可选_  
> *语句* → [*声明*](../chapter3/05_Declarations.html#declaration) **;** _可选_  
> *语句* → [*循环语句*](../chapter3/10_Statements.html#loop_statement) **;** _可选_  
> *语句* → [*分支语句*](../chapter3/10_Statements.html#branch_statement) **;** _可选_  
> *语句* → [*标记语句(Labeled Statement)*](../chapter3/10_Statements.html#labeled_statement)  
> *语句* → [*控制转移语句*](../chapter3/10_Statements.html#control_transfer_statement) **;** _可选_  
> *语句* → [*延迟语句*](TODO) **;** _可选_ 

> *语句* → [*执行语句*](TODO) **;** _可选_ 

> *多条语句(Statements)* → [*语句*](../chapter3/10_Statements.html#statement) [*多条语句(Statements)*](../chapter3/10_Statements.html#statements) _可选_  

<!-- -->

> 循环语句语法  
> *循环语句* → [*for语句*](../chapter3/10_Statements.html#for_statement)  
> *循环语句* → [*for-in语句*](../chapter3/10_Statements.html#for_in_statement)  
> *循环语句* → [*while语句*](../chapter3/10_Statements.html#wheetatype类型ile_statement)  
> *循环语句* → [*repeat-while语句*](../chapter3/10_Statements.html#do_while_statement)  

<!-- -->

> For 循环语法  
> *for语句* → **for** [*for初始条件*](../chapter3/10_Statements.html#for_init) _可选_ **;** [*表达式*](../chapter3/04_Expressions.html#expression) _可选_ **;** [*表达式*](../chapter3/04_Expressions.html#expression) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *for语句* → **for** **(** [*for初始条件*](../chapter3/10_Statements.html#for_init) _可选_ **;** [*表达式*](../chapter3/04_Expressions.html#expression) _可选_ **;** [*表达式*](../chapter3/04_Expressions.html#expression) _可选_ **)** [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *for初始条件* → [*变量声明*](../chapter3/05_Declarations.html#variable_declaration) | [*表达式集*](../chapter3/04_Expressions.html#expression_list)  

<!-- -->

> For-In 循环语法  
> *for-in语句* → **for case** _可选_ [*模式*](../chapter3/07_Patterns.html#pattern) **in** [*表达式*](../chapter3/04_Expressions.html#expression) [*代码块*](../chapter3/05_Declarations.html#code_block) [*where从句*](TODO) _可选_

<!-- -->

> While 循环语法  
> *while语句* → **while** [*条件从句*](../chapter3/10_Statements.html#while_condition) [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *条件从句* → [*表达式*](TODO)

> *条件从句* → [*表达式*](TODO) *,* [*表达式集*]()

>*条件从句* → [*表达式集*](TODO)

> *条件从句* → [*可用条件 (availability-condition*)](TODO) *|* [*表达式集*]()

> *条件集* → [*条件*](TODO) *|* [*条件*](TODO) *,* [*条件集*]()

> *条件* → [*可用条件(availability-condition)*](TODO) *|* [*个例条件(case-condition)*](TODO) *|* [*可选绑定条件(optional-binding-condition)*](TODO)

> *个例条件(case-condition)* → **case** [*模式*](TODO) [*构造器*](TODO) [*where从句*](TODO)_可选_ 

> *可选绑定条件(optional-binding-condition)* → [*可选绑定头(optional-binding-head)*](TODO) [*可选绑定连续集(optional-binding-continuation-list)*](TODO) _可选_ [*where从句*](TODO) _可选_

> *可选绑定头(optional-binding-head)* → **let** [*模式 构造器*](TODO) *|* **var**  [*模式 构造器*](TODO)

> *可选绑定连续集(optional-binding-contiuation-list)* → [*可选绑定连续(optional-binding-contiuation)*](TODO) *|* [*可选绑定连续(optional-binding-contiuation)*](TODO) *，* [*可选绑定连续集(optional-binding-contiuation-list)*](TODO)

> *可选绑定连续(optional-binding-continuation)* → [*模式 构造器*](TODO) *|* [*可选绑定头(optional-binding-head)*](TODO) 

<!-- -->
> Repeat-While语句语法
*repeat-while-statement* → **repeat** [*代码块*](TODO) **while** [*表达式*](TODO)  

<!-- -->

> 分支语句语法  
> *分支语句* → [*if语句*](../chapter3/10_Statements.html#if_statement) 

> *分支语句* → [*guard语句*](TODO)  

> *分支语句* → [*switch语句*](../chapter3/10_Statements.html#switch_statement)  

<!-- -->

> If语句语法  
> *if语句* → **if** [*条件从句*](TODO) [*代码块*](TODO) [*else从句(Clause)*](TODO) _可选_  
 
> *else从句(Clause)* → **else** [*代码块*](../chapter3/05_Declarations.html#code_block) | **else** [*if语句*](../chapter3/10_Statements.html#if_statement)  


<!-- -->
>Guard 语句语法
>*guard语句* → **guard** [*条件从句*](TODO) **else** [*代码块*](TODO) 

 
<!-- -->

> Switch语句语法  
> *switch语句* → **switch** [*表达式*](../chapter3/04_Expressions.html#expression) **{** [*SwitchCase*](../chapter3/10_Statements.html#switch_cases) _可选_ **}**  
> *SwitchCase集* → [*SwitchCase*](../chapter3/10_Statements.html#switch_case) [*SwitchCase集*](../chapter3/10_Statements.html#switch_cases) _可选_  
> *SwitchCase* → [*case标签*](../chapter3/10_Statements.html#case_label) [*多条语句(Statements)*](../chapter3/10_Statements.html#statements) | [*default标签*](../chapter3/10_Statements.html#default_label) [*多条语句(Statements)*](../chapter3/10_Statements.html#statements)  
> *SwitchCase* → [*case标签*](../chapter3/10_Statements.html#case_label) **;** | [*default标签*](../chapter3/10_Statements.html#default_label) **;**  
> *case标签* → **case** [*case项集*](../chapter3/10_Statements.html#case_item_list) **:**  
> *case项集* → [*模式*](../chapter3/07_Patterns.html#pattern) [*where-clause*](../chapter3/10_Statements.html#guard_clause) _可选_ | [*模式*](../chapter3/07_Patterns.html#pattern) [*where-clause*](../chapter3/10_Statements.html#guard_clause) _可选_ **,** [*case项集*](../chapter3/10_Statements.html#case_item_list)  
> *default标签* → **default** **:**  
> *where从句* → **where** [*where表达式*](TODO)  
> *where表达式* → [*表达式*](TODO)  

<!-- -->

> 标记语句语法  
> *标记语句(Labeled Statement)* → [*语句标签*](../chapter3/10_Statements.html#statement_label) [*循环语句*](../chapter3/10_Statements.html#loop_statement) | [*语句标签*](../chapter3/10_Statements.html#statement_label) [*if语句*](../chapter3/10_Statements.html#switch_statement) | [*语句标签*](TODY) [*switch语句*](TODY) 
> *语句标签* → [*标签名称*](../chapter3/10_Statements.html#label_name) **:**  
> *标签名称* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  

<!-- -->

> 控制传递语句(Control Transfer Statement) 语法  
> *控制传递语句* → [*break语句*](../chapter3/10_Statements.html#break_statement)  
> *控制传递语句* → [*continue语句*](../chapter3/10_Statements.html#continue_statement)  
> *控制传递语句* → [*fallthrough语句*](../chapter3/10_Statements.html#fallthrough_statement)  
> *控制传递语句* → [*return语句*](../chapter3/10_Statements.html#return_statement) 
> *控制传递语句* → [*throw语句*](TODO) 

<!-- -->

> Break 语句语法  
> *break语句* → **break** [*标签名称*](../chapter3/10_Statements.html#label_name) _可选_  

<!-- -->

> Continue 语句语法  
> *continue语句* → **continue** [*标签名称*](../chapter3/10_Statements.html#label_name) _可选_  

<!-- -->

> Fallthrough 语句语法  
> *fallthrough语句* → **fallthrough**  

<!-- -->

> Return 语句语法  
> *return语句* → **return** [*表达式*](../chapter3/04_Expressions.html#expression) _可选_  

<!-- -->
>可用条件(Availability Condition)语法

>*可用条件(availability-condition)* → **#available** **(** [*多可用参数*(availability-arguments)](TODO) **)** 

>*多可用参数(availability- arguments)* → [*可用参数(availability-argument)*](TODO)|[*可用参数(availability-argument)*](TODO) , [多可用参数(availability-arguments)](TODO)

>*可用参数(availability- argument)* → [*平台名(platform-name)*](TODO) [*平台版本(platform-version)*](TODO)

>*可用参数(availability- argument)* → *

>*平台名* → **iOS** | **iOSApplicationExtension**

>*平台名* → **OSX** | **OSXApplicationExtension**

>*平台名* → **watchOS** 

>*平台版本* → [*十进制数(decimal-digits)*](TODO)

>*平台版本* → [*十进制数(decimal-digits)*](TODO) . [*十进制数(decimal-digits)*](TODO) 

>*平台版本* → [*十进制数(decimal-digits)*](TODO) **.** [*十进制数(decimal-digits)*](TODO) **.** [*十进制数（decimal-digits)*](TODO))

<!-- -->
>抛出语句(Throw Statement)语法

>*抛出语句(throw-statement)* → **throw** [*表达式(expression)*](TODO)

<!-- -->
>延迟语句 (defer-statement)语法

>*延迟语句(defer-statement)* → **defer** [*代码块*](TODO)

<!-- -->
>执行语句(do-statement)语法

>*执行语句(do-statement)* → **do** [*代码块*](TODO) [*catch-clauses*](TODO) _可选_

>*catch-clauses* → [*catch-clause*](TODO) [*catch-clauses*](TODO) _可选_

>*catch-clauses* → **catch** [*模式(pattern)*](TODO) _可选_  [*where-clause*](TODO) _可选_ [*代码块(code-block)*](TODO) _可选_



<a name="generic_parameters_and_arguments"></a>
## 泛型参数

> 泛型形参从句(Generic Parameter Clause) 语法  
> *泛型参数从句* → **<** [*泛型参数集*](GenericParametersAndArguments.html#generic_parameter_list) [*约束从句*](GenericParametersAndArguments.html#requirement_clause) _可选_ **>**  
> *泛型参数集* → [*泛形参数*](GenericParametersAndArguments.html#generic_parameter) | [*泛形参数*](GenericParametersAndArguments.html#generic_parameter) **,** [*泛型参数集*](GenericParametersAndArguments.html#generic_parameter_list)  
> *泛形参数* → [*类型名称*](../chapter3/03_Types.html#type_name)  
> *泛形参数* → [*类型名称*](../chapter3/03_Types.html#type_name) **:** [*类型标识*](../chapter3/03_Types.html#type_identifier)  
> *泛形参数* → [*类型名称*](../chapter3/03_Types.html#type_name) **:** [*协议合成类型*](../chapter3/03_Types.html#protocol_composition_type)  
> *约束从句* → **where** [*约束集*](GenericParametersAndArguments.html#requirement_list)  
> *约束集* → [*约束*](GenericParametersAndArguments.html#requirement) | [*约束*](GenericParametersAndArguments.html#requirement) **,** [*约束集*](GenericParametersAndArguments.html#requirement_list)  
> *约束* → [*一致性约束*](GenericParametersAndArguments.html#conformance_requirement) | [*同类型约束*](GenericParametersAndArguments.html#same_type_requirement)  
> *一致性约束* → [*类型标识*](../chapter3/03_Types.html#type_identifier) **:** [*类型标识*](../chapter3/03_Types.html#type_identifier)  
> *一致性约束* → [*类型标识*](../chapter3/03_Types.html#type_identifier) **:** [*协议合成类型*](../chapter3/03_Types.html#protocol_composition_type)  
> *同类型约束* → [*类型标识*](../chapter3/03_Types.html#type_identifier) **==** [*类型*](../chapter3/03_Types.html#type_identifier)  

<!-- -->

> 泛型实参从句语法  
> *(泛型参数从句Generic Argument Clause)* → **<** [*泛型参数集*](GenericParametersAndArguments.html#generic_argument_list) **>**  
> *泛型参数集* → [*泛型参数*](GenericParametersAndArguments.html#generic_argument) | [*泛型参数*](GenericParametersAndArguments.html#generic_argument) **,** [*泛型参数集*](GenericParametersAndArguments.html#generic_argument_list)  
> *泛型参数* → [*类型*](../chapter3/03_Types.html#type)  

<a name="declarations"></a>
## 声明 (Declarations) 

> 声明语法  
> *声明* → [*导入声明*](../chapter3/05_Declarations.html#import_declaration)  
> *声明* → [*常量声明*](../chapter3/05_Declarations.html#constant_declaration)  
> *声明* → [*变量声明*](../chapter3/05_Declarations.html#variable_declaration)  
> *声明* → [*类型别名声明*](../chapter3/05_Declarations.html#typealias_declaration)  
> *声明* → [*函数声明*](../chapter3/05_Declarations.html#function_declaration)  
> *声明* → [*枚举声明*](../chapter3/05_Declarations.html#enum_declaration)  
> *声明* → [*结构体声明*](../chapter3/05_Declarations.html#struct_declaration)  
> *声明* → [*类声明*](../chapter3/05_Declarations.html#class_declaration)  
> *声明* → [*协议声明*](../chapter3/05_Declarations.html#protocol_declaration)  
> *声明* → [*构造器声明*](../chapter3/05_Declarations.html#initializer_declaration)  
> *声明* → [*析构器声明*](../chapter3/05_Declarations.html#deinitializer_declaration)  
> *声明* → [*扩展声明*](../chapter3/05_Declarations.html#extension_declaration)  
> *声明* → [*下标声明*](../chapter3/05_Declarations.html#subscript_declaration)  
> *声明* → [*运算符声明*](../chapter3/05_Declarations.html#operator_declaration)  
> *声明(Declarations)集* → [*声明*](../chapter3/05_Declarations.html#declaration) [*声明(Declarations)集*](../chapter3/05_Declarations.html#declarations) _可选_  
 

<!-- -->

> 顶级(Top Level) 声明语法  
> *顶级声明* → [*多条语句(Statements)*](../chapter3/10_Statements.html#statements) _可选_  

<!-- -->

> 代码块语法  
> *代码块* → **{** [*多条语句(Statements)*](../chapter3/10_Statements.html#statements) _可选_ **}**  

<!-- -->

> 导入(Import)声明语法  
> *导入声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **import** [*导入类型*](../chapter3/05_Declarations.html#import_kind) _可选_ [*导入路径*](../chapter3/05_Declarations.html#import_path)  
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **var** | **func**  
> *导入路径* → [*导入路径标识符*](../chapter3/05_Declarations.html#import_path_identifier) | [*导入路径标识符*](../chapter3/05_Declarations.html#import_path_identifier) **.** [*导入路径*](../chapter3/05_Declarations.html#import_path)  
> *导入路径标识符* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) | [*运算符*](../chapter3/02_Lexical_Structure.html#operator)  

<!-- -->

> 常数声明语法  
> *常量声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修改符(Modifiers)集*](../chapter3/05_Declarations.html#declaration_specifiers) _可选_ **let** [*模式构造器集*](../chapter3/05_Declarations.html#pattern_initializer_list)  
> *模式构造器集* → [*模式构造器*](../chapter3/05_Declarations.html#pattern_initializer) | [*模式构造器*](../chapter3/05_Declarations.html#pattern_initializer) **,** [*模式构造器集*](../chapter3/05_Declarations.html#pattern_initializer_list)  
> *模式构造器* → [*模式*](../chapter3/07_Patterns.html#pattern) [*构造器*](../chapter3/05_Declarations.html#initializer) _可选_  
> *构造器* → **=** [*表达式*](../chapter3/04_Expressions.html#expression)  

<!-- -->

> 变量声明语法  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*模式构造器集*](../chapter3/05_Declarations.html#pattern_initializer_list)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型注解*](../chapter3/03_Types.html#type_annotation) [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型注解*](../chapter3/03_Types.html#type_annotation) [*getter-setter块*](../chapter3/05_Declarations.html#getter_setter_block)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型注解*](../chapter3/03_Types.html#type_annotation) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型注解*](../chapter3/03_Types.html#type_annotation) [*构造器*](../chapter3/05_Declarations.html#initializer) _可选_ [*willSet-didSet代码块*](../chapter3/05_Declarations.html#willSet_didSet_block)  
> *变量声明头(Head)* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修改符(Modifers)集*](../chapter3/05_Declarations.html#declaration_specifiers) _可选_ **var**  
> *变量名称* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *getter-setter块* → **{** [*getter从句*](../chapter3/05_Declarations.html#getter_clause) [*setter从句*](../chapter3/05_Declarations.html#setter_clause) _可选_ **}**  
> *getter-setter块* → **{** [*setter从句*](../chapter3/05_Declarations.html#setter_clause) [*getter从句*](../chapter3/05_Declarations.html#getter_clause) **}**  
> *getter从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **get** [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *setter从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **set** [*setter名称*](../chapter3/05_Declarations.html#setter_name) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *setter名称* → **(** [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) **)**  
> *getter-setter关键字(Keyword)块* → **{** [*getter关键字(Keyword)从句*](../chapter3/05_Declarations.html#getter_keyword_clause) [*setter关键字(Keyword)从句*](../chapter3/05_Declarations.html#setter_keyword_clause) _可选_ **}**  
> *getter-setter关键字(Keyword)块* → **{** [*setter关键字(Keyword)从句*](../chapter3/05_Declarations.html#setter_keyword_clause) [*getter关键字(Keyword)从句*](../chapter3/05_Declarations.html#getter_keyword_clause) **}**  
> *getter关键字(Keyword)从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **get**  
> *setter关键字(Keyword)从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **set**  
> *willSet-didSet代码块* → **{** [*willSet从句*](../chapter3/05_Declarations.html#willSet_clause) [*didSet从句*](../chapter3/05_Declarations.html#didSet_clause) _可选_ **}**  
> *willSet-didSet代码块* → **{** [*didSet从句*](../chapter3/05_Declarations.html#didSet_clause) [*willSet从句*](../chapter3/05_Declarations.html#willSet_clause) **}**  
> *willSet从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **willSet** [*setter名称*](../chapter3/05_Declarations.html#setter_name) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *didSet从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **didSet** [*setter名称*](../chapter3/05_Declarations.html#setter_name) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  

<!-- -->

> 类型别名声明语法  
> *类型别名声明* → [*类型别名头(Head)*](../chapter3/05_Declarations.html#typealias_head) [*类型别名赋值*](../chapter3/05_Declarations.html#typealias_assignment)  
> *类型别名头(Head)* → [*属性*](TODO) _可选_ [*访问级别修改符(access-level-modifier)*](TODO) **typealias** [*类型别名名称*](../chapter3/05_Declarations.html#typealias_name)  
> *类型别名名称* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *类型别名赋值* → **=** [*类型*](../chapter3/03_Types.html#type)  

<!-- -->

> 函数声明语法  
> *函数声明* → [*函数头*](../chapter3/05_Declarations.html#function_head) [*函数名*](../chapter3/05_Declarations.html#function_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*函数签名(Signature)*](../chapter3/05_Declarations.html#function_signature) [*函数体*](../chapter3/05_Declarations.html#function_body)  
> *函数头* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明描述符(Specifiers)集*](../chapter3/05_Declarations.html#declaration_specifiers) _可选_ **func**  
> *函数名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) | [*运算符*](../chapter3/02_Lexical_Structure.html#operator)  
> *函数签名(Signature)* → [*parameter-clauses*](../chapter3/05_Declarations.html#parameter_clauses) **throws** _可选_ [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_ 

> *函数签名(Signature)* → [*parameter-clauses*](../chapter3/05_Declarations.html#parameter_clauses) **rethrows** [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_  
> *函数结果* → **->** [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)  
> *函数体* → [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *参数从句* → [*参数从句*](../chapter3/05_Declarations.html#parameter_clause) [*parameter-clauses*](../chapter3/05_Declarations.html#parameter_clauses) _可选_  
> *参数从句* → **(** **)** | **(** [*参数集*](../chapter3/05_Declarations.html#parameter_list) **...** _可选_ **)**  
> *参数集* → [*参数*](../chapter3/05_Declarations.html#parameter) | [*参数*](../chapter3/05_Declarations.html#parameter) **,** [*参数集*](../chapter3/05_Declarations.html#parameter_list)  
> *参数* → **inout** _可选_ **let** _可选_ [*外部参数名*](../chapter3/05_Declarations.html#parameter_name) _可选_ [*本地参数名*](../chapter3/05_Declarations.html#local_parameter_name) _可选_ [*类型注解*](../chapter3/03_Types.html#type_annotation) [*默认参数从句*](../chapter3/05_Declarations.html#default_argument_clause) _可选_  
> *参数* → **inout** _可选_ **var** [*外部参数名*](../chapter3/05_Declarations.html#parameter_name) [*本地参数名*](../chapter3/05_Declarations.html#local_parameter_name) _可选_ [*类型注解*](../chapter3/03_Types.html#type_annotation) [*默认参数从句*](../chapter3/05_Declarations.html#default_argument_clause) _可选_  
> *参数* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)  
> *外部参数名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) | **_**  
> *本地参数名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) | **_**  
> *默认参数从句* → **=** [*表达式*](../chapter3/04_Expressions.html#expression)  

<!-- -->

> 枚举声明语法  
> *枚举声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修改器(access-level-modifier)*](TODO) _可选_ [*联合式枚举*](../chapter3/05_Declarations.html#union_style_enum) 

> *枚举声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修改器(access-level-modifier)*](TODO) _可选_ [*原始值式枚举(raw-value-style-enum)*](TODO)

> *联合式枚举* → **enum** [*枚举名*](../chapter3/05_Declarations.html#enum_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承从句(type-inheritance-clause)*](TODO) _可选_ **{** [*联合样式枚举成员*](../chapter3/05_Declarations.html#union_style_enum_members) _可选_ **}**  

> *联合样式枚举成员* → [*union-style-enum-member*](../chapter3/05_Declarations.html#union_style_enum_member) [*联合样式枚举成员*](../chapter3/05_Declarations.html#union_style_enum_members) _可选_  

> *联合样式枚举成员* → [*声明*](../chapter3/05_Declarations.html#declaration) | [*联合式(Union Style)的枚举case从句*](../chapter3/05_Declarations.html#union_style_enum_case_clause)  

> *联合式(Union Style)的枚举case从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **case** [*联合式(Union Style)的枚举case集*](../chapter3/05_Declarations.html#union_style_enum_case_list)  
> *联合式(Union Style)的枚举case集* → [*联合式(Union Style)的case*](../chapter3/05_Declarations.html#union_style_enum_case) | [*联合式(Union Style)的case*](../chapter3/05_Declarations.html#union_style_enum_case) **,** [*联合式(Union Style)的枚举case集*](../chapter3/05_Declarations.html#union_style_enum_case_list)  
> *联合式(Union Style)的枚举case* → [*枚举的case名*](../chapter3/05_Declarations.html#enum_case_name) [*元组类型*](../chapter3/03_Types.html#tuple_type) _可选_  
> *枚举名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *枚举的case名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *原始值式枚举* → **enum** [*枚举名*](../chapter3/05_Declarations.html#enum_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ **:** [*类型标识*](../chapter3/03_Types.html#type_identifier) **{** [*原始值式枚举成员集*](../chapter3/05_Declarations.html#raw_value_style_enum_members) _可选_ **}**  
> *原始值式枚举成员集* → [*原始值式枚举成员*](../chapter3/05_Declarations.html#raw_value_style_enum_member) [*原始值式枚举成员集*](../chapter3/05_Declarations.html#raw_value_style_enum_members) _可选_  
> *原始值式枚举成员* → [*声明*](../chapter3/05_Declarations.html#declaration) | [*原始值式枚举case从句*](../chapter3/05_Declarations.html#raw_value_style_enum_case_clause)  
> *原始值式枚举case从句* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **case** [*原始值式枚举case集*](../chapter3/05_Declarations.html#raw_value_style_enum_case_list)  
> *原始值式枚举case集* → [*原始值式枚举case*](../chapter3/05_Declarations.html#raw_value_style_enum_case) | [*原始值式枚举case*](../chapter3/05_Declarations.html#raw_value_style_enum_case) **,** [*原始值式枚举case集*](../chapter3/05_Declarations.html#raw_value_style_enum_case_list)  
> *原始值式枚举case* → [*枚举的case名*](../chapter3/05_Declarations.html#enum_case_name) [*原始值赋值*](../chapter3/05_Declarations.html#raw_value_assignment) _可选_  
> *原始值赋值* → **=** [*字面量*](../chapter3/02_Lexical_Structure.html#literal) 
> *原始值字面量(raw-value-literal)* → [*数值字面量*](TODO) | [*字符串字面量*](TODO) | [*布尔字面量*](TODO)

<!-- -->

> 结构体声明语法  
> *结构体声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修改器(access-level-modifier)*](TODO) _可选_ **struct** [*结构体名称*](../chapter3/05_Declarations.html#struct_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承从句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*结构体主体*](../chapter3/05_Declarations.html#struct_body)  
> *结构体名称* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *结构体主体* → **{** [*声明(Declarations)集*](../chapter3/05_Declarations.html#declarations) _可选_ **}**  

<!-- -->

> 类声明语法  
> *类声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修改器(access-level-modifier)*](TODO) **class** [*类名*](../chapter3/05_Declarations.html#class_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承从句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*类主体*](../chapter3/05_Declarations.html#class_body)  
> *类名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *类主体* → **{** [*声明(Declarations)集*](../chapter3/05_Declarations.html#declarations) _可选_ **}**  

<!-- -->

> 协议(Protocol)声明语法  
> *协议声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_[*访问级别修改器(access-level-modifier)*](TODO)  **protocol** [*协议名*](../chapter3/05_Declarations.html#protocol_name) [*类型继承从句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*协议主体*](../chapter3/05_Declarations.html#protocol_body)  
> *协议名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *协议主体* → **{** [*协议成员声明(Declarations)集*](../chapter3/05_Declarations.html#protocol_member_declarations) _可选_ **}**  
> *协议成员声明* → [*协议属性声明*](../chapter3/05_Declarations.html#protocol_property_declaration)  
> *协议成员声明* → [*协议方法声明*](../chapter3/05_Declarations.html#protocol_method_declaration)  
> *协议成员声明* → [*协议构造器声明*](../chapter3/05_Declarations.html#protocol_initializer_declaration)  
> *协议成员声明* → [*协议下标声明*](../chapter3/05_Declarations.html#protocol_subscript_declaration)  
> *协议成员声明* → [*协议关联类型声明*](../chapter3/05_Declarations.html#protocol_associated_type_declaration)  
> *协议成员声明(Declarations)集* → [*协议成员声明*](../chapter3/05_Declarations.html#protocol_member_declaration) [*协议成员声明(Declarations)集*](../chapter3/05_Declarations.html#protocol_member_declarations) _可选_  

<!-- -->

> 协议属性声明语法  
> *协议属性声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型注解*](../chapter3/03_Types.html#type_annotation) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  

<!-- -->

> 协议方法声明语法  
> *协议方法声明* → [*函数头*](../chapter3/05_Declarations.html#function_head) [*函数名*](../chapter3/05_Declarations.html#function_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*函数签名(Signature)*](../chapter3/05_Declarations.html#function_signature)  

<!-- -->

> 协议构造器声明语法  
> *协议构造器声明* → [*构造器头(Head)*](../chapter3/05_Declarations.html#initializer_head) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*参数从句*](../chapter3/05_Declarations.html#parameter_clause)  

<!-- -->

> 协议下标声明语法  
> *协议下标声明* → [*下标头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*下标结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  

<!-- -->

> 协议关联类型声明语法  
> *协议关联类型声明* → [*类型别名头(Head)*](../chapter3/05_Declarations.html#typealias_head) [*类型继承从句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*类型别名赋值*](../chapter3/05_Declarations.html#typealias_assignment) _可选_  

<!-- -->

> 构造器声明语法  
> *构造器声明* → [*构造器头(Head)*](../chapter3/05_Declarations.html#initializer_head) [*泛型参数从句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*参数从句*](../chapter3/05_Declarations.html#parameter_clause) [*构造器主体*](../chapter3/05_Declarations.html#initializer_body)  
> *构造器头(Head)* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修改器集(declaration-modifiers)*](TODO) _可选_  **init**  
> *构造器头(Head)* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修改器集(declaration-modifiers)*](TODO) _可选_  **init ?**

> *构造器头(Head)* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修改器集(declaration-modifiers)*](TODO) _可选_  **init !**    

> *构造器主体* → [*代码块*](../chapter3/05_Declarations.html#code_block)  

<!-- -->

> 析构器声明语法  
> *析构器声明* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **deinit** [*代码块*](../chapter3/05_Declarations.html#code_block)  

<!-- -->

> 扩展(Extension)声明语法  
> *扩展声明* → [*访问级别修改器*](TODO) _可选_ **extension** [*类型标识*](../chapter3/03_Types.html#type_identifier) [*类型继承从句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*extension-body*](../chapter3/05_Declarations.html#extension_body)  
> *extension-body* → **{** [*声明(Declarations)集*](../chapter3/05_Declarations.html#declarations) _可选_ **}**  

<!-- -->

> 下标声明语法  
> *下标声明* → [*下标头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*下标结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *下标声明* → [*下标头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*下标结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*getter-setter块*](../chapter3/05_Declarations.html#getter_setter_block)  
> *下标声明* → [*下标头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*下标结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  
> *下标头(Head)* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修改器(declaration-modifiers)*](TODO) _可选_ **subscript** [*参数从句*](../chapter3/05_Declarations.html#parameter_clause)  
> *下标结果(Result)* → **->** [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)  

<!-- -->

> 运算符声明语法  
> *运算符声明* → [*前置运算符声明*](../chapter3/05_Declarations.html#prefix_operator_declaration) | [*后置运算符声明*](../chapter3/05_Declarations.html#postfix_operator_declaration) | [*中置运算符声明*](../chapter3/05_Declarations.html#infix_operator_declaration)  
> *前置运算符声明* → **prefix** **运算符**  [*运算符*](../chapter3/02_Lexical_Structure.html#operator) **{** **}**  
> *后置运算符声明* → **postfix** **运算符**  [*运算符*](../chapter3/02_Lexical_Structure.html#operator) **{** **}**  
> *中置运算符声明* → **infix** **运算符**  [*运算符*](../chapter3/02_Lexical_Structure.html#operator) **{** [*中置运算符属性集*](../chapter3/05_Declarations.html#infix_operator_attributes) _可选_ **}**  
> *中置运算符属性集* → [*优先级从句*](../chapter3/05_Declarations.html#precedence_clause) _可选_ [*结和性从句*](../chapter3/05_Declarations.html#associativity_clause) _可选_  
> *优先级从句* → **precedence** [*优先级水平*](../chapter3/05_Declarations.html#precedence_level)  
> *优先级水平* → 数值 0 到 255，首末项包括在内 
> *结和性从句* → **associativity** [*结和性*](../chapter3/05_Declarations.html#associativity)  
> *结和性* → **left** | **right** | **none**  

<!-- -->
声明修改器语法
> *声明修改器* → **类** | **便捷(convenience)** | **动态(dynamic)** | **final** | **中置(infix)** | **lazy** | **可变(mutating)** | **不可变(nonmutating)** | **可选(optional)** | **改写(override)** | **后置** | **前置** | **required** | **static** | **unowned** | **unowned(safe)** | **unowned(unsafe)** | **弱(weak)**

> *声明修改器* → [*访问级别声明器(access-level-modifier)*](TODO)

> *声明修改集* → [*声明修改器*](TODO) [*声明修改器集*](TODO) _可选_

> *访问级别修改器* → **内部的** | **内部的(set)** 

> *访问级别修改器* → **私有的** | **私有的(set)** 

> *访问级别修改器* → **公共的** 
| **公共的(set)** 

> *访问级别修改器集* →[*访问级别修改器*](TODO) [*访问级别修改器集*](TODO) _可选_ 

<a name="patterns"></a>
## 模式

> 模式(Patterns) 语法  
> *模式* → [*通配符模式*](../chapter3/07_Patterns.html#wildcard_pattern) [*类型注解*](../chapter3/03_Types.html#type_annotation) _可选_  
> *模式* → [*标识符模式*](../chapter3/07_Patterns.html#identifier_pattern) [*类型注解*](../chapter3/03_Types.html#type_annotati Value Bindingon ) _可选_  
> *模式* → [*值绑定模式*](../chapter3/07_Patterns.html#value_binding_pattern)  
> *模式* → [*元组模式*](../chapter3/07_Patterns.html#tuple_pattern) [*类型注解*](../chapter3/03_Types.html#type_annotation) _可选_  
 
> *模式* → [*枚举个例模式*](../chapter3/07_Patterns.html#enum_case_pattern)  
> *模式* → [*可选模式*](TODO) 
> *模式* → [*类型转换模式*](../chapter3/07_Patterns.html#type_casting_pattern)  
> *模式* → [*表达式模式*](../chapter3/07_Patterns.html#expression_pattern)  

<!-- -->

> 通配符模式语法  
> *通配符模式* → **_**  

<!-- -->

> 标识符模式语法  
> *标识符模式* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  

<!-- -->

> 值绑定(Value Binding)模式语法  
> *值绑定模式* → **var** [*模式*](../chapter3/07_Patterns.html#pattern) | **let** [*模式*](../chapter3/07_Patterns.html#pattern)  

<!-- -->

> 元组模式语法  
> *元组模式* → **(** [*元组模式元素集*](../chapter3/07_Patterns.html#tuple_pattern_element_list) _可选_ **)**  
> *元组模式元素集* → [*元组模式元素*](../chapter3/07_Patterns.html#tuple_pattern_element) | [*元组模式元素*](../chapter3/07_Patterns.html#tuple_pattern_element) **,** [*元组模式元素集*](../chapter3/07_Patterns.html#tuple_pattern_element_list)  
> *元组模式元素* → [*模式*](../chapter3/07_Patterns.html#pattern)  

<!-- -->

> 枚举用例模式语法  
> *enum-case-pattern* → [*类型标识*](../chapter3/03_Types.html#type_identifier) _可选_ **.** [*枚举的case名*](../chapter3/05_Declarations.html#enum_case_name) [*元组模式*](../chapter3/07_Patterns.html#tuple_pattern) _可选_ 

<!-- -->
> 可选模式语法
> *可选模式* → [*识别符模式*](TODO) **?**


<!-- -->

> 类型转换模式语法  
> *类型转换模式(type-casting-pattern)* → [*is模式*](../chapter3/07_Patterns.html#is_pattern) | [*as模式*](../chapter3/07_Patterns.html#as_pattern)  
> *is模式* → **is** [*类型*](../chapter3/03_Types.html#type)  
> *as模式* → [*模式*](../chapter3/07_Patterns.html#pattern) **as** [*类型*](../chapter3/03_Types.html#type)  

<!-- -->

> 表达式模式语法  
> *表达式模式* → [*表达式*](../chapter3/04_Expressions.html#expression)  

<a name="attributes"></a>
## 属性

> 属性语法  
> *属性* → **@** [*属性名*](../chapter3/06_Attributes.html#attribute_name) [*属性参数从句*](../chapter3/06_Attributes.html#attribute_argument_clause) _可选_  
> *属性名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *属性参数从句* → **(** [*平衡令牌集*](../chapter3/06_Attributes.html#balanced_tokens) _可选_ **)**  
> *属性(Attributes)集* → [*属性*](../chapter3/06_Attributes.html#attribute) [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_  
> *平衡令牌集* → [*平衡令牌*](../chapter3/06_Attributes.html#balanced_token) [*平衡令牌集*](../chapter3/06_Attributes.html#balanced_tokens) _可选_  
> *平衡令牌* → **(** [*平衡令牌集*](../chapter3/06_Attributes.html#balanced_tokens) _可选_ **)**  
> *平衡令牌* → **[** [*平衡令牌集*](../chapter3/06_Attributes.html#balanced_tokens) _可选_ **]**  
> *平衡令牌* → **{** [*平衡令牌集*](../chapter3/06_Attributes.html#balanced_tokens) _可选_ **}**  
> *平衡令牌* → **任意标识符, 关键字, 字面量或运算符**  
> *平衡令牌* → **任意标点除了(, ), [, ], {, 或 }**

<a name="expressions"></a>
## 表达式

> 表达式语法  
> *表达式* → [*try-operator*](TODO) _可选_ [*前置表达式*](../chapter3/04_Expressions.html#prefix_expression) [*二元表达式集*](../chapter3/04_Expressions.html#binary_expressions) _可选_  
> *表达式集* → [*表达式*](../chapter3/04_Expressions.html#expression) | [*表达式*](../chapter3/04_Expressions.html#expression) **,** [*表达式集*](../chapter3/04_Expressions.html#expression_list)  

<!-- -->

> 前置表达式语法  
> *前置表达式* → [*前置运算符*](../chapter3/02_Lexical_Structure.html#prefix_operator) _可选_ [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression)  
> *前置表达式* → [*写入写出(in-out)表达式*](../chapter3/04_Expressions.html#in_out_expression)  
> *写入写出(in-out)表达式* → **&** [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) 

<!-- -->
> try表达式语法
> *try-operator* → **try** | **try !**  


<!-- -->

> 二元表达式语法  
> *二元表达式* → [*二元运算符*](../chapter3/02_Lexical_Structure.html#binary_operator) [*前置表达式*](../chapter3/04_Expressions.html#prefix_expression)  
> *二元表达式* → [*赋值运算符*](../chapter3/04_Expressions.html#assignment_operator) [*try运算符*](TODO) _可选_ [*前置表达式*](../chapter3/04_Expressions.html#prefix_expression)  
> *二元表达式* → [*条件运算符*](../chapter3/04_Expressions.html#conditional_operator) [*try运算符*](TODO) _可选_ [*前置表达式*](../chapter3/04_Expressions.html#prefix_expression)  
> *二元表达式* → [*类型转换运算符*](../chapter3/04_Expressions.html#type_casting_operator)  
> *二元表达式集* → [*二元表达式*](../chapter3/04_Expressions.html#binary_expression) [*二元表达式集*](../chapter3/04_Expressions.html#binary_expressions) _可选_  

<!-- -->

> 赋值运算符语法  
> *赋值运算符* → **=**  

<!-- -->

> 三元条件运算符语法  
> *三元条件运算符* → **?** [*表达式*](../chapter3/04_Expressions.html#expression) **:**  

<!-- -->

> 类型转换运算符语法  
> *类型转换运算符* → **is** [*类型*](../chapter3/03_Types.html#type) 

> *类型转换运算符* → **as** [*类型*](../chapter3/03_Types.html#type) 

> *类型转换运算符* → **as ?** [*类型*](../chapter3/03_Types.html#type) 

> *类型转换运算符* → **as !** [*类型*](../chapter3/03_Types.html#type) 



<!-- -->

> 主表达式语法  
> *主表达式* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) [*泛型参数从句*](GenericParametersAndArguments.html#generic_argument_clause) _可选_  
> *主表达式* → [*字面量表达式*](../chapter3/04_Expressions.html#literal_expression)  
> *主表达式* → [*self表达式*](../chapter3/04_Expressions.html#self_expression)  
> *主表达式* → [*超类表达式*](../chapter3/04_Expressions.html#superclass_expression)  
> *主表达式* → [*闭包表达式*](../chapter3/04_Expressions.html#closure_expression)  
> *主表达式* → [*圆括号表达式*](../chapter3/04_Expressions.html#parenthesized_expression)  
> *主表达式* → [*隐式成员表达式*](../chapter3/04_Expressions.html#implicit_member_expression)  
> *主表达式* → [*通配符表达式*](../chapter3/04_Expressions.html#wildcard_expression)  

<!-- -->

> 字面量表达式语法  
> *字面量表达式* → [*字面量*](../chapter3/02_Lexical_Structure.html#literal)  
> *字面量表达式* → [*数组字面量*](../chapter3/04_Expressions.html#array_literal) | [*字典字面量*](../chapter3/04_Expressions.html#dictionary_literal)  
> *字面量表达式* → **&#95;&#95;FILE&#95;&#95;** | **&#95;&#95;LINE&#95;&#95;** | **&#95;&#95;COLUMN&#95;&#95;** | **&#95;&#95;FUNCTION&#95;&#95;**  
> *数组字面量* → **[** [*数组字面量项集*](../chapter3/04_Expressions.html#array_literal_items) _可选_ **]**  
> *数组字面量项集* → [*数组字面量项*](../chapter3/04_Expressions.html#array_literal_item) **,** _可选_ | [*数组字面量项*](../chapter3/04_Expressions.html#array_literal_item) **,** [*数组字面量项集*](../chapter3/04_Expressions.html#array_literal_items)  
> *数组字面量项* → [*表达式*](../chapter3/04_Expressions.html#expression)  
> *字典字面量* → **[** [*字典字面量项集*](../chapter3/04_Expressions.html#dictionary_literal_items) **]** | **[** **:** **]**  
> *字典字面量项集* → [*字典字面量项*](../chapter3/04_Expressions.html#dictionary_literal_item) **,** _可选_ | [*字典字面量项*](../chapter3/04_Expressions.html#dictionary_literal_item) **,** [*字典字面量项集*](../chapter3/04_Expressions.html#dictionary_literal_items)  
> *字典字面量项* → [*表达式*](../chapter3/04_Expressions.html#expression) **:** [*表达式*](../chapter3/04_Expressions.html#expression)  

<!-- -->

> Self 表达式语法  
> *self表达式* → **self**  
> *self表达式* → **self** **.** [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *self表达式* → **self** **[** [*表达式*](../chapter3/04_Expressions.html#expression) **]**  
> *self表达式* → **self** **.** **init**  

<!-- -->

> 超类表达式语法  
> *超类表达式* → [*超类方法表达式*](../chapter3/04_Expressions.html#superclass_method_expression) | [*超类下标表达式*](../chapter3/04_Expressions.html#超类下标表达式) | [*超类构造器表达式*](../chapter3/04_Expressions.html#superclass_initializer_expression)  
> *超类方法表达式* → **super** **.** [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  
> *超类下标表达式* → **super** **[** [*表达式*](../chapter3/04_Expressions.html#expression) **]**  
> *超类构造器表达式* → **super** **.** **init**  

<!-- -->

> 闭包表达式语法  
> *闭包表达式* → **{** [*闭包签名(Signational)*](../chapter3/04_Expressions.html#closure_signature) _可选_ [*多条语句(Statements)*](../chapter3/10_Statements.html#statements) **}**  
> *闭包签名(Signational)* → [*参数从句*](../chapter3/05_Declarations.html#parameter_clause) [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*标识符集*](../chapter3/02_Lexical_Structure.html#identifier_list) [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*捕获(Capature)集*](../chapter3/04_Expressions.html#capture_list) [*参数从句*](../chapter3/05_Declarations.html#parameter_clause) [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*捕获(Capature)集*](../chapter3/04_Expressions.html#capture_list) [*标识符集*](../chapter3/02_Lexical_Structure.html#identifier_list) [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*捕获(Capature)集*](../chapter3/04_Expressions.html#capture_list) **in**  
> *捕获(Capature)集* → **[** [*捕获(Capature)说明符*](../chapter3/04_Expressions.html#capture_specifier) [*表达式*](../chapter3/04_Expressions.html#expression) **]**  
> *捕获(Capature)说明符* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**  

<!-- -->

> 隐式成员表达式语法  
> *隐式成员表达式* → **.** [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  

<!-- -->

> 圆括号表达式(Parenthesized Expression)语法  
> *圆括号表达式* → **(** [*表达式元素集*](../chapter3/04_Expressions.html#expression_element_list) _可选_ **)**  
> *表达式元素集* → [*表达式元素*](../chapter3/04_Expressions.html#expression_element) | [*表达式元素*](../chapter3/04_Expressions.html#expression_element) **,** [*表达式元素集*](../chapter3/04_Expressions.html#expression_element_list)  
> *表达式元素* → [*表达式*](../chapter3/04_Expressions.html#expression) | [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) **:** [*表达式*](../chapter3/04_Expressions.html#expression)  

<!-- -->

> 通配符表达式语法  
> *通配符表达式* → **_**  

<!-- -->

> 后置表达式语法  
> *后置表达式* → [*主表达式*](../chapter3/04_Expressions.html#primary_expression)  
> *后置表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) [*后置运算符*](../chapter3/02_Lexical_Structure.html#postfix_operator)  
> *后置表达式* → [*函数调用表达式*](../chapter3/04_Expressions.html#function_call_expression)  
> *后置表达式* → [*构造器表达式*](../chapter3/04_Expressions.html#initializer_expression)  
> *后置表达式* → [*显示成员表达式*](../chapter3/04_Expressions.html#explicit_member_expression)  
> *后置表达式* → [*后置self表达式*](../chapter3/04_Expressions.html#postfix_self_expression)  
> *后置表达式* → [*动态类型表达式*](../chapter3/04_Expressions.html#dynamic_type_expression)  
> *后置表达式* → [*下标表达式*](../chapter3/04_Expressions.html#subscript_expression)  
> *后置表达式* → [*强制取值(Forced Value)表达式*](../chapter3/04_Expressions.html#forced_value_expression)  
> *后置表达式* → [*可选链(Optional Chaining)表达式*](../chapter3/04_Expressions.html#optional_chaining_expression)  

<!-- -->

> 函数调用表达式语法  
> *函数调用表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) [*圆括号表达式*](../chapter3/04_Expressions.html#parenthesized_expression)  
> *函数调用表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) [*圆括号表达式*](../chapter3/04_Expressions.html#parenthesized_expression) _可选_ [*后置闭包(Trailing Closure)*](../chapter3/04_Expressions.html#trailing_closure)  
> *后置闭包(Trailing Closure)* → [*闭包表达式*](../chapter3/04_Expressions.html#closure_expression)  

<!-- -->

> 构造器表达式语法  
> *构造器表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **.** **init**  

<!-- -->

> 显式成员表达式语法  
> *显示成员表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **.** [*十进制数字*](../chapter3/02_Lexical_Structure.html#decimal_digit)  
> *显示成员表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **.** [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) [*泛型参数从句*](GenericParametersAndArguments.html#generic_argument_clause) _可选_  

<!-- -->

> 后置Self 表达式语法  
> *后置self表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **.** **self**  

<!-- -->

> 动态类型表达式语法  
> *动态类型表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **.** **dynamicType**  

<!-- -->

> 附属脚本表达式语法  
> *附属脚本表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **[** [*表达式集*](../chapter3/04_Expressions.html#expression_list) **]**  

<!-- -->

> 强制取值(Forced Value)语法  
> *强制取值(Forced Value)表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **!**  

<!-- -->

> 可选链表达式语法  
> *可选链表达式* → [*后置表达式*](../chapter3/04_Expressions.html#postfix_expression) **?**  

<a name="lexical_structure"></a>
## 词法结构

> 标识符语法  
> *标识符* → [*标识符头(Head)*](../chapter3/02_Lexical_Structure.html#identifier_head) [*标识符字符集*](../chapter3/02_Lexical_Structure.html#identifier_characters) _可选_  
> *标识符* → [*标识符头(Head)*](../chapter3/02_Lexical_Structure.html#identifier_head) [*标识符字符集*](../chapter3/02_Lexical_Structure.html#identifier_characters) _可选_  
> *标识符* → [*隐式参数名*](../chapter3/02_Lexical_Structure.html#implicit_parameter_name)  
> *标识符集* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) | [*标识符*](../chapter3/02_Lexical_Structure.html#identifier) **,** [*标识符集*](../chapter3/02_Lexical_Structure.html#identifier_list)  
> *标识符头(Head)* → Upper- or lowercase letter A through Z

> *标识符头(Head)* → _

> *标识符头(Head)* → U+00A8, U+00AA, U+00AD, U+00AF, U+00B2–U+00B5, or U+00B7–U+00BA  
> *标识符头(Head)* → U+00BC–U+00BE, U+00C0–U+00D6, U+00D8–U+00F6, or U+00F8–U+00FF  
> *标识符头(Head)* → U+0100–U+02FF, U+0370–U+167F, U+1681–U+180D, or U+180F–U+1DBF  
> *标识符头(Head)* → U+1E00–U+1FFF  
> *标识符头(Head)* → U+200B–U+200D, U+202A–U+202E, U+203F–U+2040, U+2054, or U+2060–U+206F  
> *标识符头(Head)* → U+2070–U+20CF, U+2100–U+218F, U+2460–U+24FF, or U+2776–U+2793  
> *标识符头(Head)* → U+2C00–U+2DFF or U+2E80–U+2FFF  
> *标识符头(Head)* → U+3004–U+3007, U+3021–U+302F, U+3031–U+303F, or U+3040–U+D7FF  
> *标识符头(Head)* → U+F900–U+FD3D, U+FD40–U+FDCF, U+FDF0–U+FE1F, or U+FE30–U+FE44  
> *标识符头(Head)* → U+FE47–U+FFFD  
> *标识符头(Head)* → U+10000–U+1FFFD, U+20000–U+2FFFD, U+30000–U+3FFFD, or U+40000–U+4FFFD  
> *标识符头(Head)* → U+50000–U+5FFFD, U+60000–U+6FFFD, U+70000–U+7FFFD, or U+80000–U+8FFFD  
> *标识符头(Head)* → U+90000–U+9FFFD, U+A0000–U+AFFFD, U+B0000–U+BFFFD, or U+C0000–U+CFFFD  
> *标识符头(Head)* → U+D0000–U+DFFFD or U+E0000–U+EFFFD  
> *标识符字符* → 数值 0 到 9  
> *标识符字符* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F  
> *标识符字符* → [*标识符头(Head)*](../chapter3/02_Lexical_Structure.html#identifier_head)  
> *标识符字符集* → [*标识符字符*](../chapter3/02_Lexical_Structure.html#identifier_character) [*标识符字符集*](../chapter3/02_Lexical_Structure.html#identifier_characters) _可选_  
> *隐式参数名* → **$** [*十进制数字集*](../chapter3/02_Lexical_Structure.html#decimal_digits)  

<!-- -->

> 字面量语法  
> *字面量* → [*数值型字面量*](../chapter3/02_Lexical_Structure.html#integer_literal) | [*字符串字面量*](../chapter3/02_Lexical_Structure.html#floating_point_literal) | [*布尔字面量*](../chapter3/02_Lexical_Structure.html#string_literal) | [*空字面量*](TODO) 

> *数值型字面量* → **-** _可选_ [*整形字面量*](TODO) | **-** _可选_ [*浮点型字面量*](TODO)

> *布尔字面量* → **true** | **false**

> *空字面量* → **nil**

<!-- -->

> 整型字面量语法  
> *整型字面量* → [*二进制字面量*](../chapter3/02_Lexical_Structure.html#binary_literal)  
> *整型字面量* → [*八进制字面量*](../chapter3/02_Lexical_Structure.html#octal_literal)  
> *整型字面量* → [*十进制字面量*](../chapter3/02_Lexical_Structure.html#decimal_literal)  
> *整型字面量* → [*十六进制字面量*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal)  
> *二进制字面量* → **0b** [*二进制数字*](../chapter3/02_Lexical_Structure.html#binary_digit) [*二进制字面量字符集*](../chapter3/02_Lexical_Structure.html#binary_literal_characters) _可选_  
> *二进制数字* → 数值 0 到 1  
> *二进制字面量字符* → [*二进制数字*](../chapter3/02_Lexical_Structure.html#binary_digit) | **_**  
> *二进制字面量字符集* → [*二进制字面量字符*](../chapter3/02_Lexical_Structure.html#binary_literal_character) [*二进制字面量字符集*](../chapter3/02_Lexical_Structure.html#binary_literal_characters) _可选_  
> *八进制字面量* → **0o** [*八进制数字*](../chapter3/02_Lexical_Structure.html#octal_digit) [*八进制字符集*](../chapter3/02_Lexical_Structure.html#octal_literal_characters) _可选_  
> *八进字数字* → 数值 0 到 7  
> *八进制字符* → [*八进制数字*](../chapter3/02_Lexical_Structure.html#octal_digit) | **_**  
> *八进制字符集* → [*八进制字符*](../chapter3/02_Lexical_Structure.html#octal_literal_character) [*八进制字符集*](../chapter3/02_Lexical_Structure.html#octal_literal_characters) _可选_  
> *十进制字面量* → [*十进制数字*](../chapter3/02_Lexical_Structure.html#decimal_digit) [*十进制字符集*](../chapter3/02_Lexical_Structure.html#decimal_literal_characters) _可选_  
> *十进制数字* → 数值 0 到 9  
> *十进制数字集* → [*十进制数字*](../chapter3/02_Lexical_Structure.html#decimal_digit) [*十进制数字集*](../chapter3/02_Lexical_Structure.html#decimal_digits) _可选_  
> *十进制字面量字符* → [*十进制数字*](../chapter3/02_Lexical_Structure.html#decimal_digit) | **_**  
> *十进制字面量字符集* → [*十进制字面量字符*](../chapter3/02_Lexical_Structure.html#decimal_literal_character) [*十进制字面量字符集*](../chapter3/02_Lexical_Structure.html#decimal_literal_characters) _可选_  
> *十六进制字面量* → **0x** [*十六进制数字*](../chapter3/02_Lexical_Structure.html#hexadecimal_digit) [*十六进制字面量字符集*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal_characters) _可选_  
> *十六进制数字* → 数值 0 到 9, a through f, or A through F  
> *十六进制字符* → [*十六进制数字*](../chapter3/02_Lexical_Structure.html#hexadecimal_digit) | **_**  
> *十六进制字面量字符集* → [*十六进制字符*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal_character) [*十六进制字面量字符集*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal_characters) _可选_  

<!-- -->

> 浮点型字面量语法  
> *浮点数字面量* → [*十进制字面量*](../chapter3/02_Lexical_Structure.html#decimal_literal) [*十进制分数*](../chapter3/02_Lexical_Structure.html#decimal_fraction) _可选_ [*十进制指数*](../chapter3/02_Lexical_Structure.html#decimal_exponent) _可选_  
> *浮点数字面量* → [*十六进制字面量*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal) [*十六进制分数*](../chapter3/02_Lexical_Structure.html#hexadecimal_fraction) _可选_ [*十六进制指数*](../chapter3/02_Lexical_Structure.html#hexadecimal_exponent)  
> *十进制分数* → **.** [*十进制字面量*](../chapter3/02_Lexical_Structure.html#decimal_literal)  
> *十进制指数* → [*浮点数e*](../chapter3/02_Lexical_Structure.html#floating_point_e) [*正负号*](../chapter3/02_Lexical_Structure.html#sign) _可选_ [*十进制字面量*](../chapter3/02_Lexical_Structure.html#decimal_literal)  
> *十六进制分数* → **.** [*十六进制数*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal)   
 [*十六进制字面量字符集*](TODO)_可选_  
> *十六进制指数* → [*浮点数p*](../chapter3/02_Lexical_Structure.html#floating_point_p) [*正负号*](../chapter3/02_Lexical_Structure.html#sign) _可选_ [*十六进制字面量*](../chapter3/02_Lexical_Structure.html#hexadecimal_literal)  
> *浮点数e* → **e** | **E**  
> *浮点数p* → **p** | **P**  
> *正负号* → **+** | **-**  

<!-- -->

> 字符串型字面量语法  
> *字符串字面量* → **"** [*引用文本*](../chapter3/02_Lexical_Structure.html#quoted_text) **"**  
> *引用文本* → [*引用文本条目*](../chapter3/02_Lexical_Structure.html#quoted_text_item) [*引用文本*](../chapter3/02_Lexical_Structure.html#quoted_text) _可选_  
> *引用文本条目* → [*转义字符*](../chapter3/02_Lexical_Structure.html#escaped_character)  
> *引用文本条目* → **(** [*表达式*](../chapter3/04_Expressions.html#expression) **)**  
> *引用文本条目* → 除了"­, \­, U+000A, or U+000D的所有Unicode的字符  
> *转义字符* → **/0** | **\\** | **\t** | **\n** | **\r** | **\"** | **\'**  
> *转义字符* → **\u** **{** [*十六进制标量数字集*](TODO) **}**   
> *unicode标量数字集* → Between one and eight hexadecimal digits

<!-- -->

> 运算符语法语法  
> *运算符* → [*运算符头*](../chapter3/02_Lexical_Structure.html#operator_character) [*运算符字符集*](../chapter3/02_Lexical_Structure.html#operator) _可选_
> *运算符* → [*点运算符头*](TODO) [*点运算符字符集*](TODO) _可选_  
> *运算符字符* → **/** | **=** | **-** | **+** | **!** | **&#42;** | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **?**  
> *运算符头* → U+00A1–U+00A7

> *运算符头* → U+00A9 or U+00AB

> *运算符头* →  U+00AC or U+00AE

> *运算符头* → U+00B0–U+00B1, U+00B6, U+00BB, U+00BF, U+00D7, or U+00F7

> *运算符头* → U+2016–U+2017 or U+2020–U+2027

> *运算符头* → U+2030–U+203E

> *运算符头* → U+2041–U+2053

> *运算符头* → U+2055–U+205E

> *运算符头* → U+2190–U+23FF

> *运算符头* → U+2500–U+2775

> *运算符头* → U+2794–U+2BFF

> *运算符头* → U+2E00–U+2E7F

> *运算符头* → U+3001–U+3003

> *运算符头* → U+3008–U+3030

> *运算符字符* → [*运算符头*](TODO)

> *运算符字符* → U+0300–U+036F

> *运算符字符* → U+1DC0–U+1DFF

> *运算符字符* → U+20D0–U+20FF

> *运算符字符* → U+FE00–U+FE0F

> *运算符字符* → U+FE20–U+FE2F

> *运算符字符* → U+E0100–U+E01EF

> *运算符字符集* → [*运算符字符*](TODO) [*运算符字符集*](TODO)_可选_

> *点运算符头* → **..** 

> *点运算符字符* → **.** | [*运算符字符*](TODO)

> *点运算符字符集* → [*点运算符字符*](TODO) [*点运算符字符集*](TODO) _可选_
 
> *二元运算符* → [*运算符*](../chapter3/02_Lexical_Structure.html#operator)  
> *前置运算符* → [*运算符*](../chapter3/02_Lexical_Structure.html#operator)  
> *后置运算符* → [*运算符*](../chapter3/02_Lexical_Structure.html#operator)  

<a name="types"></a>
## 类型

> 类型语法  
> *类型* → [*数组类型*](../chapter3/03_Types.html#array_type) | [*字典类型*](TODO) | [*函数类型*](../chapter3/03_Types.html#function_type) | [*类型标识符*](../chapter3/03_Types.html#type_identifier) | [*元组类型*](../chapter3/03_Types.html#tuple_type) | [*可选类型*](../chapter3/03_Types.html#optional_type) | [*隐式解析可选类型*](../chapter3/03_Types.html#implicitly_unwrapped_optional_type) | [*协议合成类型*](../chapter3/03_Types.html#protocol_composition_type) | [*元型类型*](../chapter3/03_Types.html#metatype_type)  

<!-- -->

> 类型注解语法  
> *类型注解* → **:** [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)  

<!-- -->

> 类型标识语法  
> *类型标识* → [*类型名称*](../chapter3/03_Types.html#type_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_argument_clause) _可选_ | [*类型名称*](../chapter3/03_Types.html#type_name) [*泛型参数从句*](GenericParametersAndArguments.html#generic_argument_clause) _可选_ **.** [*类型标识符*](../chapter3/03_Types.html#type_identifier)  
> *类型名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  

<!-- -->

> 元组类型语法  
> *元组类型* → **(** [*元组类型主体*](../chapter3/03_Types.html#tuple_type_body) _可选_ **)**  
> *元组类型主体* → [*元组类型的元素集*](../chapter3/03_Types.html#tuple_type_element_list) **...** _可选_  
> *元组类型的元素集* → [*元组类型的元素*](../chapter3/03_Types.html#tuple_type_element) | [*元组类型的元素*](../chapter3/03_Types.html#tuple_type_element) **,** [*元组类型的元素集*](../chapter3/03_Types.html#tuple_type_element_list)  
> *元组类型的元素* → [*属性(Attributes)集*](../chapter3/06_Attributes.html#attributes) _可选_ **inout** _可选_ [*类型*](../chapter3/03_Types.html#type) | **inout** _可选_ [*元素名*](../chapter3/03_Types.html#element_name) [*类型注解*](../chapter3/03_Types.html#type_annotation)  
> *元素名* → [*标识符*](../chapter3/02_Lexical_Structure.html#identifier)  

<!-- -->

> 函数类型语法  
> *函数类型* → [*类型*](../chapter3/03_Types.html#type)  **throws** _可选_ **->** [*类型*](../chapter3/03_Types.html#type)  
> *函数类型* → [*类型*](TODO)  **rethrows** **->** [*类型*](TODO) 

<!-- -->

> 数组类型语法  
> *数组类型* → **[** [*类型*](../chapter3/03_Types.html#array_type) **]**  

<!-- -->
> 字典类型语法
> *字典类型* → **[** [*类型 **:** 类型*](TODO) **]**

<!-- -->

> 可选类型语法  
> *可选类型* → [*类型*](../chapter3/03_Types.html#type) **?**  

<!-- -->

> 隐式解析可选类型(Implicitly Unwrapped Optional Type)语法  
> *隐式解析可选类型* → [*类型*](../chapter3/03_Types.html#type) **!**  

<!-- -->

> 协议合成类型语法  
> *协议合成类型* → **protocol** **<** [*协议标识符集*](../chapter3/03_Types.html#protocol_identifier_list) _可选_ **>**  
> *协议标识符集* → [*协议标识符*](../chapter3/03_Types.html#protocol_identifier) | [*协议标识符*](../chapter3/03_Types.html#protocol_identifier) **,** [*协议标识符集*](../chapter3/03_Types.html#protocol_identifier_list)  
> *协议标识符* → [*类型标识符*](../chapter3/03_Types.html#type_identifier)  

<!-- -->

> 元(Metatype)类型语法  
> *元类型* → [*类型*](../chapter3/03_Types.html#type) **.** **Type** | [*类型*](../chapter3/03_Types.html#type) **.** **Protocol**  

<!-- -->

> 类型继承从句语法  

> *类型继承从句* → **:** [*类条件(class-requirement))*](TODO) **,** [*类型继承集*](../chapter3/03_Types.html#type_inheritance_list) 

> *类型继承从句* → **:** [*类条件(class-requirement))*](TODO) 

> *类型继承从句* → **:** [*类型继承集*](TODO)  

> *类型继承集* → [*类型标识符*](../chapter3/03_Types.html#type_identifier) | [*类型标识符*](../chapter3/03_Types.html#type_identifier) **,** [*类型继承集*](../chapter3/03_Types.html#type_inheritance_list)

> *类条件* → **class** 
