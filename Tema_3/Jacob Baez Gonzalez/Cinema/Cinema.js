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
            // Nuevo asieNnto
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




function suggest(n) {
    if (n>N || n<0) {
        console.log("suggest(", n, ") cantidad inválida");
        return new Set();   //retorna vacio si el valor ingresado es mayor al valor de numero de filas y columnas
    }
    const sugeridos = new Set();
    let encontrado = false;


    for (let i = N - 1; i >= 0 && !encontrado; i--) {       //Buscar asientos mas lejanos
        for (let j = 0; j <= N - n && !encontrado; j++) {   
            let libres = true;  
            for (let k = 0; k < n && libres; k++) {   //verifica si los n asientos desde j hasta j+n-1 están libres
                if (butacas[i][j + k].estado) {
                    libres = false;
                    console.log(`suggest(${n}) No hay suficientes asientos juntos)`);
                }
            }
            if (libres && !encontrado) { //si esta libre se añade el id y se devuelve
                for (let k = 0; k < n; k++) {
                    sugeridos.add(butacas[i][j + k].id);
                }
                encontrado = true;
            }
        }
    }
    console.log(`suggest(${n})`, sugeridos);
    return sugeridos;
}


function reservarAsientos() {
    const input = document.getElementById("numSeats");
    const numero = parseInt(input.value);

    if (!isNaN(numero) && numero > 0 && numero <= 10) {
        suggest(numero);
    } else if (input.value !== "") {
        console.log("suggest(", input.value, ") cantidad de asientos no válida");
    }
}

console.log("PRUEBA INICIAL");
suggest(6);