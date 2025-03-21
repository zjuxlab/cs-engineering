---
title: Filter
slug: Filter
sidebar_position: 2
---


# Filter

Author：徐旻昶

# filter效果简介

filter滤镜的效果顾名思义，可以方便地将图片加上某些滤镜。相信大家都用过许多的P图软件或者聊天工具自带的一些滤镜处理，这里就不再赘述。比起P图得到的图片，filter可以更好地配合transition等属性实现过渡动画等效果。我们直接进入语法和演示。

# filter语法

filter的语法也可以概括成两句话：

```css
filter: none;     /*不做变换*/
filter: filter-func1 filter-func2...; /*应用变换函数，多个函数间用空格隔开*/
```

我们像transform中一样使用一张示例图来对每一种效果作对比演示

PS：大部分filter效果都比较的显而易见，<del>（顺便带大家过一过P图中的术语）</del>

![](/assets/KA8DbxTeNojQtTxTZEicKfHvnrh.png)

```html
<!-- html部分 -->
<img src="./assets/IMG.png" class="image">
```

```css
/* css部分 */
.image{
  margin-top: 100px;
  width: 300px;
  height: auto;
  /* 下面的滤镜函数均在此填入 */
}
```

## Blur 模糊

对元素进行模糊化处理

- 注意blur()内的并非0-1的概念值，而是一个确切的<b>带单位的</b>数字！这个数字准确来说叫做<b>模糊半径（radius）</b>，是高斯函数的标准偏差值，即屏幕上有多少像素相互融合了
- blur()函数内填写的值越大，模糊程度越大
- blur(0)将不产生任何模糊效果

![](/assets/KJiZbyOqrogzX8xVYs7cqSvHnRh.png)

```css
filter: blur(5px);
```

PS：有一个可能会遇到的问题，就是对设置为background的图片进行blur模糊化处理时，可能会产生白边，如下图所示。白边是因为blur的值过大导致边缘被虚化产生的，在制作过程中可能会影响美观，这是需要我们自己去调整图片的位置大小等，将白边“挤出屏幕外”。

![](/assets/WMHzbvinVonwNixdWazcBEDCnec.png)

## Brightness 亮度

设置元素的亮度

- brightness()中的值是无单位的倍数。当数值为1时表示展现元素本身100%的亮度，即不变；亮度低于1变黑，直到变为0时全黑；亮度高于1时变亮；无数字默认为1

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/BAbmb0W1VowxTvx4FFvcvSPWnpb.png)

<p>亮度大于1时</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/U3AgbAlUxowbgAxUUJ2c9fPCnqg.png)

<p>亮度在0-1之间时</p>
</div>
</div>

```css
filter: brightness(0.5);   /*第一张图为2*/
```

## Contrast 对比度

设置元素的对比度。对比度的意思是一幅图像中明暗区域<b>最亮的白和最暗的黑</b>之间不同亮度层级的测量，差异范围越大代表对比越大，差异范围越小代表对比越小（来源baidu）

- 同Brightness，对比度是一个无单位的倍数，默认为1，大于1时对比度更鲜明，小于1时对比度变弱，直到0变成无对比度的灰色

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/XWFMbLjufoEuHFxENDFc9wjFnIh.png)

<p>对比度0-1之间时，色彩差异很低</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/AuvCbukv1osePKxWY4qc0zpAnQe.png)

<pre><code>对比度大于1时，看上去色彩差异非常大（
</code></pre>
</div>
</div>

```css
filter: contrast(0.1);    /*第二张图为2*/
```

## Drop-shadow 阴影

设置元素的阴影大小、位置、色彩等。阴影简单来说是将一个覆盖等级小于当前元素的、形状与当前元素一致的<b>投影</b>贴到元素的背后。Drop-shadow的语法如下：

```css
filter:drop-shadow(offset-x offset-y blur-radius <del>spread-radius</del> color);
```

其各属性值的含义为：

<table>
<colgroup>
<col width="157"/>
<col width="572"/>
</colgroup>
<tbody>
<tr><td><p>属性名</p></td><td><p>含义</p></td></tr>
<tr><td><p>offset-x</p></td><td><p>设置阴影和本体间的水平距离，以水平向右的x轴为正方向</p></td></tr>
<tr><td><p>offset-y</p></td><td><p>设置阴影和本体间的竖直距离，以竖直向下的y轴为正方向</p></td></tr>
<tr><td><p>blur-radius</p></td><td><p>阴影的模糊半径，和我们上面提到的blur用法、含义都相同</p></td></tr>
<tr><td><p>spread-radius</p></td><td><p>阴影的扩展半径，值为正时阴影变大，为负时阴影变小，默认为0<br/>（这条属性有相当一部分浏览器不支持 不支持时加入这条属性会使整个阴影无效）</p></td></tr>
<tr><td><p>color</p></td><td><p>阴影的颜色</p></td></tr>
</tbody>
</table>

- 如上所述，spread-radius在很多浏览器下没有很好的显示，详细可以查看浏览器支持
- 除了颜色项都是带单位的具体数值
- 任意项可缺省，使用默认值，从左到右依次赋值
- 在这种矩形图片显示时，drop-shadow和box-shadow看起来没什么区别。如果使用的是边框及其不规则的图标，那么drop-shadow的阴影也会是同样形状的一个图标；换句话说，drop-shadow是比较符合物理规律的，它就像一束光从你的视角射过去并投下投影，像下面这张图一样，上面为box-shadow，下面为drop-shadow

![](/assets/Szr8bNfZnoqb6AxY1grc37JVnQB.png)

- drop-shadow似乎没法设置内阴影（inset）但box-shadow可以

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/TXtxbRW1moxfRaxPl1Dcn665nCh.png)

<p>仅设置两个offset的效果（白色为背景）</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/J4mLbTCsNoBcGLxtooHcRND9nuf.png)

<p>多一些属性</p>
</div>
</div>

```css
filter: drop-shadow(10px 10px);    /*图片1*/
filter: drop-shadow(-16px -16px 4px pink);    /*图片2*/
```

PS：shadow可以完成许多意想不到的图标和效果绘制，比如一个半透明的遮罩层来实现弹窗的效果：

*这里drop-shadow不支持的spread-radius属性仅在box-shadow处可用

![](/assets/FEjJbASikoNwWOx0W7QceS4snWf.png)

```html
<div>这里是文字这里是文字这里是文字</div>
<div class="shadow">
   <img src="...">
</div>
```

```css
.shadow{
  /*  ...  */
  box-shadow: 0 0 0 1000px grey;
}
```

或是某些奇思妙想的空缺、拼接组合等，当然这有些跑题了

## Grayscale 灰度

设置元素的灰度。灰度是表明图像明暗的数值，灰度值指的是单个像素点的亮度。灰度值越大表示越亮。

- 灰度值是0-1的百分数数值，到1时灰度达到最大，往上增加不再有影响；0为默认初始值

![](/assets/AO9tbhl7XoUnZLxAwEwcCsEZnKh.png)

```css
filter: grayscale(0.6);
```

## Sepia 棕度

设置元素的棕度，灰度的棕褐色版好兄弟，没啥好说的

![](/assets/OfIAbOo5doTFy4xOJfvcglPfnZb.png)

```css
filter: sepia(0.6);
```

## Hue-rotate 色相旋转

对元素的色调进行改变。叫rotate是因为比较形象，您可以把色相想象成一个冷-暖-冷-暖色调的转盘，一个圆周也是360度，在rotate函数后面的括号中写入角度的数值即可进行色相旋转。具体的角度与rotate相同

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

<div class="flex gap-3 columns-3" column-size="3">
<div class="w-[33%]" width-ratio="33">
![](/assets/DICmbiP8ZoJpMMxlVxMcTsSBn8b.png)

<p>旋转45度</p>
</div>
<div class="w-[33%]" width-ratio="33">
![](/assets/TC5IbnSBKo8zVRxRmx0c56KXnTg.png)

<p>   旋转180度，直接变冷色调</p>
</div>
<div class="w-[33%]" width-ratio="33">
![](/assets/EKmbbxoqmooqHuxBK9ZcuX5Lnpb.png)

<p>旋转一周，回到原色调</p>
</div>
</div>

```css
filter: hue-rotate(45deg);   /* 图1 */
filter: hue-rotate(180deg);   /* 图2 */
filter: hue-rotate(1turn);   /* 图3 */
```

结合animation动画可以展现比较<b>炫酷</b>的效果，只要让色相转盘一直旋转就好了（由于处理gif的工具比较落后所以看起来有些劣质）

![](/assets/Fs6Gb5ugsoJKd0x6Ol2cwZPPnJh.gif)

```html
<img src="..." class="shadow">
```

```css
.shadow{
  width:200px;
  animation: pulse 3s linear infinite;   /* 线性无限时长的amination动画 */
}
@keyframes pulse {
    from {
        filter: hue-rotate(0);
    }
    to {
        filter: hue-rotate(360deg);
    }
}   /*每3s从0转到360度，色相转盘不停地旋转*/
```

## Opacity 透明度

设置元素的透明度，和灰度棕度都一样，设置百分比即可

![](/assets/JrZybqJSnoy2BcxeBeUchkGHnJe.png)

```css
filter:opacity(0.6);
```

- 文本和图片都会受到透明度的影响，如下对div设置了透明度，div中的文字和图片都被这一透明度影响了。

![](/assets/Gw0vbOrRbowxIhx12TjcoFygnjd.png)

## Invert 翻转

将元素的颜色效果翻转线性乘数（反相）

- 翻转的数值是0-1的百分比数值，为0时为初始状态，为1时翻转达到最大，往上继续增大数值不产生变化

![](/assets/UiyIbDEIooX8dgxjEEXcw72gnoe.png)

```css
filter: invert(0.7);
```

当然，很多时候我们会采取更温和的方式来调整色相，而不是整个和拍CT一样的恐怖图像（x

## Saturate 饱和度

设置元素的饱和度。饱和度指<b>指色彩的鲜艳程度</b>。

- 同Brightness，饱和度是一个无单位的倍数，默认为1，大于1时更鲜艳，小于1时则失去色彩，直到0变成无色彩的灰色

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/Lrvgbh72yoeDXUxAvXNc3FM2nSd.png)

<pre><code>               饱和度0-1之间时
</code></pre>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/Y7asbpHiYof8tlxqnS5cWZm2nbh.png)

<pre><code>       饱和度大于1时，看上去非常鲜艳
</code></pre>
</div>
</div>

```css
filter: saturate(0.2);    /* 图片1 */
filter: saturate(2);    /* 图片2 */
```

# 某些注意事项

1. 各类变换对于文本等子元素都是生效的。如果您看的不明显可能是由于字体颜色为黑色。党更换颜色时就会看得很明显。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/Wpt2bPeCKoJWwIxxDkzcX2vGnpf.png)

<p>原先状态</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/Z1SGbPmjsozUUgxZIsUcLsllnah.png)

<p>灰度拉满，字体变黑</p>
</div>
</div>

1. 各类变换都有子元素对父元素的继承。如父元素设置了某filter的值为a，子元素设置了相同的filter值为b，那么这个子元素呈现的将是两个值叠加后的状态（并非简单相乘or相加）。我们可以看两个比较直观的例子

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/BYJ4bUX3Do3ZeDxiZiMc84zhnIb.png)

<p>原图</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/B150bkUYMoVwXNxbC9KcLCIJnvc.png)

<p>现在</p>
</div>
</div>

```html
<div class="shadow">
   <img src="..." class="hh">
   <p class="hh">text</p>
</div>
```

```css
.shadow{
  width:200px;
  color:red;
  filter:opacity(0);   /* 父系透明度设置为0 */
}
.hh{
  filter:opacity(1);   /* 子元素透明度设置为1 */
}
```

哎，我不是都把子元素的透明度设置成1了吗，按照后设置的属性覆盖应该不透明啊，咋还一片白了？这就是因为filter属性的子元素属性会和父元素进行叠加产生的，父元素为0时整个区域已经不可见了，子元素的设置不再生效，或者说叠加后的效果是opacity(0)。

看一个两张图都看得见的例子（

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/LxRpbm3lRoGzfwxNBoNcYg4Enoh.png)

<p>状态1</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/EM0KbfaK3o3gHbxAqAgcNRwvn9c.png)

<p>状态2</p>
</div>
</div>

```html
<div class="shadow">
   <img src="..." class="hh">
   <p class="hh">text</p>
</div>
```

```css
/* 状态1的设置 */
.shadow{
  width:200px;
  color:red;
  filter:opacity(0.5);   /* 父系透明度设置为0 */
}
.hh{
  filter:opacity(0.5);   /* 子元素透明度设置为1 */
}

/* 状态2的设置 */
.shadow{
  width:200px;
  color:red;
  filter:opacity(0.9);   /* 父系透明度设置为0 */
}
.hh{
  filter:opacity(0.1);   /* 子元素透明度设置为1 */
}
```

可以看到有很明显的叠加区别，这也说明继承不是由简单的相加产生的。

