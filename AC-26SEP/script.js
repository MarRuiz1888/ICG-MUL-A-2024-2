//Lienzo donde se dibuja
const svgCanvas = document.getElementById('svgCanvas');

// Clase Punto
class Punto {
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }
    //Representan las coordenadas del punto
    //Son privados, no se puede modificar desde fuera de la clase(encapsulamiento)
    #x;
    #y;

    get x() { return this.#x; }
    get y() { return this.#y; }

    set x(value) { this.#x = value; }
    set y(value) { this.#y = value; }
}

// Clase Línea
//linea recta definida por punto1 y punto2
class Linea {
    constructor(punto1, punto2) {
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    #punto1;
    #punto2;

    get punto1() { return this.#punto1; }
    get punto2() { return this.#punto2; }

    // Algoritmo de Bresenham para calcular los puntos q forman una linea recta entre punto1 y punto2
    bresenham() {
        const puntos = [];
        //Coordenadas de primer y segundo punto
        let x1 = this.#punto1.x;
        let y1 = this.#punto1.y;
        let x2 = this.#punto2.x;
        let y2 = this.#punto2.y;

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        //Inicia hasta q se alcance eol punto final

        while (true) {
            puntos.push(new Punto(x1, y1));
            if (x1 === x2 && y1 === y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return puntos;
    }

    dibujar() {
        //Llama a bresenham para obtener los puntos que forman la línea
        const puntos = this.bresenham();
        puntos.forEach(punto => {
            const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "line");
            puntoSVG.setAttribute("x1", punto.x);
            puntoSVG.setAttribute("y1", punto.y);
            puntoSVG.setAttribute("x2", punto.x);
            puntoSVG.setAttribute("y2", punto.y);
            puntoSVG.setAttribute("stroke", "black");//color
            svgCanvas.appendChild(puntoSVG);
        });
    }
}

// Clase Circunferencia
class Circunferencia {
    constructor(centro, radio) {
        this.#centro = centro;
        this.#radio = radio;
    }

    #centro;
    #radio;

    get centro() { return this.#centro; }
    get radio() { return this.#radio; }

    dibujar() {
        const circunferenciaSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferenciaSVG.setAttribute("cx", this.#centro.x);
        circunferenciaSVG.setAttribute("cy", this.#centro.y);
        circunferenciaSVG.setAttribute("r", this.#radio);
        circunferenciaSVG.setAttribute("stroke", "black");
        circunferenciaSVG.setAttribute("fill", "none");
        svgCanvas.appendChild(circunferenciaSVG);
    }
}

// Clase Elipse
class Elipse {
    constructor(centro, a, b) {
        this.#centro = centro;
        this.#a = a;
        this.#b = b;
    }

    #centro;
    #a;
    #b;

    get centro() { return this.#centro; }
    get a() { return this.#a; }
    get b() { return this.#b; }

    dibujar() {
        const elipseSVG = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipseSVG.setAttribute("cx", this.#centro.x);
        elipseSVG.setAttribute("cy", this.#centro.y);
        elipseSVG.setAttribute("rx", this.#a);
        elipseSVG.setAttribute("ry", this.#b);
        elipseSVG.setAttribute("stroke", "black");
        elipseSVG.setAttribute("fill", "none");
        svgCanvas.appendChild(elipseSVG);
    }
}

// Instanciar los puntos
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const centroCircunferencia = new Punto(300, 100);//centro circunferencia
const centroElipse = new Punto(400, 300); //crea un punto q es el centro de la elipse

// Instanciar las primitivas y dibujarlas en el SVG
const linea = new Linea(punto1, punto2);//linea entre los dos puntos
const circunferencia = new Circunferencia(centroCircunferencia, 50); //circunferencia con radio de 50
const elipse = new Elipse(centroElipse, 80, 50);//elipse con radio en eje x es 80 y eje y es 50

// Dibujar en formato SVG
linea.dibujar();
circunferencia.dibujar();
elipse.dibujar();
