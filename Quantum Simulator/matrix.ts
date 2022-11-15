import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

export class Matrix {
    rows: number
    columns: number
    matrixValues: number[][]
    isComplex: boolean
    constructor(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
        this.matrixValues = []
        this.isComplex = false
        this.reset()
    }

    initValues(values: number[][]): Matrix {
        if (values[0].length > this.rows || values.length > this.columns) {
            console.log("Matrix has not enough columns or rows, please try again\n")
            return this
        } else if ((values[0].length < this.rows && this.rows != 0) || (values.length < this.columns && this.columns != 0)) {
            console.log("Matrix has more rows or columns than values specified, please try again\n")
            return this
        }
        for (var row: number = 0; row < this.rows; row++) {
            this.matrixValues[row] = []
            for(var col: number = 0; col < this.columns; col++) {
                this.matrixValues[row][col] = values[row][col]
            }
        }
        return this
    }

    initIdentity(): Matrix {
        if (this.rows !== this.columns) {
            console.log("Matrix is not a square matrix, not possible\n")
            return this
        }
        this.reset()
        for (var ident: number = 0; ident < this.rows; ident++) {
            this.matrixValues[ident][ident] = 1
        }
        return this
    }

    transformToComplex(): ComplexMatrix {
        var newComplexMatrix: ComplexMatrix = new ComplexMatrix(this.rows, this.columns)
        for (var row: number = 0; row < this.rows; row++) {
            for (var col: number = 0; col < this.columns; col++) {
                newComplexMatrix.matrixValues[row][col] = new ComplexAlgebraic(this.matrixValues[row][col], 0)
            }
        }
        return newComplexMatrix
    }

    reset(): Matrix {
        for(var row: number = 0; row < this.rows; row++) {
            this.matrixValues[row] = []
            for(var col: number = 0; col < this.columns; col++) {
                this.matrixValues[row][col] = 0
            }
        }
        return this
    }

    getValue(row: number, col: number): number {
        return this.matrixValues[row - 1][col - 1] // -1 for people who dont know that array starts at 0 haha
    }

    multiply(matrix: Matrix): Matrix {
        if (this.columns !== matrix.rows) {
            console.log("Multiplication not possible: not an equal amount of columns to rows")
            return this
        }
        var newMatrix: Matrix = new Matrix(this.rows, matrix.columns)
        for (var newRow: number = 0; newRow < newMatrix.rows; newRow++) {
            for (var newCol: number = 0; newCol < newMatrix.columns; newCol++) { // current new row and col
                var sum: number = 0
                for (var i: number = 0; i < this.rows; i++) {
                    sum += this.matrixValues[newRow][i] * matrix.matrixValues[i][newCol]
                }
                newMatrix.matrixValues[newRow][newCol] = sum
            }
        }
        return newMatrix
    }
}

export class ComplexMatrix {
    rows: number
    columns: number
    matrixValues: ComplexNumber[][]
    isComplex: boolean
    constructor(rows: number, columns: number) {
        this.rows = rows
        this.columns = columns
        this.matrixValues = []
        this.isComplex = true
        this.reset()
    }

    initValues(values: ComplexNumber[][]): ComplexMatrix {
        if (values[0].length > this.rows || values.length > this.columns) {
            console.log("Matrix has not enough columns or rows, please try again\n")
            return this
        } else if ((values[0].length < this.rows && this.rows != 0) || (values.length < this.columns && this.columns != 0)) {
            console.log("Matrix has more rows or columns than values specified, please try again\n")
            return this
        }
        for (var row: number = 0; row < this.rows; row++) {
            this.matrixValues[row] = []
            for(var col: number = 0; col < this.columns; col++) {
                this.matrixValues[row][col] = values[row][col]
            }
        }
        return this
    }

    initIdentity(): ComplexMatrix {
        if (this.rows !== this.columns) {
            console.log("Matrix is not a square matrix, not possible\n")
            return this
        }
        this.reset()
        for (var ident: number = 0; ident < this.rows; ident++) {
            this.matrixValues[ident][ident] = new ComplexAlgebraic(1, 0)
        }
        return this
    }

    transformToReal(): Matrix | ComplexMatrix {
        var newMatrix: Matrix = new Matrix(this.rows, this.columns)
        for (var row: number = 0; row < this.rows; row++) {
            for (var col: number = 0; col < this.columns; col++) {
                if (this.matrixValues[row][col].b !== 0) {
                    console.log("Not possible to transform this ComplexMatrix to Matrix: Imaginary not 0")
                    return this
                }
                newMatrix.matrixValues[row][col] = this.matrixValues[row][col].a
            }
        }
        return newMatrix
    }

    reset(): ComplexMatrix {
        for(var row: number = 0; row < this.rows; row++) {
            this.matrixValues[row] = []
            for(var col: number = 0; col < this.columns; col++) {
                this.matrixValues[row][col] = new ComplexAlgebraic(0, 0)
            }
        }
        return this
    }

    getValue(row: number, col: number): ComplexNumber {
        return this.matrixValues[row - 1][col - 1] // -1 for people who dont know that array starts at 0 haha
    }

    multiply(matrix: ComplexMatrix): ComplexMatrix {
        if (this.columns !== matrix.rows) {
            console.log("Multiplication not possible: not an equal amount of columns to rows")
            return this
        }
        var newMatrix: ComplexMatrix = new ComplexMatrix(this.rows, matrix.columns)
        for (var newRow: number = 0; newRow < newMatrix.rows; newRow++) {
            for (var newCol: number = 0; newCol < newMatrix.columns; newCol++) { // current new row and col
                var sum: ComplexNumber = new ComplexAlgebraic(0, 0)
                for (var i: number = 0; i < this.rows; i++) {
                    sum = sum.add(this.matrixValues[newRow][i].mul(matrix.matrixValues[i][newCol]))
                }
                newMatrix.matrixValues[newRow][newCol] = sum
            }
        }
        return newMatrix
    }
}

/**
 * Tests
 */

const c1: ComplexNumber = new ComplexAlgebraic(2, 1)
const c2: ComplexNumber = new ComplexAlgebraic(1, 1)
const c3: ComplexNumber = new ComplexAlgebraic(1, 2)
const noIm: ComplexNumber = new ComplexAlgebraic(1, 0)
const realMatrix: Matrix = new Matrix(3, 3).initValues([[1, 1, 1], 
                                                        [1, 1, 0], 
                                                        [1, 0, 0]])
const realMatrix2: Matrix = new Matrix(3, 3).initValues([[2, 2, 2], 
                                                         [2, 2, 1], 
                                                         [2, 1, 1]])
const complexMatrix: ComplexMatrix = new ComplexMatrix(3, 3).initValues([[c1, c2, c3], 
                                                                         [c2, c2, c2], 
                                                                         [c3, c2, c1]])
const complexMatrix2: ComplexMatrix = new ComplexMatrix(3, 3).initValues([[c1, c2, c3], 
                                                                          [c1, c2, c3], 
                                                                          [c1, c2, c3]])
const complexNoImaginary: ComplexMatrix = new ComplexMatrix(3, 3).initValues([[noIm, noIm, noIm], 
                                                                              [noIm, noIm, noIm], 
                                                                              [noIm, noIm, noIm]])

console.log("Multiplication between Matrix and Matrix")
console.log(realMatrix.multiply(realMatrix2))

console.log("\nMultiplication between ComplexMatrix and ComplexMatrix")
console.log(complexMatrix.multiply(complexMatrix2).matrixValues);

console.log("\nMultiplication between Matrix and ComplexMatrix:")
console.log(realMatrix.transformToComplex().multiply(complexMatrix).transformToReal().matrixValues)

console.log("\nMultiplication between Matrix and ComplexMatrix with successful transformation to Matrix:")
console.log(realMatrix.transformToComplex().multiply(complexNoImaginary).transformToReal())