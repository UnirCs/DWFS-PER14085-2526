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

function redConverter() {
    let outputPath = 'output/tucan_red.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape(); // Obtenemos las dimensiones de la imagen

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pixels[i][j][1] = 0; // Canal Verde (G) a 0
            pixels[i][j][2] = 0; // Canal Azul (B) a 0
        }
    }

    handler.savePixels(pixels, outputPath);
}

function greenConverter() {
    let outputPath = 'output/tucan_green.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pixels[i][j][0] = 0; // Canal Rojo (R) a 0
            pixels[i][j][2] = 0; // Canal Azul (B) a 0
        }
    }

    handler.savePixels(pixels, outputPath);
}

function blueConverter() {
    let outputPath = 'output/tucan_blue.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pixels[i][j][0] = 0; // Canal Rojo (R) a 0
            pixels[i][j][1] = 0; // Canal Verde (G) a 0
        }
    }

    handler.savePixels(pixels, outputPath);
}

function greyConverter() {
    let outputPath = 'output/tucan_grey.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const R = pixels[i][j][0];
            const G = pixels[i][j][1];
            const B = pixels[i][j][2];

            // Calcular la media y redondear
            const media = Math.round((R + G + B) / 3);

            pixels[i][j][0] = media; // R = media
            pixels[i][j][1] = media; // G = media
            pixels[i][j][2] = media; // B = media
        }
    }

    handler.savePixels(pixels, outputPath);
}

function blackAndWhiteConverter() {
    let outputPath = 'output/tucan_black_and_white.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();

    const white = 255;
    const black = 0;

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const R = pixels[i][j][0];
            const G = pixels[i][j][1];
            const B = pixels[i][j][2];

            const media = (R + G + B) / 3;

            // Condicional para determinar si es blanco o negro
            const valor = (media < 128) ? black : white;

            pixels[i][j][0] = valor;
            pixels[i][j][1] = valor;
            pixels[i][j][2] = valor;
        }
    }

    handler.savePixels(pixels, outputPath);
}

function scaleDown() {
    let outputPath = 'output/tucan_scale_down.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();
    let newPixels = [];

    //Aqui tu codigo
    // Recorrer filas de 2 en 2
    for (let i = 0; i < filas; i += 2) {
        let nuevaFila = [];
        // Recorrer columnas de 2 en 2
        for (let j = 0; j < columnas; j += 2) {
            // Solo tomamos el pixel de la posición par
            nuevaFila.push(pixels[i][j]);
        }
        newPixels.push(nuevaFila);
    }

    // Reasignamos 'pixels' a la matriz reducida
    pixels = newPixels;

    // Los parámetros al final de savePixels indican que la nueva imagen tiene la mitad del tamaño
    handler.savePixels(pixels, outputPath, handler.getShape()[0] / 2, handler.getShape()[1] / 2);
}

function dimBrightness(dimFactor) {
    let outputPath = 'output/tucan_dimed.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            // Bucle para iterar sobre los 3 canales (R, G, B)
            for (let k = 0; k < 3; k++) {
                // Dividir y asegurar que el valor es un entero
                pixels[i][j][k] = Math.floor(pixels[i][j][k] / dimFactor);
            }
        }
    }

    handler.savePixels(pixels, outputPath);
}

function invertColors() {
    let outputPath = 'output/tucan_inverse.jpg';
    let pixels = handler.getPixels();
    let [filas, columnas] = handler.getShape();

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            // Bucle para iterar sobre los 3 canales (R, G, B)
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

    // Obtener dimensiones de la primera imagen (asumiendo que son iguales)
    let [filas, columnas] = catHandler.getShape();

    //Aqui tu codigo
    for (let i = 0; i < filas; i++) {
        let nuevaFila = [];
        for (let j = 0; j < columnas; j++) {
            let pixelFusion = [0, 0, 0];
            // Bucle para iterar sobre los 3 canales (R, G, B)
            for (let k = 0; k < 3; k++) {
                let valorCat = catPixels[i][j][k] * alphaFirst;
                let valorDog = dogPixels[i][j][k] * alphaSecond;

                // Sumar y limitar el resultado a 255 (el máximo valor RGB)
                pixelFusion[k] = Math.min(255, Math.round(valorCat + valorDog));
            }
            nuevaFila.push(pixelFusion);
        }
        pixels.push(nuevaFila);
    }

    dogHandler.savePixels(pixels, outputPath);
}


/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividadA.js tal como se indica en el archivo Readme.md
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