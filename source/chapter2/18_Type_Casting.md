#类型检查（Type Casting）

（ps：为了方便各位检验所以保留了英文，可删。）
  _类型检查_是一种检查类实例的方式，并且哦或者也是让实例作为它的父类或者子类的一种方式。

  _Type casting_ is a way to check the type of an instance, and/or to treat that instance as if it is a different superclass or subclass from somewhere else in its own class hierarchy.

  类型检查在Swift中使用`is` 和 `as`操作符实现。这两个操作符提供了一种简单达意的方式去检查值的类型或者转换它的类型。

  Type casting in Swift is implemented with the `is` and `as` operators. These two operators provide a simple and expressive way to check the type of a value or cast a value to a different type.

  你也可以用来检查一个类是否实现了某个协议，就像在 [Protocols》Checking for Protocol Conformance](Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_363)部分讲述的一样。

  You can also use type casting to check whether a type conforms to a protocol, as described in <span class="x-name">[Checking for Protocol Conformance](Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_363)</span>.
### 定义一个类层次作为例子Defining a Class Hierarchy for Type Casting

  你可以将它用在类和子类的层次结构上，检查特定类实例的类型并且转换这个类实例的类型成为这个层次结构中的其他类型。这下面的三个代码段定义了一个类层次和一个array包含了几个这些类的实例，作为类型检查的例子。

  You can use type casting with a hierarchy of classes and subclasses to check the type of a particular class instance and to cast that instance to another class within the same hierarchy. The three code snippets below define a hierarchy of classes and an array containing instances of those classes, for use in an example of type casting.

  第一个代码片段定义了一个新的基础类`MediaItem`。这个类为任何出现在数字媒体库的项提供基础功能。特别的，它声明了一个 `String` 类型的 `name` 属性，和一个`init name`初始化器。（它假定所有的媒体项都有个名称。）

  The first snippet defines a new base class called `MediaItem`. This class provides basic functionality for any kind of item that appears in a digital media library. Specifically, it declares a `name` property of type `String`, and an `init name` initializer. (It is assumed that all media items, including all movies and songs, will have a name.)

    class MediaItem {
        var name: String
        init(name: String) {
            self.name = name
        }
    }

  下一个代码段定义了 `MediaItem` 的两个子类。第一个子类`Movie`，在父类（或者说基类）的基础上增加了一个 `director`（导演） 属性，和相应的初始化器。第二个类在父类的基础上增加了一个 `artist`（艺术家） 属性，和相应的初始化器：

  The next snippet defines two subclasses of `MediaItem`. The first subclass, `Movie`, encapsulates additional information about a movie or film. It adds a `director` property on top of the base `MediaItem` class, with a corresponding initializer. The second subclass, `Song`, adds an `artist` property and initializer on top of the base class:

    class Movie: MediaItem {
        var director: String
        init(name: String, director: String) {
            self.director = director
            super.init(name: name)
        }
    }

    class Song: MediaItem {
        var artist: String
        init(name: String, artist: String) {
            self.artist = artist
            super.init(name: name)
        }
    }

  最后一个代码段创建了一个array常量 `library` ，包含两个`Movie`实例和三个`Song`实例。`library`的类型是在它被初始化时根据它的array标记符和里面的内容（ps: literal： 标记符其实就是指“[”和“]”，虽然苹果官方的翻译里翻译为字面当总感觉不好理解，有点奇怪。不如翻译为标记符）推断来的。Swift的类型检测器能够演绎出`Movie` 和 `Song` 有共同的父类 `MediaItem` ，所以它推断出 `MediaItem[]` 类作为 `library` 的类型。

  The final snippet creates a constant array called `library`, which contains two `Movie` instances and three `Song` instances. The type of the `library` array is inferred by initializing it with the contents of an array literal. Swift’s type checker is able to deduce that `Movie` and `Song` have a common superclass of `MediaItem`, and so it infers a type of `MediaItem[]` for the `library` array:

    let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
    ]
    // the type of "library" is inferred to be MediaItem[]

  在幕后`library` 里存储的项依然是 `Movie` 和 `Song` 类型的，但是，若你迭代它，取出的实例会是 `MediaItem` 类型的，而不是 `Movie` 和 `Song` 类型的。为了让它们作为它们本来的类型工作，你需要检查它们的类型或者向下转换它们的类型到其它类型，就像下面描述的一样。

  The items stored in `library` are still `Movie` and `Song` instances behind the scenes. However, if you iterate over the contents of this array, the items you receive back are typed as `MediaItem`, and not as `Movie` or `Song`. In order to work with them as their native type, you need to _check_ their type, or _downcast_ them to a different type, as described below.

### 检查类型 Checking Type

  用类型检查操作符(`is`)来检查一个实例是否属于特定子类型。类型检查操作符返回 `true` 若实例属于那个子类型，若不属于返回 `false` 。

  Use the _type check operator_ (`is`) to check whether an instance is of a certain subclass type. The type check operator returns `true` if the instance is of that subclass type and `false` if it is not.

  下面的例子定义了连个变量，`movieCount` 和 `songCount`，用来计算数组`library` 中 `Movie` 和 `Song` 类型的实例数量。

  The example below defines two variables, `movieCount` and `songCount`, which count the number of `Movie` and `Song` instances in the `library` array:

    var movieCount = 0
    var songCount = 0

    for item in library {
        if item is Movie {
            ++movieCount
        } else if item is Song {
            ++songCount
        }
    }

    println("Media library contains \(movieCount) movies and \(songCount) songs")
    // prints "Media library contains 2 movies and 3 songs"

  示例迭代了数组 `library` 中的所有项。每一次， `for`-`in` 循环设置
  `item` 常量的值为数组中的下一个 `MediaItem`。

  This example iterates through all items in the `library` array. On each pass, the `for`-`in` loop sets the `item` constant to the next `MediaItem` in the array.

  若当前 `MediaItem` 是一个 `Movie` 类型的实例， `item is Movie` 返回 `true`，相反返回 `false`。同样的，`item is Song`检查item是否为`Song`类型的实例。在循环末尾，`movieCount` 和 `songCount`的值就是被找到属于各自的类型的实例数量。

  `item is Movie` returns `true` if the current `MediaItem` is a `Movie` instance and `false` if it is not. Similarly, `item is Song` checks whether the item is a `Song` instance. At the end of the `for`-`in` loop, the values of `movieCount` and `songCount` contain a count of how many `MediaItem` instances were found of each type.

### 向下转型（简称下转） Downcasting

  某类型的一个常量或变量可能在幕后实际上属于一个子类。你可以相信，上面就是这种情况。你可以尝试向下转到它的子类型，用类型检查操作符(`as`)

  A constant or variable of a certain class type may actually refer to an instance of a subclass behind the scenes. Where you believe this is the case, you can try to _downcast_ to the subclass type with the _type cast operator_ (`as`).

  因为向下转型可能会失败，类型检查操作符带有两种不同形式。可选形式（ optional form） `as?` 返回一个你试图下转成的类型的可选值（optional value）。强制形式 `as` 把试图向下转型和强制解包（force-unwraps）结果作为一个混合动作。

  Because downcasting can fail, the type cast operator comes in two different forms. The optional form, `as?`, returns an optional value of the type you are trying to downcast to. The forced form, `as`, attempts the downcast and force-unwraps the result as a single compound action.

  当你不确定下转可以成功时，用类型检查的可选形式(`as?`)。可选形式的类型检查总是返回一个可选值（optional value），并且若下转是不可能的，可选值将是 `nil` 。这使你能够检查下转是否成功。

  Use the optional form of the type cast operator (`as?`) when you are not sure if the downcast will succeed. This form of the operator will always return an optional value, and the value will be `nil` if the downcast was not possible. This enables you to check for a successful downcast.

  只有你可以确定下转一定会成功时，才使用强制形式。当你试图下转为一个不正确的类型时，强制形式的类型检查会触发一个runtime error。

  Use the forced form of the type cast operator (`as`) only when you are sure that the downcast will always succeed. This form of the operator will trigger a runtime error if you try to downcast to an incorrect class type.

  下面的例子，迭代了`library`里的每一个 `MediaItem` ，并打印出适当的描述。要这样做，item需要真正作为`Movie` 或 `Song`的类型来使用。不仅仅是作为 `MediaItem`。为了能够使用`Movie` 或 `Song`的 `director` 或 `artist`属性，这是必要的。

  The example below iterates over each `MediaItem` in `library`, and prints an appropriate description for each item. To do this, it needs to access each item as a true `Movie` or `Song`, and not just as a `MediaItem`. This is necessary in order for it to be able to access the `director` or `artist` property of a `Movie` or `Song` for use in the description.

  在这个示例中，数组中的每一个item可能是 `Movie` 或 `Song`。   事前你不知道每个item的真实类型，所以这里使用可选形式的类型检查 (`as?`)去检查循环里的每次下转。

  In this example, each item in the array might be a `Movie`, or it might be a `Song`. You don’t know in advance which actual class to use for each item, and so it is appropriate to use the optional form of the type cast operator (`as?`) to check the downcast each time through the loop:

    for item in library {
        if let movie = item as? Movie {
            println("Movie: '\(movie.name)', dir. \(movie.director)")
        } else if let song = item as? Song {
            println("Song: '\(song.name)', by \(song.artist)")
        }
    }

    // Movie: 'Casablanca', dir. Michael Curtiz
    // Song: 'Blue Suede Shoes', by Elvis Presley
    // Movie: 'Citizen Kane', dir. Orson Welles
    // Song: 'The One And Only', by Chesney Hawkes
    // Song: 'Never Gonna Give You Up', by Rick Astley

  示例首先试图将 `item` 下转为 `Movie`。因为 `item` 是一个 `MediaItem` 类型的实例，它可能是一个`Movie`；同样，它可能是一个 `Song`，或者仅仅是基类 `MediaItem`。因为不确定，`as?`形式试图下转时返还一个可选值。 `item as Movie` 的返回值是`Movie?`类型或 “optional `Movie`”。

  The example starts by trying to downcast the current `item` as a `Movie`. Because `item` is a `MediaItem` instance, it’s possible that it _might_ be a `Movie`; equally, it’s also possible that it might a `Song`, or even just a base `MediaItem`. Because of this uncertainty, the `as?` form of the type cast operator returns an _optional_ value when attempting to downcast to a subclass type. The result of `item as Movie` is of type `Movie?`, or “optional `Movie`”.

  当应用在两个`Song`实例时，下转为 `Movie` 失败。为了处理这种情况，上面的实例使用了可选绑定（optional binding）来检查optional `Movie`真的包含一个值（这个是为了判断下转是否成功。）可选绑定是这样写的“`if let movie = item as? Movie`”,可以这样解读：

  Downcasting to `Movie` fails when applied to the two `Song` instances in the library array. To cope with this, the example above uses optional binding to check whether the optional `Movie` actually contains a value (that is, to find out whether the downcast succeeded.) This optional binding is written “`if let movie = item as? Movie`”, which can be read as:

  “尝试将 `item` 转为 `Movie`类型。若成功，设置一个新的临时常量 `movie`  来存储返回的optional `Movie`”

  “Try to access `item` as a `Movie`. If this is successful, set a new temporary constant called `movie` to the value stored in the returned optional `Movie`.”

  若下转成功，然后`movie`的属性将用于打印一个`Movie`实例的描述，包括它的导演的名字`director`。当`Song`被找到时，一个相近的原理被用来检测 `Song` 实例和打印它的描述。

  If the downcasting succeeds, the properties of `movie` are then used to print a description for that `Movie` instance, including the name of its `director`. A similar principle is used to check for `Song` instances, and to print an appropriate description (including `artist` name) whenever a `Song` is found in the library.

    注意

    转换没有真的改变实例或它的值。潜在的根本的实例保持不变；只是简单地把它作为它被转换成的类来使用。

    NOTE

    Casting does not actually modify the instance or change its values. The underlying instance remains the same; it is simply treated and accessed as an instance of the type to which it has been cast.

### Any和AnyObject的转换 Type Casting for Any and AnyObject

  Swift为不确定类型提供了两种特殊类型别名：

  *   `AnyObject`可以代表任何class类型的实例。

  *   `Any`可以表示任何类型，除了方法类型（function types）。

  Swift provides two special type aliases for working with non-specific types:

*   `AnyObject` can represent an instance of any class type.
*   `Any` can represent an instance of any type at all, apart from function types.

        注意

        只有当你明确的需要它的行为和功能时才使用Any和AnyObject。在你的代码里使用你期望的明确的类型总是更好的。

        NOTE

        Use Any and AnyObject only when you explicitly need the behavior and capabilities they provide. It is always better to be specific about the types you expect to work with in your code.


### AnyObject类型

  当需要在工作中使用Cocoa APIs，它一般接收一个`AnyObject[]`类型的数组，或者说“一个任何对象类型的数组”。这是因为OC没有明确的类型化数组。但是，你常常可以确定包含在仅从你知道的API信息提供的这样一个数组中的对象的类型。

  When working with Cocoa APIs, it is common to receive an array with a type of `AnyObject[]`, or “an array of values of any object type”. This is because Objective-C does not have explicitly typed arrays. However, you can often be confident about the type of objects contained in such an array just from the information you know about the API that provided the array.

  在这些情况下，你可以使用强制形式的类型检查(`as`)来下转在数组中的每一项到比 `AnyObject` 更明确的类型，不需要可选解包（optional unwrapping）。

  In these situations, you can use the forced version of the type cast operator (`as`) to downcast each item in the array to a more specific class type than `AnyObject`, without the need for optional unwrapping.

  下面的示例定义了一个 `AnyObject[]` 类型的数组并填入三个`Movie`类型的实例：

  The example below defines an array of type `AnyObject[]` and populates this array with three instances of the `Movie` class:

    let someObjects: AnyObject[] = [
        Movie(name: "2001: A Space Odyssey", director: "Stanley Kubrick"),
        Movie(name: "Moon", director: "Duncan Jones"),
        Movie(name: "Alien", director: "Ridley Scott")
    ]

  因为知道这个数组只包含 `Movie` 实例，你可以直接用(`as`)下转并解包到不可选的`Movie`类型（ps：其实就是我们常用的正常类型，这里是为了和可选类型相对比）。

  Because this array is known to contain only `Movie` instances, you can downcast and unwrap directly to a non-optional `Movie` with the forced version of the type cast operator (`as`):

    for object in someObjects {
        let movie = object as Movie
        println("Movie: '\(movie.name)', dir. \(movie.director)")
    }
    // Movie: '2001: A Space Odyssey', dir. Stanley Kubrick
    // Movie: 'Moon', dir. Duncan Jones
    // Movie: 'Alien', dir. Ridley Scott

  为了变为一个更短的形式，下转`someObjects`类型成功 `Movie[]` 类型代替下转每一项。

  For an even shorter form of this loop, downcast the `someObjects` array to a type of `Movie[]` instead of downcasting each item:

    for movie in someObjects as Movie[] {
        println("Movie: '\(movie.name)', dir. \(movie.director)")
    }
    // Movie: '2001: A Space Odyssey', dir. Stanley Kubrick
    // Movie: 'Moon', dir. Duncan Jones
    // Movie: 'Alien', dir. Ridley Scott

### Any类型

  这里有个示例，使用 `Any` 类型来和混合的不同类型一起工作，包括非class类型。它创建了一个可以存储`Any`类型的数组 `things`。

  Here’s an example of using `Any` to work with a mix of different types, including non-class types. The example creates an array called `things`, which can store values of type `Any`:

    var things = Any[]()

    things.append(0)
    things.append(0.0)
    things.append(42)
    things.append(3.14159)
    things.append("hello")
    things.append((3.0, 5.0))
    things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))

  `things` 数组包含两个 `Int` 值，2个 `Double` 值，1个 `String` 值，一个元组 `(Double, Double)` ，Ivan Reitman导演的电影“Ghostbusters”。

  The `things` array contains two `Int` values, two `Double` values, a `String` value, a tuple of type `(Double, Double)`, and the movie “Ghostbusters”, directed by Ivan Reitman.

  你可以在 `switch` `cases`里用`is` 和 `as` 操作符来发觉只知道是 `Any` 或 `AnyObject`的常量或变量的类型。 下面的示例迭代 `things`数组中的每一项的并用`switch`语句查找每一项的类型。这几种`switch`语句的情形绑定它们匹配的值到一个规定类型的常量，让它们可以打印它们的值：

  You can use the `is` and `as` operators in a `switch` statement’s cases to discover the specific type of a constant or variable that is known only to be of type `Any` or `AnyObject`. The example below iterates over the items in the `things` array and queries the type of each item with a `switch` statement. Several of the `switch` statement’s cases bind their matched value to a constant of the specified type to enable its value to be printed:

    for thing in things {
        switch thing {
        case 0 as Int:
            println("zero as an Int")
        case 0 as Double:
            println("zero as a Double")
        case let someInt as Int:
            println("an integer value of \(someInt)")
        case let someDouble as Double where someDouble > 0:
            println("a positive double value of \(someDouble)")
        case is Double:
            println("some other double value that I don't want to print")
        case let someString as String:
            println("a string value of \"\(someString)\"")
        case let (x, y) as (Double, Double):
            println("an (x, y) point at \(x), \(y)")
        case let movie as Movie:
            println("a movie called '\(movie.name)', dir. \(movie.director)")
        default:
            println("something else")
        }
    }

    // zero as an Int
    // zero as a Double
    // an integer value of 42
    // a positive double value of 3.14159
    // a string value of "hello"
    // an (x, y) point at 3.0, 5.0
    // a movie called 'Ghostbusters', dir. Ivan Reitman
。

    注意

    在一个switch语句的case中使用强制形式的类型检查操作符(as, 而不是 as?) 来检查和转换到一个规定的类型。在switch case 语句的内容中这种检查总是安全的。

    NOTE

    The cases of a switch statement use the forced version of the type cast operator (as, not as?) to check and cast to a specific type. This check is always safe within the context of a switch case statement.
