---
title: DOM
slug: DOM
sidebar_position: 1
---


# DOM

Author:李宇轩

# DOM是什么？

## 前言

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[65%]" width-ratio="65">
<p>JavaScript 语言最初是为 Web 浏览器创建的。一个运行JS的平台提供的功能，被称为主机环境。主机环境提供了自己的对象和语言核心以外的函数。Web 浏览器提供了一种控制网页的方法。Node.JS 提供了服务器端功能，等等。</p>
<p>右图为JavaScript在浏览器中运行时的示意图。</p>
<p>根对象称为<code>window</code>，它是JS代码的<a href="https://zh.javascript.info/global-object">全局对象</a>（全局变量是它的属性，function定义的函数是它的方法，标签的id值会成为它的属性……），同时也代表了“浏览器窗口”，提供相应的属性和方法（如窗口高度等）。</p>
</div>
<div class="w-[34%]" width-ratio="34">
![](/assets/PT3Wbs25qom0rJxRXsWcTG2WnWd.png)
</div>
</div>

## DOM和浏览器

DOM（Document Object Model），又称文档对象模型，将所有页面内容表示为可以修改的对象，每个文档被表示为一个DOM树（node tree）。在浏览器开发者工具中，元素选项卡下，就是DOM（经过简化的，突出元素节点）。旁边侧栏也有关于样式，事件等栏。

![](/assets/FbNubPOazok877xs5Xtc1uRUnoc.png)

浏览器对象模型（Browser Object Model），简称 BOM，表示由浏览器（主机环境）提供的用于处理文档(document)之外的所有内容的其他对象。

## DOM定义

DOM是将一个HTML的编程接口，将一个HTML文件表示为由节点组成的<b>树状结构。</b>树的每一个节点都是一个JS对象，节点有[不少种类](https://dom.spec.whatwg.org/#node)，但是较常用的有四种：document，注释，<b>标签节点和文本节点</b>。其中document是文档的入口点，注释则可以通过JS在其中读取信息。标签节点由标签包含关系形成了树状结构，如`<head>`和`<body>`是`<html>`子项；文本节点则记录了所有的文本（包括换行，注释），并且没有子项（总是树的叶子）。<b>HTML中所有的东西都在DOM中有自己的位置。</b>

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
<pre><code class="language-html">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;About elk&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  The truth about elk.
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/Sm9qb7IK2o2P1CxDkBCcNZsAn6f.png)
</div>
</div>

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'></div>
<p>注意</p>
<ul>
<li><p>表格永远会有&lt;tbody&gt;标签，即使没有在HTML文本中创建。</p>
</li>
<li><p>即使所有空格或者换行都会被记录在文本节点中，但浏览器通常不会在文本的开始/结尾显示空格，并且在标签之间也不会显示空文本节点（换行符）。</p>
</li>
<li><p>浏览器在生成DOM时会自动处理一些小问题，如没有关闭标签，省略部分标签等。</p>
</li>
</ul>
</div>

# DOM结构

对于DOM中的多种多样的元素，每种元素有一些不同的属性，如标签 `<a>` 相对应的元素节点具有链接相关的属性；但所有这些标签对应的DOM节点，也有共有的属性和方法。我们先从诸多DOM节点的那些属性是从哪里继承来的开始，构建一个抽象的层次结构。

## 抽象DOM层次结构

![](/assets/UIkmbGTuyoAizCxitoSc8Lh9n8g.png)

通过原型链查找，可以获得一个类继承的层次结构。各个节点拥有的属性和方法，都是继承链的结果。

- `EventTarget` —— 是一切的根“抽象（abstract）”类。
    该类的对象从未被创建。它作为一个基础，以便让所有 DOM 节点都支持所谓的“事件（event）”。拥有`EventTarget.addEventListener()`等方法。

- `Node` —— 也是一个“抽象”类，充当 DOM 节点的基础。
    它提供了树的核心导航功能：`parentNode`，`nextSibling`，`childNodes` 等（它们都是 [getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)）。

- `Document` 由于历史原因通常被 `HTMLDocument` 继承 —— 是一个整体的文档。全局变量 `document` 就是属于这个类。它作为 DOM 的入口。
- `CharacterData` —— 一个“抽象”类，被下述类继承：
    - `Text` —— 对应于元素内部文本的类，例如 `<p>Hello</p>` 中的 `Hello`。
    - `Comment` —— 注释类。它们不会被展示出来，但每个注释都会被呈现在 DOM中 。

- `Element` —— 是 DOM 元素的基础类。
    它提供了元素级导航（navigation），如 `nextElementSibling`，`children`，以及搜索方法，如 `getElementsByTagName` 和 `querySelector`。

- `HTMLElement` —— 是所有 HTML 元素的基础类。我们大部分时候都会用到它。

它会被更具体的 HTML 元素继承，如：
- `HTMLInputElement` —— `<input>` 元素的类，
- `HTMLBodyElement` —— `<body>` 元素的类，
- `HTMLAnchorElement` —— `<a>` 元素的类，
### 实例
例如，我们考虑一下 `<input>` 元素的 DOM 对象。它属于 HTMLInputElement 类。
它获取属性和方法，并将其作为下列类（按继承顺序列出）的叠加：
- `HTMLInputElement` —— 该类提供特定于输入的属性，
- `HTMLElement` —— 它提供了通用（common）的 HTML 元素方法（以及 getter 和 setter）
- `Element` —— 提供通用（generic）元素方法，
- `Node` —— 提供通用 DOM 节点属性，
- `EventTarget` —— 为事件（包括事件本身）提供支持，
- ……最后，它继承自 `Object`，因为像 `hasOwnProperty` 这样的“普通对象”方法也是可用的。
### IDL
在[规范](https://dom.spec.whatwg.org/)中，DOM 类不是使用 JavaScript 来描述的，而是一种特殊的 [接口描述语言（Interface description language）](https://en.wikipedia.org/wiki/Interface_description_language)，简写为 IDL。下为一个简例。
```text
// 定义 HTMLInputElement
// 冒号 ":" 表示 HTMLInputElement 继承自 HTMLElement
interface HTMLInputElement: HTMLElement {
  // 接下来是 <input> 元素的属性和方法

  // "DOMString" 表示属性的值是字符串
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

  // 布尔值属性（true/false）
  attribute boolean autofocus;
  ...
  // 现在方法："void" 表示方法没有返回值
  void select();
  ...
}
```
### 节点相关属性
对于节点，有一些共有的属性，用来表达节点的类型、数据、文本等。
- `nodeType` : 它有一个数值型值，代表了不同的节点类型。对于元素节点`elem.nodeType == 1`，对于文本节点` elem.nodeType == 3`，对于 document 对象 `elem.nodeType == 9`。
- `nodeName`/`tagName` : 二者都是用来读取DOM节点的标签名的。区别在于：`tagName` 属性仅适用于 `Element` 节点（因为它继承于Element类）；`nodeName` 是为任意 `Node` 定义的。
- `innerHTML` : 将元素中的 HTML 获取为字符串形式。我们也可以修改它，它是更改页面最有效的方法之一。不过如果在修改过程中，插入了一段`<script>`，那这段脚本不会执行。
    - 小心，innerHTML修改会重写整个元素/片段，使其进行重载，即使使用`+=`来添加内容。
- `outerHTML` : `outerHTML` 属性包含了元素的完整 HTML，相当于`innerHTML` 加上元素本身。
    - 与innerHTML不同的点还有：outerHTML赋值是删去原有元素后，添加新元素，所以原outerHTML值不变
- `nodeValue`/`data` : 读取文本节点（如注释等）的HTML字符串形式。
- `textContent` : 将元素内，去掉所有标签，输出纯文本（注释不会被输出）。

## 树的结构&寻找元素

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[60%]" width-ratio="60">
<p>上面提到document是文档的入口，整个DOM树的结构如右图所示。</p>
<p><b>&lt;html&gt;</b><b> = </b><b>document.documentElement</b></p>
<p>作为document的属性，对应了&lt;html&gt;标签，也即它一定返回文档的根元素&lt;html&gt;。它的子节点为<code>document.body</code>, <code>document.head</code>。</p>
<p><code>document.body</code>节点就是<code>&lt;body&gt;</code>元素。</p>
<div class="callout callout-bg-1 callout-border-2">
<div class='callout-emoji'>👾</div>
<p>注意在<code>&lt;head&gt;</code>标签中的脚本无法访问<code>document.body</code>,其值为null。</p>
</div>

</div>
<div class="w-[40%]" width-ratio="40">
![](/assets/Fq7hbQ5n1ocsFbxY4aschSGBnEd.png)
</div>
</div>

### 临近节点/元素

通过这些属性获得的元素集合都是只读、实时的。

- `parentNode`：访问父节点
- `childNodes`：列出所有子节点，包括文本节点。
- `firstChild`：访问第一个子节点的快捷方式。
- `lastChild`：访问最后一个子节点的快捷方式。
- `previousSibling`：上一个兄弟节点
- `nextSibling`：下一个兄弟节点

但以上这些是针对所有类型节点，包括文本节点，注释节点等，如果我们想只关心元素节点，那么使用下面几个属性。

- `parentElement`：访问父元素
- `children`：列出所有子元素
- `firstElementChild`：访问第一个子元素的快捷方式。
- `lastElementChild`：访问最后一个子元素的快捷方式。
- `previousElementSibling`：上一个兄弟元素
- `nextElementSibling`：下一个兄弟元素 

<div class="callout callout-bg-4 callout-border-2">
<div class='callout-emoji'>🙉</div>
<p>对于集合（如childNodes，getElementsBy*)，不能用数组的属性和方法。要用<code>for…of</code>而非<code>for..in</code>进行迭代。</p>
</div>

### 搜索元素

- `document.getElementById('elem')`：该方法只能用于在整个文档中查找元素。
- `elem.querySelectorAll(css)`：最常用的方法，返回所有css选择器匹配的元素。返回的是一个静态的集合，获得元素集合后不会随着DOM改变而再改变。
- `elem.querySelector(css)`：直接返回第一个匹配的元素，比`elem.querySelectorAll(css)[0]`更快。
- `elem.matches(css)`：判断此元素是否符合css选择器的匹配，返回true/false。
- `elem.closest(css)`：寻找与css选择器匹配的，最近的祖先元素。
- 直接使用以这个元素的id或name命名的全局变量，它引用了该元素。
    - 如果一个元素拥有ID属性,那么ID属性的属性值就会成为window对象的属性名。
    - 如果一个元素拥有name属性,那么name属性的属性值就会成为window对象的属性名.但这个元素的标签名必须是: a, applet, area, embed, form, frame, frameset, iframe, img, object,其中的一个。

# 属性与特性

当浏览器加载界面时，它会解析HTML，并生成DOM对象。对于对于元素节点，大多数标准的 HTML 特性（attributes）会自动变成 DOM 对象的属性（properties）。例如，如果标签特性是 `<body id="page">`，那么 DOM 对象就会有属性 `body.id="page"`。关于属性与特性还有很多要注意的。

## DOM属性

DOM节点就是常规的JS对象，所以我们可以为DOM对象添加属性和方法，就像在JS中那样（值的类型随意，大小写敏感）。如`styles`属性是一个对象，特性则是字符串。

```js
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY
```

所有以`data-`开头的特性均被保留供程序员使用。它们可在 `dataset` 属性中使用。data-是一种安全的传递数据的方式。

```js
<body data-about="Elephants">
<script>
    alert(document.body.dataset.about); // Elephants
</script>
```

## HTML特性

在 HTML 中，标签可能拥有特性（attributes）。当浏览器解析 HTML 文本，并根据标签创建 DOM 对象时，浏览器会辨别<b>标准的</b>特性并以此创建 DOM 属性。

所以，当一个元素有 `id` 或其他<b>标准的</b>特性，那么就会生成对应的 DOM 属性。但是<b>非标准的</b>特性则<b>不会</b>。并且要注意，不是所有元素都有相同的特性。

```js
<body id="test" something="non-standard">
  <script>alert(document.body.id); // test    
  // 非标准的特性没有获得对应的属性
  alert(document.body.something); // undefined
  </script>
</body>
```

对于非标准的特性，有这些通用的方法（可以对标准的和非标准的同时生效）

- `elem.hasAttribute(name)` —— 检查特性是否存在。
- `elem.getAttribute(name)` —— 获取这个特性值。
- `elem.setAttribute(name, value)` —— 设置这个特性值。
- `elem.removeAttribute(name)` —— 移除这个特性。
- `elem.attributes` —— 查看所有特性。

## 特性与属性同步

当一个标准的特性被改变，对应的属性也会自动更新，（除了几个特例）反之亦然。

特例如`input.value` 只能从特性同步到属性，反过来则不行，这是相当于保存了value，防止用户修改输入时修改，导致每次都要重新设置之前的value值。

而一个非标准特性被添加时，不会自动同步到属性里。需要用到上面几种方法（或者直接使用`data-`特性）来进行操作。

# 修改文档

想要创造动态的，或交互的页面，DOM修改是重要的手段。下面介绍一些通过JS进行DOM修改的手段。

## 创建元素

## 插入DOM

### `append()`……

- `node.append(...nodes or strings)` —— 在 `node` <b>末尾</b> 插入节点或字符串，
- `node.prepend(...nodes or strings)` —— 在 `node` <b>开头</b> 插入节点或字符串，
- `node.before(...nodes or strings)` —— 在 `node` <b>前面</b> 插入节点或字符串，
- `node.after(...nodes or strings)` —— 在 `node` <b>后面</b> 插入节点或字符串，
- `node.replaceWith(...nodes or strings)` —— 将 `node` 替换为给定的节点或字符串。

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🐵</div>
<p>注意，以上5钟方法插入字符串时，都是将字符串安全地作为”文本“插入，即使字符串包含<code>&lt;p&gt;&lt;/p&gt;</code>等标签，也不会被显示为元素。</p>
</div>

### `insertAdjacentHTML/Text/Element`

`elem.insertAdjacentHTML(where, html)`

这种方法就是为了直接将HTML片段插入到DOM中，第一个参数（代码字）只能为以下之一；第二个参数是直接作为HTML插入的字符串。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[51%]" width-ratio="51">
<ul>
<li><p><code>&quot;beforebegin&quot;</code> —— 将 <code>html</code> 插入到 <code>elem</code> 之前</p>
</li>
<li><p><code>&quot;afterbegin&quot;</code> —— 将 <code>html</code> 插入到 <code>elem</code> 开头</p>
</li>
<li><p><code>&quot;beforeend&quot;</code> —— 将 <code>html</code> 插入到 <code>elem</code> 末尾</p>
</li>
<li><p><code>&quot;afterend&quot;</code> —— 将 <code>html</code> 插入到 <code>elem</code> 之后</p>
</li>
</ul>
</div>
<div class="w-[48%]" width-ratio="48">
![](/assets/HS79bh8d6ouV9wxF9zNcOJwUnbe.png)
</div>
</div>

其它两种`insetAdjacentText`/`insertAdjacentElement` 类似，前者插入文本，后者插入元素。

### 删除节点

直接使用`node.remove()`方法即可。在移动元素时，旧位置会自动删除被移动的节点。

```js
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // 无需调用 remove
  second.after(first); // 获取 #second，并在其后面插入 #first
</script>
```

### 克隆节点

调用 `elem.cloneNode(true)` 来创建元素的一个“深度”克隆 —— 具有所有特性（attribute）和子元素。如果我们调用 `elem.cloneNode(false)`，那克隆就不包括子元素。

### `DocumentFragment`

`DocumentFragment` 是一个特殊的 DOM 节点，用作来传递节点列表的包装器（wrapper）。我们可以向其附加其他节点，但是当我们将其插入某个位置时，则会插入其内容。

它就像一个临时包装，可以往里面添加元素，当被插入DOM时会包装就会”溶解“掉，只剩里面的元素。

## 样式

### 通过类修改样式

相较于将样式直接写入 `style` 属性，我们应该首选通过 CSS 类的方式来添加样式。仅当类“无法处理”时，才应选择使用 `style` 属性的方式，如动态计算页面边框并设置`style`时。

`"className"`：`elem.className` 对应于 `"class"` 特性，是一个字符串，对其进行赋值会替换类的整个字符串。

`"classList"`：`elem.classList` 是一个对象，包含元素所有的类名，`add/remove/contains/toggle`方法。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[78%]" width-ratio="78">
<ul>
<li><p><code>add</code>：为这个元素添加一个类</p>
</li>
<li><p><code>remove</code>：移除这个类</p>
</li>
<li><p><code>toggle</code>：如果存在此类就移除，否则就添加这个类</p>
</li>
<li><p><code>contains</code>：检查有无这个类，返回true/false</p>
</li>
</ul>
</div>
<div class="w-[21%]" width-ratio="21">
![](/assets/KoJkb1EDOoQuvOxMJFPc5nppnGg.png)
</div>
</div>

### 元素样式属性

`elem.style` 是一个属性，对应元素标签中的`style`特性。而`style`属性只能获取内联CSS的内容。

在特性中的由多词组成的属性，在JS中使用驼峰式表示。例如`background-color`  =&gt; `elem.style.backgroundColor`。

像 `-moz-border-radius` 和 `-webkit-border-radius` 这样的浏览器前缀属性，也遵循同样的规则：连字符 `-` 表示大写。例如`button.style.MozBorderRadius = '5px';`

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'></div>
<p>style特性是只读的，我们可以对<code>style.cssText</code>赋值来对其进行完全替换重写。<code>element.setAttribute(&#39;style&#39;, &#39;color: red...&#39;)</code>也可以达到同样的效果。</p>
</div>

### 获取样式

正如上面提到的，`style`属性只能读取内联CSS的内容。那如果，我们想知道在`<head>`中或者单独CSS文件中定义的元素的 size，margins 和 color。应该怎么获取？

`getComputedStyle(element, [pseudo])`

<b>element</b>需要被读取样式值的元素。

<b>pseudo</b>伪元素（如果需要），例如 `::before`。空字符串或无参数则意味着元素本身。

结果是一个具有样式属性的对象，像 `elem.style`。

```js
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
   alert(document.body.style.color);//无法读取非内联css
  let computedStyle = getComputedStyle(document.body);
  // 现在我们可以读取它的 margin 和 color 了
  alert( computedStyle.marginTop ); // 5px
  alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💥</div>
<p><b>getComputedStyle</b><b> 需要完整的属性名，</b>如<code>getComputedStyle(elem).padding</code>没有一个明确的标准规定会返回什么，而使用<code>paddingLeft</code>则可避免误解。</p>
</div>

