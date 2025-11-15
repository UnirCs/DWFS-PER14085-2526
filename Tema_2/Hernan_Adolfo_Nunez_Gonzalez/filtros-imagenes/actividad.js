//=====================================
//🖼️ UNIR - FILTROS DE IMÁGENES
//Archivo: actividad.js
//=====================================

const ImageHandler = require('./ImageHandler.js');

// Ruta de imagen base
const path = 'input/tucan.jpg';
const handler = new ImageHandler(path);

/**
* Ejemplo de construcción de una imagen.
*/
function ejemplo() {
  const outputPath = 'output/ejemplo.jpg';
  const pixeles = [];
  const filas = 2;
  const columnas = 2;

  for (let i = 0; i < filas; i++) {
    const nuevaFila = [];
    for (let j = 0; j < columnas; j++) {
      const pixel = (i + j) % 2 === 0 ? [255, 255, 255] : [0, 0, 0]; // R G B
      nuevaFila.push(pixel);
    }
    pixeles.push(nuevaFila);
  }

  handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * Escala de rojos
 */
function redConverter() {
  const outputPath = 'output/tucan_red.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape(); // Orden coherente con ImageHandler
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [r] = pixels[i][j];
      newRow.push([r, 0, 0]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Escala de verdes
 */
function greenConverter() {
  const outputPath = 'output/tucan_green.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [, g] = pixels[i][j];
      newRow.push([0, g, 0]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Escala de azules
 */
function blueConverter() {
  const outputPath = 'output/tucan_blue.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [, , b] = pixels[i][j];
      newRow.push([0, 0, b]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Escala de grises
 */
function greyConverter() {
  const outputPath = 'output/tucan_grey.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [r, g, b] = pixels[i][j];
      const avg = Math.round((r + g + b) / 3);
      newRow.push([avg, avg, avg]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Blanco y negro
 */
function blackAndWhiteConverter() {
  const outputPath = 'output/tucan_black_and_white.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [r, g, b] = pixels[i][j];
      const avg = (r + g + b) / 3;
      const value = avg < 128 ? 0 : 255;
      newRow.push([value, value, value]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Reducción a la mitad
 */
function scaleDown() {
  const outputPath = 'output/tucan_scale_down.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i += 2) {
    const newRow = [];
    for (let j = 0; j < height; j += 2) {
      newRow.push(pixels[i][j]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, Math.floor(width / 2), Math.floor(height / 2));
}

/**
 * Reducir brillo
 */
function dimBrightness(dimFactor) {
  const outputPath = 'output/tucan_dimed.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [r, g, b] = pixels[i][j];
      newRow.push([
        Math.round(r / dimFactor),
        Math.round(g / dimFactor),
        Math.round(b / dimFactor),
      ]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Invertir colores
 */
function invertColors() {
  const outputPath = 'output/tucan_inverse.jpg';
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [r, g, b] = pixels[i][j];
      newRow.push([255 - r, 255 - g, 255 - b]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Fusionar imágenes
 */
function merge(alphaFirst, alphaSecond) {
  const catHandler = new ImageHandler('input/cat.jpg');
  const dogHandler = new ImageHandler('input/dog.jpg');
  const outputPath = 'output/merged.jpg';

  const catPixels = catHandler.getPixels();
  const dogPixels = dogHandler.getPixels();
  const [width, height] = catHandler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      const [r1, g1, b1] = catPixels[i][j];
      const [r2, g2, b2] = dogPixels[i][j];
      newRow.push([
        Math.round(r1 * alphaFirst + r2 * alphaSecond),
        Math.round(g1 * alphaFirst + g2 * alphaSecond),
        Math.round(b1 * alphaFirst + b2 * alphaSecond),
      ]);
    }
    newPixels.push(newRow);
  }

  dogHandler.savePixels(newPixels, outputPath, width, height);
}

/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 */
const optionN = 9;

for (let i = 1; i <= optionN; i++) {
  switch (i) {
    case 1: redConverter(); break;
    case 2: greenConverter(); break;
    case 3: blueConverter(); break;
    case 4: greyConverter(); break;
    case 5: blackAndWhiteConverter(); break;
    case 6: scaleDown(); break;
    case 7: dimBrightness(2); break;
    case 8: invertColors(); break;
    case 9: merge(0.3, 0.7); break;
    default: ejemplo(); break;
  }
}