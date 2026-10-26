import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  animation: {
    title: 'Más precisión. ¿Menos trabajo desperdiciado?',
    measured: 'Experimento medido',
    accuracy: 'Precisión de argumentos exactos',
    tokens: 'Tokens totales de inferencia',
    scenario: 'Explora el ahorro potencial del flujo',
    assumption:
      'Supuesto ilustrativo: cada turno de reparación evitado ahorra 1,000 tokens en este lote de 144 solicitudes. Este ahorro no se ha medido.',
    repairs: 'Turnos de reparación evitados',
    estimate: 'Tokens modelados del flujo',
    difference: 'Diferencia de tokens frente al inicio',
    replay: 'Repetir animación',
    boundary:
      'La precisión mantiene el resultado medido. El control solo cambia el escenario de coste; no predice tareas completadas ni llamadas evitadas.',
  },
  eyebrow: 'Juke → Butter · investigación medida',
  title: 'Mejores llamadas a herramientas.\n*Medidas en Butter.*',
  intro:
    'Un argumento incorrecto puede convertir una herramienta útil en una acción fallida. Usamos Juke para investigar la ejecución y el comportamiento, y después probar cambios específicos de inferencia. Un experimento nativo de Butter corrigió más argumentos sin reentrenar el modelo.',
  resultTitle: 'Respuestas con argumentos exactos',
  baseline: 'Antes',
  candidate: 'Con continuación nativa',
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
      body: 'Butter realiza una continuación acotada con la función elegida y el esquema recibido. Aporta estructura, nunca los valores esperados de los argumentos.',
    },
    {
      title: 'Verificar el resultado',
      body: 'Comprobamos los argumentos y sus tipos exactos mediante la API normal, en modos buffered y streaming. Conservamos cada acierto previo y contabilizamos el trabajo adicional.',
    },
  ],
  implication:
    'El objetivo son acciones fiables con menos trabajo desperdiciado. Menos acciones accidentales, menos turnos de reparación y un menor coste total del flujo son los próximos resultados que debemos medir.',
  details: 'Ver el método, el alcance y las limitaciones pendientes',
  scopeTitle: 'Resultado experimental de la API nativa · 26 de octubre de 2026',
  scope:
    'La evaluación ampliada contiene 72 prompts, cada uno probado en modos buffered y streaming: 144 solicitudes por variante. Son valores nuevos en familias de fallos conocidas, no 144 flujos independientes. No se ejecutaron herramientas externas.',
  method:
    'La referencia y la candidata usan los mismos tokens iniciales, modelo y recursos de Iron, temperatura 0 y un presupuesto compartido de 512 tokens de generación. El oráculo comprueba valores y tipos JSON exactos. Se conservan los 36 aciertos previos; las 20 mejoras corresponden a diez prompts de uniones de tipos escalares en ambos modos.',
  cost: 'La continuación añade 8.304 tokens de entrada y 536 generados en la evaluación ampliada. La mejora de corrección exige trabajo adicional de inferencia. No se han demostrado reducciones de tokens totales, latencia ni coste por tarea completada.',
  limits:
    'Es una implementación experimental de Swift Chat, no una capacidad publicada. Los arrays anidados y las cadenas literales siguen sin resolverse en esta evaluación. Otros modelos, APIs, flujos completos de varios turnos y menos llamadas innecesarias requieren validación independiente.',
  source: 'Leer el paquete de investigación fijado',
  sourceNote:
    'PR de investigación de Butter #1508 · Puede requerir acceso a GitHub.',
};
export default copy;
