import fs from 'node:fs';
import path from 'node:path';
const count = { attr: 0, jsq: 0, css: 0, double: 0 };
const exts = new Set(['.html', '.css', '.js']);
const walk = d => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.has(path.extname(f))) {
      const s = fs.readFileSync(p, 'utf8');
      count.attr += (s.match(/="\/(?!=|\/)/g) || []).length;
      count.jsq += (s.match(/\('\/(?=|\/)/g) || []).length;
      count.double += (s.match(/="\/\//g) || []).length;
      count.css += (s.match(/url\(\//g) || []).length;
    }
  }
};
walk('dist');
console.log(count);
