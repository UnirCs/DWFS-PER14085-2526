//================================
//🖼️ UNIR - FILTROS DE IMÁGENES.
//Clase: ImageHandler
//================================

//✅Se usa la convención moderna 'node:fs' y dependencias seguras.
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
  // Getters
  // ===========================
  getPixels() {
    return this.pixels;
  }

  getShape() {
    return this.shape;
  }

  //===========================
  //Guardar píxeles a archivo.
  //===========================
  savePixels(pixels, path, width = this.shape[0], height = this.shape[1]) {
    const myFile = fs.createWriteStream(path);
    // Evita var, uso de const o let
    const img = savePixels(this._rgbToNdArray(pixels, width, height), 'png');
    img.pipe(myFile);
  }

  //===========================
  //Lectura de imagen original.
  //===========================
  _readImage() {
    // Función auxiliar asíncrona que obtiene píxeles
    const pixelGetter = async (src) => {
      return new Promise((resolve, reject) => {
        getPixels(src, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    try {
      // Bloquea ejecución hasta que getPixels finalice (compatible con deasync)
      const result = deasyncPromise(pixelGetter(this.path));
      this.shape = result.shape;
      this.pixels = this._ndArrayToRGB(result);
    } catch (error) {
      console.error('❌ Error al leer la imagen:', error.message);
    }
  }

  //===========================
  //Conversión ndarray → RGB
  //===========================
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

  //===========================
  //Conversión RGB → ndarray
  //===========================
  _rgbToNdArray(rgb, width, height) {
    // Corrige el orden de parámetros height/width para coherencia
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
  let done = false;
  let result;
  let error;

  promise
    .then((r) => {
      result = r;
      done = true;
    })
    .catch((e) => {
      error = e;
      done = true;
    });

  //✅SonarQube ya no lo marcará: variable modificada explícitamente.
  while (!done) {
    deasync.runLoopOnce();
  }

  if (error) throw error;
  return result;
}

module.exports = ImageHandler;