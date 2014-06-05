# 基础部分

Swift 是 iOS 和 OS X 应用开发的一门新语言。然而，如果你有 C 或者 Objective-C 开发经验的话，你会发现 Swift 的很多内容都是你熟悉的。

Swift 的类型是在 C 和 Objective-C 的基础上提出的，`Int`是整型；`Double`和`Float`是浮点型；`Bool`是布尔型；`String`是字符串。Swift 还有两个有用的集合类型，`Array`和`Dictionary`，详情参见`集合类型(待添加链接)`。

就像 C 语言一样，Swift 使用变量来进行存储并通过变量名来关联值。在 Swift 中，值不可变的变量有着广泛的应用，它们就是常量，而且比 C 语言的常量更强大。在 Swift 中，如果你要处理的值不需要改变，那使用常量可以让你的代码更加安全并且更好地表达你的意图。

除了我们熟悉的类型，Swift 还增加了 Objective-C 中没有的类型比如元组（Tuple）。元组可以让你创建或者传递一组数据，比如作为函数的返回值时，你可以用一个元组可以返回多个值。

Swift 还增加了可选（Optional）类型，用于处理值缺失的情况。可选表示“那儿有一个值，并且它等于 x ”或者“那儿没有值”。可选有点像在 Objective-C 中使用`nil`，但是它可以用在任何类型上，不仅仅是类。可选类型比 Objective-C 中的`nil`指针更加安全也更具表现力，它是 Swift 许多强大特性的重要组成部分。

Swift 是一个类型安全的语言，可选就是一个很好的例子。Swift 可以让你清楚地知道值的类型。如果你的代码期望得到一个`String`，类型安全会阻止你不小心传入一个`Int`。你可以在开发阶段尽早发现并修正错误。

## 常量和变量

常量和变量把一个名字（比如`maximumNumberOfLoginAttempts`或者`welcomeMessage`）和一个指定类型的值（比如数字`10`或者字符串`Hello`）关联起来。常量的值一旦设定就不能改变，而变量的值可以随意更改。

### 声明常量和变量

常量和变量必须在使用前声明，用`let`来声明常量，用`var`来声明变量。下面的例子展示了如何用常量和变量来记录用户尝试登录的次数：

    let maximumNumberOfLoginAttempts = 10
    var currentLoginAttempt = 0

这两行代码可以被理解为
：
“声明一个名字是`maximumNumberOfLoginAttempts`的新常量，并给它一个值`10`。然后，声明一个名字是`currentLoginAttempt`的变量并将它的值初始化为0.”

在这个例子中，允许的最大尝试登录次数被声明为一个常量，因为这个值不会改变。当前尝试登录次数被声明为一个变量，因为每次尝试登录失败的时候都需要增加这个值。

你可以在一行中声明多个常量或者多个变量，用逗号隔开：

    var x = 0.0, y = 0.0, z = 0.0

> 注意：如果你的代码中有不需要改变的值，请将它声明为常量。只将需要改变的值声明为变量。

### 类型标注

当你声明常量或者变量的时候可以加上类型标注，说明常量或者变量中要存储的值的类型。如果要添加类型标注，在常量或者变量名后面加上一个冒号和空格，然后加上类型名称。

这个例子给`welcomeMessage`变量添加了类型标注，表示这个变量可以存储`String`类型的值：

    var welcomeMessage: String

声明中的冒号代表着“是...类型”，所以这行代码可以被理解为：：

“声明一个类型为`String`，名字为`welcomeMessage`的变量。”

“类型为`String`”的意思是“可以存储任意`String`类型的值。”

`welcomeMessage`变量现在可以被设置成任意字符串：

    welcomeMessage = "Hello"

> 注意：一般来说你很少需要写类型标注。如果你在声明常量或者变量的时候赋了一个初始值，Swift可以推断出这个常量或者变量的类型，详情参见`类型安全和类型推断(待添加链接)`。在上面的例子中，没有给`welcomeMessage`赋初始值，所以添加了一个类型标注。

### 常量和变量的命名

你可以用任何你喜欢的字符作为常量和变量名，包括Unicode字符：

        let π = 3.14159
        let 你好 = "你好世界"
        let 🐶🐮 = "dogcow"

常量与变量名不能包含数学符号，箭头，保留的(或者非法的)Unicode码位，连线与制表符。尽管常量与变量名中可以包含数字，但是它们不能以数字打头。

一旦你将常量或者变量声明为确定的类型，你就不能使用相同的名字再次进行声明，或者以改变其存储的值为其他类型。同时，你也不能将常量与变量进行互转。

> 注意：如果你需要使用与Swift保留关键字相同的名称作为常量或者变量名，你可以使用反引号(`)将关键字围住的方式将其作为名字使用。无论如何，你应当避免使用关键字作为常量或变量名，除非你别无选择。

你可以更改现有的变量值为其他同类型的值，在下面的例子中，`friendlyWelcome`的值从`"Hello!"`改为了`"Bonjour!"`:

        var friendlyWelcome = "Hello!"
        friendlyWelcome = "Bonjour!"
        // friendlyWelcome is now "Bonjour!"

和变量不一样，常量的值一旦被确定以后就不能更改了。尝试这样做会在编译时报错：

        let languageName = "Swift"
        languageName = "Swift++"
        // this is a compile-time error - languageName cannot be changed
        
### 输出常量和变量

你可以用`println`函数来输出当前常量或变量的值:

        println(friendlyWelcome)
        // prints "Bonjour!"
        
`println`是一个用来输出的全局函数，输出的内容会在最后带换行。如果你用Xcode，`println`将会输出内容到“console”面板上。(另一种函数叫`print`，唯一区别是在输出内容最后不会加入换行。)

`println`函数输出传入的`String`值：

        println("This is a string")
        // prints "This is a string"

像Cocoa里的`NSLog`函数一样，`println`函数可以输出更复杂的信息。这些信息可以包含当前常量和变量的值。

Swift用字符串插值（string interpolation）的方式把常量名或者变量名当做占位符加入到长字符串中，Swift会用当前常量或变量的值替换这些占位符。将常量或变量名放入反斜杠符加一对圆括号中`"\()"`：

        println("The current value of friendlyWelcome is \(friendlyWelcome)")
        // prints "The current value of friendlyWelcome is Bonjour!
        
> 注意：字符串插值所有可用的选项在 字符串插值 这章中讲述。

### 注释
请将你的代码中的非执行文本注释成提示或者笔记以方便你将来阅读。Swift 的编译器将会在编译代码时自动忽略掉注释部分。

Swift 中的注释与C 语言的注释非常相似。单行注释以双正斜杠作(//)为起始标记:

	// this is a comment

你也可以进行多行注释，其起始标记为单个正斜杠后跟随一个星号(/\*)，终止标记为一个星号后跟随单个正斜杠(\*/):

	/* this is also a comment,
	but written over multiple lines */
	
与C 语言多行注释不同的是，Swift 的多行注释可以嵌套在其它的多行注释之中。你可以先生成一个多行注释块，然后在这个注释块之中再嵌套成第二个多行注释。终止注释时先插入第二个注释块的终止标记，然后再插入第一个注释块的终止标记：
	
	/* this is the start of the first multiline comment
	/* this is the second, nested multiline comment */
	this is the end of the first multiline comment */

通过运用嵌套多行注释，你可以快速方便的注释掉一大段代码，即使这段代码之中已经含有了多行注释块。

## 分号
与其他大部分编程语言不同，Swift 并不强制要求你在每条语句的结尾处使用分号(;)，当然，你也可以按照你自己的习惯添加分号。有一种情况下必须要用分号，即你打算在同一行内写多条独立的语句:

	let cat = "🐱"; println(cat)
	// prints "🐱"
