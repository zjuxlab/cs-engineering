---
title: <audio>
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-it1gwwgjriq0w0k7bptcbr4bn8g-vdpkwydvti5nuxkq4eaclkdzndg-dnrywksnjirizmk3nc7c09y7n7c-dnrywk
sidebar_position: 0
---


# &lt;audio&gt;

在html中，<b> </b><b>&lt;audio&gt;</b><b> </b>元素用于在文档中嵌入音频内容，可以包含一个或多个音频资源，浏览器将会从中选择一个最合适的。我最常见直观的audio元素应该是这种：

(高中给mp3下音乐时因为不想花钱找到一些犄角旮旯中的免费网站)

<img src="/assets/IgmYbeLJtoxN14xMrhncMMPXnge.png" src-width="730" src-height="333" align="center"/>

这就是`<audio controls>`带来的最直观的效果，使用`src`属性指定音频，并使用`controls`属性显示直观的播放器。

```html
<audio controls src=".../xx.mp3"></audio>
```

下面细细说来

# property

作为一个html标签，audio自然也有很多属性配合它的功能

## Src

最基础的肯定是我们熟悉的老朋友：source`src`，也就是选定希望添加到audio中的音频的url。

您也可以在audio中另起一行，用`<source>`标签处理之使其达到相同的效果

```html
<audio controls src=".../xx.mp3"></audio>
<!--等价于!-->
<audio controls>
    <source src=".../xx.mp3">
</audio>
```

- source可以有多个，浏览器会从上到下尝试每一个音频，并选取第一个可以正常播放的音频来用。

## Autoplay

autoplay属性在被添加后会使得audio在生成的同时自动开始播放。

```html
<audio controls src=".../xx.mp3" autoplay></audio>
```

想想一下你点开了一个页面，然后它在你没有任何警惕心的时候突然放出超高分贝的bgm，那会是一件很吓人的事情。所以一般情况下，请理性对待autoplay

## Controls

controls属性会让audio显示一个如上面我们看到的一样的一个播放面板，包含播放/暂停键，时间进度条，音量调整和其他。

<img src="/assets/DeMtbXVskoIsm3x9zkPcPIkJnvc.png" src-width="386" src-height="85" align="center"/>

```html
<audio controls src=".../xx.mp3"></audio>
```

## CurrentTime

currentTime用于查询当前这个audio的时间条在哪个位置，比如时间条处于1时前去查询：

<img src="/assets/D2TVbaO2koItWGxGLNDcLCwWnYf.png" src-width="390" src-height="80" align="center"/>

```html
<audio id="Audio" controls>
    <source src=".../xx.mp3">
</audio>
<button onclick="getCurTime()" type="button"></button>

<script>
var x = document.getElementById("Audio");

<!--获取x这个audio对象的现在时间并显示!-->
function getCurTime(){ 
        alert(x.currentTime);
} 
</script>
```

根据id查找到audio对象后，script将通过对象的currentTime属性获取这个对象的当前时间，并alert：

<img src="/assets/F7H7bsT1Xo3DuSx4lhacQrcPnEF.png" src-width="540" src-height="100" align="center"/>

- 您当然可以通过函数修改currentTime的值，但是当它超出上限或者下限的时候，它会变成上限/下限，有些浏览器可能会直接显示错误。

## DisableRemotePlayback

DisableRemotePlayback是一个布尔量，用来禁用在远程设备上进行进度控制的能力（复读网站内容.mp3）

## Duration

这是一个双精度浮点数，指明了音频在时间轴中的持续时间（总长度），以秒为单位。

<img src="/assets/LzDMbNeUNoh7yIxYTCPcXXEvnlf.png" src-width="390" src-height="80" align="center"/>

```html
<audio id="Audio" controls>
    <source src=".../xx.mp3">
</audio>
<button onclick="getDurationTime()" type="button"></button>

<script>
var x = document.getElementById("Audio");

<!--获取x这个audio对象的总时间并显示!-->
function getDurationTime(){ 
        alert(x.duration);
} 
</script>
```

原理同上，结果如下

<img src="/assets/VZuTbBYyNoN9uvxWp8XcjqZMnbg.png" src-width="558" src-height="98" align="center"/>

如果元素上没有媒体，或者媒体是不可用的，那么会返回 `NaN`。

<img src="/assets/TdE8b7yYSoiqCHxD7XycQ3s1nab.png" src-width="384" src-height="68" align="center"/>

```html
<audio id="Audio" controls>
    <!--啥都不放!-->
</audio>
<button onclick="getDurationTime()" type="button"></button>

<script>
var x = document.getElementById("Audio");

<!--获取x这个audio对象的总时间并显示!-->
function getDurationTime(){ 
        alert(x.duration);
} 
</script>
```

<img src="/assets/UdNwbg0B9oLw5Mx0xLGcOm3jnjd.png" src-width="541" src-height="94" align="center"/>

<em>如果媒体找不到确切的结尾（比如不确定长度的直播流，网络电台，或者是通过 </em><em>WebRTC</em><em> 连接的流），那么这个值将返回 </em><em>+Infinity</em><em>。</em>

## Loop

Loop属性将会使音频循环播放，easy to understand

## Muted

Muted属性在设置为true的时候会静音该音频，默认值为false

```html
<audio controls muted="true">
<!--已静音!-->
    <source src=".../xx.mp3">
</audio>
```

看上去就是这样的，初始状态下的音频调节会被调整到静音状态

<img src="/assets/FTMQbaRwOoL723xlSkNcfXAsn7e.png" src-width="389" src-height="70" align="center"/>

## preload

preload是一个枚举属性，它的意思是让我们给浏览器提出一个<b>建议</b>，希望让浏览器使用何种加载方式以达到最好的用户体验。

但它只是个建议，浏览器并不被强制遵循该属性的规范。

preload的值可以是：

1. `none`：该音频不会被缓存。意为用户可能不会播放该音频，或者服务器希望节省带宽；
2. `metadata`：希望获取音频的元数据 (例如音频长度) ，即使用户可能不会播放该音频；
3. `auto`：整个音频都将被加载。意为用户可能会播放音频；
4. <em>空字符串</em> : 等效于`auto`属性。不同浏览器会有自己的默认值，规范建议的默认值为 `metadata`。

- 注意，`autoplay` 属性的优先级高于 `preload`。

# Event

我们也可以通过audio播放器自带的各种事件来对某些值发生变化的时候进行监听。由于事件的用法云云在别处有介绍，这里不再赘述，仅给予常用项简单列出：

<table>
<colgroup>
<col width="324"/>
<col width="456"/>
</colgroup>
<tbody>
<tr><td><p>事件名</p></td><td><p>含义</p></td></tr>
<tr><td><p>durationchange</p></td><td><p><code>duration</code> 属性发生了变化</p></td></tr>
<tr><td><p>ended</p></td><td><p>播放到媒体的结束位置，播放停止</p></td></tr>
<tr><td><p>loadeddata</p></td><td><p>媒体的第一帧加载完成</p></td></tr>
<tr><td><p>loadedmetadata</p></td><td><p>元数据加载完成</p></td></tr>
<tr><td><p>pause</p></td><td><p>播放暂停</p></td></tr>
<tr><td><p>play</p></td><td><p>播放开始</p></td></tr>
<tr><td><p>playing</p></td><td><p>因为缺少数据而暂停或延迟的状态结束，播放准备开始</p></td></tr>
<tr><td><p>ratechange (en-US)</p></td><td><p>播放速度变化</p></td></tr>
<tr><td><p>seeked (en-US)</p></td><td><p>一次<em>获取</em> 操作结束</p></td></tr>
<tr><td><p>seeking</p></td><td><p>一次<em>获取</em> 操作开始</p></td></tr>
<tr><td><p>timeupdate</p></td><td><p>由 <code>currentTime</code> 指定的时间更新</p></td></tr>
<tr><td><p>volumechange</p></td><td><p>音量变化</p></td></tr>
</tbody>
</table>

- 注：“获取”操作是指用户正在音频中寻址，即在音频中移动或跳跃到了新的位置。

# 修改Audio的样式

一般的audio只可以通过`controls`属性来显示如上面展示的播放器样式，但是我们不一定在所有时候都满意于这个固定的播放器样式。根据我们上面所说的属性和事件，我们可以对其进行修改。

修改的关键点在于播放、音量调节等等JS逻辑的实现。我们的实现中可能不一定需要还原`controls`属性带给我们的所有功能。audio的属性和CSS的设置则根据个人喜好设计即可。

比如举个编写播放的例子：

```html
<div class="audio_button">
    <audio id="myaudio">
        <source src=".../xx.mp3">
    </audio>
</div>
```

```js
var x = document.getElementById('Audio');
//获取audio的对象到变量x中

//获取到对自定义audio这个div的点击
$('.audio_button').click(function() {

    if(audio.paused){ //如果当前是暂停状态
        $('.audio_button').css({'...'});  //改变css值，显示为播放
        audio.play(); //播放
        return;
    }
    
    else{//当前是播放状态
        $('.audio_button').css({'...'});  //改变css值，显示为暂停
        audio.pause(); //暂停
    }
});
```

这样就完成了对播放/暂停功能的编写。

