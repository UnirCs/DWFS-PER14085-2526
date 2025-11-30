const ImageHandler = require('./ImageHandler.js')


let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);


function ejemplo() {

  let outputPath = 'output/ejemplo.jpg';
  let pixeles = [];
  let filas = 2;
  let columnas = 2;
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    console.log("Fila: " + i);
    for (let j = 0; j < columnas; j++) {
      console.log("Columna:" + j)
      let pixel = [0, 0, 0];
      if ((i + j) % 2 === 0) {
        pixel = [255, 255, 255];
      }
      console.log("Vamos a añadir el pixel " + pixel + " a la fila " + i + " columna " + j)
      nuevaFila.push(pixel);
    }
    console.log(nuevaFila)
    pixeles.push(nuevaFila);
  }
  console.log(pixeles);
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

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

function greyConverter() {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let r = pixels[i][j][0];
      let g = pixels[i][j][1];
      let b = pixels[i][j][2];
      let avg = (r + g + b) / 3;
      pixels[i][j] = [avg, avg, avg];
    }
  }

  handler.savePixels(pixels, outputPath);
}

function blackAndWhiteConverter() {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      let r = pixels[i][j][0];
      let g = pixels[i][j][1];
      let b = pixels[i][j][2];
      let avg = (r + g + b) / 3;
      let val = avg < 128 ? 0 : 255;
      pixels[i][j] = [val, val, val];
    }
  }

  handler.savePixels(pixels, outputPath);
}

function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();

  let newPixels = [];
  for (let i = 0; i < pixels.length; i += 2) {
    let newRow = [];
    for (let j = 0; j < pixels[i].length; j += 2) {
      newRow.push(pixels[i][j]);
    }
    newPixels.push(newRow);
  }
  pixels = newPixels;

  handler.savePixels(pixels, outputPath, handler.getShape()[0] / 2, handler.getShape()[1] / 2);
}

function dimBrightness(dimFactor) {
  let outputPath = 'output/tucan_dimed.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      for (let k = 0; k < 3; k++) {
        pixels[i][j][k] /= dimFactor;
      }
    }
  }

  handler.savePixels(pixels, outputPath);
}

function invertColors() {
  let outputPath = 'output/tucan_inverse.jpg';
  let pixels = handler.getPixels();

  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      for (let k = 0; k < 3; k++) {
        pixels[i][j][k] = 255 - pixels[i][j][k];
      }
    }
  }

  handler.savePixels(pixels, outputPath);
}

function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  let pixels = [];

  for (let i = 0; i < catPixels.length; i++) {
    let newRow = [];
    for (let j = 0; j < catPixels[i].length; j++) {
      let pixel = [];
      for (let k = 0; k < 3; k++) {
        let val = (catPixels[i][j][k] * alphaFirst) + (dogPixels[i][j][k] * alphaSecond);
        pixel.push(val);
      }
      newRow.push(pixel);
    }
    pixels.push(newRow);
  }

  dogHandler.savePixels(pixels, outputPath);
}

let optionN = 5;

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