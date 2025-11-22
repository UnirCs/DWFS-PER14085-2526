// Definir el tamaño de la matriz de butacas
function setup() {
  let idContador = 1;
  let butacas = [];

  for (let i = 0; i < N; i++) {
    let fila = [];
    for (let j = 0; j < N; j++) {
      fila.push({
        id: idContador++,
        estado: false,
      });
    }
    butacas.push(fila);
  }
  return butacas;
}

const N = 10;
let butacas = setup();

console.log('Butacas Inicializadas');

function suggest(numAsientos) {
  const resultado = new Set();
  if (numAsientos > N) return resultado;

  [...butacas].reverse().forEach((fila) => {
    for (let j = 0; j <= N - numAsientos; j++) {
      if (
        fila.slice(j, j + numAsientos).every((b) => !b.estado) &&
        resultado.size < numAsientos
      ) {
        fila.slice(j, j + numAsientos).forEach((b) => {
          resultado.add(b.id);
          b.estado = true;
        });
      }
    }
  });

  console.log('Asientos sugeridos:', resultado);
  return resultado;
}