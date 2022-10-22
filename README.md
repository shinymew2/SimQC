# Simulation von Quantencomputern und ihren Grundlagen - Lucas Weißmann
This is a Repo for the Course "Simulation von Quantencomputern und ihren Grundlagen" at THM for the winter term 2022/2023. 

## Complex Numbers
In order to approach quantum computing we started coding a library for complex numbers. It contains basic arithmetic operators but also conjugate and the absolute value while also supporting the polar form besides the algebraic form.

The goal was to incorporate the idea of conceptual programming, which in short means that you want to tell a narrative with your code. At first it wasn't easy getting into that mindset and understanding what conceptual programming is but after a while it worked really well. 

The first iteration was written in JavaScript, at the beginning it was kept rather simple but when trying to incorporate conceptual programming, it turned out that JavaScript is rather unsuitable for this since dynamic typing and the missing option of records made it difficult to create the complex number datatype. After moving to TypeScript it was really easy to do conceptual programming and you could reduce the complexity while also removing unnecessary lines of code.
