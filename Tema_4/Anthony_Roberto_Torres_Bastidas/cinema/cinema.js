document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("ticketCount")
        .addEventListener("input", blockSeats)
});

// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas
// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 0; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

/**
 * Esta sugiere una secuencia de asientos consecutivos de una fila tomando con prioridad a más alejada de la pantalla.
 *
 * @param {number} num - Número de asientos consecutivos a buscar
 * Al ser una matriz cuadrada, se asume que el número de asientos solicitados no es mayor al número de columnas.
 * Se resetea las butacas sugeridas al cambiar de fila.
 *
 */
function suggest(num) {
    let butacasSugeridas = new Set();
    if (num <= seats.length) {
        for (let i = seats.length - 1; i >= 0 && butacasSugeridas.size < num; i--) {
            butacasSugeridas.clear()
            for (let j = 0; j < seats[i].length && butacasSugeridas.size < num; j++) {
                if (!seats[i][j].estado) {
                    butacasSugeridas.add(seats[i][j]);
                } else {
                    butacasSugeridas.clear();
                }
            }
        }
    }
    return butacasSugeridas;
}

/**
 * Crea un botón de asiento.
 * @param i
 * @param j
 * @returns {HTMLButtonElement}
 */
function createSeatButton(i, j) {
    let btnSeat = document.createElement('button');
    const id = `${i}${j}`;
    btnSeat.className = 'seat';
    if (seats[i][j].estado) {
        btnSeat.className = 'seat-disabled';
    }
    btnSeat.id = id;
    btnSeat.textContent = id;
    return btnSeat;
}

/**
 * Crea la estructura de una fila de asientos.
 * @param rowIndex
 * @returns {{divRow: HTMLDivElement, divRowName: HTMLDivElement, divRowGroup: HTMLDivElement}}
 */
function createRowStructure(rowIndex) {
    let divRow = document.createElement('div');
    let divRowName = document.createElement('div');
    let divRowGroup = document.createElement('div');
    divRow.className = 'row g-0 seats-row';
    divRowName.className = 'col-1 row-label';
    divRowGroup.className = 'col seats-group';
    divRowName.textContent = "Fila " + (rowIndex + 1);
    return { divRow, divRowName, divRowGroup };
}

/**
 * Función para imprimir la matriz de asientos en el DOM.
 */
function printSeats(){
    for (let i = 0; i < seats.length; i++) {
        const { divRow, divRowName, divRowGroup } = createRowStructure(i);
        divRow.appendChild(divRowName);
        divRow.appendChild(divRowGroup);
        for (let j = 0; j < seats[i].length; j++) {
            const btnSeat = createSeatButton(i, j);
            divRowGroup.appendChild(btnSeat);
        }
        document.getElementById("rows").appendChild(divRow);
    }
}

/**
 * Resetea las sugerencias de asientos en el DOM.
 */
function resetSeatSuggestions() {
    const buttonsInSeatsArea = document.querySelectorAll('#rows button');
    buttonsInSeatsArea.forEach(button => {
        button.disabled = false;
        button.classList.remove("seat-suggested");
    });
}

/**
 * Aplica las sugerencias de asientos en el DOM.
 * @param suggestedSeats
 */
function applySeatSuggestions(suggestedSeats) {
    suggestedSeats.forEach(seatObj => {
        for (let i = 0; i < seats.length; i++) {
            for (let j = 0; j < seats[i].length; j++) {
                if (seats[i][j].id === seatObj.id) {
                    let seatElement = document.getElementById(`${i}${j}`);
                    if (seatElement) {
                        seatElement.disabled = true;
                        seatElement.classList.add("seat-suggested");
                    }
                    break;
                }
            }
        }
    });
}

/**
 * Maneja el evento de bloqueo de asientos.
 * @param event
 */
const blockSeats = (event) => {
    resetSeatSuggestions();
    const numberOfSeat = parseInt(event.target.value) || 0;
    if (numberOfSeat > 0){
        let suggestSeats = suggest(numberOfSeat);
        applySeatSuggestions(suggestSeats);
    }
}

console.log("Butacas inicializadas");
let seats = setup();
seats[9][9].estado = true // for testing proposed seats
seats[9][8].estado = true // for testing proposed seats
seats[9][7].estado = true // for testing proposed seats
seats[8][8].estado = true // for testing proposed seats
seats[7][5].estado = true // for testing proposed seats
seats[6][5].estado = true // for testing proposed seats
printSeats();



