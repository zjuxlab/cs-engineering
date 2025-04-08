---
title: Sass
slug: Sass
sidebar_position: 1
---


# Sass

Author:徐旻昶

# sass概述与本文

本文参考了主要是但不限于sass中文网的内容进行编写。

<<<<<<< HEAD
2006年，当Web开发者在与CSS的局限性搏斗时，Hampton Catlin发明了一种名为Sass（Syntactically Awesome Style Sheets）的预处理器。当时开发者面临的典型困境：

```
/* 传统CSS的重复劳动 */
.navbar .item { color: #337ab7; }
.navbar .item.active { color: #286090; }
.navbar .item:hover { color: #23527c; }

.sidebar .item { color: #337ab7; }
.sidebar .item.active { color: #286090; }
.sidebar .item:hover { color: #23527c; }
```

这种模式导致：

- <b>颜色值重复</b>：修改主色需要全局搜索替换
- <b>选择器嵌套缺失</b>：难以体现DOM结构关系
- <b>逻辑能力为零</b>：无法进行条件判断或循环

Sass的出现如同给CSS装上了涡轮增压引擎，通过<b>变量</b>、<b>嵌套</b>、<b>混入</b>等特性，将CSS从简单的声明式语言升级为具备工程化能力的样式编程语言。

## 为什么现代开发仍需Sass？

尽管现代CSS已经支持变量等特性，Sass仍具有不可替代的优势：

1. <b>更强大的逻辑处理</b>
    - CSS自定义属性无法实现条件逻辑

2. <b>成熟的模块化系统</b>
    - `@use`和`@forward`比CSS的`@import`更高效

3. <b>企业级工具链</b>
    - 与Webpack、Gulp等构建工具深度集成
    - 稳定的源码映射(source map)支持

4. <b>设计系统支持</b>
    - Bootstrap v5、Material UI等流行框架仍基于Sass构建

从简单的样式预处理器到完整的设计工程化工具，Sass已经成长为前端开发生态中不可或缺的基础设施。它如同CSS的「TypeScript」——在保留原有能力的同时，添加了类型系统（变量）、模块系统、高级抽象（mixin）等工程化特性。在大型项目、设计系统、主题化方案等场景下，Sass仍然是提升样式开发效率的首选武器。正如CSS工作组成员Miriam Suzanne所说："Sass教会了CSS如何长大"——它的许多创新理念已经并正在继续影响CSS标准的演进方向。

总之，sass 是一个用来给CSS添加拓展强化的辅助工具，增加了变量、嵌套、混合、导入等高级功能，让CSS拥有更多的功能、更加优雅。
=======
sass 是一个用来给CSS添加拓展强化的辅助工具，增加了变量、嵌套、混合、导入等高级功能，让CSS拥有更多的功能、更加优雅。
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29

# sass的安装使用

## 安装ruby

`sass`是基于`Ruby`语言开发而成的，`Ruby`在mac下是自带的而windows上没有，所以在windows系统上我们需要先安装Ruby。（下面是Ruby的下载官网）

下载后安装包注意安装过程中勾选`Add Ruby executables to your PATH`添加到系统环境变量就好了：

![](/assets/K9UpbRweNoCFMexmUnMcCWxOnBe.png)

如我们之前测试安装是否成功时一样，在cmd中输入`ruby -v`即可查看是否安装成功了。安装成功会显示ruby的安装版本。

![](/assets/FHIGbo82Zo39GCxRlGfcUEJXnid.png)

如果遇到了奇怪的证书错误或者安装错误可以详细查看中文文档，这里还是以使用为主（

## 安装sass和compass库

`Ruby`自带一个叫做`RubyGems`的系统，用来安装基于`Ruby`的软件。我们可以使用这个系统来 轻松地安装`Sass`和`Compass`。要安装最新版本的`Sass`和`Compass`，你需要输入下面的命令：

```html
gem install sass
gem install compass
```

同样地，输入`sass -v` / `compass -v`可以查看是否安装成功了。

![](/assets/F771bpJgMonmAIxEJW9cQUVVnKc.png)

## 编译

sass可以用很多种方式进行编译，在这里只介绍可能比较贴近大家的两种：命令行和VScode拓展。

sass的编译其实就是将我们简写的sass语句转换为css语句的过程。

- 命令行根据我们的编译配置选项中排版格式的不同，编译出来的css文件格式也是不同的，

```html
sass input.scss output.css
//仅进行单次的编译

sass --watch input.scss:output.css
//监听编译，可以一直监控编译，只要有保存更改就会立即编译

sass --watch ../sass:.../...
//监听编译..文件目录下的所有sass文件，转化到.../...目录下的css文件

sass --watch input.scss:output.css --style compact
//在黄色字块上改变排版格式，如nested、expanded、compact、compressed

sass --watch input.scss:output.css --sourcemap
//编译添加调试map

sass --watch input.scss:output.css --debug-info
//开启debug信息
```

- 在vscode中寻找插件Live Sass Compiler或easy sass安装，并到 setting.json中进行配置(本人使用的是Easy sass)

![](/assets/BvE2bI1LXo4SEkxNR4hcRAGCnlf.png)

![](/assets/OP92b00tBoHMRPxHxk5cwxwBnWg.png)

在settings.json设置如下：

```html
"easysass.formats": [
    {
      "format": "expanded",
      "extension": ".css"
    },  //设置编译样式expanded
    {
      "format": "compressed",
      "extension": ".min.css"
    }   //设置编译样式compressed
  ],
  // css文件的存放目录，该路径是相对路径，相对于vscode的工作目录
  "easysass.targetDir": "./css/"
```

随后我们写sass文件并保存的同时，两个css文件就会自己在css文件夹中生成了！

![](/assets/P35rbZwElot4dAxXMCucPCalnve.png)

PS：如果有不能出现的情况，注意`targetDir`的设置是否是<b>相对于当前VScode工作目录</b>的路径设置！

# Sass对CSS的功能拓展

在讲变量之前，为了让大家对sass的各种域的范围有所了解，我决定先讲讲CSS的功能拓展，即<b>嵌套和父选择器</b>的内容。

## Nested Rules

- sass的嵌套规则允许将一套CSS样式嵌套进另一套样式中。外层的选择器是内层样式的父选择器。从例子可以简单理解：

```scss
#parent .anything {
  width: 100px;

  .child {
    color: red;

    .childschild {
      color: red;
    }
  }
}
```

编译可以得到这样的结果

![](/assets/KEnybntExoAvMCxMEDGcItN8nKg.png)

嵌套规则可以让同样选择器的编写不再繁琐且可以复用。子规则将外面的父选择器挨个嵌套使得选择器不会重复被编写。

- 同样地，我们还可以对属性进行嵌套，让某些属性可以不用那么反复地被编写。属性嵌套的意思就是将具有相同前缀的属性简写在前缀的冒号后边，前缀一如既往地可以填写对应的属性值。例如：

```scss
.parent {
  background: blue {
    size: 300px 300px;
    repeat: none;
  }
}
```

编译得到如下结果：

![](/assets/K7D9bPjpfo3qCSxAk4tci6eInob.png)

### Referencing Parent Selectors

父选择器用`&`符号表示。父选择器是我们在使用嵌套规则时可能会需要用到父选择器本身做一些操作，此时使用`&`来指代父选择器就非常方便。例如：

```scss
.parent 
{
  background-color: green;
  
  .child 
  {
    background-color: blue;
    &:hover 
    {
      background-color: yellow;
    }  //.child:hover
    &-another 
    {
      background-color: red;
    }  //.child-another
  }
  
}
```

编译的结果会将父选择器，在例子中是`.child`代入每个`&`当中。

![](/assets/K44QbIerOorT68xYO6Yc2oUtnTe.png)

注意：

1. `&`必须作为选择器的第一个字符，只有在符号的后面才可以跟随后缀生成复合的选择器。
2. 当父选择器含有不合适的后缀时，Sass 将会报错。

# SassScript常量 / 变量

ok想了想接下来应该和其他语言一样先从变量的介绍入手。Sass提供了在制定css规则时灵活地使用变量的可能。

## Interactive Shell

在介绍变量和语法之前，我们可以在terminal中输入`sass -i`来启动Interactive Shell对变量在sass中计算的结果进行测试，比如以下：

![](/assets/MxLcbfc72orH2qxDpSycBSPCnfv.png)

## 变量

sass的变量以`$`为开头标志，赋值也和css一样用:标注即可。

```scss
$variable:5px;
```

- 这个变量同样有局部和全局之分。局部变量只在{}之间的范围内起作用，而全局变量足以影响整个CSS代码块中的所有地方，这个很好理解。

需要说明的是，我们可以给局部变量加上`!global`标志让这个变量变成全局作用域

```scss
.zone_one {
  $variable: 5px;
  width: $variable;
}

.zone_two {
  width: $variable;
}
```

上述代码中`zone_two`的`variable`变量并未定义，因此sass会给出报错。

![](/assets/LRW6bp8C5oWsJ8x31LRcmaDLnxf.png)

正确的做法是在`zone_one`的`variable`变量定义之后加上`!global`。

```scss
.zone_one {
  $variable: 5px !global;
  width: $variable;
}
```

- 与其它语言类似的，越小（越近）的局部变量定义就更容易影响到当前层次的值选择。

```scss
$variable: 7;

.zone_one {
  $variable: 5;
  width: $variable;

  .child {
    width: $variable;
  }
}

.zone_two {
  width: $variable;
}
```

编译结果如下。`zone_one`中的`variable`定义对自己及自己的子规则优先级高于全局变量。

![](/assets/Wf71bi1LroeBtPxCHPQcBXHWntb.png)

## 常量 / 变量数据类型及其运算

由于CSS服务于样式的特性，sass的数据类型大概可以列为以下几类，其中不少是同学们比较熟悉的，我们尽量只展开可能不熟悉的详细讲。

1. Number

数字类型频繁出现在各类长度、层级、大小等数值的定义上，想必大家都不陌生。sass的数字类型拥有各式各样的单位，当然您也可以选择不带单位。

- 必要的时候，sass会在数字运算时帮您进行单位的转换，优先转换为最先出现的单位

![](/assets/DqNibF51No85j1xpYrhczwXJnQb.png)

- 特殊地，不带单位的数字会优先归类于带单位的数字，否则还是保留不带单位

![](/assets/PxHYb6ExFoVDa2xcbUtc6ZFLn0d.png)

- sass支持`+ - * / %`这些基础运算，当然`<=`和`==`之类的当然也支持。这里只挑比较特殊的除法运算说一说事儿

     您应该还有印象，在CSS规则设定时某些属性允许同时设定多个不同的值，而不同的值可以用空格或`/`符号隔开，但是这个符号很不巧地和我们的除法符号碰撞了。因此sass在除法符号和分隔符的采用条件上作了一些设定，规则如下：
1. 计算式中的某一部分是变量，或是函数的返回值时，看作除法。（若希望同时使用分隔符和变量，需要使用插值符号`#{}`，可见例）
2. 表达式被括号包裹，看作除法。
3. 计算式中拥有其他计算符号，看作除法。
4. 其他情况下，看作分隔符号。
下面举一个例子
```scss
p {
  font: 10px/8px;                              // d，其他情况，是两个属性值的分隔符号
  $variable: 1000px;
  width: $variable/2;                          // a，计算式中某一部分是变量
  background-size: #{$variable}/#{$variable}； // a，使用了插值符号，看作分隔符
  width: round(1.5)/2;                         // a，计算式中某一部分是函数返回值
  height: (500px/2);                           // b，被括号包裹
  margin-left: 5px + 8px/2px;                  // c，计算式中拥有加号
}
```

编译结果如下

![](/assets/GxXAbS4LooqKgXx8UaNcYn28nDe.png)

1. String

sass的字符串分为<u>有引号字符串</u>和<u>无引号字符串</u>两种，他们的区别从字面意思就可以看出来。除了在插值处理`#{}`后引号会被去掉，sass的任何编译处理都不会使得引号发生变化。

- 一般的字符串运算使用+号作为连接符

![](/assets/O5XjbLU7KoxXsWx6wBsch4R8nbf.png)

不一般地，当有一些操作数为数字且出现在最前面时，sass会先处理完数字运算再处理字符串运算；但是如果前面已经有字符串出现过，后面的运算会一律考虑为字符串运算。这个也是比较好理解的，<del>大家把自己的脑子想成计算机，一步一步作操作就好</del>。

![](/assets/Dnm5b0eoioJeXyxxebMcQUyWnrd.png)

上面的最后一条也证明了运算的优先级在字符串运算中也是适用的。当然，sass不支持其他运算符号的字符串运算。

- 那如果希望在字符串中间作值的运算怎么办呢？我们当然可以加括号

![](/assets/RlbfbadH9oGeoIxgPL4cJToanvb.png)

当然在css规则编写时，更优雅地可以使用我们地老朋友插值符号。
```scss
p {
  content: today is #{3 + 4} day after that day;
}
```

编译结果会将3+4优先计算。在这里放变量当然也是可以的。

![](/assets/DiahbODZWom4YsxdHyscE1manWg.png)

- 字符串的加法同样遵循“结果的符号与最先出现的操作数相同”的准则。即：`有引号+无引号=有引号`；`无引号+有引号=无引号`。
- 除了运算之外，sass提供了许多字符串函数，字符串的处理也可以通过字符串函数操作解决。字符串函数可以使用在css规则冒号之后。

![](/assets/WZmxbMpd3o2JBExjzaFc8Js9nXc.png)

摘录自：

含义比较好懂，想深入了解查看的同学可自行浏览。

1. Color

我们都清楚颜色分三原色表示，每个原色有0-255的选择。所以颜色变量的运算操作以每个原色分别相加完成，例如：

```scss
p {
    color:#112233 + #543210;
    //red：  #11 + #54 = #65
    //green：#22 + #32 = #54
    //blue： #33 + #10 = #43
}
```

编译结果为：

![](/assets/FG18bPmrRoabTex1lfScRvnYnje.png)

或者用这种写法看得更清楚：

```scss
p {
  color: rgb(17, 34, 51) + rgb(84, 50, 16);
}
```

将对应项相加，编译结果和上面的相同。

但是有时候我们会用`rgba(red, green, blue, alpha)`来表示颜色值，分别是三原色和一个0-1的图片透明度。如果要对这样的`rgba`进行运算，我们必须保证加法的两端拥有相同的`alpha`值才可以进行。否则我们需要借助`color function`来改变透明度值再运算。

![](/assets/G9djbP4G1ofz4fxwTqacyizrnVh.png)

1. Boolean

就跟我们熟悉的那样，and or not == ！=，8多讲啦

1. List

sass中的list只作用于某个属性冒号后面的多个属性值，比如我们经常看到的`border:solid 2px blue`中，冒号后面的就被看成是一种数组。中文文档中给出的说明是CSS规则中<u>通过空格或者逗号分隔的一系列的值</u>。每个单个的值也是单值数组，数组可以包含子数组，用逗号隔开。

![](/assets/ER3BbAatOoQpMWxLB95cHYrnnEc.png)

数组本身没有什么运算操作或者作用，更多地是用list function数组函数进行控制。同样函数也是比较易懂的，大家可以参考网址或官方文档了解。

![](/assets/J9Bxb4N0vomB6ixNl6ucn2r7nYg.png)

1. Map

sass中的map同样是用一对对键值对来存储值的数据结构，键值对的集合用（）包裹成map，键加双引号，值跟在冒号后面，用逗号隔开。键和值可以是任意sass的数据类型，通过键只能唯一地找到一个值，这些都和我们熟悉地定义一样。

比如定义一个`font-sizes`变量如下：`$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)`，我们可以用相应的函数取出其中的值方面存储和操作。

map同样需要很多的map-function来帮助他发挥完整的作用。

![](/assets/TAYpb9ryioH2w4xRG1Jcq4lfnMe.png)

1. Null

空！

## 插值符号

顺便总结一下`#{}`插值符号的作用：

1. 在除法中保留除法符号作为分隔符。
2. 在字符串中保留数值的计算作用。
3. 在选择器或属性名中作为变量插入。

## 函数

我们在上面的介绍中已经引入不少函数了。函数的参数插入可以通过`$形参：数值`的方式插入。Sass有很多的函数，如果大家想了解sass的所有函数，可以自行查看官方文档。

## 变量定义 `!default`

可以在变量的结尾添加 `!default` 给一个未通过 `!default` 声明赋值的变量赋值。

这句话的意思是，如果一个变量已经被正常的定义过了且拥有非null的值，那么变量的使用就用该非null的值；如果一个变量定义了还没被赋值（null），那么 `!default` 定义就会让这个变量先拥有 `!default` 定义的值。例如：

```scss
$variable1: "非空赋值";
$variable1: "好像是空的" !default;
$variable2: null;
$variable2: "好像是空的" !default;
$variable3: null;
$variable3: "好像是空的" !default;

.parent {
  $variable3: "后来赋值";
  content-1: $variable1;
  content-2: $variable2;
  content-3: $variable3;
}
```

编译结果如下。变量1初始定义赋值非空，采用该非空的值；变量2初始定义时未被赋值，直到使用时也是null，采用 `!default` 定义的值；变量3初始定义时为null，但后来非空了，采用非空的值。

![](/assets/FEg7bwB1Mo6YVGxglf4cxhOsnLf.png)

# Sass At-rules

在CSS中我们用到了许多以@为开头的指令，称为at-rules，sass也沿用了这些使用方法并对其进行了扩展。如果您对at-rules在css中的本来用法还不是很清楚，可以查询网上资料或（if have）知识树的其他part，这里仅做简单介绍

## @import

sass的@import同样用于导入其他的文件，当然sass拓展的版本允许导入 .sass 或 .scss 的文件，被导入文件中的变量可以在引用文件中使用；编译会将所有被导入的文件内容编译在一个css文件中。

在没有后缀名的情况下，@import会寻找目录中文件名相同、后缀名为sass或scss的文件导入。对sass和scss文件的导入仅有文件名方式，使用html、url或.css都将导入css文件，作为正常的css中的import使用。

- 以下举一些sass中使用特例

```scss
@import "ex.scss";  //导入ex.scss
@import "ex";       //寻找ex.sass或ex.scss
@import "ex1.scss", "ex2.scss";  //同时导入

$variable: unqoute("ex3.css");
@import url("#{$family}");   //这种插值方法只能用于css的import功能，无法用于导入sass文件
```

- 如果您不希望sass/scss文件被编译成css导入，可以将文件命名为`_name.scss`的形式（使用时其名字仍然为name）。因此也不允许name.scss和_name.scss同时存在，后者会被忽略。
- 可以使用嵌套@import，即在CSS样式里面使用@import，会让文件下的css规则编译到指定选择器中，如:

```scss
//try.scss
.parent1 {
  @import "ex";
  width: 100px;
}

.parent2 {
  width: 200px;
}
```

```scss
//ex.scss
.ex1 {
  color: red;
}

.ex2 {
  color: blue;
}
```

将ex.scss导入到.parent1当中，编译结果会如下：

![](/assets/KexLb97z2oNIYrxDlUecSodLntc.png)

## @media

@media和在CSS中用法基本一样，用于查询媒体的某些条件以适用对应的css规则，只是增加在 CSS 规则中嵌套的功能。

如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。

例如（举个缝合各种特性的例子吧）：

```scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {   //使用变量代替@media的名称或值
  .sidebar {   //选择器
    @media (orientation: landscape) {   //@media可以嵌套在media中和选择器中
      width: 500px;
    }
  }
}
```

编译结果如下，`@media`自动脱出到选择器的最外层，且`@media`和`@media`嵌套使用and连接。

![](/assets/Pd4ebWznLoSFzqxp9oYc31bfndh.png)

## @extend

延伸`@extend`让我们可以随时在一个CSS选择器中调用另一个选择器下的所有规则，易于使用和维护。

- 先看最简单的例子：

```scss
.common {
  color: red;
  border: solid;
}

.sepcial {
  @extend .common;
  width: 100px;
}
```

编译结果如下，.common的规则延伸给了.sepcial，也就是原先需要使用`class=".common .sepcial"`的地方现在只需要`.sepcial`就可以完成，而`.sepcial`自己独特的属性也可以很方便地设置，更易于我们编写维护。

![](/assets/DlhHbLjRxoQuhCxY1OUc79kmnc3.png)

- 所有其他的选择器也可以通过类似的方式延伸。
- 多次地`@extend`其他选择器是可以的，后延伸的选择器在相同属性值的冲突中有更高的优先级

```scss
.common1 {
  color: red;
  border: solid;
}

.common2 {
  color: blue;
  border: solid green;
}

.sepcial {
  @extend .common1;
  @extend .common2;
  width: 100px;
}
```

.special先延伸了common1的属性，然后是common2的，编译的出结果也可以看到2在下面，优先级更高；不冲突的属性将全部包含

![](/assets/AgE0bVjdAoiQdlxRw1RcYnncnBg.png)

- 延伸将会把所有的属性继承到现在的选择器中，当然也包括延伸的选择器中@extend其他选择器的内容

```scss
.common1 {
  color: red;
  border: solid;
}

.common2 {
  @extend .common1;
  background: yellow;
}

.sepcial {
  @extend .common2;
  width: 100px;    //sepcial将会继承1和2的所有属性！
}
```

- 嵌套选择器的属性和子选择器也会反映到延伸中。如果@extend的对象选择器中嵌套了子选择器，那么子选择器和其下的属性也会在编译中被列出
- 存在某种样式只用于@extend使用而不希望被html元素引用的情况，可以加上占位符选择器`%`来使得它不会被编译。我们可以仅把它看作是一种选择器变量的代入。

```scss
%placehold {
  color: red;
}

.parent ex%placehold {
  color: blue;
}

.notice {
  @extend %placehold;
  background-color: green;
}
```

编译结果如下，`%placehold`变量都被`.notice`使用替换，其他选择器当然也可以延伸`%placehold`，这样会生成更多的CSS样式。

![](/assets/PlaDb5QbUoGJjpxrPIxcmQXVnle.png)

-  `!optional`用在`@extend`之后，可以防止比如选择器类型的冲突，产生新的选择器从而报错，详细可见官方文档7.3.7

## @at-root

@at-root可以让您在不希望嵌套发生的时候阻止嵌套的发生。最简单地说：

```scss
.common1 {
  color: red;

  @at-root .common2 {
    background-color: green;
  }
}
```

编译结果为无嵌套，不管有多少层都是无

![](/assets/UY2JbIDeooc5mfxk6oVcSvELnQf.png)

当然一些@-rules的嵌套需要使用`with或without`来达到你想要的标准。比如在`@media`中，我们使用`@at-root (without: media)`来去掉最外层的media。具体可见

## @debug and @warn

`@debug`和`@warn`都用于将SassScript表达式的值打印到标准错误输出流。

区别在于，warn可以通过`--quiet`命令行选项或`:quiet `Sass选项关闭；且warn会将样式表一起打印出来；而debug只是单纯地输出值。

# Sass Control Directives

sass有许多被称为控制指令的语句，其实就是我们所熟悉的if、else、for等，他们在sass中的应用可能会略有不同，但不会和原先你所知的有太大差别，因此简要说明。

## `@if` and `@else if` and `@else`

编译的结果会根据表达式的布尔值选择，选择布尔值为真的那一个。

分支指令的应用场景比较容易想到，我们可以通过一个变量操控某些选择器的样式，而不需要自己反复的进行复制调换。

```scss
$color: 红色;

p {
  @if $color ==红色 {
    color: red;
  }
  @else if $type ==蓝色 {
    color: blue;
  }
  @else if $type ==绿色 {
    color: green;
  }
  @else {
    color: black;
  }
}
```

当我们希望修改颜色的时候，改变`$color`的赋值即可。

![](/assets/XFnMbYmafodMt3xsRMlc9vwqnPh.png)

可能有人会觉得上面的分支表达式有点奇怪，当然，希望加上括号变成熟悉的样子也是可以的

```scss
p {
  @if $color ==红色 {
    color: red;
  }
}
```

## `@for`

`@for`指令在sass中的用途大多是输出类似的格式，避免了反复复制和修改的麻烦，且易于维护，看个例子就懂：

```scss
//形式1：输出1到3，不包括3的item样式
@for $i from 1 to 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

//形式2：输出1到3，包括3的item样式
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

上述两个形式的区别就是`to`和`through`的区别。此外，括号内的`$i`属于样式里的局部变量，当然可以随便使用

形式1的编译结果

![](/assets/WPrvbCCrsogKQxxwE4PcyHrwnQe.png)

形式2的编译结果

![](/assets/TERBb3Df3oG2mgxtSHUcXqyZnYb.png)

## `@each`

`@each`和`@for`有些类似，`@each`用于更直接地遍历一个数组（sass我们前面说的list）中的所有项，并应用下面的规则。这里的list可以是数组，也可以是多维数组或之前提到的map。

例：多维数组。普通数组即维度为1的简单情况，map和二维数组类似依次取键值对，不予举例

```scss
@each $i, $color in 
(1, red),
(2, blue),
(3, green),
(4, yellow) 
{
  .item-#{$i} {
    background-color: $color;
  }
}
```

将i和color依次代入可得编译结果：

![](/assets/LpXvbuwbzoT93pxf8eTcyJymnKb.png)

## `@while`

`@while`也是循环指令，重复输出样式直到表达式的布尔值为false，这个也好理解。

```scss
$i: 6;

@while $i >0 {
  .item-#{$i} {
    width: 2em * $i;
  }

  $i: $i - 2;
}
```

例子在每次while循环将变量i递减2，直到i不大于0为止停下。

![](/assets/B20zbwiEuo4p1dxWklYcr8wCneb.png)

## 嵌套控制语句

和我们之前学到的一样，这些语句可以嵌套在一起执行

```scss
$i: 6;

@while $i >0 {
  @for $j from 1 to 3 {
    .item-#{$i} {
      width: 2em * $j;
    }
  }

  $i: $i - 2;
}
```

这个例子在外层循环item的名称递减，内层循环width的大小递增，编译结果如下：

![](/assets/NDRXbwqrboiLNhxePufcUIyknNb.png)

这和我们在其它语言学得的一样，不再赘述。

# Mixin Directives

混合样式也是为便于在样式定义中使用其他的样式定义而服务的。

## @mixin

定义一个混合样式只需要在`@mixin`之后跟上定义即可，可以是多个我们之前提到过的任何选择器合样式。

```scss
@mixin mybackground {
  background: {
    size: 300px 300px;
    color: white;
  }

  color: red;
}
```

## @include

引用定义好的混合样式，如下：

```scss
.background_one {
  @include mybackground;
  text-align: center;
}
```

编译结果会将混合样式中的内容依次编译到引用的样式中

![](/assets/JJDRbNE8pootlZxlFYLchqxjnAh.png)

## arguments

可以像函数一样调用混合定义，形式参数会依次代入。如将上述例子改成参数输入

```scss
@mixin mybackground($size, $color, $font-color: red) {
  background: {
    size: $size;
    color: $color;
  }

  color: $font-color;
}

.background_one {
  @include mybackground(300px 300px, white);
  text-align: center;
}
```

编译会将参数依次输入，如果是已定义的缺省参数会按定义（上述例子的`font-color`）输入。

![](/assets/KLBZbjoCKom85SxFWOXcdPkin5e.png)

有的时候可能不确定有多少参数会被使用，需要用到`…`帮助参数输入

```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```

上述例子会将整句参数重复输入到每个`$shadows`中

![](/assets/D7swbDrjIoR86QxKCzWc3j1xnSd.png)

或是用于数组的输入。如下例将`values`中的参数依次输入到形参当中。

```scss
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}
$values: #ff0000, #00ff00, #0000ff;
.primary {
  @include colors($values...);
}
```

变量`values`中的值挨个赋值到`.primary`样式中

![](/assets/CwJRb5K2EomSbnxfUBPcpsTSnJu.png)

# Function Directives

函数指令的样式类似我们上面提到的混合指令带参数输入，将参数传入函数并返回一个值用于赋值变量或属性。

例如：

```scss
@function add_one($n) {
  @return $n + 1;
}

.something { 
    width: add_one(6); 
}
```

![](/assets/IuvGbObz3oGr4cxwOsZcQrUgnWe.png)

和混合样式一样，函数指令同样支持形参预先赋值、多参数等等，具体内容不再赘述。

