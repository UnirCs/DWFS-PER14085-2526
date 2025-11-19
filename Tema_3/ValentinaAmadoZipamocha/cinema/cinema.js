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

    console.log("Butacas inicializadas: ", butacas);

    return butacas;
}

function suggest(butacas, numButacas) {
    const N = butacas.length;
    if (numButacas > N) return new Set();

    const butacasSugeridas = new Set();

    // Función auxiliar para verificar si un bloque está libre
    function bloqueLibre(fila, inicio, cantidad) {
        for (let k = 0; k < cantidad; k++) {
            if (butacas[fila][inicio + k].estado) return false;
        }
        return true;
    }

    for (let fila = N - 1; fila >= 0; fila--) {
        const limite = N - numButacas;

        for (let inicio = 0; inicio <= limite; inicio++) {

            if (!bloqueLibre(fila, inicio, numButacas)) continue;

            // Agregar IDs del bloque encontrado
            for (let k = 0; k < numButacas; k++) {
                butacasSugeridas.add(butacas[fila][inicio + k].id);
            }

            console.log("Asientos sugeridos: ", butacasSugeridas);
            return butacasSugeridas; // ya encontramos el bloque
        }
    }

    return butacasSugeridas; // si no encuentra nada
}

function onInputSuggest() {
    let butacas = setup();
    let cantidad = Number.parseInt(document.getElementById("sillas").value);
    suggest(butacas, cantidad);
    }

let butacas = setup();



