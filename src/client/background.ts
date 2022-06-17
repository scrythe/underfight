function getBackground(rect: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const RASTER_SIZE = 30;
  const canvas = document.createElement('canvas');
  canvas.width = rect.width;
  canvas.height = rect.height;

  const ctx = canvas.getContext('2d')!;
  ctx.beginPath();
  for (let y = 0; y <= rect.height; y += RASTER_SIZE) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }
  for (let x = 0; x <= rect.height; x += RASTER_SIZE) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.width);
  }
  ctx.stroke();
  return canvas;
}
export default getBackground;
