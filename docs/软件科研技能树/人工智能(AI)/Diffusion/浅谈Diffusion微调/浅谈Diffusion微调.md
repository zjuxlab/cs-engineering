---
title: 浅谈Diffusion微调
slug: ruan-jian-ke-yan-ji-neng-shu/ren-gong-zhi-neng-ai/diffusion/qian-tan-diffusion-wei-tiao/qian-tan-diffusion-wei-tiao
sidebar_position: 1
---

# 浅谈Diffusion微调

Author：陈哲恺

> 本文需要对diffusion具有一定的基本了解，可以参考[Diffusion从入门到放弃](ZCWKwFPoFi5EfNkMrozc2pMrnBf)中的内容进行了解

# 前言

众所周知，最近的大模型都是十分庞大的，且不说个人的GPU显存是否能满足对训练模型的需求，单就考虑到Diffusion的参数量，这个训练过程就是十分困难的。据说，google用数百张A100训练diffusion用了三个月（不太记得了）。

考虑到这种训练成本，为了一些目的再特意去训练一个模型显然是不现实的，因此一个相关的研究方向就是如何对diffusion的现有参数进行微调，即使用有限的数据样本和训练时间，对模型参数进行调整，以实现特定的目的。

本文将对于一些我了解的微调的方法进行介绍，具体包括两方面，一是额外功能的实现，二是few-shot实现对特定概念的学习。如果你玩stable-diffusion-webui的话，本文也将对于理解各种few-shot的兼容性有一定帮助。

# 定义

为了方便一些理解，本文对如下内容做出定义（并不严谨）。

- Diffusion过程
    - tokenizer：将文字表示转换为数字表示
    - text_encoder：将数字映射到一个高维的表示空间
    - vae：进行维度转换
    - unet：进行信息采样
    - scheduler（sampler）：用于从噪声到图像的重建

- 额外功能的实现：指在原有功能（比如text2img）的基础上，允许额外信息的输入，比如使用人物框指定人物位置
- few-shot对特定概念的学习：指对于一些没有的概念进行学习，比如在一个基础的模型中，是不知道“亚丝娜”这个动漫人物的，但是通过有限的调整可以让它学到这个概念

# 具体内容

## 额外功能的实现

### Controlnet

https://arxiv.org/abs/2302.05543

说到额外功能的实现，肯定是不能不说controlnet的，虽然在controlnet之前也有一些相关的研究成果，但是我感觉效果都不是很好，而controlnet的成果确实是非常有效且实用。

<img src="/assets/Jp74bmz10orqR6xXLzxcwuymnmf.png" src-width="714" src-height="420" align="center"/>

上图是在V1版本的论文中的基于额外的人物骨架输入得到的生成结果，可以看到，生成内容使用了额外的输入约束，实现了对于姿势的控制。除了人物骨架的输入，controlnet还能做到对草稿、线描、色块、景深等输入的约束控制（好像最新的成果有基于光影的约束控制）。

其网络结构并不算复杂，可以简单的用下图表示。

<img src="/assets/ToaxbYGK0oUN78xJWcmcSXVAnTc.png" src-width="795" src-height="702" align="center"/>

简单来说就是在原有的diffusion的<b>encoder</b>上额外<b>加了一个对于额外约束进行学习</b>的网络，这个网络的参数拷贝自原有encoder参数，通过锁定原有参数，实现在不影响原有网络功能的基础上进行额外功能的学习。对于每一层，都通过一个zero convolution把计算结果加到middle和decoder上进行计算，从而作用于生成结果。

有三个需要关注的点，一是对于额外的网络输入并不是单纯的额外约束，是将额外约束通过zero convolution转换之后与input相加输入的；二是额外网络的参数拷贝自原有encoder和middle，这被证明比单纯的初始化具有更好的效果；三是相加之前需要经过一个zero convolution，我个人的理解是为了进行一些参数空间的转换，但是否是必要的好像没在论文中给出明确的说明。

### T2I-Adapter

https://arxiv.org/abs/2302.08453

T2I在实现细节上和controlnet十分相似，它俩的发布时间也十分相近。下面是T2I的成果。

<img src="/assets/YWwhbe6oooBu7NxHwOOc9wssnXb.png" src-width="1338" src-height="831" align="center"/>

可以看到，T2I也可以做到使用约束进行不错的生成。从上图也可以看到，<b>T2I是支持多条件约束的</b>，这是与<b>Controlnet只支持单条件输入</b>有区别的，这种区别的原因也来自于二者的具体实现方式。下图是T2I-Adapters的原理

<img src="/assets/DBSob6OaKorro0xB4BGcESIFnSb.png" src-width="1482" src-height="730" align="center"/>

我在上文写过，controlnet是需要input参与额外网络的训练的，但是T2I是不需要的。它直接接受一个额外约束，通过一个类似Unet的Encoder的部分进行条件的编码，<b>乘以权重相加并直接将条件编码加到Unet的Encoder结果中</b>（从图上看是不加到Middle的，但是具体加不加不太清楚），而<b>controlnet是将约束加到middle和decoder部分</b>的，并且不存在多条件的相加部分。所以T2I实现了对多条件的处理，但是controlnet没有。

直觉来说，controlnet应该也能实现对多条件的支持，但是并没有相关的成果，我猜可能是因为其实现方法是加到middle和decoder的，并不能像加到encoder一样实现很好的效果？从结构上来看，T2I和Controlnet是不冲突的，理论上应该可以融合的很好。似乎webui也是同时支持使用两种的。

### GLIGEN

https://arxiv.org/abs/2301.07093

前两种额外功能的实现都是在基础网络上，通过添加额外的结构进行实现的，而GLIGEN的实现方法略有不同，他是一种<b>侵入原有网络</b>的设计。还是先看一下GLIGEN的成果。

<img src="/assets/WnjMbCRkkoSIPJxUCNXcFnLCnUb.png" src-width="1382" src-height="903" align="center"/>

可以看到，GLIGEN除了允许了额外的条件输入，在此之上，还允许了对额外条件的更具体的控制。以(a)中的结果为例，GLIGEN是<b>支持对不同的物体框指定不同的生成物</b>的，这使得该网络有了更强的控制能力。

相对于前两者比较直观的额外网络，该网络的设计要复杂一些，以下为两张子网络的结构图。

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[49%]" width-ratio="49">
<img src="/assets/P8IpbMiICovCedxrnnGczPbBnde.png" src-width="600" src-height="316" align="center"/>
</div>
<div class="w-[50%]" width-ratio="50">
<img src="/assets/OC9fbbBRvoZpmkxiahkcptj7nue.png" src-width="1266" src-height="660" align="center"/>
</div>
</div>

左侧是对于图像信息和条件对应的grounding tokens网络，右边是修改后的UNet网络。

在这个工作中，主要是对以下几部分进行了修改

- <b>ground的采样网络</b>：从ground输入中得到一个与基础网络input在一个维度的输入
- <b>ground_tokenizer</b>：把caption和ground的关联信息进行编码，得到另一个对齐的条件
- <b>UNet第一层</b>：为了同时兼容caption输入和ground输入，对第一层的卷积进行了“翻倍”处理，修改了输入的维度以允许ground的输入
- <b>Fuser</b>：在每个CrossAttn Block中，插入一个Gated Self-Attention层（由一个Attention层和一个可学习的门控参数组成）。固定CrossAttn Block的层，使该Fuser层主要学习ground输入，并允许通过一个人为控制的$\beta$参数从而决定是否使用该门控层对于ground的输入处理（用于控制sample过程中ground条件与生成内容的平衡）

其中最为关键的应该就是Fuser层了，第一次在diffusion中看到这种门控设计，感觉还是很巧妙的，但是也不确定是否有门控的必要🤔。

与前两者相比，这种设计对基础模型的侵入是十分大的，我猜也需要更长的训练来work（没有实际试过），不过结果也是有明显优势的，可以进行更可控的生成。不过因为其侵入的设计方式，感觉也存在不小的兼容性问题。

## 对特定概念的学习

以下几种方法（除了mix-of-show）在diffusers的example中均有简洁的实现，可以作为参考

对特定概念的学习有一个基本概念就是用一个为被定义的字符（比如“*”）作为prompt指代一个概念，然后让模型去学习这个概念并进行生成

需要注意的是，这个<b>概念并不一定是一个人或物体，也可代指一种风格</b>

### Dreambooth

https://arxiv.org/abs/2208.12242

<img src="/assets/XoUBbiheDog4XFxZXbxcjI4fnUF.png" src-width="1292" src-height="402" align="center"/>

Dreambooth是最早的一种few-shot方法了（应该），其思路也十分朴素，就是单纯的对diffusion中较为核心的module全部进行微调，包括text_encoder、vae和unet。简单粗暴，<b>直接全部`requires grad (True)`就完事</b>。当然，具体是否对某个module进行训练是可控的。

这种训练方式使得dreambooth可以很快的学到不错的成果，对于数据输入的要求也不高，但可以预见的是，这种方式会使得模型受到影响，对于其他的内容生成可能出现不好的结果。不过就概念学习本身来说仍然是一种不错的方法。

这种方法还有一个很大的问题，就是其基本可以理解为训练一个完整的模型，所以<b>对于显存的要求十分高</b>。我试验过在3090上进行训练，如果不使用amp的话，应该即使设置bs为1也是不能跑起来的。

### Dreambooth-LoRA

https://arxiv.org/abs/2106.09685

LoRA本身并不是一个对于diffusion概念学习的方法，而<b>是一种对于模型的微调方法</b>。对于Dreambooth，在我的理解里，这种方法就是只关注attention层，因此，<b>只对attention层进行参数的微调</b>（`requires_grad_(True)`），而不关心其他层（`requires_grad_(False)`）。

显然，这种方法有一个很关键的点在于其大幅减小了训练的参数量，对于GPU的要求会低很多，并且由于其并不是完全修改了原有网络，对于其他内容的生成影响并没有那么大，相对的，也会需要更多训练时间才能得到不错的结果。

### Text-Inversion

https://arxiv.org/abs/2208.01618

<img src="/assets/ZK2QbDvP6ojN9DxgSaTcoThLnke.png" src-width="1689" src-height="799" align="center"/>

正如这种方法的名字所表示的，其聚焦于text（caption）对于生成的影响。<b>dreambooth是不对tokenizer进行处理的</b>，但是text-inversion是直接<b>在tokenizer中添加一个新词，并只对于text_encoder进行训练</b>。具体来说，text-inverison通过一个在tokenizer中存在的词，使用其在text_encoder.embedding中的权重初始化新的词，然后锁定除了这个新的词的embedding的其他部分，只对这一个embedding进行训练。

这种训练方式最大程度的<b>避免了对原有网络的破坏</b>，可以说，完全没有破坏。即使你训练再多步，只要不加入这个新概念词，生成能力就不会与原有网络有任何区别。但是这种方法的弊端也是显而易见的，虽然在论文中给出的结果是1000步左右就能收敛得到不错的生成效果，但是我实际测下来可能得5000步才能拿到一个不错的效果，并且全程loss波动并不小。并且，这种<b>生成效果十分依赖于生成时使用的seed</b>，如果使用的seed不好，可能结果也会很差。

### Mix-of-Show（EDLoRA）

https://arxiv.org/abs/2305.18292

<img src="/assets/R25LbCgHEorz15xmdN5cSI7inVg.png" src-width="526" src-height="332" align="center"/>

mix-of-show本身着重于多角色概念的融合，分为<b>三部分</b>。

- 对于<b>单概念的学习，使用EDLoRA</b>。EDLoRA，首先添加一个新concept的text_encoder.embedding，并将text_encoder的Linear层与UNet的Linear、Conv层加入训练参数，通过对这三部分的训练来实现新概念的学习。这种方法相对于上面几种方法，能做到一定的原有模型能力的保留和新概念的学习，并且很快就能得到不错的生成效果。但是同时，这种方法对GPU显存的要求也并不低，在不开启amp的情况下在3090上仍然会出现oom
- 对于<b>多概念的融合，使用加载lora前后结果进行训练</b>。这个过程其实挺直观的，就是一个能生成多概念的模型，肯定需要在各个概念上都有不错的生成效果，同时还应该有多概念共同生成的能力。所以将每个概念加载lora前后tensor相连，用于参数优化。需要注意的是，这边是<b>直接在另一个基础模型上进行训练</b>的，而不是从一个已有EDLoRA的模型上训练。
- 对于空间信息，简单使用上述的controlnet或T2I进行实现

<img src="/assets/V0jzbvxOxo9LQGxVuJZc28hVnLf.png" src-width="1023" src-height="456" align="center"/>

在写本文时，我还没有尝试多概念的融合，只尝试了EDLoRA的使用。EDLoRA的效果相对于前面的来说，还是不错的，不仅生成质量不差，还能通过训练步数，控制概念的学习和对原模型的破坏。感觉应该是目前最好的方法之一了吧。以下是一个以AnyLoRA为基础模型进行训练结果。（不过相对于其他方法，本方法官方给出的训练集图片更多，不知道是不是硬性要求）

<img src="/assets/QeH0b2EFNowef9xbXMdcZbdOntg.jpeg" src-width="2572" src-height="5656" align="center"/>

# 总结

对于额外功能实现的微调，我感觉当前的成果已经基本完美了，感觉是已经在可控能力和训练成本上达到了一个不错的平衡。当然可以有更好的实现方式，使网络更加可控，但是相应的训练成本可能就是无法接受的了。

对于特定概念的学习，除了我知道的几种方法，其实还有挺多不同方法的，比如custom_diffusion啥的，但是我也还没咋了解过，就不具体介绍了。感觉目前来说，各种方法的效果还是挺不错的，但确实仍然有许多问题。主要就在于对特定内容的学习如何和模型本身取得一个平衡。以我上面的图为例，其中有一张prompt是有“wear a red hat”的，但是因为对角色的学习过了所以这个信息就被忽略了，包括有个eiffel tower的prompt也受到训练的影响没法生成的很好了。如何实现这两者的平衡感觉应该是一个较大的问题，可能可以考虑一下参数的手动控制？还有就是比如说没法很好的生成背影这种问题，不过我觉得这个更多是因为数据集而不是网络。

感觉Diffusion的微调已经很好了，可以满足不少需求了，并且也相当未来可期。说不定哪一天，通过diffusion，我们都可以随心所欲的生成自己的idea

