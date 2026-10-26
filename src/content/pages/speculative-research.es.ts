import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: 'Modo de muestreo',
    metric: 'Métrica',
    comparison: 'Resultados registrados por carga',
    aggregation: 'Agregación',
    prefill: 'Prefill de un flujo',
    singleTtft: 'TTFT de un flujo',
    lane: 'Decodificación por solicitud concurrente',
    concurrentTtft: 'TTFT concurrente p50',
    concurrentTtftP90: 'TTFT concurrente p90',
  },
  aggregation: {
    single: 'Mediana de tres ejecuciones',
    burst:
      'Rendimiento de ráfaga completa agrupado en tres ejecuciones de 16 solicitudes',
    perRequest: 'Por solicitud en las tres ejecuciones de 16 solicitudes',
  },
  eyebrow: 'Medido en Apple silicon · 18 y 19 de octubre de 2026',
  title: '27B.\n*16 solicitudes. Un Mac.*',
  intro:
    'Mantén activos tus agentes locales incluso con solicitudes superpuestas. Butter e Iron combinan kernels Metal nativos, decodificación especulativa y verificación compartida. Esto medimos en un M5 Max.',
  greedy: 'Greedy · T0',
  sampled: 'Muestreo · T0.7',
  unit: 'tok/s',
  singleTitle: 'Una solicitud activa',
  singleScope: '2,052 tokens de entrada · salida máxima de 128 tokens',
  burstTitle: '16 solicitudes concurrentes',
  burstScope: 'Ráfaga completa · incluye prefill y vaciado',
  perRequest: 'Por solicitud',
  ttft: 'Tiempo al primer token',
  p50: 'p50',
  p90: 'p90',
  gainHeading: 'Mejora de optimización, ejecuciones pareadas',
  gainTitle: 'Decodificación más rápida con todas activas',
  gainScope: 'Mejora con todas activas · ensayos pareados de 16 solicitudes',
  before: 'Antes',
  after: 'Después',
  activeTitle: 'Mismo modelo. Menos trabajo repetido.',
  activeScope:
    'Solo cuenta el intervalo en que todas las solicitudes decodifican. Son ensayos distintos del resultado de ráfaga completa anterior.',
  replay: 'Repetir el flujo',
  illustration: 'Cómo funciona · esquema',
  privateLanes: 'Estado privado por solicitud',
  sharedVerify: 'Verificación compartida del modelo objetivo',
  committed: 'Avanzan los tokens verificados',
  diagramNote:
    '16 solicitudes comparten un sistema local de inferencia. Esta animación conceptual representa procesamiento concurrente, no planificación interna, tiempos ni aceptación.',
  details: 'Ver condiciones y limitaciones',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, KV BF16 sin comprimir. Un flujo: tres ejecuciones, 2,052 tokens de entrada y salida máxima de 128. Ráfaga completa: tres ejecuciones de 16 solicitudes, unas 937 entradas por solicitud y salida máxima de 600. Servidores nuevos con calentamientos excluidos; sin reutilizar prefijos medidos. T0.7 usa top-p 0.95, top-k 20 y min-p 0.',
  cost: 'Ensayos pareados: 882 a 999 tokens de entrada, salida máxima de 600, tres pares greedy y ocho con muestreo. El tiempo p50 al primer token con muestreo aumentó de 9.030 a 9.397 segundos. Es una mejora de rendimiento, no una mejora uniforme de latencia.',
  qualification:
    'Los ensayos greedy conservaron los textos y recuentos de las 48 respuestas candidatas. Una reproducción agéntica separada conservó 111/111 respuestas y recuentos sin mejorar la latencia. Estas pruebas no demuestran calidad general, precisión de herramientas ni menor uso de tokens.',
};
export default copy;
