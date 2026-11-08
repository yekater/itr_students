// Genera preview/iTR-preview.html: vista autónoma para revisión sin instalación.
// Regenerada desde dist tras la compilación; sin recursos remotos ni rastreadores.
import {build} from 'vite';
import {readFileSync,writeFileSync,unlinkSync,mkdirSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';

const ISLANDS = {
  EvidenceCase: '../src/components/EvidenceCase',
  Audience: '../src/components/Audience',
  Planner: '../src/components/Planner',
};

const entry = resolve('scripts/offline-entry.tsx');

writeFileSync(entry, 'import React from \'react\';import {hydrateRoot} from \'react-dom/client\';\n' +
  Object.entries(ISLANDS).map(([name, path]) => `import ${name} from '${path}';`).join('\n') +
  '\nconst registry={' + Object.keys(ISLANDS).join(',') + '};\n' +
  'document.querySelectorAll(\'astro-island\').forEach(el=>{const name=el.getAttribute(\'component-export-name\');if(name&&registry[name])hydrateRoot(el,React.createElement(registry[name]));});\n');

let bundle;
try {
  const result = await build({
    configFile: false,
    define: {'process.env.NODE_ENV': JSON.stringify('production')},
    logLevel: 'error',
    build: {write: false, minify: true, lib: {entry, formats: ['iife'], name: 'ItrOffline'}},
    esbuild: {jsx: 'automatic'},
  });
  const files = Array.isArray(result) ? result : [result];
  bundle = files.flatMap(f => f.output).filter(o => o.type === 'chunk').map(o => o.code).join('\n');
} finally {
  unlinkSync(entry);
}

const MIME = path => /\.woff2$/i.test(path) ? 'font/woff2'
  : /\.woff$/i.test(path) ? 'font/woff'
  : /\.svg$/i.test(path) ? 'image/svg+xml'
  : /\.png$/i.test(path) ? 'image/png'
  : /\.jpe?g$/i.test(path) ? 'image/jpeg'
  : /\.pdf$/i.test(path) ? 'application/pdf'
  : 'application/octet-stream';

const dataUri = path => `data:${MIME(path)};base64,${readFileSync(path).toString('base64')}`;

let html = readFileSync('dist/index.html', 'utf8');

html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

html = html.replace(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g, (_, url) => {
  let css = readFileSync(resolve('dist' + url), 'utf8');
  css = css.replace(/url\((["']?)([^)"']+)\1\)/g, (all, _q, raw) => {
    if (raw.startsWith('data:') || raw.startsWith('http')) return all;
    const p = raw.startsWith('/') ? resolve('dist' + raw) : resolve('dist/_astro', raw);
    if (!existsSync(p)) return all;
    return `url(${dataUri(p)})`;
  });
  return `<style>${css}</style>`;
});

html = html.replaceAll('/downloads/programa-investigacion-digital-abogados.pdf', dataUri('dist/downloads/programa-investigacion-digital-abogados.pdf'));

html = html.replace(/<(img|source)\b[^>]*(?:srcset|src)="(?!\s*data:)([^"]+)"(\/?>)?/g, (tag, _el, url) => {
  const file = url.split(' ')[0].split(',')[0];
  const local = file.startsWith('/') ? resolve('dist' + file) : resolve('dist/_astro', file);
  if (existsSync(local)) return tag.replace(url, dataUri(local));
  return tag;
});

mkdirSync('preview', {recursive: true});
writeFileSync('preview/iTR-preview.html',
  html.replace('</body>', `<script>${bundle.replaceAll('</script', '<\\/script')}</script></body>`));
console.log('preview/iTR-preview.html generado');
