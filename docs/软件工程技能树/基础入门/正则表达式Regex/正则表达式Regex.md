---
title: 正则表达式 Regex
slug: 正则表达式 Regex
sidebar_position: 5
---


# 正则表达式 Regex

Author：潘瑞哲

> 推荐在电脑端浏览以获得最佳阅读体验。

正则表达式使用单个字符串来描述、匹配、替换一系列匹配某个句法规则的字符串。在很多语言中，正则语言字面量可以被放置在两个斜杠中间的部分。例如，`/abc/` 表示内容为 `abc` 的正则表达式。

最初的正则表达式出现于理论计算机科学的自动控制理论和形式化语言理论中。正则表达式对应于乔姆斯基层级的类型 - 3 文法（Chomsky Type-3，等价于 Finite Automaton），但少数编程语言或其相关库（例如 PCRE、C#）中实现的正则表达式的表达能力是乔姆斯基层级中类型 - 3 文法的超集。

通常来讲，正则表达式无法完成很大规模的匹配任务。例如，单个正则表达式无法匹配所有合法的 HTML 代码，这是因为 HTML 在 Parsing 层面属于 Contex-Free Grammar（假如不考虑元素的 id 必须 unique 等限制），对应 Chomsky Type-2 文法。根据定义，Chomsky Type-2 文法是 Chomsky Type-3（有限自动机/正则语言/正则表达式）的超集，因此正则表达式无法匹配所有的 HTML 代码。

## 1 Atom 原子

Atom 表示正则中的最小不可分割单位。通常而言，正则表达式的 Atom 为单个字符：

1. 普通字符，例如 <em>a b c 0 1 2 汉 字</em> 等。
2. 如果要输入有特殊含义的符号，可能需要经过反斜杠转义：`\(`，`\[` 等。
3. 如果要通过特殊符号来表示特殊的含义，同样需要经过转义：`\n`，`\r`，`\t`等。

本质上，它们都是在表示单个字符。正则表达式的最小匹配粒度也是单个字符。

## 2 Character Classes 字符类

Character classes match a character from a specific set. There are a number of predefined character classes and you can also define your own sets.

### 2.1 Character Set 字符集

Syntax: `[ABC]`

Match: A or B or C

### 2.2 Negated Set 字符补集

Syntax: `[^ABC]`

Match: 任何不是 A 且不是 B 且不是 C 的字符

### 2.3 Range 字符范围

Syntax: `[A-D]` `[0-9]`

Match: A or B or C or D, 0 到 9 总共十个数字

### 2.4 Predefined Character Set 预定义的字符集

- `\w` word，匹配所有 alphanumberic 和 underscore，等价于 `[A-Za-z0-9_]`。
- `\d` numeric，等价于 `[0-9]`。
- `\s` whitespaces，匹配 `\t`、空格、`\n` 等空白符。
- `.` dot，匹配非 line break 的任意字符。等价于 `[^\r\n]`。
- 还有 `\p{...}`，对应 Unicode Category / Script。

以及它们的补集（记忆方式：预定义的字符，更换成大写形式）

- `\W`
- `\D`
- `\S`
- `[\r\n]`
- `\P{...}`

以上内容可以组合使用。

- 例：`[A-Za-z.\.\d]` 匹配 A-Z 或 a-z 或 `[^\r\n]` 或英文句号或 0-9。不过，`.` 也就是 `[^\r\n]` 其实包含了剩下的几个 character set，因此本例中的正则表达式的匹配范围和 `.` 相同。
- 例：`[\s\S]` 可以匹配任意字符。实际上，`[\d\D]`、`[\w\W]` 也可以，但一般约定俗成用于匹配任意字符的还是 `[\s\S]`。

#### 2.4.1 Unicode Category / Script

首先，你需要参考 https://www.regular-expressions.info/unicode.html#category 和 https://www.regular-expressions.info/unicode.html#script，查询各种 Category 的含义和匹配范围。随后，通过下述方法来使用它们：

Syntax: `\p{Category名字}` 或 `\p{sc=Script名字}`

例如，`\p{sc=Han}` 匹配 Unicode Han Script 中的全部文字。

并非所有语言都支持这一特性；在 JavaScript 中使用时，需要给 RegExp 指定 `u` Flag，详见 [Unicode: flag "u" and class \p{...}](https://javascript.info/regexp-unicode)。

> 在某些语言中使用 Script 时，无需指定 `sc=`。

```js
> /\p{sc=Han}/u.test("啥")
true
> /\p{sc=Han}/u.test("y")
false
> /\p{Number}/u.test("1️⃣")  // 匹配 Unicode Number Category 中的所有字符
true
```

## 3 Group 组

Groups allow you to combine a sequence of tokens to operate on them together.

### 3.1 Capturing Group 捕获组（Unnamed / 无命名）

Syntax: `(AB)`

Match: AB

Example:

```js
> "abcABC".match(/(AB)/)[1]    // [1] 取出这个正则表达式的第一个 group 匹配到的文本
'AB'
> "abcABC".match(/(AB)/).index // 起始下标
3
> "BC".match(/(AB)/)
null
```

### 3.2 Non-Capturing Group 非捕获组

Syntax: `(?:AB)`

Match: AB

Example:

```js
> "abcABC".match(/(?:AB)/).index
3
> "abcABC".match(/(?:AB)/)[1]
undefined
```

### 3.3 Named Capturing Group

Syntax: `(?<name>AB)`

Match: AB

Example:

```js
> "abcABC".match(/(?<myName1>AB)/).groups.myName1
'AB'
```

### 3.4 Capture 和 Non-Capture、Named 和 Unnamed 的区别

它们的区别主要在替换操作中体现。在后文中，你将会了解到如何通过反向引用来替换字符串。

## 4 Quantifiers 量词

- 重复一次或多次 `+`
- 重复零次或多次 `*`
- 重复零次或一次 `?`
    - 注意，`?` 出现在其它量词后时，还有「<b>启用非贪婪匹配</b>」的作用。正则表达式的量词默认为贪婪匹配，也就是尽可能匹配最多字符。
        - 重复一次或多次，但希望在使得整个正则表达式匹配成功的前提下尽量少匹配：`+?`
        - 重复零次或多次，但希望在使得整个正则表达式匹配成功的前提下尽量少匹配：`*?`

- 重复指定次数 `{数字}`
- 重复一定范围内的次数 `{下界,上界}`（两侧均包含）。如果上界省略，则表示上界为无穷大。换言之，`\d{1,}` 等价于 `\d+`。
- 替代 `|`。例如 `A|B` 等价于 `[AB]`。
    - 区别：你无法在 `[]` 内部使用 Group 和 Reference。然而如果采用 `X|Y` 形式，那么就可以使用 Group 和 Reference 了。

```js
> "test.www.baidu.com".match(/(.+?\.?)/)
```

## 5 Anchors 定位点

行首：`^`

行尾：`$`

词的边缘：`\b`

不在词的边缘：`\B`

```js
> /^abc$/.test("abc")
true
> /^abc$/.test("1abc1")
false
```

```js
> /\babc\B/.test("0 1abc")
false
> /\babc\B/.test("0 abc1")
true
```

`\b` 和 `\B` 在处理「前面有空格、后面没有空格」这种匹配需求的时候非常好用。

## 6 Reference 引用

### 6.1 在正则表达式中引用已匹配内容

对于 Capture 的 Group，可以通过 `\数字` 的方式在正则表达式中引用这个 Group <b>匹配到的文本</b>，且可以在<b>替换</b>时通过 `$数字` 的方式来反向引用<b>匹配到的这个子字符串：</b>

```js
> "aab".match(/(a)\1/)[0]  // [0] 取出这个表达式匹配到的完整子串
'aa'
> "aab".match(/(a)\1/)[1]  // \1 并不在括号内，故第一个 group 匹配到的仍然是 a
'a'
```

当然，对于 Named Capturing Group，也可以通过名字来引用。具体的引用语法为，正则表达式内部引用 `\k<name>`，替换新字符串中 `$<name>`：

```js
> "abbcd".replace(/(?<test>b)\k<test>/, "$<test> works")
'ab workscd'
```

如果是 Non-Capturing Group，就无法通过这种方式来引用到它所匹配的文本了：

```js
> "bcaac".match(/(?:c)(a)\1/)[0]
'caa'
```

可以看到，虽然出现的第一个 Group 是 `(?:c)`，但是它是 Non-Capturing Group，因此 `\1` 指向了 `(a)` 匹配到的子串 `'a'`。

### 6.2 在替换子串时引用已匹配内容

在替换时，可以在用来替换匹配到的子串的新字符串中引用匹配到的 Capturing Group 中的内容。其语法是 `$数字` 或 `$<名字>`。例如：

```js
> "abcdef".replace(/(bcd)ef/, "$1 works")
'abcd works'
> "abcdef".replace(/(?<name>bcd)ef/, "$<name> works")
'abcd works'
```

可以看到，`(bcd)ef` 匹配到 `'bcdef'` 子串，而 `$1` 和 `$<name>` 指向了 `'bcd'`。因此，`'bcdef'` 被替换为 `'$1 works'` 也就是 `'bcd works'`。

这种反向引用的方法，在批量修改文本格式时非常有用。比方说，我们想只保留如下 CSV 中的手机号，但是又不保留 +86 部分：

```text
张三,男,+86 13800138000,未婚
李四,女,+86 13800138001,未婚
```

想要达成上述效果，可以应用如下的替换指令（`+` 和 `{数字}` 等符号的含义，请参见下文的 Quantifiers）：

```js
csv.replace(/\S+,\S+,+86 (\d{13}),\S+/, "$1")
```

这里，我们做的事情是：使用正则表达式匹配了一整行字符串，并且替换的新子串指定了只保留 `$1` 部分，也就是匹配到连续 13 个数字对应的子串。其它匹配到的部分都被替换掉了。

## 7 Substitution 替换

- `$1` 反向引用第一个 Named Capturing Group。例子在 Group 章节中已经给出。
- `$&` 反向引用匹配到的完整子串：

```js
> "abc abc".replace(/(abc) \1/, "1 $& 2")
'1 abc abc 2'
```

- `$`` 反向引用匹配到的完整子串之前的子串。
- `$'` 反向引用匹配到的完整子串之后的子串。注意区分引号 `'` 和反引号 ```。
- `$$` 表示转义后的 `$`：

```js
> "3 dollar".replace(/(\d+)\s?[Dd]ollar/, "$$$1")
'$3'
```

## 8 Flags 标记

Flags 修饰正则表达式本身，位于正则表达式字面量的第二个斜杠之后。不同的 Flags 有不同的作用：

- `i` 表示忽略大小写。在此模式下，`[a-z]` 可以匹配 a-z 和 A-Z，`[A-Z]` 同理。
- `m` 表示不特殊处理换行符，i.e. 在多行范围内匹配。
- `g` 表示全局匹配。在 `match` 时，`g` flag 会导致所有 Named Capturing Group 能够匹配上的所有子串都被按顺序提取到结果数组中；在替换时 `g` flag 的正则表达式可以替换原串中的所有匹配的子串（默认只替换第一个）。
    - `g` flag 的正则表达式，其内部会储存上次匹配成功的下标 `lastIndex`，下次会直接从这里开始匹配。因此，可能出现同一个正则表达式，储存为变量后，对于某个固定字符串有时能匹配上有时又匹配不上的情况。

```js
> "abcd".match(/(\w)/)
[ 'a', 'a', index: 0, input: 'abcd', groups: undefined ]
> "abcd".match(/(\w)/g)
[ 'a', 'b', 'c', 'd' ]
> "abcd".match(/(\w)(\w)/)
[ 'ab', 'a', 'b', index: 0, input: 'abcd', groups: undefined ]
> "abcd".match(/(\w)(\w)/g)
[ 'ab', 'cd' ]
```

```js
> const regex = /\w/g
undefined
> regex.test("s")  // regex.lastIndex becomes 1
true
> regex.test("s")  // "s".slice(1) is "", can't match. regex.lastIndex reset
false
> regex.test("t")  // regex.lastIndex becomes 1
true
> regex.test("w")  // "w".slice(1) is "", can't match. regex.lastIndex reset
false
// 所以，/g 的正则表达式 test 结束后记得 .lastIndex = 0
```

- `u` 表示启用 Unicode 功能。Unicode 功能包括 `\p{...}`，`\uXXXX`（Unicode XXXX 码点对应的字符），`\u{XXXXX}`（Unicode 多字节字符），`\x{FFFFF}`（同前）等。在此模式下，使用反斜杠转义无需转义的字符会导致语法错误。
- `y` 表示从 `lastIndex` 开始匹配，但不改变 `lastIndex`。启用 `y` 会导致禁用 `g`。
- `s` 表示 dotAll 模式，`.` 可以匹配一切，也就是 `.` 从 `[^\r\n]` 变为 `[\s\S]`。

## 9 Lookaround 环视条件

有时候，我们希望能限制匹配到的子串所在的上下文，但又不希望匹配到上下文本身。这种需求在涉及到替换操作时尤其常见。

譬如说我们想将所有在数字后面的 def 都替换为 ghi。假如不采用 Lookaround，需要这样实现：

```js
> "123def abcdef".replace(/(\d)def/, "$1ghi")
'123ghi abcdef'
```

可以看到，我们不得不在替换的新字符子串里面通过 `$1` 来将被 `\d` 限制条件误伤的 `3` 给救回来。归根结底，这是因为我们只是想利用 `\d` 来限制 `def` 的匹配，而并不真的想让 `\d` 也匹配到字符上。这时，就可以使用 Lookaround。

Lookaround 有四种：

- Positive Lookahead 肯定前向环视 `ABC(?=def)` 匹配后面是 def 的 ABC，但不匹配 def
- Negative Lookahead 否定前向环视 `(?!ABC)def` 匹配前面不是 ABC 的 def，但不匹配前面不是 ABC 的这部分
- Positive Lookbehind 肯定后向环视 `(?<=ABC)def` 匹配后面是 ABC 的 def，但不匹配 ABC
- Negative Lookbehind 否定后向环视 `def(?<!ABC)` 匹配后面不是 ABC 的 def，但不匹配后面不是 ABC 的这部分

Lookaround 很强大，可惜大多数人不会用。

## 复杂正则的理解与调试

推荐在 https://regexr.com/ 等正则可视化网站上调试。

## 祛魅

正则表达式只不过是一种描述 DFA 的方式，其表达能力无法超脱出 Chomsky Type-3 文法的范畴。因此，从理论限制上讲，正则表达式有很多任务都无法实现。比如说，不可能写出一个正则表达式，使得它接受（匹配）所有的合法 C 语言程序，并拒绝（不匹配）所有的非法 C 语言程序。又比如，正则表达式无法判断字符串是否是回文序列，这是因为判断回文序列需要栈结构，而栈不属于 FA 范畴。

在实际需求上，也有很多的任务，哪怕可以通过正则表达式实现，也不应当采用正则表达式——或者至少不应完全采用正则表达式实现。

比如，邮箱合法性检验：

```js
const emailRegex = /\w+@\w+\.\w{2,}/;
// Google 支持邮箱别名
emailRegex.test("jimmy+alias@gmail.com");   // false！匹配失败了
// !#$%&'*+-/=?^_`{|}~ 都可以出现在邮箱名字里
emailRegex.test("jimmy_!#$%&'*+-/=?^_`{|}~@outlook.com")  // false! 匹配失败了
```

比如，密码复杂度计算。让我们鞭尸一下 [GitLab 极狐的密码复杂度校验函数](https://gitlab.com/gitlab-jh/gitlab/-/merge_requests/210/diffs)：

```rb
def password_complexity
    return if password.blank? || password =~ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+|}{":?><])[A-Za-z\d~!@#$%^&*()_+|}{":?><]{#{::Gitlab::CurrentSettings.minimum_password_length},}$|^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+|}{":?><])[A-Za-z\d~!@#$%^&*()_+|}{":?><]{#{::Gitlab::CurrentSettings.minimum_password_length},}$|^(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|}{":?><])[A-Za-z\d~!@#$%^&*()_+|}{":?><]{#{::Gitlab::CurrentSettings.minimum_password_length},}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+|}{":?><])[A-Za-z\d~!@#$%^&*()_+|}{":?><]{#{::Gitlab::CurrentSettings.minimum_password_length},}$|^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d~!@#$%^&*()_+|}{":?><]{#{::Gitlab::CurrentSettings.minimum_password_length},}$/
```

其实，这坨狗屎，完全可以写成<b>可读性</b>很强的形式：

```js
// 我们用了带 g flag 的正则，要注意 lastIndex
const regexArray = [
  /[a-z]+/g,  // lowercase
  /[A-Z]+/g,  // uppercase
  /\d+/g,     // numeric
  /[~!@#$%^&*()_+|}{":?><]+/g,  // special chars
];

const minimumLength = Gitlab.CurrentSettings.minimumPasswordLength;

/**
 * @param {string} password
 * @return {boolean} is valid password?
 */
function validatePasswordComplexity(password) {
  let score = 0;
  let unexpectedChars = password;
  regexArray.forEach(regex => {
    if(regex.test(password)) {
      score++;
      // replace 不受 lastIndex 影响，不需要 reset lastIndex
      unexpectedChars = unexpectedChars.replace(regex, "");
      // replace 之后同样不需要 reset lastIndex，因为最后一次匹配一定失败了才会终止，匹配失败会自动 reset lastIndex
    }
  });
  // 检查是否存在无法被四个正则中的任何一个匹配到的非法字符（例如：密码里有中文？）
  if(unexpectedChars.length > 0) {
    return false;
  }
  return score >= 3;  // 其实极狐的那段狗屎，就是在限制四种字符至少要有三种
}
```

## 正则进阶

引言中提到，正则表达式和确定有限状态自动机（DFA）为等价关系。因此，只要是可以通过 DFA 判别的内容，都可以通过正则表达式判别。

举例 - [使用正则表达式匹配 3 的倍数](https://zhuanlan.zhihu.com/p/39022144)：

```js
> /^([0369]|[258][0369]*[147]|[147]([0369]|[147][0369]*[258])*[258]|[258][0369]*[258]([0369]|[147][0369]*[258])*[258]|[147]([0369]|[147][0369]*[258])*[147][0369]*[147]|[258][0369]*[258]([0369]|[147][0369]*[258])*[147][0369]*[147])*$/.test("123")
true
```

众所周知，我们日常接触到的数据范围最大的变量类型也只有 64 位长，而 `UINT64_MAX` 仍然是个有限的数字。如果使用基于正则表达式的检验方法，那么能够处理的数字范围将远远超过 `num % 3 == 0` 这种朴素的方法所能处理的范围。并且，取模运算由于涉及到除法运算，其实际的时间开销并不小。感兴趣的同学可以自己 benchmark 两种方案，比较哪种方案效率更高。

不过，要写出这种正则表达式，首先需要画出对应的 Finite Automachine 的状态转移图。建议阅读上面的知乎回答来学习，也可以提前修读《计算理论》课程。

如果您还希望看一些更加 intuitive 的教程，可以参考 https://deerchao.cn/tutorials/regex/regex.htm

最后，推荐一个好玩的正则表达式游戏：[Regex Golf](http://alf.nu/RegexGolf)（想当年，我也是做出了差不多二十道题的人，哈哈！）

