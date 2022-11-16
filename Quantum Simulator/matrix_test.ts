import { Matrix, ComplexMatrix } from "./matrix"
import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

/**
 * Tests
 */

basicTest()
kroeneckerTest()

function kroeneckerTest() {
    /* Constants */
    const kronecker: Matrix = new Matrix(3, 2).initValues([[1, 2], [3, 4], [5, 6]])
    const kronecker2: Matrix = new Matrix(2, 2).initValues([[7, 8], [9, 0]])

    /* Logs */
    console.log(" - - - - - - - - - Kronicker Test - - - - - - - - -")
    console.log("Kronecker of Matrix and Matrix")
    console.log(kronecker.kroneckerProduct(kronecker2).matrixValues)
}


function basicTest(): void {
    /* Constants */
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
    
    /* Logs */
    console.log(" - - - - - - - - - Basic Test - - - - - - - - -")
    console.log("Multiplication between Matrix and Matrix")
    console.log(realMatrix.multiply(realMatrix2))
    console.log("\nMultiplication between ComplexMatrix and ComplexMatrix")
    console.log(complexMatrix.multiply(complexMatrix2).matrixValues);
    console.log("\nMultiplication between Matrix and ComplexMatrix:")
    console.log(realMatrix.transformToComplex().multiply(complexMatrix).transformToReal().matrixValues)
    console.log("\nMultiplication between Matrix and ComplexMatrix with successful transformation to Matrix:")
    console.log(realMatrix.transformToComplex().multiply(complexNoImaginary).transformToReal())
}