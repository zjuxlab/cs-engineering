---
title: 一种Rust web技术栈
slug: 一种Rust web技术栈
sidebar_position: 2
---


# 一种Rust web技术栈

Author：张立冬

> 笔者注：由于要上rust短学期，看课程要求要在10天内，从rust基础语法到rustのweb&微服务开发，对于以难学难用闻名的rust来说可能多少有点离谱，于是在假期偷跑一下，在大概看过语法知识点后，以一个rust下的短链接为切入点，理解一下rust哲学，学习一下rust下web前后端开发的技术栈

> 项目是找的&好像没有开源协议，不过学习用途应该关系不大吧qwq

仓库地址：

https://github.com/snack8310/tiny-url -&gt; 后端

https://github.com/snack8310/tiny-url-web -&gt; 前端

<b>web后端框架</b>

actix-web：文档[Welcome | Actix](https://actix.rs/docs/)

actix-web是rust比较完善和热门的框架之一，有详尽的文档和示例，对学习曲线友善。

## tiny-url

### 0.使用cargo创建rust项目

略，见rust官方文档https://rustwiki.org/zh-CN/book/

添加actix-web到Cargo.toml，添加依赖

### 1.修改main.rs文件

包含几个基本的路由函数和启动服务的main函数，对于有一些web后端开发经历的同学来说，应该是感到熟悉的。

```rs
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

#### rust与go不同的一些语法

至此，我们得到了一个完整的可运行的rust的web server程序，对比使用go实现的版本，可见代码稍长，启动服务的函数调用略长。区别最大的是将路由函数绑定在路径上是用#的‘语句’实现的

1. `#`: 在Rust中，`#`符号用于表示一个属性（attribute）。属性是一种元数据，可以用于为Rust代码提供附加信息，例如告诉编译器如何处理代码或者向宏提供额外的信息。如此设计，使得代码自身可读性增强，承担了部分之前注释的功能，在设置#后再main函数中service设置handler时就会将其绑定在对应的路径上了。
2. rust中的异步：对于异步的实现rust使用的是async+await方式，和go的channel+goroutine不同，不过因为笔者对于go的异步不甚了解qwq，就不赘述了
3. rust中的闭包：我们希望能够在程序的一个位置指定某些代码，并只在程序的某处实际需要结果的时候 <b>执行</b> 这些代码。这是闭包的用武之地，在rust中闭包有不同的语法，可见上面代码中的||就是显示的闭包定义，可以以不同的方式捕获环境中的变量，区别于go好像只用过匿名函数，俺对其他的闭包不甚了解qwq

### 2.修改handler函数，增加业务逻辑

为了实现短链接功能，创建如下几个handler函数，分别设置路由

- 增加短链接
- 查询全部短链接
- 对于给出的短链接跳转对应原链接网页

```rs
#[post("/create")]
async fn create_link() -> impl Responder {}

#[get("/{code}")]
async fn get_from_link() -> impl Responder {}

#[get("/links")]
async fn get_all_links() -> impl Responder {}
```

### 3.增加model结构体

```rs
#[derive(Deserialize, Serialize, Debug, Clone)]
struct Link {
    tiny_code: String,
    origin_url: String,
}

#[derive(Deserialize, Clone)]
struct ApiAddLink {
    origin_url: String,
}

impl ApiAddLink {
    fn to_new_link(self) -> Link {
        Link {
            tiny_code: nanoid!(5),
            origin_url: self.origin_url,
        }
    }
}
```

rust有和cpp相似的面向对象的语法特点，这一点从上面的结构体定义代码中国，定义结构体后可以使用impl语句定义结构体的方法可以看出。

值得一提的是其中的`derive`语句，要正确的理解他们的含义，可能需要对rust中核心概念所有权有所了解：[认识所有权 - Rust 程序设计语言 中文版](https://rustwiki.org/zh-CN/book/ch04-00-understanding-ownership.html)

Rust 中的所有权是一种编程语言的概念，用于管理在内存中分配的资源。在 Rust 中，每个值都有一个所有者，同时一个值只能有一个所有者。当所有者超出其作用域或被释放时，它所拥有的资源（如堆上的内存）会被自动释放。

因为值的所有权只能有一个，所以在默认的情况下一些常见行为中，所有权会进行传递，例如函数传参和值拷贝。（这个不太能说清楚，but感觉上面的文档中说的贼好

`derive` 语句可以自动为我们定义的结构体实现一些trait，例如derive属性宏为自定义类型自动生成 `clone` 方法。可以 `clone` 方法会产生一个与原始数据完全相同的新实例，而不是转移所有权。

另：nanoid是一个rust中用于生成随机数的库，再所示代码中使用库中的宏生成了一个5位的随机数，值得一提的是在使用 `nanoid` 生成随机字符串时，生成的字符串是非常接近唯一的，但并不能保证绝对的唯一性。`nanoid` 使用了一个算法来生成随机字符串，其中包含了时间戳和随机数等信息，以确保生成的字符串尽可能地独一无二。对于大多数情况，生成的字符串在实践中几乎是唯一的，因为生成的概率非常低。

### 3.封装统一的返回值和`serde::Serialize`

对于api函数中的不同返回值，可能存在各种各样的类型，一个很好的方法，是将其封装在一个结构体的data部分，其他部分表示请求的成功与否和错误信息。如此的好处是方便前端处理，值得一提的是rust中有类似的语法机制`Result<T, E>`，在文档中有比较多的介绍。

使用`serde::Serialize` 库可以方便的对为自定义数据结构实现序列化和反序列化，如下

`#[derive(Serialize)]`为自定义数据类型自动实现了序列化

```rs
use serde::Serialize;

#[derive(Serialize)]
pub struct ApiResult<T: Serialize> {
    pub ok: bool,
    pub err: Option<String>,
    pub data: Option<T>,
}

impl <T: Serialize> ApiResult<T>{
    pub fn success(r: Option<T>) -> ApiResult<T>{
        ApiResult{
            ok: true,
            err: None,
            data: r,
        }
    }
    pub fn error<E: ToString>(err: E)-> ApiResult<T> {
        ApiResult{
            ok: false,
            err: Some(err.to_string()),
            data: None,
        }
    }
}
```

### 4.连接数据库

由于原作者没有使用orm，个人感觉是他完成的时候还没有好用的异步的orm，也可能是对于这个项目来说orm有一点不适合（orm可能会损失性能），如今rust也有哦了

`sqlx` 是一个 Rust 语言的很好用的异步数据库连接工具，好在和很多框架例如actix无缝衔接可以协同工作，并且支持预编译查询稍微安全的同时提升了查询的性能。

关于`sqlx`使用还是相对简单的，并且和go中的`sqlx` 很相似，具体可以参看博文[Interacting with databases in Rust using Diesel vs. SQLx - LogRocket Blog](https://blog.logrocket.com/interacting-databases-rust-diesel-vs-sqlx/)或sqlx官方文档

### 5.配置的隔离

类似go中使用的vaper，在rust中也有类似的库，`config` [config - Rust](https://docs.rs/config/latest/config/)

### 6.文件上传

由于原项目中没有，例子来源是在某论坛里找到的（不保证没问题qwq，但确保能跑qwq，分开创建文件和写入文件的原因是，原博主说由于文件的上传可能需要分片，不分开会存在问题，并未进行实测

```rs
fn save_file_create(name: String) {
    let filepath = std::path::Path::new(SAVE_DIR).join(name);
    std::fs::File::create(&filepath).unwrap();
}

fn save_file_add(name: String, file: web::Bytes) -> Result<(), std::io::Error> {
    let filepath = std::path::Path::new(SAVE_DIR).join(name);
    let mut f = std::fs::OpenOptions::new()
        .append(true)
        .open(&filepath)
        .unwrap();
    f.write_all(&file)
}
#[post("/upload/{name}")]
async fn upload(
    name: actix_web::web::Path<String>,
    mut payload: actix_multipart::Multipart,
) -> Result<actix_web::HttpResponse, Error> {
    save_file_create(name.to_string());
    // iterate over multipart stream
    while let Some(item) = payload.next().await {
        let mut field = item?;
        // Field in turn is stream of *Bytes* object
        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            save_file_add(name.to_string(), data).unwrap();
        }
    }
    Ok(actix_web::HttpResponse::Ok().into())
}
```

### 7.登录的实现

参考项目：

https://github.com/karthickai/actix_login

👆一个很纯粹，无炫技的rust登录demo

