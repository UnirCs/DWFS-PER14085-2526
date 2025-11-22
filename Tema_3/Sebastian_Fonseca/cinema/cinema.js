// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
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

// Inicializar la matriz
let butacas = setup();

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

console.log("Butacas inicializadas");
console.log("Asientos sugeridos:", suggest(0));

function handleInputChange(event) {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
        console.log("Asientos sugeridos:", suggest(value));
    }
}