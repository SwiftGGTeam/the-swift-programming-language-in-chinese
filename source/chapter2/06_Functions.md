# 函数（Functions）

函数是用来完成特定任务的独立的代码块。你给一个函数起一个合适的名字，用来标示函数做什么，并且当函数需要执行的时候，这个名字会被“调用”。

Swift统一的函数语法足够灵活，可以用来表示任何函数，包括从最简单的没有参数名字的C风格函数，到复杂的带局部和外部参数名的Objective-C风格函数。参数可以提供默认值，以简化函数调用。参数也可以即当做传入参数，也当做传出参数，也就是说，一旦函数执行结束，传入的参数值可以被修改。

在Swift中，每个函数都有一种类型，包括函数的参数值类型和返回值类型。你可以把函数类型当做任何其他普通变量类型一样处理，这样就可以更简单地把函数当做别的函数的参数，也可以从其他函数中返回函数。函数的定义可以写在在其他函数定义中，这样可以在嵌套函数范围内实现功能封装。

## 函数的定义与调用

当你定义一个函数时，你可以定义一个或多个有名字和类型的值，作为函数的输入（称为参数，parameters），也可以定义某种类型的值作为函数执行结束的输出（称为返回类型）。

每个函数有个函数名，用来描述函数执行的任务。要使用一个函数时，你用函数名“调用”，并传给它匹配的输入值（称作实参，arguments）。一个函数的实参必须与函数参数表里参数的顺序一致。

在下面例子中的函数叫做`"greetingForPerson"`，之所以叫这个名字是因为这个函数用一个人的名字当做输入，并返回给这个人的问候语。为了完成这个任务，你定义一个输入参数-一个叫做`personName`的`String`值，和一个包含给这个人问候语的`String`类型的返回值：

            func sayHello(personName: String) -> String {
                let greeting = "Hello, " + personName + "!"
                return greeting
            }

所有的这些信息汇总起来成为函数的定义，并以`func`作为前缀。指定函数返回类型时，用返回箭头`->`（一个连字符后跟一个右尖括号）后跟返回类型的名称的方式来表示。

该定义描述了函数做什么，它期望接收什么和执行结束时它返回的结果是什么。这样的定义使的函数可以在别的地方以一种清晰的方式被调用：

            println(sayHello("Anna"))
            // prints "Hello, Anna!"
            println(sayHello("Brian"))
            // prints "Hello, Brian!
            
调用`sayHello`函数时，在圆括号中传给它一个`String`类型的实参。因为这个函数返回一个`String`类型的值，`sayHello`可以被包含在`println`的调用中，用来输出这个函数的返回值，正如上面所示。

在`sayHello`的函数体中，先定义了一个新的名为`greeting`的`String`常量，同时赋值了给`personName`的一个简单问候消息。然后用`return`关键字把这个问候返回出去。一旦`return greeting`被调用，该函数结束它的执行并返回`greeting`的当前值。

你可以用不同的输入值多次调用`sayHello`。上面的例子展示的是用`"Anna"`和`"Brian"`调用的结果，该函数分别返回了不同的结果。

为了简化这个函数的定义，可以将问候消息的创建和返回写成一句：

            func sayHelloAgain(personName: String) -> String {
                return "Hello again, " + personName + "!"
            }
            println(sayHelloAgain("Anna"))
            // prints "Hello again, Anna!

## 函数参数与返回值

函数参数与返回值在Swift中极为灵活。你可以定义任何类型的函数，包括从只带一个未名参数的简单函数到复杂的带有表达性参数名和不同参数选项的复杂函数。

### 多重输入参数

函数可以有多个输入参数，写在圆括号中，用逗号分隔。

下面这个函数用一个半开区间的开始点和结束点，计算出这个范围内包含多少数字：

			func halfOpenRangeLength(start: Int, end: Int) -> Int {
    			return end - start
			}
			println(halfOpenRangeLength(1, 10))
			// prints "9
			
### 无参函数

函数可以没有参数。下面这个函数就是一个无参函数，当被调用时，它返回固定的`String`消息：

			func sayHelloWorld() -> String {
  			  return "hello, world"
			}
			println(sayHelloWorld())
			// prints "hello, world

尽管这个函数没有参数，但是定义中在函数名后还是需要一对圆括号。当被调用时，也需要在函数名后写一对圆括号。

### 无返回值函数

函数可以没有返回值。下面是`sayHello`函数的另一个版本，叫`waveGoodbye`，这个函数直接输出`String`值，而不是返回它：

			func sayGoodbye(personName: String) {
    			println("Goodbye, \(personName)!")
			}
			sayGoodbye("Dave")
			// prints "Goodbye, Dave!

因为这个函数不需要返回值，所以这个函数的定义中没有返回箭头（->）和返回类型。

> 注意：
> 严格上来说，虽然没有返回值被定义，`sayGoodbye`函数依然返回了值。没有定义返回类型的函数会返回特殊的值，叫`Void`。它其实是一个空的元组（tuple），没有任何元素，可以写成`()`。

被调用时，一个函数的返回值可以被忽略：

			func printAndCount(stringToPrint: String) -> Int {
    			println(stringToPrint)
    			return countElements(stringToPrint)
			}
			func printWithoutCounting(stringToPrint: String) {
    			printAndCount(stringToPrint)
			}
			printAndCount("hello, world")
			// prints "hello, world" and returns a value of 12
			printWithoutCounting("hello, world")
			// prints "hello, world" but does not return a value
			
第一个函数`printAndCount`，输出一个字符串并返回`Int`类型的字符数。第二个函数`printWithoutCounting`调用了第一个函数，但是忽略了它的返回值。当第二个函数被调用时，消息依然会由第一个函数输出，但是返回值不会被用到。

> 注意：
> 返回值可以被忽略，但定义了有返回值的函数必须返回一个值，如果在函数定义底部没有返回任何值，这叫导致编译错误（compile-time error）。

### 多重返回值函数

你可以用元组（tuple）类型让多个值作为一个复合值从函数中返回。

下面的这个例子中，`count`函数用来计算一个字符串中元音，辅音和其他字母的个数（基于美式英语的标准）。

			func count(string: String) -> (vowels: Int, consonants: Int, others: Int) {
    			var vowels = 0, consonants = 0, others = 0
    			for character in string {
        			switch String(character).lowercaseString {
        			case "a", "e", "i", "o", "u":
           				++vowels
        			case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
        			"n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
            			++consonants
        			default:
            			++others
        			}
    			}
    			return (vowels, consonants, others)
			}
			
你可以用`count`函数来处理任何一个字符串，返回的值将是一个包含三个`Int`型值的元组（tuple）：

			let total = count("some arbitrary string!")
			println("\(total.vowels) vowels and \(total.consonants) consonants")
			// prints "6 vowels and 13 consonants
			
需要注意的是，元组的成员不需要在函数中返回时命名，因为它们的名字已经在函数返回类型有有了定义。

## 函数参数名

以上所有的函数都给它们的参数定义了`参数名（parameter name）`：

			func someFunction(parameterName: Int) {
    			// function body goes here, and can use parameterName
    			// to refer to the argument value for that parameter
			}

但是，这些参数名仅在函数体中使用，不能在函数调用时使用。这种类型的参数名被称作`本地参数名（local parameter name）`，因为它们只能在函数体中使用。

### 外部参数名

有时候，调用函数时，给每个参数命名是非常有用的，因为这些参数名可以指出各个实参的用途是什么。

