import type { AuraCopy } from './aura';

const copy: AuraCopy = {
  eyebrow: 'KV キャッシュ圧縮 · 私たちのオープンな研究から',
  title: 'ギガバイトあたり、より多くの*コンテキスト*を。',
  intro:
    'AURA は KV キャッシュを圧縮し、より長いコンテキストとより多くの同時セッションを同じメモリに収めます。私たちのオープンな研究 TurboQuant+ から始まり、いまは Iron と Butter でネイティブに動いています。',
  lineage: {
    heading: 'どこから来たか',
    steps: [
      {
        kicker: '01 · オープンな研究',
        title: 'TurboQuant+',
        body: '[TurboQuant 論文]（Google Research、ICLR 2026）の代表的なオープンソース実装と、その後の知見です。value の圧縮はほぼ無償で、品質低下は key から来ること、そして最初と最後の層は保護が必要なこと。私たちの llama.cpp フォーク llama-cpp-turboquant で公開しています。',
      },
      {
        kicker: '02 · 上流で採用',
        title: 'vLLM と Apple MLX',
        body: '同じ研究が KV キャッシュの dtype として vLLM に、KV キャッシュ方式として Apple mlx-swift-lm に入り、どちらも 2026 年にマージされました。',
      },
      {
        kicker: '03 · 私たちのスタックへ',
        title: 'Iron と Butter の AURA',
        body: '自社のカーネルとサーバーのために書き直しました。論文との違いが大きくなったので、固有の名前を持っています。',
      },
    ],
  },
  tiles: {
    heading: 'オープンな研究の公開結果',
    scope:
      'TurboQuant+ を私たちの llama.cpp フォーク llama-cpp-turboquant で測定。Butter の数値ではありません。',
    turbo4: {
      label: '最高品質設定での KV 圧縮率',
      detail: 'q8_0 比のパープレキシティ',
    },
    turbo3: {
      label: 'より高い圧縮設定での KV 圧縮率',
      detail: 'q8_0 比のパープレキシティ',
    },
    large: {
      label: 'パラメータ、128K コンテキスト、MacBook 一台',
      detail: 'ピークメモリ',
    },
    source: '出典',
  },
  ribbon: {
    label: 'キャッシュの配置',
    older: '古いコンテキスト · 圧縮済み',
    recent: '直近のウィンドウ · 非圧縮',
    note: '模式図。ブロック幅は turbo4 の公開比率 3.8 対 1 で描いており、実測した AURA の比率ではありません。',
  },
  changed: {
    heading: 'AURA で変わったこと',
    items: [
      '圧縮した KV を一つだけ持ち、grouped-query attention の同じグループのヘッド間で共有します。',
      '圧縮版 flash attention が、すべてのコーデック幅で Metal 上で動きます。',
      '圧縮は投機的デコードに合わせてスケジュールされ、ドラフトのトークンが確定済みの履歴を上書きすることはありません。',
      '長いコンテキストの prefill はウィンドウ化され attention sink を保持するので、コンテキストが伸びても最初のトークンに届きます。',
    ],
    hybrid:
      'ハイブリッドモード: 直近の履歴はフル精度のまま、古いコンテキストを圧縮。長いセッションでも、いちばん大事な場所の記憶を鮮明に保ちます。',
  },
  footnote:
    '圧縮率、パープレキシティの差、104B の結果は、llama-cpp-turboquant で測定した私たちのオープンな研究 TurboQuant+ によるものです。AURA はその成果を Iron と Butter の中でさらに先へ進めています。',
};
export default copy;
