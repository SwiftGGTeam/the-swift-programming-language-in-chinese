#扩展（Extensions）

----

本页包含内容：

-   扩展语法（Extension Syntax）
-   计算属性（Computed Properties）
-   构造器（Initializers）
-   方法（Methods）
-   下标（Subscripts）
-   嵌套类型（Nested Types）

*扩展*就是向一个已存在的类、结构体或枚举类型添加新功能（functionality）。这包括在没有权限获取原始源代码的情况下扩展类型的能力（即*逆向建模*）。扩展和Objective-C中的分类(categories)类似。（不过与Objective-C不同的是，Swift的扩展没有名字。）

Swift中的扩展可以：

-   添加计算属性和计算静态属性
-   定义实例方法和类型方法
-   提供新的构造器
-   定义下标
-   定义和使用新的嵌套类型
-   使一个已存在的类型符合某个接口

注意

如果你定义了一个扩展向一个已存在的类型添加新功能，那么这个新功能对该类型的所有已存在实例中都是可用的，即使它们是在你的这个扩展之前定义的。



