---
title: transform
slug: transform
sidebar_position: 1
---


# transform

Author：徐旻昶

# transform效果简介

transform效果用于对某个元素进行<b>平移、倾斜、旋转、缩放</b>操作。实际上，所有的transform操作都是通过对元素的位置参数乘矩阵进行调整后得到的。先别对矩阵产生过多的畏惧（我也是，笑），具体的矩阵原理我们在后面会讲到。

transform的操作比较易懂，我们直接进入具体的代码操作和效果实例。

# transform语法与函数

transform的语法可以概括为以下：

```css
transform: none;     /*不做变换*/
transform: transform-func1 transform-func2...; /*应用变换函数，多个函数间用空格隔开*/
```

下面对每个变换函数做详细解释，作为对照组，我们将会频繁地使用到下面这张图片，代码如下列出作为这个div的初始状态

![](/assets/DEpvbUWR8odsgwxVfxZcFJ8nnih.png)

```html
<!-- html部分 -->
<div class="frame">
    <img src="./assets/IMG.png" class="image">
 </div>
```

```css
/* css部分 */
.frame {
  height: 300px;
  width: 300px;
  border: solid 10px red;
}
.image{
  margin-top: 100px;
  width: 100px;
  height: auto;
  /* 下面的变换函数均在此填入 */
}
```

## Transform-origin 变换基准点

每一个变换操作都有其基准点，如缩放以哪一点为基准缩放产生的效果会完全不一样。以左上角为基准点的缩放会使得左上角坐标不产生变化，图片向右伸展；而以中心点为基准点的缩放会使得图片中心不变，同时向左右两侧伸展等。

我们可以通过`transform-origin`属性来设置某个元素的变换基准点

```css
transform-origin: 50% 50% 0; /*默认以<em>中心点为起点，宽高的50%，z轴为0在scale中不予考虑*/</em> <em> </em>
transform-origin: left center 0;  /*可以用位置关键字，相当于0 50% 0*/
transform-origin: 0 0 0;  /*左上角*/
```

下列演示都以默认变换基准点，也就是50% 50%的中心点进行变换

## Translate 平移

平移变换函数对元素的坐标进行修改，让其以原定位置基准点为原点出发进行平移，首先看看效果

![](/assets/W7eNbdZ9ioLSyfxrt0ccKiMsnYd.png)

在加上如下的变换函数后图片产生了这样的变换效果

```css
transform: translate(-50px,-50px);
```

上述语句意为：将图片向左平移50px距离，向上平移50px距离。使用此变换时仅需将元素移动您想移动的距离即可。具体用法有：

<table>
<colgroup>
<col width="145"/>
<col width="588"/>
</colgroup>
<tbody>
<tr><td><p>平移变换函数名</p></td><td><p>用法</p></td></tr>
<tr><td><p>translate(<em>x</em>,<em>y</em>)</p></td><td><p>将元素向正右方（x轴正方向）移动x距离，向正下方（y轴正方向）移动y距离，负则反向</p></td></tr>
<tr><td><p>translateX(<em>x</em>)</p></td><td><p>将元素向正右方（x轴正方向）移动x距离</p></td></tr>
<tr><td><p>translateY(<em>y</em>)</p></td><td><p>将元素向正下方（y轴正方向）移动y距离</p></td></tr>
<tr><td><p>translateZ(<em>z</em>)</p></td><td><p>将元素向垂直屏幕向外（z轴正方向）移动z距离</p></td></tr>
<tr><td><p>translate3d(<em>x</em>,<em>y</em>,<em>z</em>)</p></td><td><p>三者结合</p></td></tr>
</tbody>
</table>

tips：关于z轴坐标的知识会在[Perspective 透视](https://xn4zlkzg4p.feishu.cn/wiki/wikcnoIAM8b0eeVc8julFgvjifh#CYS2dQ0AEoKwMuxwVJRcSj08nzc)小节提到，此处暂时略过

## Scale 缩放

缩放变换函数以元素的中心为基点进行缩放，具体来说就是将宽度和高度分别缩小/放大x和y倍

![](/assets/Sbe6bd0P6oMcRoxcbXAcKleKn6c.png)

在加上如下的变换函数后图片产生了这样的变换效果

```css
transform: scale(0.5,2);
```

scale的缩放为倍数，没有单位，负数将会失效，某一值为0会使得图片消失。具体用法如下：

<table>
<colgroup>
<col width="145"/>
<col width="588"/>
</colgroup>
<tbody>
<tr><td><p>缩放变换函数名</p></td><td><p>用法</p></td></tr>
<tr><td><p>scale(<em>x</em>,<em>y</em>)</p></td><td><p>将元素的宽度变为原先的x倍，高度变为原先的y倍</p></td></tr>
<tr><td><p>scaleX(<em>x</em>)</p></td><td><p>将元素的宽度变为原先的x倍</p></td></tr>
<tr><td><p>scaleY(<em>y</em>)</p></td><td><p>将元素的高度变为原先的y倍</p></td></tr>
<tr><td><p>scaleZ(<em>z</em>)</p></td><td><p>将元素的z方向数值变为原先的z倍</p></td></tr>
<tr><td><p>scale3d(<em>x</em>,<em>y</em>,<em>z</em>)</p></td><td><p>三者结合</p></td></tr>
</tbody>
</table>

## Rotate 旋转

旋转分为2D旋转和3D旋转。2D旋转是在平面中的旋转，是<b>绕着某一个点</b>进行转动的，这个点就是之前提到的基准点，此处默认为图片中心

![](/assets/BamrbbrmeoKuTKxXvuqc5bgonmh.png)

```css
transform: rotate(50deg);
```

其中deg是<b>Degress</b>（度）的简写，上述代码意为绕着顺时针旋转50度

<table>
<colgroup>
<col width="195"/>
<col width="535"/>
</colgroup>
<tbody>
<tr><td><p>单位</p></td><td><p>换算</p></td></tr>
<tr><td><p>deg（Degress，度）</p></td><td><p>一圆周为360度</p></td></tr>
<tr><td><p>grad（Gradians，梯度）</p></td><td><p>一圆周为400梯度</p></td></tr>
<tr><td><p>rad（Radians，弧度）</p></td><td><p>一圆周为2π弧度</p></td></tr>
<tr><td><p>turn（Turn，圈）</p></td><td><p>一圆周为1圈</p></td></tr>
</tbody>
</table>

而3D旋转是空间中的旋转，是<b>绕着某一根轴</b>进行转动。x轴为正方向向着屏幕正右方的坐标轴，想象着一张纸片（屏幕中的图片）绕着x轴向外翻出来，那从屏幕前的角度看过去就会是这样

![](/assets/P0bfbVuAboszsoxPdQEc95RXne3.png)

```css
transform: rotateX(50deg);
```

直观地来说，翻转后图片投影到屏幕（三维坐标系下的xy平面）会变扁。

如果这根轴我们希望自己定义呢？我们可以使用<b>rotate3d(x,y,z,angle)</b>来实现，其中<b>[x,y,z]</b>代表了轴的<b>方向矢量</b>，angle表示顺时针转动的角度，例如下绕着[1,1,1]的矢量方向轴顺时针转动了45度

![](/assets/SYiBbHz5doOGWtxQbgfc1rg0nzd.png)

```css
transform: rotate3d(1,1,1,45deg);
```

更多关于屏幕平面三维坐标轴的说明还请见[Perspective 透视](https://xn4zlkzg4p.feishu.cn/wiki/wikcnoIAM8b0eeVc8julFgvjifh#CYS2dQ0AEoKwMuxwVJRcSj08nzc)。

<table>
<colgroup>
<col width="181"/>
<col width="588"/>
</colgroup>
<tbody>
<tr><td><p>旋转变换函数名</p></td><td><p>用法</p></td></tr>
<tr><td><p>rotate(<em>angle</em>)</p></td><td><p>将元素绕着基准点顺时针旋转angle角度，负则逆时针</p></td></tr>
<tr><td><p>rotateX(<em>angle</em>)</p></td><td><p>将元素绕着水平向右的三维x轴翻转angle角度</p></td></tr>
<tr><td><p>rotateY(<em>angle</em>)</p></td><td><p>将元素绕着竖直向下的三维y轴翻转angle角度</p></td></tr>
<tr><td><p>rotateZ(<em>angle</em>)</p></td><td><p>将元素绕着垂直屏幕向外的三维z轴翻转angle角度</p></td></tr>
<tr><td><p>rotate3d(<em>x</em>,<em>y,z,angle</em>)</p></td><td><p>定义轴的方向矢量[x,y,z]，并绕着这根轴顺时针旋转angle角度</p></td></tr>
</tbody>
</table>

## Skew 倾斜

倾斜即使得元素向某方向倾斜

![](/assets/KwR0bYds0otodCx7Qf9c7FP5nBd.png)

```css
transform: skew(-10deg,-5deg);
```

如果是矩形的话倾斜可以类似于绕基准点将两条宽或两条高分别旋转x-angle或y-angle角度，角度的知识与旋转类似

<table>
<colgroup>
<col width="181"/>
<col width="588"/>
</colgroup>
<tbody>
<tr><td><p>倾斜变换函数名</p></td><td><p>用法</p></td></tr>
<tr><td><p>skew(x-<em>angle,y-angle</em>)</p></td><td><p>将元素沿着x轴倾斜x-angle角度，沿着y轴倾斜y-angle角度</p></td></tr>
<tr><td><p>skew(x-<em>angle</em>)</p></td><td><p>将元素沿着x轴倾斜x-angle角度</p></td></tr>
<tr><td><p>skew(y-<em>angle</em>)</p></td><td><p>将元素沿着x轴倾斜y-angle角度</p></td></tr>
</tbody>
</table>

## Matrix 矩阵

不管使用什么方法对元素进行了变换，其实本质上都是对元素的坐标<b>左乘一个矩阵</b>得到的。也就是说，使用matrix方法可以达成上面所有的效果。

我们先来看二维matrix函数的语法来理解这一切

```css
transform:matrix(a,b,c,d,e,f);
```

我们知道一个三维的坐标就可以确定唯一一个空间中的点，一个元素无非就是由许许多多的点组成的。我们假设元素中任意一点的坐标是(x,y,1)（z轴的具体含义可以留到下一小节）。那么它可以被写成如下的矩阵：

![](/assets/URW2bDCpwoWdOxxEC5GcLWECnoc.png)

当我们对这个元素使用矩阵方法进行变换时，其实就相当于对元素中每一个点做了这样的矩阵运算：

（相信大家至少这样的矩阵运算还是会的.jpg）

![](/assets/AZj8bueAloskysxllIMcDYTMnte.png)

其中最左侧的矩阵就是matrix(a,b,c,d,e,f)的运算矩阵，得到的结果是一个3*1的矩阵，也就是变换后的新点坐标位置，x坐标变为ax+cy+e，y坐标变为bx+dy+f。

到这我们就很容易看出了，比如scale运算，就是让x=ax，y=dy的过程，对应的矩阵就是matrix(a,0,0,d,0,0)。这样的对应关系我们使用表格来总结一下：

<table>
<colgroup>
<col width="181"/>
<col width="588"/>
</colgroup>
<tbody>
<tr><td><p>变换函数</p></td><td><p>和矩阵的对应关系</p></td></tr>
<tr><td><p>scale(<em>x,y</em>)</p></td><td><p>matrix(<em>x,0,0,y,0,0</em>)</p></td></tr>
<tr><td><p>rotate(<em>θ</em>)</p></td><td><p>matrix(<em>cosθ,sinθ,-sinθ,cosθ,0,0</em>)</p></td></tr>
<tr><td><p>skew(<em>θx,θy</em>)</p></td><td><p>matrix(<em>1,tan(θy),tan(θx),1,0,0</em>)</p></td></tr>
<tr><td><p>translate(<em>x,y</em>)</p></td><td><p>matrix(<em>1,0,0,1,x,y</em>)</p></td></tr>
</tbody>
</table>

其实只要理解了那个公式就好。三维的矩阵变换其实也类似。

## Perspective 透视及Z轴平移

<u>（当然，有相当一部分的浏览器并不支持3d-transform，这部分可以选择性接受）</u>

css中每一个DOM元素都有一个初始的坐标轴，其原点位于元素的左上角，x轴向正右方延伸，y轴向正下方延伸，z轴则垂直于屏幕指向屏幕外的我们

![](/assets/WgrtbludJoELhuxBA4tcThpYnAg.png)

对，没错，css网页是有<b>Z轴</b>的，听起来您甚至可以在这个平面网页上构建一个虚拟的三维空间。但请先别这么认为，网页上的元素仍然是平面元素，时刻处于一个平面之上，但是元素会按照自己的三维参数（Z轴参数）来调整自己的大小和覆盖显示，这就是虚拟的三维<b>透视效果，</b>也就是我们所熟知的<b>近大远小</b>。
![](/assets/EXRhbZru2obrFJxZtkGclBzDnMd.png)
（随便找了张透视图）

这样的三维图片在二维的表现图片总会在“远方”缩到一个点上，这个点（上面图片叫心点）我们叫做“<b>灭点</b>”（vanishing point）

我们可以直观看到并设置的两个要素叫做<b>perspective（透视）</b>和<b>perspective-origin（灭点）</b>。想象你的眼睛是一台相机，正在拍摄屏幕上的东西，那么<b>相机和屏幕间的距离</b>就通过perspective来设置，<b>灭点的位置</b>就通过perspective-origin来设置。

z轴与perspective距离在同一条水平线上，那一切就变得好理解起来。当你离屏幕的透视距离perspective变得更大，你看到的屏幕里的东西就会越小；当一个元素的z轴坐标增大，代表它离你越来越近，你看到的它也会越大。

除此之外，z轴坐标还用于调整两个元素之间的覆盖关系。z轴坐标大的元素会覆盖在z轴小的元素之上。（然而一般我们使用position+z-index来描述覆盖关系，z-index越大表明覆盖等级越高，排在越上面）。

# 某些注意事项

1. 只能转换由盒模型定位的元素。根据经验，如果元素具有`display: block`，则由盒模型定位元素。
2. 使用translate函数时记得加上移动距离单位是个好习惯
3. transform可以多项叠加，依次执行，空格隔开<b>。每一个变换函数不仅改变了元素，同时也会改变和元素关联的transform坐标系</b>。当变换函数依次执行时，后一个变换函数总是基于前一个变换后的新transform坐标系

