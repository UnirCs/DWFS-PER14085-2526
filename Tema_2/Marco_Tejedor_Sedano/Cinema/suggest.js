//CODIGO DE APOYO
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

// MI CODIGO:


function suggest(butacas, numAsientos) {
    let set = new Set()
    for (let i = butacas.length-1; i>=0 && butacas[i].length>=numAsientos && set.size!==numAsientos; i--){
        // Esto es para que no seleccione elementos de una fila inferior como si estuvieran contiguos 
        set.clear()    
        for (let j = 0; j<butacas[i].length && set.size!==numAsientos; j++){
            butacas[i][j].estado ? set.clear() : set.add(butacas[i][j].id)
        }
        
    }
    return set
}



// EJECUCION DE PRUEBA:

// Inicializar la matriz
let butacas = setup();
// Imprimir la matriz
console.log(butacas);

// Modificar para cambiar el nuúmero de asientos de la recomendacion 
let numAsientos = 10
recomendacion = suggest(butacas, numAsientos)
// La ponemos por pantalla, si es vacio ponemos un mensaje
recomendacion.size > 0 ? console.log(recomendacion) : console.log("No hay recomendaciones posibles para el numero de asientos contiguos pedidos")




