import type { contact } from './contact';

const contactZh: (typeof contact)['en'] = {
  seo: {
    title: '联系我们',
    description:
      '销售、合作、媒体、支持、安全报告或招聘，都可以联系 Waffuru，也可以申请抢先体验。',
    keywords: [
      '联系 Waffuru',
      'AI 基础设施销售',
      '合作',
      'Waffuru 媒体',
      'Waffuru 抢先体验',
    ],
  },
  hero: {
    label: '联系',
    title: '告诉我们你在*打造*什么。',
    lede: '销售、合作、媒体、支持、安全与招聘，都可以发邮件到 hello@waffuru.ai。选择合适的主题即可。',
  },
  callouts: {
    title: '选一扇*门*。',
    intro: '无需填写表单。每个按钮都会打开一封已设好主题的邮件。',
    emailLabel: '发邮件给我们',
    items: [
      {
        subject: 'Sales',
        title: '销售',
        body: '想在自己的硬件，或一整个硬件集群上运行模型？告诉我们工作负载和运行位置。',
      },
      {
        subject: 'Partnerships',
        title: '合作',
        body: '硬件厂商、新型云服务商和模型团队：告诉我们你想一起打造什么。',
      },
      {
        subject: 'Press',
        title: '媒体',
        body: '在写本地 AI、GPU 软件，或打造它们的人？我们乐意聊聊。',
      },
      {
        subject: 'Support',
        title: '支持',
        body: '遇到故障，或哪里说得不清楚？请告诉我们你的硬件、运行了什么，以及发生了什么。',
      },
      {
        subject: 'Security',
        title: '安全',
        body: '发现了漏洞？请私下告诉我们，并在公开之前给我们留出修复的时间。',
      },
      {
        subject: 'Hiring',
        title: '招聘',
        body: '想一起打造这套技术栈？告诉我们你交付过什么，以及你想做什么。',
      },
    ],
  },
  earlyAccess: {
    title: '想*抢先*用上？',
    body: '我们的产品处于私有的抢先体验阶段。告诉我们你想运行什么、用什么硬件，等有合适的内容时，我们会写信给你。',
  },
};

export default contactZh;
