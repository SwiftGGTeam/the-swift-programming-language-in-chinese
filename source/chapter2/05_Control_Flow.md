#控制流

Swift 提供了所有C系语言下常见的控制流结构。包括能够运行多次任务的 `for` 和 `while` 循环，不同条件下运行不同代码分支的 `if` 和 `switch` 语句，还有改变代码运行位置的 `break` 和 `continue` 语句。

除了C里面传统的 for 条件递增循环，Swift 还增加了 for-in 循环，用来更简单地遍历数组(array)，字典(dictionary)，范围（range），字符串（string）和其他序列类型。

Swift 的 `switch` 语句比 C 语言中更加强大。在 C 语言中，如果某个 case 不小心漏写了 `break`，这个 case 就会“掉到”下一个 case，在 Swift 中不会发生这种情况。Case 可以匹配很多不同的类型模式，包括范围（range）匹配，元组（tuple）和特定类型的描述。`switch` case 语句中匹配的值可以是由 case 体内部临时的常量或者变量决定，也可以由 `where` 分句表示的更复杂的匹配条件。

###For 循环
`for` 循环用来以指定次数执行一系列语句。Swift 提供两种 `for` 循环：

* for-in 用来遍历一个范围(range)，队列(sequence)，集合(collection)，系列(progression)里面所有的元素执行一系列语句。
* for 条件递增语句，用来重复执行一系列语句直到特定条件达成，一般会使用一个计数器递增直到循环结束来实现。


###For-In
你可以使用 `for-in` 循环来遍历一个集合里面的所有元素，例如一个数字表示的范围、数组中的元素、字符串中的字符。

下面的例子用来输出乘5乘法表前面一部分内容：

```
for index in 1...5 {
    println("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

例子中用来进行遍历的元素是一组使用闭区间操作符(...)表示的从1到5闭区间数字。`index` 被赋值为闭区间范围中的第一个数字（1），然后循环中的语句被执行一次。在这个例中，这个循环只包含一个语句，用来输出当前 `index` 值所对应的乘5乘法表结果。该语句执行后，`index` 的值被更新为闭区间范围中的第二个数字（2），之后 `println` 方法会再执行一次。整个过程会进行到闭区间范围结束为止。

上面的例子中，`index` 是一个每次循环遍历开始时被自动赋值的常量。这种情况下，`index` 在使用前不需要声明，只需要将它包含在循环的声明中，就可以对其进行隐式声明，而无需使用 `let` 声明关键字。

```
注意：

index 常量只存在于循环的生命周期里。如果你想在循环完成后访问 index 的值，又或者想让 index 成为一个变量而不是常量，你必须在循环之前自己进行声明。

```

如果你不需要知道范围内每一个项的值，你可以使用下划线（_）替代变量名来忽略对值的访问：

```
let base = 3
let power = 10
var answer = 1
for _ in 1...power {
    answer *= base
}
println("\(base) to the power of \(power) is \(answer)")
// prints "3 to the power of 10 is 59049
```
这个例子计算 base 这个数的 power 次幂（本例中，是 3 的 10 次幂），从 1 开始做 3 的乘法（3 的 0 次幂）， 进行 10 次，使用 0 到 9 的半闭区间循环。这个计算并不需要知道每一次循环中计数器具体的值，只需要执行了正确的循环次数即可。下划线符号 _ （替代循环中的变量）能够忽略具体的值，并且不提供循环遍历时对值的访问。

使用 `for-in` 遍历一个数组所有元素：

```
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    println("Hello, \(name)!")
}
// Hello, Anna!
// Hello, Alex!
// Hello, Brian!
// Hello, Jack!
```
你也可以通过遍历一个字典来访问它的键值对(key-value pairs)。遍历字典时，字典的每项元素会以 （key, value）元组的形式返回，你可以在 `for-in` 循环中使用显式的常量名称来解读 （key, value）元组。下面的例子中，字典的键(key)解读为 `animalName` 常量，字典的值会被解读为 `legCount` 常量：

```
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    println("\(animalName)s have \(legCount) legs")
}
// spiders have 8 legs
// ants have 6 legs
// cats have 4 legs
```
字典元素的遍历顺序和插入顺序可能不同，字典的内容在内部是无序的，所以遍历元素时不能保证顺序。更多数组和字典相关内容，查看[集合类型章节](http://TODO_Link)。

除了数组和字典，你也可以使用 `for-in` 循环来遍历字符串中的字符：

```
for character in "Hello" {
    println(character)
}
// H
// e
// l
// l
// o
```
###For条件递增

除了 `for-in` 循环，Swift 提供使用条件判断和递增方法的标准C样式 `for` 循环:

```
for var index = 0; index < 3; ++index {
    println("index is \(index)")
}
// index is 0
// index is 1
// index is 2
```
下面是普遍情况下这种循环方式的格式：

```
for initialization; condition; increment {
    statements
}
```

和 C 语言中一样，分号将循环的定义分为 3 个部分，不同的是，Swift 不像 C 语言，不需要使用圆括号将“initialization; condition; increment”包括起来。

这个循环执行流程如下：


1. 循环首次启动时，初始化表达式(_initialization expression_)被调用一次，用来设置循环所需的所有常量和变量。
2. 条件表达式(_condition expression_)被调用。如果表达式调用结果为 `false`，循环结束，继续执行 `for` 循环关闭大括号(})之后的代码。如果表达式调用结果为 `true`，会执行大括号内部的代码（statements）。
3. 执行所有语句（statements）之后，执行递增表达式(_increment expressio_)。通常会增加或减少计数器的值，或者根据语句（statements）输出来修改某一个初始化的变量。当递增表达式运行完成后，重复执行第2步，条件表达式再次执行。

上述描述和循环格式等同于：

```
initialization
while condition {
    statements
    increment
}
```

在初始化表达式中声明的常量和变量(比如 var index = 0)只在 `for` 循环的生命周期里有效。如果想在循环结束后访问 index 的值，你必须要在循环生命周期开始前声明 index。

```
var index: Int
for index = 0; index < 3; ++index {
    println("index is \(index)")
}
// index is 0
// index is 1
// index is 2
println("The loop statements were executed \(index) times")
// prints "The loop statements were executed 3 times
```
注意 `index` 在循环结束后最终的值是 3 而不是 2。最后一次调用递增表达式 `++index` 会将 `index` 设置为 3，从而导致 `index < 3` 条件为 `false`，并终止循环管。

###While 循环

