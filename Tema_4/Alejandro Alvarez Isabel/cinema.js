class Seat {
    constructor(id, state)
    {
        this.id = id;
        this.estado = state;
    }
}

const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {

            let state = false;

            fila.push({
                id: idContador++,
                estado: state, // Ahora estado siempre será false
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
// console.log(butacas);

function checkRowAvailable(row, num)
{
    if (row.length < num)
    {
        return -1;
    }

    for (let j = 0; j <= row.length - num; j++)
    {
        let free = true;
        for (let k = 0; k < num; k++)
        {
            const seat = row[j + k];
            if (seat.estado)
            {
                free = false;
                j = j + k;
                k = num;
            }
        }

        if (free)
        {
            return j;
        }
    }
    return -1;
}

function suggest(seats) {
    let finalSet = new Set();

    const bookingSeats = parseInt(seats, 10);

    if (isNaN(bookingSeats) || bookingSeats <= 0) {
        return finalSet;
    }

    if(bookingSeats > butacas[0].length) return finalSet;

    for (let i = butacas.length - 1; i >= 0; i--) {
        const fila = butacas[i];
        const startIndex = checkRowAvailable(fila, bookingSeats);

        if (startIndex !== -1) {
            for(let k = 0; k < bookingSeats; k++) {
                const seat = fila[startIndex + k];
                finalSet.add(seat.id);
            }
            console.log("Asientos sugeridos:", Array.from(finalSet));

            return finalSet;
        }
    }
    return finalSet;
}

function bookSeats(seats) {
    let seatsSet = suggest(seats);
    let freeSeats = Array.from(seatsSet);

    const maxSeats = 10;

    for (let i = 0; i < freeSeats.length; i++) {
        const seatId = freeSeats[i];
        let seatName = getIdBySeat(seatId);
        const seat = document.getElementById(seatName);

        const baseIndex = seatId - 1;
        const rowIndex = Math.floor(baseIndex / maxSeats);
        const colIndex = baseIndex % maxSeats;

        if (butacas[rowIndex] && butacas[rowIndex][colIndex]) {
            butacas[rowIndex][colIndex].estado = true;
        }

        if (seat) {
            seat.classList.replace("seats__available", "seats__reserved");
        }
    }
}

function getIdBySeat(seatId)
{
    const N = 10;

    if (typeof seatId !== 'number' || seatId < 1 || seatId > N * N) {

        return null;
    }
    const baseIndex = seatId - 1;
    const rowNum = Math.floor(baseIndex / N) + 1;
    const colIndex = baseIndex % N; // Índice de columna de 0 a 9
    const colLetter = String.fromCharCode('A'.charCodeAt(0) + colIndex);
    return rowNum.toString() + colLetter;
}

function changeView(viewIdToShow) {

    const allViews = ['user', 'cinema'];

    for (const id of allViews)
    {
        const viewElement = document.getElementById(id);

        if (viewElement)
        {
            if (id === viewIdToShow)
            {
                viewElement.classList.remove('hidden');
            }
            else
            {
                viewElement.classList.add('hidden');
            }
        }
    }
}




