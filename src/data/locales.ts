import {courseFormat as esFormat} from './course-format';
import {curriculum as esCurriculum} from './curriculum';
import {faq as esFaq, learning as esLearning, benefits as esBenefits, specialties as esSpecialties} from './site';

export type SupportedLocale = 'ca' | 'en';
type Curriculum = readonly {title: string; lessons: readonly string[]}[];
type Pair = readonly [string, string];

const caCurriculum: Curriculum = [
  {title: 'Introducció a la investigació digital: què és i per a què serveix', lessons: ['Què és la investigació digital?', 'Ètica i legalitat', 'Mentalitat i metodologia', 'Tipus de fonts', 'Seguretat i OpSec', 'L’entorn de treball']},
  {title: 'El món Google', lessons: ['Google com a font', 'Millorar la cerca', 'Google Dorks', 'Informació exposada', 'Imatges amb Google', 'Alternatives: motors de cerca']},
  {title: 'Les xarxes socials: un mar de dades', lessons: ['Les xarxes socials com a font', 'Informació personal', 'Identitat digital', 'Investigació manual']},
  {title: 'Quina informació disposen de nosaltres?', lessons: ['El rastre administratiu: identitat i localització', 'Investigació de societats mercantils', 'Patrimoni moble i propietat', 'Portals de transparència i dades obertes', 'Cooperació i canals judicials/policials']},
  {title: 'Deep Web: la part fosca d’Internet', lessons: ['Conceptes bàsics', 'L’origen i l’arquitectura de la invisibilitat', 'Classificació professional I: la web opaca i la web privada', 'Classificació professional II: xarxes superposades', 'Desmitificació: realitat davant la ficció sensacionalista', 'Aplicacions en la investigació digital i seguretat de l’investigador']},
  {title: 'Eines útils', lessons: ['Conceptes bàsics de l’ecosistema d’eines', 'Tipus d’eines: taxonomia tècnica', 'Com trobar eines: l’art de la curació', 'Eines i el seu ús I: investigació d’identitat', 'Eines i el seu ús II: infraestructura i geolocalització', 'Seguretat, ètica i manteniment de la caixa d’eines']},
  {title: 'Com fer un informe forense', lessons: ['Generació d’informes: fase de difusió', 'Estructura bàsica d’un informe d’investigació', 'Evidències i dades d’investigació: recollida i conservació de la informació', 'Redacció i presentació de resultats', 'Recursos i models de referència']},
];
const enCurriculum: Curriculum = [
  {title: 'Introduction to digital investigation: what it is and what it is for', lessons: ['What is digital investigation?', 'Ethics and legality', 'Mindset and methodology', 'Types of sources', 'Security and OpSec', 'The working environment']},
  {title: 'The Google world', lessons: ['Google as a source', 'Improving searches', 'Google Dorks', 'Exposed information', 'Images with Google', 'Alternatives: search engines']},
  {title: 'Social media: a sea of data', lessons: ['Social media as a source', 'Personal information', 'Digital identity', 'Manual investigation']},
  {title: 'What information do they have about us?', lessons: ['The administrative trail: identity and location', 'Company investigation', 'Movable assets and property', 'Transparency portals and open data', 'Cooperation and judicial/police channels']},
  {title: 'The Deep Web: the dark side of the Internet', lessons: ['Basic concepts', 'The origin and architecture of invisibility', 'Professional classification I: opaque and private web', 'Professional classification II: overlay networks', 'Demystification: reality versus sensationalist fiction', 'Applications in digital investigation and investigator security']},
  {title: 'Useful tools', lessons: ['Basic concepts of the tool ecosystem', 'Types of tools: technical taxonomy', 'How to find tools: the art of curation', 'Tools and their use I: identity investigation', 'Tools and their use II: infrastructure and geolocation', 'Security, ethics and maintaining the toolbox']},
  {title: 'How to write a forensic report', lessons: ['Report generation: the dissemination phase', 'Basic structure of an investigation report', 'Evidence and investigation data: collecting and preserving information', 'Writing and presenting results', 'Reference resources and models']},
];

const caLearning: readonly Pair[] = [['Metodologia de fonts obertes', 'Enfocament pràctic, legal i reproduïble per a la investigació digital.'], ['Cerques avançades', 'Tècniques de Google i operadors avançats per obtenir resultats precisos.'], ['Investigació a les xarxes socials', 'Anàlisi de perfils públics, fils i connexions rellevants amb accessos autoritzats.'], ['Investigació societària', 'Fonts mercantils, registres i anàlisi de relacions empresarials.'], ['Seguretat i Deep Web', 'Bones pràctiques per protegir l’investigador i preservar les proves.'], ['Eines i geolocalització', 'Ús pràctic d’eines de codi obert i localització geogràfica.']];
const enLearning: readonly Pair[] = [['Open-source methodology', 'A practical, lawful, reproducible approach to digital investigation.'], ['Advanced searches', 'Google techniques and advanced operators for precise results.'], ['Social-media investigation', 'Analysis of public profiles, threads and relevant connections with authorised access.'], ['Company investigation', 'Company sources, registers and analysis of business relationships.'], ['Security and the Deep Web', 'Good practice to protect the investigator and preserve evidence.'], ['Tools and geolocation', 'Practical use of open-source tools and geographic location.']];
const caBenefits: readonly Pair[] = [['Investigació de societats', 'Mapatge d’estructures, administradors i relacions empresarials mitjançant fonts públiques, aplicable en pràctiques i processos de selecció.'], ['Localització d’informació', 'Cerca avançada de documents i premsa rellevant en fonts fiables per als teus projectes.'], ['Anàlisi d’identitats', 'Reconstrucció d’empremtes digitals i connexions respectant la privacitat.'], ['Documentació de resultats', 'Informes estructurats i traçables per mostrar al teu portafoli, amb fonts, indicis i conclusions classificades.']];
const enBenefits: readonly Pair[] = [['Company investigation', 'Mapping structures, directors and business relationships through public sources, applicable to internships and selection processes.'], ['Information discovery', 'Advanced searches for relevant documents and press coverage in reliable sources for your projects.'], ['Identity analysis', 'Reconstructing digital footprints and connections while respecting privacy.'], ['Findings documentation', 'Structured, traceable reports for your portfolio, with sources, indications and conclusions classified.']];
const caSpecialties: readonly [string,string,string][] = [['Pràctiques i primer treball', 'Aprèn a identificar empreses, titulars i riscos reputacionals.', 'Documenta amb fonts públiques el context d’una empresa abans del teu procés de selecció.'], ['Verificació d’informació', 'Contrasta el que publiquen webs, premsa i xarxes abans de repetir una dada.', 'Comprova si dues pàgines citen la mateixa font abans de donar un resultat per confirmat.'], ['Investigació d’empreses i societats', 'Analitza registres públics, administradors i relacions entre companyies.', 'Localitza una fitxa registral i registra’n la procedència abans d’incorporar-la a l’anàlisi.'], ['La teva empremta digital', 'Reconstrueix i cuida la teva identitat digital de cara al mercat laboral.', 'Revisa quines dades teves són públiques i quina interpretació se’n pot fer.']];
const enSpecialties: readonly [string,string,string][] = [['Internships and first job', 'Learn to identify companies, stakeholders and reputational risks.', 'Document a company’s context with public sources before your selection process.'], ['Information verification', 'Cross-check what websites, press and social media publish before repeating a data point.', 'Check whether two pages cite the same source before treating a finding as confirmed.'], ['Company investigation', 'Analyse public registers, directors and relationships between companies.', 'Locate a registry record and note its provenance before adding it to your analysis.'], ['Your digital footprint', 'Reconstruct and look after your digital identity for the job market.', 'Review which data about you is public and how it can be interpreted.']];

const caFormat = {
  mode: '100 % en línia amb 4 classes pràctiques amb un professor',
  materials: 'Cada mòdul inclou un PDF amb el material d’estudi, enllaços a vídeos i recursos complementaris per treballar els continguts.',
  support: 'Tindràs accés a un fòrum on podràs plantejar les teves preguntes al creador i al mentor del curs.',
  pace: 'No hi ha una data límit per completar la formació. Tu decideixes què estudiar i quanta estona hi dediques a cada mòdul.',
  access: 'Els materials estan disponibles per sempre, també després de finalitzar el curs. Conserves l’accés en línia amb el teu usuari i la teva contrasenya a la plataforma iTR+.',
  work: 'Sí. Pots compaginar el curs amb una jornada laboral completa perquè l’aprenentatge és autònom, sense horaris de classe obligatoris ni termini de finalització. Els materials estan disponibles per sempre.',
} as const;
const caDuration = '30 hores de càrrega formativa estimada.';
const caDurationNote = 'El temps configurat actualment a la plataforma és de 15 h 10 min. Aquest temps inclou veure els vídeos, fer els exercicis, treballar de forma individual i completar l’avaluació.';

const caFaq: readonly Pair[] = [
  ['Necessito coneixements previs?', 'No. El curs parteix d’un nivell bàsic i avança cap a pràctiques avançades.'],
  ['Quant dura?', caDuration + ' ' + caDurationNote + ' Aquesta càrrega és orientativa, no un termini de finalització. ' + caFormat.pace],
  ['La certificació és oficial?', 'Sí. L’alumnat rep doble certificació del Col·legi Oficial d’Enginyeria en Informàtica de Catalunya (COEINF) i d’iTR+.'],
  ['Com aplicar allò après?', 'Plantilles i formats per integrar resultats en informes d’investigació. L’obtenció de cada evidència exigeix valorar-ne els límits legals i tècnics.'],
  ['Com es desenvolupa la formació?', caFormat.mode + ' ' + caFormat.materials + ' Estudies els set mòduls, treballes les activitats i realitzes els qüestionaris i l’avaluació final. ' + caFormat.support],
  ['Què inclou la formació?', caFormat.materials + ' Inclou activitats, qüestionaris, avaluació final, suport tècnic i el fòrum de consulta. La formació contempla un certificat final en les condicions indicades.'],
  ['Puc preguntar al creador i al mentor del curs?', 'Sí. ' + caFormat.support + ' Estudiar de manera autònoma no significa estudiar sense un lloc on resoldre dubtes: pots utilitzar el fòrum per consultar els continguts i les activitats.'],
  ['És compatible amb treballar a jornada completa?', caFormat.work],
  ['Em quedaré amb els materials després de terminar?', 'Sí. ' + caFormat.access + ' Pots tornar a consultar els PDF, els enllaços als vídeos i els recursos del curs quan els necessitis.'],
  ['Per a qui és aquest curs d’investigació digital?', 'Principalment per a estudiants que volen adquirir habilitats addicionals en investigació digital per millorar la seva ocupabilitat. També interessa a detectius privats habilitats, consultors antifrau, professionals digitals i perits informàtics. No atorga cap habilitació professional addicional.'],
  ['On consulto les condicions i l’accés?', 'La fitxa d’iTR+ recull la informació completa i les condicions vigents. L’accés a la plataforma i la matrícula poden requerir identificació i passos addicionals.'],
];
const enFormat = {
  mode: '100 % online with 4 practical classes with a teacher',
  materials: 'Each module includes a PDF with the study material, links to videos and supplementary resources to work through the content.',
  support: 'You have access to a forum where you can ask the course creator and mentor your questions.',
  pace: 'There is no deadline to complete the training. You decide when to study and how much time to devote to each module.',
  access: 'The materials are available forever, also after completing the course. You keep online access through your username and password on the iTR+ platform.',
  work: 'Yes. You can combine the course with a full-time job because learning is self-directed, with no mandatory class schedules or completion deadline. The materials are available forever.',
} as const;
const enDuration = 'Estimated study load of 30 hours.';
const enDurationNote = 'The time currently configured on the platform is 15 h 10 min. This time includes watching the videos, doing the exercises, working individually and completing the final assessment.';

const enFaq: readonly Pair[] = [
  ['Do I need prior knowledge?', 'No. The course starts from a basic level and progresses to advanced practice.'],
  ['How long does it take?', enDuration + ' ' + enDurationNote + ' This load is indicative, not a completion deadline. ' + enFormat.pace],
  ['Is the certification official?', 'Yes. Students receive dual certification from the Col·legi Oficial d’Enginyeria en Informàtica de Catalunya (COEINF) and iTR+.'],
  ['How do I apply what I learn?', 'Templates and formats to integrate findings into investigation reports. Obtaining each piece of evidence requires assessing its legal and technical limits.'],
  ['How does the training work?', enFormat.mode + ' ' + enFormat.materials + ' You study the seven modules, work through the activities and complete the quizzes and the final assessment. ' + enFormat.support],
  ['What does the training include?', enFormat.materials + ' It includes activities, quizzes, final assessment, technical support and the discussion forum. The training includes a final certificate under the stated conditions.'],
  ['Can I ask the course creator and mentor?', 'Yes. ' + enFormat.support + ' Self-paced study does not mean studying without a place to resolve doubts: you can use the forum to consult about the content and activities.'],
  ['Is it compatible with a full-time job?', enFormat.work],
  ['Do I keep the materials after finishing?', 'Yes. ' + enFormat.access + ' You can revisit the PDFs, the video links and the course resources whenever you need them.'],
  ['Who is this digital investigation course for?', 'Mainly for students who want to acquire additional digital investigation skills to improve their employability. It is also of interest to licensed private investigators, anti-fraud consultants, digital professionals and IT forensic experts. It does not grant additional professional licensing.'],
  ['Where do I check the conditions and access?', 'The iTR+ course page contains the complete information and current conditions. Access to the platform and enrolment may require identification and additional steps.'],
];


const data = {
  ca: {lang:'ca-ES', title:'Curs iTR+ per a estudiants | Investigació digital', description:'Aprèn a cercar, contrastar i documentar informació pública i millora la teva ocupabilitat.', caption:'INVESTIGACIÓ I FORMACIÓ DIGITAL', localeName:'Català', contact:'Contacte', skip:'Saltar al contingut', heroEyebrow:'Curs d’investigació digital per a estudiants · iTR+', hero:'Descobreix com afegir al teu CV', heroB:'la investigació digital que busquen les empreses', intro:'Aprèn a cercar, contrastar i documentar fonts obertes amb una metodologia pràctica i rigorosa, i reforça la teva ocupabilitat.', download:'Descarrega el programa', method:'De la primera cerca a l’informe documentat.', methodIntro:'Descobreix el potencial de la investigació digital i aprèn tècniques de recerca en fonts obertes.', rigor:'Rigor en el mètode. Flexibilitat en la teva agenda.', program:'El teu programa d’investigació.', audience:'A qui s’adreça?', cert:'Doble certificació i aplicació professional', faqTitle:'Preguntes freqüents.', next:'Afegeix una competència que marca la diferència.', footer:'Formació especialitzada en investigació digital mitjançant fonts obertes.', legal:['Avís legal','Política de privacitat','Política de galetes','Accessibilitat'], configure:'Configura les galetes', contactFooter:'Contactar amb iTR+', curriculum:caCurriculum, learning:caLearning, benefits:caBenefits, specialties:caSpecialties, duration:caDuration, durationNote:caDurationNote, faq:caFaq as readonly Pair[], format:caFormat},
  en: {lang:'en-GB', title:'iTR+ course for students | Digital investigation', description:'Learn to find, verify and document public information and improve your employability.', caption:'INVESTIGATION AND DIGITAL TRAINING', localeName:'English', contact:'Contact', skip:'Skip to content', heroEyebrow:'Digital investigation course for students · iTR+', hero:'Discover how to add to your CV', heroB:'the digital investigation skills employers look for', intro:'Learn to find, verify and document open sources with a practical, rigorous methodology, and strengthen your employability.', download:'Download the programme', method:'From the first search to the documented report.', methodIntro:'Discover the potential of digital investigation and learn open-source research techniques.', rigor:'Rigour in method. Flexibility in your schedule.', program:'Your investigation programme.', audience:'Who is it for?', cert:'Dual certification and professional application', faqTitle:'Frequently asked questions.', next:'Add a skill that makes the difference.', footer:'Specialist training in digital investigation using open sources.', legal:['Legal notice','Privacy policy','Cookie policy','Accessibility'], configure:'Configure cookies', contactFooter:'Contact iTR+', curriculum:enCurriculum, learning:enLearning, benefits:enBenefits, specialties:enSpecialties, duration:enDuration, durationNote:enDurationNote, faq:enFaq as readonly Pair[], format:enFormat},
} as const;

export const localeData = {ca: {...data.ca, benefits: caBenefits, specialties: caSpecialties}, en: {...data.en, benefits: enBenefits, specialties: enSpecialties}};
export const localizedData = (locale: SupportedLocale) => localeData[locale];
export const spanishFallback = {curriculum: esCurriculum, learning: esLearning, benefits: esBenefits, specialties: esSpecialties, faq: esFaq, format: esFormat};
