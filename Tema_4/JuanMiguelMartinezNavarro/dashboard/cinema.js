// Definir el tamaño de la matriz de butacas
const FILAS = 5; // Filas A-E
const FILAS_LETRAS = ["A", "B", "C", "D", "E"];
const COLUMNAS = 8; // Columnas 1-8
const ASIENTOS_OCUPADOS = ["A3", "A6", "B4", "B5", "D1", "D2", "E3", "E7"];

// Función para inicializar la matriz de butacas
function setup() {
    let butacas = [];

    for (let i = 0; i < FILAS; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < COLUMNAS; j++) {
            // Nuevo asiento con formato "A1", "B2", etc.
            let id = FILAS_LETRAS[i] + (j + 1);
            fila.push({
                id: id,
                estado: ASIENTOS_OCUPADOS.includes(id) ? true : false, // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

const suggest = (reserva) => {
    let sugerencia = new Set();
    if (reserva <= COLUMNAS) {
        let filaEncontrada = false;
        for (let i = FILAS - 1; i >= 0 && !filaEncontrada; i--) {
            const libres = butacas[i]
                .filter((asiento) => asiento.estado === false)
                .map((asiento) => asiento.id);

            let asientosConsecutivos = [];
            let suficientesJuntos = false;
            const nums = libres
                .map((id) => parseInt(id.slice(1))) // Quitar letra
                .sort((a, b) => a - b); // Ordenar los números
            let consecutivos = 1;
            let k = 1;
            asientosConsecutivos.push(libres[k - 1]);
            while (k < nums.length && !suficientesJuntos) {
                if (nums[k] === nums[k - 1] + 1) {
                    consecutivos++;
                    asientosConsecutivos.push(libres[k]);
                    if (consecutivos >= reserva) {
                        suficientesJuntos = true;
                    }
                } else {
                    consecutivos = 1;
                    asientosConsecutivos = [libres[k]];
                }
                k++;
            }

            if (libres.length >= reserva && suficientesJuntos) {
                sugerencia = new Set(asientosConsecutivos.slice(0, reserva));
                filaEncontrada = true;
            }
        }
    }
    // Eliminar 'selected' de todos los asientos
    document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
    });

    // Añadir 'selected' a los asientos sugeridos
    sugerencia.forEach(id => {
        const seatDiv = document.querySelector(`.seat[data-seat="${id}"]`);
        if (seatDiv && seatDiv.classList.contains('available')) {
            seatDiv.classList.add('selected');
        }
    });
    return sugerencia;
};

const showSuggestions = (reserva) => {
    const suggestions = suggest(reserva);
    console.log(suggestions);
};

document.addEventListener('DOMContentLoaded', () => {
    const numSeatsInput = document.getElementById('num-seats');
    if (numSeatsInput) {
        const initialValue = parseInt(numSeatsInput.value) || 1;
        showSuggestions(initialValue);
    }
});
