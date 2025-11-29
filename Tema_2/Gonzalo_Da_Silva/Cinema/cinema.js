// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i of Array(N).keys()) {
        // Nueva fila
        let fila = [];
        for (let j of Array(N).keys()) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }

    butacas[0][3].estado = true;
    butacas[0][4].estado = true;
    butacas[9][5].estado = true;
    butacas[2][6].estado = true;
    butacas[2][7].estado = true;
    butacas[5][0].estado = true;
    butacas[5][9].estado = true;
    butacas[8][4].estado = true;
    butacas[8][5].estado = true;
    butacas[9][9].estado = true;

    return butacas;
}

const suggest = (butacas, reservations) => {
    let resultado = new Set();

    if (reservations <= N) {
        for (let fila of [...butacas].reverse()) {
            for (let j of new Array(N - reservations + 1).keys()) {
                const asientos = fila.slice(j, j + reservations);
                if (asientos.every(a => !a.estado) && resultado.size === 0) {
                    resultado = new Set(asientos.map(a => a.id));
                }
            }
        }
    }

    return resultado;
}


console.log(suggest(setup(), 10));