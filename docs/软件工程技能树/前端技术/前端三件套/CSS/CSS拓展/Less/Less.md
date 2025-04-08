---
title: Less
slug: Less
sidebar_position: 2
---


# Less

Author:舒靖

# 写在前面

> 本文主要参考Less中文网（见参考文档），主要工作为将内容整理成正常人能读懂的形式
> 包括但不限于调整内容顺序、修改文字表述、修改命名
> 建议的阅读方式为打开配置Vscode后，自己编译一下相关代码，帮助理解
> 水平所限，欢迎修订

## 从「样式表」到「动态样式语言」的蜕变

2009年，当Alexis Sellier（又名"CloudHead"）首次发布Less（Leaner Style Sheets）时，前端开发者正面临CSS的诸多限制。当时典型的开发场景：

```
/* 传统CSS的重复模式 */
#header { color: #4d926f; }
#header .navigation { font-size: 12px; }
#header .logo { 
  color: #4d926f;
  width: 300px;
}
#header .logo:hover { color: #3a7a5a; }
```

这种写法存在明显问题：

- <b>颜色值硬编码</b>：修改主题色需要全文搜索替换
- <b>选择器重复书写</b>：难以维护嵌套层级关系
- <b>缺乏计算能力</b>：无法动态处理尺寸和颜色

Less的诞生为CSS带来了<b>变量</b>、<b>嵌套</b>、<b>运算</b>等编程特性，同时保持了CSS的原有语法风格，使开发者能够更优雅地编写和维护样式代码。

## 什么是Less

Less 是一门 CSS 预处理语言，它扩充了 CSS 语言，增加了诸如变量、混合、函数等功能，让 CSS 更易维护、方便制作主题、扩充。

## 为什么要用Less

- 更清晰和更可读的代码
- 使用嵌套编写更干净，组织良好的代码
- 使用变量，可以更快地实现维护
- 可以定义样式并重复使用

Less作为CSS预处理器的先驱之一，为前端样式开发带来了革命性的改进。它平衡了功能增强与语法简洁性，特别适合需要渐进式改进现有CSS代码库的项目。正如Less官网所述："It's CSS, with just a little more"——这正是Less的设计哲学，在保持CSS本质的同时，提供恰到好处的增强功能。

# 快速上手

本节参考：[Less 入门文档](https://www.runoob.com/manual/lessguide/)

## 安装

- 使用npm全局安装：`$ npm install -g less`
- 只在当前目录安装：`npm i less --save-dev`

## 命令行编译

- 编写一个less文件（以index.less为例）
- 编译less文件至css文件
    - 编译至main.css：`$ lessc index.less`
    - 自定义输出文件：`$ lessc index.less > main.css`

- 在其他文件中引入编译后的css文件即可

也可以[在代码中调用Less编译器](https://www.runoob.com/manual/lessguide/#using-less-usage-in-code)

## 客户端使用

> 不推荐用于生产环境

- 在页面中引入less文件，并将 rel 属性设置为"stylesheet/less"：`<link rel="stylesheet/less" type="text/css" href="styles.less" />`
- 下载[Less.js](https://github.com/less/less.js/archive/master.zip)并通过&lt;script&gt;&lt;/script&gt;标签将其引入，放置于页面的&lt;head&gt;元素内：`<script src="less.js" type="text/javascript"></script>`

注意：

- 需要less.js之前加载样式表
- 如果加载多个less样式表文件，每个文件都会被单独编译，因此，一个文件中所定义的任何变量mixin或命名空间都无法在其它文件中访问

浏览器选项：

- 在 &lt;script src="less.js"&gt;&lt;/script&gt; 之前定义全局的less对象就可以为less.js设置参数

```js
<script>
    less = {
        env: "development",
        async: false,
        fileAsync: false,
        poll: 1000,
        functions: {},
        dumpLineNumbers: "comments",
        relativeUrls: false,
        rootpath: ":/a.com/"
    };
</script>
<script src="less.js"></script>
```

- 参数含义详见[浏览器选项](https://www.runoob.com/manual/lessguide/usage/#using-less-in-the-browser-client-side-options)

## 自动编译

> 如果有选择，谁会每次改一行代码就在命令行编译一次呢

### Vscode

[弱智教程](https://blog.csdn.net/qq_41619796/article/details/88711215)🈶️

- 安装Easy LESS插件
- 此时编辑保存.less文件，就会在对应的目录下生成对应的.css文件
- 如有需要可以修改配置文件

```js
"less.compile": {
    "compress": false,//是否压缩
    "sourceMap": false,//是否生成map文件，有了这个可以在调试台看到less行数
    "out": true, // 是否输出css文件，false为不输出
    "outExt": ".css", // 输出文件的后缀,小程序可以写'wxss'
}
```

## React中使用Less

## Vue中使用Less

# 功能

## 基本语法

### 运算

算术运算`+`，`-`，`*`，`/`可以用于任意数量，颜色或可运算的操作中。

与css兼容地，`calc()`不评估数学表达式，但将评估嵌套函数中的变量和数字。

### 嵌套

```css
#header {
    color: black;
    .navigation {
        font-size: 12px;
    }
    .logo {
        width: 300px;
    }
}
```

编译成css文件：

```css
#header {
    color: black;
}
#header .navigation {
    font-size: 12px;
}
#header .logo {
    width: 300px;
}
```

### 转义

`~"anything"`或`~'anything'`可以让内部的内容保持原样。

在3.5+版本中，很多转义已经不再必需。

### 注释

<em>/* this is easy */</em>

### 内置函数

篇幅所限，Less内置的函数可以于需要时在这里查阅。

### 作用域

与css类似，先从当前所在的{}里找，找不到则从上一级查找。

## 变量

### 定义与引用变量

```css
@width: 10px;
@height: @width + 10px;

#header {
    width: @width;
    height: @height;
}
```

编译成css文件：

```css
#header {
    width: 10px;
    height: 20px;
}
```

以上使用了变量来控制CSS规则中的值，但其实也可以在其他地方使用，例如选择器名称，属性名称，URL和@import语句中。

```css
@property: color;

.widget {
    @{property}: #0ee;
    background-@{property}: #999;
}
```

编译成css文件：

```css
.widget {
    color: #0ee;
    background-color: #999;
}
```

### 变量套变量

```css
@primary:  green;
@secondary: blue;

.section {
    @color: primary;
    
    .element {
        color: @@color;
    }
}
```

编译成css文件：

```css
.section .element {
    color: green;
}
```

### 生效值

引用变量时，从当前作用域向上搜索，使用变量的最后一个赋值。

```css
@var: 0;

.class {
    @var: 1;
    .brass {
        @var: 2;
        three: @var;
        @var: 3;
    }
    one: @var;
}
```

编译成css文件：

```css
.class {
    one: 1;
}

.class .brass {
    three: 3;
}
```

但是请时刻记住，用less是为了让css代码更有组织，更清晰可读，不是为了隐藏你的意图

### 将属性作为变量

高于v3.0.0的less版本中可以将属性也视为变量，注意生效值规则和普通变量类似。

```css
.widget {
    color: #efefef;
    background-color: $color;
}
```

编译成css文件：

```css
.widget {
    color: #efefef;
    background-color: #efefef;
}
```

### 默认变量

并非必需，会被后续的赋值覆盖。

```css
<em>// library
</em>@base-color: green;
@dark-color: darken(@base-color, 10%);

<em>// use of library</em>
@import "library.less";
@base-color: red;
```

最终，@dark-color会为深红色。

### 合并

用逗号连接：

```css
.mixin() {
    box-shadow+: inset 0 0 10px #555;
}
.myclass {
    .mixin();
    box-shadow+: 0 0 20px black;
}
```

编译成css文件：

```css
.myclass {
    box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

用空格连接：

```css
.mixin() {
    transform+_: scale(2);
}
.myclass {
    .mixin();
    transform+_: rotate(15deg);
}
```

编译成css文件：

```css
.myclass {
    transform: scale(2) rotate(15deg);
}
```

## 父选择器

### 基本使用

使用<b>＆</b>运算符，可以重复引用父选择器，而不使用其名称：

```css
.select {
    & + & {
        color: #A9F5F2;
    }

    & & {
        color: #D0FA58;
    }

    && {
        color: #81BEF7;
    }

    &, &_class1 {
        color: #A4A4A4;
    }
    
    &:hover {
        color: #66CCFF;
    }
}
```

编译成css文件：

```css
.select + .select {
    color: #A9F5F2;
}
.select .select {
    color: #D0FA58;
}
.select.select {
    color: #81BEF7;
}
.select, .select_class1 {
    color: #A4A4A4;
}
.select:hover {
  color: #66CCFF;
}
```

如果不使用父选择器：

```css
a {
    color: blue;
    :hover {
        color: green;
    }
}
```

编译成css文件：

```css
a {
    color: blue;
}
a :hover {
    color: green;
}
```

### 嵌套时的选择器

```css
.header {
    .menu {
        border-radius: 5px;
        .no-borderradius & {
            background-image: url('images/button-background.png');
        }
    }
}
```

编译成css文件：

```css
.header .menu {
    border-radius: 5px;
}
.no-borderradius .header .menu {
    background-image: url('images/button-background.png');
}
```

### 排列组合

可以用于生成逗号分隔列表中选择器的所有可能排列：

```css
p, a, ul, li {
    border-top: 2px dotted #366;
    & + & {
        border-top: 0;
    }
}
```

编译成css文件：

```css
p, a, ul, li {
    border-top: 2px dotted #366;
}
p + p, p + a, p + ul, p + li,
a + p, a + a, a + ul, a + li,
ul + p, ul + a, ul + ul, ul + li,
li + p, li + a, li + ul, li + li {
    border-top: 0;
}
```

## Mixins

### 创建Mixins

可以引用已有的css：

```css
.a, #b {
    color: red;
}
.mixin-class {
    .a(); //括号可以省略，但是建议写上
}
.mixin-id {
    #b();
}
```

编译成css文件：

```css
.a, #b {
    color: red;
}
.mixin-class {
    color: red;
}.mixin-id {
    color: red;
}
```

可以加括号以创建不会输出到css的Mixins：

```css
.my-other-mixin() {//不会出现在编译后的css文件中
    background: white;
}
```

### 父选择器

Mixins中可以包含父选择器：

```css
.my-hover-mixin() {
    &:hover {
        border: 1px solid red;
    }
}

button {
    .my-hover-mixin();
}
```

编译成css文件：

```css
button:hover {
    border: 1px solid red;
}
```

### 命名空间

使用命名空间可以避免名称冲突，并从外部封装Mixins组

```css
#outer() {
    .inner {
        color: red;
    }
}
.c {
    #outer.inner();
}
```

编译成css文件：

```css
.c {
    color: red;
}
```

### 保护

当命名空间有保护时，只有保护的条件（when里的条件式）成立，才会返回其中的内容：

```css
#namespace when (@mode = huge) {
    .mixin() {
        <em>/* */</em>
    }
}
#namespace {
    .mixin() when (@mode = huge) {
        <em>/* */</em>
    }
}//这两种写法是等价的
```

保护支持：

- `>`，`>=`，`=`，`=<`，`<`
- `and`，`not`，`,`
- 类型检查

在保护的条件部分，还可以使用default()函数（该函数也只能用于这里）。

```css
.x {
    .m(red)                                    {case-1: darkred}
    .m(blue)                                   {case-2: darkblue}
    .m(@x) when (iscolor(@x)) and (default())  {default-color: @x}
    .m('foo')                                  {case-1: I am 'foo'}
    .m('bar')                                  {case-2: I am 'bar'}
    .m(@x) when (isstring(@x)) and (default()) {default-string: and I am the default}
    
    &-blue  {.m(blue)}
    &-green {.m(green)}
    &-foo   {.m('foo')}
    &-baz   {.m('baz')}
}
```

编译成css文件：

```css
.x-blue {
    case-2: #00008b;
}
.x-green {
    default-color: #008000;
}
.x-foo {
    case-1: I am 'foo';
}
.x-baz {
    default-string: and I am the default;
}
```

### important

```css
.foo (@bg: #f5f5f5; @color: #900) {
    background: @bg;
    color: @color;
}
.unimportant {
    .foo();
}
.important {
    .foo() !important;
}
```

编译成css文件：

```css
.unimportant {
    background: #f5f5f5;
    color: #900;
}
.important {
    background: #f5f5f5 !important;
    color: #900 !important;
}
```

### 参数

Mixins可以接受一至可变个参数（使用@rest接受多传的参数），参数可以有默认值。

传入参数时可以带上参数名，可以在Mixins中使用@argument代表全部参数。

```css
.mixin(@color) {
    color-1: @color;
}
.mixin(@color; @padding: 2) {
    color-2: @color;
    padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
    color-3: @color;
    padding-3: @padding;
    margin: @margin @margin @margin @margin;
}
.some .selector div {
    .mixin(#008000);
}

.mixin(@color: black; @margin: 10px; @padding: 20px) {
    color: @color;
    margin: @margin;
    padding: @padding;
}
.class1 {
    .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
    .mixin(#efca44; @padding: 40px);
}
```

编译成css文件：

```css
.some .selector div {
    color-1: #008000;
    color-2: #008000;
    padding-2: 2;
}

.class1 {
    color: #33acfe;
    margin: 20px;
    padding: 20px;
}
.class2 {
    color: #efca44;
    margin: 10px;
    padding: 40px;
}
```

### 匹配

根据不同的变量值，获得不同的Mixins返回：

```css
.mixin(dark; @color) {
    color: darken(@color, 10%);
}
.mixin(light; @color) {
    color: lighten(@color, 10%);
}
.mixin(@_; @color) {
    display: block;
}

@switch: light;.class {
    .mixin(@switch; #888);
}
```

编译成css文件：

```css
.class {
    color: #a2a2a2;
    display: block;
}
```

### Mixins函数

从Less 3.5.0开始，Mixins可以像函数一样嵌套，接受参数和返回值。

```css
.average(@x, @y) {
    @result: ((@x + @y) / 2);
}
div {
    <em>// call a mixin and look up its "@result" value</em>
    padding: .average(16px, 50px)[@result];
}
```

编译成css文件：

```css
div {
    padding: 33px;
}
```

- 如果有多个匹配的Mixins，则返回带有该标识符的最后一个匹配值
- 如果未声明查找的值，会返回最后一个声明的值

Mixins中定义的变量等可以在调用者的作用域中使用，除非调用者包含具有相同名称的变量（包括由另一个Mixins调用定义的变量）

- 调用者作用域内的变量受到保护，从父作用域继承的变量会被覆盖

```css
.mixin() {
    @width:  100px;
    @height: 200px;
}
.caller {
    .mixin();
    width:  @width;
    height: @height;
}
.class {
    margin: @width @height;
    .mixin();
}
@width: 200px;
```

编译成css文件：

```css
.caller {
    width:  100px;
    height: 200px;
}
.class {
    margin: 100px 200px;
}
```

Mixins函数也可以使用保护

### 递归

```css
.loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));    <em>// next iteration</em>
    width: (10px * @counter); <em>// code for each iteration</em>
}
div {
    .loop(5); <em>// launch the loop</em>
}
```

编译成css文件：

```css
div {
    width: 10px;
    width: 20px;
    width: 30px;
    width: 40px;
    width: 50px;
}
```

使用递归循环生成CSS网格类的一般示例：

```css
.generate-columns(4);
.generate-columns(@n, @i: 1) when (@i =< @n) {
    .column-@{i} {
        width: (@i * 100% / @n);
    }
    .generate-columns(@n, (@i + 1));
}
```

编译成css文件：

```css
.column-1 {
    width: 25%;
}
.column-2 {
    width: 50%;
}
.column-3 {
    width: 75%;
}
.column-4 {
    width: 100%;
}
```

### 赋值给变量

Less 3.5.0之后，可以将Mixins赋值给变量：

```css
#theme.dark.navbar {
    .colors(light) {
        primary: purple;
    }.colors(dark) {
        primary: black;
        secondary: grey;
    }
}
.navbar {
    @colors: #theme.dark.navbar.colors(dark);
    background: @colors[primary];
    border: 1px solid @colors[secondary];
}
```

编译成css文件：

```css
.navbar {
    background: black;
    border: 1px solid grey;
}
```

另一个例子：

```css
#library() {
    .rules() {
        background: green;
    }
}
.box {
    @alias: #library.rules();//注意要加括号
    @alias();
}
```

编译成css文件：

```css
.box {
    background: green;
}
```

# 参考文档

