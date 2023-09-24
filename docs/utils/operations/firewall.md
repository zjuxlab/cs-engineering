# 防火墙

防火墙可以监控进出网络的通信量，从而完成看似不可能的任务，仅让安全、核准了的信息进入，同时又抵制对企业构成威胁的数据，

### linux上的防火墙
#### iptables
iptables 是集成在 Linux 内核中的包过滤防火墙系统。使用 iptables 可以添加、删除具体的过滤规则，iptables 默认维护着 4 个表和 5 个链，所有的防火墙策略规则都被分别写入这些表与链中。

具体可参考https://blog.csdn.net/daocaokafei/article/details/115091313

#### nftables
nftables 是一个 netfilter 项目，旨在替换现有的 {ip,ip6,arp,eb}tables 框架，为 {ip,ip6}tables 提供一个新的包过滤框架、一个新的用户空间实用程序（nft）和一个兼容层。它使用现有的钩子、链接跟踪系统、用户空间排队组件和 netfilter 日志子系统。

#### ufw
UFW，或称Uncomplicated Firewall，是iptables的一个接口，为不熟悉防火墙概念的初学者提供了易于使用的界面，同时支持IPv4和IPv6，广受欢迎。
#### firewalld
FirewallD 是由红帽发起的提供了支持网络/防火墙 区域(zone)定义网络链接以及接口安全等级的动态防火墙管理工具。它支持 IPv4、IPv6 防火墙设置以及以太网桥接，并且拥有运行时配置和永久配置选项。它也支持允许服务或者应用程序直接添加防火墙规则的接口。

由于 FirewallD 项目本身的自由软件特性，像 Debian Linux 社区发行版已经默认在软件仓库中收录了该防火墙组件软件包。随着各个新 GNU/Linux 发行版中防火墙引擎逐步从 iptables 向 nftables 迁移，FirewallD 是目前唯一能够支持该两种防火墙后端引擎的前端服务组件，用户掌握以后可以方便的进行防火墙配置并很好的规避了从 iptables 向 nftables 迁移带来的学习恐慌。

### 知识点向导
1. 了解防火墙概念
2. 不同防火墙的特性
3. 了解默认防火墙的变化
4. 了解防火墙的基本使用
5. 对端口连通性的检测
6. 不建议同时安装多个防火墙（有继承性的除外）