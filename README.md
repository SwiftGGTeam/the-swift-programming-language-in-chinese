《The Swift Programming Language》in Chinese
=============================================

中文版Apple官方Swift教程《The Swift Programming Language》

中文Swift社区[Swiftist](http://swiftist.org/)，新社区，正在建设中，感兴趣的朋友可以一起参与进来。

**如果想帮忙翻译或者校对，请加QQ群：364279588，谢谢！**

# 在线阅读

使用Gitbook制作，可以直接[在线阅读](http://numbbbbb.github.io/the-swift-programming-language-in-chinese/)。


# 翻译进度

> 说明：翻译之前请先到PR列表中查看别人认领的内容，尽量不要重复，谢谢！

* 欢迎使用 Swift
   * 关于 Swift(完成 By numbbbbb)
   * Swift 初见(完成 By numbbbbb)
* Swift 教程
   * 基础部分(完成 By numbbbbb, lyuka, JaySurplus)
   * 基本操作符(完成 By @xielingwang)
   * 字符串和字符(完成 By @wh1100717)
   * 集合类型(@WilliamZang 认领)
   * 控制流(@vclwei 认领)
   * 函数(@honghaoz 认领)
   * 闭包(完成 By @wh1100717)
   * 枚举(@yankuangshi 认领)
   * 类和结构体(@JaySurplus 认领)
   * 属性(@shinyzhu 认领)
   * 方法(@pp-prog 认领)
   * 下标(@siemenliu 认领)
   * 继承(@awstein 认领)
   * 构造过程(@lifedim 认领)
   * 析构过程(认领)
   * 自动引用计数(@TimothyYe 认领)
   * 可选链(认领)
   * 类型检查
   * 嵌套类型(完成 By @Lin-H)
   * 扩展
   * 接口
   * 泛型(完成 By @takalard)
   * 高级操作符
* 语言参考
   * 关于语言参考(完成 By @ChildhoodAndy)
   * 词法结构
   * 类型
   * 表达式(@sg552 认领)
   * 声明
   * 属性
   * 模式
   * 泛型参数
   * 语法总结

# 更新频率

由于我是利用业余时间翻译，所以速度有限。

不过我会保证每天至少1小时的翻译时间。


# 贡献力量

如果想做出贡献的话，你可以：

- 帮忙一起翻译
- 帮忙校对，挑错别字、病句等等
- 提出修改建议
- 提出术语翻译建议

# 翻译建议

如果你愿意一起翻译的话，请仔细阅读：

- 使用markdown进行翻译，文件名必须使用英文，因为中文的话gitbook编译的时候会出问题
- 翻译后的文档请放到source文件夹下的对应章节中，然后pull request即可，我会用gitbook编译成网页
- 工作分支为gh-pages，用于GitHub的pages服务
- fork过去之后新建一个分支进行翻译，完成后pull request这个分支，没问题的话我会合并到gh-pages分支中
- 有其他任何问题都欢迎发issue，我看到了会尽快回复
- **尽早pull request**，你不必翻译完整篇文章再pr，完全可以翻译完一段就pr一次，这样别的朋友可以及时看到你的进度，避免多人翻译同一段。此外，尽早pr也可以让校对的朋友们更早看到新内容，更快发现问题
- 一定要记得**先查看当前的pr**再开始翻译，防止重复翻译
- 我已经提前把所有章节的markdown文件都创建好了，翻译的时候直接写入对应文件即可

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
6. 运行 `git fetch upstream gh-pages` 拉取我的库的更新到本地
7. 运行 `git rebase upstream/gh-pages` 将我的更新合并到你的分支

这是一个初始化流程，只需要做一遍就行，之后请一直在develop分支进行翻译。

如果翻译过程中我的库有了更新，请重复6、7步。

翻译完成之后，首先push到你的库，然后登录GitHub，在你的库的首页可以看到一个 `pull request` 按钮，点击它，填写一些说明信息，然后提交即可。


# 开源协议
基于[WTFPL](http://en.wikipedia.org/wiki/WTFPL)协议开源。
