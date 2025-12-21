//------------------------------------------------------------------------------------------------------------------------
// Developer: James D. Perez Jimenez
//------------------------------------------------------------------------------------------------------------------------

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

function buscarBloqueLibre(fila, numset) {
    let libres = 0;
    let inicio = 0;

    for (let col = 0; col < N; col++) {
        const libre = !butacas[fila][col].estado;

        if (libre) {
            libres++;
            if (libres === 1) inicio = col;
            if (libres === numset) return inicio;
        } else {
            libres = 0;
        }
    }

    return -1;
}

function suggest(numset) {
    const resultado = new Set();
    let found = false; 

    if (numset > N || numset <= 0) {
        return resultado;
    }
    for (let fila = N - 1; fila >= 0 && !found; fila--) {

        const inicioBloque = buscarBloqueLibre(fila, numset);

        if (inicioBloque !== -1) {

            for (let k = inicioBloque; k < inicioBloque + numset; k++) {
                resultado.add(butacas[fila][k].id);
            }
            found = true;
        }
    }
    return resultado;
    
}




// SIMULACIÓN DE ASIENTOS OCUPADOS

butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[1][1].estado = true;


// PRUEBAS

console.log("Sugerencia para 4 asientos:", suggest(4));
console.log("Sugerencia para 11 asientos:", suggest(11));
console.log("Sugerencia para 2 asientos:", suggest(2));
