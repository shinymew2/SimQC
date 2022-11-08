# Die zeitabhängige Schrödinger-Gleichung im eindimensionalen Raum: $i\hbar\frac{\partial\psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}+V\psi$

## Einleitung
Die zeitabhängige Schrödinger-Gleichung kann nicht aus der mechanischen Physik hergeleitet werden. Sie ist damit die zentrale Grundgleichung der nichtrelativistischen Quantenmechanik. Mit ihr kann die räumliche und die zeitliche Entwicklung eines Quantensystems beschrieben werden [[1](https://www.chemie.de/lexikon/Schr%C3%B6dingergleichung.html)].


## Herleitung und Erklärung
Die einfachste Form der _zeitunabhängigen_ Schrödinger-Gleichung kann wie folgt beschrieben werden:
    
$E\Psi=\hat{H}\Psi$

Da die Gesamtenergie $E$ eines Systems gleich dem Eigenwert des Operators $i\hbar\frac{\partial}{\partial t}$ ist [[2](https://www.chemie.uni-bonn.de/pctc/mulliken-center/teaching/tc-i/Vorlesung_05.pdf)], folgt aus

$E\Psi=i\hbar\frac{\partial}{\partial t}$ *und* $E\Psi=\hat{H}\Psi$

die einfachste Form der _zeitabhängigen_ Schrödinger-Gleichung:

$i\hbar\frac{\partial}{\partial t}\Psi=\hat{H}\Psi$

Der Hamilton-Operator kann auch wie folgt beschrieben werden:

$\hat{H}=-\frac{\hbar^2}{2m}\nabla^2+V$

Setzt man diesen Term ein, bildet sich langsam die bekannte Form der Schrödinger-Gleichung:

$i\hbar\frac{\partial\Psi}{\partial t} = (-\frac{\hbar^2}{2m}\nabla^2+V)\Psi$

Ausmultipliziert man $\Psi$ kommt man auf die Gleichung:

$i\hbar\frac{\partial\Psi}{\partial t} = -\frac{\hbar^2}{2m}\nabla^2\Psi+V\Psi$

Durch ersetzen des Laplace-Operators (hier: quadriertes Nabla $\nabla^2$) führt man die Gleichung in den eindimensionalen Raum:

$i\hbar\frac{\partial\psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\psi}{\partial x^2}+V\psi$

Falls die Zeichen in der Gleichung nicht bekannt sind:
- $i$ ist die imaginäre Einheit
- $\hbar$ ist das reduzierte Plancksche Wirkungsquantum
- $t$ ist die Zeit
- $x$ ist der Ort an der x-Achse (eindimensional)
- $\Psi$ oder $\psi$ ist die Wellenfunktion; bezeichnet auch den Zustand des betrachteten Teilchens
- $V$ ist die potenzielle Energie
- $\frac{\partial}{\partial}$ beschreibt die partielle Ableitung (in der Gleichung: partielle Ableitung von $\Psi$ nach $t$ und partielle Ableitung zweiten Grades von $\Psi$ nach $x$)

## Von Gleichung zu Code
Wir möchten nachvollziehen, wie man von der beschriebenen zeitabhängigen Schrödinger-Gleichung zu einem Code-Fragment kommt, welches genau diese beschreibt. Hierbei berufen wir uns auf die Ausarbeitung von Hugo Martay [[3](http://www.articlesbyaphysicist.com/quantum4prog.html)].

Hugo arbeitet in seinem Code mit der Schrödinger-Gleichung im eindimensionalen Raum mit einem harmonischen Potential:

$i\frac{\partial\psi}{\partial t} = -\frac{\partial^2\psi}{\partial x^2}+ax^2\psi$

Hier fehlt im Vergleich zu unser hergeleiteten Schrödinger-Gleichung links $\hbar$ und rechts $\frac{\hbar^2}{2m}$. Auch wurde $V$ durch $ax^2$ ersetzt. 

    Diese Gleichung ist die Gleiche wie davor und nur anders, weil ein harmonisches Potential vorhanden ist.

Weil wir mit der Gleichung immer nur ein $t$ einsetzen können, brauchen wir eine Funktion, die uns in der Zeit voranbringt.

Hugo arbeitet hier mit einer _timestep_-Funktion, die die Simulation vorantreibt. 

Hierbei ist $\psi_0$ die Wellenfunktion vor dem Timestep. Zunächst wird darauf der Timestep der potentiellen Energie angewandt. Dieser beruht auf der Gleichung $i\frac{\partial\psi}{\partial t}=ax^2\psi$:

$\hbox{Timestep}_V(\psi)=e^{-iax^2\delta t}\psi$

Das resultierende Ergebnis ist $\psi_1$, was wiederum auf die Timestep-Funktion der kinetischen Energie angewandt wird. Dieser beruht auf der Gleichung $i\frac{\partial\psi}{\partial t}=\frac{\partial^2}{\partial x^2}\psi$. Wenn wir annehmen, dass $\psi = e^{ikx}$ gilt:

$\hbox{Timestep}_T(\psi)=e^{-ik^2\delta t}\psi$

Jetzt erhalten wird unsere für diesen Timestep engültige Wellenfunktion $\psi_2$. Diese Prozedur wird wiederholt, wodurch sich die Welle kontinuierlich ändert und man eine Visualisierung zustandebringen kann.

---
### Quellen
- [1] https://www.chemie.de/lexikon/Schr%C3%B6dingergleichung.html
- [2] https://www.chemie.uni-bonn.de/pctc/mulliken-center/teaching/tc-i/Vorlesung_05.pdf
- [3] http://www.articlesbyaphysicist.com/quantum4prog.html