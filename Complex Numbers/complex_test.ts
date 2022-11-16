import { ComplexNumber, ComplexAlgebraic, ComplexPolar } from './complex';

//test()

function test(): void {
    const cn1: ComplexNumber = new ComplexAlgebraic(-0.95766, -0.28790)
    const cn2: ComplexNumber = new ComplexPolar(1, 16)
    //const cn3: ComplexNumber = cn1.polar() // algebraic to polar
    //const cn4: ComplexNumber = cn2.algebraic() // polar to algebraic

    console.log("ComplexAlgebraic: ")
    console.log(cn1)
    console.log("\nComplexAlgebraic to ComplexPolar: ")
    console.log(cn1.polar())
    console.log("\nComplexPolar: ")
    console.log(cn2)
    console.log("\nComplexPolar to ComplexAlgebraic:")
    console.log(cn2.algebraic())
    // console.log("\nComplexAlgebraic to ComplexPolar: ")
    // console.log(cn3)
    // console.log("\nComplexPolar to ComplexAlgebraic: ")
    // console.log(cn4)
}