> 翻譯：[Hawstein](https://github.com/Hawstein)  
> 校對：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

# 特性
-----------------

本頁內容包括：

- [聲明特性](#declaration_attributes)
- [類型特性](#type_attributes)

特性提供了關於聲明和類型的更多信息。在Swift中有兩類特性，用於修飾聲明的以及用於修飾類型的。例如，`required`特性，當應用於一個類的指定或便利初始化器聲明時，表明它的每個子類都必須實現那個初始化器。再比如`noreturn`特性，當應用於函數或方法類型時，表明該函數或方法不會返回到它的調用者。

通過以下方式指定一個特性：符號`@`後面跟特性名，如果包含參數，則把參數帶上：

> @`attribute name`  
> @`attribute name`(`attribute arguments`)  

有些聲明特性通過接收參數來指定特性的更多信息以及它是如何修飾一個特定的聲明的。這些特性的參數寫在小括號內，它們的格式由它們所屬的特性來定義。

<a name="declaration_attributes"></a>
## 聲明特性

聲明特性只能應用於聲明。然而，你也可以將`noreturn`特性應用於函數或方法類型。

`assignment`

該特性用於修飾重載了復合賦值運算符的函數。重載了復合賦值運算符的函數必需將它們的初始輸入參數標記為`inout`。如何使用`assignment`特性的一個例子，請見：[復合賦值運算符]()。

`class_protocol`

該特性用於修飾一個協議表明該協議只能被類類型採用[待改：adopted]。

如果你用`objc`特性修飾一個協議，`class_protocol`特性就會隱式地應用到該協議，因此無需顯式地用`class_protocol`特性標記該協議。

`exported`

該特性用於修飾導入聲明，以此來導出已導入的模塊，子模塊，或當前模塊的聲明。如果另一個模塊導入了當前模塊，那麼那個模塊可以訪問當前模塊的導出項。

`final`

該特性用於修飾一個類或類中的屬性，方法，以及下標成員。如果用它修飾一個類，那麼這個類則不能被繼承。如果用它修飾類中的屬性，方法或下標，則表示在子類中，它們不能被重寫。

`lazy`

該特性用於修飾類或結構體中的存儲型變量屬性，表示該屬性的初始值最多只被計算和存儲一次，且發生在第一次訪問它時。如何使用`lazy`特性的一個例子，請見：[惰性存儲型屬性]()。

`noreturn`

該特性用於修飾函數或方法聲明，表明該函數或方法的對應類型，`T`，是`@noreturn T`。你可以用這個特性修飾函數或方法的類型，這樣一來，函數或方法就不會返回到它的調用者中去。

對於一個沒有用`noreturn`特性標記的函數或方法，你可以將它重寫(override)為用該特性標記的。相反，對於一個已經用`noreturn`特性標記的函數或方法，你則不可以將它重寫為沒使用該特性標記的。相同的規則試用於當你在一個comforming類型中實現一個協議方法時。

`NSCopying`

該特性用於修飾一個類的存儲型變量屬性。該特性將使屬性的setter與屬性值的一個副本合成，由`copyWithZone`方法返回，而不是屬性本身的值。該屬性的類型必需遵循`NSCopying`協議。

`NSCopying`特性的行為與Objective-C中的`copy`特性相似。

`NSManaged`

該特性用於修飾`NSManagedObject`子類中的存儲型變量屬性，表明屬性的存儲和實現由Core Data在運行時基於相關實體描述動態提供。

`objc`

該特性用於修飾任意可以在Objective-C中表示的聲明，比如，非嵌套類，協議，類和協議中的屬性和方法（包含getter和setter），初始化器，析構器，以下下標。`objc`特性告訴編譯器該聲明可以在Objective-C代碼中使用。

如果你將`objc`特性應用於一個類或協議，它也會隱式地應用於那個類或協議的成員。對於標記了`objc`特性的類，編譯器會隱式地為它的子類添加`objc`特性。標記了`objc`特性的協議不能繼承自沒有標記`objc`的協議。

`objc`特性有一個可選的參數，由標記符組成。當你想把`objc`所修飾的實體以一個不同的名字暴露給Objective-C，你就可以使用這個特性參數。你可以使用這個參數來命名類，協議，方法，getters，setters，以及初始化器。下面的例子把`ExampleClass`中`enabled`屬性的getter暴露給Objective-C，名字是`isEnabled`，而不是它原來的屬性名。

```swift
@objc
class ExampleClass {
    var enabled: Bool {
    @objc(isEnabled) get {
        // Return the appropriate value
    }
    }
}
```

`optional`

用該特性修飾協議的屬性，方法或下標成員，表示實現這些成員並不需要一致性類型（conforming type）。

你只能用`optional`特性修飾那些標記了`objc`特性的協議。因此，只有類類型可以adopt和comform to那些包含可選成員需求的協議。更多關於如何使用`optional`特性以及如何訪問可選協議成員的指導，例如，當你不確定一個conforming類型是否實現了它們，請見：[可選協議需求]()。

`required`

用該特性修飾一個類的指定或便利初始化器，表示該類的所有子類都必需實現該初始化器。

加了該特性的指定初始化器必需顯式地實現，而便利初始化器既可顯式地實現，也可以在子類實現了超類所有指定初始化器後繼承而來（或者當子類使用便利初始化器重寫了指定初始化器）。

### Interface Builder使用的聲明特性

Interface Builder特性是Interface Builder用來與Xcode同步的聲明特性。Swift提供了以下的Interface Builder特性：`IBAction`，`IBDesignable`，`IBInspectable`，以及`IBOutlet`。這些特性與Objective-C中對應的特性在概念上是相同的。

`IBOutlet`和`IBInspectable`用於修飾一個類的屬性聲明；`IBAction`特性用於修飾一個類的方法聲明；`IBDesignable`用於修飾類的聲明。

<a name="type_attributes"></a>
## 類型特性

類型特性只能用於修飾類型。然而，你也可以用`noreturn`特性去修飾函數或方法聲明。

`auto_closure`

這個特性通過自動地將表達式封閉到一個無參數閉包中來延遲表達式的求值。使用該特性修飾無參的函數或方法類型，返回表達式的類型。一個如何使用`auto_closure`特性的例子，見[函數類型]()

`noreturn`

該特性用於修飾函數或方法的類型，表明該函數或方法不會返回到它的調用者中去。你也可以用它標記函數或方法的聲明，表示函數或方法的相應類型，`T`，是`@noreturn T`。

> 特性語法  
> *特性* → **@** [*特性名*](..\chapter3\06_Attributes.html#attribute_name) [*特性參數子句*](..\chapter3\06_Attributes.html#attribute_argument_clause) _可選_  
> *特性名* → [*標識符*](LexicalStructure.html#identifier)  
> *特性參數子句* → **(** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可選_ **)**  
> *特性(Attributes)列表* → [*特色*](..\chapter3\06_Attributes.html#attribute) [*特性(Attributes)列表*](..\chapter3\06_Attributes.html#attributes) _可選_  
> *平衡令牌列表* → [*平衡令牌*](..\chapter3\06_Attributes.html#balanced_token) [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可選_  
> *平衡令牌* → **(** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可選_ **)**  
> *平衡令牌* → **[** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可選_ **]**  
> *平衡令牌* → **{** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可選_ **}**  
> *平衡令牌* → **任意標識符, 關鍵字, 字面量或運算符**  
> *平衡令牌* → **任意標點除了(, ), [, ], {, 或 }**
