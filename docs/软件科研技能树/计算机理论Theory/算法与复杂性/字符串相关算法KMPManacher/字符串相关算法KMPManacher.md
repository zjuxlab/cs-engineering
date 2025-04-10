---
title: 字符串相关算法 KMP & Manacher
slug: 字符串相关算法 KMP & Manacher
sidebar_position: 0
---


# 字符串相关算法 KMP & Manacher

Author: 杨兴涛

朋友的实习面试题：实现如何用最少的分割把一个字符串分割成若干个回文子串？

# <b>概念</b>

 $Knuth-Morris-Pratt(KMP)$算法，又称模式匹配算法，由`Kunth`、`Morris`和`Pratt`在1977年共同发布。该算法能够以线性时间复杂度判定字符串$A[1,i]$是否为字符串$B[1,j]$的子串( $i\le j$ )，并求出 $A$ 在 $B$ 中出现的位置，还可以给出一些额外信息。

 

---

# <b>前缀数组</b>

在学习KMP之前，我们要先了解一个叫做前缀数组的东西。

我们分别给出长为 $n$ 的$A$（下称为”文本“）和长为 $m$ 的$B$（下称为”模式串“）两个字符串。

![](/assets/YXDObGm8TodLQlxpUPXck5w9nng.png)

如图，当 $A[1,i]==A[j,k]$ (注意是 $A[j,k]$ 而不是 $A[k,j]$ )时，我们就把 $A[1,i]$ 称作 $A[1,k]$ 的 <b>真前缀</b>。前缀数组 $nxt[k]$ 就保存着 $A[i]$ 的<b>最长</b>真前缀长度。

又或者对于以下字符串

> China
> 真前缀: c, ch, chi, chin
> 真后缀: hina, ina, na, a

同样的，我们设立一个数组 $f[i]$ ,表示字符串 $B$ 中，$B[i]$与$A$的真前缀匹配的最大长度。

![](/assets/P1oObgzEXona5WxpEzkczbmvnmg.png)

如上图， $A[1,i]==A[j,k]$(也就是说 $nxt[k]=i$），并 $A[1,i]==B[1,p]==B[q,l]$，当且仅当满足要求的 $i$ 最大时, $f[l]$ = $i$。特别地，若 $f[i]$ == $n$ 时，字符串 $A$ 出现在字符串 $B$ 中，且起始位置为 $i-n+1$ 。

这样，我们就可以运用 $nxt$ 数组来匹配字符串。那么有人会问：“为什么一定要用 $nxt$ 数组呢？暴力匹配也可以啊。”暴力匹配的时间至少在$O(nm)$以上,而我们接下来要讲的 $nxt$ 数组的求法，却可以令匹配时间复杂度缩减至 $O(n+m)$ 。

---

# <b>前缀数组的求法</b>

首先，我们需要知道 <b>前缀数组</b> 的这么一个性质：

> 在字符串$S$中，我们称满足$j<i$且$S[1,j]==S[i-j+1,i]$（即真前缀长度的$j$为$nxt[i]$的一个 <b>备胎</b> ，而 $nxt[i]$ 的最终归属为最大的$j$。

---

### 性质

若 $j$ 是 $nxt[i]$ 的一个“备胎”，则小于 $j$ 的 $nxt[i]$ 的最大“备胎”是 $nxt[j]$ （即 $nxt[j]+1~j-1$ 都不是 $nxt[i]$ 的备胎）。

### 证明

假设存在 $j_0$ 是 $nxt[i]$ 的“备胎”，且 $nxt[j]<j_0<j$ 。那么由 $S[1,j]==S[i-j+1,i]$ (即图中的红色部分),所以取两个字符串的后 $j_0$ 个字符，显然 $S[j-j_0+1,j]==S[i-j_0+1,i]$ (即图中的大括号部分)，因为 $S[1,j_0]==S[i-j_0+1,i]$ ，所以 $S[1,j_0]==S[j-j_0+1,j]$ ，所以此时 $j_0$ 也是 $nxt[j]$ 的“备胎”，然而此时 $j_0$ 才是最大的“备胎”，这与 $nxt[j]$ 的定义冲突，所以 $j_0$ 不存在。

![](/assets/OSYTbi1l0o113axibhRcVCEBngh.png)

### Q.E.D

---

### 求法

假设我们已求出 `nxt[1~i-1]`的值，现在该如何求得`nxt[i]`的值？s

在计算前缀数组时，我们希望求出每个位置 `i` 的最长真前缀长度 `nxt[i]`。利用前述的性质，我们可以高效地计算 `nxt[i]`。

#### 递推求解 `nxt` 数组

1. 设 `j = nxt[i - 1]`，表示 `i-1` 位置的最长真前缀长度。
2. 尝试扩展 `j`，检查 `A[j+1]` 是否等于 `A[i]`：
    - 如果 `A[j+1] == A[i]`，那么 `nxt[i] = j + 1`。
    - 否则，回溯到 `nxt[j]`，继续检查。

3. 终止条件是 `j == 0` 且 `A[1] != A[i]`，此时 `nxt[i] = 0`。

```
// KMP 算法预处理 next 数组
    nxt[1] = 0;
    for (int i = 2, j = 0; i <= n; ++i) {
        while (j > 0 && a[j + 1] != a[i]) j = nxt[j];
        if (a[j + 1] == a[i]) ++j;
        nxt[i] = j;
    }
```

这样，我们就可以在 `O(n)` 的时间复杂度下求出 `nxt` 数组。

### KMP 字符串匹配算法

在获得 `nxt` 数组后，我们可以利用它来优化字符串匹配。KMP 算法的核心思想是：

1. 当 `A[j+1]` 与 `B[i]` 匹配失败时，不回溯 `i`，而是利用 `nxt[j]` 跳过一部分匹配过程。
2. 继续尝试匹配 `A[nxt[j]+1]` 与 `B[i]`，直至匹配成功或 `j == 0`。

```
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1000010;
char a[MAXN], b[MAXN];
int nxt[MAXN], f[MAXN];
int n, m;

signed main() {
    // 输入字符串 b 和 a，注意从下标 1 开始存储
    scanf("%s", b + 1);
    scanf("%s", a + 1);

    // 计算字符串 a 和 b 的长度
    n = strlen(a + 1);
    m = strlen(b + 1);

    // KMP 算法预处理 next 数组
    nxt[1] = 0;
    for (int i = 2, j = 0; i <= n; ++i) {
        while (j > 0 && a[j + 1] != a[i]) j = nxt[j];
        if (a[j + 1] == a[i]) ++j;
        nxt[i] = j;
    }

    // KMP 匹配过程
    for (int i = 1, j = 0; i <= m; ++i) {
        while (j > 0 && (a[j + 1] != b[i] || j == n)) j = nxt[j];
        if (b[i] == a[j + 1]) ++j;
        f[i] = j;

        // 如果匹配成功，输出匹配的起始位置
        if (f[i] == n) {
            printf("%d\n", i - j + 1);
        }
    }

    return 0;
}
```

举例：

文本：`AAAAAAAABAAAAAAAABAAAAAAA`

模式串：`AAAA`

```
next = [0, 1, 2, 3]
```

文本：`ABABABABABABAB`

模式串：`ABAB`

```
next = [0, 0, 2, 4]
```

文本：`HELLOHELLO`

模式串：`HELLO`

```
next = [0, 0, 0, 0]
```

## 找到最长回文串长度 Manacher 马拉车

Manacher算法的步骤主要分为以下这么几步

1. <b>预处理字符串</b>

由于普通的回文判断对<b>偶数长度</b>和<b>奇数长度</b>的回文处理方式不同，我们通过插入特殊字符 `#` 来统一处理：

- 原始字符串： `"abcba"`
- 处理后字符串： `"#a#b#c#b#a#"`

这样，所有回文子串的长度都变成了<b>奇数，</b>方便我们进行后续处理。

### <b>2. 维护回文半径数组 </b><b>p[i]</b>

- 设 `p[i]` 表示以 `s[i]` 为中心的回文子串的<b>半径</b>（即回文子串的长度为 `2*p[i] - 1`）。
- 设 `id` 为<b>当前已知的最长回文子串的中心</b>，`mx` 为<b>当前已知的最长回文子串的右边界</b>（即 `id + p[id]`）。
- 遍历 `s[i]`，对于每个 `i`，有两种情况：
    - <b>i</b><b> 在 </b><b>mx</b><b> 之外</b>：只能暴力扩展，初始 `p[i] = 1`。
    - <b>i</b><b> 在 </b><b>mx</b><b> 之内</b>：利用对称性，`p[i] = min(p[2*id - i], mx - i)`（即 `p[i]` 至少等于对称点 `2*id - i` 处的回文半径，最多不能超过 `mx - i`）。

- 然后，<b>尝试扩展 </b><b>p[i]</b>，即比较 `s[i - p[i]]` 和 `s[i + p[i]]`，如果相等，就继续扩展。
- <b>更新 </b><b>id</b><b> 和 </b><b>mx</b>，保证 `mx` 维持当前的最右回文边界。

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 11000500;  // 定义最大长度
char s[MAXN << 1], s_bt[MAXN];  // s为处理后的字符串，s_bt为原始字符串
int ans, cnt, n, p[MAXN << 1];  // ans为最长回文子串的长度，p数组用于存储每个字符的回文半径

int Min(int x, int y) {
    return x < y ? x : y;
}

int Max(int x, int y) {
    return x > y ? x : y;
}

// 初始化函数，将原始字符串转换为处理后的字符串
void init() {
    n = strlen(s_bt + 1);  // 获取原始字符串的长度
    s[0] = '#';  // 在字符串开头添加特殊字符
    for (int i = 1; i <= n; ++i) {
        s[i * 2 - 1] = s_bt[i];  // 将原始字符串的字符放入偶数位置
        s[i * 2] = '#';  // 在字符之间插入特殊字符
    }
    n = n * 2;  // 更新处理后的字符串长度
}

// Manacher算法实现
void Manacher() {
    int id = 0, mx = 0;  // id为当前最右回文子串的中心，mx为当前最右回文子串的右边界
    for (int i = 1; i <= n; ++i) {
        if (i < mx) {
            p[i] = Min(p[2 * id - i], mx - i);  // 利用对称性减少计算
        } else {
            p[i] = 1;  // 初始回文半径为1
        }
        // 扩展回文半径
        while (i - p[i] >= 0 && s[i - p[i]] == s[i + p[i]]) {
            p[i]++;
        }
        // 更新最右回文子串的中心和右边界
        if (mx < i + p[i]) {
            id = i;
            mx = i + p[i];
        }
    }
}

// 主函数
signed main() {
    cin >> s_bt + 1;  // 输入原始字符串
    init();  // 初始化处理后的字符串
    Manacher();  // 执行Manacher算法
    for (int i = 0; i <= n; ++i) {
        ans = Max(ans, p[i]);  // 找到最大的回文半径
    }
    printf("%d", ans - 1);  // 输出最长回文子串的长度
    return 0;
}
```

举例：

假设原始字符串为 `"abacaba"`，我们手动执行 Manacher 算法的过程：

1. <b>预处理字符串</b>

将 `"abacaba"` 转换为 `"#a#b#a#c#a#b#a#"`。

最长的回文子串在 `i = 7` 处，半径为 `8`，即 `"abacaba"`。

1. <b>关键过程分析</b>

#### <b>第一步：处理 </b><b>i = 1</b>

- `s[1] = 'a'`，初始 `p[1] = 1`
- `s[1 - p[1]] == s[1 + p[1]]` (`s[0] == s[2]` 为 `#`)，扩展 `p[1] = 2`
- `id = 1, mx = 3` （更新 `id` 为当前回文中心，`mx` 为当前最右端点）

#### <b>第二步：处理 </b><b>i = 2</b>

- `s[2] = '#'`，`p[2] = 1`
- 无法扩展，`id` 和 `mx` 不变

#### <b>第三步：处理 </b><b>i = 3</b>

- `s[3] = 'b'`，初始 `p[3] = 1`
- `s[3 - p[3]] == s[3 + p[3]]` (`s[2] == s[4]` 为 `#`)，扩展 `p[3] = 2`
- `id = 3, mx = 5`

#### <b>第六步：处理 </b><b>i = 7</b>

- `s[7] = 'c'`，初始 `p[7] = 1`
- `s[7 - 1] == s[7 + 1]` (`s[6] == s[8]` 为 `#`)，扩展
- 持续扩展到 `p[7] = 8`
- `id = 7, mx = 15`（最右端点达到最大）

最终，最长回文子串长度为 `p[7] - 1 = 7`，即 `"abacaba"`。

