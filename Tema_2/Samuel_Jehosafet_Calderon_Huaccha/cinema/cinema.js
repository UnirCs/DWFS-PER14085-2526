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

  let idsSeleccionados = null; // null = no encontrado aún

  // Empieza desde la última fila (la más alejada de la pantalla)
  for (let filaIdx = N - 1; filaIdx >= 0 && idsSeleccionados === null; filaIdx--) {
    const fila = butacas[filaIdx];
    let libresSeguidos = 0;
    let inicioBloque = 0;

    for (let col = 0; col < N && idsSeleccionados === null; col++) {
      const asiento = fila[col];

      if (!asiento.estado) {
        // asiento libre
        libresSeguidos++;

        if (libresSeguidos === 1) {
          inicioBloque = col;
        }

        if (libresSeguidos === asientosSolicitados) {
          // Encontramos un bloque válido en esta fila
          const seleccion = new Set();
          for (let k = inicioBloque; k < inicioBloque + asientosSolicitados; k++) {
            seleccion.add(fila[k].id);
          }
          idsSeleccionados = seleccion; // marcamos como encontrado
        }
      } else {
        // se corta la racha de libres
        libresSeguidos = 0;
      }
    }
  }

  // Si no encontró nada, idsSeleccionados seguirá siendo null
  return idsSeleccionados === null ? new Set() : idsSeleccionados;
}


// Marcar algunas butacas ocupadas para probar
// false = libre, true = ocupada
butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][3].estado = true;
butacas[8][4].estado = true;

// Prueba rápida
console.log("=== PRUEBA: Pedir 2 asientos");
const sugeridos = suggest(2);
console.log(sugeridos);
