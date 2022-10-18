let change = document.getElementById("changeVisual");
const form = document.querySelector("form");
const log = document.querySelector("#log");
let real1;
let real2;
let imag1;
let imag2;
let calcselection;
let calculated;
let calculatedPolar;
let alg = true;

// GUI METHODS

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
    alg === true ? document.getElementById("calculatedValue").innerHTML = calculated : document.getElementById("calculatedValue").innerHTML = calculatedPolar;
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

// COMPLEX NUMBER

function complex(re, im) {
    this['re'] = re
    this['im'] = im
}

complex.prototype = {
    're': 0,
    'im': 0,

    // add two complex numbers
    'add': function(re, im) {
        var num = new complex(re, im);

        return new complex(
            this['re'] + num['re'],
            this['im'] + num['im']
        );
    },

    // subtract two complex numbers
    'sub': function(re, im) {
        var num = new complex(re, im);

        return new complex(
            this['re'] - num['re'],
            this['im'] - num['im']
        );
    },

    // multiply two complex numbers
    'mul': function(re, im) {
        var num = new complex(re, im);

        return new complex(
            this['re'] * num['re'] - this['im'] * num['im'],
            this['re'] * num['im'] + this['im'] * num['re']
        );
    },

    // divide two complex numbers
    'div': function(re, im) {
        var num = new complex(re, im);

        return new complex(
            (this['re'] * num['re'] + this['im'] * num['im']) / (Math.pow(num['re'], 2) + Math.pow(num['im'], 2)),
            (this['im'] * num['re'] - this['re'] * num['im']) / (Math.pow(num['re'], 2) + Math.pow(num['im'], 2))
        );
    },

    // conjugate a complex number
    'conj': function() {
        return new complex(this['re'], -this['im'])
    },

    // get absolute value of a complex number
    'abs': function() {
        return Math.abs(Math.sqrt(Math.pow(this['re'], 2) + Math.pow(this['im'], 2)))
    },

    // compare two complex numbers
    'almostEquals': function(re, im) {
        var num = new complex(re, im);

        return Math.abs(num['re'] - this['re']) <= EPSILON && Math.abs(num['im'] - this['im']) <= EPSILON
    }
}

// CALCULATION METHODS

function addNumbers() {
    let addedReal = real1 + real2;
    let addedImag = imag1 + imag2;
    printer(addedReal, addedImag);
}

function subNumbers() {
    let subtractedReal = real1 - real2;
    let subtractedImag = imag1 - imag2;
    printer(subtractedReal, subtractedImag);
    
}

function mulNumbers() {
    let multipliedReal = ((real1 * real2) - (imag1 * imag2));
    let multipliedImag = ((real1 * imag2) + (imag1 * real2));
    printer(multipliedReal, multipliedImag);
}

function divNumbers() {
    let divisedReal = ((real1 * real2) + (imag1 * imag2)) / (Math.pow(real2, 2) + Math.pow(imag2, 2));
    let divisedImag = ((imag1 * real2) - (real1 * imag2)) / (Math.pow(real2, 2) + Math.pow(imag2, 2));
    printer(divisedReal, divisedImag);
}

function conNumber() {
    let conjugatedImag = -1 * imag1;
    printer(real1, conjugatedImag);
}

function absNumber() {
    document.getElementById("calculatedValue").innerHTML = calculated = calculatedPolar = Math.abs(Math.sqrt(Math.pow(real1, 2) + Math.pow(imag1, 2)));
}

function polNumber() {
    printer(real1, imag1);
}

function printer1(real) {
    calculated = calculatedPolar = real;
    document.getElementById("calculatedValue").innerHTML = calculated;
}

function printer(real, imag) {
    calculated = real + (imag >= 0 ? " + " : "") + imag + "i";
    calculatedPolar = Math.abs(Math.sqrt(Math.pow(real, 2) + Math.pow(imag, 2))) + " &#x2219; e<sup>i &#x2219; " + Math.atan2(real, imag) + "</sup>";
    if (type1.value === "algebra") {
        document.getElementById("calculatedValue").innerHTML = calculated;
        return;
    }
    alg = !alg;
    document.getElementById("calculatedValue").innerHTML = calculatedPolar;
}

function isAlmostEqual() {

}
