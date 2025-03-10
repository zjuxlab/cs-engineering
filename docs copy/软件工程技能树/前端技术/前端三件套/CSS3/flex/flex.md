---
title: flex
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-it1gwwgjriq0w0k7bptcbr4bn8g-ruhywty6risxg9kbqu4ceuwynmd-qzyvwwwpbiltzbk1yr9ckb8jnhq-qzyvww
sidebar_position: 0
---


# flex

Author：符一笑

## <b>css布局方法的演变</b>

先来了解一下布局方式的演变历史，这将会帮助你理解flex布局的定位，同时这也很有意思。

##### <b>table</b>

最早的页面布局使用table，当时的网页功能简单直接，设计师也不用操心布局跑偏的问题，table问题非常明显

- 文件很大，table和div相比占据更大空间
- 一次性加载，页面准备好之前始终是空白的，而div可以加载一个显示一个
- table是表格的意思，所有东西都用表格来装有非语义的问题
- 嵌套问题
- ...

总之，table作为最早的布局已经很少使用，你可能在clear float 里面用过display：table，就是这个东西。

##### <b>div+css</b>

div和css大家都熟，但是有时候熟悉的东西并不是熟悉的意思，div+css主要强调结构与表现分离这个区别于table的特征。在这个阶段我们主要介绍两种布局：1、静态布局，顾名思义就是“静态”的布局，偏爱px的尺寸表示方法。2、流式布局，百分比宽度但是仍然用px表述其他尺寸的布局

静态布局的思路非常直接，面对分辨率不同的问题，直接按照主流分辨率来设计，然后其他分辨率的机子那就委屈一下。大的客户端页面会出现留空，小的则会出现滚动条。然后为了页面留空的时候不至于太难看又出现了“居中对齐显示，两侧留白”的特色；

流式布局试图抢救浪费的空间，同时也为了给小屏幕用户更好的体验（移动端为代表），允许页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。栅栏系统（你也许听过）就是流式布局的代表应用。但是治标不治本，虽然宽度上一定可以铺满了，但是文本、高度仍然是px定死的，移动端用户仍然是一头问号。

##### <b>第三个阶段</b>

取名不能（x

这个阶段出现了自适应布局和响应式布局，主要思路是对屏幕分辨率分类讨论（，然后创建多个布局，响应式布局融合了一些流式布局的思想，相当于根据不同大小自动调整元素宽度。这些布局的前提是媒体查询的引入（现在也在用），同样这个时期还引入了rem这个相对单位（非常重要，现在也在用）。但是这并不是布局的终点

##### <b>第四个阶段</b>

Flex和Grid

flex 即弹性布局，赋予了flex成员改变自身大小填充容器的能力，后文会详细介绍。

Grid布局是最强的CSS布局方案，可操作性强，比flex更加强大。隔壁好像有grid介绍这里就不展开了

## <b>flex的使用场景</b>

        <em>The reason you'd choose to use flexbox is because you want to lay a collection of items out in one direction or another.</em>

        <em>The Flexible Box module  aims at providing a more efficient way to lay out, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word “flex”).</em>

        <em>flex is a framework for positioning elements in one-dimension</em>

flex的诞生主要是为了更好地在一个容器里以一维方式排列一系列子元素，同时允许轻松的控制这些子元素的对齐，分布，和填充等等，和grid不同，flex的能力范围一般是一维控制的。

## <b>flex布局基础以及工程案例</b>

在使用flex的时候，你可以抱着这么一种想法，就是flex就是用来解决问题的，没有必要用flex的思维去构建布局思路。举个例子，假如在页面的一角有个框框，里面要排列一些子框框，那就完全可以单独对这个父框框使用flex，然后解决这一小块的布局问题。

事实上flex有这么一个问题

<em>They lack flexibility (no pun intended) to support large or complex applications (especially when it comes to orientation changing, resizing, stretching, shrinking, etc.)</em>

同样的下面的基础flex属性并不是要全部记住，而是有个印象：“哦，这种布局flex可以一行解决”，然后利用特定属性解决特定问题。（当然，组合拳也是有的，见advance）

一般来讲，使用flex之后不用老想着用其他属性来调布局，这既因为flex会覆盖相当多的属性，又因为flex本身可能已经包含了你想要实现的功能。

所有的（常用）flex属性其实都可以在下面👇这张海报里找到（来源于[https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)，免费下载）欢迎在使用的时候常常核对。

<img src="/assets/RFDMbhlPGolSeTxjhuNcexRhnAd.png" src-width="7200" src-height="10800" align="center"/>

接下来就是逐个介绍一下，各种属性的效果，以及实际应用，各位加深印象，但在开始之前必须介绍一下主轴的概念

<img src="/assets/PjUMb4bblo2jAnx1MdicqujOnLd.png" src-width="1146" src-height="460" align="center"/>

flex盒子的主要理解难点就是主轴的概念，上图很好的展示了盒子的两个轴，主轴就是layout的核心轴，cross轴可以用于在另一个维度上微调布局而且永远垂直于主轴。主轴的方向允许人为指定。

##### <b>display</b>

```css
.a{
     display:flex
 }
```

声明一个元素为flex布局将会使它本身变成flex盒子，其子元素变成flex内容，只需要在父元素调整flex的其他属性就能完成所有子元素的flex布局，十分的神奇，十分的方便（赞赏）。当然了，子元素也可以通过修改个别属性调节自己的布局细节，见-self的两个部分。

##### <b>flex-direction</b>

```css
.container {
   flex-direction: row | row-reverse | column | column-reverse;
 }
```

改变主轴的方向，主要就是横的竖的，假如指定的是row，那么子元素就会横着排开，以一定的顺序

##### <b>order</b>

在子元素上设置，要求是正整数，默认0；

```css
.child_item {
   order: 5; 
 }
```

在flex-direction 上序数小的在前，同序数source里面在前的在前。由于默认是0，随便设大一点order该子元素就会飞到末尾。

##### <b>flex-grow</b>

在子元素上设置，默认0

```css
.item {
   flex-grow: 4; /* default 0 */
 }
```

这是第一个有点说法的属性，先来介绍下他的思路，grow意味着子元素会尝试利用父元素的空余空间，grow的值越大分配到的空余空间就越大。这说明了两件事

- grow是按照比例生效的，将所有子元素都设为1 和所有子元素设为2的效果是一样的。
- 即使不声明子元素的大小，grow也会自动算出实际大小然后渲染。
- grow 1和0 是本质区别，有一个1 存在布局就会有较大变化

grow=0 意味着子元素不会尝试去填充父元素的空隙，这种时候假如子元素没有指定大小会发生什么呢？

<img src="/assets/Zn3YbQO9BofQPWxJHuNcnY3xnlg.png" src-width="426" src-height="114" align="center"/>

```css
<div class="mid-container">
         <div class="tag">hhh</div>
         <div class="tag">hhh</div>
         <div class="tag">hhh</div>
         <div class="tag">hhh</div>
         <div class="tag">hhh</div>
         <div class="tag">hhh</div>
     </div>
 .mid-container{
     height:200px;
     background-color: beige;
     display:flex;
     flex-flow:row wrap;
     align-items: center;
     align-self: center;
 }
 .tag{
     flex:0 1 none;
     border-radius:10px;
     background-color: burlywood;
     text-align: center;
     line-height:20px;
 }
```

答案是根据content产生大小

##### <b>flex-wrap</b>

设置在父元素上，允许子元素多行分布.默认情况下，Flexbox 布局会将所有的子元素放在同一行内，而 `flex-wrap` 属性允许子元素在容器中换行

```css
.container {
   flex-wrap: nowrap | wrap | wrap-reverse;
   /*reverse，不同之处在于子元素会从下到上进行换行，而不是从上到下*/
 }
```

要求父元素有固定的size，子元素也要有“size的信息”，最终的布局会是这些信息综合的结果。常见的flex翻车情形就是不设wrap，然后子元素全部变得又细又长（

##### <b>flex-shrink</b>

设置在子元素上，默认1

```css
.item {
   flex-shrink: 3; /* default 1 */
 }
```

允许子元素缩小以适应父元素的布局状况，

##### <b>flex-flow</b>

集合了flex-direction 和flex-wrap，建议使用集合的描述

```css
.container {
  flex-flow: column wrap;
}
```

##### <b>flex-basis</b>

定义元素在分配空间之前的初始大小.<b>默认值</b>：`auto`，这意味着元素的初始大小将是它的内容的自然大小

```css
.item {
  flex-basis:  | auto; /* default auto */
}
```

可以填写具体的大小比如20%, 5rem,5px或者是keyword（一般只用auto，其他的支持不太好），auto的意思是采用子元素的size。注意，这提供了一种不说明子元素size属性而在flexbox中产生大小的方法。同时将此项设为auto会按照flex-grow分配空白空间。

##### <b>flex</b>

也是简写，设置在子元素上，包括flex-grow , flex-shrink, flex-basis。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

默认就是三个默认的组合：“ 0 1 auto”

##### <b>justify-content</b>

设置在父元素上，一键沿主轴布局.主轴即`flex-direction` 定义的方向

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
```

<img src="/assets/SQiwbJaZtoCSF5xVVVLckf0Zndd.png" src-width="446" src-height="674" align="center"/>

效果已经截在这里了，不用去翻海报啦。个人觉得这是flex应用的关键点，利用好这种一键布局的机会，缩减工作量，（一提，我想到的最直接的达到相同效果的替代方案是流式布局里面猛算，欢迎补充）

##### <b>align-items</b>

设置在父元素上，决定沿着cross axis的布局特点。它决定了单交叉轴中所有项目如何对齐。

```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
}
```

<img src="/assets/Qfh3bolOVoC5c6xvA50cf4kpnpg.png" src-width="421" src-height="540" align="center"/>

效果还是比较一目了然的，解决了css的一个布局痛点呢

##### <b>align-content</b>

设置在父元素上，决定当cross axis 存在空白时如何分配空间。它控制的是多行项目之间的对齐方式（即容器内的行与行之间的间距）。它和 `align-items` 很相似，但是 `align-items` 用于单行项目，而 `align-content` 用于多行项目。

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
}
```

<img src="/assets/YRcgbXFPgovn45xMPagcd191n4t.png" src-width="407" src-height="534" align="center"/>

这里容易和align-item 搞混，只需记住content是操作<b>多行</b>的即可（说明一定是flex-wrap：wrap），当然了flex-start对单行也可以产生效果

##### <b>gap, row-gap, column-gap</b>

设置在父元素上，用来创建空隙

```css
.container {
  display: flex;
  ...
  gap: 10px;
  gap: 10px 20px; /* row-gap column gap */
  row-gap: 10px;
  column-gap: 20px;
}
```

<img src="/assets/NzC3bjDZQoc5W5x8AfkcI8JwnCm.png" src-width="408" src-height="480" align="center"/>

非常直观，照顾了使用flex的后续问题，允许你一懒到底。

##### <b>align-self justify-self</b>

设置在子元素上语法和对应的父级表达相似，用来覆写自己的布局方式

例子

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

##### <b>统一举例</b>

flex负责的工作基本是相同的，故只统一举几例：

###### <b>生成一个tags集合</b>

这也是flex常用的的场景，由于tag本身长度不定，可以给tag加上一定的padding（否则tag大小就是内容的大小）然后父级容器加上wrap。这样就实现了自动调节的效果

<img src="/assets/Kx0WbCasIoR652xNECucxVqSn9f.png" src-width="1008" src-height="406" align="center"/>

```css
.mid-container{
    height:200px;
    /* width:400px; */
    background-color: beige;
    display:flex;
    flex-flow:row wrap;
    align-items: center;
    align-self: center;
    align-content: flex-start;
    gap:10px 30px;
}
.tag{
    size:160px 80px;
    padding:20px;
    /* margin:20px; */
    /* flex:0 1 none; */
    border-radius:10px;
    background-color: burlywood;
    text-align: center;
    line-height:20px;
}
```

###### <b>生成导航栏</b>

嗯，就是这么个意思，大概形这不就有了（

<img src="/assets/NLcMb2Fo4o5TJsxwoO7co75fnGf.png" src-width="2860" src-height="167" align="center"/>

```css
.body{
    display:flex;
    flex-flow:column nowrap;
    align-items: stretch;
}

.navbr{
    height:80px;
    display:flex;
    flex-flow:row nowrap;
    flex-grow:1;
    background-color: rgb(153, 196, 35);
}
.linkage{
    size:160px 80px;
    border-left: 2px solid wheat;
    flex-grow:0;
    text-align: center;
    line-height: 80px;
}
.pad{
    background-color: brown;
    flex-grow:1;
    size:160px 80px;
    text-align: center;
    line-height: 80px;
}
<body>
    <div class="navbr">
        <div class="pad">hhhhh</div>
        <a class="linkage">hhhhhhhh</a>
        <a class="linkage">hhhhhhhh</a>
        <a class="linkage">hhhhhhhh</a>
        <a class="linkage">hhhhhhhh</a>
        <a class="linkage">hhhhhhhh</a>
    </div>
</body>
```

###### <b>生成底部切换栏（突然想不起叫啥）</b>

原理很像顶部导航栏

<img src="/assets/C3VMbqKC2oDfVOxiEcfcj3LKnXe.png" src-width="2846" src-height="81" align="center"/>

```css
.tabbar{
    display:flex;
    flex-flow:row nowrap;
    order:1;
    justify-content: space-evenly;
    /* justify-self: flex-end; */
    background-color: aquamarine;
    height:40px;
    flex:1 1 auto;
}
.s{
    padding:10px;
    background-color: antiquewhite;
}
```

但是这里还有个变种问题，假如我需要它一直浮于下方，可以用flex做到吗，当然是可以的，只要给中间的内容加上flex-grow（你可能经常看到 flex： 1 就是这个意思）；还有就是要让html和body占据100%高度

```css
.page{
    display:flex;
    flex-flow:column nowrap;
    align-items: stretch;
    background-color: blue;
    height:100%;
    margin:0 auto;
}
html,body{
    width:100%;
    height:100%;
    /* background-color: antiquewhite; */
}
.navbr{
    height:80px;
    display:flex;
    flex-flow:row nowrap;
    flex-grow:0;
    background-color: rgb(153, 196, 35);
    
}
.linkage{
    size:160px 80px;
    border-left: 2px solid wheat;
    flex-grow:0;
    flex-shrink:4;
    text-align: center;
    line-height: 80px;
}
.pad{
    background-color: brown;
    flex-grow:1;
    size:160px 80px;
    text-align: center;
    line-height: 80px;
}
.mid-container{
    height:200px;
    background-color: beige;
    display:flex;
    flex:1;
    flex-flow:row wrap;
    align-items: center;
    align-self: center;
    align-content: flex-start;
    gap:10px 30px;
}
.tag{
    size:160px 80px;
    padding:20px;
    border-radius:10px;
    background-color: burlywood;
    text-align: center;
    line-height:20px;
}

.tabbar{
    display:flex;
    flex-flow:row nowrap;
    order:1;
    justify-content: space-evenly;
    background-color: aquamarine;
    height:40px;
    flex:0 1 auto;
}
.s{
    padding:10px;
    background-color: antiquewhite;
}
```

rt（

<img src="/assets/Lh9MbKnnFoZ8xyxzeh5cKI6snbf.png" src-width="2840" src-height="1483" align="center"/>

###### <b>生成并列文本介绍区</b>

原理还是一样，横向划分空间即可

<img src="/assets/VzFNbF6W3ouh7DxnfbSciaIBnLe.png" src-width="2398" src-height="789" align="center"/>

配色再次绝杀（

```css
.text-container{
    height:400px;
    border-radius: 40px;
    background-color: blueviolet;
    display:flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: stretch;
    gap:30px;
}
.text-box{
    overflow:hidden;
    min-width:150px;
    border-radius: 25px;
    background-color: blanchedalmond;
    flex:1;
}
```

宽窄不一样的陈列也是可做的，设置不同的flex-grow即可。

## <b>flex advance以及案例</b>

##### <b>结合媒体查询的弹性盒子</b>

有时候，即使使用了弹性盒子，仍然需要结合媒体查询来实现更加细致的UI效果，大致的思路是用媒体查询将屏幕大小划分为几种基本情况，然后在每个基本情况中利用好弹性盒子的灵活性。理解起来不难，不过很难举出例子，这里贴个代码片段防止糟糕的文字描述影响理解：

<img src="/assets/AHlVbIpVwoXgKtx1bOAcmmk6nBd.png" src-width="1529" src-height="957" align="center"/>

##### <b>利用好flex-grow</b>

flex-grow 算是开袋即食的flex里面比较有开发价值的属性了，先重提一下grow的几条理解：

- 比例生效
- 自动计算大小
- 1和0的本质不同

第三条很有意思，比如说，它可以让你在一些情况下把flex-grow 当float用；想象在一个方形flex父元素里有两个子元素，把左边的子元素grow置1 然后右边的置0（当然这也是默认的），然后由于左边的元素会试图填满父元素的空白，而且1和零相比是超级碾压，所以左边的元素会一直变长...变长直到把右边的元素摁到右边界。

<img src="/assets/NOrnb0gBjovXeKxFtnsc4vpZnyg.png" src-width="1703" src-height="313" align="center"/>

看起来就像是使用了float。而且更棒的是，这附带了一个wrap的功能，只要把父元素加上wrap，右边的元素会在位置不够的时候自动换行

<img src="/assets/EIh4bVU2foz4g5xku4gcVEAvn3b.png" src-width="1701" src-height="430" align="center"/>

##### <b>文本省略</b>

原理上和flex不是强相关的，大家可以看看这个

##### <b>条条块块布全局</b>

最后探讨一下flex布全局的可能性，总体来讲，在非常合适的情况下，flex也可以成为布局核心。那么条件是什么呢，就是页面有明显的轴线。看几个例子来理解

<img src="/assets/AHnkbHPRHo3ytvxkGXTciNRanAb.png" src-width="2460" src-height="1450" align="center"/>

这个就是可以做的，可以看到额外加了很多红圈，都是可以插入flex父元素的地方

<img src="/assets/Dsgqb4HiSofXmBxFrl0cW0WOnkg.png" src-width="2869" src-height="1511" align="center"/>

这个有两个列，用grid更加合适，当然用flex也是可以做的（多个列和使用wrap没有直接关系，你可以简单的横向放两个弹性盒子然后细分其中的一个）

<img src="/assets/Ayzpb2uLCoiDabxSK0ccCKBPnAg.png" src-width="2849" src-height="1489" align="center"/>

这个也可以👆

所以说使用得当flex布局还是可以扬长避短的，让你在很短的时间里完成一个大布局

## <b>总结和task</b>

总结来看，flex能够给前端布局带来很大的便利，flex擅长一维布局，在页面有明显轴线的时候还可以作为全局布局的选择。另外一方面，flex在部件上的表现也可以非常出色，提供十分轻量的快速布局方式，避免hard coding，提升布局的鲁棒性。

## <b>task</b>

- 结合flex和其他你擅长的css整点有趣的东西
- 尝试找一个可以用flex布局实现的网页，实现它。

#### <b>参考资料和草稿</b>

(*^_^*)

