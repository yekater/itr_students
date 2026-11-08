# iTR+ — Curso de investigación digital para estudiantes

Landing page de la formación **iTR+ de investigación digital para estudiantes**, creada con [Astro](https://astro.build), React y TypeScript.

- **100 % estática**: todo el contenido comercial esencial (hero, programa, FAQ, salidas laborales) funciona sin JavaScript.
- **Multilingüe**: ES / CA / EN con detección del idioma del navegador en `/`.
- **Datos centralizados**: el contenido vive en `src/data/` en lugar de estar repartido por los componentes.
- **PDF real**: el programa descargable con 7 módulos y 38 lecciones se genera automáticamente en el build desde los mismos datos, siempre sincronizado con la web.
- **Demo interactiva**: un caso simulado de investigación en fuentes abiertas (localizar, contrastar, concluir, documentar) funciona como isla React accesible.
- **Sin rastreadores**: no hay analítica ni cookies de marketing activas sin consentimiento; el banner cumple criterios AEPD.

## Requisitos

| Herramienta | Versión recomendada |
|---|---|
| [Node.js](https://nodejs.org) | 20 o superior (probado con Node 24) |
| npm | incluido con Node |
| Navegador | para desarrollo y pruebas, cualquiera moderno |

No se necesitan credenciales, claves ni variables de entorno para arrancar en local.

## Instalación y arranque

```bash
# 1. Clonar el repositorio
git clone https://github.com/yekater/itr_students.git
cd itr_students

# 2. Instalar dependencias
npm ci        # o npm install si npm ci falla

# 3. Servidor de desarrollo (http://localhost:4321)
npm run dev
```

Con el servidor de desarrollo en marcha podrás abrir:

- `/` — versión en español
- `/ca/` — versión en catalán
- `/en/` — versión en inglés
- `/aviso-legal/`, `/politica-de-privacidad/`, `/politica-de-cookies/`, `/accesibilidad/` — páginas legales

### Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el PDF del programa y compila la web en `dist/` |
| `npm run preview` | Sirve la build de `dist/` (por defecto en `http://localhost:4321`) |
| `npm run check` | Comprobación de tipos de TypeScript y Astro |
| `npm test` | Test E2E con Playwright + auditoría de accesibilidad con axe (necesita Chromium; ver más abajo) |
| `npm run audit` | Auditoría Lighthouse (requiere un preview activo en el puerto 4321) |
| `node scripts/assets.mjs` | Regenera la imagen social |

## Tests

Los tests end-to-end están escritos con [@playwright/test](https://playwright.dev) y cubren:

- Navegación completa por la página (mapa de IDs, FAQ sin JavaScript, descarga del PDF)
- Paridad de contenido entre los tres idiomas (planificador, FAQ, competencias, cookies)
- La demo de investigación interactiva de principio a fin
- Banner de cookies, responsive sin overflow horizontal y auditoría de accesibilidad axe
- Vista responsive hasta 320 px y carga diferida de la hero en las resoluciones principales

```bash
npx playwright install chromium   # la primera vez
npx playwright test               # ejecuta la suite (29 tests)
```

Por defecto la configuración arranca un servidor de preview propio en el puerto **4322**; si tienes algo en ese puerto, ciérralo antes.

## Estructura del proyecto

```
src/
├── components/     # Componentes Astro (hero, FAQ, planner, demo...)
│   ├── hero/       # HeroSection, escena de vídeo y script de reproducción
│   └── investigation-demo/  # Demo interactiva (React)
├── data/           # TODO el contenido: site.ts, locales.ts, curriculum.ts...
├── pages/          # index.astro (ES), [locale]/ (CA/EN) y páginas legales
├── lib/            # Utilidades (enlaces Odoo, analítica, consentimiento)
└── styles/         # Estilos globales y de la hero

public/             # Vídeos, imágenes, fuentes y PDF generado
scripts/            # Generador del PDF (generate-program.ts) y utilidades
tests/              # Suite E2E con Playwright
docs/               # Documentación interna (briefing, QA, despliegue)
```

### Dónde editar el contenido

| Quieres cambiar… | Mira en |
|---|---|
| Datos generales, FAQ, beneficios, duración | `src/data/site.ts` |
| Traducciones y textos de CA/EN | `src/data/locales.ts` |
| Módulos, lecciones y programa | `src/data/curriculum.ts` |
| Bloques "dirigido a" y ejemplos de especialidad | `src/data/audience-copy.ts`, `src/data/services.ts` |
| Páginas legales | `src/pages/[locale]/[...slug].astro`, `src/data/legal.ts` |
| Enlaces externos/Odoo | `src/lib/links.ts` |

El import es directo: la web consume esos objetos; no hay que buscar textos escondidos en componentes más allá de casos puntuales (hero, cabecera).

## Despliegue

`dist/` es el único directorio que debe publicarse. Copia `.env.example` a `.env` y configura el dominio real antes de desplegar a producción; el preview queda `noindex` por defecto para evitar indexación accidental.

La documentación detallada del proyecto está en `docs/`:

- `docs/despliegue.md` — cómo desplegar
- `docs/medicion-y-odoo.md` — integración con el backend Odoo
- `docs/trazabilidad-contenido.md` — decisiones de contenido
- `docs/fuentes-y-verificaciones.md` — fuentes de las estadísticas publicadas

## Notas importantes

- **Identificadores técnicos que se mantienen a propósito**: los UTMs (`landing_osint_abogados`, `osint_juridico`), el nombre de archivo del PDF y las URLs de `perinfor.odoo.com` provienen del enrolamiento original; cambiarlos rompería el seguimiento de campañas.
- **La duración declarada del curso es de 30 h de carga formativa estimada**. En algunas páginas aparece además la nota «El tiempo configurado actualmente en la plataforma es de 15 h 10 min» — es el tiempo configurado en la plataforma de matrícula (Odoo), distinto de la estimación de estudio propio de la web.
- No hay números de teléfono, formularios ni servicios externos; la única vía de contacto es el enlace a la ficha del curso en Odoo.

## Licencia

Contenido y materiales propiedad de iTR+. Uso interno / del proyecto.
