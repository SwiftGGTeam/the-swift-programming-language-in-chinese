## 声明 {#declarations}

> 声明语法
>
> *声明* → [导入声明](./06_Declarations.md#import_declaration)
>
> *声明* → [常量声明](./06_Declarations.md#constant_declaration)
>
> *声明* → [变量声明](./06_Declarations.md#variable_declaration)
>
> *声明* → [类型别名声明](./06_Declarations.md#typealias_declaration)
>
> *声明* → [函数声明](./06_Declarations.md#function_declaration)
>
> *声明* → [枚举声明](./06_Declarations.md#enum_declaration)
>
> *声明* → [结构体声明](./06_Declarations.md#struct_declaration)
>
> *声明* → [类声明](./06_Declarations.md#class_declaration)
>
> *声明* → [协议声明](./06_Declarations.md#protocol_declaration)
>
> *声明* → [构造器声明](./06_Declarations.md#initializer_declaration)
>
> *声明* → [析构器声明](./06_Declarations.md#deinitializer_declaration)
>
> *声明* → [扩展声明](./06_Declarations.md#extension_declaration)
>
> *声明* → [下标声明](./06_Declarations.md#subscript_declaration)
>
> *声明* → [运算符声明](./06_Declarations.md#operator_declaration)
>
> *声明* → [优先级组声明](./06_Declarations.md#precedence_group_declaration)
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
> *导入声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> **import** [导入类型](./06_Declarations.md#import_kind)<sub>可选</sub> [导入路径](./06_Declarations.md#import_path)
>
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **let** | **var** | **func**
>
> *导入路径* → [导入路径标识符](./06_Declarations.md#import_path_identifier) | [导入路径标识符](./06_Declarations.md#import_path_identifier) **.** [导入路径](./06_Declarations.md#import_path)
>
> *导入路径标识符* → [标识符](./02_Lexical_Structure.md#identifier) | [运算符](./02_Lexical_Structure.md#operator)
>

<!-- -->

> 常数声明语法
>
> *常量声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration_specifiers)<sub>可选</sub> **let** [模式构造器集](./06_Declarations.md#pattern_initializer_list)
>
> *模式构造器集* → [模式构造器](./06_Declarations.md#pattern_initializer) | [模式构造器](./06_Declarations.md#pattern_initializer)    **,** [模式构造器集](./06_Declarations.md#pattern_initializer_list)
>
> *模式构造器* → [模式](./08_Patterns.md#pattern) [构造器](./06_Declarations.md#initializer)<sub>可选</sub>
>
> *构造器* → **=** [表达式](./04_Expressions.md#expression)
>

<!-- -->

> 变量声明语法
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [模式构造器集](./06_Declarations.md#pattern_initializer_list)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [变量名](./06_Declarations.md#variable_name) [类型注解](./03_Types.md#type_annotation) [代码块](./06_Declarations.md#code_block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [变量名](./06_Declarations.md#variable_name) [类型注解](./03_Types.md#type_annotation) [getter-setter 块](./06_Declarations.md#getter_setter_block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [变量名](./06_Declarations.md#variable_name) [类型注解](./03_Types.md#type_annotation) [getter-setter 关键字块](./06_Declarations.md#getter_setter_keyword_block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [变量名](./06_Declarations.md#variable_name) [构造器](./06_Declarations.md#initializer)<sub>可选</sub> [willSet-didSet 代码块](./06_Declarations.md#willSet_didSet_block)
>
> *变量声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [变量名](./06_Declarations.md#variable_name) [类型注解](./03_Types.md#type_annotation) [构造器](./06_Declarations.md#initializer)<sub>可选</sub> [willSet-didSet 代码块](./06_Declarations.md#willSet_didSet_block)
>
> *变量声明头* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration_specifiers)<sub>可选</sub> **var**
>
> *变量名称* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *getter-setter 块* → [代码块](./06_Declarations.md#code_block)
>
> *getter-setter 块* → **{** [getter 子句](./06_Declarations.md#getter_clause) [setter 子句](./06_Declarations.md#setter_clause)<sub>可选</sub> **}**
>
> *getter-setter 块* → **{** [setter 子句](./06_Declarations.md#setter_clause) [getter 子句](./06_Declarations.md#getter_clause) **}**
>
> *getter 子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub>  **get**  [代码块](./06_Declarations.md#code_block)
>
> *setter 子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub> **set** [setter 名称](./06_Declarations.md#setter_name)<sub>可选</sub> [代码块](./06_Declarations.md#code_block)
>
> *setter 名称* → **(** [标识符](./02_Lexical_Structure.md#identifier) **)**
>
> *getter-setter 关键字（Keyword）块* → **{** [getter 关键字子句](./06_Declarations.md#getter_keyword_clause) [setter 关键字子句](./06_Declarations.md#setter_keyword_clause)<sub>可选</sub> **}**
>
> *getter-setter 关键字（Keyword）块* → **{** [setter 关键字子句](./06_Declarations.md#setter_keyword_clause) [getter 关键字子句](./06_Declarations.md#getter_keyword_clause) **}**
>
> *getter 关键字（Keyword）子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub> **get**
>
> *setter 关键字（Keyword）子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [可变性修饰符](./06_Declarations.md#mutation-modifier)<sub>可选</sub> **set**
>
> *willSet-didSet 代码块* → **{** [willSet 子句](./06_Declarations.md#willSet_clause) [didSet 子句](./06_Declarations.md#didSet_clause)<sub>可选</sub> **}**
>
> *willSet-didSet 代码块* → **{** [didSet 子句](./06_Declarations.md#didSet_clause) [willSet 子句](./06_Declarations.md#willSet_clause)<sub>可选</sub> **}**
>
> *willSet 子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> **willSet** [setter 名称](./06_Declarations.md#setter_name)<sub>可选</sub> [代码块](./06_Declarations.md#code_block)
>
> *didSet 子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub>
>
 **didSet** [setter 名称](./06_Declarations.md#setter_name)<sub>可选</sub> [代码块](./06_Declarations.md#code_block)

<!-- -->

> 类型别名声明语法
>
> *类型别名声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier) **typealias** [类型别名名称](./06_Declarations.md#typealias_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [类型别名赋值](./06_Declarations.md#typealias_assignment)
>
> *类型别名名称* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *类型别名赋值* → **=** [类型](./03_Types.md#type)
>

<!-- -->

> 函数声明语法
>
> *函数声明* → [函数头](./06_Declarations.md#function_head) [函数名](./06_Declarations.md#function_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [函数签名](./06_Declarations.md#function_signature) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [函数体](./06_Declarations.md#function_body)<sub>可选</sub>
>
> *函数头* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明描述符集](./06_Declarations.md#declaration_specifiers)<sub>可选</sub> **func**
>
> *函数名* → [标识符](./02_Lexical_Structure.md#identifier) | [运算符](./02_Lexical_Structure.md#operator)
>
> *函数签名* → [参数子句](./06_Declarations.md#parameter_clause) **throws**<sub>可选</sub> [函数结果](./06_Declarations.md#function_result)<sub>可选</sub>
>

> *函数签名* → [参数子句](./06_Declarations.md#parameter_clause) **rethrows** [函数结果](./06_Declarations.md#function_result)<sub>可选</sub>
>
> *函数结果* → **->** [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [类型](./03_Types.md#type)
>
> *函数体* → [代码块](./06_Declarations.md#code_block)
>
> *参数子句* → **(** **)** | **(** [参数集](./06_Declarations.md#parameter_list) **)**
>
> *参数集* → [参数](./06_Declarations.md#parameter) | [参数](./06_Declarations.md#parameter) **,** [参数集](./06_Declarations.md#parameter_list)
>
> *参数* → [外部参数名](./06_Declarations.md#parameter_name)<sub>可选</sub> [本地参数名](./06_Declarations.md#local_parameter_name) [类型注解](./03_Types.md#type_annotation) [默认参数子句](./06_Declarations.md#default_argument_clause)<sub>可选</sub>
>
> *参数* → [外部参数名](./06_Declarations.md#parameter_name)<sub>可选</sub> [本地参数名](./06_Declarations.md#local_parameter_name) [类型注解](./03_Types.md#type_annotation)
>
> *参数* → [外部参数名](./06_Declarations.md#parameter_name)<sub>可选</sub> [本地参数名](./06_Declarations.md#local_parameter_name) [类型注解](./03_Types.md#type_annotation) **...**
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
> *枚举声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> [联合式枚举](./06_Declarations.md#union_style_enum)
>
> *枚举声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> [原始值式枚举](./06_Declarations.md#raw-value-style-enum)
>
> *联合式枚举* → **indirect**<sub>可选</sub> **enum** [枚举名](./06_Declarations.md#enum_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> **{** [联合式枚举成员](./06_Declarations.md#union_style_enum_members)<sub>可选</sub> **}**
>
> *联合式枚举成员集* → [联合式枚举成员](./06_Declarations.md#union_style_enum_member) [联合样式枚举成员集](./06_Declarations.md#union_style_enum_members)<sub>可选</sub>
>
> *联合样式枚举成员* → [声明](./06_Declarations.md#declaration) | [联合式枚举 case 子句](./06_Declarations.md#union_style_enum_case_clause) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *联合式枚举 case 子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> **indirect**<sub>可选</sub> **case** [联合式枚举 case 集](./06_Declarations.md#union_style_enum_case_list)
>
> *联合式枚举 case 集* → [联合式枚举 case](./06_Declarations.md#union_style_enum_case) | [联合式枚举 case](./06_Declarations.md#union_style_enum_case) **,** [联合式枚举 case 集](./06_Declarations.md#union_style_enum_case_list)
>
> *联合式枚举 case* → [枚举的 case 名](./06_Declarations.md#enum_case_name) [元组类型](./03_Types.md#tuple_type)<sub>可选</sub>
>
> *枚举名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *枚举的 case 名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *原始值式枚举* → **enum** [枚举名](./06_Declarations.md#enum_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type-inheritance-clause) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> **{** [原始值式枚举成员集](./06_Declarations.md#raw_value_style_enum_members) **}**
>
> *原始值式枚举成员集* → [原始值式枚举成员](./06_Declarations.md#raw_value_style_enum_member) [原始值式枚举成员集](./06_Declarations.md#raw_value_style_enum_members)<sub>可选</sub>
>
> *原始值式枚举成员* → [声明](./06_Declarations.md#declaration) | [原始值式枚举 case 子句](./06_Declarations.md#raw_value_style_enum_case_clause) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *原始值式枚举 case 子句* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> **case** [原始值式枚举 case 集](./06_Declarations.md#raw_value_style_enum_case_list)
>
> *原始值式枚举 case 集* → [原始值式枚举 case](./06_Declarations.md#raw_value_style_enum_case) | [原始值式枚举 case](./06_Declarations.md#raw_value_style_enum_case) **,** [原始值式枚举 case 集](./06_Declarations.md#raw_value_style_enum_case_list)
>
> *原始值式枚举 case* → [枚举的 case 名](./06_Declarations.md#enum_case_name) [原始值赋值](./06_Declarations.md#raw_value_assignment)<sub>可选</sub>
>
> *原始值赋值* → **=** [原始值字面量](./02_Lexical_Structure.md#literal)
>
> *原始值字面量（raw-value-literal）* → [数值字面量](./02_Lexical_Structure.md#literal) | [静态字符串字面量](./02_Lexical_Structure.md#literal) | [布尔字面量](./02_Lexical_Structure.md#literal)
>

<!-- -->

> 结构体声明语法
>
> *结构体声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **struct** [结构体名称](./06_Declarations.md#struct_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type_inheritance_clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [结构体主体](./06_Declarations.md#struct_body)
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
> *类声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **final**<sub>可选</sub> **class** [类名](./06_Declarations.md#class_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type_inheritance_clause) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [类主体](./06_Declarations.md#class_body)
>
> *类声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> **final** [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **class** [类名](./06_Declarations.md#class_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [类型继承子句](./03_Types.md#type_inheritance_clause) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [类主体](./06_Declarations.md#class_body)
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
> *协议声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub>  **protocol** [协议名](./06_Declarations.md#protocol_name) [类型继承子句](./03_Types.md#type_inheritance_clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [协议主体](./06_Declarations.md#protocol_body)
>
> *协议名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *协议主体* → **{** [协议成员集](./06_Declarations.md#protocol_member_declarations)<sub>可选</sub> **}**
>
> *协议成员集* → [协议成员](./06_Declarations.md#declarations) [协议成员集](./06_Declarations.md#declarations)<sub>可选</sub>
>
> *协议成员* → [协议成员声明](./06_Declarations.md#declarations) | [编译控制语句](./05_Statements.md#compiler-control-statement)
>
> *协议成员声明* → [协议属性声明](./06_Declarations.md#protocol_property_declaration)
>
> *协议成员声明* → [协议方法声明](./06_Declarations.md#protocol_method_declaration)
>
> *协议成员声明* → [协议构造器声明](./06_Declarations.md#protocol_initializer_declaration)
>
> *协议成员声明* → [协议下标声明](./06_Declarations.md#protocol_subscript_declaration)
>
> *协议成员声明* → [协议关联类型声明](./06_Declarations.md#protocol_associated_type_declaration)
>
> *协议成员声明* → [类型别名声明](./06_Declarations.md#typealias_declaration)
>

<!-- -->

> 协议属性声明语法
>
> *协议属性声明* → [变量声明头](./06_Declarations.md#variable_declaration_head) [变量名](./06_Declarations.md#variable_name) [类型注解](./03_Types.md#type_annotation) [getter-setter 关键字块](./06_Declarations.md#getter_setter_keyword_block)
>

<!-- -->

> 协议方法声明语法
>
> *协议方法声明* → [函数头](./06_Declarations.md#function_head) [函数名](./06_Declarations.md#function_name) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [函数签名](./06_Declarations.md#function_signature) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub>
>

<!-- -->

> 协议构造器声明语法
>
> *协议构造器声明* → [构造器头](./06_Declarations.md#initializer_head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter_clause) **throws**<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub>
>
> *协议构造器声明* → [构造器头](./06_Declarations.md#initializer_head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter_clause) **rethrows** [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub>
>

<!-- -->

> 协议下标声明语法
>
> *协议下标声明* → [下标头](./06_Declarations.md#subscript_head) [下标结果](./06_Declarations.md#subscript_result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [getter-setter 关键字块](./06_Declarations.md#getter_setter_keyword_block)
>

<!-- -->

> 协议关联类型声明语法
>
> *协议关联类型声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **associatedtype** [类型别名](./06_Declarations.md#typealias_name) [类型继承子句](./03_Types.md#type_inheritance_clause)<sub>可选</sub> [类型别名赋值](./06_Declarations.md#typealias_assignment)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub>
>

<!-- -->

> 构造器声明语法
>
> *构造器声明* → [构造器头](./06_Declarations.md#initializer_head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter_clause) **throws**<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [构造器主体](./06_Declarations.md#initializer_body)
>
> *构造器声明* → [构造器头](./06_Declarations.md#initializer_head) [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter_clause) **rethrows** [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [构造器主体](./06_Declarations.md#initializer_body)
>
> *构造器头（Head）* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration_modifiers)<sub>可选</sub>  **init**
>
> *构造器头（Head）* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration_modifiers)<sub>可选</sub>  **init ?**
>
> *构造器头（Head）* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration_modifiers)<sub>可选</sub>  **init !**
>
> *构造器主体* → [代码块](./06_Declarations.md#code_block)
>

<!-- -->

> 析构器声明语法
>
> *析构器声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> **deinit** [代码块](./06_Declarations.md#code_block)
>

<!-- -->

> 扩展声明语法
>
> *扩展声明* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](./07_Attributes.md#access-level-modifier)<sub>可选</sub> **extension** [类型标识](./03_Types.md#type_identifier) [类型继承子句](./03_Types.md#type_inheritance_clause)<sub>可选</sub> [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [扩展主体](./06_Declarations.md#extension_body)
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
> *下标声明* → [下标头](./06_Declarations.md#subscript_head) [下标结果](./06_Declarations.md#subscript_result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [代码块](./06_Declarations.md#code_block)
>
> *下标声明* → [下标头](./06_Declarations.md#subscript_head) [下标结果](./06_Declarations.md#subscript_result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [getter-setter 块](./06_Declarations.md#getter_setter_block)
>
> *下标声明* → [下标头](./06_Declarations.md#subscript_head) [下标结果](./06_Declarations.md#subscript_result) [泛型 where 子句](./09_Generic_Parameters_and_Arguments.md#generic_where_clause)<sub>可选</sub> [getter-setter 关键字块](./06_Declarations.md#getter_setter_keyword_block)
>
> *下标头（Head）* → [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [声明修饰符集](./06_Declarations.md#declaration_modifiers)<sub>可选</sub> **subscript** [泛型参数子句](./09_Generic_Parameters_and_Arguments.md#generic_parameter_clause)<sub>可选</sub> [参数子句](./06_Declarations.md#parameter_clause)
>
> *下标结果（Result）* → **->** [属性集](./07_Attributes.md#attributes)<sub>可选</sub> [类型](./03_Types.md#type)
>

<!-- -->

> 运算符声明语法
>
> *运算符声明* → [前置运算符声明](./06_Declarations.md#prefix_operator_declaration) | [后置运算符声明](./06_Declarations.md#postfix_operator_declaration) | [中置运算符声明](./06_Declarations.md#infix_operator_declaration)
>
> *前置运算符声明* → **prefix** **operator**  [运算符](./02_Lexical_Structure.md#operator)
>
> *后置运算符声明* → **postfix** **operator**  [运算符](./02_Lexical_Structure.md#operator)
>
> *中置运算符声明* → **infix** **operator**  [运算符](./02_Lexical_Structure.md#operator) [中置运算符属性集](./06_Declarations.md#infix_operator_attributes)<sub>可选</sub>
>
> *中置运算符属性集* → [优先级组名](./06_Declarations.md#precedence_group_name)
>

> 优先级组声明语法
>
> *优先级组声明* → **precedencegroup** [优先级组名](./06_Declarations.md#precedence_group_name) **{** [优先级组属性集](./06_Declarations.md#precedence_group_attributes)<sub>可选</sub> **}**
>
> *优先级组属性集* → [优先级组属性](./06_Declarations.md#declarations) [优先级组属性集](./06_Declarations.md#declarations)<sub>可选</sub>
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
> *优先级组赋值* → **assignment :** [布尔字面量](./02_Lexical_Structure.md#string_literal)
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
> *声明修饰符集* → [声明修饰符](./06_Declarations.md#declaration_modifier) [声明修饰符集](./06_Declarations.md#declaration_modifiers)<sub>可选</sub>
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
> *属性* → **@** [属性名](./07_Attributes.md#attribute_name) [属性参数子句](./07_Attributes.md#attribute_argument_clause)<sub>可选</sub>
>
> *属性名* → [标识符](./02_Lexical_Structure.md#identifier)
>
> *属性参数子句* → **{** [平衡令牌集](./07_Attributes.md#balanced_tokens)<sub>可选</sub>  **}**
>
> *属性（Attributes）集* → [属性](./07_Attributes.md#attribute) [属性集](./07_Attributes.md#attributes)<sub>可选</sub>
>
> *平衡令牌集* → [平衡令牌](./07_Attributes.md#balanced_token) [平衡令牌集](./07_Attributes.md#balanced_tokens)<sub>可选</sub>
>
> *平衡令牌* → **(** [平衡令牌集](./07_Attributes.md#balanced_tokens)<sub>可选</sub> **)**
>
> *平衡令牌* → **[** [平衡令牌集](./07_Attributes.md#balanced_tokens)<sub>可选</sub> **]**
>
> *平衡令牌* → **{** [平衡令牌集](./07_Attributes.md#balanced_tokens)<sub>可选</sub> **}**
>
> *平衡令牌* → 任意标识符、关键字、字面量或运算符
>
> *平衡令牌* → 除 **(** 、**)**、**[**、**]**、**{**、**}** 外的任意标点符号
>
>

## 模式 {#patterns}

> 模式语法
>
> *模式* → [通配符模式](./08_Patterns.md#wildcard_pattern) [类型注解](./03_Types.md#type_annotation)<sub>可选</sub>
>
> *模式* → [标识符模式](./08_Patterns.md#identifier_pattern) [类型注解](./03_Types.md#type_annotati Value Bindingon )<sub>可选</sub>
>
> *模式* → [值绑定模式](./08_Patterns.md#value_binding_pattern)
>
> *模式* → [元组模式](./08_Patterns.md#tuple_pattern) [类型注解](./03_Types.md#type_annotation)<sub>可选</sub>
>
> *模式* → [枚举 case 模式](./08_Patterns.md#enum_case_pattern)
>
> *模式* → [可选模式](./08_Patterns.md#optional_pattern)
>
> *模式* → [类型转换模式](./08_Patterns.md#type_casting_pattern)
>
> *模式* → [表达式模式](./08_Patterns.md#expression_pattern)
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
> *元组模式* → **(** [元组模式元素集](./08_Patterns.md#tuple_pattern_element_list)<sub>可选</sub> **)**
>
> *元组模式元素集* → [元组模式元素](./08_Patterns.md#tuple_pattern_element) | [元组模式元素](./08_Patterns.md#tuple_pattern_element) **,** [元组模式元素集](./08_Patterns.md#tuple_pattern_element_list)
>
> *元组模式元素* → [模式](./08_Patterns.md#pattern) | [标识符](./02_Lexical_Structure.md#identifier) **:** [模式](./08_Patterns.md#pattern)
>

<!-- -->

> 枚举 case 模式语法
>
> *enum-case-pattern* → [类型标识](./03_Types.md#type_identifier)<sub>可选</sub> **.** [枚举 case 名](./06_Declarations.md#enum_case_name) [元组模式](./08_Patterns.md#tuple_pattern)<sub>可选</sub>
>

<!-- -->
> 可选模式语法
>
> *可选模式* → [标识符模式](./02_Lexical_Structure.md#identifier) **?**
>

<!-- -->

> 类型转换模式语法
>
> *类型转换模式* → [is 模式](./08_Patterns.md#is_pattern) | [as 模式](./08_Patterns.md#as_pattern)
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

## 泛型参数 {#generic_parameters_and_arguments}

> 泛型形参子句语法
>
>
> *泛型参数子句* → **<** [泛型参数集](./09_Generic_Parameters_and_Arguments.md#generic_parameter_list) **>**
>
> *泛型参数集* → [泛型参数](./09_Generic_Parameters_and_Arguments.md#generic_parameter) | [泛形参数](./09_Generic_Parameters_and_Arguments.md#generic_parameter) **,** [泛型参数集](./09_Generic_Parameters_and_Arguments.md#generic_parameter_list)
>
> *泛形参数* → [类型名称](./03_Types.md#type_name)
>
> *泛形参数* → [类型名称](./03_Types.md#type_name) **:** [类型标识](./03_Types.md#type_identifier)
>
> *泛形参数* → [类型名称](./03_Types.md#type_name) **:** [协议合成类型](./03_Types.md#protocol_composition_type)
>
> *泛型 where 子句* → **where** [约束集](./09_Generic_Parameters_and_Arguments.md#requirement_list)
>
> *约束集* → [约束](./09_Generic_Parameters_and_Arguments.md#requirement) | [约束](./09_Generic_Parameters_and_Arguments.md#requirement) **,** [约束集](./09_Generic_Parameters_and_Arguments.md#requirement_list)
>
> *约束* → [一致性约束](./09_Generic_Parameters_and_Arguments.md#conformance_requirement) | [同类型约束](./09_Generic_Parameters_and_Arguments.md#same_type_requirement)
>
> *一致性约束* → [类型标识](./03_Types.md#type_identifier) **:** [类型标识](./03_Types.md#type_identifier)
>
> *一致性约束* → [类型标识](./03_Types.md#type_identifier) **:** [协议合成类型](./03_Types.md#protocol_composition_type)
>
> *同类型约束* → [类型标识](./03_Types.md#type_identifier) **==** [类型](./03_Types.md#type_identifier)
>
