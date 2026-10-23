import { mailto, site } from '@/content/site';
import type { support } from './support';

const supportZh: (typeof support)['en'] = {
  seo: {
    title: '支持',
    description:
      '目前可用的内容、抢先体验如何运作、支持的硬件、文档位置，以及如何报告 bug 或安全问题。',
    keywords: [
      'Waffuru 支持',
      'Waffuru 文档',
      'Waffuru 抢先体验',
      '报告安全漏洞',
      '本地 AI 硬件支持',
    ],
  },
  hero: {
    label: '支持',
    title: '有答案，需要时也有*真人*。',
    lede: '目前可用的内容、抢先体验如何运作，以及出问题时该去哪里。',
  },
  links: {
    title: '从这里*开始*',
    items: [
      {
        title: '阅读文档',
        body: '指南和参考资料都在 docs.waffuru.ai。',
        href: site.urls.docs,
      },
      {
        title: '发邮件寻求支持',
        body: 'Bug、疑问、安装问题。请说明你运行了什么，以及用的是什么硬件。',
        href: mailto('Support'),
      },
      {
        title: '报告安全问题',
        body: '请私下发邮件到 hello@waffuru.ai，主题写 Security。',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: '我们的安全联系方式，机器可读格式。',
        href: '/.well-known/security.txt',
        file: true,
      },
    ],
  },
  faq: [
    {
      question: '目前能用什么？',
      answer:
        '我们的产品（Iron、Butter、Waffle 和 Syrup）暂时是私有的闭源软件，尚未全面开放。抢先体验是最早用上的途径。指南和参考资料都在 docs.waffuru.ai。',
    },
    {
      question: '抢先体验如何运作？',
      answer:
        '填写抢先体验表单，告诉我们你在做什么、想在什么硬件上运行。等有合适的内容时，我们会写信给你。抢先体验是发布前的软件：可能变化，也可能出问题，你的反馈会让它变得更好。',
    },
    {
      question: '支持哪些硬件？',
      answer:
        'Apple 芯片是首要目标：每个内核都先为 Metal 编写并调优。NVIDIA CUDA 其次，已在 RTX 和 DGX Spark 上投入生产，数据中心 GPU 正在进行中。AMD ROCm 和 Vulkan 目前可以运行，但尚未调优。典型环境包括 MacBook 和 Mac Studio、RTX 工作站、DGX Spark、Strix Halo，以及新型云服务商的集群。',
    },
    {
      question: '文档在哪里？',
      answer:
        '在 docs.waffuru.ai。如果那里有错误或缺漏，请通过本页的支持链接告诉我们。',
    },
    {
      question: '如何报告 bug？',
      answer:
        '发邮件到 hello@waffuru.ai，主题写 Support；上方的“发邮件寻求支持”链接会帮你填好。请附上你的硬件和操作系统、运行了什么、预期是什么、实际发生了什么，并先从日志中删去隐私内容。',
    },
    {
      question: '如何报告安全问题？',
      answer:
        '发邮件到 hello@waffuru.ai，主题写 Security，并附上足以复现问题的细节。在我们有合理的时间修复之前，请先保密。我们的 security.txt 以机器可读的格式列出了同样的联系方式。',
    },
    {
      question: '我的数据会怎么处理？',
      answer:
        '我们的软件在本地运行，除非你主动选择启用会把数据发往别处的功能，否则数据始终留在你的机器上。在本网站上，我们只收集隐私政策中列出的内容，除非你接受，否则 Google Analytics 保持关闭。',
    },
  ],
  cta: {
    title: '这里没有？*问*我们。',
    body: '请把你的硬件、操作系统、运行的内容以及发生了什么发给我们。细节越多，越容易帮上忙。',
    docs: '阅读文档',
    email: '发邮件寻求支持',
  },
};

export default supportZh;
