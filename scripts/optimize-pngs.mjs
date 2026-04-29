import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DEFAULT_DIR = 'public/github-assets/v11';
const targetDir = process.argv[2] ?? DEFAULT_DIR;
const absTargetDir = path.resolve(process.cwd(), targetDir);

function formatMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

async function main() {
  const stat = await fs.stat(absTargetDir).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    throw new Error(`Directory not found: ${absTargetDir}`);
  }

  let totalFiles = 0;
  let optimizedFiles = 0;
  let skippedFiles = 0;
  let originalBytes = 0;
  let optimizedBytes = 0;

  for await (const filePath of walk(absTargetDir)) {
    if (!filePath.toLowerCase().endsWith('.png')) {
      continue;
    }

    totalFiles += 1;

    const sourceBuffer = await fs.readFile(filePath);
    originalBytes += sourceBuffer.byteLength;

    // Good quality preset for UI screenshots while reducing weight.
    const optimizedBuffer = await sharp(sourceBuffer)
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        quality: 82,
        effort: 10,
        palette: true,
      })
      .toBuffer();

    // Keep original if optimization is not beneficial.
    if (optimizedBuffer.byteLength >= sourceBuffer.byteLength) {
      skippedFiles += 1;
      optimizedBytes += sourceBuffer.byteLength;
      continue;
    }

    await fs.writeFile(filePath, optimizedBuffer);
    optimizedFiles += 1;
    optimizedBytes += optimizedBuffer.byteLength;
  }

  const savedBytes = originalBytes - optimizedBytes;
  const savedPct = originalBytes > 0 ? (savedBytes / originalBytes) * 100 : 0;

  console.log(`PNG files scanned: ${totalFiles}`);
  console.log(`Optimized files: ${optimizedFiles}`);
  console.log(`Skipped files: ${skippedFiles}`);
  console.log(`Original size: ${formatMB(originalBytes)}`);
  console.log(`Optimized size: ${formatMB(optimizedBytes)}`);
  console.log(`Saved: ${formatMB(savedBytes)} (${savedPct.toFixed(2)}%)`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
