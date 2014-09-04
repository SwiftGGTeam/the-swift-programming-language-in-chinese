> 翻译：[老码团队翻译组-Tyrion](http://weibo.com/u/5241713117)  
> 校对：[老码团队翻译组-Ayra](http://weibo.com/littlekok/)

# 可选类型完美解决占位问题
-----------------

本页包含内容：

- [为Dictionary增加objectsForKeys函数](#add-function)
- [Swift中更简便的方法](##easy-function)
- [内嵌可选类型](#nested-optional)
- [提供一个默认值](#provide-default)

可选类型是Swift中新引入的，功能很强大。在这篇博文里讨论的，是在Swift里，如何通过可选类型来保证强类型的安全性。作为例子，我们来创建一个Objective-C API的Swift版本，但实际上Swift本身并不需要这样的API。


<a name="#add-function"></a>
#### 为Dictionary增加objectsForKeys函数

在Objective-C中，```NSDictionary```有一个方法```-objectsForKeys:NoFoundMarker:```, 这个方法需要一个```NSArray```数组作为键值参数，然后返回一个包含相关值的数组。文档里写到："返回数组中的第N个值，和输入数组中的第N个值相对应"，那如果有某个键值在字典里不存在呢？于是就有了```notFoundMarker```作为返回提示。比如第三个键值没有找到，那么在返回数组中第三个值就是这个```notFoundMarker```，而不是字典中的第三个值，但是这个值只是用来提醒原字典中没有找到对应值，但在返回数组中该元素存在，且用```notFoundMarker```作为占位符，因为这个对象不能直接使用，所以在Foundation框架中有个专门的类处理这个情况：```NSNull```。

在Swift中，```Dictionary```类没有类似```objectsForKeys```的函数，为了说明问题，我们动手加一个，并且使其成为操作字典值的通用方法。我们可以用```extension```来实现：

```
extension Dictionary{
	func valuesForKeys(keys:[K], notFoundMarker: V )->[V]{
		//具体实现代码后面会写到
	}
}
```

以上就是我们实现的Swift版本，这个和Objective-C版本有很大区别。在Swift中，因为其强类型的原因限制了返回的结果数组只能包含单一类型的元素，所以我们不能放```NSNull```在字符串数组中，但是，Swift有更好的选择，我们可以返回一个可选类型数据。我们所有的值都封包在可选类型中，而不是```NSNull```, 我们只用```nil```就可以了。


```
extension Dictionary{
    func valuesForKeys(keys: [Key]) -> [Value?] {
        var result = [Value?]()
        result.reserveCapacity(keys.count)
        for key in keys{
            result.append(self[key])
        }
        return result
    }
}
```

<a name="#easy-function"></a>
#### Swift中更简便的方法

小伙伴们可能会问，为什么Swift中不需要实现这么一个API呢？其实其有更简单的实现，如下面代码所示：

```
extension Dictionary {
	func valuesForKeys(keys: [Key]) -> [Value?] {
		return keys.map { self[$0] }
	}
}
```

上述方式实现的功能和最开始的方法实现的功能相同，虽然核心的功能是封装了```map```的调用，这个例子也说明了为什么Swift没有提供轻量级的API接口，因为小伙伴们简单的调用```map```就可以实现。

接下来，我们实验几个例子：

```
var dic: Dictionary = [ "1": 2, "3":3, "4":5 ]

var t = dic.valuesForKeys(["1", "4"]) 
//结果为：[Optional(2), Optional(5)]

var t = dict.valuesForKeys(["3", "9"])
// 结果为：[Optional(3), nil]

t = dic.valuesForKeys([])
//结果为：[]
```

<a name="#nested-optional"></a>
#### 内嵌可选类型

现在，如果我们为每一个结果调用```last```方法，看下结果如何？

```
var dic: Dictionary = [ "1": 2, "3":3, "4":5 ]

var t = dic.valuesForKeys(["1", "4"]).last //结果为：Optional(Optional(5))
// Optional(Optional("Ching"))

var t = dict.valuesForKeys(["3", "9"]).last
// 结果为：Optional(nil)

var t = dict.valuesForKeys([]).last
// 结果为：nil

```

小伙伴们立马迷糊了，为什么会出现两层包含的可选类型呢？，特别对第二种情况的```Optional(nil)```，这是什么节奏？

我们回过头看看```last```属性的定义：

```
var last:T? { get }
```

很明显```last```属性的类型是数组元素类型的可选类型，这种情况下，因为元素类型是```(String?)```，那么再结合返回的类型，于是其结果就是```String??```了，这就是所谓的嵌套可选类型。但嵌套可选类型本质是什么意思呢？

如果在Objective-C中重新调用上述方法，我们将使用```NSNull```作为占位符，Objective-C的调用语法如下所示：

```
[dict valuesForKeys:@[@"1", @"4"] notFoundMarker:[NSNull null]].lastObject
// 5
[dict valuesForKeys:@[@"1", @"3"] notFoundMarker:[NSNull null]].lastObject
// NSNull
[dict valuesForKeys:@[] notFoundMarker:[NSNull null]].lastObject
// nil
```

不管是Swift版本还是Objective-C版本，返回值为```nil```都意味数组是空的，所以它就没有最后一个元素。 但是如果返回是```Optional(nil)```或者Objective-C中的```NSNull```都表示数组中的最后一个元素存在，但是元素的内容是空的。在Objective-C中只能借助```NSNull```作为占位符来达到这个目的，但是Swift却可以语言系统类型的角度的实现。

<a name="#provide-default"></a>
#### 提供一个默认值

进一步封装，如果我字典中的某个或某些元素不存在，我们想提供一个默认值怎么办呢？实现方法很简单：

```
extension Dictionary {
	func valuesForKeys( keys:[Key], notFoundMarker: Value)->[Value]{
		return self.valueForKeys(kes).map{ $0 ?? notFoundMarker }
	}
}
```

```
dict.valuesForKeys(["1", "5"], notFoundMarker: "Anonymous")
```

和Objective-C相比，其需要占位符来达到占位的目的，但是Swift却已经从语言类型系统的层面原生的支持了这种用法，同时提供了丰富的语法功能。这就是Swift可选类型的强大之处。同时注意上述例子中用到了空合运算符```??```。

-----------------
本章节不是老码的原创，是老码认真的阅读了苹果的官方博客，自己的练习总结，如果小伙伴们费了吃奶的劲还是看不懂，请找度娘谷歌。还是看不懂？请到老码[官方微博](http://weibo.com/u/5241713117)咆哮。  

##### 本文由翻译自Apple Swift Blog ：[Optionals Case Study: valuesForKeys](https://developer.apple.com/swift/blog/?id=12)
