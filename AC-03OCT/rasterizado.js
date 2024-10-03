class Punto {
    // Variables privadas
    #x;
    #y;

    // inicializa las coordenadas del punto
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

// para almacenar los puntoa
const puntos = [];

// funcion genera puntos al azar en el canvas
function PuntosAleatorios(n) {
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        puntos.push(new Punto(x, y)); // se crea un nuevo punto al azar 
    }
}

// funcion ordana los puntos para q las lines no se crucen entre si
function CruceLineas() {
    const puntoBase = puntos.reduce((min, punto) => {
        if (punto.getY() < min.getY() || (punto.getY() === min.getY() && punto.getX() < min.getX())) {
            return punto;
        }
        return min;
    });

    // coge el punto con la menor coordenada y organiza los demas segun su angulo
    puntos.sort((a, b) => {
        const anguloA = Math.atan2(a.getY() - puntoBase.getY(), a.getX() - puntoBase.getX());
        const anguloB = Math.atan2(b.getY() - puntoBase.getY(), b.getX() - puntoBase.getX());
        return anguloA - anguloB;
    });
}

// dibuja la figura
function Dibujar() {
    const canvas = document.getElementById('canvas'); 
    const ctx = canvas.getContext('2d'); 

    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas antes de dibujar

    ctx.beginPath(); // inicia a dibujar
    ctx.moveTo(puntos[0].getX(), puntos[0].getY()); // se mueve al primer punto

    // empieza a dibujar las lineas de la figura
    puntos.forEach(punto => {
        ctx.lineTo(punto.getX(), punto.getY());
    });

    ctx.closePath(); // termina la figura
    ctx.fillStyle = 'lightblue'; // color de relleno
    ctx.fill(); // lo rellena
    ctx.stroke(); // hace el borde
}

//Funcion para encontrar el centro de la figura (centroide)
function Centroide() {
    let xTotal = 0, yTotal = 0;

    // suma x y y de todos los puntos
    puntos.forEach(punto => {
        xTotal += punto.getX();
        yTotal += punto.getY();
    });

    // y le saca el promedio
    const centroide = new Punto(xTotal / puntos.length, yTotal / puntos.length);
    return centroide;
}

// esta variable controla si el centro y las lineas q lo unen se ven 
let mostrarCentroide = false;

// Funcion para saber si se ve o no, el centro y sus lineas
function toggleCentroide() {
    mostrarCentroide = !mostrarCentroide; // se invierte la muiestra

    Dibujar(); 

    if (mostrarCentroide) {
        const centroide = Centroide(); // calcula el centro
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // dibuja lineas del centro a los demas puntos
        puntos.forEach(punto => {
            ctx.beginPath();
            ctx.moveTo(centroide.getX(), centroide.getY());
            ctx.lineTo(punto.getX(), punto.getY());
            ctx.strokeStyle = 'purple';
            ctx.stroke();
        });

        // dinuja el centro como un punto rojo
        ctx.beginPath();
        ctx.arc(centroide.getX(), centroide.getY(), 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}

// asocia la funcion al boton para q se ejecute al hacer clic
document.getElementById('toggleCentroide').addEventListener('click', toggleCentroide);

// funcionq mira si es convexo o concavo
function Convexo() {
    let Positivo = false; // variable pa ver si se detectan angulos em semtido antihorario
    let Negativo = false; // lo mismo pero horario

    // recorre todos los puntos
    for (let i = 0; i < puntos.length; i++) {
        const puntoAnter = puntos[i === 0 ? puntos.length - 1 : i - 1]; // punto anterior
        const puntoActual = puntos[i]; // Punto actual
        const puntoSiguiente = puntos[(i + 1) % puntos.length]; // punto siguiente

        // diferentes entre x y y de los puntos
        const dx1 = puntoActual.getX() - puntoAnter.getX();
        const dy1 = puntoActual.getY() - puntoAnter.getY();
        const dx2 = puntoSiguiente.getX() - puntoActual.getX();
        const dy2 = puntoSiguiente.getY() - puntoActual.getY();

        // product cruz entre los vectores
        const Productocruz = dx1 * dy2 - dy1 * dx2;
        if (Productocruz > 0) Positivo = true; // positivo, giro antihorario
        if (Productocruz < 0) Negativo = true; // negativo, horario

        //si tiene giro horaio y antihorario en concavo
        if (Positivo && Negativo) {
            return false; 
        }
    }
    return true; //si tyodos los giros son para un lado, es convexo
}

// funcion muestra si es concavo o conevxo
function mostrarTipo() {
    const tipoPoligono = Convexo() ? "El polígono es convexo" : "El polígono es cóncavo";
    document.getElementById('infoTipoPoligono').textContent = tipoPoligono; 
}

// cuando la pagina carga, se ejecutan estas funciones
window.onload = function() {
    PuntosAleatorios(6); // hace 6 puntos al azar
    CruceLineas(); // evita cruzar lineas
    Dibujar(); //dibuja
    mostrarTipo(); // concavo o cnevxo
};
