---
title: Beautiful Soup
slug: Beautiful Soup
sidebar_position: 1
---


# Beautiful Soup

Author：刘心源

> Author: Last modification: 2022.11.04

Beautiful Soup是一个从HTML或XML文件中提取数据的Python库，官方[中文文档](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/)写得很好

因为大部分内容还是看示例比较方便，所以代码块里的东西其实比文字还重要（其实就是写文档的人语文不好，读文字可能会有不适x

### 前置知识

一点点前端知识（HTML+CSS）

子节点：本文中的子节点均指所有的子孙节点，直接子节点会特殊说明

### 安装

安装时请注意安装`beautifulsoup4`

如果想要解析XML还需要手动安装`lxml`解析器（官方推荐使用`lxml`，即使解析HTML也可以安装）。

## 快速上手（bushi

### 对象

BS里的所有操作几乎都是围绕标签进行的，标签在BS中以一个标签对象(tag)的形式保存。BS会将一个HTML文件转换成一个树形结构，树上的节点基本都是HTML中的标签。整个HTML文档是一个`BeautifulSoup`对象，其被视为一个叫做`[document]`的标签。比较特殊的是字符串和注释，包含在标签内的字符串被视为一个`NavigableString`对象（当然，这不是标签，但这一定是树的一个叶子节点），而注释则是一种特殊的字符串x

访问一个节点的子节点的最简单的方式就是通过标签的名字

如果一个节点<b>只有一个</b>`NavigableString`类型的子节点，那么可以通过`.string`来得到子节点

再次强调：这里的“子节点”指的是所有的子孙节点，如果一个节点有多个`NavigableString`类型的子节点，`.string`会返回`None`

```py
soup = BeautifulSoup('<a class="channel-link" href="//www.bilibili.com/anime/" >番剧</a>')
tag = soup.a
tag.string
# '番剧'

tag.name
# 'a'
tag['class']
# 'channel-link'
```

我们将仅包含一个非常普通的`<a>`标签的文档传入构造方法得到一个`BeautifulSoup`对象。通过`soup.a`来获得<b>一个</b>`tag`对象。

这个对象的`name`是`a`（前文中提到的`BeautifulSoup`对象的`name`是`[document]`），标签的属性的操作方式和字典一样（如上方代码中的`class`）。

也可以直接通过`.`的方式来取属性

```py
tag.attrs
# {'class': ['channel-link'], 'href': '//www.bilibili.com/anime/'}
```

tag的属性可以被增删改查

tips：把多值属性改为单值是被允许的，但最好不要这么干（来自一个被小坑了一下的孩子

```py
tag['qwq'] = 'qaq'
del tag['href']
tag['class'] = ['first', 'second']
tag
# <a class="first second" href="//www.bilibili.com/anime/" qwq="qaq">番剧</a>
```

多值属性以切片的形式表达

### 遍历

使用子节点的名字可以获得<b>一个</b>子节点，如使用`soup.a`获得第一个`<a>`标签（对象）

如果想获得子节点中所有的`<a>`标签，应该使用`soup.find_all('a')`

通过`.children`生成器可以对<b>直接子节点</b>进行循环，`.descendants`可以对所有子孙节点进行循环。

`.strings`可以对所有字符串子节点进行循环，`.stripped_strings`跳过全是空格的行和段首段末空白。

类似的，`.parent`为父节点，`.parents`对所有父辈节点进行循环。

`.next_sibling`和`.previous_sibling`为兄弟节点（顺序为解析的顺序），`.next_siblings`和`.previous_siblings`对兄弟节点进行循环。

`.next_element`和`.previous_element`为下一个/上一个被解析的对象，同样也有`.next_elements`和`.previous_elements`

[更加细节的解释](https://xn4zlkzg4p.feishu.cn/wiki/wikcnXai8AC6GAc3q0vqS8Vq7Lx#doxcnakMKskg6QsUGA3drAuuWUc)

### 搜索

BeautifulSoup最重要的功能当然是搜索！

搜索是围绕过滤器进行的，过滤器可以被用在tag的name中、节点的属性中、字符串中或他们的混合中。过滤器可以是字符串、正则表达式、列表。如果没有合适的过滤器，甚至可以自定义匹配方法，传入一个tag节点，返回是否匹配。

下一小节中将会给出所有过滤器的使用示例。

字符串过滤器会搜索与字符串<b>完整匹配</b>的内容，正则表达式则会使用`re.search`来匹配，传入列表则会匹配任一元素，`True`可以匹配任何值（雾），自定义的方法传入一个元素参数并返回是否匹配。

#### `find`系列函数

搜索时使用的函数一般是`find`系列，一个典型的函数如下：

```
find_all(name, attrs, recursive, string, **kwargs)
```

搜索当前标签对象的<b>所有子孙节点</b>，如果只想搜索直接子节点，可以使用参数`recursive=False`。

`name`参数

按过滤器搜索所有名字符合`name`<b>过滤器</b>的tag，忽略所有的字符串对象。

```py
for tag in soup.find_all(re.compile("^b")):
    print(tag.name)
# body
# b
for tag in soup.find_all("b"):
    print(tag.name) 
# b
for tag in soup.find_all([re.compile("^b"), "head"]):
    print(tag.name)
# head
# body
# b
for tag in soup.find_all(lambda tag : len(tag.name) < 3):  
    print(tag.name)
<em># p
# b
# p
# a
# a
# a
</em><em># p</em>
```

`stirng`参数

按过滤器搜索文档中包含在标签内的字符串内容，可以与`name`参数同时使用来过滤tag。

```py
a_string = soup.find(string="番剧")
a_string
# '番剧'
```

`limit`参数

搜索得到的结果数达到`limit`时停止搜索并返回

`keyword`参数

内置参数名以外的参数用来搜索tag的属性，比如下方的代码搜索tag的`href`属性为b站视频链接。

```py
soup.find_all(href=re.compile(r'www\.bilibili\.com/video/BV\w+'))
```

利用`True`可以实现一些特定的搜索，比如使用`id=True`可以搜索所有包含`id`属性的对象。

可以使用`attrs`参数来定义一个字典参数来搜索包含特殊属性的tag，比如data-*类的属性直接使用会报错。

由于`class`为保留字，搜索CSS类名时应当使用`class_`

注意类名是一个多值属性，搜索多值属性时，若仅传入一个筛选器且字符串中不含空格，则对象中任意一个类名符合筛选器都将视为符合条件。若传入一个用空格隔开的字符串，则会进行完全匹配，<b>如果类名的顺序与传入的顺序不符，也视为不匹配。</b>

```py
# soup =    <p class="qwq1 qwq2"> qwq </p>
#           <p class="qwq1"> qwq1 </p>
#           <p class="qwq2"> qwq2 </p>
soup.find_all(class_="qwq1")
# [<p class="qwq1 qwq2"> qwq </p>, <p class="qwq1"> qwq1 </p>]
soup.find_all(class_=re.compile('qwq'))
# [<p class="qwq1 qwq2"> qwq </p>, <p class="qwq1"> qwq1 </p>, <p class="qwq2"> qwq2 </p>]
soup.find_all(class_="qwq1 qwq2")
# [<p class="qwq1 qwq2"> qwq </p>]
soup.find_all(class_="qwq2 qwq1")
# []
```

由于`find_all`过于常用，`Beautiful Soup`定义了其简写方法。调用对象的`find_all`方法时可以将其省略。即以下写法等价：

```py
soup.title.find_all(string=True)
soup.title(string=True)
```

<b>基本所有find系列的函数都支持上面提到的参数。</b>

`find`函数：返回符合条件的第一个对象，找不到则返回None

`find_parents() find_parent()`：搜索所有父辈节点

`find_next_siblings() find_next_sibling() find_previous_siblings() find_previous_sibling()`：搜索在tag后面/前面的<b>兄弟节点</b>。

`find_all_next() find_next() find_all_previous() find_previous()`：搜索在tag后面/前面解析的<b>所有节点</b>。

[节点关系可以参考](https://xn4zlkzg4p.feishu.cn/wiki/wikcnXai8AC6GAc3q0vqS8Vq7Lx#doxcnakMKskg6QsUGA3drAuuWUc)

### CSS选择器

除了使用find系列的函数，还可以使用`.select()`，它支持大部分的[CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp)。

简单的CSS选择器如下：

<table>
<colgroup>
<col width="244"/>
<col width="244"/>
<col width="244"/>
</colgroup>
<tbody>
<tr><td><p>选择器</p></td><td><p>例子</p></td><td><p>例子描述</p></td></tr>
<tr><td><p>.class</p></td><td><p>.intro</p></td><td><p>选取所有 class=&quot;intro&quot; 的元素。</p></td></tr>
<tr><td><p>#id</p></td><td><p>#firstname</p></td><td><p>选取 id=&quot;firstname&quot; 的那个元素。</p></td></tr>
<tr><td><ul>
<li></li>
</ul></td><td><ul>
<li></li>
</ul></td><td><p>选取所有 &lt;p&gt; 元素。</p></td></tr>
<tr><td><p>element</p></td><td><p>p</p></td><td><p>选取所有 &lt;p&gt; 元素。</p></td></tr>
<tr><td><p>element,element,..</p></td><td><p>div, p</p></td><td><p>选取所有 &lt;div&gt; 元素和所有 &lt;p&gt; 元素。</p></td></tr>
</tbody>
</table>

使用CSS选择器非非非常地方便，如果不熟悉CSS选择器，或许可以去知识树里的CSS selector这一部分看看

或者用这个速成：

（说真的，感觉仅仅使用CSS选择器、正则和Xpath就能完成大部分的搜索需求了

### 部分解析

如果我们只关心文档中的一部分，那么解析整个文档显然是很浪费时间的，我们就可以使用SoupStrainer进行部分解析

以与`find_all`函数类似的参数创建一个SoupStrainer对象，创建BeautifulSoup对象时作为`parse_only`传入即可

```py
only_a_tags = SoupStrainer("a")

only_tags_with_id_link2 = SoupStrainer(id="link2")

def is_short_string(string):
    return len(string) < 10

only_short_strings = SoupStrainer(string=is_short_string)
html_doc = """
<html><head><title>The Dormouse's story</title></head>
    <body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""

print(BeautifulSoup(html_doc, "html.parser", parse_only=only_a_tags).prettify())
# <a class="sister" href="http://example.com/elsie" id="link1">
#  Elsie
# </a>
# <a class="sister" href="http://example.com/lacie" id="link2">
#  Lacie
# </a>
# <a class="sister" href="http://example.com/tillie" id="link3">
#  Tillie
# </a>

print(BeautifulSoup(html_doc, "html.parser", parse_only=only_tags_with_id_link2).prettify())
# <a class="sister" href="http://example.com/lacie" id="link2">
#  Lacie
# </a>

print(BeautifulSoup(html_doc, "html.parser", parse_only=only_short_strings).prettify())
# Elsie
# ,
# Lacie
# and
# Tillie
# ...
#
```

### 修改

我不是很理解为什么一个用于解析HTML内容的库会有修改文档树的需求（

[TODO]

### 输出

`.prettify()`格式化后以Unicode编码输出（每个节点占一行），想使用其他编码方式可以直接把编码方式传入。使用`str()`方法不格式化而只获得字符串，如果只想得到文本内容可以使用`.get_text()`。

### 编码

编码是一件非常重要的事，某些网站的编码十分混乱。幸运的是，`Beautiful soup`拥有编码[自动检测](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/#unicode-dammit)功能，实测非常好用。

所以，直接把response的content传入BeautifulSoup即可，无需传入text

## 详细学习（其实就是一些坑

### 非标准格式的HTML

```py
soup = BeautifulSoup('<a class="channel-link" href="//www.bilibili.com/anime/" >番剧</a>')
```

在文章的开头有这样一行看起来平平无奇的代码，我们从来没有讨论过soup里面到底有什么，我们只知道它一定有一个子节点，那个子节点就是我们传入的这个标签。

事实上，如果你尝试使用查看里面的内容，就会发现神奇的事情。

```py
soup = BeautifulSoup('<a class="channel-link" href="//www.bilibili.com/anime/" >番剧</a>', 'html.parser')
print(soup.prettify())
# <a class="channel-link" href="//www.bilibili.com/anime/">
# 番剧
# </a>

soup = BeautifulSoup('<a class="channel-link" href="//www.bilibili.com/anime/" >番剧</a>', 'lxml')
print(soup.prettify())
# <html>
#  <body>
#   <a class="channel-link" href="//www.bilibili.com/anime/">
#    番剧  
#   </a>
#  </body>
# </html>

soup = BeautifulSoup('<a class="channel-link" href="//www.bilibili.com/anime/" >番剧</a>', 'html5lib')
print(soup.prettify())
# <html>
#  <head>
#  </head>
#  <body>
#   <a class="channel-link" href="//www.bilibili.com/anime/">
#    番剧  
#   </a>
#  </body>
# </html>
```

是的，三个解析器给出了三个结果……

所以最好保证扔进BeautifulSoup里的是一个标准格式的HTML

如果想要仅解析HTML里的一部分，可以使用[SoupStrainer](https://xn4zlkzg4p.feishu.cn/wiki/wikcnXai8AC6GAc3q0vqS8Vq7Lx#doxcnoCcauAYsOiEKY9IweIQ4Wd)

### 节点关系详解

查看节点间关系最快的方式就是调用`.prettify()`，可以迅速可视化节点之间的关系。

以官网中的这段文档为例：

```py
html_doc = """
<html><head><title>The Dormouse's story</title></head>
    <body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""
soup = BeautifulSoup(html_doc)
print(soup.prettify())
```

我们可以拿到下面的输出，图中节点间的父子、兄弟关系一目了然

```html
<html>
 <head>
  <title>
   The Dormouse's story
  </title>
 </head>
 <body>
  <p class="title">
   <b>
    The Dormouse's story
   </b>
  </p>
  <p class="story">
   Once upon a time there were three little sisters; and their names were
   <a class="sister" href="http://example.com/elsie" id="link1">
    Elsie
   </a>
   ,
   <a class="sister" href="http://example.com/lacie" id="link2">
    Lacie
   </a>
   and
   <a class="sister" href="http://example.com/tillie" id="link3">
    Tillie
   </a>
   ;
and they lived at the bottom of a well.
  </p>
  <p class="story">
   ...
  </p>
 </body>
</html>
```

图中title节点的直接父节点为`<head>`，父辈节点还有`<html>`和`[document]`（整个HTML文档是一个`BeautifulSoup`对象，其被视为一个叫做`[document]`的标签）

```py
title = soup.title
title.parent
# <head><title>The Dormouse's story</title></head>

for parent in title.parents:
        print(parent.name)
# head
# html
# [document]
```

直接父节点相同的节点为兄弟节点，兄弟节点之间的顺序即为出现的顺序。注意：从图中应该就可以看出，`link2`的`next_sibling`并非`link3`而是其后的字符串！

```py
link2 = soup.find(id='link2')
link2.next_sibling
#' and\n'
linl2.next_sibling.next_sibling
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>

for sibling in link2.next_siblings:
     print(repr(sibling))
# ' and\n'
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
# ';\nand they lived at the bottom of a well.'
```

解析的顺序应该就是dfs序

```py
for element in link2.next_elements:
     print(repr(element))
# 'Lacie'
# ' and\n'
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
# 'Tillie'
# ';\nand they lived at the bottom of a well.'
# '\n'
# <p class="story">...</p>
# '...'
# '\n'
```

`.strings`会获得大量的空白内容（所有的字符串都是叶子节点，即使它只有一个\n

```py
for string in soup.strings:
     print(repr(string))
# "The Dormouse's story"
# '\n'
# '\n'
# "The Dormouse's story"
# '\n'
# 'Once upon a time there were three little sisters; and their names were\n'
# 'Elsie'
# ',\n'
# 'Lacie'
# ' and\n'
# 'Tillie'
# ';\nand they lived at the bottom of a well.'
# '\n'
# '...'
# '\n'
```

这里有一件非常离谱的事情，不同的解析器对连续换行符的处理也是不一样的，比如我们规定使用html5lib，得到的就是这个：

```
"The Dormouse's story"
'\n    '
'\n'
"The Dormouse's story"
'\n\n'
'Once upon a time there were three little sisters; and their names were\n'
'Elsie'
',\n'
'Lacie'
' and\n'
'Tillie'
';\nand they lived at the bottom of a well.'
'\n\n'
'...'
'\n'
```

所以还是用`.stripped_strings`吧

```py
for string in soup.stripped_strings:
     print(repr(string))
# "The Dormouse's story"
# "The Dormouse's story"
# 'Once upon a time there were three little sisters; and their names were'
# 'Elsie'
# ','
# 'Lacie'
# 'and'
# 'Tillie'
# ';\nand they lived at the bottom of a well.'
# '...'
```

### 我乱码了（dammit！）

如果在使用时发现有乱码，首先应检查是否为爬虫发送的请求被网站识别出了。尤其注意Cloudflare提供的反爬界面。解决cloudflare：https://github.com/VeNoMouS/cloudscraper

```py
SESSION = requests.Session()
# Bypass Cloudflare
scraper = cloudscraper.create_scraper(sess=SESSION)
```

之后的请求从`scraper`发出即可，像这样：`r = scraper.get(url)`

