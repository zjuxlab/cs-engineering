---
title: Selenium
slug: Selenium
sidebar_position: 0
---


# Selenium

Author：李予谦

# 写在前面

关于为什么突然选择Selenium作为第一个写的每月积累内训，主要的原因是：

软件工程的软件质量保证与测试一课中的project是6个爬虫/1个炼丹 二选一，其中爬虫强行要求使用模拟人类操作浏览器行为的方式来进行，因此迫不得已需要使用Selenium。

既然迟早要学，那还不如现在学。由于最近刚开学，而第一版的每月积累的DDL比较紧迫，而且我也是第一次接触这玩意儿，所以可能刚开始的文档会有一些不到位的地方，我会等我这学期爬了好多东西之后再更新，写点心得啥的。

> Selenium官网真是一个好东西

# Selenium简介

## 什么是Selenium

### Selenium是一个工具集

<em>Selenium</em> 有很多功能， 但其核心是 web 浏览器自动化的一个工具集。<b>它允许我们模拟真实的浏览器用户执行的常见活动</b>：将文本输入到字段中，选择下拉值和复选框，并单击文档中的链接等等。 它还<b>提供许多其他控件，比如鼠标移动、 JavaScript 执行等等</b>。

虽然 Selenium <b>主要用于网站的前端测试</b>，但其核心是浏览器用户代理库。 

### 不同浏览器，一种接口

Selenium的指导原则之一是支持所有（主要）浏览器技术的通用接口。 Web 浏览器是非常复杂的，很多高度工程化的应用程序会以完全不同的方式执行它们的操作，但是在执行这些操作时的结果又通常看起来是一样的。 Selenium “抽象”了这些差异，向编写代码的人隐藏了它们的细节和复杂性。 这允许我们编写几行代码来执行一个复杂的工作流程， 但是这几行代码将可以在 Firefox、 Internet Explorer、 Chrome 和所有其他支持的浏览器上执行。

### 让浏览器自己负责驱动

Selenium 通过使用 <em>WebDriver</em> 支持市场上所有主流浏览器的自动化。 Webdriver 是一个 API 和协议，它定义了一个语言中立的接口，用于控制 web 浏览器的行为。 每个浏览器都有一个特定的 WebDriver 实现，称为驱动程序。 驱动程序是负责委派给浏览器的组件，并处理与 Selenium 和浏览器之间的通信。

这种使用WebDriver的第三方驱动的方法是为了让浏览器供应商可以负责其自己的浏览器。 如果有可能的话，Selenium 会使用这些第三方驱动程序（其实也可以说是各个浏览器的官方驱动）， 但是在这些驱动程序不存在的情况下，Selenium也提供了由自己的开源社区维护的驱动程序。

# 配置Selenium

### 安装Selenium语言库

选择你的语言，并安装Selenium语言的类库。

我们先以Python（version need &gt;=3.7.0）为例。

```text
pip install selenium
```

这样我们就可以安装好Python的selenium语言库。

### 安装浏览器驱动

WebDriver有很多主流的浏览器在自己做支持。在此我以我最常使用的Edge浏览器为例。

你有很多种方式来安装浏览器驱动。

#### 手动安装

在Edge的网站上下载对应的浏览器驱动。

我们先下载stable的WebDriver。

![](/assets/HNP2bxOGuoA8hNxFm3lcQwwgnAb.png)

将下载下来的webdriver（一个exe）放入某个文件夹，准备<b>写入环境变量</b>。

---

要查看`PATH`上已经有哪些目录, 请打开命令提示符并执行:

```shell
echo %PATH%
```

如果你安装WebDriver的位置不在列出的目录中, 可以将新目录添加到PATH:

```shell
setx PATH "%PATH%;Your/Path/To/Store/WebDrivers"
```

可以通过在cmd中启动驱动程序来测试其是否被正确添加:

```shell
msedgedriver.exe
```

如果`PATH`配置正确, 就看到一些与驱动程序启动相关的输出:

```
Starting Microsoft Edge WebDriver xxx.x.xxxx.xx (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx) on port 9515
To submit feedback, report a bug, or suggest new features, please visit https://github.com/MicrosoftEdge/EdgeWebDriver

Only local connections are allowed.
Please see https://aka.ms/WebDriverSecurity for suggestions on keeping Microsoft Edge WebDriver safe.

Microsoft Edge WebDriver was started successfully.
```

---

#### 使用Python的[WebDriver Manager for Python](https://github.com/SergeyPirogov/webdriver_manager)

（以官方文档中的Python为例）

大多数机器会自动更新浏览器, 但驱动程序不会. 为了确保为浏览器提供正确的驱动程序, 这里有许多第三方库可为您提供帮助.

导入 [WebDriver Manager for Python](https://github.com/SergeyPirogov/webdriver_manager)

```py
from webdriver_manager.chrome import ChromeDriverManager
```

使用 `install()` 获取管理器使用的位置, 并将其传递到服务类中

```py
service = Service(executable_path=ChromeDriverManager().install())
```

使用 `Service` 实例并初始化驱动程序:

```py
driver = webdriver.Chrome(service=service)
```

[查看GitHub上的完整示例.](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/dev/examples/python/tests/getting_started/test_install_drivers.py)

# Selenium的初步使用

完成了语言库和WebDriver的安装，我们就可以进入到Selenium的编写工作了。

Selenium的工作整体分为8个步骤。我们将以一个非常简单的项目（例程）来入门我们的Selenium。

## 使用WebDriver开启会话

我们依然以edge为例。由于我没有使用Python的WebDriverManager，因此需要使用自己的路径。而由于我们已经配置了环境变量，因此只需要输入WebDriver的名字即可。

```py
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService

# 开启edge的WebDriver并关闭
def test_edge_session():
    service = EdgeService(executable_path="msedgedriver")
    driver = webdriver.Edge(service=service)
    driver.quit() # 关闭WebDriver

test_edge_session()
```

## 开启浏览器导航

启动我们的WebDriver之后我们就可以打开我们的浏览器导航

```py
driver.get("https://selenium.dev") # 打开网站,请注意不要省略前面的https/http协议
driver.back() # 按下后退按钮
driver.forward() # 按下前进按钮
driver.refresh() # 按下刷新按钮
```

## 请求浏览器信息

我们可以通过WebDriver来取用各种网站的信息，例如窗口句柄、浏览器尺寸/位置、cookie等等，具体可见 [Browser interactions](https://www.selenium.dev/zh-cn/documentation/webdriver/interactions/)

在此我们以获得网站title为例：

```py
print(driver.title)
```

## 选择等待策略

将代码与浏览器的当前状态同步<b>是Selenium面临的最大挑战之一</b>, 要实现这个目标比较困难。

我们往往很难保证在我们开始执行我们的测试代码的时候，我们的网站已经加载好了，或者在一些动态生成的情况下，我们想要调试的各个组件已经在其本应所在的位置上了。

因此如果我们没有一个较好的等待策略的话，很容易就会报"no such element"的错误。

下面我们介绍3个等待的策略。

### 强制等待

我们可以直接使用python的sleep函数来等待浏览器加载完成。

```py
from time import sleep
sleep(10)
```

这个方法非常的粗暴，会造成无意义的时间浪费。

### 隐式等待

隐式等待相比强制等待更智能，顾明思义，在脚本中我们一般看不到等待语句，但是它会在每个页面加载的时候自动等待；隐式等待只需要声明一次，一般在打开浏览器后进行声明。声明之后对整个drvier的生命周期都有效，后面不用重复声明。

```py
driver = Firefox()
driver.implicitly_wait(10)
driver.get("http://somedomain/url_that_delays_loading")
my_dynamic_element = driver.find_element(By.ID, "myDynamicElement")
```

`implicitly_wait()`方法用来等待页面加载完成（直观的就是浏览器tab页上的小圈圈转完），`implicitly_wait(10)`即是超时时间10s，10秒内一旦加载完成，就执行下一条语句；如果10秒内页面都没有加载完，就超时抛出异常。

但是隐式等待依然存在一个问题，那就是程序会一直等待整个页面加载完成，也就是一般情况下你看到浏览器标签栏那个小圈不再转，才会执行下一步，但有时候页面想要的元素早就在加载完成了，但是因为个别js之类的东西特别慢，我仍得等到页面全部完成才能执行下一步。

### 显式等待

显式等待是大多数情况下更好的一种等待方式。

显示等待的代码定义了等待条件，只有该条件触发，才执行后续代码。WebDriverWait 和 ExpectedCondition 组合使用，就是一种有效的解决手段。

显示等待需要用到两个类：

#### WebDriverWait

`WebDriverWait(driver,timeout,poll_frequency=0.5,ignored_exceptions=None)`

> driver：浏览器驱动
> timeout：最长超时时间，默认以秒为单位
> poll_frequency：检测的间隔步长，默认为0.5s
> ignored_exceptions：超时后的抛出的异常信息，默认抛出NoSuchElementExeception异常。

WebDriverWait()中的until()和until_not()方法：

`until(method, message='')`

method: 在等待期间，每隔一段时间（__init__中的poll_frequency）调用这个传入的方法，直到返回值不是False

message: 如果超时，抛出TimeoutException，将message传入异常

`until_not(method, message='')`

 与until相反，until是当某元素出现或什么条件成立则继续执行，

 until_not是当某元素消失或什么条件不成立则继续执行，参数也相同。

<b>咱们来个例子</b>

```py
# 其中的EC就是下面我们要讲的expected_conditions类
wait = WebDriverWait(driver,10,0.5)
wait.until(EC.presence_of_element_located((By.ID,'KW')))
# 我们也可以把他们连起来
wait = WebDriverWait(driver,10,0.5).until(EC.presence_of_element_located((By.ID,'KW')))
# 下面的写法是官方给的匿名函数写法
el = WebDriverWait(driver, timeout=3).until(lambda d: d.find_element(By.TAG_NAME,"p"))
```

#### expected_conditions类

这个类里面含有各种常见的元素检查操作，根据是否达到某种条件，返回True和False

下面给出一些常用的条件

使用之前请记得先import这个类

```py
from selenium.webdriver.support import expected_conditions as EC
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>📌</div>
<p><i>警告:</i> 不要混合使用隐式和显式等待。这样做会导致不可预测的等待时间。例如，将隐式等待设置为10秒，将显式等待设置为15秒，可能会导致在20秒后发生超时。</p>
</div>

## 查找元素

我们的大多数测试都与元素有关，因此在测试之前我们需要先查找定位元素。

```py
text_box = driver.find_element(by=By.NAME, value="my-text")
    submit_button = driver.find_element(by=By.CSS_SELECTOR, value="button")
```

## 操作元素

对于元素，我们可以操作的方法并不多（主要是因为selenium是一个用户仿真的测试工具，而一个正常用户可以对元素做的操作其实并不多）

在这里我们给出两个简单且常用的例子

```py
text_box.send_keys("Selenium")
submit_button.click()
```

更多的操作可以参照官方文档：

## 获取元素信息

Selenium当然也提供了获取某个元素信息的方式。

```py
value = message.text
```

更多的元素信息获取接口可以参照官方文档：

## 结束会话

在我们的测试完成之后，我们需要结束整个会话。这将结束驱动程序进程, 默认情况下, 该进程也会关闭浏览器.。因此我们将无法向此驱动程序实例发送更多命令。

```py
driver.quit()
```

至此，我们的所有8个步骤就完成了。接下来，让我们来看一个示例。

# Example

## 目标

根据搜索关键词返回百度引擎的第一条搜索结果（虽然这就是个爬虫，但是作为一个Example，他很好地涉及到了我们上面讲的所有方面）

## Code

```py
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

def test_edge_session():
    service = EdgeService(executable_path="msedgedriver")
    driver = webdriver.Edge(service=service)
    driver.get("http://www.baidu.com")
    # 显式等待直到搜索框已经存在于DOM树中
    WebDriverWait(driver,10,0.5).until(EC.presence_of_element_located((By.XPATH,'//*[@id="kw"]')))
    print(driver.title)
    word = "Hello world"
    # 获取搜索框并输入关键词
    driver.find_element(By.XPATH,'//*[@id="kw"]').send_keys(word)
    # 获取搜索的按钮并点击
    driver.find_element(By.XPATH,'//*[@id="su"]').click()
    # 由于百度在点击按钮之后并不会跳转页面，所以我们不需要进行页面的切换
    # 这里我们使用显式等待来等待搜索结果产生
    WebDriverWait(driver,10,0.5).until(EC.presence_of_element_located((By.XPATH,'//*[@id="1"]/div/div/h3/a')))
    # 打印查询到的第一个结果
    print(driver.find_element(By.XPATH,'//*[@id="1"]/div/div/h3/a').text)
    driver.quit()

test_edge_session()
```

## Result

![](/assets/TmfHbwk6GovGWLxGQSWcjdLPnuh.png)

可以看到我们成功地拿到了第一条返回结果。

# Selenium（网站自动化测试）的缺陷与弱势区域

## 验证码

验证码 (CAPTCHA), 是 <em>全自动区分计算机和人类的图灵测试</em> <em>(Completely Automated Public Turing test to tell Computers and Humans Apart)</em> 的简称, 是被明确地设计用于阻止自动化的, 所以原则上不推荐尝试使用自动化测试工具测试。想要规避验证码的检查, 主要有两个策略:

- 在测试环境中禁用验证码
- 添加Hook以允许测试绕过验证码

## 文件下载

虽然可以通过在Selenium的控制下单击浏览器的链接来开始下载, 但是API并不会暴露下载进度, 因此这是一种不理想的测试下载文件的方式，况且下载文件并非模拟用户与Web平台交互的重要方面。取而代之的是, 应使用Selenium(以及任何必要的cookie)查找链接, 并将其传递给例如[libcurl](https://curl.haxx.se/libcurl/)这样的HTTP请求库.

## <b>HTTP响应码</b>

> 这个我自己也没有怎么看懂

（en）

For some browser configurations in Selenium RC, Selenium acted as a proxy between the browser and the site being automated. This meant that all browser traffic passed through Selenium could be captured or manipulated. The `captureNetworkTraffic()` method purported to capture all of the network traffic between the browser and the site being automated, including HTTP response codes.

Selenium WebDriver is a completely different approach to browser automation, preferring to act more like a user. This is represented in the way you write tests with WebDriver. In automated functional testing, checking the status code is not a particularly important detail of a test’s failure; the steps that preceded it are more important.

The browser will always represent the HTTP status code, imagine for example a 404 or a 500 error page. A simple way to “fail fast” when you encounter one of these error pages is to check the page title or content of a reliable point (e.g. the `<h1>` tag) after every page load. If you are using the page object model, you can include this check in your class constructor or similar point where the page load is expected. Occasionally, the HTTP code may even be represented in the browser’s error page and you could use WebDriver to read this and improve your debugging output.

Checking the webpage itself is in line with WebDriver’s ideal practice of representing and asserting upon the user’s view of the website.

If you insist, an advanced solution to capturing HTTP status codes is to replicate the behaviour of Selenium RC by using a proxy. WebDriver API provides the ability to set a proxy for the browser, and there are a number of proxies that will programmatically allow you to manipulate the contents of requests sent to and received from the web server. Using a proxy lets you decide how you want to respond to redirection response codes. Additionally, not every browser makes the response codes available to WebDriver, so opting to use a proxy allows you to have a solution that works for every browser.

---

（zh-CN）

对于Selenium RC中的某些浏览器配置， Selenium充当了浏览器和自动化站点之间的代理. 这意味着可以捕获或操纵通过Selenium传递的所有浏览器流量. `captureNetworkTraffic()` 方法旨在捕获浏览器和自动化站点之间的所有网络流量，包括HTTP响应码.

Selenium WebDriver是一种完全不同的浏览器自动化实现， 它更喜欢表现得像用户一样，这种方式来自于基于WebDriver编写测试的方式. 在自动化功能测试中，检查状态码并不是测试失败的特别重要的细节, 之前的步骤更重要.

浏览器将始终呈现HTTP状态代码，例如404或500错误页面. 遇到这些错误页面时，一种“快速失败”的简单方法是 在每次加载页面后检查页面标题或可信赖点的内容（例如 `<h1>` 标签）. 如果使用的是页面对象模型，则可以将此检查置于类构造函数中或类似于期望的页面加载的位置. 有时，HTTP代码甚至可能出现在浏览器的错误页面中， 您可以使用WebDriver读取此信息并改善调试输出.

检查网页本身的一种理想实践是符合WebDriver的呈现以及用户的视角.

如果您坚持，捕获HTTP状态代码的高级解决方案是复刻Selenium RC的行为去使用代理. WebDriver API提供了为浏览器设置代理的功能， 并且有许多代理可以通过编程方式来操纵发送到Web服务器和从Web服务器接收的请求的内容. 使用代理可以决定如何响应重定向响应代码. 此外，并非每个浏览器都将响应代码提供给WebDriver， 因此选择使用代理可以使您拥有适用于每个浏览器的解决方案。

## 邮件以及三方网站

由于多种原因, 不建议使用WebDriver登录Gmail和Facebook等网站. 除了违反这些网站的使用条款之外 (可能会面临帐户被关闭的风险) , 还有其运行速度缓慢且不可靠的因素。

理想的做法是使用电子邮件供应商提供的API, 或者对于Facebook, 使用开发者工具的服务来创建测试帐户、朋友等内容的API。尽管使用API可能看起来有些额外的工作量, 但是速度、可靠性和稳定性都会得到保证，且API不会频繁更改, 但是网页和HTML定位符经常变化, 并且需要更新测试框架的代码.

在任何时候测试使用WebDriver登录第三方站点, 都会增加测试失败的风险, 因为这会使测试时间更长。 通常的经验是, 执行时间较长的测试会更加脆弱和不可靠。

## 性能测试

通常不建议使用Selenium和WebDriver进行性能测试. 因为缺乏针对此类工作的优化, 因而难以得到乐观的结果.

对于用户而言, 在用户上下文中执行性能测试似乎是自然而然的选择, 但是WebDriver的测试会受到许多外部和内部的影响而变得脆弱, 这是您无法控制的. 例如, 浏览器的启动速度, HTTP服务器的速度, 托管JavaScript或CSS的第三方服务器的响应 以及WebDriver实现本身检测的损失. 这些因素的变化会影响结果. 很难区分网站自身与外部资源之间的性能差异, 并且也很难明确浏览器中使用WebDriver对性能的影响, 尤其是在注入脚本时.

另一个潜在的吸引点是"节省时间"-同时执行功能和性能测试. 但是, 功能和性能测试分别具有截然不同的目标. 要测试功能, 测试人员可能需要耐心等待加载, 但这会使性能测试结果蒙上阴影, 反之亦然.

为了提高网站的性能, 您需要不依赖于环境的差异来分析整体性能, 识别不良代码的实践, 对单个资源 (即CSS或JavaScript) 的性能进行细分 以了解需要改进的地方. 有很多性能测试工具已经可以完成这项工作, 并且提供了报告和分析结果, 甚至可以提出改进建议。

## 网络爬虫

建议不要使用WebDriver来通过链接进行爬虫， 因为其绝对不是最理想的工具。 WebDriver需要一些时间来启动，并且可能要花几秒钟到一分钟的时间， 具体所花的时间取决于测试的编写方式。

除了使用WebDriver之外， 您还可以通过执行 [curl](https://curl.haxx.se/) 命令或 使用诸如BeautifulSoup之类的库来节省大量时间， 因为这些方法不依赖于创建浏览器和导航至页面.。因此不使用WebDriver可以节省大量时间。

## <b>双因素认证</b>

双因素认证通常简写成 <em>2FA</em> 是一种一次性密码（OTP）通常用在移动应用上例如“谷歌认证器”， “微软认证器”等等，或者通过短信或者邮件来认证。在Selenium自动化中这些都是影响有效自动化的极大挑战。虽然也有一些方法可以自动化这些过程，但是同样对于Selenium自动化也引入了很多不安全因素。 所以你应该要避免对2FA自动化。

这里有一些对于如何绕过2FA校验的建议：

- 在测试环境中对特定用户禁止2FA校验，这样对于这些特定用户可以直接进行自动化测试。
- 禁止2FA校验在测试环境中。
- 对于特定IP区域禁止2FA校验，这样我们可以配置测试机器的IP在这些白名单区域中。

