import { RealMatrix, ComplexMatrix } from "./matrix"
import { ComplexAlgebraic, ComplexNumber } from "../Complex Numbers/complex"

/**
 * Tests
 */

basicTest()
kroeneckerTest()

function kroeneckerTest() {
    /* Constants */
    const kronecker = new RealMatrix(3, 2, [[1, 2], [3, 4], [5, 6]])
    const kronecker2 = new RealMatrix(2, 2, [[7, 8], [9, 0]])

    /* Logs */
    console.log(" - - - - - - - - - Kronecker Test - - - - - - - - -")
    console.log("Kronecker of Matrix and Matrix")
    console.log(kronecker.kronecker(kronecker2).values)
}


function basicTest(): void {
    /* Constants */
    const c1: ComplexNumber = new ComplexAlgebraic(2, 1)
    const c2: ComplexNumber = new ComplexAlgebraic(1, 1)
    const c3: ComplexNumber = new ComplexAlgebraic(1, 2)
    const noIm: ComplexNumber = new ComplexAlgebraic(1, 0)
    const realMatrix = new RealMatrix(3, 3, [[1, 1, 1], 
                                            [1, 1, 0], 
                                            [1, 0, 0]])
    const realMatrix2 = new RealMatrix(3, 3, [[2, 2, 2], 
                                            [2, 2, 1], 
                                            [2, 1, 1]])
    const complexMatrix = new ComplexMatrix(3, 3, [[c1, c2, c3], 
                                                    [c2, c2, c2], 
                                                    [c3, c2, c1]])
    const complexMatrix2 = new ComplexMatrix(3, 3, [[c1, c2, c3], 
                                                    [c1, c2, c3], 
                                                    [c1, c2, c3]])
    const complexNoImaginary = new ComplexMatrix(3, 3, [[noIm, noIm, noIm], 
                                                        [noIm, noIm, noIm], 
                                                        [noIm, noIm, noIm]])
    
    /* Logs */
    console.log(" - - - - - - - - - Basic Test - - - - - - - - -")
    console.log("Multiplication between Matrix and Matrix")
    console.log(realMatrix.mul(realMatrix2))
    console.log("\nMultiplication between ComplexMatrix and ComplexMatrix")
    console.log(complexMatrix.mul(complexMatrix2).values);
    console.log("\nMultiplication between Matrix and ComplexMatrix:")
    console.log(realMatrix.complex().mul(complexMatrix).real().values)
    console.log("\nMultiplication between Matrix and ComplexMatrix with successful transformation to Matrix:")
    console.log(realMatrix.complex().mul(complexNoImaginary).real())
}
