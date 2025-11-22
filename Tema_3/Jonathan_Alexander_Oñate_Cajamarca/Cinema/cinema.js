// Definir el tamaño de la matriz de butacas
const N = 10 // Número de filas y columnas

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
console.log('butacas inicializadas');
let butacas = setup();

function suggest(numAsientos) {  
    let sugAsientos = [];  
    if (numAsientos <= 0 || numAsientos > N) {
        console.log('Sugerencia de Asientos: '+ sugAsientos.length);
        console.log(sugAsientos);
        return sugAsientos;
    }
    let colFin = N - 1;
    for(let i = colFin; i >= 0 && sugAsientos.length < numAsientos; i--){
        sugAsientos = [];
        for(let j = 0; j < N && sugAsientos.length < numAsientos; j++){
            if (!butacas[i][j].estado) {
                sugAsientos.push(butacas[i][j].id);
            } else {
                sugAsientos.splice(0);
            } 
        }
    }
    console.log('Sugerencia de Asientos: ' + sugAsientos.length);
    console.log(sugAsientos);
    return sugAsientos;
}
butacas[9][0].estado = true;
butacas[9][2].estado = true;
butacas[9][4].estado = true;
butacas[9][6].estado = true;
