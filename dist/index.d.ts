import Point from "./point";
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
    canvas: HTMLCanvasElement;
    color: string;
    opacity: number;
    width: number;
    inkAmount: number;
    private _ctx;
    private _strokeLength;
    private _point;
    private _lastPoint;
    private _size;
    private _sep;
    private _touchStarted;
    initialize(canvas: string | HTMLCanvasElement, options?: ICrayonDrawOptions): void;
    setColor(color: string): void;
    setOpacity(value: number): void;
    setWidth(width: number): void;
    setInkAmount(amount: number): void;
    touchStart: (e: MouseEvent | TouchEvent) => void;
    touchMove: (e: MouseEvent | TouchEvent) => void;
    touchEnd: () => void;
    draw(): void;
    getPoint(e: TouchEvent | MouseEvent): Point;
    destroy(): void;
}
