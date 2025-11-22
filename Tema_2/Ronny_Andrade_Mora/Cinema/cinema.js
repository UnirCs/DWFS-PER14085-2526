const N = 10;
let butacas = [];

function setup() {
  let idContador = 1;
  let butacasArray = [];
  for (let i = 0; i < N; i++) {
    let fila = [];
    for (let j = 0; j < N; j++) {
      fila.push({
        id: idContador++,
        estado: false,
      });
    }
    butacasArray.push(fila);
  }
  return butacasArray;
}

butacas = setup();

function suggest(numSeats) {
  const result = new Set();

  if (numSeats > N) return result;

  for (let i = N - 1; i >= 0; i--) {
    let fila = butacas[i];
    let consecutivos = 0;

    for (let j = 0; j < N; j++) {
      if (!fila[j].estado) {
        consecutivos++;
        if (consecutivos === numSeats) {
          for (let k = 0; k < numSeats; k++) {
            result.add(fila[j - k].id);
          }
          return result;
        }
      } else {
        consecutivos = 0;
      }
    }
  }

  return result;
}

console.log(suggest(5));
