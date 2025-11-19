// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
  let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
  let butacas = [];
  const porcentajeOcupadas = 0.2;

  for (let i = 0; i < N; i++) {
    // Nueva fila
    let fila = [];
    for (let j = 0; j < N; j++) {
      // Nuevo asiento
      let ocupado = Math.random() < porcentajeOcupadas; // ocupación random de hasta el 20%
      fila.push({
        id: idContador++,
        estado: ocupado,
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

const requestedSeatsIds = sugegest(5);
console.log(requestedSeatsIds); // Set de IDs de butacas sugeridas

function sugegest(numButacas) {
  if (numButacas <= 0 || numButacas > N) {
    return new Set();
  }

  let resultado = new Set();
  let found = false;

  for (let fila = butacas.length - 1; fila >= 0 && !found; fila--) {
    let consecutivos = 0;
    let inicioConsecutivo = 0;

    for (let col = 0; col < N && !found; col++) {
      if (butacas[fila][col].estado === false) {
        consecutivos++;

        if (consecutivos === numButacas) {
          const temp = new Set();
          for (let k = inicioConsecutivo; k <= col; k++) {
            temp.add(butacas[fila][k].id);
          }

          resultado = temp;
          found = true;
        }
      } else {
        consecutivos = 0;
        inicioConsecutivo = col + 1;
      }
    }
  }

  return resultado;
}
