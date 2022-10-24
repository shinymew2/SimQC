import { Drawing } from './coordinate'
import { ComplexNumber } from './complex'

class Render {
    cn: ComplexNumber;
    cn2?: ComplexNumber;
    draw: Drawing;
    algebraic: boolean = true;

    constructor(cn: ComplexNumber, cn2?: ComplexNumber) {
        this.cn = cn.algebraic();
        if (cn2) this.cn2 = cn2.algebraic();
    }

    public operation(op: number, cn: ComplexNumber, cn2?: ComplexNumber): void {
        if (op < 4) {
            if (!cn2) return;
        }
        switch(op) {
            case 0: { // add
                cn.add(cn2!);
                this.draw = new Drawing(cn.a, cn.b);
                break;
            }
            case 1: { // sub
                cn.sub(cn2!);
                this.draw = new Drawing(cn.a, cn.b);
                break;
            }
            case 2: { // mul
                cn.mul(cn2!);
                this.draw = new Drawing(cn.a, cn.b);
                break;
            }
            case 3: { // div
                cn.div(cn2!);
                this.draw = new Drawing(cn.a, cn.b);
                break;
            }
            case 4: { // con
                cn.con()
                break;
            }
            case 5: { // abs
                cn.abs()
                break;
            }
            case 6: { // change
                this.algebraic ? cn.polar() : cn.algebraic();
                this.algebraic = !this.algebraic;
                break;
            }
            default: {
                return;
            }
        }
    }
}







/*
let change = document.getElementById("changeVisual") as HTMLElement;
const form = document.querySelector("form") as HTMLFormElement;
const log = document.querySelector("#log") as HTMLElement;
let real1;
let real2;
let imag1;
let imag2;
let calcselection;
let calculated;
let calculatedPolar;
let alg = true;

form.addEventListener("submit", (event) => {
  const data = new FormData(form);
  let output = "";
  for (const entry of data) {
    calcselection = entry[1];
  };
  log.innerText = output;
  event.preventDefault();
  consoleprinter();
}, false);

change.addEventListener('click', event => {
    changeVisual();
})

function changeVisual() {
    if (calculated === undefined) {
        return;
    }
    alg = !alg;
    alg === true ? document.getElementById("calculatedValue").innerHTML= calculated : document.getElementById("calculatedValue").innerHTML = calculatedPolar;
}

function consoleprinter() {
    alg = true;
    real1 = Number(document.getElementById("real1").value);
    imag1 = Number(document.getElementById("imag1").value);
    real2 = Number(document.getElementById("real2").value);
    imag2 = Number(document.getElementById("imag2").value);
    let type1 = document.getElementById("type1").value;
    let type2 = document.getElementById("type2").value;
    if (type1 !== "algebra") {
         real1 = real1 * Math.cos(imag1);
         imag1 = real1 * Math.sin(imag1);
    }
    if (type2 !== "algebra") {
        real2 = real2 * Math.cos(imag2);
        imag2 = real2 * Math.sin(imag2);
    }
    switch(calcselection) {
        case "add": 
            addNumbers()
            break;
        case "sub": 
            subNumbers()
            break;
        case "mul": 
            mulNumbers()
            break;
        case "div": 
            divNumbers()
            break;
        case "con": 
            conNumber()
            break;
        case "abs": 
            absNumber()
            break;
        case "pol": 
            polNumber()
            break;
        default: console.log("error");
    }
}
*/