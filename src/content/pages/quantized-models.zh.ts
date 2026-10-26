import type { QuantizedModelsCopy } from './quantized-models';

const copy: QuantizedModelsCopy = {
  eyebrow: '量化模型 · 即将推出',
  title: '更小的模型，*量化*得用心。',
  intro:
    '我们正在为 Butter 所服务的模型准备量化版本，采用与我们公开的 TurboQuant+ 权重研究相同的方法。文件更小，质量不打折，还有余量同时运行更多模型。',
  method: {
    heading: '我们如何量化',
    items: [
      {
        title: '逐层设定',
        body: '每一层都有自己的精度，而不是整个模型只用一个设置。',
      },
      {
        title: '保护边界层',
        body: '第一层和最后一层保持更高精度。无论是权重还是 KV 缓存，它们都是最敏感的。',
      },
      {
        title: '精度取决于张量的角色',
        body: '注意力和 FFN 的读取投影压缩效果好。像 ffn_down 这样的写回投影则保留原生格式。',
      },
      {
        title: '权重和 KV 统一预算',
        body: '权重精度和 KV 缓存精度作为同一个内存预算来选择，然后在发布前与未量化的基线进行核对。',
      },
    ],
  },
  tiles: {
    heading: '这一方法在我们公开研究中的结果',
    scope:
      '使用 TurboQuant+ 在我们的 llama.cpp 分支 llama-cpp-turboquant 上测得。',
    weights: {
      label: '采用 Config I 策略后权重体积减少',
      detail: '困惑度相对 q8_0 的变化',
    },
    stacked: {
      label: '权重和 KV 一起压缩后总内存减少',
      detail: '困惑度相对 q8_0 权重加 f16 KV 的变化',
    },
    source: '来源',
    paper: '阅读权重压缩论文',
  },
  strip: {
    label: '精度如何分布',
    note: '示意图。第一层和最后一层保持完整精度，其余各层按张量角色着色。实际的层数和策略因模型而异。',
    legend: {
      boundary: '边界层 · 更高精度',
      attention: '注意力 · 已压缩',
      ffnRead: 'FFN gate 和 up · 已压缩',
      ffnDown: 'FFN down · 原生 4 位',
    },
    first: '前几层',
    last: '后几层',
  },
  soon: {
    heading: '即将推出',
    body: '首批版本即将推出。每个版本发布时都会注明它的基础模型、格式、相对基线的体积，以及它通过的质量检查。',
    // 变体 B，不提名称：
    // '它们会随着时间不断改进，由我们自己的性能分析与评估工具来衡量。'
    tooling: '它们会随着时间不断改进，由我们的性能分析与评估工具 Juke 来衡量。',
    cta: '发布时通知我',
  },
};

export default copy;
