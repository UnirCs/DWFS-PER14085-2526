// Definir el tamaño de la matriz de butacas
const rows = 5;
const columns = 10;

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < rows; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < columns; j++) {
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

function marcarOcupadas(occupiedIds = []) {
    for (let fila of butacas) {
        for (let asiento of fila) {
            asiento.estado = occupiedIds.includes(asiento.id);
        }
    }
}

function availableSeats(row, seats) {
    let consecutive = 0;
    let index = -1;
    
    for (let j = 0; j < row.length; j++) {
        if (row[j].estado) {
            consecutive = 0;
        } else {
            consecutive++;
            if (consecutive === seats) {
                index = j - seats + 1;
            }
        }
    }
    
    if (index === -1) {
        return null;
    }
    
    let ids = [];
    for (let k = index; k < index + seats; k++) {
        ids.push(row[k].id);
    }
    return ids;
}

function suggest(requestedSeats) {
    if (!Number.isInteger(requestedSeats) || requestedSeats <= 0) {
        return new Set();
    }

    if (requestedSeats > columns) {
        return new Set();
    }

    let suggested = new Set();
    let band = false;

    for (let i = butacas.length - 1; i >= 0; i--) {
        let ids = availableSeats(butacas[i], requestedSeats);
        if (ids && !band) {
            for (let id of ids) {
                suggested.add(id);
            }
            band = true;
        }
    }

    return suggested;
}

function reservarAsientos(seatCount) {
    if (!Number.isInteger(seatCount) || seatCount <= 0) {
        return new Set();
    }
    return suggest(seatCount);
}


//Datos de prueba
const butacasInicialmenteOcupadas = [7, 8, 11, 23, 24, 35, 41, 42, 43, 44, 45];
const asientosSolicitados =9;


marcarOcupadas(butacasInicialmenteOcupadas);

const resultado = reservarAsientos(asientosSolicitados);

if (resultado.size === 0) {
    console.log('No hay asientos disponibles para esa cantidad.');
} else {
    console.log('Asientos sugeridos:', Array.from(resultado).join(', '));
}