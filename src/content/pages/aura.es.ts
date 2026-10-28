import type { AuraCopy } from './aura';

const copy: AuraCopy = {
  eyebrow: 'Compresión de la caché KV · desde nuestra investigación abierta',
  starsLabel: 'estrellas en GitHub',
  title: 'Más contexto por *gigabyte*.',
  intro:
    'AURA es nuestra compresión para la caché KV, los embeddings y los pesos de los modelos. Aquí comprime la caché KV, de modo que contextos más largos y más sesiones concurrentes caben en la misma memoria. Empezó como nuestra investigación abierta TurboQuant+ y hoy se ejecuta de forma nativa en Iron y Butter.',
  lineage: {
    heading: 'De dónde viene',
    steps: [
      {
        kicker: '01 · Investigación abierta',
        title: 'TurboQuant+',
        body: 'La principal implementación de código abierto del [artículo TurboQuant] (Google Research, ICLR 2026) con hallazgos posteriores: comprimir los valores casi no cuesta nada, la pérdida de calidad viene de las claves, y la primera y la última capa necesitan protección. Publicada en nuestro fork de llama.cpp, llama-cpp-turboquant.',
      },
      {
        kicker: '02 · Adoptada upstream',
        title: 'vLLM y Apple MLX',
        body: 'La misma investigación llegó a vLLM como un dtype de caché KV y a Apple mlx-swift-lm como un esquema de caché KV, ambos integrados en 2026.',
      },
      {
        kicker: '03 · En nuestra pila',
        title: 'AURA en Iron y Butter',
        body: 'Reescrita para nuestros propios kernels y nuestro servidor. Ya difiere lo suficiente del artículo como para llevar su propio nombre.',
      },
    ],
  },
  tiles: {
    heading: 'Resultados públicos de nuestra investigación abierta',
    scope:
      'Medidos con TurboQuant+ en nuestro fork de llama.cpp, llama-cpp-turboquant. No son cifras de Butter.',
    turbo4: {
      label: 'compresión KV en el ajuste de mejor calidad',
      detail: 'de perplejidad frente a q8_0',
    },
    turbo3: {
      label: 'compresión KV en un ajuste más compacto',
      detail: 'de perplejidad frente a q8_0',
    },
    large: {
      label: 'parámetros con contexto de 128K en un solo MacBook',
      detail: 'de memoria pico',
    },
    source: 'Fuente',
  },
  ribbon: {
    label: 'Cómo se organiza la caché',
    older: 'Contexto antiguo · comprimido',
    recent: 'Ventana reciente · sin comprimir',
    note: 'Esquema. Los anchos de bloque se dibujan con la proporción pública de turbo4, 3.8 a 1, no con una proporción medida de AURA.',
  },
  changed: {
    heading: 'Qué cambió en AURA',
    items: [
      'Una sola copia KV comprimida se comparte entre las cabezas de un grupo de grouped-query attention.',
      'La flash attention comprimida se ejecuta en Metal para todos los anchos de códec.',
      'La compresión se programa alrededor de la decodificación especulativa, así que los tokens borrador nunca sobrescriben el historial aceptado.',
      'El prefill de contexto largo usa ventanas y respeta los attention sinks, así que los primeros tokens siguen accesibles a medida que crece el contexto.',
    ],
    hybrid:
      'Modo híbrido: el historial reciente se mantiene a precisión completa mientras el contexto antiguo se comprime, así las sesiones largas conservan su memoria más nítida donde importa.',
  },
  footnote:
    'Las proporciones de compresión, las variaciones de perplejidad y el resultado de 104B provienen de nuestra investigación abierta TurboQuant+, medida en llama-cpp-turboquant. AURA lleva ese trabajo más lejos dentro de Iron y Butter.',
};
export default copy;
