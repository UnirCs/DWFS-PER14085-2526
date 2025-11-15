// Tamaño de la sala (N x N)
const N = 10;

// Crea la matriz de butacas
function setup() {
  let nextId = 1;
  const butacas = [];

  for (let fila = 0; fila < N; fila++) {
    const nuevaFila = [];
    for (let col = 0; col < N; col++) {
      nuevaFila.push({
        id: nextId++,
        estado: false, 
      });
    }
    butacas.push(nuevaFila);
  }

  return butacas;
}

// Matriz global de butacas
const butacas = setup();

/**
 * Busca asientos contiguos en la fila más lejana posible.
 * Devuelve un Set con los ids o un Set vacío si no hay hueco.
 */
function suggest(asientosSolicitados) {
  // Si piden más de lo que cabe en una fila, no tiene sentido buscar
  if (asientosSolicitados > N) {
    return new Set();
  }

  // Empieza desde la última fila (la más alejada de la pantalla)
  for (let filaIdx = N - 1; filaIdx >= 0; filaIdx--) {
    const fila = butacas[filaIdx];
    let libresSeguidos = 0;
    let inicioBloque = 0;

    for (let col = 0; col < N; col++) {
      const asiento = fila[col];

      if (!asiento.estado) {
        // asiento libre
        libresSeguidos++;

        if (libresSeguidos === 1) {
          inicioBloque = col;
        }

        if (libresSeguidos === asientosSolicitados) {
          const idsSeleccionados = new Set();

          for (let k = inicioBloque; k < inicioBloque + asientosSolicitados; k++) {
            idsSeleccionados.add(fila[k].id);
          }

          return idsSeleccionados;
        }
      } else {
        // se corta la racha de libres
        libresSeguidos = 0;
      }
    }
  }

  // Si llega aquí, no ha encontrado hueco en ninguna fila
  return new Set();
}

// Marcar algunas butacas ocupadas para probar
// false = libre, true = ocupada
butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][3].estado = true;
butacas[8][4].estado = true;

// Prueba rápida
console.log("=== PRUEBA: Pedir 7 asientos ===");
const sugeridos = suggest(7);
console.log(sugeridos);
