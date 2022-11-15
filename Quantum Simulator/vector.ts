import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

interface Vector<Type> {
    values: Type[]

    length(): number
    setValues(values: Type[]): void
}

export class numVector implements Vector<number> {
    values: number[]

    constructor(size: number) {
        this.values = new Array<number>(size).fill(0)
    }

    public length(): number {
        return this.values.length
    }
    
    public setValues(values: number[]) {
        this.values = values
    }
}

export class complexVector implements Vector<ComplexNumber> {
    values: ComplexNumber[]

    constructor(size: number) {
        this.values = new Array<ComplexNumber>(size).fill(new ComplexAlgebraic(0, 0))
    }

    public length(): number {
        return this.values.length
    }
    
    public setValues(values: ComplexNumber[]) {
        this.values = values
    }
}
