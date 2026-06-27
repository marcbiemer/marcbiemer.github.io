import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const SIZES = [640, 1080, 1920, 2560];
const SECTIONS = ['work', 'about', 'talks'];
const VALID_EXTENSIONS = /\.(jpg|jpeg|png|webp)$/i;

let processed = 0;
let skipped = 0;

async function processImage(filePath, outDir, filename) {
  const name = basename(filename, extname(filename));

  for (const size of SIZES) {
    const sizeDir = join(outDir, String(size));
    const outPath = join(sizeDir, `${name}.webp`);

    mkdirSync(sizeDir, { recursive: true });

    if (existsSync(outPath)) {
      skipped++;
      continue;
    }

    const image = sharp(filePath);
    const meta = await image.metadata();
    const targetWidth = meta.width && meta.width < size ? meta.width : size;

    await image
      .resize(targetWidth)
      .webp({ quality: 82 })
      .toFile(outPath);

    console.log(`✓ ${filename} → ${size}px`);
    processed++;
  }
}

async function processDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SIZES.map(String).includes(entry.name)) continue;
      await processDir(fullPath);
    } else if (VALID_EXTENSIONS.test(entry.name)) {
      await processImage(fullPath, dir, entry.name);
    }
  }
}

console.log('🖼  Optimising images...\n');

Promise.all(
  SECTIONS.map((section) => {
    const dir = `./public/media/${section}`;
    if (!existsSync(dir)) {
      console.warn(`⚠ Skipping missing directory: ${dir}`);
      return Promise.resolve();
    }
    return processDir(dir);
  })
).then(() => {
  console.log(`\n✅ Done — ${processed} generated, ${skipped} already existed`);
}).catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});