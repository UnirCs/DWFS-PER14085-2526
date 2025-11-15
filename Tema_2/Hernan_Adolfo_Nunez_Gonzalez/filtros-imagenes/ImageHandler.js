//================================
//🖼️ UNIR - FILTROS DE IMÁGENES.
//Clase: ImageHandler
//================================

//✅ 1. Se usa la convención moderna 'node:fs' y 'import' de ES2022 si el entorno lo permite
//(si está usando CommonJS, se mantiene require pero con node:fs).
const fs = require('node:fs');
const getPixels = require('get-pixels');
const deasync = require('deasync');
const savePixels = require('save-pixels');
const ndarray = require('ndarray');

class ImageHandler {
  constructor(path) {
    this.path = path;
    this.pixels = [];
    this.shape = [0, 0, 0];
    this._readImage();
  }

  getPixels() {
    return this.pixels;
  }

  getShape() {
    return this.shape;
  }

  // ===========================
  // Guardar píxeles a archivo
  // ===========================
  savePixels(pixels, path, width = this.shape[0], height = this.shape[1]) {
    const myFile = fs.createWriteStream(path);
    // ⚙️ Evita 'var', usa const o let
    const img = savePixels(this._rgbToNdArray(pixels, width, height), 'png');
    img.pipe(myFile);
  }

  // ===========================
  // Lectura de imagen original
  // ===========================
  _readImage() {
    // Reemplazo de 'var' por 'let' o 'const'
    const pixelGetter = (src) => {
      let ret = null;
      getPixels(src, (err, result) => {
        ret = { err, result };
      });

      // 🚫 Evita bug de loop infinito por 'ret' no modificado
      while (ret === null) {
        deasync.runLoopOnce();
      }

      if (ret.err) {
        console.error('❌ Error: ruta de imagen inválida');
        return null;
      }

      return ret.result;
    };

    const result = pixelGetter(this.path);
    if (!result) return;

    this.shape = result.shape;
    this.pixels = this._ndArrayToRGB(result);
  }

  // ===========================
  // Conversión ndarray → RGB
  // ===========================
  _ndArrayToRGB(data) {
    const rgb = [];
    for (let i = 0; i < this.shape[0]; i++) {
      const line = [];
      for (let j = 0; j < this.shape[1]; j++) {
        const col = [
          data.get(i, j, 0),
          data.get(i, j, 1),
          data.get(i, j, 2),
        ];
        line.push(col);
      }
      rgb.push(line);
    }
    return rgb;
  }

  // ===========================
  // Conversión RGB → ndarray
  // ===========================
  _rgbToNdArray(rgb, width, height) {
    // Corrige el orden de parámetros height/width para coherencia
    const data = ndarray(new Float32Array(width * height * 4), [width, height, 4]);

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        // No se usa var; uso let
        for (let k = 0; k < 3; k++) {
          data.set(i, j, k, rgb[i][j][k]);
        }
        data.set(i, j, 3, 255);
      }
    }

    return data;
  }
}

module.exports = ImageHandler;