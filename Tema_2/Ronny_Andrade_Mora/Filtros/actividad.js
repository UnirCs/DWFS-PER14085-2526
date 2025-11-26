const ImageHandler = require("./ImageHandler.js");

let path = "input/tucan.jpg";
let handler = new ImageHandler(path);

/**
 * Funcion auxiliar para procesar cada pixel de una imagen
 * @param {Array} pixels - Matriz de pixeles
 * @param {Function} pixelProcessor - Funcion que procesa cada pixel (i, j, pixel)
 */
function processPixels(pixels, pixelProcessor) {
  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      pixelProcessor(i, j, pixels[i][j]);
    }
  }
}

/**
 * Funcion auxiliar para aplicar transformaciones a imagenes
 * @param {string} outputPath - Ruta donde guardar la imagen
 * @param {Function} transformation - Funcion que transforma los pixeles
 * @param {number} height - Altura opcional para redimensionar
 * @param {number} width - Ancho opcional para redimensionar
 */
function applyTransformation(outputPath, transformation, height, width) {
  let pixels = handler.getPixels();
  pixels = transformation(pixels);
  handler.savePixels(pixels, outputPath, height, width);
}

/**
 * Establece canales RGB especificos a 0
 * @param {Array} pixels - Matriz de pixeles
 * @param {Array} channelsToZero - Indices de canales a poner en 0
 */
function setChannelsToZero(pixels, channelsToZero) {
  processPixels(pixels, (i, j, pixel) => {
    channelsToZero.forEach((channel) => (pixel[channel] = 0));
  });
  return pixels;
}

/**
 * Calcula el promedio RGB de un pixel
 * @param {Array} pixel - Array [R, G, B]
 */
function getPixelAverage(pixel) {
  return (pixel[0] + pixel[1] + pixel[2]) / 3;
}

/**
 * Aplica una operación a todos los canales de un pixel
 * @param {Array} pixels - Matriz de pixeles
 * @param {Function} operation - Función que recibe el valor actual del canal
 */
function applyToAllChannels(pixels, operation) {
  processPixels(pixels, (i, j, pixel) => {
    pixel[0] = operation(pixel[0]);
    pixel[1] = operation(pixel[1]);
    pixel[2] = operation(pixel[2]);
  });
  return pixels;
}

/**
 * Ejemplo de construccion de una imagen
 */
function ejemplo() {
  const outputPath = "output/ejemplo.jpg";
  const filas = 2;
  const columnas = 2;

  const pixeles = Array.from({ length: filas }, (_, i) => {
    console.log("Fila: " + i);
    const nuevaFila = Array.from({ length: columnas }, (_, j) => {
      console.log("Columna:" + j);
      const pixel = (i + j) % 2 === 0 ? [255, 255, 255] : [0, 0, 0];
      console.log(
        "Vamos a añadir el pixel " + pixel + " a la fila " + i + " columna " + j
      );
      return pixel;
    });
    console.log(nuevaFila);
    return nuevaFila;
  });

  console.log(pixeles);
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
  applyTransformation("output/tucan_red.jpg", (pixels) =>
    setChannelsToZero(pixels, [1, 2])
  );
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
function greenConverter() {
  applyTransformation("output/tucan_green.jpg", (pixels) =>
    setChannelsToZero(pixels, [0, 2])
  );
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
function blueConverter() {
  applyTransformation("output/tucan_blue.jpg", (pixels) =>
    setChannelsToZero(pixels, [0, 1])
  );
}

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
function greyConverter() {
  applyTransformation("output/tucan_grey.jpg", (pixels) => {
    processPixels(pixels, (i, j, pixel) => {
      pixel[0] = pixel[1] = pixel[2] = getPixelAverage(pixel);
    });
    return pixels;
  });
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
function blackAndWhiteConverter() {
  applyTransformation("output/tucan_black_and_white.jpg", (pixels) => {
    processPixels(pixels, (i, j, pixel) => {
      pixel[0] = pixel[1] = pixel[2] = getPixelAverage(pixel) < 128 ? 0 : 255;
    });
    return pixels;
  });
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 * Otra forma es crear la imagen de nuevo unicamente con los valores de las filas y columnas pares.
 */
function scaleDown() {
  applyTransformation(
    "output/tucan_scale_down.jpg",
    (pixels) =>
      pixels
        .filter((_, i) => i % 2 === 0)
        .map((row) => row.filter((_, j) => j % 2 === 0)),
    handler.getShape()[0] / 2,
    handler.getShape()[1] / 2
  );
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qye recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimFactor) {
  applyTransformation("output/tucan_dimed.jpg", (pixels) =>
    applyToAllChannels(pixels, (value) => value / dimFactor)
  );
}

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
function invertColors() {
  applyTransformation("output/tucan_inverse.jpg", (pixels) =>
    applyToAllChannels(pixels, (value) => 255 - value)
  );
}

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 * Una forma de conseguirlo es sumar el valor de cada canal de cada píxel de cada imagen, habiéndolo multiplicado antes por el factor de fusión correspondiente.
 * @param alphaFirst - Factor de fusion para la primera imagen
 * @param alphaSecond - Factor de fusion para la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler("input/cat.jpg");
  let dogHandler = new ImageHandler("input/dog.jpg");
  let outputPath = "output/merged.jpg";

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  const mergedPixels = catPixels.map((row, i) =>
    row.map((catPixel, j) => {
      const dogPixel = dogPixels[i][j];
      return [
        catPixel[0] * alphaFirst + dogPixel[0] * alphaSecond,
        catPixel[1] * alphaFirst + dogPixel[1] * alphaSecond,
        catPixel[2] * alphaFirst + dogPixel[2] * alphaSecond,
      ];
    })
  );

  dogHandler.savePixels(mergedPixels, outputPath);
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
let optionN = 9;

switch (optionN) {
  case 1:
    redConverter();
    break;
  case 2:
    greenConverter();
    break;
  case 3:
    blueConverter();
    break;
  case 4:
    greyConverter();
    break;
  case 5:
    blackAndWhiteConverter();
    break;
  case 6:
    scaleDown();
    break;
  case 7:
    dimBrightness(2);
    break;
  case 8:
    invertColors();
    break;
  case 9:
    merge(0.3, 0.7);
    break;
  default:
    ejemplo();
}
