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

// Imprimir la matriz
console.log(butacas);

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

    return resultado;
}

//Pruebas
//Preuba 1 : Solicitar 11 butacas
console.log(suggest(11)); 
//Prueba 2 : Solicitar asientos mas lejanos
console.log(suggest(3));
//Preuba 3 : Solicitar asientos juntos
console.log(suggest(10)); 
//Preuba 4 : Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));
console.log(suggest(10));



