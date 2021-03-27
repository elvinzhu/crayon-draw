'use strict';

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

function getRandom(max, min) {
    min = min ? min : 0;
    return Math.random() * ((max ? max : 1) - min) + min;
}
function clamp(n, max, min) {
    if (typeof min !== "number")
        min = 0;
    return n > max ? max : n < min ? min : n;
}

var FreeDrawController = /** @class */ (function () {
    function FreeDrawController() {
        var _this = this;
        this.color = "#000000";
        this.opacity = 1;
        this.width = 10;
        this.inkAmount = 1;
        this._strokeLength = 0;
        this._point = null;
        this._lastPoint = null;
        this._size = 0;
        this._sep = 4;
        this._touchStarted = false;
        this.touchStart = function (e) {
            _this._touchStarted = true;
            var point = _this.getPoint(e);
            if (_this.color === "eraser") {
                _this._ctx.globalCompositeOperation = "destination-out";
                _this._ctx.beginPath();
                _this._ctx.moveTo(point.x, point.y);
            }
            else {
                _this._ctx.fillStyle = _this.color;
                _this._ctx.globalCompositeOperation = "source-over";
                _this._ctx.globalAlpha = _this.opacity;
                _this._point = point;
            }
        };
        this.touchMove = function (e) {
            if (_this._touchStarted) {
                var point = _this.getPoint(e);
                if (_this.color === "eraser") {
                    _this._ctx.lineTo(point.x, point.y);
                    _this._ctx.stroke();
                }
                else if (_this.color) {
                    _this._lastPoint = _this._point;
                    _this._point = point;
                    _this._strokeLength = point
                        .subtract(_this._lastPoint)
                        .distanceFrom(new Point(0, 0));
                    _this.draw();
                }
            }
        };
        this.touchEnd = function () {
            _this._touchStarted = false;
        };
    }
    FreeDrawController.prototype.initialize = function (canvas, options) {
        var dpr = window.devicePixelRatio || 1;
        this.canvas = (typeof canvas === "string"
            ? document.getElementById(canvas)
            : canvas);
        if (options) {
            var width = options.width, color = options.color, inkAmount = options.inkAmount, opacity = options.opacity;
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
    };
    FreeDrawController.prototype.setColor = function (color) {
        this.color = color;
    };
    FreeDrawController.prototype.setOpacity = function (value) {
        this.opacity = value;
    };
    FreeDrawController.prototype.setWidth = function (width) {
        this.width = width;
        this._size = width / 2;
    };
    FreeDrawController.prototype.setInkAmount = function (amount) {
        this.inkAmount = amount;
    };
    FreeDrawController.prototype.draw = function () {
        var i, j, p, r, c, x, y, w, h, v, s, stepNum, dotSize, dotNum, range;
        v = this._point.subtract(this._lastPoint);
        s = Math.ceil(this._size / 2);
        stepNum = Math.floor(v.distanceFrom(new Point(0, 0)) / s) + 1;
        v.normalize(s);
        dotSize =
            this._sep * clamp((this.inkAmount / this._strokeLength) * 3, 1, 0.5);
        dotNum = Math.ceil(this._size * this._sep);
        range = this._size / 2;
        this._ctx.beginPath();
        for (i = 0; i < dotNum; i++) {
            for (j = 0; j < stepNum; j++) {
                p = this._lastPoint.add(v.multiply(j));
                r = getRandom(range);
                c = getRandom(Math.PI * 2);
                w = getRandom(dotSize, dotSize / 2);
                h = getRandom(dotSize, dotSize / 2);
                x = p.x + r * Math.sin(c) - w / 2;
                y = p.y + r * Math.cos(c) - h / 2;
                this._ctx.rect(x, y, w, h);
            }
        }
        this._ctx.fill();
    };
    FreeDrawController.prototype.getPoint = function (e) {
        var touch;
        if (/^touch/.test(e.type)) {
            touch = e.changedTouches[0];
        }
        else {
            touch = e;
        }
        return new Point(touch.pageX - this.canvas.offsetLeft, touch.pageY - this.canvas.offsetTop);
    };
    FreeDrawController.prototype.destroy = function () {
        this.canvas.removeEventListener("touchstart", this.touchStart);
        this.canvas.removeEventListener("touchmove", this.touchMove);
        window.removeEventListener("touchend", this.touchEnd);
        this.canvas.removeEventListener("mousedown", this.touchStart);
        this.canvas.removeEventListener("mousemove", this.touchMove);
        window.removeEventListener("mouseup", this.touchEnd);
    };
    return FreeDrawController;
}());

module.exports = FreeDrawController;
