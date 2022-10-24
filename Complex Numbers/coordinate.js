"use strict";
exports.__esModule = true;
exports.Drawing = void 0;
var Drawing = /** @class */ (function () {
    function Drawing(x_real, y_real) {
        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");
        this.x_real = x_real;
        this.y_real = y_real;
        this.r_real = Math.sqrt(x_real * x_real + y_real * y_real);
        this.x = x_real > 200 ? x_real / (x_real / 200) : x_real;
        this.x = x_real < -200 ? -x_real / (x_real / 200) : this.x;
        this.y = y_real > 100 ? y_real / (y_real / 100) : y_real;
        this.y = y_real < -100 ? -y_real / (y_real / 100) : this.y;
        this.r = Math.sqrt(this.x * this.x + this.y * this.y);
        this.phi = Math.acos(this.x / this.r) * (180 / Math.PI);
    }
    Drawing.prototype.drawAxis = function (c, ctx) {
        ctx.moveTo(0, c.height / 2);
        ctx.lineTo(c.width, c.height / 2);
        ctx.stroke();
        ctx.moveTo(c.width / 2, 0);
        ctx.lineTo(c.width / 2, c.height);
        ctx.stroke();
    };
    Drawing.prototype.drawCoordinateLine = function (c, ctx) {
        ctx.moveTo(c.width / 2, c.height / 2);
        ctx.lineTo((c.width / 2) + this.x, (c.height / 2) - this.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc((c.width / 2) + this.x, (c.height / 2) - this.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    };
    Drawing.prototype.drawValues = function (c, ctx) {
        // value on the x axis
        ctx.moveTo((c.width / 2) + this.x, (c.height / 2) - (c.height / 50));
        ctx.lineTo((c.width / 2) + this.x, (c.height / 2) + (c.height / 50));
        ctx.stroke();
        ctx.font = "10px Arial";
        ctx.fillText(this.x_real.toString(), (c.width / 2) + this.x - 8, (c.height / 2) + (c.height / 40) + 8);
        // value on the y axis
        ctx.moveTo((c.width / 2) - (c.width / 90), (c.height / 2) - this.y);
        ctx.lineTo((c.width / 2) + (c.width / 90), (c.height / 2) - this.y);
        ctx.stroke();
        ctx.font = "10px Arial";
        ctx.fillText(this.y_real.toString(), (c.width / 2) - (c.width / 70) + 15, (c.height / 2) - this.y + 4);
        // r-value text
        ctx.font = "10px Arial";
        ctx.fillText("r = " + this.r_real.toFixed(2), (c.width / 2) + this.x - 10, (c.height / 2) - this.y - 5);
        // circle with the radius phi
        ctx.beginPath();
        if (this.y < 0)
            ctx.arc(c.width / 2, c.height / 2, this.r / 2, 0, this.phi * (Math.PI / 180));
        else
            ctx.arc(c.width / 2, c.height / 2, this.r / 4, (360 - this.phi) * (Math.PI / 180), 0);
        ctx.stroke();
        ctx.font = "10px Arial";
        console.log(this.phi * (Math.PI / 180));
        if (this.x < 0 && this.y < 0)
            ctx.fillText("-" + this.phi.toFixed(2) + "°", (c.width / 2) + (this.r / 8), c.height / 2 - 10);
        else if (this.x < 0)
            ctx.fillText(this.phi.toFixed(2) + "°", (c.width / 2) + (this.r / 8), c.height / 2 + 15);
        else if (this.y < 0)
            ctx.fillText("-" + this.phi.toFixed(2) + "°", (c.width / 2) + (this.r / 8), c.height / 2 - 10);
        else
            ctx.fillText(this.phi.toFixed(2) + "°", (c.width / 2) + (this.r / 8), c.height / 2 + 15);
    };
    return Drawing;
}());
exports.Drawing = Drawing;
