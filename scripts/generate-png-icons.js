import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const cTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    cTable[n] = c;
  }
  return cTable;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  
  const crcBuf = Buffer.alloc(4);
  const checkBuf = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(checkBuf), 0);
  
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function generatePng(width, height, isMaskable = false) {
  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth: 8
  ihdr[9] = 6; // color type: RGBA (6)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw Image Data (filter byte + RGBA for each pixel)
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  // Colors
  const bgColor = [11, 17, 32, 255]; // #0B1120 dark background
  const pcbCyan = [14, 165, 233, 255]; // #0EA5E9 primary cyan accent
  const pcbBlue = [37, 99, 235, 255]; // #2563EB deep blue accent
  const white = [255, 255, 255, 255];

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.42;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // None filter

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let color = bgColor;

      // Draw stylized inner badge circle & letter 'A' PCB trace
      if (dist <= radius) {
        if (dist >= radius - 8 && dist <= radius) {
          color = pcbCyan; // Outer ring
        } else if (dist >= radius * 0.72 && dist <= radius * 0.8) {
          color = pcbBlue; // Inner ring
        } else {
          // Draw Stylized 'A' PCB trace emblem
          const nx = dx / radius;
          const ny = dy / radius;

          // 'A' apex & legs logic
          const legWidth = 0.12;
          const leftLeg = Math.abs(ny - (-1.8 * nx - 0.1)) < legWidth && ny > -0.5 && ny < 0.4;
          const rightLeg = Math.abs(ny - (1.8 * nx - 0.1)) < legWidth && ny > -0.5 && ny < 0.4;
          const crossBar = ny > 0.02 && ny < 0.12 && Math.abs(nx) < 0.35;
          const centerDot = (nx * nx + ny * ny) < 0.025;

          if (leftLeg || rightLeg || crossBar || centerDot) {
            color = pcbCyan;
          } else if (dist < radius * 0.3) {
            color = [15, 23, 42, 255]; // deep center dark
          } else {
            color = [15, 23, 42, 255];
          }
        }
      }

      rawData[pxOffset] = color[0];
      rawData[pxOffset + 1] = color[1];
      rawData[pxOffset + 2] = color[2];
      rawData[pxOffset + 3] = color[3];
    }
  }

  // IDAT chunk
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.resolve('public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating PWA Icons...');

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), generatePng(192, 192));
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), generatePng(512, 512));
fs.writeFileSync(path.join(iconsDir, 'maskable-192x192.png'), generatePng(192, 192, true));
fs.writeFileSync(path.join(iconsDir, 'maskable-512x512.png'), generatePng(512, 512, true));
fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), generatePng(180, 180));

console.log('PWA Icons generated successfully!');
