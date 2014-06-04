《The Swift Programming Language》in chinese
=========================================

中文版Apple官方Swift教程《The Swift Programming Language》

# 在线阅读

使用Gitbook制作，可以直接[在线阅读](http://numbbbbb.github.io/the-swift-programming-language-in-chinese/)。

# 更新频率

由于我是利用业余时间翻译，所以速度有限。

不过我会保证每天至少1小时的翻译时间。

# 贡献力量

如果想做出贡献的话，你可以：

- 帮忙一起翻译
- 挑错别字、病句
- 提出修改建议

# 翻译建议

如果你愿意一起翻译的话，请仔细阅读：

- 使用markdown进行翻译，文件名必须使用英文，因为中文的话gitbook编译的时候会出问题
- 翻译后的文档请放到source文件夹下的对应章节中，然后pull request即可，我会用gitbook编译成网页
- 工作分支为gh-pages，用于GitHub的pages服务
- fork过去之后新建一个分支进行翻译，完成后pull request这个分支，没问题的话我会合并到gh-pages分支中
- 有其他任何问题都欢迎发issue，我看到了会尽快回复

谢谢！

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
