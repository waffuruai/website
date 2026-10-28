import type { pantry } from './pantry';

const pantryZh: (typeof pantry)['en'] = {
  seo: {
    title: 'Pantry：适用于 macOS 和 Linux 的免费漏洞扫描器',
    description:
      'Pantry 找出真正影响你机器的漏洞，并修复能安全修复的部分。免费开源，用 Rust 编写。无遥测，不用 AI。',
    keywords: [
      '漏洞扫描器',
      'CVE 扫描器',
      '开源安全扫描工具',
      'macOS 漏洞修补',
      'Linux 漏洞扫描器',
      'OSV',
      'CISA KEV',
      'wpantry',
    ],
  },
  hero: {
    label: '免费 · 开源 · macOS 与 Linux',
    title: '从漏洞暴露到*修补*，只需几分钟。',
    lede: 'Pantry 会对照公开的漏洞数据，检查你的 Mac 或 Linux 机器上安装的一切，以及其中的每个代码仓库。它只报告真正影响你的问题，指出修复它的版本，并替你应用能安全完成的修复。',
    primary: '保护你的系统',
    secondary: '了解更多',
    source: '查看源代码',
    windows: 'Windows 支持已在计划中。',
    windowsLink: '需要的话告诉我们',
    panelLabel: '免费 · 开源',
    highlights: [
      { value: '免费', label: '开源，MIT 许可证，人人可用' },
      { value: '本地', label: '扫描：只有软件包名称和版本会离开你的机器' },
      { value: '几秒', label: '当天再次扫描，直接读取磁盘上的缓存' },
    ],
  },
  how: {
    title: '安装。扫描。缓存。*修复*。',
    intro:
      '一个小巧的二进制文件，在你的机器上完成全部工作。离开机器的只有软件包名称和版本号。',
    caption: '某台机器的示例输出，你的结果会有所不同。',
    stepsLabel: 'Pantry 的工作方式',
    pause: '暂停',
    play: '播放',
    steps: [
      {
        id: 'install',
        label: '安装',
        title: '运行之前先验证',
        body: 'Pantry 能读取你的整个主目录，所以每个版本都经过签名、附有哈希，并且可复现构建。下载的文件在运行之前，会先由 packslip 或 GitHub 完成校验。',
        flow: ['已签名的版本', '签名 + SHA-256', '你的机器'],
        note: '任一项校验不通过，下载的文件就绝不会被安装。',
      },
      {
        id: 'scan',
        label: '扫描',
        title: '只报与你相关的',
        body: 'Pantry 清点你的运行时、软件包、应用以及每个仓库的锁文件，再拿这些确切版本去查询 OSV.dev、CISA KEV 和 endoflife.date。你没安装的东西，一概不会出现在报告里。',
        flow: [
          '你的机器',
          '名称 + 版本',
          'OSV.dev · CISA KEV · endoflife.date',
        ],
        note: '文件内容、路径和机密信息绝不会离开你的机器。',
      },
      {
        id: 'cache',
        label: '缓存',
        title: '第二次，只要几秒',
        body: '查询结果存进你磁盘上的 SQLite 数据库，每次运行也都留有记录。同一天再扫描一次只需几秒，还能离线搜索安全公告。',
        flow: ['公开数据', '你磁盘上的 SQLite', '下一次扫描'],
        note: '缓存归你所有：就是普通的 SQLite，可以只读查询。',
      },
      {
        id: 'fix',
        label: '修复',
        title: '值得信赖的修复',
        body: '先预览计划，再让 Pantry 执行安全的用户级更新，然后重新检查。凡是需要 sudo 或改代码的，都会打印出来，由你自己执行。',
        flow: ['修复计划', '执行安全更新', '再次检查'],
        note: 'Pantry 从不运行 sudo，也从不改动你的代码。',
      },
    ],
  },
  install: {
    title: '保护你的*系统*。',
    intro:
      '自己想核验多少，由你决定。无论哪种方式，都会在任何东西运行之前先验证发布版本。',
    methods: [
      {
        id: 'mise',
        label: '一行命令',
        title: '用 mise',
        body: 'mise 会读取发布版本附带的已签名 packslip，在安装任何东西之前先对照我们的发布工作流进行验证，之后每次更新都会记住这个签名者。',
        link: 'packslip 是什么？',
      },
      {
        id: 'script',
        label: '不用 mise',
        title: '用安装脚本',
        body: '为你的机器挑选合适的构建，用 SHA256SUMS 核对，再用 packslip、GitHub CLI 或 cosign 验证签名，然后安装到 ~/.local/bin。',
        link: '先读一读脚本',
      },
      {
        id: 'verify',
        label: '手动',
        title: '自己验证',
        body: '下载二进制文件，用 SHA256SUMS、它已签名的 packslip 和 GitHub 构建证明进行核对，然后安装。同时也提供 cosign bundle。',
        link: '完整安装指南',
      },
    ],
    then: '然后扫描，查看计划：',
  },
  checks: {
    title: '核查货架上的*一切*。',
    intro: '检查食品储藏柜，就是看看有什么、什么过期了、什么需要换掉。',
    items: [
      {
        title: '已安装的一切',
        body: '运行时和编译器（包括版本管理器保留的每个版本）、包管理器、CLI 工具、数据存储、Docker、Homebrew 和全局软件包。',
      },
      {
        title: '每个仓库的锁文件',
        body: 'Cargo、npm、pnpm、yarn、bun、Go、uv、poetry、pip、Bundler、Composer 等，赶在有漏洞的代码发布之前。',
      },
      {
        title: '不只 CVE，还有恶意软件',
        body: '每个软件包名都会对照 OpenSSF 恶意软件包索引，编辑器扩展则对照 VS Code 的恶意扩展列表。',
      },
      {
        title: '泄露的机密',
        body: '仓库 git 历史中任何位置提交过的凭据，报告时会做脱敏处理。',
      },
      {
        title: '你的 AI 编程工具',
        body: 'Claude Code、Codex、Cursor、Gemini CLI 等智能体实际运行的内容：它们的 MCP 服务器、插件、技能和捆绑的软件包。',
      },
      {
        title: '操作系统、浏览器和应用',
        body: 'macOS 软件更新、主流 Linux 发行版的软件包、Chrome、Firefox、Electron 应用及其他应用，都会与各自的最新版本比对。',
      },
      {
        title: '生命周期终止',
        body: '不再获得安全修复的运行时和数据存储，并注明停止支持的日期。',
      },
      {
        title: '已被攻破的证书颁发机构',
        body: '对照已知不再受信任的证书颁发机构，检查你的系统以及 OpenSSL、Homebrew、Python 和 Node 的信任存储。',
      },
      {
        title: '供应链风险',
        body: '超出你允许列表的许可证、npm 安装脚本，以及你的仓库构建所基于的容器镜像。',
      },
    ],
  },
  sources: {
    title: '答案*从何而来*。',
    intro:
      '只用公开数据，没有付费墙。每条检查结果都附有对应的安全公告 ID，你可以到源头查证。',
    items: {
      osv: '覆盖各大软件包生态和 Linux 发行版的公开漏洞记录。Pantry 查询的正是你所用的确切版本。',
      ghsa: 'GitHub 针对开源软件包发布的安全公告，经由 OSV 进入 Pantry。',
      kev: '攻击者此刻正在利用的漏洞。Pantry 把它们排在最前面。',
      eol: '运行时和数据存储何时不再获得安全修复。',
      malicious:
        '专为作恶而发布的软件包，由 Open Source Security Foundation 收集。',
      vendors:
        '直接来自厂商的发布与安全数据，涵盖应用、浏览器、数据库、Linux 软件包和编辑器扩展。',
    },
  },
  trust: {
    title: '为赢得*信任*而打造。',
    intro:
      '安全工具能看到你的整台机器。所以 Pantry 让自身的足迹尽量小，每一项说法都可以查证。',
    items: [
      {
        title: '无遥测',
        body: 'Pantry 从不汇报你的任何情况。它唯一发送的，是发给 OSV.dev 用于查询的软件包名称和版本。',
      },
      {
        title: '不用 AI',
        body: '朴素、确定性的代码。同一台机器，每次都得到同样的结果。',
      },
      {
        title: '用 Rust 编写',
        body: '内存安全，禁止 unsafe 代码，编译为单个静态二进制文件。',
      },
      {
        title: '依赖极少',
        body: '少量锁定版本的 Rust crate，每一个都经过审查。无需安装任何运行时。',
      },
      {
        title: '有版本，有哈希',
        body: '每个版本都打上标签，发布前重新构建并确保逐字节一致，并列入 SHA256SUMS。',
      },
      {
        title: '两种验证方式',
        body: '在运行之前，用已签名的 packslip 或 GitHub 构建证明校验下载的文件。',
      },
      {
        title: '先只读',
        body: '扫描不会改动任何东西。修复只在你要求时才执行，而且从不使用 sudo。',
      },
      {
        title: '连不上不等于没问题',
        body: '如果某个数据源无法访问，Pantry 会标明“未检查”，绝不会把它算作安全。',
      },
      {
        title: '免费且开源',
        body: '采用 MIT 许可证。逐行阅读、自由 fork，想在多少台机器上运行都可以。',
      },
    ],
  },
  uses: {
    title: '适用于你、你的智能体和整个*机群*。',
    intro:
      '同一个二进制文件，可以跑在笔记本上、编程智能体里、CI 中，或几百台服务器上。',
    items: [
      {
        title: '个人',
        body: '运行它，查看计划，应用安全的修复。退出码会告诉你是否还有需要你处理的事。',
      },
      {
        title: '智能体',
        body: '结构化的 JSON 和内置的技能（wpantry skill）教会你的编程智能体分诊与修复，全程不运行 sudo。',
      },
      {
        title: '机群与 CI',
        body: '指向一个代码检出目录，跳过本机扫描，只要发现已有修复发布的问题，就让构建失败。',
      },
    ],
  },
  faq: [
    {
      question: '哪些数据会离开我的机器？',
      answer:
        '发送给 OSV.dev 的软件包名称和版本，以及对公开数据的下载，例如 CISA 的已知被利用漏洞（Known Exploited Vulnerabilities）列表和 endoflife.date。文件内容、路径和机密信息绝不会离开。唯一的例外是可选的邮箱泄露检查，而且只有在你同意之后才会运行。',
    },
    {
      question: '需要 sudo 吗？',
      answer:
        '不需要。Pantry 以你的身份运行。需要 sudo 的修复，比如操作系统软件包，会打印出来由你自己执行。',
    },
    {
      question: '为什么免费？',
      answer:
        '因为安全不该取决于你付得起多少钱。漏洞数据一旦藏在付费墙后，最承受不起数据泄露的人反而暴露得最多。Pantry 使用公开数据，对所有人免费。',
    },
    {
      question: '它和 CVE 订阅源有什么不同？',
      answer:
        '订阅源列出的是任何地方出过的所有问题。Pantry 告诉你哪些问题影响你机器上的确切版本，以及哪个版本修复了它。',
    },
    {
      question: '为什么叫 Pantry？',
      answer:
        'Pantry 在英文里是食品储藏柜的意思。检查一遍储藏柜，就知道有什么、什么过期了、什么被召回了。这正是它的工作。命令是 wpantry。',
    },
    {
      question: '能在 Windows 上运行吗？',
      answer:
        '暂时不能。Pantry 目前支持 macOS 和 Linux。Windows 支持已在计划中，如果需求足够多，我们会加快进度，所以需要的话请告诉我们。',
    },
    {
      question: '我的 AI 智能体能用它吗？',
      answer:
        '可以。wpantry --json 为你的智能体提供结构化的检查结果，wpantry skill 会输出一项技能，教它分诊和修复，并且绝不执行需要 sudo 的步骤。',
    },
  ],
  cta: {
    title: '检查你的*储藏柜*。',
    body: '免费、开源，运行前先经过验证。愿意的话，先读读源代码。这正是意义所在。',
  },
};

export default pantryZh;
