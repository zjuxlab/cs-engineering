---
title: Cursor+Devbox开发实例
slug: Cursor+Devbox开发实例
sidebar_position: 2
---


# Cursor+Devbox开发实例

Author: 金大可

<b>一行代码不写也能够完成项目开发+调试+部署？</b>

# 一、项目介绍

在现代软件开发中，开发效率和质量是每个开发者追求的目标。然而，传统的开发流程往往涉及复杂的环境配置、繁琐的代码编写和部署步骤，这不仅耗费时间，还容易出错。为了解决这些问题，我们引入了两个强大的开发工具——<b>Cursor</b>和<b>Devbox</b>，帮助开发者快速完成从前后端开发到部署上线的全流程。

<b>Cursor</b>是一个内置AI的代码编辑器，类似于VS Code，能够通过提示词生成代码，帮助开发者快速编写前后端代码、操作数据库等。<b>Devbox</b>则是一个开发环境管理工具，能够一键创建前后端开发环境、数据库，并支持一键打包镜像、部署到云服务器。通过这两个工具的组合，开发者可以极大地提高开发效率，减少手动配置和编码的工作量。

本项目的目标是利用Cursor和Devbox，从零开始开发一个To-Do List应用，并最终部署到云端。<del>通过本项目的学习，你将掌握如何使用现代化的开发工具，快速完成从开发到部署的全流程，成为一名高效的全栈开发者。</del>

# 二、环境准备

## cursor下载

官网下载地址：https://www.cursor.com/cn

我用的无限免费体验cursor pro教程（有点麻烦但是管用）

https://www.bilibili.com/video/BV165RbYtEDp/?share_source=copy_web

Cursor pro支持 claude3.7 sonnet+thinking模式，非常好用

## sealos&devbox

Devbox 地址：https://cloud.sealos.run/?uid=Kt1gH3_BTa

sealos数据库部署：

![](/assets/Pl1nbgLMTo2vjGxLKJZc7US0nLc.png)

成功运行：

![](/assets/VZ2KbtFmgoxU1HxhehSchWjInld.png)

打开devbox新建项目：

![](/assets/R5kWbPoJIoVintxBPZecei56nQb.png)

![](/assets/Kd5obt77moIIECxXbk6cuwPinEd.png)

暴露端口改成3000（此事在内训中亦有记载）

![](/assets/L0x1bIexToFiwFxbv07ck4bdn8f.png)

# 三、开发流程

提示词准备：

[cursor提示词](Mz8ywsrtRiVU0Vk9Pmycv3ePn5c)

按照上面最近那张图”点击在IDE中开发“，进入cursor，CTRL+I呼出对话框，选择agent模式，模型选AUTO或者claude3.7 sonnet等等3.1

## 3.1 后端开发

![](/assets/VWqObV5aXoL2WtxJhzkcaj2ynph.png)

填入后端提示词+数据库连接方式，然后回车

然后cursor会跟你对话，这个过程它会让你安装必要依赖，无脑accept;

然后就成功了：（注意这里的3000端口跟我们devbox容器暴露端口一致）

![](/assets/BQrsbfp1ioYOZsxu59kcWetvnwe.png)

这个时候有人会问了，主播主播，如果运行报错怎么办呢？如果<b>我看不懂/不知道怎么修的话</b>有没有什么解决办法？（为了防止cursor画蛇添足建议先自行debug）

有的兄弟，有的。只需要打开终端，选择报错命令，ctrl+I自动添加到对话当中，然后回车，把问题丢给cursor就可以了。

## 3.2后端调试

打开devbox，进入项目-详情-复制公网地址

![](/assets/P4Jebzhn1oDNSMxuBDyc6V0jnEf.png)

进入cursor，输入提示词回车

![](/assets/YuL2b8QLnok8uex8JGVcDDDZnuA.png)

结果：

![](/assets/RYHfbxTuxos3mwx2EqecCId2nmc.png)

![](/assets/CuXwbUAGxo0VaGxdEZScZQpUnyf.png)

时间原因我们只测试前两个

同时开俩终端，一边链接MongoDB，观察本地请求情况，另一边测试请求：

![](/assets/QiGJbZwN6oKYlqxIdwtcHH1OnXd.png)

ok那么测试也成功了，我们复制接口信息，放进提示词文档内

检查cors是否启用：

![](/assets/Kji4blb1goM8fjx90RAcLSNVnJa.png)

最后修改项目启动脚本

![](/assets/Jwe4bLTlsoHEvOx445zcILWynNd.png)

后端开发到这里就完成了！

## 3.3前端开发

同后端，devbox处创建前端项目，选择react框架,暴露端口选3000

![](/assets/IOXPb7ik8oe4gMx83s9clZqjnbe.png)

创建完毕之后一样在项目详情里面打开cursor，输入提示词

按照要求安装依赖等等

![](/assets/LOgXbvP8XovsSMxkfVxcVlNXnKb.png)

完成之后accept all,然后npm start把整个项目跑起来：

![](/assets/U99LbIcbKoHKhFxH0hFcJeIRncg.png)

效果如下：

![](/assets/Pim3b3NdTot2ipxO3FOcQN1SnFd.png)

看起来还算过得去

（友情提示，此处前端的美观程度跟模型智能程度强挂钩）

当然我们还可以在此基础上继续优化等等，此处不赘述。

比如我这里添加了颜色渐变、修复了明暗切换无反应的bug：

![](/assets/S2ZIbVNnFo03ONxU3WXcePcfn8p.png)

<del>（每次看到这里都会感慨自己之前搓的前端是什么玩意）</del>

## 3.4接口对接

提示词见[cursor提示词](Mz8ywsrtRiVU0Vk9Pmycv3ePn5c)前后端接口对接

喂给cursor，顺便执行必要命令：

![](/assets/WuJNbDMZ4oGr9QxmPvkcbgSfnpc.png)

再运行npm start,嘿嘿成功了:

![](/assets/SQhsbhaf2oIyJVxHnJEc0Q4jnMb.png)

具体测试增删改查功能的图片就不给大家展示了<del>（这么做看起来像实验报告）</del>

最后更改两处：

1. 前端启动脚本命令 npm run dev
    ![](/assets/R9QPbHjufooNdQxbFsOc1W3kndb.png)

2. 打开package.json,修改dev/start脚本：
    ![](/assets/X4zybLozMorwRfxLYIdcJaxqnlc.png)
    这一步的目的是添加HOST=0.0.0.0，表示监听所有端口；因为我们的项目需要部署到公网上面，需要支持从任何IP访问。另外部署应用之后平台会运行npm run dev此时我们需要在脚本当中编写对应dev命令
    （这里不建议用serve，后面上线可能会报错）

# 四、项目部署上线

这一步主要做的也就是打包docker镜像：

## 4.1上线后端

同样进入devbox，打开后端容器，点击发布版本，版本号跟描述随便写

![](/assets/WR2gbLPESoyDpexzs3JcOwOKn8c.png)

等待发版成功后，点击上线

![](/assets/KeCbbWsQpoLetDxB9evcbDG3nVh.png)

啥都不用改，右上角直接确认部署，点击上线

![](/assets/DWwFb7L5CoduzIxRPOhc2ONsn3d.png)

状态变成running说明成功了，复制公网地址：

![](/assets/Fy3QbFN5HowVEWxnbiCc1gRTnYg.png)

回到前端编辑器，把原先的测试环境改成生产环境，也就是todoapi下面的API_BASE_URL，改成刚刚复制的公网地址

![](/assets/MuEebmF5XoYcjrxGKnecDEcDnPb.png)

好的，最后测试一下前端，发现也没问题

![](/assets/PttEbAj75oPQSJxYqrMc9uAwnse.png)

后端成功上线！

## 4.2上线前端

跟后端流程类似，同样进入devbox，点击前端容器发布版本

![](/assets/XoZtbIJnmo7OSBxW3YocFnRynWg.png)

发布之后上线部署

![](/assets/RtRPbaiZEoRsYrxNb2ec68A0nZf.png)

等待状态变成running之后就可以访问公网地址了

![](/assets/OX9ybr0S5o5rUSxZOq4cG03Mngg.png)

点击日志可以debug

最终效果：

![](/assets/Re4wb6pnLobkX4xLxEvcomisnmh.png)

铛铛~那么我们的项目就开发完成啦，大家注意不用的时候关闭devbox，暂停应用还有数据库哦~

# 五、总结

简单概括下，想要打出这套组合拳得先有100分的实力，才能用这套组合来解决 40分的问题。当然对于软件的盆友们来说没问题。

另外这个组合应用场景很有限，基本就是做一些简单的 demo 或者小工具，暂时无法应用于大型的项目开发。大型项目开发你描述需求都是一个问题，毕竟连产品自己都说不清自己想要什么。

不论如何，目前看来还是需要比较强的编程基础的，因为有很多的问题需要有经验的人才能快速解决。因为有经验的人才会问问题。这个项目最大的用处在于指导程序员怎么让ai帮自己干dirty work。

参考资料：【一行代码不写搞定开发和上线｜Cursor + Devbox｜AI写代码｜全栈开发｜Docker｜K8S】 https://www.bilibili.com/video/BV124D5YEEAD/?share_source=copy_web&vd_source=d3cf6c4f178928552151d5d74cd19455

【黑马程序员DeepSeek+Cursor+Devbox+Sealos带你零代码搞定实战项目开发部署视频教程，基于AI完成项目的设计、开发、测试、联调、部署全流程】 https://www.bilibili.com/video/BV1ig9jYUERk/?p=3&share_source=copy_web&vd_source=d3cf6c4f178928552151d5d74cd19455

