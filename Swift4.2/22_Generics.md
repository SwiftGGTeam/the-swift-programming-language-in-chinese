# 泛型

[原文链接](https://docs.swift.org/swift-book/LanguageGuide/Generics.html)

*泛型代码*让你能根据自定义的需求，编写出适用于任意类型的、灵活可复用的函数及类型。你可避免编写重复的代码，用一种清晰抽象的方式来表达代码的意图。

泛型是 Swift 最强大的特性之一，很多 Swift 标准库是基于泛型代码构建的。实际上，即使你没有意识到，你也一直在*语言指南*中使用泛型。例如，Swift 的 **Array** 和 **Dictionary** 都是泛型集合。你可以创建一个 **Int** 类型数组，也可创建一个 **String** 类型数组，甚至可以是任意其他 Swift 类型的数组。同样，你也可以创建一个存储任意指定类型的字典，并对该类型没有限制。

## 泛型解决的问题

下面是一个标准的非泛型函数 **swapTwoInts(_:_:)**，用来交换两个 **Int** 值：

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```
这个函数使用输入输出参数（**inout**）来交换 **a** 和 **b** 的值，具体请参考[输入输出参数](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#ID173)
