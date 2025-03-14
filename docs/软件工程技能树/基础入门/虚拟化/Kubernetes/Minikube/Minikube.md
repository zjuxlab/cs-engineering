---
title: Minikube
slug: Minikube
sidebar_position: 0
---


# Minikube

Author：农玉俊

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>⛵</div>
<p>Minikube 是直接在本地工作站上运行一体化或多节点本地 Kubernetes 集群的最简单、最灵活和流行的方法之一。</p>
<p>Minikube易于学习，小巧方便，适合初学者。</p>
</div>

此外，你也可以从头开始安装Kubernetes或使用aws等云供应商提供的集群，此处略。

这里使用MacOS的Homebrew包管理器安装Minikube：

```bash
brew install minikube
```

Windows、Linux详情请看：[minikube start](https://minikube.sigs.k8s.io/docs/start/)

使用 `minikube start` 命令启动 Minikube命令启动 Minikube

![](/assets/YskpbRsk1oG6YKxxiTHcQgoCn1b.png)

```bash
> minikube status minikube 

type: Control Plane 
host: Running 
kubelet: Running 
apiserver: Running 
kubeconfig: Configured
```

```bash
> minikube stop

✋  Stopping node "minikube"  ...
🛑  正在通过 SSH 关闭“minikube”…
🛑  1 node stopped.
```

`minikube profile` 命令允许我们以表格格式的输出查看所有集群的状态。

```bash
> minikube profile list

|----------|-----------|---------|--------------|------|---------|---------|-------|--------|
| Profile  | VM Driver | Runtime |      IP      | Port | Version | Status  | Nodes | Active |
|----------|-----------|---------|--------------|------|---------|---------|-------|--------|
| minikube | docker    | docker  | 192.168.49.2 | 8443 | v1.26.3 | Running |     1 | *      |
|----------|-----------|---------|--------------|------|---------|---------|-------|--------|
```

# <b>Accessing Minikube</b>

任何健康运行的 Kubernetes 集群都可以通过以下任意一种方法访问：

- Command Line Interface (CLI) tools and scripts
- Web-based User Interface (Web UI) from a web browser
- APIs from CLI or programmatically

这些方法适用于所有 Kubernetes 集群。

## <b>Command Line Interface (CLI)</b>

### <b>kubectl</b>

kubectl 是 Kubernetes 命令行界面 (CLI) 客户端，用于管理集群资源和应用程序。它非常灵活且易于与其他系统集成，因此它可以独立使用，也可以作为脚本和自动化工具的一部分使用。一旦为 kubectl 配置了所有必需的凭据和集群访问点，就可以从任何地方远程使用它来访问集群。这里是安装教程：[Install Tools](https://kubernetes.io/docs/tasks/tools/)

### <b>kubectl Configuration File</b>

要访问 Kubernetes 集群，kubectl 客户端需要control plane node endpoint和适当的credentials，以便能够与控制平面节点上运行的 API Server 安全地交互。

启动 Minikube 时，启动过程默认会在 .kube 目录（通常称为 kubeconfig）内创建一个配置文件 config，该目录位于用户的主目录中。配置文件包含 kubectl 所需的所有连接详细信息。

```bash
kubectl config view
```

```text
apiVersion: v1
clusters:
- cluster:
    certificate-authority: /home/student/.minikube/ca.crt
    server: https://192.168.99.100:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: /home/student/.minikube/profiles/minikube/client.crt
    client-key: /home/student/.minikube/profiles/minikube/client.key
```

kubeconfig 包括 API Server 的端点服务器：[https://192.168.99.100:8443](https://192.168.99.100:8443/) 以及 minikube 用户的客户端身份验证密钥和证书数据。

安装 kubectl 后，我们可以使用 kubectl cluster-info 命令显示有关 Minikube Kubernetes 集群的信息：

```bash
kubectl cluster-info
```

```text
Kubernetes master is running at https://192.168.99.100:8443
KubeDNS is running at https://192.168.99.100:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

## <b>Web-based User Interface (Web UI)</b>

<b>Kubernetes Dashboard</b>提供了一个基于 Web 的用户界面 (Web UI)，用于与 Kubernetes 集群交互，以管理资源和容器化应用程序。

在使用仪表板之前，我们需要启用Dashboard插件以及metrics-server插件

```bash
minikube addons enable metrics-server
minikube addons enable dashboard
minikube dashboard
```

![](/assets/ER2KbrrUBo4ws4xZYs1c1cC8nOc.png)

## <b>APIs</b>

### Concept

Kubernetes 控制平面的主要组件是 API Server，负责公开 Kubernetes API。 API 允许operators和users直接与集群交互。使用 CLI 工具和仪表板 UI，我们可以访问在控制平面节点上运行的 API 服务器来执行各种操作来修改集群的状态。

拥有所需凭据的代理和用户可以通过其endpoints访问 API 服务器。

下面，我们可以看到 Kubernetes 的 HTTP API 目录树的表示：

![](/assets/BXT4bSdW6oAgOcx3keWchFppnUd.png)

Kubernetes 的 HTTP API 目录树可以分为三种独立的组类型：

- <b>Core group (/api/v1)</b>
This group includes objects such as Pods, Services, Nodes, Namespaces, ConfigMaps, Secrets, etc.
- <b>Named group</b>
This group includes objects in <b>/apis/NAME/VERSION</b> format. These different API versions imply different levels of stability and support:
    - <em>Alpha level</em> - it may be dropped at any point in time, without notice. For example, <b>/apis/batch/v2alpha1</b>.
    - <em>Beta level</em> - it is well-tested, but the semantics of objects may change in incompatible ways in a subsequent beta or stable release. For example, <b>/apis/certificates.k8s.io/v1beta1</b>. **
    - <em>Stable level</em> - appears in released software for many subsequent versions. For example, <b>/apis/networking.k8s.io/v1</b>.

- System-wide
This group consists of system-wide API endpoints, like <b>/healthz</b>, <b>/logs</b>, <b>/metrics</b>, <b>/ui</b>, etc.

### <b>APIs with </b><b>kubectl proxy</b>

发出 `kubectl proxy` 命令，kubectl 向控制平面节点上的 API 服务器进行身份验证，并使服务在默认代理端口 8001 上可用。

```bash
kubectl proxy    # 后台运行：kubectl proxy &
```

当`kubectl proxy`运行时，我们可以通过默认代理端口 8001 通过本地主机向 API 发送请求

```bash
curl http://localhost:8001/
```

