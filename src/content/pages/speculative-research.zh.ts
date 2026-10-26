import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: '采样模式',
    metric: '指标',
    comparison: '不同工作负载的中位数',
    prefill: '单流预填充',
    singleTtft: '单流 TTFT',
    lane: '每并发请求解码中位数',
    concurrentTtft: '并发 TTFT 中位数',
  },
  eyebrow: 'Apple silicon 实测 · 2026年10月19日',
  title: '27B。\n*16 个请求。一台 Mac。*',
  intro:
    '即使请求重叠，也让本地智能体持续运行。Butter 与 Iron 将原生 Metal 内核、推测解码和共享验证结合起来。这是一台 M5 Max 的实测结果。',
  greedy: '贪心 · T0',
  sampled: '采样 · T0.7',
  unit: 'tok/s',
  singleTitle: '单个活跃请求',
  singleScope: '输入 2,052 token · 输出上限 128 token',
  burstTitle: '16 个并发请求',
  burstScope: '完整突发 · 包含预填充与收尾',
  gainTitle: '全活跃解码更快',
  gainScope: '全活跃解码提升 · 16 请求配对试验',
  before: '优化前',
  after: '优化后',
  activeTitle: '同一模型。更少重复工作。',
  activeScope:
    '只计算所有请求都在解码的共同区间。它与上方完整突发结果来自不同试验。',
  replay: '重播流程',
  illustration: '工作原理 · 示意图',
  privateLanes: '请求独立状态',
  sharedVerify: '共享目标模型验证',
  committed: '已验证 token 前进',
  diagramNote:
    '16 个请求轮换进入最多 8 条通道的队列。目标检查候选，各请求保留自己的缓存、循环状态与采样器。动画展示架构，并非时间或接受率实测。',
  details: '展开工程、条件与证据',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2，M5 Max 128 GiB，Metal，raw BF16 KV。单流：3 次，输入 2,052，输出上限 128。完整突发：16 请求运行 3 次，每请求约 937 输入，输出上限 600。全新服务器，排除预热；计时前缀无复用。T0.7 使用 top-p 0.95、top-k 20、min-p 0。',
  cost: '配对试验使用 882–999 输入，输出上限 600：贪心 3 对，采样 8 对。采样首 token 时间 p50 从 9.030 秒升至 9.397 秒。这是吞吐改善，并非全面降低延迟。',
  qualification:
    '贪心配对保留全部 48 个候选响应文本及数量。另一次智能体回放保留 111/111 个响应及数量，但未改善时延。这不证明广泛任务质量、工具准确率或 token 用量降低。',
  sources: '来源 PR 与 Reproduce with Butter',
  steps: [
    {
      title: '逐行匹配的原生运算',
      body: '串行解码与批量验证采用匹配的归约顺序。注意力与循环状态遵循候选祖先路径，只提交接受的路径。',
    },
    {
      title: '目标模型决定采样',
      body: 'T0 使用贪心验证。T0.7 从目标分布抽样，仅当分支与抽样一致才沿其前进。请求拥有独立随机状态。',
    },
    {
      title: '共享工作，隔离状态',
      body: '根据实测成本和接受率分配验证行。共同准备、验证和提交，缓存、历史与采样器保持请求独立。',
    },
    {
      title: '需要时才准备草稿',
      body: '单行仍运行目标模型。特征保存在有界缓冲区，直到再次起草或满时再更新，不跳过验证。',
    },
  ],
};
export default copy;
