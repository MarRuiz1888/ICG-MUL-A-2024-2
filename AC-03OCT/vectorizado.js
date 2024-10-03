const puntos = [
    new Punto(100, 100),
    new Punto(200, 100),
    new Punto(250, 200),
    new Punto(150, 250),
    new Punto(50, 200)
];

function dibujarPoligono() {
    const svgContainer = document.getElementById('svgContainer');
    let svg = `<svg width="400" height="400">`;

    svg += `<polygon points="`;

    puntos.forEach(punto => {
        svg += `${punto.getX()},${punto.getY()} `;
    });

    svg += `" style="fill:lightblue;stroke:black;stroke-width:2" />`;
    svg += `</svg>`;

    svgContainer.innerHTML = svg;
}

function calcularCentroide() {
    let xTotal = 0, yTotal = 0;
    puntos.forEach(punto => {
        xTotal += punto.getX();
        yTotal += punto.getY();
    });
    const centroide = new Punto(xTotal / puntos.length, yTotal / puntos.length);
    return centroide;
}

dibujarPoligono();
