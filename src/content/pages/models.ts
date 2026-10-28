import type { Localized } from '@/content/types';
import es from './models.es';
import fr from './models.fr';
import ja from './models.ja';
import ko from './models.ko';
import zh from './models.zh';

/*
 * "Models on the menu.": the labs and model families Butter loads today, as
 * two marquee lanes on the Butter page. Lab, model and logo strings are the
 * same in every locale (names never translate); only the title, intro and
 * legend are prose.
 */

export type ModelLab = {
  /** Lab name, shown on the card. */
  lab: string;
  /** Logo file in `/public/logos/<logo>.svg`. */
  logo: string;
  /** Model families Butter loads today. */
  models: string;
  /** Anything not listed as in progress is supported. */
  status?: 'in-progress';
};

export type ModelsCopy = {
  title: string;
  intro: string;
  legend: { supported: string; inProgress: string };
  /** Two lanes; the second scrolls the other way. */
  lanes: [ModelLab[], ModelLab[]];
};

export const models: Localized<ModelsCopy> = {
  en: {
    title: 'Models on the menu.',
    intro:
      'Loaded straight from Hugging Face. Coverage is widest on Metal; CUDA support is added model by model.',
    legend: { supported: 'Supported', inProgress: 'Coming soon' },
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
  },
  es,
  fr,
  zh,
  ja,
  ko,
};
