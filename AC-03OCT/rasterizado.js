const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function dibujarPoligonoRasterizado() {
    ctx.beginPath();
    ctx.moveTo(puntos[0].getX(), puntos[0].getY());
    
    puntos.forEach(punto => {
        ctx.lineTo(punto.getX(), punto.getY());
    });
    
    ctx.closePath();
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.stroke();
}

dibujarPoligonoRasterizado();
