# Access Control 权限控制的黑与白

> 翻译：[老码团队翻译组-Arya](http://weibo.com/littlekok/)
> 校对：[老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)

如果您之前没有接触过权限控制，先来听一个小故事：

>  小明是五道口工业学院的一个大一新生，最近他有点烦恼，因为同屋经常用他的热水壶，好像那是自己家的一样，可是碍于同学情面，又不好意思说。直到有一天，他和学姐小 K 吐槽。

>  学姐听了之后，说：大学集体生活里面，大部分东西都是默认室友可以共用的。如果你不想别人拿，我可以帮你做封印，只要打上 private 标记，它们就看不到你的东西，更加用不了你的东西了。

>  小明说哇靠学姐你还会妖法......

Swift 语言从 Xcode 6 beta 5 版本起，加入了对权限控制（Access Control）的支持。其实权限控制和小明的物品一样，你可以设定水壶是只有自己能用，还是只有宿舍里的人能用，还是全校都可以用。

从此以后，你可以好像神盾局局长一样，完全掌控自己的代码块的”保密级别“，哪些是只能在本文件引用，哪些能用在整个项目里，你还可以发挥大爱精神，把它开源成只要导入你的框架，大家都可以使用的 API。

这三种权限分别是：

- #####private 私有的

	在哪里写的，就在哪里用。无论是类、变量、常量还是函数，一旦被标记为私有的，就只能在定义他们的源文件里使用，不能为别的文件所用。

- #####internal 内部的

	标记为 internal 的代码块，在整个应用（App bundle）或者框架（framework）的范围内都是可以访问的。

- #####public 公开的

	标记为 public 的代码块一般用来建立 API，这是最开放的权限，使得任何人只要导入这个模块，都可以访问使用。

如果要把所有的爱加上一个期限，噢不，是给所有的代码块都标记上权限，不累死才怪。还好 swift 里面所有代码实体的默认权限，都是最常用的 internal。所以当你开发自己的 App 时，可能完全不用管权限控制的事情。

但当你需要写一个公开 API 的时候，就必须对里面的代码块进行“隐身对其可见”的 public 标记，要么其他人是用不到的。

Private（私有级别）的权限最严格，它可以用来隐藏某些功能的细节实现方式。合理构筑你的代码，你就可以安全地使用 extension 和高级功能，又不把它们暴露给项目内的其他文件。

除了可以给整个声明设权限，Swift 还允许大家在需要的时候，把某个属性（property）的取值权限比赋值权限设得更加开放。

#####举个例子：

```swift
	public class ListItem {

	// ListItem 这个类，有两个公开的属性
	public var text: String
	public var isComplete: Bool

	// 下面的代码表示把变量 UUID 的赋值权限设为 private，对整个 app 可读，但值只能在本文件里写入
	private(set) var UUID: NSUUID

	public init(text: String, completed: Bool, UUID: NSUUID) {
		self.text = text
		self.isComplete = completed
		self.UUID = UUID
	}

	// 这段没有特别标记权限，因此属于默认的 internal 级别。在框架目标内可用，但对于其他目标不可用
	func refreshIdentity() {
		self.UUID = NSUUID()
	}

	public override func isEqual(object: AnyObject?) -> Bool {
		if let item = object as? ListItem {
			return self.UUID == item.UUID
		}
		return false
		}
	}
```

当我们使用 Objective-C 和 Swift 混合开发时，需要注意：

- 如果你在写的是一个应用，Xcode 会生成一个头文件来保证两者的可互访性，而这个生成的头文件会包含 public 和 internal 级别的声明。

- 如果你的最终产品是一个 Swift 框架，头文件里只会出现标记为 public 级别的声明。（因为框架的头文件，属于公开的 Objective-C 接口的一部分，只有 public 部分对 Objective-C 可用。）

虽然 Swift 不推荐大家传播和使用第三方的框架，但对于建立和分享源文件形式的框架是支持的。对于需要写框架，方便应用与多个项目的开发者来说，要记得把 API 标记为 public 级别。

如果您想了解更多关于权限控制的内容，可以查看苹果官方最新的《The Swift Language》和《Using Swift with Cocoa and Objective-C》指南，
这两本指南在 iBooks 里面可以下载更新喔。

本文由翻译自 Apple Swift Blog ：https://developer.apple.com/swift/blog/?id=5
