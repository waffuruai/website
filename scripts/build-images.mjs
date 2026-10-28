#!/usr/bin/env node
/**
 * Builds every raster the site serves from the originals in `assets/`:
 * resized AVIF / WebP / JPEG (or PNG) variants under `public/img/`, plus
 * `src/generated/images.json`, the manifest `<Picture>` reads to emit
 * srcsets with real dimensions. Static export has no image optimizer, so
 * this script is the optimizer. Runs as `prebuild`; outputs are gitignored.
 *
 *   node scripts/build-images.mjs
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'public/img');
const MANIFEST = join(ROOT, 'src/generated/images.json');

/** Quality per format, tuned for photos at the sizes the site shows. */
const QUALITY = { avif: 55, webp: 78, jpeg: 80 };

/**
 * Image groups. `widths` are the rendered widths in CSS pixels times 1x/2x;
 * a width larger than the original is skipped (never upscale).
 */
const GROUPS = [
  {
    name: 'team',
    dir: 'assets/team',
    widths: [160, 320, 640],
    formats: ['avif', 'webp', 'jpeg'],
  },
  {
    name: 'brand',
    dir: 'assets/brand',
    widths: [40, 80, 160, 384],
    formats: ['webp', 'png'],
  },
  {
    // Post covers and share cards, 1200x630; sources in design/share/*.svg.
    name: 'blog',
    dir: 'assets/blog',
    widths: [600, 1200],
    formats: ['avif', 'webp', 'jpeg'],
  },
];

/** Icons for the browser and home screens, from the waffle mark. */
const ICONS = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'icon-192.png', size: 192 },
  { file: 'apple-touch-icon.png', size: 180 },
];

async function buildGroup(group, manifest) {
  const dir = join(ROOT, group.dir);
  const files = (await readdir(dir)).filter((file) =>
    /\.(jpe?g|png)$/i.test(file),
  );
  await mkdir(join(OUT, group.name), { recursive: true });

  for (const file of files) {
    const name = basename(file, extname(file));
    const source = sharp(join(dir, file));
    const { width, height } = await source.metadata();
    const widths = group.widths.filter((w) => w <= width);
    // Always offer the original size when every target is larger.
    if (!widths.length || widths.at(-1) < width) widths.push(width);

    for (const w of widths) {
      for (const format of group.formats) {
        const ext = format === 'jpeg' ? 'jpg' : format;
        await source
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .toFormat(
            format,
            format in QUALITY ? { quality: QUALITY[format] } : {},
          )
          .toFile(join(OUT, group.name, `${name}-${w}.${ext}`));
      }
    }

    manifest[`${group.name}/${name}`] = {
      width,
      height,
      widths,
      formats: group.formats.map((f) => (f === 'jpeg' ? 'jpg' : f)),
    };
  }
}

async function buildIcons() {
  const mark = join(ROOT, 'assets/brand/waffle.png');
  for (const { file, size } of ICONS) {
    await sharp(mark)
      .resize(size, size)
      .png()
      .toFile(join(ROOT, 'public', file));
  }
}

async function main() {
  const manifest = {};
  for (const group of GROUPS) await buildGroup(group, manifest);
  await buildIcons();
  await mkdir(join(ROOT, 'src/generated'), { recursive: true });
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`images: ${Object.keys(manifest).length} sources → public/img`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
