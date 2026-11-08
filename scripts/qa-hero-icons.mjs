import { chromium } from 'playwright';

const BASE = 'http://localhost:4324';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(BASE + '/');
try { await page.getByRole('button', { name: 'Rechazar no esenciales' }).click({ timeout: 3000 }); } catch {}
await page.waitForTimeout(400);
const clip = { x: 690, y: 160, width: 750, height: 640 };

// Hover en el documento: dos fotos del pulso (brillo cambiando) = animación viva
const doc = await page.locator('[data-motif="document"]').boundingBox();
await page.mouse.move(doc.x + doc.width * 0.5, doc.y + doc.height * 0.5, { steps: 6 });
await page.waitForTimeout(300);
await page.screenshot({ path: 'docs/hero-icons-1440-doc-glow-a.png', clip });
await page.waitForTimeout(1200);
await page.screenshot({ path: 'docs/hero-icons-1440-doc-glow-b.png', clip });
await page.mouse.move(1250, 800, { steps: 6 });
await page.waitForTimeout(600);

// Flotación en reposo: dos fotos separadas para evidenciar el movimiento lento
await page.screenshot({ path: 'docs/hero-icons-1440-flota-a.png', clip });
await page.waitForTimeout(2600);
await page.screenshot({ path: 'docs/hero-icons-1440-flota-b.png', clip });

// Hover de huella e internet
const fp = await page.locator('[data-motif="fingerprint"]').boundingBox();
await page.mouse.move(fp.x + fp.width * 0.5, fp.y + fp.height * 0.35, { steps: 6 });
await page.waitForTimeout(400);
await page.screenshot({ path: 'docs/hero-svglayer-1440-huella-encendida.png', clip });
await page.mouse.move(1250, 800, { steps: 6 });
await page.waitForTimeout(600);
const nw = await page.locator('[data-motif="network"]').boundingBox();
await page.mouse.move(nw.x + nw.width * 0.5, nw.y + nw.height * 0.45, { steps: 6 });
await page.waitForTimeout(400);
await page.screenshot({ path: 'docs/hero-svglayer-1440-grafo-encendido.png', clip });

await browser.close();
console.log('capturas de animación listas');
