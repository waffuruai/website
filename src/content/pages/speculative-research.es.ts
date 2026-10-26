import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: 'Modo de muestreo',
    metric: 'Métrica',
    comparison: 'Medianas de cargas separadas',
    prefill: 'Prefill de un flujo',
    singleTtft: 'TTFT de un flujo',
    lane: 'Decodificación mediana por solicitud concurrente',
    concurrentTtft: 'TTFT concurrente mediano',
  },
  eyebrow: 'Medido en Apple silicon · 19 de octubre de 2026',
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
    '16 solicitudes rotan en cohortes de hasta 8. El modelo objetivo verifica propuestas; cada solicitud conserva su caché, estado recurrente y muestreador. Es una ilustración de arquitectura, no de tiempos ni aceptación.',
  details: 'Abrir ingeniería, condiciones y evidencia',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, KV BF16 sin comprimir. Un flujo: tres ejecuciones, 2,052 tokens de entrada y salida máxima de 128. Ráfaga completa: tres ejecuciones de 16 solicitudes, unas 937 entradas por solicitud y salida máxima de 600. Servidores nuevos con calentamientos excluidos; sin reutilizar prefijos medidos. T0.7 usa top-p 0.95, top-k 20 y min-p 0.',
  cost: 'Ensayos pareados: 882–999 tokens de entrada, salida máxima de 600, tres pares greedy y ocho con muestreo. El tiempo p50 al primer token con muestreo aumentó de 9.030 a 9.397 segundos. Es una mejora de rendimiento, no una mejora uniforme de latencia.',
  qualification:
    'Los ensayos greedy conservaron los textos y recuentos de las 48 respuestas candidatas. Una reproducción agéntica separada conservó 111/111 respuestas y recuentos sin mejorar la latencia. Estas pruebas no demuestran calidad general, precisión de herramientas ni menor uso de tokens.',
  sources: 'PR fuente y Reproduce with Butter',
  steps: [
    {
      title: 'Aritmética nativa, fila por fila',
      body: 'La ejecución serial y la verificación por lotes comparten el orden de reducción. Atención y estado recurrente siguen la ascendencia de cada propuesta; solo se confirma la ruta aceptada.',
    },
    {
      title: 'El muestreo objetivo decide',
      body: 'T0 usa verificación greedy. T0.7 obtiene muestras de la distribución objetivo y sigue una rama solo si coincide. Cada solicitud conserva su aleatoriedad.',
    },
    {
      title: 'Trabajo compartido, estado privado',
      body: 'Coste medido y aceptación observada asignan filas. La cohorte prepara, verifica y finaliza en conjunto; cachés, historiales y muestreadores permanecen privados.',
    },
    {
      title: 'Prepara el borrador cuando se necesita',
      body: 'Una fila sigue ejecutando el objetivo. Las características se retienen en un búfer acotado hasta volver a proponer o llenarse, sin omitir verificación.',
    },
  ],
};
export default copy;
