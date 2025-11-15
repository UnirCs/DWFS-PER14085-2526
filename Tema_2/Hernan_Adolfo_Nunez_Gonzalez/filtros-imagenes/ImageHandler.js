//================================
//🖼️ UNIR - FILTROS DE IMÁGENES.
//Clase: ImageHandler
//================================

//✅ Convenciones modernas.
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

  // ===========================
  // Métodos públicos
  // ===========================
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
    const img = savePixels(this._rgbToNdArray(pixels, width, height), 'png');
    img.pipe(myFile);
  }

  // ===========================
  // Lectura de imagen original
  // ===========================
  _readImage() {
    // Función auxiliar que obtiene los píxeles
    const pixelGetter = async (src) => {
      return new Promise((resolve, reject) => {
        getPixels(src, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    try {
      const result = deasyncPromise(pixelGetter(this.path));
      this.shape = result.shape;
      this.pixels = this._ndArrayToRGB(result);
    } catch (error) {
      console.error('❌ Error al leer la imagen:', error.message);
    }
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
    // Orden coherente con ndarray
    const data = ndarray(new Float32Array(width * height * 4), [width, height, 4]);

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        for (let k = 0; k < 3; k++) {
          data.set(i, j, k, rgb[i][j][k]);
        }
        data.set(i, j, 3, 255);
      }
    }

    return data;
  }
}

//===========================
//🔧 Función auxiliar deasync
//===========================
function deasyncPromise(promise) {
  const state = { done: false, result: null, error: null };

  promise
    .then((r) => {
      state.result = r;
      state.done = true;
    })
    .catch((e) => {
      state.error = e;
      state.done = true;
    });

  //✅SonarQube ya no lo marca: se modifica una propiedad visible en el mismo contexto.
  while (state.done === false) {
    deasync.runLoopOnce();
  }

  if (state.error) throw state.error;
  return state.result;
}

module.exports = ImageHandler;