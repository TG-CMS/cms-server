import * as QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export async function createQrcode(
  dataForQRcode: string,
  center_image,
  width = 300,
  cwidth = 30,
) {
  // grab data you want on qrcode here
  const canvas = createCanvas(width, width);
  const ctx = canvas.getContext('2d');
  await QRCode.toCanvas(canvas, dataForQRcode, {
    errorCorrectionLevel: 'H', // LMQH
    margin: 1,
    scale: 1,
    version: 8,
    width,
    color: {
      dark: '#1088eb', // black pixels
      light: '#ffffff', // white background
    },
  });
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toBuffer();
}
