# Comprobaciones y rendimiento

21/10/2026, Node 24.19.0, npm 11.9.0, Chromium del entorno Linux; Lighthouse 13.5.0 con perfil móvil predeterminado y throttling simulado, servido desde dist mediante Astro preview. No son datos de campo ni se ha medido INP de usuarios reales.

- Instalación reproducida con npm ci y lockfile; astro check: cero errores, advertencias o indicaciones. Compilación estática y generación PDF correctas.
- Seis pruebas Playwright aprobadas: HTML sin JS y acordeones; 7 módulos / 38 lecciones; destinos de contacto y curso; PDF válido; recorrido completo del expediente y descarga; selector y cálculo; seguimiento del cursor y retorno; cambio a movimiento reducido; WebGL desactivado; teclado; ausencia de peticiones externas y almacenamiento de marketing; SEO y orden editorial.
- axe no encontró infracciones en el escenario móvil revisado. No equivale a certificación WCAG. Se corrigió el nombre accesible del grafo para que derive del texto visible.
- Sin desbordamiento horizontal global a 320, 360, 390, 768, 1024, 1440 y 1920 px. Capturas completas en docs/qa-*.png; inspección visual del hero a 1440 y 390 px y de una página renderizada del PDF. Viewport de poca altura 1024×500 incluido en el recorrido de teclado.
- PDF: texto seleccionable comprobado con pdftotext, 38 entradas reales, sin importes; página de módulo renderizada con pdftoppm. Licencias de fuentes locales incluidas.
- Lighthouse guardado en lighthouse.json: rendimiento 96, accesibilidad 100, buenas prácticas 100, SEO 66. FCP 2,0 s; LCP 2,4 s; bloqueo total 0 ms; CLS 0,007. SEO penaliza noindex deliberado en preview. No se quitó para mejorar la puntuación. Primera medición: rendimiento 100; variación de laboratorio esperable.
- Tamaños gzip en resource-sizes.json: React cliente ~65,8 kB; Motion/hero ~45,9 kB; núcleo React ~3,2 kB; script página ~1,2 kB. Total crítico conservador con decoración diferida ~117 kB, inferior al objetivo 120 kB. Escena/Three diferida ~129,6 kB, inferior a 200 kB. La advertencia de chunk >500 kB sin comprimir corresponde a Three diferido, no al render estático.
- Hero inicial SVG local, sin raster pesado ni consultas de imágenes externas; social.png real de 1200×630. DPR máximo 1,5. Render WebGL por demanda, pausa fuera de vista y limpieza de recursos. El fallback sigue al puntero sin WebGL. La versión medida no tenía movimiento automático continuo; la actualización de red descrita abajo incorpora movimiento con pausa.

Límites: no se ejecutaron Safari ni Firefox, auditoría manual completa de lector de pantalla, medición de campo, validación de Odoo receptor, publicación DNS/HTTPS ni pruebas en dispositivos físicos. Las fuentes externas devolvieron 403; no se afirma su revisión. Se mantiene pendiente el dominio y la información legal/comercial descrita en fuentes-y-verificaciones.md. Los ficheros QA e información estratégica no se distribuyen en dist.

## Actualización del hero y tipografías

21/10/2026: la ilustración con carpeta y rótulos se sustituye por 64 puntos y sus conexiones SVG. No contiene texto que pueda sobresalir. Incluye señales en las líneas, movimiento lento, respuesta al cursor y botón de pausa. Las animaciones se detienen fuera de vista y en pestañas ocultas; se desactivan en pantallas compactas, puntero grueso, ahorro de datos y movimiento reducido.

Comprobación de fuentes renderizadas en Chromium mediante CSS.getPlatformFontsForNode: H1 → IBM Plex Sans Medium; cuerpo → Inter; CTA → Inter Medium; referencias en code → Inter. PDF comprobado con pdffonts: únicamente IBM Plex Sans e Inter, incrustadas; se eliminó Helvetica. Imagen social regenerada con las dos fuentes locales. Se mantienen los seis tokens corporativos.

Compilación y tipos pasan; ocho escenarios Playwright aprobados, incluidos axe y capturas responsive, red sin texto, fuentes, pausa y HTML autónomo regenerado. Las cifras Lighthouse anteriores corresponden a la versión previa; no se presentan como una nueva medición de este hero.

## Actualización: secuencia de investigación

La ilustración de red se sustituye por una animación de 16 segundos: tres fuentes transmiten partículas al nodo de contraste; después aparece una hoja, se dibujan sus líneas y se muestra una marca final. Los rótulos Recopilando información, Contrastando relaciones, Preparando expediente y Expediente preparado están fuera del SVG. Se mantiene pausa, respuesta al cursor y suspensión fuera de vista o en pestaña oculta. Sin JS, en móvil y con movimiento reducido se muestra el resultado final estático. La leyenda indica demostración visual; no se hace una investigación real.

Nueve pruebas Playwright aprobadas, incluyendo la comprobación de los cuatro estados en tiempos concretos de la animación, desplazamiento de paquetes, trazado del documento y resultado estático. Se guardan capturas hero-01-recopilar.png, hero-02-contrastar.png, hero-03-documentar.png y hero-04-expediente.png. Compilación y tipos sin errores; el HTML autónomo se regenera y se comprueba con pausa y expediente interactivo. Se inspeccionan visualmente etapas inicial/final y variante móvil. Las métricas Lighthouse anteriores siguen siendo históricas, no una medición de esta secuencia.

## Actualización del PDF, modalidad y FAQ · 22/10/2026

El PDF adjunto coincidía byte a byte con el programa anterior. Se regenera desde los datos del curso: diez páginas, siete módulos y 38 lecciones; incorpora estudio autónomo, PDF por módulo con enlaces a vídeos, foro con creador y mentor, ausencia de plazo y acceso permanente mediante login. Se extrae su texto con pdftotext, se comprueba el inventario con pdffonts (Inter e IBM Plex Sans incrustadas) y se inspecciona una página renderizada con pdftoppm. No se afirma que el PDF esté etiquetado como PDF/UA.

Doce escenarios Playwright aprobados. Los tres nuevos verifican FAQ sin JS y móvil; fuentes, territorio y periodos de estadísticas sin tasa inventada de colocación; y contenido real del PDF, respuesta HTTP y coincidencia exacta de bytes con la descarga PDF incrustada en el HTML autónomo. Se comprueba axe con las respuestas de empleo abiertas. Capturas de componentes: qa-linkedin-mobile.png y qa-estadisticas-mobile.png; solo durante esas dos capturas se ocultan cabecera y barra flotante para evitar artefactos de captura de elementos más altos que el viewport. Las verificaciones de navegación se hacen con la interfaz completa.

Fuentes verificadas por HTTPS y fechas registradas en empleabilidad-y-fuentes.md. Las condiciones de acceso se basan en la instrucción directa de la cliente, sin prueba funcional de Odoo/foro ni cambios en esa plataforma. Las métricas de rendimiento publicadas anteriormente son históricas y no se presentan como una nueva auditoría de esta revisión.
