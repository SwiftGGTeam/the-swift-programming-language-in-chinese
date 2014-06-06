# 自动引用计数
=======================

Swift使用自动引用计数(ARC)来跟踪并管理应用使用的内存。大部分情况下，这意味着在Swift语言中，内存管理"仍然工作"，不需要自己去考虑内存管理的事情。当实例不再被使用时，ARC会自动释放这些类的实例所占用的内存。

然而，在少数情况下，为了自动的管理内存空间，ARC需要了解关于你的代码片段之间关系的更多信息。本章描述了这些情况，并向大家展示如何打开ARC来管理应用的所有内存空间。

>注意<br />
引用计数只应用在类的实例。结构体(Structure)和枚举类型是值类型，并非引用类型，不是以引用的方式来存储和传递的。

## ARC如何工作

每次创建一个类的实例，ARC就会分配一个内存块，用来存储这个实例的相关信息。这个内存块保存着实例的类型，以及这个实例相关的属性的值。

当实例不再被使用时，ARC释放这个实例使用的内存，使这块内存可作它用。这保证了类实例不再被使用时，它们不会占用内存空间。

但是，如果ARC释放了仍在使用的实例，那么你就不能再访问这个实例的属性或者调用它的方法。如果你仍然试图访问这个实例，应用极有可能会崩溃。

为了保证不会发生上述的情况，ARC跟踪与类的实例相关的属性、常量以及变量的数量。只要有一个有效的引用，ARC都不会释放这个实例。

为了让这变成现实，只要你将一个类的实例赋值给一个属性或者常量或者变量，这个属性、常量或者变量就是这个实例的*强引用(strong reference)*。之所以称之为“强”引用，是因为它强持有这个实例，并且只要这个强引用还存在，就不允许销毁实例。

## ARC实践

下面的例子展示了ARC是如何工作的。本例定义了一个简单的类，类名是Person，并定义了一个名为name的常量属性：

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

类Person有一个初始化函数（initializer），设置这个实例的name属性，打印一条消息来指示初始化正在进行。类Person还有一个`deinitializer`方法，当销毁一个类的实例时，会打印一条消息。

接下来的代码片段定义了三个`Person?`类型的变量，这些变量用来创建多个引用，这些引用都引用紧跟着的代码所创建的`Person`对象。因为这些变量都是可选类型（`Person?`，而非`Person`），因此他们都被自动初始化为nil，并且当前并没有引用一个`Person`的实例。

	var reference1: Person?
	var reference2: Person?
	var reference3: Person?
	
现在我们创建一个新的`Person`实例，并且将它赋值给上述三个变量重的一个：

	reference1 = Person(name: "John Appleseed")
	// prints "Jonh Appleseed is being initialized"
	
注意，消息`“John Appleseed is being initialized”`在调用`Person`类的初始化函数时打印。这印证初始化确实发生了。

因为`Person`的实例赋值给了变量`reference1`，所以`reference1`是`Person`实例的强引用。又因为至少有这一个强引用，ARC就保证这个实例会保存在内存重而不会被销毁。

如果将这个`Person`实例赋值给另外的两个变量，那么将建立另外两个指向这个实例的强引用：

	reference2 = reference1
	reference3 = reference2
	
现在，这一个`Person`实例有三个强引用。

如果你通过赋值nil给两个变量来破坏其中的两个强引用（包括原始的引用），只剩下一个强引用，这个`Person`实例也不会被销毁：

	reference1 = nil
	reference2 = nil
	
直到第三个也是最后一个强引用被破坏，ARC才会销毁`Person`的实例，这时，有一点非常明确，你无法继续使用`Person`实例：

	referenece3 = nil
	// 打印 “John Appleseed is being deinitialized”
	

## 类实例间的强引用环

在上面的例子中，ARC可以追踪`Person`实例的引用数量，并且在它不再被使用时销毁这个实例。

然而，我们有可能会写出这样的代码，一个类的实例永远不会有0个强引用。在两个类实例彼此保持对方的强引用，使得每个实例都使对方保持有效时会发生这种情况。我们称之为*强引用环*。

通过用弱引用或者无主引用来取代强引用，我们可以解决强引用环问题。在开始学习如何解决这个问题之前，理解它产生的原因会很有帮助。

下面的例子展示了一个强引用环是如何在不经意之间产生的。例子定义了两个类，分别叫`Person`和`Apartment`，这两个类建模了一座公寓以及它的居民：

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
	
每个`Person`实例拥有一个`String`类型的`name`属性以及一个被初始化为nil的`apartment`可选属性。`apartment`属性是可选的，因为一个人并不一定拥有一座公寓。

类似的，每个`Apartment`实例拥有一个`Int`类型的`number`属性以及一个初始化为nil的`tenant`可选属性。`tenant`属性是可选的，因为一个公寓并不一定有居民。

这两个类也都定义了初始化函数，打印消息表明这个类的实例正在被初始化。这使你能够看到`Person`和`Apartment`的实例是否像预期的那样被销毁了。

下面的代码片段定义了两个可选类型变量，`john`和`number73`，分别被赋值为特定的`Apartment`和`Person`的实例。得益于可选类型的优点，这两个变量初始值均为nil：

	var john: Person?
	var number73: Apartment?
	
现在，你可以创建特定的`Person`实例以及`Apartment`实例，并赋值给`john`和`number73`：

	jhon = Person(name: "John Appleseed")
	number73 = Apartments(number: 73)
	
下面的图表明了在创建以及赋值这两个实例后强引用的关系。`john`拥有一个`Person`实例的强引用，`number73`拥有一个`Apartment`实例的强引用:
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle01_2x.png)

现在你可以将两个实例关联起来，一个人拥有一所公寓，一个公寓也拥有一个房客。注意：用感叹号（!）来展开并访问可选类型的变量，只有这样这些变量才能被赋值：

	john!.apartment = number73
	number73!.tenant = john
	
两个实例关联起来后，强引用关系如下图所示：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle02_2x.png)

糟糕的是，关联这俩实例生成了一个强引用环，`Person`实例和`Apartment`实例各持有一个对方的强引用。因此，即使你破坏`john`和`number73`所持有的强引用，引用计数也不会变为0，因此ARC不会销毁这两个实例：

	john = nil
	nuber73 = nil
	
注意，当上面两个变量赋值为nil时，没有调用任何一个deinitializer。强引用环阻止了`Person`和`Apartment`实例的销毁，进一步导致内存泄漏。

此时强引用关系如下图所示：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle03_2x.png)

`Person`和`Apartment`实例之间的强引用依然存在。

## 解决实例间的强引用环
Swift提供两种方法来解决强引用环：弱引用和无主引用。

弱引用和无主引用允许引用环中的一个实例引用另外一个实例，但不是强引用。因此实例可以互相引用但是不会产生强引用环。

对于生命周期中引用会变为nil的实例，使用弱引用；对于初始化时赋值之后引用再也不会赋值为nil的实例，使用无主引用。

### 弱引用

`弱引用`不会增加实例的引用计数，因此不会阻止ARC销毁被引用的实例。这种特性使得引用不会变成强引用环。声明属性或者变量的时候，关键字`weak`表明引用为弱引用。

在实例的生命周期中，如果某些时候引用没有值，那么弱引用可以阻止强引用环。如果整个生命周期内引用`都有`值，那么相应的用无主引用，在`无主引用`这一章中有详细描述。在上面的`Apartment`例子中，有时一个`Apartment`实例可能没有房客，因此此处应该用弱引用。
>注意<br />
>弱引用只能声明为变量类型，因为运行时它的值可能改变。弱引用绝对不能声明为常量。

因为弱引用可以没有值，所以声明弱引用的时候必须是可选类型的。在Swift语言中，推荐用可选类型来作为可能没有值的引用的类型。

如前所述，弱引用不会保持实例，因此即使实例的弱引用依然存在，ARC也有可能会销毁实例，并将弱引用赋值为`nil`。你可以想检查其他的可选值一样检查弱引用是否存在，永远也不会碰到引用了也被销毁的实例的情况。

下面的例子和之前的`Person`和`Apartment`例子相似，除了一个重要的区别。这一次，我们声明`Apartment`的`tenant`属性为弱引用：

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

然后创建两个变量(`john`和`number73`)的强引用，并关联这两个实例：

	var john: Person?
	var number73: Apartment?
	
	john = Person(name: "John Appleseed")
	number73 = Apartment(nunber: 73)
	
	john!.apartment = number73
	number73!.tenant = john
	
下面是引用的关系图：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference01_2x.png)

`Person`的实例仍然是`Apartment`实例的强引用，但是`Apartment`实例则是`Person`实例的弱引用。这意味着当破坏`john`变量所持有的强引用后，不再存在任何`Person`实例的强引用：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference02_2x.png)

既然不存在`Person`实例的强引用，那么该实例就会被销毁：

	john = nil
	//  打印"John Appleseed is being deinitialized"
	
只有`number73`还持有`Apartment`实例的强引用。如果你破坏这个强引用，那么也不存在`Apartment`实例的任何强引用：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference03_2x.png)

这时，`Apartment`实例也被销毁：

	number73 = nil
	// 打印"Apartment #73 is being deinitialized"
	
上面的两段代码表明在`john`和`number73`赋值为`nil`后，`Person`和`Apartment`实例的deinitializer都打印了“销毁”的消息。这证明了引用环已经被打破了。

### 无主引用
和弱引用相似，无主引用也不强持有实例。但是和弱引用不同的是，无主引用默认始终有值。因此，无主引用只能定义为非可选类型（non-optional type）。在属性、变量前添加`unowned`关键字，可以声明一个无主引用。

因为是非可选类型，因此当使用无主引用的时候，不需要展开，可以直接访问。不过非可选类型变量不能赋值为`nil`，因此当实例被销毁的时候，ARC无法将引用赋值为`nil`。
>注意<br />
当实例被销毁后，试图访问该实例的无主引用会触发运行时错误。使用无主引用时请确保引用始终指向一个未销毁的实例。
上面的非法操作会百分百让应用崩溃，不会发生无法预期的行为。因此，你应该避免这种情况。

接下来的例子定义了两个类，`Customer`和`CreditCard`，模拟了银行客户和客户的信用卡。每个类都一个属性，存储另外一个类的实例。这样的关系可能会产生强引用环。

`Customer`、`CreditCard`的关系和之前弱引用例子中的`Apartment`、`Person`的关系截然不同。在这个模型中，消费者不一定有信用卡，但是每张信用卡一定对应一个消费者。鉴于这种关系，`Customer`类有一个可选类型属性`card`，而`CreditCard`类的`customer`属性则是非可选类型的。

进一步，要创建一个`CreditCard`实例，只能通过传递`number`值和`customer`实例到定制的`CreditCard`初始化函数来完成。这样可以确保当创建`CreditCard`实例时总是有一个`customer`实例与之关联。

因为信用卡总是对应一个消费者，因此定义`customer`属性为无主引用，这样可以避免强引用环：

	class Customer {
		let name: String
		var card: CreditCard?
		init(name: String) {
			self.name = name
		}
		
		deinit { println("\(name) is being deinitialized")
	}
	
	class CreditCard {
		let number: Int
		unowned let customer: Customer
		init(number: Int, customer: Customer) {
			self.number = number
			self.customer = customer
		}
		
		deinit { println("Card #\(number) is being deinitialized")
	}
	
下面的代码定义了一个叫`john`的可选类型`Customer`变量，用来保存某个特定消费者的引用。因为是可变类型，该变量的初始值为`nil`：

	var john: Customer?
	
现在创建一个`Customer`实例，然后用它来初始化`CreditCard`实例，并把刚创建出来的`CreditCard`实例赋值给`Customer`的`card`属性：

	john = Customer(name: "John Appleseed")
	john!.card = CreditCard(number: 1234_5678_9012_3456, customer:john!)
	
我们来看看此时的引用关系：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/unownedReference01_2x.png)

`Customer`实例持有`CreditCard`实例的强引用，而`CreditCard`实例则持有`Customer`实例的无主引用。

因为`customer`的无主引用，当破坏`john`变量持有的强引用时，就没有`Customer`实例的强引用了：
![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/unownedReference02_2x.png)

此时`Customer`实例被销毁。然后，`CreditCard`实例的强引用也不复存在，因此`CreditCard`实例也被销毁：

	john = nil
	// 打印"John Appleseed is being deinitialized"
	// 打印"Card #1234567890123456 is being deinitialized"

上面的代码证明，`john`变量赋值为`nil`后，`Customer`实例和`CreditCard`实例的deinitializer方法都打印了"deinitialized"消息。

### 无主引用以及显式展开的可选属性
上述的弱引用和无主引用的例子覆盖了两种常用的需要打破强引用环的应用场景。

`Person`和`Apartment`的例子说明了下面的场景：两个属性的值都可能是`nil`,并有可能产生强引用环。这种场景下适合使用弱引用。

`Customer`和`CreditCard`的例子则说明了另外的场景：一个属性可以是`nil`，另外一个属性不允许是`nil`，并有可能产生强引用环。这种场景下适合使用无主引用。

但是，存在第三种场景：两个属性都必须有值，且初始化完成后不能为`nil`。这种场景下，则要一个类用无主引用属性，另一个类用显式展开的可选属性。

这样，在初始化完成后我们可以立即访问这两个变量（而不需要可选展开），同时又避免了引用环。本节将告诉你应该如何配置这样的关系。

下面的例子顶一个了两个类，`Country`和`City`，都有一个属性用来保存另外的类的实例。在这个模型里，每个国家都有首都，每个城市都隶属于一个国家。所以，类`Country`有一个`capitalCity`属性，类`City`有一个`country`属性：

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
	
`City`的初始化函数有一个`Country`实例参数，并且用`country`属性来存储这个实例。这样就实现了上面说的关系。

`Country`的初始化函数调用了`City`的初始化函数。但是，只有`Country`的实例完全初始化完后（在Two-Phase Initialization），`Country`的初始化函数才能把`self`传给`City`的初始化函数。

为满足这种需求，通过在类型结尾处加感叹号(City!)，我们声明`Country`的`capitalCity`属性为显式展开的可选类型属性。就是说，`capitalCity`属性的默认值是`nil`，不需要展开它的值（在Implicity Unwrapped Optionals中描述）就可以直接访问。

因为`capitalCity`默认值是`nil`，一旦`Country`的实例在初始化时给`name`属性赋值后，整个初始化过程就完成了。这代表只要赋值`name`属性后，`Country`的初始化函数就能引用并传递显式的`self`。所以，当`Country`的初始化函数在赋值`capitalCity`时，它也可以将`self`作为参数传递给`City`的初始化函数。

综上所述，你可以在一条语句中同时创建`Country`和`City`的实例，却不会产生强引用环，并且不需要使用感叹号来展开它的可选值就可以直接访问`capitalCity`：

	var country = Country(name: "Canada", capitalName: "Ottawa")
	println("\(country.name)'s captial city is called \(country.capitalCity.name)")
	// 打印"Canada's capital city is called Ottawa"
	
在上面的例子中，使用显式展开的可选值满足了两个类的初始化函数的要求。初始化完成后，`capitalCity`属性就可以做为非可选值类型使用，却不会产生强引用环。

## 闭包产生的强引用环

前面我们看到了强引用环是如何产生的，还知道了如何引入弱引用和无主引用来打破引用环。

将一个闭包赋值给类实例的某个属性，并且这个闭包使用了实例，这样也会产生强引用环。这个闭包可能访问了实例的某个属性，例如`self.someProperty`，或者调用了实例的某个方法，例如`self.someMethod`。这两种情况都导致了闭包使用`self`，从而产生了抢引用环。

因为诸如类这样的闭包是*引用*类型，导致了强引用环。当你把一个闭包赋值给某个属性时，你也把一个*引用*赋值给了这个闭包。实质上，这个之前描述的问题是一样的－两个强引用让彼此一直有效。但是，和两个类实例不同，这次一个是类实例，另一个是闭包。

Swift提供了一种优雅的方法来解决这个问题，我们称之为*闭包占用列表(closuer capture list)*。同样的，在学习如何避免因闭包占用列表产生强引用环之前，先来看看这个抢引用环是如何产生的。

下面的例子将会告诉你当一个闭包引用了`self`后是如何产生一个抢引用环的。本例顶一个一个名为`HTMLElement`的类，来建模HTML中的一个单独的元素：

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

类`HTMLElement`定义了一个`name`属性来表示这个元素的名称，例如代表段落的`"p"`，或者代表换行的`"br"`；以及一个可选属性`text`，用来设置HTML元素的文本。

除了上面的两个属性，`HTMLElement`还定义了一个lazy属性`asHTML`。这个属性引用了一个闭包，将`name`和`text`组合成HTML字符串片段。该属性是`() -> String`类型，就是“没有参数，返回`String`的函数”。

默认将闭包赋值给了`asHTML`属性，这个闭包返回一个代表HTML标签的字符串。如果`text`值存在，该标签就包含可选值`text`；或者不包含文本。对于段落，根据`text`是`"some text"`还是`nil`，闭包会返回`"<p>some text</p>"`或者`"<p />"`。

可以像实例方法那样去命名、使用`asHTML`。然而，因为`asHTML`终究是闭包而不是实例方法，如果你像改变特定元素的HTML处理的话，可以用定制的闭包来取代默认值。
>注意<br />
`asHTML`声明为lazy属性，因为只有当元素确实需要处理为HTML输出的字符串时，才需要使用`asHTML`。也就是说，在默认的闭包中可以使用`self`，因为只有当初始化完成以及`self`确实存在后，才能访问lazy属性。

`HTMLElement`只有一个初始化函数，根据`name`和`text`(如果有的话)参数来初始化一个元素。该类也定义了一个deinitializer，当`HTMLElement`实例被销毁时，打印一条消息。

下面的代码创建一个`HTMLElement`实例并打印消息。

	var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
	println(paragraph!.asHTML())
	// 打印"<p>hello, world</p>"
	
>注意<br />
上面的`paragraph`变量定义为可选`HTMLElement`，因此我们可以赋值`nil`给它来演示强引用环。

不幸的是，`HTMLElement`类产生了类实例和`asHTML`默认值的闭包之间的强引用环。如下图所示：

![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/closureReferenceCycle01_2x.png)

实例的`asHTML`属性持有闭包的强引用。

但是，闭包使用了`self`（引用了`self.name`和`self.text`），因此闭包*占有*了`self`，这意味着闭包又反过来持有了`HTMLElement`实例的强引用。这样就产生了强引用环。（更多闭包哪占有值的信息，请参考Capturing Values）。

>注意<br />
虽然闭包多次使用了`self`，它只占有`HTMLElement`实例的一个强引用。

如果设置`paragraph`为`nil`，打破它持有的`HTMLElement`实例的强引用，`HTMLElement`实例和它的闭包都不会被销毁，就因为强引用环：

	paragraph = nil

注意`HTMLElement`deinitializer中的消息并没有别打印，印证了`HTMLElement`实例并没有被销毁。


## 解决闭包产生的强引用环

在定义闭包时同时定义*占有列表*作为闭包的一部分，可以解决闭包和类实例之间的强引用环。占有列表定义了闭包内占有一个或者多个引用类型的规则。和解决两个类实例间的强引用环一样，声明每个占有的引用为弱引用或无主引用，而不是强引用。根据代码关系来决定使用弱引用还是无主引用。

>注意<br />
Swift有如下约束：只要在闭包内使用`self`的成员，就要用`self.someProperty`或者`self.someMethod`（而非只是`someProperty`或`someMethod`）。这可以提醒你可能会不小心就占有了`self`。

### 定义占有列表

占有列表中的每个元素都是由`weak`或者`unowned`关键字和实例的引用(如`self`或`someInstance`)组成。每一对都在花括号中，通过逗号分开。

占有列表放置在闭包参数列表和返回类型之前：

	@lazy var someClosure: (Int, String) -> String = {
		[unowned self] (index: Int, stringToProcess: String) -> String in
		// closure body goes here
	}
	
如果闭包没有指定参数列表或者返回类型（可以通过上下文推断），那么占有列表放在闭包开始的地方，跟着是关键字`in`：

	@lazy var someClosure: () -> String = {
		[unowned self] in
		// closure body goes here
	
	}


### 弱引用和无主引用

当闭包和占有的实例总是互相引用时并且总是同时销毁时，将闭包内的占有定义为无主引用。

相反的，当占有引用有时可能会是`nil`时，将闭包内的占有定义为弱引用。弱引用总是可选类型，并且当引用的实例被销毁后，弱引用的值会自动置为`nil`。利用这个特性，我们可以在闭包内检查他们是否存在。

>注意<br />
如果占有的引用绝对不会置为`nil`，应该用无主引用，而不是弱引用。

前面提到的`HTMLElement`例子中，无主引用是正确的解决强引用的方法。这样编码`HTMLElement`类来避免强引用环：

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
	
上面的`HTMLElement`实现和之前的实现相同，只是多了占有列表。这里，占有列表是`[unowned self]`，代表“用无主引用而不是强引用来占有`self`”。

和之前一样，我们可以创建并打印`HTMLElement`实例：
	
	var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
	println(paragraph!.asTHML())
	// 打印"<p>hello, world</p>"
	
使用占有列表后引用关系如下图所示：

![Resize icon](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/closureReferenceCycle02_2x.png)

这一次，闭包以无主引用的形式占有`self`，并不会持有`HTMLElement`实例的强引用。如果赋值`paragraph`为`nil`，`HTMLElement`实例将会被销毁，并能看到它的deinitializer打印的消息。

	paragraph = nil
	// 打印"p is being deinitialized"
