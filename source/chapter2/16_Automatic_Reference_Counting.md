# 自动引用计数

本页包含内容：

-   自动引用计数的工作机制
-   自动引用计数实践
-   类实例间的强引用环
-   类实例间的强引用环分解
-   闭包的强引用环
-   闭包的强引用环分解

Swift使用自动引用计数(ARC)这一机制来跟踪和管理你的应用程序的内存。通常情况下，Swift的内存管理机制会一直起着作用，你无须自己来考虑内存的管理。ARC会在类的实例不再被使用时，自动释放其占用的内存。

然而，在少数情况下，ARC为了能帮助你管理内存，需要更多的关于你的代码之间关系的信息。本章描述了这些情况，并且为你示范怎样启用ARC来管理你的应用程序的内存。

> 注意: 引用计数仅仅应用于类的实例。结构体和枚举类型是值类型，不是引用类型，也不是通过引用的方式存储和传递。

## 自动引用计数的工作机制

当你每次创建一个类的新的实例的时候，ARC会分配一大块内存用来储存实例的信息。内存中会包含实例的类型信息，以及这个实例所有相关属性的值。此外，当实例不再被使用时，ARC释放实例所占用的内存，并让释放的内存能挪作他用。这确保了不再被使用的实例，不会一直占用内存空间。

然而，当ARC收回和释放了正在被使用中的实例，该实例的属性和方法将不能再被访问和调用。实际上，如果你试图访问这个实例，你的应用程序很可能会崩溃。

为了确保使用中的实例不会被销毁，ARC会跟踪和计算每一个实例正在被多少属性，常量和变量所引用。哪怕实例的引用数为一，ARC都不会销毁这个实例。

为了使之成为可能，无论你将实例赋值给属性，常量或者是变量，属性，常量或者变量，都会对此实例创建强引用。之所以称之为强引用，是因为它会将实例牢牢的保持住，只要强引用还在，实例是不允许被销毁的。

## 自动引用计数实战

下面的例子展示了自动引用计数的工作机制。例子以一个简单的Person类开始，并定义了一个叫name的常量属性：

		class Person {
    		let name: String

				init(name: String) {
        		self.name = name
        		println("\(name) is being initialized")
    		}
    		
				deinit {
        		println("\(name) is being deinitialized")
    		}
		}

Person类有一个构造函数，此构造函数为实例的name属性赋值并打印出信息，以表明初始化过程生效。Person类同时也拥有析构函数，同样会在实例被销毁的时候打印出信息。

接下来的代码片段定义了三个类型为Person?的变量，用来按照代码片段中的顺序，为新的Person实例建立多个引用。由于这些变量是被定义为可选类型(Person?，而不是Person)，它们的值会被自动初始化为nil，目前还不会引用到Person类的实例。

		var reference1: Person?
		var reference2: Person?
		var reference3: Person?

现在你可以创建Person类的新实例，并且将它赋值给三个变量其中的一个：

		reference1 = Person(name: "John Appleseed")
		// prints "John Appleseed is being initialized”

应当注意到当你调用Person类的构造函数的时候，"John Appleseed is being initialized”会被打印出来。由此可以确定构造函数被执行。

由于Person类的新实例被赋值给了reference1变量，所以reference1到Person类的新实例之间建立了一个强引用。正是因为这个强引用，ARC会保证Person实例被保持在内存中不被销毁。

如果你将同样的Person实例也赋值给其他两个变量，该实例又会多出两个强引用：

		reference2 = reference1
		reference3 = reference1

现在这个Person实例已经有三个强引用了。

如果你通过给两个变量赋值nil的方式断开两个强引用(包括最先的那个强引用），只留下一个强引用，Person实例不会被销毁：

    reference2 = reference1
    reference3 = reference1

ARC会在第三个，也即最后一个强引用被断开的时候，销毁Person实例，这也意味着你不再使用这个Person实例：

    reference3 = nil
    // prints "John Appleseed is being deinitialized"
    
## 类实例之间的循环强引用

在上面的例子中，ARC会跟踪你所新创建的Person实例的引用数量，并且会在Person实例不再被需要时销毁它。

然而，我们可能会写出这样的代码，一个类永远不会有0个强引用。这种情况发生在两个类实例互相保持对方的强引用，并让对方不被销毁。这就是所谓的循环强引用。

你可以通过定义类之间的关系为弱引用或者无主引用，以此替代强引用，从而解决循环强引用的问题。具体的过程在[解决类实例之间的循环强引用](http://numbbbbb.github.io/the-swift-programming-language-in-chinese/chapter2/16_Automatic_Reference_Counting.html#1)中有描述。不管怎样，在你学习怎样解决循环强引用之前，很有必要了解一下它是怎样产生的。

下面展示了一个不经意产生循环强引用的例子。例子定义了两个类：Person和Apartment，用来建模公寓和它其中的居民:

    class Person {
        let name: String
        init(name: String) { self.name = name }
        var apartment: Apartment?
        deinit { println("\(name) is being deinitialized") }
    }
 
    class Apartment {
        let number: Int
        init(number: Int) { self.number = number }
        var tenant: Person?
        deinit { println("Apartment #\(number) is being deinitialized") }
    }

每一个Person实例有一个类型为String，名字为name的属性，并有一个可选的初始化为nil的apartment属性。apartment属性是可选的，因为一个人并不总是拥有公寓。

类似的，每个Apartment实例有一个叫number，类型为Int的属性，并有一个可选的初始化为nil的tenant属性。tenant属性是可选的，因为一栋公寓并不总是有居民。

这两个类都定义了析构函数，用以在类实例被析构的时候输出信息。这让你能够知晓Person和Apartment的实例是否像预期的那样被销毁。

接下来的代码片段定义了两个可选类型的变量john和number73,并分别被设定为下面的Apartment和Person的实例。这两个变量都被初始化为nil，并为可选的：

    var john: Person?
    var number73: Apartment?

现在你可以创建特定的Person和Apartment实例并将类实例赋值给john和number73变量：

    john = Person(name: "John Appleseed")
    number73 = Apartment(number: 73)
    
在两个实例被创建和赋值后，下图表面了强引用的关系。变量john现在有一个指向Person实例的强引用，而变量number73有一个指向Apartment实例的强引用：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle01_2x.png)

现在你能够将这两个实例关联在一起，这样人就能有公寓住了，而公寓也有了房客。注意感叹号是用来展开和访问可选变量john和number73中的实例，这样实例的属性才能被赋值：

    john!.apartment = number73
    number73!.tenant = john
    
在将两个实例联系在一起之后，强引用的关系如图所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle02_2x.png)

不幸的是，将这两个实例关联在一起之后，一个循环强引用被创建了。Person实例现在有了一个指向Apartment实例的强引用，而Apartment实例也有了一个指向Person实例的强引用。因此，当你断开john和number73变量所持有的强引用时，引用计数并不会降为0，实例也不会被ARC销毁：

    john = nil
    number73 = nil
    
注意，当你把这两个变量设为nil时，没有任何一个析构函数被调用。强引用循环阻止了Person和Apartment类实例的销毁，并在你的应用程序中造成了内存泄漏。

在你将john和number73赋值为nil后，强引用关系如下图：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle03_2x.png)

Person和Apartment实例之间的强引用关系保留了下来并且不会被断开。

##解决实例之间的循环强引用

Swift提供了两种办法用来解决你在使用类的属性时所遇到的循环强引用问题：弱引用(weak reference)和无主引用(unowned reference)。

弱引用和无主引用允许循环引用中的一个实例引用另外一个实例而不保持强引用。这样实例能够互相引用而不产生循环强引用。

对于生命周期中会变为nil的实例使用弱引用。相反的，对于初始化赋值后再也不会被赋值为nil的实例，使用无主引用。

## 弱引用

弱引用不会牢牢保持住引用的实例，并且不会阻止ARC销毁被引用的实例。这种行为阻止了引用变为循环强引用。声明属性或者变量时，在前面加上weak关键字表明这是一个弱引用。

在实例的生命周期中，如果某些时候引用没有值，那么弱引用可以阻止循环强引用。如果引用总是有值，则可以使用无主引用，在[无主引用](http://numbbbbb.github.io/the-swift-programming-language-in-chinese/chapter2/16_Automatic_Reference_Counting.html#2)中有描述。在上面Apartment的例子中，一个公寓的生命周期中，有时是没有“居民”的，因此适合使用弱引用来解决循环强引用。

> 注意: 弱引用必须被声明为变量，表明其值能在运行时被修改。弱引用不能被声明为常量。

因为弱引用可以没有值，你必须将每一个弱引用声明为可选类型。可选类型是在Swift语言中推荐的用来表示可能没有值的类型。

因为弱引用不会保持所引用的实例，即使引用存在，实例也有可能被销毁。因此，ARC会在引用的实例被销毁后自动将其赋值为nil。你可以像其他可选值一样，检查弱引用的值是否存在，你永远也不会遇到被销毁了而不存在的实例。

下面的例子跟上面Person和Apartment的例子一致，但是有一个重要的区别。这一次，Apartment的tenant属性被声明为弱引用：

    class Person {
        let name: String
        init(name: String) { self.name = name }
        var apartment: Apartment?
        deinit { println("\(name) is being deinitialized") }
    }
 
    class Apartment {
        let number: Int
        init(number: Int) { self.number = number }
        weak var tenant: Person?
        deinit { println("Apartment #\(number) is being deinitialized") }
    }
    
然后跟之前一样，建立两个变量(john和number73)之间的强引用，并关联两个实例：

    var john: Person?
    var number73: Apartment?
 
    john = Person(name: "John Appleseed")
    number73 = Apartment(number: 73)
 
    john!.apartment = number73
    number73!.tenant = john
    
现在，两个关联在一起的实例的引用关系如下图所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference01_2x.png)

Person实例依然保持对Apartment实例的强引用，但是Apartment实例只是对Person实例的弱引用。这意味着当你断开john变量所保持的强引用时，再也没有指向Person实例的强引用了：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference02_2x.png)

由于再也没有指向Person实例的强引用，该实例会被销毁：

    john = nil
    // prints "John Appleseed is being deinitialized"
    
唯一剩下的指向Apartment实例的强引用来自于变量number73。如果你断开这个强引用，再也没有指向Apartment实例的强引用了：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference03_2x.png)

由于再也没有指向Apartment实例的强引用，该实例也会被销毁：

    number73 = nil
    // prints "Apartment #73 is being deinitialized"
    
上面的两段代码展示了变量john和number73在被赋值为nil后，Person实例和Apartment实例的析构函数都打印出“销毁”的信息。这证明了引用循环被打破了。

##无主引用

和弱引用类似，无主引用不会牢牢保持住引用的实例。和弱引用不同的是，无主引用是永远有值的。因此，无主引用总是被定义为非可选类型(non-optional type)。你可以在声明属性或者变量时，在前面加上关键字unowned表示这是一个无主引用。

由于无主引用是非可选类型，你不需要在使用它的时候将它展开。无主引用总是可以被直接访问。不过ARC无法在实例被销毁后将无主引用设为nil，因为非可选类型的变量不允许被赋值为nil。

> 注意: 如果你试图在实例被销毁后，访问该实例的无主引用，会触发运行时错误。使用无主引用，你必须确保引用始终指向一个未销毁的实例。

> 还需要注意的是如果你试图访问实例已经被销毁的无主引用，程序会直接崩溃，而不会发生无法预期的行为。所以你应当避免这样的事情发生。

下面的例子定义了两个类，Customer和CreditCard，模拟了银行客户和客户的信用卡。这两个类中，每一个都将另外一个类的实例作为自身的属性。这种关系会潜在的创造循环强引用。

Customer和CreditCard之间的关系与前面弱引用例子中Apartment和Person的关系截然不同。在这个数据模型中，一个客户可能有或者没有信用卡，但是一张信用卡总是关联着一个客户。为了表示这种关系，Customer类有一个可选类型的card属性，但是CreditCard类有一个非可选类型的customer属性。

此外，只能通过将一个number值和customer实例传递给CreditCard构造函数的方式来创建CreditCard实例。这样可以确保当创建CreditCard实例时总是有一个customer实例与之关联。

由于信用卡总是关联着一个客户，因此将customer属性定义为无主引用，用以避免循环强引用：

    class Customer {
        let name: String
        var card: CreditCard?
        init(name: String) {
            self.name = name
        }
        deinit { println("\(name) is being deinitialized") }
    }
    
    class CreditCard {
        let number: Int
        unowned let customer: Customer
        init(number: Int, customer: Customer) {
            self.number = number
            self.customer = customer
        }
        deinit { println("Card #\(number) is being deinitialized") }
    }

下面的代码片段定义了一个叫john的可选类型Customer变量，用来保存某个特定客户的引用。由于是可选类型，所以变量被初始化为nil。

    var john: Customer?
    
现在你可以创建Customer类的实例，用它初始化CreditCard实例，并将新创建的CreditCard实例赋值为客户的card属性。

    john = Customer(name: "John Appleseed")
    john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
    
在你关联两个实例后，他们的引用关系如下图所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/unownedReference01_2x.png)

Customer实例持有对CreditCard实例的强引用，而CreditCard实例持有对Customer实例的无主引用。

由于customer的无主引用，当你断开john变量持有的强引用时，再也没有指向Customer实例的强引用了：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/unownedReference02_2x.png)

由于再也没有指向Customer实例的强引用，该实例被销毁了。其后，再也没有指向CreditCard实例的强引用，该实例也随之被销毁了：

    john = nil
    // prints "John Appleseed is being deinitialized"
    // prints "Card #1234567890123456 is being deinitialized"
    
最后的代码展示了在john变量被设为nil后Customer实例和CreditCard实例的构造函数都打印出了“销毁”的信息。

##无主引用以及显式展开的可选属性

上面弱引用和无主引用的例子涵盖了两种常用的需要打破循环强引用的场景。

Person和Apartment的例子展示了两个属性的值都允许为nil，并会潜在的产生循环强引用。这种场景最适合用弱引用来解决。

Customer和CreditCard的例子展示了一个属性的值允许为nil，而另一个属性的值不允许为nil，并会潜在的产生循环强引用。这种场景最适合通过无主引用来解决。

然而，存在着第三种场景，在这种场景中，两个属性都必须有值，并且初始化完成后不能为nil。在这种场景中，需要一个类使用无主属性，而另外一个类使用显示展开的可选属性。

这使两个属性在初始化完成后能被直接访问(不需要可选展开)，同事避免了循环引用。这一节将为你展示如何建立这种关系。

下面的例子定义了两个类，Country和City，每个类将另外一个类的实例保存为属性。在这个模型中，每个国家必须有首都，而每一个城市必须属于一个国家。为了实现这种关系，Country类拥有一个capitalCity属性，而City类有一个country属性：

    class Country {
        let name: String
        let capitalCity: City!
        init(name: String, capitalName: String) {
            self.name = name
            self.capitalCity = City(name: capitalName, country: self)
        }
    }
 
    class City {
        let name: String
        unowned let country: Country
        init(name: String, country: Country) {
            self.name = name
            self.country = country
        }
    }
    
为了建立两个类的依赖关系，City的构造函数有一个Country实例的参数，并且将实例保存为country属性。

Country的构造函数调用了City的构造函数。然而，只有Country的实例完全初始化完后，Country的构造函数才能把self传给City的构造函数。([在两阶段构造函数中有具体描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_288))

为了满足这种需求，通过在类型结尾处加上感叹号(City!)的方式，将Country的capitalCity属性声明为显示展开的可选类型属性。这表示像其他可选类型一样，capitalCity属性的默认值为nil，但是不需要展开他的值就能访问它。([在显示展开的可选类型中有描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_436))

由于capitalCity默认值为nil，一旦Country的实例在构造函数中给name属性赋值后，整个初始化过程就完成了。这代表一旦name属性被后，Country的构造函数就能引用并传递显式的self。Country的构造函数在赋值capitalCity时，就能将self作为参数传递给City的构造函数。

以上的意义在于你可以通过一条语句同时创建Country和City的实例，而不产生循环强引用，并且capitalCity的属性能被直接访问，而不需要通过感叹号来展开它的可选值：

    var country = Country(name: "Canada", capitalName: "Ottawa")
    println("\(country.name)'s capital city is called \(country.capitalCity.name)")
    // prints "Canada's capital city is called Ottawa"
    
在上面的例子中，使用显示展开可选值的意义在于满足了两个类构造函数的需求。capitalCity属性在初始化完成后，能作为非可选值使用同事还避免了循环强引用。

##闭包引起的循环强引用

前面我们看到了循环强引用环是在两个类实例属性互相保持对方的强引用时产生的，还知道了如何用弱引用和无主引用来打破循环强引用。

循环强引用还会发生在当你将一个闭包赋值给类实例的某个属性，并且这个闭包体中又使用了实例。这个闭包体中可能访问了实例的某个属性，例如self.someProperty，或者闭包中调用了实例的某个方法，例如self.someMethod。这两种情况都导致了闭包 “捕获" self，从而产生了循环强引用。

循环强引用的产生，是因为闭包和类相似，都是引用类型。当你把一个闭包赋值给某个属性时，你也把一个引用赋值给了这个闭包。实质上，这跟之前的问题是一样的－两个强引用让彼此一直有效。但是，和两个类实例不同，这次一个是类实例，另一个是闭包。

Swift提供了一种优雅的方法来解决这个问题，称之为闭包占用列表(closuer capture list)。同样的，在学习如何用闭包占用列表破坏循环强引用之前，先来了解一下循环强引用是如何产生的，这对我们是很有帮助的。

下面的例子为你展示了当一个闭包引用了self后是如何产生一个循环强引用的。例子中定义了一个叫HTMLElement的类，用一种简单的模型表示HTML中的一个单独的元素：

    class HTMLElement {

        let name: String
        let text: String?

        @lazy var asHTML: () -> String = {
            if let text = self.text {
                return "<\(self.name)>\(text)</\(self.name)>"
            } else {
                return "<\(self.name) />"
            }
        }

        init(name: String, text: String? = nil) {
            self.name = name
            self.text = text
        }

        deinit {
            println("\(name) is being deinitialized")
        }

    }

HTMLElement类定义了一个name属性来表示这个元素的名称，例如代表段落的"p"，或者代表换行的"br"。HTMLElement还定义了一个可选属性text，用来设置和展现HTML元素的文本。

除了上面的两个属性，HTMLElement还定义了一个lazy属性asHTML。这个属性引用了一个闭包，将name和text组合成HTML字符串片段。该属性是() -> String类型，或者可以理解为“一个没有参数，返回String的函数”。

默认情况下，闭包赋值给了asHTML属性，这个闭包返回一个代表HTML标签的字符串。如果text值存在，该标签就包含可选值text；如果text不存在，该标签就不包含文本。对于段落元素，根据text是"some text"还是nil，闭包会返回"`<p>some text</p>`"或者"`<p />`"。

可以像实例方法那样去命名、使用asHTML属性。然而，由于asHTML是闭包而不是实例方法，如果你想改变特定元素的HTML处理的话，可以用自定义的闭包来取代默认值。

> 注意: asHTML声明为lazy属性，因为只有当元素确实需要处理为HTML输出的字符串时，才需要使用asHTML。也就是说，在默认的闭包中可以使用self，因为只有当初始化完成以及self确实存在后，才能访问lazy属性。

HTMLElement类只提供一个构造函数，通过name和text(如果有的话)参数来初始化一个元素。该类也定义了一个析构函数，当HTMLElement实例被销毁时，打印一条消息。

下面的代码展示了如何用HTMLElement类创建实例并打印消息。

    var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
    println(paragraph!.asHTML())
    // prints"hello, world"
    
>注意: 上面的paragraph变量定义为可选HTMLElement，因此我们可以赋值nil给它来演示循环强引用。 

不幸的是，上面写的HTMLElement类产生了类实例和asHTML默认值的闭包之间的循环强引用。循环强引用如下图所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/closureReferenceCycle01_2x.png)

实例的asHTML属性持有闭包的强引用。但是，闭包在其闭包体内使用了self（引用了self.name和self.text），因此闭包占有了self，这意味着闭包又反过来持有了HTMLElement实例的强引用。这样两个对象就产生了循环强引用。（更多关于闭包占有值的信息，请参考[Capturing Values](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-XID_129)）。

>注意: 虽然闭包多次使用了self，它只占有HTMLElement实例的一个强引用。

如果设置paragraph变量为nil，打破它持有的HTMLElement实例的强引用，HTMLElement实例和它的闭包都不会被销毁，也是因为循环强引用：

    paragraph = nil

注意HTMLElementdeinitializer中的消息并没有别打印，证明了HTMLElement实例并没有被销毁。

##解决闭包引起的循环强引用

在定义闭包时同时定义占有列表作为闭包的一部分，通过这种方式可以解决闭包和类实例之间的循环强引用。占有列表定义了闭包体内占有一个或者多个引用类型的规则。跟解决两个类实例间的循环强引用一样，声明每个占有的引用为弱引用或无主引用，而不是强引用。应当根据代码关系来决定使用弱引用还是无主引用。

>注意: Swift有如下要求：只要在闭包内使用self的成员，就要用self.someProperty或者self.someMethod（而不只是someProperty或someMethod）。这提醒你可能会不小心就占有了self。

##定义占有列表

占有列表中的每个元素都是由weak或者unowned关键字和实例的引用(如self或someInstance)成对组成。每一对都在花括号中，通过逗号分开。

占有列表放置在闭包参数列表和返回类型之前：

    @lazy var someClosure: (Int, String) -> String = {
        [unowned self] (index: Int, stringToProcess: String) -> String in
        // closure body goes here
    }
    
如果闭包没有指定参数列表或者返回类型，则可以通过上下文推断，那么可以占有列表放在闭包开始的地方，跟着是关键字in：

    @lazy var someClosure: () -> String = {
        [unowned self] in
        // closure body goes here
    }

##弱引用和无主引用

当闭包和占有的实例总是互相引用时并且总是同时销毁时，将闭包内的占有定义为无主引用。

相反的，当占有引用有时可能会是nil时，将闭包内的占有定义为弱引用。弱引用总是可选类型，并且当引用的实例被销毁后，弱引用的值会自动置为nil。这使我们可以在闭包内检查他们是否存在。

>注意: 如果占有的引用绝对不会置为nil，应该用无主引用，而不是弱引用。

前面的HTMLElement例子中，无主引用是正确的解决循环强引用的方法。这样这样编写HTMLElement类来避免循环强引用：

    class HTMLElement {
    
        let name: String
        let text: String?
    
        @lazy var asHTML: () -> String = {
            [unowned self] in
            if let text = self.text {
                return "<\(self.name)>\(text)</\(self.name)>"
            } else {
                return "<\(self.name) />"
            }
        }
    
        init(name: String, text: String? = nil) {
            self.name = name
            self.text = text
        }
    
        deinit {
            println("\(name) is being deinitialized")
        }
    
    }

上面的HTMLElement实现和之前的实现一致，只是在asHTML闭包中多了一个占有列表。这里，占有列表是[unowned self]，表示“用无主引用而不是强引用来占有self”。

和之前一样，我们可以创建并打印HTMLElement实例：

    var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
    println(paragraph!.asHTML())
    // prints "<p>hello, world</p>"
    
使用占有列表后引用关系如下图所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/closureReferenceCycle02_2x.png)

这一次，闭包以无主引用的形式占有self，并不会持有HTMLElement实例的强引用。如果将paragraph赋值为nil，HTMLElement实例将会被销毁，并能看到它的析构函数打印出的消息。

    paragraph = nil
    // prints "p is being deinitialized"
