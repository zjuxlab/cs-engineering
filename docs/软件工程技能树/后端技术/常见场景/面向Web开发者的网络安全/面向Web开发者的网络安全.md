---
title: 面向 Web 开发者的网络安全
slug: 面向 Web 开发者的网络安全
sidebar_position: 3
---


# 面向 Web 开发者的网络安全

Author: 刘仁钦

[博客原文](https://blog.codecyrus.com/posts/web-security-for-developers/)

最近在review组员写的后端代码的时候，发现了很多不安全的代码，对于没有相关知识的开发者来说，确实很难意识到这些代码可能带来的安全问题。因此我打算写一篇文章，梳理一下Web开发中常见的安全问题，以及解决方案。

开发者是网络安全的第一道防线，如果可以将漏洞抹杀在开发阶段，那么也就没有了后面的0day、1day、应急响应之类的事情了。作为Web开发者，了解一些基本的网络安全知识非常重要。

本文所涵盖的漏洞都是最初级但也最常见的漏洞。为了便于复现，我也写了一个简单的Web应用，包含了多个漏洞，便于学习和漏洞的复现。有兴趣也可以尝试：[vulnerable-website](https://github.com/cyrus28214/vulnerable-website)

## <b>前端校验陷阱</b>

前端校验是不可靠的。在Web开发中，一些开发者会想当然地认为前端校验可以防止恶意用户提交危险数据。但实际上前端校验的目的是提示用户输入不正确，而不能防止提交恶意数据。

即使前端在页面中做了校验，比如当输入的用户名长度大于20时，弹窗提示用户用户名长度过长，并拒绝发送请求。但是我们只需要通过Chrome Devtools的Network面板，查看请求包体的格式，然后直接用devtools的console，或者使用cURL、postman等任何方法发送请求，即可将不合法的数据提交给后端。此时若后端数据未做验证，则会导致恶意构造的数据进一步被提交到数据库中。

### <b>解决方案</b>

假设有前端代码：

```js
function validateForm() {
    const username = document.getElementById('username').value;
    if (username.length > 20) {
        alert('用户名长度不能超过20个字符');
        return false;
    }
    fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ username: username })
    });
    return true;
}
```

正确的做法应该是在后端再次验证数据。

```go
package main

import (
    "net/http"
    "strings"
)

func registerHandler(w http.ResponseWriter, r *http.Request) {
    username := r.FormValue("username")
    // 正确做法，在后端再次验证数据
    if len(username) > 20 {
        http.Error(w, "用户名长度不能超过20个字符", http.StatusBadRequest)
        return
    }
    // ...
}
```

## <b>SQL注入</b>

SQL注入是攻击者通过向应用程序注入恶意的SQL片段，从而改变SQL语句的执行逻辑。假如后端使用这样的逻辑处理用户登录：

```sql
SELECT * FROM users WHERE username = 'cyrus' AND password = '123456';
```

如果后端程序直接将用户输入的username和password拼接成SQL语句，那么当用户输入密码为`' OR 1=1; --`时，SQL语句将变为：

```sql
SELECT * FROM users WHERE username = 'cyrus' AND password = '' OR 1=1; --';
```

而这个语句会返回所有用户，从而导致成功登录任何用户。

### <b>解决方案</b>

由于ORM框架的广泛流行，现在SQL注入漏洞已经很少见了。ORM框架底层使用参数化查询语句来避免SQL注入，参数化查询语句就是用带有占位符的预备SQL语句，加上一系列参数来替换占位符。

```js
// 使用Drizzle ORM
const res = await db
  .select()
  .from(users)
  .where(
    and(
      eq(users.username, username),
      eq(users.password, password)
    )
  );

// 参数化查询大概就是这样
const res = await db.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password]
);
```

使用ORM的链式查询语句，一般来说不会造成SQL注入，需要警惕的是某些复杂场景下，我们绕过ORM构造SQL语句的时候，一定要使用参数化查询语句。

## <b>XSS</b>

XSS（Cross-Site Scripting），即跨站脚本攻击，是指攻击者通过向应用程序注入恶意的JavaScript代码，从而改变应用程序的执行逻辑。

XSS漏洞有很多类型，存储型，反射型，dom型。共同特征是没有对HTML进行充分转义，导致HTML被解析为DOM而不是当做文本处理。

一个典型的场景就是支持富文本编辑的评论区。为了支持加粗、斜体、下划线等功能，前端可能会直接使用`innerHTML`来渲染评论内容。

```js
const comment = document.getElementById('comment');
// 假设这里是从后端接口获取的评论内容
comment.innerHTML = '这里有一个<strong>XSS</strong>漏洞';
```

那么既然`strong`标签可以用，那么`script`标签也可以用，攻击者可以发送这样的评论：

```html
<script>alert('XSS')</script>
```

然后其他用户打开评论区的时候，就会弹出alert框。能弹窗也就能执行其他的命令，比如跳转页面，窃取cookie，等等。

### <b>解决方案</b>

建议永远使用经过充分验证的相关的库来转义HTML，例如前端可以使用`sanitize-html`、`DOMPurify`等库。

最好不要手动进行过滤，因为你不知道攻击者有多少种花式绕过的方法。

## <b>CSRF</b>

CSRF（Cross-Site Request Forgery），即跨站请求伪造，是一种利用用户已登录身份的攻击方式。攻击者通过伪造请求，让受害者在不知情的情况下向目标网站提交恶意操作，例如修改密码、转账等。

假设有一个银行网站`bank.com`，提供了转账功能，后端使用Cookie验证用户登录状态。

然而，钓鱼网站`evil.com`可以伪造转账请求：

```html
<!-- 如果使用GET -->
<img src="https://bank.com/transfer?amount=1000&to=attacker">

<!-- 如果使用POST -->
<form action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="amount" value="1000">
    <input type="hidden" name="to" value="attacker">
</form>
```

因为浏览器的策略是，无论页面是否来自同一个域，只要请求的目标是`bank.com`，浏览器就会自动带上`bank.com`的Cookie。

### <b>解决方案</b>

如果你曾经写过一些大网站的爬虫，你就会发现他们的接口基本上都要带上一个CSRF Token。例如我前端时间写的[推特爬虫](https://github.com/cyrus28214/twitter-crawler)，就需要在请求头上带上CSRF Token，

```json
{
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "authorization": "Bearer ******",
        "Cookie": "auth_token=******; ct0=******;",
        "x-csrf-token": "******"
    }
}
```

这里的`x-csrf-token`就是CSRF Token。推特这里的做法是，在前端页面随机生成一串字符串，用来设置`Cookie`的`ct0`和请求中的`x-csrf-token`。

当后端收到请求时，会验证请求中的`x-csrf-token`和`Cookie`中的`ct0`是否一致。如果一致，就能说明发起请求网站具有给用户设置cookie的权限，也就验证了请求同源，算是对浏览器安全策略的一种补偿。

事实上，浏览器方面也在积极推进cookie同源策略的使用，`Cookie`的`SameSite`属性就可以管理跨域cookie的范围：

`SameSite`属性有三个值：

- `None`：允许跨域请求携带cookie
- `Lax`：允许跨域请求携带cookie，但只允许get请求携带
- `Strict`：禁止跨域请求携带cookie

<table>
<colgroup>
<col width="200"/>
<col width="200"/>
<col width="200"/>
<col width="200"/>
<col width="200"/>
</colgroup>
<tbody>
<tr><td><p>请求类型</p></td><td><p>示例</p></td><td><p><code>None</code></p></td><td><p><code>Lax</code></p></td><td><p><code>Strict</code></p></td></tr>
<tr><td><p>链接</p></td><td><p><code>&lt;a href=&quot;...&quot;&gt;&lt;/a&gt;</code></p></td><td><p>发送 Cookie</p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td></tr>
<tr><td><p>预加载</p></td><td><p><code>&lt;link rel=&quot;prerender&quot; href=&quot;...&quot;/&gt;</code></p></td><td><p>发送 Cookie</p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td></tr>
<tr><td><p>GET 表单</p></td><td><p><code>&lt;form method=&quot;GET&quot; action=&quot;...&quot;&gt;</code></p></td><td><p>发送 Cookie</p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td></tr>
<tr><td><p>POST 表单</p></td><td><p><code>&lt;form method=&quot;POST&quot; action=&quot;...&quot;&gt;</code></p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td><td><p>不发送</p></td></tr>
<tr><td><p>iframe</p></td><td><p><code>&lt;iframe src=&quot;...&quot;&gt;&lt;/iframe&gt;</code></p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td><td><p>不发送</p></td></tr>
<tr><td><p>AJAX</p></td><td><p><code>$.get(&quot;...&quot;)</code></p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td><td><p>不发送</p></td></tr>
<tr><td><p>Image</p></td><td><p><code>&lt;img src=&quot;...&quot;&gt;</code></p></td><td><p>发送 Cookie</p></td><td><p>不发送</p></td><td><p>不发送</p></td></tr>
</tbody>
</table>

但是由于历史兼容性，`SameSite`属性的默认值是`None`或`Lax`（不同浏览器有所不同），因此开发者需要特别注意手动设置`SameSite`属性。

```java
@RestController
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request, HttpServletResponse response) {
        // ....

        Cookie sessionCookie = new Cookie("session", sessionToken);
        sessionCookie.setHttpOnly(true);
        sessionCookie.setSecure(true); // HTTPS
        sessionCookie.setPath("/");
        sessionCookie.setMaxAge(24 * 60 * 60); // 1 天
        sessionCookie.setAttribute("SameSite", "Strict"); // 设置 SameSite

        response.addCookie(sessionCookie);
        return "登录成功";
    }

    static class LoginRequest {
        public String username;
        public String password;
    }
}
```

## <b>SSRF</b>

SSRF（Server-Side Request Forgery），即服务器端请求伪造，是指攻击者通过伪造请求，让服务器端执行恶意操作，例如读取文件、执行命令等。

假设一个这样的场景，你在开发一个大语言模型应用。你的应用可以读取用户输入中的网页地址，对网页进行读取，然后返回分析结果给用户。

这里可能出现的漏洞很多，其中一个就是假如用户输入一个内网地址，`192.168.1.1`，那么服务器就会向某个内网服务发起请求，LLM可能读取到内网敏感数据，并返回给用户。

那如果限制用户不能输入ip地址，是不是就安全了呢？

其实不是的，攻击者可以将域名绑定到内网ip，比如让`evil.com`解析到内网ip`192.168.1.1`，然后用户输入`https://evil.com`，那么服务器就会向内网ip`192.168.1.1`发起请求。

那么如果先对用户输入的地址进行DNS解析，然后对ip地址进行限制，是不是就安全了呢？

也许吧，但是这里如果处理不慎，还是有机会遭受<b>DNS rebinding攻击</b>，这里就不展开了。

这里还要注意，为了防止用户输入`file://`这种协议访问本地数据，还需要对协议类型进行限制。

### <b>解决方案</b>

- 白名单机制，限制请求目标
- 使用沙箱隔离内网环境
- 限制协议类型，只允许http/https请求，且禁用重定向

## <b>上传文件</b>

上传文件是漏洞频发的地方，常见的问题有：

- 通过上传文件挂马：例如，上传一个伪装为图片的PHP文件shell.jpg，内容为一句话木马`<?php system($_GET['cmd']); ?>`，然后通过其他漏洞造成此文件被执行，实现拿shell。
- 文件覆盖：如果后端未对文件进行重命名，保存文件的时候可能会覆盖同名文件，导致越权修改，甚至任意文件写。
- 目录穿越：如果上传的文件名包含`../`这样的字符串，并且在处理路径的时候未重命名，可能会造成任意文件写。
- 资源滥用：未对上传的文件进行大小检查，未对用户可上传的资源容量进行限制，或者没有文件过期删除机制。服务器资源会被滥用，造成储存空间不足。你的服务器还可能变成攻击者的免费网盘/图床。
- 隐私泄露：对用户上传的文件进行访问权限控制，防止用户隐私泄露，例如[阿里云盘的漏洞](https://baijiahao.baidu.com/s?id=1810250657195019656&wfr=spider&for=pc)导致了用户查看到了别人网盘中的文件

### <b>解决方案</b>

- 对文件大小进行限制
- 不使用原文件名，随机生成文件名
- 限制文件访问权限

（现在大多使用s3储存来代替本地储存，s3储存也能解决部分安全问题，但是不能解决所有问题）

## <b>逻辑漏洞</b>

其实上面这些常见的漏洞，都有很多现成的解决方案，只要开发者稍加注意，就能避免大部分漏洞。甚至还有一些代码检查工具能够检测出代码中潜在的这些漏洞。

但是和业务相关的逻辑漏洞，往往很难被发现，也很容易带来重大损失，特别是和钱相关的业务。

考虑一个常见的场景，首月充值优惠，用户首月充值只需要9元，后面每个月需要29元。逻辑如下：

1. 用户发起充值会员请求
2. 后端根据用户是否存在消费记录，判断是否首月优惠
3. 根据是否首月优惠，创建9元/29元的订单，接入第三方支付模块
4. 用户支付成功后，后端根据支付结果，将用户会员时长增加一个月，同时添加用户消费记录

![](/assets/Q7hbb4I7GoBKVoxlTCOcLuTHnLa.png)

这个逻辑的漏洞在于<b>用户可以重复发起充值请求</b>，而我们对首月优惠的校验是在创建订单的时候执行的。也就是说，用户可以发起充值请求，创建9元支付订单，然后放着先不付款，多创建几个9元订单，最后一起付款，这样就可以让首月充值优惠多次生效。

解决方案有很多，最简单的就是将这个支付逻辑改成送新客优惠券，然后复用其他优惠逻辑。

## <b>参考</b>

- [https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#browser_compatibility](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#browser_compatibility)
- [https://wiki.wgpsec.org/knowledge/ctf/uploadfile.html](https://wiki.wgpsec.org/knowledge/ctf/uploadfile.html)

