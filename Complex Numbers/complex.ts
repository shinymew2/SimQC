const EPSILON = 2.220446049250313e-16

abstract class ComplexNumber {
    a: number;
    b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    neg(): ComplexNumber { return this.algebraic().neg(); }
    inv(): ComplexNumber { return this.polar().inv(); }

    add(c: ComplexNumber): ComplexNumber { return this.algebraic().add(c.algebraic()); }
    sub(c: ComplexNumber): ComplexNumber { return this.add(c.neg()); }
    mul(c: ComplexNumber): ComplexNumber { return this.polar().mul(c.polar()); }
    div(c: ComplexNumber): ComplexNumber { return this.mul(c.inv()); }
    abs(): number { return this.algebraic().abs(); }
    abstract con(): ComplexNumber;

    algebraic(): ComplexAlgebraic { return this as unknown as ComplexAlgebraic; }
    polar(): ComplexPolar { return this as unknown as ComplexPolar; }
    isAlmostEqual(c: ComplexNumber): boolean { return this.abs() - c.abs() <= EPSILON }
}

export class ComplexAlgebraic extends ComplexNumber {
    re: number;
    im: number;

    constructor(re: number, im: number) {
        super(re, im)
    }

    public neg(): ComplexAlgebraic {
        return new ComplexAlgebraic(-this.re, -this.im)
    }

    public add(c: ComplexAlgebraic): ComplexAlgebraic {
        return new ComplexAlgebraic(this.re + c.re, this.im + c.im)
    }

    public abs(): number {
        return Math.abs(Math.sqrt((this.re * this.re) + (this.im * this.im)))
    }

    public con(): ComplexAlgebraic {
        return new ComplexAlgebraic(this.re, -this.im);
    }

    public polar(): ComplexPolar {
        const rad = Math.sqrt(this.re * this.re + this.im * this.im);
        const phi = Math.atan2(this.re, this.im);
        return new ComplexPolar(rad, phi);
    }
}

export class ComplexPolar extends ComplexNumber {
    rad: number
    phi: number

    constructor(rad: number, phi: number) {
        super(rad, phi);
    }

    public inv(): ComplexPolar {
        return new ComplexPolar(1/this.rad, this.phi)
    }

    public mul(c: ComplexPolar): ComplexPolar {
        return new ComplexPolar(this.rad * c.rad, (this.phi * c.phi) % 360);
    }

    public con(): ComplexPolar {
        return new ComplexPolar(this.rad, -this.phi);
    }
    
    public algebraic(): ComplexAlgebraic {
        const re: number = this.rad * Math.cos(this.phi);
        const im: number = this.rad * Math.sin(this.phi);
        return new ComplexAlgebraic(re, im);
    }
}