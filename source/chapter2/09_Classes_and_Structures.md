### 类和结构体
类和结构体是人们构建代码所用的一种通用且灵活的构造体。为了在类和结构体中实现各种功能，我们必须要严格按照对于常量，变量以及函数所规定的语法规则来定义属性和添加方法。

与其他编程语言所不同的是，Swift 并不要求你为自定义类和结构去创建独立的接口和实现文件。你所要做的是在一个单一文件中定义一个类或者结构体，系统将会自动生成面向其它代码的外部接口。

> 通常一个`类`的实例被称为`对象`。然而在Swift 中，类和结构体的关系要比在其他语言中更加的密切，本章中所讨论的大部分功能都可以用在类和结构体上。因此，我们会主要使用`实例`而不是`对象`。

### 类和结构体对比
Swift 中类和结构体有很多共同点。共同处在于：

* 	定义属性用于储存值
* 	定义方法用于提供功能
* 	定义下标用于通过下标语法访问值
* 	定义初始化器用于生成初始化值
* 	通过扩展以增加默认实现的功能
* 	符合协议以对某类提供标准功能

更多信息请参见 [属性](http://)，[方法](http://)，[下标](http://)，[初始化](http://)，[扩展](http://)，和[协议](http://)。

与结构体相比，类还有如下的附加功能：


* 继承允许一个类继承另一个类的特征
* 类型转换允许在运行时检查和解释一个类实例的类型
* 取消初始化器允许一个类实例释放任何其所被分配的资源
* 引用计数允许对一个类的多次引用

更多信息请参见[继承](http://)，[类型转换](http://)，[初始化](http://)，和[自动引用计数](http://)。

>结构体总是通过被复制的方式在代码中传递，因此请不要使用引用计数。

### 定义
类和结构体有着类似的定义方式。我们通过关键字`class`和`struct`来分别表示类和结构体，并在一对大括号中定义它们的具体内容：

	class SomeClass {
		// class definition goes here
	}
	struct SomeStructure {
		// structure definition goes here
	}
	
> 在你每次定义一个新类或者结构体的时候，实际上你是有效地定义了一个新的Swift 类型。因此请使用 `UpperCamelCase` 这种方式来命名（如 `SomeClass` 和`SomeStructure`等），以便符合标准Swift 类型的大写命名风格（如`String`，`Int`和`Bool`）。相反的，请使用`lowerCamelCase`这种方式为属性和方法命名（如`framerate`和`incrementCount`），以便和类区分。

以下是定义结构体和定义类的示例：

	struct Resolution {
		var width = 0
		var heigth = 0
	}
	class VideoMode {
		var resolution = Resolution()
		var interlaced = false
		var frameRate = 0.0
		var name: String?
	}

在上面的示例中我们定义了一个名为`Resolution`的结构体，用来描述一个显示器的像素分辨率。这个结构体包含了两个名为`width`和`height`的储存属性。储存属性是捆绑和储存在类或结构体中的常量或变量。当这两个属性被初始化为整数`0`的时候，它们会被推断为`Int`类型。

在上面的示例中我们还定义了一个名为`VideoMode`的类，用来描述一个视频显示器的特定模式。这个类包含了四个储存属性变量。第一个是`分辨率`，它被初始化为一个新的`Resolution`结构体的实例，具有`Resolution`的属性类型。新`VideoMode`实例同时还会初始化其它三个属性，它们分别是，初始值为`false`(意为“non-interlaced video”)的`inteflaced`，回放帧率初始值为`0.0`的`frameRate`和值为可选`String`的`name`。`name`属性会被自动赋予一个默认值`nil`，意为“没有`name`值”，因它是一个可选类型。

### 类和结构体实例
`Resolution`结构体和`VideoMode`类的定义仅描述了什么是`Resolution`和`VideoMode`。它们并没有描述一个特定的分辨率（resolution）或者视频模式（video mode）。为了描述一个特定的分辨率或者视频模式，我们需要生成一个它们的实例。

生成结构体和类实例的语法非常相似：

	let someResolution = Resolution()
	let someVideoMode = VideoMode()
	
结构体和类都使用初始化器语法来生成新的实例。初始化器语法的最简单形式是在结构体或者类的类型名称后跟随一个空括弧，如`Resolution()`或`VideoMode()`。通过这种方式所创建的类或者结构体实例，其属均会被初始化为默认值。类和结构体的初始化在[Initialization](http://)章节会进行更详细的讨论。


### 属性访问
通过使用*点语法*（*dot syntax*）,你可以访问实例中所含有的属性。其语法规则是，实例名后面紧跟属性名，两者通过点号(.)连接：
	
	println("The width of someResolution is \(someResolution.width)")
	// prints "The width of someResolution is 0"
	
在上面的例子中，`someResolution.width`引用`someResolution`的`width`属性，返回`width`的初始值`0`。

你也可以访问子属性，如何`VideoMode`中`Resolution`属性的`width`属性：
	
	println("The width of someVideoMode is \(someVideoMode.resolution.width)")
	// prints "The width of someVideoMode is 0"
	
你也可以使用点语法为属性变量赋值：
	
	someVideoMode.resolution.width = 12880
	println("The width of someVideoMode is now \(someVideoMode.resolution.width)")
	// prints "The width of someVideoMode is now 1280"
	
> 与Objective-C 语言不同的是，Swift 允许直接设置结构体属性的子属性。上面的最后一个例子，就是直接设置了`someVideoMode`中`resolution`属性的`width`这个子属性，以上操作并不需要从新设置`resolution`属性。

### 结构体类型的成员逐一初始化器
//Memberwise Initializers for structure Types

所有结构体都有一个自动生成的成员逐一初始化器，用于初始化新结构体实例中成员的属性。新实例中各个属性的初始值可以通过属性的名称传递到成员逐一初始化器之中：
	
	let vga = resolution（width:640, heigth: 480）
	
与结构体不同，类实例没有默认的成员逐一初始化器。初始化器在[Initialization](http://)章节进行更详细的讨论。

### 结构体和枚举是值类型













