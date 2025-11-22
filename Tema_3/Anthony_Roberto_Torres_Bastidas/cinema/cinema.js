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
 * Esta sugiere una secuencia de asientos consecutivos de una fila tomando con prioridad a más alejada de la pantalla.
 *
 * @param {number} num - Número de asientos consecutivos a buscar
 * Al ser una matriz cuadrada, se asume que el número de asientos solicitados no es mayor al número de columnas.
 * Se resetea las butacas sugeridas al cambiar de fila.
 *
 */
function suggest(num) {
    let butacasSugeridas = new Set();
    if (num <= butacas.length) {
        for (let i = butacas.length - 1; i >= 0 && butacasSugeridas.size < num; i--) {
        butacasSugeridas.clear()
        for (let j = 0; j < butacas[i].length && butacasSugeridas.size < num; j++) {
            if (!butacas[i][j].estado) {
                butacasSugeridas.add(butacas[i][j]);
            } else {
                butacasSugeridas.clear();
            }  
        }
    }
    }

    console.log([...butacasSugeridas]);
}

console.log("Butacas inicializadas");
let butacas = setup();


