document.addEventListener('DOMContentLoaded', () => {
    // Obtener datos del cliente
    const nombre = sessionStorage.getItem("clt-names");
    const email = sessionStorage.getItem("clt-email");

    // Comprobar que existan, sino se eliminan.
    if (!nombre || !email) {
        alert("Debes completar el registro de información antes de continuar.");
        window.location.replace("register.html");
        return;
    }

    // Si los valores sí existen, los muestro en los campos específicos para el nombre y el correo electrónico
    document.getElementById("cinema-nombre").value = nombre;
    document.getElementById("cinema-email").value = email;
    document.getElementById("cinema-nombre").style.cursor = "not-allowed";
    document.getElementById("cinema-email").style.cursor = "not-allowed";

    const rangeInput = document.getElementById('cinema-numero-asientos');

    // Evento del input para el número de asientos
    rangeInput.addEventListener('input', () => {
        const valor = rangeInput.value;

        if (valor === "") return;

        const numeroAsientos = Number(valor);

        if (!Number.isFinite(numeroAsientos) || numeroAsientos <= 0) return;

        mostrarSugerencias(numeroAsientos);
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

    const reservasRaw = sessionStorage.getItem("reservas");
    const asientosOcupados = new Map();

    if (reservasRaw) {
        try {
            const reservas = JSON.parse(reservasRaw);
            if (Array.isArray(reservas)) {
                reservas.forEach(reserva => {
                    if (Array.isArray(reserva.asientos)) {
                        reserva.asientos.forEach(codigoAsiento => {
                            asientosOcupados.set(codigoAsiento, {
                                nombre: reserva.nombres,
                                email: reserva.email
                            });
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Ocurrió un error al obtener las reservas previas:", e);
        }
    }

    for (let i = 0; i < rows.length; i++) {
        const rowSeats = Array.from(rows[i].querySelectorAll('.cinema__seat'));
        const fila = [];

        const rowLabelElement = rows[i].querySelector('.cinema__row-label');
        const rowLabel = rowLabelElement
            ? rowLabelElement.textContent.trim()
            : String.fromCharCode(65 + i);

        for (let j = 0; j < rowSeats.length; j++) {
            const seatElement = rowSeats[j];
            const seatCode = `${rowLabel}${j + 1}`;

            seatElement.id = `seat-${seatCode}`;

            let isOccupied = seatElement.classList.contains('cinema__seat--occupied');
            let nombreReserva = null;
            let emailReserva = null;

            if (asientosOcupados.has(seatCode)) {
                const datos = asientosOcupados.get(seatCode);
                isOccupied = true;
                nombreReserva = datos.nombre;
                emailReserva = datos.email;

                seatElement.classList.add('cinema__seat--occupied');
            }

            const seatObj = {
                id: nextId,
                fila: rowLabel,
                numero: j + 1,
                estado: isOccupied,
                nombre: nombreReserva,
                email: emailReserva,
                element: seatElement
            };

            updateSeatTitle(seatObj);

            fila.push(seatObj);
            nextId++;
        }

        seatsMatrix.push(fila);
    }

    // Función para reservar los asientos utilizando la función suggest
    function mostrarSugerencias(numAsientos) {
        const alertBox = document.getElementById('cinema-alert');
        alertBox.innerHTML = "";

        if (!Number.isInteger(numAsientos) || numAsientos <= 0) {
            console.log(`Asientos sugeridos: (ninguno, número inválido: ${numAsientos})`);
            return;
        }

        for (let i = 0; i < seatsMatrix.length; i++) {
            for (let j = 0; j < seatsMatrix[i].length; j++) {
                const seat = seatsMatrix[i][j];
                const domSeat = document.getElementById(`seat-${seat.fila}${seat.numero}`);
                if (domSeat) domSeat.classList.remove('cinema__seat--suggested');
            }
        }

        const sugeridos = suggest(numAsientos, seatsMatrix);

        if (sugeridos.size === 0) {
            alertBox.innerHTML = `<div class="alert alert-danger py-2 mb-2" role="alert" style="font-size: 0.85rem;">
                No hay suficientes asientos contiguos disponibles en ninguna fila.
            </div>`;
            console.log('Asientos sugeridos: (ninguno disponible)');
            return;
        }

        const etiquetas = [];

        for (let i = 0; i < seatsMatrix.length; i++) {
            for (let j = 0; j < seatsMatrix[i].length; j++) {
                const seat = seatsMatrix[i][j];

                if (sugeridos.has(seat.id)) {
                    const etiqueta = `${seat.fila}${seat.numero}`;
                    const domSeat = document.getElementById(`seat-${etiqueta}`);

                    if (domSeat) {
                        domSeat.classList.add('cinema__seat--suggested');
                    }

                    etiquetas.push(etiqueta);
                }
            }
        }

        console.log(`Asientos sugeridos: ${etiquetas.join(', ')}`);
    }


    const reservaForm = document.querySelector('.cinema__form form');

    reservaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedSeats = Array.from(
            document.querySelectorAll('.cinema__seat--suggested')
        );

        if (selectedSeats.length === 0) {
            alertBox.innerHTML = `<div class="alert alert-danger py-2 mb-2" role="alert" style="font-size: 0.85rem;">
                No hay una selección de asientos válida.
            </div>`;
            return;
        }

        const asientos = selectedSeats.map(seat => {
            const id = seat.id || '';
            return id.startsWith('seat-') ? id.substring(5) : id;
        });

        let reservas = [];
        const reservasRaw = sessionStorage.getItem('reservas');

        if (!reservasRaw) {
            reservas = [];
            sessionStorage.setItem("reservas", JSON.stringify(reservas));
        } else {
            try {
                const parsed = JSON.parse(reservasRaw);
                if (Array.isArray(parsed)) {
                    reservas = parsed;
                }
            } catch (e) {
                reservas = [];
                sessionStorage.setItem("reservas", JSON.stringify(reservas));
            }
        }

        reservas.push({
            nombres: nombre,
            email: email,
            asientos: asientos
        });

        sessionStorage.setItem('reservas', JSON.stringify(reservas));

        sessionStorage.removeItem('clt-names');
        sessionStorage.removeItem('clt-email');

        window.alert('Reserva registrada correctamente.');

        window.location.replace("register.html");
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
