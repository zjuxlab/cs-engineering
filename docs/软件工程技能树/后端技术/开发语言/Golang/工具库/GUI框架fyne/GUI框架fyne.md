---
title: GUI框架 fyne
slug: GUI框架 fyne
sidebar_position: 7
---


# GUI框架 fyne

Author: 江林益

Fyne 是 Go 语言的一个 GUI（图形用户界面）框架，用于构建跨平台的桌面和移动应用程序。

# <b>安装</b>

```shell
$ go get fyne.io/fyne/v2@latest
$ go install fyne.io/fyne/v2/cmd/fyne@latest
```

# <b>Hello World</b>

```go
package main

import (
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/widget"
)

func main() {
  a := app.New()
  w := a.NewWindow("Hello World")

  w.SetContent(widget.NewLabel("Hello World!"))
  w.ShowAndRun()
}
```

效果：

![](/assets/FSFnbXyJBosGhgxhTxZcgVc2njh.png)

# <b>事件循环</b>

使用Fyne时，需要用`App.Run()`或者`Window.ShowAndRun()`来开始进入事件循环。

也就是说，上述的两个函数必须在main包的main函数中被调用。

```go
package main

import (
  "fmt"

  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/widget"
)

func main() {
  myApp := app.New()
  myWindow := myApp.NewWindow("Hello")
  myWindow.SetContent(widget.NewLabel("Hello"))

  myWindow.Show()     // 只是show，没有run，如果没有下一行的App.Run()，程序会直接退出！
  myApp.Run()
  tidyUp()
}

func tidyUp() {
  fmt.Println("Exited")
}
```

# <b>更新显示内容</b>

首先，我们需要注册一个我们想展示的组件，需要用`widget` 包的`NewLabel()`方法初始化，然后用`window`对象的`SetContent`注册对象。

如果想修改对象内容，可以使用对象的`SetText`方法等，这里以一个时间显示为例： 

```go
package main

import (
  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/widget"
  "time"
)

func main() {
  // a是fyne对象，利用app包的New函数获得
  a := app.New()
  // 使用a的NewWindow方法，开窗口
  w := a.NewWindow("Learning Fyne")
  // 设置窗口大小，不然太小
  // 使用window的Resize方法，接受一个Size类型的参数，在fyne包里有方法
  w.Resize(fyne.Size{500, 500})
  // 使用widget包的NewLabel函数，注册一个你要展示的对象
  clk := widget.NewLabel("")
  // 展示对象
  w.SetContent(clk)
  // 接下来更新对象
  // 先使用time包里的函数获取时间，得到string
  // 然后把string传入要展示对象的SetText方法即可
  formatted := time.Now().Format("Time: 03:04:05")
  clk.SetText(formatted)

  w.Show()
  a.Run()
}
```

效果：

![](/assets/Tgkxb9cSLonWUKxPPFbcerYcnzf.png)

那如果我们想实时更新怎么办呢？好办法，用`go`关键字开个goroutine，不停`SetText`即可！

```go
package main

import (
  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/widget"
  "time"
)

func main() {
  // a是fyne对象，利用app包的New函数获得
  a := app.New()
  // 使用a的NewWindow方法，开窗口
  w := a.NewWindow("Learning Fyne")
  // 设置窗口大小，不然太小
  // 使用window的Resize方法，接受一个Size类型的参数，在fyne包里有方法
  w.Resize(fyne.Size{500, 500})
  // 使用widget包的NewLabel函数，注册一个你要展示的对象
  clk := widget.NewLabel("")
  // 展示对象
  w.SetContent(clk)
  // 使用go创建goroutine，用到匿名函数
  go func() {
    for range time.Tick(time.Second) {
      formatted := time.Now().Format("Time: 03:04:05")
      clk.SetText(formatted)
    }
  }()

  w.Show()
  a.Run()
}
```

# <b>窗口</b>

在fyne中，窗口可以创建多个，甚至可以给窗口显示内容加个按钮，一按就可以创建个新窗口：

```go
package main

import (
  "fyne.io/fyne/v2"
  "fyne.io/fyne/v2/app"
  "fyne.io/fyne/v2/widget"
)

func main() {
  a := app.New()
  // 创建一个窗口1
  w := a.NewWindow("窗口1")
  w.SetContent(widget.NewLabel("Hello World!"))
  w.Show()
  // 创建窗口2
  w2 := a.NewWindow("窗口2")
  // 加一个按钮，按钮一旦按下去就会触发函数生成一个新窗口
  w2.SetContent(widget.NewButton("Open new", func() {
    w3 := a.NewWindow("Third")
    w3.SetContent(widget.NewLabel("Third"))
    w3.Show()
  }))
  w2.Resize(fyne.NewSize(100, 100))
  w2.Show()

  a.Run()
}
```

# <b>打包</b>

fyne安装后，可以在命令行打包成不同平台的包：

![](/assets/ALacbrDZvoh8LHxWT8icfv9Ynrf.png)

![](/assets/Ji7LblcECodPuKxlU2wc0qh9nnb.png)

点击即可运行:

![](/assets/YuK7bSIbxoTEMExqXp5c6WSKnSb.png)

# <b>更进一步</b>

官方文档：[https://developer.fyne.io/started](https://developer.fyne.io/started)

一定要看，有些方法已经被抛弃了（

