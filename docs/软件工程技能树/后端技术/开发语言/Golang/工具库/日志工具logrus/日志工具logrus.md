---
title: 日志工具 logrus
slug: 日志工具 logrus
sidebar_position: 0
---


# 日志工具 logrus

Author:欧阳创宇

# Intro

## What's Logrus?

golang 标准库的日志框架非常简单，仅仅提供了 `print` 、 `fatal` 、 `panic` 三种函数用于输出不同等级的日志，对于更精细的日志级别、钩子函数等方面并没有提供支持，所以催生了很多第三方的日志库。Logrus 是目前 Github 上 Star 最多的日志库。它功能强大、性能高效，且具有高度灵活性，很多著名的开源项目（如 docker）都使用了 logrus 作为日志工具。

## Quick Start

### Installation

```go
go get github.com/sirupsen/logrus
```

### Usage Example

```go
package main

import (
    "github.com/sirupsen/logrus"
)

func main() {
    logrus.WithFields(logrus.Fields{
        "animal": "walrus",
    }).Info("A walrus appears")
}
```

运行结果：

```go
INFO[0000] A walrus appears                              animal=walrus
```

# Logrus Basic

## Log Info Level

Logrus 为不同粒度的日志信息提供了七种日志级别：`Trace` 、 `Debug` 、 `Info` 、 `Warn` 、 `Error` 、 `Fatal` 、 `Panic` 。这是 golang 官方日志包 log 的日志级别的超集（事实上，整个 logrus 包完全兼容 log 包的 API ，因此可以非常方便地将项目从 log 包迁移到 logrus 包）。

对于不同等级的日志信息的输出，logrus 提供了与日志级别同名的接口，通过它们即可实现输出。

```go
package main

import (
    "github.com/sirupsen/logrus"
)

func main() {
    logrus.Trace("trace msg")
    logrus.Debug("debug msg")
    logrus.Info("info msg")
    logrus.Warn("warn msg")
    logrus.Error("error msg")
    logrus.Fatal("fatal msg")
    logrus.Panic("panic msg")
}
```

运行结果：

```go
INFO[0000] info msg                                     
WARN[0000] warn msg                                     
ERRO[0000] error msg                                    
FATA[0000] fatal msg                                    
exit status 1
```

可以看到这里的运行结果和简单的输出七条不同等级的日志相比有两个区别：

1. `Trace` 等级和 `Debug` 等级的日志信息没有输出
2. `Fatal` 等级后程序 `exit status 1` 退出，没有运行 `logrus.Panic("panic msg")`

对于第二点，其实这样的结果是符合预期的。实际上，logrus 在输出一条 `Fatal` 等级的日志信息后会调用 `os.Exit(1)` 来退出程序；相应的，在输出一条 `Panic` 等级的日志信息后会调用 `panic()` 来崩溃退出。

而对于第一点，它的原因是 logrus 有一个输出日志级别，低于这个级别的日志将不会输出。logrus 默认的输出日志级别是 `Info` ，因此我们的 `Trace` 和 `Debug` 两个等级的日志没有打印出来。想要改变这个日志级别，可以通过

```go
logrus.SetLevel(level)
```

例如：

```go
package main

import (
    "github.com/sirupsen/logrus"
)

func main() {
    logrus.SetLevel(logrus.TraceLevel)

    logrus.Trace("trace msg")
    logrus.Debug("debug msg")
    logrus.Info("info msg")
    logrus.Warn("warn msg")
    logrus.Error("error msg")
    logrus.Fatal("fatal msg")
    logrus.Panic("panic msg")
}
```

运行结果：

```go
TRAC[0000] trace msg                                    
DEBU[0000] debug msg                                    
INFO[0000] info msg                                     
WARN[0000] warn msg                                     
ERRO[0000] error msg                                    
FATA[0000] fatal msg                                    
exit status 1
```

可以看到，这次我们成功的把 `Trace` 和 `Debug` 两个等级的日志打印出来了。

## Additional Information

### Caller Name

如果想要在打印的日志信息中加上调用函数信息，那么可以通过

```go
logrus.SetReportCaller(true)
```

来实现，例如：

```go
package main

import (
    "github.com/sirupsen/logrus"
)

func myCaller() {
    logrus.Info("Test logging the caller's name.")
}

func main() {
    logrus.SetReportCaller(true)
    myCaller()
}
```

结果如下：

```go
INFO[0000]/home/yasyakarasu/Documents/logrus/src/main.go:8 main.myCaller() Test logging the caller's name.
```

可以看到 Caller's Name 成功打印在了输出中。

### Fields

相比于一长串不可解析的日志信息， logrus 鼓励使用者通过结构化的方式来进行日志的输出。例如，相较以传统的日志形式输出 `log.Fatalf("Failed to send event %s to topic %s with key %d")` ，logrus 更希望能用这样的形式：

```go
logrus.WithFields(logrus.Fields{
    "event": event,
    "topic": topic,
    "key":   key,
}).Fatal("Failed to send event")
```

打印效果如下：

```go
FATA[0000] Failed to send event                          event=myEvent key=myKey topic=myTopic
exit status 1
```

如果只有一对键值对需要输出，那么可以用 `logrus.WithField` 来简化代码

```go
logrus.WithField("key", key).Info("output my key")
```

有些时候我们会希望不同地方的日志语句能够带上同样的一些键值对信息，如果要在这些地方一一写上 `WithFields` 代码，那么无疑会显得很冗杂且增加代码量。这种情况下我们可以用 `logrus.WithField` / `logrus.WithFields` 来创建一个 `logrus.Entry` 对象，之后的日志打印通过这个对象来传递键值对。例如，在和某一应用进行 api 的交互时，我会希望能把每一个请求的返回值 `code` 和返回数据体 `data` 都记录下来，于是我申请一个 `responseLogger` ：

```go
responseLogger := logrus.WithFields(logrus.Fields{
    "code": code,
    "data": data,
})
```

在之后的日志输出时，只需要通过这一个 `logrus.Entry` 对象便能带上这两个数据：

```go
responseLogger.Info("Get response")
responseLogger.Error("Something bad happen")
```

## Formatters

logrus 支持以不同的格式来输出日志信息，其中包本身自带了两种格式：带颜色的文本格式（`logrus.TextFormatter`） 和 JSON 格式（`logrus.JSONFormatter`）。两种格式的样式如下：

TextFormatter:

![](/assets/YFcKbhHtMoRvrOxOyBocNYvFnzb.png)

JSONFormatter:

![](/assets/A4O9baHcsoMQqPxhtpscxDuined.png)

除了官方自带的两种格式外，还有许多第三方的格式包来格式化日志输出，例如：

- [nested-logrus-formatter](https://github.com/antonfisher/nested-logrus-formatter) 以更美观、人类可读的格式输出日志，有更高的格式自由度
- [caption-json-formatter](https://github.com/nolleh/caption_json_formatter) 对于 JSON 格式的展现更美观
- ……

既然有第三方格式包，那么显然，logrus 支持自定义输出格式。自定义一个输出格式很简单，只需要实现 `Formatter` 接口即可。

```go
type Formatter interface{} {
    Format(*Entry) ([]byte, error)
}
```

而 `Formatter` 需要实现的 `Format` 方法接收的参数正是之前提到的 `logrus.Entry` 指针对象。这里把 `logrus.Entry` 类型的定义也贴一下。

```go
type Entry struct {
    Logger *Logger

    // Contains all the fields set by the user.
    Data Fields

    // Time at which the log entry was created
    Time time.Time

    // Level the log entry was logged at: Trace, Debug, Info, Warn, Error, Fatal or Panic
    // This field will be set on entry firing and the value will be equal to the one in Logger struct field.
    Level Level

    // Calling method, with package name
    Caller *runtime.Frame

    // Message passed to Trace, Debug, Info, Warn, Error, Fatal or Panic
    Message string

    // When formatter is called in entry.log(), a Buffer may be set to entry
    Buffer *bytes.Buffer

    // Contains the context set by the user. Useful for hook processing etc.
    Context context.Context

    // err may contain a field formatting error
    err string
}
```

通过这一个参数的信息，我们便可以实现自定义的格式。例如，如果想设计一个只将所有字段按 JSON 格式输出的格式器，可以这样定义：

```go
type MyJSONFormatter struct {
}

func (f *MyJSONFormatter) Format(entry *logrus.Entry) ([]byte, error) {
    serialized, err := json.Marshal(entry.Data)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal fields to JSON, %w", err)
    }
    return append(serialized, '\n'), nil
}
```

这样就实现了上面提到的 JSON 格式器。然后只需要通过 `logrus.SetFormatter` 就可以按照这个格式器的格式进行日志输出了。

```go
func main() {
    logrus.SetFormatter(&MyJSONFormatter{})

    logrus.WithFields(logrus.Fields{
        "event": "myEvent",
        "topic": "myTopic",
        "key":   "myKey",
    }).Fatal("Failed to send event")
}
```

运行结果：

```go
{"event":"myEvent","key":"myKey","topic":"myTopic"}
exit status 1
```

## Output Redirection

logrus 默认的输出是在 `os.Stderr` ，而 logrus 是支持输出重定向的，我们可以将日志的输出重定向到任意一个 `io.Writer` 中。例如，如果想将日志输出到文件中，可以通过 `os.OpenFile` 定义一个 `io.Writer` ，再用 `logrus.SetOutput(out io.writer)`来实现。

```go
file, err := os.OpenFile("logrus.log", os.O_CREATE|os.O_WRONLY, os.ModePerm)
if err != nil {
    logrus.Error("Failed to log to file, using default stderr")
}
logrus.SetOutput(file)

logrus.WithFields(logrus.Fields{
    "event": "myEvent",
    "topic": "myTopic",
    "key":   "myKey",
}).Fatal("Failed to send event")
```

而通过 `io.MultiWriter` ，我们可以实现将日志信息同时输出到多个 `io.Writer` ，例如同时输出到 `bytes.Buffer`  、`os.Stderr` 、 `os.File` 中。

```go
file, err := os.OpenFile("logrus.log", os.O_CREATE|os.O_WRONLY, os.ModePerm)
if err != nil {
    logrus.Error("Failed to log to file, using default stderr")
}

buffer := &bytes.Buffer{}
stderr := os.Stderr

logrus.SetOutput(io.MultiWriter(file, buffer, stderr))

logrus.WithFields(logrus.Fields{
    "event": "myEvent",
    "topic": "myTopic",
    "key":   "myKey",
}).Fatal("Failed to send event")
```

# Logrus Advance

## Logrus Logger Instance

logrus 包中的大部分接口都是对 `logrus.Logger` 类的方法，而之所以在使用这个包的时候不需要声明一个 `logrus.Logger` 类的实例，是因为在包中用默认值创建了一个 `std` 对象，而包最外层的方法都是在操作这个默认的对象。当然，我们也可以通过 `logrus.New()` 创建自己的 `Logger` 对象，尤其是当一个项目中需要有不同配置的 `Logger` 的时候，就可以通过多个 `Logger` 对象来分别应用不同的配置。

```go
stdlog := logrus.New()

stdlog.SetOutput(os.Stderr)
stdlog.SetFormatter(&logrus.TextFormatter{})

filelog := logrus.New()
file, err := os.OpenFile("logrus.log", os.O_CREATE|os.O_WRONLY, os.ModePerm)
if err != nil {
    stdlog.Info("Failed to log to file, using default stderr")
} else {
    filelog.SetOutput(file)
    filelog.SetFormatter(&logrus.JSONFormatter{})
}

stdlog.WithField("io.Writer", "os.Stderr").Info("log to stderr")
filelog.WithField("io.Writer", "os.File").Info("log to file")
```

运行结果： 

- Stderr:

```go
INFO[0000] log to stderr                                 io.Writer=os.Stderr
```

- logrus.log:

```go
{"io.Writer":"os.File","level":"info","msg":"log to file","time":"2022-10-28T12:03:01+08:00"}
```

## Hooks

logrus 强大的一个关键因素就是它支持钩子函数，这大大增强了它的可扩展性。一个 logrus 钩子需要实现 `logrus.Hook` 接口，这个接口的定义如下：

```go
type Hook interface {
    Levels() []Level
    Fire(*Entry) error
}
```

其中 `Levels()` 表示钩子感兴趣的日志等级，只有这些等级的日志才会执行钩子方法；`Fire(*Entry)` 则是日志输出前会调用的钩子方法。在定义了一个钩子以后，只需要通过 `logrus.AddHook(hook logrus.Hook)` 即可添加钩子。

这里以一个最简单的钩子为例，它会在 `logrus.ErrorLevel` 以上等级的日志信息中加上一个字段 `hook: myHook` 。

```go
type myHook struct {
    hookName string
}

func (h *myHook) Levels() []logrus.Level {
    return []logrus.Level{logrus.PanicLevel, logrus.FatalLevel, logrus.ErrorLevel}
}

func (h *myHook) Fire(e *logrus.Entry) error {
    e.Data["hook"] = h.hookName
    return nil
}

func main() {
    h := &myHook{hookName: "myHook"}
    logrus.AddHook(h)

    logrus.Info("info msg")
    logrus.Error("error msg")
}
```

运行结果：

```go
INFO[0000] info msg                                     
ERRO[0000] error msg                                     hook=myHook
```

当然很多钩子都已经有现成的包，不需要再去写具体的逻辑了。在 [wiki](https://github.com/sirupsen/logrus/wiki/Hooks) 可以查到官方罗列的一些推荐的第三方钩子包，这里以 [logrus2telegram](https://github.com/krasun/logrus2telegram) 包为例简单介绍一下。这个包可以通过 telegram bot 把日志信息发送到 telegram 会话中。

```go
package main

import (
    "encoding/json"
    "fmt"
    "time"

    "github.com/krasun/logrus2telegram"
    "github.com/sirupsen/logrus"
)

func main() {
    hook, err := logrus2telegram.NewHook(
        "5707××××××:AAHI6MNTalrn5××××××××××××××××××××××",
        []int64{18800×××××},
        logrus2telegram.Levels(logrus.AllLevels),
        logrus2telegram.NotifyOn([]logrus.Level{logrus.PanicLevel, logrus.FatalLevel, logrus.ErrorLevel}),
        logrus2telegram.RequestTimeout(10*time.Second),
        logrus2telegram.Format(func(e *logrus.Entry) (string, error) {
            serialized, err := json.Marshal(e.Data)
            if err != nil {
                return "", fmt.Errorf("failed to marshal fields to JSON, %w", err)
            }
            return string(append(serialized, '\n')), nil
        }),
    )

    if err != nil {
        logrus.Error("Create telegram hook failed")
    } else {
        logrus.AddHook(hook)
    }

    logrus.WithFields(logrus.Fields{
        "event": "myEvent",
        "topic": "myTopic",
        "key":   "myKey",
    }).Fatal("Failed to send event")
}
```

可以看到，在提供了 telegram bot id 和 chat id 等基本信息后，我们很方便地创建了一个钩子；添加这个钩子后，logrus 便会把所有日志信息发送到我们的 telegram 会话中，且 `logrus.FatalLevel` 及以上的日志信息都会有提醒。运行结果：

![](/assets/YIWUbaoQbo666dxjHfLcsrSwnub.png)

## Fatal Handlers

前文已经提到 logrus 在输出 `logrus.FatalLevel` 等级的日志信息后会执行 `os.Exit(1)` 来退出程序。在这两者之间， logrus 支持注册一个或多个错误处理函数，当有 `Fatal` 日志输出后，这些注册的错误处理函数将会被执行，然后再执行 `os.Exit(1)` 退出。错误处理函数的注册非常简单：

```go
...
handler := func() {
    // gracefully shutdown something...
}
logrus.RegisterExitHandler(handler)
...
```

这样一个错误处理函数就注册好了。

# Reference

- [Logrus Github Repository](https://github.com/sirupsen/logrus)
- [Package Document](https://pkg.go.dev/github.com/sirupsen/logrus)
- [Hooks Wiki](https://github.com/sirupsen/logrus/wiki/Hooks)

