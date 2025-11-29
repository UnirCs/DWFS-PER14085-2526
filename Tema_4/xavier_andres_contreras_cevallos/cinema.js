function setup() {
  let idContador = 1;
  let butacas = [];

  for (let i = 0; i < N; i++) {
    let fila = [];
    const sectionAsientos = document.getElementById("cinema-seats");
    const filaElemento = document.createElement("div");
    filaElemento.className = "cinema-seats__row";
    const etiquetaElemento = document.createElement("p");
    etiquetaElemento.textContent = `Fila ${i + 1}`;
    etiquetaElemento.className = "cinema-seats-row__label";
    filaElemento.appendChild(etiquetaElemento);
    sectionAsientos.appendChild(filaElemento);
    for (let j = 0; j < N; j++) {
      const asientoElemento = document.createElement("div");
      asientoElemento.className = "cinema-seats-row__seat";
      asientoElemento.id = idContador;
      filaElemento.appendChild(asientoElemento);
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

function suggest(numAsientos) {
  const response = new Set();
  if (numAsientos > N) return response;

  document.querySelectorAll(".suggested").forEach((seat) => {
    seat.classList.remove("suggested");
  });

  [...butacas].reverse().forEach((fila, i) => {
    for (let j = 0; j <= N - numAsientos; j++) {
      if (
        fila.slice(j, j + numAsientos).every((b) => !b.estado) &&
        response.size < numAsientos
      ) {
        fila.slice(j, j + numAsientos).forEach((b) => {
          document.getElementById(b.id).classList.add("suggested");
          response.add(b.id);
        });
      }
    }
  });

  return response;
}

window.addEventListener("load", () => {
  const input = document.getElementById("seat-number");
  const submitButton = document.querySelector("input[type='submit']");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let selected_ids = []
    let suggestedSeats = document.querySelectorAll(".suggested")

    suggestedSeats.forEach((seat) => {
      selected_ids.push(parseInt(seat.id, 10));
      seat.classList.remove("suggested");
      seat.classList.add("selected");
    });

    butacas.forEach((fila) => {
      fila.forEach((b) => {
        if (selected_ids.includes(b.id)) {
          b.estado = true;
        }
      });
    });
  });

  input.addEventListener("change", (event) => {
    const value = parseInt(event.target.value, 10);
    const suggestedSeats = suggest(value);
    console.log("🚀 ~ suggestedSeats:", suggestedSeats);
  });
});
