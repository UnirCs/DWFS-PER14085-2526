document.addEventListener('DOMContentLoaded', () => {
    const seatMatrix = document.getElementById('seat-matrix');
    const selectedCount = document.getElementById('selected-count');
    const totalPrecio = document.getElementById('total-price');
    const btncompra = document.getElementById('btncompra');

    
    const rows = 8; // Filas (A a H)
    const cols = 10; // Columnas (1 a 10)
    const ticketPrecio = 15.000; // Precio de ejemplo
    
    // Función para obtener la letra de la fila
    const getRowLetter = (rowIndex) => String.fromCharCode(65 + rowIndex);

    // Asientos inicialmente ocupados
    const ocupadosDefault = [
        'B4', 'B5', 'C8', 'D1', 'D2', 'F6', 'F7', 'G3'
    ];
    
    
    // Genera la matriz de asientos en el DOM.
    
    function GenerarMatrizAsientos() {

        seatMatrix.style.gridTemplateColumns = `auto repeat(${cols}, 1fr)`;

        for (let r = 0; r < rows; r++) {
            const rowLetter = getRowLetter(r);
            
            // Etiqueta de la fila (Letra)
            const rowLabel = document.createElement('div');
            rowLabel.classList.add('seat-row-label');
            rowLabel.textContent = rowLetter;
            rowLabel.style.fontWeight = '700';
            rowLabel.style.color = 'var(--primary-blue)';
            seatMatrix.appendChild(rowLabel);

            for (let c = 1; c <= cols; c++) {
                const seatId = `${rowLetter}${c}`;
                const seatElement = document.createElement('div');
                seatElement.classList.add('seat');
                seatElement.setAttribute('data-seat-id', seatId);
                seatElement.textContent = c; // Muestra el número de columna

                if (ocupadosDefault.includes(seatId)) {
                    seatElement.classList.add('occupied');
                } else {
                    seatElement.classList.add('available');
                    // Añade el evento solo si está disponible
                    seatElement.addEventListener('click', toggleSeatSelection);
                }

                seatMatrix.appendChild(seatElement);
            }
        }
    }

    /**
     * Maneja la selección de asientos al hacer clic.
     * @param {Event} e - Evento de click.
     */
    function toggleSeatSelection(e) {
        const seat = e.target;
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            ActualizarConteoPrecio();
        }
    }

    
    // Actualiza el conteo de asientos seleccionados y el precio total.
    
    function ActualizarConteoPrecio() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const count = selectedSeats.length;
        const total = count * ticketPrecio;

        selectedCount.textContent = count;
        // Formatea el total como moneda
        totalPrecio.textContent = `$${total.toFixed(2)}`;
    }
    function ReiniciarMatriz() {
    const seats = document.querySelectorAll('.seat');

    seats.forEach(seat => {
        const seatId = seat.getAttribute('data-seat-id');

        if (ocupadosDefault.includes(seatId)) {
            seat.className = 'seat occupied';
        } else {
            seat.className = 'seat available';
        }
    });

        ActualizarConteoPrecio();
    }

    if (btncompra) {
        btncompra.addEventListener('click', () => {
            const count = document.querySelectorAll('.seat.selected').length;
            const total = count * ticketPrecio;

            if (count > 0) {
                 alert(`¡Compra realizada con éxito!\nAsientos: ${count}\nTotal: $${total.toFixed(3)}`);
                    ReiniciarMatriz();
            } else {
                 alert('Por favor, selecciona al menos un asiento antes de continuar.');
            }
           
        });
    } else {
        console.error("No se encontró el botón con el ID 'btncompra'.");
    }


    // Inicializa la matriz de asientos
    GenerarMatrizAsientos();

    // Llama a la función de resumen al inicio para mostrar $0
    ActualizarConteoPrecio();
});