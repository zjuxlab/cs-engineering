---
title: <svg>
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-it1gwwgjriq0w0k7bptcbr4bn8g-vdpkwydvti5nuxkq4eaclkdzndg-uufzwx9b7i5ixtksekrc4fpgnne-uufzwx
sidebar_position: 2
---


# &lt;svg&gt;

### <b>直接嵌入 HTML 中</b>

HTML5 中直接支持 `<svg>` 标签，可以将 SVG 图像直接嵌入到 HTML 文档中，而不需要额外的图像文件。

```js
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  一个带有黄色填充和绿色边框的圆形
</svg>
```

### 用 CSS 和 JavaScript 操作

SVG 不仅是一个静态图形，它的各个元素（如路径、形状、颜色等）都可以通过 CSS 进行样式控制，甚至通过 JavaScript 动态修改。你可以轻松实现动画、交互以及动态效果。

- <b>CSS 操作</b>：你可以通过 CSS 样式来控制 SVG 元素的颜色、尺寸、透明度、边框等。
- <b>JavaScript 操作</b>：你可以用 JavaScript 来动态修改 SVG 内容（例如，改变颜色、形状、位置等）。

```js
document.getElementById("myCircle").setAttribute("fill", "blue");
```

### <b>支持动画（SMIL 和 CSS 动画）</b>

SVG 可以通过两种方式进行动画：使用 <b>SMIL</b>（Synchronized Multimedia Integration Language）或者使用 <b>CSS 动画</b>。

- <b>SMIL</b>：SVG 提供了本身的动画功能，可以在 SVG 元素中内嵌动画代码，控制属性变化。

例如，使用 `animate` 元素在 SVG 中实现动画：

```js
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="50" r="40" fill="yellow">
<animate attributeName="cx" from="50" to="150" dur="2s" repeatCount="indefinite" />
</circle>
</svg>
```

这个例子中，`circle` 元素的 `cx` 属性会在 2 秒内从 50 移动到 150，并无限循环。

- <b>CSS 动画</b>：SVG 元素也可以使用 CSS 动画来实现动态效果。

```js
@keyframes moveCircle {
0% { transform: translate(0, 0); }
50% { transform: translate(100px, 0); }
100% { transform: translate(0, 0); }
}
svg circle {animation: moveCircle 2s infinite;
}
```

### <b>文件体积小且可压缩</b>

SVG 图像是基于 XML 的文本文件，通常比位图格式（如 PNG、JPEG）要小得多，尤其是在图像内容简单的时候。并且由于它是纯文本格式，SVG 文件可以进行压缩，使得网页加载速度更快。

此外，SVG 文件还可以直接通过代码编辑，修改和优化内容。例如，去掉冗余数据和注释，进一步减小文件体积。

### <b>支持交互与事件处理</b>

你可以给 SVG 元素添加事件监听器，使得它们能够响应用户交互。例如，点击或悬停时触发事件。这使得 SVG 在图表、按钮、动画等互动式元素中非常有用。

```js
<svg width="100" height="100">
<circle cx="50" cy="50" r="40" fill="blue" id="circle" />
</svg>

<script>document.getElementById("circle").addEventListener("click", 
function() {
alert("Circle clicked!");
  });
</script>
```

在这个例子中，当点击圆形时，弹出提示框。

### <b>SEO 优化</b>

因为 SVG 是基于 XML 的文本格式，搜索引擎可以读取其中的内容。比如你可以为 SVG 图形添加 `title` 和 `desc` 标签来提供图形描述，这样有助于提高可访问性和 SEO。

例如：

```js
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
<title>蓝色圆形</title>
<desc>这是一个蓝色的圆形，半径为40像素</desc>
<circle cx="50" cy="50" r="40" fill="blue" />
</svg>
```

