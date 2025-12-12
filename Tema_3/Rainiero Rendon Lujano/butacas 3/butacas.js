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




function suggest(NumeroAsientos) {
    const resultado = new Set();

    
    if (NumeroAsientos > N) {
        return resultado;
    }
 let bloqueEncontrado = false; // Variable de control agregada
   
    for (let i = N - 1; i >= 0; i--) {
        let fila = butacas[i];
        let consecutivos = 0;
        let AsientoTemp = [];

        for (let j = 0; j < N; j++) {
            if (!fila[j].estado) {
                consecutivos++;
                AsientoTemp.push(fila[j].id);
                if (consecutivos === NumeroAsientos && bloqueEncontrado===false) {
                    AsientoTemp.forEach(id => {
                        let asiento = fila.find(a => a.id===id);
                        if (asiento) asiento.estado=true; /* cambio el estado a ocupado para evitar returm*/
                        resultado.add(id);
                   })
                 bloqueEncontrado =true;
             
                }
            } else {
                consecutivos = 0;
                AsientoTemp = [];
            }
        }
    }
    return resultado;
}
butacas[5][0].estado = true;
butacas[7][1].estado = true;

console.log(suggest(4)); 
 