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
    let outputPath = 'output/tucan_red.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            // Tomamos R G B
            // pixels[i][k][0] = 0;
            pixels[i][j][1] = 0;
            pixels[i][j][2] = 0;
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

    //Aqui tu codigo
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixels[i][j][0] = 0;
            //pixels[i][j][1] = 0;
            pixels[i][j][2] = 0;
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

    //Aqui tu codigo
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            pixels[i][j][0] = 0;
            pixels[i][j][1] = 0;
            //pixels[i][j][2] = 0;
        }
    }

    handler.savePixels(pixels, outputPath);
}


function getAvgArray(RGBList) {
    //Saco el promedio de los tres elementos de la matriz, si fuera más elementos utilizaría otro metodo como reduce por ejemplo, pero como solo son 3 creo que no hay problema
    return (RGBList[0] + RGBList[1] + RGBList[2]) / RGBList.length;
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

    //Aqui tu codigo
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            //obtengo los la matriz de pixeles [R,G,B]
            let RGBList = pixels[i][j];
            //saco el promedio de los tres elementos de la matriz
            let avg = getAvgArray(RGBList);
            //utilizo el objeto referenciado para asignarle los nuevos valores a R,G,B
            RGBList[0] = avg;
            RGBList[1] = avg;
            RGBList[2] = avg;
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


    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            //obtengo los la matriz de pixeles [R,G,B]
            let RGBList = pixels[i][j];
            //saco el promedio de los tres elementos de la matriz
            let avg = getAvgArray(RGBList);
            if (avg < 128) {
                //utilizo el objeto referenciado para asignarle los nuevos valores a R,G,B
                RGBList[0] = 0;
                RGBList[1] = 0;
                RGBList[2] = 0;
            } else {
                //utilizo el objeto referenciado para asignarle los nuevos valores a R,G,B
                RGBList[0] = 255;
                RGBList[1] = 255;
                RGBList[2] = 255;
            }
        }
    }


    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 Otra forma es crear la imagen de nuevo unicamente con los valores de las filas y columnas pares.
 */
function scaleDown() {
    let outputPath = 'output/tucan_scale_down.jpg';
    let pixels = handler.getPixels();

    //Quitamos filas
    for (let i = pixels.length - 1; i >= 0; i--) {
        //for (let i = 0; i < pixels.length; i++){
        if (i % 2 === 0) {
            pixels.splice(i, 1);

            //Quitamos columnas
            for (let j = pixels[i].length - 1; j >= 0; j--) {
                //for (let j = 0; j < pixels[i].length; j++){
                if (j % 2 === 0) {
                    pixels[i].splice(j, 1);
                }
            }
        }
    }
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

    //Aqui tu codigo
    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            //obtengo los la matriz de pixeles [R,G,B]
            let [r, g, b] = pixels[i][j];
            //divido y asigno
            pixels[i][j] = [r / dimFactor, g / dimFactor, b / dimFactor];
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
    const w = 255;

    for (let i = 0; i < pixels.length; i++) {
        for (let j = 0; j < pixels[i].length; j++) {
            //obtengo los la matriz de pixeles [R,G,B]
            let [r, g, b] = pixels[i][j];
            //resto la constante
            pixels[i][j] = [w - r, w - g, w - b];
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

    let dogPixels = dogHandler.getPixels();
    let catPixels = catHandler.getPixels();

    let pixels = [];

    for (let i = 0; i < dogPixels.length; i++) {
        //inicio las filas
        pixels[i] = [];
        for (let j = 0; j < dogPixels[0].length; j++) {
            //asigno los colores rgb de las ambas imágenes
            let [r_cat, g_cat, b_cat] = catPixels[i][j];
            let [r_dog, g_dg, b_dog] = dogPixels[i][j];

            // reasigno los colores multiplicando los valores del factor de fusion tanto para la imagen del perro como la del gato
            let r = (r_dog * alphaFirst) + (r_cat * alphaSecond);
            let g = (g_dg * alphaFirst) + (g_cat * alphaSecond);
            let b = (b_dog * alphaFirst) + (b_cat * alphaSecond);

            //asigno a columna
            pixels[i][j] = [r, g, b];
        }
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
 *     Fusion de imágenes: 9
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