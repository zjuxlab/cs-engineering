---
title: CSS selector
slug: CSS selector
sidebar_position: 0
---


# CSS selector

Author:徐旻昶

# CSS selector（选择器）简介

Css selector一般被叫做css选择器，它是一段CSS语言中处于最前面的那一部分，功能是规定了你编写的一些CSS规则会被应用到哪一些html元素上，而选择器所选择的元素被称为“选择器的对象”。

举一个应该是最为大家所熟知的例子：

```html
<div class="example"></div>  <!--一个div块，其class属性名被定义为example!-->
```

```css
.example {
    /*为class名为example的html元素制定CSS规则，并写在这里*/
}
```

上述代码为class属性为example的所有html元素制定了CSS规则，这些规则将应用到每一个`class="example"`的html元素。

CSS代码段中的`.example`就被叫做<b>CSS选择器</b>。选择器选择哪些html元素应用CSS规则的方法有很多，也产生了众多不同种类的选择器，我们慢慢来看。

# 选择器的分类

## Universal selector

Universal selector被称为通用选择器或通配符选择器。顾名思义，该选择器下的CSS规则会对所有的html元素生效。

```css
* {
     /* 这里的CSS规则对所有html元素生效 */
 }
```

通用选择器可以结合各种组合器来达到一些效果，在此处暂时不予列出，作为组合器的样例在下面慢慢介绍。

## ID selector

ID selector被称为ID选择器，它为ID为某个特定值的对象设置CSS样式，用#表示

```html
<div id="NAME"></div>  <!--一个div块，其id为NAME!-->
```

```css
#NAME {
     /* 这里的CSS规则对id="NAME"的元素生效*/ 
 }
```

注意ID这个属性必须是唯一的。

## Class selector

ID selector被称为类选择器，它为属于某个class的所有对象设置CSS样式，用.表示

```html
<div class="example"></div>  <!--一个div块，其类为example!-->
```

```css
.example {
     /* 这里的CSS规则对class中包含"example"的元素生效*/ 
 }
```

类选择器相比较上面两位有比较多的东西可以谈了

1. class选择器是选择包含该属性的元素应用CSS样式，包含的意义我们看下面这个例子：

```html
<div class="never gonna give you up"></div>  
<!--它将应用never、gonna、give、you、up五个类中的CSS规则!-->
```

也就是说，一个元素可能同时应用到多个class的CSS样式，不同的class之间用空格隔开

1. 既然有了1这种用法，我们当然也可以仅对“同时包含某些类名”的元素作出限定

```css
.never.gonna.give {
     /* 这里的CSS规则仅对class中同时包含never、gonna和give的所有元素生效*/ 
 }
```

注意点和字母的中间莫得空格。

1. 有了并集就一定会有交集。有地方将这两天归纳于组合器中，属于后文[other combinator](https://xn4zlkzg4p.feishu.cn/wiki/wikcn7KLkQ4bF1twmLr48rLBAdh#ZauYdkCw8o2U42xaMV1cbDX9nnd)中提到的部分。

```css
.never,.gonna {
     /* 这里的CSS规则对class中包含never或gonna的元素生效*/ 
 }
```

用逗号隔开

1. `.example`的详细写法应为`*.example`，意为对类为example的所有html元素应用一套CSS样式。略去通配标识符没有任何关系。
2. 相信由1的启发，你已经发现了类选择器前面这个神奇的<b>.</b>前面是可以加东西的。我们还可以对类进行更深层的分类，将类选择器和元素选择器共用：

```css
p.snow.fall {
     /* 这里的CSS规则对class中同时包含snow和fall的所有p元素生效*/ 
 }
```

换句话说，要同时满足&lt;p&gt; & class包含snow & class包含fall，才会生效

1. 需要说明的是CSS中<b>命名空间</b>的概念。通常来说，命名空间是<b>唯一识别的一套名字</b>，这样当对象来自不同的地方但是名字相同的时候就不会含糊不清了。（根据我的认识），在CSS中，这个概念用于类的使用，当提到命名空间时，应该是对类的名字作出谈论。
2. Class selector和id selector很像，区别在于id是唯一的，用于唯一地控制某个元素的样式；而class的用意在于对某一批需要共同运用某种样式的元素提供归类。

## Type selector

Type selector被称为元素选择器，它为属于某个type的所有对象设置CSS样式

```css
p {
     /* 这里的CSS规则所有p元素生效*/
```

这个选择器能讲的不多，但是用的多，我们可以在组合器的例子里频繁见到它

## Attribute selector

Attribute selector被称为属性选择器，它为符合属性内容要求的的对象设置CSS样式。属性选择器的语法较多，我们首先看一个最常见的例子。

```html
<p lang="en">Hello!</p>
<p lang="en-us">Hi!</p>
<!--这两条都将应用下面的CSS规则!-->
```

```css
*[lang] {
     /* 这里的CSS规则对拥有lang属性的所有元素生效*/ 
 }
```

1. 属性选择器用[]表示，[]中填写需要的属性或者属性表达式。属性表达式有以下内容：
    - `[attribute]`选择拥有属性attribute的元素
    - `[attribute=value]`选择拥有`attribute="value"`的元素
    - `[attribute~=value]`选择拥有`attribute="string"`，且string含有单词“value”的元素。<b>注意</b>：该值必须是整个单词，比如 lang="en"，或者后面跟着连字符，比如 lang="en-us"
    - `[attribute*=value]`选择拥有`attribute="string"`，且string含有子串“value”的元素。不要求是整个单词，只要能摘出这个子串就行，这是它与`~=`的区别！
    - `[attribute|=value]`选择拥有`attribute="string"`，且string以单词“value”开头的元素。<b>注意</b>：该值必须是整个单词，比如 lang="en"，或者后面跟着连字符，比如 lang="en-us"
    - `[attribute^=value]`选择拥有`attribute="string"`，且string以子串“value”开头的元素。不要求是整个单词，只要能摘出这个子串就行，这是它与`|=`的区别！
    - `[attribute$=value]`选择拥有`attribute="string"`，且string以子串“value”结尾的元素。同样只要能摘出子串就好。

2. 相信你同样也注意到了，属性选择器的前面可以加上元素选择器。

```css
p[lang] {
     /* 这里的CSS规则对拥有lang属性的所有p元素生效*/ 
 }
```

当你忽略元素选择器什么都不写时，默认为*通配选择器应用到所有元素类型

1. 可以同时对多个属性做出要求

```css
p[href][title] {
     /* 这里的CSS规则只对同时拥有href属性和title属性的所有p元素生效*/ 
 }
```

只需要将属性并排摆开就好

1. 需要特别提出的是，我们在类选择器中说到了class的属性匹配要求只要求包含，但当你在属性选择器中选择class的值时，class与其他的属性是一样的，

```html
<p class="never gonna">give you up</p>
```

```css
p[class="never"] {
     /* 这里的CSS规则并不能对上面的html元素生效*/ 
 }
 p[class="never gonna"]{
      /* 这样才行*/ 
 }
```

# 伪类 / 伪元素

## Pseudo-class

Pseudo-class，更一般地被称为CSS伪类，是用于添加到选择器的关键字，用于指定所选元素的特殊状态。摘录一下[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)的定义解释：

---

伪类由冒号（`:`）后跟着伪类名称组成（例如，`:hover`）。函数式伪类还包含一对括号来定义参数（例如，`:dir()`）。附上了伪类的元素被定义为<em>锚元素</em>（例如，`button:hover` 中的 `button`）。

---

```css
p:hover {    /* selector后跟伪类pseudo-class*/
    color: blue;
}
```

单冒号前的selector可以是我们上面讲过的或者下面要讲的任何选择器形式

伪类的数量较多，且表意比较明确。对所有的伪类列举介绍可见[W3school介绍](https://www.w3school.com.cn/css/css_pseudo_classes.asp)。

## Pseudo-element

Pseudo-element，CSS伪元素，也是用于添加到选择器末尾的关键字，不同之处在于它用于修改所选元素的部分内容的状态。

需要提前说明的是，伪元素使用`::`双冒号来衔接在选择器之后，对比伪类的`:`单冒号有区别。但这一区别仅在CSS3生效。CSS1 & CSS2都还是单冒号。

# 组合器（Combinator）的分类

组合器实际上是对选择器与选择器之间的关系进行解释的一种符号（或机制），一般来说常用的有四个，这里先作为表格列出，以便大家对组合器先有一个直观的印象。

<table>
<colgroup>
<col width="326"/>
<col width="195"/>
<col width="215"/>
</colgroup>
<tbody>
<tr><td><p>组合器名</p></td><td><p>表现形式</p></td><td><p>用途（较为官方的说法）</p></td></tr>
<tr><td><p>后代选择器（Descendant combinator）</p></td><td><p>element1 element2</p></td><td><p>选择type1元素内的所有type2元素应用CSS规则</p></td></tr>
<tr><td><p>子选择器（Child combinator）</p></td><td><p>element1&gt;element2</p></td><td><p>选择type1作为父元素的所有type2子元素应用CSS规则</p></td></tr>
<tr><td><p>通用兄弟选择器（General sibling combinator）</p></td><td><p>element1~element2</p></td><td><p>选择前面有type1元素的所有type2元素应用CSS规则</p></td></tr>
<tr><td><p>相邻兄弟选择器（Adjacent sibling combinator）</p></td><td><p>element1+element2</p></td><td><p>选择所有紧随在type1元素后面的type2元素应用CSS规则</p></td></tr>
</tbody>
</table>

这里的element可以是之前所有的选择器

光看这个规则不免云里雾里，我们对每一条作示例与详细解释

示例会用到这个内容，为了<del>表现力更强一点</del>（没活了），使用了大气脱俗清新的大号文字+五颜六色的缤纷框框来做演示：最外层的div使用蓝色框起，第二层用黄色，第三层（最内层）用红色。每层中间都插入了一段<b>p段落和h1主标题</b>。我们将用组合器去方便地改变想改变的内容的字体颜色。代码在图片下方贴出

![](/assets/G2qpb71rComu80xLi1fcfU8MnSe.png)

```html
<template>
  <div class="web"> <!--第一层，最外层，蓝色边框!-->
    <p>在外层框架之外的p</p>
    <h1>在外层框架之外的h1</h1>
    <div class="out_frame"><!--第二层，黄色边框!-->
     <p>在内层框架之外、外层框架之内的p</p>
      <h1>在内层框架之外、外层框架之内的h1</h1>
      <div class="inside_frame"><!--第三层，最内层，红色边框!-->
        <p>在内层框架之内的p</p>
        <h1>在内层框架之内的h1</h1>
      </div>
    </div>
  </div>
</template>
```

```css
p,
h1 {
  text-align: center;
}
.web{    /* 第一层，最外层，蓝色边框 */
  height: 500px;
  width: 50%;
  border: solid blue;
}
.out_frame {    /* 第二层，黄色边框 */
  margin-left: 15%;
  height: 300px;
  width: 70%;
  border: solid yellow;
}
.inside_frame {    /* 第三层，最内层，红色边框 */
  margin-left: 15%;
  height: 100px;
  width: 70%;
  border: solid red;
}
```

## Descendant combinator

后代组合器，表现为空格` `，在两个element中间使用空格隔开表示将两个选择器用后代组合器组合起来，用处是将<b>element1的后代</b>中所有<b>符合element2要求</b>的html元素筛选出来，应用CSS规则。

<b>后代</b>是什么意思呢？在HTML元素当中后代形象地表现为被该元素的起始标志和结束标志囊括起来的所有html元素：

```html
<div id="I">  <!--我们以这个div为基准点开始看，这是起始标志，为了形象点给它命名I!-->
    <div>    <!--这是I的第一个子代，因为它在I的起始标志之后，结束标志之前！-->
        <p>?</p>   <!--这是第一个子代div的第一个子代，对于I而言这就是孙辈了！-->
                    <!--子代的子代，不论多少层都属于I的后代!-->
        <p>!</p>
    </div>    <!--这是I的第二个子代，同样因为它在I的起始标志之后，结束标志之前！-->
    <!--.....!-->
</div>
```

因此后代组合器就是以element1框里的所有元素为对象，用element2选择器挑出其中符合要求的，例如：

```css
.out_frame p {
    color:green;   /*将out_frame这个div内所有的p元素字体变绿 */
}
```

效果如下，可以看到out_frame也就是黄色框下所有的子代元素中的p元素，字体都变成了绿色；而黄色框外的p元素并没有受到影响，这样就起到了很好的范围性选择作用

![](/assets/CH0ZbtADXoNZsQxz2SBcwBVrnhg.png)

后代选择器是可以嵌套使用的，供我们方便的选择应用范围，如下例：

```css
.out_frame div p {
  color: green;   /*将out_frame这个div内所有的div内的p元素字体变绿 */
}
```

![](/assets/Sonzbe4AgoFLxGxkgfkctYhnnwf.png)

此时，out_frame中的p或者除了div以外的其他子代的后代p就不会受到这个规则的影响了。

## Child combinator

子代组合器，表现为`>`，在两个element中间使用&gt;连接表示将两个选择器用子代组合器组合起来，用处是将<b>element1的子代</b>中所有<b>符合element2要求</b>的html元素筛选出来，应用CSS规则。

子代组合器和后代组合器非常相像，可以看作是后代组合器的子集，因为<b>子代</b>就是表示第一层后代，这一点在上面介绍后代的例子时也提到了。例如：

```css
.out_frame>p {
  color: green;   /*将out_frame内所有的p子元素字体变绿 */
}
```

![](/assets/AvADbAeRKoXH2yxDtXAct8BAnmf.png)

可以看到，只有子元素的p变成了绿色，而孙辈的p元素（红框内的p）就没有变色

同样地，它也可以嵌套使用，这里不再赘述

## General sibling combinator

通用兄弟组合器，表现为`~`，在两个element中间使用~连接，用处是将<b>element1的兄弟</b>中所有<b>符合element2要求</b>的html元素筛选出来，应用CSS规则。

理解了后代和子代的含义，兄弟（同辈）的含义相信也很好懂。不过CSS中有一个雷点：<b>element1的兄弟必然是在其之后的</b>。也就是说，CSS中<b>不存在互为兄弟这种说法</b>。详细地可以见下例：

```html
<div>  <!--I的父辈!-->
    <div></div>
    <p></p>    <!--不熟。上面的div和p不是I的兄弟！！-->
    <div id="I">    <!--我们以这个div为基准点看，它是I！-->
        <p>?</p>   <!--I的子代！-->
        <p>!</p>
    </div>
    <p>  </p> <!--I的兄弟，因为和I同为同一父辈的子代！-->
    <div></div> <!--I的兄弟！-->
</div>
```

因此后代组合器就是以和element1同辈的所有元素为对象，用element2选择器挑出其中符合要求的，例如

```css
p~.out_frame {
  color: green;   /*将所有的p元素的兄弟中class为out_frame的字体变绿 */
}
```

![](/assets/Ul0obSgK4oaK1fxu7O7cqbcPnmh.png)

可以看到out_frame框内的文字都变绿了，因为它是“在外层框架之外的p”的兄弟，受到了上述编写的CSS规则的影响。

但是反过来就不行，“在外层框架之外的p”就不是out_frame这个div的兄弟：

```css
.out_frame~p {
  color: green;   /*将class为out_frame的元素的兄弟中的所有p元素的字体变绿 */
}
```

![](/assets/ZwWgbEm4IoeZq4xfShFcqMxZnie.png)

可以看到没发生任何变化，因为看前面的代码，在class为out_frame的这个div<b>下面</b>并没有任何的p元素，也就是没有p元素是它的兄弟。

## Adjacent sibling combinator

相邻兄弟组合器，表现为`+`，在两个element中间使用+连接，用处是将<b>element1的下一位兄弟</b>挑出，如果这个兄弟<b>符合element2要求</b>，将它应用CSS规则。

它也可以看作通用兄弟组合器的一种子集，只是限定在了必须是紧挨着该元素的下一个元素。看例子之前，为了有所区别需要稍微修改一下html代码

```html
<div class="web">
    <p>在外层框架之外的p</p>
    <div class="out_frame">
      <p>在内层框架之外、外层框架之内的p</p>
      <h1>在内层框架之外、外层框架之内的h1</h1>
      <div class="inside_frame">
        <p>在内层框架之内的p</p>
        <h1>在内层框架之内的h1</h1>
      </div>
    </div>
    <h1>在外层框架之外的h1</h1>   <!--把它挪下来!-->
  </div>
```

然后增加我们的相邻兄弟组合器CSS代码，看效果：

```css
p+h1 {
  color: green;   /*看所有的p元素。如果紧挨着它的那个元素是h1，就应用这个规则 */
}
```

![](/assets/QT1cbATkKoUkAGxBMpIcMnpBntd.png)

可以看到里面两层都是p的下面紧挨着h1的，而最外层的p和h1中间隔着一个div，也就是最外层p的相邻兄弟为div，div的相邻兄弟才是h1，故最外层没有对h1应用规则。

## Other combinator

除了四种主要的组合器，还有一些组合器（或者是有些地方将它们也称作组合器的方法），我们都做个了解

### Cloumn combinator

列组合器，这个组合器的功能还在实验中，许多浏览器不兼容，因此仅作了解。它的符号是`||`，专门作用于表格中的列元素。有兴趣可以了解下[MDN的说明](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Column_combinator)。

### Union combinator

并集选择器，其实前面谈Class Selector的时候提到过了，就是用逗号隔开表示：只要满足列出的选择器之中的任意一个，就应用该规则。

```css
h1,
p,
.section,#ddd{
    color:green;
}

/* 上述代码等价于 */
h1{color:green;}
p{color:green;}
.section{color:green;}
#ddd{color:green;}
```

有一个坏处是：如果这一串union中有任何一处出现了语法错误，那这一整串的所有元素都不能正确地进行选择

### Intersection combinator

交集选择器，Class Selector也提到过了，直接将选择器无任何空余地接在一起：必须满足列出的选择器全部同时在class那个字符串中，才应用该规则。因此这一组合规则只对class selector生效，除了最前面可以接一个任何选择器。例子可见[此处](https://xn4zlkzg4p.feishu.cn/wiki/wikcn7KLkQ4bF1twmLr48rLBAdh#D6sCdCo4MoQ6EQxWoQrcO4sknYb)。

# 选择器的优先级

选择器样式繁多，难免会有不注意的时候出现一个元素应用了多个选择器内编写的CSS规则，而且CSS规则中有相同的属性操作。既然如此，选择器就一定会存在优先级

先来介绍最为重量级的大哥：`!important`

`!important`不是一个选择器，而是作用于属性上的规则。当一条属性后面被加上`!important`后，它将无视所有其他的选择器优先级成为被选用的那一个。

我们假设有一个class名为never的div类被用上了这两条规则：

```css
.never {
  background-color: green;  /*理论上这条会被选用*/
}
 
div {
  background-color: yellow !important;/*因为！important的影响，最终这条起作用*/
}
```

原先由于class类的名字针对性更强，背景颜色应该是green；但实际上由于`!important`的原因，背景颜色应该是yellow

<b>但是!important这种破坏了优先级的用法其实不便于调试，尽量少用（</b>

需要指明的一点是，如果两个冲突的属性都被使用了`!important`规则，那他们之间的比较仍然遵循优先级规则处理。换句话说，如果所有的属性后面都加了`!important`，那就和没加一样了

接下来正式说明一下选择器的优先级（除去`!important`）：

<table>
<colgroup>
<col width="338"/>
<col width="349"/>
</colgroup>
<tbody>
<tr><td><p>优先级</p></td><td><p>选择器</p></td></tr>
<tr><td><p>1</p></td><td><p>style属性</p></td></tr>
<tr><td><p>2</p></td><td><p>Id selector</p></td></tr>
<tr><td><p>3</p></td><td><p>Class selector</p></td></tr>
<tr><td><p>4</p></td><td><p>Type selector</p></td></tr>
<tr><td><p>5</p></td><td><p>Universal selector</p></td></tr>
<tr><td><p>6</p></td><td><p>Other</p></td></tr>
</tbody>
</table>

对选择器的优先级，可以简单记忆为更直接地指明了元素的身份的优先级最高，比如id是唯一指明一个元素的，故其最高；而通配符对所有元素生效，故其最低。

肯定会有同学问了，那怎么看组合器组合完了的优先级呢？

经过简单的测试，我得出的结论如下：对于一个`element1 combinator element2`的组合器，在组合器优先级相同的情况下，如果element1或element2有哪一个是相同的，那就看另一个element的优先级；否则需要进行<b>权重计算</b>。直观地用例子解释吧：

```html
<div class="web">
    <p class="text">文字文字文字</p>
  </div>
```

```css
.web {
  height: 50px;
  width: 10%;
  border: solid blue;
}
```

![](/assets/LGsmbH1uuoggeexAxACcb5DbnTc.png)

首先说明，子代选择器、后代选择器、通常兄弟选择器和相邻兄弟选择器是同等级的（在element相同的情况下）。在同级别的情况下，<b>越后面写的选择器优先级更高</b>

接下来我们加上一些选择器操作

---

1. 
```css
div > .text{  /* 子代选择器 */
  color: yellow;
}

div .text{  /* 后代选择器 */
  color: green;
}
```

![](/assets/Xr4Qbi9kqoTAcixsJcdcHJ9onIf.png)

同等级，选择下面的绿色

1. 
```css
.web > .text{
  color: yellow;
}

div .text{
  color: green;
}
```

![](/assets/BK2HbHM3Boutjfxqv3scam6pnDb.png)

element2相同的情况下，选择element1优先级高的黄色

1. 
```css
div > .text{
  color: yellow;
}

div p{
  color: green;
}
```

![](/assets/Hx3Bbjlb0o9Wa8xumHdclMpEnQd.png)

element1相同的情况下，选择element2优先级高的黄色

1. 
```css
div > .text{
  color: yellow;
}

.web p{
  color: green;
}
```

![](/assets/HQWKbthSyowvE6xVFINcmjKlnJc.png)

两个元素都不同，且权重计算得到的权重相同（都是class+type），用默认规则选择下面的绿色

1. 
```css
.web > .text{
  color: yellow;
}

div p{
  color: green;
}
```

![](/assets/VCS4bJRADonvAtxuRpicWP3nnw6.png)

两个元素都不同，权重计算上面的高（class &gt;&gt; type），故黄色

1. 后代和相邻兄弟比较

```html
<div class="web">
    <p class="text">文字文字文字</p>
    <h1 class="title">标题标题标题</h1>
  </div>
```

```css
p+h1{
  color: yellow;
}
div h1{
  color: green;
}
```

![](/assets/MjeEbEZgOo50DWxKpSMcEwmPnze.png)

```css
div h1{
  color: green;
}

p+h1{
  color: yellow;
}
```

![](/assets/L0U3bcRBqogbk5xGarLcU5nCnMd.png)

可以看到都是type的情况下，运用的是默认规则

---

关于权重计算，就是大概根据上面选择器的优先级赋予了每种选择器一些权重值：

`ID 远大于 class 远大于 type 远大于 universal`

大概知道这样就好，100个下一级也比不过一个上一级。

并且权重计算应该做的是加法，比如：

```css
div .text{
  color: green;
}
.text{
  color: yellow;
}
```

![](/assets/XuI7bve29oP5XvxqeF1cGiCFnDg.png)

type+class &gt; class，选用了绿色

# 选择器命名方法

## BEM命名法

BEM是一种前端命名方法论，是块（block）、元素（element）、修饰符（modifier）的简写

简单来说的规则有如下：

---

用中划线`-` 表示某个块或者某个子元素的多单词之间的连接记号

用双下划线`__`连接块和块的子元素

用双中划线`--`描述一个块或元素的不同状态

---

比如：

```css
.block{ /*一个div的class名*/;}
.block__element{ /*这个div的子元素，比如p的class名*/;}
.block--state{ /*这个div的不同状态，比如隐藏、点击等等*/;}
```

这样命名的好处是代码的可读性较强，清楚每一个选择器的含义是什么；坏处是在迭代多层之后会变得十分杂糅、冗余，可读性反而会变差

并非所有的选择器都要遵循这样的规则，在涉及块中有较多元素且关系复杂时可以使用这样的命名方法来捋顺条理

## 模块化命名空间

还有一种利用个人规定的命名空间区分不同作用的选择器的方法。详情可见

该作者认为BEM并不够好，提出了对不同的功能模块加上不同的前缀方法来优化选择器的命名

