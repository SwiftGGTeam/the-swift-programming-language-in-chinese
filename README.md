《The Swift Programming Language》in Chinese
=============================================

中文版Apple官方Swift教程《The Swift Programming Language》

中文Swift社区[Swiftist](http://swiftist.org/)，新社区，正在建设中，感兴趣的朋友可以一起参与进来。

**如果想帮忙翻译或者校对，请加QQ群：364279588，谢谢！**

# 在线阅读

使用Gitbook制作，可以直接[在线阅读](http://numbbbbb.github.io/the-swift-programming-language-in-chinese/)。

# 电子书下载

CocoaChina精校PDF→[点我下载](http://vdisk.weibo.com/s/EhsPPzRRQ5CZ/1402621206)

其他格式可以通过PDF转换

# 当前阶段

文章已经全部翻译完成，当前阶段为自由校对阶段，可以随意提issue和pr。


# 译者记录

> 说明：翻译之前请先到PR列表中查看别人认领的内容，尽量不要重复，谢谢！

* 欢迎使用 Swift
   * 关于 Swift(完成 By numbbbbb)
   * Swift 初见(完成 By numbbbbb)
* Swift 教程
   * 基础部分(完成 By numbbbbb, lyuka, JaySurplus)
   * 基本操作符(完成 By @xielingwang)
   * 字符串和字符(完成 By @wh1100717)
   * 集合类型(完成)
   * 控制流(完成 By @vclwei, @coverxit, @NicePiao)
   * 函数(完成 By @honghaoz)
   * 闭包(完成 By @wh1100717)
   * 枚举(完成 By @yankuangshi)
   * 类和结构体(完成 By @JaySurplus)
   * 属性(完成 By @shinyzhu)
   * 方法(完成 By @pp-prog)
   * 下标(完成 By @siemenliu)
   * 继承(完成 By @Hawstein)
   * 构造过程(完成 By @lifedim)
   * 析构过程(完成)
   * 自动引用计数(完成 By @TimothyYe)
   * 可选链(完成)
   * 类型检查(完成 By @xiehurricane)
   * 嵌套类型(完成 By @Lin-H)
   * 扩展(完成 By @lyuka)
   * 协议(完成 By @geek5nan)
   * 泛型(完成 By @takalard)
   * 高级操作符(完成 By @xielingwang)
* 语言参考
   * 关于语言参考(完成 By @ChildhoodAndy)
   * 词法结构(完成 By @superkam)
   * 类型(完成 By @lyuka)
   * 表达式(完成 By @sg552 )
   * 语句(完成 By @coverxit)
   * 声明(完成 By @marsprince)
   * 特性(完成 By @Hawstein)
   * 模式(完成 By @honghaoz)
   * 泛型参数(完成 By @fd5788)
   * 语法总结(完成 By @StanZhai)

# 贡献力量

如果想做出贡献的话，你可以：

- 帮忙校对，挑错别字、病句等等
- 提出修改建议
- 提出术语翻译建议

# 翻译建议

如果你愿意一起校对的话，请仔细阅读：

- 使用markdown进行翻译，文件名必须使用英文，因为中文的话gitbook编译的时候会出问题
- 翻译后的文档请放到source文件夹下的对应章节中，然后pull request即可，我会用gitbook编译成网页
- 工作分支为gh-pages，用于GitHub的pages服务
- fork过去之后新建一个分支进行翻译，完成后pull request这个分支，没问题的话我会合并到gh-pages分支中
- 有其他任何问题都欢迎发issue，我看到了会尽快回复

谢谢！

# 关于术语

翻译术语的时候请参考这个流程：

- 尽量保证和已翻译的内容一致
- 尽量先搜索，一般来说编程语言的大部分术语是一样的，可以参考[微软官方术语搜索](http://www.microsoft.com/Language/zh-cn/Search.aspx)
- 如果以上两条都没有找到合适的结果，请自己决定一个合适的翻译或者直接使用英文原文，后期校对的时候会进行统一

# 参考流程

有些朋友可能不太清楚如何帮忙翻译，我这里写一个简单的流程，大家可以参考一下：

1. 首先fork我的项目
2. 把fork过去的项目也就是你的项目clone到你的本地
3. 在命令行运行 `git branch develop` 来创建一个新分支
4. 运行 `git checkout develop` 来切换到新分支
5. 运行 `git remote add upstream https://github.com/numbbbbb/the-swift-programming-language-in-chinese.git` 把我的库添加为远端库
6. 运行 `git remote update`更新
7. 运行 `git fetch upstream gh-pages` 拉取我的库的更新到本地
8. 运行 `git rebase upstream/gh-pages` 将我的更新合并到你的分支

这是一个初始化流程，只需要做一遍就行，之后请一直在develop分支进行修改。

如果修改过程中我的库有了更新，请重复6、7、8步。

修改之后，首先push到你的库，然后登录GitHub，在你的库的首页可以看到一个 `pull request` 按钮，点击它，填写一些说明信息，然后提交即可。


# 开源协议
基于[WTFPL](http://en.wikipedia.org/wiki/WTFPL)协议开源。
