# 版本控制——Git 的基本使用
Contributor: @XieJiSS

Git作为最基础的版本控制工具，是团队合作的基础。学习路线比较陡峭，但是也正因如此，网上有着非常详细的教程，基本上你遇到的所有问题都可以直接搜到解决方案。

**错误的****Git****操作可能产生不良后果，在真实生产环境下请谨慎操作。**

要求：

- 请至少要看完 Beginning 和 Intermediate，这也是日常协作中最常用到的部分。
    
- 可以根据自身情况看一些 Advanced 的内容。
    
- **练习非常重要**，建议自己创建 GitHub repo 或 bitbucket repo，跟着教程内容操作并记笔记。在 DDL 后，mentor 会查看笔记内容。
    
- 注意：如果不清楚怎么配置 ssh key，建议在学习 Setting up a repository 前，先学习 Intermediate 中的 Git SSH 章节。
    

https://www.atlassian.com/git

### Beginning

[What is Git](https://www.atlassian.com/git/tutorials/what-is-git) 只需要阅读 Version control with Git 小节

[Install Git](https://www.atlassian.com/git/tutorials/install-git)

- 注意：文章最开始有目录，可以点击直接跳转
    

![](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NDMwM2JiZTM4OGNkODg1MDhmMmY1NzRiNzQzMmJjNGRfYzFlZDhTb092S2I2cTNWc0w0dVFwa2l1NTE3dGk0d21fVG9rZW46Ym94Y25TdFFkY1UyVDF1THFjMWRhRzFqWXhlXzE2OTMyMjk5MTg6MTY5MzIzMzUxOF9WNA)

[Setting up a repository](https://www.atlassian.com/git/tutorials/setting-up-a-repository)

- 补充阅读：[忽略特殊文件](https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208)
    

[Saving changes](https://www.atlassian.com/git/tutorials/saving-changes)（可暂时跳过 git stash 部分）

[Syncing](https://www.atlassian.com/git/tutorials/syncing)（仅 git pull 和 git push 部分）

### Intermediate

[Git SSH](https://www.atlassian.com/git/tutorials/git-ssh)

- 对于 SSH，我们建议使用 ed25519 的 key：
    

```Bash
ssh-keygen -t ed25519
```

- 请注意保护你的私钥。公钥（`.pub` 结尾的文件）可以发给别人或上传到 GitHub Settings 中，私钥（无后缀名）永远不要放到网络上。
    

[Inspecting a repository](https://www.atlassian.com/git/tutorials/inspecting-a-repository) 重点：会看 git status 和 git log

[Undoing changes](https://www.atlassian.com/git/tutorials/undoing-changes) 跳过 git clean 部分

[Making a Pull Request](https://www.atlassian.com/git/tutorials/making-a-pull-request)

- 只看 Feature Branch Workflow With Pull Requests 和 Forking Workflow With Pull Requests
    
- 后面有个 Example，不过那个是 Forking Workflow 的，实验室内部一般用 Feature Branch Workflow
    

[Using Branches](https://www.atlassian.com/git/tutorials/using-branches) 跳过 Creating remote branches 部分

### Advanced

[Syncing](https://www.atlassian.com/git/tutorials/syncing)（全部）

[Rewriting history](https://www.atlassian.com/git/tutorials/rewriting-history)

[Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

- 只看 Interactive Rebasing 和 Force-Push 两节
    

[Reset, Checkout, and Revert](https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting) 注意：本章中存在小错误，有的地方两条命令被写在了同一行

[Git Hooks](https://www.atlassian.com/git/tutorials/git-hooks) 了解 pre-commit hook 即可

[Git cherry pick](https://www.atlassian.com/git/tutorials/cherry-pick)

[Git-show](https://www.atlassian.com/git/tutorials/git-show) 直接看 Examples of git-show 小节

### Genius

[ZenithalHourlyRate/learn-git-the-not-so-super-hard-way](https://github.com/ZenithalHourlyRate/learn-git-the-not-so-super-hard-way/blob/master/git-handout.pdf) 复行数十步，豁然开朗

> Zenithal 是 thu 姚班学长

### 补充阅读

[另一份教程 - 分支管理](https://www.liaoxuefeng.com/wiki/896043488029600/896954848507552) 可以着重看一下「解决冲突」一节

UPDATE: [git 配置：工作生活两不误的 includeIf 语法](https://note.cubercsl.site/notes/616be997)

  

### 思考题：corner case （不需要提交）

- [easy] 如何合并多个commit至一个？会有什么副作用？
    
- [easy] git reset --hard --soft --mixed 有什么区别？一般用哪个？
    
- [easy] git reset --hard [sha of some earlier commit] 后，git log中最新几个commit消失。此时如何回到之前的最先commit？你觉得git log和git reflog有何区别？
    
- [advanced] 目前有三个连续的commit ABC，希望将C关于B的修改应用于A上并新建分支。如何做到？
    
- 什么 three-way-merge 
    
- 关于git，你有哪些思考，总结出了哪些best practice？