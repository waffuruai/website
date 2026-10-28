import type { iron } from './iron';

const ironZh: (typeof iron)['en'] = {
  layer: '内核',
  tagline: '一次定义内核，生成四种后端。',
  summary:
    '用 Rust 写一次，就能在各处得到优化过的内核。嵌入 Rust 的 DSL。内核先转换为共享 IR，再生成 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V。版本化的 C 与 Rust ABI 让现有宿主可以直接调用。',
  seo: {
    title: 'Iron：一次定义 GPU 内核，生成四种后端',
    description:
      '用 Rust 一次编写 GPU 内核，经共享 IR 生成 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V。提供版本化的 C 与 Rust ABI，目前处于抢先体验。',
    keywords: [
      'Rust GPU 内核 DSL',
      'Metal 内核',
      'CUDA 内核',
      'ROCm HIP',
      'Vulkan SPIR-V',
      '跨平台 GPU 内核',
    ],
  },
  hero: {
    title: '一次定义内核，生成*四种*后端。',
    lede: '让你的推理引擎 brrrr 地飞转起来。Iron 是嵌入 Rust 的 DSL：内核只写一次，就能编译成针对特定硬件优化的内核，并为主流模型和常见工作负载做了调优。',
    highlights: [
      { value: '4', label: '一份内核定义对应的 GPU 后端数' },
      { value: '~1,139', label: '内核声明' },
      {
        value: '4,164 / 4,164',
        label: 'HIP 与 Vulkan 测试集，逐位精确',
      },
    ],
  },
  story: {
    heading: '别再把同一个内核写*四*遍。',
    problem:
      '每家 GPU 厂商都有自己的内核语言。要在 Apple、NVIDIA 和 AMD 硬件上交付，就得为每一家把同一套数学重写、调优、测试一遍，数学一变，还得让每份副本同步更新。',
    outcome:
      '你只用 Rust 写一次内核。Iron 先把它转换为共享 IR，再生成 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V，一份定义覆盖你要面向的每一种后端。',
    outcomes: [
      '先在桌上的 Mac 上编写和调优。Metal 是首要目标，同一份定义可以带到其他后端。',
      '通过版本化的 C 与 Rust ABI，从你已有的代码里调用内核。',
      '用逐位精确的测试集检验各个后端，而不是指望两个后端碰巧一致。',
    ],
  },
  capabilities: {
    heading: 'Iron 能*做什么*。',
    intro: '从底层硬件一路搭起，为写内核的人而做。',
    items: [
      {
        title: '一份定义，四种后端',
        body: '内核先转换为共享 IR，再生成 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V。你只需维护一份源码。',
      },
      {
        title: '用 Rust 编写',
        body: '嵌入 Rust 的 DSL。内核是标注了 #[kernel] 的 Rust 函数，由 program_id、load、store 等基本操作构成。Iron 本身用 Rust 编写，兼顾速度与内存安全；它把依赖降到最少，供应链攻击的可乘之机更少。',
      },
      {
        title: '可从你的宿主代码调用',
        body: '版本化的 C 与 Rust ABI 让现有宿主无需围绕 Iron 重写，就能调用 Iron 内核。',
      },
      {
        title: '测试保证逐位精确，基准测试衡量性能',
        body: 'HIP 与 Vulkan 测试集共有 4,164 个用例，全部 4,164 个逐位精确。随附基准测试与性能分析工具，每个内核不仅经过检验，也经过测量。',
      },
      {
        title: '上千个内核',
        body: '目前约有 1,139 个内核声明。每一个都是所有后端共用的一份定义。',
      },
      {
        title: '调优用在刀刃上',
        body: '每个内核都先在 Metal 上编写并调优。CUDA 正在调优，ROCm 和 Vulkan 目前可以运行，但尚未调优。',
      },
    ],
  },
  specs: {
    heading: '技术*细节*。',
    rows: [
      {
        term: '语言',
        detail: '嵌入 Rust 的 DSL。内核是标注了 #[kernel] 的 Rust 函数。',
      },
      {
        term: '流程',
        detail: '一份内核定义先转换为共享 IR，再生成各个后端。',
      },
      {
        term: '后端',
        chips: [
          { label: 'Metal: MSL → .metallib' },
          { label: 'CUDA → PTX' },
          { label: 'HIP/ROCm: HIP → AMDGPU' },
          { label: 'Vulkan → SPIR-V' },
        ],
      },
      {
        term: '宿主 ABI',
        detail: '版本化的 C 与 Rust ABI，现有宿主可以直接调用 Iron 内核。',
      },
      { term: '内核数量', detail: '约 1,139 个内核声明。' },
      {
        term: '测试集',
        detail: 'HIP 与 Vulkan：4,164 个用例中 4,164 个逐位精确。',
      },
      {
        term: '可用性',
        detail: '抢先体验期间为私有闭源。',
      },
    ],
  },
  stack: {
    heading: '与其余*技术栈*协同工作。',
    intro:
      'Iron 可以独立使用。加上 Butter，在这些内核上运行模型；加上 Syrup，盯着它们所跑的 GPU；加上 Whisk，让你的 AI 记得你在做什么。',
  },
  faq: [
    {
      question: 'Iron 开源吗？',
      answer:
        '目前不开源。抢先体验期间，Iron 为私有闭源。申请访问，有更多内容可以分享时，我们会写信给你。',
    },
    {
      question: '它能在哪些硬件上运行？',
      answer:
        'Apple 芯片上的 Metal 是首要目标：每个内核都先在那里编写并调优。CUDA 已在 RTX 和 DGX Spark 上投入生产，正在调优，并已在 H100、H200、B100 和 B200 上完成首次运行。AMD 方面，已在 MI300 上完成首次运行，ROCm 和 Vulkan 目前可以运行，但尚未调优。',
    },
    {
      question: '我需要重写宿主代码吗？',
      answer:
        '调用 Iron 内核不需要。版本化的 C 与 Rust ABI 让现有宿主可以直接调用它们。',
    },
    {
      question: '它比手写的 CUDA 或 Metal 更快吗？',
      answer:
        '我们还没有发布基准测试数据，所以不会声称更快。目前能说的是：一份定义可以生成四种后端，并且 HIP 与 Vulkan 测试集逐位精确。',
    },
    {
      question: '怎么试用？',
      answer: '通过本页的表单申请抢先体验。',
    },
  ],
  cta: {
    title: '压出你的第一个*内核*。',
    body: 'Iron 目前处于抢先体验阶段，暂未开源。申请访问。',
    docsLabel: '阅读文档',
  },
};

export default ironZh;
