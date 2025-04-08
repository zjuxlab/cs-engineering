---
title: Node.js
slug: Node.js
sidebar_position: 3
---


# Node.js

<<<<<<< HEAD
2009年，Ryan Dahl做了一件当时看来极其叛逆的事——<b>把JavaScript从浏览器的沙箱中"劫持"出来</b>，让它能在服务器上自由奔跑。这就像给动物园里的猎豹解开了项圈，突然发现它能在野外生存得更好。

当时的服务器端生态由Java、PHP和Ruby主导，典型的Web服务器代码是这样的：

```
// Java Servlet示例
public class HelloServlet extends HttpServlet {
  protected void doGet(HttpServletRequest request, 
                      HttpServletResponse response) {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println("<html><body>");
    out.println("<h1>Hello World</h1>");
    out.println("</body></html>");
  }
}
```

这种模式存在几个痛点：

- <b>阻塞式I/O</b>：每个请求独占线程，高并发时资源耗尽
- <b>开发效率低</b>：简单功能需要大量样板代码
- <b>前后端割裂</b>：不同语言导致重复劳动

Dahl的突破在于发现了JavaScript的<b>事件循环</b>模型与<b>非阻塞I/O</b>是天作之合，于是用C++编写了Node.js的核心引擎，让V8 JavaScript引擎能直接在操作系统层面运行。

## 为什么我们需要Node.js？

### I/O密集型应用的性能突破

Node.js的<b>事件驱动架构</b>就像高效的餐厅服务员，对于传统多线程模型来说（每个顾客一个服务员），当顾客思考要点什么时，服务员只能干等。对于Node.js模型来说（一个服务员处理所有顾客），当顾客思考时，服务员去服务其他顾客。

### 统一全栈开发语言

Node.js统一了全栈开发语言，提升了代码复用率，同时减短了全栈开发工程师的培养周期。

```
// 前后端共享验证逻辑
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 前端
form.onsubmit = () => {
  if (!isValidEmail(input.value)) {
    showError();
    return false;
  }
};

// 后端
app.post('/register', (req, res) => {
  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
});
```

## 为什么我们如今必须学习Node.js

- <b>开发者体验优先</b>
`npm init -y`比Java的Maven配置简单100倍
- <b>JavaScript的统治地位</b>
全球开发者基数最大的语言
- <b>微服务友好</b>
轻量级、快速迭代的特性完美契合微服务架构
- <b>企业级支持</b>
AWS Lambda、Google Cloud Functions等均优先支持Node.js

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
