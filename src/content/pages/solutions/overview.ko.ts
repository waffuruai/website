import type { solutionsOverview } from './overview';

const solutionsOverviewKo: (typeof solutionsOverview)['en'] = {
  seo: {
    title: 'AI 추론 솔루션',
    description:
      '중소기업, 엔터프라이즈, 네오클라우드, AI 기업을 위한 로컬 우선 AI 스택. 워크로드당 비용은 낮추고, 추론은 더 낫게, 통제는 더 강하게.',
    keywords: ['AI 추론 솔루션', '로컬 우선 AI'],
  },
  hero: {
    label: '솔루션',
    title: '해야 할 *일*에 맞춘 로컬 우선 AI.',
    lede: 'Waffuru는 커널부터 메모리까지 이어지는 하나의 스택으로, 보유하거나 임대한 하드웨어에서 모델을 빠르게 돌립니다. 하려는 일과 가장 가까운 페이지를 골라 보세요.',
  },
  cards: {
    label: '누구를 위한 것인가',
    title: '당신의 *자리*를 찾으세요.',
    intro:
      '네 부류의 사용자, 하나의 스택. 각 페이지에서 문제, 할 수 있는 일, 지금 되는 것을 다룹니다.',
  },
  values: {
    label: '변하지 않는 것',
    title: '모두에게 해당하는 *세 가지* 이유.',
    intro: '사용자마다 하는 일은 다르지만, 이 세 가지는 모두에게 해당합니다.',
    items: [
      {
        tag: 'cost',
        title: '워크로드당 *비용*.',
        body: '전력이 한계라면 와트당 토큰 수와 워크로드당 비용은 여전히 개선할 수 있는 지표입니다. Waffuru는 이 둘을 중심으로 만들어졌습니다.',
        points: [
          '보유하거나 임대한 하드웨어에서 더 낮은 토큰당 비용으로 실행',
          '양자화된 모델로 가진 메모리에 더 많이 적재',
          'Syrup으로 놀고 있는 용량을 확인',
        ],
      },
      {
        tag: 'inference',
        title: '더 나은 *추론*.',
        body: '핫 패스에 Python이 없는 엔진에서, 백엔드별로 튜닝한 커널과 양자화된 모델·KV 캐시, 추측 디코딩을 제공합니다.',
        points: [
          'Metal이 먼저, 그다음 CUDA, ROCm과 Vulkan은 구동 중',
          '변환 없이 Hugging Face 모델 로드',
          '텍스트, 비전, 음성, 옴니 모델',
        ],
      },
      {
        tag: 'control',
        title: '더 많은 *통제*.',
        body: '로컬 우선: 노트북이든 온프레미스든 자체 클라우드든, 직접 동의하지 않는 한 데이터는 있는 곳에 그대로 있습니다.',
        points: [
          'OpenAI 호환 서빙이라 기존 앱이 그대로 동작',
          'Syrup은 vLLM, SGLang, llama.cpp와도 동작',
          '특정 엔진이나 벤더에 묶이지 않음',
        ],
      },
    ],
  },
  cta: {
    title: '*자리*에 앉으세요.',
    body: '얼리 액세스 중이며 당분간 비공개 소스입니다. 무엇을 돌리고 싶은지 알려 주시면 답장드리겠습니다.',
  },
};

export default solutionsOverviewKo;
