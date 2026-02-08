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
                estado: Math.random() < 0.4 // Se agrega selección random de asiento para que algunas aparezcan ocupadas para las pruebas
            });
        }
        butacas.push(fila);
    }
    return butacas;
}
// Función que recibe numero de asientos a reservar y devuelve set de asientos reservados
function suggest(seatsNumber) {

    let reservedSeats = new Set();
    let checkOK = false;
    if (seatsNumber > N) {return  new Set(); }
    let i = butacas.length - 1;
    
    while (i >= 0 && !checkOK) {
        const actualRow = butacas[i];
        let free = 0;
        let j = actualRow.length - 1;
        while (j >= 0 && !checkOK) {
            const butaca = actualRow[j]; // Procesar butaca
            if (butaca.estado === false) {
                free++; // Si se encuentra bloque consecutivo y aún no se han reservado
                reservedSeats.add(butacas[i][j].id);
            } else {
                free = 0;
                reservedSeats=new Set();
            }
            if (free === seatsNumber) { checkOK = true;} 
            j--;
        } i--;    // Buscar desde la fila más lejana conteo regresivo
    }
    if (!checkOK) {
        return  new Set();
    }
    return reservedSeats;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz Inicial
console.log(butacas);
// Se seleccionan mas butacas de las que existen en una fila
console.log('======== Prueba 1 ========');
let reservedSeats=suggest(11);
// Imprimir asientos seleccionados
console.log(reservedSeats);
// Se selecciona muchas butacas con una probabilidad baja de encontrarlas por fila consecutivas
console.log('======== Prueba 2 ========');
let reservedSeats1=suggest(9);
// Imprimir asientos seleccionados
console.log(reservedSeats1);
// Se selecciona pocas butacas para tener una probabilidad mayor para reservar 
console.log('======== Prueba 3 ========');
let reservedSeats2=suggest(5);
// Imprimir asientos seleccionados
console.log(reservedSeats2);