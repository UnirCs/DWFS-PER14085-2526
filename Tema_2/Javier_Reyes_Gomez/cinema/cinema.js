const N = 10;

function randomSeeded(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function setup() {
  let id = 1;
  let butacas = [];
  for (let i = 0; i < N; i++) {
    let fila = [];
    for (let j = 0; j < N; j++) {
      fila.push({ id: id++, estado: randomSeeded(id) < 0.25 }); //Ponemos algunas butacas como no disponibles para facilitar pruebas
    }
    butacas.push(fila);
  }
  return butacas;
}

function suggest(butacas, cantidad) {
  const filas = butacas.length;
  const columnas = butacas[0].length;
  let butacasresultado = new Set();

  if (cantidad > columnas) return butacasresultado;

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

  return butacasresultado;
}

let butacas = setup();

let resultado = suggest(butacas, 4);

let filapos = 1;
for (let fila of butacas) {
  let filaLabel = String(filapos).padStart(2, "0");

  let filaStr = fila.map(b => {
      let char = "";

      if (resultado.has(b.id)) {
        char = "*";        // sugerida
      } else if (b.estado) {
        char = "X";        // ocupada
      } else {
        char = "O";        // libre
      }

      return char;
    }).join(" ");

  console.log(filaLabel + " " + filaStr);
  filapos++;
}

console.log("Butacas sugeridas: ", resultado);