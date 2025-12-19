// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de ID en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: true // Sala vacía
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

function suggest(n1) {
    console.clear();
    let conjunto = new Set();
    let juntos = 0;

    for (let fila = butacas.length - 1; fila > 0 && n1 <= butacas.length; fila--) {
        for (let columna = 0; columna < butacas[fila].length && n1 !== juntos; columna++) {
            if (butacas[fila][columna].estado){
                juntos += 1;
                conjunto.add(butacas[fila][columna].id);
            }
            else {
                juntos = 0;
                conjunto = new Set();
            }
        }
    }
    console.log(conjunto);
    return conjunto;
}

let resultado = suggest();
console.log(resultado);