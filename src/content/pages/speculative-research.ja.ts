import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: 'サンプリングモード',
    metric: '指標',
    comparison: '別ワークロードの中央値',
    prefill: '単一ストリームのプリフィル',
    singleTtft: '単一ストリームのTTFT',
    lane: '同時リクエストごとのデコード中央値',
    concurrentTtft: '同時処理のTTFT中央値',
  },
  eyebrow: 'Apple silicon で実測 · 2026年10月19日',
  title: '27B。\n*16リクエスト。Mac 1台。*',
  intro:
    'リクエストが重なってもローカルエージェントを動かし続ける。Butter と Iron はネイティブ Metal カーネル、投機的デコード、共有検証を組み合わせます。M5 Max 1台での実測結果です。',
  greedy: 'グリーディ · T0',
  sampled: 'サンプリング · T0.7',
  unit: 'tok/s',
  singleTitle: 'アクティブなリクエスト1件',
  singleScope: '入力2,052トークン · 出力上限128トークン',
  burstTitle: '16件の同時リクエスト',
  burstScope: 'バースト全体 · プリフィルと終了処理を含む',
  gainTitle: '全件デコード中の高速化',
  gainScope: '全件デコード中の改善 · 16件のペア比較',
  before: '変更前',
  after: '変更後',
  activeTitle: '同じモデル。繰り返す処理を減らす。',
  activeScope:
    '全リクエストがデコードしている共通区間だけを計測。上のバースト全体とは別の試行です。',
  replay: 'フローを再生',
  illustration: '仕組み · 模式図',
  privateLanes: 'リクエストごとの独立状態',
  sharedVerify: 'ターゲットの共有検証',
  committed: '検証済みトークンだけ進む',
  diagramNote:
    '16件のリクエストがローカル推論システムを共有します。並行処理の概念図であり、内部スケジューリング、時間、採択率を表すものではありません。',
  details: '試験条件と制限を見る',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2、M5 Max 128 GiB、Metal、raw BF16 KV。単一ストリーム：3試行、入力2,052、出力上限128。バースト全体：16件を3試行、1件あたり入力約937、出力上限600。新規サーバーでウォームアップを除外し、計測プレフィックスの再利用なし。T0.7は top-p 0.95、top-k 20、min-p 0。',
  cost: 'ペア比較は入力882–999、出力上限600。グリーディ3ペア、サンプリング8ペア。初回トークン時間p50は9.030秒から9.397秒に増加。スループットの改善であり、一律の低遅延化ではありません。',
  qualification:
    'グリーディ比較で候補48件の応答テキストと数を保持。別のエージェント再生でも111/111件を保持しましたが遅延は改善していません。一般的な品質、ツール精度、トークン削減の証明ではありません。',
};
export default copy;
