import type { contact } from './contact';

const contactEs: (typeof contact)['en'] = {
  seo: {
    title: 'Contacto',
    description:
      'Contacta con Waffuru para ventas, alianzas, prensa, soporte, reportes de seguridad o empleo, o solicita acceso anticipado.',
    keywords: [
      'contactar con Waffuru',
      'ventas de infraestructura de IA',
      'alianzas',
      'prensa de Waffuru',
      'acceso anticipado a Waffuru',
    ],
  },
  hero: {
    label: 'Contacto',
    title: 'Cuéntanos qué estás *construyendo*.',
    lede: 'Ventas, alianzas, prensa, soporte, seguridad y empleo llegan a hello@waffuru.ai. Elige el tema que mejor encaje.',
  },
  callouts: {
    title: 'Elige una *puerta*.',
    intro:
      'Sin formularios. Cada botón abre un correo con el asunto ya escrito.',
    emailLabel: 'Escríbenos',
    items: [
      {
        subject: 'Sales',
        title: 'Ventas',
        body: '¿Corres modelos en tu propio hardware, o en toda una flota? Cuéntanos la carga de trabajo y dónde se ejecuta.',
      },
      {
        subject: 'Partnerships',
        title: 'Alianzas',
        body: 'Fabricantes de hardware, neoclouds y equipos de modelos: cuéntanos qué podríamos construir juntos.',
      },
      {
        subject: 'Press',
        title: 'Prensa',
        body: '¿Escribes sobre IA local, software para GPU o las personas que lo construyen? Con gusto hablamos.',
      },
      {
        subject: 'Support',
        title: 'Soporte',
        body: '¿Algo no funciona o no queda claro? Envíanos tu hardware, lo que ejecutaste y lo que pasó.',
      },
      {
        subject: 'Security',
        title: 'Seguridad',
        body: '¿Encontraste una vulnerabilidad? Cuéntanosla en privado y danos tiempo para corregirla antes de que se haga pública.',
      },
      {
        subject: 'Hiring',
        title: 'Empleo',
        body: '¿Quieres ayudar a construir el stack? Cuéntanos qué has lanzado y en qué te gustaría trabajar.',
      },
    ],
  },
  earlyAccess: {
    title: '¿Lo quieres *primero*?',
    body: 'Nuestros productos están en acceso anticipado privado. Cuéntanos qué quieres ejecutar y en qué hardware, y te escribiremos cuando tengamos algo que encaje.',
  },
};

export default contactEs;
