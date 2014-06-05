# 基础运算符

运算符是检查, 改变, 合并值的特殊符号或短语. 例如, 加号`+`把计算两个数的和(如 `let i = 1 + 2`). 复杂些的运行算包括逻辑与`&&`(如 `if enteredDoorCode && passedRetinaScan`), 还有自增运算符 `++i`, 这一个自身增加一的快捷操作.

Swift supports most standard C operators and improves several capabilities to eliminate common coding errors. The assignment operator (=) does not return a value, to prevent it from being mistakenly used when the equal to operator (==) is intended. Arithmetic operators (+, -, *, /, % and so forth) detect and disallow value overflow, to avoid unexpected results when working with numbers that become larger or smaller than the allowed value range of the type that stores them. You can opt in to value overflow behavior by using Swift’s overflow operators, as described in Overflow Operators.

Unlike C, Swift lets you perform remainder (%) calculations on floating-point numbers. Swift also provides two range operators (a..b and a...b) not found in C, as a shortcut for expressing a range of values.

This chapter describes the common operators in Swift. Advanced Operators[…]”

Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/cn/jEUH0.l