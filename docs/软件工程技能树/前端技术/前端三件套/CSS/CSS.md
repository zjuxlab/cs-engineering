---
title: CSS
slug: CSS
sidebar_position: 1
---


# CSS

## 为什么我们需要CSS

1994年，当网景浏览器刚刚问世时，网页设计师们正深陷「标签地狱」：

```
<font face="Arial" size="4" color="red">标题</font>
<table bgcolor="gray" cellpadding="5">...</table>
```

这种「样式与内容混杂」的方式导致：

- 改版需要逐个修改每个`<font>`标签
- 一个30页的网站仅颜色变更就需要修改数百处
- 代码可读性极差，维护成本呈指数增长

当时在CERN工作的<b>Håkon Wium Lie</b>提出了「层叠样式表」（Cascading Style Sheets）的概念。他在1994年10月发布的《层叠HTML样式表》提案中写道：

> "就像印刷业使用独立的样式指南控制出版物外观一样，Web需要将文档结构与视觉表现分离"

## CSS进化史

### 1996-1999：标准初现，实现混乱

CSS1规范发布时，浏览器支持如同「打地鼠」：

- IE3首次实现部分CSS（但盒模型错误）
- Netscape 4的CSS支持堪称灾难
- 开发者不得不写「浏览器嗅探」

### 2000-2005：标准化的阵痛期

CSS2.1规范试图统一实现，但著名的「盒模型战争」爆发：

```css
/* IE的怪异模式 */
box-sizing: border-box;  /* width包含padding和border */

/* 标准模式 */
box-sizing: content-box; /* width仅内容区 */
```

### 2010至今：CSS3

