# Functions
# 函数

本页包含内容：
- [函数定义与调用（Defining and Calling Functions）](#Defining_and_Calling_Functions)
- [函数参数与返回值（Function Parameters and Return Values）](#Function_Parameters_and_Return_Values)
- [函数参数标签和参数名称 (Function Argument Labels and Parameter Names) ](#Function_Argument_Labels_and_Parameter_Names)
- [函数类型（Function Types）](#Function_Types)
- [嵌套函数（Nested Functions）](#Nested_Functions)


*Functions* are self-contained chunks of code that perform a specific task. You give a function a name that identifies what it does, and this name is used to “call” the function to perform its task when needed.
`函数` 是一段完成特定任务的独立代码片段。你可以通过给函数命名来标识某个函数的功能，这个名字可以被用来在需要的时候"调用"这个函数来完成它的任务。

Swift’s unified function syntax is flexible enough to express anything from a simple C-style function with no parameter names to a complex Objective-C-style method with names and argument labels for each parameter. Parameters can provide default values to simplify function calls and can be passed as in-out parameters, which modify a passed variable once the function has completed its execution.
Swift 统一的函数语法非常的灵活，可以用来表示任何函数，包括从最简单的没有参数名字的 C 风格函数，到复杂的带局部和外部参数名的 Objective-C 风格函数。参数可以提供默认值，以简化函数调用。参数也可以既当做传入参数，也当做传出参数，也就是说，一旦函数执行结束，传入的参数值将被修改。

Every function in Swift has a type, consisting of the function’s parameter types and return type. You can use this type like any other type in Swift, which makes it easy to pass functions as parameters to other functions, and to return functions from functions. Functions can also be written within other functions to encapsulate useful functionality within a nested function scope.
在 Swift 中，每个函数都有一个由函数的参数值类型和返回值类型组成的类型。你可以把函数类型当做任何其他普通变量类型一样处理，这样就可以更简单地把函数当做别的函数的参数，也可以从其他函数中返回函数。函数的定义可以写在其他函数定义中，这样可以在嵌套函数范围内实现功能封装。

<a name="Defining_and_Calling_Functions"></a>
## 函数的定义与调用 (Defining and Calling Functions)

When you define a function, you can optionally define one or more named, typed values that the function takes as input, known as *parameters*. You can also optionally define a type of value that the function will pass back as output when it is done, known as its *return* type.
当你定义一个函数时，你可以定义一个或多个有名字和类型的值，作为函数的输入（称为*参数*，*parameters*），也可以定义某种类型的值作为函数执行结束时的输出（称为*返回*类型，*return* type）。

Every function has a *function* name, which describes the task that the function performs. To use a function, you “call” that function with its name and pass it input values (known as *arguments*) that match the types of the function’s parameters. A function’s arguments must always be provided in the same order as the function’s parameter list.
每个函数有个函数名，用来描述函数执行的任务。要使用一个函数时，用函数名来“调用”这个函数，并传给它匹配的输入值（称作*实参*，*arguments*）。函数的实参必须与函数参数表里参数的顺序一致。


The function in the example below is called `greet(person:)`, because that’s what it does—it takes a person’s name as input and returns a greeting for that person. To accomplish this, you define one input parameter-a `String` value called `person`—and a return type of `String`, which will contain a greeting for that person:
下面例子中的函数的名字是`sayHello(_:)`，之所以叫这个名字,是因为这个函数用一个人的名字当做输入，并返回向这个人问候的语句。为了完成这个任务，你需要定义一个输入参数——一个叫做 `personName` 的 `String` 值，和一个包含给这个人问候语的 `String` 类型的返回值：


```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

All of this information is rolled up into the function’s *definition*, which is prefixed with the `func` keyword. You indicate the function’s return type with the *return* arrow `->` (a hyphen followed by a right angle bracket), which is followed by the name of the type to return.
所有的这些信息汇总起来成为函数的*定义*，并以 `func` 作为前缀。指定函数返回类型时，用返回箭头 ->（一个连字符后跟一个右尖括号）后跟返回类型的名称的方式来表示。

The definition describes what the function does, what it expects to receive, and what it returns when it is done. The definition makes it easy for the function to be called unambiguously from elsewhere in your code:
该定义描述了函数的功能，它期望接收什么作为参数和执行结束时它返回的结果是什么类型。这样的定义使得函数可以在别的地方以一种清晰的方式被调用：

```swift
print(greet(person: "Anna"))
// 打印 "Hello, Anna!"
print(greet(person: "Brian"))
// 打印 "Hello, Brian!"
```

You call the `greet(person:)` function by passing it a `String` value after the `person` argument label, such as `greet(person: "Anna")`. Because the function returns a `String` value, `greet(person:)` can be wrapped in a call to the `print(_:separator:terminator:)` function to print that string and see its return value, as shown above.
调用 `sayHello(_:)` 函数时，在圆括号中传给它一个 `String` 类型的实参，例如 `sayHello("Anna")`。正如上面所示，因为这个函数返回一个 `String` 类型的值，所以`sayHello` 可以被包含在 `print(_:separator:terminator:)` 的调用中，用来输出这个函数的返回值。

>NOTE
The `print(_:separator:terminator:)` function doesn’t have a label for its first argument, and its other arguments are optional because they have a default value. These variations on function syntax are discussed below in Function Argument Labels and Parameter Names and Default Parameter Values.

>注意
`print(_:separator:terminator:)` 函数的第一个参数并没有设置一个标签，而其他的参数因为已经有了默认值，因此是可选的。关于这些函数语法上的变化详见下方关于 函数参数标签和参数名 以及 默认参数值。


The body of the `greet(person:)` function starts by defining a new `String` constant called `greeting` and setting it to a simple greeting message. This greeting is then passed back out of the function using the `return` keyword. In the line of code that says `return greeting`, the function finishes its execution and returns the current value of `greeting`.
在 `sayHello(_:)` 的函数体中，先定义了一个新的名为 `greeting` 的 `String` 常量，同时，把对 `personName` 的问候消息赋值给了 `greeting` 。然后用 `return` 关键字把这个问候返回出去。一旦 `return greeting` 被调用，该函数结束它的执行并返回 `greeting` 的当前值。

You can call the `greet(person:)` function multiple times with different input values. The example above shows what happens if it is called with an input value of `"Anna"`, and an input value of `"Brian"`. The function returns a tailored greeting in each case.
你可以用不同的输入值多次调用 `sayHello(_:)`。上面的例子展示的是用`"Anna"`和`"Brian"`调用的结果，该函数分别返回了不同的结果。

To make the body of this function shorter, you can combine the message creation and the return statement into one line:
为了简化这个函数的定义，可以将问候消息的创建和返回写成一句：

```swift
func greetAgain(person: String) -> String {
    return "Hello again, " + person + "!"
}
print(greetAgain(person: "Anna"))
// 打印 "Hello again, Anna!"
```
<a name="Function_Parameters_and_Return_Values"></a>
## 函数参数与返回值 (Function Parameters and Return Values)

Function parameters and return values are extremely flexible in Swift. You can define anything from a simple utility function with a single unnamed parameter to a complex function with expressive parameter names and different parameter options.
函数参数与返回值在 Swift 中非常的灵活。你可以定义任何类型的函数，包括从只带一个未名参数的简单函数到复杂的带有表达性参数名和不同参数选项的复杂函数。

<a name="functions_without_parameters"></a>
### 无参数函数 (Functions Without Parameters)

Functions are not required to define input parameters. Here’s a function with no input parameters, which always returns the same `String` message whenever it is called:
函数可以没有参数。下面这个函数就是一个无参数函数，当被调用时，它返回固定的 `String` 消息：

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// 打印 "hello, world"
```

The function definition still needs parentheses after the function’s name, even though it does not take any parameters. The function name is also followed by an empty pair of parentheses when the function is called.
尽管这个函数没有参数，但是定义中在函数名后还是需要一对圆括号。当被调用时，也需要在函数名后写一对圆括号。

<a name="functions_with_multiple_parameters"></a>
### 多参数函数 (Functions With Multiple Parameters)

Functions can have multiple input parameters, which are written within the function’s parentheses, separated by commas.
函数可以有多种输入参数，这些参数被包含在函数的括号之中，以逗号分隔。

This function takes a person’s name and whether they have already been greeted as input, and returns an appropriate greeting for that person:
下面这个函数用一个人名和是否已经打过招呼作为输入，并返回对这个人的适当问候语:

```swift
func greet(person: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return greetAgain(person: person)
    } else {
        return greet(person: person)
    }
}
print(greet(person: "Tim", alreadyGreeted: true))
// 打印 "Hello again, Tim!"
```

You call the `greet(person:alreadyGreeted:)` function by passing it both a `String` argument value labeled person and a `Bool` argument value labeled `alreadyGreeted` in parentheses, separated by commas. Note that this function is distinct from the `greet(person:)` function shown in an earlier section. Although both functions have names that begin with `greet`, the `greet(person:alreadyGreeted:)` function takes two arguments but the `greet(person:)` function takes only one.

你可以通过在括号内使用逗号分隔来传递一个`String`参数值和一个标识为`alreadyGreeted`的`Bool`值，来调用`sayHello(_:alreadyGreeted:)`函数。注意这个函数和上面`greet(person:)`是不同的。虽然它们都有着同样的名字`greet`，但是`greet(person:alreadyGreeted:)`函数需要两个参数，而`greet(person:)`只需要一个参数。

<a name="functions_without_return_values"></a>
### 无返回值函数 (Functions Without Return Values)

Functions are not required to define a return type. Here’s a version of the `greet(person:)` function, which prints its own `String` value rather than returning it:
函数可以没有返回值。下面是 `sayHello(_:)` 函数的另一个版本，叫 `sayGoodbye(_:)`，这个函数直接打印一个`String`值，而不是返回它：

```swift
func greet(person: String) {
    print("Hello, \(person)!")
}
greet(person: "Dave")
// 打印 "Hello, Dave!"
```

Because it does not need to return a value, the function’s definition does not include the return arrow (->) or a return type.
因为这个函数不需要返回值，所以这个函数的定义中没有返回箭头（->）和返回类型。

>NOTE
Strictly speaking, this version of the `greet(person:)` function does still return a value, even though no return value is defined. Functions without a defined return type return a special value of type `Void`. This is simply an empty tuple, which is written as ().

>注意
严格上来说，虽然没有返回值被定义，`sayGoodbye(_:)` 函数依然返回了值。没有定义返回类型的函数会返回一个特殊的`Void`值。它其实是一个空的元组（tuple），没有任何元素，可以写成()。


The return value of a function can be ignored when it is called:
被调用时，一个函数的返回值可以被忽略：


```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.characters.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}
printAndCount(string: "hello, world")
// 打印 "hello, world" 并且返回值 12
printWithoutCounting(string: "hello, world")
// 打印 "hello, world" 但是没有返回任何值
```

The first function, `printAndCount(string:)`, prints a string, and then returns its character count as an `Int`. The second function, `printWithoutCounting(string:)`, calls the first function, but ignores its return value. When the second function is called, the message is still printed by the first function, but the returned value is not used.
第一个函数 `printAndCount(_:)`，输出一个字符串并返回 `Int` 类型的字符数。第二个函数 `printWithoutCounting`调用了第一个函数，但是忽略了它的返回值。当第二个函数被调用时，消息依然会由第一个函数输出，但是返回值不会被用到。

>NOTE
Return values can be ignored, but a function that says it will return a value must always do so. A function with a defined return type cannot allow control to fall out of the bottom of the function without returning a value, and attempting to do so will result in a compile-time error.

>注意
返回值可以被忽略，但定义了有返回值的函数必须返回一个值，如果在函数定义底部没有返回任何值，将导致编译时错误（compile-time error）。

<a name="functions_with_multiple_return_values"</a>
### 多重返回值函数 (Functions with Multiple Return Values)
You can use a tuple type as the return type for a function to return multiple values as part of one compound return value.
你可以用元组（tuple）类型让多个值作为一个复合值从函数中返回。

The example below defines a function called `minMax(array:)`, which finds the smallest and largest numbers in an array of `Int` values:
下例中定义了一个名为 `minMax(_:)` 的函数，作用是在一个 `Int` 类型的数组中找出最小值与最大值。

```swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

The `minMax(array:)` function returns a tuple containing two `Int` values. These values are labeled `min` and `max` so that they can be accessed by name when querying the function’s return value.
 `minMax(_:)` 函数返回一个包含两个 `Int` 值的元组，这些值被标记为 `min` 和 `max` ，以便查询函数的返回值时可以通过名字访问它们。

The body of the `minMax(array:)` function starts by setting two working variables called `currentMin` and `currentMax` to the value of the first integer in the array. The function then iterates over the remaining values in the array and checks each value to see if it is smaller or larger than the values of `currentMin` and `currentMax` respectively. Finally, the overall minimum and maximum values are returned as a tuple of two `Int` values.
在 `minMax(_:)` 的函数体中，在开始的时候设置两个工作变量 `currentMin` 和 `currentMax` 的值为数组中的第一个数。然后函数会遍历数组中剩余的值并检查该值是否比 `currentMin` 和 `currentMax` 更小或更大。最后数组中的最小值与最大值作为一个包含两个 `Int` 值的元组返回。

Because the tuple’s member values are named as part of the function’s return type, they can be accessed with dot syntax to retrieve the minimum and maximum found values:
因为元组的成员值已被命名，因此可以通过 `.` 语法来检索找到的最小值与最大值：

```swift
let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
// 打印 "min is -6 and max is 109"
```

Note that the tuple’s members do not need to be named at the point that the tuple is returned from the function, because their names are already specified as part of the function’s return type.
需要注意的是，元组的成员不需要在元组从函数中返回时命名，因为它们的名字已经在函数返回类型中指定了。

<a name="optional_tuple_return_types"</a>
### 可选元组返回类型 (Optional Tuple Return Types)

If the tuple type to be returned from a function has the potential to have “no value” for the entire tuple, you can use an `optional` tuple return type to reflect the fact that the entire tuple can be `nil`. You write an optional tuple return type by placing a question mark after the tuple type’s closing parenthesis, such as `(Int, Int)?` or `(String, Int, Bool)?`.

如果函数返回的元组类型有可能整个元组都“没有值”，你可以使用可选的（ `optional` ） 元组返回类型反映整个元组可以是`nil`的事实。你可以通过在元组类型的右括号后放置一个问号来定义一个可选元组，例如 `(Int, Int)?` 或 `(String, Int, Bool)?`

>NOTE
An optional tuple type such as `(Int, Int)?` is different from a tuple that contains optional types such as `(Int?, Int?)`. With an optional tuple type, the entire tuple is optional, not just each individual value within the tuple.

>注意
可选元组类型如 `(Int, Int)?` 与元组包含可选类型如 `(Int?, Int?)` 是不同的.可选的元组类型，整个元组是可选的，而不只是元组中的每个元素值。

The `minMax(array:)` function above returns a tuple containing two `Int` values. However, the function does not perform any safety checks on the array it is passed. If the array argument contains an empty array, the `minMax(array:)` function, as defined above, will trigger a runtime error when attempting to access `array[0]`.

前面的 `minMax(_:)` 函数返回了一个包含两个 `Int` 值的元组。但是函数不会对传入的数组执行任何安全检查，如果 `array` 参数是一个空数组，如上定义的 `minMax(_:)` 在试图访问 `array[0]` 时会触发一个运行时错误(runtime error)。

To handle an empty array safely, write the `minMax(array:)` function with an optional tuple return type and return a value of nil when the array is empty:
为了安全地处理这个“空数组”问题，将 `minMax(_:)` 函数改写为使用可选元组返回类型，并且当数组为空时返回 `nil`：


```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

You can use optional binding to check whether this version of the `minMax(array:)` function returns an actual tuple value or `nil`:
你可以使用可选绑定来检查 `minMax(_:)` 函数返回的是一个存在的元组值还是 `nil`：

```swift
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// 打印 "min is -6 and max is 109"
```

<a name="Function_Argument_Labels_and_Parameter_Names"></a>
## 函数参数标签和参数名称 (Function Argument Labels and Parameter Names)

Each function parameter has both an argument label and a parameter name. The argument label is used when calling the function; each argument is written in the function call with its argument label before it. The parameter name is used in the implementation of the function. By default, parameters use their parameter name as their argument label.
每个函数参数都有一个参数标签( argument label )以及一个参数名称( parameter name )。参数标签在调用函数的时候使用；调用的时候需要将函数的参数标签写在对应的参数前面。参数名称在函数的实现中使用。默认情况下，函数参数使用参数名称来作为它们的参数标签。

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(firstParameterName: 1, secondParameterName: 2)
```

All parameters must have unique names. Although it’s possible for multiple parameters to have the same argument label, unique argument labels help make your code more readable.
所有的参数都必须有一个独一无二的名字。虽然多个参数拥有同样的参数标签是可能的，但是一个唯一的函数标签能够使你的代码更具可读性。

<a name="specifying_argument_labels"></a>
### 参数标签 (Specifying Argument Labels)

You write an argument label before the parameter name, separated by a space:
你可以在函数名称前指定它的参数标签，中间以空格分隔：

```swift
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

Here’s a variation of the `greet(person:)` function that takes a person’s name and hometown and returns a greeting:
这个版本的 `greet(person:)` 函数，接收一个人的名字和他的故乡，并且返回一句问候：

```swift
func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)!  Glad you could visit from \(hometown)."
}
print(greet(person: "Bill", from: "Cupertino"))
// Prints "Hello Bill!  Glad you could visit from Cupertino."
```

The use of argument labels can allow a function to be called in an expressive, sentence-like manner, while still providing a function body that is readable and clear in intent.
参数标签的使用能够让一个函数在调用时更有表达力，更类似自然语言，并且仍保持了函数内部的可读性以及清晰的意图。

<a name="omitting_argument_labels"></a>
### 忽略参数标签(Omitting Argument Labels)

If you don’t want an argument label for a parameter, write an underscore (_) instead of an explicit argument label for that parameter.
如果你不希望为某个参数添加一个标签，可以使用一个下划线(`_`)来代替一个明确的参数标签。

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // In the function body, firstParameterName and secondParameterName
    // refer to the argument values for the first and second parameters.
}
someFunction(1, secondParameterName: 2)
```

If a parameter has an argument label, the argument must be labeled when you call the function.
如果一个参数有一个标签，那么在调用的时候必须使用标签来标记这个参数。

<a name="default_parameter_values"></a>
### 默认参数值 (Default Parameter Values)

You can define a default value for any parameter in a function by assigning a value to the parameter after that parameter’s type. If a default value is defined, you can omit that parameter when calling the function.
你可以在函数体中通过给参数赋值来为任意一个参数定义默认值（Deafult Values）。当默认值被定义后，调用这个函数时可以忽略这个参数。

```swift
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // If you omit the second argument when calling this function, then
    // the value of parameterWithDefault is 12 inside the function body.
}
someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
```

Place parameters that have don’t default values at the beginning of a function’s parameter list, before the parameters that have default values. Parameters that don’t have default values are usually more important to the function’s meaning—writing them first makes it easier to recognize that the same function is being called, regardless of whether any default parameters are omitted.
将不带有默认值的参数放在函数参数列表的最前。一般来说，没有默认值的参数更加的重要，这样可以保证在函数调用时，非默认参数的顺序是一致的，同时使得相同的函数在不同情况下调用时显得更为清晰。

<a name="variadic_parameters"></a>
### 可变参数 (Variadic Parameters)

A variadic parameter accepts zero or more values of a specified type. You use a variadic parameter to specify that the parameter can be passed a varying number of input values when the function is called. Write variadic parameters by inserting three period characters (`...`) after the parameter’s type name.
一个可变参数（variadic parameter）可以接受零个或多个值。函数调用时，你可以用可变参数来指定函数参数可以被传入不确定数量的输入值。通过在变量类型名后面加入（`...`）的方式来定义可变参数。

The values passed to a variadic parameter are made available within the function’s body as an array of the appropriate type. For example, a variadic parameter with a name of `numbers` and a type of `Double...` is made available within the function’s body as a constant array called `numbers` of type `[Double]`.
可变参数的传入值在函数体中变为此类型的一个数组。例如，一个叫做 `numbers` 的 `Double...` 型可变参数，在函数体内可以当做一个叫 `numbers` 的 `[Double]` 型的数组常量。

The example below calculates the *arithmetic mean* (also known as the *average*) for a list of numbers of any length:
下面的这个函数用来计算一组任意长度数字的 *算术平均数（arithmetic mean)*：

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// returns 3.0, which is the arithmetic mean of these five numbers
arithmeticMean(3, 8.25, 18.75)
// returns 10.0, which is the arithmetic mean of these three numbers
```

>NOTE
A function may have at most one variadic parameter.

>注意
一个函数最多只能拥有一个可变参数。

<a name="in_out_parameters"></a>
### 输入输出参数（In-Out Parameters）

Function parameters are constants by default. Trying to change the value of a function parameter from within the body of that function results in a compile-time error. This means that you can’t change the value of a parameter by mistake. If you want a function to modify a parameter’s value, and you want those changes to persist after the function call has ended, define that parameter as an *in-out* parameter instead.
函数参数默认是常量。试图在函数体中更改参数值将会导致编译错误(compile-time error)。这意味着你不能错误地更改参数值。如果你想要一个函数可以修改参数的值，并且想要在这些修改在函数调用结束后仍然存在，那么就应该把这个参数定义为输入输出参数（In-Out Parameters）。

You write an in-out parameter by placing the `inout` keyword right before a parameter’s type. An in-out parameter has a value that is passed in to the function, is modified by the function, and is passed back *out* of the function to replace the original value. For a detailed discussion of the behavior of in-out parameters and associated compiler optimizations, see In-Out Parameters.
定义一个输入输出参数时，在参数定义前加 `inout` 关键字。一个`输入输出参数`有传入函数的值，这个值被函数修改，然后被传出函数，替换原来的值。想获取更多的关于输入输出参数的细节和相关的编译器优化，请查看`输入输出参数`一节。

You can only pass a variable as the argument for an in-out parameter. You cannot pass a constant or a literal value as the argument, because constants and literals cannot be modified. You place an ampersand (`&`) directly before a variable’s name when you pass it as an argument to an in-out parameter, to indicate that it can be modified by the function.
你只能传递变量给输入输出参数。你不能传入常量或者字面量（literal value），因为这些量是不能被修改的。当传入的参数作为输入输出参数时，需要在参数名前加 `&` 符，表示这个值可以被函数修改。

>NOTE
In-out parameters cannot have default values, and variadic parameters cannot be marked as inout.

>注意
输入输出参数不能有默认值，而且可变参数不能用 `inout` 标记。

Here’s an example of a function called `swapTwoInts(_:_:)`, which has two in-out integer parameters called a and b:
下例中，`swapTwoInts(_:_:)` 函数有两个分别叫做 `a` 和 `b` 的输入输出参数：


```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

The `swapTwoInts(_:_:)` function simply swaps the value of `b` into `a`, and the value of `a` into `b`. The function performs this swap by storing the value of a in a temporary constant called `temporaryA`, assigning the value of `b` to `a`, and then assigning `temporaryA` to `b`.

`swapTwoInts(_:_:)` 函数简单地交换 `a` 与 `b` 的值。该函数先将 `a` 的值存到一个临时常量 `temporaryA` 中，然后将 `b` 的值赋给 `a`，最后将 `temporaryA` 赋值给 `b`。

You can call the `swapTwoInts(_:_:)` function with two variables of type Int to swap their values. Note that the names of someInt and `anotherInt` are prefixed with an ampersand when they are passed to the `swapTwoInts(_:_:)` function:

你可以用两个 `Int` 型的变量来调用 `swapTwoInts(_:_:)`。需要注意的是，`someInt` 和 `anotherInt` 在传入 `swapTwoInts(_:_:)` 函数前，都加了 `&` 的前缀：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3"
```

The example above shows that the original values of `someInt` and `anotherInt` are modified by the `swapTwoInts(_:_:)` function, even though they were originally defined outside of the function.

从上面这个例子中，我们可以看到 `someInt` 和 `anotherInt` 的原始值在 `swapTwoInts(_:_:)` 函数中被修改，尽管它们的定义在函数体外。

>NOTE
In-out parameters are not the same as returning a value from a function. The swapTwoInts example above does not define a return type or return a value, but it still modifies the values of someInt and anotherInt. In-out parameters are an alternative way for a function to have an effect outside of the scope of its function body.

>注意
输入输出参数和返回值是不一样的。上面的 `swapTwoInts` 函数并没有定义任何返回值，但仍然修改了 `someInt` 和 `anotherInt` 的值。输入输出参数是函数对函数体外产生影响的另一种方式。

<a name="Function_Types"></a>
## 函数类型 (Function Types)

Every function has a specific *function* type, made up of the parameter types and the return type of the function.
每个函数都有种特定的`函数`类型，函数的类型由函数的参数类型和返回类型组成。

For example:
例如：

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}
```

This example defines two simple mathematical functions called `addTwoInts` and `multiplyTwoInts`. These functions each take two `Int` values, and return an `Int` value, which is the result of performing an appropriate mathematical operation.
这个例子中定义了两个简单的数学函数：`addTwoInts` 和 `multiplyTwoInts`。这两个函数都接受两个 `Int` 值， 返回一个 `Int` 值。

The type of both of these functions is `(Int, Int) -> Int`. This can be read as: “A function type that has two parameters, both of type `Int`, and that returns a value of type `Int`.”
这两个函数的类型是 `(Int, Int) -> Int`，可以解读为“这个函数类型有两个 `Int` 型的参数并返回一个 `Int` 型的值。”。

Here’s another example, for a function with no parameters or return value:
下面是另一个例子，一个没有参数，也没有返回值的函数：

```swift
func printHelloWorld() {
    print("hello, world")
}
```

The type of this function is `() -> Void`, or “a function that has no parameters, and returns `Void`.”
这个函数的类型是：`() -> Void`，或者叫“没有参数，并返回 `Void` 类型的函数”。

<a name="using_function_types"></a>
### 使用函数类型 (Using Function Types)

You use function types just like any other types in Swift. For example, you can define a constant or variable to be of a function type and assign an appropriate function to that variable:
在 Swift 中，使用函数类型就像使用其他类型一样。例如，你可以定义一个类型为函数的常量或变量，并将适当的函数赋值给它：

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

This can be read as:
可以解读为：

“Define a variable called `mathFunction`, which has a type of ‘a function that takes two `Int` values, and returns an `Int` value.’ Set this new variable to refer to the function called `addTwoInts`.”
”定义一个叫做 `mathFunction` 的变量，类型是‘一个有两个 `Int` 型的参数并返回一个 `Int` 型的值的函数’，并让这个新变量指向 `addTwoInts` 函数”。

The `addTwoInts(_:_:)` function has the same type as the `mathFunction` variable, and so this assignment is allowed by Swift’s type-checker.
`addTwoInts` 和 `mathFunction` 有同样的类型，所以这个赋值过程在 Swift 类型检查(type-check)中是允许的。

You can now call the assigned function with the name `mathFunction`:
现在，你可以用 mathFunction 来调用被赋值的函数了：

```swift
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 5"
```

A different function with the same matching type can be assigned to the same variable, in the same way as for non-function types:
有相同匹配类型的不同函数可以被赋值给同一个变量，就像非函数类型的变量一样：


```swift
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 6"
```

As with any other type, you can leave it to Swift to infer the function type when you assign a function to a constant or variable:
就像其他类型一样，当赋值一个函数给常量或变量时，你可以让 Swift 来推断其函数类型：

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction 被推断为 (Int, Int) -> Int 类型
```
<a name="function_types_as_parameter_types"></a>
### 函数类型作为参数类型 (Function Types as Parameter Types)

You can use a function type such as `(Int, Int) -> Int` as a parameter type for another function. This enables you to leave some aspects of a function’s implementation for the function’s caller to provide when the function is called.
你可以用 `(Int, Int) -> Int` 这样的函数类型作为另一个函数的参数类型。这样你可以将函数的一部分实现留给函数的调用者来提供。

Here’s an example to print the results of the math functions from above:
下面是另一个例子，正如上面的函数一样，同样是输出某种数学运算结果：

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// 打印 "Result: 8"
```

This example defines a function called `printMathResult(_:_:_:)`, which has three parameters. The first parameter is called `mathFunction`, and is of type `(Int, Int) -> Int`. You can pass any function of that type as the argument for this first parameter. The second and third parameters are called `a` and `b`, and are both of type `Int`. These are used as the two input values for the provided math function.
这个例子定义了 `printMathResult(_:_:_:)` 函数，它有三个参数：第一个参数叫 `mathFunction`，类型是 `(Int, Int) -> Int`，你可以传入任何这种类型的函数；第二个和第三个参数叫 `a` 和 `b`，它们的类型都是 `Int`，这两个值作为已给出的函数的输入值。

When `printMathResult(_:_:_:)` is called, it is passed the `addTwoInts(_:_:)` function, and the integer values `3` and `5`. It calls the provided function with the values `3` and `5`, and prints the result of `8`.
当 `printMathResult(_:_:_:)` 被调用时，它被传入 `addTwoInts` 函数和整数 `3` 和 `5`。它用传入 `3` 和 `5` 调用 `addTwoInts`，并输出结果：`8`。

The role of `printMathResult(_:_:_:)` is to print the result of a call to a math function of an appropriate type. It doesn’t matter what that function’s implementation actually does—it matters only that the function is of the correct type. This enables `printMathResult(_:_:_:)` to hand off some of its functionality to the caller of the function in a type-safe way.
`printMathResult(_:_:_:)` 函数的作用就是输出另一个适当类型的数学函数的调用结果。它不关心传入函数是如何实现的，只关心传入的函数是不是一个正确的类型。这使得 `printMathResult(_:_:_:)` 能以一种类型安全（type-safe）的方式将一部分功能转给调用者实现。

<a name="function_types_as_return_types"></a>
### 函数类型作为返回类型 (Function Types as Return Types)

You can use a function type as the return type of another function. You do this by writing a complete function type immediately after the return arrow (->) of the returning function.
你可以用函数类型作为另一个函数的返回类型。你需要做的是在返回箭头（->）后写一个完整的函数类型。

The next example defines two simple functions called `stepForward(_:)` and `stepBackward(_:)`. The `stepForward(_:)` function returns a value one more than its input value, and the `stepBackward(_:)` function returns a value one less than its input value. Both functions have a type of `(Int) -> Int`:
下面的这个例子中定义了两个简单函数，分别是 `stepForward` 和 `stepBackward`。`stepForward`函数返回一个比输入值大 `1` 的值。`stepBackward` 函数返回一个比输入值小 `1` 的值。这两个函数的类型都是 `(Int) -> Int`：

```swift
func stepForward(_ input: Int) -> Int {
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    return input - 1
}
```

Here’s a function called `chooseStepFunction(backward:)`, whose return type is `(Int) -> Int`. The `chooseStepFunction(backward:)` function returns the `stepForward(_:)` function or the `stepBackward(_:)` function based on a `Boolean` parameter called `backward`:
如下名为 `chooseStepFunction(_:)` 的函数，它的返回类型是 `(Int) -> Int` 类型的函数。`chooseStepFunction(_:)` 根据布尔值 `backwards` 来返回 `stepForward(_:)` 函数或 `stepBackward(_:)` 函数：

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```

You can now use `chooseStepFunction(backward:)` to obtain a function that will step in one direction or the other:
你现在可以用 `chooseStepFunction(_:)` 来获得两个函数其中的一个：

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero 现在指向 stepBackward() 函数。
```

The preceding example determines whether a positive or negative step is needed to move a variable called `currentValue` progressively closer to zero. `currentValue` has an initial value of `3`, which means that `currentValue > 0` returns `true`, causing `chooseStepFunction(backward:)` to return the `stepBackward(_:)` function. A reference to the returned function is stored in a constant called `moveNearerToZero`.
上面这个例子中计算出从 `currentValue` 逐渐接近到0是需要向正数走还是向负数走。`currentValue` 的初始值是 `3`，这意味着 `currentValue > 0` 为真（true），这将使得 `chooseStepFunction(_:)` 返回 `stepBackward(_:)` 函数。一个指向返回的函数的引用保存在了 `moveNearerToZero` 常量中。

Now that `moveNearerToZero` refers to the correct function, it can be used to count to zero:
现在，moveNearerToZero 指向了正确的函数，它可以被用来数到零：


```swift
print("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// 3...
// 2...
// 1...
// zero!
```

<a name="Nested_Functions"></a>
## 嵌套函数 (Nested Functions)

All of the functions you have encountered so far in this chapter have been examples of *global* functions, which are defined at a *global* scope. You can also define functions inside the bodies of other functions, known as *nested functions*.
到目前为止本章中你所见到的所有函数都叫`全局`函数（global functions），它们定义在`全局域`中。你也可以把函数定义在别的函数体中，称作 `嵌套函数`（nested functions）。

Nested functions are hidden from the outside world by default, but can still be called and used by their enclosing function. An enclosing function can also return one of its nested functions to allow the nested function to be used in another scope.
默认情况下，嵌套函数是对外界不可见的，但是可以被它们的外围函数（enclosing function）调用。一个外围函数也可以返回它的某一个嵌套函数，使得这个函数可以在其他域中被使用。

You can rewrite the `chooseStepFunction(backward:)` example above to use and return nested functions:
你可以用返回嵌套函数的方式重写 `chooseStepFunction(_:)` 函数：

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero now refers to the nested stepForward() function
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// -4...
// -3...
// -2...
// -1...
// zero!
```
