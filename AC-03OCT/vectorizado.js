class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }
}

const puntos = [];

function PuntosAleatorios(n) {
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        puntos.push(new Punto(x, y));
    }
}

function CruceLineas() {
    const puntoBase = puntos.reduce((min, punto) => {
        if (punto.getY() < min.getY() || (punto.getY() === min.getY() && punto.getX() < min.getX())) {
            return punto;
        }
        return min;
    });

    puntos.sort((a, b) => {
        const anguloA = Math.atan2(a.getY() - puntoBase.getY(), a.getX() - puntoBase.getX());
        const anguloB = Math.atan2(b.getY() - puntoBase.getY(), b.getX() - puntoBase.getX());
        return anguloA - anguloB;
    });
}

function Dibujar() {
    const svg = document.getElementById('svgCanvas');
    svg.innerHTML = ''; 

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const points = puntos.map(p => `${p.getX()},${p.getY()}`).join(' '); 
    polygon.setAttribute('points', points);
    polygon.setAttribute('fill', 'lightblue');
    polygon.setAttribute('stroke', 'black');

    svg.appendChild(polygon);
}

function Centroide() {
    let xTotal = 0, yTotal = 0;

    puntos.forEach(punto => {
        xTotal += punto.getX();
        yTotal += punto.getY();
    });

    const centroide = new Punto(xTotal / puntos.length, yTotal / puntos.length);
    return centroide;
}

let mostrarCentroide = false;

function toggleCentroide() {
    mostrarCentroide = !mostrarCentroide; 
    Dibujar(); 

    if (mostrarCentroide) {
        const svg = document.getElementById('svgCanvas');
        const centroide = Centroide();

        
        puntos.forEach(punto => {
            const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            linea.setAttribute('x1', centroide.getX());
            linea.setAttribute('y1', centroide.getY());
            linea.setAttribute('x2', punto.getX());
            linea.setAttribute('y2', punto.getY());
            linea.setAttribute('stroke', 'purple');
            svg.appendChild(linea);
        });

        
        const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circulo.setAttribute('cx', centroide.getX());
        circulo.setAttribute('cy', centroide.getY());
        circulo.setAttribute('r', 5);
        circulo.setAttribute('fill', 'red');
        svg.appendChild(circulo);
    }
}
