/*
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// real values
var x_real = -123;
var y_real = 5123;
var r_real = Math.sqrt(x_real * x_real + y_real * y_real);

// helper values to display into coordinate system
var x = x_real > 200 ? x_real / (x_real / 200) : x_real;
var x = x_real < -200 ? -x_real / (x_real / 200) : x;
var y = y_real > 100 ? y_real / (y_real / 100) : y_real;
var y = y_real < -100 ? -y_real / (y_real / 100) : y;
var r = Math.sqrt(x * x + y * y);
var phi = Math.acos(x / r) * (180 / Math.PI);

// x and y axis
ctx.moveTo(0, c.height / 2);
ctx.lineTo(c.width, c.height / 2);
ctx.stroke();
ctx.moveTo(c.width / 2, 0);
ctx.lineTo(c.width / 2, c.height);
ctx.stroke();

// line to the coordinate
ctx.moveTo(c.width / 2, c.height / 2);
ctx.lineTo((c.width / 2) + x, (c.height / 2) - y);
ctx.stroke();
// point at the coordinate
ctx.beginPath();
ctx.arc((c.width / 2) + x, (c.height / 2) - y, 2, 0, 2 * Math.PI);
ctx.fill();

// value on the x axis
ctx.moveTo((c.width / 2) + x, (c.height / 2) - (c.height / 50));
ctx.lineTo((c.width / 2) + x, (c.height / 2) + (c.height / 50));
ctx.stroke();
// x-value text
ctx.font = "10px Arial";
ctx.fillText(x_real, (c.width / 2) + x - 8, (c.height / 2) + (c.height / 40) + 8);
// value on the y axis
ctx.moveTo((c.width / 2) - (c.width / 90), (c.height / 2) - y);
ctx.lineTo((c.width / 2) + (c.width / 90), (c.height / 2) - y);
ctx.stroke();
// y-value text
ctx.font = "10px Arial";
ctx.fillText(y_real, (c.width / 2) - (c.width / 70) + 15, (c.height / 2) - y + 4);

// r-value text
ctx.font = "10px Arial";
ctx.fillText("r = " + r_real.toFixed(2), (c.width / 2) + x - 10, (c.height / 2) - y - 5);
// circle with the radius phi
ctx.beginPath();
console.log(phi)
if (y < 0) ctx.arc(c.width / 2, c.height / 2, r / 2, 0, phi * (Math.PI / 180));
else ctx.arc(c.width / 2, c.height / 2, r / 4, (360 - phi) * (Math.PI / 180), 0);
ctx.stroke()
// phi-value text
ctx.font = "10px Arial";
console.log(phi * (Math.PI / 180))
if (x < 0 && y < 0) ctx.fillText("-" + phi.toFixed(2) + "°", (c.width / 2) + (r / 8), c.height / 2 - 10);
else if (x < 0) ctx.fillText(phi.toFixed(2) + "°", (c.width / 2) + (r / 8), c.height / 2 + 15);
else if (y < 0) ctx.fillText("-" + phi.toFixed(2) + "°", (c.width / 2) + (r / 8), c.height / 2 - 10);
else ctx.fillText(phi.toFixed(2) + "°", (c.width / 2) + (r / 8), c.height / 2 + 15);
*/