# 下标 (Subscripts)

下标可以定义在类(Class)、结构体(structures)和枚举(enumerations)这些目标中，可以认为是访问对象、集合或序列的快捷方式。举例来说，用下标访问一个数组(Array)实例中的元素可以这样写 `someArray[index]` ，访问字典(Dictionary)实例中的元素可以这样写 `someDictionary[key]`，而不需要再调用实例的某个方法来获得元素的值。

对于同一个目标可以定义多个下标，通过索引值类型的不同来进行重载，而且索引值的个数可以是多个。

> 译者：这里下标重载在本小节中原文并没有任何演示


## 下标语法

下标允许你通过在实例后面的方括号中传入一个或者多个的索引值来对实例进行访问和赋值。语法类似于实例方法和实例属性的混合。与定义实例方法类似，定义下标使用`subscript`关键字，显式声明入参（一个或多个）和返回类型。与实例方法不同的是下标可以设定为读写或只读。这种方式又有点像实例属性的getter和setter：

```
subscript(index: Int) -> Int {
	get {
		// 返回与入参匹配的Int类型的值
	}

	set(newValue) {
		// 执行赋值操作
	}
}
```

`newValue`的类型必须和下标定义的返回类型相同。与实例属性相同的是set的入参声明`newValue`就算不写，在set代码块中依然可以使用`newValue`这个变量来访问新赋的值。

与只读实例属性一样，可以直接将原本应该写在get代码块中的代码写在subscript中即可：

```
subscript(index: Int) -> Int {
	// 返回与入参匹配的Int类型的值
}
```

下面代码演示了一个在TimesTable结构体中使用只读下标的用法，该结构体用来展示传入整数的N倍。

```
struct TimesTable {
	let multiplier: Int
	subscript(index: Int) -> Int {
		return multiplier * index
	}
}
let threeTimesTable = TimesTable(multiplier: 3)
println("3的6倍是\(threeTimesTable[6])")
// 输出 "3的6倍是18"
```

在上例中，通过TimesTable结构体创建了一个用来表示索引值三倍的实例。数值3作为结构体构造函数入参表示这个值将成为实例成员multiplier的值。

你可以通过下标来来得到结果，比如`threeTimesTable[6]`。这句话访问了threeTimesTable的第六个元素，返回18或者6的3倍。

> <b>提示</b>
> 
> TimesTable例子是基于一个固定的数学公式。它并不适合开放写权限来对threeTimesTable[someIndex]进行赋值操作，这也是为什么下标只定义为只读的原因。


## 下标用法

下标根据使用场景不同也具有不同的含义。通常下标是用来访问集合(collection)，列表(list)或序列(sequence)中元素的快捷方式。你可以为特定的类或结构体中自由的实现下标来提供合适的功能。

例如，Swift的字典(Dictionary)实现了通过下标来对其实例中存放的值进行存取操作。在字典中设值可以通过给字典提供一个符合字典索引类型的索引值的表达式赋一个与字典存放值类型匹配的值来做到：

```
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
numberOfLegs["bird"] = 2
```

上例定义一个名为numberOfLegs的变量并用一个字典表达式初始化出了包含三对键值的字典实例。numberOfLegs的字典存放值类型推断为`Dictionary<String, Int>`。字典实例创建完成之后通过下标的方式将整型值`2`赋值到字典实例的索引为`bird`的位置中。

更多关于字典(Dictionary)下标的信息请参考[字典的访问与修改](#)

> <b>提示</b>
>
> Swift中Dictionary的下标实现中，在get部分返回值是`Int?`，也就是说不是每个字典的索引都能得到一个整型值，对于没有设过值的索引的访问返回的结果就是`nil`；同样想要从字典实例中删除某个索引下的值也只需要给这个索引赋值为`nil`即可。


## 下标选项

下标允许任意数量的入参索引，并且每个入参类型也没有限制。下标的返回值也可以是任何类型。



> 译者：这里有个词Computed Properties 这里统一翻译为实例属性了 微软术语引擎里没有这个词

