---
title: Git 与 Gitee/Github
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-fasnwakyoija5ikb6xicihlunnc-jahiwo9tziyhqskzxoyc1wfrntb-jahiwo
sidebar_position: 1
---


# Git 与 Gitee/Github

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🤔</div>
<p>git 到底是个什么东西？在刚刚学习 git 的时候，大家可能是先接触的使用指南，学习了 git 指令。但这都非常浮于表面——如果我们不理解 git 的本质，就难以妥善利用它实现复杂功能。</p>
</div>

基本概念：

工作区：比如你被 git 管理着一个项目，那么这个项目下所有的文件 当前的状态，就是当前的工作区。

## Git 是链表

<img src="/assets/YbOHb1jawoafDFxD3wkcZLpnn7g.png" src-width="602" src-height="185" align="center"/>

当你在 master 分支上 commit 三次后，git 的状态。我们可以看到，用蓝色标识出的三个commit ABC，都是链表上的节点。这是一个<b>单链表</b>，意味着<b>每一个节点有且仅有一个指向它父节点的指针</b>。

另外，还有两个黄色节点。master 指针指向了当前分支的最新节点，而 HEAD 指针指向了当前工作区所在的节点。我们不妨用案例来让你理解——下面的表格展示了，在上图所示的状态下进行 git 操作，从而导致的结果。

<table>
<colgroup>
<col width="164"/>
<col width="164"/>
<col width="351"/>
</colgroup>
<tbody>
<tr><td><p>操作</p></td><td><p>结果</p></td><td><p>链表行为（相对于上图所示的状态）</p></td></tr>
<tr><td><p>git commit</p></td><td><p>新增一个提交 D</p></td><td><ul>
<li>新增一个链表节点 D，D 指向 C</li>
<li>HEAD 指针指向 D</li>
<li>master 指针指向 D</li>
</ul></td></tr>
<tr><td><p>git reset B --hard</p></td><td><p>将历史回溯到 B</p></td><td><ul>
<li>HEAD 指针指向 B</li>
<li>Master 指针指向 B</li>
<li>注意！C 节点不会消失，只是由于没有任何指针指向它，它不再能通过常规的指针操作访问到</li>
</ul></td></tr>
<tr><td><p>git reset B --hard<br/>git commit</p></td><td><p>将历史回溯到 B<br/>新增一个提交 D</p></td><td><ul>
<li>新增一个链表节点 D，D 指向 B</li>
<li>HEAD 指针指向 D</li>
<li>master 指针指向 D</li>
<li>注意！C 节点不会消失，只是由于没有任何指针指向它，它不再能通过常规的指针操作访问到</li>
</ul></td></tr>
<tr><td><p>Git checkout B</p></td><td><p>将当前工作区跳转到 B</p></td><td><ul>
<li>HEAD 指针指向 B</li>
</ul></td></tr>
</tbody>
</table>

> [Git](wikcnHmOUdLEbcAEa6cx5wjHjhq)

