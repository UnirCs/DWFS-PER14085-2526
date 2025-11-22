const N = 10;
let butacas = [];


function setup() {
  let id = 1;
  let butacastmp = [];
  for (let i = 0; i < N; i++) {
    let fila = [];
    for (let j = 0; j < N; j++) {
      fila.push({ id: id++, estado: false });
    }
    butacastmp.push(fila);
  }
  return butacastmp;
}

function suggest(cantidad) {
  const filas = butacas.length;
  const columnas = butacas[0].length;
  let butacasresultado = new Set();

  if (cantidad <= columnas){

    let i = filas - 1;
    while (i >= 0 && butacasresultado.size == 0) {
      let fila = butacas[i];
      let libres = 0;
      let inicio = 0;

      let j = 0;
      while (j < columnas && butacasresultado.size == 0) {
        if (!fila[j].estado) {
          libres++;
          if (libres === cantidad) {
            for (let k = inicio; k < inicio + cantidad; k++) {
              butacasresultado.add(fila[k].id);
            }
          }
        } else {
          libres = 0;
          inicio = j + 1;
        }

        j++;
      }

      i--;
    }
  }
  console.log("Butacas sugeridas: ", butacasresultado);
  return butacasresultado;
}

butacas = setup();
console.log("Butacas iniciales: ", butacas);