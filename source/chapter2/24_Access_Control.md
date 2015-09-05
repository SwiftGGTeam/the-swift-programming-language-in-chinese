# 访问控制（Access Control）
------------------

> 1.0
> 翻译：[JaceFu](http://www.devtalking.com/)
> 校对：[ChildhoodAndy](http://childhood.logdown.com)

> 2.0
> 翻译+校对：[mmoaay](https://github.com/mmoaay)

本页内容包括：

- [模块和源文件](#modules_and_source_files)
- [访问级别](#access_levels)
  -  [访问级别的使用原则](#guiding_principle_of_access_levels)
  -  [默认访问级别](#default_access_levels)
  -  [单目标应用程序的访问级别](#access_levels_for_single-target_apps)
  -  [Framework的访问级别](#access_levels_for_frameworks)
  -  [单元测试目标的访问级别](#access_levels_for_unit_test_targets)
- [访问控制语法](#access_control_syntax)
- [自定义类型](#custom_types)
  -  [元组类型](#tuple_types)
  -  [函数类型](#function_types)
  -  [枚举类型](#enumeration_types)
  -  [原始值和关联值](#raw_values_and_associated_values)
  -  [嵌套类型](#nested_types)
- [子类](#subclassing)
- [常量、变量、属性、下标](#constants_variables_properties_subscripts)
  -  [Getter和Setter](#getters_and_setters)
- [初始化](#initializers)
  -  [默认初始化方法](#default_initializers)
  -  [结构体的默认成员初始化方法](#default_memberwise_initializers_for_structure_types)
- [协议](#protocols)
  -  [协议继承](#protocol_inheritance)
  -  [协议一致性](#protocol_conformance)
- [扩展](#extensions)
  -  [协议的扩展](#adding_protocol_conformance_with_an_extension)
- [泛型](#generics)
- [类型别名](#type_aliases)

*访问控制*可以限定其他源文件或模块中代码对你代码的访问级别。这个特性可以让我们隐藏功能实现的一些细节，并且可以明确的申明我们提供给其他人的接口中哪些部分是他们可以访问和使用的。

你可以明确地给单个类型（类、结构体、枚举）设置访问级别，也可以给这些类型的属性、函数、初始化方法、基本类型、下标索引等设置访问级别。协议也可以被限定在一定的范围内使用，包括协议里的全局常量、变量和函数。

在提供了不同访问级别的同时，Swift还为某些典型场景提供了默认的访问级别，这样就不需要我们在每段代码中都申明显式访问级别。其实，如果只是开发一个单目标应用程序，我们完全可以不用申明代码的显式访问级别。

> 注意：简单起见，代码中可以设置访问级别的特性（属性、基本类型、函数等），在下面的章节中我们会以“实体”代替。

<a name="modules_and_source_files"></a>
## 模块和源文件
Swift 中的访问控制模型基于模块和源文件这两个概念。

*模块*指的是以独立单元构建和发布的`Framework`或`Application`。在Swift 中的一个模块可以使用`import`关键字引入另外一个模块。

在 Swift 中，Xcode的每个构建目标（比如`Framework`或`app bundle`）都被当作模块处理。如果你是为了实现某个通用的功能，或者是为了封装一些常用方法而将代码打包成独立的`Framework`，这个`Framework`在 Swift 中就被称为模块。当它被引入到某个 app 工程或者另外一个`Framework`时，它里面的一切（属性、函数等）仍然属于这个独立的模块。  

*源文件*指的是 Swift 中的`Swift File`，就是编写 Swift 源代码的文件，它通常属于一个模块。尽管一般我们将不同的`类` 分别定义在不同的源文件中，但是同一个源文件可以包含多个`类`和`函数` 的定义。

<a name="access_levels"></a>
## 访问级别
Swift 为代码中的实体提供了三种不同的访问级别。这些访问级别不仅与源文件中定义的实体相关，同时也与源文件所属的模块相关。

- `public`：可以访问自己模块中源文件里的任何实体，别人也可以通过引入该模块来访问源文件里的所有实体。通常情况下，`Framework` 中的某个接口是可以被任何人使用时，你可以将其设置为`public`级别。
- `internal`：可以访问自己模块中源文件里的任何实体，但是别人不能访问该模块中源文件里的实体。通常情况下，某个接口或`Framework`作为内部结构使用时，你可以将其设置为`internal`级别。
- `private`：只能在当前源文件中使用的实体，称为私有实体。使用`private`级别，可以用作隐藏某些功能的实现细节。

`public`为最高级访问级别，`private`为最低级访问级别。

> 注意：Swift中的`private`访问和其他语言中的`private`访问不太一样，它的范围限于整个源文件，而不是声明。这就意味着，一个`类` 可以访问定义该`类` 的源文件中定义的所有`private`实体，但是如果一个`类` 的扩展是定义在独立的源文件中，那么就不能访问这个`类` 的`private`成员。

<a name="guiding_principle_of_access_levels"></a>
### 访问级别的使用原则
Swift 中的访问级别遵循一个使用原则：访问级别统一性。
比如说：

- 一个`public`访问级别的变量，不能将它的类型定义为`internal`和`private`。因为变量可以被任何人访问，但是定义它的类型不可以，所以这样就会出现错误。
- 函数的访问级别不能高于它的参数、返回类型的访问级别。因为如果函数定义为`public`而参数或者返回类型定义为`internal`或`private`，就会出现函数可以被任何人访问，但是它的参数和返回类型确不可以，同样会出现错误。

<a name="default_access_levels"></a>
### 默认访问级别
如果你不为代码中的所有实体定义显式访问级别，那么它们默认为`internal`级别。在大多数情况下，我们不需要设置实体的显式访问级别。因为我们一般都是在开发一个`app bundle`。

<a name="access_levels_for_single-target_apps"></a>
### 单目标应用程序的访问级别
当你编写一个单目标应用程序时，该应用的所有功能都是为该应用服务，不需要提供给其他应用或者模块使用，所以我们不需要明确设置访问级别，使用默认的访问级别`internal`即可。但是如果你愿意，你也可以使用`private`级别，用于隐藏一些功能的实现细节。

<a name="access_levels_for_frameworks"></a>
### Framework的访问级别
当你开发`Framework`时，就需要把一些对外的接口定义为`public`级别，以便其他人导入该`Framework`后可以正常使用其功能。这些被你定义为`public`的接口，就是这个`Framework`的API。

> 注意：`Framework`的内部实现细节依然可以使用默认的`internal`级别，或者也可以定义为`private`级别。只有当你想把它作为 API 的一部分的时候，才将其定义为`public`级别。

<a name="access_levels_for_unit_test_targets"></a>
### 单元测试目标的访问级别

当你的app有单元测试目标时，为了方便测试，测试模块需要能访问到你app中的代码。默认情况下只有`public`级别的实体才可以被其他模块访问。然而，如果在引入一个生产模块时使用`@testable`注解，然后用带测试的方式编译这个生产模块，单元测试目标就可以访问所有`internal`级别的实体。

<a name="access_control_syntax"></a>
## 访问控制语法
通过修饰符`public`、`internal`、`private`来声明实体的访问级别：

```swift
public class SomePublicClass {}
internal class SomeInternalClass {}
private class SomePrivateClass {}

public var somePublicVariable = 0
internal let someInternalConstant = 0
private func somePrivateFunction() {}
```

除非有特殊的说明，否则实体都使用默认的访问级别`internal`，可以查阅**[默认访问级别](#default_access_levels)**这一节。这意味着在不使用修饰符声明显式访问级别的情况下，`SomeInternalClass`和`someInternalConstant`仍然拥有隐式的访问级别`internal`：

```swift
class SomeInternalClass {}              // 隐式访问级别 internal
var someInternalConstant = 0            // 隐式访问级别 internal
```
<a name="custom_types"></a>
## 自定义类型
如果想为一个自定义类型申明显式访问级别，那么要明确一点。那就是你要确保新类型的访问级别和它实际的作用域相匹配。比如说，如果你定义了一个`private`类，那这个类就只能在定义它的源文件中当作属性类型、函数参数或者返回类型使用。

类的访问级别也可以影响到类成员（属性、函数、初始化方法等）的默认访问级别。如果你将类申明为`private`类，那么该类的所有成员的默认访问级别也会成为`private`。如果你将类申明为`public`或者`internal`类（或者不明确的申明访问级别，而使用默认的`internal`访问级别），那么该类的所有成员的访问级别是`internal`。

> 注意：上面提到，一个`public`类的所有成员的访问级别默认为`internal`级别，而不是`public`级别。如果你想将某个成员申明为`public`级别，那么你必须使用修饰符明确的声明该成员。这样做的好处是，在你定义公共接口API的时候，可以明确的选择哪些属性或方法是需要公开的，哪些是内部使用的，可以避免将内部使用的属性方法公开成公共API的错误。

```swift
public class SomePublicClass {          // 显式的 public 类
   	public var somePublicProperty = 0    // 显式的 public 类成员
   	var someInternalProperty = 0         // 隐式的 internal 类成员
   	private func somePrivateMethod() {}  // 显式的 private 类成员
}

class SomeInternalClass {               // 隐式的 internal 类
   	var someInternalProperty = 0         // 隐式的 internal 类成员
   	private func somePrivateMethod() {}  // 显式的 private 类成员
}

private class SomePrivateClass {        // 显式的 private 类
   	var somePrivateProperty = 0          // 隐式的 private 类成员
   	func somePrivateMethod() {}          // 隐式的 private 类成员
}
```
<a name="tuple_types"></a>
### 元组类型
元组的访问级别使用是所有类型的访问级别使用中最为严谨的。比如说，如果你构建一个包含两种不同类型元素的元组，其中一个元素类型的访问级别为`internal`，另一个为`private`级别，那么这个元组的访问级别为`private`。也就是说元组的访问级别与元组中访问级别最低的类型一致。

> 注意：元组不同于类、结构体、枚举、函数那样有单独的定义。元组的访问级别是在它被使用时自动推导出的，而不是明确的申明。

<a name="function_types"></a>
### 函数类型
函数的访问级别需要根据该函数的参数类型和返回类型的访问级别得出。如果根据参数类型和返回类型得出的函数访问级别不符合默认上下文，那么就需要明确地申明该函数的访问级别。

下面的例子定义了一个名为`someFunction`全局函数，并且没有明确地申明其访问级别。也许你会认为该函数应该拥有默认的访问级别`internal`，但事实并非如此。事实上，如果按下面这种写法，代码是无法编译通过的：

```swift
func someFunction() -> (SomeInternalClass, SomePrivateClass) {
   	// function implementation goes here
}
```

我们可以看到，这个函数的返回类型是一个元组，该元组中包含两个自定义的类（可查阅**[自定义类型](#custom_types)**）。其中一个类的访问级别是`internal`，另一个的访问级别是`private`，所以根据元组访问级别的原则，该元组的访问级别是`private`（元组的访问级别与元组中访问级别最低的类型一致）。

因为该函数返回类型的访问级别是`private`，所以你必须使用`private`修饰符，明确的声明该函数：

```swift
private func someFunction() -> (SomeInternalClass, SomePrivateClass) {
   	// function implementation goes here
}
```

将该函数申明为`public`或`internal`，或者使用默认的访问级别`internal`都是错误的，因为如果把该函数当做`public`或`internal`级别来使用的话，是无法得到`private`级别的返回值的。

<a name="enumeration_types"></a>
### 枚举类型
枚举中成员的访问级别继承自该枚举，你不能为枚举中的成员单独申明不同的访问级别。

比如下面的例子，枚举`CompassPoint`被明确的申明为`public`级别，那么它的成员`North`，`South`，`East`，`West`的访问级别同样也是`public`：

```swift
public enum CompassPoint {
   	case North
   	case South
   	case East
   	case West
}
```

<a name="raw_values_and_associated_values"></a>
### 原始值和关联值
枚举定义中的任何原始值或关联值的类型都必须有一个访问级别，这个级别至少要不低于枚举的访问级别。比如说，你不能在一个`internal`访问级别的枚举中定义`private`级别的原始值类型。

<a name="nested_types"></a>
### 嵌套类型
如果在`private`级别的类型中定义嵌套类型，那么该嵌套类型就自动拥有`private`访问级别。如果在`public`或者`internal`级别的类型中定义嵌套类型，那么该嵌套类型自动拥有`internal`访问级别。如果想让嵌套类型拥有`public`访问级别，那么需要明确地申明该嵌套类型的访问级别。

<a name="subclassing"></a>
## 子类
子类的访问级别不得高于父类的访问级别。比如说，父类的访问级别是`internal`，子类的访问级别就不能申明为`public`。

此外，在满足子类不高于父类访问级别以及遵循各访问级别作用域（即模块或源文件）的前提下，你可以重写任意类成员（方法、属性、初始化方法、下标索引等）。

如果我们无法直接访问某个类中的属性或函数等，那么可以继承该类，从而可以更容易的访问到该类的类成员。下面的例子中，类`A`的访问级别是`public`，它包含一个函数`someMethod`，访问级别为`private`。类`B`继承类`A`，并且访问级别申明为`internal`，但是在类`B`中重写了类`A`中访问级别为`private`的方法`someMethod`，并重新申明为`internal`级别。通过这种方式，我们就可以访问到某类中`private`级别的类成员，并且可以重新申明其访问级别，以便其他人使用：

```swift
public class A {
   	private func someMethod() {}
}

internal class B: A {
   	override internal func someMethod() {}
}
```

只要满足子类不高于父类访问级别以及遵循各访问级别作用域的前提下（即`private`的作用域在同一个源文件中，`internal`的作用域在同一个模块下），我们甚至可以在子类中，用子类成员访问父类成员，哪怕父类成员的访问级别比子类成员的要低：

```swift
public class A {
    private func someMethod() {}
}

internal class B: A {
   	override internal func someMethod() {
       	super.someMethod()
   	}
}
```

因为父类`A`和子类`B`定义在同一个源文件中，所以在类`B`中可以在重写的`someMethod`方法中调用`super.someMethod()`。

<a name="constants_variables_properties_subscripts"></a>
## 常量、变量、属性、下标
常量、变量、属性不能拥有比它们的类型更高的访问级别。比如说，你定义一个`public`级别的属性，但是它的类型是`private`级别的，这是编译器所不允许的。同样，下标也不能拥有比索引类型或返回类型更高的访问级别。  

如果常量、变量、属性、下标索引的定义类型是`private`级别的，那么它们必须要明确的申明访问级别为`private`：

```swift
private var privateInstance = SomePrivateClass()
```

<a name="getters_and_setters"></a>
### Getter和Setter
常量、变量、属性、下标索引的`Getters`和`Setters`的访问级别继承自它们所属成员的访问级别。

`Setter`的访问级别可以低于对应的`Getter`的访问级别，这样就可以控制变量、属性或下标索引的读写权限。在`var`或`subscript`定义作用域之前，你可以通过`private(set)`或`internal(set)`先为它们的写权限申明一个较低的访问级别。

> 注意：这个规定适用于用作存储的属性或用作计算的属性。即使你不明确地申明存储属性的`Getter`、`Setter`，Swift也会隐式的为其创建`Getter`和`Setter`，用于对该属性进行读取操作。使用`private(set)`和`internal(set)`可以改变Swift隐式创建的`Setter`的访问级别。这对计算属性也同样适用。  

下面的例子中定义了一个名为`TrackedString`的结构体，它记录了`value`属性被修改的次数：

```swift
struct TrackedString {
   	private(set) var numberOfEdits = 0
   	var value: String = "" {
   	didSet {
       	numberOfEdits++
   	}
   	}
}
```


`TrackedString`结构体定义了一个用于存储`String`类型的属性`value`，并将初始化值设为`""`（即一个空字符串）。该结构体同时也定义了另一个用于存储`Int`类型的属性名`numberOfEdits`，它用于记录属性`value`被修改的次数。这个功能的实现通过属性`value`的`didSet`方法实现，每当给`value`赋新值时就会调用`didSet`方法，然后将`numberOfEdits`的值加一。

结构体`TrackedString`和它的属性`value`均没有申明显式访问级别，所以它们都拥有默认的访问级别`internal`。但是该结构体的`numberOfEdits`属性使用`private(set)`修饰符进行申明，这意味着`numberOfEdits`属性只能在定义该结构体的源文件中赋值。`numberOfEdits`属性的`Getter`依然是默认的访问级别`internal`，但是`Setter`的访问级别是`private`，这表示该属性只有在当前的源文件中是可读写的，而在当前源文件所属的模块中它只是一个可读的属性。  

如果你实例化`TrackedString`结构体，并且多次对`value`属性的值进行修改，你就会看到`numberOfEdits`的值会随着修改次数进行变化：

```swift
var stringToEdit = TrackedString()
stringToEdit.value = "This string will be tracked."
stringToEdit.value += " This edit will increment numberOfEdits."
stringToEdit.value += " So will this one."
print("The number of edits is \(stringToEdit.numberOfEdits)")
// prints "The number of edits is 3"
```

虽然你可以在其他的源文件中实例化该结构体并且获取到`numberOfEdits`属性的值，但是你不能对其进行赋值。这样就能很好的告诉使用者，你只管使用，而不需要知道其实现细节。

如果有必要你可以为`Getter`和`Setter`方法设定显式访问级别。下面的例子就是明确申明了`public`访问级别的`TrackedString`结构体。结构体的成员（包括`numberOfEdits`属性）拥有默认的访问级别`internal`。你可以结合`public`和`private(set)`修饰符把结构体中的`numberOfEdits`属性`Getter`方法的访问级别设置为`public`，而`Setter`方法的访问级别设置为`private`：

```swift
public struct TrackedString {
    public private(set) var numberOfEdits = 0
    public var value: String = "" {
        didSet {
            numberOfEdits++
        }
    }
    public init() {}
}
```

<a name="initializers"></a>
## 初始化
我们可以给自定义的初始化方法申明访问级别，但是要不高于它所属类的访问级别。但[必要构造器](./14_Initialization.html#required_initializers)例外，它的访问级别必须和所属类的访问级别相同。

如同函数或方法参数，初始化方法参数的访问级别也不能低于初始化方法的访问级别。

<a name="default_initializers"></a>
### 默认初始化方法
Swift为结构体、类都提供了一个默认的无参初始化方法，用于给它们的所有属性提供赋值操作，但不会给出具体值。默认初始化方法可以参阅[默认构造器](./14_Initialization.html#default_initializers)。默认初始化方法的访问级别与所属类型的访问级别相同。

> 注意：如果一个类型被申明为`public`级别，那么默认的初始化方法的访问级别为`internal`。如果你想让无参的初始化方法在其他模块中可以被使用，那么你必须提供一个具有`public`访问级别的无参初始化方法。

<a name="default_memberwise_initializers_for_structure_types"></a>
### 结构体的默认成员初始化方法
如果结构体中的任一存储属性的访问级别为`private`，那么它的默认成员初始化方法访问级别就是`private`。尽管如此，结构体的初始化方法的访问级别依然是`internal`。

如果你想在其他模块中使用该结构体的默认成员初始化方法，那么你需要提供一个访问级别为`public`的默认成员初始化方法。

<a name="protocols"></a>
## 协议
如果想为一个协议明确的申明访问级别，那么需要注意一点，就是你要确保该协议只在你申明的访问级别作用域中使用。  

协议中的每一个必须要实现的函数都具有和该协议相同的访问级别。这样才能确保该协议的使用者可以实现它所提供的函数。

> 注意：如果你定义了一个`public`访问级别的协议，那么实现该协议提供的必要函数也会是`public`的访问级别。这一点不同于其他类型，比如，`public`访问级别的其他类型，他们成员的访问级别为`internal`。

<a name="protocol_inheritance"></a>
### 协议继承
如果定义了一个新的协议，并且该协议继承了一个已知的协议，那么新协议拥有的访问级别最高也只和被继承协议的访问级别相同。比如说，你不能定义一个`public`的协议而去继承一个`internal`的协议。

<a name="protocol_conformance"></a>
### 协议一致性
类可以采用比自身访问级别低的协议。比如说，你可以定义一个`public`级别的类，可以让它在其他模块中使用，同时它也可以采用一个`internal`级别的协议，并且只能在定义了该协议的模块中使用。

采用了协议的类的访问级别取它本身和所采用协议中最低的访问级别。也就是说如果一个类是`public`级别，采用的协议是`internal`级别，那么采用了这个协议后，该类的访问级别也是`internal`。

如果你采用了协议，那么实现了协议所必须的方法后，该方法的访问级别遵循协议的访问级别。比如说，一个`public`级别的类，采用了`internal`级别的协议，那么该类实现协议的方法至少也得是`internal`。

> 注意：Swift和Objective-C一样，协议的一致性保证了一个类不可能在同一个程序中用不同的方法采用同一个协议。

<a name="extensions"></a>
## 扩展
你可以在条件允许的情况下对类、结构体、枚举进行扩展。扩展成员应该具有和原始类成员一致的访问级别。比如你扩展了一个公共类型，那么你新加的成员应该具有和原始成员一样的默认的`internal`访问级别。

或者，你可以明确申明扩展的访问级别（比如使用`private extension`）给该扩展内所有成员申明一个新的默认访问级别。这个新的默认访问级别仍然可以被单独成员所申明的访问级别所覆盖。

<a name="adding_protocol_conformance_with_an_extension"></a>
### 协议的扩展
如果一个扩展采用了某个协议，那么你就不能对该扩展使用访问级别修饰符来申明了。该扩展中实现协议的方法都会遵循该协议的访问级别。

<a name="generics"></a>
## 泛型
泛型类型或泛型函数的访问级别取泛型类型、函数本身、泛型类型参数三者中的最低访问级别。

<a name="type_aliases"></a>
## 类型别名
任何你定义的类型别名都会被当作不同的类型，以便于进行访问控制。一个类型别名的访问级别不可高于原类型的访问级别。比如说，一个`private`级别的类型别名可以设定给一个`public`、`internal`、`private`的类型，但是一个`public`级别的类型别名只能设定给一个`public`级别的类型，不能设定给`internal`或`private` 级别的类型。

> 注意：这条规则也适用于为满足协议一致性而给相关类型命名别名的情况。
