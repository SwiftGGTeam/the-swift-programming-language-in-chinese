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
变量和属性，存储变量和属性监视，和静态变量属性，有着不同的声明形式。（待改进）
所使用的声明形式取决于变量所声明的范围和你打算声明的变量类型。

    NOTE

    You can also declare properties in the context of a protocol declaration, as described in Protocol Property Declaration.
 
###存储型变量和存储型属性

下面的形式声明了一个存储型变量或存储型变量属性

    var variable name: type = expression

你可以在全局，函数内，或者在类和结构体的声明(context)中使用这种形式来声明一个变量。当变量以这种形式
在全局或者一个函数内被声明时，它代表一个存储型变量。当他在类或者结构体中被声明时，他代表一个存储型变量属性。

构造函数表达式可以被

和常量声明相比，如果变量名是一个元祖类型，元祖的每一项的名字都要和初始化表达式一致。

正如名字一样，存储型变量的值或存储型变量属性存储在内存中。

###计算型变量和计算型属性

如下形式声明一个一个存储型变量或存储型属性：

    var variable name: type {
    get {
        statements
    }
    set(setter name) {
        statements
    }
    }

你可以在全局，函数体内或者类，结构体，枚举，扩展声明的上下文中使用这种形式的声明。
当变量以这种形式在全局或者一个函数内被声明时，它代表一个计算型变量。当他在类，结构体，枚举，扩展声明的上下文
中中被声明时，他代表一个计算型变量属性。

getter用来读取变量值，setter用来写入变量值。setter子句是可选择的，只有getter是必需的，你可以将这些语句
都省略，只是简单的直接返回请求值，正如在只读计算属性(read-only computed properites)中描述的那样。
但是如果你提供了一个setter语句，你也必需提供一个getter语句。

setter的名字和圆括号内的语句是可选的。如果你写了一个setter名，它就会作为setter的参数被使用。如果你不写setter名，
setter的初始名为newValue，正如在seter声明速记(shorthand setter declaration)中提到的那样。

不像存储型变量和存储型属性那样，计算型属性和计算型变量的值不存储在内存中。

获得更多信息，查看更多关于计算型属性的例子，请查看计算型属性(computed properties)一节。

###存储型变量监视器和属性监视器

你可以用willset和didset监视器来声明一个存储型变量或属性。一个包含监视器的存储型变量或属性按如下的形式声明：

    var variable name: type = expression {
    willSet(setter name) {
        statements
    }
    didSet(setter name {
        statements
    }
    }

你可以在全局，函数体内或者类，结构体，枚举，扩展声明的上下文中使用这种形式的声明。
当变量以这种形式在全局或者一个函数内被声明时，监视器代表一个存储型变量监视器；
当他在类，结构体，枚举，扩展声明的上下文中被声明时，监视器代表属性监视器。

你可以为适合的监视器添加任何存储型属性。你也可以通过重写子类属性的方式为适合的监视器添加任何继承的属性
(无论是存储型还是计算型的)，参见重写属性监视器(overriding properyt observers)。

初始化表达式在类或者结构体的声明中是可选的，但是在其他地方是必需的。无论在什么地方声明，
所有包含监视器的变量声明都必须有类型注释(type annotation)。

当变量或属性的值被改变时，willset和didset监视器提供了一个监视方法（适当的回应）。
监视器不会在变量或属性第一次初始化时不会被运行，他们只有在值被外部初始化语句改变时才会被运行。

willset监视器只有在变量或属性值被改变之前运行。新的值作为一个常量经过过willset监视器，因此不可以在
willset语句中改变它。didset监视器在变量或属性值被改变后立即运行。和willset监视器相反，为了以防止你仍然
需要获得旧的数据，旧变量值或者属性会经过didset监视器。这意味着，如果你在变量或属性自身的didiset监视器语句
中设置了一个值，你设置的新值会取代刚刚在willset监视器中经过的那个值。

在willset和didset语句中，setter名和圆括号的语句是可选的。如果你写了一个setter名，它就会作为willset和didset的参数被使用。如果你不写setter名，
willset监视器初始名为newvalue，didset监视器初始名为oldvalue。

当你提供一个willset语句时，didset语句是可选的。同样的，在你提供了一个didset语句时，willset语句是可选的。

获得更多信息，查看如何使用属性监视器的例子，请查看属性监视器(prpperty observers)一节。

###类和静态变量属性

class关键字用来声明类的计算型属性。static关键字用来声明类的静态变量属性。类和静态变量在类型属性(type properties)中有详细讨论。

    GRAMMAR OF A VARIABLE DECLARATION

    variable-declaration → variable-declaration-head­pattern-initializer-list­
    variable-declaration → variable-declaration-head­variable-name­type-annotation­code-block­
    variable-declaration → variable-declaration-head­variable-name­type-annotation­getter-setter-block­
    variable-declaration → variable-declaration-head­variable-name­type-annotation­getter-setter-keyword-block­
    variable-declaration → variable-declaration-head­variable-name­type-annotation­initializer­opt­willSet-didSet-block­
    variable-declaration-head → attributes­opt­declaration-specifiers­opt­var­
    variable-name → identifier­
    getter-setter-block → {­getter-clause­setter-clause­opt­}­
    getter-setter-block → {­setter-clause­getter-clause­}­
    getter-clause → attributes­opt­get­code-block­
    setter-clause → attributes­opt­set­setter-name­opt­code-block­
    setter-name → (­identifier­)­
    getter-setter-keyword-block → {­getter-keyword-clause­setter-keyword-clause­opt­}­
    getter-setter-keyword-block → {­setter-keyword-clause­getter-keyword-clause­}­
    getter-keyword-clause → attributes­opt­get­
    setter-keyword-clause → attributes­opt­set­
    willSet-didSet-block → {­willSet-clause­didSet-clause­opt­}­
    willSet-didSet-block → {­didSet-clause­willSet-clause­}­
    willSet-clause → attributes­opt­willSet­setter-name­opt­code-block­
    didSet-clause → attributes­opt­didSet­setter-name­opt­code-block­

#类型的别名声明




