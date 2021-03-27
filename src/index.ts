import Point from "./point";
import * as util from "./utils";

export interface ICrayonDrawOptions {
  /**
   * line width; default to 10; 线条宽度;
   */
  width: number;
  /**
   * line color; works as an eraser when “eraser”; 线条颜色. 传递 “eraser” 会启用橡皮擦功能
   */
  color: string;
  /**
   * opacity; 线条透明度
   */
  opacity: number;
  /**
   * dot density; default to 1; 点阵因子，越大越密。默认 1
   */
  inkAmount: number;
}

export default class FreeDrawController {
  public canvas: HTMLCanvasElement;
  public color: string = "#000000";
  public opacity: number = 1;
  public width: number = 10;
  public inkAmount: number = 1;

  private _ctx: CanvasRenderingContext2D;
  private _strokeLength: number = 0;
  private _point: Point = null;
  private _lastPoint: Point = null;
  private _size: number = 0;
  private _sep: number = 4;
  private _touchStarted = false;

  initialize(canvas: string | HTMLCanvasElement, options?: ICrayonDrawOptions) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas = (typeof canvas === "string"
      ? document.getElementById(canvas)
      : canvas) as HTMLCanvasElement;

    if (options) {
      const { width, color, inkAmount, opacity } = options;
      // allow empty string
      if (typeof color === "string") {
        this.color = color;
      }
      if (width > 0) {
        this.width = width;
      }
      if (inkAmount > 0) {
        this.inkAmount = inkAmount;
      }
      if (opacity > 0) {
        this.inkAmount = inkAmount;
      }
    }

    this._point = new Point(0, 0);
    this._size = this.width / 2;
    this.canvas.width = this.canvas.offsetWidth * dpr;
    this.canvas.height = this.canvas.offsetHeight * dpr;
    this._ctx = this.canvas.getContext("2d");
    this._ctx.scale(dpr, dpr);
    this._ctx.lineJoin = "round";
    this._ctx.lineCap = "round";
    this._ctx.lineWidth = this.width * 2;
    this.canvas.addEventListener("touchstart", this.touchStart);
    this.canvas.addEventListener("touchmove", this.touchMove);
    window.addEventListener("touchend", this.touchEnd);
    this.canvas.addEventListener("mousedown", this.touchStart);
    this.canvas.addEventListener("mousemove", this.touchMove);
    window.addEventListener("mouseup", this.touchEnd);
  }

  setColor(color: string) {
    this.color = color;
  }

  setOpacity(value: number) {
    this.opacity = value;
  }

  setWidth(width: number) {
    this.width = width;
    this._size = width / 2;
  }

  setInkAmount(amount: number) {
    this.inkAmount = amount;
  }

  touchStart = (e: TouchEvent | MouseEvent) => {
    this._touchStarted = true;
    const point = this.getPoint(e);
    if (this.color === "eraser") {
      this._ctx.globalCompositeOperation = "destination-out";
      this._ctx.beginPath();
      this._ctx.moveTo(point.x, point.y);
    } else {
      this._ctx.fillStyle = this.color;
      this._ctx.globalCompositeOperation = "source-over";
      this._ctx.globalAlpha = this.opacity;
      this._point = point;
    }
  };

  touchMove = (e: TouchEvent | MouseEvent) => {
    if (this._touchStarted) {
      const point = this.getPoint(e);
      if (this.color === "eraser") {
        this._ctx.lineTo(point.x, point.y);
        this._ctx.stroke();
      } else if (this.color) {
        this._lastPoint = this._point;
        this._point = point;
        this._strokeLength = point
          .subtract(this._lastPoint)
          .distanceFrom(new Point(0, 0));
        this.draw();
      }
    }
  };

  touchEnd = () => {
    this._touchStarted = false;
  };

  draw() {
    var i: number,
      j: number,
      p: Point,
      r: number,
      c: number,
      x: number,
      y: number,
      w: number,
      h: number,
      v: Point,
      s: number,
      stepNum: number,
      dotSize: number,
      dotNum: number,
      range: number;

    v = this._point.subtract(this._lastPoint);
    s = Math.ceil(this._size / 2);
    stepNum = Math.floor(v.distanceFrom(new Point(0, 0)) / s) + 1;
    v.normalize(s);

    dotSize =
      this._sep * util.clamp((this.inkAmount / this._strokeLength) * 3, 1, 0.5);
    dotNum = Math.ceil(this._size * this._sep);

    range = this._size / 2;

    this._ctx.beginPath();
    for (i = 0; i < dotNum; i++) {
      for (j = 0; j < stepNum; j++) {
        p = this._lastPoint.add(v.multiply(j));
        r = util.getRandom(range);
        c = util.getRandom(Math.PI * 2);
        w = util.getRandom(dotSize, dotSize / 2);
        h = util.getRandom(dotSize, dotSize / 2);
        x = p.x + r * Math.sin(c) - w / 2;
        y = p.y + r * Math.cos(c) - h / 2;
        this._ctx.rect(x, y, w, h);
      }
    }
    this._ctx.fill();
  }

  getPoint(e: TouchEvent | MouseEvent) {
    let touch: Touch | MouseEvent;
    if (/^touch/.test(e.type)) {
      touch = (e as TouchEvent).changedTouches[0];
    } else {
      touch = e as MouseEvent;
    }
    return new Point(
      touch.pageX - this.canvas.offsetLeft,
      touch.pageY - this.canvas.offsetTop
    );
  }

  destroy() {
    this.canvas.removeEventListener("touchstart", this.touchStart);
    this.canvas.removeEventListener("touchmove", this.touchMove);
    window.removeEventListener("touchend", this.touchEnd);
    this.canvas.removeEventListener("mousedown", this.touchStart);
    this.canvas.removeEventListener("mousemove", this.touchMove);
    window.removeEventListener("mouseup", this.touchEnd);
  }
}
