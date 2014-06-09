# 语法总结 (Summary of the Grammar)

`本节结构已搞定，内容已填充，未完全翻译完...`

## 语句 (Statements)

<p></p>

> 语句 (Grammar of a statement)  
> *statement* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **;** _opt_  
> *statement* → [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration) **;** _opt_  
> *statement* → [*loop-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/loop-statement) **;** _opt_  
> *statement* → [*branch-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/branch-statement) **;** _opt_  
> *statement* → [*labeled-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/labeled-statement)  
> *statement* → [*control-transfer-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/control-transfer-statement) **;** _opt_  
> *statements* → [*statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statement) [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements) _opt_  

<p></p>

> 循环语句 (Grammar of a loop statement)  
> *loop-statement* → [*for-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-statement)  
> *loop-statement* → [*for-in-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-in-statement)  
> *loop-statement* → [*while-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/while-statement)  
> *loop-statement* → [*do-while-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/do-while-statement)  

<p></p>

> for循环 (Grammar of a for statement)  
> *for-statement* → **for** [*for-init*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-init) _opt_ **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) _opt_ **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) _opt_ [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *for-statement* → **for** **(** [*for-init*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-init) _opt_ **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) _opt_ **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) _opt_ **)** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *for-init* → [*variable-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration) | [*expression-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-list)  

<p></p>

> for-in循环 (Grammar of a for-in statement)  
> *for-in-statement* → **for** [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) **in** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  

<p></p>

> while循环 (Grammar of a while statement)  
> *while-statement* → **while** [*while-condition*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/while-condition) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *while-condition* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) | [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration)  

<p></p>

> do-while循环 (Grammar of a do-while statement)  
> *do-while-statement* → **do** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block) **while** [*while-condition*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/while-condition)  

<p></p>

> 条件语句 (Grammar of a branch statement)  
> *branch-statement* → [*if-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/if-statement)  
> *branch-statement* → [*switch-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/switch-statement)  

<p></p>

> if语句 (Grammar of an if statement)  
> *if-statement* → **if** [*if-condition*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/if-condition) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block) [*else-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/else-clause) _opt_  
> *if-condition* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) | [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration)  
> *else-clause* → **else** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block) | **else** [*if-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/if-statement)  

<p></p>

> switch语句 (Grammar of a switch statement)  
> *switch-statement* → **switch** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **{** [*switch-cases*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/switch-cases) _opt_ **}**  
> *switch-cases* → [*switch-case*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/switch-case) [*switch-cases*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/switch-cases) _opt_  
> *switch-case* → [*case-label*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/case-label) [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements) | [*default-label*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/default-label) [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements)  
> *switch-case* → [*case-label*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/case-label) **;** | [*default-label*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/default-label) **;**  
> *case-label* → **case** [*case-item-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/case-item-list) **:**  
> *case-item-list* → [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) [*guard-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/guard-clause) _opt_ | [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) [*guard-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/guard-clause) _opt_ **,** [*case-item-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/case-item-list)  
> *default-label* → **default** **:**  
> *guard-clause* → **where** [*guard-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/guard-expression)  
> *guard-expression* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  

<p></p>

> XXXX (Grammar of a labeled statement)  
> *labeled-statement* → [*statement-label*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statement-label) [*loop-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/loop-statement) | [*statement-label*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statement-label) [*switch-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/switch-statement)  
> *statement-label* → [*label-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/label-name) **:**  
> *label-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  

<p></p>

>  (Grammar of a control transfer statement)  
> *control-transfer-statement* → [*break-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/break-statement)  
> *control-transfer-statement* → [*continue-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/continue-statement)  
> *control-transfer-statement* → [*fallthrough-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/fallthrough-statement)  
> *control-transfer-statement* → [*return-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/return-statement)  

<p></p>

>  (Grammar of a break statement)  
> *break-statement* → **break** [*label-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/label-name) _opt_  

<p></p>

>  (Grammar of a continue statement)  
> *continue-statement* → **continue** [*label-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/label-name) _opt_  

<p></p>

>  (Grammar of a fallthrough statement)  
> *fallthrough-statement* → **fallthrough**  

<p></p>

>  (Grammar of a return statement)  
> *return-statement* → **return** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) _opt_  

## 泛型参数 (Generic Parameters and Arguments)

<p></p>

>  (Grammar of a generic parameter clause)  
> *generic-parameter-clause* → **<** [*generic-parameter-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-list) [*requirement-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/requirement-clause) _opt_ **>**  
> *generic-parameter-list* → [*generic-parameter*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter) | [*generic-parameter*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter) **,** [*generic-parameter-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-list)  
> *generic-parameter* → [*type-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-name)  
> *generic-parameter* → [*type-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-name) **:** [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier)  
> *generic-parameter* → [*type-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-name) **:** [*protocol-composition-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-composition-type)  
> *requirement-clause* → **where** [*requirement-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/requirement-list)  
> *requirement-list* → [*requirement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/requirement) | [*requirement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/requirement) **,** [*requirement-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/requirement-list)  
> *requirement* → [*conformance-requirement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/conformance-requirement) | [*same-type-requirement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/same-type-requirement)  
> *conformance-requirement* → [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) **:** [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier)  
> *conformance-requirement* → [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) **:** [*protocol-composition-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-composition-type)  
> *same-type-requirement* → [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) **==** [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier)  

<p></p>

>  (Grammar of a generic argument clause)  
> *generic-argument-clause* → **<** [*generic-argument-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument-list) **>**  
> *generic-argument-list* → [*generic-argument*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument) | [*generic-argument*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument) **,** [*generic-argument-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument-list)  
> *generic-argument* → [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

## 声明 (Declarations)

<p></p>

>  (Grammar of a declaration)  
> *declaration* → [*import-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/import-declaration)  
> *declaration* → [*constant-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/constant-declaration)  
> *declaration* → [*variable-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration)  
> *declaration* → [*typealias-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/typealias-declaration)  
> *declaration* → [*function-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-declaration)  
> *declaration* → [*enum-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/enum-declaration)  
> *declaration* → [*struct-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/struct-declaration)  
> *declaration* → [*class-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/class-declaration)  
> *declaration* → [*protocol-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-declaration)  
> *declaration* → [*initializer-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/initializer-declaration)  
> *declaration* → [*deinitializer-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/deinitializer-declaration)  
> *declaration* → [*extension-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/extension-declaration)  
> *declaration* → [*subscript-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-declaration)  
> *declaration* → [*operator-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/operator-declaration)  
> *declarations* → [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration) [*declarations*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declarations) _opt_  
> *declaration-specifiers* → [*declaration-specifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration-specifier) [*declaration-specifiers*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration-specifiers) _opt_  
> *declaration-specifier* → **class** | **mutating** | **nonmutating** | **override** | **static** | **unowned** | **unowned(safe)** | **unowned(unsafe)** | **weak**  

<p></p>

>  (Grammar of a top-level declaration)  
> *top-level-declaration* → [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements) _opt_  

<p></p>

>  (Grammar of a code block)  
> *code-block* → **{** [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements) _opt_ **}**  

<p></p>

>  (Grammar of an import declaration)  
> *import-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **import** [*import-kind*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/import-kind) _opt_ [*import-path*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/import-path)  
> *import-kind* → **typealias** | **struct** | **class** | **enum** | **protocol** | **var** | **func**  
> *import-path* → [*import-path-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/import-path-identifier) | [*import-path-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/import-path-identifier) **.** [*import-path*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/import-path)  
> *import-path-identifier* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) | [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator)  

<p></p>

>  (Grammar of a constant declaration)  
> *constant-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*declaration-specifiers*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration-specifiers) _opt_ **let** [*pattern-initializer-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/pattern-initializer-list)  
> *pattern-initializer-list* → [*pattern-initializer*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/pattern-initializer) | [*pattern-initializer*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/pattern-initializer) **,** [*pattern-initializer-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/pattern-initializer-list)  
> *pattern-initializer* → [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) [*initializer*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/initializer) _opt_  
> *initializer* → **=** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  

<p></p>

>  (Grammar of a variable declaration)  
> *variable-declaration* → [*variable-declaration-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration-head) [*pattern-initializer-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/pattern-initializer-list)  
> *variable-declaration* → [*variable-declaration-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration-head) [*variable-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-name) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *variable-declaration* → [*variable-declaration-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration-head) [*variable-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-name) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*getter-setter-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-setter-block)  
> *variable-declaration* → [*variable-declaration-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration-head) [*variable-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-name) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*getter-setter-keyword-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-setter-keyword-block)  
> *variable-declaration* → [*variable-declaration-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration-head) [*variable-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-name) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*initializer*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/initializer) _opt_ [*willSet-didSet-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/willSet-didSet-block)  
> *variable-declaration-head* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*declaration-specifiers*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration-specifiers) _opt_ **var**  
> *variable-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *getter-setter-block* → **{** [*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) [*setter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) _opt_ **}**  
> *getter-setter-block* → **{** [*setter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) [*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) **}**  
> *getter-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **get** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *setter-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **set** [*setter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-name) _opt_ [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *setter-name* → **(** [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) **)**  
> *getter-setter-keyword-block* → **{** [*getter-keyword-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-keyword-clause) [*setter-keyword-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-keyword-clause) _opt_ **}**  
> *getter-setter-keyword-block* → **{** [*setter-keyword-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-keyword-clause) [*getter-keyword-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-keyword-clause) **}**  
> *getter-keyword-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **get**  
> *setter-keyword-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **set**  
> *willSet-didSet-block* → **{** [*willSet-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/willSet-clause) [*didSet-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/didSet-clause) _opt_ **}**  
> *willSet-didSet-block* → **{** [*didSet-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/didSet-clause) [*willSet-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/willSet-clause) **}**  
> *willSet-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **willSet** [*setter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-name) _opt_ [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *didSet-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **didSet** [*setter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-name) _opt_ [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  

<p></p>

>  (Grammar of a type alias declaration)  
> *typealias-declaration* → [*typealias-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/typealias-head) [*typealias-assignment*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/typealias-assignment)  
> *typealias-head* → **typealias** [*typealias-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/typealias-name)  
> *typealias-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *typealias-assignment* → **=** [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

<p></p>

>  (Grammar of a function declaration)  
> *function-declaration* → [*function-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-head) [*function-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-name) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ [*function-signature*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-signature) [*function-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-body)  
> *function-head* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*declaration-specifiers*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration-specifiers) _opt_ **func**  
> *function-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) | [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator)  
> *function-signature* → [*parameter-clauses*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clauses) [*function-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-result) _opt_  
> *function-result* → **->** [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  
> *function-body* → [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *parameter-clauses* → [*parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clause) [*parameter-clauses*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clauses) _opt_  
> *parameter-clause* → **(** **)** | **(** [*parameter-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-list) **...** _opt_ **)**  
> *parameter-list* → [*parameter*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter) | [*parameter*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter) **,** [*parameter-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-list)  
> *parameter* → **inout** _opt_ **let** _opt_ **#** _opt_ [*parameter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-name) [*local-parameter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/local-parameter-name) _opt_ [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*default-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/default-argument-clause) _opt_  
> *parameter* → **inout** _opt_ **var** **#** _opt_ [*parameter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-name) [*local-parameter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/local-parameter-name) _opt_ [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*default-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/default-argument-clause) _opt_  
> *parameter* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  
> *parameter-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) | **_**  
> *local-parameter-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) | **_**  
> *default-argument-clause* → **=** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  

<p></p>

>  (Grammar of an enumeration declaration)  
> *enum-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*union-style-enum*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum) | [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*raw-value-style-enum*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum)  
> *union-style-enum* → [*enum-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/enum-name) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ **{** [*union-style-enum-members*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-members) _opt_ **}**  
> *union-style-enum-members* → [*union-style-enum-member*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-member) [*union-style-enum-members*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-members) _opt_  
> *union-style-enum-member* → [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration) | [*union-style-enum-case-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-case-clause)  
> *union-style-enum-case-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **case** [*union-style-enum-case-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-case-list)  
> *union-style-enum-case-list* → [*union-style-enum-case*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-case) | [*union-style-enum-case*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-case) **,** [*union-style-enum-case-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/union-style-enum-case-list)  
> *union-style-enum-case* → [*enum-case-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/enum-case-name) [*tuple-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type) _opt_  
> *enum-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *enum-case-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *raw-value-style-enum* → [*enum-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/enum-name) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ **:** [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) **{** [*raw-value-style-enum-members*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-members) _opt_ **}**  
> *raw-value-style-enum-members* → [*raw-value-style-enum-member*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-member) [*raw-value-style-enum-members*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-members) _opt_  
> *raw-value-style-enum-member* → [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration) | [*raw-value-style-enum-case-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-case-clause)  
> *raw-value-style-enum-case-clause* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **case** [*raw-value-style-enum-case-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-case-list)  
> *raw-value-style-enum-case-list* → [*raw-value-style-enum-case*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-case) | [*raw-value-style-enum-case*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-case) **,** [*raw-value-style-enum-case-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-style-enum-case-list)  
> *raw-value-style-enum-case* → [*enum-case-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/enum-case-name) [*raw-value-assignment*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/raw-value-assignment) _opt_  
> *raw-value-assignment* → **=** [*literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/literal)  

<p></p>

>  (Grammar of a structure declaration)  
> *struct-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **struct** [*struct-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/struct-name) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ [*type-inheritance-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-clause) _opt_ [*struct-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/struct-body)  
> *struct-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *struct-body* → **{** [*declarations*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declarations) _opt_ **}**  

<p></p>

>  (Grammar of a class declaration)  
> *class-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **class** [*class-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/class-name) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ [*type-inheritance-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-clause) _opt_ [*class-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/class-body)  
> *class-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *class-body* → **{** [*declarations*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declarations) _opt_ **}**  

<p></p>

>  (Grammar of a protocol declaration)  
> *protocol-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **protocol** [*protocol-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-name) [*type-inheritance-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-clause) _opt_ [*protocol-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-body)  
> *protocol-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *protocol-body* → **{** [*protocol-member-declarations*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-member-declarations) _opt_ **}**  
> *protocol-member-declaration* → [*protocol-property-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-property-declaration)  
> *protocol-member-declaration* → [*protocol-method-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-method-declaration)  
> *protocol-member-declaration* → [*protocol-initializer-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-initializer-declaration)  
> *protocol-member-declaration* → [*protocol-subscript-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-subscript-declaration)  
> *protocol-member-declaration* → [*protocol-associated-type-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-associated-type-declaration)  
> *protocol-member-declarations* → [*protocol-member-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-member-declaration) [*protocol-member-declarations*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/protocol-member-declarations) _opt_  

<p></p>

>  (Grammar of a protocol property declaration)  
> *protocol-property-declaration* → [*variable-declaration-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration-head) [*variable-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-name) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) [*getter-setter-keyword-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-setter-keyword-block)  

<p></p>

>  (Grammar of a protocol method declaration)  
> *protocol-method-declaration* → [*function-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-head) [*function-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-name) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ [*function-signature*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-signature)  

<p></p>

>  (Grammar of a protocol initializer declaration)  
> *protocol-initializer-declaration* → [*initializer-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/initializer-head) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ [*parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clause)  

<p></p>

>  (Grammar of a protocol subscript declaration)  
> *protocol-subscript-declaration* → [*subscript-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-head) [*subscript-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-result) [*getter-setter-keyword-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-setter-keyword-block)  

<p></p>

>  (Grammar of a protocol associated type declaration)  
> *protocol-associated-type-declaration* → [*typealias-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/typealias-head) [*type-inheritance-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-clause) _opt_ [*typealias-assignment*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/typealias-assignment) _opt_  

<p></p>

>  (Grammar of an initializer declaration)  
> *initializer-declaration* → [*initializer-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/initializer-head) [*generic-parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-parameter-clause) _opt_ [*parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clause) [*initializer-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/initializer-body)  
> *initializer-head* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **convenience** _opt_ **init**  
> *initializer-body* → [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  

<p></p>

>  (Grammar of a deinitializer declaration)  
> *deinitializer-declaration* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **deinit** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  

<p></p>

>  (Grammar of an extension declaration)  
> *extension-declaration* → **extension** [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) [*type-inheritance-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-clause) _opt_ [*extension-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/extension-body)  
> *extension-body* → **{** [*declarations*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declarations) _opt_ **}**  

<p></p>

>  (Grammar of a subscript declaration)  
> *subscript-declaration* → [*subscript-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-head) [*subscript-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-result) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)  
> *subscript-declaration* → [*subscript-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-head) [*subscript-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-result) [*getter-setter-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-setter-block)  
> *subscript-declaration* → [*subscript-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-head) [*subscript-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/subscript-result) [*getter-setter-keyword-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-setter-keyword-block)  
> *subscript-head* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **subscript** [*parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clause)  
> *subscript-result* → **->** [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

<p></p>

>  (Grammar of an operator declaration)  
> *operator-declaration* → [*prefix-operator-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/prefix-operator-declaration) | [*postfix-operator-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/postfix-operator-declaration) | [*infix-operator-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/infix-operator-declaration)  
> *prefix-operator-declaration* → **operator** **prefix** [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator) **{** **}**  
> *postfix-operator-declaration* → **operator** **postfix** [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator) **{** **}**  
> *infix-operator-declaration* → **operator** **infix** [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator) **{** [*infix-operator-attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/infix-operator-attributes) _opt_ **}**  
> *infix-operator-attributes* → [*precedence-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/precedence-clause) _opt_ [*associativity-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/associativity-clause) _opt_  
> *precedence-clause* → **precedence** [*precedence-level*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/precedence-level)  
> *precedence-level* → Digit 0 through 255  
> *associativity-clause* → **associativity** [*associativity*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/associativity)  
> *associativity* → **left** | **right** | **none**  

## 模式 (Patterns)

<p></p>

>  (Grammar of a pattern)  
> *pattern* → [*wildcard-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/wildcard-pattern) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) _opt_  
> *pattern* → [*identifier-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/identifier-pattern) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) _opt_  
> *pattern* → [*value-binding-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/value-binding-pattern)  
> *pattern* → [*tuple-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/tuple-pattern) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation) _opt_  
> *pattern* → [*enum-case-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/enum-case-pattern)  
> *pattern* → [*type-casting-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/type-casting-pattern)  
> *pattern* → [*expression-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/expression-pattern)  

<p></p>

>  (Grammar of a wildcard pattern)  
> *wildcard-pattern* → **_**  

<p></p>

>  (Grammar of an identifier pattern)  
> *identifier-pattern* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  

<p></p>

>  (Grammar of a value-binding pattern)  
> *value-binding-pattern* → **var** [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) | **let** [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern)  

<p></p>

>  (Grammar of a tuple pattern)  
> *tuple-pattern* → **(** [*tuple-pattern-element-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/tuple-pattern-element-list) _opt_ **)**  
> *tuple-pattern-element-list* → [*tuple-pattern-element*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/tuple-pattern-element) | [*tuple-pattern-element*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/tuple-pattern-element) **,** [*tuple-pattern-element-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/tuple-pattern-element-list)  
> *tuple-pattern-element* → [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern)  

<p></p>

>  (Grammar of an enumeration case pattern)  
> *enum-case-pattern* → [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) _opt_ **.** [*enum-case-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/enum-case-name) [*tuple-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/tuple-pattern) _opt_  

<p></p>

>  (Grammar of a type casting pattern)  
> *type-casting-pattern* → [*is-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/is-pattern) | [*as-pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/as-pattern)  
> *is-pattern* → **is** [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  
> *as-pattern* → [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) **as** [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

<p></p>

>  (Grammar of an expression pattern)  
> *expression-pattern* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  

## 特性 (Attributes)

<p></p>

>  (Grammar of an attribute)  
> *attribute* → **@** [*attribute-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attribute-name) [*attribute-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attribute-argument-clause) _opt_  
> *attribute-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *attribute-argument-clause* → **(** [*balanced-tokens*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/balanced-tokens) _opt_ **)**  
> *attributes* → [*attribute*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attribute) [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_  
> *balanced-tokens* → [*balanced-token*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/balanced-token) [*balanced-tokens*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/balanced-tokens) _opt_  
> *balanced-token* → **(** [*balanced-tokens*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/balanced-tokens) _opt_ **)**  
> *balanced-token* → **[** [*balanced-tokens*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/balanced-tokens) _opt_ **]**  
> *balanced-token* → **{** [*balanced-tokens*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/balanced-tokens) _opt_ **}**  
> *balanced-token* → Any identifier, keyword, literal, or operator  
> *balanced-token* → Any punctuation except (­, )­, [­, ]­, {­, or }­  

## 表达式 (Expressions)

<p></p>

>  (Grammar of an expression)  
> *expression* → [*prefix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/prefix-expression) [*binary-expressions*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/binary-expressions) _opt_  
> *expression-list* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) | [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **,** [*expression-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-list)  

<p></p>

>  (Grammar of a prefix expression)  
> *prefix-expression* → [*prefix-operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/prefix-operator) _opt_ [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression)  
> *prefix-expression* → [*in-out-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/in-out-expression)  
> *in-out-expression* → **&** [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  

<p></p>

>  (Grammar of a binary expression)  
> *binary-expression* → [*binary-operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-operator) [*prefix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/prefix-expression)  
> *binary-expression* → [*assignment-operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/assignment-operator) [*prefix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/prefix-expression)  
> *binary-expression* → [*conditional-operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/conditional-operator) [*prefix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/prefix-expression)  
> *binary-expression* → [*type-casting-operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/type-casting-operator)  
> *binary-expressions* → [*binary-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/binary-expression) [*binary-expressions*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/binary-expressions) _opt_  

<p></p>

>  (Grammar of an assignment operator)  
> *assignment-operator* → **=**  

<p></p>

>  (Grammar of a conditional operator)  
> *conditional-operator* → **?** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **:**  

<p></p>

>  (Grammar of a type-casting operator)  
> *type-casting-operator* → **is** [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) | **as** **?** _opt_ [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

<p></p>

>  (Grammar of a primary expression)  
> *primary-expression* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) [*generic-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument-clause) _opt_  
> *primary-expression* → [*literal-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/literal-expression)  
> *primary-expression* → [*self-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/self-expression)  
> *primary-expression* → [*superclass-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/superclass-expression)  
> *primary-expression* → [*closure-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/closure-expression)  
> *primary-expression* → [*parenthesized-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/parenthesized-expression)  
> *primary-expression* → [*implicit-member-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/implicit-member-expression)  
> *primary-expression* → [*wildcard-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/wildcard-expression)  

<p></p>

>  (Grammar of a literal expression)  
> *literal-expression* → [*literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/literal)  
> *literal-expression* → [*array-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/array-literal) | [*dictionary-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/dictionary-literal)  
> *literal-expression* → **&#95;&#95;FILE&#95;&#95;** | **&#95;&#95;LINE&#95;&#95;** | **&#95;&#95;COLUMN&#95;&#95;** | **&#95;&#95;FUNCTION&#95;&#95;**  
> *array-literal* → **[** [*array-literal-items*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/array-literal-items) _opt_ **]**  
> *array-literal-items* → [*array-literal-item*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/array-literal-item) **,** _opt_ | [*array-literal-item*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/array-literal-item) **,** [*array-literal-items*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/array-literal-items)  
> *array-literal-item* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  
> *dictionary-literal* → **[** [*dictionary-literal-items*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/dictionary-literal-items) **]** | **[** **:** **]**  
> *dictionary-literal-items* → [*dictionary-literal-item*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/dictionary-literal-item) **,** _opt_ | [*dictionary-literal-item*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/dictionary-literal-item) **,** [*dictionary-literal-items*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/dictionary-literal-items)  
> *dictionary-literal-item* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **:** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  

<p></p>

>  (Grammar of a self expression)  
> *self-expression* → **self**  
> *self-expression* → **self** **.** [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *self-expression* → **self** **[** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **]**  
> *self-expression* → **self** **.** **init**  

<p></p>

>  (Grammar of a superclass expression)  
> *superclass-expression* → [*superclass-method-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/superclass-method-expression) | [*superclass-subscript-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/superclass-subscript-expression) | [*superclass-initializer-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/superclass-initializer-expression)  
> *superclass-method-expression* → **super** **.** [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  
> *superclass-subscript-expression* → **super** **[** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **]**  
> *superclass-initializer-expression* → **super** **.** **init**  

<p></p>

>  (Grammar of a closure expression)  
> *closure-expression* → **{** [*closure-signature*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/closure-signature) _opt_ [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements) **}**  
> *closure-signature* → [*parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clause) [*function-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-result) _opt_ **in**  
> *closure-signature* → [*identifier-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-list) [*function-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-result) _opt_ **in**  
> *closure-signature* → [*capture-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/capture-list) [*parameter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/parameter-clause) [*function-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-result) _opt_ **in**  
> *closure-signature* → [*capture-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/capture-list) [*identifier-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-list) [*function-result*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/function-result) _opt_ **in**  
> *closure-signature* → [*capture-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/capture-list) **in**  
> *capture-list* → **[** [*capture-specifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/capture-specifier) [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **]**  
> *capture-specifier* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**  

<p></p>

>  (Grammar of a implicit member expression)  
> *implicit-member-expression* → **.** [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  

<p></p>

>  (Grammar of a parenthesized expression)  
> *parenthesized-expression* → **(** [*expression-element-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-element-list) _opt_ **)**  
> *expression-element-list* → [*expression-element*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-element) | [*expression-element*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-element) **,** [*expression-element-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-element-list)  
> *expression-element* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) | [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) **:** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)  

<p></p>

>  (Grammar of a wildcard expression)  
> *wildcard-expression* → **_**  

<p></p>

>  (Grammar of a postfix expression)  
> *postfix-expression* → [*primary-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/primary-expression)  
> *postfix-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) [*postfix-operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/postfix-operator)  
> *postfix-expression* → [*function-call-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/function-call-expression)  
> *postfix-expression* → [*initializer-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/initializer-expression)  
> *postfix-expression* → [*explicit-member-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/explicit-member-expression)  
> *postfix-expression* → [*postfix-self-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-self-expression)  
> *postfix-expression* → [*dynamic-type-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/dynamic-type-expression)  
> *postfix-expression* → [*subscript-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/subscript-expression)  
> *postfix-expression* → [*forced-value-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/forced-value-expression)  
> *postfix-expression* → [*optional-chaining-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/optional-chaining-expression)  

<p></p>

>  (Grammar of a function call expression)  
> *function-call-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) [*parenthesized-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/parenthesized-expression)  
> *function-call-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) [*parenthesized-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/parenthesized-expression) _opt_ [*trailing-closure*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/trailing-closure)  
> *trailing-closure* → [*closure-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/closure-expression)  

<p></p>

>  (Grammar of an initializer expression)  
> *initializer-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **.** **init**  

<p></p>

>  (Grammar of an explicit member expression)  
> *explicit-member-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **.** [*decimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digit)  
> *explicit-member-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **.** [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) [*generic-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument-clause) _opt_  

<p></p>

>  (Grammar of a self expression)  
> *postfix-self-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **.** **self**  

<p></p>

>  (Grammar of a dynamic type expression)  
> *dynamic-type-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **.** **dynamicType**  

<p></p>

>  (Grammar of a subscript expression)  
> *subscript-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **[** [*expression-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-list) **]**  

<p></p>

>  (Grammar of a forced-value expression)  
> *forced-value-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **!**  

<p></p>

>  (Grammar of an optional-chaining expression)  
> *optional-chaining-expression* → [*postfix-expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/postfix-expression) **?**  

## 词法结构 (Lexical Structure)

<p></p>

>  (Grammar of an identifier)  
> *identifier* → [*identifier-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-head) [*identifier-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-characters) _opt_  
> *identifier* → **`** [*identifier-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-head) [*identifier-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-characters) _opt_ **`**  
> *identifier* → [*implicit-parameter-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/implicit-parameter-name)  
> *identifier-list* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) | [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier) **,** [*identifier-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-list)  
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
> *identifier-character* → Digit 0 through 9  
> *identifier-character* → U+0300–U+036F, U+1DC0–U+1DFF, U+20D0–U+20FF, or U+FE20–U+FE2F  
> *identifier-character* → [*identifier-head*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-head)  
> *identifier-characters* → [*identifier-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-character) [*identifier-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier-characters) _opt_  
> *implicit-parameter-name* → **$** [*decimal-digits*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digits)  

<p></p>

>  (Grammar of a literal)  
> *literal* → [*integer-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/integer-literal) | [*floating-point-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/floating-point-literal) | [*string-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/string-literal)  

<p></p>

>  (Grammar of an integer literal)  
> *integer-literal* → [*binary-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-literal)  
> *integer-literal* → [*octal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/octal-literal)  
> *integer-literal* → [*decimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal)  
> *integer-literal* → [*hexadecimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal)  
> *binary-literal* → **0b** [*binary-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-digit) [*binary-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-literal-characters) _opt_  
> *binary-digit* → Digit 0 or 1  
> *binary-literal-character* → [*binary-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-digit) | **_**  
> *binary-literal-characters* → [*binary-literal-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-literal-character) [*binary-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/binary-literal-characters) _opt_  
> *octal-literal* → **0o** [*octal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/octal-digit) [*octal-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/octal-literal-characters) _opt_  
> *octal-digit* → Digit 0 through 7  
> *octal-literal-character* → [*octal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/octal-digit) | **_**  
> *octal-literal-characters* → [*octal-literal-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/octal-literal-character) [*octal-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/octal-literal-characters) _opt_  
> *decimal-literal* → [*decimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digit) [*decimal-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal-characters) _opt_  
> *decimal-digit* → Digit 0 through 9  
> *decimal-digits* → [*decimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digit) [*decimal-digits*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digits) _opt_  
> *decimal-literal-character* → [*decimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-digit) | **_**  
> *decimal-literal-characters* → [*decimal-literal-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal-character) [*decimal-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal-characters) _opt_  
> *hexadecimal-literal* → **0x** [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal-characters) _opt_  
> *hexadecimal-digit* → Digit 0 through 9, a through f, or A through F  
> *hexadecimal-literal-character* → [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) | **_**  
> *hexadecimal-literal-characters* → [*hexadecimal-literal-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal-character) [*hexadecimal-literal-characters*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal-characters) _opt_  

<p></p>

>  (Grammar of a floating-point literal)  
> *floating-point-literal* → [*decimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal) [*decimal-fraction*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-fraction) _opt_ [*decimal-exponent*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-exponent) _opt_  
> *floating-point-literal* → [*hexadecimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal) [*hexadecimal-fraction*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-fraction) _opt_ [*hexadecimal-exponent*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-exponent)  
> *decimal-fraction* → **.** [*decimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal)  
> *decimal-exponent* → [*floating-point-e*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/floating-point-e) [*sign*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/sign) _opt_ [*decimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/decimal-literal)  
> *hexadecimal-fraction* → **.** [*hexadecimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal) _opt_  
> *hexadecimal-exponent* → [*floating-point-p*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/floating-point-p) [*sign*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/sign) _opt_ [*hexadecimal-literal*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-literal)  
> *floating-point-e* → **e** | **E**  
> *floating-point-p* → **p** | **P**  
> *sign* → **+** | **-**  

<p></p>

>  (Grammar of a string literal)  
> *string-literal* → **"** [*quoted-text*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/quoted-text) **"**  
> *quoted-text* → [*quoted-text-item*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/quoted-text-item) [*quoted-text*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/quoted-text) _opt_  
> *quoted-text-item* → [*escaped-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/escaped-character)  
> *quoted-text-item* → **\(** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) **)**  
> *quoted-text-item* → Any Unicode extended grapheme cluster except "­, \­, U+000A, or U+000D  
> *escaped-character* → **\0** | **\\** | **\t** | **\n** | **\r** | **\"** | **\'**  
> *escaped-character* → **\x** [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit)  
> *escaped-character* → **\u** [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit)  
> *escaped-character* → **\U** [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit) [*hexadecimal-digit*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/hexadecimal-digit)  

<p></p>

>  (Grammar of operators)  
> *operator* → [*operator-character*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator-character) [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator) _opt_  
> *operator-character* → **/** | **=** | **-** | **+** | **!** | **&#42;** | **%** | **<** | **>** | **&** | **|** | **^** | **~** | **.**  
> *binary-operator* → [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator)  
> *prefix-operator* → [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator)  
> *postfix-operator* → [*operator*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/operator)  

## 类型 (Types)

<p></p>

> 类型 (Grammar of a type)  
> *type* → [*array-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/array-type) | [*function-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/function-type) | [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) | [*tuple-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type) | [*optional-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/optional-type) | [*implicitly-unwrapped-optional-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/implicitly-unwrapped-optional-type) | [*protocol-composition-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-composition-type) | [*metatype-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/metatype-type)  

<p></p>

> 类型注解 (Grammar of a type annotation)  
> *type-annotation* → **:** [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

<p></p>

> 类型标识 (Grammar of a type identifier)  
> *type-identifier* → [*type-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-name) [*generic-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument-clause) _opt_ | [*type-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-name) [*generic-argument-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/swift/grammar/generic-argument-clause) _opt_ **.** [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier)  
> *type-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  

<p></p>

> 元组类型 (Grammar of a tuple type)  
> *tuple-type* → **(** [*tuple-type-body*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type-body) _opt_ **)**  
> *tuple-type-body* → [*tuple-type-element-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type-element-list) **...** _opt_  
> *tuple-type-element-list* → [*tuple-type-element*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type-element) | [*tuple-type-element*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type-element) **,** [*tuple-type-element-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/tuple-type-element-list)  
> *tuple-type-element* → [*attributes*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/swift/grammar/attributes) _opt_ **inout** _opt_ [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) | **inout** _opt_ [*element-name*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/element-name) [*type-annotation*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-annotation)  
> *element-name* → [*identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/swift/grammar/identifier)  

<p></p>

> 函数类型 (Grammar of a function type)  
> *function-type* → [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) **->** [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type)  

<p></p>

> 数组类型 (Grammar of an array type)  
> *array-type* → [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) **[** **]** | [*array-type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/array-type) **[** **]**  

<p></p>

> 可选类型 (Grammar of an optional type)  
> *optional-type* → [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) **?**  

<p></p>

> 隐式未封装可选类型 (Grammar of an implicitly unwrapped optional type)  
> *implicitly-unwrapped-optional-type* → [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) **!**  

<p></p>

>  (Grammar of a protocol composition type)  
> *protocol-composition-type* → **protocol** **<** [*protocol-identifier-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-identifier-list) _opt_ **>**  
> *protocol-identifier-list* → [*protocol-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-identifier) | [*protocol-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-identifier) **,** [*protocol-identifier-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/protocol-identifier-list)  
> *protocol-identifier* → [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier)  

<p></p>

> MetaType类型 (Grammar of a metatype type)  
> *metatype-type* → [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) **.** **Type** | [*type*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type) **.** **Protocol**  

<p></p>

>  (Grammar of a type inheritance clause)  
> *type-inheritance-clause* → **:** [*type-inheritance-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-list)  
> *type-inheritance-list* → [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) | [*type-identifier*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-identifier) **,** [*type-inheritance-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/swift/grammar/type-inheritance-list)