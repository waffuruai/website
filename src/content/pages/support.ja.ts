import { mailto } from '@/content/site';
import type { support } from './support';

// TODO(founder): add response expectations, a disclosure policy (safe harbour,
// timelines) and a PGP key to the security answer below and to security.txt.
const supportJa: (typeof support)['en'] = {
  seo: {
    title: 'サポート',
    description:
      '現在利用できるもの、早期アクセスの流れ、対応ハードウェア、不具合・セキュリティ問題の報告方法。',
    keywords: [
      'Waffuru サポート',
      'Waffuru 早期アクセス',
      'セキュリティ問題の報告',
      'ローカル AI 対応ハードウェア',
    ],
  },
  hero: {
    label: 'サポート',
    title: '答えと、必要なときは*人*が。',
    lede: '今日使えるもの、早期アクセスの流れ、そして何かうまくいかないときの連絡先。',
  },
  links: {
    title: 'まずは、*ここから*',
    items: [
      {
        title: 'サポートにメールする',
        body: '不具合、質問、インストールのトラブル。何を実行したか、どのハードウェアかを添えてください。',
        href: mailto('Support'),
      },
      {
        title: 'セキュリティ問題を報告する',
        body: '非公開で、件名を Security にして hello@waffuru.ai へメールしてください。',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: 'セキュリティ連絡先を、機械で読める形式で公開しています。',
        href: '/.well-known/security.txt',
        file: true,
      },
    ],
  },
  faq: [
    {
      question: '今日使えるものは何ですか？',
      answer:
        '製品（Iron、Butter、Syrup、Whisk）は現時点では非公開でクローズドソースであり、一般提供されているものはまだありません。まず利用できるのは、早期アクセスの方々です。',
    },
    {
      question: '早期アクセスはどのような仕組みですか？',
      answer:
        '早期アクセスのフォームに、何をつくっているか、何の上で動かしたいかを書いて送ってください。合うものができ次第、ご連絡します。早期アクセスはリリース前のソフトウェアです。変更や不具合が起きることがあり、いただくフィードバックが改善の力になります。',
    },
    {
      question: 'どのハードウェアで動きますか？',
      answer:
        'Apple シリコンが第一の対象で、すべてのカーネルをまず Metal 向けに書き、チューニングしています。NVIDIA CUDA は RTX と DGX Spark で本番稼働中で、チューニングを進めています。H100、H200、B100、B200 でも初回実行を終えています。ROCm と Vulkan を通じた AMD 対応は急速に進んでいます。想定しているのは、MacBook と Mac Studio、RTX ワークステーション、DGX Spark、Strix Halo、そしてネオクラウドのフリートです。',
    },
    {
      question: '不具合はどう報告すればよいですか？',
      answer:
        '件名を Support にして hello@waffuru.ai へメールしてください。上の「サポートにメールする」リンクから開けば、件名が自動で入ります。お使いのハードウェアと OS、実行した内容、期待していた結果、実際に起きたことを書き、ログに含まれる個人的な情報は先に取り除いてください。',
    },
    {
      question: 'セキュリティ上の問題はどう報告すればよいですか？',
      answer:
        '件名を Security にして、再現に十分な詳細とともに hello@waffuru.ai へメールしてください。修正のための妥当な時間をいただくまでは、非公開にしてください。同じ連絡先は、機械で読める形式で security.txt にも載せています。',
    },
    {
      question: 'データはどうなりますか？',
      answer:
        'ソフトウェアはローカルで動き、データは、外部に送る機能をあなたがオプトインしない限り、あなたのマシンにとどまります。このウェブサイトで収集するのはプライバシーポリシーに記載したものだけで、Google Analytics は同意しない限りオフのままです。',
    },
  ],
  cta: {
    title: 'ここになければ、*聞いて*ください。',
    body: 'ハードウェア、OS、実行した内容、起きたことを送ってください。詳しいほど、お手伝いしやすくなります。',
    docs: 'ドキュメントを読む',
    email: 'サポートにメールする',
  },
};

export default supportJa;
