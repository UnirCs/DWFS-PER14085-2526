const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');
const imagen = document.getElementById('miImagen');

imagen.onload = function() {
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    
    ctx.drawImage(imagen, 0, 0);

    aplicarFiltroNegativo();
};

function aplicarFiltroNegativo() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        data[i]     = 255 - r;
        data[i + 1] = 255 - g;
        data[i + 2] = 255 - b;
        
    }
    
    ctx.putImageData(imageData, 0, 0);
}

function aplicarFiltroGrises() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const avg = (r + g + b) / 3;
        
        data[i]     = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    
    ctx.putImageData(imageData, 0, 0);
}