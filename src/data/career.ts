export const careerFaq = [
  {
    id: 'empleabilidad',
    question: '¿Cómo puede ayudarme el curso a encontrar empleo o progresar profesionalmente?',
    paragraphs: [
      'Puede ayudarte a mostrar una especialización en búsqueda, contraste y documentación de información pública dentro de tu perfil, todavía en formación. Estas competencias son aplicables a consultoría, prevención del fraude, compliance, periodismo de datos y derecho digital.',
      'Su valor se entiende mejor cuando puedes explicar qué sabes hacer y mostrar un ejemplo de trabajo con fuentes trazables. El certificado complementa tu formación y experiencia: no garantiza contratación, prácticas ni una mejora salarial y no sustituye una habilitación profesional.',
    ],
    examples: [],
    skills: [],
  },
  {
    id: 'cv-fuentes-abiertas',
    question: '¿Cómo incorporo el curso y el certificado a mi CV?',
    paragraphs: [
      'Añádelo en Formación complementaria como «Acreditación Técnico Especialista en Análisis Forense en la Web», con doble certificación del Col·legi Oficial d’Enginyeria en Informàtica de Catalunya (COEINF) y de iTR+. Destaca las competencias y tareas prácticas que has completado durante el curso.',
    ],
    examples: [
      {label: 'Formación complementaria',text: 'Curso iTR+ de investigación digital — iTR+ · En curso / mes y año de finalización. Añade el certificado solo cuando lo hayas obtenido.'},
      {label: 'Ejemplo de proyecto, si lo has realizado',text: 'Investigación de sociedades mediante fuentes abiertas: búsqueda y contraste documental, registro de procedencia y elaboración de un informe de investigación con limitaciones expresas.'},
    ],
    skills: [],
  },
  {
    id: 'linkedin-fuentes-abiertas',
    question: '¿Cómo actualizo mi LinkedIn: titular, extracto, aptitudes y palabras clave?',
    paragraphs: [
      'Mantén tu disciplina en primer plano y añade la investigación en fuentes abiertas como competencia complementaria. Elige un titular acorde con tu formación y tu situación profesional. En Acerca de, explica el tipo de información que sabes localizar, cómo la contrastas y cómo documentas sus límites.',
      'Cuando lo obtengas, registra el certificado en Licencias y certificaciones con su nombre y emisor exactos. Añade una fecha y un identificador solo si figuran en el documento; enlaza a una verificación únicamente si existe. Puedes incluir un proyecto simulado en Destacado y compartir lo aprendido sin revelar datos de casos reales.',
    ],
    examples: [
      {label: 'Titular orientado a datos y verificación',text: 'Estudiante | Comunicación y verificación de información | Investigación en fuentes abiertas'},
      {label: 'Titular orientado a tecnología',text: 'Estudiante | Ciberseguridad | Análisis de huella digital e investigación en fuentes abiertas'},
      {label: 'Extracto adaptable a tus competencias reales',text: 'Complemento mi formación con técnicas de investigación digital para localizar y contrastar información pública, analizar relaciones entre empresas y documentar hallazgos con fuentes trazables y respeto a la privacidad.'},
    ],
    skills: ['Investigación en fuentes abiertas', 'Inteligencia de fuentes abiertas', 'Búsqueda avanzada de información pública', 'Verificación de fuentes', 'Investigación societaria', 'Análisis de huella digital', 'Investigación en redes sociales', 'Elaboración de informes de fuentes abiertas'],
  },
] as const;
