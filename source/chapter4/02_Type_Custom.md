# 造个类型不是梦-白话Swift类型创建
-----------------

> 翻译：[老码团队翻译组-Tyrion](http://weibo.com/u/5241713117)
> 校对：[老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)

本页包含内容：

- [自定义原型](#prototype)
- [实现默认值](#imp-default)
- [支持基本布尔型初始化](#init-by-bool)
- [支持Bool类型判断](#condition-by-bool)
- [支持兼容各们各派的类型](#support-all-type)
- [完善OCBool的布尔基因体系](#make-up-type)

小伙伴们，Swift中的Bool类型有着非常重要的语法功能，并支撑起了整个Swift体系中的逻辑判断体系，经过老码的研究和学习， Bool类型本身其实是对基础Boolean类型封装，小伙伴们可能咬着手指头问老码，怎么一会Bool类型，一会Boolean类型，其区别在于，前者是基于枚举的组合类型，而后者则是基本类型，只有两种true和false。

<a name="prefix_expressions"></a>
####自定义原型
接下老码根据Bool的思想来创建一个OCBool类型，来让小伙伴们了解一下Swift中到底是怎么玩儿的。
来我们先看一下OCBool的定义。

#####代码示例如下：
```swift
enum OCBool{
case ocTrue
case ocFalse
}
```

#####注意：

- 代码中第2行和第3行，可以合并到一行写，如苹果官方Blog所写的一样
- 代码中命名需要注意：OCBool是类型名，所以首字母必须大写，而case中的ocTrue和ocFalse是小类型则需要首字母小写。

<a name="imp-default"></a>
####实现默认值
行，我们给了一个漂亮的定义，不过按照传统语言的经验，Bool值默认情况下是假， 所以我们的OCBool也应该如此，我们使用类型扩展技术增加这个默认特性：
```swift
extension OCBool{
     init(){
             self =.ocFalse
     }
}
```

#####注意：
- 代码中第1行：extension关键字，非常强大，小伙伴们可以通过此创造出许多好玩的东西，建议各位去Github上看一个名为“Swiftz”的项目，它将扩展用到了极致。
- 代码中第3行：self = .ocFalse语法，刚入门的小伙伴们很迷糊，为什么会有奇怪的点语法，因为大牛Chris在Swift中增加了类型智能推断功能，在苹果Blog中，提到了“Context”概念，就是这个意思，因为这行语句是在枚举OCBool中的，其上下文就是OCBool的定义体，编译器当然知道.ocFalse就是OCBool.ocFalse了，所以这里直接点语法，非常整齐。
现在我们可以使用如下方法使用这个Bool类型。

#####代码示例如下：
```swift
var result:OCBool = OCBool()
var result1:OCBool = .ocTrue
```

<a name="init-by-bool"></a>
####支持基本布尔型初始化
正如上述代码所述，我们只能通过类型或者枚举项目赋值，这是组合类型的用法，但是编码的日子里，我们总是希望和true，false直接打交道，也就是说，我们希望这么做，
代码示例如下：
```swift
var isSuccess:OCBool = true
```

如果小伙伴们直接这么用，则会出现如下错误：
```
/Users/tyrion-OldCoder/Documents/Learning/BoolType/BoolType/main.swift:30:24: Type 'OCBool' does not conform to protocol 'BooleanLiteralConvertible'
```
编译器咆哮的原因是，我们的类型没有遵从“布尔字面量转换协议”，接下来修正这个问题，
#####代码示例如下：

```swift
import Foundation

println("Hello, World!")

enum OCBool{
    case ocTrue
    case ocFalse
}


extension OCBool: BooleanLiteralConvertible{
static func convertFromBooleanLiteral( value: Bool) ->OCBool{
    return value ? ocTrue : ocFalse
    }
}

var isSuccess:OCBool = true
```

#####注意：
- 代码中的第11行是重点，我的类型OCBool支持了BooleanLiteralConvertible协议，这个协到底是干什么的呢，小伙伴们在Xcode代码编辑器，按住Command键，然后点击第11行中的BooleanLiteralConvertible协议名，则会进入它的定义，
#####其定义如下：
```swift
protocol BooleanLiteralConvertible {
    typealias BooleanLiteralType
    class func convertFromBooleanLiteral(value: BooleanLiteralType) -> Self
}
```

- 这个定义中有个类方法convertFromBooleanLiteral，它的参数为BooleanLiteralType类型，也就是我传入的Bool类型， 且返回值为实现这个协议的类型本身，在我们的OCBool类型中，其返回值就是OCBool本身。经过这个定义，我们可以直接对OCBool类型直接进行布尔字面量初始化了。

<a name="condition-by-bool"></a>
####支持Bool类型判断
小伙伴们不安分， 肯定想着我怎么用它实现逻辑判断，所以如果你这么写，
#####代码示例如下：
```swift
var isSuccess:OCBool = true

if isSuccess {
    println( "老码请你吃火锅！")
}
```

你永远吃不到老码的火锅，因为这里编译器会咆哮：
```
/Users/tyrion-OldCoder/Documents/Learning/BoolType/BoolType/main.swift:27:4: Type 'OCBool' does not conform to protocol 'LogicValue'
```
OCBool现在只能用bool类型初始化，而不能直接返回bool型，小火把们还记得在《老码说编程之白话Swift江湖》中，老码多次提到，妈妈再也不担心我们 if a = 1{}的写法了， 因为等号不支持值返回了， 所以在if判断是后面的条件必须有返回值，OCBool没有，所以编译器哭了。我们解决这个问题。

#####代码示例如下：
```swift
import Foundation

println("Hello, World!")

enum OCBool{
    case ocTrue
    case ocFalse
}


extension OCBool: BooleanLiteralConvertible{
static func convertFromBooleanLiteral( value: Bool) ->OCBool{
    return value ? ocTrue : ocFalse
    }
}

extension OCBool: LogicValue{
    func getLogicValue() ->Bool {
        var boolValue: Bool{
        switch self{
        case .ocTrue:
            return true
        case .ocFalse:
            return false
            }
        }
        return boolValue
    }
}


var isSuccess:OCBool = true

if isSuccess {
    println( "老码请你吃火锅！")
}
```

####运行结果如下：
```
Hello, World!
老码请你吃火锅！
Program ended with exit code: 0
```
#####注意：
- 如果小伙伴们现在用的是Beta版的Xcode，注意苹果官方Blog中，在代码第17行如果在Xcode Beta4下是错误的，这里的协议是，LogicValue而不是BooleanVue，所以记得看错误提示才是好习惯。
- 注意代码第34行，完美支持if判断，且输出结果为“老码请你吃火锅”，老码也是说说而已，请不要当真。

<a name="support-all-type"></a>

####支持兼容各们各派的类型
小伙伴们，江湖风险，门派众多，老码有自己的OCBool类型，可能嵩山少林有自己的SSBool类型，甚至连郭美美都可能有自己的MMBool类型，所以OCBool必须能够识别这些类型，这些各门各派的类型，只要支持LogicValue协议，就应该可以被识别，看老码怎么做，

#####代码示例如下：
```swift
extension OCBool{
    init( _ v: LogicValue )
    {
        if v.getLogicValue(){
            self = .ocTrue
        }
        else{
            self = .ocFalse
        }
    }

}

var mmResult: Bool = true
var ocResult:OCBool = OCBool(mmResult)


if ocResult {
    println( "老码没钱，郭美美请你吃火锅！")
}
```

#####代码运行结果如下：
```
Hello, World!
老码没钱，郭美美请你吃火锅！
Program ended with exit code: 0
```
漂亮！我们的OCBool类型现在支持了所有的逻辑变量初始化。

#####注意：
- 代码中第2行：“_”下横杠的用法，这是一个功能强大的小强，在此的目的是屏蔽外部参数名，所以小伙伴们可以直接：var ocResult:OCBool = OCBool(mmResult)而不是：var ocResult:OCBool = OCBool(v: mmResult)，小伙伴们惊呆了！这个init函数中本来就没有外部参数名啊，还记得老码在书里说过没，Swift的初始化函数会默认使用内部参数名，作为外部参数名。

<a name="make-up-type"></a>
####完善OCBool的布尔基因体系：
小伙伴们，bool类型的价值就是在于各种判断，诸如==，!=, &，|,^,!，以及各种组合逻辑运算，我们OCBool也要具备这些功能，否则就会基因缺陷，且看老码如何实现：

```swift
extension OCBool: Equatable{
}

//支持等值判断运算符
func ==( left: OCBool, right: OCBool )->Bool{
    switch (left, right){
    case (.ocTrue, .ocTrue):
            return true
    default:
        return false
    }
}
//支持位与运算符
func &( left:OCBool, right: OCBool)->OCBool{

    if left{
        return right
    }
    else{
        return false
    }
}
//支持位或运算符
func |( left:OCBool, right: OCBool)->OCBool{

    if left{
        return true
    }
    else{
        return right
    }
}

//支持位异或运算符
func ^( left:OCBool, right: OCBool)->OCBool{
    return OCBool( left != right )
}
//支持求反运算符
@prefix func !( a:OCBool )-> OCBool{
    return a ^ true
}
//支持组合求与运算符
func &= (inout left:OCBool, right:OCBool ){
    left = left & right
}


var isHasMoney:OCBool = true
var isHasWife:OCBool = true
var isHasHealty:OCBool = true
var isHasLover:OCBool = true

isHasMoney != isHasHealty
isHasHealty == isHasMoney
isHasWife ^ isHasLover
isHasWife = !isHasLover

if (isHasMoney | isHasHealty) & isHasHealty{
    println( "人生赢家，就像老码一样！")
}else
{
    println("人生最苦的事事，人死了钱没花了，人生最苦的事是，人活着，钱没了！")
}
```

好了，到这里就到这里了，窗外的雷声叫醒了老码，现在应该去吃饭了，以上老码给大家展示了如果制造一个自己的类型，记得老码的示例是在Xcode6 Beta4下测试的，至于Beta5的改变还没有涉及，小伙伴们要好生练习，以后各种自定类型都是基于这个思想。还有这个章节不是老码的原创，老码认真的阅读了苹果的官方博客，且自己的练习总结，如果小伙伴们费了吃奶的劲还是看不懂，请找度娘谷歌，还是看不懂请到老码官方微博：http://weibo.com/u/5241713117咆哮。



本文由翻译自Apple Swift Blog ：https://developer.apple.com/swift/blog/?id=8
