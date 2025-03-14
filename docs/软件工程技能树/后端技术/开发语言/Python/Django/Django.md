---
title: Django
slug: Django
sidebar_position: 0
---


# Django

Author：陈宇涵

## 创建项目

```bash
django-admin startproject <project-name>
```

- 这个命令创建出：

![](/assets/AOcSbX4OfoAqnNxEixccYclZnBe.png)

- `settings.py` 包含所有的网站设置。这是可以注册所有创建的应用的地方，也是静态文件，数据库配置的地方，等等。
- `urls.py` 定义了网站 URL 到 view 的映射。虽然这里可以包含所有的 url，但是更常见的做法是把应用相关的 URL 包含在相关应用中，你可以在接下来的教程里看到。
- `wsgi.py` 帮助 Django 应用和网络服务器间的通讯。你可以把这个当作模板。
- `manage.py` 脚本可以创建应用，和数据库通讯，启动开发用网络服务器。例如创建应用：

```bash
python manage.py startapp <app-name>
```

- 这个命令创建出应用的一系列附属物：

![](/assets/Qb2Ob2YEZoFkz6xxBggccqlJn0f.png)

此时，要将 `catalog.apps.CatalogConfig` 添加到 `settings.py` 的 `INSTALLED_APP`，这里存放着各种应用。同样 `DATABASES` 可以设置数据库（PostgreSQL）：

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydatabase', # db name in postgreSQL
        'USER': 'mydatabaseuser',
        'PASSWORD': 'mypassword',
        'HOST': '127.0.0.1', # or 'localhost' ?
        'PORT': '5432',
    }
}
```

- 注意安装依赖：`pip install Django psycopg2`
- [I] 应用是类似于页面的概念
- [c] 好吧，并不是。页面还是归 `url` 管理，应用的作用更多的是方便管理功能 

# Concepts

- [9] 比较重要的概念有 `url`，`view`，`template` 和 `model`，一般的逻辑是 `view` 通过使用 `template` 中的 HTML 创造出网页，同时写明相应逻辑（比如处理 POST，这个过程可能用到 `model` 进行数据库操作），然后由 `url` 将浏览器中的路径映射到这些 `view` 创造出的网页。

## URLs

`url.py` 可以管理所有 URL 映射，也可以把映射留到相关应用中

`urlpatterns` 管理这些映射，其中包含许多 `path` 函数，其中的路由是一个字符串，用于定义要匹配的 URL 模式。该字符串可能包括一个命名变量（尖括号中）

```py
urlpatterns = [
    path("admin/", admin.site.urls),
]
```

例：`'catalog/<id>/'`。此模式将匹配如 `/catalog/_any_chars_/` 的 URL，并将 `any_chars` 作为具有参数名称 `id` 的字符串传递给视图。

### `path()`

```py
path(route, view, kwargs=None, name=None)
```

处理 URL 请求的核心函数

- `route`：接收的 URL 路径，需要符合 RE
- `view`：这一 URL 对应的视图
- `name`：可选参数，为对应的视图命名，指定了唯一的 URL 映射，可以在模板中使用，比如：

```py
<a href="{% url 'index' %}">Home</a>.
```

### 请求转发

```py
from django.conf.urls import include
urlpatterns += [
    path('catalog/', include('catalog.urls')),
]
```

这个 `include()` 函数将我们以 `catalog` 开头的请求全部转发给 `catalog` 应用，由 `catalog/` 路径下的 `urls.py` 进行处理，有助于我们将整个网站简洁化

- `include()` 函数排除 URL 中已有的 `catalog`

### 重定向

```py
from django.views.generic import RedirectView
urlpatterns += [
    path('', RedirectView.as_view(url='/catalog/')),
]
```

这个东西把我们访问的网站根目录重定向到 `catalog` 目录

- 第一个参数留空表示 `/`，否则会报错

### 静态文件

```py
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

暂不清楚具体的作用方式

## 视图

- [9] 视图是处理 HTTP 请求的功能，根据需要从数据库获取数据，通过使用 HTML 模板呈现此数据生成 HTML 页面，然后以 HTTP 响应返回 HTML 以显示给用户。索引视图遵循此模型 - 它提取有关数据库中的信息，并将其传递给模板以进行显示。

> [!warning]
> 为了避免 POST 请求得到 403，需要在视图函数前加 `@csrf_exempt` 修饰器

在应用中加入 `views.py`，就可以写视图，如：

```py
from django.http import HttpResponse
 
def hello(request):
    return HttpResponse("Hello world ! ")
```

然后将这个 `view` 绑定到指定的 URL 上，如：

```py
from django.urls import path
from . import views
 
urlpatterns = [
    path("hello/", views.hello, name="hello"),
]
```

这样便可以在对应的 URL 看到东西

一个视图包含关键的请求和相应

### `HttpRequest`

就是传给视图的对象，包含请求的信息

#### GET

一个字典对象，包含 GET 方法的所有参数，使用 `get()` 方法取回：

```py
name = request.GET.get("name")
```

#### POST

与 GET 具有类似的应用

#### body

POST 的请求体

#### path

以字符串形式获取 URL 的路径部分

#### method

返回 `GET` 或者 `POST`

### `HttpResponse`

视图需要返回这一对象，否则网页上看不到东西（但是仍然可以执行相应的逻辑），要生成这一对象，有以下三种方式：

#### `HttpResponse()`

简单地返回文本，其中的 HTML 标签会得到渲染

#### `render()`

接受一个 `request`，一个页面名称，以及可选的页面参数（字典），返回字符串

#### `redirect()`

跳转到新页面，接收页面路径

- 下面两种方式，可以视为第一种对象的封装

## 模板 Template

- [9] 模版是定义一个文件（例如 HTML 页面）的结构与布局的文本文件，其中占位符用于表示实际内容。

### 食用方式

在根目录创建 `/template` 目录，并建立 HTML 文件，如：

```django
<h1>{{ hello }}</h1>
```

然后修改 `settings.py`，指出模板路径：

```py
TEMPLATES = [
    ...
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
    ...
]
```

- 注意此文件原先未引入 `os`
- 如果不这样设置，Django 会自动在应用程序路径下寻找 `templates` 文件夹

然后我们修改 `views.py`：

```py
from django.http import HttpResponse
from django.shortcuts import render

def hello(request):
    context = {}
    context['hello'] = 'Hello World!'
    return render(request, 'hello.html', context)
```

以及 `urls.py`：

```py
...
    path("hello/", views.hello),
```

- [I] 可见我们使用 `render` 代替先前的 `httpResponse`，并传入 `context` 字典，用字典中的键值完成了数据和视图的分离
- 可以在 `context` 中定义并使用更多数据类型，如

```py
# views.py
    context['list'] = [1, 2, 3]
    # hello.html
    <a>{{ list.1 }}</a> # that is '2'
```

### 标签

#### 基本变量

在 `views` 一步以字典形式传入的变量都可以通过 `{{ name }}` 的形式调用，包括字典本身，注意字典和列表都用 `.` 取值

#### 过滤器

使用 `{{ name | attr }}` 的方式在变量被显示之前进行修改

- 可以套接，比如：`{{ name | first | lower }}`
- 需要指定值的过滤器，以字符串形式加在冒号后

常用的过滤器有：

- `default`：如果 `view` 传入了 `false` 或 `0`, `None` 之类的，使用指定的默认值
- `length`：返回对象的长度
- `filesizeformat`：格式化文件大小
- `date`：格式化日期，参考 `Y-m-d H:i:s`
- `truncatechars`：截断并显示为 `...`
- `safe`：不转义字符串

#### 注释

`{# ... #}`

#### include

包含其他模板

#### 条件

```django
{% if condition1 %}
   ... display 1
{% elif condition2 %}
   ... display 2
{% else %}
   ... display 3
{% endif %}
```

- 可以接受 `and`，`or` 和 `not`

```django
{% ifequal section 'sitenews' %}
    <h1>Site News</h1>
{% else %}
    <h1>No News Here</h1>
{% endifequal %}
```

#### 循环

类似 python 语法的 for 循环，如：

```django
{% for i in views_list %}
{{ i }}
{% endfor %}
```

- 加入 `reversed` 可以反向迭代
- 通过 `{{ forloop }}` 获取循环序号：
    - `forloop.counter`：顺序获取循环序号，从 1 开始
    - `forloop.counter0`：顺序获取循环序号，从 0 开始
    - `forloop.revcounter`
    - `forloop.revcounter0`
    - `forloop.first`（一般配合if标签使用）：第一条数据返回 True，其他数据返回 False
    - `forloop.last`

- `{% empty %}` 在循环为空时执行

#### 静态文件

在根目录新建 `static/` 目录，并写入 `settings.py`：

```py
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
```

然后在模板中如此使用：

```django
{% load static %}
<link rel="stylesheet" href="{% static 'css/styles.css' %}" />
```

#### 拓展模板

声明一个基本模板，然后替换每个特定页面的不同位置

先有 `base.html`：

```django
<!doctype html>
<html lang="en">
  <head>
    {% block title %}
    <title>Default Base Title</title>
    {% endblock %}
  
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/styles.css' %}" />
  </head>
  
  <body>
    {% block sidebar %}
    <p>Default Sidebar</p>
    {% endblock %}
    {% block content %}
    <p>Default Content</p>
    {% endblock %}
  </body>
</html>
```

- `block` 和 `endblock` 标记了模板

然后在其他 HTML 页面拓展它：

```django
{% extends "base.html" %}

{% block title %}
<title>An Extended Page</title>
{% endblock %}

{% block content %}
    <h1>Generic</h1>
    <p>This page is extended.</p>
{% endblock %}
```

## 模型

项目中建立的模型以以下方式迁移到数据库中

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

- `makemigrations` 创建迁移但不应用，让你能够进行修改检查
- `migrate` 进行迁移

在应用的 `models.py` 中建表：

```py
from django.db import models
  
# Create your models here.
class Test(models.Model):
    name = models.CharField(max_length=20)
```

其中类名即表名，且 Django 会自动添加一个 id 作为主键

### 数据库操作

以下操作都发生在某个 `view` 中，使用它们的时候当然要先做 URL 映射

#### 增

```py
test1 = Test(name='Test Instance')
    test1.save()
```

- 相当于 `INSERT`

#### 删

只需要调用 `delete()` 方法

```py
test1 = Test.objects.get(id=1)
    test1.delete()
    
    Test.objects.filter(id=2).delete()
    
    Test.objects.all().delete()
```

#### 查

```py
# ini
    response = ""
    response1 = ""
    
    # SELECT * FROM
    listTest = Test.objects.all()
    
    # WHERE
    response2 = Test.objects.filter(id=1) 
    
    response3 = Test.objects.get(id=1) 
    
    # OFFSET 0 LIMIT 2;
    Test.objects.order_by('name')[0:2]
    
    Test.objects.order_by("id")
    
    Test.objects.filter(name="runoob").order_by("id")
    
    for var in listTest:
        response1 += var.name + " "
    response = response1
    return HttpResponse("<p>" + response + "</p>")
```

#### 改

```py
# UPDATE
    test1 = Test.objects.get(id=1)
    test1.name = 'Google'
    test1.save()
    
    Test.objects.filter(id=1).update(name='Google')
    
    Test.objects.all().update(name='Google')
```

# Functions

## 表单

一般较为常用的方式是通过 POST 提交表单，下面的方法是在同一个页面展示输入表单以及相应结果的极简方式。

首先需要表单视图，这里写明了未搜索以及搜索结果的简单展示：`search.py`

```py
def search_post(req):
    ctx = {}
    if req.POST:
        ctx['rlt'] = req.POST['query']
    else:
        ctx['rlt'] = 'You have not searched yet.'
    return render(req, 'post.html', ctx)
```

- 处理逻辑写在这里，这里仅仅将搜索输入展示出来

为了调用这一借口，需要如下的表单：`templates/post.html`

```django
<form action="/search-post/" method="post">
            {% csrf_token %}
            <input type="text" name="query"></input>
            <input type="submit" value="Search"></input>
        </form>

        <p>{{ rlt }}</p>
```

然后将 `search-post/` URL 映射到这个视图：`urls.py`

```py
urlpatterns += [
    path('search-post/', search.search_post),
]
```

- 可见 URL 以及 POST 的目标 URL 是相同的，这样在一个页面就能处理所有逻辑
- 这样做的坏处暂时不知道，最好是么有

