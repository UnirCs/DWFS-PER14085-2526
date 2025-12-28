// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
  let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
  let butacas = [];

  for (let i = 0; i < N; i++) {
    // Nueva fila
    let fila = [];
    for (let j = 0; j < N; j++) {
      // Nuevo asiento
      fila.push({
        id: idContador++,
        estado: false, // Estado inicial libre
      });
    }
    butacas.push(fila);
  }
  return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

function suggest(nSeat) {
  const result = new Set();
  let suggestSeat = [];
  let contador = 0;

  // Obtiene las butacas disponibles y se guardan el id en array suggestSeat
  for (i = 0; i < butacas.length; i++) {
    for (j = 0; j < butacas[i].length; j++) {
      if (butacas[i][j].estado === false) {
        suggestSeat.push(butacas[i][j].id);
      }
    }
  }

  //Se validan las opciones y devulve el set() con result
  if (nSeat > butacas.length) {
    return result;
  } else {
    if (suggestSeat.length < nSeat) {
      return result;
    } else {
      for (i = suggestSeat.length - 1; i >= 0 && contador <= nSeat; i--) {
        contador += 1;
        if (contador <= nSeat) {
          result.add(suggestSeat[i]);
        }
      }
      return result;
    }
  }
}

let resultSuggest = suggest(9);
console.log(resultSuggest);
