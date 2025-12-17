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

function suggest(k) {
  const resultado = new Set();
  // Si piden un número inválido de asientos, devolvemos vacío
  if (k > N || k <= 0) {
    return resultado;
  }

  // Recorremos las filas desde la más lejana a la pantalla (última) hasta la primera
  for (let i = N - 1; i >= 0; i--) {
    const fila = butacas[i];
    let libresSeguidos = 0;

    for (let j = 0; j < N; j++) {
      if (!fila[j].estado) {
        libresSeguidos++;
      } else {
        libresSeguidos = 0;
      }

      if (libresSeguidos === k) {
        const inicio = j - k + 1;

        for (let x = inicio; x <= j; x++) {
          resultado.add(fila[x].id);
        }
        return resultado;
      }
    }
  }
  return resultado;
}


