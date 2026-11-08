import fs from 'node:fs';
import path from 'node:path';

const base = '/itr_students';
let changed = 0;
const exts = new Set(['.html', '.css', '.js', '.txt', '.xml', '.svg', '.webmanifest', '.json']);
const walk = d => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) { walk(p); continue; }
    if (!exts.has(path.extname(f))) continue;
    let s = fs.readFileSync(p, 'utf8');
    const before = s;
    s = s.replaceAll('="\/', '="' + base + '/').replaceAll('url(\/', 'url(' + base + '/').replaceAll("('\/", "('" + base + '/');
    // revertir los casos que empiezan por // (protocolo relativo) o que ya llevan el base
    s = s.replaceAll('="' + base + '//', '="//').replaceAll('(' + base + '//', '(//').replaceAll("'" + base + "//", "'//");
    s = s.replaceAll(base + base, base);
    // Cada entrada adicional de srcset también necesita el prefijo.
    s = s.replace(/(,\s*)\/(?!\/|itr_students(?:\/|"))/g, '$1' + base + '/');
    // Las URL canónicas y el sitemap se generan desde el origen del sitio.
    s = s.replace(/https:\/\/yekater\.github\.io\/(?!itr_students(?:\/|["<]))/g, 'https://yekater.github.io' + base + '/');
    if (s !== before) { fs.writeFileSync(p, s); changed++; }
  }
};
walk('dist');
console.log('rewritten files:', changed);
