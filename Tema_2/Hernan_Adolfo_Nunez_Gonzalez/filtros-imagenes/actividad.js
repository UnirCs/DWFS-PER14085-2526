//=====================================
//🖼️ UNIR - FILTROS DE IMÁGENES.
//Archivo: actividad.js
//=====================================

const ImageHandler = require('./ImageHandler.js');

// Ruta de imagen base
const path = 'input/tucan.jpg';
const handler = new ImageHandler(path);

/**
 * 🔧 Función genérica para aplicar transformaciones de color.
 * Centraliza la lógica de recorrido de pixeles y elimina duplicación.
 */
function applyFilter(outputPath, transformFn) {
  const pixels = handler.getPixels();
  const [width, height] = handler.getShape();
  const newPixels = [];

  for (let i = 0; i < width; i++) {
    const newRow = [];
    for (let j = 0; j < height; j++) {
      newRow.push(transformFn(pixels[i][j]));
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, width, height);
}

/**
* 🧩 Ejemplo de construcción de una imagen.
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
 * 🔴 Escala de rojos
 */
function redConverter() {
  applyFilter('output/tucan_red.jpg', ([r]) => [r, 0, 0]);
}

/**
 * 🟢 Escala de verdes
 */
function greenConverter() {
  applyFilter('output/tucan_green.jpg', ([, g]) => [0, g, 0]);
}

/**
 * 🔵 Escala de azules
 */
function blueConverter() {
  applyFilter('output/tucan_blue.jpg', ([,, b]) => [0, 0, b]);
}

/**
 * ⚫ Escala de grises
 */
function greyConverter() {
  applyFilter('output/tucan_grey.jpg', ([r, g, b]) => {
    const avg = Math.round((r + g + b) / 3);
    return [avg, avg, avg];
  });
}

/**
 * ⚪ Blanco y negro
 */
function blackAndWhiteConverter() {
  applyFilter('output/tucan_black_and_white.jpg', ([r, g, b]) => {
    const avg = (r + g + b) / 3;
    const value = avg < 128 ? 0 : 255;
    return [value, value, value];
  });
}

/**
 * 💡 Reducir brillo
 */
function dimBrightness(dimFactor) {
  applyFilter('output/tucan_dimed.jpg', ([r, g, b]) => [
    Math.round(r / dimFactor),
    Math.round(g / dimFactor),
    Math.round(b / dimFactor),
  ]);
}

/**
 * 🌈 Invertir colores
 */
function invertColors() {
  applyFilter('output/tucan_inverse.jpg', ([r, g, b]) => [
    255 - r,
    255 - g,
    255 - b,
  ]);
}

/**
 * 🔽 Reducción a la mitad
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
 * 🐱🐶 Fusionar imágenes
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
* 🧪 Programa de prueba
* NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO.
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