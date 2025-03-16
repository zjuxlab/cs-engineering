---
title: transition
slug: transition
sidebar_position: 0
---


# transition

Author:徐旻昶

# transition动画简介

transition意译为中文应该叫做“过渡”，用比较科学的话来描述这一动画效果即为“将某一属性的开始值在线性时间内变化到结束值”。

如果您还对transition的效果了解并不是很直观，可以观看下面这张动图的效果，当鼠标移动到这个图标上时，这个图标在线性时间内被均匀的放大了，这就是transition的基础效果。

![](/assets/MvnxbSJayoG2bfxo4NDcDAyXnte.gif)

# transition的四个属性

在了解transition的具体属性之前，我们先来看看上面预览图的简单过渡效果是如何实现的

```css
<img ... class="image">   /*显示图片的html代码*/
...
...
.image{
  ...
  width: 100px;   /*正常情况下效果*/
  transition: width 3s;   /*transition属性*/
}
.image:hover{
  width: 300px;   /*鼠标覆盖到图片上时的效果*/
}
```

在鼠标未移动到图片上时，图片采用的class是image，它的宽度为100px；而鼠标移动到图片上时采用image:hover的class，宽度为300px；而实现100px到300px的线性过渡效果的，就是这一句

```css
transition: width 3s;
```

看起来非常方便是吗（

接下来我们将从每个transition属性的参数入手来了解过渡语句的含义

## transition-property

transition-property用于设置<b>元素中参与过渡的属性都有哪些</b>，您可以简单的把它理解为一个要加入transition活动的属性名单

```css
transition-property: none | all | property;
```

1. 如果您将property设置为none，则表明没有任何属性会被这一条过渡属性影响
2. 如果您将property设置为all，则表明该元素的所有属性都会参与到过渡动画当中
3. 如果您将property设置为详细的属性名，则被您列出的属性名会参与到过渡动画当中，不同的属性之间用逗号分隔。

## transition-duration

transition-duration用于设置<b>过渡动画效果持续的时间</b>，直接设置为单位为s或ms的数字即可

```css
transition-duration：.3s， 20ms；
```

1. 如果您将duration设置为0，则该过渡效果不会生效
2. 您可以省略小数点前的0
3. 当您的property有用逗号隔开的<b>多个属性</b>时，duration可以为每一个属性设置对应的持续时间，如上述代码块，也用逗号隔开一一对应

## transition-timing-function

transition-timing-function用于设置<b>过渡动画的类型</b>，可选属性有：

<table>
<colgroup>
<col width="185"/>
<col width="520"/>
</colgroup>
<tbody>
<tr><td><p>value</p></td><td><p>description</p></td></tr>
<tr><td><p>linear</p></td><td><p>以相同的速度完成过渡变化，线性时间变化</p></td></tr>
<tr><td><p>ease</p></td><td><p>开始时慢速，中间较快，结束时慢速</p></td></tr>
<tr><td><p>ease-in</p></td><td><p>开始时慢速，后来变快</p></td></tr>
<tr><td><p>ease-out</p></td><td><p>开始时快速，后来变慢</p></td></tr>
<tr><td><p>ease-in-out</p></td><td><p>开始时慢速，中间加速到一个固定速度保持一段时间，结束时慢速</p></td></tr>
<tr><td><p>cubic-bezier(n, n, n, n)</p></td><td><p>自定义过渡速度，每个参数的范围都是0-1</p></td></tr>
</tbody>
</table>

```css
transition-timing-function: cubic-bezier(.25, .1, .25, 1.0);
```

![](/assets/GveIbBhZ6o8wc1xEPVUcC1wHnmu.png)

1. cubic-bezier意为<b>贝塞尔曲线</b>，这是一条控制过渡速度变化的曲线，只需要有四个点就可以自动进行该曲线的生成。曲线每一处的斜率对应了每一时刻的<b>过渡动画速率</b>（因为横纵轴都是0-1，所以您将哪个轴理解成时间轴都没关系），函数中的4个n对应的分别是（x1，y1，x2，y2），即P1、P2两点的坐标，而P0和P3在transition中是固定不变的。我们可以通过设置P1、P2的坐标值完成任何速率的过度变化，如ease变化等效于（0.25，0.1，0.25，1.0）。
2. 可能有弹幕会问了，哎呀ease和ease-in-out不都是慢快慢吗，没什么性质上的区别也要占两个关键字？别急，ease-in-out由慢速会在大概1/3的时间变为快速，然后<b>保持在这个速度一段时间</b>，再变为慢速；ease由慢速变为快速<b>会一直增长</b>，增长到最快速时再渐渐减慢速度。在贝塞尔曲线上反应，ease等效于cubic-bezier(0.25, 0.1, 0.25, 1.0)，而ease-in-out等效于cubic-bezier(0.42, 0, 0.58, 1.0)，我们可以在图中明显看到不同。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/IKSnbCj7hojLqzxtXhjc6Q2onub.png)

<p>ease的贝塞尔曲线</p>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/TtZnbfZiBoCQVwxUDI3ceEMKnIc.png)

<p>ease-in-out的贝塞尔曲线</p>
</div>
</div>

## transition-delay

transition-delay用于设置<b>过渡动画在执行前需要等待的时间</b>，数据类型同duration

```css
transition-delay: .3s，20ms;
```

1. 当数值为负时，过渡效果会直接开始
2. 多个delay时间的使用同duration，与property一一对应，逗号隔开

## transition同时对四个属性进行设置

如可以用以下例子：

```css
transition:property1 duration1 function1 delay1, property1 duration2...
```

将上述四个属性的值区分开，每个property用逗号隔开，每个property对应的四个属性值用空格隔开，可以缺省。

# transition的使用

可能大家会有疑问，transition是两个状态之间的变化，怎么对一个元素写两个class的属性让其“动起来”呢？

css很贴心地为我们提供了鼠标事件，使用<b>div:mouseMove</b>就可以编写“当鼠标怎么怎么样”时的状态了

<table>
<colgroup>
<col width="316"/>
<col width="506"/>
</colgroup>
<tbody>
<tr><td><p>事件</p></td><td><p>代码</p></td></tr>
<tr><td><p>div</p></td><td><p>假设有一个分块叫div，我们使用div{}设置它的style</p></td></tr>
<tr><td><p>div:hover</p></td><td><p>当鼠标悬停在这个div上时的style</p></td></tr>
<tr><td><p>div:link</p></td><td><p>在鼠标点击这个div前的style</p></td></tr>
<tr><td><p>div:active</p></td><td><p>在鼠标点击这个div时的style</p></td></tr>
<tr><td><p>div:visited</p></td><td><p>在鼠标点击这个div后的style</p></td></tr>
<tr><td><p>div:focus</p></td><td><p>鼠标聚焦时的style（如输入框）</p></td></tr>
</tbody>
</table>

当然，如果您想让过渡动画运用到一些比较复杂的鼠标响应事件当中，可能您会需要VS的知识。

其实transition动画本身是<b>让一个html的元素在两种css style之间进行过度转化的过程</b>，所以您也可以这么写：

```css
/*这里是html伪代码*/
<if flag==0>  <div class="style1"> ...
<else-if flag==1>  <div class="style2">...

/*这里是css伪代码*/
style1 {
    transition:...}
style2 {
    transition:...}
```

同样可以达到过渡动画的效果

