# Linux基础

## 概念辨析

linux其实是指linux内核

而我们通常说的linux是指基于GNU的linux系统，包括四部分：linux内核、GNU工具、图形化桌面环境、应用软件。

## 系统安装

### 类型

Linux系统的安装一般有三种类型

1. 把自己当前的操作系统完全放弃
2. 使用双系统或多系统
3. 使用虚拟机安装linux系统

对于初学者来说建议使用第三种

### 准备

安装前需要准备什么？

- 安装介质和系统。
- 用于安装的空闲设备。

> 安装介质：可以是空闲的U盘、光盘、硬盘甚至一个文件（对于虚拟机）
>
> 系统：即linux发行版，这个有很多种，尽量别从baidu中获得，可以直接找到对应发行版的官网下载，这是十分纯净的，或者使用浙江大学镜像站：http://mirrors.zju.edu.cn/
>
> 比如
>
> Fedora的下载官网：[Get Fedora](https://link.zhihu.com/?target=https%3A//getfedora.org/en/)
>
> Ubuntu桌面版的下载官网：[https://ubuntu.com/download/desktop](https://link.zhihu.com/?target=https%3A//ubuntu.com/download/desktop)
>
> CentOS的下载官网：[Download CentOS](https://link.zhihu.com/?target=https%3A//www.centos.org/download/)
>
> Debian的下载官网：[https://www.debian.org/distrib/](https://link.zhihu.com/?target=https%3A//www.debian.org/distrib/)

### 引导安装软件

常见的有`Vmware`和`Virtual box`，选择其一即可，然后可以根据引导一步步操作，如果你并不清楚，可以上网搜索一些教程

> 在Vmware中安装ubuntu可以看https://blog.csdn.net/qq_43374681/article/details/129248167

## 基础知识

### CLI & GUI

通常而言，linux有两种操作模式，CLI和GUI，这两种都是可以的，不过更加推荐的是CLI，这对你熟悉命令和掌握linux有很大的帮助。

如果使用CLI的话，一种打开方式是在GUI的情况下，快捷键ctrl+alt+t打开terminal，如果要远程方式登录，需要配置一下，比较常用的有ssh，可以在其它环境下远程访问linux系统

> ssh的配置方法：https://blog.csdn.net/qq_47855463/article/details/116655311

### runlevel

linux系统运行时有一个运行级别（runlevel），有以下几种：

 0 为停机，关闭系统。 

 1 为单用户模式，就像Windows下的安全模式类似。

 2 为多用户模式，但是没有NFS 支持。 

 3 为完整的多用户模式，是标准的运行级。

 4 保留，在一些特殊情况下可以用它来做一些事情。例如在笔记本电脑的电池用尽时，可 以切换到这个模式来做一些设置。

 5 X Window 系统。

 6 为重新重启，运行 init 6 机器就会重启。startx命令 

这里介绍几条命令

```Bash
# 显示当前的运行级别
runlevel
# 更改运行级别 (需要sudo）
init [number]
# 关机
ctrl-D
logout
exit
init 0
shutdown #可以设置定时关机，可以自行查阅
halt
# 重启系统
reboot
```

### shell

shell 是Linux系统的用户界面，提供了用户与内核进行交互操作的一种接口。 它为用户提供了启动程序、管理文件系统中的文件以及运行在Linux系统上的 进程的途径。 

所有Linux发行版默认的shell都是bash shell。bash 由GNU项目开发，被当作 标准Unix shell

其它shell还有C shell、TC shell、Korn shell等等

### 内部命令与外部命令

内部命令（builtin）就是shell本身包含的一些命令，外部命令是指存放起来的一些二进制文件或者shell脚本

```Bash
# 查看一个命令是内部还是外部命令
# 比如查看cd命令是什么命令
type cd
```

那就意味着，如果我们能够自行设计某个命令，要保证shell能够检索到

那么shell的搜索目录是什么呢？它存在一个shell变量中 PATH

```Bash
# 查看PATH变量
echo $PATH
# 查看所有环境变量
set
env
```

得到的返回值可能是这样的

```
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/go/bin:/home/lu/gopath/bin
```

那就是说，shell搜索将会从以冒号为分割的这些目录中进行（shell的分隔符是：其它解释器可能会不一样）

> 如果你想了解几个常用的环境变量：https://www.51cto.com/article/743959.html

### 常用的几个启动文件

| `/etc/profile``~/.bash_profile``~/.bash_login` `~/.bashrc` | bash启动时自动生效，如果想编辑后立即生效，使用source [file]指令 |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| `~/.bash_logout`                                           | bash退出时执行                                               |
| `~/.bash_history`                                          | 记录最近的命令                                               |

学习.bashrc相关知识：https://zhuanlan.zhihu.com/p/33546077

### 常用命令

这里不会单独展开了，可以参考下面这篇博客

[Linux基础知识汇总，看这一篇就够了（2022最新整理）-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1975482)

### 文本编辑器

常见的有`vi`、`vim`、`nano`等，自行查阅相关资料即可

如果有志于linux深入学习，那么掌握至少一种编辑器是十分必要的

## 文件

### 类型

linux中一切皆文件，所有的操作都是基于文件的

Linux操作系统文件分为：普通文件、目录文件、字符设备文件、块设备文 件、符号链接文件、管道文件、socket文件

1. 普通文件

这类文件的文件名最长不能超过255个字符，可以用除保留字符以外的任何字符给文件命名。尽量不要使用非打印字符、空白字符（空格和制表符）和shell 命令保留字符。另外，扩展名对LINUX系统来说没有任何意义，所以linux不会像windows那样根据文件名后缀判断文件的类型，但是为了便于阅读和管理的话，可以任意给文件名加上你自己或应用程序定义的扩展名 (e.g. .c file extension is  required by C compilers) 

1. 目录文件

目录文件只允许系统修改，不允许用户进程修改，只允许用户读取

对于每个目录下，都有两个特殊的目录 '.'表示当前目录 '..'表示上级目录

1. 设备文件

包括字符设备文件和块设备文件，linux把对IO设备的读取和写入作为对文件的读取和写入

linux内核提供了对设备处理和对文件处理的统一接口

> **字符设备文件和块设备文件的三点不同**
>
> 1.字符设备只能以字节为最小单位访问，而块设备以块为单位访问，例如512字节，1024字节等
>
> 2.块设备可以随机访问，但是字符设备不可以
>
> 3.字符和块没有访问量大小的限制，块也可以以字节为单位来访问

1. 链接文件

分为软链接和硬链接文件，通常可类比与快捷方式，但是稍有不同

1. 管道文件（FIFO）

用于进程间传递数据

1. 套接字文件（Socket）

### 系统目录结构

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NTA4ODFjZjI5ZWUzMDk1ODI5OGZlMjJiMWEyYzFkMDlfR0s1UlB2cVVvWVVFU0hMMU13WEJHMTZMTFRvdVQycXdfVG9rZW46WUlSUWI5M2tOb2YzU1h4eUwzWGNKTFZ2bmtiXzE2OTU1MjAzNjQ6MTY5NTUyMzk2NF9WNA)

- 根目录（/）：根目录位于分层文件系统的最顶层，用斜线（/）表示。它包含一些标准文件和目录，因此可以说它包含了所有的目录和文件。 
- /bin：也称二进制（binary）目录，包含了那些供系统管理员和普通用户使用的重要的Linux命令的可执行文件。一些常用的命令有：bash、cat、chmod、cp、date、echo、kill、ln、mail、 mkdir、more、mv、ps、pwd、rm、rmdir、sh、stty、su、tcsh、uname和vi。一些用于系统 恢复的命令如：tar、gzip、gunzip和zcat。还有一些网络命令如：domainname、hostname、 netstat和ping。目录/usr/bin下存放了大部分的用户命令。 
- /boot ：在这个目录下存放系统启动时要用到的程序。包括Linux内核的二进制映像。内核文件 名是vmlinux加上版本和发布信息。
- /dev：dev 是设备（device）的英文缩写。在这个目录中包含了所有linux系统中使用的外部设 备。但是这里并不是放的外部设备的驱动程序。
- /etc ：etc这个目录是linux系统中最重要的目录之一。在这个目录下存放了系统管理时要用到的 各种配置文件和子目录。我们要用到的网络配置文件，文件系统，x系统配置文件，设备配置信 息，设置用户信息等都在这个目录下。 
- /sbin ：这个目录是用来存放系统管理员的系统管理程序。 /sbin，/usr/sbin，/usr/root/sbin：存放了系统管理的工具、应用软件和通用的root用户 权限的命令。
- /home ：存放用户的主目录。如果建立一个用户，用户名是“ji”,那么在/home目录下就有一个 对应的/home/ji路径，用来存放用户的主目录。
- /lib ：lib是库（library）英文缩写。这个目录是用来存放系统动态连接共享库的。几乎所有的应 用程序都会用到这个目录下的共享库。  /media 媒体目录，可移动媒体设备的常用挂载点 
- /mnt ：这个目录主要用来临时装载文件系统，系统管理员运行mount命令完成装载工作。  /opt：该目录用来安附加软件包 
- /proc ：目录存放了进程和系统得信息，可以在这个目录下获取系统信息。这些信息是在内存中， 由系统自己产生的。 
- /root ：根（root）用户的主目录。如果用户是以超级用户的身份登录的，这个就是超级用户的 主目录。 

（转载自jjm 教授《Linux程序设计》课程的ppt）

- /tmp ：用来存放不同程序执行时产生的临时文件。
- /usr ：是linux文件系统中最大的目录之一。它存放了可以在不同主机间共享的只读数据。 
- /lost+found : 目录中存放所有和其他目录没有关联的的文件，这些文件可以用Linux工具 fsck查找得到。 
- /var : 用来存放易变的数据，这些数据在系统运行过程中会不断变化。 /var/spool/mail  存放收到的电子邮件，/var/log 存放系统的日志, /var/ftp 。 

有几个特殊的保留字符：

- 用户主目录：~
- 当前目录 . 上级目录 ..

绝对路径是从根目录算起的路径，而相对路径是从当前工作目录算起的路径

### 文件系统

建议阅读这两篇自行学习

https://zhuanlan.zhihu.com/p/44267768

https://zhuanlan.zhihu.com/p/505338841

## 文件安全与共享

### 保护机制

Linux提供的三层次文件保护机制: 

\1. 使用 登录名（login name）和登录密码（password） ——超级管理员给注册账户密码

\2. 文件加密——用软件加密 

\3. 文件访问特权（File access privileges）——策略有用户分类，访问权限分类和文件操作权限

### 文件访问特权

#### 用户分类

每个用户属于一个组，系统中所有组的信息可以查看`/etc/group`

对于一个单文件来说，有三种类型的用户，owner users、group users、others

> root为超级用户，可以任意访问所有文件

#### 文件操作分类

读、写和执行三种操作

我们可以通过观察`ls -l`命令，看到一个文件各类用户具备的权限，如果不具备权限，则不允许操作

chmod命令可以更改一个文件的操作权限

chmod学习：https://www.runoob.com/linux/linux-comm-chmod.html

umask命令可以更改新创建一个文件时的权限，自行检索学习

### 符号链接

主要有两种，软链接和硬链接，学习请参考：

https://www.jianshu.com/p/dde6a01c4094

https://www.zhihu.com/tardis/zm/art/619264530?source_id=1005

## 进程、重定向与管道

### 进程

当linux执行一个外部命令时，就会启动一个新的进程，然后执行结束后关闭这个进程

> 思考：什么是外部命令？什么是内部命令
>
> ——请自行检索学习

查看进程的指令 ：`ps`

（指令参数具体含义及用法请自行查阅）

如果我们想要把一个命令通过后台执行，那就在一行命令最后加上&即可

产生的效果是，这条命令会在background执行，而非frontend

> 思考：我们想要对一个已经开始执行的命令进行切换， 该怎么实现呢？比如从前台转为后台
>
> 答案：首先ctrl+z挂起一个前台进程，然后这个进程暂停执行，`fg`和`bg`分别为把最近挂起的进程进行前台和后台执行，如果想指定一个任务，那么在fg或bg后加上job number

`jobs`命令可以看所有当前被挂起和执行的命令

通常我们执行命令是一条一条来执行的，也就是说顺序执行

那么如果我们想要并发执行，就需要用下面这个格式

> 格式：命令1&命令2&…命令N&

如果我们想要终止一个进程，该怎么做呢？

对于前台进程：`ctrl+C`

对于后台进程：kill命令（使用方法自行检索）

接下来我们讨论linux的进程之间关系如何？下面这张图是linux进程树

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRjODY4Y2FkMWIxNmQ0MmIxODEwN2ExOTljZTBlOTRfYlRlTVN6d2xJeG1qZk5BaEFDMm94RWU2ZEhSaG5iVUhfVG9rZW46UEdxTWIwR0x3b1BmYU54SE5KOWNRU2k3bkdlXzE2OTU1MjAzNjQ6MTY5NTUyMzk2NF9WNA)

pstree命令可以用图的形式显示当前系统中执行进程的进程树，勾勒出进程间的父子关系。

如果方便显示，可以配合more指令使用

> pstree –a | more

### 重定向

linux的三种类型的标准流

 Standard Input (stdin)  标准输入

 Standard Output (stdout)  标准输出

 Standard Error (stderr)  标准错误

默认情况下，stdin来自于键盘，stdout和stderr是导出到屏幕上显示

#### 输入重定向

如果我们要重定向stdin使用<，比如cat < myFile，还有一种重定向是内联输入重定向，要求有一个标记来区分输入数据的开始和结尾，所以我们可以这样用

```Bash
wc << EOF
 > hello
 > wolrd
 > EOF
```

#### 输出重定向

使用>，作用是重新创建or覆盖原文件，把指令的输出写入这个文件中

如果我们想要实现追加的功能，使用>>符号

> 输入输出流的合并
>
> 如果我们使用这样一条命令：`cat < file1 > file2`
>
> 那么它的执行流程是怎么样的呢？
>
> 输入时使用file1，输出到file2

#### 错误重定向

由于错误重定向也要输出到某个文件中，因此我们也需要用>这个符号

那我们应该怎么区分呢？

在linux中，其实对于这三种重定向都有独特文件描述符

standard input (sdin) — 0 

standard output (stout) — 1

standard error (sderr) — 2 

所以我们要重定向标准输入和输出，就可以写成 cat 0< file1 1> file2

当然，如果你不存在重定向错误流，忽略掉这个描述符是可行的，但是只要使用标准错误流重定向，那就必须加上这个文件描述符。比如`ls –l foo 2> error.log`

这个命令的作用是以长格式（-l）查看foo这个文件的信息，如果出错了，重定向到这个error.log

不过注意一个细节，这个error.log，不论是否发生错误都会被创建

> 如果我们就想要输出和错误都输出到一个文件里怎么办？
>
> ```
> cat lab1 lab2 lab3 1> cat.output.errors 2>&1
> cat lab1 lab2 lab3 2> cat.output.errors 1>&2
> ```
>
> &1是说明，标准错误流复制文件描述符为1的标准输出流
>
> &2是说明，标准输出流复制文件描述符为2的标准错误流
>
> 思考：`cat lab1 lab2 lab3 2>&1 1> cat.output.errors`这个命令的含义是什么？
>
>  在命令行的解析中，文件的重定向顺序是从左到右
>
> 标准出错先设置成标准输出的拷贝，但是这个时候&1指的标准输出还是显示器，所以错误会打在屏幕上，然后标准输出才改为cat.output.errors，标准输出就输出到这个文件中了。 
>
> example：
>
> ![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NTdiMDc5OTNkMzQzNDY2MjU5ZWM5OWI3NDA5MTE2M2ZfMFVYMGgyU2ZKVjI3QUJ6YWJWT0lhSFVMbWpIZVhwdWZfVG9rZW46UVVpaWI5a214b0k5WWx4aDF1eGNaNGsxbmxnXzE2OTU1MjAzNjQ6MTY5NTUyMzk2NF9WNA)

如果要不覆盖内容的重定向输出和错误，可以用>>

#### exec命令

通常exec用来执行新的命令以替换当前的shell进程，而不是生成一个新的进程

执行结束后返回父进程，因此通常当前这一级的shell会关闭

##### exec命令与重定向

Bash shell最多允许同时使用10个文件描述符。其中三个是保留的，标准输入 （0），标准输出（1），标准错误（2）。 用exec命令及重定向操作符可以用这10个描述符进行文件I/O。

当从命令行运行时，exec < sample命令将sample文件中的每一行作为命令， 由当前shell执行。

当从命令行执行exec > data 命令时，将使此shell后面的所有命令输出到文件 data中（通常是输出到显示屏）。 

## 管道

Linux允许一条命令的标准输出成为另外一条命令的标准输入

用管道连接的那些命令叫做过滤器（filter）。一个过滤器(Filters)是一组Linux的命令， 从标准输入经过处理送到标准输出。

一些经常用到的过滤器是：cat、compress、crypt、grep、gzip、lp、pr、sort、 tr、uniq和wc。

> tee命令
>
> 语法：tee [options] file-list
>
> 用途：从标准输入中得到输入然后送到标准输出和file-list中

command1| tee file1…fileN|command2

command1标准输出作为tee的标准输入， `tee`输出送到文件 file1到fileN中，同时作为command2的标准输入

## Bash编程

https://www.runoob.com/linux/linux-shell.html

## Linux编程

C/C++为例，可以使用vi vim gedit等工具来编写代码，然后使用gcc g++这类的软件来编译运行

另外，如果我们想要调用一些系统资源，我们可以使用系统调用（一个独立话题，值得学习）

如果想要深入了解，可以自行设计一个shell出来，这里粘贴一个我实现的demo，欢迎大家来共同开发

github仓库为[Crer-lu/miniShell: realize a shell of linux (github.com)](https://github.com/Crer-lu/miniShell/tree/master)

## 声明

Author：Crer_lu

如果您想使用相关内容，请联系作者email : lu@zjuxlab.com