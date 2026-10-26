import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  neural: {
    label: 'Ciclo de investigación · vista conceptual',
    replay: 'Repetir señal',
    controls: 'Explorar las etapas de investigación',
    note: 'Una metáfora visual del proceso de investigación, no una captura de activaciones neuronales. Los resultados medidos aparecen al lado.',
  },
  animation: {
    title: 'Mejores argumentos. Más trabajo de inferencia.',
    measured: 'Intercambio medido · mismas 144 solicitudes',
    accuracy: 'Precisión de argumentos exactos',
    tokens: 'Tokens totales de inferencia',
    replay: 'Repetir animación',
    boundary:
      'La continuación mejoró los argumentos exactos con más trabajo de inferencia. No se han demostrado ahorros de tokens del flujo ni coste por tarea completada.',
    accuracyGain: 'respuestas exactas adicionales',
    tokenOverhead: 'tokens de inferencia adicionales',
  },
  eyebrow: 'Juke → Butter · investigación medida',
  title: 'Mejores llamadas a herramientas.\n*Medidas en Butter.*',
  intro:
    'Un argumento incorrecto puede convertir una herramienta útil en una acción fallida. Usamos Juke para investigar la ejecución y el comportamiento, y después probar cambios específicos de inferencia. Un experimento nativo de Butter corrigió más argumentos sin reentrenar el modelo.',
  resultTitle: 'Respuestas con argumentos exactos',
  baseline: 'Antes',
  candidate: 'Con cambios experimentales',
  denominator: 'correctas / solicitudes',
  gain: '20 respuestas correctas adicionales',
  retained: 'Aciertos de referencia conservados',
  development: 'Conjunto de desarrollo separado',
  methodTitle: 'De la evidencia a un cambio de inferencia',
  steps: [
    {
      title: 'Inspeccionar el fallo',
      body: 'Capturamos la respuesta y localizamos la representación del argumento que falló.',
    },
    {
      title: 'Cambiar la ruta de inferencia',
      body: 'Probamos una mejora específica de inferencia con la misma evaluación, sin reentrenar el modelo.',
    },
    {
      title: 'Verificar el resultado',
      body: 'Comprobamos los argumentos y sus tipos exactos mediante la API normal, en modos buffered y streaming. Conservamos cada acierto previo y contabilizamos el trabajo adicional.',
    },
  ],
  implication:
    'El objetivo son acciones fiables con menos trabajo desperdiciado. Menos acciones accidentales, menos turnos de reparación y un menor coste total del flujo son los próximos resultados que debemos medir.',
  details: 'Ver condiciones y limitaciones',
  scopeTitle: 'Resultado experimental de la API nativa · 26 de octubre de 2026',
  scope:
    'La evaluación ampliada contiene 72 prompts, cada uno probado en modos buffered y streaming: 144 solicitudes por variante. Son valores nuevos en familias de fallos conocidas, no 144 flujos independientes. No se ejecutaron herramientas externas.',
  cost: 'La continuación añade 8.304 tokens de entrada y 536 generados en la evaluación ampliada. La mejora de corrección exige trabajo adicional de inferencia. No se han demostrado reducciones de tokens totales, latencia ni coste por tarea completada.',
  limits:
    'Es una capacidad experimental, no una función publicada. Los resultados se limitan a esta evaluación; otros modelos, APIs y flujos completos requieren validación independiente.',
};
export default copy;
