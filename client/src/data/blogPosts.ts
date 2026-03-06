/**
 * Blog posts data
 * In a real setup, these would be loaded from Markdown files
 * For this React SPA, we store them as structured data with markdown content
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
  readingTime: number; // minutes
}

// TAG: Blogs
export const blogPosts: BlogPost[] = [
//   {
//     slug: "mobile-llm-inference-optimization",
//     title: "移动端大模型推理优化：从理论到实践",
//     date: "2025-01-20",
//     tags: ["LLM", "移动端", "推理优化", "系统"],
//     description: "深入探讨在移动设备上部署大语言模型的核心挑战与优化策略，包含数学推导和实验数据。",
//     readingTime: 15,
//     content: `# 移动端大模型推理优化：从理论到实践

// ## 引言

// 随着大语言模型（LLM）的快速发展，如何在资源受限的移动设备上高效运行这些模型成为了 AI 系统领域的核心挑战。本文将从系统设计角度，深入分析移动端 LLM 推理的优化策略。

// ## 核心挑战

// 移动端推理面临三大核心约束：

// 1. **内存带宽瓶颈**：移动 SoC 的内存带宽通常只有服务器 GPU 的 1/10
// 2. **计算资源有限**：NPU/GPU 算力受功耗限制
// 3. **延迟敏感性**：用户交互场景要求 < 100ms 的首 token 延迟

// ## 量化理论基础

// 对于权重矩阵 $W \\in \\mathbb{R}^{m \\times n}$，INT4 量化可以表示为：

// $$\\hat{W} = \\text{clip}\\left(\\text{round}\\left(\\frac{W}{s}\\right), -8, 7\\right) \\cdot s$$

// 其中缩放因子 $s = \\frac{\\max(|W|)}{7}$。

// 量化误差的期望值为：

// $$\\mathbb{E}[\\|W - \\hat{W}\\|_F^2] \\leq \\frac{s^2 \\cdot mn}{12}$$

// ## KV Cache 优化

// 对于序列长度为 $L$ 的 Transformer，KV Cache 的内存占用为：

// $$M_{KV} = 2 \\cdot L \\cdot d_{model} \\cdot n_{layers} \\cdot \\text{dtype\_size}$$

// 以 LLaMA-7B 为例（$d_{model}=4096, n_{layers}=32$），处理 2048 token 时：

// $$M_{KV} = 2 \\times 2048 \\times 4096 \\times 32 \\times 2 \\approx 1 \\text{ GB}$$

// 这远超大多数移动设备的可用内存。

// ## 实验结果

// | 方法 | 延迟 (ms) | 内存 (MB) | PPL ↓ |
// |------|-----------|-----------|-------|
// | FP16 基线 | 1240 | 14000 | 6.82 |
// | INT8 量化 | 680 | 7200 | 6.95 |
// | INT4 量化 | 380 | 3800 | 7.31 |
// | **EdgeLLM (我们的)** | **290** | **2100** | **7.18** |

// ## 结论

// 通过结合自适应量化、KV Cache 压缩和算子融合，我们实现了在移动设备上运行 7B 参数模型的实用方案。
// `
//   },
//   {
//     slug: "hardware-aware-nas",
//     title: "硬件感知的神经架构搜索：让模型真正适配移动芯片",
//     date: "2024-11-05",
//     tags: ["NAS", "硬件感知", "移动端", "芯片"],
//     description: "介绍如何将移动 SoC 的硬件特性融入神经架构搜索过程，实现精度与延迟的最优权衡。",
//     readingTime: 12,
//     content: `# 硬件感知的神经架构搜索

// ## 动机

// 传统 NAS 方法通常以 FLOPs 或参数量作为效率代理指标，但这与实际硬件延迟相关性很低。

// ## 延迟预测模型

// 我们建立了一个基于查找表（LUT）的延迟预测模型：

// $$T_{pred}(op, hw) = \\sum_{i} \\alpha_i \\cdot f_i(op, hw)$$

// 其中 $f_i$ 是从硬件 profiling 数据中提取的特征。

// ## 多目标优化

// NAS 问题可以形式化为：

// $$\\min_{\\alpha} \\mathcal{L}_{val}(w^*(\\alpha)) + \\lambda \\cdot T_{pred}(\\alpha)$$

// $$\\text{s.t.} \\quad T_{pred}(\\alpha) \\leq T_{budget}$$

// ## 结果

// 在 Snapdragon 8 Gen 2 上，我们的方法相比 MobileNetV3 实现了 1.8x 加速，同时 Top-1 精度提升 0.5%。
// `
//   },
//   {
//     slug: "attention-mechanism-survey",
//     title: "注意力机制演进综述：从 Transformer 到移动端高效变体",
//     date: "2024-08-15",
//     tags: ["Transformer", "注意力机制", "综述", "效率"],
//     description: "系统梳理注意力机制的演进历程，重点分析各类高效注意力变体在移动端的适用性。",
//     readingTime: 20,
//     content: `# 注意力机制演进综述

// ## 标准自注意力的复杂度

// 标准 Self-Attention 的时间和空间复杂度均为 $O(n^2 d)$，其中 $n$ 为序列长度，$d$ 为维度。

// $$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

// ## 高效注意力变体

// ### Multi-Query Attention (MQA)

// MQA 将多个 Query 头共享同一组 KV，将 KV Cache 减少 $h$ 倍（$h$ 为头数）：

// $$\\text{MQA}(Q_1, ..., Q_h, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h)W^O$$

// ### Sliding Window Attention

// 限制每个 token 只关注局部窗口 $w$，复杂度降至 $O(nw)$：

// $$A_{ij} = \\begin{cases} \\text{softmax}(q_i k_j^T / \\sqrt{d}) & |i-j| \\leq w/2 \\\\ -\\infty & \\text{otherwise} \\end{cases}$$

// ## 移动端适用性分析

// | 方法 | 内存复杂度 | 计算复杂度 | 移动端友好性 |
// |------|-----------|-----------|-------------|
// | Standard MHA | $O(n^2)$ | $O(n^2 d)$ | ❌ |
// | MQA | $O(n^2/h)$ | $O(n^2 d)$ | ⚠️ |
// | GQA | $O(n^2 g/h)$ | $O(n^2 d)$ | ⚠️ |
// | Sliding Window | $O(nw)$ | $O(nwd)$ | ✅ |
// | Linear Attention | $O(nd)$ | $O(nd^2)$ | ✅ |
// `
//   },
//   {
//     slug: "edge-ai-systems-2024",
//     title: "2024 年边缘 AI 系统研究回顾",
//     date: "2024-12-28",
//     tags: ["年度回顾", "边缘AI", "系统研究"],
//     description: "回顾 2024 年边缘 AI 系统领域的重要进展，展望 2025 年的研究方向。",
//     readingTime: 8,
//     content: `# 2024 年边缘 AI 系统研究回顾

// ## 年度亮点

// 2024 年是边缘 AI 系统研究爆发的一年，主要体现在以下几个方向：

// ### 1. 端侧 LLM 推理

// Apple Intelligence、Google Gemini Nano、Qualcomm AI Hub 等产品的发布标志着端侧 LLM 进入实用阶段。

// ### 2. 异构计算调度

// 针对 CPU+GPU+NPU 的协同调度成为研究热点，代表工作包括：
// - **Neurosymbolic Scheduling**：结合符号推理与学习的调度策略
// - **Roofline-guided Mapping**：基于 Roofline 模型的算子映射

// ### 3. 内存优化

// - **Activation Checkpointing** 在移动端的轻量化实现
// - **Paged Attention** 向移动端的迁移

// ## 2025 年展望

// 预计以下方向将成为研究重点：

// 1. **多模态端侧推理**：视觉-语言模型的移动端部署
// 2. **持续学习**：在设备上进行轻量级微调
// 3. **隐私保护推理**：联邦学习与差分隐私的结合

// 期待与大家在新的一年共同探索这些前沿问题！
// `
//   },
  {
    slug: "why-can-we-do-kvcache",
    title: "Why Can We Do KVCache",
    date: "2025-01-17",
    tags: ["KVCache", "LLM", "Inference"],
    description: "Explaining the rationale behind KVCache optimization for mobile LLM inference, with a focus on math and system design principles.",
    readingTime: 8,
    content: `I’ve been studying technologies in ML Systems, especially focusing on LLM inference acceleration. As we all know, decoder-only Transformers have become dominant, thanks to their self-attention mechanism that enables each token to semantically connect with every other token. During inference, a decoder exhibits an autoregressive feature, meaning we need to input context (including the prompt and the tokens generated so far) to predict the next token. Fortunately, researchers discovered that most parts of the Key (K) and Value (V) matrices remain unchanged between two adjacent iterations. By exploiting this, we can save computation by caching K and V from the previous iteration and updating them incrementally—this is called KVCache.

 ![autoregressive](/figures/kvcache_1.png)

But have we ever stopped to think about *why* we can use KVCache? K and V represent the semantic features of each token in different linear spaces. Intuitively, the "prefix" of K and V should be the same if we input a context with the same prefix. However, after many layers of complex self-attention operations, it might seem that all features get fused together, and each feature contains elements of the others. Do K and V still retain the same prefix between two iterations?

First, let's review the computational process of self-attention. The formula is:

$$
\\text{attention} = \\text{softmax} \\left( \\frac{QK^T}{d_k} \\right) V
$$

Where $Q$, $K$, and $V$ are derived from the hidden state of the input tokens:

$$
Q = x W_q, \\quad K = x W_k, \\quad V = x W_v
$$

![qkv_proj](/figures/kvcache_2.png)
![pv](/figures/kvcache_4.png)
![qk](/figures/kvcache_3.png)

We use the notation $K^l_{1:i}$ to represent the first $i$ rows of $K$ in layer $l$. Given a prompt with length $p$ and generated tokens with length $n$, we can conclude that $K$ from iteration $n-1$ (i.e., $K_{1:p+n-1}^l$) is the prefix of $K$ in iteration $n$ (i.e., $K_{1:p+n}^l$). This property, which I refer to as "prefix invariance", holds true at every layer. We will prove this by mathematical induction in the following section.

Let’s start by considering the second iteration at the first layer. We have a KVCache of length $p$ and the first token generated. The embedding vector of the first token is concatenated to the embeddings of the previous $p$ tokens, meaning that $x^1_{1:p}$ at this iteration is identical to that of the previous iteration. Then, by linear multiplication, we obtain $Q^1$, $K^1$, and $V^1$, where the last rows are related to the new embedding vector. Next, we apply a causal mask to $Q^1K^{1T}$, and note that $\text{softmax}(Q^1K^{1T})_{1:p}$ (dropping the last column of zeros) is identical to the previous iteration because the upper triangular matrix is set to -inf. Therefore, the last column of $Q^1K^{1T}$ doesn’t influence the results of $\text{softmax}(Q^1K^{1T})_{1:p}$.

Finally, we have $\\text{softmax}(Q^1K^{1T}) V^1$ (without loss of generality, we remove $d_k$). Since only the last row of $\\text{softmax}(Q^1K^{1T})$ and $V^1$ contains new values from the first token, we can conclude that $\text{attention}^1_p$ at this iteration is identical to the previous iteration due to the properties of matrix 
multiplication. FFN and layer normalization are both token-level operations, so they do not affect "prefix invariance".

For the same reason, we find that $x_{1:p}^2$ is identical to the previous iteration, ensuring that "prefix invariance" holds at every layer and throughout all subsequent iterations.

![causal_mask](/figures/kvcache_5.png)

But why don’t we cache Q as well? As shown in the previous explanation, computing the last row of the attention matrix only requires $Q_n$ from $x_n$, which represents the newest token. Essentially, we are querying each newly generated token against every key from all previous tokens, including itself. Therefore, caching Q is unnecessary when we perform self-attention in this incremental manner.
In my opinion, causal masks play a crucial role in maintaining the "prefix invariance" property. In fact, self-attention in decoder-only Transformers is the only operation that is not token-level. But with causal masks in place, everything becomes easy to handle.

After the first iteration, where we input the prompt, we can easily input only the one token generated in the previous iteration, instead of the entire context. These two stages are called *prefilling* and *decoding*. Prefilling is the process where the LLM generates the initial KVCache, while decoding refers to the token-by-token iteration of the model. These stages have different computational patterns, and the *prefilling-decoding* (PD) distribution has become a popular research topic in recent years. 

![pd](/figures/kvcache_6.png)

Moreover, KVCache grows linearly with the context length, resulting in significant memory consumption. Therefore, how to store, manage, and compress KVCache is a promising area of research for the future of ML Systems.
`
  },
];
