---
title: Perl
slug: Perl
sidebar_position: 8
---


# Perl

Author：张立冬

## Why Perl

作为一门在 `TIOBE` 上已经掉到了no.23的语言，Perl似乎已经被时代抛弃（悲）。然而There is no silver bullet，Perl也有它独特的地方，并且在一些领域仍然有着优势。

- Perl代码实现同一目的使用的方法可以千差万别，一些方法可以做到代码量极少，编写时间可很短，随之而来的是代码的可读性会很差。同时Perl的性能也较优，有这些特点作为脚本语言很合适（相关权衡见下）
- Perl内嵌了正则的功能，原生兼容Unicode，在语言设计中有一些利于文件/字符串操作的考量，因此在处理文件/信息方面十分好用。（见下）
- Perl的变量设计独特，对于同一变量有时需要考虑上下文解释其含义（类似重载），在编写代码中体验和奇妙。（见下）
- 和编程先学C类似，Perl足够底层，但也可拓展，对上兼容，可以搞网络、数据库、进程。对于搞不懂http request，go routine，只能差不多用一下的新手（并未卖弱），提供了一个从底层剖析理解原理的机会。

## Perl安装与配置

[Perl Download - www.perl.org](https://www.perl.org/get.html)

## Perl基本语法

### Perl数据类型

Perl基础数据类型有3种，hash，数组和标量

[参考网站：Perl 数据类型](https://www.runoob.com/perl/perl-data-types.html)

- <b>标量</b>：标量是 Perl 语言中最简单的一种数据类型。这种数据类型的变量可以是数字，字符串，浮点数，不作严格的区分。在使用时在变量的名字前面加上一个 <b>$</b>，表示是标量。例如：

```perl
$myfirst=123;　    #数字123　
$mysecond="123";   #字符串123
```

- <b>数组</b>：数组变量以字符 <b>@</b> 开头，索引从 0 开始，如：

```perl
@arr=(1,2,3)
```

值得一提的是这个数组更像是集合，不限制内容的严格类型（本来也没定义过虽然）

- <b>哈希：</b>哈希是一个无序的 <b>key/value</b> 对集合。可以使用键作为下标获取值。哈希变量以字符 <b>%</b> 开头

```perl
%h=('a'=>1,'b'=>2);
```

#### Perl变量

- 变量是存储在内存中的数据，创建一个变量即会在内存上开辟一个空间。
- 解释器会根据变量的类型来决定其在内存中的存储空间，因此你可以为变量分配不同的数据类型，如整型、浮点型、字符串等。
- <b>Perl 为每个变量类型设置了独立的命令空间，所以不同类型的变量可以使用相同的名称，你不用担心会发生冲突。例如 $foo 和 @foo 是两个不同的变量。</b>

#### Perl标量

- 标量是一个简单的数据单元。
- 标量可以是一个整数，浮点数，字符，字符串，段落或者一个完整的网页。[引用网站](https://www.runoob.com/perl/perl-scalars.html)

```perl
#使用$加变量名可以创建一个普通变量
$a = 10;#见数字标量
```

##### 数字标量

- 数字标量可以是浮点数、整数（包括常见进制）

##### 字符串标量

- 使用双引号引用的字符串变量，其中的变量会转化成相应的变量值。
- 例如：

```perl
#!/usr/bin/perl
 
$var = "字符串标量 - 菜鸟教程!";
$quote = '我在单引号内 - $var';
$double = "我在双引号内 - $var";
$escape = "转义字符使用 -\tHello, World!";
 
print "var = $var\n";
print "quote = $quote\n";
print "double = $double\n";
print "escape = $escape\n";
```

```perl
var = 字符串标量 - 菜鸟教程!
quote = 我在单引号内 - $var
double = 我在双引号内 - 字符串标量 - 菜鸟教程!
escape = 转义字符使用 -    Hello, World!
```

Perl语言中常用的一些转义字符如下表所示：

可以看到存在一些直接操作字符串改变大小写，加横线的转义字符，方便的对字符串进行简单操作。

##### Here文档标量(来源[Perl 基础语法 | 菜鸟教程](https://www.runoob.com/perl/perl-syntax.html))

Here文档又称作heredoc、hereis、here-字串或here-脚本，是一种在命令行shell（如sh、csh、ksh、bash、PowerShell和zsh）和程序语言（像Perl、PHP、Python和Ruby）里定义一个字串的方法。

使用概述：

- 1.必须后接分号，否则编译通不过。
- 2.END可以用任意其它字符代替，只需保证结束标识与开始标识一致。
- 3.结束标识必须顶格独自占一行(即必须从行首开始，前后不能衔接任何空白和字符)。
- 4.开始标识可以不带引号号或带单双引号，不带引号与带双引号效果一致，解释内嵌的变量和转义符号，带单引号则不解释内嵌的变量和转义符号。
- 5.当内容需要内嵌引号（单引号或双引号）时，不需要加转义符，本身对单双引号转义。

#### Perl数组变量

数组 @ 开始。

要访问数组的变量，可以使用美元符号($)+变量名，并指定下标来访问，实例如下所示：

```perl
#! C:\Users\86198\AppData\Local\ActiveState\cache\cb393990\bin\perl.exe
@MixArray = ( "Vista", "is", 0 );
print $MixArray[0] . " " . $MixArray[1] . " " . $MixArray[2] . "!" ."\n";
```

![](/assets/Fzz6bJUCeoXxeaxo4g0ctdTCnQd.png)

###### 快速定义数组

可以使用 qw// 运算符快速定义数组，如

```perl
@sennpa = qw/1 1 4 5 1 4/;
print $sennpa[3];
#result:  5
```

###### 数组相关函数

- scalar 大小
- push  末尾加
- pop 末尾减
- shift 头减（同时更改索引）
- unshift 头加（同时更改索引）
- splice （数组元素替换）
- split （字符串分隔）
- join （数组转字符串）
- sort （排序，类似qsort）

#### Perl Hash变量

哈希是一个 <b>key/value</b> 对的集合。

哈希 % 开始。

如果要访问哈希值，可以使用 <b>$ + {key}</b> 格式来访问：

```perl
#! C:\Users\86198\AppData\Local\ActiveState\cache\cb393990\bin\perl.exe
%Record01 = ( "Vista", 0, "bluecat" , 1, "01gg", 0.5);
print "Vista is $Record01{'Vista'}\n";
print "bluecat is $Record01{'bluecat'}\n";
print "01gg is $Record01{'01gg'}\n";
```

其他方法

```perl
#使用=>指定简直关系
%data = ('google'=>'google.com', 'runoob'=>'runoob.com', 'taobao'=>'taobao.com');
```

![](/assets/P5UAbcKdPonj2jxQh66cHwQHnr7.png)

hash相关函数

- keys
- values
- exists
- delete

#### 变量上下文

暂略

### Perl条件语句

和C不同的：

在条件判断中，undef， ’0‘， ”“， 空list()为false

同样可以使用 not 来表示 c中的 ！（逻辑反运算）

<b>其余因为和c差不多，而且比较占篇幅。就直接粘链接了。</b>

[Perl 条件语句](https://www.runoob.com/perl/perl-conditions.html)

### Perl循环语句

基本语法略：[Perl 循环](https://www.runoob.com/perl/perl-loops.html)

### Perl正则

关于语法部分，不多加赘述，和之前学过的正则还是稍有不同的qwq，有些地方方便很多，比如替换

[perlre - Perl regular expressions - Perldoc Browser](https://perldoc.perl.org/perlre#Regular-Expressions)

### Perl一些非基础语法的展示

#### CPAN:Perl的现成库

Perl网络（srds感觉不是它该干的事）

```perl
#!/usr/bin/env perl
use Mojolicious::Lite -signatures;            #看过清新的Perl的都明白，这是一个模块导入语法

get '/' => sub ($$c) {                         #get代指http的GET方法，如果用POST方法，则可以用‘post’。
                                              #'/'是http路径，举例，代指‘http://127.0.0.1/’。当用'/test'时代指'http://127.0.0.1/test'
  $$c->render(text => 'Hello World!');         #这是$c的固定方法，主要用来生成http服务的返回，'text'关键字代指返回文本格式。
};

app->start;                                   #启动http应用
```

事实上，不使用CPAN也有的搞（肯定的），只不过长

## 总结

perl虽然有点奇怪，不过现在在文字处理（因为用perl搞简单）领域还在用，在编写这类小脚本的时候可以试一试，其他感觉不是很推荐。虽然go作为新兴语言在使用是时候有时被吐槽很多，但活力不是Perl能比的，Perl和一些被设计就是方便写web的语言在这些方面肯定没得可比。

