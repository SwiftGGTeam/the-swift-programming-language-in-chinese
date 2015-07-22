# Optional Chaining

-----------------
可空链式调用（Optional Chaining）是一种可以请求和调用属性、方法及下标的过程，它的可空性体现于请求或调用的目标当前可能为空（nil）。如果可空的目标有值，那么调用就会成功；如果选择的目标为空（nil），那么这种调用将返回空（nil）。多个连续的调用可以被链接在一起形成一个调用链，如果其中任何一个节点为空（nil）将导致整个链调用失败。

>
注意：
Swift 的可空链式调用和 Objective-C 中的消息为空有些相像，但是 Swift 可以使用在任意类型中，并且能够检查调用是否成功。

##可空链式调用作为强制展开的另一个方案
通过在想调用非空的属性、方法、或下标的可空值（optional value）后面放一个问号，可以定义一个可空链。这一点很像在可空值后面放一个叹号（！）来强制展开其中值。它们的主要的区别在于当可空值为空时可空链式只是调用失败，然而强制展开将会触发运行时错误。

为了反映可空链式调用可以在空对象（nil）上调用，不论这个调用的属性、方法、下标等返回的值是不是可空值，它的返回结果都是一个可空值。你可以利用这个返回值来判断你的可空链式调用是否调用成功，如果调用有返回值则说明调用成功，返回nil则说明调用失败。

特别地，可空链式调用的返回结果与原本的返回结果具有相同的类型，但是被包装成了一个可空类型值。当可空链式调用成功时，一个本应该返回Int的类型的结果将会返回Int?类型。

下面几段代码将解释可空链式调用和强制展开的不同。
首先定义两个类Person和Residence。

	class Person {
	var residence: Residence?
	}
	class Residence {
	var numberOfRooms = 1
	}

Residence有一个Int类型的属性numberOfRooms，其默认值为1。Person具有一个可空的residence属性，其类型为Residence？。

如果创建一个新的Person实例，因为它的residence属性是可空的，john属性将初始化为nil：

	let john = Person()

如果使用叹号（！）强制展开获得这个john的residence属性中的numberOfRooms值，会触发运行时错误，因为这时没有可以展开的residence：

	let roomCount = john.residence!.numberOfRooms
	// this triggers a runtime error

john.residence非空的时候，上面的调用成功，并且把roomCount设置为Int类型的房间数量。正如上面说到的，当residence为空的时候上面这段代码会触发运行时错误。

可空链式调用提供了一种另一种访问numberOfRooms的方法，使用问号（？）来代替原来叹号（！）的位置：

	if let roomCount = john.residence?.numberOfRooms {
	    print("John's residence has \(roomCount) room(s).")
	} else {
	    print("Unable to retrieve the number of rooms.")
	}
	// prints "Unable to retrieve the number of rooms."

在residence后面添加问号之后，Swift就会在residence不为空的情况下访问numberOfRooms。

因为访问numberOfRooms有可能失败，可空链式调用会返回Int?类型，或称为“可空的Int”。如上例所示，当residence为nil的时候，可空的Int将会为nil，表明无法访问numberOfRooms。

要注意的是，即使numberOfRooms是不可空的Int时，这一点也成立。只要是通过可空链式调用就意味着最后numberOfRooms返回一个Int？而不是Int。

通过赋给john.residence一个Residence的实例变量：

	john.residence = Residence()
这样john.residence不为nil了。现在就可以正常访问john.residence.numberOfRooms，其值为默认的1，类型为Int?：

	if let roomCount = john.residence?.numberOfRooms {
	print("John's residence has \(roomCount) room(s).")
	} else {
	print("Unable to retrieve the number of rooms.")
	}
	// prints "John's residence has 1 room(s)."
##为可空链式调用定义模型类
通过使用可空链式调用可以调用多层属性，方法，和下标。这样可以通过各种模型向下访问各种子属性。并且判断能否访问子属性的属性，方法或下标。

下面这段代码定义了四个模型类，这些例子包括多层可空链式调用。为了方便说明，在Person和Residence的基础上增加了Room和Address，以及相关的属性，方法以及下标。

Person类定义基本保持不变：

	class Person {
	    var residence: Residence?
	}
Residence类比之前复杂些，增加了一个Room类型的空数组room：

	class Residence {
	    var rooms = [Room]()
	    var numberOfRooms: Int {
	        return rooms.count
	    }
	    subscript(i: Int) -> Room {
	        get {
	            return rooms[i]
	        }
	        set {
	            rooms[i] = newValue
	        }
	    }
	    func printNumberOfRooms() {
	        print("The number of rooms is \(numberOfRooms)")
	    }
	    var address: Address?
	}

现在Residence有了一个存储Room类型的数组，numberOfRooms属性需要计算，而不是作为单纯的变量。计算后的numberOfRooms返回rooms数组的count属性值。现在的Residence还提供访问rooms数组的快捷方式， 通过可读写的下标来访问指定位置的数组元素。此外，还提供printNumberOfRooms方法，这个方法的作用就是输出这个房子中房间的数量。最后，Residence定义了一个可空属性address，其类型为Address?。Address类的定义在下面会说明。

类Room是一个简单类，只包含一个属性name，以及一个初始化函数：

	class Room {
	    let name: String
	    init(name: String) { self.name = name }
	}
最后一个类是Address，这个类有三个String?类型的可空属性。buildingName以及buildingNumber属性表示建筑的名称和号码，用来表示某个特定的建筑。第三个属性表示建筑所在街道的名称：

	class Address {
	    var buildingName: String?
	    var buildingNumber: String?
	    var street: String?
	    func buildingIdentifier() -> String? {
	        if buildingName != nil {
	            return buildingName
	        } else if buildingNumber != nil {
	            return buildingNumber
	        } else {
	            return nil
	        }
	    }
	}
类Address提供buildingIdentifier()方法，返回值为String?。 如果buildingName不为空则返回buildingName， 如果buildingNumber不为空则返回buildingNumber。如果这两个属性都为空则返回nil。

##通过可空链式调用访问属性
正如[可空链式调用作为强制展开的另一个方案]中所述，可以通过可空链式调用访问属性的可空值，并且判断访问是否成功。

下面的代码创建了一个Person实例，然后访问numberOfRooms属性：

	let john = Person()
	if let roomCount = john.residence?.numberOfRooms {
	    print("John's residence has \(roomCount) room(s).")
	} else {
	    print("Unable to retrieve the number of rooms.")
	}
	// prints "Unable to retrieve the number of rooms."
因为john.residence为nil，所以毫无疑问这个可空链式调用失败。

通过可空链式调用来设定属性值：

	let someAddress = Address()
	someAddress.buildingNumber = "29"
	someAddress.street = "Acacia Road"
	john.residence?.address = someAddress
在这个例子中，通过john.residence来设定address属性也是不行的，因为john.residence为nil。

##通过可空链式调用来调用方法
可以通过可空链式调用来调用方法，并判断是否调用成功，即使这个方法没有返回值。
Residence中得printNumberOfRooms()方法输出当前的numberOfRooms值：

	func printNumberOfRooms() {
	    print("The number of rooms is \(numberOfRooms)")
	}
这个方法没有返回值。但是没有返回值的方法隐式返回Void类型，如[无返回值函数](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID163)中所述。这意味着没有返回值的方法也会返回()或者空的元组。

如果在可空值上通过可空链式调用来调用这个方法，这个方法的返回类型为Void?，而不是Void，因为通过可空链式调用得到的返回值都是可空的。这样我们就可以使用if语句来判断能否成功调用printNumberOfRooms()方法，即使方法本身没有定义返回值。通过返回值是否为nil可以判断调用是否成功：

	if john.residence?.printNumberOfRooms() != nil {
	    print("It was possible to print the number of rooms.")
	} else {
	    print("It was not possible to print the number of rooms.")
	}
	// prints "It was not possible to print the number of rooms."
同样的，可以判断通过可空链式调用来给属性赋值是否成功。在上面的例子中，我们尝试给john.residence中的address属性赋值，即使residence为nil。通过可空链式调用给属性赋值会返回Void?，通过判断返回值是否为nil可以知道赋值是否成功：

	if (john.residence?.address = someAddress) != nil {
	print("It was possible to set the address.")
	} else {
	print("It was not possible to set the address.")
	}
	// prints "It was not possible to set the address."

##通过可空链式调用来访问下标
通过可空链式调用，我们可以用下标来对可空值进行读取或写入，并且判断下标调用是否成功。
>
注意：
当通过可空链式调用访问可空值的下标的时候，应该将问号放在下标方括号的前面而不是后面。可空链式调用的问号一般直接跟在可空表达式的后面。

下面这个例子用下标访问john.residence中rooms数组中第一个房间的名称，因为john.residence为nil，所以下标调用毫无疑问失败了：

	if let firstRoomName = john.residence?[0].name {
	    print("The first room name is \(firstRoomName).")
	} else {
	    print("Unable to retrieve the first room name.")
	}
	// prints "Unable to retrieve the first room name."
在这个例子中，问号直接放在john.residence的后面，并且在方括号的前面，因为john.residence是可空值。

类似的，可以通过下标，用可空链式调用来赋值：

	let johnsHouse = Residence()
	johnsHouse.rooms.append(Room(name: "Living Room"))
	johnsHouse.rooms.append(Room(name: "Kitchen"))
	john.residence = johnsHouse
	if let firstRoomName = john.residence?[0].name {
	print("The first room name is \(firstRoomName).")
	} else {
	print("Unable to retrieve the first room name.")
	}
	// prints "The first room name is Living Room."

##访问可空类型的下标：
如果下标返回可空类型值，比如Swift中Dictionary的key下标。可以在下标的闭合括号后面放一个问号来链接下标的可空返回值：

	var testScores = ["Dave": [86, 82, 84], "Bev": [79, 94, 81]]
	testScores["Dave"]?[0] = 91
	testScores["Bev"]?[0]++
	testScores["Brian"]?[0] = 72
	// the "Dave" array is now [91, 82, 84] and the "Bev" array is now [80, 94, 81]
上面的例子中定义了一个testScores数组，包含了两个键值对， 把String类型的key映射到一个整形数组。这个例子用可空链式调用把“Dave”数组中第一个元素设为91，把”Bev”数组的第一个元素+1，然后尝试把”Brian”数组中的第一个元素设为72。前两个调用是成功的，因为这两个key存在。但是key“Brian”在字典中不存在，所以第三个调用失败。

##多层链接
可以通过多个链接多个可空链式调用来向下访问属性，方法以及下标。但是多层可空链式调用不会添加返回值的可空性。

也就是说：

+ 如果你访问的值不是可空的，通过可空链式调用将会放回可空值。
+ 如果你访问的值已经是可空的，通过可空链式调用不会变得“更”可空。

因此：

+ 通过可空链式调用访问一个Int值，将会返回Int？，不过进行了多少次可空链式调用。
+ 类似的，通过可空链式调用访问Int?值，并不会变得更加可空。

下面的例子访问john中的residence中的address中的street属性。这里使用了两层可空链式调用，residence以及address，这两个都是可空值。

	if let johnsStreet = john.residence?.address?.street {
	    print("John's street name is \(johnsStreet).")
	} else {
	    print("Unable to retrieve the address.")
	}
	// prints "Unable to retrieve the address."

john.residence包含Residence实例，但是john.residence.address为nil。因此，不能访问john.residence?.address?.street。

需要注意的是，上面的例子中，street的属性为String?。john.residence?.address?.street的返回值也依然是String?，即使已经进行了两次可空的链式调用。

如果把john.residence.address指向一个实例，并且为address中的street属性赋值，我们就能过通过可空链式调用来访问street属性。

	let johnsAddress = Address()
	johnsAddress.buildingName = "The Larches"
	johnsAddress.street = "Laurel Street"
	john.residence?.address = johnsAddress
 	
	if let johnsStreet = john.residence?.address?.street {
	    print("John's street name is \(johnsStreet).")
	} else {
	    print("Unable to retrieve the address.")
	}
	// prints "John's street name is Laurel Street."
在上面的例子中，因为john.residence是一个可用的Residence实例，所以对john.residence的address属性赋值成功。

##对返回可空值的函数进行链接
上面的例子说明了如何通过可空链式调用来获取可空属性值。我们还可以通过可空链式调用来调用返回可空值的方法，并且可以继续对可空值进行链接。

在下面的例子中，通过可空链式调用来调用Address的buildingIdentifier()方法。这个方法返回String?类型。正如上面所说，通过可空链式调用的方法的最终返回值还是String?：
 
	if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
	    print("John's building identifier is \(buildingIdentifier).")
	}
	// prints "John's building identifier is The Larches."

如果要进一步对方法的返回值进行可空链式调用，在方法buildingIdentifier()的圆括号后面加上问号：

	if let beginsWithThe =
	john.residence?.address?.buildingIdentifier()?.hasPrefix("The") {
	if beginsWithThe {
	print("John's building identifier begins with \"The\".")
	} else {
	print("John's building identifier does not begin with \"The\".")
	}
	}
	// prints "John's building identifier begins with "The"."
>	
注意：
在上面的例子中在，在方法的圆括号后面加上问号是因为buildingIdentifier()的返回值是可空值，而不是方法本身是可空的。
