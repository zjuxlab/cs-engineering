---
title: WEB3：区块链
slug: WEB3：区块链
sidebar_position: 0
---


# WEB3：区块链

Author：NA

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>❗</div>
<p>本文的一些概念性内容不一定对，请辩证对待</p>
</div>

## 引言

> 推荐阅读
> [产业区块链](https://book.douban.com/subject/35030217/)

在具体谈论web3之前，我们需要先明确web3究竟是什么东西

就我个人而言，我认为web3的基石就是区块链，而区块链又是什么呢？在这里我们先不具体阐述，我们只需要知道区块链提供了以下特性/功能

- 数据不可篡改
- 去中心化

而web3则是在上述特性的基础上衍生出的一系列应用的集合，如DAO,NFT，各种币等，在下文中，我将web3定义为基于区块链的一系列应用

那么web3的价值又在哪里呢，我不认为现在被炒的火热的各种币 & NFT等是一个有价值或者说有意义的方向，在我看来，这些东西更像是套了一个新概念的赌场

web3的价值，可能更多的在于产业区块链上，举例而言，现在在推广的数字人民币实际上就是基于联盟链开发的（联盟链可以理解为只有数据不可篡改特性的区块链）。区块链不可篡改的特性可以确保数据的安全，降低信任成本，提高办公效率等

另外还值得注意的是，区块链打造的共识机制实际上为一种国际货币的诞生打下了基础(e.g. libra)，对于普通公民来说，我们也可以借助这一点分散风险

## 总览

web3的实现载体，被称为DApp(decentralized application)，也就是去中心化的应用

在这一节，我将介绍一下DApp的技术栈

与以前的app的前后端划分不同，DApp中的后端被智能合约代替，前端所做的工作则是与智能合约进行交互

什么是智能合约呢，要理解智能合约我们就要先了解一下以太坊的架构

> <b>以太坊</b>（英文Ethereum）是一个开源的有[智能合约](https://baike.baidu.com/item/%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6/19770937)功能的公共[区块链](https://baike.baidu.com/item/%E5%8C%BA%E5%9D%97%E9%93%BE/13465666)平台，通过其专用[加密货币](https://baike.baidu.com/item/%E5%8A%A0%E5%AF%86%E8%B4%A7%E5%B8%81)[以太币](https://baike.baidu.com/item/%E4%BB%A5%E5%A4%AA%E5%B8%81/20857686)（Ether，简称“ETH”）提供[去中心化](https://baike.baidu.com/item/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96/8719532)的以太[虚拟机](https://baike.baidu.com/item/%E8%99%9A%E6%8B%9F%E6%9C%BA/104440)（Ethereum Virtual Machine）来处理[点对点](https://baike.baidu.com/item/%E7%82%B9%E5%AF%B9%E7%82%B9/7452984)合约。

与经典的由中本聪提出的区块链架构不同，以太坊在区块中加入了可执行代码，这些代码可以被<b>任何</b>外部用户调用，外部用户可以通过调用这些代码完成转账交易等功能。这些代码就被称为智能合约，智能合约主要由solidity编写，负责交易发行的资产与储存链上状态

前端方面则可以通过web3.js,wagmi等库调用智能合约

为了更好的理解这一过程，下面举一个例子来说明DApp的运行过程：

当你在一些看起来很酷的网站上买了一个看起来更酷的NFT时，你实际上是用你的账户向以太坊上的一个节点发起了一个交易请求，以太坊上的节点会处理这个交易请求，在处理完这个交易请求后，这个交易会被记录到这个节点的merkle patricia树上，并返回交易回执；与传统的前后端架构不同的是，当你在网站上点击购买按钮时，前端会通过web3.js，wagmi等库调用链上的某个智能合约，并发送交易请求

## 最佳实践

### 建立项目环境

相信大家对于前端编码的项目环境都已经很熟悉了，在这里我只介绍一下用于智能合约编写的项目环境，在这里我们采用hardhat自动化智能合约的编译，部署等工作流程

整个自动化工作流程大致可以分为以下几个步骤

1. 编译合约
2. 测试合约
3. 部署合约

下面我们将一步步演示

首先新建一个hardhat项目

```text
npm install --save-dev hardhat
```

运行`npx hardhat`创建hardhat项目，之后根据hardhat的提示进行依赖安装

![](/assets/MWLabr2GIo68sAxgXcNcRdjGn8g.png)

完成项目创建后，你可以通过`npx hardhat compile`来编译contracts文件夹下的合约代码，编译出来的abi等会被放在`sample\artifacts\contracts`目录下

你可以运行`npx hardhat test`来运行test文件夹下的测试文件，测试通过的样例如下

![](/assets/Fx3LbvazWoxgAqxAmPqctVJknQX.png)

你可以通过`npx hardhat run scripts/deploy.js`运行scripts目录下的deploy.js文件来部署你的合约，之后我们通过`npx hardhat node`命令在本地运行一个hardhat测试网络，你可以通过`npx hardhat run scripts/deploy.js--network localhost `指定合约部署的网络

至此，我们就完成了从编译到测试到部署的项目环境搭建

### 智能合约开发

推荐阅读

[一些经典代码](https://github.com/OpenZeppelin/openzeppelin-contracts)

[官网](https://solidity-cn.readthedocs.io/zh/develop/)

#### 概论

在这一部分我们将实现一个ERC20合约

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>ERC20是什么？</p>
</div>

> ERC-20 提供了一个同质化代币的标准，换句话说，每个代币与另一个代币（在类型和价值上）完全相同。 例如，一个 ERC-20 代币就像以太币一样，意味着一个代币会并永远会与其他代币一样。

ERC-20（以太坊意见征求 20）由 Fabian Vogelsteller 提出于 2015 年 11 月。这是一个能实现智能合约中代币的应用程序接口标准。

代币可以在以太坊中表示任何东西，如：

- 在线平台中的信誉积分
- 像美元一样的法定货币

ERC-20 的功能示例包括：

- 将代币从一个帐户转到另一个帐户
- 获取帐户的当前代币余额
- 获取网络上可用代币的总供应量
- 批准一个帐户中一定的代币金额由第三方帐户使用

一个标准的ERC20合约需要有以下变量，方法以及事件

```solidity
mapping(address => uint256) private _balances;

mapping(address => mapping(address => uint256)) private _allowances;

uint256 private _totalSupply;

string private _name;
string private _symbol;

function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

#### 变量

Solidity 支持三种类型的变量：

- <b>状态变量</b> – 变量值永久保存在合约存储空间中的变量。
- <b>局部变量</b> – 变量值仅在函数执行过程中有效的变量，函数退出后，变量无效。
- <b>全局变量</b> – 保存在全局命名空间，用于获取区块链相关信息的特殊变量。

Solidity 是一种静态类型语言，这意味着需要在声明期间指定变量类型。每个变量声明时，都有一个基于其类型的默认值。没有`undefined`或`null`的概念。

状态变量声明在函数顶部，它会被储存在以太坊区块链中，更具体的来说，状态变量会被储存在以太坊的<b>Merkel Patricia</b>树中，形成关于这一区块的状态信息

局部变量则声明在函数中，其作用域限定在声明它们的代码块内，函数退出后，局部变量会被销毁

状态变量可以在声明时进行初始化，并且具有以下可见性：

- `private`：状态变量仅在定义的合约里可见。
- `public`：状态变量也可以在定义合约的外部访问，因为编译器会自动创建一个与该变量同名的getter函数。
- `internal`：状态变量在定义的合约以及所有继承合约都是可见的。

可见性指示符放在状态变量的类型之后，如果未指定，则状态变量将被视为`internal`。

接下来我们简要介绍具体的变量类型

uint256，string之类的相信大家一看就明白是什么意思了，我们在这里只介绍一下mapping和address

mapping(type1 =&gt; type2)代表从type1到type2的映射，可以理解为js中对象的key和value

address则代表一个地址，由于每个账户都需要有一个地址用于交易，因此地址在以太坊中非常重要，address大小为20个字节，有160位

#### function以及event

我们首先以`function name() public view returns (string)`来简要介绍一下solidity中的函数定义

solidity中的函数定义需要分为三部分

- 返回值
- 可见性
- 状态可变性

returns字段后面的就代表这个函数的返回值，括号内可以有多个类型，代表函数返回多种类型的值

solidity函数的可见性分为四种

- Private（私有）：限制性最强，函数只能在所定义的智能合约内部调用。
- Internal（内部）：可以在所定义智能合约内部调用该函数，也可以从继承合约中调用该函数。
- External（外部）：只能从智能合约外部调用。 (如果要从智能合约中调用它，则必须使用 `this`。)
- Public（公开）：可以从任何地方调用。 (最宽松)

solidity的状态可变性则分为三种

- view：用`view`声明的函数只能读取状态，而不能修改状态。
- pure：用`pure`声明的函数既不能读取也不能修改状态。
- payable：用`payable`声明的函数可以接受发送给合约的以太币，如果未指定，该函数将自动拒绝所有发送给它的以太币。

`function name() public view returns (string)`代表这个函数可以从任何地方调用，只能读取状态不能修改状态，返回string类型的值

接下来我们介绍一下event，solidity中的event用于发出一个信号，这个信号可以在前端被监听到

我们可以使用emit方法触发事件

#### 实战

我们在这里直接给出name函数的代码，并对此做出解释

```solidity
pragma solidity ^0.8.9;

contract ERC20 {
    // ...
    string private  _name;
    // ...
    function name() public view returns (string memory) {
        return _name;
    }
    // ...
}
```

第一行`pragma solidity ^0.8.9;`第一行就是告诉大家源代码使用Solidity版本`0.8.9`写的，这是为了确保合约不会在新的编译器版本中突然行为异常

`contract ERC20 {}`则声明了一个合约

`string private  _name;`定义了一个类型为string，可见性为private的变量

函数逻辑就是返回定义的_name状态变量(●'◡'●)

#### 总结

总体上来说ERC20的实现并不困难，真正需要理解的是为什么ERC20需要有这些函数与事件，关于具体的ERC20实现，你可以参考这里的实现

solidity的一些基本概念则和我们以前学过的c，js，ts等都有共通之处，但需要特别注意的是由于智能合约的代码储存在以太坊上所导致的一些特性(e.g. 状态变量,gas)

