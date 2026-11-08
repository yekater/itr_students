import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:4324';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(BASE + '/');
try { await page.getByRole('button', { name: 'Rechazar no esenciales' }).click({ timeout: 3000 }); } catch {}
await page.waitForTimeout(600);

const clip = { x: 690, y: 160, width: 750, height: 640 };

const layers = await page.evaluate(() => {
  const svg = document.querySelector('.hero-motifs');
  const fig = document.querySelector('.hero-people-figure');
  return {
    svgZ: getComputedStyle(svg).zIndex,
    figZ: getComputedStyle(fig).zIndex,
    iso: getComputedStyle(document.querySelector('.hero-people')).isolation,
    motifs: [...document.querySelectorAll('[data-motif]')].map(n => n.getAttribute('data-motif')),
  };
});
console.log(JSON.stringify(layers));

// reposo
await page.screenshot({ path: 'docs/hero-svglayer-1440-reposo.png', clip });

async function hoverMotif(name, fx, fy, shot) {
  const box = await page.locator(`[data-motif="${name}"]`).boundingBox();
  await page.mouse.move(box.x + box.width * fx, box.y + box.height * fy, { steps: 8 });
  await page.waitForTimeout(260);
  await page.screenshot({ path: shot, clip });
  await page.mouse.move(1210, 780, { steps: 6 });
  await page.waitForTimeout(500);
}

await hoverMotif('document', 0.4, 0.35, 'docs/hero-svglayer-1440-doc-encendido.png');
await hoverMotif('fingerprint', 0.5, 0.28, 'docs/hero-svglayer-1440-huella-encendida.png');
await hoverMotif('network', 0.55, 0.4, 'docs/hero-svglayer-1440-grafo-encendido.png');

// hover dentro de la zona de figuras (debe apuntar al motivo que esté detrás de ahí, sin glow sobre rostros)
await page.screenshot({ path: 'docs/tmp.png', clip: { x: 0, y: 0, width: 10, height: 10 } });

// vistas generales
for (const width of [1024, 768, 390]) {
  const c2 = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
  const p2 = await c2.newPage();
  await p2.goto(BASE + '/');
  try { await p2.getByRole('button', { name: 'Rechazar no esenciales' }).click({ timeout: 3000 }); } catch {}
  await p2.waitForTimeout(500);
  await p2.screenshot({ path: `docs/hero-svglayer-${width}.png`, clip: { x: 0, y: 90, width, height: Math.min(700, width * 0.9) } });
  await c2.close();
}

await browser.close();
console.log('capturas listas');
