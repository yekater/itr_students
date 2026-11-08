/**
 * Student-focused, employability-oriented copy for the "Dirigido a / Who it is for" section.
 * Shared by /, /ca/ and /en/ through AudienceIntro.astro.
 */
export interface AudienceCopy {
  title: string;
  paragraphs: string[];
  bullets: {lead: string; text: string}[];
}

export const audienceCopy: Record<'es'|'ca'|'en', AudienceCopy> = {
  es: {
    title: 'Investigación digital para mejorar tu empleabilidad.',
    paragraphs: [
      'Aprende a localizar, contrastar y documentar información pública y añade una competencia muy demandada a tu formación. Incorpora una metodología de investigación en fuentes abiertas que te ayude a interpretar los datos que publican empresas, personas e instituciones en internet.',
      'Una formación 100 % online dirigida a estudiantes de Derecho, ADE, comunicación, informática y otras disciplinas que quieren diferenciarse de cara a sus prácticas y su primer empleo. Combina el estudio a tu ritmo con <strong>4 clases prácticas con un profesor</strong> para aplicar las técnicas de investigación digital a situaciones reales.',
      'Trabaja con documentos, registros públicos, sitios corporativos, prensa y otras fuentes abiertas. Aprende a evaluar la fiabilidad de la información, distinguir indicios de conclusiones y organizar tus hallazgos en informes claros, identificando sus fuentes y contexto.'
    ],
    bullets: [
      {lead: 'Alumnos que buscan prácticas y primer empleo:', text: 'aprende a identificar empresas, titulares y riesgos reputacionales para llegar mejor preparado a tus procesos de selección.'},
      {lead: 'Estudiantes de últimos cursos y másteres:', text: 'refuerza tu empleabilidad con una competencia aplicable a consultoría, compliance, periodismo de datos e investigación digital.'},
      {lead: 'Estudiantes que preparan trabajos y proyectos fin de grado:', text: 'localiza fuentes fiables, contrasta su procedencia y presenta tu información con criterio y trazabilidad.'},
      {lead: 'Perfiles digitales, de ciberseguridad y comunicación:', text: 'incorpora técnicas de investigación en fuentes abiertas a tu conjunto de habilidades y a tu CV.'},
      {lead: 'Estudiantes que cuidan su identidad digital:', text: 'comprende qué información pública hay sobre ti, cómo se interpreta y cómo gestionarla con respeto a la privacidad.'}
    ]
  },
  ca: {
    title: 'Investigació digital per millorar la teva ocupabilitat.',
    paragraphs: [
      "Aprèn a localitzar, contrastar i documentar informació pública i afegeix una competència molt demandada a la teva formació. Incorpora una metodologia d'investigació en fonts obertes que t'ajudi a interpretar les dades que publiquen empreses, persones i institucions a internet.",
      'Una formació 100 % en línia adreçada a estudiants de Dret, ADE, comunicació, informàtica i altres disciplines que es volen diferenciar de cara a les pràctiques i al primer treball. Combina l\u2019estudi al teu ritme amb <strong>4 classes pràctiques amb un professor</strong> per aplicar les tècniques d\u2019investigació digital a situacions reals.',
      'Treballa amb documents, registres públics, llocs corporatius, premsa i altres fonts obertes. Aprèn a avaluar la fiabilitat de la informació, distingir indicis de conclusions i organitzar els teus resultats en informes clars, identificant-ne les fonts i el context.'
    ],
    bullets: [
      {lead: 'Alumnes que busquen pràctiques i primer treball:', text: 'aprèn a identificar empreses, titulars i riscos reputacionals per arribar millor preparat als teus processos de selecció.'},
      {lead: 'Estudiants de darrers cursos i màsters:', text: 'reforça la teva ocupabilitat amb una competència aplicable a consultoria, compliance, periodisme de dades i investigació digital.'},
      {lead: 'Estudiants que preparen treballs i treballs de fi de grau:', text: 'localitza fonts fiables, contrasta-ne la procedència i presenta la informació amb criteri i traçabilitat.'},
      {lead: 'Perfils digitals, de ciberseguretat i comunicació:', text: 'incorpora tècniques d\u2019investigació en fonts obertes al teu conjunt d\u2019habilitats i al teu CV.'},
      {lead: 'Estudiants que cuiden la seva identitat digital:', text: 'comprèn quina informació pública hi ha sobre tu, com s\u2019interpreta i com gestionar-la respectant la privacitat.'}
    ]
  },
  en: {
    title: 'Digital investigation to improve your employability.',
    paragraphs: [
      'Learn to find, verify and document public information and add a highly sought-after skill to your training. Incorporate an open-source investigation methodology that helps you interpret the data published on the internet by companies, individuals and institutions.',
      'A 100 % online programme for students of law, business, communication, computer science and other disciplines who want to stand out when applying for internships and their first job. Combine self-paced study with <strong>4 practical classes with a teacher</strong> to apply digital research techniques to real situations.',
      'Work with documents, public records, corporate sites, press and other open sources. Learn to assess the reliability of information, tell clues apart from conclusions and organise your findings into clear reports, identifying their sources and context.'
    ],
    bullets: [
      {lead: 'Students looking for internships and a first job:', text: 'learn to identify companies, stakeholders and reputational risks so you arrive better prepared for your selection processes.'},
      {lead: 'Final-year and master\u2019s students:', text: 'boost your employability with a skill applicable to consulting, compliance, data journalism and digital investigation.'},
      {lead: 'Students writing papers and final-year projects:', text: 'find reliable sources, verify their provenance and present your information with judgement and traceability.'},
      {lead: 'Digital, cybersecurity and communication profiles:', text: 'add open-source investigation techniques to your skill set and your CV.'},
      {lead: 'Students looking after their digital identity:', text: 'understand what public information there is about you, how it is interpreted and how to manage it respecting privacy.'}
    ]
  }
};
