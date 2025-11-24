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


const suggest = (reserva) => {
    let sugerencia = new Set();
    if (reserva <= N) {
        let filaEncontrada = false;
        for (let i = N - 1; i >= 0 && !filaEncontrada; i--) {
            let libres = butacas[i].filter(asiento => asiento.estado === false);
            if (libres.length >= reserva) {
                sugerencia = new Set(libres.slice(0, reserva).map(asiento => asiento.id));
                filaEncontrada = true;
            }
        }
    }
    return sugerencia;
}

const showSuggestions = (reserva) => {
    const suggestions = suggest(reserva);
    console.log(suggestions);
}
