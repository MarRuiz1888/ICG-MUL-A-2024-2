
class Punto {
    #x; 
    #y; 

    constructor(x, y) { 
        this.#x = x;
        this.#y = y;
    }

    getX() { return this.#x; }
    getY() { return this.#y; }

   
    setX(x) { this.#x = x; }
    setY(y) { this.#y = y; }
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
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());

    puntos.forEach(punto => {
        ctx.lineTo(punto.getX(), punto.getY());
    });

    ctx.closePath();
    ctx.fillStyle = 'lightblue'; 
    ctx.fill(); 
    ctx.stroke(); 
}

function esConvexo() {
    let esPositivo = false;
    let esNegativo = false;

    for (let i = 0; i < puntos.length; i++) {
        const puntoAnterior = puntos[i === 0 ? puntos.length - 1 : i - 1];
        const puntoActual = puntos[i];
        const puntoSiguiente = puntos[(i + 1) % puntos.length];

        const dx1 = puntoActual.getX() - puntoAnterior.getX();
        const dy1 = puntoActual.getY() - puntoAnterior.getY();
        const dx2 = puntoSiguiente.getX() - puntoActual.getX();
        const dy2 = puntoSiguiente.getY() - puntoActual.getY();

        const cruzProducto = dx1 * dy2 - dy1 * dx2;
        if (cruzProducto > 0) esPositivo = true;
        if (cruzProducto < 0) esNegativo = true;

        if (esPositivo && esNegativo) {
            return false; 
        }
    }
    return true; 
}

console.log(esConvexo() ? "El polígono es convexo" : "El polígono es cóncavo");


function toggleCentroide() {
    const centroide = calcularCentroide();
    const svgContainer = document.getElementById('svgContainer');
    
    let svg = svgContainer.innerHTML;
    const yaVisible = svg.includes('line');

    if (yaVisible) {
        svg = svg.replace(/<line.*<\/line>/g, '');
    } else {
        puntos.forEach(punto => {
            svg += `<line x1="${centroide.getX()}" y1="${centroide.getY()}" x2="${punto.getX()}" y2="${punto.getY()}" stroke="red" />`;
        });
    }

    svgContainer.innerHTML = svg;
}

document.getElementById('toggleCentroide').addEventListener('click', toggleCentroide);
