// Declaracion de constantes
const N = 10; // Número de filas y columnas


// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacasAux = [];

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
        butacasAux.push(fila);
    }
    return butacasAux;
}


// Inicializacion de butacas al cargar el script
const butacas = setup()
console.log(`Butacas inicializadas (${N}x${N})`)


// Funcion de sugerencia
function suggest(numAsientos) {
    let set = new Set()
    for (let i = butacas.length-1; i>=0 && butacas[i].length>=numAsientos && set.size!==numAsientos; i--){
        // Esto es para que no seleccione elementos de una fila inferior como si estuvieran contiguos 
        set.clear()    
        for (let j = 0; j<butacas[i].length && set.size!==numAsientos; j++){
            butacas[i][j].estado ? set.clear() : set.add(butacas[i][j].id)
        }
    }
    //Uso el [...set] para que quede bonito
    console.log(`Asientos sugeridos: ${[...set]}`)
    return set
}