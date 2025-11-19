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

function suggest(numAsientos) {
  const response = new Set();
  if (numAsientos > N) return response;

  [...butacas].reverse().forEach((fila, i) => {
    for (let j = 0; j <= N - numAsientos; j++) {
      if (
        fila.slice(j, j + numAsientos).every((b) => !b.estado) &&
        response.size < numAsientos
      ) {
        fila.slice(j, j + numAsientos).forEach((b) => {
          response.add(b.id);
        });
      }
    }
  });

  return response;
}

window.addEventListener("load", () => {
  setup();
  const input = document.getElementById("seat-number");

  input.addEventListener("input", (event) => {
    const value = parseInt(event.target.value, 10);
    const suggestedSeats = suggest(value);
    console.log("🚀 ~ suggestedSeats:", suggestedSeats);
  });
});
