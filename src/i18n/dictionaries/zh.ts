import type { Dictionary } from '@/i18n/dictionaries/en';

const zh: Dictionary = {
  common: {
    requestAccess: '申请抢先体验',
    talkToUs: '联系我们',
    learnMore: '了解更多',
    readMore: '继续阅读',
    skipToContent: '跳到正文',
    backToTop: '回到顶部',
    copy: '复制',
    copied: '已复制',
    opensInNewTab: '（在新标签页中打开）',
    private: '未公开',
    inProgress: '下一步',
    faqHeading: '常见问题',
  },
  meta: {
    defaultTitle: 'Waffuru：把纯粹的数学压进硅片',
    defaultDescription:
      '为你已有的硬件提供 GPU 内核、推理、集群管理与记忆。Waffuru 打造 Iron、Butter、Waffle 和 Syrup。',
  },
  header: {
    mainNav: '主导航',
    home: 'Waffuru 首页',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    menu: '菜单',
  },
  theme: {
    label: '切换主题',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
  },
  language: {
    label: '切换语言',
  },
  nav: {
    products: '产品',
    solutions: '解决方案',
    company: '关于',
    blog: '博客',
    theStack: '技术栈',
    byCustomer: '适用对象',
    help: '帮助',
    allProducts: '查看完整技术栈',
    allSolutions: '全部解决方案',
    items: {
      stack: {
        label: 'Waffuru 技术栈',
        description: '四款产品，可单独使用，也可组合使用。',
      },
      iron: {
        label: 'Iron',
        description: '一次定义内核，生成四种后端。',
      },
      butter: {
        label: 'Butter',
        description: '无需 Python 的模型服务。',
      },
      waffle: {
        label: 'Waffle',
        description: '看清每一块 GPU 和其上运行的每个引擎。',
      },
      syrup: {
        label: 'Syrup',
        description: '让你的 AI 记得你在做什么。',
      },
      smallBusiness: {
        label: '小型企业',
        description: '在你已有的硬件上运行私有 AI。',
      },
      enterprise: {
        label: '大型企业',
        description: '自主可控的推理，可部署在本地或你的云上。',
      },
      neoclouds: {
        label: '新型云服务商',
        description: '每块 GPU 产出更多 token，一个视图管理整个集群。',
      },
      aiCompanies: {
        label: 'AI 模型与推理公司',
        description: '在每种后端上获得更快的内核与模型服务。',
      },
      about: {
        label: '关于我们',
        description: '我们的使命、信念以及我们为何而建。',
      },
      team: {
        label: '团队',
        description: '厨房里的人。',
      },
      careers: {
        label: '加入我们',
        description: '与我们一起打造技术栈。',
      },
      brand: {
        label: '品牌',
        description: '华夫饼标志、配色与字体。',
      },
      blog: {
        label: '博客',
        description: '新闻、研究笔记与版本发布。',
      },
      docs: {
        label: '文档',
        description: 'Iron 与 Butter 的指南和参考。',
      },
      support: {
        label: '支持',
        description: '解答以及联系方式。',
      },
      contact: {
        label: '联系',
        description: '销售、合作、媒体与招聘。',
      },
    },
  },
  footer: {
    heading: '页脚',
    products: '产品',
    solutions: '解决方案',
    company: '公司',
    help: '帮助',
    terms: '使用条款',
    privacy: '隐私政策',
    cookies: 'Cookie 政策',
    madeIn: '在北美用 🤖 打造',
    flagsLabel: '美国和加拿大',
    social: 'Waffuru 的 {network}',
    rights: '© {year} Waffuru AI Inc.',
  },
  newsletter: {
    heading: '获取最新动态',
    description:
      '版本发布、研究笔记，偶尔还有一份食谱。不发垃圾邮件，可随时退订。',
    email: '电子邮箱',
    placeholder: 'you@company.com',
    submit: '订阅',
    submitting: '正在订阅…',
    honeypot: '请勿填写此字段',
    success: '订阅成功，感谢关注。',
    errorInvalid: '请输入有效的电子邮箱地址。',
    errorGeneric: '提交失败。请重试，或发送邮件至 hello@waffuru.ai。',
  },
  consent: {
    label: 'Cookie 同意',
    message:
      '只有在你同意后，我们才会使用 Google Analytics Cookie。主题和语言等必要存储始终启用。',
    noticeMessage:
      '我们使用 Google Analytics 了解哪些页面有用。你可以随时选择退出。',
    gpcNotice:
      '你的浏览器发送了“全球隐私控制”（GPC）信号，因此分析功能保持关闭。',
    policyLink: 'Cookie 政策',
    accept: '接受',
    decline: '拒绝',
    ok: '好的',
    optOut: '退出',
    settings: 'Cookie 设置',
    settingsDescription:
      '选择是否允许我们使用分析 Cookie。主题和语言等必要存储始终启用。',
    analyticsLabel: '分析',
    analyticsDescription: 'Google Analytics，用于了解哪些页面有用。',
    save: '保存',
    dismiss: '关闭',
  },
  blog: {
    categories: {
      Company: '公司',
      Product: '产品',
      Engineering: '工程',
      Research: '研究',
    },
    heading: '博客',
    description: '来自 Waffuru 团队的新闻、研究笔记与版本发布。',
    all: '全部',
    readingTime: '阅读约 {minutes} 分钟',
    by: '作者：{author}',
    onThisPage: '本页内容',
    share: '分享',
    shareOn: '分享到 {network}',
    related: '继续阅读',
    backToBlog: '全部文章',
    englishOnly: '本文为英文。',
    rss: 'RSS 订阅',
  },
  notFound: {
    title: '这个页面已经化掉了',
    description: '你要找的页面不存在或已被移动。',
    home: '返回首页',
  },
};

export default zh;
