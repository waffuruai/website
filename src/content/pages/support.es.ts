import { mailto } from '@/content/site';
import type { support } from './support';

const supportEs: (typeof support)['en'] = {
  seo: {
    title: 'Soporte',
    description:
      'Qué hay disponible hoy, cómo funciona el acceso anticipado, hardware compatible, y cómo reportar un error o un fallo de seguridad.',
    keywords: [
      'soporte de Waffuru',
      'acceso anticipado a Waffuru',
      'reportar un problema de seguridad',
      'hardware compatible con IA local',
    ],
  },
  hero: {
    label: 'Soporte',
    title: 'Respuestas, y una *persona* cuando la necesites.',
    lede: 'Qué hay disponible hoy, cómo funciona el acceso anticipado y a dónde acudir cuando algo falla.',
  },
  links: {
    title: 'Por dónde *empezar*',
    items: [
      {
        title: 'Escribe a soporte',
        body: 'Errores, dudas, problemas de instalación. Cuéntanos qué ejecutaste y en qué hardware.',
        href: mailto('Support'),
      },
      {
        title: 'Reporta un problema de seguridad',
        body: 'En privado, por correo a security@waffuru.ai con el asunto Security.',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: 'Nuestro contacto de seguridad en un formato legible por máquinas.',
        href: '/.well-known/security.txt',
        file: true,
      },
      {
        title: 'Política de divulgación',
        body: 'Qué entra en el alcance, con qué rapidez respondemos y el puerto seguro para la investigación de buena fe.',
        href: '/security',
      },
    ],
  },
  faq: [
    {
      question: '¿Qué puedo usar hoy?',
      answer:
        'Nuestros productos (Iron, Butter, Syrup y Whisk) son privados y de código cerrado por ahora, y todavía no hay nada disponible para el público general. El acceso anticipado es la forma de entrar primero.',
    },
    {
      question: '¿Cómo funciona el acceso anticipado?',
      answer:
        'Rellena el formulario de acceso anticipado y cuéntanos qué estás construyendo y en qué hardware quieres ejecutarlo. Te escribiremos cuando tengamos algo que encaje. El acceso anticipado es software previo al lanzamiento: puede cambiar o fallar, y tus comentarios son lo que lo hace mejorar.',
    },
    {
      question: '¿En qué hardware funciona?',
      answer:
        'Apple silicon es el objetivo principal: cada kernel se escribe y se afina primero para Metal. NVIDIA CUDA está en producción en RTX y DGX Spark y se está afinando, con primeras ejecuciones en H100, H200, B100 y B200. AMD a través de ROCm y Vulkan avanza rápido. Piensa en MacBook y Mac Studio, estaciones de trabajo RTX, DGX Spark, Strix Halo y flotas de neoclouds.',
    },
    {
      question: '¿Cómo reporto un error?',
      answer:
        'Escribe a hello@waffuru.ai con el asunto Support; el enlace “Escribe a soporte” de arriba lo hace por ti. Incluye tu hardware y tu sistema operativo, qué ejecutaste, qué esperabas y qué pasó, y quita antes de los registros cualquier dato privado.',
    },
    {
      question: '¿Cómo reporto un problema de seguridad?',
      answer:
        'Escribe a security@waffuru.ai con el asunto Security y el detalle suficiente para reproducirlo. Acusamos recibo en 3 días hábiles, corregimos según la gravedad y acordamos contigo la divulgación pública en un plazo de 90 días; la [política de divulgación de vulnerabilidades](https://waffuru.ai/security) (en inglés) recoge el alcance, las reglas y el puerto seguro. Nuestro security.txt recoge el mismo contacto en un formato legible por máquinas.',
    },
    {
      question: '¿Qué pasa con mis datos?',
      answer:
        'Nuestro software se ejecuta en local y tus datos se quedan en tu equipo, a menos que tú autorices algo que los envíe a otro lugar. En este sitio web solo recopilamos lo que indica la política de privacidad, y Google Analytics permanece desactivado salvo que lo aceptes.',
    },
  ],
  cta: {
    title: '¿No está aquí? *Pregúntanos*.',
    body: 'Envíanos tu hardware, tu sistema operativo, qué ejecutaste y qué pasó. Cuanto más detalle, más fácil será ayudarte.',
    docs: 'Lee la documentación',
    email: 'Escribe a soporte',
  },
};

export default supportEs;
