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

/**
 * Esta sugiere una secuencia de ascientos consecutivos de una fila tomando con prioridad a mas alejada de la pantalla.
 *
 * Al ser una matriz cuadarada, se asume que el numero de asientos solicitados no es mayor al numero de columnas.
 * Se resetea las butacas sugeridas al cambiar de fila.
 *
 */
function suggest(num, butacas) {
    let butacasSugeridas = new Set();
    for (let i = butacas.length - 1; i >= 0 && butacasSugeridas.size < num; i--) {
        let maxColCondition = num <= butacas[i].length
        butacasSugeridas = new Set();
        for (let j = 0; j < butacas[i].length && maxColCondition && butacasSugeridas.size < num; j++) {
            if (butacas[i][j].estado === false) {
                butacasSugeridas.add(butacas[i][j]);
            } else {
                butacasSugeridas.clear();
            }  
        }
    }
    console.log(butacasSugeridas);
}

// Inicializar la matriz
let butacas = setup();
suggest(3, butacas);
console.log("================");
butacas = setup();
butacas[9][1].estado = true;
suggest(3, butacas);
console.log("================");
butacas = setup();
butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[9][2].estado = true;
suggest(4, butacas);