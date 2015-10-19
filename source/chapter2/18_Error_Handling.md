# 错误处理（Error Handling）
-----------------

> 2.0
> 翻译+校对：[lyojo](https://github.com/lyojo)

错误处理是响应错误以及从错误中返回的过程。swift提供第一类错误支持，包括在运行时抛出，捕获，传送和控制可回收错误。

一些函数和方法不能总保证能够执行所有代码或产生有用的输出。可空类型用来表示值可能为空，但是当函数执行失败的时候，可空通常可以用来确定执行失败的原因，因此代码可以正确地响应失败。在Swift中，这叫做抛出函数或者抛出方法。

举个例子，考虑到一个从磁盘上的一个文件读取以及处理数据的任务，有几种情况可能会导致这个任务失败，包括指定路径的文件不存在，文件不具有可读属性，或者文件没有被编码成合适的格式。区分这些错误可以让程序解决并且修复这些错误，并且，如果可能的话，把这些错误报告给用户。

>
注意：
Swift中的错误处理涉及到错误处理样式，这会用到Cocoa中的NSError和Objective-C。更多信息请参见：[Using Swift with Cocoa and Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)中的[错误处理](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/AdoptingCocoaDesignPatterns.html#//apple_ref/doc/uid/TP40014216-CH7-ID10)。

###错误的表示：
在Swift中，错误用符合`ErrorType`协议的值表示。
Swift枚举特别适合把一系列相关的错误组合在一起，同时可以把一些相关的值和错误关联在一起。因此编译器会为实现`ErrorType`协议的Swift枚举类型自动实现相应合成。

比如说，你可以这样表示操作自动贩卖机会出现的错误：

```swift
enum VendingMachineError: ErrorType {
	case InvalidSelection
	case InsufficientFunds(required: Double)
	case OutOfStock
}
```

在这种情况下，自动贩卖机可能会因为以下原因失败：
请求的物品不存在，用`InvalidSelection`表示。
请求的物品的价格高于已投入金额，用`InsufficientFunds`表示。相关的双精度值表示还需要多少钱来完成此次交易。
请求的物品已经卖完了，用`OutOfStock`表示。

<a name="throwing_errors"></a>
错误抛出
通过在函数或方法声明的参数后面加上`throws`关键字，表明这个函数或方法可以抛出错误。如果指定一个返回值，可以把`throws`关键字放在返回箭头(->)的前面。除非明确地指出，一个函数，方法或者闭包就不能抛出错误。

```swift
func canThrowErrors() throws -> String

func cannotThrowErrors() -> String
```

在抛出函数体的任意一个地方，可以通过`throw`语句抛出错误。在下面的例子中，如果请求的物品不存在，或者卖完了，或者超出投入金额，`vend(itemNamed:)`函数会抛出一个错误：

```swift
struct Item {
	var price: Double
	var count: Int
}

var inventory = [
	"Candy Bar": Item(price: 1.25, count: 7),
	"Chips": Item(price: 1.00, count: 4),
	"Pretzels": Item(price: 0.75, count: 11)
]
var amountDeposited = 1.00

func vend(itemNamed name: String) throws {
	guard var item = inventory[name] else {
		throw VendingMachineError.InvalidSelection
    }

	guard item.count > 0 else {
		throw VendingMachineError.OutOfStock
    }

	if amountDeposited >= item.price {
		// Dispense the snack
		amountDeposited -= item.price
	    --item.count
		inventory[name] = item
	} else {
		let amountRequired = item.price - amountDeposited
		throw VendingMachineError.InsufficientFunds(required: 	amountRequired)
	}
}
```

首先，`guard`语句用来把绑定`item`常量和`count`变量到在库存中对应的值。如果物品不在库存中，将会抛出`InvalidSelection`错误。然后，物品是否可获取有物品的剩余数量决定。如果`count`小于等于0，将会抛出`OutOfStock`错误。最后，把请求物品的价格和已经投入的金额进行比较，如果如果投入的金额大于物品的价格，将会从投入的金额从减去物品的价格，然后库存中该物品的数量减1，然后返回请求的物品。否则，将会计算还需要多少钱，然后把这个值作为`InsufficientFunds`错误的关联值。因为`throw`语句会马上改变程序流程，当所有的购买条件（物品存在，库存足够以及投入金额足够）都满足的时候，物品才会出售。

当调用一个抛出函数的时候，在调用前面加上`try`。这个关键字表明函数可以抛出错误，而且在`try`后面代码将不会执行。

```swift
let favoriteSnacks = [
	"Alice": "Chips",
	"Bob": "Licorice",
	"Eve": "Pretzels",
]
func buyFavoriteSnack(person: String) throws {
	let snackName = favoriteSnacks[person] ?? "Candy Bar"
	try vend(itemNamed: snackName)
}
```

`buyFavoriteSnack(_:)` 函数查找某个人的最喜欢的零食，然后尝试买给他。如果这个人在列表中没有喜欢的零食，就会购买`Candy Bar`。这个函数会调用`vend`函数，`vend`函数可能会抛出错误，所以在`vend`前面加上了`try`关键字。因为`buyFavoriteSnack`函数也是一个抛出函数，所以`vend`函数抛出的任何错误都会向上传递到`buyFavoriteSnack`被调用的地方。

###捕捉和处理错误
使用do-catch语句来就捕获和处理错误

```swift
do {

    try function that throws

    statements
	
} catch pattern {

    statements

}
```

如果一个错误被抛出了，这个错误会被传递到外部域，直到被一个`catch`分句处理。一个`catch`分句包含一个`catch`关键字，跟着一个`pattern`来匹配错误和相应的执行语句。

类似`switch`语句，编译器会检查`catch`分句是否能够处理全部错误。如果能够处理所有错误情况，就认为这个错误被完全处理。否者，包含这个抛出函数的所在域就要处理这个错误，或者包含这个抛出函数的函数也用`throws`声明。为了保证错误被处理，用一个带`pattern`的`catch`分句来匹配所有错误。如果一个`catch`分句没有指定样式，这个分句会匹配并且绑定任何错误到一个本地`error`常量。更多关于`pattern`的信息，参见[模式](../chapter3/07_Patterns.html)。

```swift
do {	
	try vend(itemNamed: "Candy Bar")	
	// Enjoy delicious snack	
} catch VendingMachineError.InvalidSelectio {
	print("Invalid Selection")
} catch VendingMachineError.OutOfStock {
	print("Out of Stock.")
} catch VendingMachineError.InsufficientFunds(let 	amountRequired) {
	print("Insufficient funds. Please insert an additional $\(amountRequired).")
}
```

在上面的例子中，`vend(itemNamed:)` 函数在`try`表达式中被调用，因为这个函数会抛出错误。如果抛出了错误，程序执行流程马上转到`catch`分句，在`catch`分句中确定错误传递是否继续传送。如果没有抛出错误，将会执行在`do`语句中剩余的语句。

> 注意：Swift中的错误处理和其他语言中的异常处理很像，使用了`try`、`catch`和`throw`关键字。但是和这些语言——包括Objective-C——不同的是，Swift不会展开调用堆栈，那会带来很大的性能损耗。因此，在Swift中`throw`语句的性能可以做到几乎和`return`语句一样。

###禁止错误传播
在运行时，有几种情况抛出函数事实上是不会抛出错误的。在这几种情况下，你可以用`forced-try`表达式来调用抛出函数或方法，即使用`try!`来代替`try`。

通过`try!`来调用抛出函数或方法禁止了错误传送，并且把调用包装在运行时断言，这样就不会抛出错误。如果错误真的抛出了，会触发运行时错误。

```swift
func willOnlyThrowIfTrue(value: Bool) throws {
	if value { throw someError }
}

do {
	try willOnlyThrowIfTrue(false)
} catch {
	// Handle Error
}

try! willOnlyThrowIfTrue(false)
```

###收尾操作
使用defer语句来在执行一系列的语句。这样不管有没有错误发生，都可以执行一些必要的收尾操作。包括关闭打开的文件描述符以及释放所有手动分配的内存。

`defer`语句把执行推迟到退出当前域的时候。`defer`语句包括`defer`关键字以及后面要执行的语句。被推迟的语句可能不包含任何将执行流程转移到外部的代码，比如`break`或者`return`语句，或者通过抛出一个错误。被推迟的操作的执行的顺序和他们定义的顺序相反，也就是说，在第一个`defer`语句中的代码在第二个`defer`语句中的代码之后执行。

```swift
func processFile(filename: String) throws {
	if exists(filename) {
		let file = open(filename)
		defer {
			close(file)
	    }
		while let line = try file.readline() {
			// Work with the file.
	    }
		// close(file) is called here, at the end of the scope.
    }
}
```

上面这个例子使用了`defer`语句来保证`open`有对应的`close`。这个调用不管是否有抛出都会执行。
