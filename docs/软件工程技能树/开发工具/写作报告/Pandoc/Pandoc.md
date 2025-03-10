---
title: Pandoc
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-q8ruwyobvi82kukykutco0e5nqb-zdcowmsszilykmkzbn5czmlen2b-agiawhz5kidr5ek8mlmccmltnvg-agiawh
sidebar_position: 2
---


# Pandoc

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🌰</div>
<p>从 Markdown 生成高质量 LaTeX 小论文 / Beamer 演示文稿，拒绝手写 LaTeX</p>
</div>

- [x] Pandoc 介绍

- [ ] 生成 LaTeX

- [ ] *生成 Beamer

- [ ] Tricks

- [x] *其他：Typora 主题伪装等

# 简介

Pandoc 是非常强大的文档格式转换工具，支持 Markdown、HTML、LaTeX、Microsoft Word、RTF、MediaWiki、Beamer、Microsoft PowerPoint、reveal.js、PDF 等许多种常用和不常用的「文档格式」。

可能你在使用 Typora 的时候就听说过 Pandoc，但 Pandoc 完全可以不依赖（现在已经）收费的 Typora，通过 LaTeX 或 HTML 等途径生成 PDF 文档。

当然如果你更喜欢 Typora 的所见即所得，那么也可以尝试一下 [GitHub - Keldos-Li/typora-latex-theme: 将Typora伪装成LaTeX的中文样式主题，本科生轻量级课程论文撰写的好帮手](https://github.com/Keldos-Li/typora-latex-theme)

然而，Pandoc 还是比较难用的，它有许多 Markdown 扩展，需要解决中文支持问题，需要修改 LaTeX 模板。你最主要的参考来源就是有些恐怖的单页 Pandoc 文档：

或者是本文？然而我在使用 Pandoc 过程中<del>也还有很多麻烦的问题没解决</del>。很多内容可能是我写本文时候才发现的。因此让我们一起来探讨吧！

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>我好像是在 FDS 的助教文档里第一次了解到 Pandoc 的这种用法，之后随着 Typora 的商业化，我彻底转向了 Pandoc 路线，并推荐给组员（</p>
<p>我用 Pandoc 写的效果最好的大概就是这篇了 <a href="https://zhzh2001.bitbucket.io/2022/01/11/lcdf-course-project-report/">https://zhzh2001.bitbucket.io/2022/01/11/lcdf-course-project-report/</a></p>
</div>

对了，这篇 [How to use Pandoc to produce a research paper](https://opensource.com/article/18/9/pandoc-research-paper) 也是不错的参考。

# 基础使用

在开始之前，请确保有可用的 LaTeX 环境，本地有 TeX Live 或者 MikTeX 之类的最好，没有的话用 Overleaf 也可以。另外，当然要装好 Pandoc 啦。

## 入门

Pandoc 的命令行格式是 `pandoc [`<em>options</em>`] [`<em>input-file</em>`]…`。最简单的转换就只需要

```text
pandoc input.md -o output.pdf
```

如果没有 LaTeX 安装，Pandoc 会提示 `pdflatex not found. Please select a different --pdf-engine or install pdflatex`。也可以先生成 LaTeX，再手动编译

```text
pandoc input.md -s -o output.tex
pdflatex output.tex # 或者用 Overleaf
xelatex output.tex  # 中文文档需要 XeLaTeX
```

注意 `-s` 开关等价于 `--standalone`，也就是生成<b>独立</b>的文档。如果不指定，对于 LaTeX 而言，就只输出 `\begin{document}` 和 `\end{document}` 之间的内容；或者说相当于 HTML 的 body 部分。

让我们试一试吧！先写一份最简单的测试文档：

```md
# 标题

This is a test. 这是测试文本。**强调**
```

如果你真的试了，就会发现，不管用 XeLaTeX 还是 pdfLaTeX 编译，结果都只有英文部分。

## 中文支持

怎么办呢？如果你是 LaTeX 老玩家，看一下头部，发现文档类型定义为

```latex
\documentclass[
]{article}
```

这怎么行呢？当然是要用 `ctexart` 啦！CTeX 的中文支持可完善了。然后你可能就会动手各种魔改头部乃至正文了。反正我最早的时候就是这么干的。

不过在我写本文的时候，随便查了一下，发现主要问题其实是没有字体支持。参考了[这篇](https://jdhao.github.io/2017/12/10/pandoc-markdown-with-chinese/)介绍寻找和修改字体，以及[这篇](https://www.cnblogs.com/wodedow/p/13845213.html)介绍 Overleaf 支持的中文字体等，得到解决方案是加上 `-V mainfont="FandolSong"` 选项。这里用的是某种宋体，也可以根据文章自己选择。

实际上，查看 LaTeX 源码，发现这个选项就是加入了

```latex
\setmainfont[]{FandolSong}
```

# 使用技巧

> [Pandoc](wikcnS7cy430EZEY3e6qy8f7rIf)

