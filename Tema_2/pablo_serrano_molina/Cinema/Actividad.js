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
//console.log(butacas);

//numero de filas           butacas.length
//numero de butacas/fila    butacas[0].length
function suggest(nasientos){
    let butacas_ids = [];
    for (let fila=butacas.length-1, butacas_juntas=0; fila>=0 && nasientos<=butacas.length && butacas_juntas<nasientos; fila--){// Recorremos las filas del cine empezando por la ultima
        butacas_juntas=0;
        butacas_ids = [];
        for (let butaca=butacas[0].length-1; butaca>=0 && butacas_juntas<nasientos; butaca--){ // Recorremos las butacas de la fila
            if ( !butacas[fila][butaca].estado && ( butaca!==0 && butacas_juntas<nasientos ) ){// Butaca libre
                butacas_juntas++;
                butacas_ids.push(butacas[fila][butaca].id);
            } else {
                butacas_juntas=0;
                butacas_ids = [];
            }
        }
    }
    console.log("Butacas sugeridas: " + butacas_ids);
}
butacas[9][9].estado = true;
butacas[9][8].estado = true;
butacas[9][7].estado = true;
butacas[8][9].estado = true;
butacas[8][8].estado = true;
butacas[8][7].estado = true;
butacas[7][6].estado = true;
butacas[7][2].estado = true;
butacas[6][5].estado = true;
butacas[5][5].estado = true;
butacas[4][7].estado = true;
butacas[3][5].estado = true;
butacas[2][5].estado = true;
butacas[1][7].estado = true;
butacas[1][9].estado = true;
butacas[1][8].estado = true;
butacas[0][5].estado = true;
suggest(8);