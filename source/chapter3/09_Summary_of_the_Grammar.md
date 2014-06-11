# 语法总结
_________________

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
> *语句* → [*表达式*](..\chapter3\04_Expressions.html#expression) **;** _可选_  
> *语句* → [*声明*](..\chapter3\05_Declarations.html#declaration) **;** _可选_  
> *语句* → [*循环语句*](..\chapter3\10_Statements.html#loop_statement) **;** _可选_  
> *语句* → [*分支语句*](..\chapter3\10_Statements.html#branch_statement) **;** _可选_  
> *语句* → [*标记语句(Labeled Statement)*](..\chapter3\10_Statements.html#labeled_statement)  
> *语句* → [*控制转移语句*](..\chapter3\10_Statements.html#control_transfer_statement) **;** _可选_  
> *多条语句(Statements)* → [*语句*](..\chapter3\10_Statements.html#statement) [*多条语句(Statements)*](..\chapter3\10_Statements.html#statements) _可选_  

<p></p>

> 循环语句语法  
> *循环语句* → [*for语句*](..\chapter3\10_Statements.html#for_statement)  
> *循环语句* → [*for-in语句*](..\chapter3\10_Statements.html#for_in_statement)  
> *循环语句* → [*while语句*](..\chapter3\10_Statements.html#wheetatype类型ile_statement)  
> *循环语句* → [*do-while语句*](..\chapter3\10_Statements.html#do_while_statement)  

<p></p>

> For 循环语法  
> *for语句* → **for** [*for初始条件*](..\chapter3\10_Statements.html#for_init) _可选_ **;** [*表达式*](..\chapter3\04_Expressions.html#expression) _可选_ **;** [*表达式*](..\chapter3\04_Expressions.html#expression) _可选_ [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *for语句* → **for** **(** [*for初始条件*](..\chapter3\10_Statements.html#for_init) _可选_ **;** [*表达式*](..\chapter3\04_Expressions.html#expression) _可选_ **;** [*表达式*](..\chapter3\04_Expressions.html#expression) _可选_ **)** [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *for初始条件* → [*变量声明*](..\chapter3\05_Declarations.html#variable_declaration) | [*表达式列表*](..\chapter3\04_Expressions.html#expression_list)  

<p></p>

> For-In 循环语法  
> *for-in语句* → **for** [*模式*](..\chapter3\07_Patterns.html#pattern) **in** [*表达式*](..\chapter3\04_Expressions.html#expression) [*代码块*](..\chapter3\05_Declarations.html#code_block)  

<p></p>

> While 循环语法  
> *while语句* → **while** [*while条件*](..\chapter3\10_Statements.html#while_condition) [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *while条件* → [*表达式*](..\chapter3\04_Expressions.html#expression) | [*声明*](..\chapter3\05_Declarations.html#declaration)  

<p></p>

> Do-While 循环语法  
> *do-while语句* → **do** [*代码块*](..\chapter3\05_Declarations.html#code_block) **while** [*while条件*](..\chapter3\10_Statements.html#while_condition)  

<p></p>

> 分支语句语法  
> *分支语句* → [*if语句*](..\chapter3\10_Statements.html#if_statement)  
> *分支语句* → [*switch语句*](..\chapter3\10_Statements.html#switch_statement)  

<p></p>

> If语句语法  
> *if语句* → **if** [*if条件*](..\chapter3\10_Statements.html#if_condition) [*代码块*](..\chapter3\05_Declarations.html#code_block) [*else子句(Clause)*](..\chapter3\10_Statements.html#else_clause) _可选_  
> *if条件* → [*表达式*](..\chapter3\04_Expressions.html#expression) | [*声明*](..\chapter3\05_Declarations.html#declaration)  
> *else子句(Clause)* → **else** [*代码块*](..\chapter3\05_Declarations.html#code_block) | **else** [*if语句*](..\chapter3\10_Statements.html#if_statement)  

<p></p>

> Switch语句语法  
> *switch语句* → **switch** [*表达式*](..\chapter3\04_Expressions.html#expression) **{** [*switch多情形(Switch Cases)*](..\chapter3\10_Statements.html#switch_cases) _可选_ **}**  
> *switch多情形(Switch Cases)* → [*switch情形(Switch Case)*](..\chapter3\10_Statements.html#switch_case) [*switch多情形(Switch Cases)*](..\chapter3\10_Statements.html#switch_cases) _可选_  
> *switch情形(Switch Case)* → [*case标签*](..\chapter3\10_Statements.html#case_label) [*多条语句(Statements)*](..\chapter3\10_Statements.html#statements) | [*default标签*](..\chapter3\10_Statements.html#default_label) [*多条语句(Statements)*](..\chapter3\10_Statements.html#statements)  
> *switch情形(Switch Case)* → [*case标签*](..\chapter3\10_Statements.html#case_label) **;** | [*default标签*](..\chapter3\10_Statements.html#default_label) **;**  
> *case标签* → **case** [*case项列表*](..\chapter3\10_Statements.html#case_item_list) **:**  
> *case项列表* → [*模式*](..\chapter3\07_Patterns.html#pattern) [*guard-clause*](..\chapter3\10_Statements.html#guard_clause) _可选_ | [*模式*](..\chapter3\07_Patterns.html#pattern) [*guard-clause*](..\chapter3\10_Statements.html#guard_clause) _可选_ **,** [*case项列表*](..\chapter3\10_Statements.html#case_item_list)  
> *default标签* → **default** **:**  
> *guard-clause* → **where** [*guard-expression*](..\chapter3\10_Statements.html#guard_expression)  
> *guard-expression* → [*表达式*](..\chapter3\04_Expressions.html#expression)  

<p></p>

> 标记语句语法  
> *标记语句(Labeled Statement)* → [*语句标签*](..\chapter3\10_Statements.html#statement_label) [*循环语句*](..\chapter3\10_Statements.html#loop_statement) | [*语句标签*](..\chapter3\10_Statements.html#statement_label) [*switch语句*](..\chapter3\10_Statements.html#switch_statement)  
> *语句标签* → [*标签名称*](..\chapter3\10_Statements.html#label_name) **:**  
> *标签名称* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 控制传递语句(Control Transfer Statement) 语法  
> *控制转移语句* → [*break语句*](..\chapter3\10_Statements.html#break_statement)  
> *控制转移语句* → [*continue语句*](..\chapter3\10_Statements.html#continue_statement)  
> *控制转移语句* → [*fallthrough语句*](..\chapter3\10_Statements.html#fallthrough_statement)  
> *控制转移语句* → [*return语句*](..\chapter3\10_Statements.html#return_statement)  

<p></p>

> Break 语句语法  
> *break语句* → **break** [*标签名称*](..\chapter3\10_Statements.html#label_name) _可选_  

<p></p>

> Continue 语句语法  
> *continue语句* → **continue** [*标签名称*](..\chapter3\10_Statements.html#label_name) _可选_  

<p></p>

> Fallthrough 语句语法  
> *fallthrough语句* → **fallthrough**  

<p></p>

> Return 语句语法  
> *return语句* → **return** [*表达式*](..\chapter3\04_Expressions.html#expression) _可选_  

<a name="generic_parameters_and_arguments"></a>
## 泛型参数

> 泛型形参子句(Generic Parameter Clause) 语法  
> *泛型参数子句* → **<** [*泛型参数列表*](GenericParametersAndArguments.html#generic_parameter_list) [*requirement-clause*](GenericParametersAndArguments.html#requirement_clause) _可选_ **>**  
> *泛型参数列表* → [*泛形参数*](GenericParametersAndArguments.html#generic_parameter) | [*泛形参数*](GenericParametersAndArguments.html#generic_parameter) **,** [*泛型参数列表*](GenericParametersAndArguments.html#generic_parameter_list)  
> *泛形参数* → [*类名*](..\chapter3\03_Types.html#type_name)  
> *泛形参数* → [*类名*](..\chapter3\03_Types.html#type_name) **:** [*类型标识*](..\chapter3\03_Types.html#type_identifier)  
> *泛形参数* → [*类名*](..\chapter3\03_Types.html#type_name) **:** [*协议合成类型*](..\chapter3\03_Types.html#protocol_composition_type)  
> *requirement-clause* → **where** [*requirement-list*](GenericParametersAndArguments.html#requirement_list)  
> *requirement-list* → [*requirement*](GenericParametersAndArguments.html#requirement) | [*requirement*](GenericParametersAndArguments.html#requirement) **,** [*requirement-list*](GenericParametersAndArguments.html#requirement_list)  
> *requirement* → [*conformance-requirement*](GenericParametersAndArguments.html#conformance_requirement) | [*same-type-requirement*](GenericParametersAndArguments.html#same_type_requirement)  
> *conformance-requirement* → [*类型标识*](..\chapter3\03_Types.html#type_identifier) **:** [*类型标识*](..\chapter3\03_Types.html#type_identifier)  
> *conformance-requirement* → [*类型标识*](..\chapter3\03_Types.html#type_identifier) **:** [*协议合成类型*](..\chapter3\03_Types.html#protocol_composition_type)  
> *same-type-requirement* → [*类型标识*](..\chapter3\03_Types.html#type_identifier) **==** [*类型标识*](..\chapter3\03_Types.html#type_identifier)  

<p></p>

> 泛型实参子句语法  
> *(泛型参数子句Generic Argument Clause)* → **<** [*泛型参数列表*](GenericParametersAndArguments.html#generic_argument_list) **>**  
> *泛型参数列表* → [*泛型参数*](GenericParametersAndArguments.html#generic_argument) | [*泛型参数*](GenericParametersAndArguments.html#generic_argument) **,** [*泛型参数列表*](GenericParametersAndArguments.html#generic_argument_list)  
> *泛型参数* → [*type*](..\chapter3\03_Types.html#type)  

<a name="declarations"></a>
## 声明 (Declarations)

> 声明语法  
> *声明* → [*导入声明*](..\chapter3\05_Declarations.html#import_declaration)  
> *声明* → [*常量声明*](..\chapter3\05_Declarations.html#constant_declaration)  
> *声明* → [*变量声明*](..\chapter3\05_Declarations.html#variable_declaration)  
> *声明* → [*类型别名声明*](..\chapter3\05_Declarations.html#typealias_declaration)  
> *声明* → [*函数声明*](..\chapter3\05_Declarations.html#function_declaration)  
> *声明* → [*枚举声明*](..\chapter3\05_Declarations.html#enum_declaration)  
> *声明* → [*结构体声明*](..\chapter3\05_Declarations.html#struct_declaration)  
> *声明* → [*类声明*](..\chapter3\05_Declarations.html#class_declaration)  
> *声明* → [*协议声明*](..\chapter3\05_Declarations.html#protocol_declaration)  
> *声明* → [*构造器声明*](..\chapter3\05_Declarations.html#initializer_declaration)  
> *声明* → [*析构器声明*](..\chapter3\05_Declarations.html#deinitializer_declaration)  
> *声明* → [*扩展声明*](..\chapter3\05_Declarations.html#extension_declaration)  
> *声明* → [*附属脚本声明*](..\chapter3\05_Declarations.html#subscript_declaration)  
> *声明* → [*运算符声明*](..\chapter3\05_Declarations.html#operator_declaration)  
> *多个声明(Declarations)* → [*声明*](..\chapter3\05_Declarations.html#declaration) [*多个声明(Declarations)*](..\chapter3\05_Declarations.html#declarations) _可选_  
> *多个声明描述符(Specifiers)* → [*声明描述符(Specifier)*](..\chapter3\05_Declarations.html#declaration_specifier) [*多个声明描述符(Specifiers)*](..\chapter3\05_Declarations.html#declaration_specifiers) _可选_  
> *声明描述符(Specifier)* → **class** | **mutating** | **nonmutating** | **override** | **static** | **unowned** | **unowned(safe)** | **unowned(unsafe)** | **weak**  

<p></p>

> 顶级(Top Level) 声明语法  
> *顶级声明* → [*多条语句(Statements)*](..\chapter3\10_Statements.html#statements) _可选_  

<p></p>

> 代码块语法  
> *代码块* → **{** [*多条语句(Statements)*](..\chapter3\10_Statements.html#statements) _可选_ **}**  

<p></p>

> 导入(Import)声明语法  
> *导入声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **import** [*导入类型*](..\chapter3\05_Declarations.html#import_kind) _可选_ [*导入路径*](..\chapter3\05_Declarations.html#import_path)  
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **var** | **func**  
> *导入路径* → [*导入路径标识符*](..\chapter3\05_Declarations.html#import_path_identifier) | [*导入路径标识符*](..\chapter3\05_Declarations.html#import_path_identifier) **.** [*导入路径*](..\chapter3\05_Declarations.html#import_path)  
> *导入路径标识符* → [*标识符*](LexicalStructure.html#identifier) | [*运算符*](LexicalStructure.html#operator)  

<p></p>

> 常数声明语法  
> *常量声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*多个声明描述符(Specifiers)*](..\chapter3\05_Declarations.html#declaration_specifiers) _可选_ **let** [*模式构造器列表*](..\chapter3\05_Declarations.html#pattern_initializer_list)  
> *模式构造器列表* → [*模式构造器*](..\chapter3\05_Declarations.html#pattern_initializer) | [*模式构造器*](..\chapter3\05_Declarations.html#pattern_initializer) **,** [*模式构造器列表*](..\chapter3\05_Declarations.html#pattern_initializer_list)  
> *模式构造器* → [*模式*](..\chapter3\07_Patterns.html#pattern) [*构造器*](..\chapter3\05_Declarations.html#initializer) _可选_  
> *构造器* → **=** [*表达式*](..\chapter3\04_Expressions.html#expression)  

<p></p>

> 变量声明语法  
> *变量声明* → [*变量声明头(Head)*](..\chapter3\05_Declarations.html#variable_declaration_head) [*模式构造器列表*](..\chapter3\05_Declarations.html#pattern_initializer_list)  
> *变量声明* → [*变量声明头(Head)*](..\chapter3\05_Declarations.html#variable_declaration_head) [*变量名*](..\chapter3\05_Declarations.html#variable_name) [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *变量声明* → [*变量声明头(Head)*](..\chapter3\05_Declarations.html#variable_declaration_head) [*变量名*](..\chapter3\05_Declarations.html#variable_name) [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*getter-setter块*](..\chapter3\05_Declarations.html#getter_setter_block)  
> *变量声明* → [*变量声明头(Head)*](..\chapter3\05_Declarations.html#variable_declaration_head) [*变量名*](..\chapter3\05_Declarations.html#variable_name) [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*getter-setter关键字(Keyword)块*](..\chapter3\05_Declarations.html#getter_setter_keyword_block)  
> *变量声明* → [*变量声明头(Head)*](..\chapter3\05_Declarations.html#variable_declaration_head) [*变量名*](..\chapter3\05_Declarations.html#variable_name) [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*构造器*](..\chapter3\05_Declarations.html#initializer) _可选_ [*willSet-didSet代码块*](..\chapter3\05_Declarations.html#willSet_didSet_block)  
> *变量声明头(Head)* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*多个声明描述符(Specifiers)*](..\chapter3\05_Declarations.html#declaration_specifiers) _可选_ **var**  
> *变量名称* → [*标识符*](LexicalStructure.html#identifier)  
> *getter-setter块* → **{** [*getter子句*](..\chapter3\05_Declarations.html#getter_clause) [*setter子句*](..\chapter3\05_Declarations.html#setter_clause) _可选_ **}**  
> *getter-setter块* → **{** [*setter子句*](..\chapter3\05_Declarations.html#setter_clause) [*getter子句*](..\chapter3\05_Declarations.html#getter_clause) **}**  
> *getter子句* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **get** [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *setter子句* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **set** [*setter名称*](..\chapter3\05_Declarations.html#setter_name) _可选_ [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *setter名称* → **(** [*标识符*](LexicalStructure.html#identifier) **)**  
> *getter-setter关键字(Keyword)块* → **{** [*getter关键字(Keyword)子句*](..\chapter3\05_Declarations.html#getter_keyword_clause) [*setter关键字(Keyword)子句*](..\chapter3\05_Declarations.html#setter_keyword_clause) _可选_ **}**  
> *getter-setter关键字(Keyword)块* → **{** [*setter关键字(Keyword)子句*](..\chapter3\05_Declarations.html#setter_keyword_clause) [*getter关键字(Keyword)子句*](..\chapter3\05_Declarations.html#getter_keyword_clause) **}**  
> *getter关键字(Keyword)子句* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **get**  
> *setter关键字(Keyword)子句* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **set**  
> *willSet-didSet代码块* → **{** [*willSet子句*](..\chapter3\05_Declarations.html#willSet_clause) [*didSet子句*](..\chapter3\05_Declarations.html#didSet_clause) _可选_ **}**  
> *willSet-didSet代码块* → **{** [*didSet子句*](..\chapter3\05_Declarations.html#didSet_clause) [*willSet子句*](..\chapter3\05_Declarations.html#willSet_clause) **}**  
> *willSet子句* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **willSet** [*setter名称*](..\chapter3\05_Declarations.html#setter_name) _可选_ [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *didSet子句* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **didSet** [*setter名称*](..\chapter3\05_Declarations.html#setter_name) _可选_ [*代码块*](..\chapter3\05_Declarations.html#code_block)  

<p></p>

> 类型别名声明语法  
> *类型别名声明* → [*类型别名头(Head)*](..\chapter3\05_Declarations.html#typealias_head) [*类型别名赋值*](..\chapter3\05_Declarations.html#typealias_assignment)  
> *类型别名头(Head)* → **typealias** [*类型别名名称*](..\chapter3\05_Declarations.html#typealias_name)  
> *类型别名名称* → [*标识符*](LexicalStructure.html#identifier)  
> *类型别名赋值* → **=** [*type*](..\chapter3\03_Types.html#type)  

<p></p>

> 函数声明语法  
> *函数声明* → [*函数头*](..\chapter3\05_Declarations.html#function_head) [*函数名*](..\chapter3\05_Declarations.html#function_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*函数签名(Signature)*](..\chapter3\05_Declarations.html#function_signature) [*函数体*](..\chapter3\05_Declarations.html#function_body)  
> *函数头* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*多个声明描述符(Specifiers)*](..\chapter3\05_Declarations.html#declaration_specifiers) _可选_ **func**  
> *函数名* → [*标识符*](LexicalStructure.html#identifier) | [*运算符*](LexicalStructure.html#operator)  
> *函数签名(Signature)* → [*parameter-clauses*](..\chapter3\05_Declarations.html#parameter_clauses) [*函数结果*](..\chapter3\05_Declarations.html#function_result) _可选_  
> *函数结果* → **->** [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*type*](..\chapter3\03_Types.html#type)  
> *函数体* → [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *parameter-clauses* → [*参数子句*](..\chapter3\05_Declarations.html#parameter_clause) [*parameter-clauses*](..\chapter3\05_Declarations.html#parameter_clauses) _可选_  
> *参数子句* → **(** **)** | **(** [*参数列表*](..\chapter3\05_Declarations.html#parameter_list) **...** _可选_ **)**  
> *参数列表* → [*参数*](..\chapter3\05_Declarations.html#parameter) | [*参数*](..\chapter3\05_Declarations.html#parameter) **,** [*参数列表*](..\chapter3\05_Declarations.html#parameter_list)  
> *参数* → **inout** _可选_ **let** _可选_ **#** _可选_ [*参数名*](..\chapter3\05_Declarations.html#parameter_name) [*本地参数名*](..\chapter3\05_Declarations.html#local_parameter_name) _可选_ [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*默认参数子句*](..\chapter3\05_Declarations.html#default_argument_clause) _可选_  
> *参数* → **inout** _可选_ **var** **#** _可选_ [*参数名*](..\chapter3\05_Declarations.html#parameter_name) [*本地参数名*](..\chapter3\05_Declarations.html#local_parameter_name) _可选_ [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*默认参数子句*](..\chapter3\05_Declarations.html#default_argument_clause) _可选_  
> *参数* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*type*](..\chapter3\03_Types.html#type)  
> *参数名* → [*标识符*](LexicalStructure.html#identifier) | **_**  
> *本地参数名* → [*标识符*](LexicalStructure.html#identifier) | **_**  
> *默认参数子句* → **=** [*表达式*](..\chapter3\04_Expressions.html#expression)  

<p></p>

> 枚举声明语法  
> *枚举声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*union-style-enum*](..\chapter3\05_Declarations.html#union_style_enum) | [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*raw-value-style-enum*](..\chapter3\05_Declarations.html#raw_value_style_enum)  
> *union-style-enum* → [*枚举名*](..\chapter3\05_Declarations.html#enum_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ **{** [*union-style-enum-members*](..\chapter3\05_Declarations.html#union_style_enum_members) _可选_ **}**  
> *union-style-enum-members* → [*union-style-enum-member*](..\chapter3\05_Declarations.html#union_style_enum_member) [*union-style-enum-members*](..\chapter3\05_Declarations.html#union_style_enum_members) _可选_  
> *union-style-enum-member* → [*声明*](..\chapter3\05_Declarations.html#declaration) | [*union-style-enum-case-clause*](..\chapter3\05_Declarations.html#union_style_enum_case_clause)  
> *union-style-enum-case-clause* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **case** [*union-style-enum-case-list*](..\chapter3\05_Declarations.html#union_style_enum_case_list)  
> *union-style-enum-case-list* → [*union-style-enum-case*](..\chapter3\05_Declarations.html#union_style_enum_case) | [*union-style-enum-case*](..\chapter3\05_Declarations.html#union_style_enum_case) **,** [*union-style-enum-case-list*](..\chapter3\05_Declarations.html#union_style_enum_case_list)  
> *union-style-enum-case* → [*enum-case-name*](..\chapter3\05_Declarations.html#enum_case_name) [*元组类型*](..\chapter3\03_Types.html#tuple_type) _可选_  
> *枚举名* → [*标识符*](LexicalStructure.html#identifier)  
> *enum-case-name* → [*标识符*](LexicalStructure.html#identifier)  
> *raw-value-style-enum* → [*枚举名*](..\chapter3\05_Declarations.html#enum_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ **:** [*类型标识*](..\chapter3\03_Types.html#type_identifier) **{** [*raw-value-style-enum-members*](..\chapter3\05_Declarations.html#raw_value_style_enum_members) _可选_ **}**  
> *raw-value-style-enum-members* → [*raw-value-style-enum-member*](..\chapter3\05_Declarations.html#raw_value_style_enum_member) [*raw-value-style-enum-members*](..\chapter3\05_Declarations.html#raw_value_style_enum_members) _可选_  
> *raw-value-style-enum-member* → [*声明*](..\chapter3\05_Declarations.html#declaration) | [*raw-value-style-enum-case-clause*](..\chapter3\05_Declarations.html#raw_value_style_enum_case_clause)  
> *raw-value-style-enum-case-clause* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **case** [*raw-value-style-enum-case-list*](..\chapter3\05_Declarations.html#raw_value_style_enum_case_list)  
> *raw-value-style-enum-case-list* → [*raw-value-style-enum-case*](..\chapter3\05_Declarations.html#raw_value_style_enum_case) | [*raw-value-style-enum-case*](..\chapter3\05_Declarations.html#raw_value_style_enum_case) **,** [*raw-value-style-enum-case-list*](..\chapter3\05_Declarations.html#raw_value_style_enum_case_list)  
> *raw-value-style-enum-case* → [*enum-case-name*](..\chapter3\05_Declarations.html#enum_case_name) [*raw-value-assignment*](..\chapter3\05_Declarations.html#raw_value_assignment) _可选_  
> *raw-value-assignment* → **=** [*字面量*](LexicalStructure.html#literal)  

<p></p>

> 结构体声明语法  
> *结构体声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **struct** [*结构体名称*](..\chapter3\05_Declarations.html#struct_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承子句*](..\chapter3\03_Types.html#type_inheritance_clause) _可选_ [*结构体主体*](..\chapter3\05_Declarations.html#struct_body)  
> *结构体名称* → [*标识符*](LexicalStructure.html#identifier)  
> *结构体主体* → **{** [*多个声明(Declarations)*](..\chapter3\05_Declarations.html#declarations) _可选_ **}**  

<p></p>

> 类声明语法  
> *类声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **class** [*类名*](..\chapter3\05_Declarations.html#class_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承子句*](..\chapter3\03_Types.html#type_inheritance_clause) _可选_ [*类主体*](..\chapter3\05_Declarations.html#class_body)  
> *类名* → [*标识符*](LexicalStructure.html#identifier)  
> *类主体* → **{** [*多个声明(Declarations)*](..\chapter3\05_Declarations.html#declarations) _可选_ **}**  

<p></p>

> 协议(Protocol)声明语法  
> *协议声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **protocol** [*协议名*](..\chapter3\05_Declarations.html#protocol_name) [*类型继承子句*](..\chapter3\03_Types.html#type_inheritance_clause) _可选_ [*协议主体*](..\chapter3\05_Declarations.html#protocol_body)  
> *协议名* → [*标识符*](LexicalStructure.html#identifier)  
> *协议主体* → **{** [*多个协议成员声明(Declarations)*](..\chapter3\05_Declarations.html#protocol_member_declarations) _可选_ **}**  
> *协议成员声明* → [*协议属性声明*](..\chapter3\05_Declarations.html#protocol_property_declaration)  
> *协议成员声明* → [*protocol-method-declaration*](..\chapter3\05_Declarations.html#protocol_method_declaration)  
> *协议成员声明* → [*协议构造器声明*](..\chapter3\05_Declarations.html#protocol_initializer_declaration)  
> *协议成员声明* → [*协议附属脚本声明*](..\chapter3\05_Declarations.html#protocol_subscript_declaration)  
> *协议成员声明* → [*协议关联类型声明*](..\chapter3\05_Declarations.html#protocol_associated_type_declaration)  
> *多个协议成员声明(Declarations)* → [*协议成员声明*](..\chapter3\05_Declarations.html#protocol_member_declaration) [*多个协议成员声明(Declarations)*](..\chapter3\05_Declarations.html#protocol_member_declarations) _可选_  

<p></p>

> 协议属性声明语法  
> *协议属性声明* → [*变量声明头(Head)*](..\chapter3\05_Declarations.html#variable_declaration_head) [*变量名*](..\chapter3\05_Declarations.html#variable_name) [*类型注解*](..\chapter3\03_Types.html#type_annotation) [*getter-setter关键字(Keyword)块*](..\chapter3\05_Declarations.html#getter_setter_keyword_block)  

<p></p>

> 协议方法声明语法  
> *protocol-method-declaration* → [*函数头*](..\chapter3\05_Declarations.html#function_head) [*函数名*](..\chapter3\05_Declarations.html#function_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*函数签名(Signature)*](..\chapter3\05_Declarations.html#function_signature)  

<p></p>

> 协议构造器声明语法  
> *协议构造器声明* → [*构造器头(Head)*](..\chapter3\05_Declarations.html#initializer_head) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*参数子句*](..\chapter3\05_Declarations.html#parameter_clause)  

<p></p>

> 协议附属脚本声明语法  
> *协议附属脚本声明* → [*附属脚本头(Head)*](..\chapter3\05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](..\chapter3\05_Declarations.html#subscript_result) [*getter-setter关键字(Keyword)块*](..\chapter3\05_Declarations.html#getter_setter_keyword_block)  

<p></p>

> 协议关联类型声明语法  
> *协议关联类型声明* → [*类型别名头(Head)*](..\chapter3\05_Declarations.html#typealias_head) [*类型继承子句*](..\chapter3\03_Types.html#type_inheritance_clause) _可选_ [*类型别名赋值*](..\chapter3\05_Declarations.html#typealias_assignment) _可选_  

<p></p>

> 构造器声明语法  
> *构造器声明* → [*构造器头(Head)*](..\chapter3\05_Declarations.html#initializer_head) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*参数子句*](..\chapter3\05_Declarations.html#parameter_clause) [*构造器主体*](..\chapter3\05_Declarations.html#initializer_body)  
> *构造器头(Head)* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **convenience** _可选_ **init**  
> *构造器主体* → [*代码块*](..\chapter3\05_Declarations.html#code_block)  

<p></p>

> 析构器声明语法  
> *析构器声明* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **deinit** [*代码块*](..\chapter3\05_Declarations.html#code_block)  

<p></p>

> 扩展(Extension)声明语法  
> *扩展声明* → **extension** [*类型标识*](..\chapter3\03_Types.html#type_identifier) [*类型继承子句*](..\chapter3\03_Types.html#type_inheritance_clause) _可选_ [*extension-body*](..\chapter3\05_Declarations.html#extension_body)  
> *extension-body* → **{** [*多个声明(Declarations)*](..\chapter3\05_Declarations.html#declarations) _可选_ **}**  

<p></p>

> 附属脚本声明语法  
> *附属脚本声明* → [*附属脚本头(Head)*](..\chapter3\05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](..\chapter3\05_Declarations.html#subscript_result) [*代码块*](..\chapter3\05_Declarations.html#code_block)  
> *附属脚本声明* → [*附属脚本头(Head)*](..\chapter3\05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](..\chapter3\05_Declarations.html#subscript_result) [*getter-setter块*](..\chapter3\05_Declarations.html#getter_setter_block)  
> *附属脚本声明* → [*附属脚本头(Head)*](..\chapter3\05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](..\chapter3\05_Declarations.html#subscript_result) [*getter-setter关键字(Keyword)块*](..\chapter3\05_Declarations.html#getter_setter_keyword_block)  
> *附属脚本头(Head)* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **subscript** [*参数子句*](..\chapter3\05_Declarations.html#parameter_clause)  
> *附属脚本结果(Result)* → **->** [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*type*](..\chapter3\03_Types.html#type)  

<p></p>

> 运算符声明语法  
> *运算符声明* → [*前置运算符声明*](..\chapter3\05_Declarations.html#prefix_operator_declaration) | [*后置运算符声明*](..\chapter3\05_Declarations.html#postfix_operator_declaration) | [*中置运算符声明*](..\chapter3\05_Declarations.html#infix_operator_declaration)  
> *前置运算符声明* → **运算符** **prefix** [*运算符*](LexicalStructure.html#operator) **{** **}**  
> *后置运算符声明* → **运算符** **postfix** [*运算符*](LexicalStructure.html#operator) **{** **}**  
> *中置运算符声明* → **运算符** **infix** [*运算符*](LexicalStructure.html#operator) **{** [*中置运算符属性*](..\chapter3\05_Declarations.html#infix_operator_attributes) _可选_ **}**  
> *中置运算符属性* → [*优先级子句*](..\chapter3\05_Declarations.html#precedence_clause) _可选_ [*结和性子句*](..\chapter3\05_Declarations.html#associativity_clause) _可选_  
> *优先级子句* → **precedence** [*优先级水平*](..\chapter3\05_Declarations.html#precedence_level)  
> *优先级水平* → 数值 0 到 255  
> *结和性子句* → **associativity** [*结和性*](..\chapter3\05_Declarations.html#associativity)  
> *结和性* → **left** | **right** | **none**  

<a name="patterns"></a>
## 模式

> 模式(Patterns) 语法  
> *模式* → [*wildcard-pattern*](..\chapter3\07_Patterns.html#wildcard_pattern) [*类型注解*](..\chapter3\03_Types.html#type_annotation) _可选_  
> *模式* → [*identifier-pattern*](..\chapter3\07_Patterns.html#identifier_pattern) [*类型注解*](..\chapter3\03_Types.html#type_annotation) _可选_  
> *模式* → [*value-binding-pattern*](..\chapter3\07_Patterns.html#value_binding_pattern)  
> *模式* → [*元组模式*](..\chapter3\07_Patterns.html#tuple_pattern) [*类型注解*](..\chapter3\03_Types.html#type_annotation) _可选_  
> *模式* → [*enum-case-pattern*](..\chapter3\07_Patterns.html#enum_case_pattern)  
> *模式* → [*type-casting-pattern*](..\chapter3\07_Patterns.html#type_casting_pattern)  
> *模式* → [*表达式模式*](..\chapter3\07_Patterns.html#expression_pattern)  

<p></p>

> 通配符模式语法  
> *wildcard-pattern* → **_**  

<p></p>

> 标识符模式语法  
> *identifier-pattern* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 值绑定模式语法  
> *value-binding-pattern* → **var** [*模式*](..\chapter3\07_Patterns.html#pattern) | **let** [*模式*](..\chapter3\07_Patterns.html#pattern)  

<p></p>

> 元组模式语法  
> *元组模式* → **(** [*元组模式元素列表*](..\chapter3\07_Patterns.html#tuple_pattern_element_list) _可选_ **)**  
> *元组模式元素列表* → [*元组模式元素*](..\chapter3\07_Patterns.html#tuple_pattern_element) | [*元组模式元素*](..\chapter3\07_Patterns.html#tuple_pattern_element) **,** [*元组模式元素列表*](..\chapter3\07_Patterns.html#tuple_pattern_element_list)  
> *元组模式元素* → [*模式*](..\chapter3\07_Patterns.html#pattern)  

<p></p>

> 枚举用例模式语法  
> *enum-case-pattern* → [*类型标识*](..\chapter3\03_Types.html#type_identifier) _可选_ **.** [*enum-case-name*](..\chapter3\05_Declarations.html#enum_case_name) [*元组模式*](..\chapter3\07_Patterns.html#tuple_pattern) _可选_  

<p></p>

> 类型转换模式语法  
> *type-casting-pattern* → [*is-pattern*](..\chapter3\07_Patterns.html#is_pattern) | [*as-pattern*](..\chapter3\07_Patterns.html#as_pattern)  
> *is-pattern* → **is** [*type*](..\chapter3\03_Types.html#type)  
> *as-pattern* → [*模式*](..\chapter3\07_Patterns.html#pattern) **as** [*type*](..\chapter3\03_Types.html#type)  

<p></p>

> 表达式模式语法  
> *表达式模式* → [*表达式*](..\chapter3\04_Expressions.html#expression)  

<a name="attributes"></a>
## 特性

> 特性语法  
> *特色* → **@** [*特性名*](..\chapter3\06_Attributes.html#attribute_name) [*特性参数子句*](..\chapter3\06_Attributes.html#attribute_argument_clause) _可选_  
> *特性名* → [*标识符*](LexicalStructure.html#identifier)  
> *特性参数子句* → **(** [*多个平衡令牌*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **)**  
> *多个特性(Attributes)* → [*特色*](..\chapter3\06_Attributes.html#attribute) [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_  
> *多个平衡令牌* → [*平衡令牌*](..\chapter3\06_Attributes.html#balanced_token) [*多个平衡令牌*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_  
> *平衡令牌* → **(** [*多个平衡令牌*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **)**  
> *平衡令牌* → **[** [*多个平衡令牌*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **]**  
> *平衡令牌* → **{** [*多个平衡令牌*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **}**  
> *平衡令牌* → 任意标识符, 关键字, 字面量或运算符  
> *平衡令牌* → 任意除了(-, )=, [-, ]-, {- 或 }-

<a name="expressions"></a>
## 表达式

> 表达式语法  
> *表达式* → [*前置表达式*](..\chapter3\04_Expressions.html#prefix_expression) [*多个二元表达式*](..\chapter3\04_Expressions.html#binary_expressions) _可选_  
> *表达式列表* → [*表达式*](..\chapter3\04_Expressions.html#expression) | [*表达式*](..\chapter3\04_Expressions.html#expression) **,** [*表达式列表*](..\chapter3\04_Expressions.html#expression_list)  

<p></p>

> 前置表达式语法  
> *前置表达式* → [*前置运算符*](LexicalStructure.html#prefix_operator) _可选_ [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression)  
> *前置表达式* → [*写入写出(in-out)表达式*](..\chapter3\04_Expressions.html#in_out_expression)  
> *写入写出(in-out)表达式* → **&** [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 二元表达式语法  
> *二元表达式* → [*二元运算符*](LexicalStructure.html#binary_operator) [*前置表达式*](..\chapter3\04_Expressions.html#prefix_expression)  
> *二元表达式* → [*赋值运算符*](..\chapter3\04_Expressions.html#assignment_operator) [*前置表达式*](..\chapter3\04_Expressions.html#prefix_expression)  
> *二元表达式* → [*条件运算符*](..\chapter3\04_Expressions.html#conditional_operator) [*前置表达式*](..\chapter3\04_Expressions.html#prefix_expression)  
> *二元表达式* → [*类型转换运算符*](..\chapter3\04_Expressions.html#type_casting_operator)  
> *多个二元表达式* → [*二元表达式*](..\chapter3\04_Expressions.html#binary_expression) [*多个二元表达式*](..\chapter3\04_Expressions.html#binary_expressions) _可选_  

<p></p>

> 赋值运算符语法  
> *赋值运算符* → **=**  

<p></p>

> 条件运算符语法  
> *条件运算符* → **?** [*表达式*](..\chapter3\04_Expressions.html#expression) **:**  

<p></p>

> 类型转换运算符语法  
> *类型转换运算符* → **is** [*type*](..\chapter3\03_Types.html#type) | **as** **?** _可选_ [*type*](..\chapter3\03_Types.html#type)  

<p></p>

> 主表达式语法  
> *主表达式* → [*标识符*](LexicalStructure.html#identifier) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic_argument_clause) _可选_  
> *主表达式* → [*字面量表达式*](..\chapter3\04_Expressions.html#literal_expression)  
> *主表达式* → [*self表达式*](..\chapter3\04_Expressions.html#self_expression)  
> *主表达式* → [*超类表达式*](..\chapter3\04_Expressions.html#superclass_expression)  
> *主表达式* → [*闭包表达式*](..\chapter3\04_Expressions.html#closure_expression)  
> *主表达式* → [*圆括号表达式*](..\chapter3\04_Expressions.html#parenthesized_expression)  
> *主表达式* → [*隐式成员表达式*](..\chapter3\04_Expressions.html#implicit_member_expression)  
> *主表达式* → [*通配符表达式*](..\chapter3\04_Expressions.html#wildcard_expression)  

<p></p>

> 字面量表达式语法  
> *字面量表达式* → [*字面量*](LexicalStructure.html#literal)  
> *字面量表达式* → [*数组字面量*](..\chapter3\04_Expressions.html#array_literal) | [*字典字面量*](..\chapter3\04_Expressions.html#dictionary_literal)  
> *字面量表达式* → **&#95;&#95;FILE&#95;&#95;** | **&#95;&#95;LINE&#95;&#95;** | **&#95;&#95;COLUMN&#95;&#95;** | **&#95;&#95;FUNCTION&#95;&#95;**  
> *数组字面量* → **[** [*array_literal_items*](..\chapter3\04_Expressions.html#array_literal_items) _可选_ **]**  
> *array-literal-items* → [*array-literal-item*](..\chapter3\04_Expressions.html#array_literal_item) **,** _可选_ | [*array-literal-item*](..\chapter3\04_Expressions.html#array_literal_item) **,** [*array-literal-items*](..\chapter3\04_Expressions.html#array_literal_items)  
> *array-literal-item* → [*表达式*](..\chapter3\04_Expressions.html#expression)  
> *字典字面量* → **[** [*dictionary-literal-items*](..\chapter3\04_Expressions.html#dictionary_literal_items) **]** | **[** **:** **]**  
> *dictionary-literal-items* → [*dictionary-literal-item*](..\chapter3\04_Expressions.html#dictionary_literal_item) **,** _可选_ | [*dictionary-literal-item*](..\chapter3\04_Expressions.html#dictionary_literal_item) **,** [*dictionary-literal-items*](..\chapter3\04_Expressions.html#dictionary_literal_items)  
> *dictionary-literal-item* → [*表达式*](..\chapter3\04_Expressions.html#expression) **:** [*表达式*](..\chapter3\04_Expressions.html#expression)  

<p></p>

> Self 表达式语法  
> *self表达式* → **self**  
> *self表达式* → **self** **.** [*标识符*](LexicalStructure.html#identifier)  
> *self表达式* → **self** **[** [*表达式*](..\chapter3\04_Expressions.html#expression) **]**  
> *self表达式* → **self** **.** **init**  

<p></p>

> 超类表达式语法  
> *超类表达式* → [*超类方法表达式*](..\chapter3\04_Expressions.html#superclass_method_expression) | [*超类下标表达式*](..\chapter3\04_Expressions.html#超类下标表达式) | [*超类构造器表达式*](..\chapter3\04_Expressions.html#superclass_initializer_expression)  
> *超类方法表达式* → **super** **.** [*标识符*](LexicalStructure.html#identifier)  
> *超类下标表达式* → **super** **[** [*表达式*](..\chapter3\04_Expressions.html#expression) **]**  
> *超类构造器表达式* → **super** **.** **init**  

<p></p>

> 闭包表达式语法  
> *闭包表达式* → **{** [*闭包签名(Signational)*](..\chapter3\04_Expressions.html#closure_signature) _可选_ [*多条语句(Statements)*](..\chapter3\10_Statements.html#statements) **}**  
> *闭包签名(Signational)* → [*参数子句*](..\chapter3\05_Declarations.html#parameter_clause) [*函数结果*](..\chapter3\05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*标识符列表*](LexicalStructure.html#identifier_list) [*函数结果*](..\chapter3\05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*capture-list*](..\chapter3\04_Expressions.html#capture_list) [*参数子句*](..\chapter3\05_Declarations.html#parameter_clause) [*函数结果*](..\chapter3\05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*capture-list*](..\chapter3\04_Expressions.html#capture_list) [*标识符列表*](LexicalStructure.html#identifier_list) [*函数结果*](..\chapter3\05_Declarations.html#function_result) _可选_ **in**  
> *闭包签名(Signational)* → [*capture-list*](..\chapter3\04_Expressions.html#capture_list) **in**  
> *capture-list* → **[** [*capture-specifier*](..\chapter3\04_Expressions.html#capture_specifier) [*表达式*](..\chapter3\04_Expressions.html#expression) **]**  
> *capture-specifier* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**  

<p></p>

> 隐式成员表达式语法  
> *隐式成员表达式* → **.** [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 圆括号表达式(Parenthesized Expression)语法  
> *圆括号表达式* → **(** [*表达式元素列表*](..\chapter3\04_Expressions.html#expression_element_list) _可选_ **)**  
> *表达式元素列表* → [*表达式元素*](..\chapter3\04_Expressions.html#expression_element) | [*表达式元素*](..\chapter3\04_Expressions.html#expression_element) **,** [*表达式元素列表*](..\chapter3\04_Expressions.html#expression_element_list)  
> *表达式元素* → [*表达式*](..\chapter3\04_Expressions.html#expression) | [*标识符*](LexicalStructure.html#identifier) **:** [*表达式*](..\chapter3\04_Expressions.html#expression)  

<p></p>

> 通配符表达式语法  
> *通配符表达式* → **_**  

<p></p>

> 后置表达式语法  
> *后置表达式* → [*主表达式*](..\chapter3\04_Expressions.html#primary_expression)  
> *后置表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) [*后置运算符*](LexicalStructure.html#postfix_operator)  
> *后置表达式* → [*函数调用表达式*](..\chapter3\04_Expressions.html#function_call_expression)  
> *后置表达式* → [*构造器表达式*](..\chapter3\04_Expressions.html#initializer_expression)  
> *后置表达式* → [*显示成员表达式*](..\chapter3\04_Expressions.html#explicit_member_expression)  
> *后置表达式* → [*后置self表达式*](..\chapter3\04_Expressions.html#postfix_self_expression)  
> *后置表达式* → [*动态类型表达式*](..\chapter3\04_Expressions.html#dynamic_type_expression)  
> *后置表达式* → [*下标表达式*](..\chapter3\04_Expressions.html#subscript_expression)  
> *后置表达式* → [*强制取值(Forced Value)表达式*](..\chapter3\04_Expressions.html#forced_value_expression)  
> *后置表达式* → [*可选链(Optional Chaining)表达式*](..\chapter3\04_Expressions.html#optional_chaining_expression)  

<p></p>

> 函数调用表达式语法  
> *函数调用表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) [*圆括号表达式*](..\chapter3\04_Expressions.html#parenthesized_expression)  
> *函数调用表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) [*圆括号表达式*](..\chapter3\04_Expressions.html#parenthesized_expression) _可选_ [*后置闭包(Trailing Closure)*](..\chapter3\04_Expressions.html#trailing_closure)  
> *后置闭包(Trailing Closure)* → [*闭包表达式*](..\chapter3\04_Expressions.html#closure_expression)  

<p></p>

> 构造器表达式语法  
> *构造器表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **.** **init**  

<p></p>

> 显式成员表达式语法  
> *显示成员表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **.** [*十进制数字*](LexicalStructure.html#decimal_digit)  
> *显示成员表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **.** [*标识符*](LexicalStructure.html#identifier) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic_argument_clause) _可选_  

<p></p>

> Self 表达式语法  
> *后置self表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **.** **self**  

<p></p>

> 动态类型表达式语法  
> *动态类型表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **.** **dynamicType**  

<p></p>

> 下标表达式语法  
> *下标表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **[** [*表达式列表*](..\chapter3\04_Expressions.html#expression_list) **]**  

<p></p>

> 强制取值(Forced Value)语法  
> *强制取值(Forced Value)表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **!**  

<p></p>

> 可选链表达式语法  
> *可选链表达式* → [*后置表达式*](..\chapter3\04_Expressions.html#postfix_expression) **?**  

<a name="lexical_structure"></a>
## 词法结构

> 标识符语法  
> *标识符* → [*标识符头(Head)*](LexicalStructure.html#identifier_head) [*多个标识符字符*](LexicalStructure.html#identifier_characters) _可选_  
> *标识符* → **`** [*标识符头(Head)*](LexicalStructure.html#identifier_head) [*多个标识符字符*](LexicalStructure.html#identifier_characters) _可选_ **`**  
> *标识符* → [*隐式参数名*](LexicalStructure.html#implicit_parameter_name)  
> *标识符列表* → [*标识符*](LexicalStructure.html#identifier) | [*标识符*](LexicalStructure.html#identifier) **,** [*标识符列表*](LexicalStructure.html#identifier_list)  
> *标识符头(Head)* → Upper- or lowercase letter A through Z  
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
> *标识符字符* → [*标识符头(Head)*](LexicalStructure.html#identifier_head)  
> *多个标识符字符* → [*标识符字符*](LexicalStructure.html#identifier_character) [*多个标识符字符*](LexicalStructure.html#identifier_characters) _可选_  
> *隐式参数名* → **$** [*多个十进制数字*](LexicalStructure.html#decimal_digits)  

<p></p>

> 字面量语法  
> *字面量* → [*整型字面量*](LexicalStructure.html#integer_literal) | [*浮点数字面量*](LexicalStructure.html#floating_point_literal) | [*字符串字面量*](LexicalStructure.html#string_literal)  

<p></p>

> 整型字面量语法  
> *整型字面量* → [*二进制字面量*](LexicalStructure.html#binary_literal)  
> *整型字面量* → [*八进制字面量*](LexicalStructure.html#octal_literal)  
> *整型字面量* → [*十进制字面量*](LexicalStructure.html#decimal_literal)  
> *整型字面量* → [*十六进制字面量*](LexicalStructure.html#hexadecimal_literal)  
> *二进制字面量* → **0b** [*二进制数字*](LexicalStructure.html#binary_digit) [*多个二进制字面量字符*](LexicalStructure.html#binary_literal_characters) _可选_  
> *二进制数字* → 数值 0 到 1  
> *二进制字面量字符* → [*二进制数字*](LexicalStructure.html#binary_digit) | **_**  
> *多个二进制字面量字符* → [*二进制字面量字符*](LexicalStructure.html#binary_literal_character) [*多个二进制字面量字符*](LexicalStructure.html#binary_literal_characters) _可选_  
> *八进制字面量* → **0o** [*八进字数字*](LexicalStructure.html#octal_digit) [*多个八进制字符*](LexicalStructure.html#octal_literal_characters) _可选_  
> *八进字数字* → 数值 0 到 7  
> *八进制字符* → [*八进字数字*](LexicalStructure.html#octal_digit) | **_**  
> *多个八进制字符* → [*八进制字符*](LexicalStructure.html#octal_literal_character) [*多个八进制字符*](LexicalStructure.html#octal_literal_characters) _可选_  
> *十进制字面量* → [*十进制数字*](LexicalStructure.html#decimal_digit) [*多个十进制字符*](LexicalStructure.html#decimal_literal_characters) _可选_  
> *十进制数字* → 数值 0 到 9  
> *多个十进制数字* → [*十进制数字*](LexicalStructure.html#decimal_digit) [*多个十进制数字*](LexicalStructure.html#decimal_digits) _可选_  
> *十进制字符* → [*十进制数字*](LexicalStructure.html#decimal_digit) | **_**  
> *多个十进制字符* → [*十进制字符*](LexicalStructure.html#decimal_literal_character) [*多个十进制字符*](LexicalStructure.html#decimal_literal_characters) _可选_  
> *十六进制字面量* → **0x** [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*多个十六进制字面量字符*](LexicalStructure.html#hexadecimal_literal_characters) _可选_  
> *十六进制数字* → 数值 0 到 9, a through f, or A through F  
> *十六进制字符* → [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) | **_**  
> *多个十六进制字面量字符* → [*十六进制字符*](LexicalStructure.html#hexadecimal_literal_character) [*多个十六进制字面量字符*](LexicalStructure.html#hexadecimal_literal_characters) _可选_  

<p></p>

> 浮点型字面量语法  
> *浮点数字面量* → [*十进制字面量*](LexicalStructure.html#decimal_literal) [*十进制分数*](LexicalStructure.html#decimal_fraction) _可选_ [*十进制指数*](LexicalStructure.html#decimal_exponent) _可选_  
> *浮点数字面量* → [*十六进制字面量*](LexicalStructure.html#hexadecimal_literal) [*十六进制分数*](LexicalStructure.html#hexadecimal_fraction) _可选_ [*十六进制指数*](LexicalStructure.html#hexadecimal_exponent)  
> *十进制分数* → **.** [*十进制字面量*](LexicalStructure.html#decimal_literal)  
> *十进制指数* → [*浮点数e*](LexicalStructure.html#floating_point_e) [*正负号*](LexicalStructure.html#sign) _可选_ [*十进制字面量*](LexicalStructure.html#decimal_literal)  
> *十六进制分数* → **.** [*十六进制字面量*](LexicalStructure.html#hexadecimal_literal) _可选_  
> *十六进制指数* → [*浮点数p*](LexicalStructure.html#floating_point_p) [*正负号*](LexicalStructure.html#sign) _可选_ [*十六进制字面量*](LexicalStructure.html#hexadecimal_literal)  
> *浮点数e* → **e** | **E**  
> *浮点数p* → **p** | **P**  
> *正负号* → **+** | **-**  

<p></p>

> 字符型字面量语法  
> *字符串字面量* → **"** [*引用文本*](LexicalStructure.html#quoted_text) **"**  
> *引用文本* → [*引用文本条目*](LexicalStructure.html#quoted_text_item) [*引用文本*](LexicalStructure.html#quoted_text) _可选_  
> *引用文本条目* → [*转义字符*](LexicalStructure.html#escaped_character)  
> *引用文本条目* → **\(** [*表达式*](..\chapter3\04_Expressions.html#expression) **)**  
> *引用文本条目* → Any Unicode extended grapheme cluster except "­, \­, U+000A, or U+000D  
> *转义字符* → **\0** | **\\** | **\t** | **\n** | **\r** | **\"** | **\'**  
> *转义字符* → **\x** [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit)  
> *转义字符* → **\u** [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit)  
> *转义字符* → **\U** [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit) [*十六进制数字*](LexicalStructure.html#hexadecimal_digit)  

<p></p>

> 运算符语法语法  
> *运算符* → [*运算符字符*](LexicalStructure.html#operator_character) [*运算符*](LexicalStructure.html#operator) _可选_  
> *运算符字符* → **/** | **=** | **-** | **+** | **!** | **&#42;** | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **.**  
> *二元运算符* → [*运算符*](LexicalStructure.html#operator)  
> *前置运算符* → [*运算符*](LexicalStructure.html#operator)  
> *后置运算符* → [*运算符*](LexicalStructure.html#operator)  

<a name="types"></a>
## 类型

> 类型语法  
> *type* → [*数组类型*](..\chapter3\03_Types.html#array_type) | [*函数类型*](..\chapter3\03_Types.html#function_type) | [*类型标识*](..\chapter3\03_Types.html#type_identifier) | [*元组类型*](..\chapter3\03_Types.html#tuple_type) | [*可选类型*](..\chapter3\03_Types.html#optional_type) | [*implicitly-unwrapped-optional-type*](..\chapter3\03_Types.html#implicitly_unwrapped_optional_type) | [*协议合成类型*](..\chapter3\03_Types.html#protocol_composition_type) | [*metatype-type*](..\chapter3\03_Types.html#metatype_type)  

<p></p>

> 类型标注语法  
> *类型注解* → **:** [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ [*type*](..\chapter3\03_Types.html#type)  

<p></p>

> 类型标识语法  
> *类型标识* → [*类名*](..\chapter3\03_Types.html#type_name) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic_argument_clause) _可选_ | [*类名*](..\chapter3\03_Types.html#type_name) [*泛型参数子句(Generic Argument Clause)*](GenericParametersAndArguments.html#generic_argument_clause) _可选_ **.** [*类型标识*](..\chapter3\03_Types.html#type_identifier)  
> *类名* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 元组类型语法  
> *元组类型* → **(** [*tuple-type-body*](..\chapter3\03_Types.html#tuple_type_body) _可选_ **)**  
> *tuple-type-body* → [*tuple-type-element-list*](..\chapter3\03_Types.html#tuple_type_element_list) **...** _可选_  
> *tuple-type-element-list* → [*tuple-type-element*](..\chapter3\03_Types.html#tuple_type_element) | [*tuple-type-element*](..\chapter3\03_Types.html#tuple_type_element) **,** [*tuple-type-element-list*](..\chapter3\03_Types.html#tuple_type_element_list)  
> *tuple-type-element* → [*多个特性(Attributes)*](..\chapter3\06_Attributes.html#attributes) _可选_ **inout** _可选_ [*type*](..\chapter3\03_Types.html#type) | **inout** _可选_ [*element-name*](..\chapter3\03_Types.html#element_name) [*类型注解*](..\chapter3\03_Types.html#type_annotation)  
> *element-name* → [*标识符*](LexicalStructure.html#identifier)  

<p></p>

> 函数类型语法  
> *函数类型* → [*type*](..\chapter3\03_Types.html#type) **->** [*type*](..\chapter3\03_Types.html#type)  

<p></p>

> 数组类型语法  
> *数组类型* → [*type*](..\chapter3\03_Types.html#type) **[** **]** | [*数组类型*](..\chapter3\03_Types.html#array_type) **[** **]**  

<p></p>

> 可选类型语法  
> *可选类型* → [*type*](..\chapter3\03_Types.html#type) **?**  

<p></p>

> 隐式解析可选类型语法  
> *implicitly-unwrapped-optional-type* → [*type*](..\chapter3\03_Types.html#type) **!**  

<p></p>

> 协议合成类型语法  
> *协议合成类型* → **protocol** **<** [*protocol-identifier-list*](..\chapter3\03_Types.html#protocol_identifier_list) _可选_ **>**  
> *protocol-identifier-list* → [*protocol-identifier*](..\chapter3\03_Types.html#protocol_identifier) | [*protocol-identifier*](..\chapter3\03_Types.html#protocol_identifier) **,** [*protocol-identifier-list*](..\chapter3\03_Types.html#protocol_identifier_list)  
> *protocol-identifier* → [*类型标识*](..\chapter3\03_Types.html#type_identifier)  

<p></p>

> 元类型语法  
> *metatype-type* → [*type*](..\chapter3\03_Types.html#type) **.** **Type** | [*type*](..\chapter3\03_Types.html#type) **.** **Protocol**  

<p></p>

> 类型继承子句语法  
> *类型继承子句* → **:** [*type-inheritance-list*](..\chapter3\03_Types.html#type_inheritance_list)  
> *type-inheritance-list* → [*类型标识*](..\chapter3\03_Types.html#type_identifier) | [*类型标识*](..\chapter3\03_Types.html#type_identifier) **,** [*type-inheritance-list*](..\chapter3\03_Types.html#type_inheritance_list)
