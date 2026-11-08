# Decorado de investigación del hero: capas SVG + iluminación por hover

Fecha: 26 de octubre de 2026.

## Qué es

El lado derecho del hero mantiene el recorte transparente de las cinco personas y, detrás,
tres motivos de investigación dibujados como SVG inline: documento, huella y grafo. Al pasar
el cursor sobre cada motivo, sus líneas se iluminan con un brillo sutil; el resto del tiempo
quedan en reposo, legibles sin interacción.

Esta versión sustituye el sistema anterior de partículas (Three.js + shaders): la solución es
SVG inline y transiciones CSS; no hay canvas, ni render continuo, ni JavaScript para el efecto.

## Estructura

- `src/components/hero/HeroExperience.astro`: un único SVG `.hero-motifs` (viewBox 0 0 1400 745,
  en coordenadas del recorte) con los grupos `data-motif="document"`, `"fingerprint"` y
  `"network"`, y la envoltura `.hero-people-figure` con la imagen del recorte.
- `src/styles/global.css` (bloque «Motivos de investigación del hero»): capas, trazos,
  detección del cursor y transiciones.

## Orden de capas (obligatorio)

`.hero-people` crea un contexto de apilamiento local (`position: relative; isolation: isolate`):

| Capa | Contenido |
| --- | --- |
| Fondo de página | Azul profundo del hero, sin rectángulo añadido. |
| `z-index: 1` | SVG con los tres motivos. |
| `z-index: 2` | Recorte transparente de las personas (WebP con alpha real). |

Toda línea que pase geométricamente por un rostro, traje, mano, carpeta o portátil queda
tapada por el recorte. Los motivos sobresalen por la zona superior y lateral libre, como en
la referencia; el SVG tiene `overflow: visible` y el contenedor no recorta la parte superior.

## Decorado: tres imágenes propias detrás de las personas

Los tres motivos son imágenes PNG aportadas (512×512, azul degradado), incrustadas en el
SVG `.hero-motifs` con `<image>` y sin solaparse entre sí:

| Motivo | Archivo | Caja en el viewBox 1400×745 |
| --- | --- | --- |
| Documento con descarga | `public/images/documento-descarga-itr.png` (30 KB) | `translate(36 -110)` · 360×360, detrás de la persona izquierda |
| Huella | `public/images/huella-itr.png` (50 KB) | `translate(452 -138) scale(1.086)` · ≈556×556, detrás de las cabezas centrales |
| Internet (ventana + globo) | `public/images/internet-ventana-itr.png` (21 KB) | `translate(1032 -118)` · 360×360, detrás de las personas de la derecha |

Los grupos SVG del documento y del grafo (trazos) y la huella de curvas se retiraron;
las zonas de detección son círculos invisibles (`.motif-hit-fill`, `pointer-events: fill`).

## Animación (CSS, sin JavaScript)

- **Reposo:** flotación suave e infinita (`motif-float`, 7 s, `alternate`), desfasada por
  motivo (0 / −2,4 s / −4,8 s); elevación de ≈10 px CSS y escala 1,015. Opacidad del grupo 0,6.
- **Hover** (`@media (hover: hover) and (pointer: fine)`): la animación **cambia** de
  flotación a pulso de brillo (`motif-glow`, 2,4 s infinito): brillo 1,14↔1,3 con
  `drop-shadow` de 10↔20 px, con leve elevación. Solo se anima el motivo bajo el cursor.
- `prefers-reduced-motion: reduce`: sin animación ni transiciones (composición estática).
- Cada motivo se ilumina por separado; no se filtra el retrato ni se mueve nada.
- `pointer-events: none` en el SVG y en la imagen: los CTA y la columna izquierda no se ven
  afectados; el hover queda en los trazos interactivos.
- `prefers-reduced-motion: reduce`: sin transiciones (estado estático instantáneo).
- En móvil/puntero grueso no hay hover: se ve la versión de reposo, completa y legible.

## Composición (coordenadas en el viewBox 1400×745)

Ver la tabla de la sección «Decorado»: documento a la izquierda, huella al centro y
ventana de internet a la derecha, cada uno detrás de las personas correspondientes y sin
solaparse entre sí.

## Balance de la composición (26/10, segunda ronda)

- **Fila de ventajas antes de los CTA** (`ul.hero-perks`): PDF por módulo, Foro de
  consultas y Acceso permanente con iconos de línea (20 px) y texto ~16 px, sin
  tarjetas ni marcos; 30 px tras el párrafo y 26 px antes de los botones, para que
  ventajas y CTA se lean como un grupo (NN/g). Los datos proceden de
  `src/data/course-format.ts` (materials/support/access).
- **Composición derecha:** columnas 52/48 con `.hero-people` al 104 % (−3 % margen
  derecho) y `align-self: end` — un ≈11 % más grande y con el borde inferior cerca del
  nivel de los botones. En ≥1700 px se conservan las proporciones 55/45 y la imagen
  sube al 115 % (el contenedor de 1240 deja ≈360 px libres a cada lado, sin recortes).
  En ≤800 px vuelve a 100 %/auto (columna única, centrada a 560 px).
- **Banda inferior compacta:** `min-height: 88svh` retirada del hero (no retiene
  altura), `padding-bottom: 48px`, y la banda de cifras a 22 px del bloque superior con
  20 px de aire interno. El hero termina ≈804 px a 1440 sin vacío muerto.
- El tamaño del H1 no cambia; en 1920 el ajuste a 5 líneas es del diseño base (tope de
  72 px en un contenedor de 1240), no de esta ronda.

## Historia

- El encargo previo de partículas (Three.js + GSAP) quedó sustituido por este SVG/CSS:
  retirados `scene.ts`, `shaders.ts`, `particles.ts`, `config.ts`, el script de arranque y
  las dependencias `three`, `@types/three` y `gsap` (comprobado que ninguna otra sección las usaba).
- El recorte transparente sigue generado por `scripts/cutout.mjs`
  (`@imgly/background-removal-node` sigue instalado como devDependency).

## Comprobaciones ejecutadas

- `astro check`: 0 errores/avisos; `astro build`: 5 páginas.
- Playwright: tests del hero y de las páginas legales pasan; se conservan los 5 fallos
  preexistentes ajenos a este bloque (tabnav/«Investigar mejor», expediente, planificador,
  overflow 320 px y mayúscula del `<title>` en el test SEO).
- Hover real por motivo con Playwright: solo el motivo bajo el cursor se ilumina
  (`docs/hero-svglayer-1440-doc-encendido.png`, `...huella-encendida.png`, `...grafo-encendido.png`),
  reposo en `docs/hero-svglayer-1440-reposo.png`; vistas 1024/768/390 en `docs/hero-svglayer-*.png`.
- Capas verificadas en vivo: `z-index` 1 (SVG) y 2 (personas) dentro de `isolation: isolate`.
