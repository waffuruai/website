import type { QuantizedModelsCopy } from './quantized-models';

const copy: QuantizedModelsCopy = {
  eyebrow: '量子化モデル · 近日公開',
  title: 'より小さなモデルを、丁寧に*量子化*。',
  intro:
    'Butter が提供するモデルの量子化版を、公開している TurboQuant+ の重み研究と同じ手法で準備しています。ファイルはより小さく、品質はそのまま、より多くのモデルを同時に動かす余裕が生まれます。',
  method: {
    heading: '量子化の進め方',
    items: [
      {
        title: '層ごとに決める',
        body: 'モデル全体にひとつの設定を当てるのではなく、各層にそれぞれの精度を与えます。',
      },
      {
        title: '境界層を守る',
        body: '最初と最後の層は高い精度のまま残します。重みでも KV キャッシュでも、最も敏感な層です。',
      },
      {
        title: '精度はテンソルの役割で決まる',
        body: 'アテンションと FFN の読み出し射影はよく圧縮できます。ffn_down のような書き戻し射影はネイティブ形式のままにします。',
      },
      {
        title: '重みと KV をひとつの予算で',
        body: '重みの精度と KV キャッシュの精度をひとつのメモリ予算として選び、公開前に量子化していないベースラインと照合します。',
      },
    ],
  },
  tiles: {
    heading: '公開研究でこの手法が出した結果',
    scope:
      '当社の llama.cpp フォーク llama-cpp-turboquant 上で TurboQuant+ により計測。',
    weights: {
      label: 'Config I ポリシーによる重みの削減',
      detail: 'q8_0 比のパープレキシティ',
    },
    stacked: {
      label: '重みと KV を同時に圧縮したときの総メモリ削減',
      detail: 'q8_0 の重みと f16 KV 比のパープレキシティ',
    },
    source: '出典',
    paper: '重み圧縮の論文を読む',
  },
  strip: {
    label: '精度の配置',
    note: '模式図です。最初と最後の層はフル精度のまま、残りはテンソルの役割ごとに色分けしています。実際の層数とポリシーはモデルごとに異なります。',
    legend: {
      boundary: '境界層 · 高精度',
      attention: 'アテンション · 圧縮',
      ffnRead: 'FFN gate と up · 圧縮',
      ffnDown: 'FFN down · ネイティブ 4 ビット',
    },
    first: '最初の層',
    last: '最後の層',
  },
  soon: {
    heading: '近日公開',
    body: '最初のビルドは近日公開です。各ビルドには、ベースモデル、形式、ベースライン比のサイズ、通過した品質チェックを明記します。',
    // 案 B（名前を出さない）:
    // '当社のプロファイリングと評価ツールで計測しながら、時間とともに改善していきます。'
    tooling:
      '当社のプロファイリングと評価ハーネス Juke で計測しながら、時間とともに改善していきます。',
    cta: '公開を知らせてもらう',
  },
};

export default copy;
