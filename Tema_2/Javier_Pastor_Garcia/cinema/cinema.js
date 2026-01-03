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

butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][3].estado = true;
butacas[9][4].estado = true;
butacas[9][5].estado = true;
butacas[9][6].estado = true;
butacas[9][7].estado = true;
butacas[9][8].estado = true;
butacas[9][9].estado = true;
butacas[8][1].estado = true;
butacas[8][2].estado = true;
butacas[8][3].estado = true;
butacas[8][4].estado = true;
butacas[8][5].estado = true;
butacas[8][6].estado = true;
butacas[8][7].estado = true;
butacas[8][8].estado = true;
butacas[7][1].estado = true;
butacas[7][2].estado = true;
butacas[7][3].estado = true;
butacas[7][4].estado = true;
butacas[7][5].estado = true;
butacas[7][6].estado = true;
butacas[7][7].estado = true;
butacas[6][1].estado = true;
butacas[6][2].estado = true;
butacas[6][3].estado = true;
butacas[6][4].estado = true;
butacas[6][5].estado = true;
butacas[6][6].estado = true;
butacas[5][1].estado = true;
butacas[5][2].estado = true;
butacas[5][3].estado = true;
butacas[5][4].estado = true;
butacas[5][5].estado = true;
butacas[4][1].estado = true;
butacas[4][2].estado = true;
butacas[4][3].estado = true;
butacas[4][4].estado = true;
butacas[3][1].estado = true;
butacas[3][2].estado = true;
butacas[3][3].estado = true;
butacas[2][1].estado = true;
butacas[2][2].estado = true;
butacas[1][1].estado = true;

// Imprimir la matriz
//console.log(butacas);


function suggest(NumAsientos) {
    let resultado =  new Set();
    let encuentra = false;
    
    if (NumAsientos > N) {
        console.log("Petición mayor que el número de asiento de la fila, se devuelve vacío");
        return resultado;
    }

    for (let i = N - 1; i >= 0 && !encuentra; i--) {
        let LibresSeguidos = 0;
        let InicioSeguidos = 0;
        //console.log("Fila " + i);
        for (let j = 0; j < N && !encuentra; j++) {
            const asiento = butacas[i][j];
            //console.log("Columna " + j + " libres seguidos = " + LibresSeguidos);
            if (asiento.estado === false) {
                LibresSeguidos++;
                //console.log("Libres seguidos = " + LibresSeguidos + " busco " + NumAsientos);
                
                if (LibresSeguidos === NumAsientos) {
                    const aux = new Set();
                    for (let k = InicioSeguidos; k <= j; k++) {
                        aux.add(butacas[i][k].id);
                    }
                    resultado = aux;
                    encuentra = true;
                }
            } else {
                LibresSeguidos = 0;
                InicioSeguidos = j + 1;
            }
        }       
    }
    return resultado;  
}


let prueba = suggest(5);
console.log(prueba);




