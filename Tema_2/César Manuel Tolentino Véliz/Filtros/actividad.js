const ImageHandler = require('./ImageHandler.js');

let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);

/**
 * Ejemplo de construcción de una imagen
 */
function ejemplo() {
  let outputPath = 'output/ejemplo.jpg';
  let pixeles = [];
  let filas = 2;
  let columnas = 2;
  
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    for (let j = 0; j < columnas; j++) {
      let pixel = [0, 0, 0];
      if ((i + j) % 2 === 0) {
        pixel = [255, 255, 255];
      }
      nuevaFila.push(pixel);
    }
    pixeles.push(nuevaFila);
  }
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * Función auxiliar para aplicar filtros de color
 */
function applyColorFilter(pixels, colorMask) {
  return pixels.map(row => 
    row.map(pixel => [
      pixel[0] * colorMask[0],
      pixel[1] * colorMask[1], 
      pixel[2] * colorMask[2]
    ])
  );
}

/**
 * Convierte imagen a escala de rojos
 */
function redConverter() {
  let outputPath = 'output/tucan_red.jpg';
  let pixels = handler.getPixels();
  const redPixels = applyColorFilter(pixels, [1, 0, 0]);
  handler.savePixels(redPixels, outputPath);
}

/**
 * Convierte imagen a escala de verdes
 */
function greenConverter() {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();
  const greenPixels = applyColorFilter(pixels, [0, 1, 0]);
  handler.savePixels(greenPixels, outputPath);
}

/**
 * Convierte imagen a escala de azules
 */
function blueConverter() {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();
  const bluePixels = applyColorFilter(pixels, [0, 0, 1]);
  handler.savePixels(bluePixels, outputPath);
}

/**
 * Convierte imagen a escala de grises
 */
function greyConverter() {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();
  const greyPixels = pixels.map(row =>
    row.map(pixel => {
      const average = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
      return [average, average, average];
    })
  );
  handler.savePixels(greyPixels, outputPath);
}

/**
 * Convierte imagen a blanco y negro
 */
function blackAndWhiteConverter() {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();
  const bwPixels = pixels.map(row =>
    row.map(pixel => {
      const average = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
      return average < 128 ? [0, 0, 0] : [255, 255, 255];
    })
  );
  handler.savePixels(bwPixels, outputPath);
}

/**
 * Reduce la imagen a la mitad
 */
function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();
  const [height, width] = handler.getShape();
  const scaleDownPixels = [];

  for (let row = 0; row < height; row += 2) {
    const newRow = [];
    for (let col = 0; col < width; col += 2) {
      newRow.push(pixels[row][col]);
    }
    if (newRow.length > 0) {
      scaleDownPixels.push(newRow);
    }
  }
  handler.savePixels(scaleDownPixels, outputPath);
}

/**
 * Reduce el brillo de la imagen
 */
function dimBrightness(dimFactor) {
  let outputPath = 'output/tucan_dimed.jpg';
  let pixels = handler.getPixels();
  const dimPixels = pixels.map(row =>
    row.map(pixel => [
      Math.round(pixel[0] / dimFactor),
      Math.round(pixel[1] / dimFactor),
      Math.round(pixel[2] / dimFactor)
    ])
  );
  handler.savePixels(dimPixels, outputPath);
}

/**
 * Invierte los colores de la imagen
 */
function invertColors() {
  let outputPath = 'output/tucan_inverse.jpg';
  let pixels = handler.getPixels();
  const invertedPixels = pixels.map(row =>
    row.map(pixel => [
      255 - pixel[0],
      255 - pixel[1],
      255 - pixel[2]
    ])
  );
  handler.savePixels(invertedPixels, outputPath);
}

/**
 * Fusiona dos imágenes con factores de fusión
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  const mergedPixels = catPixels.map((row, rowIndex) =>
    row.map((pixel, colIndex) => {
      const dogPixel = dogPixels[rowIndex][colIndex];
      return [
        Math.min(255, Math.round(pixel[0] * alphaFirst + dogPixel[0] * alphaSecond)),
        Math.min(255, Math.round(pixel[1] * alphaFirst + dogPixel[1] * alphaSecond)),
        Math.min(255, Math.round(pixel[2] * alphaFirst + dogPixel[2] * alphaSecond))
      ];
    })
  );
  handler.savePixels(mergedPixels, outputPath);
}

/**
 * Programa de prueba
 */
let optionN = 0;

switch (optionN) {
  case 1: redConverter(); break;
  case 2: greenConverter(); break;
  case 3: blueConverter(); break;
  case 4: greyConverter(); break;
  case 5: blackAndWhiteConverter(); break;
  case 6: scaleDown(); break;
  case 7: dimBrightness(2); break;
  case 8: invertColors(); break;
  case 9: merge(0.3, 0.7); break;
  default: ejemplo();
}