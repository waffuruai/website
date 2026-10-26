import type { QuantizedModelsCopy } from './quantized-models';

const copy: QuantizedModelsCopy = {
  eyebrow: '양자화 모델 · 곧 공개',
  title: '더 작은 모델을, 신중하게 *양자화*했습니다.',
  intro:
    'Butter가 서비스하는 모델의 양자화 버전을, 공개된 TurboQuant+ 가중치 연구와 같은 방법으로 준비하고 있습니다. 파일은 더 작고, 품질은 그대로이며, 더 많은 모델을 동시에 돌릴 여유가 생깁니다.',
  method: {
    heading: '양자화 방식',
    items: [
      {
        title: '레이어별로 정합니다',
        body: '모델 전체에 하나의 설정을 쓰는 대신, 각 레이어에 고유한 정밀도를 부여합니다.',
      },
      {
        title: '경계 레이어를 보호합니다',
        body: '첫 레이어와 마지막 레이어는 더 높은 정밀도로 유지합니다. 가중치에서도 KV 캐시에서도 가장 민감한 레이어입니다.',
      },
      {
        title: '정밀도는 텐서의 역할을 따릅니다',
        body: '어텐션과 FFN 읽기 투영은 잘 압축됩니다. ffn_down 같은 쓰기 투영은 네이티브 형식을 유지합니다.',
      },
      {
        title: '가중치와 KV를 하나의 예산으로',
        body: '가중치 정밀도와 KV 캐시 정밀도를 하나의 메모리 예산으로 함께 정한 뒤, 공개 전에 양자화하지 않은 기준선과 비교해 확인합니다.',
      },
    ],
  },
  tiles: {
    heading: '공개 연구에서 이 방법이 낸 결과',
    scope:
      '당사의 llama.cpp 포크 llama-cpp-turboquant에서 TurboQuant+로 측정했습니다.',
    weights: {
      label: 'Config I 정책으로 줄어든 가중치 크기',
      detail: 'q8_0 대비 퍼플렉서티',
    },
    stacked: {
      label: '가중치와 KV를 함께 압축했을 때 줄어든 총 메모리',
      detail: 'q8_0 가중치와 f16 KV 대비 퍼플렉서티',
    },
    source: '출처',
    paper: '가중치 압축 논문 읽기',
  },
  strip: {
    label: '정밀도 배치',
    note: '개념도입니다. 첫 레이어와 마지막 레이어는 전체 정밀도를 유지하고, 나머지는 텐서 역할에 따라 색을 입혔습니다. 실제 레이어 수와 정책은 모델마다 다릅니다.',
    legend: {
      boundary: '경계 레이어 · 높은 정밀도',
      attention: '어텐션 · 압축',
      ffnRead: 'FFN gate와 up · 압축',
      ffnDown: 'FFN down · 네이티브 4비트',
    },
    first: '첫 레이어들',
    last: '마지막 레이어들',
  },
  soon: {
    heading: '곧 공개',
    body: '첫 빌드가 곧 공개됩니다. 각 빌드는 기반 모델, 형식, 기준선 대비 크기, 통과한 품질 검사와 함께 공개됩니다.',
    // 변형 B, 이름 없이:
    // '자체 프로파일링과 평가 도구로 측정하면서 시간이 지날수록 더 나아질 것입니다.'
    tooling:
      '자체 프로파일링과 평가 하네스인 Juke로 측정하면서 시간이 지날수록 더 나아질 것입니다.',
    cta: '출시 알림 받기',
  },
};

export default copy;
