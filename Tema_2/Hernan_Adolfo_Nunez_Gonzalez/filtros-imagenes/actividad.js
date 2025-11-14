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
      let pixel = [0, 0, 0]; // R G B
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
 * Escala de rojos
 */
function redConverter() {
  let outputPath = 'output/tucan_red.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      newRow.push([r, 0, 0]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Escala de verdes
 */
function greenConverter() {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      newRow.push([0, g, 0]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Escala de azules
 */
function blueConverter() {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      newRow.push([0, 0, b]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Escala de grises
 */
function greyConverter() {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      let avg = Math.round((r + g + b) / 3);
      newRow.push([avg, avg, avg]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Blanco y negro
 */
function blackAndWhiteConverter() {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      let avg = (r + g + b) / 3;
      let value = avg < 128 ? 0 : 255;
      newRow.push([value, value, value]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Reducción a la mitad
 */
function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i += 2) {
    let newRow = [];
    for (let j = 0; j < width; j += 2) {
      newRow.push(pixels[i][j]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height / 2, width / 2);
}

/**
 * Reducir brillo
 */
function dimBrightness(dimFactor) {
  let outputPath = 'output/tucan_dimed.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      newRow.push([

        Math.round(r / dimFactor),
        Math.round(g / dimFactor),
        Math.round(b / dimFactor)
      ]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Invertir colores
 */
function invertColors() {
  let outputPath = 'output/tucan_inverse.jpg';
  let pixels = handler.getPixels();
  let [height, width] = handler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r, g, b] = pixels[i][j];
      newRow.push([255 - r, 255 - g, 255 - b]);
    }
    newPixels.push(newRow);
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Fusionar imágenes
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();
  let [height, width] = catHandler.getShape();
  let newPixels = [];

  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let [r1, g1, b1] = catPixels[i][j];
      let [r2, g2, b2] = dogPixels[i][j];
      newRow.push([
        Math.round(r1 * alphaFirst + r2 * alphaSecond),
        Math.round(g1 * alphaFirst + g2 * alphaSecond),
        Math.round(b1 * alphaFirst + b2 * alphaSecond)
      ]);
    }
    newPixels.push(newRow);
  }

  dogHandler.savePixels(newPixels, outputPath, height, width);
}


/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ apareceran los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
/*let optionN = 0;

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
}*/
let optionN = 9;

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
  }
}
