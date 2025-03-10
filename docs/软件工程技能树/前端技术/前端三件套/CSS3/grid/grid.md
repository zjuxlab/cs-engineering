---
title: grid
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-it1gwwgjriq0w0k7bptcbr4bn8g-ruhywty6risxg9kbqu4ceuwynmd-fsy1wgaediq7prkpwaochqlbn6e-fsy1wg
sidebar_position: 1
---


# grid

### <b>CSS grid</b>

#### <b>outline</b>

- css布局方法的演变（强调和flex的区分）
- grid的使用场景
- grid布局基础以及工程案例
- grid advance以及案例
- 总结和task
- 参考资料和草稿

<b>warning 本篇是🐏着写的，就，有时候会敲错键，一般来说不影响理解，但是本片中如果看到突然出现的”狗日的“那我是试图表达"grid"然后拍了空格</b>

#### <b>css布局方法的演变</b>

先来了解一下布局方式的演变历史，这将会帮助你理解grid布局的定位，同时也是很有意思的事。实际上类似的内容在 隔壁的 css flex 开头写过了，但是考虑到大家翻来翻去不方便，直接在这里再写一次好了

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

薄纱之前所有布局方式

flex 即弹性布局，赋予了flex成员改变自身大小填充容器的能力。在一维情况下表现出色

Grid布局是最强的CSS布局方案，可操作性强，比flex更加强大。尤其适用于二维的情形。

#### <b>Grid 的使用场景</b>

        一般来讲，目前的网页基本都可以用grid来实现布局，所以真要讨论使用场景那会非常宽泛，而且没什么意思，我的想法是在后面逐渐推进的过程中展示grid 的布局能力，然后再来总结其适合的任务。

        不过这里还需要提到的一点，那就是flex 和grid 的区别。同为最新的布局武器，flex 和grid 都是可以相互完成对方的所有功能的（通过一些技巧），但是总归有更适合flex 的场景和更适合grid的场景，所以还是有必要探讨一下两者的差别。

flex的诞生主要是为了更好地在一个容器里以一维方式排列一系列子元素，同时允许轻松的控制这些子元素的对齐，分布，和填充等等，和grid不同，flex的能力范围一般是一维控制的。比如控制元素沿主轴的分布和在副轴的分布，不过除此以外，控制就不是非常直接了。flex最舒服的时候就是场景简单，或者说符合flex的预设布局的时候（大多数时候就够了）。但是，这种需要看场景发挥作用，一旦出现偏差工作量就会明显上升的布局方法，总给人一种不踏实的感觉，grid就没有这样的烦恼。

马上我们就会看到，grid提供了很多精细的操作，让我们获得了更大的控制，所以不难理解为什么grid有许多拥护者。

对于flex 和grid 的区别，这里再摘录一些：

> <b>There are plenty of layout situations in which you could use either one to do what we need to do, and plenty of situations where one is more well-suited than the other. </b>
> <b>Grid is mostly defined on the parent element. In flexbox, most of the layout (beyond the very basics) happen on the children</b>
> <b>Grid is better at overlapping and studier</b>

#### <b>grid布局基础以及工程案例</b>

grid 的基础非常直观，简单来讲，grid就是首先在父级创造一个grid模板，然后让子级在模板上通过圈地找到自己的位置，这样就完成了布局功能。（就和那种布阵游戏挺像的，把大大小小的建筑找到位置摆下来，唯一的区别就是grid允许子级重叠，游戏里不行，不然算开挂）

在介绍具体的属性之前，先把几个术语解释一下。

<img src="/assets/Du4Xbm1T4oLbsDx9VAfcV4R7nTh.png" src-width="869" src-height="577" align="center"/>

##### <b>grid container</b>

也就是父级元素，grid和flex一样，也是在父级元素上定义的

##### <b>grid item</b>

子级元素，注意只包含直接子级元素

##### <b>grid line</b>

也就是格点的边界，假如一个表格有三列，那就有四根列线，n列就有n+1条线。行也是一样。

##### <b>grid cell</b>

由四条边界包成的区域（上下左右）

##### <b>grid track</b>

由两条平行边界围成的区域（上下或者左右）

然后就没有了，来看属性吧。

##### <b>display</b>

```css
.container {
   display: grid | inline-grid;
 }
```

声明一个元素为grid布局将会使它本身变成grid盒子，其子元素变成grid内容，和flex一样，都可以通过父级元素和自己元素上的属性控制子级元素的布局（比如justify 和 align）

##### <b>子元素定位</b>

grid里面有非常多的缩写，一个定位可以用四句话写也可以只用两句，甚至可以只用一句。

不过核心思路是一样的，子元素的定位就是指定cell（一个或者多个）的过程，直接的思路就是指定四条线，这对应着四个属性：

##### <b>grid-column-start grid-column-end grid-row-start grid-row-end</b>

意思很直观就是指定上下左右四条线。

代码上，只需要理解一下指定这几条线的方法

```css
.item {
   grid-column-start: <number> | <name> | span <number> | span <name> | auto;
   grid-column-end: <number> | <name> | span <number> | span <name> | auto;
   grid-row-start: <number> | <name> | span <number> | span <name> | auto;
   grid-row-end: <number> | <name> | span <number> | span <name> | auto;
 }
```

number对应的是 grid-line 的编号，注意是从1 开始的，也就是说左上的cell的对应线是1212.

name 是另外一种标记方式，在父级声明 grid-line 的时候可以给每条线取名字，于是可以用名字来找到这些线。注意名字是可以重复的，这时候需要补上这条线在同名线中的序号，也是由一开始的。

span 的意思就是指定一个终点，这个区域会一直变长变长直到戳到最后那条线。

之前也说了这四条事可以合成两条的，像下面这样：

##### <b>grid-column grid-row</b>

```css
.item {
   grid-column: <start-line> / <end-line> | <start-line> / span <value>;
   grid-row: <start-line> / <end-line> | <start-line> / span <value>;
 }
```

意思完全相同，直接按照上面理解即可

##### <b>grid-area</b>

是时候一句话完成这个任务了

```css
.item {
   grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
 }
```

值得注意的是，指定area的时候有一种独有的方法，使用“name“

欸，不是刚刚就有了吗，这里原理相同，也是在父级声明 template area的时候给area起的名字，之后会再次提到的。

##### <b>声明 grid 框架</b>

##### <b>grid-template-columns grid-template-rows</b>

这部分就是最直观的如何声明一个grid了，一般的采取只声明宽度和高度的方式，其效果是画出一系列的方格子。

```css
.container {
   grid-template-columns:  40px 50px  auto 50px 40px [end];
   grid-template-rows:  25%  100px auto ;
 }
```

也可以顺带给line起名字，代码上的顺序就是最后结果的顺序，名字用中括号包起来

```css
.container {
   grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
   grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
 }
```

你也可以使用repeat来省去重复劳动

```css
.container {
   grid-template-columns: repeat(3, 20px [col-start]);
 }
```

repeate (n , xx yy) 相当于写n 次后面的东西。

 另一个好用的单位是 fr（free space的缩写），和flex那里的原理差不多，总的自由空间会通过父级元素的size 去掉硬性的行与列的宽度来计算，然后这些空间会按照比例分配给以自由空间为单位的行与列。比例和fr前面的数值有关，例如：

```css
.container {
   grid-template-columns: 1fr 50px 2fr 1fr;
 }
```

就会先从父级元素刨去50px 做第二列然后把剩下的（横向的）自由空间按照1：2：1的比例分配掉。

##### <b>grid-template-areas</b>

这个属性可以在声明完grid框架之后给area事先起好名字，这里的语法直观得可怕，我觉得都不用解释。

就像这样

```css
.container {
   display: grid;
   grid-template-columns: 50px 50px 50px 50px;
   grid-template-rows: auto;
   grid-template-areas: 
     "header header header header"
     "main main . sidebar"
     "footer footer footer footer";
 }
```

在这个例子中子级元素可以这样定位

```css
.item-a {
   grid-area: header;
 }
 .item-b {
   grid-area: main;
 }
 .item-c {
   grid-area: sidebar;
 }
 .item-d {
   grid-area: footer;
 }
```

效果就是这样，很直观。

<img src="/assets/IVVybKcproHl4Wx3Mircj19dnPc.png" src-width="699" src-height="466" align="center"/>

##### <b>grid-template</b>

和之前子元素定位的时候一样，父元素搭建grid框架和指定area名称的三条属性也可以合成一条，如下

```css
.container {
   grid-template: none | <grid-template-rows> / <grid-template-columns>;
 }
```

你甚至可以在中间直接为区域命名

```css
.container {
   grid-template:
     [row1-start] "header header header" 25px [row1-end]
     [row2-start] "footer footer footer" 25px [row2-end]
     / auto 50px auto;
 }
 
 //等效于:
 //.container {
 //  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
 //  grid-template-columns: auto 50px auto;
 //  grid-template-areas: 
 //    "header header header" 
 //    "footer footer footer";
 //}
```

<em>当然啦，grid没那么简单，这几个模块里面有许多trick，甚至有几个trick可以说是grid的灵魂所在，后面会一一介绍的，目前为止暂时只需要知道怎么声明框架，怎么定位即可</em>

##### <b>喜闻乐见的 justify-align</b>

看过（或者用过）flex的应该早就接触了这个内容了，没错，和flex里面的一模一样 ，大家配图食用。想必主轴副轴什么的大家已经品鉴够了，我就端下去不再重复了，有兴趣去翻隔壁flex。

##### <b>justify-self</b>

设置在子元素上，一共这么几种选项,配图顺序一致

```css
.item {
   justify-self: start | end | center | stretch;
 }
```

<img src="/assets/KAUWbQoBLoXFuRxrZmRcccdknDd.png" src-width="770" src-height="271" align="center"/>

<img src="/assets/TyAAbpwino8TQ0xrEz9ctgeXnRe.png" src-width="774" src-height="277" align="center"/>

<img src="/assets/XptMb7eTpoIvg4xKaQlclbGAn7f.png" src-width="783" src-height="284" align="center"/>

<img src="/assets/M9ULbdk97oDYK6xjxiccH7RRnyg.png" src-width="777" src-height="290" align="center"/>

##### <b>align-self</b>

设置在子元素上，看图即可

```css
.item {
   align-self: start | end | center | stretch;
 }
```

<img src="/assets/TX6HbfOrIoVQusxTZuEcamT1nkb.png" src-width="775" src-height="276" align="center"/>

<img src="/assets/WS3TbnacgoGQcPxhDPMcM6a8nsf.png" src-width="785" src-height="284" align="center"/>

<img src="/assets/H62fb3fieohsWfxFyb7czzoanNb.png" src-width="781" src-height="216" align="center"/>

<img src="/assets/CySEbOpxNoML94xfPYpccsE5nbe.png" src-width="767" src-height="139" align="center"/>

<img src="/assets/SqocbhmXroRXCzxs0Jcc64MBn4f.png" src-width="783" src-height="289" align="center"/>

##### <b>place-self</b>

justify-self和allign-self的结合

举个例子：

```css
.item-a {
   place-self: center stretch;
 }
```

以上三条都是用于分配子级元素在所定位的网格中自由空间的分配的。

##### <b>column-gap row-gap grid-column-gap grid-row-gap</b>

又和flex一样（其实不如说是flex 从grid吸收了gap的思想）

grid也支持gap，注意到有两种描述方式，一种是有前缀的一种没有。现在一般直接使用 column-gap 和 row-gap即可。

```css
.container {
   grid-template-columns: 100px 50px 100px;
   grid-template-rows: 80px auto 80px; 
   column-gap: 10px;
   row-gap: 15px;
 }
```

<img src="/assets/XyTSbjTo8oG9tKxLPOPcNlVjnBf.png" src-width="684" src-height="555" align="center"/>

##### <b>gap grid-gap</b>

column-gap 和 row-gap的缩写，同样现在一般用gap

```css
.container {
   /* standard <em>/
   gap: <grid-row-gap> <grid-column-gap>;
 
</em><em>   /</em> old */
   grid-gap: <grid-row-gap> <grid-column-gap>;
 }
```

##### <b>justify-items</b>

定义在父级元素上，指定子元素在对应格子中的布局方法（沿主轴）

```css
.container {
   justify-items: start | end | center | stretch;
 }
```

<img src="/assets/A4DRbYbWIoFug2xCoSNckHY6nIc.png" src-width="691" src-height="251" align="center"/>

<img src="/assets/PDlLb6Qyuoh59oxsJ3Qcs5xZnQe.png" src-width="699" src-height="254" align="center"/>

<img src="/assets/LTwUbXCDSoX1LmxHs7hcEuu2nNd.png" src-width="705" src-height="249" align="center"/>

<img src="/assets/NnLTbxh9Po5tZVxwOIPcF8hjnAg.png" src-width="695" src-height="254" align="center"/>

效果相当于所有子元素写justify-self

##### <b>align-items</b>

定义在父级元素上，控制所有子级元素在各自单元里的布局（副轴方向）

```css
.container {
   align-items: start | end | center | stretch;
 }
```

这里就不贴图了，和一个个子元素分开定义效果完全相同。

##### <b>place-items</b>

相当于 justify-items 和 align-items 的结合，同理吧

```css
.center {
   display: grid;
   place-items: center;
 }
```

##### <b>justify-content</b>

设置在父元素上，一键沿主轴布局

```css
.container {
   justify-content: start | end | center | stretch | space-around | space-between | space-evenly;    
 }
```

效果已经截在这里了,注意和justify-items 的不同，justify-content 会在父级的主轴上调整列的分布。

<img src="/assets/T8CMbDuRAoPAjdx77RucZxrwnnf.png" src-width="824" src-height="397" align="center"/>

<img src="/assets/SMx7bYcDzorhtgxflUFcG0cMnMh.png" src-width="807" src-height="399" align="center"/>

<img src="/assets/TMmNbBMT0oGsb2xO5FQcL81rnae.png" src-width="813" src-height="408" align="center"/>

<img src="/assets/FPMebHgQforGkXxOmKgcMxUvnZe.png" src-width="806" src-height="409" align="center"/>

<img src="/assets/XXgObW0b3o2RmFxyfPFcHo5Onxh.png" src-width="819" src-height="414" align="center"/>

<img src="/assets/QGm0btVy1oNpqbx3NRBcpdEQnZj.png" src-width="813" src-height="410" align="center"/>

<img src="/assets/A943b7YlYo9g5fxdlkYcTGjAnBd.png" src-width="815" src-height="403" align="center"/>

##### <b>align-content</b>

也是设置在父元素上，决定行沿着cross axis的布局特点。

```css
.container {
   align-content: start | end | center | stretch | space-around | space-between | space-evenly;    
 }
```

<img src="/assets/Okl5bwSPDoQfQpxzuj1cGK7bnYd.png" src-width="805" src-height="731" align="center"/>

<img src="/assets/NHSGbGj69oZfuBxS2Fxc21tinqf.png" src-width="795" src-height="719" align="center"/>

<img src="/assets/P8CybKDUJoO9VRxCpnPckaWFnOh.png" src-width="824" src-height="737" align="center"/>

<img src="/assets/ViVvbi5oootRRhxP7KCcgUNAn8f.png" src-width="809" src-height="726" align="center"/>

<img src="/assets/HlYAbgiYzoflUYxYOk8csFlYnQf.png" src-width="800" src-height="727" align="center"/>

<img src="/assets/VZcBb4xFRoBBZwx6BwtcGpjEn5e.png" src-width="808" src-height="733" align="center"/>

效果还是比较一目了然的，这块就是和flex相互借鉴。也在很大程度上解释了为啥flex和grid可以相互替代使用。

##### <b>place-content</b>

可以抢答了，这是 justify-content和align-content的结合（

##### <b>grid-auto-columns grid-auto-rows</b>

这是什么？不是已经声明过columns和row了吗？来看看下面这种情况：

```css
.container {
   grid-template-columns: 60px 60px;
   grid-template-rows: 90px 90px;
 }
 .item-a {
   grid-column: 1 / 2;
   grid-row: 2 / 3;
 }
 .item-b {
   grid-column: 5 / 6;
   grid-row: 2 / 3;
 }
```

注意到父级元素只有两列，子元素的area超出了父级的范围；但是这样是合理的吗？是的。

会发生的事情是首先（隐式地）用宽为0的columns填充中间，然后创建一个90px * 60 px 的格子来放 item-b。

也就是这样（行同理，在扩展一维的时候如果另外一纬还在已知范围里，就会直接使用对应的宽或者高）

<img src="/assets/E8XpbtHEBocPFAxaDXwcsUSRnBd.png" src-width="774" src-height="587" align="center"/>

如果我申明了 grid-auto-columns grid-auto-rows 又会发生什么呢？

```css
.container {
   grid-auto-columns: 60px;
 }
```

隐式构造的格子会按照auto里面的大小来

<img src="/assets/BJmHbOdXEomFiHxG7sLcvAhMnQh.png" src-width="810" src-height="467" align="center"/>

##### <b>grid-auto-flow</b>

最后介绍 auto-flow

目前为止，子元素的位置都需要一一声明，那万一有一大堆子元素，一一指定虽然很令人安心，但是我们还是希望有方法完成简单的填充。

auto-flow就是干这个的

```css
.container {
   grid-auto-flow: row | column | row dense | column dense;
 }
 //默认是row，也就是你可以直接塞子元素，结果是一格一个
```

看看这个例子：

```html
<section class="container">
   <div class="item-a">item-a</div>
   <div class="item-b">item-b</div>
   <div class="item-c">item-c</div>
   <div class="item-d">item-d</div>
   <div class="item-e">item-e</div>
 </section>
```

```css
.container {
   display: grid;
   grid-template-columns: 60px 60px 60px 60px 60px;
   grid-template-rows: 30px 30px;
   grid-auto-flow: row;
 }
 .item-a {
   grid-column: 1;
   grid-row: 1 / 3;
 }
 .item-e {
   grid-column: 5;
   grid-row: 1 / 3;
 }
```

没有给 b c d 指定位置，结果会怎么样呢？

<img src="/assets/LBDabs99Ao1ronxP7jCcKFbJnEd.png" src-width="806" src-height="256" align="center"/>

假如改成column什么效果？

<img src="/assets/Jj6pb4IpRoUAp8xpliGcnaJdnSf.png" src-width="801" src-height="244" align="center"/>

##### <b>grid</b>

一堆东西的超级螺旋无敌简写，假如你真的是利用它逐个指定属性，那它存在的意义大概就是让看代码的人迷惑。但是当指定的属性不太多时，grid这种缩写还是好用的。（不打算讨论怎么整花活，代码易懂优先吧）

看一下定义吧，代码容易看晕。

> A shorthand for setting all of the following properties in a single declaration: `grid-template-rows`, `grid-template-columns`, `grid-template-areas`, `grid-auto-rows`, `grid-auto-columns`, and `grid-auto-flow`

以下几个代码块中两段都是等价的

```css
.container {
   grid: 100px 300px / 3fr 1fr;
 }
 
 .container {
   grid-template-rows: 100px 300px;
   grid-template-columns: 3fr 1fr;
 }
```

```css
.container {
   grid: auto-flow / 200px 1fr;
 }
 
 .container {
   grid-auto-flow: row;
   grid-template-columns: 200px 1fr;
 }
```

```css
.container {
   grid: auto-flow dense 100px / 1fr 2fr;
 }
 
 .container {
   grid-auto-flow: row dense;
   grid-auto-rows: 100px;
   grid-template-columns: 1fr 2fr;
 }
```

```css
.container {
   grid: 100px 300px / auto-flow 200px;
 }
 
 .container {
   grid-template-rows: 100px 300px;
   grid-auto-flow: column;
   grid-auto-columns: 200px;
 }
```

##### <b>grid中特色的度量单位和方法</b>

既然grid的核心就是画格子，那就有必要介绍一下几个grid的特色度量了，熟用这些特点可以做到更轻松的布局。同时这些长度表示方式可以给grid增加灵活性，让grid 可以自动调整布局（不然怎么薄纱之前的布局方式）

##### <b>fr units</b>

基本上用上grid的开发者最后都会变成 fr 单位爱好者，因为确实可以经常用到，之前已经解释过了，fr的基本含义就是自由空间，也就是剩下的空间，而且fr 和其他度量单位混用的时候协调效果非常好（大多数时候都会按照你的预期来表现，这是解释fr的代码比较好导致的）

auto 和 fr 很像，不过 fr在竞争空间的时候优于auto

下一块有两者的比较

总之，尝试使用fr吧。

##### <b>Sizing Keywords</b>

更全面的罗列一下特色度量，本质上下面的东西都是某种“长度”

- `min-content`: content的下限，事实上应该说是最大值的最小值这样，举个例子就很好懂了，假如一串英文：”good morning my friend“ 那么最长的单词就是 morning ，于是可以装下content的最短长度当然就是 “morning”的长度，只要能装下morning，其他单词一定能装下，但是长度如果小于morning，那morning就装不下了（就是下界的意思）。
- `max-content`: 同理啊，是content的上界，假如max-content再增加就会出现自由空间了，还是以”good morning my friend“为例，那么max-content 就是整个串的长度。再变大就会出现自由空间了
- `auto`: 和fr很像，但是抢不过fr
- `fit-content`: 使用适当的空间但是不小于 min-content，不大于max-content
- `fractional units`: see above

例子：fr 揍扁了 auto

```css
.container{
     margin:300px ;
     display:grid;
     grid:repeat(3,120px) / 1fr 3fr auto;
     place-items:stretch;
     gap:5px;
     height:400px;
     width:600px;
     background-color: blueviolet;
 }
 .item1{
     grid-area:1/1/2/2;
     z-index:1;
 }
 
 .item2{
     grid-area:2/2/3/3;
     z-index:2;
 }
 
 .item3{
     grid-area:3/3/4/4;
     z-index:0;
 }
```

<img src="/assets/N61jbb6UwokBKZxjxNDcisMEnlf.png" src-width="1239" src-height="829" align="center"/>

当子元素有content之后auto还是可以站起来的：

<img src="/assets/ESOPbJRFaoth3xx4m8TcMg6xnkb.png" src-width="1246" src-height="829" align="center"/>

##### <b>Sizing Functions</b>

主要就是介绍 minmax（）这个函数。grid 能够拉伸自己的长度，minmax 则可以指定这个长度的上界和下界。

 grid-template-columns: minmax(100px, 1fr) 3fr;

可以看到minmax（）内部也是可以使用花样繁多的单位的。

当然你可以仅仅使用min（）或者max（）；

minmax（）是两者的整合。

##### <b>repeat() Function and Keywords</b>

repeat的基础含义很容易理解，但是它的高级应用非常强大，要使用这些高级应用，需要结合几个Keyword，

- `auto-fill`: Fit as many possible columns as possible on a row, even if they are empty.
- `auto-fit:` Fit whatever columns there are into the space. Prefer expanding columns to fill space rather than empty columns.

其中有一个Grid布局最著名的技巧，同时也是css中最帅的技巧之一：

看下面这句

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

猜猜他是什么效果呢？别急我们先来看看另外一个情景，最后再来揭晓这个效果。

下面是一段很普通的grid定义，相信都看懂了

```css
.grid {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   gap: 1rem;
 }
```

假如塞三个子元素进去，那么他们就会自动占据第一行的一号二号三号格。假如我再塞一个呢？grid会自动产生一个新的行然后把四号元素放到第二行一位。这里发生了一件有趣的事情，就是grid似乎不用管行的声明（准确的说是被隐式声明了），这给予了我们代码上的简洁和功能上的强大。而且支持未知数量的子元素。

按照相同的思路，我们希望使<b>列</b> 也可以享受这种啥也不说就能工作起来的方便。我们只需要把grid-auto-flow改成 `column` ,然后删掉 grid-template-columns。

```css
.grid {
   display: grid;
   gap: 1rem;
   grid-auto-flow: column;
 }
```

这会有什么效果呢？当我们配上这样的HTML后

```html
<div class="grid">
   <div></div>
   <div></div>
 </div>
 
 <div class="grid">
   <div></div>
   <div></div>
   <div></div>
 </div>
 
 <div class="grid">
   <div></div>
   <div></div>
   <div></div>
   <div></div>
   <div></div>
 </div>
```

我们得到这样的结果（还要设置下子元素的格式，不过和布局没关系）

<img src="/assets/VDF7bQFi0o370jxxwNocHfIRnGb.png" src-width="1052" src-height="724" align="center"/>

可以看到，grid自动生成了列，而且有几个元素就会生成多少。还有个可以使用gap的附加好处。

这样的作法方便了，但是失去了 wrapping 的能力，我们没法指定一行放几列，或者说列的宽度了。

如何弥补这种缺陷呢，那就是grid的经典trick

```css
.grid {
   display: grid;
   gap: 1rem;
   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
 }
```

思考一下这个代码是如何工作的，首先auto-fit尽量往一行里塞列，一开始的列都能取minmax的上界 1 fr，所以这些列都是等宽的，然后当列越来越多直到再增加列就会导致掉下200px的下界；这时候列就创建完成了，行会自动扩展不用去管。效果就是这样：

<img src="/assets/A4W2buJ0So4ENcxrC07c5TEFnQD.png" src-width="2383" src-height="736" align="center"/>

这种效果的场景是非常广的

如果怕屏幕本身没有200px（举个例子），可以打补丁，像这样在minmax里插入min函数：

```css
repeat(auto-fill, minmax(min(10rem, 100%), 1fr))
```

##### <b>统一举例</b>

目前，grid的基础已经完成了，我们来结合例子看看怎么使用吧：

###### <b>生成一个tags集合</b>

<img src="/assets/X6f0bj1Eao8lSlxFxrnco6DinYf.png" src-width="1151" src-height="440" align="center"/>

flex那边也实现过这个场景，这会就能看到grid 也一样行了，而且还简单些，直接使用上面的trick；

```css
.mid-container{
     height:200px;
     background-color: beige;
     display:grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     gap:10px 30px;
 }
 .tag{
     size:160px 80px;
     padding:20px;
     /* margin:20px; <em>/
</em><em>     /</em> flex:0 1 none; */
     border-radius:10px;
     background-color: burlywood;
     text-align: center;
     line-height:20px;
 }
```

###### <b>生成导航栏</b>

还是对比flex，我们来实现导航栏；

<img src="/assets/Q5yhbHtHGo5C59xa6TwcFUvnnKe.png" src-width="1235" src-height="66" align="center"/>

```css
.navbr{
     height:80px;
     display:grid;
     background-color: rgb(153, 196, 35);
     grid-template-column: 1fr repeat(5,min-content)
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
```

```html
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

###### <b>生成并列文本介绍区</b>

和tag的基本原理相同，但是我们可以发挥一下grid的特色，让子元素叠起来，配上动画可以获得很舒服的效果。

```css
.container{
     margin:300px 400px;
     display:grid;
     grid:repeat(3,120px) / repeat(3,80px);
     place-items:stretch;
     gap:5px;
     height:400px;
     width:600px;
     background-color: blueviolet;
 }
 .item1{
     grid-area:1/1/3/3;
     z-index:1;
 }
 
 .item2{
     grid-area:2/2/4/4;
     z-index:2;
 }
 
 .item3{
     grid-area:1/2/3/4;
     z-index:0;
 }
 
 .child{
     background-color: aqua;
     border:3px solid red;
 }
 .child:hover{
     transition-duration: 0.3s;
     transform:  scale(1.2);
 }
 /<em>重叠部分用z-index决定上下</em>/
```

<img src="/assets/QPtnbhTjyosqclxjdlCc8Jl0n1j.png" src-width="1392" src-height="954" align="center"/>

#### <b>Grid advance以及案例</b>

##### <b>Grid布全局</b>

我们记得flex布全局的基本条件是有明显的轴线，但是grid的条件就简单多了，不如说什么样的局都可以上grid试试。

grid布局的基本思想是拆分，以下面的为例，第一张是flex的布局设计，第二张是grid的布局设计。

<img src="/assets/SUWXbubZXoEcCdxHgR9cEXUanxY.png" src-width="1237" src-height="731" align="center"/>

<img src="/assets/GxxsbH3GCo7PVxxem0Lc7WqRn8f.png" src-width="1237" src-height="742" align="center"/>

这个有两个列，当时就说了用grid更加合适，当然用flex也是可以做的👇(当然不是强迫使用者所有圈框框的时候都必须使用grid，各种布局方法灵活切换才是关键)

<img src="/assets/XYllbPbfmorN8NxilM4cOfA4npg.png" src-width="1243" src-height="655" align="center"/>

这个就不太适合，原因是太空了，相比二维描述，不如一维描述快，flex更加适合这个布局（或者可以先用grid把轮廓分出来，然后对主体用flex，下方一堆图的地方用grid是极好的）👇

<img src="/assets/RIMfb3qOkov0WbxFMw9cjyIKnz0.png" src-width="1230" src-height="652" align="center"/>

所以说flex grid要长短互补，那个场景适合用哪个。

##### <b>CSS grid animation</b>

动画有个重要的问题是哪些属性可以拿来修改，在grid中大概有这些：

- `rid-gap`, `grid-row-gap`, `grid-column-gap` as length, percentage, or calc.
- `grid-template-columns`, `grid-template-rows` as a simple list of length, percentage, or calc, provided the only differences are the values of the length, percentage, or calc components in the list.

##### <b>手搓一个日历</b>

加强一下grid的使用能力，手作一个日历吧；

<img src="/assets/FldfbA0R8oiQIaxbuWUclxeunGr.png" src-width="594" src-height="439" align="center"/>

像这样：

```css
.calendar-wrapper {
   max-width: 280px;
   font: 100% system-ui;
 }
 .calendar {
   display: grid;
   grid-template-columns: repeat(7, 1fr);
 }
 
 .first-day {
   grid-column-start: 3;
 }
 
 
 .day-name {
   background: #eee;
 }
 
 h1 {
   text-align: center;
 }
 ol {
   list-style: none;
   margin: 0;
   padding: 0;
   text-align: center;
 }
 li {
   padding: 2px;
 }
```

##### <b>活用auto和fr</b>

auto和fr单独存在的时候功能相似，但是一旦有了fr，auto块会被挤得没有额外空白空间，也就是说auto块的大小就是其中内容的大小，我们可以利用这个效果做很多东西，这里举个例子实现一个页脚。

预期效果是页脚一直在页面最下，即使页面没有被内容填满，同时当页面内容多于无滚动时的装填能力的时候这个页脚也会自动下移。

这种效果用grid非常容易实现。事实上只要这样(额，至少核心是这样)

```css
body {
   min-height: 100%;
   display: grid;
   grid-template-rows: 1fr auto;
 }
 .footer {
   grid-row-start: 2;
   grid-row-end: 3;
 }
```

就可以得到这种效果了

<img src="/assets/DuE7bFAPWoIlqzx7zTxcbjNLnvQ.png" src-width="810" src-height="794" align="center"/>

##### <b>让trick中的area支起来</b>

回忆一下我们的trick，其中没有声明那些网格的高度，现在介绍一个补丁，或者solution，来让你能够控制这些高度。

答案是使用伪元素。

假如一开始自动生成的格点是这样的

<img src="/assets/FUC6buL2govCvjxej49ca7w6neh.png" src-width="1630" src-height="502" align="center"/>

我们可以使用伪元素来撑大这些格子，而不产生额外的影响（伪元素的好处）

```css
.grid > div {
   background: black;
   padding: 1rem;
 }
 
 .grid > div::before {
   content: "";
   padding-bottom: 100%;
   display: block;
 }
```

<img src="/assets/DrlIbRpGco4BZox1Nw7cNNBEn2c.png" src-width="1658" src-height="1112" align="center"/>

padding-bottom:100% 意味着高至少是和宽一样的，可以换成具体的高度之类的，这部分其实就是控制伪元素的大小了，和正常元素没有任何区别。

效果：

#### <b>总结和task</b>

总结来看，grid能够给前端布局带来非常大的遍历，flex擅长一维布局，grid适合二维布局。在页面元素比较稠密的时候可以作为全局布局的选择。另外一方面，grid在布局的控制上的表现非常出色，可轻可重。熟练的使用trick是grid的特长。

##### <b>task</b>

- 结合grid和其他你擅长的css整点有趣的东西
- 尝试找一个可以用grid布局实现的网页，实现它。
- 欢迎补充你知道的all-time-great css tricks

#### <b>参考资料和草稿</b>

[https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)

[https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/](https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/)

[https://css-tricks.com/books/greatest-css-tricks/flexible-grids/](https://css-tricks.com/books/greatest-css-tricks/flexible-grids/)

