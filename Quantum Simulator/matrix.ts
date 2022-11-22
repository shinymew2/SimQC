import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

abstract class Matrix<Type> {
    rows: number
    columns: number
    values: Type[][]
    
    constructor(rows: number, columns: number, values?: Type[][]) {
        this.rows = rows
        this.columns = columns
        this.values = []
        this.init(values)
    }
    
    abstract reset(): Matrix<Type>
    abstract toIdent(): Matrix<Type>
    abstract mul(matrix: Matrix<Type>): Matrix<Type>
    abstract kronecker(matrix: Matrix<Type>): Matrix<Type>
    abstract setSum(matrix: Matrix<Type>, sum: Type, newRow: number, newCol: number, i: number): Type
    abstract kronValue(matrix: Matrix<Type>, m1Row: number, m1Col: number, m2Row: number, m2Col: number): Type

    init(values?: Type[][]): Matrix<Type> { return this.reset().compareLength(values) }
    getValue(row: number, col: number): Type { return this.values[row][col] }

    real(): RealMatrix | ComplexMatrix { return this as unknown as RealMatrix }
    complex(): ComplexMatrix { return this as unknown as ComplexMatrix }

    multiply(matrix: Matrix<Type>, sumMatrix: Matrix<Type>, reset: Type): Matrix<Type> {
        if (this.columns !== matrix.rows) {
            console.log("Multiplication not possible: not an equal amount of columns to rows")
            return this
        }

        for (let newRow = 0; newRow < sumMatrix.rows; newRow++) {
            for (let newCol = 0; newCol < sumMatrix.columns; newCol++) {
                let sum = reset
                for (let i = 0; i < this.rows; i++) {
                    sum = this.setSum(matrix, sum, newRow, newCol, i)
                }
                sumMatrix.values[newRow][newCol] = sum
            }
        }

        return sumMatrix
    }

    kroneckerProduct(matrix: Matrix<Type>, kronMatrix: Matrix<Type>): Matrix<Type> {
        var rowCounterThis = 0, rowCounterMatrix = 0

        for (var newRow = 0; newRow < kronMatrix.rows; newRow++) {
            var colCounterThis = 0, colcounterMatrix = 0
            if (newRow % matrix.rows === 0 && newRow !== 0) rowCounterThis++
            rowCounterMatrix = newRow % matrix.rows
            for (var newCol = 0; newCol < kronMatrix.columns; newCol++) {
                if (newCol % matrix.columns === 0 && newCol !== 0) colCounterThis++
                colcounterMatrix = newCol % matrix.columns
                kronMatrix.values[newRow][newCol] = this.kronValue(matrix, rowCounterThis, colCounterThis, rowCounterMatrix, colcounterMatrix)
            }
        }
        return kronMatrix
    }

    setToValue(value: Type): Matrix<Type> {
        for (let row = 0; row < this.rows; row++) {
            this.values[row] = []
            for (let col = 0; col < this.columns; col++) {
                this.values[row][col] = value
            }
        }
        return this
    }

    setDiagonals(value: Type): Matrix<Type> {
        if (this.rows !== this.columns) {
            console.log("Matrix is not a square matrix, not possible\n")
            return this
        }

        for (let i = 0; i < this.rows; i++) {
            this.values[i][i] = value
        }
        return this
    }

    compareLength(values: Type[][] | undefined): Matrix<Type> { 
        if (values) values.length === this.rows && values[0].length === this.columns ? this.values = values : console.log("Matrix does not match given size, please try again\n")
        return this 
    }
}

export class RealMatrix extends Matrix<number> {
    values: number[][]

    reset(): Matrix<number> {
        return this.setToValue(0)
    }

    toIdent(): Matrix<number> {
        return this.reset().setDiagonals(1)
    }

    mul(matrix: Matrix<number>): Matrix<number> {
        return this.multiply(matrix, new RealMatrix(this.rows, matrix.columns), 0)
    }

    kronecker(matrix: Matrix<number>): Matrix<number> {
        return this.kroneckerProduct(matrix, new RealMatrix(this.rows * matrix.rows, this.columns * matrix.columns))
    }

    setSum(matrix: Matrix<number>, sum: number, row: number, col: number, idx: number): number {
        return sum += this.values[row][idx] * matrix.values[idx][col]
    }

    kronValue(matrix: Matrix<number>, m1Row: number, m1Col: number, m2Row: number, m2Col: number): number {
        return this.values[m1Row][m1Col] * matrix.values[m2Row][m2Col]
    }

    complex(): ComplexMatrix {
        var newComplexMatrix = new ComplexMatrix(this.rows, this.columns)
        
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.columns; col++) {
                newComplexMatrix.values[row][col] = new ComplexAlgebraic(this.values[row][col], 0)
            }
        }
        return newComplexMatrix
    }
}

export class ComplexMatrix extends Matrix<ComplexNumber> {
    values: ComplexNumber[][]

    reset(): Matrix<ComplexNumber> {
        return this.setToValue(new ComplexAlgebraic(0, 0))
    }

    toIdent(): Matrix<ComplexNumber> {
        return this.reset().setDiagonals(new ComplexAlgebraic(0, 0))
    }

    mul(matrix: Matrix<ComplexNumber>): Matrix<ComplexNumber> {
        return this.multiply(matrix, new ComplexMatrix(this.rows, matrix.columns), new ComplexAlgebraic(0, 0))
    }

    kronecker(matrix: Matrix<ComplexNumber>): Matrix<ComplexNumber> {
        return this.kroneckerProduct(matrix, new ComplexMatrix(this.rows * matrix.rows, this.columns * matrix.columns))
    }

    setSum(matrix: Matrix<ComplexNumber>, sum: ComplexNumber, row: number, col: number, idx: number): ComplexNumber {
        return sum.add(this.values[row][idx].mul(matrix.values[idx][col]).algebraic())
    }

    kronValue(matrix: Matrix<ComplexNumber>, m1Row: number, m1Col: number, m2Row: number, m2Col: number): ComplexNumber {
        return this.values[m1Row][m1Col].mul(matrix.values[m2Row][m2Col])
    }

    real(): RealMatrix | ComplexMatrix {
        var realMatrix = new RealMatrix(this.rows, this.columns)

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.columns; col++) {
                if (this.values[row][col].b !== 0) {
                    console.log("Not possible to transform this ComplexMatrix to RealMatrix: Imaginary not 0")
                    return this
                }
                realMatrix.values[row][col] = this.values[row][col].a
            }
        }
        return realMatrix
    }
}