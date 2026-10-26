import type { ToolResearchCopy } from './tool-research';

const copy: ToolResearchCopy = {
  eyebrow: 'Medido en Butter · corrección en curso',
  title: 'Menos argumentos erróneos.\n*Aciertos más baratos.*',
  intro:
    'Una llamada a herramienta con un argumento erróneo falla, provoca un reintento o se ejecuta con el valor equivocado. Rastreamos la ejecución y el comportamiento, y después probamos cambios específicos de inferencia. En una evaluación de 144 solicitudes, una corrección de Butter que estamos integrando produjo {more} argumentos exactos más y redujo los tokens por argumento correcto de unos {before} a unos {after}.',
  figure: {
    headline: 'Tokens por argumento correcto',
    baseline: 'Antes',
    candidate: 'Con la corrección de Butter',
    fewer: 'cerca de un {percent}% menos',
    unit: 'tokens',
    exact: 'Argumentos exactos',
    totalTokens: 'Tokens totales de inferencia',
    retained: 'Aciertos de referencia conservados',
    perAdditional: 'Coste por argumento correcto adicional',
    development: 'Conjunto de desarrollo separado',
    caption:
      'Evaluación: 72 prompts, cada uno en modo buffered y streaming (144 solicitudes por variante). Qwen3.5-0.8B Q4_K_M, temperatura 0, M5 Max. No se ejecutaron herramientas externas. Mide valores exactos de argumentos, no la fiabilidad general de las tareas.',
  },
  wrongTitle: 'Lo que cuesta un argumento erróneo',
  wrongBody:
    'Un valor erróneo hace fallar la llamada, lo que cuesta otro turno del modelo más un viaje de ida y vuelta a la herramienta, o se ejecuta con el valor equivocado, por ejemplo escribiendo o borrando la ruta incorrecta. El ahorro por reparaciones evitadas aún no está medido; es el siguiente experimento.',
  methodTitle: 'De la evidencia a un cambio de inferencia',
  example: {
    label: 'Ejemplo ilustrativo de la familia de fallos por tipo incorrecto',
    controls: 'Pasos del ciclo de investigación',
    replay: 'Repetir los pasos',
    schema: 'esquema',
    output: 'salida del modelo',
    flag: 'cadena, se esperaba un número',
    inProgress: 'Ejecutando la misma evaluación de 144 solicitudes',
    check: 'valor y tipo exactos',
  },
  steps: [
    {
      title: 'Inspeccionar el fallo',
      body: 'Capturamos la respuesta y localizamos la representación del argumento que falló.',
    },
    {
      title: 'Cambiar la ruta de inferencia',
      body: 'Probamos un cambio específico de inferencia con la misma evaluación, sin reentrenar el modelo.',
    },
    {
      title: 'Verificar el resultado',
      body: 'Comprobamos los argumentos y sus tipos exactos mediante la API normal, en modos buffered y streaming. Conservamos cada acierto previo y contabilizamos el trabajo adicional.',
    },
  ],
  details: 'Ver condiciones y limitaciones',
  scopeTitle: 'Resultado de la API nativa · 26 de octubre de 2026',
  scope:
    'La evaluación ampliada contiene 72 prompts, cada uno probado en modos buffered y streaming: 144 solicitudes por variante. Son valores nuevos en familias de fallos conocidas, no 144 flujos independientes. No se ejecutaron herramientas externas.',
  cost: 'El cambio añade 8.304 tokens de entrada y 536 generados en la evaluación ampliada, así que los tokens totales de inferencia subieron de 50.382 a 59.222 mientras los tokens por argumento correcto bajaron. No se han demostrado reducciones de tokens totales del flujo, latencia ni coste por tarea completada.',
  limits:
    'La corrección se está integrando en Butter y aún no está en una versión publicada. Los resultados se limitan a esta evaluación; otros modelos, APIs y flujos completos requieren validación independiente.',
};
export default copy;
