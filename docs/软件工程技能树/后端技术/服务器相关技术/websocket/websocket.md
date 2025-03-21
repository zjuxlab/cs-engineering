---
title: websocket
slug: websocket
sidebar_position: 0
---


# websocket

Author: 马寿祥

# 简介

WebSocket是一种在单个TCP连接上进行全双工通信的协议。WebSocket通信协议于2011年被IETF定为标准RFC 6455，并由RFC7936补充规范。WebSocket API也被W3C定为标准。

WebSocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

> WebSocket是HTML5最新提出的规范，虽然主流浏览器都已经支持，但仍然可能有不兼容的情况，为了兼容所有浏览器，给程序员提供一致的编程体验，SocketIO将WebSocket、AJAX和其它的通信方式全部封装成了统一的通信接口，也就是说，我们在使用SocketIO时，不用担心兼容问题，底层会自动选用最佳的通信方式。因此，WebSocket是SocketIO的一个子集。

<i>引自：</i><em>https://blog.csdn.net/AIWWY/article/details/121588322</em>

一个示例的 WebSocket 链接格式如下：

- 加密：wss://example.com/ws/updates 
- 未加密：ws://example.com/ws/updates 

# 预备知识

## Web IDL

不了解也没关系，因为WebSocket协议真的非常简单

是用来描述软件组件介面的一种计算机语言。IDL通过一种独立于编程语言的方式来描述接口，使得在不同平台上运行的对象和用不同语言编写的程序可以相互通信交流。

参考：https://juejin.cn/post/7152689021674586120

## HTTP协议

了解http报文格式就好

请求报文

![](/assets/WECGbJYmtobo4QxXsrhcSYGinlh.png)

响应报文

![](/assets/YnXmbNT1DoU4g0xQeH3c31AGnLe.png)

# 特点

## 与http协议比较

### 相同点

> - 都是基于TCP的应用层协议；
> - 都使用Request/Response模型进行连接的建立；
> - 在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码；
> - 都可以在网络中传输数据。

### 不同点

> - WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用；
> - WS的连接不能通过中间人来转发，它必须是一个直接连接；
> - WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据；
> - WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息；
> - WS的数据帧有序。

<em>引自：https://blog.csdn.net/LL845876425/article/details/106393358</em>

## 为什么要使用WebSocket

> 在WebSocket出现之前，为了实现即时通信，采用的技术都是“轮询”，即在特定的时间间隔内，由浏览器对服务器发出HTTP Request，服务器在收到请求后，返回最新的数据给浏览器刷新，“轮询”使得浏览器需要对服务器不断发出请求，这样会占用大量带宽。
> WebSocket采用了一些特殊的报头，使得浏览器和服务器只需要做一个握手的动作，就可以在浏览器和服务器之间建立一条连接通道。且此连接会保持在活动状态，你可以使用JavaScript来向连接写入或从中接收数据，就像在使用一个常规的TCP Socket一样。它解决了Web实时化的问题，相比传统HTTP有如下好处：
> - 一个Web客户端只建立一个TCP连接
> - Websocket服务端可以推送(push)数据到web客户端.
> - 有更加轻量级的头，减少数据传送量

<i>引自：</i><em>https://cc.topgoer.cn/docs/golangweb/golangweb-1ck1l3rhnfn0l</em>

# 协议支持情况

## 浏览器支持

点击链接查看最新支持情况 https://caniuse.com/?search=websockets

![](/assets/CUx6bStflor5o5xS1PRcPbf7n4f.png)

从上图最新的一次更新来看，目前98%的浏览器都支持Web Sockets。

## Web 服务器支持

- Nginx 自2013 年开始支持 WebSocket，在 1.3.13版本中实现，包括充当WebSocket 应用程序的反向代理和负载均衡器。
- Apache HTTP Server从 2013 年 7 月开始支持 WebSockets，在 2.4.5 版本中实现。
- Internet Information Services在随Windows Server 2012发布的版本 8 中增加了对 WebSockets 的支持。
- lighttpd从 2017 年开始支持 WebSockets，在 1.4.46 版本中实现。lighttpd mod_proxy 可以充当 WebSocket 应用程序的反向代理和负载平衡器。lighttpd mod_wstunnel 可以构建 WebSocket 隧道以将任意数据（包括JSON格式）传输到后端应用程序。
- 自 2022 年以来，Tempesta FW 支持用于 HTTP/1.1 和 HTTPS 连接的WebSockets。RFC 8441的HTTP/2 上的 WebSockets被开发人员认为部署不够广泛且未实现。

# websocket 通信过程

第一次handshake通过以后，连接便建立成功，其后的通讯数据都是以”\x00″开头，以”\xFF”结尾。在客户端，这个是透明的，WebSocket组件会自动将原始数据“掐头去尾”。

![](/assets/DqtSblemAofMEZxmHg6cHiGanDc.png)

![](/assets/A0O1bAQenogmazxqSalcpO0WnFe.png)

## handshake

一个典型的握手请求如下：

![](/assets/O0ZebzQtIoVX0OxTywTctFltn3q.png)

在请求中的"`Sec-WebSocket-Key`"是随机的，是一个经过base64编码后的数据。服务器端接收到这个请求之后需要把这个字符串连接上一个固定的字符串：`258EAFA5-E914-47DA-95CA-C5AB0DC85B11`

例如，上图请求中

`f7cb4ezEAl6C3wRaU6JORA==`连接上那一串固定字符串，生成一个这样的字符串：`f7cb4ezEAl6C3wRaU6JORA==258EAFA5-E914-47DA-95CA-C5AB0DC85B11`

对该字符串先用 sha1安全散列算法计算出二进制的值，然后用base64对其进行编码，即可以得到握手后的字符串：`rE91AJhfC+6JdVcVXOGJEADEJdQ=`

将之作为响应头`Sec-WebSocket-Accept`的值反馈给客户端。

思考：如果握手发现websocket不可用 , 将发生什么？

# 接口定义

在 https://websockets.spec.whatwg.org/ ，可以看到 websocket 协议标准最新版本。

简单了解一下即可，具体开发时，可以看对应框架的文档。（当然，如果你要手写框架，还是可以了解一下的

## IDL版

```yaml
enum <u>BinaryType</u> { <u>"blob"</u>, <u>"arraybuffer"</u> };

[<u>Exposed</u>=(Window,Worker)]
interface <u>WebSocket</u> : <u>EventTarget</u> {
  <u>constructor</u>(<u>USVString</u> <u>url</u>, optional (<u>DOMString</u> or <u>sequence</u><<u>DOMString</u>>) <u>protocols</u> = []);
  readonly attribute <u>USVString</u> <u>url</u>;

  // ready state
  const <u>unsigned short</u> <u>CONNECTING</u> = 0;
  const <u>unsigned short</u> <u>OPEN</u> = 1;
  const <u>unsigned short</u> <u>CLOSING</u> = 2;
  const <u>unsigned short</u> <u>CLOSED</u> = 3;
  readonly attribute <u>unsigned short</u> <u>readyState</u>;
  readonly attribute <u>unsigned long long</u> <u>bufferedAmount</u>;

  // networking
  attribute <u>EventHandler</u> <u>onopen</u>;
  attribute <u>EventHandler</u> <u>onerror</u>;
  attribute <u>EventHandler</u> <u>onclose</u>;
  readonly attribute <u>DOMString</u> <u>extensions</u>;
  readonly attribute <u>DOMString</u> <u>protocol</u>;
  <u>undefined</u> <u>close</u>(optional [<u>Clamp</u>] <u>unsigned short</u> <u>code</u>, optional <u>USVString</u> <u>reason</u>);

  // messaging
  attribute <u>EventHandler</u> <u>onmessage</u>;
  attribute <u>BinaryType</u> <u>binaryType</u>;
  <u>undefined</u> <u>send</u>((<u>BufferSource</u> or <u>Blob</u> or <u>USVString</u>) <u>data</u>);
};

[<u>Exposed</u>=(Window,Worker)]
interface <u>CloseEvent</u> : <u>Event</u> {
  <u>constructor</u>(<u>DOMString</u> <u>type</u>, optional <u>CloseEventInit</u> <u>eventInitDict</u> = {});

  readonly attribute <u>boolean</u> <u>wasClean</u>;
  readonly attribute <u>unsigned short</u> <u>code</u>;
  readonly attribute <u>USVString</u> <u>reason</u>;
};

dictionary <u>CloseEventInit</u> : <u>EventInit</u> {
  <u>boolean</u> <u>wasClean</u> = false;
  <u>unsigned short</u> <u>code</u> = 0;
  <u>USVString</u> <u>reason</u> = "";
};
```

## For web developers (non-normative)

```js
socket = new WebSocket(url [, protocols ])
    //Creates a new WebSocket object, immediately establishing the associated WebSocket connection.
    //url is a string giving the URL over which the connection is established. Only "ws" or "wss" schemes are allowed; others will cause a "SyntaxError" DOMException. URLs with fragments will also cause such an exception.
    //protocols is either a string or an array of strings. If it is a string, it is equivalent to an array consisting of just that string; if it is omitted, it is equivalent to the empty array. Each string in the array is a subprotocol name. The connection will only be established if the server reports that it has selected one of these subprotocols. The subprotocol names have to match the requirements for elements that comprise the value of `Sec-WebSocket-Protocol` fields as defined by The WebSocket protocol. [WSP]

socket.send(data)
    //Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView.

socket.close([ code ] [, reason ])
    //Closes the WebSocket connection, optionally using code as the WebSocket connection close code and reason as the WebSocket connection close reason.

socket.url
    //Returns the URL that was used to establish the WebSocket connection.

socket.readyState
    //Returns the state of the WebSocket connection. It can have the values described above.

socket.bufferedAmount
    //Returns the number of bytes of application data (UTF-8 text and binary data) that have been queued using send() but not yet been transmitted to the network.
    //If the WebSocket connection is closed, this attribute’s value will only increase with each call to the send() method. (The number does not reset to zero once the connection closes.)

socket.extensions
    //Returns the extensions selected by the server, if any.


socket.protocol
    //Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor’s second argument to perform subprotocol negotiation.

socket.binaryType
    //Returns a string that indicates how binary data from socket is exposed to scripts:

    //"blob"
        //Binary data is returned in Blob form.

    //"arraybuffer"
        //Binary data is returned in ArrayBuffer form.
        
    //The default is "blob".

socket.binaryType = value
    //Changes how binary data is returned.
    
    
event.wasClean
    //Returns true if the connection closed cleanly; false otherwise.

event.code
    //Returns the WebSocket connection close code provided by the server.

event.reason
    //Returns the WebSocket connection close reason provided by the server.
```

## Example

```js
var socket = new WebSocket('ws://game.example.com:12010/updates');
socket.onopen = function () {
  setInterval(function() {
      if (socket.bufferedAmount == 0)
          socket.send(getUpdateData());
      }, 50);
};
```

```js
mysocket.onmessage = function (event) {
    if (event.data == 'on') {
        turnLampOn();
    } else if (event.data == 'off') {
        turnLampOff();
    }
};
```

# 开发文档

## Socket.IO

https://socket.io

### 是什么

Socket.IO 是一个库，可以在客户端和服务器之间实现低延迟、双向和基于事件的通信。

它建立在WebSocket协议之上，并提供额外的保证，例如回退到 HTTP 长轮询或自动重新连接。

注意：Socket.IO不是WebSocket 实现。

尽管 Socket.IO 确实在可能的情况下使用 WebSocket 进行传输，但它为每个数据包添加了额外的元数据。这就是为什么 WebSocket 客户端将无法成功连接到 Socket.IO 服务器，而 Socket.IO 客户端也将无法连接到普通 WebSocket 服务器。

### 可用的Socket.IO实现

#### 服务器实现

- JavaScript (Node.js)
    - [安装步骤](https://socket.io/docs/v4/server-installation/)
    - [API](https://socket.io/docs/v4/server-api/)
    - [源代码](https://github.com/socketio/socket.io)

- JavaScript (Deno)：[https ://github.com/socketio/socket.io-deno](https://github.com/socketio/socket.io-deno)
- Java：[https ://github.com/mrniko/netty-socketio](https://github.com/mrniko/netty-socketio)
- Java：[https ://github.com/trinopoty/socket.io-server-java](https://github.com/trinopoty/socket.io-server-java)
- Python：[https ://github.com/miguelgrinberg/python-socketio](https://github.com/miguelgrinberg/python-socketio)
- Golang：[https ://github.com/googollee/go-socket.io](https://github.com/googollee/go-socket.io)

#### 客户端实现

- JavaScript (which can be run either in the browser, in Node.js or in React Native)
    - [Installation steps](https://socket.io/docs/v4/client-installation/)
    - [API](https://socket.io/docs/v4/client-api/)
    - [Source code](https://github.com/socketio/socket.io-client)

- Java: [https://github.com/socketio/socket.io-client-java](https://github.com/socketio/socket.io-client-java)
- C++: [https://github.com/socketio/socket.io-client-cpp](https://github.com/socketio/socket.io-client-cpp)
- Swift: [https://github.com/socketio/socket.io-client-swift](https://github.com/socketio/socket.io-client-swift)
- Dart: [https://github.com/rikulo/socket.io-client-dart](https://github.com/rikulo/socket.io-client-dart)
- Python: [https://github.com/miguelgrinberg/python-socketio](https://github.com/miguelgrinberg/python-socketio)
- .Net: [https://github.com/doghappy/socket.io-client-csharp](https://github.com/doghappy/socket.io-client-csharp)
- Rust: [https://github.com/1c3t3a/rust-socketio](https://github.com/1c3t3a/rust-socketio)
- Kotlin: [https://github.com/icerockdev/moko-socket-io](https://github.com/icerockdev/moko-socket-io)

### Example

```js
import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});
```

```js
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
});
```

## 普通的WebSocket实现

### ws 

https://github.com/websockets/ws

#### Installing

```bash
npm install ws
```

#### Usage examples

##### Sending and receiving text data

```ts
import WebSocket from 'ws';

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});
```

##### Sending binary data

```ts
import WebSocket from 'ws';

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
  const array = new Float32Array(5);

  for (var i = 0; i < array.length; ++i) {
    array[i] = i / 2;
  }

  ws.send(array);
});
```

##### Simple server

```ts
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
```

For more examples, see https://github.com/websockets/ws/blob/master/README.md

### uWebSockets.js 

https://github.com/uNetworking/uWebSockets.js

#### 是什么

µWebSockets.js 是 Node.js 的 HTTP/WebSocket 服务器，运行速度是 Fastify 的 8.5倍，至少是 Socket.IO 的 10 倍。它同时支持路由器和发布/订阅，适合非凡的性能需求。

#### Installing

```bash
yarn add uWebSockets.js@uNetworking/uWebSockets.js#v20.10.0
```

#### Usage examples

```ts
/* Non-SSL is simply App() */
require('uWebSockets.js').SSLApp({

  /* There are more SSL options, cut for brevity */
  key_file_name: 'misc/key.pem',
  cert_file_name: 'misc/cert.pem',
  
}).ws('/*', {

  /* There are many common helper features */
  idleTimeout: 32,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  compression: DEDICATED_COMPRESSOR_3KB,

  /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
  message: (ws, message, isBinary) => {
    /* You can do app.publish('sensors/home/temperature', '22C') kind of pub/sub as well */
    
    /* Here we echo the message back, using compression if available */
    let ok = ws.send(message, isBinary, true);
  }
  
}).get('/*', (res, req) => {

  /* It does Http as well */
  res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!');
  
}).listen(9001, (listenSocket) => {

  if (listenSocket) {
    console.log('Listening to port 9001');
  }
  
});
```

For more examples, see https://github.com/uNetworking/uWebSockets.js/tree/master/examples

### Go

Go语言标准包里面没有提供对WebSocket的支持，但是在由官方维护的go.net子包中有对这个的支持，你可以通过如下的命令获取该包：

```go
go get golang.org/x/net/websocket
```

假设我们的客户端如下：

```html
<html>
<head></head>
<body><script type="text/javascript">
        var sock = null;
        var wsuri = "ws://127.0.0.1:82";

        window.onload = function() {

            console.log("onload");

            sock = new WebSocket(wsuri);

            sock.onopen = function() {
                console.log("connected to " + wsuri);
            }

            sock.onclose = function(e) {
                console.log("connection closed (" + e.code + ")");
            }

            sock.onmessage = function(e) {
                console.log("message received: " + e.data);
            }
        };

        function send() {
            var msg = document.getElementById('message').value;
            sock.send(msg);
        };
    </script><h1>WebSocket Echo Test</h1><form><p>
            Message: <input id="message" type="text" value="Hello, world!"></p></form><button onclick="send();">Send Message</button>
</body>
</html>
```

服务器端如下：

```go
package main

import (
    "golang.org/x/net/websocket"
    "fmt"
    "log"
    "net/http"
)

func Echo(ws *websocket.Conn) {
    var err error

    for {
        var reply string
        if err = websocket.Message.Receive(ws, &reply); err != nil {
            fmt.Println("Can't receive")
            break
        }

        fmt.Println("Received back from client: " + reply)

        msg := "Received:  " + reply
        fmt.Println("Sending to client: " + msg)

        if err = websocket.Message.Send(ws, msg); err != nil {
            fmt.Println("Can't send")
            break
        }
    }
}

func main() {
    http.Handle("/", websocket.Handler(Echo))

    if err := http.ListenAndServe(":82", nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
```

## 测试

### 使用curl测试ws连接性

```bash
curl <em>--include \</em>
     <em>--no-buffer \</em>
     <em>--header "Connection: Upgrade" \</em>
     <em>--header "Upgrade: websocket" \</em>
     <em>--header "Host: example.com:80" \</em>
     <em>--header "Origin: http://example.com:80" \</em>
     <em>--header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \</em>
     <em>--header "Sec-WebSocket-Version: 13" \</em>
     http://example.com:80/
```

连接成功时，响应的状态码为101.

![](/assets/YraUbwTGnoYurfxAkpEcdcHQnZe.png)

<i>引自：</i><em>https://www.cnblogs.com/niuben/p/14603232.html</em>

### 在线测试工具

下面让我们来测试一下上文用go写的代码

![](/assets/IL47bOo2YooCe1xxBFhcOomwnme.png)

![](/assets/BhyjbDrYkoHYtrxH2Gwcp7oTnve.png)

# 安全考虑

与常规的跨域 HTTP 请求不同，WebSocket 请求不受同源策略限制。因此，WebSocket 服务器必须在连接建立期间根据预期来源验证“Origin”标头，以避免跨站点 WebSocket 劫持攻击（类似于跨站点请求伪造），当使用cookie或 HTTP验证连接时可能会发生这种情况验证。当敏感（私有）数据通过 WebSocket 传输时，最好使用令牌或类似的保护机制来验证 WebSocket 连接。

# 关于使用代理的情况

> WebSocket 协议客户端实现尝试检测用户代理是否配置为在连接到目标主机和端口时使用代理，如果是，则使用[HTTP CONNECT](https://en.wikipedia.org/wiki/HTTP_tunnel#HTTP_CONNECT_tunneling)方法设置持久隧道。
> 虽然 WebSocket 协议本身不知道代理服务器和防火墙，但它具有与 HTTP 兼容的握手功能，因此允许 HTTP 服务器与 WebSocket 网关或服务器共享其默认的 HTTP 和 HTTPS 端口（分别为 80 和 443）。WebSocket 协议定义了一个 ws:// 和 wss:// 前缀，分别表示一个 WebSocket 和一个 WebSocket 安全连接。两种方案都使用[HTTP 升级机制](https://en.wikipedia.org/wiki/HTTP/1.1_Upgrade_header)来升级到 WebSocket 协议。一些代理服务器是透明的，可以与 WebSocket 一起正常工作；其他会阻止 WebSocket 正常工作，导致连接失败。在某些情况下，可能需要额外的代理服务器配置，并且某些代理服务器可能需要升级以支持 WebSocket。
> 如果未加密的 WebSocket 流量流经没有 WebSocket 支持的显式或透明代理服务器，则连接可能会失败。
> 如果使用加密的 WebSocket 连接，则在 WebSocket 安全连接中使用[传输层安全](https://en.wikipedia.org/wiki/Transport_Layer_Security)性(TLS) 可确保`HTTP CONNECT`在将浏览器配置为使用显式代理服务器时发出命令。这会在 WebSocket Secure 客户端和 WebSocket 服务器之间建立一个隧道，通过 HTTP 代理提供低级别的端到端 TCP 通信。在透明代理服务器的情况下，浏览器不知道代理服务器，所以没有`HTTP CONNECT`已发送。但是，由于有线流量是加密的，中间透明代理服务器可能会简单地允许加密流量通过，因此如果使用 WebSocket Secure，WebSocket 连接成功的可能性会大得多。使用加密并非没有资源成本，但通常会提供最高的成功率，因为它会通过安全隧道。
> 2010 年中期的草案（版本 hixie-76）打破了与[反向代理](https://en.wikipedia.org/wiki/Reverse_proxy)和网关的兼容性，在标头之后包含 8 个字节的关键数据，但不在标头中宣传该数据`Content-Length: 8`。此数据并非由所有中间人转发，这可能导致协议失败。最近的草案（例如，hybi-09 ）将关键数据放在`Sec-WebSocket-Key`标题中，解决了这个问题。

<i>引自：</i><em>https://en.wikipedia.org/wiki/WebSocket</em>

# 扩展资料

## 相关工具

https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

- [AsyncAPI](https://www.asyncapi.com/)：用于描述基于 WebSocket 等协议的事件驱动架构的规范。您可以使用它来描述基于 WebSocket 的 API，就像使用 OpenAPI 规范描述 REST API 一样。了解为什么应该考虑将 AsyncAPI 与 WebSocket 结合使用以及如何使用。
- [HumbleNet](https://hacks.mozilla.org/2017/06/introducing-humblenet-a-cross-platform-networking-library-that-works-in-the-browser/)：一个在浏览器中工作的跨平台网络库。它由围绕 WebSockets 和 WebRTC 的 C 包装器组成，抽象出跨浏览器的差异，促进为游戏和其他应用程序创建多用户网络功能。
- [µWebSockets](https://github.com/uNetworking/uWebSockets)：用于[C++11](https://isocpp.org/)和[Node.js](https://nodejs.org/)的高度可扩展的 WebSocket 服务器和客户端实现。
- [Socket.IO](https://socket.io/) : 基于长轮询/WebSocket 的[Node.js](https://nodejs.org/)第三方传输协议。
- [SocketCluster](https://socketcluster.io/): 用于[Node.js](https://nodejs.org/)的 pub/sub WebSocket 框架，专注于可扩展性。
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node) : [Node.js](https://nodejs.org/)的 WebSocket 服务器 API 实现。
- [Total.js](https://www.totaljs.com/) ： [Node.js](https://nodejs.org/en/)的 Web 应用程序框架（示例：[WebSocket 聊天](https://github.com/totaljs/examples/tree/master/websocket)）
- [Faye](https://www.npmjs.com/package/faye-websocket) ： [Node.js](https://nodejs.org/)服务器和客户端的  [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)（双向连接）和[EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)（单向连接） 。
- [SignalR](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr)：SignalR 将在 WebSockets 可用时在后台使用它，并在它不可用时优雅地回退到其他技术和技术，而您的应用程序代码保持不变。
- [Caddy](https://caddyserver.com/)：一个能够将任意命令（stdin/stdout）代理为 websocket 的 web 服务器。
- [ws](https://github.com/websockets/ws) ：一个流行的用于[Node.js](https://nodejs.org/)的 WebSocket 客户端和服务器库。
- [jsonrpc-bidirectional](https://github.com/bigstepinc/jsonrpc-bidirectional) : 异步 RPC，在单个连接上，可能在服务器上导出功能，同时在客户端上（客户端可能调用服务器，服务器也可能调用客户端）。
- [cowboy](https://github.com/ninenines/cowboy)：Cowboy 是一个小型、快速和现代的用于 Erlang/OTP 的 HTTP 服务器，支持 WebSocket。
- [WebSocket King](https://websocketking.com/)：帮助开发、测试和使用 WebSocket 服务器的客户端工具。
- <u>PHP WebSocket Server</u>：用 PHP 编写的服务器，用于通过 websockets wss:// 或 ws:// 以及通过 ssl:// 、tcp:// 的普通套接字处理连接
- [Channels](https://channels.readthedocs.io/en/stable/index.html)：Django 库，增加了对 WebSockets（和其他需要长时间运行的异步连接的协议）的支持。
- [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/)：让 Flask 应用程序可以访问客户端和服务器之间的低延迟双向通信。
- [Gorilla WebSocket](https://pkg.go.dev/github.com/gorilla/websocket)：Gorilla WebSocket 是 WebSocket 协议的[Go](https://go.dev/)实现。

