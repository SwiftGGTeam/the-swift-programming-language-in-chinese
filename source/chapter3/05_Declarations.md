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
    declaration-specifier → class­  mutating­  nonmutating­  override­  static­  unowned­ unowned(safe)­  unowned(unsafe)­  weak­

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

代码块中的语句包括声明，表达式和各种其他类型的语句，它们按照在源码中的出现顺序被依次执行。

    GRAMMAR OF A CODE BLOCK

    code-block → {­statements­opt­}­

#引入声明

引入声明使你可以使用在其他文件中声明的内容。引入语句的基本形式是引入整个代码模块；它由import关键字开始，后面
紧跟一个模块名：
    
    import module

你可以提供更多的细节来限制引入的符号，如声明一个特殊的子模块或者在一个模块或子模块中做特殊的声明。（待改进）
当你使用了这些细节后，在当前的程序汇总只有引入的符号是可用的（并不是声明的整个模块）。

    mport import kind module.symbol name
    import module.submodule

    GRAMMAR OF AN IMPORT DECLARATION

    import-declaration → attributes­opt­import­import-kind­opt­import-path­
    import-path → import-path-identifier­  import-path-identifier­.­import-path­
    import-path-identifier → identifier­  operator­

#常量声明

常量声明可以在你的程序里命名一个常量。常量以关键词let来声明，遵循如下的格式:

    let constant name: type = expression

当常量的值被给定后，常量就将常量名称和表达式初始值不变的结合在了一起，而且不能更改。
这意味着如果常量以类的形式被初始化，类本身的内容是可以改变的，但是常量和类之间的结合关系是不能改变的。
当一个常量被声明为全局变量，它必须被给定一个初始值。当一个常量在类或者结构体中被声明时，他被认为是一个常量
属性。常量并不是可计算的属性，因此不包含getters和setters。（译者注：getters和setters不知道怎么翻译，待改进）

如果常量名是一个元祖形式，元祖中的每一项初始化表达式中都要有对应的值

    let (firstNumber, secondNumber) = (10, 42)

在上例中，firstNumber是一个值为10的常量，secnodeName是一个值为42的常量。所有常量都可以独立的使用：

    1  println("The first number is \(firstNumber).")
    2  // prints "The first number is 10."
    3  println("The second number is \(secondNumber).")
    4  // prints "The second number is 42."

类型注释（:type）在常量声明中是一个可选项，它可以用来描述在类型接口（type inference）中找到的类型。

声明一个静态常量要使用关键字static。静态属性在类型属性（type propetries）中有介绍。

如果还想获得更多关于常量的信息或者想在使用中获得帮助，请查看常量和变量（constants and variables）,
存储属性（stored properties）等节。

    GRAMMAR OF A CONSTANT DECLARATION

    constant-declaration → attributes­opt­declaration-specifiers­opt­let­pattern-initializer-list­
    pattern-initializer-list → pattern-initializer­  pattern-initializer­,­pattern-initializer-list­
    pattern-initializer → pattern­initializer­opt­
    initializer → =­expression

#变量声明

变量声明可以在你的程序里声明一个变量，它以关键字var来声明。根据声明变量类型和值的不同，如存储和计算
变量和属性，存储变量和属性观察，和静态变量属性，有着不同的声明形式。（待改进）
所使用的声明形式取决于变量所声明的范围和你打算声明的变量类型。

    NOTE

    You can also declare properties in the context of a protocol declaration, as described in Protocol Property Declaration.
 


