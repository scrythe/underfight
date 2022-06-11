class UI {
  private ctx: CanvasRenderingContext2D;
  private MAX_WIDTH = 200;
  private CHARGE_WIDTH_PER = this.MAX_WIDTH / 10;
  private HEIGHT = 50;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.ctx.fillStyle = 'yellow';
  }
  getChargeWidth(charge: number) {
    return charge * this.CHARGE_WIDTH_PER;
  }
  drawCharge(charge: number) {
    this.ctx.clearRect(0, 0, this.MAX_WIDTH, this.HEIGHT);
    this.ctx.fillRect(0, 0, this.getChargeWidth(charge), this.HEIGHT);
  }
}

export default UI;
