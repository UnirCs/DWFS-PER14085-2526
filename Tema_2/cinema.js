//CODIGO DE APOYO
// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];
    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({ id: idContador++, estado: false });
        }
        butacas.push(fila);
    }
    return butacas;
}

// MI CODIGO:
/**
 * Sugiere un conjunto de asientos contiguos disponibles en una sola fila.
 * Prioriza las filas traseras (índices más altos).
 */
function suggest(butacas, numAsientos) {
    // Itera desde la última fila hacia la primera
    for (let i = butacas.length - 1; i >= 0; i--) {
        let set = new Set();
        // Itera a través de los asientos en la fila actual
        for (let j = 0; j < butacas[i].length; j++) {
            if (!butacas[i][j].estado) {
                // Si el asiento está disponible, añádelo al conjunto temporal
                set.add(butacas[i][j].id);
                // Si se han acumulado suficientes asientos contiguos, devuélvelos
                if (set.size === numAsientos) return set;
            } else {
                // Si se encuentra un asiento ocupado, reinicia el conjunto de contiguos
                set.clear();
            }
        }
    }
    // Devuelve un conjunto vacío si no hay recomendaciones que cumplan el criterio
    return new Set();
}

// EJECUCION DE PRUEBA:
let butacas = setup();
console.log("Estado inicial de las butacas (solo IDs):", butacas.map(fila => fila.map(b => b.id)));
let numAsientos = 3;
let sugerencia = suggest(butacas, numAsientos);
console.log(`\nSugerencia para ${numAsientos} asientos:`, sugerencia);

// Prueba con asientos ocupados
// Ocupamos algunos asientos para simular un caso más realista
// Nota: Corregí la forma de acceder a los elementos para la prueba
butacas[9][0].estado = true; // Ocupa el asiento 91 (fila 10, columna 1)
butacas[9][1].estado = true; // Ocupa el asiento 92
butacas[8][5].estado = true; // Ocupa el asiento 86
let sugerenciaOcupados = suggest(butacas, numAsientos);
console.log(`\nSugerencia para ${numAsientos} asientos con algunos ocupados:`, sugerenciaOcupados);
// Debería sugerir los asientos 93, 94, 95 ya que 91 y 92 están ocupados.