---
title: 文件读取工具 excelize
slug: 文件读取工具 excelize
sidebar_position: 5
---


# 文件读取工具 excelize

Author: 张立冬

## Intro

> Excelize 是 Go 语言编写的用于操作 Office Excel 文档基础库。可以使用它来读取、写入由 Microsoft Excel™ 2007 及以上版本创建的电子表格文档。支持 XLAM / XLSM / XLSX / XLTM / XLTX 等多种文档格式，高度兼容带有样式、图片(表)、透视表、切片器等复杂组件的文档，并提供流式读写 API，用于处理包含大规模数据的工作簿。

## Why And When Need It

在数据库类项目中，有时需要从已有迁移数据到数据库。在这种场景下，原有的数据可能使用了Excel文档存储。在文档规模较小的时候可以进行人工迁移，然而如果文档规模较大，人工迁移的工作量十分巨大，几乎不可能。因而需要在程序中使用excelize等文件读取工具，直接迁移数据，或将数据转化成中间数据，如JSON。

excelize的优势在于几乎开箱即用，学习成本低，操作简单。

## How To Use It

### 安装和配置

使用命令

```go
go get github.com/xuri/excelize/v2
```

并在Go代码中

```go
import "github.com/xuri/excelize/v2"
```

即可使用

### excelize基础操作

#### 打开工作簿

##### 附加Options

打开工作簿除了需要文件位置和文件名外可能还需要一些额外信息，比如文件被密码保护，需要密码才能打开。在用excelize中函数打开工作簿是可以附加`Options`结构体附加信息。

在excelize中打开工作簿的函数OpenFile如下

```go
func OpenFile(filename string, opts ...Options) (*File, error)
```

其中`Options`如下

```go
type Options struct {
    Password          string
    RawCellValue      bool
    UnzipSizeLimit    int64
    UnzipXMLSizeLimit int
}
```

```go
//从文档里找的示例代码
f, err := excelize.OpenFile("Book1.xlsx", excelize.Options{Password: "password"})
if err != nil {
    return
}
```

> `Password` 以明文形式指定打开和保存工作簿时所使用的密码，默认值为空。
> `RawCellValue` 用以指定读取单元格值时是否获取原始值，默认值为 `false`（应用数字格式）。
> `UnzipSizeLimit` 用以指定打开电子表格文档时的解压缩大小限制（以字节为单位），该值应大于或等于 `UnzipXMLSizeLimit`，默认大小限制为 16GB。
> `UnzipXMLSizeLimit` 用以指定解压每个工作表以及共享字符表时的内存限制（以字节为单位），当大小超过此值时工作表 XML 文件将被解压至系统临时目录，该值应小于或等于 `UnzipSizeLimit`，默认大小限制为 16MB。

excel中的数组格式，可能导致单元格中的值并不是原始值，可能经过舍入（数字），读取时设置`RawCellValue`可以指定是否获取原始值

![](/assets/PQk1byUjCoAyOAxBwP9cQCFpnSd.png)

<del>其他没咋试过qwq，略</del>

打开工作簿之后就是获取其中的数据&信息

#### 读取工作表

工作表是显示在工作簿窗口中的表格

![](/assets/NRXxbVVCgowrRmxCtlYccv7znpe.png)

##### 使用二维数组读取工作表

使用以下函数可以读取工作表数据，映射到二维数组中，如二维数组般获取其中数据

```go
func (f *File) GetCols(sheet string, opts ...Options) ([][]string, error)
func (f *File) GetRows(sheet string, opts ...Options) ([][]string, error)
```

两函数获取的二维数组，维度排序不同，互为转置矩阵，合理利用可以实现一行行/一列列遍历。

例如需要一行行遍历工作表，打开工作簿中的`Sheet1`，可以使用以下文档中的代码

```go
cols, err := f.GetCols("Sheet1")
if err != nil {
    fmt.Println(err)
    return
}
for _, col := range cols {
    for _, rowCell := range col {
    
    }
}
```

##### 使用行/列迭代器读取

容易发现，一次性读取全部的工作表数据到二维数组会占用程序内存，使用迭代器则不会有

使用工作表的迭代器可以做到，将工作表的信息按照行/列遍历

获取迭代器方法如下，使用函数`File.Cols`/`File.Rows`

```go
func (f *File) Cols(sheet string) (*Cols, error)
func (f *File) Rows(sheet string) (*Rows, error)
```

使用迭代器可以一次性获取某行/某列的信息，返回内容是`string`格式的，需要其他格式（如int啥的需要手动转化）

如

```go
func (cols *Cols) Rows(opts ...Options) ([]string, error)
```

返回当前列所有行的值。

迭代函数`Next()`如下，下一列存在值返回`true`否则返回`false`

```go
func (cols *Cols) Next() bool
```

> <b>兼容性提示</b>
> - 打开已有工作簿或在获取行迭代器后，需要调用对应的 `Close` 函数关闭工作簿和数据流

##### 使用坐标获取单元格

> - 坐标：打开一个excel文件观察行列序号，可以注意到行号为连续的数字，列号为字母/字母的组合，因此连续的字母和数字组成的字符串无需分隔符便可自然分隔成为一组坐标，例如A2，表示A列2行

使用`GetCellValue` 函数可以获取单个单元格中的值，数据类型为string，关于Options的规则与其他读取相同

```go
func (f *File) GetCellValue(sheet, cell string, opts ...Options) (string, error)
```

##### 搜索数据

> 根据给定的工作表名称，单元格值或正则表达式来获取坐标。此函数仅支持字符串和数字的完全匹配，不支持公式计算后的结果、格式化数字和条件搜索。如果搜索结果是合并的单元格，将返回合并区域左上角的坐标。

使用`SearchSheet` 函数可以返回工作簿满足特定条件的单元格数据，函数定义如下：

```go
func (f *File) SearchSheet(sheet, value string, reg ...bool) ([]string, error)
//使用样例
//例如，在名为 Sheet1 的工作表中搜索值 100 的坐标:
result, err := f.SearchSheet("Sheet1", "100")
//例如，在名为 Sheet1 的工作表中搜索 0-9 范围内数值的坐标:
result, err := f.SearchSheet("Sheet1", "[0-9]", true)
```

 

## 补充

实际上，excelize工具功能远比以上介绍的多，可以说可以实现excel软件的几乎全部基础功能，包括数据读写，插入图表、公式，改变样式等等。然而，对于除上面介绍的功能外，似乎都与项目关系不大（想不到使用能用到），直接开一个excel也挺香的x。

对于一些需要写excel的任务，相信数据库都可以实现，而且数据库支持的操作更多，性能更加强大。

excelize官方文档中性能测试如下图。

![](/assets/Wf1wbaFP6o0NIOxxOM3c3WMTnRc.png)

相对数据库，还是差了挺多（我只查了mysql的性能数据），测试环境让对比更明显，相信把机械硬盘随便换个固态，就能碾压了x

![](/assets/YRpBbvjMLoaUi2xGnPocbkTvnyb.png)

![](/assets/Typjbyik7o35HvxA8odcr1aanMh.png)

![](/assets/B572bWJBuoxo1GxzbShc7N7envf.png)

相比而言，我认为excelize的不同在于，操作对象是本地的文件，相对数据库少了导出这一步骤，或是可以作为迁移的中间媒介，将数据库导出为excel文件后，可以使用excel查看，似乎比直接看友好一点。

## 参考

