"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ComplexPolar = exports.ComplexAlgebraic = void 0;
var EPSILON = 2.220446049250313e-16;
var ComplexNumber = /** @class */ (function () {
    function ComplexNumber(a, b) {
        this.a = a;
        this.b = b;
    }
    ComplexNumber.prototype.neg = function () { return this.algebraic().neg(); };
    ComplexNumber.prototype.inv = function () { return this.polar().inv(); };
    ComplexNumber.prototype.add = function (c) { return this.algebraic().add(c.algebraic()); };
    ComplexNumber.prototype.sub = function (c) { return this.add(c.neg()); };
    ComplexNumber.prototype.mul = function (c) { return this.polar().mul(c.polar()); };
    ComplexNumber.prototype.div = function (c) { return this.mul(c.inv()); };
    ComplexNumber.prototype.abs = function () { return this.algebraic().abs(); };
    ComplexNumber.prototype.algebraic = function () { return this; };
    ComplexNumber.prototype.polar = function () { return this; };
    ComplexNumber.prototype.isAlmostEqual = function (c) { return this.abs() - c.abs() <= EPSILON; };
    return ComplexNumber;
}());
var ComplexAlgebraic = /** @class */ (function (_super) {
    __extends(ComplexAlgebraic, _super);
    function ComplexAlgebraic(re, im) {
        return _super.call(this, re, im) || this;
    }
    ComplexAlgebraic.prototype.neg = function () {
        return new ComplexAlgebraic(-this.re, -this.im);
    };
    ComplexAlgebraic.prototype.add = function (c) {
        return new ComplexAlgebraic(this.re + c.re, this.im + c.im);
    };
    ComplexAlgebraic.prototype.abs = function () {
        return Math.abs(Math.sqrt((this.re * this.re) + (this.im * this.im)));
    };
    ComplexAlgebraic.prototype.con = function () {
        return new ComplexAlgebraic(this.re, -this.im);
    };
    ComplexAlgebraic.prototype.polar = function () {
        var rad = Math.sqrt(this.re * this.re + this.im * this.im);
        var phi = Math.atan2(this.re, this.im);
        return new ComplexPolar(rad, phi);
    };
    return ComplexAlgebraic;
}(ComplexNumber));
exports.ComplexAlgebraic = ComplexAlgebraic;
var ComplexPolar = /** @class */ (function (_super) {
    __extends(ComplexPolar, _super);
    function ComplexPolar(rad, phi) {
        return _super.call(this, rad, phi) || this;
    }
    ComplexPolar.prototype.inv = function () {
        return new ComplexPolar(1 / this.rad, this.phi);
    };
    ComplexPolar.prototype.mul = function (c) {
        return new ComplexPolar(this.rad * c.rad, (this.phi * c.phi) % 360);
    };
    ComplexPolar.prototype.con = function () {
        return new ComplexPolar(this.rad, -this.phi);
    };
    ComplexPolar.prototype.algebraic = function () {
        var re = this.rad * Math.cos(this.phi);
        var im = this.rad * Math.sin(this.phi);
        return new ComplexAlgebraic(re, im);
    };
    return ComplexPolar;
}(ComplexNumber));
exports.ComplexPolar = ComplexPolar;
