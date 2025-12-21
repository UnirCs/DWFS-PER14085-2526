// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false // libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

let butacas = setup();


function suggest(numAsientos) {

    if (numAsientos > N) {
        return new Set();
    }

    let resultado = new Set();
    let encontrado = false;

    for (let i = N - 1; i >= 0 && !encontrado; i--) {
        let fila = butacas[i];
        let consecutivos = 0;
        let inicio = 0;

        for (let j = 0; j < N && !encontrado; j++) {
            if (!fila[j].estado) {
                consecutivos++;
                if (consecutivos === 1) inicio = j;

                if (consecutivos === numAsientos) {
                    for (let k = inicio; k < inicio + numAsientos; k++) {
                        resultado.add(fila[k].id);
                    }
                    encontrado = true;
                }
            } else {
                consecutivos = 0;
            }
        }
    }

    return resultado;
}




