---
title: Makefile
slug: Makefile
sidebar_position: 0
---


# Makefile

Author：NA

# What's Makefile?

Makefile 是 Unix / Linux 环境下的 C / C++ 工程管理文件，它规定了项目编译的包括模块、目录、顺序等在内的规则，使得项目可以自动化编译，简化开发流程，提高开发效率。

# Makefile Quick Start

## An Example

在具体介绍 Makefile 之前，我们先来看一个简单的例子，来对 Makefile 有一个简单的认识。

```makefile
edit : main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
    cc -o edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o

main.o : main.c defs.h
    cc -c main.c
kbd.o : kbd.c defs.h command.h
    cc -c kbd.c
command.o : command.c defs.h command.h
    cc -c command.c
display.o : display.c defs.h buffer.h
    cc -c display.c
insert.o : insert.c defs.h buffer.h
    cc -c insert.c
search.o : search.c defs.h buffer.h
    cc -c search.c
files.o : files.c defs.h buffer.h command.h
    cc -c files.c
utils.o : utils.c defs.h
    cc -c utils.c

clean :
    rm edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
```

这个 Makefile 的作用是：将目录下的各 .c 文件先分别编译为对应的 .o 文件，再将这些 .o 文件链接起来得到最后的可执行文件 edit 。具体每一行在做什么我们先不提，这一个 Makefile 文件从整体上可以分为 3 部分，这里分别用一个换行割开。第一个部分表示这个 Makefile 的最终的目标文件，即 edit 。Makefile 默认将文件内的第一个目标文件作为整个 Makefile 的最终目标文件。第二部分表示每一部分的目标文件。最后一部分是一个伪目标文件，它的作用是清除 Makefile 编译得到的所有内容。

在调用 Makefile 时，往往以

```shell
make target
```

的形式调用，即调用对目标文件 target 的生成。如果不写明 target ，则默认生成最终的目标文件。例如，上例中，`make` 会生成可执行文件 edit ，`make main.o` 会生成 main.o 目标文件，而 `make clean` 则会删除目录下所有生成的 .o 文件和可执行文件。

## Makefile Basic Rule

一个最基本的 Makefile 文件由多个以下基本单元构成：

```makefile
targets ... : prerequisites ...
    command
    ...
```

下面对这里出现的三块内容进行解释：

1. targets: 即目标文件，表示这一块单元生成的目标，它可以是一个或多个目标文件或可执行文件，同时也可以是一个标签（伪目标文件），例如 2.1 中提到的 clean 。
2. prerequisites: 即依赖文件，表示生成这一个目标文件依赖的文件，如果目标文件不存在或依赖文件的修改时间比目标文件更新，则生成目标文件。
3. command: 即命令，表示生成此目标文件需要执行的指令（当目标文件为伪目标文件时相当于通过该函数名调用的命令）。

用一句话概括一个 Makefile 的基本单元，即

> 如果 prerequisites 中有至少一个文件比 target 文件要新，则执行 command 定义的命令。

这句话就是 Makefile 文件的核心思想。

现在我们回过头再来看之前的示例，对其内容进行一个详细的解释。

```makefile
edit : main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
    cc -o edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o

main.o : main.c defs.h
    cc -c main.c
kbd.o : kbd.c defs.h command.h
    cc -c kbd.c
command.o : command.c defs.h command.h
    cc -c command.c
display.o : display.c defs.h buffer.h
    cc -c display.c
insert.o : insert.c defs.h buffer.h
    cc -c insert.c
search.o : search.c defs.h buffer.h
    cc -c search.c
files.o : files.c defs.h buffer.h command.h
    cc -c files.c
utils.o : utils.c defs.h
    cc -c utils.c

clean :
    rm edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
```

Makefile 的第一部分描述了这个项目最终的目标文件，即一个 edit 可执行文件。这个文件有这些依赖：main.o, kbd.o, command.o, display.o, insert.o, search.o, files.o, utils.o 。也就是说只要 edit 文件不存在或这些依赖文件里有比 edit 更新的，则（重新）生成 edit 文件。第二部分描述了每一个 .o 文件依赖的 .c, .h 文件以及通过编译器生成该 .o 文件的命令。最后一部分是伪目标 clean ，它不依赖任何文件，执行的命令是删除所有生成的目标文件。

值得一提的是，make 对依赖文件的检查是递归式的。即如果某一目标文件 A 依赖另一目标文件 B ，那么在生成 A 的时候会首先检查依赖文件 B 是否可以更新。

## Use Variables in Makefile

在上例中，我们可以看到，最终目标文件所依赖的目标文件重复出现了三次：

```makefile
edit : main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
    cc -o edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o

...

clean :
    rm edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
```

当然，现在这一个文件本身并不复杂，重复几次好像也没事，但是当项目体积变大， Makefile 变得越来越复杂时，这样的重复可能就开始变得不可接受了——例如要加入一个新的目标文件，如果忘了在其中的某一处修改，可能就会导致严重的问题。为了解决这一问题， Makefile 引入了变量的概念。事实上， Makefile 中的变量仅仅是简单的字符串替换，理解成 C 语言中的宏可能更好。

```makefile
objects = main.o kbd.o command.o display.o \
     insert.o search.o files.o utils.o
```

这里我们定义了一个变量 `objects` 表示所有中间目标文件。有了这个变量后，这三次重复的地方可以简单的改为：

```makefile
edit : $(objects)
    cc -o edit $(objects)

...

clean :
    rm edit $(objects)
```

## Automatic Derivation

按照上面的例子这样写感觉还是有点呆板麻烦，像第二部分中间目标文件的生成，大多都是一个模板写出来的。事实上， Makefile 非常强大，像这样的内容可以进行简写，让它自动推导出 .o 文件依赖的 .c 文件，以及编译该文件的指令。于是，上面的 Makefile 可以修改为这样：

```makefile
objects = main.o kbd.o command.o display.o \
    insert.o search.o files.o utils.o

edit : $(objects)
    cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

clean :
    rm edit $(objects)
```

## Clean Target

在每个 Makefile 中写一个清空目标文件的规则是一个好习惯，这一规则简便的写法是：

```makefile
clean :
    rm target $(objects)
```

也可以稍微多写一点来使它更稳，具有更好的表现：

```makefile
.PHONY : clean
clean :
    -rm target $(objects)
```

这里 `.PHONY` 表示后面的 `clean` 是一个伪目标，而 `rm` 命令前的 `-` 表示，即使删除的某些内容出错了也没关系，继续做其他的事情。

## Include Other Makefiles

在 Makefile 中可以通过 `include` 关键字来引入其他 Makefile 文件，引入的方式是将被引入的文件内容完整替换到引入的位置。`include` 关键字的语法是：

```makefile
include <filename>
```

这里的 `filename` 可以是当前操作系统 Shell 的文件模式（可以包含路径和通配符）。如果有多个引入的文件，可以用空格隔开写在一行。

如果 Makefile 中没有指定文件的路径，那么可以通过 `make` 命令的 `-I`(`--include-dir`) 参数来指定寻找 Makefile 文件的路径。 `make` 寻找的顺序是这样的：

1. 在当前目录寻找
2. 如果有通过参数指定路径，则去该路径下寻找
3. 如果目录 `<prefix>/include` （一般是 `/usr/local/bin` 或 `/usr/include`） 存在，则去该路径寻找

如果有文件无法找到，make 会给出致命信息。与 `rm` 类似，如果想让 make 忽略这些错误，则可以在 `include` 前加上一个 `-` 。

# Advanced Tricks

## Variables

在第二部分我们简单提过变量的使用和定义，即利用 `a = xxx` 的方式定义变量 `a` ，再利用 `$(a)` 的方式展开 `a` （值得一提的是，这里的括号不是必须的，只是为了安全，非常建议在展开变量的时候加上括号）。这里我们对变量的使用再扩展一步。

### Nesting

在 Makefile 中，变量是可以嵌套定义的，或者说，可以用一个变量的值去构造另一个变量。最直观的方式就是利用 `=` 来赋值，例如：

```makefile
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:
    echo $(foo)
```

当执行 `make all` 命令，将会输出 `Huh?` 。可以看到，尽管 bar 的定义在 foo 之后， ugh 的定义在 bar 之后，但它们仍然可以使用这些值来定义。在一些情况下，这种功能无疑是有帮助的。但有时候这种方式也会导致一些问题，例如：

```makefile
A = $(B)
B = $(A)
```

这会使  `make` 陷入无限嵌套展开。当然 `make` 是可以检测到这些问题的，但我们还是希望能够避免它们。于是就有了第二种变量定义的方法，即通过 `:=` 符号。通过这个符号定义的变量只能嵌套使用其之前定义的变量，而不能使用后面的变量。例如：

```makefile
y := $(x) bar
x := foo
```

 这里变量 y 的值是 bar 而非 foo bar，因为 x 的值是无效的。

### Variable Value Substitution

有时候我们可能希望对变量的文件拓展名进行替换，如将 .o 替换为 .c ，这个时候我们就可以使用变量值的替换功能。变量值的替换的格式是 `$(var:a=b)` ，意思是将变量 `var` 中所有以 `a` 结尾的子串结尾的 `a` 替换为 `b` 。例如：

```makefile
foo := a.o b.o c.o
bar := $(foo:.o=.c)
```

这里我们将变量 `foo` 中三个目标文件的 .o 拓展名替换为 .c ，得到了 `bar` 变量，也就是说， `bar` 变量的值为 `a.c b.c c.c` 。

### Append Variable Value

Makefile 中可以使用 `+=` 对变量的值进行追加，类似对数组的插入，例如：

```makefile
objects = main.o foo.o bar.o utils.o
objects += another.o
```

经过这样的操作后， `objects` 的值为 `main.o foo.o bar.o utils.o another.o` 。

追加操作符等同于以下的操作，但更加简洁：

```makefile
objects = main.o foo.o bar.o utils.o
objects = $(objects) another.o
```

如果变量在追加之前没有定义过，那么这个追加符号的效果等同于 `=` 。如果之前有定义过，那么它会继承之前的操作符。例如如果之前通过 `=` 进行定义，那么追加使用的赋值符号也是 `=` ；如果之前通过 `:=` 进行定义，那么追加使用的赋值符号也是 `:=` 。

### Multiline Variable

有没有一种方法能够把重复率非常高的一系列指令打包起来，作为一个“函数”来使用呢？答案是有的。通过 `define` 关键词，我们可以定义多行变量。当然除了命令，这里的多行内容也可以是简单的文本等。

`define` 操作符后跟的是变量的名字，随后另起一行开始多行的内容，最后以一行 `endef` 关键词结束。例如：

```makefile
define two-lines
echo foo
echo $(bar)
endef
```

这里就定义了一个两行的变量 `two-lines` 。当执行该变量时，会输出两行文本信息。

## Conditional Judgment

在 Makefile 中也可以通过书写条件判断语句，来使 `make` 在运行时根据不同情况执行不同的分支。一个最基本的条件判断就是比较两个量是否相等，例如判断某个变量是否等于某个常量。这种情况下，可以这样写：

```makefile
ifeq ($(var), const)
    command1
else
    command2
endif
```

即如果变量 `var` 的值等于常量 `const` 则执行 command1， 否则执行 command2；当然这里的 else 部分是可以省略的，即仅当相等时执行，不相等则忽略。值得一提的是这里的 `ifeq` , `else` , `endif` 前面不能加 tab 键，否则会被识别为 command 部分的内容，而不是 `make` 的条件判断。

除了 `ifeq` 关键词，这样的条件判断关键词还有三个：

1. `ifneq`: 与 `ifeq` 相反，这个关键词用于判断是否不相等。
2. `ifdef`: 这一关键词用于判断跟在其后的变量是否为空。注意，`ifdef` 只会测试一个变量是否有值，而不会在这里进行变量的展开。例如：

```makefile
foo = 
ifdef foo
    blank = no
else
    blank = yes
endif
```

这种情况下，`blank` 的值为 yes 。而如果像这样：

```makefile
bar =
foo = $(bar)
ifdef foo
    blank = no
else
    blank = yes
endif
```

那么 `blank` 的值为 no ，原因是 `foo` 是有值的，虽然这个值展开后为空。

1. `ifndef`：与之前类似，是 `ifdef` 的相反的意思。

## Functions

在 Makefile 中可以通过函数来对常量和变量进行处理，从而更加灵活地应用它们。函数的调用在形式上和变量很相似，也是通过 `$` 来识别，其语法如下：

$(&lt;function&gt; &lt;arguments&gt;)

这里 `<function>` 为函数名， `<arguments>` 为函数参数，用逗号分隔。

下面简单介绍几个 Makefile 支持的函数，更多的可以参考[官方文档](https://www.gnu.org/software/make/manual/make.html#Functions) 。

### subst

```makefile
$(subst <from>,<to>,<text>)
```

- 功能： 把字符串 &lt;text&gt; 中的 &lt;from&gt; 字符串替换成 &lt;to&gt; 。
- 返回： 被替换后的字符串。

### patsubst

```makefile
$(patsubst <pattern>,<replacement>,<text>)
```

- 功能： 查找 &lt;text&gt; 中的单词（以“空格”、“Tab”或“换行符”分隔）是否符合 &lt;pattern&gt; 模式，如果符合则用 &lt;replacement&gt; 将其替换。这里的 &lt;pattern&gt; 可以包含通配符 `%` ，表示任意长度的字符串。如果 &lt;replacement&gt; 中也包含 `%` ，则 &lt;replacement&gt; 中的这个 `%` 将是 &lt;pattern&gt; 中的那个 `%` 所代表的字符串。
- 返回： 被替换后的字符串。

### filter

```makefile
$(filter <pattern...>,<text>)
```

- 功能： 保留 &lt;text&gt; 中符合 &lt;pattern&gt; 模式的字符串，可以有多个模式。
- 返回： 符合 &lt;pattern&gt; 模式的字符串。

### sort

```makefile
$(sort <list>)
```

- 功能： 给字符串 &lt;list&gt; 中的单词去重并按升序排列。
- 返回：排序后的字符串。

### dir

```makefile
$(dir <names...>)
```

- 功能： 从文件名序列 &lt;names&gt; 中取出目录部分。
- 返回： 各文件的目录。

### notdir

```makefile
$(notdir <names...>)
```

- 功能： 从文件名序列 &lt;names&gt; 中取出文件名部分。
- 返回： 各文件的文件名。

### suffix

```makefile
$(suffix <names...>)
```

- 功能： 从文件名序列 &lt;names&gt; 中取出后缀部分。
- 返回： 各文件的后缀名。

### basename

```makefile
$(basename <names...>)
```

- 功能： 从文件名序列 &lt;names&gt; 中取出前缀部分。
- 返回： 各文件的前缀。

