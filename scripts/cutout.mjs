import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function cutout(input, output, width) {
  const blob = await removeBackground(new URL('file:///' + input.replace(/\\/g, '/')).href, {
    debug: false,
    output: { format: 'image/png', quality: 1 },
  });
  let png = Buffer.from(await blob.arrayBuffer());
  const meta = await sharp(png).metadata();
  console.log('segmentado', path.basename(input), meta.width, 'x', meta.height);

  // Recorta al contenido no transparente y elimina halos residuales.
  const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const idx = (x, y) => (y * w + x) * channels;
  // Descontaminación de borde: atenúa alpha donde el color es muy claro/azulado (halo de oficina).
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = idx(x, y);
      const a = data[i + 3];
      if (a === 0) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const light = 0.299 * r + 0.587 * g + 0.114 * b;
      // Pixeles casi transparentes con tono muy claro (vidrio/ventana) se funden a 0.
      if (a < 200 && light > 175) data[i + 3] = Math.round(a * 0.35);
    }
  }
  const cleaned = await sharp(data, { raw: { width: w, height: h, channels } }).png().toBuffer();
  const trimmed = await sharp(cleaned).trim({ threshold: 0 }).toBuffer();
  const tmeta = await sharp(trimmed).metadata();
  console.log('recortado', width, '->', tmeta.width, 'x', tmeta.height);
  await sharp(trimmed)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 5, alphaQuality: 90 })
    .toFile(output);
  console.log('guardado', output);
}

await cutout(path.join('c:', 'Users', 'bcnca', 'Downloads', 'Gemini_Generated_Image_j2rt1dj2rt1dj2rt (1).jpg'), path.join(root, 'public', 'images', 'profesionales-juridicos-recorte-transparente.webp'), 1400);
