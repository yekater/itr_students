# iTR+ · Curso OSINT para abogados

Landing estática Astro con React y TypeScript, Tailwind v4, Motion y escena Three.js diferida. Todo el contenido comercial esencial está en HTML; el programa y FAQ funcionan sin JavaScript. Expediente simulado accesible, selector jurídico, planificación orientativa y PDF real de 38 lecciones generado desde los mismos datos.

## Desarrollo

Node 24, npm. En este entorno: `npm ci --cache /workspace/.npm-cache`. Después: `npm run dev`. `npm run check` valida tipos; `npm run build` genera PDF y dist; `npm run preview` sirve el resultado. `npm test` ejecuta Chromium y axe (configurado /usr/bin/chromium; adaptar executablePath en otras máquinas). `node scripts/assets.mjs` regenera la imagen social. `npm run audit` requiere preview activo en 4321. No hay secretos requeridos.

## Contenido y operación

Datos en src/data; enlaces Odoo en src/lib/links.ts. Analítica desactivada, sin formulario local ni cookies de marketing. Precio y estrategia solo en docs, que nunca debe desplegarse. Preview noindex por defecto; copia .env.example y configura dominio real antes de producción. dist es el único directorio publicable.

Consulta docs/trazabilidad-contenido.md, docs/fuentes-y-verificaciones.md, docs/medicion-y-odoo.md y docs/despliegue.md. Faltan dominio final, identidad/documentos legales y confirmación de condiciones comerciales señaladas; no impiden desarrollo ni preview, pero sí una publicación definitiva responsable. No se ha publicado ni modificado Odoo.

## Vista HTML sin instalación

Descarga `preview/iTR-preview.html` desde GitHub con «Download raw file» y ábrelo en el navegador. Incluye estilos, Inter, IBM Plex Sans, PDF e interacciones. Se regenera con `npm run export:html`; el exportador escribe dentro del repositorio y no necesita rutas propias del entorno en nube.

Hero actualizado: una secuencia SVG de 16 segundos muestra cómo fuentes públicas transmiten información al análisis, se contrastan relaciones y se prepara un expediente. El documento aparece, se completa por líneas y recibe una marca final; las fases se muestran en texto HTML, sin rótulos incrustados que puedan desbordar. Incluye respuesta al puntero y pausa. En pantallas compactas, puntero grueso, ahorro de datos o movimiento reducido, la red permanece estática. Al salir de vista o al ocultarse la pestaña, la animación se pausa. Las dos fuentes corporativas también se usan en el PDF y en la imagen social.

## Estudio autónomo, acceso y orientación profesional

Las condiciones indicadas por la cliente el 22/10/2026 están centralizadas en `src/data/course-format.ts`: PDF por módulo con enlaces a vídeos, recursos, foro con el creador y el mentor, estudio sin plazo y acceso permanente con login. Se reutilizan en Formación, FAQ y PDF descargable. El generador produce diez páginas con Inter e IBM Plex Sans, incluidos siete módulos y 38 lecciones.

El FAQ incorpora ejemplos de CV, titulares y aptitudes de LinkedIn, además de estadísticas internacionales con enlaces a fuentes primarias, territorio y periodo. `docs/empleabilidad-y-fuentes.md` registra la consulta y sus límites; los datos de BLS y del gobierno británico no son resultados de alumnos de iTR+. Las pruebas de PDF requieren Poppler (`pdftotext`), además de Chromium. No se han creado un foro, PDFs lectivos ni una integración nueva en Odoo.
