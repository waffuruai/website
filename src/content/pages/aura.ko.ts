import type { AuraCopy } from './aura';

const copy: AuraCopy = {
  eyebrow: 'KV 캐시 압축 · 우리의 공개 연구에서',
  title: '기가바이트당 더 많은 *컨텍스트*.',
  intro:
    'AURA는 KV 캐시를 압축해 더 긴 컨텍스트와 더 많은 동시 세션을 같은 메모리에 담습니다. 우리의 공개 연구 TurboQuant+에서 시작해 지금은 Iron과 Butter에서 네이티브로 동작합니다.',
  lineage: {
    heading: '어디에서 왔는가',
    steps: [
      {
        kicker: '01 · 공개 연구',
        title: 'TurboQuant+',
        body: '[TurboQuant 논문](Google Research, ICLR 2026)의 대표적인 오픈소스 구현과 후속 발견입니다. value 압축은 거의 공짜이고, 품질 손실은 key에서 오며, 첫 층과 마지막 층은 보호가 필요합니다. 우리의 llama.cpp 포크 llama-cpp-turboquant로 공개했습니다.',
      },
      {
        kicker: '02 · 업스트림 채택',
        title: 'vLLM과 Apple MLX',
        body: '같은 연구가 vLLM에는 KV 캐시 dtype으로, Apple mlx-swift-lm에는 KV 캐시 방식으로 들어갔고, 둘 다 2026년에 병합되었습니다.',
      },
      {
        kicker: '03 · 우리 스택 안으로',
        title: 'Iron과 Butter의 AURA',
        body: '우리 자체 커널과 서버에 맞춰 다시 썼습니다. 이제 논문과 충분히 달라져 고유한 이름을 가집니다.',
      },
    ],
  },
  tiles: {
    heading: '공개 연구의 공개 결과',
    scope:
      'TurboQuant+를 우리의 llama.cpp 포크 llama-cpp-turboquant에서 측정했습니다. Butter의 수치가 아닙니다.',
    turbo4: {
      label: '최고 품질 설정의 KV 압축률',
      detail: 'q8_0 대비 퍼플렉시티',
    },
    turbo3: {
      label: '더 높은 압축 설정의 KV 압축률',
      detail: 'q8_0 대비 퍼플렉시티',
    },
    large: {
      label: '파라미터, 128K 컨텍스트, MacBook 한 대',
      detail: '최대 메모리',
    },
    source: '출처',
  },
  ribbon: {
    label: '캐시 배치 방식',
    older: '오래된 컨텍스트 · 압축됨',
    recent: '최근 창 · 비압축',
    note: '개략도입니다. 블록 너비는 turbo4의 공개 비율 3.8 대 1로 그렸으며, 측정된 AURA 비율이 아닙니다.',
  },
  changed: {
    heading: 'AURA에서 달라진 점',
    items: [
      '압축된 KV 사본 하나를 grouped-query attention 같은 그룹의 헤드들이 공유합니다.',
      '압축 flash attention이 모든 코덱 폭에서 Metal 위에서 동작합니다.',
      '압축은 추측 디코딩에 맞춰 스케줄되어, 초안 토큰이 확정된 기록을 덮어쓰지 않습니다.',
      '긴 컨텍스트 prefill은 창 단위로 나뉘고 attention sink를 유지해, 컨텍스트가 길어져도 첫 토큰에 닿을 수 있습니다.',
    ],
    hybrid:
      '하이브리드 모드: 최근 기록은 전체 정밀도로 유지하고 오래된 컨텍스트는 압축해, 긴 세션도 가장 중요한 곳의 기억을 선명하게 지킵니다.',
  },
  footnote:
    '압축률, 퍼플렉시티 변화, 104B 결과는 llama-cpp-turboquant에서 측정한 우리의 공개 연구 TurboQuant+에서 나왔습니다. AURA는 Iron과 Butter 안에서 그 작업을 한 걸음 더 나아가게 합니다.',
};
export default copy;
