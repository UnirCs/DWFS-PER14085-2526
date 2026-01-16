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

// Función principal suggest
const suggest = (numAsientos) => {
    const asientosTemp = new Set();

    if (numAsientos <= N) {
        // Buscar desde la fila más LEJANA hasta la más CERCANA
        for (let i = N - 1; i >= 0 && asientosTemp.size < numAsientos; i--) {
            asientosTemp.clear();// Limpiar el Set antes de buscar en cada fila
            // Buscar asientos libres y consecutivos en la fila actual
            for (let j = 0; j < N && asientosTemp.size < numAsientos && N - j >= numAsientos - asientosTemp.size; j++) {
                if (!butacas[i][j].estado) { // Si el asiento está libre
                    asientosTemp.add(butacas[i][j].id);
                } else {
                    asientosTemp.clear(); // Si encontramos un asiento ocupado, limpiamos
                }
            }
        }
    }
    return asientosTemp.size === numAsientos ? asientosTemp : new Set();
};

// Imprimir la matriz
console.log(butacas);

// Imprimir el numero de reservas
console.log(suggest(4));