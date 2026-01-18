
// TEMA 4 - Cinema (DOM + Suggest)
let FILAS = 0;
let COLS = 0;
let butacas = [];

function setupFromDOM() {
  const filasDOM = document.querySelectorAll(".sala .fila");
  FILAS = filasDOM.length;
  COLS = filasDOM[0]?.querySelectorAll(".butaca").length || 0;

  let idContador = 1;
  const model = [];

  for (let i = 0; i < FILAS; i++) {
    const fila = [];
    for (let j = 0; j < COLS; j++) {
      fila.push({
        id: idContador++,
        estado: false, 
        domId: "",
      });
    }
    model.push(fila);
  }

  return model;
}
function suggest(k) {
  const resultado = new Set();
  let encontrado = false;

  if (!Number.isInteger(k) || k <= 0 || k > COLS) {
    console.log("k inválido:", k, `(debe ser 1..${COLS})`);
    return resultado;
  }

  for (let i = FILAS - 1; i >= 0 && !encontrado; i--) {
    const fila = butacas[i];
    let libresSeguidos = 0;

    for (let j = 0; j < COLS && !encontrado; j++) {
      if (!fila[j].estado) libresSeguidos++;
      else libresSeguidos = 0;

      if (libresSeguidos === k) {
        const inicio = j - k + 1;
        for (let x = inicio; x <= j; x++) {
          resultado.add(fila[x].id);
        }
        encontrado = true;
      }
    }
  }
  console.log("Resultado sugerido para k =", k, "→", resultado);
  return resultado;
}

function clearSuggestion() {
  document
    .querySelectorAll(".butaca.preseleccionada")
    .forEach((el) => el.classList.remove("preseleccionada"));
}

function paintSuggestion(idsSet) {
  clearSuggestion();

  idsSet.forEach((numericId) => {
    const el = document.getElementById(`seat-${numericId}`);
    if (!el) return;
    if (el.classList.contains("ocupada")) return;

    el.classList.add("preseleccionada");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  butacas = setupFromDOM();

  const seats = document.querySelectorAll(".sala .butaca");
  let idx = 0;

  for (let i = 0; i < FILAS; i++) {
    for (let j = 0; j < COLS; j++) {
      const seatEl = seats[idx++];
      if (!seatEl) continue;

      const numericId = butacas[i][j].id;
      const domId = `seat-${numericId}`;

      seatEl.id = domId;
      butacas[i][j].domId = domId;

      if (seatEl.classList.contains("ocupada")) {
        butacas[i][j].estado = true;
      }
    }
  }
  const input = document.getElementById("numSeats");
  if (input) {
    const handler = () => {
      const k = parseInt(input.value, 10);

      if (Number.isNaN(k) || k <= 0) {
        clearSuggestion();
        return;
      }

      const ids = suggest(k);
      paintSuggestion(ids);
    };

    input.addEventListener("change", handler);
    input.addEventListener("input", handler);
  }
  
});
