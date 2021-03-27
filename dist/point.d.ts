export default class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
    subtract(that: Point): Point;
    distanceFrom(that: Point): number;
    setFromPoint(that: Point): this;
    add(that: Point): Point;
    normalize(thickness: number): this;
    multiply(scalar: number): Point;
}
