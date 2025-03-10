---
title: Latex Packages
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-q8ruwyobvi82kukykutco0e5nqb-zdcowmsszilykmkzbn5czmlen2b-d72iwagnsitxylkaytecucphnnh-glykw6brbilwhmkorngcc9oeneg-glykw6
sidebar_position: 0
---


# Latex Packages

Author：周楷程

# 为什么介绍宏包

LaTeX 的功能很强大，但如果要充分利用这些功能，没有宏包的帮助是很难的。这里为大家列举了一些笔者自己常用的宏包（下文中每个宏包都用过若干次）以及他们的文档、简介和我自己的一些 tips。希望大家爱上 LaTeX，学会更方便地使用 LaTeX！

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>对于部分宏包，笔者也没有用过他们的全部功能（因为用不上），所以如果大家<del>不幸</del>需要用一些复杂的功能，可以点击查看文档！</p>
</div>

# 可能对你有用的宏包

## geometry

<b>文档：</b>https://texdoc.org/serve/geometry.pdf/0

<b>简介：</b>用于设置纸张布局（大小，边距……）

```latex
\usepackage[a4paper, hmargin=2cm]{geometry}
\geometry{top=1.1in}
```

预设的纸张大小有 a3paper, a4paper, a5paper, b5paper, letterpaper...

<img src="/assets/XWIjbEjfDoJzxExH74xcxgubn6d.png" src-width="430" src-height="488" align="center"/>

可以修改 body, offset 等各个参数，使用指令 `\geometry{x=y}` 即可。

## lastpage

<b>文档：</b>https://texdoc.org/serve/lastpage.pdf/0

<b>简介：</b>获取最后一页的链接；获取文档页数

```latex
\usepackage{lastpage} 

Page \thepage of \pageref{LastPage}
```

<b>备注：</b>当某次修改使文档页数发生改变时，`\thepage` 并不会立即随之改变，需要再编译一次。

## fancyhdr

<b>文档：</b>https://texdoc.org/serve/fancyhdr.pdf/0

<b>简介：</b>配置页眉、页脚。

```latex
\usepackage{fancyhdr}

\pagestyle{fancy}
\fancyhead[L,R]{}
\fancyhead[C]{\@title}
\fancyfoot[L]{Dr.Knuth}
\fancyfoot[C]{}
\fancyfoot[R]{\thepage / \pageref{LastPage}}
```

`\fancyheat[X]{content}` 就是把页眉的 X 位置（可以是 L, C, R) 设置为 content 内容。

页脚同理。

`\thispagestyle{empty}` 可以去掉页眉页脚。

如果想要对奇偶页分开设置，在 L, C, R 后面加上 O 或 E 即可，如：

```latex
\fancyhead[LE, RO]{...}
\fancyhead[CO]{...}
\fancyfoot[LE, RO]{...}
```

使用 `renewcommand` 可以修改一些参数，如页眉页脚距离、分割线粗细等等。

`\renewcommand{\headrulewidth}{2pt}`

在默认的 fancy style 下，页眉会按照章节变化。如果想要自定义这些变化，可以查询文档。

<b>备注：</b>它有很多高级功能，但是我没有用过也不太搞得懂，有需要的话大家可以查阅文档。

## hyperref

<b>文档：</b>https://texdoc.org/serve/hyperref.pdf/0

<b>简介：</b>超链接；生成文章书签

用法比较简单：

```latex
% 链接
\url{https://www.baidu.com}
\href{https://www.google.com}{Google}

% 文档内交叉引用
\hypertarget{sampletarget}{[HYPERREF]} [HYPERREF]
\hyperlink{sampletarget}{> HIT ME ! <}
```

可以设置超链接的文字样式：

```latex
\hypersetup{
    CJKbookmarks=true,
    colorlinks=true,
    linkcolor=orange,
    anchorcolor=red,
    urlcolor=blue,
    citecolor=cyan,
}
```

<b>备注：</b>有时，如果章节名存在汉字，生成的书签可能会乱码……

## graphicx

<b>文档：</b>https://texdoc.org/serve/graphicx.pdf/0

<b>简介：</b>更方便地在文档中添加图片

```latex
\usepackage{graphicx}
\includegraphics[width=3cm]{xxx.png}
\includegraphics[height=0.7in]{xxx.jpg}
\includegraphics[width=\textwidth]{xxx.eps}
```

可以设定各种参数（width, height, angle, scale, clip 等)，也能接受各种格式的图片。

<b>备注：</b>参数挺多的，但基本上会用到的就是宽高了。`\textwidth` 前面还可以加系数，这样就可以插入一个一半文章宽度的图片。

## xcolor

<b>文档：</b>https://texdoc.org/serve/xcolor.pdf/0

<b>简介：</b>扩展颜色宏包，可以设置文字颜色、背景颜色、边框颜色，支持预设的英文名、RGB、CMYK、波长等数值。

```latex
% 字体颜色
\color{NavyBlue}{NavyBlue}
\color{Crimson}{Crimson}

% 背景颜色
\colorbox{PeachPuff}{PeachPuff}
% 带边框
\fcolorbox{SlateBlue}{Coral}{SlateBlue + Coral}

% 定义新颜色
\definecolor{myblue}{rgb}{0.12, 0.23, 0.89}
\definecolor{myred}{RGB}{188, 21, 24}
\definecolor{mycyan}{cmyk}{0.99, 0.1, 0.11, 0}
\definecolor{mygreen}{HTML}{79A245}

% 混合颜色
\color{red!50!green}{red+green}
\color{red!25!blue}{red+blue}
```

<b>备注：</b>使用 xcolor 宏包画一个光谱图：

<img src="/assets/SONUbKEgpoG9oaxgNZwcChJMnnc.png" src-width="1208" src-height="196" align="center"/>

## listings

<b>文档：</b>https://texdoc.org/serve/listings.pdf/0

<b>简介：</b>代码块样式

```latex
\usepackage{listings}
\lstset{language=c++,
    basicstyle=\fontspec{Consolas},
    tabsize=4}
\begin{lstlisting}
inline int gcd(int a, int b) {
    return b==0 ? a : gcd(b, a % b)
}
\end{lstlisting}
```

效果如图

<img src="/assets/CHYgbSr0bo6J0exGJwkcaF2rnvb.png" src-width="627" src-height="124" align="center"/>

<b>备注：</b>功能性一般！还没有默认高亮。建议用下文的 minted

## minted

<b>文档：</b>https://texdoc.org/serve/minted.pdf/0

<b>简介：</b>依赖 Pygments 提供语法高亮。举个例子

```latex
\begin{minted}{python}
def sum(n):
    p = range(1, n + 1)
    return sum(p)
\end{minted}
```

<img src="/assets/IGf8blFlloVn8GxaGZ4c3PBonPf.png" src-width="380" src-height="124" align="center"/>

同时可以设置是否显示行号、缩进长度、颜色主题，也可以通过 `mathescape` 参数在代码段中的注释部分检测并渲染 LaTeX 数学公式。

<b>备注：</b>功能比 listings 强大，但依赖于 Pygments，配置起来可能需要一些功夫。在 beamer 中使用 minted 时需要设置那一页为 fragile。

## fontspec

<b>文档：</b>https://texdoc.org/serve/fontspec.pdf/0

<b>简介：</b>为 XeLaTeX 和 LuaLaTeX 提供 OpenType 字体支持。

```latex
\usepackage{fontspec}

% 设置 CJK 字体族
\newCJKfontfamily\kyoukasho{ A-OTF-KyokaICAPro-Regular.otf }
\newCJKfontfamily\lyra{FOT-LyraStd-DB.otf}
% 非 CJK 字体族
\newfontfamily\JBMono{JetBrainsMono-Regular.ttf}

% \fontname 即可使用该字体渲染
{\kyoukasho 何光年でも この歌を口ずさみながら}

% 支持 OpenType 的 ligature
{\JBMono 1<=2>-3!=4==5 procedure (<->|-+-|?=)}

% \fontsize{}{}\selectfont 可以设置文字大小
{\CJKfamily{lyra}\fontsize{18pt}{24pt}\selectfont 季節は次々生き返る}
```

<b>备注：</b>Windows 用户可以通过 cmd 的 `fc-list` 命令打印系统字体的信息，在设置字体时要写对字体的名字；当然，也可以通过文件路径获取字体。

## beamer

<b>文档：</b>https://mirrors.bfsu.edu.cn/CTAN/macros/latex/contrib/beamer/doc/beameruserguide.pdf

<b>简介：</b>使用 LaTeX 制作演示幻灯片

用法其实很简单

```latex
\documentclass{beamer}
\usetheme{California} % 设置幻灯片配色和样式主题

% 每一页用 \begin{frame} \end{frame} 括起来
\begin{frame}{Title}
First sentence...
\pause     % 用 \pause 表示有一页停顿
Second sentence...
\end{frame}
```

预设的主题列表：https://hartwork.org/beamer-theme-matrix/

同时也支持自定义各种细节。

<b>备注：</b>动画？pdf 怎么能支持动画呢？但是 beamer 真的很好看！！！

## makecell

<b>文档：</b>https://texdoc.org/serve/makecell.pdf/0

<b>简介：</b>支持定义表格内单元格的布局。

普通的表格不支持单元格内换行，makecell 可以帮你实现；

普通的表格不支持单元格单独对齐（l, c, r, b 等等），makecell 可以帮你实现：

（单元格中使用 `\\` 换行）

```latex
\begin{tabular}{|c|c|c|}
\hline
A & B & \makecell[{{p{3cm}}}]{C} \\
\hline
\makecell[r]{2333 \\ 344444 \\ 455} & D & E \\
\hline
\end{tabular}
```

效果：

<img src="/assets/ADRxbFGhTo5ZiXxnYIPcKWq3nze.png" src-width="457" src-height="170" align="center"/>

可以这样定义单元格宽度：

```latex
\makecell*[{{p{3cm}}}] {Cell long text with predefined width}
```

<b>备注：</b>用了这个代码会变长好多！写表格时代码要注意多对齐，别把自己写混了。

## multirow

<b>文档：</b>https://texdoc.org/serve/multirow.pdf/0

<b>简介：</b>支持跨行跨列的单元格。

主要用法（跨行单元格）：

```latex
\multirow[vpos]{nrows}{width}{text}
```

- `vpos`：单元格中内容在垂直方向的位置（对齐方式）
- `nrows`：横跨的行数
- `width`：宽度。用 `*` 缺省
- `text`：内容。用 `\\` 换行

```latex
\begin{tabular}{|p{3cm}|c|}
\hline
\multirow[b]{4}*{Common text}
& Column g2a \\ & Column g2b \\
& Column g2c \\ & Column g2d \\
\hline
\multirow{3}*{\makecell[c]{Common \\ text}}
& Column g2a \\ \cline{2-2}
& Column g2b \\ \cline{2-2}
& Column g2c \\ \hline
\end{tabular}
```

其中，`cline` 和 `hline` 一样是分割线，但是 `cline` 可以指定从第几列画到第几列，`hline` 是直接画整行。

<img src="/assets/QORfbRWuEo5GfNxmxw3cgKKpnee.png" src-width="463" src-height="277" align="center"/>

同样，还有跨列的单元格：

```latex
\multicolumn{2}{|c|}{A multicolumn cell}
```

跨列的简单很多，注明跨几列、怎么对齐即可。

<b>备注：</b>很有用的宏包，但是用了之后表格那段代码更不能看了

## multicol

<b>文档：</b>https://texdoc.org/serve/multicol.pdf/0

<b>简介：</b>为文档提供分栏的环境。

```latex
\begin{multicols}{3}
    ...
\end{multicols}
```

用法简单，在这一段环境中的文字都会被自动分入三栏。他会自动计算他认为最合适的分割位置。

<b>备注：</b>首先，multirow 是表格跨行跨列！multicol 是文章多栏！别记混咯！

其次，如果遇到一些问题，比如想要自定义分割位置，或者分栏遇上换页，等等，记得多使用搜索引擎。

## amsmath

<b>文档：</b>https://texdoc.org/serve/amsmath.pdf/0

<b>简介：</b>数学公式增强包。

它提供了一些环境，包括 equation, align, gather, alignat, multiline, flalign, split 等等。

笔者大多用的是 align 和 equation，其他环境完全没用过。align 可以支持公示标号、多行公式、多种对齐。

几个例子（实际样式是用的飞书自带渲染，和本地渲染效果可能存在不同）：

```latex
\begin{equation} % 带标号
    -\frac{\hbar^2}{2\mu}\nabla^2\Psi+U\Psi=E\Psi
\end{equation}

\begin{equation*} % 不带标号
    i\hbar\frac{d}{dt}\ket{\psi}=\hat{H}\ket{\psi}
\end{equation*}
```

$$
\begin{equation} % 带标号
    -\frac{\hbar^2}{2\mu}\nabla^2\Psi+U\Psi=E\Psi
\end{equation}
\\
\begin{equation*} % 不带标号
    i\hbar\frac{d}{dt}\ket{\psi}=\hat{H}\ket{\psi}
\end{equation*}$$

```latex
\begin{equation}
    \begin{split}        % ↓ 用 & 符号对齐
        \oint_L H \cdot dl & = I_0 +
        \iint_S \frac{\partial D}{\partial t}\cdot dS \\
        \oint_L E \cdot dl = -\iint_S &
        \frac{\partial B}{\partial t}\cdot dS
    \end{split}
\end{equation}
```

$$
\begin{equation}
    \begin{split}
        \oint_L H \cdot dl & = I_0 +
        \iint_S \frac{\partial D}{\partial t}\cdot dS \\
        \oint_L E \cdot dl = -\iint_S &
        \frac{\partial B}{\partial t}\cdot dS
    \end{split}
\end{equation}$$

```latex
% 递等式
\begin{align}
    \varphi &= \prod_{i=1}^s \varphi(p_i^{k_i}) & 1 \\
    &=\prod_{i=1}^s (p_i-1) \times p_i^{k_i-1} & 2 \\
    &=n\prod_{i=1}^s \left(1-\frac{1}{p_i}\right) & 3
\end{align}
```

$$\begin{align}
    \varphi &= \prod_{i=1}^s \varphi(p_i^{k_i}) & 1 \\
    &=\prod_{i=1}^s (p_i-1) \times p_i^{k_i-1} & 2 \\
    &=n\prod_{i=1}^s \left(1-\frac{1}{p_i}\right) & 3
\end{align}$$

```latex
% 大括号
\left(\frac{n}{p}\right) =
    \begin{cases}
    1, & p \nmid n \text{ and }
        \exists x>0, x^2 \equiv n \pmod{p} \\
    -1, & p \nmid n \text{ and }
        \forall x>0, x^2 \not\equiv n \pmod{p} \\
    0, & p \mid n
\end{cases}
```

$$
\left(\frac{n}{p}\right) =
    \begin{cases}
    1, & p \nmid n \text{ and }
        \exists x>0, x^2 \equiv n \pmod{p} \\
    -1, & p \nmid n \text{ and }
        \forall x>0, x^2 \not\equiv n \pmod{p} \\
    0, & p \mid n
\end{cases}$$

<b>备注：</b>写公式必备！

## algorithmicx

<b>文档：</b>https://texdoc.org/serve/algorithmicx.pdf/0

<b>简介：</b>伪代码。

```latex
\begin{algorithm}
    \caption{冒泡排序}
    \begin{algorithmic}[1]
        \Require 一个长度为 $n$ 的排列 $P$
        \Ensure $P$ 排序后的结果。
        \Function{Sort}{$n, F$}
            \While{$P$ 无序}
                \State $x \gets $ \Call{Rand}{$1, n$}
                \State $y \gets $ \Call{Rand}{$1, n$}
                \State \Call{Swap}{$P[x], P[y]$}
            \EndWhile
        \State \Return $P$
        \EndFunction
    \end{algorithmic}
\end{algorithm}
```

<img src="/assets/BjuYbygN2owbtex625bcTcwRn5c.png" src-width="971" src-height="531" align="center"/>

- `\Function`：函数
- `\While`，`\EndWhile`：while 块
- `\If`，`\ElsIf`，`\Else`，`\EndIf`：if 块
- `\For`，`\ForAll`，`\EndFor`：for 块
- `\State`：普通语句前面要加这个
- `\Call`：调用函数（这个前面也要加 `\State`！）
- 其他大部分地方都直接写数学符号/公式即可。

<b>备注：</b>如果你不喜欢它的伪代码风格，或许可以自定义？或者还是换个宏包吧。

## Ti<em>k</em>Z

文档：https://www.bu.edu/math/files/2013/08/tikzpgfmanual.pdf

简介：在 LaTeX 中画图，功能十分强大，但相对应的学习成本也较高。

可以支持：

- 3D 绘画
- 状态机图、图灵机图
- 坐标系
- 日历
- 逻辑电路、物理电路
- 矩阵
- 思维导图
- 数、图等数据结构
- 各种图形
- ……

举几个例子：

<img src="/assets/BGnDboKfNotqZYxGktxcSFFknag.png" src-width="800" src-height="783" align="center"/>

<img src="/assets/F9o5bjRONoufxXxZZIYcZOHKnJd.png" src-width="800" src-height="779" align="center"/>

<img src="/assets/ZvldbIJOAoXLubxxFNzc0iuBnlg.png" src-width="1024" src-height="783" align="center"/>

<img src="/assets/Q3gabg1vvo1tkfxYCn1cQZFcnvd.png" src-width="1920" src-height="1061" align="center"/>

<img src="/assets/QAH1bLRBGoNq9wx552hcN9HKnLb.png" src-width="1280" src-height="827" align="center"/>

<img src="/assets/Z7oLbOKzYoLERsxCzOxcFBqnnvg.png" src-width="800" src-height="800" align="center"/>

上面这些都是网上大佬的作品。

为了证明这个其实没那么复杂，放几张我自己画的：

<img src="/assets/RsYxbHwhJoeUmMxmMipclNS6nzf.png" src-width="439" src-height="385" align="center"/>

<img src="/assets/NGVVbiBqJoLWJHxm7PvcOXqmngg.png" src-width="442" src-height="417" align="center"/>

<img src="/assets/Ercebtds2otRj9xXki9ctxASnbe.png" src-width="462" src-height="544" align="center"/>

备注：还在等什么？快来跟我一起用 LaTeX，Ti<em>k</em>Z，PGF，来用代码画画吧！

其他 Ti<em>k</em>Z 作品：https://ti<em>k</em>z.net/

## BibTeX

<b>文档：</b>https://texdoc.org/serve/bibtex.pdf/0

<b>简介：</b>配置参考文献的工具。

使用方法：

1. 创建一个 *.bib 文件，在里面写入所有参考文献的信息。格式如下：/

```latex
@article{cochran1967fast,
    title={What is the fast Fourier transform?},
    author={Cochran, William T and Cooley, ...},
    journal={Proceedings of the IEEE},
    volume={55},
    number={10},
    pages={1664--1674},
    year={1967},
    publisher={IEEE}
}
```

1. 在文章中引用这些文献：

```latex
The fast Fourier transform is a computational tool which facilitates signal analysis such as power spectrum analysis and filter simulation by means of digital computers. ~\cite{cochran1967fast}
```

1. 在文章末尾使用 `\biliography{you_bib_filename}{}` 放置“参考文献”这一节，可以使用 `\biliographystyle{which_style}` 来设置这些文献的排序方式。
2. 编译！需要编译 4 次：

```latex
pdflatex thesis.tex
bibtex thesis.tex
pdflatex thesis.tex
pdflatex thesis.tex
```

<b>备注：BibTeX </b>可以帮你迅速处理文献的引用，帮你编号并创建超链接。

