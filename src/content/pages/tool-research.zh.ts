import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  neural: {
    label: '研究循环 · 概念图',
    replay: '重播信号',
    controls: '探索研究阶段',
    note: '这是研究过程的视觉比喻，并非神经元激活实测。旁边展示的是测量结果。',
  },
  animation: {
    title: '更准确的参数。更多推理工作。',
    measured: '实测权衡 · 同一批 144 个请求',
    accuracy: '参数完全匹配准确率',
    tokens: '推理总 token 数',
    replay: '重播动画',
    boundary:
      '续写在增加推理工作的同时改善了参数完全匹配。尚未证明工作流 token 节省或每项完成任务的成本。',
    accuracyGain: '新增完全匹配响应',
    tokenOverhead: '额外推理 token',
  },
  eyebrow: 'Juke → Butter · 实测研究',
  title: '更准确的工具调用。\n*在 Butter 中实测。*',
  intro:
    '一个错误参数就可能让有用的工具执行失败。我们用 Juke 研究执行过程和行为，再验证有针对性的推理改动。一次 Butter 原生实验在不重新训练的情况下，让更多工具参数得到正确生成。',
  resultTitle: '工具参数完全正确的响应',
  baseline: '改动前',
  candidate: '启用原生续生成',
  denominator: '正确响应 / 请求',
  gain: '新增 20 个正确响应',
  retained: '保留全部基线成功',
  development: '独立开发评测集',
  methodTitle: '从证据到推理改进',
  steps: [
    { title: '检查失败', body: '捕获响应，定位出错的参数表示。' },
    {
      title: '改变推理路径',
      body: 'Butter 根据已选函数和提供的 schema，进行一次有预算限制的续生成。只提供结构，不填入预期参数值。',
    },
    {
      title: '验证结果',
      body: '通过常规 API 的 buffered 和 streaming 模式，检查参数值及类型是否完全正确。保留每个基线成功，并计入额外工作量。',
    },
  ],
  implication:
    '目标是以更少浪费完成可靠操作。减少意外操作、修复轮次和工作流总成本，是接下来要测量的结果。',
  details: '查看方法、适用范围和剩余问题',
  scopeTitle: '原生 API 实验结果 · 2026 年 10 月 26 日',
  scope:
    '扩展评测包含 72 个提示词，每个分别以 buffered 和 streaming 模式运行，每组共 144 个请求。这是已知失败类别中的新值，并非 144 个独立工作流。实验没有执行外部工具。',
  method:
    '基线与候选使用相同的初始提示 token、模型及 Iron 资源，temperature 为 0，共享 512 token 的生成预算。判定器检查 JSON 值与类型是否完全一致。全部 36 个基线成功均被保留；20 个新增成功来自 10 个标量联合类型提示词的两种模式。',
  cost: '整个扩展评测新增 8,304 个输入 token 和 536 个生成 token。这是以额外推理工作换取的正确性提升。尚未证明工作流总 token、延迟或每项已完成任务的成本降低。',
  limits:
    '这是实验性的 Swift Chat 实现，并非已发布功能。本评测中的嵌套数组和字面字符串问题仍未解决。更大模型、其他 API、完整多轮工作流以及不必要调用的减少，都需要单独验证。',
  source: '阅读固定版本的研究资料',
  sourceNote: 'Butter 研究 PR #1508 · 可能需要 GitHub 访问权限。',
};
export default copy;
