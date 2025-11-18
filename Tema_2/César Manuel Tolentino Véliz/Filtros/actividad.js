const ImageHandler = require('./ImageHandler.js');

let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);

/**
 * Ejemplo
 */
function ejemplo() {
  let outputPath = 'output/ejemplo.jpg';
  let pixeles = [];
  let filas = 2;
  let columnas = 2;

  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    for (let j = 0; j < columnas; j++) {
      let pixel = ((i + j) % 2 === 0) ? [255,255,255] : [0,0,0];
      nuevaFila.push(pixel);
    }
    pixeles.push(nuevaFila);
  }

  handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * ROJO
 */
function redConverter() {
  let outputPath = 'output/tucan_red.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      pixels[i][j][1] = 0;
      pixels[i][j][2] = 0;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * VERDE
 */
function greenConverter() {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      pixels[i][j][0] = 0;
      pixels[i][j][2] = 0;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * AZUL
 */
function blueConverter() {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      pixels[i][j][0] = 0;
      pixels[i][j][1] = 0;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * GRISES
 */
function greyConverter() {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let p = pixels[i][j];
      let avg = (p[0] + p[1] + p[2]) / 3;
      pixels[i][j] = [avg, avg, avg];
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * BLANCO Y NEGRO
 */
function blackAndWhiteConverter() {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let p = pixels[i][j];
      let avg = (p[0] + p[1] + p[2]) / 3;

      pixels[i][j] = avg < 128 ? [0,0,0] : [255,255,255];
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * REDUCIR MITAD
 */
function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();

  let nueva = [];

  for (let i = 0; i < pixels.length; i += 2) {
    let fila = [];
    for (let j = 0; j < pixels[i].length; j += 2) {
      fila.push(pixels[i][j]);
    }
    nueva.push(fila);
  }

  handler.savePixels(nueva, outputPath, nueva.length, nueva[0].length);
}

/**
 * REDUCIR BRILLO
 */
function dimBrightness(dimFactor) {
  let outputPath = 'output/tucan_dimed.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      pixels[i][j][0] /= dimFactor;
      pixels[i][j][1] /= dimFactor;
      pixels[i][j][2] /= dimFactor;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * INVERTIR COLORES
 */
function invertColors() {
  let outputPath = 'output/tucan_inverse.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let p = pixels[i][j];
      pixels[i][j] = [
        255 - p[0],
        255 - p[1],
        255 - p[2]
      ];
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * MERGE
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');

  let outputPath = 'output/merged.jpg';
  let cat = catHandler.getPixels();
  let dog = dogHandler.getPixels();

  let pixels = [];

  for (let i = 0; i < cat.length; i++) {
    let fila = [];
    for (let j = 0; j < cat[i].length; j++) {
      fila.push([
        cat[i][j][0] * alphaFirst + dog[i][j][0] * alphaSecond,
        cat[i][j][1] * alphaFirst + dog[i][j][1] * alphaSecond,
        cat[i][j][2] * alphaFirst + dog[i][j][2] * alphaSecond
      ]);
    }
    pixels.push(fila);
  }

  dogHandler.savePixels(pixels, outputPath);
}

/**
 * Programa
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
