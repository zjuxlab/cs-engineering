---
title: Git 使用
slug: Git 使用
sidebar_position: 1
---


# Git 使用

Author：NA

## 一、速查版

### 1.1 配置信息

```json
git config --global user.name <your name> // 修改用户名
git config --global user.email <email@example.com> // 修改邮箱
```

### 1.2 查看类

```json
git status  // 查看仓库当前状态
git diff    // 比较两个文件的不同
git log     // 查看版本控制系统的历史记录
git reflog  // 查看每一次的命令
```

### 1.3 常见操作

```json
git branch  // 查看所以分支
git branch <branch_name> // 创建新的分支
git switch <branch_name> // 切换分支
git checkout -b <branch_name> // 创建+切换分支
git branch -d <branch_name>   // 删除分支
git stash   // 保存当前的工作区与暂存区的状态
```

### 1.4 合作项目中的标准流程

```json
git checkout master // 切换到 master分支
git pull  // 从远程库 origin 拉出最新的代码
git checkout -b <branch_name>  // 新建分支
git add --all
git commit -m "commit" // commit 之后就不能用 git stash 了，只能cv了
git push
```

