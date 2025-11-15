function aplicarFiltros() {
  const img = document.getElementById("original");
  const canvases = {
    red: document.getElementById("canvasRed"),
    green: document.getElementById("canvasGreen"),
    blue: document.getElementById("canvasBlue"),
    gray: document.getElementById("canvasGray"),
    bw: document.getElementById("canvasBW"),
    invert: document.getElementById("canvasInvert")
  };

  // Crear un canvas temporal para obtener los píxeles base
  const tempCanvas = document.createElement("canvas");
  const ctxTemp = tempCanvas.getContext("2d");
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;
  ctxTemp.drawImage(img, 0, 0, img.width, img.height);
  const imageData = ctxTemp.getImageData(0, 0, img.width, img.height);
  const pixels = imageData.data;

  // Aplicar filtros
  aplicarFiltroColor(canvases.red, pixels, img, "red");
  aplicarFiltroColor(canvases.green, pixels, img, "green");
  aplicarFiltroColor(canvases.blue, pixels, img, "blue");
  aplicarFiltroGris(canvases.gray, pixels, img);
  aplicarFiltroBN(canvases.bw, pixels, img);
  aplicarFiltroInvertido(canvases.invert, pixels, img);
}

function aplicarFiltroColor(canvas, pixels, img, color) {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  const newPixels = new Uint8ClampedArray(pixels);
  for (let i = 0; i < newPixels.length; i += 4) {
    if (color === "red") { newPixels[i+1] = 0; newPixels[i+2] = 0; }
    if (color === "green") { newPixels[i] = 0; newPixels[i+2] = 0; }
    if (color === "blue") { newPixels[i] = 0; newPixels[i+1] = 0; }
  }

  const newImageData = new ImageData(newPixels, img.width, img.height);
  ctx.putImageData(newImageData, 0, 0);
}

function aplicarFiltroGris(canvas, pixels, img) {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  const newPixels = new Uint8ClampedArray(pixels);
  for (let i = 0; i < newPixels.length; i += 4) {
    const avg = (newPixels[i] + newPixels[i+1] + newPixels[i+2]) / 3;
    newPixels[i] = newPixels[i+1] = newPixels[i+2] = avg;
  }

  ctx.putImageData(new ImageData(newPixels, img.width, img.height), 0, 0);
}

function aplicarFiltroBN(canvas, pixels, img) {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  const newPixels = new Uint8ClampedArray(pixels);
  for (let i = 0; i < newPixels.length; i += 4) {
    const avg = (newPixels[i] + newPixels[i+1] + newPixels[i+2]) / 3;
    const val = avg < 128 ? 0 : 255;
    newPixels[i] = newPixels[i+1] = newPixels[i+2] = val;
  }

  ctx.putImageData(new ImageData(newPixels, img.width, img.height), 0, 0);
}

function aplicarFiltroInvertido(canvas, pixels, img) {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  const newPixels = new Uint8ClampedArray(pixels);
  for (let i = 0; i < newPixels.length; i += 4) {
    newPixels[i] = 255 - newPixels[i];
    newPixels[i+1] = 255 - newPixels[i+1];
    newPixels[i+2] = 255 - newPixels[i+2];
  }

  ctx.putImageData(new ImageData(newPixels, img.width, img.height), 0, 0);
}
