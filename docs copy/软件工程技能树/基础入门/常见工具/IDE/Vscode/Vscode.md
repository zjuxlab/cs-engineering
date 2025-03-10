---
title: Vscode
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-fasnwakyoija5ikb6xicihlunnc-t6mwwxlvbi6qcrkwa4tct9xqn0g-nbmjwg2iuil4tukavjqcwv9jnce-ralnwzamgijhebkrxqec0jzqncf-ralnwz
sidebar_position: 0
---


# Vscode

Author：NA

# 什么是VS Code

VScode全称是Visual Studio Code，是微软推出的一个跨平台的文本编辑器。尽管原厂安装的白板VSC仅仅是个文本编辑器，但由于其强大的扩展能力，安装一些插件可以让这个编辑器进化为IDE。

这玩意还就好在<b>插件巨多</b>，基本上你能想到的常见语言都支持，包括C/C++，Python、Java、C#、Go等等（甚至连计算机系统概论课程中的LC-3都支持😂）

# 安装

官网下载：https://code.visualstudio.com/，直接安装即可（一般下载到的安装包是默认安装到用户目录而非Program Files目录的，不用在意）

安装完成后右下角应该会提示安装中文语言扩展包，点安装就好（英语好当我没说doge）。

主界面大概长这样（因为我装了一些插件，左侧会多几个选项）

<img src="/assets/Wd7Qbm9e3odDpkxP3wJc7Tn0n7i.png" src-width="1920" src-height="1041" align="center"/>

最左侧从上到下是资源管理器，搜索，git，调试，扩展。

# 基础配置

文件-首选项-设置打开设置界面，其中的设置选项可以通过最上面的搜索栏搜索关键字来定位。

<img src="/assets/NcPZbHt5SoCDLMxJnvjcJBJjnkC.png" src-width="1257" src-height="938" align="center"/>

几个新安装建议调整的选项：

1. editor.fontsize 设置字体大小
2. files.autoSave 文件是否进行自动保存
3. editor.suggest 自动补全的一系列规则，按照个人喜好设置（有时莫名其妙的补全很烦）

几个个人很喜欢的插件：

1. Code Runner：不用配置文件夹，直接一键运行代码，写简单的单文件作业题神器
2. Cmake：编译大项目利器，利用插件和vscode集成后非常好用
3. Markdown All in One：VScode的markdown扩展包

当遇到一门新语言时，可以优先试着在插件库中搜索相关插件，基本都能找到

### 以C/C++为例的语言配置

<b>前置条件：</b>已经安装该语言的编译器/解释器，并加入了PATH

首先安装该语言的插件（一般常用语言都有官方插件，打开这个语言的源代码时会在右下角自动弹出安装提示）

<img src="/assets/DbHrb3LQQoCcSVx5OzHcP3mwnEe.png" src-width="272" src-height="188" align="center"/>

如果你安装了code runner，此时应该可以直接打开代码文件，右键run-code来编译运行了。如果找不到编译器，可以在code-runner.executorMap选项里面调整

如果要使用vscode原生的运行调试功能，参看下一章节的运行和调试

# 基础操作

### 运行和调试

VSCode对于项目的组织形式是文件夹，在项目文件夹中会生成一个.vscode目录，里面是当前项目的配置文件。打开一个文件夹之后，进入运行和调试选项卡：

<img src="/assets/KLl0bvgZ1oPGS7xT6cJcA71rnEd.png" src-width="316" src-height="274" align="center"/>

点击运行和调试

<img src="/assets/GLOxbSHeaoDI3Ax8Nl5c1KIfnxg.png" src-width="648" src-height="140" align="center"/>

选择所需的编译器，vscode会自动生成一个调试配置文件，此时就可以进行调试了。

如果需要更进一步的配置启动调试时的操作，请点击创建launch.json文件按钮，然后参看https://code.visualstudio.com/docs/cpp/launch-json-reference来编写调试配置。

### Git

如果你的项目文件夹是从git克隆下来的，打开源代码管理选项卡就能看到以下界面，可以查看当前更改，并且常用的git命令都有对应按钮

<img src="/assets/EsAjb7vveo3rGexjvPwcrfDinre.png" src-width="490" src-height="479" align="center"/>

如果项目没有.git目录，会看到以下界面，点击Initialize Repository即可初始化git文件夹

<img src="/assets/K8YrbLLSooBJ4gxXtnDcAk76nCh.png" src-width="319" src-height="346" align="center"/>

### 快捷键

- 重开一行：ctrl + enter 向下重开一行；ctrl+shift + enter 在上一行重开一行
- 删除一行：光标没有选择内容时，ctrl + x 剪切一行；ctrl +shift + k 直接删除一行
- 移动一行：alt + ↑ 向上移动一行；alt + ↓ 向下移动一行
- 复制一行：shift + alt + ↓ 向下复制一行；shift + alt + ↑ 向上复制一行
- 搜索替换：ctrl + f 搜索； ctrl + alt + f：替换；ctrl + shift + f在项目内搜索
- 注释：ctrl+/
- 自动代码格式化：shift+alt+f
- 调出用于执行vscode命令的输入框：ctrl+shift+p

更多具体内容可以连续按ctrl+k, ctrl+s两组快捷键来查看快捷键设置面板

<img src="/assets/UaGjb7AWio41MExD6kCcrq4unvc.png" src-width="1531" src-height="945" align="center"/>

# VS Code 插件开发指南

参考文档：

- [VS Code 插件创作中文开发文档](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/)

前置要求：

- 熟悉 TypeScript

