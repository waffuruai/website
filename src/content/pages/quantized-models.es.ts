import type { QuantizedModelsCopy } from './quantized-models';

const copy: QuantizedModelsCopy = {
  eyebrow: 'Modelos cuantizados · próximamente',
  title: 'Modelos cuantizados *con cuidado*',
  intro:
    'Estamos preparando versiones cuantizadas de los modelos que sirve Butter, hechas con el mismo método que nuestra investigación abierta TurboQuant+ sobre pesos. Archivos más pequeños, calidad que se mantiene y margen para ejecutar más modelos a la vez.',
  method: {
    heading: 'Cómo cuantizamos',
    items: [
      {
        title: 'Por capa',
        body: 'Cada capa recibe su propia precisión en lugar de un único ajuste para todo el modelo.',
      },
      {
        title: 'Capas de frontera protegidas',
        body: 'La primera y la última capa se quedan en mayor precisión. Son las más sensibles, tanto en los pesos como en la caché KV.',
      },
      {
        title: 'La precisión sigue el rol del tensor',
        body: 'La atención y las proyecciones de lectura del FFN se comprimen bien. Las proyecciones de escritura como ffn_down conservan un formato nativo.',
      },
      {
        title: 'Pesos y KV con un solo presupuesto',
        body: 'La precisión de los pesos y la de la caché KV se eligen como un único presupuesto de memoria y luego se comparan con la línea base sin cuantizar antes de publicar nada.',
      },
    ],
  },
  tiles: {
    heading: 'Qué logró el método en nuestra investigación abierta',
    scope:
      'Medido con TurboQuant+ en nuestro fork de llama.cpp, llama-cpp-turboquant.',
    weights: {
      label: 'archivos de modelo más pequeños',
      detail: 'de perplejidad frente al original de 8 bits',
    },
    stacked: {
      label: 'menos memoria total con pesos y KV comprimidos a la vez',
      detail: 'de perplejidad frente a pesos de 8 bits y caché de 16 bits',
    },
    source: 'Fuente',
    paper: 'Leer el artículo sobre compresión de pesos',
  },
  strip: {
    label: 'Cómo se reparte la precisión',
    note: 'Esquema. La primera y la última capa conservan la precisión completa; el resto se colorea según el rol del tensor. El número real de capas y las políticas cambian según el modelo.',
    legend: {
      boundary: 'Capa de frontera · mayor precisión',
      attention: 'Atención · comprimida',
      ffnRead: 'FFN gate y up · comprimidas',
      ffnDown: 'FFN down · 4 bits nativo',
    },
    first: 'Primeras capas',
    last: 'Últimas capas',
  },
  soon: {
    heading: 'Próximamente',
    body: 'Las primeras versiones llegan pronto. Cada una se publica con su modelo base, su formato, su tamaño frente a la línea base y las comprobaciones de calidad que superó.',
    // Variante B, sin el nombre:
    // 'Mejorarán con el tiempo, medidas con nuestras propias herramientas de perfilado y evaluación.'
    tooling:
      'Mejorarán con el tiempo, medidas con Juke, nuestro banco de perfilado y evaluación.',
    cta: 'Avísame',
  },
};

export default copy;
