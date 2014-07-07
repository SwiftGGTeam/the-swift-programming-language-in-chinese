> 翻譯：[dabing1022](https://github.com/dabing1022)  
> 校對：[numbbbbb](https://github.com/numbbbbb)


# 關於語言附註
-----------------

本頁內容包括：

- [如何閱讀語法](#how_to_read_the_grammar)

本書的這一節描述了Swift編程語言的形式語法。這裡描述的語法是為了幫助您更詳細的瞭解該語言，而不是讓您直接實現一個解析器或編譯器。


Swift語言相對小點，這是由於在Swift代碼中幾乎無處不在的許多常見的的類型，函數以及運算符都由Swift標準庫來定義。雖然這些類型，函數和運算符不是Swift語言本身的一部分，但是它們被廣泛用於這本書的討論和代碼範例。

<a name="how_to_read_the_grammar"></a>
## 如何閱讀語法

用來描述Swift編程語言形式語法的記法遵循下面幾個約定：

-](https://github.com/numbbbbb)箭頭（→）用來標記語法產式，可以被理](https://github.com/numbbbbb)解為「可以包含」。
-  句法範疇由*斜體*文字表示，並出現在一個語法產式規則兩側。
-  義詞和標點符號由粗體固定寬度的文本顯示和只出現在一個語法產式規則的右邊。
-  選擇性的語法產式由豎線（|）分隔。當可選用的語法產式太多時，為了閱讀方便，它們將被拆分為多行語法產式規則。
-  在少數情況下，常規字體文字用來描述語法產式規則的右邊。
-  可選的句法範疇和文字用尾標`opt`來標記。

舉個例子，getter-setter的語法塊的定義如下：

> GRAMMAR OF A GETTER-SETTER BLOCK  
> *getter-setter-block* → {- [*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) [-*setter-clause*-](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)*opt* -}- | {- [*setter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) [-*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause)-}-

這個定義表明，一個getter-setter方法□□塊可以由一個getter子句後跟一個可選的setter子句構成，用大括號括起來，或者由一個setter子句後跟一個getter子句構成，用大括號括起來。上述的文法產生等價於下面的兩個產生，明確闡明如何二中擇一：

> GRAMMAR OF A GETTER-SETTER BLOCK  
> getter-setter-block → {- [*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) [*-setter-clause*-](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)*opt* -}--  
> getter-setter-block → {- [*setter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) [*-getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause)-}-
