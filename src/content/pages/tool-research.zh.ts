import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  eyebrow: '在 Butter 中实测 · 实验性',
  title: '更少的错误参数。\n*更便宜的正确参数。*',
  intro:
    '工具调用的参数一旦出错，要么失败，要么触发重试，要么带着错误的值执行。我们追踪执行过程和行为，再验证有针对性的推理改动。在一次 144 个请求的评测中，Butter 的一项实验性改动多产生了 {more} 个完全正确的参数，同时把每个正确参数的 token 数从约 {before} 降到约 {after}。',
  figure: {
    headline: '每个正确参数的 token 数',
    baseline: '改动前',
    candidate: '应用实验性改动后',
    fewer: '约减少 {percent}%',
    unit: 'token',
    exact: '完全正确的参数',
    totalTokens: '推理总 token 数',
    retained: '保留的基线成功',
    perAdditional: '每新增一个正确参数的成本',
    development: '独立开发评测集',
    caption:
      '实验性评测：72 个提示词，每个分别以 buffered 和 streaming 模式运行（每组 144 个请求）。Qwen3.5-0.8B Q4_K_M，温度 0，M5 Max。没有执行外部工具。这里测量的是参数值是否完全正确，而非任务的总体可靠性。',
  },
  wrongTitle: '一个错误参数的代价',
  wrongBody:
    '错误的值要么让调用失败，代价是多一轮模型输出加一次工具往返；要么带着错误的值执行，比如写入或删除了错误的路径。避免修复带来的节省尚未测量，这是下一个实验。',
  methodTitle: '从证据到推理改动',
  example: {
    label: '类型不匹配失败类别的示意例子',
    controls: '研究循环的步骤',
    replay: '重播步骤',
    schema: 'schema',
    output: '模型输出',
    flag: '字符串，应为数字',
    inProgress: '正在运行同一组 144 个请求的评测',
    check: '值与类型完全正确',
  },
  steps: [
    { title: '检查失败', body: '捕获响应，定位出错的参数表示。' },
    {
      title: '改变推理路径',
      body: '在同一评测中验证有针对性的推理改动，无需重新训练模型。',
    },
    {
      title: '验证结果',
      body: '通过常规 API 在 buffered 和 streaming 模式下检查参数值和类型是否完全正确。保留每一个基线成功，并计入额外的工作量。',
    },
  ],
  details: '查看测试条件与限制',
  scopeTitle: '原生 API 实验结果 · 2026 年 10 月 26 日',
  scope:
    '扩展评测包含 72 个提示词，每个分别以 buffered 和 streaming 模式运行，每组共 144 个请求。这是已知失败类别中的新值，并非 144 个独立工作流。实验没有执行外部工具。',
  cost: '这项改动在整个扩展评测中新增 8,304 个输入 token 和 536 个生成 token，推理总 token 数从 50,382 升到 59,222，而每个正确参数的 token 数下降。尚未证明工作流总 token、延迟或每项已完成任务的成本降低。',
  limits:
    '这是实验性能力，尚未发布。结果仅适用于本次有限评测；其他模型、API 和完整工作流需要单独验证。',
};
export default copy;
