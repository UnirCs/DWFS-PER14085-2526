const ImageHandler = require('./ImageHandler.js');

const handler = new ImageHandler('input/tucan.jpg');

const forEachPixel = (pixels, transformFn) => {
  for (let i = 0; i < pixels.length; i++) {
    for (let j = 0; j < pixels[i].length; j++) {
      transformFn(pixels[i][j], i, j);
    }
  }
};

const applyFilter = (outputPath, transformFn) => {
  const pixels = handler.getPixels();
  forEachPixel(pixels, transformFn);
  handler.savePixels(pixels, outputPath);
};

const setChannels = (pixel, r, g, b) => {
  if (r !== undefined) pixel[0] = r;
  if (g !== undefined) pixel[1] = g;
  if (b !== undefined) pixel[2] = b;
};

const ejemplo = () => {
  const filas = 2;
  const columnas = 2;
  const pixeles = Array.from({ length: filas }, (_, i) =>
    Array.from({ length: columnas }, (_, j) =>
      (i + j) % 2 === 0 ? [255, 255, 255] : [0, 0, 0]
    )
  );
  handler.savePixels(pixeles, 'output/ejemplo.jpg', filas, columnas);
};

const redConverter = () => applyFilter('output/tucan_red.jpg', (pixel) => setChannels(pixel, undefined, 0, 0));

const greenConverter = () => applyFilter('output/tucan_green.jpg', (pixel) => setChannels(pixel, 0, undefined, 0));

const blueConverter = () => applyFilter('output/tucan_blue.jpg', (pixel) => setChannels(pixel, 0, 0, undefined));

const getAverage = (pixel) => (pixel[0] + pixel[1] + pixel[2]) / 3;

const greyConverter = () => applyFilter('output/tucan_grey.jpg', (pixel) => {
  const media = getAverage(pixel);
  setChannels(pixel, media, media, media);
});

const blackAndWhiteConverter = () => applyFilter('output/tucan_black_and_white.jpg', (pixel) => {
  const color = getAverage(pixel) < 128 ? 0 : 255;
  setChannels(pixel, color, color, color);
});

const scaleDown = () => {
  const pixels = handler.getPixels();
  const nuevosPixels = pixels
    .filter((_, i) => i % 2 === 0)
    .map(row => row.filter((_, j) => j % 2 === 0));

  const [height, width] = handler.getShape();
  handler.savePixels(nuevosPixels, 'output/tucan_scale_down.jpg', height / 2, width / 2);
};

const dimBrightness = (dimFactor) => applyFilter('output/tucan_dimed.jpg', (pixel) => {
  pixel[0] /= dimFactor;
  pixel[1] /= dimFactor;
  pixel[2] /= dimFactor;
});

const invertColors = () => applyFilter('output/tucan_inverse.jpg', (pixel) => {
  pixel[0] = 255 - pixel[0];
  pixel[1] = 255 - pixel[1];
  pixel[2] = 255 - pixel[2];
});

const merge = (alphaFirst, alphaSecond) => {
  const catHandler = new ImageHandler('input/cat.jpg');
  const dogHandler = new ImageHandler('input/dog.jpg');
  const catPixels = catHandler.getPixels();
  const dogPixels = dogHandler.getPixels();

  const pixels = catPixels.map((row, i) =>
    row.map((catPixel, j) => {
      const dogPixel = dogPixels[i][j];
      return [
        catPixel[0] * alphaFirst + dogPixel[0] * alphaSecond,
        catPixel[1] * alphaFirst + dogPixel[1] * alphaSecond,
        catPixel[2] * alphaFirst + dogPixel[2] * alphaSecond
      ];
    })
  );

  dogHandler.savePixels(pixels, 'output/merged.jpg');
};


const optionN = 0;

const operations = {
  0: ejemplo,
  1: redConverter,
  2: greenConverter,
  3: blueConverter,
  4: greyConverter,
  5: blackAndWhiteConverter,
  6: scaleDown,
  7: () => dimBrightness(2),
  8: invertColors,
  9: () => merge(0.3, 0.7)
};

(operations[optionN] || ejemplo)();