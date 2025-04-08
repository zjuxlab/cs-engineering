---
title: HTML
slug: HTML
sidebar_position: 0
---


# HTML

<<<<<<< HEAD
## 从核物理实验室诞生的革命

1989年，欧洲核子研究中心（CERN）的物理学家<b>蒂姆·伯纳斯-李</b>面对一个看似简单却困扰科学界的难题：<b>如何让分布在全球的研究者轻松共享粒子对撞机产生的海量数据？</b> 当时的网络世界还是一片荒漠——你需要记住复杂的FTP命令，文件格式互不兼容，更别提超链接了。

伯纳斯-李的解决方案是一种"超文本标记语言"（HyperText Markup Language），这就是HTML的雏形。就像活字印刷术颠覆了知识传播方式，HTML彻底<b>重构了人类信息交换的DNA</b>。1991年8月6日，世界上第一个网站在info.cern.ch上线：

```
<HEADER>
<TITLE>万维网计划</TITLE>
<NEXTID 4>
</HEADER>
<H1>万维网</H1>
欢迎访问第一个网站！<A NAME=0 HREF="WhatIs.html">了解更多</A>。
```

## 为什么我们需要HTML？

### 1. <b>极简</b>

- <b>标签语义化</b>：&lt;h1&gt;比 &lt;font size="+3"&gt;更符合人类思维
- <b>容错设计</b>：即使标记错误，浏览器也会尽力渲染（与XML的严格形成对比）
- <b>可扩展性</b>：从1993年的HTML 1.0到2022年的HTML5，核心思想始终兼容

如果我们尝试用Word文档制作网页：

1. 保存为HTML后查看源代码——你会看到大量`<span style="mso-spacerun:yes">`之类的冗余代码
2. 用浏览器打开时，文件体积比手写HTML大30倍
3. 在不同设备上显示效果可能错乱

### 2. <b>超链接</b>

HTML最革命性的创新是`<a>`标签。想象一下：

- 在纸质百科全书中查找"相对论"，你需要：
    1. 查目录
    2. 翻到对应页码
    3. 可能还要查其他相关词条

- 在维基百科中，只需<b>点击蓝色文字</b>

这种非线性阅读方式彻底改变了我们的认知模式。

### 3. <b>开放标准</b>

HTML有一系列开放标准：

- <b>无专利壁垒</b>：任何人都能实现HTML解析器
- <b>渐进增强</b>：从文本浏览器到VR设备都能消费相同HTML
- <b>生态繁荣</b>：催生出CSS、JavaScript等配套技术

对比封闭技术如Flash的消亡史，更能体现HTML的开放标准的伟大之处

HTML (HyperText Markup Language) 是创建网页的标准标记语言，用于定义网页内容的结构。

XHTML (Extensible HyperText Markup Language) 是HTML的一种严格规范的扩展，符合XML标准，更加严格和规范。

<b>学习路线：</b>

- HTML 文档基本结构（doctype、html、head、body）
- 基础标签的使用（div, p, span, h1~h6, a 等）
- XHTML 与 HTML 区别（严格性与兼容性）

官方文档参考：

- [MDN HTML教程](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [HTML标准规范](https://html.spec.whatwg.org/multipage/)
- [XHTML标准](https://www.w3.org/TR/xhtml1/)

HTML文档常需要引用外部的JavaScript文件和CSS文件。

常见的引用标签：

- &lt;script&gt; 标签用于引入JavaScript：

```html
<script src="path/to/script.js"></script>
```

- &lt;link&gt; 标签用于引入CSS样式：

```html
<link rel="stylesheet" href="path/to/style.css">
```

<b>学习路线：</b>

- JavaScript文件加载方式（async、defer属性的区别）
- CSS文件加载策略（性能优化的基础知识）

官方文档参考：

-  [MDN - script标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)
-  [MDN - link标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
