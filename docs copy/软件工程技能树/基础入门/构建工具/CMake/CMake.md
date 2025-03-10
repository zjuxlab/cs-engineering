---
title: CMake
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-fasnwakyoija5ikb6xicihlunnc-ifdswto0qitzdtkk7pychxqpnvc-y1g4wsc2pioh4gkjq22cjxy7ntc-y1g4ws
sidebar_position: 1
---


# CMake

Author：龙毅豪

https://cmake.org/cmake/help/latest/guide/tutorial/index.html

# CMakeLists.txt 基本格式

```cmake
cmake_minimum_required(VERSION 3.9)
project(answer VERSION 1.0)

add_executable(answer main.cpp answer.cpp)
```

# 生成 & 构建 & 运行命令

- 生成构建目录
    - `cmake -B build      # 生成构建目录，-B 指定生成的构建系统代码放在 build 目录 `         ` ccmake -B build   #ccmake和cmake命令用法一样，但是ccmake会有命令行下的UI`
    -         ```bash
mkdir build_dir   # 自己手动创建构建目录
cd build_dir
cmake ..
```

> 这一步是将CmakeList.txt翻译为makefile，编译后的东西放置在构建目录下

- build
    - `cmake --build build_dir # 执行构建 `    或       `make`
    > cmake 命令运行目录随意，故需要指定build_dir
> make命令运行目录为makefile所在目录

- 运行

`./build/answer      # 运行 answer 程序`

# 基础项目配置

## 指定 C++ 标准

```cmake
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD True)
```

> set()为cmake函数,用于设置值，CMAKE_CXX_STANDARD和CMAKE_CXX_STANDARD 是Cmake内置的变量

## Cmake宏

### configure

```cmake
configure_file(TutorialConfig.h.in TutorialConfig.h)
```

> 在TutorialConfig.h.in中可以使用Cmake内置的宏变量，如`@Tutorial_VERSION_MAJOR@` `@Tutorial_VERSION_MINOR@` 。
> configure_file(x y) 函数将x文件中的Cmake宏替换掉，得到y文件，保存在build目录下

### option

```cmake
option(USE_MYMATH "Use tutorial provided math implementation" ON) #定义一个变量
if(USE_MYMATH)
  add_subdirectory(MathFunctions)
  list(APPEND EXTRA_LIBS MathFunctions)
  list(APPEND EXTRA_INCLUDES "${PROJECT_SOURCE_DIR}/MathFunctions")
endif()
```

在C/C++源码中，也可以使用option中定义的变量

```cmake
#cmakedefine USE_MYMATH   //use cmakedefine to define USE_MYMATH

#ifdef USE_MYMATH
    #include "MathFunctions.h"
#endif
```

> `cmake ../ _DUSE_MYMATH=OFF ` 在生成构建目录时可以指定宏定义 

### list

```cmake
list(APPEND EXTRA_LIBS MathFunctions)  //定义了EXTRA_LIBS，在CmakeList.txt中可以用${EXTRA_LIBS}来引用变量
```

> 一些预定义变量：${PROJECT_BINARY_DIR}  ${PROJECT_SOURCE_DIR}

# 添加自定义库

## 原始方法

- 在库函数所在目录添加CmakeList.txt

```cmake
add_library(MathFunctions mysqrt.cxx)  #add_library(库名 库源代码文件)
```

- 在主目录(main函数所在目录)，添加子目录、链接库、头文件包含目录

```cmake
add_subdirectory( 库函数源码.c所在目录 )  #使库函数编译构建
target_link_libraries(Tutorial.exe PUBLIC 库头文件目录)  #将新库目标链接到可执行目标
target_include_directories(Tutorial.exe PUBLIC                          
                                    "${PROJECT_BINARY_DIR}"
                                    "${PROJECT_SOURCE_DIR}/MathFunctions")  #添加库头文件目录
```

## interface

- 在库函数所在目录添加CmakeList.txt

```cmake
add_library(MathFunctions mysqrt.cxx)
target_include_directories(MathFunctions
          INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}
          )
```

- 主目录就可以省略`target_include_directories(Tutorial.exe PUBLIC    "${PROJECT_SOURCE_DIR}/MathFunctions")  #添加库头文件目录`

`target_link_libraries(Tutorial.exe PUBLIC 库头文件目录)` 不能省略

