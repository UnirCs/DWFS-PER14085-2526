// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
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

// Imprimir la matriz
console.log("Butacas inicializadas");

function suggest(numSolicitados) {
    const resultado = new Set();

    let entradaValida = true;
    let encontrado = false;   
    let fila = 0;             
    let inicio = 0;         

    if (!Number.isInteger(numSolicitados) || numSolicitados <= 0) {
        entradaValida = false;
    }
    if (numSolicitados > N) {
        entradaValida = false;
    }

    if (entradaValida === true) {

        for (let i = butacas.length - 1; i >= 0 && encontrado === false; i--) {

            for (let start = 0; start <= N - numSolicitados && encontrado === false; start++) {

                let bloqueLibre = true;

                for (let j = start; j < start + numSolicitados; j++) {
                    if (butacas[i][j].estado === true) {
                        bloqueLibre = false;
                    }
                }

                if (bloqueLibre === true) {
                    encontrado = true;
                    fila = i;
                    inicio = start;
                }
            }
        }

        if (encontrado === true) {
            for (let j = inicio; j < inicio + numSolicitados; j++) {
                butacas[fila][j].estado = true;
                resultado.add(butacas[fila][j].id);
            }
        }
    }

   
    console.log('Asientos sugeridos:', resultado);

    return resultado;
}

