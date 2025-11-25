// Constantes de configuración
const N = 10; // Número de filas y columnas

/**
 * Inicializa la matriz de butacas
 * @returns {Array} Matriz de butacas con id y estado
 */
function setup() {
    let idContador = 1;
    return Array.from({ length: N }, () =>
        Array.from({ length: N }, () => ({
            id: idContador++,
            estado: false
        }))
    );
}

/**
 * Busca asientos consecutivos disponibles en una fila específica
 * @param {Array} fila - Fila de butacas
 * @param {number} numAsientos - Número de asientos consecutivos requeridos
 * @returns {Set|null} Set con IDs de asientos o null si no se encontraron
 */
function buscarEnFila(fila, numAsientos) {
    let consecutivos = 0;
    let inicio = -1;

    for (let j = 0; j < fila.length; j++) {
        if (!fila[j].estado) {
            if (consecutivos === 0) inicio = j;
            if (++consecutivos === numAsientos) {
                return new Set(fila.slice(inicio, inicio + numAsientos).map(b => b.id));
            }
        } else {
            consecutivos = 0;
        }
    }
    return null;
}

/**
 * Sugiere asientos disponibles comenzando desde la última fila
 * @param {number} numAsientos - Número de asientos a reservar
 * @returns {Set} Set con los IDs de asientos sugeridos o Set vacío
 */
function suggest(numAsientos) {
    if (numAsientos > N || numAsientos <= 0) return new Set();

    for (let i = N - 1; i >= 0; i--) {
        const resultado = buscarEnFila(butacas[i], numAsientos);
        if (resultado) return resultado;
    }

    return new Set();
}

/**
 * Ocupa asientos específicos en la sala
 * @param {Array} asientosAOcupar - Array de objetos {fila, columna} o {fila, inicio, fin}
 */
function ocuparAsientos(asientosAOcupar) {
    asientosAOcupar.forEach(({ fila, columna, inicio, fin }) => {
        if (columna !== undefined) {
            butacas[fila][columna].estado = true;
        } else if (inicio !== undefined && fin !== undefined) {
            for (let j = inicio; j <= fin; j++) {
                butacas[fila][j].estado = true;
            }
        }
    });
}

/**
 * Visualiza el estado actual de la sala
 */
function mostrarSala() {
    console.log("\n=== Estado de la Sala ===");
    console.log("(PANTALLA)");
    butacas.forEach((fila, i) => {
        const filaStr = fila.map(butaca => butaca.estado ? "[X]" : "[ ]").join("");
        console.log(`Fila ${i + 1}: ${filaStr}`);
    });
}

/**
 * Ejecuta una prueba del algoritmo suggest
 * @param {string} nombre - Nombre de la prueba
 * @param {number} numAsientos - Número de asientos a solicitar
 * @param {boolean} mostrarResultado - Si se debe mostrar el resultado completo
 */
function ejecutarPrueba(nombre, numAsientos, mostrarResultado = true) {
    console.log(`\n=== ${nombre} ===`);
    const resultado = suggest(numAsientos);
    console.log("Asientos sugeridos:", resultado);
    
    if (mostrarResultado && resultado.size === 0) {
        console.log("¿Set vacío?", true);
    }
    
    return resultado;
}

// Inicializar la matriz
let butacas = setup();

// ===== SUITE DE PRUEBAS =====

// Prueba 1: Sala vacía
ejecutarPrueba("Prueba 1: Solicitar 3 asientos en sala vacía", 3);

// Prueba 2: Asientos ocupados en última fila
ocuparAsientos([
    { fila: 9, inicio: 5, fin: 7 }
]);
ejecutarPrueba("Prueba 2: Ocupar algunos asientos y volver a buscar", 5);

// Prueba 3: Solicitud mayor al máximo permitido
ejecutarPrueba("Prueba 3: Solicitar más asientos de los que caben en una fila", 15);

// Prueba 4: Buscar en fila anterior
ocuparAsientos([
    { fila: 9, inicio: 0, fin: 8 },
    { fila: 8, inicio: 0, fin: 1 }
]);
ejecutarPrueba("Prueba 4: Ocupar varias filas y buscar en fila anterior", 4);

// Prueba 5: Sin espacio suficiente
for (let i = 0; i < N; i++) {
    ocuparAsientos([{ fila: i, inicio: 0, fin: N - 3 }]);
}
ejecutarPrueba("Prueba 5: No hay espacio suficiente en ninguna fila", 3);

// Mostrar estado final de la sala
mostrarSala();