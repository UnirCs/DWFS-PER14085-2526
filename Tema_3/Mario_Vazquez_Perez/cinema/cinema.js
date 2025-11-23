const N = 10; // Número de filas y columnas

function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
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

let result = suggest(10);

console.log(result);

function suggest(numSeats) {

    let adj_empty = [];

    numSeats = Number.parseInt(numSeats, 10);

    if (numSeats < 1 || numSeats > N) {
        console.log("El número de asientos solicitado excede el máximo de fila o es menor que 1");
        return adj_empty;
    }

    for(let i = N-1; i >= 0 && adj_empty.length !== numSeats; i--) { // Mientras no se agotan las filas y no se encuentra el número de asientos deseados
        adj_empty = [];
        for(let j = 0; j < N && adj_empty.length !== numSeats; j++) { // Mientras no se agotan los asientos de una fila y no se encuentra el número de asientos deseados
            if (!butacas[i][j].estado){
                adj_empty.push(butacas[i][j].id);
            }
        }
    }

    console.log(adj_empty);
    return adj_empty;
}
