---
title:  "Why Can We Do KVCache"
date:   2025-01-17 16:13:36 +0530
permalink: /posts/2025/01/why-can-we-do-kvcache/
tags:
  - MLSys
---
I’ve been studying technologies in ML Systems, especially focusing on LLM inference acceleration. As we all know, decoder-only Transformers have become dominant, thanks to their self-attention mechanism that enables each token to semantically connect with every other token. During inference, a decoder exhibits an autoregressive feature, meaning we need to input context (including the prompt and the tokens generated so far) to predict the next token. Fortunately, researchers discovered that most parts of the Key (K) and Value (V) matrices remain unchanged between two adjacent iterations. By exploiting this, we can save computation by caching K and V from the previous iteration and updating them incrementally—this is called KVCache.
 ![请添加图片描述](https://i-blog.csdnimg.cn/direct/d6fab68be5f045bdb5a19d146fc2a754.png)

But have we ever stopped to think about *why* we can use KVCache? K and V represent the semantic features of each token in different linear spaces. Intuitively, the "prefix" of K and V should be the same if we input a context with the same prefix. However, after many layers of complex self-attention operations, it might seem that all features get fused together, and each feature contains elements of the others. Do K and V still retain the same prefix between two iterations?

First, let's review the computational process of self-attention. The formula is:
$$
\text{attention} = \text{softmax} \left( \frac{QK^T}{d_k} \right) V
$$
Where $Q$, $K$, and $V$ are derived from the hidden state of the input tokens:
$$
Q = x W_q, \quad K = x W_k, \quad V = x W_v
$$


![请添加图片描述](https://i-blog.csdnimg.cn/direct/d4437b1253da4629adc1639806350b24.png)
![请添加图片描述](https://i-blog.csdnimg.cn/direct/21f7ee81783a4eb380919e74d04b3302.png)
![请添加图片描述](https://i-blog.csdnimg.cn/direct/30a7f34d438e47f6a4c2b50a4c006bfd.png)

We use the notation $K^l_{1:i}$ to represent the first $i$ rows of $K$ in layer $l$. Given a prompt with length $p$ and generated tokens with length $n$, we can conclude that $K$ from iteration $n-1$ (i.e., $K_{1:p+n-1}^l$) is the prefix of $K$ in iteration $n$ (i.e., $K_{1:p+n}^l$). This property, which I refer to as "prefix invariance", holds true at every layer. We will prove this by mathematical induction in the following section.

Let’s start by considering the second iteration at the first layer. We have a KVCache of length $p$ and the first token generated. The embedding vector of the first token is concatenated to the embeddings of the previous $p$ tokens, meaning that $x^1_{1:p}$ at this iteration is identical to that of the previous iteration. Then, by linear multiplication, we obtain $Q^1$, $K^1$, and $V^1$, where the last rows are related to the new embedding vector. Next, we apply a causal mask to $Q^1K^{1T}$, and note that $\text{softmax}(Q^1K^{1T})_{1:p}$ (dropping the last column of zeros) is identical to the previous iteration because the upper triangular matrix is set to -inf. Therefore, the last column of $Q^1K^{1T}$ doesn’t influence the results of $\text{softmax}(Q^1K^{1T})_{1:p}$.

Finally, we have $\text{softmax}(Q^1K^{1T}) V^1$ (without loss of generality, we remove $d_k$). Since only the last row of $\text{softmax}(Q^1K^{1T})$ and $V^1$ contains new values from the first token, we can conclude that $\text{attention}^1_p$ at this iteration is identical to the previous iteration due to the properties of matrix 
multiplication. FFN and layer normalization are both token-level operations, so they do not affect "prefix invariance".

For the same reason, we find that $x_{1:p}^2$ is identical to the previous iteration, ensuring that "prefix invariance" holds at every layer and throughout all subsequent iterations.
![请添加图片描述](https://i-blog.csdnimg.cn/direct/5589693b353b44d1b59a8e9f649503e5.png)
But why don’t we cache Q as well? As shown in the previous explanation, computing the last row of the attention matrix only requires $Q_n$ from $x_n$, which represents the newest token. Essentially, we are querying each newly generated token against every key from all previous tokens, including itself. Therefore, caching Q is unnecessary when we perform self-attention in this incremental manner.

In my opinion, causal masks play a crucial role in maintaining the "prefix invariance" property. In fact, self-attention in decoder-only Transformers is the only operation that is not token-level. But with causal masks in place, everything becomes easy to handle.

After the first iteration, where we input the prompt, we can easily input only the one token generated in the previous iteration, instead of the entire context. These two stages are called *prefilling* and *decoding*. Prefilling is the process where the LLM generates the initial KVCache, while decoding refers to the token-by-token iteration of the model. These stages have different computational patterns, and the *prefilling-decoding* (PD) distribution has become a popular research topic in recent years. 
![请添加图片描述](https://i-blog.csdnimg.cn/direct/16743c02edb744c983fe5c7404646235.png)
Moreover, KVCache grows linearly with the context length, resulting in significant memory consumption. Therefore, how to store, manage, and compress KVCache is a promising area of research for the future of ML Systems.
