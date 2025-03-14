---
title: Scrapy
slug: Scrapy
sidebar_position: 2
---


# Scrapy

Author：刘心源

> Author: Last modification: 2022.11.30

## 前置🧀

Python基本语法（或许你至少需要知道`yield`？）

由于scrapy是一个<b>爬虫框架</b>，本文默认您有基本的爬虫知识，如果您没有建议先阅读<b>爬虫</b>目录下的其他文件

## scrapy

一个爬虫框架，里面提供了很多已经写好的工具，而且在github拥有比较丰富的扩展

使用这个框架写爬虫，我们需要做基本只有两大步：从response里提取数据和后续url、处理数据。

### 文件结构

使用scrapy创建一个项目后（`scrapy startproject your_project_name`），项目文件夹中会自动生成一些文件。

![](/assets/Zz72bNyjLolLKfxAFf7cAyednuf.png)

`items.py`是一条数据的类型定义（有点像ORM里的model），可以不动

`middlewares.py`是一些中间件，如果想要自定义request/response处理或者其他东西可以对里面的东西进行更改，每个中间件的作用都有详细的注释

`pipelines.py`是对得到的数据（就是`items.py`里定义的东西）的处理，如果需要处理后再保存或者使用特殊的保存方式需要对里面的东西进行更改。

`spiders`文件夹里存放爬虫的主体

`scrapy.cfg`里好像有东西x 我们会在未来用到它

### 定义一个爬虫

在`spiders`里新建文件定义爬虫，下面是一个例子：

```py
<em># -*- coding: utf-8 -*-
</em><em>import</em> scrapy

class ToScrapeCSSSpider(scrapy.Spider):
    name = "toscrape-css"
    start_urls = [
        'http://quotes.toscrape.com/',
    ]

    def parse(<em>self</em>, <em>response</em>):
        <em>for</em> quote <em>in</em> response.css("div.quote"):
            <em>yield</em> {
                'text': quote.css("span.text::text").extract_first(),
                'author': quote.css("small.author::text").extract_first(),
                'tags': quote.css("div.tags > a.tag::text").extract()
            }

        next_page_url = response.css("li.next > a::attr(href)").extract_first()
        <em>if</em> next_page_url <em>is</em> <em>not</em> None:
            <em>yield</em> scrapy.Request(response.urljoin(next_page_url))
```

我们自定义的爬虫对象必须继承自`scrapy.Spider`，并定义三个属性：

- `name`：用于标识、运行爬虫，必须唯一。请注意，运行爬虫时使用的名字为这里的`name`，与文件名无关
- `start_urls`，顾名思义，爬虫开始的url
- `parse(self, response)`request默认的回调函数，框架完成URL的请求后，会调用该函数。该函数拿到框架给的response，从中解析出数据和后续要处理的url，框架采用选择器的方式解析数据，response本身也可以使用选择器的方法。选择器支持的方法为：
    - `.extract()` 序列化为字符串列表（该方法并不常用
    - `.get()`获得<b>一个</b>标签内部的字符串，`.getall()`获得包含所有结果的列表
    - `.css()`传入CSS selectors表达式（除了普通的语法，还可以使用`::text`选择文本，`::attr(name)`选择属性值），返回一个选择器列表
    - `.xpath()`传入Xpath表达式（即使你对Xpath并不熟悉，也可以直接使用Chrome获得一个元素的Xpath表达式），返回一个选择器列表
    - `.re()`使用正则匹配，返回字符串列表
    当然，你也可以使用其他的方式解析数据，比如从接口拿到json数据，或者使用 Beautiful Soup
    ### 让我们开始吧
    你已经掌握基本知识了，下面该进入实践阶段了（雾
    好吧，其实是感觉把很多东西放在实际项目里讲会更清晰一点
    假设我们的需求是获取Pixiv收藏数大于500的某类图片的爬虫（什么离谱甲方），我们尝试使用`scrapy`框架
    ```py
class PixivSpider(scrapy.Spider):
    name = 'pixiv'
    start_urls = ['https://www.pixiv.net/']
    custom_settings = {
        'LOG_LEVEL': 'INFO',
        'LOG_FILE': 'pixiv.log',
    }
    def parse(self, response, **kwargs):
        for idx in range(1, 1000):
            url = f'https://www.pixiv.net/ajax/search/artworks/%E7%99%BE%E5%90%88?word=%E7%99%BE%E5%90%88&order=date_d' \
                  f'&mode=all&p={idx}&s_mode=s_tag_full&type=all&lang=zh'
            yield scrapy.Request(url, callback=self.parse_page)
```
    根据我们目前学过的知识，我们先写出上面的代码。
    我们将对前1000页的搜索结果进行筛选，所以需要先把获取前1000页的搜索结果的URL构建成request发回给框架
    使用`scrapy.Request`构建一个请求实例，接受的参数常用的有`url`、`callback`、`method`、`headers`、`body`、`cookies`、`dont_filter`、`errback`、等。需要解释的是`callback`，如果该URL的回调函数不为`parse`，应使用`callback`传入它的回调函数。在这个栗子中，我们希望它调用`parse_page`来解析搜索结果。
    ```py
def parse_page(self, response):
    self.logger.debug(f'parse_page: {response.url}')
    obj = json.loads(response.body)
    for item in obj['body']['illustManga']['data']:
        pid = item['id']
        yield scrapy.Request(f'https://www.pixiv.net/ajax/illust/{pid}', callback=self.check_love)
```
    请求完成后，框架会调用我们规定的回调函数，并将`response`传入。`response`里可以拿到`.url`、`.status`、`.body`，含义如字面意思。如果拿到的是`json`数据，需要手动调用`json.loads`，如果想要得到文本，可以调用`.text`方法（基本和原生的`requests`用法一致）。
    在`scrapy.Spider`中，可以使用`.logger`来打log，不出意外地，log有五级，由高到低分别为：`CRITICAL`,`ERROR`,`WARNING`,`INFO`,`DEBUG`。
    ```py
def check_love(self, response: scrapy.http.Response):
    obj = json.loads(response.body)
    count = obj['body']['bookmarkCount']
    if count > 500:
        yield response.follow('pages', callback=self.parse_pic)
```
    除了使用前面的方法构造`request`，还可以使用更加方便的`response.follow`，它可以接受绝对URL、相对URL，它甚至支持……一个link标签，是的，你可以直接把`scrapy.link.Link`这种东西传进去x。此外，还有response.follows，如字面意思，是上面那个的list版
    ```py
def parse_pic(self, response):
    obj = json.loads(response.body)
    urls = [item['urls']['original'] for item in obj['body']]
    yield PixivItem(image_urls=urls)
```
    终于，我们拿到了数据，在`Item.py`内定义好数据的结构后，直接返回数据的generator，框架会将我们的数据按照顺序传给`pipelines`进行处理。pipelines的处理顺序需要在`settings.py`内定义，这里我们使用如下定义：
    ```py
ITEM_PIPELINES = {'scrapy.pipelines.images.ImagesPipeline': 1}
```
    我们使用`scrapy`自带的`ImagePipeline`，优先级为1，表示第一个执行。如果要按顺序执行其他pipeline，递增优先级即可。
    现在，运行`scrapy crawl pixiv`，就可以开始爬啦
    然后你就会发现，你被Pixiv反爬了x

## 进行一个反反爬

### 限制同一ip在同一时间的请求次数

设置下载延迟、使用随机的代理IP。

以scrapy为例，scrapy的Downloader结构如下：

![](/assets/GPIRb1P1jotBMjxYUEQcxiyhn0d.png)

其中在settings中直接设置的有：

```cpp
# 从配置中获取设置的并发数
        self.total_concurrency = self.settings.getint('CONCURRENT_REQUESTS')
        # 同一域名并发数
        self.domain_concurrency = self.settings.getint('CONCURRENT_REQUESTS_PER_DOMAIN')
        # 同一IP并发数
        self.ip_concurrency = self.settings.getint('CONCURRENT_REQUESTS_PER_IP')
        # 随机延迟下载时间
        self.randomize_delay = self.settings.getbool('RANDOMIZE_DOWNLOAD_DELAY')
```

随机的代理IP可以使用下载器中间件解决。

下载器中间件为下载行为定义默认的下载前、下载后、异常时对应的处理方法，分别对应`process_requestprocess_response`和`process_exception`方法。

我们这里只需要用到下载器中间件里面的`process_request`，其他详细的内容参见[Downloader Middleware](https://docs.scrapy.org/en/latest/topics/downloader-middleware.html)

> process_request(self, request, spider)

用于对请求进行处理，在每个request通过下载中间件时被调用。

该方法的参数包括：

request：要处理的Request对象。

spider：该request对应的Spider对象。

该方法可能返回None，一个Response对象，或者一个Request对象，也可能抛出 IgnoreRequest异常。针对这4种情况，Scrapy有不同的处理方式，分别介绍如下。

（1）如果返回None，Scrapy将继续处理该request，执行其他的间件的相应方法，直到合适的下载器处理函数（download handler）被调用，该request被执行（即其response被下载）。

（2）如果返回Response对象，Scrapy将不会调用任何其他的 process_request()方法，process_exception()方法，或相应的下载函数，而是返回该response。 已安装的中间件的process_response()方法则会在每个response返回时被调用。

（3）如果返回Request对象，Scrapy将停止调用process_request方法并重新调度返回的request。当新返回的request被执行后，相应的中间件链将会根据下载的response被调用。

（4）如果抛出一个IgnoreRequest异常，则安装的下载中间件的 process_exception() 方法会被调用。如果没有任何一个方法处理该异常， 则request的errback(Request.errback)方法会被调用。如果没有代码处理抛出的异常，则该异常被忽略且不记录（不同于其他异常的处理方式）。

```cpp
class RandomProxy(object):
  def process_request(self, request, spider):
    proxy = random.choice(PROXIES)
      if proxy['user_passwd'] is None:
        # 没有代理账户验证的代理使用方式
        request.meta['proxy'] = "http://" + proxy['ip_port']
      else:
        # 对账户密码进行base64编码转换
        base64_userpasswd = base64.b64encode(proxy['user_passwd'])
        # 对应到代理服务器的信令格式里
        request.headers['Proxy-Authorization'] = 'Basic ' + base64_userpasswd
        request.meta['proxy'] = "http://" + proxy['ip_port']
```

然后在settings里面设置好中间件即可：

```cpp
DOWNLOADER_MIDDLEWARES = {
  'mySpider.middlewares.ProxyMiddleware': 100
}
```

中间件的执行顺序为升序执行

### 通过Header中的referer/UserAgent等

scrapy有默认的行为，如果网站有特殊的反爬策略，则可以自写中间件，并禁用`scrapy.spidermiddlewares.referer.RefererMiddleware`（禁用方法为将执行顺序设置为`None`

### 通过Header中自定义的字段

如Twitter，会在每次访问主页时设置cookie中的`gt`字段，之后的请求需要在Header中加入`x-guest-token`并将值设置为cookie中的值。

```cpp
def update_cookies(self, response):
        driver = response.meta['driver']
        try:
            self.cookies = driver.get_cookies()
            self.x_guest_token = driver.get_cookie('gt')['value']
        except:
            logger.info('cookies are not updated!')

        self.headers = {
            'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
            'x-guest-token': self.x_guest_token,
        }
```

### 验证码

尽量避免吧x

## Splash

如果一个网站的api藏得很深，甚至还有加密，那么仅仅用上面的方法可能就不能满足我们了，而且大部分时候我们应该不想用selenium，那么我们就需要真正地着手处理JS了。splash可以将界面中的JS解析完成后再返回渲染后的页面。

`scrapy-splash`是一个scrapy的扩展，可以帮助我们非常方便地在scrapy中使用splash来解析JS。

使用时，只需要先配置完成splash，然后用`scrapy_splash.SplashRequest`代替原来的`request`就行了（用起来倒是不麻烦）

## Scrapyd

scrapyd 是由scrapy 官方提供的爬虫管理工具，使用它我们可以非常方便地上传、控制爬虫并且查看运行日志。

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>❗</div>
<p>为避免遭遇奇葩问题，请使用</p>
<p>SQLAlchemy&gt;=1.2.15,&lt;1.4.0</p>
<p>Werkzeug==2.0.3</p>
<p>是的，我也觉得很离谱，但确实是这样x</p>
</div>

安装：

```shell
pip install scrapyd scrapydweb scrapyd-client
```

<del>现在，去</del><del>scrapy.cfg</del><del>中把</del><del>url = </del><del>http://localhost:6800/</del><del>的注释去掉</del>

scrapyd的配置就在`scrapy.cfg`的`deploy`中

```py
url = http://qqqwwwqqq  #要部署项目的服务器的地址
username = hydra  #访问服务器所需的用户名和密码（如果不需要密码可以不写）
password = T_hornIsCute
```

在命令行中运行`scrapyd`后运行`scrapydweb`，在出现的配置文件中配置`USERNAME`和`PASSWORD`，并在`SCRAPY_PROJECTS_DIR`中填入`scrapy`项目地址，重新运行`scrapydweb`

![](/assets/PmErbjLMfo2iZKxKoglcWK03neG.png)

好耶！一个给甲方看的炫酷的管理界面出现了！

## 分布式

`scrapy-redis`也是一个scrapy的扩展，它使用redis来完成分布式

这个东西已经写完了，只要把配置文件写好就行

`scrapy-redis-bloomfilter`是`scrapy-redis`的拓展（套娃），不同于`scrapy-redis`使用redis里的set判重，它使用`bloomfilter`判重，更适合对时间有严格要求的超大型项目。

### Bloomfilter

无论是自己写爬虫还是使用scrapy，我们都需要记录哪些url已经访问过了。

如果对时间没有特别严苛的要求，可以直接使用字典记录（显然，这非常慢

一个简单的想法是使用哈希将所有的url映射到1~M。

Bloom Filter对这一想法进行了改进， 同时使用k个哈希函数。当一个元素被加入集合时，通过这k个哈希函数将这个元素映射到1~M中的K个点，把它们置为1。检索时，只要检查这k个点，如果有一个为0，则说明这个元素<b>一定</b>不存在；若全部为1，则说明这个元素<b>可能</b>存在。

假设k个哈希函数相互独立且等可能地选择1~M。那么插入一个元素时，某个位未被设1的概率为 $(1-\frac 1m)^k$，众所周知，当M较大时，$\left(1-\frac{1}{m}\right)^{k}=\left(\left(1-\frac{1}{m}\right)^{m}\right)^{\frac k  m} \approx e^{-\frac k  m}$。所以插入N个元素后，某位为1的概率为$1-e^{-\frac {kn}m}$。

最终我们得到，误报（k个位均为1）的概率为$(1-e^{-\frac {kn}m})^k$

当然，由于不同的位是否为1并不独立，所以这只是一个估计，真正的误报率是$\frac{1}{m^{k(n+1)}} \sum_{i=1}^{m} i^{k} i !\left(\begin{array}{c}
m \\
i
\end{array}\right)\left\{\begin{array}{c}
k n \\
i
\end{array}\right\}$

如果能够容许一个较低的误报率，并要求快速检索，那么bloom filter是一个好选择。

