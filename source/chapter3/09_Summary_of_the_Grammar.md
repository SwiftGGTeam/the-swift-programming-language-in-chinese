# 语法总结 (Summary of the Grammar)

## 语句

> 语句  
*statement* → [*expression*]() ; opt  
*statement* → [*declaration*]() ; opt  
*statement* → [*loop-statement*]() ; opt  
*statement* → [*branch-statement*]() ; opt  
*statement* → [*labeled-statement*]()  
*statement* → [*control-transfer-statement*]() ; opt  
*statements* → [*statement statement*]() opt

<p></p>

> 循环语句  
> *loop-statement* → [*for-statement*]()  
> *loop-statement* → [*for-in-statement*]()  
> *loop-statement* → [*while-statement*]()  
> *loop-statement* → [*do-while-statement*]()  

<p></p>

> for 循环  
> *for-statement* → **for** [*for-init*]() opt ; [*expression*]() opt ; [*expression*]() opt [*code-block*]()  
> *for-statement* → **for** ( [*for-init*]() opt ; [*expression*]() opt ; [*expression*]() opt ) [*code-block*]()  
> *for-init* → [*variable-declaration*]() | [*expression-list*]()   

<p></p>

> for-in 循环  
> *for-in-statement* → **for** [*pattern*]() **in** [*expression*]() [*code-block*]()  

<p></p>

> while 循环  
> *while-statement* → **while** [*while-condition*]() [*code-block*]()  
> *while-condition* → [*expression*]() | [*declaration*]()  

<p></p>

> do-while 循环  
> *do-while-statement* → **do** [*code-block*]() **while** [*while-condition*]()  

<p></p>

> 判断语句(Branch Statement)  
> *branch-statement* → [*if-statement*]()  
> *branch-statement* → [*switch-statement*]()  

<p></p>

> if 语句  
> *if-statement* → **if** [*if-condition*]() [*code-block*]() [*else-clause*]() opt  
> *if-condition* → [*expression*]() | [*declaration*]()  
> *else-clause* → **else** [*code-block*]() | **else** [*if-statement*]()  

