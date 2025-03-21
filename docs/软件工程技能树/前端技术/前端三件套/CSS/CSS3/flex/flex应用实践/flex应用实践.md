---
title: flex应用实践
slug: flex应用实践
sidebar_position: 0
---


# flex应用实践

Author:陈儒

## 写在前面

<b>Think twice, code once.</b>

在前端项目编写过程前，CSS是很容易被前端程序员忽视的，“不就css么，能有什么思考量”。但是往往上手编写后，CSS是折磨大伙儿最深最久的[泣不成声]。相信每一位前端成员都被CSS狠狠折磨过，像是看见调皮捣蛋的学生一般，明明施加了号令却毫不起作用。

我们经常需要面对设计组给出的设计稿来实现他们想要的效果，如果能够找到合适的方法，设计好我们的DOM树，CSS这一环节往往就能事半功倍。

这篇内容更多的是负责写实验室官网时的一些心得，实验室官网的交互功能并没有那么强，但是对设计的要求很高，无论如何不能写丑了。

### 实验室官网设计稿：

<b>温馨提示</b>：该项目使用的是Vue3框架

## 具体实现

### 元素是怎样排布的？

我们首先要思考一个问题，我们的网页都是怎样排布的呢？

![](/assets/JcXHbN3ckoDV9XxKhDOcaFW5nQf.png)

我们以这篇浙江大学的推文为例，大家或许接触过秀米的推文排版，推文排版最大的特点就是，一切元素都是以居中，垂直方向来进行排列的。

我们再回过头来看我们的设计稿

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/WzEtbZjznoUMCLxP7OUcGAcQnfe.png)
</div>
<div class="w-[49%]" width-ratio="49">
![](/assets/H3PcbOslGo64zixPvcMcUr2Unnc.png)
</div>
</div>

以我们的首页为例，很明显，我们可以按照竖直方向，将这个网页分为若干部分：导航菜单、banner、宣传片模块、团队简介、项目简介、荣誉报道、成长历程、报名链接、底部栏，其中底部栏与导航菜单每个页面都有，所以可以单独拎出来作为组件，每个页面都能调用。

所以，我们可以将每一个部分都编写成component，外部用一个大的Container包起来，在这个Container内部，使用flex-column布局

```html
<template>
    <div id="HomeContainer">
        <Banner/>
        <InfinityVue/>
        <HomeTeams/>
        <OurProjects/>
        <Reports/>
        <OurDevelopment/>
        <Passion/>
    </div>
<template>
<style lang="scss" scoped>
#HomeContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
 }
 </style>
```

### 先想好怎么设计

当我们拿到设计组的设计稿的时候，一种很自然的想法是从上到下依次排布，看到什么就先写什么，写出来一点自己的成就感也比较高。但是这样做的效率并不是很好，前端并不是一行一行的命令语句，而是需要经过精心排布的。

所以回到开头的那句话：<b>Think twice, code once</b>.先去思考我们每一个模块需要用到哪些组件，上网找一找轮子，然后再思考这些元素我该怎样使用flex/grid去排布（float绝大多数情况下并不好用，甚至有点反直觉）。

#### 拆分成方块与方块

![](/assets/ApdwbT9EnoValvx67J7cpgFfnSh.png)

如图所示，这是一个点击按钮切换至对应页面的slider，于是我上网搜索找到了vant-ui插件，并使用了里面的vant-swipe组件。使用网上的轮子，第一会让你写起来很舒服，第二，会让你的代码可读性与可维护性变高，毕竟你要改的和你能改的地方就那么一点点。

![](/assets/BrfrbhAqnoiwDtxrM13cDZYtnwd.png)

同样的，我们再以这个组件为例，很显然，这张图我们可以先把它分为蓝色框的两个部分，左边是介绍文字，右边是图片。这两个部分水平排列，而介绍文字里面，每一个文字块都按照竖直方向排列，并且均向左对齐。

因此，我们使用合适的div，调整好flex-direction与justify-content，即可得到我们想要的效果。

#### 移动端的适配

![](/assets/JYzbbmbAJoSsZkxbiqOcjjoSnIe.png)

这么做还有什么好处呢，我们来看移动端，我们只需要调整蓝色方框的位置，flex-direction设为column-reverse，并对元素进行微调即可。合理的布局可以让不同平台适配更简单。

### 多使用组件与props/v-bind

写前端的过程中，我们经常会遇到需要重复使用同一类型的代码，他们可能只有一部分参数不同，有些时候可能嫌麻烦就直接复制粘贴修改了几遍，但这样是不可取的，原因如下：

- 代码会又臭又长，可读性差
- 可维护性差，我们的前端页面，即便是静态页面，也是需要间断更新的。今天给出了四个项目，下一次更新内容可能就要给出七个项目，这样去维护我们的代码会是很痛苦的事情，尤其是假如两次更新页面的间隔时间长达一个月

```html
<div class="ArtTextBox">
    <img src="@/assets/Homepage/OperateTxt.svg" v-if="indexNumber==0">
    <img src="@/assets/Homepage/DesignTxt.svg" v-if="indexNumber==1">
    <img src="@/assets/Homepage/HardwareTxt.svg" v-if="indexNumber==2">
    <img src="@/assets/Homepage/SoftwareTxt.svg" v-if="indexNumber==3">
</div>
```

```html
<div class="ArtTextBox">
<img :src="artTextUrl">
</div>
```

（使用v-bind前后，这两份代码孰优孰劣一目了然吧）

因此，我的建议是能用组件就多用组件，当你觉得自己在做大量重复机械性劳动的时候，不如一劳永逸，使用组件与props来让你的代码在未来的更新成本更低。

在实验室官网项目的实现过程中，我的html部分基本不超过50行，大多数都在20-30行搞定，但是基本上每一个模块都有两层组件。同时，一些像url、title、slogan这样的信息，使用js数组来存储，部分信息也可以重复调用，让又臭又长的部分局限在js数组里面。

### 找轮子

vue与react都有较为成熟的生态，有许多开发者在github等平台发布自己的组件，使用npm包管理即可轻松下载使用。

使用轮子的好处就不赘述了，我们要找的轮子肯定得是功能齐全的、使用方便的，此外，不要忘了对轮子内部css进行修改时，需要把`<style scoped></style>` 中的scoped去掉

比较好用的组件库：

element-ui的Vue3版本，饿了么团队的

Vant-ui 轻量级ui，对样式的限定比较小，非常好用

### 长与宽的抉择

#### 前言

大家都知道css有一个很好用的东西叫vw/vh。这是一个长度单位，假设屏幕宽度为1024px，高度为768px的话，1vw=10.24px，1vh=7.68px。

于是很多同学在编写的时候，喜欢使用vw和vh来让我们的盒子跟浏览器大小成一定比例。因为px是写死的，如果屏幕大小变化的话，很容易产生错位。然而，同学们很可能发现了vw/vh这种神奇的单位后，就开始滥用这种单位了，凡是涉及元素长宽的地方，都使用vw/vh，结果事与愿违。

#### 一些经验

我个人总结出来的一些经验如下：

- vw可以多用，vh尽量不用
- 小组件使用px为单位，设置为固定大小
- 大型图片width满铺，height设为auto

##### vw与vh

![](/assets/OAoybR7YwoHpO8xC0uzcZ0penBd.png)

![](/assets/Vx3sbKzKBoCFkyxkNeBclpCdnHc.png)

![](/assets/SMsgb3GYto4sgex1T9acNPSsnvd.png)

以我们的gitlab为例，这个页面是模板生成的，可以说已经获得过许多用户的认可了。

我们可以看到，改变浏览器高度时，内部元素的排布基本没有任何变化，而当我们改变浏览器的宽度时，内部的元素之间的位置会发生偏移，因此绝大多数情况下，浏览器窗口的宽度对我们来说是没有任何意义的。我们按照竖直方向进行阅读时，有部分内容被隐藏是很正常的事情，那种需要对浏览器高度进行响应的情况非常少。

当然，也有例外，比如视频组件由于浮于其他组件上方，使用绝对定位，需要让他居中显示，那就需要用到我们的vh了

![](/assets/YYyPbZ7CsoiPDDxH7yLcwjS4nXb.png)

##### 小组件固定大小

![](/assets/NMX4b93lToWC4cxqVsrc5T4Nn6x.png)

如上图所示，红色框框起来的几个组件，属于按钮、卡片类组件，这些组件我们可以把他们看作一个基本单位，他们的宽度与高度应该是固定的，我们只需要去调整他们的位置即可。

##### 图片满铺

图片的满铺只是作为一个例子，想要让前端开发者知道的是，<b>一般情况下</b>，<b>图片是一定要保证长宽比不变的。</b>下面的第一张图就是一个反面例子，同时使用vw和vh后，图片可能在某一台电脑上表现良好，但是更换不同比例的显示器后，图片比例明显不对了。

![](/assets/P1Evb4b75oLcwvxY6QHcGKSznBf.png)

![](/assets/MoRbbWmlHo3NP2xsRHjcZPLnn5b.jpeg)

### 前端开发者如何使用figma

figma是一款设计软件，与之类似的还有蓝湖，前端开发者可以很方便地在上面获取相关组件的CSS信息，不再需要肉眼观察到底有多高了。

![](/assets/FxnHbznVFozMBsxxFHdcNINOnyV.png)

#### 操作界面

主要使用的操作界面大致分为三个区域，左上方鼠标工具，左侧方组件结构，右方组件属性。

##### 鼠标工具

![](/assets/Nw6ub4maAoW82fxa815cscRTnsC.png)

首先figma有三个工具：选择、移动、评论，大多数情况下，我们使用选择工具即可，左键选中，中键移动。

##### 组件树

![](/assets/EoKmbWErBow9W2xUK8GctHdonTh.png)

figma的结构也是树形结构，如图所示，我们在左侧的组件树上可以很方便地点击选中这张图片的父级组件，来处理一些不太好用鼠标直接选中的组件。

与此同时，使用ctrl+左键/shift+左键可以同时选取多个组件。

##### 组件属性

![](/assets/Wv1KbVrsvoDaSUxvvZIcLOisnjr.png)

右侧则是这些组件的一些基本属性，例如使用的是什么字体，宽度高度是多少，添加了哪些样式等等。要注意：宽度与高度在不同浏览器下表现是不同的，这一点可以参考上文的内容（包括左边距等属性）。

#### 常见使用方法

![](/assets/L6j4b3p8LoWCHSxHizocXJs1nZe.png)

右键组件树上的组件，即可进行复制操作，这里比较推荐的是存为svg，我们只需要新建一个文档，后缀命名为.svg，然后把复制过来的svg代码粘贴进去即可。

![](/assets/G3JFbHbPhoM8PxxcakXcLUDGnab.png)

左键单击我们想要的组件，即可查看它与边界、其他组件的距离。

