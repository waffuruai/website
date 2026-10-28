import type { AuraCopy } from './aura';

const copy: AuraCopy = {
  eyebrow: 'KV 缓存压缩 · 源自我们的开放研究',
  starsLabel: 'GitHub 星标',
  title: '每 GB 装下更多*上下文*。',
  intro:
    'AURA 是我们用于 KV 缓存、嵌入向量和模型权重的压缩技术。在这里，它压缩 KV 缓存，让更长的上下文和更多并发会话装进同样的内存。它始于我们的开放研究 TurboQuant+，如今原生运行在 Iron 和 Butter 中。',
  lineage: {
    heading: '它从哪里来',
    steps: [
      {
        kicker: '01 · 开放研究',
        title: 'TurboQuant+',
        body: '[TurboQuant 论文]（Google Research，ICLR 2026）领先的开源实现，并附带后续发现：压缩 value 几乎没有代价，质量损失来自 key，首尾两层需要保护。随我们的 llama.cpp 分支 llama-cpp-turboquant 一起发布。',
      },
      {
        kicker: '02 · 被上游采纳',
        title: 'vLLM 与 Apple MLX',
        body: '同一项研究以 KV 缓存 dtype 的形式进入 vLLM，以 KV 缓存方案的形式进入 Apple mlx-swift-lm，两者均于 2026 年合并。',
      },
      {
        kicker: '03 · 进入我们的技术栈',
        title: 'Iron 和 Butter 中的 AURA',
        body: '为我们自己的内核和服务器重写。它与论文的差异已经足够大，于是有了自己的名字。',
      },
    ],
  },
  tiles: {
    heading: '来自我们开放研究的公开结果',
    scope:
      '使用 TurboQuant+ 在我们的 llama.cpp 分支 llama-cpp-turboquant 上测得。这些不是 Butter 的数据。',
    turbo4: {
      label: '最佳质量设置下的 KV 压缩比',
      detail: '困惑度相对 q8_0 的变化',
    },
    turbo3: {
      label: '更高压缩设置下的 KV 压缩比',
      detail: '困惑度相对 q8_0 的变化',
    },
    large: {
      label: '参数规模，128K 上下文，一台 MacBook',
      detail: '峰值内存',
    },
    source: '来源',
  },
  ribbon: {
    label: '缓存如何布局',
    older: '较早的上下文 · 已压缩',
    recent: '最近窗口 · 未压缩',
    note: '示意图。块的宽度按 turbo4 的公开比例 3.8 比 1 绘制，而不是按实测的 AURA 比例。',
  },
  changed: {
    heading: 'AURA 改变了什么',
    items: [
      '一份压缩后的 KV 副本在 grouped-query attention 的同组各头之间共享。',
      '压缩版 flash attention 在 Metal 上支持所有编码宽度。',
      '压缩围绕推测解码来调度，草稿 token 永远不会覆盖已接受的历史。',
      '长上下文 prefill 采用分窗并保留 attention sink，上下文增长时最初的 token 依然可达。',
    ],
    hybrid:
      '混合模式：最近的历史保持全精度，较早的上下文被压缩，让长会话在最关键的地方保留最清晰的记忆。',
  },
  footnote:
    '压缩比、困惑度变化和 104B 结果来自我们的开放研究 TurboQuant+，在 llama-cpp-turboquant 上测得。AURA 在 Iron 和 Butter 中将这项工作推进得更远。',
};
export default copy;
