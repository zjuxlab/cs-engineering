---
title: Animations module
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-it1gwwgjriq0w0k7bptcbr4bn8g-ruhywty6risxg9kbqu4ceuwynmd-xemswwzvsidkzgktyktcf7hhnyh-xemsww
sidebar_position: 2
---


# Animations module

Author：符一笑

#### <b>outline:</b>

- application of css animation
- when you should choose css animation
- basic css animation and examples
- advanced css animation and examples 
- conclusion and tasks

#### <b>notion:</b>

本篇包含

- 奇怪的中英混杂
- 可能存在的技术上的或者理解上的问题

也许应该看看css 基础结点（

#### <b>application of css animation</b>

- 变换元素
- 丝滑动效

css  动画可以让你的 Dom 元素动起来，基本上，包括平移旋转倾斜缩放。不过动画不一定要动，有时候可以直接利用缩放的<b>结果</b>，比如网页上要放两个对称的元素但是只有一张图，这时候上个旋转就不用重新导入一张图了，再比如要搞许多不一样大小的点，完全可以用缩放而不是一个一个一个调大小；

css动画的性能问题：和其他前端设计一样，动画也会有性能的开销。一些属性的动画性能开销相比其它属性要小。例如，为元素的 width 和 height 做动画会更改其几何结构并且可能会<b>造成页面上的其它元素移动或者大小的改变</b>，这个过程称为布局。触发布局就容易卡卡的。所以通常，你应该避免动画触发布局或重绘的属性。 对于大多数现代浏览器，这意味着把动画局限于 opacity 和 transform 属性。

#### <b>when you should choose css animation</b>

那么众所周知，js也是可以做动画的，而且精细得多，毫不夸张地说，css能实现的动画js动画都能实现，那么css动画还有什么存在的必要吗？主要有这么几个理由

- css动画更加顺滑
- css问题css解决
- 有天然事件支持，不用自己写事件
- 自动降级适配浏览器

前两个是有长期意义的，这里解释一下原因，根据 Google Developer，渲染线程分为主线程 (main thread) 和合成线程 (compositor thread)。如果 CSS 动画只是改变 transforms 和 opacity，这时整个 CSS 动画得以在合成线程完成（而 JS 动画则总会在主线程执行，然后触发合成线程进行下一步操作），在 JS 执行一些昂贵的任务时，主线程繁忙，CSS 动画由于使用了合成线程所以仍然可以保持流畅。至于第二点，样式问题放到样式文件里总是舒服的，虽然js很强大，但是充斥文件的js也是让人不爽。其他优势也是显见的。

再讨论一下css动画的短板

- 相比js功能不够强大，没有办法实现高效控制
- css动画常有兼容性问题，而js很少有兼容问题

总结一下使用场景：面对复杂的富客户端界面或者在开发一个有着复杂 UI 状态的 APP时，使用 js 动画会使你的动画可以保持高效，并且使你的工作流也更可控。而在实现一些小而频繁的交互动效的时候，就多考虑 CSS 动画。

#### <b>basic css animation and example</b>

这部分主要介绍一下css动画的基本用法（也是大多数情况下的用法），对于有可能的兼容性问题和太生僻的动画就略讲了。css 动画主要分两种，transform和keyframe；其中keyframe可以做到更加精细的控制，但是在讲解这两者之前先用 transition 熟悉一下动画的一些参数设置。

##### <b>transition</b>

transition控制了样式的过渡，对transform和keyframe都生效，这部分的内容是有限的，学完了就是学完了，我们直接列一个表，一目了然。

上面表格里的是transition 的四个子属性：

transition-property: 规定应用过渡的 CSS 属性的名称

transition-duration: 定义过渡效果花费的时间。默认是 0。

transition-delay: 规定过渡效果何时开始。默认是 0。

transition-timing-function: 规定过渡效果的时间曲线。默认是 "ease"。

transition-property指定需要过渡的CSS属性。

并不是所有属性都能过渡的，只有能数字量化的CSS属性才能过渡。如 width，height，top，right，bottom，left，opacity 等等。

常用的transition 格式是下面这样的，一句声明一个或多个属性的过渡效果，<b>逗号分隔</b> ！一会的transform是<b>空格分隔</b>的，别搞错了。

```css
//第一段,这样就实现了一个hover的时候放大方块的动画
 .b{
     width:200px;
     height:200px;
     background-color: antiquewhite;
     transition: width 2s 0.5s ease,height 4s 0.5s ease-in-out;
 }
 .b:hover{
     width:800px;
     height:600px;
 }
  //注意，一定要使用单一的transition语句，两个transition语句会变成后覆盖前，
  //比如下面这段css的结果就是，width瞬间完成，height慢慢变化
 .c{
     width:200px;
     height:200px;
     background-color: antiquewhite;
     transition: width 2s 0.5s ease；
     transition: height 4s 0.5s ease-in-out;
 }
 .c:hover{
     width:800px;
     height:600px;
 }
 
 //父元素的动画影响伪类的动画属性
 //此段效果是当移开鼠标，方框瞬间弹回原位，因为父元素没有这个样式设置，反之，上面的几段
 //由于继承没有这种表现
 .d{
     width:200px;
     height:200px;
     background-color: antiquewhite;
 }
 .d:hover{
     width:800px;
     height:600px;
     transition: width 2s 0.5s ease,height 4s 0.5s ease-in-out;
 }
 
 //伪类可以override transition属性
 //效果是放手的时候width快于height变化(放手后就是按照父元素的属性执行啦)
 .e{
     width:200px;
     height:200px;
     background-color: antiquewhite;
     transition: width 2s 0.5s ease,height 4s 0.5s ease-in-out;
 }
 .e:hover{
     width:800px;
     height:600px;
     transition: width 4s 0.5s ease,height 2s 0.5s ease-in-out;
 }
```

##### <b>transform</b>

内容仍然不多，先看表格吧更加清晰一点

以上表里的是最基础的情况，实际上transform有一些变种，比如matrix有matrix3d，scale有单独的三轴缩放，rotate有很酷的x，y轴的三维旋转；

无论什么transform动画（除了修改景深，但那又不是动画）都可以用matrix或者matrix3d实现，但是css仍然提供了通俗的细分的变换（他真我哭），所以大多数情况下,transform 的意义是直观的，自己上手实践一次就学会了，我们只讨论一下有关三维的情况。

###### <b>如何使用css的3d动画</b>

3d动画的创建分两步，首先通过一个透视图来配置 3D 空间，然后配置 2D 元素在该空间中的行为方式。要设置的第一个元素是 <b>perspective</b> 。透视是给我们3D印象的东西。元素离观察者越远，它们就越小。

```css
//设置的景深使rotateX有了明显效果，自己插个图试试
.c{
    content:url(./a.jpg);
    size :400px 400px;
    position:absolute;
    top:100px;
    left:200px;
    transition-duration: 2s;
    transform:perspective(200px);
}
.c:hover{
    animation-name: iii;
    animation-timing-function: linear;
    animation-duration: 10s;
    animation-iteration-count: infinite;
}
@keyframes iii {
    0%{transform:rotateX(0deg) }
    100%{transform:rotateX(360deg)}
}
```

好吧真的要搞3d动画都会调库的，这里大家搞懂原理就好了，

设置完景深之后浏览器就会根据3d空间计算渲染图像，“动”的过程型没有什么变化，仍然用之前类似的方法写变换就行了

以matrix3d来讲，毕竟它包含了所有变化，这个矩阵是4*4 的。

前三行分别是x y z 的线性变换矩阵，

最后一行从左到右分别是 x位移 y位移 z位移 1；（一般来说最后一个都是 1 ）

动手尝试一下吧

注意transform仍然是受transition的属性影响的，不过书写格式和transition不一样，是用空格分隔的，<b>假如你用逗号，一个transform都不会执行</b>.

##### <b>@keyframes</b>

顾名思义，keyframe 就是关键帧动画，transition 和transform 动画是和元素绑定的，但是关键帧动画是单独声明的，所以可以重用，而且可以在关键帧动画中包含transform 动画 

```css
//这样声明一个关键帧动画
 @keyframes xx {
     0% { background-color: red; }
     30% { background-color: yellow; }
     60% { background-color: green; }
     100% { background-color: red; }
 }
//从0% 到100% 你可以任意插入关键帧 ，这些帧会以时间为度量从一个转变为另一个，
//时间流逝的函数可设置（animation-timing-function）
//这样使用
 div:hover {
     animation-name: xx;//可以多个吗？###
     animation-duration: 5s;
     animation-timing-function: linear;
     animation-iteration-count: 2;
 }
```

除此还有两个可以设置的属性

- animation-fill-mode：结束状态，设置动画结束时盒子的状态
- animation-direction：动画的执行顺序，动画是否应该播放完后逆向交替循环（对设置了多次播放的动画有效）其值为：normal（默认值，动画正常）、reverse 反向、alternate（动画交替循环逆向运动）

关键帧动画的优点就是自由精细，而且编写十分直观。除去写代码并不需要额外实质性学习什么东西，写几次就熟了（迫真，一般说的写动画都是指keyframes

出于内容完整考虑下面展示一下（而且也是常用的），在关键帧中使用transform的效果 ，以及同一个元素绑多个关键帧动画的效果

###### <b>关键帧中使用transform</b>

e.g.

```css
.b{
     width:200px;
     height:200px;
     background-color: antiquewhite;
     /* transition: all 2s 0.5s ease,width 2s 0.5s ease,height 4s 0.5s ease-in-out; */
 }
 
 @keyframes an1 {
     0% {
         width:200px;height:200px;
         transform:rotate(45deg);
         transition-duration: 2s;
     }
     100% {
         width:400px;height:100px;
         transform:rotate(135deg);
     }
 }
 .b:hover{
     animation-name: an1;
     animation-timing-function: ease-in-out;
     animation-duration: 3s;
     animation-direction:alternate;
     animation-iteration-count: 4;
 }
```

实测效果是transform有效但是由于关键帧动画的存在，transform只会保留结果，设置关键帧和原来的元素的transition也没有用

###### <b>同一个元素绑多个关键帧动画</b>

```css
@keyframes an1 {
     0% {
         width:200px;height:200px;
         transform:rotate(45deg);
         transition-duration: 2s;
     }
     100% {
         width:400px;height:100px;
         transform:rotate(135deg);
     }
 }
 .b:hover{
     animation-name: an2,an1;//     <-----------------------THIS LINE
     animation-timing-function: ease-in-out;
     animation-duration: 3s;
     animation-direction:alternate;
     animation-iteration-count: 4;
 }
 @keyframes an2 {
     0% {
         width:200px;height:200px;
         transform:rotate(45deg);
         background-color: brown;
     }
     100% {
         width:400px;height:100px;
         transform:rotate(135deg);
         background-color: blueviolet;
     }
 }
```

实测效果，当采用逗号分隔的多animation，只会放第一个，空格分隔一个都不放 ，说明animation不叠加，和transition 和transform都不一样。

注意，对同一个元素同时使用transform和animation，transform会失效。但是如果硬要做的话，在这个元素的外层再加一层div，对外层的div进行transform，对内层div进行animation就可以解决了。

最后，注意关键帧动画不能实现不连续属性的过渡，也就是不能突变，比如display之类的，这种时候要用z-index，opacity之类的连续属性代替实现。

#### <b>advanced css animation and examples </b>

到这里你应该已经熟练掌握了基本的transition，transform，@keyframe的使用方法，或者还没有经过练习至少应该可以轻松看得懂接下来的代码，这部分介绍一些常用的或是有创意的的简单动画。

css动画使用得当，可以在不影响网页整体性能的情况下白赚高级感，同时提升用户的浏览体验。好动画利人利己，在重复的调试过程中自己有个动画看也是一件美事。

##### <b>用简单的动画提升浏览体验</b>

借鉴他人是提升的必经之路，针对简单动画，这边收集了四个css 动画库，既是学习的资料，也可以当作平时工程里面“开袋即食”的动画插件。

记住几个简单动画并且在开发中用出来有助于培养一种自己很会的错觉（

资源1： 

一个css animation 库，开袋即食（内容比较针对文本，非常容易融合到日常设计中

资源2：

内容比较针对icon，个人觉得应用在选项或者一些按钮上效果会非常好

资源3： 

神中神，涵盖了非常多的角度，（不过尚在制作中，代码在这里 

）不过都非常适合使用，同时<b>非常适合仿制练习</b>！（闻到了task的味道）

资源4：

相对简单，主要是hover的效果，属于基础款，不过好家伙竟然要收费，这不给他手搓出来气死他（

##### <b>创意动画</b>

###### <b>退后，背景！</b>

相信大家都做过那种点击一个按钮之后弹出一个小窗口同时一个遮罩让其他地方（背景）变暗的效果，是时候炫耀一下你对css的熟悉度了，给整个背景设置prospective然后用translate Z（）把背景推开吧，结合模糊食用效果巨好，甚至感觉可以成为常用解决方案（

```css
.c{
     position:absolute;
     top:0;
     left:0;
     height:100%;
     width:100%;
     filter: blur(0);
     background-color:darkorange;
     /* transform:perspective(100px); */
     transition-duration:0.4s;
     transition-timing-function: ease-in-out;
 }
 .c:hover{
     transform:perspective(100px) translateZ(-20px);
     filter: blur(10px);
     background-color:rgb(117, 81, 37) ;
 }
```

实际操作的时候需要更加明确的指定施加动画的东西，可以试试如何在复杂的html中推后整个背景（一种可行的赖皮做法是把弹窗放到大container外面，然后直接对container上动画）

##### 视差效果

属于prospective的运用之一，原理是这样的，具有prospective属性的元素对scroll事件的敏感度会变化，于是利用这点可以创建一个缓动的背景，也就是视差效果（动了，但是动的慢），应用交给灵感吧

```html
<body>
    <div class="container">
        <div class="box">
            aaaaaaaa
        </div>
        <div class="bb"></div>
        <div class="back"></div>
    </div>
</body>
```

```css
.container {
    /* 滚动容器 */
    size:20px 30px;
    overflow-y: scroll;
    overflow-x: auto;
    perspective: 1px;
    padding: 0; height: calc(100vh - 300px); overflow: auto;
    }
    
    .box {
    height: 120px;
    transform-style: preserve-3d;
    position: relative;
    
    }
    .bb{
        content:url(./bac2.png);
    }
    .back {
    content:url(./a.jpg);
    size:40px 50px;
    /* 滚动比较慢的背景元素 */
    position: absolute; left: 50%;
    transform: translate3D(-50%, -120px, -1px);
    }
```

###### <b>让列表动起来</b>

列表一直给人一种生硬的感觉，越是有高级感需要的网页（比如某官网 x)）在列表的处理上越要注意，通过css给列表元素的增、删添加一个小动画，避免突然插入元素导致<b>页面闪了一下</b>这种感觉，这类细节会让浏览者舒服很多，而且实现也不复杂，主要是观念上的问题。例子见第三个资源。也许你会觉得没有js没办法解决这种问题，不过现在已知是可以无js强行整的，项目中实操性不论，确实可以，举个例子就清楚了，比如用target结合锚点可以脱离js指定元素，还可以改它的样式，于是你做到了元素的隐藏显示。再进一步，给这个显示的元素改成动画显示，那现在你就有了充分的自由了

```html
<body>
    <a class="c" href="#p1">add</a>
    <div class="b" id="p1">aaaaa</div>
</body>
```

```css
.b{
    size:200px 30px;
    background-color: antiquewhite;
    position:absolute;
    top:400px;
    margin-left: 30px; 
}
.b:target{
    animation-name:iii;
    animation-duration: 2s;
    animation-timing-function: linear;
}
//瞎调的色，瞎眼警告
@keyframes iii {
    0%{transform:translateX(-200px);background-color: #666;}
    80%{transform: translateX(20px);background-color: #999;}
    100%{transform: translateX(0px);background-color: #888;}
```

###### <b>让scroll动起来</b>

我认为最酷的东西来了，在长列表的滚动过程中给条目添加一个类似惯性效果的甩动动画，直接把你的网页提升到了另外一个高度 x），非常适合显示个性和提升高级感

对了，你是否知道滚动也是可以个性化的，试试这些伪元素（离题）

<img src="/assets/VSh4bIuGqouX3yx9bAmcR0I6nZc.png" src-width="1430" src-height="762" align="center"/>

搭嘎我自己是写不出纯css的实现，蹲一个不用js的方案，详见资源三

###### <b>与众不同的check box</b>

🍎机上面那种圆圆的滑动开关见过吧，是时候整点个性进去了，用简单的css动画“重写”开关的动画（由于可以用伪元素完全实现，所以html里这个开关是表现为单元素的，很有重写的感觉）

```css
.b{
     width:40px;
     height:20px;
     border-radius: 10px;
     border:1px solid black;
     position:relative;
     top:0px;
     left:0px;
     background-color: #f7f7f7;
     transition-duration: 0.4s;
     justify-items: center;
 }
 .b::before{
     justify-self: center;
     content:"";
     width:20px;
     height:20px;
     border-radius: 10px;
     background-color: rgb(19, 246, 76);
     border: 1px solid #666 inset;
     position:absolute;
     top:0;
     left:0;
     z-index:2;
     transition-duration: 0.4s;
 }
 .b::after{
     justify-self: center;
     content:"";
     transition-property: all;
     transition-duration: 1s;
     width:2px;
     height:1px;
     border-radius: 1px;
     background-color: #444;
     opacity: 0;
     position:absolute;
     left:19px;
     top:10px;
     z-index:1;
     transition-duration: 0.4s;
 }
 .b:hover::before{
     transform:translateX(20px);
 }
 .b:hover::after{
     transform:scale(20);
     border-radius: 10px;
     opacity:1;
 }
 //写完想想用keyframe会舒服很多
```

###### <b>突出css动画的长处</b>

之前说过css动画处理得当的话丝滑异常，活用css的优势动画，白赚一波高级感吧（代码供参考，有个自动的变亮效果挺有意思）

```css
.b{ 
     content:"aaaaaaaaa";
     width:80px;
     height:40px;
     color:#000;
     overflow: hidden;
     background-color: rgb(145, 145, 145);
     transition-duration: 1s;
     position:relative;
     top:100px;
     left:100px;
     z-index:2;
 }
 .b::after{
     content:"aaaaaaaaa";
     width:80px;
     height:40px;
     background-color: aqua;
     position:absolute;
     left:80px;
     transition-duration: 1s;
     z-index:1;
 }
 .b:hover::after{
     transform:translateX(-80px);
     opacity:0.5;
 }
 .b:hover{
     color:aliceblue;
 }
 //没调整文本位置，悲
```

###### <b>说说颜色渐变</b>

动画中是出现颜色渐变最多的情况，通常情况下随手弄出来的颜色过渡会不太好看，这时候一种方法是灵活使用时间函数，在不好看的地方狠狠加速，另一种方法是插入一个中间颜色把一个大过渡变成两个小渐变，绕过不好看的那片区域，简单但是有效，小技巧了属于是。

<img src="/assets/ZryCb2E94oS8AQxqyqscQr7tnse.png" src-width="646" src-height="477" align="center"/>

<img src="/assets/AbVYb0X5xoZ7JTxdk3McBBpfnNj.png" src-width="644" src-height="475" align="center"/>

###### <b>利用无限动画</b>

相比于有限重复的动画无限动画更像网页的一部分，因为它一直在动，还会持续地吸引浏览者的注意力。当网页要求重点明确的时候，最好避免出现这种东西吸收注意力，但是假如网页缺乏活力，或是为了彰显风格，则可以考虑使用无限动画

比如可以做一个转转的唱片

<img src="/assets/TUi7bSgL2oEaqpxUnLFcMFn3nZf.png" src-width="339" src-height="331" align="center"/>

还有下面这种很有潜力的代码，想想一下叠放许多图片然后施加无限旋转，有点设计本领的人一定可以整出好活

```css
.c{
    width:500px;
    height:800px;
    overflow:hidden;
    float:right;
    position:relative;
    margin-top:-200px;
    z-index:3;
}
.c::before{
    content:url(./bac1.png);
    size: 500px 800px; 
    background-size: 500px 800px;
    position:absolute;
    top: 0;
    left:0;
    z-index:4;
}
.c::after{
    content:url(./bac2.png);
    size: 600px 800px;
    background-size: 500px 800px;
    position: absolute;
    top: 0;
    left:0;
    z-index:2;
}

@keyframes iii {
    0%{ transform:rotate(0deg); }
    100%{transform:rotate(360deg);}
}
.c:hover::after{
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-name: iii;
    animation-iteration-count: infinite;
}
.c:hover::before{
    animation-timing-function: linear;
    animation-duration: 20s;
    animation-name: iii;
    animation-iteration-count: infinite;
}
```

#### <b>conclusion and tasks</b>

task 1：实现一个 3d 的立方体，并让其在一定条件下展示所有的面

task 2 : 用关键帧动画制作一个酷炫的动画

task 3 : 展示一下动画设计功底，或是单纯的表现一下创造力，结合一个永动动画制作一个很cool的网页

task 4 : 康康上面的资源css动画库，自己实现其中的几个动画

#### <b>material</b>

一些细节辨析：

一些规范：

 

一月两更啦，求个赞啊😀（

