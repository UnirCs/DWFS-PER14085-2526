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
  let height = pixels.length; // Number of rows (height)
  let width = pixels[0].length; // Number of columns (width)

  // Iterar sobre cada fila (i)
  for (let i = 0; i < height; i++) {
    // Iterar sobre cada columna (j) en la fila actual
    for (let j = 0; j < width; j++) {
      // pixels[i][j] es el píxel actual [R, G, B]

      // Establecer el canal Rojo (índice 1) a 0
      pixels[i][j][1] = 0;

      // Establecer el canal Azul (índice 2) a 0
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

  let height = pixels.length; // Número de filas (alto)
  let width = pixels[0].length; // Número de columnas (ancho)

  // Iterar sobre cada fila (i)
  for (let i = 0; i < height; i++) {
    // Iterar sobre cada columna (j) en la fila actual
    for (let j = 0; j < width; j++) {
      // pixels[i][j] es el píxel actual [R, G, B]

      // Establecer el canal Rojo (índice 0) a 0
      pixels[i][j][0] = 0;

      // Establecer el canal Azul (índice 2) a 0
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
  let height = pixels.length; // Número de filas (alto)
  let width = pixels[0].length; // Número de columnas (ancho)

  // Iterar sobre cada fila (i)
  for (let i = 0; i < height; i++) {
    // Iterar sobre cada columna (j) en la fila actual
    for (let j = 0; j < width; j++) {
      // pixels[i][j] es el píxel actual [R, G, B]
      
      // Establecer el canal Rojo (índice 0) a 0
      pixels[i][j][0] = 0; 
      
      // Establecer el canal Verde (índice 1) a 0
      pixels[i][j][1] = 0; 
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

  //Aqui tu codigo
  let height = pixels.length; // Número de filas (alto)
  let width = pixels[0].length; // Número de columnas (ancho)

  // 1. Iterar sobre cada fila (i) y columna (j)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let pixel = pixels[i][j]; // [R, G, B]
      
      // 2. Calcular la media de los tres canales (R, G, B)
      let red = pixel[0];
      let green = pixel[1];
      let blue = pixel[2];
      
      // Utilizamos Math.round() para asegurarnos de que el valor sea un entero.
      let average = Math.round((red + green + blue) / 3);
      
      // 3. Asignar el valor de la media a cada canal (R, G, y B)
      pixel[0] = average; // R = Media
      pixel[1] = average; // G = Media
      pixel[2] = average; // B = Media
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

  //Aqui tu codigo
  let height = pixels.length; 
  let width = pixels[0].length; 
  
  // El umbral de brillo que divide el blanco y el negro
  const threshold = 128; 

  // 1. Iterar sobre cada fila (i) y columna (j)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let pixel = pixels[i][j]; // [R, G, B]
      
      // 2. Calcular la media (brillo) del píxel original
      let red = pixel[0];
      let green = pixel[1];
      let blue = pixel[2];
      
      // No necesitamos Math.round() aquí, ya que solo comparamos el valor.
      let average = (red + green + blue) / 3;
      
      let newColor;

      // 3. Aplicar el umbral: Si el brillo es bajo (oscuridad) se vuelve negro.
      if (average < threshold) {
        newColor = 0; // Negro
      } else {
        newColor = 255; // Blanco
      }
      
      // 4. Asignar el nuevo valor de color (0 o 255) a todos los canales
      pixel[0] = newColor; 
      pixel[1] = newColor; 
      pixel[2] = newColor; 
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

  //Aqui tu codigo
  let originalHeight = pixels.length;
  let originalWidth = pixels[0].length;
  
  // 1. Calcular las nuevas dimensiones
  let newHeight = Math.floor(originalHeight / 2);
  let newWidth = Math.floor(originalWidth / 2);
  
  // 2. Inicializar la matriz de píxeles para la nueva imagen (la mitad del tamaño)
  let scaledPixels = [];

  // 3. Recorrer las filas del píxel original, tomando solo las filas pares
  // El índice 'i' del original va de 0, 2, 4, 6...
  // El índice 'newRowIndex' de la nueva imagen va de 0, 1, 2, 3...
  for (let i = 0; i < originalHeight; i += 2) {
    let newRow = [];
    
    // 4. Recorrer las columnas del píxel original, tomando solo las columnas pares
    // El índice 'j' del original va de 0, 2, 4, 6...
    for (let j = 0; j < originalWidth; j += 2) {
      // Tomamos el píxel [R, G, B] en la posición (i, j)
      let pixel = pixels[i][j];
      
      // Añadimos el píxel seleccionado a la nueva fila
      newRow.push(pixel);
    }
    
    // Solo añadimos la nueva fila si tiene contenido (maneja el caso de que la altura no sea par)
    if (newRow.length > 0) {
      scaledPixels.push(newRow);
    }
  }

  // 5. Reemplazar la matriz original con la nueva matriz escalada
  pixels = scaledPixels;

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
  let height = pixels.length; 
  let width = pixels[0].length; 

  if (dimFactor <= 1) {
    console.warn("dimFactor debe ser mayor que 1 para reducir el brillo.");
    dimFactor = 1; 
  }

  // Iterar sobre cada fila (i) y columna (j)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let pixel = pixels[i][j]; // [R, G, B]
      
      // Aplicar la división a cada canal de color
      // Math.round se usa para asegurar que el valor resultante sea un entero (0-255)
      pixel[0] = Math.round(pixel[0] / dimFactor); // Nuevo Rojo
      pixel[1] = Math.round(pixel[1] / dimFactor); // Nuevo Verde
      pixel[2] = Math.round(pixel[2] / dimFactor); // Nuevo Azul
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

  //Aqui tu codigo
  let height = pixels.length; 
  let width = pixels[0].length; 
  
  const MAX_VALUE = 255;

  // 1. Iterar sobre cada fila (i) y columna (j)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let pixel = pixels[i][j]; // [R, G, B]
      
      // 2. Aplicar la inversión a cada canal
      
      // Nuevo Rojo = 255 - Rojo Original
      pixel[0] = MAX_VALUE - pixel[0]; 
      
      // Nuevo Verde = 255 - Verde Original
      pixel[1] = MAX_VALUE - pixel[1]; 
      
      // Nuevo Azul = 255 - Azul Original
      pixel[2] = MAX_VALUE - pixel[2]; 
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

  //Aqui tu codigo
  let height = catPixels.length;
  let width = catPixels[0].length;

  // 1. Iterar sobre cada fila (i) y columna (j)
  for (let i = 0; i < height; i++) {
    let newRow = [];
    for (let j = 0; j < width; j++) {
      let catPixel = catPixels[i][j];
      let dogPixel = dogPixels[i][j];

      let mergedPixel = [];

      // 2. Aplicar la fórmula de fusión a cada canal (R, G, B)
      // Píxel_Final = (Píxel_A * alphaA) + (Píxel_B * alphaB)
      for (let k = 0; k < 3; k++) { // k=0:Rojo, k=1:Verde, k=2:Azul
        let blendedValue = (catPixel[k] * alphaFirst) + (dogPixel[k] * alphaSecond);
        
        // Redondear a un entero y asegurarse de que el valor esté entre 0 y 255.
        // Math.min/Math.max evitan que los valores se desborden si los factores suman más de 1.
        let finalValue = Math.min(255, Math.max(0, Math.round(blendedValue)));
        
        mergedPixel.push(finalValue);
      }
      
      newRow.push(mergedPixel);
    }
    pixels.push(newRow);
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