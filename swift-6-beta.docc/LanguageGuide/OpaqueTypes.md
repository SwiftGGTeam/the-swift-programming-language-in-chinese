# 不透明类型和封装协议类型

隐藏值类型的实现细节。

Swift 提供了两种隐藏值类型细节的方法：不透明类型（Opaque Type）和封装协议类型（Boxed Protocol Type）。在隔离模块和调用模块的代码上，隐藏类型信息是有用的，因为这样返回值的底层类型可以保持私有。

返回不透明类型的函数或方法隐藏了其返回值的类型信息。函数会将返回值类型描述为一个遵循某种协议的类型，而非一个更具体的类型。不透明类型会保留类型的身份信息 —— 编译器可以访问该类型信息，但模块的调用端则无法访问。

封装协议类型可以存储遵循给定协议的任何类型的实例。封装协议类型不保留类型的身份信息 —— 值的具体类型在运行时才会被知道，并且随着不同的值被存储其中，它的具体类型可能会发生变化。

## 不透明类型所解决的问题

举个例子，假设你正在编写一个用 ASCII 字符绘制几何形状的程序模块。每个几何形状结构体的基本特征是有一个 `draw()` 函数，该函数返回表示那个几何形状的字符串，这样你就可以把这个基本特征作为 `Shape` 协议的要求之一：

```swift
protocol Shape {
    func draw() -> String
}

struct Triangle: Shape {
    var size: Int
    func draw() -> String {
       var result: [String] = []
       for length in 1...size {
           result.append(String(repeating: "*", count: length))
       }
       return result.joined(separator: "\n")
    }
}
let smallTriangle = Triangle(size: 3)
print(smallTriangle.draw())
// *
// **
// ***
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> protocol Shape {
         func draw() -> String
     }
  ---
  -> struct Triangle: Shape {
        var size: Int
        func draw() -> String {
            var result: [String] = []
            for length in 1...size {
                result.append(String(repeating: "*", count: length))
            }
            return result.joined(separator: "\n")
        }
     }
  -> let smallTriangle = Triangle(size: 3)
  -> print(smallTriangle.draw())
  </ *
  </ **
  </ ***
  ```
-->

如下面的代码所示，你可以使用泛型来实现像垂直翻转某个几何形状这样的操作。然而，这种方法有一个重要的局限性：翻转后的结果会暴露用于创建该结果的确切的泛型类型。

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
let flippedTriangle = FlippedShape(shape: smallTriangle)
print(flippedTriangle.draw())
// ***
// **
// *
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> struct FlippedShape<T: Shape>: Shape {
         var shape: T
         func draw() -> String {
             let lines = shape.draw().split(separator: "\n")
             return lines.reversed().joined(separator: "\n")
         }
     }
  -> let flippedTriangle = FlippedShape(shape: smallTriangle)
  -> print(flippedTriangle.draw())
  </ ***
  </ **
  </ *
  ```
-->

又比如下面这样的代码，这种方法定义了一个能将两个形状垂直连接起来的 `JoinedShape<T: Shape, U: Shape>` 结构体，如果把一个三角形与一个翻转过的三角形连接在一起，就产生了像 `JoinedShape<Triangle, FlippedShape<Triangle>>` 这样的类型。

```swift
struct JoinedShape<T: Shape, U: Shape>: Shape {
    var top: T
    var bottom: U
    func draw() -> String {
       return top.draw() + "\n" + bottom.draw()
    }
}
let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
print(joinedTriangles.draw())
// *
// **
// ***
// ***
// **
// *
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> struct JoinedShape<T: Shape, U: Shape>: Shape {
        var top: T
        var bottom: U
        func draw() -> String {
            return top.draw() + "\n" + bottom.draw()
        }
     }
  -> let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
  -> print(joinedTriangles.draw())
  </ *
  </ **
  </ ***
  </ ***
  </ **
  </ *
  ```
-->

因为我们总是需要声明完整的返回类型，所以暴露关于形状创建的详细信息会导致类型泄露，这些泄漏的类型本不应成为绘制几何形状程序模块公开接口的一部分。模块内部的代码可以以多种不同的方式构建相同的形状，而其他使用该形状的模块外部代码不应需要考虑关于变换几何形状的具体实现细节。
像 `JoinedShape` 和 `FlippedShape` 这样的包装类型（wrapper types）对模块的用户来说并不重要，它们不应该被暴露出去。该模块的公开接口包括了连接和翻转形状等操作，这些操作会返回另一个经过操作后的 `Shape` 值。

## 返回一个不透明类型

你可以把不透明类型看作是泛型类型的反面。泛型类型允许函数的调用端选择参数和返回值的类型，而这些类型与函数的实现是分离的。例如，以下代码中的函数返回一个调用端指定的类型：

```swift
func max<T>(_ x: T, _ y: T) -> T where T: Comparable { ... }
```

<!--
  From https://developer.apple.com/documentation/swift/1538951-max
  Not test code because it won't actually compile
  and there's nothing to meaningfully test.
-->

`max(_:_:)` 的调用端会指定 `x`和 `y` 的值，这些值的类型决定了 `T` 的具体类型。调用端可以使用任何遵循 `Comparable` 协议的类型来调用这个函数。函数内部的代码以一种通用的方式编写，因此可以处理调用端提供的任何类型。`max(_:_:)` 的实现将仅使用所有遵循 `Comparable` 协议的类型所共享的功能。

在这一点上，返回不透明类型函数的角色是反过来的。不透明类型将允许函数的实现来选择返回值的类型，而返回值的类型与函数的调用端是分离的。例如，以下示例中的函数返回一个梯形，却没有暴露该形状的底层类型。

```swift
struct Square: Shape {
    var size: Int
    func draw() -> String {
        let line = String(repeating: "*", count: size)
        let result = Array<String>(repeating: line, count: size)
        return result.joined(separator: "\n")
    }
}

func makeTrapezoid() -> some Shape {
    let top = Triangle(size: 2)
    let middle = Square(size: 2)
    let bottom = FlippedShape(shape: top)
    let trapezoid = JoinedShape(
        top: top,
        bottom: JoinedShape(top: middle, bottom: bottom)
    )
    return trapezoid
}
let trapezoid = makeTrapezoid()
print(trapezoid.draw())
// *
// **
// **
// **
// **
// *
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> struct Square: Shape {
         var size: Int
         func draw() -> String {
             let line = String(repeating: "*", count: size)
             let result = Array<String>(repeating: line, count: size)
             return result.joined(separator: "\n")
         }
     }
  ---
  -> func makeTrapezoid() -> some Shape {
         let top = Triangle(size: 2)
         let middle = Square(size: 2)
         let bottom = FlippedShape(shape: top)
         let trapezoid = JoinedShape(
             top: top,
             bottom: JoinedShape(top: middle, bottom: bottom)
         )
         return trapezoid
     }
  -> let trapezoid = makeTrapezoid()
  -> print(trapezoid.draw())
  </ *
  </ **
  </ **
  </ **
  </ **
  </ *
  ```
-->

在这个例子中，`makeTrapezoid()` 函数声明它的返回类型为 `some Shape`。因此，该函数会返回一个遵循 `Shape` 协议的某种给定类型的值，却可以不必指定任何特定的具体返回类型。以这种方式编写 `makeTrapezoid()` 使其能够只需表达其公开接口的基本特征 —— 它返回的值是一个形状 —— 而不会将构成该形状的具体类型暴露为其公开接口的一部分。这个实现使用了两个三角形和一个正方形来绘制梯形，但是你也可以用其他不同的方式来实现同样的功能，而无需改变函数的返回类型。

这个例子凸显了不透明类型与泛型类型的反向关系。就像泛型函数的调用端一样，`makeTrapezoid()` 中的代码可以返回它所需的任何类型，只要该类型遵循 `Shape` 协议。类似于泛型函数的实现，该函数的调用端也需要以一种通用的方式来编写，以便能够兼容由 `makeTrapezoid()` 返回的任何 `Shape` 值。

你还可以将不透明返回类型与泛型结合使用。以下代码中的函数都返回了遵循 `Shape` 协议的某种类型的值。

```swift
func flip<T: Shape>(_ shape: T) -> some Shape {
    return FlippedShape(shape: shape)
}
func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
    JoinedShape(top: top, bottom: bottom)
}

let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
print(opaqueJoinedTriangles.draw())
// *
// **
// ***
// ***
// **
// *
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> func flip<T: Shape>(_ shape: T) -> some Shape {
         return FlippedShape(shape: shape)
     }
  -> func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
         JoinedShape(top: top, bottom: bottom)
     }
  ---
  -> let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
  -> print(opaqueJoinedTriangles.draw())
  </ *
  </ **
  </ ***
  </ ***
  </ **
  </ *
  ```
-->

在这个例子中，`opaqueJoinedTriangles` 的值与前面章节<doc:OpaqueTypes#The-Problem-That-Opaque-Types-Solve>中所举的泛型例子里的 `joinedTriangles` 的值相同。但是，与那个例子不同的是，`flip(_:)` 和 `join(_:_:)` 将泛型形状操作所返回的底层类型包装在不透明返回类型中，使得这些类型不再可见。这两个函数是泛型函数，因为它们依赖的类型是泛型类型，函数的类型参数传递出了 `FlippedShape` 和 `JoinedShape` 所需的类型信息。

如果一个返回不透明类型的函数从多处返回值，则所有可能的返回值必须具有相同的类型。对于一个泛型函数，它可以使用函数的泛型参数作为其返回类型，但这个返回类型仍然必须是相同的某个单一类型。例如，下面是一个*不合法的*形状翻转函数版本，它包含了正方形的一个特例：

```swift
func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    if shape is Square {
        return shape // 错误：返回类型不一致
    }
    return FlippedShape(shape: shape) // 错误：返回类型不一致
}
```

<!--
  - test: `opaque-result-err`

  ```swifttest
  >> protocol Shape {
  >>     func draw() -> String
  >> }
  >> struct Square: Shape {
  >>     func draw() -> String { return "#" }  // stub implementation
  >> }
  >> struct FlippedShape<T: Shape>: Shape {
  >>     var shape: T
  >>     func draw() -> String { return "#" } // stub implementation
  >> }
  -> func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
         if shape is Square {
             return shape // Error: return types don't match
         }
         return FlippedShape(shape: shape) // Error: return types don't match
     }
  !$ error: function declares an opaque return type 'some Shape', but the return statements in its body do not have matching underlying types
  !! func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
  !!      ^                                    ~~~~~~~~~~
  !$ note: return statement has underlying type 'T'
  !! return shape // Error: return types don't match
  !! ^
  !$ note: return statement has underlying type 'FlippedShape<T>'
  !! return FlippedShape(shape: shape) // Error: return types don't match
  !! ^
  ```
-->

如果你用一个 `Square` 调用这个函数，它会返回一个 `Square`；否则，它会返回一个 `FlippedShape`。这违反了只能返回同一种类型值的要求，使得 `invalidFlip(_:)` 成为不合法的代码。修复 `invalidFlip(_:)` 的一种方法是将正方形特例的处理移入 `FlippedShape` 的实现中，这样可以让这个函数始终返回一个 `FlippedShape` 值：

```swift
struct FlippedShape<T: Shape>: Shape {
    var shape: T
    func draw() -> String {
        if shape is Square {
           return shape.draw()
        }
        let lines = shape.draw().split(separator: "\n")
        return lines.reversed().joined(separator: "\n")
    }
}
```

<!--
  - test: `opaque-result-special-flip`

  ```swifttest
  >> protocol Shape { func draw() -> String }
  >> struct Square: Shape {
  >>     func draw() -> String { return "#" }  // stub implementation
  >> }
  -> struct FlippedShape<T: Shape>: Shape {
         var shape: T
         func draw() -> String {
             if shape is Square {
                return shape.draw()
             }
             let lines = shape.draw().split(separator: "\n")
             return lines.reversed().joined(separator: "\n")
         }
     }
  ```
-->

<!--
  Another way to fix it is with type erasure.
  Define a wrapper called AnyShape,
  and wrap whatever shape you created inside invalidFlip(_:)
  before returning it.
  That example is long enough that it breaks the flow here.
-->

始终返回同一种单一类型的要求并不妨碍你在不透明返回类型中使用泛型。以下是一个示例函数，它将它的类型参数作为其返回值的基础类型：

```swift
func `repeat`<T: Shape>(shape: T, count: Int) -> some Collection {
    return Array<T>(repeating: shape, count: count)
}
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> func `repeat`<T: Shape>(shape: T, count: Int) -> some Collection {
         return Array<T>(repeating: shape, count: count)
     }
  ```
-->

在这个例子中，返回值的基础类型取决于 `T`：无论传入的形状是什么，`repeat(shape:count:)` 都会创建并返回该形状的数组。然而，因为返回值始终具有相同的基础类型 `[T]`，所以它遵循了具有不透明返回类型的函数必须仅返回某种单一类型值的要求。

## 封装协议类型

封装协议类型有时也被称为*存在类型（existential type）*，这个术语源于这样的一个表达：“存在一个类型 *T*，使得 *T* 遵循该协议”。要创建一个封装协议类型，在协议名称前加上 `any`。下面是一个示例：

```swift
struct VerticalShapes: Shape {
    var shapes: [any Shape]
    func draw() -> String {
        return shapes.map { $0.draw() }.joined(separator: "\n\n")
    }
}

let largeTriangle = Triangle(size: 5)
let largeSquare = Square(size: 5)
let vertical = VerticalShapes(shapes: [largeTriangle, largeSquare])
print(vertical.draw())
```

<!--
  - test: `boxed-protocol-types`

  ```swifttest
   >> protocol Shape {
   >>    func draw() -> String
   >> }
   >> struct Triangle: Shape {
   >>    var size: Int
   >>    func draw() -> String {
   >>        var result: [String] = []
   >>        for length in 1...size {
   >>            result.append(String(repeating: "*", count: length))
   >>        }
   >>        return result.joined(separator: "\n")
   >>    }
   >> }
   >> struct Square: Shape {
   >>     var size: Int
   >>     func draw() -> String {
   >>         let line = String(repeating: "*", count: size)
   >>         let result = Array<String>(repeating: line, count: size)
   >>         return result.joined(separator: "\n")
   >>     }
   >
   -> struct VerticalShapes: Shape {
          var shapes: [any Shape]
          func draw() -> String {
              return shapes.map { $0.draw() }.joined(separator: "\n\n")
          }
      }
   ->
   -> let largeTriangle = Triangle(size: 5)
   -> let largeSquare = Square(size: 5)
   -> let vertical = VerticalShapes(shapes: [largeTriangle, largeSquare])
   -> print(vertical.draw())
   << *
   << **
   << ***
   << ****
   << *****
   <<-
   << *****
   << *****
   << *****
   << *****
   << *****
  ```
-->

在上面的例子中，`VerticalShapes` 声明了 `shapes` 的类型为 `[any Shape]` —— 一个封装 `Shape` 类型元素的数组。数组中的每个元素可以是不同的类型，但所有这些类型都必须遵循 `Shape` 协议。为了支持这种运行时的灵活性，Swift 在必要时会增加一层间接的抽象分层 —— 这种分层被称为*封装层（Box）*，并且它有性能成本。

在 `VerticalShapes` 类型中，代码可以使用 `Shape` 协议所要求的方法、属性和下标操作。例如，`VerticalShapes` 的 `draw()` 方法调用了数组中每个元素的 `draw()` 方法。因为 `Shape` 协议要求必须有一个 `draw()` 方法，所以这个方法是可用的。相反，如果尝试访问三角形的 `size` 属性，或任何其他不被 `Shape` 协议所要求的属性或方法，会产生错误。

我们来对比一下可用于 `shapes` 的三种类型：

- 使用泛型：通过编写 `struct VerticalShapes<S: Shape>` 和 `var shapes: [S]`，可以创建一个数组，其元素是某种特定的形状类型，并且这个特定类型的身份对任何与数组交互的代码都是可见的。

- 使用不透明类型：通过编写 `var shapes: [some Shape]` 来创建一个数组，其元素是某种特定形状类型，并且这个特定类型的身份是隐藏的。

- 使用封装协议类型：通过编写 `var shapes: [any Shape]` 能创建一个可以存储不同类型元素的数组，并且这些类型的身份是隐藏的。

在上面的例子中，封装协议类型是唯一允许 `VerticalShapes` 的调用者将不同种类的形状混合在一起的方法。

你可以在知道被封装值的基础类型时使用一个 `as` 来进行类型转换。例如：

```swift
if let downcastTriangle = vertical.shapes[0] as? Triangle {
    print(downcastTriangle.size)
}
// 打印输出 "5"
```

要了解更多信息请参考<doc:TypeCasting#Downcasting>。

## 不透明类型与封装协议类型之间的区别

函数返回一个不透明类型与返回一个封装协议类型看起来非常相似，但这两种返回类型在是否保留类型的身份信息上有所不同。不透明类型指的是某种特定类型，尽管函数的调用者无法看到是哪种具体类型；而封装协议类型可以指任何遵循该协议的类型。一般来说，封装协议类型在存储值的底层类型上提供了更多的灵活性，而不透明类型则需要你对这些底层类型做出更严格的保证。

例如，以下是前文中 `flip(_:)` 的另一个版本，它使用封装协议类型而不是不透明类型作为其返回类型：

```swift
func protoFlip<T: Shape>(_ shape: T) -> Shape {
    return FlippedShape(shape: shape)
}
```

<!--
  - test: `opaque-result-existential-error`

  ```swifttest
  >> protocol Shape {
  >>     func draw() -> String
  >> }
  >> struct Triangle: Shape {
  >>     var size: Int
  >>     func draw() -> String { return "#" }  // stub implementation
  >> }
  >> struct Square: Shape {
  >>     var size: Int
  >>     func draw() -> String { return "#" }  // stub implementation
  >> }
  >> struct FlippedShape<T: Shape>: Shape {
  >>     var shape: T
  >>     func draw() -> String { return "#" } // stub implementation
  >> }
  -> func protoFlip<T: Shape>(_ shape: T) -> Shape {
        return FlippedShape(shape: shape)
     }
  ```
-->

这个版本的 `protoFlip(_:)` 与 `flip(_:)` 的主体相同，并且它始终返回相同类型的值。与 `flip(_:)` 不同的是，`protoFlip(_:)` 的返回值其实不需要总是具有相同的类型 —— 这个返回值只需遵循 `Shape` 协议即可。换句话说，`protoFlip(_:)` 与其调用者之间的 API 约束比 `flip(_:)` 更加宽松。它保留了返回多种类型值的灵活性：

```swift
func protoFlip<T: Shape>(_ shape: T) -> Shape {
    if shape is Square {
        return shape
    }

    return FlippedShape(shape: shape)
}
```

<!--
  - test: `opaque-result-existential-error`

  ```swifttest
  -> func protoFlip<T: Shape>(_ shape: T) -> Shape {
        if shape is Square {
           return shape
        }

        return FlippedShape(shape: shape)
     }
  !$ error: invalid redeclaration of 'protoFlip'
  !! func protoFlip<T: Shape>(_ shape: T) -> Shape {
  !!      ^
  !$ note: 'protoFlip' previously declared here
  !! func protoFlip<T: Shape>(_ shape: T) -> Shape {
  !!      ^
  ```
-->

修改后的 `protoFlip(_:)` 函数根据传入的形状返回一个 `Square` 实例或一个 `FlippedShape` 实例。由这个函数在两处返回的两个翻转形状可能具有完全不同的类型。其他合法版本的这个函数在翻转同一形状的多个实例时，可能会返回不同类型的值。`protoFlip(_:)` 返回值的类型信息不够具体，这意味着许多依赖于类型信息的操作无法在返回值上使用。例如，无法编写用于比较这个函数返回结果的 `==` 运算符。

```swift
let protoFlippedTriangle = protoFlip(smallTriangle)
let sameThing = protoFlip(smallTriangle)
protoFlippedTriangle == sameThing  // 错误
```

<!--
  - test: `opaque-result-existential-error`

  ```swifttest
  >> let smallTriangle = Triangle(size: 3)
  -> let protoFlippedTriangle = protoFlip(smallTriangle)
  -> let sameThing = protoFlip(smallTriangle)
  -> protoFlippedTriangle == sameThing  // Error
  !$ error: binary operator '==' cannot be applied to two 'any Shape' operands
  !! protoFlippedTriangle == sameThing  // Error
  !! ~~~~~~~~~~~~~~~~~~~~ ^  ~~~~~~~~~
  ```
-->

示例中最后一行的错误有几个原因。最直接的问题是 `Shape` 协议的要求中不包含 `==` 运算符。如果你尝试添加一个，你会遇到的下一个问题是 `==` 运算符需要知道其左右参数的类型。此类运算符通常要接受 `Self` 类型的参数，即与遵循协议的具体类型具有一致类型的参数，但如果为协议添加 `Self` 要求，在将协议当作类型使用时将不再允许进行类型抹消（Type Erasure）。

将封装协议类型用作函数的返回类型，给你带来了返回任何遵循该协议的类型的灵活性。然而，这种灵活性的代价是，某些操作无法在返回的值上执行。上面的示例显示了 `==` 运算符不可用的情况 —— 它依赖于特定的类型信息，而使用封装协议类型时这些信息无法保留。

这种方法的另一个问题是形状变换无法嵌套。翻转三角形的结果是一个类型为 `Shape` 的值，而 `protoFlip(_:)` 函数的参数是某种遵循 `Shape` 协议的类型。然而，封装协议类型的值并不遵循该协议。因此，`protoFlip(_:)` 返回的值并不遵循 `Shape` 协议。这意味着像 `protoFlip(protoFlip(smallTriangle))` 这样试图嵌套多次变换的代码是不合法的，因为翻转后的形状不是 `protoFlip(_:)` 的合法参数。（译者注：在此例中，封装协议类型的函数返回值允许该返回值是任何遵循 `Shape` 协议的类型，但这个封装本身并不保留原始类型的信息，即“存在某种遵循 `Shape` 协议的类型，但具体是什么类型你不知道”。这种类型信息在被封装后是被抹除的。因此，虽然 `any Shape` 可以持有一个遵循 `Shape` 协议的值，但 `any Shape` 本身并不遵循 `Shape` 协议。）

相比之下，不透明类型保留了底层类型的身份信息。Swift 可以推断出关联的类型，这使得你可以在封装协议类型不能用作返回值的地方使用不透明返回值。例如，下面是一个来自<doc:Generics>的 `Container` 协议的版本：

```swift
protocol Container {
    associatedtype Item
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
extension Array: Container { }
```

<!--
  - test: `opaque-result, opaque-result-existential-error`

  ```swifttest
  -> protocol Container {
         associatedtype Item
         var count: Int { get }
         subscript(i: Int) -> Item { get }
     }
  -> extension Array: Container { }
  ```
-->

你不能将 `Container` 用作函数的返回类型，因为该协议具有一个关联类型（Associated Type）。你也不能将其用作泛型返回类型的约束，因为在函数体外部没有足够的信息来推断泛型类型需要是什么具体类型。（译者注：因为协议中的关联类型在定义时并未具体化，而是在实际遵循协议的类型中被确定。由于关联类型在编译时无法确定具体类型，这会对类型推断和函数的返回类型造成影响。当你尝试将 `Container` 用作函数的返回类型时，编译器无法确定 `Container` 的具体实现，因为 `Container` 只定义了协议的要求，但未指定关联类型 `Item` 的具体类型。编译器需要知道 `Container` 具体的 `Item` 类型才能确定返回值的具体类型，但 `Container` 协议并没有提供这些信息。当在泛型函数中使用 `Container` 作为约束时，也会遇到类似的问题。泛型的约束需要在编译时知道具体的类型信息，以便生成正确的代码。假设泛型类型 `C` 需要遵循 `Container` 协议，但 `Container` 的关联类型 `Item` 并未在泛型约束中指定，因此编译器无法确定 `C` 的具体类型。）

```swift
// 错误：具有关联类型的协议不能用作返回类型。
func makeProtocolContainer<T>(item: T) -> Container {
    return [item]
}

// 错误：没有足够的信息来推断 C 的类型。
func makeProtocolContainer<T, C: Container>(item: T) -> C {
    return [item]
}
```

<!--
  - test: `opaque-result-existential-error`

  ```swifttest
  // Error: Protocol with associated types can't be used as a return type.
  -> func makeProtocolContainer<T>(item: T) -> Container {
         return [item]
     }
  ---
  // Error: Not enough information to infer C.
  -> func makeProtocolContainer<T, C: Container>(item: T) -> C {
         return [item]
     }
  !$ error: use of protocol 'Container' as a type must be written 'any Container'
  !! func makeProtocolContainer<T>(item: T) -> Container {
  !!                                           ^~~~~~~~~
  !! any Container
  !$ error: cannot convert return expression of type '[T]' to return type 'C'
  !! return [item]
  !! ^~~~~~
  !! as! C
  ```
-->

使用不透明类型 `some Container` 作为返回类型，可以表达想要的 API 合约 —— 函数返回一个容器，但不指定容器的具体类型：

```swift
func makeOpaqueContainer<T>(item: T) -> some Container {
    return [item]
}
let opaqueContainer = makeOpaqueContainer(item: 12)
let twelve = opaqueContainer[0]
print(type(of: twelve))
// 打印输出 "Int"
```

<!--
  - test: `opaque-result`

  ```swifttest
  -> func makeOpaqueContainer<T>(item: T) -> some Container {
         return [item]
     }
  -> let opaqueContainer = makeOpaqueContainer(item: 12)
  -> let twelve = opaqueContainer[0]
  -> print(type(of: twelve))
  <- Int
  ```
-->

`twelve` 的类型被推断为 `Int`，这说明了类型推断在不透明类型中是能起作用的。在 `makeOpaqueContainer(item:)` 的实现中，不透明容器的底层类型是 `[T]`。在这种情况下，`T` 是 `Int`，所以返回值是一个整数数组，并且关联类型 `Item` 被推断为 `Int`。由于 `Container` 的下标操作（`subscript` 方法）返回 `Item` 类型的值，所以 `twelve` 的类型也被推断为 `Int`。

<!--
  TODO: Expansion for the future

  You can combine the flexibility of returning a value of protocol type
  with the API-boundary enforcement of opaque types
  by using type erasure
  like the Swift standard library uses in the
  `AnySequence <//apple_ref/fake/AnySequence`_ type.

  protocol P { func f() -> Int }

  struct AnyP: P {
      var p: P
      func f() -> Int { return p.f() }
  }

  struct P1 {
      func f() -> Int { return 100 }
  }
  struct P2 {
      func f() -> Int { return 200 }
  }

  func opaque(x: Int) -> some P {
      let result: P
      if x > 100 {
          result = P1()
      }  else {
          result = P2()
      }
      return AnyP(p: result)
  }
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->

