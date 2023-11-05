# CSS pseudo elements
@fyx 2022 10 月

## outline

- 你可能如何遇到伪元素
- 伪元素的正式引入和历史介绍
- 伪元素的基础应用与工程实例
- 伪元素高级应用
- 伪元素和动画结合
- 总结和task
- drafts 和 raw material

## notion

本文包含

- 奇怪的中英交叉
- 可能存在的技术或者原理上的错误

本篇之前也许应该看看树上的CSS基础结点（

## 你可能会如何遇到伪元素

当你在设计一个网页的时候，可能会遇到例如公司现状介绍或者最近的新闻之类的大段的文字，这些文字堆在一起就让人很没有阅读的兴趣，为此，你决定将每段文字的首个字放大。假设文字是静态的那么一个`<span>`就能解决问题，但是假如文字像新闻一样是动态的，有没有办法识别一个文段的首字母呢？这是传统css 无法做到的（也许你能想出一些方法）。再另外，假如你有一定的开发经验，而且用过别人提供的组件库，那么大概遇到过某些组件的样式无法覆盖的情况，无论你如何将dom元素本体的边框去除，画面上始终还是有讨厌的边框。再再比如，如何让placeholder呈现你想要的样式，让选中的部分不再是默认的颜色，这些问题都和伪元素有关。

## 伪元素的正式引入和历史介绍

引用标准中的话：

(CSS 引入伪类和伪元素的概念是为了实现基于文档树之外的信息的格式化)

CSS introduces the concepts of pseudo-elements and pseudo-classes to permit formatting based on 

information that lies outside the document tree.

伪元素的推出非常早，很多有关伪元素基础的文章都是2011年左右上传的，你甚至可以在里面看到xhtml之类的东西（

目前大多数浏览器都很好地支持伪元素，在小程序开发之类的场景也可以放心用

## 伪元素的基础应用

对于任何想学习伪元素的人来说，好消息是伪元素内容非常少但是用处非常大，事实上原本不考虑伪元素巨大的作用，这篇文章会变成，伪元素+伪类的讲解。内容有多少呢，少到一张表就结束了：（如果你试过在IDE打出`:: `那么会看到更多酷炫伪元素，他们都有各自的用处，而且存在可能的支持问题，以后会在其他版块里提及，这里就先介绍这些常用而且强大的）

| 伪元素         | 例子(注意伪元素不只用于p，此为一例) | 效果             |
| -------------- | ----------------------------------- | ---------------- |
| ::first-letter | p::first-letter                     | 文段的首字       |
| ::first-line   | p::first-line                       | 文段的首行       |
| ::selection    | p::selection                        | 文段被选中的部分 |
| ::after        | p::after                            | 文段后           |
| ::before       | p::before                           | 文段前           |

而且，前三个伪元素非常的直观（当然用起来很顺手），这里放一个样例，一看就行（x

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NzAyNzUyZjhkNmRjMGIyN2YyNmQxYzJhZGM2ODMyNzZfdGlSZnpqMnp5OWEwd1dLeXBENVNHaTdLQmhVU1JaNzFfVG9rZW46Ym94Y25CRmFWdmRiZzZUQzVBeWoyc3M0VHRlXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

\#效果belike

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=YWVhYjZlOTA3ZmQ0NzMyNzgzZWFkMWU4MGZkZGNkMjFfUTZOT1BYQjcyWGhxR29YSHZqdTFGblF3S0oxSnhPaGtfVG9rZW46Ym94Y240eEtKSk9ZQkVpUUJKbUpaQWMxSUdiXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

那么事实上，伪元素最为人熟知的用途还是::before 和 ::after 两种，从伪元素出现至今已经有很多基于这两个的骚操作了，下面来一一康康。

## 工程实例

为了更好的理解伪元素是如何运作的，你需要记住两条规则（这之后伪元素基本☞的是before和after）

1.伪元素不属于dom树，也就是说这个元素并不实际存在

 2.伪元素和其附着的元素的关系非常接近子元素和父元素的关系

\#稍微解释一下，对子元素一点的最精确的描述是把该伪元素插入到父元素其他content之前，所以可以想见，伪元素会继承父元素的字体字号之类的，同时不会继承padding margin width height之类的属性,至于第一条，记住绝对绝对要给伪元素一个content不然它根本不存在，一般来说是不会忘的，但是假如说刚刚删掉了content里的一张图片，那就很有可能忘记添回去（x

同时为了更好的活用到设计中你还需要两种直觉

1.伪元素提供了前后的插槽

2.伪元素提供了前后的插槽（也许应该叫里外）

\#作为第二种直觉的一个直观展示

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTAxM2Y0NmZhZDJmMDNlNjQwZTQwZGVlYTkzZWQzNjhfNlh6cEF5VzZBUVFGd2pEZEhQTW1oeU1XcXpOV0lGeHhfVG9rZW46Ym94Y254Z0JSTGxQQllRUGJDRFFwZ2dTbnBoXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

 

当然还要求一些基本的css的感觉，不过假如你还没有完全形成自己的css解决方案，那么也不失为一个好消息，因为伪元素会为多个基础css困难情形提供解决方案，记住伪元素的实现会让你省下很多的精力和时间。

### CSS画图

当你拿到一个页面的设计，作为一个前端工作者，必须得想个办法把页面上的图案画出来，同时，画图这种事当然是用的元素越少越好。由上面提到的两种直觉，伪元素自动提供了用于拼接的元素和用于遮罩或者底衬的元素，图形简单的情况下直接不用添加新元素了，非常的爽（

\#css基础画图看这个网页，里面有详细的源码，自己能活用的话会很cool  

https://css-tricks.com/the-shapes-of-css/

### 清除float

同理，可以不用再重新声明一个**HTML****元素**来解决float这个**CSS****问题**，现在只需要在css内部利用after伪元素来清除float就行了，这是clearfix的优解。

举个例子

```CSS
 .group:before,
 .group:after {
   content: "";
   display: table;
 }
 .group:after {
   clear: both;
 }
 //效果很明显，父元素不会塌了
```

### 各种mark和tips的创建

伪元素这种**额外插入一个东西**的感觉非常适合处理添加各种mark和tip的场景。

例如在你的超文本链接后面贴上网址：

```CSS
 @media print {
   a[href]:after {
     content: " (" attr(href) ") ";
   }
 }
```

例如标记一下代码的语言

```CSS
 pre::after {
   content: attr(rel);
   //position: ...
 }
```

例如创建你的tooltips

```CSS
a[data-tooltip] {
     display: inline-block;/*bug fix*/
     position: relative;
     text-decoration: none;
 }
 a[data-tooltip]:after {
     content: attr(data-tooltip);
     position: absolute;
     bottom: 130%;
     left: 20%;
     background: #ffcb66;
     padding: 5px 15px;
     color: black;
     -webkit-border-radius: 10px;
     -moz-border-radius: 10px;
     -ms-border-radius: 10px;
     -o-border-radius: 10px;
     border-radius: 10px;
     white-space: nowrap;
     opacity: 0;
     -webkit-transition: all 0.5s ease;
     -moz-transition: all 0.5s ease;
     -ms-transition: all 0.5s ease;
     -o-transition: all 0.5s ease;
     transition: all 0.5s ease;
 }
 a[data-tooltip]:before {
     content: "";
     position: absolute;
     width: 0;
     height: 0;
     border-top: 20px solid #ffcb66;
     border-left: 20px solid transparent;
     border-right: 20px solid transparent;
     -webkit-transition: all 0.5s ease;
     -moz-transition: all 0.5s ease;
     -ms-transition: all 0.5s ease;
     -o-transition: all 0.5s ease;
     transition: all 0.5s ease;
     opacity: 0;
     left: 30%;
     bottom: 90%;
 }
 a[data-tooltip]:hover:after {
     bottom: 100%;
 }
 a[data-tooltip]:hover:before {
     bottom: 70%;
 }
 a[data-tooltip]:hover:after,
 a[data-tooltip]:hover:before {
     opacity: 1;
 }
```

\#效果（x

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDAxNmQ1N2RhYTM4YmU2M2VkNTIwMzBmYzc3M2ZiMzRfZHNHU3djc0hDU3FyVU0xQ2VwMDRyc2dQQU00TGRYU1JfVG9rZW46Ym94Y25XU0F4MUJObUo4VEszU1RiR2hBQlliXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

又例如,很随手的分割符，也可以不添加新元素做出来

```CSS
 .menu li:before {
   content: "// ";
   position: relative;
   left: -1px;
 }
```

又例如添加一点flourish

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmVhMDdkMWRmZGQ4OTY4YmQ0ZmUyNGM5NzZmYzQxZjVfZlZxNzVJY2Q3S3VMVTRSVk8wSXl6ZzhKb2d0YXFqQ2ZfVG9rZW46Ym94Y24wYUREV3VyZWRCSkRDcUVPcnZmNjJiXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

\#(注意标题两边的东西，花花的那种符号其实是某种字体下的英语，也许你还记得，伪元素是可以override父元素的字体的，当然直接贴图片也是可以的)

### 伪元素做填充

有的时候在一个元素的content和边界之间需要留空，例如让一个文本段落的背景延伸到屏幕边缘，假如直接处理，或者需要创建填充元素来撑开空间，或者要频繁且往复得调整padding，margin来获得还过得去的效果，那么伪元素再次成为了一个优解。通过限定content-width 再用伪元素调整空间，实现CSS问题CSS解决

\#例图，三个彩色bar都可以伪元素解决

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=MWI4NTY0ZDJlMmU4NzQ3NGU2N2NjYWM2Y2I2OGVmZGVfalpmbUN5NThSNjBnNkU1enc4OGQ5clhjdVp3SWxCRnBfVG9rZW46Ym94Y24yamZGVXhid3dTTm1QbTJHUTNMbjVjXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

### 总结

伪元素的初级应用主要思路就是利用其和父元素的紧密联系实现快捷的定位和CSS问题CSS解决的思想

## 伪元素高级应用

接下来正式介绍一点伪元素的骚操作，这类操作除去代码能力多多少少要求点设计能力（x

看这部分会有一种写作文收集好词好句的感觉，大家就获取灵感吧

### 画彩带

Everybody loves ribbons !

你只需要这些html：

```HTML
 <h1 class="ribbon">
    <strong class="ribbon-content">Everybody loves ribbons</strong>
 </h1>
```

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=YzNlODAwNTYwZjVlNzIwNWNmNzhkODI2OGQxODEzYjNfQ29UOUZoNDY3bGZlb2RlVU9abmU2R1gyWUdjSXhab1JfVG9rZW46Ym94Y25NRG5sSG1YNFEydFlNbXdZVWcwWFhlXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

就可以获得一条丝带啦（想像一个很空的纯色网页，来上这样一条丝带岂不美哉），这题的css是一个task哦，可以先思考一下怎么画出这么一个丝带（具体配色下面的task会给出的，你先别急.jpg）

### 全屏遮罩

绝对定位的伪元素会向上搜索第一个relative position的父元素并且相对定位，那么我们可以通过小心地擦除这一条枝上的relative定位直到伪元素相对于 root 定位，这样就能创建一个全屏的伪元素了。然后把这个罩子塞到直接父元素的下面，然后在hover的时候显示出来，再配上个颜色渐深的动画就能做出一个很cool的全屏遮罩，为直接父元素提供焦点，改个显眼点的配还可以展现某个按钮的重要性、危险性。最重要的是这种方法并没有新建一个全局元素，而且遮罩出现时不会盖住父元素。还有个附加好处，直接照搬css就可以在另一个元素上取得相同效果。

\#想要更cool吗，把还有一个伪元素设为relative然后用它给父元素加一个酷炫外框，同样在hover的时候展示试试

### 伪元素计数器

\#emphasis：这块比较重要，需要大家都掌握

列表的序号一直是设计的痛，不使用伪元素的情况下你或者接受列表的自动计数（样式），又或者删了自动编号，手动添加所有标号然后反复调整样式，是时候学习一下伪元素解决方案了

https://www.456bereastreet.com/archive/201105/styling_ordered_list_numbers/

### 伪元素模拟置中float

是不是早就想要一个居中的float了，这就用伪元素来模拟一个，可惜的是，这个float不是通过修改你要居中的元素的样式实现的，本质是在文本中间挖一个洞。

我们假如说你想要插入一张400*500 的图片到一个双column的文本中间，那就用伪元素在左右两段文本上面挖两个洞，伪元素高度就是图片高度（500），宽度**大概**是图片的一半（考虑到文本中间会有个缝）然后记得float和父元素相反，就会得到这么个效果

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NjA0ZmRjNDJkMDdhMmM2ODVlNjU2MjczMWVkNDAxYTJfUVRCSExhSUpFUXhoNmk3R0hJQzhwVXFYTTVvV1AzYktfVG9rZW46Ym94Y25WN0tPNEFwRGtDR29nRHhWRWZuOHhkXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

\#中间就是你挖的洞

然后塞个图进去

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=YzE0ZWExNmM3Y2E4OGIzZjRiNDcyOTJkZjA3NmMyN2VfdGxOWkNjM1BvUHY2NGZUR1I4UWxYSnZSNzZyeDhXb2tfVG9rZW46Ym94Y25JdGdVZlRkZDN2VFMzNWlJSGNlSmRoXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

\#挖洞才是关键，把文字挤开，图片定位小问题

### 多重边框和多背景

css3 已经支持了multiple-background ，怎么在css2 中实现类似的效果呢，答案又是利用伪元素。你可能觉得box-shadow 可以达到类似的效果，但是伪元素的实现有其优越之处。

虽然但是，此处再讲有些重复了，经过前面的例子读者应该已经对伪元素应用有了些感觉，大概可以先文章一步想到这个模块的实现，因此这里就放一个 Nicolas Gallagher 的文章供参考，task中会有一个制作多边框和多背景的任务。

https://nicolasgallagher.com/multiple-backgrounds-and-borders-with-css2/

## 伪元素和动画结合

由于伪元素提供了两个可用元素或者说两个遮罩层，我们可以在保持html干净的情况下添加丰富的动画，这在增加网页的高级感（x，和互动质量的时候效果拔群。这里列举几个都属于提供灵感，大家举一反三发挥想象力就好。

### 闪闪发光的按钮

这个讲真帅爆，思路是将一个子元素设为 透明-> 某种亮色->透明的梯度渐变，然后把它移到父元素外面然后overflow:hidden，然后给`：hover`加动画。思路很简单吧，但是没有伪元素的话，光布局和新增无关元素就很劝退了，伪元素没有这种顾虑，更是直接实现了单元素可重用，（改下class整个页面所有按钮都闪闪发光）非常的爽（

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=MWNmZDM1NDI1MmI5ZDdlYWNkZGMyMTNkNWZhMDdmYzdfS2tEbnR5bGx0dVRobjI5MHQyZkJ0bkN1WEc2OU05RGFfVG9rZW46Ym94Y24wREVsRlJXWjZ6NFNJbmlCbFlWMWdiXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

\#换成金色有奇效

### 充值玩家头像框（

其实就是动态炫彩边框，通过一个小于父元素的伪元素在台前展示头像，父元素变大然后在后台移动实现。实际使用的时候也可以改配一个柔和清新的颜色然后动画调慢，也是很有感觉

### 可移动，可发光的装饰

还记得那个给标题加左右装饰的trick吗，给hover加上动画，让装饰往中间收拢或者高亮，高级感蹭蹭就上来了。还可以有很多有趣的应用，发挥想象力吧。

### 奇妙的三

伪元素最舒服的使用场景就是三个有关联的元素，一个当作父元素两个当作伪元素，就可以用简单的html表达丰富的内容，三个一组的动态组件可以考虑用一个带伪元素的元素来实现，这样关联紧密而且外部看非常干净。

## 总结和task

### 简短的总结

- css伪元素（全）实现基于文档树之外的信息的格式化
- 伪元素（两种，以下同）有助于semantic 前端编写，有封装class，简化html的效果
- 灵活利用伪元素的两种用法，配合动画提升网页的高级感和互动感

### Task

不写task效果打折哦

#### 任务一
画上面展示到的那个丝带，这里给出一组配色：（#f5ae20）（#db5f0c）（#f3ce28），也可自配

\#hint：父元素有两意味着可以创建四个伪元素，再想想三角形怎么画，怎么调整遮罩顺序

#### 任务二
制作一个双重炫彩头像框，要求有两个可以动的酷炫边框

#### 任务三（组合任务）
实现这个网页效果，完成后再添加一些动画让网页更生动吧 （记得使用伪元素）

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NGE0YjZiZGZlNmZlMjMwNTgwNGE5NzJhYmMxOGZmNjZfZXI2T1JCUW1WS1ZEVVJ6ZmZKUGNYRmNiWWR3U3R3ZGVfVG9rZW46Ym94Y25Lc3hiQzZJWmdSeVR1Z2ZwdE9DWk9jXzE2OTgzMzAwMDg6MTY5ODMzMzYwOF9WNA)

自己的demo集合：

```CSS
//闪闪按钮
   .shining-button{
    position:relative;
    width:300px;
    height:60px;
    border-radius: 30px;
    background-color: #4d6cea;
    box-shadow:0px -2px 1px #3b9ce1;
    text-align: center;
    line-height:60px;
    font-size:30px;
    color:#FFF;
    z-index:1;
    border-bottom:2px solid rgba(255,255,255,0.6);
    overflow: hidden;
   }
   .shining-button::before{
    content:"";
    width:400px;
    height:80px;
    position:absolute;
    right:400px;
    top:0px;
    z-index:2;
    transition-duration: 0.7s;
    transition-delay: 0.1s;
    transition-timing-function: ease-in-out;
    background:linear-gradient(30deg, rgba(255,255,255,0),rgba(255,255,255,0), rgb(255, 255, 255),rgba(255,255,255,0),rgba(255,255,255,0));
   }
   .shining-button:hover::before{
    transform: translateX(800px);
   }
//充钱头像框
   .nb{
    position:absolute;
    left:100px;
    width:500px;
    height:500px;
    border-radius: 200px;
    z-index:1;
    background:url(./b.jpg);
    text-align: center;
    line-height: 400px;
    transition-duration:2s;
    transition-timing-function: ease;
    transition-delay:0.1s;
   }
   .nb::after{
    position:absolute;
    content:"";
    width:490px;
    height:490px;
    border-radius: 250px;
    top:5px;
    left:5px;
    z-index: -1;;
    background: url(./a.jpg);
    transition-duration:2s;
    transition-timing-function: ease;
    transition-delay:0.1s;
   }
   .nb:hover{
    transform:rotate(1145deg);
   }
   .nb:hover::after{
    transform:rotate(-1145deg);
   }
 //高级带装饰的标题
 .tt{
    position:relative;
    /* top:500px; */
    /* margin-top:400px; */
    margin-left:200px;
    /* line-height: 20px; */
    font-size: 30px;
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color:rgb(203, 223, 241)
   }
   .tt::before{
      position:absolute;
      content:"";
      top:13px;
      left:-65px;
      transition-duration:0.3s;
      transition-timing-function: ease;
      transition-delay:0s;
      width:30px;
      height:20px;
      background: url(./i.jpg) center;
      background-size:30px,20px;
   }
   .tt::after{
    position:absolute;
    content:"";
    top:13px;
    left:185px;
    width:30px;
    height:20px;
    transition-duration:0.3s;
    transition-timing-function: ease;
    transition-delay:0s;
    background: url(./i.jpg) center;
    background-size:30px,20px;
    transform: rotate(180deg);
 }
 .tt:hover::after{
    transform:translateX(-10px);
 }
 .tt:hover::before{
  transform:translateX(+10px);
}
```

https://css-tricks.com/pseudo-element-roundup/

#### 任务三（自己的版本）
只用这些html怎么完成如下网页的制作呢

```HTML
<body>
   <div class="navbar">
      <li class="link-group">
         <div class="link" href="https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl">service</div>
         <div class="link" href="https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl">contact</div>
         <div class="link" href="https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl">donation</div>
         <div class="link" href="https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl">...</div>
      </li>
   </div>
   <div class="title"></div>
   <div class="passage1"></div>
   <div class="passage2"></div>
   <div class="illustration"></div>
   <div class="arrow"></div>
   <div class="next-button"></div>
</body>
```

彩带的答案👇

```CSS
.ribbon {
 font-size: 16px !important;
 /* This ribbon is based on a 16px font side and a 24px vertical rhythm. I've used em's to position each element for scalability. If you want to use a different font size you may have to play with the position of the ribbon elements */

 width: 50%;
    
 position: relative;
 background: #ba89b6;
 color: #fff;
 text-align: center;
 padding: 1em 2em; /* Adjust to suit */
 margin: 2em auto 3em; /* Based on 24px vertical rhythm. 48px bottom margin - normally 24 but the ribbon 'graphics' take up 24px themselves so we double it. */
}
.ribbon:before, .ribbon:after {
 content: "";
 position: absolute;
 display: block;
 bottom: -1em;
 border: 1.5em solid #986794;
 z-index: -1;
}
.ribbon:before {
 left: -2em;
 border-right-width: 1.5em;
 border-left-color: transparent;
}
.ribbon:after {
 right: -2em;
 border-left-width: 1.5em;
 border-right-color: transparent;
}
.ribbon .ribbon-content:before, .ribbon .ribbon-content:after {
 content: "";
 position: absolute;
 display: block;
 border-style: solid;
 border-color: #804f7c transparent transparent transparent;
 bottom: -1em;
}
.ribbon .ribbon-content:before {
 left: 0;
 border-width: 1em 0 0 1em;
}
.ribbon .ribbon-content:after {
 right: 0;
 border-width: 1em 1em 0 0;
}
```