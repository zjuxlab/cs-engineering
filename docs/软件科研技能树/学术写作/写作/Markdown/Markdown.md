---
title: Markdown
slug: Markdown
sidebar_position: 1
---


# Markdown

Author：NA

```text
# Markdown 纯文本基本语法

### 1. 标题

Markdown 支持两种标题的语法，类 Setext 和类 atx 形式。 类 Setext 形式是用底线的形式，利用 = （最高阶标题）和 - （第二阶标题），例如：

```text
This is an H1
=======

This is an H2
----------
```

效果如下：

This is an H1
======

This is an H2
------

任何数量的 = 和 - 都可以有效果。

> 这里需要注意一点，由于分割线也是 “----”， 因此在使用分割线时，一定要空一行，不然会把上方的文字识别为第二阶标题。

类 Atx 形式则是在行首插入 1 到 6 个 # ，对应到标题 1 到 6 阶，例如：

```text
# this is H1
## this is H2
###### this is H6
```

一般在 # 后跟个空格再写文字，不然可能会无法识别。

### 2. 字体

Markdown 使用星号（\*）和下划线（_）作为标记强调字词的符号，你可以随便用你喜欢的样式，唯一的限制是，你用什么符号开启标签，就要用什么符号结束。示例：

```text
**这是加粗**
__这也是加粗__
*这是倾斜*
_这也是倾斜_
***这是加粗倾斜***
~~这是加删除线~~
```

效果如下： **这是加粗** **这也是加粗** *这是倾斜* *这也是倾斜*

***这是加粗倾斜*** ~~这是加删除线~~

注意：强调也可以直接插在文字中间，但是如果你的 \* 和 _ 两边都有空白的话，它们就只会被当成普通的符号。 如果要在文字前后直接插入普通的星号或底线，你可以用反斜线 \ 来转义。

### 3. 分割线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

```text
* * *
***
**********
- - -
_________________
```

效果如下：

------

------

------

------

------

### 4. 引用

在引用的文字前加 > 即可：

```text
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
```

效果如下：

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing. 

区块引用可以嵌套（例如：引用内的引用），只要根据层次加上不同数量的 > ：

```text
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.
```

效果如下：

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等。

### 5. 列表

Markdown 支持有序列表和无序列表。 无序列表使用星号、加号或是减号作为列表标记。 示例：

```text
- 列表内容
+ 列表内容
* 列表内容

注意：- + * 跟内容之间都要有一个空格
```

效果如下：

- 列表内容
+ 列表内容
* 列表内容

有序列表则使用数字接着一个英文句点作为标记。 示例：

```text
1. 列表内容
2. 列表内容
3. 列表内容

注意：序号跟内容之间要有空格
```

效果如下： 1. 列表内容 2. 列表内容 3. 列表内容

*很重要的一点是，你在列表标记上使用的数字并不会影响输出的 HTML 结果。*

```text
你的标记写成：
1.  Bird
1.  McHale
1.  Parish

甚至：

8. Bird
1. McHale
4. Parish

效果都一样。
```

效果如下：

你的标记写成：

1. Bird
1. McHale
1. Parish

甚至：

1. Bird
2. McHale
3. Parish

效果都一样。

列表都可以嵌套，缩进不同即可。

```text
* 一级无序列表内容
   * 二级无序列表内容
   * 二级无序列表内容
   * 二级无序列表内容
```

效果如下： 

- 一级无序列表内容
  - 二级无序列表内容
  - 二级无序列表内容
  - 二级无序列表内容

要让列表看起来更漂亮，你可以把内容用固定的缩进整理好：

```text
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing
```

效果如下： *Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.* Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscin

有一种偷懒的写法也可以：

```text
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
```

效果如下： 

* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

* Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.

列表项目可以包含多个段落，每个项目下的段落都必须缩进等量的空格：

```text
1. This is a list item with two paragraphs. Lorem ipsum dolor
   sit amet, consectetuer adipiscing elit. Aliquam hendrerit
   mi posuere lectus.

   Vestibulum enim wisi, viverra nec, fringilla in, laoreet
   vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
   sit amet velit.

2. Suspendisse id sem consectetuer libero luctus adipiscing.
```

效果如下： 

1. This is a list item with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.

   Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

2. Suspendisse id sem consectetuer libero luctus adipiscing.

如果你每行都有缩进，看起来会看好很多，当然，再次地，如果你很懒惰，Markdown 也允许：

```text
*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.
```

效果不再展示。 此外： *如果要在列表项目内放进引用，那 > 就需要缩进，* 如果要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符。

### 6. 表格

示例：

```text
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略
```

效果如下：

表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

### 7. 代码

在 Markdown 中加入代码块有两种方式： 第一种，只要简单地缩进 4 个空格或是 1 个制表符就可以，

```text
这是一个普通段落：

    这是一个代码区块。

(当然，前面要有一个空行和前面的文字分隔开)
```

效果如下：

这是一个普通段落：

```text
这是一个代码区块。
```

第二种方法似乎是更为常用，将代码用一对反引号包起来即可：

```text
这里有一句代码`代码内容`。
```

效果如下： 这里有一句代码`代码内容`。

**代码块**：代码之间分别用三个反引号包起来，且两边的反引号单独占一行

~~~markdown
```
代码...
  代码...
 代码...
```
~~~

效果如下：

```text
代码...
  代码...
 代码...
```

还可以在上面的 ``` 后面注明你的代码类型，可以产生相应的代码高亮：

```cpp
int main(int argc, char* argv) {}
```

### 8. 段落和换行

一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行（空行的定义是显示上看起来像是空的，便会被视为空行。比方说，若某一行只包含空格和制表符，则该行也会被视为空行）。普通段落不该用空格或制表符来缩进。 **我们在两个不同的文字块之间，一定要空行以示区分，不然就会被归入同一文字块中。** Markdown 允许段落内的强迫换行（插入换行符）。 如果想要空一行，在插入处先按入两个以上的空格然后回车即可。

### 9. 超链接

Markdown 支持两种形式的链接语法： 行内式和参考式两种形式。

不管是哪一种，链接文字都是用 [方括号] 来标记。

要建立一个**行内式**的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，注意方括号和圆括号之间一定不能有空格，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如：

```text
This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.
```

效果如下： This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

**参考式**的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：

```text
This is [an example][id] reference-style link.
```

接着，在文件的任意处，你可以把这个标记的链接内容定义出来:

```text
[id]: http://example.com/  "Optional Title Here"
```

`id` 可以有字母、数字、空白和标点符号，但是并不区分大小写。

链接的定义可以放在文件中的任何一个地方，建议放在链接出现的段落结束之后，也可以放在整个文件的最后。

此外，用这个方法还可以将图片转化为 base64 编码保存在.md 文件中，这将在插入图片中介绍。

下面是一个参考式链接的范例：

```text
I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"
```

还可以直接用链接名称的方式写：

```text
I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"
```

要知道，参考式的链接其实重点不在于它比较好写，而是它比较好读。 使用 Markdown 的参考式链接，可以让文件更像是浏览器最后产生的结果，让你可以把一些标记相关的元数据移到段落文字之外，你就可以增加链接而不让文章的阅读感觉被打断。

### 10. 自动链接

除了上面的超链接方式，Markdown 还支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用尖括号包起来， Markdown 就会自动把它转成链接。 语法：

```text
<https://example.com/>
```

效果如下：

<https://example.com/>

### 11. 插入图片

很明显地，要在纯文字应用中设计一个「自然」的语法来插入图片是有一定难度的。 Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式： **行内式**和**参考式**。

**行内式**的图片语法看起来像是：

```text
![Alt pic](/path/to/img.jpg)
![Alt pic](/path/to/img.jpg "Optional title")
```

**参考式**的图片语法则长得像这样：

```text
![Alt pic][id]
```

图片参考的定义方式则和链接参考一样：

```text
[id]: url/to/image  "Optional title attribute"
```

### 12. 调整图片格式

到目前为止， Markdown 还没有办法直接指定图片的宽高，如果需要的话，则可以使用普通的 `<img>` 标签：

```text
<img src="..." width="100" height="100" />
```

## 二、Markdown 纯文本进阶语法

### 1. 按键

```text
<kbd>Space</kbd>
```

效果：

<kbd>Space</kbd>

### 2. 高亮文字

```text
==高亮==
```

效果：

==高亮==

### 3. 目录

```
[TOC]
```

### 4. 上下标

```text
H~2~O  CO~2~
爆米^TM^
```

效果如下：

H~2~O CO~2~ 爆米^TM

### 5. 数学公式

语法基于 LaTeX / MathJax / KaTeX：

```
$ E = mc^2 $

$$
E = mc^2
$$
```

效果：

$ E = mc^2 $

$$
E = mc^2
$$
```

