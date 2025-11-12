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
				// Safe: randomness is not used for security purposes
                estado: Boolean(Math.round(Math.random())) // Estado aleatorio
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

//Creamos matriz de butacas con estados aleatorios
let butacas = setup();
console.log(butacas)

function suggest(asientosReq) {
    // Creamos Set vacío
    let preSelect = new Set();
    for(let i = butacas.length-1; (i >= 0) && (preSelect.size < asientosReq); i--) {
        for (let j = 0; (j < butacas[i].length) && (preSelect.size < asientosReq); j++) {
            if(!butacas[i][j].estado){ preSelect.add(butacas[i][j].id); }
            else{ preSelect.clear(); }
        }
        if(preSelect.size < asientosReq){ preSelect.clear(); }
    }
    return preSelect;
}

console.log(suggest(4));
