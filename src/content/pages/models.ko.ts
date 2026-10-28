import type { ModelsCopy } from './models';

const copy: ModelsCopy = {
  title: '메뉴에 오른 모델.',
  intro:
    'Hugging Face에서 곧바로 불러옵니다. 지원 범위는 Metal이 가장 넓고, CUDA는 모델별로 하나씩 추가하고 있습니다.',
  legend: { supported: '지원', inProgress: '곧 지원' },
  lanes: [
    [
      {
        lab: 'Meta',
        logo: 'meta',
        models: 'Llama 3 · 3.1 · 3.2 · 3.3, Muse Glimmer',
      },
      {
        lab: 'Google',
        logo: 'google',
        models: 'Gemma 2 · 3 · 4, PaliGemma',
      },
      {
        lab: 'Qwen',
        logo: 'qwen',
        models: 'Qwen 2 · 3 · 3.5 · 3.6 · 3.8, VL, Omni, ASR',
      },
      {
        lab: 'OpenAI',
        logo: 'openai',
        models: 'GPT-OSS 20B · 120B, Whisper',
      },
      {
        lab: 'Mistral AI',
        logo: 'mistral',
        models: 'Mistral, Mistral 3 VL, Pixtral, Voxtral',
      },
      {
        lab: 'NVIDIA',
        logo: 'nvidia',
        models: 'Nemotron H · 3.5, VLM, Diffusion, Parakeet',
      },
      {
        lab: 'DeepSeek',
        logo: 'deepseek',
        models: 'DeepSeek V4 · V4.1',
        status: 'in-progress',
      },
      { lab: 'Z.ai', logo: 'zai', models: 'GLM-5.3, GLM-OCR, GLM-ASR' },
      { lab: 'IBM', logo: 'ibm', models: 'Granite 3 · 4, Granite Speech' },
      {
        lab: 'OpenBMB',
        logo: 'openbmb',
        models: 'MiniCPM 5, MiniCPM-V 4.6, MiniCPM-o',
      },
      { lab: 'Tencent', logo: 'tencent', models: 'Hy3' },
      { lab: 'inclusionAI', logo: 'inclusionai', models: 'Ling 3.0' },
      {
        lab: 'StepFun',
        logo: 'stepfun',
        models: 'Step 3',
        status: 'in-progress',
      },
      { lab: 'BigCode', logo: 'bigcode', models: 'StarCoder2' },
    ],
    [
      { lab: 'Microsoft', logo: 'microsoft', models: 'Phi 3' },
      { lab: 'Liquid AI', logo: 'liquid', models: 'LFM2 · LFM2.5' },
      { lab: 'Ai2', logo: 'ai2', models: 'OLMo 1 · 2' },
      {
        lab: 'Hugging Face',
        logo: 'huggingface',
        models: 'SmolLM, SmolVLM',
      },
      { lab: 'TII', logo: 'tii', models: 'Falcon H1' },
      { lab: 'AI21', logo: 'ai21', models: 'Jamba' },
      { lab: 'Apple', logo: 'apple', models: 'FastVLM' },
      {
        lab: 'Shanghai AI Lab',
        logo: 'internlm',
        models: 'InternLM 2',
      },
      { lab: 'hexgrad', logo: 'hexgrad', models: 'Kokoro' },
      { lab: '01.AI', logo: '01ai', models: 'Yi 1.5' },
      { lab: 'Recursive', logo: 'recursive', models: 'Flint' },
      {
        lab: 'Poolside',
        logo: 'poolside',
        models: 'Laguna S 2.1 · XS 2.1',
      },
      {
        lab: 'Nanbeige',
        logo: 'nanbeige',
        models: 'Nanbeige 4.3',
        status: 'in-progress',
      },
      {
        lab: 'Fish Audio',
        logo: 'fishaudio',
        models: 'Drama-3',
        status: 'in-progress',
      },
      {
        lab: 'Cohere',
        logo: 'cohere',
        models: 'Cohere Transcribe',
        status: 'in-progress',
      },
    ],
  ],
};

export default copy;
