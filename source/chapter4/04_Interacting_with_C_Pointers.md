> 翻译：[老码团队翻译组-Relly](http://weibo.com/penguinliong/)  
> 校对：[老码团队翻译组-Tyrion](http://weibo.com/u/5241713117) 

# Swift与C语言指针友好合作
-----------------

本页包含内容：

- [用以输入/输出的参数指针](#inout-para-pointer)
- [作为数组使用的参数指针](#array-as-para-pointer)
- [用作字符串参数的指针](#string-as-para-pointer)
- [指针参数转换的安全性](#security-of-pointer-cast)

Objective-C和C的API常常会需要用到指针。Swift中的数据类型都原生支持基于指针的Cocoa API，不仅如此，Swift会自动处理部分最常用的将指针作为参数传递的情况。这篇文章中，我们将着眼于在Swift中让C语言指针与变量、数组和字符串共同工作。

<a name="inout-para-pointer"></a>
####用以输入/输出的参数指针

C和Objective-C并不支持多返回值，所以Cocoa API中常常将指针作为一种在方法间传递额外数据的方式。Swift允许指针被当作`inout`参数使用，所以你可以用符号`&`将对一个变量的引用作为指针参数传递。举例来说：`UIColor`中的`getRed(_:green:blue:alpha:)`方法需要四个`CGFloat*`指针来接收颜色的组成信息，我们使用`&`来将这些组成信息捕获为本地变量：

####Swift代码

	var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
	color.getRed(&r, green: &g, blue: &b, alpha: &a)
	
另一种常见的情况是Cocoa中`NSError`的习惯用法。许多方法会使用一个`NSError**`参数来储存可能的错误的信息。举例来说：我们用`NSFileManager`的`contentOfDirectoryAtPath(_:error:)`方法来将目录下的内容列表，并将潜在的错误指向一个`NSError?`变量：

####Swift代码

	var maybeError: NSError?
	if let contents = NSFileManager.defaultManager()
		.contentsOfDirectoryAtPath("/usr/bin", error: &maybeError) {
		// Work with the directory contents
	} else if let error = maybeError {
		// Handle the error
	}

为了安全性，Swift要求被使用`&`传递的变量已经初始化。因为无法确定这个方法会不会在写入数据前尝试从指针中读取数据。

<a name="array-as-para-pointer"></a>
####作为数组使用的参数指针

在C语言中，数组和指针的联系十分紧密，而Swift允许数组能够作为指针使用，从而与基于数组的C语言API协同工作更加简单。一个固定的数组可以使用一个常量指针直接传递，一个变化的数组可以用`&`运算符将一个非常量指针传递。就和输入/输出参数指针一样。举例来说：我们可以用Accelerate框架中的`vDSP_vadd`方法让两个数组`a`和`b`相加，并将结果写入第三个数组`result`。

####Swift

	import Accelerate
	
	let a: [Float] = [1, 2, 3, 4]
	let b: [Float] = [0.5, 0.25, 0.125, 0.0625]
	var result: [Float] = [0, 0, 0, 0]
	
	vDSP_vadd(a, 1, b, 1, &result, 1, 4)
	
	// 结果包含[1.5, 2.25, 3.125, 4.0625]

<a name="string-as-para-pointer"></a>
####用作字符串参数的指针

C语言中用`cont char*`指针来作为传递字符串的基本方式。Swift中的`String`可以被当作一个无限长度UTF-8编码的`const char*`指针来传递给方法。举例来说：我们可以直接传递一个字符串给一个标准C和POSIX库方法

####swift

	puts("Hello from libc")
	let fd = open("/tmp/scratch.txt", O_WRONLY|O_CREAT, 0o666)
	
	if fd < 0 {
		perror("could not open /tmp/scratch.txt")
	} else {
		let text = "Hello World"
		write(fd, text, strlen(text))
		close(fd)
	}

<a name="security-of-pointer-cast"></a>
####指针参数转换的安全性

Swift很努力地使与C语言指针的交互更加便利，因为它们广泛地存在于Cocoa之中，同时保持一定的安全性。然而，相比你的其他Swift代码与C语言的指针交互具有潜在的不安全性，所以务必要小心使用。其中特别要注意：

- 如果被调用者为了在其返回值之后再次使用而保存了C指针的数据，那么这些转换使用起来并不安全。转换后的指针仅在调用期间保证有效。甚至你将同样的变量、数组或字符串作为多指针参数再次传递，你每次都会收到一个不同的指针。这个异常将全局或静态地储存为变量。你可以安全地将这段地址当作永久唯一的指针使用。例如：作为一个KVO上下文参数使用的时候。

- 当指针类型为`Array`或`String`时，溢出检查不是强制进行的。 基于C语言的API无法增加数组和字符串大小，所以在你将其传递到基于C语言的API之前，你必须确保数组或字符的大小正确。

如果你需要使用基于指针的API时没有遵守以上指导，或是你重写了接受指针参数的Cocoa方法，于是你可以在Swift中直接用不安全的指针来使用未经处理的内存。在未来的文章中我们将着眼于更加高级的情况。

-----------------
本章节不是老码的原创，老码认真的阅读了苹果的官方博客，且自己的练习总结，如果小伙伴们费了吃奶的劲还是看不懂，请找度娘谷歌，还是看不懂请到老码[官方微博](http://weibo.com/u/5241713117)咆哮。  

##### 本文由翻译自Apple Swift Blog ：[Interacting with C Pointers](https://developer.apple.com/swift/blog/?id=6)