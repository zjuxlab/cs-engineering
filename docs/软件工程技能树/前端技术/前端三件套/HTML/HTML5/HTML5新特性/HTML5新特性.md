---
title: HTML5 新特性
slug: HTML5 新特性
sidebar_position: 0
---


# HTML5 新特性

Author：葛芸曦

HTML5 和 传统的 HTML 主要有几个方面的区别。HTML5 引入了一些新特性和改进，目的是提升网页的多媒体功能、结构语义化、性能和与其他技术的兼容性。

### 1. <b>语义化标签的引入</b>

HTML5 引入了更多的语义化标签，这些标签不仅更容易理解，也有助于搜索引擎优化（SEO）。在 HTML 中，许多元素（如 `div` 和 `span`）用于结构布局，但它们没有明确的意义。而在 HTML5 中，增加了很多有明确语义的标签：

- `<header>`：文档的头部区域，通常包含导航、网站标题等。
- `<footer>`：文档的底部区域，通常包含版权信息、联系信息等。
- `<article>`：代表一个独立的内容块，通常是博客文章或新闻条目。
- `<section>`：文档中的一个区域，通常是一个内容分区。
- `<nav>`：定义网页的导航部分。
- `<main>`：定义文档的主要内容区域，避免重复内容（如页眉、页脚）的干扰。
- `<aside>`：表示与主内容稍微相关但不重要的内容（例如侧边栏）。

注：

以下的 HTML 4.01 元素在HTML5中已经被删除:

- &lt;acronym&gt;
- &lt;applet&gt;
- &lt;basefont&gt;
- &lt;big&gt;
- &lt;center&gt;
- &lt;dir&gt;
- &lt;font&gt;
- &lt;frame&gt;
- &lt;frameset&gt;
- &lt;noframes&gt;
- &lt;strike&gt;

### 2. <b>新的表单控件和属性</b>

HTML5 引入了许多新的表单控件和属性，增强了表单功能和用户体验：

- <b>输入类型（input types）</b>：例如 `<input type="email" />`、`<input type="date" />`、`<input type="tel" />`、`<input type="range" />` ,`<input type="time" />`等，这些新类型使得表单元素更具交互性和自适应性。
- <b>表单验证</b>：HTML5 增加了 `required`、`pattern`、`min`、`max`、`placeholder` 等属性，使得前端验证更简便，不需要依赖 JavaScript。设定表单预设值&lt;datalist&gt; 

```js
<input list="browsers" name="browser" />
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```

- <b>新属性</b>：如 `autofocus`（自动聚焦）、`readonly`（只读）等。

- 全局属性

![](/assets/OujAbrSweo5BWexNeYZcU6Uwnyh.png)

事件属性：

js多了很多种响应的方式

### 3. <b>音频与视频支持</b>

HTML5 引入了 `<audio>` 和 `<video>` 标签，允许在网页中直接嵌入和播放音频和视频，而不需要依赖插件（如 Flash）：

- <b>&lt;audio&gt;</b>：用于嵌入音频文件，支持多种格式（如 MP3、Ogg、WAV 等）。

感觉和插图片差不多，但是要注意浏览器支不支持。具体的使用方式看子文件。

```js
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
</audio>

<audio controls src=".../xx.mp3" autoplay></audio>
```

![](/assets/C5kOb58pDo22aPxHcp1cqY6dnGf.png)

- <b>&lt;video&gt;</b>：用于嵌入视频文件，支持播放控制、暂停、调整音量等功能，支持多种格式（如 MP4、WebM、Ogg 等）。

```js
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
</video>
```

![](/assets/IaccbbLEdoDAW7x2eZScwCWInYb.png)

### 4. <b>Canvas和SVG绘图</b>

HTML5 引入了 `<canvas>` 标签，它可以用来绘制图形，如图表、游戏、图像编辑工具等。通过 JavaScript，你可以动态地绘制线条、矩形、圆形、文本以及图像。

&lt;canvas&gt; 标签只是图形容器，通过脚本（通常是 JavaScript）来绘制图形（比如图表和其他图像）。

```js
<canvas id="myCanvas"></canvas>
 
<script type="text/javascript">
var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
ctx.fillStyle='#FF0000';
ctx.fillRect(0,0,80,100);
</script>
```

SVG 是一种使用 XML 描述 2D 图形的语言。

Canvas 通过 JavaScript 来绘制 2D 图形。

SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

HTML5 中直接支持 `<svg>` 标签，可以将 SVG 图像直接嵌入到 HTML 文档中，而不需要额外的图像文件。

```js
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  一个带有黄色填充和绿色边框的圆形
</svg>
```

SVG 不仅是一个静态图形，它的各个元素（如路径、形状、颜色等）都可以通过 CSS 进行样式控制，甚至通过 JavaScript 动态修改。你可以轻松实现动画、交互以及动态效果。

- <b>CSS 操作</b>：你可以通过 CSS 样式来控制 SVG 元素的颜色、尺寸、透明度、边框等。
- <b>JavaScript 操作</b>：你可以用 JavaScript 来动态修改 SVG 内容（例如，改变颜色、形状、位置等）。

```js
document.getElementById("myCircle").setAttribute("fill", "blue");
```

详细介绍见子文档

### 5. <b>本地存储</b>

HTML5 引入了 Web Storage API，包括 `localStorage` 和 `sessionStorage`，可以在客户端保存数据，避免使用 cookie。相比 cookie，Web Storage 提供了更大的存储空间，且使用更简单。

- <b>localStorage</b>：用于长时间保存数据，即使浏览器关闭数据仍然保留。
- <b>sessionStorage</b>：仅在当前会话中有效，浏览器关闭后数据消失。

不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：

- 保存数据：localStorage.setItem(key,value);
- 读取数据：localStorage.getItem(key);
- 删除单个数据：localStorage.removeItem(key);
- 删除所有数据：localStorage.clear();
- 得到某个索引的key：localStorage.key(index);

### 6. <b>地理定位 API（Geolocation API）</b>

HTML5 引入了地理定位功能，允许通过浏览器获取用户的地理位置。通过 `navigator.geolocation`，你可以访问到用户的经度和纬度，适用于定位服务、地图应用等场景。

### 7. <b>WebSockets</b>

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。

WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

在 WebSocket API 中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

现在，很多网站为了实现推送技术，所用的技术都是 Ajax 轮询。轮询是在特定的的时间间隔（如每1秒），由浏览器对服务器发出HTTP请求，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而HTTP请求可能包含较长的头部，其中真正有效的数据可能只是很小的一部分，显然这样会浪费很多的带宽等资源。

HTML5 定义的 WebSocket 协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。

### 8. <b>离线存储与缓存</b>

HTML5 引入了 <b>离线应用缓存（Application Cache）</b> 和 <b>Service Workers</b>，使得 Web 应用可以在没有网络连接时继续运行。Service Workers 允许开发者在后台处理缓存、推送通知等操作，大大提升了 Web 应用的性能和离线能力。

```js
if(typeof(w)=="undefined")
{
    w=new Worker("demo_workers.js");
}

w.onmessage=function(event){
    document.getElementById("result").innerHTML=event.data;
};

w.terminate();
```

