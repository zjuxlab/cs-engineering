# HTML和CSS

## Mentor

@zkc 

## 什么是 MDN？

> *我们是一个开放包容的开发者社区，目标是为更好的互联网提供资源，无关品牌、浏览器或平台。任何人都可以参与到其中，你的每一份贡献都会让我们更强大。与我们一起，持续推动互联网技术向更伟大的方向革新——就在这里，与你一起。*
>
> —— MDN

MDN Web Docs 旧称为 Mozilla Developer Network，是一个 web 工程师的开发者社区，有一个免费且全面的文档资料库和新手指南。可以把它当作是一本词典或是百科，是每个前端开发者必读/必查/必用的网站。

MDN：https://developer.mozilla.org/

## 什么是 HTML？

HTML（HyperText Markup Language，超文本标记语言）是一种用于创建网页的标准标记语言。常与 CSS, JavaScript 一起被用于设计网页、网页应用程序等。HTML描述了一个网站的结构语义随着线索的呈现，使之成为一种标记语言而非编程语言。

HTML 中结构化地定义了很多的元素，它们有着树型结构关系，是构建网页的基石。

- MDN Learn HTML：https://developer.mozilla.org/en-US/docs/Learn/HTML
- MDN HTML Reference：https://developer.mozilla.org/en-US/docs/Web/HTML


## 什么是 CSS？

如果说 HTML 定义了网页骨架和躯干，那么 CSS 就定义了身体胖瘦和衣着。（x）

CSS（Cascading Style Sheets，层叠样式表）是用来给结构化文档（如 HTML）添加样式（如字体、间距、颜色等）的。

- MDN Learn CSS：https://developer.mozilla.org/en-US/docs/Learn/CSS
- MDN CSS Reference：https://developer.mozilla.org/en-US/docs/Web/CSS
- W3C CSS（目前 CSS 由 W3C 维护）：https://www.w3.org/Style/CSS/

一些需要关注的地方：

- CSS 属性在 HTML 元素中是怎么继承的？
- Flexbox
- CSS 选择器、伪类和伪元素
- Accessibility（有些 HTML 元素或者 CSS 属性可能在某些浏览器不可用）
- Responsive（如何适应不同屏幕尺寸？）
- 元素重叠时的遮盖关系

### css动画

可以参考：[使用 CSS 动画 - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

## 动动手

试着自己用 HTML 和 CSS 写一个简单的静态网页吧！

- 试着修改网页标题和 favicon；
- 试着使用不同的 flexbox 布局、嵌套 flexbox；
- 试一试各种你喜欢的样式（边框、圆角、阴影、间距、渐变等等）；
- 试一试不同的字体、字体大小、字体样式、字体颜色；
- 试着给某个元素添加交互，如 hover 时变色；
- 试试插入图片；
- 试试使用 icon；
- ……

## 思考题

【1】

看看2005年的网易新闻吧

https://web.archive.org/web/20050101092916/https://news.163.com/

- 那个年代前端常用技术栈是什么？
- F12看看，如何模拟`<div>`的布局的？

【2】

假如你现在正在编写一个页面上的组件，为了实现设计稿上的效果，一般有两种编写思路：

1. 使用各色HTML标签，并结合各标签的属性实现
2. 使用单一的`<div><span>`等 Division 标签，并主要使用CSS进行样式调节

两种方式各有什么优劣？你更倾向于使用哪一种？为什么？（你可以在有一定开发经验后再来看看自己的答案）