import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let url = (req.url ?? '/').split('?')[0];
  if (url.endsWith('/')) url += 'index.html';
  let file = path.join(dist, url);
  if (!existsSync(file) && !path.extname(url)) file = path.join(dist, 'index.html');
  if (!existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': mime[path.extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});

await new Promise(resolve => server.listen(4499, resolve));
const browser = await chromium.launch();

const idle = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: 'docs', size: { width: 1440, height: 900 } } });
const idlePage = await idle.newPage();
await idlePage.goto('http://127.0.0.1:4499/', { waitUntil: 'networkidle' });
await idlePage.waitForTimeout(16000);
await idle.close();

const hover = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: 'docs', size: { width: 1440, height: 900 } } });
const hoverPage = await hover.newPage();
await hoverPage.goto('http://127.0.0.1:4499/', { waitUntil: 'networkidle' });
const scene = await hoverPage.locator('[data-hero-scene]').boundingBox();
await hoverPage.mouse.move(scene.x + scene.width * .88, scene.y + scene.height * .8, { steps: 30 });
await hoverPage.waitForTimeout(4000);
await hover.close();

await browser.close();
server.close();
console.log('video recordings written to docs/');
