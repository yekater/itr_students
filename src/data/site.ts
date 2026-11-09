import {courseFormat} from './course-format';
export const CORPORATE_URL = 'https://perinfor.odoo.com';
export const COURSE_URL = 'https://perinfor.odoo.com/slides/acreditacion-tecnico-especialista-en-analisis-forense-en-la-web-10';
export const courseHours = 30;
export const duration = `Carga formativa estimada de ${courseHours} horas, según el programa facilitado.`;
export const durationDetail = '30 horas de carga formativa estimada. Este tiempo incluye ver los vídeos, hacer los ejercicios, trabajar de forma individual y completar la evaluación.';
export const durationNote = 'Este tiempo incluye ver los vídeos, hacer los ejercicios, trabajar de forma individual y completar la evaluación. El tiempo para familiarizarse con los módulos configurado actualmente en la plataforma es de 15 h 10 min.';
export const certification = 'La formación contempla un certificado final. La referencia a COEINF, la entidad emisora, el visado y su denominación y alcance están pendientes de confirmación. No se presenta como una titulación oficial ni garantiza la admisión judicial de informes.';
export const specialties = [
 ['Prácticas y primer empleo','Aprende a identificar empresas, titulares y riesgos reputacionales.','Documenta con fuentes públicas el contexto de una empresa antes de tu proceso de selección.'],
 ['Verificación de información','Contrasta lo que publican webs, prensa y redes antes de repetir un dato.','Comprueba si dos páginas citan la misma fuente antes de dar un hallazgo por confirmado.'],
 ['Investigación de empresas y sociedades','Analiza registros públicos, administradores y relaciones entre compañías.','Localiza una ficha registral y registra su procedencia antes de incorporarla a tu análisis.'],
 ['Tu huella digital','Reconstruye y cuida tu identidad digital de cara al mercado laboral.','Revisa qué datos tuyos son públicos y qué interpretación puede hacerse de ellos.']
] as const;
export const benefits = [
 ['Investigación de sociedades','Mapeo de estructuras, administradores y relaciones empresariales mediante fuentes públicas, aplicable en prácticas y procesos de selección.',''],
 ['Localización de información','Búsqueda avanzada de documentos y prensa relevante en fuentes fiables para tus proyectos.',''],
 ['Análisis de identidades','Reconstrucción de huellas digitales y conexiones entre personas y empresas en internet, garantizando el respeto a la privacidad.',''],
 ['Documentación de hallazgos','Informes estructurados y trazables que puedes mostrar en tu portafolio, clasificando fuentes, indicios y conclusiones.','']
] as const;
export const learning = [
  ['Metodología de fuentes abiertas','Enfoque práctico, legal y reproducible para la investigación digital.'],
  ['Búsquedas avanzadas','Técnicas de Google y operadores avanzados para resultados precisos.'],
  ['Investigación en redes sociales','Extracción y análisis de perfiles públicos, hilos y conexiones relevantes, con accesos autorizados.'],
  ['Investigación societaria','Investigación de sociedades mercantiles: fuentes mercantiles, registros y análisis de relaciones empresariales.'],
  ['Seguridad y Deep Web','Buenas prácticas para proteger al investigador y preservar pruebas. Deep Web no equivale a actividad delictiva ni implica acceso a contenido privado.'],
  [ 'Herramientas y geolocalización','Herramientas de investigación digital para tu CV: uso práctico de herramientas open-source y localización geográfica.']
] as const;
export const faq = [
 ['¿Necesito conocimientos previos?','No. El curso parte de un nivel básico y sube a prácticas avanzadas.'],
 ['¿Cuál es la duración efectiva?', '30 horas de carga formativa estimada. '+durationNote+' Esta carga es orientativa, no un plazo de finalización. '+courseFormat.pace],
 ['¿La certificación es oficial?','Sí. Los alumnos reciben doble certificación del Col·legi Oficial d’Enginyeria en Informàtica de Catalunya (COEINF) y de iTR+.'],
 ['¿Cómo aplicar lo aprendido?','Plantillas y formatos para integrar hallazgos en informes de investigación. La obtención de cada evidencia exige valorar sus límites legales y técnicos.'],
 ['¿Cómo se desarrolla la formación?',courseFormat.mode+' '+courseFormat.materials+' Estudias los siete módulos, trabajas las actividades y realizas los cuestionarios y la evaluación final. '+courseFormat.support],
 ['¿Qué incluye la formación?',courseFormat.materials+' Incluye actividades, cuestionarios, evaluación final, soporte técnico y el foro de consulta. La formación contempla un certificado final en las condiciones indicadas.'],
 ['¿Puedo preguntar al creador y al mentor del curso?','Sí. '+courseFormat.support+' El estudio autónomo no significa estudiar sin un lugar donde resolver dudas: puedes utilizar el foro para consultar los contenidos y las actividades.'],
 ['¿Es compatible con trabajar a jornada completa?',courseFormat.work],
 ['¿Me quedaré con los materiales después de terminar?','Sí. '+courseFormat.access+' Puedes volver a consultar los PDF, los enlaces a vídeos y los recursos del curso cuando los necesites.'],
 ['¿Para quién es este curso de investigación digital?','Principalmente para estudiantes que desean adquirir habilidades adicionales en investigación digital para mejorar su empleabilidad. También resulta de interés para detectives privados habilitados, consultores antifraude, profesionales digitales y peritos informáticos. No confiere habilitación profesional adicional.'],
 ['¿Dónde consulto las condiciones y el acceso?','La ficha de iTR+ recoge la información completa y las condiciones vigentes. El acceso a la plataforma y la matrícula pueden requerir identificación y pasos adicionales.']
] as const;
