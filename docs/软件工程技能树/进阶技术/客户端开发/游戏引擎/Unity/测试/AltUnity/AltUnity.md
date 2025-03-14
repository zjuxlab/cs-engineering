---
title: AltUnity
slug: AltUnity
sidebar_position: 1
---


# AltUnity

Author：康致宁

# 什么是AltUnityTester？

AltUnityTester是进行<b>UI 测试</b>自动化的工具，也就是进行<b>人机交互测试</b>(HMI tests)的工具。通过获取访问权限，用<b>程序（脚本）控制和 Unity 对象的交互</b>。

AltUnity拥有识别Unity场景中的对象并与之建立交互的能力。它采取了用户界面的形式，能够检测游戏中的对象，并使用C#、Python或Java编写的测试与它们互动。这些测试可以在真实设备（手机、PC等）或Unity编辑器中运行。

(<del>说白了就是Unity特供强耦合跨平台多语言高级按键精灵</del>)

官方文档：https://altom.com/alttester/docs/sdk/index.html

# 如何为Unity项目引入AltUnity

## <b>在 Unity 编辑器中导入 AltTester 包</b>

下载地址：https://altom.com/app/uploads/AltTester/sdks/AltTester.unitypackage

在 Unity 项目中拖入来导入它（Asset store里面的下架了 悲）。需要Newtonsoft.Json依赖。

为确保导入正确，请检查是否可以从 Unity Editor -&gt; AltTester -&gt; AltTester Editor 打开 AltTester Editor 窗口。

![](/assets/RKkwbjbFSozYJHxgY3RcWUCTnFf.png)

### 安装可能遇到的问题

Q1：打开项目时提示Newtonsoft.Json冲突

A1：项目原先可能就安装了Newtonsoft.Json，二选一删掉一版来避免冲突。

Q2：打开项目时提示是否启用Unity新版输入系统

A2：新版Altunity引入了新版Unity输入系统，而项目可能采用了老版输入系统。但是Altunity兼容老版本输入系统，所以直接选no忽略提示即可。

## 运行AltUnity

1. 从 Unity Editor -&gt; AltTester -&gt; AltTester Editor 打开 AltTester Editor 窗口
2. 在 Build Settings 部分将<b>AltTester Port</b>设置为 13000
3. 在“场景管理器（Scene Manager）”中，选择要包含在构建中的场景
4. 在平台部分选择所需的平台并设置路径到您要保存构建的位置。standalone是针对平台生成真实的、可运行的程序进行测试，editor是在编辑器内进行测试(如图)
5. 构建成功后，按“Build Only”或“Build & Run”开始检测游戏（这俩选项在Platform选Standalone时可用，也可以选择在编辑器中测试，运行会慢点，但是方便）
6. 检查控制台以查看构建是否成功。

![](/assets/RzQObDUvcovYdwxiyZRct602ngb.png)

# AltUnity脚本中特有的API

详见https://altom.com/alttester/docs/sdk/pages/commands.html，此处做笔者自认为的重点摘录、翻译。主要关于AltObject物体的获取，以及键鼠等输入设备操作。

<b>Altunity脚本会用到许多NUnit测试平台的语句，例如Assert（判断条件用）等，是产生测试结果正误的主要方式。在此先不赘述，详见NUnit节点(TODO)。</b>

## <b>BY-Selector</b>

这是许多查找API中的by参数使用到的语法规范。目前有7种By规则：

- <em>By.TAG</em> - 找有特定标签的物体
- <em>By.LAYER</em> - 找有特定layer的物体
- <em>By.NAME</em> - 找有特定名称的物体
- <em>By.COMPONENT</em> - 找有特定部件的物体
- <em>By.ID</em> - 找有特定ID的物体（每个物体有唯一ID）；此处检查 InstanceId 和 [AltId](https://altom.com/alttester/docs/sdk/pages/commands.html#altid)
- <em>By.TEXT</em> - 找有特定文本的物体
- <em>By.PATH</em> - 找有特定路径的物体

<b>路径（PATH）：</b>

- <em>object</em> - 选择所有名叫“object”的对象
- <em>/</em> - 从根节点选择
- <em>//</em> - 从当前节点开始选择
- <em>..</em> - 选择当前节点的父节点
- * - 匹配任意节点
- <em>contains</em> - 选择名称中包含特定字符串的对象
- <em>[n-th]</em> - 选择当前节点的第 n 个子节点。 0代表第一个孩子，1是第二个孩子，依此类推。 -1代表最后一个孩子
- <em>@tag</em>
- <em>@layer</em>
- <em>@name</em>
- <em>@component</em>
- <em>@id</em>
- <em>@text</em>

## <b>FindObject(以及一系列根据各种条件找物体的方法)</b>

查找场景中符合给定标准的第一个对象。

<b>参数</b>

<b>返回</b>

- AltObject

## <b>WaitForObject(以及一系列等物体出现/消失的方法)</b>

等待，直到找到符合给定条件的对象或达到超时限制。

<b>参数</b>

<b>返回</b>

- AltObject

## <b>KeyDown  / KeyUp</b>

模拟按键按下 / 抬起。

<b>参数</b>

<b>返回</b>

- Nothing

## <b>PressKey</b>

模拟按一次按键（按下+抬起）

<b>参数</b>

<b>返回</b>

- Nothing

## <b>MoveMouse</b>

模拟鼠标移动

<b>参数</b>

<b>返回</b>

- Nothing

## <b>Tap</b>

模拟触摸点按特定坐标

<b>参数</b>

<b>返回</b>

- Nothing

# AltObject(物体)包含的方法

https://altom.com/alttester/docs/sdk/pages/commands.html#altobject，此处做重点摘抄翻译

## <b>Tap</b>

点按这个物体

<b>Parameters</b>

<b>Returns</b>

- Nothing

## <b>GetText</b>

返回 Button, Text, InputField 的文本. 这也适用于 TextMeshPro 元素

<b>Parameters</b>

None

<b>Returns</b>

- String

## <b>GetParent</b>

返回调用它的对象的父级。

<b>Parameters</b>

None

<b>Returns</b>

- AltObject

## <b>CallComponentMethod（应该可以用来调用原物体上挂的(脚本)方法，但这个方法我从来没成功使用过，放上原文供研究）</b>

Invokes a method from an existing component of the object.

<b>Parameters</b>

<b>Returns</b>

- This is a generic method. The return type depends on the type parameter.

# 写完脚本之后如何<del>润</del>run？

在Altunity界面点击run之后，会看到程序窗口出现一个绿色悬浮窗。待测程序成功与测试平台连接后消失。

此时选择欲进行的的测试点运行，程序会自动进行ui交互，运行完成后测试点前会显示绿色✓或红色❌，表示该测试点通过与否。

