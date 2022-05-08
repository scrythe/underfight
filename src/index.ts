const canvas = document.querySelector('canvas')!;
const ctx = canvas.getContext('2d')!;

const WIDTH = 800;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.fillRect(10, 10, 100, 100);
