// Definir el tamaño de la matriz de butacas
const N = 5; // Número de filas y columnas

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

function suggest(numAsientos) {
    const resultado = new Set();

    if (numAsientos > N) {
        console.log("Número de asientos mayor que filas disponibles.");
        return resultado;
    }

    let entradasConseguidas = false;
    let fila = N - 1;

    while (fila >=0 && !entradasConseguidas) {
        let filaActual = butacas[fila];
        let contadorConsecutivos = 0;
        let columna = 0;

        while (columna < N && contadorConsecutivos < numAsientos) {
            if (filaActual[columna].estado === false) {
                contadorConsecutivos++;
            } else {
                contadorConsecutivos = 0;
            }
            columna++;
        }

        if (contadorConsecutivos === numAsientos) {
            entradasConseguidas = true;
            for (let j = columna-numAsientos; j < columna; j++) {
                resultado.add(filaActual[j].id);
            }
        }

        fila--;
    }
    console.log("Resultado suggest(", numAsientos, "):", resultado);
    return resultado;
}

// Imprimir la matriz
console.log(butacas);