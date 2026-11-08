// QA visual de la escena viva del hero.
// 1) Tres capturas en reposo (0, 7, 14 s) para verificar movimiento sin cursor.
// 2) Capturas con cursor sobre cada tarjeta y la huella (paralaje + brillo).
// 3) Vista 1440, 768 y 390.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const dist = path.join(root, 'dist');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json' };

const server = createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url.endsWith('/')) url += 'index.html';
  let file = path.join(dist, url);
  if (!existsSync(file)) file = path.join(dist, url.replace(/\/$/, ''), 'index.html');
  if (!existsSync(file) && !path.extname(url)) file = path.join(dist, 'index.html');
  if (!existsSync(file)) { res.writeHead(404); res.end('no'); return; }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});

await new Promise(r => server.listen(4477, r));
const browser = await chromium.launch();
const out = path.join('docs');

// ---- Reposo: movimiento sin cursor (1920x1080) ----
{
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://127.0.0.1:4477/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(out, 'hero-live-idle-a.png'), clip: { x: 960, y: 100, width: 960, height: 780 } });
  await page.waitForTimeout(7000);
  await page.screenshot({ path: path.join(out, 'hero-live-idle-b.png'), clip: { x: 960, y: 100, width: 960, height: 780 } });
  await page.waitForTimeout(7000);
  await page.screenshot({ path: path.join(out, 'hero-live-idle-c.png'), clip: { x: 960, y: 100, width: 960, height: 780 } });
  await page.close();
}

// ---- Cursor sobre cada tarjeta y la huella (1440x900) ----
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:4477/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const scene = await page.locator('[data-hero-scene]').boundingBox();
  const clip = { x: scene.x - 60, y: Math.max(0, scene.y - 40), width: scene.width + 120, height: scene.height + 80 };
  const targets = [
    ['profile', .09, .19], ['shield', .91, .27], ['globe', .16, .78], ['group', .88, .8], ['fp', .53, .33],
  ];
  for (const [name, fx, fy] of targets) {
    await page.mouse.move(scene.x, scene.y - 80);
    await page.waitForTimeout(600);
    await page.mouse.move(scene.x + scene.width * fx, scene.y + scene.height * fy, { steps: 12 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(out, `hero-live-hover-${name}.png`), clip });
  }
  // neutralidad tras retirar el cursor
  await page.mouse.move(10, 500);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(out, 'hero-live-hover-neutral.png'), clip });
  await page.close();
}

// ---- Responsive ----
for (const [w, h, name] of [[390, 844, '390'], [768, 900, '768']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://127.0.0.1:4477/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(out, `hero-live-${name}.png`), fullPage: false });
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(name, 'scroll horizontal px:', scroll);
  await page.close();
}

await browser.close();
server.close();
console.log('QA listos');
