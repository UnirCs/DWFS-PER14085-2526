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

function suggest(numAsientos, reserve = false) {
  const resultado = new Set();
  if (!numAsientos || numAsientos <= 0 || numAsientos > N) return resultado;

  const temp = butacas.map(fila => fila.map(b => b.estado));

  let foundEnough = false;

  for (let rRev = 0; rRev < N && !foundEnough; rRev++) {
    const filaIndex = N - 1 - rRev;
    const fila = temp[filaIndex];

    for (let j = 0; j <= N - numAsientos && !foundEnough; j++) {
      let blockFree = true;
      for (let k = 0; k < numAsientos; k++) {
        if (fila[j + k]) {
          blockFree = false;
        }
      }

      if (blockFree) {
        for (let k = 0; k < numAsientos; k++) {
          const asiento = butacas[filaIndex][j + k];
          resultado.add(asiento.id);

          temp[filaIndex][j + k] = true;

          if (reserve) {
            asiento.estado = true;
          }
        }
        if (resultado.size >= numAsientos) {
          foundEnough = true;
        }
      }
    }
  }
  console.log("Asientos sugeridos:", resultado);
  return resultado;
}

// Aplicar reserva 
function applyReservation(numAsientos) {
  const reserved = suggest(numAsientos, true);

  reserved.forEach((id) => {
    const el = document.querySelector(`[data-model-id="${id}"]`);
    if (el) {
      el.classList.add('ocupado');
      // Si estaba en preview, eliminamos la marca preview
      if (el.dataset.preview === 'true') delete el.dataset.preview;
      el.dataset.modelState = 'true';
    }
  });
  // Limpiar previews en el DOM (si hubiera)
  document.querySelectorAll('.asiento').forEach((el) => {
    if (el.dataset.preview === 'true') {
      delete el.dataset.preview;
      if (el.dataset.modelState !== 'true') {
        el.classList.remove('ocupado');
      }
    }
  });
  return reserved;
}

// Asignar IDs dinámicamente a los elementos .asiento del DOM
function assignSeatIds() {
  const container = document.querySelector('.asientos');
  if (!container) return;

  const rows = [];
  let currentRow = null;

  Array.from(container.children).forEach((child) => {
    if (child.classList.contains('fila-label')) {
      currentRow = [];
      rows.push(currentRow);
    } else if (child.classList.contains('asiento')) {
      if (!currentRow) {
        currentRow = [];
        rows.push(currentRow);
      }
      currentRow.push(child);
    }
  });

  let globalIndex = 1;
  rows.forEach((row, rowIndex) => {
    row.forEach((seatEl, colIndex) => {
      // ID legible: seat-r-c (fila-columna)
      const rowNum = rowIndex + 1;
      const colNum = colIndex + 1;
      seatEl.id = `seat-${rowNum}-${colNum}`;
      // ID numérico y data attribute
      seatEl.dataset.seatId = String(globalIndex);
      seatEl.title = `Asiento ${rowNum}-${colNum} (ID ${globalIndex})`;
      // Mapear a butacas (últimas filas de `butacas` para alinear con la vista)
      const domRowsCount = rows.length;
      const startButacasRow = Math.max(0, N - domRowsCount);
      const butacasRowIndex = startButacasRow + rowIndex; // alineación a las últimas filas
      if (butacas[butacasRowIndex] && butacas[butacasRowIndex][colIndex]) {
        const model = butacas[butacasRowIndex][colIndex];
        seatEl.dataset.modelId = String(model.id);
        seatEl.dataset.modelState = String(model.estado);
        if (model.estado) {
          seatEl.classList.add('ocupado');
        } else {
          seatEl.classList.remove('ocupado');
        }
      }
      globalIndex++;
    });
  });

  console.log(`Asignados IDs a ${globalIndex - 1} asientos`);
}

// Ejecutar la asignación cuando el DOM esté listo
// Inicialización y listeners para sugerencias y reservas
document.addEventListener('DOMContentLoaded', () => {
  assignSeatIds();

  const inputNum = document.querySelector('.reserva input[type="number"]');
  const confirmBtn = document.querySelector('.reserva button');

  // Quitar selecciones previas (solo quita el estado preview)
  const clearPreviewSelection = () => {
    document.querySelectorAll('.asiento').forEach((el) => {
      if (el.dataset.preview === 'true') {
        // Solo removemos la clase 'ocupado' si no está realmente ocupada en el modelo
        if (el.dataset.modelState !== 'true') {
          el.classList.remove('ocupado');
        }
        delete el.dataset.preview;
      }
    });
  };

  // Resaltar asientos sugeridos usando la clase 'ocupado' temporalmente (marca preview)
  const highlightSuggestedSeats = (ids) => {
    clearPreviewSelection();
    if (!ids) return;
    ids.forEach((id) => {
      const el = document.querySelector(`[data-model-id="${id}"]`);
      if (el && el.dataset.modelState !== 'true') {
        el.classList.add('ocupado');
        el.dataset.preview = 'true';
      }
    });
  };

  // Escuchar input y hacer sugerencias
  if (inputNum) {
    inputNum.addEventListener('input', (e) => {
      const val = Number(e.target.value) || 0;
      if (val <= 0) {
        clearPreviewSelection();
        return;
      }
      const ids = suggest(val);
      highlightSuggestedSeats(ids);
    });
  }

  // Confirmar reserva: aplicar la reserva al modelo y actualizar UI
  if (confirmBtn && inputNum) {
    confirmBtn.addEventListener('click', (e) => {
      const val = Number(inputNum.value) || 0;
      if (val <= 0) return alert('Introduce un número de asientos a reservar');
      const reserved = applyReservation(val);
      if (reserved.size === 0) {
        alert('No se han podido reservar asientos (no hay hueco).');
      } else {
        alert(`Reservados ${reserved.size} asientos. ¡Gracias!`);
      }
    });
  }
});