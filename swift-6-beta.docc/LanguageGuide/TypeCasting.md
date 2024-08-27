# 类型转换

确定一个值的运行时类型，并为其提供更具体的类型信息。

*类型转换*是一种检查实例类型，
或将该实例视为其类层次结构中不同父类或子类的方法。

Swift 中的类型转换是通过 `is` 和 `as` 操作符实现的。
这两个操作符为值的类型检查或类型转换提供了一种简单而富有表现力的方法。

你还可以使用类型转换来检查类型是否遵循协议，
如 <doc:Protocols#Checking-for-Protocol-Conformance> 中所述。

## 为类型转换定义类层次结构

你可以使用类型转换在类和子类的层次结构中检查某个类实例的类型，
并将该实例转换为同一层次结构中的另一个类。
下面的三个代码片段定义了一个类层次结构和一个包含这些类的实例的数组，
作为类型转换示例。

第一个代码片段定义了一个名为 `MediaItem` 的新基类。
该类为数字媒体库中出现的任何类型项目提供基本功能。
具体来说，它声明了一个字符串类型的 `name` 属性和一个 `init(name:)` 初始化器。
（假设所有媒体项目，包括所有电影和歌曲，都有一个名称。）

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

<!--
  - test: `typeCasting, typeCasting-err`

  ```swifttest
  -> class MediaItem {
        var name: String
        init(name: String) {
           self.name = name
        }
     }
  ```
-->

下一个代码段定义了 `MediaItem` 的两个子类。
第一个子类 `Movie` 封装了电影或影片的附加信息。
它在基础 `MediaItem` 类的基础上添加了一个 `director` 属性和一个相应的初始化器。
第二个子类 `Song` 在基类的基础上添加了 `artist` 属性和初始化器：

```swift
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
```

<!--
  - test: `typeCasting, typeCasting-err`

  ```swifttest
  -> class Movie: MediaItem {
        var director: String
        init(name: String, director: String) {
           self.director = director
           super.init(name: name)
        }
     }
  ---
  -> class Song: MediaItem {
        var artist: String
        init(name: String, artist: String) {
           self.artist = artist
           super.init(name: name)
        }
     }
  ```
-->

最后一个代码段创建了一个名为 `library` 的常量数组，
其中包含两个 `Movie` 实例和三个 `Song` 实例。
`library` 数组的类型是通过使用数组字面值初始化来推断的。
Swift 的类型检查程序能够推断出 `Movie` 和 `Song` 有一个共同的父类 `MediaItem`，
因此推断出 library 数组的类型为 `[MediaItem]`：

```swift
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]
// "library" 的类型被推断为 [MediaItem]
```

<!--
  - test: `typeCasting`

  ```swifttest
  -> let library = [
        Movie(name: "Casablanca", director: "Michael Curtiz"),
        Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
        Movie(name: "Citizen Kane", director: "Orson Welles"),
        Song(name: "The One And Only", artist: "Chesney Hawkes"),
        Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
     ]
  >> print(type(of: library))
  << Array<MediaItem>
  // the type of "library" is inferred to be [MediaItem]
  ```
-->

`library` 中存储的项目在幕后仍然是 `Movie` 和 `Song` 实例。
但是，如果遍历该数组的内容，返回的项目类型是 `MediaItem`，
而不是 `Movie` 或 `Song`。
为了以原始类型处理它们，
你需要*检查*它们的类型，
或将它们*向下转型*为不同的类型，
如下文所述。

## 检查类型

使用*类型检查操作符* (`is`) 来检查实例是否属于某个子类类型。
如果实例属于该子类类型，则类型检查操作符返回 `true`；
如果不属于该子类类型，则返回 `false`。

下面的示例定义了两个变量：
`movieCount` 和 `songCount`，
用于计算 `library` 数组中 `Movie` 和 `Song` 实例的数量：

```swift
var movieCount = 0
var songCount = 0

for item in library {
    if item is Movie {
        movieCount += 1
    } else if item is Song {
        songCount += 1
    }
}

print("Media library contains \(movieCount) movies and \(songCount) songs")
// 打印 "Media library contains 2 movies and 3 songs"
```

<!--
  - test: `typeCasting`

  ```swifttest
  -> var movieCount = 0
  -> var songCount = 0
  ---
  -> for item in library {
        if item is Movie {
           movieCount += 1
        } else if item is Song {
           songCount += 1
        }
     }
  ---
  -> print("Media library contains \(movieCount) movies and \(songCount) songs")
  <- Media library contains 2 movies and 3 songs
  ```
-->

此示例遍历 `library` 数组中的所有项目。
每次遍历时，`for`-`in` 循环都会将 `item` 常量设置为数组中的下一个 `MediaItem`。

如果当前的 `MediaItem` 是 `Movie` 实例，`item is Movie` 返回 `true`；
如果不是，则返回 `false`。
同理，`item is Song` 会检查项目是否为 `Song` 实例。
当 `for`-`in` 循环结束时，
`movieCount` 和 `songCount` 的值包含了找到的每种类型的 `MediaItem` 实例的数量。

## 向下转型

某个类常量或变量实际上可能在幕后指向子类的实例。
如果你认为情况确实如此，可以尝试使用*类型转换操作符*（`as?` 或 `as!`）来*向下转型*为子类类型。

由于向下转型可能失败，类型转换操作符有两种不同的形式。
条件形式，即 `as?`，会返回一个与你尝试向下转型的类型相同的可选值。
强制形式，即 `as!`，会执行尝试向下转型并将结果强制解包的复合操作。

如果不确定向下转型能否成功，请使用类型转换操作符的条件形式（`as?`）。
这种形式的操作符将始终返回一个可选值，如果向下转型不成功，该值将为 `nil`。
这样，你就可以检查是否成功进行了向下转型。

只有在确定向下转型一定会成功时，才使用类型转换操作符的强制形式（`as!`）。
如果尝试向下转型到一个不正确的类类型，这种形式的操作符会触发运行时错误。

下面的示例遍历 `library` 中的每个 `MediaItem`，并为每个项目打印适当的描述。
为此，它需要将每个项目作为真正的 `Movie` 或 `Song`来访问，而不仅仅是作为一个 `MediaItem`。
因为只有这样才能访问 `Movie` 的 `director` 或 `Song` 的 `artist` 属性，并在描述中使用。

在本例中，数组中的每个项目可能是一部 `Movie`，也可能是一首 `Song`。
我们事先并不知道要将哪个项转换成哪个类，因此这里较为恰当的做法，是使用类型转换操作符的条件形式（`as?`）在循环中进行向下转型。

```swift
for item in library {
    if let movie = item as? Movie {
        print("Movie: \(movie.name), dir. \(movie.director)")
    } else if let song = item as? Song {
        print("Song: \(song.name), by \(song.artist)")
    }
}

// Movie: Casablanca, dir. Michael Curtiz
// Song: Blue Suede Shoes, by Elvis Presley
// Movie: Citizen Kane, dir. Orson Welles
// Song: The One And Only, by Chesney Hawkes
// Song: Never Gonna Give You Up, by Rick Astley
```

<!--
  - test: `typeCasting`

  ```swifttest
  -> for item in library {
        if let movie = item as? Movie {
           print("Movie: \(movie.name), dir. \(movie.director)")
        } else if let song = item as? Song {
           print("Song: \(song.name), by \(song.artist)")
        }
     }
  ---
  </ Movie: Casablanca, dir. Michael Curtiz
  </ Song: Blue Suede Shoes, by Elvis Presley
  </ Movie: Citizen Kane, dir. Orson Welles
  </ Song: The One And Only, by Chesney Hawkes
  </ Song: Never Gonna Give You Up, by Rick Astley
  ```
-->

该示例首先尝试将当前 `item` 向下转型为 `Movie`。
由于 `item` 是一个 `MediaItem` 实例，它有*可能*是一部 `Movie`；
同样，它也有可能是一首 `Song`，或者只是一个基本的 `MediaItem`。
由于这种不确定性，当尝试向下转型到子类类型时，类型转换运算符的 `as?` 形式会返回一个*可选*值。
`item as? Movie` 的结果是 `Movie?`（“可选 `Movie`”）类型。

当应用到库数组中的 `Song` 实例时，向下转型为 `Movie` 会失败。
为了解决这个问题，上面的示例使用了可选绑定来检查可选 `Movie` 是否实际包含一个值（也就是说，找出向下转型是否成功。）
这里的可选绑定写作“`if let movie = item as? Movie`”，可以理解为

“尝试将 `item` 作为 `Movie` 访问。
如果成功，则将名为 `movie` 的新临时常量设置为存储在返回的可选 `Movie` 中的值。”

如果向下转型成功，`movie` 的属性将用于打印该 `Movie` 实例的说明，包括其导演的姓名。
类似的原理也用于检查 `Song` 实例，并在库中找到歌曲时打印适当的描述（包括艺术家姓名）。

> 注意: 类型转换并不修改实例或更改其值。
> 底层的实例保持不变，它们只是被作为转换后的类型实例来处理和访问。

<!--
  TODO: This example should be followed by the same example written with switch,
  to introduce type casting in a pattern matching context
  and to set up the crazy Any example at the end of the chapter.
-->

<!--
  TODO: No section on upcasting because nobody can come up with
  an example that isn't excessively contrived.
  The reference shows the behavior in a contrived example.
-->

## Any 和 AnyObject 的类型转换

Swift 为处理非特定类型提供了两种特殊类型：

- `Any` 可以表示任何类型的实例，包括函数类型。
- `AnyObject` 可以表示任何类类型的实例。

只有在明确需要它们提供的行为和功能时，才使用 `Any` 和 `AnyObject`。
在代码中最好明确指定你希望使用的类型。

下面是一个使用 `Any` 处理不同类型（包括函数类型和非类类型）的示例。
该示例创建了一个名为 `things` 的数组，可以存储 `Any` 类型的值：

```swift
var things: [Any] = []

things.append(0)
things.append(0.0)
things.append(42)
things.append(3.14159)
things.append("hello")
things.append((3.0, 5.0))
things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))
things.append({ (name: String) -> String in "Hello, \(name)" })
```

<!--
  - test: `typeCasting, typeCasting-err`

  ```swifttest
  -> var things: [Any] = []
  ---
  -> things.append(0)
  -> things.append(0.0)
  -> things.append(42)
  -> things.append(3.14159)
  -> things.append("hello")
  -> things.append((3.0, 5.0))
  -> things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))
  -> things.append({ (name: String) -> String in "Hello, \(name)" })
  ```
-->

`things` 数组包含两个 `Int` 值、两个 `Double` 值、一个 `String` 值、一个类型为 `(Double, Double)` 的元组、电影 “捉鬼敢死队”，
以及一个接收字符串值并返回另一个字符串值的闭包表达式。


如果常量或变量的已知类型是 `Any` 或 `AnyObject`，要确定其具体类型，可以在 switch 语句的情况下使用 `is` 或 `as` 模式。
下面的示例遍历了 `things` 数组中的项目，并使用 `switch` 语句查询了每个项目的类型。
该 `switch` 语句的一些情况将其匹配值与指定类型的常量绑定，以便打印其值：

```swift
for thing in things {
    switch thing {
    case 0 as Int:
        print("zero as an Int")
    case 0 as Double:
        print("zero as a Double")
    case let someInt as Int:
        print("an integer value of \(someInt)")
    case let someDouble as Double where someDouble > 0:
        print("a positive double value of \(someDouble)")
    case is Double:
        print("some other double value that I don't want to print")
    case let someString as String:
        print("a string value of \"\(someString)\"")
    case let (x, y) as (Double, Double):
        print("an (x, y) point at \(x), \(y)")
    case let movie as Movie:
        print("a movie called \(movie.name), dir. \(movie.director)")
    case let stringConverter as (String) -> String:
        print(stringConverter("Michael"))
    default:
        print("something else")
    }
}

// zero as an Int
// zero as a Double
// an integer value of 42
// a positive double value of 3.14159
// a string value of "hello"
// an (x, y) point at 3.0, 5.0
// a movie called Ghostbusters, dir. Ivan Reitman
// Hello, Michael
```

<!--
  - test: `typeCasting`

  ```swifttest
  -> for thing in things {
        switch thing {
           case 0 as Int:
              print("zero as an Int")
           case 0 as Double:
              print("zero as a Double")
           case let someInt as Int:
              print("an integer value of \(someInt)")
           case let someDouble as Double where someDouble > 0:
              print("a positive double value of \(someDouble)")
           case is Double:
              print("some other double value that I don't want to print")
           case let someString as String:
              print("a string value of \"\(someString)\"")
           case let (x, y) as (Double, Double):
              print("an (x, y) point at \(x), \(y)")
           case let movie as Movie:
              print("a movie called \(movie.name), dir. \(movie.director)")
           case let stringConverter as (String) -> String:
              print(stringConverter("Michael"))
           default:
              print("something else")
        }
     }
  ---
  </ zero as an Int
  </ zero as a Double
  </ an integer value of 42
  </ a positive double value of 3.14159
  </ a string value of "hello"
  </ an (x, y) point at 3.0, 5.0
  </ a movie called Ghostbusters, dir. Ivan Reitman
  </ Hello, Michael
  ```
-->

> 注意: `Any` 类型代表任何类型的值，包括可选类型。
> 如果你使用的是可选值，而预期值是 `Any` 类型，Swift 会发出警告。
> 如果您确实需要将可选值用作 `Any` 值，可以使用 `as` 操作符显式地将可选值转换为 `Any` 值，如下所示。
>
> ```swift
> let optionalNumber: Int? = 3
> things.append(optionalNumber)        // 会警告
> things.append(optionalNumber as Any) // 不会警告
> ```

<!--
  - test: `typeCasting-err`

  ```swifttest
  -> let optionalNumber: Int? = 3
  -> things.append(optionalNumber)        // Warning
  !$ warning: expression implicitly coerced from 'Int?' to 'Any'
  !! things.append(optionalNumber)        // Warning
  !!               ^~~~~~~~~~~~~~
  !$ note: provide a default value to avoid this warning
  !! things.append(optionalNumber)        // Warning
  !!               ^~~~~~~~~~~~~~
  !!                              ?? <#default value#>
  !$ note: force-unwrap the value to avoid this warning
  !! things.append(optionalNumber)        // Warning
  !!               ^~~~~~~~~~~~~~
  !!                              !
  !$ note: explicitly cast to 'Any' with 'as Any' to silence this warning
  !! things.append(optionalNumber)        // Warning
  !!               ^~~~~~~~~~~~~~
  !!                              as Any
  -> things.append(optionalNumber as Any) // No warning
  ```
-->

<!--
  Rejected examples to illustrate AnyObject:

  Array of delegates which may conform to one or more of the class's delegate protocols.

  ```
  protocol MovieDelegate {
      func willPlay(movie: Movie)
  }

  class Library {
      var delegates = [AnyObject]
      ...
  }

  for delegate in delegates {
      guard let delegate = delegate as MovieDelegate else { continue }
      delegate.willPlay(movie: m)
  }
  ```

  A userData object for associating some opaque piece of data or state with an API call.

  ```
  class C {
      // Not userInfo -- that's usually a Dictionary
      let userData: AnyObject?  // In Cocoa APIs, userData is a void*
  }
  ```
-->

> 测试版软件: 
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实施的软件应使用最终操作系统软件进行测试。
>
> 了解有关使用 [Apple 测试版软件](https://developer.apple.com/support/beta-software/) 的更多信息。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
