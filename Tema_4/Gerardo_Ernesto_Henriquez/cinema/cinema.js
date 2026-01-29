const rows = 5;
const columns = 10;

function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < rows; i++) {
        let fila = [];
        for (let j = 0; j < columns; j++) {
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
const butacasPlanas = butacas.flat();

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

function renderSeats(suggested = new Set()) {
    const seatElements = document.querySelectorAll('.seats-row .seat');

    let index = 0;
    for (const seatElement of seatElements) {
        const seatData = butacasPlanas[index];
        seatElement.id = 'seat-' + seatData.id;
        seatElement.dataset.seatId = seatData.id;

        seatElement.classList.remove('available', 'occupied', 'selected', 'preselected');

        if (seatData.estado) {
            seatElement.classList.add('occupied');
        } else {
            seatElement.classList.add('available');
            if (suggested.has(seatData.id)) {
                seatElement.classList.add('selected', 'preselected');
            }
        }
        index++;
    }
}

function mostrarSugerencia(seats) {
    const resultado = reservarAsientos(seats);
    renderSeats(resultado);

    if (resultado.size === 0) {
        alert('No hay asientos disponibles para esa cantidad.');
    } else {
        alert('Asientos sugeridos: ' + Array.from(resultado).join(', '));
    }
}

const butacasInicialmenteOcupadas = [7, 8, 11, 23, 24, 35, 41, 42, 43, 44, 45];

marcarOcupadas(butacasInicialmenteOcupadas);

document.addEventListener('DOMContentLoaded', function() {
    renderSeats();

    const seatCountInput = document.getElementById('seatCount');
    const confirmBtn = document.getElementById('confirmBtn');

    seatCountInput.addEventListener('input', function() {
        const seatCount = Number.parseInt(seatCountInput.value, 10);
        if (Number.isInteger(seatCount) && seatCount > 0 && seatCount <= columns) {
            const resultado = suggest(seatCount);
            renderSeats(resultado);
        } else if (seatCountInput.value === '') {
            renderSeats(new Set());
        }
    });

    confirmBtn.addEventListener('click', () => {
        const seatCount = Number.parseInt(seatCountInput.value, 10);
        if (Number.isInteger(seatCount) && seatCount > 0) {
            mostrarSugerencia(seatCount);
        } else {
            alert('Introduce un número válido de asientos.');
        }
    });
});