// Definir el tamaño de la matriz de butacas
const N = 10 // Número de filas y columnas

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
console.log('butacas inicializadas');
let butacas = setup();

function suggestTable() {
    let sits = suggest(8);
    console.log('Asientos sugeridos. ',sits);
}

//para probrar las filas ocupadas inicialmente


const suggest = (sits_numbers) => {
    sits_numbers = Math.floor(sits_numbers);
    let suggestSeats = new Set();
    const rows_length = butacas.length;
    const cols_length = butacas[0].length;

    if (sits_numbers <= 0 || sits_numbers > rows_length) {
        return suggestSeats;
    }
    //Empezar desde la ultima fila.
    let row = rows_length - 1;
    //recorrer las filas.
    while (row >= 0 && suggestSeats.size < sits_numbers) {
        let col = 0;
        //console.log(butacas[row]);
        //reinicio los asientos al recorrer cada fila hasta que encuentre una fila que tenga todos los asientos
        suggestSeats = new Set();
        // recorro las columnas mientras que los asientos seleccionados sean menor al nro de sitios deseados
        while (col < cols_length && suggestSeats.size < sits_numbers) {
            //console.log(butacas[row][col]);
            //agrego los asientos que estan libres
            if (butacas[row][col].estado) {
                suggestSeats = new Set();

            } else {
                //caso contrario reseteo los asientos disponibles para que sean contiguos
                suggestSeats.add(butacas[row][col].id);
            }
            col++;
        }
        row--;
    }

    return suggestSeats;
}