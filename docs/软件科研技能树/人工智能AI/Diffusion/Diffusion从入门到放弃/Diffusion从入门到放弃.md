---
title: Diffusion从入门到放弃
slug: Diffusion从入门到放弃
sidebar_position: 0
---


# Diffusion从入门到放弃

Author：陈鼎

温馨提示：需要进行diffusion相关模型的训练或微调请先保证拥有24G及以上的显卡

<b>另外，公式较多，可能会有打错的地方，有任何疑问都欢迎评论！</b>

Diffusion模型目前主要用于生成领域，图像生成方面使用最多， 在了解diffusion模型可以先自行简单回顾一下同样主要用于图像生成的<b>生成对抗网络</b>（Generative Adversarial Networks，i.e. GAN），相关内容不记录进入知识树

学习diffusion需要的一点前置知识：马尔可夫过程的基本了解，熟练掌握贝叶斯概率公式，概率论gpa\ge4.5<em>gpa</em>≥4.5(bushi)，了解GAN模型的构建逻辑，KL散度与Cannon信息熵的计算

<b>初学建议</b>：刚接触Diffusion时不要过度关注每个公式的推导过程，先理清完整的模型计算逻辑；复习时去理解推导过程，并结合代码.

## 英文关键词汇总

学术相关英文单词不容易翻译，有些地方可能直接使用英文单词，为了方便阅读，整理部分关键词如下：

<b>Denoising U-Net</b>（去噪U-Net）

<b>Sample</b>（采样过程，一般指去噪过程）

<b>Inference</b>（推理过程，一般指预测噪声）

<b>DDPM</b> --- Denoising Diffusion Probabilistic Model --- 去噪扩散概率模型

<b>DDIM</b> --- Denoising Diffusion Implicit Model --- 去噪扩散隐式模型

<b>Latent Diffusion</b> --- 隐式扩散模型

<b>Classifier-Free Guidance</b>

## <b>Diffusion模式</b>

diffusion模型可以总结为两个过程：加噪，去噪. 即对图像从“拆楼”到“建楼”，“过去”再“回来”这两条路径对比起来进行训练.

想象一下，分别对一张高清图像和一张模糊图像加入一个相同的噪声\epsilon<em>ϵ</em>，哪张图片变模糊地更明显呢？显然是前者（对比更强烈）. 在这个考虑下，我们希望每一步“变糊”的程度相当（减少加噪的次数），所以在对输入图片进行加噪时，注入的噪声应当越来越大，加噪过程最终在原图像近似于正态分布时停止，<b>注意记住这半句话</b>.

因此，对于输入图像$\mathbf{x}_0$，加噪1获得的图像分布计算方法为

$$\mathbf{x}_1 = \sqrt{\alpha_1} \mathbf{x}_0+ \sqrt{1-\alpha_1}\epsilon_1,\quad \epsilon_1\sim\mathcal{N}(0,\mathbf{I})$$

类似的，我们有加噪递推式

$$\mathbf{x}_t = \sqrt{\alpha_{t}} \mathbf{x}_{t-1}+ \sqrt{1-\alpha_{t}}\epsilon_{t},\quad \epsilon_{t-1}\sim\mathcal{N}(0,\mathbf{I})$$

（这里的可以理解为某张图像$\mathbf{x}_t$分布的概率分布）

约定<em>t</em>=1,2,...,<em>T</em>，其中T为扩散总步长（记住他，T是一个可调的超参数）

这样看过来，每一步加入的都是随机正态噪声，是互不相同的，这样不利于我们计算，需要分别获取T个随机正态噪声，于是使用了<b>参数重整化</b>技巧，展示如下

$$\mathbf{x}_{t+1} = \sqrt{\alpha_{t+1}} \mathbf{x}_{t}+ \sqrt{1-\alpha_{t+1}}\epsilon_t  = \sqrt{\alpha_t\alpha_{t+1}} \mathbf{x}_{t-1}+ \sqrt{1-\alpha_{t+1}}\epsilon_t +  \sqrt{\alpha_{t+1}-\alpha_{t+1}\alpha_{t}}\epsilon_{t-1}$$

<b>参数重整化</b>：合并噪声项$\epsilon_t$和$\epsilon_{t-1}$噪声

$$\sqrt{1-\alpha_{t+1}}\epsilon_t +  \sqrt{\alpha_{t+1}-\alpha_{t+1}\alpha_{t}}\epsilon_{t-1} = \sqrt{1-\alpha_{t+1}}\mathcal{N}(0,\mathbf{I}) + \sqrt{\alpha_{t+1}-\alpha_{t+1}\alpha_{t}}\mathcal{N}(0,\mathbf{I}) \\= \mathcal{N}(0, (1-\alpha_{t+1}\alpha_{t}\mathbf{I})) = \sqrt{1-\alpha_{t+1}\alpha_{t}}\epsilon$$

归纳可知经过<b>参数重整化</b>的加噪递推式表示为

$$\mathbf{x}_t = \sqrt{\bar{\alpha_t}} \mathbf{x}_0+ \sqrt{1-\bar{\alpha_t}}\epsilon_t,\quad \epsilon_t\sim\mathcal{N}(0,\mathbf{I})$$

这里$\bar{\alpha}_t = \prod_{i=1}^t\alpha_i$

遍历<em>t</em>=1,2,...<em>T</em>就可以获得各个阶段加噪的$\mathbf{x}_t$，注意，这里的$\alpha_t(t=1,2,...,T)$为可调超参数，现在<b>学术研究</b>中常取为递增的等差数列（末项为1.0），或按照$\alpha_t = \frac{1}{1+e^{-t}}$取值

之后进行的去噪过程，就是需要我们预测各个阶段的噪声$\epsilon_t$从而恢复图像

<em>总结</em>：

读完本一章节，应该对扩散模型有一个基本认知，整体从“加噪”到“去噪”的思路也类似于GAN中对抗的过程.

然而，如果有所思考可以发现，上一节中的模型实际上是非常简陋的，按照其描述，我们训练出的模型为$\epsilon_\theta^{(t)}$，其中$\theta$为权重，$t$为输入，可以获得不同步长下的预测图像为

$$\mathbf{x}_{t-1} = \sqrt{\bar{\alpha}_{t-2}}\bar{\mathbf{x}}_0 + {
    \sqrt{1-\bar{\alpha}_{t-2}}\cdot\epsilon_\theta(t,\mathbf{x}_0)} = \sqrt{\bar{\alpha}_{t-2}}{\left(\frac{\mathbf{x}_t-\sqrt{1-\bar{\alpha}_{t-1}}\epsilon_\theta(t,\mathbf{x}_t)}{\sqrt{\bar{\alpha}_{t-1}}}\right)} + {
    \sqrt{1-\bar{\alpha}_{t-2}}\cdot\epsilon_\theta(t,\mathbf{x}_t)}$$

遍历开始时的$\bar{\mathbf{x}}_T$取为$\epsilon_0\sim\mathcal{N}(0,\mathbf{I})$（加噪在原图像近似转化为正态分布的噪声时停止，因此认为逆向去噪过程从正态噪声开始）

但这样相当于对整体数据集做一个不同层次的概率拟合，只能按照时间步长的不同输出预测图像，还没有生成功能（按照人类意识指令合成图像）

不同论文中使用的表示方法也不同，推一篇

## <b>DDPM</b>

DDPM（去噪扩散概率模型）在加噪、去噪过程中加入了限制性的条件概率，即为上一节中$\epsilon_\theta^{(t)}$再添加输入项使得模型可以遵循人类意志

我们需要为预测的噪声加入一个先验，可以暂时考虑成$\epsilon_\theta(t,\mathbf{x}_0)$

在“加噪”过程中，输入$\mathbf{x}_t$实际上是我们给定了先验为$\mathbf{x}_0$的概率分布，现在我们记为$q(\mathbf{x}_t|\mathbf{x}_0)$，经过参数重整化依然得到加噪过程概率分布的表达式为

$$q(\mathbf{x}_t|\mathbf{x}_0) = \sqrt{\bar{\alpha_t}} q(\mathbf{x}_0)+ \sqrt{1-\bar{\alpha_t}}\epsilon_t,\quad \epsilon_t\sim\mathcal{N}(0,\mathbf{I})$$

加噪递推式的概率表达为

$$q(\mathbf{x}_t|\mathbf{x}_{t-1}, \mathbf{x}_0) = \sqrt{\alpha_{t}} q(\mathbf{x}_{t-1}|\mathbf{x}_0)+ \sqrt{1-\alpha_{t}}\epsilon_{t},\quad \epsilon_{t-1}\sim\mathcal{N}(0,\mathbf{I})$$

观察这个式子，我们其实在加噪过程中约定了$\mathbf{x}_t$只与$\mathbf{x}_{t-1}$有关，所以这实际上是一个马尔可夫过程，所以将递推式中的$q(\mathbf{x}_t|\mathbf{x}_0)$改写为$q(\mathbf{x}_t|, \mathbf{x}_{t-1}\mathbf{x}_0)$，写成分布的形式，即

$$q(\mathbf{x}_t|, \mathbf{x}_{t-1}, \mathbf{x}_0)\sim\mathcal{N}(\sqrt{\alpha_t}\mathbf{x}_{t-1}, (1-\alpha_t)\mathbf{I})$$

又

$$q(\mathbf{x}_{t-1}|\mathbf{x}_0)\sim\mathcal{N}(\sqrt{\bar{\alpha_t}}\mathbf{x}_{0}, (1-\bar{\alpha_t})\mathbf{I})$$

计算预测过程中所需的概率分布

$$q(\mathbf{x}_{t-1}|\mathbf{x}_{t}, \mathbf{x}_0) = \frac{q(\mathbf{x}_t|\mathbf{x}_{t-1}, \mathbf{x}_0)q(\mathbf{x}_{t-1}|\mathbf{x}_0)}{q(\mathbf{x}_{t}|\mathbf{x}_0)} \\ \propto\mathcal{N}(\frac{\sqrt{\alpha_t}(1-\bar{\alpha}_t)\mathbf{x}_t + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)\mathbf{x}_0
}{1-\bar{\alpha}_t}, \frac{(1-\alpha_t)(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t}\mathbf{I})$$

这里的具体推导过程不写出，主要思路为将正态分布用概率密度函数代入舍去前置的常数项

为方便后续表述，我们记

$$\mu_q(t) = \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_t)\mathbf{x}_t + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)\mathbf{x}_0
}{1-\bar{\alpha}_t},\quad \sigma_q(t) = \frac{(1-\alpha_t)(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t}$$

以上，是加入$\mathbf{x}_0$先验时假设加入的正态噪声已知的情况下进行逆向计算初始图像的过程（注意这里$\sigma_q(t)$是常数）

在此基础上，我们需要使用模型预测噪声进而计算出$\mathbf{x}_0$的值，在计算时依然认为起始点$\mathbf{x}_t=\epsilon\sim\mathcal{N}(0,\mathbf{I})$，因此预测值为

$${\mu}_\theta(t)=\frac{\sqrt{\alpha_t}(1-\bar{\alpha}_t)\mathbf{x}_t + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)\bar{\mathbf{x}}_0
}{1-\bar{\alpha}_t}$$

这里$\bar{\mathbf{x}}_0 = \bar{\mathbf{x}}_\theta(\mathbf{x}_0^*, t)$，$\mathbf{x}_0^*$表示通过人为指定信息加入的针对$\mathbf{x}_0$的先验（以编码向量的形式，具体见后文），预测目标具有相同形式

$$p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)\sim\mathcal{N}(\bar{\mu}_q(t), \sigma_q(t)\mathbf{I})$$

使用KL散度对“加噪”和“去噪”两个概率分布进行拟合，KL散度计算方式为

$$D_{KL}(\mathcal{N}(x:\mu_x,\Sigma_x) || \mathcal{N}(y:\mu_y,\Sigma_y))= \frac{1}{2}[\log \frac{|\Sigma_y|}{|\Sigma_x|} - d + tr(\Sigma_y^{-1}\Sigma_x) + (\mu_y-\mu_x)^T\Sigma_y^{-1}(\mu_y-\mu_x)]$$

其中<em>d</em>表示协方差矩阵的维度

计算优化目标

$$\argmin_\theta D_{KL}(q(\mathbf{x}_{t-1}|\mathbf{x}_{t}, \mathbf{x}_0) \ || \ p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)) = \argmin_\theta \frac{1}{2\sigma_q^2(t)}[||\mu_\theta-\mu_q||_2^2]$$

进一步带入原优化目标为

$$\argmin_\theta \frac{1}{2\sigma_q^2(t)} \frac{\bar{\alpha}_{t-1}(1-\alpha_t)^2}{(1-\bar{\alpha}_t)^2} [||\bar{\mathbf{x}}_\theta(\mathbf{x}_0^*, t) - \mathbf{x}_0||_2^2]$$

即比较每一个扩散步骤中产生的图像和原始图像

更进一步，注意到二次范数中的两项分别由噪声$\epsilon_\theta$和$\epsilon_0$（这里$\mathbf{x}_0$由加噪过程中的已知噪声推出），因此带入去噪的计算递推式可转化为

$$\argmin_\theta \frac{1}{2\sigma_q^2(t)} \frac{(1-\alpha_t)^2}{(1-\bar{\alpha}_t)\alpha_t} [||\epsilon_0 - \bar{\epsilon}_\theta(\mathbf{x}_t, t)||_2^2]$$

然后再求期望，全局优化为

$$\argmin_\theta \mathbb{E}_{t\sim U[2,T]} [ \mathbb{E}_{q(\mathbf{x}_t | \mathbf{x}_0)}[ D_{KL}( q(\mathbf{x}_{t-1}|\mathbf{x}_{t}, \mathbf{x}_0) \ || \ p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t) ) ] ]$$

具体完整的从VAE+Diffusion的过程推导、以及前文中一些省略掉的公式推导可以参考[Understanding Diffusion Models：A Unified Perspective](https://arxiv.org/abs/2208.11970)

以上部分其实还省略了很多内容，例如全局优化目标的得出. 实际上整个diffusion是以VAE为基础，我们最大化ELBO(证据下界, Evidence Lower Bound) $p(\mathbf{x})$，上面的这个二重期望值实际上是ELBO中的唯一非常数项且且系数为负，因此转化成了优化这个期望的问题；更进一步，去计算了其中的KL散度.

然后我们从宏观层面看，采样步骤中每迭代一次实际上就是对期望值优化(变小)一次，对ELBO增大一次；整个扩散过程就像是在对期望值做梯度下降（因为优化KL散度时用的就是梯度下降），因此实际上可以把我们的噪声表示为

$$\epsilon(t,\mathbf{x}_t)= \nabla \log p(\mathbf{x})$$

以上只是一种理解方式，严格的推导依旧参考[Understanding Diffusion Models：A Unified Perspective](https://arxiv.org/abs/2208.11970)及其参考文献.

另外，Stable-Diffusion以及学术界主流的噪声预测模型使用U-Net(虽然后来证实transformer效果更优)

## <b>DDIM</b>

在熟悉以上过程之后，我们其实可以指导扩散的去噪过程DDPM是基于马尔可夫过程进行推导的一个概率公式；正是因为这一过程的马尔可夫性，在inference(推理)过程中必须逐步采样，且需要设置T为一个极大的值，这很大程度上限制了生成速度. DDIM方式实现了推理过程的去马尔科夫化，加速了推理过程. （目前最快的是由清华团队提出的DPM-Solver: A Fast ODE Solver for Diffusion, 看到有hxd写了，可以直接过去看，Stable-Diffusion2.1里已经在用了，但其实）

我们直接展示一下DDPM和DDIM中不同的两个分布

<b>DDPM</b>:

$$q(\mathbf{x}_{t-1}|\mathbf{x}_{t}, \mathbf{x}_0) = \frac{q(\mathbf{x}_t|\mathbf{x}_{t-1}, \mathbf{x}_0)q(\mathbf{x}_{t-1}|\mathbf{x}_0)}{q(\mathbf{x}_{t}|\mathbf{x}_0)} \\ \propto\mathcal{N}(\frac{\sqrt{\alpha_t}(1-\bar{\alpha}_t)\mathbf{x}_t + \sqrt{\bar{\alpha}_{t-1}}(1-\alpha_t)\mathbf{x}_0
}{1-\bar{\alpha}_t}, \frac{(1-\alpha_t)(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t}\mathbf{I})$$

<b>DDIM</b>:

$$q(\mathbf{x}_{t-1}|\mathbf{x}_{t}, \mathbf{x}_0)  = \mathcal{N}
(\sqrt{\alpha_{t-1}\mathbf{x}_0} + \sqrt{1-\alpha_{t-1}-\sigma_t^2}\cdot \frac{\mathbf{x}_t - \sqrt{\alpha_t}\mathbf{x}_0}{\sqrt{1-\alpha_t}}, \sigma_t^2\mathbf{I})$$

这里\sigma_t<em>σt</em>是个可调参数

我们再看推理采样过程的差异

<b>DDPM</b>:

$$\mathbf{x}_{t-1} = \sqrt{\alpha}_{t-1}{\left(\frac{\mathbf{x}_t-\sqrt{1-\alpha_t}\epsilon_\theta(t,\mathbf{x}_t)}{\sqrt{\alpha}_t}\right)} + {
    \sqrt{1-\alpha_t}}\cdot \mathbf{z} ,\quad where \mathbf{z}\sim\mathcal{N}(0,\mathbf{I}) \quad if \quad t>1\quad else\quad \mathbf{0}$$

<b>DDIM</b>:

$$\mathbf{x}_{t-1} = \sqrt{\alpha}_{t-1}\underbrace{\left(\frac{\mathbf{x}_t-\sqrt{1-\alpha_t}\epsilon_\theta(t,\mathbf{x}_t)}{\sqrt{\alpha}_t}\right)}_{“predicted \ \ \mathbf{x}_0”} + \underbrace{
    \sqrt{1-\alpha_t-\sigma_t^2}\cdot\epsilon_\theta(t,\mathbf{x}_t)}_{“direction \ pointing \ to \ \mathbf{x}_0”}  + \underbrace{\sigma_t\epsilon_t}_{“random \ noise”}$$

这里看实际上就是额外引入了一个随机噪声

### <b>相关代码</b>

以Stable-Diffusion为例，git clone之后在ldm/models/diffusion/目录中，分别在ddim.py和ddpm.py中，主要分别看class DDPM和class DDIMSampler下面的p_sample函数

## <b>Guidance</b>

### <b>Classifier Guidance</b>

最早的Diffusion模型实际上在生成时需要额外训练一个分类器，用上面的那个梯度表示，在DDIM中，一个完成训练的Denoising U-Net中有

$$\epsilon_\theta(\lambda, \mathbf{z}_\lambda, \mathbf{c}) \approx \nabla_{\mathbf{z}_\lambda}\log p(\mathbf{z}_\lambda|\mathbf{c})$$

表示在以约束$\mathbf{c}$为条件在采样推理步骤为$\lambda$时的噪声预测值，分类器的引导方式为

$$\tilde{\epsilon}_\theta(\lambda, \mathbf{z}_\lambda, \mathbf{c})
= \epsilon_\theta(\lambda, \mathbf{z}_\lambda, \mathbf{c}) - w\sigma_\lambda\nabla_{\mathbf{z}_\lambda}\log p(\mathbf{z}_\lambda|\mathbf{c}) \approx -\sigma_\lambda[\log p(\mathbf{z}_\lambda|\mathbf{c}) + w\log p(\mathbf{z}_\lambda|\mathbf{c})]$$

(这里$\tilde{\epsilon}$只是用来区别上面一个式子中的$\epsilon$，为实际推理采样时使用的噪声值)

听取一下贝叶斯爷爷的话，易知

$$\tilde{p}_\theta(\mathbf{z}_\lambda, \mathbf{c}) \propto p_\theta(\mathbf{z}_\lambda|\mathbf{c})p_\theta(\mathbf{c}|\mathbf{z}_\lambda)^w \Rightarrow p_\theta(\mathbf{z}_\lambda|\mathbf{c})p_\theta(\mathbf{c}|\mathbf{z}_\lambda)^{w} \propto p_\theta(\mathbf{z})p_\theta(\mathbf{c}|\mathbf{z}_\lambda)^{w+1}$$

这里使用$\tilde{p}_\theta$同样是为了防止混淆模型

进而

$$\epsilon_\theta(\mathbf{z}_\lambda)-(w+1)w\sigma_\lambda\nabla_{\mathbf{z}_\lambda}\log p_\theta(\mathbf{c}|\mathbf{z}_\lambda)\approx -\sigma_\lambda\nabla_{\mathbf{z}_\lambda}[\log p(\mathbf{z}_\lambda) + w\log p(\mathbf{c}|\mathbf{z}_\lambda)] \\ = -\sigma_\lambda\nabla_{\mathbf{z}_\lambda}[\log p(\mathbf{z}_\lambda|\mathbf{c}) + w\log p(\mathbf{c}|\mathbf{z}_\lambda)]$$

这是Classifier Guidance，这里的$\mathbf{c}$需要通过分类器给出

### <b>Classifier-Free Guidance</b>

为了增强模型的生成能力以及多样性，使用Classifier Guidance需要训练一个广泛的分类器，于是后来有佬推出了Classifier-Free Guidance.

先定义无类别的情况

$$\epsilon_\theta(\mathbf{z}_\lambda) = \epsilon_\theta(\mathbf{z}_\lambda, \mathbf{c}=\varnothing)$$

使用线性加权的形式融合有条件与无条件的情况

$$\tilde{\epsilon}_\theta(\mathbf{z}_\lambda,\mathbf{c}) = (1+w)\epsilon_\theta(\mathbf{z}_\lambda,\mathbf{c}) - w\epsilon_\theta(\mathbf{z}_\lambda)$$

一般的Classifier-Free Guidance表达形式为

$$\tilde{\epsilon}(\mathbf{z}_t,\mathbf{c}) = \epsilon_\theta(\mathbf{z}_t, \varnothing) + s\cdot ({\epsilon}(\mathbf{z}_t,\mathbf{c}) - \epsilon_\theta(\mathbf{z}_t, \varnothing))$$

(就是上面那个式子)

(证明这一形式与Classifier Guidance等价的过程暂时省略，过两天ddl没了再补上)

### <b>多元CFG-Guidance</b>

这个了解一下就可以，第一次看到是在论文[InstructPix2Pix: Learning to Follow Image Editing Instructions](https://arxiv.org/abs/2211.09800)里的二元形式，有点像容斥原理也很好理解

$$\tilde{\epsilon}_\theta(\mathbf{z}_t,\mathbf{c}_1,\mathbf{c}_2) = {\epsilon}_\theta(\mathbf{z}_t,\varnothing, \varnothing) \\
+s_1\cdot({\epsilon}_\theta(\mathbf{z}_t,\mathbf{c}_1, \varnothing) - {\epsilon}_\theta(\mathbf{z}_t,\varnothing, \varnothing))\\
+s_2\cdot({\epsilon}_\theta(\mathbf{z}_t,\mathbf{c}_1,\mathbf{c}_2) - {\epsilon}_\theta(\mathbf{z}_t,\mathbf{c}_1, \varnothing))$$

## <b>了解一下Control Net</b>

写不动了，润了（过两天ddl没了接着补）

