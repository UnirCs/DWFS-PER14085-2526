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
 * Función para generar el filtro RGB deseado
 *
 * pColorTarget = valores ("R","B","G"), valor por defecto es "R"
 * pPixels = el valor obtenido de handler.getPixels()
 */
function filtroImagenRGB(pColorTarget = "R", pPixels) {

    //referencia el array de "pixels" -> RGB
    let pixelColorArray;

    //almacena el numero de su posición en el pixel (0..255)
    let nPixelPosition;

    //colores RGB
    const colors = {
        red: {R: 255, G: 0, B: 0}, //RGB (255,0,0)
        green: {R: 0, G: 128, B: 0}, //RGB (0,128,0)
        blue: {R: 0, G: 0, B: 255} //RGB (0,0,255)
    };

    //indice de pixel del color
    let c;

    for (let i = 0; i < pPixels.length; i++) {
        for (let j = 0; j < pPixels[i].length; j++) {
            pixelColorArray = pPixels[i][j]; //se obtiene referencia del pixel

            c = 0; // posición 0 (R)

            switch (pColorTarget) {
                case "R" : {
                    c++; // posición 1 (G)
                    nPixelPosition =  pixelColorArray[c];
                    pixelColorArray[c] = (nPixelPosition - colors.red.G) !== 0 ? colors.red.G : nPixelPosition;

                    c++; // posición 2 (B)
                    nPixelPosition =  pixelColorArray[c];
                    pixelColorArray[c] = (nPixelPosition - colors.red.B) !== 0 ? colors.red.B : nPixelPosition;
                } break;
                case "G": {
                    // posición 0 (R)
                    nPixelPosition =  pixelColorArray[c];
                    pixelColorArray[c] = (nPixelPosition - colors.green.R) !== 0 ? colors.green.R : nPixelPosition;

                    c = c + 2; // posición 2 (B)
                    nPixelPosition =  pixelColorArray[c];
                    pixelColorArray[c] = (nPixelPosition - colors.green.B) !== 0 ? colors.green.B : nPixelPosition;
                } break;
                case "B": {
                    // posición 0 (R)
                    nPixelPosition =  pixelColorArray[c];
                    pixelColorArray[c] = (nPixelPosition - colors.blue.R) !== 0 ? colors.blue.R : nPixelPosition;

                    c++; // posición 1 (G)
                    nPixelPosition =  pixelColorArray[c];
                    pixelColorArray[c] = (nPixelPosition - colors.blue.G) !== 0 ? colors.blue.G : nPixelPosition;
                } break;
            }
        }
    }
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
    let outputPath = 'output/tucan_red.jpg';
    let pixels = handler.getPixels();

    //función para obtener el filtro
    filtroImagenRGB("R", pixels);

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

    //función para obtener el filtro
    filtroImagenRGB("G", pixels);

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

    //función para obtener el filtro
    filtroImagenRGB("B", pixels);

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

    //referencia el array de "pixels" -> RGB
    let pixelColorArray;

    //media del color
    let mediaColor;

    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixelColorArray = pixels[i][j]; //se obtiene referencia del pixel

            mediaColor = 0; // media es cero
            mediaColor = (pixelColorArray[0] + pixelColorArray[1] + pixelColorArray[2]); //la suma de las 3 posiciones (RBG)
            mediaColor = (mediaColor / 3); //se obtiene la media de los 3 colores

            pixelColorArray[0] = mediaColor;
            pixelColorArray[1] = mediaColor;
            pixelColorArray[2] = mediaColor;
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

    //referencia el array de "pixels" -> RGB
    let pixelColorArray;

    //media del color
    let mediaColor;

    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixelColorArray = pixels[i][j]; //se obtiene referencia del pixel

            mediaColor = 0; // media es cero
            mediaColor = (pixelColorArray[0] + pixelColorArray[1] + pixelColorArray[2]); //la suma de las 3 posiciones (RBG)
            mediaColor = (mediaColor / 3); //se obtiene la media de los 3 colores

            if (mediaColor < 128) {
                //color negro en RGB (0,0,0)
                pixelColorArray[0] = 0;
                pixelColorArray[1] = 0;
                pixelColorArray[2] = 0;
            }
            else {
                //color blanco en RGB (255,255,255)
                pixelColorArray[0] = 255;
                pixelColorArray[1] = 255;
                pixelColorArray[2] = 255;
            }
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

    //nuevo array temporal de "pixels" -> RGB
    let pixelArrayTemp = [];

    //indice de la fila de pixelArrayTemp
    let f = 0;

    for (let i = 0; i < pixels.length; i++) {
        pixelArrayTemp[f] = []; //añade el array en la posición

        for (let j = 0; j < pixels[i].length; j++) {
            if ((i % 2 === 0) && (j % 2 === 0)) { //se valida si la fila actual y la columna actual son números pares
                pixelArrayTemp[f].push(pixels[i][j]); //se agrega al array temporal
            }
        }

        if ((pixelArrayTemp[f].length === 0)) { //si la posición actual (es la ultima) no existen pixeles (esta vacía), se elimina.
            pixelArrayTemp.pop();
        }
        else { //de lo contrario se agrega la siguiente fila (posición) a llenar
            f++;
        }
    }

    pixels = pixelArrayTemp; //se cambia el array de pixels por la referencia de pixelArrayTemp

    handler.savePixels(pixels, outputPath, handler.getShape()[0] / 2, handler.getShape()[1] / 2);
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qye recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimFactor) {
    let outputPath = 'output/tucan_dimed.jpg';
    let pixels = handler.getPixels();

    //referencia el array de "pixels" -> RGB
    let pixelColorArray;

    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixelColorArray = pixels[i][j]; //se obtiene referencia del pixel

            for (let c = 0; c < pixelColorArray.length; c++) {
                if (dimFactor !== 0){ //si el dimFactor es cero, no se divide.
                    pixelColorArray[c] = (pixelColorArray[c] / dimFactor); //se cambia el valor del color en su posición RGB
                }
            }
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
    let outputPath = 'output/tucan_inverse.jpg';
    let pixels = handler.getPixels();

    //referencia el array de "pixels" -> RGB
    let pixelColorArray;

    //base pixel color
    const basePixelColor = 255;

    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixelColorArray = pixels[i][j]; //se obtiene referencia del pixel

            for (let c = 0; c < pixelColorArray.length; c++) {
                pixelColorArray[c] = (basePixelColor - pixelColorArray[c]); //se cambia el valor del color en su posición RGB
            }
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

    //referencia el array de "pixels" -> RGB
    let pixelColorArray;

    //nuevo array temporal de "pixels" -> RGB
    let pixelArrayTemp = [];

    for (let i = 0; i < catPixels.length; i++) {
        pixelArrayTemp[i] = []; //añade el array en la posición (se realiza la asignación desde la primera imagen, porque ambas tienen el mismo tamaño)

        for (let j = 0; j < catPixels[i].length; j++) {
            pixelColorArray = catPixels[i][j]; //se obtiene referencia del pixel

            //multiplicación de cada color por su factor de la primera imagen y se agrega al array temp
            pixelArrayTemp[i].push([
                pixelColorArray[0] * alphaFirst, //R
                pixelColorArray[1] * alphaFirst, //G
                pixelColorArray[2] * alphaFirst //B
            ]);
        }
    }

    for (let i = 0; i < dogPixels.length; i++) {
        for (let j = 0; j < dogPixels[i].length; j++) {
            pixelColorArray = dogPixels[i][j]; //se obtiene referencia del pixel

            //multiplicación de cada color por su factor de dogPixels
            pixelColorArray[0] *= alphaSecond; //R
            pixelColorArray[1] *= alphaSecond; //G
            pixelColorArray[2] *= alphaSecond; //B
        }
    }

    //como el pixelArrayTemp tiene la primera imagen con su factor, se toma de base para la union con la segunda imagen ya con su factor
    for (let i = 0; i < pixelArrayTemp.length; i++) {
        for (let j = 0; j < pixelArrayTemp[i].length; j++) {
            pixelColorArray = pixelArrayTemp[i][j]; //se obtiene referencia del pixel

            //se realiza la suma los píxeles RGB de la primera imagen con la segunda ya multiplicadas
            pixelColorArray[0] += dogPixels[i][j][0]; //R
            pixelColorArray[1] += dogPixels[i][j][1]; //G
            pixelColorArray[2] += dogPixels[i][j][2]; //B
        }
    }

    pixels = pixelArrayTemp; //referenciamos pixels hacia pixelArrayTemp

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