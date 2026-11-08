import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const dist = path.join(root, 'dist');
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

await new Promise(resolve => server.listen(4488, resolve));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));
await page.goto('http://127.0.0.1:4488/', { waitUntil: 'networkidle' });
const before = await page.locator('[data-card="profile"]').getAttribute('transform');
await page.waitForTimeout(8000);
const after = await page.locator('[data-card="profile"]').getAttribute('transform');
const scene = await page.locator('[data-hero-scene]').boundingBox();
const buttonCount = await page.locator('[data-scene-toggle]').count();
const scroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log(JSON.stringify({ idleChanged: before !== after, pauseButtonCount: buttonCount, horizontalScroll: scroll, scene, errors }, null, 2));
await browser.close();
server.close();
