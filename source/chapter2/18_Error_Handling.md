# 错误处理（Error Handling）
-----------------

> 2.1
> 翻译+校对：[lyojo](https://github.com/lyojo) [ray16897188](https://github.com/ray16897188)

错误处理是响应错误以及从错误中恢复的过程。swift提供了在运行对可恢复错误抛出，捕获，传送和操作的高级支持。

某些操作并不能总是保证执行所有代码都可以执行或总会产出有用的结果。可选类型用来表示值可能为空，但是当执行失败的时候，通常要去了解此次失败是由何引起，你的代码就可以做出与之相应的反应。

举个例子，假如有个从磁盘上的某个文件读取以并做数据处理的任务，该任务会有多种可能失败的情形，包括指定路径下文件并不存在，文件不具有可读权限，或者文件编码格式不兼容。区分这些错误情形可以让程序解决并处理一部分错误，然后把它解决不了的错误报告给用户。

>
注意：
Swift中的错误处理涉及到错误处理模式，这会用到Cocoa和Objective-C中的`NSError`。关于这个class的更多信息请参见：[ Using Swift with Cocoa and Objective-C (Swift 2.1)](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)中的[错误处理](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/AdoptingCocoaDesignPatterns.html#//apple_ref/doc/uid/TP40014216-CH7-ID10)。

###表示并抛出错误：
在Swift中，错误用遵循`ErrorType`协议类型的值来表示。这个空协议表示一种可以用做错误处理的类型。
Swift的枚举类型尤为适合塑造一组相关的错误情形(error conditions)，枚举的关联值(assiciated values)还可以提供额外信息，表示某些错误情形的性质。比如你可以这样表示在一个游戏中操作自动贩卖机会出现的错误情形：

```swift
enum VendingMachineError: ErrorType {
	case InvalidSelection	//选择无效
	case InsufficientFunds(coinsNeeded: Int)	//金额不足
	case OutOfStock			//缺货
}
```
抛出一个错误会让你对所发生的意外情况做出提示，表示正常的执行流程不能被执行下去。抛出错误使用`throws`关键字。比如下面的代码抛出一个错误，提示贩卖机还需要5个硬币：

```swift
throw VendingMachineError.InsufficientFunds(coinsNeeded: 5)
```
###处理错误：
某个错误被抛出时，那个地方的某部分代码必须要负责处理这个错误 - 比如纠正这个问题、尝试另外一种方式、或是给用户提示这个错误。
Swift中有4中处理错误的方式。你可以把函数抛出的错误传递给调用此函数的代码、用`do-catch`语句处理错误、将错误作为可选类型处理、或者断言此错误根本不会发生。每种方式在下面相应小节都有描述。
当一个函数抛出一个错误时，你的程序流程会发生改变，所以关键是你要迅速的标识出代码中抛出错误的地方。为了标识出这些地方，在调用一个能抛出错误的函数，方法，或者构造器之前，加上`try`关键字 - 或者`try?`或者`try!`的变体。这些关键字在下面的小节中有具体讲解。
>注意
>Swift中的错误处理和其他语言中的用`try`，`catch`和`throw`的异常处理(exception handling)很像。和其他语言中(包括Objective-C)的异常处理不同的是，Swift中的错误处理并不涉及堆栈解退(Stack unwinding)，这是一个计算昂贵(computationally expensive)的过程。就此而言，`throw`语句的性能特性是可以和`return`语句相当的。

####用throwing函数传递错误：
用`throws`关键字标来识一个可抛出错误的函数，方法或是构造器。在函数声明中的参数列表之后加上`throws`。一个标识了`throws`的函数被称作*throwing函数*。如果这个函数还有返回值类型，`throws`关键词需要写在箭头(->)的前面。

```swift
func canThrowErrors() throws -> String
func cannotThrowErrors() -> String
```
一个throwing函数从其内部抛出错误、并传递到该函数被调用时所在的区域中。
>注意
只有throwing函数可以传递错误。任何在某个非throwing函数内部抛出的错误只能在此函数内部处理

下面的例子中`VendingMechine`类有一个`vend(itemNamed:)`方法，如果需要的物品不存在，缺货或者花费超过了已投入金额，该方法就会抛出一个相称的`VendingMachineError`。


```swift
struct Item {
	var price: Int
	var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0
    func dispenseSnack(snack: String) {
        print("Dispensing \(snack)")
    }
    
    func vend(itemNamed name: String) throws {
        guard var item = inventory[name] else {
            throw VendingMachineError.InvalidSelection
        }
        
        guard item.count > 0 else {
            throw VendingMachineError.OutOfStock
        }
        
        guard item.price <= coinsDeposited else {
            throw VendingMachineError.InsufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }
        
        coinsDeposited -= item.price
        --item.count
        inventory[name] = item
        dispenseSnack(name)
    }
}
```

`vend(itemNamed:)`方法的实现使用了`guard`语句，确保在购买某个零食所需的条件有任一不被满足时能够尽早退出此方法并抛出相匹配的错误。由于`throw`语句会立即将程序控制转移，所以某件物品只有在所有条件都满足时才会被售出。

因为`vend(itemNamed:)`方法会传递出它抛出的任何错误，在你代码中调用它的地方必须要么直接处理这些错误 - 使用`do-catch`语句，`try?`或`try!`，要么继续将这些错误传递下去。例如下面例子中`buyFavoriteSnack(_:vendingMachine)`同样是一个throwing函数，任何由`vend(itemNamed:)`方法抛出的错误会一直被传递到`buyFavoriteSnack(_:vendingMachine)`函数被调用的那个地方。

```swift
let favoriteSnacks = [
	"Alice": "Chips",
	"Bob": "Licorice",
	"Eve": "Pretzels",
]
func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
	let snackName = favoriteSnacks[person] ?? "Candy Bar"
	try vendingMachine.vend(itemNamed: snackName)
}
```
上例中`buyFavoriteSnack(_:vendingMachine)`函数会查找某人最喜欢的零食，并通过调用`vend(itemNamed:)`方法来尝试为他们买。因为`vend(itemNamed:)`方法能抛出错误，所以在调用的它时候在它前面加了`try`关键字。


####用Do-Catch处理错误
可以使用一个`do-catch`语句运行一段闭包代码来做错误处理。如果在`do`语句中的代码抛出了一个错误，则这个错误会与`catch`语句做匹配来决定哪条语句能处理它。
下面是`do-catch`语句的通用形式：
```swift
do {
    try expression
    statements
} catch pattern 1 {
    statements
} catch pattern 2 where condition {
    statements
}
```
在`catch`后面写一个模式(pattern)来表示这个语句能处理什么样的错误。如果一条`catch`语句没带一个模式，那么这条语句可以和任何错误相匹配，并且把错误和一个名字为`name`的局部常量做绑定。关于模式匹配的更多信息请参考[Patterns](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/doc/uid/TP40014097-CH36-ID419)。

`catch`语句不必将`do`语句中代码所抛出的每个可能的错误都处理。如果没有一条`catch`字句来处理错误，错误就会传播到周围的作用域。然而错误还是必须要被某个周围的作用域处理的 - 要么是一个外围的`do-catch`错误处理语句，要么是一个throwing函数的内部。举例来说，下面的代码处理了`VendingMachineError`枚举类型的全部3个枚举实例，但是所有其它的错误就必须由它周围作用域所处理：
```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack("Alice", vendingMachine: vendingMachine)
} catch VendingMachineError.InvalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.OutOfStock {
    print("Out of Stock.")
} catch VendingMachineError.InsufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
}
// prints "Insufficient funds. Please insert an additional 2 coins."
```
上面的例子中`buyFavoriteSnack(_:vendingMachine:)`在一个`try`表达式中被调用，因为它能抛出一个错误。如果一个错误被抛出，相应的执行会被马上转移到`catch`语句中来，判断这个错误是否要被继续传递下去。如果没有错误抛出，`do`语句中余下的语句就会被执行。
####将错误转换成可选值
可以使用`try?`通过将其转换成一个可选值来处理错误。如果在评估`try?`表达式时一个错误被抛出，那么这个表达式的值就是`nil`。例如下面代码中的`x`和`y`有相同的值和特性：

```swift
func someThrowingFunction() throws -> Int {
    // ...
}
 
let x = try? someThrowingFunction()
 
let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

如果`someThrowingFunction()`抛出一个错误，`x`和`y`的值是`nil`。否则`x`和`y`的值就是该函数的返回值。注意无论`someThrowingFunction()`的返回值类型是什么类型，`x`和`y`都是这个类型的可选类型。例子中此函数返回一个整型，所以`x`和`y`是整型的可选类型。
如果你想对所有的错误都采用同样的方式来处理，用`try?`就可以让你写出简洁的错误处理代码。比如下面的代码用一些的方式来获取数据，如果所有的方法都失败则返回`nil`。
```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```
####使错误传递失效
有时你知道某个throwing函数实际上在运行时是不会抛出错误的。在这种条件下，你可以在表达式前面写`try!`来使错误传递失效，并把调用包装在一个运行时断言(runtime assertion)中来断定不会有错误抛出。如果实际上确实抛出了错误，你就会得到一个运行时错误。
例如下面的代码使用了`loadImage(_:)`函数，该函数从给定的路径下装载图片资源，如果图片不能够被载入则抛出一个错误。此种情况下因为图片是和应用绑定的，运行时不会有错误被抛出，所以是错误传递失效是没问题的。
```swift
let photo = try! loadImage("./Resources/John Appleseed.jpg")
```
###指定清空操作
可以使用`defer`语句在代码执行到要离开当前的代码段之前去执行一套语句。该语句让你能够做一些应该被执行的必要清理工作，不管是以何种方式离开当前的代码段的 - 无论是由于抛出错误而离开，或是因为一条`return`或者`break`的类似语句。比如你可以用`defer`语句来保证文件描述符(file descriptors)已被关闭，并且手动分配的内存也被释放了。
`defer`语句将代码的执行延迟到当前的作用域退出之前。该语句由`defer`关键字和要被延时执行的语句组成。延时执行的语句不会包含任何会将控制权移交到语句外面的代码，例如一条`break`或是`return`语句，或是抛出一个错误。延迟执行的操作是按照它们被指定的相反顺序执行 - 意思是第一条`defer`语句中的代码执行是在第二条`defer`语句中代码被执行之后，以此类推。
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
上面的代码用了一条`defer`语句来确保`open(_:)`函数有一个相应的对`close(_:)`的调用。

>注意
>即使没有涉及到错误处理代码，你也可以用`defer`语句。