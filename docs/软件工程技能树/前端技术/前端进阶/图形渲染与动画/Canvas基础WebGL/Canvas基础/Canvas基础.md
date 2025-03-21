---
title: Canvas基础
slug: Canvas基础
sidebar_position: 0
---


# Canvas基础

Author：NA

`<canvas>` 是一个HTML标签，最先由苹果实现，随后被所有浏览器所支持。顾名思义，canvas 就是画布，我们可以在 canvas 所创建的区域内自由绘画，以及创建动画等高级效果。比起传统的HTML标签，`<canvas>` 提供了更加自由的创作能力，当然随之而来的也是更加复杂的API。

关于 canvas 的api，可以参见 

# 基本使用

HTML部分，`<canvas>` 标签与其它标签并没有什么不同：

```html
<canvas id="canvas" width="150" height="150"></canvas>
```

HTML中的`<canvas>` 标签只用于定位画布，以及确定画布的大小。而画布内容的渲染则主要由JS脚本控制。

在JS部分，我们通过id获取到画布对象，从画布中获取到 canvas 上下文，之后便可以进行一系列操作了。

```js
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
```

## Canvas 的坐标平面

在正式介绍之前绘制功能，我们首先需要了解一下 canvas 的坐标平面：

![](/assets/XeuibIcvAoAnG8xOTtlcpRoenNb.png)

如上图所示，canvas 的坐标原点位于左上角，x轴正方向向右，y轴正方向向下。x和y的最大值就是画布的宽高。通过给路径设置坐标参数，我们就能在画布上精确定位，实现我们想要的效果。其实，画布的原点也可以被改变，甚至画布还能被旋转，不过这些进阶操作我们暂且不提，留到之后再说。

## 路径

路径是 canvas 中的基础概念，通过路径你能够绘制出任何你想要的形状。

创建一段路径需要通过以下几步：

1. 开始路径
2. 选定起点
3. 绘制路径
4. 闭合路径（非必须）
5. 选择描边还是填充

下面是一个绘制线条的简单的示例：

```js
let canvas = document.<b>getElementById</b>("canvas");
let ctx = canvas.<b>getContext</b>("2d");
ctx.<b>beginPath</b>();
ctx.<b>moveTo</b>(50, 50);
ctx.<b>lineTo</b>(100, 100);
ctx.<b>stroke</b>();
```

我们通过 `beginPath` 函数声明一段路径的开始，之后用 `moveTo` 将画笔移至坐标 (50, 50) 处，并用 `lineTo` 绘制了一条到 (100, 100) 的路径，之后用 `stroke` 选择描边。

效果如下：

![](/assets/SNS0bEv82o43DSxt6cXc1KoEnAR.png)

如果希望绘制一个封闭图形并填充，可以这么做：

```js
ctx.<b>beginPath</b>();
ctx.<b>moveTo</b>(50, 50);
ctx.<b>lineTo</b>(100, 50);
ctx.<b>lineTo</b>(75, 75);
ctx.<b>closePath</b>();
ctx.<b>fill</b>();
```

在这段代码中，我们从 (50, 50) 到 (100, 100) 画了一条线，再从 (100, 100) 到 (75, 75) 画了一条线，之后使用 `closePath` 关闭了路径，最后使用 `fill` 填充了图形，完成了一个实心三角形的绘制。

![](/assets/Zbc5bJE9YoCs9lxwZHjc2SYvnyg.png)

在这段代码中，`closePath` 的作用是从画笔当前位置到初始位置连一条线，使路径封闭起来。如果你手动从 (75, 75) 到 (50, 50) 连一条线，那么也可以不执行 `closePath` 方法。不过事实上， `fill` 方法默认只对封闭路径有效，因此如果你对未封闭路径执行 `fill`，它会首先自动执行 `closePath`，然后再向区域内填充颜色。因此，即使将 `ctx.`<b>closePath</b>`();` 一句注释掉也并不影响效果。然而，我仍然建议每次画完一段路径（`fill` 或者 `stroke`）后都调用 `closePath`，并在画新路径时使用 `beginPath` 开启新路径，否则在描边或填充时可能会发生意想不到的错误。

### 矩形

矩形是最常用的图形，因此 canvas 帮我们实现了矩形的相关方法，省去了用路径绘制矩形的繁琐步骤。

- `fillRect(x, y, width, height)`

`fillRect` 方法绘制一个矩形并填充。(x, y) 是矩形左上顶点的坐标，width 和 height 是矩形的宽和高。

- `strokeRect(x, y, width, height)`

`strokeRect` 方法画出一个矩形的边框，但并不填充。参数同`fillRect`。

- `clearRect(x, y, width, height)`

`clearRect` 方法清除一个矩形内的所有内容。参数同`fillRect`。

下面是一个例子，使用了上述三种方法：

```js
ctx.<b>strokeRect</b>(10, 10, 140, 140);
ctx.<b>fillRect</b>(20, 20, 120, 120);
ctx.<b>clearRect</b>(30, 30, 100, 100);
```

上面这段代码首先画了一个较大的矩形框，然后在内部画了一个较小的实心矩形，最后在实心矩形内部清除了一块矩形区域。

![](/assets/ARmhbSJWcoGZIuxmwCgcHLwzn9c.png)

### 曲线

除了直线外，你还可以在 canvas 中绘制各类曲线。

#### 圆弧

当你希望绘制圆弧时，可以使用`arc`方法。

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`

`arc`方法绘制一段圆弧，其中 (x, y) 为圆心，radius 为半径，startAngle 和 endAngle 为始末角度（弧度制，0度为正右方向），anticlockwise 是一个 boolean 变量，表示是否是逆时针（默认为false，是顺时针）。

下面使用圆弧画了一个笑脸：

```js
ctx.<b>beginPath</b>();
ctx.<b>arc</b>(75, 75, 50, 0, 2 * Math.PI);
ctx.<b>moveTo</b>(110, 75);
ctx.<b>arc</b>(75, 75, 35, 0, Math.PI);
ctx.<b>moveTo</b>(65, 65);
ctx.<b>arc</b>(60, 65, 5, 0, 2 * Math.PI);
ctx.<b>moveTo</b>(95, 65);
ctx.<b>arc</b>(90, 65, 5, 0, 2 * Math.PI);
ctx.<b>stroke</b>();
ctx.<b>closePath</b>();
```

在每次绘制圆弧前首先 `moveTo` 圆弧绘制的起点，否则画笔将会从当前绘制画一条直线到下一段路径的起点。

![](/assets/Re0nbYJIdoZdoexZDkkc2pvDnUc.png)

#### 贝塞尔曲线

Canvas 提供了二次和三次贝塞尔曲线的绘制方法。下图很好地说明了二次和三次贝塞尔曲线的区别，其中蓝点为起止点，红点为控制点。

![](/assets/II6Rbc4wio2ZL3xpyAwcWZmunor.png)

- `quadraticCurveTo(cp1x, cp1y, x, y)`

绘制二次贝塞尔曲线，`cp1x,cp1y` 为一个控制点，`x,y` 为结束点。

- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

绘制三次贝塞尔曲线，`cp1x,cp1y`为控制点一，`cp2x,cp2y`为控制点二，`x,y`为结束点。

### Path2D

如果你需要保存一段路径以便重复使用的话，你可以使用 `Path2D` 对象。

- 构造函数

Path2D的构造函数有三种：

```js
new Path2D();     // 空对象
new Path2D(path); // 拷贝构造
new Path2D(d);    // 从 SVG 建立 Path2D 对象
```

接下来将介绍如何从空对象出发，存储一段路径。

首先创建一个空的 `Path2D` 对象，然后将其当作画布上下文使用，创建一段路径：

```js
const smile = new Path2D();
smile.<b>arc</b>(75, 75, 50, 0, 2 * Math.PI);
smile.<b>moveTo</b>(110, 75);
smile.<b>arc</b>(75, 75, 35, 0, Math.PI);
smile.<b>moveTo</b>(65, 65);
smile.<b>arc</b>(60, 65, 5, 0, 2 * Math.PI);
smile.<b>moveTo</b>(95, 65);
smile.<b>arc</b>(90, 65, 5, 0, 2 * Math.PI);

ctx.<b>stroke</b>(smile);
```

上面的代码把刚刚的笑脸存储到一个名为 `smile` 的 `Path2D` 对象中。之后使用画布上下文的 `stroke` 或 `fill` 方法，就能在画布上绘制这段路径了。

值得注意的是，由于 `Path2D` 对象只储存路径，而不储存绘制的方法（描边还是填充），因此 `Path2D` 对象只有 `rect(x, y, width, height)` 方法，而没有 `fillRect` 或 `strokeRect` 方法。

### 裁切路径

路径不仅可以用于绘制，也可以用于裁切画面。通过 `clip` 方法，可以将封闭路径作为裁切路径，之后所有的绘制操作，只有在裁切路径内部的部分才会显示出来。

下面是一个例子：

```js
ctx.fillStyle = "purple";
ctx.fillRect(0, 0, 150, 150);

ctx.beginPath();
ctx.arc(75, 75, 50, 0, 2 * Math.PI);
ctx.clip();
ctx.closePath();

ctx.fillStyle = "green";
ctx.fillRect(0, 0, 150, 150);
```

首先在画布上画了一个紫色矩形，然后再矩形内部使用了一个圆形的裁切路径，之后再画了一个和之前矩形重叠的绿色矩形。效果如下：

![](/assets/UqQWbdujKoqtfKx8yE3c92HqnYe.png)

可以看到，在裁切画布之后，后一个矩形就只能显示裁切路径以内的部分了。

## 样式

如果画布上只有白色和黑色，那将多么无趣。因此，canvas 提供了可供更改的颜色属性。

- `fillStyle = color`
- `strokeStyle = color`

`fillStyle` 表示填充颜色，`strokeStyle` 表示描边的颜色。这两个属性所能接受的颜色表示方式可以为任何 CSS 中可以出现颜色表示方式。例如：

```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

同时，通过使用 `rgba(r, g, b, a)`表示法，你可以给颜色加上透明度属性。

下面是一个例子，通过充值画布的颜色和透明度来绘制一个渐变色块

```js
ctx.fillStyle = "red";
ctx.<b>fillRect</b>(0, 50, 150, 50);

for (var i = 0; i < 10; i++) {
  ctx.fillStyle = "rgba(255,255,255," + (i + 1) / 10 + ")";
  ctx.<b>fillRect</b>(i * 15, 50, 15, 50);
}

// 框出矩形部分
ctx.<b>strokeRect</b>(0, 50, 150, 50);
```

首先画一个红色的矩形背景，然后在上面叠加透明度渐变的白色矩形，就达成了以下效果：

![](/assets/HH9tbd2kboFBX2xeuP2cscManKh.png)

除了颜色和透明度之外，canvas 还提供了线形、渐变、阴影等多种样式，有兴趣的话可以查阅开头附的API文档。

# 绘制文字

canvas 提供了两种方法来渲染文本：

- `fillText(text, x, y [, maxWidth])`
- `strokeText(text, x, y [, maxWidth])`

顾名思义，`fillText` 将绘制实心文字，而 `strokeText` 将绘制空心文字（即线框）。

两个方法的参数相同，`text` 是字符串，为文字内容；`x` 为文字的起始横坐标，`y` 为文字的基线高度；`maxWidth` 为最大宽度，当文字正常显示的宽度大于最大宽度时，文字将被挤压以适应最大宽度。

下面的例子演示了两种文字渲染的方式：

```js
ctx.font = "28px serif";
ctx.<b>fillText</b>("Hello", 10, 50);
ctx.<b>strokeText</b>("World", 75, 50, 50);
ctx.<b>beginPath</b>();
ctx.<b>moveTo</b>(10, 50);
ctx.<b>lineTo</b>(150, 50);
ctx.<b>stroke</b>();
```

![](/assets/MhHGbvQ8poYxZFxy8VBcCvJtn0c.png)

上面的代码绘制了实心的 "Hello" 和空心的 "World"，其中 "World" 被限制了最大宽度，因此显示时受到了横向的挤压。画面上还有一条 y 坐标为 50 的下划线，用以显示文字的基线。

在上面的代码中，我们使用了画布上下文的 `font` 属性更改了字体和字号。其实，画布上下文提供了多个与字体相关的属性：

- `font`：字体
- `textAlign`：文字对齐
- `textBaseline`：基线对齐
- `direction`：文字方向

这几个属性的使用方式与 CSS 中同名属性的使用方式一致。

# 使用图片

在 canvas 中，我们也可以绘制图片。

## 获取图片对象

想要在 canvas 中使用图片，首先需要拿到图片对应的 `Image` 对象。

要将一张图片转换为 `Image` 对象，可以将 `Image` 对象的 `src` 属性设置为图片的路径（本地或网络），也可以将 `src` 直接设置为 Base64 字符串。

## 渲染图片

在 canvas 上渲染图片非常简单，只需使用 `drawImage(image, x, y)` 方法。其中 `image` 是 `Image` 对象，(x, y) 是图片的左上角的坐标。

## 缩放

使用一个重载的`drawImage(image, x, y, width, height)` 方法，通过控制图片的宽高，以实现任意比例的缩放。

## 裁剪

在 canvas 中，我们可以对图片进行裁剪。

- `drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`

在这个 `drawImage` 方法中，`sz, sy, sWidth, sHeight` 表示裁剪框相对于源图片的起点和大小，而 `dx, dy, dWidth, dHeight` 则表示裁剪后的图片在画布上的起点和大小。如下图所示：

![](/assets/FiScbIHyroyPErxhZNucxb8XnMf.png)

# 状态

画布的状态，包含三个部分：

1. 画布上下文的属性，包括 `strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `lineDashOffset`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation`, `font`, `textAlign`, `textBaseline`, `direction`, `imageSmoothingEnabled`
2. 画布的变换情况（移动、旋转和缩放）
3. 当前的裁切路径。

当你想要在改变一些状态之后回到之前的状态继续绘图，你可以使用 `ctx.save()` 保存当前状态，之后再用 `ctx.restore()` 恢复即可。

你可以调用任意多次 `save`方法。每一次调用 `restore` 方法，上一个保存的状态就从栈中弹出，所有设定都将恢复。

# 画布变换

## 移动

`translate(x, y)` 方法可以移动画布原点至当前画布的 (x, y) 处（x、y 可为负值）。

通过移动画布原点，一个显著的好处就是我们可以重用同一段路径（例如将其存储为 `Path2D` 对象）但将其形状绘制在画布的不同位置，而不是每次都修改路径的坐标参数再重新绘图。

下面是一个例子，绘制了9个排列整齐的三角形，且很好地复用了代码：

```js
// 构建三角形
const triangle = new Path2D();
triangle.<b>moveTo</b>(0, 25);
triangle.<b>lineTo</b>(25, 25);
triangle.<b>lineTo</b>(12.5, 0);
triangle.<b>closePath</b>();

// 绘制三角形阵列
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    ctx.<b>save</b>();
    ctx.fillStyle = "rgb(" + 51 * i + ", " + (255 - 51 * i) + ", 255)";
    ctx.<b>translate</b>(10 + j * 50, 10 + i * 50);
    ctx.<b>fill</b>(triangle);
    ctx.<b>restore</b>();
  }
}
```

效果如下：

![](/assets/UP5jbdfOroiHE8xRuuJcyW4gnwd.png)

在进行画布变化时，一个较好的做法是每次变换前保存当前的画布状态，操作完之后恢复画布状态，以免造成意料之外的效果。

## 旋转

`rotate(angle)` 将画布 <b>绕当前原点 </b>顺时针旋转一个角度，此角度由 `angle`（弧度制）所确定。具体效果如下：

![](/assets/QsrlbVaTjojDbSxrE26c1O2fnRb.png)

在旋转画布时，一个容易遗漏的注意事项就是忘记把画布原点移动到旋转中心，从而导致效果出错。

## 缩放

通过 `scale(x, y)` 方法，我们可以缩放画布，增减画布中的像素数目。

`scale(x, y)` 中的 `x` 和 `y` 是横轴和纵轴的缩放系数；如果系数 &gt; 1，则放大画布，否则缩小画布。系数甚至可以 &lt; 0，代表将图片翻转。

下面是一个例子：

```js
ctx.font = "28px serif";
ctx.fillText("Hello World", 0, 50);
ctx.scale(2, 2);
ctx.fillText("Hello World", 0, 75);
ctx.scale(-1, 1);
ctx.fillText("Hello World", -150, 125);
```

![](/assets/MiFmbI7JPoFGpcx6KAKcjfyknab.png)

# 动画

在 canvas 中创建动画的原理并不复杂，事实上 canvas 中并没有什么专门的方法用于绘制动画。想要在 canvas 中创建动画，我们只需要以一定频率重复以下两个步骤：

1. 清除画布
2. 绘制当前动画帧

这和电影的放映原理并没有什么不同。

## 设置刷新率

想要放映动画，我们需要以一个固定频率刷新画布。想要做到这一点，我们可以使用JS原生的 `setInterval` 或 `setTimeout` 函数来实现，也可以使用 `window` 对象提供的 `requestAnimationFrame(callback)` 方法来实现。`requestAnimationFrame` 将在下次浏览器屏幕刷新前执行你传入的回调函数。如果使用`requestAnimationFrame` 方法，记得在回调函数的最后再调用一次 `window.requestAnimationFrame(callback)`，以注册下一帧动画的绘制。

## 绘制动画帧

绘制动画帧的方式与绘制静态画面没什么不同，只要记得在每次绘制前先清空画布，并且最好保存一下当前的画布状态，等画完后恢复即可。

下面是两个例子：

### 旋转小球

下面的代码创建了一个在轨道上旋转的小球的动画，使用了 `requestAnimationFrame`：

```js
// 小球
const ball = new Path2D();
ball.arc(0, 75, 10, 0, 2 * Math.PI);
// 轨道
const orbit = new Path2D();
orbit.arc(0, 0, 75, 0, 2 * Math.PI);

function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 保存状态
  ctx.save();
  // 移至画布中心并绘制轨道
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.stroke(orbit);

  const time = new Date();
  // 根据当前时间确定小球在轨道上的位置
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  // 绘制小球
  ctx.fill(ball);
  // 恢复状态
  ctx.restore();
  // 在下一次屏幕刷新前绘制下一帧
  window.requestAnimationFrame(draw);
}

draw();
```

动画截图如下：

![](/assets/Pwn3bBxzVopwHbxgJgscPczZnQe.png)

由于文档无法展示动画效果，读者可以复制代码到本地执行。

### 电子时钟

下面的代码实现了一个每秒刷新的电子钟，使用了 `setInterval` ：

```js
ctx.font = "30px Arial";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(10, 100);
  const time = new Date();
  // 绘制当前时间
  ctx.fillText(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, 0, 0);

  ctx.restore();
}

draw();
setInterval(draw, 1000);
```

动画截图如下：

![](/assets/KeZ7bG4cQoK1C6xlg57cR9innMd.png)

在 `setInterval(draw, 1000);` 之前先调用一次 `draw()` 是因为 `setInterval` 所注册的第一次回调事件将在一秒后执行，如果你希望用户已打开页面就有内容，则需要先手动执行一遍绘制函数。

## 拓展

Canvas 动画的原理虽然简单，但 canvas 的自由度让我们可以创建出非常丰富的动画效果。

下面的链接列出了一些常用的动画效果的绘制方法：

这是一个详细的关于碰撞检测和物理模拟的教程：

下面几个链接则展示了一些使用 canvas 创作的非常炫酷的动画效果：

