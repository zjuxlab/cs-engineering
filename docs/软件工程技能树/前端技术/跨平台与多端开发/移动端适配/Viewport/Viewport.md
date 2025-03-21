---
title: Viewport
slug: Viewport
sidebar_position: 1
---


# Viewport

# 什么是viewport（视口）

viewport分为可视视口（视觉视口）和布局视口。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[47%]" width-ratio="47">
![](/assets/XQjQbdpfZov0wJxgn1XcCujCnOf.png)
</div>
<div class="w-[52%]" width-ratio="52">
![](/assets/RG0TbRKWOo4l5uxocphcGt5Gnbd.png)
</div>
</div>

视口当前可见的部分叫做<b>可视视口（visual viewport）</b>。可视视口可能会比<b>布局视口（layout viewport）</b>更小，因为当用户缩小浏览器缩放比例时，布局视口不变，而可视视口变小了。

- 布局视口可以通过可通过`document.documentElement.clientWidth/clientHeight`来获得。
- 可视视口可通过`window.innerWidth`获得
- 页面的缩放比例 = 布局视口的宽度 / 可视视口的宽度

在移动端中，可视视口通常较小，如果布局视口和pc端一样，默认为768px、980px或1024px等大小，可视视口必然会比布局视口要小。这会导致什么什么问题呢？

<b>用户需要进行缩放，拖动滑动条来进行浏览，影响用户体验。</b>

# Viewport meta标记

如上所述，我们想要达到以下的目的

- 首先不需要用户缩放和横向滚动条就能正常的查看网站的所有内容
- 显示的元素(文字图片等)的大小是合适，不会因为在一个高密度像素的屏幕里显示得太小而看不清。

<b>这就需要可视视口和布局视口始终一样大</b>，不会出现无法一次性显示的页面，也就不会出现滚动条。

viewport可以对布局视口进行设置：一个常见的标签如下

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

可设置属性：

```text
width           设置layout viewport  的宽度，为一个正整数，或字符串"width-device"
initial-scale   设置页面的初始缩放值，为一个数字，可以带小数
minimum-scale   允许用户的最小缩放值，为一个数字，可以带小数
maximum-scale   允许用户的最大缩放值，为一个数字，可以带小数
height          设置layout viewport  的高度，这个属性并不重要，很少使用
user-scalable   是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许
```

举例来说，把以下标签贴在head里

`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0， user-scalable=no">`

就可以设置可视视口和布局视口始终保持一致（即等于设备宽度）。禁止用户缩放，初始化缩放比例和最大最小缩放比例都为1。

