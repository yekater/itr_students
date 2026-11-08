// Datos simulados del caso demostrativo «Una relación que conviene verificar».
// Todos los documentos, entidades y fechas son ficticios y viven solo dentro de la demo.

export type SourceId='F01'|'F02'|'F03'|'F04';
export type ClaimId='roleInA'|'announcedCollaboration'|'selfDeclaredCollaboration'|'controlOfB';
export type CategoryId='mercantiles'|'corporativos'|'directorios';

export type DemoExcerpt={id:string;text:string;highlight:string;supports:ClaimId[];limitations:string[]};

export type DemoSource={
  id:SourceId;
  title:string;
  categoryId:CategoryId;
  typeLabel:string;
  publishedAt:string;
  publisher:string;
  /** Grupo de origen: F01 y F03 comparten cadena; F02 y F04 tienen cadenas propias. */
  originGroupId:string;
  derivedFrom?:SourceId;
  originNote:string;
  excerpts:DemoExcerpt[];
};

export type DemoCase={
  locale:'es'|'ca'|'en';
  categories:{id:CategoryId;label:string;description:string}[];
  caseIntro:string;
  caseQuestion:string;
  caseTitle:string;
  sources:DemoSource[];
  conclusions:{id:'control'|'none'|'partial';label:string}[];
  conclusionFeedback:Record<'control'|'none'|'partial',string>;
  originQuestion:string;
  originOptions:readonly {id:'independent'|'reproduces';label:string}[];
  originFeedback:{independent:string;reproduces:string};
  stageResults:{localizar:string;contrastar:string;concluir:string;documentar:string};
  outcomes:string[];
  closingLine:string;
  courseBridge:string;
  requestInfo:string;
  supportedClaims:string[];
  unconfirmedHypothesis:string;
  graph:{person:{label:string;short:string};a:{label:string;short:string};b:{label:string;short:string}};
  report:{title:string;disclaimer:string;questionHeading:string;    sourcesHeading:string;
    lineOrigin:string;
    lineExtract:string;
    publisherPrefix:string;
    lineReproduces:string;originHeading:string;originReproduces:string;originUnreviewed:string;    supportedHeading:string;
    supportedLines:[string,string];unconfirmedHeading:string;conclusionHeading:string;noConclusion:string;limitsHeading:string;limitations:string[];f04Limit:string;filename:string};
  missingSteps:(state:import('../lib/demo-engine').DemoState)=>string[];
  ui:{
    labEyebrow:string;pill:string;questionLabel:string;
    stageEyebrows:[string,string,string,string];
    stage1Title:string;stage1Body:string;
    stage2Title:string;stage2Body:string;
    stage3Title:string;stage3Body:string;conclusionGroupAria:string;
    stage4Title:string;stage4Body:string;
    continue1:string;continue2:string;continue3:string;
    back:string;restart:string;
    hintBeforeF01:string;hintContrast:string;hintReport:string;
    panelAria:string;fileHeading:string;fileEmpty:string;remove:string;
    mapAria:string;open:string;opened:string;
    empty:string;originLabel:string;limitsLabel:string;add:string;added:string;readNote:string;
    reportPendingTitle:string;reportPendingIntro:string;reportTitle:string;download:string;outcomesLabel:string;
    reportDtQuestion:string;reportDtConclusion:string;
    graphAria:string;graphNote:string;graphListLabel:string;graphLines:{f01:string;f02:string;f03:string;f04:string;none:string};
    noscriptTitle:string;noscriptBody:string;
    panelStatusReady:string;
  };
};

// ---- ES (referencia) ----
const esCase:DemoCase={
  locale:'es',
  categories:[
    {id:'mercantiles',label:'Fuentes mercantiles',description:'Sociedades y cargos en registros simulados.'},
    {id:'corporativos',label:'Sitios corporativos',description:'Comunicados de las propias empresas.'},
    {id:'directorios',label:'Directorios y perfiles públicos',description:'Agregadores y datos autodeclarados.'},
  ],
  caseIntro:'Estás practicando con un caso real de investigación en fuentes abiertas: dos empresas aparecen relacionadas en varios documentos públicos. Tu tarea es comprobar qué puede afirmarse y qué necesita más verificación.',
  caseQuestion:'¿Los documentos disponibles permiten afirmar que Sociedad A controla Sociedad B?',
  caseTitle:'Una relación que conviene verificar',
  sources:[
    {
      id:'F01',title:'Ficha mercantil simulada',categoryId:'mercantiles',typeLabel:'Registro público simulado',
      publishedAt:'01.09.2026',publisher:'Registro mercantil simulado',originGroupId:'registro-central',
      originNote:'Documento primario del registro simulado. Cadena de origen: registro-central.',
      excerpts:[{
        id:'roleInA',
        text:'Asiento registral: Persona 01 figura nombrada como administrador de Sociedad A con fecha 01.09.2026.',
        highlight:'Persona 01 figura nombrada como administrador de Sociedad A',
        supports:['roleInA'],
        limitations:['No incluye participaciones, derechos de voto ni órganos de control.','No contiene mención alguna a Sociedad B.'],
      }],
    },
    {
      id:'F02',title:'Comunicado corporativo simulado',categoryId:'corporativos',typeLabel:'Comunicado de empresa simulado',
      publishedAt:'02.09.2026',publisher:'Sociedad B',originGroupId:'sala-prensa-b',
      originNote:'Comunicado publicado por la propia Sociedad B. Cadena de origen: sala-prensa-b.',
      excerpts:[{
        id:'announcedCollaboration',
        text:'Sociedad B anuncia un proyecto de colaboración con Sociedad A para el desarrollo de servicios conjuntos.',
        highlight:'Sociedad B anuncia un proyecto de colaboración con Sociedad A',
        supports:['announcedCollaboration'],
        limitations:['No describe participaciones, control ni vínculos societarios entre las compañías.','Es la versión de la propia empresa que lo emite.'],
      }],
    },
    {
      id:'F03',title:'Directorio empresarial simulado',categoryId:'directorios',typeLabel:'Directorio público simulado',
      publishedAt:'03.09.2026',publisher:'Directorio simulado',originGroupId:'registro-central',derivedFrom:'F01',
      originNote:'Reproduce los datos de F01 y lo cita como fuente (F01 · 01.09.2026). Misma cadena de origen: registro-central.',
      excerpts:[{
        id:'reproducedRole',
        text:'Persona 01 — administrador de Sociedad A. Fuente citada: Ficha mercantil (F01), 01.09.2026.',
        highlight:'Fuente citada: Ficha mercantil (F01)',
        supports:['roleInA'],
        limitations:['Reproduce el contenido de F01: otra página, no una confirmación independiente del mismo hecho.'],
      }],
    },
    {
      id:'F04',title:'Perfil profesional simulado',categoryId:'directorios',typeLabel:'Perfil público simulado',
      publishedAt:'15.02.2024',publisher:'Persona 01',originGroupId:'autodeclaracion',
      originNote:'Información introducida por la propia persona. Cadena de origen: autodeclaración.',
      excerpts:[{
        id:'selfDeclaredCollaboration',
        text:'Persona 01 declara en su perfil haber colaborado con Sociedad B en proyectos de asesoría (2023–2024).',
        highlight:'declara en su perfil haber colaborado con Sociedad B',
        supports:['selfDeclaredCollaboration'],
        limitations:['Dato autodeclarado por el propio usuario del perfil, sin verificación externa.','Con fecha 15.02.2024: no acredita la situación actual en 2026.'],
      }],
    },
  ],
  conclusions:[
    {id:'control',label:'Sociedad A controla Sociedad B.'},
    {id:'none',label:'Las sociedades no tienen ninguna relación.'},
    {id:'partial',label:'Se ha anunciado una colaboración, pero la documentación no permite confirmar una relación de control.'},
  ],
  conclusionFeedback:{
    control:'F01 describe un cargo de Persona 01 en Sociedad A y F02 anuncia una colaboración. Ninguno de los dos documenta participaciones, votos ni control sobre Sociedad B.',
    none:'La ausencia de prueba de control no equivale a la ausencia de toda relación: F02 recoge un mensaje de colaboración anunciada entre ambas sociedades.',
    partial:'La conclusión se limita a lo que contienen las fuentes consultadas: un cargo documentado en F01 y una colaboración anunciada en F02, sin constancia de control.',
  },
  originQuestion:'¿F03 aporta una confirmación independiente de F01?',
  originOptions:[
    {id:'independent',label:'Sí, porque es otra página'},
    {id:'reproduces',label:'No, reproduce la misma fuente'},
  ],
  originFeedback:{
    independent:'F03 es otra página, pero reproduce el contenido de F01 y lo cita como fuente. Comprueba la línea de origen indicada en la propia ficha de F03: misma cadena, no un segundo testimonio.',
    reproduces:'Correcto: F03 reenvía a F01 como fuente. Son dos páginas con un mismo origen, no dos confirmaciones independientes.',
  },
  stageResults:{
    localizar:'Has localizado un dato de una fuente identificada. Todavía no demuestra control sobre otra sociedad.',
    contrastar:'Dos páginas pueden repetir un mismo origen. Comprueba la procedencia antes de contar confirmaciones.',
    concluir:'Comparación hecha: dos afirmaciones apoyadas por documentos y una hipótesis sin respaldo documental.',
    documentar:'El miniinforme recoge lo consultado, su procedencia y los límites de la comprobación.',
  },
  outcomes:[
    'Localizaste una fuente identificada',
    'Revisaste la procedencia',
    'Separaste datos e hipótesis',
    'Documentaste los límites',
  ],
  closingLine:'Has distinguido una información documentada de una conclusión que todavía no puede sostenerse.',
  courseBridge:'Practica este método con más casos y aprende a documentar tus hallazgos.',
  requestInfo:'Solicitar información del curso',
  supportedClaims:[
    'Persona 01 administra Sociedad A · según F01 · 01.09.2026',
    'Colaboración anunciada entre A y B · según F02 · 02.09.2026',
  ],
  unconfirmedHypothesis:'Sociedad A controla Sociedad B · hipótesis sin respaldo en los documentos consultados.',
  graph:{
    person:{label:'Persona 01',short:'01'},
    a:{label:'Sociedad A',short:'A'},
    b:{label:'Sociedad B',short:'B'},
  },
  report:{
    title:'# Miniinforme · Una relación que conviene verificar',
    disclaimer:'Datos simulados. Ejercicio didáctico del Laboratorio de investigación digital de iTR+.',
    questionHeading:'## Pregunta de investigación',
    sourcesHeading:'## Fuentes añadidas al expediente',
    lineOrigin:'Origen',
    lineExtract:'Extracto',
    publisherPrefix:'',
    lineReproduces:'reproduce',
    originHeading:'## Origen de los datos',
    originReproduces:'F03 reproduce la ficha F01: misma cadena de origen (registro-central). No cuenta como confirmación independiente.',
    originUnreviewed:'Procedencia de F03 sin revisar.',
    supportedHeading:'## Lo que sigue de los documentos',
    supportedLines:['- Persona 01 administra Sociedad A (F01, 01.09.2026).','- Colaboración anunciada por Sociedad B (F02, 02.09.2026).'],
    unconfirmedHeading:'## Lo que no está confirmado',
    conclusionHeading:'## Conclusión',
    noConclusion:'Sin conclusión registrada.',
    limitsHeading:'## Límites de la comprobación',
    limitations:['Caso simulado con datos ficticios: no constituye una investigación real ni asesoramiento.','La ausencia de prueba de control no equivale a la ausencia de toda relación.','Los comunicados reflejan la versión de la empresa que los emite.'],
    f04Limit:'F04 es autodeclarado y data de 15.02.2024: no acredita la situación de 2026.',
    filename:'miniinforme-relacion-que-conviene-verificar.txt',
  },
  missingSteps:(state:import('../lib/demo-engine').DemoState)=>[
    !state.added.includes('roleInA')&&'Añade al expediente la fuente de cargo de Persona 01 (F01).',
    !state.added.includes('announcedCollaboration')&&'Añade al expediente el comunicado de colaboración (F02).',
    state.originAnswer!=='reproduces'&&'Revisa la procedencia de F03 y responde a la pregunta de origen.',
    state.conclusion!=='partial'&&'Elige la conclusión respaldada por los documentos.',
  ].filter(Boolean) as string[],
  ui:{
    labEyebrow:'LABORATORIO · EXPEDIENTE 001',pill:'Datos simulados',questionLabel:'Pregunta de investigación:',
    stageEyebrows:['ETAPA 01 · LOCALIZAR','ETAPA 02 · CONTRASTAR','ETAPA 03 · CONCLUIR','ETAPA 04 · DOCUMENTAR'],
    stage1Title:'Elige una ruta',stage1Body:'Paso 1 de 4 · Localizar\nAbre el registro mercantil y añade el dato que encuentres al expediente.\nHaz clic en las fuentes. No necesitas arrastrar elementos.',
    stage2Title:'Busca una segunda fuente',stage2Body:'Busca una segunda fuente sobre la relación entre las dos sociedades y revisa de dónde procede cada dato. Abre el comunicado F02 y añade su extracto; después revisa el directorio F03 y responde.',
    stage3Title:'Elige la conclusión respaldada',stage3Body:'¿Qué conclusión está respaldada por los documentos que has consultado?',conclusionGroupAria:'Conclusión del expediente',
    stage4Title:'Documenta tus hallazgos',stage4Body:'Cuando las comprobaciones estén hechas, el miniinforme se genera con lo que has hecho, no con lo que la demo esperaba.',
    continue1:'Continuar: contrastar fuentes',continue2:'Continuar: concluir',continue3:'Continuar: documentar',
    back:'Volver al paso anterior',restart:'Reiniciar caso',
    hintBeforeF01:'Añade primero una fuente al expediente',hintContrast:'Completa el contraste: añade los extractos de F01 y F02 antes de concluir',hintReport:'El informe necesita: ',
    panelAria:'Campo de investigación',fileHeading:'Expediente',fileEmpty:'El expediente está vacío: añade extractos desde las fichas de las fuentes.',remove:'Quitar',
    mapAria:'Mapa de fuentes del caso simulado',open:'Abrir documento',opened:'abierto',
    empty:'Abre una categoría y selecciona un documento para consultar su contenido.',originLabel:'Origen: ',limitsLabel:'Limitaciones del documento',add:'Añadir al expediente',added:'Quitar del expediente',readNote:'Documento de lectura: sirve para revisar la procedencia, no añade un dato nuevo al expediente.',
    reportPendingTitle:'Miniinforme pendiente',reportPendingIntro:'Para generar el informe completa estos pasos:',reportTitle:'Miniinforme del caso',download:'Descargar mi miniinforme (.md)',outcomesLabel:'Resultados del ejercicio',
    reportDtQuestion:'Pregunta',reportDtConclusion:'Conclusión',
    graphAria:'Grafo de relaciones simuladas. Solo aparecen las relaciones documentadas en el expediente; no existe una línea de control de A sobre B.',graphNote:'El gráfico se completa automáticamente al añadir evidencias.',graphListLabel:'Lista textual de relaciones:',
    graphLines:{
      f01:'Persona 01 → administra Sociedad A (F01, documento de registro).',
      f02:'Sociedad B → anuncia colaboración con Sociedad A (F02, comunicado propio).',
      f03:'F03 → reproduce F01 (misma cadena de origen, no confirmación independiente).',
      f04:'Persona 01 → declara colaboración con Sociedad B (F04, autodeclarado, 2024).',
      none:'Todavía sin relaciones añadidas al expediente.',
    },
    noscriptTitle:'Sobre este ejercicio',
    noscriptBody:'Caso simulado con cuatro documentos ficticios (F01–F04): una ficha mercantil, un comunicado corporativo, un directorio que reproduce la ficha y un perfil autodeclarado. El método enseñado: localizar una fuente identificada, contrastar su procedencia, concluir solo lo respaldado por los documentos y documentar los límites de la comprobación. Activa JavaScript para realizar el ejercicio interactivo.',
    panelStatusReady:'Condiciones del caso cumplidas: el miniinforme está disponible.',
  },
};
const caCase:DemoCase={
  ...esCase,
  locale:'ca',
  categories:[
    {id:'mercantiles',label:'Fonts mercantils',description:'Societats i càrrecs en registres simulats.'},
    {id:'corporativos',label:'Llocs corporatius',description:'Comunicats de les pròpies empreses.'},
    {id:'directorios',label:'Directoris i perfils públics',description:'Agregadors i dades autodeclarades.'},
  ],
  caseIntro:'Estàs practicant amb un cas real d’investigació en fonts obertes: dues empreses apareixen relacionades en diversos documents públics. La teva tasca és comprovar què es pot afirmar i què necessita més verificació.',
  caseQuestion:'Els documents disponibles permeten afirmar que la Societat A controla la Societat B?',
  caseTitle:'Una relació que convé verificar',
  sources:[
    {
      id:'F01',title:'Fitxa mercantil simulada',categoryId:'mercantiles',typeLabel:'Registre públic simulat',
      publishedAt:'01.09.2026',publisher:'Registre mercantil simulat',originGroupId:'registro-central',
      originNote:'Document primari del registre simulat. Cadena d’origen: registro-central.',
      excerpts:[{
        id:'roleInA',
        text:'Apunt registral: la Persona 01 és nomenada administradora de la Societat A amb data 01.09.2026.',
        highlight:'la Persona 01 és nomenada administradora de la Societat A',
        supports:['roleInA'],
        limitations:['No inclou participacions, drets de vot ni òrgans de control.','No conté cap menció a la Societat B.'],
      }],
    },
    {
      id:'F02',title:'Comunicat corporatiu simulat',categoryId:'corporativos',typeLabel:'Comunicat d’empresa simulat',
      publishedAt:'02.09.2026',publisher:'Societat B',originGroupId:'sala-prensa-b',
      originNote:'Comunicat publicat per la pròpia Societat B. Cadena d’origen: sala-prensa-b.',
      excerpts:[{
        id:'announcedCollaboration',
        text:'La Societat B anuncia un projecte de col·laboració amb la Societat A per desenvolupar serveis conjunts.',
        highlight:'La Societat B anuncia un projecte de col·laboració amb la Societat A',
        supports:['announcedCollaboration'],
        limitations:['No descriu participacions, control ni vincles societaris entre les companyies.','És la versió de la pròpia empresa que l’emet.'],
      }],
    },
    {
      id:'F03',title:'Directori empresarial simulat',categoryId:'directorios',typeLabel:'Directori públic simulat',
      publishedAt:'03.09.2026',publisher:'Directori simulat',originGroupId:'registro-central',derivedFrom:'F01',
      originNote:'Reprodueix les dades de F01 i el cita com a font (F01 · 01.09.2026). Mateixa cadena d’origen: registro-central.',
      excerpts:[{
        id:'reproducedRole',
        text:'Persona 01 — administradora de la Societat A. Font citada: Fitxa mercantil (F01), 01.09.2026.',
        highlight:'Font citada: Fitxa mercantil (F01)',
        supports:['roleInA'],
        limitations:['Reprodueix el contingut de F01: una altra pàgina, no una confirmació independent del mateix fet.'],
      }],
    },
    {
      id:'F04',title:'Perfil professional simulat',categoryId:'directorios',typeLabel:'Perfil públic simulat',
      publishedAt:'15.02.2024',publisher:'Persona 01',originGroupId:'autodeclaracion',
      originNote:'Informació introduïda per la pròpia persona. Cadena d’origen: autodeclaració.',
      excerpts:[{
        id:'selfDeclaredCollaboration',
        text:'La Persona 01 declara al seu perfil haver col·laborat amb la Societat B en projectes d’assessoria (2023–2024).',
        highlight:'declara al seu perfil haver col·laborat amb la Societat B',
        supports:['selfDeclaredCollaboration'],
        limitations:['Dada autodeclarada pel propi usuari del perfil, sense verificació externa.','Amb data 15.02.2024: no acredita la situació actual el 2026.'],
      }],
    },
  ],
  conclusions:[
    {id:'control',label:'La Societat A controla la Societat B.'},
    {id:'none',label:'Les societats no tenen cap relació.'},
    {id:'partial',label:'S’ha anunciat una col·laboració, però la documentació no permet confirmar una relació de control.'},
  ],
  conclusionFeedback:{
    control:'F01 descriu un càrrec de la Persona 01 a la Societat A i F02 anuncia una col·laboració. Cap dels dos documenta participacions, vots ni control sobre la Societat B.',
    none:'L’absència de prova de control no equival a l’absència de tota relació: F02 recull un missatge de col·laboració anunciada entre les dues societats.',
    partial:'La conclusió es limita al que contenen les fonts consultades: un càrrec documentat a F01 i una col·laboració anunciada a F02, sense constància de control.',
  },
  originQuestion:'F03 aporta una confirmació independent de F01?',
  originOptions:[
    {id:'independent',label:'Sí, perquè és una altra pàgina'},
    {id:'reproduces',label:'No, reprodueix la mateixa font'},
  ],
  originFeedback:{
    independent:'F03 és una altra pàgina, però reprodueix el contingut de F01 i el cita com a font. Comprova la línia d’origen indicada a la pròpia fitxa de F03: mateixa cadena, no un segon testimoniatge.',
    reproduces:'Correcte: F03 remet a F01 com a font. Són dues pàgines amb un mateix origen, no dues confirmacions independents.',
  },
  stageResults:{
    localizar:'Has localitzat una dada d’una font identificada. Encara no demostra control sobre cap altra societat.',
    contrastar:'Dues pàgines poden repetir un mateix origen. Comprova la procedència abans de comptar confirmacions.',
    concluir:'Comparació feta: dues afirmacions recolzades per documents i una hipòtesi sense suport documental.',
    documentar:'El miniinforme recull el que has consultat, la seva procedència i els límits de la comprovació.',
  },
  outcomes:[
    'Has localitzat una font identificada',
    'Has revisat la procedència',
    'Has separat dades i hipòtesis',
    'Has documentat els límits',
  ],
  closingLine:'Has distingit una informació documentada d’una conclusió que encara no es pot sostenir.',
  courseBridge:'Practica aquest mètode amb més casos i aprèn a documentar els teus resultats.',
  requestInfo:'Sol·licita informació del curs',
  supportedClaims:[
    'La Persona 01 administra la Societat A · segons F01 · 01.09.2026',
    'Col·laboració anunciada entre A i B · segons F02 · 02.09.2026',
  ],
  unconfirmedHypothesis:'La Societat A controla la Societat B · hipòtesi sense suport als documents consultats.',
  graph:{
    person:{label:'Persona 01',short:'01'},
    a:{label:'Societat A',short:'A'},
    b:{label:'Societat B',short:'B'},
  },
  report:{
    ...esCase.report,
    title:'# Miniinforme · Una relació que convé verificar',
    disclaimer:'Dades simulades. Exercici didàctic del Laboratori d’investigació digital de iTR+.',
    questionHeading:'## Pregunta d’investigació',
    sourcesHeading:'## Fonts afegides a l’expedient',
    lineOrigin:'Origen',
    lineExtract:'Extracte',
    publisherPrefix:'Editor: ',
    lineReproduces:'reprodueix',
    originHeading:'## Origen de les dades',
    originReproduces:'F03 reprodueix la fitxa F01: mateixa cadena d’origen (registro-central). No compta com a confirmació independent.',
    originUnreviewed:'Procedència de F03 sense revisar.',
    supportedHeading:'## El que es sostenen dels documents',
    supportedLines:['- La Persona 01 administra la Societat A (F01, 01.09.2026).','- Col·laboració anunciada per la Societat B (F02, 02.09.2026).'],
    unconfirmedHeading:'## El que no està confirmat',
    conclusionHeading:'## Conclusió',
    noConclusion:'Sense conclusió registrada.',
    limitsHeading:'## Límits de la comprovació',
    limitations:['Cas simulat amb dades fictícies: no constitueix una investigació real ni assessorament.','L’absència de prova de control no equival a l’absència de tota relació.','Els comunicats reflecteixen la versió de l’empresa que els emet.'],
    f04Limit:'F04 és autodeclarat i data del 15.02.2024: no acredita la situació del 2026.',
    filename:'miniinforme-relacio-que-conve-verificar.txt',
  },
  missingSteps:(state:import('../lib/demo-engine').DemoState)=>[
    !state.added.includes('roleInA')&&'Afegeix a l’expedient la font del càrrec de la Persona 01 (F01).',
    !state.added.includes('announcedCollaboration')&&'Afegeix a l’expedient el comunicat de col·laboració (F02).',
    state.originAnswer!=='reproduces'&&'Revisa la procedència de F03 i respon a la pregunta d’origen.',
    state.conclusion!=='partial'&&'Tria la conclusió recolzada pels documents.',
  ].filter(Boolean) as string[],
  ui:{
    labEyebrow:'LABORATORI · EXPEDIENT 001',pill:'Dades simulades',questionLabel:'Pregunta d’investigació:',
    stageEyebrows:['ETAPA 01 · LOCALITZAR','ETAPA 02 · CONTRASTAR','ETAPA 03 · CONCLUIR','ETAPA 04 · DOCUMENTAR'],
    stage1Title:'Tria una ruta',stage1Body:'Pas 1 de 4 · Localitzar\nObre el registre mercantil i afegeix la dada que trobis a l’expedient.\nFes clic a les fonts. No cal arrossegar elements.',
    stage2Title:'Busca una segona font',stage2Body:'Busca una segona font sobre la relació entre les dues societats i revisa d’on procedeix cada dada. Obre el comunicat F02 i afegeix-ne l’extracte; després revisa el directori F03 i respon.',
    stage3Title:'Tria la conclusió recolzada',stage3Body:'Quina conclusió està recolzada pels documents que has consultat?',conclusionGroupAria:'Conclusió de l’expedient',
    stage4Title:'Documenta els teus resultats',stage4Body:'Quan les comprovacions estiguin fetes, el miniinforme es genera amb el que has fet, no amb el que la demo esperava.',
    continue1:'Continuar: contrastar fonts',continue2:'Continuar: concloure',continue3:'Continuar: documentar',
    back:'Torna al pas anterior',restart:'Reinicia el cas',
    hintBeforeF01:'Afegeix primer una font a l’expedient',hintContrast:'Completa el contrast: afegeix els extractes de F01 i F02 abans de concloure',hintReport:'L’informe necessita: ',
    panelAria:'Camp d’investigació',fileHeading:'Expedient',fileEmpty:'L’expedient està buit: afegeix extractes des de les fitxes de les fonts.',remove:'Treure',
    mapAria:'Mapa de fonts del cas simulat',open:'Obrir document',opened:'obert',
    empty:'Obre una categoria i selecciona un document per consultar-ne el contingut.',originLabel:'Origen: ',limitsLabel:'Limitacions del document',add:'Afegir a l’expedient',added:'Treure de l’expedient',readNote:'Document de lectura: serveix per revisar la procedència, no afegeix cap dada nova a l’expedient.',
    reportPendingTitle:'Miniinforme pendent',reportPendingIntro:'Per generar l’informe completa aquests passos:',reportTitle:'Miniinforme del cas',download:'Descarrega el meu miniinforme (.md)',outcomesLabel:'Resultats de l’exercici',
    reportDtQuestion:'Pregunta',reportDtConclusion:'Conclusió',
    graphAria:'Gràfic de relacions simulades. Només apareixen les relacions documentades a l’expedient; no existeix una línia de control d’A sobre B.',graphNote:'El gràfic es completa automàticament en afegir evidències.',graphListLabel:'Llista textual de relacions:',
    graphLines:{
      f01:'Persona 01 → administra la Societat A (F01, document de registre).',
      f02:'Societat B → anuncia col·laboració amb la Societat A (F02, comunicat propi).',
      f03:'F03 → reprodueix F01 (mateixa cadena d’origen, no confirmació independent).',
      f04:'Persona 01 → declara col·laboració amb la Societat B (F04, autodeclarat, 2024).',
      none:'Encara sense relacions afegides a l’expedient.',
    },
    noscriptTitle:'Sobre aquest exercici',
    noscriptBody:'Cas simulat amb quatre documents ficticis (F01–F04): una fitxa mercantil, un comunicat corporatiu, un directori que reprodueix la fitxa i un perfil autodeclarat. El mètode ensenyat: localitzar una font identificada, contrastar-ne la procedència, concloure només el que està recolzat pels documents i documentar els límits de la comprovació. Activa JavaScript per fer l’exercici interactiu.',
    panelStatusReady:'Condicions del cas complertes: el miniinforme està disponible.',
  },
};

// ---- EN ----
const enCase:DemoCase={
  ...esCase,
  locale:'en',
  categories:[
    {id:'mercantiles',label:'Company registries',description:'Companies and officers in simulated registers.'},
    {id:'corporativos',label:'Corporate websites',description:'Announcements from the companies themselves.'},
    {id:'directorios',label:'Directories and public profiles',description:'Aggregators and self-declared information.'},
  ],
  caseIntro:'You are practising a real open-source investigation scenario: two companies appear to be linked in several public documents. Your task is to establish what can be claimed and what needs further verification.',
  caseQuestion:'Do the available documents support the claim that Company A controls Company B?',
  caseTitle:'A relationship worth verifying',
  sources:[
    {
      id:'F01',title:'Simulated company registry sheet',categoryId:'mercantiles',typeLabel:'Simulated public register',
      publishedAt:'01.09.2026',publisher:'Simulated companies register',originGroupId:'registro-central',
      originNote:'Primary document of the simulated register. Origin chain: registro-central.',
      excerpts:[{
        id:'roleInA',
        text:'Register entry: Person 01 is appointed as director of Company A with effect from 01.09.2026.',
        highlight:'Person 01 is appointed as director of Company A',
        supports:['roleInA'],
        limitations:['It does not include shareholdings, voting rights or control bodies.','It contains no mention of Company B.'],
      }],
    },
    {
      id:'F02',title:'Simulated corporate press release',categoryId:'corporativos',typeLabel:'Simulated company announcement',
      publishedAt:'02.09.2026',publisher:'Company B',originGroupId:'sala-prensa-b',
      originNote:'Announcement published by Company B itself. Origin chain: sala-prensa-b.',
      excerpts:[{
        id:'announcedCollaboration',
        text:'Company B announces a collaboration project with Company A to develop joint services.',
        highlight:'Company B announces a collaboration project with Company A',
        supports:['announcedCollaboration'],
        limitations:['It does not describe shareholdings, control or corporate links between the companies.','It reflects the perspective of the issuing company.'],
      }],
    },
    {
      id:'F03',title:'Simulated business directory',categoryId:'directorios',typeLabel:'Simulated public directory',
      publishedAt:'03.09.2026',publisher:'Simulated directory',originGroupId:'registro-central',derivedFrom:'F01',
      originNote:'Reproduces the information in F01 and cites it as a source (F01 · 01.09.2026). Same origin chain: registro-central.',
      excerpts:[{
        id:'reproducedRole',
        text:'Person 01 — director of Company A. Source cited: Company registry sheet (F01), 01.09.2026.',
        highlight:'Source cited: Company registry sheet (F01)',
        supports:['roleInA'],
        limitations:['It reproduces the content of F01: a different page, not an independent confirmation of the same fact.'],
      }],
    },
    {
      id:'F04',title:'Simulated professional profile',categoryId:'directorios',typeLabel:'Simulated public profile',
      publishedAt:'15.02.2024',publisher:'Person 01',originGroupId:'autodeclaracion',
      originNote:'Information entered by the person themselves. Origin chain: self-declaration.',
      excerpts:[{
        id:'selfDeclaredCollaboration',
        text:'Person 01 states on the profile that they collaborated with Company B on advisory projects (2023–2024).',
        highlight:'states on the profile that they collaborated with Company B',
        supports:['selfDeclaredCollaboration'],
        limitations:['Self-declared by the profile owner, with no external verification.','Dated 15.02.2024: it does not evidence the situation in 2026.'],
      }],
    },
  ],
  conclusions:[
    {id:'control',label:'Company A controls Company B.'},
    {id:'none',label:'The companies have no relationship.'},
    {id:'partial',label:'A collaboration has been announced, but the documentation does not allow a control relationship to be confirmed.'},
  ],
  conclusionFeedback:{
    control:'F01 describes a role held by Person 01 at Company A and F02 announces a collaboration. Neither documents shareholdings, votes or control over Company B.',
    none:'The absence of proof of control is not the same as the absence of any relationship: F02 records an announced collaboration between the two companies.',
    partial:'The conclusion is limited to what the consulted sources contain: a documented role in F01 and an announced collaboration in F02, with no record of control.',
  },
  originQuestion:'Does F03 provide an independent confirmation of F01?',
  originOptions:[
    {id:'independent',label:'Yes, because it is a different page'},
    {id:'reproduces',label:'No, it reproduces the same source'},
  ],
  originFeedback:{
    independent:'F03 is a different page, but it reproduces the content of F01 and cites it as a source. Check the origin line shown on F03’s own card: same chain, not a second witness.',
    reproduces:'Correct: F03 points back to F01 as its source. These are two pages with a single origin, not two independent confirmations.',
  },
  stageResults:{
    localizar:'You have located a data point from an identified source. It does not yet demonstrate control over another company.',
    contrastar:'Two pages may repeat a single origin. Check provenance before counting confirmations.',
    concluir:'Comparison complete: two document-backed statements and one hypothesis without documentary support.',
    documentar:'The mini-report records what was consulted, its provenance and the limits of the verification.',
  },
  outcomes:[
    'You located an identified source',
    'You reviewed the provenance',
    'You separated facts and hypotheses',
    'You documented the limits',
  ],
  closingLine:'You have distinguished documented information from a conclusion that cannot yet be sustained.',
  courseBridge:'Practise this method with more cases and learn to document your findings.',
  requestInfo:'Request course information',
  supportedClaims:[
    'Person 01 administers Company A · according to F01 · 01.09.2026',
    'Collaboration announced between A and B · according to F02 · 02.09.2026',
  ],
  unconfirmedHypothesis:'Company A controls Company B · hypothesis without support in the consulted documents.',
  graph:{
    person:{label:'Person 01',short:'01'},
    a:{label:'Company A',short:'A'},
    b:{label:'Company B',short:'B'},
  },
  report:{
    ...esCase.report,
    title:'# Mini-report · A relationship worth verifying',
    disclaimer:'Simulated data. Teaching exercise from the iTR+ digital investigation laboratory.',
    questionHeading:'## Research question',
    sourcesHeading:'## Sources added to the file',
    lineOrigin:'Origin',
    lineExtract:'Excerpt',
    publisherPrefix:'Publisher: ',
    lineReproduces:'reproduces',
    originHeading:'## Origin of the data',
    originReproduces:'F03 reproduces sheet F01: same origin chain (registro-central). It does not count as an independent confirmation.',
    originUnreviewed:'Provenance of F03 not reviewed.',
    supportedHeading:'## What follows from the documents',
    supportedLines:['- Person 01 administers Company A (F01, 01.09.2026).','- Collaboration announced by Company B (F02, 02.09.2026).'],
    unconfirmedHeading:'## What is not confirmed',
    conclusionHeading:'## Conclusion',
    noConclusion:'No conclusion recorded.',
    limitsHeading:'## Limits of the verification',
    limitations:['Simulated case with fictional data: it is not a real investigation or advice.','The absence of proof of control is not the same as the absence of any relationship.','Announcements reflect the perspective of the issuing company.'],
    f04Limit:'F04 is self-declared and dated 15.02.2024: it does not evidence the 2026 situation.',
    filename:'mini-report-relationship-worth-verifying.txt',
  },
  missingSteps:(state:import('../lib/demo-engine').DemoState)=>[
    !state.added.includes('roleInA')&&'Add Person 01’s role source (F01) to the file.',
    !state.added.includes('announcedCollaboration')&&'Add the collaboration announcement (F02) to the file.',
    state.originAnswer!=='reproduces'&&'Review the provenance of F03 and answer the origin question.',
    state.conclusion!=='partial'&&'Choose the conclusion supported by the documents.',
  ].filter(Boolean) as string[],
  ui:{
    labEyebrow:'LAB · CASE FILE 001',pill:'Simulated data',questionLabel:'Research question:',
    stageEyebrows:['STAGE 01 · LOCATE','STAGE 02 · CROSS-CHECK','STAGE 03 · CONCLUDE','STAGE 04 · DOCUMENT'],
    stage1Title:'Choose a route',stage1Body:'Step 1 of 4 · Locate\nOpen the companies register and add the data you find to the case file.\nClick the sources. You do not need to drag anything.',
    stage2Title:'Find a second source',stage2Body:'Find a second source about the relationship between the two companies and review where each data point comes from. Open announcement F02 and add its excerpt; then review directory F03 and answer.',
    stage3Title:'Choose the supported conclusion',stage3Body:'Which conclusion is supported by the documents you have consulted?',conclusionGroupAria:'Conclusion of the case file',
    stage4Title:'Document your findings',stage4Body:'Once the checks are done, the mini-report is generated from what you have done, not from what the demo expected.',
    continue1:'Continue: cross-check sources',continue2:'Continue: conclude',continue3:'Continue: document',
    back:'Back to the previous step',restart:'Restart the case',
    hintBeforeF01:'Add a source to the case file first',hintContrast:'Complete the cross-check: add the F01 and F02 excerpts before concluding',hintReport:'The report needs: ',
    panelAria:'Investigation field',fileHeading:'Case file',fileEmpty:'The case file is empty: add excerpts from the source cards.',remove:'Remove',
    mapAria:'Map of sources in the simulated case',open:'Open document',opened:'opened',
    empty:'Open a category and select a document to view its contents.',originLabel:'Origin: ',limitsLabel:'Limitations of the document',add:'Add to case file',added:'Remove from case file',readNote:'Read-only document: it is used to review provenance and does not add new data to the case file.',
    reportPendingTitle:'Mini-report pending',reportPendingIntro:'To generate the report complete these steps:',reportTitle:'Case mini-report',download:'Download my mini-report (.md)',outcomesLabel:'Exercise results',
    reportDtQuestion:'Question',reportDtConclusion:'Conclusion',
    graphAria:'Graph of simulated relationships. Only relationships documented in the case file appear; there is no line of A controlling B.',graphNote:'The graph fills in automatically as evidence is added.',graphListLabel:'Text list of relationships:',
    graphLines:{
      f01:'Person 01 → administers Company A (F01, register document).',
      f02:'Company B → announces collaboration with Company A (F02, own announcement).',
      f03:'F03 → reproduces F01 (same origin chain, not an independent confirmation).',
      f04:'Person 01 → declares collaboration with Company B (F04, self-declared, 2024).',
      none:'No relationships added to the case file yet.',
    },
    noscriptTitle:'About this exercise',
    noscriptBody:'Simulated case with four fictional documents (F01–F04): a registry sheet, a corporate announcement, a directory that reproduces the sheet and a self-declared profile. The method taught: locate an identified source, cross-check its provenance, conclude only what the documents support and document the limits of the verification. Enable JavaScript to do the interactive exercise.',
    panelStatusReady:'Case conditions met: the mini-report is available.',
  },
};

const cases={es:esCase,ca:caCase,en:enCase} as const;
export const getDemoCase=(locale:'es'|'ca'|'en'='es'):DemoCase=>cases[locale];

// Compatibilidad: comportamiento previo en español.
export const categories=esCase.categories;
export const caseIntro=esCase.caseIntro;
export const caseQuestion=esCase.caseQuestion;
export const caseTitle=esCase.caseTitle;
export const sources=esCase.sources;
export const conclusions=esCase.conclusions;
export const conclusionFeedback=esCase.conclusionFeedback;
export const originQuestion=esCase.originQuestion;
export const originOptions=esCase.originOptions;
export const originFeedback=esCase.originFeedback;
export const stageResults=esCase.stageResults;
export const outcomes=esCase.outcomes;
export const closingLine=esCase.closingLine;
export const courseBridge=esCase.courseBridge;
export const supportedClaims=esCase.supportedClaims;
export const unconfirmedHypothesis=esCase.unconfirmedHypothesis;
export const graph=esCase.graph;
