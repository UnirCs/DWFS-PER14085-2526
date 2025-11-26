
const ImageHandler = require('./ImageHandler.js')


let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);


/**
 * Ejemplo de construccion de una imagen
 */
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
      let pixel = [0, 0, 0]; // R G B -> Red Green Blue -> Rojo Verde Azul
      if ((i + j) % 2 === 0) { // Si la suma de la fila y la columna es par....
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

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
  let outputPath = 'output/tucan.jpg';
  let pixels = handler.getPixels();

  let filas = pixels.length;
  let columnas = pixels[0].length

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let nuevoR = 255;
        pixels[i][j][0] = nuevoR;
    }
  }

  handler.savePixels(pixels, outputPath);

  
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
function greenConverter() {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();
  let filas = pixels.length;
  let columnas = pixels[0].length

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let nuevoG = 255;
        pixels[i][j][1] = nuevoG;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
function blueConverter() {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();

   let filas = pixels.length;
  let columnas = pixels[0].length

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let nuevoB = 255;
        pixels[i][j][2] = nuevoB;
    }
  }


  handler.savePixels(pixels, outputPath);
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
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();
  let filas = pixels.length;
  let columnas = pixels[0].length
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let r = pixels[i][j][0];
        let g = pixels[i][j][1];
        let b = pixels[i][j][2];

        let tono = Math.round((r + g + b)/3)

        pixels[i][j][0] = tono;
        pixels[i][j][1] = tono;
        pixels[i][j][2] = tono;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
function blackAndWhiteConverter() {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();

  let filas = pixels.length;
  let columnas = pixels[0].length
  const limite = 128;

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let r = pixels[i][j][0];
        let g = pixels[i][j][1];
        let b = pixels[i][j][2];

        let tono = (r + g + b)/3
        let colorN;

        if (tono < limite) {
            colorN = 0
        }else{colorN = 255}

        pixels[i][j][0] = colorN;
        pixels[i][j][1] = colorN;
        pixels[i][j][2] = colorN;
    }
  }


  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 * Otra forma es crear la imagen de nuevo unicamente con los valores de las filas y columnas pares.
 */
function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();
  let filas = pixels.length;
  let columnas = pixels[0].length
  let newPixels = [];
  for (let i = 0; i < filas; i+=2) {
    let nuevaFila=[]
    for (let j = 0; j < columnas; j+=2) {
        nuevaFila.push(pixels[i][j].slice(0))
  }
newPixels.push(nuevaFila)}


  handler.savePixels(newPixels, outputPath, handler.getShape()[0] / 2, handler.getShape()[1] / 2);
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qye recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimFactor) {
  let outputPath = 'output/tucan.jpg';
  let pixels = handler.getPixels();

  let filas = pixels.length;
  let columnas = pixels[0].length

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let r = pixels[i][j][0]/ dimFactor;
        let g = pixels[i][j][1]/ dimFactor;
        let b = pixels[i][j][2]/ dimFactor;



        pixels[i][j][0] = r;
        pixels[i][j][1] = g;
        pixels[i][j][2] = b;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
function invertColors() {
  let outputPath = 'output/tucan-invert.jpg';
  let pixels = handler.getPixels();

  let filas = pixels.length;
  let columnas = pixels[0].length

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        let r = pixels[i][j][0];
        let g = pixels[i][j][1];
        let b = pixels[i][j][2];



        pixels[i][j][0] = 255 -r;
        pixels[i][j][1] = 255-g;
        pixels[i][j][2] = 255-b;
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 * Una forma de conseguirlo es sumar el valor de cada canal de cada píxel de cada imagen, habiéndolo multiplicado antes por el factor de fusión correspondiente.
 * @param alphaFirst - Factor de fusion para la primera imagen
 * @param alphaSecond - Factor de fusion para la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  let pixels = [];

  let catFilas = catPixels.length;
  let dogFilas = dogPixels.length;
 
 let catColumnas = catFilas > 0 ? catPixels[0].length : 0;
 let dogColumnas = dogFilas > 0 ? dogPixels[0].length : 0;

 let filas = Math.min(catFilas, dogFilas);
 let columnas = Math.min(catColumnas, dogColumnas);

  for (let i = 0; i < filas; i++) {
    let nuevaFila = []
    for (let j = 0; j < columnas; j++) {
        let catR = catPixels[i][j][0];
        let catG = catPixels[i][j][1];
        let catB = catPixels[i][j][2];

        let dogR = dogPixels[i][j][0];
        let dogG = dogPixels[i][j][1];
        let dogB = dogPixels[i][j][2];

        let newR = (catR * alphaFirst) + (dogR * alphaSecond)
        let newG = (catG * alphaFirst) + (dogG * alphaSecond)
        let newB = (catB * alphaFirst) + (dogB * alphaSecond)
        let finalR = Math.min(255, Math.max(0, Math.round(newR)));
        let finalG = Math.min(255, Math.max(0, Math.round(newG)));
        let finalB = Math.min(255, Math.max(0, Math.round(newB)));

        nuevaFila.push([finalR, finalG, finalB]);
    }
    pixels.push(nuevaFila);
  }

  dogHandler.savePixels(pixels, outputPath);
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
let optionN = 3;
// 
switch (optionN) {
  case 1: redConverter(); break;
  case 2: greenConverter(); break;
  case 3: blueConverter(); break;
  case 4: greyConverter(); break;
  case 5: blackAndWhiteConverter(); break;
  case 6: scaleDown(); break;
  case 7: dimBrightness(2); break;
  case 8: invertColors(); break;
  case 9: merge(0.7, 0.3); break;
  default: ejemplo();
}
