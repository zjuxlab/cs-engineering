---
title: UserAgent
slug: UserAgent
sidebar_position: 0
---


# UserAgent

本文介绍在移动端适配中User-Agent的作用

# 为什么需要UserAgent

移动端适配的目的是让拥有不同屏幕大小的终端设备拥有一致的 UI 界面，让拥有更大屏幕的终端展示更多的内容。首先我们需要判断<b>我们面对的终端设备是否为移动端</b>。

# 什么是User-Agent

User-Agent简称UA，是一个包含设备信息的<b>字符串</b>，里面包括软件的应用类型、操作系统、软件开发商以及版本号。

## <b>语法：</b>

`User-Agent: <product> / <product-version> <comment>`

1. product---产品识别码 
2. product-version---产品版本号
3. comment---对于产品的注释 

<b>浏览器的User-Agent格式：</b>

`User-Agent: Mozilla/<version> (<system-information>) <platform> (<platform-details>) <extensions>`

## <b>举例</b>

不同浏览器的UA格式大体一致，以FireFox来说：

`Firefox：`<em>Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion</em>

- <em>*Mozilla/5.0 *是一个通用标记符号，用来表示与 Mozilla 兼容，这几乎是现代浏览器的标配。</em>
- <b>platform</b><b> 用来说明浏览器所运行的原生系统平台（例如 Windows、Mac、Linux 或 Android），以及是否运行在手机上。搭载 Firefox OS 的手机仅简单地使用了 "Mobile" 这个字符串；因为 web 本身就是平台。注意 *platform *可能会包含多个使用 "; " 隔开的标记符号。参见下文获取更多的细节信息及示例</b>。
- <em>rv:geckoversion 表示 Gecko 的发布版本号（例如 "17.0"）。在近期发布的版本中，geckoversion 表示的值与 firefoxversion</em><b> </b><em>相同。</em>
- <em>Gecko/geckotrail 表示该浏览器基于 Gecko 渲染引擎。</em>
- <em>在桌面浏览器中，geckotrail 是固定的字符串 "20100101" 。</em>
- <em>Firefox/firefoxversion 表示该浏览器是 Firefox，并且提供了版本号信息（例如 "17.0"）</em>

## summary

略去目前不关注的细节，简单来说，如果浏览器在移动端使用，UA字符串里会包含：

`mobile|android|iphone|ipad|phone`等字符串(lowercase)

在浏览器控制台输入navigator.userAgent，就可以查看当前的UA，修改不同的机型可查看各种机型的UA。

# 应用示例

js中，navigator.userAgent可以获得UA，以下是两个判断移动端的js代码示例

一、

```js
function(){  //to judge if the device is mobilephont or computer
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios
    if (isiOS || isAndroid) {
      this.mobileFlag=1;
    } else {
      this.mobileFlag=0;
    }  //set mobile
  }
```

二、

```js
// Put the User Agent string in lowercase
var ua = navigator.userAgent.toLowerCase();
if (/mobi|android|iphone/i.test(ua)) {
    // do something here
} else {
    // if not identified, still do something useful
}
```

# 其他

UA用于移动端适配已足够，但是UA判断是否一定可靠呢？

实际上浏览器可以通过修改UA来进行欺骗。这不在本文的讨论范围，有兴趣请参考

[JavaScript 侦测手机浏览器的五种方法 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html)

