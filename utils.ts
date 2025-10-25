import fs from "node:fs/promises";
import path from "node:path";

import { fileTypeFromBuffer } from "file-type";

export async function getDataURIs(fontsDir = "./fonts-gzip") {
  const files = await fs.readdir(path.join(__dirname, fontsDir));
  const fonts = [] as Array<{
    name: string;
    mime: string;
    gzipSize: number;
    size: number;
    gzipData: string;
    data: string;
    data_sha: string;
    gzipData_sha: string;
  }>;

  for (const fp of files) {
    const origPath = path.join(__dirname, "fonts", fp.replace(/\.gz$/, ""));
    const origFile = await fs.readFile(origPath);
    const { mime = "" } = (await fileTypeFromBuffer(origFile)) || {};

    const meta = { ...path.parse(origPath), mime };
    const gzFile = await fs.readFile(path.join(__dirname, fontsDir, fp));
    const bytes = new Uint8Array(gzFile);
    const name = meta.base.toLowerCase().replace(" ", "-");

    const item = {
      name,
      mime,
      gzipSize: bytes.byteLength,
      size: origFile.byteLength,

      gzipData: `data:${mime};base64,${uint8ArrayToBase64(bytes)}`,
      data: `data:${mime};base64,${uint8ArrayToBase64(new Uint8Array(origFile))}`,
    };

    fonts.push({
      ...item,
      data_sha: await sha256(item.data),
      gzipData_sha: await sha256(item.gzipData),
    });
  }

  return fonts;
}

async function sha256(data: string | Uint8Array): Promise<string> {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    typeof data === "string" ? new TextEncoder().encode(data) : data,
  );
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binaryString = "";
  // This is more memory-efficient than String.fromCharCode.apply
  for (const byte of uint8Array) {
    binaryString += String.fromCharCode(byte);
  }
  return btoa(binaryString);
}
