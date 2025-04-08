---
title: CSS 3
slug: CSS 3
sidebar_position: 1
---


# CSS 3

Author：葛芸曦/张书怀

CSS3的诞生（首个模块于2001年开始制定）正是为了解决CSS2的<b>结构性痛点</b>，将CSS从简单的样式工具升级为<b>完整的设计编程语言</b>。

---

<b>CSS3</b> 引入了大量的新特性和模块，如动画、过渡、响应式布局、Web 字体支持、渐变、阴影、2D/3D 变换等，使得网页设计更加丰富和互动。

### 1. <b>新特性和模块化</b>

- <b>CSS3</b> 引入了模块化设计，这意味着 CSS3 的功能被划分成了不同的模块，每个模块独立发展。以下是一些常见的 CSS3 模块，它们各自负责不同的功能：

1. <b>文本样式模块</b>（Text Module）：

```css
h1 {
  font-family: 'Arial', sans-serif;//sans-serif 作为备选字体
  font-size: 36px;
  font-weight: bold;
  font-style：//设置字体样式，如斜体。
  line-height：//设置文本行间距。
  letter-spacing：//设置字母间距
  text-align: center;//控制文本对齐方式
  text-transform: uppercase;//控制文本的大小写
  letter-spacing: 2px;//设置单词间距
}
```

1. <b>选择器模块</b>（Selectors Module）：
    - 主要功能：新选择器的引入，例如 `:nth-child(n)`选中父元素的第 `n` 个子元素。,` :nth-last-child(n)`选择从最后一个子元素开始的特定位置的元素,`:not(selector)`排除某个元素,`:nth-of-type(n)`：选中同类型的第 `n` 个子元素, `::before` 和 `::after`：在元素前后插入内容。`:required` 和 `:optional`选择 表单元素，根据元素是否为 必填 或 非必填 来进行样式应用,`:checked` 选择器用于选中表单控件（如复选框或单选按钮）选中的状态。

```js
/* 选择每个列表中的偶数项 */
li:nth-child(even) {
  background-color: #f2f2f2;
}

/* 排除某个元素 */
div:not(.excluded) {
  background-color: lightblue;
}
/*:hover, :focus, :active：用于定义交互状态样式*/
/*在每个 <h1> 元素的内容前添加一个火箭符号*/
h1::before {
  content: "🚀 ";
  color: red;
}
p::first-letter {
  font-size: 2em;
  color: blue;
}
```

1. <b>背景和边框模块</b>（Backgrounds and Borders Module）：
    - 主要功能：圆角、阴影、背景图等。
    - 相关属性：`border-radius`, `box-shadow`, `background-image`, `background-size`。

```js
border-radius: <length> | <percentage>;

/* 所有四个角的圆角 */
div {
  border-radius: 10px;
  border-radius: 50%;
}
/* 为四个角分别设置不同的圆角半径 */
div {
  border-radius: 10px 20px 30px 40px;
  /* 顺序：上左，右上，右下，左下 */
}

box-shadow: <horizontal-offset> <vertical-offset> <blur-radius> <spread-radius> <color>;
/*<b>horizontal-offset</b>：阴影水平偏移，正值表示向右偏移，负值表示向左偏移。
<b>vertical-offset</b>：阴影垂直偏移，正值表示向下偏移，负值表示向上偏移。
<b>blur-radius</b>：阴影的模糊半径，值越大，阴影越模糊。0 表示没有模糊效果。
<b>spread-radius</b>：阴影的扩展半径，值为正时，阴影会扩展；为负时，阴影会收缩。
<b>color</b>：阴影的颜色，可以使用颜色名称、RGB、RGBA 或十六进制颜色值等。*/
div {   
box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5); }  
/* 多个阴影 */
div {   
box-shadow: 2px 2px 4px #000000, 
-2px -2px 4px rgba(0, 0, 0, 0.5); } 
 /* 内阴影 */
 div {   
 box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); }
 
background-image: url('image-path');
background-size: cover/contain/<value>;
 /* 确保图片覆盖整个元素;
 背景图片按比例缩放，直到完全包含在元素内
 特定的宽度和高度 */
background-position: center;
background-attachment: fixed; /* 背景图固定，滚动时不动 */
```

### 2. <b>动画与过渡</b>

主要功能：动画效果的实现，定义关键帧。

CSS3 引入了 <b>动画</b> 和 <b>过渡</b> 的功能，让开发者能更加轻松地创建动态效果：

- <b>CSS3 过渡（</b><b>transition</b><b>）</b>：可以让元素在状态改变时应用平滑的过渡效果，比如按钮在鼠标悬停时的平滑变换。
- <b>CSS3 动画（</b><b>@keyframes</b><b> 和 </b><b>animation</b><b>）</b>：通过定义关键帧，可以使元素在多个状态之间进行复杂的动画。

这些功能在 <b>CSS2</b> 中是没有的，开发者通常需要借助 JavaScript 或 Flash 来实现类似效果。

### 3. <b>布局</b>

- <b>Flexbox</b>：一种新的布局模型，允许创建响应式的、动态的网页布局。它简化了许多布局任务，如居中对齐、自动分配空间、响应式设计等。
- <b>Grid Layout</b>：CSS 网格布局是一种更强大的布局模型，允许开发者定义多行多列的布局，并且可以精确控制元素的位置和尺寸。

这两种布局方式都没有在 <b>CSS2</b> 中出现，CSS2 的布局方式主要依赖于浮动（`float`）和定位（`position`），实现起来要复杂一些。

### 4. <b>Web 字体支持（</b><b>@font-face</b><b>）</b>

- <b>CSS3</b> 引入了 `@font-face` 规则，使得开发者可以在网页中嵌入自定义字体。这样，开发者无需依赖用户设备中已安装的字体，从而保证了网页显示的一致性。

```js
@font-face {
  font-family: "MyFont";/*"自定义字体名称"*/
  src: url("字体文件路径");/*可以是本地路径，也可以是在线字体的 URL。
  你可以使用不同的格式来提高浏览器兼容性，例如 .woff、.woff2、.ttf、
  .eot、.svg */
  font-weight：/*指定字体的粗细，可以是 normal、bold 等。*/
  font-style：/*指定字体的样式，可以是 normal、italic 等*/
}

body {   
font-family: "MyFont", sans-serif; /* 使用自定义字体 */ }
```

### 5. <b>媒体查询（Media Queries）</b>

- <b>CSS3</b> 引入了 <b>媒体查询</b>（`@media`），使得开发者能够根据不同的设备和屏幕尺寸（如手机、平板、桌面电脑）应用不同的样式。通过媒体查询，可以实现响应式设计，使得网页在不同设备上呈现最佳效果。

```js
@media media-query {
  /* 适用于符合条件的设备的样式 */
}
```

- Media-query:

1. <b>屏幕宽度</b>：通过 `min-width` 和 `max-width` 来控制不同屏幕宽度的样式。`min-height` 和 `max-height`：表示屏幕的最小和最大高度
2. <b>分辨率</b>：通过 `min/max-resolution` 来控制不同设备的显示分辨率（如屏幕密度）。
3. <b>设备方向</b>：通过 `orientation` 来控制屏幕的方向（竖屏或横屏）`portrait`：竖屏`landscape`：横屏

```js
/* 默认样式，适用于大屏设备 */
body {
  font-size: 18px;
}

@media (max-width: 768px) {
  /* 屏幕宽度小于等于 768px（如平板设备或手机竖屏）时应用的样式 */
  body {
    font-size: 16px;  /* 调整字体大小 */
  }
}

@media (max-width: 480px) {
  /* 屏幕宽度小于等于 480px（如小型手机）时应用的样式 */
  body {
    font-size: 14px;  /* 调整字体大小 */
  }
}
```

### 6. <b>CSS3 支持更强的兼容性和前缀</b>

- <b>CSS3</b> 在某些新特性上需要使用浏览器前缀（如 `-webkit-`，`-moz-`，`-ms-` 等）来确保兼容性，特别是在早期版本的浏览器中。

<b>-webkit-</b>：由 WebKit 引擎（Chrome、Safari 等）使用。

<b>-moz-</b>：由 Mozilla Firefox 使用。

<b>-ms-</b>：由 Microsoft Internet Explorer 和 Edge 使用。

<b>-o-</b>：由 Opera 浏览器使用（在 Opera 采用 Blink 引擎之前）。

<b>-khtml-</b>：由早期的 Konqueror 浏览器使用。

```js
-webkit-border-radius:
-moz-border-radius:

/*通过设置 appearance，你可以将某些浏览器的默认样式
（例如，按钮的外观、选择框的样式等）去掉，从而自定义样式*/
-webkit-appearance: none; /* Safari/Chrome */  
-moz-appearance: none; /* Firefox */
```

### 7. <b>表单控件的样式</b>

- <b>CSS3</b> 引入了新的伪类，例如 `:valid`、`:invalid`、`:focus`、`:placeholder` 等，能够更方便地对表单元素进行样式控制。

```js
/* 当输入框的内容有效时，背景色为绿色 */
input:valid {
  background-color: #d4edda;
}

/* 当输入框的内容无效时，背景色为红色 */
input:invalid {
  background-color: #f8d7da;
}

/*:placeholder 伪类用于样式化 input 或 textarea 元素中的占位符文本
:placeholder-shown 伪类则用于检查占位符文本是否仍然显示*/
/* 当输入框有占位符文本时，改变占位符文本的颜色 */
input::placeholder {
  color: #999;
}

/* 当输入框显示占位符时，改变边框颜色 */
input:placeholder-shown {
  border-color: #ccc;
}

/* 必填字段的边框颜色为红色 */
input:required {
  border-color: red;
}

/* 可选字段的边框颜色为绿色 */
input:optional {
  border-color: green;
}
```

- 利用 CSS3 的新特性（如渐变、阴影、边框圆角等）来美化表单控件

```js
/* 自定义输入框 */
input[type="text"] {
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;  /* 让宽度包括内边距和边框 */
}

/* 聚焦时改变边框颜色 */
input[type="text"]:focus {
  border-color: #007bff;
}
```

### 8. <b>透明度和颜色</b>

<b>CSS3</b> 引入了新的颜色表示方式，如 `rgba()` 和 `hsla()`，使得可以为颜色添加透明度。这对于创建半透明的元素或背景非常有用。

`hsla()` 是另一个新的颜色表示方式，基于 <b>HSB（色相、饱和度、亮度）</b> 模型，提供了更加直观的方式来定义颜色。它在 `hsl()` 基础上增加了透明度（alpha）通道。

- <b>h</b>：色调（Hue），取值范围 0-360，表示颜色的基本类型（如红色、绿色、蓝色等）。
- <b>s</b>：饱和度（Saturation），取值范围 0% - 100%，表示颜色的纯度，100% 为最纯的颜色，0% 为灰色。
- <b>l</b>：亮度（Lightness），取值范围 0% - 100%，表示颜色的明暗程度，0% 为黑色，100% 为白色，50% 为标准亮度。
- <b>a</b>：透明度（alpha），取值范围 0 到 1，0 为完全透明，1 为完全不透明

```js
rgba(r, g, b, a)/*a,透明度*/
hsla(h, s%, l%, a)
```

### 9. <b>2D/3D 变换</b>

- 2D变换：CSS3 支持对元素进行平移、旋转、缩放和倾斜等 2D 变换

<b>（</b><b>transform</b><b>）</b>

```js
/* 2D 变换 */
transform: translate(50px, 100px);  /* 平移 */
transform: rotate(45deg);           /* 旋转 */
transform: scale(1.5);              /* 放大 */
transform: skew(20deg, 10deg);      /* 倾斜 */
```

- 3D 变换（如旋转、透视等）。

<b>rotateX()</b><b>、</b><b>rotateY()</b><b>、</b><b>rotateZ()</b>：围绕 X、Y、Z 轴旋转元素。

<b>perspective()</b>：设置元素的透视效果，使其看起来具有深度。

<b>translateZ()</b>：沿 Z 轴移动元素，实现深度感。

```js
/* 3D 变换 */
div {
  transform: perspective(500px) rotateY(45deg);
}
div:hover {
  transform: perspective(500px) rotateY(180deg);
}
```

### 10.<b>多列布局</b>

CSS3 提供了对多列布局的支持，主要适用于文本内容的排版。可以用来创建类似报纸的排版效果。

<b>column-count</b>：设置元素的列数。

<b>column-gap</b>：设置列之间的间隙。

<b>column-rule</b>：设置列之间的分隔线。

<b>column-width</b>：设置列的最小宽度，浏览器会自动调整列数以适应宽度。

