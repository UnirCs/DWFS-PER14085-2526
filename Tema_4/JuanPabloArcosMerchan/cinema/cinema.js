const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false // false = libre, true = ocupada
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializamos la matriz lógica
let butacas = setup();

/**
 * Sugiere una selección de asientos consecutivos.
 * Prioriza la fila más lejana a la pantalla (última fila de la matriz).
 * @param {number} nSeats - Número de asientos solicitados.
 * @returns {Set} - Set con los IDs de los asientos sugeridos.
 */
function suggest(nSeats) {
    const result = new Set();

    // Validación básica: si piden más asientos que el tamaño de una fila, retornar vacío
    if (nSeats > N) return result;

    // Recorrer las filas DESDE ATRÁS hacia adelante (i decrece)
    // Suponener que la fila 0 es la más cercana a la pantalla y la fila (N-1) la más lejana.
    for (let i = N - 1; i >= 0; i--) {
        const fila = butacas[i];
        const idsTentativos = new Set();
        let contadorConsecutivos = 0;

        // Recorrer los asientos de la fila actual
        for (let j = 0; j < N; j++) {
            const asiento = fila[j];

            if (asiento.estado === false) { // Si está libre
                idsTentativos.add(asiento.id);
                contadorConsecutivos++;

                // Si se encuentra el número requerido de asientos juntos
                if (contadorConsecutivos === nSeats) {
                    return idsTentativos; // Devolver el Set inmediatamente
                }
            } else {
                // Si hay uno ocupado, reiniciar la cuenta y el set tentativo
                idsTentativos.clear();
                contadorConsecutivos = 0;
            }
        }
    }

    // Comentario: El console.log que tenías no era necesario aquí.
    // console.log('> Asientos solicitados: ${nSeats}');
    // console.log('> Resultado:', result);

    return result; // Set vacío
}

// Referencias al DOM
const container = document.getElementById('seats-container');
const displaySelected = document.getElementById('selected-seats-display');
// Referencia al nuevo ID del botón
const btnConfirm = document.getElementById('btn-confirm');
const selectNumSeats = document.getElementById('num-seats');

// Mapa para convertir índice de fila (0-9) a Letra (A-J)
const getRowLabel = (index) => String.fromCharCode(65 + index); // 65 es 'A'

// Función para inicializar algunas butacas ocupadas aleatoriamente
function ocuparButacasAleatorias() {
    butacas.forEach(fila => {
        fila.forEach(asiento => {
            // 30% de probabilidad de estar ocupada inicialmente
            if (Math.random() < 0.3) {
                asiento.estado = true;
            }
        });
    });
}

// Función para renderizar la matriz en el HTML
function renderSeats() {
    container.innerHTML = ''; // Limpiar contenedor

    butacas.forEach((fila, indexFila) => {
        // Crear contenedor de fila visual
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row-seats d-flex justify-content-center align-items-center mb-2';

        // Etiqueta de la fila (A, B, C...)
        const labelSpan = document.createElement('span');
        labelSpan.className = 'row-label me-3 fw-bold';
        labelSpan.textContent = getRowLabel(indexFila);
        rowDiv.appendChild(labelSpan);

        // Crear los asientos
        fila.forEach(asiento => {
            const seatDiv = document.createElement('div');
            seatDiv.className = `seat ${asiento.estado ? 'occupied' : 'available'}`;
            seatDiv.textContent = (asiento.id - 1) % N + 1; // Muestra el número de columna (1-10)
            seatDiv.dataset.id = asiento.id; // Guardamos el ID para buscarlo luego

            rowDiv.appendChild(seatDiv);
        });

        container.appendChild(rowDiv);
    });
}

// Lógica para obtener y mostrar la sugerencia
function handleSuggestion() {
    // 1. Obtener número de asientos solicitados
    const nRequest = parseInt(selectNumSeats.value);

    // 2. Ejecutar algoritmo
    const seleccion = suggest(nRequest);

    // 3. Actualizar interfaz visual
    updateVisualSelection(seleccion);
}

// Función para pintar la selección en pantalla
function updateVisualSelection(setIds) {
    // Limpiar selecciones anteriores (clase .selected)
    const prevSelected = document.querySelectorAll('.seat.selected');
    prevSelected.forEach(el => el.classList.remove('selected'));

    if (setIds.size === 0) {
        displaySelected.textContent = "No hay suficientes asientos juntos disponibles.";
        displaySelected.classList.remove('text-warning');
        displaySelected.classList.add('text-danger');
        return;
    }

    // Convertir Set a Array para mostrar en texto
    const idsArray = Array.from(setIds);

    // Formatear IDs para mostrar Fila+Número. Ejemplo: A1, A2, etc.
    const formattedSeats = idsArray.map(id => {
        // El ID de butaca es lineal (1 a 100).
        // Fila = Math.floor((id - 1) / N) -> Índice de la fila (0-9)
        // Número de asiento en la fila = (id - 1) % N + 1 -> Columna (1-10)
        const rowIndex = Math.floor((id - 1) / N);
        const colNumber = (id - 1) % N + 1;
        return `${getRowLabel(rowIndex)}${colNumber}`;
    });

    displaySelected.textContent = formattedSeats.join(', ');
    displaySelected.classList.remove('text-danger');
    displaySelected.classList.add('text-warning');

    // Resaltar los asientos en el HTML
    idsArray.forEach(id => {
        // Buscar el div que tenga ese data-id
        const seatDiv = document.querySelector(`.seat[data-id='${id}']`);
        if (seatDiv) {
            seatDiv.classList.add('selected');
        }
    });
}

// Ejecutar la sugerencia cada vez que cambie el valor del select
selectNumSeats.addEventListener('change', handleSuggestion);

//  Dejar el botón sin funcionalidad por ahora
btnConfirm.addEventListener('click', () => {
    // Este botón no hace nada por ahora.
    // console.log('El botón Confirmar Reserva fue presionado.');
});

// --- INICIALIZACIÓN DE LA APP ---
ocuparButacasAleatorias(); // Simular cine con gente
renderSeats();      // Dibujar la matriz
handleSuggestion();    // Ejecutar la sugerencia inicial al cargar