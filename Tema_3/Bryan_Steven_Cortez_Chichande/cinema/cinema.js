document.addEventListener('DOMContentLoaded', () => {
    const rangeInput = document.getElementById('cinema-numero-asientos');

    rangeInput.addEventListener('input', () => {
        mostrarSugerencias(6);
    });

    // Creación de la matriz de asientos
    const rows = Array.from(document.querySelectorAll('.cinema__row'));
    const seatsMatrix = [];
    let nextId = 1;

    // Función para agregar un tooltip de información (Asiento, Cliente, Correo electrónico) a cada asiento
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

    // Función que llama a la función suggest y que muestra el resultado en el log de la consola
    function mostrarSugerencias(numAsientos) {
        if (!Number.isInteger(numAsientos) || numAsientos <= 0) {
            console.log(`Asientos sugeridos: (ninguno, número inválido: ${numAsientos})`);
            return;
        }

        const emptyMatrix = seatsMatrix.map((row) =>
            row.map((seat) => ({
                ...seat,
                estado: false
            }))
        );

        const sugeridos = suggest(numAsientos, emptyMatrix);

        if (sugeridos.size === 0) {
            console.log('Asientos sugeridos: (ninguno disponible)');
            return;
        }

        const etiquetas = [];
        for (let i = 0; i < seatsMatrix.length; i++) {
            for (let j = 0; j < seatsMatrix[i].length; j++) {
                const seat = seatsMatrix[i][j];
                if (sugeridos.has(seat.id)) {
                    etiquetas.push(`${seat.fila}${seat.numero}`);
                }
            }
        }

        console.log(`Asientos sugeridos: ${etiquetas.join(', ')}`);
    }
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
