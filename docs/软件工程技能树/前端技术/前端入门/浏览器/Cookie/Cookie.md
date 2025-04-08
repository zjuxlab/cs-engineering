---
title: Cookie
slug: Cookie
sidebar_position: 2
---


# Cookie

Author:NA

## Cookie的诞生背景

1994年，当网景通信（Netscape Communications）的工程师Lou Montulli正在开发最早的电子商务网站时，他遇到了一个根本性问题——<b>HTTP协议的无状态特性</b>。就像每次见面都把你当作陌生人的服务员，早期的Web服务器无法记住之前的任何请求。这意味着：

- 用户每点击一个链接都被视为全新访客
- 购物车无法记住已选商品
- 登录状态在页面刷新后立即消失

Montulli从Unix系统的"magic cookie"概念获得灵感，创造了Web Cookie技术。这个命名源自幸运饼干（Fortune Cookie）——里面藏着小纸条的甜点，完美隐喻了Cookie在浏览器中存储小数据的特性。

## Cookie的版本迭代

### 石器时代（1994-1996）

- <b>Netscape Navigator 0.9beta</b>：首个支持Cookie的浏览器
- 最初规范仅包含：

```html
Set-Cookie: user_id=12345; path=/
```

### 标准化时代（1997-2011）

- <b>RFC 2109</b>（1997）：首个正式标准，引入`Max-Age`、`Secure`等属性
- <b>RFC 2965</b>（2000）：尝试推广`Set-Cookie2`（最终失败）
- 浏览器大战导致实现差异：IE与Netscape处理方式不同

### 现代安全时代（2011至今）

- <b>RFC 6265</b>（2011）：统一标准，废弃Cookie2
- 关键安全增强：

```html
Set-Cookie: sessionID=abc123; Secure; HttpOnly; SameSite=Lax
```

- <b>GDPR</b>（2018）：要求明确告知Cookie使用

## Cookie的工作原理

当服务器需要记住客户端状态时，会在响应中包含：

```html
HTTP/1.1 200 OKSet-Cookie: user_token=xyz789; Max-Age=3600; Path=/; Secure
```

浏览器会像保存小纸条一样存储这些信息，并在后续请求中自动携带：

```html
GET /account HTTP/1.1Cookie: user_token=xyz789
```

Cookie 主要用于以下三个方面：

- 会话状态管理

如用户登录状态、购物车、游戏分数或其他需要记录的信息

- 个性化设置

如用户自定义设置、主题和其他设置

- 浏览器行为跟踪

如跟踪分析用户行为等

曾经由于没有更合适的方法，cookie被用来存储客户端数据。但由于浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销，再加上现在有了新的存储数据的API（<em>localStorage</em>等），所以就不要再用cookie存储客户端数据了。

既然cookie是存储于本地的一小块数据，那么这块数据以何格式从服务器获取，作用域和生命周期怎么定义，数据有无大小限制，又该如何保证cookie的安全传输呢？接下来逐条说。

## 创建cookie

1. 在首次访问网站时，浏览器发送请求中并未携带Cookie。
2. 服务器看到请求中未携带Cookie，在HTTP的响应头中加入`Set-Cookie`。

```css
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

1. 浏览器收到`Set-Cookie`后，会将Cookie保存下来
2. 下次再访问该网站时，HTTP请求头就会携带Cookie。

```css
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

## Set-Cookie

cookie始于一个cookie的名称/值对，&lt;cookie-value&gt;是可选的。此外还有很多属性可以设置：
- `Expires=<date>` ：可选，若无代表这是一个会话期cookie。
- `Max-Age=<number>`：cookie经过多少秒失效，优先级在`Expires`之上。
- `Domain=<domain-value>`：指定 cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）。
- `Path=<path-value>`：指定一个 URL 路径，这个路径<em>必须</em>出现在要请求的资源的路径中才可以发送 `Cookie` 标头。具体在作用域部分会解释。
- `Secure`：只有在请求使用 `https:` 协议的时候才会被发送到服务器。
- `HttpOnly`：用于阻止 JavaScript 通过 `Document.cookie` 属性访问 cookie。
- `SameSite=<samesite-value>`：也在下文作用域部分解释。
此外还存在特殊的cookie名称前缀：名称中包含 `__Secure-` 或 `__Host-` 前缀的 cookie，只可以应用在使用了安全连接（HTTPS）的域中，需要同时设置 `secure` 属性。
另外，假如 cookie 以 `__Host-` 为前缀，那么 path 属性的值必须为 `/`（表示整个站点），且不能含有 `Domain` 属性。

fetch默认对服务端通过`Set-Cookie`头设置的cookie会忽略

## 生命周期

Cookie 的生命周期可以通过两种方式定义：

- <em>会话期</em> Cookie 会在当前的会话结束之后删除。浏览器定义了“当前会话”结束的时间。（一<em>些浏览器重启时会使用会话恢复。这可能导致会话 cookie 无限延长）</em>
- <em>持久性</em> Cookie 在过期时间（`Expires`）指定的日期或有效期（`Max-Age`）指定的一段时间后被删除。
    `Max-Age`优先级在`Expires`之上。

```html
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

## 作用域

## Domain 属性

`Domain` 指定了哪些主机可以接受 Cookie。如果不指定，该属性默认为同一 host 设置 cookie，<em>不包含子域名</em>。如果指定了 `Domain`，则一般包含子域名。因此，指定 `Domain` 比省略它的限制要少。

例如，如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如 `developer.mozilla.org`）。

## Path 属性

`Path` 属性指定了一个 URL 路径，该 URL 路径必须存在于请求的 URL 中，以便发送 `Cookie` 标头。以字符`“/”` 作为路径分隔符，并且子路径也会被匹配。

例如，设置 `Path=/docs`，则以下地址都会匹配：
- `/docs`
- `/docs/`
- `/docs/Web/`
- `/docs/Web/HTTP`

但是这些请求路径不会匹配以下地址：
- `/`
- `/docsets`
- `/fr/docs`

## SameSite 属性

用于设定cookie是否随着跨站请求一起发送。注意：来自同一域的 cookie 若使用了不同的协议（`http:` 或 `HTTPS:`），将不再被视为来自同一站点。该属性有三个值。

- `Strict`
    - : 意味着这是一个同站 `cookie`，只能作为第一方cookie。即请求来自设置 cookie 的站点。如果请求来自不同的域或协议（即使是相同域），则携带有 `SameSite=Strict` 属性的 cookie 将不会被发送。

- `Lax`
    - : 这意味着 cookie 不会在跨站请求中被发送，如：加载图像或 frame 的请求（这两个会作为例子在下面提到）。但 cookie 在用户从外部站点导航到源站时，cookie 也将被发送（通过链接跳转）。这是 `SameSite` 属性未被设置时的<b>默认</b>行为。

- `None`
    - : 这意味着浏览器会在跨站和同站请求中均发送 cookie。在设置这一属性值时，必须同时设置 `Secure` 属性，就像这样：`SameSite=None; Secure`。

## 同站与同域

既然说到`SameSite`中的跨站请求，那怎么才能判定到底是跨站还是同站呢？<b>在遇到一个域名时，会首先匹配列表中的后缀，再把eTLD+1个字段相同表示为同站，不同表示为非同站。</b>而这个有效顶级域名，eTLD，并不一定只有一个字段（如github.io)，实际上浏览器是通过<em>Public Suffix List</em>列表来确定哪些是有效顶级域名。

比如`a.baidu.com.cn`与`b.baidu.com.cn`属于同站， `github.com`与`other.com`属于跨站。当一个请求本身的 URL 和它的发起页面的 URL 不属于同一个站点时，这个请求就算第三方请求。

跨站是比跨域更宽松的一种限制。可以这么说如果跨站，那么肯定会跨域，但如果跨域，那么不一定会跨站。如端口不同，子域名不同（`a.baidu.com.cn`与`b.baidu.com.cn`）都属于跨 域，但不属于跨站。

## 其它规则

### 大小限制

不同浏览器对cookie限制不同，个数上限大多在20-50个，总大小上限在4kb左右。

### js修改cookie

在浏览器中用js修改cookie，相当于重新设置。并且js中没有直接删除Cookie的方法。如果需要删除某个Cookie，需要重新设置该Cookie，将它的有效期直接设置为过期，即可实现删除功能。

```js
//设置cookie  
document.cookie = "a=1;";
document.cookie = "a=1; doamin=google.com";

//删除cookie
document.cookie = "a=1; max-age=-1";

//读取cookie
document.cookie
```

而在读取cookie时，也只能读取到名称和值，而不能读取到属性。

## 第三方cookie

### 现状与漏洞

目前第三方cookie有可能被利用于CSRF攻击，即在第三方网站中，利用不显示的图片，或`iframe`等，调用本地的cookie，伪造用户给服务器发送恶意请求。如下就是一个利用`iframe`的CSRF攻击例子，用户只要点进网站，恶意网站就会提交表单，给bank-example发送使用第三方cookie的转账POST请求。

```html
<iframe style="display: none;" name="csrf-frame"></iframe>
<form method='POST' 
  action='http://bank-example/transfer'
  target="csrf-frame" id="csrf-form">
  <input type='hidden' name='to user' value= 'hack01'>
  <input type='hidden' name= 'money' value='1000000'>
  <input type='submit' value= ' submit'>
<form>
<Script>document,getElementById("csrf-form").submit()</script>
```

CSRF攻击的存在，是因为服务器验证不充分，所以一种解决方法就是上面提到的，在设置cookie时添加`SameSite`属性，这样就阻止了部分第三方cookie的发送。还有其它方法如：验证码，核对referer（但某些浏览器也可以篡改referer），加入随机token等。

### 未来

因上面说到的安全漏洞，为了保护用户的隐私，浏览器供正在逐步停止对第三方 <b>Cookie</b> 的支持。目前 <b>Safari</b> 已经完全禁止了三方 <b>Cookie</b>，<b>Chrome</b> 也宣布将逐步弃用。一个叫<b>Privacy Sandbox</b>的计划正在为解决第三方cookie的方案进行试验，有不少提议方案，如`CHIPS`（拥有独立分区状态的Cookies）和`First-Party Set`。

### [CHIPS](https://github.com/privacycg/CHIPS)

CHIPS引入了一个新的 cookie 属性， `Partitioned`。

当用户访问站点A并嵌入内容来自站点C时，设置一个带有 `Partitioned` 属性的cookie，这个cookie 被存到了 `partitioned jar`，该 `partitioned jar` 只用于存储站点C嵌入站点A时 设置的cookie。浏览器只会在顶级站点A时发送cookie。（下面左图为原来的，中图为加了 `Partitioned`属性的cookie，右图表示即使在顶级站点为c时也不会使用该分区cookie）

<div class="flex gap-3 columns-3" column-size="3">
<div class="w-[36%]" width-ratio="36">
![](/assets/Vtdrbvcmzoj9JTxzrtVcPfypnle.png)
</div>
<div class="w-[36%]" width-ratio="36">
![](/assets/LxLCbinEvo7SbVxGz16cGRz6nSd.png)
</div>
<div class="w-[27%]" width-ratio="27">
![](/assets/C725b1ideoyI9VxUVKnc3fOEnLg.png)
</div>
</div>

只需在设置cookie时添加 `Partitioned`属性即可。

```html
Set-Cookie: __Host-name=value; Secure; Path=/; SameSite=None; Partitioned;
```

### [First-Party Sets](https://github.com/WICG/first-party-sets)

说白了这个方案的意思是，通过一系列策略，扩大第一方cookie的定义范围（比如登录`.tmall.com`时存储在`taobao.com`域下的cookie可被视为第一方cookie），再禁止第三方cookie就可以减小带来的不便。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
<p>目前 <code>First-Party Sets</code> 确定的原则如下：</p>
<ul>
<li><p><code>First-Party Sets</code> 中的域必须由同一组织拥有和运营。</p>
</li>
<li><p>所有域名应该作为一个组被用户识别。</p>
</li>
<li><p>所有域名应该共享一个共同的隐私政策。</p>
</li>
</ul>
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/Z8TtbnNV9od97ux1C46c5OjdnId.png)
</div>
</div>

所有开启了  `First-Party Sets` 域名下需要共享的 `Cookie` 都需要增加 `SameParty` 属性。这时我在 `taobao.com` 下发送 `.tmall.com` 域名的请求，`Cookie` 也可以被携带了，但是如果我在另外一个网站，例如 `eval.site` 下发送这个请求， `Cookie` 就不会被携带。

