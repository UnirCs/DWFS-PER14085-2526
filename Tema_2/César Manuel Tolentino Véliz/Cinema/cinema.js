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

// Función para sugerir asientos
function suggest(numAsientos) {
    // Si el número de asientos solicitados excede el tamaño máximo de la fila, devolver set vacío
    if (numAsientos > N || numAsientos <= 0) {
        return new Set();
    }

    // Buscar desde la fila más lejana (última fila) hacia la más cercana (primera fila)
    for (let i = butacas.length - 1; i >= 0; i--) {
        const fila = butacas[i];
        let asientosConsecutivos = 0;
        let inicioBloque = -1;

        // Buscar asientos consecutivos libres en la fila actual
        for (let j = 0; j < fila.length; j++) {
            if (!fila[j].estado) { // Asiento libre
                if (asientosConsecutivos === 0) {
                    inicioBloque = j;
                }
                asientosConsecutivos++;
                
                // Si encontramos suficientes asientos consecutivos
                if (asientosConsecutivos === numAsientos) {
                    const asientosSeleccionados = new Set();
                    
                    // Agregar los IDs de los asientos al set
                    for (let k = inicioBloque; k < inicioBloque + numAsientos; k++) {
                        asientosSeleccionados.add(fila[k].id);
                    }
                    
                    return asientosSeleccionados;
                }
            } else { // Asiento ocupado, reiniciar contador
                asientosConsecutivos = 0;
                inicioBloque = -1;
            }
        }
    }

    // Si no se encontraron asientos consecutivos en ninguna fila
    return new Set();
}

// Inicializar la matriz
let butacas = setup();

// Pruebas de la función
console.log("=== PRUEBAS DE LA FUNCIÓN SUGGEST ===");

// Prueba 1: Solicitar más asientos de los disponibles en una fila
console.log("Prueba 1 - 11 asientos (más del máximo):", suggest(11));

// Prueba 2: Solicitar 0 o negativo asientos
console.log("Prueba 2 - 0 asientos:", suggest(0));
console.log("Prueba 3 - -1 asientos:", suggest(-1));

// Prueba 3: Solicitar asientos cuando todos están libres (debería dar los de la última fila)
console.log("Prueba 4 - 3 asientos (todos libres):", suggest(3));

// Prueba 4: Ocupar algunos asientos para probar
console.log("\nOcupando algunos asientos...");
// Ocupar los primeros 3 asientos de la última fila
butacas[N-1][0].estado = true;
butacas[N-1][1].estado = true;
butacas[N-1][2].estado = true;

// Prueba 5: Solicitar 4 asientos en última fila (debería encontrar en otra posición)
console.log("Prueba 5 - 4 asientos (con algunos ocupados):", suggest(4));

// Prueba 6: Ocupar más asientos para forzar búsqueda en otra fila
console.log("\nOcupando más asientos...");
// Ocupar todos los asientos de la última fila
for (let j = 0; j < N; j++) {
    butacas[N-1][j].estado = true;
}

// Prueba 7: Solicitar 5 asientos (debería buscar en penúltima fila)
console.log("Prueba 6 - 5 asientos (última fila ocupada):", suggest(5));

// Prueba 8: Mostrar matriz completa
console.log("\nMatriz completa de butacas:");
butacas.forEach((fila, index) => {
    const estados = fila.map(asiento => asiento.estado ? 'X' : 'O').join(' ');
    console.log(`Fila ${index + 1}: ${estados} | IDs: ${fila.map(a => a.id).join(', ')}`);
});