<!--
要翻译的文件：https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/swift-6-beta-translation/swift-6-beta.docc/ReferenceManual/Declarations.md
Swift 文档源文件地址：https://docs.swift.org/swift-book/documentation/the-swift-programming-language/declarations
翻译估计用时：⭐️⭐️⭐️⭐️⭐️
-->

# Declarations

Introduce types, operators, variables, and other names and constructs.
引入类型、运算符、变量以及其他名称和构造。

一个*声明*将一个新名称或构造引入到你的程序中。例如，你使用声明来引入函数和方法，引入变量和常量，以及定义枚举、结构体、类和协议类型。你还可以使用声明来扩展现有具名类型的行为，并将其他地方声明的符号引入到你的程序中。

在 Swift 中，大多数声明也是定义，因为它们在声明的同时被实现或初始化。也就是说，由于协议不实现其成员，大多数协议成员仅仅是声明。为了方便起见，并且因为在 Swift 中这种区别并不是那么重要，术语*声明*涵盖了声明和定义。

> 声明的语法：
>
> *声明* → *导入声明*
> *声明* → *常量声明*
> *声明* → *变量声明*
> *声明* → *类型别名声明*
> *声明* → *函数声明*
> *声明* → *枚举声明*
> *声明* → *结构体声明*
> *声明* → *类声明*
> *声明* → *actor 声明*
> *声明* → *协议声明*
> *声明* → *构造器声明*
> *声明* → *析构器声明*
> *声明* → *扩展声明*
> *声明* → *下标声明*
> *声明* → *宏声明*
> *声明* → *操作符声明*
> *声明* → *优先级组声明*

## 顶级代码

Swift 源文件中的顶级代码由零个或多个语句、声明和表达式组成。默认情况下，在源文件顶层声明的变量、常量和其他命名声明可以被同一模块中每个源文件的代码访问。您可以通过使用访问级别修饰符来覆盖此默认行为，具体说明见 <doc:Declarations#Access-Control-Levels>。

有两种类型的顶级代码：顶级声明和可执行的顶级代码。顶级声明仅由声明组成，允许出现在所有 Swift 源文件中。可执行的顶级代码包含语句和表达式，而不仅仅是声明，仅允许作为程序的顶级入口点。

您编译的 Swift 代码可以包含最多以下一种方法来标记顶级入口点，无论代码如何组织成文件和模块：`main` 特性，`NSApplicationMain` 特性，`UIApplicationMain` 特性，`main.swift` 文件，或包含顶级可执行代码的文件。

> 顶级声明的语法：
>
> *顶级声明* → *语句*_?_

## 代码块

一个*代码块*被各种声明和控制结构用来将语句组合在一起。它具有以下形式：

```swift
{
   <#statements#>
}
```

代码块中的*语句*包括声明、表达式和其他类型的语句，并按它们在源代码中出现的顺序执行。
<!--
  TR: What exactly are the scope rules for Swift?
-->

<!--
  TODO: Discuss scope.  I assume a code block creates a new scope?
-->

> 代码块的语法：
>
> *代码块* → **`{`** *语句*_?_ **`}`**

## Import Declaration

一个*导入声明*让你访问在当前文件外部声明的符号。基本形式导入整个模块；它由 `import` 关键字后跟模块名称组成：

```swift
import <#module#>
```

提供更多细节可以限制导入哪些符号——你可以指定特定的子模块或模块或子模块内的特定声明。当使用这种详细形式时，只有被导入的符号（而非声明它的模块）在当前作用域中可用。

```swift
import <#import kind#> <#module#>.<#symbol name#>
import <#module#>.<#submodule#>
```

<!--
  TODO: Need to add more to this section.
-->

> 导入声明的语法：
>
> *导入声明* → *特性*_?_ **`导入`** *导入类型*_?_ *导入路径*
>
> *导入类型* → **`类型类型别名`** | **`结构体`** | **`类`** | **`枚举`** | **`协议`** | **`常量`** | **`变量`** | **`函数`** \
> *导入路径* → *标识符* | *标识符* **`.`** *导入路径*

## 常量声明

*常量声明*在您的程序中引入一个名为值的常量。常量声明使用 `let` 关键字声明，具有以下形式：

```swift
let <#constant name#>: <#type#> = <#expression#>
```

常量声明定义了*常量名称*与构造器*表达式*的值之间的不可变绑定；一旦常量的值被设置，就无法更改。也就是说，如果常量是用类对象初始化的，对象本身可以改变，但常量名称与它所指向的对象之间的绑定不能改变。

当在全局范围内声明常量时，必须用一个值进行初始化。当在函数或方法的上下文中发生常量声明时，可以稍后初始化，只要在第一次读取其值之前保证已设置值。如果编译器能够证明常量的值从未被读取，则不要求该常量必须设置值。此分析称为*确定初始化*——编译器证明在读取之前值已被确定设置。

> 注意：确定性初始化无法构建需要领域知识的证明，并且它在条件语句中跟踪状态的能力是有限的。如果您可以确定常量始终有一个值，但编译器无法证明这一点，请尝试简化设置该值的代码路径，或改用变量声明。

<!--
In the most general case,
DI reduces to the halting problem,
as shown by Rice's theorem.
-->

当常量声明出现在类或结构体声明的上下文中时，它被视为一个*常量属性*。常量声明不是计算属性，因此没有 getter 或 setter。

如果常量声明的*常量名称*是一个元组模式，则元组中每个项的名称都绑定到构造器*表达式*中相应的值。

```swift
let (firstNumber, secondNumber) = (10, 42)
```

<!--
  - test: `constant-decl`

  ```swifttest
  -> let (firstNumber, secondNumber) = (10, 42)
  ```
-->

在这个例子中，`firstNumber` 是值 `10` 的命名常量，而 `secondNumber` 是值 `42` 的命名常量。现在这两个常量可以独立使用：

```swift
print("The first number is \(firstNumber).")
// Prints "The first number is 10."
print("The second number is \(secondNumber).")
// Prints "The second number is 42."
```

<!--
  - test: `constant-decl`

  ```swifttest
  -> print("The first number is \(firstNumber).")
  <- The first number is 10.
  -> print("The second number is \(secondNumber).")
  <- The second number is 42.
  ```
-->
在常量声明中，当可以推断出*常量名称*的类型时，类型注释（`:` *类型*）是可选的，如<doc:Types#Type-Inference>中所述。

要声明一个常量类型属性，请使用 `static` 声明修饰符标记该声明。类的常量类型属性总是隐式为 final；您不能使用 `class` 或 `final` 声明修饰符来允许或禁止子类重写。类型属性的讨论请参见 <doc:Properties#Type-Properties>。

<!--
  - test: `class-constants-cant-have-class-or-final`

  ```swifttest
  -> class Super { class let x = 10 }
  !$ error: class stored properties not supported in classes; did you mean 'static'?
  !! class Super { class let x = 10 }
  !!               ~~~~~     ^
  -> class S { static final let x = 10 }
  !$ error: static declarations are already final
  !! class S { static final let x = 10 }
  !!                  ^~~~~~
  !!-
  ```
-->

有关常量的更多信息以及何时使用它们的指导，请参见 <doc:TheBasics#Constants-and-Variables> 和 <doc:Properties#Stored-Properties>。

> 常量声明的语法：
>
> *常量声明* → *属性*_?_ *声明修饰符*_?_ **`let`** *模式构造器列表*
>
> *模式构造器列表* → *模式构造器* | *模式构造器* **`,`** *模式构造器列表* \
> *模式构造器* → *模式* *构造器*_?_ \
> *构造器* → **`=`** *表达式*

## 变量声明

*变量声明*在您的程序中引入了一个名为值的变量，并使用 `var` 关键字进行声明。

变量声明有几种形式，用于声明不同类型的命名可变值，包括存储变量和计算变量及属性、存储变量和属性观察者，以及静态变量属性。使用的适当形式取决于变量声明的范围和您打算声明的变量类型。

> 注意：您还可以在协议声明的上下文中声明属性，如<doc:Declarations#Protocol-Property-Declaration> 中所述。

您可以通过在子类的属性声明中标记 `override` 声明修饰符来重写属性，如 <doc:Inheritance#Overriding> 中所述。

### 存储变量和存储变量属性

以下形式声明了一个存储变量或存储变量属性：

```swift
var <#variable name#>: <#type#> = <#expression#>
```

您可以在全局范围、函数的局部范围或类或结构体声明的上下文中定义这种形式的变量声明。当这种形式的变量声明在全局范围或函数的局部范围内声明时，它被称为*存储变量*。当它在类或结构体声明的上下文中声明时，它被称为*存储变量属性*。

构造器*表达式*不能出现在协议声明中，但在所有其他上下文中，构造器*表达式*是可选的。也就是说，如果没有构造器*表达式*，变量声明必须包含显式类型注释（`:` *类型*）。

与常量声明一样，如果变量声明省略了构造器*表达式*，则在第一次读取该变量之前必须为其设置一个值。同样，像常量声明一样，如果*变量名*是一个元组模式，则元组中每个项的名称都绑定到构造器*表达式*中的相应值。

如其名称所示，存储变量或存储变量属性的值存储在内存中。

### 计算变量和计算属性

以下形式声明了一个计算变量或计算属性：

```swift
var <#variable name#>: <#type#> {
   get {
      <#statements#>
   }
   set(<#setter name#>) {
      <#statements#>
   }
}
```

您可以在全局范围、函数的局部范围或类、结构体、枚举或扩展声明的上下文中定义这种形式的变量声明。当这种形式的变量声明在全局范围或函数的局部范围内声明时，它被称为*计算变量*。当它在类、结构体或扩展声明的上下文中声明时，它被称为*计算属性*。

getter 用于读取值，setter 用于写入值。setter 子句是可选的，当只需要 getter时，可以省略两个子句，直接返回请求的值，如 <doc:Properties#Read-Only-Computed-Properties> 中所述。但如果提供了 setter 子句，则必须同时提供 getter 子句。

*setter 名称*和括号是可选的。如果您提供了 setter 名称，它将用作 setter 参数的名称。如果您不提供 setter 名称，setter 的默认参数名称是 `newValue`，如 <doc:Properties#Shorthand-Setter-Declaration> 中所述。

与存储的命名值和存储的变量属性不同，计算得出的命名值或计算得出的属性的值并不存储在内存中。

有关更多信息以及查看计算属性的示例，请参见 <doc:Properties#Computed-Properties>。

### 存储变量观察者和属性观察者

您还可以使用 `willSet` 和 `didSet` 观察者声明一个存储变量或属性。带有观察者的存储变量或属性具有以下形式：

```swift
var <#variable name#>: <#type#> = <#expression#> {
    willSet(<#setter name#>) {
        <#statements#>
    }
    didSet(<#setter name#>) {
        <#statements#>
    }
}
```

您可以在全局范围、函数的局部范围或类或结构体声明的上下文中定义这种变量声明形式。当这种形式的变量声明在全局范围或函数的局部范围内声明时，观察者被称为*存储变量观察者*。当它在类或结构声明的上下文中声明时，观察者被称为*属性观察者*。

您可以为任何存储属性添加属性观察者。您还可以通过在子类中重写属性，为任何继承属性（无论是存储的还是计算的）添加属性观察者，如 <doc:Inheritance#Overriding-Property-Observers> 中所述。

构造器*表达式*在类或结构体声明的上下文中是可选的，但在其他地方是必需的。当类型可以从构造器*表达式*中推断时，*类型*标注是可选的。该表达式在您第一次读取属性值时被评估。如果您在读取属性之前覆盖了属性的初始值，则在第一次写入属性之前会评估该表达式。

<!--
  - test: `overwriting-property-without-writing`

  ```swifttest
  >> func loudConst(_ x: Int) -> Int {
  >>     print("initial value:", x)
  >>     return x
  >> }
  >> var x = loudConst(10)
  >> x = 20
  >> print("x:", x)
  << initial value: 10
  << x: 20
  >> var y = loudConst(100)
  >> print("y:", y)
  << initial value: 100
  << y: 100
  ```
-->

`willSet` 和 `didSet` 观察者提供了一种观察（并适当地响应）变量或属性值被设置时的方式。当变量或属性首次初始化时，观察者不会被调用。相反，它们仅在初始化上下文之外设置值时被调用。

`willSet` 观察者在变量或属性的值被设置之前被调用。新值作为常量传递给 `willSet` 观察者，因此在 `willSet` 子句的实现中无法更改。`didSet` 观察者在新值被设置后立即被调用。与 `willSet` 观察者不同，变量或属性的旧值会传递给 `didSet` 观察者，以防你仍然需要访问它。也就是说，如果你在其自己的 `didSet` 观察者子句中给变量或属性赋值，那么你赋的这个新值将替代刚刚设置并传递给 `willSet` 观察者的值。

*setter 名称*和 `willSet` 与 `didSet` 子句中的括号是可选的。如果提供了 setter 名称，它们将作为 `willSet` 和 `didSet` 观察者的参数名称。如果不提供 setter 名称，`willSet` 观察者的默认参数名称是 `newValue`，而 `didSet` 观察者的默认参数名称是 `oldValue`。

`didSet` 子句在提供 `willSet` 子句时是可选的。同样，在提供 `didSet` 子句时，`willSet` 子句也是可选的。

如果 `didSet` 观察者的主体引用了旧值，则在调用观察者之前会调用 getter，以使旧值可用。否则，新的值会被存储，而不调用超类的 getter。下面的示例显示了一个由超类定义并被其子类重写以添加观察者的计算属性。

```swift
class Superclass {
    private var xValue = 12
    var x: Int {
        get { print("Getter was called"); return xValue }
        set { print("Setter was called"); xValue = newValue }
    }
}

// This subclass doesn't refer to oldValue in its observer, so the
// superclass's getter is called only once to print the value.
class New: Superclass {
    override var x: Int {
        didSet { print("New value \(x)") }
    }
}
let new = New()
new.x = 100
// Prints "Setter was called"
// Prints "Getter was called"
// Prints "New value 100"

// This subclass refers to oldValue in its observer, so the superclass's
// getter is called once before the setter, and again to print the value.
class NewAndOld: Superclass {
    override var x: Int {
        didSet { print("Old value \(oldValue) - new value \(x)") }
    }
}
let newAndOld = NewAndOld()
newAndOld.x = 200
// Prints "Getter was called"
// Prints "Setter was called"
// Prints "Getter was called"
// Prints "Old value 12 - new value 200"
```

<!--
  - test: `didSet-calls-superclass-getter`

  ```swifttest
  -> class Superclass {
         private var xValue = 12
         var x: Int {
             get { print("Getter was called"); return xValue }
             set { print("Setter was called"); xValue = newValue }
         }
     }
  ---
  // This subclass doesn't refer to oldValue in its observer, so the
  // superclass's getter is called only once to print the value.
  -> class New: Superclass {
         override var x: Int {
             didSet { print("New value \(x)") }
         }
     }
     let new = New()
     new.x = 100
  <- Setter was called
  <- Getter was called
  <- New value 100
  ---
  // This subclass refers to oldValue in its observer, so the superclass's
  // getter is called once before the setter, and again to print the value.
  -> class NewAndOld: Superclass {
         override var x: Int {
             didSet { print("Old value \(oldValue) - new value \(x)") }
         }
     }
     let newAndOld = NewAndOld()
     newAndOld.x = 200
  <- Getter was called
  <- Setter was called
  <- Getter was called
  <- Old value 12 - new value 200
  ```
-->

有关更多信息以及如何使用属性观察者的示例，请参见 <doc:Properties#Property-Observers>。
<!--
  - test: `cant-mix-get-set-and-didSet`

  ```swifttest
  >> struct S {
  >>     var x: Int {
  >>         get { print("S getter"); return 12 }
  >>         set { return }
  >>         didSet { print("S didSet") }
  >>     }
  >> }
  !$ error: 'didSet' cannot be provided together with a getter
  !! didSet { print("S didSet") }
  !! ^
  ```
-->

### 类型变量属性

要声明一个类型变量属性，请使用 `static` 声明修饰符标记声明。类可以使用 `class` 声明修饰符标记类型计算属性，以允许子类覆盖超类的实现。类型属性的讨论请参见 <doc:Properties#Type-Properties>。

> 变量声明的语法：
>
> *变量-声明* → *变量-声明-头* *模式-初始化-列表* \
> *变量-声明* → *变量-声明-头* *变量-名* *类型-注解* *代码-块* \
> *变量-声明* → *变量-声明-头* *变量-名* *类型-注解* *getter-setter-块* \
> *变量-声明* → *变量-声明-头* *变量-名* *类型-注解* *getter-setter-关键字-块* \
> *变量-声明* → *变量-声明-头* *变量-名* *构造器* *willSet-didSet-块* \
> *变量-声明* → *变量-声明-头* *变量-名* *类型-注解* *构造器*_?_ *willSet-didSet-块*
>
> *变量-声明-头* → *属性*_?_ *声明-修饰符*_?_ **`var`** \
> *变量-名* → *标识符*
>
> *getter-setter-块* → *代码块* \
> *getter-setter-块* → **`{`** *getter-子句* *setter-子句*_?_ **`}`** \
> *getter-setter-块* → **`{`** *setter-子句* *getter-子句* **`}`** \
> *getter-子句* → *特性*_?_ *可变-修饰符*_?_ **`get`** *代码-块* \
> *setter-子句* → *特性*_?_ *可变-修饰符*_?_ **`set`** *setter-名称*_?_ *代码-块* \
> *setter-名称* → **`(`** *标识符* **`)`**
>
> *getter-setter-关键字-块* → **`{`** *getter-关键字-子句* *setter-关键字-子句*_?_ **`}`** \
> *getter-setter-关键字-块* → **`{`** *setter-关键字-子句* *getter-关键字-子句* **`}`** \
> *getter-关键字-子句* → *属性*_?_ *可变-修饰符*_?_ **`get`** \
> *setter-关键字-子句* → *属性*_?_ *可变-修饰符*_?_ **`set`**
>
> *willSet-didSet-block* → **`{`** *willSet-子句* *didSet-子句*_?_ **`}`** \
> *willSet-didSet-block* → **`{`** *didSet-子句* *willSet-子句*_?_ **`}`** \
> *willSet-子句* → *特性*_?_ **`willSet`** *setter-名称*_?_ *代码-块* \
> *didSet-子句* → *特性*_?_ **`didSet`** *setter-名称*_?_ *代码-块*

<!--
  NOTE: Type annotations are required for computed properties -- the
  types of those properties aren't computed/inferred.
-->

## 类型别名声明

*类型别名声明*将现有类型的命名别名引入到您的程序中。类型别名声明使用 `typealias` 关键字声明，具有以下形式：

```swift
typealias <#name#> = <#existing type#>
```

在声明类型别名后，别名*名称*可以在程序中的任何地方替代*现有类型*使用。*现有类型*可以是命名类型或复合类型。类型别名不会创建新类型；它们只是允许一个名称引用现有类型。

A type alias declaration can use generic parameters to give a name to an existing generic type. The type alias can provide concrete types for some or all of the generic parameters of the existing type. For example:
类型别名声明可以使用泛型参数为现有的泛型类型命名。类型别名可以为现有类型的某些或所有泛型参数提供具体类型。例如：

```swift
typealias StringDictionary<Value> = Dictionary<String, Value>

// The following dictionaries have the same type.
var dictionary1: StringDictionary<Int> = [:]
var dictionary2: Dictionary<String, Int> = [:]
```

<!--
  - test: `typealias-with-generic`

  ```swifttest
  -> typealias StringDictionary<Value> = Dictionary<String, Value>
  ---
  // The following dictionaries have the same type.
  -> var dictionary1: StringDictionary<Int> = [:]
  -> var dictionary2: Dictionary<String, Int> = [:]
  ```
-->

当声明一个带有泛型参数的类型别名时，这些参数的约束必须与现有类型的泛型参数的约束完全匹配。例如：

```swift
typealias DictionaryOfInts<Key: Hashable> = Dictionary<Key, Int>
```

<!--
  - test: `typealias-with-generic-constraint`

  ```swifttest
  -> typealias DictionaryOfInts<Key: Hashable> = Dictionary<Key, Int>
  ```
-->

因为类型别名和现有类型可以互换使用，类型别名不能引入额外的泛型约束。

类型别名可以通过省略声明中的所有泛型参数来转发现有类型的泛型参数。例如，这里声明的 `Diccionario` 类型别名具有与 `Dictionary` 相同的泛型参数和约束。

```swift
typealias Diccionario = Dictionary
```

<!--
  - test: `typealias-using-shorthand`

  ```swifttest
  -> typealias Diccionario = Dictionary
  ```
-->

<!--
  Note that the compiler doesn't currently enforce this. For example, this works but shouldn't:
  typealias ProvidingMoreSpecificConstraints<T: Comparable & Hashable> = Dictionary<T, Int>
-->

<!--
  Things that shouldn't work:
  typealias NotRedeclaringSomeOfTheGenericParameters = Dictionary<T, String>
  typealias NotRedeclaringAnyOfTheGenericParameters = Dictionary
  typealias NotProvidingTheCorrectConstraints<T> = Dictionary<T, Int>
  typealias ProvidingMoreSpecificConstraints<T: Comparable & Hashable> = Dictionary<T, Int>
-->
在协议声明中，类型别名可以为经常使用的类型提供一个更短和更方便的名称。例如：

```swift
protocol Sequence {
    associatedtype Iterator: IteratorProtocol
    typealias Element = Iterator.Element
}

func sum<T: Sequence>(_ sequence: T) -> Int where T.Element == Int {
    // ...
}
```

<!--
  - test: `typealias-in-protocol`

  ```swifttest
  -> protocol Sequence {
         associatedtype Iterator: IteratorProtocol
         typealias Element = Iterator.Element
     }
  ---
  -> func sum<T: Sequence>(_ sequence: T) -> Int where T.Element == Int {
         // ...
  >>     return 9000
     }
  ```
-->

没有这种类型别名，`sum` 函数必须将关联类型称为 `T.Iterator.Element`，而不是 `T.Element`。

另见 <doc:Declarations#Protocol-Associated-Type-Declaration>。

> 类型别名声明的语法：
>
> *类型别名-声明* → *属性*_?_ *访问-级别-修饰符*_?_ **`typealias`** *typealias-名称* *泛型-参数-子句*_?_ *typealias-赋值* \
> *typealias-名称* → *标识符* \
> *typealias-赋值* → **`=`** *类型*

<!--
  Old grammar:
  typealias-declaration -> typealias-head typealias-assignment
  typealias-head -> ``typealias`` typealias-name type-inheritance-clause-OPT
  typealias-name -> identifier
  typealias-assignment -> ``=`` type
-->

## 函数声明

*函数声明*将一个函数或方法引入到你的程序中。在类、结构体、枚举或协议的上下文中声明的函数被称为*方法*。函数声明使用 `func` 关键字声明，具有以下形式：

```swift
func <#function name#>(<#parameters#>) -> <#return type#> {
    <#statements#>
}
```

如果函数的返回类型是 `Void` ，则可以省略返回类型，如下所示：

```swift
func <#function name#>(<#parameters#>) {
    <#statements#>
}
```


每个参数的类型必须明确指定，而不能被推断出来。如果在参数类型前写上 `inout`，则该参数可以在函数的作用域内被修改。关于输入输出参数的详细讨论请参见下面的 <doc:Declarations#In-Out-Parameters>。

如果一个函数声明中的*语句*只包含一个表达式，则默认返回该表达式的值。只有在表达式的类型和函数的返回类型不是 `Void`，并且不是像 `Never` 那样没有任何情况的枚举时，才会考虑这种隐式返回语法。

<!--
  As of Swift 5.3,
  the only way to make an uninhabited type is to create an empty enum,
  so just say that directly instead of using & defining the compiler jargon.
-->

函数可以使用元组类型作为返回类型来返回多个值。

<!--
  TODO: ^-- Add some more here.
-->

一个函数定义可以出现在另一个函数声明内部。这种函数被称为*嵌套函数*。

如果一个嵌套函数捕获了一个保证不会逃逸的值——例如一个 in-out 参数——或者作为一个非逃逸函数参数传递，那么这个嵌套函数就是非逃逸的。否则，嵌套函数就是逃逸的。

有关嵌套函数的讨论，请参见 <doc:Functions#Nested-Functions>。

### 参数名称

函数参数是一个以逗号分隔的列表，其中每个参数都有几种形式之一。在函数调用中，参数的顺序必须与函数声明中的参数顺序匹配。参数列表中最简单的项具有以下形式：

```swift
<#parameter name#>: <#parameter type#>
```

一个参数有一个名称，在函数体内使用，以及一个实参标签，在调用函数或方法时使用。默认情况下，参数名称也用作实参标签。例如：

```swift
func f(x: Int, y: Int) -> Int { return x + y }
f(x: 1, y: 2) // both x and y are labeled
```

<!--
  - test: `default-parameter-names`

  ```swifttest
  -> func f(x: Int, y: Int) -> Int { return x + y }
  >> let r0 =
  -> f(x: 1, y: 2) // both x and y are labeled
  >> assert(r0 == 3)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

您可以使用以下形式之一覆盖参数标签的默认行为：

```swift
<#argument label#> <#parameter name#>: <#parameter type#>
_ <#parameter name#>: <#parameter type#>
```


在参数名称之前添加一个名称为参数提供了一个显式的实参标签，该标签可以与参数名称不同。相应的参数在函数或方法调用中必须使用给定的实参标签。

在参数名称前加下划线（`_`）可以抑制参数标签。相应的参数在函数或方法调用中必须没有标签。

```swift
func repeatGreeting(_ greeting: String, count n: Int) { /* Greet n times */ }
repeatGreeting("Hello, world!", count: 2) //  count is labeled, greeting is not
```

<!--
  - test: `overridden-parameter-names`

  ```swifttest
  -> func repeatGreeting(_ greeting: String, count n: Int) { /* Greet n times */ }
  -> repeatGreeting("Hello, world!", count: 2) //  count is labeled, greeting is not
  ```
-->

### 参数修饰符

*参数修饰符*改变了参数传递给函数的方式。

```swift
<#argument label#> <#parameter name#>: <#parameter modifier#> <#parameter type#>
```

要使用参数修饰符，请在参数类型之前写 `inout`、`borrowing` 或 `consuming`。

```swift
func someFunction(a: inout A, b: consuming B, c: C) { ... }
```

#### 输入输出参数

默认情况下，Swift 中的函数参数是按值传递的：在函数内部所做的任何更改在调用者中不可见。要改为使用输入输出参数，您需要应用 `inout` 参数修饰符。

```swift
func someFunction(a: inout Int) {
    a += 1
}
```


在调用包含输入输出参数的函数时，输入输出参数必须以一个和号 (`&`) 开头，以标记该函数调用可以改变参数的值。

```swift
var x = 7
someFunction(&x)
print(x)  // Prints "8"
```

输入输出参数的传递方式如下：

1. 当函数被调用时，参数的值会被复制。
2. 在函数体内，副本被修改。
3. 当函数返回时，副本的值被赋给原始参数。

这种行为被称为 *copy-in copy-out* 或 *值传递*。例如，当一个计算属性或一个带观察者的属性作为输入输出参数传递时，它的 getter 在函数调用中被调用，而它的 setter 在函数返回时被调用。

作为一种优化，当参数是存储在内存物理地址中的值时，函数体内外使用相同的内存位置。优化后的行为被称为 *引用传递*; 它满足了 copy-in copy-out 模型的所有要求，同时消除了复制的开销。请使用 copy-in copy-out 给出的模型编写代码，而不依赖于引用传递优化，以便在有或没有优化的情况下都能正确运行。

在函数内，不要访问作为 in-out 参数传递的值，即使原始值在当前作用域中可用。访问原始值是对该值的同时访问，这违反了内存独占性。

```swift
var someValue: Int
func someFunction(a: inout Int) {
    a += someValue
}

// Error: This causes a runtime exclusivity violation
someFunction(&someValue)
```

出于同样的原因，您不能将相同的值传递给多个输入输出参数。

```swift
var someValue: Int
func someFunction(a: inout Int, b: inout Int) {
    a += b
    b += 1
}

// Error: Cannot pass the same value to multiple in-out parameters
someFunction(&someValue, &someValue)
```

有关内存安全和内存独占的更多信息，请参见 <doc:MemorySafety>。
<!--
  When the call-by-reference optimization is in play,
  it would happen to do what you want.
  But you still shouldn't do that --
  as noted above, you're not allowed to depend on
  behavioral differences that happen because of call by reference.
-->

A closure or nested function that captures an in-out parameter must be nonescaping. If you need to capture an in-out parameter without mutating it, use a capture list to explicitly capture the parameter immutably.
一个捕获输入输出参数的闭包或嵌套函数必须是非逃逸的。如果您需要捕获一个 in-out 参数而不对其进行修改，请使用捕获列表显式地以不可变方式捕获该参数。

```swift
func someFunction(a: inout Int) -> () -> Int {
    return { [a] in return a + 1 }
}
```

<!--
  - test: `explicit-capture-for-inout`

  ```swifttest
  -> func someFunction(a: inout Int) -> () -> Int {
         return { [a] in return a + 1 }
     }
  >> class C { var x = 100 }
  >> let c = C()
  >> let f = someFunction(a: &c.x)
  >> c.x = 200
  >> let r = f()
  >> print(r, r == c.x)
  << 101 false
  ```
-->

如果您需要捕获并修改一个 in-out 参数，请使用一个显式的局部副本，例如在多线程代码中，确保所有修改在函数返回之前都已完成。
```swift
func multithreadedFunction(queue: DispatchQueue, x: inout Int) {
    // Make a local copy and manually copy it back.
    var localX = x
    defer { x = localX }

    // Operate on localX asynchronously, then wait before returning.
    queue.async { someMutatingOperation(&localX) }
    queue.sync {}
}
```

<!--
  - test: `cant-pass-inout-aliasing`

  ```swifttest
  >> import Dispatch
  >> func someMutatingOperation(_ a: inout Int) {}
  -> func multithreadedFunction(queue: DispatchQueue, x: inout Int) {
        // Make a local copy and manually copy it back.
        var localX = x
        defer { x = localX }

        // Operate on localX asynchronously, then wait before returning.
        queue.async { someMutatingOperation(&localX) }
        queue.sync {}
     }
  ```
-->

有关输入输出参数的更多讨论和示例，请参见 <doc:Functions#In-Out-Parameters>。

<!--
  - test: `escaping-cant-capture-inout`

  ```swifttest
  -> func outer(a: inout Int) -> () -> Void {
         func inner() {
             a += 1
         }
         return inner
     }
  !$ error: escaping local function captures 'inout' parameter 'a'
  !! return inner
  !! ^
  !$ note: parameter 'a' is declared 'inout'
  !! func outer(a: inout Int) -> () -> Void {
  !! ^
  !$ note: captured here
  !! a += 1
  !! ^
  -> func closure(a: inout Int) -> () -> Void {
         return { a += 1 }
     }
  !$ error: escaping closure captures 'inout' parameter 'a'
  !! return { a += 1 }
  !! ^
  !$ note: parameter 'a' is declared 'inout'
  !! func closure(a: inout Int) -> () -> Void {
  !! ^
  !$ note: captured here
  !! return { a += 1 }
  !! ^
  ```
-->

#### 借用和消耗参数

默认情况下，Swift 使用一套规则在函数调用之间自动管理对象生命周期，在需要时复制值。默认规则旨在在大多数情况下最小化开销——如果您想要更具体的控制，可以应用 `borrowing` 或 `consuming` 参数修饰符。在这种情况下，使用 `copy` 显式标记复制操作。

无论您是否使用默认规则，Swift 确保在所有情况下对象的生命周期和所有权都得到正确管理。这些参数修饰符仅影响特定使用模式的相对效率，而不影响正确性。

<!--
TODO: Describe the default rules.
Essentially, inits and property setters are consuming,
and everything else is borrowing.
Where are copies implicitly inserted?
-->

`borrowing` 修饰符表示该函数不保留参数的值。在这种情况下，调用者保持对象的所有权，并对对象的生命周期负责。使用 `borrowing` 可以在函数仅暂时使用对象时最小化开销。

```swift
// `isLessThan` does not keep either argument
func isLessThan(lhs: borrowing A, rhs: borrowing A) -> Bool {
    ...
}
```

如果函数需要保持参数的值，例如，通过将其存储在全局变量中 --- 您可以使用 `copy` 明确地复制该值。

```swift
// As above, but this `isLessThan` also wants to record the smallest value
func isLessThan(lhs: borrowing A, rhs: borrowing A) -> Bool {
    if lhs < storedValue {
        storedValue = copy lhs
    } else if rhs < storedValue {
        storedValue = copy rhs
    }
    return lhs < rhs
}
```

相反，`consuming` 参数修饰符表示该函数拥有该值的所有权，负责在函数返回之前存储或销毁它。

```swift
// `store` keeps its argument, so mark it `consuming`
func store(a: consuming A) {
    someGlobalVariable = a
}
```

使用 `consuming` 可以在调用者在函数调用后不再需要使用该对象时，最小化开销。

```swift
// Usually, this is the last thing you do with a value
store(a: value)
```

如果在函数调用后继续使用可复制对象，编译器会在函数调用之前自动复制该对象。

```swift
// The compiler inserts an implicit copy here
store(a: someValue)  // This function consumes someValue
print(someValue)  // This uses the copy of someValue
```

与 `inout` 不同，`borrowing` 和 `consuming` 参数在调用函数时不需要任何特殊标记：

```swift
func someFunction(a: borrowing A, b: consuming B) { ... }

someFunction(a: someA, b: someB)
```

明确使用 `borrowing` 或 `consuming` 表示您希望更严格地控制运行时所有权管理的开销。因为复制可能导致意外的运行时所有权操作，所以标记为这两种修饰符的参数在没有使用显式的 `copy` 关键字的情况下不能被复制：

```swift
func borrowingFunction1(a: borrowing A) {
    // Error: Cannot implicitly copy a
    // This assignment requires a copy because
    // `a` is only borrowed from the caller.
    someGlobalVariable = a
}

func borrowingFunction2(a: borrowing A) {
    // OK: Explicit copying works
    someGlobalVariable = copy a
}

func consumingFunction1(a: consuming A) {
    // Error: Cannot implicitly copy a
    // This assignment requires a copy because
    // of the following `print`
    someGlobalVariable = a
    print(a)
}

func consumingFunction2(a: consuming A) {
    // OK: Explicit copying works regardless
    someGlobalVariable = copy a
    print(a)
}

func consumingFunction3(a: consuming A) {
    // OK: No copy needed here because this is the last use
    someGlobalVariable = a
}
```

<!--
  TODO: `borrowing` and `consuming` keywords with noncopyable argument types
-->
<!--
  TODO: Any change of parameter modifier is ABI-breaking
-->

### 特殊类型的参数

参数可以被忽略，接受可变数量的值，并使用以下形式提供默认值：

```swift
_ : <#parameter type#>
<#parameter name#>: <#parameter type#>...
<#parameter name#>: <#parameter type#> = <#default argument value#>
```

下划线 (`_`) 参数被明确忽略，无法在函数体内访问。

带有基本类型名称后面紧跟三个点（`...`）的参数被理解为可变参数。紧跟在可变参数后面的参数必须有一个参数标签。一个函数可以有多个可变参数。可变参数被视为包含基本类型名称元素的数组。例如，可变参数 `Int...` 被视为 `[Int]`。有关使用可变参数的示例，请参见 <doc:Functions#Variadic-Parameters>。

一个带有等号 (`=`) 的参数及其类型后面的表达式被理解为具有给定表达式的默认值。给定的表达式在调用函数时被评估。如果在调用函数时省略了该参数，则使用默认值。

```swift
func f(x: Int = 42) -> Int { return x }
f()       // Valid, uses default value
f(x: 7)   // Valid, uses the value provided
f(7)      // Invalid, missing argument label
```

<!--
  - test: `default-args-and-labels`

  ```swifttest
  -> func f(x: Int = 42) -> Int { return x }
  >> let _ =
  -> f()       // Valid, uses default value
  >> let _ =
  -> f(x: 7)   // Valid, uses the value provided
  >> let _ =
  -> f(7)      // Invalid, missing argument label
  !$ error: missing argument label 'x:' in call
  !! f(7)      // Invalid, missing argument label
  !!   ^
  !!   x:
  ```
-->

<!--
  Rewrite the above to avoid discarding the function's return value.
  Tracking bug is <rdar://problem/35301593>
-->

<!--
  - test: `default-args-evaluated-at-call-site`

  ```swifttest
  -> func shout() -> Int {
        print("evaluated")
        return 10
     }
  -> func foo(x: Int = shout()) { print("x is \(x)") }
  -> foo(x: 100)
  << x is 100
  -> foo()
  << evaluated
  << x is 10
  -> foo()
  << evaluated
  << x is 10
  ```
-->

### 特殊类型的方法

对枚举或结构体的方法，如果修改了 `self`，必须标记为 `mutating` 声明修饰符。

重写超类方法的方法必须标记为 `override` 声明修饰符。没有 `override` 修饰符而重写方法，或者在不重写超类方法的情况下使用 `override` 修饰符，都是编译时错误。

与类型相关的方法，而不是与类型实例相关的方法，必须使用 static 声明修饰符来标记（枚举和结构体使用 static，类可以使用 static 或 class 声明修饰符）。用 class 声明修饰符标记的类类型方法可以被子类的实现重写；用 class final 或 static 标记的类类型方法则不能被重写。

<!--
  - test: `overriding-class-methods-err`

  ```swifttest
  -> class S { class final func f() -> Int { return 12 } }
  -> class SS: S { override class func f() -> Int { return 120 } }
  !$ error: class method overrides a 'final' class method
  !! class SS: S { override class func f() -> Int { return 120 } }
  !!                                  ^
  !$ note: overridden declaration is here
  !! class S { class final func f() -> Int { return 12 } }
  !!                           ^
  -> class S2 { static func f() -> Int { return 12 } }
  -> class SS2: S2 { override static func f() -> Int { return 120 } }
  !$ error: cannot override static method
  !! class SS2: S2 { override static func f() -> Int { return 120 } }
  !! ^
  !$ note: overridden declaration is here
  !! class S2 { static func f() -> Int { return 12 } }
  !! ^
  ```
-->

<!--
  - test: `overriding-class-methods`

  ```swifttest
  -> class S3 { class func f() -> Int { return 12 } }
  -> class SS3: S3 { override class func f() -> Int { return 120 } }
  -> print(SS3.f())
  <- 120
  ```
-->

### 特殊名称的方法

几种具有特殊名称的方法使函数调用语法变得更加简洁。如果一个类型定义了这些方法之一，该类型的实例可以在函数调用语法中使用。函数调用被理解为对该实例上某个特殊命名方法的调用。

类、结构体或枚举类型可以通过定义一个 `dynamicallyCall(withArguments:)` 方法或一个 `dynamicallyCall(withKeywordArguments:)` 方法来支持函数调用语法，如 <doc:Attributes#dynamicCallable> 中所述，或者通过定义一个 call-as-function 的方法，如下所述。如果该类型同时定义了一个作为函数调用的方法和 `dynamicCallable` 特性使用的其中一个方法，则在可以使用任一方法的情况下，编译器优先选择 call-as-function 的方法。

call-as-function 的方法的名称是 `callAsFunction()`，或者另一个以 `callAsFunction(` 开头并添加带标签或不带标签的参数的名称——例如， `callAsFunction(_:_:)` 和 `callAsFunction(something:)` 也是有效的调用作为函数的方法名称。

<!--
  Above, callAsFunction( is in code voice even though
  it's not actually a symbol that exists in the reader's code.
  Per discussion with Chuck, this is the closest typographic convention
  to what we're trying to express here.
-->

以下函数调用是等效的：

```swift
struct CallableStruct {
    var value: Int
    func callAsFunction(_ number: Int, scale: Int) {
        print(scale * (number + value))
    }
}
let callable = CallableStruct(value: 100)
callable(4, scale: 2)
callable.callAsFunction(4, scale: 2)
// Both function calls print 208.
```

<!--
  - test: `call-as-function`

  ```swifttest
  -> struct CallableStruct {
         var value: Int
         func callAsFunction(_ number: Int, scale: Int) {
             print(scale * (number + value))
         }
     }
  -> let callable = CallableStruct(value: 100)
  -> callable(4, scale: 2)
  -> callable.callAsFunction(4, scale: 2)
  // Both function calls print 208.
  << 208
  << 208
  ```
-->

call-as-function 的方法和来自 `dynamicCallable` 特性的方法在将多少信息编码到类型系统与在运行时可能的动态行为之间做出了不同的权衡。当您声明一个 call-as-function 的方法时，您需要指定参数的数量，以及每个参数的类型和标签。`dynamicCallable` 特性的方法仅指定用于保存参数数组的类型。

定义一个 call-as-function，或者来自 `dynamicCallable` 特性的方法，并不允许你在函数调用表达式以外的任何上下文中将该类型的实例用作函数。例如：

```swift
let someFunction1: (Int, Int) -> Void = callable(_:scale:)  // Error
let someFunction2: (Int, Int) -> Void = callable.callAsFunction(_:scale:)
```

<!--
  - test: `call-as-function-err`

  ```swifttest
  >> struct CallableStruct {
  >>     var value: Int
  >>     func callAsFunction(_ number: Int, scale: Int) { }
  >> }
  >> let callable = CallableStruct(value: 100)
  -> let someFunction1: (Int, Int) -> Void = callable(_:scale:)  // Error
  -> let someFunction2: (Int, Int) -> Void = callable.callAsFunction(_:scale:)
  >> _ = someFunction1 // suppress unused-constant warning
  >> _ = someFunction2 // suppress unused-constant warning
  !$ error: cannot find 'callable(_:scale:)' in scope
  !! let someFunction1: (Int, Int) -> Void = callable(_:scale:)  // Error
  !! ^~~~~~~~~~~~~~~~~~
  ```
-->

`subscript(dynamicMember:)` 下标为成员查找提供了语法糖，如 <doc:Attributes#dynamicMemberLookup> 中所述。

### 抛出函数和方法

可以抛出错误的函数和方法必须标记为 `throws` 关键字。这些函数和方法被称为 *抛出函数* 和 *抛出方法*。它们具有以下形式：

```swift
func <#function name#>(<#parameters#>) throws -> <#return type#> {
    <#statements#>
}
```

抛出特定错误类型的函数具有以下形式：

```swift
func <#function name#>(<#parameters#>) throws(<#error type#>) -> <#return type#> {
    <#statements#>
}
```

调用抛出函数或方法的必须被包裹在一个 `try` 或 `try!` 表达式中（即，在 `try` 或 `try!` 操作符的作用域内）。

一个函数的类型包括它是否可以抛出错误以及它抛出什么类型的错误。这种子类型关系意味着，例如，您可以在期望抛出错误的上下文中使用一个不抛出错误的函数。有关抛出函数类型的更多信息，请参见 <doc:Types#Function-Type>。有关处理具有显式类型的错误的示例，请参见 <doc:ErrorHandling#Specifying-the-Error-Type>。

您不能仅仅根据函数是否可以抛出错误来重载函数。也就是说，您可以根据函数的 *参数* 是否可以抛出错误来重载函数。

抛出方法不能覆盖非抛出方法，抛出方法也不能满足非抛出方法的协议要求。也就是说，非抛出方法可以覆盖抛出方法，非抛出方法可以满足抛出方法的协议要求。

### 重新抛出函数和方法

函数或方法可以使用 `rethrows` 关键字声明，以指示它仅在其一个函数参数抛出错误时才抛出错误。这些函数和方法被称为 *重新抛出函数* 和 *重新抛出方法*。重新抛出函数和方法必须至少有一个抛出错误的函数参数。

```swift
func someFunction(callback: () throws -> Void) rethrows {
    try callback()
}
```

<!--
  - test: `rethrows`

  ```swifttest
  -> func someFunction(callback: () throws -> Void) rethrows {
         try callback()
     }
  ```
-->

重新抛出的函数或方法只能在 `catch` 子句中包含 `throw` 语句。这使得您可以在 `do`-`catch` 语句中调用抛出函数，并通过抛出不同的错误在 `catch` 子句中处理错误。此外，`catch` 子句必须仅处理由重新抛出函数的抛出参数抛出的错误。例如，以下是无效的，因为 `catch` 子句将处理由 `alwaysThrows()` 抛出的错误。

```swift
func alwaysThrows() throws {
    throw SomeError.error
}
func someFunction(callback: () throws -> Void) rethrows {
    do {
        try callback()
        try alwaysThrows()  // Invalid, alwaysThrows() isn't a throwing parameter
    } catch {
        throw AnotherError.error
    }
}
```

<!--
  - test: `double-negative-rethrows`

  ```swifttest
  >> enum SomeError: Error { case error }
  >> enum AnotherError: Error { case error }
  -> func alwaysThrows() throws {
         throw SomeError.error
     }
  -> func someFunction(callback: () throws -> Void) rethrows {
        do {
           try callback()
           try alwaysThrows()  // Invalid, alwaysThrows() isn't a throwing parameter
        } catch {
           throw AnotherError.error
        }
     }
  !$ error: a function declared 'rethrows' may only throw if its parameter does
  !!               throw AnotherError.error
  !!               ^
  ```
-->

<!--
  - test: `throwing-in-rethrowing-function`

  ```swifttest
  -> enum SomeError: Error { case c, d }
  -> func f1(callback: () throws -> Void) rethrows {
         do {
             try callback()
         } catch {
             throw SomeError.c  // OK
         }
     }
  -> func f2(callback: () throws -> Void) rethrows {
         throw SomeError.d  // Error
     }
  !$ error: a function declared 'rethrows' may only throw if its parameter does
  !! throw SomeError.d  // Error
  !! ^
  ```
-->

抛出方法不能覆盖重新抛出方法，抛出方法也不能满足重新抛出方法的协议要求。也就是说，重新抛出方法可以覆盖抛出方法，重新抛出方法可以满足抛出方法的协议要求。

在泛型代码中，抛出特定错误类型是重新抛出的替代方案。例如：

```swift
func someFunction<E: Error>(callback: () throws(E) -> Void) throws(E) {
    try callback()
}
```

这种传播错误的方法保留了关于错误的类型信息。然而，与标记一个函数 `rethrows` 不同，这种方法并不阻止该函数抛出相同类型的错误。

<!--
TODO: Revisit the comparison between rethrows and throws(E) above,
since it seems likely that the latter will generally replace the former.

See also rdar://128972373
-->

### 异步函数和方法

运行异步的函数和方法必须标记为 `async` 关键字。这些函数和方法被称为 *异步函数* 和 *异步方法*。它们具有以下形式：

```swift
func <#function name#>(<#parameters#>) async -> <#return type#> {
    <#statements#>
}
```

对异步函数或方法的调用必须包装在一个 `await` 表达式中 --- 也就是说，它们必须在 `await` 操作符的作用域内。

`async` 关键字是函数类型的一部分，同步函数是异步函数的子类型。因此，您可以覆盖异在期望异步函数的上下文中使用同步函数。例如，您可以用同步方法步方法，并且同步方法可以满足需要异步方法的协议要求。

您可以根据函数是否是异步的来重载函数。在调用位置，上下文决定使用哪个重载：在异步上下文中，使用异步函数；在同步上下文中，使用同步函数。

一异步方法不能覆盖同步方法，异步方法也不能满足同步方法的协议要求。也就是说，同步方法可以覆盖异步方法，且同步方法可以满足异步方法的协议要求。

<!--
  - test: `sync-satisfy-async-protocol-requirements`

  ```swifttest
  >> protocol P { func f() async -> Int }
  >> class Super: P {
  >>     func f() async -> Int { return 12 }
  >> }
  >> class Sub: Super {
  >>     func f() -> Int { return 120 }
  >> }
  ```
-->

### 永不返回的函数

Swift 定义了一个 [`Never`][] 类型，表示一个函数或方法不会返回给调用者。具有 `Never` 返回类型的函数和方法被称为 *非返回*。非返回的函数和方法要么导致不可恢复的错误，要么开始一个无限进行的工作序列。这意味着在调用后立即运行的代码永远不会被执行。抛出和重新抛出的函数可以将程序控制转移到适当的 `catch` 块，即使它们是非返回的。

[`Never`]: https://developer.apple.com/documentation/swift/never

不返回的函数或方法可以被调用，以结束守卫语句的 `else` 子句，如在 <doc:Statements#Guard-Statement>中讨论的。

您可以重写一个不返回的方法，但新方法必须保持其返回类型和不返回值的行为。

> 函数声明的语法：
>
> *函数声明* → *函数头* *函数名称* *泛型参数子句*_?_ *函数签名* *泛型约束子句*_?_ *函数主体*_?_
>
> *函数头* → *属性*_?_ *声明修饰符*_?_ **`func`** \
> *函数名* → *标识符* | *运算符*
>
> *函数签名* → *参数子句* **`异步`**_?_ *抛出子句*_?_ *函数结果*_?_ \
> *函数签名* → *参数子句* **`async`**_?_ **`rethrows`** *函数结果*_?_ \
> *函数结果* → **`->`** *属性*_?_ *类型* \
> *函数体* → *代码块*
>
> *参数子句* → **`(`** **`)`** | **`(`** *参数列表* **`)`** \
> *参数列表* → *参数* | *参数* **`,`** *参数列表* \
> *参数* → *外部参数名称*_?_ *本地参数名称* *参数类型注解* *默认参数子句*_?_ \
> *参数* → *外部参数名称*_?_ *本地参数名称* *参数类型注解* \
> *参数* → *外部参数名称*_?_ *本地参数名称* *参数类型注解* **`...`**
>
> *外部参数名称* → *标识符* \
> *局部参数名称* → *标识符* \
> *参数类型注解* → **`:`** *属性*_?_ *参数修饰符*_?_ *类型* \
> *参数修饰符* → **`输入输出`** | **`借用`** | **`消耗`** *默认参数子句* → **`=`** *表达式*

<!--
  NOTE: Code block is optional in the context of a protocol.
  Everywhere else, it's required.
  We could refactor to have a separation between function definition/declaration.
  There's also the low-level "asm name" FFI
  which is a definition and declaration corner case.
  Let's just deal with this difference in prose.
-->

## 枚举声明

一个*枚举声明*将一个命名的枚举类型引入到你的程序中。

枚举声明有两种基本形式，并使用 `enum` 关键字进行声明。使用任一形式声明的枚举的主体包含零个或多个值 --- 称为 *枚举案例* --- 以及任意数量的声明，包括计算属性、实例方法、类型方法、构造器、类型别名，甚至其他枚举、结构体、类和 actor 声明。枚举声明不能包含析构器或协议声明。

枚举类型可以采用任意数量的协议，但不能从类、结构或其他枚举继承。

与类和结构体不同，枚举类型没有隐式提供的默认构造器；所有构造器必须显式声明。构造器可以委托给枚举中的其他构造器，但初始化过程只有在构造器将枚举的一个案例分配给 `self` 后才完成。

像结构体但不同于类，枚举是值类型；当枚举的实例被赋值给变量或常量，或作为参数传递给函数调用时，会被复制。有关值类型的信息，请参见 <doc:ClassesAndStructures#Structures-and-Enumerations-Are-Value-Types>。

您可以通过扩展声明扩展枚举类型的行为，如 <doc:Declarations#Extension-Declaration> 中所讨论的。

### 任意类型的枚举案例

以下形式声明了一个枚举类型，其中包含任何类型的枚举案例：

```swift
enum <#enumeration name#>: <#adopted protocols#> {
    case <#enumeration case 1#>
    case <#enumeration case 2#>(<#associated value types#>)
}
```

在这种形式中声明的枚举有时在其他编程语言中被称为*区分联合*。

在这种形式中，每个案例块由 `case` 关键字组成，后面跟着一个或多个枚举案例，用逗号分隔。每个案例的名称必须是唯一的。每个案例还可以指定它存储特定类型的值。这些类型在*关联值类型*元组中指定，紧接在案例名称之后。

存储关联值的枚举案例可以用作函数，这些函数创建具有指定关联值的枚举实例。就像函数一样，您可以获取对枚举案例的引用，并在代码中稍后应用它。

```swift
enum Number {
    case integer(Int)
    case real(Double)
}
let f = Number.integer
// f is a function of type (Int) -> Number

// Apply f to create an array of Number instances with integer values
let evenInts: [Number] = [0, 2, 4, 6].map(f)
```

<!--
  - test: `enum-case-as-function`

  ```swifttest
  -> enum Number {
        case integer(Int)
        case real(Double)
     }
  -> let f = Number.integer
  -> // f is a function of type (Int) -> Number
  ---
  -> // Apply f to create an array of Number instances with integer values
  -> let evenInts: [Number] = [0, 2, 4, 6].map(f)
  ```
-->

<!--
  No expectation for evenInts because there isn't a good way to spell one.
  Using print() puts a module prefix like tmpabc in front of Number
  so the expectation would need to be a regex (which we don't have),
  and assert() would require Number to conform to Equatable.
-->

有关更多信息以及查看与相关值类型相关的案例示例，请参见 <doc:Enumerations#Associated-Values>。

#### 间接枚举

枚举可以具有递归结构，也就是说，它们可以有与枚举类型本身实例相关联的值的情况。然而，枚举类型的实例具有值语义，这意味着它们在内存中具有固定的布局。为了支持递归，编译器必须插入一层间接性。

要为特定的枚举案例启用间接性，请使用 `indirect` 声明修饰符进行标记。间接案例必须具有相关值。

```swift
enum Tree<T> {
    case empty
    indirect case node(value: T, left: Tree, right: Tree)
}
```

<!--
  - test: `indirect-enum`

  ```swifttest
  -> enum Tree<T> {
        case empty
        indirect case node(value: T, left: Tree, right: Tree)
     }
  >> let l1 = Tree.node(value: 10, left: Tree.empty, right: Tree.empty)
  >> let l2 = Tree.node(value: 100, left: Tree.empty, right: Tree.empty)
  >> let t = Tree.node(value: 50, left: l1, right: l2)
  ```
-->

要为所有具有关联值的枚举案例启用间接引用，请使用 `indirect` 修饰符标记整个枚举 --- 当枚举包含许多需要标记为 `indirect` 修饰符的情况时，这样做非常方便。

一个标记为 `indirect` 修饰符的枚举可以包含具有关联值的情况和没有关联值的情况的混合。然而，它不能包含任何也标记为 `indirect` 修饰符的案例。

<!--
  It really should be an associated value **that includes the enum type**
  but right now the compiler is satisfied with any associated value.
  Alex emailed Joe Groff 2015-07-08 about this.
-->

<!--
  assertion indirect-in-indirect

  -> indirect enum E { indirect case c(E) }
  !! <REPL Input>:1:19: error: enum case in 'indirect' enum cannot also be 'indirect'
  !! indirect enum E { indirect case c(E) }
  !!                   ^
-->

<!--
  assertion indirect-without-recursion

  -> enum E { indirect case c }
  !! <REPL Input>:1:10: error: enum case 'c' without associated value cannot be 'indirect'
  !! enum E { indirect case c }
  !!          ^
  ---
  -> enum E1 { indirect case c() }     // This is fine, but probably shouldn't be
  -> enum E2 { indirect case c(Int) }  // This is fine, but probably shouldn't be
  ---
  -> indirect enum E3 { case x }
-->

### Enumerations with Cases of a Raw-Value Type

The following form declares an enumeration type that contains
enumeration cases of the same basic type:

```swift
enum <#enumeration name#>: <#raw-value type#>, <#adopted protocols#> {
    case <#enumeration case 1#> = <#raw value 1#>
    case <#enumeration case 2#> = <#raw value 2#>
}
```

In this form, each case block consists of the `case` keyword,
followed by one or more enumeration cases, separated by commas.
Unlike the cases in the first form, each case has an underlying
value, called a *raw value*, of the same basic type.
The type of these values is specified in the *raw-value type* and must represent an
integer, floating-point number, string, or single character.
In particular, the *raw-value type* must conform to the `Equatable` protocol
and one of the following protocols:
`ExpressibleByIntegerLiteral` for integer literals,
`ExpressibleByFloatLiteral` for floating-point literals,
`ExpressibleByStringLiteral` for string literals that contain any number of characters,
and `ExpressibleByUnicodeScalarLiteral`
or `ExpressibleByExtendedGraphemeClusterLiteral` for string literals
that contain only a single character.
Each case must have a unique name and be assigned a unique raw value.

<!--
  The list of ExpressibleBy... protocols above also appears in LexicalStructure_Literals.
  This list is shorter because these five protocols are explicitly supported in the compiler.
-->

If the raw-value type is specified as `Int`
and you don't assign a value to the cases explicitly,
they're implicitly assigned the values `0`, `1`, `2`, and so on.
Each unassigned case of type `Int` is implicitly assigned a raw value
that's automatically incremented from the raw value of the previous case.

```swift
enum ExampleEnum: Int {
    case a, b, c = 5, d
}
```

<!--
  - test: `raw-value-enum`

  ```swifttest
  -> enum ExampleEnum: Int {
        case a, b, c = 5, d
     }
  ```
-->

In the above example, the raw value of `ExampleEnum.a` is `0` and the value of
`ExampleEnum.b` is `1`. And because the value of `ExampleEnum.c` is
explicitly set to `5`, the value of `ExampleEnum.d` is automatically incremented
from `5` and is therefore `6`.

If the raw-value type is specified as `String`
and you don't assign values to the cases explicitly,
each unassigned case is implicitly assigned a string with the same text as the name of that case.

```swift
enum GamePlayMode: String {
    case cooperative, individual, competitive
}
```

<!--
  - test: `raw-value-enum-implicit-string-values`

  ```swifttest
  -> enum GamePlayMode: String {
        case cooperative, individual, competitive
     }
  ```
-->

In the above example, the raw value of `GamePlayMode.cooperative` is `"cooperative"`,
the raw value of `GamePlayMode.individual` is `"individual"`,
and the raw value of `GamePlayMode.competitive` is `"competitive"`.

Enumerations that have cases of a raw-value type implicitly conform to the
`RawRepresentable` protocol, defined in the Swift standard library.
As a result, they have a `rawValue` property
and a failable initializer with the signature `init?(rawValue: RawValue)`.
You can use the `rawValue` property to access the raw value of an enumeration case,
as in `ExampleEnum.b.rawValue`.
You can also use a raw value to find a corresponding case, if there is one,
by calling the enumeration's failable initializer,
as in `ExampleEnum(rawValue: 5)`, which returns an optional case.
For more information and to see examples of cases with raw-value types,
see <doc:Enumerations#Raw-Values>.

### Accessing Enumeration Cases

To reference the case of an enumeration type, use dot (`.`) syntax,
as in `EnumerationType.enumerationCase`. When the enumeration type can be inferred
from context, you can omit it (the dot is still required),
as described in <doc:Enumerations#Enumeration-Syntax>
and <doc:Expressions#Implicit-Member-Expression>.

To check the values of enumeration cases, use a `switch` statement,
as shown in <doc:Enumerations#Matching-Enumeration-Values-with-a-Switch-Statement>.
The enumeration type is pattern-matched against the enumeration case patterns
in the case blocks of the `switch` statement,
as described in <doc:Patterns#Enumeration-Case-Pattern>.

<!--
  FIXME: Or use if-case:
  enum E { case c(Int) }
  let e = E.c(100)
  if case E.c(let i) = e { print(i) }
  // prints 100
-->

<!--
  NOTE: Note that you can require protocol adoption,
  by using a protocol type as the raw-value type,
  but you do need to make it be one of the types
  that support = in order for you to specify the raw values.
  You can have: <#raw-value type, protocol conformance#>.
  UPDATE: You can only have one raw-value type specified.
  I changed the grammar to be more restrictive in light of this.
-->

<!--
  NOTE: Per Doug and Ted, "('->' type)?" isn't part of the grammar.
  We removed it from our grammar, below.
-->

> Grammar of an enumeration declaration:
>
> *enum-declaration* → *attributes*_?_ *access-level-modifier*_?_ *union-style-enum* \
> *enum-declaration* → *attributes*_?_ *access-level-modifier*_?_ *raw-value-style-enum*
>
> *union-style-enum* → **`indirect`**_?_ **`enum`** *enum-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ **`{`** *union-style-enum-members*_?_ **`}`** \
> *union-style-enum-members* → *union-style-enum-member* *union-style-enum-members*_?_ \
> *union-style-enum-member* → *declaration* | *union-style-enum-case-clause* | *compiler-control-statement* \
> *union-style-enum-case-clause* → *attributes*_?_ **`indirect`**_?_ **`case`** *union-style-enum-case-list* \
> *union-style-enum-case-list* → *union-style-enum-case* | *union-style-enum-case* **`,`** *union-style-enum-case-list* \
> *union-style-enum-case* → *enum-case-name* *tuple-type*_?_ \
> *enum-name* → *identifier* \
> *enum-case-name* → *identifier*
>
> *raw-value-style-enum* → **`enum`** *enum-name* *generic-parameter-clause*_?_ *type-inheritance-clause* *generic-where-clause*_?_ **`{`** *raw-value-style-enum-members* **`}`** \
> *raw-value-style-enum-members* → *raw-value-style-enum-member* *raw-value-style-enum-members*_?_ \
> *raw-value-style-enum-member* → *declaration* | *raw-value-style-enum-case-clause* | *compiler-control-statement* \
> *raw-value-style-enum-case-clause* → *attributes*_?_ **`case`** *raw-value-style-enum-case-list* \
> *raw-value-style-enum-case-list* → *raw-value-style-enum-case* | *raw-value-style-enum-case* **`,`** *raw-value-style-enum-case-list* \
> *raw-value-style-enum-case* → *enum-case-name* *raw-value-assignment*_?_ \
> *raw-value-assignment* → **`=`** *raw-value-literal* \
> *raw-value-literal* → *numeric-literal* | *static-string-literal* | *boolean-literal*

<!--
  NOTE: The two types of enums are sufficiently different enough to warrant separating
  the grammar accordingly. ([Contributor 6004] pointed this out in his email.)
  I'm not sure I'm happy with the names I've chosen for two kinds of enums,
  so please let me know if you can think of better names (Tim and Dave are OK with them)!
  I chose union-style-enum, because this kind of enum behaves like a discriminated union,
  not like an ordinary enum type. They're a kind of "sum" type in the language
  of ADTs (Algebraic Data Types). Functional languages, like F# for example,
  actually have both types (discriminated unions and enumeration types),
  because they behave differently. I'm not sure why we've blended them together,
  especially given that they have distinct syntactic declaration requirements
  and they behave differently.
-->

## Structure Declaration

A *structure declaration* introduces a named structure type into your program.
Structure declarations are declared using the `struct` keyword and have the following form:

```swift
struct <#structure name#>: <#adopted protocols#> {
   <#declarations#>
}
```

The body of a structure contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
type properties, instance methods, type methods, initializers, subscripts,
type aliases, and even other structure, class, actor, and enumeration declarations.
Structure declarations can't contain deinitializer or protocol declarations.
For a discussion and several examples of structures
that include various kinds of declarations,
see <doc:ClassesAndStructures>.

Structure types can adopt any number of protocols,
but can't inherit from classes, enumerations, or other structures.

There are three ways to create an instance of a previously declared structure:

- Call one of the initializers declared within the structure,
  as described in <doc:Initialization#Initializers>.
- If no initializers are declared,
  call the structure's memberwise initializer,
  as described in <doc:Initialization#Memberwise-Initializers-for-Structure-Types>.
- If no initializers are declared,
  and all properties of the structure declaration were given initial values,
  call the structure's default initializer,
  as described in <doc:Initialization#Default-Initializers>.

The process of initializing a structure's declared properties
is described in <doc:Initialization>.

Properties of a structure instance can be accessed using dot (`.`) syntax,
as described in <doc:ClassesAndStructures#Accessing-Properties>.

Structures are value types; instances of a structure are copied when assigned to
variables or constants, or when passed as arguments to a function call.
For information about value types,
see <doc:ClassesAndStructures#Structures-and-Enumerations-Are-Value-Types>.

You can extend the behavior of a structure type with an extension declaration,
as discussed in <doc:Declarations#Extension-Declaration>.

> Grammar of a structure declaration:
>
> *struct-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`struct`** *struct-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *struct-body* \
> *struct-name* → *identifier* \
> *struct-body* → **`{`** *struct-members*_?_ **`}`**
>
> *struct-members* → *struct-member* *struct-members*_?_ \
> *struct-member* → *declaration* | *compiler-control-statement*

## Class Declaration

A *class declaration* introduces a named class type into your program.
Class declarations are declared using the `class` keyword and have the following form:

```swift
class <#class name#>: <#superclass#>, <#adopted protocols#> {
   <#declarations#>
}
```

The body of a class contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
instance methods, type methods, initializers,
a single deinitializer, subscripts, type aliases,
and even other class, structure, actor, and enumeration declarations.
Class declarations can't contain protocol declarations.
For a discussion and several examples of classes
that include various kinds of declarations,
see <doc:ClassesAndStructures>.

A class type can inherit from only one parent class, its *superclass*,
but can adopt any number of protocols.
The *superclass* appears first after the *class name* and colon,
followed by any *adopted protocols*.
Generic classes can inherit from other generic and nongeneric classes,
but a nongeneric class can inherit only from other nongeneric classes.
When you write the name of a generic superclass class after the colon,
you must include the full name of that generic class,
including its generic parameter clause.

As discussed in <doc:Declarations#Initializer-Declaration>,
classes can have designated and convenience initializers.
The designated initializer of a class must initialize all of the class's
declared properties and it must do so before calling any of its superclass's
designated initializers.

A class can override properties, methods, subscripts, and initializers of its superclass.
Overridden properties, methods, subscripts,
and designated initializers must be marked with the `override` declaration modifier.

<!--
  - test: `designatedInitializersRequireOverride`

  ```swifttest
  -> class C { init() {} }
  -> class D: C { override init() { super.init() } }
  ```
-->

To require that subclasses implement a superclass's initializer,
mark the superclass's initializer with the `required` declaration modifier.
The subclass's implementation of that initializer
must also be marked with the `required` declaration modifier.

Although properties and methods declared in the *superclass* are inherited by
the current class, designated initializers declared in the *superclass* are only
inherited when the subclass meets the conditions described in
<doc:Initialization#Automatic-Initializer-Inheritance>.
Swift classes don't inherit from a universal base class.

There are two ways to create an instance of a previously declared class:

- Call one of the initializers declared within the class,
  as described in <doc:Initialization#Initializers>.
- If no initializers are declared,
  and all properties of the class declaration were given initial values,
  call the class's default initializer,
  as described in <doc:Initialization#Default-Initializers>.

Access properties of a class instance with dot (`.`) syntax,
as described in <doc:ClassesAndStructures#Accessing-Properties>.

Classes are reference types; instances of a class are referred to, rather than copied,
when assigned to variables or constants, or when passed as arguments to a function call.
For information about reference types,
see <doc:ClassesAndStructures#Classes-Are-Reference-Types>.

You can extend the behavior of a class type with an extension declaration,
as discussed in <doc:Declarations#Extension-Declaration>.

> Grammar of a class declaration:
>
> *class-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`final`**_?_ **`class`** *class-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *class-body* \
> *class-declaration* → *attributes*_?_ **`final`** *access-level-modifier*_?_ **`class`** *class-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *class-body* \
> *class-name* → *identifier* \
> *class-body* → **`{`** *class-members*_?_ **`}`**
>
> *class-members* → *class-member* *class-members*_?_ \
> *class-member* → *declaration* | *compiler-control-statement*

## Actor Declaration

An *actor declaration* introduces a named actor type into your program.
Actor declarations are declared using the `actor` keyword and have the following form:

```swift
actor <#actor name#>: <#adopted protocols#> {
    <#declarations#>
}
```

The body of an actor contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
instance methods, type methods, initializers,
a single deinitializer, subscripts, type aliases,
and even other class, structure, and enumeration declarations.
For a discussion and several examples of actors
that include various kinds of declarations,
see <doc:Concurrency#Actors>.

Actor types can adopt any number of protocols,
but can't inherit from classes, enumerations, structures, or other actors.
However, an actor that is marked with the `@objc` attribute
implicitly conforms to the `NSObjectProtocol` protocol
and is exposed to the Objective-C runtime as a subtype of `NSObject`.

There are two ways to create an instance of a previously declared actor:

- Call one of the initializers declared within the actor,
  as described in <doc:Initialization#Initializers>.
- If no initializers are declared,
  and all properties of the actor declaration were given initial values,
  call the actor's default initializer,
  as described in <doc:Initialization#Default-Initializers>.

By default, members of an actor are isolated to that actor.
Code, such as the body of a method or the getter for a property,
is executed on that actor.
Code within the actor can interact with them synchronously
because that code is already running on the same actor,
but code outside the actor must mark them with `await`
to indicate that this code is asynchronously running code on another actor.
Key paths can't refer to isolated members of an actor.
Actor-isolated stored properties can be passed as in-out parameters
to synchronous functions,
but not to asynchronous functions.

Actors can also have nonisolated members,
whose declarations are marked with the `nonisolated` keyword.
A nonisolated member executes like code outside of the actor:
It can't interact with any of the actor's isolated state,
and callers don't mark it with `await` when using it.

Members of an actor can be marked with the `@objc` attribute
only if they are nonisolated or asynchronous.

The process of initializing an actor's declared properties
is described in <doc:Initialization>.

Properties of an actor instance can be accessed using dot (`.`) syntax,
as described in <doc:ClassesAndStructures#Accessing-Properties>.

Actors are reference types; instances of an actor are referred to, rather than copied,
when assigned to variables or constants, or when passed as arguments to a function call.
For information about reference types,
see <doc:ClassesAndStructures#Classes-Are-Reference-Types>.

You can extend the behavior of an actor type with an extension declaration,
as discussed in <doc:Declarations#Extension-Declaration>.

<!--
  TODO Additional bits from the SE-0306 actors proposal:

  Partial applications of isolated functions are only permitted
  when the expression is a direct argument
  whose corresponding parameter is non-escaping and non-Sendable.
-->

> Grammar of an actor declaration:
>
> *actor-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`actor`** *actor-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *actor-body* \
> *actor-name* → *identifier* \
> *actor-body* → **`{`** *actor-members*_?_ **`}`**
>
> *actor-members* → *actor-member* *actor-members*_?_ \
> *actor-member* → *declaration* | *compiler-control-statement*

## Protocol Declaration

A *protocol declaration* introduces a named protocol type into your program.
Protocol declarations are declared
using the `protocol` keyword and have the following form:

```swift
protocol <#protocol name#>: <#inherited protocols#> {
   <#protocol member declarations#>
}
```

Protocol declarations can appear at global scope,
or nested inside a nongeneric type or nongeneric function.

The body of a protocol contains zero or more *protocol member declarations*,
which describe the conformance requirements that any type adopting the protocol must fulfill.
In particular, a protocol can declare that conforming types must
implement certain properties, methods, initializers, and subscripts.
Protocols can also declare special kinds of type aliases,
called *associated types*, that can specify relationships
among the various declarations of the protocol.
Protocol declarations can't contain
class, structure, enumeration, or other protocol declarations.
The *protocol member declarations* are discussed in detail below.

Protocol types can inherit from any number of other protocols.
When a protocol type inherits from other protocols,
the set of requirements from those other protocols are aggregated,
and any type that inherits from the current protocol must conform to all those requirements.
For an example of how to use protocol inheritance,
see <doc:Protocols#Protocol-Inheritance>.

> Note: You can also aggregate the conformance requirements of multiple
> protocols using protocol composition types,
> as described in <doc:Types#Protocol-Composition-Type>
> and <doc:Protocols#Protocol-Composition>.

You can add protocol conformance to a previously declared type
by adopting the protocol in an extension declaration of that type.
In the extension, you must implement all of the adopted protocol's
requirements. If the type already implements all of the requirements,
you can leave the body of the extension declaration empty.

By default, types that conform to a protocol must implement all
properties, methods, and subscripts declared in the protocol.
That said, you can mark these protocol member declarations with the `optional` declaration modifier
to specify that their implementation by a conforming type is optional.
The `optional` modifier can be applied
only to members that are marked with the `objc` attribute,
and only to members of protocols that are marked
with the `objc` attribute. As a result, only class types can adopt and conform
to a protocol that contains optional member requirements.
For more information about how to use the `optional` declaration modifier
and for guidance about how to access optional protocol members ---
for example, when you're not sure whether a conforming type implements them ---
see <doc:Protocols#Optional-Protocol-Requirements>.

<!--
  TODO: Currently, you can't check for an optional initializer,
  so we're leaving those out of the documentation, even though you can mark
  an initializer with the @optional attribute. It's still being decided by the
  compiler team. Update this section if they decide to make everything work
  properly for optional initializer requirements.
-->

The cases of an enumeration can satisfy
protocol requirements for type members.
Specifically,
an enumeration case without any associated values
satisfies a protocol requirement for
a get-only type variable of type `Self`,
and an enumeration case with associated values
satisfies a protocol requirement for a function that returns `Self`
whose parameters and their argument labels
match the case's associated values.
For example:

```swift
protocol SomeProtocol {
    static var someValue: Self { get }
    static func someFunction(x: Int) -> Self
}
enum MyEnum: SomeProtocol {
    case someValue
    case someFunction(x: Int)
}
```

<!--
  - test: `enum-case-satisfy-protocol-requirement`

  ```swifttest
  -> protocol SomeProtocol {
         static var someValue: Self { get }
         static func someFunction(x: Int) -> Self
     }
  -> enum MyEnum: SomeProtocol {
         case someValue
         case someFunction(x: Int)
     }
  ```
-->

To restrict the adoption of a protocol to class types only,
include the `AnyObject` protocol in the *inherited protocols*
list after the colon.
For example, the following protocol can be adopted only by class types:

```swift
protocol SomeProtocol: AnyObject {
    /* Protocol members go here */
}
```

<!--
  - test: `protocol-declaration`

  ```swifttest
  -> protocol SomeProtocol: AnyObject {
         /* Protocol members go here */
     }
  ```
-->

Any protocol that inherits from a protocol that's marked with the `AnyObject` requirement
can likewise be adopted only by class types.

> Note: If a protocol is marked with the `objc` attribute,
> the `AnyObject` requirement is implicitly applied to that protocol;
> there’s no need to mark the protocol with the `AnyObject` requirement explicitly.

Protocols are named types, and thus they can appear in all the same places
in your code as other named types, as discussed in <doc:Protocols#Protocols-as-Types>.
However,
you can't construct an instance of a protocol,
because protocols don't actually provide the implementations for the requirements
they specify.

You can use protocols to declare which methods a delegate of a class or structure
should implement, as described in <doc:Protocols#Delegation>.

> Grammar of a protocol declaration:
>
> *protocol-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`protocol`** *protocol-name* *type-inheritance-clause*_?_ *generic-where-clause*_?_ *protocol-body* \
> *protocol-name* → *identifier* \
> *protocol-body* → **`{`** *protocol-members*_?_ **`}`**
>
> *protocol-members* → *protocol-member* *protocol-members*_?_ \
> *protocol-member* → *protocol-member-declaration* | *compiler-control-statement*
>
> *protocol-member-declaration* → *protocol-property-declaration* \
> *protocol-member-declaration* → *protocol-method-declaration* \
> *protocol-member-declaration* → *protocol-initializer-declaration* \
> *protocol-member-declaration* → *protocol-subscript-declaration* \
> *protocol-member-declaration* → *protocol-associated-type-declaration* \
> *protocol-member-declaration* → *typealias-declaration*

### Protocol Property Declaration

Protocols declare that conforming types must implement a property
by including a *protocol property declaration*
in the body of the protocol declaration.
Protocol property declarations have a special form of a variable
declaration:

```swift
var <#property name#>: <#type#> { get set }
```

As with other protocol member declarations, these property declarations
declare only the getter and setter requirements for types
that conform to the protocol. As a result, you don't implement the getter or setter
directly in the protocol in which it's declared.

The getter and setter requirements can be satisfied by a conforming type in a variety of ways.
If a property declaration includes both the `get` and `set` keywords,
a conforming type can implement it with a stored variable property
or a computed property that's both readable and writeable
(that is, one that implements both a getter and a setter). However,
that property declaration can't be implemented as a constant property
or a read-only computed property. If a property declaration includes
only the `get` keyword, it can be implemented as any kind of property.
For examples of conforming types that implement the property requirements of a protocol,
see <doc:Protocols#Property-Requirements>.

To declare a type property requirement in a protocol declaration,
mark the property declaration with the `static` keyword.
Structures and enumerations that conform to the protocol
declare the property with the `static` keyword,
and classes that conform to the protocol
declare the property with either the `static` or `class` keyword.
Extensions that add protocol conformance to a structure, enumeration, or class
use the same keyword as the type they extend uses.
Extensions that provide a default implementation for a type property requirement
use the `static` keyword.

<!--
  - test: `protocols-with-type-property-requirements`

  ```swifttest
  -> protocol P { static var x: Int { get } }
  -> protocol P2 { class var x: Int { get } }
  !$ error: class properties are only allowed within classes; use 'static' to declare a requirement fulfilled by either a static or class property
  !! protocol P2 { class var x: Int { get } }
  !!              ~~~~~ ^
  !!              static
  -> struct S: P { static var x = 10 }
  -> class C1: P { static var x = 20 }
  -> class C2: P { class var x = 30 }
  !$ error: class stored properties not supported in classes; did you mean 'static'?
  !! class C2: P { class var x = 30 }
  !!               ~~~~~     ^
  ```
-->

<!--
  - test: `protocol-type-property-default-implementation`

  ```swifttest
  -> protocol P { static var x: Int { get } }
  -> extension P { static var x: Int { return 100 } }
  -> struct S1: P { }
  -> print(S1.x)
  <- 100
  -> struct S2: P { static var x = 10 }
  -> print(S2.x)
  <- 10
  ```
-->

See also <doc:Declarations#Variable-Declaration>.

> Grammar of a protocol property declaration:
>
> *protocol-property-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-keyword-block*

### Protocol Method Declaration

Protocols declare that conforming types must implement a method
by including a protocol method declaration in the body of the protocol declaration.
Protocol method declarations have the same form as
function declarations, with two exceptions: They don't include a function body,
and you can't provide any default parameter values as part of the function declaration.
For examples of conforming types that implement the method requirements of a protocol,
see <doc:Protocols#Method-Requirements>.

To declare a class or static method requirement in a protocol declaration,
mark the method declaration with the `static` declaration modifier.
Structures and enumerations that conform to the protocol
declare the method with the `static` keyword,
and classes that conform to the protocol
declare the method with either the `static` or `class` keyword.
Extensions that add protocol conformance to a structure, enumeration, or class
use the same keyword as the type they extend uses.
Extensions that provide a default implementation for a type method requirement
use the `static` keyword.

See also <doc:Declarations#Function-Declaration>.

<!--
  TODO: Talk about using ``Self`` in parameters and return types.
-->

> Grammar of a protocol method declaration:
>
> *protocol-method-declaration* → *function-head* *function-name* *generic-parameter-clause*_?_ *function-signature* *generic-where-clause*_?_

### Protocol Initializer Declaration

Protocols declare that conforming types must implement an initializer
by including a protocol initializer declaration in the body of the protocol declaration.
Protocol initializer declarations have the same form as
initializer declarations, except they don't include the initializer's body.

A conforming type can satisfy a nonfailable protocol initializer requirement
by implementing a nonfailable initializer or an `init!` failable initializer.
A conforming type can satisfy a failable protocol initializer requirement
by implementing any kind of initializer.

When a class implements an initializer to satisfy a protocol's initializer requirement,
the initializer must be marked with the `required` declaration modifier
if the class isn't already marked with the `final` declaration modifier.

See also <doc:Declarations#Initializer-Declaration>.

> Grammar of a protocol initializer declaration:
>
> *protocol-initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* *throws-clause*_?_ *generic-where-clause*_?_ \
> *protocol-initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* **`rethrows`** *generic-where-clause*_?_

### Protocol Subscript Declaration

Protocols declare that conforming types must implement a subscript
by including a protocol subscript declaration in the body of the protocol declaration.
Protocol subscript declarations have a special form of a subscript declaration:

```swift
subscript (<#parameters#>) -> <#return type#> { get set }
```

Subscript declarations only declare the minimum getter and setter implementation
requirements for types that conform to the protocol.
If the subscript declaration includes both the `get` and `set` keywords,
a conforming type must implement both a getter and a setter clause.
If the subscript declaration includes only the `get` keyword,
a conforming type must implement *at least* a getter clause
and optionally can implement a setter clause.

To declare a static subscript requirement in a protocol declaration,
mark the subscript declaration with the `static` declaration modifier.
Structures and enumerations that conform to the protocol
declare the subscript with the `static` keyword,
and classes that conform to the protocol
declare the subscript with either the `static` or `class` keyword.
Extensions that add protocol conformance to a structure, enumeration, or class
use the same keyword as the type they extend uses.
Extensions that provide a default implementation for a static subscript requirement
use the `static` keyword.

See also <doc:Declarations#Subscript-Declaration>.

> Grammar of a protocol subscript declaration:
>
> *protocol-subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *getter-setter-keyword-block*

### Protocol Associated Type Declaration

Protocols declare associated types using the `associatedtype` keyword.
An associated type provides an alias for a type
that's used as part of a protocol's declaration.
Associated types are similar to type parameters in generic parameter clauses,
but they're associated with `Self` in the protocol in which they're declared.
In that context, `Self` refers to the eventual type that conforms to the protocol.
For more information and examples,
see <doc:Generics#Associated-Types>.

You use a generic `where` clause in a protocol declaration
to add constraints to an associated types inherited from another protocol,
without redeclaring the associated types.
For example, the declarations of `SubProtocol` below are equivalent:

```swift
protocol SomeProtocol {
    associatedtype SomeType
}

protocol SubProtocolA: SomeProtocol {
    // This syntax produces a warning.
    associatedtype SomeType: Equatable
}

// This syntax is preferred.
protocol SubProtocolB: SomeProtocol where SomeType: Equatable { }
```

<!--
  - test: `protocol-associatedtype`

  ```swifttest
  -> protocol SomeProtocol {
         associatedtype SomeType
     }
  ---
  -> protocol SubProtocolA: SomeProtocol {
         // This syntax produces a warning.
         associatedtype SomeType: Equatable
     }
  !$ warning: redeclaration of associated type 'SomeType' from protocol 'SomeProtocol' is better expressed as a 'where' clause on the protocol
  !! associatedtype SomeType: Equatable
  !! ~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~
  !!-
  !$ note: 'SomeType' declared here
  !! associatedtype SomeType
  !! ^
  ---
  // This syntax is preferred.
  -> protocol SubProtocolB: SomeProtocol where SomeType: Equatable { }
  ```
-->

<!--
  TODO: Finish writing this section after WWDC.
-->

<!--
  NOTE:
  What are associated types? What are they "associated" with? Is "Self"
  an implicit associated type of every protocol? [...]

  Here's an initial stab:
  An Associated Type is associated with an implementation of that protocol.
  The protocol declares it, and is defined as part of the protocol's implementation.

  "The ``Self`` type allows you to refer to the eventual type of ``self``
  (where ``self`` is the type that conforms to the protocol).
  In addition to ``Self``, a protocol's operations often need to refer to types
  that are related to the type of ``Self``, such as a type of data stored in a
  collection or the node and edge types of a graph." Is this still true?

    -> If we expand the discussion here,
    -> add a link from Types_SelfType
    -> to give more details about Self in protocols.

  NOTES from Doug:
  At one point, Self was an associated type, but that's the wrong modeling of
  the problem.  Self is the stand-in type for the thing that conforms to the
  protocol.  It's weird to think of it as an associated type because it's the
  primary thing.  It's certainly not an associated type.  In many ways, you
  can think of associated types as being parameters that get filled in by the
  conformance of a specific concrete type to that protocol.

  There's a substitution mapping here.  The parameters are associated with
  Self because they're derived from Self.  When you have a concrete type that
  conforms to a protocol, it supplies concrete types for Self and all the
  associated types.

  The associated types are like parameters, but they're associated with Self in
  the protocol.  Self is the eventual type of the thing that conforms to the
  protocol -- you have to have a name for it so you can do things with it.

  We use "associated" in contrast with generic parameters in interfaces in C#.
  The interesting thing there is that they don't have a name like Self for the
  actual type, but you can name any of these independent types.    In theory,
  they're often independent but in practice they're often not -- you have an
  interface parameterized on T, where all the uses of the thing are that T are
  the same as Self.  Instead of having these independent parameters to an
  interface, we have a named thing (Self) and all these other things that hand
  off of it.

  Here's a stupid simple way to see the distinction:

  C#:

  interface Sequence <Element> {}

  class String : Sequence <UnicodeScalar>
  class String : Sequence <GraphemeCluster>

  These are both fine in C#

  Swift:

  protocol Sequence { typealias Element }

  class String : Sequence { typealias Element = ... }

  Here you have to pick one or the other -- you can't have both.
-->

See also <doc:Declarations#Type-Alias-Declaration>.

> Grammar of a protocol associated type declaration:
>
> *protocol-associated-type-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`associatedtype`** *typealias-name* *type-inheritance-clause*_?_ *typealias-assignment*_?_ *generic-where-clause*_?_

## Initializer Declaration

An *initializer declaration* introduces an initializer for a class,
structure, or enumeration into your program.
Initializer declarations are declared using the `init` keyword and have
two basic forms.

Structure, enumeration, and class types can have any number of initializers,
but the rules and associated behavior for class initializers are different.
Unlike structures and enumerations, classes have two kinds of initializers:
designated initializers and convenience initializers,
as described in <doc:Initialization>.

The following form declares initializers for structures, enumerations,
and designated initializers of classes:

```swift
init(<#parameters#>) {
   <#statements#>
}
```

A designated initializer of a class initializes
all of the class's properties directly. It can't call any other initializers
of the same class, and if the class has a superclass, it must call one of
the superclass's designated initializers.
If the class inherits any properties from its superclass, one of the
superclass's designated initializers must be called before any of these
properties can be set or modified in the current class.

Designated initializers can be declared in the context of a class declaration only
and therefore can't be added to a class using an extension declaration.

Initializers in structures and enumerations can call other declared initializers
to delegate part or all of the initialization process.

To declare convenience initializers for a class,
mark the initializer declaration with the `convenience` declaration modifier.

```swift
convenience init(<#parameters#>) {
   <#statements#>
}
```

Convenience initializers can delegate the initialization process to another
convenience initializer or to one of the class's designated initializers.
That said, the initialization processes must end with a call to a designated
initializer that ultimately initializes the class's properties.
Convenience initializers can't call a superclass's initializers.

You can mark designated and convenience initializers with the `required`
declaration modifier to require that every subclass implement the initializer.
A subclass’s implementation of that initializer
must also be marked with the `required` declaration modifier.

By default, initializers declared in a superclass
aren't inherited by subclasses.
That said, if a subclass initializes all of its stored properties with default values
and doesn't define any initializers of its own,
it inherits all of the superclass's initializers.
If the subclass overrides all of the superclass’s designated initializers,
it inherits the superclass’s convenience initializers.

As with methods, properties, and subscripts,
you need to mark overridden designated initializers with the `override` declaration modifier.

> Note: If you mark an initializer with the `required` declaration modifier,
> you don't also mark the initializer with the `override` modifier
> when you override the required initializer in a subclass.

Just like functions and methods, initializers can throw or rethrow errors.
And just like functions and methods,
you use the `throws` or `rethrows` keyword after an initializer's parameters
to indicate the appropriate behavior.
Likewise, initializers can be asynchronous,
and you use the `async` keyword to indicate this.

To see examples of initializers in various type declarations,
see <doc:Initialization>.

### Failable Initializers

A *failable initializer* is a type of initializer that produces an optional instance
or an implicitly unwrapped optional instance of the type the initializer is declared on.
As a result, a failable initializer can return `nil` to indicate that initialization failed.

To declare a failable initializer that produces an optional instance,
append a question mark to the `init` keyword in the initializer declaration (`init?`).
To declare a failable initializer that produces an implicitly unwrapped optional instance,
append an exclamation point instead (`init!`). The example below shows an `init?`
failable initializer that produces an optional instance of a structure.

```swift
struct SomeStruct {
    let property: String
    // produces an optional instance of 'SomeStruct'
    init?(input: String) {
        if input.isEmpty {
            // discard 'self' and return 'nil'
            return nil
        }
        property = input
    }
}
```

<!--
  - test: `failable`

  ```swifttest
  -> struct SomeStruct {
         let property: String
         // produces an optional instance of 'SomeStruct'
         init?(input: String) {
             if input.isEmpty {
                 // discard 'self' and return 'nil'
                 return nil
             }
             property = input
         }
     }
  ```
-->

You call an `init?` failable initializer in the same way that you call a nonfailable initializer,
except that you must deal with the optionality of the result.

```swift
if let actualInstance = SomeStruct(input: "Hello") {
    // do something with the instance of 'SomeStruct'
} else {
    // initialization of 'SomeStruct' failed and the initializer returned 'nil'
}
```

<!--
  - test: `failable`

  ```swifttest
  -> if let actualInstance = SomeStruct(input: "Hello") {
         // do something with the instance of 'SomeStruct'
  >>     _ = actualInstance
     } else {
         // initialization of 'SomeStruct' failed and the initializer returned 'nil'
     }
  ```
-->

A failable initializer can return `nil`
at any point in the implementation of the initializer's body.

A failable initializer can delegate to any kind of initializer.
A nonfailable initializer can delegate to another nonfailable initializer
or to an `init!` failable initializer.
A nonfailable initializer can delegate to an `init?` failable initializer
by force-unwrapping the result of the superclass's initializer ---
for example, by writing `super.init()!`.

Initialization failure propagates through initializer delegation.
Specifically,
if a failable initializer delegates to an initializer that fails and returns `nil`,
then the initializer that delegated also fails and implicitly returns `nil`.
If a nonfailable initializer delegates to an `init!` failable initializer that fails and returns `nil`,
then a runtime error is raised
(as if you used the `!` operator to unwrap an optional that has a `nil` value).

A failable designated initializer can be overridden in a subclass
by any kind of designated initializer.
A nonfailable designated initializer can be overridden in a subclass
by a nonfailable designated initializer only.

For more information and to see examples of failable initializers,
see <doc:Initialization#Failable-Initializers>.

> Grammar of an initializer declaration:
>
> *initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* **`async`**_?_ *throws-clause*_?_ *generic-where-clause*_?_ *initializer-body* \
> *initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* **`async`**_?_ **`rethrows`** *generic-where-clause*_?_ *initializer-body* \
> *initializer-head* → *attributes*_?_ *declaration-modifiers*_?_ **`init`** \
> *initializer-head* → *attributes*_?_ *declaration-modifiers*_?_ **`init`** **`?`** \
> *initializer-head* → *attributes*_?_ *declaration-modifiers*_?_ **`init`** **`!`** \
> *initializer-body* → *code-block*

## Deinitializer Declaration

A *deinitializer declaration* declares a deinitializer for a class type.
Deinitializers take no parameters and have the following form:

```swift
deinit {
   <#statements#>
}
```

A deinitializer is called automatically when there are no longer any references
to a class object, just before the class object is deallocated.
A deinitializer can be declared only in the body of a class declaration ---
but not in an extension of a class ---
and each class can have at most one.

A subclass inherits its superclass's deinitializer,
which is implicitly called just before the subclass object is deallocated.
The subclass object isn't deallocated until all deinitializers in its inheritance chain
have finished executing.

Deinitializers aren't called directly.

For an example of how to use a deinitializer in a class declaration,
see <doc:Deinitialization>.

> Grammar of a deinitializer declaration:
>
> *deinitializer-declaration* → *attributes*_?_ **`deinit`** *code-block*

## Extension Declaration

An *extension declaration* allows you to extend
the behavior of existing types.
Extension declarations are declared using the `extension` keyword
and have the following form:

```swift
extension <#type name#> where <#requirements#> {
   <#declarations#>
}
```

The body of an extension declaration contains zero or more *declarations*.
These *declarations* can include computed properties, computed type properties,
instance methods, type methods, initializers, subscript declarations,
and even class, structure, and enumeration declarations.
Extension declarations can't contain deinitializer or protocol declarations,
stored properties, property observers, or other extension declarations.
Declarations in a protocol extension can't be marked `final`.
For a discussion and several examples of extensions that include various kinds of declarations,
see <doc:Extensions>.

If the *type name* is a class, structure, or enumeration type,
the extension extends that type.
If the *type name* is a protocol type,
the extension extends all types that conform to that protocol.

Extension declarations that extend a generic type
or a protocol with associated types
can include *requirements*.
If an instance of the extended type
or of a type that conforms to the extended protocol
satisfies the *requirements*,
the instance gains the behavior specified in the declaration.

Extension declarations can contain initializer declarations. That said,
if the type you're extending is defined in another module,
an initializer declaration must delegate to an initializer already defined in that module
to ensure members of that type are properly initialized.

Properties, methods, and initializers of an existing type
can't be overridden in an extension of that type.

Extension declarations can add protocol conformance to an existing
class, structure, or enumeration type by specifying *adopted protocols*:

```swift
extension <#type name#>: <#adopted protocols#> where <#requirements#> {
   <#declarations#>
}
```

Extension declarations can't add class inheritance to an existing class,
and therefore you can specify only a list of protocols after the *type name* and colon.

### Conditional Conformance

You can extend a generic type
to conditionally conform to a protocol,
so that instances of the type conform to the protocol
only when certain requirements are met.
You add conditional conformance to a protocol
by including *requirements* in an extension declaration.

#### Overridden Requirements Aren't Used in Some Generic Contexts

In some generic contexts,
types that get behavior from conditional conformance to a protocol
don't always use the specialized implementations
of that protocol's requirements.
To illustrate this behavior,
the following example defines two protocols
and a generic type that conditionally conforms to both protocols.

<!--
  This test needs to be compiled so that it will recognize Pair's
  CustomStringConvertible conformance -- the deprecated REPL doesn't
  seem to use the description property at all.
-->

```swift
protocol Loggable {
    func log()
}
extension Loggable {
    func log() {
        print(self)
    }
}

protocol TitledLoggable: Loggable {
    static var logTitle: String { get }
}
extension TitledLoggable {
    func log() {
        print("\(Self.logTitle): \(self)")
    }
}

struct Pair<T>: CustomStringConvertible {
    let first: T
    let second: T
    var description: String {
        return "(\(first), \(second))"
    }
}

extension Pair: Loggable where T: Loggable { }
extension Pair: TitledLoggable where T: TitledLoggable {
    static var logTitle: String {
        return "Pair of '\(T.logTitle)'"
    }
}

extension String: TitledLoggable {
    static var logTitle: String {
        return "String"
    }
}
```

<!--
  - test: `conditional-conformance`

  ```swifttest
  -> protocol Loggable {
         func log()
     }
     extension Loggable {
         func log() {
             print(self)
         }
     }
  ---
     protocol TitledLoggable: Loggable {
         static var logTitle: String { get }
     }
     extension TitledLoggable {
         func log() {
             print("\(Self.logTitle): \(self)")
         }
     }
  ---
     struct Pair<T>: CustomStringConvertible {
         let first: T
         let second: T
         var description: String {
             return "(\(first), \(second))"
         }
     }
  ---
     extension Pair: Loggable where T: Loggable { }
     extension Pair: TitledLoggable where T: TitledLoggable {
         static var logTitle: String {
             return "Pair of '\(T.logTitle)'"
         }
     }
  ---
     extension String: TitledLoggable {
        static var logTitle: String {
           return "String"
        }
     }
  ```
-->

The `Pair` structure conforms to `Loggable` and `TitledLoggable`
whenever its generic type conforms to `Loggable` or `TitledLoggable`, respectively.
In the example below,
`oneAndTwo` is an instance of `Pair<String>`,
which conforms to `TitledLoggable`
because `String` conforms to `TitledLoggable`.
When the `log()` method is called on `oneAndTwo` directly,
the specialized version containing the title string is used.

```swift
let oneAndTwo = Pair(first: "one", second: "two")
oneAndTwo.log()
// Prints "Pair of 'String': (one, two)"
```

<!--
  - test: `conditional-conformance`

  ```swifttest
  -> let oneAndTwo = Pair(first: "one", second: "two")
  -> oneAndTwo.log()
  <- Pair of 'String': (one, two)
  ```
-->

However, when `oneAndTwo` is used in a generic context
or as an instance of the `Loggable` protocol,
the specialized version isn't used.
Swift picks which implementation of `log()` to call
by consulting only the minimum requirements that `Pair` needs to conform to `Loggable`.
For this reason,
the default implementation provided by the `Loggable` protocol is used instead.

```swift
func doSomething<T: Loggable>(with x: T) {
    x.log()
}
doSomething(with: oneAndTwo)
// Prints "(one, two)"
```

<!--
  - test: `conditional-conformance`

  ```swifttest
  -> func doSomething<T: Loggable>(with x: T) {
        x.log()
     }
     doSomething(with: oneAndTwo)
  <- (one, two)
  ```
-->

When `log()` is called on the instance that's passed to `doSomething(_:)`,
the customized title is omitted from the logged string.

### Protocol Conformance Must Not Be Redundant

A concrete type can conform to a particular protocol only once.
Swift marks redundant protocol conformances as an error.
You're likely to encounter this kind of error
in two kinds of situations.
The first situation is when
you explicitly conform to the same protocol multiple times,
but with different requirements.
The second situation is when
you implicitly inherit from the same protocol multiple times.
These situations are discussed in the sections below.

#### Resolving Explicit Redundancy

Multiple extensions on a concrete type
can't add conformance to the same protocol,
even if the extensions' requirements are mutually exclusive.
This restriction is demonstrated in the example below.
Two extension declarations attempt to add conditional conformance
to the `Serializable` protocol,
one for arrays with `Int` elements,
and one for arrays with `String` elements.

```swift
protocol Serializable {
    func serialize() -> Any
}

extension Array: Serializable where Element == Int {
    func serialize() -> Any {
        // implementation
    }
}
extension Array: Serializable where Element == String {
    func serialize() -> Any {
        // implementation
    }
}
// Error: redundant conformance of 'Array<Element>' to protocol 'Serializable'
```

<!--
  - test: `multiple-conformances`

  ```swifttest
  -> protocol Serializable {
        func serialize() -> Any
     }
  ---
     extension Array: Serializable where Element == Int {
         func serialize() -> Any {
             // implementation
  >>         return 0
  ->     }
     }
     extension Array: Serializable where Element == String {
         func serialize() -> Any {
             // implementation
  >>         return 0
  ->     }
     }
  // Error: redundant conformance of 'Array<Element>' to protocol 'Serializable'
  !$ error: conflicting conformance of 'Array<Element>' to protocol 'Serializable'; there cannot be more than one conformance, even with different conditional bounds
  !! extension Array: Serializable where Element == String {
  !! ^
  !$ note: 'Array<Element>' declares conformance to protocol 'Serializable' here
  !! extension Array: Serializable where Element == Int {
  !! ^
  ```
-->

If you need to add conditional conformance based on multiple concrete types,
create a new protocol that each type can conform to
and use that protocol as the requirement when declaring conditional conformance.

```swift
protocol SerializableInArray { }
extension Int: SerializableInArray { }
extension String: SerializableInArray { }

extension Array: Serializable where Element: SerializableInArray {
    func serialize() -> Any {
        // implementation
    }
}
```

<!--
  - test: `multiple-conformances-success`

  ```swifttest
  >> protocol Serializable { }
  -> protocol SerializableInArray { }
     extension Int: SerializableInArray { }
     extension String: SerializableInArray { }
  ---
  -> extension Array: Serializable where Element: SerializableInArray {
         func serialize() -> Any {
             // implementation
  >>         return 0
  ->     }
     }
  ```
-->

#### Resolving Implicit Redundancy

When a concrete type conditionally conforms to a protocol,
that type implicitly conforms to any parent protocols
with the same requirements.

If you need a type to conditionally conform to two protocols
that inherit from a single parent,
explicitly declare conformance to the parent protocol.
This avoids implicitly conforming to the parent protocol twice
with different requirements.

The following example explicitly declares
the conditional conformance of `Array` to `Loggable`
to avoid a conflict when declaring its conditional conformance
to both `TitledLoggable` and the new `MarkedLoggable` protocol.

```swift
protocol MarkedLoggable: Loggable {
    func markAndLog()
}

extension MarkedLoggable {
    func markAndLog() {
        print("----------")
        log()
    }
}

extension Array: Loggable where Element: Loggable { }
extension Array: TitledLoggable where Element: TitledLoggable {
    static var logTitle: String {
        return "Array of '\(Element.logTitle)'"
    }
}
extension Array: MarkedLoggable where Element: MarkedLoggable { }
```

<!--
  - test: `conditional-conformance`

  ```swifttest
  -> protocol MarkedLoggable: Loggable {
        func markAndLog()
     }
  ---
     extension MarkedLoggable {
        func markAndLog() {
           print("----------")
           log()
        }
     }
  ---
     extension Array: Loggable where Element: Loggable { }
     extension Array: TitledLoggable where Element: TitledLoggable {
        static var logTitle: String {
           return "Array of '\(Element.logTitle)'"
        }
     }
     extension Array: MarkedLoggable where Element: MarkedLoggable { }
  ```
-->

Without the extension
to explicitly declare conditional conformance to `Loggable`,
the other `Array` extensions would implicitly create these declarations,
resulting in an error:

```swift
extension Array: Loggable where Element: TitledLoggable { }
extension Array: Loggable where Element: MarkedLoggable { }
// Error: redundant conformance of 'Array<Element>' to protocol 'Loggable'
```

<!--
  - test: `conditional-conformance-implicit-overlap`

  ```swifttest
  >> protocol Loggable { }
  >> protocol MarkedLoggable : Loggable { }
  >> protocol TitledLoggable : Loggable { }
  -> extension Array: Loggable where Element: TitledLoggable { }
     extension Array: Loggable where Element: MarkedLoggable { }
  // Error: redundant conformance of 'Array<Element>' to protocol 'Loggable'
  !$ error: conflicting conformance of 'Array<Element>' to protocol 'Loggable'; there cannot be more than one conformance, even with different conditional bounds
  !! extension Array: Loggable where Element: MarkedLoggable { }
  !! ^
  !$ note: 'Array<Element>' declares conformance to protocol 'Loggable' here
  !! extension Array: Loggable where Element: TitledLoggable { }
  !! ^
  ```
-->

<!--
  - test: `types-cant-have-multiple-implicit-conformances`

  ```swifttest
  >> protocol Loggable { }
     protocol TitledLoggable: Loggable { }
     protocol MarkedLoggable: Loggable { }
     extension Array: TitledLoggable where Element: TitledLoggable {
         // ...
     }
     extension Array: MarkedLoggable where Element: MarkedLoggable { }
  !$ error: conditional conformance of type 'Array<Element>' to protocol 'TitledLoggable' does not imply conformance to inherited protocol 'Loggable'
  !! extension Array: TitledLoggable where Element: TitledLoggable {
  !! ^
  !$ note: did you mean to explicitly state the conformance like 'extension Array: Loggable where ...'?
  !! extension Array: TitledLoggable where Element: TitledLoggable {
  !! ^
  !$ error: type 'Array<Element>' does not conform to protocol 'MarkedLoggable'
  !! extension Array: MarkedLoggable where Element: MarkedLoggable { }
  !! ^
  !$ error: type 'Element' does not conform to protocol 'TitledLoggable'
  !! extension Array: MarkedLoggable where Element: MarkedLoggable { }
  !! ^
  !$ error: 'MarkedLoggable' requires that 'Element' conform to 'TitledLoggable'
  !! extension Array: MarkedLoggable where Element: MarkedLoggable { }
  !! ^
  !$ note: requirement specified as 'Element' : 'TitledLoggable'
  !! extension Array: MarkedLoggable where Element: MarkedLoggable { }
  !! ^
  !$ note: requirement from conditional conformance of 'Array<Element>' to 'Loggable'
  !! extension Array: MarkedLoggable where Element: MarkedLoggable { }
  !! ^
  ```
-->

<!--
  - test: `extension-can-have-where-clause`

  ```swifttest
  >> extension Array where Element: Equatable {
         func f(x: Array) -> Int { return 7 }
     }
  >> let x = [1, 2, 3]
  >> let y = [10, 20, 30]
  >> let r0 = x.f(x: y)
  >> assert(r0 == 7)
  ```
-->

<!--
  - test: `extensions-can-have-where-clause-and-inheritance-together`

  ```swifttest
  >> protocol P { func foo() -> Int }
  >> extension Array: P where Element: Equatable {
  >>    func foo() -> Int { return 0 }
  >> }
  >> let r0 = [1, 2, 3].foo()
  >> assert(r0 == 0)
  ```
-->

> Grammar of an extension declaration:
>
> *extension-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`extension`** *type-identifier* *type-inheritance-clause*_?_ *generic-where-clause*_?_ *extension-body* \
> *extension-body* → **`{`** *extension-members*_?_ **`}`**
>
> *extension-members* → *extension-member* *extension-members*_?_ \
> *extension-member* → *declaration* | *compiler-control-statement*

## Subscript Declaration

A *subscript* declaration allows you to add subscripting support for objects
of a particular type and are typically used to provide a convenient syntax
for accessing the elements in a collection, list, or sequence.
Subscript declarations are declared using the `subscript` keyword
and have the following form:

```swift
subscript (<#parameters#>) -> <#return type#> {
   get {
      <#statements#>
   }
   set(<#setter name#>) {
      <#statements#>
   }
}
```

Subscript declarations can appear only in the context of a class, structure,
enumeration, extension, or protocol declaration.

The *parameters* specify one or more indexes used to access elements of the corresponding type
in a subscript expression (for example, the `i` in the expression `object[i]`).
Although the indexes used to access the elements can be of any type,
each parameter must include a type annotation to specify the type of each index.
The *return type* specifies the type of the element being accessed.

As with computed properties,
subscript declarations support reading and writing the value of the accessed elements.
The getter is used to read the value,
and the setter is used to write the value.
The setter clause is optional,
and when only a getter is needed, you can omit both clauses and simply
return the requested value directly.
That said, if you provide a setter clause, you must also provide a getter clause.

The *setter name* and enclosing parentheses are optional.
If you provide a setter name, it's used as the name of the parameter to the setter.
If you don't provide a setter name, the default parameter name to the setter is `value`.
The type of the parameter to the setter is the same as the *return type*.

You can overload a subscript declaration in the type in which it's declared,
as long as the *parameters* or the *return type* differ from the one you're overloading.
You can also override a subscript declaration inherited from a superclass. When you do so,
you must mark the overridden subscript declaration with the `override` declaration modifier.

Subscript parameters follow the same rules as function parameters,
with two exceptions.
By default, the parameters used in subscripting don't have argument labels,
unlike functions, methods, and initializers.
However, you can provide explicit argument labels
using the same syntax that functions, methods, and initializers use.
In addition, subscripts can't have in-out parameters.
A subscript parameter can have a default value,
using the syntax described in <doc:Declarations#Special-Kinds-of-Parameters>.

You can also declare subscripts in the context of a protocol declaration,
as described in <doc:Declarations#Protocol-Subscript-Declaration>.

For more information about subscripting and to see examples of subscript declarations,
see <doc:Subscripts>.

### Type Subscript Declarations

To declare a subscript that's exposed by the type,
rather than by instances of the type,
mark the subscript declaration with the `static` declaration modifier.
Classes can mark type computed properties with the `class` declaration modifier instead
to allow subclasses to override the superclass’s implementation.
In a class declaration,
the `static` keyword has the same effect as marking the declaration
with both the `class` and `final` declaration modifiers.

<!--
  - test: `cant-override-static-subscript-in-subclass`

  ```swifttest
  -> class Super { static subscript(i: Int) -> Int { return 10 } }
  -> class Sub: Super { override static subscript(i: Int) -> Int { return 100 } }
  !$ error: cannot override static subscript
  !! class Sub: Super { override static subscript(i: Int) -> Int { return 100 } }
  !!                                    ^
  !$ note: overridden declaration is here
  !! class Super { static subscript(i: Int) -> Int { return 10 } }
  !!                      ^
  ```
-->

> Grammar of a subscript declaration:
>
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *code-block* \
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *getter-setter-block* \
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *getter-setter-keyword-block* \
> *subscript-head* → *attributes*_?_ *declaration-modifiers*_?_ **`subscript`** *generic-parameter-clause*_?_ *parameter-clause* \
> *subscript-result* → **`->`** *attributes*_?_ *type*

## Macro Declaration

A *macro declaration* introduces a new macro.
It begins with the `macro` keyword
and has the following form:

```swift
macro <#name#> = <#macro implementation#>
```

The *macro implementation* is another macro,
and indicates the location of the code that performs this macro's expansion.
The code that performs macro expansion is a separate Swift program,
that uses the [SwiftSyntax][] module to interact with Swift code.
Call the `externalMacro(module:type:)` macro from the Swift standard library,
passing in the name of a type that contains the macro's implementation,
and the name of the module that contains that type.

[SwiftSyntax]: http://github.com/apple/swift-syntax/

Macros can be overloaded,
following the same model used by functions.
A macro declaration appears only at file scope.

For an overview of macros in Swift, see <doc:Macros>.

> Grammar of a macro declaration:
>
> *macro-declaration* → *macro-head* *identifier* *generic-parameter-clause*_?_ *macro-signature* *macro-definition*_?_ *generic-where-clause* \
> *macro-head* → *attributes*_?_ *declaration-modifiers*_?_ **`macro`** \
> *macro-signature* → *parameter-clause* *macro-function-signature-result*_?_ \
> *macro-function-signature-result* → **`->`** *type* \
> *macro-definition* → **`=`** *expression*

## Operator Declaration

An *operator declaration* introduces a new infix, prefix,
or postfix operator into your program
and is declared using the `operator` keyword.

You can declare operators of three different fixities:
infix, prefix, and postfix.
The *fixity* of an operator specifies the relative position of an operator
to its operands.

There are three basic forms of an operator declaration,
one for each fixity.
The fixity of the operator is specified by marking the operator declaration with the
`infix`, `prefix`, or `postfix` declaration modifier before the `operator` keyword.
In each form, the name of the operator can contain only the operator characters
defined in <doc:LexicalStructure#Operators>.

The following form declares a new infix operator:

```swift
infix operator <#operator name#>: <#precedence group#>
```

An *infix operator* is a binary operator that's written between its two operands,
such as the familiar addition operator (`+`) in the expression `1 + 2`.

Infix operators can optionally specify a precedence group.
If you omit the precedence group for an operator,
Swift uses the default precedence group, `DefaultPrecedence`,
which specifies a precedence just higher than `TernaryPrecedence`.
For more information, see <doc:Declarations#Precedence-Group-Declaration>.

The following form declares a new prefix operator:

```swift
prefix operator <#operator name#>
```

A *prefix operator* is a unary operator that's written immediately before its operand,
such as the prefix logical NOT operator (`!`) in the expression `!a`.

Prefix operators declarations don't specify a precedence level.
Prefix operators are nonassociative.

The following form declares a new postfix operator:

```swift
postfix operator <#operator name#>
```

A *postfix operator* is a unary operator that's written immediately after its operand,
such as the postfix forced-unwrap operator (`!`) in the expression `a!`.

As with prefix operators, postfix operator declarations don't specify a precedence level.
Postfix operators are nonassociative.

After declaring a new operator,
you implement it by declaring a static method that has the same name as the operator.
The static method is a member of
one of the types whose values the operator takes as an argument ---
for example, an operator that multiplies a `Double` by an `Int`
is implemented as a static method on either the `Double` or `Int` structure.
If you're implementing a prefix or postfix operator,
you must also mark that method declaration with the corresponding `prefix` or `postfix`
declaration modifier.
To see an example of how to create and implement a new operator,
see <doc:AdvancedOperators#Custom-Operators>.

> Grammar of an operator declaration:
>
> *operator-declaration* → *prefix-operator-declaration* | *postfix-operator-declaration* | *infix-operator-declaration*
>
> *prefix-operator-declaration* → **`prefix`** **`operator`** *operator* \
> *postfix-operator-declaration* → **`postfix`** **`operator`** *operator* \
> *infix-operator-declaration* → **`infix`** **`operator`** *operator* *infix-operator-group*_?_
>
> *infix-operator-group* → **`:`** *precedence-group-name*

## Precedence Group Declaration

A *precedence group declaration* introduces
a new grouping for infix operator precedence into your program.
The precedence of an operator specifies how tightly the operator
binds to its operands, in the absence of grouping parentheses.

A precedence group declaration has the following form:

```swift
precedencegroup <#precedence group name#> {
    higherThan: <#lower group names#>
    lowerThan: <#higher group names#>
    associativity: <#associativity#>
    assignment: <#assignment#>
}
```

The *lower group names* and *higher group names* lists specify
the new precedence group's relation to existing precedence groups.
The `lowerThan` precedence group attribute may only be used
to refer to precedence groups declared outside of the current module.
When two operators compete with each other for their operands,
such as in the expression `2 + 3 * 5`,
the operator with the higher relative precedence
binds more tightly to its operands.

> Note: Precedence groups related to each other
> using *lower group names* and *higher group names*
> must fit into a single relational hierarchy,
> but they *don't* have to form a linear hierarchy.
> This means it's possible to have precedence groups
> with undefined relative precedence.
> Operators from those precedence groups
> can't be used next to each other without grouping parentheses.

Swift defines numerous precedence groups to go along
with the operators provided by the Swift standard library.
For example, the addition (`+`) and subtraction (`-`) operators
belong to the `AdditionPrecedence` group,
and the multiplication (`*`) and division (`/`) operators
belong to the `MultiplicationPrecedence` group.
For a complete list of precedence groups
provided by the Swift standard library,
see [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

The *associativity* of an operator specifies how a sequence of operators
with the same precedence level are grouped together in the absence of grouping parentheses.
You specify the associativity of an operator by writing
one of the context-sensitive keywords `left`, `right`, or `none` ---
if your omit the associativity, the default is `none`.
Operators that are left-associative group left-to-right.
For example,
the subtraction operator (`-`) is left-associative,
so the expression `4 - 5 - 6` is grouped as `(4 - 5) - 6`
and evaluates to `-7`.
Operators that are right-associative group right-to-left,
and operators that are specified with an associativity of `none`
don't associate at all.
Nonassociative operators of the same precedence level
can't appear adjacent to each to other.
For example,
the `<` operator has an associativity of `none`,
which means `1 < 2 < 3` isn't a valid expression.

The *assignment* of a precedence group specifies the precedence of an operator
when used in an operation that includes optional chaining.
When set to `true`, an operator in the corresponding precedence group
uses the same grouping rules during optional chaining
as the assignment operators from the Swift standard library.
Otherwise, when set to `false` or omitted,
operators in the precedence group follows the same optional chaining rules
as operators that don't perform assignment.

> Grammar of a precedence group declaration:
>
> *precedence-group-declaration* → **`precedencegroup`** *precedence-group-name* **`{`** *precedence-group-attributes*_?_ **`}`**
>
> *precedence-group-attributes* → *precedence-group-attribute* *precedence-group-attributes*_?_ \
> *precedence-group-attribute* → *precedence-group-relation* \
> *precedence-group-attribute* → *precedence-group-assignment* \
> *precedence-group-attribute* → *precedence-group-associativity*
>
> *precedence-group-relation* → **`higherThan`** **`:`** *precedence-group-names* \
> *precedence-group-relation* → **`lowerThan`** **`:`** *precedence-group-names*
>
> *precedence-group-assignment* → **`assignment`** **`:`** *boolean-literal*
>
> *precedence-group-associativity* → **`associativity`** **`:`** **`left`** \
> *precedence-group-associativity* → **`associativity`** **`:`** **`right`** \
> *precedence-group-associativity* → **`associativity`** **`:`** **`none`**
>
> *precedence-group-names* → *precedence-group-name* | *precedence-group-name* **`,`** *precedence-group-names* \
> *precedence-group-name* → *identifier*

## Declaration Modifiers

*Declaration modifiers* are keywords or context-sensitive keywords that modify the behavior
or meaning of a declaration. You specify a declaration modifier by writing the appropriate
keyword or context-sensitive keyword between a declaration's attributes (if any) and the keyword
that introduces the declaration.

- term `class`:
  Apply this modifier to a member of a class
  to indicate that the member is a member of the class itself,
  rather than a member of instances of the class.
  Members of a superclass that have this modifier
  and don't have the `final` modifier
  can be overridden by subclasses.

- term `dynamic`:
  Apply this modifier to any member of a class that can be represented by Objective-C.
  When you mark a member declaration with the `dynamic` modifier,
  access to that member is always dynamically dispatched using the Objective-C runtime.
  Access to that member is never inlined or devirtualized by the compiler.

  Because declarations marked with the `dynamic` modifier are dispatched
  using the Objective-C runtime, they must be marked with the
  `objc` attribute.

- term `final`:
  Apply this modifier to a class or to a property, method,
  or subscript member of a class. It's applied to a class to indicate that the class
  can't be subclassed. It's applied to a property, method, or subscript of a class
  to indicate that a class member can't be overridden in any subclass.
  For an example of how to use the `final` attribute,
  see <doc:Inheritance#Preventing-Overrides>.

- term `lazy`:
  Apply this modifier to a stored variable property of a class or structure
  to indicate that the property's initial value is calculated and stored at most
  once, when the property is first accessed.
  For an example of how to use the `lazy` modifier,
  see <doc:Properties#Lazy-Stored-Properties>.

- term `optional`:
  Apply this modifier to a protocol's property, method,
  or subscript members to indicate that a conforming type isn't required
  to implement those members.

  You can apply the `optional` modifier only to protocols that are marked
  with the `objc` attribute. As a result, only class types can adopt and conform
  to a protocol that contains optional member requirements.
  For more information about how to use the `optional` modifier
  and for guidance about how to access optional protocol members ---
  for example, when you're not sure whether a conforming type implements them ---
  see <doc:Protocols#Optional-Protocol-Requirements>.

<!--
  TODO: Currently, you can't check for an optional initializer,
  so we're leaving those out of the documentation, even though you can mark
  an initializer with the @optional attribute. It's still being decided by the
  compiler team. Update this section if they decide to make everything work
  properly for optional initializer requirements.
-->

- term `required`:
  Apply this modifier to a designated or convenience initializer
  of a class to indicate that every subclass must implement that initializer.
  The subclass's implementation of that initializer
  must also be marked with the `required` modifier.

- term `static`:
  Apply this modifier to a member of a structure, class, enumeration, or protocol
  to indicate that the member is a member of the type,
  rather than a member of instances of that type.
  In the scope of a class declaration,
  writing the `static` modifier on a member declaration
  has the same effect as writing the `class` and `final` modifiers
  on that member declaration.
  However, constant type properties of a class are an exception:
  `static` has its normal, nonclass meaning there
  because you can't write `class` or `final` on those declarations.

- term `unowned`:
  Apply this modifier to a stored variable, constant, or stored property
  to indicate that the variable or property has an unowned reference
  to the object stored as its value.
  If you try to access the variable or property
  after the object has been deallocated,
  a runtime error is raised.
  Like a weak reference,
  the type of the property or value must be a class type;
  unlike a weak reference,
  the type is non-optional.
  For an example and more information about the `unowned` modifier,
  see <doc:AutomaticReferenceCounting#Unowned-References>.

- term `unowned(safe)`:
  An explicit spelling of `unowned`.

- term `unowned(unsafe)`:
  Apply this modifier to a stored variable, constant, or stored property
  to indicate that the variable or property has an unowned reference
  to the object stored as its value.
  If you try to access the variable or property
  after the object has been deallocated,
  you'll access the memory at the location where the object used to be,
  which is a memory-unsafe operation.
  Like a weak reference,
  the type of the property or value must be a class type;
  unlike a weak reference,
  the type is non-optional.
  For an example and more information about the `unowned` modifier,
  see <doc:AutomaticReferenceCounting#Unowned-References>.

- term `weak`:
  Apply this modifier to a stored variable or stored variable property
  to indicate that the variable or property has a weak reference to the
  object stored as its value. The type of the variable or property
  must be an optional class type.
  If you access the variable or property
  after the object has been deallocated,
  its value is `nil`.
  For an example and more information about the `weak` modifier,
  see <doc:AutomaticReferenceCounting#Weak-References>.

### Access Control Levels

Swift provides five levels of access control: open, public, internal, file private, and private.
You can mark a declaration with one of the access-level modifiers below
to specify the declaration's access level.
Access control is discussed in detail in <doc:AccessControl>.

- term `open`:
  Apply this modifier to a declaration to indicate the declaration can be accessed and subclassed
  by code in the same module as the declaration.
  Declarations marked with the `open` access-level modifier can also be accessed and subclassed
  by code in a module that imports the module that contains that declaration.

- term `public`:
  Apply this modifier to a declaration to indicate the declaration can be accessed and subclassed
  by code in the same module as the declaration.
  Declarations marked with the `public` access-level modifier can also be accessed (but not subclassed)
  by code in a module that imports the module that contains that declaration.

- term `package`:
  Apply this modifier to a declaration
  to indicate that the declaration can be accessed
  only by code in the same package as the declaration.
  A package is a unit of code distribution
  that you define in the build system you're using.
  When the build system compiles code,
  it specifies the package name
  by passing the `-package-name` flag to the Swift compiler.
  Two modules are part of the same package
  if the build system specifies the same package name when building them.

- term `internal`:
  Apply this modifier to a declaration to indicate the declaration can be accessed
  only by code in the same module as the declaration.
  By default,
  most declarations are implicitly marked with the `internal` access-level modifier.

- term `fileprivate`:
  Apply this modifier to a declaration to indicate the declaration can be accessed
  only by code in the same source file as the declaration.

- term `private`:
  Apply this modifier to a declaration to indicate the declaration can be accessed
  only by code within the declaration's immediate enclosing scope.

For the purpose of access control,
extensions behave as follows:

- If there are multiple extensions in the same file,
  and those extensions all extend the same type,
  then all of those extensions have the same access-control scope.
  The extensions and the type they extend can be in different files.

- If there are extensions in the same file as the type they extend,
  the extensions have the same access-control scope as the type they extend.

- Private members declared in a type's declaration
  can be accessed from extensions to that type.
  Private members declared in one extension
  can be accessed from other extensions
  and from the extended type's declaration.

Each access-level modifier above optionally accepts a single argument,
which consists of the `set` keyword enclosed in parentheses ---
for example, `private(set)`.
Use this form of an access-level modifier when you want to specify an access level
for the setter of a variable or subscript that's less than or equal
to the access level of the variable or subscript itself,
as discussed in <doc:AccessControl#Getters-and-Setters>.

> Grammar of a declaration modifier:
>
> *declaration-modifier* → **`class`** | **`convenience`** | **`dynamic`** | **`final`** | **`infix`** | **`lazy`** | **`optional`** | **`override`** | **`postfix`** | **`prefix`** | **`required`** | **`static`** | **`unowned`** | **`unowned`** **`(`** **`safe`** **`)`** | **`unowned`** **`(`** **`unsafe`** **`)`** | **`weak`** \
> *declaration-modifier* → *access-level-modifier* \
> *declaration-modifier* → *mutation-modifier* \
> *declaration-modifier* → *actor-isolation-modifier* \
> *declaration-modifiers* → *declaration-modifier* *declaration-modifiers*_?_
>
> *access-level-modifier* → **`private`** | **`private`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`fileprivate`** | **`fileprivate`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`internal`** | **`internal`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`package`** | **`package`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`public`** | **`public`** **`(`** **`set`** **`)`** \
> *access-level-modifier* → **`open`** | **`open`** **`(`** **`set`** **`)`**
>
> *mutation-modifier* → **`mutating`** | **`nonmutating`**
>
> *actor-isolation-modifier* → **`nonisolated`**

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
