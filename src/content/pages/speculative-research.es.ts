import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: 'Modo de muestreo',
    metric: 'Métrica',
    comparison: 'Resultados de concurrencia registrados',
    aggregation: 'Agregación',
    requests: 'Solicitudes concurrentes',
    burst: 'Rendimiento de ráfaga completa',
    lane: 'Decodificación por solicitud',
    concurrentTtft: 'Tiempo al primer token p50',
    concurrentTtftP90: 'Tiempo al primer token p90',
    prefill: 'Prefill',
  },
  aggregation: {
    burst:
      'Tokens de salida totales entre el tiempo de pared de la ráfaga, tres ejecuciones por nivel',
    perRequest: 'Mediana por solicitud en tres ejecuciones',
    ttft: 'Sobre todas las solicitudes de tres ejecuciones',
    prefill: 'Sobre tres ejecuciones por nivel',
  },
  eyebrow: 'Medido en Apple silicon · del 18 al 26 de octubre de 2026',
  title: '27B.\n*8 solicitudes. Un Mac.*',
  intro:
    'Mantén activos tus agentes locales incluso con solicitudes superpuestas. Butter e Iron combinan kernels Metal nativos, decodificación especulativa y verificación compartida. Esto medimos en un M5 Max.',
  greedy: 'Greedy · T0',
  sampled: 'Muestreo · T0.7',
  unit: 'tok/s',
  singleTitle: 'Una solicitud activa',
  singleScope: 'Unos 937 tokens de entrada · salida máxima de 600 tokens',
  burstTitle: '8 solicitudes concurrentes',
  burstScope: 'Ráfaga completa · incluye prefill y vaciado',
  scalingTitle: 'Rendimiento de ráfaga completa al superponer solicitudes',
  scalingScope:
    'Tres ejecuciones por nivel · mismos prompts, servidor nuevo por nivel',
  perRequest: 'Por solicitud',
  ttft: 'Tiempo al primer token',
  p50: 'p50',
  p90: 'p90',
  gainHeading: 'Mejora de optimización, ejecuciones pareadas',
  gainTitle: 'Decodificación más rápida con todas activas',
  gainScope: 'Mejora con todas activas · ensayos concurrentes pareados',
  before: 'Antes',
  after: 'Después',
  activeTitle: 'Mismo modelo. Menos trabajo repetido.',
  activeScope:
    'Solo cuenta el intervalo en que todas las solicitudes decodifican. Son ensayos distintos de los resultados de ráfaga completa anteriores.',
  replay: 'Repetir el flujo',
  illustration: 'Cómo funciona · esquema',
  privateLanes: 'Estado privado por solicitud',
  sharedVerify: 'Verificación compartida del modelo objetivo',
  committed: 'Avanzan los tokens verificados',
  diagramNote:
    'Las solicitudes concurrentes comparten un sistema local de inferencia. Esta animación conceptual representa procesamiento concurrente, no planificación interna, tiempos ni aceptación.',
  details: 'Ver condiciones y limitaciones',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, KV BF16 sin comprimir. Ejecuciones de concurrencia, 26 de octubre de 2026: tres ejecuciones en cada nivel de 1, 2, 4 y 8 solicitudes concurrentes, unos 937 tokens de entrada por solicitud y salida máxima de 600, servidor nuevo en cada nivel y sin reutilizar prefijos medidos. El rendimiento de ráfaga completa divide los tokens de salida totales entre el tiempo de pared de la ráfaga, prefill y vaciado incluidos. Los ensayos pareados de optimización del 18 de octubre de 2026 usan greedy y T0.7; T0.7 usa top-p 0.95, top-k 20 y min-p 0.',
  cost: 'Los ensayos pareados de optimización usan 882 a 999 tokens de entrada y salida máxima de 600: tres pares greedy y ocho con muestreo. El tiempo p50 al primer token con muestreo aumentó de 9.030 a 9.397 segundos. Es una mejora de rendimiento, no una mejora uniforme de latencia.',
  qualification:
    'Los ensayos greedy pareados conservaron los textos y recuentos de las 48 respuestas candidatas. Una reproducción agéntica separada conservó 111/111 respuestas y recuentos sin mejorar la latencia. Estas pruebas no demuestran calidad general, precisión de herramientas ni menor uso de tokens.',
};
export default copy;
