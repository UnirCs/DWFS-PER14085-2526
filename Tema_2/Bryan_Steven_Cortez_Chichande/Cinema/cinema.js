document.addEventListener('DOMContentLoaded', () => {

    // Input tipo range para la selección de asientos
    const rangeInput = document.getElementById('cinema-numero-asientos');
    const rangeValue = document.getElementById('cinema-numero-asientos-valor');

    rangeInput.addEventListener('input', () => {
        rangeValue.textContent = rangeInput.value;
    });

    // Creación de la matriz de asientos
    const rows = Array.from(document.querySelectorAll('.cinema__row'));
    const seatsMatrix = [];
    let nextId = 1;

    function updateSeatTitle(seat) {
        let infoCliente = 'Disponible';
        let infoCorreo = '-';

        if (seat.estado === true && seat.nombre && seat.email) {
            infoCliente = seat.nombre;
            infoCorreo = seat.email;
        }

        const texto = `Asiento: ${seat.fila}${seat.numero}\n` +
            `Cliente: ${infoCliente}\n` +
            `Correo electrónico: ${infoCorreo}`;

        seat.element.setAttribute('title', texto);
    }

    for (let i = 0; i < rows.length; i++) {
        const rowSeats = Array.from(rows[i].querySelectorAll('.cinema__seat'));
        const fila = [];

        const rowLabelElement = rows[i].querySelector('.cinema__row-label');
        const rowLabel = rowLabelElement ? rowLabelElement.textContent.trim() : String.fromCharCode(65 + i);

        for (let j = 0; j < rowSeats.length; j++) {
            const seatElement = rowSeats[j];
            const isOccupied = seatElement.classList.contains('cinema__seat--occupied');

            const seatObj = {
                id: nextId,
                fila: rowLabel,        
                numero: j + 1,         
                estado: isOccupied,    
                nombre: null,          
                email: null,           
                element: seatElement
            };

            updateSeatTitle(seatObj);

            fila.push(seatObj);
            nextId = nextId + 1;
        }
        seatsMatrix.push(fila);
    }

    // Operación con el formulario para reservar asientos
    const reservaForm = document.querySelector('.cinema__form form');

    reservaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const numeroAsientos = parseInt(rangeInput.value, 10);
        const nombre = document.getElementById('cinema-nombre').value.trim();
        const email = document.getElementById('cinema-email').value.trim();

        const alertBox = document.getElementById('cinema-alert');
        alertBox.innerHTML = "";

        if (nombre === "" || email === "" || !numeroAsientos) {
            alertBox.innerHTML = `
                <div class="alert alert-danger py-2 mb-2" role="alert" style="font-size: 0.85rem;">
                    Por favor completa todos los campos del formulario.
                </div>
            `;
            return;
        }

        for (let i = 0; i < seatsMatrix.length; i++) {
            for (let j = 0; j < seatsMatrix[i].length; j++) {
                seatsMatrix[i][j].element.classList.remove('cinema__seat--suggested');
            }
        }

        const sugeridos = suggest(numeroAsientos, seatsMatrix);

        if (sugeridos.size === 0) {
            alertBox.innerHTML = `
                <div class="alert alert-danger py-2 mb-2" role="alert" style="font-size: 0.85rem;">
                    No hay suficientes asientos contiguos disponibles en ninguna fila.
                </div>
            `;
            return;
        }

        for (let i = 0; i < seatsMatrix.length; i++) {
            for (let j = 0; j < seatsMatrix[i].length; j++) {
                const seat = seatsMatrix[i][j];
                if (sugeridos.has(seat.id)) {
                    seat.estado = true;
                    seat.nombre = nombre;
                    seat.email = email;
                    seat.element.classList.remove('cinema__seat--suggested');
                    seat.element.classList.add('cinema__seat--occupied');
                    updateSeatTitle(seat);
                }
            }
        }

        alertBox.innerHTML = `<div class="alert alert-success py-2 mb-2" role="alert" style="font-size: 0.85rem;">
                Reserva generada correctamente.
            </div>`;

        document.getElementById('cinema-nombre').value = "";
        document.getElementById('cinema-email').value = "";
        rangeInput.value = 1;
        rangeValue.textContent = "1";
    });

});

// Función suggest
function suggest(numAsientos, matrizButacas) {
    const resultado = new Set();

    if (!Number.isInteger(numAsientos) || numAsientos <= 0) {
        return resultado;
    }

    const filas = matrizButacas.length;
    if (filas === 0) {
        return resultado;
    }

    const columnas = matrizButacas[0].length;

    if (numAsientos > columnas) {
        return resultado;
    }

    for (let i = filas - 1; i >= 0; i--) {
        for (let inicio = 0; inicio <= columnas - numAsientos; inicio++) {

            let bloqueLibre = true;
            let offset = 0;

            while (offset < numAsientos && bloqueLibre) {
                const asiento = matrizButacas[i][inicio + offset];
                if (asiento.estado === true) {
                    bloqueLibre = false;
                } else {
                    offset = offset + 1;
                }
            }

            if (bloqueLibre) {
                let k = 0;
                while (k < numAsientos) {
                    const asiento = matrizButacas[i][inicio + k];
                    resultado.add(asiento.id);
                    k = k + 1;
                }
                return resultado;
            }
        }
    }

    return resultado;
}