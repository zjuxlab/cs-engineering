---
title: JS开发Harmony 实践
slug: JS开发Harmony 实践
sidebar_position: 4
---


# JS开发Harmony 实践

Author:王琛涵

Harmony OS中通过 FA 调用 PA 的机制来实现 JS 与 JAVA 和之间的交互。

# PA&FA

HarmonyOS应用是由Ability构成的，Ability可以分为 FA(Feature Ability)和 PA(Particle Ability)两种类型。

## PA

PA (全称 Feature Ability)支持JS 和 JAVA 的方式开发，根据开发方式可以分 JS FA 和 JAVA FA，是用于用户交互，在屏幕上显示一个用户界面，该界面用来显示所有可被用户查看和交互的内容。用户界面由UI元素构成，通常包含布局、控件等形式，且元素支持设置资源和动画。

## FA

PA (全称 Particle Ability)一般用于后台业务逻辑的实现，分为 Data Ability 和 Service Ability，Data Ability 负责 FA 进行数据的访问，Service Ability 则负责一些后台的服务。

![](/assets/Ttmmb8omgonLs7xtHvAccHZmnPc.png)

### FA调PA机制介绍

FA 调 PA 机制，在 HarmonyOS 引擎内提供了一种通道来传递方法调用、数据返回、事件上报，可根据需要自行实现 FA 和 PA 两端的对应接口完成对应的功能逻辑。FA 一般都是选择 JS 开发的，而 PA 只支持JAVA开发，JS FA 与 JAVA PA 之间是基于RPC协议实现的进程间通信，根据系统提供的API，JS FA 将数据往平台层透传，平台层将数据转换成 C++ 类型的数据，再通过 C++ 与 JAVA 的JNI接口类，将 C++ 的数据传递到 JAVA 侧，并接收 JAVA 侧返回的数据。借助 FA 调 PA 机制，可以根据需要进行对应功能的接口拓展，实现 JS 与 JAVA 的交互。

### PA端的两种实现方式

PA端包含远端调用Ability和本地调用Internal Ability两种方式。

Ability调用方式：拥有独立的Ability生命周期，FA 使用远端进程通信拉起并请求 PA 服务，适用于基本服务 PA 有多个 FA 调用或者 PA 在后台独立运行的场景。

Internal Ability调用方式：PA 与 FA 共进程， PA 和 FA 采用内部函数调用的方式进行通信，适用于对服务响应时延要求较高的场景。该方式下 PA 不支持其他 FA 访问调用。

这两种调用方式在代码中可通过abilityType来标识，更多差异如下表：

## 一个基本框架

环境配置和项目创建可参考https://blog.csdn.net/ssssswsrjhtdj/article/details/116325829 and https://bbs.huaweicloud.com/blogs/381423

![](/assets/Jv5mbKW3coKd8jxWA4hc3WgNnrc.png)

一般来说主要编辑的地方是`entry/src`文件夹，其中结构与node项目相似，然后进入js开发目录，即`main/js`目录，其中：

- common是公共文件夹，这里应该放置的是公共资源
- i18n是国际化文件夹，里面放的是各语言环境文本内容
- pages是页面，有html，css，js三个文件组成
- app.js是入口文件

### app.js

这是默认app.js，加了一些注释

```js
// 导入 @ohos.hilog 模块，用于记录日志
import hilog from '@ohos.hilog';

export default {
  // Vue.js 组件的 onCreate 生命周期钩子
  onCreate() {
    // 检查是否可以记录信息级别的日志
    hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
    // 记录信息级别的日志，内容为 "Application onCreate"
    hilog.info(0x0000, 'testTag', '%{public}s', 'Application onCreate');
  },
  // Vue.js 组件的 onDestroy 生命周期钩子
  onDestroy() {
    // 检查是否可以记录信息级别的日志
    hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
    // 记录信息级别的日志，内容为 "Application onDestroy"
    hilog.info(0x0000, 'testTag', '%{public}s', 'Application onDestroy');
  },
}
```

app.js 是前端应用的入口文件，它不是直接负责在网页中显示 HTML 内容的，在示例里面只是进行了日志处理。实际上，app.js 是一个 JavaScript 文件，用于初始化和配置整个前端应用。它通过 Vue.js 的配置和组件创建来实现在网页中显示内容。

让我们来澄清一下整个流程：

1. HTML 页面加载：当用户在浏览器中打开你的网页时，浏览器会从服务器请求 HTML 文件。在这个 HTML 文件中，会包含一个 `<script>` 标签用于加载 app.js 文件。
2. app.js 加载：当浏览器解析到 `<script>` 标签时，它会下载并执行 app.js 文件。
3. 创建 Vue 实例：在 app.js 文件中，你会看到类似于 `new Vue({...})` 的代码，这将创建一个 Vue 实例，即应用程序的入口点。
4. 挂载 Vue 实例：在创建 Vue 实例时，你会通过配置选项的 `el` 属性指定一个 HTML 元素的选择器作为 Vue 实例的挂载点。
5. 数据绑定和模板：在 Vue 实例的配置选项中，你可以定义 `data` 属性来存储数据。然后，在 HTML 页面的模板中，你可以使用双花括号（`{{ ... }}`）插值语法来将数据和界面关联起来，使数据能够动态地显示在页面上。
6. 页面渲染：当浏览器加载并执行完 app.js 文件后，Vue.js 框架会根据 Vue 实例的配置选项和数据绑定，自动将数据渲染到页面中，从而实现了在网页上显示内容。

总结起来，app.js 文件作为前端应用的入口文件，通过创建 Vue 实例和配置数据绑定，实现了在网页中动态显示内容。在此过程中，并没有直接调用 JavaScript 来显示 HTML，而是利用 Vue.js 的能力将数据和界面关联起来，让前端应用能够以动态和交互性的方式展示内容。

#### 实践

老规矩先上一个hello world试试水

![](/assets/MByJbOfgDoCZK0xoMtdckLOgnNf.png)

一般新建项目就是hello world，直接跑就行

##### 一个注册demo

开发思路：

用hml来写构建应用程序的界面，js写一些处理函数

app.js 是默认app.js

index.hml

```js
<div class ="container">
    <div class ="page-title-wrap">
        <text class ="page-title">{{ $t('Strings.componentName') }}
        </text>
    </div>

<!-- username -->
    <div class ="item-container">
        <text class="item-title">{{ $t('Strings.userName') }}</text>
        <div class="item-content">
            <input class="input-text" placeholder="{{$t('Strings.userNamePromt')}}" onchange="getName"></input>
        </div>
    </div>

<!-- date -->
    <div class="item-container">
        <text class="item-title">{{ $t('Strings.date') }}</text>
        <div class="item-content">
            <picker type="date" end="2020-01-01" selected="1990-01-01" value="{{date}}" onchange="getDate"></picker>
        </div>
    </div>

<!-- gender -->
    <div class ="item-container">
        <text class="item-title">{{ $t('Strings.gender') }}</text>
        <div class="item-content">
            <label target="radio1">{{ $t('Strings.male') }}:</label>
            <input id="radio1" type="radio" name="radio" value="{{ $t('Strings.male') }}" onchange="getMaleGender" checked="true"></input>
            <label target="radio2">{{ $t('Strings.female') }}:</label>
            <input id="radio2" type="radio" name="radio" value="{{ $t('Strings.female') }}" onchange="getFemaleGender"></input>
        </div>
    </div>

<!-- education -->
    <div class ="item-container">
        <text class="item-title">{{ $t('Strings.education') }}</text>
        <select class="select" onchange="getEducation">
            <option value="{{$t('Strings.graduated')}}" selected="true">{{$t('Strings.graduated')}}</option>
            <option value="{{$t('Strings.bachelor')}}">{{$t('Strings.bachelor')}}</option>
            <option value="{{$t('Strings.master')}}">{{$t('Strings.master')}}</option>
            <option value="{{$t('Strings.doctor')}}">{{$t('Strings.doctor')}}</option>
        </select>
    </div>

    <div class ="button-container">
        <input type="button" class="btn" onclick="onRegiste" value="{{ $t('Strings.register') }}"/>
    </div>
</div>
```

index.js

```js
import prompt from '@system.prompt'
import router from '@system.router'

export default {
    data: {
        name: '',
        date: '1990-01-01',
        gender: 'Strings.male',
        education: 'Strings.graduated',
    },
    onInit() {
    },
    getName(e) {
        this.name = e.value;
        console.info("name=" + this.name)
    },
    getDate(e) {
        this.date = e.year + '-' + (e.month + 1) + '-' + e.day;
        console.info("date=" + this.date)
    },
    getFemaleGender(e) {
        if (e.checked) {
            this.gender = 'Strings.female'
            console.info("gender =" + this.gender)
        }
    },
    getMaleGender(e) {
        if (e.checked) {
            this.gender = 'Strings.male'
            console.info("gender =" + this.gender)
        }
    },
    getEducation(e) {
        this.education = e.newValue;
        console.info("education=" + this.education)
    },
    onRegiste() {
        if (this.name.length == 0) {
            prompt.showToast({
                message: this.$t('Strings.name_null')
            })
            return;
        }
        if (this.name.length < 6) {
            prompt.showToast({
                message: this.$t('Strings.name_short')
            })
            return;
        }
        if (this.date.length == 0) {
            prompt.showToast({
                message: this.$t('Strings.date_null')
            })
            return;
        }

        if (this.gender.length == 0) {
            prompt.showToast({
                message: this.$t('Strings.gender_null')
            })
            return;
        }

        if (this.education.length == 0) {
            prompt.showToast({
                message: this.$t('Strings.education_null')
            })
            return;
        }

        router.push({
            uri: 'pages/success/success'
        })
    }
}
```

![](/assets/Gj5dbRsiHoap5cx0PgkcAUoOnnf.png)

#### quickJS

以上demo都是使用原生html构建应用程序的界面，然而，HarmonyOS 也支持使用纯 JavaScript 来创建界面，这种方式被称为 <b>"QuickJS"</b>。

QuickJS 是 HarmonyOS 提供的一套 JavaScript 接口，用于在纯 JavaScript 中构建界面。你可以使用 QuickJS 来创建视图、布局、组件等，实现应用程序的界面展示和交互。不需要使用 HML，你可以直接在 JavaScript 中操作 UI 元素。

index.js

```js
import { createElement, TextInput, Button, Stack } from '@ohos.ace/quickjs';

function createLoginForm() {
    const stackElement = createElement(Stack, {
        width: 'match_parent',
        height: 'match_parent',
        orientation: 'vertical',
        padding: '16vp',
        background_element: '#F5F5F5',
    });

    const usernameInput = createElement(TextInput, {
        width: 'match_content',
        height: '50vp',
        hint: 'Username',
        marginBottom: '16vp',
    });

    const passwordInput = createElement(TextInput, {
        width: 'match_content',
        height: '50vp',
        hint: 'Password',
        inputType: 'password',
        marginBottom: '24vp',
    });

    const loginButton = createElement(Button, {
        width: 'match_parent',
        height: '50vp',
        text: 'Login',
        textSize: '20fp',
        textColor: '#FFFFFF',
        background_element: '#1976D2',
    });

    stackElement.appendChild(usernameInput);
    stackElement.appendChild(passwordInput);
    stackElement.appendChild(loginButton);

    return stackElement;
}

export function entry() {
    const rootView = createLoginForm();
    return rootView;
}
```

app.js

```js
import hilog from '@ohos.hilog';
//import { entry } from './index/index.js';
import { entry } from "src/main/js/MainAbility/pages/index/index.js"

export default {
    onCreate() {
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Application onCreate');
    },
    onDestroy() {
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Application onDestroy');
    },
}

entry();
```

Tips: harmony SDK 更新挺快的，gpt给的demo不一定能跑

# <b>一次开发，多端部署</b>

随着智能设备类型的不断丰富，用户可以在不同的设备上享受同样的服务，但由于设备形态不尽相同，开发者往往需要针对具体设备修改或重构代码，以实现功能完整性和界面美观性的统一。HarmonyOS为开发者提供了“一次开发，多端部署”的系统能力，让开发者可以基于一次开发，快速构建不同类型终端上的应用，降低开发成本，提高开发效率。

HarmonyOS提供了用户程序框架、[Ability](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/glossary-0000000000029587#ZH-CN_TOPIC_0000001114162884__li1373094219463)框架以及UI框架，支持应用开发过程中多终端的业务逻辑和界面逻辑进行复用，能够实现应用的一次开发、多端部署，提升了跨设备应用的开发效率。一次开发、多端部署示意图见[图6](https://developer.harmonyos.com/cn/docs/documentation/doc-guides/harmonyos-features-0000000000011907#ZH-CN_TOPIC_0000001175461719__fig087974703213)。

其中，UI框架支持使用ArkTS、JS、Java语言进行开发，并提供了丰富的多态控件，可以在手机、平板、智能穿戴、智慧屏、车机上显示不同的UI效果。采用业界主流设计方式，提供多种响应式布局方案，支持栅格化布局，满足不同屏幕的界面适配能力。

<b>图6 </b>一次开发、多端部署示意图

![](/assets/UhYqbHmN6oz9KhxnquNc7LmLnvE.png)

## 多端设计UI自适应

不同设备屏幕尺寸、分辨率等存在差异。HarmonyOS对屏幕进行逻辑抽象，包括尺寸和物理像素，并通过方舟开发框架（简称ArkUI）提供丰富的自适应、响应式的布局，方便开发者进行不同屏幕的界面适配。同时，HarmonyOS将人因设计、多端设计UI自适应等经验，都固化到相关设计指南和ArkUI控件中，让应用开发者在设计阶段就可以考虑多端的差异化和一致性。

Demo 完整代码地址https://gitee.com/harmonyos/codelabs/tree/master/Multi_device_V2

主体思路：

根据媒体查询条件监听不同屏幕尺寸的变化，然后根据当前断点来调整用户界面的显示。

```properties
import mediaQuery from '@ohos.mediaquery';
import { CommonConstants as Const } from '../constants/CommonConstants';

export class BreakpointSystem {
  private currentBreakpoint: string = Const.MD; // 当前断点，默认为中等尺寸 (MD)
  private smListener: mediaQuery.MediaQueryListener = mediaQuery.matchMediaSync(Const.BREAKPOINTS_SCOPE_1);
  private mdListener: mediaQuery.MediaQueryListener = mediaQuery.matchMediaSync(Const.BREAKPOINTS_SCOPE_2);
  private lgListener: mediaQuery.MediaQueryListener = mediaQuery.matchMediaSync(Const.BREAKPOINTS_SCOPE_3);

  // 更新当前断点的私有方法
  private updateCurrentBreakpoint(breakpoint: string) {
    if (this.currentBreakpoint !== breakpoint) {
      this.currentBreakpoint = breakpoint;
      AppStorage.Set<string>('currentBreakpoint', this.currentBreakpoint); // 将当前断点保存到应用存储中
    }
  }

  // 当屏幕尺寸符合"SM"条件时执行的回调方法
  private isBreakpointSM = (mediaQueryResult: mediaQuery.MediaQueryResult) => {
    if (mediaQueryResult.matches) {
      this.updateCurrentBreakpoint(Const.SM); // 更新当前断点为"SM"
    }
  }

  // 当屏幕尺寸符合"MD"条件时执行的回调方法
  private isBreakpointMD = (mediaQueryResult: mediaQuery.MediaQueryResult) => {
    if (mediaQueryResult.matches) {
      this.updateCurrentBreakpoint(Const.MD); // 更新当前断点为"MD"
    }
  }

  // 当屏幕尺寸符合"LG"条件时执行的回调方法
  private isBreakpointLG = (mediaQueryResult: mediaQuery.MediaQueryResult) => {
    if (mediaQueryResult.matches) {
      this.updateCurrentBreakpoint(Const.LG); // 更新当前断点为"LG"
    }
  }

  // 注册媒体查询监听器
  public register() {
    this.smListener = mediaQuery.matchMediaSync(Const.BREAKPOINTS_SCOPE_1);
    this.smListener.on('change', this.isBreakpointSM); // 监听"SM"断点条件的变化
    this.mdListener = mediaQuery.matchMediaSync(Const.BREAKPOINTS_SCOPE_2);
    this.mdListener.on('change', this.isBreakpointMD); // 监听"MD"断点条件的变化
    this.lgListener = mediaQuery.matchMediaSync(Const.BREAKPOINTS_SCOPE_3);
    this.lgListener.on('change', this.isBreakpointLG); // 监听"LG"断点条件的变化
  }

  // 取消注册媒体查询监听器
  public unregister() {
    this.smListener.off('change', this.isBreakpointSM); // 取消对"SM"断点条件的监听
    this.mdListener.off('change', this.isBreakpointMD); // 取消对"MD"断点条件的监听
    this.lgListener.off('change', this.isBreakpointLG); // 取消对"LG"断点条件的监听
  }
}
```

main.ets:

```properties
// 导入媒体查询模块和常量定义
import mediaQuery from '@ohos.mediaquery';
import { BreakpointSystem, CommonConstants as Const } from '@ohos/common';

// 定义一个名为 MainPage 的类
@Entry
@Component
struct MainPage {
  // 用于存储当前底部标签的索引
  @State @Watch('onIndexChange') bottomTabIndex: number = 0;

  // 存储当前断点尺寸的状态
  @StorageProp('currentBreakpoint') currentBreakpoint: string = Const.MD;

  // 创建 BreakpointSystem 实例用于管理断点
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();

  // 页面即将显示时的操作
  aboutToAppear() {
    this.breakpointSystem.register();
  }

  // 页面即将隐藏时的操作
  aboutToDisappear() {
    this.breakpointSystem.unregister();
  }

  // 当底部标签索引发生变化时的回调
  onIndexChange() {
    this.controller.changeIndex(this.bottomTabIndex);
  }

  // 构建页面布局
  build() {
    SideBarContainer(SideBarContainerType.Embed) {
      // 创建左侧标签栏
      LeftTabs({ bottomTabIndex: $bottomTabIndex });

      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.End, justifyContent: FlexAlign.End }) {
        Tabs({ barPosition: BarPosition.End, index: 0, controller: this.controller }) {
          // 根据当前断点显示首页标签页
          TabContent() {
            HomeTabs({ currentBreakpoint: $currentBreakpoint })
          }
          .padding({
            left: this.currentBreakpoint === Const.SM ? $r('app.float.main_page_padding1') : (this.currentBreakpoint === Const.MD ? $r('app.float.main_page_padding3') : 0),
            right: this.currentBreakpoint === Const.SM ? $r('app.float.main_page_padding1') : $r('app.float.main_page_padding3')
          })

          // 根据当前断点显示发现标签页
          TabContent() {
            FindTabs()
          }
          .padding({
            left: this.currentBreakpoint === Const.SM ? $r('app.float.main_page_padding2') : (this.currentBreakpoint === Const.MD ? $r('app.float.main_page_padding3') : 0),
            right: this.currentBreakpoint === Const.SM ? $r('app.float.main_page_padding2') : $r('app.float.main_page_padding3')
          })

          // 根据当前断点显示驱动标签页
          TabContent() {
            DriveTabs()
          }
          .padding({
            left: this.currentBreakpoint === Const.SM ? $r('app.float.main_page_padding1') : (this.currentBreakpoint === Const.MD ? $r('app.float.main_page_padding3') : 0),
            right: this.currentBreakpoint === Const.SM ? $r('app.float.main_page_padding1') : $r('app.float.main_page_padding3')
          })

          // 根据当前断点显示我的标签页
          TabContent() {
            MineTabs()
          }
        }
        .onChange((index: number) => {
          this.bottomTabIndex = index;
        })
        .width(Const.FULL_SIZE)
        .vertical(false)
        .barHeight(0)

        // 如果当前断点不是 LG，则显示底部标签
        if (this.currentBreakpoint !== Const.LG) {
          BottomTabs({ bottomTabIndex: $bottomTabIndex })
        }
      }
      .width(Const.FULL_SIZE)
      .backgroundColor($r('app.color.background_color'))
    }
    .showSideBar(this.currentBreakpoint === Const.LG)
    .showControlButton(false)
    .sideBarWidth(Const.SIDEBAR_WIDTH)
    .maxSideBarWidth(Const.SIDEBAR_WIDTH_MAX)
    .minSideBarWidth(Const.SIDEBAR_WIDTH_MIN)
  }
}
```

### 灵活布局

多端设计UI自适应，在同一个栅格模式下切换窗口大小， 能够随窗口大小的变化而自动适应界面上的所有元素，从而保证动态界面的美观。当界面窗口变化到一定程度时（断点），比如从2in1模式拖动窗口变小到手机窗口大小时（从2in1模式切换成手机模式），界面需要响应式变化布局，从而保证应用在不同窗口大小下的展示美观。

## 栅格响应式能力

组件作为应用的基础组成部分，在视觉、交互、动效等表现形式上需针对不同设备进行必要的调整，达到最佳体验。使用一多能力，同一个组件标题栏可实现在手机和2in1的不同样式。

## 交互事件归一

对于不同类型的终端设备，用户可能有不同的交互方式，如通过触摸屏、鼠标、触控板等。不同输入设备的相同意图的输入指令，交互归一提供给开发者统一的API。应用一个hap可以安装在不同设备中，不需要针对不同设备处理交互，极大的精简了开发难度和开发代码量。

