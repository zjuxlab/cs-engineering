---
title: Request
slug: Request
sidebar_position: 0
---


# Request

Author：陈儒

## 前置知识

这是一个python库，所以显然需要python的基础知识x

你可能需要：[并发](https://xn4zlkzg4p.feishu.cn/wiki/wikcnJ7PYn6OCS0H2ugm9Gg4ldg#doxcnUwe6wsiMEmc0g7asAQDiQg)

关于爬虫，简单地说，爬虫就是通过模拟浏览器发送请求来获取信息的方式。通过爬虫，可以将互联网上海量的信息进行获取和筛选。

## requests

用于向网页发送请求的模块，[官方文档](https://requests.readthedocs.io/en/latest/user/quickstart/)比较详细，下面仅仅是几个我觉得比较基本的用法

一个获取b站首页的代码如下：

```py
import requests
from fake_useragent import UserAgent

url = "https://www.bilibili.com"
head = {
    "User-Agent": UserAgent().random
}
res = requests.get(url, headers=head)
res.raise_for_status()
```

上面的代码展示了`requests`的基本用法，`fake_useragent.UserAgent().random`提供一个随机的UserAgent，用于模拟浏览器的头部信息。（也可以用UserAgent模拟手机端

`raise_for_status()` 会在失败的状态码时主动抛出异常。其他可能的异常有`ConnnectionError`、`Timeout`、`TooManyRedirects`.

参数、请求头、数据由字典提供给`params`、`headers`、`data`参数：

```py
payload = {'key1': 'value1', 'key2': 'value2'}
r = requests.get('https://httpbin.org/get', params=payload)
r = requests.put('https://httpbin.org/put', data={'key': 'value'})
```

感觉没啥好说的，就是很普通的发送请求x

上传文件使用`files`参数，传入一个字典，格式如下：

```py
{ 'param_name': IO/(file_name,IO)/(file_name,IO,content_type,headers) }
# IO can be replaced by strings directly, but why do that x
```

对于大文件，你应该不会想把他们读进来再上传。`requests`贴心地提供了流式上传：

```py
with open('massive-body', 'rb') as f:
    requests.post('http://some.url/streamed', data=f)
```

tips：文档中未提及的一点，如果要使用`requests`发送`form-data`，则需要借助`file`参数：

```py
params = {
    'timestamp':timestamp
}
data = {
    'name':(None, name)
}
resp = requests.post(URL, files=data, params=params)
```

`requests`会自动识别编码，可以使用`encoding`来查看或修改编码，`requests.text`查看解码后的内容，如果返回的是`json`的话可以直接用`.json()`。虽说如此，我们一般都直接使用`.content`把原始内容扔进其他工具内

`requests.Session()`提供一个`Session`对象，可以用于保存所有从中发出的请求的`cookie`。

tips：`requests`的底层使用的是`urllib`，这个库会自动检测系统代理设置，如果发现设置了代理（如HTTP_PROXY等环境变量）就会自动使用代理，如果要求不使用代理，请关闭系统代理或额外传入代理相关的参数。

## 我好像会了，所以 url 在哪

比如我们的需求是：获得pixiv上某个tag下收藏数超过500所有图片（

我们手动打开浏览器，随便打开一张图片，按F12进入network选择`fetch`，下方会给出由浏览器与服务器交互的所有数据，排除掉`js`和`CSS`文件（如果你找到了api所在的路由，还可以按路由搜索，比如p站的就直接放在`/ajax`

![](/assets/E4vNbI81RoElzkxT1Gxcv56KnGc.png)

如上图，我们成功地找到了图片url的所在地，再进入`Headers`找到请求发送的地址以及特殊的请求头就可以直接模拟请求获得数据了。

```py
def geturl(pid):
    url = f'https://www.pixiv.net/ajax/illust/{pid}/pages?lang=zh'
    new_header = HEADERS
    new_header['referer'] = f'https://www.pixiv.net/artworks/{pid}'
    res = my_request(url, new_header)
    obj = res.json()
    urls = [item['urls']['original'] for item in obj['body']]
    return urls
```

Fiddler是一个更专业的抓包工具（我一直用的是这个，如果有更好用的欢迎大家推荐鸭），使用chrome做不到的事情可以使用fiddler<del>（比如我不知道怎么用chrome看POST请求的请求体 Firefox 永远滴神</del>

### <del>并发</del>

由于爬虫所做的工作几乎是互相独立的，为了加快爬虫的速度，一般会使用并发。

并发，是指同时处理多个子任务，这里的“同时”仅仅指抽象意义上的“同时”而非真正的同时。（概念其实不重要，总之这玩意就是同时执行多个任务

在python中，我们使用`threading`（线程级）或`multiprocessing`（进程级）来完成并发操作，二者的api基本相同，以下以`threading`为例。

#### 线程对象

使用`threading.Thread`声明一个线程对象，调用构造函数时主要需要的参数为：

`target`：要在这个线程里执行的函数

`name` ：线程的名称，默认为`Thread-N`

`args`和`kwargs`：调用函数时的参数元组和关键字参数字典

`daemon`：是否标记该线程为守护线程（好怪的翻译），当剩下的线程均为守护线程时，整个python程序将退出。默认继承创建线程的状态。

使用`.start()`开始这个线程，`.join()`等待该线程结束。

#### 锁

大部分情况下，各个线程之间并不是完全独立的，它们可能需要对同一个对象进行读/写。

比如对于两个线程同时修改一个对象，它们在同一时刻读取了这个对象，做了不同的操作后分别写了这个对象。那么最终的结果极有可能是只有一个线程成功地做了修改，而另一个线程的修改被错误地覆盖掉了。

我们一般不希望这种情况发生，因此我们需要引入同步锁。当一个线程要使用这个对象时，将锁锁定以使其他线程不能使用，并在使用完毕后解锁这个锁。

在python中，使用`treading.Lock`声明一个锁。

`.acquire()`锁定这个锁，如果调用时这个锁已锁定则会等待，直到这个锁被解锁。使用`timeout`参数设置最多等待的时间，超过等待时间则返回`False`。设置`blocking=False`不会等待，如果调用`.acquire()`时锁已经被锁定，则会立刻返回`False`。其余情况，该函数返回`True`

`.release()`解锁这个锁，在已解锁的锁上调用会RE（

#### 通信

Python中线程的通信十分方便，我们一般直接使用`queue.Queue`，它使用了上文中提到的锁，使用它来进行多线程的信息通信是非常安全的。栈和优先队列（`queue.LifoQueue`和`queue.PriorityQueue`）同样如此。

使用`.put(item)`加入队列，`.get()`取出队列。

这两个函数均支持`blocking`和`timeout`参数。不同的是，这两个函数不会返回`False`，而是直接抛出异常。`.put()`抛出`queue.Full`，`.get()`抛出`queue.Empty`

