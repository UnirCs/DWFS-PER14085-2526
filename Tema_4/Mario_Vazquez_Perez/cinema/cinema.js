const FILAS = 6; // Número de filas
const COLUMNAS_POR_FILA = [
    16, // Número de columnas fila 1
    14, // Número de columnas fila 2-5
    14,
    14,
    14,
    12 // Número de columnas fila 6
]

const MAX_COLUMNAS = Math.max(...COLUMNAS_POR_FILA);

const ROWS_LEFT = document.querySelectorAll('#left-section .theater__seats')
const ROWS_RIGHT = document.querySelectorAll('#right-section .theater__seats')
let domSeats;

function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < FILAS; i++) {
        let fila = [];
        let columnas = COLUMNAS_POR_FILA[i];
        for (let j = 0; j < columnas; j++) {
            fila.push({
                id: idContador++,
                estado: false
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

let butacas = setup();

console.log(butacas);
console.log("Butacas inicializadas");

fillButacas();

function fillButacas(){
    for (let i = 0; i < FILAS; i++) {
        const filaLogica = butacas[i];

        // Juntamos de la fila i a la izquierda y derecha para poner ids consecutivos en una misma fila
        const seatsLeft  = ROWS_LEFT[i].querySelectorAll('.seat:not(.seat--wheelchair)');
        const seatsRight = ROWS_RIGHT[i].querySelectorAll('.seat:not(.seat--wheelchair)');

        domSeats = [...seatsLeft, ...seatsRight];

        if (domSeats.length !== filaLogica.length) {
            console.warn(
                `Fila ${i + 1}: DOM=${domSeats.length}, lógica=${filaLogica.length}`
            );
        }

        for (const btn of domSeats) {
            const j = domSeats.indexOf(btn);
            const butaca = filaLogica[j];

            btn.id = "seat-" + butaca.id;


            btn.addEventListener('click', () => toggleButaca(butaca.id));
        }
    }
    occupiedButaca();
}

function toggleButaca(id){
    let seat = document.getElementById('seat-' + id);
    seat.classList.toggle('seat--selected');
}

function suggestButaca(id){
    let seat = document.getElementById('seat-' + id);
    seat.classList.add('seat--selected');
}

function occupiedButaca() {

   for (const element of butacas) {
       for (const b of element) {
           if (b.estado) {
               let seat = document.getElementById('seat-' + b.id);
               seat.classList.add('seat--occupied');
           }
       }
   }
}

function clearButacas() {
    const seats = document.querySelectorAll('.theater__seats .seat--selected');
    for (const seat of seats) {
        seat.classList.remove('seat--selected');
    }
}

function suggest(numSeats) {

    let adj_empty = [];

    numSeats = Number.parseInt(numSeats, 10);

    if (Number.isNaN(numSeats) ||numSeats < 1 || numSeats > MAX_COLUMNAS) {
        console.log("El número de asientos solicitado excede el máximo de fila o es menor que 1");
        clearButacas();
        return adj_empty;
    }

    for(let i = FILAS-1; i >= 0 && adj_empty.length !== numSeats; i--) { // Mientras no se agotan las filas y no se encuentra el número de asientos deseados
        adj_empty = [];
        clearButacas();
        let col = COLUMNAS_POR_FILA[i];
        for(let j = 0; j < col && adj_empty.length !== numSeats; j++) { // Mientras no se agotan los asientos de una fila y no se encuentra el número de asientos deseados
            if (!butacas[i][j].estado){
                adj_empty.push(butacas[i][j].id);
            }
        }
    }

    console.log(adj_empty);

    for (const id of adj_empty) {
        suggestButaca(id);
    }

    return adj_empty;
}
