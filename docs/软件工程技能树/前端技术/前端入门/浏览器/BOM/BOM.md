---
title: BOM
slug: BOM
sidebar_position: 0
---


# BOM

Author:李予谦/李宇轩

# BOM是什么？

## 前言

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[62%]" width-ratio="62">
<p>JavaScript 语言最初是为 Web 浏览器创建的。一个运行JS的平台提供的功能，被称为主机环境。主机环境提供了自己的对象和语言核心以外的函数。Web 浏览器提供了一种控制网页的方法。Node.JS 提供了服务器端功能，等等。</p>
<p>右图为JavaScript在浏览器中运行时的示意图。</p>
<p>根对象称为<code>window</code>，它是JS代码的<a href="https://zh.javascript.info/global-object">全局对象</a>（全局变量是它的属性，function定义的函数是它的方法，标签的id值会成为它的属性……），同时也代表了“浏览器窗口”，提供相应的属性和方法（如窗口高度等）。</p>
</div>
<div class="w-[37%]" width-ratio="37">
![](/assets/LXxMbwtJAoZKTpxiQEOcVBd9nbh.png)
</div>
</div>

## BOM和DOM

浏览器对象模型（Browser Object Model），简称 BOM，表示由浏览器（主机环境）提供的用于处理文档(document)之外的所有内容的其他对象。BOM提供的对象和api与具体的网页没有太大关系，而是用于与浏览器交互。浏览器的标签页，地址栏、菜单栏、滚动条、浏览器的右键菜单、document加载时的状态栏，显示http状态码都是属于BOM。DOM则负责余下的document的显示。

window作为全局对象，拥有document,navigator,location等属性，而document就是DOM的根节点，而BOM包含了window及其下属的多个属性（Location，History，Screen，Navigator）。

# window对象

## 全局作用域

由于 `window` 对象同时扮演着 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明的变量、函数都会变成 `window` 对象的属性和方法。

抛开全局变量会成为 `window` 对象的属性不谈，定义全局变量与在 Window 对象上直接定义属性还是有一点差别：全局变量不能通过 `delete` 操作符删除，而直接在 `window` 对象上的定义的属性可以。

这是因为，通过 `var` 语句添加的 `window` 属性有一个名为 `[[Configurable]]` 的特性，这个特性的值被设置为 `false`，因此这样定义的属性不可以通过 `delete` 操作符删除。

尝试访问未声明的变量会抛出错误，但是通过查询 `window` 对象，可以知道某个可能未声明的变量是否存在。

## 属性和方法

# 其它全局对象

## location

使用 `Location` 对象可以通过很多方式来改变浏览器的位置。

`location.assign()`方法是最常用的之一。

```js
//在新的标签页打开url
location.assign('https://github.com');

//等价于下面两条
window.location = 'https://github.com';
location.href = 'https://github.com';
```

`location`还有许多属性可以改变当前页面。

```js
// 假设初始 URL 为 http://github.com/about/
location.href = 'http://github.com/about/';

// 将 URL 修改为 "http://github.com/about/#ds-thread"
location.hash = '#ds-thread';

// 将 URL 修改为 "http://github.com/about/?search=123"
// 同时注意，访问location.search会返回从问号到 URL 末尾的所有内容
location.search = '?search=123';

// 将 URL 修改为 "https://gist.github.com/"
location.hostname = 'gist.github.com';

// 将 URL 修改为 "https://gist.github.com/u/10086"
location.pathname = 'u/stone0090';

// 将 URL 修改为 "https://gist.github.com:8080/"
location.port = 8080;
```

下面再列举一些`location`对象的其它方法。

```js
// 重新导航到这个url，刷新页面但不留历史记录，只在chrome中生效，所以一般不会使用。
location.replace('http://github.com');

// 重新加载（有可能从缓存中加载）
location.reload();

// 重新加载（从服务器重新加载）
location.reload(true);
```

## history

`history`对象提供了操作浏览器会话历史（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口（并非浏览器的   历史记录）。

下面罗列了一些简单的历史记录跳转方法。

```js
// 前进两页
history.go(2);

// 后退一页
history.go(-1);

// 刷新当前页面，下面两种写法一致
history.go();
history.go(0);

// 浏览器会跳转到历史记录中包含该字符串的第一个位置——可能后退，也可能前进，具体要看哪个位置最近。
history.go('github.com');

// 下面两种写法效果一致
history.back();
history.go(-1);

// 反之，forward()相当于的go(1)
history.forward();
```

此外下面介绍三个`history`的属性

1. `length`：返回历史会话中元素数目，包括当前页面，只会计算不同的页面，反复跳转到一个页面多次不会增加`length`
2. `scrollRestoration`：允许 Web 应用程序在历史导航上显式地设置默认滚动恢复行为。
3. `state`：返回一个表示历史栈堆顶部状态的值。这是一种可以不必等待 popstate 事件而查看状态的方式。

### 关于浏览记录堆栈的操作

`history.pushState` 函数向浏览器的历史堆栈压入一个 URL 为设定值的记录，并改变历史堆栈的当前指针至栈顶，添加后页面不会重载。

```js
history.pushState(state, title, url);
```

- state：<b>用于存储该 URL 对应的状态对象</b>。该对象可通过 `history.state` 或 `popstate` 事件回调中的 event 对象获取。如果不需要这个对象，此处可以填 null。
- title：<b>新页面的标题</b>，但是所有浏览器目前都忽略这个值，<b>因此这里可以填 null</b>。
- url：<b>URL 地址</b>，不允许跨域。这个参数可选，如果它没有被特别标注，会被设置为文档的当前 URL。

`history.replaceState()`，它和 `history.pushState()` 方法基本相同，区别只有一点，<b>history.replaceState()</b><b> 不会新生成历史记录，而是将当前历史记录替换掉，常用于落地页</b>。

```js
history.replaceState(state, title, url);
```

`window.onpopstate`，`push` 的对立就是 `pop`，可以猜到这个事件是在浏览器取出历史记录并加载时触发的。但实际上，它的条件是比较苛刻的，几乎只有 <b>点击浏览器的“前进”、“后退”这些导航按钮，或者是由 JavaScript 调用的 </b><b>history.back()</b><b> 等导航方法</b>，且 <b>切换前后的两条历史记录都属于同一个网页文档</b>（ JavaScript 环境的 `document`），才会触发本事件，因为这些操作有一个共性，即修改了历史堆栈的当前指针。

但上面两个方法不会触发`window.onpopstate`

```js
window.onpopstate = function(event) {
  alert('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
};
```

## navigator

可以使用`navigator.geolocation.getCurrentPosition(success, error, options);`来获取用户位置，但这个方法会默认返回一个低精度的定位。三个参数如下：
- success：成功得到位置信息时的回调函数，使用 `Position` 对象作为唯一参数。
- error：（可选）获取位置信息失败时的回调函数，使用 `PositionError` 对象作为唯一的参数，这是一个可选项。
- options：（可选）一个可选的 `PositionOptions` 对象，用于设置 `getCurrentPosition` 的参数。

也可以使用`watchPosition()`来监视定位是否发生变化，它与`getCurrentPosition()` 接受相同的参数，但回调函数会被调用多次。`watchPosition()`  函数会返回一个 ID，唯一地标记该位置监视器。您可以将这个 ID 传给  `clearWatch()`  函数来停止监视用户位置。

## screen

Screen Orientation API 是一个能让 Web 开发者能控制屏幕旋转方向的 API，开发者可以利用该 API 检测屏幕的当前方向，在屏幕方向发生改变时得到消息通知，并能通过 API 将屏幕方向锁定到指定状态。

先介绍一些属性：
- `height`：屏幕的像素高度（包括导航和底部）
- `width`：屏幕的像素宽度（包括侧边栏）
- `availHeight`：屏幕的像素高度减去系统部件高度之后的值（只读）
- `availWidth`：屏幕的像素宽度减去系统部件宽度之后的值（只读）
- `orientation`：屏幕的方向。

### 锁定方向

```js
const lockedAllowed = window.screen.lockOrientation(orientation);
//若成功方向锁定，则返回true，被拒绝则返回false
```

orientation是需要锁定屏幕的方向。这个参数是一个字符串或者是一个由字符串组成的数组。

<div class="callout callout-bg-4 callout-border-2">
<div class='callout-emoji'>💥</div>
<p>但是这个方法<code>screen.lockOrientation()</code><b>正在被弃用，所以尽量不要使用</b>，应该使用下面介绍的<code>screen.orientation.lock()</code>，虽然它的兼容性也一般，<b>目前主要支持移动设备</b>，不过确实一般方向锁定也只用于移动设备。</p>
</div>

`screen.orientation.lock(orientation)`是新的用于锁定方向的api，需要传递一个参数orientation：
- "natural"：来自底层操作系统的屏幕自然方向： `portrait-primary` 或 `landscape-primary` 。
- "portrait": 竖屏（<em>高度大于宽度</em>）显示模式，根据平台和应用约定，可能是下面两个中的一个或兼有。
- "portrait-primary": 锁定竖屏，当屏幕是横屏（<em>宽度大于高度</em>）时，会让屏幕旋转90°或270°。
- "portrait-secondary": 锁定倒置竖屏，就是"portrait-primary"的完全180°反转。横屏时，也会与"portrait-primary"旋转相倒置（如"portrait-primary"是90°，那它就是270°，反之亦然）。
- "landscape": 横屏显示模式，根据平台和应用约定，可能是下面两个中的一个或兼有。
- "landscape-primary": 同"portrait-primary"，只不过是锁定横屏。
- "landscape-secondary": 锁定倒置横屏。

# 全局API

## 计时器相关

- `window.setTimeout()` 方法用于在指定的毫秒数后调用函数或计算表达式。

使用 `clearTimeout(timeId)` 可以停止间歇调用定时器（定时器还在，只是没调用）。

- `window.setInterval()`  方法重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟，利用了js异步的特性。

## 对话框相关

- `window.prompt()` 显示一个对话框，对话框中包含一条文字信息，用来提示用户输入文字。res接受返回的字符串，text是可为null的提示文本，value是输入框中的默认值

```js
const res = window.prompt(text, value);
```

- `window.confirm` 方法显示一个具有一个可选消息和两个按钮（确定和取消）的模态对话框，`message` 是要在对话框中显示的可选字符串，`res` 是一个布尔值，表示是选择确定还是取消（true 表示 ok）

```js
const res = window.confirm(message);
```

- `window.alert(message);`该方法显示一个警告对话框，不过它能阻止用户对浏览器窗口界面的其它部位进行操作，不应该过多地使用这种模态窗口。

