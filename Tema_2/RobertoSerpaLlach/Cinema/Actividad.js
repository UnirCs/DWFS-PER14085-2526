// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs
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

function suggest(n){
    //Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
    if(n > N) return new Set();
    //Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.
    //se comenzará a buscar asientos juntos en la fila más lejana a la pantalla,
    for(let i=N-1;i>=0;i--)
        for(let j=0,c=0;j<N;j++){
            if(!butacas[i][j].estado) c++; else c=0;
            if(c===n)
                return new Set(butacas[i].slice(j-n+1, j+1).map(a=>a.id));
        }
    return new Set();
}

let ids = suggest(10);
console.log("Los ids de los ascientos son:" + [...ids]);