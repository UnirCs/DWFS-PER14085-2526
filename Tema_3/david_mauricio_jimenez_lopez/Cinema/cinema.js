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
 * Función para sugerir butacas consecutivas disponibles
 * @param {number} numero_butacas - Número de butacas consecutivas a buscar
 * @returns {Set} Set con los IDs de las butacas sugeridas
 */
function suggest(numero_butacas) {
    if (numero_butacas > N) return new Set();
    let resultado_butacas = new Set();
    for (let fila = N - 1; fila >= 0 && resultado_butacas.size === 0; fila--) {
        for (let col = 0; col <= N - numero_butacas && resultado_butacas.size === 0; col++) {
            let butacas_concecutivas = butacas[fila].slice(col, col + numero_butacas);
            if (butacas_concecutivas.every(butaca => !butaca.estado)) {
                // Aquí marco asientos como ocupados para que en la proxima busqueda sean descartados
                butacas_concecutivas.forEach(butaca => butaca.estado = true);
                resultado_butacas = new Set(butacas_concecutivas.map(butaca => butaca.id));
            }
        }
    } 
    console.log('El set a devolver:', resultado_butacas);
    return resultado_butacas;
}

// Inicializar la matriz
let butacas = setup();

// Marcar 3 butacas aleatoriamente

butacas[6][3].estado = true;
butacas[6][8].estado = true;
butacas[7][3].estado = true;
