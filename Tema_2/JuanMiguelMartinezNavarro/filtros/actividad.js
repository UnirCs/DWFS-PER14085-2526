const ImageHandler = require("./ImageHandler.js");

let path = "input/tucan.jpg";
let handler = new ImageHandler(path);

function processAndSaveImage(outputPath, transformCallback) {
  let pixels = handler.getPixels();
  let transformedPixels = pixels.map((fila) => fila.map((pixel) => transformCallback(pixel)));
  handler.savePixels(transformedPixels, outputPath);
}

function redConverter() {
  processAndSaveImage(
    "output/tucan_red.jpg",
    (pixel) => {
      return [pixel[0], 0, 0];
    },
  );
}

function greenConverter() {
  processAndSaveImage(
    "output/tucan_green.jpg",
    (pixel) => {
      return [0, pixel[1], 0];
    }
  );
}

function blueConverter() {
  processAndSaveImage(
    "output/tucan_blue.jpg",
    (pixel) => {
      return [0, 0, pixel[2]];
    }
  );
}

function greyConverter() {
  processAndSaveImage(
    "output/tucan_grey.jpg",
    (pixel) => {
      let media = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
      return [media, media, media];
    }
  );
}

function blackAndWhiteConverter() {
  processAndSaveImage(
    "output/tucan_black_and_white.jpg",
    (pixel) => {
      let media = Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
      return media < 128 ? [0, 0, 0] : [255, 255, 255];
    }
  );
}

function scaleDown() {
  processAndSaveImage(
    "output/tucan_scale_down.jpg",
    (pixel) => {
      return pixel.filter((_, i) => i % 2 === 0).map((fila) => fila.filter((_, j) => j % 2 === 0));
    }
  );
}

function dimBrightness(dimFactor) {
  processAndSaveImage(
    "output/tucan_dimed.jpg",
    (pixel) => {
      return [
        Math.floor(pixel[0] / dimFactor),
        Math.floor(pixel[1] / dimFactor),
        Math.floor(pixel[2] / dimFactor),
      ];
    }
  );
}

function invertColors() {
  processAndSaveImage(
    "output/tucan_inverse.jpg",
    (pixel) => {
      return [255 - pixel[0], 255 - pixel[1], 255 - pixel[2]];
    }
  );
}

function merge(alphaFirst, alphaSecond) {


  processAndSaveImage(
    "output/merged.jpg",
    (pixel) => {
      return [
        Math.floor(pixel[0] * alphaFirst + pixel[1] * alphaSecond),
        Math.floor(pixel[1] * alphaFirst + pixel[2] * alphaSecond),
        Math.floor(pixel[2] * alphaFirst + pixel[3] * alphaSecond)
      ];
    }
  );
}

let optionN = 0;

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
    break;
}
