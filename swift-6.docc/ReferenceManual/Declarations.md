# 声明

引入类型、运算符、变量以及其他名称和构造。

*声明*将在程序中引入一个新的名称或构造。例如，你使用声明来引入函数和方法，引入变量和常量，以及定义枚举、结构体、类和协议类型。你还可以使用声明来扩展现有具名类型的行为，并将其他地方声明的符号引入到你的程序中。

在 Swift 中，大多数声明也是定义，因为它们在声明的同时被实现或初始化。但由于协议不实现它的成员，所以协议成员在此仅仅是声明。为了方便起见，而且这种区别在 Swift 中没那么重要，所以术语*声明*涵盖了声明和定义两种含义。

> 声明的语法:
>
> *declaration* → *import-declaration* \
> *declaration* → *constant-declaration* \
> *declaration* → *variable-declaration* \
> *declaration* → *typealias-declaration* \
> *declaration* → *function-declaration* \
> *declaration* → *enum-declaration* \
> *declaration* → *struct-declaration* \
> *declaration* → *class-declaration* \
> *declaration* → *actor-declaration* \
> *declaration* → *protocol-declaration* \
> *declaration* → *initializer-declaration* \
> *declaration* → *deinitializer-declaration* \
> *declaration* → *extension-declaration* \
> *declaration* → *subscript-declaration* \
> *declaration* → *macro-declaration* \
> *declaration* → *operator-declaration* \
> *declaration* → *precedence-group-declaration*

## 顶级代码

Swift 源文件中的顶级代码由零个或多个语句、声明和表达式组成。默认情况下，在源文件顶层声明的变量、常量和其他具名声明可以被同一模块中每个源文件的代码访问。你可以使用访问级别修饰符来重写此默认行为，具体说明见 <doc:Declarations#访问控制级别>。

有两种类型的顶级代码：顶级声明和可执行的顶级代码。顶级声明仅由声明组成，允许出现在所有 Swift 源文件中。可执行的顶级代码包含语句和表达式，而不仅仅是声明，仅允许作为程序的顶级入口点。

编译 Swift 代码生成可执行文件时，无论文件和模块中的代码如何组织，都只能通过以下方法之一来指定顶级入口点：`main` 特性、`NSApplicationMain` 特性、`UIApplicationMain` 特性、`main.swift` 文件，或包含顶级可执行代码的文件。

> 顶级声明的语法:
>
> *top-level-declaration* → *statements*_?_

## 代码块

*代码块*被各种声明和控制结构用来将语句组合在一起。它具有以下形式：

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

> 代码块的语法:
>
> *code-block* → **`{`** *statements*_?_ **`}`**

## 导入声明

*导入声明*允许你访问在当前文件之外声明的符号。基本形式是导入整个模块；它由 `import` 关键字后跟模块名称组成。

```swift
import <#module#>
```

提供更多细节可以限制导入哪些符号——可以指定特定的子模块，也可以指定模块或子模块中特定的声明。使用这种限制后，在当前作用域中，只有被导入的符号是可用的，而不是整个模块中的所有声明。

```swift
import <#import kind#> <#module#>.<#symbol name#>
import <#module#>.<#submodule#>
```

<!--
  TODO: Need to add more to this section.
-->

> 导入声明的语法:
>
> *import-declaration* → *attributes*_?_ **`import`** *import-kind*_?_ *import-path*
>
> *import-kind* → **`typealias`** | **`struct`** | **`class`** | **`enum`** | **`protocol`** | **`let`** | **`var`** | **`func`** \
> *import-path* → *identifier* | *identifier* **`.`** *import-path*

## 常量声明

*常量声明*会在你的程序中引入一个具名的常量值。常量声明使用 `let` 关键字，形式如下：

```swift
let <#constant name#>: <#type#> = <#expression#>
```

常量声明定义了*常量名称*与构造器*表达式*的值之间的不可变绑定；一旦常量的被赋值，就无法更改。也就是说，如果常量是用类对象初始化的，对象本身可以改变，但常量名称与它所指向的对象之间的绑定不能改变。

当常量声明在全局作用域时，常量必须赋值。当常量声明在函数或者方法的上下文中时，可以稍后初始化，只要保证在第一次读取其值之前已为其赋值。如果编译器能够证明常量的值从未被读取，则不要求该常量必须赋值。此分析称为*确定初始化*——编译器保证一个值在读取之前值已被赋值。

> 注意:
> 确定初始化无法分析包含特定领域的内容，并且对条件语句中的状态跟踪能力也有限。如果你可以确定常量始终有一个值，但编译器无法证明这一点，请尝试简化设置该值的代码路径，或改用变量声明。

<!--
In the most general case,
DI reduces to the halting problem,
as shown by Rice's theorem.
-->

当常量声明出现在类或结构体声明的上下文中时，它被视为一个*常量属性*。常量声明不是计算属性，因此没有 getter 或 setter。

如果*常量名称*是元组形式，元组中每一项的名称都会和初始化*表达式*中对应的值进行绑定。

```swift
let (firstNumber, secondNumber) = (10, 42)
```

<!--
  - test: `constant-decl`

  ```swifttest
  -> let (firstNumber, secondNumber) = (10, 42)
  ```
-->

在这个例子中，`firstNumber` 是值 `10` 的具名常量，而 `secondNumber` 是值 `42` 的具名常量。现在这两个常量可以独立使用：

```swift
print("The first number is \(firstNumber).")
// 打印 "The first number is 10."
print("The second number is \(secondNumber).")
// 打印 "The second number is 42."
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

在常量声明中，当可以推断出*常量名称*的类型时，类型注释（`:` *type*）是可选的，详见 <doc:Types#类型推断>。

要声明一个常量类型属性，请使用 `static` 声明修饰符标记该声明。类的常量类型属性总是隐式为 final；你无法用 class 或 final 声明修饰符实现允许或禁止被子类重写的目的。类型属性的讨论请参见 <doc:Properties#类型属性>。

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

有关常量的更多信息以及何时使用它们的指导，请参见 <doc:TheBasics#常量和变量> 和 <doc:Properties#存储属性>。

> 常量声明的语法
>
> *constant-declaration* → *attributes*_?_ *declaration-modifiers*_?_ **`let`** *pattern-initializer-list*
>
> *pattern-initializer-list* → *pattern-initializer* | *pattern-initializer* **`,`** *pattern-initializer-list* \
> *pattern-initializer* → *pattern* *initializer*_?_ \
> *initializer* → **`=`** *expression*

## 变量声明

*变量声明*会在你的程序中引入一个具名的变量值，并使用 `var` 关键字进行声明。

变量声明有多种形式，用于定义各种有名称的、可变的值，包括存储变量和计算变量及属性、存储变量和属性观察者，以及静态变量属性。使用哪种形式取决于变量声明的作用域以及你打算声明的变量类型。

> 注意:
> 你还可以在协议声明的上下文中声明属性，参见 <doc:Declarations#协议属性声明>。

你可以通过在子类的属性声明中标记 `override` 声明修饰符来重写属性，参见 <doc:Inheritance#重写>。

### 存储变量和存储变量属性

以下形式声明了一个存储变量或存储变量属性：

```swift
var <#variable name#>: <#type#> = <#expression#>
```

你可以在全局作用域、函数的局部作用域，类或结构体声明的上下文中定义这种形式的变量声明。当这种形式的变量声明在全局作用域或函数的全局作用域内声明时，它被称为*存储变量*。当它在类或结构体声明的上下文中声明时，它被称为*存储变量属性*。

构造器*表达式*不能出现在协议声明中，但在其他场景下，构造器*表达式*是可选的。也就是说，如果没有构造器*表达式*，变量声明必须包含显式类型注释（`:` *type*）。

与常量声明一样，如果变量声明省略了构造器*表达式*，则在第一次读取该变量之前必须为其设置一个值。同样，如果*变量名*是一个元组模式，则元组中每个项的名称都绑定到构造器*表达式*中的相应值。

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

你可以在全局作用域、函数的全局作用域或类、结构体、枚举或扩展声明的上下文中定义这种形式的变量声明。当这种形式的变量声明在全局作用域或函数的全局作用域内声明时，它被称为*计算变量*。当它在类、结构体或扩展声明的上下文中声明时，它被称为*计算属性*。

getter 用于读取值，setter 用于写入值。setter 子句是可选的，当只需要 getter 时，可以省略两个子句，直接返回请求的值，参见 <doc:Properties#只读计算属性>。但如果提供了 setter 子句，则必须同时提供 getter 子句。

*setter 名称*和括号是可选的。如果你提供了 setter 名称，它将用作 setter 参数的名称。如果你不提供 setter 名称，setter 的默认参数名称是 `newValue`，参见 <doc:Properties#简化-Setter-声明>。

与存储的具名值和存储的变量属性不同，计算的具名值或计算属性的值并不会存储在内存中。

有关更多信息以及查看计算属性的示例，请参见 <doc:Properties#计算属性>。

### 存储变量观察者和属性观察者

你还可以使用 `willSet` 和 `didSet` 观察者声明一个存储变量或属性。带有观察者的存储变量或属性具有以下形式：

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

你可以在全局作用域、函数的全局作用域或类或结构体声明的上下文中定义这种变量声明形式。当这种形式的变量声明在全局作用域或函数的全局作用域内声明时，观察者被称为*存储变量观察者*。当它在类或结构体声明的上下文中声明时，观察者被称为*属性观察者*。

你可以为任何存储属性添加属性观察者。你还可以通过在子类中重写属性，为任何继承自父类的属性（无论是存储的还是计算的）添加属性观察者，参见 <doc:Inheritance#重写属性观察器>。

构造器*表达式*在类或结构体声明的上下文中是可选的，但在其他地方是必须的。如果能通过构造器*表达式*推断出类型，则*类型*标注是可选的。通常，表达式的类型推断发生在首次读取属性时。如果在读取属性之前，初值已经被重写，则推断发生在首次写入属性时。

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

`willSet` 和 `didSet` 观察者提供了一种在变量或属性被赋值时的观察（和响应）方式。当变量或属性首次初始化时，观察者不会被调用。相反，它们仅在初始化上下文之外的情况下，值被设置时被调用。

`willSet` 观察者在变量或属性的值被设置之前被调用。新值作为常量传递给 `willSet` 观察者，因此新值在 `willSet` 子句的实现中无法更改。`didSet` 观察者在新值被设置后立即被调用。与 `willSet` 观察者不同，变量或属性的旧值会传递给 `didSet` 观察者，以防你仍然需要访问它。也就是说，如果你在其自己的 `didSet` 观察者子句中给变量或属性赋值，那么你赋的这个新值将替代刚刚设置并传递给 `willSet` 观察者的值。

*setter 名称*和 `willSet` 与 `didSet` 子句中的括号是可选的。如果提供了 setter 名称，它们将作为 `willSet` 和 `didSet` 观察者的参数名称。如果不提供 setter 名称，`willSet` 观察者的默认参数名称是 `newValue`，而 `didSet` 观察者的默认参数名称是 `oldValue`。

`didSet` 子句在提供 `willSet` 子句时是可选的。同样，在提供 `didSet` 子句时，`willSet` 子句也是可选的。

如果在 `didSet` 主体中引用了旧值，为了使旧值可用，在调用 `didSet` 之前，会先调用 getter。否则，新的值会被存储，而不调用超类的 getter。下面的示例显示了一个由超类定义并被其子类重写以添加观察者的计算属性。

```swift
class Superclass {
    private var xValue = 12
    var x: Int {
        get { print("Getter was called"); return xValue }
        set { print("Setter was called"); xValue = newValue }
    }
}

// 这个子类在它的观察器中没有引用 oldValue，
// 因此，父类的 getter 方法中的打印语句只会执行一次
class New: Superclass {
    override var x: Int {
        didSet { print("New value \(x)") }
    }
}
let new = New()
new.x = 100
// 打印 "Setter was called"
// 打印 "Getter was called"
// 打印 "New value 100"

// 这个子类在它的观察器中引用了 oldValue，
// 因此父类的 getter 在 setter 之前会被调用一次，
// 然后再次调用以打印该值。
class NewAndOld: Superclass {
    override var x: Int {
        didSet { print("Old value \(oldValue) - new value \(x)") }
    }
}
let newAndOld = NewAndOld()
newAndOld.x = 200
// 打印 "Getter was called"
// 打印 "Setter was called"
// 打印 "Getter was called"
// 打印 "Old value 12 - new value 200"
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

有关更多信息以及如何使用属性观察者的示例，请参见 <doc:Properties#属性观察器>。
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

### 类型变量属性

要声明一个类型变量属性，请使用 `static` 声明修饰符标记声明。类可以使用 `class` 声明修饰符标记类型计算属性，以允许子类重写超类的实现。类型属性的讨论请参见 <doc:Properties#类型属性>。

> 变量声明的语法:
>
> *variable-declaration* → *variable-declaration-head* *pattern-initializer-list* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *code-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-keyword-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *initializer* *willSet-didSet-block* \
> *variable-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *initializer*_?_ *willSet-didSet-block*
>
> *variable-declaration-head* → *attributes*_?_ *declaration-modifiers*_?_ **`var`** \
> *variable-name* → *identifier*
>
> *getter-setter-block* → *code-block* \
> *getter-setter-block* → **`{`** *getter-clause* *setter-clause*_?_ **`}`** \
> *getter-setter-block* → **`{`** *setter-clause* *getter-clause* **`}`** \
> *getter-clause* → *attributes*_?_ *mutation-modifier*_?_ **`get`** *code-block* \
> *setter-clause* → *attributes*_?_ *mutation-modifier*_?_ **`set`** *setter-name*_?_ *code-block* \
> *setter-name* → **`(`** *identifier* **`)`**
>
> *getter-setter-keyword-block* → **`{`** *getter-keyword-clause* *setter-keyword-clause*_?_ **`}`** \
> *getter-setter-keyword-block* → **`{`** *setter-keyword-clause* *getter-keyword-clause* **`}`** \
> *getter-keyword-clause* → *attributes*_?_ *mutation-modifier*_?_ **`get`** \
> *setter-keyword-clause* → *attributes*_?_ *mutation-modifier*_?_ **`set`**
>
> *willSet-didSet-block* → **`{`** *willSet-clause* *didSet-clause*_?_ **`}`** \
> *willSet-didSet-block* → **`{`** *didSet-clause* *willSet-clause*_?_ **`}`** \
> *willSet-clause* → *attributes*_?_ **`willSet`** *setter-name*_?_ *code-block* \
> *didSet-clause* → *attributes*_?_ **`didSet`** *setter-name*_?_ *code-block*

<!--
  NOTE: Type annotations are required for computed properties -- the
  types of those properties aren't computed/inferred.
-->

## 类型别名声明

*类型别名声明*将现有类型的具名别名引入到你的程序中。类型别名声明使用 `typealias` 关键字声明，具有以下形式：

```swift
typealias <#name#> = <#existing type#>
```

在声明类型别名后，别名*名称*可以在程序中的任何地方替代*现有类型*使用。*现有类型*可以是具名类型或复合类型。类型别名不会创建新类型；它们只是允许一个名称引用现有类型。

类型别名声明可以使用泛型参数为现有的泛型类型命名。类型别名可以为现有类型的某些或所有泛型参数提供具体类型。例如：

```swift
typealias StringDictionary<Value> = Dictionary<String, Value>

// 接下来的两个字典是同一类型
var dictionary1: StringDictionary<Int> = [:]
var dictionary2: Dictionary<String, Int> = [:]
```

<!--
  - test: `typealias-with-generic`

  ```swifttest
  -> typealias StringDictionary<Value> = Dictionary<String, Value>

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

  -> func sum<T: Sequence>(_ sequence: T) -> Int where T.Element == Int {
         // ...
  >>     return 9000
     }
  ```
-->

没有这种类型别名，`sum` 函数必须将关联类型称为 `T.Iterator.Element`，而不是 `T.Element`。

另见 <doc:Declarations#协议关联类型声明>。

> 类型别名声明的语法:
>
> *typealias-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`typealias`** *typealias-name* *generic-parameter-clause*_?_ *typealias-assignment* \
> *typealias-name* → *identifier* \
> *typealias-assignment* → **`=`** *type*

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

因为参数类型无法被推断出来，所以函数的每个参数必须明确指定类型。如果在参数类型前写上 `inout`，则该参数可以在函数的作用域内被修改。关于 in-out 参数的详细讨论请参见下面的 <doc:Declarations#In-Out-参数>。

如果一个函数声明中的*语句*只包含一个表达式，则默认返回该表达式的值。只有在表达式的类型和函数的返回类型不是 `Void`，并且不是像 `Never` 那样没有任何枚举值的枚举时，才会考虑这种隐式返回语法。

<!--
  As of Swift 5.3,
  the only way to make an uninhabited type is to create an empty enum,
  so just say that directly instead of using & defining the compiler jargon.
-->

函数可以使用元组类型作为返回类型来返回多个值。

<!--
  TODO: ^-- Add some more here.
-->

在函数内部，可以定义另一个函数。这种定义在函数内部的函数，被称为*嵌套函数*。

如果一个嵌套函数捕获了一个保证不会逃逸的值——例如一个 in-out 参数——或者作为一个非逃逸函数参数传递，那么这个嵌套函数就是非逃逸的。否则，嵌套函数就是逃逸的。

有关嵌套函数的讨论，请参见 <doc:Functions#嵌套函数>。

### 参数名称

函数的参数是一个以逗号分隔的列表，每个参数都可以是不同的类型。函数调用时的参数顺序必须和函数声明时的参数顺序一致。最简单的参数列表有着如下的形式：

```swift
<#parameter name#>: <#parameter type#>
```

参数有名称和标签，名称用于在函数内访问参数，标签用于在调用函数时指定参数。默认情况下，参数的名称也可以作为标签。例如：

```swift
func f(x: Int, y: Int) -> Int { return x + y }
f(x: 1, y: 2) // x 和 y 都带有标签
```

<!--
  - test: `default-parameter-names`

  ```swifttest
  -> func f(x: Int, y: Int) -> Int { return x + y }
  >> let r0 =
  -> f(x: 1, y: 2) // x 和 y 都带有标签
  >> assert(r0 == 3)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

你可以使用以下形式（选其一），重写参数标签的默认行为：

```swift
<#argument label#> <#parameter name#>: <#parameter type#>
_ <#parameter name#>: <#parameter type#>
```

在参数名称前的名称会作为这个参数的显式实参标签，它可以和参数名称不同。在函数或方法调用时，相对应的参数必须使用这个实参标签。

参数名称前的下划线（`_`）可以去除参数的实参标签。在函数或方法调用时，相对应的参数必须去除标签。

```swift
func repeatGreeting(_ greeting: String, count n: Int) { /* 打招呼 n 次 */ }
repeatGreeting("Hello, world!", count: 2) //  count 带有标签，greeting 没有
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

#### In-Out 参数

默认情况下，Swift 中的函数参数是按值传递的：在函数内进行的任何更改对调用者都是不可见的。如果需要传入一个 in-out 参数，可以使用 `inout` 参数修饰符。

```swift
func someFunction(a: inout Int) {
    a += 1
}
```

当调用包含 in-out 参数的函数时，必须在 in-out 参数前加上 &（与符号），以表明函数调用可以更改该参数的值。

```swift
var x = 7
someFunction(&x)
print(x)  // 打印 "8"
```

In-out 参数的传递方式如下：

1. 当函数被调用时，参数的值会被复制。
2. 在函数体内，副本被修改。
3. 当函数返回时，副本的值被赋给原始参数。

这种行为被称为*拷入拷出（copy-in copy-out）* 或*值结果调用（call by value result）*。例如，当一个计算属性或一个带观察者的属性作为 in-out 参数传递时，它的 getter 在函数调用中被调用，而它的 setter 在函数返回时被调用。

作为一种优化手段，当参数值存储在内存中的物理地址时，在函数体内部和外部均会使用同一内存位置。这种优化行为被称为*引用调用（call by reference）*; 它满足了 copy-in copy-out 模型的所有要求，同时消除了复制的开销。请使用 copy-in copy-out 给出的模型编写代码，而不依赖于引用传递优化，以便在有或没有优化的情况下都能正确运行。

在函数内，不要访问作为 in-out 参数传递的值，即使原始值在当前作用域中可用。访问原始值是对该值的同时访问，这违反了内存独占性。

```swift
var someValue: Int
func someFunction(a: inout Int) {
    a += someValue
}

// 错误：这会导致运行时排他性违规
someFunction(&someValue)
```

出于同样的原因，你不能将相同的值传递给多个 in-out 参数。

```swift
var someValue: Int
func someFunction(a: inout Int, b: inout Int) {
    a += b
    b += 1
}

// 错误：不能将同一个值传递给多个 in-out 参数
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

捕获 in-out 参数的闭包或嵌套函数必须是非逃逸的。如果你需要捕获一个 in-out 参数而不对其进行修改，请使用捕获列表显式地以不可变方式捕获该参数。

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

如果你需要捕获并修改一个 in-out 参数，请使用一个显式的局部副本，例如在多线程代码中，确保所有修改在函数返回之前都已完成。

```swift
func multithreadedFunction(queue: DispatchQueue, x: inout Int) {
    // 创建一个本地副本，并在函数结束时手动将其复制回去。
    var localX = x
    defer { x = localX }

    // 异步操作 localX，然后在返回之前等待。
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

有关 in-out 参数的更多讨论和示例，请参见 <doc:Functions#In-Out-参数>.。

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

#### 借用和消费参数

默认情况下，Swift 使用一套规则在函数调用之间自动管理对象生命周期，在需要时复制值。默认规则旨在在大多数情况下最小化开销——如果你想要更具体的控制，可以应用 `borrowing` 或 `consuming` 参数修饰符。在这种情况下，使用 `copy` 显式标记复制操作。

无论你是否使用默认规则，Swift 确保在所有情况下对象的生命周期和所有权都得到正确管理。这些参数修饰符仅影响特定使用模式的相对效率，而不影响正确性。

<!--
TODO: Describe the default rules.
Essentially, inits and property setters are consuming,
and everything else is borrowing.
Where are copies implicitly inserted?
-->

`borrowing` 修饰函数参数时，函数不会保留参数的值。在这种情况下，调用者保留对象的所有权，并负责对象的生命周期管理。所以当函数只是临时使用对象时，用 `borrowing` 修饰可以最大限度地减少开销。

```swift
// `isLessThan` 不会保留任一参数
func isLessThan(lhs: borrowing A, rhs: borrowing A) -> Bool {
    ...
}
```

如果函数需要保留参数的值，例如，通过将其存储在全局变量中——你可以使用 `copy` 显式地复制该值。

```swift
// 同样是 `isLessThan` 函数，这个 `isLessThan` 可以将最小值记录下来
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
// `store` 会保留它的参数，因此将其标记为 `consuming`
func store(a: consuming A) {
    someGlobalVariable = a
}
```

使用 `consuming` 可以在调用者在函数调用后不再需要使用该对象时，最小化开销。

```swift
// 通常，这就是最后一次使用 value 了
store(a: value)
```

如果在函数调用后继续使用可复制对象，编译器会在函数调用之前自动复制该对象。

```swift
// 编译器会在这里插入一个隐式副本
store(a: someValue)  // 此函数消费 someValue
print(someValue)  // 这里使用的是 someValue 的副本
```

与 `inout` 不同，`borrowing` 和 `consuming` 参数在调用函数时不需要任何特殊标记：

```swift
func someFunction(a: borrowing A, b: consuming B) { ... }

someFunction(a: someA, b: someB)
```

显式使用 `borrowing` 或 `consuming` 表示你希望更严格地控制运行时所有权管理的开销。因为复制可能导致意外的运行时所有权操作，所以标记为这两种修饰符的参数在没有使用显式的 `copy` 关键字的情况下不能被复制：

```swift
func borrowingFunction1(a: borrowing A) {
    // 错误：无法隐式复制 a
    // 这个赋值操作需要复制，因为 `a` 只是从调用者那里借来的。
    someGlobalVariable = a
}

func borrowingFunction2(a: borrowing A) {
    // 可以：显式复制是可以的
    someGlobalVariable = copy a
}

func consumingFunction1(a: consuming A) {
    // 错误：无法隐式复制 a
    // 这个赋值操作需要复制，因为后面有 `print`
    someGlobalVariable = a
    print(a)
}

func consumingFunction2(a: consuming A) {
    // 可以：显式复制在这种情况下有效
    someGlobalVariable = copy a
    print(a)
}

func consumingFunction3(a: consuming A) {
    // 可以：不需要复制，因为这是最后一次使用
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

参数可以被忽略，数量可以不固定，还可以为其提供默认值，使用形式如下

```swift
_ : <#parameter type#>
<#parameter name#>: <#parameter type#>...
<#parameter name#>: <#parameter type#> = <#default argument value#>
```

下划线 (`_`) 参数被显式忽略，无法在函数体内访问。

带有基本类型名称后面紧跟三个点（`...`）的参数被理解为可变参数。紧跟在可变参数后面的参数必须有一个实参标签。一个函数可以有多个可变参数。可变参数被视为包含基本类型名称元素的数组。例如，可变参数 `Int...` 被视为 `[Int]`。有关使用可变参数的示例，请参见 <doc:Functions#可变参数>。

带有等号（`=`）且在类型后跟随一个表达式的参数，表示该参数有一个默认值。这个给定的表达式会在函数调用时进行求值。如果在调用函数时省略了该参数，则会使用默认值。

```swift
func f(x: Int = 42) -> Int { return x }
f()       // 有效，使用默认值
f(x: 7)   // 有效，使用提供的值
f(7)      // 无效，缺少实参标签
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

### 特殊类型的方法

枚举或结构体的方法，如果修改了 `self`，必须标记为 `mutating` 声明修饰符。

重写超类方法的方法必须标记为 `override` 声明修饰符。没有 `override` 修饰符而重写方法，或者在不重写超类方法的情况下使用 `override` 修饰符，都是编译时错误。

与类型相关的方法，而不是与类型实例相关的方法，必须使用 `static` 声明修饰符来标记（枚举和结构体使用 `static`，类可以使用 `static` 或 `class` 声明修饰符）。用 `class` 声明修饰符标记的类类型方法可以被子类的实现重写；用 `class final` 或 `static` 标记的类类型方法则不能被重写。

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

一些具有特殊名称的方法为函数调用语法提供了语法糖。如果一个类型定义了这些方法之一，该类型的实例就可以使用函数调用语法。此时的函数调用会被理解为对该实例上某个特殊命名方法的调用

类、结构体或枚举类型可以通过定义一个 `dynamicallyCall(withArguments:)` 方法或一个 `dynamicallyCall(withKeywordArguments:)` 方法来支持函数调用语法，参见 <doc:Attributes#dynamicCallable>，或者通过定义一个作为函数调用（call-as-function）的方法，如下所述。如果该类型同时定义了一个作为函数调用的方法和 `dynamicCallable` 特性使用的其中一个方法，则在可以使用任一方法的情况下，编译器优先选择作为函数调用的方法。

作为函数调用方法的名称为 `callAsFunction()`，或其他以 `callAsFunction(` 开头并带有有标签或无标签参数的名称——例如，`callAsFunction(_:_:)` 和 `callAsFunction(something:)` 也是有效的作为函数调用方法名称。

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
// 两个函数调用都打印 208。
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

作为函数调用的方法和来自 `dynamicCallable` 特性的方法在将多少信息编码到类型系统与在运行时可能的动态行为之间做出了不同的权衡。当你声明一个作为函数调用的方法时，你需要指定参数的数量，以及每个参数的类型和标签。`dynamicCallable` 特性的方法仅指定用于保存参数数组的类型。

定义一个作为函数调用的方法，或者来自 `dynamicCallable` 特性的方法，并不允许你在函数调用表达式以外的任何上下文中将该类型的实例用作函数。例如：

```swift
let someFunction1: (Int, Int) -> Void = callable(_:scale:)  // 错误
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

`subscript(dynamicMember:)` 下标为成员查找提供了语法糖，参见 <doc:Attributes#dynamicMemberLookup>。

### 抛出函数和方法

可以抛出错误的函数和方法必须标记 `throws` 关键字。这些函数和方法被称为*抛出函数*和*抛出方法*。它们具有以下形式：

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

函数的类型包括：它是否会抛出错误，以及它抛出的错误类型。非抛出函数是抛出函数的子类型。所以，可以在使用抛出函数的地方使用非抛出函数。有关抛出错误函数类型的更多信息，请参阅 <doc:Types#函数类型>。有关处理具有显式类型的错误的示例，请参阅 <doc:ErrorHandling#指定错误类型>。

你不能仅根据函数是否会抛出错误来重载一个函数。不过，你可以根据函数的*参数*是否会抛出错误来重载函数。

抛出方法不能重写非抛出方法，且抛出方法也不能满足协议中对非抛出方法的要求。不过，非抛出方法可以重写抛出方法，且非抛出方法也可以满足协议中对会抛出方法的要求。

### 再抛出函数和方法

函数或方法可以使用 `rethrows` 关键字声明，表示它只在其某个函数参数抛出错误时才会抛出错误。这样的函数和方法被称为*再抛出函数（rethrowing functions）*和*再抛出方法（rethrowing methods）*。再抛出函数和方法必须至少有一个会抛出错误的函数参数。

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

再抛出的函数或方法只能在 `catch` 子句中包含 `throw` 语句。这使得你可以在 `do`-`catch` 语句中调用抛出函数，并通过抛出不同的错误在 `catch` 子句中处理错误。此外，`catch` 子句必须仅处理由再抛出函数的抛出参数抛出的错误。例如，以下是无效的，因为 `catch` 子句将处理由 `alwaysThrows()` 抛出的错误。

```swift
func alwaysThrows() throws {
    throw SomeError.error
}
func someFunction(callback: () throws -> Void) rethrows {
    do {
        try callback()
        try alwaysThrows()  // 无效，alwaysThrows() 不是一个抛出参数
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

抛出方法不能重写再抛出方法，抛出方法也不能满足再抛出方法的协议要求。也就是说，再抛出方法可以重写抛出方法，再抛出方法可以满足抛出方法的协议要求。

在泛型代码中，抛出特定错误类型是再抛出的替代方案。例如：

```swift
func someFunction<E: Error>(callback: () throws(E) -> Void) throws(E) {
    try callback()
}
```

这种传播错误的方法保留了错误的类型信息。然而，与标记一个函数 `rethrows` 不同，这种方法并不阻止该函数抛出相同类型的错误。

<!--
TODO: Revisit the comparison between rethrows and throws(E) above,
since it seems likely that the latter will generally replace the former.

See also rdar://128972373
-->

### 异步函数和方法

以异步方式运行的函数和方法必须使用 `async` 关键字标记。这类函数和方法被称为*异步函数*和*异步方法*。它们的形式如下：

```swift
func <#function name#>(<#parameters#>) async -> <#return type#> {
    <#statements#>
}
```

对异步函数或方法的调用必须包装在一个 `await` 表达式中——也就是说，它们必须在 `await` 操作符的作用域内。

`async` 关键字是函数类型的一部分，且同步函数是异步函数的子类型。因此，你可以在需要异步函数的上下文中使用同步函数。例如，你可以用同步方法重写异步方法，且同步方法可以满足对异步方法的协议要求。

你可以根据函数是否为异步来重载一个函数。在调用时，由上下文决定使用哪个重载：在异步上下文中，会使用异步函数，而在同步上下文中，会使用同步函数。

异步方法不能重写同步方法，且异步方法不能满足对同步方法的协议要求。不过，同步方法可以重写异步方法，且同步方法可以满足对异步方法的协议要求。

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

Swift 定义了一个 [`Never`][] 类型，表示一个函数或方法不会返回给调用者。返回类型为 `Never` 的函数和方法被称为*非返回*。非返回的函数和方法要么导致不可恢复的错误，要么开始一个无限进行的工作序列。这意味着在调用后立即运行的代码永远不会被执行。即使抛出错误的函数和再抛出错误的函数是非返回类型，它们仍然可以将程序控制权转移到相应的 `catch` 块。

[`Never`]: https://developer.apple.com/documentation/swift/never

非返回的函数或方法可以在 guard 语句的 `else` 分支中调用，以结束该分支，见 <doc:Statements#Guard-语句>。

你可以重写一个非返回的方法，但新方法必须保持其返回类型和非返回的行为。

> 函数声明的语法:
>
> *function-declaration* → *function-head* *function-name* *generic-parameter-clause*_?_ *function-signature* *generic-where-clause*_?_ *function-body*_?_
>
> *function-head* → *attributes*_?_ *declaration-modifiers*_?_ **`func`** \
> *function-name* → *identifier* | *operator*
>
> *function-signature* → *parameter-clause* **`async`**_?_ *throws-clause*_?_ *function-result*_?_ \
> *function-signature* → *parameter-clause* **`async`**_?_ **`rethrows`** *function-result*_?_ \
> *function-result* → **`->`** *attributes*_?_ *type* \
> *function-body* → *code-block*
>
> *parameter-clause* → **`(`** **`)`** | **`(`** *parameter-list* **`)`** \
> *parameter-list* → *parameter* | *parameter* **`,`** *parameter-list* \
> *parameter* → *external-parameter-name*_?_ *local-parameter-name* *parameter-type-annotation* *default-argument-clause*_?_ \
> *parameter* → *external-parameter-name*_?_ *local-parameter-name* *parameter-type-annotation* \
> *parameter* → *external-parameter-name*_?_ *local-parameter-name* *parameter-type-annotation* **`...`**
>
> *external-parameter-name* → *identifier* \
> *local-parameter-name* → *identifier* \
> *parameter-type-annotation* → **`:`** *attributes*_?_ *parameter-modifier*_?_ *type* \
> *parameter-modifier* → **`inout`** | **`borrowing`** | **`consuming`**
> *default-argument-clause* → **`=`** *expression*

<!--
  NOTE: Code block is optional in the context of a protocol.
  Everywhere else, it's required.
  We could refactor to have a separation between function definition/declaration.
  There's also the low-level "asm name" FFI
  which is a definition and declaration corner case.
  Let's just deal with this difference in prose.
-->

## 枚举声明

*枚举声明*将一个具名的枚举类型引入到你的程序中。

枚举声明有两种基本形式，使用 `enum` 关键字进行声明。使用任一形式声明的枚举的主体包含零个或多个值——称为*枚举用例*——以及任意数量的声明，包括计算属性、实例方法、类型方法、构造器、类型别名，甚至其他枚举、结构体、类和协议类型。枚举声明不能包含析构器或协议声明。

枚举类型可以采用任意数量的协议，但不能从类、结构体或其他枚举继承。

与类和结构体不同，枚举类型没有隐式提供的默认构造器；所有构造器必须显式声明。构造器可以委托给枚举中的其他构造器，但初始化过程只有在构造器将枚举的一个用例赋值给 `self` 后才完成。

像结构体但不同于类，枚举是值类型；当枚举的实例被赋值给变量或常量，或作为参数传递给函数调用时，会被复制。有关值类型的信息，请参见 <doc:ClassesAndStructures#结构体和枚举是值类型>。

你可以通过扩展声明扩展枚举类型的行为，如 <doc:Declarations#扩展声明> 中所讨论的。

### 任意类型的枚举成员

如下的形式声明了一个包含任意类型枚举用例的枚举变量：

```swift
enum <#enumeration name#>: <#adopted protocols#> {
    case <#enumeration case 1#>
    case <#enumeration case 2#>(<#associated value types#>)
}
```

这种形式的枚举声明在其他语言中有时被叫做*可识别联合*。

在这种形式中，每个用例块由 `case` 关键字开始，后面跟着一个或多个枚举用例，用逗号分隔。每个用例的名称必须是唯一的。每个用例还可以指定它存储特定类型的值。这些类型在*关联值类型*元组中指定，紧接在用例名称之后。

存储关联值的枚举成员可以用作函数，这些函数创建具有指定关联值的枚举实例。就像函数一样，你可以获取对枚举成员的引用，并在代码中稍后应用它。

```swift
enum Number {
    case integer(Int)
    case real(Double)
}
let f = Number.integer
// f 是一个 (Int) -> Number 的函数类型

// 应用函数 `f` 来创建一个包含整数值的 `Number` 实例数组
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

有关更多信息以及查看枚举关联值的示例，请参见 <doc:Enumerations#关联值>。

#### 间接枚举

枚举类型可以具有递归结构，就是说，枚举用例的关联值类型可以是枚举类型自身。然而，枚举类型的实例具有值语义，这意味着它们在内存中有固定布局。为了支持递归，编译器必须插入一个间接层。

要让某个枚举用例支持递归，请使用 `indirect` 声明修饰符进行标记。间接枚举成员必须具有关联值。

<!--
  TODO The word "enable" is kind of a weasel word.
  Better to have a more concrete discussion of exactly when
  it is and isn't used.
  For example, does "indirect enum { X(Int) } mark X as indirect?
-->

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

要让一个枚举类型的所有用例都支持递归，请使用 `indirect` 修饰符标记整个枚举——当枚举包含许多需要标记为 `indirect` 修饰符的用例时，这样做非常方便。

使用 `indirect` 修饰符标记的枚举类型可以既包含有关联值的用例，同时还可包含没有关联值的用例。但是，它不能再单独使用 `indirect` 修饰符来标记某个用例。

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

  -> enum E1 { indirect case c() }     // This is fine, but probably shouldn't be
  -> enum E2 { indirect case c(Int) }  // This is fine, but probably shouldn't be

  -> indirect enum E3 { case x }
-->

### 带有原始值类型的枚举

以下形式声明了一个枚举类型，其中包含相同基本类型的枚举成员：

```swift
enum <#enumeration name#>: <#raw-value type#>, <#adopted protocols#> {
    case <#enumeration case 1#> = <#raw value 1#>
    case <#enumeration case 2#> = <#raw value 2#>
}
```

在这种形式中，每个用例块由 `case` 关键字开始，后面跟着一个或多个枚举用例，用逗号分隔。与第一种形式中的用例不同，每个用例都有一个基础值，称为*原始值*，其基本类型相同。这些值的类型在*原始值类型*中指定，必须表示整数、浮点数、字符串或单个字符。特别是，*原始值类型*必须遵循 `Equatable` 协议，并且遵循以下协议之一：`ExpressibleByIntegerLiteral` 用于整型字面量，`ExpressibleByFloatLiteral` 用于浮点型字面量，`ExpressibleByStringLiteral` 用于包含任意数量字符的字符串字面量，以及 `ExpressibleByUnicodeScalarLiteral` 或 `ExpressibleByExtendedGraphemeClusterLiteral` 用于仅包含单个字符的字符串字面量。每一个用例的名字和原始值必须唯一。

<!--
  The list of ExpressibleBy... protocols above also appears in LexicalStructure_Literals.
  This list is shorter because these five protocols are explicitly supported in the compiler.
-->

如果原始值类型被指定为 `Int`，并且你没有显式地为这些用例分配值，它们将隐式地被分配值 `0`、`1`、`2`，依此类推。每个未分配的 `Int` 类型的用例将隐式地被分配一个原始值，该值是从前一个用例的原始值自动递增的。

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

在上述示例中，`ExampleEnum.a` 的原始值为 `0`，而 `ExampleEnum.b` 的值为 `1`。由于 `ExampleEnum.c` 的值被显式设置为 `5`，因此 `ExampleEnum.d` 的值自动从 `5` 增加，结果为 `6`。

如果原始值类型被指定为 `String`，并且你没有显式地为各个用例分配值，则每个未分配的用例会隐式地分配一个与该成员名称相同文本的字符串。

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

在上述示例中，`GamePlayMode.cooperative` 的原始值是 `"cooperative"`，`GamePlayMode.individual` 的原始值是 `"individual"`，而 `GamePlayMode.competitive` 的原始值是 `"competitive"`。

具有原始值类型的枚举隐式遵循在 Swift 标准库中定义的 `RawRepresentable` 协议。因此，它们具有 `rawValue` 属性和一个可失败构造器，其签名为 `init?(rawValue: RawValue)`。你可以使用 `rawValue` 属性访问枚举用例的原始值，如 `ExampleEnum.b.rawValue`。你还可以使用原始值通过调用枚举的可失败构造器来查找相应的用例，如 `ExampleEnum(rawValue: 5)`，这将返回一个可选的用例。有关更多信息以及查看具有原始值类型的案例示例，请参见 <doc:Enumerations#原始值>。

### 访问枚举成员

要引用枚举类型的用例，请使用点（`.`）语法，如 `EnumerationType.enumerationCase` 所示。当枚举类型可以从上下文中推断时，可以省略它（仍然需要 `.`），参见 <doc:Enumerations#枚举语法> 和 <doc:Expressions#隐式成员表达式>。

要检查枚举用例的值，请使用 `switch` 语句，如 <doc:Enumerations#使用-Switch-语句匹配枚举值> 中所示。在 `switch` 语句的用例分支中，枚举类型会与枚举用例进行模式匹配，详见 <doc:Patterns#枚举用例模式>。

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

> 枚举声明的语法:
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

## 结构体声明

*结构体声明*将一个具名的结构体类型引入到你的程序中。结构体声明使用 `struct` 关键字声明，具有以下形式：

```swift
struct <#structure name#>: <#adopted protocols#> {
    <#declarations#>
}
```

结构体的主体包含零个或多个*声明*。这些*声明*可以包括存储属性和计算属性、类型属性、实例方法、类型方法、构造器、下标、类型别名，甚至其他结构体、类、actor 和枚举声明。结构体声明不能包含析构器或协议声明。有关包含各种类型声明的结构体的讨论和多个示例，请参见 <doc:ClassesAndStructures>。

结构体类型可以采用任意数量的协议，但不能从类、枚举或其他结构体继承。

有三种方法可以创建先前声明的结构体的实例：

- 调用结构体中声明的某个构造器，参见 <doc:Initialization#构造器>。
- 如果没有声明构造器，则调用结构体的成员遍历构造器，参见 <doc:Initialization#结构体类型的成员逐一构造器>。
- 如果没有声明构造器，且结构体声明的所有属性都给定了初始值，则调用结构体的默认构造器，参见 <doc:Initialization#默认构造器>。

初始化结构体中声明属性的过程在 <doc:Initialization> 中描述。

结构体实例的属性可以使用点 (`.`) 语法访问，参见 <doc:ClassesAndStructures#访问属性>。

结构体是值类型；当结构体的实例被赋值给变量或常量，或作为参数传递给函数调用时，会被复制。有关值类型的信息，请参见 <doc:ClassesAndStructures#结构体和枚举是值类型>。

你可以通过扩展声明来扩展结构体类型的行为，参见 <doc:Declarations#扩展声明>。

> 结构体声明的语法:
>
> *struct-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`struct`** *struct-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *struct-body* \
> *struct-name* → *identifier* \
> *struct-body* → **`{`** *struct-members*_?_ **`}`**
>
> *struct-members* → *struct-member* *struct-members*_?_ \
> *struct-member* → *declaration* | *compiler-control-statement*

## 类声明

*类声明*将一个具名的类类型引入到你的程序中。类声明使用 `class` 关键字声明，具有以下形式：

```swift
class <#class name#>: <#superclass#>, <#adopted protocols#> {
    <#declarations#>
}
```

类的主体包含零个或多个*声明*。这些*声明*可以包括存储属性和计算属性、实例方法、类型方法、构造器、一个析构器、下标、类型别名，甚至其他类、结构体、actor 和枚举声明。类声明不能包含协议声明。有关包含各种类型声明的类的讨论和多个示例，请参见 <doc:ClassesAndStructures>。

类类型只能继承自一个父类，即它的*超类*，但可以采用任意数量的协议。*超类*在*类名*和冒号之后首先出现，后面跟着任何*采用的协议*。泛型类可以继承其他泛型和非泛型类，但非泛型类只能继承其他非泛型类。当你在冒号后写泛型超类的名称时，必须包括该泛型类的全名，包括其泛型参数子句。

如在 <doc:Declarations#构造器声明> 中讨论的，类可以有指定构造器和便利构造器。类的指定构造器必须初始化所有声明的属性，并且必须在调用任何超类的指定构造器之前完成此操作。

类可以重写其超类的属性、方法、下标和构造器。重写的属性、方法、下标和指定构造器必须标记为 `override` 声明修饰符。

<!--
  - test: `designatedInitializersRequireOverride`

  ```swifttest
  -> class C { init() {} }
  -> class D: C { override init() { super.init() } }
  ```
-->

要要求子类实现超类的构造器，请使用 `required` 声明修饰符标记超类的构造器。子类对该构造器的实现也必须使用 `required` 声明修饰符进行标记。

尽管在*超类*中声明的属性和方法被当前类继承，但在*超类*中声明的指定构造器仅在子类满足 <doc:Initialization#构造器的自动继承> 中描述的条件时才会被继承。Swift 类不从通用基类继承。

有两种方法可以创建一个先前声明的类的实例：

- 调用类中声明的某个构造器，参见 <doc:Initialization#构造器>。
- 如果没有声明构造器，且类声明的所有属性都给定了初始值，则调用类的默认构造器，参见 <doc:Initialization#默认构造器>。

使用点（`.`）语法访问类实例的属性，参见 <doc:ClassesAndStructures#访问属性>。

类是引用类型；当类的实例被赋值给变量或常量，或作为参数传递给函数调用时，是引用而不是复制。有关引用类型的信息，请参见 <doc:ClassesAndStructures#类是引用类型>。

你可以通过扩展声明扩展类类型的行为，参见 <doc:Declarations#扩展声明>。

> 类声明的语法:
>
> *class-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`final`**_?_ **`class`** *class-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *class-body* \
> *class-declaration* → *attributes*_?_ **`final`** *access-level-modifier*_?_ **`class`** *class-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *class-body* \
> *class-name* → *identifier* \
> *class-body* → **`{`** *class-members*_?_ **`}`**
>
> *class-members* → *class-member* *class-members*_?_ \
> *class-member* → *declaration* | *compiler-control-statement*

## Actor 声明

*actor 声明*将一个具名的 actor 类型引入到你的程序中。actor 声明使用 `actor` 关键字声明，具有以下形式：

```swift
actor <#actor name#>: <#adopted protocols#> {
    <#declarations#>
}
```

actor 的主体包含零个或多个*声明*。这些*声明*可以包括存储属性和计算属性、实例方法、类型方法、构造器、一个析构器、下标、类型别名，甚至其他类、结构体和枚举声明。有关包含各种声明的 actor 的讨论和多个示例，请参见 <doc:Concurrency#Actors>。

actor 类型可以采用任意数量的协议，但不能从类、枚举、结构体或其他 actor 继承。然而，标记为 `@objc` 特性的 actor 隐式地遵循 `NSObjectProtocol` 协议，并作为 `NSObject` 的子类型暴露给 Objective-C 运行时。

有两种方法可以创建一个先前声明的 actor 的实例：

- 调用 actor 中声明的某个构造方法，参见 <doc:Initialization#构造器>。
- 如果没有声明初始值，并且 actor 声明的所有属性都给定了初始值，则调用 actor 的默认构造器，参见 <doc:Initialization#默认构造器>。

默认情况下，actor 的成员是与该 actor 隔离的。方法体或属性的 getter 等代码是在该 actor 上执行的。actor 内部的代码可以同步地与这些成员交互，因为代码已经在同一个 actor 上运行；但 actor 外部的代码必须使用 `await` 标记，以表明该代码是异步地在另一个 actor 上运行的。键路径不能引用 actor 的隔离成员。actor 隔离的存储属性可以作为 in-out 参数传递给同步函数，但不能传递给异步函数。

actor 还可以拥有非隔离成员，其声明使用 `nonisolated` 关键字标记。非隔离成员的执行方式类似于 actor 外部的代码：它无法与 actor 的任何隔离状态交互，调用者在使用时也不需要使用 `await` 进行标记。

actor 的成员只有在它们是非隔离或异步的情况下才能标记为 `@objc` 属性。

初始化 actor 中声明的属性的过程，参见 <doc:Initialization>。

actor 实例的属性可以使用点 (`.`) 语法访问，参见 <doc:ClassesAndStructures#访问属性>。

actor 是引用类型；当分配给变量或常量，或作为参数传递给函数调用时，actor 的实例是被引用而不是复制。有关引用类型的信息，请参见 <doc:ClassesAndStructures#类是引用类型>。

你可以通过扩展声明扩展 actor 类型的行为，参见 <doc:Declarations#扩展声明>。

<!--
  TODO Additional bits from the SE-0306 actors proposal:

  Partial applications of isolated functions are only permitted
  when the expression is a direct argument
  whose corresponding parameter is non-escaping and non-Sendable.
-->

> actor 声明的语法:
>
> *actor-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`actor`** *actor-name* *generic-parameter-clause*_?_ *type-inheritance-clause*_?_ *generic-where-clause*_?_ *actor-body* \
> *actor-name* → *identifier* \
> *actor-body* → **`{`** *actor-members*_?_ **`}`**
>
> *actor-members* → *actor-member* *actor-members*_?_ \
> *actor-member* → *declaration* | *compiler-control-statement*

## 协议声明

*协议声明*将一个具名的协议类型引入到你的程序中。协议声明使用 `protocol` 关键字声明，具有以下形式：

```swift
protocol <#protocol name#>: <#inherited protocols#> {
    <#protocol member declarations#>
}
```

协议声明可以出现在全局作用域内，或嵌套在非泛型类型或非泛型函数内部。

协议的主体包含零个或多个*协议成员声明*，这些声明描述了任何采用该协议的类型必须满足的遵循性要求。特别是，协议可以声明遵循的类型必须实现某些属性、方法、构造器和下标。协议还可以声明特殊类型的类型别名，称为*关联类型*，可以指定协议中各种声明之间的关系。协议声明不能包含类、结构体、枚举或其他协议声明。*协议成员声明*将在下面详细讨论。

协议类型可以从任意数量的其他协议继承。当一个协议类型从其他协议继承时，这些其他协议的要求集合会被聚合，任何从当前协议继承的类型必须遵循所有这些要求。有关如何使用协议继承的示例，请参见 <doc:Protocols#协议的继承>。

> 注意:
> 你还可以使用协议组合类型聚合多个协议的合规性要求，参见 <doc:Types#协议组合类型> 和 <doc:Protocols#协议组合>。

你可以通过在该类型的扩展声明中采用协议，为先前声明的类型添加协议遵循性。在扩展中，你必须实现所采用协议的所有要求。如果该类型已经实现了所有要求，你可以将扩展声明的主体留空。

默认情况下，遵循协议的类型必须实现协议中声明的所有属性、方法和下标。也就是说，你可以使用 `optional` 声明修饰符来标记这些协议成员声明，以指定遵循类型的实现是可选的。`optional` 修饰符只能应用于标记为 `objc` 特性的成员，并且只能应用于标记为 `objc` 特性的协议成员。因此，只有类类型可以采用并遵循包含可选成员要求的协议。有关如何使用 `optional` 声明修饰符的信息，以及如何访问可选协议成员的指导——例如，当你不确定遵循类型是否实现它们时——请参见 <doc:Protocols#可选协议要求>。

<!--
  TODO: Currently, you can't check for an optional initializer,
  so we're leaving those out of the documentation, even though you can mark
  an initializer with the @optional attribute. It's still being decided by the
  compiler team. Update this section if they decide to make everything work
  properly for optional initializer requirements.
-->

枚举的用例可以满足类型成员的协议要求。具体来说，没有任何关联值的枚举用例满足类型 `Self` 的只读类型变量的协议要求，而具有关联值的枚举成员满足返回 `Self` 的函数的协议要求，该函数的参数及其实参标签与枚举成员的关联值匹配。例如：

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

要将协议的采用限制为类类型，只需在冒号后将 `AnyObject` 协议包含在*继承协议*列表中。例如，以下协议只能被类类型采用：

```swift
protocol SomeProtocol: AnyObject {
    /* 协议成员写在这里 */
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

任何从标记为 `AnyObject` 要求的协议继承的协议，也只能被类类型采用。

> 注意:
> 如果一个协议标记了 `objc` 特性，则 `AnyObject` 要求隐式应用于该协议；无需显式的将该协议标记为 `AnyObject` 要求。

协议是具名类型，因此它们可以出现在代码中与其他具名类型相同的位置，如 <doc:Protocols#协议作为类型> 中所讨论的。然而，你无法构造协议的实例，因为协议实际上并不提供它们所指定的要求的实现。

你可以使用协议来声明类或结构体的代理应该实现哪些方法，参见 <doc:Protocols#代理>。

> 协议声明的语法:
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

### 协议属性声明

协议通过在协议声明体中包含一个*协议属性声明*，规定遵循该协议的类型必须实现一个属性。协议属性声明是一种特殊形式的变量声明，格式如下：

```swift
var <#property name#>: <#type#> { get set }
```

与其他协议成员声明一样，这些属性声明仅声明遵循该协议的类型的 getter 和 setter 要求。因此，你不会在声明它的协议中直接实现 getter 或 setter。

遵循协议的类型可以通过多种方式满足 getter 和 setter 的要求。如果属性声明同时包含 `get` 和 `set` 关键字，遵循类型可以用存储变量属性或可读写的计算属性（即实现了 getter 和 setter 的属性）来实现。然而，这样的属性声明不能被实现为常量属性或只读计算属性。如果属性声明只包含 `get` 关键字，则可以实现为任何类型的属性。关于符合协议类型如何实现属性要求的示例，参见 <doc:Protocols#属性要求>。

在协议声明中声明类型属性要求时，使用 `static` 关键字标记属性声明。遵循该协议的结构体和枚举使用 `static` 关键字声明属性，而遵循该协议的类则可以使用 `static` 或 `class` 关键字声明属性。为结构体、枚举或类添加协议遵循的扩展使用与其扩展的类型相同的关键字。为类型属性要求提供默认实现的扩展使用 `static` 关键字。

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

另见 <doc:Declarations#变量声明>。

> 协议属性声明的语法:
>
> *protocol-property-declaration* → *variable-declaration-head* *variable-name* *type-annotation* *getter-setter-keyword-block*

### 协议方法声明

协议通过在协议声明体中包含一个协议方法声明，规定遵循该协议的类型必须实现一个方法。协议方法声明的形式与函数声明相同，但有两个例外：它们不包含函数体，且不能在函数声明中提供任何默认参数值。关于遵循协议类型如何实现方法要求的示例，参见 <doc:Protocols#方法要求>。

在协议声明中声明类或静态方法的要求时，使用 `static` 修饰符标记方法声明。遵循该协议的结构体和枚举使用 `static` 关键字声明该方法，而遵循该协议的类则使用 `static` 或 `class` 关键字声明该方法。为结构体、枚举或类添加协议遵循的扩展使用与其扩展的类型相同的关键字。为类型方法要求提供默认实现的扩展使用 `static` 关键字。

另见 <doc:Declarations#函数声明>。

<!--
  TODO: Talk about using ``Self`` in parameters and return types.
-->

> 协议方法声明的语法:
>
> *protocol-method-declaration* → *function-head* *function-name* *generic-parameter-clause*_?_ *function-signature* *generic-where-clause*_?_

### 协议构造器声明

协议通过在协议声明的主体中包含协议构造器声明，要求遵循的类型必须实现一个构造器。协议构造器声明的形式与构造器声明相同，只是不包括构造器的主体。

遵循类型可以通过实现一个非可失败构造器或一个 `init!` 可失败构造器来满足非可失败协议构造器的要求。一个遵循类型可以通过实现任何类型的构造器来满足可失败协议构造器的要求。

当一个类实现一个构造器以满足协议的构造器要求时，如果该类尚未标记为 `final` 声明修饰符，则构造器必须标记为 `required` 声明修饰符。

另见 <doc:Declarations#构造器声明>。

> 协议构造器声明的语法:
>
> *protocol-initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* *throws-clause*_?_ *generic-where-clause*_?_ \
> *protocol-initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* **`rethrows`** *generic-where-clause*_?_

### 协议下标声明

协议声明遵循的类型必须通过在协议声明的主体中包含协议下标声明来实现下标。协议下标声明具有下标声明的特殊形式：

```swift
subscript (<#parameters#>) -> <#return type#> { get set }
```

下标声明仅声明遵循协议的类型所需的最小 getter 和 setter 实现要求。如果下标声明同时包含 `get` 和 `set` 关键字，则遵循的类型必须实现 getter 和 setter 子句。如果下标声明仅包含 `get` 关键字，则遵循的类型必须实现*至少*一个 getter 子句，并且可以选择性地实现一个 setter 子句。

在协议声明中声明静态下标要求时，使用 `static` 声明修饰符标记下标声明。遵循该协议的结构体和枚举使用 `static` 关键字声明下标，而遵循该协议的类则使用 `static` 或 `class` 关键字声明下标。为结构体、枚举或类添加协议遵循性的扩展使用与其扩展的类型相同的关键字。为静态下标要求提供默认实现的扩展使用 `static` 关键字。

另见 <doc:Declarations#下标声明>。

> 协议下标声明的语法:
>
> *protocol-subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *getter-setter-keyword-block*

### 协议关联类型声明

协议使用 `associatedtype` 关键字声明关联类型。关联类型为作为协议声明一部分使用的类型提供了别名。关联类型类似于泛型参数子句中的类型参数，但它们与声明它们的协议中的 `Self` 相关联。在该上下文中，`Self` 指的是遵循该协议的最终类型。有关更多信息和示例，请参见 <doc:Generics#关联类型>。

你在协议声明中使用通用的 `where` 子句，以便为从另一个协议继承的关联类型添加约束，而无需重新声明关联类型。以下 `SubProtocol` 的声明是等效的：

```swift
protocol SomeProtocol {
    associatedtype SomeType
}

protocol SubProtocolA: SomeProtocol {
    // 此语法会产生警告。
    associatedtype SomeType: Equatable
}

// 推荐使用此语法。
protocol SubProtocolB: SomeProtocol where SomeType: Equatable { }
```

<!--
  - test: `protocol-associatedtype`

  ```swifttest
  -> protocol SomeProtocol {
         associatedtype SomeType
     }

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

另见 <doc:Declarations#类型别名声明>。

> 协议关联类型声明的语法:
>
> *protocol-associated-type-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`associatedtype`** *typealias-name* *type-inheritance-clause*_?_ *typealias-assignment*_?_ *generic-where-clause*_?_

## 构造器声明

*构造器声明*在你的程序中引入了一个类、结构体或枚举的构造器。构造器声明使用 `init` 关键字声明，有两种基本形式。

结构体、枚举和类类型可以有任意数量的构造器，但是类的构造器具有不同的规则和行为。与结构体和枚举不同，类有两种类型的构造器：指定构造器和便利构造器，参见 <doc:Initialization>。

以下形式声明了结构体和枚举的构造器，以及类的指定构造器：：

```swift
init(<#parameters#>) {
    <#statements#>
}
```

类的指定构造器直接初始化类的所有属性。它不能调用当前类的其他构造器，如果该类有一个超类，则必须调用超类的一个指定构造器。如果该类从其超类继承了任何属性，则在当前类中设置或修改这些属性之前，必须调用超类的一个指定构造器。

指定构造器只能在类声明中声明，因此不能通过扩展声明添加到类中。

结构体和枚举中的构造器可以调用其他已声明的构造器，以委托部分或全部初始化过程。

要为一个类声明便利构造器，请使用 `convenience` 声明修饰符标记构造器声明。

```swift
convenience init(<#parameters#>) {
    <#statements#>
}
```

便利构造器可以将构造过程委托给另一个便利构造器或一个指定构造器。但是，类的构造过程必须以一个将类中所有属性完全初始化的指定构造器的调用作为结束。便利构造器不能调用超类的构造器

你可以使用 `required` 声明修饰符标记指定和便利构造器，以要求每个子类实现该构造器。子类对该构造器的实现也必须标记为 `required` 声明修饰符。

默认情况下，超类中声明的构造器不会被子类继承。也就是说，如果子类用默认值初始化了所有存储属性，并且没有定义自己的构造器，它将继承超类的所有构造器。如果子类重写了超类的所有指定构造器，它将继承超类的便利构造器。

与方法、属性和下标一样，你需要使用 `override` 声明修饰符标记重写的指定构造器。

> 注意:
> 如果你使用 `required` 声明修饰符标记了一个构造器，则在子类中重写所需的构造器时，不要同时使用 `override` 修饰符标记该构造器。

就像函数和方法一样，构造器可以抛出或再抛出错误。与函数和方法一样，你在构造器的参数后使用 `throws` 或 `rethrows` 关键字来指示适当的行为。同样，构造器可以是异步的，你使用 `async` 关键字来指示这一点。

要查看各种类型声明中构造器的示例，请参见 <doc:Initialization>。

### 可失败的构造器

*可失败的构造器*是一种生成一个可选实例或一个隐式解包的可选实例的构造器，具体取决于构造器声明的类型。因此，可失败的构造器可以返回 `nil` 以表示初始化失败。

要声明一个可失败的构造器并生成一个可选实例，需要在构造器声明中的 `init` 关键字后面加上问号（`init?`）。要声明一个可失败构造器并生成一个隐式解包的可选实例，则需要加上感叹号（`init!`）。下面的示例展示了一个 `init?` 可失败的构造器，它生成了一个结构体的可选实例。

```swift
struct SomeStruct {
    let property: String
    // 生成一个 `SomeStruct` 可选实例
    init?(input: String) {
        if input.isEmpty {
            // 丢弃 'self' 并返回 'nil'
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

调用 `init?` 可失败的构造器与调用不可失败的构造器的方式相同，只是你必须处理结果的可选性。

```swift
if let actualInstance = SomeStruct(input: "Hello") {
    // 使用 'SomeStruct' 的实例执行操作
} else {
    // 'SomeStruct' 的初始化失败，初始化器返回了 'nil'
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

可失败的构造器可以在构造器主体的实现中的任何时刻返回 `nil`。

可失败的构造器可以委托给任何类型的构造器。不可失败的构造器可以委托给另一个不可失败的构造器或一个 `init!` 可失败的构造器。不可失败的构造器可以通过强制解包超类构造器的结果来委托给一个 `init?` 可失败的构造器——例如，通过写 `super.init()!`。

初始化失败会通过构造器委托传播。具体来说，如果一个可失败的构造器委托给一个失败并返回 `nil` 的构造器，那么委托的构造器也会失败并隐式返回 `nil`。如果一个不可失败的构造器委托给一个失败并返回 `nil` 的 `init!` 可失败构造器，那么会引发运行时错误（就像你使用`!`运算符来解包一个值为 `nil`的可选值一样）。

可失败的指定构造器可以在子类中被任何类型的指定构造器重写。不可失败的指定构造器只能在子类中被不可失败的指定构造器重写。

有关更多信息以及可失败构造器的示例，请参见 <doc:Initialization#可失败构造器>。

> 初始化声明的语法:
>
> *initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* **`async`**_?_ *throws-clause*_?_ *generic-where-clause*_?_ *initializer-body* \
> *initializer-declaration* → *initializer-head* *generic-parameter-clause*_?_ *parameter-clause* **`async`**_?_ **`rethrows`** *generic-where-clause*_?_ *initializer-body* \
> *initializer-head* → *attributes*_?_ *declaration-modifiers*_?_ **`init`** \
> *initializer-head* → *attributes*_?_ *declaration-modifiers*_?_ **`init`** **`?`** \
> *initializer-head* → *attributes*_?_ *declaration-modifiers*_?_ **`init`** **`!`** \
> *initializer-body* → *code-block*

## 析构器声明

*析构器声明*为类类型声明一个析构器。析构器不接受参数，具有以下形式：

```swift
deinit {
    <#statements#>
}
```

析构器在一个类对象不再有任何引用时，会在该对象被释放之前自动调用。析构器只能在类声明的主体内声明，不能在类的扩展中声明，并且每个类最多只能有一个析构器

子类继承其超类的析构器，该析构器在子类对象被释放之前隐式调用。子类对象在其继承链中的所有析构器执行完毕之前不会被释放。

析构器不会被直接调用。

在类声明中如何使用析构器的示例，请参见 <doc:Deinitialization>。

> 析构器声明的语法:
>
> *deinitializer-declaration* → *attributes*_?_ **`deinit`** *code-block*

## 扩展声明

*扩展声明*允许你扩展现有类型的行为。扩展声明使用 `extension` 关键字声明，具有以下形式：

```swift
extension <#type name#> where <#requirements#> {
    <#declarations#>
}
```

扩展声明的主体包含零个或多个*声明*。这些*声明*可以包括计算属性、计算类型属性、实例方法、类型方法、构造器、下标声明，甚至类、结构体和枚举声明。扩展声明不能包含析构器或协议声明、存储属性、属性观察者或其他扩展声明。协议扩展中的声明不能标记为 `final`。有关包含各种类型声明的扩展的讨论和多个示例，请参见 <doc:Extensions>。

如果*类型名称*是类、结构体或枚举类型，则扩展该类型。如果*类型名称*是协议类型，则扩展所有遵循该协议的类型。

扩展声明可以扩展具有关联类型的泛型类型或协议，并可以包含*要求*。如果扩展类型的实例或遵循扩展协议的类型的实例满足*要求*，则该实例获得声明中指定的行为。

扩展声明可以包含构造器声明。也就是说，如果你正在扩展的类型在另一个模块中定义，则构造器声明必须委托给该模块中已定义的构造器，以确保该类型的成员得到正确初始化。

现有类型的属性、方法和构造器不能在该类型的扩展中被重写。

扩展声明可以通过指定*采用的协议*，为现有的类、结构体或枚举类型添加协议遵循：

```swift
extension <#type name#>: <#adopted protocols#> where <#requirements#> {
    <#declarations#>
}
```

扩展声明不能为现有类添加类继承，因此你只能在*类型名称*和冒号后指定协议列表。

### 条件遵循

你可以扩展一个泛型类型以有条件地遵循一个协议，从而使该类型的实例仅在满足某些要求时遵循该协议。你通过在扩展声明中包含*要求*来添加对协议的条件遵循。

#### 重写的要求在某些泛型上下文中不会被使用

在某些泛型上下文中，通过条件遵循协议而获得行为的类型，并不总是使用该协议要求的特定实现。为了说明这种行为，以下示例定义了两个协议和一个有条件地遵循这两个协议的泛型类型。

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
-->

`Pair` 结构体在其泛型类型分别遵循 `Loggable` 或 `TitledLoggable` 时，也会相应地遵循 `Loggable` 和 `TitledLoggable`。在下面的示例中，`oneAndTwo` 是 `Pair<String>` 的一个实例，由于 `String` 遵循 `TitledLoggable`，因此 `oneAndTwo` 也遵循 `TitledLoggable`。当直接调用 `oneAndTwo` 的 `log()` 方法时，将使用包含标题字符串的特定版本。

```swift
let oneAndTwo = Pair(first: "one", second: "two")
oneAndTwo.log()
// 打印 "Pair of 'String': (one, two)"
```

<!--
  - test: `conditional-conformance`

  ```swifttest
  -> let oneAndTwo = Pair(first: "one", second: "two")
  -> oneAndTwo.log()
  <- Pair of 'String': (one, two)
  ```
-->

然而，当在泛型上下文中使用 `oneAndTwo` 或将其作为 `Loggable` 协议的一个实例时，特定的实现版本不会被使用。Swift 在选择调用哪个 `log()` 实现时，只参考 `Pair` 遵循 `Loggable` 所需的最低要求。因此，使用的是 `Loggable` 协议提供的默认实现。

```swift
func doSomething<T: Loggable>(with x: T) {
    x.log()
}
doSomething(with: oneAndTwo)
// 打印 "(one, two)"
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

当在传递给 `doSomething(_:)` 的实例上调用 `log()` 时，自定义标题会从日志字符串中省略。

### 协议的遵循不应冗余

具体类型只能遵从某个协议一次。Swift 会将多余的协议遵从标记为错误。你可能会在两种情况下遇到这种错误。第一种情况是，当你以不同的要求多次显式地遵从同一个协议。第二种情况是，当你多次隐式地继承同一个协议。以下部分将讨论这些情况。

#### 解决显式冗余

对一个具体类型的多个扩展不能添加对同一协议的遵循，即使这些扩展的要求是互斥的。以下示例展示了这一限制。两个扩展声明试图为 `Serializable` 协议添加条件遵循，一个是针对包含 `Int` 元素的数组，另一个是针对包含 `String` 元素的数组。

```swift
protocol Serializable {
    func serialize() -> Any
}

extension Array: Serializable where Element == Int {
    func serialize() -> Any {
        // 实现
    }
}
extension Array: Serializable where Element == String {
    func serialize() -> Any {
        // 实现
    }
}
// 错误：'Array<Element>' 对协议 'Serializable' 的遵循是多余的
```

<!--
  - test: `multiple-conformances`

  ```swifttest
  -> protocol Serializable {
        func serialize() -> Any
     }

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

如果你需要根据多个具体类型添加条件遵循，请创建一个每个类型都可以遵循的新协议，并在声明条件遵循时使用该协议作为要求。

```swift
protocol SerializableInArray { }
extension Int: SerializableInArray { }
extension String: SerializableInArray { }

extension Array: Serializable where Element: SerializableInArray {
    func serialize() -> Any {
        // 实现
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

  -> extension Array: Serializable where Element: SerializableInArray {
         func serialize() -> Any {
             // implementation
  >>         return 0
  ->     }
     }
  ```
-->

#### 解决隐式冗余

当一个具体类型有条件地遵循一个协议时，该类型隐式地遵循任何具有相同要求的父协议。

如果你需要一个类型有条件地遵循两个继承自单一父协议的协议，请显式声明对父协议的遵循。这可以避免以不同的要求隐式地两次遵循父协议。

以下示例显式声明了 `Array` 对 `Loggable` 的条件遵循，以避免在声明其对 `TitledLoggable` 和新的 `MarkedLoggable` 协议的条件遵循时发生冲突。

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
-->

在没有扩展显式声明对 `Loggable` 的条件遵循时，其他 `Array` 扩展会隐式创建这些声明，从而导致错误：

```swift
extension Array: Loggable where Element: TitledLoggable { }
extension Array: Loggable where Element: MarkedLoggable { }
// 错误：'Array<Element>' 对协议 'Loggable' 的遵循是多余的
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

> 扩展声明的语法:
>
> *extension-declaration* → *attributes*_?_ *access-level-modifier*_?_ **`extension`** *type-identifier* *type-inheritance-clause*_?_ *generic-where-clause*_?_ *extension-body* \
> *extension-body* → **`{`** *extension-members*_?_ **`}`**
>
> *extension-members* → *extension-member* *extension-members*_?_ \
> *extension-member* → *declaration* | *compiler-control-statement*

## 下标声明

*下标*声明允许你为特定类型的对象添加下标支持，通常用于提供一种方便的语法来访问集合、列表或序列中的元素。下标声明使用 `subscript` 关键字声明，具有以下形式：

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

下标声明只能出现在类、结构体、枚举、扩展或协议声明的上下文中。

*参数*指定了在下标表达式中用于访问对应类型元素的一个或多个索引（例如，在表达式 `object[i]` 中的 `i`）。尽管用于访问元素的索引可以是任意类型，但每个参数都必须包含一个类型注释，以指定每个索引的类型。*返回类型*指定了被访问元素的类型。

与计算属性一样，下标声明支持读取和写入所访问元素的值。getter 用于读取值，setter 用于写入值。setter 子句是可选的，当只需要 getter 时，可以省略两个子句，直接返回请求的值。也就是说，如果提供了 setter 子句，则必须同时提供 getter 子句。

*setter 名称*和括号是可选的。如果你提供了 setter 名称，它将用作 setter 的参数名称。如果你不提供 setter 名称，setter 的默认参数名称是 `value`。setter 的参数类型与*返回类型*相同。

你可以在声明其类型的地方重载下标声明，只要*参数*或*返回类型*与要重载的下标不同。你也可以重写从超类继承的下标声明。在这样做时，必须使用 `override` 声明修饰符标记被重写的下标声明。

下标参数遵循与函数参数相同的规则，但有两个例外。默认情况下，使用下标的参数没有参数标签，这与函数、方法和构造器不同。然而，你可以使用与函数、方法和构造器相同的语法提供显式参数标签。此外，下标不能有 in-out 参数。下标参数可以具有默认值，参见 <doc:Declarations#特殊类型的参数>。

你还可以在协议声明的上下文中声明下标，参见 <doc:Declarations#协议下标声明>。

有关下标的更多信息以及下标声明的示例，请参见 <doc:Subscripts>。

### 类型下标声明

要声明由类型本身而非类型实例公开的下标，可以在下标声明中使用 `static` 声明修饰符。类可以使用 `class` 声明修饰符来标记类型计算属性，以允许子类重写超类的实现。在类声明中，`static` 关键字的效果与将声明标记为 `class` 和 `final` 声明修饰符相同。

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

> 下标声明的语法:
>
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *code-block* \
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *getter-setter-block* \
> *subscript-declaration* → *subscript-head* *subscript-result* *generic-where-clause*_?_ *getter-setter-keyword-block* \
> *subscript-head* → *attributes*_?_ *declaration-modifiers*_?_ **`subscript`** *generic-parameter-clause*_?_ *parameter-clause* \
> *subscript-result* → **`->`** *attributes*_?_ *type*

## 宏声明

*宏声明*引入一个新的宏。它以 `macro` 关键字开始，具有以下形式：

```swift
macro <#name#> = <#macro implementation#>
```

*宏实现*是另一个宏，用于指示执行此宏扩展的代码位置。执行宏扩展的代码是一个独立的 Swift 程序，该程序使用 [SwiftSyntax][] 模块与 Swift 代码进行交互。调用 Swift 标准库中的 `externalMacro(module:type:)` 宏，并传入包含宏实现的类型名称以及包含该类型的模块名称。

[SwiftSyntax]: https://github.com/swiftlang/swift-syntax

宏可以被重载，遵循与函数相同的模型。宏声明仅在文件作用域内出现。

有关 Swift 中宏的概述，请参见 <doc:Macros>。

> 宏声明的语法:
>
> *macro-declaration* → *macro-head* *identifier* *generic-parameter-clause*_?_ *macro-signature* *macro-definition*_?_ *generic-where-clause* \
> *macro-head* → *attributes*_?_ *declaration-modifiers*_?_ **`macro`** \
> *macro-signature* → *parameter-clause* *macro-function-signature-result*_?_ \
> *macro-function-signature-result* → **`->`** *type* \
> *macro-definition* → **`=`** *expression*

## 运算符声明

*运算符声明*将新的中缀、前缀或后缀运算符引入到你的程序中，并使用 `operator` 关键字进行声明。

你可以声明三种不同优先级的运算符：中缀、前缀和后缀。运算符的*优先级*指定了运算符相对于其操作数的相对位置。

运算符声明有三种基本形式，每种形式对应一种结合性。运算符的结合性通过在 `operator` 关键字之前标注 `infix`、`prefix` 或 `postfix` 声明修饰符来指定。在每种形式中，运算符的名称只能包含 <doc:LexicalStructure#运算符> 中定义的运算符字符。

以下形式声明了一个新的中缀运算符：

```swift
infix operator <#operator name#>: <#precedence group#>
```

*中缀运算符*是一个二元运算符，它写在两个操作数之间，例如在表达式 `1 + 2` 中熟悉的加法运算符`+`。

中缀运算符可以选择性地指定优先级组。如果你省略运算符的优先级组，Swift 将使用默认优先级组 `DefaultPrecedence`，该组的优先级仅高于 `TernaryPrecedence`。有关更多信息，请参见 <doc:Declarations#优先级组声明>。

以下形式声明了一个新的前缀运算符：

```swift
prefix operator <#operator name#>
```

*前缀运算符*是一种一元运算符，它直接写在操作数之前，例如表达式 `!a` 中的前缀逻辑非运算符（`!`）。

前缀运算符声明不指定优先级。前缀运算符是非结合的。

以下形式声明了一个新的后缀运算符：

```swift
postfix operator <#operator name#>
```

*后缀运算符*是一种一元运算符，它紧跟在操作数后面，例如在表达式 `a!` 中的后缀强制解包运算符 `!`。

与前缀运算符一样，后缀运算符声明不指定优先级。后缀运算符是非结合的。

在声明一个新运算符后，你通过声明一个与运算符同名的静态方法来实现它。这个静态方法是运算符作为参数所接受的类型之一的成员——例如，一个将 `Double` 乘以 `Int` 的运算符是作为 `Double` 或 `Int` 结构上的静态方法实现的。如果你在实现前缀或后缀运算符，你还必须在方法声明中标记相应的 `prefix` 或 `postfix` 声明修饰符。要查看如何创建和实现新运算符的示例，请参见 <doc:AdvancedOperators#自定义运算符>。

> 操作符声明的语法:
>
> *operator-declaration* → *prefix-operator-declaration* | *postfix-operator-declaration* | *infix-operator-declaration*
>
> *prefix-operator-declaration* → **`prefix`** **`operator`** *operator* \
> *postfix-operator-declaration* → **`postfix`** **`operator`** *operator* \
> *infix-operator-declaration* → **`infix`** **`operator`** *operator* *infix-operator-group*_?_
>
> *infix-operator-group* → **`:`** *precedence-group-name*

## 优先级组声明

*优先级组声明*在程序中引入了一个新的中缀运算符优先级分组。运算符的优先级指定了在没有分组括号的情况下，运算符与其操作数的绑定紧密程度。

优先级组声明具有以下形式：

```swift
precedencegroup <#precedence group name#> {
    higherThan: <#lower group names#>
    lowerThan: <#higher group names#>
    associativity: <#associativity#>
    assignment: <#assignment#>
}
```

*低级组名称*和*高级组名称*列表指定了新优先级组与现有优先级组的关系。`lowerThan` 优先级组属性只能用于引用当前模块外声明的优先级组。当两个运算符争夺其操作数时，如在表达式 `2 + 3 * 5` 中，具有较高相对优先级的运算符会更紧密地绑定到其操作数上。

> 注意:
> 使用*低级组名称*和*高级组名称*相关联的优先级组必须适合于单一的关系层次结构，但它们*不*必形成线性层次结构。这意味着可以有相对优先级未定义的优先级组。来自这些优先级组的运算符不能在没有分组括号的情况下相互使用。

Swift 定义了许多优先级组，以配合 Swift 标准库提供的运算符。例如，加法 (`+`) 和减法 (`-`) 运算符属于 `AdditionPrecedence` 组，而乘法 (`*`) 和除法 (`/`) 运算符属于 `MultiplicationPrecedence` 组。有关 Swift 标准库提供的优先级组的完整列表，请参见[运算符声明](https://developer.apple.com/documentation/swift/operator_declarations)。

运算符的*结合性*指定了在没有分组括号的情况下，具有相同优先级的运算符序列是如何分组的。通过写入上下文敏感的关键字之一来指定运算符的结合性：`left`、`right` 或 `none` ——如果你省略结合性，默认值为 `none`。左结合的运算符从左到右分组。例如，减法运算符（`-`）是左结合的，因此表达式`4 - 5 - 6` 被分组为 `(4 - 5) - 6`，并计算为 `-7`。右结合的运算符从右到左分组，而指定为 `none` 的运算符则完全不结合。相同优先级的非结合运算符不能相邻出现。例如，`<` 运算符的结合性为 `none`，这意味着 `1 < 2 < 3` 不是一个有效的表达式。

*赋值*优先级组的设置指定了运算符在包含可选链操作中的优先级。当设置为 `true` 时，对应优先级组中的运算符在可选链操作期间使用与 Swift 标准库中的赋值运算符相同的分组规则。否则，当设置为 `false` 或省略时，该优先级组中的运算符将遵循与不执行赋值的运算符相同的可选链规则。

> 优先级组声明的语法:
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

## 声明修饰符

*声明修饰符* 是用于修改声明行为或意义的关键字或上下文相关关键字。你通过在声明的属性（如果有的话）和引入声明的关键字之间写入相应的关键字或上下文相关关键字来指定声明修饰符。

- `class`：将此修饰符应用于类的成员，以指示该成员是类本身的成员，而不是类实例的成员。具有此修饰符且没有 `final` 修饰符的超类成员可以被子类重写。

- `dynamic`：将此修饰符应用于可以用 Objective-C 表示的类的任何成员。当你使用 `dynamic` 修饰符标记成员声明时，对该成员的访问始终通过 Objective-C 运行时动态分派。对该成员的访问永远不会被编译器内联或去虚拟化。

因为带有 `dynamic` 修饰符的声明是通过 Objective-C 运行时进行调度的，因此它们必须标记为 `objc` 属性。

- `final`：将此修饰符应用于类或类的属性、方法或下标成员。它应用于类以指示该类不能被子类化。它应用于类的属性、方法或下标，以指示类成员在任何子类中不能被重写。有关如何使用 `final` 属性的示例，请参见 <doc:Inheritance#防止重写>。

- `lazy`：将此修饰符应用于类或结构体的存储变量属性，以指示该属性的初始值在第一次访问该属性时最多计算并存储一次。有关如何使用 `lazy` 修饰符的示例，请参见 <doc:Properties#延时加载存储属性>。

- `optional`：将此修饰符应用于协议的属性、方法或下标成员，表示实现该协议的类型不必实现这些成员。

你只能将 `optional` 修饰符应用于带有 `objc` 属性的协议。因此，只有类类型可以采用并遵循包含可选成员要求的协议。有关如何使用 `optional` 修饰符的更多信息，以及在不确定遵循类型是否实现了这些成员时如何访问可选协议成员的指导，请参见 <doc:Protocols#可选协议要求>。

<!--
  TODO: Currently, you can't check for an optional initializer,
  so we're leaving those out of the documentation, even though you can mark
  an initializer with the @optional attribute. It's still being decided by the
  compiler team. Update this section if they decide to make everything work
  properly for optional initializer requirements.
-->

- `required`：将此修饰符应用于类的指定或便利构造器，以指示每个子类必须实现该构造器。子类对该构造器的实现也必须标记为 `required` 修饰符。

- `static`：将此修饰符应用于结构体、类、枚举或协议的成员，以指示该成员属于类型本身，而不是该类型实例的成员。在类声明的作用域内，将 `static` 修饰符应用于成员声明上，与在该成员声明上写 `class` 和 `final` 修饰符具有相同的效果。然而，类的常量类型属性是一个例外：在这种情况下，`static` 具有其通常的、非类相关的含义，因为在这些声明上不能使用 `class` 或 `final`。

- `unowned`：将此修饰符应用于存储变量、常量或存储属性，以指示该变量或属性对作为其值存储的对象具有一个无主引用。如果在对象被释放后尝试访问该变量或属性，将会引发运行时错误。与弱引用类似，属性或值的类型必须是类类型；与弱引用不同，类型是非可选的。有关 `unowned` 修饰符的示例和更多信息，请参见 <doc:AutomaticReferenceCounting#无主引用>。

- `unowned(safe)`：`unowned` 的显式拼写。

- `unowned(unsafe)`：将此修饰符应用于存储变量、常量或存储属性，以指示该变量或属性对作为其值存储的对象具有一个无主引用。如果在对象被释放后尝试访问该变量或属性，你将访问对象曾经所在位置的内存，这是一种不安全的内存操作。与弱引用类似，属性或值的类型必须是类类型；与弱引用不同，该类型是非可选的。有关 `unowned` 修饰符的示例和更多信息，请参见 <doc:AutomaticReferenceCounting#无主引用>。

- `weak`：将此修饰符应用于存储变量或存储变量属性，以指示该变量或属性对作为其值存储的对象具有弱引用。变量或属性的类型必须是可选类类型。如果在对象被释放后访问该变量或属性，其值为 `nil`。有关 `weak` 修饰符的示例和更多信息，请参见 <doc:AutomaticReferenceCounting#弱引用>。

### 访问控制级别

Swift 提供五种访问控制级别：open、public、internal、file private 和 private。你可以使用以下访问级别修饰符之一标记声明，以指定声明的访问级别。访问控制的详细信息请参见 <doc:AccessControl>。

- `open`：将此修饰符应用于声明，以指示该声明可以被与该声明位于同一模块中的代码访问和子类化。标记为 `open` 访问级别修饰符的声明也可以被导入包含该声明的模块的模块中的代码访问和子类化。

- `public`：将此修饰符应用于声明，以指示该声明可以被与该声明位于同一模块中的代码访问和子类化。标记为 `public` 访问级别修饰符的声明也可以被导入包含该声明的模块的模块中的代码访问（但不能被子类化）。

- `package`：将此修饰符应用于声明，以指示该声明只能被与声明在同一包中的代码访问。包是你在使用的构建系统中定义的代码分发单元。当构建系统编译代码时，它通过将 `-package-name` 标志传递给 Swift 编译器来指定包名称。如果构建系统在构建它们时指定相同的包名称，则两个模块属于同一个包。

- `internal`：将此修饰符应用于声明，以指示该声明只能被与声明在同一模块中的代码访问。默认情况下，大多数声明隐式标记为 `internal` 访问级别修饰符。

- `fileprivate`：将此修饰符应用于声明，以指示该声明只能被与声明在同一源文件中的代码访问。

- `private`：将此修饰符应用于声明，以指示该声明只能被声明的直接封闭作用域内的代码访问。

出于访问控制的目的，扩展的行为如下：

- 如果同一个文件中有多个扩展，并且这些扩展都扩展了相同的类型，那么所有这些扩展具有相同的访问控制作用域。这些扩展和它们扩展的类型可以在不同的文件中。

- 如果扩展与其扩展的类型在同一文件中，则扩展具有与其扩展的类型相同的访问控制作用域。

- 在类型声明中声明的私有成员可以从该类型的扩展中访问。在一个扩展中声明的私有成员可以从其他扩展和扩展类型的声明中访问。

每个上述访问级别修饰符可选择性地接受一个参数，该参数由括号中包含的 `set` 关键字组成——例如，`private(set)`。当你想要为变量或下标的setter指定一个小于或等于变量或下标本身的访问级别时，请使用这种形式的访问级别修饰符，如 <doc:AccessControl#Getters-和-Setters> 中所讨论的。

> 声明修饰语的语法:
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

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
