# 声明

一条声明可以在你的程序里引入新的名字和构造。举例来说，你可以使用声明来引入函数和方法，变量和常量，或者来定义
新的命名好的枚举，结构，类和协议类型。你也可以使用一条声明来延长一个已经存在的命名好的类型的行为。或者在你的
程序里引入在其他地方声明的符号。

在swift中，大多数声明在某种意义上讲也是执行或同事声明它们的初始化定义。这意味着，因为协议和他们的成员不匹配，
大多数协议成员需要单独的声明。为了方便起见，也因为这些区别在swift里不是很重要，声明语句同时包含了声明和定义。

    GRAMMAR OF A DECLARATION
    declaration → import-declaration­
    declaration → constant-declaration­
    declaration → variable-declaration­
    declaration → typealias-declaration­
    declaration → function-declaration­
    declaration → enum-declaration­
    declaration → struct-declaration­
    declaration → class-declaration­
    declaration → protocol-declaration­
    declaration → initializer-declaration­
    declaration → deinitializer-declaration­
    declaration → extension-declaration­
    declaration → subscript-declaration­
    declaration → operator-declaration­
    declarations → declaration­declarations­opt­
    declaration-specifiers → declaration-specifier­declaration-specifiers­opt­
    declaration-specifier → class­  mutating­  nonmutating­  override­  static­  unowned­ unowned(safe)­  unowned(unsafe)­     weak­

#模块范围

模块范围定义了对模块中其他源文件可见的代码。（注：待改进）在swift的源文件中，最高级别的代码由零个或多个语句，
声明和表达组成。变量，常量和其他的声明语句在一个源文件的最顶级被声明，使得他们对同一模块中的每个源文件都是可、
见的。

    GRAMMAR OF A TOP-LEVEL DECLARATION

    top-level-declaration → statements­opt


#代码块

代码块用来将一些声明和控制结构的语句组织在一起。它有如下的形式：

    {
        statements
    }


代码块中的语句包括声明，表达式和其他的在源代码中

