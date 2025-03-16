---
title: Tailwind CSS
slug: Tailwind CSS
sidebar_position: 0
---


# Tailwind CSS

Author:符一笑

#### <b>写在前面</b>

接这个题的时候还没用过tailwind然后研究了一下直接就被吓住了，当时就是很后悔（

简而言之tailwind和我们一般写的HTML和CSS风格区别非常大，熟练起来的成本可以说不亚于重新学习css的难度。

我最担心的事情就是tailwind直接给读者吓跑，因为毕竟开发讲究的是协作，而tailwind在这方面有两个大问题。首先tailwind的理念会让多数前端开发者嗤之以鼻，其次，如果要使用tailwind就必须整个团队都使用，而tailwind的学习成本不小。

不过不过，tailwind里面有一些理念即使是在任何开发中都适用的，tailwind的创立者Adam Wathan 有一篇文章详细探讨了传统的语义性css的各个方面，里面的思路非常有意思。我会把这些讨论和tailwind里面一些普世的思想放到第一部分，即使不打算学习tailwind也是可以一读的。

第二部分会着重展开tailwind的上手教程，提前透露一下，其语法和思路非常简单但是编程时的习惯非常难改，这也是tailwind熟练难的原因。

废话就讲这么多，开始吧

#### <b>Tailwind的理念和语义性css的探讨</b>

”语义性css“就是“Semantic CSS”，这是主流推荐的css编写方式。虽然只说了css，但是，对此更好的描述方式是：<b>一种HTML和CSS的组织方式</b> 。为什么这么说一会就会明显起来。

对了，你有没有听过“语义css”的含义呢，什么？听过了？无妨，还是来品鉴一下。

所谓 Semantic CSS 强调的是 “separation of concerns” ，也就是让HTML干HTML的事，CSS干CSS的事，不用奇怪如果你就是受到这样的指导，这是主流的good css的观点。这样做有明显的好处，比如单单调整css文件就可以完成整个页面的布局，又比如html的结构会非常清晰，毕竟里面只剩下内容（content）了。

极端的 Semantic CSS会要求对 ID或者Class的命名都是语义的，比如说`class="greeting";class = "label-word"`这样。`class="text-center"`就不行，因为里面掺了布局要素center（就有点扯）。

举一个实际例子，你的HTML和CSS看起来会是这样

```html
<div class="author-bio">
     <img src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
     <div>
       <h2>Adam Wathan</h2>
       <p>
         Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
       </p>
     </div>
   </div>
```

```css
.author-bio {
   background-color: white;
   border: 1px solid hsl(0,0%,85%);
   border-radius: 4px;
   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
   overflow: hidden;
   > img {
     display: block;
     width: 100%;
     height: auto;
   }
   > div {
     padding: 1rem;
     > h2 {
       font-size: 1.25rem;
       color: rgba(0,0,0,0.8);
     }
     > p {
       font-size: 1rem;
       color: rgba(0,0,0,0.75);
       line-height: 1.5;
     }
   }
 }
```

可以看到，css呈现出了很强的结构性，而且基本就是html的镜像，这样还影响了子元素的重用性（虽然语义性终归会阻止你的部分重用），不过，好消息是你的HTML确实和styling无关了，可喜可贺。

就这样当然是不行的，平常写的时候一般都会创建更多的class，把样式打散，像这样：

```html
<div class="author-bio">
   <img class="author-bio__image" src="https://cdn-images-1.medium.com/max/1600/0*o3c1g40EXj65Fq9k." alt="">
   <div class="author-bio__content">
     <h2 class="author-bio__name">Adam Wathan</h2>
     <p class="author-bio__body">
       Adam is a rad dude who likes TDD, Active Record, and garlic bread with cheese. He also hosts a decent podcast and has never had a really great haircut.
     </p>
   </div>
 </div>
```

对类的命名可以换其他的规则，不过大致就是这个意思，现在你的css 有更多的hook可以使用了。通过把类打散，你提高了样式重用的可能性，而且结构清晰了不少，而且而且你保住了语义性。

但是问题接踵而来，样式重用仍然是个问题，你比如在另外一个地方出现了一个和写过的样式非常像的样式，但是也有些微的不同，比如说是article-preview相关的内容（因此你的语义css会以article-preview-xx开头），注意，这里语义的要求不是导致麻烦的根源，毕竟本质上来说这确实是两个不同的东西，所以你理应重新写一次之前写过的css。

你当然可以选择去duplicate写过的css，或者聪明一点用`@extend`，不过没啥本质不同，其实就是重新写了一遍，感觉非常不好。

是时候让常识回来了，抛开这些那些的规定，这时候我们最渴望做的事情就是<b>组件化</b>，通过把样式相似的部分抽象出组件，然后重用这些组件。不过必须指出，这其实是不语义的，假如你把之前的两类相似样式抽象成了“media-card”组件（各种意义上的组件），并记得把html里面的class都改成”media-card“，但是这时候甲方突然发病，要求你改动其中一种card的样式（之前有两种），然后你就看着一堆需要更改的html陷入了沉思。假如之前还是语义化的代码，这会就不需要改动html，直接去修改一个类的css就可以了。

所以语义化赢了吗？没有。当然不是因为甲方发病是偶然事件（？，也不是因为组件化的快感值得冒这个风险。

得到真正的<em>原因</em>需要我们换一个观点去看html和css之间的关系。

传统的观点当然是“内容”和”样式“的分离，从在一个文件里了完成标记到分离成两个文件。其目的就是把一个（静态的）网页的内容信息和样式信息放到两个地方。

现在要介绍的观点则是，html和css是<b>相互依赖</b>的关系，也是这个原因，Semantic css才被认为是一种css和html的组织形式，而不是单独强调css。什么意思呢？先把样式和内容重新融合成一团，现在我们如果确定了一段html，那么要做的就是给他一个样式，这时候需要到css里面去实现这个样式；反过来，假如设计者发现了页面样式的共性并抽象出了类或说组件，那么相当于确定了一段css，接下来就是去把这个样式分发给html。

说到这应该有点感觉了，每个页面元素包含了内容和样式信息，当你确认了其中之一，另外一半会产生”依赖性“，无论是先确定html还是css都是一样的，依赖性必然会产生。语义性其实就是强行规定对于所有元素都优先确定其html，然后把依赖性全部转移到css里面去。这样的结果就是修改”样式“不影响“内容”，也就是你可以单独操纵所有的样式。

（<em>改依赖项不影响本体，改本体会牵扯依赖项</em>）

回顾我们组件化的例子，组件其实就是将css作为主体将html作为依赖项，于是当我们想改css，html也被迫做出更改，是不是很好理解。

我们已经接近在寻找的<em>原因</em>了，注意到任何一个“html-css”关系对总有一方修改起来比较麻烦，而另一边修改起来很方便。仔细一看这其实是一件很公平的事，不管你怎么组织，都是有一个好处，同时有一个坏处，对吧。所以不管你采取的是何种策略，其实总的易修改内容和难修改内容都没有变。这就是脱离语义化的最大的原因。

总结来看，我们可以这样形容“关注点分离“和”组件化“两种策略

1. <em>“关注点分离”</em> 依赖于 HTML 的 CSS。
    - 根据您的内容命名您的类（如`.author-bio`）将您的 HTML 视为 CSS 的依赖项。
    - HTML 是独立的；它不在乎你让它看起来如何，它只是公开像<em>HTML 控件那样的</em>钩子<em>。</em>`.author-bio`
    - 另一方面，您的 CSS 不是独立的；它需要知道您的 HTML 决定公开哪些类，并且需要以这些类为目标来设置 HTML 的样式。

2. 在这个模型中，您的 HTML 是可重新设计的，但您的 CSS 是不可重用的。
3. <em>”组件化“</em> 依赖 CSS 的 HTML。
    - 在 UI 中的重复模式（如 ）之后以与内容无关的方式命名您的类`.media-card`将您的 CSS 视为 HTML 的依赖项。
    - CSS是独立的；它不关心它被应用到什么内容，它只公开一组可以应用到标记的构建块。
    - 您的 HTML 不是独立的；它正在使用 CSS 提供的类，它需要知道存在哪些类，以便将它们组合起来，但它需要实现所需的设计。
    - 在这个模型中，你的 CSS 是可重用的，但你的 HTML 是不可重新设计的。

现实情况往往是两者的融合，注意把常修改的东西作为依赖项（这意味着修改不会蔓延），这样就会大大减少工作量，这才是最重要的对吧。

好了，图穷匕见。

不管怎么说（即使现在你拥有了从另一个视角审视这个问题的能力），我相信大多数人还是会坚持语义代码（我也...大概），毕竟主流就是主流，那您猜猜tailwind（防止你忘了，这才是正题）倾向哪边呢？

答案是可重用的 CSS，tailwind选择了针对可重用 CSS 进行优化，换句话说是背离了一般的选择，作者也在tailwind主页说了（xs）所有人都无法理解它的选择直到尝试了这种编写思路。所以，如果你要学tailwind就要做好被抛奇怪的眼神的觉悟（

接下来就是讲述tailwind发明者一步步踏上邪路（bushi 的故事。

众所周知，css里面一个页面元素可以有多个类（更多见css selector），空格分隔就可以了。<em>tailwind的基本思路就是 -- 让一个元素拥有很多很多的类来完成css的重用！</em>

听着有点恐怖，一个元素多个类什么的平时自己也会用，但是”很多很多“就有点吓人了，毕竟这个类是要写道html里面去的，肯定会非常混乱。当然了，这个“很多很多”带来的好处就是重用率的大提升，毕竟”越具体的组件就越难重用，越基本的组件越容易重用“。

不妨来看个例子。

```html
<div class="py-3 px-4 border-b border-dark-soft flex-spaced flex-y-center">
         <div class="text-ellipsis mr-4">
             <a href="..." class="text-lg text-medium">
                 Test-Driven Laravel
             </a>
         </div>
         <a href="..." class="link-softer">
             @icon('link')
         </a>
     </div>
```

这就是使用tailwind的效果（后果），你有一大堆的类，每个类与其说是类不如说就是一个css语句，比如这个 `py-3`的css语句就是`padding-top:xx` 3的意思是<b>约定好的第三种长度</b>改成`py-1` 那意思就是约定好的第一种长度。而什么`flex-spaced`其实就是一个flex相关的语句。

绷不住了，这不就是内联吗，只不过把代码移到了class里面。

对的，但是不完全对。首先，虽然说是越小越容易重用，但是我们的类始终不会下降到原子语句的级别，其次，就算到了那个级别，也会额外增加一个规范的作用，比如指定好长度的级别、颜色的种类等等。

实际上总体的工作量并没有变化，甚至会因为重用减小，仔细分析的话只有代码分布发生了变化--在html里面增加了很多修饰。相比传统的创建hook然后再到css文件里组合样式的方式，这样的思路更接近内联。

是时候介绍一下tailwind的另一个优势了，tailwind通过使用小型、可组合实用程序类（所谓”程序类“就是上面的那种），使团队中的每个开发人员总是从一组固定的选项中选择值。

> 更多官方的优势陈述：
> <b>You aren’t wasting energy inventing class names</b>
> <b>Your CSS stops growing</b>
> <b>Making changes feels safer</b>

这一点还是相当难能可贵的，我自己也是因此原谅了它的一些不便，但是又一想，这难道在一般的开发中做不到吗？如果在一个项目开始的时候就可以统一好比如说主题颜色，比如间隔，比如按钮圆角的规格不会很方便吗。

假设这些已经做到了，那么接下来页面的编写其实可以变成这样

- 根据规格实现一系列的辅助程序类
- 在html里面直接使用这些类来编写全部的内容，期间不需要修改任何css
- 通览全局之后提炼出额外组件，更新一次css和html

就是这么简单，看着好像还是挺爽的，当然前提是设计会好好地按规格标出来每个部分是几号的间隔，几号的字体（被打

其实上面这几条也就是tailwind的工作流程了，基本思路就是这些，至于包本体致力于实现的是诸如，自动在css文件插入新增类，组件管理，文件管理方面的工作。

总结一下

- Semantic CSS并不是神圣的，任何css和html的组织形式都相同的具有依赖性和被依赖性，都会有方便的和不方便的地方
- tailwind通过构建小型实用程序类实现css重用
- 无论是否使用tailwind，在协作中规制好一系列的长度，空白长度，主题颜色，字号都是十分推荐的

#### <b>上手Tailwind</b>

好了，现在还有机会掉头离开，只推荐愿意稍微转变自己写css的思路，或者是真的想学会tailwind的同志前进

整个上手过程大致分为这么几块

- 安装和配置
- 基本语法
- 组件化
- 高级tailwind

##### <b>安装和配置</b>

tailwind其实就是个包，你可以用npm来安装和管理它

使用：

```bash
npm install -D tailwindcss
```

来安装tailwind到你的项目目录里面，-D是仅开发环境的意思，不会发布到生产环境里去，毕竟tailwind其实就是个写css的工具，非常合理。

然后同目录运行：

 npx tailwindcss init

进行初始化，结果就是有一个 ” tailwind.config.js “文件

 这个文件需要简单配置，目前来讲只需要修改content一栏，一开始的样子是这样的：

```js
/** @type {import('tailwindcss').Config} */
 module.exports = {
   content: [],
   theme: {
     extend: {},
   },
   plugins: [],
 }
```

把content改成：

```js
content: ["./src/*<em>/</em>.{html,js}"]
```

这个的意思告诉tailwind要扫描全部这些模板文件。

下一步是创建一个input.css 文件并且往里写入这样的指令：

```css
@tailwind base;
 @tailwind components;
 @tailwind utilities;
```

 你的IDE可能认不出啥叫tailwind，然后给你画上浪线，你需要去装点插件，VS code搜索`Tailwind CSS Intellisense` 和`PostCSS Language Support`,  提供了一大堆功能，解决问题肯定够了，其他的供慢慢探索吧。

配置完成，直接启动tailwind

```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

指令的意思是以`input.css`为输入，以`output.css`为输出运行tailwind cli，完了之后盯住这些文件随时更新。

最后一步，在你的html里面链接好 style sheet `output.css`

```html
<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link href="../dist/output.css" rel="stylesheet">
     <title>Document</title>
 </head>
 <body>
     
 </body>
 </html>
```

然后就可以开始写了。

##### <b>基本语法</b>

个人感觉，最快的上手方式就是将新的语法和老语法建立联系，所以这部分我会列表展示一下tailwind所谓的实用程序类分别和我们熟悉的css的哪些语句对应，大部分的对应还是直观的，第一部分只有基础的语句。下表中用N表示一个整数，相当于字号的意思，作用在长度上就是大小。

###### <b>常用css及对应tailwind</b>

这些就是基础的语法的迁移了，可以看到基本有这几个特点

- “-”连接
- 通过整数 N，或者scale 或者restriction 来从一系列事先约定的离散的值中间取值
- 存在缩写，例如padding-&gt;p, width-&gt;w
- 利用了辅助工具，所以有支持问题
- 迁移之后的名称和原来的比较接近（除了奇怪的leading和tracking，试了好久）
- 这里还不是全部的内容，flex、grid、transition的内容会放到后面一点

###### <b>元素显示形式和定位</b>

这块单出来是因为不涉及数值，和前一块感觉上还是不太一样

同样和原本的语法大差不差，试这块没用多久（乐

###### <b>其他文本处理</b>

其他从css <em>直接迁移</em> 来的文本处理语法写在这里

总之还是不太全，不过这个限制对设计来讲不是不可克服的

###### <b>flex、grid css和对应的tailwind</b>

基本上flex和grid的语句都有了，使用也是比较直观的，会flex和grid基本可以直接上手。

###### <b>transition css 和对应的tailwind</b>

tailwind对动画的支持相对就比较不行了，不过这也是因为动画实在有点自由，很难整理起来，结果就是，大部分关键帧动画还是得自己来做，tailwind多数时候只能用来做简单的变换。

###### <b>伪类支持</b>

tailwind支持了常用的伪类，而且使用非常方便直观，其基本格式和css的挺相似，假如说css中要用 `:hover` 伪类，我们会这样：

```css
.className:hover{
     ...
 }
```

在tailwind中我们就这样：

```html
<div class="hover:... "></div>
```

只需要把`...`替换成原css对应的tailwind类即可

还是列表来看

##### <b>组件化</b>

这一块会专注于解决复用代码的问题，不过思路也不仅限于对于现有的代码进行重整，还有一些<b>从无到有创建重复代码</b>的过程，毕竟tailwind的类非常细碎，并不是简单地说一个抽象成组件就可以解决复用问题的。tailwind实际上还认真地教了你怎么<b>避免</b>创建组件，用其他一些方式达到相同的效果。

总之，这块大概介绍这些内容：

- <b>Using editor and language features</b>
- <b>Extracting components and partials</b>
- <b>Extracting classes with @apply</b>

这些方法都有各自的使用场景，合起来就能包含大多数问题情景

###### <b>Using editor and language features</b>

<em>适用于重复的样式出现于单个文件中，或者在使用循环来创建元素的场景</em>

第一个方法：多光标编辑

在你的IDE，例如VS code里面通常有多光标的功能（去，我今天才知道

通过按住`alt`然后单击你可以获得多个光标，然后可以同时编辑（写或者删）多处，在单个文件且直接搜索不管用（且规模较小）的情况下这个方法就挺好用的。而且单从速度上去考虑，很多情况下这个反而是解决问题最快的方法，毕竟tailwind之后你的html迟早会拥挤不堪。😂

第二个方法：考虑一下循环

不用多说这也是一个常见的思路，在考虑提取组件之前思考一下有没有可能利用循环来实现相似元素的创建，不要忘了<b>伪类</b>允许你在同一个循环里稍微整点花的创建不同的样式。

这一条的使用需要一些实际项目的练习，有时候第一眼不那么明显的元素簇也是可以用循环实现的。还有，适时利用`map`来解决元素间的差异性。

###### <b>Extracting components and partials</b>

当重复元素在多文件多处出现而且挺大（或者复杂），那就没啥办法，提取组件吧。不过提取组件也就脱离了纯css的范畴，组件毕竟是 markup 和样式的组合。方法嘛就和一般的提取一致，具体看使用的框架（有的叫components 有的叫 partial），在这点上tailwind没有带来变化。

js函数也是可以用来返回组件（html段，不过因为tailwind的关系有样式）的，像这样

```js
function Notification({ imageUrl, imageAlt, title, message }) {
   return (
     <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
       <div className="shrink-0">
         <img className="h-12 w-12" src={imageUrl.src} alt={imageAlt}>
       </div>
       <div>
         <div className="text-xl font-medium text-black">{title}</div>
         <p className="text-slate-500">{message}</p>
       </div>
     </div>
   )
 }
```

###### <b>Extracting classes with @apply</b>

这里的`@apply`功能上相当于原生css的@extend，extend一大堆类的那种，来看一个例子

假如说我有一个纯样式复用的按钮，我可以抽象一个`btn`样式类，然后让html简单一些。

```html
<button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
   Save changes
 </button>
 
 <!-- After extracting a custom class -->
 <button class="btn-primary">
   Save changes
 </button>
```

相应的你需要去`input.css`  文件里注册这个类（记得不要去动`output.css`）

```css
@tailwind base;
 @tailwind components;
 @tailwind utilities;
 
 /<em>new below</em>/
 @layer components {
   .btn-primary {
     @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
   }
 }
```

<em>欸，这个我会，这不就是原来的css的写法吗，换了个语法而已。</em>

完全正确，而且这就是违反tailwind核心观念的写法，所以tailwind非常反对大量使用（更不要处处使用）这种抽象，原因就是你会回到旧有的css编写模式中，然后损失tailwind提供的优势。而且`@apply`其实就是内联实现的。

> 再来品鉴一次（
> If you start using `@apply` for everything, you are basically just writing CSS again and throwing away all of the workflow and maintainability advantages Tailwind gives you, for example:
> - <b>You have to think up class names all the time</b> — nothing will slow you down or drain your energy， like coming up with a class name for something that doesn’t deserve to be named.
> - <b>You have to jump between multiple files to make changes</b> — which is a way bigger workflow killer than you’d think before co-locating everything together.
> - <b>Changing styles is scarier</b> — CSS is global. Are you <em>sure</em> you can change the min-width value in that class without breaking something in another part of the site?
> - <b>Your CSS bundle will be bigger</b> — oof.

在抽象样式组件这件事上tailwind劝你再三考虑而后动，尤其是避免<b>过早抽象</b>。这也是为什么标准的tailwind工作流中组件化会在后半段。

##### <b>高级tailwind</b>

说是高级，其实只是 <em>不低级</em> 而已，相比前几块中原版css有迹可循的样式类，这一段会重点介绍一些tailwind特色的好用的类和好用的功能。

<em>上手教程不会面面俱到，本文之外的 tailwind的内容欢迎各位自行探索（补全？挨秽</em>

总之，我们教程的最后一节包含这些内容：

- tailwind实用类
- 媒体查询和响应式设计
- 个性化css
- 个性化配置
- 函数和指令

###### <b>tailwind实用类</b>

⭐分辨率相关类：

用于控制元素的分辨率，非常直观

⭐盒子大小的计算方式

第一种会把content区域缩小（`content.x=size.x-2`<em>border.x-2</em>`padding.x`）第二种不会(`box.x=content.x+2`<em>border.x+2</em>`padding.x`)

<em>这个结合伪类可以做很好玩的效果</em>

⭐物体填充（？疑翻

这个很方便，可以直观地控制填充物体（比如一张照片）的大小，

> contain的效果是 Resize an element’s content to stay contained within its container
> cover的效果是Resize an element’s content to cover its container
> fill的效果是Stretch an element’s content to fit its container
> none的效果是Display an element’s content at its original size ignoring the container size
> scale-down的效果是Display an element’s content at its original size but scale it down to fit its container if necessary

<em>同样结合媒体查询或者是伪类可以做出很有趣的效果</em>

⭐物体位置

方便的控制物体的位置，其原理是`object-{xx}`会把父元素的{xx}位置和子元素的{xx}位置重叠。利用这种特性可以轻松做到图片分割等等有趣的视觉效果

⭐渐变颜色

首先是渐变方向的选择：

意思很直观就是指定终点，起点自动就是终点的对面

然后是选择渐变的颜色，注意需要指定from和to

结合起来之后就可以显示渐变的颜色了,注意via的颜色就是中间的颜色。没有to的时候自动渐变到透明，但是没有from不会。

⭐跨元素的颜色显示

> 关于这个功能，原话是这么描述的：
> control whether properties like background, border, border-image, box-shadow, clip-page, margin, and padding should be rendered as if the element were one continuous fragment, or distinct blocks

效果就像是这样：

![](/assets/D5uWbRUxqo2AVnxIjiycUGRQnod.png)

示例代码：

```html
<span class="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
   Hello<br>
   World
 </span>
 <span class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
   Hello<br>
   World
 </span>
```

⭐背景附着性（渣翻x

这个我觉得挺实用的，效果如下

> fixed ：fix the background image relative to the viewport（感官上就是背景不会动）
> local  :  scroll the background image with the container and the viewport(在视窗内跟着动)
> scroll  : scroll the background image with the viewport, but not with the container(视窗内跟着动，外面不跟着动)

⭐混合渲染模式

也就是处理两个（多个）色块重叠的时候🍌区域的颜色。

注意，mix-blend一般的结果是和<b>所有</b>重叠的元素（背景）进行运算，如果需要限定运算的对象，需要使用isolation（见下面一块）他们的效果都写在脸上了，真正的规则就不要记忆了，使用的时候都试试选好看的（

![](/assets/McQibFijCoiLFrxIQLQcF8HTnkb.png)

⭐独立

`isolate`和`isolation-auto`实用程序可以控制元素是否应显式创建新的堆叠上下文。这点可以用于创建mix-blend的群组，效果如下：

![](/assets/L8TDbgOkCoRNtuxJ8LQcC8Q9nQk.png)

父级元素没有isolate时：（消失的部分是和背景做了mix-blend-lighter然后就没了）

父级元素设置isolate：

![](/assets/XrypbXlbRoDZtPxHmfycY0qlntb.png)

⭐背景渲染模式

控制背景图和背景颜色的渲染模式，和mix-blend很类似

利用好<b>渐变</b> <b>定位</b> 和<b>背景渲染模式</b>的功能，我们就可以轻松做到这种很cool很高级的图片

![](/assets/IRsJbkxAKoJUYNx5Zl6c8wlsnVg.png)

而且挺商业的（笑

⭐滤镜

有一个我很喜欢的内容不过出于1、原生css也有，2、种类太多列举占位太大的考虑这里就不放出全部内容了。使用方法和原版基本相同

<i>功能大概有这些：</i><em>blur brightness contrast drop-shadow gray-scale hue-rotate invert saturate sepia 及对应的 backdrop版本</em>

⭐更多的交互效果设置类

tailwind还提供了非常多的交互效果控制的类，用于擦除默认的交互效果或者提供一些好用的功能，东西同样很多这里列举几个我觉得很有意思的（完整的总可以从官网找到，链接见文末）

<em>控制checkbox的颜色</em>

<em>文本框获得焦点时的颜色</em>（是的，我知道这很简单，但是谁能拒绝粉色的输入框呢）

<em>滚动后自动吸附</em>

效果就是不能想停哪就停哪，始终会显示两张完整图片。

<em>只能全选（或者选不中）的文本</em>

图略

<em>用预告的方式优化</em>

will-{xx}相当于预告将会在xx上发生变化，方便优化。

###### <b>媒体查询和响应式设计</b>

tailwind的媒体查询（media query）相当好用，语法简单，效果直观。使用时的语法为`{breakpoint-prefix}:utility class/any other class` ,对应的效果就是在一定的区间内采用某种样式，区间改变样式也随之改变。

前缀列表如下：

这些查询是以breaking-point的方式运作的，也就是说，`sm:xxx` ,意味着`xxx`样式会在屏幕宽度超过`sm` 对应宽度后生效。

<em>这同时意味着，你的</em><b>无前缀</b><em>的样式其实对应的是</em><b>最小</b><em>的屏幕</em>

所以tailwind的响应式布局被称为`mobile first` ,移动端优先。

由于符合大小条件之后样式是始终生效的，所以大屏幕往往会堆起来很多效果（`>lg 时 sm,md,lg的样式同时生效`），这样不方便管理 ,可以使用`max-prefix:xxx`的语法来解决这个问题。

这样就始终只有一类样式生效。

这两种前缀还可以叠用，不过这样最多瞄准一个宽度值（也有可能啥也没瞄到），举个例子：

```html
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
//只瞄准一个breakingpoint
```

这块的最后介绍一下怎么自定义breaking-point，第一种方法是配置`theme`：

```js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}js
```

这会在个性化配置里里面再次讲到，

第二种方法是使用任意值语法，注意，这破坏了tailwind的理念。

所谓任意值语法（Arbitrary value），就像这样

```html
<div class="min-[320px]:text-center max-[600px]:bg-sky-300">
   <!-- ... -->
 </div>
```

用中括号括起任意数值，就可以生成相应语句了，这种方法对其他很多功能类也是生效的，会在个性化css再次看到。

###### <b>个性化css和配置</b>

想也知道tailwind框架没法解决你所有的问题，当出现这种情况的时候就必须使用个性化的功能，不过tailwind由于是底向上的，所以自定义起来非常方便。我们主要会介绍：

- 自定义`design tokens`
- 如何脱离tailwind的一些约束
- 添加自定义的css
- 使用插件

⭐自定义主题

你已经见过一次了，tailwind可以在配置的js文件里以“主题”的形式导入个性化内容，比如

```js
module.exports = {
   theme: {
     screens: {
       sm: '480px',
       md: '768px',
       lg: '976px',
       xl: '1440px',
     },
     colors: {
       'blue': '#1fb6ff',
       'pink': '#ff49db',
       'orange': '#ff7849',
       'green': '#13ce66',
       'gray-dark': '#273444',
       'gray': '#8492a6',
       'gray-light': '#d3dce6',
     },
     fontFamily: {
       sans: ['Graphik', 'sans-serif'],
       serif: ['Merriweather', 'serif'],
     },
     extend: {
       spacing: {
         '128': '32rem',
         '144': '36rem',
       },
       borderRadius: {
         '4xl': '2rem',
       }
     }
   }
 }
```

 详细的介绍还是见官方文档，这边尽量简单地说明一下一些要点（不如说语法实在直观）

首先注意`theme`底下一层的命名，`screens 对应着breaking-point相关内容，colors自然对应颜色，spacing对应空白，等等（关于所有这些关键字，官网有一个很大的表，这里就不抄了）`，这是最基本的用法，你还可以使用<em>核心插件（core plugins）</em> 和<em>extend</em> 两种功能，

举个例子：

```js
module.exports = {
   theme: {
     borderRadius: {
       'none': '0',
       'sm': '.125rem',
       DEFAULT: '.25rem',
       'lg': '.5rem',
       'full': '9999px',
     },
   }
 }
```

这属于使用core plugins，使用了 `borderRadius` 关键字，以及其可以选择的值。其效果是产生下面的可用类。

```css
.rounded-none { border-radius: 0 }
 .rounded-sm   { border-radius: .125rem }
 .rounded      { border-radius: .25rem }
 .rounded-lg   { border-radius: .5rem }
 .rounded-full { border-radius: 9999px }
```

extend也很好懂，就是用来扩展已有功能的，比如给屏幕新增一个breakingpoint：

```js
module.exports = {
   theme: {
     extend: {
       // Adds a new breakpoint in addition to the default breakpoints
       screens: {
         '3xl': '1600px',
       }
     }
   }
 }
```

当然还可以override，比如来指定一些opacity的可选值：

```js
module.exports = {
   theme: {
     // Replaces all of the default opacity values
     opacity: {
       '0': '0',
       '20': '0.2',
       '40': '0.4',
       '60': '0.6',
       '80': '0.8',
       '100': '1',
     }
   }
 }
```

效果就是tailwind不再自动（以其默认值）生成相应的css，起到了override的效果，当然你也不用指定每个值，没有被特别指明的可选值的css会按照默认的来生成。

你还可以引用自己所设的值，像这样利用函数：

```js
module.exports = {
   theme: {
     spacing: {
       // ...
     },
     backgroundSize: ({ theme }) => ({
       auto: 'auto',
       cover: 'cover',
       contain: 'contain',
       ...theme('spacing')
     })
   }
 }
```

`theme()`函数会从配置中查找你所定义的值（或者是框架的默认的值），这种查找是递归的。注意，这种函数的方法不能对单个值生效，而是作用在`top-level theme keys（比如screens）`上面。

最后，注意默认主题对象是开放的，你可以require它然后随意使用。

```js
const defaultTheme = require('tailwindcss/defaultTheme')
 
 module.exports = {
   theme: {
     extend: {
       fontFamily: {
         sans: [
           'Lato',
           ...defaultTheme.fontFamily.sans,
         ]
       }
     }
   }
 }
```

⭐使用任意值

虽然说大多数时候tailwind的token就够用了，但是还是有一些时候我们需要可选值以外的值，于是tailwind提供了任意值的能力，即便这是有违其基本理念的。

方法之前也见过了就是用中括号括起来，我们就用一个代码块结束吧

```html
<div class="top-[117px]" ></div>
 <!--基础用法 -->
 <div class="lg:top-[117px]" ></div>
 <!--仍然可以配合伪类或者断点使用 -->
 <div class="bg-[#bada55] before:content['Festivus']" ></div>
 <!--支持所有框架里的功能类，还支持伪元素 -->
 <div class="grid grid-cols-[fit-content(theme(spacing.32))]" ></div>
 <!--你甚至可以使用theme（）函数 -->
 <div class="[mask-type:luminance]" ></div>
 <!--使用框架外的css语句，把整个语句括起来当成类，仍然支持断点，等等-->
 <div class="lg:[&:nth-child(3)]:hover:underline" ></div>
 <!--支持arbitrary-variants -->
 
 <div class="grid grid-cols-[1fr_500px_2fr]" ></div>
 <!--把空格换成下划线，tailwind会在build的过程中完成转换 -->
 <div class="bg-[url('/what_a_rush.png')]" ></div>
 <!--对于特殊的情景（空格不会出现的时候），tailwind仍然将下划线解释为下划线，比如URL中 -->
 <div class="before:content-['hello\_world']" ></div>
 <!--不特殊的情境中，用转义符号来保留下划线 -->
 
 <div class="text-[length:var(--my-var)]" ></div>
 <!--当使用不确定的变量的时候要用确定的类名提示tailwind -->
```

⭐自定义css

想找个地方写写css？你有两种方案。第一个，直接往`input.css` 里写

```css
@tailwind base;
 @tailwind components;
 @tailwind utilities;
 
 .my-custom-style {
   /* ... */
 }
```

第二种，利用`@layer`往tailwind的`base`, `components`, 和 `utilities` 层里面添加。这样的好处是tailwind会自动处理样式的覆盖关系（和类的次序无关了），而且包括在layer中的类支持伪类和媒体查询，三个层级的优先度如下：

> - The `base` layer is for things like reset rules or default styles applied to plain HTML elements.
> - The `components` layer is for class-based styles that you want to be able to override with utilities.
> - The `utilities` layer is for small, single-purpose classes that should always take precedence over any other styles.

推荐使用第二种。

代码例子：

```css
@layer base {
   h1 {
     @apply text-2xl;
   }
   h2 {
     @apply text-xl;
   }
   /* ... <em>/
 }
 
 @layer components {
   .card {
     background-color: theme('colors.white');
     border-radius: theme('borderRadius.lg');
     padding: theme('spacing.6');
     box-shadow: theme('boxShadow.xl');
   }
</em><em>   /</em>你可以从theme里面获取样式的值<em>/
   .select2-dropdown {
     @apply rounded-b-lg shadow-md;
   }
   .select2-search {
     @apply border border-gray-300 rounded;
   }
   .select2-results__group {
     @apply text-lg font-bold text-gray-900;
   }
</em><em>   /</em>利用@apply构建组件，减少（看到的）代码量，还有不要上头*/
 }
 
 @layer utilities {
   .content-auto {
     content-visibility: auto;
   }
 }
```

最后注意`@layer`中的内容假如你不用，最终就不会生成到css文件里去，但是裸写是一定会写到最终的css文件里去的的。

⭐使用插件

插件的意义在于利用js来添加样式，这使得自由性和功能性都强大了许多，官方的教程太长了，这里挑关键的说说。

首先是如何使用插件：

```js
const plugin = require('tailwindcss/plugin')
 
 module.exports = {
   plugins: [
     plugin(function({ addUtilities, addComponents, e, config }) {
       // Add your custom styles here
     }),
   ]
 }
```

可以看到插件是在js配置文件里添加的，具体的样式会在`plugins`数组里面注册。匿名函数部分传入助手函数，他们的功能如下：

使用例：

```js
module.exports = {
   plugins: [
     plugin(function({ addUtilities }) {
       addUtilities({
         '.content-auto': {
           'content-visibility': 'auto',
         },
         '.content-hidden': {
           'content-visibility': 'hidden',
         },
         '.content-visible': {
           'content-visibility': 'visible',
         },
       })
     })
   ]
 }
```

官方插件：

```js
module.exports = {
   // ...
   plugins: [
     require('@tailwindcss/typography'),
     require('@tailwindcss/forms'),
     require('@tailwindcss/line-clamp'),
     require('@tailwindcss/aspect-ratio'),
   ]
 }
```

自然都是好东西，内容多，详情参看官方文档。

###### <b>函数和指令</b>

最后一节介绍一下tailwind特色的`Directive 和 functions`。

⭐`@ rule`

除了之前零零碎碎碰到的一些@，tailwind还有几个核心的@ rule（也就是指令），如下：

⭐⭐`@tailwind`

```css
/**
  * This injects Tailwind's base styles and any base styles registered by
  * plugins.
  <em>/
 @tailwind base;
 
</em><em> /</em>*
  * This injects Tailwind's component classes and any component classes
  * registered by plugins.
  <em>/
 @tailwind components;
 
</em><em> /</em>*
  * This injects Tailwind's utility classes and any utility classes registered
  * by plugins.
  <em>/
 @tailwind utilities;
 
</em><em> /</em>*
  * Use this directive to control where Tailwind injects the hover, focus,
  * responsive, dark mode, and other variants of each class.
  *
  * If omitted, Tailwind will append these classes to the very end of
  * your stylesheet by default.
  */
 @tailwind variants;
```

⭐⭐`@layer`

```css
@tailwind base;
 @tailwind components;
 @tailwind utilities;
 
 @layer base {
   h1 {
     @apply text-2xl;
   }
   h2 {
     @apply text-xl;
   }
 }
 
 @layer components {
   .btn-blue {
     @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
   }
 }
 
 @layer utilities {
   .filter-none {
     filter: none;
   }
   .filter-grayscale {
     filter: grayscale(100%);
   }
 }
```

具体的作用前面介绍过了

⭐⭐`@apply`

```css
.select2-dropdown {
   @apply rounded-b-lg shadow-md;
 }
 .select2-search {
   @apply border border-gray-300 rounded;
 }
 .select2-results__group {
   @apply text-lg font-bold text-gray-900;
 }
 .btn {
   @apply font-bold py-2 px-4 rounded !important;
 }
```

和直接使用token的一个不同是apply上去的属性会去掉`!important`，除非你补一个 （一般的tailwind类在输出的时候末尾都会加上`!important`）

由于tailwind的运行方式，在使用Vue或者Svelte之类的（pre-component）框架时，在&lt;style&gt; 里面@apply 一个定义于css文件的样式会报错，这种时候要改为去js文件里使用插件的形式添加组件：

```js
const plugin = require('tailwindcss/plugin')
 
 module.exports = {
   // ...
   plugins: [
     plugin(function ({ addComponents, theme }) {
       addComponents({
         '.card': {
           backgroundColor: theme('colors.white'),
           borderRadius: theme('borderRadius.lg'),
           padding: theme('spacing.6'),
           boxShadow: theme('boxShadow.xl'),
         }
       })
     })
   ]
 }
```

⭐⭐`@config`

告诉tailwind，某个css文件处理时应该使用什么配置，例如：

```css
@config "./tailwind.site.config.js";
 
 @tailwind base;
 @tailwind components;
 @tailwind utilities;
```

⭐函数

内容很少

⭐⭐`theme()`

之前也见到过了，theme（）函数用于从css文件获取tailwind样式。

```css
.btn-blue {
   background-color: theme(colors.blue.500);
 }
 
 .btn-blue {
   background-color: theme(colors.blue.500 / 75%);
 }
```

注意要把`-`改成`.`来访问嵌套的样式。

⭐⭐`screen()`

功能上用于媒体查询，screen（）函数会将tailwind断点转化为对应的css语句，这使得你可以在查询时直接使用tailwind语法，也是一个处于使用方便产生的函数。

```css
@media screen(sm) {
   /* ... <em>/
 }
 
</em><em> /</em> ↑ equal to ↓ <em>/
 
 @media (min-width: 640px) {
</em><em>   /</em> ... */
 }
```

#### <b>参考文献和推荐资料</b>

<b>tailwind Cheat Sheet：</b>  [https://nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet)

<b>tailwind作者对css模式的讨论：</b>[https://adamwathan.me/css-utility-classes-and-separation-of-concerns/](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

<b>tailwind官方学习文档：</b> [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

