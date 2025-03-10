---
title: Git 配置
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-fasnwakyoija5ikb6xicihlunnc-jahiwo9tziyhqskzxoyc1wfrntb-h1tyw44vzixzl5kh6w2cnn5hn5g-h1tyw4
sidebar_position: 0
---


# Git 配置

Author：NA

For Windows 10+、MacOS and Linux - 你的电脑上会预装 OpenSSH 或类似物。并且电脑上应当有支持 SOCKS5 协议的代理工具，假设它监听在 1080 端口。

1. 复习 Git Workflow 中的这部分：

<img src="/assets/P3VbbP5lcoKf1vx5jsAcmxfznPb.png" src-width="1548" src-height="478" align="center"/>

1. https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent
2. [Adding a new SSH key to your GitHub account - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
3. 配置走代理：

```shell
git config --global http.proxy "socks5://127.0.0.1:1080"
git config --global https.proxy "socks5://127.0.0.1:1080"
```

1. `git clone git@github.com:username:repo.git` ，开工

