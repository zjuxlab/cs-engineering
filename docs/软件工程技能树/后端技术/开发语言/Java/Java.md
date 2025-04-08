---
title: Java
slug: Java
sidebar_position: 1
---


# Java

Author：NA

# Java程序基本结构

```java
public class Hello { // 类名是Hello
    // ...
} // class定义结束
```

一个程序的基本单位就是类，class是关键字，这里定义的类名字就是Hello。

## 类名要求：

- 类名必须以英文字母开头，后接字母，数字和下划线的组合
- 习惯以大写字母开头
-         <b>注意到public是访问修饰符，表示该类是公开的。 </b>

不写public，也能正确编译，但是这个类将无法从命令行执行。

```java
public class Hello {
    public static void main(String[] args){ // 方法名是main
    //方法代码...
    } // 方法定义结束
}
```

这里的方法名是main，返回值是void，表示没有任何返回值。

public除了可以修饰class外，也可以修饰方法。而关键字static是另一个修饰符，它表示静态方法。

Java入口程序规定的方法必须是静态方法，方法名必须为main，括号内的参数必须是String数组。

<b>方法名命名和class一样，但是首字母小写。</b>

## Java有3种注释：

- 单行注释：以双斜线开头，直到这一行的结尾结束：

```java
// 这是注释…
```

- 多行注释：以/<em>星号开头，以</em>/结束，可以有多行：

```java
/*
这是注释
blablabla...
这也是注释
*/
```

- 特殊的多行注释，以/开头，以*/结束，如果有多行，每行通常以星号开头：

```java
/**
* 可以用来自动创建文档的注释
* 
* @auther liaoxuefeng
*/
```

- 这种特殊的多行注释需要写在类和方法的定义处，可以用于自动创建文档。

---

# 变量与数据类型

在Java中，变量分为两种：基本类型的变量和引用类型的变量

 

基本类型的变量

在Java中，变量必须先定义后使用，在定义变量的时候，可以给它一个初始值。

 

Java定义了以下几种基本数据类型：

- 整数类型：byte，short，int，long
- 浮点数类型：float，double
- 字符类型：char
- 布尔类型：boolean

```java
┌───┐
 byte   │   │
        └───┘
        ┌───┬───┐
 Short  │   │   │
        └───┴───┘
        ┌───┬───┬───┬───┐
 int    │   │   │   │   │
        └───┴───┴───┴───┘
        ┌───┬───┬───┬───┬───┬───┬───┬───┐
 long   │   │   │   │   │   │   │   │   │
        └───┴───┴───┴───┴───┴───┴───┴───┘
        ┌───┬───┬───┬───┐
 Float  │   │   │   │   │
        └───┴───┴───┴───┘
        ┌───┬───┬───┬───┬───┬───┬───┬───┐
 double │   │   │   │   │   │   │   │   │
        └───┴───┴───┴───┴───┴───┴───┴───┘
        ┌───┬───┐
 char   │   │   │
        └───┴───┘
```

## 整型

对于整型类型，Java只定义了带符号的整型，因此，最高位的bit表示符号位（0表示正数，1表示负数）。各种整型能表示的最大范围如下：

- byte：-128 ~ 127
- short: -32768 ~ 32767
- int: -2147483648 ~ 2147483647
- long: -9223372036854775808 ~ 9223372036854775807<b>（long类型的结尾需要加L）</b>

## 浮点型

浮点类型的数就是小数，因为小数用科学计数法表示的时候，小数点是可以“浮动”的，所以称为浮点数。

        <b>注：对于float类型，需要加上f后缀。 </b>

## 布尔类型

布尔类型boolean只有true和false两个值

Java语言对布尔类型的存储并没有做规定，因为理论上存储布尔类型只需要1 bit，但是通常JVM内部会把boolean表示为4字节整数。

## 字符类型

字符类型char表示一个字符。Java的char类型除了可表示标准的ASCII外，还可以表示一个Unicode字符

        <b>注意char类型使用单引号'，且仅有一个字符，要和双引号"的字符串类型区分开。</b>

## var关键字

有些时候，类型的名字太长，写起来比较麻烦。如果想省略变量类型，可以使用var关键字，编译器会根据赋值语句<b>自动推断</b>出变量的类型。

在Java中，多行语句用{ }括起来。很多控制语句，例如条件判断和循环，都以{ }作为它们自身的范围。

只要正确地嵌套这些{ }，编译器就能识别出语句块的开始和结束。而在语句块中定义的变量，它有一个作用域，就是从定义处开始，到语句块结束。超出了作用域引用这些变量，编译器会报错。举个例子：

```java
{
...
int i = 0; // 变量i从这里开始定义
...
{
...
int x = 1; // 变量x从这里开始定义
...
{
...
String s = "hello"; // 变量s从这里开始定义
...
} // 变量s作用域到此结束
...
// 注意，这是一个新的变量s，它和上面的变量同名，
// 但是因为作用域不同，它们是两个不同的变量:
String s = "hi";
...
} // 变量x和s作用域到此结束
...
} // 变量i作用域到此结束
```

# 整数运算

Java的整数运算遵循四则运算规则，可以使用任意嵌套的小括号。四则运算规则和初等数学一致。

        <b>特别注意：整数的除法对于除数为0时运行时将报错，但编译不会报错。</b>

## 溢出

整数由于存在范围限制，如果计算结果超出了范围，就会产生溢出，而溢出<b>不会出错</b>，却会得到一个奇怪的结果。

## 自增/自减

Java还提供了++运算--运算，它们可以对一个整数进行加1和减1的操作：

        <b>注意++写在前面和后面计算结果是不同的，++n表示先加1再引用n，n++表示先引用n再加1。</b>

## 移位运算

在计算机中，整数总是以二进制的形式表示。对于正数，全部移动；如果对一个负数进行右移，最高位的1不动，结果仍然是一个负数。

还有一种不带符号的右移运算，使用&gt;&gt;&gt;，它的特点是符号位跟着动，因此，对一个负数进行&gt;&gt;&gt;右移，它会变成正数。

对byte和short类型进行移位时，会首先转换为int再进行位移。

左移实际上就是不断地×2，右移实际上就是不断地÷2。

## 位运算

与，或，非，异或

与运算的规则是：必须两个数同时为1，结果才为1。

或运算的规则是：只要任意一个为1，结果就为1。

非运算的规则是：0和1互换。

异或运算的规则是：如果两个数不同，结果为1，否则为0。

上述按位与运算实际上可以看作两个整数表示的IP地址10.0.17.77和10.0.17.0，通过与运算，可以快速判断一个IP是否在给定的网段内。

## 运算优先级

在Java的计算表达式中，运算优先级从高到低依次是：

- ()
- !     ~       ++      —（自减）
- *     /       %
- +     -
- &lt;&lt;    &gt;&gt;      &gt;&gt;&gt;
- &
- |
- +=    -=      *=      /=

## 类型自动提升与强制转型

在运算过程中，如果参与运算的两个数类型不一致，那么计算结果为较大类型的整型。例如，short和int计算，结果总是int；也可以将结果强制转型，即将大范围的整数转型为小范围的整数。强制转型使用(类型）

        <b>注意，超出范围的强制转型会得到错误的结果，原因是转型时，int的两个高位字节直接被扔掉，仅保留了低位的两个字节</b>

# 浮点数运算

浮点数运算和整数运算相比，只能进行加减乘除这些数值计算。在计算机中，浮点数常常无法精确表示。<b>可以用Java提供的四舍五入法</b><b>Math.round()</b><b>解决</b>

<b>判断两个浮点数是否相等可以用Java提供取决值方法Math.abs()，与最小数“1e-6”相比较，如果小于则两数相等</b>

Java的浮点数完全遵循IEEE-754标准，这也是绝大多数计算机平台都支持的浮点数标准表示方法。

## 类型提升

如果参与运算的两个数其中一个是整型，那么整型可以自动提升到浮点型。

需要特别注意，在一个复杂的四则运算中，两个整数的运算不会出现自动提升的情况。

## 溢出

整数运算在除数为0时会报错，而浮点数运算在除数为0时，不会报错，但会返回几个特殊值：

- NaN表示Not     a Number，例0.0/0
- Infinity表示无穷大，例1.0/0
- -Infinity表示负无穷大，例-1.0/0

## 强制转型

可以将浮点数强制转型为整数。在转型时，浮点数的小数部分会被丢掉。<b>如果转型后超过了整型能表示的最大范围，将返回整型的最大值。</b>

如果要进行四舍五入，可以对浮点数加上0.5再强制转型。

# 布尔运算

布尔运算是一种关系运算，包括以下几类：

- 比较运算符：&gt;        &gt;=        &lt;        &lt;=        ==        !=
- 与运算 &&
- 或运算 ||
- 非运算 !

关系运算符的优先级从高到低依次是：

- !
- &gt;，&gt;=，&lt;，&lt;=
- ==，!=
- &&
- ||

## 短路运算

如果一个布尔运算的表达式能提前确定结果，则后续的计算不再执行，直接返回结果。

例：因为false && x的结果总是false，无论x是true还是false，因此，与运算在确定第一个值为false后，不再继续计算，而是直接返回false。

## 三元运算符

Java还提供一个三元运算符b ? x : y，它根据第一个布尔表达式的结果，分别返回后续两个表达式之一的计算结果。

注意到三元运算b ? x : y会首先计算b，如果b为true，则只计算x，否则，只计算y。<b>此外，x和y的类型必须相同，因为返回值不是boolean，而是x和y之一。</b>

# 输入和输出

## 输出

println表示输出并换行。因此，如果输出后不想换行，可以用print()

## 格式化输出

格式化输出使用System.out.printf()，通过使用占位符%?，printf()可以把后面的参数格式化成指定格式

Java的格式化功能提供了多种占位符，可以把各种数据类型“格式化”成指定的字符串：

        <b>注意，由于%表示占位符，因此，连续两个%%表示一个%字符本身。</b>

## 输入

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
                Scanner scanner = new Scanner(System.in); // 创建Scanner对象
                System.out.print("Input your name: "); // 打印提示
                String name = scanner.nextLine(); // 读取一行输入并获取字符串
                System.out.print("Input your age: "); // 打印提示
                int age = scanner.nextInt(); // 读取一行输入并获取整数
                System.out.printf("Hi, %s, you are %d\n", name, age); // 格式化输出
        }
}
```

首先，我们通过import语句导入java.util.Scanner，import是导入某个类的语句，必须放到Java源代码的开头，后面我们在Java的包中会详细讲解如何使用import。

然后，创建Scanner对象并传入System.in。System.out代表标准输出流，而System.in代表标准输入流。直接使用System.in读取用户输入虽然是可以的，但需要更复杂的代码，而通过Scanner就可以简化后续的代码。

有了Scanner对象后，要读取用户输入的字符串，使用scanner.nextLine()，要读取用户输入的整数，使用scanner.nextInt()。Scanner会自动转换数据类型，因此不必手动转换。

# if判断

if语句的基本语法是：

```java
if (条件) {
 // 条件满足时执行
}
```

        <b>注意到if语句包含的块可以包含多条语句；当if语句块只有一行语句时，可以省略花括号{}。</b>

if语句还可以编写一个else { … }，当条件判断为false时，将执行else的语句块。

        <b>注意，else不是必须的。还可以用多个if … else if …串联。</b>

## 判断引用类型相等

在Java中，判断值类型的变量是否相等，可以使用==运算符。但是，判断引用类型的变量是否相等，==表示“引用是否相等”，或者说，是否指向同一个对象。

要判断引用类型的变量内容是否相等，必须使用equals()方法

        <b>注意：执行语句s1.equals(s2)时，如果变量s1为null，会报NullPointerException；</b>

要避免NullPointerException错误，可以利用短路运算符&&；还可以把一定不是null的对象"hello"放到前面

# switch多重选择

switch语句根据switch (表达式)计算的结果，跳转到匹配的case结果，然后继续执行后续语句，直到遇到break结束执行。

如果option的值没有匹配到任何case，那么，switch语句不会执行任何语句。这时，可以给switch语句加一个default，当没有匹配到任何case时，执行default。

使用switch时，注意case语句并没有花括号{}，而且，case语句具有“<em>穿透性</em>”，从匹配到开始，后续语句将全部执行，直到遇到break语句。

<b>switch语句还可以匹配字符串。字符串匹配时，是比较“内容相等”。</b>

# 循环语句

## while 循环

Java提供的while条件循环。它的基本用法是：

```java
while (条件表达式) {
循环语句
}
// 继续执行后续代码
```

while循环在每次循环开始前，首先判断条件是否成立。如果计算结果为true，就把循环体内的语句执行一遍，如果计算结果为false，那就直接跳到while循环的末尾，继续往下执行。

注意到while循环是先判断循环条件，再循环，因此，有可能一次循环都不做。

## do while循环

do while循环则是先执行循环，再判断条件，条件满足时继续循环，条件不满足时退出。它的用法是：

```java
do {
执行循环语句
} while (条件表达式);
```

<b>可见，do while循环会至少循环一次。</b>

## for循环

for循环使用计数器实现循环。for循环会先初始化计数器，然后，在每次循环前检测循环条件，在每次循环后更新计数器。计数器变量通常命名为i。

for循环的用法是：

```java
for (初始条件; 循环检测条件; 循环后更新计数器) {
// 执行语句
}
```

<b>for循环还可以缺少初始化语句、循环条件和每次循环更新语句</b>

## for each循环

for each循环的变量n不再是计数器，而是直接对应到数组的每个元素。for each循环的写法也更简洁。但是，for each循环无法指定遍历顺序，也无法获取数组的索引。

```java
for(元素类型 元素变量 : 遍历对象){
     语句;
}
```

# break和continue

## break

在循环过程中，可以使用break语句跳出当前循环。

<b>要特别注意，break语句总是跳出自己所在的那一层循环。</b>

<b>可以添加标签来控制外层的循环</b>

## continue

continue则是提前结束本次循环，直接继续执行下次循环。

在多层嵌套的循环中，continue语句同样是结束本次自己所在的循环。

# 字符和字符串

## 字符类型

字符类型char是基本数据类型，一个char保存一个Unicode字符

一个英文字符和一个中文字符都用一个char类型表示，它们都占用两个字节。要显示一个字符的Unicode编码，只需将char类型直接赋值给int类型即可

还可以直接用转义字符\u+Unicode编码来表示一个字符

## 字符串类型

字符串类型String是引用类型，我们用双引号"…"表示字符串。一个字符串可以存储0个到任意个字符符串。一个字符串可以存储0个到任意个字符

 

### 常见的转义字符包括：

- " 表示字符"
- ' 表示字符'
- \ 表示字符\
- \n 表示换行符
- \r 表示回车符
- \t 表示Tab
- \u#### 表示一个Unicode编码的字符

### 字符串连接

Java的编译器可以使用+连接任意字符串和其他数据类型

<b>如果用+连接字符串和其他数据类型，会将其他数据类型先自动转型为字符串，再连接</b>

### 空值null

引用类型的变量可以指向一个空值null，它表示不存在，即该变量不指向任何对象。

<b>注意要区分空值null和空字符串""，空字符串是一个有效的字符串对象，它不等于null。</b>

### 判断字符串是否含有子字符串

Str.indexOf()判断字符串是否含有子字符串，若有返回地址（大于等于0的数），若没有返回-1；

### 查找子串

- int indexOf(String str)：获取第一次出现的索引
- int indexOf(String str, int fromIndex)：从指定位置往后查
- int lastindexOf(String str)：获取最后一次出现的索引
- int lastindexOf(String str, int fromIndex)：从指定位置往前查
- boolean contains(Charsequence(String的父类))

### 获取指定字符

charAt()用于获取指定字符，例：

```java
String name="Peter";

char ch=name.charAt(0);
```

### 截取字符串

```java
public String substring(int beginning)
public String substring(int beginning,int endindex)
```

- <b>注意：索引从0开始</b>

### 去除空白

#### 去除首尾空白内容

空白字符包括：空格，\t，\r，\n

- public String trim()
- public String strip()<b>(不同之处：类似中文的空格字符\u3000也会被移除)</b>

```java
String str="   abc   ";

String shortStr=str.trim()
```

#### 去除字符串中所有的空白内容

```java
str.replaceAll("\\s","替换的内容")
```

### 判断字符串是否为空

```java
public boolean isEmpty()
```

只有字符串长度为0才返回true

### 判断字符串是否为空白字符串

```java
public boolean isBlank()
```

只有字符串全部为空格才返回true

### 字符串替换

- public String replace(旧字符序列，替换后的新字符序列)
- public String replaceAll()
- public String replaceFirst() 

### 判断字符串结尾内容

- pubic boolean endWith(String 要对比的字符串)

### 判断字符串句首内容

- pubic boolean startWith(String 要对比的字符串)

### 忽略大小写比较

- public boolean equalsIgnoreCase(String 被比较的字符串)
- 特殊情况：

```java
String name="Tom"；
String dbValue="Tom";
name==dbValue         结果为true
String name="Tom";
Strint dbValue=new String("Tom");
name==dbValue         结果为false
```

- <b>原因：第一种情况，当创建常量时，Java虚拟机会先在栈中常量区创建"Tom",然后自动创建一个匿名的字符串对象new String()指向"Tom"，然后将对象地址给name，当dbValue也引用"Tom"时，Java虚拟机会先到栈中常量区查找，如果有就直接把匿名对象地址给dbValue，而第二种情况就是两个匿名对象</b>
    - `==` 比较的是<b>内存地址</b>，适用于判断两个变量是否指向同一个对象。
    - `equals` 比较的是<b>内容</b>，适用于判断两个字符串的内容是否相同。

### 大小写转换

- 将字符串变成大写：public String toUpperCase()
- 将字符串变成小写：public String toLowerCase()

### 字符串分割

- public String[] spilt(String regex(分割符号))

#### 限定分割次数：

- public String[] split(String regex(分割符号),int limit(分割次数))

### 格式化字符串

- String.format(String format,Object…args)

### 转换为char[]

char[] cs="Hello".toCharArray();//String-&gt;char[]

String s=new String(cs);//char[]-&gt;String

<b>如果修改了char[]数组，String并不会改变</b>

## 正则表达式

正则表达式是一组公式，描述了一种字符串匹配的格式。通常被用于判断语句中，用来检查某一字符串是否满足某一格式。我们可以调用String中的matches(String regex)方法，判断字符串是否匹配给定的正则表达式，返回布尔值。

- "."     代表任意一个字符
- "\d"  代表0~9的任何一个数字
- "\D"  代表任何一个非数字字符
- "\s"   代表空白字符，如"\t","\n"
- "\S"   代表非空白字符
- "\w"  代表可用作标识符的字符，但不包括"$"
- "\W"   代表不可用作标识符的字符

## StringBuffer类

String Buffer是线程安全的可变字符序列。一个类似于String的字符串缓冲区。String创建的字符串对象是不可修改的，String Buffer类创建的是可修改的字符串序列，且实体容量会随着存放的字符串增加而自动增加。

<b>创建一个新的StringBuffer对象必须用new方法，而不能像String对象那样直接引用字符串常量</b>

### 追加字符序列

- public StringBuffer append(Object obj);

### 修改指定索引处的字符

- public void setCharAt(int index,char ch)
- 将给定索引处的字符修改为ch

### 插入字符串

- public StringBuffer insert(int index,String str）
- 将字符串插入此字符序列中

### 字符串反序

- public StringBuffer reverse()
- 该方法可以将字符串反序输出

### 删除子字符串

- public StringBuffer delete(int start,int end)
- 移除此序列的子字符串中的字符。该子字符串是从指定的索引start处开始，到索引end-1处，如果end-1超出最大索引范围，则一直到序列尾部。如果start等于end，则不发生任何改变。

### 常用方法

与String类似的方法

- StrintBuffer sbf=new StringBuffer("ABCDEFG");
- int length=sbf.length();
- char chr=sbf.charAt(5);
- int index=sbf.indexOf("DEF");
- String substr=sbf.substring(0,2);
- StringBuffer tmp=sbf.replace(2,5,"1234");

## StringBulider类

常用方法：与StringBuffer类API兼容，两者使用方法也相同

## StringJoiner类

```java
import java.util.StringJoiner;
public class Main{
    public static void main(String[] args){
        String[] name = {"Bob","Alice","Grace"};
        var sj = new StringJoiner("，");
        for(String name : names){
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}
//输出为Bob,Alice,Grace
//如果将var sj = new StringJoiner("，");改为var sj = new StringJoiner("，","Hello ","!");则输出Hello Bob,Alice,Grace!，即在后面添加开头和结尾的参数
```

### String.join()

```java
String[] names = {"Bob","Alice","Grace"};
var s = String.join("，",names);
```

<b>在不需要指定开头和结尾的时候，用String.join()更方便</b>

## StringBuffer,StringBulider,String之间的关系

### 三者相互转换

```java
String str = "String";
StringBuffer sbf = new StringBuffer(str);
StringBulider sbd = new StringBulider(str);
str = sbf.toString();
str = sbd.toString();
StringBulider bufferToBulider=new StringBulider(sbf.toString);
StringBuffer buliderToBuffer =new StringBuffer(sbd.toString);
```

### 三者不同之处

String只能赋值一次，每一次改变内容都生成了一个新的对象，然后原有的对象引用了新的对象，所以说String本身是不可改变的。每一次改变String的字符串内容，都会在内存创建新的对象，而每一次生成新的对象都会对系统性能产生影响，这会降低Java虚拟机的工作效率

而StringBuffer和StringBulider不同，每次操作都是对自身对象做操作，而不是生成新的对象，其所占空间会随着字符内容增加而扩充，做大量的修改操作时，不会因生成大量匿名对象而影响系统性能

- 操作少、数据少，用String
- 单线程，操作多，数据多，用StringBulider
- 多线程，操作多，数据多，用StringBuffer

# 数组

## 一维数组初始化

```java
int a[]=new int[3];
   a[0]=7;
   a[1]=8;
   a[2]=9;
int b[]=new int[]{4,5,6};
int c[]={1,2,3};
```

<b>可以用数组变量.length获取数组长度。</b>

- length返回的是int型；
- 数组长度不可以定义成负数；
- length的值是常量；

## 二维数组的初始化

```java
int tdarr1[][]={{1,3,5},{5,9,10}};
int tdarr2[][]=new int[][]{{65,55,12},{92,7,22}};
int tdarr3[][]=new int[2][3];
    tdarr3[0]=new int[]{6,54,71};
    tdarr3[1][0]=63;
    tdarr3[1][1]=10;
    tdarr3[1][2]=7;
```

<b>二维数组的length表示数组的行数，如果要表明列数，需要</b><b>声明哪一行</b><b>然后再使用length参数</b>

## 遍历数组

两种方法：for循环和for each循环

for each循环更加简洁。但是，for each循环无法拿到数组的索引。

## 填充和批量替换数组元素

### 填充

<b>填充前不应有赋值，否则会被全部替换</b>

Arrays.fill(arr(数组),int value(填充的值));

### 批量替换

Arrays.fill(arr,int fromIndex(填充的第一个索引(包括)),int toIndex(填充的最后一个索引(不包括),int value);

## 复制数组

Arrays.copyOf(arr,newlength);

Arrays.copyOfRange(arr,formIndex(指定开始复制数组的索引位置(包括)),toIndex(要复制范围的最后索引位置(不包括)));

如果复制长度小于原数组长度，则从第一个元素开始复制，如果超出原数组长度则多出来的自动补0（或数组元素类型的默认值）

        <b>注意：不能直接让新数组等于原数组，否则，两者指向对象相同，新数组元素发生改变，原数组也会发生改变</b>

## 打印数组内容

可以用for each；或者要打印一个二维数组，可以使用两层嵌套的for循环或者for each循环，或者使用Java标准库的Arrays.deepToString()，一维数组使用Arrays.ToString()。

## 数组排序

常用的排序算法有冒泡排序、插入排序和快速排序等。

### 冒泡排序

冒泡排序的特点是，每一轮循环后，最大的一个数被交换到末尾，因此，下一轮循环就可以“刨除”最后的数，每一轮循环都比上一轮循环的结束位置靠前一位。

```java
for(int i=1;i<a.length;i++){
    for(int j=0;j<a.length-I;j++){
        if(a[j]>a[j+i]){
            int tmp=a[j]；
            a[j]=a[j+1];
            a[j+1]=tmp;
                }
        }
}
```

### 选择排序

比冒泡排序快点

```java
for(int i=1;i<a.length;i++){
        int index=0;
        for(int j=1;j<a.length;j++){
                if(a[index]<a[j]){
                        index=j;
                }
        }
        int tmp=a[a.length-i];
        a[a.length-i]=a[index];
        a[index]=tmp;
}
```

实际上，Java的标准库已经内置了排序功能，我只需要调用JDK提供的<b>Arrays.sort()</b>就可以排序。

## Java的数组特点

- 数组所有元素初始化为默认值，整型都是0，浮点型是0.0，布尔型是false；
- 数组一旦创建后，大小就不可改变。

要访问数组中的某一个元素，需要使用索引。<b>数组索引从0开始(C语言遗留)。</b>

可以修改数组中的某一个元素，使用赋值语句，例如，ns[1] = 79;。

数组是引用类型，在使用索引访问数组元素时，如果索引超出范围，运行时将报错。

<b>注意数组是引用类型，并且数组大小不可变。</b>

对于数组ns来说，执行ns = new int[] { 68, 79, 91, 85, 62 };时，它指向一个5个元素的数组：

执行ns = new int[] { 1, 2, 3 };时，它指向一个<em>新的</em>3个元素的数组

原有的5个元素的数组并没有改变，只是无法通过变量ns引用到它们而已。

