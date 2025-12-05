// Definir el tamaño de la matriz de butacas
const N = 7; // Número de filas y columnas

let butacas = [];

document.addEventListener("DOMContentLoaded", () => {
    butacas = setup();

    renderSeatMap();

    const seatInput = document.getElementById("seatInput");
    seatInput.addEventListener("input", handleInputChange);
});

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            const ocupado = Math.random() < 0.2; // Agregar algun asiento como coupado (20 % probabilidad)
            fila.push({
                id: idContador++,
                estado: ocupado
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

function renderSeatMap() {
    const seatMap = document.getElementById("seatMap");
    seatMap.innerHTML = ""; // Clean all

    for (let row = 0; row < N; row++) {
        const rowContainer = document.createElement("div");
        rowContainer.className = "seat-row";

        const rowLabel = document.createElement("div");
        rowLabel.className = "row-label";
        rowLabel.textContent = String.fromCharCode(65 + row);
        rowContainer.appendChild(rowLabel);

        const seatsRow = document.createElement("div");
        seatsRow.className = "seats-row";

        for (let col = 0; col < N; col++) {
            const seat = butacas[row][col];

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "seat-checkbox";
            checkbox.id = `seat-${seat.id}`;
            checkbox.dataset.seatId = seat.id;
            checkbox.disabled = seat.estado;

            const label = document.createElement("label");
            label.htmlFor = checkbox.id;
            label.classList.add("seat");
            label.dataset.seatId = seat.id;
            label.textContent = (col + 1).toString();

            label.classList.add(seat.estado ? "reserved" : "available");

            seatsRow.appendChild(checkbox);
            seatsRow.appendChild(label);
        }

        rowContainer.appendChild(seatsRow);
        seatMap.appendChild(rowContainer);
    }
}

function suggest(seats) {
    let together = 0;
    let rows = butacas.length;
    let columns = butacas[0].length;
    if (seats > columns) {
        return new Set();
    }
    let found = false;
    let suggested = new Set();
    for (let row= rows - 1; row >= 0  && !found; row--){
        together = 0;
        suggested = new Set();
        for (let column = 0; column < columns && !found; column++){
            if (butacas[row][column].estado) { // si el asiento esta ocupado
                together = 0;
                suggested = new Set();
            }
            else { // si el asiento esta libre
                together ++;
                suggested.add(butacas[row][column].id);
                if (together === seats) {
                    found = true;
                }
            }
        }
    }
    return found ? suggested : new Set();
}

function handleInputChange(event) {
    const value = Number(event.target.value);

    clearSuggestedSeats();

    if (Number.isNaN(value) || value <= 0) {
        return;
    }

    const suggestedSeats = suggest(value);
    highlightSuggestedSeats(suggestedSeats);
    console.log("Asientos sugeridos:", suggestedSeats);
}

function clearSuggestedSeats() {
    const selectedLabels = document.querySelectorAll(".seat.selected");
    selectedLabels.forEach(label => label.classList.remove("selected"));
}

function highlightSuggestedSeats(seatIdSet) {
    seatIdSet.forEach(id => {
        const label = document.querySelector(`label[data-seat-id="${id}"]`);
        if (label && !label.classList.contains("reserved")) {
            label.classList.add("selected");
        }
    });
}
