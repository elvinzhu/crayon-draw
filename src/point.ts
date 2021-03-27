export default class Point {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  x: number;
  y: number;

  subtract(that: Point) {
    return new Point(this.x - that.x, this.y - that.y);
  }

  distanceFrom(that: Point) {
    var dx = this.x - that.x,
      dy = this.y - that.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setFromPoint(that: Point) {
    this.x = that.x;
    this.y = that.y;
    return this;
  }

  add(that: Point) {
    return new Point(this.x + that.x, this.y + that.y);
  }

  normalize(thickness: number) {
    if (null === thickness || undefined === thickness) {
      thickness = 1;
    }

    var length = this.distanceFrom(new Point(0, 0));
    if (length > 0) {
      this.x = (this.x / length) * thickness;
      this.y = (this.y / length) * thickness;
    }

    return this;
  }

  multiply(scalar: number) {
    return new Point(this.x * scalar, this.y * scalar);
  }
}
