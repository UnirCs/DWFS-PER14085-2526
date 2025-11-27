// procesador.js (Añadiendo async/await en processAndSaveImage)
const ImageHandler = require( './ImageHandler.js' );
let inputPath = 'input/tucan.jpg' ;

async function run() {
    let handler = new ImageHandler(inputPath);
    await handler.load();

    // Esta función ahora debe ser asíncrona para usar 'await'
    async function processAndSaveImage(outputPath, transformCallback) {
        let pixels = handler.getPixels();
        let transformedPixels = pixels.map((fila) =>
            fila.map((pixelArray) => transformCallback(pixelArray))
        );
        // Usamos await aquí para esperar a que termine de guardar
        await handler.savePixels(transformedPixels, outputPath); 
    }

    // ... (redConverter, greenConverter, etc. se mantienen igual, 
    //      ya que llaman a processAndSaveImage que ahora es async) ...
    function redConverter() {
        processAndSaveImage('output/tucan_red.jpg', (pixelArray) => {
            return [pixelArray, 0, 0];
        });
    }
    // ... (resto de funciones) ...

    function greenConverter() {
  processAndSaveImage(
    "output/tucan_green.jpg",
    (pixel) => {
      return [0, pixel[1], 0];
    }
  );
}
    function blueConverter() { /* ... */ }
    function greyConverter() { /* ... */ }
    function blackAndWhiteConverter() { /* ... */ }
    function scaleDown() { /* ... */ }
    function dimBrightness(dimFactor) { /* ... */ }
    function invertColors() { /* ... */ }
    function merge(alphaFirst, alphaSecond) { /* ... */ }


    let optionN = 4; 

    // El switch case necesita usar await también
    switch (optionN) {
        case 1: await redConverter(); break;
        case 2: await greenConverter(); break;
        case 3: await blueConverter(); break;
        case 4: await greyConverter(); break;
        case 5: await blackAndWhiteConverter(); break;
        case 6: scaleDown(); break; // scaleDown no es async
        case 7: await dimBrightness(2); break;
        case 8: await invertColors(); break;
        case 9: merge(0.3, 0.7); break; // merge no es async
        default: console.log("No se seleccionó ninguna opción válida (1-9)."); break;
    }
    
    console.log("Procesamiento completo.");
}

run();
