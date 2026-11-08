import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INPUT = path.join('c:', 'Users', 'bcnca', 'Downloads', 'Gemini_Generated_Image_nci5n3nci5n3nci5.jpg');
const OUTPUT = path.join(root, 'public', 'images', 'hero', 'equipo-cuatro-recorte.webp');
const WIDTH = 1200;

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

async function cutout(input, output, width) {
  const blob = await removeBackground(new URL('file:///' + input.replace(/\\/g, '/')).href, {
    debug: false,
    output: { format: 'image/png', quality: 1 },
  });
  const { data, info } = await sharp(Buffer.from(await blob.arrayBuffer())).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const original = Buffer.from(data);
  console.log('segmentado', w, 'x', h);
  const idx = (x, y) => (y * w + x) * channels;

  // Coordenadas medidas sobre vista 600x335 del marco completo.
  const S = 2752 / 600;
  const mode = new Uint8Array(w * h);        // 0 nada, 1 borrar, 2 reparar
  const mark = (x, y, m) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const p = y * w + x;
    if (data[p * channels + 3] === 0) return;
    if (mode[p] !== 1) mode[p] = m;
  };
  const rectFull = (x0, y0, x1, y1) => {
    for (let y = Math.round(y0 * S); y < y1 * S; y++) for (let x = Math.round(x0 * S); x < x1 * S; x++) mark(x, y, 1);
  };
  const rectIf = (x0, y0, x1, y1, test, m) => {
    for (let y = Math.round(y0 * S); y < y1 * S; y++) for (let x = Math.round(x0 * S); x < x1 * S; x++) {
      const i = idx(x, y);
      if (test(data[i], data[i + 1], data[i + 2])) mark(x, y, m);
    }
  };

  // A) Figura fantasma, red y resto de tarjeta del globo a la izquierda del
  //    primer hombre (region sin gente, verificada sobre el overlay).
  rectFull(0, 85, 132, 335);
  rectFull(115, 190, 195, 275);
  // B) Tarjetas horneadas: se recolorean con la mediana del vecindario
  //    (reparacion, no borrado) para no abrir huecos en la ropa.
  const notSkin = (r, g, b) => !(r - b > 12 && lum(r, g, b) > 60);
  rectIf(50, 200, 195, 328, notSkin, 2);
  rectIf(450, 192, 600, 322, notSkin, 2);
  // Icono y franjas blancas de la tarjeta de grupo (trajes/fondo oscuros);
  // la cara es calida y queda fuera por el filtro notSkin.
  rectIf(452, 246, 578, 308, (r, g, b) => lum(r, g, b) > 140 && notSkin(r, g, b), 2);

  // C) Estructuras finas brillantes/cian (lineas de red, iconos, franjas,
  //    marcos) en todo el recorte: pixel cian-brillante cuya mediana local
  //    es claramente mas oscura. Grandes zonas (camisas, sombras) quedan.
  const STEP = 4, MEDR = 3; // mediana en rejilla reducida, radio 3 => ~13 px
  const gw = Math.ceil(w / STEP), gh = Math.ceil(h / STEP);
  const grid = new Float32Array(gw * gh);
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    const x = Math.min(w - 1, gx * STEP), y = Math.min(h - 1, gy * STEP);
    const i = idx(x, y);
    grid[gy * gw + gx] = data[i + 3] === 0 ? -1 : lum(data[i], data[i + 1], data[i + 2]);
  }
  const medAt = (gx, gy) => {
    const vals = [];
    for (let dy = -MEDR; dy <= MEDR; dy++) for (let dx = -MEDR; dx <= MEDR; dx++) {
      const nx = gx + dx, ny = gy + dy;
      if (nx < 0 || nx >= gw || ny < 0 || ny >= gh) continue;
      const v = grid[ny * gw + nx];
      if (v >= 0) vals.push(v);
    }
    if (vals.length < 8) return -1;
    vals.sort((a, b) => a - b);
    return vals[vals.length >> 1];
  };
  let thinMarked = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x, i = p * channels;
      if (data[i + 3] === 0) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (!(b - r > 50 && lum(r, g, b) > 115)) continue;
      const m = medAt(Math.floor(x / STEP), Math.floor(y / STEP));
      if (m >= 0 && m < lum(r, g, b) - 35) { mark(x, y, 2); thinMarked++; }
    }
  }

  console.log('estructuras finas marcadas', thinMarked);

  // C) Lineas tenues sobre el pelo/hombro derecho de la mujer: prueba mas
  //    laxa en esa zona; el rostro queda protegido en el paso siguiente.
  const medCache = new Map();
  const medOf = (x, y) => {
    const key = Math.floor(x / STEP) * 10000 + Math.floor(y / STEP);
    let v = medCache.get(key);
    if (v === undefined) { v = medAt(Math.floor(x / STEP), Math.floor(y / STEP)); medCache.set(key, v); }
    return v;
  };
  for (let y = Math.round(140 * S); y < 240 * S; y++) {
    for (let x = Math.round(490 * S); x < 572 * S; x++) {
      const p = y * w + x, i = p * channels;
      if (data[i + 3] === 0) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (!(b - r > 32 && lum(r, g, b) > 110)) continue;
      const m = medOf(x, y);
      if (m >= 0 && m < lum(r, g, b) - 28) { mark(x, y, 2); thinMarked++; }
    }
  }

  // D) Proteccion de rostros: dentro de estas cajas solo se elimina un
  //    destello muy cian; la luz de contorno azulada del estilo se conserva.
  const faces = [
    [140, 50, 220, 155], [230, 145, 325, 255], [355, 85, 445, 205], [465, 140, 550, 255],
  ];  for (const [fx0, fy0, fx1, fy1] of faces) {
    for (let y = Math.round(fy0 * S); y < fy1 * S; y++) for (let x = Math.round(fx0 * S); x < fx1 * S; x++) {
      const p = y * w + x;
      if (mode[p] !== 2) continue;
      const i = p * channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (!(b - r > 70 && lum(r, g, b) > 150)) mode[p] = 0;
    }
  }

  // Reconstruccion: mediana del vecindario sin marcar y opaco. Los píxeles
  // "borrar" sin apoyo vuelven a transparente; los "reparar" sin apoyo se
  // conservan tal cual (menor daño que un agujero en la ropa).
  const win = 5;
  let erased = 0, repaired = 0, kept = 0;
  const snapshot = Buffer.from(data);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      const m = mode[p];
      if (!m) continue;
      const rs = [], gs = [], bs = [];
      for (let dy = -win; dy <= win; dy++) for (let dx = -win; dx <= win; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        const q = ny * w + nx;
        if (mode[q]) continue;
        const j = q * channels;
        if (snapshot[j + 3] < 200) continue;
        rs.push(snapshot[j]); gs.push(snapshot[j + 1]); bs.push(snapshot[j + 2]);
      }
      const i = p * channels;
      if (rs.length < 40) {
        if (m === 1) { data[i + 3] = 0; erased++; } else kept++;
        continue;
      }
      const med = (arr) => { arr.sort((a, b) => a - b); return arr[arr.length >> 1]; };
      data[i] = med(rs); data[i + 1] = med(gs); data[i + 2] = med(bs);
      if (m === 1) data[i + 3] = 255;
      repaired++;
    }
  }
  console.log('reconstruidos', repaired, '; borrados', erased, '; conservados sin apoyo', kept);

  // Relleno vertical para los pixeles de tarjeta sin apoyo: interpolacion
  // entre los píxeles opacos no marcados mas cercanos por columna.
  let lerped = 0, dropped = 0;
  const need = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = y * w + x;
    if (mode[p] === 2 && snapshot[p * channels + 3] > 0) {
      // solo los que quedaron sin reconstruir (sin vecinos limpios)
      if (!rsEmpty(p)) continue;
      need.push(p);
    }
  }
  function rsEmpty(p) {
    const x = p % w, y = (p / w) | 0;
    for (let dy = -win; dy <= win; dy++) for (let dx = -win; dx <= win; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const q = ny * w + nx;
      if (mode[q]) continue;
      if (snapshot[q * channels + 3] >= 200) return false;
    }
    return true;
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const p = y * w + x;
      if (mode[p] !== 2 || !need.includes(p)) continue;
      let top = -1, bot = -1;
      const col = idx(x, y);
      for (let yy = y - 1; yy >= 0; yy--) {
        const q = yy * w + x;
        if (mode[q] !== 2 && data[q * channels + 3] >= 200) { top = q; break; }
        if (data[q * channels + 3] === 0 && yy < y - 4) break;
      }
      for (let yy = y + 1; yy < h; yy++) {
        const q = yy * w + x;
        if (mode[q] !== 2 && data[q * channels + 3] >= 200) { bot = q; break; }
        if (data[q * channels + 3] === 0 && yy > y + 4) break;
      }
      const i = col;
      if (top >= 0 && bot >= 0) {
        const t = (y - (top / w | 0)) / Math.max(1, ((bot / w | 0)) - (top / w | 0));
        const ti = top * channels, bi = bot * channels;
        data[i] = Math.round(data[ti] * (1 - t) + data[bi] * t);
        data[i + 1] = Math.round(data[ti + 1] * (1 - t) + data[bi + 1] * t);
        data[i + 2] = Math.round(data[ti + 2] * (1 - t) + data[bi + 2] * t);
        lerped++;
      } else {
        data[i + 3] = 0;
        dropped++;
      }
    }
  }
  console.log('interp vertical', lerped, '; vaciados', dropped);

  // Descontaminación de borde: halo claro solo en pixeles ya semitransparentes.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = idx(x, y);
      const a = data[i + 3];
      if (a === 0 || a >= 200) continue;
      if (lum(data[i], data[i + 1], data[i + 2]) > 175) data[i + 3] = Math.round(a * 0.35);
    }
  }

  // Restore transparent holes in the viewer-left man's outer silhouette from
  // the matching segmented source after all card cleanup has completed.
  const manPoly = [[770, 250], [1100, 250], [1130, 540], [1060, 800], [1010, 1120], [1090, 1536], [560, 1536], [515, 1200], [500, 850], [520, 550]];
  const insidePoly = (x, y) => {
    let inside = false;
    for (let i = 0, j = manPoly.length - 1; i < manPoly.length; j = i++) {
      const [xi, yi] = manPoly[i], [xj, yj] = manPoly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!insidePoly(x, y)) continue;
      const i = idx(x, y);
      if (data[i + 3] !== 0 || original[i + 3] < 180) continue;
      data[i] = original[i]; data[i + 1] = original[i + 1]; data[i + 2] = original[i + 2]; data[i + 3] = original[i + 3];
    }
  }

  // Remove only baked card/cylinder pixels in their original source regions.
  // Warm skin/cuffs and dark clothing stay; bright cyan/blue card graphics do not.
  const removeCardPixels = (x0, y0, x1, y1) => {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const i = idx(x, y);
      if (data[i + 3] === 0) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const warm = r - b > 12 && lum(r, g, b) > 60;
      if (warm) continue;
      if ((b - r > 25 && g - r > 12 && lum(r, g, b) > 68) || lum(r, g, b) > 145) data[i + 3] = 0;
    }
  };
  removeCardPixels(180, 900, 900, 1500);      // exposed globe-card fragment
  removeCardPixels(2250, 850, 2752, 1450);   // right cylinder/frame residue

  const cleaned = await sharp(data, { raw: { width: w, height: h, channels } }).png().toBuffer();
  const trimmed = await sharp(cleaned).trim({ threshold: 0 }).toBuffer();
  const tmeta = await sharp(trimmed).metadata();
  console.log('recortado', tmeta.width, 'x', tmeta.height);
  await sharp(trimmed)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 5, alphaQuality: 90 })
    .toFile(output);
  const fmeta = await sharp(output).metadata();
  console.log('guardado', output, fmeta.width, 'x', fmeta.height, 'ratio', (fmeta.height / fmeta.width).toFixed(4));
}

await cutout(INPUT, OUTPUT, WIDTH);
