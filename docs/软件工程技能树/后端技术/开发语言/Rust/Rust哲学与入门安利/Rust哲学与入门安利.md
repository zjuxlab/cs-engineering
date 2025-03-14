---
title: Rust哲学与入门安利
slug: Rust哲学与入门安利
sidebar_position: 0
---


# Rust哲学与入门安利

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>❗</div>
<p>这不是一篇入门教学；这篇文章可能包含路牌，但并不是公路。</p>
<p>如果你想要快速入门，这些电子书足矣：</p>
<p><a href="https://course.rs/about-book.html">Rust语言圣经</a></p>
<p><a href="https://kaisery.github.io/trpl-zh-cn/title-page.html">Rust程序设计语言</a></p>
<p><a href="https://doc.rust-lang.org/">The Rustonomicon</a></p>
</div>

Rust在近期的火热大家也许都有所见识：至少我身边的人都突然开始学了。之前有人在推特上问该看什么书入门C++，一名C++ STL的维护者回复："作为一名标准库的维护人员，我推荐《Rust程序设计语言》by Steve Klabnik & Carol Nichols."

在许多领域，对标准库使用Rust重写（即“氧化运动”,The Oxidation）的浪潮也正在袭来。

我们不说工业应用上的优势（这一点在上级目录有所阐述），单纯就学习感受而言，Rust称得上是<b>最好玩的。</b>细细想来一门语言能让初学者感到有趣，无非因为有很多“新东西”：事实上Rust正是这样一门语言。许多近代的概念在编程语言理论(PLT)领域早已有之，或许也曾被几门小众语言实现；但结合的精妙如Rust的却少之又少。<b>Rust不是一门万金油语言，但Rust直击“安全速度兼顾”这一痛点，使得其崭露头角。</b>

# 我眼里的Rust哲学

> 读懂The Zen of Python，方得Pythonic；理解Rust哲学，方悟Rust圣经

1. <b>一切从“显”：能显式的绝不隐式</b>
    想想团队协作（或者是和几个月前的自己协作）时，最难调试的莫过于“想当然”：在内心错误地“假想”了某个变量的类型，某个语法块的范围，某个函数的副作用……
    这些往往是隐式带来的副作用。<b>在代码视觉上的“自然”和语义上的严谨中，rust选择了后者</b>。

2. <b>类型系统：安全与性能鱼和熊掌兼得</b>
    有的语言类型注解除了给程序员和语法检查器看几乎再无他用：TypeScript,Python……但Rust不是。
    类型Rust也并非第一门强类型&静态类型的语言：但很少有语言能做的像Rust这么彻底。我要说的不是类型推导充斥着几乎所有Rust代码，而是<b>生命周期等概念的引入在工业领域是创新性的</b>。总之，完善的类型系统从源头抑制bug的产生（尤其是内存安全问题导致的，有统计称系统内核的安全漏洞80%出自内存管理不善）；同时，这种类型推断很“solid”，给了编译器充足的底气大胆进行优化，使得Rust的速度不可思议的快：这种速度是其他运行时安全机制不可能提供（相反，还会损害）的。
    <div class="callout callout-bg-2 callout-border-2">
    <div class='callout-emoji'>💡</div>
    <p>Rust的类型检查是图灵完备的：你可以用类型系统实现任意计算！（如果不理解，想想lambda演算）</p>
    </div>
    <b>无论哪门语言，类型系统提供的是一系列约束：</b>int能干嘛，str能干嘛……在这一系统下，可以排除<b>某些类型的</b><b>所有错误！</b>
    而生命周期作为类型系统的重要部分，解决的也是极为关键的一类错误：<b>悬垂引用。</b>
    许多初学者（包括我）一开始并没意识到生命周期是类型系统的一部分。事实上，<b>同一数据类型但具有不同生命周期的两个数据在类型系统上满足偏序关系，而整个类型系统是一个偏序集！</b>
    如果你对此很感兴趣，请移步：[进阶：理解在类型系统中的生命周期](wikcnM3kmIpCr9Dv2ciTr3iCDVh) 

3. <b>防御性编程与Fail-fast</b>
    Rust的一大哲学是会发生的错误就尽早发生：能编译期解决的问题绝不留到运行时；能在类型系统上解决的绝不留到具体代码中进行“消歧义”。所以我们说：编译期内存安全。
    <b>Rust在设计上是防御性的：变量默认不可变，不容忍NULL指针的存在……这是这门乍看上去C-like的语言能够独放异彩的核心。</b>

4. <b>自由！自由！自由！：“我们都是成年人了”</b>

Rust给你足够的保障，但不阻止你干坏事。Rust的所有权不能涵盖所有安全的代码，一定有无数种安全的代码会被这一机制挡在门外。当你确信编译器没看懂你的代码是安全时，你大可一句unsafe破除束缚：在unsafe块内，你可以随便强制类型转换，大战悬垂指针……Rust会小心翼翼地把unsafe封装好，并允许包对外展现为safe.如果你愿意，你可以在coq证明确实安全后用unsafe实现，附上证明发GitHub让协作者心服口服。

<b>如果说Python是把危险按钮盖上塑料盖子，告诉你：“我们都是成年人了，我拦不住你”，那么Rust就是把按钮周围焊死，然后给你一台角磨机，确保你真的知道自己要干什么时也有备选项。</b>

此外，Rust还提供3种宏：这不是替换词汇的小儿科，而是<b>直接操纵代码语法树的魔法！</b>你甚至可以在语法树上、在嵌套的数据结构上进行精确的模式匹配与提取。强大的宏带来巨量语法糖：Rust的哲学是不要那些假惺惺的保护，这是一门成年人的语言。

# Rust初见能带来的惊艳

1. 报错超级友好！常见错误都会直接告诉你怎么改，错的地方会精确指出：

```rs
5 |     let scores = inputs().iter().map(|(a, b)| {
  |                  ^^^^^^^^ creates a temporary which is freed while still in use
6 |         a + b
7 |     });
  |       - temporary value is freed at the end of this statement
8 |     println!("{}", scores.sum::<i32>());
  |                    ------ borrow later used here
  help: consider using a `let` binding to create a longer lived value
  |
5 ~     let binding = inputs();
6 ~     let scores = binding.iter().map(|(a, b)| {
  |    });

For more information about this error, try `rustc --explain E0716`.
```

1. Cargo，最好用的包管理器，谁用谁知道
2. Rust里大量的零成本抽象：
    意思是一些语法糖不是没有少量性能损失——是完全没有！按照定义，就是“手写最快也就这么快”。而对于类——实际上Rust里没有严格意义上的类——Rust把多态在编译期单态化，不像C++这种有虚函数表带来性能损失，运行时没有额外开销。这也得益于trait系统，借鉴于Haskell。

3. 内存安全带来的高并发优势：终于可以摆脱GIL锁了。封装了各种Mutex类型，确实劲大。
4. <b>新手往往抱怨天天和编译器斗智斗勇，写程序像是在写证明题：但是编译通过，真正跑起来时的那种放心和自信也是令人印象深刻的。</b>

