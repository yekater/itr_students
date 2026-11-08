# PROMPT MAESTRO PARA CODEX
# Landing interactiva de iTR+ | Curso OSINT para abogados

Actúa como un equipo sénior de ingeniería web, dirección de arte, UX/CRO, SEO técnico, analítica, automatización comercial y formación en investigación OSINT aplicada al trabajo de abogados en España.

**Construye el proyecto completo y funcional.** Entrega código mantenible, una landing visualmente excepcional, activos reales, documentación y comprobaciones ejecutadas. No te limites a una propuesta, un wireframe o una descripción. Todo el contenido público, los mensajes de interfaz, los metadatos y la documentación para el cliente deben estar en español de España. Puedes mantener identificadores técnicos en inglés.

La empresa es **iTR+**. El producto se comunica como **Curso OSINT para abogados**, vinculado al curso existente «Acreditación Técnico Especialista en Análisis Forense en la Web». La palabra «acreditación» forma parte del nombre del producto; no implica por sí sola una titulación oficial.

El objetivo comercial es aumentar las solicitudes cualificadas de información y las visitas con intención de matrícula. Diseña para facilitar esas acciones, midiendo el embudo sin prometer tasas de conversión inventadas.

## 1. Fuentes, alcance y reglas de precedencia

### 1.1. Material obligatorio

1. **`Req abogados (1).pdf`**, versión ampliada de 21 páginas con los nuevos pantallazos para abogados en las páginas 19-21: fuente principal del contenido comercial, segmentos, propuesta de valor, estructura, tipografías, colores y las 15 expresiones SEO. Las copias anteriores `Req abogados(1).pdf` / `Req abogados.pdf` contienen el material de base. Conserva todas sus aportaciones. El banco del apartado 17 las incorpora en español para que este prompt también sea utilizable sin los PDF. La numeración de páginas indicada en este encargo corresponde a la versión ampliada de 21 páginas; en la copia anterior de 19 páginas el material de base llevaba una portada adicional.
2. **`yoga (2)(1).pdf`**, también denominado `yoga (2).pdf`: referencia del nivel de precisión técnica del encargo: componentes, estilos, comportamiento, estados, animaciones y criterios medibles. Adopta su precisión, no su estética ni sus activos.
3. **https://osint-abogados-rerry66.gamma.site/**: referencia principal de secuencia de secciones para el público jurídico.
4. **https://osint-formacion-t85i4av.gamma.site/**: referencia complementaria de organización y contenido.
5. **https://perinfor.odoo.com/itr-principal**: destino corporativo de solicitudes de información y contacto con iTR+.
6. **https://perinfor.odoo.com/slides/acreditacion-tecnico-especialista-en-analisis-forense-en-la-web-10**: destino para acceder a la plataforma del curso y continuar el proceso de matrícula.

Los dos sitios Gamma sirven para la **arquitectura de información**, no para copiar su diseño. Sus capturas están en las páginas 11-18 del PDF ampliado, junto con nuevos pantallazos de abogados en las páginas 19-21, que tienen prioridad para el hero y la secuencia mostrada. En la preparación de este prompt los Gamma respondieron con acceso denegado; el orden indicado aquí se ha reconstruido de esas capturas. Si puedes consultar las páginas, contrasta su estado y registra diferencias. No afirmes haber visto una página a la que no accediste.

### 1.2. Precedencia

- Las instrucciones expresas de este encargo prevalecen: marca iTR+, español, dominio independiente, destinos Odoo indicados, fondo del hero que sigue al cursor y conservación del briefing.
- **Actualización expresa del cliente: NO mostrar precios en la landing.** No publiques importes, «desde», cuotas, porcentajes de descuento, tablas o tarjetas de precios, ni los insertes en JSON-LD, metadatos, HTML oculto, atributos `data-*` o datos serializados enviados al navegador. La información económica del briefing se conserva exclusivamente en documentación interna. La información ampliada y las condiciones del curso se consultan en `COURSE_URL`; las solicitudes de contacto se dirigen a `CORPORATE_URL`. Esta regla sustituye cualquier asignación anterior de enlaces informativos al sitio corporativo.
- Conserva el contenido del marketing y su intención. Traduce el catalán al español y corrige únicamente errores ortográficos. Se puede enriquecer y redistribuir en componentes, sin perder información.
- Para hechos comerciales variables, conserva el dato del briefing y cualquier dato actual discrepante con su procedencia. No conviertas una hipótesis o un dato pendiente en una afirmación confirmada.
- Los documentos de estrategia comercial se conservan en documentación interna; no se publican como texto de la landing. Los importes históricos y los registros internos no deben incorporarse a `src/data` público, bundles, sourcemaps publicados, archivos descargables ni a `dist/`; la compilación distribuye exclusivamente contenido apto para visitantes. La tabla de canales de captación, por ejemplo, no debe aparecer como contenido para compradores.
- Mantén una matriz `docs/trazabilidad-contenido.md`: página/fuente, fragmento, traducción cuando corresponda, ubicación pública o interna, estado de verificación y cambios justificados. Toda aportación del briefing debe tener destino.
- Las frases repetidas pueden compartir un componente. Las propuestas para alumnos y detectives se mantienen en un bloque secundario dentro de destinatarios, sin desplazar al público principal de abogados.

### 1.3. Diferencias reales que debes gestionar

Consulta de la ficha pública del curso realizada el **21 de octubre de 2026**:

| Campo | Briefing de marketing | Ficha pública consultada | Regla de implementación |
| --- | --- | --- | --- |
| Precio | Aproximadamente 540 €, IVA incluido; descuentos de lanzamiento, estudiantes y desempleados | Muestra 445,00 €; el texto público extraído no permite confirmar su tratamiento fiscal | No supongas que 445 € es neto ni calcules un total como precio contractual. Conserva ambos datos en la matriz. Enlaza a «Información completa y condiciones del curso» en `COURSE_URL`. Los descuentos y sus importes quedan como referencia interna, sin promesas comerciales públicas no verificadas. No muestres ningún importe aunque posteriormente se confirme: el cliente ha decidido dejar esa información en la página del curso. No añadas un bloque de precio. |
| Duración | Aproximadamente 60 h: 20 teóricas + 40 prácticas | Campo «Tiempo de finalización»: 15 horas 10 minutos | Son métricas distintas que deben aclararse. Conserva «carga formativa estimada de 60 horas, según el programa facilitado, incluyendo práctica» con nota próxima: «El tiempo configurado actualmente en la plataforma es de 15 h 10 min; consulta la dedicación y planificación vigentes». No llames automáticamente a ese tiempo duración de vídeo. |
| Programa | 7 módulos, 38 lecciones, cuestionarios y test final | 7 bloques con 38 lecciones; bloque «Test» adicional de 1 lección | Expresa «7 módulos, 38 lecciones y evaluación final». No cuentes el test como una de las 38 ni como un octavo módulo formativo. |
| Certificación | Variantes sobre COEINF, visado y denominación pendientes de confirmación | Aparece «Certificado para titulación de Técnico Tecnólogo»; el texto público extraído no confirma COEINF | Conserva las variantes en la matriz. En la landing comunica certificado final y referencia a COEINF pendiente de confirmación; no publiques «oficial», «homologado», «acreditado por COEINF» o un sello sin evidencia suficiente. |

Las diferencias no justifican abandonar el desarrollo. Resuélvelas con los textos provisionales anteriores, centraliza los campos y documenta lo que debe verificarse antes de activar publicidad o publicar afirmaciones definitivas. La exclusión de precios en esta landing es permanente dentro de este alcance y no depende de resolver esas diferencias. No muestres al visitante instrucciones de desarrollo, nombres de flags ni notas internas.

## 2. Arquitectura y stack

Construye una landing de una página con desplazamiento vertical natural, indexable y alojable en un dominio propio, sin depender de Odoo para renderizar su contenido.

### Stack preferente

- **Astro**, versión estable compatible verificada al iniciar la implementación, con generación estática.
- **React + TypeScript estricto** para las islas interactivas. Selecciona versiones estables compatibles y fija el resultado en el lockfile.
- **Tailwind CSS v4**, integrado mediante `@tailwindcss/vite`, y CSS propio para el sistema visual.
- **Motion**, importado desde `motion/react`, para springs, transiciones de estado y movimiento de las islas.
- **Three.js**, importación dinámica solo en el fondo decorativo del hero, para una escena ligera con geometrías instanciadas y shader de campo de puntos. Mantén una alternativa CSS/SVG completa.
- **SVG nativo** para el grafo interactivo del caso: debe seguir siendo accesible y nítido, sin depender de WebGL.
- **Playwright** y **axe-core** para las comprobaciones de los flujos importantes; auditoría Lighthouse sobre la compilación servida.

Si el repositorio existente ya tiene un stack adecuado, consérvalo y documenta la adaptación. No migres por preferencia personal. Lee `AGENTS.md` y las instrucciones del repositorio antes de editar.

### Contrato de renderizado

- H1, textos, beneficios, público, programa completo, condiciones, FAQ y enlaces deben estar presentes en el HTML generado.
- El hero textual se entrega como HTML estático; su decoración se hidrata por separado. El canvas no contiene texto importante.
- Usa `client:idle` o una activación diferida para la decoración del hero, y `client:visible` para las herramientas situadas más abajo. Documenta cualquier excepción.
- No construyas una SPA que entregue inicialmente una página vacía. No hagas que el SEO dependa de ejecutar React.
- La versión sin JavaScript permite leer el contenido, desplegar los elementos nativos del programa y las FAQ, y seguir los CTA.
- No copies del ejemplo yoga su restricción sin scroll, Anton, textos en mayúsculas, vídeos HLS ni URLs de medios.

Estructura sugerida, ajustable sin perder responsabilidades:

```text
src/
  pages/index.astro
  layouts/LandingLayout.astro
  components/
    Header.astro
    Hero.astro
    HeroBackground.tsx
    HeroScene.ts
    Benefits.astro
    EvidenceCase.tsx
    Audience.astro
    Program.astro
    CourseFacts.astro
    ProfessionalApplication.astro
    Certification.astro
    FAQ.astro
    FinalCTA.astro
    Footer.astro
    MobileCTA.astro
  data/
    site.ts
    course.ts
    copy.ts
    curriculum.ts
    seo.ts
    demo-case.ts
  lib/
    attribution.ts
    analytics.ts
    consent.ts
    links.ts
  styles/global.css
public/
  fonts/
  images/
  downloads/programa-osint-abogados.pdf
scripts/generate-program.mjs
docs/
  trazabilidad-contenido.md
  fuentes-y-verificaciones.md
  medicion-y-odoo.md
  estrategia-captacion.md
  despliegue.md
tests/
```

Entrega también `README.md`, `.env.example`, lockfile y scripts reales para desarrollo, compilación, comprobación de tipos y verificaciones. No incluyas dependencias sin uso.

## 3. Dirección de arte y sistema visual

El concepto visual es **un expediente de investigación digital contemporáneo, preciso y elegante**. Debe inspirar confianza profesional a un abogado y mostrar la capacidad tecnológica de iTR+.

Combina composición editorial, espacio generoso, tipografía excelente, capas de profundidad discretas y visualizaciones de fuentes y relaciones. Alterna superficies blancas y azul oscuro. Evita una plantilla repetitiva de tarjetas idénticas. Conserva la temática tecnológica, forense y jurídica de las referencias del briefing, con activos propios o con licencia documentada.

### Colores obligatorios

Conserva exactamente estos códigos impresos en la página 7 del briefing ampliado:

```css
@import "tailwindcss";

@theme {
  --font-display: "IBM Plex Sans", sans-serif;
  --font-body: "Inter", sans-serif;
  --color-itr-950: #0B1F3A;
  --color-itr-900: #163A63;
  --color-itr-700: #2563A6;
  --color-itr-500: #507DA8;
  --color-itr-slate: #6f7e90;
  --color-itr-white: #ffffff;
}
```

El quinto círculo del PDF parece más claro que el hexadecimal impreso `#6f7e90`. Preserva el código escrito como token corporativo y registra esa discrepancia visual. Puedes añadir tonos derivados para fondos y bordes; no sustituyas ni elimines los seis originales. Comprueba el contraste de cada combinación: conservar un color no significa usarlo para texto pequeño sobre blanco.

### Tipografía y composición

- **IBM Plex Sans** para titulares y cifras; **Inter** para cuerpo, navegación, botones y etiquetas. Ambas son obligatorias.
- Aloja WOFF2 localmente cuando sea posible, conserva licencias, limita pesos y usa `font-display: swap`. Precarga solo las fuentes realmente críticas.
- Un único H1. Tamaño orientativo `clamp(2.5rem, 5.2vw, 5rem)`, interlineado 1.04-1.12 y anchura que produzca cortes naturales. No fuerces una frase larga en dos líneas ilegibles.
- Cuerpo de 16-18 px, interlineado 1.55-1.7, bloques de lectura de 60-70 caracteres.
- Contenedor de 1200-1280 px; rejilla de 12 columnas en escritorio; separaciones de 24-32 px. Márgenes laterales fluidos de 20-64 px y ritmo vertical de 64-112 px.
- Radio de 12-20 px, bordes finos, sombras contenidas. Los CTA principales tienen presencia consistente; no todos los controles son botones rellenos.
- Iconos SVG de una misma familia. No uses emojis como sistema de iconos.
- Usa el logotipo real si se proporciona un archivo utilizable. Si falta, crea un wordmark tipográfico limpio «iTR+» y documenta que es provisional; no inventes un escudo ni un sello de acreditación.

### Activos

El hero debe disponer desde el primer render de una composición SVG o imagen local optimizada que ya resulte atractiva. El WebGL añade profundidad cuando está disponible. No uses imágenes rotas, enlaces de imágenes temporales, fotografías sin licencia documentada ni capturas borrosas de Gamma. Si generas una imagen con una herramienta disponible, registra su origen y optimízala antes de incluirla. Los diagramas precisos se dibujan con SVG/código.

## 4. Orden de secciones y navegación

Conserva la secuencia principal de los nuevos pantallazos para abogados de las páginas 19-21 del PDF ampliado: hero → utilidad → destinatarios → aprendizaje → características → aplicación profesional. Complétala después con certificación → FAQ → cierre, presentes en las capturas anteriores de las páginas 15-18. Integra el contenido del segundo Gamma en los bloques correspondientes; no copies la estética lila de sus controles.

| Orden | Sección e ID | Fuente y contenido | Enriquecimiento funcional |
| --- | --- | --- | --- |
| 0 | Cabecera | iTR+, navegación y contacto | Header compacto, menú móvil y CTA persistente |
| 1 | Hero `#inicio` | Nuevo titular «Investiga más allá de los documentos…», subtítulo y dos CTA de la página 19 | Fondo que sigue al cursor; solicitud de información y descarga real del programa |
| 2 | Utilidad `#aplicaciones` | «¿Qué puede aportar OSINT a tu trabajo como abogado?» y las cuatro aplicaciones desarrolladas de la página 19 | Demostración de un expediente ficticio dentro de esta misma sección |
| 3 | Destinatarios `#para-quien` | Cuatro perfiles jurídicos de la página 19; perfiles complementarios de las páginas 9 y 12 | Selector de especialidad, sin ocultar el resto del contenido |
| 4 | Aprendizaje y programa `#programa` | Siete áreas de la página 20 y de la página 16; contenidos de las páginas 4, 11 y 12 | Acordeones con los siete módulos y las 38 lecciones |
| 5 | Características `#formacion` | Modalidad, dedicación, estructura y requisitos de la página 21; soporte y materiales de las páginas 13 y 17 | Ficha clara y planificación orientativa; enlace a condiciones en la página del curso |
| 6 | Aplicación profesional `#aplicacion-profesional` | Nuevo bloque de la página 21 y aplicación práctica de la página 14 | Texto e imagen editorial; practicidad, rigor y flexibilidad |
| 7 | Certificación `#certificacion` | Contenido de las páginas 1-3 y 17 con su estado de verificación | Explicación breve y honesta, sin sello no confirmado |
| 8 | FAQ `#preguntas` | Las cuatro preguntas originales de la página 18 | Respuestas accesibles y dudas adicionales útiles |
| 9 | Cierre `#informacion` | «Amplía tus herramientas de investigación jurídica» y «Da un paso más en tu investigación jurídica» | CTA final al sitio corporativo y acceso secundario al curso |
| 10 | Pie | iTR+, información corporativa y documentos legales verificados | Preferencias de privacidad cuando procedan |

El hero y los bloques del segundo Gamma se conservan como contenido complementario, no como una segunda landing completa. Los bloques «Módulos», «Lecciones» y «Evaluación» forman parte del programa. «Practicidad inmediata», «Rigor jurídico» y «Flexibilidad» forman parte del bloque independiente de aplicación profesional. No lo absorbas en una tarjeta pequeña ni lo omitas.

Navegación: «Aplicaciones», «Para quién», «Programa», «Formación» y «Preguntas». El CTA de cabecera es «Solicitar información». Enlaces ancla con `scroll-margin-top`, foco visible y estado activo mediante `IntersectionObserver`. Mantén el scroll nativo y evita secuestrarlo para controlar escenas.

## 5. Hero: implementación precisa del fondo que sigue al cursor

Este es un requisito central. **El fondo debe desplazarse y reaccionar de forma perceptible, suave y elegante al movimiento del cursor.** Una animación automática sin interacción no cumple el encargo.

### 5.1. Composición

- Hero de aproximadamente `min-height: 88svh` en escritorio y altura natural en móvil. No recortes el texto ni fuerces `100vh` cuando el contenido necesite más espacio.
- Columna textual de 55-60 %; composición visual en el resto, con continuidad de fondo. Orden de lectura: etiqueta, H1, subtítulo, CTA, datos del curso.
- Etiqueta: «Curso OSINT para abogados · iTR+».
- **H1 prioritario de los nuevos pantallazos:** «Investiga más allá de los documentos. Descubre el potencial del OSINT para abogados». Conserva literalmente su mensaje y puntuación natural.
- El titular anterior «Descubre el potencial del OSINT y aprende técnicas de investigación digital para abogados» se conserva como texto introductorio de aprendizaje, sin crear un segundo H1.
- Subtítulo original: «Aprende técnicas de investigación digital para localizar y documentar información pública relevante.»
- Añade una frase corta de valor: «Aprende a buscar, contrastar y documentar fuentes abiertas con una metodología práctica y rigurosa.»
- CTA principal de la captura nueva: «Solicita información del curso». Destino `CORPORATE_URL`. Conserva la variante original «Solicitar información del curso» en los CTA posteriores.
- CTA secundario de la captura nueva: **«Descargar programa»**. Debe descargar un PDF real, local, accesible y sin precios. Incluye acceso de texto «Explorar el programa» al ancla `#programa`.
- Acceso de texto a la ficha y plataforma: «Información completa del curso» y/o «Acceder al curso en iTR+», con destino `COURSE_URL`.
- Datos: 100 % online; 7 módulos; 38 lecciones y evaluación final; carga formativa estimada según las reglas de duración. No uses estrellas o cifras de alumnos inventadas.

### 5.2. Capas decorativas

1. Base azul `#0B1F3A`, degradado atmosférico y textura muy sutil.
2. Retícula y curvas de relación discretas, con profundidad.
3. Campo de 300-600 puntos instanciados y un máximo aproximado de 24 conexiones importantes. Geometría determinista a partir de una semilla.
4. Un conjunto abstracto de documentos y nodos de un expediente simulado, construido como escena ligera. No debe confundirse con una captura de un sistema real.
5. Halo azul que sigue al puntero. Opacidad limitada y máscara para preservar contraste bajo el texto.
6. Capa de contraste estable bajo el contenido. Los párrafos y los botones no se desplazan con la escena.

### 5.3. Mecánica del puntero

Calcula las coordenadas respecto al rectángulo del hero, no respecto a toda la página:

```ts
const nx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
const ny = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);

// Valores objetivo; el primer plano acompaña el sentido del cursor.
target.x = nx * 24;
target.y = ny * 18;
target.rotateY = nx * 2;
target.rotateX = -ny * 1.5;
```

- Usa `pointermove` y MotionValues o refs; no ejecutes `setState` de React por cada evento.
- Suaviza con `useSpring` o un integrador de amortiguación equivalente: punto de partida `stiffness: 90`, `damping: 24`, `mass: 0.8`.
- Plano lejano: 0.25-0.4 de amplitud; plano medio: 0.55-0.7; primer plano: amplitud completa. El halo interpola su centro hacia la posición del puntero.
- En Three.js, transforma el grupo decorativo y alimenta `uPointer` del shader; no hagas recomputación de geometrías ni asignes objetos nuevos en cada frame.
- Render loop con `requestAnimationFrame` administrado por un único responsable. El movimiento puede actualizarse hasta 60 fps mientras existe cambio; deja de renderizar al estabilizarse si no hay otra animación activa.
- Al salir el puntero, vuelve al centro con el mismo amortiguamiento. Al reentrar, evita saltos.
- Recorte `overflow: clip` o equivalente; overscan aproximado de 6 % en la capa que lo necesite para que no aparezcan bordes vacíos.
- La capa decorativa usa `pointer-events: none` y `aria-hidden="true"`. Los eventos se observan en el contenedor; no se interceptan clics de enlaces o selección de texto.

### 5.4. Fallback y adaptación

- Activa seguimiento solo si coinciden `hover: hover`, `pointer: fine` y ausencia de preferencia de movimiento reducido.
- Con `prefers-reduced-motion: reduce`, muestra composición estática; desactiva parallax, drift, tilt y reveals que desplacen contenido. Escucha cambios de preferencia durante la sesión.
- En móvil y puntero grueso no solicites giroscopio. Mantén una composición estática cuidada y un CTA visible.
- Si falla WebGL, pierde el contexto, se solicita ahorro de datos o el dispositivo no alcanza el presupuesto de rendimiento, usa SVG/CSS. Cuando hay un puntero fino, el fallback CSS conserva el seguimiento suave, salvo movimiento reducido.
- Limita el DPR a 1.5, evita postprocesado pesado y reduce geometría antes de sacrificar legibilidad o fluidez.
- Pausa al ocultarse la pestaña o salir el hero del viewport. Limpia listeners, observers, animaciones, geometrías, materiales y renderer al desmontar.
- Si existe movimiento automático persistente durante más de cinco segundos, ofrece «Pausar animación», accesible por teclado; en el modo predeterminado puedes evitar ese drift y animar únicamente como respuesta al puntero.

## 6. Interactividad que demuestra el valor del curso

### 6.1. Expediente ficticio: «Una relación que conviene verificar»

Incluye una demostración breve dentro de `#aplicaciones`, sin bloquear el acceso al resto de la página ni exigir datos personales. Mantén «¿Qué puede aportar OSINT a tu trabajo como abogado?» como título principal de utilidad y conserva «¿Cómo puede ayudarte el OSINT en tu práctica jurídica?» como introducción complementaria.

Historia: un despacho necesita ordenar información pública para preparar una diligencia sobre posibles relaciones entre sociedades. Todo está simulado. Nodos: «Sociedad A (simulada)», «Sociedad B (simulada)», «Persona 01 (simulada)» y «Documento 01 (simulado)».

Fuentes locales de demostración: ficha registral simulada, anuncio societario simulado y perfil profesional simulado. Los nombres, documentos, fechas y relaciones deben estar fijados en `demo-case.ts`, sin datos de personas reales. Usa identificadores reservados como `fuente01.example.invalid`; no hagas consultas reales ni prometas acceso a bases restringidas.

Estados y flujo:

1. **Localizar**: elegir una fuente mediante botones o chips accesibles. Se muestran tipo de fuente, fecha ficticia de consulta y limitaciones.
2. **Contrastar**: seleccionar dos documentos y ver qué relación está apoyada, cuál es solo una hipótesis y qué falta comprobar.
3. **Documentar**: vista de informe con fuente, fecha, hallazgo, referencia y limitación.

El grafo SVG responde a clic y teclado. Un nodo abre un panel lateral en escritorio y un bloque en flujo en móvil. No dependas de arrastrar, del hover o del color para comprender las relaciones. Incluye una lista textual equivalente. Usa identificadores únicos para SVG y conserva proporciones en pantallas pequeñas.

Opcional de valor si se implementa por completo: «Descargar ejemplo de registro de fuentes» como archivo real local `.txt` o `.json`. No uses un botón de descarga vacío. Si muestras SHA-256, calcúlalo realmente sobre los bytes concretos del archivo mediante Web Crypto y explica que solo identifica esos bytes: no acredita autoría, origen, fecha de captura ni admisibilidad judicial.

Microcopy visible: «Demostración con datos simulados. Un hallazgo necesita contexto, contraste y documentación; la admisibilidad de una prueba depende del caso y de su obtención y aportación.»

Cierre contextual: «Aprende una metodología para localizar, contrastar y documentar información pública». CTA: «Solicitar información del curso», al destino corporativo. La variante original «Quiero más información» se conserva en el cierre secundario y enlaza a la ficha ampliada del curso.

### 6.2. Selector de especialidad

En destinatarios, permite seleccionar litigación civil y mercantil, conflictos societarios, derecho digital y privacidad o penal económico, en el orden de las capturas nuevas. Resalta las aplicaciones relevantes y cambia un ejemplo corto, sin reordenar los bloques ni reemplazar el H1. El contenido completo sigue disponible en HTML. No presentes el selector como diagnóstico ni como asesoramiento sobre un caso real.

### 6.3. Programa, descarga y planificación

- Genera `public/downloads/programa-osint-abogados.pdf` a partir de los mismos datos tipados del programa. Debe contener marca, introducción, siete módulos, 38 lecciones, evaluación final, notas verificadas sobre dedicación y enlace al curso. No incluyas precios ni afirmaciones de acreditación pendientes. Usa una herramienta PDF disponible o una dependencia de generación adecuada, fuentes con licencia y texto seleccionable. Comprueba el archivo y su renderizado. Entrega un script reproducible; no dependas de una URL de descarga ficticia. El PDF es un activo del sitio, no una copia de las capturas Gamma.

- Programa en `<details>/<summary>` o componente equivalente con experiencia sin JavaScript. «Expandir todo» y «Contraer todo» si añaden utilidad.
- Siete módulos y sus 38 lecciones reales; no inventes nombres de clases, pruebas adicionales o modalidades de acceso.
- Una calculadora sencilla puede estimar semanas según horas semanales introducidas, usando la carga orientativa del briefing: `semanas = Math.ceil(60 / horasSemanales)`. Etiqueta siempre como estimación, no calendario contratado. Excluye entradas cero, negativas o no numéricas. No envíes esa elección al CRM como una necesidad del usuario sin información y base adecuadas.
- No uses resultados bloqueados tras un formulario falso. La interacción debe aportar valor incluso si el visitante no solicita información.

## 7. Sistema de movimiento y estados

| Elemento | Disparador | Comportamiento | Parámetros iniciales |
| --- | --- | --- | --- |
| Fondo hero | Movimiento del puntero | Parallax por capas + halo + inclinación mínima | ±24/18 px; spring 90/24/0.8 |
| H1 y subtítulo | Entrada inicial | Opacidad y desplazamiento suave; contenido ya legible en HTML | 450-650 ms; 12-20 px; sin retrasar el CTA |
| Secciones | Entrada en viewport | Reveal una vez; grupos pequeños | 400-550 ms; stagger 50-80 ms |
| Tarjetas | Hover y foco cuando corresponde | Borde, sombra y desplazamiento mínimo | 160-220 ms; hasta 3 px |
| Grafo del expediente | Selección | Resaltar relación y panel asociado | 200-300 ms; sin mover el texto en lectura |
| Acordeón | Abrir/cerrar | Cambio estable y accesible de contenido | 180-240 ms; sin recortes |
| CTA móvil | Salida del hero | Aparición discreta de barra inferior | 180-240 ms; respeto a safe-area |

Evita efectos de escritura que retrasen la promesa, scroll horizontal obligatorio, preloader artificial, cursor personalizado que dificulte el clic y animaciones continuas que compitan con la lectura. Usa `transform` y `opacity`; no animes grandes desenfoques ni propiedades que provoquen recalcular el layout en cada frame. Aplica `will-change` solo donde sea útil y retíralo cuando corresponda.

El HTML no debe quedar invisible si JavaScript o la hidratación fallan. Implementa estados reales de reposo, carga, seleccionado, expandido, error y fallback donde existan operaciones que los necesiten. No añadas estados de envío a botones que solo navegan.

## 8. Conversión y contrato de enlaces

### Destinos obligatorios

```ts
export const CORPORATE_URL = "https://perinfor.odoo.com/itr-principal";
export const COURSE_URL =
  "https://perinfor.odoo.com/slides/acreditacion-tecnico-especialista-en-analisis-forense-en-la-web-10";
```

| Intención del enlace | Etiquetas | Destino |
| --- | --- | --- |
| Solicitud de información y contacto con el equipo | «Solicita información del curso», «Solicitar información del curso», «Solicitar información», «Contactar con iTR+» | `CORPORATE_URL` |
| Información ampliada y condiciones del curso | «Información completa del curso», «Más información del curso», «Quiero más información», «Consultar condiciones del curso» | `COURSE_URL` |
| Descarga de programa | «Descargar programa» | `/downloads/programa-osint-abogados.pdf`, archivo real, sin precios |
| Explorar contenido de esta landing | «Explorar el programa», «Ver aplicaciones» | `#programa`, `#aplicaciones` |
| Acceder a la plataforma y continuar la matrícula | «Acceder al curso en iTR+», «Continuar en la plataforma del curso» | `COURSE_URL` |

No cambies por tu cuenta los CTA de contacto a `/contactus`, WhatsApp, email, teléfono o un formulario diferente. No añadas un fragmento Odoo que no hayas verificado. El CTA de solicitud de información no debe afirmar que ya ha enviado un mensaje: navega al sitio corporativo. Los enlaces de información ampliada llevan a la ficha del curso, según la tabla. El curso puede requerir identificación o pasos adicionales; el enlace no equivale a completar una compra.

Usa enlaces `<a href>` reales que funcionen sin JavaScript. Por defecto navegan en la misma pestaña. Si algún enlace abre otra, indícalo de forma accesible y añade las protecciones correspondientes.

### Jerarquía de conversión

- Un CTA principal repetido con coherencia en hero, después del expediente, después de las características y al final. No crees cuatro acciones principales distintas.
- Cabecera de escritorio con CTA visible. Barra móvil compacta cuando el hero deja de verse; no tapa contenido, paneles abiertos o controles de privacidad. Reserva espacio inferior y usa `env(safe-area-inset-bottom)`.
- Antes del clic, explica qué puede consultar el visitante: programa, dedicación y condiciones. La landing no tiene sección de precio; la información ampliada se encuentra en la ficha del curso. No prometas respuesta en 24 horas, disponibilidad inmediata de un asesor o descuentos concretos sin confirmación.
- Mantén como beneficios la metodología, las aplicaciones jurídicas, los recursos, las tutorías y el formato online. No atribuyas éxito judicial o ingresos al curso.
- No inventes testimonios, logotipos de despachos, contadores de alumnos, avales de colegios, urgencia, plazas limitadas, ofertas temporales, tasas de aprobado ni garantías de empleo.

La versión inicial usa derivación a Odoo; no necesita recoger leads localmente. Si se desarrolla en el futuro un formulario propio, debe ser una integración completa con backend y confirmación real. No lo simules en este alcance.

## 9. SEO técnico y semántico

### 9.1. Las 15 expresiones obligatorias

Conserva las quince y asigna a cada una una ubicación útil. No las relegues a una lista invisible, metadatos de keywords o un pie saturado.

| Expresión del briefing | Ubicación propuesta |
| --- | --- |
| Curso OSINT para abogados | Título SEO, etiqueta del hero y descripción inicial |
| OSINT aplicado al ámbito jurídico | Introducción de aplicaciones |
| Investigación digital para abogados | Hero y descripción de formación |
| Investigación de personas en internet | Área de identidades y redes, con delimitación de fuentes públicas |
| Investigación de sociedades mercantiles | Aplicación societaria y módulo 4 |
| Investigación de empresas y administradores | Texto de aplicación mercantil |
| Análisis de huella digital | Área de identidades digitales |
| Investigación en redes sociales | Área de aprendizaje y módulo 3 |
| Inteligencia de fuentes abiertas | Definición breve de OSINT |
| Técnicas OSINT para abogados | Beneficios y cierre contextual |
| Herramientas OSINT para profesionales jurídicos | Área de herramientas y módulo 6 |
| Búsqueda avanzada de información pública | Área de búsqueda y módulo 2 |
| Investigación empresarial mediante fuentes abiertas | Desarrollo del caso societario |
| Elaboración de informes OSINT | Área de documentación y módulo 7 |
| Curso de investigación digital para abogados | Texto de presentación o FAQ |

Puedes añadir variaciones naturales, entidades y preguntas de intención comercial, sin borrar ninguna expresión. Mantén un texto que un abogado quiera leer. No impongas densidades de palabras clave ni prometas posiciones en buscadores.

### 9.2. Metadatos y estructura

- `lang="es-ES"`, título único y descripción propia.
- Título propuesto: **«Curso OSINT para abogados | Investigación digital · iTR+»**.
- Descripción propuesta: **«Aprende a buscar, contrastar y documentar información pública para tu práctica jurídica. Curso OSINT online de iTR+. Consulta programa y condiciones.»**
- H1 único y jerarquía H2/H3 coherente. No elijas niveles de encabezado por su tamaño visual.
- Canonical absoluto al dominio definitivo de esta landing, sin UTM. No canonices por defecto hacia Odoo: es una página comercial con propósito propio.
- Configura `PUBLIC_SITE_URL` con validación. En preview usa `noindex` y una URL de preview válida; impide generar una compilación de producción con un dominio ficticio, `localhost` o pendiente de configurar.
- `robots.txt`, sitemap con URLs canónicas, Open Graph y tarjeta social con imagen local real de 1200×630. Previews privadas con noindex y controles de acceso cuando estén disponibles. No uses robots.txt para bloquear el rastreo de una página que necesite ser vista con su noindex.
- No crees páginas finas por cada palabra clave. No incluyas `meta keywords` como estrategia SEO.
- Imágenes con dimensiones, formatos modernos, `srcset/sizes` cuando corresponda y `alt` útil; activos decorativos con alternativa vacía. El recurso principal visible no se carga con lazy.

### 9.3. Datos estructurados

Genera JSON-LD válido con `Organization` para iTR+, `WebSite` y `Course` cuando sus propiedades correspondan al contenido visible. Usa identificadores estables y URL real del proveedor. No inventes razón social, dirección fiscal, identificadores, logo certificado o perfiles `sameAs`.

No incluyas `Offer`, `price`, `priceValidUntil` ni ningún otro campo económico: los precios están excluidos de esta landing por decisión del cliente. No publiques duración contractual o una credencial específica hasta verificarlas. No añadas `AggregateRating` o reseñas sin evidencia. Un `Course` válido no garantiza un resultado enriquecido; una única landing no debe fingir un catálogo de varios cursos para satisfacer otro formato. Las FAQ son útiles para el visitante, pero no prometas resultados enriquecidos de FAQ para esta web comercial. Si añades `FAQPage`, solo incluye las preguntas y respuestas realmente visibles y comprueba las directrices vigentes.

## 10. Medición, atribución y preparación de automatizaciones

### 10.1. Embudo y eventos

Prepara un adaptador desacoplado de analítica, desactivado hasta disponer de configuración y consentimiento aplicable. No cargues simultáneamente GA4 directo y GTM para emitir el mismo evento.

| Evento | Cuándo se emite | Qué significa |
| --- | --- | --- |
| `cta_info_click` | Activación de enlace informativo | Intención de consultar; no un lead generado |
| `course_platform_click` | Activación de enlace al curso | Salida hacia la plataforma; no una matrícula |
| `demo_start` | Primera interacción con el expediente | Inicio de demostración |
| `demo_complete` | Visualización efectiva del registro final | Finalización de demostración |
| `program_open` | Apertura de un módulo por el usuario | Interés en el programa |
| `faq_open` | Apertura de una pregunta | Consulta de una duda |
| `generate_lead` | Confirmación real en el sistema receptor | Lead registrado; no se emite desde un clic local |

Parámetros permitidos: `cta_id`, `section_id`, `destination_type`, `module_id`, `demo_step`, `campaign` y variante autorizada si existe. No incluyas nombre, email, teléfono, consulta libre, documentos, nombres de clientes ni URL completa con parámetros que puedan contener datos personales. Evita duplicados por re-render; deduplica eventos que deban emitirse una sola vez.

### 10.2. Atribución hacia Odoo

- Centraliza la creación de enlaces y utiliza `URL`/`URLSearchParams`; no concatentes consultas sin validar.
- Mantén host y pathname de los dos destinos obligatorios. El usuario no puede sustituirlos mediante `redirect`, `next` u otro parámetro.
- Puedes añadir atribución de campaña a esos destinos. Usa una lista permitida, límites de longitud y valores de campañas conocidos; no copies cualquier texto entrante a analítica o a un enlace. No transmitas información personal que aparezca en una URL.
- Valores de referencia sin atribución entrante válida: `utm_source=landing_osint_abogados`, `utm_medium=referral`, `utm_campaign=osint_juridico`; `utm_content` identifica el CTA, por ejemplo `hero_principal`.
- No sobreescribas una campaña válida sin definir antes el modelo de atribución. Documenta si se conserva la campaña de entrada y cómo se distingue el origen de esta landing.
- No persistas identificadores de marketing en cookies, localStorage o sessionStorage antes de la base y el consentimiento que procedan. La navegación básica no depende de ello.
- La medición entre dominios requiere configuración y permisos en ambos sitios. No afirmes que funciona por añadir parámetros, ni copies manualmente identificadores del linker.
- **Una UTM no crea por sí sola una etiqueta `crm.tag` ni garantiza que se cree un `crm.lead`.** Describe ese límite expresamente en la documentación.

### 10.3. Automatización comercial documentada, no simulada

Incluye un esquema de configuración futura:

1. Visitante llega desde la landing al destino Odoo con una campaña identificable.
2. Envía una solicitud mediante un formulario real del sitio receptor.
3. Odoo confirma la creación del contacto u oportunidad, según la configuración del formulario.
4. Una regla configurada en Odoo o una integración de servidor identifica esa campaña y aplica una etiqueta acordada, por ejemplo «OSINT · Abogados».
5. Se registra el estado real del lead. Cualquier comunicación o suscripción posterior requiere una configuración y autorización propias.

No implementes llamadas a Odoo con API keys en el navegador. No supongas versión, modelos, permisos, endpoint o nombres de campos de esa instalación. Una integración futura requiere comprobar la API y el plan disponibles y proteger los secretos en servidor. No hagas cambios en el Odoo de producción ni envíes mensajes a terceros como parte de construir esta landing.

Conserva en `docs/estrategia-captacion.md` los canales, prioridades y propuesta de webinar del apartado 17. La propuesta de organizar un webinar gratuito no equivale a un evento ya programado: no anuncies fecha, reserva o plazas sin confirmar su existencia. Si no está configurado, deriva la consulta sobre demostraciones al CTA corporativo y documenta la oportunidad comercial.

## 11. Privacidad, rigor jurídico y OSINT

Integra estas condiciones en las partes pertinentes de la experiencia, sin convertir la landing en un texto legal extenso:

- La información accesible públicamente no implica uso o tratamiento irrestricto. Comunica finalidad legítima, respeto a la privacidad, límites de acceso y documentación rigurosa.
- Distingue información, indicio, hipótesis y prueba. El curso enseña metodología; no garantiza por sí mismo admisión judicial de un informe.
- No afirmes que un abogado adquiere automáticamente habilitación como detective privado, perito acreditado o una titulación oficial por completar el curso.
- «Cadena de custodia» se presenta como materia y buenas prácticas; una animación, un hash o un exportador no la garantizan por sí solos.
- Deep Web se trata con precisión y enfoque profesional; no se equipara automáticamente con actividad delictiva ni se promete acceso a contenido privado.
- Las demostraciones no piden ni aceptan datos de un caso real. No incluyas campos para subir documentación confidencial.
- Los enlaces legales deben apuntar a documentos reales y verificados del responsable que cubran también este dominio. No inventes NIF, razón social, domicilio, responsable de privacidad ni textos de consentimiento sin datos suficientes. Prepara la configuración y documenta los campos necesarios para publicación.
- Si no se activan analítica ni otras tecnologías no esenciales, no muestres un banner ficticio que ofrezca elecciones sin efecto. Cuando se activen, bloquea cargas no esenciales hasta la elección válida; «Aceptar», «Rechazar» y «Configurar» deben estar disponibles con visibilidad y facilidad equivalentes. Permite retirar la elección.
- Mantén la información de privacidad diferenciada del consentimiento comercial. No uses casillas premarcadas, consentimiento condicionado innecesario ni patrones de presión.

## 12. Accesibilidad y responsive

Objetivo de ingeniería: **WCAG 2.2 AA**, sujeto a comprobación del resultado; no anuncies conformidad certificada sin auditoría.

- Landmarks semánticos, enlace para saltar al contenido y orden de foco lógico.
- Todos los flujos de navegación, menú, programa, FAQ y expediente funcionan con teclado. `Escape` cierra un diálogo real, el foco vuelve al control de origen y no queda atrapado fuera de un modal.
- Paneles en flujo cuando sea posible; no uses un modal para cualquier interacción.
- Contraste comprobado: 4.5:1 para texto normal, 3:1 para texto grande y elementos gráficos/interfaz cuando corresponda.
- Objetivos táctiles de al menos 44×44 px como criterio del proyecto; botones principales de 48 px de alto o más.
- No dependas únicamente de hover, color, movimiento o arrastre. El grafo tiene alternativa textual.
- Zoom 200 % y reflow a 320 CSS px sin pérdida de información ni scroll horizontal global. Respeta orientación horizontal y el teclado virtual.
- Prueba anchos de 360, 390, 768, 1024, 1440 y 1920 px, además de una ventana de poca altura. No te limites a reducir todo proporcionalmente.
- En móvil, columnas apiladas, interlineado cómodo y CTA completo sin cortar etiquetas. No escondas las condiciones de duración o certificación para ahorrar espacio.

## 13. Rendimiento y seguridad

### Presupuestos iniciales

- Objetivos de campo en percentil 75: **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1**. Son objetivos por verificar con datos reales, no resultados que puedas afirmar solo con Lighthouse.
- Objetivo Lighthouse móvil en entorno documentado: rendimiento ≥90; accesibilidad y SEO ≥95. Corrige incidencias reales y comunica lo medido; no maquilles las métricas.
- JavaScript inicial crítico, comprimido: objetivo ≤120 kB, excluyendo herramientas interactivas diferidas. Chunk adicional de Three.js/escena: objetivo ≤200 kB comprimidos. Mide ambos; si se exceden, reduce o difiere antes de aceptar el coste.
- Imagen o composición raster inicial: objetivo ≤250 kB con tamaños adecuados; sin vídeo hero obligatorio. La escena nunca bloquea la lectura ni el clic.
- Sin long tasks repetidas durante el seguimiento del cursor. Verifica la suavidad en un equipo o perfil documentado y ofrece degradación de calidad.

Optimiza carga y caché de activos con hash, precarga selectiva, dimensiones reservadas, listeners adecuados y eliminación de código muerto. No precargues módulos no críticos que anulen la hidratación diferida.

No expongas secretos en variables públicas, código fuente, logs o archivos de ejemplo. Valida entradas y usa salida escapada. No insertes HTML no confiable para generar contenido o JSON-LD. Documenta cabeceras de seguridad compatibles con el alojamiento: CSP ajustada a los recursos reales, `X-Content-Type-Options`, política de referencias y permisos mínimos. No declares cabeceras que la plataforma no aplique realmente.

## 14. Comprobaciones y criterios de aceptación

Ejecuta comprobaciones proporcionadas al alcance. Verifica especialmente la conservación del contenido, el seguimiento del cursor y la derivación correcta a Odoo.

- [ ] Compilación y comprobación de tipos pasan con el lockfile entregado.
- [ ] El HTML compilado contiene H1, programa, beneficios, FAQ, enlaces y todas las expresiones SEO, con grafía y acentos normalizados.
- [ ] Matriz de contenido completa para las 21 páginas del briefing ampliado, incluidos los siete pantallazos de las páginas 19-21.
- [ ] No hay importes, cuotas, porcentajes de descuento, tablas de precios ni `Offer` económico en la landing, JSON-LD, metadatos, HTML oculto, datos del cliente o PDF del programa. Los importes históricos existen solo en documentación interna no desplegada.
- [ ] La descarga del programa entrega un PDF real y válido con los siete módulos y 38 lecciones.
- [ ] Se mantienen las seis variables de color, Inter e IBM Plex Sans.
- [ ] El orden de los bloques principales reproduce la secuencia para abogados del PDF.
- [ ] Los enlaces de solicitud/contacto conservan host/path de `CORPORATE_URL`; la información ampliada, condiciones y acceso a la plataforma usan `COURSE_URL`. El programa se descarga desde su archivo local real.
- [ ] Un recorrido sin JavaScript permite leer la oferta, desplegar programa/FAQ y navegar a ambos destinos.
- [ ] Puntero fino: el fondo cambia suavemente y vuelve al centro; el texto y los botones permanecen estables.
- [ ] Movimiento reducido, puntero grueso y WebGL no disponible: contenido completo y fallback correcto. Ningún error de consola por SSR, hidratación o acceso prematuro a `window`.
- [ ] El canvas deja de trabajar cuando el hero no es visible y se liberan sus recursos.
- [ ] El expediente tiene los tres pasos y alternativa textual; sus descargas contienen los datos mostrados.
- [ ] Menú móvil, teclado, foco y barra inferior funcionan sin tapar contenido.
- [ ] No hay peticiones de analítica no esencial antes del consentimiento/configuración aplicables.
- [ ] Un clic de CTA no produce `generate_lead`, mensaje de envío o matrícula falsa.
- [ ] Se comprueba en viewports de móvil y escritorio; no hay solapamientos, texto cortado, desplazamiento horizontal global ni imágenes rotas.
- [ ] Se inspeccionan los resultados renderizados, además del código. Guarda capturas de QA y un resumen de hallazgos para el proyecto, sin convertir capturas en contenido público.
- [ ] Se entrega informe de rendimiento con herramienta, perfil, fecha, tamaño de recursos y límites conocidos.
- [ ] Los importes e IVA históricos están archivados exclusivamente en documentación interna; duración, certificado y COEINF tienen procedencia y estado de verificación. Ninguna afirmación pendiente aparece como verificada.

En Playwright comprueba resultados observables: destinos de CTA, descarga real del PDF del programa, ausencia de precios en contenido público y metadatos, fallback sin JS, programa, recorrido del expediente, navegación por teclado y movimiento reducido. Para el hero combina una comprobación del cambio de transformación tras mover el puntero con inspección visual. No escribas pruebas que solo repliquen funciones triviales ni afirmes que verificaste un navegador que no pudiste ejecutar.

## 15. Entrega y trabajo autónomo

1. Inspecciona el proyecto y las fuentes disponibles. Si un PDF está escaneado, usa OCR y contrasta visualmente las cifras, nombres y colores.
2. Crea primero los datos de contenido y la matriz de trazabilidad.
3. Implementa la landing estática completa y su sistema visual.
4. Añade hero reactivo, expediente, selector, programa y estados accesibles.
5. Integra enlaces, configuración SEO y analítica opcional con sus límites reales.
6. Compila, ejecuta las verificaciones y revisa visualmente. Corrige los problemas encontrados.
7. Entrega el proyecto y un resumen breve en español con lo construido, comprobaciones realizadas y datos comerciales pendientes de verificación.

No interrumpas el trabajo por elecciones rutinarias de estilo. No dejes TODOs en funciones esenciales, botones sin efecto o contenido de relleno. Si falta un secreto, la analítica o una integración futura permanecen desactivadas sin impedir el funcionamiento de la landing.

Prepara `dist/` y documentación para desplegar en un dominio propio con HTTPS, redirección coherente entre www/sin www y caché apropiada. No compres dominios ni modifiques DNS, cuentas o el Odoo existente sin el acceso y autorización correspondientes. Si no se ha proporcionado dominio final, entrega preview verificable con noindex y configuración de producción preparada.

El resultado debe tener riqueza técnica visible en su ejecución: composición de gran calidad, fondo reactivo fluido, demostración interactiva útil, contenido riguroso, excelente lectura móvil y un camino de conversión claro.

## 16. Programa real de referencia: 7 módulos y 38 lecciones

Transcripción normalizada de la ficha pública consultada el 21/10/2026. Vuelve a contrastarla si la ficha ha cambiado. Las siete áreas de marketing del apartado 17 acompañan estos títulos como explicaciones; no reemplazan ni desordenan el temario real.

### Módulo 1. Introducción a OSINT: qué es y para qué sirve

1.1. ¿Qué es OSINT?  
1.2. Ética y legalidad  
1.3. Mentalidad y metodología  
1.4. Tipos de fuentes  
1.5. Seguridad y OpSec  
1.6. El entorno de trabajo

### Módulo 2. El mundo Google

2.1. Google como fuente  
2.2. Mejorar búsqueda  
2.3. Google Dorks  
2.4. Información expuesta  
2.5. Imágenes con Google  
2.6. Alternativas: motores de búsqueda

### Módulo 3. Las redes sociales: un mar de datos

3.1. Redes sociales como fuente  
3.2. Información personal  
3.3. Identidad digital  
3.4. Investigación manual

### Módulo 4. ¿Qué información disponen de nosotros?

4.1. El rastro administrativo: identidad y localización  
4.2. Investigación de sociedades mercantiles  
4.3. Patrimonio móvil y propiedad  
4.4. Portales de transparencia y datos abiertos  
4.5. Cooperación y canales judiciales/policiales

### Módulo 5. DeepWeb: la parte oscura de Internet

5.1. Conceptos básicos  
5.2. El origen y la arquitectura de la invisibilidad  
5.3. Clasificación profesional I: la web opaca y la web privada  
5.4. Clasificación profesional II: redes superpuestas  
5.5. Desmitificación: realidad frente a ficción sensacionalista  
5.6. Aplicaciones en OSINT y seguridad del investigador

### Módulo 6. Herramientas útiles

6.1. Conceptos básicos del ecosistema de herramientas  
6.2. Tipos de herramientas: taxonomía técnica  
6.3. Cómo encontrar herramientas: el arte de la curación  
6.4. Herramientas y su uso I: investigación de identidad  
6.5. Herramientas y su uso II: infraestructura y geolocalización  
6.6. Seguridad, ética y mantenimiento de la caja de herramientas

### Módulo 7. Cómo hacer un informe forense

7.1. Generación de informes: fase de difusión  
7.2. Estructura básica de un informe OSINT  
7.3. Evidencias y datos OSINT: recogida y conservación de la información  
7.4. Redacción y presentación de resultados  
7.5. Recursos y modelos de referencia

**Evaluación adicional:** bloque «Test», separado de las 38 lecciones. En la ficha aparece además «Certificado para titulación de Técnico Tecnólogo», sujeto a las comprobaciones de denominación y alcance ya indicadas.

## 17. Banco obligatorio de contenido del marketing, traducido al español

Este banco forma parte del encargo. No es texto de relleno. Distribuye el contenido público en las secciones indicadas; conserva el contenido estratégico en la documentación interna. Cuando un fragmento esté pendiente de confirmación, conserva su literal en la matriz y aplica la formulación pública prudente del apartado 1.3. No publiques afirmaciones incompatibles entre sí como si estuvieran todas confirmadas. Los datos de precio de este banco son exclusivamente de archivo interno y no se incorporan al contenido ni a los activos públicos. Los nuevos textos del bloque K tienen prioridad en las posiciones que muestran las capturas ampliadas.

### A. Oferta, destinatarios y propuesta de valor | Página 1

**¿Qué ofrece el curso?**

«Una formación 100 % online y práctica para aprender a investigar mediante fuentes abiertas (OSINT), rastrear huellas digitales, localizar información pública, investigar personas y empresas, utilizar herramientas especializadas y elaborar informes, respetando los límites legales y técnicos.»

Dato original de precio, **exclusivamente para documentación interna**: «Precio: aproximadamente 540 € (IVA incluido), con descuentos especiales de lanzamiento para estudiantes y personas desempleadas». No debe trasladarse a la landing ni al PDF público del programa: la instrucción posterior del cliente excluye precios. La ficha del curso es el destino para sus condiciones económicas.

Público objetivo prioritario:

1. Abogados de litigación civil y mercantil.
2. Abogados de derecho digital, privacidad y ciberseguridad.
3. Abogados penalistas y de derecho penal económico.

Propuesta de valor:

1. Metodología práctica de investigación OSINT.
2. Aprendizaje de herramientas especializadas.
3. Materiales formativos de calidad.
4. Capacidad para localizar, analizar y documentar información.
5. Referencia original: «Certificación visada por el COEINF, pendiente de concretar su alcance exacto». Mantener la condición pendiente.

Estrategia comercial, destinada a documentación interna:

1. Contactar directamente con despachos pequeños y medianos.
2. Establecer colaboraciones con colegios profesionales y entidades formativas.
3. Organizar un webinar gratuito con una demostración práctica.
4. Validar el interés y las primeras matrículas antes de invertir en publicidad.

Objetivo original: posicionar «OSINT FORMACIÓN» como una formación especializada y práctica que permita a los abogados ampliar sus capacidades de investigación digital y disponer de nuevas herramientas para su actividad profesional. En la implementación, la marca principal pasa a **iTR+** por instrucción del encargo; «OSINT Formación» se conserva en la matriz como denominación del briefing y puede utilizarse como descriptor, nunca como una empresa distinta.

### B. Elementos de la propuesta de valor | Página 2

| Elemento | Aplicación al proyecto |
| --- | --- |
| Especialización | Técnicas OSINT e investigación en fuentes abiertas. |
| Necesidad que resuelve | Aprender a encontrar, contrastar y documentar información pública. |
| Beneficio | Incorporar una metodología de investigación estructurada a la actividad profesional. |
| Competencias diferenciales | Búsqueda avanzada, investigación de personas y empresas, análisis de fuentes y elaboración de informes. |
| Diferencial | Enfoque práctico, contenidos orientados al sector jurídico y modalidad 100 % online. |

Evidencias concretas facilitadas:

1. Modalidad 100 % online, con sesiones virtuales prácticas.
2. Aproximadamente 20 h teóricas + 40 h prácticas = 60 horas de formación.
3. 7 módulos, 38 lecciones y un test final.

Contenidos que incluyen búsquedas avanzadas, redes sociales, investigación de empresas, herramientas OSINT y elaboración de informes.

Condición expresa del documento: la certificación de COEINF debe presentarse como pendiente de confirmación hasta que se hayan verificado las condiciones exactas.

### C. Datos del curso | Página 3

- Producto: «Técnico especialista en análisis forense en la web».
- Modalidad: «100 % online con sesiones virtuales prácticas».
- Precio indicado en el briefing, solo para archivo interno: base 540 €, IVA incluido; promoción con descuento; precio muy reducido para desempleados y estudiantes. Incluye tutorías, materiales y certificado final. No publicar esos datos económicos en la landing; no inventar importes de las promociones ni plazos de vigencia.
- Metodología: teoría, tutorías, revisión de casos prácticos, cuestionarios y evaluación.
- Certificado descrito en la web en el momento del briefing: «Certificado para titulación de Técnico Tecnólogo»; verificar nombre exacto y alcance.
- Duración calculada por marketing: 60 horas, sumando los tiempos facilitados de los siete módulos y el test; 20 horas teóricas y 40 horas prácticas. Conservar este origen y contrastarlo con el tiempo actual de la plataforma.
- Lecciones: 38 lecciones, varios test y test final. No cuantificar los cuestionarios intermedios sin comprobarlos.
- Público inicial: abogados y pasantes de despachos pequeños y medianos, detectives privados y estudiantes.

### D. Cinco desarrollos temáticos | Página 4

**Formación en técnicas OSINT**

Formación online de 60 horas dirigida a abogados, profesionales del derecho digital e investigadores que quieran aprender a buscar y analizar información en fuentes abiertas. Incluye búsquedas avanzadas, investigación en redes sociales y elaboración de informes, con un enfoque práctico y especializado en herramientas OSINT. La cifra de dedicación se acompaña de la aclaración del apartado 1.3.

**Investigación de empresas y sociedades en fuentes abiertas**

Formación práctica para abogados mercantiles, despachos jurídicos y consultores antifraude que quieran aprender a buscar y verificar información pública sobre empresas. Incluye la consulta de registros públicos, directorios empresariales y herramientas digitales para recopilar y analizar datos útiles en investigaciones profesionales.

**Investigación de identidades digitales y redes sociales**

Formación dirigida a abogados, investigadores y profesionales digitales que quieran localizar y contrastar información pública sobre identidades digitales. Incluye búsquedas avanzadas, análisis de perfiles públicos y verificación de fuentes, con una metodología estructurada que prioriza la fiabilidad de la información y el respeto a la privacidad.

**Búsqueda avanzada de información en internet**

Formación dirigida a profesionales jurídicos, consultores e investigadores que quieran encontrar información específica en internet de manera eficiente. Incluye operadores de búsqueda avanzada, localización de documentos y selección de fuentes fiables, con técnicas aplicables a situaciones profesionales reales.

**Elaboración y documentación de informes OSINT**

Formación dirigida a abogados, investigadores y consultores antifraude que quieran organizar los resultados de una investigación y documentar las fuentes consultadas. Incluye la recopilación de evidencias digitales y la elaboración de informes claros, estructurados y trazables, sin garantizar por sí mismos su validez judicial.

### E. Canales de captación | Página 5 | Documentación interna

| Canal | Acción | Prioridad |
| --- | --- | --- |
| Colegios de la Abogacía | Proponer webinar y solicitar difusión del programa si procede. | Muy alta |
| Despachos penalistas | Contactar con socios y abogados de delitos tecnológicos, fraude y penal económico. | Muy alta |
| Litigación civil/mercantil | Seleccionar despachos con casos de sociedades, conflictos empresariales o evidencia digital. | Muy alta |
| Derecho digital/privacidad | Presentar la utilidad de técnicas OSINT y la documentación de hallazgos. | Alta |
| LinkedIn | Buscar perfiles, publicar contenido útil y contactar de forma personalizada. | Alta |
| Webinar gratuito | Demostrar una técnica del curso con datos simulados y captar solicitudes del programa. | Muy alta |
| Publicidad digital | Probar anuncios de búsqueda después de validar la página y la conversión. | Fase 2 |
| Universidades/centros | Explorar colaboración con formación continua y titulados adecuados. | Media |

Estos canales justifican preparar campañas y variantes de mensaje documentadas. No autorizan el envío automático de mensajes, la extracción masiva de datos personales o la publicación de un evento que aún no existe.

### F. Identidad verbal y visual | Páginas 6-8

- Denominación original del briefing: «OSINT Formación». Marca de este proyecto: **iTR+**.
- Descriptor: «Formación especializada en investigación digital mediante fuentes abiertas».
- Tono: profesional, claro, riguroso y accesible. La comunicación transmite confianza y seguridad con un lenguaje directo y fácil de entender, sin abusar de tecnicismos.
- Vocabulario asociado: investigación digital, fuentes abiertas, OSINT, búsqueda avanzada, análisis de datos, verificación de información, ciberseguridad, metodología y rigor.
- Mensaje clave: aprender a encontrar información pública de manera eficiente, analizar y contrastar los datos obtenidos, documentar los resultados con rigor y aplicar las técnicas OSINT de forma responsable, legal y ética.
- Seis colores: `#0B1F3A`, `#163A63`, `#2563A6`, `#507DA8`, `#6f7e90`, `#ffffff`.
- Tipografías: Inter e IBM Plex Sans.
- Referencias de imagen: entornos de investigación digital, interfaces técnicas, análisis forense y contexto jurídico profesional. Mantén esa relación temática mediante activos de calidad; las capturas sirven como referencia de contenido, no como imágenes finales.

### G. Objetivos y públicos | Página 9

Objetivos de comunicación, a conservar en documentación y reflejar en el diseño:

1. **Visibilidad:** dar a conocer la formación OSINT entre profesionales del sector jurídico y digital.
2. **Autoridad:** transmitir confianza y conocimiento mediante contenidos especializados en investigación digital.
3. **Networking:** crear conexiones con abogados, investigadores, consultores y profesionales de la ciberseguridad.
4. **Contenido de valor:** mostrar técnicas, herramientas y ejemplos prácticos de búsqueda y análisis de información pública.
5. **Conversión:** conseguir visitas a la web, consultas e inscripciones a la formación.

| Público | Necesidad | Mensaje clave | Acción buscada |
| --- | --- | --- | --- |
| Abogados y despachos jurídicos | Obtener información pública útil para los casos. | Investiga y contrasta información con métodos OSINT. | Consultar la formación. |
| Investigadores privados habilitados | Localizar y verificar información digital. | Aprende técnicas de búsqueda y documentación de fuentes. | Informarse e inscribirse. |
| Consultores antifraude | Analizar empresas y detectar información relevante. | Mejora la búsqueda y el análisis de datos públicos. | Solicitar información del curso. |
| Profesionales digitales y peritos informáticos | Ampliar conocimientos de investigación digital. | Incorpora nuevas técnicas de investigación en fuentes abiertas. | Visitar la web y compartir contenidos. |

### H. SEO | Página 10

Las quince expresiones se conservan íntegramente en la tabla del apartado 9.1. Esta referencia evita duplicarlas como una lista pública artificial y obliga a comprobarlas en el contenido generado.

### I. Contenido de la versión general/alumnos | Páginas 11-14

Conserva los siguientes textos, situando el enfoque de alumnos y detectives como contenido secundario dentro de destinatarios y aprendizaje:

**Apertura de la versión general:**

«Descubre el mundo del OSINT y aprende técnicas de investigación digital.»

«Aprende técnicas OSINT para buscar y analizar información en internet.»

«Una formación 100 % online dirigida a estudiantes y personas interesadas en adquirir conocimientos sobre investigación digital, conocer herramientas OSINT y aprender a trabajar con información pública.»

Datos del bloque: «100 % online», «Aprox. 60 horas», «7 módulos», «38 lecciones», con la aclaración de dedicación ya indicada.

**¿Qué aprenderás con esta formación en OSINT?**

- Búsquedas avanzadas en internet.
- Investigar personas y empresas.
- Localizar en redes sociales.
- Herramientas especializadas.
- Analizar y documentar.

**¿A quién va dirigido?**

«Dirigido a abogados y profesionales del derecho interesados en investigación OSINT.»

- **Abogados:** «Refuerza tu estrategia probatoria con información pública relevante».
- **Alumnos:** «Aprende a identificar empresas, titulares y riesgos reputacionales».
- **Detectives:** «Complementa tu formación técnica con investigaciones prácticas aplicadas al ámbito jurídico».

**¿Qué aprenderás?**

«Búsqueda avanzada, investigación digital, herramientas OSINT e informes con enfoque práctico y jurídico.»

- **Módulos:** «7 módulos estructurados para progresar desde lo básico a lo avanzado».
- **Lecciones:** «38 lecciones prácticas con recursos y ejercicios guiados».
- **Evaluación:** «Test final que valida los conocimientos adquiridos».

**Características del curso**

«Formación flexible, soporte técnico y materiales descargables.»

- Modalidad: 100 % online.
- Duración: aproximadamente 60 horas, según la carga estimada del briefing.
- Programa: 7 módulos.
- Módulos: 7 módulos estructurados para progresar desde lo básico a lo avanzado. Este contenido repetido puede compartir el componente del programa sin perder la referencia en la matriz.

**¿Cómo aplicarás el OSINT en tu práctica jurídica?**

«Aplicarás técnicas OSINT en la fase probatoria, la diligencia preprocesal y la investigación documental y digital.»

- **Practicidad inmediata:** «Herramientas y plantillas listas para incorporar a tu práctica diaria».
- **Rigor jurídico:** «Metodología orientada a guardar cadena de custodia y reproducibilidad».
- **Flexibilidad:** «Ritmo compatible con la carga de trabajo profesional».

**Cierre de esa versión:**

«Da un paso más en tu investigación jurídica».

«Descubre nuevas posibilidades para localizar y analizar información pública y amplía tus conocimientos sobre investigación digital.»

CTA: «Quiero más información».

### J. Contenido de la versión para abogados | Páginas 15-18

**Hero:**

«Descubre el potencial del OSINT y aprende técnicas de investigación digital para abogados.»

«Aprende técnicas de investigación digital para localizar y documentar información pública relevante.»

CTA: «Solicitar información del curso».

**¿Cómo puede ayudarte el OSINT en tu práctica jurídica?**

- Investigación de sociedades.
- Localización de información.
- Análisis de identidades.
- Documentación probatoria.

**¿A quién va dirigido?**

- **Litigación civil y mercantil:** «Mejora la prueba documental y la diligencia investigadora en pleitos».
- **Conflictos societarios:** «Analiza estructuras societarias y movimientos patrimoniales».
- **Penal económico:** «Apoya diligencias preliminares con análisis de evidencias abiertas».
- **Derecho digital y privacidad:** «Localiza fuentes públicas preservando cumplimiento normativo».

**Qué aprenderás**

- **Metodología OSINT:** «Enfoque práctico, legal y reproducible para la investigación digital».
- **Búsquedas avanzadas:** «Técnicas de Google y operadores avanzados para resultados precisos».
- **Redes sociales:** «Extracción y análisis de perfiles, hilos y conexiones relevantes». Delimita en contexto a información pública y accesos autorizados.
- **Investigación societaria:** «Fuentes mercantiles, registros y análisis de relaciones empresariales».
- **Seguridad y Deep Web:** «Buenas prácticas para proteger al investigador y preservar pruebas».
- **Herramientas y geolocalización:** «Uso práctico de herramientas open-source y localización geográfica».
- **Elaboración de informes:** «Formatea hallazgos con trazabilidad y estándares útiles para tribunales».

**Características de la formación**

- **Modalidad:** «100 % online, accesible a tu ritmo».
- **Duración:** «60 horas: 20 teóricas y 40 prácticas», conservando la explicación de carga estimada y su discrepancia con el campo de la plataforma.
- **Estructura:** «7 módulos y 38 lecciones con tutorías y evaluación final».
- **Requisitos:** «Sin conocimientos previos; enfoque práctico y legal».

**Certificación: textos originales que deben conservarse como fuente pendiente**

«Certificado expedido y visado por COEINF, en trámite de denominación final.»

«No se presenta como titulación oficial ni garantiza admisión judicial.»

El primer literal se mantiene en la matriz; su publicación como afirmación exige verificar quién expide, quién visa y con qué alcance. Texto público provisional propuesto:

«La formación contempla un certificado final. La referencia a COEINF, la entidad emisora, el visado y su denominación y alcance están pendientes de confirmación. No se presenta como una titulación oficial ni garantiza la admisión judicial de informes.»

**Preguntas frecuentes originales y tratamiento público**

1. **¿Necesito conocimientos previos?** «No. El curso parte de un nivel básico y sube a prácticas avanzadas».
2. **¿Cuál es la duración efectiva?** Original: «60 horas estimadas, combinando teoría y ejercicios prácticos». Acompaña de la distinción entre carga orientativa del briefing y tiempo configurado en la plataforma; no escondas la aclaración en un tooltip.
3. **¿La certificación es oficial?** Original: «Se expide y visará por COEINF; no equivale a título oficial». Conserva el literal en la matriz y sustituye la afirmación pendiente en público por: «No se presenta como título oficial. La referencia a COEINF y las condiciones del certificado están pendientes de confirmación; consulta la información vigente en iTR+».
4. **¿Cómo aplicar lo aprendido?** «Plantillas y formatos para integrar hallazgos en informes jurídicos».

Se pueden añadir preguntas sobre modalidades, acceso, fuentes públicas, dedicación y condiciones económicas, siempre con respuestas verificables y sin suponer permanencia del acceso, derecho a descuentos concretos, financiación o devoluciones no facilitadas.

**Cierre principal:**

«Amplía tus herramientas de investigación jurídica».

CTA: «Solicitar información del curso».

### K. Nuevos pantallazos de abogados | Páginas 19-21 | Prioridad editorial

Estos siete pantallazos amplían la referencia anterior. Conserva su orden y sus textos; el diseño final usa el sistema visual propio de iTR+ definido en este prompt.

**Hero actualizado**

«Investiga más allá de los documentos. Descubre el potencial del OSINT para abogados».

«Aprende técnicas de investigación digital para localizar y documentar información pública relevante.»

CTA principal: «Solicita información del curso». CTA secundario: «Descargar programa».

**¿Qué puede aportar OSINT a tu trabajo como abogado?**

- **Investigación de sociedades:** «Mapea estructuras empresariales y relaciones societarias con fuentes públicas».
- **Localización de información:** «Localiza prensa, actas y datos regulatorios relevantes para el caso».
- **Análisis de identidades:** «Reconstruye huellas digitales y conexiones entre personas y empresas».
- **Documentación probatoria:** «Genera informes estructurados y verificables para estrategias jurídicas».

**¿A quién va dirigido?**

El pantallazo presenta litigación civil y mercantil y conflictos societarios en la primera fila; derecho digital y privacidad y penal económico en la segunda. Conserva ese orden de lectura y las cuatro descripciones del bloque J.

**Qué aprenderás**

Mantiene las siete áreas y sus descripciones del bloque J, en este orden: metodología OSINT; búsquedas avanzadas; redes sociales; investigación societaria; seguridad y Deep Web; herramientas y geolocalización; elaboración de informes. Los dos recortes de esta sección forman una única lista, sin duplicar ni omitir el sexto y séptimo elemento.

**Características de la formación**

- Modalidad: «100 % online, accesible a tu ritmo».
- Duración: «≈60 horas: 20 teóricas y 40 prácticas», con la aclaración de carga orientativa ya especificada.
- Estructura: «7 módulos y 38 lecciones con tutorías y evaluación final».
- Requisitos: «Sin conocimientos previos; enfoque práctico y legal».

**Aplicación profesional**

«Integra la metodología OSINT en investigaciones y diligencias previas.»

«Mejora la obtención de indicios y la documentación de evidencias.»

Desarrolla este bloque después de las características de formación y antes de certificación. Combina estos dos textos con los tres beneficios de aplicación del bloque I, manteniendo todos. Utiliza una fotografía o visual editorial de calidad relacionado con trabajo profesional e investigación; no copies una captura con texto incrustado. No presentes una imagen ilustrativa como fotografía del profesorado real.

## 18. Documentación oficial para contrastar la implementación

Estas referencias explican las decisiones técnicas; consulta sus versiones vigentes al implementar. No son contenido comercial que deba volcarse en la landing.

- Astro, arquitectura de islas: https://docs.astro.build/es/concepts/islands/
- Astro, estilos e integración de Tailwind: https://docs.astro.build/es/guides/styling/
- Motion, `useSpring`: https://motion.dev/docs/react-use-spring
- Motion, seguimiento del puntero con spring: https://motion.dev/examples/react-follow-pointer-with-spring
- Google, datos estructurados de cursos: https://developers.google.com/search/docs/appearance/structured-data/course?hl=es
- Google, directrices de datos estructurados: https://developers.google.com/search/docs/appearance/structured-data/sd-policies?hl=es
- Google, limitaciones de resultados enriquecidos FAQ: https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Web Vitals, umbrales y distinción entre medición de campo y laboratorio: https://web.dev/articles/vitals
- AEPD, guía sobre el uso de las cookies: https://www.aepd.es/guias/guia-cookies.pdf
- API de Odoo: consulta la documentación oficial de la versión real y del plan de la instalación antes de proponer cualquier integración de servidor.

**Empieza por inspeccionar el entorno y las fuentes, y desarrolla el resultado completo siguiendo este contrato.**
