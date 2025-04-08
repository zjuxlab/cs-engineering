---
title: golang基础
slug: golang基础
sidebar_position: 0
---


# golang基础

Author: 陈岩

# 概述

为什么使用Golang呢？

- 编译语言，性能好
- 有丰富的资料
- 语法“特性”少，不易踩坑

其他选择

- C#、Java技术栈也欢迎大家开拓技能树
- Python就算了，写大项目会死掉

# Golang语法

<b>最基础的语法就不说了</b><b>，大家可以看官方quick start</b>

<b>或者更详细的tutorial</b>

<b>往下阅读进阶之前，你至少需要知道如下内容：</b>

- `if` `for` 
    - `if err:=DoSth();err!=nil {}`
    - `for index,item := range list/map/channel {}`
        - <b>非引用类型的item在循环内删改无效</b>

- `func` 
    - function返回多值的写法
        - `func x() T1,T2 {}`
        - `func x() (var1 T1, var2 T2) {}`

- `struct` `interface`

> 没有class的golang，乐色

- `package` `import`
    - 注意下面几种import的区别：

- golang历史上曾出现过的几种包管理方式
    - `go modules`
        - `go mod` 配置以及包的安装
            - 环境变量和代理
    - `GOPATH`（optional）

- 大驼峰和小驼峰区别
    - thisIsProtected
    - ThatIsPublic

- `array[N]` `slice[]` `map[KEY]VALUE`
    - make(T)的使用方法

- `defer` `panic` `recover`
    - 常用defer进行close的工作
    - 服务器在每个请求最外层默认包含了panic的处理503

- golang的结构体和接口和（蹩脚的）方法
- 手长100m的编译器（变量未使用、包未使用保存等）

## 值和引用

和众多语言一样，golang在传参和赋值的时候也有值和引用的区别

- 值：数据复制一份；互不干扰
- 引用：共用内存，修改会在其他地方同步

在Golang中，只有`map`和`slice`是引用类型，（当然其他类型做引用也可以像C一样使用指针`*ptr`）

【特别注意】golang有数组和slice的区别，数组是定长内存，是传值；slice是可变长度的，是传引用

【一个坑】

```go
func (obj Clazz) Method()
func (obj *Clazz) Method()
```

其中第一个是值传递，不会修改调用者结构体本身
第二种才是对应典型的其他语言类方法

## Tag和序列化

在Golang的序列化中，大量使用Tag，因此需要掌握，并学会合理使用

【Tag原理】

【Json中的Tag】

【SQL数据库ORM中的Tag】

【用于序列化的注意事项】

一定是大写首字母的Public字段才能被反射访问从而序列化！

## Class？

在C中，struct是多个数据的捆绑类型

在Java中，没有struct，只有class；class描述了一类对象上的方法（函数）和属性（变量）

在Golang（包括Rust）中，保留了C中struct的捆绑类型的语义，而运行在struct上增添方法调用

因此，Golang实现的是一种极其简化的面向对象特性，基本不支持多态，也不能完善的实现继承；但是，Golang有如下特性

- 接口（关键词叫Interface，实际上是Trait）
- 虚假的类继承（继续匿名嵌套对象）

```go
struct BaseClazz { 
    some vars... 
}
struct ChildClazz {
    BaseClazz
    some vars...
}

func Test() {
    base := BaseClazz{}
    obj := ChildClazz{ 
        BaseClazz: base, 
        x: xx, y: yyy 
        }
    obj.SomeBaseClazzMethod()
}
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>❗</div>
<p>由于类是结构体实现的，在语法上可以随意拷贝</p>
<p>但是需要注意在语义上是否可以拷贝，是否需要深拷贝的问题</p>
<p>（深拷贝自行搜索含义   举个例子：链表不能浅拷贝）</p>
</div>

## Goroutine和Channel

go协程和管道是golang中特有的实现并发的概念；需要理解其原理，并学会使用

【注】gin的处理事件本身就是个协程；大多数情况不需要额外写协程；

如果需要同时进行多向阻塞IO，则需要协程来提升效率

## 错误处理

golang 中用两套机制区分了错误（Error）和异常（Panic）。错误以返回值的方式返回，异常将引起线程中止。

由于没有catch；

而panic又过于复杂且表意“致命异常”和一般程序异常语义不一致（且终止一个线程开销还是比较高的）；

golang通过多返回值的方式处理错误：

```go
return_value, err := SomeFunc(...)
if err!=nil {
    ... handle exception
    return
}
```

因此，在自己写函数时，也要尽量遵循这样的写法，来保证代码风格统一

这样子的写法虽然很冗长很丑，但是基本上可以保证不会让程序在异常状态下跑飞，这和Golang在严谨的后端应用场合避免出现意外是相吻合的

### 自定义error

定义一个方法，输出错误

```go
type myErr struct {
   code int
   msg  string
}

func (e myErr) Error() string {
   return fmt.Sprintf("code:%d,msg:%v", e.code, e.msg)
}

func New(code int, msg string) error {
   return myErr{
      code: code,
      msg:  msg,
   }
}

func GetCode(err error) int {
   if e, ok := err.(myErr); ok {
      return e.code
   }
   return -1
}

func GetMsg(err error) string {
   if e, ok := err.(myErr); ok {
      return e.msg
   }
   return ""
}
```

## 匿名函数和匿名结构体

在单次使用的地方（如服务器的某个请求的参数），结构体为了不污染全局，建议使用匿名结构体

```go
var x struct{
    A int `json: "AAA"`
    B string `json: "BBB"`
}
```

而局部使用的协程或回调函数（好像也没有？），建议使用匿名函数

```go
go func() {
} ()
```

## 包管理

- Golang自带了一套基于github的包管理系统
    - 注：这玩意真是个大坑

- go get 从github上下载最新版的代码并放入项目依赖
    - `go.mod`记录直接依赖及包的间接依赖列表
    - `go.sum`记录每个包的hash值，用来避免谁都能改的github仓库造成同一版本不同代码的问题

> 如果要将自己的包放到github上发型，则go init时的包名要和github路径完全相同

### 坑

Golang的包松散的在Github上分布，大多依靠口碑进行传播

除此之外，大多数Golang的库，帮助文档都简单的没法看，很多复杂功能只能自己看源码做测试

另外的一点就是，Golang在引用包上，设计也是别有洞天<del>（肯尼迪直呼）</del>

其体现为：包只能引用import的那个层级，不能相对路径或绝对路径进行引用

例如，对于如下包结构

- feature1
    - utils
    - common

- feature2
    - utils
    - common

那么我不能`feature2.utils.XXX`

而只能通过`utils.XXX`进行调用

这无疑会在复杂的项目架构下导致同名子包混淆的问题

Golang提供了引用时包重命名的方法，但写起来也是非常麻烦，并且没有代码提示

除此之外，Golang的包还不能循环引用；这一点也非常难受

这也就意味着

`package A:  A.XXX B.YYY`

`package B:  B.XXX B.YYY`

则不得不把公用的`B.YYY`部分代码独立出来，才能通过编译

当然这一类功能通常是类型定义或基础函数，可以独立为common之类的包

但依然是非常头大的一件事

> 亲其师信其道；用了Golang的“简洁”，这个包管理的贼船也逃不掉

## 泛型特性

号外号外！golang终于出泛型特性了！

例如根据id搜索数据数据的如下伪代码：

```text
func GetById[T](id string) T {
    var res T
    table := GetTableByType[typeof(T)]
    table.Search({"id": id}).Unmarshall(&res)
    return res
}
```

# Memory Leak and Goroutine Leak

进阶地使用golang，需要清楚golang的一些其他特性。

提问：Golang的指针和C/C++中的指针有何异同？

你需要了解：

- Golang的变量内存分布。逃逸判定和堆/栈变量分配。
- Golang中的指针传值和复制传值。

Golang和C系语言不同之处在于，Golang是GC语言。那么你需要了解以下内容以避免Memory Leak和减少GC压力。

- Golang的GC规则，何时判定并GC。
- Golang关于GC的一些Best Practice。

例如，以下例程是否会引起Memory Leak？

```go
// 对于重复涌入的请求，每次都会调用以下Handler进行处理。在Timeout后进行GC。
func MemoryLeakHandler(r *http.HttpRequest, w *http.HttpResponseWriter) error {
    ch := make(chan)
    go func(){
       // 业务逻辑，io阻塞类，有可能超时。结束时通过c1提示主Handler。
       ch <- 1
    }

    select {
        case <-time.After(500 * time.Millisecond):fmt.Println("timeout! exit...")
            return errors.New("Timeout")
        case result := <-ch:
            fmt.Printf("result: %d\n", result)
            return nil
    }
}
```

建议阅读：

# Golang后端常用类库

下一节会带着写个服务器模板；下面是实际项目需要使用的一些类库，大家自行查阅学习

- 配置文件：Viper
- 序列化：自带的`encoding/json` 

- 服务器框架：gin，echo等
- 数据库访问：go-mongo  gorm等（之后会结合数据库章节细讲）
- 网络请求：`http`
- 日志系统：logrus

