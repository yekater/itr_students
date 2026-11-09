// Registro centralizado de evidencia (contrato del encargo). Fuentes primarias verificadas
// en su página original el 25/10/2026; actualizar `checkedAt` con cada revisión.
export type EvidenceMetric = {
  id: string;
  displayValue: string;
  claim: string;
  geography: string;
  period: string;
  unit: string;
  kind: 'observed' | 'projection' | 'survey';
  sourceName: string;
  sourceUrl: string;
  publishedAt?: string;
  checkedAt: string;
  scopeNote: string;
};

export const employmentEvidence = {
  checkedAt: '25 de octubre de 2026',
  metrics: [
    {
      id: 'incibe-2025',
      displayValue: 'más de 122.000',
      claim: 'ciberincidentes gestionados en España',
      geography: 'España',
      period: 'Año 2025',
      unit: 'incidentes de ciberseguridad',
      kind: 'observed',
      sourceName: 'INCIBE — «INCIBE detectó más de 122.000 incidentes de ciberseguridad en 2025»',
      sourceUrl: 'https://www.incibe.es/incibe/sala-de-prensa/incibe-detecto-mas-de-122000-incidentes-de-ciberseguridad-en-2025',
      publishedAt: '2026',
      checkedAt: '25 de octubre de 2026',
      scopeNote: 'Contexto de riesgos digitales que atraviesan empresas e instituciones, también relevantes para tu futuro laboral.',
    },
    {
      id: 'wef-jobs-2025',
      displayValue: '39 %',
      claim: 'de habilidades actuales se transformará o quedará desactualizada entre 2025 y 2030',
      geography: 'Mundo (55 economías)',
      period: 'Perspectiva 2025-2030',
      unit: 'porcentaje de habilidades',
      kind: 'survey',
      sourceName: 'World Economic Forum — The Future of Jobs Report 2025',
      sourceUrl: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
      publishedAt: '2025',
      checkedAt: '25 de octubre de 2026',
      scopeNote: 'Encuesta a más de mil empleadores sobre la transformación de las competencias profesionales.',
    },
    {
      id: 'bls-isa',
      displayValue: '+21 %',
      claim: 'crecimiento de empleo en analistas de seguridad de la información',
      geography: 'Estados Unidos',
      period: 'Proyección 2025-2035',
      unit: 'crecimiento de una ocupación técnica',
      kind: 'projection',
      sourceName: 'U.S. Bureau of Labor Statistics — Information Security Analysts, Occupational Outlook Handbook',
      sourceUrl: 'https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm',
      checkedAt: '25 de octubre de 2026',
      scopeNote: 'Proyección estadounidense para una ocupación técnica: no es una cifra mundial ni de personas con esta formación.',
    },
    {
      id: 'uk-dsit-2025',
      displayValue: '34.932',
      claim: 'anuncios de puestos cuya función principal es la ciberseguridad',
      geography: 'Reino Unido',
      period: 'Enero-diciembre de 2025 (informe publicado en 2026)',
      unit: 'anuncios online analizados con datos de Lightcast',
      kind: 'observed',
      sourceName: 'Gobierno británico / DSIT — Cyber security skills in the UK labour market 2026',
      sourceUrl: 'https://www.gov.uk/government/publications/cyber-security-skills-in-the-uk-labour-market-2026/cyber-security-skills-in-the-uk-labour-market-2026',
      publishedAt: '2026',
      checkedAt: '25 de octubre de 2026',
      scopeNote: 'Anuncios publicados en un periodo: no equivalen a contrataciones ni a oportunidades exclusivamente para este perfil.',
    },
  ],
} as const satisfies {checkedAt: string; metrics: EvidenceMetric[]};
