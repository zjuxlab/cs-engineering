---
title: Transformer
slug: ruan-jian-ke-yan-ji-neng-shu/ren-gong-zhi-neng-ai/transformer/transformer
sidebar_position: 7
---

# Transformer

Author：潘驰昊

# 前言

- Transformer是一种深度学习模型，这个模型最初由Vaswani等人在2017年的论文《Attention is All You Need》中提出 <u>Paper Link</u>
- Transformer的主要创新之处在于它完全摒弃了以往的序列模型，转而依赖于“注意力”机制来获取输入数据的全局信息。这种注意力机制（attention）允许模型在处理每个单词或者特征时，都能考虑到其他所有单词或者特征的信息，从而在理解上下文信息
- 由于Transformer没有像RNN那样的递归结构，因此它可以同时处理整个序列，这使得在硬件如GPU上可以进行高效的并行计算，大大加快了训练速度

# Transformer 整体架构

Transformer 由 <b>Encoder </b>和 <b>Decoder</b> 两个部分组成，Encoder 和 Decoder 都包含 n 个 block（n一般为6）

<img src="/assets/DyhgbuRGVo4TYWxFFelcAdxTnZg.png" src-width="1360" src-height="886"/>

- Encoder 接收一组输入，通过自注意力机制（self-attention) 和前馈神经网络处理，得到一组编码向量
- 这些向量携带了输入数据的信息，并被送入Decoder中
- Decoder 同样具有自注意力机制和前馈神经网络，此外还有一个Encoder-Decoder注意力层，用于处理编码器的输出
- 解码器的输出可以用于各种任务，如机器翻译、文本生成等

# Embedding 

## Embedding

- 在进入Transformer 模型前，输入必须转化为模型能够处理理解的类型，所以需要对输入进行编码

<img src="/assets/UFsQbE6yYo6tspxQELpcSAvJnth.png" src-width="640" src-height="142"/>

## Positional Embedding

- Transformers 模型的主要组成部分是 <b>self-attention</b> ，这个机制可以捕获输入序列中任何两个位置之间的依赖关系。然而，这种自注意力机制并不能捕获序列中的位置信息，所以 Transformer 需要 <b>Positional Embedding</b> <b>（PE）</b>保存单词在序列中的相对或绝对位置

<img src="/assets/ICVJbDackoZ0M4x2loVcYtajnke.png" src-width="640" src-height="136"/>

> 其中，pos 表示单词在句子中的位置；d 表示 PE的维度；2i 表示偶数的维度，2i+1 表示奇数维度

- 使用这种公式来计算PE的好处：
    - 对于任何固定的偏移量 `k`，`PE(pos+k)` 可以表示为 `PE(pos)` 的线性函数（三角函数之间的变换）
    - 能够适应比训练集里面所有句子更长的句子

# Self-Attention 自注意力机制

<img src="/assets/M5U3bMU7jogHCHxQ38LcSVCBn2f.png" src-width="456" src-height="826"/>

> Self-Attention 的结构，计算时需要用到矩阵 Q(查询), K(键值), V(值)

<img src="/assets/QRK8bvBoTohWdwxxi7XcuxBvnId.png" src-width="662" src-height="148"/>

- 由上图公式可计算得到最终<b>自注意力机制</b>的输出：
    - 将输入数据通过线性变换得到查询（Query）、键（Key）和值（Value）
    - 首先，计算每一个Q（查询）与所有K（键）的点积，得到一个注意力得分。这个得分表示了当前位置对其他位置的注意力程度
    - 其次，为了使得注意力得分不会过大，影响模型的稳定性，通常会对这些得分进行缩放处理，具体来说，就是除以K（键）的维度的平方根
    - 然后，将缩放后的注意力得分通过一个Softmax函数，将其转化为概率分布。这样，就得到了每个位置对其他位置的注意力权重
    - 最后，使用这些注意力权重对V（值）进行加权求和，得到每个位置的输出。这样，每个位置的输出都包含了整个序列的信息
    
# Multi-Head Attention 多头注意力机制

- 顾名思义，<b>多头注意力机制</b>就是由多个自注意力机制组合而成，让模型能够同时关注不同位置的信息，捕获序列中的多种依赖关系

<img src="/assets/Bt7cbmOfooOJ0Dx6GpRcoXDdnjc.png" src-width="424" src-height="528"/>

- 首先，模型会将输入数据分别进行多次（H次）线性变换，得到H组查询（Query）、键（Key）和值（Value）。这些变换的权重矩阵都是不同的
- 然后，模型会对每组Q（查询）、K（键）和V（值）分别进行自注意力操作，得到H组输出。在这个过程中，每组都可以关注到序列中不同的部分
- 最后，模型会将这H组输出拼接在一起，并进行一次线性变换，得到最终的输出

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>多头注意力机制可以让模型在不同的子空间（Subspace）中学习到输入数据的不同表示，捕获到更丰富的信息，比如在处理自然语言时，可能在一个头中学习到语法信息，在另一个头中学习到词义信息</p>
</div>

- 由于所有的头都是并行操作的，因此多头注意力机制也可以提高模型的计算效率

# Encoder 编码器

- 在Transformer模型中，<b>Encoder</b> 是一个由多个相同的层堆叠起来的结构，每一层都有两个子层：
    - <b>多头注意力层</b>（Multi-Head Attention Layer）：上一节介绍的
    - <b>前馈神经网络</b>（Feed Forward Neural Network）：一个全连接的神经网络，相同的网络被独立地应用到每个位置的输出上。这个网络由两层组成，中间有一个ReLU激活函数

- 在这两个子层之间和之后，都有<b>残差连接</b>（Residual Connection）和<b>层归一化</b>（Layer Normalization）操作

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>这种设计使得模型更稳定，也更易于训练（可以参考ResNet）</p>
</div>

- 在原始的Transformer模型中，有N个这样的 <b>Encoder </b>堆叠在一起。每一层都使用了自注意力机制和前馈神经网络，使得模型可以充分抓取输入序列中的全局信息

<img src="/assets/TUUjbkEpioVcxkxBMW8ctCsrnzh.png" src-width="526" src-height="614"/>

# Decoder 解码器

- 与 <b>Encoder</b> 一样， <b>Decoder 也</b>是由多个相同的层堆叠起来的结构，每一层都有三个子层：
    - <b>两个 Multi-Head Attention Layer</b>
        1. Mask Multi-Head Attention Layer：第一个Multi-Head Attention 采用了 <b>Masked</b> 操作，因为在翻译的过程中是顺序翻译的，即翻译完第 i 个单词，才可以翻译第 i+1 个单词。通过 Masked 操作可以防止第 i 个单词知道 i+1 个单词之后的信息（Mask 可能会单独介绍一下）
        2. 在第二个 Multi-Head Attention Layer 中的 <b>K</b>（键），<b>V</b>（值）矩阵并非使用上一个Decoder Block 的计算输出，而是使用 <b>Encoder 的编码信息矩阵 C</b> 计算的（同下Encoder-Decoder Attention Layer）
    - <b>Encoder-Decoder Attention Layer</b>：在这个层中，解码器的Q（查询）会和编码器的输出（即键和值）进行交互。这允许每个位置的解码器都可以关注到编码器输出的所有位置。这样，解码器就可以在生成每个词时，都能考虑到输入序列的全局信息。
    - <b>Feed Forward Neural Network</b>

<img src="/assets/T9NNbzEe0oZxWdxUXKGcYST4nNd.png" src-width="526" src-height="826"/>

