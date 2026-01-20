//Caraga de Matriz de butacas
const filas = ["A", "B", "C", "D", "E"];
const columnas = 15;

// Matriz que obtine cada tiene {id, estado}
let seats = [];

function initializeSeats() {
  filas.forEach((fila) => {
    let filaArray = [];
    for (let i = 1; i <= columnas; i++) {
      filaArray.push({
        idHTML: fila + i,
        state: false, // false = libre
      });
    }
    seats.push(filaArray);
  });
  // console.log("Butacas inicializadas");
  // console.log(seats);
}

initializeSeats();

// Bloquear butacas (ocupados)
function lockSeats(listIDs) {
  listIDs.forEach((id) => {
    seats.forEach((row) => {
      row.forEach((seat) => {
        if (seat.idHTML === id) {
          seat.estado = true;
          const elementsSeat = document.getElementById(id);
          if (elementsSeat) {
            elementsSeat.classList.add("ocupado");
            elementsSeat.style.backgroundColor = "#c0c0c1"; // gris
          }
        }
      });
    });
  });
}

// Array de butacas ocupadas
lockSeats(["A3", "B4", "C7", "D5", "E10"]);

//función que sugere asientos y los señala
function suggest() {
  const input = document.getElementById("inputReservation");
  const numberSeats = parseInt(input.value);

  if (isNaN(numberSeats) || numberSeats <= 0) {
    clearSelection();
    return;
  }

  // Obtiene todos las butacas
  let freeSeats = [];

  seats.forEach((row) => {
    row.forEach((seat) => {
      if (!seat.state) {
        freeSeats.push(seat.idHTML);
      }
    });
  });

  // Validación de butacas
  if (numberSeats > freeSeats.length) {
    console.warn("No hay suficientes butacas disponibles");
    clearSelection();
    return;
  }

  // Tomar las últimas butacas libres
  let suggestedSeats = freeSeats.slice(-numberSeats);

  // console.log("Butacas sugeridas:", suggestedSeats);

  // Limpiar selecciones visuales previas
  clearSelection();

  // Marcar los nuevos sugeridos
  suggestedSeats.forEach((id) => {
    const asientoHTML = document.getElementById(id);
    if (asientoHTML) asientoHTML.classList.add("selected");
  });
}

//Limpiar visual del cine
function clearSelection() {
  document.querySelectorAll(".seat").forEach((seat) => {
    seat.classList.remove("selected");
  });
}

//Botón carga las seleciones de butacas
document.querySelector("#btnReservation").addEventListener("click", () => {
  const selectionSeat = [...document.querySelectorAll(".seat.selected")].map(
    (s) => s.id
  );
  if (selectionSeat.length === 0) {
    alert("No hay butacas seleccionados.");
    return;
  }
  console.log("Has reservado: " + selectionSeat.join(", "));
  alert("Has reservado: " + selectionSeat.join(", "));
});
