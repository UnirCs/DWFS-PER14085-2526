/**
         * Configuración global de la aplicación
         */
const PRECIO_ASIENTO = 12;
const MAXIMO_ASIENTOS = 12;
let asientosSeleccionados = [];
const manejadoresClick = new Map();

/**
 * Función de comparación para ordenar asientos alfanuméricamente
 * @param {string} a - Primer asiento (ej: "A1", "B10")
 * @param {string} b - Segundo asiento (ej: "A2", "B1")
 * @returns {number} Resultado de la comparación
 */
const compararAsientos = (a, b) => {
    const letraA = a.charAt(0);
    const numeroA = parseInt(a.slice(1), 10);
    const letraB = b.charAt(0);
    const numeroB = parseInt(b.slice(1), 10);

    if (letraA === letraB) {
        return numeroA - numeroB;
    }
    return letraA.localeCompare(letraB);
};

/**
 * Inicialización de la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function () {
    const asientos = document.querySelectorAll('.asiento--disponible');
    const inputCantidadAsientos = document.getElementById('customSeats');
    const pantallaAsientosSeleccionados = document.getElementById('selectedSeats');
    const precioTotal = document.getElementById('totalPrice');
    const botonConfirmar = document.getElementById('confirmBtn');
    const botonLimpiar = document.getElementById('clearBtn');

    /**
     * Maneja el click en un asiento disponible
     * Permite seleccionar/deseleccionar asientos hasta el límite máximo
     */
    function manejarClickAsiento() {
        const idAsiento = this.id;

        if (this.classList.contains('asiento--seleccionado')) {
            // Deseleccionar asiento
            this.classList.remove('asiento--seleccionado');
            this.classList.add('asiento--disponible');
            asientosSeleccionados = asientosSeleccionados.filter(s => s !== idAsiento);
        } else if (asientosSeleccionados.length < MAXIMO_ASIENTOS) {
            // Seleccionar asiento si no se ha alcanzado el máximo
            this.classList.remove('asiento--disponible');
            this.classList.add('asiento--seleccionado');
            asientosSeleccionados.push(idAsiento);
        } else {
            // Mostrar mensaje cuando se alcance el límite máximo
            alert(`Solo puedes seleccionar un máximo de ${MAXIMO_ASIENTOS} asientos por reserva.`);
        }

        actualizarPantalla();
    }

    /**
     * Actualiza la pantalla de información de la reserva
     * Mantiene los asientos sugeridos y agrega los seleccionados manualmente
     */
    function actualizarPantalla() {
        // Actualizar input de cantidad
        inputCantidadAsientos.value = asientosSeleccionados.length;

        // Obtener todos los asientos con clase asiento--seleccionado (incluye sugeridos)
        const todosLosSeleccionados = document.querySelectorAll('.asiento--seleccionado');
        const idsSeleccionados = Array.from(todosLosSeleccionados).map(asiento => asiento.id);

        // Actualizar pantalla de asientos seleccionados
        if (idsSeleccionados.length === 0) {
            pantallaAsientosSeleccionados.innerHTML = '<span class="text-muted">Selecciona tus asientos en el mapa</span>';
            botonConfirmar.disabled = true;
        } else {
            // Ordenar todos los asientos (sugeridos + seleccionados manualmente)
            const asientosOrdenados = idsSeleccionados.sort(compararAsientos);
            pantallaAsientosSeleccionados.innerHTML = asientosOrdenados
                .map(asiento =>
                    `<span class="badge bg-warning text-dark me-1">${asiento}</span>`
                ).join('');
            botonConfirmar.disabled = false;
        }

        // Actualizar precio total (solo cuenta los seleccionados manualmente)
        precioTotal.textContent = `$${asientosSeleccionados.length * PRECIO_ASIENTO}`;
    }

    /**
     * Reinicia la selección de asientos
     */
    function reiniciarSeleccion() {
        asientosSeleccionados = [];

        // Resetear visualmente todos los asientos seleccionados
        const asientosSeleccionadosActuales = document.querySelectorAll('.asiento--seleccionado');
        asientosSeleccionadosActuales.forEach(asiento => {
            asiento.classList.remove('asiento--seleccionado');
            asiento.classList.add('asiento--disponible');
        });

        actualizarPantalla();
    }

    // Asignar event listeners a todos los asientos disponibles
    asientos.forEach(asiento => {
        const manejador = manejarClickAsiento.bind(asiento);
        manejadoresClick.set(asiento.id, manejador);
        asiento.addEventListener('click', manejador);

        // Agregar cursor pointer para indicar que es clickeable
        asiento.style.cursor = 'pointer';
    });

    // Event listener para el botón de limpiar
    botonLimpiar.addEventListener('click', function () {
        if (asientosSeleccionados.length > 0) {
            if (confirm('¿Estás seguro de que quieres limpiar la selección actual?')) {
                reiniciarSeleccion();
            }
        } else {
            alert('No hay asientos seleccionados para limpiar.');
        }
    });

    // Event listener para el formulario de reserva
    document.getElementById('reservacionForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (asientosSeleccionados.length === 0) {
            alert('Por favor selecciona al menos un asiento.');
            return;
        }

        const cantidad = asientosSeleccionados.length;
        const total = cantidad * PRECIO_ASIENTO;

        // Crear copia ordenada del array sin mutar el original
        const asientosOrdenados = [...asientosSeleccionados].sort(compararAsientos);
        const mensaje = `¿Confirmar reserva de ${cantidad} asiento${cantidad > 1 ? 's' : ''}?\n\nAsientos: ${asientosOrdenados.join(', ')}\nTotal: $${total}`;

        if (confirm(mensaje)) {
            // Marcar asientos como ocupados y remover event listeners
            asientosSeleccionados.forEach(idAsiento => {
                const elementoAsiento = document.getElementById(idAsiento);
                if (elementoAsiento) {
                    elementoAsiento.classList.remove('asiento--seleccionado');
                    elementoAsiento.classList.add('asiento--ocupado');

                    // Remover event listener para que no sea clickeable
                    const manejador = manejadoresClick.get(idAsiento);
                    if (manejador) {
                        elementoAsiento.removeEventListener('click', manejador);
                        manejadoresClick.delete(idAsiento);
                        elementoAsiento.style.cursor = 'not-allowed';
                    }
                }
            });

            alert(`¡Reserva confirmada!\n\nAsientos reservados: ${asientosOrdenados.join(', ')}\nTotal pagado: $${total}\n\nGracias por elegir CINEMA.`);

            // Reiniciar selección para nueva reserva
            asientosSeleccionados = [];
            actualizarPantalla();
        }
    });

    // Inicializar la pantalla
    actualizarPantalla();
});