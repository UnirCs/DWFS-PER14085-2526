//------------------------------------------------------------------------------------------------------------------------
// Implementación de un algoritmo de selección de butacas de cine
// Developer: James D. Perez Jimenez
// Fecha: 2024-06-15
//------------------------------------------------------------------------------------------------------------------------

//  CÓDIGOS DE APOYO PARA LA IMPLEMENTACIÓN DE LA SOLUCIÓN

const N = 10; 
function setup() {
    let idContador = 1;
    let butacas = [];
    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false 
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

let butacas = setup();

// IMPLEMENTACIÓN DE LA FUNCIÓN SUGGEST

function suggest(numset)
{
    const resultado = new Set();
    
    if (numset > N || numset <= 0) {
        return resultado; 
    }

    for (let fila = N - 1; fila >= 0; fila--){
      let asientosLibres = 0;
      let inicioBloque = 0;
        for (let col = 0; col < N; col++)
        {
            if (butacas[fila][col].estado === false) {
                asientosLibres++;

                if (asientosLibres === 1) {
                    inicioBloque = col; 
                }

                if (asientosLibres === numset) {
                    for (let k = inicioBloque; k < inicioBloque + numset; k++) {
                        resultado.add(butacas[fila][k].id);
                    }
                    return resultado;
                }

            } 
            else {
                asientosLibres = 0;
            }
        }
    }
    return resultado;
}

// SIMULACIÓN DE ASIENTOS OCUPADOS PARA PRUEBAS

butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[1][1].estado = true;


// PRUEBAS DE LA FUNCIÓN SUGGEST

// // Prueba 1: Solicitar 4 asientos juntos
console.log("Sugerencia para 4 asientos:", suggest(4));

// // Prueba 2: Solicitar 11 asientos juntos (excede el tamaño máximo)
console.log("Sugerencia para 11 asientos:", suggest(11));

// // Prueba 3: Solicitar 2 asientos juntos
console.log("Sugerencia para 2 asientos:", suggest(2));