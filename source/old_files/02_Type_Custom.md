# 造个类型不是梦-白话 Swift 类型创建
-----------------

> 翻译：[老码团队翻译组-Tyrion](http://weibo.com/u/5241713117)
> 校对：[老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)

本页包含内容：

- [自定义原型](#prototype)
- [实现默认值](#imp-default)
- [支持基本布尔型初始化](#init-by-bool)
- [支持 Bool 类型判断](#condition-by-bool)
- [支持兼容各们各派的类型](#support-all-type)
- [完善 OCBool 的布尔基因体系](#make-up-type)

小伙伴们，Swift 中的 Bool 类型有着非常重要的语法功能，并支撑起了整个 Swift 体系中的逻辑判断体系，经过老码的研究和学习， Bool 类型本身其实是对基础 Boolean 类型封装，小伙伴们可能咬着手指头问老码，怎么一会 Bool 类型，一会 Boolean 类型，其区别在于，前者是基于枚举的组合类型，而后者则是基本类型，只有两种 true 和 false。

####自定义原型 {#prefix-expressions}

接下老码根据 Bool 的思想来创建一个 OCBool 类型，来让小伙伴们了解一下 Swift 中到底是怎么玩儿的。
来我们先看一下 OCBool 的定义。

#####代码示例如下：

```swift
enum OCBool{
case ocTrue
case ocFalse
}
```

#####注意：

- 代码中第2行和第3行，可以合并到一行写，如苹果官方 Blog 所写的一样
- 代码中命名需要注意：OCBool 是类型名，所以首字母必须大写，而 case 中的 ocTrue 和 ocFalse 是小类型则需要首字母小写。

####实现默认值 {#imp-default}

行，我们给了一个漂亮的定义，不过按照传统语言的经验，Bool 值默认情况下是假， 所以我们的 OCBool 也应该如此，我们使用类型扩展技术增加这个默认特性：

```swift
extension OCBool{
     init(){
             self =.ocFalse
     }
}
```

#####注意：

- 代码中第1行：extension 关键字，非常强大，小伙伴们可以通过此创造出许多好玩的东西，建议各位去 Github 上看一个名为“Swiftz”的项目，它将扩展用到了极致。
- 代码中第3行：self = .ocFalse 语法，刚入门的小伙伴们很迷糊，为什么会有奇怪的点语法，因为大牛 Chris 在 Swift 中增加了类型智能推断功能，在苹果 Blog 中，提到了“Context”概念，就是这个意思，因为这行语句是在枚举 OCBool 中的，其上下文就是 OCBool 的定义体，编译器当然知道.ocFalse 就是 OCBool.ocFalse 了，所以这里直接点语法，非常整齐。
现在我们可以使用如下方法使用这个 Bool 类型。

#####代码示例如下：

```swift
var result:OCBool = OCBool()
var result1:OCBool = .ocTrue
```

####支持基本布尔型初始化 {#init-by-bool}

正如上述代码所述，我们只能通过类型或者枚举项目赋值，这是组合类型的用法，但是编码的日子里，我们总是希望和 true，false 直接打交道，也就是说，我们希望这么做，
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

- 代码中的第11行是重点，我的类型 OCBool 支持了 BooleanLiteralConvertible 协议，这个协到底是干什么的呢，小伙伴们在 Xcode 代码编辑器，按住 Command 键，然后点击第11行中的 BooleanLiteralConvertible 协议名，则会进入它的定义，
#####其定义如下：

```swift
protocol BooleanLiteralConvertible {
    typealias BooleanLiteralType
    class func convertFromBooleanLiteral(value: BooleanLiteralType) -> Self
}
```

- 这个定义中有个类方法 convertFromBooleanLiteral，它的参数为 BooleanLiteralType 类型，也就是我传入的 Bool 类型， 且返回值为实现这个协议的类型本身，在我们的 OCBool 类型中，其返回值就是 OCBool 本身。经过这个定义，我们可以直接对 OCBool 类型直接进行布尔字面量初始化了。

####支持 Bool 类型判断 {#condition-by-bool}

小伙伴们不安分， 肯定想着我怎么用它实现逻辑判断，所以如果你这么写，

#####代码示例如下：

```swift
var isSuccess:OCBool = true

if isSuccess {
    println("老码请你吃火锅！")
}
```

你永远吃不到老码的火锅，因为这里编译器会咆哮：

```
/Users/tyrion-OldCoder/Documents/Learning/BoolType/BoolType/main.swift:27:4: Type 'OCBool' does not conform to protocol 'LogicValue'
```

OCBool 现在只能用 bool 类型初始化，而不能直接返回 bool 型，小火把们还记得在《老码说编程之白话 Swift 江湖》中，老码多次提到，妈妈再也不担心我们 if a = 1{}的写法了， 因为等号不支持值返回了， 所以在 if 判断是后面的条件必须有返回值，OCBool 没有，所以编译器哭了。我们解决这个问题。

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
    println("老码请你吃火锅！")
}
```

####运行结果如下：

```
Hello, World!
老码请你吃火锅！
Program ended with exit code: 0
```

#####注意：

- 如果小伙伴们现在用的是 Beta 版的 Xcode，注意苹果官方 Blog 中，在代码第17行如果在 Xcode Beta4下是错误的，这里的协议是，LogicValue 而不是 BooleanVue，所以记得看错误提示才是好习惯。
- 注意代码第34行，完美支持 if 判断，且输出结果为“老码请你吃火锅”，老码也是说说而已，请不要当真。

####支持兼容各们各派的类型 {#support-all-type}

小伙伴们，江湖风险，门派众多，老码有自己的 OCBool 类型，可能嵩山少林有自己的 SSBool 类型，甚至连郭美美都可能有自己的 MMBool 类型，所以 OCBool 必须能够识别这些类型，这些各门各派的类型，只要支持 LogicValue 协议，就应该可以被识别，看老码怎么做，

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
    println("老码没钱，郭美美请你吃火锅！")
}
```

#####代码运行结果如下：

```
Hello, World!
老码没钱，郭美美请你吃火锅！
Program ended with exit code: 0
```

漂亮！我们的 OCBool 类型现在支持了所有的逻辑变量初始化。

#####注意：

- 代码中第2行：“_”下横杠的用法，这是一个功能强大的小强，在此的目的是屏蔽外部参数名，所以小伙伴们可以直接：var ocResult:OCBool = OCBool(mmResult)而不是：var ocResult:OCBool = OCBool(v: mmResult)，小伙伴们惊呆了！这个 init 函数中本来就没有外部参数名啊，还记得老码在书里说过没，Swift 的初始化函数会默认使用内部参数名，作为外部参数名。

####完善 OCBool 的布尔基因体系： {#make-up-type}

小伙伴们，bool 类型的价值就是在于各种判断，诸如==，!=, &，|,^,!，以及各种组合逻辑运算，我们 OCBool 也要具备这些功能，否则就会基因缺陷，且看老码如何实现：

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
    println("人生赢家，就像老码一样！")
}else
{
    println("人生最苦的事事，人死了钱没花了，人生最苦的事是，人活着，钱没了！")
}
```

好了，到这里就到这里了，窗外的雷声叫醒了老码，现在应该去吃饭了，以上老码给大家展示了如果制造一个自己的类型，记得老码的示例是在 Xcode6 Beta4下测试的，至于 Beta5的改变还没有涉及，小伙伴们要好生练习，以后各种自定类型都是基于这个思想。还有这个章节不是老码的原创，老码认真的阅读了苹果的官方博客，且自己的练习总结，如果小伙伴们费了吃奶的劲还是看不懂，请找度娘谷歌，还是看不懂请到老码官方微博：http://weibo.com/u/5241713117咆哮。

本文由翻译自 Apple Swift Blog ：https://developer.apple.com/swift/blog/?id=8
