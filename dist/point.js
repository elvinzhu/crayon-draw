var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.subtract = function (that) {
        return new Point(this.x - that.x, this.y - that.y);
    };
    Point.prototype.distanceFrom = function (that) {
        var dx = this.x - that.x, dy = this.y - that.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Point.prototype.setFromPoint = function (that) {
        this.x = that.x;
        this.y = that.y;
        return this;
    };
    Point.prototype.add = function (that) {
        return new Point(this.x + that.x, this.y + that.y);
    };
    Point.prototype.normalize = function (thickness) {
        if (null === thickness || undefined === thickness) {
            thickness = 1;
        }
        var length = this.distanceFrom(new Point(0, 0));
        if (length > 0) {
            this.x = (this.x / length) * thickness;
            this.y = (this.y / length) * thickness;
        }
        return this;
    };
    Point.prototype.multiply = function (scalar) {
        return new Point(this.x * scalar, this.y * scalar);
    };
    return Point;
}());
export default Point;
