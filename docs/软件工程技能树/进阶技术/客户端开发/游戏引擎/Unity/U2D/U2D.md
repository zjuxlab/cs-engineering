---
title: U2D
slug: U2D
sidebar_position: 1
---


# U2D

Author：陈儒、陈岩、李嘉诚

Update : 2022.3，2022.5

## 写在前面

如U3D中所言，Unity是一个工程引擎，其必然需要手动操作才能体会到里面大部分的内容，此文档中会介绍一些Unity2D中会接触到的常见基础操作和问题等，当然也不免会包括一些CG和渲染相关的知识。

另外推荐可以通过B站up主M_Studio的Unity视频学习Unity。

## U2D简介

Unity是实时3D互动内容创作和运营平台，可以创作包括游戏开发、美术、建筑、汽车设计、影视在内的作品。而2D作为Unity中的一个模板常用于2D游戏开发等，Unity中有许多部分同时适用于2D和3D，但2D仍有其独特的特性和功能。

## Unity平台的安装

2D和3D只是创建模板，其Unity所用平台相同，以下部分引用自U3D文档中：

> ### Unity版本管理器UnityHub
> 由于不同版本的Unity有不同的特性和功能，我们可能在不同场合下可能需要用到不同版本的Unity，因此在这里我推荐大家使用Unity Hub这个Unity管理平台安装不同版本的Unity。
> > ![](/assets/XrBcbS534oGLihx7ab2cbTtYnDf.png)
> <b>具体操作：</b>
> 左键按下`从Hub下载`，然后正常按流程走即可
> ### 开发者间的协作PlasticSCM
> 很明显，当我们开发软件，开发者之间必然需要一定协作。但是，我们知道游戏中往往充斥着大量的素材文件，对于大文件的管理git自己似乎并不很好支持，需要使用git-lfs。而当我们使用git-lfs时，由于Github等git-lfs服务都比较慢，为了能够快速提交下载，我们一般需要自行构造服务，这就导致了给开发者带来了不少的难题。为了解决这个问题，我们一般会使用Unity官方提供的PlasticSCM进行开发协作。
> 
<div class="callout callout-bg-7">
<div class='callout-emoji'>❗</div>
<p>Plastic SCM还非常不成熟，还是git+LFS吧，不要在Plastic上受折磨</p>
<ul>
<li><p>可能丢失本地数据</p>
</li>
<li><p>可能提交内容缺失</p>
</li>
<li><p>可能无法连接server</p>
</li>
<li><p>可能本地无法打开</p>
</li>
</ul>
</div>

## Unity相关

### 界面

- Hierachy：层级面板，管理物体资源
- Scene：场景面板，管理游戏场景中的各种物体
- Game：游戏面板，实际的玩家视角
- Project：项目面板，管理项目中的资源
- Inspector：检查面板，可查看Hierachy或Project中资源的组件及属性

---

Game面板类似于玩家视角，即项目生成结果，通常选择在Scene面板中进行编辑。

<b>部分快捷键</b>：

鼠标右键：拖动鼠标旋转视角，WASD场景漫游；

鼠标中键：拖动鼠标平移视角；

ALT键+鼠标右键：拖动鼠标前后缩放；

F：快速定位。

<b>工具栏：</b>

- Q -&gt;手性工具，用来拖动场景
- W -&gt;移动工具，用来移动模型位置
- E -&gt;旋转工具，用来旋转模型
- R -&gt;缩放工具，用来放大缩小模型
- Y -&gt;移动&缩放工具，，可以同时移动、旋转模型

---

### 游戏物体 GameObject

> GameObject 就是游戏对象或者说游戏物体，层级面板中可以选择的都是GameObject。
> 同时，GameObject在代码中也是一个类型，这个类型代表着游戏物体。在C#中可以通过公开字段，在Inspector面板中设置该字段的值。

简单理解就是各个场景中真实存在的，而且有位置的一个物件，其可以赋予各种组件来实现不同功能。

---

### 预制体 Prefab

即为预先制作好的游戏物体，类似于元件和其实例等。

Unity 中会有大量复用某物体的需求，通常可采用预制体进行统一管理。

---

将游戏物体拖拽至项目面板中，Unity 则会自动为我们生成一个预制体，再将预制体从项目面板中拖拽至层级面板中即可实现复用的效果。

修改预制体会直接导致场景中的各个该物体发生变化。

注意：预制体被删除，不会直接删除游戏中的游戏物体，这些物体会在层级面板中变成红色，意味着预制体被删除了，我们可以在层级面板中右键取消这种引用关系，让这些游戏物体变成普通游戏物体。

---

创建预制体的过程中，如果游戏物体已经是预制体，Unity会弹窗提醒我们选择创建模式，即：

- 原始预制体：一个完全独立的预制体
- 预制体变体：旧的预制体变化，变体也会发生变化，但是变体保留和旧预制体不同的部分

---

### 组件 Component

Unity 的设计思想是<b>基于组件</b>的，角色可以移动、播放动画，UI 可以点击等等，一切都是基于组件来实现的。

物体在Inspector面板中的即为组件，比如Transform组件，其属性值决定了物体的位置、旋转角度、大小等。

---

### 脚本 Script

除了Unity的内置组件之外，我们也可以使用脚本来自行创建组件。使用脚本可以触发游戏事件，随时修改各个组件属性值，并以所需的任何方式响应用户的输入。

Unity中的脚本支持C#编程语言。

---

脚本可在Project面板中的资源库内直接创建，双击打开后如下：

```csharp
using UnityEngine;
using System.Collections;

public class NewBehaviourScript : MonoBehaviour {

    // Use this for initialization
    void Start () {
    
    }
    
    // Update is called once per frame
    void Update () {
    
    }
```

> 为了连接到 Unity 的内部架构，脚本将实现一个类，此类从称为 MonoBehaviour 的内置类派生而来。可以将类视为一种蓝图，用于创建可附加到游戏对象的新组件类型。每次将脚本组件附加到游戏对象时，都会创建该蓝图定义的对象的新实例。

注意：类的名称 NewBehaviourScript 为脚本名，若之后修改脚本名，需手动修改脚本中该部分

---

脚本只定义了组件的蓝图，因此只有在将脚本实例附加到游戏对象后，代码才会被激活。可通过将脚本资源拖动到层级视图面板中的游戏对象，或拖动到当前选定游戏对象的检视面板。

### 动画 Animation

动画创建包含两个部分：

- 动画控制器（Animator Controller），用于控制编辑动画
- 动画编辑器（Animation），用于创建、编辑具体动画

---

动画状态机（Animation State Machines）：状态机提供可视化的流程编辑界面，用于管理游戏对象的不同动画之间的联系，以及不同动画之间流转所需要的条件，类似于工作流。

游戏对象可能存在多个动画，需要对不同的动画进行归类，将同一类别的动画看作状态，不同状态之间是否存在关系能否进行切换，状态之间切换的条件，以及切换的细节，都是由状态机控制。

包含以下内容：

- 状态，States
- 状态之间的转换，Transitions
- 事件，Events
- 子状态机，Sub-State Machines 

---

Unity 2D的动画实质就是一种不同状态的切换，一个动画往往由多个帧构成。

AnimatorController 用于维护对象的所有动画维护了动画之间的切换条件、哪些动画可之间以进行切换等。

![](/assets/DJE7bvwoPorxHjx2MElc3U4znze.png)

![](/assets/UoljbjK1doKO9WxSbOecAatXn7g.png)

如图即为一些动画的状态，Idle动画即为开始时就播放，而二者之间的连线即为动画过渡（Transition）。

## Unity 2D特性

### 2D物理

- 刚体 Rigidbody 2D

刚体是物理系统中用于帮助我们进行模拟物理碰撞中力的效果的，2D 物理系统中的刚体和 3D 中的刚体基本是一样的，最大的区别是对象只会在 XY 平面中移动，并且只在垂直于该平面的轴上旋转。

不同于 3D 刚体，2D 刚体具有以下三种类型：

1. <b>Dynamic 动态刚体</b>：受力的作用，要动要碰撞的对象
2. <b>Kinematic 运动学刚体</b>：通过刚体 API 移动的对象，不受力的作用，但是想要进行碰撞检测
3. <b>Static 静态刚体</b>：不动不受力作用的静态物体，但是想要进行碰撞检测

---

- 碰撞器 Collider 2D

碰撞器是用于在物理系统中表示物体体积的的（形状或范围），刚体通过得到碰撞器的范围信息进行计算，判断两个物体的范围是否接触，如果接触刚体就会模拟力的效果产生速度和旋转。

碰撞器有多种类型：

1. <b>圆形碰撞器</b>
2. <b>盒状碰撞器</b>
3. <b>多边形碰撞器</b>
4. <b>边界碰撞器</b>
5. <b>胶囊碰撞器</b>
6. <b>复合碰撞器</b>：复合碰撞器会将其子物体所有的碰撞器合并在一起，得到一个新的碰撞器（复合碰撞器必须配合刚体使用）

一些常见碰撞检测函数：

```csharp
private void OnCollisionEnter2D(Collision2D collision) { }

private void OnCollisionExit2D(Collision2D collision) { }

private void OnCollisionStay2D(Collision2D collision) { }

private void OnTriggerEnter2D(Collider2D collision) { }

private void OnTriggerExit2D(Collider2D collision) { }

private void OnTriggerStay2D(Collider2D collision) { }
```

---

- 物理材质 Material 2D

物理材质是用于决定在物体产生碰撞时这些物体之间的摩擦和弹性表现的。

![](/assets/S6yibie4moXR3ZxNvf4c7TBfnXg.png)

1. Friction：摩擦系数，0 表示没有摩擦力
2. Bounciness：反弹程度，0 表示没有弹力，1 表示没有能量损失一直反弹

---

- 恒定力 Constant Force 2D

恒定力是一个特殊的脚本，它可以给一个 2D 刚体持续添加一个力在做一些随着时间推移而加速的对象时很适用，比如类似火箭发射等效果，恒定力脚本会线性的为对象添加力和扭矩力，让其移动和旋转

---

- 效应器 Effector 2D

效应器是配合碰撞器一起使用的，可以让游戏对象在相互接触时产生一些特殊的物理作用力，可以通过 2D 效应器快捷地实现一些传送带、互斥、吸引、漂浮、单向碰撞等等效果。

1. <b>区域效应器 Area</b>：在一个区域内让游戏对象受到力和扭矩力的作用
2. <b>浮力效应器 Buoyancy</b>：模拟流体行为，浮动和阻力相关设置，让玩家在该区域看起来像在水里移动
3. <b>点效应器 Point</b>：模拟类似磁铁吸引或排斥的效果
4. <b>平台效应器 Platform</b>：2D 游戏当中的平台或可往上跳跃的墙壁
5. <b>表面效应器 Surface</b>：模拟传送带

### 精灵 Sprite

> 2D 图形对象称为 Sprite，其本质上只是标准纹理，但可通过一些特殊技巧在开发过程中组合和管理精灵纹理以提高效率和方便性。
> Unity 提供内置的 Sprite Editor，允许从更大图像提取精灵图形。因此可以在图像编辑器中编辑单个纹理内的多个组件图像。例如，可以使用此工具将角色的手臂、腿和身体保持为一个图像中的单独元素。
> 应使用 Sprite Renderer 组件而不是用于 3D 对象的 Mesh Renderer 来渲染精灵。

- Sprite：一种游戏资源，在 2D 中表示角色、场景的图片资源（类似 3D 中 GameObject）
- SpriteSheet：切割一个图片为多个 Sprite
- Sprite Editor: 主要用于设置单张图片的基础属性

---

- Sprite Renderer

所有 2D 游戏中游戏资源（除 UI 外）都是通过 Sprite Renderer 让我们看到的，它是 2D 游戏开发中的一个极为重要的组件

 2D 对象创建的方法：

1. 直接拖入 Sprite 图片
2. 右键创建 Sprite
3. 空物体添加脚本

参数介绍：

![](/assets/RgIIbXdHdo6WecxUn7qcuQi4nAh.png)

Sprite：渲染的精灵图片

Color：定义着色

Flip：水平或竖直翻转精灵图片

Draw Mode：

- Simple：简单模式，缩放时整个图像一起缩放
- Sliced：九宫格切片模式，十字区域缩放，四个角不变化，一般用于变化不大的纯色图
- Tiled：平铺模式，将中间部分进行平铺而不是缩放
- Tile Mode：平铺模式
- Continuous：当尺寸变化时，中间部分将均匀平铺
- Adaptive：当尺寸变化时，类似 Simple 模式，当更改尺寸达到 Stretch Value 时，中间才开始平铺

Mask Interaction：与精灵遮罩交互的方式

Sprite Sort Point：计算摄像机和精灵之间距离时，使用精灵中心点 Center 还是轴心点 Pivot，一般情况下不修改

Material：精灵材质

---

- Sprite Creator

我们可以利用 Sprite Editor 的多边形工具创造出各种多边形，Unity 也为我们提供了现成的一些多边形。

它的主要作用是 2D 游戏的替代资源，在等待美术出资源时我们可以用他们作为替代品，有点类似 Unity 提供的自带几何体，替代资源是做 demo 和学习时的必备品。

在 Project 窗口右键创建各种形状的 Sprite 精灵图片：

![](/assets/LWXbbhqF8o7d4Ux9mPOcuQWfnXc.png)

---

- Sprite Mask

​ Sprite Mask 的主要作用就是对精灵图片产生遮罩，制作一些特殊的功能，比如只显示图片的一部分让玩家看到。

​ Sprite 有颜色的部分会作为遮罩，透明的部分不会。

参数介绍：

![](/assets/QwQ5bBTC7oBs8OxJQ5ccJiMFnXb.png)

Sprite：所遮罩的精灵图片

Alpha Cutoff：如果 Alpha 包含透明区域和不透明区域之间的混合（半透明），则可以手动确定所显示区域的分界点（0 ~ 1），小于 Alpha Cutoff 的部分不会被显示

Custom Range：自定义遮罩范围

Font 和 Back 可以定义遮罩影响的层级，遮罩影响的范围是 Back ~ Font 之间，超出这个范围的层级的 Sprite 不会受遮罩影响

Sprite Sort Point：计算摄像机和遮罩之间距离时，使用精灵中心点 Center 还是轴心点 Pivot，一般情况下不修改

