import fs from 'node:fs/promises';
import path from 'node:path';

import { fileTypeFromBuffer } from 'file-type';

export async function getDataURIs(fontsDir = './fonts-gzip') {
  const files = await fs.readdir(path.join(__dirname, fontsDir));
  const fonts = [] as Array<{ name: string; mime: string; data: string }>;
  for (const fp of files) {
    const origPath = path.join(__dirname, 'fonts', fp.replace(/\.gz$/, ''));
    const origFile = await fs.readFile(origPath);
    const { mime = '' } = (await fileTypeFromBuffer(origFile)) || {};
    const meta = { ...path.parse(origPath), mime };
    const gzFile = await fs.readFile(path.join(__dirname, fontsDir, fp));
    const bytes = new Uint8Array(gzFile);
    const name = meta.base.toLowerCase().replace(' ', '-');

    fonts.push({
      name,
      mime,
      data: `data:${mime};base64,${uint8ArrayToBase64(bytes)}`,
    });
  }

  return fonts;
}

export function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binaryString = '';
  // This is more memory-efficient than String.fromCharCode.apply
  for (const byte of uint8Array) {
    binaryString += String.fromCharCode(byte);
  }
  return btoa(binaryString);
}
