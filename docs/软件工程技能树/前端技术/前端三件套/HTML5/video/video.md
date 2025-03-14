---
title: video
slug: video
sidebar_position: 1
---


# video

Author：徐旻昶

在html中，<b> </b><b>&lt;vedio&gt;</b><b> </b>元素用于嵌入视频（或音频？）内容。

和audio一样，它有一个起始的自设样式，如下。

![](/assets/NTYbbxMHlo6QrlxHEnAcW2rInFb.png)

上面的vedio让一段视频出现在了空白的页面上，并且自带了时长显示、播放按键、音量、屏幕大小等等功能，而这样一个较为完备的视频播放器仅用了两三行代码，这也得益于html为我们提供了很完备的组件。

```html
<video controls width="400">
    <source src="../src/assets/lab.mp4">
  </video>
```

vedio同样可以通过属性值的修改来完成来完成各式样的自定义播放器，因此我们仍然从属性开始分解它的各个部分，来了解vedio是如何运作和并进行自定义的。

# property

从左侧的小标题中大家应该也看到了，vedio和audio同作为播放器类型的组件，有许多的属性是有相通之处的；如果看到属性名就有大概了解了可以跳过

由于对vedio没啥实战经验，大部分的内容来自于

再加了一些我的理解，欢迎大家补充（

## Src

source`src`用来指定我们定希望添加到网页里的视频的url。

url是该视频的地址，可以用绝对路径和相对路径表示（当然更推荐的是相对路径），路径的出发点是当前编写文件的位置。

和audio同样的，您也可以另起一行，用`<source>`标签处理之使其达到相同的效果

```html
<vedio src=".../xx.mp4"></vedio>
<!--等价于!-->
<vedio>
    <source src=".../xx.mp4">
</vedio>
```

- source可以有多个，浏览器会从上到下尝试每一个音频，并选取第一个可以正常播放的音频来用。

```html
<vedio>
    <source src=".../xx1.mp4">
    <source src=".../xx2.mp4">
    <source src=".../xx3.mp4">  <!--若前两个不适配，则选择这个播放!-->
</vedio>
```

## Autoplay

autoplay属性在被添加后会使得vedio尽快开始播放，也就是说，等到该视频生成并加载了刚开始可以播放的片段后他就会开始播放。

autoplay是一个布尔值，可以设置它的true和false来使用autoplay属性

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💫</div>
<p>MDN中说有些浏览器中可能会自带autoplay属性导致我们的autoplay属性设置失败，这点有待考究和各位的尝试补充（</p>
</div>

```html
<vedio controls src=".../xx.mp4" autoplay></vedio>
```

autoplay在实际的项目中一般用在用户自发添加了一段视频或者点开类似“预览”的图标之后，而打开网页的同时就开始播放视频想必对大家来说也是很糟糕的体验，这点需要在编写的时候自己判定。

## Controls

controls属性会让vedio的下方显示一个如上面我们看到的一样的一个播放面板

![](/assets/UQT5bdKCIo95GmxHdf0chTEOnMd.png)

```html
<vedio src=".../xx.mp4" controls></vedio>
```

一般情况下，和autoplay这个布尔值类似的，不添加controls会使得vedio隐藏这个播放面板，以便于我们更好地对播放面板进行自定义等等，但是添加后在html内设置它为false是一种无效的行为。

```html
<vedio src=".../xx.mp4" controls="false"></vedio>
```

上述代码仍然会使得controls面板显示

想要动态地打开/关闭播放面板需要借助script的力量，比如：

```html
<video id="MV">
    <source src=".../xx.mp4">
</video>
<button onclick="showControls"></button>

<script>
function showControls(){
    document.getElementById("MV").controls = true;
}    //通过id获取该html元素后，修改属性的值
</script>
```

上述代码在点击按钮后可以使得被隐藏的controls显示；同样改成false也能使得显示的controls隐藏。

## Controllist

controllist用于关闭部分vedio播放器设定的值，一般作用有`controlslist="nodownload nofullscreen noremoteplayback"`三类。

```html
<video controlslist="nodownload" src="../src/assets/lab.mp4"></video>
<!--隐藏了control中最后三个小点点出来的下载!-->
<video controlslist="nofullscreen" src="../src/assets/lab.mp4"></video>
<!--隐藏了control中全屏播放的功能!-->
<video controlslist="noremoteplayback" src="../src/assets/lab.mp4"></video>
<!--隐藏了control远程播放的功能!-->
```

![](/assets/BDqybuNvAoWZw1xLG76coFUbnlb.png)

![](/assets/MYlKbq3UJo3Nh7xAQVJcREHpn2d.png)

上述两张图片分别展示了下载和全屏被隐藏时的样式情况

当然，仅当control是存在的情况下这个属性才会生效

## Disable-picture-in-picture

很直观地，直接翻译过来也读得懂的“关闭了画中画”功能。

![](/assets/XipkbHFBPodx58xxDkJc3S6vnmf.png)

上述为画中画情况下的演示

## Loop

Loop属性将会使视频循环播放

## Width & Height

vedio可以直接在标签内设置视频的宽度和高度

## Muted

Muted属性在设置为true的时候会静音该音频，默认值为false

```html
<video height="200" controls muted>
    <source src=".../xx.mp4">
  </video>
```

看上去就是这样的，初始状态下的音频调节会被调整到静音状态

![](/assets/IxMbbO4eLoMHaoxJRXZcB1Osnde.png)

## Playsinline

或者说是html5中的webkit-playsinline属性，它被设置为true时可以在例如IOS上不必打开全屏就可以进行播放（也就是支持小窗口播放）

## Poster

海报元素，也就是视频尚未开始播放时显示在窗口中的图片，是我们通常熟知的“视频封面”。设置poster时填入图片的url。下面的例子在不改动我们前文用作样例的视频源的同时添加了poster：

![](/assets/DIhubIxehoKw7Zx04DAcuYA0nhh.png)

```html
<video height="200" controls poster="../src/assets/IMG.png">
    <source src="../src/assets/lab.mp4">
  </video>
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🌟</div>
<p>使用本地视频时的poster自然没有问题，但是引用比如网站上的视频url时就容易出现poster无法简单自定义的问题了。这时候没准自己处理个先显示图片再显示视频的假poster比较方便</p>
</div>

## Preload

preload是一个枚举属性，它的意思是让我们给浏览器提出一个<b>建议</b>，希望让浏览器使用何种加载方式以达到最好的用户体验。

但它只是个建议，浏览器并不被强制遵循该属性的规范。

preload的值可以是：

1. `none`：该视频不应该被预加载。意为用户可能不会播放该视频，或者服务器希望节省带宽；
2. `metadata`：仅希望获取视频的一些元数据 (例如长度等) ；
3. `auto`：可以提前加载整个视频。意为用户可能会播放视频；
4. <em>空字符串</em> : 等效于`auto`属性。不同浏览器会有自己的默认值，规范建议的默认值为 `metadata`。

- 注意，`autoplay` 属性的优先级高于 `preload`。

# Event

在使用JS时，我们也可以通过vedio播放器自带的各种事件来对某些值发生变化的时候进行监听。由于事件的用法云云在别处有介绍，这里不再赘述，仅给予常用项简单列出：

<table>
<colgroup>
<col width="324"/>
<col width="456"/>
</colgroup>
<tbody>
<tr><td><p>事件名</p></td><td><p>含义</p></td></tr>
<tr><td><p>canplay</p></td><td><p>浏览器可以播放媒体文件了，但估计没有足够的数据来支撑播放到结束，不必停下来进一步缓冲内容。</p></td></tr>
<tr><td><p>canplaythrough</p></td><td><p>浏览器估计它可以在不停止内容缓冲的情况下播放媒体直到结束。</p></td></tr>
<tr><td><p>emptied</p></td><td><p>媒体内容变为空；例如，当这个 media 已经加载完成（或者部分加载完成），则发送此事件，并调用 load() 方法重新加载它。</p></td></tr>
<tr><td><p>ended</p></td><td><p>视频停止播放，因为 media 已经到达结束点。</p></td></tr>
<tr><td><p>loadeddata</p></td><td><p>media 中的首帧已经完成加载。</p></td></tr>
<tr><td><p>loadedmetadata</p></td><td><p>已加载元数据。</p></td></tr>
<tr><td><p>pause</p></td><td><p>播放已暂停。</p></td></tr>
<tr><td><p>play</p></td><td><p>播放已开始。</p></td></tr>
<tr><td><p>playing</p></td><td><p>由于缺乏数据而暂停或延迟后，播放准备开始。</p></td></tr>
<tr><td><p>progress</p></td><td><p>在浏览器加载资源时周期性触发。</p></td></tr>
<tr><td><p>ratechange</p></td><td><p>播放速率发生变化。</p></td></tr>
<tr><td><p>seeked</p></td><td><p>跳帧（seek）操作完成。</p></td></tr>
<tr><td><p>seeking</p></td><td><p>跳帧（seek）操作开始。</p></td></tr>
<tr><td><p>suspend</p></td><td><p>媒体数据加载已暂停。</p></td></tr>
<tr><td><p>volumechange</p></td><td><p>音量发生变化。</p></td></tr>
<tr><td><p>waiting</p></td><td><p>由于暂时缺少数据，播放已停止。</p></td></tr>
</tbody>
</table>

- 注：“seek”操作是指用户正在音频中寻址，即在音频中移动或跳跃到了新的位置。

# 自定义vedio样式

在平时编写时，我们一般都会采用自定义的样式来完成风格上或是功能上更多的可能性。在不采用`control`的情况下，我们需要自己添加组件来实现进度条、播放案件、全屏等功能的相应，并用JS事件改变各对应类型的值达到应用效果。

简单举几个事件应用例子：

```js
//察觉到视频“播放”或是“暂停”时，假设下列vedio指代用getdocument获取的视频元素，而botton表示播放按钮
botton.onclick = function(){
    if(video.paused){  //暂停状态按下，开始播放
        video.play();
        botton.src = "...";  //更换图标
    }else{
        video.pause();
        botton.src = "...";  //更换图标
    }
}
```

```js
//要获取当前视频的播放时间，使用currentTime获取
//设我们获取到的时间显示组件为clock
video.ontimeupdate = function(){
    var t = video.currentTime;
    var hour = parseInt(t/3600);
    var minute = parseInt(t%3600/60);
    var second = parseInt(t%60);
    clock.innerHTML = number1(hour) + ":"+ number1(minute) + ":" + number1(second);
    //设置一个组件去应用t
    //。。。
}
```

