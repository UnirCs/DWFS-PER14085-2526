function suggest(butacas, numAsientos) {
  let solution = new Set();
  let encontrado = false;

  if (butacas[0].length < numAsientos) return solution;

  let filaBusqueda = butacas.length - 1;
  while (!encontrado && filaBusqueda >= 0) {
    for (let i = 0; i < butacas[filaBusqueda].length && !encontrado; i++) {
      if (!butacas[filaBusqueda][i].estado) {
        solution.add(butacas[filaBusqueda][i].id);
        if (solution.size === numAsientos) encontrado = true;
      } else {
        solution.clear();
      }
    }
    filaBusqueda--;
    if (!encontrado) solution.clear();
  }
  return solution;
}

function setup() {
  butacas = [];
  const filas = ["A", "B", "C", "D", "E"];
  const columnas = 7;

  for (let i of filas) {
    let fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push({
        id: i + (j + 1),
        estado: false,
      });
    }
    butacas.push(fila);
  }
  return butacas;
}

function encontrarButacas() {
  let numAsientos = document.getElementById("input-asientos").value;
  let asientosEncontrados = suggest(butacas, Number(numAsientos));
  console.log("Asientos encontrados: " + [...asientosEncontrados]);
}

var butacas = [];

addEventListener("DOMContentLoaded", () => {
  butacas = setup();
});

seats.forEach((button) => {
  button.addEventListener("click", () => {
    butacas[button.dataset.fila][button.dataset.columna].estado =
      !butacas[button.dataset.fila][button.dataset.columna].estado;
  });
});

document.getElementById("button-confirrmar-seleccion").onclick = () => {
  encontrarButacas();
};
