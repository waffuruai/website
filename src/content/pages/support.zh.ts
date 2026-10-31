import { mailto } from '@/content/site';
import type { support } from './support';

const supportZh: (typeof support)['en'] = {
  seo: {
    title: '支持',
    description:
      '目前可用的内容、抢先体验如何运作、支持的硬件，以及如何报告 bug 或安全问题。',
    keywords: [
      'Waffuru 支持',
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
        title: '发邮件寻求支持',
        body: 'Bug、疑问、安装问题。请说明你运行了什么，以及用的是什么硬件。',
        href: mailto('Support'),
      },
      {
        title: '报告安全问题',
        body: '请私下发邮件到 security@waffuru.ai，主题写 Security。',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: '我们的安全联系方式，机器可读格式。',
        href: '/.well-known/security.txt',
        file: true,
      },
      {
        title: '漏洞披露政策',
        body: '哪些在范围内、我们多快回应，以及对善意研究的安全港。',
        href: '/security',
      },
    ],
  },
  faq: [
    {
      question: '目前能用什么？',
      answer:
        '我们的产品（Iron、Butter、Syrup 和 Whisk）暂时是私有的闭源软件，尚未全面开放。抢先体验是最早用上的途径。',
    },
    {
      question: '抢先体验如何运作？',
      answer:
        '填写抢先体验表单，告诉我们你在做什么、想在什么硬件上运行。等有合适的内容时，我们会写信给你。抢先体验是发布前的软件：可能变化，也可能出问题，你的反馈会让它变得更好。',
    },
    {
      question: '支持哪些硬件？',
      answer:
        'Apple 芯片是首要目标：每个内核都先为 Metal 编写并调优。NVIDIA CUDA 已在 RTX 和 DGX Spark 上投入生产，正在调优，并已在 H100、H200、B100 和 B200 上完成首次运行。通过 ROCm 和 Vulkan 支持 AMD，进展迅速。典型环境包括 MacBook 和 Mac Studio、RTX 工作站、DGX Spark、Strix Halo，以及新型云服务商的集群。',
    },
    {
      question: '如何报告 bug？',
      answer:
        '发邮件到 hello@waffuru.ai，主题写 Support；上方的“发邮件寻求支持”链接会帮你填好。请附上你的硬件和操作系统、运行了什么、预期是什么、实际发生了什么，并先从日志中删去隐私内容。',
    },
    {
      question: '如何报告安全问题？',
      answer:
        '发邮件到 security@waffuru.ai，主题写 Security，并附上足以复现问题的细节。我们会在 3 个工作日内确认收到，按严重程度修复，并在 90 天内与你商定公开披露；[漏洞披露政策](https://waffuru.ai/security)（英文）说明了范围、规则和安全港。我们的 security.txt 以机器可读的格式列出了同样的联系方式。',
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
